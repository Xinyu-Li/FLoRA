function render() {
    if (typeof allowGptScaffoldsChat == 'undefined') {
        allowGptScaffoldsChat = false;
    }
    let scaffoldsChatHtml = `
        <div class="input-group mt-2 d-none" id="gpt-scaffold-chat-panel-box" style="min-height:40px; max-height:100px; height:20%;">
            <div contenteditable="true" id="gpt-scaffold-chat-input" class="form-control"></div>
            <button type="button" class="btn btn-outline-primary" id="gpt-scaffold-chat-send-question-btn" style="float: right">${gptScaffoldChatSendBtnText}</button>   
        </div>`;
    let scaffoldsToolHtml = `<!-- scaffolds Tool Html  -->
        <div class="my-horizontal-collapse-tools planner2" id="gpt-scaffolds-collapse"  style="z-index: 198;">
            <div class="card card-body overflow-auto" style="height:100%;">
                <h3 class="mt-2 mb-2" ><span>${gptScaffoldingTitle}</span> <button type="button" class="btn btn-close" style="position:absolute; right:20px;" aria-label="Close" id="close-gpt-scaffolds-btn"></button></h3>
                <div id="display-gpt-scaffolds-message-container-div" style="overflow-y: auto; height:100%; word-wrap: break-word; white-space : normal;">
                    <div id="display-gpt-scaffolds-message-div" class="form-control"> <!--style="overflow-y:auto; height:100%; word-wrap: break-word; white-space : normal;"-->
                    </div>
                </div>
                
                ${allowGptScaffoldsChat ? scaffoldsChatHtml : ''}
            </div>
        </div>`;


    $("body").append(scaffoldsToolHtml);
}

render();

//7, 14, 21, 28

let collapseGPTScaffolds = document.querySelector("#gpt-scaffolds-collapse");
toolList1.push(collapseGPTScaffolds);
let showGPTScaffoldsBtn = document.querySelector("#show-gpt-scaffolds-btn");
let closeGPTScaffoldsBtn = document.querySelector("#close-gpt-scaffolds-btn");
let gptScaffoldsMessageDiv = document.querySelector("#display-gpt-scaffolds-message-div");
let gptScaffoldsChatSendBtn = document.querySelector("#gpt-scaffold-chat-send-question-btn");
let gptScaffoldsChatInput = document.querySelector("#gpt-scaffold-chat-input");
let gptScaffoldsAgentsListPanel = document.querySelector("#gpt-scaffold-agents-list-panel");
let gptScaffoldsChatPanelBox = document.querySelector("#gpt-scaffold-chat-panel-box");

let gptScaffoldOrder = 1;

let scaffoldBgColor = "#c1d2ed";
let scaffoldReminderBgColor = "#ead1a2";

// TODO
// 1. scaffold 触发之后才能聊天
// 2. 允许聊天之后4 分钟，发送提示信息，关闭聊天
// 3. 下一个scaffold  触发之后，打开聊天
// 4. 如果学生没有收到scaffold，给一个encourage information


//This 4 variables are only used for tool open/close event
let gptScaffoldsClickTargetObject = "NO_TARGET_OBJECT";
let gptScaffoldsPageEvent = "NO_PAGE_EVENT";
let gptScaffoldsToolStartUseTime = 0;
let gptScaffoldsInstantEvent = "CLOSE";


// 替换公共方法
/*function generateGptScaffolds(answer, timestamp, order) {
    answer = answer.replace(/\n/g, '<br>');
    return `
        <div class="gpt-scaffold-message-content" id="scaffold${order}">
            <div class="gpt-scaffold-bot-answer">
                <h6> </h6>
                ${answer}<br><span class="timestamp">${timestamp}</span>
            </div>
        </div>`;
}
function createGptScaffoldsProcessingMessage() {
    const timestamp = new Date().toLocaleTimeString();
    const processingMessage = document.createElement("div");  // 此处必须要有一个dom 对象
    processingMessage.innerHTML = generateAnswerHtml("Processing", timestamp);
    return processingMessage;
}*/

