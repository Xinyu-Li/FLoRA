package com.monash.flora_backend.config.filter;

import cn.hutool.json.JSONObject;
import com.monash.flora_backend.dao.entity.FloraUserLoginToken;
import com.monash.flora_backend.service.IFloraUserLoginTokenService;
import com.monash.flora_backend.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

/**
 * 对所有 /manage/** 请求做验证
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final UserDetailsService userDetailsService;
    private final IFloraUserLoginTokenService iFloraUserLoginTokenService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

//        log.info("into doFilterInternal");
//        log.info("into doFilterInternal:" + request.getRequestURL() + "-------" + request.getServletPath());
        //如果不包含 /manage 放行
        if (!request.getServletPath().contains("/manage")) {
//            log.info("不包含 /manage 放行 无验证");
            filterChain.doFilter(request, response);
            return;
        }

        final String authHeader = request.getHeader("Authorization");
        final String jwtToken;
        final String username;

        if (authHeader == null ||!authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            log.info("不包含 token 放行 无验证，直接返回");
            return;
        }

        jwtToken = authHeader.substring(7);

        if (SecurityContextHolder.getContext().getAuthentication() == null) {
            boolean validate = JwtUtil.validate(jwtToken);
            if (validate) {
                Optional<FloraUserLoginToken> byToken = iFloraUserLoginTokenService.findByToken(jwtToken);
                if (byToken.isPresent()) {
                    FloraUserLoginToken token = byToken.get();
                    if (!token.getExpired() && !token.getRevoked()) {
                        log.info("token有效，放行该请求");

                        JSONObject jsonObject = JwtUtil.getJSONObject(jwtToken);
                        username = jsonObject.getStr("username");
                        UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);

                        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetails,null, userDetails.getAuthorities());
                        authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                        SecurityContextHolder.getContext().setAuthentication(authToken);
                    } else {
                        log.info("token  过期");
                    }
                } else {
                    log.info("token 不存在");
                }
            } else {
                log.info("token无效，请求被拦截");
            }
        }
        filterChain.doFilter(request, response);
    }
}


