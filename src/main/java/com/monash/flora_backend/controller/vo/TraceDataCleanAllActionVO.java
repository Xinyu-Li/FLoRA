package com.monash.flora_backend.controller.vo;

import lombok.Data;

@Data
public class TraceDataCleanAllActionVO {
    private String action;
    private Number duration;
    private String courseId;

}
