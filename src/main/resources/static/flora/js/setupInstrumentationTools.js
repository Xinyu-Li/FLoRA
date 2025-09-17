
function loadAll() {
    let plannerElementsJson = localStorage.getItem(userId + "myPlannerElementsJson");
    let displayPlanDivInnerHtml = localStorage.getItem(userId + "myDisplayPlanDivInnerHtml");
    // 加载essay
    let essayContentJson = localStorage.getItem(userId + "-" + currentCourseId + "myCurrentEssayContent");

    if (plannerElementsJson === null || plannerElementsJson === "") { //如果本地不存在，则从服务器获取 // TODO 尝试放入缓存
        // console.log("---------------load page: no PlannerElements in localstorage");

        $.post(apiBaseUrl + "/load-planner-to-sidebar", {
            userId: userId,
            courseId: currentCourseId,
        }, function (data, status) {
            if (data.data != null) {
                plannerElementsJson = data.data.plannerElementsJson;
                if (plannerElementsJson !== null && plannerElementsJson !== "") {
                    localStorage.setItem(userId + "-" + currentCourseId + "myPlannerElementsJson", plannerElementsJson);

                    // 恢复planner 视图
                    restorePlannerView(plannerElementsJson, data.data.displayPlanDivInnerHtml);
                    plannerSaveButtonClickStatus = true;
                }
            } else {
                // console.log("************************no PlannerElements in server");
            }
        });
    } else {
        // console.log("---------------load page: PlannerElements in localstorage is not null");
        // 恢复planner 视图
        restorePlannerView(plannerElementsJson, displayPlanDivInnerHtml);
        plannerSaveButtonClickStatus = true;
    }
}


