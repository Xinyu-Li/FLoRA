package com.monash.flora_backend.service_moodle.impl;

import cn.hutool.core.util.StrUtil;
import com.baomidou.dynamic.datasource.annotation.DS;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.monash.flora_backend.constant.MyMoodleConfigConstant;
import com.monash.flora_backend.dao.entity.MdlConfigPlugins;
import com.monash.flora_backend.dao.mapper.MdlConfigPluginsMapper;
import com.monash.flora_backend.service_moodle.IMdlConfigPluginsService;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * ClassName: MdlConfigPluginsServiceImpl
 * Description:
 *
 * @author Xinyu Li
 * @since 12/31/2022 1:18 PM
 */
@Service
@Slf4j
@DS("slave_1")
public class MdlConfigPluginsServiceImpl extends ServiceImpl<MdlConfigPluginsMapper, MdlConfigPlugins> implements IMdlConfigPluginsService {
    private final String[] filterGenericoTemplatePartNameList = {
            "templatekey_", "templatename_", "templateversion_", "templateinstructions_",
            "template_", "templateend_", "templatedefaults_", "templaterequire_js_",
            "templaterequire_js_shim_", "template_amd_", "templatescript_", "uploadjs",
            "uploadjs_shim_", "templaterequire_css_", "templatestyle_", "uploadcss",
            "dataset_", "datasetvars_", "templatealternate_", "templatealternate_end_"};
//    public boolean updateGenericoDB(String name, String value) {
//
//        QueryWrapper<MdlConfigPlugins> queryWrapper = new QueryWrapper<>();
//        queryWrapper.eq("plugin", MyMoodleConfigConstant.MDL_CONFIG_PLUGINS_GENERICO_ATTR_PLUGIN).eq("name", name).last("limit 1");
//        MdlConfigPlugins mdlConfigPlugins = super.getOne(queryWrapper);
//
//        mdlConfigPlugins.setValue(value);
//
//        return super.updateById(mdlConfigPlugins);
//    }

//    @Override
//    public void updateGenericoTemplate(int templateIndex, String templateBody, String studyName) {
//        updateGenericoDB("template_" + templateIndex, templateBody);
//        updateGenericoDB("templatekey_" + templateIndex, "floratool_" + studyName);
//        updateGenericoDB("templatename_" + templateIndex, "floratool_" + studyName);
//    }

    @Override
    public Integer findTheLastEmptyTemplateIndex() {
        QueryWrapper<MdlConfigPlugins> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("plugin", MyMoodleConfigConstant.MDL_CONFIG_PLUGINS_GENERICO_ATTR_PLUGIN).likeRight("name", "templatename").orderByAsc("id");

        int resultIndex = -1;
        boolean found = false;
        List<MdlConfigPlugins> mdlConfigPluginsList = super.list(queryWrapper);

        for (MdlConfigPlugins mdlConfigPlugins : mdlConfigPluginsList) {
            if (!StrUtil.isEmpty(mdlConfigPlugins.getValue())) {
                resultIndex = Integer.parseInt(mdlConfigPlugins.getName().split("_")[1]);
                continue;
            }
            resultIndex = Integer.parseInt(mdlConfigPlugins.getName().split("_")[1]);
            found = true;
            break;
        }

//        if (!mdlConfigPluginsList.isEmpty()) {
//            resultIndex = Integer.parseInt(mdlConfigPluginsList.get(mdlConfigPluginsList.size() - 1).getName().split("_")[1]);
//        }
        if(found)
            return resultIndex;
        else
            return resultIndex + 1;    // if result index equals to the last template id, this means all templates are full, so +1.
    }

    @Override
    public void addNewGenericoTemplateMoodleDB(String genericoTemplateBody, String templateName, Integer latestIndex ) {
        // 添加新的
//        MdlConfigPlugins maxCountVO = getMaximumTemplate();
//        int totalCount = Integer.parseInt(maxCountVO.getValue());
//        if (latestIndex <= totalCount) {
            //修改已有的
            updateGenericoTemplateMoodleDB(latestIndex, genericoTemplateBody, templateName);
//        } else {

//        }
    }

