package com.monash.flora_backend.controller.manage;

import cn.hutool.json.JSON;
import com.monash.flora_backend.constant.MyMoodleConfigConstant;
import com.monash.flora_backend.controller.req.manage.AddUpdateToolsConfigVO;
import com.monash.flora_backend.controller.vo.GenericoTemplateIdAndNameVO;
import com.monash.flora_backend.dao.entity.MdlConfigPlugins;
import com.monash.flora_backend.service.IConfigGenericoTemplateService;
import com.monash.flora_backend.service_moodle.IMdlConfigPluginsService;
import com.monash.flora_backend.util.JSONResult;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.*;

/**
 * maximum 20 different configs are allowed in one server
 */
@Slf4j
@RestController
@RequestMapping("/tools-config")
@AllArgsConstructor
public class ToolsConfigController {
    private final IMdlConfigPluginsService iMdlConfigPluginsService;
//    private final IMdlConfigService iMdlConfigService;
    private final IConfigGenericoTemplateService iConfigGenericoTemplateService;


    @GetMapping("/list")
    public JSONResult getAllGenericoTemplateIdsAndNames() {
        List<GenericoTemplateIdAndNameVO> idAndNameVOList = iConfigGenericoTemplateService.findAllGenericoTemplateIdsAndNames();
        return JSONResult.ok(idAndNameVOList);
    }

    @GetMapping("/generico-template/{id}")
    public JSONResult getGenericoTemplate(@PathVariable("id") Long id) {
        AddUpdateToolsConfigVO addUpdateToolsConfigVO = iConfigGenericoTemplateService.findGenericoTemplateById(id);

        return JSONResult.ok(addUpdateToolsConfigVO);
    }

    @PostMapping("/generico-template")
    public JSONResult addNewGenericoTemplate(@RequestBody AddUpdateToolsConfigVO addUpdateToolsConfigVO) {
        //找到generico 的还未使用的最小序号
        int templateIndex = iMdlConfigPluginsService.findTheLastEmptyTemplateIndex();
//        int maxTemplateCount = iMdlConfigPluginsService.getMaximumTemplateNum();
//        log.info("total count of teamplate is: " + maxTemplateCount);

        addUpdateToolsConfigVO.setGenericoTemplateIndex(templateIndex);
//        log.info(addUpdateToolsConfigVO.toString());
        iConfigGenericoTemplateService.addNewGenericoTemplateFloraDB(addUpdateToolsConfigVO);
        //生成generico body 字符串
        String genericoTemplateBody = iConfigGenericoTemplateService.generateGenericoBody(addUpdateToolsConfigVO);


        iMdlConfigPluginsService.addNewGenericoTemplateMoodleDB(genericoTemplateBody, addUpdateToolsConfigVO.getGenericoTemplateName(), templateIndex);
        log.info("add generico-template finish");
        return JSONResult.ok(templateIndex);
    }

    @PostMapping("/generico-template/update")
    public JSONResult updateGenericoTemplate(@RequestBody AddUpdateToolsConfigVO addUpdateToolsConfigVO) {

//        iConfigGenericoTemplateService.updateNewGenericoTemplateFloraDB(addUpdateToolsConfigVO);
        //生成generico body 字符串
        String genericoTemplateBody = iConfigGenericoTemplateService.generateGenericoBody(addUpdateToolsConfigVO);

        iMdlConfigPluginsService.updateGenericoTemplateMoodleDB(addUpdateToolsConfigVO.getGenericoTemplateIndex(), genericoTemplateBody, addUpdateToolsConfigVO.getGenericoTemplateName());
        log.info("update generico-template finish");
        return JSONResult.ok();
    }



    @GetMapping("/generico-template/delete/{id}")
    public JSONResult deleteGenericoTemplate(@PathVariable("id") Long id) {
        log.info("deleting template " + id);
        // this is the database.
//        Integer genericoTemplateIndex = iConfigGenericoTemplateService.deleteGenericoTemplateById(id);

        iMdlConfigPluginsService.deleteGenericoTemplateByIndex(Math.toIntExact(id));
        log.info("delete generico-template finish");
        return JSONResult.ok();
    }

