package com.monash.flora_backend.controller.vo.manage;

import lombok.Data;

/**
 * @author Xinyu Li
 * @date 2/16/2024
 */
@Data
public class NeedCheckSubActionPromptVO {
    private String subAction;
    private String notExistPrompt;
    private String existPrompt;
    private Integer threshold;
    private String appearOverThresholdPrompt;
    private String appearLessThanEqualThresholdPrompt;
}
