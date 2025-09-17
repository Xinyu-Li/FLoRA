package com.monash.flora_backend.dao.mapper;

import com.baomidou.dynamic.datasource.annotation.DS;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.monash.flora_backend.dao.entity.MdlFeedbackItem;
import org.apache.ibatis.annotations.Mapper;

/**
 * <p>
 * feedback_items Mapper 接口
 * </p>
 *
 * @author xinyu
 * @since 2023-09-29
 */
@Mapper
@DS("slave_1")
public interface MdlFeedbackItemMapper extends BaseMapper<MdlFeedbackItem> {
//    @Select("Select mdl_feedback.name as type, mdl_feedback_value.item as item, mdl_feedback_value.completed as user, mdl_feedback_item.name as question, mdl_feedback_value.value as value From mdl_feedback, mdl_feedback_item, mdl_feedback_value, mdl_feedback_completed Where mdl_feedback_completed.feedback = mdl_feedback.id AND mdl_feedback_completed.userid = mdl_feedback_value.completed AND mdl_feedback_value.item = mdl_feedback_item.id AND mdl_feedback_completed.feedback=1 and mdl_feedback_completed.userid=5;")
//    List<MdlFeedbackVO> findMdlFeedbackVO();

}
