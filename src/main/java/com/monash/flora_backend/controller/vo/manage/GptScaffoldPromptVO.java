package com.monash.flora_backend.controller.vo.manage;

import lombok.Data;

/**
 * @author Xinyu Li
 * @date 2/16/2024
 */
@Data
public class GptScaffoldPromptVO {
//    private Integer triggerOrder;
    private Integer triggerMinute;
    private Integer beginMinute;
    private Integer endMinute;
//    private List<NeedCheckSRLPromptVO> rules;
    private String checkSrlProcess;
//    private Boolean decideRuleOnServer;
}
