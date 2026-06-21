package com.monash.flora_backend.controller.manage;

import cn.hutool.core.util.ObjectUtil;
import cn.hutool.crypto.digest.DigestUtil;
import cn.hutool.json.JSONObject;
import cn.hutool.jwt.JWTPayload;
import com.monash.flora_backend.controller.req.LoginRequest;
import com.monash.flora_backend.controller.req.manage.AddFloraUserRequest;
import com.monash.flora_backend.controller.resp.LoginResponse;
import com.monash.flora_backend.dao.entity.FloraUser;
import com.monash.flora_backend.dao.entity.FloraUserLoginToken;
import com.monash.flora_backend.exception.BusinessException;
import com.monash.flora_backend.exception.BusinessExceptionEnum;
import com.monash.flora_backend.service.IFloraUserLoginTokenService;
import com.monash.flora_backend.service.IFloraUserService;
import com.monash.flora_backend.util.JSONResult;
import com.monash.flora_backend.util.JwtUtil;
import com.monash.flora_backend.util.MyBeanCopyUtils;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/account")
@AllArgsConstructor
public class AccountController {
    private final AuthenticationManager authenticationManager;
    private final IFloraUserService iFloraUserService;
    private final IFloraUserLoginTokenService iFloraUserLoginTokenService;

    @PostMapping("/login")
    public JSONResult login(@RequestBody LoginRequest loginRequest) {
        log.info("into manage login");
        log.info(loginRequest.toString());

        String password = loginRequest.getPassword();
        String username = loginRequest.getUsername();

//        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
        FloraUser floraUser = iFloraUserService.findByUsername(username).orElse(null);

        if (ObjectUtil.isNull(floraUser)) {
            throw new BusinessException(BusinessExceptionEnum.FLORA_USER_USERNAME_NOT_EXIST);
        }

        if (!DigestUtil.bcryptCheck(password, floraUser.getPassword())) {
            throw new BusinessException(BusinessExceptionEnum.FLORA_USER_PASSWORD_INVALID);
        }

        String jwtToken = JwtUtil.createToken(floraUser.getId(), floraUser.getUsername(), floraUser.getRole());

        revokeAllUserTokens(floraUser.getId()); //把之前的都取消权限
        saveUserToken(floraUser.getId(), jwtToken);

        LoginResponse loginResponse = new LoginResponse();
//        loginResponse.setUsername(floraUser.getUsername());
        loginResponse.setAccessToken(jwtToken);
//        loginResponse.setRole(floraUser.getRole());

        return JSONResult.ok(loginResponse);
    }

    private void saveUserToken(Long userId, String jwtToken) {
        FloraUserLoginToken token = new FloraUserLoginToken();
        token.setToken(jwtToken);
        token.setUserId(userId);
        token.setExpired(false);
        token.setRevoked(false);
        JSONObject jsonObject = JwtUtil.getJSONObject(jwtToken);
        token.setExpireTime(jsonObject.getStr(JWTPayload.EXPIRES_AT));
        token.setRevokeTime("");


        iFloraUserLoginTokenService.save(token);
    }
    private void revokeAllUserTokens(Long userId) {
        List<FloraUserLoginToken> validUserTokens = iFloraUserLoginTokenService.findAllValidTokenByUser(userId);
        if (validUserTokens.isEmpty())
            return;
        validUserTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        iFloraUserLoginTokenService.saveOrUpdateBatch(validUserTokens);
    }

    @PostMapping("/flora-user")
    public JSONResult addFloraUser(@RequestBody AddFloraUserRequest addFloraUserRequest) {
        log.info(addFloraUserRequest.toString());
        FloraUser floraUser = MyBeanCopyUtils.copyBean(addFloraUserRequest, FloraUser.class);
        try {
            iFloraUserService.save(floraUser);
            return JSONResult.ok();
        } catch (Exception e) {
            return JSONResult.errorMsg("error in adding flora user");
        }
    }

    @GetMapping("/flora-user/delete/{id}")
    public JSONResult deleteFloraUser(@PathVariable("id") Long id) {

        log.info("id:" + id);
//        log.info("data" + map.get("data"));

        // delete operation

        return JSONResult.ok();
    }
}

