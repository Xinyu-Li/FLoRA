package com.monash.flora_backend.dao.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.monash.flora_backend.controller.vo.UserChatgptLogVO;
import com.monash.flora_backend.dao.entity.UserChatgptTopic;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author xinyu
 * @since 2025-01-23
 */
public interface UserChatgptTopicMapper extends BaseMapper<UserChatgptTopic> {
//    @Select("SELECT log.*, topic.topic_name, topic.thread_showing " +
//            "FROM user_chatgpt_log log " +
//            "JOIN user_chatgpt_topic topic ON log.topic_id = topic.id " +
//            "WHERE log.user_id = #{userId} and log.course_id = #{courseId} " +
//            "ORDER BY topic.id, log.id")
    @Select("SELECT topic.topic_name, topic.thread_showing, topic.id as topic_id, topic.user_id, topic.course_id, log.id as id, log.thread_id, log.chatgpt_role_description, log.question_id, log.user_questions, log.user_ask_time, log.chatgpt_answer, log.chatgpt_response_time, log.essay, log.response_rating_star, log.response_rating_thumb, log.response_generated_times, log.chatgpt_role, log.chatgpt_whole_response, log.chatgpt_whole_prompt, log.type, log.hidden, log.question_version" +
            "    FROM user_chatgpt_topic topic" +
            "            LEFT JOIN user_chatgpt_log log on topic.id = log.topic_id" +
            "            WHERE topic.user_id = #{userId} and topic.course_id = #{courseId}" +
            "            ORDER BY topic.id, log.id")
    List<UserChatgptLogVO> selectLogsWithTopicNameByUserId(@Param("userId") Long userId, @Param("courseId") String courseId);

    @Select("SELECT log.*, topic.topic_name, topic.thread_showing " +
            "FROM user_chatgpt_log log " +
            "JOIN user_chatgpt_topic topic ON log.topic_id = topic.id " +
            "WHERE log.user_id = #{userId} and log.course_id = #{courseId} and log.topic_id = #{topicId} " +
            "ORDER BY topic.id, log.id")
    List<UserChatgptLogVO> selectLogsWithTopicNameByUserIdAndTopicId(@Param("userId") Long userId, @Param("courseId") String courseId, @Param("topicId") Long topicId);
}