    @Override
    public void updateGenericoTemplateMoodleDB(Integer templateIndex, String genericoTemplateBody, String templateName) {
//        updateGenericoDB("template_" + templateIndex, genericoTemplateBody);
//        updateGenericoDB("templatekey_" + templateIndex, "floratool_" + templateName);
//        updateGenericoDB("templatename_" + templateIndex, "floratool_" + templateName);
//        updateGenericoDB("template_amd_" + templateIndex, "1");


        Map<String, String> nameMap = Map.of("template_", genericoTemplateBody,
                "templatekey_", MyMoodleConfigConstant.GENERICO_TEMPLATE_PREFIX + templateName,
                "templatename_", MyMoodleConfigConstant.GENERICO_TEMPLATE_PREFIX + templateName);

        QueryWrapper<MdlConfigPlugins> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("plugin", MyMoodleConfigConstant.MDL_CONFIG_PLUGINS_GENERICO_ATTR_PLUGIN).eq("name", "template_" +  + templateIndex).last("limit 1");
        MdlConfigPlugins mdlConfigPluginsName = super.getOne(queryWrapper);

        if (Objects.isNull(mdlConfigPluginsName)) {
            List<MdlConfigPlugins> newMdlConfigPluginsList = new ArrayList<>();
            Arrays.stream(filterGenericoTemplatePartNameList).forEach(name -> {
                MdlConfigPlugins newMdlConfigPlugins = new MdlConfigPlugins();
                newMdlConfigPlugins.setPlugin(MyMoodleConfigConstant.MDL_CONFIG_PLUGINS_GENERICO_ATTR_PLUGIN);
                newMdlConfigPlugins.setName(name + templateIndex);
                newMdlConfigPlugins.setValue("");
                switch (name) {
                    case "templatekey_":
                    case "templatename_":
                        newMdlConfigPlugins.setValue(MyMoodleConfigConstant.GENERICO_TEMPLATE_PREFIX + templateName);
                        break;
                    case "template_":
                        newMdlConfigPlugins.setValue(genericoTemplateBody);
                        break;
                    case "template_amd_":
                        newMdlConfigPlugins.setValue("1");
                        break;
                }
                newMdlConfigPluginsList.add(newMdlConfigPlugins);
            });

            MdlConfigPlugins maxCountVO = getMaximumTemplate();
            int totalCount = Integer.parseInt(maxCountVO.getValue());
            maxCountVO.setValue(String.valueOf(totalCount + 1));
            // 存新的行的同时，扩大template的最大值
            super.updateById(maxCountVO);
            super.saveBatch(newMdlConfigPluginsList);
        }
        else {
            List<MdlConfigPlugins> mdlConfigPluginsList = new ArrayList<>();
            nameMap.forEach((name, value) -> {
                log.info("-----------------name:" + name);
                QueryWrapper<MdlConfigPlugins> queryWrapper2 = new QueryWrapper<>();
                queryWrapper2.eq("plugin", MyMoodleConfigConstant.MDL_CONFIG_PLUGINS_GENERICO_ATTR_PLUGIN).eq("name", name +  + templateIndex).last("limit 1");
                MdlConfigPlugins mdlConfigPlugins = super.getOne(queryWrapper2);

                mdlConfigPlugins.setValue(value);
                mdlConfigPluginsList.add(mdlConfigPlugins);

            });

            log.info("updateGenericoTemplateMoodleDB-----------------");
            super.updateBatchById(mdlConfigPluginsList);
        }
    }

