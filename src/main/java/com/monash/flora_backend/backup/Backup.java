package com.monash.flora_backend.backup;

import com.monash.flora_backend.constant.MyConstant;

import java.util.Map;

/**
 * ClassName: Backup
 * Description:
 *
 * @author Xinyu Li
 * @since 4/9/2023 5:18 PM
 */
public class Backup {

    //    @PostMapping("/trace-planner") //recorded
//    public JSONResult tracePlanner(TraceDataVO traceDataVO) {
//        iAsyncTaskService.saveKeyValueDataToRedis("trace-planner-" + traceDataVO.getUserId() + "-" + traceDataVO.getSaveTime(), traceDataVO);
//
//        return JSONResult.ok();
//    }

    /**
     * write essay keyup 事件 不需要阻止事件传播，在body level 不需捕获keyup事件
     * @param traceDataVO
     * @return
     */
//    @PostMapping("/trace-essay")
//    public JSONResult traceEssay(TraceDataVO traceDataVO) {
//        iAsyncTaskService.saveKeyValueDataToRedis("trace-essay-" + traceDataVO.getUserId() + "-" + traceDataVO.getSaveTime(), traceDataVO);
//        return JSONResult.ok();
//    }

//    @PostMapping("/trace-page-click")
//    public JSONResult tracePage(TraceDataVO traceDataVO) {
//        iAsyncTaskService.saveKeyValueDataToRedis("trace-page-click-" + traceDataVO.getUserId() + "-" + traceDataVO.getSaveTime(), traceDataVO);
//        return JSONResult.ok();
//    }





//    @PostMapping("/trace-annotation-label")
//    public JSONResult traceAnnotationLabel(TraceDataVO traceDataVO) {
//        iAsyncTaskService.saveKeyValueDataToRedis("trace-annotation-label-" + traceDataVO.getUserId() + "-" + traceDataVO.getSaveTime(), traceDataVO);
//
//        return JSONResult.ok();
//    }
//
//    @PostMapping("/trace-annotation")
//    public JSONResult traceAnnotation(TraceDataVO traceDataVO) {
//        iAsyncTaskService.saveKeyValueDataToRedis("trace-annotation-" + traceDataVO.getUserId() + "-" + traceDataVO.getSaveTime(), traceDataVO);
//        return JSONResult.ok();
//    }
//
//
//    @PostMapping("/trace-search-annotation")
//    public JSONResult traceAnnotationSearch(TraceDataVO traceDataVO) {
//        iAsyncTaskService.saveKeyValueDataToRedis("trace-search-annotation-" + traceDataVO.getUserId() + "-" + traceDataVO.getSaveTime(), traceDataVO);
//
//        return JSONResult.ok();
//    }


    /**
     * When select text, then click mouse
     * @param traceDataVO
     * @return
     */
//    @PostMapping("/trace-select-click")
//    public JSONResult traceExtraSelect(TraceDataVO traceDataVO) {
//        iAsyncTaskService.saveKeyValueDataToRedis("trace-select-click-" + traceDataVO.getUserId() + "-" + traceDataVO.getSaveTime(), traceDataVO);
//        return JSONResult.ok();
//    }



//    @PostMapping("/trace-off-task")
//    public JSONResult traceOffTask(TraceDataVO traceDataVO) {
//        iAsyncTaskService.saveKeyValueDataToRedis("trace-off-task-" + traceDataVO.getUserId() + "-" + traceDataVO.getSaveTime(), traceDataVO);
//        return JSONResult.ok();
//    }


//    @PostMapping("/trace-checklist")
//    public JSONResult traceChecklist(TraceDataVO traceDataVO) {
//        iAsyncTaskService.saveKeyValueDataToRedis("trace-checklist-" + traceDataVO.getUserId() + '-' + traceDataVO.getSaveTime(), traceDataVO);
//        return JSONResult.ok();
//    }

//    @PostMapping("/trace-openai")
//    public JSONResult traceOpenai(TraceDataVO traceDataVO) {
//        iAsyncTaskService.saveKeyValueDataToRedis("trace-openai-" + traceDataVO.getUserId() + '-' + traceDataVO.getSaveTime(), traceDataVO);
//        return JSONResult.ok();
//    }
//
//    @PostMapping("/trace-grammarly")
//    public JSONResult traceGrammarly(TraceDataVO traceDataVO) {
//        iAsyncTaskService.saveKeyValueDataToRedis("trace-grammarly-" + traceDataVO.getUserId() + '-' + traceDataVO.getSaveTime(), traceDataVO);
//        return JSONResult.ok();
//    }





//    public void addSubActionLabelForTryOutToolsTimer(TraceDataVO traceDataVO) {
//        String accessTimesKey = traceDataVO.getUserId() + "-tool-used-" + "TIMER_OPEN";
//
//        if (globalCache.hasKey(accessTimesKey)) {  // 不是第一次打开
//            traceDataVO.setSubActionLabel("TIMER_OPEN");
//        } else {
//            globalCache.set(accessTimesKey, "1", 86400);
//            traceDataVO.setSubActionLabel("TRY_OUT_TOOLS");
//        }
//
//
//
//        if (MyConstant.USER_INSTRUMENTATION_TOOLS_USAGE_MAP.containsKey(traceDataVO.getUserId())) {
//            if (MyConstant.USER_INSTRUMENTATION_TOOLS_USAGE_MAP.get(traceDataVO.getUserId()).containsKey("TIMER_OPEN")) {
//                // 不是第一次打开
//            } else {
//                // 第一次打开
//                Map<String, TraceDataVO> oneUserUseTools = new HashMap<>();
//                oneUserUseTools.put(traceDataVO.getSource() + "_OPEN", null);
//                MyConstant.USER_INSTRUMENTATION_TOOLS_USAGE_MAP.put(traceDataVO.getUserId(), oneUserUseTools);
//                traceDataVO.setSubActionLabel("TRY_OUT_TOOLS");
////                saveToRedisList(MyConstant.REDIS_ACTION_LABEL_LIST, "TRY_OUT_TOOLS");
//            }
//        } else if ("OPEN".equals(traceDataVO.getInstantEvent())) { //第一次打开
//            Map<String, TraceDataVO> oneUserUseTools = new HashMap<>();
//            oneUserUseTools.put(traceDataVO.getSource() + "_OPEN", null);
//            MyConstant.USER_INSTRUMENTATION_TOOLS_USAGE_MAP.put(traceDataVO.getUserId(), oneUserUseTools);
//            traceDataVO.setSubActionLabel("TRY_OUT_TOOLS");
////            saveToRedisList(MyConstant.REDIS_ACTION_LABEL_LIST, "TRY_OUT_TOOLS");
//        }
//    }
//
//    /**
//     * Cover
//     * Try_out_tools for ANNOTATION, SEARCH_ANNOTATION, ESSAY, PLANNER, GRAMMARLY
//     *
//     * @param traceDataVO
//     * @param traceDataVOList
//     */
//    public void addSubActionLabelForToolEvents(TraceDataVO traceDataVO, List<TraceDataVO> traceDataVOList) {
//        Optional<String> subActionLabel = Optional.ofNullable(MyConstant.SUB_ACTION_LABEL_MAP.get(traceDataVO.getSource() + "_" + traceDataVO.getInstantEvent()));
//        //********************** 给traceDataVO 打上 sub action label，根据前端传来的数据 ************************
////        subActionLabel.ifPresent(traceDataVO::setSubActionLabel); //每次setsubactionlabel时候，都将该label同时加入redis 备用
//        if (subActionLabel.isPresent()) {
//            traceDataVO.setSubActionLabel(subActionLabel.get());
////            saveToRedisList(MyConstant.REDIS_ACTION_LABEL_LIST, subActionLabel.get());
//        }
//
//        if (MyConstant.INSTRUMENTATION_TOOLS_OPEN_CLOSE_EVENT.contains(traceDataVO.getInstantEvent()) &&
//                MyConstant.INSTRUMENTATION_TOOLS.contains(traceDataVO.getSource())) { // 如果是关于 instrumentation 工具, 并且instant event 只是 OPEN 或 CLOSE
//            String key = traceDataVO.getSource() + "_" + traceDataVO.getInstantEvent();
//
//            // 判断要不要加上Try_Out_Tools
//            if (MyConstant.USER_INSTRUMENTATION_TOOLS_USAGE_MAP.containsKey(traceDataVO.getUserId())) {
//                Map<String, TraceDataVO> oneUserUseTools = MyConstant.USER_INSTRUMENTATION_TOOLS_USAGE_MAP.get(traceDataVO.getUserId()); //
//                if (oneUserUseTools.containsKey(key)) {
//                    //必须保证是第一次使用该工具，所以如果不是第一次使用，则 do nothing
//                    traceDataVOList.add(traceDataVO);
//                } else { //证明用户是第一次使用 这个工具
//                    if ("CLOSE".equals(traceDataVO.getInstantEvent())) {
//                        if (Long.parseLong(traceDataVO.getEventValue().split(":::")[1]) < 3000) {  //使用时长不超过3秒,是try_out_tools
//                            TraceDataVO tempOpenTraceDataVO = oneUserUseTools.get(traceDataVO.getSource() + "_OPEN"); //获取open event，open event 存在map中，并未入库
//                            if (tempOpenTraceDataVO != null) {//如果不为空，则将instant event 是open 的 traceDataVO， 添加subactionlabel Try_out_tools
//                                tempOpenTraceDataVO.setSubActionLabel("TRY_OUT_TOOLS");
//                                log.info(traceDataVO.getSource() + "_OPEN is not null");
////                                saveToRedisList(MyConstant.REDIS_ACTION_LABEL_LIST, "TRY_OUT_TOOLS");
//                            } else {
//                                log.info(traceDataVO.getSource() + "_OPEN is null null null null null null null");
//                            }
//
//                            traceDataVO.setSubActionLabel("TRY_OUT_TOOLS"); //修改 instant event 是close 的 traceDataVO， 添加subactionlabel Try_out_tools
////                            saveToRedisList(MyConstant.REDIS_ACTION_LABEL_LIST, "TRY_OUT_TOOLS");
//                            traceDataVOList.add(tempOpenTraceDataVO);
//                        } else {
//                            TraceDataVO tempOpenTraceDataVO = oneUserUseTools.get(traceDataVO.getSource() + "_OPEN"); //获取open event，open event 存在map中，并未入库
//                            traceDataVOList.add(tempOpenTraceDataVO);
//                        }
//                        traceDataVOList.add(traceDataVO);
//                    } else {
//                        oneUserUseTools.put(key, traceDataVO); // instant event 是open 的 traceDataVO 在此处将 traceDataVO 存入 Map
////                        MyConstant.USER_INSTRUMENTATION_TOOLS_USAGE_MAP.put(traceDataVO.getUserId(), oneUserUseTools);// 此处不需要重新put，因为oneUserUseTools就是从map中获取的
//                    }
//                    log.info("有 userid instant event: {}", traceDataVO.getInstantEvent());
//                }
//            } else { //如果没有userid，证明是用户第一次使用所有工具
//                if ("OPEN".equals(traceDataVO.getInstantEvent())) {
//                    Map<String, TraceDataVO> oneUserUseTools = new HashMap<>();
//                    oneUserUseTools.put(key, traceDataVO);
//                    MyConstant.USER_INSTRUMENTATION_TOOLS_USAGE_MAP.put(traceDataVO.getUserId(), oneUserUseTools);
//                } else {
//                    log.info("--------------------------------Close event early than open event-----instant event:" + traceDataVO.getInstantEvent());
//                }
//                log.info("如果没有 userid instant event: {}", traceDataVO.getInstantEvent());
//            }
//        } else {
//            traceDataVOList.add(traceDataVO);
//        }
//    }

