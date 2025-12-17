package com.monash.flora_backend.service_func;

import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.json.JSONUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.monash.flora_backend.config.cache.IGlobalCache;
import com.monash.flora_backend.constant.MyConstant;
import com.monash.flora_backend.constant.MyConstantCopesModelSRLPattern;
import com.monash.flora_backend.constant.MyConstantMariaModelSRLPattern;
import com.monash.flora_backend.controller.vo.ProcessDurationVO;
import com.monash.flora_backend.controller.vo.TraceDataRealTimeProcessVO;
import com.monash.flora_backend.controller.vo.TraceDataVO;
import com.monash.flora_backend.dao.entity.TraceData;
import com.monash.flora_backend.dao.entity.TraceDataRealTimeProcess;
import com.monash.flora_backend.dao.entity.UserStartTime;
import com.monash.flora_backend.service.ITraceDataRealTimeProcessService;
import com.monash.flora_backend.service.ITraceDataService;
import com.monash.flora_backend.service.IUserStartTimeService;
import com.monash.flora_backend.util.MyBeanCopyUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;


@Service
@Slf4j
@RequiredArgsConstructor
public class ActionAndProcessService {
    private final ITraceDataService iTraceDataService;
    private final ITraceDataRealTimeProcessService iTraceDataRealTimeProcessService;
    private final IUserStartTimeService iUserStartTimeService;

    private final IGlobalCache iGlobalCache;
    private final ExportExcelFileStorageService exportExcelFileStorageService;


    private void mergeSubActionsForRealTimeProcess(List<String> subActionList, List<TraceDataRealTimeProcess> traceDataList) { // TODO 查看如何把多行相同action合并
        if (traceDataList == null) {
            return;
        }
        String tempValue = null;
        for (TraceDataRealTimeProcess t : traceDataList) {

            String value = t.getId() + "--" + t.getSubActionLabel();

            if (subActionList.size() >= 3) {
                String lastItem = subActionList.get(subActionList.size() - 1);
                String lastSubActionLabel = lastItem.split("--")[1];

                String secondLastItem = subActionList.get(subActionList.size() - 2);
                String secondLastSubActionLabel = secondLastItem.split("--")[1];

                String thirdLastItem = subActionList.get(subActionList.size() - 3);
                String thirdLastSubActionLabel = thirdLastItem.split("--")[1];

                if (!StrUtil.equals(t.getSubActionLabel(), lastSubActionLabel)) { //和最后的不一样就添加
                    if (tempValue != null) {
                        subActionList.add(tempValue);
                        tempValue = null;
                    }
                    subActionList.add(value);
                } else if (StrUtil.equals(t.getSubActionLabel(), lastSubActionLabel) && !StrUtil.equals(t.getSubActionLabel(), secondLastSubActionLabel)) { // 和最后的一样，和倒数第二的不一样 也添加
                    subActionList.add(value);
                } else if (StrUtil.equals(t.getSubActionLabel(), lastSubActionLabel) && StrUtil.equals(t.getSubActionLabel(), secondLastSubActionLabel)) { // 和最后的一样，和倒数第二的也一样，不添加
                    tempValue = value; // 保留值，未被添加，直到遇到下一个不一样的才添加
                }
                /*else if (Set.of("INSTRUCTION", "READING", "ESSAY").contains(t.getActionLabel() == null ? "" : t.getActionLabel()) && StrUtil.equals(t.getSubActionLabel(), lastSubActionLabel) && !StrUtil.equals(t.getSubActionLabel(), secondLastSubActionLabel)) { // 和最后的一样，和倒数第二的不一样 也添加
                    subActionList.add(value);
                } else if (Set.of("INSTRUCTION", "READING", "ESSAY").contains(t.getActionLabel() == null ? "" : t.getActionLabel()) && StrUtil.equals(t.getSubActionLabel(), lastSubActionLabel) && StrUtil.equals(t.getSubActionLabel(), secondLastSubActionLabel)) { // 和最后的一样，和倒数第二的也一样，不添加
                    tempValue = value; // 保留值，未被添加，直到遇到下一个不一样的才添加
                }*/
//                else if (Set.of("INSTRUCTION", "READING", "ESSAY").contains(t.getActionLabel() == null ? "" : t.getActionLabel()) && StrUtil.equals(t.getSubActionLabel(), lastSubActionLabel)) {
//                    tempValue = value;
//                }
            } else {
                subActionList.add(value);
            }
            if (Objects.equals(t.getInstantEvent(),"ESSAY_TASK_END")) {
                break; // task end 之后的 记录 不要
            }
        }
    }

    private void mergeSubActions(List<String> subActionList, List<TraceData> traceDataList) { // TODO 查看如何把多行相同action合并
        if (traceDataList == null) {
            return;
        }
        String tempValue = null;
        for (TraceData t : traceDataList) {

            String value = t.getId() + "--" + t.getSubActionLabel();

            if (subActionList.size() >= 3) {
                String lastItem = subActionList.get(subActionList.size() - 1);
                String lastSubActionLabel = lastItem.split("--")[1];

                String secondLastItem = subActionList.get(subActionList.size() - 2);
                String secondLastSubActionLabel = secondLastItem.split("--")[1];

                String thirdLastItem = subActionList.get(subActionList.size() - 3);
                String thirdLastSubActionLabel = thirdLastItem.split("--")[1];

                if (!StrUtil.equals(t.getSubActionLabel(), lastSubActionLabel)) { //和最后的不一样就添加
                    if (tempValue != null) {
                        subActionList.add(tempValue);
                        tempValue = null;
                    }
                    subActionList.add(value);
                } else if (StrUtil.equals(t.getSubActionLabel(), lastSubActionLabel) && !StrUtil.equals(t.getSubActionLabel(), secondLastSubActionLabel)) { // 和最后的一样，和倒数第二的不一样 也添加
                    subActionList.add(value);
                } else if (StrUtil.equals(t.getSubActionLabel(), lastSubActionLabel) && StrUtil.equals(t.getSubActionLabel(), secondLastSubActionLabel)) { // 和最后的一样，和倒数第二的也一样，不添加
                    tempValue = value; // 保留值，未被添加，直到遇到下一个不一样的才添加
                }
                /*else if (Set.of("INSTRUCTION", "READING", "ESSAY").contains(t.getActionLabel() == null ? "" : t.getActionLabel()) && StrUtil.equals(t.getSubActionLabel(), lastSubActionLabel) && !StrUtil.equals(t.getSubActionLabel(), secondLastSubActionLabel)) { // 和最后的一样，和倒数第二的不一样 也添加
                    subActionList.add(value);
                } else if (Set.of("INSTRUCTION", "READING", "ESSAY").contains(t.getActionLabel() == null ? "" : t.getActionLabel()) && StrUtil.equals(t.getSubActionLabel(), lastSubActionLabel) && StrUtil.equals(t.getSubActionLabel(), secondLastSubActionLabel)) { // 和最后的一样，和倒数第二的也一样，不添加
                    tempValue = value; // 保留值，未被添加，直到遇到下一个不一样的才添加
                }*/
//                else if (Set.of("INSTRUCTION", "READING", "ESSAY").contains(t.getActionLabel() == null ? "" : t.getActionLabel()) && StrUtil.equals(t.getSubActionLabel(), lastSubActionLabel)) {
//                    tempValue = value;
//                }
            } else {
                subActionList.add(value);
            }
            if (Objects.equals(t.getInstantEvent(),"ESSAY_TASK_END")) {
                break; // task end 之后的 记录 不要
            }
        }
    }


    private Long getEssayTaskStartTime(Long userId, String courseId) { // 该方法用于查找任务的开始时间
        QueryWrapper<UserStartTime> essayStartQueryWrapper = new QueryWrapper<>();
        essayStartQueryWrapper.eq("user_id", userId);
        if (!StrUtil.isEmpty(courseId) && !courseId.equals("0")) {
            essayStartQueryWrapper.eq("course_id", courseId);
        }
        essayStartQueryWrapper.last("limit 1");
        UserStartTime userStartTime = iUserStartTimeService.getOne(essayStartQueryWrapper);


        if (userStartTime == null) {
            QueryWrapper<TraceData> queryWrapper = new QueryWrapper<>();
            queryWrapper.eq("user_id", userId).eq("course_id", courseId).eq("instant_event", "ESSAY_TASK_START").last("limit 1");
            TraceData one = iTraceDataService.getOne(queryWrapper);
            if (one == null) {
                QueryWrapper<TraceData> queryWrapperFirstItem = new QueryWrapper<>();
                queryWrapperFirstItem.eq("user_id", userId).eq("course_id", courseId).orderByAsc("save_time").last("limit 1");
                TraceData first = iTraceDataService.getOne(queryWrapperFirstItem);
                if (first == null) {
                    log.info("No ESSAY_TASK_START--------------------");
//                    throw new RuntimeException("getEssayTaskStartTime No ESSAY_TASK_START-----userid:" + userId + "------courseId:" + courseId);
                    return -1L;
                } else {
                    return Long.parseLong(first.getSaveTime());
                }
//                return -1L;
            }
//            throw new RuntimeException("No ESSAY_TASK_START--------------------");
            return Long.parseLong(one.getSaveTime());
        }
        return Long.parseLong(userStartTime.getUserStartTime());
    }


    public List<TraceData> getSimplifiedTraceDataFromRedisOrDB(Long userId, String courseId, long taskStartTime, Integer beginMinute, Integer endMinute) {

        return null;
    }

