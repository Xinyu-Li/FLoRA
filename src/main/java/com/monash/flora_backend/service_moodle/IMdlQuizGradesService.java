package com.monash.flora_backend.service_moodle;

import com.monash.flora_backend.controller.vo.MdlQuizVO;
import com.monash.flora_backend.dao.entity.MdlQuizGrades;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * <p>
 * Stores the overall grade for each user on the quiz, based on 服务类
 * </p>
 *
 * @author xinyu
 * @since 2023-09-29
 */
public interface IMdlQuizGradesService extends IService<MdlQuizGrades> {
//    MdlQuizVO quizGradeTest();
    MdlQuizVO findQuizGradeByUserIdAndCourseIdAndQuizName(String quizName, Long courseId, Long userId);
}
