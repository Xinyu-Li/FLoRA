package com.monash.flora_backend.dao.customize_entity;

import lombok.Data;

@Data
public class MdlQuestionnaireResponseBaseResult {
    private Long questionnaireId;
    private String questionnaireName;
    private Long userId;
    private Long questionId;

    private String questionName;
    private Long questionType;
    private Integer questionPosition;
    private String questionContent;
    private String result;
}
