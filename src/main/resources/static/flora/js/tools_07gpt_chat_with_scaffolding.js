function render() {

    let scaffoldsChatHtml = `
        <div class="input-group mt-2" id="gpt-chat-with-scaffold-panel-box" style="min-height:40px; max-height:100px; height:20%;">
            <div contenteditable="true" id="gpt-chat-with-scaffold-input" class="form-control"></div>
            <button type="button" class="btn btn-outline-primary" id="gpt-chat-with-scaffold-send-question-btn" style="float: right">${multiAgentsSendBtnText}</button>   
        </div>`;
    let scaffoldsToolHtml = `<!-- scaffolds Tool Html  -->
        <div class="my-horizontal-collapse-tools planner2" id="gpt-chat-with-scaffolds-collapse"  style="z-index: 198;">
            <div class="card card-body overflow-auto" style="height:100%;">
                <h3 class="mt-2 mb-2" ><span>${typeof multiAgentsSingleWindowName !== 'undefined' ? multiAgentsSingleWindowName : 'Chat Assistant'}</span> <button type="button" class="btn btn-close" style="position:absolute; right:20px;" aria-label="Close" id="close-gpt-chat-with-scaffolds-btn"></button></h3>
                <div id="display-gpt-chat-with-scaffolds-message-container-div" style="overflow-y: auto; height:100%; word-wrap: break-word; white-space : normal;">
                    <div id="display-gpt-chat-with-scaffolds-message-div" class="form-control"> <!--style="overflow-y:auto; height:100%; word-wrap: break-word; white-space : normal;"-->
                    </div>
                </div>
                
                ${scaffoldsChatHtml}
            </div>
        </div>`;


    $("body").append(scaffoldsToolHtml);
}

render();

//TODO 清空输入框

//7, 14, 21, 28

let collapseGptChatWithScaffolds = document.querySelector("#gpt-chat-with-scaffolds-collapse");
toolList1.push(collapseGptChatWithScaffolds);
let showGptChatWithScaffoldsBtn = document.querySelector("#show-gpt-chat-with-scaffolds-btn");
let closeGptChatWithScaffoldsBtn = document.querySelector("#close-gpt-chat-with-scaffolds-btn");
let gptChatWithScaffoldsMessageDiv = document.querySelector("#display-gpt-chat-with-scaffolds-message-div");
let gptChatWithScaffoldsChatSendBtn = document.querySelector("#gpt-chat-with-scaffold-send-question-btn");
let gptChatWithScaffoldsChatInput = document.querySelector("#gpt-chat-with-scaffold-input");
// let gptChatWithScaffoldsAgentsListPanel = document.querySelector("#gpt-chat-with-scaffold-agents-list-panel");
let gptChatWithScaffoldsChatPanelBox = document.querySelector("#gpt-chat-with-scaffold-panel-box");

let gptChatWithScaffoldOrder = 1;

let gptChatWithScaffoldsReminderBgColor = "#ead1a2";

//This 4 variables are only used for tool open/close event
let gptChatWithScaffoldsClickTargetObject = "NO_TARGET_OBJECT";
let gptChatWithScaffoldsPageEvent = "NO_PAGE_EVENT";
let gptChatWithScaffoldsToolStartUseTime = 0;
let gptChatWithScaffoldsInstantEvent = "CLOSE";



