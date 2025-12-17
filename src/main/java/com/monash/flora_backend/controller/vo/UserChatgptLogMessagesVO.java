package com.monash.flora_backend.controller.vo;

import lombok.Data;

/**
 * This is VO is required for the chatgpt logs that one question has multiple responses
 */
@Data
public class UserChatgptLogMessagesVO {
    private Long id;
    private String sender;
    private String text;
    private String sendTime;
    private int thumb; //0 no selection,  1 up, 2 down
    private String questionId; // question's uuid
    private String hidden;
    private String firstCreatedInThreadId;

}
