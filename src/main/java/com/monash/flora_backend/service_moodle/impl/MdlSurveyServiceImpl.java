package com.monash.flora_backend.service_moodle.impl;

import com.baomidou.dynamic.datasource.annotation.DS;
import com.monash.flora_backend.dao.entity.MdlSurvey;
import com.monash.flora_backend.dao.mapper.MdlSurveyMapper;
import com.monash.flora_backend.service_moodle.IMdlSurveyService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * Each record is one SURVEY module with its configuration 服务实现类
 * </p>
 *
 * @author xinyu
 * @since 2023-09-15
 */
@Service
@DS("slave_1")
public class MdlSurveyServiceImpl extends ServiceImpl<MdlSurveyMapper, MdlSurvey> implements IMdlSurveyService {
    @Override
    public Integer countByUserIdAndCourseId(Long userId, Long courseId) {
        return getBaseMapper().countByUserIdAndCourseId(userId, courseId);
    }
}
