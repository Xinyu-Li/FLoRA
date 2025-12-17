package com.monash.flora_backend.config;

import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.json.JSONUtil;
import com.monash.flora_backend.config.cache.IGlobalCache;
import com.monash.flora_backend.constant.MyConstant;
import com.monash.flora_backend.controller.vo.EssayVO;
import com.monash.flora_backend.controller.vo.TraceDataVO;
import com.monash.flora_backend.dao.entity.TraceData;
import com.monash.flora_backend.service.IEssayService;
import com.monash.flora_backend.service.ITraceDataService;
import com.monash.flora_backend.service_func.ActionAndProcessService;
import com.monash.flora_backend.service_func.OrderedFutures;
import com.monash.flora_backend.service_func.SentenceClassificationBatcher;
import com.monash.flora_backend.util.MyBeanCopyUtils;
import com.monash.flora_backend.util.MyUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.context.ApplicationListener;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.config.KafkaListenerEndpointRegistry;
import org.springframework.kafka.event.ListenerContainerIdleEvent;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;


@RequiredArgsConstructor
@Slf4j
@Component
public class KafkaListeners implements ApplicationListener<ListenerContainerIdleEvent> {

    private final ITraceDataService iTraceDataService;
    private final IEssayService iEssayService;
    private final IGlobalCache iGlobalCache;
    private final ActionAndProcessService actionAndProcessService;
    private List<TraceData> traceDataBuffer = new ArrayList<>();

    private final SentenceClassificationBatcher batcher;
    private final OrderedFutures orderedFutures = new OrderedFutures();
    private String tempSubActionValue = "";

//    private TraceData tempCurrentTrace;

    // private final ReadWriteLock rwLock = new ReentrantReadWriteLock();
    // private Instant lastReceived = Instant.now();

    private final KafkaListenerEndpointRegistry registry;


//    private synchronized List<TraceData> getTraceDataButter() {
//        return new ArrayList<>(traceDataBuffer);
//    }

    private void checkAddSimplifiedSubAction(TraceData traceData) {
        String redisKey = MyConstant.REDIS_SIMPLIFIED_SUB_ACTION_LIST + traceData.getUserId() + "-" + traceData.getCourseId();
        String value = traceData.getId() + "--" + traceData.getSubActionLabel();
        if (iGlobalCache.getOrderedEventSize(redisKey) >= 3) {
            Set<String> lastItemSet = iGlobalCache.getOrderedEvent(redisKey, -1, -1);
            Set<String> secondLastItemSet = iGlobalCache.getOrderedEvent(redisKey, -2, -2);
            Set<String> thirdLastItemSet = iGlobalCache.getOrderedEvent(redisKey, -3, -3);

            if (CollUtil.isEmpty(lastItemSet) || CollUtil.isEmpty(secondLastItemSet) || CollUtil.isEmpty(thirdLastItemSet)) {
                throw new RuntimeException("redis, REDIS_SIMPLIFIED_SUB_ACTION_LIST, lastItemSet-secondLastItemSet-thirdLastItemSet error");
            }

            String lastItem = lastItemSet.iterator().next();
            String lastSubActionLabel = lastItem.split("--")[1];
            String secondLastItem = secondLastItemSet.iterator().next();
            String secondLastSubActionLabel = secondLastItem.split("--")[1];
            String thirdLastItem = thirdLastItemSet.iterator().next();
            String thirdLastSubActionLabel = thirdLastItem.split("--")[1];

            if (!StrUtil.equals(traceData.getSubActionLabel(), lastSubActionLabel)) { //和最后的不一样就添加
                if (tempSubActionValue != null) {
                    iGlobalCache.addOrderedEvent(redisKey, value, Double.parseDouble(traceData.getSaveTime()), MyConstant.REDIS_EXPIRE_SECONDS); // 添加缓存的临时值
                    tempSubActionValue = null;
                }
                iGlobalCache.addOrderedEvent(redisKey, value, Double.parseDouble(traceData.getSaveTime()), MyConstant.REDIS_EXPIRE_SECONDS);
            } else if (StrUtil.equals(traceData.getSubActionLabel(), lastSubActionLabel) && !StrUtil.equals(traceData.getSubActionLabel(), secondLastSubActionLabel)) { // 和最后的一样，和倒数第二的不一样 也添加
                iGlobalCache.addOrderedEvent(redisKey, value, Double.parseDouble(traceData.getSaveTime()), MyConstant.REDIS_EXPIRE_SECONDS);
            } else if (StrUtil.equals(traceData.getSubActionLabel(), lastSubActionLabel) && StrUtil.equals(traceData.getSubActionLabel(), secondLastSubActionLabel)) { // 和最后的一样，和倒数第二的也一样，不添加
                tempSubActionValue = value; // 保留值，未被添加，直到遇到下一个不一样的才添加
            }
        } else {
            iGlobalCache.addOrderedEvent(redisKey, value, Double.parseDouble(traceData.getSaveTime()), MyConstant.REDIS_EXPIRE_SECONDS);
        }
    }


