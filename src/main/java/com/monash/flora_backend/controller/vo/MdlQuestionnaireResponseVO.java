package com.monash.flora_backend.controller.vo;

import lombok.Data;

@Data
public class MdlQuestionnaireResponseVO {
    private String questionnaireName;
    //private String courseId;
    private Long userId;
    //private Long responseId;
    private Integer questionPosition;
    private String questionName;
    private Long questiontype;
    private String questionContent;
    private String result;
}
