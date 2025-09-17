package com.monash.flora_backend.service.impl;

import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.google.common.collect.Lists;
import com.monash.flora_backend.config.cache.IGlobalCache;
import com.monash.flora_backend.constant.MyMoodleConfigConstant;
import com.monash.flora_backend.controller.vo.*;
import com.monash.flora_backend.dao.entity.TraceData;
import com.monash.flora_backend.dao.mapper.TraceDataMapper;
import com.monash.flora_backend.service.ITraceDataService;
import com.monash.flora_backend.util.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;
import java.util.zip.ZipOutputStream;

import static com.monash.flora_backend.util.GenerateLinkCacheHelper.updateTypeCache;

/**
 * <p>
 * 服务实现类
 * </p>
 *
 * @author xinyu
 * @since 2022-10-18
 */
@Slf4j
@Service
@RequiredArgsConstructor
//@AllArgsConstructor   这里之前有AllArgsConstructor 如果程序出问题，可能是这里导致的
public class TraceDataServiceImpl extends ServiceImpl<TraceDataMapper, TraceData> implements ITraceDataService {
    //    private final MyConstant myConstant;
    private final boolean showDebugging = true;
    private final IGlobalCache iGlobalCache;
//    private final TraceDataMapper traceDataMapper;
//    private static List<TraceData> tempTraceDataCache = new ArrayList<>();

//    @Override
//    public void saveToRedisList(String key, String value) { // only used for scaffolding check
//
//    }
//
//    @Override
//    public List<String> getFromRedisList(String key) {
//        return iglobalCache.lGet(key, 0L, -1L).stream().map((obj) -> Objects.toString(obj, null))
//                .collect(Collectors.toList());
//    }
//
//    @Override
//    public String getLastFromRedisList(String key) {
//        return iglobalCache.lGetIndex(key, -1).toString();
//    }
//
//    @Override
//    public boolean isRedisListExist(String key) {
//        return iglobalCache.hasKey(key);
//    }

//    @Override
//    public boolean saveBatch(List<TraceDataVO> traceDataVOList) {
//        List<TraceData> actionList = MyBeanCopyUtils.copyBeanList(traceDataVOList, TraceData.class);
//        boolean saveBatchResult = super.saveBatch(actionList);
//
//        actionList.forEach(t -> saveToRedisList(MyConstant.REDIS_ACTION_LABEL_LIST + t.getUserId(), t.getId() + "--" + t.getSubActionLabel()));
//
//        return saveBatchResult;
//    }

    @Override
    public boolean myUpdateBatch(List<TraceData> traceDataList) {
        if (traceDataList.isEmpty()) {
            return false;
        }
        return super.updateBatchById(traceDataList);
    }

//
//    @Override
//    public boolean mySaveBatch(List<TraceData> traceDataList) {
//        tempTraceDataCache.addAll(traceDataList);
//        if (tempTraceDataCache.size() >= 1000) {
//            this.saveBatch(tempTraceDataCache);
//            tempTraceDataCache.clear();
//        }
//        return false;
//    }
//
//    @Override
//    public TraceDataVO findByUserIdOrderByTimeDesc(Long userId) {
//        QueryWrapper<TraceData> queryWrapper = new QueryWrapper<>();
//        queryWrapper.eq("user_id", userId).eq("source", "TIMER").eq("instant_event", "ESSAY_TASK_START").last("LIMIT 1");
//        List<TraceData> traceDataList = super.list(queryWrapper);
//        if (traceDataList.isEmpty()) {
//            return null;
//        } else {
//            return MyBeanCopyUtils.copyBean(traceDataList.get(0), TraceDataVO.class);
//        }
//    }

    @Override
    public boolean save(TraceDataVO traceDataVO) {

        return super.save(MyBeanCopyUtils.copyBean(traceDataVO, TraceData.class));
    }

//    @Override
//    public List<TraceDataVO> findAllStudentInfo() {
//        QueryWrapper<TraceData> queryWrapper = new QueryWrapper<>();
//        queryWrapper.select("DISTINCT user_id, username, firstname, lastname");
//
//        return MyBeanCopyUtils.copyBeanList(super.list(queryWrapper), TraceDataVO.class);
//
//    }