    private void clearTraceDataBuffer() {
        if (traceDataBuffer == null) {
            log.info("traceDataBuffer is null, re-initialized to empty list");
            traceDataBuffer = new ArrayList<>();
        }
        if (CollUtil.isEmpty(traceDataBuffer)) {
            return;
        }

        try {
            iTraceDataService.saveBatch(traceDataBuffer);  //存入database
        } catch (Exception e) {
            log.error("Exception happen in iTraceDataService.saveBatch:------------------output-----------------");
            traceDataBuffer.forEach(t -> {
                log.info(t.toString());
            });
            log.info("-------------------------------------Exception iTraceDataService.saveBatch end-----------------------------------------------");
        }
//        log.info("finish save data");


        for (TraceData traceData : traceDataBuffer) {
            try {
                String redisTraceKey = MyConstant.REDIS_TEMP_TRACE_DATA_LIST + traceData.getUserId() + "-" + traceData.getCourseId();
//                String redisSimplifiedTraceKey = MyConstant.REDIS_SIMPLIFIED_TEMP_TRACE_DATA_LIST + traceData.getUserId() + "-" + traceData.getCourseId();
                //放入redis 之后会自动根据时间戳排序
                if (traceData.getSaveTime() == null) {
                    traceData.setSaveTime(MyUtils.getCurrentTimestamp());
                }
                iGlobalCache.addOrderedEvent(redisTraceKey, JSONUtil.toJsonStr(traceData), Double.parseDouble(traceData.getSaveTime()), MyConstant.REDIS_EXPIRE_SECONDS);

                //放入精简的subaction log 进入redis  之后会自动根据时间戳排序
//                checkAddSimplifiedTrace(traceData);


                /*//放入精简的trace log 进入redis, 此处检验的就是从 原始log 中取出的 trace log
                if (iGlobalCache.getOrderedEventSize(redisTraceKey) >= 3 && tempCurrentTrace != null) {
                    boolean checkAddSimplifiedTraceResult = checkAddSimplifiedTrace(tempCurrentTrace, //上一轮的trace
                            iGlobalCache.getOrderedEvent(redisTraceKey, -1, -1).iterator().next(), // 当前trace
                            iGlobalCache.getOrderedEvent(redisTraceKey, -3, -3).iterator().next()); // 上两轮的 trace
                    if (checkAddSimplifiedTraceResult) {
                        //如果返回true，表示可以添加，此时获取中间值，即处于-2 位置的值，加入redisSimplifiedTrace  redis
                        iGlobalCache.addOrderedEvent(redisSimplifiedTraceKey, JSONUtil.toJsonStr(tempCurrentTrace), Double.parseDouble(tempCurrentTrace.getSaveTime()), MyConstant.REDIS_EXPIRE_SECONDS);
                    }
                }
                tempCurrentTrace = traceData; // 这种写法有问题，会获取不同人的 trace*/
                // 方便之后验证某个sub action 是否发生过
                String subActionExistKey = MyConstant.REDIS_ACTION_EXIST_SET + traceData.getUserId() + "_" + traceData.getCourseId();
                iGlobalCache.sSetAndTime(subActionExistKey, MyConstant.REDIS_EXPIRE_SECONDS, traceData.getSubActionLabel());
                if (traceData.getSubActionLabel() == null) {
                    throw new RuntimeException("trace data getSubActionLabel null");
                }
            } catch (Exception e) {
                log.info("clearTraceDataBuffer-----------------------traceData error:" + traceData);
                e.printStackTrace();
                continue;
            }


            // 获取 SAVE_PLANNER 事件和 选择哪种 strategy -- 此处是为了后续判断planner 选择的时候用的
            if (Objects.equals(traceData.getSubActionLabel(), "SAVE_PLANNER")) {
                if (!StrUtil.isEmpty(traceData.getEventValue()) && traceData.getEventValue().startsWith("SELECT_INDEX")) {
                    try {
                        String plannerSelectIndexKey = MyConstant.REDIS_PLANNER_SELECT_INDEX + traceData.getUserId() + "_" + traceData.getCourseId();
                        iGlobalCache.set(plannerSelectIndexKey, traceData.getEventValue().split(":::")[1], MyConstant.REDIS_EXPIRE_SECONDS);
                    } catch (Exception e) {
                        log.info("if (t.getSubActionLabel().equals(\"SAVE_PLANNER\")) if (!StrUtil.isEmpty(t.getEventValue()) && t.getEventValue().startsWith(\"SELECT_INDEX\")) {");
                    }
                }
            }
        }
//        log.info("finish save to redis");



        traceDataBuffer.clear();
//        log.info("finish clear buffer");

    }

//    /**
//     * 定时任务来监控 Buffer，如果超过120秒都没有新数据，则清空buffer
//     */
//    @Scheduled(fixedRate = 120000) //120000 TODO 测试用，之后修改外120秒
//    public void checkInactivity() {
//        if (traceDataBuffer.isEmpty()) {
//            return;
//        } else if (Duration.between(lastReceived, Instant.now()).getSeconds() >= 120) { //连续120秒未监听到新数据 TODO
//            log.info("stop receiving new data for 120 seconds");
//            log.info("pause listener traceDataListener");
//            this.pauseListener("traceDataListener");
//            log.info("-------------into fixed rated process for clearTraceDataBuffer");
//            clearTraceDataBuffer();
//            this.resumeListener("traceDataListener");
//            log.info("resume listener traceDataListener");
//        }
//    }