    /**
     * 获取全部 Trace Data
     * @param userId
     * @param courseId
     * @return
     */
    private List<TraceData> getTraceDataFromRedisOrDB(Long userId, String courseId) {
        Set<String> redisOrderedSet = iGlobalCache.getOrderedEvent(MyConstant.REDIS_TEMP_TRACE_DATA_LIST + userId + "-" + courseId, 0L, -1L);
        log.info("-------------redisOrderedSet size:" + (redisOrderedSet == null ? "null" : redisOrderedSet.size()));
        List<TraceData> traceDataList;
        if (CollUtil.isEmpty(redisOrderedSet)) { // redis中没有数据
            log.info("redis does not contain data----------------------------------");
            QueryWrapper<TraceData> queryWrapper = new QueryWrapper<>();
            queryWrapper.eq("user_id", userId).eq("course_id", courseId).orderByAsc("save_time");
            traceDataList = iTraceDataService.list(queryWrapper);
        } else {
            traceDataList = redisOrderedSet.stream()
                    .map((obj) -> JSONUtil.toBean(obj, TraceData.class)).collect(Collectors.toList());
        }
        return traceDataList;
    }
    public List<TraceData> getTraceDataFromRedisOrDB(Long userId, String courseId, long taskStartTime, Integer beginMinute, Integer endMinute) { // 该方法用于获取trace data
        if (beginMinute == -1 && endMinute == -1) { // 获取全部
            return getTraceDataFromRedisOrDB(userId, courseId);
        }

        Set<String> redisOrderedSet = iGlobalCache.getOrderedEvent(MyConstant.REDIS_TEMP_TRACE_DATA_LIST + userId + "-" + courseId, 0L, -1L);
        log.info("-------------redisOrderedSet size:" + (redisOrderedSet == null ? "null" : redisOrderedSet.size()));
        List<TraceData> traceDataList;
        if (CollUtil.isEmpty(redisOrderedSet)) { // redis中没有数据
            log.info("redis does not contain data----------------------------------");
            QueryWrapper<TraceData> queryWrapper = new QueryWrapper<>();
            queryWrapper.eq("user_id", userId).eq("course_id", courseId)
                    .ge("save_time", taskStartTime + beginMinute * 60 * 1000)
                    .le("save_time", taskStartTime + endMinute * 60 * 1000)
                    .orderByAsc("save_time");
            traceDataList = iTraceDataService.list(queryWrapper);
        } else { // redis 中有数据
            // 过滤时间
            traceDataList = redisOrderedSet.stream()
                    .map((obj) -> JSONUtil.toBean(obj, TraceData.class)).filter(x -> Long.parseLong(x.getSaveTime()) > taskStartTime + beginMinute * 60 * 1000 && Long.parseLong(x.getSaveTime()) <= taskStartTime + endMinute * 60 * 1000)
                    .collect(Collectors.toList());

        }
        return traceDataList;
    }

    @Async("asyncPoolTaskExecutor")
    public void labelTimeRangeProcessLabelPatternsAsync(Long userId, String courseId, String modelType, Integer beginMinute, Integer endMinute) {
        log.info("Async processing user into labelTimeRangeProcessLabelPatterns--------------userid:{}---courseid:{}--model type:{}", userId, courseId, modelType);

        labelTimeRangeProcessLabelPatterns(userId, courseId, modelType, beginMinute, endMinute);
    }

    public List<String> labelTimeRangeProcessLabelPatterns(Long userId, String courseId, String modelType, Integer beginMinute, Integer endMinute) {
        log.info("processing user, into labelTimeRangeProcessLabelPatterns--------------userid:{}---courseid:{}--model type:{}", userId, courseId, modelType);

        long taskStartTime = getEssayTaskStartTime(userId, courseId);
        if (taskStartTime == -1) {
            log.error("no taskStartTime --- " + userId);
            return new ArrayList<>();
        }

        List<TraceData> traceDataList = getTraceDataFromRedisOrDB(userId, courseId, taskStartTime, beginMinute, endMinute);

        if (CollUtil.isEmpty(traceDataList)) {
            log.info("traceDataList empty --- ");
            return new ArrayList<>();
        }

        List<String> processPatternBeforeSpecifiedMinList = new ArrayList<>();
        List<String> processPatternAfterSpecifiedMinList = new ArrayList<>();
        Map<String, String> srlProcessPatternRegexMap = new HashMap<>();

        Integer breakpointTime = 15;
        if ("maria".equals(modelType)) {
            breakpointTime = 15;
            processPatternBeforeSpecifiedMinList = MyConstantMariaModelSRLPattern.BEFORE_15MIN_MARIA_MODEL_PROCESS_PATTERN_LIST;
            processPatternAfterSpecifiedMinList = MyConstantMariaModelSRLPattern.AFTER_15MIN_MARIA_MODEL_PROCESS_PATTERN_LIST;
            srlProcessPatternRegexMap = MyConstantMariaModelSRLPattern.MARIA_MODEL_PROCESS_PATTERN_REGEX_MAP;

        } else if ("copes".equals(modelType)) {
            breakpointTime = 5;
            processPatternBeforeSpecifiedMinList = MyConstantCopesModelSRLPattern.BEFORE_5MIN_COPES_MODEL_PROCESS_PATTERN_LIST;
            processPatternAfterSpecifiedMinList = MyConstantCopesModelSRLPattern.AFTER_5MIN_COPES_MODEL_PROCESS_PATTERN_LIST;
            srlProcessPatternRegexMap = MyConstantCopesModelSRLPattern.COPES_MODEL_PROCESS_PATTERN_REGEX_MAP;
        }

        long timeSpecifiedMinutePoint = taskStartTime + breakpointTime * 60 * 1000;
        List<String> srlProcessAppearList = new ArrayList<>();
        List<TraceData> needUpdateList = new ArrayList<>();
        if (breakpointTime <= beginMinute) { // 15 <= beginMinute
            srlProcessAppearList = findSrlProcess(traceDataList, processPatternAfterSpecifiedMinList, modelType, needUpdateList, srlProcessPatternRegexMap);
        } else if (beginMinute < breakpointTime && endMinute > breakpointTime) { // beginMinute < 15 && endMinute > 15
            Map<Boolean, List<TraceData>> specifiedMinTimeGroupingMap = traceDataList.stream().collect(Collectors.groupingBy(x->Long.parseLong(x.getSaveTime()) <= timeSpecifiedMinutePoint));
            List<TraceData> beforeSpecifiedMinTraceDataList = specifiedMinTimeGroupingMap.get(true) == null ? new ArrayList<>() : specifiedMinTimeGroupingMap.get(true);
            List<TraceData> afterSpecifiedMinTraceDataList = specifiedMinTimeGroupingMap.get(false) == null ? new ArrayList<>() : specifiedMinTimeGroupingMap.get(false);
            List<String> srlProcessAppearListBeforeSpecifiedMin = findSrlProcess(beforeSpecifiedMinTraceDataList, processPatternBeforeSpecifiedMinList, modelType, needUpdateList, srlProcessPatternRegexMap);
            List<String> srlProcessAppearListAfterSpecifiedMin = findSrlProcess(afterSpecifiedMinTraceDataList, processPatternAfterSpecifiedMinList, modelType, needUpdateList, srlProcessPatternRegexMap);
            srlProcessAppearList.addAll(srlProcessAppearListBeforeSpecifiedMin);
            srlProcessAppearList.addAll(srlProcessAppearListAfterSpecifiedMin);
        } else { // endMinute <= breakpointTime
            srlProcessAppearList = findSrlProcess(traceDataList, processPatternBeforeSpecifiedMinList, modelType, needUpdateList, srlProcessPatternRegexMap);
        }
        iTraceDataService.myUpdateBatch(needUpdateList);
        return srlProcessAppearList;
    }



    /*private List<String> labelSrlProcessBasedOnConditions(List<TraceData> traceDataList, String modelType, Integer endMinute) {
        List<String> fromRedisList = new ArrayList<>();

        mergeSubActions(fromRedisList, traceDataList);

        String allActionsStr = String.join("=====", fromRedisList) + "=====";

        log.info("allActionsStr--------" + allActionsStr);
        if (StrUtil.isEmpty(allActionsStr)) {
            log.info("allActionsStr is empty-------------------");
            return new ArrayList<>();
        }
        List<String> processPatternList = new ArrayList<>();
        Map<String, String> srlProcessPatternRegexMap = new HashMap<>();
        if ("maria".equals(modelType) && endMinute <= 15) { //所有都是15 min 之前
            processPatternList = MyConstantMariaModelSRLPattern.BEFORE_15MIN_MARIA_MODEL_PROCESS_PATTERN_LIST;
            srlProcessPatternRegexMap = MyConstantMariaModelSRLPattern.MARIA_MODEL_PROCESS_PATTERN_REGEX_MAP;
        } else if ("maria".equals(modelType)) {//所有都是15 min 之后
            processPatternList = MyConstantMariaModelSRLPattern.AFTER_15MIN_MARIA_MODEL_PROCESS_PATTERN_LIST;
            srlProcessPatternRegexMap = MyConstantMariaModelSRLPattern.MARIA_MODEL_PROCESS_PATTERN_REGEX_MAP;
        } else if ("copes".equals(modelType) && endMinute <= 5) { //所有都是5 min 之前
            log.info("getSrlProcess ------ \"copes\".equals(modelType) && endMinute <= 5");
            processPatternList = MyConstantCopesModelSRLPattern.BEFORE_5MIN_COPES_MODEL_PROCESS_PATTERN_LIST;
            srlProcessPatternRegexMap = MyConstantCopesModelSRLPattern.COPES_MODEL_PROCESS_PATTERN_REGEX_MAP;
        } else if ("copes".equals(modelType)) {//所有都是5 min 之后
            log.info("getSrlProcess ------ after 5min");
            processPatternList = MyConstantCopesModelSRLPattern.AFTER_5MIN_COPES_MODEL_PROCESS_PATTERN_LIST;
            srlProcessPatternRegexMap = MyConstantCopesModelSRLPattern.COPES_MODEL_PROCESS_PATTERN_REGEX_MAP;
        }

        List<TraceData> needUpdateList = new ArrayList<>();
        List<String> srlProcessAppearList = findSrlProcess(allActionsStr, processPatternList, modelType, needUpdateList, srlProcessPatternRegexMap);

        log.info("srlProcessAppearList:" + srlProcessAppearList.toString());
        iTraceDataService.myUpdateBatch(needUpdateList);
        return srlProcessAppearList;
    }*/



