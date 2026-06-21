package com.monash.flora_backend.controller.vo;

import lombok.Data;

@Data
public class MdlUserEnrolCourseIdVO {
    private Long id;
    private String username;
    private String email;
    private String timecreated;
    private Long courseid;
}
