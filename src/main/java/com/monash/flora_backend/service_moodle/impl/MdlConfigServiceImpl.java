package com.monash.flora_backend.service_moodle.impl;

import cn.hutool.core.util.StrUtil;
import com.baomidou.dynamic.datasource.annotation.DS;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.monash.flora_backend.constant.MyMoodleConfigConstant;
import com.monash.flora_backend.dao.entity.MdlConfig;
import com.monash.flora_backend.dao.mapper.MdlConfigMapper;
import com.monash.flora_backend.service_moodle.IMdlConfigPluginsService;
import com.monash.flora_backend.service_moodle.IMdlConfigService;
import com.monash.flora_backend.service_moodle.IMdlCourseSectionsService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.DefaultResourceLoader;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.stream.Collectors;

/**
 * ClassName: MdlConfigServiceImpl
 * Description:
 *
 * @author Xinyu Li
 * @since 12/31/2022 1:18 PM
 */
@Service
@Slf4j
@AllArgsConstructor
@DS("slave_1")
public class MdlConfigServiceImpl extends ServiceImpl<MdlConfigMapper, MdlConfig> implements IMdlConfigService {

    private final IMdlConfigPluginsService iMdlConfigPluginsService;
    private final IMdlCourseSectionsService iMdlCourseSectionsService;

    @Override
    public boolean updateAdditionalHtml(String name, String value) {
        QueryWrapper<MdlConfig> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("name", name).last("limit 1");

        MdlConfig mdlConfig = super.getOne(queryWrapper);
//        log.info("mdlconfig-------------------------------");
//        log.info(mdlConfig.toString());
        mdlConfig.setValue(value);

        return super.updateById(mdlConfig);
    }

    @Override
    public void setupConfigValueForOnlineEnvironment(String websiteAddress, Map<String, String[]> courseIdModalContentMap, String[] finishModalContentArray, List<Long> courseIdList, List<String> studies) {

        //todo: 在生成打包文件之前，要改回https 和wss
        MyMoodleConfigConstant.MOODLE_WEBSITE_URL =  "https://" + websiteAddress; //"https://study.floralearn.cn/";     //   https://study.floralearn.cn/      https://cella-monash.floraproject.org/
//        MyMoodleConfigConstant.MOODLE_WEBSITE_URL =  "http://" + websiteAddress; //"https://study.floralearn.cn/";     //   https://study.floralearn.cn/      https://cella-monash.floraproject.org/
        MyMoodleConfigConstant.FLORA_BACKEND_WEBSOCKET_URL = "wss://" + websiteAddress;
//        MyMoodleConfigConstant.FLORA_BACKEND_WEBSOCKET_URL = "ws://" + websiteAddress;
        MyMoodleConfigConstant.FLORA_BACKEND_URL = MyMoodleConfigConstant.MOODLE_WEBSITE_URL + "/myapi";

        StringBuilder courseAndPageIdsString = new StringBuilder();
        String temp = courseIdList.stream().map(courseId -> {
            String pageIdListString = iMdlCourseSectionsService.findAllPageIdByCourseId(courseId);
            if (!StrUtil.isEmpty(pageIdListString)) {
                return String.format("['%s', [%s]]", courseId, pageIdListString);
            }
            return null;
        }).filter(Objects::nonNull).collect(Collectors.joining(","));

        courseAndPageIdsString.append("[").append(temp).append("]");
        log.info(courseAndPageIdsString.toString());

        StringBuilder courseIdAndModalContent = new StringBuilder();
        List<String> tempModalContentList = new ArrayList<>();
        courseIdModalContentMap.forEach((courseId, modalContentArray) -> {
            tempModalContentList.add(String.format("['%s', [%s]]", courseId, Arrays.stream(modalContentArray).map(s -> "'" + s + "'").collect(Collectors.joining(","))));
        });
        courseIdAndModalContent.append("[").append(String.join(",", tempModalContentList)).append("]");

//        List<String> studies = MyMoodleConfigConstant.websiteUrlStudyNameMap.get(websiteAddress);
        for (int i = 0; i < studies.size(); i++) {
            String studyName = studies.get(i);
            log.info("studyname:-------------{}", studyName);
            String folderPath = "";
            if (studyName.contains("/")) {
                String[] splitTemp = studyName.split("/");
                folderPath = splitTemp.length <= 1 ? "" : String.join("/", Arrays.copyOf(splitTemp, splitTemp.length - 1));;
                studyName = splitTemp[splitTemp.length - 1];
            }
            log.info("folderpath:{}-------studyname:{}", folderPath, studyName);
            int templateIndex = i + 2; // Generico template index start from 2
            String genericoTemplateBody = this.readGenericoConfig("config_" + studyName + ".html", folderPath);

            //对每个页面，添加label， 例如 relevant reading
//            Map<String, String> studyPageIdAndLabel = MyMoodleConfigConstant.STUDY_PAGE_ID_AND_LABEL_MAP.get(studyName);
//            if (studyPageIdAndLabel != null) {
//                studyPageIdAndLabel.forEach((key, value) -> {
//                    MyConstant.RELEVANT_READING_MAP.put(MyMoodleConfigConstant.MOODLE_WEBSITE_URL + "/moodle/mod/page/view.php?id=" + key, value);
////                    MyConstant.URL_COURSE_ID_MAP.put(MyMoodleConfigConstant.MOODLE_WEBSITE_URL + "/moodle/mod/page/view.php?id=" + key, studyName);
//                });
//            }

            iMdlConfigPluginsService.updateGenericoTemplateMoodleDB(templateIndex, genericoTemplateBody, studyName);
        }

        log.info("before readGeneralConfigForServer----------------------");

        //修改additional html 部分
        this.readGeneralConfigForServer(courseAndPageIdsString.toString(), "general_config_all_course.html", courseIdAndModalContent.toString(), finishModalContentArray);
        log.info("finish readGeneralConfigForServer----------------------");
    }