    @GetMapping("/background-files/{templateId}")
    public JSONResult getBackgroundFiles(@PathVariable("templateId") int templateId) {
        File directory = new File(MyMoodleConfigConstant.BACKGROUND_FILE_PATH + "/" + templateId);
        File[] files = directory.listFiles();
        List<String> fileNames = new ArrayList<>();
        if (files != null) {
            for (File file : files) {
                // 只添加文件名到列表中，也可以根据需要添加其他属性
                fileNames.add(file.getName());
            }
        }
        log.info("fileNames" + fileNames);

        return JSONResult.ok(fileNames);
    }

    @PostMapping("/background-files")
    public JSONResult uploadBackgroundFiles(@RequestParam("file")MultipartFile file, @RequestParam("templateid") String templateId) {
        try {
            // 构建完整的文件保存路径
//            Path filePath = Paths.get(MyMoodleConfigConstant.FILE_UPLOAD_PATH + "/" + new Date().getTime() + "_" + file.getOriginalFilename());
            String savedFileName = new Date().getTime() + "_" + file.getOriginalFilename();
            Path filePath = Paths.get(MyMoodleConfigConstant.BACKGROUND_FILE_PATH + "/" + templateId + "/" + savedFileName);
            Path folderPath = Paths.get(MyMoodleConfigConstant.BACKGROUND_FILE_PATH + "/" + templateId);
            if (Files.notExists(folderPath))
                Files.createDirectories(folderPath);
            // 保存文件到服务器
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
            return JSONResult.ok(savedFileName);
        } catch (IOException e) {
            e.printStackTrace();
            return JSONResult.errorMsg("Failed to upload " + file.getOriginalFilename());
        }
    }
    @GetMapping("/background-files/delete/{templateId}/{fileName}")
    public JSONResult deleteBackgroundFiles(@PathVariable("templateId") int templateId, @PathVariable("fileName") String fileName) {
        try {
            // 构建完整的文件保存路径

//            Path filePath = Paths.get(MyMoodleConfigConstant.FILE_UPLOAD_PATH + "/" + new Date().getTime() + "_" + file.getOriginalFilename());
            Path filePath = Paths.get(MyMoodleConfigConstant.BACKGROUND_FILE_PATH + "/" + templateId + "/" + fileName);
            if (Files.exists(filePath)){
                Files.delete(filePath);
                return JSONResult.ok( "File deleted successfully, filename: " + fileName);
            }
            // 保存文件到服务器
            return JSONResult.errorMsg( "File does not exist, filename: " + fileName);
        } catch (IOException e) {
            e.printStackTrace();
            return JSONResult.errorMsg("Failed to delete the file, filename: " + fileName);
        }
//        }


    }
    @GetMapping("/generico-template/get-templates")
    public JSONResult getGenericoTemplates() {
        return JSONResult.ok(iMdlConfigPluginsService.getAllGenericoTemplates());
    }

    @PostMapping("/generico-template/post_testing")
    public JSONResult testPosting(@RequestBody AddUpdateToolsConfigVO addUpdateToolsConfigVO) {
        return JSONResult.ok("25");
    }
    @GetMapping("/generico-template/get_testing")
    public JSONResult testGetting() {
        return JSONResult.ok("this is result of getting");
    }








