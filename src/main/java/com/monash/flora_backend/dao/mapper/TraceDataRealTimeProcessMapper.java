package com.monash.flora_backend.dao.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.monash.flora_backend.dao.entity.TraceDataRealTimeProcess;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author xinyu
 * @since 2023-09-25
 */
public interface TraceDataRealTimeProcessMapper extends BaseMapper<TraceDataRealTimeProcess> {

    @Insert({"INSERT INTO trace_data_real_time_process (id, user_id, save_time, username, url, firstname, lastname," +
            "                                                  source, page_event, target_object, instant_event, sub_action_label, event_value, process_label," +
            "                                                  course_id, action_label, model_type, detailed_action_label, screen_x, screen_y, client_x," +
            "                                                  client_y, window_inner_width, window_inner_height, screen_width, screen_height)" +
            "        values (#{id}, #{userId}, #{saveTime}, #{username}, #{url}, #{firstname}, #{lastname}," +
            "                #{source}, #{pageEvent}, #{targetObject}, #{instantEvent}, #{subActionLabel}," +
            "                #{eventValue}, #{processLabel}, #{courseId}, #{actionLabel}, #{modelType}, #{detailedActionLabel}," +
            "                #{screenX}, #{screenY}, #{clientX}, #{clientY}, #{windowInnerWidth}, #{windowInnerHeight}," +
            "                #{screenWidth}, #{screenHeight})"})
    void backupData(TraceDataRealTimeProcess traceDataRealTimeProcess);

    /**
     * 如果有相同主键，则ignore
     * @param traceDataRealTimeProcessList
     */
    @Insert({"<script>" +
            "        INSERT INTO trace_data_real_time_process (id, user_id, save_time, username, url, firstname, lastname," +
            "        source, page_event, target_object, instant_event, sub_action_label, event_value, process_label," +
            "        course_id, action_label, model_type, detailed_action_label, screen_x, screen_y, client_x," +
            "        client_y, window_inner_width, window_inner_height, screen_width, screen_height)" +
            "        VALUES" +
            "        <foreach collection='traceDataRealTimeProcessList' item='item' separator=','>" +
            "            (#{item.id}, #{item.userId}, #{item.saveTime}, #{item.username}, #{item.url}, #{item.firstname}, #{item.lastname}," +
            "            #{item.source}, #{item.pageEvent}, #{item.targetObject}, #{item.instantEvent}, #{item.subActionLabel}," +
            "            #{item.eventValue}, #{item.processLabel}, #{item.courseId}, #{item.actionLabel}, #{item.modelType}, #{item.detailedActionLabel}," +
            "            #{item.screenX}, #{item.screenY}, #{item.clientX}, #{item.clientY}, #{item.windowInnerWidth}, #{item.windowInnerHeight}," +
            "            #{item.screenWidth}, #{item.screenHeight})" +
            "        </foreach>" +
            "    </script>"})
    void mySaveBatch(@Param("traceDataRealTimeProcessList") List<TraceDataRealTimeProcess> traceDataRealTimeProcessList);
}
