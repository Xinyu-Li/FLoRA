package com.monash.flora_backend.controller;

import cn.hutool.core.util.StrUtil;
import cn.hutool.json.JSONObject;
import com.monash.flora_backend.config.cache.IGlobalCache;
import com.monash.flora_backend.controller.req.ChatgptRequest;
import com.monash.flora_backend.controller.vo.UserChatgptLogVO;
import com.monash.flora_backend.dao.entity.GptScaffold;
import com.monash.flora_backend.dao.entity.UserChatgptLog;
import com.monash.flora_backend.service.IGptScaffoldService;
import com.monash.flora_backend.service.IUserChatgptLogService;
import com.monash.flora_backend.service.IUserChatgptTopicService;
import com.monash.flora_backend.util.JSONResult;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;


/**
 * 所有Chat 相关的 request 逐步迁移到这这个controller
 */

@Slf4j
@RestController
@AllArgsConstructor
public class ChatController {


    private final IUserChatgptTopicService iUserChatgptTopicService;
    private final IGlobalCache iGlobalCache;
    private final IUserChatgptLogService iUserChatgptLogService;
    private final IGptScaffoldService iGptScaffoldService;
    /**
     *  每个用户有多个 topics, 一个topic 下面有多个 chat logs
     * @return
     */
    @GetMapping("/load-chatgpt-chat-and-topics/{userId}/{courseId}")
    public JSONResult loadChatgptChatHistory(@PathVariable("userId") Long userId, @PathVariable("courseId") String courseId) {
        List<UserChatgptLogVO> userChatgptLogVOList = iUserChatgptTopicService.getUserChatgptLogVOList(userId, courseId);
        JSONObject resultJson = new JSONObject();
        iUserChatgptTopicService.findAllByUserIdAndCourseId(userChatgptLogVOList, userId, courseId, resultJson);

//        resultJson.set("allTopics", userChatgptTopicVOMap);


//        resultJson.set("topicShowingThreadId", userChatgptTopicVOMap);
//        Map<String, Map<Long, UserChatgptTopicVO>> result = Map
        return JSONResult.ok(resultJson);
    }


    /**
     * 此方法为NHB info seeking 任务设计
     * @param chatgptRequest
     * @return
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
    public JSONResult updateChatMessageHidden(
            @RequestParam("userId") Long userId,
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
}
