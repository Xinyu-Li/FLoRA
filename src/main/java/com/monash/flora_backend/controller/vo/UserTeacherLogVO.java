package com.monash.flora_backend.controller.vo;

import lombok.Data;

/**
 * ClassName: UserTeacherLogVO
 * Description:
 *
 * @author Xinyu Li
 * @since 4/17/2023 11:44 AM
 */
@Data
public class UserTeacherLogVO {
    private Long userId;
    private String chatText;
    private String chatTime;
    private String chatRole;
    private String courseId;
}