    /**
     * @param userIdList studentId list to label
     * @param courseIdList the courseId list to label
     * @param modelType the selected model
     * @param adminId the id of the admin user that made the request for labeling
     * @param token the generate token as the redis key for updating the progression of labeling
     *
     *              This function labels the trace data of selected students in selected course using a specific model.
     *              The progression of the labeling will be updated in redis every few specified seconds.
     *              Front-end can check progression information using the token with "/label-model/check-progress" API.
     */
    @Async("asyncPoolTaskExecutor")
    public void labelStudents(List<Long> userIdList, List<String> courseIdList, String modelType, String adminId, String token) {
        Set<String> labelledSet = new HashSet<>();
        long startTime = System.currentTimeMillis();
        int numFinished = 0;
        iGlobalCache.hset(token, "is-finished", "false", MyConstant.REDIS_LINK_EXPIRE_SECONDS);
        iGlobalCache.hset(token, "num-finished", String.valueOf(numFinished), MyConstant.REDIS_LINK_EXPIRE_SECONDS);

        for (Long userId : userIdList) {
            for (String courseId : courseIdList) {
                labelledSet.addAll(this.labelAllProcessLabelPatterns(userId, courseId, modelType));
                numFinished += 1;
                if ((System.currentTimeMillis() - startTime) > MyConstant.UPDATE_CACHE_MILSEC){
                    iGlobalCache.hset(token, "num-finished", String.valueOf(numFinished));
                }
                //                labelSetList.add(iActionAndProcessService.labelAllProcessLabelPatterns(userId, courseId, modelType));
            }
        }
        String downloadLink = exportExcelFileStorageService.generateZipFile(userIdList, courseIdList, List.of(1), MyConstant.CUT_ROW, "Labeled_TraceData_");
        iGlobalCache.hset(token, "is-finished", "true", MyConstant.REDIS_LINK_EXPIRE_SECONDS);
        iGlobalCache.hset(token, "num-finished", String.valueOf(numFinished), MyConstant.REDIS_LINK_EXPIRE_SECONDS);
        iGlobalCache.hset(token, "download-link", downloadLink, MyConstant.REDIS_LINK_EXPIRE_SECONDS);
        // 将生成的文件名放进redis的缓存
        iGlobalCache.rSet(adminId + MyConstant.cachedLinkKeyListName, downloadLink, MyConstant.REDIS_LINK_EXPIRE_SECONDS);
        // 这个是用来让缓存超时的
        iGlobalCache.set(downloadLink, downloadLink, MyConstant.REDIS_LINK_EXPIRE_SECONDS);
    }


    @Async("asyncPoolTaskExecutor")
    public void labelAllProcessLabelPatternsAsync(Long userId, String courseId, String modelType) {
        log.info("Async into labelAllProcessLabelPatterns--------------userid:{}---courseid:{}--model type:{}", userId, courseId, modelType);

        labelAllProcessLabelPatterns(userId, courseId, modelType);
    }

    /**
     * Base method
     * @param userId
     * @param courseId
     * @param modelType
     * @param traceDataList
     * @return
     */
    public Set<String> labelAllProcessLabelPatterns(Long userId, String courseId, String modelType, List<TraceData> traceDataList) {
        long taskStartTime = getEssayTaskStartTime(userId, courseId);
        if (taskStartTime == -1) {
            log.info("no taskStartTime --- " + userId);
            return new HashSet<>();
        }

        List<String> processPatternBeforeSpecifiedMinList = new ArrayList<>();
        List<String> processPatternAfterSpecifiedMinList = new ArrayList<>();
        Map<String, String> srlProcessPatternRegexMap = new HashMap<>();

        Integer breakpointTime = 15;
        if ("maria".equals(modelType)) {
            breakpointTime = 15;
            processPatternBeforeSpecifiedMinList = MyConstantMariaModelSRLPattern.BEFORE_15MIN_MARIA_MODEL_PROCESS_PATTERN_LIST;
            processPatternAfterSpecifiedMinList = MyConstantMariaModelSRLPattern.AFTER_15MIN_MARIA_MODEL_PROCESS_PATTERN_LIST;
            srlProcessPatternRegexMap = MyConstantMariaModelSRLPattern.MARIA_MODEL_PROCESS_PATTERN_REGEX_MAP;

        } else if ("copes".equals(modelType)) {
            breakpointTime = 5;
            processPatternBeforeSpecifiedMinList = MyConstantCopesModelSRLPattern.BEFORE_5MIN_COPES_MODEL_PROCESS_PATTERN_LIST;
            processPatternAfterSpecifiedMinList = MyConstantCopesModelSRLPattern.AFTER_5MIN_COPES_MODEL_PROCESS_PATTERN_LIST;
            srlProcessPatternRegexMap = MyConstantCopesModelSRLPattern.COPES_MODEL_PROCESS_PATTERN_REGEX_MAP;
        }

        long timeSpecifiedMinutePoint = taskStartTime + breakpointTime * 60 * 1000;


        Map<Boolean, List<TraceData>> specifiedMinTimeGroupingMap = traceDataList.stream().collect(Collectors.groupingBy(x->Long.parseLong(x.getSaveTime()) <= timeSpecifiedMinutePoint));
        List<TraceData> beforeSpecifiedMinTraceDataList = specifiedMinTimeGroupingMap.get(true) == null ? new ArrayList<>() : specifiedMinTimeGroupingMap.get(true);
        List<TraceData> afterSpecifiedMinTraceDataList = specifiedMinTimeGroupingMap.get(false) == null ? new ArrayList<>() : specifiedMinTimeGroupingMap.get(false);

        List<TraceData> needUpdateList = new ArrayList<>();
        log.info("needUpdateList size1:" + needUpdateList.size());
        List<String> srlProcessAppearListBeforeSpecifiedMin = findSrlProcess(beforeSpecifiedMinTraceDataList, processPatternBeforeSpecifiedMinList, modelType, needUpdateList, srlProcessPatternRegexMap);
        log.info("needUpdateList size2:" + needUpdateList.size());
        List<String> srlProcessAppearListAfterSpecifiedMin = findSrlProcess(afterSpecifiedMinTraceDataList, processPatternAfterSpecifiedMinList, modelType, needUpdateList, srlProcessPatternRegexMap);
        log.info("needUpdateList size3:" + needUpdateList.size());


        iTraceDataService.myUpdateBatch(needUpdateList);



        Set<String> collect1 = new HashSet<>();
        collect1.addAll(srlProcessAppearListBeforeSpecifiedMin);
        collect1.addAll(srlProcessAppearListAfterSpecifiedMin);
        return collect1;
    }

    /**
     * No traceDataList provided
     * @param userId
     * @param courseId
     * @param modelType
     * @return
     */
    public Set<String> labelAllProcessLabelPatterns(Long userId, String courseId, String modelType) {
        log.info("into labelAllProcessLabelPatterns--------------userid:{}---courseid:{}--model type:{}", userId, courseId, modelType);

        List<TraceData> traceDataList = getTraceDataFromRedisOrDB(userId, courseId); // 获取所有trace data
        if (CollUtil.isEmpty(traceDataList)) {
            log.info("traceDataList empty --- ");
            return new HashSet<>();
        }
        return labelAllProcessLabelPatterns(userId, courseId, modelType, traceDataList);


        /*int minutePoint = 15;
        List<String> processPatternListBefore = null;
        List<String> processPatternListAfter = null;
        Map<String, String> srlProcessPatternRegexMap = new HashMap<>();
        if (Objects.equals("maria", modelType)) {
            minutePoint = 15;
            processPatternListBefore = MyConstantMariaModelSRLPattern.BEFORE_15MIN_MARIA_MODEL_PROCESS_PATTERN_LIST;
            processPatternListAfter = MyConstantMariaModelSRLPattern.AFTER_15MIN_MARIA_MODEL_PROCESS_PATTERN_LIST;
            srlProcessPatternRegexMap = MyConstantMariaModelSRLPattern.MARIA_MODEL_PROCESS_PATTERN_REGEX_MAP;
        } else if (Objects.equals("copes", modelType)) {
            minutePoint = 5;
            processPatternListBefore = MyConstantCopesModelSRLPattern.BEFORE_5MIN_COPES_MODEL_PROCESS_PATTERN_LIST;
            processPatternListAfter = MyConstantCopesModelSRLPattern.AFTER_5MIN_COPES_MODEL_PROCESS_PATTERN_LIST;
            srlProcessPatternRegexMap = MyConstantCopesModelSRLPattern.COPES_MODEL_PROCESS_PATTERN_REGEX_MAP;
        }

        long timeSpecifiedMinutePoint = taskStartTime + minutePoint * 60 * 1000;

        List<TraceData> traceDataList = getTraceDataFromRedisOrDB(userId, courseId, taskStartTime, -1, -1); // task start time 为0，表示需要在此方法内获取，beiginMinute 和endMinute 同时为-1表示需要获取所有


        if (CollUtil.isEmpty(traceDataList)) {
            log.info("traceDataList empty --- ");
            return new HashSet<>();
        }



        Map<Boolean, List<TraceData>> specifiedMinTimeGroupingMap = traceDataList.stream().collect(Collectors.groupingBy(x->Long.parseLong(x.getSaveTime()) <= timeSpecifiedMinutePoint));
        List<TraceData> beforeSpecifiedMinTraceDataList = specifiedMinTimeGroupingMap.get(true) == null ? new ArrayList<>() : specifiedMinTimeGroupingMap.get(true);
        List<TraceData> afterSpecifiedMinTraceDataList = specifiedMinTimeGroupingMap.get(false) == null ? new ArrayList<>() : specifiedMinTimeGroupingMap.get(false);

        List<String> fromRedisBeforeSpecifiedMinList = new ArrayList<>();
        List<String> fromRedisAfterSpecifiedMinList = new ArrayList<>();

        mergeSubActions(fromRedisBeforeSpecifiedMinList, beforeSpecifiedMinTraceDataList);
        mergeSubActions(fromRedisAfterSpecifiedMinList, afterSpecifiedMinTraceDataList);

        log.info("fromRedisBeforeSpecifiedMinList:" + fromRedisBeforeSpecifiedMinList);
        log.info("fromRedisAfterSpecifiedMinList:" + fromRedisAfterSpecifiedMinList);
        // 在此方法中获取所有action
        String beforeSpecifiedMinAllActionsStr = String.join("=====", fromRedisBeforeSpecifiedMinList) + "=====";
        String afterSpecifiedMinAllActionsStr = String.join("=====", fromRedisAfterSpecifiedMinList) + "=====";

        List<TraceData> needUpdateList1 = new ArrayList<>();
        List<TraceData> needUpdateList2 = new ArrayList<>();
        List<String> beforeSpecifiedMinSrlProcessAppearList = findSrlProcess(beforeSpecifiedMinAllActionsStr, processPatternListBefore, modelType, needUpdateList1, srlProcessPatternRegexMap);
        List<String> afterSpecifiedMinSrlProcessAppearList = findSrlProcess(afterSpecifiedMinAllActionsStr, processPatternListAfter, modelType, needUpdateList2, srlProcessPatternRegexMap);
//        log.info("beforeSpecifiedMinSrlProcessAppearList SRL process for user:{}-------- {}",userId, beforeSpecifiedMinSrlProcessAppearList);
//        log.info("afterSpecifiedMinSrlProcessAppearList SRL process for user:{}-------- {}",userId, afterSpecifiedMinSrlProcessAppearList);
        needUpdateList1.addAll(needUpdateList2);

        iTraceDataService.myUpdateBatch(needUpdateList1);

        Set<String> collect1 = new HashSet<>();
        collect1.addAll(beforeSpecifiedMinSrlProcessAppearList);
        collect1.addAll(afterSpecifiedMinSrlProcessAppearList);
*/

    }