    /**
     * Sentence 1. Nowadays, the role of AI in education is limited in some tangible educational products.
     * error position: limited in
     * error correction: limited to
     * error explanation: The correct preposition to use with "limited" in this context is "to" instead of "in."
     * error type: preposition
     *
     * Sentence 2. More and more data are needed to make AI work better.
     * error position: no error                                     this could be n/a, N/A, none, NONE, no error, NO ERROR, or missing this line
     * error correction: N/A                                        this could be n/a, N/A, none, NONE, no error, NO ERROR, or missing this line
     * error explanation: N/A                                       this could be n/a, N/A, none, NONE, no error, NO ERROR, or missing this line
     * error type: N/A                                              this could be n/a, N/A, none, NONE, no error, NO ERROR, or missing this line
     *
     * Sentence 3. And the scaffolding is that the work is shared alone between the learner and some more knowledgeable other or agent.
     * error position: And the
     * error correction: The
     * error explanation: Starting a sentence with "And" is informal and not appropriate for an academic essay.
     * error type: conjunction
     *
     * Sentence 4. In addition, it also enables learning from the experience.
     * error position: the experience
     * error correction: experiences
     * error explanation: The plural form "experiences" is more appropriate in this context, as it refers to multiple learning experiences.
     * error type: noun
     *
     * Sentence 5. Scaffolding to optimize learning needs to acquire more knowledge.
     * error position: needs to acquire
     * error correction: requires
     * error explanation: The verb "requires" is more appropriate in this context, as it means "needs" or "necessitates."
     * error type: verb
     *
     * Sentence 6. Besides, as we all know, differentiation is a combination of careful progress monitoring and adapting instruction in response.
     * error position: no error
     * error correction: N/A
     * error explanation: N/A
     * error type: N/A
     *
     * Sentence 7. By this, students or learners could be divided into different groups by their teache according to their competence degree.
     * error position: teache
     * error correction: teacher
     * error explanation: The correct spelling is "teacher."
     * error type: spelling
     *
     * Sentence 8. In these groups, students can learn knowledge that they don't understand and make progress belonging to themselves.
     * error position: belonging to themselves
     * error correction: unique to them
     * error explanation: The phrase "unique to them" is more appropriate in this context, as it refers to the individual progress of each student.
     * error type: phrasing
     *
     * Sentence 9. Differentiation practices in the classroom will help students in their group process.
     * error position: group process
     * error correction: group learning process
     * error explanation: The phrase "group learning process" is clearer and more specific in this context.
     * error type: phrasing
     *
     * Sentence 10. Integration of three topics is very essential and all three are indispensable.
     * error position: no error
     * error correction: N/A
     * error explanation: N/A
     * error type: N/A
     *
     * Sentence 11. In the future education, the three should complement each other.
     * error position: future education
     * error correction: future of education
     * error explanation: The correct phrase is "future of education."
     * error type: phrasing
     *
     * Sentence 12. Respectively, there are great expectations for AI in education to help students and teachers work better.
     * error position: Respectively
     * error correction: Consequently
     * error explanation: "Consequently" is more appropriate in this context, as it indicates a result or consequence.
     * error type: adverb
     *
     * Sentence 13. To facilitate our independent and appropriate use in education in the future, we should learn more on how the scaffolding component skills work and so on.
     * error position: learn more on
     * error correction: learn more about
     * error explanation: The correct preposition to use with "learn more" is "about" instead of "on."
     * error type: preposition
     *
     * Sentence 14. Furthermore, differentiation should be paid more attention in education.
     * error position: paid more attention
     * error correction: given more attention
     * error explanation: The correct phrase is "given more attention."
     * error type: phrasing
     *
     * Sentence 15. Beyond that, the three should continue to innovate, so as to better serve the education and other industries in the future.
     * error position: no error
     * error correction: N/A
     * error explanation: N/A
     * error type: N/A
     *
     */

