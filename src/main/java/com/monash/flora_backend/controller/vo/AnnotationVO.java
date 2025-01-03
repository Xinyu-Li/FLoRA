package com.monash.flora_backend.controller.vo;

import lombok.Data;

@Data
public class AnnotationVO {

    private String highlightText;
    private String notesTextJson="";
    private String notesText="";
    private String defaultTag;
    private String extraTags="";

    private Long userId;
    private String saveTime;
    private String username;
    private String url;
    private String highlightTimestamp;

    private String serializeHighlightsJson="";
    private String courseId;
}
