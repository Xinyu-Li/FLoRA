package com.monash.flora_backend.service.impl;

import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.lang.TypeReference;
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
import com.monash.flora_backend.controller.req.ChatgptRequest;
import com.monash.flora_backend.controller.vo.UserChatgptLogVO;
import com.monash.flora_backend.dao.entity.EssayAtTimePoint;
import com.monash.flora_backend.dao.entity.UserChatgptLog;
import com.monash.flora_backend.dao.mapper.UserChatgptLogMapper;
import com.monash.flora_backend.service.*;
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
import java.lang.reflect.Type;
import java.util.*;
import java.util.concurrent.atomic.AtomicLong;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
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
    private final UserChatgptLogMapper userChatgptLogMapper;
    private final UserChatgptTopicServiceImpl userChatgptTopicService;
    private final IAssistantRecordService assistantRecordService;
    private final IThreadRecordService threadRecordService;
    private final IEssayAtTimePointService iEssayAtTimePointService;

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


    /* ------------------------------------------------------------ */
    /* ----------------------  helper methods  -------------------- */
    /* ------------------------------------------------------------ */

    private int countGeneratedTimes(String questionId, Long userId, String courseId) {
        if (StrUtil.isBlank(questionId)) {
            return 0;
        }

        String key = MyConstant.REDIS_GPT_CHAT_LOG_LIST + userId + "-" + courseId;

        if (iGlobalCache.hasKey(key)) {
            return (int) iGlobalCache.lGet(key, 0, -1).stream()
                    .map(s -> JSONUtil.toBean(s, UserChatgptLogVO.class))
                    .filter(vo -> questionId.equals(vo.getQuestionId()))
                    .count();
        }
        // --- database fallback ---
        QueryWrapper<UserChatgptLog> wrapper = new QueryWrapper<UserChatgptLog>()
                .eq("question_id", questionId);
        return super.count(wrapper);          // only need total, not full list
    }

    private String resolveChatServiceUrl(String role) {
        role = StrUtil.blankToDefault(role, "").trim();

        // fast paths
        switch (role) {
            case MyConstant.CHATGPT_ROLE_ASSISTANT : return MyConstant.CHAT_SERVICE_URL + MyConstant.CHAT_SERVICE_CHATGPT_URI;
            case "assessment" : return MyConstant.CHAT_SERVICE_URL + MyConstant.CHAT_SERVICE_CHATGPT_ASSISTANT_SCORE_URI;
            case "feedback" : return MyConstant.CHAT_SERVICE_URL + MyConstant.CHAT_SERVICE_CHATGPT_ASSISTANT_SCAFFOLD_URI;
            case "embededGPT": return MyConstant.CHAT_SERVICE_URL + MyConstant.CHAT_SERVICE_CHATGPT_ASSISTANT_EMBED_URI;
            case "mediator_scaffold": return MyConstant.CHAT_SERVICE_URL + MyConstant.CHAT_SERVICE_CHATGPT_MEDIATOR_SCAFFOLD_URI;
            case MyConstant.CHATGPT_ROLE_PATIENT: return MyConstant.CHAT_SERVICE_URL + MyConstant.CHAT_SERVICE_CHATGPT_CONVERSATION_API_URI;
        }

        // fall-through roles that all share the same endpoint
        Set<String> assistantRoles = Set.of( //"patient",
                MyConstant.CHATGPT_ROLE_SCAFFOLD, "medicalteacher", "expert", "mediator_instruction",
                "mediator", "mayor", "peer", "professor", "whaler", "environmentalist",
                MyConstant.CHATGPT_ROLE_TUTOR, "reporter", "prompt_trainer", "chat-hint", MyConstant.AGENT_ROLE, MyConstant.CHATGPT_ROLE_SCAFFOLD_CHAT);

        if (assistantRoles.contains(role)) {
//            return MyConstant.CHAT_SERVICE_URL + MyConstant.CHAT_SERVICE_CHATGPT_ASSISTANT_URI;
            return MyConstant.CHAT_SERVICE_URL + MyConstant.CHAT_SERVICE_CHATGPT_CONVERSATION_API_URI;
        }

        throw new IllegalArgumentException("Unknown chatgptRole: " + role);
    }


    /**
     * 和 interactive scaffold 聊天的方法
     */
    @Override
    public UserChatgptLogVO getScaffoldChatResponse(String userQuestions, String extraPrompt, String questionId, String essay, List<String> backgroundFileNameList,
                                                    Long userId,  String courseId, String chatgptRole,  String assistantName, Integer roundNumber, Long topicId, String specialRequirementPrompt, String toolsLanguage) {

        /* --------------------------------------------------------
         * bookkeeping
         * ------------------------------------------------------ */
        String userAskTime = MyUtils.getCurrentTimestamp();
        questionId = StrUtil.isBlank(questionId) ? IdUtil.randomUUID() : questionId;
        int genTimes = countGeneratedTimes(questionId, userId, courseId);

        /* --------------------------------------------------------
         * url & request parameters
         * ------------------------------------------------------ */
        String url = resolveChatServiceUrl(chatgptRole);     // already knows “scaffold”, “scaffold-chat”, …

        // we do not need roleDescription / chatgptParameters for scaffold-chat,
        // therefore pass null / Collections.emptyList().

        MultiValueMap<String,String> params = ChatServiceUtil.buildCommonParams(
                userQuestions, extraPrompt, "", null, essay, backgroundFileNameList, userId, courseId, chatgptRole,
                Collections.emptyList(), assistantName, roundNumber, toolsLanguage, null, iGlobalCache // chatLog
                );

        // one scaffold-specific field
        if (StrUtil.isNotBlank(specialRequirementPrompt)) {
            params.add("specialRequirementPrompt", specialRequirementPrompt);
        }

        /* --------------------------------------------------------
         * call chat-service
         * ------------------------------------------------------ */
        String result = ChatServiceUtil.postToChatService(url, params, restTemplate);

        /* --------------------------------------------------------
         * persist / return
         * ------------------------------------------------------ */
        return createUserChatgptLog(result, userQuestions, "",        // no role-description here
                questionId, userAskTime, MyUtils.getCurrentTimestamp(),
                essay, userId, courseId, chatgptRole, genTimes,
                assistantName, topicId);
    }

    /**
     * High-level orchestration: 1) prepare data  2) call chat-service  3) store & return log VO.
     */
    /*@Override
    public UserChatgptLogVO getChatgptResponse(String userQuestions, String extraPrompt, String chatgptRoleDescription, String questionId, String essay, List<String> backgroundFileNameList,
                                               Long userId, String courseId, String chatgptRole, List<Integer> chatgptParameters, String assistantName, Integer roundNumber, Long topicId, String toolsLanguage) {

        final String userAskTime = MyUtils.getCurrentTimestamp();
        questionId = StrUtil.isEmpty(questionId) ? IdUtil.randomUUID() : questionId;
        final int generatedTimes  = countGeneratedTimes(questionId, userId, courseId);

        String url = resolveChatServiceUrl(chatgptRole);

        MultiValueMap<String,String> params = ChatServiceUtil.buildCommonParams(
                userQuestions, extraPrompt, "", chatgptRoleDescription, essay, backgroundFileNameList, userId, courseId, chatgptRole,
                chatgptParameters, assistantName, roundNumber, null, iGlobalCache, // chatLog not needed
                toolsLanguage);

        String result = ChatServiceUtil.postToChatService(url, params, restTemplate);

        return createUserChatgptLog(result, userQuestions, chatgptRoleDescription,
                questionId, userAskTime, MyUtils.getCurrentTimestamp(),
                essay, userId, courseId, chatgptRole, generatedTimes,
                assistantName, topicId);
    }*/
    @Override
    public UserChatgptLogVO getChatgptResponse(ChatgptRequest chatgptRequest) {

        /* ---------------------------------------------------- *
         * bookkeeping
         * ---------------------------------------------------- */
        String userAskTime = MyUtils.getCurrentTimestamp();
        String questionId = StrUtil.isBlank(chatgptRequest.getQuestionId()) ? IdUtil.randomUUID() : chatgptRequest.getQuestionId();
        int genTimes = countGeneratedTimes(questionId, chatgptRequest.getUserId(), chatgptRequest.getCourseId());

        /* ---------------------------------------------------- *
         * url
         * ---------------------------------------------------- */
        String url = resolveChatServiceUrl(chatgptRequest.getChatgptRole().trim());     // handles “embededGPT”

        /* ---------------------------------------------------- *
         * common request parameters
         * ---------------------------------------------------- */
        MultiValueMap<String,String> params = ChatServiceUtil.buildCommonParams(chatgptRequest, null, iGlobalCache);     // chatLog not used here


        String threadId = chatgptRequest.getThreadId();
        String oldThreadId = chatgptRequest.getOldThreadId();
        /* ---- assistant-specific extras -------------------- */
        if (StrUtil.isNotBlank(threadId)) {
            params.add("threadId", threadId);

            // “regenerate” is indicated by threadId value
            if ("regenerate".equals(threadId)) {
                String conversation = userChatgptTopicService.createMessageLogUntilQuestionId(
                        chatgptRequest.getUserId(), chatgptRequest.getCourseId(), questionId, chatgptRequest.getTopicId(), oldThreadId).toString();
                params.add("conversation", conversation);
            }
        }

        /* ---------------------------------------------------- *
         * call downstream
         * ---------------------------------------------------- */
        String result = ChatServiceUtil.postToChatService(url, params, restTemplate);

        /* ---------------------------------------------------- *
         * persist & return VO
         * ---------------------------------------------------- */
        return createUserChatgptLog(result, chatgptRequest.getQuestion(), chatgptRequest.getChatgptRoleDescription(),
                questionId, userAskTime, MyUtils.getCurrentTimestamp(),
                chatgptRequest.getEssay(), chatgptRequest.getUserId(), chatgptRequest.getCourseId(), chatgptRequest.getChatgptRole(), genTimes,
                chatgptRequest.getAgentName(), chatgptRequest.getTopicId());
    }


    /* ===================================================================== */
    /* ====================  PUBLIC  ======================================= */
    /* ===================================================================== */
    @Override
    public UserChatgptLogVO getChatgptConsultResponse(String userQuestions, String chatgptRoleDescription, String questionId, String essay,
                                                      List<String> backgroundFileNameList, Long userId, String courseId, String chatgptRole,
                                                      List<Integer> chatgptParameters, String assistantName, Integer roundNumber, String toolsLanguage) {

        String askTime  = MyUtils.getCurrentTimestamp();
        String qId      = StrUtil.isBlank(questionId) ? IdUtil.randomUUID() : questionId;
        int    genTimes = countGeneratedTimes(qId, userId, courseId);

        /* -------- consult-specific chat-log (only for scaffold / assessment) ---- */
        String chatLog = null;
        if ("scaffold".equals(chatgptRole) || "assessment".equals(chatgptRole)) {
            List<UserChatgptLogVO> logList = findAllChatgptLogByUserIdAndCourseIdAndTypeAndRoundNumber(userId, courseId, assistantName, roundNumber);
            chatLog = ChatServiceUtil.buildChatLogString(logList);
        }

        MultiValueMap<String,String> params = ChatServiceUtil.buildCommonParams(
                userQuestions, null, "", null, essay, backgroundFileNameList, userId, courseId, chatgptRole,
                chatgptParameters, assistantName, roundNumber, toolsLanguage, chatLog, iGlobalCache     // chatLog (may be null)
                );

        String url    = MyConstant.CHAT_SERVICE_URL + MyConstant.CHAT_SERVICE_CHATGPT_CONSULT_URI;

        String result = ChatServiceUtil.postToChatService(url, params, restTemplate);

        return createUserChatgptLog(result, userQuestions, chatgptRoleDescription,
                qId, askTime, MyUtils.getCurrentTimestamp(),
                essay, userId, courseId, chatgptRole, genTimes,
                assistantName, 0L);
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


    /**
     * 此方法hard code 太多内容，需要修改 TODO
     * @param userId
     * @param courseId
     * @param assistantName
     * @param roundNumber
     * @return
     */
    @Override
    public  List<UserChatgptLogVO> findAllChatgptLogByUserIdAndCourseIdAndTypeAndRoundNumber(Long userId, String courseId, String assistantName, Integer roundNumber){
        // 取type下划线后的字符串
        String person = assistantName.split("_")[1];
        // person与patient拼接
        String patient_type = String.format("patient_%s", person);
    // 找roundNumber指定数量的userchatgptlog
      QueryWrapper<UserChatgptLog> queryWrapper = new QueryWrapper<>();
      // select * from user_chatgpt_log where user_id = userId and course_id = courseId and type = type limit roundNumber
        queryWrapper.eq("user_id", userId);
        queryWrapper.eq("course_id", courseId);
        queryWrapper.eq("assistant_name", patient_type);
        queryWrapper.orderByDesc("id");
        queryWrapper.last("limit " + roundNumber);
        List<UserChatgptLog> userChatgptLogList = super.list(queryWrapper);
        List<UserChatgptLogVO> userChatgptLogVOList = MyBeanCopyUtils.copyBeanList(userChatgptLogList, UserChatgptLogVO.class);
        return userChatgptLogVOList;
    }

    @Override
    public UserChatgptLogVO createUserChatgptLog(
            String gptResponseResult, String userQuestion, String chatgptRoleDescription, String questionId, String userAskTime,
            String chatgptResponseTime, String essay, Long userId, String courseId, String chatgptRole,
            Integer responseGeneratedTimes, String assistantName, Long topicId) {
        UserChatgptLog userChatgptLog = new UserChatgptLog();
        if (Objects.equals("gpt-error", gptResponseResult) || StrUtil.isEmpty(gptResponseResult)) {
            userChatgptLog.setChatgptAnswer(gptResponseResult);

        } else {
            JSONObject jsonObject = JSONUtil.parseObj(gptResponseResult);
            JSONArray wholePrompt = jsonObject.getJSONArray("wholeprompt");
            JSONObject response = jsonObject.getJSONObject("response");

            String tempChatgptAnswer = "";
            String threadId = "";
            String responseType = "";
            String apiModel = "";
            String assistantId = "";
            String apiObject = "";
            String runId = "";
            String openaiConversationId = "";
            if (response.containsKey("choices")) {
                tempChatgptAnswer = response.getJSONArray("choices").getJSONObject(0).getJSONObject("message").getStr("content");
                threadId = "manual_thread_" + userId + "-" + courseId;
                apiModel = response.getStr("model");
                assistantId = "";
                apiObject = response.getStr("object");
                runId = "";
                responseType = "choices";

            } else if (response.containsKey("conversation")) {
                openaiConversationId = response.getJSONObject("conversation").getStr("id");
                String openaiConversationIdKey = MyConstant.REDIS_OPENAI_CONVERSATION_ID + userId + "-" + courseId + assistantName;
                if (!iGlobalCache.hasKey(openaiConversationIdKey)) {
                    iGlobalCache.set(openaiConversationIdKey, openaiConversationId, MyConstant.REDIS_EXPIRE_SECONDS);
                }

                tempChatgptAnswer = response.getJSONArray("output").getJSONObject(0).getJSONArray("content").getJSONObject(0).getStr("text");
                String regex = "==========.*?==========";
                Pattern pattern = Pattern.compile(regex);
                Matcher matcher = pattern.matcher(tempChatgptAnswer);
                if (matcher.find()) {
                    threadId = matcher.group(); // 临时使用thread Id 来存放，因为thread Id 以后不再使用
                }
                tempChatgptAnswer = matcher.replaceAll(" ");
                apiModel = response.getStr("model");
                assistantId = "";
                apiObject = response.getStr("object");
                runId = "";
                responseType = "conversation_response";


            } else {
                tempChatgptAnswer = response.getJSONObject("message").getJSONArray("content").getJSONObject(0).getJSONObject("text").getStr("value");
                threadId = response.getJSONObject("message").getStr("thread_id");
                apiModel = "";
                assistantId = response.getJSONObject("message").getStr("assistant_id");
                apiObject = response.getJSONObject("message").getStr("object");
                runId = response.getJSONObject("message").getStr("run_id");
                responseType = "message";

                if (!assistantRecordService.checkAssistantIdExist(assistantId)) {
                    assistantRecordService.createAssistantRecord(chatgptRole, assistantName, assistantId, MyConstant.PROJECT_ID);
                }
                if (!threadRecordService.checkThreadIdExist(threadId)) {
                    threadRecordService.createThreadRecord(userId, courseId, chatgptRole, assistantName, assistantId, threadId);
                }
            }

            userChatgptLog.setChatgptAnswer(tempChatgptAnswer);
            userChatgptLog.setChatgptWholePrompt(wholePrompt.toString());
            userChatgptLog.setThreadId(threadId);

            userChatgptLog.setResponseType(responseType);
            userChatgptLog.setApiModel(apiModel);
            userChatgptLog.setApiObject(apiObject);
            userChatgptLog.setRunId(runId);
            userChatgptLog.setAssistantId(assistantId);
            userChatgptLog.setOpenaiConversationId(openaiConversationId);
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
        userChatgptLog.setQuestionVersion(responseGeneratedTimes);      // 以前已经有一个了，但是现在的实现都是基于questionVersion来的，先这样弄

        userChatgptLog.setChatgptRole(chatgptRole);
        userChatgptLog.setChatgptWholeResponse(gptResponseResult);
        userChatgptLog.setAssistantName(assistantName);

        userChatgptLog.setTopicId(topicId);

        if (super.save(userChatgptLog)) { //存储Chatgpt Log
            UserChatgptLogVO userChatgptLogVO = MyBeanCopyUtils.copyBean(userChatgptLog, UserChatgptLogVO.class);

            iGlobalCache.lSet(MyConstant.REDIS_GPT_CHAT_LOG_LIST + userId + "-" + courseId, JSONUtil.toJsonStr(userChatgptLogVO), MyConstant.REDIS_EXPIRE_SECONDS);

            return userChatgptLogVO;
        } else {
            return null;
        }
    }

    /**
     * 先从redis中取，如果redis中没有，则从数据库取，从数据库获取之后再将内容放入redis 备查
     * @param userId
     * @return
     */
    @Override
    public List<UserChatgptLogVO> findAllChatgptLogByUserIdAndCourseId(Long userId, String courseId) {
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
                List<String> collect = userChatgptLogVOList.stream().map(JSONUtil::toJsonStr).collect(Collectors.toList());
                iGlobalCache.lSetAll(key, collect, MyConstant.REDIS_EXPIRE_SECONDS);
                return userChatgptLogVOList;
            }
        }
    }

    @Override
    public List<UserChatgptLogVO> findAllChatgptLogByUserIdAndCourseId(Long userId, String courseId, String chatgptRole, String chatgptNotRole) {
        QueryWrapper<UserChatgptLog> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("user_id", userId).eq("course_id", courseId);
        if (StrUtil.isNotEmpty(chatgptRole)) {
            queryWrapper.eq("chatgpt_role", chatgptRole);
        } else {
            queryWrapper.ne("chatgpt_role", chatgptNotRole);
        }

        queryWrapper.orderByAsc("user_ask_time");
        List<UserChatgptLogVO> userChatgptLogVOList = MyBeanCopyUtils.copyBeanList(super.list(queryWrapper), UserChatgptLogVO.class);
        if (CollUtil.isEmpty(userChatgptLogVOList)) {
            return new ArrayList<>();
        } else {
            return userChatgptLogVOList;
        }
    }

    @Deprecated
    @Override
    public Map<String, Integer> getCopesClassifySentence(String essay, List<String> backgroundTextFileNameList, Long userId, String courseId, String taskStartTime, Integer beginMinute, Integer endMinute) {

//         before send to chat-service for sentence classification, check essay database for updates
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


        String oldEssay;
        String currentEssay;
        String key14Minutes = userId + "-" + courseId + "-essayAtTimePoint-" + "14 minutes";
        String key21Minutes = userId + "-" + courseId + "-essayAtTimePoint-" + "21 minutes";
        if (iGlobalCache.hasKey(key14Minutes) && iGlobalCache.hasKey(key21Minutes)) { // 先从redis 获取
            oldEssay = iGlobalCache.get(key14Minutes);
            currentEssay = iGlobalCache.get(key21Minutes);
        } else { // 再从数据库获取
            List<EssayAtTimePoint> essayAtTimePointList = iEssayAtTimePointService.getEssayAtTimePointByUserIdAndCourseId(userId, courseId);
            Map<String, String> essayMap = new HashMap<>();
            essayAtTimePointList.forEach(e -> essayMap.put(e.getTimePointDesc(), e.getEssayContent()));
            if (!essayMap.containsKey("14 minutes") || !essayMap.containsKey("21 minutes")) {
                log.info("There is no essay at 14 minutes or 21 minutes, so skip classify sentence request.--------essayMap:{}", essayMap);
                return new HashMap<>();
            }
            oldEssay = essayMap.getOrDefault("14 minutes", "");
            currentEssay = essayMap.getOrDefault("21 minutes", "");
        }

        if (StrUtil.isBlank(currentEssay)) {
            log.info("currentEssay is null, so skip classify sentence request.--------currentEssay:{}-----oldEssay:{}", currentEssay, oldEssay);
            return new HashMap<>();
        }

        //提交参数设置
        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.add("myusername", "testusername");
        map.add("mypassword", "testpassword");
        map.add("currentEssay", currentEssay);
        map.add("oldEssay", oldEssay);
//        map.add("language", MyConstant.LANGUAGE);
//        if (!CollUtil.isEmpty(backgroundTextFileNameList)) {
//            map.add("classificationBackgroundFileNameList", String.join(";;;", backgroundTextFileNameList));
//        }


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

    /*@Override
    public List<String> getWritingSentenceClassification(String writeSentence) {
        String url = MyConstant.CHAT_SERVICE_URL + "/copes-classify-sentence-direct-result";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.add("myusername", "testusername");
        map.add("mypassword", "testpassword");

        map.add("writeSentence", writeSentence);
        map.add("language", MyConstant.LANGUAGE);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(map, headers);
        String result;
        List<String> copesClassifyResultList;
        try {
            result = restTemplate.postForObject(url, request, String.class);
            copesClassifyResultList = JSONUtil.parseObj(result).getJSONArray("result").toList(String.class);
        } catch (Exception e) {
            log.info("getCopesClassifySentence exception");
            e.printStackTrace();
            copesClassifyResultList = new ArrayList<>();
        }

        return copesClassifyResultList;
    }*/

    @Override
    public List<List<String>> batchWritingSentenceClassification(List<String> writeSentenceList) {
        String url = MyConstant.CHAT_SERVICE_URL + "/copes-classify-sentence-direct-result";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.add("myusername", "testusername");
        map.add("mypassword", "testpassword");
        log.info("writeSentenceList:{}", writeSentenceList);
        map.add("writeSentenceList", String.join(";--;;;--;", writeSentenceList));
        map.add("language", MyConstant.LANGUAGE);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(map, headers);
        String result;
        List<List<String>> copesClassifyResultList;
        try {
            result = restTemplate.postForObject(url, request, String.class);
//            log.info("getCopesClassifySentence result:{}", result);
//            JSONUtil.parseArray(result);
            Type type = new TypeReference<List<List<String>>>(){}.getType();
            copesClassifyResultList = JSONUtil.toBean(result, type, true);
//            copesClassifyResultList = JSONUtil.parseObj(result).getJSONArray("result").toList(String.class);
        } catch (Exception e) {
            log.info("getCopesClassifySentence exception");
            e.printStackTrace();
            copesClassifyResultList = new ArrayList<>();
        }
        log.info("copesClassifyResultList: {}", copesClassifyResultList);
        return copesClassifyResultList;
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
    }

    @Override
    public UserChatgptLogVO saveRuleBaseMessage(String userQuestions, String chatgptRoleDescription, String questionId, String essay, List<String> backgroundFileNameList, Long userId, String courseId, List<Integer> chatgptParameters, String assistantName){
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
        userChatgptLog.setAssistantName(assistantName);


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


    @Override
    public void updateHidden(Long userId, String clickedTimestamp) {
        //todo 在UserChatgptLogMapper里写一个update所有log的function
        userChatgptLogMapper.updateHiddenState(userId, clickedTimestamp);
    }

    @Override
    public String getBotTs(Long userId, String timestamp) {
        List<UserChatgptLogVO> userChatgptLogList = getBaseMapper().selectLogsWithAsktime(userId, timestamp);
        assert userChatgptLogList.size() == 1;
        return userChatgptLogList.get(0).getChatgptResponseTime();
    }






    /*
    @Override
    public UserChatgptLogVO getChatgptResponse(String userQuestions, String extraPrompt, String chatgptRoleDescription, String questionId, String essay,
                                               List<String> backgroundFileNameList, Long userId, String courseId,
                                               String chatgptRole, List<Integer> chatgptParameters, String assistantName, Integer roundNumber, Long topicId) {

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

        switch (chatgptRole) {
            case "assistant":
                url = MyConstant.CHAT_SERVICE_URL + MyConstant.CHAT_SERVICE_CHATGPT_URI;
                break;
            case "assessment":
                url = MyConstant.CHAT_SERVICE_URL + MyConstant.CHAT_SERVICE_CHATGPT_ASSISTANT_SCORE_URI;
                break;
            case "feedback":
                url = MyConstant.CHAT_SERVICE_URL + MyConstant.CHAT_SERVICE_CHATGPT_ASSISTANT_SCAFFOLD_URI;
                break;
            case "mediator_scaffold":
                url = MyConstant.CHAT_SERVICE_URL + MyConstant.CHAT_SERVICE_CHATGPT_MEDIATOR_SCAFFOLD_URI;
                break;
            case "patient":
            case "scaffold":
            case "medicalteacher":
            case "expert":
            case "mediator_instruction":
            case "mediator":
            case "mayor":
            case "peer":
            case "professor":
            case "whaler":
            case "environmentalist":
            case "tutor":
            case "reporter":
            case "prompt_trainer":
            case "chat-hint":
            case "scaffold-chat":
                url = MyConstant.CHAT_SERVICE_URL + MyConstant.CHAT_SERVICE_CHATGPT_ASSISTANT_URI;
                break;
            default:
                throw new IllegalArgumentException("Invalid chatgptRole: " + chatgptRole);
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
        map.add("assistantName", assistantName);

        // 如果roundNumber不为空，传入roundNumber
        if (roundNumber != null) {
            map.add("roundNumber", String.valueOf(roundNumber));
        }

        if (!StrUtil.isEmpty(essay)) {
            map.add("essay", essay);
        }

        map.add("extraPrompt", extraPrompt);
        map.add("userQuestions", userQuestions);
//        if("regenerate".equals(chatgptRole)) {
//            map.add("conversation",  userChatgptTopicService.createMessageLogUntilQuestionId( userId,  courseId,  questionId,  topicId).toString());
//        }
        if (!CollUtil.isEmpty(backgroundFileNameList)) {
            map.add("backgroundFileNameList", String.join(";;;", backgroundFileNameList));  // 在 python 端进行拆分
        }

        log.info("----------getChatgptResponse-----before send------ agent:" + assistantName);
        log.info("url:" + url);
//        log.info(map.toString());
        // 组装请求体
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(map, headers);
        String result;

        try {
            result = restTemplate.postForObject(url, request, String.class);
        } catch (Exception e) {
            result = "gpt-error";
            log.error(e.getMessage());
        }
        log.info("----------getChatgptResponse-----result");
//        log.info("response result:" + result);

        String chatgptResponseTime = MyUtils.getCurrentTimestamp();

        return createUserChatgptLog(result, userQuestions, chatgptRoleDescription, questionId, userAskTime, chatgptResponseTime, essay, userId, courseId, chatgptRole, responseGeneratedTimes, assistantName, topicId);
    }
    *






    @Override
    public UserChatgptLogVO getChatgptConsultResponse(String userQuestions, String chatgptRoleDescription, String questionId, String essay,
                                               List<String> backgroundFileNameList, Long userId, String courseId,
                                               String chatgptRole, List<Integer> chatgptParameters, String assistantName, Integer roundNumber) {

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

        map.add("chatgptParameters", chatgptParameters.stream().map(String::valueOf).collect(Collectors.joining(";;;")));
        map.add("type", assistantName);

        // 如果chatgptrole为scaffold或者assessment，查找聊天记录，
        if(chatgptRole.equals("scaffold") || chatgptRole.equals("assessment")){
           List<UserChatgptLogVO> chatlog = findAllChatgptLogByUserIdAndCourseIdAndTypeAndRoundNumber(userId, courseId, assistantName, roundNumber);

           // 将chatlog倒序排列
            Collections.reverse(chatlog);
           // 拼接chatlog，形式为："实习医生：\n患者：\n "
            StringBuilder chatlogStr = new StringBuilder();
            String doctor = "实习医生："; // 能否从thread id 里面获取
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
            e.printStackTrace();
        }
//        log.info("----------getChatgptResponse-----result");
//        log.info("response result:" + result);

        String chatgptResponseTime = MyUtils.getCurrentTimestamp();

        return createUserChatgptLog(result, userQuestions, chatgptRoleDescription, questionId, userAskTime, chatgptResponseTime, essay, userId, courseId, chatgptRole, responseGeneratedTimes, assistantName, 0L);
    }




    @Override
    public UserChatgptLogVO getScaffoldChatResponse(String userQuestions, String extraPrompt, String questionId, String essay,
                                               List<String> backgroundFileNameList, Long userId, String courseId,
                                               String chatgptRole, String assistantName, Integer roundNumber, Long topicId, String specialRequirementPrompt) {

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
        switch (chatgptRole) {
            case "scaffold":
            case "scaffold-chat":
            case "tutor":
            case "chat-hint": // for jimmie study
                url = MyConstant.CHAT_SERVICE_URL + MyConstant.CHAT_SERVICE_CHATGPT_ASSISTANT_URI;
                break;
            default:
                throw new IllegalArgumentException("Invalid chatgptRole: " + chatgptRole);
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
//        map.add("chatgptRoleDescription", chatgptRoleDescription);
//        map.add("chatgptParameters", chatgptParameters.stream().map(String::valueOf).collect(Collectors.joining(";;;")));
        map.add("assistantName", assistantName);
        map.add("specialRequirementPrompt", specialRequirementPrompt); // This is a question

        // 如果roundNumber不为空，传入roundNumber
        if (roundNumber != null) {
            map.add("roundNumber", String.valueOf(roundNumber));
        }

        if (!StrUtil.isEmpty(essay)) {
            map.add("essay", essay);
        }

        map.add("extraPrompt", extraPrompt);
        map.add("userQuestions", userQuestions);
//        if("regenerate".equals(chatgptRole)) {
//            map.add("conversation",  userChatgptTopicService.createMessageLogUntilQuestionId( userId,  courseId,  questionId,  topicId).toString());
//        }
        if (!CollUtil.isEmpty(backgroundFileNameList)) {
            map.add("backgroundFileNameList", String.join(";;;", backgroundFileNameList));  // 在 python 端进行拆分
        }

        log.info("----------getChatgptResponse-----before send------ agent:" + assistantName);
        log.info("url:" + url);
//        log.info(map.toString());
        // 组装请求体
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(map, headers);
        String result;

        try {
            result = restTemplate.postForObject(url, request, String.class);
        } catch (Exception e) {
            result = "gpt-error";
            log.error(e.getMessage());
            log.error("gpt-error in getScaffoldChatResponse");
        }
        log.info("----------getChatgptResponse-----result");
//        log.info("response result:" + result);

        String chatgptResponseTime = MyUtils.getCurrentTimestamp();

        return createUserChatgptLog(result, userQuestions, "", questionId, userAskTime, chatgptResponseTime, essay, userId, courseId, chatgptRole, responseGeneratedTimes, assistantName, topicId);
    }





@Override
    public UserChatgptLogVO getChatgptResponse(String userQuestions, String extraPrompt, String chatgptRoleDescription, String questionId, String essay,
                                               List<String> backgroundFileNameList, Long userId, String courseId,
                                               String chatgptRole, List<Integer> chatgptParameters, String assistantName, Integer roundNumber, Long topicId,
                                               String threadId, String oldThreadId) {
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
        if("embededGPT".equals(chatgptRole)) {
            url = MyConstant.CHAT_SERVICE_URL+ MyConstant.CHAT_SERVICE_CHATGPT_ASSISTANT_EMBED_URI;
        }
//        else if("regenerate".equals(chatgptRole)) {
//            url = MyConstant.CHAT_SERVICE_URL+ MyConstant.CHAT_SERVICE_CHATGPT_ASSISTANT_REGENERATE_URI;
//        }
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
        // todo 这里强制放了个assistant，默认的情况role就是这个
        map.add("chatgptRole", "assistant");
        map.add("chatgptRoleDescription", chatgptRoleDescription);
        map.add("chatgptParameters", chatgptParameters.stream().map(String::valueOf).collect(Collectors.joining(";;;")));
        map.add("assistantName", assistantName);

        // 如果roundNumber不为空，传入roundNumber
        if (roundNumber != null) {
            map.add("roundNumber", String.valueOf(roundNumber));
        }

        if (!StrUtil.isEmpty(essay)) {
            map.add("essay", essay);
        }

        map.add("extraPrompt", extraPrompt);
        map.add("userQuestions", userQuestions);
        map.add("threadId",  threadId);

        if("regenerate".equals(threadId)) {
            map.add("conversation",  userChatgptTopicService.createMessageLogUntilQuestionId( userId,  courseId,  questionId,  topicId, oldThreadId).toString());
        }

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
            e.printStackTrace();
        }
//        log.info("----------getChatgptResponse-----result");
//        log.info("response result:" + result);

        String chatgptResponseTime = MyUtils.getCurrentTimestamp();

        return createUserChatgptLog(result, userQuestions, chatgptRoleDescription, questionId, userAskTime, chatgptResponseTime, essay, userId, courseId, chatgptRole, responseGeneratedTimes, assistantName, topicId);
    }

    * */
}
