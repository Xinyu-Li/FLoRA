package com.monash.flora_backend.controller.manage;

import cn.hutool.core.util.StrUtil;
import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import cn.hutool.jwt.JWTUtil;
import com.monash.flora_backend.config.cache.IGlobalCache;
import com.monash.flora_backend.constant.MyConstant;
import com.monash.flora_backend.controller.req.SearchUserReq;
import com.monash.flora_backend.controller.resp.AllCourseAndCategoryResp;
import com.monash.flora_backend.controller.resp.OverviewDataForCourseResp;
import com.monash.flora_backend.controller.resp.OverviewDataForUserResp;
import com.monash.flora_backend.controller.vo.MdlUserVO;
import com.monash.flora_backend.service.*;
import com.monash.flora_backend.service_func.*;
import com.monash.flora_backend.service_moodle.IMdlUserService;
import com.monash.flora_backend.util.JSONResult;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Slf4j
@RestController
@RequestMapping("/data")
@RequiredArgsConstructor
public class DataManagementController {

    private final UserDataManagementService userDataManagementService;
    private final FileStorageService iFileStorageService;
    private final IMdlUserService iMdlUserService;
    private final AsyncTaskService iAsyncTaskService;
    private final ExportExcelFileStorageService exportExcelFileStorageService;

    private final IAnnotationService iAnnotationService;
    private final IDeletedAnnotationService iDeletedAnnotationService;
    private final IEssayService iEssayService;
    private final IPlannerService iPlannerService;
    private final ITraceDataService iTraceDataService;
    private final IWholePageAnnotationService iWholePageAnnotationService;
    private final IGlobalCache iGlobalCache;
    private final IUserStartTimeService iUserStartTimeService;
    private final IScaffoldService iScaffoldService;
    private final IUserChatgptLogService iUserChatgptLogService;
    private final IUserTeacherLogService iUserTeacherLogService;
    private final ActionAndProcessService iActionAndProcessService;
    private final IGptScaffoldService iGptScaffoldService;

    /**
     * 当前课程信息
     * @throws IOException
     * @throws ClassNotFoundException
     */
    @GetMapping("/course-categories-and-courses")
    public JSONResult getCourseCategoriesAndCourses() throws IOException, ClassNotFoundException {
        AllCourseAndCategoryResp courseAndCategoryResp = userDataManagementService.findAllCourseCategoriesAndCourses();
        return JSONResult.ok(courseAndCategoryResp);
    }

    /**
     * 按学生或课程搜索overview数据
     */
    @PostMapping("/overview")
    @ResponseBody
    public JSONResult getOverviewData(@RequestBody Object body) throws IOException, ClassNotFoundException, ParseException {
        int type = JSONUtil.parseObj(body).getInt("type");
        JSONObject bd = JSONUtil.parseObj(body).getJSONObject("params");
        if (type == 1){
            // 按学生姓名模糊匹配
            SearchUserReq searchUserReq = new SearchUserReq();
            // 获取检索条件
            if (bd.containsKey("username")){
                searchUserReq.setUsernamePattern(bd.getStr("username"));
            } else {
                searchUserReq.setUsernamePattern("");
            }
            if (bd.containsKey("courseName")){
                searchUserReq.setCourseIdList(bd.getBeanList("courseName", Long.class));
            } else {
                searchUserReq.setCourseIdList(new ArrayList<>());
            }
            if (bd.containsKey("timeRange")){
                List<String> timeRange = bd.getBeanList("timeRange", String.class);
                System.out.println(timeRange);
                String pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'";
                SimpleDateFormat simpleDateFormat =
                        new SimpleDateFormat(pattern);
                simpleDateFormat.setTimeZone(TimeZone.getTimeZone("UTC"));
                searchUserReq.setStartTime(Long.toString(simpleDateFormat.parse(timeRange.get(0)).getTime()));
                searchUserReq.setEndTime(Long.toString(simpleDateFormat.parse(timeRange.get(1)).getTime()));
            }else {
                searchUserReq.setStartTime("0");
                searchUserReq.setEndTime("0");
            }

            // 获取检索结果
            OverviewDataForUserResp overviewDataForUserResp = userDataManagementService.findOverviewDataForUser(searchUserReq);
            return JSONResult.ok(overviewDataForUserResp);
        } else if(type == 2 && bd.containsKey("courseName")){
            // 按课程搜索
            List<Long> courseIdList = bd.getBeanList("courseName", Long.class);
            OverviewDataForCourseResp overviewDataForCourseResp = userDataManagementService.findOverviewDataForCourse(courseIdList);
            return JSONResult.ok(overviewDataForCourseResp);
        }
        return JSONResult.errorMsg("数据查询失败");
    }


