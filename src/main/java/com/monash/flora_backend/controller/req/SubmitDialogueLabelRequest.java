package com.monash.flora_backend.controller.req;

import lombok.Data;

@Data
public class SubmitDialogueLabelRequest {
    private Long userId;
    private String courseId;
    private String dialogueText;
    private String justificationText;
}
