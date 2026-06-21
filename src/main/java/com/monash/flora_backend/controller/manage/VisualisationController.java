package com.monash.flora_backend.controller.manage;

import com.monash.flora_backend.service.ITraceDataService;
import com.monash.flora_backend.util.JSONResult;
import com.monash.flora_backend.controller.vo.TraceDataCleanAllActionVO;
import com.monash.flora_backend.controller.vo.TraceDataCleanAllSubActionVO;
import com.monash.flora_backend.controller.vo.TraceDataCleanGroupVO;
import com.monash.flora_backend.controller.vo.TraceDataCleanPersonalVO;
import com.monash.flora_backend.controller.vo.TraceDataCleanTimelineVO;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.*;

/**
 * all the data API return to visualisation
 *
 */

@Slf4j
@RestController
@RequestMapping("/visualization")
@AllArgsConstructor
public class VisualisationController {

    private final ITraceDataService ITraceDataService;


    @GetMapping("/get-student-trace/{userId}")
    public JSONResult getStudentTrace(@PathVariable("userId") Long userId) {
        return JSONResult.ok();
    }

    @GetMapping("/get-timeline-sub-action")
    public JSONResult getTimelineSubActionData(@RequestParam(required = false) String minuteLimitStr, @RequestParam(required = false) String courseId, @RequestParam(required = false) String usernameFilter) {
        long minuteLimit = Long.parseLong(minuteLimitStr) * 60 * 1000;
        String processedUsernameFilter = "%" + usernameFilter + "%";
        log.info("get-timeline-sub-action with minute limit: {} and courseId: {}, usernameFilter: {}", minuteLimit, courseId, processedUsernameFilter);

        List<TraceDataCleanTimelineVO> res = ITraceDataService.getTimelineSubActionData(courseId, minuteLimit, processedUsernameFilter);

        return JSONResult.ok(res);
    }

    @GetMapping("/get-timeline-action-data")
    public JSONResult getTimelineActionData(@RequestParam(required = false) String minuteLimitStr, @RequestParam(required = false) String courseId, @RequestParam(required = false) String usernameFilter) {
        long minuteLimit = Long.parseLong(minuteLimitStr) * 60 * 1000;    // transform minute to milisecond
        String processedUsernameFilter = "%" + usernameFilter + "%";

        log.info("get-timeline-action-data with minute limit: {} and courseId: {}, usernameFilter: {}", minuteLimit, courseId, processedUsernameFilter);

        List<TraceDataCleanTimelineVO> res = ITraceDataService.getTimelineActionData(courseId, minuteLimit, processedUsernameFilter);
//        log.info(res.toString());
        return JSONResult.ok(res);
    }

    @GetMapping("/get-personal-level-data")
    public JSONResult getPersonalLevelData(@RequestParam(required = false) String minuteLimitStr, @RequestParam(required = false) String courseId, @RequestParam(required = false) String usernameFilter) {
//        List<String> list = Arrays.asList(group.split(","));
        String processedUsernameFilter = "%" + usernameFilter + "%";
        long minuteLimit = Long.parseLong(minuteLimitStr) * 60 * 1000;    // transform minute to milisecond
        log.info("get-personal-level-data with minute limit: {} and courseId: {}, usernameFilter: {}", minuteLimit, courseId, processedUsernameFilter);
        List<TraceDataCleanPersonalVO> res = ITraceDataService.getPersonalLevelData(courseId, minuteLimit, processedUsernameFilter);
//        log.info(res.toString());
        return JSONResult.ok(res);
    }

    @GetMapping("/get-group-level-data")
    public JSONResult getGroupLevelData(@RequestParam(required = false) String minuteLimitStr, @RequestParam(required = false) String courseId, @RequestParam(required = false) String usernameFilter) {
        long minuteLimit = Long.parseLong(minuteLimitStr) * 60 * 1000;
        String processedUsernameFilter = "%" + usernameFilter + "%";

        log.info("get-group-level-data with minute limit: {} and courseId: {}, usernameFilter: {}", minuteLimit, courseId, processedUsernameFilter);
        
        List<TraceDataCleanGroupVO> res = ITraceDataService.getGroupLevelData(courseId, minuteLimit, processedUsernameFilter);

        return JSONResult.ok(res);
    }

    @GetMapping("/get-all-level-data-1")
    public JSONResult getAllLevelAction(@RequestParam(required = false) String minuteLimitStr, @RequestParam(required = false) String courseId, @RequestParam(required = false) String usernameFilter) {
        long minuteLimit = Long.parseLong(minuteLimitStr) * 60 * 1000;
        String processedUsernameFilter = "%" + usernameFilter + "%";

        log.info("get-all-level-data-1 with minute limit: {} and courseId: {}, usernameFilter: {}", minuteLimit, courseId, processedUsernameFilter);
        
        List<TraceDataCleanAllActionVO> res =  ITraceDataService.getAllLevelAction(courseId, minuteLimit, processedUsernameFilter);

        return JSONResult.ok(res);
    }
    @GetMapping("/get-all-level-data-2")
    public JSONResult getAllLevelSubAction(@RequestParam(required = false) String minuteLimitStr, @RequestParam(required = false) String courseId, @RequestParam(required = false) String usernameFilter) {
        long minuteLimit = Long.parseLong(minuteLimitStr) * 60 * 1000;
        String processedUsernameFilter = "%" + usernameFilter + "%";

        log.info("get-all-level-data-2 with minute limit: {} and courseId: {}, usernameFilter: {}", minuteLimit, courseId, processedUsernameFilter);
        
        List<TraceDataCleanAllSubActionVO> res = ITraceDataService.getAllLevelSubAction(courseId, minuteLimit, processedUsernameFilter);

        return JSONResult.ok(res);
    }
}
