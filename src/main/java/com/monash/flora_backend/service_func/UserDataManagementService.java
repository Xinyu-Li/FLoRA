package com.monash.flora_backend.service_func;

import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.monash.flora_backend.config.cache.IGlobalCache;
import com.monash.flora_backend.constant.MyConstant;
import com.monash.flora_backend.constant.MyMoodleConfigConstant;
import com.monash.flora_backend.controller.req.SearchUserReq;
import com.monash.flora_backend.controller.resp.AllCourseAndCategoryResp;
import com.monash.flora_backend.controller.resp.OverviewDataForCourseResp;
import com.monash.flora_backend.controller.resp.OverviewDataForUserResp;
import com.monash.flora_backend.controller.vo.*;
import com.monash.flora_backend.dao.entity.*;
import com.monash.flora_backend.service.*;
import com.monash.flora_backend.service_moodle.*;
import com.monash.flora_backend.util.MyBeanCopyUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.nio.file.Path;
import java.util.*;
import java.util.function.Predicate;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * @author Xinyu Li
 * @date 3/6/2024
 */
@Slf4j
@RequiredArgsConstructor
@Service
public class UserDataManagementService {
    private final IMdlCourseCategoriesService iMdlCourseCategoriesService;
    private final IMdlCourseService iMdlCourseService;
    private final IMdlUserService iMdlUserService;
    private final ITraceDataService iTraceDataService;
    private final ITraceDataRealTimeProcessService iTraceDataRealTimeProcessService;
    private final IAnnotationService iAnnotationService;
    private final IPlannerService iPlannerService;
    private final IMdlEnrolService iMdlEnrolService;
    private final IMdlQuizGradesService iMdlQuizGradesService;

    private final IEssayService iEssayService;
    private final IUserChatgptLogService iUserChatgptLogService;
    private final IUserTeacherLogService iUserTeacherLogService;
    private final IRuleBaseCheckGrammarService iRuleBaseCheckGrammarService;
    private final IRuleBaseWritingChecklistService iRuleBaseWritingChecklistService;
    private final IRuleBaseOriginalityService iRuleBaseOriginalityService;
    private final IRuleBaseIntegrationAndElaborationService iRuleBaseIntegrationAndElaborationService;
    private final IDictionaryLogService iDictionaryLogService;

    private final IMdlQuizService iMdlQuizService;
    private final IMdlSurveyService iMdlSurveyService;
    private final IMdlQuestionnaireService iMdlQuestionnaireService;
    private final IMdlFeedbackService iMdlFeedbackService;
    private final FileStorageService iFileStorageService;
    private final IUserDataManagementService iUserDataManagementService;

    private final IDeletedAnnotationService iDeletedAnnotationService;
    private final IScaffoldService iScaffoldService;
    private final IUserStartTimeService iUserStartTimeService;
    private final IWholePageAnnotationService iWholePageAnnotationService;
    private final IGptScaffoldService iGptScaffoldService;
    private final IGlobalCache iGlobalCache;