    public static String TEST_STRING = "Sentence 1. Nowadays, the role of AI in education is limited in some tangible educational products. \n" +
            "error position: limited in\n" +
            "error correction: limited to\n" +
            "error explanation: The preposition \"in\" is incorrect in this context. The correct preposition is \"to\" when referring to limitations.\n" +
            "error type: Preposition error\n" +
            "\n" +
            "Sentence 2. More and more data are needed to make AI work better. \n" +
            "error position: No error\n" +
            "error correction: N/A\n" +
            "error explanation: N/A\n" +
            "error type: N/A\n" +
            "\n" +
            "Sentence 3. And the scaffolding is that the work is shared alone between the learner and some more knowledgeable other or agent.\n" +
            "error position: And the\n" +
            "error correction: The\n" +
            "error explanation: Starting a sentence with \"And\" is informal and not appropriate for academic writing.\n" +
            "error type: Conjunction error\n" +
            "\n" +
            "Sentence 4. In addition, it also enables learning from the experience.\n" +
            "error position: the experience\n" +
            "error correction: experience\n" +
            "error explanation: The definite article \"the\" is not necessary in this context.\n" +
            "error type: Article error\n" +
            "\n" +
            "Sentence 5. Scaffolding to optimize learning needs to acquire more knowledge.\n" +
            "error position: No error\n" +
            "error correction: N/A\n" +
            "error explanation: N/A\n" +
            "error type: N/A\n" +
            "\n" +
            "Sentence 6. Besides, as we all know, differentiation is a combination of careful progress monitoring and adapting instruction in response.\n" +
            "error position: No error\n" +
            "error correction: N/A\n" +
            "error explanation: N/A\n" +
            "error type: N/A\n" +
            "\n" +
            "Sentence 7. By this, students or learners could be divided into different groups by their teache according to their competence degree.\n" +
            "error position: teache\n" +
            "error correction: teacher\n" +
            "error explanation: The word \"teache\" is a typo and should be corrected to \"teacher.\"\n" +
            "error type: Typographical error\n" +
            "\n" +
            "Sentence 8. In these groups, students can learn knowledge that they don't understand and make progress belonging to themselves.\n" +
            "error position: belonging to themselves\n" +
            "error correction: specific to their needs\n" +
            "error explanation: The phrase \"belonging to themselves\" is unclear and should be replaced with \"specific to their needs\" to convey the intended meaning.\n" +
            "error type: Clarity error\n" +
            "\n" +
            "Sentence 9. Differentiation practices in the classroom will help students in their group process.\n" +
            "error position: group process\n" +
            "error correction: group learning process\n" +
            "error explanation: The term \"group process\" is unclear and should be replaced with \"group learning process\" to convey the intended meaning.\n" +
            "error type: Clarity error\n" +
            "\n" +
            "Sentence 10. Integration of three topics is very essential and all three are indispensable.\n" +
            "error position: No error\n" +
            "error correction: N/A\n" +
            "error explanation: N/A\n" +
            "error type: N/A\n" +
            "\n" +
            "Sentence 11. In the future education, the three should complement each other.\n" +
            "error position: future education\n" +
            "error correction: future of education\n" +
            "error explanation: The phrase \"future education\" should be replaced with \"future of education\" to convey the intended meaning.\n" +
            "error type: Preposition error\n" +
            "\n" +
            "Sentence 12. Respectively, there are great expectations for AI in education to help students and teachers work better.\n" +
            "error position: No error\n" +
            "error correction: N/A\n" +
            "error explanation: N/A\n" +
            "error type: N/A\n" +
            "\n" +
            "Sentence 13. To facilitate our independent and appropriate use in education in the future, we should learn more on how the scaffolding component skills work and so on.\n" +
            "error position: learn more on\n" +
            "error correction: learn more about\n" +
            "error explanation: The preposition \"on\" is incorrect in this context. The correct preposition is \"about\" when referring to learning more about a topic.\n" +
            "error type: Preposition error\n" +
            "\n" +
            "Sentence 14. Furthermore, differentiation should be paid more attention in education.\n" +
            "error position: paid more attention\n" +
            "error correction: given more attention\n" +
            "error explanation: The phrase \"paid more attention\" should be replaced with \"given more attention\" to convey the intended meaning.\n" +
            "error type: Collocation error\n" +
            "\n" +
            "Sentence 15. Beyond that, the three should continue to innovate, so as to better serve the education and other industries in the future.\n" +
            "error position: No error\n" +
            "error correction: N/A\n" +
            "error explanation: N/A\n" +
            "error type: N/A";