function requestGptChatWithScaffolds(question, order) {

    const processingMessage = appendGeneralProcessingMessage(gptChatWithScaffoldsMessageDiv, "#49a5ba");

    // $(gptChatWithScaffoldsMessageDiv).append(processingMessage);
    // $(gptChatWithScaffoldsMessageDiv).scrollTop(gptChatWithScaffoldsMessageDiv.scrollHeight);
    console.log("gptScaffoldAgent:", gptScaffoldAgent);
    console.log("currentscaffoldOrder:", order);
    let tempGptScaffoldPromptVO = gptScaffoldAgent.triggerConfigs.timeRangeTriggers[order - 1] ?? gptScaffoldAgent.triggerConfigs.timeRangeTriggers[gptScaffoldAgent.triggerConfigs.timeRangeTriggers.length - 1];
    console.log(tempGptScaffoldPromptVO);
    let gptScaffoldData = {
        userQuestion: question,
        gptScaffoldNumber: order,
        gptScaffoldPromptVO: tempGptScaffoldPromptVO,
        testISDIMUName: testISDIMUName,
        testMAIName: testMAIName,
        preTestName: preTestName,
        hasTakePreviousStudyTestName: hasTakePreviousStudyTestName,

        preTestCourseId: pretestNameCourseId,
        testISDIMUCourseId: testISDIMUCourseId,
        testMAICourseId: testMAICourseId,
        hasTakePreviousStudyTestNameCourseId: hasTakePreviousStudyTestNameCourseId,
        essay: mainEditor.getText(),
        subActionAndPromptList: gptScaffoldNeedCheckSubActionPrompt,

        savePlannerSelectedIndexPromptList: gptScaffoldNeedCheckSavePlannerSelectIndexPrompt,
        userId: userId,
        courseId: currentCourseId,
        includeEssay: gptScaffoldPromptIncludeEssay,
        gptScaffoldRole: gptScaffoldRole,
        gptScaffoldPromptTemplate: gptScaffoldPromptTemplate,

        gptScaffoldRoleDescription: gptScaffoldRoleDescription ?? null,
        userTakePreviousStudyPrompt: userTakePreviousStudyPrompt,
        srlModel: srlModel,
        // beginMinute: gptScaffoldNeedCheckSRLProcessPrompt[order - 1].beginMinute,
        // endMinute: gptScaffoldNeedCheckSRLProcessPrompt[order - 1].endMinute,

        // classifySentenceBackgroundFileNameList: classifySentenceBackgroundFileNameList,
        pretestGradesPrompt: pretestGradesPrompt,
        isdimuScorePrompt: isdimuScorePrompt,
        maiScoreKnowledgeCognitionPrompt: maiScoreKnowledgeCognitionPrompt,
        maiScoreRegulationCognitionPrompt: maiScoreRegulationCognitionPrompt,
        srlProcessBackupPromptList: srlProcessBackupPromptList,
        backgroundFileNameList: gptScaffoldBackgroundFileNameList,
        gptScaffoldParameters: gptScaffoldParameters,
        // gptScaffoldReturnMessages: gptScaffoldAgent.triggerConfigs.fixedMessageTriggers ?? null, //此种设计是希望从GPTScaffold 窗口直接返回固定的message
        hasDefaultScaffoldsPrompt: hasDefaultScaffoldsPrompt ?? false,
        // hasDefaultScaffolds: hasDefaultScaffolds ?? false,
        defaultScaffoldMessages: gptScaffoldAgent.triggerConfigs.defaultTriggers ?? null,
        toolsLanguage: toolsLanguage,
        agentName: gptScaffoldAgent.agentName,
        agentRole: gptScaffoldAgent.agentRole
    }

    $.ajax({
        url: apiBaseUrl + "/chat-with-scaffold",
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(gptScaffoldData),
        dataType: 'json',
        success: function (data, status) {
            if (status === "success" && data.status === 200) {
                console.log("------------------------------------------------------");
                console.log(data);
                console.log("------------------------------------------------------");
                // $(processingMessage).remove();
                const readableTime = new Date(parseInt(data.data.chatgptResponseTime, 10)).toLocaleTimeString();
                removeGeneralProcessingMessage(processingMessage)
                if (data.data === null) {
                    //表示没有返回GPT scaffold， 可以直接展示default scaffolds TODO

                    // appendGeneralGptChatWithScaffoldsOrHint(gptScaffoldAgent.triggerConfigs.defaultTriggers[order - 1].message, readableTime, order, "#c192e8", gptChatWithScaffoldsMessageDiv);
                    // sendEventMessage("", getCurrentTimestamp(), "CHAT_WITH_SCAFFOLD", "NO_PAGE_EVENT", "READ_DEFAULT_MESSAGE", "CHAT_WITH_SCAFFOLD","NO_TARGET_OBJECT", "CHAT_WITH_SCAFFOLD_RECEIVED", "GPT_SCAFFOLD_ORDER:::" + order, null);
                } else {
                    // Remove the processing sign

                    let resContent = data.data.chatgptAnswer; //.replace("\n", "<br>"); //answer = answer.replace("\n", "<br>")
                    if (resContent === "gpt-error") {
                        resContent = "There is an error from Chatgpt, Please re-send your question.";
                    }

                    let chatHistoryLengthTemp = localStorage.getItem(userId + "-" + currentCourseId + "-" + gptScaffoldAgent.agentName + "-chat-with-scaffold-history-length");
                    let chatHistoryLength = 0;
                    if (chatHistoryLengthTemp) {
                        chatHistoryLength = parseInt(chatHistoryLengthTemp);
                    }
                    chatHistoryLength += 1;
                    // appendGeneralGptScaffoldsOrHint(resContent, readableTime, order, data.data.id, true, 0, "scaffold", chatWithScaffoldBgColor, gptChatWithScaffoldsMessageDiv);
                    appendGeneralAgentAnswerHtml(resContent, data.data.chatgptResponseTime, "", data.data.id, gptScaffoldAgent.agentDisplayName, gptScaffoldAgent.agentAvatarSvg, gptScaffoldAgent.useRating, data.data.responseRatingThumb, chatHistoryLength, "", gptChatWithScaffoldsMessageDiv);
                    localStorage.setItem(userId + "-" + currentCourseId + "-" + gptScaffoldAgent.agentName + "-chat-with-scaffold-history-length", "" + chatHistoryLength);
                    // localStorage.setItem(userId + "-" + currentCourseId + "-gptscaffold-" + order + "-trigger-timestamp", "" + getCurrentTimestamp());
                    // sendMyTraceDataPost("/trace-chatgpt-scaffold", getCurrentTimestamp(), "CHAT_WITH_SCAFFOLD", "NO_PAGE_EVENT", "NO_TARGET_OBJECT", "CHAT_WITH_SCAFFOLD_RECEIVED", "GPT_SCAFFOLD_ORDER:::" + order, null);
                    sendEventMessage("", getCurrentTimestamp(), "CHAT_WITH_SCAFFOLD", "NO_PAGE_EVENT", "READ_CHAT_WITH_SCAFFOLD", "CHAT_WITH_SCAFFOLD", "NO_TARGET_OBJECT", "CHAT_WITH_SCAFFOLD_RECEIVED", "GPT_SCAFFOLD_ORDER:::" + order, null);
                    // forceViewGPTScaffold();
                }
            } else {
                // Remove the processing sign
                // $(processingMessage).remove();
                removeGeneralProcessingMessage(processingMessage);
                // alert("An error occurred while processing scaffold.");
                console.log("------------------------------------------------------");
                console.log(data);
                console.log("------------------------------------------------------");
            }
        },
        error: function (xhr, status, error) {
            // console.log("exception happen" + error);
        }
    });
    return order;
}

