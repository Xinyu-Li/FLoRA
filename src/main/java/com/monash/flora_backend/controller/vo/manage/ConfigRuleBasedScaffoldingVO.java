package com.monash.flora_backend.controller.vo.manage;

import lombok.Data;

import java.util.List;

/**
 * @author Xinyu Li
 * @date 2/16/2024
 */
@Data
public class ConfigRuleBasedScaffoldingVO {
    private Integer triggerMinute;
    private String mainMessage;
    private List<String> content;
}
