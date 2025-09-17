package com.monash.flora_backend.controller.vo;

import lombok.Data;

/**
 * ClassName: RuleBaseWritingChecklistVO
 * Description:
 *
 * @author Xinyu Li
 * @since 5/22/2023 4:18 PM
 */
@Data
public class RuleBaseIntegrationAndElaborationVO {
    private Long userId;
    private String essay;
    private String response;
    private String checkTime;
    private String courseId;
}
