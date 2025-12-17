package com.monash.flora_backend.controller.vo;

import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class UserChatgptTopicVO {
    private Long id;
    private String topicName;
    private Map<String, List<UserChatgptLogMessagesVO>> messages;
}
