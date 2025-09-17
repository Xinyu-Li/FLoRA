package com.monash.flora_backend.controller.vo;

import lombok.Data;

/**
 * @author Xinyu Li
 * @date 10/9/2024
 */
@Data
public class TraceDataRealTimeProcessVO {
    private Long id;
    private Long userId;
    private Long courseId;
    private String saveTime;

    private String subActionLabel; //经过判定
    private String processLabel;
    private String actionLabel;
}
