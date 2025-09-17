package com.monash.flora_backend.controller.vo;

import lombok.Data;

@Data
public class MdlSurveyAnswersVO {
    private Long moduleCourse;
    private Long moduleId;
    private Long userId;
    private Long questionId;
    private String question;
    private Long answer;


}
