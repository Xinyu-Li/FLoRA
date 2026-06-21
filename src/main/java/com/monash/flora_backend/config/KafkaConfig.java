package com.monash.flora_backend.config;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.kafka.KafkaProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.core.*;

/**
 * ClassName: KafkaConfig
 * Description:
 *
 * @author Xinyu Li
 * @since 2/23/2023 11:53 AM
 */
@Configuration
@EnableConfigurationProperties(KafkaProperties.class)
@EnableKafka
@RequiredArgsConstructor
public class KafkaConfig {
    //此时kafkaProperties 已经注入了配置文件的值
    private final KafkaProperties kafkaProperties;
    private final long KAFKA_IDLE_TIME = 180000L;
//    private final IAsyncTaskService iAsyncTaskService;

    //    @Bean
//    public ReplyingKafkaTemplate<String, String, String> replyingKafkaTemplate(ProducerFactory<String, String> factory, ConcurrentMessageListenerContainer<String, String> container) {
//        return new ReplyingKafkaTemplate<>(factory, container);
//    }
    @Bean
    public KafkaTemplate<String, String> kafkaTemplate() {
        return new KafkaTemplate<>(producerFactory());
    }

    private ProducerFactory<String, String> producerFactory() {
        return new DefaultKafkaProducerFactory<>(kafkaProperties.buildProducerProperties());
    }

    private ConsumerFactory<String, String> consumerFactory() {
        return new DefaultKafkaConsumerFactory<>(kafkaProperties.buildConsumerProperties());
    }
    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, String> batchFactory(ConsumerFactory<String, String> consumerFactory) {
        ConcurrentKafkaListenerContainerFactory<String, String> factory =
                new ConcurrentKafkaListenerContainerFactory<>();
        factory.setConsumerFactory(consumerFactory);

        // 启用批量监听
        factory.setBatchListener(true);

        factory.getContainerProperties().setIdleEventInterval(KAFKA_IDLE_TIME); // 120秒空闲

        // 其他额外配置...
        // 例如: factory.getContainerProperties().setAckMode(ContainerProperties.AckMode.MANUAL);

        return factory;
    }

//    @Bean
//    public KafkaListenerEndpointRegistry kafkaListenerEndpointRegistry() {
//        return new KafkaListenerEndpointRegistry();
//    }

