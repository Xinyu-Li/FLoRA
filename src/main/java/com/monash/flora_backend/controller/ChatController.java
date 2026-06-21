package com.monash.flora_backend.controller;

import cn.hutool.core.util.StrUtil;
import cn.hutool.json.JSONObject;
import com.monash.flora_backend.config.cache.IGlobalCache;
import com.monash.flora_backend.controller.req.ChatgptRequest;
import com.monash.flora_backend.controller.vo.LabUserInteractionKeyEventsVO;
import com.monash.flora_backend.controller.vo.UserChatgptLogVO;
import com.monash.flora_backend.dao.entity.GptScaffold;
import com.monash.flora_backend.dao.entity.TraceData;
import com.monash.flora_backend.dao.entity.UserChatgptLog;
import com.monash.flora_backend.service.IGptScaffoldService;
import com.monash.flora_backend.service.ITraceDataService;
import com.monash.flora_backend.service.IUserChatgptLogService;
import com.monash.flora_backend.service.IUserChatgptTopicService;
import com.monash.flora_backend.util.JSONResult;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * All Chat related requests are gradually migrated to this controller.
 */
@Slf4j
@RestController
@AllArgsConstructor
public class ChatController {

    private static final long COPY_CHAT_TO_WRITING_MAX_GAP_MS = 120000L;
    private static final int MAX_SCAFFOLD_ORDER = 3;

    private final IUserChatgptTopicService iUserChatgptTopicService;
    private final IGlobalCache iGlobalCache;
    private final IUserChatgptLogService iUserChatgptLogService;
    private final IGptScaffoldService iGptScaffoldService;
    private final ITraceDataService iTraceDataService;

    /**
     * Every user has multiple topics, and each topic has multiple chat logs.
     */
    @GetMapping("/load-chatgpt-chat-and-topics/{userId}/{courseId}")
    public JSONResult loadChatgptChatHistory(@PathVariable("userId") Long userId, @PathVariable("courseId") String courseId) {
        List<UserChatgptLogVO> userChatgptLogVOList = iUserChatgptTopicService.getUserChatgptLogVOList(userId, courseId);
        JSONObject resultJson = new JSONObject();
        iUserChatgptTopicService.findAllByUserIdAndCourseId(userChatgptLogVOList, userId, courseId, resultJson);
        return JSONResult.ok(resultJson);
    }

    /**
     * This method is designed for NHB info-seeking task.
     */
    @PostMapping("/request-chatgpt-response")
    public JSONResult requestChatgptResponse(ChatgptRequest chatgptRequest) {
        UserChatgptLogVO userChatgptLogVO = iUserChatgptLogService.getChatgptResponse(chatgptRequest);
        return JSONResult.ok(userChatgptLogVO);
    }

    @PostMapping("/add-chatgpt-topic")
    public JSONResult addChatgptTopic(@RequestParam("userId") Long userId,
                                      @RequestParam("courseId") String courseId,
                                      @RequestParam("topicName") String topicName) {
        Long newTopicId = iUserChatgptTopicService.createNewTopic(userId, courseId, topicName);
        return JSONResult.ok(newTopicId);
    }

    @PostMapping("/delete-chatgpt-topic")
    public JSONResult deleteChatgptTopic(@RequestParam("topicId") Long topicId) {
        iUserChatgptTopicService.removeById(topicId);
        return JSONResult.ok();
    }

    @PostMapping("/update-chatgpt-topic")
    public JSONResult updateChatgptTopic(@RequestParam("topicId") Long topicId,
                                         @RequestParam("topicName") String topicName,
                                         @RequestParam("threadShowing") String threadShowing) {
        iUserChatgptTopicService.renameTopic(topicId, topicName, threadShowing);
        return JSONResult.ok();
    }

    @PostMapping("/update-chatgpt-message-hidden")
    public JSONResult updateChatMessageHidden(@RequestParam("userId") Long userId,
                                              @RequestParam("clickedTimestamp") String clickedTimestamp) {
        iUserChatgptLogService.updateHidden(userId, clickedTimestamp);
        return JSONResult.ok();
    }

