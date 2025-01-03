package com.monash.flora_backend.controller;

import cn.hutool.core.util.StrUtil;
import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import com.monash.flora_backend.config.cache.IGlobalCache;
import com.monash.flora_backend.constant.MyConstant;
import com.monash.flora_backend.constant.MyConstantMariaModelSRLPattern;
import com.monash.flora_backend.controller.req.ChatgptRequest;
import com.monash.flora_backend.controller.req.GptScaffoldRequest;
import com.monash.flora_backend.controller.req.SrlProcessRequest;
import com.monash.flora_backend.controller.vo.*;
import com.monash.flora_backend.dao.entity.MedicalConsultResult;
import com.monash.flora_backend.dao.entity.WholePageAnnotation;
import com.monash.flora_backend.service.*;
import com.monash.flora_backend.service_func.ActionAndProcessService;
import com.monash.flora_backend.service_func.AsyncTaskService;
import com.monash.flora_backend.service_func.GptScaffoldPromptService;
import com.monash.flora_backend.util.JSONResult;
import com.monash.flora_backend.util.MyBeanCopyUtils;
import com.monash.flora_backend.util.MyUtils;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Slf4j
@RestController
@AllArgsConstructor
public class HomeController {

    private final IAnnotationService iAnnotationService;
    private final IBackgroundDocService iBackgroundDocService;
    private final IWholePageAnnotationService iWholePageAnnotationService;
    private final IEssayService iEssayService;
    private final IPlannerService iPlannerService;
    private final AsyncTaskService asyncTaskService;
    private final IScaffoldService iScaffoldService;
    private final IUserChatgptLogService iUserChatgptLogService;
    private final IUserTeacherLogService iUserTeacherLogService;
    private final KafkaTemplate<String, String> kafkaTemplate;

    private final IRuleBaseCheckGrammarService iRuleBaseCheckGrammarService;
    private final IRuleBaseWritingChecklistService iRuleBaseWritingChecklistService;
    private final IRuleBaseOriginalityService iRuleBaseOriginalityService;
    private final IRuleBaseIntegrationAndElaborationService iRuleBaseIntegrationAndElaborationService;

    private final IDictionaryLogService iDictionaryLogService;
    private final ActionAndProcessService actionAndProcessService;
    private final GptScaffoldPromptService gptScaffoldPromptService;
    private final IGptScaffoldService iGptScaffoldService;

    private final IMedicalConsultResultService iMedicalConsultResultService;
    private final IGlobalCache iGlobalCache;

    @PostMapping("/save-annotation")
    @ResponseBody
    public JSONResult saveAnnotation(AnnotationVO annotationVO) {
        // save to db
        iAnnotationService.saveAnnotation(annotationVO);

        // TODO 尝试将 wholepage annotation 放入 redis，方便快速存取
        if (!StrUtil.isEmpty(annotationVO.getSerializeHighlightsJson())) {
            iWholePageAnnotationService.save(MyBeanCopyUtils.copyBean(annotationVO, WholePageAnnotation.class)); //TODO 写定时任务，清除多余数据
        }
        return JSONResult.ok();
    }

    @PostMapping("/save-backgroundDoc")
    @ResponseBody
    public JSONResult saveBackgroundDoc(@RequestParam("userId") Long userId,
                                        @RequestParam("courseId") String courseId,
                                        @RequestParam("url") List<String> urls,
                                        @RequestParam("content") List<String> contents)
    {
        // save to db
        log.info(">>>>saveBackgroundDoc");
        if (urls.size() != contents.size()) {
            return JSONResult.errorMsg("URL and content lists must be of the same size.");
        }

        List<BackgroundDocVO> backgroundDocVOList = new ArrayList<>();
        for (int i = 0; i < urls.size(); i++) {
            BackgroundDocVO doc = new BackgroundDocVO();
            doc.setUserId(userId);
            doc.setCourseId(courseId);
            doc.setUrl(urls.get(i));
            doc.setDocumentContent(contents.get(i));
            backgroundDocVOList.add(doc);
        }
        boolean result = iBackgroundDocService.saveDocuments(backgroundDocVOList);
        return result ? JSONResult.ok() : JSONResult.errorMsg("system error");

    }


    /**
     * 此update 只能update annotation的notes 和tag，不能修改highlight的部分
     * @param annotationVO
     * @return
     */
    @PostMapping("/update-annotation")
    @ResponseBody
    public JSONResult updateAnnotation(AnnotationVO annotationVO) {
        // save to db
        boolean result = iAnnotationService.updateByUserIdAndHighlightTimestamp(annotationVO);
        return JSONResult.ok();
    }

    @PostMapping("/save-essay-content")
    @ResponseBody
    public JSONResult saveEssayContent(EssayVO essayVO) {
//        kafkaTemplate.send(MyConstant.KAFKA_TOPIC_ESSAY, JSON.toJSONString(essayVO));
        kafkaTemplate.send(MyConstant.KAFKA_TOPIC_ESSAY, JSONUtil.toJsonStr(essayVO));
        return JSONResult.ok();
    }

//    @PostMapping("/save-essay-content-manually")
//    @ResponseBody
//    public JSONResult saveEssayContentManually(EssayVO essayVO) {
//        boolean result = iEssayService.save(essayVO);
//        return result ? JSONResult.ok() : JSONResult.errorMsg("system error");
//    }

    @PostMapping("/save-planner-content")
    @ResponseBody
    public JSONResult savePlannerContent(PlannerVO plannerVO) {
        log.info("savePlannerContent");
        boolean result = iPlannerService.mySave(plannerVO);

        return result ? JSONResult.ok() : JSONResult.errorMsg("system error");
    }

    @PostMapping("/save-scaffold-content")
    @ResponseBody
    public JSONResult saveScaffoldContent(ScaffoldVO scaffoldVO) {

        log.info("save scaffold content ");
        boolean result = iScaffoldService.saveScaffold(scaffoldVO);
        return result ? JSONResult.ok() : JSONResult.errorMsg("system error");
    }


