package com.monash.flora_backend.controller.vo;

import lombok.Data;

@Data
public class GptScaffoldReturnMessageVO {
    private Integer triggerMinute;
    private String message;
}
