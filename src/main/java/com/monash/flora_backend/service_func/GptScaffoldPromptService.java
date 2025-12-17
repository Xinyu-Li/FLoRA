package com.monash.flora_backend.service_func;

import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.util.StrUtil;
import com.monash.flora_backend.config.cache.IGlobalCache;
import com.monash.flora_backend.constant.MyConstant;
import com.monash.flora_backend.controller.req.GptScaffoldRequest;
import com.monash.flora_backend.controller.vo.MdlFeedbackVO;
import com.monash.flora_backend.controller.vo.MdlQuizVO;
import com.monash.flora_backend.controller.vo.manage.NeedCheckSRLPromptVO;
import com.monash.flora_backend.controller.vo.manage.NeedCheckSubActionPromptVO;
import com.monash.flora_backend.controller.vo.manage.ThresholdPromptVO;
import com.monash.flora_backend.service.IUserChatgptLogService;
import com.monash.flora_backend.service.IUserStartTimeService;
import com.monash.flora_backend.service_moodle.IMdlFeedbackService;
import com.monash.flora_backend.service_moodle.IMdlQuizAttemptsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class GptScaffoldPromptService {
    private final IMdlFeedbackService iMdlFeedbackService;
    private final IMdlQuizAttemptsService iMdlQuizAttemptsService;
    private final IUserChatgptLogService iUserChatgptLogService;
    private final ActionAndProcessService actionAndProcessService;
    private final IGlobalCache iGlobalCache;
    private final IUserStartTimeService iUserStartTimeService;
//    Part 2.4 Knowledge of tactics (ISDIMU questionnaire result): (Mladen's version)

    public int[] maiCalculatorForHighEdu(List<MdlFeedbackVO> feedbackVOList) {
        int[] result = new int[2];
        for(MdlFeedbackVO feedbackVO: feedbackVOList) {
            Long item = feedbackVO.getItemId();
            Integer response = feedbackVO.getValue();


            Set<Long> categoryKnowledgeCognition = Set.of(
                    // flora engine
                    725L, 696L, 697L, 698L, 699L, 706L, 707L, 708L, 710L,
                    // cella lala - Spanish
                    225L, 208L, 209L, 210L, 211L, 218L, 219L, 220L, 221L,
                    // cella lala - English
                    290L, 273L, 274L, 275L, 276L, 283L, 284L, 285L, 287L,
                    // ar - Denmark
                    1039L, 1022L, 1023L, 1024L, 1025L, 1032L, 1033L, 1034L, 1036L,

                    // asia - Taiwan
                    18L, 1L, 2L, 3L, 4L, 11L, 12L, 13L, 15L,
                    // asia - HK
                    136L, 119L, 120L, 121L, 122L, 129L, 130L, 131L, 133L,
                    // asia - Macau
                    77L, 60L, 61L, 62L, 63L, 70L, 71L, 72L, 74L,
                    // beijing - high edu
                    1325L, 1308L, 1309L, 1310L, 1311L, 1312L, 1313L, 1314L,

                    // beijing - cella3
                    1403L, 1386L, 1387L, 1388L, 1389L, 1396L, 1397L, 1398L, 1400L
            );
            Set<Long> categoryRegulationCognition = Set.of(
                    //flora engine
                    700L, 701L, 702L, 703L, 704L, 705L, 709L, 711L, 712L,
                    // cella lala - Spanish
                    212L, 213L, 214L, 215L, 216L, 217L, 221L, 223L, 224L,
                    // cella lala - English
                    277L, 278L, 279L, 280L, 281L, 282L, 286L, 288L, 289L,
                    // ar - Denmark
                    1026L, 1027L, 1028L, 1029L, 1030L, 1031L, 1035L, 1037L, 1038L,

                    // asia - Taiwan
                    5L, 6L, 7L, 8L, 9L, 10L, 14L, 16L, 17L,
                    // asia - HK
                    123L, 124L, 125L, 126L, 127L, 128L, 132L, 134L, 135L,
                    // asia - Macau
                    64L, 65L, 66L, 67L, 68L, 69L, 73L, 75L, 76L,
                    // beijing - high edu
                    1315L, 1316L, 1317L, 1318L, 1319L, 1320L, 1321L, 1322L, 1323L, 1324L, 1326L,
                    // beijing - cella3
                    1390L, 1391L, 1392L, 1393L, 1394L, 1395L, 1399L, 1401L, 1402L

            );

            if (categoryKnowledgeCognition.contains(item)) {
                result[0] += response;
            }
            if (categoryRegulationCognition.contains(item)) {
                result[1] += response;
            }
            /*
            Long questionSlot = quizVO.getQuestionSlot();
            String selectedValue = quizVO.getSelectedValue();
            log.info("questionSlot = {}, selectedValue = {}, index = {}", questionSlot, selectedValue, index);
            if (index != questionSlot.intValue()) {
                index++;
                continue; //如果不等于，标识question slot 没有被回答
            }
            if (index <= 8) {
                result[0] += (Integer.parseInt(selectedValue) + 1);
            } else {
                result[1] += (Integer.parseInt(selectedValue) + 1);
            }*/
        }

        return result;
    }

//    public int[] maiCalculator(List<MdlFeedbackVO> feedbackVOList) {
    public int[] maiCalculator(List<MdlQuizVO> maiQuizVOList) {
        int[] result = new int[2];

//        for(MdlFeedbackVO feedbackVO: maiQuizVOList) {
        int index = 1;
        for(MdlQuizVO quizVO: maiQuizVOList) {
            Long questionSlot = quizVO.getQuestionSlot();
            String selectedValue = quizVO.getSelectedValue();
            log.info("questionSlot = {}, selectedValue = {}, index = {}", questionSlot, selectedValue, index);
            if (index != questionSlot.intValue()) {
                index++;
                continue; //如果不等于，标识question slot 没有被回答
            }

            //result[0] - categoryKnowledgeCognition
            //result[1] - categoryRegulationCognition
            if (index <= 5) { // 1-5
                result[0] += (Integer.parseInt(selectedValue) + 1);
            } else if (index <= 11) {
                result[1] += (Integer.parseInt(selectedValue) + 1);
            } else if (index <= 14) {
                result[0] += (Integer.parseInt(selectedValue) + 1);
            } else if (index <= 15) {
                result[1] += (Integer.parseInt(selectedValue) + 1);
            } else if (index <= 16) {
                result[0] += (Integer.parseInt(selectedValue) + 1);
            } else if (index <= 18) {
                result[1] += (Integer.parseInt(selectedValue) + 1);
            }


            index++;
            /* 使用Feedback 类型的旧版
            Long item = 0L; //feedbackVO.getItemId();
            Integer response = 0; // feedbackVO.getValue();


            Set<Long> categoryKnowledgeCognition = Set.of(
                    // flora engine
                    725L, 696L, 697L, 698L, 699L, 706L, 707L, 708L, 710L,
                    // cella lala - Spanish
                    225L, 208L, 209L, 210L, 211L, 218L, 219L, 220L, 221L,
                    // cella lala - English
                    290L, 273L, 274L, 275L, 276L, 283L, 284L, 285L, 287L,
                    // ar - Denmark
                    1039L, 1022L, 1023L, 1024L, 1025L, 1032L, 1033L, 1034L, 1036L,

                    // asia - Taiwan
                    18L, 1L, 2L, 3L, 4L, 11L, 12L, 13L, 15L,
                    // asia - HK
                    136L, 119L, 120L, 121L, 122L, 129L, 130L, 131L, 133L,
                    // asia - Macau
                    77L, 60L, 61L, 62L, 63L, 70L, 71L, 72L, 74L,
                    // beijing - high edu
                    1325L, 1308L, 1309L, 1310L, 1311L, 1312L, 1313L, 1314L,

                    // beijing - cella3
                    1403L, 1386L, 1387L, 1388L, 1389L, 1396L, 1397L, 1398L, 1400L
            );
            Set<Long> categoryRegulationCognition = Set.of(
                    //flora engine
                    700L, 701L, 702L, 703L, 704L, 705L, 709L, 711L, 712L,
                    // cella lala - Spanish
                    212L, 213L, 214L, 215L, 216L, 217L, 221L, 223L, 224L,
                    // cella lala - English
                    277L, 278L, 279L, 280L, 281L, 282L, 286L, 288L, 289L,
                    // ar - Denmark
                    1026L, 1027L, 1028L, 1029L, 1030L, 1031L, 1035L, 1037L, 1038L,

                    // asia - Taiwan
                    5L, 6L, 7L, 8L, 9L, 10L, 14L, 16L, 17L,
                    // asia - HK
                    123L, 124L, 125L, 126L, 127L, 128L, 132L, 134L, 135L,
                    // asia - Macau
                    64L, 65L, 66L, 67L, 68L, 69L, 73L, 75L, 76L,
                    // beijing - high edu
                    1315L, 1316L, 1317L, 1318L, 1319L, 1320L, 1321L, 1322L, 1323L, 1324L, 1326L,
                    // beijing - cella3
                    1390L, 1391L, 1392L, 1393L, 1394L, 1395L, 1399L, 1401L, 1402L

            );

            if (categoryKnowledgeCognition.contains(item)) {
                result[0] += response;
            }
            if (categoryRegulationCognition.contains(item)) {
                result[1] += response;
            }*/

        }

        return result;
    }
    public int iSDIMUCalculator(List<MdlFeedbackVO> feedbackVOList) {
        int total = 0;
        for(MdlFeedbackVO feedbackVO: feedbackVOList){
            Long item = feedbackVO.getItemId();
            Integer response = feedbackVO.getValue();
            // ISDIMU 计算
            if (Set.of(2L, 5L, 14L, 17L, 26L, 30L, 35L, 38L).contains(item)) {
                total += (7 - response);
            }
        }
        return total;
    }

    private String generateLearningConditionPrompt(List<ThresholdPromptVO> thresholdPromptVOList, Integer gptScaffoldNumber, Double score, Map<String, NeedCheckSRLPromptVO> srlProcessBackupPromptMap, List<NeedCheckSRLPromptVO> needCheckSRLPromptList) {
        String defaultPrompt = "";
        StringBuilder adaptivePrompt = new StringBuilder();
        //跳过不检查 第一条 default threshold 为0 的情况，在最后检测
        for (int i = 1; i < thresholdPromptVOList.size(); i++) {
            ThresholdPromptVO promptVO = thresholdPromptVOList.get(i);
            int threshold = promptVO.getThreshold();
            String prompt = promptVO.getPrompt();

            String[] conditionRelatedSrlProcesses ;
            if (!CollUtil.isEmpty(promptVO.getScaffoldSrlProcess())) {
                String conditionRelatedSrlProcessStr = promptVO.getScaffoldSrlProcess().get(gptScaffoldNumber - 1); // get predefined srl processes for each scaffold in the configuration file
                conditionRelatedSrlProcesses = conditionRelatedSrlProcessStr.split(";;;"); // 此处SRL process 可能是 CMTR2;;;CMTR1 或者 CMTR2;;;CMTR2>CMTR1;;;OR2
            } else {
                conditionRelatedSrlProcesses = new String[]{};
            }

            if (score < threshold) {
                defaultPrompt = prompt;
                adaptivePrompt.append(defaultPrompt).append(" ");
                // when grades satisfy the requirement
                for (String conditionRelatedSrlProcess : conditionRelatedSrlProcesses) {
                    NeedCheckSRLPromptVO tempVO = srlProcessBackupPromptMap.get(gptScaffoldNumber + "-" + conditionRelatedSrlProcess); // 需要用gptScaffoldNumber 来拼接key
                    if (tempVO != null) { // 必须是同一个scaffold number
                        needCheckSRLPromptList.add(tempVO); // 所有和SRL process 相关的prompt 都放到 needCheckSRLPromptList 中，在最后统一进行prompt 检测与合并
                    }
                }
                break;
            }
        }
        if (defaultPrompt.isEmpty()) {
            adaptivePrompt.append(thresholdPromptVOList.get(0).getPrompt()).append(" ");
        }
        return adaptivePrompt.toString();
    }

    public String generatePromptBasedOnLearningConditionAndSRLProcess(GptScaffoldRequest gptScaffoldRequest){

        List<NeedCheckSRLPromptVO> srlProcessBackupPromptList = gptScaffoldRequest.getSrlProcessBackupPromptList(); // 存储所有SRL process 相关的 prompts
        String testISDIMUName = gptScaffoldRequest.getTestISDIMUName();
        String testMAIName = gptScaffoldRequest.getTestMAIName();
        String testMAICourseId = gptScaffoldRequest.getTestMAICourseId();
        String preTestName = gptScaffoldRequest.getPreTestName();
        String hasTakePreviousStudyTestName = gptScaffoldRequest.getHasTakePreviousStudyTestName();
        String preTestCourseId = gptScaffoldRequest.getPreTestCourseId();

        String testISDIMUCourseId = gptScaffoldRequest.getTestISDIMUCourseId();
        String hasTakePreviousStudyTestNameCourseId = gptScaffoldRequest.getHasTakePreviousStudyTestNameCourseId();
        String essay = gptScaffoldRequest.getEssay();
        List<NeedCheckSubActionPromptVO> subActionAndPromptList = gptScaffoldRequest.getSubActionAndPromptList();
        List<String> savePlannerSelectedIndexPromptList = gptScaffoldRequest.getSavePlannerSelectedIndexPromptList();
        String gptScaffoldPromptTemplate = gptScaffoldRequest.getGptScaffoldPromptTemplate(); // ;;;SRL_PROCESS_NUMBER;;;      ;;;ADAPTIVE_PROMPT;;;   ;;;SRL_PROCESS_PROMPT;;;   replace to corresponding text
        String userTakePreviousStudyPrompt = gptScaffoldRequest.getUserTakePreviousStudyPrompt();
        String srlModel = gptScaffoldRequest.getSrlModel();

        log.info("-----------------------------getGptScaffoldPromptVO:" + gptScaffoldRequest);

        Integer beginMinute = gptScaffoldRequest.getGptScaffoldPromptVO().getBeginMinute();
        Integer endMinute = gptScaffoldRequest.getGptScaffoldPromptVO().getEndMinute();
        List<ThresholdPromptVO> pretestGradesPrompt = gptScaffoldRequest.getPretestGradesPrompt();
        List<ThresholdPromptVO> isdimuScorePrompt = gptScaffoldRequest.getIsdimuScorePrompt();
        List<ThresholdPromptVO> maiScoreKnowledgeCognitionPrompt = gptScaffoldRequest.getMaiScoreKnowledgeCognitionPrompt();

        List<ThresholdPromptVO> maiScoreRegulationCognitionPrompt = gptScaffoldRequest.getMaiScoreRegulationCognitionPrompt();
        Integer gptScaffoldNumber = gptScaffoldRequest.getGptScaffoldNumber();
        String courseId = gptScaffoldRequest.getCourseId();
        Long userId = gptScaffoldRequest.getUserId();
        Boolean hasDefaultScaffoldsPrompt = gptScaffoldRequest.getHasDefaultScaffoldsPrompt();
        String needCheckCurrentScaffoldSrlProcess = gptScaffoldRequest.getGptScaffoldPromptVO().getCheckSrlProcess();


        log.info("srlProcessBackupPromptList----------------------------");
        srlProcessBackupPromptList.forEach(System.out::println);
        log.info("srlProcessBackupPromptList----------------------------end");
        // key 的格式为 1-CMTR1, 表示第几个scaffold number的SRL process
//        Map<String, NeedCheckSRLPromptVO> srlProcessBackupPromptMap = srlProcessBackupPromptList.stream().collect(Collectors.toMap(
//                item -> !StrUtil.isEmpty(item.getSrlProcessFreqComparison()) ? item.getScaffoldNumber() + "-" + item.getSrlProcessFreqComparison() : item.getScaffoldNumber() + "-" + item.getSrlProcess(), // keyExtractor：判断优先使用 srlProcessFreqComparison，否则使用 srlProcess
//                item -> item, // valueExtractor：对应的 NeedCheckSRLPromptVO 对象直接作为 value
//                (existing, replacement) -> replacement // 处理 key 冲突的操作（这里选择直接覆盖，如果业务逻辑需要，可以改为抛出异常或其他处理方式）
//        )); // 存储所有SRL process 相关的 prompts

        Map<String, NeedCheckSRLPromptVO> srlProcessBackupPromptMap = srlProcessBackupPromptList.stream().collect(
                Collectors.toMap(item -> item.getScaffoldNumber() + "-" + item.getSrlProcess(), item -> item)); // 存储所有SRL process 相关的 prompts
        List<NeedCheckSRLPromptVO> needCheckSRLPromptList = new ArrayList<>();




//        StringBuilder gptCriteriaPrompt = new StringBuilder();
        StringBuilder adaptivePrompt = new StringBuilder();
        StringBuilder srlProcessPrompt = new StringBuilder();
        if (beginMinute == 0 && endMinute == 0) {
            log.warn("gpt scaffold begin and end minute both 0");
            return ""; //如果开始和结束都是0，则不需要继续
        }

        log.info("start generatePromptBasedOnPreTestAndSubActionAndSRLProcess------scaffold order:{}", gptScaffoldNumber);

        List<String> srlProcessAppearList = actionAndProcessService.labelTimeRangeProcessLabelPatterns(userId, courseId, srlModel, beginMinute, endMinute); // process data and get SRL process


//        Map<String, Integer> srlProcessAppearMap = new HashMap<>();// count
//        for (String s : srlProcessAppearList) {
//            if (srlProcessAppearMap.containsKey(s)) {
//                srlProcessAppearMap.put(s, srlProcessAppearMap.get(s) + 1);
//            } else {
//                srlProcessAppearMap.put(s, 1);
//            }
//        }
        //                                       ----------------------------------------------      //使用字符串本身作为键  // 每个字符串初始次数为1  // 如果遇到相同的键，则将其次数求和
        Map<String, Integer> srlProcessAppearMap = srlProcessAppearList.stream().collect(Collectors.toMap(Function.identity(), value -> 1, Integer::sum));

        /* 实时处理替代了这一块的程序，不需要在发送copes check
        if (srlModel.equals("copes")) {
            log.info("request copes sentences classification");
            log.info("essay:{}, classifySentenceBackgroundFileNameList: {}", essay, classifySentenceBackgroundFileNameList);
            Map<String, Integer> classifySentence = iUserChatgptLogService.getCopesClassifySentence(essay, classifySentenceBackgroundFileNameList, userId, courseId, iUserStartTimeService.getTaskStartTimeByUserIdAndCourseId(userId, courseId), beginMinute, endMinute);
            log.info("copes sentences classification result--------{}", classifySentence.toString());
            srlProcessAppearMap.putAll(classifySentence);
        }*/
//        Integer numOfOR2 = copesClassifySentence.get("OR2");
        log.info("srlProcessAppearList----------------------------" + srlProcessAppearList + "---------srlProcessAppearMap:" + srlProcessAppearMap);
        String subActionExistKey = MyConstant.REDIS_ACTION_EXIST_SET + userId + "_" + courseId;

        String plannerSelectIndexKey = MyConstant.REDIS_PLANNER_SELECT_INDEX + userId + "_" + courseId;
        int plannerSelectIndex;
        if (iGlobalCache.hasKey(plannerSelectIndexKey)) {
            plannerSelectIndex = Integer.parseInt(iGlobalCache.get(plannerSelectIndexKey));
        } else {
            plannerSelectIndex = 0; // 没有保存plan的话，是0
        }

        if (gptScaffoldPromptTemplate.contains(";;;PRE_TEST_SCORE;;;")) {
            // get test about your self
            MdlQuizVO userGrades = iMdlQuizAttemptsService.findQuizGradeByUserIdAndCourseIdAndQuizName(preTestName, Long.valueOf(preTestCourseId), userId);
            if (userGrades != null && userGrades.getGrade() != null) {
                adaptivePrompt.append(generateLearningConditionPrompt(pretestGradesPrompt, gptScaffoldNumber, userGrades.getGrade(), srlProcessBackupPromptMap, needCheckSRLPromptList));
            } else {
                if (hasDefaultScaffoldsPrompt) {
                    adaptivePrompt.append("no Domain Knowledge score");
                }
            }
        }

        if (gptScaffoldPromptTemplate.contains(";;;ADAPTIVE_PROMPT;;;")) {
//            adaptivePrompt.append("Note the following learning conditions for this student: ");

            // TODO 将redis 的数据从Set 变成Map 就可以统计每个action的个数
            // 根据action 的发生 来判断是否添加 prompt
            subActionAndPromptList.forEach(subActionAndPrompt -> {
                String subAction = subActionAndPrompt.getSubAction();
                Set<String> strings = iGlobalCache.sGet(subActionExistKey);
                log.info("check subaction and prompt:" + subAction + ":" + iGlobalCache.sHasKey(subActionExistKey, subAction) + "------------------" + strings);
                if (iGlobalCache.sHasKey(subActionExistKey, subAction)) { //判断condition中的 subAction 是否发生 (比如timer），这里的方法是用iGlobalCache缓存记录所有已经发生的subAction，然后这里拿某个条件的subAction（比如timer）进行比对
                    if (subAction.equals("SAVE_PLANNER")) {  // config save planner prompt时候需要 有 SAVE_PLANNER general 和 select index
                        //SAVE_PLANNER    SAVE_PLANNER_SELECT_INDEX_1   SAVE_PLANNER_SELECT_INDEX_2   SAVE_PLANNER_SELECT_INDEX_3 SAVE_PLANNER_SELECT_INDEX_4
//                    gptCriteriaPrompt.append(subActionAndPromptMap.get("SAVE_PLANNER_SELECT_INDEX_" + plannerSelectIndex));
                        adaptivePrompt.append(savePlannerSelectedIndexPromptList.get(plannerSelectIndex)).append(" ");
                    } else {
                        adaptivePrompt.append(subActionAndPrompt.getExistPrompt()).append(" "); // 如果遍历的action发生了，则get发生了的prompt，并拼接到adaptivePrompt中
                    }
                } else {
                    adaptivePrompt.append(subActionAndPrompt.getNotExistPrompt()).append(" ");   //如果某个subaction 未发生，则get未发生的prompt，并拼接到adaptivePrompt中
                }
            });

            //2.4 MAI
//            List<MdlFeedbackVO> maiFeedbackVOList = iMdlFeedbackService.findMdlFeedbackVOByFeedbackNameAndCourseIdAndUserId(testMAIName, Long.valueOf(testMAICourseId), userId);
            // 原本feedback的选择value 是从1 开始，1就代表选择第一项
            // 现在使用quiz之后的选择value是从0 开始，0代表选择第一项
            List maiVOList;
//            int[] maiResult = maiCalculator(maiFeedbackVOList);
            log.info("testMAIName: {}", testMAIName);
            int[] maiResult;
            if (testMAIName.equals("任务3：反思你的学习-highedu")) {
                maiVOList = iMdlFeedbackService.findMdlFeedbackVOByFeedbackNameAndCourseIdAndUserId(testMAIName, Long.valueOf(testMAICourseId), userId);
                maiResult = maiCalculatorForHighEdu(maiVOList);
            } else {
                maiVOList = iMdlQuizAttemptsService.getQuizResponseByUserIdAndCourseIdAndQuizNameSimplified(testMAIName, Long.valueOf(testMAICourseId), userId);
                maiResult = maiCalculator(maiVOList);
            }


            log.info("mai category knowledge Result----------------:" + maiResult[0] + "category regulation Result-------" + maiResult[1]);

//            if (!CollUtil.isEmpty(maiFeedbackVOList)) {
            if (!CollUtil.isEmpty(maiVOList)) {
//                adaptivePrompt.append("----[[KnowledgeCognition]]-----");
//                maiScoreKnowledgeCognitionPrompt.forEach(s-> adaptivePrompt.append(s.toString()));
//                adaptivePrompt.append("===============");
                adaptivePrompt.append(generateLearningConditionPrompt(maiScoreKnowledgeCognitionPrompt, gptScaffoldNumber, (double)maiResult[0], srlProcessBackupPromptMap, needCheckSRLPromptList));
//                adaptivePrompt.append("-----[[RegulationCognition]]----");
//                maiScoreRegulationCognitionPrompt.forEach(s-> adaptivePrompt.append(s.toString()));
//                adaptivePrompt.append("===============");
                adaptivePrompt.append(generateLearningConditionPrompt(maiScoreRegulationCognitionPrompt, gptScaffoldNumber, (double)maiResult[1], srlProcessBackupPromptMap, needCheckSRLPromptList));
//                adaptivePrompt.append("-----end----");
            }


            //2.4   ISDIMU / MAI
            /* ISDIMU 暂时不用
            List<MdlFeedbackVO> mdlFeedbackVOList = iMdlFeedbackService.findMdlFeedbackVOByFeedbackNameAndCourseIdAndUserId(testISDIMUName, Long.valueOf(testISDIMUCourseId), userId);

            int iSDIMUScore = iSDIMUCalculator(mdlFeedbackVOList);
            if (!CollUtil.isEmpty(mdlFeedbackVOList)) {
                adaptivePrompt.append(generateLearningConditionPrompt(isdimuScorePrompt, gptScaffoldNumber, (double) iSDIMUScore, srlProcessBackupPromptMap, needCheckSRLPromptList));
            }*/

            //2.5  get user take previous study or not, this commonly define in pretest
            MdlQuizVO userTakePreviousStudy = iMdlQuizAttemptsService.findUserTakePreviousStudy(hasTakePreviousStudyTestName, Long.valueOf(hasTakePreviousStudyTestNameCourseId), userId);
            if (userTakePreviousStudy != null) {
                adaptivePrompt.append(userTakePreviousStudyPrompt).append(" ");
            }
            log.info("userTakePreviousStudy: " + (userTakePreviousStudy == null));


            //2.6  get test about your self
            MdlQuizVO userGrades = iMdlQuizAttemptsService.findQuizGradeByUserIdAndCourseIdAndQuizName(preTestName, Long.valueOf(preTestCourseId), userId);

            if (userGrades != null && userGrades.getGrade() != null) {
                log.info("userGrades-----------:" + userGrades.getGrade());
                adaptivePrompt.append(generateLearningConditionPrompt(pretestGradesPrompt, gptScaffoldNumber, userGrades.getGrade(), srlProcessBackupPromptMap, needCheckSRLPromptList));
            } else {
                log.info("userGrades is null-----------");
                if (hasDefaultScaffoldsPrompt) {
                    adaptivePrompt.append("no Domain Knowledge score");
                }
            }

            //TODO 在此处可以添加特殊行为的动态prompt

        }

        // 如果getCheckSrlProcess() 返回了空，则split之后得到空的 list []
        String[] needCheckCurrentScaffoldSrlProcessString = needCheckCurrentScaffoldSrlProcess.split(";;;");
        // 将每个scaffold 指定要check的 SRL process 加入 list中
        for (String temp : needCheckCurrentScaffoldSrlProcessString) {
            String key = gptScaffoldNumber + "-" + temp;
            NeedCheckSRLPromptVO tempVO = null;
            if (!srlProcessBackupPromptMap.containsKey(key)) {
                key = "0-" + temp; // 默认情况下的 key
            }
            tempVO = srlProcessBackupPromptMap.get(key);

            if (tempVO != null) {
                needCheckSRLPromptList.add(tempVO);
            }
        }


        //前端根据需要的scaffold number，发送指定内容到后端，所以后端不需要再判断是第几个scaffold
        for (NeedCheckSRLPromptVO needCheckSRLPrompt : needCheckSRLPromptList) {
            log.info("srl process check ----------needCheckSRLPrompt:" + needCheckSRLPrompt);
            String srlProcessLabel = needCheckSRLPrompt.getSrlProcess();
            if (srlProcessLabel.contains("->")) {
                String[] srlProcessLabelArray = srlProcessLabel.split("->");
                String srlLabel1 = srlProcessLabelArray[0];
                String srlLabel2 = srlProcessLabelArray[1];
                Integer label1AppearTimes = srlProcessAppearMap.getOrDefault(srlLabel1, 0);
                Integer label2AppearTimes = srlProcessAppearMap.getOrDefault(srlLabel2, 0);

                if (label1AppearTimes > 0) {
                    if (label2AppearTimes > 0) {
                        srlProcessPrompt.append(""); // CSTR2有 -- CMTC1有 -- 啥也不给
                    } else { // CSTR2有 -- CMTC1没有 -- 给CMTC1
                        srlProcessPrompt.append(needCheckSRLPrompt.getExistPrompt()).append(" ");
                    }
                } else { //CSTR2没有 -- 直接给CSTR2
                    srlProcessPrompt.append(needCheckSRLPrompt.getNotExistPrompt()).append(" ");
                }
            } else if (srlProcessLabel.contains(">") || srlProcessLabel.contains("<")) { // 这种情况表示需要对比SRL 出现的频次
                String[] srlProcessLabelArray = srlProcessLabel.contains(">") ? srlProcessLabel.split(">") : srlProcessLabel.split("<");
                String srlLabel1 = srlProcessLabelArray[0];
                String srlLabel2 = srlProcessLabelArray[1];
                Integer label1AppearTimes = srlProcessAppearMap.getOrDefault(srlLabel1, 0);
                Integer label2AppearTimes = srlProcessAppearMap.getOrDefault(srlLabel2, 0);
                //用来对比两个SRL process出现的频次，都是用第一个label 去比第二个 例如 LCR2>LCF2, check freq(LCR2) > freq(LCF2) or not.
                srlProcessPrompt.append(label1AppearTimes > label2AppearTimes ? needCheckSRLPrompt.getAppearOverOther() : needCheckSRLPrompt.getAppearLessThanOther()).append(" ");
            } else if (srlProcessLabel.contains("/")) { //标识会出现有或关系的SRL process
                String[] srlProcessLabelArray = srlProcessLabel.split("/");
                String srlLabel1 = srlProcessLabelArray[0];
                String srlLabel2 = srlProcessLabelArray[1];
                Integer label1AppearTimes = srlProcessAppearMap.getOrDefault(srlLabel1, 0);
                Integer label2AppearTimes = srlProcessAppearMap.getOrDefault(srlLabel2, 0);
                Integer appearTimes = label1AppearTimes + label2AppearTimes;

                checkThreshold(needCheckSRLPrompt, appearTimes, srlProcessPrompt);
            } else if (srlProcessLabel.contains("&")) { //CSTR2&CMTC1
                String[] srlProcessLabelArray = srlProcessLabel.split("&");

                String srlLabel1 = srlProcessLabelArray[0];
                String srlLabel2 = srlProcessLabelArray[1];
                Integer label1AppearTimes = srlProcessAppearMap.getOrDefault(srlLabel1, 0);
                Integer label2AppearTimes = srlProcessAppearMap.getOrDefault(srlLabel2, 0);

                if (label1AppearTimes == 0 && label2AppearTimes == 0) { // 都不存在
                    srlProcessPrompt.append(needCheckSRLPrompt.getNotExistPrompt()).append(" ");
                }
//                else if (label1AppearTimes != 0 && label2AppearTimes != 0) {
//                    srlProcessPrompt.append(" ");
//                }
                else {
                    if (label1AppearTimes < 5) { // support CSTR2
                        srlProcessPrompt.append(needCheckSRLPrompt.getAppearLessThanOther()).append(" ");
                    } else {
                        srlProcessPrompt.append(" ");
                    }
                    if (label2AppearTimes < 2) { // support CMTC1
                        srlProcessPrompt.append(needCheckSRLPrompt.getAppearLessThanEqualThresholdPrompt()).append(" ");
                    }

                }

            } else {
                Integer appearTimes = srlProcessAppearMap.getOrDefault(srlProcessLabel, 0); //Map 类型会自动将数值太小的Long 类型 存储为Integer 类型，所以需要加一个转换在这里
                checkThreshold(needCheckSRLPrompt, appearTimes, srlProcessPrompt);
            }
        }

        log.info("before trim srlProcessPrompt:{}----end", srlProcessPrompt);
        log.info("before trim adaptivePrompt:{}----end", adaptivePrompt);
        String trimedSrlProcessPrompt = StrUtil.trim(srlProcessPrompt);
        String trimedAdaptivePrompt = StrUtil.trim(adaptivePrompt);
        log.info("after trim srlProcessPrompt:{}----end", trimedSrlProcessPrompt);
        log.info("after trim adaptivePrompt:{}----end", trimedAdaptivePrompt);
        log.info("adaptive prompt empty?:-----------------------------------{}", StrUtil.isEmpty(trimedAdaptivePrompt));
//        log.info("gptScaffoldPromptTemplate:----------------" + gptScaffoldPromptTemplate);
        log.info("srlprocessprompt empty?:-------------------------{}", StrUtil.isEmpty(trimedSrlProcessPrompt));
//        assert !StrUtil.isEmpty(gptScaffoldPromptTemplate);

        //当检测 到的所有 SRL process 是空，并且 没有设置 DefaultScaffolds
        if (StrUtil.isEmpty(trimedSrlProcessPrompt)) {
            if (hasDefaultScaffoldsPrompt) {
                trimedSrlProcessPrompt = "No enacted process";
            } else {
                return "";
            }
        }

        gptScaffoldPromptTemplate = gptScaffoldPromptTemplate.replace(";;;SCAFFOLD_NUMBER;;;", "phase " + gptScaffoldNumber);
        gptScaffoldPromptTemplate = gptScaffoldPromptTemplate.replace(";;;ADAPTIVE_PROMPT;;;", trimedAdaptivePrompt);
        gptScaffoldPromptTemplate = gptScaffoldPromptTemplate.replace(";;;PRE_TEST_SCORE;;;", trimedAdaptivePrompt);
        gptScaffoldPromptTemplate = gptScaffoldPromptTemplate.replace(";;;SRL_PROCESS_PROMPT;;;", trimedSrlProcessPrompt);

        return gptScaffoldPromptTemplate;
    }

    public void checkThreshold(NeedCheckSRLPromptVO needCheckSRLPrompt, Integer appearTimes, StringBuilder srlProcessPrompt) {
        int threshold = needCheckSRLPrompt.getThreshold();
        if (threshold == 0) { // only check exist or not exist
            String temp = appearTimes == 0 ? needCheckSRLPrompt.getNotExistPrompt() : needCheckSRLPrompt.getExistPrompt().replace(";;;SRL_PROCESS_NUMBER;;;", String.valueOf(appearTimes));
            if (!StrUtil.isEmpty(temp.trim())) { // 如果非空 再append
                srlProcessPrompt.append(temp).append(";");
            }
        } else if (threshold == -1) { // check exist or not exist and count number, prompt will show the SRL process frequency and exist/no exist
            String temp = "";
            if (appearTimes == 0) {
                temp = needCheckSRLPrompt.getNotExistPrompt();
            } else if (appearTimes == 1) {
                temp = needCheckSRLPrompt.getExistPrompt();
            } else {
                temp = needCheckSRLPrompt.getExistPrompt() + " freq " + appearTimes;
            }
            if (!StrUtil.isEmpty(temp.trim())) {
                srlProcessPrompt.append(temp).append(";");
            }
        } else {//检测出现频次和 threshold 对比
            String temp = appearTimes <= threshold ? needCheckSRLPrompt.getAppearLessThanEqualThresholdPrompt().replace(";;;SRL_PROCESS_NUMBER;;;", String.valueOf(appearTimes)) : needCheckSRLPrompt.getAppearOverThresholdPrompt().replace(";;;SRL_PROCESS_NUMBER;;;", String.valueOf(appearTimes));
            if (!StrUtil.isEmpty(temp.trim())) {
                srlProcessPrompt.append(temp).append(";");
            }
        }
    }
}

