package com.monash.flora_backend.controller.vo;

import lombok.Data;

@Data
public class EssayVO {
    private Long userId;
    private String saveTime;
    private String username;
    private String url;
    private String essayContent;
    private String essayContentJson;
    private String courseId;

}