    public OverviewDataForUserResp findOverviewDataForUser(SearchUserReq searchUserReq) {

        List<Long> courseIdList = searchUserReq.getCourseIdList(); //默认为空 ""
        Set<Long> courseIdSet = new HashSet<>(courseIdList);

        String usernamePattern = searchUserReq.getUsernamePattern(); //如果没有，默认为 ""

        // 此处时间 用来check 用户创建时间
        long startTime = Long.parseLong(searchUserReq.getStartTime()); //默认为0L 调用时候转换时间戳(毫秒)  timestamp
        long endTime = Long.parseLong(searchUserReq.getEndTime()); //默认为0L 调用时候转换时间戳(毫秒) timestamp

        Predicate<MdlUserEnrolCourseIdVO> predicate = item -> true;
        if (startTime != 0L) {
            predicate = predicate.and(item -> Long.parseLong(item.getTimecreated())*1000 >= startTime);
        }
        if (endTime != 0L) {
            predicate = predicate.and(item -> Long.parseLong(item.getTimecreated())*1000 <= endTime);
        }
        if (!StrUtil.isEmpty(usernamePattern)) {
            predicate = predicate.and(item -> item.getUsername().contains(usernamePattern));
        }
        if (!courseIdList.isEmpty()) {
            predicate = predicate.and(item -> courseIdList.contains(item.getCourseid()));
        }

        //找到所有 user，并找到user enrol了哪几门课
        List<MdlUserEnrolCourseIdVO> mdlUserEnrolCourseIdVOList = iMdlUserService.findAllUserEnrolCourse();
        //根据所输入条件过滤
        List<MdlUserEnrolCourseIdVO> filteredList = mdlUserEnrolCourseIdVOList.stream().filter(predicate).collect(Collectors.toList());
        if (filteredList.isEmpty()) {
            return new OverviewDataForUserResp(); // 未匹配到数据
        }

//        Set<Long> enroledCourseIdSet = filteredList.stream().mapToLong(MdlUserEnrolCourseIdVO::getCourseid).boxed().collect(Collectors.toSet());
        Set<Long> enrolledCourseIdSet = new HashSet<>(courseIdList);
        //找到所有用户enrol的course
        Map<Long, MdlCourse> idCourseMap = iMdlCourseService.listByIds(enrolledCourseIdSet).stream().collect(Collectors.toMap(MdlCourse::getId, mdlCourse -> mdlCourse));

        Map<Long, MdlUserVO> finalResult = new HashMap<>(); //userid 和user对象

        log.info("user filteredList size:" + filteredList.size() + "-------idCourseMap size:" + idCourseMap.size());

        // 将所有找到的user 信息复制到新的list中
//        filteredList.forEach(mdlUserEnrolCourseIdVO -> {
        for (int i = 0; i < filteredList.size(); i++) {
            // todo: 这里的loop用来测试，在loop特定次数后停止，上线时删除
//            if (i > 1000) {
//                break;
//            }
            MdlUserEnrolCourseIdVO mdlUserEnrolCourseIdVO = filteredList.get(i);

            Long userId = mdlUserEnrolCourseIdVO.getId();
            MdlUserVO mdlUserVO;
            //因为同一个user 会enrol 不同的course
            log.info("user id:" + userId + "------username:" + mdlUserEnrolCourseIdVO.getUsername());
            // 判断是不是需要的courseId
            if(courseIdSet.contains(mdlUserEnrolCourseIdVO.getCourseid())) {

                MdlCourse mdlCourse = idCourseMap.get(mdlUserEnrolCourseIdVO.getCourseid());
                MdlUserCourseDataVO mdlUserCourseDataVO = new MdlUserCourseDataVO();
                mdlUserCourseDataVO.setCourseId(mdlCourse.getId());
                mdlUserCourseDataVO.setCourseFullname(mdlCourse.getFullname());
                mdlUserCourseDataVO.setCategory(mdlCourse.getCategory());
                mdlUserCourseDataVO.setTimecreated(mdlCourse.getTimecreated().toString());

                // 如果courseId 在 MyConstant.NEED_TRACE_COURSE_ID_LIST 中，则 去查询以下表，否则不需要查询，直接返回false，显示No Trace Log Data
                // 检查是否有essay
                // 检查是否有trace log
                // 检查是否有annotation
                // 检查是否有planner
                // 检查是否有ChatGPT log
                // 检查是否有teacherChat
                // 检查是否有rule base log
                // 检查是否有dictionary log
                // todo: This is for testing, 这里会filter 特定的course ID， 只有包括在这几个course id里的数据会被提取
                MyMoodleConfigConstant.NEED_TRACE_COURSE_ID_LIST = List.of(3L, 4L, 5L); //
                if (mdlCourse.getId() == 3)
                    log.info("id == 3 is true");
                if (!MyMoodleConfigConstant.NEED_TRACE_COURSE_ID_LIST.contains(mdlCourse.getId())) {
                    log.info("not contains any courseId in NEED_TRACE_COURSE_ID_LIST-----course id:" + mdlCourse.getId());
                    mdlUserCourseDataVO.setHasEssayData(false);
                    mdlUserCourseDataVO.setHasTraceData(false);
                    mdlUserCourseDataVO.setHasAnnotationData(false);
                    mdlUserCourseDataVO.setHasPlannerData(false);
                    mdlUserCourseDataVO.setHasChatgptLogData(false);
                    mdlUserCourseDataVO.setHasTeacherChatLogData(false);
                    mdlUserCourseDataVO.setHasChecklistLogData(false);
                    mdlUserCourseDataVO.setHasDictionaryLogData(false);
                    mdlUserCourseDataVO.setHasGptScaffoldData(false);
                    mdlUserCourseDataVO.setHasRuleBasedScaffoldData(false);
                } else {
                    log.info("NEED_TRACE_COURSE_ID_LIST contains course id >>>>>>>>>>>>>");
                    CountAllTraceLogVO countAllTraceLogVO = iTraceDataService.countByUserIdAndCourseIdForAllTraceLogs(userId, mdlCourse.getId());
                    mdlUserCourseDataVO.setHasEssayData(countAllTraceLogVO.isHasEssayData());
                    mdlUserCourseDataVO.setHasTraceData(countAllTraceLogVO.isHasTraceData());
                    mdlUserCourseDataVO.setHasAnnotationData(countAllTraceLogVO.isHasAnnotationData());
                    mdlUserCourseDataVO.setHasPlannerData(countAllTraceLogVO.isHasPlannerData());
                    mdlUserCourseDataVO.setHasChatgptLogData(countAllTraceLogVO.isHasChatgptLogData());
                    mdlUserCourseDataVO.setHasTeacherChatLogData(countAllTraceLogVO.isHasTeacherChatLogData());
                    mdlUserCourseDataVO.setHasChecklistLogData(countAllTraceLogVO.isHasGrammarData() || countAllTraceLogVO.isHasAcademicData() || countAllTraceLogVO.isHasOriginalityData() || countAllTraceLogVO.isHasIntegrationElaborationData());
                    mdlUserCourseDataVO.setHasDictionaryLogData(countAllTraceLogVO.isHasDictionaryLogData());
                    mdlUserCourseDataVO.setHasGptScaffoldData(countAllTraceLogVO.isHasGptScaffoldData());
                    mdlUserCourseDataVO.setHasRuleBasedScaffoldData(countAllTraceLogVO.isHasRuleBasedScaffoldData());

//                    QueryWrapper<Essay> essayQueryWrapper = new QueryWrapper<>();
//                    essayQueryWrapper.eq("user_id", userId).eq("course_id", mdlCourse.getId());
//                    int countEssayData = iEssayService.count(essayQueryWrapper);
//
//                    mdlUserCourseDataVO.setHasEssayData(countEssayData > 0);
//
//                    QueryWrapper<TraceData> traceQueryWrapper = new QueryWrapper<>();
//                    traceQueryWrapper.eq("user_id", userId).eq("course_id", mdlCourse.getId());
//                    int countTraceData = iTraceDataService.count(traceQueryWrapper);
//                    mdlUserCourseDataVO.setHasTraceData(countTraceData > 0);
//
//                    QueryWrapper<Annotation> annotationQueryWrapper = new QueryWrapper<>();
//                    annotationQueryWrapper.eq("user_id", userId).eq("course_id", mdlCourse.getId());
//                    int countAnnotationData = iAnnotationService.count(annotationQueryWrapper);
//                    mdlUserCourseDataVO.setHasAnnotationData(countAnnotationData > 0);
//
//                    QueryWrapper<Planner> plannerQueryWrapper = new QueryWrapper<>();
//                    plannerQueryWrapper.eq("user_id", userId).eq("course_id", mdlCourse.getId());
//                    int countPlannerData = iPlannerService.count(plannerQueryWrapper);
//                    mdlUserCourseDataVO.setHasPlannerData(countPlannerData > 0);
//
//                    QueryWrapper<UserChatgptLog> userChatgptLogQueryWrapper = new QueryWrapper<>();
//                    userChatgptLogQueryWrapper.eq("user_id", userId).eq("course_id", mdlCourse.getId());
//                    int countUserChatgptLogData = iUserChatgptLogService.count(userChatgptLogQueryWrapper);
//                    mdlUserCourseDataVO.setHasChatgptLogData(countUserChatgptLogData > 0);
//
//                    QueryWrapper<UserTeacherLog> userTeacherLogQueryWrapper = new QueryWrapper<>();
//                    userTeacherLogQueryWrapper.eq("user_id", userId).eq("course_id", mdlCourse.getId());
//                    int countUserTeacherLogData = iUserTeacherLogService.count(userTeacherLogQueryWrapper);
//                    mdlUserCourseDataVO.setHasTeacherChatLogData(countUserTeacherLogData > 0);
//
//                    QueryWrapper<RuleBaseCheckGrammar> ruleBaseCheckGrammarQueryWrapper = new QueryWrapper<>();
//                    ruleBaseCheckGrammarQueryWrapper.eq("user_id", userId).eq("course_id", mdlCourse.getId());
//                    QueryWrapper<RuleBaseWritingChecklist> ruleBaseWritingChecklistQueryWrapper = new QueryWrapper<>();
//                    ruleBaseWritingChecklistQueryWrapper.eq("user_id", userId).eq("course_id", mdlCourse.getId());
//                    QueryWrapper<RuleBaseOriginality> ruleBaseOriginalityQueryWrapper = new QueryWrapper<>();
//                    ruleBaseOriginalityQueryWrapper.eq("user_id", userId).eq("course_id", mdlCourse.getId());
//                    QueryWrapper<RuleBaseIntegrationAndElaboration> ruleBaseIntegrationAndElaborationQueryWrapper = new QueryWrapper<>();
//                    ruleBaseIntegrationAndElaborationQueryWrapper.eq("user_id", userId).eq("course_id", mdlCourse.getId());
//                    int countRuleBaseData = iRuleBaseCheckGrammarService.count(ruleBaseCheckGrammarQueryWrapper) +
//                            iRuleBaseWritingChecklistService.count(ruleBaseWritingChecklistQueryWrapper) +
//                            iRuleBaseOriginalityService.count(ruleBaseOriginalityQueryWrapper) +
//                            iRuleBaseIntegrationAndElaborationService.count(ruleBaseIntegrationAndElaborationQueryWrapper);
//                    mdlUserCourseDataVO.setHasRuleBaseLogData(countRuleBaseData > 0);
//
//                    QueryWrapper<DictionaryLog> dictionaryLogQueryWrapper = new QueryWrapper<>();
//                    dictionaryLogQueryWrapper.eq("user_id", userId).eq("course_id", mdlCourse.getId());
//                    int countDictionaryLogData = iDictionaryLogService.count(dictionaryLogQueryWrapper);
//                    mdlUserCourseDataVO.setHasDictionaryLogData(countDictionaryLogData > 0);
                }

                //以下是moodle 支持的四种问卷形式
                // 检查是否有quiz
                // 检查是否有survey
                // 检查是否有feedback
                // 检查是否有questionnaire
                // 检查这门课是否有 以上4个module
                //TODO：需要重新设计
//                mdlUserCourseDataVO.setHasQuizData(iMdlQuizService.countByUserIdAndCourseId(userId, mdlCourse.getId()) > 0);
//                mdlUserCourseDataVO.setHasSurveyData(iMdlSurveyService.countByUserIdAndCourseId(userId, mdlCourse.getId()) > 0);

                //mdlUserCourseDataVO.setHasFeedbackData(iMdlQuestionnaireService.countByUserIdAndCourseId(userId, mdlCourse.getId()) > 0);
//                mdlUserCourseDataVO.setHasQuestionnaireData(iMdlFeedbackService.countByUserIdAndCourseId(userId, mdlCourse.getId()) > 0);

                if (!finalResult.containsKey(userId)) {
                    mdlUserVO = MyBeanCopyUtils.copyBean(mdlUserEnrolCourseIdVO, MdlUserVO.class);
                    mdlUserVO.setUserCourseDataVOList(new ArrayList<>());

                    // 用户个人相关数据
                    QueryWrapper<UserDataManagement> userDataManagementQueryWrapper = new QueryWrapper<>();
                    userDataManagementQueryWrapper.eq("user_id", userId);
                    UserDataManagement userDataManagement = iUserDataManagementService.getOne(userDataManagementQueryWrapper);

                    if (userDataManagement != null) {
                        mdlUserVO.setHas_interview_data(userDataManagement.getHasInterviewData());
                        mdlUserVO.setInterview_data_path(userDataManagement.getInterviewDataPath());
                        mdlUserVO.setHas_eye_tracking_data(userDataManagement.getHasEyeTrackingData());
                        mdlUserVO.setEye_tracking_data_path(userDataManagement.getEyeTrackingDataPath());
                        mdlUserVO.setHas_video_data(userDataManagement.getHasVideoData());
                        mdlUserVO.setVideo_data_path(userDataManagement.getVideoDataPath());
                        mdlUserVO.setEssay_mark_by_gpt(userDataManagement.getEssayMarkByGpt());
                        mdlUserVO.setEssay_comment_by_gpt(userDataManagement.getEssayCommentByGpt());
                        mdlUserVO.setEssay_mark_by_human(userDataManagement.getEssayMarkByHuman());
                        mdlUserVO.setEssay_comment_by_human(userDataManagement.getEssayCommentByHuman());
                        mdlUserVO.setHas_user_feedback_for_essay_mark_comment(userDataManagement.getHasUserFeedbackForEssayMarkComment());
                        mdlUserVO.setUser_feedback_for_essay_mark_comment_path(userDataManagement.getUserFeedbackForEssayMarkCommentPath());
                    }
                } else {
                    mdlUserVO = finalResult.get(userId);
                }
                mdlUserVO.getUserCourseDataVOList().add(mdlUserCourseDataVO);
                finalResult.put(mdlUserVO.getId(), mdlUserVO);
            }
        }

        //界面展示： 行号，username，createtime，enrol course，
        OverviewDataForUserResp overviewDataForUserResp = new OverviewDataForUserResp();
        overviewDataForUserResp.setMdlUserVOList(new ArrayList<>(finalResult.values()));
        return overviewDataForUserResp;
    }

//    private CompletableFuture<> asyncCountByUserIdAndCourseIdForAllTraceLogs(MdlUserCourseDataVO mdlUserCourseDataVO) {
//        CountAllTraceLogVO countAllTraceLogVO = iTraceDataService.countByUserIdAndCourseIdForAllTraceLogs(userId, mdlCourse.getId());
//        mdlUserCourseDataVO.setHasEssayData(countAllTraceLogVO.getEssayCount() > 0);
//        mdlUserCourseDataVO.setHasTraceData(countAllTraceLogVO.getTraceCount() > 0);
//        mdlUserCourseDataVO.setHasAnnotationData(countAllTraceLogVO.getAnnotationCount() > 0);
//        mdlUserCourseDataVO.setHasPlannerData(countAllTraceLogVO.getPlannerCount() > 0);
//        mdlUserCourseDataVO.setHasChatgptLogData(countAllTraceLogVO.getChatgptLogCount() > 0);
//        mdlUserCourseDataVO.setHasTeacherChatLogData(countAllTraceLogVO.getUserTeacherLogCount() > 0);
//        mdlUserCourseDataVO.setHasChecklistLogData(countAllTraceLogVO.getGrammarCount() + countAllTraceLogVO.getAcademicCount() + countAllTraceLogVO.getOriginalityCount() + countAllTraceLogVO.getIntegrationElaborationCount() > 0);
//        mdlUserCourseDataVO.setHasDictionaryLogData(countAllTraceLogVO.getDictionaryCount() > 0);
//        mdlUserCourseDataVO.setHasGptScaffoldData(countAllTraceLogVO.getGptScaffoldCount() > 0);
//        mdlUserCourseDataVO.setHasRuleBasedScaffoldData(countAllTraceLogVO.getRuleBaseScaffoldCount() > 0);
//
//        return CompletableFuture.supplyAsync(() -> new UserInfo(userId, "Name" + userId));
//    }

