package com.monash.flora_backend.controller.vo;

import lombok.Data;

@Data
public class MdlFeedbackValueVO {
    private String moduleName;
    private Long modulesId;
    private Integer course;
    private String question;
    private Integer value;
}
