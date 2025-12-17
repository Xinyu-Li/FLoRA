package com.monash.flora_backend.controller;

import cn.hutool.core.util.StrUtil;
import cn.hutool.json.JSONArray;
import com.monash.flora_backend.config.cache.IGlobalCache;
import com.monash.flora_backend.constant.MyConstant;
import com.monash.flora_backend.controller.req.ChatgptRequest;
import com.monash.flora_backend.controller.req.CollaborateChatgptRequest;
import com.monash.flora_backend.controller.vo.CollaborativePadVO;
import com.monash.flora_backend.controller.vo.EssayVO;
import com.monash.flora_backend.controller.vo.UserChatgptLogVO;
import com.monash.flora_backend.dao.customize_entity.MdlQuestionnaireResponseBaseResult;
import com.monash.flora_backend.service.*;
import com.monash.flora_backend.service_func.ActionAndProcessService;
import com.monash.flora_backend.service_func.UserDataManagementService;
import com.monash.flora_backend.service_moodle.IMdlGroupsService;
import com.monash.flora_backend.service_moodle.IMdlQuestionnaireService;
import com.monash.flora_backend.service_moodle.IMdlQuizAttemptsService;
import com.monash.flora_backend.util.JSONResult;
import com.monash.flora_backend.util.MyBeanCopyUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;
import java.util.concurrent.ExecutorService;

/**
 * ClassName: TestController
 * Description:
 *
 * @author Xinyu Li
 * @since 1/14/2023 5:41 PM
 */
@Slf4j
@Controller
@RequiredArgsConstructor
public class TestController {

    private final IAnnotationService iAnnotationService;
    private final IGlobalCache iGlobalCache;
    private final IDeletedAnnotationService iDeletedAnnotationService;
    private final IEssayService iEssayService;
    private final ICollaborateService iCollaborateService;
    private final IPlannerService iPlannerService;
    private final ITraceDataService iTraceDataService;
    private final IWholePageAnnotationService iWholePageAnnotationService;
    private final IUserStartTimeService iUserStartTimeService;
    private final IScaffoldService iScaffoldService;
    private final IUserChatgptLogService iUserChatgptLogService;
    private final IUserTeacherLogService iUserTeacherLogService;
    private final IDictionaryLogService iDictionaryLogService;

    private final IMdlGroupsService iMdlGroupsService;
    private final IMdlQuizAttemptsService iMdlQuizAttemptsService;
    private final IMdlQuestionnaireService iMdlQuestionnaireService;

    private final ActionAndProcessService actionAndProcessService;
    private final UserDataManagementService userDataManagementService;
    private final IPopupQuestionnaireService popupQuestionnaireService;

    static String chatgptID = "";


    @GetMapping("/clear-trace-data/{userId}")
    @ResponseBody
    public JSONResult clearTraceData(@PathVariable("userId") Long userId) {
        log.info("clear trace data");

        userDataManagementService.clearAllUserLog(userId);
        return JSONResult.ok();
    }

    /**
     * 学生聊天窗口是由js文件创建的，所以此页面只做测试用
     *
     * @return
     */
    @GetMapping("/test-student-chat")
    public String testStudentChat() {
        return "test_student_chat";
    }

//    @PostMapping("/testchatgpt")
//    @ResponseBody
//    public String chatgpt(String question, Long userId) {
//        String url = "https://api.openai.com/v1/chat/completions";
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_JSON);
//        headers.setBearerAuth("sk-");
//        log.info("Received Question: " + question + " Uer Id: "+ userId);
//
//        long startTime = System.currentTimeMillis();
//        HttpEntity<String> request = new HttpEntity<>("{\"model\": \"gpt-3.5-turbo\",\"messages\": [{\"role\": \"user\", \"content\": \"" + question + "\"}]}", headers);
//
//        String result = restTemplate.postForObject(url, request, String.class);
//
//        log.info("Chatgpt request time: " + (System.currentTimeMillis() - startTime) / 1000);
//
//        log.info(result);
//
////        "Hello, Can you teach me english writing?"
//        JSONObject jsonObject = JSON.parseObject(result);
//        if (jsonObject != null) {
//
//            UserChatgptLog userChatgptLog = new UserChatgptLog();
//            userChatgptLog.setChatgptId(jsonObject.getString("id"));
//            userChatgptLog.setChatgptObject(jsonObject.getString("object"));
//            userChatgptLog.setChatgptCreated(String.valueOf(jsonObject.getLong("created")));
//            userChatgptLog.setChatgptModel(jsonObject.getString("model"));
//            userChatgptLog.setChatgptUsage(String.valueOf(jsonObject.getJSONObject("usage")));
//            userChatgptLog.setChatgptChoices(String.valueOf(jsonObject.getJSONArray("choices")));
//            userChatgptLog.setUserId(userId);
//            userChatgptLog.setUserQuestions(question);
//            iUserChatgptLogService.save(userChatgptLog);
//            log.info(userChatgptLog.toString());
//            return userChatgptLog.getChatgptChoices();
//        }
//        return "system error, please try again later";
//    }

    @GetMapping("/chattest")
    public String chattest() {
        return "chattest";
    }