    public static Map<String, Map<String, String>> STUDY_PAGE_ID_AND_LABEL_MAP = Map.ofEntries(
            Map.entry("flora_demo", Map.ofEntries(
                    Map.entry("8", "TASK_REQUIREMENT"), Map.entry("9", "RUBRIC"), Map.entry("10", "RELEVANT"), Map.entry("11", "IRRELEVANT"), Map.entry("12", "RELEVANT"),
                    Map.entry("13", "IRRELEVANT"), Map.entry("14", "RELEVANT"), Map.entry("15", "RELEVANT"), Map.entry("16", "RELEVANT"), Map.entry("17", "RELEVANT"),
                    Map.entry("18", "RELEVANT"), Map.entry("19", "RELEVANT"), Map.entry("20", "IRRELEVANT"), Map.entry("21", "RELEVANT"), Map.entry("22", "IRRELEVANT"),
                    Map.entry("23", "RELEVANT"), Map.entry("24", "RELEVANT"), Map.entry("25", "IRRELEVANT"))
            ),
            Map.entry("flora_demo_revision", Map.ofEntries(
                    Map.entry("31", "TASK_REQUIREMENT"), Map.entry("32", "RUBRIC"), Map.entry("33", "RELEVANT"), Map.entry("34", "IRRELEVANT"), Map.entry("35", "RELEVANT"),
                    Map.entry("36", "IRRELEVANT"), Map.entry("37", "RELEVANT"), Map.entry("38", "RELEVANT"), Map.entry("39", "RELEVANT"), Map.entry("40", "RELEVANT"),
                    Map.entry("41", "RELEVANT"), Map.entry("42", "RELEVANT"), Map.entry("43", "IRRELEVANT"), Map.entry("44", "RELEVANT"), Map.entry("45", "IRRELEVANT"),
                    Map.entry("46", "RELEVANT"), Map.entry("47", "RELEVANT"), Map.entry("48", "IRRELEVANT"))
            ),
            Map.entry("flora_unisa_paper_1", Map.ofEntries(Map.entry("68", "RELEVANT"))),
            Map.entry("flora_unisa_paper_2", Map.ofEntries(Map.entry("105", "RELEVANT"))),
            Map.entry("flora_unisa_paper_3", Map.ofEntries(Map.entry("95", "RELEVANT"))),
            Map.entry("flora_unisa_paper_4", Map.ofEntries(Map.entry("96", "RELEVANT"))),
            Map.entry("flora_unisa_paper_5", Map.ofEntries(Map.entry("97", "RELEVANT"))),

            Map.entry("flora_unisa_paper_6", Map.ofEntries(Map.entry("98", "RELEVANT"))),
            Map.entry("flora_unisa_paper_7", Map.ofEntries(Map.entry("99", "RELEVANT"))),
            Map.entry("flora_unisa_paper_8", Map.ofEntries(Map.entry("100", "RELEVANT"))),
            Map.entry("flora_unisa_paper_9", Map.ofEntries(Map.entry("101", "RELEVANT"))),
            Map.entry("flora_unisa_paper_10", Map.ofEntries(Map.entry("102", "RELEVANT"))),
            Map.entry("flora_unisa_paper_11", Map.ofEntries(Map.entry("103", "RELEVANT"))),
            Map.entry("flora_unisa_paper_12", Map.ofEntries(Map.entry("104", "RELEVANT"))),

            Map.entry("flora_beijing_online", Map.ofEntries(
                    Map.entry("7", "TASK_REQUIREMENT"), Map.entry("8", "RUBRIC"), Map.entry("9", "RELEVANT"), Map.entry("10", "IRRELEVANT"), Map.entry("11", "RELEVANT"),
                    Map.entry("12", "IRRELEVANT"), Map.entry("13", "RELEVANT"), Map.entry("14", "RELEVANT"), Map.entry("15", "RELEVANT"), Map.entry("16", "RELEVANT"),
                    Map.entry("17", "RELEVANT"), Map.entry("18", "RELEVANT"), Map.entry("19", "IRRELEVANT"), Map.entry("20", "RELEVANT"), Map.entry("21", "IRRELEVANT"),
                    Map.entry("22", "RELEVANT"), Map.entry("23", "RELEVANT"), Map.entry("24", "IRRELEVANT"))
            ),
            Map.entry("flora_beijing_lab", Map.ofEntries(
                    Map.entry("35", "TASK_REQUIREMENT"), Map.entry("36", "RUBRIC"), Map.entry("37", "RELEVANT"), Map.entry("38", "IRRELEVANT"), Map.entry("39", "RELEVANT"),
                    Map.entry("40", "IRRELEVANT"), Map.entry("41", "RELEVANT"), Map.entry("42", "RELEVANT"), Map.entry("43", "RELEVANT"), Map.entry("44", "RELEVANT"),
                    Map.entry("45", "RELEVANT"), Map.entry("46", "RELEVANT"), Map.entry("47", "IRRELEVANT"), Map.entry("48", "RELEVANT"), Map.entry("49", "IRRELEVANT"),
                    Map.entry("50", "RELEVANT"), Map.entry("51", "RELEVANT"), Map.entry("52", "IRRELEVANT"))
            ),
            Map.entry("flora_beijing_lab_revision", Map.ofEntries(
                    Map.entry("61", "TASK_REQUIREMENT"), Map.entry("62", "RUBRIC"), Map.entry("63", "RELEVANT"), Map.entry("64", "IRRELEVANT"), Map.entry("65", "RELEVANT"),
                    Map.entry("66", "IRRELEVANT"), Map.entry("67", "RELEVANT"), Map.entry("68", "RELEVANT"), Map.entry("69", "RELEVANT"), Map.entry("70", "RELEVANT"),
                    Map.entry("71", "RELEVANT"), Map.entry("72", "RELEVANT"), Map.entry("73", "IRRELEVANT"), Map.entry("74", "RELEVANT"), Map.entry("75", "IRRELEVANT"),
                    Map.entry("76", "RELEVANT"), Map.entry("77", "RELEVANT"), Map.entry("78", "IRRELEVANT"))
            ),

            Map.entry("cella_lighthouse_1", Map.ofEntries(
                    Map.entry("284", "TASK_REQUIREMENT"), Map.entry("285", "TASK_REQUIREMENT"), Map.entry("286", "RUBRIC"), Map.entry("287", "RELEVANT"), Map.entry("288", "IRRELEVANT"),
                    Map.entry("289", "RELEVANT"),
                    Map.entry("290", "IRRELEVANT"), Map.entry("291", "RELEVANT"), Map.entry("292", "RELEVANT"), Map.entry("293", "RELEVANT"), Map.entry("294", "RELEVANT"),
                    Map.entry("295", "RELEVANT"), Map.entry("296", "RELEVANT"), Map.entry("297", "IRRELEVANT"), Map.entry("298", "RELEVANT"), Map.entry("299", "IRRELEVANT"),
                    Map.entry("300", "RELEVANT"), Map.entry("301", "RELEVANT"), Map.entry("302", "IRRELEVANT"))
            ),
            Map.entry("cella_lighthouse_2", Map.ofEntries(
                    Map.entry("303", "TASK_REQUIREMENT"), Map.entry("304", "TASK_REQUIREMENT"), Map.entry("305", "RUBRIC"), Map.entry("306", "RELEVANT"), Map.entry("307", "IRRELEVANT"),
                    Map.entry("308", "RELEVANT"),
                    Map.entry("309", "IRRELEVANT"), Map.entry("310", "RELEVANT"), Map.entry("311", "RELEVANT"), Map.entry("312", "RELEVANT"), Map.entry("313", "RELEVANT"),
                    Map.entry("314", "RELEVANT"), Map.entry("315", "RELEVANT"), Map.entry("316", "IRRELEVANT"), Map.entry("317", "RELEVANT"), Map.entry("318", "IRRELEVANT"),
                    Map.entry("319", "RELEVANT"), Map.entry("320", "RELEVANT"), Map.entry("321", "IRRELEVANT"))
            ),
            Map.entry("cella_lighthouse_3", Map.ofEntries(
                    Map.entry("322", "TASK_REQUIREMENT"), Map.entry("323", "TASK_REQUIREMENT"), Map.entry("324", "RUBRIC"), Map.entry("325", "RELEVANT"), Map.entry("326", "IRRELEVANT"),
                    Map.entry("327", "RELEVANT"),
                    Map.entry("328", "IRRELEVANT"), Map.entry("329", "RELEVANT"), Map.entry("330", "RELEVANT"), Map.entry("331", "RELEVANT"), Map.entry("332", "RELEVANT"),
                    Map.entry("333", "RELEVANT"), Map.entry("334", "RELEVANT"), Map.entry("335", "IRRELEVANT"), Map.entry("336", "RELEVANT"), Map.entry("337", "IRRELEVANT"),
                    Map.entry("338", "RELEVANT"), Map.entry("339", "RELEVANT"), Map.entry("340", "IRRELEVANT"))
            ),
            Map.entry("cella_monash", Map.ofEntries(
                    Map.entry("182", "TASK_REQUIREMENT"), Map.entry("183", "RUBRIC"), Map.entry("184", "RELEVANT"), Map.entry("185", "IRRELEVANT"), Map.entry("186", "RELEVANT"),
                    Map.entry("187", "IRRELEVANT"), Map.entry("188", "RELEVANT"), Map.entry("189", "RELEVANT"), Map.entry("190", "RELEVANT"), Map.entry("191", "RELEVANT"),
                    Map.entry("192", "RELEVANT"), Map.entry("193", "RELEVANT"), Map.entry("194", "IRRELEVANT"), Map.entry("195", "RELEVANT"), Map.entry("196", "IRRELEVANT"),
                    Map.entry("197", "RELEVANT"), Map.entry("198", "RELEVANT"), Map.entry("199", "IRRELEVANT"))
            ),
            Map.entry("cella_tum", Map.ofEntries(
                    Map.entry("402", "TASK_REQUIREMENT"), Map.entry("403", "RUBRIC"), Map.entry("404", "RELEVANT"), Map.entry("405", "IRRELEVANT"), Map.entry("406", "RELEVANT"),
                    Map.entry("407", "IRRELEVANT"), Map.entry("408", "RELEVANT"), Map.entry("409", "RELEVANT"), Map.entry("410", "RELEVANT"), Map.entry("411", "RELEVANT"),
                    Map.entry("412", "RELEVANT"), Map.entry("413", "RELEVANT"), Map.entry("414", "IRRELEVANT"), Map.entry("415", "RELEVANT"), Map.entry("416", "IRRELEVANT"),
                    Map.entry("417", "RELEVANT"), Map.entry("418", "RELEVANT"), Map.entry("419", "IRRELEVANT"))
            ),
            Map.entry("cella_training", Map.ofEntries(
                    Map.entry("399", "RELEVANT"),
                    Map.entry("400", "RELEVANT"),
                    Map.entry("401", "RELEVANT")
            ))

//            Map.entry("cella_oulu", Map.ofEntries(
//                    Map.entry("31", "TASK_REQUIREMENT"), Map.entry("", "RUBRIC"), Map.entry("", "RELEVANT"), Map.entry("", "IRRELEVANT"), Map.entry("", "RELEVANT"),
//                    Map.entry("", "IRRELEVANT"), Map.entry("", "RELEVANT"), Map.entry("", "RELEVANT"), Map.entry("", "RELEVANT"), Map.entry("", "RELEVANT"),
//                    Map.entry("", "RELEVANT"), Map.entry("", "RELEVANT"), Map.entry("", "IRRELEVANT"), Map.entry("", "RELEVANT"), Map.entry("", "IRRELEVANT"),
//                    Map.entry("", "RELEVANT"), Map.entry("", "RELEVANT"), Map.entry("48", "IRRELEVANT"))
//            )
    );
//    public static Map<String, int[]> courseIdMap = Map.ofEntries(
//            Map.entry("4", new int[] {8, 25})
//    );

//    public static String baseUrl =  "http://localhost:8088/";
//    public static String proxyUrl = "http://localhost:8080/";
//    public static String websocketBaseUrl = "ws://localhost:8080/";

