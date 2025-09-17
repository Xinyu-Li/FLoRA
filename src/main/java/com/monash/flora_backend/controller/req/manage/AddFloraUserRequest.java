package com.monash.flora_backend.controller.req.manage;

import lombok.Data;

/**
 * @author Xinyu Li
 * @date 2/8/2024
 */
@Data
public class AddFloraUserRequest {
    private String username;
    private String password;
    private String email;
    private String role;

}
