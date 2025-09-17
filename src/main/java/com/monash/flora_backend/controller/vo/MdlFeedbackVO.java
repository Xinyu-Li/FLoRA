package com.monash.flora_backend.controller.vo;

import lombok.Data;

@Data
public class MdlFeedbackVO {
    private Long courseId;
    private String feedbackName;
    private Long userId;
    private Long itemId;
    private String itemName;
    private Integer value;
}
