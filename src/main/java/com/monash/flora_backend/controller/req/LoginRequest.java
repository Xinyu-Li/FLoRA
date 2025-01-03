package com.monash.flora_backend.controller.req;

import lombok.Data;

@Data
public class LoginRequest {
    private String username;
    private String password;
}
