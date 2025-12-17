package com.monash.flora_backend.controller.vo;

import lombok.Data;

/**
 * ClassName: UserChatgptLogVO
 * Description:
 *
 * @author Xinyu Li
 * @since 4/17/2023 10:10 AM
 */
@Data
public class UserChatgptLogVO {

    private Long id;
    private Long userId;
    private String courseId;
    private String chatgptRoleDescription;
    private String questionId;

    private String userQuestions;
    private String userAskTime;
    private String chatgptAnswer;
    private String chatgptResponseTime;
    private String essay;
    private int responseRatingStar;   // 0 - no selection     1-5  - show stars
    private int responseRatingThumb;  // 0 - no selection     1 - thumb up      2 - thumb down
    private int responseGeneratedTimes;
    private String chatgptRole; //
    private String chatgptWholeResponse;
    private String chatgptWholePrompt;

    private Long topicId;
    private String topicName;
    private String hidden;
    private int questionVersion;
    private String threadShowing;

    private String assistantName; // type
    private String responseType;
    private String apiModel;
    private String apiObject;
    private String threadId; // ChatGPT Assistant Thread ID
    private String runId;
    private String assistantId;
}