    @Override
    public boolean removeByUserId(Long userId) {
        QueryWrapper<TraceData> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("user_id", userId);
        return super.remove(queryWrapper);
    }

//    @Async("asyncPoolTaskExecutor")
//    @SneakyThrows
//    @Override
//    public void exportTraceDataToExcel() {
//        int totalNumber = super.count();
//
//        int totalPageNumber = totalNumber / MyConstant.ITEM_NUMBER_PER_EXCEL;
//        if (totalNumber % MyConstant.ITEM_NUMBER_PER_EXCEL != 0) {
//            totalPageNumber += 1;
//        }
//
//        for (int i = 0; i < totalPageNumber; i++) {
//
//            String exportFilePath = MyMoodleConfigConstant.EXCEL_EXPORT_PATH + "/trace_data" + i + ".xlsx";
//            log.info("----------------" + exportFilePath);
//
//            QueryWrapper<TraceData> wrapper = new QueryWrapper<>();
//            wrapper.last("LIMIT " + (i * MyConstant.ITEM_NUMBER_PER_EXCEL) + ", " + MyConstant.ITEM_NUMBER_PER_EXCEL);
//
//            List<TraceData> traceDataList = super.list(wrapper);
//
//            //导出包含数据内容的文件（方式二）
//            //头部，第一层
//            List<String> head1 = new ArrayList<>();
//            head1.add("#");
//            head1.add("user_id");
//            head1.add("username");
//            head1.add("save_time");
//            head1.add("url");
//            head1.add("firstname");
//            head1.add("lastname");
//
//            head1.add("source");
//            head1.add("page_event");
//            head1.add("target_object");
//            head1.add("instant_event");
//            head1.add("action_label");
//
//            head1.add("process_label");
//            head1.add("screenX");
//            head1.add("screenY");
//            head1.add("clientX");
//            head1.add("clientY");
//
//            head1.add("window_inner_width");
//            head1.add("window_inner_height");
//            head1.add("screen_width");
//            head1.add("screen_height");
//
//            head1.add("event_value");
//
//
//            //封装头部
//            List<List<String>> allHead = new ArrayList<>();
//            allHead.add(head1);
//
//
//            List<List<Object>> allData = Lists.newArrayList();
//            //封装数据体
//            for (int k = 0; k < traceDataList.size(); k++) {
//                TraceData traceData = traceDataList.get(k);
//                String saveTime = MyUtils.convertTimestampToFormat(traceData.getSaveTime());
//
//                List<Object> data1 = Lists.newArrayList((k+1),
//                        traceData.getUserId(), traceData.getUsername(), saveTime, traceData.getUrl(), traceData.getFirstname(),
//                        traceData.getLastname(), traceData.getSource(), traceData.getPageEvent(), traceData.getTargetObject(), traceData.getInstantEvent(),
//                        traceData.getSubActionLabel(), traceData.getProcessLabel(), traceData.getScreenX(), traceData.getScreenY(), traceData.getClientX(), traceData.getClientY(),
//                        traceData.getWindowInnerWidth(),traceData.getWindowInnerHeight(),traceData.getScreenWidth(),traceData.getScreenHeight(), traceData.getEventValue()
//                );
//                allData.add(data1);
//            }
//
//            byte[] stream2 = DynamicEasyExcelExportUtil.customerExportExcelFile(allHead, allData);
//            FileOutputStream outputStream2 = new FileOutputStream(new File(exportFilePath));
//            outputStream2.write(stream2);
//            outputStream2.close();
//        }
//    }

//    @Override
//    public boolean addSubActionLabel(TraceDataVO traceDataVO) {
////        log.info("addSubActionLabel:" + traceDataVO);
//        if (traceDataVO.getSource().equals("PAGE") && traceDataVO.getInstantEvent().equals("LEAVE_PAGE")) {
//            //找出当前页面 离开之前所有的mouse move/wheel，修改其sub action label 和leave_page的sub action label 保持一致
//            addSubActionLabelForReadingNavigation(traceDataVO);
//        } else if (traceDataVO.getInstantEvent().equals("OPEN") || traceDataVO.getInstantEvent().equals("CLOSE")) {
//            return addSubActionLabelForToolEvents(traceDataVO);
//        } else if (Set.of("PAGE", "EXTRA").contains(traceDataVO.getSource()) && (traceDataVO.getInstantEvent().endsWith("_READING"))) {
//            String[] tempUrlString = checkUrlRelevant(traceDataVO.getUrl()).split(":::");
//            String tempSuffix = "";
//            if (iglobalCache.hasKey(traceDataVO.getUserId() + "-page-viewed-" + traceDataVO.getUrl())) { //表明此时是用户不是第一次访问改网页
//                tempSuffix = "_REREADING"; // not first time reading
//            } else {// 表明此时是用户第一次访问改网页
//                tempSuffix = "_READING"; // first time reading  all the first time reading are labelled as reading
//            }
//
//            String actionLabel = tempUrlString[0];
//            String subActionLabel;
//            if ("INSTRUCTION".equals(actionLabel)) {
//                subActionLabel = tempUrlString[1];
//            } else {
//                subActionLabel = tempUrlString[1] + tempSuffix;
//            }
//
//
//            traceDataVO.setActionLabel(actionLabel);
//            traceDataVO.setSubActionLabel(subActionLabel);
//
//        } else if (Set.of("PAGE", "EXTRA").contains(traceDataVO.getSource()) && (traceDataVO.getInstantEvent().endsWith("_PAGE_NAVIGATION"))) {
//            traceDataVO.setActionLabel("NAVIGATION");
//            traceDataVO.setSubActionLabel("PAGE_NAVIGATION");
//        } else {
//            Optional<String> subActionLabel = Optional.ofNullable(MyConstant.SUB_ACTION_LABEL_MAP.get(traceDataVO.getSource() + "_" + traceDataVO.getInstantEvent()));
//            if (subActionLabel.isPresent()) {
//
//                traceDataVO.setSubActionLabel(subActionLabel.get());
//                if (StrUtil.equals(traceDataVO.getSubActionLabel(), "END_TASK")) {
//                    traceDataVO.setActionLabel("END");
//                } else if (StrUtil.equals(traceDataVO.getSubActionLabel(), "START_TASK")) {
//                    traceDataVO.setActionLabel("START");
//                } else {
//                    traceDataVO.setActionLabel(traceDataVO.getSource());
//                }
//            } else {
//                log.info(traceDataVO.toString());
//                throw new RuntimeException("Cannot find sub action label");
//            }
//        }
//        return true;
//    }

//    /**
//     * Cover
//     * Try_out_tools for all instrumentation tools
//     */
//    private boolean addSubActionLabelForToolEvents(TraceDataVO traceDataVO) {
//        String accessTimesKey = "tool-used-" + traceDataVO.getUserId() + "_" + traceDataVO.getCourseId() + "_" + traceDataVO.getSource();
//        String currentTimestamp = MyUtils.getCurrentTimestamp();
//
//        // Try timer
//        if (StrUtil.equals(traceDataVO.getSource(), "TIMER") && StrUtil.equals(traceDataVO.getInstantEvent(), "OPEN") && !iglobalCache.hasKey(accessTimesKey + "_OPEN")) {
//            iglobalCache.set(accessTimesKey + "_OPEN", currentTimestamp, MyConstant.REDIS_EXPIRE_SECONDS);
//            traceDataVO.setSubActionLabel("TRY_OUT_TOOLS");
//            traceDataVO.setActionLabel("NAVIGATION");
//        } else if (StrUtil.equals(traceDataVO.getInstantEvent(), "OPEN") && !iglobalCache.hasKey(accessTimesKey + "_OPEN")) {
//            iglobalCache.set(accessTimesKey + "_OPEN", traceDataVO.toString(), MyConstant.REDIS_EXPIRE_SECONDS);
//            return false;
//        } else if (StrUtil.equals(traceDataVO.getInstantEvent(), "CLOSE") && !iglobalCache.hasKey(accessTimesKey + "_CLOSE")) {
//            iglobalCache.set(accessTimesKey + "_CLOSE", "1", MyConstant.REDIS_EXPIRE_SECONDS);
//            if (Long.parseLong(traceDataVO.getEventValue().split(":::")[1]) < 3000) {
//                traceDataVO.setSubActionLabel("TRY_OUT_TOOLS");
//                traceDataVO.setActionLabel("NAVIGATION");
//
//                TraceDataVO traceDataVOOpen = JSONUtil.toBean((String) iglobalCache.get(accessTimesKey + "_OPEN"), TraceDataVO.class);
//                traceDataVOOpen.setSubActionLabel("TRY_OUT_TOOLS");
//                traceDataVOOpen.setActionLabel("NAVIGATION");
//                MyConstant.cacheTryOutToolsOpenList.add(traceDataVOOpen);
//                iglobalCache.del(accessTimesKey + "_OPEN");
//            } else { //第一次使用但是使用时长多于3秒
//                traceDataVO.setSubActionLabel(traceDataVO.getInstantEvent() + "_" + traceDataVO.getSource());
//                traceDataVO.setActionLabel(traceDataVO.getSource()); //因为是tools open/close 所以可以直接用source
//            }
//        }
//        //因为页面事件中已经带有的default的 subaction label 和action label，所以此处不需要再添加
//        else {
//            traceDataVO.setSubActionLabel(traceDataVO.getInstantEvent() + "_" + traceDataVO.getSource());
//            traceDataVO.setActionLabel(traceDataVO.getSource()); //因为是tools open/close 所以可以直接用source
//        }
//        return true;
//    }
//
//    /**
//     * Cover all actions of
//     * READING          Relevant_Reading, Relevant_Re-reading, Irrelevant_Reading, Irrelevant_Re-reading
//     * INSTRUCTION      Task_Overview, Task_Requriement, Learning_Goal, Rubric
//     * NAVIGATION       Page_Navigation, Table_Of_Content
//     */
//    private void addSubActionLabelForReadingNavigation(TraceDataVO traceDataVO) {
//        String accessTimesKey = traceDataVO.getUserId() + "-page-viewed-" + traceDataVO.getUrl();
//        if (iglobalCache.hasKey(accessTimesKey)) { //表明此时是用户不是第一次访问改网页
//            traceDataVO.setSubActionLabel("REREADING"); // not first time reading
//        } else {// 表明此时是用户第一次访问改网页
//            iglobalCache.set(accessTimesKey, "1", MyConstant.REDIS_EXPIRE_SECONDS); //一天之后 关于用户访问网页的 redis 记录自动删除
//            traceDataVO.setSubActionLabel("READING"); // first time reading  all the first time reading are labelled as reading
//        }
//
//        //当离开页面时候，需要检查是否有try_out_tools 没有被更新
//        Set<String> tryOutToolKeys = iglobalCache.getKeys("tool-used-" + traceDataVO.getUserId() + "_" + traceDataVO.getCourseId() + "_" + traceDataVO.getSource());
//        tryOutToolKeys.forEach(ty-> {
//            if (ty.endsWith("OPEN")) {
//                long leavePageTime = Long.parseLong(traceDataVO.getSaveTime());
//
//                TraceDataVO traceDataVOOpen = JSONUtil.toBean((String) iglobalCache.get(ty), TraceDataVO.class);
//                long toolUseLength = leavePageTime - Long.parseLong(traceDataVOOpen.getSaveTime());
//                if (toolUseLength < 3000) {
//                    traceDataVOOpen.setSubActionLabel("TRY_OUT_TOOLS");
//                    traceDataVOOpen.setActionLabel("NAVIGATION");
//                } else {
//                    traceDataVOOpen.setSubActionLabel(traceDataVOOpen.getInstantEvent() + "_" + traceDataVOOpen.getSource());
//                    traceDataVOOpen.setActionLabel(traceDataVOOpen.getSource());
//                }
//                MyConstant.cacheTryOutToolsOpenList.add(traceDataVOOpen);
//                iglobalCache.del(ty);
//            }
//        });
//
//        if (traceDataVO.getEventValue().contains("PAGE_STAY_TIME_LENGTH")) {
//            int stayTime = Integer.parseInt(traceDataVO.getEventValue().replaceAll("\\D", ""));//替换所有非数字字符
//            log.info("--------------page stay time: " + stayTime);
//            if (stayTime > 6000) { //停留超过6秒
//                String[] actionAndSubActionLabelArr = checkUrlRelevant(traceDataVO.getUrl()).split(":::");
//
//                if ("INSTRUCTION".equals(actionAndSubActionLabelArr[0])) {
//                    traceDataVO.setSubActionLabel(actionAndSubActionLabelArr[1]); // 对于instruction 不需要加后面的reading 或者rereading
//                } else {
//                    traceDataVO.setSubActionLabel(actionAndSubActionLabelArr[1] + "_" + traceDataVO.getSubActionLabel());
//                }
//                traceDataVO.setActionLabel(actionAndSubActionLabelArr[0]);
//
////                traceDataVO.setSubActionLabel(tempSubTag + "_" + traceDataVO.getSubActionLabel());
//
////                traceDataVO.setSubActionLabel(
////                        Optional.ofNullable(MyConstant.RELEVANT_READING_MAP.get(traceDataVO.getUrl())).orElse("RELEVANT")
////                                + "_" + traceDataVO.getSubActionLabel());
////                if (traceDataVO.getSubActionLabel().startsWith("UNKNOWN_URL")) {
////                    log.error(traceDataVO.toString());
////                    throw new RuntimeException("UNKNOWN_URL in checkReadingNavigation");
////                }
//            } else { //不超过6秒，属于navigation
//                traceDataVO.setSubActionLabel("PAGE_NAVIGATION");
//                traceDataVO.setActionLabel("NAVIGATION");
//            }
//        }
//    }
//
//
//    private List<TraceData> updateMouseMoveSubActionLabel(TraceDataVO traceDataVO) {
//        int stayTime = Integer.parseInt(traceDataVO.getEventValue().replaceAll("\\D", ""));//替换所有非数字字符
//        log.info("--------------page stay time: " + stayTime);
//        // 此处需要对数据库中的 鼠标移动以及滚动数据 做判定，鼠标数据和离开页面时的sub action label 保持一致
//        QueryWrapper<TraceData> queryWrapper = new QueryWrapper<>();
//        queryWrapper.eq("user_id", traceDataVO.getUserId()).eq("url", traceDataVO.getUrl())
////                .in("instant_event", "BODY_CLICK", "CHANGE_PAGE_CLICK", "SELECT_TEXT")
//                .in("sub_action_label", "READING") // NOT_USE 包含了CHANGE_PAGE_CLICK， BODY_CLICK， SELECT_TEXT
//                .le("save_time", traceDataVO.getSaveTime()).ge("save_time", (Long.parseLong(traceDataVO.getSaveTime()) - stayTime + 20)); //误差范围是20 毫秒,  之查找leave page action 同一页面，并且save time 小于 leave page 的save time 的 item
//
//        if (!StrUtil.isEmpty(traceDataVO.getCourseId())) {
//            queryWrapper.eq("course_id", traceDataVO.getCourseId());
//        }
//        queryWrapper.orderByAsc("save_time");
//
//        List<TraceData> currentPageMouseTraceDataList = super.list(queryWrapper);
//
////        List<TraceData> tempList = currentPageMouseTraceDataList.stream()
////                .filter(m -> (Long.parseLong(traceDataVO.getSaveTime()) - Long.parseLong(m.getSaveTime()) < stayTime + 20))
////                .collect(Collectors.toList());
//        currentPageMouseTraceDataList.forEach(m -> m.setSubActionLabel(traceDataVO.getSubActionLabel()));
////        super.updateBatchById(tempList);
//        return currentPageMouseTraceDataList;
//    }

//    @Override
//    public void updateBodyMouseMoveSubActionLabel(List<TraceDataVO> traceDataVOList) {
//        List<TraceData> updateList = new ArrayList<>();
//        for (TraceDataVO traceDataVO : traceDataVOList) {
//            updateList.addAll(updateMouseMoveSubActionLabel(traceDataVO));
//        }
//
//        if (!updateList.isEmpty()) {
//            super.updateBatchById(updateList);
//        }
//    }
//
//    @Override
//    public void updateOpenToolsSubActionLabel(List<TraceDataVO> tryOutToolsTraceDataVOList) {
//        List<TraceData> updateList = new ArrayList<>();
//
//        for (TraceDataVO traceDataVO : tryOutToolsTraceDataVOList) {
//            log.info("-------------------------------");
//            log.info(traceDataVO.toString());
//            QueryWrapper<TraceData> queryWrapper = new QueryWrapper<>();
//            queryWrapper.eq("user_id", traceDataVO.getUserId()).eq("url", traceDataVO.getUrl())
//                    .eq("source", traceDataVO.getSource()).eq("instant_event", "OPEN")
//                    .le("save_time", traceDataVO.getSaveTime()).orderByDesc("save_time").last("limit 1");
//            TraceData one = super.getOne(queryWrapper);
//            log.info("-------------------------------");
//            log.info(one.toString());
//            if (one != null) {
//                one.setSubActionLabel(traceDataVO.getSubActionLabel()); //TRY_OUT_TOOLS
//                one.setActionLabel(traceDataVO.getActionLabel()); //NAVIGATION
//                updateList.add(one);
//            } else {
//
//                log.info("start-------------exception log, tool has close but no open------------------");
//                log.info(traceDataVO.toString());
//                log.info("end-------------exception log, tool has close but no open------------------");
//            }
//        }
//
//        if (!updateList.isEmpty()) {
//            super.updateBatchById(updateList);
//        }
//    }

