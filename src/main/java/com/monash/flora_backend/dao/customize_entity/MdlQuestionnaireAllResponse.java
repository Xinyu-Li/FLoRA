package com.monash.flora_backend.dao.customize_entity;

import lombok.Data;

@Data
public class MdlQuestionnaireAllResponse {

    private Long responseId;
    private Long submittedTime;
    private Long questionnaireId;
    private String questionnaireName;
    private Long userId;

    private String userFirstname;
    private String userLastname;
    private Long questionId;
    private String questionName;
    private Integer questionPosition;

    private String questionContent;
    private Long choiceId;
    private String choiceContent;
    private Boolean selected;
    private String dependency;


}
