package com.monash.flora_backend.controller;

import cn.hutool.core.util.StrUtil;
import com.monash.flora_backend.constant.MyMoodleConfigConstant;
import com.monash.flora_backend.controller.vo.*;
import com.monash.flora_backend.service.*;
import com.monash.flora_backend.service_func.ActionAndProcessService;
import com.monash.flora_backend.service_func.ExportExcelFileStorageService;
import com.monash.flora_backend.service_func.UserDataManagementService;
import com.monash.flora_backend.service_moodle.IMdlCourseService;
import com.monash.flora_backend.service_moodle.IMdlUserService;
import com.monash.flora_backend.util.JSONResult;
import com.monash.flora_backend.util.RubricScoreUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * 暂时关闭，之后再开启
 */
@Slf4j
@Controller
@RequestMapping("/manage")
@RequiredArgsConstructor
public class TeacherEndController {

    private final IEssayService iEssayService;
    private final ExportExcelFileStorageService exportExcelFileStorageService;

    private final IUserTeacherLogService iUserTeacherLogService;
    private final IMdlUserService iMdlUserService;
    private final IRuleBaseCheckGrammarService iRuleBaseCheckGrammarService;
    private final IRuleBaseWritingChecklistService iRuleBaseWritingChecklistService;
    private final IRuleBaseOriginalityService iRuleBaseOriginalityService;
    private final IMdlCourseService iMdlCourseService;
    private final ActionAndProcessService actionAndProcessService;
    private final UserDataManagementService userDataManagementService;

    /**
     * 因为需要nginx map路径，所以不能在controller上面写路径，否则ngnix无法识别并map
     *
     * @param userId
     * @return
     */
    @GetMapping("/clear-user-log-data/{userId}")
    @ResponseBody
    public JSONResult clearUserLogDataById(@PathVariable("userId") Long userId) {
        log.info("clearUserLogDataById:" + userId);

        //删除数据库 //删除elasticsearch
        userDataManagementService.clearAllUserLog(userId);


        return JSONResult.ok();
    }


    @GetMapping("/manual-generate-all-process-for-course/{courseId}/{srlModel}")
    @ResponseBody
    public JSONResult manualGenerateAllProcessLabelForCourse(@PathVariable("courseId") String courseId, @PathVariable("srlModel") String srlModel) {


        List<MdlUserVO> mdlUserVOList = iMdlUserService.findAllUserByCourseId(courseId);

        mdlUserVOList.forEach(mdlUserVO -> {
            log.info("labelling-----------------" + mdlUserVO);
            actionAndProcessService.labelAllProcessLabelPatternsAsync(mdlUserVO.getId(), courseId, srlModel);
            log.info("finish-----------------" + mdlUserVO.getId());
        });

        return JSONResult.ok();
    }

    @GetMapping("/list-all-students")
    public String listAllStudentsInfo(@RequestParam(value = "courseId", required = false) String courseId, Model model) {
        log.info("list-all-students/{}", courseId);
//        List<TraceDataVO> traceDataVOList = iTraceDataService.findAllStudentInfo();

        List<MdlCourseVO> mdlCourseVOList = iMdlCourseService.findAll();
        mdlCourseVOList.forEach(mdlCourseVO -> {
            log.info(mdlCourseVO.toString());
        });

        List<MdlUserVO> mdlUserVOList = new ArrayList<>();
        if (mdlCourseVOList.isEmpty()) {
            log.info("no course found");
        } else {
            mdlUserVOList = iMdlUserService.findAllUserByCourseId(courseId != null ? courseId : mdlCourseVOList.get(0).getId().toString());
        }
        model.addAttribute("mdlCourseVOList", mdlCourseVOList);
        model.addAttribute("mdlUserVOList", mdlUserVOList);
//        model.addAttribute("traceDataVOList", traceDataVOList);
        model.addAttribute("myUrl", MyMoodleConfigConstant.FLORA_BACKEND_URL.contains("/myapi") ? "/myapi" : "");
        return "teacher_end/02list_all_students";
    }

