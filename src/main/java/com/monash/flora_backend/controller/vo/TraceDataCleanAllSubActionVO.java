package com.monash.flora_backend.controller.vo;

import lombok.Data;

@Data
public class TraceDataCleanAllSubActionVO {
    private String action;    
    private String subAction;

    private Number duration;
    private String courseId;

}