    @Override
    public List<TraceData> findAllByUserIdAndCourseIdOrderByTimeAsc(Long userId, String courseId) {
        QueryWrapper<TraceData> queryWrapper = new QueryWrapper<>();
        if (userId != 0) {
            //  todo： trace data
            queryWrapper.eq("user_id", userId).eq("course_id", courseId);
        } else {
            queryWrapper.eq("course_id", courseId);
        }
        queryWrapper.orderByAsc("save_time");
        return super.list(queryWrapper);
    }

    @Override
    public String checkUrlRelevant(String url) {
        String tempSubTag = "READING:::RELEVANT"; //默认all pages are relevant pages
        //如果url 是非空的
        if (!StrUtil.isEmpty(url)) {
            String[] tempUrlElements = url.split("id=");
            if (tempUrlElements.length >= 2) {
                String pageId = tempUrlElements[1];
                if (MyMoodleConfigConstant.TASK_OVERVIEW_READING_PAGE_ID_SET.contains(pageId)) { // INSTRUCTION READING
                    tempSubTag = "INSTRUCTION:::TASK_OVERVIEW";
                } else if (MyMoodleConfigConstant.TASK_REQUIREMENT_READING_PAGE_ID_SET.contains(pageId)) {
                    tempSubTag = "INSTRUCTION:::TASK_REQUIREMENT";
                } else if (MyMoodleConfigConstant.LEARNING_GOAL_READING_PAGE_ID_SET.contains(pageId)) {
                    tempSubTag = "INSTRUCTION:::LEARNING_GOAL";
                } else if (MyMoodleConfigConstant.RUBRIC_READING_PAGE_ID_SET.contains(pageId)) {
                    tempSubTag = "INSTRUCTION:::RUBRIC";
                } else if (MyMoodleConfigConstant.WELCOME_READING_PAGE_ID_SET.contains(pageId)) {
                    tempSubTag = "INSTRUCTION:::WELCOME";
                } else if (MyMoodleConfigConstant.IRRELEVANT_READING_PAGE_ID_SET.contains(pageId)) { // IRRELEVANT READING
                    tempSubTag = "READING:::IRRELEVANT";
                }
            }
        }
        return tempSubTag;
    }

