package com.monash.flora_backend.controller.vo;

import lombok.Data;

import java.util.List;

/**
 * ClassName: ScaffoldVO
 * Description:
 *
 * @author Xinyu Li
 * @since 2/19/2023 8:44 AM
 */
@Data
public class ScaffoldVO {
    private Long userId;
    private String saveTime;
    private String username;
    private String url;

    private String scaffoldInfo;
    private String courseId;

}
