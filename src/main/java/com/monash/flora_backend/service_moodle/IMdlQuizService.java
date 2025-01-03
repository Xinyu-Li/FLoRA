package com.monash.flora_backend.service_moodle;

import com.baomidou.mybatisplus.extension.service.IService;
import com.monash.flora_backend.dao.entity.MdlQuiz;

/**
 * <p>
 * The settings for each quiz. 服务类
 * </p>
 *
 * @author xinyu
 * @since 2023-09-15
 */
public interface IMdlQuizService extends IService<MdlQuiz> {
    Integer countByUserIdAndCourseId(Long userId, Long courseId);

//    MdlQuizVO quizTest();
}
