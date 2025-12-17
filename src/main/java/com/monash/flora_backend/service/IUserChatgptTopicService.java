package com.monash.flora_backend.service;

import cn.hutool.json.JSONArray;
import cn.hutool.json.JSONObject;
import com.baomidou.mybatisplus.extension.service.IService;
import com.monash.flora_backend.controller.vo.UserChatgptLogVO;
import com.monash.flora_backend.controller.vo.UserChatgptTopicVO;
import com.monash.flora_backend.dao.entity.UserChatgptTopic;

import java.util.List;
import java.util.Map;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author xinyu
 * @since 2025-01-23
 */
public interface IUserChatgptTopicService extends IService<UserChatgptTopic> {
    List<UserChatgptLogVO> getUserChatgptLogVOList(Long userId, String courseId);
    void findAllByUserIdAndCourseId(List<UserChatgptLogVO> userChatgptLogVOList, Long userId, String courseId, JSONObject resultJson);
//    Map<Long, UserChatgptTopicVO> findAllByUserIdAndCourseId(List<UserChatgptLogVO> userChatgptLogVOList, Long userId, String courseId, JSONObject resultJson);
    Long createNewTopic(Long userId, String courseId, String topicName);
//    void deleteTopic(Long topicId);
    void renameTopic(Long topicId, String topicName, String threadShowing);

    Map<Long, Map<String, List<String>>> getQuestionIdToThreadMap(List<UserChatgptLogVO> userChatgptLogVOList);

    JSONArray createMessageLogUntilQuestionId(Long userId, String courseId, String questionId, Long topicId, String oldThreadId) ;

}
