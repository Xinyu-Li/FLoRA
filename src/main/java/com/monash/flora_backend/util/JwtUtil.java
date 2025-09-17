package com.monash.flora_backend.util;

import cn.hutool.core.date.DateField;
import cn.hutool.core.date.DateTime;
import cn.hutool.json.JSONObject;
import cn.hutool.jwt.JWT;
import cn.hutool.jwt.JWTPayload;
import cn.hutool.jwt.JWTUtil;
import lombok.extern.slf4j.Slf4j;

import java.util.HashMap;
import java.util.Map;

@Slf4j
public class JwtUtil {

    /**
     * 盐值很重要，不能泄漏，且每个项目都应该不一样，可以放到配置文件中
     */
    private static final String key = "flora_salt_1q2w3e4R!@#$";

    public static String createToken(Long id, String username, String role) {
        DateTime now = DateTime.now();
        DateTime expTime = now.offsetNew(DateField.HOUR, 24);
        Map<String, Object> payload = new HashMap<>();
        // 签发时间
        payload.put(JWTPayload.ISSUED_AT, now);
        // 过期时间
        payload.put(JWTPayload.EXPIRES_AT, expTime);
        // 生效时间
        payload.put(JWTPayload.NOT_BEFORE, now);
        // 内容
        payload.put("id", id);
        payload.put("username", username);
        payload.put("role", role);
        String token = JWTUtil.createToken(payload, key.getBytes());
        log.info("生成JWT token：{}", token);
        return token;
    }

    public static boolean validate(String token) {
        try {
            JWT jwt = JWTUtil.parseToken(token).setKey(key.getBytes());
            // validate包含了verify
            boolean validate = jwt.validate(0);
            log.info("JWT token校验结果：{}", validate);
            return validate;
        }catch (Exception e) {
            log.info("JWT token校验异常", e);
            return false;
        }
    }

    public static JSONObject getJSONObject(String token) {
        JWT jwt = JWTUtil.parseToken(token).setKey(key.getBytes());
        JSONObject payloads = jwt.getPayloads();
//        payloads.remove(JWTPayload.ISSUED_AT);
//        payloads.remove(JWTPayload.EXPIRES_AT);
//        payloads.remove(JWTPayload.NOT_BEFORE);
        log.info("根据token获取原始内容：{}", payloads);
        return payloads;
    }

//    public static void main(String[] args) {
//        createToken(1L, "123");
//
//        String token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYmYiOjE2ODQzODU4ODQsImV4dHJhIjoidGVzdGV4dHJhIiwibW9iaWxlIjoiMTIzIiwiaWQiOjEsImV4cCI6MTY4NDQ3MjI4NCwiaWF0IjoxNjg0Mzg1ODg0fQ.I3WSfKin5A6FOfTIVYKvTapvUbfoGei4jquVE7Xpi3c";
//        validate(token);
//
//        getJSONObject(token);
//    }
}
