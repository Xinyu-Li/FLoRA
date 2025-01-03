package com.monash.flora_backend.controller.vo;
import lombok.Data;

@Data
public class BackgroundDocVO {

    private Long userId;
    private String courseId;
    private String url;
    private String documentContent;
}
