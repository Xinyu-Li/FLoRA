package com.monash.flora_backend.service.impl;

import cn.hutool.json.JSONArray;
import cn.hutool.json.JSONObject;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.monash.flora_backend.controller.vo.UserChatgptLogMessagesVO;
import com.monash.flora_backend.controller.vo.UserChatgptLogVO;
import com.monash.flora_backend.controller.vo.UserChatgptTopicVO;
import com.monash.flora_backend.dao.entity.UserChatgptTopic;
import com.monash.flora_backend.dao.mapper.UserChatgptTopicMapper;
import com.monash.flora_backend.service.IUserChatgptTopicService;
import com.monash.flora_backend.util.MyUtils;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author xinyu
 * @since 2025-01-23
 */
@Service
@AllArgsConstructor
public class UserChatgptTopicServiceImpl extends ServiceImpl<UserChatgptTopicMapper, UserChatgptTopic> implements IUserChatgptTopicService {


    @Override
    public List<UserChatgptLogVO> getUserChatgptLogVOList(Long userId, String courseId) {
        return getBaseMapper().selectLogsWithTopicNameByUserId(userId, courseId);
    }

    @Override
    public void findAllByUserIdAndCourseId(List<UserChatgptLogVO> userChatgptLogVOList, Long userId, String courseId, JSONObject resultJson) {
//        userChatgptLogVOList 里面包含topic list 和 chat log list
//    public Map<Long, UserChatgptTopicVO> findAllByUserIdAndCourseId(List<UserChatgptLogVO> userChatgptLogVOList, Long userId, String courseId, JSONObject resultJson) {
//        log.warn(userChatgptLogVOList.toString());
        Set<String> questionIdSet = new HashSet<>();
        Map<Long, String> topicShowingThreadId = new HashMap<>();
        Map<Long, UserChatgptTopicVO> userChatgptTopicVOMap = new HashMap<>();

        for (UserChatgptLogVO userChatgptLogVO : userChatgptLogVOList) {


            Long topicId = userChatgptLogVO.getTopicId();
            String topicName = userChatgptLogVO.getTopicName();

            if (userChatgptLogVO.getId() == null) {
                UserChatgptTopicVO userChatgptTopicVO = new UserChatgptTopicVO();
                userChatgptTopicVO.setId(topicId);
                userChatgptTopicVO.setTopicName(topicName);
                userChatgptTopicVO.setMessages(new HashMap<>());
                userChatgptTopicVOMap.put(topicId, userChatgptTopicVO);

                continue;
            }
            // 如果threadId为空，则说明是error的一行，直接忽略
//            if (userChatgptLogVO.getThreadId() == null)
//                continue;

            topicShowingThreadId.put(userChatgptLogVO.getTopicId(), userChatgptLogVO.getThreadShowing());
            if (userChatgptLogVO.getQuestionVersion() > 0) {
                String baseListThreadId = getBaseMessageListThreadId(userChatgptLogVOList, userChatgptLogVO.getQuestionId());
                List<UserChatgptLogMessagesVO> baseList = userChatgptTopicVOMap.get(topicId).getMessages().get(baseListThreadId);
                if (userChatgptTopicVOMap.get(topicId).getMessages().containsKey(userChatgptLogVO.getThreadId()))
                    throw new Error("In creating copy from base list, target threadId already exist");
                userChatgptTopicVOMap.get(topicId).getMessages().put(userChatgptLogVO.getThreadId(), copyMessageBeforeQuestionId(baseList, userChatgptLogVO.getQuestionId()));
            }
            if (userChatgptTopicVOMap.containsKey(topicId)) {
                UserChatgptTopicVO userChatgptTopicVO = userChatgptTopicVOMap.get(topicId);

                parseUserQuestionGptAnswer(questionIdSet, userChatgptLogVO, userChatgptTopicVO, userChatgptLogVO.getThreadId());
            } else {
                UserChatgptTopicVO userChatgptTopicVO = new UserChatgptTopicVO();
                userChatgptTopicVO.setId(topicId);
                userChatgptTopicVO.setTopicName(topicName);
                userChatgptTopicVO.setMessages(new HashMap<>());

                parseUserQuestionGptAnswer(questionIdSet, userChatgptLogVO, userChatgptTopicVO, userChatgptLogVO.getThreadId());

                userChatgptTopicVOMap.put(topicId, userChatgptTopicVO);
            }
        }

        // 如果是空的，表示存在空的 topic，则查询所有的topic并返回topic 列表
//        if (CollUtil.isEmpty(userChatgptLogVOList)) {
//            QueryWrapper<UserChatgptTopic> queryWrapper = new QueryWrapper<>();
//            queryWrapper.eq("user_id", userId).eq("course_id", courseId).orderByAsc("topic_create_time");
//            List<UserChatgptTopic> userChatgptTopicList = super.list(queryWrapper);
//            userChatgptTopicList.forEach(topic -> {
//                UserChatgptTopicVO userChatgptTopicVO = new UserChatgptTopicVO();
//                userChatgptTopicVO.setId(topic.getId());
//                userChatgptTopicVO.setTopicName(topic.getTopicName());
//                userChatgptTopicVO.setMessages(new HashMap<>());
//                userChatgptTopicVOMap.put(topic.getId(), userChatgptTopicVO);
//            });
//        }
        log.warn(userChatgptTopicVOMap.toString());
        resultJson.set("allTopics", userChatgptTopicVOMap);
        resultJson.set("topicShowingThreadId", topicShowingThreadId);
        resultJson.set("questionIdToThread", getQuestionIdToThreadMap(userChatgptLogVOList));

    }