    @Override
    public void deleteGenericoTemplateByIndex(Integer templateIndex) {

        QueryWrapper<MdlConfigPlugins> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("plugin", MyMoodleConfigConstant.MDL_CONFIG_PLUGINS_GENERICO_ATTR_PLUGIN).likeLeft("name", "_" + templateIndex);

        List<MdlConfigPlugins> mdlConfigPluginsList = this.list(queryWrapper);
        mdlConfigPluginsList.forEach(mdlConfigPlugins -> {
            if (Objects.equals(mdlConfigPlugins.getName(), "template_amd_" + templateIndex)) {
                return;
            }
            mdlConfigPlugins.setValue("");
        });

        super.updateBatchById(mdlConfigPluginsList);
    }

    public MdlConfigPlugins getMaximumTemplate() {
        // 获取最大template的设定值
        QueryWrapper<MdlConfigPlugins> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("plugin", MyMoodleConfigConstant.MDL_CONFIG_PLUGINS_GENERICO_ATTR_PLUGIN).eq("name", "templatecount");
        return super.getOne(queryWrapper);
    }
    @Override
    public Map<String, Map<String, String>> getAllGenericoTemplates() {
        MdlConfigPlugins maxCountVO = getMaximumTemplate();
        int totalCount = Integer.parseInt(maxCountVO.getValue());
        QueryWrapper<MdlConfigPlugins> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("plugin", "filter_generico");
        for (String templateFieldName: filterGenericoTemplatePartNameList) {
            queryWrapper.like("name", templateFieldName).or();
        }
        List<MdlConfigPlugins> templateData = super.list(queryWrapper);
        Map<String, Map<String, String>> result = new HashMap<>();
        // formatting the return list
        for (int index = 1; index <= totalCount; index ++){
            Map<String, String> innerMap = new HashMap<>();
            for (String templateFieldName: filterGenericoTemplatePartNameList){
                if(templateFieldName.contains("_"))
                    innerMap.put(templateFieldName + String.valueOf(index), "");
            }
            result.put(String.valueOf(index), innerMap);
        }

        for (MdlConfigPlugins mdlConfigPlugins: templateData) {
            if (mdlConfigPlugins.getName().contains("_")){
                String nameField = mdlConfigPlugins.getName();
                String[] splitArray = nameField.split("_");
                String templateId = splitArray[splitArray.length - 1];
                Map<String, String> innerMap = result.get(templateId);
                innerMap.put(nameField, mdlConfigPlugins.getValue());
            }
        }
        return result;
    }


