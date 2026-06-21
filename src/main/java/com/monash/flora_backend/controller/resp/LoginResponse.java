package com.monash.flora_backend.controller.resp;

import lombok.Data;

@Data
public class LoginResponse {
    private String accessToken;
    private String username;
    private String role;
}
