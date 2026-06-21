package com.monash.flora_backend.controller.vo;

import lombok.Data;

/**
 * ClassName: GrammarErrorVO
 * Description:
 *
 * @author Xinyu Li
 * @since 5/26/2023 7:07 PM
 */
@Data
public class GrammarErrorVO {
    private String sentence;
    private String errorPosition;
    private String errorCorrection;
    private String errorExplanation;
    private String errorType;
}
