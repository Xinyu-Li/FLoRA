package com.monash.flora_backend.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.monash.flora_backend.dao.entity.UserDataManagement;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author xinyu
 * @since 2023-09-29
 */
public interface IUserDataManagementService extends IService<UserDataManagement> {
//    /**
//     * 返回搜索的结果
//     * @param searchUserReq
//     * @return
//     */
//    OverviewDataForUserResp findOverviewDataForUser(SearchUserReq searchUserReq);
//
//    /**
//     * 直接返回放到界面上的 课程和分类
//     * @return
//     */
//    AllCourseAndCategoryResp findAllCourseCategoriesAndCourses();
//
//    /**
//     * 返回课程overview数据
//     * @param courseIdList
//     * @return
//     */
//    OverviewDataForCourseResp findOverviewDataForCourse(List<Long> courseIdList);
//
//    /**
//     *
//     * @param courseId
//     * @return
//     */
//    CourseOverviewVO findOverviewDataForCourseByCourseId(Long courseId);

    /**
     *
     * 上传以下文件和字段
     * 访谈文件           interview
     * 眼动文件           eyetracking
     * 视频文件           video
     * essay GPT打分     存入数据库
     * essay GPT评价     存入数据库
     * essay human打分    存入数据库
     * essay human评价    存入数据库
     * 学生对打分的反馈文件 student_feedback
     * 上传路径是 MyMoodleConfigConstant.FILE_UPLOAD_PATH + userId + 各种类别名称 + 文件名
     */
    void updateUserDataManagement(UserDataManagement userDataManagement);

    /**
     *
     * * 上传以下文件和字段
     * 上传以下文件和字段
     * 访谈文件           interview
     * 眼动文件           eyetracking
     * 视频文件           video
     * essay GPT打分     存入数据库
     * essay GPT评价     存入数据库
     * essay human打分    存入数据库
     * essay human评价    存入数据库
     * 学生对打分的反馈文件 student_feedback
     * 上传路径是 MyMoodleConfigConstant.FILE_UPLOAD_PATH + userId + 各种类别名称 + 文件名
     * @param userDataManagement
     */
    void createUserDateManagement(UserDataManagement userDataManagement);
}