    @PostMapping("/excel-zip/download")
    @ResponseBody
    public JSONResult downloadExcelData(@RequestBody Object body) {
        List<Long> userIdList = JSONUtil.parseObj(body).getBeanList("userIDs", Long.class);
        List<Integer> dataItemList = JSONUtil.parseObj(body).getBeanList("dataItem", Integer.class);
        List<String> courseIdList = JSONUtil.parseObj(body).getBeanList("courseIDs", String.class);
        if (userIdList == null) {
            userIdList = new ArrayList<>();
            userIdList.add(0L);
        }
        log.info("/excel-zip/download" + "---userIdList:" + userIdList + "---dataItemList:" + dataItemList + "---courseIdList:" + courseIdList);
        String result = exportExcelFileStorageService.generateZipFile(userIdList, courseIdList, dataItemList);
        if (StrUtil.isEmpty(result)) {
            return JSONResult.errorMsg("data download failed");
        } else {
            return JSONResult.ok(result);
        }
    }

    /**
     * @return a link that can be used by the user to download a zip file contains all data
     */
    @PostMapping("/generate-data/request-download-link")
    @ResponseBody
    public JSONResult asyncRequestDownloadLink(@RequestBody Object body) {
        // todo: 生成数据的部分改成异步，同label-process的流程
        try {
            List<Long> userIdList = JSONUtil.parseObj(body).getBeanList("userIDs", Long.class);
            List<Integer> dataItemList = JSONUtil.parseObj(body).getBeanList("dataItem", Integer.class);
            List<String> courseIdList = JSONUtil.parseObj(body).getBeanList("courseIDs", String.class);
            String adminId = JSONUtil.parseObj(body).get("adminID", String.class);
            log.info("/excel-zip/generate-download-link" + "---userIdList:" + userIdList + "---dataItemList:" + dataItemList + "---courseIdList:" + courseIdList);

            if (userIdList == null) {
                userIdList = new ArrayList<>();
                userIdList.add(0L);
            }
            if (adminId == null) {
                return JSONResult.errorMsg("admin id is not provided");
            }
            log.info("/generate-data/request-download-link" + "---userIdList:" + userIdList + "---dataItemList:" + dataItemList + "---courseIdList:" + courseIdList);
            String token = createToken(adminId);
            log.info("/generate-data/request-download-link ---- created token: " + token);
            // 这里是用的overload的加了cutRow参数的generateZipFile
            exportExcelFileStorageService.asyncGenerateZipFile(adminId, userIdList, courseIdList, dataItemList, MyConstant.CUT_ROW, token);


            return JSONResult.ok(token);
        } catch (Exception e) {
            return JSONResult.errorMsg("requesting generating link failed");
        }

    }
//    @GetMapping("/generate-data/test")
//    @ResponseBody
//    public JSONResult testAsyncFunc(){
//        exportExcelFileStorageService.asyncGenerateZipFile("adminId", new ArrayList<>(),  new ArrayList<>(), new ArrayList<>(), MyConstant.CUT_ROW, "token");
//
//        return JSONResult.ok();
//    }
    // This is the old sync version for generating download link
//    @PostMapping("/generate-data/request-download-link")
//    @ResponseBody
//    public JSONResult requestDownloadLink(@RequestBody Object body) {
//        // todo: 生成数据的部分改成异步，同label-process的流程
//
//        List<Long> userIdList = JSONUtil.parseObj(body).getBeanList("userIDs", Long.class);
//        List<Integer> dataItemList = JSONUtil.parseObj(body).getBeanList("dataItem", Integer.class);
//        List<String> courseIdList = JSONUtil.parseObj(body).getBeanList("courseIDs", String.class);
//        String adminId = JSONUtil.parseObj(body).get("adminID", String.class);
//        log.info("/excel-zip/generate-download-link" + "---userIdList:" + userIdList + "---dataItemList:" + dataItemList + "---courseIdList:" + courseIdList);
//
//        if (userIdList == null) {
//            userIdList = new ArrayList<>();
//            userIdList.add(0L);
//        }
//        if (adminId == null) {
//            return JSONResult.errorMsg("admin id not provided");
//        }
//        log.info("/generate-data/request-download-link" + "---userIdList:" + userIdList + "---dataItemList:" + dataItemList + "---courseIdList:" + courseIdList);
//
//        // 这里是用的overload的加了cutRow参数的generateZipFile
//        String result = exportExcelFileStorageService.generateZipFile(userIdList, courseIdList, dataItemList, MyConstant.CUT_ROW);
//        // 将生成的文件名放进redis的缓存
//        iGlobalCache.rSet(adminId + MyConstant.cachedLinkKeyListName, result, MyConstant.REDIS_LINK_EXPIRE_SECONDS);
//        // 这个是用来让缓存超时的
//        iGlobalCache.set(result, result, MyConstant.REDIS_LINK_EXPIRE_SECONDS);
//        log.info("caching finished");
//        if (StrUtil.isEmpty(result)) {
//            return JSONResult.errorMsg("data download failed");
//        } else {
//            return JSONResult.ok(result);
//        }
//    }
    @PostMapping("/generate-data/check-progress")
    @ResponseBody
    public JSONResult checkDownloadLinkGenerationProgress(@RequestBody Object body) {
        String checkToken = JSONUtil.parseObj(body).getStr("checkToken");
        Map<String, Object> result = new HashMap<>();
        log.info("/generate-data/check-progress ---- entered");
        if(iGlobalCache.hasKey(checkToken)){
            log.info("/generate-data/check-progress ---- token found " + checkToken);
            String isFinished = String.valueOf(iGlobalCache.hget(checkToken, "is-finished"));
            result.put("isFinished", isFinished);
            // todo 根据这里，加上cache，requestDownloadLink
            result.put("numFinishedFirst", iGlobalCache.hget(checkToken, "num-finished-type"));
            result.put("numTotalFirst", iGlobalCache.hget(checkToken, "num-total-type"));
            result.put("numFinishedSecond", iGlobalCache.hget(checkToken, "num-finished-rows"));
            result.put("numTotalSecond", iGlobalCache.hget(checkToken, "num-total-rows"));

            if(Objects.equals(isFinished, "true")){
                result.put("downloadLinks", iGlobalCache.hget(checkToken, "download-links"));
            }
            return JSONResult.ok(result);
        }else {
            return JSONResult.errorMsg("progress token not exist");
        }
    }

