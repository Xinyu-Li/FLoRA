package com.monash.flora_backend;

import cn.hutool.json.JSONUtil;
import com.monash.flora_backend.config.cache.IGlobalCache;
import com.monash.flora_backend.constant.MyConstant;
import com.monash.flora_backend.controller.vo.ProcessDurationVO;
import com.monash.flora_backend.dao.entity.TraceDataRealTimeProcess;
import com.monash.flora_backend.service.ITraceDataRealTimeProcessService;
import com.monash.flora_backend.service_func.ActionAndProcessService;
import com.monash.flora_backend.service_func.UserDataManagementService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.*;

/**
 * @author Xinyu Li
 * @date 10/21/2024
 */
public class RealTimeProcessTest extends FLoRaBackendApplicationTests{
    @Autowired
    private ActionAndProcessService actionAndProcessService;
    @Autowired
    private ITraceDataRealTimeProcessService iTraceDataRealTimeProcessService;
    @Autowired
    private UserDataManagementService userDataManagementService;
    @Test
    public void testGetSimplifiedLabel() {
        List<TraceDataRealTimeProcess> resultList = actionAndProcessService.getRealTimeSimplifiedTraceDataLabelled(7L, "16", "maria");
        Map<String, Double> labelDurationMap = new HashMap<>();
        List<ProcessDurationVO> durationVOList = actionAndProcessService.calculateRealTimeProcessDurations(resultList, false, labelDurationMap);
        durationVOList.forEach(System.out::println);
        labelDurationMap.forEach((key, value) -> {
            System.out.println("Key: " + key + ", Value: " + value);
        });
    }

    @Test
    public void test() {
        TraceDataRealTimeProcess traceDataRealTimeProcess = new TraceDataRealTimeProcess();
        traceDataRealTimeProcess.setId(123L);
        traceDataRealTimeProcess.setUserId(220L);
        iTraceDataRealTimeProcessService.updateById(traceDataRealTimeProcess);
    }

    @Test
    public void test2() {
//        TraceData {id=1475121, userId=null, saveTime='null', username='null', url='null', firstname='null', lastname='null', source='null', pageEvent='null', targetObject='null', instantEvent='null', actionLabel='null', subActionLabel='null', detailedActionLabel='null', modelType='null', processLabel='LCF2', screenX='null', screenY='null', clientX='null', clientY='null', windowInnerWidth='null', windowInnerHeight='null', screenWidth='null', screenHeight='null', eventValue='null', courseId='null'}
//        TraceData{id=1475150, userId=null, saveTime='null', username='null', url='null', firstname='null', lastname='null', source='null', pageEvent='null', targetObject='null', instantEvent='null', actionLabel='null', subActionLabel='null', detailedActionLabel='null', modelType='null', processLabel='LCF2', screenX='null', screenY='null', clientX='null', clientY='null', windowInnerWidth='null', windowInnerHeight='null', screenWidth='null', screenHeight='null', eventValue='null', courseId='null'}
//        TraceData{id=1475160, userId=null, saveTime='null', username='null', url='null', firstname='null', lastname='null', source='null', pageEvent='null', targetObject='null', instantEvent='null', actionLabel='null', subActionLabel='null', detailedActionLabel='null', modelType='null', processLabel='LCF2', screenX='null', screenY='null', clientX='null', clientY='null', windowInnerWidth='null', windowInnerHeight='null', screenWidth='null', screenHeight='null', eventValue='null', courseId='null'}
        userDataManagementService.clearAllUserLog(220L);
    }

    @Test
    public void test3() {
        TraceDataRealTimeProcess lastItemByUserIdCourseId = iTraceDataRealTimeProcessService.getLastItemByUserIdCourseId(220L, "95");

        System.out.println(lastItemByUserIdCourseId); // return null

        List<TraceDataRealTimeProcess> all = iTraceDataRealTimeProcessService.getAll(220L, "95");
        System.out.println(all.size());
    }

    @Test
    public void test4() {
//        List<TraceDataRealTimeProcess> all = iTraceDataRealTimeProcessService.getAll(220L, "95");
        List<TraceDataRealTimeProcess> all = new ArrayList<>();
        TraceDataRealTimeProcess t1 = new TraceDataRealTimeProcess();
        t1.setId(123L);
        t1.setProcessLabel("NOT_RECOGNIZED");
        t1.setSaveTime("1730441702312");
        TraceDataRealTimeProcess t2 = new TraceDataRealTimeProcess();
        t2.setId(124L);
        t2.setProcessLabel("NOT_RECOGNIZED");
        t2.setSaveTime("1730441712312");
        TraceDataRealTimeProcess t3 = new TraceDataRealTimeProcess();
        t3.setId(125L);
        t3.setProcessLabel(null);
        t3.setSaveTime("1730441722312");
        TraceDataRealTimeProcess t4 = new TraceDataRealTimeProcess();
        t4.setId(126L);
        t4.setProcessLabel(null);
        t4.setSaveTime("1730441732312");
        TraceDataRealTimeProcess t5 = new TraceDataRealTimeProcess();
        t5.setId(127L);
        t5.setProcessLabel("NOT_RECOGNIZED");
        t5.setSaveTime("1730441832312");
        TraceDataRealTimeProcess t6 = new TraceDataRealTimeProcess();
        t6.setId(127L);
        t6.setProcessLabel("LCR2");
        t6.setSaveTime("1730441852312");
        TraceDataRealTimeProcess t7 = new TraceDataRealTimeProcess();
        t7.setId(128L);
        t7.setProcessLabel(null);
        t7.setSaveTime("1730441892312");
        TraceDataRealTimeProcess t8 = new TraceDataRealTimeProcess();
        t8.setId(129L);
        t8.setProcessLabel(null);
        t8.setSaveTime("1730441992312");
        all.add(t1);
        all.add(t2);
        all.add(t3);
        all.add(t4);
        all.add(t5);
        all.add(t6);
        all.add(t7);
        all.add(t8);
        Map<String, Double> labelDurationMap = new HashMap<>();
        List<ProcessDurationVO> durationVOList = actionAndProcessService.calculateRealTimeProcessDurations(all, true, labelDurationMap);
        durationVOList.forEach(System.out::println);
    }

    @Autowired
    private IGlobalCache iGlobalCache;
    @Test
    public void test5() {
//        System.out.println(MyUtils.getCurrentTimestamp());
        String redisSimplifiedTraceKey = MyConstant.REDIS_SIMPLIFIED_TEMP_TRACE_DATA_LIST + "220-95";
        Set<String> simplifiedOrderedEvent = iGlobalCache.getOrderedEvent(redisSimplifiedTraceKey, 0, -1);
        for (String temp: simplifiedOrderedEvent) {
            System.out.println(JSONUtil.toBean(temp, TraceDataRealTimeProcess.class));
        }
    }
}