    private void parseUserQuestionGptAnswer(Set<String> questionIdSet, UserChatgptLogVO userChatgptLogVO, UserChatgptTopicVO userChatgptTopicVO, String threadId) {
        //user question 需要判定 是不是 被重复问了，重复问的情况下，问题只保留一个，答案会生成多个
        // regenerate 和edit question用同一组处理方法，regenerate的情况视为问题一样的edit，因此这部分的判断不要了

//        if (!questionIdSet.contains(userChatgptLogVO.getQuestionId())) {
        questionIdSet.add(userChatgptLogVO.getQuestionId());

        // add user message
        UserChatgptLogMessagesVO userMessage = new UserChatgptLogMessagesVO();
        userMessage.setSender("user");
        userMessage.setId(userChatgptLogVO.getId());
        userMessage.setText(userChatgptLogVO.getUserQuestions());
        userMessage.setSendTime(userChatgptLogVO.getUserAskTime());
        userMessage.setThumb(0);
        userMessage.setQuestionId(userChatgptLogVO.getQuestionId());
        userMessage.setFirstCreatedInThreadId(userChatgptLogVO.getThreadId());
        userMessage.setHidden(userChatgptLogVO.getHidden());
        if (userChatgptTopicVO.getMessages().containsKey(threadId)) {
            userChatgptTopicVO.getMessages().get(threadId).add(userMessage);
        } else {
            if (threadId != null) {
                List<UserChatgptLogMessagesVO> messageList = new ArrayList<>();
                messageList.add(userMessage);
                userChatgptTopicVO.getMessages().put(threadId, messageList);
            }
        }
//        }

        // add bot message
        UserChatgptLogMessagesVO botMessage = new UserChatgptLogMessagesVO();
        botMessage.setSender("bot");
        botMessage.setId(userChatgptLogVO.getId());
        botMessage.setText(userChatgptLogVO.getChatgptAnswer());
        botMessage.setSendTime(userChatgptLogVO.getChatgptResponseTime());
        botMessage.setThumb(userChatgptLogVO.getResponseRatingThumb());
        botMessage.setQuestionId(userChatgptLogVO.getQuestionId());
        botMessage.setFirstCreatedInThreadId(userChatgptLogVO.getThreadId());

        botMessage.setHidden(userChatgptLogVO.getHidden());
        if (userChatgptTopicVO.getMessages().containsKey(threadId)) {
            userChatgptTopicVO.getMessages().get(threadId).add(botMessage);
        } else {
            List<UserChatgptLogMessagesVO> messageList = new ArrayList<>();
            messageList.add(botMessage);
            userChatgptTopicVO.getMessages().put(threadId, messageList);
        }
    }
    List<UserChatgptLogMessagesVO> copyMessageBeforeQuestionId(List<UserChatgptLogMessagesVO> baseList, String questionId) {

        List<UserChatgptLogMessagesVO> result = new ArrayList<>();

        // Iterate over the list until we find the message with the given questionId.
        for (UserChatgptLogMessagesVO message : baseList) {
            // If the current message has the specified questionId, stop copying.
            if (questionId.equals(message.getQuestionId())) {
                break;
            }
            // Otherwise, add the message to the new list.
            result.add(message);
        }

        return result;
    }

    String getBaseMessageListThreadId(List<UserChatgptLogVO> userChatgptLogVOList, String questionId) {
        for (UserChatgptLogVO userChatgptLogVO : userChatgptLogVOList) {
            if (userChatgptLogVO.getQuestionVersion() == 0 && Objects.equals(userChatgptLogVO.getQuestionId(), questionId))
                return userChatgptLogVO.getThreadId();
        }
        throw new Error("getBaseMessageListThreadId: base list not found. This is likely the issue from inconsistent data record in database");
    }

//    void processingThreadBranchInfo(Map<Long, Map<String, List<JSONObject>>> threadQuestionBranch, UserChatgptLogVO userChatgptLogVO) {
//        if ()
//        if (!threadQuestionBranch.containsKey(userChatgptLogVO.getTopicId())){
//            threadQuestionBranch.put(userChatgptLogVO.getTopicId(), new HashMap<>());
//        }
//        if (! threadQuestionBranch.get(userChatgptLogVO.getTopicId()).containsKey(userChatgptLogVO.getThreadId())){
//            threadQuestionBranch.get(userChatgptLogVO.getTopicId()).put(userChatgptLogVO.getThreadId(), new ArrayList<>());
//        }
//
//
//
//    }
    @Override
    public Long createNewTopic(Long userId, String courseId, String topicName) {
        UserChatgptTopic userChatgptTopic = new UserChatgptTopic();
        userChatgptTopic.setTopicName(topicName);
        userChatgptTopic.setUserId(userId);
        userChatgptTopic.setCourseId(courseId);
        String currentTimestamp = MyUtils.getCurrentTimestamp();
        userChatgptTopic.setTopicCreateTime(currentTimestamp);
        userChatgptTopic.setTopicCreateTime(currentTimestamp);
        super.save(userChatgptTopic);

        return userChatgptTopic.getId();
    }

//    @Override
//    public void deleteTopic(Long topicId) {
//        super.removeById(topicId);
//    }

