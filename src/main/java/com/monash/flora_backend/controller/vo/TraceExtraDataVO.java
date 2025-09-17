package com.monash.flora_backend.controller.vo;

import lombok.Data;

import java.util.List;

@Data
public class TraceExtraDataVO {
    private Long userId;
    private String saveTime;
    private String url;
    private String username;
    private String firstname;

    private String lastname;
    private String source;
    private List<String> mousemoveData;
    private List<String> mousewheelData;

    private String windowInnerWidth;
    private String windowInnerHeight;
    private String screenWidth;
    private String screenHeight;
    private String courseId;

}
