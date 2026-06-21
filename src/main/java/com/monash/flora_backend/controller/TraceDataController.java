package com.monash.flora_backend.controller;

import com.monash.flora_backend.constant.MyConstant;
import com.monash.flora_backend.controller.vo.UserStartTimeVO;
import com.monash.flora_backend.dao.entity.UserStartTime;
import com.monash.flora_backend.service.ICollaborateService;
import com.monash.flora_backend.service.IScaffoldService;
import com.monash.flora_backend.service.ITraceDataService;
import com.monash.flora_backend.service.IUserStartTimeService;
import com.monash.flora_backend.service_func.ActionAndProcessService;
import com.monash.flora_backend.util.JSONResult;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
//@CrossOrigin(origins = {"https://study.floralearn.cn", "http://localhost:8088", "https://cella-monash.floraproject.org", "https://nijmegen.floraproject.org", "https://www.floraengine.org"})
@RestController
@AllArgsConstructor
public class TraceDataController {
    private final ITraceDataService iTraceDataService;
    private final IUserStartTimeService iUserStartTimeService;
    private final ICollaborateService iCollaborateService;
    private final KafkaTemplate<String, String> kafkaTemplate;
    private final IScaffoldService iScaffoldService;
    private final ActionAndProcessService actionAndProcessService;


//    @PostMapping("/trace-page-reading")
//    public JSONResult tracePageReading(TraceDataVO traceDataVO) {
////        iTraceDataService.addSubActionLabelForReadingNavigation(traceDataVO);
//        kafkaTemplate.send(MyConstant.KAFKA_TOPIC_TRACE_DATA, JSON.toJSONString(traceDataVO));
//        return JSONResult.ok();
//    }

    /**
     *
     * 记录所有 鼠标移动，滚动
     */
    /*@PostMapping("/trace-extra")
    public JSONResult traceExtra(TraceExtraDataVO traceExtraDataVO) {
//        kafkaTemplate.send(MyConstant.KAFKA_TOPIC_TRACE_EXTRA_DATA, JSON.toJSONString(traceExtraDataVO));
//        kafkaTemplate.send(MyConstant.KAFKA_TOPIC_TRACE_DATA, JSON.toJSONString(traceExtraDataVO));
        kafkaTemplate.send(MyConstant.KAFKA_TOPIC_TRACE_DATA, JSONUtil.toJsonStr(traceExtraDataVO));

        return JSONResult.ok();
    }
    @PostMapping(value = {"/trace-planner", "/trace-essay", "/trace-collaborate", "/trace-page-click",
            "/trace-annotation-label", "/trace-annotation", "/trace-search-annotation",
             "/trace-off-task", "/trace-checklist",
            "/trace-select-click", "/trace-body-click","/trace-page-reading", // 都是在 body 上有点击或者选中时候发生的
            "/trace-chatgpt", "/trace-dictionary", "/trace-teacherchat", "/trace-grammarly", "/trace-scaffold", "/trace-chatgpt-scaffold"})
    public JSONResult traceAll(TraceDataVO traceDataVO, HttpServletRequest request) {
//        log.warn("KAFKA_TOPIC_TRACE_DATA111111111111111111111111111:" + traceDataVO);
//        log.info("--------------------" + request.getRequestURI());
//        kafkaTemplate.send(MyConstant.KAFKA_TOPIC_TRACE_DATA, JSON.toJSONString(traceDataVO));
        kafkaTemplate.send(MyConstant.KAFKA_TOPIC_TRACE_DATA, JSONUtil.toJsonStr(traceDataVO));

        return JSONResult.ok();
    }*/
    /*@PostMapping("/trace-timer") //recorded 不需要后台定时任务处理
    public JSONResult traceTimer(TraceDataVO traceDataVO) {

        //一旦用户 完成task， 发送消息过来，并且删除 该用户在map 中的数据，并存入数据库
        if ("ESSAY_TASK_END".equals(traceDataVO.getInstantEvent())) {
//            MyConstant.USER_READING_REREADING_MAP.remove(traceDataVO.getUserId());
//            MyConstant.USER_INSTRUMENTATION_TOOLS_USAGE_MAP.remove(traceDataVO.getUserId());
            iCollaborateService.deleteCollaborativePadInfo();
            log.info("ESSAY_TASK_END-------------user:{}, course:{}", traceDataVO.getUserId(), traceDataVO.getCourseId());
//            iScaffoldService.checkProcessLabelPatterns(traceDataVO.getUserId(), 120, traceDataVO.getCourseId(), "maria"); //当任务结束时候，最终处理一次所有的action 并生成process label, 给所有人都加上process label, 第二个参数 分钟数没有使用
            if (MyConstant.SRL_MODEL.equals("maria")) {
                actionAndProcessService.labelAllProcessLabelPatternsAsync(traceDataVO.getUserId(), traceDataVO.getCourseId(), MyConstant.SRL_MODEL);
            } else if (MyConstant.SRL_MODEL.equals("copes")) {
                actionAndProcessService.labelTimeRangeProcessLabelPatternsAsync(traceDataVO.getUserId(), traceDataVO.getCourseId(), MyConstant.SRL_MODEL, 28L, 46L);
            }
        }
        // 因为timer 事件不是异步处理的，所以要在此处处理而不是在saveTraceDataFromRedisToDb() 中处理
//        iTraceDataService.addSubActionLabelForTryOutToolsTimer(traceDataVO);
//        kafkaTemplate.send(MyConstant.KAFKA_TOPIC_TRACE_DATA, JSON.toJSONString(traceDataVO));
        kafkaTemplate.send(MyConstant.KAFKA_TOPIC_TRACE_DATA, JSONUtil.toJsonStr(traceDataVO));

        log.info(traceDataVO.getUrl());
        if ("ESSAY_TASK_START".equals(traceDataVO.getInstantEvent())) {
            String courseId = traceDataVO.getCourseId(); //Optional.ofNullable(MyConstant.URL_COURSE_ID_MAP.get(traceDataVO.getUrl())).orElse("UNKNOW_COURSE");

            UserStartTime userStartTime = new UserStartTime();
            userStartTime.setUserStartTime(traceDataVO.getSaveTime());
            userStartTime.setUserId(traceDataVO.getUserId());
            userStartTime.setCourseId(courseId);
            iUserStartTimeService.save(userStartTime);
            iUserStartTimeService.saveStartTimeToRedis("task-start-time-" + traceDataVO.getUserId() + "-" + courseId, traceDataVO.getSaveTime());
        }
        return JSONResult.ok();
    }*/