/*function displayShadowAndTurnOffOtherWindow() {
    if (!collapseGPTScaffolds.classList.contains("in-tools")) {
        //如果没打开，则强制点击打开
        collapseGPTScaffolds.classList.toggle("in-tools");
        $("#scaffold-shadow-div").css("display", "block");
    }

    showGPTScaffoldsBtn.querySelector("span").classList.add("d-none");

    if (offcanvasRightNotesDiv.classList.contains("show")) {//如果annotation 侧边栏是打开的
        $(showAnnotationSideBarBtn).click();
        annotationClickTargetObject = "SCAFFOLD_FORCE_VIEW";
        annotationPageEvent = "AUTO_CLOSE";
        // moveTogetherWithSidebarClose();
    }
    localStorage.setItem(userId + "-" + currentCourseId + "-gptscaffold-" + (gptScaffoldOrder-1) + "-view-status", "true");
    // sendMyTraceDataPost("/trace-chatgpt-scaffold", getCurrentTimestamp(), "CHATGPT_SCAFFOLD", "NO_PAGE_EVENT", "NO_TARGET_OBJECT", "CHATGPT_SCAFFOLD_FORCE_VIEW", "GPT_SCAFFOLD_ORDER:::" + gptScaffoldOrder, null);
    sendEventMessage("", getCurrentTimestamp(), "CHATGPT_SCAFFOLD", "NO_PAGE_EVENT", subActionLabelMap["CHATGPT_SCAFFOLD_CHATGPT_SCAFFOLD_FORCE_VIEW"], "CHATGPT_SCAFFOLD","NO_TARGET_OBJECT", "CHATGPT_SCAFFOLD_FORCE_VIEW", "GPT_SCAFFOLD_ORDER:::" + gptScaffoldOrder, null);
}

function forceViewGPTScaffold() {
    let scaffoldTriggerTimestamp = parseInt(localStorage.getItem(userId + "-" + currentCourseId + "-gptscaffold-" + (gptScaffoldOrder-1) + "-trigger-timestamp"));
    let scaffoldViewStatus = localStorage.getItem(userId + "-" + currentCourseId + "-gptscaffold-" + (gptScaffoldOrder-1) + "-view-status");
    if (scaffoldTriggerTimestamp === null || scaffoldViewStatus === null) {
        // console.log("no gpt scaffold " + (gptScaffoldOrder-1) + " trigger timestamp or view status");
        return;
    }
    let timeLeftSeconds = 60 - (getCurrentTimestamp() - scaffoldTriggerTimestamp) / 1000;
    // console.log("forceViewGPTScaffold ------timeLeftSeconds----" + timeLeftSeconds);
    if (timeLeftSeconds <= 0) {
        if (scaffoldViewStatus === "false") {
            displayShadowAndTurnOffOtherWindow();
        } else {
            // console.log("time left less than 0");
            return;
        }
    }
    setTimeout(function () {
        // console.log("gpt scaffold into settimeout 1 min");
        if (scaffoldViewStatus === "false") { //如果1分钟之后没有触发，则强制触发
            displayShadowAndTurnOffOtherWindow();
        }
    }, timeLeftSeconds * 1000);
}*/

function generateViewStatusKey(userId, courseId, scaffoldOrder) {
    return `${userId}-${courseId}-gptscaffold-${scaffoldOrder}-view-status`;
}

function turnOnChat() {
    // 展示chat
    gptScaffoldsChatPanelBox.classList.remove("d-none");

}

function turnOffChat() {
    // disable chat

}

function createDynamicBlankDiv(container, blankHeight) {
    console.log("create blank div--------blankHeight:", blankHeight);
    const blankDiv = document.createElement('div');
    blankDiv.className = 'gpt-scaffold-blank-space';
    blankDiv.style.width = '100%';
    blankDiv.style.height = blankHeight + 'px';
    // 可以给空白div设置透明或背景色
    blankDiv.style.background = 'transparent';
    container.appendChild(blankDiv);
    scrollToChatBottom(container);
}

function updateDynamicBlankDiv(blankDiv, blankHeight) {
    blankDiv.style.height = blankHeight + 'px';
}