    /**
     * 课程目录*
     */
    public AllCourseAndCategoryResp findAllCourseCategoriesAndCourses() {

        List<MdlCourseCategories> mdlCourseCategoriesList = iMdlCourseCategoriesService.list();

        QueryWrapper<MdlCourse> mdlCourseQueryWrapper = new QueryWrapper<>();
        mdlCourseQueryWrapper.ne("category", 0);
        List<MdlCourse> mdlCourseList = iMdlCourseService.list(mdlCourseQueryWrapper);

        AllCourseAndCategoryResp resp = new AllCourseAndCategoryResp();
        resp.setMdlCourseVOList(MyBeanCopyUtils.copyBeanList(mdlCourseList, MdlCourseVO.class));
        resp.setMdlCourseCategoriesVOList(MyBeanCopyUtils.copyBeanList(mdlCourseCategoriesList, MdlCourseCategoriesVO.class));

        HashMap<Long, List<MdlCourseVO>> courseMap = new HashMap<>();
        resp.getMdlCourseVOList().forEach((course) -> {
            List<MdlCourseVO> list;
            if (courseMap.containsKey(course.getCategory())){
                list = courseMap.get(course.getCategory());
            }else {
                list = new ArrayList<>();
            }
            list.add(course);
            courseMap.put(course.getCategory(), list);
        });
        resp.setMdlCourseVOMap(courseMap);

        return resp;// 此处StudentInfo list 返回空
    }

