package com.monash.flora_backend.controller.vo;

import lombok.Data;

@Data
public class TraceDataCleanPersonalVO {
    private String action;
    private Number duration;

    private String username;
    private String group;

    private String courseId;

}
