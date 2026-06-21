package com.monash.flora_backend.controller;

import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import com.monash.flora_backend.config.cache.IGlobalCache;
import com.monash.flora_backend.constant.MyConstant;
import com.monash.flora_backend.constant.MyConstantForSpecificTask;
import com.monash.flora_backend.constant.MyConstantMariaModelSRLPattern;
import com.monash.flora_backend.controller.req.ChatgptRequest;
import com.monash.flora_backend.controller.req.GptScaffoldRequest;
import com.monash.flora_backend.controller.req.SrlProcessRequest;
import com.monash.flora_backend.controller.vo.*;
import com.monash.flora_backend.dao.customize_entity.MdlQuestionnaireAllResponse;
import com.monash.flora_backend.dao.entity.ConsultationTableLog;
import com.monash.flora_backend.dao.entity.MedicalConsultResult;
import com.monash.flora_backend.dao.entity.TraceDataRealTimeProcess;
import com.monash.flora_backend.dao.entity.WholePageAnnotation;
import com.monash.flora_backend.service.*;
import com.monash.flora_backend.service_func.ActionAndProcessService;
import com.monash.flora_backend.service_func.AsyncTaskService;
import com.monash.flora_backend.service_func.GptScaffoldPromptService;
import com.monash.flora_backend.service_moodle.IMdlQuestionnaireService;
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
import java.util.*;
import java.util.stream.Collectors;



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
    private final IMdlQuestionnaireService iMdlQuestionnaireService;
    private final IEssayProductGoalService iEssayProductGoalService;

    private final IMedicalConsultResultService iMedicalConsultResultService;
    private IConsultationTableLogService iConsultationTableLogService;
    private final IGlobalCache iGlobalCache;
    private final IEssayAtTimePointService iEssayAtTimePointService;

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

    @PostMapping("/save-essay-content-time-point")
    @ResponseBody
    public JSONResult saveEssayContentTimePoint(EssayVO essayVO) {
        iEssayAtTimePointService.saveEssayAtTimePoint(essayVO);
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
    @GetMapping("/load-chatgpt-scaffold/{userId}/{courseId}/{allowGptScaffoldsChat}")
    @ResponseBody
    public JSONResult loadGptScaffold(@PathVariable("userId") Long userId, @PathVariable("courseId") String courseId, @PathVariable("allowGptScaffoldsChat") boolean allowGptScaffoldsChat) {
//        List<UserChatgptLogVO> userChatgptLogVOList = iUserChatgptLogService.findAllChatgptLogByUserIdAndType(userId, courseId);
        List<GptScaffoldVO> gptScaffoldVOList;

        if (allowGptScaffoldsChat) {
            gptScaffoldVOList = iGptScaffoldService.findAllGptScaffoldAndChatByUserIdAndCourseId(userId, courseId);
        } else {
            gptScaffoldVOList = iGptScaffoldService.findAllGptScaffoldByUserIdAndCourseId(userId, courseId);
        }

//        log.info(userChatgptLogVOList.size());
//        List<UserChatgptLogVO> scaffoldsLogList = userChatgptLogVOList.stream().filter(u -> !u.getUserQuestions().startsWith("no scaffold generated")).collect(Collectors.toList());
        return JSONResult.ok(gptScaffoldVOList);
    }



    /**
     * For CELLA study 2, support GPT scaffold.
     *
     * @param gptScaffoldRequest
     * @return
     */
    @PostMapping("/chatgpt-scaffold")
    @ResponseBody
    public JSONResult gptScaffold(@RequestBody GptScaffoldRequest gptScaffoldRequest) {

        log.info("request for chatgpt-scaffold");
        // 收到请求，先放入缓存，每个userid-courseid-gpt-scaffold-1 2 3
        String redisKey = MyConstant.REDIS_GPT_SCAFFOLD_TRIGGER + gptScaffoldRequest.getUserId() + "-" + gptScaffoldRequest.getCourseId() + "-" + gptScaffoldRequest.getGptScaffoldNumber();
        if (iGptScaffoldService.isRepeatGptScaffoldRequest(redisKey, gptScaffoldRequest.getUserId(), gptScaffoldRequest.getCourseId(), gptScaffoldRequest.getGptScaffoldNumber())) {
            return JSONResult.errorMsg("repeat send gpt scaffold"); // TODO 需要查看此处能否正确在前端收到
        }

        if (CollUtil.isNotEmpty(gptScaffoldRequest.getGptScaffoldReturnMessages())) {
            //直接return message
            return JSONResult.ok(iGptScaffoldService.handleManualScaffold(gptScaffoldRequest));
        }

        gptScaffoldRequest.setEssay(checkChatgptRequestEssay(gptScaffoldRequest.getEssay(), gptScaffoldRequest.getUserId(), gptScaffoldRequest.getCourseId()));

        //动态生成GPT prompt
//        String dynamicPrompt = gptScaffoldPromptService.generateAdaptivePrompt(studyName, MyConstant.testISDIMUName, MyConstant.preTestName, MyConstant.testAboutYourSelfName, courseId, userId, gptScaffoldNumber, essay);
        String dynamicPrompt = gptScaffoldPromptService.generatePromptBasedOnLearningConditionAndSRLProcess(gptScaffoldRequest);
        if (StrUtil.isEmpty(dynamicPrompt)) {
            GptScaffoldVO vo = iGptScaffoldService.handleNoScaffoldCondition(gptScaffoldRequest);
            if (vo == null) {
                return JSONResult.errorMsg("number of scaffold generated-----number :" + gptScaffoldRequest.getGptScaffoldNumber());
            } else {
                return JSONResult.ok(vo);
            }
        }
        GptScaffoldVO gptScaffoldVO;
        if (gptScaffoldRequest.isAllowGptScaffoldsChat()) { //当允许scaffold chat时候，使用 assistant 生成 scaffold
            // Group C condition
            gptScaffoldVO = iGptScaffoldService.getGptScaffoldResponse(
                    dynamicPrompt, gptScaffoldRequest.getAgentName(), gptScaffoldRequest.getIncludeEssay() ? gptScaffoldRequest.getEssay() : "", gptScaffoldRequest.getBackgroundFileNameList(),
                    gptScaffoldRequest.getGptScaffoldRole(), gptScaffoldRequest.getGptScaffoldRoleDescription(), gptScaffoldRequest.getGptScaffoldNumber(), gptScaffoldRequest.getUserId(),
                    gptScaffoldRequest.getCourseId(), gptScaffoldRequest.getGptScaffoldParameters(), "This is a scaffold", gptScaffoldRequest.getToolsLanguage());
        } else {
            gptScaffoldVO = iGptScaffoldService.getGptScaffoldResponse(
                    dynamicPrompt, gptScaffoldRequest.getIncludeEssay() ? gptScaffoldRequest.getEssay() : "", gptScaffoldRequest.getBackgroundFileNameList(),
                    gptScaffoldRequest.getGptScaffoldRole(), gptScaffoldRequest.getGptScaffoldRoleDescription(), gptScaffoldRequest.getGptScaffoldNumber(), gptScaffoldRequest.getUserId(),
                    gptScaffoldRequest.getCourseId(), gptScaffoldRequest.getGptScaffoldParameters());
        }

        return JSONResult.ok(gptScaffoldVO);
    }

/*    *//**
     * For CELLA study 3, support GPT scaffold and chat.
     *
     * @param gptScaffoldRequest
     * @return
     *//*
    @PostMapping("/proactive-scaffold")
    @ResponseBody
    public JSONResult proactiveGptScaffold(@RequestBody GptScaffoldRequest gptScaffoldRequest) {
        log.info("request for chatgpt-scaffold");
        // 收到请求，先放入缓存，每个userid-courseid-gpt-scaffold-1 2 3
        String redisKey = MyConstant.REDIS_GPT_SCAFFOLD_TRIGGER + gptScaffoldRequest.getUserId() + "-" + gptScaffoldRequest.getCourseId() + "-" + gptScaffoldRequest.getGptScaffoldNumber();
        if (iGptScaffoldService.isRepeatGptScaffoldRequest(redisKey, gptScaffoldRequest.getUserId(), gptScaffoldRequest.getCourseId(), gptScaffoldRequest.getGptScaffoldNumber())) {
            return JSONResult.errorMsg("repeat send gpt scaffold"); // TODO 需要查看此处能否正确在前端收到
        }

        if (CollUtil.isNotEmpty(gptScaffoldRequest.getGptScaffoldReturnMessages())) {
            //直接return message
            return JSONResult.ok(iGptScaffoldService.handleManualScaffold(gptScaffoldRequest));
        }

        gptScaffoldRequest.setEssay(checkChatgptRequestEssay(gptScaffoldRequest.getEssay(), gptScaffoldRequest.getUserId(), gptScaffoldRequest.getCourseId()));

        //动态生成GPT prompt
//        String dynamicPrompt = gptScaffoldPromptService.generateAdaptivePrompt(studyName, MyConstant.testISDIMUName, MyConstant.preTestName, MyConstant.testAboutYourSelfName, courseId, userId, gptScaffoldNumber, essay);
        String dynamicPrompt = gptScaffoldPromptService.generatePromptBasedOnLearningConditionAndSRLProcess(gptScaffoldRequest);
        if (StrUtil.isEmpty(dynamicPrompt)) {
            GptScaffoldVO vo = iGptScaffoldService.handleNoScaffoldCondition(gptScaffoldRequest);
            if (vo == null) {
                return JSONResult.errorMsg("number of scaffold generated-----number :" + gptScaffoldRequest.getGptScaffoldNumber());
            } else {
                return JSONResult.ok(vo);
            }
        }

        GptScaffoldVO gptScaffoldVO = iGptScaffoldService.getGptScaffoldResponse(
                dynamicPrompt, gptScaffoldRequest.getIncludeEssay() ? gptScaffoldRequest.getEssay() : "", gptScaffoldRequest.getBackgroundFileNameList(),
                gptScaffoldRequest.getGptScaffoldRole(), gptScaffoldRequest.getGptScaffoldRoleDescription(), gptScaffoldRequest.getGptScaffoldNumber(), gptScaffoldRequest.getUserId(),
                gptScaffoldRequest.getCourseId(), gptScaffoldRequest.getGptScaffoldParameters(), "This is a scaffold");
        return JSONResult.ok(gptScaffoldVO);
    }*/

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

    // TODO 此方法可以优化， essay 可以直接赋值，不需要额外从数据库获取。
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

    @PostMapping("/chat-with-scaffold")
    @ResponseBody
    public JSONResult chatWithScaffold(@RequestBody GptScaffoldRequest gptScaffoldRequest) {


        String dynamicPrompt = gptScaffoldPromptService.generatePromptBasedOnLearningConditionAndSRLProcess(gptScaffoldRequest);
        UserChatgptLogVO userChatgptLogVO = iUserChatgptLogService.getScaffoldChatResponse(
                gptScaffoldRequest.getUserQuestion(), "", "",
                gptScaffoldRequest.getEssay(), new ArrayList<>(), gptScaffoldRequest.getUserId(), gptScaffoldRequest.getCourseId(), gptScaffoldRequest.getAgentRole(),
                gptScaffoldRequest.getAgentName(), 0, Long.valueOf(gptScaffoldRequest.getGptScaffoldNumber()), dynamicPrompt, gptScaffoldRequest.getToolsLanguage());
        return JSONResult.ok(userChatgptLogVO);
    }

    @GetMapping("/load-chat-with-scaffold/{userId}/{courseId}")
    @ResponseBody
    public JSONResult loadChatWithScaffoldHistory(@PathVariable("userId") Long userId, @PathVariable("courseId") String courseId) {

        List<UserChatgptLogVO> userChatgptLogVOList = iUserChatgptLogService.findAllChatgptLogByUserIdAndCourseId(userId, courseId, "", "");
        userChatgptLogVOList.forEach(u->{
            log.info(u.toString());
        });
        return JSONResult.ok(userChatgptLogVOList);
    }

    @PostMapping("/chatgpt")
    @ResponseBody
    public JSONResult chatgpt(
            @RequestBody ChatgptRequest chatgptRequest
//            String question, Long userId, String courseId, String essay,
//                              String questionId, Boolean includeEssay, String chatgptRoleDescription,
//                              String chatgptRole, List<String> backgroundFileNameList // 这三项来自 config tool
    ) {

        String essay = chatgptRequest.getIncludeEssay() ? checkChatgptRequestEssay(chatgptRequest.getEssay(), chatgptRequest.getUserId(), chatgptRequest.getCourseId()) : "";
        chatgptRequest.setEssay(essay);
        /*log.info("for /chatgpt, essay: {}", chatgptRequest.getEssay());
        log.info("for /chatgpt, chatgptRequest.getChatgptRole(): {}", chatgptRequest.getChatgptRole());
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
        }*/
        log.info("chatgptRole------------" + chatgptRequest.getChatgptRole());

        // todo 收到请求，先放入缓存 判断是不是重复发送
        if(chatgptRequest.getChatgptRole().equals("scaffold") && chatgptRequest.getRoundNumber() != null) { // 如果是scaffold，判断是否重复发送

            int scaffoldNumber = chatgptRequest.getRoundNumber() < 40 ? 1 : 2;

            String redisKey = "PatientScaffoldUsed-" + chatgptRequest.getUserId() + "-" + chatgptRequest.getCourseId() + "-" + scaffoldNumber;
            if (iGptScaffoldService.isRepeatGptScaffoldRequest(redisKey, chatgptRequest.getUserId(), chatgptRequest.getCourseId(), scaffoldNumber)) {
                return JSONResult.errorMsg("repeat sending patient scaffold");
            }
        }

        // for toefl lab
        if(chatgptRequest.getChatgptRole().equals("mediator_scaffold")) {
            String redisKey = "MediatorScaffoldUsed-" + chatgptRequest.getUserId() + "-" + chatgptRequest.getCourseId();
            if (iGptScaffoldService.isRepeatGptScaffoldRequest(redisKey, chatgptRequest.getUserId(), chatgptRequest.getCourseId(), null)) {
                return JSONResult.errorMsg("repeat sending mediator scaffold");
            }
        }
        UserChatgptLogVO userChatgptLogVO = null;
        if (chatgptRequest.getChatgptRole().equals("scaffold-chat")) { // 在提供scaffold之后可以问关于scaffold 的问题
            userChatgptLogVO = iUserChatgptLogService.getScaffoldChatResponse(
                    chatgptRequest.getQuestion(), chatgptRequest.getExtraPrompt(), chatgptRequest.getQuestionId(),
                    essay, chatgptRequest.getBackgroundFileNameList(), chatgptRequest.getUserId(), chatgptRequest.getCourseId(), chatgptRequest.getChatgptRole(),
                    chatgptRequest.getAgentName(), chatgptRequest.getRoundNumber(), 0L,
                     "This is a question", chatgptRequest.getToolsLanguage());
        } else if (CollUtil.contains(List.of(
                "jimmie_nhb_B_unstrict_ai", "jimmie_nhb_C_metacognitive_ai", "jimmie_nhb_D_scaffolding_ai",
                "jimmie_nhb_E_conflict_ai", "jimmie_nhb_F_learning-phase_ai", "jimmie_nhb_G_obedient_ai"),
                (chatgptRequest.getAgentName()))) {
            log.info("Jimmie study:{}---------------question:{}", chatgptRequest.getSpecialRequirementPrompt(), chatgptRequest.getQuestion());
            // Jimmie study settings
            userChatgptLogVO = iUserChatgptLogService.getScaffoldChatResponse(
                    chatgptRequest.getQuestion(), chatgptRequest.getExtraPrompt(), chatgptRequest.getQuestionId(),
                    essay, chatgptRequest.getBackgroundFileNameList(), chatgptRequest.getUserId(), chatgptRequest.getCourseId(), chatgptRequest.getChatgptRole(),
                    chatgptRequest.getAgentName(), chatgptRequest.getRoundNumber(), chatgptRequest.getTopicId(),
                    StrUtil.isEmpty(chatgptRequest.getSpecialRequirementPrompt()) ? "This is an interaction" : "This is a scaffold;;;" + chatgptRequest.getSpecialRequirementPrompt(), chatgptRequest.getToolsLanguage());
        } else {
            // 使用gpt role 来区分
            log.info("gpt role:{}", chatgptRequest.getChatgptRole());
            log.info("assistantName: {}", chatgptRequest.getAgentName());
            userChatgptLogVO = iUserChatgptLogService.getChatgptResponse(chatgptRequest);
        }

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

        UserChatgptLogVO userChatgptLogVO = iUserChatgptLogService.getChatgptConsultResponse(chatgptRequest.getQuestion(), chatgptRequest.getChatgptRoleDescription(), chatgptRequest.getQuestionId(), essay, chatgptRequest.getBackgroundFileNameList(), chatgptRequest.getUserId(), chatgptRequest.getCourseId(), chatgptRequest.getChatgptRole(), chatgptRequest.getChatgptParameters(), chatgptRequest.getAgentName(), chatgptRequest.getRoundNumber(), chatgptRequest.getToolsLanguage());

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



        List<UserChatgptLogVO> userChatgptLogVOList = iUserChatgptLogService.findAllChatgptLogByUserIdAndCourseId(userId, courseId, "", "");
        userChatgptLogVOList.forEach(u->{
            log.info(u.toString());
        });
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
//            return JSONResult.ok(JSONUtil.parseObj(ruleBaseVO.getResponse()));
            return JSONResult.ok(JSONUtil.parseObj(ruleBaseVO.getResponse())); /// 此处 有问题 TODO
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

    @PostMapping("/submit-consult-table")
    @ResponseBody
    public JSONResult submitConsultTable(Long userId, String courseId, String contentJson, String createdAt) {
        log.info("------------------submitConsultTable------------------");
        ConsultationTableLog consultationTableLog = new ConsultationTableLog() {{
            setUserId(userId);
            setCourseId(courseId);
            setContentJson(contentJson);
            setCreatedAt(createdAt);
        }};
        log.info("saveConsultationTableLog: " + consultationTableLog.toString());
        iConsultationTableLogService.save(consultationTableLog);
        return JSONResult.ok();
    }

    @GetMapping("/latest-consult-table")
    @ResponseBody
    public JSONResult getLatestConsultTable(Long userId, String courseId) {
        log.info("------------------getLatestConsultTable------------------");
        ConsultationTableLog latestLog = iConsultationTableLogService.getLatestLog(userId, courseId);
        if (latestLog == null) {
            return JSONResult.errorMsg("没有找到该用户和课程的日志");
        }
        log.info("latestConsultationTableLog: " + latestLog.toString());
        return JSONResult.ok(latestLog);
    }




    @GetMapping("/label-current-real-time-srl-process/{courseId}/{userId}/{modelType}")
    @ResponseBody
    public JSONResult labelCurrentRealTimeProcess(@PathVariable("userId") Long userId, @PathVariable("courseId") String courseId, @PathVariable("modelType") String modelType) {

        String labelCurrentRealTimeProcessKey = "LABEL_CURRENT_REAL_TIME_PROCESS_" + userId + "-" + courseId;

        if (iGlobalCache.hasKey(labelCurrentRealTimeProcessKey)) {
            return JSONResult.ok(); // 上一次任务未完成
        }

        iGlobalCache.set(labelCurrentRealTimeProcessKey, "1", 30);

        actionAndProcessService.getRealTimeSimplifiedTraceDataLabelledAsync(userId, courseId, modelType);

        log.info("-------labelCurrentRealTimeProcess - finish");
//        currentResultList.forEach(result -> log.info("----------result:{}", result.toString()));

        return JSONResult.ok();
    }


    @GetMapping("/real-time-srl-process/{courseId}/{userId}/{modelType}")
    @ResponseBody
    public JSONResult testRealTimeProcess(@PathVariable("userId") Long userId, @PathVariable("courseId") String courseId, @PathVariable("modelType") String modelType) {

        TraceDataRealTimeSrlCategoryVO traceDataRealTimeSrlCategoryVO = new TraceDataRealTimeSrlCategoryVO();

        String previousCourseId = MyConstantForSpecificTask.NIJMEGEN_CELLA_STUDY_3_TASK_ID_MAP.getOrDefault(courseId, "0");


        List<TraceDataRealTimeProcess> currentResultList = actionAndProcessService.getRealTimeSimplifiedTraceDataLabelled(userId, courseId, modelType);

        log.info("-------result size:{}", currentResultList.size());
        currentResultList.forEach(result -> log.info("----------result:{}", result.toString()));
        Map<String, Double> currentLabelDurationMap = new HashMap<>();
        List<ProcessDurationVO> currentDurationVOList = actionAndProcessService.calculateRealTimeProcessDurations(currentResultList, true, currentLabelDurationMap);

        log.info("-------durationVOList size:{}", currentDurationVOList.size());
        currentDurationVOList.forEach(durationVO -> log.info("----------durationVO:{}", durationVO.toString()));
        traceDataRealTimeSrlCategoryVO.setCurrentDurationVOList(CollUtil.isEmpty(currentDurationVOList) ? new ArrayList<>() : currentDurationVOList);

        if (!"0".equals(previousCourseId)) {
            //previous的所有 real time trace 都已经储存好了
//            List<TraceDataRealTimeProcess> previousResultList = actionAndProcessService.getRealTimeSimplifiedTraceDataLabelled(userId, previousCourseId, modelType);
            List<TraceDataRealTimeProcess> previousResultList = actionAndProcessService.getAllRealTimeSimplifiedTraceData(userId, previousCourseId);
            Map<String, Double> previousLabelDurationMap = new HashMap<>();
            List<ProcessDurationVO> previousDurationVOList = actionAndProcessService.calculateRealTimeProcessDurations(previousResultList, true, previousLabelDurationMap);
            traceDataRealTimeSrlCategoryVO.setPreviousDurationVOList(CollUtil.isEmpty(previousDurationVOList) ? new ArrayList<>() : previousDurationVOList);
        } else {
            traceDataRealTimeSrlCategoryVO.setPreviousDurationVOList(new ArrayList<>());
        }

        return JSONResult.ok(traceDataRealTimeSrlCategoryVO);
    }

    /**
     * 通用获取questionnaire 所有问题的response
     * @param courseId
     * @param questionnaireName
     * @param userId
     * @return
     */
    @GetMapping("/get-questionnaire-all-response")
    @ResponseBody
    public JSONResult getQuestionnaireAllResponse(Long courseId, String questionnaireName, Long userId) {

        log.info("courseId: {}, QuestionnaireName: {}, userId: {}", courseId, questionnaireName, userId);
        String userQuestionnaireKey = userId + "_" + courseId + "_" + questionnaireName;
        log.info("Getting questionnaire response -> userQuestionnaireKey:{}", userQuestionnaireKey);

//        iGlobalCache.del(userQuestionnaireKey);
//        log.info("******Deleted questionnaire response -> userQuestionnaireKey:" + userQuestionnaireKey);
        Map<Object, Object> userResponseDictionary = null;
        if (iGlobalCache.hasKey(userQuestionnaireKey)) {
            userResponseDictionary = iGlobalCache.hmget(userQuestionnaireKey);
        }

        if (CollUtil.isEmpty(userResponseDictionary)) {
            log.info("{}has no response in redis!", userQuestionnaireKey);
            List<MdlQuestionnaireAllResponse> userResponseList = iMdlQuestionnaireService.getQuestionnaireUserResponse(questionnaireName, courseId, userId);
            if (CollUtil.isEmpty(userResponseList)) {
                log.info(userId + " has no response for questionnaire " + questionnaireName + "in course " + courseId);
                return new JSONResult(200, "Never answered the questionnaire", new ArrayList<>());
            } else {
                log.info("userResponseList size: {}", userResponseList.size());

                //过滤掉所有 selected 是false 的选项
                Map<Long, List<MdlQuestionnaireResponseCompeteVO>> questionnaireRepMap = new HashMap<>();
                Map<Long, List<String>> qsPairByRespId = new HashMap<>();
                for (MdlQuestionnaireAllResponse resp : userResponseList) {
                    Long curResponseId = resp.getResponseId();
                    log.info("resp.getQuestionnaireName(): {}", resp.getQuestionnaireName());
                    MdlQuestionnaireResponseCompeteVO questionnaireResponseVO = MyBeanCopyUtils.copyBean(resp, MdlQuestionnaireResponseCompeteVO.class);
                    questionnaireResponseVO.setQuestionnaireName(resp.getQuestionnaireName());
                    questionnaireResponseVO.setUserId(resp.getUserId());

                    if (resp.getSelected()) {
                        questionnaireRepMap.putIfAbsent(curResponseId, new ArrayList<>());
                        questionnaireRepMap.get(curResponseId).add(questionnaireResponseVO);

                        String qst_answer = resp.getQuestionName() + " -> " + resp.getChoiceContent();;
                        qsPairByRespId.putIfAbsent(curResponseId, new ArrayList<>());
                        qsPairByRespId.get(curResponseId).add(qst_answer);
                    }
                }
                Map<String, Object> map4StoreRedis = new HashMap<>();
                for (Map.Entry<Long, List<MdlQuestionnaireResponseCompeteVO>> userResponseEntry : questionnaireRepMap.entrySet()) {
                    Long temp_respId = userResponseEntry.getKey();
                    List<MdlQuestionnaireResponseCompeteVO> responses = userResponseEntry.getValue();
                    //在Nijmegen study这个 none 代表product goal
                    responses.removeIf(response ->
                            !response.getDependency().equals("none") &&  // 所有Dependency 不是none的
                                    !response.getDependency().isEmpty() &&  // 所有Dependency 不是空的
                                    !qsPairByRespId.get(temp_respId).contains(response.getDependency())
                    );

                    // Sort using streams, 根据question position 排序，每个question 是一个答案
                    List<MdlQuestionnaireResponseCompeteVO> sortedResponses = responses.stream()
                            .sorted(Comparator.comparingInt(MdlQuestionnaireResponseCompeteVO::getQuestionPosition))
                            .collect(Collectors.toList());

                    map4StoreRedis.put(String.valueOf(temp_respId), sortedResponses);
                }
                iGlobalCache.hmset(userQuestionnaireKey, map4StoreRedis, MyConstant.REDIS_EXPIRE_SECONDS);
                return JSONResult.ok(questionnaireRepMap);
            }
        }
        return JSONResult.ok(userResponseDictionary);
    }

    @PostMapping("/analyse-essay-product")
    @ResponseBody
    public JSONResult analyseEssayProduct(@RequestParam("userId") Long userId, @RequestParam("courseId") String courseId,
                                          @RequestParam("essay") String essay, @RequestParam("username") String username,
                                          @RequestParam("processTime") String processTime, @RequestParam("triggerEvent") String triggerEvent,
                                          @RequestParam("requestNumber") String requestNumber) {

        //需要questionnaire 的 标题里面包含 relevance/main points/structure
        // 获取 essay product goal
        /*String requestNumber = ""; // 从questionnaire 获取 TODO
        if (essayProductGoal.toLowerCase().contains("relevance")) {
            requestNumber = "1";
        } else if (essayProductGoal.toLowerCase().contains("main points")) {
            requestNumber = "2";
        } else if (essayProductGoal.toLowerCase().contains("structure")) {
            requestNumber = "3";
        }*/
        String essayAnalysisResultKey = userId + "-" + courseId + "-essayAnalysisResultKey";

        log.info("analyse-essay-product processing, userid:{}, courseid:{}", userId, courseId);
        String essayProductAnalysisRequestKey = MyConstant.REDIS_ESSAY_PRODUCT_ANALYSIS + "-" + userId + "-" + courseId;
        //iGlobalCache.del(essayProductAnalysisRequestKey);
        if (iGlobalCache.hasKey(essayProductAnalysisRequestKey)) {
            log.warn("has key in redis -------- analyse-essay-product processing has not finished, userid:{}, courseid:{}", userId, courseId);
            return JSONResult.ok();
        } else {
            // 如果是第一次处理，将信息存入redis
            iGlobalCache.set(essayProductAnalysisRequestKey, "processing", MyConstant.REDIS_EXPIRE_SECONDS);
        }

        log.info("essay:----]" + essay + "[--------");

        if (StrUtil.isEmpty(essay.replaceAll("[\n\r]", ""))) {
            log.warn("empty essay -------- analyse-essay-product processing, userid:{}, courseid:{}", userId, courseId);
            // essay 分析结果返回后, 删除防抖设置的key
            iGlobalCache.del(essayProductAnalysisRequestKey);
            iGlobalCache.del(essayAnalysisResultKey);
            return JSONResult.ok();
        }
        String taskName = "task1"; // 98 task1, 101 task2

        if (MyConstantForSpecificTask.NIJMEGEN_CELLA_STUDY_3_TASK_ID_MAP.values().contains(courseId)) {
            taskName = "task1";
        } else {
            taskName = "task2";
        }
        log.info("task name: {}", taskName);
        // 发送请求处理essay

        String essayAnalysisResult = iEssayProductGoalService.sendEssayProductAnalysisRequest(requestNumber, essay, userId, courseId, username, processTime, triggerEvent, taskName);
        log.info("essayAnalysisResult: {}", essayAnalysisResult);



        if (essayAnalysisResult.equals("essay-analysis-error")) {
            log.info("essay-analysis-error, userid:{}, courseid:{}", userId, courseId);
            // essay 分析结果返回后, 删除防抖设置的key
            iGlobalCache.del(essayProductAnalysisRequestKey);
            iGlobalCache.del(essayAnalysisResultKey);
            return JSONResult.ok();
        }


        // essay 分析结果返回后, 删除防抖设置的key
        iGlobalCache.del(essayProductAnalysisRequestKey);
        // 最新 result 存入 redis

        iGlobalCache.set(essayAnalysisResultKey, essayAnalysisResult, MyConstant.REDIS_EXPIRE_SECONDS);
//        String essayProductGoalKey = userId + "-" + courseId + "-essayProductGoalKey";
//        iGlobalCache.set(essayProductGoalKey, requestNumber, MyConstant.REDIS_EXPIRE_SECONDS);
        return JSONResult.ok(essayAnalysisResult);
    }

    @PostMapping("/get-essay-product-analysis")
    @ResponseBody
    public JSONResult getEssayProductAnalysis(@RequestParam("userId") Long userId, @RequestParam("courseId") String courseId) {
        //从redis中取出数据
        String essayAnalysisResultKey = userId + "-" + courseId + "-essayAnalysisResultKey";
        Map<String, Integer> essayAnalysisResultMap;
        if (iGlobalCache.hasKey(essayAnalysisResultKey)) {
            String essayAnalysisResult = iGlobalCache.get(essayAnalysisResultKey);
            essayAnalysisResultMap = JSONUtil.toBean(essayAnalysisResult, HashMap.class);
            log.info("Getting essayAnalysisResult from iGlobalCache: "+essayAnalysisResult);
        } else {
            log.info("essayAnalysisResult not exist in iGlobalCache!!!");
            essayAnalysisResultMap = new HashMap<>();
        }
        // 不需要检查数据库，因为如果redis中没有就表示还没有做过分析，数据库中肯定没有

        return JSONResult.ok(essayAnalysisResultMap);
    }

}