    /**
     * 按课程搜索*
     * @param courseId
     * @return
     */
    public CourseOverviewVO findOverviewDataForCourseByCourseId(Long courseId) {

        CourseOverviewVO courseOverviewVO = new CourseOverviewVO();

        //iMdlCourseService.
        QueryWrapper<MdlCourse> courseQueryWrapper = new QueryWrapper<>();
        courseQueryWrapper.eq("id", courseId);
        MdlCourse course = iMdlCourseService.getOne(courseQueryWrapper);
        courseOverviewVO.setCourseId(courseId);
        courseOverviewVO.setCourseName(course.getFullname());

        QueryWrapper<MdlCourseCategories> courseCategoriesQueryWrapper = new QueryWrapper<>();
        courseCategoriesQueryWrapper.eq("id", course.getCategory());
        MdlCourseCategories courseCategories = iMdlCourseCategoriesService.getOne(courseCategoriesQueryWrapper);
        courseOverviewVO.setCategoryName(courseCategories.getName());
        courseOverviewVO.setCategoryId(courseCategories.getId());

        // 多少enrol 用户
        List<MdlUserVO> mdlUserVOList = iMdlUserService.findAllUserByCourseId(courseId.toString());
        courseOverviewVO.setNumOfMdlUser(mdlUserVOList.size());

        // 总共多少trace data
        QueryWrapper<TraceData> traceDataQueryWrapper = new QueryWrapper<>();
        traceDataQueryWrapper.eq("course_id", courseId);
        int numOfTraceData = iTraceDataService.count(traceDataQueryWrapper);
        courseOverviewVO.setNumOfTraceData(numOfTraceData);

        // 平均每人多少trace
        courseOverviewVO.setAvgNumOfTraceData((double) numOfTraceData / mdlUserVOList.size());

        // 总共多少annotation data
        QueryWrapper<Annotation> annotationQueryWrapper = new QueryWrapper<>();
        annotationQueryWrapper.eq("course_id", courseId);
        int numOfAnnotationData = iAnnotationService.count(annotationQueryWrapper);
        courseOverviewVO.setNumOfAnnotationData(numOfAnnotationData);

        // 平均每人多少annotation
        courseOverviewVO.setAvgNumOfAnnotationData((double) numOfAnnotationData / mdlUserVOList.size());

        // 总共多少planner data
        QueryWrapper<Planner> plannerQueryWrapper = new QueryWrapper<>();
        plannerQueryWrapper.eq("course_id", courseId);
        int numOfPlannerData = iPlannerService.count(plannerQueryWrapper);
        courseOverviewVO.setNumOfPlannerData(numOfPlannerData);

        // 平均每人多少planner
        courseOverviewVO.setAvgNumOfPlannerData((double) numOfPlannerData / mdlUserVOList.size());

        // 上传在文件夹中的相关数据
        Stream<Path> pathStream = iFileStorageService.loadAll(MyMoodleConfigConstant.FILE_UPLOAD_PATH, courseId.toString());

        ArrayList<FileVO> fileList = new ArrayList<>();
        if (pathStream != null){
            pathStream
                    .filter(s -> !s.toString().equals(".DS_Store"))
                    .forEach(s -> {
                        FileVO fileVO = new FileVO();
                        fileVO.setFilename(s.toString());
                        fileVO.setUrl(MyMoodleConfigConstant.FLORA_BACKEND_URL + "/manage/data/files/download/" + courseId + "/" + s);
                        fileList.add(fileVO);
                    });
        }

        courseOverviewVO.setFileList(fileList);

        return courseOverviewVO;
    }