    /**
     * 当kafka 空闲超过180 秒后执行。
     * @param event
     */
    @Override
    public void onApplicationEvent(ListenerContainerIdleEvent event) {
        log.info("Kafka Listener has been idle for " + event.getIdleTime() + " ms, checking for new messages...");
        if (CollUtil.isEmpty(traceDataBuffer)) {
            return;
        }
        this.pauseListener("traceDataListener");
        log.info("-------------into fixed rated process for clearTraceDataBuffer");
        // 清空trace buffer
        clearTraceDataBuffer();


        this.resumeListener("traceDataListener");
        log.info("resume listener traceDataListener");
    }

    // 暂停监听器
    public void pauseListener(String listenerId) {
        registry.getListenerContainer(listenerId).pause();
    }

    // 恢复监听器
    public void resumeListener(String listenerId) {
        registry.getListenerContainer(listenerId).resume();
    }

    private void checkNonCloseToolsEvent(TraceDataVO traceDataVO) {
        //当离开页面时候，需要检查是否有try_out_tools 没有被更新,针对没有被close 的 tools，所有存在的OPEN event 都表示在跳转页面时候没有出现CLOSE event
        Set<String> tryOutToolKeys = iGlobalCache.getKeys("tool-used-" + traceDataVO.getUserId() + "_" + traceDataVO.getCourseId() + "_*_OPEN");
        tryOutToolKeys.forEach(ty-> {
            String closeTy = ty.replace("_OPEN", "_CLOSE");
            //TODO FIX 这里导致快速切换页面时候丢失log的 bug 被修复。 FIX 之前代码没有  || ty.contains("TIMER")
            if (iGlobalCache.hasKey(closeTy) || ty.contains("TIMER")) { // 如果有close key，则表示OPEN event 已经在Close event内部处理过了，则继续下一轮循环
                return;
            }
            // 执行到此处，表示OPEN event 发生，但是CLOSE event 不存在，则需要单独处理判断 OPEN event是否是 TRY_OUT_TOOLS
            long leavePageTime = Long.parseLong(traceDataVO.getSaveTime());
            log.info("----------------------" + iGlobalCache.get(ty));
            TraceDataVO traceDataVOOpen = JSONUtil.toBean((String) iGlobalCache.get(ty), TraceDataVO.class);
            long toolUseLength = leavePageTime - Long.parseLong(traceDataVOOpen.getSaveTime());
            if (toolUseLength < 3000) {
                traceDataVOOpen.setSubActionLabel("TRY_OUT_TOOLS");
                traceDataVOOpen.setActionLabel("NAVIGATION");
            } else {
                //TODO check 此处是否重复设置 sub action label
                traceDataVOOpen.setSubActionLabel(traceDataVOOpen.getInstantEvent() + "_" + traceDataVOOpen.getSource());
                traceDataVOOpen.setActionLabel(traceDataVOOpen.getSource());
            }
            traceDataBuffer.add(MyBeanCopyUtils.copyBean(traceDataVOOpen, TraceData.class));

        });
    }

