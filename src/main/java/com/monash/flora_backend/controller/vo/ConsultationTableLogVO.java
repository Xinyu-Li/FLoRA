package com.monash.flora_backend.controller.vo;

import lombok.Data;

@Data
public class ConsultationTableLogVO {
    private Long id;
    private Long userId;
    private String courseId;
    private String contentJson;
    private String createdAt;
}
