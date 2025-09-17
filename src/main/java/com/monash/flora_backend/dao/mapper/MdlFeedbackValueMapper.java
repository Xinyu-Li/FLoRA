package com.monash.flora_backend.dao.mapper;

import com.baomidou.dynamic.datasource.annotation.DS;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.monash.flora_backend.dao.entity.MdlFeedbackValue;
import org.apache.ibatis.annotations.Mapper;

/**
 * <p>
 * values of the completeds Mapper 接口
 * </p>
 *
 * @author xinyu
 * @since 2023-09-29
 */
@Mapper
@DS("slave_1")
public interface MdlFeedbackValueMapper extends BaseMapper<MdlFeedbackValue> {
//    @Select("SELECT mdl_modules.name as type, mdl_course_modules.id, mdl_feedback.course, mdl_feedback_item.name, mdl_feedback_value.value FROM mdl_feedback, mdl_course_modules, mdl_modules, mdl_feedback_item, mdl_feedback_value , mdl_feedback_completed WHERE mdl_modules.id = mdl_course_modules.module AND mdl_feedback.id = mdl_course_modules.instance AND mdl_course_modules.course = mdl_feedback.course AND mdl_feedback_item.feedback = mdl_course_modules.instance AND mdl_feedback_item.id = mdl_feedback_value.item AND mdl_feedback_completed.id = mdl_feedback_value.completed AND mdl_course_modules.course = 2 AND mdl_feedback_completed.userid = 5;")
//    List<MdlFeedbackValueVO> findMdlFeedbackValueVO();
}
