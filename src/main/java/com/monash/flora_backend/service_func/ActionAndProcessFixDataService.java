package com.monash.flora_backend.service_func;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

/**
 * ClassName: ActionAndProcessFixDataService
 * Description:
 *
 * @author Xinyu Li
 * @since 11/17/2023 11:37 AM
 */
@Service
@Slf4j
@RequiredArgsConstructor
public class ActionAndProcessFixDataService {
    /*public final ITraceDataService iTraceDataService;

    // step 1.1 修复 task start/end
    private void updateTaskStartEnd(Long userId, String courseId) {
        QueryWrapper<TraceData> queryWrapperForTaskStartEnd = new QueryWrapper<>();
        queryWrapperForTaskStartEnd.eq("user_id", userId).in("instant_event", "ESSAY_TASK_START", "ESSAY_TASK_END");
        if (!StrUtil.isEmpty(courseId) && !courseId.equals("0")) {queryWrapperForTaskStartEnd.eq("course_id", courseId);}
        queryWrapperForTaskStartEnd.orderByAsc("save_time");

        List<TraceData> traceDataForTaskStartEnd = iTraceDataService.list(queryWrapperForTaskStartEnd);

        traceDataForTaskStartEnd.forEach(traceData -> {
            if ("ESSAY_TASK_START".equals(traceData.getInstantEvent())) {
                traceData.setSubActionLabel("START_TASK");
                traceData.setActionLabel("START");
            }
            if ("ESSAY_TASK_END".equals(traceData.getInstantEvent())) {
                traceData.setSubActionLabel("END_TASK");
                traceData.setActionLabel("END");
            }
        });
        iTraceDataService.myUpdateBatch(traceDataForTaskStartEnd);
    }

    // step 1.2 北京lab数据 可以删除掉off task
    private void deleteOffTaskAndEssayBlurAndEmptyBodyClickAndSaveEssayWhenLeavePage(Long userId, String courseId) {
        QueryWrapper<TraceData> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("user_id", userId).eq("source", "OFF_TASK").or().in("instant_event", "BLUR", "SAVE_WHEN_LEAVE_PAGE").or().eq("instant_event", "BODY_CLICK").eq("screen_x", "0").eq("screen_y", "0");
        if (!StrUtil.isEmpty(courseId) && !courseId.equals("0")) {queryWrapper.eq("course_id", courseId);}
        queryWrapper.orderByAsc("save_time");

        List<TraceData> traceDataList = iTraceDataService.list(queryWrapper);
        if (!traceDataList.isEmpty()) {
            iTraceDataService.removeByIds(traceDataList.stream().map(TraceData::getId).collect(Collectors.toList()));
        }
    }

    private TraceData createLeavePage(Long userId, String courseId, TraceData changePageTraceData, List<TraceData> baseTraceDataList) {
//        QueryWrapper<TraceData> eventOnSamePageQueryWrapper = new QueryWrapper<>();
//        eventOnSamePageQueryWrapper.eq("user_id", userId).eq("course_id", courseId).eq("url", changePageTraceData.getUrl()).orderByAsc("save_time");
//
//        List<TraceData> allEventOnSamePagetraceDataList = iTraceDataService.list(eventOnSamePageQueryWrapper);

//        if (allEventOnSamePagetraceDataList.isEmpty()) {
//            throw new RuntimeException("allEventOnSamePagetraceDataList is emtpy for user " + userId + "  course:" + courseId + " url:" + changePageTraceData.getUrl());
//        }
        List<TraceData> collect = baseTraceDataList.stream().filter(b -> StrUtil.equals(b.getUrl(), changePageTraceData.getUrl())).collect(Collectors.toList());

        TraceData traceData = new TraceData();
        traceData.setDetailedActionLabel(null);

        traceData.setModelType(null);
        traceData.setCourseId(changePageTraceData.getCourseId());
        traceData.setProcessLabel(null);

        traceData.setUserId(changePageTraceData.getUserId());
        traceData.setSaveTime(String.valueOf(Long.parseLong(changePageTraceData.getSaveTime()) + 1));
        traceData.setUsername(changePageTraceData.getUsername());
        traceData.setUrl(changePageTraceData.getUrl());
        traceData.setFirstname(changePageTraceData.getFirstname());
        traceData.setLastname(changePageTraceData.getLastname());
        traceData.setSource("PAGE");
        traceData.setPageEvent("NO_PAGE_EVENT");
        traceData.setTargetObject("NO_TARGET_OBJECT");
        traceData.setInstantEvent("LEAVE_PAGE");
        MyMoodleConfigConstant.IRRELEVANT_READING_PAGE_ID_SET.addAll(Set.of("10", "12", "19", "21", "24", "38", "40", "47", "49", "52", "64", "66", "73", "75", "78"));
        MyMoodleConfigConstant.TASK_REQUIREMENT_READING_PAGE_ID_SET.addAll(Set.of("7", "35", "61"));
        MyMoodleConfigConstant.RUBRIC_READING_PAGE_ID_SET.addAll(Set.of("8", "36", "62"));
        long pageStayLength = Long.parseLong(changePageTraceData.getSaveTime()) + 1 - Long.parseLong(collect.get(0).getSaveTime());
        String[] temp = iTraceDataService.checkUrlRelevant(changePageTraceData.getUrl()).split(":::");
        if (pageStayLength > 3000) {
            if ("READING".equals(temp[0])) {
                traceData.setSubActionLabel(temp[1] + "_READING");
                traceData.setActionLabel("READING");
            } else {
                traceData.setSubActionLabel(temp[1]);
                traceData.setActionLabel("INSTRUCTION");
            }

        } else {
            traceData.setSubActionLabel("PAGE_NAVIGATION");
            traceData.setActionLabel("NAVIGATION");
        }


        traceData.setScreenX("NO_SCREEN_X");
        traceData.setScreenY("NO_SCREEN_Y");
        traceData.setClientX("NO_CLIENT_X");
        traceData.setClientY("NO_CLIENT_Y");
        traceData.setWindowInnerWidth(changePageTraceData.getWindowInnerWidth());
        traceData.setWindowInnerHeight(changePageTraceData.getWindowInnerHeight());
        traceData.setScreenWidth(changePageTraceData.getScreenWidth());
        traceData.setScreenHeight(changePageTraceData.getScreenHeight());
        traceData.setEventValue("PAGE_STAY_TIME_LENGTH:::" + pageStayLength);
//        iTraceDataService.save(traceData);
        return traceData;
    }
    private void fixLeavePageMissingIssue(Long userId, String courseId) {
        QueryWrapper<TraceData> changePageQueryWrapper = new QueryWrapper<>();
        changePageQueryWrapper.eq("user_id", userId).in("source", "PAGE", "EXTRA")
                .in("instant_event", "CHANGE_PAGE_CLICK", "LEAVE_PAGE", "MOUSE_MOVE", "MOUSE_CLICK", "NO_INSTANT_EVENT", "SELECT_TEXT", "BODY_CLICK");
        changePageQueryWrapper.eq("course_id", courseId).orderByAsc("save_time");

        List<TraceData> baseTraceDataList = iTraceDataService.list(changePageQueryWrapper);
        List<TraceData> changePageTraceDataList = baseTraceDataList.stream().filter(c-> c.getInstantEvent().equals("CHANGE_PAGE_CLICK")).collect(Collectors.toList());
        List<TraceData> leavePageTraceDataList = baseTraceDataList.stream().filter(l-> l.getInstantEvent().equals("LEAVE_PAGE")).collect(Collectors.toList());

        List<TraceData> needSaveTraceDataList = new ArrayList<>();
        // 成对出现，时间 误差在5 毫秒以内
        for (TraceData changePageTraceData : changePageTraceDataList) {
//            QueryWrapper<TraceData> leavePageQueryWrapper = new QueryWrapper<>();
//            changePageQueryWrapper.eq("user_id", userId).eq("source", "PAGE").eq("instant_event", "LEAVE_PAGE");
//            changePageQueryWrapper.eq("course_id", courseId).eq("url", changePageTraceData.getUrl());
////                    .le("save_time", Long.parseLong(changePageTraceData.getSaveTime()) + 5);
//
//            List<TraceData> leavePageTraceDataList = iTraceDataService.list(leavePageQueryWrapper);

            for (TraceData leavePageTraceData: leavePageTraceDataList) {
                if (leavePageTraceData.getInstantEvent().equals("LEAVE_PAGE") && leavePageTraceData.getUrl().equals(changePageTraceData.getUrl())
                        && Long.parseLong(leavePageTraceData.getSaveTime()) < Long.parseLong(changePageTraceData.getSaveTime()) + 5) {

                } else {
                    needSaveTraceDataList.add(createLeavePage(userId, courseId, changePageTraceData, baseTraceDataList));
                }
            }
            if (leavePageTraceDataList.isEmpty()) {
                needSaveTraceDataList.add(createLeavePage(userId, courseId, changePageTraceData, baseTraceDataList));
            }

//            if (leavePageTraceDataList.isEmpty()) {
//                createLeavePage(userId, courseId, changePageTraceData);
//            } else {
            //如果不是空，就直接跳过
//                List<TraceData> collect = leavePageTraceDataList.stream().filter(l -> Long.parseLong(l.getSaveTime()) < Long.parseLong(changePageTraceData.getSaveTime()) + 5).collect(Collectors.toList());
//                if (collect.isEmpty()) {
//                    createLeavePage(userId, courseId, changePageTraceData);
//                }
//            }
        }
        if (!needSaveTraceDataList.isEmpty()) {
            iTraceDataService.saveBatch(needSaveTraceDataList);
        }
    }

    private void updateAnnotationTriggerByCreate(Long userId, String courseId) {
        QueryWrapper<TraceData> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("user_id", userId).eq("source", "ANNOTATION").eq("instant_event", "EDIT");
        if (!StrUtil.isEmpty(courseId) && !courseId.equals("0")) {queryWrapper.eq("course_id", courseId);}
        queryWrapper.orderByAsc("save_time");
        List<TraceData> traceDataList = iTraceDataService.list(queryWrapper);
        List<TraceData> temp = new ArrayList<>();
        traceDataList.forEach(traceData -> {
            if ("0".equals(traceData.getScreenX()) && "0".equals(traceData.getScreenY()) && "0".equals(traceData.getClientX())) {
                traceData.setSubActionLabel("CREATE_NOTE");
                traceData.setInstantEvent("CREATE_NOTE");
                temp.add(traceData);
            }
        });
        iTraceDataService.myUpdateBatch(temp);
    }
    private void updateEssayCloseEventError(Long userId, String courseId) {
        QueryWrapper<TraceData> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("user_id", userId).in("source", "ESSAY", "PAGE").in("instant_event", "OPEN", "CLOSE", "LEAVE_PAGE");
        if (!StrUtil.isEmpty(courseId) && !courseId.equals("0")) {queryWrapper.eq("course_id", courseId);}
        List<TraceData> traceDataList = iTraceDataService.list(queryWrapper);
        List<TraceData> needUpdateList = new ArrayList<>();
        boolean openStatus = false;

        for (TraceData traceData : traceDataList) {
            if (traceData.getInstantEvent().equals("OPEN")) {
                openStatus = true;
            } else if (traceData.getInstantEvent().equals("CLOSE") || traceData.getInstantEvent().equals("LEAVE_PAGE")) {
                if (!openStatus && traceData.getSource().equals("ESSAY")) { // 如果 已经是关闭的，但是又遇到的关闭事件，则将当前事件更新为OPEN
                    traceData.setInstantEvent("OPEN");
                    traceData.setSubActionLabel("OPEN_ESSAY");
                    traceData.setActionLabel("ESSAY");
                    needUpdateList.add(traceData);
                    openStatus = true;
                } else {
                    openStatus = false;
                }
            }


        }

        iTraceDataService.myUpdateBatch(needUpdateList);
    }

    // step 1.3 修复annotation 中Close 事件错误
    private void updateAnnotationCloseEventError(Long userId, String courseId) {
        QueryWrapper<TraceData> queryWrapperForAnnotationCloseEventError = new QueryWrapper<>();
        queryWrapperForAnnotationCloseEventError.eq("user_id", userId).eq("source", "ANNOTATION").in("instant_event", "OPEN", "CLOSE", "CREATE_NOTE");
        if (!StrUtil.isEmpty(courseId) && !courseId.equals("0")) {queryWrapperForAnnotationCloseEventError.eq("course_id", courseId);}
        queryWrapperForAnnotationCloseEventError.orderByAsc("save_time");

        List<TraceData> traceDataForAnnotationCloseEventError = iTraceDataService.list(queryWrapperForAnnotationCloseEventError);
        for (int i = 0; i < traceDataForAnnotationCloseEventError.size(); i++) {
            TraceData traceData = traceDataForAnnotationCloseEventError.get(i);
            if (StrUtil.isEmpty(traceData.getScreenX()) && !traceData.getPageEvent().startsWith("AUTO")) {

                if (traceData.getInstantEvent().equals("OPEN")) {
                    traceData.setPageEvent("AUTO_CLOSE");
                    traceData.setTargetObject("PAGE_CONTENT_CLICK");
                    traceData.setInstantEvent("CLOSE");
                } else if (traceData.getInstantEvent().equals("CLOSE")) {
                    traceData.setPageEvent("AUTO_OPEN");
                    if (i >=1 && traceDataForAnnotationCloseEventError.get(i-1).getInstantEvent().equals("CREATE_NOTE")) {
                        traceData.setTargetObject("CREATE_NOTE_BTN");
                    } else {
                        traceData.setTargetObject("CLICK_HIGHLIGHT");
                    }
                    traceData.setInstantEvent("OPEN");
                }
            }
        }

        iTraceDataService.myUpdateBatch(traceDataForAnnotationCloseEventError);

    }

    private void deleteTimerCloseEvent(Long userId, String courseId) {
        QueryWrapper<TraceData> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("user_id", userId).eq("source", "TIMER").eq("instant_event", "CLOSE");
        if (!StrUtil.isEmpty(courseId) && !courseId.equals("0")) {queryWrapper.eq("course_id", courseId);}
        queryWrapper.orderByAsc("save_time");

        List<TraceData> traceDataList = iTraceDataService.list(queryWrapper);
        if (!traceDataList.isEmpty()) {
            iTraceDataService.removeByIds(traceDataList.stream().map(TraceData::getId).collect(Collectors.toList()));
        }
    }

    private void updatePlannerTargetObject(Long userId, String courseId) {
        QueryWrapper<TraceData> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("user_id", userId).eq("source", "PLANNER").eq("target_object", "PLANNER_CHECKBOX");
        if (!StrUtil.isEmpty(courseId) && !courseId.equals("0")) {queryWrapper.eq("course_id", courseId);}
        queryWrapper.orderByAsc("save_time");

        List<TraceData> traceDataList = iTraceDataService.list(queryWrapper);
        traceDataList.forEach(traceData -> traceData.setTargetObject("SAVE_PLAN_BTN"));

        iTraceDataService.myUpdateBatch(traceDataList);

    }

    private void updatePlanInputToCreate(Long userId, String courseId) {
        QueryWrapper<TraceData> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("user_id", userId).eq("source", "PLANNER"); //.in("target_object", "CREATE_PLAN_INPUT", "EDIT_PLAN_BTN", "ADD_MORE_CUSTOM_BTN", "DELETE_MORE_CUSTOM_BTN", "LEARNING_STRATEGY_SELECT", "PLANNER_CHECKBOX", "SAVE_PLAN_BTN", "CANCEL_PLAN_BTN")
        if (!StrUtil.isEmpty(courseId) && !courseId.equals("0")) {queryWrapper.eq("course_id", courseId);}
        queryWrapper.orderByAsc("save_time");

        List<TraceData> traceDataList = iTraceDataService.list(queryWrapper);
        String tempTargetObject = "";  //PLAN_TIME_INPUT                      DELETE_MORE_CUSTOM_BTN                                                   ADD_MORE_CUSTOM_BTN                                        CANCEL_PLAN_BTN
        String tempInstantEvent = "";           //EDIT_TIME_INPUT   CREATE_TIME_INPUT         EDIT_DELETE_CUSTOMISED_ITEM   CREATE_DELETE_CUSTOMISED_ITEM             EDIT_ADD_CUSTOMISED_ITEM CREATE_ADD_CUSTOMISED_ITEM         CANCEL_EDIT  CANCEL_CREATE
        String editOrCreate = "CREATE";
        for (int i = 0; i < traceDataList.size(); i++) {
            TraceData traceData = traceDataList.get(i);

            if (traceData.getTargetObject().equals("EDIT_PLAN_BTN")) {
                editOrCreate = "EDIT";
            } else if (Set.of("PLANNER_CHECKBOX", "SAVE_PLAN_BTN").contains(traceData.getTargetObject())) {
                editOrCreate = "CREATE";
            } else if (traceData.getTargetObject().equals("CANCEL_PLAN_BTN")) {
                editOrCreate = "CREATE";
            } else if (traceData.getTargetObject().equals("CREATE_PLAN_INPUT")) {
                traceData.setTargetObject("PLAN_TIME_INPUT");
                traceData.setInstantEvent(editOrCreate + "_TIME_INPUT");
            } else if (traceData.getTargetObject().equals("DELETE_MORE_CUSTOM_BTN")) {
                traceData.setInstantEvent(editOrCreate + "_DELETE_CUSTOMISED_ITEM");
            } else if (traceData.getTargetObject().equals("ADD_MORE_CUSTOM_BTN")) {
                traceData.setInstantEvent(editOrCreate + "_ADD_CUSTOMISED_ITEM");
            }
        }
        iTraceDataService.myUpdateBatch(traceDataList);
    }

    private void updateLeavePage(Long userId, String courseId) {
        QueryWrapper<TraceData> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("user_id", userId).eq("source", "PAGE").eq("instant_event", "LEAVE_PAGE");
        if (!StrUtil.isEmpty(courseId) && !courseId.equals("0")) {queryWrapper.eq("course_id", courseId);}
        queryWrapper.orderByAsc("save_time");
        List<TraceData> traceDataList = iTraceDataService.list(queryWrapper);

        // 35 36    61 62 是task requirement 和 rubric
        traceDataList.forEach(traceData -> {
            if (Set.of("INSTRUCTION_READING", "INSTRUCTION_REREADING", "TASK_REQUIREMENT", "RUBRIC").contains(traceData.getSubActionLabel())) {
                if (traceData.getUrl().endsWith("35") || traceData.getUrl().endsWith("61")) {
                    traceData.setSubActionLabel("TASK_REQUIREMENT");
                    traceData.setActionLabel("INSTRUCTION");
                } else if (traceData.getUrl().endsWith("36") || traceData.getUrl().endsWith("62")){
                    traceData.setSubActionLabel("RUBRIC");
                    traceData.setActionLabel("INSTRUCTION");
                }
            } else if (traceData.getSubActionLabel().equals("PAGE_NAVIGATION")){
                traceData.setActionLabel("NAVIGATION");
            } else if (traceData.getSubActionLabel().endsWith("READING")) { // (IR)RELEVANT_(RE)READING
                traceData.setActionLabel("READING");
            }
        });
        iTraceDataService.myUpdateBatch(traceDataList);
    }

    private void updateMouseMoveWheelClickSelectForTools(Long userId, String courseId) {

        //删除无用的body click 事件
        QueryWrapper<TraceData> deleteBodyClickQueryWrapper = new QueryWrapper<>();
        deleteBodyClickQueryWrapper.eq("instant_event", "BODY_CLICK").isNull("screen_x");
        boolean remove = iTraceDataService.remove(deleteBodyClickQueryWrapper);
        log.info("remove result: {} userid:{} courseid:{}", remove, userId, courseId);


        QueryWrapper<TraceData> queryWrapper = new QueryWrapper<>();
        queryWrapper.or().eq("user_id", userId);
        if (!StrUtil.isEmpty(courseId) && !courseId.equals("0")) {queryWrapper.eq("course_id", courseId);}
        queryWrapper.orderByAsc("save_time");
        List<TraceData> traceDataList = iTraceDataService.list(queryWrapper);
        List<TraceData> collect = traceDataList.stream()
                .filter(traceData ->
//                (traceData.getSource().equals("EXTRA")
                        (Set.of("BODY", "NOT_USE").contains(traceData.getSubActionLabel())
                                && !traceData.getSubActionLabel().equals("TABLE_OF_CONTENT")

                                || Set.of("OPEN", "CLOSE", "LEAVE_PAGE").contains(traceData.getInstantEvent())
                                || Set.of("PLANNER_CHECKBOX", "SAVE_PLAN_BTN", "CANCEL_PLAN_BTN", "EDIT_PLAN_BTN",
                                "SAVE_NOTES_BTN", "CANCEL_NOTES_BTN", "EDIT_NOTE_BTN").contains(traceData.getTargetObject())))
                .collect(Collectors.toList());




        boolean startWriteEssay = false; // WRITE_ESSAY
        boolean startAnnotation = false;   // READ_ANNOTATION

        boolean startDictionary = false; // DICTIONARY
        boolean startReadPlanner = false; // READ_PLANNER
        boolean startSearchAnnotation = false; // SEARCH_ANNOTATION
        boolean startChatTeacher = false; // READ_FEEDBACK_CHATTEACHER
        boolean startChatgpt = false;  // READ_FEEDBACK_GPT
        boolean startChecklist = false; // READ_CHECKLIST

        boolean plannerEditClicked = false;
        boolean annotationEditClicked = false;

        // target object 是 P#NO_ID NAV#NO_ID DIV#page DIV#NO_ID SPAN#docs 全部label成 leave page 一样

        // 获取每个工具的宽和高 旧设计中是以下数据
        // dictionary               width: 605px height: 60vh
        // planner                  width: 605px height: 90%
        // essay                    width: 1150px height: 60vh            其他工具打开时，margin right 31%
        // search annotation        width: 605px height: 90%
        // annotation               width: 500px height: 100%
        // chatteacher              width: 605px height: 60vh
        // chatgpt                  width: 605px height: 60vh
        // checklist                width: 605px height: 60vh
        //startDictionary = startReadPlanner =  startSearchAnnotation = startChatTeacher = startChatgpt = startChecklist = false;
//        NO_INSTANT_EVENT
//        SELECT_TEXT
//        BODY_CLICK
//        CLOSE
//        OPEN
//        LEAVE_PAGE
        List<TraceData> traceDataForTools = new ArrayList<>();
        for (TraceData traceData : collect) {
            if (traceData.getSource().equals("DICTIONARY") && traceData.getInstantEvent().equals("OPEN")) {
                startDictionary = true;
                startReadPlanner = startSearchAnnotation = startChatTeacher = startChatgpt = startChecklist = false;
                continue;
            } else if (traceData.getSource().equals("PLANNER") && traceData.getInstantEvent().equals("OPEN")) {
                startReadPlanner = true;
                startDictionary = startSearchAnnotation = startChatTeacher = startChatgpt = startChecklist = false;
                continue;
            } else if (traceData.getSource().equals("SEARCH_ANNOTATION") && traceData.getInstantEvent().equals("OPEN")) {
                startSearchAnnotation = true;
                startDictionary = startReadPlanner = startChatTeacher = startChatgpt = startChecklist = false;
                continue;
            } else if (traceData.getSource().equals("CHATTEACHER") && traceData.getInstantEvent().equals("OPEN")) {
                startChatTeacher = true;
                startDictionary = startReadPlanner =  startSearchAnnotation = startChatgpt = startChecklist = false;
                continue;
            } else if (traceData.getSource().equals("CHATGPT") && traceData.getInstantEvent().equals("OPEN")) {
                startChatgpt = true;
                startDictionary = startReadPlanner =  startSearchAnnotation = startChatTeacher = startChecklist = false;
                continue;
            } else if (traceData.getSource().equals("CHECKLIST") && traceData.getInstantEvent().equals("OPEN")) {
                startChecklist = true;
                startDictionary = startReadPlanner =  startSearchAnnotation = startChatTeacher = startChatgpt = false;
                continue;
            } else if (traceData.getSource().equals("DICTIONARY") && traceData.getInstantEvent().equals("CLOSE")) {
                startDictionary = false;
                continue;
            } else if (traceData.getSource().equals("PLANNER") && traceData.getInstantEvent().equals("CLOSE")) {
                startReadPlanner = false;
                continue;
            } else if (traceData.getSource().equals("SEARCH_ANNOTATION") && traceData.getInstantEvent().equals("CLOSE")) {
                startSearchAnnotation = false;
                continue;
            } else if (traceData.getSource().equals("CHATTEACHER") && traceData.getInstantEvent().equals("CLOSE")) {
                startChatTeacher = false;
                continue;
            } else if (traceData.getSource().equals("CHATGPT") && traceData.getInstantEvent().equals("CLOSE")) {
                startChatgpt = false;
                continue;
            } else if (traceData.getSource().equals("CHECKLIST") && traceData.getInstantEvent().equals("CLOSE")) {
                startChecklist = false;
                continue;
            } else if (traceData.getSource().equals("ANNOTATION")) {
                startAnnotation = traceData.getInstantEvent().equals("OPEN");
                continue;
            } else if (traceData.getSource().equals("ESSAY")) {
                startWriteEssay = traceData.getInstantEvent().equals("OPEN");
                continue;
            } else if (traceData.getSource().equals("PAGE") && traceData.getInstantEvent().equals("LEAVE_PAGE")) {
                startAnnotation = startWriteEssay = startDictionary = startReadPlanner =  startSearchAnnotation = startChatTeacher = startChatgpt = startChecklist = false;
                continue;
            } else if (traceData.getSource().equals("ANNOTATION") && traceData.getTargetObject().equals("EDIT_NOTE_BTN")) {
                annotationEditClicked = true;
                continue;
            } else if (traceData.getSource().equals("ANNOTATION") && (traceData.getTargetObject().equals("SAVE_NOTES_BTN") || traceData.getTargetObject().equals("CANCEL_NOTES_BTN"))) {
                annotationEditClicked = false;
                continue;
            } else if (traceData.getSource().equals("PLANNER") && traceData.getTargetObject().equals("EDIT_PLAN_BTN")) {
                plannerEditClicked = true;
                continue;
            } else if (Set.of("PLANNER_CHECKBOX", "SAVE_PLAN_BTN", "CANCEL_PLAN_BTN").contains(traceData.getTargetObject())) {
                plannerEditClicked = false;
                continue;
            }

//            Double.parseDouble(traceData.getClientX()) > Double.parseDouble(traceData.getWindowInnerWidth()) - 605;
//            Double.parseDouble(traceData.getClientY()) > Double.parseDouble(traceData.getWindowInnerHeight()) * 0.4; // dictionary/gpt/checklist/chatteacher/
//            Double.parseDouble(traceData.getClientY()) > Double.parseDouble(traceData.getWindowInnerHeight()) * 0.1; // planner/search
            if (startAnnotation) { // 判断edit annotation 是否点击  主动点击的EDIT 是有坐标的，否则是没有的
                if (Double.parseDouble(traceData.getClientX()) > Double.parseDouble(traceData.getWindowInnerWidth()) - 500) {

                    traceData.setSubActionLabel(annotationEditClicked ? "EDIT_ANNOTATION" : "READ_ANNOTATION");
                    traceData.setActionLabel("ANNOTATION");
                    traceDataForTools.add(traceData);
                }
            }
            if (startWriteEssay && (startDictionary || startReadPlanner || startSearchAnnotation || startChatTeacher || startChatgpt || startChecklist)) {
                // essay 和 某一个工具一起打开
                if (Double.parseDouble(traceData.getClientX()) > Double.parseDouble(traceData.getWindowInnerWidth()) - (655 + 745)
                        && Double.parseDouble(traceData.getClientX()) < Double.parseDouble(traceData.getWindowInnerWidth()) - 655
                        && Double.parseDouble(traceData.getClientY()) > Double.parseDouble(traceData.getWindowInnerHeight()) * 0.4) {
                    traceData.setSubActionLabel("WRITE_ESSAY");
                    traceData.setActionLabel("ESSAY");
                    traceDataForTools.add(traceData);
                }
            }
            if (startWriteEssay) { // 只有essay 打开
                if (Double.parseDouble(traceData.getClientX()) > Double.parseDouble(traceData.getWindowInnerWidth()) - 1150
                        && Double.parseDouble(traceData.getClientY()) > Double.parseDouble(traceData.getWindowInnerHeight()) * 0.4) {
                    traceData.setSubActionLabel("WRITE_ESSAY");
                    traceData.setActionLabel("ESSAY");
                    traceDataForTools.add(traceData);
                }
            }
            if (startDictionary) {
                if (Double.parseDouble(traceData.getClientX()) > Double.parseDouble(traceData.getWindowInnerWidth()) - 605
                        && Double.parseDouble(traceData.getClientY()) > Double.parseDouble(traceData.getWindowInnerHeight()) * 0.4) {
                    traceData.setSubActionLabel("DICTIONARY");
                    traceData.setActionLabel("DICTIONARY");
                    traceDataForTools.add(traceData);
                }
            }
            if (startReadPlanner) {
                if (Double.parseDouble(traceData.getClientX()) > Double.parseDouble(traceData.getWindowInnerWidth()) - 605
                        && Double.parseDouble(traceData.getClientY()) > Double.parseDouble(traceData.getWindowInnerHeight()) * 0.1) {
                    traceData.setSubActionLabel(plannerEditClicked ? "EDIT_PLANNER" : "READ_PLANNER");
                    traceData.setActionLabel("PLANNER");
                    traceDataForTools.add(traceData);
                }
            }
            if (startSearchAnnotation) {
                if (Double.parseDouble(traceData.getClientX()) > Double.parseDouble(traceData.getWindowInnerWidth()) - 605
                        && Double.parseDouble(traceData.getClientY()) > Double.parseDouble(traceData.getWindowInnerHeight()) * 0.1) {
                    traceData.setSubActionLabel("SEARCH_ANNOTATION");
                    traceData.setActionLabel("ANNOTATION");
                    traceDataForTools.add(traceData);
                }
            }
            if (startChatTeacher) {
                if (Double.parseDouble(traceData.getClientX()) > Double.parseDouble(traceData.getWindowInnerWidth()) - 605
                        && Double.parseDouble(traceData.getClientY()) > Double.parseDouble(traceData.getWindowInnerHeight()) * 0.4) {
                    traceData.setSubActionLabel("READ_FEEDBACK_CHATTEACHER");
                    traceData.setActionLabel("CHATTEACHER");
                    traceDataForTools.add(traceData);
                }
            }
            if (startChatgpt) {
                if (Double.parseDouble(traceData.getClientX()) > Double.parseDouble(traceData.getWindowInnerWidth()) - 605
                        && Double.parseDouble(traceData.getClientY()) > Double.parseDouble(traceData.getWindowInnerHeight()) * 0.4) {
                    traceData.setSubActionLabel("READ_FEEDBACK_GPT");
                    traceData.setActionLabel("CHATGPT");
                    traceDataForTools.add(traceData);
                }
            }
            if (startChecklist) {
                if (Double.parseDouble(traceData.getClientX()) > Double.parseDouble(traceData.getWindowInnerWidth()) - 605
                        && Double.parseDouble(traceData.getClientY()) > Double.parseDouble(traceData.getWindowInnerHeight()) * 0.4) {
                    traceData.setSubActionLabel("READ_CHECKLIST");
                    traceData.setActionLabel("CHECKLIST");
                    traceDataForTools.add(traceData);
                }
            }
        }

        iTraceDataService.myUpdateBatch(traceDataForTools);



        QueryWrapper<TraceData> queryWrapperForReading = new QueryWrapper<>();
        queryWrapperForReading.or().eq("user_id", userId);
        if (!StrUtil.isEmpty(courseId) && !courseId.equals("0")) {queryWrapperForReading.eq("course_id", courseId);}
        queryWrapperForReading.orderByAsc("save_time");
        List<TraceData> traceDataForReadingList = iTraceDataService.list(queryWrapperForReading);
        List<TraceData> collect1 = traceDataForReadingList.stream().filter(traceData -> Set.of("BODY", "READING", "NOT_USE", "TASK_REQUIREMENT", "RUBRIC", "RELEVANT_READING", "RELEVANT_REREADING", "IRRELEVANT_READING", "IRRELEVANT_REREADING").contains(traceData.getSubActionLabel()) || traceData.getInstantEvent().equals("LEAVE_PAGE")).collect(Collectors.toList());
        List<TraceData> updateReadingWhenReachLeavePage = new ArrayList<>();
        List<TraceData> tempList = new ArrayList<>();
        for (TraceData traceData : collect1) {
            //把每个leave page 之前的 点击/move/wheel/select text 都变成和leave page 一样的action
            if (!traceData.getInstantEvent().equals("LEAVE_PAGE")) {
                if (StrUtil.isEmpty(traceData.getSubActionLabel()) || StrUtil.isEmpty(traceData.getActionLabel())) {
                    tempList.add(traceData);
                }
            } else {
                tempList.forEach(t-> {
                    t.setSubActionLabel(traceData.getSubActionLabel());
                    t.setActionLabel(traceData.getActionLabel());
                });
                updateReadingWhenReachLeavePage.addAll(tempList);
                tempList.clear();
            }
        }
        log.info("updateReadingWhenReachLeavePage size:" + updateReadingWhenReachLeavePage.size());

        iTraceDataService.myUpdateBatch(updateReadingWhenReachLeavePage);
    }


    private void updateEssayAnnotationTryOutTools(Long userId, String courseId) {
        QueryWrapper<TraceData> essayQueryWrapper = new QueryWrapper<>();
        essayQueryWrapper.eq("user_id", userId).in("source", "ESSAY", "PAGE").in("instant_event", "OPEN", "CLOSE", "LEAVE_PAGE");
        if (!StrUtil.isEmpty(courseId) && !courseId.equals("0")) {essayQueryWrapper.eq("course_id", courseId);}
        essayQueryWrapper.orderByAsc("save_time");
        List<TraceData> essayTraceDataList = iTraceDataService.list(essayQueryWrapper);

        List<TraceData> tempEssayTraceDataList = new ArrayList<>();
        for (TraceData e : essayTraceDataList) {
            if (e.getInstantEvent().equals("OPEN") || e.getInstantEvent().equals("CLOSE")) {
                tempEssayTraceDataList.add(e);
            }
            if (tempEssayTraceDataList.size() == 1 && tempEssayTraceDataList.get(0).getInstantEvent().equals("OPEN") && e.getInstantEvent().equals("LEAVE_PAGE")) {
                tempEssayTraceDataList.add(e);
            }
            if (tempEssayTraceDataList.size() == 2) {
                break;
            }
        }


        if (tempEssayTraceDataList.size() >= 2) {
            TraceData traceDataOpen = tempEssayTraceDataList.get(0);
            TraceData traceDataClose = tempEssayTraceDataList.get(1);
            if (!traceDataOpen.getInstantEvent().equals("OPEN") || !Set.of("CLOSE", "LEAVE_PAGE").contains(traceDataClose.getInstantEvent())) {
                log.info("tempEssayTraceDataList > 2: traceDataOpen:" + traceDataOpen);
                log.info("tempEssayTraceDataList > 2: traceDataClose:" + traceDataClose);
                throw new RuntimeException("essay not open/close");
            }

            if (Long.parseLong(traceDataClose.getSaveTime()) - Long.parseLong(traceDataOpen.getSaveTime()) > 3000) { // 使用时长大于3秒
                // 不是try out tools

                traceDataOpen.setSubActionLabel(traceDataOpen.getInstantEvent() + "_" + traceDataOpen.getSource());
                traceDataOpen.setActionLabel(traceDataOpen.getSource());
                if (traceDataClose.getInstantEvent().equals("CLOSE")) {
                    traceDataClose.setSubActionLabel(traceDataClose.getInstantEvent() + "_" + traceDataClose.getSource());
                    traceDataClose.setActionLabel(traceDataClose.getSource());
                } // 否则是leave page，不需要修改subaction label
            } else {
                // 是try out tools
                traceDataOpen.setSubActionLabel("TRY_OUT_TOOLS");
                traceDataOpen.setActionLabel("NAVIGATION");
                if (traceDataClose.getInstantEvent().equals("CLOSE")) {
                    traceDataClose.setSubActionLabel("TRY_OUT_TOOLS");
                    traceDataClose.setActionLabel("NAVIGATION");
                } // 否则是leave page，不需要修改subaction label
            }
            for (TraceData e : essayTraceDataList) {
                if ((e.getInstantEvent().equals("OPEN") || e.getInstantEvent().equals("CLOSE"))
                        && !Objects.equals(e.getId(), traceDataOpen.getId())
                        && !Objects.equals(e.getId(), traceDataClose.getId())) {
                    e.setSubActionLabel(e.getInstantEvent() + "_" + e.getSource());
                    e.setActionLabel(e.getSource());
                    tempEssayTraceDataList.add(e);
                }
            }
            iTraceDataService.myUpdateBatch(tempEssayTraceDataList);
        }


        QueryWrapper<TraceData> annotationQueryWrapper = new QueryWrapper<>();
        annotationQueryWrapper.eq("user_id", userId).in("source", "ANNOTATION", "PAGE").in("instant_event", "OPEN", "CLOSE", "LEAVE_PAGE");
        if (!StrUtil.isEmpty(courseId) && !courseId.equals("0")) {annotationQueryWrapper.eq("course_id", courseId);}
        annotationQueryWrapper.orderByAsc("save_time");
        List<TraceData> annotationTraceDataList = iTraceDataService.list(annotationQueryWrapper);
        List<TraceData> tempAnnotationTraceDataList = new ArrayList<>();

        for (TraceData t : annotationTraceDataList) {
            if (t.getInstantEvent().equals("OPEN") || t.getInstantEvent().equals("CLOSE")) {
                tempAnnotationTraceDataList.add(t);
            }
            if (tempAnnotationTraceDataList.size() == 1 && tempAnnotationTraceDataList.get(0).getInstantEvent().equals("OPEN") && t.getInstantEvent().equals("LEAVE_PAGE")) {
                tempAnnotationTraceDataList.add(t);
            }
            if (tempAnnotationTraceDataList.size() == 2) {
                break;
            }
        }


        if (tempAnnotationTraceDataList.size() >= 2) {
            TraceData traceDataOpen = tempAnnotationTraceDataList.get(0);
            TraceData traceDataClose = tempAnnotationTraceDataList.get(1);

            if (!traceDataOpen.getInstantEvent().equals("OPEN") || !Set.of("CLOSE", "LEAVE_PAGE").contains(traceDataClose.getInstantEvent())) {
                log.info("tempAnnotationTraceDataList >= 2 : traceDataOpen:" + traceDataOpen);
                log.info("tempAnnotationTraceDataList >= 2 : traceDataClose:" + traceDataClose);
                throw new RuntimeException("annotation not open/close");
            }

            if (Long.parseLong(traceDataClose.getSaveTime()) - Long.parseLong(traceDataOpen.getSaveTime()) > 3000) { // 使用时长大于3秒
                // 不是try out tools
                traceDataOpen.setSubActionLabel(traceDataOpen.getInstantEvent() + "_" + traceDataOpen.getSource());
                traceDataOpen.setActionLabel(traceDataOpen.getSource());
                traceDataClose.setSubActionLabel(traceDataClose.getInstantEvent() + "_" + traceDataClose.getSource());
                traceDataClose.setActionLabel(traceDataClose.getSource());
            } else {
                // 是try out tools
                traceDataOpen.setSubActionLabel("TRY_OUT_TOOLS");
                traceDataOpen.setActionLabel("NAVIGATION");
                traceDataClose.setSubActionLabel("TRY_OUT_TOOLS");
                traceDataClose.setActionLabel("NAVIGATION");
            }

            for (TraceData t : annotationTraceDataList) {
                if ((t.getInstantEvent().equals("OPEN") || t.getInstantEvent().equals("CLOSE"))
                        && !Objects.equals(t.getId(), traceDataOpen.getId())
                        && !Objects.equals(t.getId(), traceDataClose.getId())) {
                    t.setSubActionLabel(t.getInstantEvent() + "_" + t.getSource());
                    t.setActionLabel(t.getSource());
                    tempAnnotationTraceDataList.add(t);
                }
            }

            iTraceDataService.myUpdateBatch(tempAnnotationTraceDataList);
        }
    }
    private void updateTimerTryOutTools(Long userId, String courseId) {
        QueryWrapper<TraceData> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("user_id", userId).eq("source", "TIMER").eq("instant_event", "OPEN");
        if (!StrUtil.isEmpty(courseId) && !courseId.equals("0")) {queryWrapper.eq("course_id", courseId);}
        queryWrapper.orderByAsc("save_time");
        List<TraceData> traceDataList = iTraceDataService.list(queryWrapper);

        if (!traceDataList.isEmpty()) {
            traceDataList.get(0).setSubActionLabel("TRY_OUT_TOOLS");
            traceDataList.get(0).setActionLabel("NAVIGATION");
            for (int i = 1; i < traceDataList.size(); i++) {
                TraceData traceData = traceDataList.get(i);
                traceData.setSubActionLabel("TIMER");
                traceData.setActionLabel("TIMER");
            }
            iTraceDataService.myUpdateBatch(traceDataList);
        }
    }

    private void updateOtherToolsTryOutTools(Long userId, String courseId) {
        QueryWrapper<TraceData> otherToolsQueryWrapper = new QueryWrapper<>();
        otherToolsQueryWrapper.eq("user_id", userId).in("source", "DICTIONARY", "PLANNER", "SEARCH_ANNOTATION", "CHECKLIST", "CHATGPT", "CHATTEACHER", "PAGE").in("instant_event", "OPEN", "CLOSE", "LEAVE_PAGE");
        if (!StrUtil.isEmpty(courseId) && !courseId.equals("0")) {otherToolsQueryWrapper.eq("course_id", courseId);}
        otherToolsQueryWrapper.orderByAsc("save_time");
        List<TraceData> otherToolsTraceDataList = iTraceDataService.list(otherToolsQueryWrapper);

        Set<String> toolOpenSet = new HashSet<>();
        List<TraceData> needUpdateTraceDataList = new ArrayList<>();
        List<TraceData> nextList = new ArrayList<>();

        for (int i = 0; i < otherToolsTraceDataList.size(); i++) {
            TraceData traceData = otherToolsTraceDataList.get(i);
            if (traceData.getInstantEvent().equals("OPEN")) {
                String temp = traceData.getSource() + "_OPEN";
                if (toolOpenSet.contains(temp)) {
                    // 不是第一次，不再是try out tools
                    traceData.setSubActionLabel("OPEN_" + traceData.getSource());
                    traceData.setActionLabel(traceData.getSource());
                    needUpdateTraceDataList.add(traceData);
                } else { //第一次使用
                    toolOpenSet.add(temp);
                    if (i + 1 < otherToolsTraceDataList.size()) {
                        TraceData next = otherToolsTraceDataList.get(i + 1);
                        if (Long.parseLong(next.getSaveTime()) - Long.parseLong(traceData.getSaveTime()) < 3000) {
                            traceData.setSubActionLabel("TRY_OUT_TOOLS");
                            traceData.setActionLabel("NAVIGATION");
                            needUpdateTraceDataList.add(traceData);
                            if (next.getSource().equals(traceData.getSource()) && next.getInstantEvent().equals("CLOSE")) {
                                next.setSubActionLabel("TRY_OUT_TOOLS");
                                next.setActionLabel("NAVIGATION");
                                needUpdateTraceDataList.add(next);
                                nextList.add(next);
                            }
                        } else {
                            traceData.setSubActionLabel("OPEN_" + traceData.getSource());
                            traceData.setActionLabel(traceData.getSource());
                            needUpdateTraceDataList.add(traceData);
                        }
                    } // 否则表示后面已经没有item了
                }
            } else if (traceData.getInstantEvent().equals("CLOSE")) {
                if (!nextList.contains(traceData)) {
                    traceData.setSubActionLabel("CLOSE_" + traceData.getSource());
                    traceData.setActionLabel(traceData.getSource());
                    needUpdateTraceDataList.add(traceData);
                }
            }
        }

        iTraceDataService.myUpdateBatch(needUpdateTraceDataList);
    }

    private void updateAllActionSubActionLabel(Long userId, String courseId) {
        QueryWrapper<TraceData> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("user_id", userId).ne("source", "EXTRA");
        if (!StrUtil.isEmpty(courseId) && !courseId.equals("0")) {queryWrapper.eq("course_id", courseId);}
        queryWrapper.orderByAsc("save_time");
        List<TraceData> traceDataList = iTraceDataService.list(queryWrapper);
        List<TraceData> needUpdateTraceDataList = new ArrayList<>();

        traceDataList.forEach(traceData -> {
            if (!Set.of("START_TASK", "END_TASK", "TRY_OUT_TOOLS", "PAGE_NAVIGATION", "TABLE_OF_CONTENT", "RUBRIC", "TASK_REQUIREMENT").contains(traceData.getSubActionLabel())
                    && !traceData.getSubActionLabel().endsWith("READING")) {
                traceData.setSubActionLabel(MyConstant.SUB_ACTION_LABEL_MAP.get(traceData.getSource() + "_" + traceData.getInstantEvent()));
                if (traceData.getSource().equals("SEARCH_ANNOTATION")) {
                    traceData.setActionLabel("ANNOTATION");
                } else {
                    traceData.setActionLabel(traceData.getSource());
                }
                needUpdateTraceDataList.add(traceData);
            } else if (traceData.getSubActionLabel().equals("TIMER_OPEN")) {
                traceData.setSubActionLabel("TIMER");
                traceData.setActionLabel("TIMER");
                needUpdateTraceDataList.add(traceData);
            }
        });

        iTraceDataService.myUpdateBatch(needUpdateTraceDataList);

    }

    private void updateTableOfContentAndTaskFinishClick(Long userId, String courseId) {
        QueryWrapper<TraceData> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("user_id", userId).eq("sub_action_label", "TABLE_OF_CONTENT").or().eq("target_object","BUTTON#taskFinishBackToHomepageBtn");
        if (!StrUtil.isEmpty(courseId) && !courseId.equals("0")) {queryWrapper.eq("course_id", courseId);}
        List<TraceData> traceDataList = iTraceDataService.list(queryWrapper);

        traceDataList.forEach(traceData -> {
            if (traceData.getSubActionLabel().equals("TABLE_OF_CONTENT")) {
                traceData.setActionLabel("NAVIGATION");
            } else {
                traceData.setActionLabel("END");
            }
        });

        iTraceDataService.myUpdateBatch(traceDataList);

    }
    public void manuallyCheckLogAndUpdate(Long userId, String courseId) {
        log.info("manuallyCheckLogAndUpdate userid: {} courseId: {}", userId, courseId);
        // step 1 更新 基础事件 修复数据
        // step 1.1 修复 task start/end
        updateTaskStartEnd(userId, courseId);
        log.info("step 1.1 修复 task start/end");

        // step 1.2 北京lab数据 可以删除掉off task 和 essay blur
        deleteOffTaskAndEssayBlurAndEmptyBodyClickAndSaveEssayWhenLeavePage(userId, courseId);
        log.info("step 1.2 北京lab数据 可以删除掉off task 和 essay blur");
        fixLeavePageMissingIssue(userId, courseId);
        log.info("step 1.2- 北京lab数据 fixLeavePageMissingIssue");

        // step 1.3 修复annotation 中Close 事件错误
        // target_object=CREATE_NOTE_BTN  page_event=AUTO_OPEN
        updateAnnotationCloseEventError(userId, courseId);
        log.info("step 1.3 修复annotation 中Close 事件错误");
        // step 1.3.2 修复annotation 中由create 触发的edit事件
        updateAnnotationTriggerByCreate(userId, courseId);
        log.info("step 1.3.2 修复annotation 中由create 触发的edit事件");
        // step 1.3.3 修复essay open被错误标记成close 事件
        updateEssayCloseEventError(userId, courseId);
        log.info("step 1.3.3 修复essay open被错误标记成close 事件");
        // step 1.4 删除timer close 事件
        deleteTimerCloseEvent(userId, courseId);
        log.info("step 1.4 删除timer close 事件");
        // step 1.5 更新planner TragetObject PLANNER_CHECKBOX -> SAVE_PLAN_BTN 过程的事件
        updatePlannerTargetObject(userId, courseId);
        log.info("step 1.5 更新planner TragetObject PLANNER_CHECKBOX -> SAVE_PLAN_BTN 过程的事件");
        // step 1.6 更新planner edit 过程的事件
        // 需要知道是否有EDIT_PLAN_BTN 被点击过
        updatePlanInputToCreate(userId, courseId);
        log.info("step 1.6 更新planner edit 过程的事件");
        // step 2 fix all sub action label and action label
        // step 2.1 检查所有leave page 的事件，需要修改 task requirement 和 rubric
        updateLeavePage(userId, courseId);
        log.info("step 2.1 检查所有leave page 的事件，需要修改 task requirement 和 rubric");
        // step 2.2 fix 所有鼠标移动，wheel，点击，select text
        updateMouseMoveWheelClickSelectForTools(userId, courseId);
        log.info("step 2.2 fix 所有鼠标移动，wheel，点击，select text");
        // step 2.3 检查try out tools 之后的时间是否正确 , 可以通过close 减去open 来 获取tool 使用时间
        // ESSAY 和 ANNOTATION 独立的，有open肯定会有close
        // TIMER 只有 OPEN
        // DICTIONARY, Planner, Search_Annotation, Checklist, Chatgpt, ChatTeacher 都互斥， 有Open不一定有Close
        updateEssayAnnotationTryOutTools(userId, courseId);
        log.info("检查try out tools updateEssayAnnotationTryOutTools");
        updateTimerTryOutTools(userId, courseId);
        log.info("检查try out tools updateTimerTryOutTools");
        updateOtherToolsTryOutTools(userId, courseId);
        log.info("检查try out tools updateOtherToolsTryOutTools");


        // step 2.4 检查所有 item的action 和 sub action label
        updateAllActionSubActionLabel(userId, courseId);  // 排除已有的几个，其他都从map里面获取
        log.info("step 2.4 检查所有 item的action 和 sub action label");

        // step 2.5 检查剩余 action 和sub action label
        updateTableOfContentAndTaskFinishClick(userId, courseId);
        log.info("step 2.5 检查剩余 action 和sub action label");
    }
*/
}
