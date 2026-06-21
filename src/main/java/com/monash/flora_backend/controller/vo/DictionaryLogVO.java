package com.monash.flora_backend.controller.vo;

import lombok.Data;

@Data
public class DictionaryLogVO {
    private Long userId;
    private String queryText;
    private String translatedText;
    private String queryTime;
    private String responseTime;
    private String courseId;
}