//    @GetMapping("/chatgpttool")
//    public String chatgpttool() {
//        return "chatgpttool";
//    }

    @GetMapping("/test-video-upload")
    public String testVideoUpload() {
        return "test_video_upload";
    }

    @GetMapping("/test-video-record")
    public String testVideoRecord() {
        return "test_video_record";
    }

    @GetMapping("/")
    public String index() {
        return "index-revision";
    }

    @GetMapping("/index-revision")
    public String indexRevision() {
        return "index_revision";
    }

    @GetMapping("/index-revision2")
    public String indexRevision2() {
        return "index_revision2";
    }

    @GetMapping("/index-revision3")
    public String indexRevision3() {
        return "index_revision3";
    }

    @GetMapping("/index-revision4")
    public String indexRevision4() {
        return "index_revision4";
    }

    @GetMapping("/index-test-v2-4-1-nhb")
    public String testV24_1_nhb() {
        return "index_test_v2_4_1_nhb";
    }

    @GetMapping("/test-tony")
    public String testTony() {
        return "test_tony";
    }
    @GetMapping("/index-revision_s2t_t2s")
    public String indexRevision_s2t_t2s() {
        return "index_revision_s2t_t2s";
    }

    @GetMapping("/test-oulu")
    public String testOulu() {
        return "test_oulu";
    }

    @GetMapping("/test-zijian")
    public String testZijian() {return "test_zijian";}

    @GetMapping("/index-test-v2-4-1")
    public String testV24_1() {
        return "index_test_v2_4_1";
    }
    @GetMapping("/index-test-v2-5-1")
    public String testV25_1() {
        return "index_test_v2_5_1";
    }
    @GetMapping("/index-test-v2-6-1")
    public String testV26_1() {
        return "index_test_v2_6_1";
    }
    @GetMapping("/index-test-lin")
    public String test_lin() {
        return "index_test_lin";
    }
    @GetMapping("/index-test-zijian")
    public String test_Medicalzijian() {
        return "index_test_zijian";
    }

    @GetMapping("/index-test-zijian2")
    public String test_Medicalzijian2() {return "index_test_zijian2";}

    @GetMapping("/index-test-zijian3")
    public String test_Medicalzijian3() {return "index_test_zijian3";}
//    @PostMapping("/dictionary")
//    @ResponseBody
//    public JSONResult dictionaryQuery(@RequestBody Map<String, List> data) {
//
//        System.out.print(data.toString());
//        List<String> keywords = data.get("keywords");
//
////        String projectId = "flora-beijing";
//        String apiKey = "AIzaSyBb4rcqO8RvgjS52JTDnARqNjGQIYjE3ew";
////        // Supported Languages: https://cloud.google.com/translate/docs/languages
//////        String targetLanguage = "en-US";
//        String targetLanguage = "zh-CN";
////
////
//        DictionaryLogVO dictionaryVO = iDictionaryLogService.translateText(targetLanguage, keywords, apiKey);
//
//        return JSONResult.ok(dictionaryVO.getData());
//    }



    @PostMapping("/collaborate-write")
    @ResponseBody
    //public JSONResult collaborateWrite(String userId, String userName, String courseId) {
    public JSONResult collaborateWrite(String userId, String userName, String userGroup) {
        log.error("--------------------------------" + userId.toString());
        log.error("--------------------------------" + userName);
        //TODO 临时措施，之后需要更改
        //String userGroup = RandomUtil.randomString("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", 10);
        String url = MyConstant.ETHERPAD_API_URL;
        String apiKey = MyConstant.ETHERPAD_API_KEY;  //etherpad apikey
        try {
            // Ensure chatgptID is initialized
            if (chatgptID == null || chatgptID.isEmpty()) {
                chatgptID = iCollaborateService.collaborativeInit(url, apiKey);

                log.info("Created a new chatgptID" + chatgptID);
            }
            log.info("chatgptID" + chatgptID);

             //Retrieve group information
//            MdlGroups groupInfo = iMdlGroupsService.findGroupByUserIdAndCourseId(userId, Long.parseLong(courseId));
//            if (groupInfo == null) {
//                return JSONResult.errorMsg("Group not found for the given user and course.");
//            }

            // Create collaborative pad
            //String padId = userGroup + "_" + userId;
            //CollaborativePadVO collaborativePadVO = iCollaborateService.createCollaborativePad(userId, userName, groupInfo.getId().toString());

            //use userGroup (getlatname)
            CollaborativePadVO collaborativePadVO = iCollaborateService.createCollaborativePad(userId, userName, userGroup);

            // Return the result
            return JSONResult.ok(collaborativePadVO);
        } catch (Exception e) {
            e.printStackTrace();
            return JSONResult.errorMsg("An error occurred while creating the collaborative pad.");
        }
//        if (Objects.equals(chatgptID, "")) {
//            chatgptID = iCollaborateService.collaborativeInit(url, apiKey);
//        }
//        CollaborativePadVO collaborativePadVO = iCollaborateService.createCollaborativePad(userId, userName, userGroup);
//
//        log.error("--------------------------------" + collaborativePadVO.toString());
//        return JSONResult.ok(collaborativePadVO);
    }

