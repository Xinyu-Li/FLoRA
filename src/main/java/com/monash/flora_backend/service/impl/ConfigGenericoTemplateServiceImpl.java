package com.monash.flora_backend.service.impl;

import cn.hutool.json.JSONArray;
import cn.hutool.json.JSONUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.monash.flora_backend.constant.MyMoodleConfigConstant;
import com.monash.flora_backend.controller.req.manage.AddUpdateToolsConfigVO;
import com.monash.flora_backend.controller.vo.GenericoTemplateIdAndNameVO;
import com.monash.flora_backend.controller.vo.manage.*;
import com.monash.flora_backend.dao.entity.*;
import com.monash.flora_backend.dao.mapper.ConfigGenericoTemplateMapper;
import com.monash.flora_backend.service.*;
import com.monash.flora_backend.util.MyBeanCopyUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author xinyu
 * @since 2024-02-15
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class ConfigGenericoTemplateServiceImpl extends ServiceImpl<ConfigGenericoTemplateMapper, ConfigGenericoTemplate> implements IConfigGenericoTemplateService {

    private final IConfigGptScaffoldSubActionOrSrlProcessService iConfigGptScaffoldSubActionOrSrlProcessService;
    private final IConfigIsdimuScorePromptService iConfigIsdimuScorePromptService;
    private final IConfigPlannerService iConfigPlannerService;
    private final IConfigPretestGradePromptService iConfigPretestGradePromptService;
    private final IConfigRuleBasedScaffoldService iConfigRuleBasedScaffoldService;
    private final IConfigAnnotationLabelColorService iConfigAnnotationLabelColorService;

    @Override
    public List<GenericoTemplateIdAndNameVO> findAllGenericoTemplateIdsAndNames() {
        return this.baseMapper.findAllIdsAndNames();
    }

    private List<GptScaffoldPromptVO> convertConfigGptScaffoldSubActionOrSrlProcess(List<ConfigGptScaffoldSubActionOrSrlProcess> srlProcessList) {
        List<GptScaffoldPromptVO> allSRLProcessPromptVOList = new ArrayList<>();
        Map<String, GptScaffoldPromptVO> allSrlProcessPromptMap = new TreeMap<>();
        srlProcessList.forEach(configSrlProcess -> {
            String key = "key" + configSrlProcess.getTriggerNumber();

            if (!allSrlProcessPromptMap.containsKey(key)) {
                GptScaffoldPromptVO allSRLProcessPromptVO = new GptScaffoldPromptVO();
                allSRLProcessPromptVO.setTriggerMinute(configSrlProcess.getTriggerMinute());
                allSRLProcessPromptVO.setBeginMinute(configSrlProcess.getCheckSrlProcessBeginMinute());
                allSRLProcessPromptVO.setEndMinute(configSrlProcess.getCheckSrlProcessEndMinute());
//                allSRLProcessPromptVO.setRules(new ArrayList<>()); //TODO need update due the AllSRLProcessPromptVO updates
                allSrlProcessPromptMap.put(key, allSRLProcessPromptVO);

            }
            NeedCheckSRLPromptVO needCheckSRLPromptVO = new NeedCheckSRLPromptVO();
            needCheckSRLPromptVO.setSrlProcess(configSrlProcess.getSubActionOrSrlProcess());
            needCheckSRLPromptVO.setNotExistPrompt(configSrlProcess.getNotExistPrompt());
            needCheckSRLPromptVO.setExistPrompt(configSrlProcess.getExistPrompt());
            needCheckSRLPromptVO.setThreshold(configSrlProcess.getThreshold());
            needCheckSRLPromptVO.setAppearOverThresholdPrompt(configSrlProcess.getAppearOverThresholdPrompt());
            needCheckSRLPromptVO.setAppearLessThanEqualThresholdPrompt(configSrlProcess.getAppearLessThanEqualThresholdPrompt());

//            allSrlProcessPromptMap.get(key).getRules().add(needCheckSRLPromptVO);//TODO need update due the AllSRLProcessPromptVO updates
        });

        allSrlProcessPromptMap.forEach((key, value) -> {
            log.info("allSrlProcessPromptMap key:" + key);
            allSRLProcessPromptVOList.add(value);
        });

        return allSRLProcessPromptVOList;
    }

    private List<ConfigPlannerVO> convertConfigPlanner(List<ConfigPlanner> configPlannerList) {
        List<ConfigPlannerVO> configPlannerVOList = new ArrayList<>();
        configPlannerList.forEach(configPlanner -> {
            ConfigPlannerVO configPlannerVO = new ConfigPlannerVO();
            configPlannerVO.setPlannerOverallStrategy(configPlanner.getPlannerOverallStrategy());
            configPlannerVO.setPlannerStrategyInstruction(configPlanner.getPlannerStrategyInstruction());
            List<PlannerTaskVO> plannerTaskVOList = new ArrayList<>();
            String[] tasks = configPlanner.getPlannerTasks().split(";;;");
            String[] allocatedTimes = configPlanner.getPlannerTasksAllocatedTimes().split(";;;");
            for (int i = 0; i < tasks.length; i++) {
                PlannerTaskVO plannerTaskVO = new PlannerTaskVO();
                plannerTaskVO.setTitle(tasks[i]);
                plannerTaskVO.setTime(Integer.valueOf(allocatedTimes[i]));
                plannerTaskVOList.add(plannerTaskVO);
            }
            configPlannerVO.setPlannerStep2Task(plannerTaskVOList);
            configPlannerVOList.add(configPlannerVO);
        });
        return configPlannerVOList;
    }

    @Override
    public AddUpdateToolsConfigVO findGenericoTemplateById(Long id) {
        ConfigGenericoTemplate configGenericoTemplate = super.getById(id);
        AddUpdateToolsConfigVO addUpdateToolsConfigVO = MyBeanCopyUtils.copyBean(configGenericoTemplate, AddUpdateToolsConfigVO.class);

        QueryWrapper<ConfigAnnotationLabelColor> configAnnotationLabelColorQueryWrapper = new QueryWrapper<>();
        configAnnotationLabelColorQueryWrapper.eq("config_generico_template_id", configGenericoTemplate.getId());
        List<ConfigAnnotationLabelColor> configAnnotationLabelColorList = iConfigAnnotationLabelColorService.list(configAnnotationLabelColorQueryWrapper);

        QueryWrapper<ConfigGptScaffoldSubActionOrSrlProcess> configSrlProcessQueryWrapper = new QueryWrapper<>();
        configSrlProcessQueryWrapper.eq("config_generico_template_id", configGenericoTemplate.getId()).eq("type", "srlprocess");
        List<ConfigGptScaffoldSubActionOrSrlProcess> srlProcessList = iConfigGptScaffoldSubActionOrSrlProcessService.list(configSrlProcessQueryWrapper);
        List<GptScaffoldPromptVO> allSRLProcessPromptVOList = convertConfigGptScaffoldSubActionOrSrlProcess(srlProcessList);

        QueryWrapper<ConfigIsdimuScorePrompt> configIsdimuScorePromptQueryWrapper = new QueryWrapper<>();
        configIsdimuScorePromptQueryWrapper.eq("config_generico_template_id", configGenericoTemplate.getId());
        List<ConfigIsdimuScorePrompt> isdimuScorePromptList = iConfigIsdimuScorePromptService.list(configIsdimuScorePromptQueryWrapper);

        QueryWrapper<ConfigPlanner> configPlannerQueryWrapper = new QueryWrapper<>();
        configPlannerQueryWrapper.eq("config_generico_template_id", configGenericoTemplate.getId());
        List<ConfigPlanner> configPlannerList = iConfigPlannerService.list(configPlannerQueryWrapper);
        List<ConfigPlannerVO> configPlannerVOList = convertConfigPlanner(configPlannerList);

        QueryWrapper<ConfigPretestGradePrompt> configPretestGradePromptQueryWrapper = new QueryWrapper<>();
        configPretestGradePromptQueryWrapper.eq("config_generico_template_id", configGenericoTemplate.getId());
        List<ConfigPretestGradePrompt> pretestGradePromptList = iConfigPretestGradePromptService.list(configPretestGradePromptQueryWrapper);

        QueryWrapper<ConfigRuleBasedScaffold> configRuleBasedScaffoldQueryWrapper = new QueryWrapper<>();
        configRuleBasedScaffoldQueryWrapper.eq("config_generico_template_id", configGenericoTemplate.getId());
        List<ConfigRuleBasedScaffold> ruleBasedScaffoldList = iConfigRuleBasedScaffoldService.list(configRuleBasedScaffoldQueryWrapper);
        List<ConfigRuleBasedScaffoldingVO> ruleBasedScaffoldingVOList = new ArrayList<>();
        ruleBasedScaffoldList.forEach(configRuleBasedScaffold -> {
            ConfigRuleBasedScaffoldingVO temp = new ConfigRuleBasedScaffoldingVO();
            temp.setTriggerMinute(configRuleBasedScaffold.getTriggerMinute());
            temp.setMainMessage(configRuleBasedScaffold.getMainMessage());
            temp.setContent(List.of(configRuleBasedScaffold.getOptionsContent().split(";;;")));
            ruleBasedScaffoldingVOList.add(temp);

        });

        QueryWrapper<ConfigGptScaffoldSubActionOrSrlProcess> configSubActionQueryWrapper = new QueryWrapper<>();
        configSubActionQueryWrapper.eq("config_generico_template_id", configGenericoTemplate.getId()).eq("type", "subaction");
        List<NeedCheckSubActionPromptVO> subActionList = iConfigGptScaffoldSubActionOrSrlProcessService.list(configSubActionQueryWrapper).stream().map(subAction -> {
            NeedCheckSubActionPromptVO temp = MyBeanCopyUtils.copyBean(subAction, NeedCheckSubActionPromptVO.class);
            temp.setSubAction(subAction.getSubActionOrSrlProcess());
            return temp;
        }).collect(Collectors.toList());



        addUpdateToolsConfigVO.setAnnotationLabelColors(MyBeanCopyUtils.copyBeanList(configAnnotationLabelColorList, ConfigAnnotationLabelColorVO.class));
        addUpdateToolsConfigVO.setPlannerAllStrategy(configPlannerVOList);
        addUpdateToolsConfigVO.setDefaultStep3ReadingStrategy(List.of(configGenericoTemplate.getPlannerReadingStrategy().split(";;;")));
        addUpdateToolsConfigVO.setDefaultStep3WritingStrategy(List.of(configGenericoTemplate.getPlannerWritingStrategy().split(";;;")));

        addUpdateToolsConfigVO.setScaffoldingContent(ruleBasedScaffoldingVOList);
        addUpdateToolsConfigVO.setGptScaffoldBackgroundFileNameList(List.of(configGenericoTemplate.getGptScaffoldBackgroundFilenameList().split(";;;")));
        addUpdateToolsConfigVO.setIsdimuScorePrompt(MyBeanCopyUtils.copyBeanList(isdimuScorePromptList, ThresholdPromptVO.class));
        addUpdateToolsConfigVO.setPreTestGradesPrompt(MyBeanCopyUtils.copyBeanList(pretestGradePromptList, ThresholdPromptVO.class));

        addUpdateToolsConfigVO.setClassifySentenceBackgroundFileNameList(List.of(configGenericoTemplate.getClassifySentenceBackgroundFileNameList().split(";;;")));
        addUpdateToolsConfigVO.setGptScaffoldNeedCheckSubActionPrompt(subActionList);
        addUpdateToolsConfigVO.setGptScaffoldNeedCheckSavePlannerSelectIndexPrompt(List.of(configGenericoTemplate.getGptScaffoldNeedCheckSavePlannerSelectIndexPrompt().split(";;;")));
        addUpdateToolsConfigVO.setGptScaffoldNeedCheckSRLProcessPrompt(allSRLProcessPromptVOList);
        addUpdateToolsConfigVO.setChatgptBackgroundFileNameList(List.of(configGenericoTemplate.getChatgptBackgroundFileNameList().split(";;;")));

        return addUpdateToolsConfigVO;
    }

//    private void extractAnnotationLabelAndColors(StringBuilder labelsBuilder, StringBuilder colorsBuilder, List<ConfigAnnotationLabelColorVO> annotationLabelColors) {
//        for (int i = 0; i < annotationLabelColors.size(); i++) {
//            ConfigAnnotationLabelColorVO item = annotationLabelColors.get(i);
//            labelsBuilder.append(item.getAnnotationLabel());
//            colorsBuilder.append(item.getAnnotationLabelColor());
//
//            // 如果不是最后一个元素，则添加分隔符
//            if (i < annotationLabelColors.size() - 1) {
//                labelsBuilder.append(";;;");
//                colorsBuilder.append(";;;");
//            }
//        }
//    }

    private void setupConfigGenericoTemplateValues(ConfigGenericoTemplate configGenericoTemplate, AddUpdateToolsConfigVO request) {
        configGenericoTemplate.setGenericoTemplateName(MyMoodleConfigConstant.GENERICO_TEMPLATE_PREFIX + request.getGenericoTemplateName());
        configGenericoTemplate.setGenericoTemplateKey(request.getGenericoTemplateName());


        configGenericoTemplate.setUseChecklistTool(request.getUseChecklistToolGrammar() || request.getUseChecklistToolAcademic() || request.getUseChecklistToolOriginality() || request.getUseChecklistToolClassification());

//        StringBuilder labelsBuilder = new StringBuilder();
//        StringBuilder colorsBuilder = new StringBuilder();
//
//        extractAnnotationLabelAndColors(labelsBuilder, colorsBuilder, request.getAnnotationLabelColors());

//        configGenericoTemplate.setAnnotationDefaultLabel(labelsBuilder.toString());
//        configGenericoTemplate.setAnnotationDefaultLabelColor(colorsBuilder.toString());



        List<String> defaultStep3ReadingStrategy = request.getDefaultStep3ReadingStrategy();
        configGenericoTemplate.setPlannerReadingStrategy(
                defaultStep3ReadingStrategy.stream().collect(Collectors.joining(";;;")));
        List<String> defaultStep3WritingStrategy = request.getDefaultStep3WritingStrategy();
        configGenericoTemplate.setPlannerWritingStrategy(
                defaultStep3WritingStrategy.stream().collect(Collectors.joining(";;;")));

        List<String> gptScaffoldBackgroundFileNameList = request.getGptScaffoldBackgroundFileNameList();
        configGenericoTemplate.setGptScaffoldBackgroundFilenameList(
                gptScaffoldBackgroundFileNameList.stream().collect(Collectors.joining(";;;")));

        List<String> classifySentenceBackgroundFileNameList = request.getClassifySentenceBackgroundFileNameList();
        configGenericoTemplate.setClassifySentenceBackgroundFileNameList(
                classifySentenceBackgroundFileNameList.stream().collect(Collectors.joining(";;;")));

        List<String> gptScaffoldNeedCheckSavePlannerSelectIndexPrompt = request.getGptScaffoldNeedCheckSavePlannerSelectIndexPrompt();
        configGenericoTemplate.setGptScaffoldNeedCheckSavePlannerSelectIndexPrompt(
                gptScaffoldNeedCheckSavePlannerSelectIndexPrompt.stream().collect(Collectors.joining(";;;")));

        List<String> chatgptBackgroundFileNameList = request.getChatgptBackgroundFileNameList();
        configGenericoTemplate.setChatgptBackgroundFileNameList(
                chatgptBackgroundFileNameList.stream().collect(Collectors.joining(";;;")));

        configGenericoTemplate.setGptScaffoldParameters(
                String.format("%d;;;%d;;;%d",
                        request.getGptScaffoldParametersMaxResponseToken(),
                        request.getGptScaffoldParametersN(),
                        request.getGptScaffoldParametersTemperature()));
        configGenericoTemplate.setChatgptParameters(
                String.format("%d;;;%d;;;%d",
                        request.getChatgptParametersMaxResponseToken(),
                        request.getChatgptParametersN(),
                        request.getChatgptParametersTemperature()));
    }

    private void setupOtherGenericoTemplateConfigs(Long configGenericoTemplateId, AddUpdateToolsConfigVO request) {

        List<ConfigAnnotationLabelColor> annotationLabelColorList = MyBeanCopyUtils.copyBeanList(request.getAnnotationLabelColors(), ConfigAnnotationLabelColor.class);
        annotationLabelColorList.forEach(s -> s.setConfigGenericoTemplateId(configGenericoTemplateId));
        iConfigAnnotationLabelColorService.saveBatch(annotationLabelColorList);

        List<ConfigPlanner> configPlannerList = new ArrayList<>();
        List<ConfigPlannerVO> plannerAllStrategy = request.getPlannerAllStrategy();
        for (int i = 0; i < plannerAllStrategy.size(); i++) {
            ConfigPlannerVO strategy = plannerAllStrategy.get(i);
            ConfigPlanner configPlanner = new ConfigPlanner();
            configPlanner.setPlannerOverallStrategy(strategy.getPlannerOverallStrategy());
            configPlanner.setPlannerStrategyInstruction(strategy.getPlannerStrategyInstruction());
            StringBuilder tasksBuilder = new StringBuilder();
            StringBuilder allocatedTimeBuilder = new StringBuilder();
            for (int j = 0; j < strategy.getPlannerStep2Task().size(); j++) {
                PlannerTaskVO plannerTaskVO = strategy.getPlannerStep2Task().get(j);
                tasksBuilder.append(plannerTaskVO.getTitle());
                allocatedTimeBuilder.append(plannerTaskVO.getTime());

                if (j < strategy.getPlannerStep2Task().size() - 1) {
                    tasksBuilder.append(";;;");
                    allocatedTimeBuilder.append(";;;");
                }

            }
            configPlanner.setPlannerTasks(tasksBuilder.toString());
            configPlanner.setPlannerTasksAllocatedTimes(allocatedTimeBuilder.toString());
            configPlanner.setPlannerStrategyNumber(i + 1);
            configPlanner.setConfigGenericoTemplateId(configGenericoTemplateId);  // 必填项
            configPlannerList.add(configPlanner);
        }
        iConfigPlannerService.saveBatch(configPlannerList);

        // 存入ConfigRuleBasedScaffolding table
        List<ConfigRuleBasedScaffold> configRuleBasedScaffoldList = new ArrayList<>();
        List<ConfigRuleBasedScaffoldingVO> scaffoldingContent = request.getScaffoldingContent();
        for (int i = 0; i < scaffoldingContent.size(); i++) {
            ConfigRuleBasedScaffold configRuleBasedScaffold = new ConfigRuleBasedScaffold();

            ConfigRuleBasedScaffoldingVO configRuleBasedScaffoldingVO = scaffoldingContent.get(i);
            configRuleBasedScaffold.setMainMessage(configRuleBasedScaffoldingVO.getMainMessage());

            configRuleBasedScaffold.setOptionsContent(configRuleBasedScaffoldingVO.getContent().stream().collect(Collectors.joining(";;;")));
            configRuleBasedScaffold.setTriggerMinute(configRuleBasedScaffoldingVO.getTriggerMinute());
            configRuleBasedScaffold.setTriggerNumber(i + 1);
            configRuleBasedScaffold.setConfigGenericoTemplateId(configGenericoTemplateId);  // 必填项
            configRuleBasedScaffoldList.add(configRuleBasedScaffold);
        }
        iConfigRuleBasedScaffoldService.saveBatch(configRuleBasedScaffoldList);

        // 存入 Config ISDIMU score table
        List<ConfigIsdimuScorePrompt> configIsdimuScorePromptList = new ArrayList<>();
        List<ThresholdPromptVO> isdimuScorePrompt = request.getIsdimuScorePrompt();
        for (int i = 0; i < isdimuScorePrompt.size(); i++) {
            ConfigIsdimuScorePrompt configIsdimuScorePrompt = new ConfigIsdimuScorePrompt();
            ThresholdPromptVO thresholdPromptVO = isdimuScorePrompt.get(i);

            configIsdimuScorePrompt.setConfigGenericoTemplateId(configGenericoTemplateId);   // 必填项
            configIsdimuScorePrompt.setPrompt(thresholdPromptVO.getPrompt());
            configIsdimuScorePrompt.setThreshold(thresholdPromptVO.getThreshold());
            configIsdimuScorePromptList.add(configIsdimuScorePrompt);
        }
        iConfigIsdimuScorePromptService.saveBatch(configIsdimuScorePromptList);

        // 存入 Config Pretest table
        List<ConfigPretestGradePrompt> configPretestGradePromptList = new ArrayList<>();
        List<ThresholdPromptVO> pretestGradesPrompt = request.getPreTestGradesPrompt();
        for (int i = 0; i < pretestGradesPrompt.size(); i++) {
            ConfigPretestGradePrompt configPretestGradePrompt = new ConfigPretestGradePrompt();
            ThresholdPromptVO thresholdPromptVO = pretestGradesPrompt.get(i);
            configPretestGradePrompt.setConfigGenericoTemplateId(configGenericoTemplateId); // 必填项
            configPretestGradePrompt.setPrompt(thresholdPromptVO.getPrompt());
            configPretestGradePrompt.setThreshold(thresholdPromptVO.getThreshold());
            configPretestGradePromptList.add(configPretestGradePrompt);
        }
        iConfigPretestGradePromptService.saveBatch(configPretestGradePromptList);

        // 存入GPT scaffold check Sub action table
        List<ConfigGptScaffoldSubActionOrSrlProcess> configGptScaffoldSubActionList = new ArrayList<>();
        List<NeedCheckSubActionPromptVO> gptScaffoldNeedCheckSubActionPrompt = request.getGptScaffoldNeedCheckSubActionPrompt();
        for (int i = 0; i < gptScaffoldNeedCheckSubActionPrompt.size(); i++) {

            NeedCheckSubActionPromptVO needCheckSubActionPromptVO = gptScaffoldNeedCheckSubActionPrompt.get(i);
            ConfigGptScaffoldSubActionOrSrlProcess configSubAction = MyBeanCopyUtils.copyBean(needCheckSubActionPromptVO, ConfigGptScaffoldSubActionOrSrlProcess.class);
            configSubAction.setSubActionOrSrlProcess(needCheckSubActionPromptVO.getSubAction());

            configSubAction.setConfigGenericoTemplateId(configGenericoTemplateId);   // 必填项
            configSubAction.setType("subaction");

            configGptScaffoldSubActionList.add(configSubAction);
        }
        iConfigGptScaffoldSubActionOrSrlProcessService.saveBatch(configGptScaffoldSubActionList);

        // 存入GPT scaffold table 和 check srl table
        List<ConfigGptScaffoldSubActionOrSrlProcess> configGptScaffoldSrlProcessList = new ArrayList<>();
        List<GptScaffoldPromptVO> gptScaffoldNeedCheckSRLProcessPrompt = request.getGptScaffoldNeedCheckSRLProcessPrompt();
        for (int i = 0; i < gptScaffoldNeedCheckSRLProcessPrompt.size(); i++) {

            GptScaffoldPromptVO allSRLProcessPromptVO = gptScaffoldNeedCheckSRLProcessPrompt.get(i);
            //TODO need update due the AllSRLProcessPromptVO updates
            /*for (int j = 0; j < allSRLProcessPromptVO.getRules().size(); j++) {

                NeedCheckSRLPromptVO needCheckSRLPromptVO = allSRLProcessPromptVO.getRules().get(j);

                ConfigGptScaffoldSubActionOrSrlProcess configSrlProcess = MyBeanCopyUtils.copyBean(needCheckSRLPromptVO, ConfigGptScaffoldSubActionOrSrlProcess.class);

                configSrlProcess.setSubActionOrSrlProcess(needCheckSRLPromptVO.getSrlProcess());

                configSrlProcess.setConfigGenericoTemplateId(configGenericoTemplateId);  // 必填项

                configSrlProcess.setTriggerNumber(i + 1);
                configSrlProcess.setTriggerMinute(allSRLProcessPromptVO.getTriggerMinute());
                configSrlProcess.setCheckSrlProcessBeginMinute(allSRLProcessPromptVO.getBeginMinute());
                configSrlProcess.setCheckSrlProcessEndMinute(allSRLProcessPromptVO.getEndMinute());

                configSrlProcess.setType("srlprocess");

                configGptScaffoldSrlProcessList.add(configSrlProcess);
            }*/
        }
        iConfigGptScaffoldSubActionOrSrlProcessService.saveBatch(configGptScaffoldSrlProcessList);
    }

    @Override
    public void addNewGenericoTemplateFloraDB(AddUpdateToolsConfigVO request) {

        ConfigGenericoTemplate configGenericoTemplate = MyBeanCopyUtils.copyBean(request, ConfigGenericoTemplate.class);


        setupConfigGenericoTemplateValues(configGenericoTemplate, request);


        this.save(configGenericoTemplate);

        Long configGenericoTemplateId = configGenericoTemplate.getId();

        log.info("configGenericoTemplate id: " + configGenericoTemplateId);
        // 存入ConfigPlanner table
        setupOtherGenericoTemplateConfigs(configGenericoTemplateId, request);


        log.info("save generico template successfully into flora DB");
    }

    @Override
    public void saveExistingConfigIntoFloraDB(Integer templateIndex, String genericoTemplateBody, String studyName) {
        Map<String, String> variables = extractVariables(genericoTemplateBody); //"var\\s+(\\w+)\\s+=\\s+([^;]+);"         "var gptScaffoldPromptTemplate = `([\\s\\S]*?)`;"
        String template = extractGptScaffoldPromptTemplate(genericoTemplateBody, "var gptScaffoldPromptTemplate = `([\\s\\S]*?)`;");
        String gptScaffoldNeedCheckSRLProcessPrompt = "[" + extractGptScaffoldPromptTemplate(genericoTemplateBody, "var gptScaffoldNeedCheckSRLProcessPrompt = \\[([\\s\\S]*?)\\];") + "]";
//        Map<String, String> gptScaffoldPromptTemplteMap = extractVariables(genericoTemplateBody, "var gptScaffoldPromptTemplate = `([\\s\\S]*?)`;");

        ConfigGenericoTemplate configGenericoTemplate = new ConfigGenericoTemplate();

        configGenericoTemplate.setGenericoTemplateName(MyMoodleConfigConstant.GENERICO_TEMPLATE_PREFIX + studyName);
        configGenericoTemplate.setGenericoTemplateKey(MyMoodleConfigConstant.GENERICO_TEMPLATE_PREFIX + studyName);
        configGenericoTemplate.setGenericoTemplateIndex(templateIndex);
        configGenericoTemplate.setTotalMinutes(Integer.valueOf(variables.get("totalMinutes")));
        configGenericoTemplate.setUnlimitedTime(Boolean.parseBoolean(variables.get("unlimitedTime")));
        configGenericoTemplate.setHintMinutesBeforeEnd(Integer.parseInt(variables.get("hintMinutesBeforeEnd")));

        configGenericoTemplate.setAnnotationTakeNoteLabel(variables.get("annotationTakeNoteLabel"));

        configGenericoTemplate.setUseAnnotationTool(Boolean.valueOf(variables.get("useAnnotationTool")));
        configGenericoTemplate.setUseScaffoldTool(Boolean.valueOf(variables.get("useScaffoldTool")));
        configGenericoTemplate.setUseGptScaffoldTool(Boolean.valueOf(variables.get("useGPTScaffoldTool")));
        configGenericoTemplate.setSrlModel(variables.get("srlModel"));
        configGenericoTemplate.setGptScaffoldRole(variables.get("gptScaffoldRole"));
        configGenericoTemplate.setGptScaffoldRoleDescription(variables.get("gptScaffoldRoleDescription"));
        configGenericoTemplate.setGptScaffoldPromptIncludeEssay(Boolean.valueOf(variables.get("gptScaffoldPromptIncludeEssay")));
        configGenericoTemplate.setGptScaffoldPromptTemplate(template);
        configGenericoTemplate.setGptScaffoldBackgroundFilenameList(Arrays.stream(splitOneDimArray(variables.get("gptScaffoldBackgroundFileNameList"))).collect(Collectors.joining(";;;")));
        configGenericoTemplate.setGptScaffoldParameters(Arrays.stream(splitOneDimArray(variables.get("gptScaffoldParameters"))).collect(Collectors.joining(";;;")));
        configGenericoTemplate.setGptScaffoldNeedCheckSavePlannerSelectIndexPrompt(Arrays.stream(splitOneDimArray(variables.get("gptScaffoldNeedCheckSavePlannerSelectIndexPrompt"))).collect(Collectors.joining(";;;")));
        configGenericoTemplate.setTestIsdimuName(variables.get("testISDIMUName"));
        configGenericoTemplate.setPreTestName(variables.get("preTestName"));
        configGenericoTemplate.setHasTakePreviousStudyTestName(variables.get("hasTakePreviousStudyTestName"));
        configGenericoTemplate.setTestIsdimuCourseId(Integer.valueOf(variables.get("testISDIMUCourseId")));
        configGenericoTemplate.setHasTakePreviousStudyTestNameCourseId(Integer.valueOf(variables.get("hasTakePreviousStudyTestNameCourseId")));
        configGenericoTemplate.setPreTestNameCourseId(Integer.valueOf(variables.get("pretestNameCourseId")));
        configGenericoTemplate.setUseWriteEssayTool(Boolean.valueOf(variables.get("useWriteEssayTool")));
        configGenericoTemplate.setUseWriteEssayWordCountButton(Boolean.valueOf(variables.get("useWriteEssayWordCountButton")));
        configGenericoTemplate.setUseCollaborativeWriteEssayTool(Boolean.valueOf(variables.get("useCollaborativeWriteEssayTool")));
        configGenericoTemplate.setUseCollaborativeWriteEssayWordCountButton(Boolean.valueOf(variables.get("useCollaborativeWriteEssayWordCountButton")));
        configGenericoTemplate.setIncludeChatgptToCollaborativeWriteEssay(Boolean.valueOf(variables.get("includeChatgptToCollaborativeWriteEssay")));
        configGenericoTemplate.setUsePlannerTool(Boolean.valueOf(variables.get("usePlannerTool")));
        configGenericoTemplate.setUseChatgptTool(Boolean.valueOf(variables.get("useChatgptTool")));
        configGenericoTemplate.setChatgptBackgroundFileNameList(Arrays.stream(splitOneDimArray(variables.get("chatgptBackgroundFileNameList"))).collect(Collectors.joining(";;;")));
        configGenericoTemplate.setChatgptRoleDescription(variables.get("chatgptRoleDescription"));
        configGenericoTemplate.setChatgptRole(variables.get("chatgptRole"));
        configGenericoTemplate.setChatgptPromptIncludeEssay(Boolean.valueOf(variables.get("chatgptPromptIncludeEssay")));
        configGenericoTemplate.setChatgptParameters(Arrays.stream(splitOneDimArray(variables.get("chatgptParameters"))).collect(Collectors.joining(";;;")));
        configGenericoTemplate.setUseChecklistTool(Boolean.valueOf(variables.get("useChecklistTool")));
        configGenericoTemplate.setUseChecklistToolGrammar(Boolean.valueOf(variables.get("useChecklistToolGrammar")));
        configGenericoTemplate.setUseChecklistToolAcademic(Boolean.valueOf(variables.get("useChecklistToolAcademic")));
        configGenericoTemplate.setUseChecklistToolOriginality(Boolean.valueOf(variables.get("useChecklistToolOriginality")));
        configGenericoTemplate.setUseChecklistToolClassification(Boolean.valueOf(variables.get("useChecklistToolClassification")));
        configGenericoTemplate.setUseDictionaryTool(Boolean.valueOf(variables.get("useDictionaryTool")));
        configGenericoTemplate.setDictionarySourceLanguage(variables.get("dictionarySourceLanguage"));
        configGenericoTemplate.setDictionaryTargetLanguage(variables.get("dictionaryTargetLanguage"));
        configGenericoTemplate.setUseTeacherChat(Boolean.valueOf(variables.get("useTeacherChat")));
        configGenericoTemplate.setUseTimerTool(Boolean.valueOf(variables.get("useTimerTool")));
        configGenericoTemplate.setUseVideoRecordingTool(Boolean.valueOf(variables.get("useVideoRecordingTool")));
        configGenericoTemplate.setToolsLanguage(variables.get("toolsLanguage"));
        configGenericoTemplate.setPlannerSelectStrategyHint(variables.get("plannerSelectStrategyHint"));
        configGenericoTemplate.setPlannerAllocateTimeHint(variables.get("plannerAllocateTimeHint"));
        configGenericoTemplate.setPlannerSelectSkillsHint(variables.get("plannerSelectSkillsHint"));
        configGenericoTemplate.setPlannerSavePlanHint(variables.get("plannerSavePlanHint"));
        configGenericoTemplate.setPlannerReadingStrategy(Arrays.stream(splitOneDimArray(variables.get("defaultStep3ReadingStrategy"))).collect(Collectors.joining(";;;")));
        configGenericoTemplate.setPlannerReadingInstruction(variables.get("defaultStep3ReadingInstruction"));
        configGenericoTemplate.setPlannerWritingStrategy(Arrays.stream(splitOneDimArray(variables.get("defaultStep3WritingStrategy"))).collect(Collectors.joining(";;;")));
        configGenericoTemplate.setPlannerWritingInstruction(variables.get("defaultStep3WritingInstruction"));
        configGenericoTemplate.setPlannerCustomisePlanInstruction(variables.get("customiseStep2Instruction"));
        configGenericoTemplate.setUserTakePreviousStudyPrompt(variables.get("userTakePreviousStudyPrompt"));
        configGenericoTemplate.setClassifySentenceBackgroundFileNameList(Arrays.stream(splitOneDimArray(variables.get("classifySentenceBackgroundFileNameList"))).collect(Collectors.joining(";;;")));



        super.save(configGenericoTemplate);

        Long configGenericoTemplateId = configGenericoTemplate.getId();


        Map<String, String> jsonMap = extractJson(genericoTemplateBody);

        List<ConfigAnnotationLabelColor> configAnnotationLabelColorList = JSONUtil.toList(variables.get("annotationLabelColors"), ConfigAnnotationLabelColor.class);
        iConfigAnnotationLabelColorService.saveBatch(configAnnotationLabelColorList);

        List<ConfigGptScaffoldSubActionOrSrlProcess> configGptScaffoldSubActionList = new ArrayList<>();
        List<NeedCheckSubActionPromptVO> needCheckSubActionList = JSONUtil.toList(jsonMap.get("gptScaffoldNeedCheckSubActionPrompt"), NeedCheckSubActionPromptVO.class);
        needCheckSubActionList.forEach(needCheckSubActionPromptVO -> {
            ConfigGptScaffoldSubActionOrSrlProcess configSubAction = MyBeanCopyUtils.copyBean(needCheckSubActionPromptVO, ConfigGptScaffoldSubActionOrSrlProcess.class);

            configSubAction.setSubActionOrSrlProcess(needCheckSubActionPromptVO.getSubAction());
            configSubAction.setConfigGenericoTemplateId(configGenericoTemplateId);
            configSubAction.setType("subaction");


            configGptScaffoldSubActionList.add(configSubAction);
        });
        iConfigGptScaffoldSubActionOrSrlProcessService.saveBatch(configGptScaffoldSubActionList);



        String[] gptScaffoldTriggerMinutes = splitOneDimArray(variables.get("gptScaffoldTriggerMinute"));
        String[][] gptScaffoldCheckSrlTimeBlocks = splitTwoDimArray(variables.get("gptScaffoldCheckSRLProcessTimeBlock"));

        List<ConfigGptScaffoldSubActionOrSrlProcess> configGptScaffoldSrlProcessList = new ArrayList<>();

        JSONArray jsonArray = JSONUtil.parseArray(gptScaffoldNeedCheckSRLProcessPrompt);

        for (int i = 0; i < jsonArray.size(); i++) {
            Object innerArrayObj = jsonArray.get(i);
            List<NeedCheckSRLPromptVO> needCheckSrlProcessList = JSONUtil.toList((JSONArray)innerArrayObj, NeedCheckSRLPromptVO.class);

            for (int j = 0; j < needCheckSrlProcessList.size(); j++) {
                NeedCheckSRLPromptVO needCheckSRLPromptVO = needCheckSrlProcessList.get(j);
                ConfigGptScaffoldSubActionOrSrlProcess configSrlProcess = MyBeanCopyUtils.copyBean(needCheckSRLPromptVO, ConfigGptScaffoldSubActionOrSrlProcess.class);
                configSrlProcess.setSubActionOrSrlProcess(needCheckSRLPromptVO.getSrlProcess());
                configSrlProcess.setConfigGenericoTemplateId(configGenericoTemplateId);
                configSrlProcess.setType("srlprocess");

                configSrlProcess.setTriggerNumber(i + 1);
                configSrlProcess.setTriggerMinute(Integer.valueOf(gptScaffoldTriggerMinutes[i]));
                configSrlProcess.setCheckSrlProcessBeginMinute(Integer.valueOf(gptScaffoldCheckSrlTimeBlocks[i][0]));
                configSrlProcess.setCheckSrlProcessEndMinute(Integer.valueOf(gptScaffoldCheckSrlTimeBlocks[i][1]));

                configGptScaffoldSrlProcessList.add(configSrlProcess);
            }
        }


        iConfigGptScaffoldSubActionOrSrlProcessService.saveBatch(configGptScaffoldSrlProcessList);


        List<ConfigPretestGradePrompt> configPretestGradePromptList = new ArrayList<>();
        List<ThresholdPromptVO> pretestGradesPromptList = JSONUtil.toList(jsonMap.get("pretestGradesPrompt"), ThresholdPromptVO.class);
        pretestGradesPromptList.forEach(thresholdPromptVO -> {
            ConfigPretestGradePrompt configPretestGradePrompt = new ConfigPretestGradePrompt();
            configPretestGradePrompt.setThreshold(thresholdPromptVO.getThreshold());
            configPretestGradePrompt.setPrompt(thresholdPromptVO.getPrompt());
            configPretestGradePrompt.setConfigGenericoTemplateId(configGenericoTemplateId);
            configPretestGradePromptList.add(configPretestGradePrompt);
        });
        iConfigPretestGradePromptService.saveBatch(configPretestGradePromptList);



        List<ConfigIsdimuScorePrompt> configIsdimuScorePromptList = new ArrayList<>();
        List<ThresholdPromptVO> isdimuScorePromptList = JSONUtil.toList(jsonMap.get("isdimuScorePrompt"), ThresholdPromptVO.class);
        isdimuScorePromptList.forEach(thresholdPromptVO -> {
            ConfigIsdimuScorePrompt configIsdimuScorePrompt = new ConfigIsdimuScorePrompt();
            configIsdimuScorePrompt.setThreshold(thresholdPromptVO.getThreshold());
            configIsdimuScorePrompt.setPrompt(thresholdPromptVO.getPrompt());
            configIsdimuScorePrompt.setConfigGenericoTemplateId(configGenericoTemplateId);
            configIsdimuScorePromptList.add(configIsdimuScorePrompt);
        });
        iConfigIsdimuScorePromptService.saveBatch(configIsdimuScorePromptList);


        List<ConfigPlanner> configPlannerList = new ArrayList<>();
        String[] plannerOverallStrategies = splitOneDimArray(variables.get("plannerOverallStrategy"));
        String[] plannerOverallStrategyInstruction = splitOneDimArray(variables.get("plannerStep2Instruction"));
        String[][] plannerTasks = splitTwoDimArray(variables.get("plannerStep2Task"));
        for (int i = 0; i < plannerOverallStrategies.length; i++) {
            ConfigPlanner configPlanner = new ConfigPlanner();
            configPlanner.setPlannerOverallStrategy(plannerOverallStrategies[i]);
            configPlanner.setPlannerStrategyInstruction(plannerOverallStrategyInstruction[i]);
            configPlanner.setPlannerStrategyNumber(i + 1);
            configPlanner.setPlannerTasks(Arrays.stream(plannerTasks[i]).collect(Collectors.joining(";;;")));
            configPlanner.setPlannerTasksAllocatedTimes(Arrays.stream(plannerTasks[i]).map(s -> "5").collect(Collectors.joining(";;;")));
            configPlanner.setConfigGenericoTemplateId(configGenericoTemplateId);


            configPlannerList.add(configPlanner);
        }
        iConfigPlannerService.saveBatch(configPlannerList);


        List<ConfigRuleBasedScaffold> configRuleBasedScaffoldList = new ArrayList<>();
        String[] ruleBasedScaffoldTriggerMinutes = splitOneDimArray(variables.get("scaffoldShowingTime"));
        String[] ruleBasedScaffoldMainMessages = splitOneDimArray(variables.get("scaffoldPromptMessage").replace("\n", ""));
        String[][] ruleBasedScaffoldContents = splitTwoDimArray(variables.get("scaffoldContent").replace("\n", ""));
        for (int i = 0; i < ruleBasedScaffoldTriggerMinutes.length; i++) {
            ConfigRuleBasedScaffold configRuleBasedScaffold = new ConfigRuleBasedScaffold();
            configRuleBasedScaffold.setTriggerNumber(i + 1);
            configRuleBasedScaffold.setTriggerMinute(Integer.valueOf(ruleBasedScaffoldTriggerMinutes[i]));
            configRuleBasedScaffold.setMainMessage(ruleBasedScaffoldMainMessages[i]);
            configRuleBasedScaffold.setOptionsContent(String.format("%s;;;%s;;;%s", ruleBasedScaffoldContents[i][0],
                    ruleBasedScaffoldContents[i][1],
                    ruleBasedScaffoldContents[i][2]));
            configRuleBasedScaffold.setConfigGenericoTemplateId(configGenericoTemplateId);
            configRuleBasedScaffoldList.add(configRuleBasedScaffold);
        }
        iConfigRuleBasedScaffoldService.saveBatch(configRuleBasedScaffoldList);


    }

    public String generateGenericoBody(Long configGenericoTemplateId) {
        ConfigGenericoTemplate configGenericoTemplate = super.getById(configGenericoTemplateId);

        QueryWrapper<ConfigGptScaffoldSubActionOrSrlProcess> configSubActionQueryWrapper = new QueryWrapper<>();
        configSubActionQueryWrapper.eq("config_generico_template_id", configGenericoTemplate.getId()).eq("type", "subaction");
        List<NeedCheckSubActionPromptVO> subActionList = iConfigGptScaffoldSubActionOrSrlProcessService.list(configSubActionQueryWrapper).stream().map(subAction -> {
            NeedCheckSubActionPromptVO temp = MyBeanCopyUtils.copyBean(subAction, NeedCheckSubActionPromptVO.class);
            temp.setSubAction(subAction.getSubActionOrSrlProcess());
            return temp;
        }).collect(Collectors.toList());

        QueryWrapper<ConfigAnnotationLabelColor> configAnnotationLabelColorQueryWrapper = new QueryWrapper<>();
        configAnnotationLabelColorQueryWrapper.eq("config_generico_template_id", configGenericoTemplate.getId());
        List<ConfigAnnotationLabelColor> configAnnotationLabelColorList = iConfigAnnotationLabelColorService.list(configAnnotationLabelColorQueryWrapper);

        QueryWrapper<ConfigGptScaffoldSubActionOrSrlProcess> configSrlProcessQueryWrapper = new QueryWrapper<>();
        configSrlProcessQueryWrapper.eq("config_generico_template_id", configGenericoTemplate.getId()).eq("type", "srlprocess");
        List<ConfigGptScaffoldSubActionOrSrlProcess> srlProcessList = iConfigGptScaffoldSubActionOrSrlProcessService.list(configSrlProcessQueryWrapper);
        List<GptScaffoldPromptVO> allSRLProcessPromptVOList = convertConfigGptScaffoldSubActionOrSrlProcess(srlProcessList);

        QueryWrapper<ConfigIsdimuScorePrompt> configIsdimuScorePromptQueryWrapper = new QueryWrapper<>();
        configIsdimuScorePromptQueryWrapper.eq("config_generico_template_id", configGenericoTemplate.getId());
        List<ConfigIsdimuScorePrompt> isdimuScorePromptList = iConfigIsdimuScorePromptService.list(configIsdimuScorePromptQueryWrapper);

        QueryWrapper<ConfigPlanner> configPlannerQueryWrapper = new QueryWrapper<>();
        configPlannerQueryWrapper.eq("config_generico_template_id", configGenericoTemplate.getId());
        List<ConfigPlanner> configPlannerList = iConfigPlannerService.list(configPlannerQueryWrapper);
        List<ConfigPlannerVO> configPlannerVOList = convertConfigPlanner(configPlannerList);

        QueryWrapper<ConfigPretestGradePrompt> configPretestGradePromptQueryWrapper = new QueryWrapper<>();
        configPretestGradePromptQueryWrapper.eq("config_generico_template_id", configGenericoTemplate.getId());
        List<ConfigPretestGradePrompt> pretestGradePromptList = iConfigPretestGradePromptService.list(configPretestGradePromptQueryWrapper);

        QueryWrapper<ConfigRuleBasedScaffold> configRuleBasedScaffoldQueryWrapper = new QueryWrapper<>();
        configRuleBasedScaffoldQueryWrapper.eq("config_generico_template_id", configGenericoTemplate.getId());
        List<ConfigRuleBasedScaffold> ruleBasedScaffoldList = iConfigRuleBasedScaffoldService.list(configRuleBasedScaffoldQueryWrapper);
        List<ConfigRuleBasedScaffoldingVO> ruleBasedScaffoldingVOList = new ArrayList<>();
        ruleBasedScaffoldList.forEach(configRuleBasedScaffold -> {
            ConfigRuleBasedScaffoldingVO temp = new ConfigRuleBasedScaffoldingVO();
            temp.setTriggerMinute(configRuleBasedScaffold.getTriggerMinute());
            temp.setMainMessage(configRuleBasedScaffold.getMainMessage());
            temp.setContent(List.of(configRuleBasedScaffold.getOptionsContent().split(";;;")));
            ruleBasedScaffoldingVOList.add(temp);

        });


        AddUpdateToolsConfigVO addUpdateToolsConfigVO = MyBeanCopyUtils.copyBean(configGenericoTemplate, AddUpdateToolsConfigVO.class);
        addUpdateToolsConfigVO.setGptScaffoldNeedCheckSubActionPrompt(subActionList);
        addUpdateToolsConfigVO.setAnnotationLabelColors(MyBeanCopyUtils.copyBeanList(configAnnotationLabelColorList, ConfigAnnotationLabelColorVO.class));
        addUpdateToolsConfigVO.setGptScaffoldNeedCheckSRLProcessPrompt(allSRLProcessPromptVOList);
        addUpdateToolsConfigVO.setIsdimuScorePrompt(MyBeanCopyUtils.copyBeanList(isdimuScorePromptList, ThresholdPromptVO.class));
        addUpdateToolsConfigVO.setPreTestGradesPrompt(MyBeanCopyUtils.copyBeanList(pretestGradePromptList, ThresholdPromptVO.class));
        addUpdateToolsConfigVO.setPlannerAllStrategy(configPlannerVOList);
        addUpdateToolsConfigVO.setScaffoldingContent(ruleBasedScaffoldingVOList);


        return generateGenericoBody(addUpdateToolsConfigVO);

        /*String template = "<!--start_PLUGINS_GENERICO_TEMPLATE_BODY-->\n" +
                "\n" +
                "    <script src=\"/flora/js/jquery.min.js\"></script>\n" +
                "    <script src=\"/flora/js/etherpad.js\"></script>\n" +
                "    <script src=\"/flora/js/diff.js\"></script>\n" +
                "    <link href=\"/flora/css/bootstrap.min.css\" rel=\"stylesheet\"/>\n" +
                "    <script src=\"/flora/js/bootstrap.bundle.min.js\"></script>\n" +
                "    <script src=\"/flora/js/quill.min.js\"></script>\n" +
                "    <script src=\"/flora/js/flipdown.min.js\"></script>\n" +
                "\n" +
                "    <script>\n" +
                "        var currentRange = null;\n" +
                "        var whetherDoHighlight = false;\n" +
                "        var saveHighlight = null;\n" +
                "        var saveHighlightText = '';\n" +
                "\n" +
                "        var totalMinutes = " + configGenericoTemplate.getTotalMinutes() + ";\n" +
                "        var unlimitedTime = " + configGenericoTemplate.getUnlimitedTime() + ";\n" +
                "        var hintMinutesBeforeEnd = " + configGenericoTemplate.getHintMinutesBeforeEnd() + ";\n" +
                "\n" +
                "        var annotationTakeNoteLabel = '" + configGenericoTemplate.getAnnotationTakeNoteLabel() + "';\n" +
                "        var annotationLabelColors = " + JSONUtil.toJsonStr(configAnnotationLabelColorList) + ";\n" +
                "\n" +

                "        var scaffoldContent = " + JSONUtil.toJsonStr(ruleBasedScaffoldingVOList) + ";\n" +
                "        var plannerSelectStrategyHint = '" + configGenericoTemplate.getPlannerSelectStrategyHint() + "';\n" +
                "        var plannerAllocateTimeHint = '" + configGenericoTemplate.getPlannerAllocateTimeHint() + "';\n" +
                "        var plannerSelectSkillsHint = '" + configGenericoTemplate.getPlannerSelectSkillsHint() + "';\n" +
                "        var plannerSavePlanHint = '" + configGenericoTemplate.getPlannerSavePlanHint() + "';\n" +
                "\n" +
                "        var plannerAllStrategy = " + JSONUtil.toJsonStr(configPlannerVOList) +
                "\n" +
                "        var defaultStep3ReadingStrategy = ['" + Arrays.stream(configGenericoTemplate.getPlannerReadingStrategy().split(";;;")).collect(Collectors.joining("', '")) + "'];\n" +
                "        var defaultStep3ReadingInstruction = '" + configGenericoTemplate.getPlannerReadingInstruction() + "';\n" +
                "        var defaultStep3WritingStrategy = ['" + Arrays.stream(configGenericoTemplate.getPlannerWritingStrategy().split(";;;")).collect(Collectors.joining("', '")) + "'];\n" +
                "        var defaultStep3WritingInstruction = '" + configGenericoTemplate.getPlannerWritingInstruction() + "';\n" +
                "\n" +
                "        var customiseStep2Instruction = '" + configGenericoTemplate.getPlannerCustomisePlanInstruction() + "';\n" +
                "\n" +
                "\n" +
                "        let eventWebsocket = null;\n" +
                "\n" +
                "        var apiBaseUrl = '" + MyMoodleConfigConstant.FLORA_BACKEND_URL + "';\n" +
                "        var websocketApiBaseUrl = '" + MyMoodleConfigConstant.FLORA_BACKEND_WEBSOCKET_URL + "';\n" +
                "        var mainEditor = null;\n" +
                "        var editors = {}; //多个不同的侧边栏editor\n" +
                "        \n" +
                "        // 是否展示工具\n" +
                "        var useAnnotationTool = " + configGenericoTemplate.getUseAnnotationTool() + ";\n" +
                "        var useScaffoldTool = " + configGenericoTemplate.getUseScaffoldTool() + ";\n" +
                "        var useGPTScaffoldTool = " + configGenericoTemplate + ";\n" +
                "\n" +
                "        var srlModel = '" + configGenericoTemplate.getSrlModel() + "';    // copes\n" +
                "        var gptScaffoldRole = '" + configGenericoTemplate.getGptScaffoldRole() + "';\n" +
                "        var gptScaffoldRoleDescription = '" + configGenericoTemplate.getGptScaffoldRoleDescription() + "';\n" +
                "        var gptScaffoldPromptIncludeEssay = " + configGenericoTemplate.getGptScaffoldPromptIncludeEssay() + ";\n" +
                "        var gptScaffoldPromptTemplate = " + configGenericoTemplate.getGptScaffoldPromptTemplate() + ";\n" +
                "        var gptScaffoldBackgroundFileNameList = ['" + Arrays.stream(configGenericoTemplate.getGptScaffoldBackgroundFilenameList().split(";;;")).collect(Collectors.joining("', '")) + "'];\n" +
                "        var gptScaffoldParameters = " + Arrays.toString(configGenericoTemplate.getGptScaffoldParameters().split(";;;")) + "; //  response max token, n, temperature/10\n" +
                "\n" +
                "        var gptScaffoldNeedCheckSubActionPrompt = " + JSONUtil.toJsonStr(subActionList) + ";\n" +
                "\n" +
                "        var gptScaffoldNeedCheckSavePlannerSelectIndexPrompt = ['" + Arrays.stream(configGenericoTemplate.getGptScaffoldNeedCheckSavePlannerSelectIndexPrompt().split(";;;")).collect(Collectors.joining("', '"))+ "']; // 确保此处数量和planner 选项数量一致\n" +
                "\n" +
                "        var testISDIMUName = '" + configGenericoTemplate.getTestIsdimuName() + "';\n" +
                "        var preTestName = '" + configGenericoTemplate.getPreTestName() + "';\n" +
                "        var hasTakePreviousStudyTestName = '" + configGenericoTemplate.getHasTakePreviousStudyTestName() + "';\n" +
                "\n" +
                "        var testISDIMUCourseId = " + configGenericoTemplate.getTestIsdimuCourseId() + ";\n" +
                "        var hasTakePreviousStudyTestNameCourseId = " + configGenericoTemplate.getHasTakePreviousStudyTestNameCourseId() + ";\n" +
                "        var pretestNameCourseId = " + configGenericoTemplate.getPreTestNameCourseId() + ";\n" +
                "\n" +
                "        var pretestGradesPrompt = " + JSONUtil.toJsonStr(MyBeanCopyUtils.copyBeanList(pretestGradePromptList, ThresholdPromptVO.class)) + ";\n" +
                "        var isdimuScorePrompt = " + JSONUtil.toJsonStr(MyBeanCopyUtils.copyBeanList(isdimuScorePromptList, ThresholdPromptVO.class)) + ";\n" +
                "\n" +
                "        var userTakePreviousStudyPrompt = '" + configGenericoTemplate.getUserTakePreviousStudyPrompt() + "';\n" +
                "\n" +
                "        var classifySentenceBackgroundFileNameList = ['" + Arrays.stream(configGenericoTemplate.getClassifySentenceBackgroundFileNameList().split(";;;")).collect(Collectors.joining("', '")) + "'];\n" +

                "        var gptScaffoldNeedCheckSRLProcessPrompt = " + JSONUtil.toJsonStr(allSRLProcessPromptVOList) + ";\n" +
                "\n" +
                "\n" +
                "\n" +
                "        var useWriteEssayTool = " + configGenericoTemplate.getUseWriteEssayTool() + ";\n" +
                "\n" +
//                "        var useCollaborativeWriteEssayTool = " + request.getUseCollaborativeWriteEssayTool() + ";\n" +
                "        var useWriteEssayWordCountButton = " + configGenericoTemplate.getUseWriteEssayWordCountButton() + ";\n" +
                "        var useCollaborativeWriteEssayTool = " + configGenericoTemplate.getUseCollaborativeWriteEssayTool() + ";\n" +
                "        var useCollaborativeWriteEssayWordCountButton = " + configGenericoTemplate.getUseCollaborativeWriteEssayWordCountButton() + ";\n" +
                "        var includeChatgptToCollaborativeWriteEssay = " + configGenericoTemplate.getIncludeChatgptToCollaborativeWriteEssay() + ";\n" +
                "\n" +
                "        var usePlannerTool = " + configGenericoTemplate.getUsePlannerTool() + ";\n" +
                "        var useChatgptTool = " + configGenericoTemplate.getUseChatgptTool() + ";\n" +
                "\n" +

                "        var chatgptBackgroundFileNameList = ['" + Arrays.stream(configGenericoTemplate.getChatgptBackgroundFileNameList().split(";;;")).collect(Collectors.joining("', '")) + "']; // add pdf file names here    TODO 使其可以支持docx 和pdf\n" +
                "        var chatgptRoleDescription = '" + configGenericoTemplate.getChatgptRoleDescription() + "';\n" +
                "        var chatgptRole = '" + configGenericoTemplate.getChatgptRole() + "';\n" +
                "        var chatgptPromptIncludeEssay = " + configGenericoTemplate.getChatgptPromptIncludeEssay() + ";\n" +

                "        var chatgptParameters = " + Arrays.toString(configGenericoTemplate.getChatgptParameters().split(";;;")) + "; //  response max token, n, temperature/10\n" +
                "\n" +
                "        var useChecklistTool = " + configGenericoTemplate.getUseChecklistTool() + ";\n" +
                "        var useChecklistToolGrammar = " + configGenericoTemplate.getUseChecklistToolGrammar() + ";\n" +
                "        var useChecklistToolAcademic = " + configGenericoTemplate.getUseChecklistToolAcademic() + ";\n" +
                "        var useChecklistToolOriginality = " + configGenericoTemplate.getUseChecklistToolOriginality() + ";\n" +
                "        var useChecklistToolClassification = " + configGenericoTemplate.getUseChecklistToolClassification() + ";\n" +
                "        var useDictionaryTool = " + configGenericoTemplate.getUseDictionaryTool() + ";\n" +
                "        var dictionarySourceLanguage = " + configGenericoTemplate.getDictionarySourceLanguage() + ";\n" +
                "        var dictionaryTargetLanguage = " + configGenericoTemplate.getDictionaryTargetLanguage() + ";\n" +
                "        var useTeacherChat = " + configGenericoTemplate.getUseTeacherChat() + ";\n" +
                "        var useTimerTool = " + configGenericoTemplate.getUseTimerTool() + ";\n" +
                "\n" +
                "        var useVideoRecordingTool = " + configGenericoTemplate.getUseVideoRecordingTool() + ";\n" +
                "\n" +
                "        var toolsLanguage = '" + configGenericoTemplate.getToolsLanguage() + "';\n" +
                "\n" +
                "        const toolList1 = [];\n" +
                "\n" +
//                "        // var studyName = \"cella_oulu_task2_ai_in_edu_groupB\"; //change to \"uniSA\" if needed\n" +
//                "        var studyName = \"cella_ru_s2_essay1\"; //change to \"uniSA\" if needed\n" +
                "        function loadScript(url) {\n" +
                "            let currentDate = new Date();\n" +
                "\n" +
                "            // Get the year, month, and day from the date object\n" +
                "            let year = currentDate.getFullYear();\n" +
                "            let month = currentDate.getMonth() + 1; // Month is 0-indexed\n" +
                "            let day = currentDate.getDate();\n" +
                "\n" +
                "            // Pad the month and day with leading zeros if they are less than 10\n" +
                "            month = month < 10 ? '0' + month : month;\n" +
                "            day = day < 10 ? '0' + day : day;\n" +
                "\n" +
                "            // Concatenate the year, month, and day to form the desired format\n" +
                "            let formattedDate = year.toString() + month.toString() + day.toString();\n" +
                "\n" +
                "            var script = document.createElement(\"script\");\n" +
                "            script.type = \"text/javascript\";\n" +
                "            script.src = url + \"?v=\" + formattedDate;\n" +
                "            script.defer = true;\n" +
                "            script.async = false;\n" +
                "            document.head.appendChild(script);\n" +
                "        }\n" +
                "        function getURLParameters(url) {\n" +
                "            var params = {};\n" +
                "            var parser = document.createElement('a');\n" +
                "            parser.href = url;\n" +
                "            var query = parser.search.substring(1);\n" +
                "            var vars = query.split('&');\n" +
                "            for (var i = 0; i < vars.length; i++) {\n" +
                "                var pair = vars[i].split('=');\n" +
                "                params[pair[0]] = decodeURIComponent(pair[1]);\n" +
                "            }\n" +
                "            return params; // string 类型\n" +
                "        }\n" +
                "        let navTagA = document.querySelector(\"#page-navbar>nav>ol>li>a\");\n" +
                "        var currentCourseId = 0;\n" +
                "        if (navTagA != null) {\n" +
                "            console.log(navTagA.href);\n" +
                "            currentCourseId = getURLParameters(navTagA.href).id;\n" +
                "            // navTagA.href = \"#\";\n" +
                "            navTagA.onclick = \"return false;\";\n" +
                "        }\n" +
                "    </script>\n" +
                "    <script>\n" +
                "        loadScript(\"/flora/js/text.js\");\n" +
                "        loadScript(\"/flora/js/i18n_function.js\");\n" +
                "        loadScript(\"/flora/js/generateToolsHtml.js\");\n" +
                "        loadScript(\"/flora/js/tools_00common.js\");\n" +
                "\n" +
                "        if(useAnnotationTool) loadScript(\"/flora/js/tools_01annotation.js\");\n" +
                "        if(useScaffoldTool) loadScript(\"/flora/js/tools_02scaffolding.js\");\n" +
                "        if(useWriteEssayTool) loadScript(\"/flora/js/tools_03essay_writing.js\");\n" +
                "        if(usePlannerTool) loadScript(\"/flora/js/tools_04planner.js\");\n" +
                "        if(useChatgptTool) loadScript(\"/flora/js/tools_05chatgpt.js\");\n" +
                "        if(useChecklistTool) loadScript(\"/flora/js/tools_06checklist.js\");\n" +
                "        if(useVideoRecordingTool) {\n" +
                "            loadScript(\"/flora/js/MediaStreamRecorder.js\");\n" +
                "            loadScript(\"/flora/js/tools_09record_video.js\");\n" +
                "        }\n" +
                "\n" +
                "        // if(useTimerTool) 不确定timer是否需要按需加载\n" +
                "        loadScript(\"/flora/js/tools_08timer.js\");\n" +
                "        if(useDictionaryTool) loadScript(\"/flora/js/tools_10dictionary.js\");\n" +
                "        if(useTeacherChat) loadScript(\"/flora/js/tools_11teacherchat.js\");\n" +
                "\n" +
                "\n" +
                "        // if (useCollaborativeWriteEssayTool) loadScript(\"/flora/js/tools_12collaboratewrite.js\");\n" +
                "\n" +
                "        if(useGPTScaffoldTool) loadScript(\"/flora/js/tools_07gpt_scaffolding.js\");\n" +
                "        \n" +
                "        loadScript(\"/flora/js/tools_08timer.js\");\n" +
                "        loadScript(\"/flora/js/setupInstrumentationTools.js\");\n" +
                "\n" +
                "\n" +
                "    </script>\n" +
                "\n" +
                "<!--end_PLUGINS_GENERICO_TEMPLATE_BODY-->";

        return template;*/
    }

    @Override
    public String generateGenericoBody(AddUpdateToolsConfigVO request) {
        log.info(request.getAgentsConfig().toString());

        String template = "<!--start_PLUGINS_GENERICO_TEMPLATE_BODY-->\n" +
                "\n" +
                "    <script src=\"/flora/js/jquery.min.js\"></script>\n" +
                "    <script src=\"/flora/js/etherpad.js\"></script>\n" +
                "    <script src=\"/flora/js/diff.js\"></script>\n" +
                "    <link href=\"/flora/css/bootstrap.min.css\" rel=\"stylesheet\"/>\n" +
                "    <script src=\"/flora/js/bootstrap.bundle.min.js\"></script>\n" +
                "    <script src=\"/flora/js/quill.min.js\"></script>\n" +
                "    <script src=\"/flora/js/flipdown.min.js\"></script>\n" +
                "\n" +
                "    <script>\n" +
                "        var currentRange = null;\n" +
                "        var whetherDoHighlight = false;\n" +
                "        var saveHighlight = null;\n" +
                "        var saveHighlightText = '';\n" +
                "\n" +
                "        var totalMinutes = " + request.getTotalMinutes() + ";\n" +
                "        var unlimitedTime = " + request.getUnlimitedTime() + ";\n" +
                "        var hintMinutesBeforeEnd = " + request.getHintMinutesBeforeEnd() + ";\n" +
                "\n" +
                "        var annotationTakeNoteLabel = '" + request.getAnnotationTakeNoteLabel() + "';\n" +
                "        var annotationLabelColors = " + JSONUtil.toJsonStr(request.getAnnotationLabelColors()) + ";\n" +
                "\n" +

                "        var scaffoldContent = " + JSONUtil.toJsonStr(request.getScaffoldingContent()) + ";\n" +
                "        var plannerSelectStrategyHint = '" + request.getPlannerSelectStrategyHint() + "';\n" +
                "        var plannerAllocateTimeHint = '" + request.getPlannerAllocateTimeHint() + "';\n" +
                "        var plannerSelectSkillsHint = '" + request.getPlannerSelectSkillsHint() + "';\n" +
                "        var plannerSavePlanHint = '" + request.getPlannerSavePlanHint() + "';\n" +
                "\n" +
                "        var plannerAllStrategy = " + JSONUtil.toJsonStr(request.getPlannerAllStrategy()) +
                "\n" +
                "        var defaultStep3ReadingStrategy = ['" + request.getDefaultStep3ReadingStrategy().stream().collect(Collectors.joining("', '")) + "'];\n" +
                "        var defaultStep3ReadingInstruction = '" + request.getPlannerReadingInstruction() + "';\n" +
                "        var defaultStep3WritingStrategy = ['" + request.getDefaultStep3WritingStrategy().stream().collect(Collectors.joining("', '")) + "'];\n" +
                "        var defaultStep3WritingInstruction = '" + request.getPlannerWritingInstruction() + "';\n" +
                "\n" +
                "        var customiseStep2Instruction = '" + request.getPlannerCustomisePlanInstruction() + "';\n" +
                "\n" +
                "\n" +
                "        let eventWebsocket = null;\n" +
                "        let teacherChatWebsocket = null;\n" +
                "\n" +
                // todo 现在先用replace凑合把http改成https，之后找一下是在哪改的这个constant
                "        var apiBaseUrl = '" + MyMoodleConfigConstant.FLORA_BACKEND_URL.replace("http:", "https:") + "';\n" +
                "        var websocketApiBaseUrl = '" + MyMoodleConfigConstant.FLORA_BACKEND_WEBSOCKET_URL.replace("ws:", "wss:") + "';\n" +
                "        var mainEditor = null;\n" +
                "        var editors = {}; //多个不同的侧边栏editor\n" +
                "        \n" +
                "        // 是否展示工具\n" +
                "        var useAnnotationTool = " + request.getUseAnnotationTool() + ";\n" +
                "        var useScaffoldTool = " + request.getUseScaffoldTool() + ";\n" +
                "        var useGPTScaffoldTool = " + request.getUseGPTScaffoldTool() + ";\n" +
                "\n" +
                "        var srlModel = '" + request.getSrlModel() + "';    // copes\n" +
                "        var gptScaffoldRole = '" + request.getGptScaffoldRole() + "';\n" +
                "        var gptScaffoldRoleDescription = '" + request.getGptScaffoldRoleDescription() + "';\n" +
                "        var gptScaffoldPromptIncludeEssay = " + request.getGptScaffoldPromptIncludeEssay() + ";\n" +
                "        var gptScaffoldPromptTemplate = `" + request.getGptScaffoldPromptTemplate() + "`;\n" +
                "        var gptScaffoldBackgroundFileNameList = ['" + request.getGptScaffoldBackgroundFileNameList().stream().collect(Collectors.joining("', '")) + "'];\n" +
                "        var gptScaffoldParameters = [" + request.getGptScaffoldParametersMaxResponseToken() + ", " + request.getGptScaffoldParametersN() + ", " + request.getGptScaffoldParametersTemperature() + "]; //  response max token, n, temperature/10\n" +
                "\n" +
                "        var gptScaffoldNeedCheckSubActionPrompt = " + JSONUtil.toJsonStr(request.getGptScaffoldNeedCheckSubActionPrompt()) + ";\n" +
                "\n" +
                "        var gptScaffoldNeedCheckSavePlannerSelectIndexPrompt = ['" + request.getGptScaffoldNeedCheckSavePlannerSelectIndexPrompt().stream().collect(Collectors.joining("', '")) + "']; // 确保此处数量和planner 选项数量一致\n" +
                "\n" +
                "        var testISDIMUName = '" + request.getTestIsdimuName() + "';\n" +
                "        var preTestName = '" + request.getPreTestName() + "';\n" +
                "        var hasTakePreviousStudyTestName = '" + request.getHasTakePreviousStudyTestName() + "';\n" +
                "\n" +
                "        var testISDIMUCourseId = " + request.getTestIsdimuCourseId() + ";\n" +
                "        var hasTakePreviousStudyTestNameCourseId = " + request.getHasTakePreviousStudyTestNameCourseId() + ";\n" +
                "        var pretestNameCourseId = " + request.getPreTestNameCourseId() + ";\n" +
                "\n" +
                "        var pretestGradesPrompt = " + JSONUtil.toJsonStr(request.getPreTestGradesPrompt()) + ";\n" +
                "        var isdimuScorePrompt = " + JSONUtil.toJsonStr(request.getIsdimuScorePrompt()) + ";\n" +
                "\n" +
                "        var userTakePreviousStudyPrompt = '" + request.getUserTakePreviousStudyPrompt() + "';\n" +
                "\n" +
                "        var classifySentenceBackgroundFileNameList = ['" + request.getClassifySentenceBackgroundFileNameList().stream().collect(Collectors.joining("', '")) + "'];\n" +

                "        var gptScaffoldNeedCheckSRLProcessPrompt = " + JSONUtil.toJsonStr(request.getGptScaffoldNeedCheckSRLProcessPrompt()) + ";\n" +
                "\n" +
                "\n" +
                "\n" +
                "        var useWriteEssayTool = " + request.getUseWriteEssayTool() + ";\n" +
                "\n" +
//                "        var useCollaborativeWriteEssayTool = " + request.getUseCollaborativeWriteEssayTool() + ";\n" +
                "        var useWriteEssayWordCountButton = " + request.getUseWriteEssayWordCountButton() + ";\n" +
                "        var useCollaborativeWriteEssayTool = " + request.getUseCollaborativeWriteEssayTool() + ";\n" +
                "        var useCollaborativeWriteEssayWordCountButton = " + request.getUseCollaborativeWriteEssayWordCountButton() + ";\n" +
                "        var includeChatgptToCollaborativeWriteEssay = " + request.getIncludeChatgptToCollaborativeWriteEssay() + ";\n" +
                "\n" +
                "        var usePlannerTool = " + request.getUsePlannerTool() + ";\n" +
                "        var useChatgptTool = " + request.getUseChatgptTool() + ";\n" +
                "\n" +
                // todo: 这些变量暂时没有提供输入的地方, 暂时用这些值站位，不加的话从html转json会出问题
                "var useChatgptRating = false;\n" +
                "var useChatgptAssistantTool = false;\n" +
                "var useChatgptAssistantRating  = false;\n" +
                "var useDoctorScaffold   = false;\n" +
                "var useConsultationSubmitTool    = false;\n" +
                "var medicalConsultAssistanceType = \"jisan\";\n" +
                "var patientRoleDescription = \"patientRoleDescription placeholder\";\n" +
                "var scaffoldRoleDescription  = \"scaffoldRoleDescription placeholder\";\n" +
                "var assessmentRoleDescription=\"\";\n" +
                "var includeSurveyToChatgptPrompt = []; \n" +
                "var studyName = \"studyName placeholder\"; \n" +
                "var agentsConfig = " + JSONUtil.toJsonStr(request.getAgentsConfig()) + "; \n" +
                "        var chatgptBackgroundFileNameList = ['" + request.getChatgptBackgroundFileNameList().stream().collect(Collectors.joining("', '")) + "']; // add pdf file names here    TODO 使其可以支持docx 和pdf\n" +
                "        var chatgptRoleDescription = '" + request.getChatgptRoleDescription() + "';\n" +
                "        var chatgptRole = '" + request.getChatgptRole() + "';\n" +
                "        var chatgptPromptIncludeEssay = " + request.getChatgptPromptIncludeEssay() + ";\n" +
                 // removed
                "        var chatgptParameters = [" + request.getChatgptParametersMaxResponseToken() + ", " + request.getChatgptParametersN() + ", " + request.getChatgptParametersTemperature() + "]; //  response max token, n, temperature/10\n" +
                "\n" +
                "        var useChecklistTool = " + (request.getUseChecklistToolGrammar() || request.getUseChecklistToolAcademic() || request.getUseChecklistToolOriginality() || request.getUseChecklistToolClassification()) + ";\n" +
                "        var useChecklistToolGrammar = " + request.getUseChecklistToolGrammar() + ";\n" +
                "        var useChecklistToolAcademic = " + request.getUseChecklistToolAcademic() + ";\n" +
                "        var useChecklistToolOriginality = " + request.getUseChecklistToolOriginality() + ";\n" +
                "        var useChecklistToolClassification = " + request.getUseChecklistToolClassification() + ";\n" +
                "        var useDictionaryTool = " + request.getUseDictionaryTool() + ";\n" +
                "        var dictionarySourceLanguage = '" + request.getDictionarySourceLanguage() + "';\n" +
                "        var dictionaryTargetLanguage = '" + request.getDictionaryTargetLanguage() + "';\n" +
                "        var useTeacherChat = " + request.getUseTeacherChat() + ";\n" +
                "        var useTimerTool = " + request.getUseTimerTool() + ";\n" +
                "\n" +
                "        var useVideoRecordingTool = " + request.getUseVideoRecordingTool() + ";\n" +
                "\n" +
                "        var toolsLanguage = '" + request.getToolsLanguage() + "';\n" +
                "\n" +
                "        const toolList1 = [];\n" +
                "\n" +
//                "        // var studyName = \"cella_oulu_task2_ai_in_edu_groupB\"; //change to \"uniSA\" if needed\n" +
//                "        var studyName = \"cella_ru_s2_essay1\"; //change to \"uniSA\" if needed\n" +
                "        function loadScript(url) {\n" +
                "            let currentDate = new Date();\n" +
                "\n" +
                "            // Get the year, month, and day from the date object\n" +
                "            let year = currentDate.getFullYear();\n" +
                "            let month = currentDate.getMonth() + 1; // Month is 0-indexed\n" +
                "            let day = currentDate.getDate();\n" +
                "\n" +
                "            // Pad the month and day with leading zeros if they are less than 10\n" +
                "            month = month < 10 ? '0' + month : month;\n" +
                "            day = day < 10 ? '0' + day : day;\n" +
                "\n" +
                "            // Concatenate the year, month, and day to form the desired format\n" +
                "            let formattedDate = year.toString() + month.toString() + day.toString();\n" +
                "\n" +
                "            var script = document.createElement(\"script\");\n" +
                "            script.type = \"text/javascript\";\n" +
                "            script.src = url + \"?v=\" + formattedDate;\n" +
                "            script.defer = true;\n" +
                "            script.async = false;\n" +
                "            document.head.appendChild(script);\n" +
                "        }\n" +
                "        function getURLParameters(url) {\n" +
                "            var params = {};\n" +
                "            var parser = document.createElement('a');\n" +
                "            parser.href = url;\n" +
                "            var query = parser.search.substring(1);\n" +
                "            var vars = query.split('&');\n" +
                "            for (var i = 0; i < vars.length; i++) {\n" +
                "                var pair = vars[i].split('=');\n" +
                "                params[pair[0]] = decodeURIComponent(pair[1]);\n" +
                "            }\n" +
                "            return params; // string 类型\n" +
                "        }\n" +
                "        let navTagA = document.querySelector(\"#page-navbar>nav>ol>li>a\");\n" +
                "        var currentCourseId = 0;\n" +
                "        if (navTagA != null) {\n" +
                "            console.log(navTagA.href);\n" +
                "            currentCourseId = getURLParameters(navTagA.href).id;\n" +
                "            // navTagA.href = \"#\";\n" +
                "            navTagA.onclick = \"return false;\";\n" +
                "        }\n" +
                "    </script>\n" +
                "    <script>\n" +
                "        loadScript(\"/flora/js/text.js\");\n" +
                "        loadScript(\"/flora/js/i18n_function.js\");\n" +
                "        loadScript(\"/flora/js/generateToolsHtml.js\");\n" +
                "        loadScript(\"/flora/js/tools_00common.js\");\n" +
                "\n" +
                "        if(useAnnotationTool) loadScript(\"/flora/js/tools_01annotation.js\");\n" +
                "        if(useScaffoldTool) loadScript(\"/flora/js/tools_02scaffolding.js\");\n" +
                "        if(useWriteEssayTool) loadScript(\"/flora/js/tools_03essay_writing.js\");\n" +
                "        if(usePlannerTool) loadScript(\"/flora/js/tools_04planner.js\");\n" +
                "        if(useChatgptTool) loadScript(\"/flora/js/tools_05chatgpt.js\");\n" +
                "        if(useChecklistTool) loadScript(\"/flora/js/tools_06checklist.js\");\n" +
                "        if(useVideoRecordingTool) {\n" +
                "            loadScript(\"/flora/js/MediaStreamRecorder.js\");\n" +
                "            loadScript(\"/flora/js/tools_09record_video.js\");\n" +
                "        }\n" +
                "\n" +
                "        // if(useTimerTool) 不确定timer是否需要按需加载\n" +
                "        if(useDictionaryTool) loadScript(\"/flora/js/tools_10dictionary.js\");\n" +
                "        if(useTeacherChat) loadScript(\"/flora/js/tools_11teacherchat.js\");\n" +
                "\n" +
                "\n" +
                "        // if (useCollaborativeWriteEssayTool) loadScript(\"/flora/js/tools_12collaboratewrite.js\");\n" +
                "\n" +
                "        if(useGPTScaffoldTool) loadScript(\"/flora/js/tools_07gpt_scaffolding.js\");\n" +
                "        \n" +
                "        loadScript(\"/flora/js/tools_08timer.js\");\n" +
                "        loadScript(\"/flora/js/setupInstrumentationTools.js\");\n" +
                "\n" +
                "\n" +
                "    </script>\n" +
                "\n" +
                "<!--end_PLUGINS_GENERICO_TEMPLATE_BODY-->";


//        log.info(template);
        return template;
    }

    @Override
    public void updateNewGenericoTemplateFloraDB(AddUpdateToolsConfigVO request) {
        ConfigGenericoTemplate configGenericoTemplate = MyBeanCopyUtils.copyBean(request, ConfigGenericoTemplate.class);

        setupConfigGenericoTemplateValues(configGenericoTemplate, request);

        Long configGenericoTemplateId = configGenericoTemplate.getId();

        // 先删除 再添加一次
        deleteOtherTemplateConfigs(configGenericoTemplateId);

        setupOtherGenericoTemplateConfigs(configGenericoTemplateId, request);

        this.updateById(configGenericoTemplate);
        log.info("update generico template successfully into flora DB");
    }

    @Override
    public Integer deleteGenericoTemplateById(Long id) {
        try {
            ConfigGenericoTemplate configGenericoTemplate = this.getById(id);
            this.removeById(id);
            deleteOtherTemplateConfigs(id);

            return configGenericoTemplate.getGenericoTemplateIndex();
        } catch (Exception e) {
            return 0;
        }

    }



    private void deleteOtherTemplateConfigs(Long id) {
        QueryWrapper<ConfigGptScaffoldSubActionOrSrlProcess> queryWrapperConfigGptScaffoldSubActionOrSrlProcess = new QueryWrapper<>();
        queryWrapperConfigGptScaffoldSubActionOrSrlProcess.eq("config_generico_template_id", id);
        iConfigGptScaffoldSubActionOrSrlProcessService.remove(queryWrapperConfigGptScaffoldSubActionOrSrlProcess);

        QueryWrapper<ConfigIsdimuScorePrompt> queryWrapperConfigIsdimuScorePrompt = new QueryWrapper<>();
        queryWrapperConfigIsdimuScorePrompt.eq("config_generico_template_id", id);
        iConfigIsdimuScorePromptService.remove(queryWrapperConfigIsdimuScorePrompt);

        QueryWrapper<ConfigPlanner> queryWrapperConfigPlanner = new QueryWrapper<>();
        queryWrapperConfigPlanner.eq("config_generico_template_id", id);
        iConfigPlannerService.remove(queryWrapperConfigPlanner);

        QueryWrapper<ConfigPretestGradePrompt> queryWrapperConfigPretestGradePrompt = new QueryWrapper<>();
        queryWrapperConfigPretestGradePrompt.eq("config_generico_template_id", id);
        iConfigPretestGradePromptService.remove(queryWrapperConfigPretestGradePrompt);

        QueryWrapper<ConfigRuleBasedScaffold> queryWrapperConfigRuleBasedScaffold = new QueryWrapper<>();
        queryWrapperConfigRuleBasedScaffold.eq("config_generico_template_id", id);
        iConfigRuleBasedScaffoldService.remove(queryWrapperConfigRuleBasedScaffold);
    }


    private String[] splitOneDimArray(String temp) {
        return temp.substring(1, temp.length() - 1).split(", ");
    }
    private String[][] splitTwoDimArray(String temp) {
        String[] dim1 = temp.substring(2, temp.length() - 2).split("\\], \\[");
        List<String[]> dim1List = new ArrayList<>();
        for (String s : dim1) {
            dim1List.add(s.split(", "));
        }
        return dim1List.toArray(new String[dim1List.size()][]);
    }

    private Map<String, String> extractVariables(String jsCode) {
        Map<String, String> result = new HashMap<>();
        // 正则表达式用于匹配 JavaScript 变量声明
        Pattern pattern = Pattern.compile("\\s\\svar\\s+(\\w+)\\s+=\\s+([^;]+);");  //"var\\s+(\\w+)\\s+=\\s+([^;]+);"         "var gptScaffoldPromptTemplate = `([\\s\\S]*?)`;"
        Matcher matcher = pattern.matcher(jsCode);
        while (matcher.find()) {
            // 第一个捕获组是变量名，第二个捕获组是变量值
            result.put(matcher.group(1), matcher.group(2).trim().replace("'", "").replace("\"", ""));
        }
        return result;
    }

    private Map<String, String> extractJson(String jsCode) {
        Map<String, String> result = new HashMap<>();
        // 正则表达式用于匹配 JavaScript 变量声明
        Pattern pattern = Pattern.compile("\\s\\svar\\s+(\\w+)\\s+=\\s+([^;]+);");  //"var\\s+(\\w+)\\s+=\\s+([^;]+);"         "var gptScaffoldPromptTemplate = `([\\s\\S]*?)`;"
        Matcher matcher = pattern.matcher(jsCode);
        while (matcher.find()) {
            // 第一个捕获组是变量名，第二个捕获组是变量值
            result.put(matcher.group(1), matcher.group(2).trim());
        }
        return result;
    }

    private String extractGptScaffoldPromptTemplate(String jsCode, String regex) {
//        Map<String, String> result = new HashMap<>();
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(jsCode);
        while (matcher.find()) {
            return matcher.group(1);
        }
        return "";
    }


}