    /*@Override
    public String generateGenericoBody(ConfigToolsVO configToolsVO) {

        return "<!--start_PLUGINS_GENERICO_TEMPLATE_BODY-->\n\n" +
                "<script src=\"/flora/js/jquery.min.js\"></script>\n" +
                "<link href=\"/flora/css/bootstrap.min.css\" rel=\"stylesheet\"/>\n" +
                "<script src=\"/flora/js/bootstrap.bundle.min.js\"></script>\n" +
                "<!--    <script src=\"/flora/js/jquery-ui.min.js\" id=\"myJqueryUI\" ></script>-->\n" +
                "<script src=\"/flora/js/quill.min.js\"></script>\n" +
                "<script src=\"/flora/js/flipdown.min.js\"></script>\n\n" +
                "<script>\n" +
                "    var currentRange = null;\n" +
                "    var whetherDoHighlight = false;\n" +
                "    var saveHighlight = null;\n" +
                "    var saveHighlightText = '';\n\n\n" +
                "    var studyName = '" + configToolsVO.getStudyName() + "';\n" +
                "    var totalMinutes = " + configToolsVO.getTotalMinutes() + ";\n" +
                "    var unlimitedTime = " + configToolsVO.isUnlimitedTime() + ";\n" +
                "    var hintMinutesBeforeEnd = " + configToolsVO.getHintMinutesBeforeEnd() + "; // 提示学生，当任务快结束时候\n\n" +
                "    var annotationTakeNoteLabel = 'Takenote';" +
                "    var annotationDefaultLabel = ['" + String.join("', '", configToolsVO.getAnnotationDefaultLabel()) + "']; // maximum length设置为10， 自定义标签不能超过9个，第一个note 是必须有的\n" +
                "    var annotationDefaultLabelColor = ['" + String.join("', '", configToolsVO.getAnnotationDefaultLabelColor()) + "'];\n\n" +
                "    var scaffoldShowingTime = [" + Arrays.stream(configToolsVO.getScaffoldShowingTime()).mapToObj(Integer::toString).collect(Collectors.joining(", ")) + "]; // time point   native speaker\n" +
                "    var scaffoldPromptMessage = ['" + String.join("', '", configToolsVO.getScaffoldPromptMessage()) + "'];\n" +
                "    var scaffoldContent = [" + Arrays.stream(configToolsVO.getScaffoldContent()).map(temp -> "['" + String.join("', '", temp) + "']").collect(Collectors.joining(",")) + "];\n\n" +
                "    var plannerOverallStrategy = ['" + String.join("', '", configToolsVO.getPlannerOverallStrategy()) + "'];\n" +
                "    var plannerStep2Task = [" + Arrays.stream(configToolsVO.getPlannerStep2Task()).map(temp -> "['" + String.join("', '", temp) + "']").collect(Collectors.joining(",")) + "];\n" +
                "    var plannerStep2Instruction = ['" + String.join("', '", configToolsVO.getPlannerStep2Instruction()) + "'];\n\n" +
                "    var defaultStep3ReadingStrategy = ['" + String.join("', '", configToolsVO.getDefaultStep3ReadingStrategy()) + "'];\n" +
                "    var defaultStep3ReadingInstruction = '" + configToolsVO.getDefaultStep3ReadingInstruction() + "';\n" +
                "    var defaultStep3WritingStrategy = ['" + String.join("', '", configToolsVO.getDefaultStep3WritingStrategy()) + "'];\n" +
                "    var defaultStep3WritingInstruction = '" + configToolsVO.getDefaultStep3WritingInstruction() + "';\n" +
                "    var customiseStep2Instruction = '" + configToolsVO.getCustomiseStep2Instruction() + "';\n\n" +
                "    let eventWebsocket = null; \n\n" +
                "    var apiBaseUrl = '" + MyMoodleConfigConstant.FLORA_BACKEND_URL + "';\n" +
                "    var websocketApiBaseUrl = '" + MyMoodleConfigConstant.FLORA_BACKEND_WEBSOCKET_URL + "';\n" +
                "    var mainEditor = null;\n" +
                "    var editors = {}; //多个不同的侧边栏editor\n\n" +
                "    // 是否展示工具\n" +
                "    var useAnnotationTool = " + configToolsVO.isUseAnnotationTool() + ";\n" +
                "    var useScaffoldTool = " + configToolsVO.isUseScaffoldTool() + ";\n" +
                "    var useWriteEssayTool = " + configToolsVO.isUseWriteEssayTool() + ";\n" +
                "    var useWriteEssayWordCountButton = " + configToolsVO.isUseWriteEssayWordCountButton() + ";\n" +
                "    var useCollaborativeWriteEssayTool = " + configToolsVO.isUseCollaborativeWriteEssayTool() + ";\n" +
                "    var useCollaborativeWriteEssayWordCountButton = " + configToolsVO.isUseCollaborativeWriteEssayWordCountButton() + ";\n" +
                "    var includeChatgptToCollaborativeWriteEssay = " + configToolsVO.isIncludeChatgptToCollaborativeWriteEssay() + ";\n" +
                "    var usePlannerTool = " + configToolsVO.isUsePlannerTool() + ";\n" +
                "    var useChatgptTool = " + configToolsVO.isUseChatgptTool() + ";\n" +
                "    var includeSurveyToChatgptPrompt = [" + Arrays.stream(configToolsVO.getIncludeSurveyToChatgptPrompt()).mapToObj(Integer::toString).collect(Collectors.joining(", ")) + "];\n" +
                "    var useChecklistTool = " + configToolsVO.isUseChecklistTool() + ";\n" +
                "    var useChecklistToolGrammar = " + configToolsVO.isUseChecklistToolGrammar() + ";\n" +
                "    var useChecklistToolAcademic = " + configToolsVO.isUseChecklistToolAcademic() + ";\n" +
                "    var useChecklistToolOriginality = " + configToolsVO.isUseChecklistToolOriginality() + ";\n" +
                "    var useChecklistToolClassification = " + configToolsVO.isUseChecklistToolClassification() + ";\n" +
                "    var useDictionaryTool = " + configToolsVO.isUseDictionaryTool() + ";\n" +
                "    var dictionarySourceLanguage = '" + configToolsVO.getDictionarySourceLanguage() + "';\n" +
                "    var dictionaryTargetLanguage = '" + configToolsVO.getDictionaryTargetLanguage() + "';\n" +

                "    var useTeacherChat = " + configToolsVO.isUseTeacherChat() + ";\n" +
                "    var useTimerTool = " + configToolsVO.isUseTimerTool() + ";\n" +
                "    var useVideoRecordingTool = " + configToolsVO.isUseVideoRecordingTool() + ";\n" +
                "    var toolsLanguage = " + configToolsVO.getToolsLanguage() + ";\n" +
                "    const toolList1 = [];\n\n" +
                "    function loadScript(url) {\n" +
                "        var script = document.createElement('script');\n" +
                "        script.type = 'text/javascript';\n" +
                "        script.src = url;\n" +
                "        script.defer = true;\n" +
                "        script.async = false;\n" +
                "        document.head.appendChild(script);\n" +
                "    }\n" +
                "    function getURLParameters(url) {\n" +
                "        var params = {};\n" +
                "        var parser = document.createElement('a');\n" +
                "        parser.href = url;\n" +
                "        var query = parser.search.substring(1);\n" +
                "        var vars = query.split('&');\n" +
                "        for (var i = 0; i < vars.length; i++) {\n" +
                "            var pair = vars[i].split('=');\n" +
                "            params[pair[0]] = decodeURIComponent(pair[1]);\n" +
                "        }\n" +
                "        return params; // string 类型\n" +
                "    }\n" +
                "    let navTagAList = document.querySelectorAll('#page-navbar>nav>ol>li a');\n" +
                "    let currentCourseId = 0;\n" +
                "    if (navTagAList != null) {\n" +
                "        navTagAList.forEach(link => {\n" +
                "            if (link.href.includes('course/view.php?id=')) {\n" +
                "                currentCourseId = getURLParameters(link.href).id;\n" +
                "            }\n" +
                "            link.onclick = 'return false';\n" +
                "        });\n" +
                "    }\n" +
                "</script>\n" +
                "\n" +
                "<script>\n" +
                "    loadScript('/flora/js/text.js');\n" +
                "    loadScript('/flora/js/generateToolsHtml.js');\n" +
                "    loadScript('/flora/js/tools_00common.js');\n" +
                "\n" +
                "    if(useAnnotationTool) loadScript('/flora/js/tools_01annotation.js');\n" +
                "    if(useScaffoldTool) loadScript('/flora/js/tools_02scaffolding.js');\n" +
                "    if(useWriteEssayTool) loadScript('/flora/js/tools_03essay_writing.js');\n" +
                "    if(usePlannerTool) loadScript('/flora/js/tools_04planner.js');\n" +
                "    if(useChatgptTool) loadScript('/flora/js/tools_05chatgpt.js');\n" +
                "    if(useChecklistTool) loadScript('/flora/js/tools_06checklist.js');\n" +
                "    if(useVideoRecordingTool) {\n" +
                "        loadScript('/flora/js/MediaStreamRecorder.js');\n" +
                "        loadScript('/flora/js/tools_09record_video.js');\n" +
                "    }\n" +
                "\n" +
                "    // if(useTimerTool) 不确定timer是否需要按需加载\n" +
                "    loadScript('/flora/js/tools_08timer.js');\n" +
                "    if(useDictionaryTool) loadScript('/flora/js/tools_10dictionary.js');\n" +
                "    if(useTeacherChat) loadScript('/flora/js/tools_11teacherchat.js');\n" +
                "\n" +
                "    loadScript('/flora/js/setupInstrumentationTools.js')\n" +
                "    loadScript('/flora/js/i18n_function.js')\n" +
                "</script>\n" +
                "\n" +
                "<!--end_PLUGINS_GENERICO_TEMPLATE_BODY-->";
    }

    @Override
    public ConfigToolsVO convertTemplateStringToConfigToolVO(String templateString, Integer templateIndex) {
        Map<String, String> variables = extractVariables(templateString);

        ConfigToolsVO configToolsVO = new ConfigToolsVO();
        configToolsVO.setTemplateIndex(templateIndex);
        configToolsVO.setStudyName(variables.get("studyName"));
        configToolsVO.setTotalMinutes(Integer.parseInt(variables.get("totalMinutes")));
        configToolsVO.setUnlimitedTime(Boolean.parseBoolean(variables.get("unlimitedTime")));
        configToolsVO.setHintMinutesBeforeEnd(Integer.parseInt(variables.get("hintMinutesBeforeEnd")));


        configToolsVO.setAnnotationDefaultLabel(Arrays.asList(splitOneDimArray(variables.get("annotationDefaultLabel"))));
        configToolsVO.setAnnotationDefaultLabelColor(splitOneDimArray(variables.get("annotationDefaultLabelColor")));
        configToolsVO.setScaffoldShowingTime(Arrays.stream(splitOneDimArray(variables.get("scaffoldShowingTime"))).mapToInt(Integer::parseInt).toArray());
        configToolsVO.setScaffoldPromptMessage(splitOneDimArray(variables.get("scaffoldPromptMessage")));
        configToolsVO.setScaffoldContent(splitTwoDimArray(variables.get("scaffoldContent")));
        configToolsVO.setPlannerOverallStrategy(splitOneDimArray(variables.get("plannerOverallStrategy")));


        configToolsVO.setPlannerStep2Task(splitTwoDimArray(variables.get("plannerStep2Task")));
        configToolsVO.setPlannerStep2Instruction(splitOneDimArray(variables.get("plannerStep2Instruction")));
        configToolsVO.setDefaultStep3ReadingStrategy(splitOneDimArray(variables.get("defaultStep3ReadingStrategy")));
        configToolsVO.setDefaultStep3WritingStrategy(splitOneDimArray(variables.get("defaultStep3WritingStrategy")));

        configToolsVO.setDefaultStep3ReadingInstruction(variables.get("defaultStep3ReadingInstruction"));
        configToolsVO.setDefaultStep3WritingInstruction(variables.get("defaultStep3WritingInstruction"));
        configToolsVO.setCustomiseStep2Instruction(variables.get("customiseStep2Instruction"));


        configToolsVO.setUseAnnotationTool(Boolean.parseBoolean(variables.get("useAnnotationTool")));
        configToolsVO.setUseScaffoldTool(Boolean.parseBoolean(variables.get("useScaffoldTool")));
        configToolsVO.setUseWriteEssayTool(Boolean.parseBoolean(variables.get("useWriteEssayTool")));
        configToolsVO.setUseWriteEssayWordCountButton(Boolean.parseBoolean(variables.get("useWriteEssayWordCountButton")));
        configToolsVO.setUseCollaborativeWriteEssayTool(Boolean.parseBoolean(variables.get("useCollaborativeWriteEssayTool")));
        configToolsVO.setUseCollaborativeWriteEssayWordCountButton(Boolean.parseBoolean(variables.get("useCollaborativeWriteEssayWordCountButton")));
        configToolsVO.setIncludeChatgptToCollaborativeWriteEssay(Boolean.parseBoolean(variables.get("includeChatgptToCollaborativeWriteEssay")));

        configToolsVO.setUsePlannerTool(Boolean.parseBoolean(variables.get("usePlannerTool")));
        configToolsVO.setUseChatgptTool(Boolean.parseBoolean(variables.get("useChatgptTool")));
        configToolsVO.setChatgptPrompt(variables.get("chatgptPrompt"));
        configToolsVO.setIncludeSurveyToChatgptPrompt(Arrays.stream(splitOneDimArray(variables.get("useChatgptTool"))).mapToInt(Integer::parseInt).toArray());


        configToolsVO.setUseChecklistTool(Boolean.parseBoolean(variables.get("useChecklistTool")));
        configToolsVO.setUseChecklistToolGrammar(Boolean.parseBoolean(variables.get("useChecklistToolGrammar")));
        configToolsVO.setUseChecklistToolAcademic(Boolean.parseBoolean(variables.get("useChecklistToolAcademic")));
        configToolsVO.setUseChecklistToolOriginality(Boolean.parseBoolean(variables.get("useChecklistToolOriginality")));
        configToolsVO.setUseChecklistToolClassification(Boolean.parseBoolean(variables.get("useChecklistToolClassification")));

        configToolsVO.setUseDictionaryTool(Boolean.parseBoolean(variables.get("useDictionaryTool")));
        configToolsVO.setDictionarySourceLanguage(variables.get("dictionarySourceLanguage"));
        configToolsVO.setDictionaryTargetLanguage(variables.get("dictionaryTargetLanguage"));


        configToolsVO.setUseTeacherChat(Boolean.parseBoolean(variables.get("useTeacherChat")));
        configToolsVO.setUseTimerTool(Boolean.parseBoolean(variables.get("useTimerTool")));
        configToolsVO.setUseVideoRecordingTool(Boolean.parseBoolean(variables.get("useVideoRecordingTool")));
        return configToolsVO;
    }

    @Override
    public List<ConfigToolsVO> findAllGenericoTemplate() {
        QueryWrapper<MdlConfigPlugins> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("plugin", MyMoodleConfigConstant.MDL_CONFIG_PLUGINS_GENERICO_ATTR_PLUGIN).likeRight("name", "templatekey").likeRight("value", "floratool").orderByAsc("id");

        List<MdlConfigPlugins> mdlConfigPluginsList1 = super.list(queryWrapper);
        List<String> templateBodyNameList = mdlConfigPluginsList1.stream().map(m-> m.getName().replace("key", "")).collect(Collectors.toList());

        QueryWrapper<MdlConfigPlugins> queryWrapperTemplateBody = new QueryWrapper<>();
        queryWrapperTemplateBody.eq("plugin", MyMoodleConfigConstant.MDL_CONFIG_PLUGINS_GENERICO_ATTR_PLUGIN).in("name", templateBodyNameList);
        List<MdlConfigPlugins> mdlConfigPluginsList2 = super.list(queryWrapperTemplateBody);

        List<ConfigToolsVO> configToolsVOList = new ArrayList<>();
//        return mdlConfigPluginsList2.stream().map(MdlConfigPlugins::getValue).collect(Collectors.toList());

        if (!mdlConfigPluginsList2.isEmpty()) {
            // 转换template 的内容为对象
            configToolsVOList = mdlConfigPluginsList2.stream().map(m-> convertTemplateStringToConfigToolVO(m.getValue(), Integer.parseInt(m.getName().substring(m.getName().indexOf('_'))))).collect(Collectors.toList());
        }
        return configToolsVOList;
    }*/
}