    @PostMapping("/get-task-start-time")
//    public JSONResult getTaskStartTime(Long userId, String pageUrl, String courseId) {
    public JSONResult getTaskStartTime(Long userId, String courseId) {
        log.info("------------------------into getTaskStartTime");
//        log.info("userId:" + userId);
//        log.info("pageUrl:" + pageUrl);
        log.info("getTaskStartTime:" + courseId + "-----userId:" + userId);
//        String courseId = Optional.ofNullable(MyConstant.URL_COURSE_ID_MAP.get(pageUrl)).orElse("UNKNOW_COURSE");
        String startTimeFromRedis = iUserStartTimeService.getStartTimeFromRedis(MyConstant.REDIS_TASK_START_TIME + userId + "-" + courseId);
        log.info("startTimeFromRedis:" + startTimeFromRedis);
        if (startTimeFromRedis == null) {
            UserStartTimeVO userStartTimeVO = iUserStartTimeService.findByUserIdAndCourseId(userId, courseId);
            return JSONResult.ok(userStartTimeVO == null ? 0 : userStartTimeVO.getUserStartTime());
        } else {
            return JSONResult.ok(startTimeFromRedis);
        }

    }

    @PostMapping("/add-task-start-time") // for task2
    public JSONResult addTaskStartTime(Long userId, String courseId, String currentTimestamp) {
        log.info("------------------------into addTaskStartTime:" + currentTimestamp + "::::courseId:" + courseId + "::::userId:" + userId);
        iUserStartTimeService.saveStartTimeToRedis(MyConstant.REDIS_TASK_START_TIME + userId + "-" + courseId, currentTimestamp);
        UserStartTime u = new UserStartTime();
        u.setUserId(userId);
        u.setCourseId(courseId);
        u.setUserStartTime(currentTimestamp);
        iUserStartTimeService.save(u);
        return JSONResult.ok();
    }
}