//    @PostMapping("/questionnaire-create")
//    @ResponseBody
//    public JSONResult questionnaireCreate(@RequestParam("userId") long userId,
//                                          @RequestParam("courseId") long courseId,
//                                          @RequestParam("savetime") String savetime,
//                                          @RequestParam("questionnaireContent") String questionnaireContent,
//                                          @RequestParam("username") String username,
//                                          @RequestParam("triggerProcess") String triggerProcess,
//                                          @RequestParam("SRLProcessLength") int SRLProcessLength) {
//        log.warn(triggerProcess);
//        Map<String, String> response = new HashMap<>();
//        // 根据SRLProcess的length决定是否生成question
//        // todo 暂时去掉检测，测试用
////        if (SRLProcessLength != popupQuestionnaireService.getSRLProcessLength()) {
//            PopupQuestionnaire popupQuestionnaire = new PopupQuestionnaire();
//            popupQuestionnaire.setQuestionContent(questionnaireContent);
//            popupQuestionnaire.setSaveTime(savetime);
//            popupQuestionnaire.setUsername(username);
//            popupQuestionnaire.setUserId(userId);
//            popupQuestionnaire.setCourseId(courseId);
//            popupQuestionnaire.setTriggerProcess(triggerProcess);
//            int order = popupQuestionnaireService.saveNewQuestion(popupQuestionnaire);
//            if (SRLProcessLength >= -1) {
//                popupQuestionnaireService.setSRLProcessLength(SRLProcessLength, userId, courseId);
//            }
//            response.put("qorder", String.valueOf(order));
//            return JSONResult.ok(response);
////        } else {
////            response.put("info", "already genertated for this SRL process map");
////            return JSONResult.ok(response);
////        }
//    }
//    @PostMapping("/questionnaire-answer")
//    @ResponseBody
//    public JSONResult questionnaireAnwser(@RequestParam("userId") long userId,
//                                          @RequestParam("courseId") long courseId,
//                                          @RequestParam("qorder") int qorder,
//                                          @RequestParam("answerJson") String answerJson,
//                                          @RequestParam("answerTime") String answerTime) {
////        log.warn("questionnaire-answer");
////        popupQuestionnaireService.save();
//        popupQuestionnaireService.updateAnswer(userId, courseId, qorder, answerJson, answerTime);
//        return JSONResult.ok();
//    }
//
//    @GetMapping("/srlprocesslist/{userId}/{currentCourseId}")
//    @ResponseBody
//    public JSONResult testGetSRLProcessList(@PathVariable("userId") Long userId, @PathVariable("currentCourseId") Long currentCourseId){
//        //todo: 还没弄完，现在只是stub
//        int previousSRLProcessLength = popupQuestionnaireService.getSRLProcessLength(userId, currentCourseId);
//
//        JSONObject array = new JSONObject();
//        String[] strings = {"CMCTR2", "CSAR2", "OS3", "OA2", "OT2", "CMTR2"};
////        String[] strings = {"CMCTR2", "CSAR2", "OS3", "OA2", "OT2"};
//        array.set("previousSRLProcessLength", previousSRLProcessLength);
//        array.set("SRLProcessList", Arrays.asList(strings));
//        return JSONResult.ok(array);
//    }