    @Override
    public void exportTraceDataToExcelByUserIdListAndCourseIdList(List<Long> userIdList, List<String> courseIdList, ZipOutputStream zos) throws IOException {
        //头部，第一层
        List<List<String>> allHead = initialiseAllHead();

        List<List<Object>> allData = Lists.newArrayList();


        userIdList.forEach(userId -> {
            loopCourse(courseIdList, userId, allData);
        });


        byte[] stream = DynamicEasyExcelExportUtil.customerExportExcelFile(allHead, allData);
        // 写入zip
        FileUtils.writeToZip(zos, stream, "trace_data.xlsx");
    }

    @Override
    public void exportTraceDataToExcelByUserIdListAndCourseIdList(List<Long> userIdList, List<String> courseIdList, ZipOutputStream zos, int cutRow) throws IOException {
//        List<List<String>> allHead = getAllHead();
//        List<List<Object>> allData = Lists.newArrayList();
//
//        AtomicInteger count = new AtomicInteger(); // 记录录入了几行数据
//        AtomicInteger part = new AtomicInteger(0); // 记录是第几部分的excel
        ExcelBreaker excelBreaker = new ExcelBreaker(cutRow, "trace_data", initialiseAllHead(), zos);

        userIdList.forEach(userId -> {
            courseIdList.forEach(courseId -> {
                List<TraceData> traceDataList = findAllByUserIdAndCourseIdOrderByTimeAsc(userId, courseId);
                log.info("export excel traceDataList size:" + traceDataList.size() + "----userId:" + userId + "----courseId:" + courseId);
                //封装数据体
                for (int k = 0; k < traceDataList.size(); k++) {
                    TraceData traceData = traceDataList.get(k);
                    String saveTime = MyUtils.convertTimestampToFormat(traceData.getSaveTime());

                    List<Object> data = Lists.newArrayList((k + 1),
                            traceData.getUserId(), traceData.getUsername(), saveTime, traceData.getUrl(), traceData.getFirstname(),
                            traceData.getLastname(), traceData.getSource(), traceData.getPageEvent(), traceData.getTargetObject(), traceData.getInstantEvent(),
                            traceData.getSubActionLabel(), traceData.getScreenX(), traceData.getScreenY(), traceData.getClientX(), traceData.getClientY(),
                            traceData.getWindowInnerWidth(), traceData.getWindowInnerHeight(), traceData.getScreenWidth(), traceData.getScreenHeight(), traceData.getEventValue(),
                            traceData.getActionLabel(), traceData.getProcessLabel(), traceData.getCourseId(), traceData.getDetailedActionLabel(), traceData.getModelType()
                    );
                    excelBreaker.getAllData().add(data);
                    // 2. 每次完成一次add data就
                    excelBreaker.increaseCount(1);
                    // 如果counter超过了cutRow，保存进zip
                    excelBreaker.tryUpdateParamsAndSave();
                }
            });
        });
        excelBreaker.saveExcelToZip();
    }

    @Override
    public void exportTraceDataToExcelByUserIdListAndCourseIdList(List<Long> userIdList, List<String> courseIdList, int cutRows, String token, String dateString) throws IOException {
        ExcelBreaker excelBreaker = new ExcelBreaker(cutRows, "trace_data", initialiseAllHead(), token, dateString);
        updateTypeCache(token, "trace_data", iGlobalCache);
        iGlobalCache.hset(token, "num-total-rows", String.valueOf(getCountByUserIdsAndCourseIds(userIdList, courseIdList)));

        userIdList.forEach(userId -> {
            courseIdList.forEach(courseId -> {
                List<TraceData> traceDataList = findAllByUserIdAndCourseIdOrderByTimeAsc(userId, courseId);
                log.info("export excel traceDataList size:" + traceDataList.size() + "----userId:" + userId + "----courseId:" + courseId);
                //封装数据体
                for (int k = 0; k < traceDataList.size(); k++) {
                    TraceData traceData = traceDataList.get(k);
                    String saveTime = MyUtils.convertTimestampToFormat(traceData.getSaveTime());

                    List<Object> data = Lists.newArrayList((k + 1),
                            traceData.getUserId(), traceData.getUsername(), saveTime, traceData.getUrl(), traceData.getFirstname(),
                            traceData.getLastname(), traceData.getSource(), traceData.getPageEvent(), traceData.getTargetObject(), traceData.getInstantEvent(),
                            traceData.getSubActionLabel(), traceData.getScreenX(), traceData.getScreenY(), traceData.getClientX(), traceData.getClientY(),
                            traceData.getWindowInnerWidth(), traceData.getWindowInnerHeight(), traceData.getScreenWidth(), traceData.getScreenHeight(), traceData.getEventValue(),
                            traceData.getActionLabel(), traceData.getProcessLabel(), traceData.getCourseId(), traceData.getDetailedActionLabel(), traceData.getModelType()
                    );
                    excelBreaker.getAllData().add(data);
                    // 2. 每次完成一次add data就increase
                    excelBreaker.increaseCount(1);
                    excelBreaker.tryUpdateCache(iGlobalCache);
                    // 如果counter超过了cutRow，保存进zip
                    excelBreaker.tryUpdateParamsAndSaveToExcel();
                }
            });
        });
        excelBreaker.saveExcelToFile();
    }