    @PostMapping("/clear-student-logs")
    @ResponseBody
    public JSONResult clearLogs(@RequestBody Object body) {
        // todo: 现在这里只能删除特定user的所有信息，不能根据course Id 删除
        List<Long> userIdList = JSONUtil.parseObj(body).getBeanList("userIDs", Long.class);
        List<Integer> dataItemList = JSONUtil.parseObj(body).getBeanList("dataItem", Integer.class);
        List<String> courseIdList = JSONUtil.parseObj(body).getBeanList("courseIDs", String.class);
        if (userIdList == null) {
            userIdList = new ArrayList<>();
            userIdList.add(0L);
        }
        log.info("/clear-student-logs" + "---userIdList:" + userIdList + "---dataItemList:" + dataItemList + "---courseIdList:" + courseIdList);

        userIdList.forEach(this::clearUserLogDataById);

//        String result = exportExcelFileStorageService.generateZipFile(userIdList, courseIdList, dataItemList);
        return JSONResult.ok();
    }

    private void clearUserLogDataById(Long userId) {
        log.info("clearUserLogDataById:" + userId);

        //删除数据库 //删除elasticsearch
        userDataManagementService.clearAllUserLog(userId);
    }

    @PostMapping("/email")
    @ResponseBody
    public JSONResult email(@RequestBody Object body){
        List<Long> userIdList = JSONUtil.parseObj(body).getBeanList("userIDs", Long.class);
        String subject = JSONUtil.parseObj(body).getStr("subject");
        String content = JSONUtil.parseObj(body).getStr("content");

        userIdList.forEach(userId -> {
            MdlUserVO userVO = iMdlUserService.findUserById(userId);
            iAsyncTaskService.sendEmail(userVO.getEmail(), subject, content);
        });
        return JSONResult.ok();
    }

    @RequestMapping(value = "/files/upload", method = RequestMethod.POST)
    public JSONResult uploadFile(MultipartHttpServletRequest request){
        List<MultipartFile> fileList = Objects.requireNonNull(request.getFiles("files"));
        String courseId = request.getParameter("courseId");
        fileList.forEach(file -> {
            iFileStorageService.store(file, courseId);
        });
        return JSONResult.ok("store success");
    }

