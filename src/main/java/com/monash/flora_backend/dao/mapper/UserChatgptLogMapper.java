package com.monash.flora_backend.dao.mapper;

import com.monash.flora_backend.controller.vo.UserChatgptLogVO;
import com.monash.flora_backend.dao.entity.UserChatgptLog;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author xinyu
 * @since 2023-03-06
 */
public interface UserChatgptLogMapper extends BaseMapper<UserChatgptLog> {
    @Select({"<script>" +
            "select * from user_chatgpt_log where course_id in " +
            "<foreach item='item' index='index' collection='courseIdList' open='(' separator=',' close=')'>" +
            "#{item}" +
            "</foreach>" +
//                    "(#{courseIdList, typeHandler=com.monash.flora_backend.controller.handler.ListLongHandler}) " +
            "and user_id in " +
            "<foreach item='item' index='index' collection='userIdList' open='(' separator=',' close=')'>" +
            "#{item}" +
            "</foreach>" +
//                    "(#{userIdList, typeHandler=com.monash.flora_backend.controller.handler.ListLongHandler}) " +
            "order by user_id and chatgpt_response_time" +
            "</script>"})
    List<UserChatgptLog> findChatGptLogByUserIdListCourseIdList(@Param("userIdList") List<Long> userIdList, @Param("courseIdList") List<Long> collect);
    @Select("SELECT *" +
            "FROM user_chatgpt_log" +
            "WHERE user_ask_time = #{askTimestamp} and user_id = #{userId}")
    List<UserChatgptLogVO> selectLogsWithAsktime(@Param("userId") Long userId, @Param("askTimestamp") String askTimestamp);
    @Update({
            "<script>",
            "UPDATE user_chatgpt_log",
            "SET hidden = #{askTimestamp}",
            "WHERE",
            "  (user_ask_time >= #{askTimestamp} OR chatgpt_response_time >= #{askTimestamp}) AND user_id =#{userId}",
            "</script>"
    })
    int updateHiddenState(@Param("userId") Long userId, @Param("askTimestamp") String askTimestamp);


}