    private Long getCountByUserIdsAndCourseIds(List<Long> userIdList, List<String> courseIdList) {
        AtomicLong totalCount = new AtomicLong();
        userIdList.forEach(userId -> {
            courseIdList.forEach(courseId -> {
                QueryWrapper<TraceData> wrapper = new QueryWrapper<>();
                wrapper.eq("user_id", userId).eq("course_id", courseId).orderByDesc("save_time").last("LIMIT 1");
                totalCount.addAndGet(super.count(wrapper));
            });
        });
        return totalCount.get();
    }

    private static List<List<String>> initialiseAllHead() {
        List<String> head1 = new ArrayList<>();
        head1.add("#");
        head1.add("user_id");
        head1.add("username");
        head1.add("save_time");
        head1.add("url");
        head1.add("firstname");
        head1.add("lastname");

        head1.add("source");
        head1.add("page_event");
        head1.add("target_object");
        head1.add("instant_event");
        head1.add("sub_action_label");

        head1.add("screenX");
        head1.add("screenY");
        head1.add("clientX");
        head1.add("clientY");

        head1.add("window_inner_width");
        head1.add("window_inner_height");
        head1.add("screen_width");
        head1.add("screen_height");

        head1.add("event_value");

        head1.add("action_label");
        head1.add("process_label");
        head1.add("course_id");
        head1.add("detailed_action_label");
        head1.add("model_type");

        //封装头部
        List<List<String>> allHead = new ArrayList<>();
        allHead.add(head1);
        return allHead;
    }

    private void loopCourse(List<String> courseIdList, Long userId, List<List<Object>> allData) {
        courseIdList.forEach(courseId -> {
            List<TraceData> traceDataList = findAllByUserIdAndCourseIdOrderByTimeAsc(userId, courseId);
            log.info("export excel traceDataList size:" + traceDataList.size() + "----userId:" + userId + "----courseId:" + courseId);
            //封装数据体
            for (int k = 0; k < traceDataList.size(); k++) {
                TraceData traceData = traceDataList.get(k);
                String saveTime = MyUtils.convertTimestampToFormat(traceData.getSaveTime());

                List<Object> data = Lists.newArrayList((k + 1),
                        traceData.getUserId(), traceData.getUsername(), saveTime, traceData.getUrl(), traceData.getFirstname(),
                        traceData.getLastname(), traceData.getSource(), traceData.getPageEvent(), traceData.getTargetObject(), traceData.getInstantEvent(),
                        traceData.getSubActionLabel(), traceData.getScreenX(), traceData.getScreenY(), traceData.getClientX(), traceData.getClientY(),
                        traceData.getWindowInnerWidth(), traceData.getWindowInnerHeight(), traceData.getScreenWidth(), traceData.getScreenHeight(), traceData.getEventValue(),
                        traceData.getActionLabel(), traceData.getProcessLabel(), traceData.getCourseId(), traceData.getDetailedActionLabel(), traceData.getModelType()
                );
                allData.add(data);
            }
        });
    }

    @Override
    public CountAllTraceLogVO countByUserIdAndCourseIdForAllTraceLogs(Long userId, Long courseId) {
        return getBaseMapper().countByUserIdAndCourseIdForAllTraceLogs(userId, courseId);
    }

    @Override
    public List<TraceData> findByUserIdAndCourseIdWithoutMouseData(Long userId, String courseId) {
        return getBaseMapper().findByUserIdAndCourseIdWithoutMouseData(userId, courseId);
    }

    @Override
    public void updateProcessLabelToNullByUserIdCourseId(Long userId, String courseId) {
        getBaseMapper().updateProcessLabelToNullByUserIdCourseId(userId, courseId);
    }

    @Override
    public void deleteReadingInstructionMoseMoveByUserIdCourseId(Long userId, String courseId) {
        getBaseMapper().deleteReadingInstructionMoseMoveByUserIdCourseId(userId, courseId);
    }

    @Override
    public List<TraceData> findAllOpenCloseTraceDataByUserIdCourseId(Long userId, String courseId) {
        return getBaseMapper().findAllOpenCloseTraceDataByUserIdCourseId(userId, courseId);
    }

    @Override
    public void updateCloseSearchAnnotationByUserIdCourseId(Long userId, String courseId) {
        getBaseMapper().updateCloseSearchAnnotationByUserIdCourseId(userId, courseId);
    }

    @Override
    public List<TraceDataCleanTimelineVO> getTimelineSubActionData(String courseId, long timeLimit, String usernameFilter) {
        QueryWrapper<TraceData> queryWrapper = new QueryWrapper<>();

        log.info("Fetching timeline subaction data with courseId: {}", courseId);
        queryWrapper.eq("course_id", courseId).like("username", usernameFilter).orderByAsc("user_id", "save_time");
//                .in("RIGHT(username, 2)", groups);

        List<TraceData> data = super.list(queryWrapper); // 假设super.list() 返回TraceDataClean的列表

        Map<String, List<TraceData>> groupedData = new HashMap<>();
        // 按用户名分组数据
        for (TraceData item : data) {
            groupedData.computeIfAbsent(item.getUsername(), k -> new ArrayList<>()).add(item);
        }
        return getTraceDataActionVOs(groupedData, timeLimit);
//        List<TraceDataCleanTimelineVO> result = new ArrayList<>();
//        // 对每个用户名进行相同的合并逻辑
//        for (Map.Entry<String, List<TraceData>> entry : groupedData.entrySet()) {
//            List<TraceData> userData = entry.getValue();
//            TraceData firstItem = userData.get(0);
//            String currentEvent = firstItem.getActionLabel();
//            // 这里原来是TraceDataClean.getTime(). 因为原来的TraceData没有这个字段，所以成getSaveTime,
//            // 在前端会根据处理save_time来生成time
//            assert Objects.equals(firstItem.getSubActionLabel(), "START_TASK");
//            float startTaskTime = Float.parseFloat(firstItem.getSaveTime());
//            String startTime = firstItem.getSaveTime();
//            String currentSubAction = firstItem.getSubActionLabel();
//            boolean breakMark = false;
//
//            for (int i = 1; i < userData.size(); i++) {
//                TraceData currentItem = userData.get(i);
//                TraceData previousItem = userData.get(i - 1);
//
//                if (currentItem == null) {
//                    log.warn("currentItem is null, i: " + i);
//                    log.warn("userData: ");
//                    log.warn(userData.toString());
//                    continue;
//                }
//                if (currentItem.getSubActionLabel() == null) {
//                    log.warn("subaction label is null, i: " + i);
//                    log.warn("userData: ");
//                    log.warn(userData.toString());
//                    currentItem.setSubActionLabel("NOT RECORDED");
//                }
//
//                if (!currentItem.getSubActionLabel().equals(currentSubAction) && !currentItem.getSubActionLabel().isEmpty()) {
//                    String endTime = currentItem.getSaveTime();
//                    if ((Float.parseFloat(currentItem.getSaveTime()) > startTaskTime + timeLimit) && timeLimit != -60000) {
//                        log.warn("stopping iteration for " + currentItem.getUsername());
//                        log.warn("end time is " + startTime + ". Time limit is: " + timeLimit);
//                        endTime = String.valueOf(startTaskTime + timeLimit);
//                        breakMark = true;
//                    }
////                    if ("12".equals(currentItem.getCourseId()) && "10".equals(previousItem.getCourseId())) {
////                        result.add(createVO(currentEvent, startTime, String.valueOf(Long.parseLong(startTime) + 10), currentSubAction, entry.getKey(), previousItem.getCourseId()));
////                    } else {
//                    result.add(createVO(currentEvent, startTime, endTime, currentSubAction, entry.getKey(), previousItem.getCourseId()));
////                    }
//                    if (breakMark)
//                        break;
//                    currentEvent = currentItem.getActionLabel();
//                    startTime = currentItem.getSaveTime();
//                    currentSubAction = currentItem.getSubActionLabel();
//                }
//            }
//
//            // 添加最后一个事件
//            TraceData lastItem = userData.get(userData.size() - 1);
//            result.add(createVO(currentEvent, startTime, String.valueOf(Long.parseLong(startTime) + 10), currentSubAction, entry.getKey(), lastItem.getCourseId()));
//        }


    }