    /*//TODO 待优化
    private List<String> findSrlProcess2(String allActionsStr, List<String> srlProcessPatternList, String modelType,
                                        List<TraceData> needUpdateList, Map<String, String> srlProcessPatternRegexMap) {
        log.info("allActionsStr--------" + allActionsStr);
        if (StrUtil.isEmpty(allActionsStr)) {
            log.info("allActionsStr is empty-------------------");
            return new ArrayList<>();
        }

        List<String> srlProcessAppearList = new ArrayList<>(); // 记录检测到的 SRL process

        // 预编译正则表达式模式
        Map<String, Pattern> patternMap = new HashMap<>();
        for (String srlProcess : srlProcessPatternList) {
            String patternStr = srlProcessPatternRegexMap.get(srlProcess);
            if (patternStr != null) {
                Pattern pattern = Pattern.compile(patternStr);
                patternMap.put(srlProcess, pattern);
            } else {
                log.error("pattern null ----- srlProcess:" + srlProcess);
            }
        }

        // 用于记录已匹配的位置
        BitSet matchedPositions = new BitSet(allActionsStr.length());

        // 遍历模式，对字符串进行匹配
        for (String srlProcess : srlProcessPatternList) {
            Pattern pattern = patternMap.get(srlProcess);
            if (pattern == null) {
                continue;
            }
            Matcher matcher = pattern.matcher(allActionsStr);

            while (matcher.find()) {
                int start = matcher.start();
                int end = matcher.end();

                // 检查匹配区域是否已经被匹配过
                if (matchedPositions.get(start, end).cardinality() == 0) {
                    // 记录匹配的位置
                    matchedPositions.set(start, end);

                    String matchedStr = matcher.group();
                    String[] strings = matchedStr.split("=====");
                    List<TraceData> matchTraceDataList = new ArrayList<>();
                    for (String temp : strings) {
                        if (StrUtil.isEmpty(temp)) {
                            continue;
                        }
                        TraceData traceData = new TraceData();
                        traceData.setId(Long.parseLong(temp.split("--")[0]));
                        traceData.setProcessLabel(srlProcess);
                        matchTraceDataList.add(traceData);
                    }

                    srlProcessAppearList.add(srlProcess);
                    needUpdateList.addAll(matchTraceDataList);
                }
            }
        }

        // 处理未匹配的部分
        int currentIndex = 0;
        while (currentIndex < allActionsStr.length()) {
            int start = matchedPositions.nextClearBit(currentIndex);
            if (start >= allActionsStr.length()) {
                break;
            }
            int end = matchedPositions.nextSetBit(start);
            if (end == -1) {
                end = allActionsStr.length();
            }

            // 未匹配的片段
            String unmatchedStr = allActionsStr.substring(start, end);
            String[] strings = unmatchedStr.split("=====");
            for (String temp : strings) {
                if (StrUtil.isEmpty(temp)) {
                    continue;
                }
                TraceData traceData = new TraceData();
                traceData.setId(Long.parseLong(temp.split("--")[0]));
                traceData.setProcessLabel("NOT_RECOGNIZED");
                needUpdateList.add(traceData);
            }

            currentIndex = end;
        }

        log.info("-----srlProcessAppearList:" + srlProcessAppearList);
        return srlProcessAppearList;
    }

    // TODO 待优化
    private List<String> findSrlProcessMultiThreads(String allActionsStr, List<String> srlProcessPatternList, String modelType, List<TraceData> needUpdateList, Map<String, String> srlProcessPatternRegexMap) {
        log.info("allActionsStr--------" + allActionsStr);
        if (StrUtil.isEmpty(allActionsStr)) {
            log.info("allActionsStr is empty-------------------");
            return new ArrayList<>();
        }

        if (StrUtil.isEmpty(allActionsStr)) {
            return new ArrayList<>();
        }
        List<String> srlProcessAppearList = new CopyOnWriteArrayList<>(); //记录detect到的 SRL process

        String finalAllActionsStr = allActionsStr;
        srlProcessPatternList.parallelStream().forEach(srlProcess -> {
            String pattern = srlProcessPatternRegexMap.get(srlProcess);
            if (pattern == null) {
                log.error("pattern null ----- srlProcess:" + srlProcess);
                return;
            }
            List<TraceData> matchTraceDataList = new ArrayList<>();
            Pattern regex = Pattern.compile(pattern);
            Matcher matcher = regex.matcher(finalAllActionsStr);

            while (matcher.find()) {
                String[] strings = matcher.group().split("=====");
                for(String temp : strings) {
                    TraceData traceData = new TraceData();
                    traceData.setId(Long.parseLong(temp.split("--")[0]));
                    traceData.setProcessLabel(srlProcess);
                    matchTraceDataList.add(traceData);
                }
            }
            if (!matchTraceDataList.isEmpty()) {
                srlProcessAppearList.add(srlProcess);
                allActionsStr = allActionsStr.replaceAll(pattern, "*");  //每次检测到，都替换为*
                needUpdateList.addAll(matchTraceDataList);
            }
        });

        allActionsStr = allActionsStr.replace("*", "");

        if (StrUtil.isEmpty(allActionsStr)) {
            log.info("allActionsStr length become to 0.....");
            return new ArrayList<>();
        }
        //标注 NOT_RECOGNIZED 的 process
        String[] strings = allActionsStr.split("=====");

        for(String temp : strings) {
            if (StrUtil.isEmpty(temp)) {
                continue;
            }
            TraceData tempTraceData = new TraceData();
            tempTraceData.setId(Long.parseLong(temp.split("--")[0]));
            tempTraceData.setProcessLabel("NOT_RECOGNIZED");
            needUpdateList.add(tempTraceData);
//            log.info("tempTraceData id:" + tempTraceData.getId());
        }

        log.info("-----srlProcessAppearList:" + srlProcessAppearList);
        return srlProcessAppearList;
    }
*/
    /**
     * 从给定的 allActionsStr 中找到match 的 srl process
     * @param allActionsStr
     * @param srlProcessPatternList
     * @param modelType
     * @param needUpdateList
     * @param srlProcessPatternRegexMap
     * @return
     */
    public List<String> findSrlProcess(String allActionsStr, List<String> srlProcessPatternList, String modelType, List<TraceData> needUpdateList, Map<String, String> srlProcessPatternRegexMap) {
        log.info("allActionsStr--------" + allActionsStr);
        if (StrUtil.isEmpty(allActionsStr)) {
            log.info("allActionsStr is empty-------------------");
            return new ArrayList<>();
        }

        if (StrUtil.isEmpty(allActionsStr)) {
            return new ArrayList<>();
        }
        List<String> srlProcessAppearList = new ArrayList<>(); //记录detect到的 SRL process
        // update process label to database
        for (String srlProcess : srlProcessPatternList) {

            String pattern = srlProcessPatternRegexMap.get(srlProcess);
            if (pattern == null) {
                log.error("pattern null ----- srlProcess:" + srlProcess);
                continue;
            }
            //判断是否有匹配到的process
//            List<TraceData> tempList = match(pattern, allActionsStr, srlProcess);

            List<TraceData> matchTraceDataList = new ArrayList<>();
            Pattern regex = Pattern.compile(pattern);
            Matcher matcher = regex.matcher(allActionsStr);

            while (matcher.find()) {
//                if (srlProcess.equals("CSTR2")) {
//                    System.out.println("srlProcess:" + srlProcess);
//                }
                String[] strings = matcher.group().split("=====");
                for(String temp : strings) {
                    TraceData traceData = new TraceData();
                    traceData.setId(Long.parseLong(temp.split("--")[0]));
                    traceData.setProcessLabel(srlProcess);
                    matchTraceDataList.add(traceData);
                }
                //找到一次 就添加一次
                srlProcessAppearList.add(srlProcess);
            }
            if (!matchTraceDataList.isEmpty()) {

                allActionsStr = allActionsStr.replaceAll(pattern, "*");  //每次检测到，都替换为*
                needUpdateList.addAll(matchTraceDataList);
            }
        }

        allActionsStr = allActionsStr.replace("*", "");

//        if (StrUtil.isEmpty(allActionsStr)) {
//            log.info("allActionsStr length become to 0.....");
//            return new ArrayList<>();
//        }
        //标注 NOT_RECOGNIZED 的 process
        String[] strings = allActionsStr.split("=====");

        for(String temp : strings) {
            if (StrUtil.isEmpty(temp)) {
                continue;
            }
            TraceData tempTraceData = new TraceData();
            tempTraceData.setId(Long.parseLong(temp.split("--")[0]));
            tempTraceData.setProcessLabel("NOT_RECOGNIZED");
            needUpdateList.add(tempTraceData);
//            log.info("tempTraceData id:" + tempTraceData.getId());
        }

        log.info("-----srlProcessAppearList:" + srlProcessAppearList);
        return srlProcessAppearList;
    }

