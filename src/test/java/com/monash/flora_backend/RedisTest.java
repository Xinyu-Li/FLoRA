package com.monash.flora_backend;

import com.monash.flora_backend.config.cache.IGlobalCache;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

@Slf4j
public class RedisTest extends FLoRaBackendApplicationTests{

//    @Autowired
//    private IAsyncTaskService iAsyncTaskService;
//    @Test
//    public void testSaveKeyValueDataToRedis() throws InterruptedException {
//        log.info("-----------------------------------");
//        for (int i = 0; i < 50; i++) {
//            log.info("-----------------------------------");
//            TraceDataVO traceDataVO = new TraceDataVO();
//            traceDataVO.setSubActionLabel("test");
//            traceDataVO.setUrl("hello");
//            iAsyncTaskService.saveKeyValueDataToRedis("planner-save" + i, traceDataVO);
//        }
//        for (int i = 0; i < 50; i++) {
//            log.info("-----------------------------------");
//            TraceDataVO traceDataVO = new TraceDataVO();
//            traceDataVO.setSubActionLabel("test");
//            traceDataVO.setUrl("hello");
//            iAsyncTaskService.saveKeyValueDataToRedis("planner-open" + i, traceDataVO);
//        }
//        Thread.sleep(5000);
////        for (int i = 0; i < 50; i++) {
////            TraceDataVO traceDataVO = new TraceDataVO();
////            traceDataVO.setActionName("test");
////            traceDataVO.setUrl("hello");
////            iAsyncTaskService.saveKeyValueDataToRedis("planner-save" + i, traceDataVO);
////        }
//    }
    @Autowired
    private IGlobalCache iGlobalCache;
    @Test
    public void testRedis() {
        List<String> list = new ArrayList<>();
        list.add("123");

        iGlobalCache.lSetAll("testRedis", list, 300);
    }
}