    //    public static Map<Long, String> USER_ESSAY_START_MAP = new HashMap<>();
//    public static String USE_VIDEO_TOOL = "true";
//    public static String USE_TIMER_TOOL = "true";
//    public static String USE_ANNOTATION_TOOL = "true";
//    public static String USE_SCAFFOLDING_TOOL = "true";
//    public static String USE_ESSAY_WRITING_TOOL = "true";
//    public static String USE_PLANNER_TOOL = "true";
//    public static String USE_GRAMMARLY_FEEDBACK_TOOL = "true";
//    public static String USE_CHECKLIST_FEEDBACK_TOOL = "true";
//    public static String USE_OPENAI_FEEDBACK_TOOL = "true";
//    public static String UNLIMITED_TIME = "true";
//    public static String ANNOTATION_LABEL_LIST = "";
//    public static String ANNOTATION_LABEL_COLOR_LIST = "";

//    public static int TOTAL_MINUTES = 120; // elapse time or countdown 模式
//    public static int CLASSIFICATION_MODEL = 2; // 1 model from steve 2 law model 3 other model
//    public static String SPLIT_TASK_TO_3_PARTS = "true";
//    public static int FIRST_PART_TIME = 15;
//    public static int SECOND_PART_TIME = 90;
//    public static int THIRD_PART_TIME = 15;

//    public static String USE_CLASSIFICATION_TOOL = "true";
//    public static String MDL_CONFIG_PLUGINS_GENERICO_TEMPLATE_2_ATTR_NAME = "template_2";
//    public static String MDL_CONFIG_PLUGINS_GENERICO_TEMPLATE_2_KEY_ATTR_NAME = "templatekey_2";
//    public static String MDL_CONFIG_PLUGINS_GENERICO_TEMPLATE_2_NAME_ATTR_NAME = "templatename_2";
//    public static String MDL_CONFIG_PLUGINS_GENERICO_TEMPLATE_2_KEY = "floratoolbox";
//    public static String MDL_CONFIG_PLUGINS_GENERICO_TEMPLATE_2_NAME = "floratoolbox";
//    //Not use Chatgpt and Scaffolding
//    public static String MDL_CONFIG_PLUGINS_GENERICO_TEMPLATE_2_BODY = "";
//
//
//
//    public static String MDL_CONFIG_PLUGINS_GENERICO_TEMPLATE_3_ATTR_NAME = "template_3";
//    public static String MDL_CONFIG_PLUGINS_GENERICO_TEMPLATE_3_KEY_ATTR_NAME = "templatekey_3";
//    public static String MDL_CONFIG_PLUGINS_GENERICO_TEMPLATE_3_NAME_ATTR_NAME = "templatename_3";
//    public static String MDL_CONFIG_PLUGINS_GENERICO_TEMPLATE_3_KEY = "floratoolbox_use_chatgpt";
//    public static String MDL_CONFIG_PLUGINS_GENERICO_TEMPLATE_3_NAME = "floratoolbox_use_chatgpt";
//    //use all the tools
//    public static String MDL_CONFIG_PLUGINS_GENERICO_TEMPLATE_3_BODY = "";




/*


    //此map是为了询问Chatgpt 问题时，对不同study有不同instruction 需要
        MyConstant.instructionForChatgptMap.put("cella_oulu_task2_ai_in_edu_groupA", "You are a helpful assistant and please answers questions based on the provided text."); // 只需要gpt scaffold，此处不需要
        MyConstant.instructionForChatgptMap.put("cella_oulu_task1_biology_groupA", "You are a helpful assistant and please answers questions based on the provided text."); // 只需要gpt scaffold，此处不需要
        MyConstant.instructionForChatgptMap.put("cella_oulu_task2_ai_in_edu_groupB", "You are a helpful assistant and please answers questions based on the provided text."); // 只需要gpt scaffold，此处不需要
        MyConstant.instructionForChatgptMap.put("cella_oulu_task1_biology_groupB", "You are a helpful assistant and please answers questions based on the provided text."); // 只需要gpt scaffold，此处不需要
        MyConstant.instructionForChatgptMap.put("cella_oulu_task2_ai_in_edu_groupC", "You are a helpful assistant and please answers questions based on the provided text."); // 只需要gpt scaffold，此处不需要
        MyConstant.instructionForChatgptMap.put("cella_oulu_task1_biology_groupC", "You are a helpful assistant and please answers questions based on the provided text."); // 只需要gpt scaffold，此处不需要
        MyConstant.instructionForChatgptMap.put("flora_beijing_lab", "You are a helpful assistant that answers questions based on the provided text. You can only give suggestions for revision but cannot write or summarise the whole essay for students. You can only understand English. If you receive any non-English question or questions that contain non-English language, reply 'Sorry I cannot understand your question, please use English.");
        MyConstant.instructionForChatgptMap.put("flora_huadong_course1", "You are a helpful assistant and please answers questions based on the provided text.");
        MyConstant.instructionForChatgptMap.put("flora_beijing_ucas_23aut_task_lab", "You are an experienced English academic writing teacher. You are requested to answer student's questions during a reading and writing task.\n" +
                "\n" +
                "In this reading and writing task, the goal is to write a vision essay that describes the future of education. Students need to describe how they envision learning in a school in 2035.  Students need to read the materials in this learning environment that provide information about three important topics: 1. Artificial intelligence and its application; 2. What differentiation is and how it is applied in the classroom context; 3. The process of scaffolding and how it optimizes students learning. The main goal of the essay writing task is to integrate these topics into a vision essay that describes learning in a school in 2035, and tests student's academic writing skills. \n" +
                "\n" +
                "The essay rubric, with a total score of 25 points, evaluates essays based on four global criteria and content-specific aspects. The global criteria include word count (200-400 words, 2 points), basic writing skills (mature draft, no low-level errors, 0-2 points), academic writing skills (norms of academic writing, 0-4 points), and originality (original opinion, 0-2 points). The content evaluation focuses on the role of AI in education, scaffolding to optimize learning, differentiation practices in the classroom, integration of three topics, and the future vision of education in 2035. Each content criterion is scored from 0 to 3, based on the depth and application of the provided information.\n" +
                "\n" +
                "Please note: You cannot write the whole essay for students, and you need to reject any cheating requests that are against academic honesty. You cannot revise the essay directly for students. You can only give suggestions, examples, revising tips and comments to help students. You can only understand English. You can only provide feedback to students in English. You need to scaffold students' learning, facilitate their self-regulated learning, and trigger metacognition-level engagement.");
        MyConstant.instructionForChatgptMap.put("flora_demo", "You are a helpful assistant and please answers questions based on the provided text.");
        MyConstant.instructionForChatgptMap.put("flora_demo_medicine", "You are a helpful assistant and please answers questions based on the provided text.");

    // 此map 时为了将不同study的 main task 背景材料获取
        MyConstant.backgroundTextForChatgptMap.put("cella_oulu_task2_ai_in_edu_groupA", "oulu_main_task2_ai_in_education.pdf");
        MyConstant.backgroundTextForChatgptMap.put("cella_oulu_task1_biology_groupA", "oulu_main_task1_biology.pdf");
        MyConstant.backgroundTextForChatgptMap.put("cella_oulu_task2_ai_in_edu_groupB", "oulu_main_task2_ai_in_education.pdf");
        MyConstant.backgroundTextForChatgptMap.put("cella_oulu_task1_biology_groupB", "oulu_main_task1_biology.pdf");
        MyConstant.backgroundTextForChatgptMap.put("cella_oulu_task2_ai_in_edu_groupC", "oulu_main_task2_ai_in_education.pdf");
        MyConstant.backgroundTextForChatgptMap.put("cella_oulu_task1_biology_groupC", "oulu_main_task1_biology.pdf");
        MyConstant.backgroundTextForChatgptMap.put("flora_beijing_lab", "flora_beijing_lab_background_text.pdf");
        MyConstant.backgroundTextForChatgptMap.put("flora_huadong_course1", "flora_huadong_india.pdf");
        MyConstant.backgroundTextForChatgptMap.put("flora_beijing_ucas_23aut_task_lab", "flora_beijing_lab_background_text.pdf");
        MyConstant.backgroundTextForChatgptMap.put("cella_monash", "cella_monash_background.pdf");
        MyConstant.backgroundTextForChatgptMap.put("flora_demo_medicine", "cella_monash_main_task2_medicine.pdf");

    // 此map 是为了针对不同study 发送gpt scaffold时候获取背景材料的
        MyConstant.COPES_CLASSIFY_BACKGROUND_FILE_MAP.put("cella_oulu_task2_ai_in_edu_groupA", "oulu_main_task2_ai_in_education.docx");
        MyConstant.COPES_CLASSIFY_BACKGROUND_FILE_MAP.put("cella_oulu_task1_biology_groupA", "oulu_main_task1_biology.docx");
        MyConstant.COPES_CLASSIFY_BACKGROUND_FILE_MAP.put("cella_oulu_task2_ai_in_edu_groupB", "oulu_main_task2_ai_in_education.docx");
        MyConstant.COPES_CLASSIFY_BACKGROUND_FILE_MAP.put("cella_oulu_task1_biology_groupB", "oulu_main_task1_biology.docx");
        MyConstant.COPES_CLASSIFY_BACKGROUND_FILE_MAP.put("cella_oulu_task2_ai_in_edu_groupC", "oulu_main_task2_ai_in_education.docx");
        MyConstant.COPES_CLASSIFY_BACKGROUND_FILE_MAP.put("cella_oulu_task1_biology_groupC", "oulu_main_task1_biology.docx");
        MyConstant.COPES_CLASSIFY_BACKGROUND_FILE_MAP.put("flora_beijing_lab", "");
        MyConstant.COPES_CLASSIFY_BACKGROUND_FILE_MAP.put("flora_huadong_course1", "");
        MyConstant.COPES_CLASSIFY_BACKGROUND_FILE_MAP.put("flora_demo", "CELLA_main_task_reading.docx");
        MyConstant.COPES_CLASSIFY_BACKGROUND_FILE_MAP.put("flora_demo_medicine", "cella_monash_main_task2_medicine.docx");

    // 此map 时为了将不同study的 main task rubric材料获取
        MyConstant.rubricTextForChatgptMap.put("cella_oulu_task2_ai_in_edu_groupA", "Arviointiperusteet \n" +
                "Näitä arviointiperusteita käytetään kirjoitelman arvioinnissa. Kirjoitelma arvioidaan kahden yleisen kriteerin ja kahden tekstin sisältöön liittyvän osatekijän perusteella. \n" +
                "Kaksi yleistä kriteeriä ovat:\n" +
                "1. Kirjoitelma koostuu 200–300 sanasta.\n" +
                "2. Kirjoitelma on kirjoitettu selkeästi ja omin sanoin, eli mikään osa kirjoitelmasta ei saa olla kopioitu tekstistä tai muista lähteistä.\n" +
                "Kaksi tekstiin liittyvää osatekijää ovat:\n" +
                "1. Käsittele tekoälyn käsittettä (määritelmän, selityksen ja arkielämästä otettujen esimerkkien mukaisesti).\n" +
                "2.Käsittele sitä, miten tekoälyä hyödyntäviä teknologioita voidaan käyttää koulutuksessa (nykytila ja miten tekoäly voi muuttaa koulutusta tulevaisuudessa).\n" +
                "Taulukko 1 \n" +
                "Tämä arviointimatriisi, jonka maksimipistemäärä on 18 pistettä, arvioi esseitä kahdesta pääaiheen suhteen. Ensimmäinen aihe, \"Tekoälyn käsite\", arvioidaan kolmen osatekijän perusteella: määritelmä, selitys ja esimerkit. Kunkin osion pisteet ovat: 0 pistettä ei mitään tai virheellistä tietoa varten, 1 piste puutteellisesta tai heikosta tiedosta, 2 pistettä täydellisestä ja riittävästä tiedosta, ja 3 pistettä perusteellisesta tiedosta, joka ylittää annetun tekstin. Toinen aihe, \"Tekoäly kouluissa (nykyhetki ja tulevaisuus)\", keskittyy kahteen osatekijään: nykyiset tekoälyn sovellukset ja tulevat tekoälyn sovellukset kouluissa. Pisteet ovat: 0 pistettä ei mitään tai virheellistä tietoa varten, 1.5 pistettä puutteellisesta tai heikosta tiedosta, 3 pistettä täydellisestä ja riittävästä tiedosta, ja 4.5 pistettä perusteellisesta tiedosta, joka ylittää annetun tekstin.\n");
        MyConstant.rubricTextForChatgptMap.put("cella_oulu_task1_biology_groupA", "Arviointiperusteet \n" +
                "Tämä on arviointimatriisi, jota käytetään esseen pisteyttämiseen ja täysi pistemäärä on 30 pistettä. \n" +
                "Punaisia verisoluja koskeva kuvaus, jossa on kolme osiota: määritelmä, selitys ja esimerkkien antaminen. Kukin osio pisteytetään seuraavasti: ei mitään tai virheellistä tietoa (0 pistettä); puutteellista tai heikkoa tietoa (1 piste); täydellistä ja riittävää tietoa (2 pistettä); ja perusteellista tietoa, joka ylittää annetun tekstin (3 pistettä). \n" +
                "Valkoisia verisoluja koskeva kuvaus, jossa on kolme osiota: määritelmä, selitys ja esimerkkien antaminen. Kaikki kolme osiota pisteytetään seuraavasti: ei mitään tai virheellistä tietoa (0 pistettä); puutteellista tai heikkoa tietoa (1 piste); täydellistä ja riittävää tietoa (2 pistettä); ja perusteellista tietoa, joka ylittää annetun tekstin (3 pistettä).\n" +
                "Tilanteen, jossa elimistössä on liian vähän punaisia verisoluja, koskevien mahdollisten vaikutusten keskustelu: ei mitään tai virheellistä tietoa (0 pistettä); puutteellista tai heikkoa tietoa (1 piste); täydellistä ja riittävää tietoa (2 pistettä); ja perusteellista tietoa, joka ylittää annetun tekstin (3 pistettä). \n" +
                "Tilanteen, jossa elimistössä on liian vähän valkoisia verisoluja koskevien mahdollisten vaikutusten keskustelu: ei mitään tai virheellistä tietoa (0 pistettä); puutteellista tai heikkoa tietoa (3 pistettä); täydellistä ja riittävää tietoa (6 pistettä); ja perusteellista tietoa, joka ylittää annetun tekstin (9 pistettä).\n");
        MyConstant.rubricTextForChatgptMap.put("cella_oulu_task2_ai_in_edu_groupB", "Arviointiperusteet \n" +
                "Näitä arviointiperusteita käytetään kirjoitelman arvioinnissa. Kirjoitelma arvioidaan kahden yleisen kriteerin ja kahden tekstin sisältöön liittyvän osatekijän perusteella. \n" +
                "Kaksi yleistä kriteeriä ovat:\n" +
                "1. Kirjoitelma koostuu 200–300 sanasta.\n" +
                "2. Kirjoitelma on kirjoitettu selkeästi ja omin sanoin, eli mikään osa kirjoitelmasta ei saa olla kopioitu tekstistä tai muista lähteistä.\n" +
                "Kaksi tekstiin liittyvää osatekijää ovat:\n" +
                "1. Käsittele tekoälyn käsittettä (määritelmän, selityksen ja arkielämästä otettujen esimerkkien mukaisesti).\n" +
                "2.Käsittele sitä, miten tekoälyä hyödyntäviä teknologioita voidaan käyttää koulutuksessa (nykytila ja miten tekoäly voi muuttaa koulutusta tulevaisuudessa).\n" +
                "Taulukko 1 \n" +
                "Tämä arviointimatriisi, jonka maksimipistemäärä on 18 pistettä, arvioi esseitä kahdesta pääaiheen suhteen. Ensimmäinen aihe, \"Tekoälyn käsite\", arvioidaan kolmen osatekijän perusteella: määritelmä, selitys ja esimerkit. Kunkin osion pisteet ovat: 0 pistettä ei mitään tai virheellistä tietoa varten, 1 piste puutteellisesta tai heikosta tiedosta, 2 pistettä täydellisestä ja riittävästä tiedosta, ja 3 pistettä perusteellisesta tiedosta, joka ylittää annetun tekstin. Toinen aihe, \"Tekoäly kouluissa (nykyhetki ja tulevaisuus)\", keskittyy kahteen osatekijään: nykyiset tekoälyn sovellukset ja tulevat tekoälyn sovellukset kouluissa. Pisteet ovat: 0 pistettä ei mitään tai virheellistä tietoa varten, 1.5 pistettä puutteellisesta tai heikosta tiedosta, 3 pistettä täydellisestä ja riittävästä tiedosta, ja 4.5 pistettä perusteellisesta tiedosta, joka ylittää annetun tekstin.\n");
        MyConstant.rubricTextForChatgptMap.put("cella_oulu_task1_biology_groupB", "Arviointiperusteet \n" +
                "Tämä on arviointimatriisi, jota käytetään esseen pisteyttämiseen ja täysi pistemäärä on 30 pistettä. \n" +
                "Punaisia verisoluja koskeva kuvaus, jossa on kolme osiota: määritelmä, selitys ja esimerkkien antaminen. Kukin osio pisteytetään seuraavasti: ei mitään tai virheellistä tietoa (0 pistettä); puutteellista tai heikkoa tietoa (1 piste); täydellistä ja riittävää tietoa (2 pistettä); ja perusteellista tietoa, joka ylittää annetun tekstin (3 pistettä). \n" +
                "Valkoisia verisoluja koskeva kuvaus, jossa on kolme osiota: määritelmä, selitys ja esimerkkien antaminen. Kaikki kolme osiota pisteytetään seuraavasti: ei mitään tai virheellistä tietoa (0 pistettä); puutteellista tai heikkoa tietoa (1 piste); täydellistä ja riittävää tietoa (2 pistettä); ja perusteellista tietoa, joka ylittää annetun tekstin (3 pistettä).\n" +
                "Tilanteen, jossa elimistössä on liian vähän punaisia verisoluja, koskevien mahdollisten vaikutusten keskustelu: ei mitään tai virheellistä tietoa (0 pistettä); puutteellista tai heikkoa tietoa (1 piste); täydellistä ja riittävää tietoa (2 pistettä); ja perusteellista tietoa, joka ylittää annetun tekstin (3 pistettä). \n" +
                "Tilanteen, jossa elimistössä on liian vähän valkoisia verisoluja koskevien mahdollisten vaikutusten keskustelu: ei mitään tai virheellistä tietoa (0 pistettä); puutteellista tai heikkoa tietoa (3 pistettä); täydellistä ja riittävää tietoa (6 pistettä); ja perusteellista tietoa, joka ylittää annetun tekstin (9 pistettä).\n");
        MyConstant.rubricTextForChatgptMap.put("cella_oulu_task2_ai_in_edu_groupC", "Arviointiperusteet \n" +
                "Näitä arviointiperusteita käytetään kirjoitelman arvioinnissa. Kirjoitelma arvioidaan kahden yleisen kriteerin ja kahden tekstin sisältöön liittyvän osatekijän perusteella. \n" +
                "Kaksi yleistä kriteeriä ovat:\n" +
                "1. Kirjoitelma koostuu 200–300 sanasta.\n" +
                "2. Kirjoitelma on kirjoitettu selkeästi ja omin sanoin, eli mikään osa kirjoitelmasta ei saa olla kopioitu tekstistä tai muista lähteistä.\n" +
                "Kaksi tekstiin liittyvää osatekijää ovat:\n" +
                "1. Käsittele tekoälyn käsittettä (määritelmän, selityksen ja arkielämästä otettujen esimerkkien mukaisesti).\n" +
                "2.Käsittele sitä, miten tekoälyä hyödyntäviä teknologioita voidaan käyttää koulutuksessa (nykytila ja miten tekoäly voi muuttaa koulutusta tulevaisuudessa).\n" +
                "Taulukko 1 \n" +
                "Tämä arviointimatriisi, jonka maksimipistemäärä on 18 pistettä, arvioi esseitä kahdesta pääaiheen suhteen. Ensimmäinen aihe, \"Tekoälyn käsite\", arvioidaan kolmen osatekijän perusteella: määritelmä, selitys ja esimerkit. Kunkin osion pisteet ovat: 0 pistettä ei mitään tai virheellistä tietoa varten, 1 piste puutteellisesta tai heikosta tiedosta, 2 pistettä täydellisestä ja riittävästä tiedosta, ja 3 pistettä perusteellisesta tiedosta, joka ylittää annetun tekstin. Toinen aihe, \"Tekoäly kouluissa (nykyhetki ja tulevaisuus)\", keskittyy kahteen osatekijään: nykyiset tekoälyn sovellukset ja tulevat tekoälyn sovellukset kouluissa. Pisteet ovat: 0 pistettä ei mitään tai virheellistä tietoa varten, 1.5 pistettä puutteellisesta tai heikosta tiedosta, 3 pistettä täydellisestä ja riittävästä tiedosta, ja 4.5 pistettä perusteellisesta tiedosta, joka ylittää annetun tekstin.\n");
        MyConstant.rubricTextForChatgptMap.put("cella_oulu_task1_biology_groupC", "Arviointiperusteet \n" +
                "Tämä on arviointimatriisi, jota käytetään esseen pisteyttämiseen ja täysi pistemäärä on 30 pistettä. \n" +
                "Punaisia verisoluja koskeva kuvaus, jossa on kolme osiota: määritelmä, selitys ja esimerkkien antaminen. Kukin osio pisteytetään seuraavasti: ei mitään tai virheellistä tietoa (0 pistettä); puutteellista tai heikkoa tietoa (1 piste); täydellistä ja riittävää tietoa (2 pistettä); ja perusteellista tietoa, joka ylittää annetun tekstin (3 pistettä). \n" +
                "Valkoisia verisoluja koskeva kuvaus, jossa on kolme osiota: määritelmä, selitys ja esimerkkien antaminen. Kaikki kolme osiota pisteytetään seuraavasti: ei mitään tai virheellistä tietoa (0 pistettä); puutteellista tai heikkoa tietoa (1 piste); täydellistä ja riittävää tietoa (2 pistettä); ja perusteellista tietoa, joka ylittää annetun tekstin (3 pistettä).\n" +
                "Tilanteen, jossa elimistössä on liian vähän punaisia verisoluja, koskevien mahdollisten vaikutusten keskustelu: ei mitään tai virheellistä tietoa (0 pistettä); puutteellista tai heikkoa tietoa (1 piste); täydellistä ja riittävää tietoa (2 pistettä); ja perusteellista tietoa, joka ylittää annetun tekstin (3 pistettä). \n" +
                "Tilanteen, jossa elimistössä on liian vähän valkoisia verisoluja koskevien mahdollisten vaikutusten keskustelu: ei mitään tai virheellistä tietoa (0 pistettä); puutteellista tai heikkoa tietoa (3 pistettä); täydellistä ja riittävää tietoa (6 pistettä); ja perusteellista tietoa, joka ylittää annetun tekstin (9 pistettä).\n");


        MyConstant.rubricTextForChatgptMap.put("flora_beijing_lab", "This is the rubric. The rubric is used to score the essay, and the full score is 25 points. \n" +
                "There are four global criteria:\n" +
                "•\tWord count: The essay consists of 200 to 400 words; Yes (2 points), No (0 points)\n" +
                "•\tBasic writing skills: The essay is clearly a mature draft, and has no low-level writing mistakes, such as missing texts, ‘placeholders’, messy typography, and many spelling and grammatical errors; Yes (2 points), Partial (1 point) No (0 point)\n" +
                "•\tAcademic writing skills: The writing of this essay should conform to the norms of academic writing, such as using appropriate logic structure, good flow and linkers usage, correct verbs and tenses and voices, consistent with academic writing style; Yes (4 points), Partial (1-3 point) No (0 point)\n" +
                "•\tOriginality: Your writing should be your own opinion elaborated in your own words, not simply copy-pasted sentences from the material; Yes (2 points), Partial (1 point) No (0 point)\n" +
                "In addition, the content will be evaluated according to the following criteria: \n" +
                "•\tThe role of AI in education（3 points）： Reflects the information provided in the text; the student is able to apply it to education \n" +
                "•\tScaffolding to optimise learning（3 points）：Reflects the information provided in the text; the student is able to apply it to education \n" +
                "•\tDifferentiation practices in the classroom（3 points）：Reflects the information provided in the text; the student is able to apply it to education \n" +
                "•\tIntegration of three topics（3 points）： The integration reflects the information provided in the text, and the student is able to apply it to education \n" +
                "•\tFuture vision on education in 2035（3 points）： The vision for future education makes sense and goes beyond what is in the text, and appropriate innovative ideas are discussed");
        MyConstant.rubricTextForChatgptMap.put("flora_huadong_course1", "");
        MyConstant.rubricTextForChatgptMap.put("flora_beijing_ucas_23aut_task_lab", "This is the rubric. The rubric is used to score the essay, and the full score is 25 points. \n" +
                "There are four global criteria:\n" +
                "•\tWord count: The essay consists of 200 to 400 words; Yes (2 points), No (0 points)\n" +
                "•\tBasic writing skills: The essay is clearly a mature draft, and has no low-level writing mistakes, such as missing texts, ‘placeholders’, messy typography, and many spelling and grammatical errors; Yes (2 points), Partial (1 point) No (0 point)\n" +
                "•\tAcademic writing skills: The writing of this essay should conform to the norms of academic writing, such as using appropriate logic structure, good flow and linkers usage, correct verbs and tenses and voices, consistent with academic writing style; Yes (4 points), Partial (1-3 point) No (0 point)\n" +
                "•\tOriginality: Your writing should be your own opinion elaborated in your own words, not simply copy-pasted sentences from the material; Yes (2 points), Partial (1 point) No (0 point)\n" +
                "In addition, the content will be evaluated according to the following criteria: \n" +
                "•\tThe role of AI in education（3 points）： Reflects the information provided in the text; the student is able to apply it to education \n" +
                "•\tScaffolding to optimise learning（3 points）：Reflects the information provided in the text; the student is able to apply it to education \n" +
                "•\tDifferentiation practices in the classroom（3 points）：Reflects the information provided in the text; the student is able to apply it to education \n" +
                "•\tIntegration of three topics（3 points）： The integration reflects the information provided in the text, and the student is able to apply it to education \n" +
                "•\tFuture vision on education in 2035（3 points）： The vision for future education makes sense and goes beyond what is in the text, and appropriate innovative ideas are discussed");
        MyConstant.rubricTextForChatgptMap.put("flora_demo", "This is the rubric. The rubric is used to score the essay, and the full score is 16 points. \n" +
                "There are two global criteria:\n" +
                "Word count: The essay consists of 200 to 400 words; Yes (2 points), No (0 points)\n" +
                "Originality: Your writing should be your own opinion elaborated in your own words, not simply copy-pasted sentences from the material; Yes (2 points), Partial (1 point) No (0 point)\n" +
                "In addition, the content will be evaluated according to the following criteria: \n" +
                "Description of topic AI: the essay has a weak description of the topic AI (1 point); the essay has a sufficient description of the topic AI (2 points); the essay has an in-depth description of the topic AI (3 points); the essay has a in depth description of the topic AI and application to daily life (4 points)\n" +
                "Discussion of topic AI-based technologies in medicine: the essay has a weak description of AI-based technologies in medicine (1 point); the essay has a sufficient description of AI-based technologies in medicine (2 points); the essay has an in-depth description of AI-based technologies in medicine (3 points); the essay has an in-depth description of AI-based technologies in medicine and application to the future (4 points)\n" +
                "Combining topics: the essay does not reflect combining of the topics (1 point); the combination of topics is superficial (2 points); the combination of topic is detailed and aligns with the text (3 points); combination of topics is beyond the text and applications to daily life and future health care are discussed (4 points)\n");
        MyConstant.rubricTextForChatgptMap.put("flora_demo_medicine",
                "They are reading the material on (1) artificial intelligence and (2) the medicine of the future. The student cannot use reading materials outside of those provided in the environment. Based on these, they need to write an essay (200-300 words) in which they describe in their own words how AI is part of their daily life and how health care now and in the future would look like. \n" +
                "The essay should reflect the student's own vision and the essay will be automatically checked on how much is copied from the text and/or from other internet sources.\n" +
                "The student has 45 minutes to study the topics and write the essay. This means that they should work efficiently. They may not have sufficient time to read everything, so they must select their activities carefully. The student is advised to focus on the two topics, how AI works and how new technologies can be used in health care in the future.  \n" +
                "At the end of the learning session, the student should be able to: explain the concept of AI, explain how AI applies to their daily life, explain how AI based technologies can change health care.\n" +
                "The student can use different tools provided in the learning environment to help them with the task: annotator (to highlight and tag parts of texts and to take notes), planner and essay writing tool.\n" +
                "This is an individual task, so asking for help from a teacher of peers is not allowed.\n" +

                "The rubric is used to evaluate the essay. There are two global criteria and three components on which the essay will be graded.  \n" +
                "The two global criteria are:\n" +
                "1.    The essay consists of 200 to 300 words. \n" +
                "2.    The essay is written clearly and in the student's own words, meaning that no part in the essay can be copied from the text or from other sources. \n" +
                "The three components are: \n" +
                "1.     Discussion of the concept of AI  \n" +
                "2.     Discussion of the use of AI-based technologies in medicine\n" +
                "3.     Discussion of the future integration of AI in your daily life and in health care (See Table 1.)\n" +
                "This is the rubric. The rubric is used to score the essay, and the full score is 16 points. \n" +
                "There are two global criteria:\n" +
                "Word count: The essay consists of 200 to 400 words; Yes (2 points), No (0 points)\n" +
                "Originality: Your writing should be your own opinion elaborated in your own words, not simply copy-pasted sentences from the material; Yes (2 points), Partial (1 point) No (0 point)\n" +
                "In addition, the essay response will be evaluated according to the following criteria: \n" +
                "Description of topic AI: the essay has a weak description of the topic AI (1 point); the essay has a sufficient description of the topic AI (2 points); the essay has an in-depth description of the topic AI (3 points); the essay has a in depth description of the topic AI and application to daily life (4 points)\n" +
                "Discussion of topic AI-based technologies in medicine: the essay has a weak description of AI-based technologies in medicine (1 point); the essay has a sufficient description of AI-based technologies in medicine (2 points); the essay has an in-depth description of AI-based technologies in medicine (3 points); the essay has an in-depth description of AI-based technologies in medicine and application to the future (4 points)\n" +
                "Combining topics: the essay does not reflect combining of the topics (1 point); the combination of topics is superficial (2 points); the combination of topic is detailed and aligns with the text (3 points); combination of topics is beyond the text and applications to daily life and future health care are discussed (4 points)\n");
*/

}


