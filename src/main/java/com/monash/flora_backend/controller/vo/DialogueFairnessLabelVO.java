package com.monash.flora_backend.controller.vo;

import lombok.Data;

@Data
public class DialogueFairnessLabelVO {
    private Long id;

    private Long userId;

    private String courseId;

    private String dialogueText;

    private String justificationText;
    private Integer deleted;
}