    @PostMapping("/save-rule-base-message")
    @ResponseBody
    public JSONResult saveRuleBaseMessage( @RequestBody ChatgptRequest chatgptRequest) {
        log.info("------------------saveRuleBaseMessage------------------");
        log.info("chatgptRequest: " + chatgptRequest.toString());
        UserChatgptLogVO userChatgptLogVO = iUserChatgptLogService.saveRuleBaseMessage(chatgptRequest.getQuestion(), chatgptRequest.getChatgptRoleDescription(), chatgptRequest.getQuestionId(), chatgptRequest.getEssay(), chatgptRequest.getBackgroundFileNameList(), chatgptRequest.getUserId(), chatgptRequest.getCourseId(), chatgptRequest.getChatgptParameters(), chatgptRequest.getAgentName());
        return JSONResult.ok(userChatgptLogVO);
    }

    @PostMapping("/load-planner-to-sidebar")
    @ResponseBody
    public JSONResult loadPlannerToSidebar(@RequestParam("userId") Long userId, @RequestParam("courseId") String courseId) {
        PlannerVO plannerVO = iPlannerService.findByUserIdAndCourseIdAndLatestSaveTime(userId, courseId) ;//TODO

        return JSONResult.ok(plannerVO);
    }

    @PostMapping("/load-highlights-to-sidebar")
    @ResponseBody
    public JSONResult loadHighlightsToSidebar(@RequestParam("userId") Long userId, @RequestParam("url") String url) {
        log.info("loadHighlightsToSidebar");
        List<AnnotationVO> annotationVOList = iAnnotationService.findByUserIdAndUrlOrderBySaveTimeDesc(userId, url); // 返回页面 所有 highlights 文本

        return JSONResult.ok(annotationVOList);
    }

    @PostMapping("/load-whole-page-highlights")
    @ResponseBody
    public JSONResult loadWholePageHighlights(@RequestParam("userId") Long userId, @RequestParam("url") String url) {
        WholePageAnnotationVO wholePageAnnotationVO = iWholePageAnnotationService.findByUserIdAndUrlAndLatestSaveTime(userId, url);  // 返回页面所有 highlights annotation 对象

        return JSONResult.ok(wholePageAnnotationVO);
    }

    @PostMapping("/load-essay-to-sidebar")
    @ResponseBody
    public JSONResult loadEssayToSidebar(@RequestParam("userId") Long userId, @RequestParam("courseId") String courseId) {
//        EssayVO essayVO = iEssayService.findByUserIdAndUrlAndLatestSaveTime(userId, courseId);
        log.info(">>>>>loadEssayToSidebar", userId, courseId );
        EssayVO essayVO = iEssayService.findLatestVersionByUserIdAndCourseId(userId, courseId);
        return JSONResult.ok(essayVO);
    }

    @PostMapping("/load-scaffold-to-sidebar")
    @ResponseBody
    public JSONResult loadScaffoldToSidebar(@RequestParam("userId") Long userId, @RequestParam("courseId") String courseId) {
        String scaffoldInfoResult = iScaffoldService.findByUserIdAndUrlAndLatestSaveTime(userId, courseId);
        log.info("scaffoldInfoResult:");
        return JSONResult.ok(scaffoldInfoResult);
    }

    /**
     * annotation 需要被刪除
     * 页面的highlight 需要被更新
     * elasticsearch 需要被更新
     * @param annotationVO
     * @return
     */
    @PostMapping("/delete-annotation")
    @ResponseBody
    public JSONResult deleteAnnotation(AnnotationVO annotationVO) {
        try {

            boolean result = iAnnotationService.removeByUserIdAndHighlightTimestamp(annotationVO.getUserId(), annotationVO.getHighlightTimestamp());
            if (!result) {
                log.info("delete failure:");
                throw new RuntimeException("delete failure");
            }
            iWholePageAnnotationService.save(MyBeanCopyUtils.copyBean(annotationVO, WholePageAnnotation.class)); //TODO 写定时任务，清除多余数据 //TODO 写定时任务，定时清除whole page annotation 表中无用的数据，只保留每页最新的记录
        } catch (Exception e) {
            e.printStackTrace();
            return JSONResult.errorMsg("system error");
        }

        return JSONResult.ok();
    }

    @PostMapping("/search-by-keywords")
    @ResponseBody
    public JSONResult searchAnnotationByKeywords(@RequestParam("keywords") String keywords, @RequestParam("userId") Long userId, @RequestParam("courseId") String courseId) {
        List<AnnotationVO> annotationVOList;
        CombinedAnnotationVO combinedResult = new CombinedAnnotationVO();
        if (StrUtil.isEmpty(keywords)) {
            annotationVOList = iAnnotationService.searchAllAnnotation(userId, courseId);
            List<Map<String, Object>> backgroundSegments = null;
            combinedResult.setAnnotationVOList(annotationVOList);
            combinedResult.setBackgroundSegments(backgroundSegments);

        } else {
            //annotationVOList = iAnnotationService.searchAnnotationByKeywordsAndUserId(keywords, userId, courseId);
            annotationVOList = iAnnotationService.searchAnnotationByKeywordsAndUserId(keywords, userId, courseId);

            log.info("finished searchAnnotationByKeywordsAndUserId!");
            List<Map<String, Object>> backgroundSegments;
            backgroundSegments = iBackgroundDocService.searchKEYWORD(courseId,keywords);
            //CombinedAnnotationVO combinedResult = new CombinedAnnotationVO();
            combinedResult.setAnnotationVOList(annotationVOList);
            combinedResult.setBackgroundSegments(backgroundSegments);
        }


        return JSONResult.ok(combinedResult);
    }

//    @PostMapping("/search-keywords-background")
//    @ResponseBody
//    public JSONResult searchBackgroundByKeywords(@RequestParam("userId") Long userId, @RequestParam("keywords") String keywords) {
//        Map<String, List<BackgroundDocService.KeywordSegment>> backgroundSegments;
//
//        backgroundSegments = iBackgroundDocService.search(userId,keywords);
//
//        return JSONResult.ok(backgroundSegments);
//    }

    @GetMapping("/search-all/{userId}/{courseId}")
    @ResponseBody
    public JSONResult searchAllAnnotation(@PathVariable("userId") Long userId, @PathVariable("courseId") String courseId) {
        log.info("search All annotation------------:" + userId);
        List<AnnotationVO> annotationVOList = iAnnotationService.searchAllAnnotation(userId, courseId);

        return JSONResult.ok(annotationVOList);
    }

