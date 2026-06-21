package com.monash.flora_backend.controller.vo.manage;

import lombok.Data;

import java.util.List;

/**
 * @author Xinyu Li
 * @date 2/16/2024
 */
@Data
public class ThresholdPromptVO {
    private Integer threshold;
    private String prompt;
    private List<String> scaffoldSrlProcess; // Store SRL process String, use ;;; to separate, the order in the list is same as the scaffold order.

}