    @Override
    public List<TraceDataCleanTimelineVO> getTimelineActionData(String usernamePattern, String courseId) {
        QueryWrapper<TraceData> queryWrapper = new QueryWrapper<>();

        log.info("Fetching timeline data with username pattern: {} and courseId: {}", usernamePattern, courseId);
        queryWrapper.eq("course_id", courseId).like("username", usernamePattern).orderByAsc("user_id", "save_time");
//                .in("RIGHT(username, 2)", groups);
        // todo 前端加上username的input，然后用like 进行filter，不用group了
        List<TraceData> data = super.list(queryWrapper); // 假设super.list() 返回TraceDataClean的列表
        return processTimeLineActionData(data, -1);
    }

    @Override
    public List<TraceDataCleanTimelineVO> getTimelineActionData(List<String> groups, String courseId) {
        QueryWrapper<TraceData> queryWrapper = new QueryWrapper<>();

        log.info("Fetching timeline data with group: {} and courseId: {}", groups, courseId);
        queryWrapper.eq("course_id", courseId).orderByAsc("user_id", "save_time");
//                .in("RIGHT(username, 2)", groups);
        // todo 前端加上username的input，然后用like 进行filter，不用group了
        List<TraceData> data = super.list(queryWrapper); // 假设super.list() 返回TraceDataClean的列表
        return processTimeLineActionData(data, -1);
    }
    @Override
    public List<TraceDataCleanTimelineVO> getTimelineActionData(String courseId, long timeLimit, String usernameFilter) {
        QueryWrapper<TraceData> queryWrapper = new QueryWrapper<>();

        log.info("Fetching timeline data with group: {} and courseId: {}", timeLimit, courseId);
        queryWrapper.eq("course_id", courseId).like("username", usernameFilter).orderByAsc("user_id", "save_time");
//                .in("RIGHT(username, 2)", groups);
        List<TraceData> data = super.list(queryWrapper); // 假设super.list() 返回TraceDataClean的列表
        return processTimeLineActionData(data, timeLimit);
    }

    private List<TraceDataCleanTimelineVO> processTimeLineActionData(List<TraceData> data, long timeLimit) {
        Map<String, List<TraceData>> groupedData = new HashMap<>();
        // 按用户名分组数据
        for (TraceData item : data) {
            groupedData.computeIfAbsent(item.getUsername(), k -> new ArrayList<>()).add(item);
        }

        return getTraceDataActionVOs(groupedData, timeLimit);
    }

    private List<TraceDataCleanTimelineVO> getTraceDataActionVOs( Map<String, List<TraceData>> groupedData, long timeLimit) {
        List<TraceDataCleanTimelineVO> result = new ArrayList<>();
        // 对每个用户名进行相同的合并逻辑
        for (Map.Entry<String, List<TraceData>> entry : groupedData.entrySet()) {
            List<TraceData> userData = entry.getValue();
            TraceData firstItem = userData.get(0);
            String currentEvent = firstItem.getActionLabel();
//            String startTime = firstItem.getTime();
            // 这里原来是TraceDataClean.getTime(). 因为原来的TraceData没有这个字段，所以成getSaveTime,
            // 在前端会根据处理save_time来生成time
            if (firstItem.getSubActionLabel().equals("START_TASK")){
                if (showDebugging)
                    log.warn("The first sub action is not START_TASK. The first item of {} is {}", firstItem.getUsername(), firstItem.getSubActionLabel());
            }
            long startTaskTime = Long.parseLong(firstItem.getSaveTime());
            String startTime = firstItem.getSaveTime();
            String currentSubAction = firstItem.getSubActionLabel();
            if(Long.toString(startTaskTime).contains("E"))
                if (showDebugging)
                    log.warn("startTaskTime contains E");
            boolean breakMark = false;
            for (int i = 1; i < userData.size(); i++) {
                if(Long.parseLong(startTime) > Long.parseLong(userData.get(i).getSaveTime()))
                    log.info("awd");
                if(startTime.equals("1699886034242"))
                    log.info("awd");
                TraceData currentItem = userData.get(i);
                TraceData previousItem = userData.get(i - 1);
                if (currentItem == null) {
//                    log.warn(userData.toString());
                    if (showDebugging) {
                        log.warn("currentItem is null, i: " + i);
                        log.warn("userData: ");
                    }
                    continue;
                }
                if (currentItem.getActionLabel() == null) {
                    if (showDebugging) {

                        log.warn("action label is null, i: " + i);
                        log.warn("userData: ");
//                    log.warn(userData.toString());
                    }
                    currentItem.setActionLabel("NOT RECORDED");
                }
                if (currentItem.getSubActionLabel() == null) {
                    if (showDebugging) {

                        log.warn("subaction label is null, i: " + i);
                        log.warn("userData: ");
//                    log.warn(userData.toString());
                    }
                    currentItem.setSubActionLabel("NOT RECORDED");
                }

                if (!currentItem.getActionLabel().equals(currentEvent) && !currentItem.getActionLabel().isEmpty()) {
                    // 判断是否从一个课程进入到另一个课程，按现在的计算方法，这个if内的语句应该不会生效，
                    String endTime = currentItem.getSaveTime();
                    if(endTime.contains("E"))
                        if (showDebugging)
                            log.warn("endTime contains E");
                    if ((Long.parseLong(endTime) > (startTaskTime + timeLimit)) && timeLimit != -60000) {
                        // 如果某个数据的结束时间超过了阈值，把它的阈值设为结束时间的上限，并且在记录完这个数据后break
                        if (Long.parseLong(startTime) > (startTaskTime + timeLimit)) {
                            // 如果start time就已经超过了时间的阈值，直接break，不再把它加入进数据
                            break;
                        }
//                        log.warn("stopping iteration for " + currentItem.getUsername());
//                        log.warn("end time is " + endTime + ". Time limit is: " + timeLimit / 60 / 1000);
                        endTime = Long.toString((long)(startTaskTime + timeLimit));
                        breakMark = true;
                    }
//                    if ("12".equals(currentItem.getCourseId()) && "10".equals(previousItem.getCourseId())) {
//                        result.add(createVO(currentEvent, startTime, String.valueOf(Long.parseLong(startTime) + 10), currentSubAction, entry.getKey(), previousItem.getCourseId()));
//                    } else {
                    result.add(createVO(currentEvent, startTime, endTime, currentSubAction, entry.getKey(), previousItem.getCourseId()));
//                    }
                    if (breakMark)
                        // 记录完最后一个数据在阈值范围内的数据，break
                        break;
                    currentEvent = currentItem.getActionLabel();
                    startTime = currentItem.getSaveTime();
                    currentSubAction = currentItem.getSubActionLabel();
                }
            }
            if (!breakMark) {
                TraceData lastItem = userData.get(userData.size() - 1);
                String endTime = lastItem.getSaveTime();

                if ((Long.parseLong(endTime) > (startTaskTime + timeLimit)) && timeLimit != -60000) {
                    if (Long.parseLong(startTime) > (startTaskTime + timeLimit)) {
                        // 如果start time就已经超过了时间的阈值，直接break，不再把它加入进数据
                        break;
                    }
//                    log.warn("stopping iteration for " + lastItem.getUsername());
//                    log.warn("end time is " + endTime + ". Time limit is: " + timeLimit / 60 / 1000);
                    endTime = Long.toString((long)(startTaskTime + timeLimit));
                }
                result.add(createVO(currentEvent, startTime, endTime, currentSubAction, entry.getKey(), lastItem.getCourseId()));
            }
            // 添加最后一个事件
        }

        return result;
    }

