package com.monash.flora_backend.controller.vo;

import lombok.Data;

import java.util.List;

/**
 * ClassName: MdlUserVO
 * Description:
 *
 * @author Xinyu Li
 * @since 4/18/2023 12:40 PM
 */
@Data
public class MdlUserVO {
    private Long id;
    private String username;

    private String firstname;
    private String lastname;
    private String email;
    private String timecreated;

    private List<MdlUserCourseDataVO> userCourseDataVOList;


    // 所有path 都用来下载或者上传文件，都是文件夹路径
    private Boolean has_interview_data;
    private String interview_data_path;
    private Boolean has_eye_tracking_data;
    private String eye_tracking_data_path;
    private Boolean has_video_data;
    private String video_data_path;

    private Integer essay_mark_by_gpt;
    private String essay_comment_by_gpt;
    private Integer essay_mark_by_human;
    private String essay_comment_by_human;
    private Boolean has_user_feedback_for_essay_mark_comment;
    private String user_feedback_for_essay_mark_comment_path;
}
