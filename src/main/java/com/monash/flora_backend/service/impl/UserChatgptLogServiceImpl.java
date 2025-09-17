package com.monash.flora_backend.service.impl;

import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.util.IdUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.json.JSONArray;
import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.google.common.collect.Lists;
import com.monash.flora_backend.config.cache.IGlobalCache;
import com.monash.flora_backend.constant.MyConstant;
import com.monash.flora_backend.controller.vo.UserChatgptLogVO;
import com.monash.flora_backend.dao.entity.UserChatgptLog;
import com.monash.flora_backend.dao.mapper.UserChatgptLogMapper;
import com.monash.flora_backend.service.IEssayService;
import com.monash.flora_backend.service.IUserChatgptLogService;
import com.monash.flora_backend.util.*;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.*;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;
import java.util.zip.ZipOutputStream;

import static com.monash.flora_backend.util.GenerateLinkCacheHelper.updateTypeCache;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author xinyu
 * @since 2023-03-06
 */
@Slf4j
@Service
@AllArgsConstructor
public class UserChatgptLogServiceImpl extends ServiceImpl<UserChatgptLogMapper, UserChatgptLog> implements IUserChatgptLogService {
    private final RestTemplate restTemplate;
    private final IGlobalCache iGlobalCache;
    private final IEssayService iEssayService;

    private Long getCountByUserIdsAndCourseIds(List<Long> userIdList, List<String> courseIdList) {
        AtomicLong totalCount = new AtomicLong();
        userIdList.forEach(userId -> {
            courseIdList.forEach(courseId -> {
                QueryWrapper<UserChatgptLog> wrapper = new QueryWrapper<>();
                wrapper.eq("user_id", userId).eq("course_id", courseId).orderByDesc("user_ask_time").last("LIMIT 1");
                totalCount.addAndGet(super.count(wrapper));
            });
        });
        return totalCount.get();
    }
    @Override
    public boolean removeByUserId(Long userId) {
        QueryWrapper<UserChatgptLog> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("user_id", userId);
        return super.remove(queryWrapper);
    }



