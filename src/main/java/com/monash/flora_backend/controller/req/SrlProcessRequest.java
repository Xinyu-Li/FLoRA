package com.monash.flora_backend.controller.req;

import lombok.Data;

@Data
public class SrlProcessRequest {
    private Long userId;
    private String courseId;
    private String srlModel;
    private Integer beginMinute;
    private Integer endMinute;
}
