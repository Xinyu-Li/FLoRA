package com.monash.flora_backend.dao.mapper;

import com.baomidou.dynamic.datasource.annotation.DS;
import com.monash.flora_backend.dao.entity.MdlSurvey;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

/**
 * <p>
 * Each record is one SURVEY module with its configuration Mapper 接口
 * </p>
 *
 * @author xinyu
 * @since 2023-09-15
 */
@Mapper
@DS("slave_1")
public interface MdlSurveyMapper extends BaseMapper<MdlSurvey> {
    @Select("select count(*) from mdl_survey a join mdl_survey_answers b on a.id=b.survey where a.course=#{userId} and b.userid=#{courseId}")
    Integer countByUserIdAndCourseId(Long userId, Long courseId);
}
