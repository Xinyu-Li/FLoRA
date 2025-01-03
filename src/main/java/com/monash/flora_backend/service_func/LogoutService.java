package com.monash.flora_backend.service_func;

import com.monash.flora_backend.dao.entity.FloraUserLoginToken;
import com.monash.flora_backend.service.IFloraUserLoginTokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Service
@RequiredArgsConstructor
public class LogoutService implements LogoutHandler {
    private final IFloraUserLoginTokenService iFloraUserLoginTokenService;
    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        final String authHeader = request.getHeader("Authorization");
        final String jwtToken;
        if (authHeader == null ||!authHeader.startsWith("Bearer ")) {
            return;
        }
        jwtToken = authHeader.substring(7);
        FloraUserLoginToken storedToken = iFloraUserLoginTokenService.findByToken(jwtToken).orElse(null);
        if (storedToken != null) {
            storedToken.setExpired(true);
            storedToken.setRevoked(true);
            iFloraUserLoginTokenService.saveOrUpdate(storedToken);
            SecurityContextHolder.clearContext();
        }
    }
}
