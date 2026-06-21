package com.monash.flora_backend.service_moodle;

import com.monash.flora_backend.dao.entity.MdlSurvey;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * <p>
 * Each record is one SURVEY module with its configuration 服务类
 * </p>
 *
 * @author xinyu
 * @since 2023-09-15
 */
public interface IMdlSurveyService extends IService<MdlSurvey> {
    Integer countByUserIdAndCourseId(Long userId, Long courseId);
}