    @GetMapping("/manual-generate-process-label/{userId}/{courseId}/{srlModel}")
    @ResponseBody
    public JSONResult manuallyGenerateProcessLabel(@PathVariable("userId") Long userId, @PathVariable("courseId") String courseId, @PathVariable("srlModel") String srlModel) {
        if (StrUtil.isEmpty(srlModel)) {
            return JSONResult.errorMsg("error SRL model");
        }
        actionAndProcessService.labelAllProcessLabelPatterns(userId, courseId, srlModel);
        return JSONResult.ok("generate success");
    }

    /**
     * 每个学生可能在不同的课都有essay
     * @param userId
     * @param courseId
     * @param model
     * @return
     */
    @GetMapping("/get-student-essay-page/{userId}/{courseId}")
    public String getStudentEssayPage(@PathVariable("userId") Long userId, @PathVariable("courseId") String courseId, Model model) {
        EssayVO essayVO = iEssayService.findLatestVersionByUserIdAndCourseId(userId, courseId);
        log.info(essayVO.toString());
        model.addAttribute("essay", essayVO);
        model.addAttribute("myUrl", MyMoodleConfigConstant.FLORA_BACKEND_URL.contains("/myapi") ? "/myapi" : "");
        return "teacher_end/04show_student_essay";
    }

    /**
     * 发送给teacher-chat的老师看的，刷新essay
     * @param userId
     * @return
     */
    @GetMapping("/get-student-essay/{userId}/{courseId}") //TODO 有问题， 未解决
    @ResponseBody
    public String getStudentEssay(@PathVariable("userId") Long userId, @PathVariable("courseId") String courseId) {
        EssayVO essayVO = iEssayService.findLatestVersionByUserIdAndCourseId(userId, courseId);
        if (essayVO == null) {
            return "";
        } else {
            log.info(essayVO.toString());
            return essayVO.getEssayContentJson();
        }
    }

//    @GetMapping("/all-excel-files/{type}")
//    public String listUploadedFiles(@PathVariable("type") String type, Model model) throws IOException {
//
//        model.addAttribute("myUrl", MyMoodleConfigConstant.FLORA_BACKEND_URL.contains("/myapi") ? "/myapi" : "");
//        String baseFilePath = MyMoodleConfigConstant.FLORA_BACKEND_URL + "/manage/files";
//
//        Path excelExportPath = Paths.get(MyMoodleConfigConstant.EXCEL_EXPORT_PATH);
//        if (!Files.exists(excelExportPath)) {
//            try {
//                Files.createDirectories(excelExportPath);
//                log.info("Directory created at: " + excelExportPath.toAbsolutePath().toString());
//            } catch (Exception ex) {
//                log.info("Error creating directory at: " + excelExportPath.toAbsolutePath().toString());
//                ex.printStackTrace();
//            }
//        } else {
//            log.info("Directory already exists at: " + excelExportPath.toAbsolutePath().toString());
//        }
//
//        switch (type) {
//            case "annotation":
//                iAnnotationService.exportAnnotationToExcel();
//                break;
//            case "deleted-annotation":
//                iDeletedAnnotationService.exportDeletedAnnotationToExcel();
//                break;
//            case "essay":
//                iEssayService.exportEssayToExcel();
//                break;
//            case "planner":
//                iPlannerService.exportPlannerToExcel();
//                break;
//            case "trace-data":
//                iTraceDataService.exportTraceDataToExcel();
//                break;
//        }
//
////        log.info("qweqwe---------------------");
////        iFileStorageService.loadAll().forEach(path -> {
////            log.info(path.toString());
////            log.info(path.getFileName().toString());
////            log.info(MvcUriComponentsBuilder.fromMethodName(TeacherEndController.class,
////                    "serveFile", path.getFileName().toString()).build().toUri().toString());
////        });
////        model.addAttribute("files", iFileStorageService.loadAll().map(
////                        path -> MvcUriComponentsBuilder.fromMethodName(TeacherEndController.class,
////                                "serveFile", path.getFileName().toString()).build().toUri().toString())
////                .collect(Collectors.toList()));
//
//        model.addAttribute("files", exportExcelFileStorageService.loadAll().map(path -> baseFilePath + "/" + path.getFileName().toString()).collect(Collectors.toList()));
////        https://cella-monash.floraproject.org/myapi/manage/files/trace_data0.xlsx
//        return "teacher_end/list_excel_files";
//    }

