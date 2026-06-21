package com.monash.flora_backend.dao.mapper;

import com.monash.flora_backend.controller.vo.MdlUserEnrolCourseIdVO;
import com.monash.flora_backend.dao.entity.PopupQuestionnaire;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

/**
 * <p>
 * Mapper 接口
 * </p>
 *
 * @author xinyu
 * @since 2024-12-30
 */
public interface PopupQuestionnaireMapper extends BaseMapper<PopupQuestionnaire> {
    @Update("UPDATE popup_questionnaire SET answer = #{answer}, answer_time = #{answerTime} WHERE user_id = #{userId} AND qorder = #{qorder} and course_id = #{courseId}")
    void updateByUserIdAndQorder(
            @Param("userId") long userId,
            @Param("courseId") long courseId,
            @Param("qorder") int qorder,
            @Param("answer") String answer,
            @Param("answerTime") String answerTime
    );

    @Select("SELECT * FROM popup_questionnaire WHERE user_id = #{userId} and course_id = #{courseId} and answer IS NULL")
    List<PopupQuestionnaire> selectQuestionsByUserId(
            @Param("userId") long userId,
            @Param("courseId") long courseId
    );

    @Select("SELECT COALESCE(MAX(qorder), 0) FROM popup_questionnaire WHERE user_id = #{userId} and course_id = #{courseId}")
    int getMaxOrderValueByUserId(@Param("userId") long userId,
                                 @Param("courseId") long courseId);
}
