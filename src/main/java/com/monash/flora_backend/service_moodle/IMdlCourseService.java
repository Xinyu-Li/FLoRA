package com.monash.flora_backend.service_moodle;

import com.baomidou.mybatisplus.extension.service.IService;
import com.monash.flora_backend.controller.vo.MdlCourseVO;
import com.monash.flora_backend.dao.entity.*;

import java.util.List;

/**
 * <p>
 * Central course table 服务类
 * </p>
 *
 * @author xinyu
 * @since 2023-09-12
 */
public interface IMdlCourseService extends IService<MdlCourse> {
    List<MdlCourseVO> findAll();

    List<MdlQuizGrades> findMdlQuizGradeByUserIdAndCourseId(Long userId, Long courseId);

    List<MdlSurveyAnswers> findMdlSurveyAnswersByUserIdAndCourseId(Long userId, Long courseId);

    List<MdlQuestionnaireResponse> findMdlQuestionnaireResponseByUserIdAndCourseId(Long userId, Long courseId);


    List<MdlFeedbackCompleted> findMdlFeedbackCompletedByUserIdAndCourseId(Long userId, Long courseId);
}