    @GetMapping("/rule-base-check-process-label-patterns/{userId}/{currentMinute}/{courseId}/{srlModel}")
    @ResponseBody
    public JSONResult checkProcessLabelPatterns(@PathVariable("userId") Long userId, @PathVariable("currentMinute") Integer currentMinute, @PathVariable("courseId") String courseId, @PathVariable("srlModel") String srlModel) {
        log.info("check-process-label-patterns:" + userId);
        Map response = new HashMap<>();
        String showRecord;

        if (StrUtil.isEmpty(srlModel)) {
            return JSONResult.errorMsg("error SRL model");
        }

        iScaffoldService.checkProcessLabelPatterns(userId, currentMinute, courseId, srlModel);
        // todo 这部分好像只会返回默认值，之后检查一下
        List<String> scaffoldShowStatus = MyConstantMariaModelSRLPattern.SCAFFOLD_SHOW_STATUS;
        response.put("scaffold-show-status", scaffoldShowStatus);

        String redisKey = "rule-base-scafold-status" + userId + "-" + courseId + "-" + srlModel;
        if (iGlobalCache.hasKey(redisKey)) {
            log.info("------------------repeat send gpt scaffold-userid:" + "rule-base-scafold-status" + userId + "-" + courseId + "-" + srlModel);
            showRecord = iGlobalCache.get(redisKey);
        } else {
            log.info("------------------first time send gpt scaffold-userid:" + "rule-base-scafold-status" + userId + "-" + courseId + "-" + srlModel);
            iGlobalCache.set(redisKey, "0", MyConstant.REDIS_EXPIRE_SECONDS);
            showRecord = "0";
        }
        response.put("showed-record", showRecord);

        return JSONResult.ok(response);
    }

    @GetMapping("/rule-base-update-show-record-cache/{userId}/{currentMinute}/{courseId}/{srlModel}")
    @ResponseBody
    public JSONResult updateShowRecordCache(@PathVariable("userId") Long userId, @PathVariable("currentMinute") Integer currentMinute, @PathVariable("courseId") String courseId, @PathVariable("srlModel") String srlModel) {
        log.info("update-show-record-cache: " + userId);
        String showRecord;

        String redisKey = "rule-base-scafold-status" + userId + "-" + courseId + "-" + srlModel;
        if (iGlobalCache.hasKey(redisKey)) {
            log.info("------------------update the showRecord" + "rule-base-update-show-record-cache" + userId + "-" + courseId + "-" + srlModel);
            showRecord = iGlobalCache.get(redisKey);
            log.info("------------------update the showRecord" + "original record: " + showRecord);
            iGlobalCache.set(redisKey, String.valueOf(Integer.parseInt(showRecord) + 1));

        } else {
            log.error("------------------trying to update the showRecord that does not exist" + "rule-base-update-show-record-cache" + userId + "-" + courseId + "-" + srlModel);
            return JSONResult.errorMsg("trying to update the showRecord");
        }

        return JSONResult.ok();
    }
    @GetMapping("/load-chatgpt-scaffold/{userId}/{courseId}")
    @ResponseBody
    public JSONResult loadGptScaffold(@PathVariable("userId") Long userId, @PathVariable("courseId") String courseId) {
//        List<UserChatgptLogVO> userChatgptLogVOList = iUserChatgptLogService.findAllChatgptLogByUserIdAndType(userId, courseId);
        List<GptScaffoldVO> gptScaffoldVOList = iGptScaffoldService.findAllGptScaffoldByUserIdAndCourseId(userId, courseId);
//        log.info(userChatgptLogVOList.size());
//        List<UserChatgptLogVO> scaffoldsLogList = userChatgptLogVOList.stream().filter(u -> !u.getUserQuestions().startsWith("no scaffold generated")).collect(Collectors.toList());
        return JSONResult.ok(gptScaffoldVOList);
    }