    private String readGenericoConfig(String filename, String folderPath) {
        List<String> indexFileLineList = readHtmlFile(filename, folderPath);
        if (indexFileLineList == null) {
            return "";
        }
        StringBuilder stringBuilderGenericoTemplateBody = new StringBuilder();
        boolean startAppendGenericoTemplateBody = false;
        for (String s : indexFileLineList) {
            if (s.equals("<!--start_PLUGINS_GENERICO_TEMPLATE_BODY-->")) {
                startAppendGenericoTemplateBody = true;
            }
            if (s.equals("<!--end_PLUGINS_GENERICO_TEMPLATE_BODY-->")) {
                startAppendGenericoTemplateBody = false;
            }
            if (startAppendGenericoTemplateBody) {

                if (s.strip().contains("var apiBaseUrl =")) {
                    s = "var apiBaseUrl = '" + MyMoodleConfigConstant.FLORA_BACKEND_URL + "';";
                }
                if (s.strip().contains("var websocketApiBaseUrl =")) {
                    s = "var websocketApiBaseUrl = '" + MyMoodleConfigConstant.FLORA_BACKEND_WEBSOCKET_URL + "';";
                }

                stringBuilderGenericoTemplateBody.append(s).append("\n");
            }
        }
        return stringBuilderGenericoTemplateBody.toString();
    }

