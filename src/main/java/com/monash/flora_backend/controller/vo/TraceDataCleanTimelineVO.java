package com.monash.flora_backend.controller.vo;

import lombok.Data;

@Data
public class TraceDataCleanTimelineVO {
    private String action;
    private String subAction;
    private Number start;
    private Number end;
    private String username;
    private String group;

    private String courseId;

}
