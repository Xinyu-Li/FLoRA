package com.monash.flora_backend.controller.vo;

import lombok.Data;
@Data
public class MdlQuestionnaireResponseCompeteVO {

    private String questionnaireName;
    //private String courseId;
    private Long userId;
    //private Long responseId;
    private Integer questionPosition;
    private String questionName;
    private String questionContent;
    private String choiceContent;
    private Boolean selected;
    private String dependency;
}