function requestGPTScaffolds(order) {

    const processingMessage = appendGeneralProcessingMessage(gptScaffoldsMessageDiv, "#49a5ba");

    // $(gptScaffoldsMessageDiv).append(processingMessage);
    // $(gptScaffoldsMessageDiv).scrollTop(gptScaffoldsMessageDiv.scrollHeight);

    let gptScaffoldData = {
        gptScaffoldNumber: order,
        gptScaffoldPromptVO: gptScaffoldAgent.triggerConfigs.timeRangeTriggers[order - 1],
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
        gptScaffoldRole: gptScaffoldRole,   // chatgpt role 用来初步区分 访问python 端的 url
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
        allowGptScaffoldsChat: allowGptScaffoldsChat,
        agentName: gptScaffoldAgent.agentName // assistant name/agent name， 可以找到preprompt
    }
    sendEventMessage("", getCurrentTimestamp(), "CHATGPT_SCAFFOLD", "NO_PAGE_EVENT", subActionLabelMap["CHATGPT_SCAFFOLD_CHATGPT_SCAFFOLD_TRIGGERED"], "CHATGPT_SCAFFOLD", "NO_TARGET_OBJECT", "CHATGPT_SCAFFOLD_TRIGGERED", "GPT_SCAFFOLD_ORDER:::" + order, null);

    if (order === 1) {
        if (allowGptScaffoldsChat) { //在第一个scaffold 触发之前，同时给出reminder 信息
            appendGeneralGptScaffoldsOrHint(chatReminderMessage, new Date(getCurrentTimestamp()).toLocaleTimeString(), order, 0, false, 0, "reminder", scaffoldReminderBgColor, gptScaffoldsMessageDiv)
            turnOnChat();
            sendEventMessage("", getCurrentTimestamp(), "CHATGPT_SCAFFOLD", "NO_PAGE_EVENT", "CHATGPT_SCAFFOLD_START_REMINDER_TRIGGERED", "CHATGPT_SCAFFOLD", "NO_TARGET_OBJECT", "START_REMINDER_TRIGGERED", "GPT_SCAFFOLD_ORDER:::" + order, null);
        }
    }

    $.ajax({
        url: apiBaseUrl + "/chatgpt-scaffold",
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
                const readableTime = new Date(parseInt(data.data.gptResponseTime, 10)).toLocaleTimeString();
                removeGeneralProcessingMessage(processingMessage)
                if (data.data === null) {
                    //表示没有返回GPT scaffold， 可以直接展示default scaffolds TODO

                    // appendGeneralGptScaffoldsOrHint(gptScaffoldAgent.triggerConfigs.defaultTriggers[order - 1].message, readableTime, order, "#c192e8", gptScaffoldsMessageDiv);
                    // sendEventMessage("", getCurrentTimestamp(), "CHATGPT_SCAFFOLD", "NO_PAGE_EVENT", "READ_DEFAULT_MESSAGE", "CHATGPT_SCAFFOLD","NO_TARGET_OBJECT", "CHATGPT_SCAFFOLD_RECEIVED", "GPT_SCAFFOLD_ORDER:::" + order, null);
                } else {
                    // Remove the processing sign

                    let resContent = data.data.gptScaffoldContent; //.replace("\n", "<br>"); //answer = answer.replace("\n", "<br>")
                    if (resContent === "gpt-error") {
                        resContent = "There is an error from Chatgpt, Please re-send your question.";
                    }
                    if (resContent.startsWith("default")) {
                        resContent = "";
                        localStorage.setItem(generateViewStatusKey(userId, currentCourseId, order), "true");
                    } else {
                        // let replyHtml = generateGptScaffolds(resContent, timestamp, order);
                        // $(gptScaffoldsMessageDiv).append(replyHtml);
                        // $(gptScaffoldsMessageDiv).scrollTop(gptScaffoldsMessageDiv.scrollHeight);

                        // 先判断最后一个元素是否是空白元素，如果是则删除。
                        const lastElem1 = gptScaffoldsMessageDiv.lastElementChild;
                        if (lastElem1 && lastElem1.classList.contains("gpt-scaffold-blank-space")) {
                            lastElem1.remove();
                        }

                        appendGeneralGptScaffoldsOrHint(resContent, readableTime, order, data.data.id, true, 0, "scaffold", scaffoldBgColor, gptScaffoldsMessageDiv);
                        const lastElem2 = gptScaffoldsMessageDiv.lastElementChild;
                        createDynamicBlankDiv(gptScaffoldsMessageDiv, gptScaffoldsMessageDiv.clientHeight - lastElem2.offsetHeight);
                        // addEventForEachScaffold(order);

                        // 展示alert message
                        showGPTScaffoldsBtn.querySelector("span.gpt-scaffold-flash-icon").classList.remove("d-none");

                        localStorage.setItem(generateViewStatusKey(userId, currentCourseId, order), "false");
                    }
                    // localStorage.setItem(userId + "-" + currentCourseId + "-gptscaffold-" + order + "-trigger-timestamp", "" + getCurrentTimestamp());
                    // sendMyTraceDataPost("/trace-chatgpt-scaffold", getCurrentTimestamp(), "CHATGPT_SCAFFOLD", "NO_PAGE_EVENT", "NO_TARGET_OBJECT", "CHATGPT_SCAFFOLD_RECEIVED", "GPT_SCAFFOLD_ORDER:::" + order, null);
                    sendEventMessage("", getCurrentTimestamp(), "CHATGPT_SCAFFOLD", "NO_PAGE_EVENT", subActionLabelMap["CHATGPT_SCAFFOLD_CHATGPT_SCAFFOLD_RECEIVED"], "CHATGPT_SCAFFOLD", "NO_TARGET_OBJECT", "CHATGPT_SCAFFOLD_RECEIVED", "GPT_SCAFFOLD_ORDER:::" + order, null);
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
    return order + 1;
}

function loadGPTScaffolds() {

    // console.log("loadGPTScaffolds-----------");
    $.get(apiBaseUrl + "/load-chatgpt-scaffold/" + userId + "/" + currentCourseId + "/" + allowGptScaffoldsChat, function (data, status) {
        if (status === "success") {
            console.log("gptscaffold:", data);
            const scaffoldHistory = data.data;
            // console.log("------------------------")
            // console.log("gptscaffold:", scaffoldHistory);
            $(gptScaffoldsMessageDiv).empty();

            let index = 1;
            // if (scaffoldHistory !== null) {
            let countRound = 1;

            if (scaffoldHistory !== null && scaffoldHistory.length !== 0 && allowGptScaffoldsChat) {

                appendGeneralGptScaffoldsOrHint(chatReminderMessage, new Date(getCurrentTimestamp()).toLocaleTimeString(), index, 0, false, 0, "reminder", scaffoldReminderBgColor, gptScaffoldsMessageDiv)
                turnOnChat(); // 只要scaffold 触发过一次，就保持chat 打开

            }
            scaffoldHistory?.forEach(scaffold => {
                // console.log("scaffold:", scaffold);
                if (!scaffold.gptScaffoldContent.startsWith("no scaffold generated") && !(scaffold.gptScaffoldContent.trim() === "") && !(scaffold.gptScaffoldContent.startsWith("default"))) {
                    const readableTime = new Date(parseInt(scaffold.gptResponseTime, 10)).toLocaleTimeString();
                    // $(gptScaffoldsMessageDiv).append(generateGptScaffolds(scaffold.gptScaffoldContent, timestamp, index));

                    appendGeneralGptScaffoldsOrHint(scaffold.gptScaffoldContent, readableTime, index, scaffold.id, true, scaffold.responseRatingThumb, "scaffold", scaffoldBgColor, gptScaffoldsMessageDiv);

                    // addEventForEachScaffold(index);
                } // 否则表示scaffold 未生成，不显示该scaffold
                scaffold.userChatgptLogVOList?.forEach(userChatgptLog => {
                    console.log("userChatgptLog:", userChatgptLog);
                    appendGeneralQuestionHtml(userChatgptLog.userQuestions, userChatgptLog.userAskTime, userChatgptLog.id, false, false, "", gptScaffoldsMessageDiv);
                    appendGeneralAgentAnswerHtml(userChatgptLog.chatgptAnswer, userChatgptLog.chatgptResponseTime, userChatgptLog.questionId, userChatgptLog.id, gptScaffoldAgent.agentDisplayName, gptScaffoldAgent.agentAvatarSvg, true, userChatgptLog.responseRatingThumb, countRound, "", gptScaffoldsMessageDiv);
                    countRound++;
                })

                index += 1;
            });

            gptScaffoldOrder = index;

            $(gptScaffoldsMessageDiv).animate({scrollTop: $(gptScaffoldsMessageDiv).prop("scrollHeight")}, 1000);

            let lastScaffoldViewStatus = localStorage.getItem(generateViewStatusKey(userId, currentCourseId, gptScaffoldOrder - 1));
            console.log("scaffoldViewStatus-----" + lastScaffoldViewStatus + "-----" + generateViewStatusKey(userId, currentCourseId, gptScaffoldOrder - 1));
            // console.log("scaffoldHistory-----" + scaffoldHistory !== null ? scaffoldHistory.length : "null");

            //表示有scaffold，但是由于界面切换导致 view-status没有被存入localStorage
            if ((lastScaffoldViewStatus === null && scaffoldHistory !== null && scaffoldHistory.length !== 0) ||
                (lastScaffoldViewStatus !== null && lastScaffoldViewStatus === "false")) { // 如果换页则继续之前的message 展示状态
                showGPTScaffoldsBtn.querySelector("span.gpt-scaffold-flash-icon").classList.remove("d-none");
            }

        } else {
            // console.log("no chatgpt-scaffold history------gptScaffoldOrder:" + gptScaffoldOrder);
        }
    });
    // forceViewGPTScaffold();
}


function setupGPTScaffoldsTool() {
    let tempTaskStartTimestamp = parseInt(localStorage.getItem(`${userId}-${currentCourseId}-taskStartTimestamp`)) || 0;
    let currentTriggers = gptScaffoldAgent.triggerConfigs.timeRangeTriggers;
    let gptScaffoldInterval = setInterval(function () {
        let spendTimeSeconds = (getCurrentTimestamp() - tempTaskStartTimestamp) / 1000;
        // 获取当前的触发时间

        // console.log("gptScaffoldorder:", gptScaffoldOrder);
        if (gptScaffoldOrder <= currentTriggers.length) {
            let currentTriggerMinute = currentTriggers[gptScaffoldOrder - 1].triggerMinute;

            console.log(".....taskSpendTimeSeconds:" + spendTimeSeconds + ".....currentTriggerSecond:" + currentTriggerMinute * 60);

            if (spendTimeSeconds >= (60 * currentTriggerMinute)) {

                gptScaffoldOrder = requestGPTScaffolds(gptScaffoldOrder);
            } else {
                // console.log("gpt scaffolding not trigger.....gptScaffoldOrder:" + gptScaffoldOrder);
                // console.log("gpt scaffolding not trigger.....spendTimeSeconds:" + spendTimeSeconds + ".....currentTriggerSecond:" + currentTriggerMinute * 60);
            }
        } else if (gptScaffoldOrder === currentTriggers.length + 1) {

            console.log("gpt scaffolding triggering finish!!!!!");
            clearInterval(gptScaffoldInterval);
        }

    }, 5 * 1000); //7 * 60 * 1000

    if (allowGptScaffoldsChat) {
        let reminderInterval = setInterval(function () {
            //设置 开始chat 之后的reminder 4 分钟或者下一个scaffold触发前1分钟
            if (gptScaffoldsToolStartUseTime !== 0) {
                let currentTimestamp = getCurrentTimestamp();
                let spendTimeSeconds = (currentTimestamp - tempTaskStartTimestamp) / 1000;
                // 获取当前的触发时间
                if (gptScaffoldOrder <= currentTriggers.length) { // 标识scaffold 还未触发完
                    let currentTriggerMinute = currentTriggers[gptScaffoldOrder - 1].triggerMinute;
                    let gptScaffoldTriggerSeconds = currentTriggerMinute * 60 + 5; // 秒数 + 大概延迟 5 秒
                    let usageSeconds = (gptScaffoldsToolStartUseTime - tempTaskStartTimestamp) / 1000; // 从开始到现在工具开始使用，一共多少秒
                    let checkChatTimeSeconds = (currentTimestamp - tempTaskStartTimestamp) / 1000; // check的时间点

                    let spendChatTimeSeconds;
                    if (checkChatTimeSeconds > Math.max(gptScaffoldTriggerSeconds, usageSeconds)) {
                        spendChatTimeSeconds = checkChatTimeSeconds - Math.max(gptScaffoldTriggerSeconds, usageSeconds);
                    } else {
                        spendChatTimeSeconds = checkChatTimeSeconds - Math.min(gptScaffoldTriggerSeconds, usageSeconds);
                    }


                    console.log(`currentTriggerMinute: ${currentTriggerMinute}-----gptScaffoldsToolStartUseTime: ${gptScaffoldsToolStartUseTime}------Chat spendChatTimeSeconds: ${spendChatTimeSeconds}----------gptScaffoldTriggerSeconds: ${gptScaffoldTriggerSeconds}---------usageSeconds: ${usageSeconds}`);
                    let reminderTriggered = localStorage.getItem(`${userId}-${currentCourseId}-${gptScaffoldOrder - 1}-reminder-triggered`);
                    if (!reminderTriggered && spendChatTimeSeconds >= 240 && spendTimeSeconds <= (currentTriggerMinute - 1) * 60 && collapseGPTScaffolds.classList.contains("in-tools")) { // 超过4分钟，240秒, 在下一个scaffold 触发一分钟之前，且scaffold window 必须是open的
                        // 提示reminder
                        appendGeneralGptScaffoldsOrHint(scaffoldChatReminder, new Date(currentTimestamp).toLocaleTimeString(), gptScaffoldOrder - 1, 0, false, 0, "reminder", scaffoldReminderBgColor, gptScaffoldsMessageDiv)
                        sendEventMessage("", getCurrentTimestamp(), "CHATGPT_SCAFFOLD", "NO_PAGE_EVENT", "CHATGPT_SCAFFOLD_CHAT_REMINDER_TRIGGERED", "CHATGPT_SCAFFOLD", "NO_TARGET_OBJECT", "CHAT_REMINDER_TRIGGERED", "GPT_SCAFFOLD_ORDER:::" + (gptScaffoldOrder - 1), null);
                        localStorage.setItem(`${userId}-${currentCourseId}-${gptScaffoldOrder - 1}-reminder-triggered`, "1");
                    }
                } else { //标识scaffold 触发完成
                    clearInterval(reminderInterval);
                }
            } else {

            }
        }, 5000);
    }
    collapseGPTScaffolds.addEventListener("click", function (e) {
        stopEventPropagation(e);
        let tempTarget = null;
        let temp_instant_event = "";
        let temp_event_value = "";

        if (e.target && e.target.matches('div.gpt-scaffold-message-content')) {
            tempTarget = e.target.id;
            temp_instant_event = "CLICK";
        } else if (e.target.classList.contains('thumbs-up-icon') || e.target.classList.contains('thumbs-down-icon')) {
            let isUp = e.target.classList.contains('thumbs-up-icon');
            let isDown = e.target.classList.contains('thumbs-down-icon');
            let sibling; // 另一个图标
            if (isUp) sibling = e.target.parentNode.querySelector('.thumbs-down-icon');
            if (isDown) sibling = e.target.parentNode.querySelector('.thumbs-up-icon');

            let thumbStatus = changeThumbDisplay(e.target, sibling, isUp ? isUp : isDown);

            // 查找最近的 message-content 或 gpt-scaffold-message-content 以获得 messageId
            let container = e.target.closest('.gpt-scaffold-message-content, .bot-answer');
            if (!container) return;
            let messageId = container.dataset.messageid;

            let ratingContainerType = "";
            // {实际请求的函数，这两行为关键}
            if (container.classList.contains('gpt-scaffold-message-content')) {
                ratingContainerType = "scaffold";
            } else if (container.classList.contains('bot-answer')) {
                ratingContainerType = "chat";
            }
            requestGeneralChangeThumb(messageId, thumbStatus, ratingContainerType);
            temp_instant_event = isUp ? "RATING_THUMB_UP" : "RATING_THUMB_DOWN";
            temp_event_value = "MESSAGE_ID:::" + messageId;
        }

        // console.log("collapseGPTScaffolds click");
        // sendMyTraceDataPost("/trace-chatgpt-scaffold", getCurrentTimestamp(), "CHATGPT_SCAFFOLD", "MOUSE_CLICK", null, "CLICK", "", e); //当select text时候会触发，mouse down up click 事件
        sendEventMessage("", getCurrentTimestamp(), "CHATGPT_SCAFFOLD", "MOUSE_CLICK", subActionLabelMap["CHATGPT_SCAFFOLD_CLICK"], "CHATGPT_SCAFFOLD", tempTarget, temp_instant_event, temp_event_value, e);

    });
    //当鼠标在搜索annotation框区域移动时候，所有移动和滚动行为都标注为 SEARCH_ANNOTATION
    collapseGPTScaffolds.addEventListener("wheel", function (e) {
        stopEventPropagation(e);
        let tempTarget = null;
        if (e.target && e.target.matches('div.gpt-scaffold-message-content')) {
            tempTarget = e.target.id;
        }
        // mousewheelData.push(generateMouseWheelData(e, "READ_GPT_SCAFFOLD"));
        sendEventMessage("", getCurrentTimestamp(), "CHATGPT_SCAFFOLD", "MOUSE_WHEEL", "READ_GPT_SCAFFOLD", "CHATGPT_SCAFFOLD", tempTarget, "NO_INSTANT_EVENT", "SCROLL_DIST:::" + e.deltaY, e);
    });
    collapseGPTScaffolds.addEventListener('mousemove', function (e) {
        stopEventPropagation(e);
        mousePosition = generateMousePositionData(e, "READ_GPT_SCAFFOLD", "CHATGPT_SCAFFOLD");
    });
    collapseGPTScaffolds.addEventListener('mouseup', function (e) {
        stopEventPropagation(e);
        let tempTarget = null;
        if (e.target && e.target.matches('div.gpt-scaffold-message-content')) {
            tempTarget = e.target.id;
        }
        if (window.getSelection() != null && window.getSelection().toString().replace(/\n/g, '').length > 0) {
            let selectText = window.getSelection().toString();
            // sendMyTraceDataPost("/trace-chatgpt-scaffold", getCurrentTimestamp(), "CHATGPT_SCAFFOLD", "MOUSE_SELECT_TEXT", null, "SELECT_TEXT", "MOUSE_SELECT:::" + selectText, e);
            sendEventMessage("", getCurrentTimestamp(), "CHATGPT_SCAFFOLD", "MOUSE_SELECT_TEXT", subActionLabelMap["CHATGPT_SCAFFOLD_SELECT_TEXT"], "CHATGPT_SCAFFOLD", tempTarget, "SELECT_TEXT", "MOUSE_SELECT:::" + selectText, e);
            // console.log("send post for select text-------------------------------------" + selectText + "-------");
        }
    });


    closeGPTScaffoldsBtn.addEventListener("click", function (e) {
        // console.log("----------------------------------------closeGPTScaffoldsBtn clicked");
        stopEventPropagation(e);
        collapseGPTScaffolds.classList.toggle("in-tools");
        toolsAndEssayToggle(collapseGPTScaffolds);

        gptScaffoldsClickTargetObject = "CLOSE_GPT_SCAFFOLD_BTN";
        gptScaffoldsPageEvent = "MOUSE_CLICK";
    });

    showGPTScaffoldsBtn.addEventListener("mousedown", function (e) {e.stopPropagation();});
    showGPTScaffoldsBtn.addEventListener("click", function (e) {
        // console.log("----------------------------------------showGPTScaffoldsBtn clicked");
        stopEventPropagation(e);
        if (useAnnotationTool) hideAnnotationToolbox(); // 隐藏annotation toolbox，当点击其他按钮时候
        collapseGPTScaffolds.classList.toggle("in-tools");
        toolsAndEssayToggle(collapseGPTScaffolds);
        // 如果alert message 包含d-none, 则不需要添加d-none， 如何不包含，则添加d-none， 关闭alert message
        if (!showGPTScaffoldsBtn.querySelector("span.gpt-scaffold-flash-icon").classList.contains("d-none")) {

            localStorage.setItem(generateViewStatusKey(userId, currentCourseId, gptScaffoldOrder - 1), "true"); // 此处scaffoldOrder -1 是为了获取已经触发过的 order
            showGPTScaffoldsBtn.querySelector("span.gpt-scaffold-flash-icon").classList.add("d-none");


        }

        // 开始计时, 每次关闭窗口，再打开，需要重新计时
        // localStorage.setItem(`${userId}-${currentCourseId}-gpt-scaffold--${gptScaffoldOrder - 1}-chat-start-timestamp`, "" + getCurrentTimestamp());

        gptScaffoldsClickTargetObject = "SHOW_GPT_SCAFFOLD_BTN";
        gptScaffoldsPageEvent = "MOUSE_CLICK";
        // console.log("--------------gptScaffoldsPageEvent:" + gptScaffoldsPageEvent);
        sendEventMessage("", getCurrentTimestamp(), "CHATGPT_SCAFFOLD", gptScaffoldsPageEvent, subActionLabelMap["CHATGPT_SCAFFOLD_CLICK"], "CHATGPT_SCAFFOLD", gptScaffoldsClickTargetObject, "SHOW_GPT_SCAFFOLD_BTN_CLICK", "", null);
    });

    gptScaffoldsMessageDiv.addEventListener("wheel", function(e) {
        // console.log("wheel:" + gptScaffoldsMessageDiv.scrollTop);
        // console.log("wheel:" + gptScaffoldsMessageDiv.scrollHeight);

        //TODO 当向上滚动时候，删除掉 添加的blank
        if (e.deltaY < 0) {
            console.log("向上滚动");
            const lastElem1 = gptScaffoldsMessageDiv.lastElementChild;
            if (lastElem1 && lastElem1.classList.contains("gpt-scaffold-blank-space")) {
                lastElem1.remove();
            }
        }
    });

    if (typeof allowGptScaffoldsChat !== "undefined" && allowGptScaffoldsChat) { //
        // send btn event
        gptScaffoldsChatSendBtn.addEventListener('click', (e) => {
            stopEventPropagation(e);
            console.log("into submit");
            e.preventDefault();
            const message = gptScaffoldsChatInput.innerText.trim();
            let temp_instant_event = "";
            if (message !== '') {
                // TODO 发送GPT chat请求
                // let currentThreadId = localStorage.getItem(userId + "-" + currentCourseId + "-" + gptScaffoldAgent.agentName + "-agent-thread-id") || "";
                appendGeneralQuestionHtml(message, getCurrentTimestamp(), "", false, false, "", gptScaffoldsMessageDiv);
                askGeneralSpecifiedAgentQuestion(message, gptScaffoldAgent, "", false, false, "", "", "", gptScaffoldsMessageDiv, gptScaffoldsChatSendBtn, gptScaffoldsChatInput);
                temp_instant_event = "SUBMIT_SCAFFOLD_CHAT";
            } else {
                alert("Please enter a message before sending.");
                temp_instant_event = "CANCEL_SCAFFOLD_SUBMIT";
            }
            sendEventMessage('', getCurrentTimestamp(), "CHATGPT_SCAFFOLD", "MOUSE_CLICK", "CHATGPT_SCAFFOLD_CHAT_SUBMIT_QUESTION", "CHATGPT_SCAFFOLD", "CHATGPT_SCAFFOLD_CHAT_SEND_BTN", temp_instant_event, "QUESTION:::" + message, e);
        });

        // input keyup event
        gptScaffoldsChatInput.addEventListener('keydown', (e) => {
            stopEventPropagation(e);
            if (e.key === 'Enter') {
                if (e.ctrlKey) {
                    // Ctrl + Enter to submit the question
                    e.preventDefault();
                    const message = gptScaffoldsChatInput.innerText.trim();
                    let temp_instant_event = "";
                    if (message !== '') {
                        // TODO 发送GPT chat请求
                        // let currentThreadId = localStorage.getItem(userId + "-" + currentCourseId + "-" + gptScaffoldAgent.agentName + "-agent-thread-id") || "";
                        appendGeneralQuestionHtml(message, getCurrentTimestamp(), "", false, false, "", gptScaffoldsMessageDiv);
                        askGeneralSpecifiedAgentQuestion(message, gptScaffoldAgent, "", false, false, "", "", "", gptScaffoldsMessageDiv, gptScaffoldsChatSendBtn, gptScaffoldsChatInput);
                        temp_instant_event = "ENTER_SUBMIT_SCAFFOLD_CHAT";


                    } else {
                        alert("Please enter a message before sending.");
                        temp_instant_event = "CANCEL_SCAFFOLD_SUBMIT";
                    }
                    sendEventMessage('', getCurrentTimestamp(), "CHATGPT_SCAFFOLD", "KEYBOARD_STROKE", "CHATGPT_SCAFFOLD_CHAT_SUBMIT_QUESTION", "CHATGPT_SCAFFOLD", "CHATGPT_SCAFFOLD_CHAT_SEND_BTN", temp_instant_event, "QUESTION:::" + message, e);
                } else {
                    // Enter key adds a new line
                    // Do nothing special, allow default behavior
                }
            }

            sendEventMessage("", getCurrentTimestamp(), "CHATGPT_SCAFFOLD", "KEYBOARD_STROKE", "CHATGPT_SCAFFOLD_CHAT_INPUT", "CHATGPT_SCAFFOLD", "CHATGPT_SCAFFOLD_CHAT_INPUT", "WRITE", "KEY:::" + e.key + "---" + e.code, e);
        });
    }

    if (typeof allowGptScaffoldsChatMultiAgents !== "undefined" && allowGptScaffoldsChatMultiAgents) {
        gptScaffoldsAgentsListPanel.addEventListener("click", function (e) {
            stopEventPropagation(e);
            //需要知道选择了哪个
        });
    }
}

function myCallbackGptScaffold(contains, element) {

    console.log("gpt scaffold contains:" + contains);

    let saveTime;

    let eventValue;
    if (contains) {
        // console.log('Element with id:', element.id, 'has the "in-tools" class!');
        saveTime = getCurrentTimestamp();
        gptScaffoldsInstantEvent = "OPEN";
        eventValue = "START_USE_TOOL:::" + saveTime;
        gptScaffoldsToolStartUseTime = saveTime;
        // console.log('gptScaffoldToolStartUseTime:' + gptScaffoldsToolStartUseTime);
        // console.log("-------------------------gptScaffoldTool OPEN");
        // sendMyTraceDataPost("/trace-chatgpt-scaffold", saveTime, "CHATGPT_SCAFFOLD", gptScaffoldsPageEvent, gptScaffoldsClickTargetObject, gptScaffoldsInstantEvent, eventValue, null);
        sendEventMessage("", saveTime, "CHATGPT_SCAFFOLD", gptScaffoldsPageEvent, subActionLabelMap["CHATGPT_SCAFFOLD_" + gptScaffoldsInstantEvent], "CHATGPT_SCAFFOLD", gptScaffoldsClickTargetObject, gptScaffoldsInstantEvent, eventValue, null);

    } else {
        if (gptScaffoldsInstantEvent !== "CLOSE") {
            // console.log('Element with id:', element.id, 'has not the "in-tools" class!');
            saveTime = getCurrentTimestamp();
            gptScaffoldsInstantEvent = "CLOSE";
            if (gptScaffoldsToolStartUseTime === 0) {
                eventValue = "TOOL_USE_LENGTH:::ERROR-" + (saveTime - gptScaffoldsToolStartUseTime);
            } else {
                eventValue = "TOOL_USE_LENGTH:::" + (saveTime - gptScaffoldsToolStartUseTime);
            }
            // console.log('gptScaffolds tool use length:' + (saveTime - gptScaffoldsToolStartUseTime));
            // console.log("-------------------------gptScaffoldTool CLOSE");
            // sendMyTraceDataPost("/trace-chatgpt-scaffold", saveTime, "CHATGPT_SCAFFOLD", gptScaffoldsPageEvent, gptScaffoldsClickTargetObject, gptScaffoldsInstantEvent, eventValue, null);
            sendEventMessage("", saveTime, "CHATGPT_SCAFFOLD", gptScaffoldsPageEvent, subActionLabelMap["CHATGPT_SCAFFOLD_" + gptScaffoldsInstantEvent], "CHATGPT_SCAFFOLD", gptScaffoldsClickTargetObject, gptScaffoldsInstantEvent, eventValue, null);
        } else {
            // console.log('Element with id:', element.id, 'is keep closed');
        }
    }
    gptScaffoldsClickTargetObject = "NO_TARGET_OBJECT";
    gptScaffoldsPageEvent = "NO_PAGE_EVENT";
}

handleClassMutation(collapseGPTScaffolds, myCallbackGptScaffold); //监听