    @PostMapping("/update-chatgpt-message-thumb")
    public JSONResult updateChatgptMessageThumb(@RequestParam("messageId") Long messageId,
                                                @RequestParam("thumbStatus") Integer thumbStatus,
                                                @RequestParam(value = "ratingContainerType", required = false, defaultValue = "chat") String ratingContainerType) {
        if (StrUtil.equals("chat", ratingContainerType)) {
            UserChatgptLog userChatgptLog = new UserChatgptLog();
            userChatgptLog.setResponseRatingThumb(thumbStatus);
            userChatgptLog.setId(messageId);
            iUserChatgptLogService.updateById(userChatgptLog);
        } else {
            GptScaffold gptScaffold = new GptScaffold();
            gptScaffold.setId(messageId);
            gptScaffold.setResponseRatingThumb(thumbStatus);
            iGptScaffoldService.updateById(gptScaffold);
        }
        return JSONResult.ok();
    }

    @PostMapping("/get-lab-user-chat-log/{userId}/{courseId}")
    public JSONResult getLabUserChatLog(@PathVariable Long userId, @PathVariable String courseId,
                                        @RequestHeader("X-Auth-Username") String username,
                                        @RequestHeader("X-Auth-Password") String password) {
        if (!"flora_lab".equals(username) || !"1q2w3e4R".equals(password)) {
            return JSONResult.errorMsg("Unauthorized");
        }
        List<UserChatgptLogVO> allChatgptLogList = iUserChatgptLogService.findAllChatgptLogByUserIdAndCourseId(userId, courseId);
        return JSONResult.ok(allChatgptLogList);
    }

    @PostMapping("/get-lab-user-interaction-key-events/{userId}/{courseId}")
    public JSONResult getLabUserInteractionKeyEvents(@PathVariable Long userId, @PathVariable String courseId,
                                                      @RequestHeader("X-Auth-Username") String username,
                                                      @RequestHeader("X-Auth-Password") String password) {
        if (!"flora_lab".equals(username) || !"1q2w3e4R".equals(password)) {
            return JSONResult.errorMsg("Unauthorized");
        }

        List<TraceData> traceDataList = iTraceDataService.findAllByUserIdAndCourseIdOrderByTimeAsc(userId, courseId);
        return JSONResult.ok(buildLabUserInteractionKeyEvents(traceDataList));
    }

    private LabUserInteractionKeyEventsVO buildLabUserInteractionKeyEvents(List<TraceData> traceDataList) {
        LabUserInteractionKeyEventsVO vo = new LabUserInteractionKeyEventsVO();
        if (traceDataList == null || traceDataList.isEmpty()) {
            return vo;
        }

        for (TraceData traceData : traceDataList) {
            //找到first writing start event
            if (isWritingStartEvent(traceData)) {
                vo.setWritingStartTimestamp(parseTimestamp(traceData));
                vo.setWritingStartEventName("Start writing");
            }
            // 找到first GenAI send event
            if (isGenAiSendEvent(traceData) || isGenAIScaffoldChatSendEvent(traceData)) {
                vo.setGenAiSendTimestamp(parseTimestamp(traceData));
                vo.setGenAiSendEventName("Send question to GenAI");
            }

            // 找到all GenAI Copy event
            if (isChatCopyCandidateEvent(traceData)) {
                vo.setCopyFromGenAITimestamp(parseTimestamp(traceData));
                vo.setCopyFromGenAiEventName("Copy from GenAI");
            }
            // 找到essay paste event
            if (isEssayPasteEvent(traceData)) {
                vo.setPasteToWritingTimestamp(parseTimestamp(traceData));
                vo.setPasteToWritingEventName("Paste to writing");
            }
            if (isScaffoldTriggerEvent(traceData)) {
                setScaffoldTriggerEvent(vo, traceData);
            }
        }

        return vo;
    }


    private boolean isWritingStartEvent(TraceData traceData) {
        if (traceData == null) {
            return false;
        }

        return StrUtil.equals(traceData.getSource(), "ESSAY")
                && (StrUtil.equals(traceData.getPageEvent(), "KEYBOARD_STROKE") || StrUtil.equals(traceData.getPageEvent(), "WRITE_SENTENCE"));
    }