//    @GetMapping("/srlprocesslist/{userId}/{currentCourseId}/{start}/{end}")
//    @ResponseBody
//    public JSONResult testGetSRLProcessList(@PathVariable("userId") Long userId, @PathVariable("currentCourseId") Long currentCourseId, @PathVariable("start") Long startSecnods,  @PathVariable("end") Long endSecnods){
//        //todo: 还没弄完，现在只是stub
//
//        int previousSRLProcessLength = popupQuestionnaireService.getSRLProcessLength(userId, currentCourseId);
//
//        JSONObject array = new JSONObject();
//        String[] strings = {"CMCTR2", "CSAR2", "OS3", "OA2", "OT2", "CMTR2"};
////        String[] strings = {"CMCTR2", "CSAR2", "OS3", "OA2", "OT2"};
//        array.set("previousSRLProcessLength", previousSRLProcessLength);
//        array.set("SRLProcessList", Arrays.asList(strings));
//        return JSONResult.ok(array);
//    }
//
//    @GetMapping("/load-popup-questionnaire/{userId}/{courseId}")
//    @ResponseBody
//    public JSONResult loadPopupQuestionnaire(@PathVariable("userId") long userId, @PathVariable("courseId") long courseId){
//        return JSONResult.ok(popupQuestionnaireService.getPopupQuestionnaireByUserId(userId, courseId));
//    }

//    @PostMapping("/update-question-setting")
//    @ResponseBody
//    public JSONResult updateQuestionSetting(@RequestParam("userId") long userId, @RequestParam("questionSettingJson") String questionSettingJson) {
//        iGlobalCache.set("questionSetting_" + userId, questionSettingJson);
//    }
//    @PostMapping("/get-question-setting")
//    @ResponseBody
//    public JSONResult getQuestionSetting(@RequestParam("userId") long userId, @RequestParam("questionSettingJson") String questionSettingJson) {
//        if (!iGlobalCache.hasKey("questionSetting_" + userId)) {
//            iGlobalCache.set("questionSetting_" + userId, questionSettingJson);
//            return JSONResult.ok(questionSettingJson);
//        }
//        else {
//            return JSONResult.ok(iGlobalCache.get("questionSetting_" + userId));
//        }
//    }

    @PostMapping("/collaborate-get-userColor")
    @ResponseBody
    public JSONResult collaborateGetUserColor(String padID) {
        log.info(padID);

        JSONArray jsonArr = iCollaborateService.getCollaborativeUsersColor(padID);

        return JSONResult.ok(jsonArr);
    }

    @PostMapping("/collaborate-send-message")
    @ResponseBody
    public JSONResult collaborateSendMSG(String padID, String message, String authorId) {
        log.info("call collaborateSendMSG!");

        log.info("chatgptID: "+ chatgptID);
        iCollaborateService.appendCollaborativeChatMessage(padID,message,chatgptID);

        return JSONResult.ok();
    }

    /**
     * need create a postmapping to send gpt answer to pad
     * each different role has an authorID, to retrieve the authorid to send messages
     */
