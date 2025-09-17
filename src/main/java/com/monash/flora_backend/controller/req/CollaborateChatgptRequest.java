package com.monash.flora_backend.controller.req;

import lombok.Data;

import java.util.List;

/**
 * @author Lin Li
 * @date 18/07/2024
 */
@Data

public class CollaborateChatgptRequest {
    private String question;

    private String extraPrompt;
    private Long userId;
    private String courseId;
    private String essay;
    private String questionId;//added following xinyu's update
    //private String promptId; follow xinyu's code

    private Boolean includeEssay;
    private String chatgptRoleDescription;
    private String chatgptRole;
    private List<String> backgroundFileNameList; // 这三项来自 config tool
    private List<Integer> chatgptParameters;

    //private String type;// 用以区分不同的agent
    private String agentName; //added following xinyu's update
    private Integer roundNumber;

    private String padId;
}