    public OverviewDataForCourseResp findOverviewDataForCourse(List<Long> courseId) {

        OverviewDataForCourseResp resp = new OverviewDataForCourseResp();

        List<CourseOverviewVO> courseOverviewList = new ArrayList<>();
        courseId.forEach(id -> courseOverviewList.add(findOverviewDataForCourseByCourseId(id)));
        resp.setCourseOverviewList(courseOverviewList);

        return resp;
    }



    public void clearAllUserLog(Long userId) {
        iAnnotationService.removeByUserId(userId);
        iDeletedAnnotationService.removeByUserId(userId);
        iEssayService.removeByUserId(userId);
        iPlannerService.removeByUserId(userId);

        iScaffoldService.removeByUserId(userId);
        iTraceDataService.removeByUserId(userId);
        iTraceDataRealTimeProcessService.removeByUserId(userId);
        iUserChatgptLogService.removeByUserId(userId);
        iUserTeacherLogService.removeByUserId(userId);
        iUserStartTimeService.removeByUserId(userId);
        iWholePageAnnotationService.removeByUserId(userId);
        iGptScaffoldService.removeByUserId(userId);

        Set<String> keys1 = iGlobalCache.getKeys(MyConstant.REDIS_SCAFFOLD_INFO + userId + "*");
        Set<String> keys2 = iGlobalCache.getKeys(MyConstant.REDIS_ACTION_LABEL_LIST + userId + "*");
        Set<String> keys3 = iGlobalCache.getKeys(MyConstant.REDIS_GPT_CHAT_LOG_LIST + userId + "*");
        Set<String> keys4 = iGlobalCache.getKeys(MyConstant.REDIS_GPT_SCAFFOLD_LIST + userId + "*");

        Set<String> keys5 = iGlobalCache.getKeys(MyConstant.REDIS_TEACHER_CHAT_LOG_LIST + userId + "*");
        Set<String> keys6 = iGlobalCache.getKeys(MyConstant.REDIS_TEMP_TRACE_DATA_LIST + userId + "*");
        Set<String> keys7 = iGlobalCache.getKeys(MyConstant.REDIS_SIMPLIFIED_TEMP_TRACE_DATA_LIST + userId + "*");
        Set<String> keys8 = iGlobalCache.getKeys(MyConstant.REDIS_SIMPLIFIED_SUB_ACTION_LIST + userId + "*");
        Set<String> keys9 = iGlobalCache.getKeys(MyConstant.REDIS_ACTION_EXIST_SET + userId + "*");
        Set<String> keys10 = iGlobalCache.getKeys(MyConstant.REDIS_PLANNER_SELECT_INDEX + userId + "*");
        Set<String> keys11 = iGlobalCache.getKeys(MyConstant.REDIS_GPT_SCAFFOLD_TRIGGER + userId + "*");
        Set<String> keys12 = iGlobalCache.getKeys(MyConstant.REDIS_TASK_START_TIME + userId + "*");


        Set<String> keys13 = iGlobalCache.getKeys(userId + "-page-viewed-*");
        Set<String> keys14 = iGlobalCache.getKeys("tool-used-" + userId + "*");




        keys1.addAll(keys1);
        keys1.addAll(keys2);
        keys1.addAll(keys3);
        keys1.addAll(keys4);
        keys1.addAll(keys5);

        keys1.addAll(keys6);
        keys1.addAll(keys7);
        keys1.addAll(keys8);
        keys1.addAll(keys9);
        keys1.addAll(keys10);

        keys1.addAll(keys11);
        keys1.addAll(keys12);
        keys1.addAll(keys13);
        keys1.addAll(keys14);
        log.info(keys1.toString());
        keys1.forEach(key -> {
            if (iGlobalCache.hasKey(key)) {
                iGlobalCache.del(key);
            }
        });
    }
}