//    @PostMapping("/collaborate-write-openai-message")
//    @ResponseBody
//    public JSONResult collaborateWriteGPTMSG(String padId, Long type) {
//        if (chatgptID == null || chatgptID.isEmpty()) {
//            chatgptID = iCollaborateService.collaborativeInit(url, apiKey);
//        }
//        if (type == 1) {
//
//        }
//
//    }

    /**
     * not use yet
     */
    @CrossOrigin
    @PostMapping("/collaborate-write-openai")
    @ResponseBody
    public JSONResult collaborateWriteOpenai(@RequestBody CollaborateChatgptRequest collabChatgptRequest){//,@RequestParam String padId,@RequestParam Long type){
    //public JSONResult collaborateWriteOpenai(String padId, String question, Long userId, String courseId, String essay, Long type) {

            //,String padId, Long type) {
//        if ("".equals(essay)) {
//            EssayVO essayVO = iEssayService.findLatestVersionByUserIdAndCourseId(userId, courseId);
//            log.info("hte essay is empty");
//            if (essayVO != null) {
//                essay = essayVO.getEssayContent();
//            }
//            else {
//                return JSONResult.errorMsg("system error, please try again later");
//            }
//
//        }
            int type = 0;
            log.info("essay: "+ collabChatgptRequest.getEssay());
            //log.info("type: "+ collabChatgptRequest.getType());
            log.info("padId: "+collabChatgptRequest.getPadId());
            //log.info("essay: "+essay);
            log.info("question: "+ collabChatgptRequest.getQuestion());
//            if (StrUtil.isEmpty(collabChatgptRequest.getEssay())) {
//                EssayVO essayVO = iEssayService.findLatestVersionByUserIdAndCourseId(collabChatgptRequest.getUserId(),
//                        collabChatgptRequest.getCourseId());
//                if (essayVO == null) {
//                    return JSONResult.errorMsg("cannot find essay in chatgpt");
//                } else {
//                    collabChatgptRequest.setEssay(essayVO.getEssayContent());
//                }
//            }

        String essay = collabChatgptRequest.getIncludeEssay() ? checkChatgptRequestEssay(collabChatgptRequest.getEssay(), collabChatgptRequest.getUserId(), collabChatgptRequest.getCourseId()) : "";
        collabChatgptRequest.setEssay(essay);
        ChatgptRequest chatgptRequest = MyBeanCopyUtils.copyBean(collabChatgptRequest, ChatgptRequest.class);
        //        String userQuestions, String chatgptRoleDescription, String questionId, String essay,
//                List<String> backgroundFileNameList, Long userId, String courseId,
//                String chatgptRole, List<Integer> chatgptParameters, String type, Integer roundNumber
        if (type == -1) {
            // 组内用户正常聊天，仅发送给gpt不获取结果
            //iUserChatgptLogService.getChatgptResponse(question, userId, essay, "");

            iUserChatgptLogService.getChatgptResponse(chatgptRequest);

        } else {
            UserChatgptLogVO result;

            log.info("@GPT getting response!");
            result = iUserChatgptLogService.getChatgptResponse(chatgptRequest);

            log.info(result.toString());
            return JSONResult.ok(result);
        }
        return JSONResult.ok();
    }

    // copy from HomeController
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

    private ExecutorService nonBlockingService; // = Executors.newCachedThreadPool();


    @GetMapping("/test-emitter")
    public SseEmitter testEmitter() {

        SseEmitter emitter = new SseEmitter();

        nonBlockingService.execute(() -> {
            try {
                for (int i = 0; i < 10; i++) {
//                    Thread.sleep(1000);
                    // 发送SSE到前端
                    emitter.send(i);
                    log.info("send" + i);
                }
                // 记得在所有数据都发送完毕之后关闭emitter
                emitter.complete();
            } catch (Exception e) {
//                emitter.completeWithError(e);
                log.info(e.getMessage());
            }
        });

        return emitter;
    }
    @CrossOrigin(origins = "*")
    @PostMapping("/api/hpt-flora-event")
    @ResponseBody
    public JSONResult testHypothesisCall(String padID) {
        log.info("event received");
        log.info("event received");
        return JSONResult.ok("hi,  hpt event list");
    }

    @PostMapping("/api/event")
    @ResponseBody
    public JSONResult testEvent(String padID) {
        log.info(padID);
        return JSONResult.ok("hi,  event list");
    }

    @GetMapping("/api/")
    @ResponseBody
    public JSONResult apiList() {
//        List<MdlQuizVO> quizdata = iMdlQuizAttemptsService.getQuizResponseAllUser("Activity 2", (long) 2);
//        log.info("quizdata: ", quizdata);
//        return JSONResult.ok(quizdata);
//        //List<MdlQuizVO> quizdata = iMdlQuizAttemptsService.
        List<MdlQuestionnaireResponseBaseResult> questionnaire_rep_single= iMdlQuestionnaireService.getSingleResponsesByQuestionnaireFuzzyName("test-questionnaire-conditional-branching-lin");
        List<MdlQuestionnaireResponseBaseResult> questionnaire_rep_bool = iMdlQuestionnaireService.getBoolResponsesByQuestionnaireFuzzyName("test-questionnaire-conditional-branching-lin");
        List<MdlQuestionnaireResponseBaseResult> questionnaire_rep_text = iMdlQuestionnaireService.getTextResponsesByQuestionnaireFuzzyName("test-questionnaire-conditional-branching-lin");

        log.info("questionnaire_rep_single: ", questionnaire_rep_single);
        log.info("questionnaire_rep_bool: ", questionnaire_rep_bool);

        return JSONResult.ok(questionnaire_rep_bool);
    }


    /**
     * 只针对 checkbox 多选题
     * @param courseId
     * @param questionnaireName
     * @param userId
     * @return
     */
   /* @GetMapping("/get-questionnaire-response")
    @ResponseBody
    public JSONResult getQuestionaireResponse(String courseId, String questionnaireName, Long userId) {

        log.info("courseId: " + courseId + ", QuestionnaireName: " + questionnaireName + ", userId: " + userId);

        String key2RespMap = courseId + "_" + questionnaireName;

        if (iGlobalCache.hasKey(key2RespMap)) {
            log.info(">>>>>>> getting questionnaire response from redis!");
            Map<Object, Object> responseMap = iGlobalCache.hmget(key2RespMap);

            Map<Long, List<MdlQuestionnaireResponseVO>> userResponsesMap = null;
            String userIdKey = String.valueOf(userId);

            if (responseMap.containsKey(userIdKey)) {
                // Cast the value to Map<Long, List<MdlQuestionnaireResponseVO>>
                userResponsesMap = (Map<Long, List<MdlQuestionnaireResponseVO>>) responseMap.get(userIdKey);
                log.info("userResponsesMap: " + userResponsesMap);

                // You can now return a specific response list if needed, for example:
                // If you want to return all responses for the user:
                return JSONResult.ok(userResponsesMap);

                // Or if you want to return responses for a specific responseId (if needed):
                // Long responseId = ...; // Obtain the desired responseId
                // List<MdlQuestionnaireResponseVO> specificUserResponses = userResponsesMap.get(responseId);
                // return JSONResult.ok(specificUserResponses);
            }

            return JSONResult.ok(Collections.emptyList()); // Return an empty list if no responses found
        } else {

            List<MdlQuestionnaireResponseMultipleResult> questionnaire_rep_multi = IMdlQuestionnaireService.getMultipleResponsesByQuestionnaireFuzzyName(questionnaireName);

            Map<Long, Map<Long, List<MdlQuestionnaireResponseVO>>> questionnaire_rep_map = new HashMap<>();

            for (MdlQuestionnaireResponseMultipleResult resp : questionnaire_rep_multi) {
                Long cur_userId = resp.getUserid();
                Long cur_responseId = resp.getResponseid();

                MdlQuestionnaireResponseVO qtn_respVO = new MdlQuestionnaireResponseVO();
                qtn_respVO.setQuestionnaireName(questionnaireName);
                qtn_respVO.setUserId(cur_userId);
                qtn_respVO.setQuestionPosition(resp.getQuestionPosition());
                qtn_respVO.setQuestiontype(resp.getQuestiontype());
                qtn_respVO.setQuestionName(resp.getQuestionName());
                qtn_respVO.setQuestionContent(resp.getQuestionContent());
                qtn_respVO.setQuestionContent(resp.getQuestionContent());
                qtn_respVO.setResult(resp.getResult());

                questionnaire_rep_map.putIfAbsent(cur_userId, new HashMap<>());

                // Check if the response ID exists for the current user
                questionnaire_rep_map.get(cur_userId).putIfAbsent(cur_responseId, new ArrayList<>());

                // Add the response VO to the user's response list
                questionnaire_rep_map.get(cur_userId).get(cur_responseId).add(qtn_respVO);

//                if (!questionnaire_rep_map.containsKey(cur_userId)) {
//                    questionnaire_rep_map.put(userId, new HashMap<>()); // Initialize with an empty list or whatever logic you need
//                }
//                if(!questionnaire_rep_map.get(cur_userId).containsKey(cur_responseId)){
//                    questionnaire_rep_map.get(cur_userId).put(cur_responseId,new ArrayList<>());
//                }
//                questionnaire_rep_map.get(cur_userId).get(cur_responseId).add(qtn_respVO);

            }

            Map<String, Object> newMap = new HashMap<>();

            for (Map.Entry<Long, Map<Long, List<MdlQuestionnaireResponseVO>>> userEntry : questionnaire_rep_map.entrySet()) {
                Long temp_userId = userEntry.getKey();
                Map<Long, List<MdlQuestionnaireResponseVO>> responseMap = userEntry.getValue();

                // Sort responses for each response ID
                for (Map.Entry<Long, List<MdlQuestionnaireResponseVO>> respEntry : responseMap.entrySet()) {
                    Long temp_respId = respEntry.getKey();
                    List<MdlQuestionnaireResponseVO> responses = respEntry.getValue();

                    // Sort using streams
                    List<MdlQuestionnaireResponseVO> sortedResponses = responses.stream()
                            .sorted(Comparator.comparingInt(MdlQuestionnaireResponseVO::getQuestionPosition))
                            .collect(Collectors.toList());

                    // Update the map with sorted responses
                    responseMap.put(temp_respId, sortedResponses);
                }

                // Convert Long key to String for the new map
                String newKey = String.valueOf(temp_userId);
                newMap.put(newKey, responseMap);
            }
            // Create a new map with the required type
            iGlobalCache.hmset(key2RespMap, newMap);
            log.info("questionnaire_rep_map: " + questionnaire_rep_map);
            log.info("newMap: " + newMap);
            log.info("GETTING getQuestionaireResponse from sql: " + questionnaire_rep_map.get(userId));
            return JSONResult.ok(questionnaire_rep_map.get(userId));
        }
    }*/

    /**
     * 通用获取questionnaire 所有问题的response
     * @param courseId
     * @param questionnaireName
     * @param userId
     * @return
     */