    /**
     * For CELLA study, support GPT scaffold.
     *
     * @param gptScaffoldRequest
     * @return
     */
    @PostMapping("/chatgpt-scaffold")
    @ResponseBody
    public JSONResult gptScaffold(@RequestBody GptScaffoldRequest gptScaffoldRequest) {

        // 收到请求，先放入缓存，每个userid-courseid-gpt-scaffold-1 2 3
        String redisKey = MyConstant.REDIS_GPT_SCAFFOLD_TRIGGER + gptScaffoldRequest.getUserId() + "-" + gptScaffoldRequest.getCourseId() + "-" + gptScaffoldRequest.getGptScaffoldNumber();
        if (iGlobalCache.hasKey(redisKey)) {
            log.info("------------------repeat send gpt scaffold-userid:" + gptScaffoldRequest.getUserId() + "-courseid:" + gptScaffoldRequest.getCourseId() + "-number:" + gptScaffoldRequest.getGptScaffoldNumber());
            return JSONResult.errorMsg("repeat send gpt scaffold");
        } else {
            log.info("------------------first time send gpt scaffold-userid:" + gptScaffoldRequest.getUserId() + "-courseid:" + gptScaffoldRequest.getCourseId() + "-number:" + gptScaffoldRequest.getGptScaffoldNumber());
            iGlobalCache.set(redisKey, "1", MyConstant.REDIS_EXPIRE_SECONDS);
        }

        if (gptScaffoldRequest.getGptScaffoldReturnMessages() != null) {
            //直接return message
            log.info("number of scaffold generated-----{}", gptScaffoldRequest.getGptScaffoldNumber());
            GptScaffoldVO gptScaffoldVO = iGptScaffoldService.createGptScaffold(
                    "manually generated-----" + gptScaffoldRequest.getGptScaffoldNumber(), gptScaffoldRequest.getIncludeEssay() ? gptScaffoldRequest.getEssay() : "",
                    gptScaffoldRequest.getGptScaffoldReturnMessages().get(gptScaffoldRequest.getGptScaffoldNumber() - 1).getMessage(),
                    MyUtils.getCurrentTimestamp(), MyUtils.getCurrentTimestamp(),
                    gptScaffoldRequest.getGptScaffoldRole(), gptScaffoldRequest.getGptScaffoldRoleDescription(),
                    gptScaffoldRequest.getGptScaffoldNumber(), gptScaffoldRequest.getUserId(), gptScaffoldRequest.getCourseId());
            log.info("manually generated-----{}", gptScaffoldVO.toString());

            return JSONResult.ok(gptScaffoldVO);
        }

        gptScaffoldRequest.setEssay(checkChatgptRequestEssay(gptScaffoldRequest.getEssay(), gptScaffoldRequest.getUserId(), gptScaffoldRequest.getCourseId()));

        //动态生成GPT prompt
//        String dynamicPrompt = gptScaffoldPromptService.generateAdaptivePrompt(studyName, MyConstant.testISDIMUName, MyConstant.preTestName, MyConstant.testAboutYourSelfName, courseId, userId, gptScaffoldNumber, essay);
        String dynamicPrompt = gptScaffoldPromptService.generatePromptBasedOnLearningConditionAndSRLProcess(gptScaffoldRequest);

        if (StrUtil.isEmpty(dynamicPrompt)) { // 验空，如果scaffold的条件都不触发，则不需要发送  TODO 如果所有条件都满足，则不触发, 或者显示空scaffold
            log.info("number of scaffold generated-----" + gptScaffoldRequest.getGptScaffoldNumber());
//            UserChatgptLogVO userChatgptLogVO = iUserChatgptLogService.createUserChatgptLog("", userId, "no scaffold generated-----" + gptScaffoldOrder, askQuestionTimestamp, "", essay, courseId, "scaffold");
            GptScaffoldVO gptScaffoldVO = iGptScaffoldService.createGptScaffold("no scaffold generated-----" + gptScaffoldRequest.getGptScaffoldNumber(), gptScaffoldRequest.getIncludeEssay() ? gptScaffoldRequest.getEssay() : "", "",  MyUtils.getCurrentTimestamp(), MyUtils.getCurrentTimestamp(),
                    gptScaffoldRequest.getGptScaffoldRole(), gptScaffoldRequest.getGptScaffoldRoleDescription(), gptScaffoldRequest.getGptScaffoldNumber(), gptScaffoldRequest.getUserId(), gptScaffoldRequest.getCourseId());
            log.info(gptScaffoldVO.toString());

            return JSONResult.errorMsg("number of scaffold generated-----number :" + gptScaffoldRequest.getGptScaffoldNumber());
        }

        GptScaffoldVO gptScaffoldVO = iGptScaffoldService.getGptScaffoldResponse(dynamicPrompt, gptScaffoldRequest.getIncludeEssay() ? gptScaffoldRequest.getEssay() : "", gptScaffoldRequest.getBackgroundFileNameList(), gptScaffoldRequest.getGptScaffoldRole(), gptScaffoldRequest.getGptScaffoldRoleDescription(), gptScaffoldRequest.getGptScaffoldNumber(), gptScaffoldRequest.getUserId(), gptScaffoldRequest.getCourseId(), gptScaffoldRequest.getGptScaffoldParameters());
        return JSONResult.ok(gptScaffoldVO);
    }

    /**
     * reqeust to get the current detected SRL process list
     * @param srlProcessRequest
     * @return
     */
    @PostMapping("/get-srl-process")
    @ResponseBody
    public JSONResult getSRLProcess(@RequestBody SrlProcessRequest srlProcessRequest) {
        List<String> srlProcessAppearList = actionAndProcessService.labelTimeRangeProcessLabelPatterns(
                srlProcessRequest.getUserId(), srlProcessRequest.getCourseId(), srlProcessRequest.getSrlModel(),
                srlProcessRequest.getBeginMinute(), srlProcessRequest.getEndMinute()); // process data and get SRL process

        return JSONResult.ok(srlProcessAppearList);
    }

    private String checkChatgptRequestEssay(String essay, Long userId, String courseId) {
        String result = "";
        if (StrUtil.isEmpty(essay)) {
            EssayVO essayVO = iEssayService.findLatestVersionByUserIdAndCourseId(userId, courseId);
            if (essayVO == null) {
//                return JSONResult.errorMsg("cannot find essay in chatgpt");
                result = "";
            } else {
                result = essayVO.getEssayContent();
            }
        } else {
            result = essay;
        }
        return result;
    }