    @GetMapping("/files/download/{courseId:.+}/{filename:.+}")
    @ResponseBody
    public ResponseEntity<Resource> serveFile(@PathVariable String courseId, @PathVariable String filename) {
        Resource file;
        if(Objects.equals(courseId, "0")){
            file = iFileStorageService.loadAsResource(filename);
        } else {
            file = iFileStorageService.loadAsResource(courseId+ "/" + filename);
        }
        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
                "attachment; filename=\"" + file.getFilename() + "\"").body(file);
    }

    /**
     * @param adminUserId the ID of admin user that is using the admin tool
     * @return A list of download links this user created.
     */
    @GetMapping("/get-cached-links/{adminUserId}")
    @ResponseBody
    public JSONResult getCachedLinks(@PathVariable String adminUserId) {
        // todo: 现在这里只能删除特定user的所有信息，不能根据course Id 删除
        String cachedLinksListKey = adminUserId + MyConstant.cachedLinkKeyListName;
        log.info("/download/get-cached-links/, user id is: " + adminUserId);
        List<String> cachedLinksList = new ArrayList<>();
        Map<String, List<String>> result = new HashMap<>();

        if(iGlobalCache.hasKey(cachedLinksListKey)) {
            List<String> cachedLinksKeyList = iGlobalCache.lGet(cachedLinksListKey, 0, iGlobalCache.lGetListSize(cachedLinksListKey));
            log.info("loaded cache list is: ");
            log.info(cachedLinksKeyList.toString());
            for(String cachedLinkKey: cachedLinksKeyList){
                if (iGlobalCache.hasKey(cachedLinkKey)){
                    cachedLinksList.add(iGlobalCache.get(cachedLinkKey));
                } else {
                    iGlobalCache.lRemove(cachedLinksListKey, 1, cachedLinkKey);
                }
            }
            result.put("cachedLinks", cachedLinksList);
        } else {
            log.info("No cached links");
            result.put("cachedLinks", new ArrayList<>());
        }
        return JSONResult.ok(result);
//        String result = exportExcelFileStorageService.generateZipFile(userIdList, courseIdList, dataItemList);
    }

    /**
     * @return A list of available models for labeling students' SRL process using their trace data
     *
     * The available model is manually configured in MyConstant.availableLabelModels
     */
    @GetMapping("/label-model/get-available-models")
    @ResponseBody
    public JSONResult getAvailableModels() {
        log.info("/label-model/get-available-models/, started");
        Map<String, String[]> result = new HashMap<>();
        result.put("availableModels", MyConstant.availableLabelModels);

        return JSONResult.ok(result);
//        String result = exportExcelFileStorageService.generateZipFile(userIdList, courseIdList, dataItemList);
    }

    /**
     * @return a token that enables front end to check the labeling progression
     *
     * This method will call an async method to label trace data.
     * The method will
     */
    @PostMapping("/label-model/request-labeling")
    @ResponseBody
    public JSONResult requestLabeling(@RequestBody Object body){
        List<Long> userIdList = JSONUtil.parseObj(body).getBeanList("userIDs", Long.class);
        int modelID = JSONUtil.parseObj(body).get("dataItem", Integer.class);
        List<String> courseIdList = JSONUtil.parseObj(body).getBeanList("courseIDs", String.class);
        String adminId = JSONUtil.parseObj(body).get("adminID", String.class);
        log.info("/label-model/request-labeling" + "---userIdList:" + userIdList + "---dataItemList:" + modelID + "---courseIdList:" + courseIdList, "--- adminID: " + adminId);

        String token = createToken(adminId);

        switch (modelID){
            case 0:
                // use Copes model
                iActionAndProcessService.labelStudents(userIdList, courseIdList, "copes", adminId, token);
                break;
            case 1:
                // use Maria
                iActionAndProcessService.labelStudents(userIdList, courseIdList, "maria", adminId, token);
                break;
            default:
                return JSONResult.errorMsg("Unexpected model ID");
        }
        log.info("returning check token");
        return JSONResult.ok(token);
    }

    // 创建一个token，用来当redis的key
    private static String createToken(String adminId) {
        Map<String, Object> dummyMapper = new HashMap<>();
        dummyMapper.put("adminID", adminId);
        dummyMapper.put("currentTime", System.currentTimeMillis());
        return JWTUtil.createToken(dummyMapper, "key".getBytes());
    }


    /**
     * @return error message or a JSON contains isFinished, numFinished. When isFinised is true, the download link to the zip file will also be added.
     *
     * This Mapping enable the front end to check the progress of the labelling prcess
     *
     */
    @PostMapping("/label-model/check-progress")
    @ResponseBody
    public JSONResult checkProgress(@RequestBody Object body){

        String checkToken = JSONUtil.parseObj(body).getStr("checkToken");
        Map<String, Object> result = new HashMap<>();
        if(iGlobalCache.hasKey(checkToken)){
            String isFinished = String.valueOf(iGlobalCache.hget(checkToken, "is-finished"));
            result.put("isFinished", isFinished);
            result.put("numFinished", iGlobalCache.hget(checkToken, "num-finished"));

            if(Objects.equals(isFinished, "true")){
                result.put("downloadLink", iGlobalCache.hget(checkToken, "download-link"));
            }
            return JSONResult.ok(result);
        }else {
            return JSONResult.errorMsg("progress token not exist");
        }
    }
}