//    @GetMapping("/get-questionnaire-all-response")
//    @ResponseBody
//    public JSONResult getQuestionnaireAllResponse(Long courseId, String questionnaireName, Long userId) {
//
//        log.info("courseId: " + courseId + ", QuestionnaireName: " + questionnaireName + ", userId: " + userId);
//
//        String userQuestionnaireKey = userId + "_" + courseId + "_" + questionnaireName;
//        log.info("Getting questionnaire response -> userQuestionnaireKey:" + userQuestionnaireKey);
//
////        iGlobalCache.del(userQuestionnaireKey);
////        log.info("******Deleted questionnaire response -> userQuestionnaireKey:" + userQuestionnaireKey);
//
//        if (iGlobalCache.hasKey(userQuestionnaireKey)) {
//            log.info("******userQuestionnaireKey Exits!" + userQuestionnaireKey);
//
//            Map<Object, Object> userResponseDictionary = iGlobalCache.hmget(userQuestionnaireKey);
//            // if userId in the redis but no response, read database and save it to redis
//            if (userResponseDictionary == null || userResponseDictionary.isEmpty()) {
//                log.info("******userResponseDictionary.isEmpty()!");
//                log.info(userQuestionnaireKey + "has no response in redis!");
//                List<MdlQuestionnaireAllResponse> user_response_list = iMdlQuestionnaireService.getQuestionnaireUserResponse(questionnaireName, courseId, userId);
//                log.info("######user_response_list: " + user_response_list);
//                if (user_response_list == null || user_response_list.isEmpty()) {
//                    log.info(userId + " has no response for questionnaire " + questionnaireName + "in course " + courseId);
//                   // return JSONResult.ok(Collections.emptyList());
//                    return new JSONResult(200, "Never answered the qesutionnaire", Collections.emptyList());
//                } else {
//                    log.info("user_response_list: " + user_response_list);
//                    Map<Long, List<MdlQuestionnaireResponseCompeteVO>> questionnaire_rep_map = new HashMap<>();
//                    Map<Long, List<String>> qs_pair_byRespId = new HashMap<>();
//                    for (MdlQuestionnaireAllResponse resp : user_response_list) {
//                        Long curResponseId = resp.getResponseId();
//                        log.info("resp.getQuestionnaireName(): "+ resp.getQuestionnaireName());
//                        MdlQuestionnaireResponseCompeteVO questionnaireResponseVO = MyBeanCopyUtils.copyBean(resp, MdlQuestionnaireResponseCompeteVO.class);
//                        questionnaireResponseVO.setQuestionnaireName(resp.getQuestionnaireName());
//                        questionnaireResponseVO.setUserId(resp.getUserId());
//
//                        if (resp.getSelected()) {
//                            questionnaire_rep_map.putIfAbsent(curResponseId, new ArrayList<>());
//                            questionnaire_rep_map.get(curResponseId).add(questionnaireResponseVO);
//
//                            String qst_answer = resp.getQuestionName() + " -> " + resp.getChoiceContent();;
//                            qs_pair_byRespId.putIfAbsent(curResponseId, new ArrayList<>());
//                            qs_pair_byRespId.get(curResponseId).add(qst_answer);
////                            String qst_answer = resp.getQuestionName() + " -> " + resp.getChoiceContent();
////                            if (!resp.getDependency().equals("none")) {
////                                if (qs_pair_byRespId.get(curResponseId).contains(resp.getDependency())) {
////                                    questionnaire_rep_map.putIfAbsent(curResponseId, new ArrayList<>());
////                                    questionnaire_rep_map.get(curResponseId).add(questionnaireResponseVO);
////                                    qs_pair_byRespId.get(curResponseId).add(qst_answer);
////                                }
////                            } else {
////                                qs_pair_byRespId.putIfAbsent(curResponseId, new ArrayList<>());
////                                qs_pair_byRespId.get(curResponseId).add(qst_answer);
////                                questionnaire_rep_map.putIfAbsent(curResponseId, new ArrayList<>());
////                                questionnaire_rep_map.get(curResponseId).add(questionnaireResponseVO);
////                            }
//                        }
//                    }
//                    Map<String, Object> Map4StoreRedis = new HashMap<>();
//                    for (Map.Entry<Long, List<MdlQuestionnaireResponseCompeteVO>> userResponseEntry : questionnaire_rep_map.entrySet()) {
//                        Long temp_respId = userResponseEntry.getKey();
//                        List<MdlQuestionnaireResponseCompeteVO> responses = userResponseEntry.getValue();
//
//                        responses.removeIf(response ->
//                                !response.getDependency().equals("none") &&
//                                        !response.getDependency().isEmpty() &&
//                                        !qs_pair_byRespId.get(temp_respId).contains(response.getDependency())
//                        );
//
//
//                        // Sort using streams
//                        List<MdlQuestionnaireResponseCompeteVO> sortedResponses = responses.stream()
//                                .sorted(Comparator.comparingInt(MdlQuestionnaireResponseCompeteVO::getQuestionPosition))
//                                .collect(Collectors.toList());
//
//                        Map4StoreRedis.put(String.valueOf(temp_respId), sortedResponses);
//                    }
//                    iGlobalCache.hmset(userQuestionnaireKey, Map4StoreRedis, MyConstant.REDIS_EXPIRE_SECONDS);
//                    return JSONResult.ok(questionnaire_rep_map);
//                }
//            }
//            log.info("Retrieved user_response from redis by key "+userQuestionnaireKey + ": " + userResponseDictionary);
//            return JSONResult.ok(userResponseDictionary);
//        }
//        else {
//
//            List<MdlQuestionnaireAllResponse> user_response_list = iMdlQuestionnaireService.getQuestionnaireUserResponse(questionnaireName, courseId, userId);
//            log.info("MdlQuestionnaireAllResponse read from database: " + user_response_list);
//            if (user_response_list == null || user_response_list.isEmpty()) {
//                log.info(userId + " has no response for questionnaire " + questionnaireName + "in course " + courseId);
//                return new JSONResult(200, "Never answered the qesutionnaire", Collections.emptyList());
//            }
//            else {
//                Map<Long, List<MdlQuestionnaireResponseCompeteVO>> questionnaire_rep_map = new HashMap<>();
//                Map<Long, List<String>> qs_pair_byRespId = new HashMap<>();
//                for (MdlQuestionnaireAllResponse resp : user_response_list) {
//                    Long curResponseId = resp.getResponseId();
//                    MdlQuestionnaireResponseCompeteVO questionnaireResponseVO = MyBeanCopyUtils.copyBean(resp, MdlQuestionnaireResponseCompeteVO.class);
////                    questionnaireResponseVO.setQuestionnaireName(resp.getQuestionnaireName());
////                    questionnaireResponseVO.setUserId(resp.getUserId());
//
//                    if (resp.getSelected()) {
//
//                        questionnaire_rep_map.putIfAbsent(curResponseId, new ArrayList<>());
//                        questionnaire_rep_map.get(curResponseId).add(questionnaireResponseVO);
//
//                        String qst_answer = resp.getQuestionName() + " -> " + resp.getChoiceContent();
//                        qs_pair_byRespId.putIfAbsent(curResponseId, new ArrayList<>());
//                        qs_pair_byRespId.get(curResponseId).add(qst_answer);
////                        if (!resp.getDependency().equals("none")) {
////                            if (qs_pair_byRespId.get(curResponseId).contains(resp.getDependency())) {
////                                //questionnaire_rep_map.putIfAbsent(curResponseId, new ArrayList<>());
////                                questionnaire_rep_map.get(curResponseId).add(questionnaireResponseVO);
////                                qs_pair_byRespId.get(curResponseId).add(qst_answer);
////                                log.info("getDependencyis not none, questionnaireResponseVO is "+questionnaireResponseVO);
////                            }
////                        }
////                        else {
////                            qs_pair_byRespId.putIfAbsent(curResponseId, new ArrayList<>());
////                            qs_pair_byRespId.get(curResponseId).add(qst_answer);
////
////                            questionnaire_rep_map.putIfAbsent(curResponseId, new ArrayList<>());
////                            questionnaire_rep_map.get(curResponseId).add(questionnaireResponseVO);
////                        }
//                    }
//                }
//                log.info("questionnaire_rep_map after for loop read: "+ questionnaire_rep_map);
//                log.info("qs_pair_byRespId after read : "+qs_pair_byRespId);
//
//                Map<String, Object> Map4StoreRedis = new HashMap<>();
//                for (Map.Entry<Long, List<MdlQuestionnaireResponseCompeteVO>> userResponseEntry : questionnaire_rep_map.entrySet()) {
//                    Long temp_respId = userResponseEntry.getKey();
//                    List<MdlQuestionnaireResponseCompeteVO> responses = userResponseEntry.getValue();
//                    // Check if the dependency is not in qs_pair_byRespId.get(temp_respId)
//                    // Remove the response from the list
//                    responses.removeIf(response ->
//                            !response.getDependency().equals("none") &&
//                                    !response.getDependency().isEmpty() &&
//                                    !qs_pair_byRespId.get(temp_respId).contains(response.getDependency())
//                    );
//
//                    // Sort using streams
//                    List<MdlQuestionnaireResponseCompeteVO> sortedResponses = responses.stream()
//                            .sorted(Comparator.comparingInt(MdlQuestionnaireResponseCompeteVO::getQuestionPosition))
//                            .collect(Collectors.toList());
//
//                    Map4StoreRedis.put(String.valueOf(temp_respId), sortedResponses);
//                }
//                log.info("questionnaire_rep_map: " + questionnaire_rep_map);
//                iGlobalCache.hmset(userQuestionnaireKey, Map4StoreRedis, MyConstant.REDIS_EXPIRE_SECONDS);
//                return JSONResult.ok(questionnaire_rep_map);
//            }
//        }
//    }

}