    @PostMapping("/chatgpt")
    @ResponseBody
    public JSONResult chatgpt(
            @RequestBody ChatgptRequest chatgptRequest
//            String question, Long userId, String courseId, String essay,
//                              String questionId, Boolean includeEssay, String chatgptRoleDescription,
//                              String chatgptRole, List<String> backgroundFileNameList // 这三项来自 config tool
    ) {
//        log.info("for /chatgpt, essay: "+chatgptRequest.getEssay());
//        log.info("for /chatgpt, chatgptRequest.getChatgptRole(): "+chatgptRequest.getChatgptRole());
//        if (chatgptRequest.getIncludeEssay()) {
//            if (StrUtil.isEmpty(chatgptRequest.getEssay())) {
//                EssayVO essayVO = iEssayService.findLatestVersionByUserIdAndCourseId(chatgptRequest.getUserId(), chatgptRequest.getCourseId());
//                if (essayVO == null) {
//                    return JSONResult.errorMsg("cannot find essay in chatgpt");
//                } else {
//                    chatgptRequest.setEssay(essayVO.getEssayContent());
//                }
//            }
//        } else {
//            chatgptRequest.setEssay("");
//        }
        String essay = chatgptRequest.getIncludeEssay() ? checkChatgptRequestEssay(chatgptRequest.getEssay(), chatgptRequest.getUserId(), chatgptRequest.getCourseId()) : "";

        log.info("for /chatgpt, essay: "+chatgptRequest.getEssay());
        log.info("for /chatgpt, chatgptRequest.getChatgptRole(): "+chatgptRequest.getChatgptRole());
        if (chatgptRequest.getIncludeEssay()) {
            if (StrUtil.isEmpty(chatgptRequest.getEssay())) {
                EssayVO essayVO = iEssayService.findLatestVersionByUserIdAndCourseId(chatgptRequest.getUserId(), chatgptRequest.getCourseId());
                if (essayVO == null) {
                    return JSONResult.errorMsg("cannot find essay in chatgpt");
                } else {
                    chatgptRequest.setEssay(essayVO.getEssayContent());
                }
            }
        } else {
            chatgptRequest.setEssay("");
        }


        // todo 收到请求，先放入缓存 判断是不是重复发送
        if(chatgptRequest.getChatgptRole().equals("scaffold")) { // 如果是scaffold，判断是否重复发送

            int scaffoldNumber = chatgptRequest.getRoundNumber() < 40 ? 1 : 2;

            String redisKey = "PatientScaffoldUsed-" + chatgptRequest.getUserId() + "-" + chatgptRequest.getCourseId() + "-" + scaffoldNumber;
            if (iGlobalCache.hasKey(redisKey)) {
                log.info("------------------repeat sending patient scaffold-userid:" + chatgptRequest.getUserId() + "-courseid:" + chatgptRequest.getCourseId() + "-number:" + scaffoldNumber);
                return JSONResult.errorMsg("repeat sending patient scaffold");
            } else {
                log.info("------------------first time send gpt scaffold-userid:" + chatgptRequest.getUserId() + "-courseid:" + chatgptRequest.getCourseId() + "-number:" + scaffoldNumber);
                iGlobalCache.set(redisKey, "1", MyConstant.REDIS_EXPIRE_SECONDS);
            }
        }

        // for toefl lab
        if(chatgptRequest.getChatgptRole().equals("mediator_scaffold")) {
            String redisKey = "MediatorScaffoldUsed-" + chatgptRequest.getUserId() + "-" + chatgptRequest.getCourseId();
            if (iGlobalCache.hasKey(redisKey)) {
                log.info("------------------repeat sending mediator scaffold-userid:" + chatgptRequest.getUserId() + "-courseid:" + chatgptRequest.getCourseId());
                return JSONResult.errorMsg("repeat sending mediator scaffold");
            } else {
                log.info("------------------first time send mediator scaffold-userid:" + chatgptRequest.getUserId() + "-courseid:" + chatgptRequest.getCourseId());
                iGlobalCache.set(redisKey, "1", MyConstant.REDIS_EXPIRE_SECONDS);
            }
        }

//        String askQuestionTimestamp = MyUtils.getCurrentTimestamp();
//        String result = iUserChatgptLogService.getChatgptResponse(question, userId, courseId, essay, MyConstant.instructionForChatgptMap.get(studyName), MyConstant.backgroundTextForChatgptMap.get(studyName), MyConstant.rubricTextForChatgptMap.get(studyName));
//        String getGPTResponseTimestamp = MyUtils.getCurrentTimestamp();
////        "Hello, Can you teach me english writing?"
//
//        UserChatgptLogVO userChatgptLogVO = iUserChatgptLogService.createUserChatgptLog(result, userId, question, askQuestionTimestamp, getGPTResponseTimestamp, essay, courseId, "chat");
//        log.info(userChatgptLogVO.toString());
        // 使用gpt role 来区分
        log.info("gpt role:" + chatgptRequest.getChatgptRole());

        UserChatgptLogVO userChatgptLogVO = iUserChatgptLogService.getChatgptResponse(chatgptRequest.getQuestion(), chatgptRequest.getExtraPrompt(), chatgptRequest.getChatgptRoleDescription(), chatgptRequest.getQuestionId(), essay, chatgptRequest.getBackgroundFileNameList(), chatgptRequest.getUserId(), chatgptRequest.getCourseId(), chatgptRequest.getChatgptRole(), chatgptRequest.getChatgptParameters(), chatgptRequest.getAgentName(), chatgptRequest.getRoundNumber());

        return JSONResult.ok(userChatgptLogVO);
    }

    @PostMapping("/chatgpt-consult")
    @ResponseBody
    public JSONResult chatgptConsult(
            @RequestBody ChatgptRequest chatgptRequest
//            String question, Long userId, String courseId, String essay,
//                              String questionId, Boolean includeEssay, String chatgptRoleDescription,
//                              String chatgptRole, List<String> backgroundFileNameList // 这三项来自 config tool
    ) {
        String essay = chatgptRequest.getIncludeEssay() ? checkChatgptRequestEssay(chatgptRequest.getEssay(), chatgptRequest.getUserId(), chatgptRequest.getCourseId()) : "";

        // todo 收到请求，先放入缓存 判断是不是重复发送
        if(chatgptRequest.getChatgptRole().equals("scaffold")) { // 如果是scaffold，判断是否重复发送

            int scaffoldNumber = 0;
            if (chatgptRequest.getRoundNumber() < 40){
                scaffoldNumber = 1;
            }
            else {
                scaffoldNumber = 2;
            }

            String redisKey = "PatientScaffoldUsed-" + chatgptRequest.getUserId() + "-" + chatgptRequest.getCourseId() + "-" + scaffoldNumber;
            if (iGlobalCache.hasKey(redisKey)) {
                log.info("------------------repeat sending patient scaffold-userid:" + chatgptRequest.getUserId() + "-courseid:" + chatgptRequest.getCourseId() + "-number:" + scaffoldNumber);
                return JSONResult.errorMsg("repeat sending patient scaffold");
            } else {
                log.info("------------------first time send gpt scaffold-userid:" + chatgptRequest.getUserId() + "-courseid:" + chatgptRequest.getCourseId() + "-number:" + scaffoldNumber);
                iGlobalCache.set(redisKey, "1", MyConstant.REDIS_EXPIRE_SECONDS);
            }
        }

        UserChatgptLogVO userChatgptLogVO = iUserChatgptLogService.getChatgptConsultResponse(chatgptRequest.getQuestion(), chatgptRequest.getChatgptRoleDescription(), chatgptRequest.getQuestionId(), essay, chatgptRequest.getBackgroundFileNameList(), chatgptRequest.getUserId(), chatgptRequest.getCourseId(), chatgptRequest.getChatgptRole(), chatgptRequest.getChatgptParameters(), chatgptRequest.getAgentName(), chatgptRequest.getRoundNumber());

        return JSONResult.ok(userChatgptLogVO);
    }

//    @PostMapping("/chatgpt-nolimit")
//    @ResponseBody
//    public JSONResult chatgptNolimit(String question, Long userId, String essay, String courseId, String studyName) {
//
//        String askQuestionTimestamp = MyUtils.getCurrentTimestamp();
//
////        String result = iUserChatgptLogService.getChatgptResponseNoLimit(question, userId, "You are a helpful assistant");
//        String result = iUserChatgptLogService.getChatgptResponse(question, userId, courseId, essay, MyConstant.INSTRUCTION_FOR_CHAT_GPT, MyConstant.BACKGROUND_TEXT_FILE_FOR_CHAT_GPT, MyConstant.RUBRIC_TEXT_FOR_CHAT_GPT);
//        String getGPTResponseTimestamp = MyUtils.getCurrentTimestamp();
//
//        UserChatgptLogVO userChatgptLogVO = iUserChatgptLogService.createUserChatgptLog(result, userId, question, askQuestionTimestamp, getGPTResponseTimestamp, essay, courseId);
//        log.info(userChatgptLogVO.toString());
//        return JSONResult.ok(userChatgptLogVO);
//    }
    /**
     *  每个用户有一个chat log
     * @return
     */
    @GetMapping("/load-chatgpt-chat/{userId}/{courseId}")
    @ResponseBody
    public JSONResult loadChatgptChatHistory(@PathVariable("userId") Long userId, @PathVariable("courseId") String courseId) {



        List<UserChatgptLogVO> userChatgptLogVOList = iUserChatgptLogService.findAllChatgptLogByUserIdAndCourseId(userId, courseId);
//        userChatgptLogVOList.forEach(u->{
//            log.info(u.toString());
//        });
        return JSONResult.ok(userChatgptLogVOList);
    }