    private TraceDataCleanTimelineVO createVO(String action, String start, String end, String subAction, String username, String courseId) {
        TraceDataCleanTimelineVO vo = new TraceDataCleanTimelineVO();
                if(Long.parseLong(start) > Long.parseLong(end))
                    log.info("");

//        try {
            vo.setAction(action);
            vo.setStart(Long.parseLong(start));
            vo.setEnd(Long.parseLong(end));
            vo.setSubAction(subAction);
            vo.setUsername(username);
            // group 的值是用substring 算出来的
            vo.setGroup(username.substring(username.length() - 2));
            vo.setCourseId(courseId);
//        }catch (NumberFormatException e){
//            log.warn(e.toString());
//        }
        return vo;
    }
//    @Override
//    public void exportTraceDataToExcelByUserIdListAndCourseIdList(List<Long> userIdList, List<String> courseIdList, int cutRows, String token, String dateString) throws IOException {
//        ExcelBreaker excelBreaker = new ExcelBreaker(cutRows, "trace_data", initialiseAllHead(), token, dateString);
//        updateTypeCache(token, "trace_data", iGlobalCache);
//        if(MyConstant.checkNumberOfInstance)
//            iGlobalCache.hset(token, "num-total-rows", String.valueOf(getCountByUserIdsAndCourseIds(userIdList, courseIdList)));
//        List<TraceData> TraceDataList = findTraceDataByUserIdListCourseIdList(userIdList, courseIdList);
//        TraceDataList.forEach(traceData -> {
//            String saveTime = MyUtils.convertTimestampToFormat(traceData.getSaveTime());
//
//            List<Object> data = Lists.newArrayList((excelBreaker.getAllData().size() + 1),
//                    traceData.getUserId(), traceData.getUsername(), saveTime, traceData.getUrl(), traceData.getFirstname(),
//                    traceData.getLastname(), traceData.getSource(), traceData.getPageEvent(), traceData.getTargetObject(), traceData.getInstantEvent(),
//                    traceData.getSubActionLabel(), traceData.getScreenX(), traceData.getScreenY(), traceData.getClientX(), traceData.getClientY(),
//                    traceData.getWindowInnerWidth(), traceData.getWindowInnerHeight(), traceData.getScreenWidth(), traceData.getScreenHeight(), traceData.getEventValue(),
//                    traceData.getActionLabel(), traceData.getProcessLabel(), traceData.getCourseId(), traceData.getDetailedActionLabel(), traceData.getModelType()
//            );
//            excelBreaker.getAllData().add(data);
//            // 2. 每次完成一次add data就increase
//            excelBreaker.increaseCount(1);
//            excelBreaker.tryUpdateCache(iGlobalCache);
//            // 如果counter超过了cutRow，保存进zip
//            excelBreaker.tryUpdateParamsAndSaveToExcel();
//        });
//        excelBreaker.saveExcelToFile();

//        userIdList.forEach(userId -> {
//            loopCourse(courseIdList, userId, allData);
//        });

    //
//        userIdList.forEach(userId -> {
//            courseIdList.forEach(courseId -> {
//                List<TraceData> traceDataList = findAllByUserIdAndCourseIdOrderByTimeDesc(userId, courseId);
//                log.info("export excel traceDataList size:" + traceDataList.size() + "----userId:" + userId + "----courseId:" + courseId);
//                //封装数据体
//                for (int k = 0; k < traceDataList.size(); k++) {
//                    TraceData traceData = traceDataList.get(k);
//                    String saveTime = MyUtils.convertTimestampToFormat(traceData.getSaveTime());
//
//                    List<Object> data = Lists.newArrayList((k+1),
//                            traceData.getUserId(), traceData.getUsername(), saveTime, traceData.getUrl(), traceData.getFirstname(),
//                            traceData.getLastname(), traceData.getSource(), traceData.getPageEvent(), traceData.getTargetObject(), traceData.getInstantEvent(),
//                            traceData.getSubActionLabel(), traceData.getScreenX(), traceData.getScreenY(), traceData.getClientX(), traceData.getClientY(),
//                            traceData.getWindowInnerWidth(),traceData.getWindowInnerHeight(),traceData.getScreenWidth(),traceData.getScreenHeight(), traceData.getEventValue(),
//                            traceData.getActionLabel(), traceData.getProcessLabel(), traceData.getCourseId(), traceData.getDetailedActionLabel(), traceData.getModelType()
//                    );
//                    excelBreaker.getAllData().add(data);
//                    // 2. 每次完成一次add data就increase
//                    excelBreaker.increaseCount(1);
//                    excelBreaker.tryUpdateCache(iGlobalCache);
//                    // 如果counter超过了cutRow，保存进zip
//                    excelBreaker.tryUpdateParamsAndSaveToExcel();
//                }
//            });
//        });
//        userIdList.forEach(userId -> {
//            courseIdList.forEach(courseId -> {
//                List<TraceData> traceDataList = findAllByUserIdAndCourseIdOrderByTimeDesc(userId, courseId);
//                log.info("export excel traceDataList size:" + traceDataList.size() + "----userId:" + userId + "----courseId:" + courseId);
//                //封装数据体
//                for (int k = 0; k < traceDataList.size(); k++) {
//                    TraceData traceData = traceDataList.get(k);
//                    String saveTime = MyUtils.convertTimestampToFormat(traceData.getSaveTime());
//
//                    List<Object> data = Lists.newArrayList((k+1),
//                            traceData.getUserId(), traceData.getUsername(), saveTime, traceData.getUrl(), traceData.getFirstname(),
//                            traceData.getLastname(), traceData.getSource(), traceData.getPageEvent(), traceData.getTargetObject(), traceData.getInstantEvent(),
//                            traceData.getSubActionLabel(), traceData.getScreenX(), traceData.getScreenY(), traceData.getClientX(), traceData.getClientY(),
//                            traceData.getWindowInnerWidth(),traceData.getWindowInnerHeight(),traceData.getScreenWidth(),traceData.getScreenHeight(), traceData.getEventValue(),
//                            traceData.getActionLabel(), traceData.getProcessLabel(), traceData.getCourseId(), traceData.getDetailedActionLabel(), traceData.getModelType()
//                    );
//                    excelBreaker.getAllData().add(data);
//                    // 2. 每次完成一次add data就increase
//                    excelBreaker.increaseCount(1);
//                    excelBreaker.tryUpdateCache(iGlobalCache);
//                    // 如果counter超过了cutRow，保存进zip
//                    excelBreaker.tryUpdateParamsAndSaveToExcel();
//                }
//            });
//        });
//    }
    @Override
    public List<TraceDataCleanPersonalVO> getPersonalLevelData(String courseId, long minuteLimit, String usernameFilter) {
        List<TraceDataCleanTimelineVO> timelineData = getTimelineActionData(courseId, minuteLimit, usernameFilter);
        return processingPersonalLevelData(timelineData);
    }

