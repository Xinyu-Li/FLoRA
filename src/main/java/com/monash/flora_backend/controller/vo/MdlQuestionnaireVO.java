package com.monash.flora_backend.controller.vo;

import lombok.Data;

@Data
public class MdlQuestionnaireVO {
    private String moduleName;
    private Long modulesId;
    private String course;
    private Long userId;
    private Long questionId;
    private Long responseId;
    private String question;
    private Long questionChoice;
    private String questionContent;
}
