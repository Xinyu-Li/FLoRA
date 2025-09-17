package com.monash.flora_backend.controller.vo.manage;

import lombok.Data;

/**
 * @author Xinyu Li
 * @date 2/16/2024
 */
@Data
public class NeedCheckSRLPromptVO {
    private Integer scaffoldNumber; //如果number 是0，表示这个 SRL process design 是通用的，如果不是0，表示只能用于某个scaffold number
    private String srlProcess; // 此处如果是
    private String notExistPrompt;
    private String existPrompt;
    private Integer threshold;
    private String appearOverThresholdPrompt;
    private String appearLessThanEqualThresholdPrompt;
    private String appearOverOther; //此处设计 适配 srlProcessFreqComparison
    private String appearLessThanOther; //此处设计 适配 srlProcessFreqComparison
//    private CheckOption checkWhich; //  只有三个值 1, exist 2. threshold 3. other

}

