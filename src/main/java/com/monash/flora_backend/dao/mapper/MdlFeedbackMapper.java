package com.monash.flora_backend.dao.mapper;

import com.baomidou.dynamic.datasource.annotation.DS;
import com.monash.flora_backend.controller.vo.MdlFeedbackVO;
import com.monash.flora_backend.dao.entity.MdlFeedback;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * <p>
 * all feedbacks Mapper 接口
 * </p>
 *
 * @author xinyu
 * @since 2023-09-29
 */
@Mapper
@DS("slave_1")
public interface MdlFeedbackMapper extends BaseMapper<MdlFeedback> {
    @Select("select count(*) from mdl_feedback a join mdl_feedback_completed b on a.id=b.feedback where a.course=#{userId} and b.userid=#{courseId}")
    Integer countByUserIdAndCourseId(Long userId, Long courseId);

    @Select("SELECT f.course as course_id, f.name as feedback_name, fc.userid as user_id, fi.name as item_name, fi.id as item_id, fv.value " +
            "FROM mdl_feedback f JOIN mdl_feedback_completed fc ON f.id = fc.feedback JOIN mdl_feedback_value fv ON fc.id = fv.completed JOIN mdl_feedback_item fi ON fv.item = fi.id " +
            "WHERE f.name like CONCAT('%', #{feedbackName}, '%') AND f.course = #{courseId} AND fc.userid = #{userId} AND fi.hasvalue = 1")
    List<MdlFeedbackVO> findMdlFeedbackVOByFeedbackNameAndCourseIdAndUserId(String feedbackName, Long courseId, Long userId);
}
