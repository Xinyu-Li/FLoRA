package com.monash.flora_backend.config;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.SchedulingConfigurer;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.scheduling.config.ScheduledTaskRegistrar;

/**
 * 定时任务
 */
@Slf4j
@Configuration
@EnableScheduling
@AllArgsConstructor
public class ScheduleTaskConfig implements SchedulingConfigurer {

//    private final IAsyncTaskService iAsyncTaskService;
//    private final ITraceDataService iTraceDataService;

    @Override
    public void configureTasks(ScheduledTaskRegistrar taskRegistrar) {
        ThreadPoolTaskScheduler threadPoolTaskScheduler = new ThreadPoolTaskScheduler();
        threadPoolTaskScheduler.setPoolSize(10);
        threadPoolTaskScheduler.setThreadNamePrefix("my-scheduled-task-pool-");
        threadPoolTaskScheduler.initialize();
        taskRegistrar.setTaskScheduler(threadPoolTaskScheduler);
    }



    /**
     * 每20秒执行一次 存储log
     */
    /*
    @Scheduled(cron = "0/20 * * * * ?")
    public void loadLogFromRedisToDb() {
        try {
            boolean result1 = iAsyncTaskService.saveTraceDataFromRedisToDb("trace-");
            log.info("save planner log to db: " + result1);
        } catch (RedisConnectionFailureException e) {
            log.info("loadLogFromRedisToDb-----redis connection error");
        } catch (Exception e) {
            e.printStackTrace();
        }
//        boolean result2 = iAsyncTaskService.saveTraceDataFromRedisToDb("timer-");
//        boolean result3 = iAsyncTaskService.saveTraceDataFromRedisToDb("trace-essay-");
//        boolean result4 = iAsyncTaskService.saveTraceDataFromRedisToDb("trace-page-");
//        boolean result5 = iAsyncTaskService.saveTraceDataFromRedisToDb("trace-annotation-");
//        boolean result6 = iAsyncTaskService.saveTraceDataFromRedisToDb("trace-search-annotation-");


//        log.info("save timer log to db: " + result2);
//        log.info("save essay log to db: " + result3);
//        log.info("save page log to db: " + result4);
//        log.info("save annotation log to db: " + result5);
//        log.info("save annotation log to db: " + result6);

    }

    @Scheduled(cron = "0/30 * * * * ?")
    public void loadTraceExtraLogFromRedisToDB() {
        try{
            boolean result7 = iAsyncTaskService.saveTraceExtraDataFromRedisToDb("extra-trace-");
            log.info("save extra-trace log to db: " + result7);
        } catch (RedisConnectionFailureException e) {
            log.info("loadTraceExtraLogFromRedisToDB-----redis connection error");
        } catch (Exception e) {
            e.printStackTrace();
        }

    }



    @Scheduled(cron = "0/10 * * * * ?")
    public void loadEssayDataFromRedisToDb() {
        try{
            boolean result = iAsyncTaskService.saveEssayDataFromRedisToDb("essay-save-content-");
            log.info("save essay data to db: " + result);
        } catch (RedisConnectionFailureException e) {
            log.info("loadEssayDataFromRedisToDb-----redis connection error");
        } catch (Exception e) {
            e.printStackTrace();
        }

    }*/

    /**
     * 每天凌晨2点清空一次 MyConstant Map
     * 将这两个map 放入Redis中，这样就不需要定时删除任务了
     */
//    @Scheduled(cron = "0 0 2 * * ?")
//    public void emptyMyConstantMap() {
//        MyConstant.USER_INSTRUMENTATION_TOOLS_USAGE_MAP.clear();
//        MyConstant.USER_READING_REREADING_MAP.clear();
//    }

}