    private boolean isGenAiSendEvent(TraceData traceData) {
        if (traceData == null) {
            return false;
        }
        return StrUtil.equals(traceData.getSource(), "CHATGPT_MULTI_AGENTS_SINGLE_WINDOW")
                && (StrUtil.equals(traceData.getInstantEvent(), "SUBMIT_QUESTION_CLICK_BTN") || StrUtil.equals(traceData.getInstantEvent(), "SUBMIT_QUESTION_PRESS_ENTER"));
    }

    private boolean isGenAIScaffoldChatSendEvent(TraceData traceData) {
        if (traceData == null) {
            return false;
        }
        return StrUtil.equals(traceData.getSource(), "CHATGPT_SCAFFOLD") && StrUtil.equals(traceData.getInstantEvent(), "CHATGPT_SCAFFOLD_SUBMIT_QUESTION");
    }

    private boolean isEssayPasteEvent(TraceData traceData) {
        if (traceData == null) {
            return false;
        }
        return StrUtil.equals(traceData.getSource(), "ESSAY") && StrUtil.equals(traceData.getInstantEvent(), "PASTE_SENTENCE");
    }

    private boolean isChatCopyCandidateEvent(TraceData traceData) {
        if (traceData == null) {
            return false;
        }
        String source = traceData.getSource();
        String instantEvent = traceData.getInstantEvent();

        if (StrUtil.equals(source, "CHATGPT_MULTI_AGENTS_SINGLE_WINDOW") && StrUtil.equals(instantEvent, "SELECT_TEXT")) {
            return true;
        }
        if (StrUtil.equals(source, "CHATGPT_SCAFFOLD") && StrUtil.equals(instantEvent, "SELECT_TEXT")) {
            return true;
        }

        return false;
    }

    private boolean isScaffoldTriggerEvent(TraceData traceData) {
        if (traceData == null) {
            return false;
        }

        String source = traceData.getSource();
        String instantEvent = traceData.getInstantEvent();

        if (StrUtil.equals(source, "CHATGPT_SCAFFOLD")) {
            return StrUtil.equals(instantEvent, "CHATGPT_SCAFFOLD_TRIGGERED");
        } else {
            return false;
        }
    }



    private void setScaffoldTriggerEvent(LabUserInteractionKeyEventsVO vo, TraceData traceData) {
        Integer order = parseScaffoldOrder(traceData.getEventValue());
        long timestamp = parseTimestamp(traceData);
        if (order == null || timestamp <= 0) {
            return;
        }

        if (order == 1 && vo.getScaffold1TriggerTimestamp() == null) {
            vo.setScaffold1TriggerTimestamp(timestamp);
            vo.setScaffold1TriggerEventName("Trigger scaffold 1");
        } else if (order == 2 && vo.getScaffold2TriggerTimestamp() == null) {
            vo.setScaffold2TriggerTimestamp(timestamp);
            vo.setScaffold2TriggerEventName("Trigger scaffold 2");
        } else if (order == 3 && vo.getScaffold3TriggerTimestamp() == null) {
            vo.setScaffold3TriggerTimestamp(timestamp);
            vo.setScaffold3TriggerEventName("Trigger scaffold 3");
        }
    }

    private long parseTimestamp(TraceData traceData) {
        if (traceData == null || StrUtil.isEmpty(traceData.getSaveTime())) {
            return -1L;
        }
        try {
            return Long.parseLong(traceData.getSaveTime());
        } catch (Exception e) {
            return -1L;
        }
    }

    private Integer parseScaffoldOrder(String eventValue) {
        if (StrUtil.isEmpty(eventValue)) {
            return null;
        }

        String[] parts = eventValue.split(":::");
        if (parts.length >= 2 && StrUtil.isNotEmpty(parts[1])) {
            try {
                return Integer.parseInt(parts[1].trim());
            } catch (Exception ignored) {
            }
        }

        Matcher matcher = Pattern.compile("(\\d+)").matcher(eventValue);
        if (matcher.find()) {
            try {
                return Integer.parseInt(matcher.group(1));
            } catch (Exception ignored) {
            }
        }
        return null;
    }
}