    /**
     * 在moodle 所有页面都生效的code
     * @param serverAllCourseIdAndPageStartEndId
     * @param filename
     */
    private void readGeneralConfigForServer(String serverAllCourseIdAndPageStartEndId, String filename,
                                            String courseIdAndModalContent, String[] finishModalContentArray) {

        List<String> indexFileLineList = readHtmlFile(filename, "");
        if (indexFileLineList == null) {
            return;
        }
        StringBuilder stringBuilderAdditionalHTMLHead = new StringBuilder();
        StringBuilder stringBuilderAdditionalHTMLBody = new StringBuilder();
        StringBuilder stringBuilderAdditionalHTMLFooter = new StringBuilder();


        boolean startAppendAdditionalHTMLHead = false;
        boolean startAppendAdditionalHTMLBody = false;
        boolean startAppendAdditionalHTMLFooter = false;

        for (String s : indexFileLineList) {
            if (s.equals("<!--start_ADDITIONAL_HTML_HEAD-->")) { startAppendAdditionalHTMLHead = true;}
            if (s.equals("<!--end_ADDITIONAL_HTML_HEAD-->")) { startAppendAdditionalHTMLHead = false;}
            if (startAppendAdditionalHTMLHead) { stringBuilderAdditionalHTMLHead.append(s).append("\n");}

            if (s.equals("<!--start_ADDITIONAL_HTML_BODY-->")) { startAppendAdditionalHTMLBody = true;}
            if (s.equals("<!--end_ADDITIONAL_HTML_BODY-->")) { startAppendAdditionalHTMLBody = false;}
            if (startAppendAdditionalHTMLBody) {
                if (s.contains("Time is up")) { // 此处字符串是Modal 里面的默认text
                    s = s.replace("Time is up", finishModalContentArray[0]);
                }
                if (s.contains("Back to Homepage")) { // 此处字符串是Modal 里面的默认text
                    s = s.replace("Back to Homepage", finishModalContentArray[1]);
                }
                if (s.contains("Download Essay")) { // 此处字符串是Modal 里面的默认text
                    s = s.replace("Download Essay", finishModalContentArray[2]);
                }
                stringBuilderAdditionalHTMLBody.append(s).append("\n");
            }

            if (s.equals("<!--start_ADDITIONAL_HTML_FOOTER-->")) { startAppendAdditionalHTMLFooter = true;}
            if (s.equals("<!--end_ADDITIONAL_HTML_FOOTER-->")) { startAppendAdditionalHTMLFooter = false;}
            if (startAppendAdditionalHTMLFooter) {

                if (s.equals("//start_BASE_URL")) {
                    s = "        let baseUrl = '" + MyMoodleConfigConstant.MOODLE_WEBSITE_URL + "';";

                }
                if (s.equals("//start_SERVER_ALL_COURSE_ID_AND_PAGE_START_END_ID")) {
                    s = "        let courseIdAndStartPageIdAndEndPageIdList = " + serverAllCourseIdAndPageStartEndId + ";\n        let courseIdAndModalContentList = " + courseIdAndModalContent + ";\n";
                }
                if (s.contains("downloadEssayLink.href = ")) {
                    s = "downloadEssayLink.href = '" + MyMoodleConfigConstant.FLORA_BACKEND_URL + "/download-student-essay/' + userId + '/' + getCurrentCourseId();\n";
                }

                stringBuilderAdditionalHTMLFooter.append(s).append("\n");
            }
        }
        log.info("-------------stringBuilderAdditionalHTMLFooter----------------");
//        log.info(stringBuilderAdditionalHTMLFooter.toString());
        updateAdditionalHtml(MyMoodleConfigConstant.MDL_CONFIG_ADDITIONAL_HTML_HEAD_ATTR_NAME, stringBuilderAdditionalHTMLHead.toString());
        updateAdditionalHtml(MyMoodleConfigConstant.MDL_CONFIG_ADDITIONAL_HTML_TOP_OF_BODY_ATTR_NAME, stringBuilderAdditionalHTMLBody.toString());
        updateAdditionalHtml(MyMoodleConfigConstant.MDL_CONFIG_ADDITIONAL_HTML_FOOTER_ATTR_NAME, stringBuilderAdditionalHTMLFooter.toString());
    }

    private List<String> readHtmlFile(String filename, String folderPath) {
        List<String> indexFileLineList = null;
        try {
            ResourceLoader resourceLoader = new DefaultResourceLoader();
            //可以读取到，从此处想办法变成动态
            log.info("filepath: classpath:templates/generico_and_additional_config/" + (StrUtil.isEmpty(folderPath) ? "" : folderPath + "/") + filename);
            Resource resource = resourceLoader.getResource("classpath:templates/generico_and_additional_config/" + (StrUtil.isEmpty(folderPath) ? "" : folderPath + "/") + filename);
            InputStreamReader inputStreamReader = new InputStreamReader(resource.getInputStream(), StandardCharsets.UTF_8);
            BufferedReader bufferedReader = new BufferedReader(inputStreamReader);
            indexFileLineList = bufferedReader.lines().collect(Collectors.toList());
            bufferedReader.close();
            inputStreamReader.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return indexFileLineList;
    }
}