$(document).ready(function () {
    //-----------------------------------------------主代码执行区域

    // function main(userId) {
    //     // setupExtraBodyEvent(userId);
    //
    //     // setupEssayWritingMain(userId, "writeEssayToolbarMain", "writeEssayEditorMain");
    //
    //     // setupPlanner2(userId);
    //
    //     //此方法之前userid 必须加载完成
    //     // loadHighlightsToSidebarAfterLoading(userId); //进入页面时候自动执行
    //
    // }

    if (window.location.href.includes("/moodle/mod/page/view.php") ||
        window.location.href.includes("localhost:8080") ||
        window.location.href.includes("localhost/myapi") ||
        window.location.href.includes("/myapi/index-revision2")) {
        // console.log("in main userId: " + userId);
        if (userId === null) { window.location.reload(); }



        //----------------------------------setup the timer----------------------------------
        pageEventWebSocketInit(); // 初始化websocket 连接
        setupTimer();
        $.when(myTimerAjax).done(function() {
            setupExtraBodyEvent();
            //setup all instrumentation tools except timer
            if(useWriteEssayTool) {                
                setupEssayWritingMain("writeEssayToolbarMain", "writeEssayEditorMain");
                loadEssay();
                console.log("loading current essay");
            }
            // console.log("useScaffoldTool:" + useScaffoldTool);
            // console.log(getLastname().toLowerCase());
            if (typeof useScaffoldTool !== 'undefined' && useScaffoldTool && ["dev", "ge", "pl"].includes(getLastname().toLowerCase())) {
                // console.log("run setupScaffoldsTool and loadScaffolds");
                setupScaffoldsTool();
                loadScaffolds();
            }
            // if (useGPTScaffoldTool && ["gpt", "dev"].includes(getLastname().toLowerCase())) {
            if (typeof useGPTScaffoldTool !== 'undefined' && useGPTScaffoldTool) {
                // console.log("run setupGPTScaffoldTool and loadGPTScaffolds");
                setupGPTScaffoldsTool();
                loadGPTScaffolds();
            }

            // let lastname = getLastname().toLowerCase();
            // if (typeof feedbackToolGroupSetup !== "undefined" && feedbackToolGroupSetup != null && feedbackToolGroupSetup[lastname] != null) {
            //     useChatgptTool = feedbackToolGroupSetup[lastname][0];
            //     useTeacherChat = feedbackToolGroupSetup[lastname][1];
            //     useChecklistTool = feedbackToolGroupSetup[lastname][2];
            // }

            if(typeof useAnnotationTool !== 'undefined' && useAnnotationTool) {
                sidebarEvents();
                setupAnnotationToolboxBtns();
                setupMainHighlightAreaEvent();
                setupAnnotationSearchPanel();
                loadAnnotation();
            }   

            if (typeof loadRelatedEssay !== 'undefined' && loadRelatedEssay) {
                if (typeof relatedCourseIdMap !== 'undefined' && relatedCourseIdMap[currentCourseId] !== undefined) {
                    loadRelatedCourseEssay();
                }
            }

            if (typeof useChatgptTool !== 'undefined' && useChatgptTool) {
                setupChatgptTool();
                loadGPTChatHistory();
                if (typeof relatedCourseIdMap !== 'undefined' && relatedCourseIdMap[currentCourseId] !== undefined) {
                    loadRelatedCourseEssay(); // only for toefl
                }
            }
            if(typeof useChatgptAssistantTool !== 'undefined' && useChatgptAssistantTool){
                setupAssistantTool();
                loadAssistantChatHistory();
            }
            if(typeof useToeflAssistantTool !== 'undefined' && useToeflAssistantTool){
                setupToeflAssistantTool();
                loadToeflAssistantChatHistory();
                if (typeof relatedCourseIdMap !== 'undefined' && relatedCourseIdMap[currentCourseId] !== undefined) {
                    loadRelatedCourseEssay();
                }
            }
            // if agents中有mayor，且useSustainableEducationMayorTool为true，则加载可持续教育市长工具
            // if (typeof agents !== 'undefined' && "Mayor" in agents && agents.Mayor.useSustainableEducationMayorTool) {
            //     setupAssistantMayorTool();
            //     loadAssistantMayorChatHistory();
            // }
            // // Peer,Professor,Environmentalist,Tutor
            // if(typeof agents !== 'undefined' && "Peer" in agents && agents.Peer.useSustainableEducationPeerTool) {
            //     setupAssistantPeerTool();
            //     loadAssistantPeerChatHistory();
            // }
            // if(typeof agents !== 'undefined' && "Professor" in agents && agents.Professor.useSustainableEducationProfessorTool) {
            //     setupAssistantProfessorTool();
            //     loadAssistantProfessorChatHistory();
            // }
            // if(typeof agents !== 'undefined' && "Environmentalist" in agents && agents.Environmentalist.useSustainableEducationEnvironmentalistTool) {
            //     setupAssistantEnvironmentalistTool();
            //     loadAssistantEnvironmentalistChatHistory();
            // }
            // if(typeof agents !== 'undefined' && "Tutor" in agents && agents.Tutor.useSustainableEducationTutorTool) {
            //     setupAssistantTutorTool();
            //     loadAssistantTutorChatHistory();
            //
            // }
            //
            // if(typeof agents !== 'undefined' && "Whaler" in agents && agents.Whaler.useSustainableEducationWhalerTool) {
            //     setupAssistantWhalerTool();
            //     loadAssistantWhalerChatHistory();
            // }


            if(typeof useChatgptAssistantTeacherTool !== 'undefined' && useChatgptAssistantTeacherTool){
                setupAssistantTeacherTool();
                loadAssistantTeacherChatHistory();
            }
            if (typeof useDictionaryTool !== 'undefined' && useDictionaryTool) {
                setupDictionaryTool();
                loadDictionaryHistory();
            }
            if (typeof useTeacherChat !== 'undefined' && useTeacherChat) {
                setupChatTeacherTool();
                loadTeacherChatHistory();
            }
            if (typeof useChecklistTool !== 'undefined' && useChecklistTool) {
                setupChecklistTool();
            }
            if (typeof usePlannerTool !== 'undefined' && usePlannerTool) {
                setupPlanner2();
                loadPlanner();
            }
            // console.log("load tools");
            //getEtherpadName()
            if (typeof useCollaborativeWriteEssayTool !== 'undefined' && useCollaborativeWriteEssayTool) {

                 function createPadConnected(){
                    console.log("Wait for Etherpad to be connected and create pad");
                    console.log("Inside createPadConnected, userEtherpadPadID: ", userEtherpadPadID);
                    if (!etherpad_connection | userEtherpadPadID==null){
                        setTimeout(createPadConnected,30000);
                        getEtherpadName();
                    }
                    else{
                        console.log("Etherpad has been connected and create pad!")
                    }

                 }
                 createPadConnected();
                 //createIframePad(userEtherpadPadID)
                //reloadDocumentCookie();

                //var iframe = document.getElementById('epframecollapseCollaborateWrite');
                //console.log("iframe: ",iframe)
//                iframe.onload = function(){
//                    console.log("loaded epframecollapseCollaborateWrite")
//                    reloadDocumentCookie();
//                    setupCollaborateWriteMain("collaborateWriteToolbarMain", "collaborateWriteEditorMain");
//                };collaborateWriteEditorMain
                function setEtherpadCookie(){
                    console.log("wait for collaborateWriteDocument available and setEtherpadCookie!")
                    let collaborateWriteWindow = window.frames["epframecollapseCollaborateWrite"];
                    if (collaborateWriteWindow){
                        let collaborateWriteDocument = collaborateWriteWindow.document;
                        if (collaborateWriteDocument) {
                            console.log("collaborateWriteDocument available and setEtherpadCookie!");
                            reloadDocumentCookie();
                        } else {
                            setTimeout(setEtherpadCookie, 10000); // Pass the function reference correctly
                        }
                    }
                    else {
                            setTimeout(setEtherpadCookie, 10000); // Pass the function reference correctly
                    }
                }
                setEtherpadCookie();
//                setTimeout(function () {
//                    reloadDocumentCookie();
//                    //setupCollaborateWriteMain("collaborateWriteToolbarMain", "collaborateWriteEditorMain");
//                }, 2000);

//                setTimeout(function () {
//                    setupCollaborateWriteMain("collaborateWriteToolbarMain", "collaborateWriteEditorMain");
//                }, 1000);


//
//                setTimeout(function () {
//                    setupCollaborateWriteMain("collaborateWriteToolbarMain", "collaborateWriteEditorMain");
//                }, 2000);

            }
            if (typeof useConsultationSubmitTool !== 'undefined' && useConsultationSubmitTool){
                setupConsultationSubmitTool();
            }
            /*if (agents.Mayor.useSustainableEducationMayorTool){
                setupAssistantMayorTool();
                loadAssistantMayorChatHistory();
            }
            if(agents.Peer.useSustainableEducationPeerTool){
                setupAssistantPeerTool();
                loadAssistantPeerChatHistory();
            }
            if(agents.Professor.useSustainableEducationProfessorTool){
                setupAssistantProfessorTool();
                loadAssistantProfessorChatHistory();
            }*/

            if (typeof useMultiAgentsMultiWindowsTool !== 'undefined' && useMultiAgentsMultiWindowsTool && multiAgentsMultiWindowsConfig.length > 0) {
                for (let i = 0; i < multiAgentsMultiWindowsConfig.length; i++) {
                    let agent = multiAgentsMultiWindowsConfig[i];
                    if (agent.useAgent) {
                        renderMultiAgentsMultiWindowTool(agent);
                        loadMultiSeparateAgentsChatHistory(agent.agentName,agent.agentDisplayName,agent.agentAvatarSvg,agent.useRating)
                        console.log("use Agent:------------------" + agent.agentName);
                    }

                }

            }
            if (typeof useMultiAgentsSingleWindowTool !== 'undefined' && useMultiAgentsSingleWindowTool) {
                setupMultiAgentsSingleWindowTool();
                loadMultiAgentsSingleWindowChatHistory();
            }

            // zoteroNotesTool
            if (typeof useZoteroNotesTool !== 'undefined' && useZoteroNotesTool) {
                setupZoteroNotesTool();
                loadZoteroNotes();
            }
            // processVisualTool
            if (typeof useProcessVisualTool !== 'undefined' && useProcessVisualTool) {
                setupProcessVisualTool();
                // loadProcessVisualTool();
            }


            // loadEssay();
            // loadGPTScaffolds();
            // loadAnnotation();
            // loadPlanner();

        });

    }
});
