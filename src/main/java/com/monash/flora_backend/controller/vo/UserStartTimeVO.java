package com.monash.flora_backend.controller.vo;

import lombok.Data;

/**
 * ClassName: UserStartTimeVO
 * Description:
 *
 * @author Xinyu Li
 * @since 2/23/2023 2:14 PM
 */
@Data
public class UserStartTimeVO {
    private Long userId;
    private String userStartTime;
    private String courseId;
}
