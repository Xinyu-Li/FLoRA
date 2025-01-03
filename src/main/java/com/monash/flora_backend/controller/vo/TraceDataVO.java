package com.monash.flora_backend.controller.vo;

import lombok.Data;

@Data
public class TraceDataVO {
    private Long userId;
    private String saveTime;
    private String url;
    private String username;
    private String firstname;

    private String lastname;
    private String source;
    private String pageEvent;
    private String targetObject;
    private String instantEvent;

    private String actionLabel;
    private String detailedActionLabel;
    private String modelType;

    private String subActionLabel; //经过判定
    private String processLabel;

    private String screenX;
    private String screenY;
    private String clientX;
    private String clientY;

    private String windowInnerWidth;
    private String windowInnerHeight;
    private String screenWidth;
    private String screenHeight;
    private String eventValue;
    private String courseId;
}
