package com.monash.flora_backend.dao.customize_entity;

import lombok.Data;

@Data
public class MdlQuestionnaireQuestionChoice {

    private String questionnaireName;
    private Long questionId;
    private String questionName;
    private Integer questionPosition;
    private String questionContent;
    private Long choiceId;
    private String choice;
}