    @Override
    public UserChatgptLogVO getChatgptResponse(String userQuestions, String extraPrompt, String chatgptRoleDescription, String questionId, String essay,
                                               List<String> backgroundFileNameList, Long userId, String courseId,
                                               String chatgptRole, List<Integer> chatgptParameters, String type, Integer roundNumber) {

        String userAskTime = MyUtils.getCurrentTimestamp();
        int responseGeneratedTimes = 0;
        if (StrUtil.isEmpty(questionId)) {
            questionId = IdUtil.randomUUID();
        } else {
            String key = MyConstant.REDIS_GPT_CHAT_LOG_LIST + userId + "-" + courseId;
            // get from redis
            if (iGlobalCache.hasKey(key)) {

                List<String> objects = iGlobalCache.lGet(key, 0, -1);
                for (String object : objects) { // since user chat log is not long, so search all list is acceptable
                    UserChatgptLogVO userChatgptLogVO = JSONUtil.toBean(object, UserChatgptLogVO.class);
                    if (Objects.equals(questionId, userChatgptLogVO.getQuestionId())) {
                        responseGeneratedTimes++;
                    }
                }
            } else { // get from database
                QueryWrapper<UserChatgptLog> queryWrapper = new QueryWrapper<>();
                queryWrapper.eq("question_id", questionId);
                List<UserChatgptLog> userChatgptLogList = super.list(queryWrapper);   //
                responseGeneratedTimes = userChatgptLogList.size() + 1;
            }
        }

        String url = MyConstant.CHAT_SERVICE_URL + MyConstant.CHAT_SERVICE_CHATGPT_ASSISTANT_URI;
        chatgptRole = chatgptRole.trim();
        log.info("chatgptRole: " + chatgptRole);
        // todo: 以下可以变成switch case形式
        if(chatgptRole.equals("assistant")){
            url = MyConstant.CHAT_SERVICE_URL + MyConstant.CHAT_SERVICE_CHATGPT_URI;
        }
        else if(chatgptRole.equals("patient")){
            url = MyConstant.CHAT_SERVICE_URL + MyConstant.CHAT_SERVICE_CHATGPT_ASSISTANT_URI;
        }
        else if(chatgptRole.equals("scaffold")){
            url = MyConstant.CHAT_SERVICE_URL + MyConstant.CHAT_SERVICE_CHATGPT_ASSISTANT_SCAFFOLD_URI;
        }
        else if (chatgptRole.equals("assessment")){
            url = MyConstant.CHAT_SERVICE_URL + MyConstant.CHAT_SERVICE_CHATGPT_ASSISTANT_SCORE_URI;
        }
        else if (chatgptRole.equals("medicalteacher")){
            url = MyConstant.CHAT_SERVICE_URL + MyConstant.CHAT_SERVICE_CHATGPT_ASSISTANT_URI;
        }
        else if (chatgptRole.equals("expert")){
            url = MyConstant.CHAT_SERVICE_URL + MyConstant.CHAT_SERVICE_CHATGPT_ASSISTANT_URI;
        }
        else if (chatgptRole.equals("mediator_instruction") || chatgptRole.equals("mediator") ){
            url = MyConstant.CHAT_SERVICE_URL + MyConstant.CHAT_SERVICE_CHATGPT_ASSISTANT_URI;
        }
        else if(chatgptRole.equals("mediator_scaffold")){
            url = MyConstant.CHAT_SERVICE_URL + MyConstant.CHAT_SERVICE_CHATGPT_MEDIATOR_SCAFFOLD_URI;
        }
        else if("mayor".equals(chatgptRole) || "peer".equals(chatgptRole) || "professor".equals(chatgptRole) || "whaler".equals(chatgptRole) || "environmentalist".equals(chatgptRole) || "tutor".equals(chatgptRole) || "prompt_trainer".equals(chatgptRole)){
            url = MyConstant.CHAT_SERVICE_URL+ MyConstant.CHAT_SERVICE_CHATGPT_ASSISTANT_URI;
        }
        else {
            log.info("Chatgpt Role ERROR!"+ chatgptRole);
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        //提交参数设置
        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.add("myusername", "testusername");
        map.add("mypassword", "testpassword");

        map.add("userId", String.valueOf(userId));
        map.add("courseId", courseId);
        map.add("chatgptRole", chatgptRole);
        map.add("chatgptRoleDescription", chatgptRoleDescription);
        map.add("chatgptParameters", chatgptParameters.stream().map(String::valueOf).collect(Collectors.joining(";;;")));
        map.add("agentName",type);

        // 如果roundNumber不为空，传入roundNumber
        if (roundNumber != null) {
            map.add("roundNumber", String.valueOf(roundNumber));
        }

        if (!StrUtil.isEmpty(essay)) {
            map.add("essay", essay);
        }

        map.add("extraPrompt", extraPrompt);
        map.add("userQuestions", userQuestions);

        if (!CollUtil.isEmpty(backgroundFileNameList)) {
            map.add("backgroundFileNameList", String.join(";;;", backgroundFileNameList));  // 在 python 端进行拆分
        }

//        log.info("----------getChatgptResponse-----before send");
//        log.info(map.toString());
        // 组装请求体
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(map, headers);
        String result;
        try {
            result = restTemplate.postForObject(url, request, String.class);
        } catch (Exception e) {
            result = "gpt-error";
        }
//        log.info("----------getChatgptResponse-----result");
//        log.info("response result:" + result);

        String chatgptResponseTime = MyUtils.getCurrentTimestamp();

        return createUserChatgptLog(result, userQuestions, chatgptRoleDescription, questionId, userAskTime, chatgptResponseTime, essay, userId, courseId, chatgptRole, responseGeneratedTimes,type);
    }



    @Override
    public UserChatgptLogVO getChatgptConsultResponse(String userQuestions, String chatgptRoleDescription, String questionId, String essay,
                                               List<String> backgroundFileNameList, Long userId, String courseId,
                                               String chatgptRole, List<Integer> chatgptParameters, String type, Integer roundNumber) {

        String userAskTime = MyUtils.getCurrentTimestamp();
        int responseGeneratedTimes = 0;
        if (StrUtil.isEmpty(questionId)) {
            questionId = IdUtil.randomUUID();
        } else {
            String key = MyConstant.REDIS_GPT_CHAT_LOG_LIST + userId + "-" + courseId;
            // get from redis
            if (iGlobalCache.hasKey(key)) {

                List<String> objects = iGlobalCache.lGet(key, 0, -1);
                for (String object : objects) { // since user chat log is not long, so search all list is acceptable
                    UserChatgptLogVO userChatgptLogVO = JSONUtil.toBean(object, UserChatgptLogVO.class);
                    if (Objects.equals(questionId, userChatgptLogVO.getQuestionId())) {
                        responseGeneratedTimes++;
                    }
                }
            } else { // get from database
                QueryWrapper<UserChatgptLog> queryWrapper = new QueryWrapper<>();
                queryWrapper.eq("question_id", questionId);
                List<UserChatgptLog> userChatgptLogList = super.list(queryWrapper);   //
                responseGeneratedTimes = userChatgptLogList.size() + 1;
            }
        }

        String url = MyConstant.CHAT_SERVICE_URL + MyConstant.CHAT_SERVICE_CHATGPT_CONSULT_URI;

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        //提交参数设置
        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.add("myusername", "testusername");
        map.add("mypassword", "testpassword");

        map.add("userId", String.valueOf(userId));
        map.add("courseId", courseId);
        map.add("chatgptRole", chatgptRole);
        map.add("chatgptRoleDescription", chatgptRoleDescription);
        map.add("chatgptParameters", chatgptParameters.stream().map(String::valueOf).collect(Collectors.joining(";;;")));
        map.add("type",type);

        // 如果chatgptrole为scaffold或者assessment，查找聊天记录，
        if(chatgptRole.equals("scaffold") || chatgptRole.equals("assessment")){
           List<UserChatgptLogVO> chatlog = findAllChatgptLogByUserIdAndCourseIdAndTypeAndRoundNumber(userId, courseId, type, roundNumber);

           // 将chatlog倒序排列
            Collections.reverse(chatlog);
           // 拼接chatlog，形式为："实习医生：\n患者：\n "
            StringBuilder chatlogStr = new StringBuilder();
            String doctor = "实习医生：";
            String patient = "患者：";
            for (UserChatgptLogVO userChatgptLogVO : chatlog) {
                chatlogStr.append(doctor).append(userChatgptLogVO.getUserQuestions()).append("\n");
                chatlogStr.append(patient).append(userChatgptLogVO.getChatgptAnswer()).append("\n");
            }
           log.info("chatlogStr: " + chatlogStr.toString());
              map.add("chatlog", chatlogStr.toString());
        }

        if (!StrUtil.isEmpty(essay)) {
            map.add("essay", essay);
        }

        map.add("userQuestions", userQuestions);

        if (!CollUtil.isEmpty(backgroundFileNameList)) {
            map.add("backgroundFileNameList", String.join(";;;", backgroundFileNameList));  // 在 python 端进行拆分
        }

//        log.info("----------getChatgptResponse-----before send");
//        log.info(map.toString());
        // 组装请求体
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(map, headers);
        String result;
        try {
            result = restTemplate.postForObject(url, request, String.class);
        } catch (Exception e) {
            result = "gpt-error";
        }
//        log.info("----------getChatgptResponse-----result");
//        log.info("response result:" + result);

        String chatgptResponseTime = MyUtils.getCurrentTimestamp();

        return createUserChatgptLog(result, userQuestions, chatgptRoleDescription, questionId, userAskTime, chatgptResponseTime, essay, userId, courseId, chatgptRole, responseGeneratedTimes,type);
    }



    @Override
    public void rateChatgptAnswer(Long userChatgptLogId, Integer responseRatingStar, Integer responseRatingThumb, Long userId, String courseId) {
        UserChatgptLog userChatgptLog = super.getById(userChatgptLogId);
        if(responseRatingStar != 0){
            userChatgptLog.setResponseRatingStar(responseRatingStar);
        }
        if(responseRatingThumb != 0){
            userChatgptLog.setResponseRatingThumb(responseRatingThumb);
        }
        // update database
        super.updateById(userChatgptLog);

        UserChatgptLogVO userChatgptLogVO = MyBeanCopyUtils.copyBean(userChatgptLog, UserChatgptLogVO.class);
        // update redis
        String key = MyConstant.REDIS_GPT_CHAT_LOG_LIST + userId + "-" + courseId;
        if (iGlobalCache.hasKey(key)) {
            List<String> objects = iGlobalCache.lGet(key, 0, -1);
            int index = 0;
            boolean found = false;
            for (String object : objects) {

                UserChatgptLogVO tempUserChatgptLogVO = JSONUtil.toBean(object, UserChatgptLogVO.class);
                if (Objects.equals(tempUserChatgptLogVO.getId(), userChatgptLogId)) {
                    iGlobalCache.lUpdateIndex(key, index, JSONUtil.toJsonStr(userChatgptLogVO));
                    found = true;
                    break;
                }
                index++;
            }
            if (!found) {
                log.info("rateChatgptAnswer - -------------------Element not found in the list:" + key);
            }
        } else {
            log.info("rateChatgptAnswer - no records in redis, only update database");

        }
    }


    @Override
    public  List<UserChatgptLogVO> findAllChatgptLogByUserIdAndCourseIdAndTypeAndRoundNumber(Long userId, String courseId, String type, Integer roundNumber){
        // 取type下划线后的字符串
        String person = type.split("_")[1];
        // person与patient拼接
        String patient_type = String.format("patient_%s", person);
    // 找roundNumber指定数量的userchatgptlog
      QueryWrapper<UserChatgptLog> queryWrapper = new QueryWrapper<>();
      // select * from user_chatgpt_log where user_id = userId and course_id = courseId and type = type limit roundNumber
        queryWrapper.eq("user_id", userId);
        queryWrapper.eq("course_id", courseId);
        queryWrapper.eq("type", patient_type);
        queryWrapper.orderByDesc("id");
        queryWrapper.last("limit " + roundNumber);
        List<UserChatgptLog> userChatgptLogList = super.list(queryWrapper);
        List<UserChatgptLogVO> userChatgptLogVOList = MyBeanCopyUtils.copyBeanList(userChatgptLogList, UserChatgptLogVO.class);
        return userChatgptLogVOList;
    }

    @Override
    public UserChatgptLogVO createUserChatgptLog(String gptResponseResult, String userQuestion, String chatgptRoleDescription, String questionId, String userAskTime, String chatgptResponseTime, String essay, Long userId, String courseId, String chatgptRole, Integer responseGeneratedTimes, String type) {
        UserChatgptLog userChatgptLog = new UserChatgptLog();
        if (Objects.equals("gpt-error", gptResponseResult) || StrUtil.isEmpty(gptResponseResult)) {
            userChatgptLog.setChatgptAnswer(gptResponseResult);

        } else {
            JSONObject jsonObject = JSONUtil.parseObj(gptResponseResult);
            JSONArray wholePrompt = jsonObject.getJSONArray("wholeprompt");
            JSONObject response = jsonObject.getJSONObject("response");

            String tempChatgptAnswer = "";
            String threadId = "";
            if (response.containsKey("choices")) {
                tempChatgptAnswer = response.getJSONArray("choices").getJSONObject(0).getJSONObject("message").getStr("content");

            } else {
                tempChatgptAnswer = response.getJSONObject("message").getJSONArray("content").getJSONObject(0).getJSONObject("text").getStr("value");
                threadId = response.getJSONObject("message").getStr("thread_id");
            }

            userChatgptLog.setChatgptAnswer(tempChatgptAnswer);
            userChatgptLog.setChatgptWholePrompt(wholePrompt.toString());
            userChatgptLog.setThreadId(threadId);
        }

        userChatgptLog.setUserId(userId);
        userChatgptLog.setUserQuestions(userQuestion);
        userChatgptLog.setUserAskTime(userAskTime);
        userChatgptLog.setChatgptResponseTime(chatgptResponseTime);
        userChatgptLog.setEssay(essay);


        userChatgptLog.setCourseId(courseId);
        userChatgptLog.setQuestionId(questionId);
        userChatgptLog.setChatgptRoleDescription(chatgptRoleDescription);

        userChatgptLog.setResponseRatingStar(0);  // 0 - no selection     1-5  - show stars
        userChatgptLog.setResponseRatingThumb(0); // 0 - no selection     1 - thumb up      2 - thumb down
        userChatgptLog.setResponseGeneratedTimes(responseGeneratedTimes);

        userChatgptLog.setChatgptRole(chatgptRole);
        userChatgptLog.setChatgptWholeResponse(gptResponseResult);
        userChatgptLog.setType(type);

        if (super.save(userChatgptLog)) { //存储Chatgpt Log
            UserChatgptLogVO userChatgptLogVO = MyBeanCopyUtils.copyBean(userChatgptLog, UserChatgptLogVO.class);

            iGlobalCache.lSet(MyConstant.REDIS_GPT_CHAT_LOG_LIST + userId + "-" + courseId, JSONUtil.toJsonStr(userChatgptLogVO), MyConstant.REDIS_EXPIRE_SECONDS);

            return userChatgptLogVO;
        } else {
            return null;
        }
    }

    /*@Override
    public String getChatgptResponseNoLimit(String question, Long userId, String instructionForChatgpt) { //You are a helpful assistant
        String url = MyConstant.CHAT_SERVICE_URL + "/ask-nolimit";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);


        //提交参数设置
        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.add("question", question); // 为什么传question，因为有可能需要把question 加到背景材料中去
        map.add("settings", "[{\"role\": \"system\",\"content\": \"" + instructionForChatgpt.replace("\"", "'") + "\"}, {\"role\": \"user\",\"content\": \"" + question.replace("\"", "'") + "\"}]");
        map.add("myusername", "testusername");
        map.add("mypassword", "testpassword");
        map.add("userid", String.valueOf(userId));


        // 组装请求体
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(map, headers);
        String result;
        try {
            result = restTemplate.postForObject(url, request, String.class);
        } catch (Exception e) {
            result = "gpt-error";
        }
        log.info("----------sendPostRequestToGetResult-----result");
        log.info(result);

        return result;
    }*/


    /*
    @Override
    public String getChatgptResponseWithoutBackgroundRubric(Long userId, String courseId,String instructionForChatgpt) {
        String url = MyConstant.CHAT_SERVICE_URL + "/generate-chatgpt-scaffold-no-background";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);


        //提交参数设置
        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        assert instructionForChatgpt != null : "instructionForChatgpt cannot be null";
//        instructionForChatgpt = instructionForChatgpt == null ? "You are a helpful assistant." : instructionForChatgpt;

//        map.add("settings", "[{\"role\": \"system\",\"content\": \"" + instructionForChatgpt.replace("\"", "'") + "\"}]");
        map.add("gptinstruction", instructionForChatgpt.replace("\"", "'"));
        map.add("myusername", "testusername");
        map.add("mypassword", "testpassword");

        map.add("userid", String.valueOf(userId));
        map.add("courseid", courseId);


        log.info("----------sendPostRequestToGetResult-----before send");
        log.info(map.toString());
        // 组装请求体
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(map, headers);
        String result;
        try {
            result = restTemplate.postForObject(url, request, String.class);
        } catch (Exception e) {
            result = "gpt-error";
        }
        log.info("----------sendPostRequestToGetResult-----result");
        log.info(result);
        //result example:
        // {"choices":[{"finish_reason":"stop","index":0,"message":{"content":"Hello! How can I assist you today?","role":"assistant"}}],"created":1681268357,"id":"chatcmpl-74KzVWs8oqKBbUSCMyn20gb6JmgsH","model":"gpt-3.5-turbo-0301","object":"handler.completion","usage":{"completion_tokens":9,"prompt_tokens":743,"total_tokens":752}}
        //{"answer": "The main topic is a group assignment for a course, which includes information on group communication, effective team size, Git management, submission requirements, academic integrity, and marking guide.}"

        return result;
    }
*/

    /**
     * 先从redis中取，如果redis中没有，则从数据库取，从数据库获取之后再将内容放入redis 备查
     * @param userId
     * @return
     */
    @Override
    public List<UserChatgptLogVO> findAllChatgptLogByUserIdAndCourseId(Long userId, String courseId) {
//        log.info("into findAllChatgptLogByUserId**********");

//        if (Objects.equals(ChatgptItemType.CHAT.getValue(), type)) { //cache只缓存chat, 不缓存 scaffold
//            String key = MyConstant.REDIS_GPT_CHAT_LOG_LIST + userId + "-" + courseId;
//            if (iGlobalCache.hasKey(key)) {
//                List<Object> objList = iGlobalCache.lGet(key, 0, -1);
//                List<UserChatgptLogVO> reverseList = new ArrayList<>();
////            objList.stream().map(obj -> JSON.parseObject(String.valueOf(obj), UserChatgptLogVO.class)).collect(Collectors.toList()).forEach(userChatgptLogVO -> reverseList.add(0, userChatgptLogVO));
//                objList.stream().map(obj -> JSONUtil.toBean(String.valueOf(obj), UserChatgptLogVO.class)).collect(Collectors.toList()).forEach(userChatgptLogVO -> reverseList.add(0, userChatgptLogVO));
//                log.info(reverseList.size() + "============");
//                return reverseList;
//            } else {
//                QueryWrapper<UserChatgptLog> queryWrapper = new QueryWrapper<>();
//                queryWrapper.eq("user_id", userId).eq("course_id", courseId).eq("type", type).orderByAsc("user_ask_time");
//                List<UserChatgptLogVO> userChatgptLogVOList = MyBeanCopyUtils.copyBeanList(super.list(queryWrapper), UserChatgptLogVO.class);
//                // 放入redis
//                iGlobalCache.lSetAll(key, userChatgptLogVOList.stream().map(JSONUtil::toJsonStr).collect(Collectors.toList()), MyConstant.REDIS_EXPIRE_SECONDS);
//                return userChatgptLogVOList;
//            }
//        } else {  // GPT scaffold 不放入 redis 缓存
//            QueryWrapper<UserChatgptLog> queryWrapper = new QueryWrapper<>();
//            queryWrapper.eq("user_id", userId).eq("course_id", courseId).eq("type", type).orderByAsc("user_ask_time");
//
//            return MyBeanCopyUtils.copyBeanList(super.list(queryWrapper), UserChatgptLogVO.class);
//        }



        String key = MyConstant.REDIS_GPT_CHAT_LOG_LIST + userId + "-" + courseId;
        if (iGlobalCache.hasKey(key)) {
            List<String> objList = iGlobalCache.lGet(key, 0, -1);
            List<UserChatgptLogVO> reverseList = new ArrayList<>();
//            objList.stream().map(obj -> JSON.parseObject(String.valueOf(obj), UserChatgptLogVO.class)).collect(Collectors.toList()).forEach(userChatgptLogVO -> reverseList.add(0, userChatgptLogVO));
            objList.stream().map(obj -> JSONUtil.toBean(obj, UserChatgptLogVO.class)).collect(Collectors.toList()).forEach(userChatgptLogVO -> reverseList.add(0, userChatgptLogVO));
            log.info(reverseList.size() + "============");
            return reverseList;
        } else {
            QueryWrapper<UserChatgptLog> queryWrapper = new QueryWrapper<>();
            queryWrapper.eq("user_id", userId).eq("course_id", courseId).orderByAsc("user_ask_time");
            List<UserChatgptLogVO> userChatgptLogVOList = MyBeanCopyUtils.copyBeanList(super.list(queryWrapper), UserChatgptLogVO.class);
            if (CollUtil.isEmpty(userChatgptLogVOList)) {
                return new ArrayList<>();
            } else {
                // 放入redis
                iGlobalCache.lSetAll(key, userChatgptLogVOList.stream().map(JSONUtil::toJsonStr).collect(Collectors.toList()), MyConstant.REDIS_EXPIRE_SECONDS);
                return userChatgptLogVOList;
            }
        }
    }


    @Override
    public Map<String, Integer> getCopesClassifySentence(String essay, List<String> backgroundTextFileNameList, Long userId, String courseId, String taskStartTime, Integer beginMinute, Integer endMinute) {

        // before send to chat-service for sentence classification, check essay database for updates
        boolean essayChanged = iEssayService.checkEssayHasUpdateBetweenTimeRange(userId, courseId,
                String.valueOf(Long.parseLong(taskStartTime) + beginMinute * 60 * 1000),
                String.valueOf(Long.parseLong(taskStartTime) + endMinute * 60 * 1000));
        if (!essayChanged) {
            //如果essay 没有change ，则不需要继续发送请求
            return new HashMap<>();
        }


        String url = MyConstant.CHAT_SERVICE_URL + "/copes-classify-sentence";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        if (StrUtil.isEmpty(essay)) { // 如果essay 为空，则不需要继续发送请求
            return new HashMap<>();
        }

        //提交参数设置
        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.add("myusername", "testusername");
        map.add("mypassword", "testpassword");
        map.add("essay", essay);
        if (!CollUtil.isEmpty(backgroundTextFileNameList)) {
            map.add("classificationBackgroundFileNameList", String.join(";;;", backgroundTextFileNameList));
        }


        // 组装请求体
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(map, headers);
        String result;
        HashMap<String, Integer> copesClassifyResultMap;
        try {
            result = restTemplate.postForObject(url, request, String.class);
            copesClassifyResultMap = JSONUtil.toBean(result, HashMap.class);

        } catch (Exception e) {
            log.info("getCopesClassifySentence exception");
            copesClassifyResultMap = new HashMap<>();
        }
        log.info("----------sendPostRequestToGetResult-----result----copes result:" + String.valueOf(copesClassifyResultMap));

        return copesClassifyResultMap;
    }

    @Override
    public void exportChatgptLogToExcelByUserIdListAndCourseIdList(List<Long> userIdList, List<String> courseIdList,
                                                                   ZipOutputStream zos) throws IOException {
        //头部，第一层
        List<List<String>> allHead = initialiseHeader();

        List<List<Object>> allData = Lists.newArrayList();
        List<UserChatgptLog> userChatgptLogList = findChatGptLogByUserIdListCourseIdList(userIdList, courseIdList);

        userChatgptLogList.forEach(userChatgptLog -> {
            //封装数据体
                List<Object> data = Lists.newArrayList(allData.size() + 1,
                        userChatgptLog.getUserId(), userChatgptLog.getChatgptRoleDescription(), userChatgptLog.getQuestionId(), userChatgptLog.getUserQuestions(),
                        userChatgptLog.getUserAskTime(), userChatgptLog.getChatgptAnswer(), userChatgptLog.getChatgptResponseTime(), userChatgptLog.getEssay(),
                        userChatgptLog.getResponseRatingStar(), userChatgptLog.getResponseRatingThumb(), userChatgptLog.getResponseGeneratedTimes(), userChatgptLog.getChatgptRole(),
                        userChatgptLog.getChatgptWholeResponse(), userChatgptLog.getChatgptWholePrompt(), userChatgptLog.getCourseId());
                allData.add(data);
            }
        );
//        userIdList.forEach(userId -> {
//            courseIdList.forEach(courseId -> {
//                List<UserChatgptLogVO> userChatgptLogVOList = findAllChatgptLogByUserIdAndCourseId(userId, courseId);
//                //封装数据体
//                for (int k = 0; k < userChatgptLogVOList.size(); k++) {
//                    UserChatgptLogVO userChatgptLog = userChatgptLogVOList.get(k);
//
//                    List<Object> data = Lists.newArrayList((k+1),
//                            userChatgptLog.getUserId(), userChatgptLog.getChatgptRoleDescription(), userChatgptLog.getQuestionId(), userChatgptLog.getUserQuestions(),
//                            userChatgptLog.getUserAskTime(), userChatgptLog.getChatgptAnswer(), userChatgptLog.getChatgptResponseTime(), userChatgptLog.getEssay(),
//                            userChatgptLog.getResponseRatingStar(), userChatgptLog.getResponseRatingThumb(), userChatgptLog.getResponseGeneratedTimes(), userChatgptLog.getChatgptRole(),
//                            userChatgptLog.getChatgptWholeResponse(), userChatgptLog.getChatgptWholePrompt(), userChatgptLog.getCourseId()
//                    );
//                    allData.add(data);
//                }
//            });
//        });

        byte[] stream = DynamicEasyExcelExportUtil.customerExportExcelFile(allHead, allData);
        // 写入zip
        FileUtils.writeToZip(zos, stream, "chatgpt_log.xlsx");

    }

    private List<UserChatgptLog> findChatGptLogByUserIdListCourseIdList(List<Long> userIdList, List<String> courseIdList) {
        return getBaseMapper().findChatGptLogByUserIdListCourseIdList(userIdList, courseIdList.stream().map(Long::valueOf).collect(Collectors.toList()));

    }

    private static List<List<String>> initialiseHeader() {
        List<String> head1 = new ArrayList<>();
        head1.add("#");
        head1.add("user_id");
        head1.add("chatgpt_role_description");
        head1.add("question_id");
        head1.add("user_questions");
        head1.add("user_ask_time");
        head1.add("chatgpt_answer");
        head1.add("chatgpt_response_time");
        head1.add("essay");
        head1.add("response_rating_star");
        head1.add("response_rating_thumb");
        head1.add("response_generated_times");
        head1.add("chatgpt_role");
        head1.add("chatgpt_whole_response");
        head1.add("chatgpt_whole_prompt");
        head1.add("course_id");


        //封装头部
        List<List<String>> allHead = new ArrayList<>();
        allHead.add(head1);
        return allHead;
    }

    @Override
    public void exportChatgptLogToExcelByUserIdListAndCourseIdList(List<Long> userIdList, List<String> courseIdList, ZipOutputStream zos, int cutRow) throws IOException {
        ExcelBreaker excelBreaker = new ExcelBreaker(cutRow, "chatgpt_log", initialiseHeader(), zos);

        userIdList.forEach(userId -> {
            courseIdList.forEach(courseId -> {
                List<UserChatgptLogVO> userChatgptLogVOList = findAllChatgptLogByUserIdAndCourseId(userId, courseId);
                //封装数据体
                for (int k = 0; k < userChatgptLogVOList.size(); k++) {
                    UserChatgptLogVO userChatgptLog = userChatgptLogVOList.get(k);

                    List<Object> data = Lists.newArrayList((k+1),
                            userChatgptLog.getUserId(), userChatgptLog.getChatgptRoleDescription(), userChatgptLog.getQuestionId(), userChatgptLog.getUserQuestions(),
                            userChatgptLog.getUserAskTime(), userChatgptLog.getChatgptAnswer(), userChatgptLog.getChatgptResponseTime(), userChatgptLog.getEssay(),
                            userChatgptLog.getResponseRatingStar(), userChatgptLog.getResponseRatingThumb(), userChatgptLog.getResponseGeneratedTimes(), userChatgptLog.getChatgptRole(),
                            userChatgptLog.getChatgptWholeResponse(), userChatgptLog.getChatgptWholePrompt(), userChatgptLog.getCourseId()
                    );
                    excelBreaker.getAllData().add(data);
                    // 2. 每次完成一次add data就increase
                    excelBreaker.increaseCount(1);
                    // 如果counter超过了cutRow，保存进zip
                    excelBreaker.tryUpdateParamsAndSave();
                }
            });
        });
        excelBreaker.saveExcelToZip();
    }

    @Override
    public void exportChatgptLogToExcelByUserIdListAndCourseIdList(List<Long> userIdList, List<String> courseIdList, int cutRows, String token, String dateString) throws IOException {
        ExcelBreaker excelBreaker = new ExcelBreaker(cutRows, "chatgpt_log", initialiseHeader(), token, dateString);
        updateTypeCache(token, "chatgpt_log", iGlobalCache);
        if(MyConstant.checkNumberOfInstance)
            iGlobalCache.hset(token, "num-total-rows", String.valueOf(getCountByUserIdsAndCourseIds(userIdList, courseIdList)));
        List<UserChatgptLog> userChatgptLogList = findChatGptLogByUserIdListCourseIdList(userIdList, courseIdList);

        userChatgptLogList.forEach(userChatgptLog -> {
                    //封装数据体
                    List<Object> data = Lists.newArrayList(excelBreaker.getAllData().size() + 1,
                            userChatgptLog.getUserId(), userChatgptLog.getChatgptRoleDescription(), userChatgptLog.getQuestionId(), userChatgptLog.getUserQuestions(),
                            userChatgptLog.getUserAskTime(), userChatgptLog.getChatgptAnswer(), userChatgptLog.getChatgptResponseTime(), userChatgptLog.getEssay(),
                            userChatgptLog.getResponseRatingStar(), userChatgptLog.getResponseRatingThumb(), userChatgptLog.getResponseGeneratedTimes(), userChatgptLog.getChatgptRole(),
                            userChatgptLog.getChatgptWholeResponse(), userChatgptLog.getChatgptWholePrompt(), userChatgptLog.getCourseId());
                    excelBreaker.getAllData().add(data);
                    // 2. 每次完成一次add data就increase
                    excelBreaker.increaseCount(1);
                    excelBreaker.tryUpdateCache(iGlobalCache);
                    // 如果counter超过了cutRow，保存进zip
                    excelBreaker.tryUpdateParamsAndSaveToExcel();
        });
        excelBreaker.saveExcelToFile();

//        userIdList.forEach(userId -> {
//            courseIdList.forEach(courseId -> {
//                List<UserChatgptLogVO> userChatgptLogVOList = findAllChatgptLogByUserIdAndCourseId(userId, courseId);
//                //封装数据体
//                for (int k = 0; k < userChatgptLogVOList.size(); k++) {
//                    UserChatgptLogVO userChatgptLog = userChatgptLogVOList.get(k);
//
//                    List<Object> data = Lists.newArrayList((k+1),
//                            userChatgptLog.getUserId(), userChatgptLog.getChatgptRoleDescription(), userChatgptLog.getQuestionId(), userChatgptLog.getUserQuestions(),
//                            userChatgptLog.getUserAskTime(), userChatgptLog.getChatgptAnswer(), userChatgptLog.getChatgptResponseTime(), userChatgptLog.getEssay(),
//                            userChatgptLog.getResponseRatingStar(), userChatgptLog.getResponseRatingThumb(), userChatgptLog.getResponseGeneratedTimes(), userChatgptLog.getChatgptRole(),
//                            userChatgptLog.getChatgptWholeResponse(), userChatgptLog.getChatgptWholePrompt(), userChatgptLog.getCourseId()
//                    );
//                    excelBreaker.getAllData().add(data);
//                    // 2. 每次完成一次add data就increase
//                    excelBreaker.increaseCount(1);
//                    excelBreaker.tryUpdateCache(iGlobalCache);
//                    // 如果counter超过了cutRow，保存进zip
//                    excelBreaker.tryUpdateParamsAndSaveToExcel();
//                }
//            });
//        });
    }

    @Override
    public UserChatgptLogVO saveRuleBaseMessage(String userQuestions, String chatgptRoleDescription, String questionId, String essay, List<String> backgroundFileNameList, Long userId, String courseId, List<Integer> chatgptParameters, String agentName){
        // 根据type判断应该如何response
        String userAskTime = MyUtils.getCurrentTimestamp();
        int responseGeneratedTimes = 1;
        String askAllExpert = "mediator_rule_based_ask_all_experts";
        String askNoExpert = "mediator_rule_based_not_ask_any_experts";
        String askNoAllExpert = "mediator_rule_based_not_ask_all_experts";


//        String questionId = IdUtil.randomUUID();
        String tempWholePrompt = userQuestions + " " + askAllExpert;

        UserChatgptLog userChatgptLog = new UserChatgptLog();

        userChatgptLog.setChatgptRoleDescription(chatgptRoleDescription);
//        userChatgptLog.setChatgptRole(chatgptRole);

        userChatgptLog.setChatgptAnswer(userQuestions);
        userChatgptLog.setChatgptWholePrompt(tempWholePrompt);
        userChatgptLog.setChatgptWholeResponse(userQuestions);

        String responseTime = MyUtils.getCurrentTimestamp();

        userChatgptLog.setThreadId("thread_rule_based");
        userChatgptLog.setQuestionId(questionId);
        userChatgptLog.setCourseId(courseId);
        userChatgptLog.setUserId(userId);

        userChatgptLog.setUserAskTime(userAskTime);
        userChatgptLog.setChatgptResponseTime(responseTime);

        userChatgptLog.setEssay(essay);
        userChatgptLog.setType(agentName);


        userChatgptLog.setResponseRatingStar(0);  // 0 - no selection     1-5  - show stars
        userChatgptLog.setResponseRatingThumb(0); // 0 - no selection     1 - thumb up      2 - thumb down
        userChatgptLog.setResponseGeneratedTimes(responseGeneratedTimes);

        if (super.save(userChatgptLog)) {
            UserChatgptLogVO userChatgptLogVO = MyBeanCopyUtils.copyBean(userChatgptLog, UserChatgptLogVO.class);
            return userChatgptLogVO;
        } else {
            return null;
        }

    }
}