function loadGptChatWithScaffolds() {

    // console.log("loadGptChatWithScaffolds-----------");
    $.get(apiBaseUrl + "/load-chat-with-scaffold/" + userId + "/" + currentCourseId, function (data, status) {
        if (status === "success") {
            console.log("gptscaffold:", data);
            const userChatgptLogVOList = data.data;
            // console.log("------------------------")
            // console.log("gptscaffold:", scaffoldHistory);
            $(gptChatWithScaffoldsMessageDiv).empty();

            let index = 1;
            // if (scaffoldHistory !== null) {
            let countRound = 1;

            userChatgptLogVOList?.forEach(userChatgptLog => {
                    console.log("userChatgptLog:", userChatgptLog);
                    appendGeneralQuestionHtml(userChatgptLog.userQuestions, userChatgptLog.userAskTime, userChatgptLog.id, false, false, "", gptChatWithScaffoldsMessageDiv);
                    appendGeneralAgentAnswerHtml(userChatgptLog.chatgptAnswer, userChatgptLog.chatgptResponseTime, userChatgptLog.questionId, userChatgptLog.id, gptScaffoldAgent.agentDisplayName, gptScaffoldAgent.agentAvatarSvg, true, userChatgptLog.responseRatingThumb, countRound, "", gptChatWithScaffoldsMessageDiv);
                    countRound++;
                    index = parseInt(userChatgptLog.topicId);
                })


            gptChatWithScaffoldOrder = index === 0 ? 1 : index; // 避免topicId 默认值可能是0

            $(gptChatWithScaffoldsMessageDiv).animate({scrollTop: $(gptChatWithScaffoldsMessageDiv).prop("scrollHeight")}, 1000);

        } else {
            // console.log("no chatgpt-scaffold history------gptChatWithScaffoldOrder:" + gptChatWithScaffoldOrder);
        }
    });
    // forceViewGPTScaffold();
}