    /*@KafkaListener(topics = {MyConstant.KAFKA_TOPIC_TRACE_DATA})
    public void listenConsumer111(List<ConsumerRecord<String, String>> recordList) {
        List<TraceData> traceDataList = new ArrayList<>();
        List<TraceDataVO> leavePageTraceDataVOList = new ArrayList<>();
        List<TraceDataVO> tryOutToolsTraceDataVOList = new ArrayList<>();
        recordList.forEach(record -> {
            if (record.value().contains("mousemoveData") || record.value().contains("mousewheelData")) {
                //是extra trace data
//                TraceExtraDataVO traceExtraDataVO = JSON.parseObject(record.value(), TraceExtraDataVO.class);
                TraceExtraDataVO traceExtraDataVO = JSONUtil.toBean(record.value(), TraceExtraDataVO.class);

                String[] tempUrlElements = iTraceDataService.checkUrlRelevant(traceExtraDataVO.getUrl()).split(":::");
                String actionLabelForAllReading = tempUrlElements[0];
                String subActionLabelForAllReading;
                if ("INSTRUCTION".equals(actionLabelForAllReading)) {
                    subActionLabelForAllReading = tempUrlElements[1];
                } else {
                    subActionLabelForAllReading = tempUrlElements[1] + (iGlobalCache.hasKey(traceExtraDataVO.getUserId() + "-page-viewed-" + traceExtraDataVO.getUrl()) ? "_REREADING" : "_READING");
                }

                if (traceExtraDataVO.getMousemoveData() != null) {
                    traceExtraDataVO.getMousemoveData().forEach(s -> {
                        if (!"".equals(s)) {
                            TraceData traceData = MyBeanCopyUtils.copyBean(traceExtraDataVO, TraceData.class);
//                        log.info(s);
                            String[] elements = s.split(":::");


                            if (elements[5].equals("TABLE_OF_CONTENT") || elements[5].equals("PAGE_NAVIGATION")) {
                                traceData.setSubActionLabel(elements[5]);
                                traceData.setActionLabel("NAVIGATION");
                            } else {
                                traceData.setSubActionLabel(subActionLabelForAllReading);
                                traceData.setActionLabel(actionLabelForAllReading);
                            }
                            traceData.setSaveTime(elements[6]);
                            traceData.setPageEvent("MOUSE_MOVE");
                            traceData.setTargetObject(elements[0]);
                            traceData.setInstantEvent("NO_INSTANT_EVENT");

                            traceData.setScreenX(elements[1]);
                            traceData.setScreenY(elements[2]);
                            traceData.setClientX(elements[3]);
                            traceData.setClientY(elements[4]);

                            traceData.setEventValue("");
                            traceDataList.add(traceData);
                        }
                    });
                }

                if (traceExtraDataVO.getMousewheelData() != null) {
                    traceExtraDataVO.getMousewheelData().forEach(s -> {
                        TraceData traceData = MyBeanCopyUtils.copyBean(traceExtraDataVO, TraceData.class);
//                    log.info(traceData.toString());
                        String[] elements = s.split(":::");

                        if (elements[6].equals("TABLE_OF_CONTENT")  || elements[6].equals("PAGE_NAVIGATION")) {
                            traceData.setSubActionLabel(elements[6]);
                            traceData.setActionLabel("NAVIGATION");
                        } else {
                            traceData.setSubActionLabel(subActionLabelForAllReading);
                            traceData.setActionLabel(actionLabelForAllReading);
                        }
                        traceData.setSaveTime(elements[7]);
                        traceData.setPageEvent("MOUSE_WHEEL");
                        traceData.setTargetObject(elements[0]);
                        traceData.setInstantEvent("NO_INSTANT_EVENT");

                        traceData.setScreenX(elements[2]);
                        traceData.setScreenY(elements[3]);
                        traceData.setClientX(elements[4]);
                        traceData.setClientY(elements[5]);

                        traceData.setEventValue("SCROLL_DIST:::" + elements[1]);
                        traceDataList.add(traceData);
                    });
                }
            } else {
//                TraceDataVO traceDataVO = JSON.parseObject(record.value(), TraceDataVO.class);
                TraceDataVO traceDataVO = JSONUtil.toBean(record.value(), TraceDataVO.class);


                boolean result = iTraceDataService.addSubActionLabel(traceDataVO);

                // 因为TRY_OUT_TOOLS 对所有工具应该只发生一次
//                if (!traceDataVO.getSource().equals("TIMER") && traceDataVO.getSubActionLabel().equals("TRY_OUT_TOOLS")) { //只包含所有工具的，不会包含鼠标移动的部分
//
//                    tryOutToolsTraceDataVOList.add(traceDataVO);
//                }
                // 为了修改leave page之前的所有 mouse move wheel action，
//                if (traceDataVO.getSource().equals("PAGE") && traceDataVO.getInstantEvent().equals("LEAVE_PAGE")) {
//                    leavePageTraceDataVOList.add(traceDataVO);
//                }
                if (result) {
                    traceDataList.add(MyBeanCopyUtils.copyBean(traceDataVO, TraceData.class));
                } else {
                    //放入redis缓存起来等之后再修改
                }

                if (!MyConstant.cacheTryOutToolsOpenList.isEmpty()) {
                    traceDataList.addAll(MyBeanCopyUtils.copyBeanList(MyConstant.cacheTryOutToolsOpenList, TraceData.class));
                }
            }

        });
        iTraceDataService.saveBatch(traceDataList);  //存入database
//        iTraceDataService.mySaveBatch(traceDataList);  //存入database
        //同时放入redis 缓存
        for (TraceData traceData : traceDataList) {
            iGlobalCache.lSet(MyConstant.REDIS_TEMP_TRACE_DATA_LIST + traceData.getUserId() + "-" + traceData.getCourseId(), JSONUtil.toJsonStr(traceData), MyConstant.REDIS_EXPIRE_SECONDS);
        }


//        leavePageTraceDataVOList.forEach(iTraceDataService::updateMouseMoveSubActionLabel); //修改数据库中所有 leave page action 之前的 mouse event 为 leave page 的action
//        iTraceDataService.updateBodyMouseMoveSubActionLabel(leavePageTraceDataVOList);
        // 因为TRY_OUT_TOOLS 对所有工具应该只发生一次
//        iTraceDataService.updateOpenToolsSubActionLabel(tryOutToolsTraceDataVOList);

//        //添加所有 action label 到redis 中
//        traceDataList.forEach(t -> {
//            if (t.getSubActionLabel().equals("NOT_USE")) {
//
//            } else {
//                String redisKey = MyConstant.REDIS_ACTION_LABEL_LIST + t.getUserId() + "-" + t.getCourseId();
//
//                String value = t.getId() + "--" + t.getSubActionLabel();
//                if (iTraceDataService.isRedisListExist(redisKey)) {
//                    String lastItem = iTraceDataService.getLastFromRedisList(redisKey);
//                    String lastSubActionLabel = lastItem.split("--")[1];
//                    if (!lastSubActionLabel.equals(t.getSubActionLabel())) { //不一样就添加，一样就不添加
//                        iTraceDataService.saveToRedisList(redisKey, value);
//                    }
//                } else {
//                    iTraceDataService.saveToRedisList(redisKey, value);
//                }
//            }
//        });
    }*/

//    @KafkaListener(topics = {MyConstant.KAFKA_TOPIC_TRACE_DATA})
//    public void listenConsumer(List<ConsumerRecord<String, String>> recordList) {
////        log.info("kafka listenConsumer record list size: " + recordList.size());
//
//        List<TraceDataVO> traceDataVOList = new ArrayList<>();
//        recordList.forEach(record -> {
//            TraceDataVO traceDataVO = JSON.parseObject(record.value(), TraceDataVO.class);
//            iTraceDataService.addSubActionLabel(traceDataVO);
//            traceDataVOList.add(traceDataVO);
//        });
//
//        List<TraceData> actionList = MyBeanCopyUtils.copyBeanList(traceDataVOList, TraceData.class);
//        iTraceDataService.saveBatch(actionList);
//        //添加所有 action label 到redis 中
//        actionList.forEach(t -> iTraceDataService.saveToRedisList(MyConstant.REDIS_ACTION_LABEL_LIST + t.getUserId() + "-" + t.getCourseId(), t.getId() + "--" + t.getSubActionLabel()));
//    }
//
//
//    @KafkaListener(topics = {MyConstant.KAFKA_TOPIC_TRACE_EXTRA_DATA})
//    public void listenConsumer2(List<ConsumerRecord<String, String>> recordList) {
////        log.info("kafka listenConsumer2 record list size2: " + recordList.size());
//
//        List<TraceExtraDataVO> traceExtraDataVOList = new ArrayList<>();
//
//        recordList.forEach(record -> {
//            traceExtraDataVOList.add(JSON.parseObject(record.value(), TraceExtraDataVO.class));
//        });
//
//        List<TraceData> traceDataList = new ArrayList<>();
//        for (TraceExtraDataVO traceExtraDataVO : traceExtraDataVOList) {
//
//            if (traceExtraDataVO.getMousemoveData() != null) {
//                traceExtraDataVO.getMousemoveData().forEach(s -> {
//                    if (!"".equals(s)) {
//                        TraceData traceData = MyBeanCopyUtils.copyBean(traceExtraDataVO, TraceData.class);
////                        log.info(s);
//                        String[] elements = s.split(":::");
//
//                        traceData.setSubActionLabel(elements[5]);
//                        traceData.setSaveTime(elements[6]);
//                        traceData.setPageEvent("MOUSE_MOVE");
//                        traceData.setTargetObject(elements[0]);
//                        traceData.setInstantEvent("NO_INSTANT_EVENT");
//
//                        traceData.setScreenX(elements[1]);
//                        traceData.setScreenY(elements[2]);
//                        traceData.setClientX(elements[3]);
//                        traceData.setClientY(elements[4]);
//
//                        traceData.setEventValue("");
//                        traceDataList.add(traceData);
//                    }
//                });
//            }
//
//            if (traceExtraDataVO.getMousewheelData() != null) {
//                traceExtraDataVO.getMousewheelData().forEach(s -> {
//                    TraceData traceData = MyBeanCopyUtils.copyBean(traceExtraDataVO, TraceData.class);
////                    log.info(traceData.toString());
//                    String[] elements = s.split(":::");
//                    traceData.setSubActionLabel(elements[6]);
//                    traceData.setSaveTime(elements[7]);
//                    traceData.setPageEvent("MOUSE_WHEEL");
//                    traceData.setTargetObject(elements[0]);
//                    traceData.setInstantEvent("NO_INSTANT_EVENT");
//
//                    traceData.setScreenX(elements[2]);
//                    traceData.setScreenY(elements[3]);
//                    traceData.setClientX(elements[4]);
//                    traceData.setClientY(elements[5]);
//
//                    traceData.setEventValue("SCROLL_DIST:::" + elements[1]);
//                    traceDataList.add(traceData);
//                });
//            }
//        }
//
//        iTraceDataService.saveBatch(traceDataList);  //存入database
////        log.info(traceDataList.size() + "");
//        //添加所有 action label 到redis 中，此处可能会在时间上有细微偏差，因为extra的数据不是实时发送的，而是采集一段时间后整体发送
//        //此处只添加一次 TABLE_OF_CONTENT 到redis list中，合并所有table_of_content
//        traceDataList.stream().filter(t -> "TABLE_OF_CONTENT".equals(t.getSubActionLabel()))
//                .forEach(t -> iTraceDataService.saveToRedisList(
//                        MyConstant.REDIS_ACTION_LABEL_LIST + t.getUserId() + "-" + t.getCourseId(),
//                        t.getId() + "--" + t.getSubActionLabel()));
//    }


}
