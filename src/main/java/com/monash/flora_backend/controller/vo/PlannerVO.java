package com.monash.flora_backend.controller.vo;

import lombok.Data;

@Data
public class PlannerVO {
    private Long userId;
    private String saveTime;
    private String username;
    private String url;
    private String plannerElementsJson;

    private String displayPlanDivInnerHtml;

    private String courseId;
}