    @KafkaListener(id = "traceDataListener", topics = {MyConstant.KAFKA_TOPIC_TRACE_DATA}, containerFactory = "batchFactory")
    public void listenConsumerTraceData(List<ConsumerRecord<String, String>> recordList) {

        recordList.forEach(record -> {
//            log.info("Kafka listener -------: " + record.value());
            TraceDataVO traceDataVO = JSONUtil.toBean(record.value(), TraceDataVO.class);
//            log.info("Kafka listener (before): " + traceDataVO.toString());
            if (traceDataVO == null) {
                return;
            }
            String toolAccessTimesKey = "tool-used-" + traceDataVO.getUserId() + "_" + traceDataVO.getCourseId() + "_" + traceDataVO.getSource();
            actionAndProcessService.processTimeEventForStartAndEnd(traceDataVO);

            List<TraceData> sentenceClassificationTraceDataList = new ArrayList<>();

            if (Objects.equals(traceDataVO.getSubActionLabel(), "READING")) {
                String[] tempUrlElements = iTraceDataService.checkUrlRelevant(traceDataVO.getUrl()).split(":::"); // return "READING:::RELEVANT" or "INSTRUCTION:::TASK_OVERVIEW"
                String actionLabelForAllReading = tempUrlElements[0];
                String subActionLabelForAllReading;
                if ("INSTRUCTION".equals(actionLabelForAllReading)) {
                    subActionLabelForAllReading = tempUrlElements[1];
                } else { // 此处可以解决页面是否是re reading or first time reading
//                    subActionLabelForAllReading = tempUrlElements[1] + (iGlobalCache.hasKey(traceDataVO.getUserId() + "-page-viewed-" + traceDataVO.getUrl()) ? "_REREADING" : "_READING");

                    String accessTimesKey = traceDataVO.getUserId() + "-page-viewed-" + traceDataVO.getUrl();

                    if (iGlobalCache.hasKey(accessTimesKey)) { //表明此时是用户不是第一次访问改网页
                        subActionLabelForAllReading = tempUrlElements[1] + "_REREADING"; // not first time reading
                    } else {// 表明此时是用户第一次访问改网页。 是否是第一次访问的判定在change page 时候决定
//                        iGlobalCache.set(accessTimesKey, "1", MyConstant.REDIS_EXPIRE_SECONDS); //此处在change page 时候才需要 加入redis
                        subActionLabelForAllReading = tempUrlElements[1] + "_READING"; // first time reading  all the first time reading are labelled as reading
                    }
                    // change page click reading
                    if (traceDataVO.getSource().equals("PAGE") && traceDataVO.getInstantEvent().startsWith("CHANGE_PAGE_CLICK_")) {
                        // traceDataVO.getInstantEvent().equals("LEAVE_PAGE") 这两种事件应该是同时触发的，偶尔有可能leave page 不触发
                        // 当change page 发生的时候，如果之前页面没有被标注过Reading，则标注进入redis。 如果已经有，之后检测reading页面时候都标注为re-reading
                        if (!iGlobalCache.hasKey(accessTimesKey)) {
                            iGlobalCache.set(accessTimesKey, "1", MyConstant.REDIS_EXPIRE_SECONDS); //7200秒之后 关于用户访问网页的 redis 记录自动删除
                        }
                        checkNonCloseToolsEvent(traceDataVO);
                    }

                }
                traceDataVO.setSubActionLabel(subActionLabelForAllReading);
                traceDataVO.setActionLabel(actionLabelForAllReading);
            } else if (StrUtil.equals(traceDataVO.getSource(), "TIMER") && StrUtil.equals(traceDataVO.getInstantEvent(), "OPEN") && !iGlobalCache.hasKey(toolAccessTimesKey + "_OPEN")) {
                iGlobalCache.set(toolAccessTimesKey + "_OPEN", MyUtils.getCurrentTimestamp(), MyConstant.REDIS_EXPIRE_SECONDS);
                traceDataVO.setSubActionLabel("TRY_OUT_TOOLS");
                traceDataVO.setActionLabel("NAVIGATION");
            } else if (!StrUtil.equals(traceDataVO.getSource(), "TIMER") && StrUtil.equals(traceDataVO.getInstantEvent(), "OPEN") && !iGlobalCache.hasKey(toolAccessTimesKey + "_OPEN")) {
                log.info("-------------------save into redis, not to database");
                iGlobalCache.set(toolAccessTimesKey + "_OPEN", JSONUtil.toJsonStr(traceDataVO), MyConstant.REDIS_EXPIRE_SECONDS);
                return; // 终止本轮循环
            } else if (!StrUtil.equals(traceDataVO.getSource(), "TIMER") && StrUtil.equals(traceDataVO.getInstantEvent(), "CLOSE") && !iGlobalCache.hasKey(toolAccessTimesKey + "_CLOSE")) {

                log.info("tool use length:" + traceDataVO.getEventValue().split(":::")[1]);
                log.info("------------" + (Long.parseLong(traceDataVO.getEventValue().split(":::")[1]) < 3000));
                // 从redis 缓存中取出 之前所存的OPEN log
                TraceDataVO traceDataVOOpen = JSONUtil.toBean((String) iGlobalCache.get(toolAccessTimesKey + "_OPEN"), TraceDataVO.class);

                // 小于3秒且从未使用过 则标识try out tools, 打开直接会直接加入到redis 缓存中，所以此处只能检测CLOSE，不能检测OPEN，因为OPEN无论是不是TRY_OUT_TOOLS 都会被加入到redis
                if (Long.parseLong(traceDataVO.getEventValue().split(":::")[1]) < 3000) {
                    traceDataVO.setSubActionLabel("TRY_OUT_TOOLS");
                    traceDataVO.setActionLabel("NAVIGATION");

                    traceDataVOOpen.setSubActionLabel("TRY_OUT_TOOLS");
                    traceDataVOOpen.setActionLabel("NAVIGATION");
//                    MyConstant.cacheTryOutToolsOpenList.add(traceDataVOOpen);
                    log.info("detect try out tools----------------------" + toolAccessTimesKey);

//                    iGlobalCache.del(toolAccessTimesKey + "_OPEN");
                }

                iGlobalCache.set(toolAccessTimesKey + "_CLOSE", "1", MyConstant.REDIS_EXPIRE_SECONDS);
                traceDataBuffer.add(MyBeanCopyUtils.copyBean(traceDataVOOpen, TraceData.class));

//                else { //第一次使用但是使用时长多于3秒, 则不需要修改，因为界面传来的数据已经包含subaction和action
//                    traceDataVO.setSubActionLabel(traceDataVO.getInstantEvent() + "_" + traceDataVO.getSource());
//                    traceDataVO.setActionLabel(traceDataVO.getSource()); //因为是tools open/close 所以可以直接用source
//                }
            } else if (traceDataVO.getSource().equals("PAGE") && traceDataVO.getInstantEvent().startsWith("CHANGE_PAGE_CLICK_")) { // change page click navigation
                // traceDataVO.getInstantEvent().equals("LEAVE_PAGE") 这两种事件应该是同时触发的，偶尔有可能leave page 不触发
                // 当change page 发生的时候，如果之前页面没有被标注过Reading，则标注进入redis。 如果已经有，之后检测reading页面时候都标注为re-reading
                String accessTimesKey = traceDataVO.getUserId() + "-page-viewed-" + traceDataVO.getUrl();
                if (!iGlobalCache.hasKey(accessTimesKey)) {
                    iGlobalCache.set(accessTimesKey, "1", MyConstant.REDIS_EXPIRE_SECONDS); //7200秒之后 关于用户访问网页的 redis 记录自动删除
                }
                checkNonCloseToolsEvent(traceDataVO);
            }

            if (traceDataVO.getSource().equals("ESSAY") && traceDataVO.getPageEvent().equals("WRITE_SENTENCE")) {
                String[] tempWriteSentence = traceDataVO.getEventValue().split(":::");
                String writeSentence = tempWriteSentence.length > 1 ? tempWriteSentence[1] : "";
                /* ----------------------original---------------
                List<String> sentenceClassificationResults = iUserChatgptLogService.getWritingSentenceClassification(writeSentence); // ['O.T.2', 'O.T.2']

                sentenceClassificationResults.forEach(classificationResult -> {
                    TraceData tempTraceData = MyBeanCopyUtils.copyBean(traceDataVO, TraceData.class);
                    tempTraceData.setSubActionLabel(tempTraceData.getSubActionLabel() + "_" + classificationResult);
                    sentenceClassificationTraceDataList.add(tempTraceData);
                });*/
                /* -----------------------没有批处理 sentence classification
                CompletableFuture<List<TraceData>> fut =
                        CompletableFuture.supplyAsync(() -> {
                                    // 1) HTTP 调用
                                    List<String> cls = iUserChatgptLogService
                                            .getWritingSentenceClassification(writeSentence);
                                    // 2) 组装 TraceData
                                    return cls.stream()
                                            .map(c -> { TraceData t = MyBeanCopyUtils.copyBean(traceDataVO, TraceData.class);
                                                t.setSubActionLabel(t.getSubActionLabel()+"_"+c);
                                                return t; })
                                            .collect(Collectors.toList());
                                }, httpPool)
                                .exceptionally(ex -> {        // 防止异常导致永远 isDone=false
                                    log.error("HTTP 调用失败",ex);
                                    return Collections.emptyList();
                                });
                orderedFutures.put(fut);             // 把 future 丢进去，记住顺序*/
                log.info("writeSentence:" + writeSentence);
                log.info("Kafka listener writeSentence: " + traceDataVO.toString());
                if (!Objects.equals(MyConstant.SRL_MODEL, "copes")) { // 需要计算copes
                    orderedFutures.put(CompletableFuture.completedFuture(
                            Collections.singletonList(MyBeanCopyUtils.copyBean(traceDataVO, TraceData.class))));
                } else {

                    /***-----批处理sentence classification---*/
                    // 1) 把句子交给 batcher，返回一个 future
                    CompletableFuture<List<String>> futCls = batcher.submit(writeSentence);

                    // 2) 把“分类结果 → TraceData 列表”的转换挂在 future 后面
                    CompletableFuture<List<TraceData>> futTrace =
                            futCls.thenApply(clsList -> clsList.stream()
                                            .map(cls -> {
                                                TraceData t = MyBeanCopyUtils.copyBean(traceDataVO, TraceData.class); // 此处需要复制traceDataVO，因为如果有粘贴多句话，此时每句话都有一个OR,OT,OA, 所以复制多次
                                                t.setSubActionLabel(t.getSubActionLabel() + "_" + cls);
                                                return t;
                                            })
                                            .collect(Collectors.toList()))
                                    .exceptionally(ex -> {
                                        log.error("批量分类失败", ex);
                                        return Collections.singletonList(
                                                MyBeanCopyUtils.copyBean(traceDataVO, TraceData.class)); // 回退原始
                                    });

                    orderedFutures.put(futTrace);   // 仍然按消费顺序排队
                }
            } else {
                // 不需要 HTTP 的记录直接包一层已完成的 future
                orderedFutures.put(CompletableFuture.completedFuture(
                        Collections.singletonList(MyBeanCopyUtils.copyBean(traceDataVO, TraceData.class))));
            }




            /*//            log.info("Kafka listener (after): " + traceDataVO.toString());
            if (!sentenceClassificationTraceDataList.isEmpty()) {
                traceDataBuffer.addAll(sentenceClassificationTraceDataList);
            } else {
                traceDataBuffer.add(MyBeanCopyUtils.copyBean(traceDataVO, TraceData.class));
            }*/
        });

        // 把已经完成的 Future 按序写入 buffer
        orderedFutures.flushTo(traceDataBuffer);

        if (traceDataBuffer.size() >= MyConstant.BATCH_SIZE) {
            log.info("------------into batch process, start clearTraceDataBuffer-----------traceDataBuffer size:{}", traceDataBuffer.size());
            clearTraceDataBuffer();
        }
//        lastReceived = Instant.now();
    }

    @KafkaListener(topics = {MyConstant.KAFKA_TOPIC_ESSAY})
    public void listenConsumerEssay(List<ConsumerRecord<String, String>> recordList) {
        log.info("kafka listenConsumer Essay record listenConsumerEssay: " + recordList.size());

        List<EssayVO> essayVOList = new ArrayList<>();
        recordList.forEach(record -> {
//            essayVOList.add(JSON.parseObject(record.value(), EssayVO.class));
            essayVOList.add(JSONUtil.toBean(record.value(), EssayVO.class));
        });
        iEssayService.saveBatch(essayVOList);
    }
}
