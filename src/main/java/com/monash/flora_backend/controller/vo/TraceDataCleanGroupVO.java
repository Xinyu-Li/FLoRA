package com.monash.flora_backend.controller.vo;

import lombok.Data;

@Data
public class TraceDataCleanGroupVO {
    private String action;
    private Number duration;
    private String group;
    private String courseId;

}