    private List<String> findRealTimeSrlProcess(String allActionsStr, List<String> srlProcessPatternList, String modelType, List<TraceDataRealTimeProcess> needUpdateList, Map<String, String> srlProcessPatternRegexMap) {
        log.info("allActionsStr--------" + allActionsStr);
        if (StrUtil.isEmpty(allActionsStr)) {
            log.info("allActionsStr is empty-------------------");
            return new ArrayList<>();
        }

        if (StrUtil.isEmpty(allActionsStr)) {
            return new ArrayList<>();
        }
        List<String> srlProcessAppearList = new ArrayList<>(); //记录detect到的 SRL process
        // update process label to database
        for (String srlProcess : srlProcessPatternList) {

            String pattern = srlProcessPatternRegexMap.get(srlProcess);
            if (pattern == null) {
                log.error("pattern null ----- srlProcess:" + srlProcess);
                continue;
            }

            List<TraceDataRealTimeProcess> matchTraceDataList = new ArrayList<>();
            Pattern regex = Pattern.compile(pattern);
            Matcher matcher = regex.matcher(allActionsStr);

            while (matcher.find()) {
                String[] strings = matcher.group().split("=====");
                for(String temp : strings) {
                    TraceDataRealTimeProcess traceData = new TraceDataRealTimeProcess();
                    traceData.setId(Long.parseLong(temp.split("--")[0]));
                    traceData.setProcessLabel(srlProcess);
                    matchTraceDataList.add(traceData);
                }
            }
            if (!matchTraceDataList.isEmpty()) {
                srlProcessAppearList.add(srlProcess);
                allActionsStr = allActionsStr.replaceAll(pattern, "*");  //每次检测到，都替换为*
                needUpdateList.addAll(matchTraceDataList);
            }
        }

        allActionsStr = allActionsStr.replace("*", "");

//        if (StrUtil.isEmpty(allActionsStr)) {
//            log.info("allActionsStr length become to 0.....");
//            return new ArrayList<>();
//        }
        if (!StrUtil.isEmpty(allActionsStr)) {
            //标注 NOT_RECOGNIZED 的 process
            String[] strings = allActionsStr.split("=====");

            for (String temp : strings) {
                if (StrUtil.isEmpty(temp)) {
                    continue;
                }
                TraceDataRealTimeProcess tempTraceData = new TraceDataRealTimeProcess();
                tempTraceData.setId(Long.parseLong(temp.split("--")[0]));
                tempTraceData.setProcessLabel("NOT_RECOGNIZED");
                needUpdateList.add(tempTraceData);
//            log.info("tempTraceData id:" + tempTraceData.getId());
            }
        }

        log.info("-----srlProcessAppearList:" + srlProcessAppearList);
        return srlProcessAppearList;
    }

    private List<String> findRealTimeSrlProcess(List<TraceDataRealTimeProcess> traceDataList, List<String> srlProcessPatternList, String modelType, List<TraceDataRealTimeProcess> needUpdateList, Map<String, String> srlProcessPatternRegexMap) {
        if (traceDataList.isEmpty()) {
            return new ArrayList<>();
        }

        List<String> subActionList = new ArrayList<>();
        mergeSubActionsForRealTimeProcess(subActionList, traceDataList);
        String allActionsStr = String.join("=====", subActionList) + "=====";

        return findRealTimeSrlProcess(allActionsStr, srlProcessPatternList, modelType, needUpdateList, srlProcessPatternRegexMap);
    }
    /**
     * 从给定的 traceDataList 中找到match 的 srl process
     * @param traceDataList
     * @param srlProcessPatternList
     * @param modelType
     * @param needUpdateList
     * @param srlProcessPatternRegexMap
     * @return
     */
    public List<String> findSrlProcess(List<TraceData> traceDataList, List<String> srlProcessPatternList, String modelType, List<TraceData> needUpdateList, Map<String, String> srlProcessPatternRegexMap) {

        List<String> subActionList = new ArrayList<>();
        mergeSubActions(subActionList, traceDataList);
        String allActionsStr = String.join("=====", subActionList) + "=====";

        return findSrlProcess(allActionsStr, srlProcessPatternList, modelType, needUpdateList, srlProcessPatternRegexMap);
    }

/*    public List<TraceData> match(String pattern, String text, String processLabel) {
        List<TraceData> traceDataList = new ArrayList<>();
        Pattern regex = Pattern.compile(pattern);
        Matcher matcher = regex.matcher(text);

        while (matcher.find()) {
//            log.info("SRL process found for " + processLabel + "========" + matcher.group());
            String[] strings = matcher.group().split("=====");
            for(String temp : strings) {
                TraceData traceData = new TraceData();
                traceData.setId(Long.parseLong(temp.split("--")[0]));
                traceData.setProcessLabel(processLabel);
                traceDataList.add(traceData);
//                log.info("traceData id:" + traceData.getId());
            }
        }
        return traceDataList;
    }*/


    /**
     * 直接label 所有
     * 此处是精简过的log
     * @param userId
     * @param courseId
     * @param modelType
     * @param traceDataRealTimeProcessList
     * @return
     */
    public Set<String> labelAllRealTimeProcessLabelPatterns(Long userId, String courseId, String modelType, List<TraceDataRealTimeProcess> traceDataRealTimeProcessList, List<TraceDataRealTimeProcess> newSimplifiedTraceDataRealProcessList, boolean fromDB) {
        long taskStartTime = getEssayTaskStartTime(userId, courseId);
        if (taskStartTime == -1) {
            log.info("no taskStartTime --- " + userId);
            return new HashSet<>();
        }

        List<String> processPatternBeforeSpecifiedMinList = new ArrayList<>();
        List<String> processPatternAfterSpecifiedMinList = new ArrayList<>();
        Map<String, String> srlProcessPatternRegexMap = new HashMap<>();

        Integer breakpointTime = 15;
        if ("maria".equals(modelType)) {
            breakpointTime = 15;
            processPatternBeforeSpecifiedMinList = MyConstantMariaModelSRLPattern.BEFORE_15MIN_MARIA_MODEL_PROCESS_PATTERN_LIST;
            processPatternAfterSpecifiedMinList = MyConstantMariaModelSRLPattern.AFTER_15MIN_MARIA_MODEL_PROCESS_PATTERN_LIST;
            srlProcessPatternRegexMap = MyConstantMariaModelSRLPattern.MARIA_MODEL_PROCESS_PATTERN_REGEX_MAP;

        } else if ("copes".equals(modelType)) {
            breakpointTime = 5;
            processPatternBeforeSpecifiedMinList = MyConstantCopesModelSRLPattern.BEFORE_5MIN_COPES_MODEL_PROCESS_PATTERN_LIST;
            processPatternAfterSpecifiedMinList = MyConstantCopesModelSRLPattern.AFTER_5MIN_COPES_MODEL_PROCESS_PATTERN_LIST;
            srlProcessPatternRegexMap = MyConstantCopesModelSRLPattern.COPES_MODEL_PROCESS_PATTERN_REGEX_MAP;
        }

        long timeSpecifiedMinutePoint = taskStartTime + breakpointTime * 60 * 1000;


        Map<Boolean, List<TraceDataRealTimeProcess>> specifiedMinTimeGroupingMap = traceDataRealTimeProcessList.stream().collect(Collectors.groupingBy(x->Long.parseLong(x.getSaveTime()) <= timeSpecifiedMinutePoint));
        List<TraceDataRealTimeProcess> beforeSpecifiedMinTraceDataList = specifiedMinTimeGroupingMap.get(true) == null ? new ArrayList<>() : specifiedMinTimeGroupingMap.get(true);
        List<TraceDataRealTimeProcess> afterSpecifiedMinTraceDataList = specifiedMinTimeGroupingMap.get(false) == null ? new ArrayList<>() : specifiedMinTimeGroupingMap.get(false);

        List<TraceDataRealTimeProcess> needUpdateList = new ArrayList<>();
        log.info("needUpdateList size1:" + needUpdateList.size());
        List<String> srlProcessAppearListBeforeSpecifiedMin = findRealTimeSrlProcess(beforeSpecifiedMinTraceDataList, processPatternBeforeSpecifiedMinList, modelType, needUpdateList, srlProcessPatternRegexMap);
        log.info("needUpdateList size2:" + needUpdateList.size());
        List<String> srlProcessAppearListAfterSpecifiedMin = findRealTimeSrlProcess(afterSpecifiedMinTraceDataList, processPatternAfterSpecifiedMinList, modelType, needUpdateList, srlProcessPatternRegexMap);
        log.info("needUpdateList size3:" + needUpdateList.size());


        // 此方法可以异步执行
        //先执行插入操作，将新的数据插入数据库, 保证数据库里面有所有simplified数据
        // 再将needUpdateList 全部更新到数据库
        iTraceDataRealTimeProcessService.mySaveAndUpdateBatch(newSimplifiedTraceDataRealProcessList, needUpdateList);

        Map<Long, TraceDataRealTimeProcess> needUpdateIdMap = needUpdateList.stream().collect(Collectors.toMap(TraceDataRealTimeProcess::getId, process -> process));
        for (TraceDataRealTimeProcess traceDataRealTimeProcess: traceDataRealTimeProcessList) {
            TraceDataRealTimeProcess matchingProcess = needUpdateIdMap.get(traceDataRealTimeProcess.getId());
            if (matchingProcess != null) {
                traceDataRealTimeProcess.setProcessLabel(matchingProcess.getProcessLabel());
            }
        }


        Set<String> collect1 = new HashSet<>();
        collect1.addAll(srlProcessAppearListBeforeSpecifiedMin);
        collect1.addAll(srlProcessAppearListAfterSpecifiedMin);
        return collect1;
    }

    /**
     * 获取 所有 未label 过的 realTime Process Trace Data
     * @param userId
     * @param courseId
     * @return
     */
    public List<TraceDataRealTimeProcess> getRealTimeSimplifiedTraceDataUnLabelled(Long userId, String courseId) {
        QueryWrapper<TraceDataRealTimeProcess> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("user_id", userId).eq("course_id", courseId).orderByAsc("save_time");
        return iTraceDataRealTimeProcessService.list(queryWrapper);
    }

    /**
     * 获取所有 label 过的 trace
     * @param userId
     * @param courseId
     * @return
     */
    public List<TraceDataRealTimeProcessVO> getRealTimeSimplifiedTraceDataLabelled(Long userId, String courseId) {
        QueryWrapper<TraceDataRealTimeProcess> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("user_id", userId).eq("course_id", courseId).orderByAsc("save_time");
        return MyBeanCopyUtils.copyBeanList(iTraceDataRealTimeProcessService.list(queryWrapper), TraceDataRealTimeProcessVO.class);
    }