    @Override
    public List<TraceDataCleanPersonalVO> getPersonalLevelData(String usernamePattern, String courseId) {
        List<TraceDataCleanTimelineVO> timelineData = getTimelineActionData(usernamePattern, courseId);
        return processingPersonalLevelData(timelineData);
    }

    private List<TraceDataCleanPersonalVO> processingPersonalLevelData(List<TraceDataCleanTimelineVO> timelineData) {
        List<TraceDataCleanPersonalVO> result = new ArrayList<>();

        for (TraceDataCleanTimelineVO item : timelineData) {
            int duration = item.getEnd().intValue() - item.getStart().intValue() + 1;

            TraceDataCleanPersonalVO existingEntry = result.stream()
                    .filter(entry -> entry.getUsername().equals(item.getUsername())
                            && entry.getCourseId().equals(item.getCourseId())
                            && entry.getAction().equals(item.getAction()))
                    .findFirst()
                    .orElse(null);

            if (existingEntry != null) {
                existingEntry.setDuration(existingEntry.getDuration().intValue() + duration);
            } else {
                TraceDataCleanPersonalVO newItem = new TraceDataCleanPersonalVO();
                newItem.setAction(item.getAction());
                newItem.setDuration(duration);
                newItem.setUsername(item.getUsername());
                newItem.setGroup(item.getGroup());
                newItem.setCourseId(item.getCourseId());
                result.add(newItem);
            }
        }
        return result;
    }

    @Override
    public List<TraceDataCleanGroupVO> getGroupLevelData(String courseId, long timeLimit, String usernameFilter) {

        List<TraceDataCleanTimelineVO> timelineData = getTimelineActionData(courseId, timeLimit, usernameFilter);

        List<TraceDataCleanGroupVO> result = new ArrayList<>();

        for (TraceDataCleanTimelineVO item : timelineData) {
            int duration = item.getEnd().intValue() - item.getStart().intValue() + 1;

            TraceDataCleanGroupVO existingEntry = result.stream()
                    .filter(entry -> entry.getGroup().equals(item.getGroup())
                            && entry.getCourseId().equals(item.getCourseId())
                            && entry.getAction().equals(item.getAction()))
                    .findFirst()
                    .orElse(null);


            if (existingEntry != null) {
                existingEntry.setDuration(existingEntry.getDuration().intValue() + duration);
            } else {
                TraceDataCleanGroupVO newItem = new TraceDataCleanGroupVO();
                newItem.setAction(item.getAction());
                newItem.setDuration(duration);
                newItem.setGroup(item.getGroup());
                newItem.setCourseId(item.getCourseId());

                result.add(newItem);
            }
        }

        return result;
    }

//    private List<TraceDataCleanGroupVO> processGroupLevelData(String courseId, long timeLimit){
//
//    }

    @Override
    public List<TraceDataCleanAllActionVO> getAllLevelAction(String courseId, long timeLimit, String usernameFilter ) {

        List<TraceDataCleanTimelineVO> timelineData = getTimelineActionData(courseId, timeLimit, usernameFilter);

        List<TraceDataCleanAllActionVO> result = new ArrayList<>();

        for (TraceDataCleanTimelineVO item : timelineData) {
            int duration = item.getEnd().intValue() - item.getStart().intValue() + 1;

            TraceDataCleanAllActionVO existingEntry = result.stream()
                    .filter(entry -> entry.getCourseId().equals(item.getCourseId())
                            && entry.getAction().equals(item.getAction()))
                    .findFirst()
                    .orElse(null);

            if (existingEntry != null) {
                existingEntry.setDuration(existingEntry.getDuration().intValue() + duration);
            } else {
                TraceDataCleanAllActionVO newItem = new TraceDataCleanAllActionVO();
                newItem.setAction(item.getAction());
                newItem.setDuration(duration);
                newItem.setCourseId(item.getCourseId());
                result.add(newItem);
            }
        }

        return result;
    }

    @Override
    public List<TraceDataCleanAllSubActionVO> getAllLevelSubAction(String courseId, long timeLimit, String usernameFilter) {
        List<TraceDataCleanTimelineVO> timelineData = getTimelineSubActionData(courseId, timeLimit, usernameFilter);

        List<TraceDataCleanAllSubActionVO> result = new ArrayList<>();

        for (TraceDataCleanTimelineVO item : timelineData) {
            int duration = item.getEnd().intValue() - item.getStart().intValue() + 1;

            TraceDataCleanAllSubActionVO existingEntry = result.stream()
                    .filter(entry -> entry.getCourseId().equals(item.getCourseId())
                            && entry.getSubAction().equals(item.getSubAction()))
                    .findFirst()
                    .orElse(null);

            if (existingEntry != null) {
                existingEntry.setDuration(existingEntry.getDuration().intValue() + duration);
            } else {
                TraceDataCleanAllSubActionVO newItem = new TraceDataCleanAllSubActionVO();
                newItem.setAction(item.getAction());
                newItem.setSubAction(item.getSubAction());
                newItem.setDuration(duration);
                newItem.setCourseId(item.getCourseId());
                result.add(newItem);
            }
        }

        return result;

    }

    public List<TraceData> findTraceDataByUserIdListCourseIdList(List<Long> userIdList, List<String> courseIdList) {

//        return getBaseMapper().findLatestVersionEssayByUserIdListCourseIdList("(" + userIdList.stream().map(String::valueOf).collect(Collectors.joining(",")) + ")", "(" + String.join(",", courseIdList) + ")");
        return getBaseMapper().findTraceDataByUserIdListCourseIdList(userIdList, courseIdList.stream().map(Long::valueOf).collect(Collectors.toList()));
    }

    @Override
    public List<TraceData> findAllTryOutToolsTraceByUserIdCourseId(Long userId, String courseId) {
        QueryWrapper<TraceData> queryWrapper = new QueryWrapper<>();

        queryWrapper.eq("user_id", userId).eq("course_id", courseId).eq("sub_action_label", "TRY_OUT_TOOLS");
        return super.list(queryWrapper);
    }
}
