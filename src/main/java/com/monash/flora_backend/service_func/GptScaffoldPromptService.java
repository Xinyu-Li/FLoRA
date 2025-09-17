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
import com.monash.flora_backend.service_moodle.IMdlQuizGradesService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class GptScaffoldPromptService {
    private final IMdlFeedbackService iMdlFeedbackService;
    private final IMdlQuizAttemptsService iMdlQuizAttemptsService;
    private final IMdlQuizGradesService iMdlQuizGradesService;
    private final IUserChatgptLogService iUserChatgptLogService;
    private final ActionAndProcessService actionAndProcessService;
    private final IGlobalCache iGlobalCache;
    private final IUserStartTimeService iUserStartTimeService;
//    Part 2.4 Knowledge of tactics (ISDIMU questionnaire result): (Mladen's version)

    public int iSDIMUCalculator(List<MdlFeedbackVO> feedbackVOList){
        int total = 0;
        for(MdlFeedbackVO feedbackVO: feedbackVOList){
            Long item = feedbackVO.getItemId();
            Integer response = feedbackVO.getValue();
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

    public String generatePromptBasedOnLearningConditionAndSRLProcess(GptScaffoldRequest gptScaffoldRequest) {

        List<NeedCheckSRLPromptVO> srlProcessBackupPromptList = gptScaffoldRequest.getSrlProcessBackupPromptList(); // 存储所有SRL process 相关的 prompts
        // key 的格式为 1-CMTR1, 表示第几个scaffold number的SRL process
//        Map<String, NeedCheckSRLPromptVO> srlProcessBackupPromptMap = srlProcessBackupPromptList.stream().collect(Collectors.toMap(
//                item -> !StrUtil.isEmpty(item.getSrlProcessFreqComparison()) ? item.getScaffoldNumber() + "-" + item.getSrlProcessFreqComparison() : item.getScaffoldNumber() + "-" + item.getSrlProcess(), // keyExtractor：判断优先使用 srlProcessFreqComparison，否则使用 srlProcess
//                item -> item, // valueExtractor：对应的 NeedCheckSRLPromptVO 对象直接作为 value
//                (existing, replacement) -> replacement // 处理 key 冲突的操作（这里选择直接覆盖，如果业务逻辑需要，可以改为抛出异常或其他处理方式）
//        )); // 存储所有SRL process 相关的 prompts

        Map<String, NeedCheckSRLPromptVO> srlProcessBackupPromptMap = srlProcessBackupPromptList.stream().collect(
                Collectors.toMap(item -> item.getScaffoldNumber() + "-" + item.getSrlProcess(), item -> item)); // 存储所有SRL process 相关的 prompts
        List<NeedCheckSRLPromptVO> needCheckSRLPromptList = new ArrayList<>();


        String testISDIMUName = gptScaffoldRequest.getTestISDIMUName();
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
        Integer beginMinute = gptScaffoldRequest.getGptScaffoldPromptVO().getBeginMinute();
        Integer endMinute = gptScaffoldRequest.getGptScaffoldPromptVO().getEndMinute();
        List<String> classifySentenceBackgroundFileNameList = gptScaffoldRequest.getClassifySentenceBackgroundFileNameList();

        List<ThresholdPromptVO> pretestGradesPrompt = gptScaffoldRequest.getPretestGradesPrompt();
        List<ThresholdPromptVO> isdimuScorePrompt = gptScaffoldRequest.getIsdimuScorePrompt();
        Integer gptScaffoldNumber = gptScaffoldRequest.getGptScaffoldNumber();

        String courseId = gptScaffoldRequest.getCourseId();
        Long userId = gptScaffoldRequest.getUserId();


//        StringBuilder gptCriteriaPrompt = new StringBuilder();
        StringBuilder adaptivePrompt = new StringBuilder();
        StringBuilder srlProcessPrompt = new StringBuilder();
        if (beginMinute == 0 && endMinute == 0) {
            log.warn("gpt scaffold begin and end minute both 0");
            return ""; //如果开始和结束都是0，则不需要继续
        }

        log.info("start generatePromptBasedOnPreTestAndSubActionAndSRLProcess------scaffold order:{}", gptScaffoldNumber);

        List<String> srlProcessAppearList = actionAndProcessService.labelTimeRangeProcessLabelPatterns(userId, courseId, srlModel, beginMinute, endMinute); // process data and get SRL process


        Map<String, Integer> srlProcessAppearMap = new HashMap<>();// count
        for (String s : srlProcessAppearList) {
            if (srlProcessAppearMap.containsKey(s)) {
                srlProcessAppearMap.put(s, srlProcessAppearMap.get(s) + 1);
            } else {
                srlProcessAppearMap.put(s, 1);
            }
        }

        Map<String, Integer> classifySentence = iUserChatgptLogService.getCopesClassifySentence(essay, classifySentenceBackgroundFileNameList, userId, courseId, iUserStartTimeService.getTaskStartTimeByUserIdAndCourseId(userId, courseId), beginMinute, endMinute);
        srlProcessAppearMap.putAll(classifySentence);
//        Integer numOfOR2 = copesClassifySentence.get("OR2");

        String subActionExistKey = MyConstant.REDIS_ACTION_EXIST_SET + userId + "_" + courseId;

        String plannerSelectIndexKey = MyConstant.REDIS_PLANNER_SELECT_INDEX + userId + "_" + courseId;
        int plannerSelectIndex;
        if (iGlobalCache.hasKey(plannerSelectIndexKey)) {
            plannerSelectIndex = Integer.parseInt(iGlobalCache.get(plannerSelectIndexKey));
        } else {
            plannerSelectIndex = 0; // 没有保存plan的话，是0
        }
        if (gptScaffoldPromptTemplate.contains(";;;ADAPTIVE_PROMPT;;;")) {
//            adaptivePrompt.append("Note the following learning conditions for this student: ");

            // TODO 将redis 的数据从Set 变成Map 就可以统计每个action的个数
            // 根据action 的发生 来判断是否添加 prompt
            subActionAndPromptList.forEach(subActionAndPrompt -> {
                String subAction = subActionAndPrompt.getSubAction();
                Set<String> strings = iGlobalCache.sGet(subActionExistKey);
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

            //2.4   ISDIMU
            List<MdlFeedbackVO> mdlFeedbackVOList = iMdlFeedbackService.findMdlFeedbackVOByFeedbackNameAndCourseIdAndUserId(testISDIMUName, Long.valueOf(testISDIMUCourseId), userId);

            int iSDIMUScore = iSDIMUCalculator(mdlFeedbackVOList);
            if (!CollUtil.isEmpty(mdlFeedbackVOList)) {
                adaptivePrompt.append(generateLearningConditionPrompt(isdimuScorePrompt, gptScaffoldNumber, (double) iSDIMUScore, srlProcessBackupPromptMap, needCheckSRLPromptList));
            }

            //2.5  get user take previous study or not, this commonly define in pretest
            MdlQuizVO userTakePreviousStudy = iMdlQuizAttemptsService.findUserTakePreviousStudy(hasTakePreviousStudyTestName, Long.valueOf(hasTakePreviousStudyTestNameCourseId), userId);
            if (userTakePreviousStudy != null) {
                adaptivePrompt.append(userTakePreviousStudyPrompt).append(" ");
            }
            log.info("userTakePreviousStudy: " + (userTakePreviousStudy == null));


            //2.6  get test about your self
            MdlQuizVO userGrades = iMdlQuizGradesService.findQuizGradeByUserIdAndCourseIdAndQuizName(preTestName, Long.valueOf(preTestCourseId), userId);
            if (userGrades != null && userGrades.getGrade() != null) {
                adaptivePrompt.append(generateLearningConditionPrompt(pretestGradesPrompt, gptScaffoldNumber, userGrades.getGrade(), srlProcessBackupPromptMap, needCheckSRLPromptList));
            }
        }

        // 如果getCheckSrlProcess() 返回了空，则split之后得到空的 list []
        String[] needCheckCurrentScaffoldSrlProcessString = gptScaffoldRequest.getGptScaffoldPromptVO().getCheckSrlProcess().split(";;;");
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

            String srlProcessLabel = needCheckSRLPrompt.getSrlProcess();
            if (srlProcessLabel.contains(">") || srlProcessLabel.contains("<")) { // 这种情况表示需要对比SRL 出现的频次
                String[] srlProcessLabelArray = srlProcessLabel.contains(">") ? srlProcessLabel.split(">") : srlProcessLabel.split("<");
                String srlLabel1 = srlProcessLabelArray[0];
                String srlLabel2 = srlProcessLabelArray[1];
                Integer label1AppearTimes = srlProcessAppearMap.getOrDefault(srlLabel1, 0);
                Integer label2AppearTimes = srlProcessAppearMap.getOrDefault(srlLabel2, 0);
                //用来对比两个SRL process出现的频次，都是用第一个label 去比第二个 例如 LCR2>LCF2, check freq(LCR2) > freq(LCF2) or not.
                srlProcessPrompt.append(label1AppearTimes > label2AppearTimes ? needCheckSRLPrompt.getAppearOverOther() : needCheckSRLPrompt.getAppearLessThanOther()).append(" ");
            } else {
                Integer appearTimes = srlProcessAppearMap.getOrDefault(srlProcessLabel, 0); //Map 类型会自动将数值太小的Long 类型 存储为Integer 类型，所以需要加一个转换在这里
                int threshold = needCheckSRLPrompt.getThreshold();
                if (threshold == 0) { // only check exist or not exist
                    srlProcessPrompt.append(appearTimes == 0 ? needCheckSRLPrompt.getNotExistPrompt() : needCheckSRLPrompt.getExistPrompt().replace(";;;SRL_PROCESS_NUMBER;;;", String.valueOf(appearTimes))).append(" ");
                } else {//检测出现频次和 threshold 对比
                    srlProcessPrompt.append(appearTimes <= threshold ? needCheckSRLPrompt.getAppearLessThanEqualThresholdPrompt().replace(";;;SRL_PROCESS_NUMBER;;;", String.valueOf(appearTimes)) : needCheckSRLPrompt.getAppearOverThresholdPrompt().replace(";;;SRL_PROCESS_NUMBER;;;", String.valueOf(appearTimes))).append(" ");
                }
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
        assert StrUtil.isEmpty(gptScaffoldPromptTemplate);

        if (StrUtil.isEmpty(trimedSrlProcessPrompt)) {
            return "";
        }

        gptScaffoldPromptTemplate = gptScaffoldPromptTemplate.replace(";;;SCAFFOLD_NUMBER;;;", "phase " + gptScaffoldNumber);
        gptScaffoldPromptTemplate = gptScaffoldPromptTemplate.replace(";;;ADAPTIVE_PROMPT;;;", trimedAdaptivePrompt);
        gptScaffoldPromptTemplate = gptScaffoldPromptTemplate.replace(";;;SRL_PROCESS_PROMPT;;;", trimedSrlProcessPrompt);

        return gptScaffoldPromptTemplate;
    }
}