    public void processTimeEventForStartAndEnd(TraceDataVO traceDataVO) {
        //一旦用户 完成task， 发送消息过来，并且删除 该用户在map 中的数据，并存入数据库
        if ("ESSAY_TASK_END".equals(traceDataVO.getInstantEvent())) {
            log.info("ESSAY_TASK_END-------------user:{}, course:{}", traceDataVO.getUserId(), traceDataVO.getCourseId());
            if (Objects.equals(traceDataVO.getModelType(), MyConstant.SRL_MODEL)) {
                this.labelAllProcessLabelPatternsAsync(traceDataVO.getUserId(), traceDataVO.getCourseId(), MyConstant.SRL_MODEL);
//                this.getRealTimeSimplifiedTraceDataLabelledAsync(traceDataVO.getUserId(), traceDataVO.getCourseId(), MyConstant.SRL_MODEL);
            }

//            else if (Objects.equals(traceDataVO.getModelType(), "copes")) {
//                this.labelTimeRangeProcessLabelPatternsAsync(traceDataVO.getUserId(), traceDataVO.getCourseId(), MyConstant.SRL_MODEL, 28, 46);   //TODO 目前只适用于 使用copes模型加 GPT scaffold，否则应当是全部label
//            }
        }
        // 因为timer 事件不是异步处理的，所以要在此处处理而不是在saveTraceDataFromRedisToDb() 中处理
//        kafkaTemplate.send(MyConstant.KAFKA_TOPIC_TRACE_DATA, JSONUtil.toJsonStr(traceDataVO));

        if ("ESSAY_TASK_START".equals(traceDataVO.getInstantEvent())) {
            String courseId = traceDataVO.getCourseId(); //Optional.ofNullable(MyConstant.URL_COURSE_ID_MAP.get(traceDataVO.getUrl())).orElse("UNKNOW_COURSE");

            UserStartTime userStartTime = new UserStartTime();
            userStartTime.setUserStartTime(traceDataVO.getSaveTime());
            userStartTime.setUserId(traceDataVO.getUserId());
            userStartTime.setCourseId(courseId);
            iUserStartTimeService.save(userStartTime);
            iUserStartTimeService.saveStartTimeToRedis(MyConstant.REDIS_TASK_START_TIME + traceDataVO.getUserId() + "-" + courseId, traceDataVO.getSaveTime());
        }
    }


    /**
     * 此方法只在修复数据时候使用
     * @param userId
     * @param courseId
     */
    @Async("asyncPoolTaskExecutor")
//    @Transactional
    public void fixHasCloseButNoOpenLogIssue(int userId, int courseId) {
        System.out.println("processing " + userId + "-----courseid:" + courseId);
        List<TraceData> traceDataList = null;
        Instant start = Instant.now();
        try {
            traceDataList = iTraceDataService.findAllByUserIdAndCourseIdOrderByTimeAsc((long) userId, String.valueOf(courseId));
        } catch (Exception e) {
            System.out.println("exception findAllByUserIdAndCourseIdOrderByTimeAsc ---------------------- processing " + userId + "-----courseid:" + courseId);
            traceDataList = new ArrayList<>();
        }

        // 结束时间
        Instant mid = Instant.now();

        List<TraceData> manuallyCreatedTraceDataList = new ArrayList<>();

        Map<String, List<TraceData>> specifiedMinTimeGroupingMap = traceDataList.stream().collect(Collectors.groupingBy(TraceData::getSource));
        List<TraceData> essayTraceDataList = specifiedMinTimeGroupingMap.get("ESSAY") == null ? new ArrayList<>() : specifiedMinTimeGroupingMap.get("ESSAY");
        List<TraceData> plannerTraceDataList = specifiedMinTimeGroupingMap.get("PLANNER") == null ? new ArrayList<>() : specifiedMinTimeGroupingMap.get("PLANNER");
        List<TraceData> annotationTraceDataList = specifiedMinTimeGroupingMap.get("ANNOTATION") == null ? new ArrayList<>() : specifiedMinTimeGroupingMap.get("ANNOTATION");
        List<TraceData> searchAnnotationTraceDataList = specifiedMinTimeGroupingMap.get("SEARCH_ANNOTATION") == null ? new ArrayList<>() : specifiedMinTimeGroupingMap.get("SEARCH_ANNOTATION");

        createTraceData(essayTraceDataList, manuallyCreatedTraceDataList);
        createTraceData(plannerTraceDataList, manuallyCreatedTraceDataList);
        createTraceData(annotationTraceDataList, manuallyCreatedTraceDataList);
        createTraceData(searchAnnotationTraceDataList, manuallyCreatedTraceDataList);

        try {
            System.out.println("manuallyCreatedTraceDataList size:" + manuallyCreatedTraceDataList.size());
            iTraceDataService.saveBatch(manuallyCreatedTraceDataList);
        } catch (Exception e) {
            System.out.println("exception savebatch ---------------------- processing " + userId + "-----courseid:" + courseId);
        }
        System.out.println("finish ---------------------- processing " + userId + "-----courseid:" + courseId);

        Duration durationEnd = Duration.between(mid, Instant.now());
        // 计算运行时间
        Duration durationMid = Duration.between(start, mid);

        System.out.println("durationMid 运行时间（秒）: " + durationMid.toSeconds());
        System.out.println("durationEnd 运行时间（秒）: " + durationEnd.toSeconds());
    }

    /**
     * 此方法只在修复数据时候使用
     * @param checkTraceDataList
     * @param manuallyCreatedTraceDataList
     */
    private void createTraceData(List<TraceData> checkTraceDataList, List<TraceData> manuallyCreatedTraceDataList) {

        TraceData tempOpen = null;
        TraceData tempClose = null;
        for (TraceData traceData : checkTraceDataList) {
            if (traceData.getInstantEvent().equals("OPEN")) {
                tempOpen = traceData;
            } else if (traceData.getInstantEvent().equals("CLOSE")) {
                if (tempOpen == null) {
                    long toolCloseTime = Long.parseLong(traceData.getSaveTime());
                    long toolUseTime = Long.parseLong(traceData.getEventValue().split(":::")[1]);

                    long toolOpenTime = toolCloseTime - toolUseTime + 2;
                    TraceData manuallyCreatedTraceData = new TraceData();

                    String subActionLabel = "";
                    if (traceData.getSource().equals("SEARCH_ANNOTATION")) {
                        subActionLabel = "SEARCH_ANNOTATION";
                    } else if (traceData.getSource().equals("ANNOTATION")) {
                        subActionLabel = "READ_ANNOTATION";
                    } else {
                        subActionLabel = "OPEN_" + traceData.getSource();
                    }

                    manuallyCreatedTraceData.setDetailedActionLabel(null);
                    manuallyCreatedTraceData.setActionLabel(traceData.getActionLabel());
                    manuallyCreatedTraceData.setModelType(null);
                    manuallyCreatedTraceData.setCourseId(traceData.getCourseId());
                    manuallyCreatedTraceData.setProcessLabel(null);

                    manuallyCreatedTraceData.setUserId(traceData.getUserId());
                    manuallyCreatedTraceData.setSaveTime(String.valueOf(toolOpenTime));
                    manuallyCreatedTraceData.setUsername(traceData.getUsername());
                    manuallyCreatedTraceData.setUrl(traceData.getUrl());
                    manuallyCreatedTraceData.setFirstname(traceData.getFirstname());
                    manuallyCreatedTraceData.setLastname(traceData.getLastname());
                    manuallyCreatedTraceData.setSource(traceData.getSource());
                    manuallyCreatedTraceData.setPageEvent("MANUALLY_ADDED_DATA");
                    manuallyCreatedTraceData.setTargetObject("NO_TARGET_OBJECT");
                    manuallyCreatedTraceData.setInstantEvent("OPEN");
                    manuallyCreatedTraceData.setSubActionLabel(subActionLabel);
                    manuallyCreatedTraceData.setScreenX("0");
                    manuallyCreatedTraceData.setScreenY("0");
                    manuallyCreatedTraceData.setClientX("0");
                    manuallyCreatedTraceData.setClientY("0");
                    manuallyCreatedTraceData.setWindowInnerWidth(traceData.getWindowInnerWidth());
                    manuallyCreatedTraceData.setWindowInnerHeight(traceData.getWindowInnerHeight());
                    manuallyCreatedTraceData.setScreenWidth(traceData.getScreenWidth());
                    manuallyCreatedTraceData.setScreenHeight(traceData.getScreenHeight());
                    manuallyCreatedTraceData.setEventValue("START_USE_TOOL:::" + toolOpenTime);

                    manuallyCreatedTraceDataList.add(manuallyCreatedTraceData);
                    tempOpen = null; // 创建完之后重新置空
                }
            }

        }



    }


    @Async("asyncPoolTaskExecutor")
    public void getRealTimeSimplifiedTraceDataLabelledAsync(Long userId, String courseId, String modelType) {
        log.info("Async into getRealTimeSimplifiedTraceDataLabelled--------------userid:{}---courseid:{}--model type:{}", userId, courseId, modelType);
        try {
            getRealTimeSimplifiedTraceDataLabelled(userId, courseId, modelType);
        } catch (Exception e) {
            log.error(e.getMessage());
        } finally {
            String labelCurrentRealTimeProcessKey = "LABEL_CURRENT_REAL_TIME_PROCESS_" + userId + "-" + courseId;
            iGlobalCache.del(labelCurrentRealTimeProcessKey);
            System.out.println("Async task is done, lock was removed.");
        }
    }

    public List<TraceDataRealTimeProcess> getAllRealTimeSimplifiedTraceData(Long userId, String courseId) {
        String redisSimplifiedTraceKey = MyConstant.REDIS_SIMPLIFIED_TEMP_TRACE_DATA_LIST + userId + "-" + courseId;
        List<TraceDataRealTimeProcess> currentTraceDataRealTimeProcessList;

        if (iGlobalCache.hasKey(redisSimplifiedTraceKey)) {// 从TraceDataRealTimeProcess Redis  中获取该用户的所有数据
            Set<String> simplifiedOrderedEvent = iGlobalCache.getOrderedEvent(redisSimplifiedTraceKey, 0, -1);
            currentTraceDataRealTimeProcessList = new ArrayList<>();
            for (String temp: simplifiedOrderedEvent) {
                currentTraceDataRealTimeProcessList.add(JSONUtil.toBean(temp, TraceDataRealTimeProcess.class));
            }
        } else { // 从TraceDataRealTimeProcess 数据库 表中获取该用户的所有数据
            currentTraceDataRealTimeProcessList = iTraceDataRealTimeProcessService.getAll(userId, courseId); // 查询不到 返回 空的list
        }

        return currentTraceDataRealTimeProcessList;
    }