    @GetMapping("/files/{filename:.+}")
    @ResponseBody
    public ResponseEntity<Resource> serveFile(@PathVariable String filename) {

        Resource file = exportExcelFileStorageService.loadAsResource(filename);
        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
                "attachment; filename=\"" + file.getFilename() + "\"").body(file);
    }


    /**
     * need update //TODO 需要做迁移
     * @param courseId
     * @param model
     * @return
     */
    @GetMapping("/teacher-chat/{courseId}")
    public String teacherChat(@PathVariable("courseId") String courseId, Model model) {

//        List<String> cohortIdNumberList = List.of("lab_study_users", "lab_study_teacher");
        //  find user list and return
//        List<MdlUserVO> mdlUserVOList = iMdlUserService.findAllByCohortIdNumber(cohortIdNumberList);
//        List<MdlCourseVO> mdlCourseVOList = iMdlCourseService.findAllCourse();

//        List<MdlUserVO> mdlUserVOList = iMdlUserService.findAllByCourseId(courseId);
        List<MdlUserVO> mdlUserVOList = iMdlUserService.findAllUserByCourseId(courseId);
        //TODO 找到所有学生的essay  有问题，未解决
//        EssayVO essayVO = iEssayService.findLatestVersionByUserIdAndCourseId(0L, courseId);

//        model.addAttribute("lastEssayUserId", Optional.ofNullable(essayVO).map(EssayVO::getUserId).orElse(0L));
//        model.addAttribute("lastEssaySaveTime", Optional.ofNullable(essayVO).map(EssayVO::getSaveTime).orElse(""));

        model.addAttribute("mdlUserVOList", mdlUserVOList);
        model.addAttribute("myUrl", MyMoodleConfigConstant.FLORA_BACKEND_URL.contains("/myapi") ? "/myapi" : "");
        model.addAttribute("websocketBaseUrl", MyMoodleConfigConstant.FLORA_BACKEND_WEBSOCKET_URL);
//        log.info("Current student " + TraceDataHandler.CURRENT_CONNECTED_STUDENT_ID);
//        model.addAttribute("currentStudentID", TraceDataHandler.CURRENT_CONNECTED_STUDENT_ID);

        return "teacher_end/05teacher_chat";
    }


//    TODO future work 动态加载
//    @GetMapping("/teacher-handler-load-cohort/{cohortIdNumber}")
//    @ResponseBody
//    public String teacherChatLoadCohort(@PathVariable("cohortIdNumber") String cohortIdNumber) {
//        // 从moodle 中查找cohortIdNumber
//
//        return "";
//    }
    //TODO 需要做迁移
    @GetMapping("/load-student-chat-history/{studentId}/{courseId}")
    @ResponseBody
    public JSONResult loadStudentChatHistory(@PathVariable("studentId") Long studentId, @PathVariable("courseId") String courseId) {

        List<UserTeacherLogVO> userTeacherLogVOList = iUserTeacherLogService.findAllTeacherChatLogByUserId(studentId, courseId);
        return JSONResult.ok(userTeacherLogVOList);
    }

    //TODO 需要做迁移
    @GetMapping("/rubric-score")
    public String getRubricPage(Model model) {
        model.addAttribute("myUrl", MyMoodleConfigConstant.FLORA_BACKEND_URL.contains("/myapi") ? "/myapi" : "");
        return "teacher_end/06rubric_score";
    }
    //TODO 需要做迁移
    @PostMapping("/rubric-score/analyse")
    public String getAnalyseResult(Model model, String essay, String reset, String submit) throws IOException, ClassNotFoundException {
        ResultVO result;
        if(submit != null){
            result = RubricScoreUtil.getCheckResult(iRuleBaseCheckGrammarService, iRuleBaseOriginalityService, iRuleBaseWritingChecklistService, essay);
            result = RubricScoreUtil.getScore(result);
            model.addAttribute("essay", essay);
        }else {
            result = null;
            model.addAttribute("essay", "");
        }

        model.addAttribute("myUrl", MyMoodleConfigConstant.FLORA_BACKEND_URL.contains("/myapi") ? "/myapi" : "");

        model.addAttribute("result", result);
        return "teacher_end/06rubric_score";
    }
}