    /*@GetMapping("/init-server")
    public JSONResult initializeServer(@RequestBody InitializeServerVO initializeServerVO) {
//        String modalContent = "This task has a time limit of 120 minutes. Note that only <strong>1 attempt</strong> is allowed. Are you sure you want enter the task?"; // general
//        MyConstant.CHAT_SERVICE_URL = "https://chat-service.floraproject.org/myapi";
        //下面两个变量只在trace data 判定reading 类型时候用
        MyMoodleConfigConstant.IRRELEVANT_READING_PAGE_ID_SET.addAll(initializeServerVO.getIrrelevantReadingPageIdSet().stream().map(Object::toString).collect(Collectors.toSet()));
        MyMoodleConfigConstant.TASK_OVERVIEW_READING_PAGE_ID_SET.addAll(initializeServerVO.getTaskOverviewReadingPageIdSet().stream().map(Object::toString).collect(Collectors.toSet()));
        MyMoodleConfigConstant.TASK_REQUIREMENT_READING_PAGE_ID_SET.addAll(initializeServerVO.getTaskRequirementReadingPageIdSet().stream().map(Object::toString).collect(Collectors.toSet()));
        MyMoodleConfigConstant.LEARNING_GOAL_READING_PAGE_ID_SET.addAll(initializeServerVO.getLearningGoalReadingPageIdSet().stream().map(Object::toString).collect(Collectors.toSet()));
        MyMoodleConfigConstant.RUBRIC_READING_PAGE_ID_SET.addAll(initializeServerVO.getRubricReadingPageIdSet().stream().map(Object::toString).collect(Collectors.toSet()));

//        List<Long> courseIdList = List.of(4L, 10L, 12L); //为了消除界面上的link
//        iMdlConfigService.setupConfigValueForOnlineEnvironment(extractDomain(initializeServerVO.getWebsiteAddress()), initializeServerVO.getModalContent(), initializeServerVO.getCourseIdList(), initializeServerVO.getStudyNameList());

        return  JSONResult.ok();
    }
    private String extractDomain(String url) {
        String regex = "^(https?://)?([^/]+)";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(url);
        if (matcher.find()) {
            return matcher.group(2);
        } else {
            return null;
        }
    }

//    @GetMapping("/tool-config-page")
//    public JSONResult toolConfigPage() {
//
//        // 找到所有 template
//        List<ConfigToolsVO> configToolsVOList = iMdlConfigPluginsService.findAllGenericoTemplate();
//        return JSONResult.ok(configToolsVOList);
//    }

    @PostMapping("/update-tool-config")
    public JSONResult updateToolConfig(@RequestBody ConfigToolsVO configToolsVO) {
        log.info(configToolsVO.toString());

        //生成generico body 字符串
        String genericoTemplateBody = iMdlConfigPluginsService.generateGenericoBody(configToolsVO);
        MyConstantMariaModelSRLPattern.SCAFFOLD_SHOWING_TIME_LIST = configToolsVO.getScaffoldShowingTime();
        //获取chatgpt prmpt and send to GPT
//        configToolsVO.getChatgptPrompt();
//        configToolsVO.getIncludeSurveyToChatgptPrompt();

        //获取dictionary tool language and send to dictionary service
//        configToolsVO.getDictionarySourceLanguage();
//        configToolsVO.getDictionaryTargetLanguage();

        iMdlConfigPluginsService.updateGenericoTemplate(configToolsVO.getTemplateIndex(), genericoTemplateBody, configToolsVO.getStudyName());
        return JSONResult.ok();
    }

    @PostMapping("/add-new-tool-config")
    public JSONResult addNewToolConfig(@RequestBody ConfigToolsVO configToolsVO) {
        //找到generico 的还未使用的最小序号
        int templateIndex = iMdlConfigPluginsService.findTheLastEmptyTemplateIndex();

        //生成generico body 字符串
        String genericoTemplateBody = iMdlConfigPluginsService.generateGenericoBody(configToolsVO);

        //获取chatgpt prmpt and send to GPT
//        configToolsVO.getChatgptPrompt();
//        configToolsVO.getIncludeSurveyToChatgptPrompt();

        //获取dictionary tool language and send to dictionary service
//        configToolsVO.getDictionarySourceLanguage();
//        configToolsVO.getDictionaryTargetLanguage();

        iMdlConfigPluginsService.updateGenericoTemplate(templateIndex, genericoTemplateBody, configToolsVO.getStudyName());
        return JSONResult.ok();
    }
*/

}
