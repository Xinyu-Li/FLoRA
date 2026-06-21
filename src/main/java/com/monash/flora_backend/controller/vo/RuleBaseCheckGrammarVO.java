package com.monash.flora_backend.controller.vo;

import lombok.Data;

/**
 * ClassName: RuleBaseCheckGrammarVO
 * Description:
 *
 * @author Xinyu Li
 * @since 5/5/2023 5:27 PM
 */
@Data
public class RuleBaseCheckGrammarVO {
    private Long userId;
    private String essay;
    private String response;
    private String responseContent;
    private String checkTime;
    private String courseId;
}
