package com.monash.flora_backend.controller.req;

import lombok.Data;

import java.util.List;

/**
 * @author Xinyu Li
 * @date 1/18/2024
 */
@Data
public class ChatgptRequest {
    private String question;
    private String extraPrompt;
    private Long userId;
    private String courseId;
    private String essay;
    private String questionId;
    private Boolean includeEssay;
    private String chatgptRoleDescription;
    private String chatgptRole; // 大分类，比如scaffold
    private List<String> backgroundFileNameList; // 这三项来自 config tool
    private List<Integer> chatgptParameters;
    private String agentName;// 用以区分不同的agent，具体每个agent的标识
    private Integer roundNumber;
    private Long topicId;
    private String threadId;
    private String oldThreadId;
    private String specialRequirementPrompt;
    private GptScaffoldRequest gptScaffoldRequest;
    private String toolsLanguage;
}
