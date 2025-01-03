package com.monash.flora_backend.controller.vo;

import lombok.Data;

/**
 * @author Administrator
 * @date 1/15/2024
 */
@Data
public class GptScaffoldVO {
    private Long id;
    private Long userId;
    private String courseId;

    private String gptRoleDescription;

    private String promptSendTime;
    private String gptScaffoldContent;
    private String gptResponseTime;

    private String essay;
    private Integer responseRatingStar;
    private Integer responseRatingThumb;
    private String gptRole;
    private String prompt;
    private Integer gptScaffoldNumber;
}