function setupGptChatWithScaffoldsTool() {
    let tempTaskStartTimestamp = parseInt(localStorage.getItem(`${userId}-${currentCourseId}-taskStartTimestamp`)) || 0;
    let currentTriggers = gptScaffoldAgent.triggerConfigs.timeRangeTriggers;
    let gptScaffoldInterval = setInterval(function () {
        let spendTimeSeconds = (getCurrentTimestamp() - tempTaskStartTimestamp) / 1000;
        // 获取当前的触发时间

        // console.log("gptScaffoldorder:", gptChatWithScaffoldOrder);
        if (gptChatWithScaffoldOrder <= currentTriggers.length) {
            // let currentTriggerMinute = currentTriggers[gptChatWithScaffoldOrder - 1].triggerMinute;

            console.log(".....taskSpendTimeSeconds:" + spendTimeSeconds);

            if (spendTimeSeconds >= (60 * 0) && spendTimeSeconds < (60 * 14)) {
                gptChatWithScaffoldOrder = 1
            } else if (spendTimeSeconds >= (60 * 14) && spendTimeSeconds < (60 * 42)) {
                gptChatWithScaffoldOrder = 2
            } else if (spendTimeSeconds >= (60 * 42) && spendTimeSeconds < (60 * 70)) {
                gptChatWithScaffoldOrder = 3
            } else {
                gptChatWithScaffoldOrder = 4
            }
        } else if (gptChatWithScaffoldOrder === currentTriggers.length + 1) {

            console.log("gpt scaffolding triggering finish!!!!!");
            clearInterval(gptScaffoldInterval);
        }



    }, 5 * 1000); //7 * 60 * 1000

    let chatWithScaffoldReminderInterval = setInterval(function () {
        let spendTimeSeconds = (getCurrentTimestamp() - tempTaskStartTimestamp) / 1000;
        let chatWithScaffoldStartTimestamp = parseInt(localStorage.getItem(`${userId}-${currentCourseId}-chat-with-scaffold-start-timestamp`)) || 0;
        if (chatWithScaffoldStartTimestamp !== 0) {
            //标识已经点开过 开始过聊天
        } else {
            if (spendTimeSeconds >= 60 * 7) {
                appendGeneralGptScaffoldsOrHint(chatReminderMessage, new Date(getCurrentTimestamp()).toLocaleTimeString(), -1, 0, false, 0, "reminder", gptChatWithScaffoldsReminderBgColor, gptChatWithScaffoldsMessageDiv, 0)
                showGptChatWithScaffoldsBtn.querySelector("span.chat-with-scaffold-flash-icon").classList.remove("d-none");
                sendEventMessage("", getCurrentTimestamp(), "CHAT_WITH_SCAFFOLD", "NO_PAGE_EVENT", "CHAT_WITH_SCAFFOLD_START_REMINDER_TRIGGERED", "CHAT_WITH_SCAFFOLD", "NO_TARGET_OBJECT", "START_REMINDER_TRIGGERED", "", null);
                clearInterval(chatWithScaffoldReminderInterval);
            }
        }
    }, 5 * 1000); //7 * 60 * 1000

    collapseGptChatWithScaffolds.addEventListener("click", function (e) {
        stopEventPropagation(e);
        let tempTarget = e.target.id;
        let temp_instant_event = "CLICK";
        let temp_event_value = "";

        if (e.target.classList.contains('thumbs-up-icon') || e.target.classList.contains('thumbs-down-icon')) {
            let isUp = e.target.classList.contains('thumbs-up-icon');
            let isDown = e.target.classList.contains('thumbs-down-icon');
            let sibling; // 另一个图标
            if (isUp) sibling = e.target.parentNode.querySelector('.thumbs-down-icon');
            if (isDown) sibling = e.target.parentNode.querySelector('.thumbs-up-icon');

            let thumbStatus = changeThumbDisplay(e.target, sibling, isUp ? isUp : isDown);

            let container = e.target.closest('.bot-answer');
            if (!container) return;
            let messageId = container.dataset.messageid;

            requestGeneralChangeThumb(messageId, thumbStatus, "chat");
            temp_instant_event = isUp ? "RATING_THUMB_UP" : "RATING_THUMB_DOWN";
            temp_event_value = "MESSAGE_ID:::" + messageId;
        }

        sendEventMessage("", getCurrentTimestamp(), "CHAT_WITH_SCAFFOLD", "MOUSE_CLICK", "READ_CHAT_WITH_SCAFFOLD", "CHAT_WITH_SCAFFOLD", tempTarget, temp_instant_event, temp_event_value, e);
    });
    //当鼠标在搜索annotation框区域移动时候，所有移动和滚动行为都标注为 SEARCH_ANNOTATION
    collapseGptChatWithScaffolds.addEventListener("wheel", function (e) {
        stopEventPropagation(e);
        sendEventMessage("", getCurrentTimestamp(), "CHAT_WITH_SCAFFOLD", "MOUSE_WHEEL", "READ_CHAT_WITH_SCAFFOLD", "CHAT_WITH_SCAFFOLD", e.target.id, "NO_INSTANT_EVENT", "SCROLL_DIST:::" + e.deltaY, e);
    });
    collapseGptChatWithScaffolds.addEventListener('mousemove', function (e) {
        stopEventPropagation(e);
        mousePosition = generateMousePositionData(e, "READ_CHAT_WITH_SCAFFOLD", "CHAT_WITH_SCAFFOLD");
    });
    collapseGptChatWithScaffolds.addEventListener('mouseup', function (e) {
        stopEventPropagation(e);
        if (window.getSelection() != null && window.getSelection().toString().replace(/\n/g, '').length > 0) {
            let selectText = window.getSelection().toString();
            // sendMyTraceDataPost("/trace-chatgpt-scaffold", getCurrentTimestamp(), "CHAT_WITH_SCAFFOLD", "MOUSE_SELECT_TEXT", null, "SELECT_TEXT", "MOUSE_SELECT:::" + selectText, e);
            sendEventMessage("", getCurrentTimestamp(), "CHAT_WITH_SCAFFOLD", "MOUSE_SELECT_TEXT", "READ_CHAT_WITH_SCAFFOLD", "CHAT_WITH_SCAFFOLD", e.target.id, "SELECT_TEXT", "MOUSE_SELECT:::" + selectText, e);
            // console.log("send post for select text-------------------------------------" + selectText + "-------");
        }
    });


    closeGptChatWithScaffoldsBtn.addEventListener("click", function (e) {
        // console.log("----------------------------------------closeGptChatWithScaffoldsBtn clicked");
        stopEventPropagation(e);
        collapseGptChatWithScaffolds.classList.toggle("in-tools");
        toolsAndEssayToggle(collapseGptChatWithScaffolds);

        gptChatWithScaffoldsClickTargetObject = "CLOSE_GPT_SCAFFOLD_BTN";
        gptChatWithScaffoldsPageEvent = "MOUSE_CLICK";
    });

    showGptChatWithScaffoldsBtn.addEventListener("mousedown", function (e) {e.stopPropagation();});
    showGptChatWithScaffoldsBtn.addEventListener("click", function (e) {
        // console.log("----------------------------------------showGptChatWithScaffoldsBtn clicked");
        stopEventPropagation(e);
        if (useAnnotationTool) hideAnnotationToolbox(); // 隐藏annotation toolbox，当点击其他按钮时候
        collapseGptChatWithScaffolds.classList.toggle("in-tools");
        toolsAndEssayToggle(collapseGptChatWithScaffolds);
        // 如果alert message 包含d-none, 则不需要添加d-none， 如何不包含，则添加d-none， 关闭alert message
        if (!showGptChatWithScaffoldsBtn.querySelector("span.chat-with-scaffold-flash-icon").classList.contains("d-none")) {
            localStorage.setItem(`${userId}-${currentCourseId}-chat-with-scaffold-start-timestamp`, "" + getCurrentTimestamp());
            showGptChatWithScaffoldsBtn.querySelector("span.chat-with-scaffold-flash-icon").classList.add("d-none");
        }

        gptChatWithScaffoldsClickTargetObject = "SHOW_CHAT_WITH_SCAFFOLD_BTN";
        gptChatWithScaffoldsPageEvent = "MOUSE_CLICK";
        // console.log("--------------gptChatWithScaffoldsPageEvent:" + GptChatWithScaffoldsPageEvent);
        sendEventMessage("", getCurrentTimestamp(), "CHAT_WITH_SCAFFOLD", gptChatWithScaffoldsPageEvent, "READ_CHAT_WITH_SCAFFOLD", "CHAT_WITH_SCAFFOLD", gptChatWithScaffoldsClickTargetObject, "SHOW_GPT_SCAFFOLD_BTN_CLICK", "", null);
    });



    // send btn event
    gptChatWithScaffoldsChatSendBtn.addEventListener('click', (e) => {
        stopEventPropagation(e);
        console.log("into submit");
        e.preventDefault();
        const message = gptChatWithScaffoldsChatInput.innerText.trim();
        let temp_instant_event = "";
        if (message !== '') {
            gptChatWithScaffoldsChatInput.innerText = "";
            appendGeneralQuestionHtml(message, getCurrentTimestamp(), "", false, false, "", gptChatWithScaffoldsMessageDiv);
            requestGptChatWithScaffolds(message, gptChatWithScaffoldOrder);
            temp_instant_event = "SUBMIT_CHAT_WITH_SCAFFOLD";
        } else {
            alert("Please enter a message before sending.");
            temp_instant_event = "CANCEL_CHAT_WITH_SCAFFOLD_SUBMIT";
        }
        sendEventMessage('', getCurrentTimestamp(), "CHAT_WITH_SCAFFOLD", "MOUSE_CLICK", "CHAT_WITH_SCAFFOLD_CHAT_SUBMIT_QUESTION", "CHAT_WITH_SCAFFOLD", "CHAT_WITH_SCAFFOLD_CHAT_SEND_BTN", temp_instant_event, "QUESTION:::" + message, e);
    });

    // input keyup event
    gptChatWithScaffoldsChatInput.addEventListener('keydown', (e) => {
        stopEventPropagation(e);
        if (e.key === 'Enter') {
            if (e.ctrlKey) {
                // Ctrl + Enter to submit the question
                e.preventDefault();
                const message = gptChatWithScaffoldsChatInput.innerText.trim();
                let temp_instant_event = "";
                if (message !== '') {
                    gptChatWithScaffoldsChatInput.innerText = "";
                    appendGeneralQuestionHtml(message, getCurrentTimestamp(), "", false, false, "", gptChatWithScaffoldsMessageDiv);
                    requestGptChatWithScaffolds(message, gptChatWithScaffoldOrder);
                    temp_instant_event = "ENTER_SUBMIT_SCAFFOLD_CHAT";

                } else {
                    alert("Please enter a message before sending.");
                    temp_instant_event = "CANCEL_SCAFFOLD_SUBMIT";
                }
                sendEventMessage('', getCurrentTimestamp(), "CHAT_WITH_SCAFFOLD", "KEYBOARD_STROKE", "CHAT_WITH_SCAFFOLD_CHAT_SUBMIT_QUESTION", "CHAT_WITH_SCAFFOLD", "CHAT_WITH_SCAFFOLD_CHAT_SEND_BTN", temp_instant_event, "QUESTION:::" + message, e);
            } else {
                // Enter key adds a new line
                // Do nothing special, allow default behavior
            }
        }

        sendEventMessage("", getCurrentTimestamp(), "CHAT_WITH_SCAFFOLD", "KEYBOARD_STROKE", "CHAT_WITH_SCAFFOLD_CHAT_INPUT", "CHAT_WITH_SCAFFOLD", "CHAT_WITH_SCAFFOLD_CHAT_INPUT", "WRITE", "KEY:::" + e.key + "---" + e.code, e);
    });

}