    @Override
    public void renameTopic(Long topicId, String topicName, String threadShowing) {
        UserChatgptTopic userChatgptTopic = new UserChatgptTopic();
        userChatgptTopic.setTopicName(topicName);
        userChatgptTopic.setId(topicId);
        userChatgptTopic.setThreadShowing(threadShowing);
        String currentTimestamp = MyUtils.getCurrentTimestamp();
        userChatgptTopic.setTopicUpdateTime(currentTimestamp);
        super.updateById(userChatgptTopic);

    }

    @Override
    public Map<Long, Map<String, List<String>>> getQuestionIdToThreadMap(List<UserChatgptLogVO> userChatgptLogVOList) {
        Map<Long, Map<String, List<String>>> result = new HashMap<>();
        for (UserChatgptLogVO userChatgptLogVO : userChatgptLogVOList) {
            if (userChatgptLogVO.getThreadId() == null)
                continue;
            if (!result.containsKey(userChatgptLogVO.getTopicId())) {
                Map<String, List<String>> topicMapper = new HashMap<>();
                result.put(userChatgptLogVO.getTopicId(), topicMapper);
            }
//            if (userChatgptLogVO.getQuestionVersion() > 0) {
                if (result.get(userChatgptLogVO.getTopicId()).containsKey(userChatgptLogVO.getQuestionId())) {
                    result.get(userChatgptLogVO.getTopicId()).get(userChatgptLogVO.getQuestionId()).add(userChatgptLogVO.getThreadId());
                } else {
                    List<String> threadIdList = new ArrayList<>();
                    threadIdList.add(userChatgptLogVO.getThreadId());
                    result.get(userChatgptLogVO.getTopicId()).put(userChatgptLogVO.getQuestionId(), threadIdList);
                }
                if (result.get(userChatgptLogVO.getTopicId()).get(userChatgptLogVO.getQuestionId()).size() != userChatgptLogVO.getQuestionVersion() + 1)
                    throw new Error("getQuestionIdToThreadMap error, the order of question seems incorrect. This is likely the issue from inconsistent data record in database");
//            }
        }
        result.forEach((outerKey, innerMap) ->
                innerMap.entrySet().removeIf(innerEntry -> innerEntry.getValue().size() == 1)
        );
        return result;
    }

    @Override
    public JSONArray createMessageLogUntilQuestionId(Long userId, String courseId, String questionId, Long topicId, String oldThreadId) {

        // todo：这里可以优化,单独弄一个提取记录的function，现在是用的request-chatgpt-response的findAllByUserIdAndCourseId，有很多多余操作
        List<UserChatgptLogVO> userChatgptLogVOList = getBaseMapper().selectLogsWithTopicNameByUserIdAndTopicId(userId, courseId, topicId);
        JSONObject dataHolder = new JSONObject();
        findAllByUserIdAndCourseId(userChatgptLogVOList, userId, courseId, dataHolder);
        JSONObject allTopics = (JSONObject) dataHolder.get("allTopics");
        JSONObject aTopic = (JSONObject) allTopics.get(topicId.toString());
        JSONObject messages = (JSONObject) aTopic.get("messages");
        JSONArray baseThread = (JSONArray) messages.get(oldThreadId);
//         messages = userChatgptTopicVOMap.get(topicId).getMessages();

        return extractLogs(baseThread, questionId);
    }
    private JSONArray extractLogs(JSONArray baseThread, String stopQuestionId){
        JSONArray formattedMessages = new JSONArray();

        // Iterate over each thread in the map
        for (int i = 0; i < baseThread.size(); i++) {
            JSONObject message = baseThread.getJSONObject(i);

            // Stop iterating if we encounter the specific questionId.
            if (message.getStr("questionId").equals(stopQuestionId)) {
                break;
            }

            // Determine role based on sender.
            String sender = message.getStr("sender");
            String role = sender.equals("user") ? "user" :
                    sender.equals("bot") ? "assistant" : "unknown";

            // Build the formatted message.
            JSONObject formattedMessage = new JSONObject();
            formattedMessage.set("role", role);

            // Create the content array with the text object.
            JSONArray contentArray = new JSONArray();
            JSONObject textObject = new JSONObject();
            textObject.set("type", "text");
            textObject.set("text", message.getStr("text"));
            contentArray.put(textObject);

            formattedMessage.set("content", contentArray);

            // Add the formatted message to our result array.
            formattedMessages.put(formattedMessage);
        }
        log.warn(formattedMessages.toString());

        return formattedMessages;
    }

}
