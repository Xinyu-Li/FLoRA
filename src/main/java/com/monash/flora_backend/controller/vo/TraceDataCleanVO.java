package com.monash.flora_backend.controller.vo;

import lombok.Data;

@Data
public class TraceDataCleanVO {
    private Long userId;
    private String saveTime;
    private String username;
    private String url;

    private String subActionLabel; //经过判定
    private String processLabel;

    private String courseId;
    private String actionLabel;

    private String time;

}