function myCallbackGptScaffold(contains, element) {

    console.log("gpt scaffold contains:" + contains);

    let saveTime;

    let eventValue;
    if (contains) {
        // console.log('Element with id:', element.id, 'has the "in-tools" class!');
        saveTime = getCurrentTimestamp();
        gptChatWithScaffoldsInstantEvent = "OPEN";
        eventValue = "START_USE_TOOL:::" + saveTime;
        gptChatWithScaffoldsToolStartUseTime = saveTime;
        // console.log('gptScaffoldToolStartUseTime:' + gptChatWithScaffoldsToolStartUseTime);
        // console.log("-------------------------gptScaffoldTool OPEN");
        // sendMyTraceDataPost("/trace-chatgpt-scaffold", saveTime, "CHAT_WITH_SCAFFOLD", gptChatWithScaffoldsPageEvent, gptChatWithScaffoldsClickTargetObject, gptChatWithScaffoldsInstantEvent, eventValue, null);
        sendEventMessage("", saveTime, "CHAT_WITH_SCAFFOLD", gptChatWithScaffoldsPageEvent, `${gptChatWithScaffoldsInstantEvent}_CHAT_WITH_SCAFFOLD`, "CHAT_WITH_SCAFFOLD", gptChatWithScaffoldsClickTargetObject, gptChatWithScaffoldsInstantEvent, eventValue, null);

    } else {
        if (gptChatWithScaffoldsInstantEvent !== "CLOSE") {
            // console.log('Element with id:', element.id, 'has not the "in-tools" class!');
            saveTime = getCurrentTimestamp();
            gptChatWithScaffoldsInstantEvent = "CLOSE";
            if (gptChatWithScaffoldsToolStartUseTime === 0) {
                eventValue = "TOOL_USE_LENGTH:::ERROR-" + (saveTime - gptChatWithScaffoldsToolStartUseTime);
            } else {
                eventValue = "TOOL_USE_LENGTH:::" + (saveTime - gptChatWithScaffoldsToolStartUseTime);
            }
            // console.log('gptChatWithScaffolds tool use length:' + (saveTime - gptChatWithScaffoldsToolStartUseTime));
            // console.log("-------------------------gptScaffoldTool CLOSE");
            // sendMyTraceDataPost("/trace-chatgpt-scaffold", saveTime, "CHAT_WITH_SCAFFOLD", gptChatWithScaffoldsPageEvent, gptChatWithScaffoldsClickTargetObject, gptChatWithScaffoldsInstantEvent, eventValue, null);
            sendEventMessage("", saveTime, "CHAT_WITH_SCAFFOLD", gptChatWithScaffoldsPageEvent, `${gptChatWithScaffoldsInstantEvent}_CHAT_WITH_SCAFFOLD`, "CHAT_WITH_SCAFFOLD", gptChatWithScaffoldsClickTargetObject, gptChatWithScaffoldsInstantEvent, eventValue, null);
        } else {
            // console.log('Element with id:', element.id, 'is keep closed');
        }
    }
    gptChatWithScaffoldsClickTargetObject = "NO_TARGET_OBJECT";
    gptChatWithScaffoldsPageEvent = "NO_PAGE_EVENT";
}

handleClassMutation(collapseGptChatWithScaffolds, myCallbackGptScaffold); //监听