    @GetMapping("/load-teacher-chat/{userId}/{courseId}")
    @ResponseBody
    public JSONResult loadTeacherChatHistory(@PathVariable("userId") Long userId, @PathVariable("courseId") String courseId) {
        List<UserTeacherLogVO> userTeacherLogVOList = iUserTeacherLogService.findAllTeacherChatLogByUserId(userId, courseId);
        return JSONResult.ok(userTeacherLogVOList);
    }


    @PostMapping(value = "/uploadvideo", name = "接收上传文件")
    @ResponseBody
    public String uploadVideo(@RequestParam("file") MultipartFile uploadFile, @RequestParam("userId") Long userId, @RequestParam("courseId") String courseId) {
        String name = uploadFile.getOriginalFilename();
        String size = String.format("%.2f MB", uploadFile.getSize() / 1024f / 1024f);
        log.info(String.format("# name=%s, size=%s", name, size));
        asyncTaskService.saveFile(uploadFile, userId, courseId);
        return "ok";
    }


    /**
     * 学生可以从task 结束 modal上面下载essay为txt文件
     * @param userId
     * @return
     */
    @GetMapping("/download-student-essay/{userId}/{courseId}")
    @ResponseBody
    public ResponseEntity<ByteArrayResource> downloadStudentEssay(@PathVariable("userId") Long userId, @PathVariable("courseId") String courseId) {
        EssayVO essayVO = iEssayService.findLatestVersionByUserIdAndCourseId(userId, courseId);
        log.info("essayVO is ");
        String content = essayVO == null ? "" : essayVO.getEssayContent();
        byte[] contentBytes = content.getBytes(StandardCharsets.UTF_8);
        ByteArrayResource byteArrayResource = new ByteArrayResource(contentBytes);
        return ResponseEntity.ok()
                .contentType(MediaType.TEXT_PLAIN)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"essay.txt\"")
                .body(byteArrayResource);
    }

    @PostMapping("/rule-base-check-grammar")
    @ResponseBody
    public JSONResult ruleBaseCheckGrammar(String essay, Long userId, String courseId) {

        String resultEssay = checkChatgptRequestEssay(essay, userId, courseId);

        String checkGrammarTimestamp = MyUtils.getCurrentTimestamp();
        log.info("check-grammar-:" + checkGrammarTimestamp);

        String result = iRuleBaseCheckGrammarService.getCheckGrammarResponse(resultEssay);

        JSONObject jsonObject = JSONUtil.parseObj(result);
        if (jsonObject != null) {
            List<GrammarErrorVO> grammarErrorVOList = iRuleBaseCheckGrammarService
                    .createCheckGrammarLog(jsonObject, userId, resultEssay, checkGrammarTimestamp, courseId);
            return JSONResult.ok(grammarErrorVOList);
        }
        return JSONResult.errorMsg("system error, please try again later");
    }

    /**
     * demo result:
     * {'Sentence no.': [sentence text, incorrect word, recommend change, bad example, good example]}
     * {'Sentence 1': ['Nowadays, the role of AI in education is limited in some tangible educational products.', 'some', 'none', 'Predicting content popularity in online manner has been studied in some literatures.', 'Predicting content popularity in online manner has been reported in a number of studies.'], 'Sentence 2': ['More and more data are needed to make AI work better.', 'and', 'In addition/Furthermore/ delete?', 'The unemployment levels remained high. And the illiteracy levels also.', 'The unemployment levels remained high. In addition, the illiteracy levels also remained at high levels.'], 'Sentence 3': ['And the scaffolding is that the work is shared alone between the learner and some more knowledgeable other or agent.', 'some', 'none', 'Predicting content popularity in online manner has been studied in some literatures.', 'Predicting content popularity in online manner has been reported in a number of studies.'], 'Sentence 6': ['Besides, as we all know, differentiation is a combination of careful progress monitoring and adapting instruction in response.', 'and', 'In addition/Furthermore/ delete?', 'The unemployment levels remained high. And the illiteracy levels also.', 'The unemployment levels remained high. In addition, the illiteracy levels also remained at high levels.'], 'Sentence 7': ['By this, students or learners could be divided into different groups by their teache according to their competence degree.', 'could', 'none', 'An artificial cell or minimal cell is an engineered particle that can mimic one or many functions of a biological cell.', 'An artificial cell or minimal cell is an engineered particle that mimics one or many functions of a biological cell.'], 'Sentence 8': ["In these groups, students can learn knowledge that they don't understand and make progress belonging to themselves.", 'and', 'In addition/Furthermore/ delete?', 'The unemployment levels remained high. And the illiteracy levels also.', 'The unemployment levels remained high. In addition, the illiteracy levels also remained at high levels.'], 'Sentence 9': ['Differentiation practices in the classroom will help students in their group process. \n             ', 'will', 'none', 'An artificial cell or minimal cell is an engineered particle that can mimic one or many functions of a biological cell.', 'An artificial cell or minimal cell is an engineered particle that mimics one or many functions of a biological cell.'], 'Sentence 10': ['Integration of three topics is very essential and all three are indispensable.', 'and', 'In addition/Furthermore/ delete?', 'The unemployment levels remained high. And the illiteracy levels also.', 'The unemployment levels remained high. In addition, the illiteracy levels also remained at high levels.'], 'Sentence 12': ['Respectively, there are great expectations for AI in education to help students and teachers work better.', 'and', 'In addition/Furthermore/ delete?', 'The unemployment levels remained high. And the illiteracy levels also.', 'The unemployment levels remained high. In addition, the illiteracy levels also remained at high levels.'], 'Sentence 13': ['To facilitate our independent and appropriate use in education in the future, we should learn more on how the scaffolding component skills work and so on.', 'so', '1. Together (for summary at the end of each result) 2. As a result/As a consequence/Therefore', '1. So, this shows that X binds to Z. 2. The magma flows into the pores of the rocks; so the rocks rupture.', '1. Together, these results clearly demonstrated that X binds to Z. 2. The magma flows into the pores of the rocks; as a result, the rocks rupture.'], 'Sentence 15': ['Beyond that, the three should continue to innovate, so as to better serve the education and other industries in the future. \n             ', 'and', 'In addition/Furthermore/ delete?', 'The unemployment levels remained high. And the illiteracy levels also.', 'The unemployment levels remained high. In addition, the illiteracy levels also remained at high levels.'], 'Sentence 16': ['An important difference between other programs and those that use AI is the ability to learn.\n        ', 'and', 'In addition/Furthermore/ delete?', 'The unemployment levels remained high. And the illiteracy levels also.', 'The unemployment levels remained high. In addition, the illiteracy levels also remained at high levels.']}
     * @param essay
     * @param userId
     * @return
     */
    @PostMapping("/rule-base-writing-checklist")
    @ResponseBody
    public JSONResult ruleBaseWritingChecklist(String essay, Long userId, String courseId) {
        String checkTime = MyUtils.getCurrentTimestamp();
        if ("".equals(essay)) {
            EssayVO essayVO = iEssayService.findLatestVersionByUserIdAndCourseId(userId, courseId);
            if (essayVO != null) {
                essay = essayVO.getEssayContent();
            } else {
                return JSONResult.errorMsg("cannot find essay when checking checklist");
            }
        }
        RuleBaseWritingChecklistVO ruleBaseVO = iRuleBaseWritingChecklistService.getWritingChecklistResponse(essay, userId, checkTime, courseId);

        if (ruleBaseVO != null) {
//            log.info(ruleBaseVO.toString());
//            return JSONResult.ok(com.alibaba.fastjson2.JSONObject.parseObject(ruleBaseVO.getResponse()));
            return JSONResult.ok(JSONUtil.parseObj(ruleBaseVO.getResponse()));
        }
        return JSONResult.errorMsg("system error, please try again later");
    }

    /**
     * demo result:
     * {'Sentence no.': [essay sentence, similar part]}
     * {'Sentence 16': ['An important difference between other programs and those that use AI is the ability to learn.\n        ', 'an important difference between other programs and those that use ai is the ability to learn'], 'Sentence 12': ['Respectively, there are great expectations for AI in education to help students and teachers work better.', 'there are great expectations for ai in education'], 'Sentence 3': ['And the scaffolding is that the work is shared alone between the learner and some more knowledgeable other or agent.', 'between the learner and some more knowledgeable other or agent'], 'Sentence 1': ['Nowadays, the role of AI in education is limited in some tangible educational products.', 'the role of ai in education']}
     * @param essay
     * @param userId
     * @return
     */
    @PostMapping("/rule-base-originality")
    @ResponseBody
    public JSONResult ruleBaseOriginality(String essay, Long userId, String courseId) {
        String checkTime = MyUtils.getCurrentTimestamp();
        if ("".equals(essay)) {
            EssayVO essayVO = iEssayService.findLatestVersionByUserIdAndCourseId(userId, courseId);
            if (essayVO != null) {
                essay = essayVO.getEssayContent();
            } else {
                return JSONResult.errorMsg("cannot find essay when checking originality");
            }
        }
        RuleBaseOriginalityVO ruleBaseVO = iRuleBaseOriginalityService.getOriginalityResponse(essay, userId, checkTime, courseId);

        if (ruleBaseVO != null) {
//            log.info(ruleBaseVO.toString());
//            return JSONResult.ok(com.alibaba.fastjson2.JSONObject.parseObject(ruleBaseVO.getResponse()));
            return JSONResult.ok(JSONUtil.parseObj(ruleBaseVO.getResponse()));
        }
        return JSONResult.errorMsg("system error, please try again later");
    }

    /**
     * demo result:
     * [('Nowadays, the role of AI in education is limited in some tangible educational products.', 'High'), ('More and more data are needed to make AI work better.', 'Low'), ('And the scaffolding is that the work is shared alone between the learner and some more knowledgeable other or agent.', 'Low')]
     * @param essay
     * @param userId
     * @return
     */
    @PostMapping("/rule-base-integration-and-elaboration")
    @ResponseBody
    public JSONResult ruleBaseIntegrationAndElaboration(String essay, Long userId, String courseId) {
        String checkTime = MyUtils.getCurrentTimestamp();
        if ("".equals(essay)) {
            EssayVO essayVO = iEssayService.findLatestVersionByUserIdAndCourseId(userId, courseId);
            if (essayVO != null) {
                essay = essayVO.getEssayContent();
            } else {
                return JSONResult.errorMsg("cannot find essay when checking ntegrationAndElaboration");
            }
        }
        RuleBaseIntegrationAndElaborationVO ruleBaseVO = iRuleBaseIntegrationAndElaborationService.getIntegrationAndElaborationResponse(essay, userId, checkTime, courseId);

        if (ruleBaseVO != null) {
//            log.info(ruleBaseVO.toString());
            return JSONResult.ok(ruleBaseVO.getResponse());
        }
        return JSONResult.errorMsg("system error, please try again later");
    }


    @PostMapping("/dictionary")
    @ResponseBody
    public JSONResult dictionaryQuery(Long userId, String keywords, String courseId) {

        log.info("dictionary search:" + keywords);
//        List<String> list = com.alibaba.fastjson2.JSONObject.parseObject(keywords).getList("keywords", String.class);
        List<String> list = JSONUtil.parseObj(keywords).getBeanList("keywords", String.class);
//        String projectId = "flora-beijing";
        String apiKey = "AIzaSyBb4rcqO8RvgjS52JTDnARqNjGQIYjE3ew";
//        // Supported Languages: https://cloud.google.com/translate/docs/languages
////        String targetLanguage = "en-US";
        String targetLanguage = "zh-CN";

        //return 文本结果
        String result = iDictionaryLogService.translateText(targetLanguage, list, apiKey, userId, courseId);

        return JSONResult.ok(result);
    }

    @GetMapping("/load-dictionary-history/{userId}/{courseId}")
    @ResponseBody
    public JSONResult loadDictionaryHistory(@PathVariable("userId") Long userId, @PathVariable("courseId") String courseId) {
        List<DictionaryLogVO> dictionaryLogVOList = iDictionaryLogService.findAllDictionaryLogByUserId(userId, courseId);
        return JSONResult.ok(dictionaryLogVOList);
    }


    @GetMapping("/rule-base-check-grammar-db/{userId}/{courseId}")
    @ResponseBody
    public JSONResult ruleBaseCheckGrammarDB(@PathVariable("userId") Long userId, @PathVariable("courseId") String courseId) {
        List<GrammarErrorVO> grammarErrorVOList = iRuleBaseCheckGrammarService.getLatestCheckGrammarFromDB(userId, courseId);
        return grammarErrorVOList == null ? JSONResult.ok() : JSONResult.ok(grammarErrorVOList);
    }
    @GetMapping("/rule-base-writing-checklist-db/{userId}/{courseId}")
    @ResponseBody
    public JSONResult ruleBaseWritingChecklistDB(@PathVariable("userId") Long userId, @PathVariable("courseId") String courseId) {
        RuleBaseWritingChecklistVO ruleBaseVO = iRuleBaseWritingChecklistService.getLatestWritingChecklistFromDB(userId, courseId);

        if (ruleBaseVO != null) {
//            log.info(ruleBaseVO.toString());
//            return JSONResult.ok(com.alibaba.fastjson2.JSONObject.parseObject(ruleBaseVO.getResponse()));
            return JSONResult.ok(JSONUtil.parseObj(ruleBaseVO.getResponse()));
        } else {
            return JSONResult.ok();
        }
//        return JSONResult.errorMsg("system error, please try again later");
    }
    @GetMapping("/rule-base-originality-db/{userId}/{courseId}")
    @ResponseBody
    public JSONResult ruleBaseOriginalityDB(@PathVariable("userId") Long userId, @PathVariable("courseId") String courseId) {
        RuleBaseOriginalityVO ruleBaseVO = iRuleBaseOriginalityService.getLatestOriginalityFromDB(userId, courseId);
        if (ruleBaseVO != null) {
//            log.info(ruleBaseVO.toString());
//            return JSONResult.ok(com.alibaba.fastjson2.JSONObject.parseObject(ruleBaseVO.getResponse()));
            return JSONResult.ok(JSONUtil.parseObj(ruleBaseVO.getResponse()));
        } else {
            return JSONResult.ok();
        }
//        return JSONResult.errorMsg("system error, please try again later");
    }
    @GetMapping("/rule-base-integration-and-elaboration-db/{userId}/{courseId}")
    @ResponseBody
    public JSONResult ruleBaseIntegrationAndElaborationDB(@PathVariable("userId") Long userId, @PathVariable("courseId") String courseId) {
        RuleBaseIntegrationAndElaborationVO ruleBaseVO = iRuleBaseIntegrationAndElaborationService
                .getLatestIntegrationAndElaborationFromDB(userId, courseId);

        if (ruleBaseVO != null) {
//            log.info(ruleBaseVO.toString());
            return JSONResult.ok(ruleBaseVO.getResponse());
        } else {
            return JSONResult.ok();
        }
//        return JSONResult.errorMsg("system error, please try again later");
    }

    @PostMapping("/rate-chatgpt-answer")
    @ResponseBody
    public JSONResult rateChatgptAnswer(Long userChatgptLogId, Integer responseRatingStar, Integer responseRatingThumb, Long userId, String courseId) {
//        iUserChatgptLogService.rateChatgptAnswer(userChatgptLogId, responseRatingStar, responseRatingThumb, userId, courseId);
        // print userChatgptLogId, responseRatingStar, responseRatingThumb, userId, courseId
        log.info("------------------rateChatgptAnswer------------------");
        log.info("userChatgptLogId: " + userChatgptLogId + ", responseRatingStar: " + responseRatingStar + ", responseRatingThumb: "+ responseRatingThumb +", userId: " + userId + ", courseId: " + courseId);
        iUserChatgptLogService.rateChatgptAnswer(userChatgptLogId, responseRatingStar, responseRatingThumb,userId, courseId);
        return JSONResult.ok();
    }

    @PostMapping("/submit-consult-result")
    @ResponseBody
    public JSONResult submitConsultResult(Long userId, String courseId, String contentResult, String saveTime, BigDecimal score, String feedback) {
        log.info("------------------submitConsultResult------------------");
        MedicalConsultResult medicalConsultResult = new MedicalConsultResult() {{
            setUserId(userId);
            setCourseId(courseId);
            setContentResult(contentResult);
            setSaveTime(saveTime);
            setScore(score);
            setFeedback(feedback);
        }};
        log.info("saveConsultResult: " + medicalConsultResult.toString());
        iMedicalConsultResultService.save(medicalConsultResult);
        return JSONResult.ok();
    }


}



