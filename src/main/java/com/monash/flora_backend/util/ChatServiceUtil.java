package com.monash.flora_backend.util;

import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.util.StrUtil;
import com.monash.flora_backend.config.cache.IGlobalCache;
import com.monash.flora_backend.constant.MyConstant;
import com.monash.flora_backend.controller.req.ChatgptRequest;
import com.monash.flora_backend.controller.vo.UserChatgptLogVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Slf4j
public class ChatServiceUtil {

    /*public static MultiValueMap<String, String> buildCommonParams(GptScaffoldRequest gptScaffoldRequest, String chatLog, IGlobalCache iGlobalCache) {
        Long userId = gptScaffoldRequest.getUserId();
        String courseId = gptScaffoldRequest.getCourseId();
        String assistantName = gptScaffoldRequest.getAgentName();
        String chatgptRole = gptScaffoldRequest.getGptScaffoldRole();

        return buildCommonParams(gptScaffoldRequest.getQuestion(), chatgptRequest.getExtraPrompt(), chatgptRequest.getSpecialRequirementPrompt(), chatgptRequest.getChatgptRoleDescription(), chatgptRequest.getEssay(), chatgptRequest.getBackgroundFileNameList(), userId, courseId, chatgptRole,
                chatgptRequest.getChatgptParameters(), assistantName, chatgptRequest.getRoundNumber(), chatgptRequest.getToolsLanguage(), chatLog, iGlobalCache);
    }*/

    public static MultiValueMap<String, String> buildCommonParams(String userQuestions, String extraPrompt, String specialRequirementPrompt, String roleDescription, String essay, List<String> backgroundFiles, Long userId, String courseId, String chatgptRole,
                                                                  List<Integer> chatgptParameters, String assistantName, Integer roundNumber, String toolsLanguage, String chatLog, IGlobalCache iGlobalCache) {
        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        /* ------------ mandatory auth ----------------- */
        map.add("myusername", "testusername");
        map.add("mypassword", "testpassword");

        /* ------------ mandatory business fields ------ */
        map.add("userId", String.valueOf(userId));
        map.add("courseId", courseId);
        map.add("chatgptRole", chatgptRole);
        map.add("chatgptParameters", chatgptParameters.stream().map(String::valueOf).collect(Collectors.joining(";;;")));
//        if (!Objects.equals(chatgptRole, "patient")) {
//            AssistantRecord assistantRecord = assistantRecordService.findByAssistantNameAndProjectId(assistantName, MyConstant.PROJECT_ID);
//            if (assistantRecord != null) {
//                map.add("assistantId", assistantRecord.getAssistantId());
//                ThreadRecord threadRecord = threadRecordService.findByUserIdAndCourseIdAndAssistantId(userId, courseId, assistantRecord.getAssistantId());
//                if (threadRecord == null) {
//                    map.add("threadId", "");
//                } else {
//                    map.add("threadId", threadRecord.getThreadId());
//                }
//            } else {
//
//                map.add("threadId", "");
//                map.add("assistantId", "");
//            }
//        }
        map.add("assistantName", assistantName);

        if (iGlobalCache.hasKey(MyConstant.REDIS_OPENAI_CONVERSATION_ID + userId + "-" + courseId + assistantName)) {
            map.add("openAIConversationId", iGlobalCache.get(MyConstant.REDIS_OPENAI_CONVERSATION_ID + userId + "-" + courseId + assistantName));
        }
//        if (assistantName.startsWith("cella3_energy_group")) { // 如果同一个site 聊天有多语言问题，可以临时改这里， 但是COPES 分类那里
//            map.add("language", "en");
//        } else {
//            map.add("language", MyConstant.LANGUAGE);
//        }
        map.add("language", toolsLanguage);

        map.add("userQuestions", userQuestions);

        /* ------------ optional fields ---------------- */
        if (StrUtil.isNotBlank(extraPrompt))  map.add("extraPrompt", extraPrompt);
        if (StrUtil.isNotBlank(roleDescription)) map.add("chatgptRoleDescription", roleDescription);
        if (roundNumber != null) map.add("roundNumber", String.valueOf(roundNumber));
        if (StrUtil.isNotBlank(essay)) map.add("essay", essay);
        if (CollUtil.isNotEmpty(backgroundFiles)) map.add("backgroundFileNameList", String.join(";;;", backgroundFiles));
        if (StrUtil.isNotBlank(chatLog)) map.add("chatlog", chatLog);
        if (StrUtil.isNotBlank(specialRequirementPrompt)) map.add("specialRequirementPrompt", specialRequirementPrompt);

        if (Objects.equals(chatgptRole, "patient") || Objects.equals(chatgptRole, "reporter")) {
            map.add("apiModel", "gpt-4o");
        } else {
            map.add("apiModel", "gpt-4.1");
        }

        return map;
    }

    public static MultiValueMap<String, String> buildCommonParams(ChatgptRequest chatgptRequest, String chatLog, IGlobalCache iGlobalCache) {
        Long userId = chatgptRequest.getUserId();
        String courseId = chatgptRequest.getCourseId();
        String assistantName = chatgptRequest.getAgentName();
        String chatgptRole = chatgptRequest.getChatgptRole();

        return buildCommonParams(chatgptRequest.getQuestion(), chatgptRequest.getExtraPrompt(), chatgptRequest.getSpecialRequirementPrompt(), chatgptRequest.getChatgptRoleDescription(), chatgptRequest.getEssay(), chatgptRequest.getBackgroundFileNameList(), userId, courseId, chatgptRole,
                chatgptRequest.getChatgptParameters(), assistantName, chatgptRequest.getRoundNumber(), chatgptRequest.getToolsLanguage(), chatLog, iGlobalCache);
    }

    /**
     * Builds the Chinese “doctor / patient” conversation string used
     * by scaffold / assessment consult calls.
     */
    public static String buildChatLogString(List<UserChatgptLogVO> logList) {

        Collections.reverse(logList);          // newest first -> oldest last

        StringBuilder sb     = new StringBuilder();
        String doctor  = "实习医生：";
        String patient = "患者：";

        for (UserChatgptLogVO vo : logList) {
            sb.append(doctor).append(vo.getUserQuestions()).append('\n')
                    .append(patient).append(vo.getChatgptAnswer()).append('\n');
        }
        log.info("chatlogStr: {}", sb);
        return sb.toString();
    }

    public static String postToChatService(String url, MultiValueMap<String, String> params, RestTemplate restTemplate) {
        HttpEntity<MultiValueMap<String, String>> request =
                new HttpEntity<>(params, createFormHeader());

        try {
            return restTemplate.postForObject(url, request, String.class);
        } catch (Exception e) {
            log.error("Chat-service call failed: {}", e.getMessage(), e);
            return "gpt-error";
        }
    }

    public static HttpHeaders createFormHeader() {
        HttpHeaders h = new HttpHeaders();
        h.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        return h;
    }
}
