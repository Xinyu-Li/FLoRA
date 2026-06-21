package com.monash.flora_backend.dao.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.monash.flora_backend.controller.vo.CountAllTraceLogVO;
import com.monash.flora_backend.dao.entity.TraceData;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author xinyu
 * @since 2022-10-18
 */
public interface TraceDataMapper extends BaseMapper<TraceData> {

//    void myBatchUpdate(List<TraceData> traceDataList);
//    @Select("SELECT (SELECT COUNT(*) FROM essay where course_id=#{courseId} and user_id=#{userId}) AS essay_count, (SELECT COUNT(*) FROM trace_data where course_id=#{courseId} and user_id=#{userId}) AS trace_count, (SELECT COUNT(*) FROM annotation where course_id=#{courseId} and user_id=#{userId}) AS annotation_count, (SELECT COUNT(*) FROM dictionary_log where course_id=#{courseId} and user_id=#{userId}) AS dictionary_count, (SELECT COUNT(*) FROM gpt_scaffold where course_id=#{courseId} and user_id=#{userId}) AS gpt_scaffold_count, (SELECT COUNT(*) FROM planner where course_id=#{courseId} and user_id=#{userId}) AS planner_count, (SELECT COUNT(*) FROM rule_base_check_grammar where course_id=#{courseId} and user_id=#{userId}) AS grammar_count, (SELECT COUNT(*) FROM rule_base_integration_and_elaboration where course_id=#{courseId} and user_id=#{userId}) AS integration_elaboration_count, (SELECT COUNT(*) FROM rule_base_originality where course_id=#{courseId} and user_id=#{userId}) AS originality_count, (SELECT COUNT(*) FROM rule_base_writing_checklist where course_id=#{courseId} and user_id=#{userId}) AS academic_count, (SELECT COUNT(*) FROM scaffold where course_id=#{courseId} and user_id=#{userId}) AS rule_base_scaffold_count, (SELECT COUNT(*) FROM user_chatgpt_log where course_id=#{courseId} and user_id=#{userId}) AS chatgpt_log_count, (SELECT COUNT(*) FROM user_teacher_log where course_id=#{courseId} and user_id=#{userId}) AS user_teacher_log_count;")
    @Select("SELECT EXISTS(SELECT 1 FROM essay WHERE course_id=#{courseId} AND user_id=#{userId}) AS has_essay_data, EXISTS(SELECT 1 FROM trace_data WHERE course_id=#{courseId} AND user_id=#{userId}) AS has_trace_data, EXISTS(SELECT 1 FROM annotation WHERE course_id=#{courseId} AND user_id=#{userId}) AS has_annotation_data, EXISTS(SELECT 1 FROM dictionary_log WHERE course_id=#{courseId} AND user_id=#{userId}) AS has_dictionary_data, EXISTS(SELECT 1 FROM gpt_scaffold WHERE course_id=#{courseId} AND user_id=#{userId}) AS has_gpt_scaffold_data, EXISTS(SELECT 1 FROM planner WHERE course_id=#{courseId} AND user_id=#{userId}) AS has_planner_data, EXISTS(SELECT 1 FROM rule_base_check_grammar WHERE course_id=#{courseId} AND user_id=#{userId}) AS has_grammar_data, EXISTS(SELECT 1 FROM rule_base_integration_and_elaboration WHERE course_id=#{courseId} AND user_id=#{userId}) AS has_integration_elaboration_data, EXISTS(SELECT 1 FROM rule_base_originality WHERE course_id=#{courseId} AND user_id=#{userId}) AS has_originality_data, EXISTS(SELECT 1 FROM rule_base_writing_checklist WHERE course_id=#{courseId} AND user_id=#{userId}) AS has_academic_data, EXISTS(SELECT 1 FROM scaffold WHERE course_id=#{courseId} AND user_id=#{userId}) AS has_rule_base_scaffold_data, EXISTS(SELECT 1 FROM user_chatgpt_log WHERE course_id=#{courseId} AND user_id=#{userId}) AS has_chatgpt_log_data, EXISTS(SELECT 1 FROM user_teacher_log WHERE course_id=#{courseId} AND user_id=#{userId}) AS has_user_teacher_log_data;")
    CountAllTraceLogVO countByUserIdAndCourseIdForAllTraceLogs(Long userId, Long courseId);

    @Select("SELECT * FROM trace_data WHERE user_id=#{userId} AND course_id=#{courseId} AND NOT ((page_event = 'MOUSE_MOVE' OR page_event = 'MOUSE_WHEEL' OR page_event = 'MOUSE_CLICK') AND (sub_action_label LIKE '%READING' OR sub_action_label = 'PAGE_NAVIGATION' OR sub_action_label = 'TASK_REQUIREMENT' OR instant_event='BODY_CLICK_READING'));")
    List<TraceData> findByUserIdAndCourseIdWithoutMouseData(Long userId, String courseId);

    @Update("UPDATE trace_data SET process_label=null WHERE user_id=#{userId} AND course_id=#{courseId}")
    void updateProcessLabelToNullByUserIdCourseId(Long userId, String courseId);

    @Delete("DELETE FROM trace_data WHERE page_event IN ('MOUSE_MOVE', 'MOUSE_WHEEL') AND sub_action_label IN ('TASK_REQUIREMENT', 'RUBRIC', 'RELEVANT_READING', 'RELEVANT_REREADING') AND user_id=#{userId} AND course_id=#{courseId}")
    void deleteReadingInstructionMoseMoveByUserIdCourseId(Long userId, String courseId);

    // update all CLOSE_SEARCH_ANNOTATION to SEARCH_ANNOTATION
    @Update("UPDATE trace_data SET sub_action_label='SEARCH_ANNOTATION' where sub_action_label='CLOSE_SEARCH_ANNOTATION' and user_id=#{userId} and course_id=#{courseId}")
    void updateCloseSearchAnnotationByUserIdCourseId(Long userId, String courseId);

    @Select("SELECT * FROM trace_data WHERE user_id=#{userId} AND course_id=#{courseId} AND instant_event IN ('OPEN', 'CLOSE') ORDER BY save_time")
    List<TraceData> findAllOpenCloseTraceDataByUserIdCourseId(Long userId, String courseId);

    @Select({"<script>" +
            "select * from trace_data where course_id in " +
            "<foreach item='item' index='index' collection='courseIdList' open='(' separator=',' close=')'>" +
            "#{item}" +
            "</foreach>" +
//                    "(#{courseIdList, typeHandler=com.monash.flora_backend.controller.handler.ListLongHandler}) " +
            "and user_id in " +
            "<foreach item='item' index='index' collection='userIdList' open='(' separator=',' close=')'>" +
            "#{item}" +
            "</foreach>" +
//                    "(#{userIdList, typeHandler=com.monash.flora_backend.controller.handler.ListLongHandler}) " +
            "order by user_id and save_time" +
            "</script>"})
    List<TraceData> findTraceDataByUserIdListCourseIdList(@Param("userIdList") List<Long> userIdList, @Param("courseIdList") List<Long> courseIdList);
}