    /**
     * 所有 process label 都没label 过的情况,进行label 并返回
     * @param userId
     * @param courseId
     * @param modelType
     * @return
     */
    public List<TraceDataRealTimeProcess> getRealTimeSimplifiedTraceDataLabelled(Long userId, String courseId, String modelType) {
        // redisSimplifiedTraceKey 中并未存储所有 simplified log, 只存储了最新的 log
        String redisSimplifiedTraceKey = MyConstant.REDIS_SIMPLIFIED_TEMP_TRACE_DATA_LIST + userId + "-" + courseId;
//        Set<String> orderedEvent = iGlobalCache.getOrderedEvent(redisSimplifiedTraceKey, 0, -1);// 从redis 获取所有 simplified trace data， 此处是有序Set，通常由LinkedHashSet 实现


//        TraceDataRealTimeProcess lastItemByUserIdCourseId = iTraceDataRealTimeProcessService.getLastItemByUserIdCourseId(userId, courseId); // 查询不到 返回 null

        // 1. 先尝试从 TraceDataRealTimeProcess Redis 中获取
        List<TraceDataRealTimeProcess> currentTraceDataRealTimeProcessList;

        if (iGlobalCache.hasKey(redisSimplifiedTraceKey)) {// 从TraceDataRealTimeProcess Redis  中获取该用户的所有数据
            Set<String> simplifiedOrderedEvent = iGlobalCache.getOrderedEvent(redisSimplifiedTraceKey, 0, -1);
            currentTraceDataRealTimeProcessList = new ArrayList<>();
            for (String temp: simplifiedOrderedEvent) {
                currentTraceDataRealTimeProcessList.add(JSONUtil.toBean(temp, TraceDataRealTimeProcess.class));
            }
        } else { // 从TraceDataRealTimeProcess 数据库 表中获取该用户的所有数据
            currentTraceDataRealTimeProcessList = iTraceDataRealTimeProcessService.getAll(userId, courseId); // 查询不到 返回 空的list
        }

        // 2. 如果获取不到，则从 Redis Raw traceData 中获取所有
        Set<String> orderedEvent;
        // 可以获取到按时序排列的原始数据
        String redisTraceKey = MyConstant.REDIS_TEMP_TRACE_DATA_LIST + userId + "-" + courseId;

        if (currentTraceDataRealTimeProcessList.isEmpty()) {
            // 如果 TraceDataRealTimeProcess 表中没有数据，则从 Redis Raw trace 中获取所有
            orderedEvent = iGlobalCache.getOrderedEvent(redisTraceKey, 0, -1);
        } else {//为了更新 新增加的数据
            // TraceDataRealTimeProcess 表中有数据，则根据timestamp 即 分数 获取 Redis Raw trace 中 新增 的 所有 TraceData
            orderedEvent = iGlobalCache.getElementsGreaterThanScore(redisTraceKey, Double.parseDouble(currentTraceDataRealTimeProcessList.get(currentTraceDataRealTimeProcessList.size() - 1).getSaveTime()) + 1);
        }

        // 新增Trace 超过50条 才进行 重新label, 此处的Trace 包含 鼠标移动
        if (orderedEvent.size() > 50) {
            List<TraceDataRealTimeProcess> rawTraceData = new ArrayList<>();
            List<TraceDataRealTimeProcess> newSimplifiedTraceDataList = new ArrayList<>();
            for (String temp: orderedEvent) {
                rawTraceData.add(JSONUtil.toBean(temp, TraceDataRealTimeProcess.class));
            }

            // 获取到精简后的 Trace 数据
            for (int i = 0; i < rawTraceData.size(); i++) {

                TraceDataRealTimeProcess current = rawTraceData.get(i);
                TraceDataRealTimeProcess previous;
                if (i == 0) {
                    if (currentTraceDataRealTimeProcessList.isEmpty()) {
                        previous = null;
                    } else {
                        previous = currentTraceDataRealTimeProcessList.get(currentTraceDataRealTimeProcessList.size() - 1);
                    }
                } else {
                    previous = rawTraceData.get(i - 1);
                }
                TraceDataRealTimeProcess next;
                if (i == rawTraceData.size() - 1) {
                    next = null;
                } else {
                    next = rawTraceData.get(i + 1);
                }

                boolean checkResult = checkAddSimplifiedTrace(current, previous, next);
                if (checkResult) { // 执行过滤
                    newSimplifiedTraceDataList.add(rawTraceData.get(i));
                    currentTraceDataRealTimeProcessList.add(rawTraceData.get(i));
                }
            }

            // newSimplifiedTraceDataList 存储新增的数据，需要添加到数据库， currentTraceDataRealTimeProcessList 存储所有simplified 数据，用来做labelling
            labelAllRealTimeProcessLabelPatterns(userId, courseId, modelType, currentTraceDataRealTimeProcessList, newSimplifiedTraceDataList, false);

            // 存入 Redis
            log.info("-------------------");
            //更新redis 某个key 所有元素最快的方法是先删掉，再重新添加一次
            iGlobalCache.del(redisSimplifiedTraceKey);
            currentTraceDataRealTimeProcessList.forEach(temp -> iGlobalCache.addOrderedEvent(redisSimplifiedTraceKey, JSONUtil.toJsonStr(temp), Double.parseDouble(temp.getSaveTime()), MyConstant.REDIS_EXPIRE_SECONDS));
            log.info("-------------------");
        }
        return currentTraceDataRealTimeProcessList;
    }

    /**
     * ProcessDurationVO(category=NOT_RECOGNIZED, value=0.0033833333333333332, id=NOT_RECOGNIZED_1)
     * ProcessDurationVO(category=MCO, value=0.015516666666666666, id=MCO2_1)
     * ProcessDurationVO(category=HCEO, value=0.05898333333333333, id=HCEO2_1)
     * ProcessDurationVO(category=MCE, value=0.4897166666666667, id=MCE2_1)
     * ProcessDurationVO(category=MCO, value=0.016383333333333333, id=MCO2_2)
     * ProcessDurationVO(category=NOT_RECOGNIZED, value=0.011866666666666666, id=NOT_RECOGNIZED_2)
     * @param traceDataRealTimeProcessList
     * @return
     */
    public List<ProcessDurationVO> calculateRealTimeProcessDurations(List<TraceDataRealTimeProcess> traceDataRealTimeProcessList, boolean getMainCategory, Map<String, Double> labelDurationMap) {
        List<ProcessDurationVO> durationVOList = new ArrayList<>();
        Map<String, Integer> labelCountMap = new HashMap<>();

        for (int i = 0; i < traceDataRealTimeProcessList.size(); i++) {
            TraceDataRealTimeProcess current = traceDataRealTimeProcessList.get(i);
            if (current.getProcessLabel() != null) {
                String currentMainProcess = getMainCategory ? current.getProcessLabel().replaceAll("\\d+$", "") : current.getProcessLabel(); // remove the digits at the end of the string
                for (int j = i + 1; j < traceDataRealTimeProcessList.size(); j++) {
                    TraceDataRealTimeProcess next = traceDataRealTimeProcessList.get(j);
                    if (next.getProcessLabel() != null) {
                        String nextMainProcess = getMainCategory ? next.getProcessLabel().replaceAll("\\d+$", "") : next.getProcessLabel(); // remove the digits at the end of the string
                        if (!StrUtil.equals(currentMainProcess, nextMainProcess)) {
                            ProcessDurationVO processDurationVO = getProcessDurationVO(labelCountMap, currentMainProcess, current, next, labelDurationMap);
                            durationVOList.add(processDurationVO);
                            i = j - 1;
                            break;
                        }
                    } else if (j == traceDataRealTimeProcessList.size() - 1) { // 到达最后一个元素且 process label 仍然是null
                        ProcessDurationVO processDurationVO = getProcessDurationVO(labelCountMap, currentMainProcess, current, next, labelDurationMap);
                        durationVOList.add(processDurationVO);
                        i = j - 1;
                        break;
                    }
                }
            }
        }
        return durationVOList;
    }

    private ProcessDurationVO getProcessDurationVO(Map<String, Integer> labelCountMap, String currentMainProcess, TraceDataRealTimeProcess current, TraceDataRealTimeProcess next, Map<String, Double> labelDurationMap) {
        long duration = Long.parseLong(next.getSaveTime()) - Long.parseLong(current.getSaveTime());
        String category = currentMainProcess;
        int count = labelCountMap.getOrDefault(category, 0) + 1;
        labelCountMap.put(category, count);

        String id = category + "_" + count;
        Double value = (duration / 60000.0);
        if (!labelDurationMap.containsKey(category)) {
            labelDurationMap.put(category, value);
        } else {
            labelDurationMap.put(category, labelDurationMap.get(category) + value);
        }

        return new ProcessDurationVO(category, value, id); // 分钟数  (duration / 60000.0)
    }

