package com.monash.flora_backend.controller.req.manage;

import lombok.Data;

import java.util.List;
@Data
public class AgentsConfig {
    private String chatName;
    private String agentName;
    private String agentType;
    private String agentRole;
    private String chatgptRoleDescription;
    private boolean useRating;
    private boolean useThisAgent;
    private boolean promptIncludeEssay;
    private int chatgptParametersMaxResponseToken;
    private int chatgptParametersN;
    private int chatgptParametersTemperature;
    private List<String> chatgptBackgroundFileNameList;
}