    public void fixTryOutTools(TraceDataRealTimeProcess currentTraceData) {

            String tempSubActionLabel = "";
            String tempActionLabel = "";
            switch (currentTraceData.getSource()) {
                case "ANNOTATION":
                    if ("OPEN".equals(currentTraceData.getInstantEvent())) {
                        tempSubActionLabel = "READ_ANNOTATION";
                    } else if ("CLOSE".equals(currentTraceData.getInstantEvent())) {
                        tempSubActionLabel = "CLOSE_ANNOTATION";
                    }
                    tempActionLabel = "ANNOTATION";
                    break;
                case "SEARCH_ANNOTATION":
                    tempSubActionLabel = "SEARCH_ANNOTATION";
                    tempActionLabel = "SEARCH_ANNOTATION";
                    break;
                case "ESSAY":
                    if ("OPEN".equals(currentTraceData.getInstantEvent())) {
                        tempSubActionLabel = "OPEN_ESSAY";
                    } else if ("CLOSE".equals(currentTraceData.getInstantEvent())) {
                        tempSubActionLabel = "CLOSE_ESSAY";
                    }
                    tempActionLabel = "ESSAY";
                    break;
                case "PLANNER":
                    if ("OPEN".equals(currentTraceData.getInstantEvent())) {
                        tempSubActionLabel = "OPEN_PLANNER";
                    } else if ("CLOSE".equals(currentTraceData.getInstantEvent())) {
                        tempSubActionLabel = "CLOSE_PLANNER";
                    }
                    tempActionLabel = "PLANNER";
                    break;
                case "TIMER":
                    tempSubActionLabel = "TIMER";
                    tempActionLabel = "TIMER";
                    break;
                case "CHATGPT":
                    if ("OPEN".equals(currentTraceData.getInstantEvent())) {
                        tempSubActionLabel = "OPEN_GPT";
                    } else if ("CLOSE".equals(currentTraceData.getInstantEvent())) {
                        tempSubActionLabel = "CLOSE_GPT";
                    }
                    tempActionLabel = "CHATGPT";
                    break;
                case "CHATGPT_SCAFFOLD":
                    if ("OPEN".equals(currentTraceData.getInstantEvent())) {
                        tempSubActionLabel = "OPEN_GPT_SCAFFOLD";
                    } else if ("CLOSE".equals(currentTraceData.getInstantEvent())) {
                        tempSubActionLabel = "CLOSE_GPT_SCAFFOLD";
                    }
                    tempActionLabel = "CHATGPT_SCAFFOLD";
                    break;
                case "DICTIONARY":
                    if ("OPEN".equals(currentTraceData.getInstantEvent())) {
                        tempSubActionLabel = "OPEN_DICTIONARY";
                    } else if ("CLOSE".equals(currentTraceData.getInstantEvent())) {
                        tempSubActionLabel = "CLOSE_DICTIONARY";
                    }
                    tempActionLabel = "DICTIONARY";
                    break;
                case "CHATTEACHER":
                    if ("OPEN".equals(currentTraceData.getInstantEvent())) {
                        tempSubActionLabel = "OPEN_CHATTEACHER";
                    } else if ("CLOSE".equals(currentTraceData.getInstantEvent())) {
                        tempSubActionLabel = "CLOSE_CHATTEACHER";
                    }
                    tempActionLabel = "CHATTEACHER";
                    break;
                case "CHECKLIST":
                    if ("OPEN".equals(currentTraceData.getInstantEvent())) {
                        tempSubActionLabel = "OPEN_CHECKLIST";
                    } else if ("CLOSE".equals(currentTraceData.getInstantEvent())) {
                        tempSubActionLabel = "CLOSE_CHECKLIST";
                    }
                    tempActionLabel = "CHECKLIST";
                    break;

                case "CHATGPT_ASSISTANT_TEACHER":
                    if ("OPEN".equals(currentTraceData.getInstantEvent())) {
                        tempSubActionLabel = "OPEN_GPT_ASSISTANT_TEACHER";
                    } else if ("CLOSE".equals(currentTraceData.getInstantEvent())) {
                        tempSubActionLabel = "CLOSE_GPT_ASSISTANT_TEACHER";
                    }
                    tempActionLabel = "CHATGPT_ASSISTANT_TEACHER";
                    break;
                case "CHATGPT_ASSESSMENT":
                    if ("OPEN".equals(currentTraceData.getInstantEvent())) {
                        tempSubActionLabel = "OPEN_GPT_ASSESSMENT";
                    } else if ("CLOSE".equals(currentTraceData.getInstantEvent())) {
                        tempSubActionLabel = "CLOSE_GPT_ASSESSMENT";
                    }
                    tempActionLabel = "CHATGPT_ASSESSMENT";
                    break;
                case "CHATGPT_ASSISTANT":
                    if ("OPEN".equals(currentTraceData.getInstantEvent())) {
                        tempSubActionLabel = "OPEN_GPT_ASSISTANT";
                    } else if ("CLOSE".equals(currentTraceData.getInstantEvent())) {
                        tempSubActionLabel = "CLOSE_GPT_ASSISTANT";
                    }
                    tempActionLabel = "CHATGPT_ASSISTANT";
                    break;

                case "CHATGPT_MULTI_AGENTS_SINGLE_WINDOW":
                    if ("OPEN".equals(currentTraceData.getInstantEvent())) {
                        tempSubActionLabel = "OPEN_CHATGPT_MULTI_AGENTS";
                    } else if ("CLOSE".equals(currentTraceData.getInstantEvent())) {
                        tempSubActionLabel = "CLOSE_CHATGPT_MULTI_AGENTS";
                    }
                    tempActionLabel = "CHATGPT_MULTI_AGENTS";
                    break;
                case "CHATGPT_MULTI_AGENTS_MULTI_WINDOWS":
                    if ("OPEN".equals(currentTraceData.getInstantEvent())) {
                        tempSubActionLabel = "OPEN_CHATGPT_MULTI_AGENTS_MULTI_WINDOWS";
                    } else if ("CLOSE".equals(currentTraceData.getInstantEvent())) {
                        tempSubActionLabel = "CLOSE_CHATGPT_MULTI_AGENTS_MULTI_WINDOWS";
                    }
                    tempActionLabel = "CHATGPT_CHATGPT_MULTI_AGENTS_MULTI_WINDOWS";
                    break;
                case "ESSAY_PRODUCT":
                    if ("OPEN".equals(currentTraceData.getInstantEvent())) {
                        tempSubActionLabel = "OPEN_ESSAY_PRODUCT";
                    } else if ("CLOSE".equals(currentTraceData.getInstantEvent())) {
                        tempSubActionLabel = "CLOSE_ESSAY_PRODUCT";
                    }
                    tempActionLabel = "ESSAY_PRODUCT";
                    break;
                case "PROCESS_VISUAL":
                    if ("OPEN".equals(currentTraceData.getInstantEvent())) {
                        tempSubActionLabel = "OPEN_PROCESS_VISUAL";
                    } else if ("CLOSE".equals(currentTraceData.getInstantEvent())) {
                        tempSubActionLabel = "CLOSE_PROCESS_VISUAL";
                    }
                    tempActionLabel = "PROCESS_VISUAL";
                    break;
                default:
                    throw new RuntimeException("Exception in switch: subactionlabel:" + currentTraceData.getSubActionLabel() + "------" + currentTraceData.getSource() + "------id:" + currentTraceData.getId());
            }
            if (StrUtil.isEmpty(tempSubActionLabel) || StrUtil.isEmpty(tempActionLabel)) {
                System.out.println(currentTraceData);
                throw new RuntimeException("Exception fix TRY_OUT_TOOLS exception");
            }
            currentTraceData.setSubActionLabel(tempSubActionLabel);
            currentTraceData.setActionLabel(tempActionLabel);

    }

    public boolean checkAddSimplifiedTrace(TraceDataRealTimeProcess currentTraceData, TraceDataRealTimeProcess previousTraceData, TraceDataRealTimeProcess nextTraceData) {

//        JSONObject previousJsonObj = JSONUtil.parseObj(previous);
//        JSONObject nextJsonObj = JSONUtil.parseObj(next);

        /*String previousSubActionLabel = previousJsonObj.getStr("subActionLabel");
        String previousSource = previousJsonObj.getStr("source");
        String previousInstantEvent = previousJsonObj.getStr("instantEvent");
        String previousPageEvent = previousJsonObj.getStr("pageEvent");

        String nextSubActionLabel = nextJsonObj.getStr("subActionLabel");
        String nextSource = nextJsonObj.getStr("source");
        String nextInstantEvent = nextJsonObj.getStr("instantEvent");
        String nextPageEvent = nextJsonObj.getStr("pageEvent");*/

        if (previousTraceData == null || nextTraceData == null) {
            return true;
        }

        String previousSubActionLabel = previousTraceData.getSubActionLabel();
        String previousSource = previousTraceData.getSource();
        String previousInstantEvent = previousTraceData.getInstantEvent();
        String previousPageEvent = previousTraceData.getPageEvent();

        String nextSubActionLabel = nextTraceData.getSubActionLabel();
        String nextSource = nextTraceData.getSource();
        String nextInstantEvent = nextTraceData.getInstantEvent();
        String nextPageEvent = nextTraceData.getPageEvent();

//        log.info("checkAddSimplifiedTrace: " + currentTraceData);
//        log.info("previous: " + previousTraceData);
//        log.info("next: " + nextTraceData);

        // 1. fix TRY_OUT_TOOLS
        if ("TRY_OUT_TOOLS".equals(currentTraceData.getSubActionLabel())) {
            this.fixTryOutTools(currentTraceData);
            return true;
        }

        // 2. 删除 mouse move 的 TABLE_OF_CONTENT
        if (currentTraceData.getPageEvent().equals("MOUSE_MOVE") && currentTraceData.getSubActionLabel().equals("TABLE_OF_CONTENT")) {
            return false;
        }


        // 3. 将mouse move 和 mouse wheel 事件精简
        if (MyConstant.MOUSE_EVENTS.contains(currentTraceData.getPageEvent())
//                && MyConstant.SUB_ACTION_LABELS.contains(currentTraceData.getSubActionLabel())
        ) {

            // mouse 之前是 START_TASK, 则保留
            if (previousSubActionLabel.equals("START_TASK")) {
                return true;
            }

            /*
            // mouse 之前或之后是 Timer, 则保留
            if (("TIMER".equals(previousSource) || "TIMER".equals(nextSource)) &&
                    ("OPEN".equals(previousInstantEvent) || "OPEN".equals(nextInstantEvent))) {
                return true;
            }

            // mouse 之前是close tool, 则保留
            if (MyConstant.CLOSE_TOOL_LABELS.contains(previousSubActionLabel) ||
                    (previousInstantEvent.contains("CLOSE") && (previousSubActionLabel.equals("SEARCH_ANNOTATION") || previousSubActionLabel.equals("TRY_OUT_TOOLS")))) {
                return true;
            }

            // mouse 之后是open tool, 则保留
            if (MyConstant.OPEN_TOOL_LABELS.contains(nextSubActionLabel) ||
                    (nextInstantEvent.equals("OPEN") && (nextSubActionLabel.equals("SEARCH_ANNOTATION") || nextSubActionLabel.equals("TRY_OUT_TOOLS")))) {
                return true;
            }*/

            // mouse 之前是leave page, 则保留                          // mouse 之后是leave page, 则保留
            if (previousInstantEvent.equals("LEAVE_PAGE") || nextInstantEvent.equals("LEAVE_PAGE")) {
                return true;
            }
            // 是 mouse event 但是不在事件之后 或 之前 , 则不保留
            return false;
        }

        // 不是 mouse event
        return true;
    }
}
