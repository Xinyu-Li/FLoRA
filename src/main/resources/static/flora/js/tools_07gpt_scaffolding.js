function render() {
    let scaffoldsToolHtml = `<!-- scaffolds Tool Html  -->
        <div class="my-horizontal-collapse-tools planner2" id="gpt-scaffolds-collapse"  style="z-index: 201;">
            <div class="card card-body overflow-auto" style="height:100%;">
                <h3 class="mt-2 mb-2" ><span>${gptScaffoldingTitle}</span> <button type="button" class="btn btn-close" style="position:absolute; right:20px;" aria-label="Close" id="close-gpt-scaffolds-btn"></button></h3>
                <div class="form-control" id="display-gpt-scaffolds-message-div" style="height:100%; word-wrap: break-word; white-space : normal;">
                    <div class="gpt-scaffold-message-content" id="scaffold1">
                        <div class="gpt-scaffold-bot-answer">
                            <h6>Scaffold1</h6>
                            this is a test this is a testthis is a testthis is a testthis is a testthis is a testthis is a testthis is a testthis is a testthis is a test<br><span class="timestamp">2023-11-11</span>
                        </div>
                    </div>
                    <div class="gpt-scaffold-message-content" id="scaffold2">
                        <div class="gpt-scaffold-bot-answer">
                            <h6>Scaffold2</h6>
                            this is a test this is a testthis is a testthis is a testthis is a testthis is a testthis is a testthis is a testthis is a testthis is a test<br><span class="timestamp">2023-11-11</span>
                        </div>
                    </div>
                </div>
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
let gptScaffoldOrder = 1;

//This 4 variables are only used for tool open/close event
let gptScaffoldsClickTargetObject = "NO_TARGET_OBJECT";
let gptScaffoldsPageEvent = "NO_PAGE_EVENT";
let gptScaffoldsToolStartUseTime = 0;
let gptScaffoldsInstantEvent = "CLOSE";

function generateGptScaffolds(answer, timestamp, order) {
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
}

function displayShadowAndTurnOffOtherWindow() {
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
    localStorage.setItem(userId + "-" + currentCourseId + "gptscaffold-" + (gptScaffoldOrder-1) + "-view-status", "true");
    // sendMyTraceDataPost("/trace-chatgpt-scaffold", getCurrentTimestamp(), "CHATGPT_SCAFFOLD", "NO_PAGE_EVENT", "NO_TARGET_OBJECT", "CHATGPT_SCAFFOLD_FORCE_VIEW", "GPT_SCAFFOLD_ORDER:::" + gptScaffoldOrder, null);
    sendEventMessage("", getCurrentTimestamp(), "CHATGPT_SCAFFOLD", "NO_PAGE_EVENT", subActionLabelMap["CHATGPT_SCAFFOLD_CHATGPT_SCAFFOLD_FORCE_VIEW"], "CHATGPT_SCAFFOLD","NO_TARGET_OBJECT", "CHATGPT_SCAFFOLD_FORCE_VIEW", "GPT_SCAFFOLD_ORDER:::" + gptScaffoldOrder, null);
}

function forceViewGPTScaffold() {
    let scaffoldTriggerTimestamp = parseInt(localStorage.getItem(userId + "-" + currentCourseId + "gptscaffold-" + (gptScaffoldOrder-1) + "-tigger-timestamp"));
    let scaffoldViewStatus = localStorage.getItem(userId + "-" + currentCourseId + "gptscaffold-" + (gptScaffoldOrder-1) + "-view-status");
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
}

function requestGPTScaffolds(order) {

    const processingMessage = createGptScaffoldsProcessingMessage();
    $(gptScaffoldsMessageDiv).append(processingMessage);
    $(gptScaffoldsMessageDiv).scrollTop(gptScaffoldsMessageDiv.scrollHeight);

    let gptScaffoldData = {
        gptScaffoldNumber: order,
        gptScaffoldPromptVO: gptScaffoldNeedCheckSRLProcessPrompt[order - 1],
        testISDIMUName: testISDIMUName,
        preTestName: preTestName,
        hasTakePreviousStudyTestName: hasTakePreviousStudyTestName,

        preTestCourseId: pretestNameCourseId,
        testISDIMUCourseId: testISDIMUCourseId,
        hasTakePreviousStudyTestNameCourseId: hasTakePreviousStudyTestNameCourseId,
        essay: mainEditor.getText(),
        subActionAndPromptList: gptScaffoldNeedCheckSubActionPrompt,

        savePlannerSelectedIndexPromptList: gptScaffoldNeedCheckSavePlannerSelectIndexPrompt,
        userId: userId,
        courseId: currentCourseId,
        includeEssay: gptScaffoldPromptIncludeEssay,
        gptScaffoldRole: gptScaffoldRole,
        gptScaffoldPromptTemplate: gptScaffoldPromptTemplate,

        gptScaffoldRoleDescription: gptScaffoldRoleDescription,
        userTakePreviousStudyPrompt: userTakePreviousStudyPrompt,
        srlModel: srlModel,
        // beginMinute: gptScaffoldNeedCheckSRLProcessPrompt[order - 1].beginMinute,
        // endMinute: gptScaffoldNeedCheckSRLProcessPrompt[order - 1].endMinute,

        classifySentenceBackgroundFileNameList: classifySentenceBackgroundFileNameList,
        pretestGradesPrompt: pretestGradesPrompt,
        isdimuScorePrompt: isdimuScorePrompt,
        srlProcessBackupPromptList: srlProcessBackupPromptList,
        backgroundFileNameList: gptScaffoldBackgroundFileNameList,
        gptScaffoldParameters: gptScaffoldParameters,
        gptScaffoldReturnMessages: typeof gptScaffoldReturnMessages === "undefined" ? null : gptScaffoldReturnMessages,
    }
    sendEventMessage("", getCurrentTimestamp(), "CHATGPT_SCAFFOLD", "NO_PAGE_EVENT", subActionLabelMap["CHATGPT_SCAFFOLD_CHATGPT_SCAFFOLD_TRIGGERED"], "CHATGPT_SCAFFOLD","NO_TARGET_OBJECT", "CHATGPT_SCAFFOLD_TRIGGERED", "GPT_SCAFFOLD_ORDER:::" + order, null);
    $.ajax({
        url: apiBaseUrl + "/chatgpt-scaffold",
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(gptScaffoldData),
        dataType: 'json',
        success: function (data, status) {
            if (status === "success") {
                // console.log("------------------------------------------------------");
                // console.log(data);
                // console.log("------------------------------------------------------");
                $(processingMessage).remove();
                if (data.data === null) {
                    //表示不需要展示scaffold
                } else {
                    // Remove the processing sign
                    const timestamp = new Date(parseInt(data.data.gptResponseTime, 10)).toLocaleTimeString();
                    let resContent = data.data.gptScaffoldContent; //.replace("\n", "<br>"); //answer = answer.replace("\n", "<br>")
                    if (resContent === "gpt-error") {
                        resContent = "There is an error from Chatgpt, Please re-send your question.";
                    }
                    let replyHtml = generateGptScaffolds(resContent, timestamp, order);
                    $(gptScaffoldsMessageDiv).append(replyHtml);
                    $(gptScaffoldsMessageDiv).scrollTop(gptScaffoldsMessageDiv.scrollHeight);

                    addEventForEachScaffold(order);

                    // 展示alert message
                    showGPTScaffoldsBtn.querySelector("span").classList.remove("d-none");

                    localStorage.setItem(userId + "-" + currentCourseId + "gptscaffold-" + order + "-view-status", "false");
                    localStorage.setItem(userId + "-" + currentCourseId + "gptscaffold-" + order + "-tigger-timestamp", getCurrentTimestamp());
                    // sendMyTraceDataPost("/trace-chatgpt-scaffold", getCurrentTimestamp(), "CHATGPT_SCAFFOLD", "NO_PAGE_EVENT", "NO_TARGET_OBJECT", "CHATGPT_SCAFFOLD_RECEIVED", "GPT_SCAFFOLD_ORDER:::" + order, null);
                    sendEventMessage("", getCurrentTimestamp(), "CHATGPT_SCAFFOLD", "NO_PAGE_EVENT", subActionLabelMap["CHATGPT_SCAFFOLD_CHATGPT_SCAFFOLD_RECEIVED"], "CHATGPT_SCAFFOLD","NO_TARGET_OBJECT", "CHATGPT_SCAFFOLD_RECEIVED", "GPT_SCAFFOLD_ORDER:::" + order, null);
                    // forceViewGPTScaffold();

                }
            } else {
                // Remove the processing sign
                $(processingMessage).remove();
                // alert("An error occurred while processing scaffold.");
            }
        },
        error: function (xhr, status, error) {
            // console.log("exception happen" + error);

        }
    });

    return order + 1;
}

function loadGPTScaffolds() {

    console.log("loadGPTScaffolds-----------");
    $.get(apiBaseUrl + "/load-chatgpt-scaffold/" + userId + "/" + currentCourseId, function (data, status) {
       if (status === "success") {
           console.log("gptscaffold:", data);
           const scaffoldHistory = data.data;
           // console.log("------------------------")
           // console.log("gptscaffold:", scaffoldHistory);
           $(gptScaffoldsMessageDiv).empty();
           let index = 1;
           if (scaffoldHistory !== null) {
               scaffoldHistory.forEach(scaffold => {
                   if (!scaffold.gptScaffoldContent.startsWith("no scaffold generated")) {
                       const timestamp = new Date(parseInt(scaffold.gptResponseTime, 10)).toLocaleTimeString();
                       $(gptScaffoldsMessageDiv).append(generateGptScaffolds(scaffold.gptScaffoldContent, timestamp, index));
                       addEventForEachScaffold(index);
                   } // 否则表示scaffold 未生成，不显示该scaffold
                   index += 1;
               });
           }
           gptScaffoldOrder = index;
           // console.log("have chatgpt-scaffold history------gptScaffoldOrder:" + gptScaffoldOrder);
           $(gptScaffoldsMessageDiv).animate({ scrollTop: $(gptScaffoldsMessageDiv).prop("scrollHeight")}, 1000);

           let scaffoldViewStatus = localStorage.getItem(userId + "-" + currentCourseId + "gptscaffold-" + (gptScaffoldOrder-1) + "-view-status");
           // console.log("scaffoldViewStatus-----" + scaffoldViewStatus + "-----" + gptScaffoldOrder + "------" + userId + "-" + currentCourseId + "gptscaffold-" + (gptScaffoldOrder-1) + "-view-status");

           if (scaffoldViewStatus !== null && scaffoldViewStatus === "false") { // 如果换页则继续之前的message 展示状态
               showGPTScaffoldsBtn.querySelector("span").classList.remove("d-none");
           }
       } else {
           // console.log("no chatgpt-scaffold history------gptScaffoldOrder:" + gptScaffoldOrder);
       }
    });
    // forceViewGPTScaffold();
}

function addEventForEachScaffold(order) {
    $(gptScaffoldsMessageDiv).on("click", "#scaffold" + order, function (e) {
        stopEventPropagation(e);
        // sendMyTraceDataPost("/trace-chatgpt-scaffold", getCurrentTimestamp(), "CHATGPT_SCAFFOLD", "MOUSE_CLICK_SCAFFOLD" + order, null, "CLICK", "", e); //当select text时候会触发，mouse down up click 事件
        sendEventMessage("", getCurrentTimestamp(), "CHATGPT_SCAFFOLD", "MOUSE_CLICK_SCAFFOLD" + order, subActionLabelMap["CHATGPT_SCAFFOLD_CLICK"], "CHATGPT_SCAFFOLD",null, "CLICK", "", e);
    });
    $(gptScaffoldsMessageDiv).on("mousemove", "#scaffold" + order, function (e) {
        stopEventPropagation(e);
        // mousePosition = generateMousePositionData(e, "READ_GPT_SCAFFOLD" + order, "CHATGPT_SCAFFOLD");
        // 为了保留 order，所以直接将此处所有的鼠标移动都发走
        sendEventMessage("", getCurrentTimestamp(), "CHATGPT_SCAFFOLD", "MOUSE_MOVE_SCAFFOLD" + order, "READ_GPT_SCAFFOLD", "CHATGPT_SCAFFOLD",null, "NO_INSTANT_EVENT", "", e);
    });
    $(gptScaffoldsMessageDiv).on("mousewheel", "#scaffold" + order, function (e) {
        stopEventPropagation(e);
        // mousewheelData.push(generateMouseWheelData(e, "READ_GPT_SCAFFOLD" + order));
        sendEventMessage("", getCurrentTimestamp(), "CHATGPT_SCAFFOLD", "MOUSE_WHEEL_SCAFFOLD" + order, "READ_GPT_SCAFFOLD", "CHATGPT_SCAFFOLD",null, "NO_INSTANT_EVENT", "SCROLL_DIST:::" + e.deltaY, e);
    });
    $(gptScaffoldsMessageDiv).on("mouseup", "#scaffold" + order, function (e) {
        stopEventPropagation(e);
        if (window.getSelection() != null && window.getSelection().toString().replace(/\n/g, '').length > 0) {
            let selectText = window.getSelection().toString();
            // sendMyTraceDataPost("/trace-chatgpt-scaffold", getCurrentTimestamp(), "CHATGPT_SCAFFOLD", "MOUSE_SELECT_TEXT_SCAFFOLD" + order, null, "SELECT_TEXT", "MOUSE_SELECT:::" + selectText, e);
            sendEventMessage("", getCurrentTimestamp(), "CHATGPT_SCAFFOLD", "MOUSE_SELECT_TEXT_SCAFFOLD" + order, subActionLabelMap["CHATGPT_SCAFFOLD_SELECT_TEXT"], "CHATGPT_SCAFFOLD",null, "SELECT_TEXT", "MOUSE_SELECT:::" + selectText, e);
            // console.log("send post for select text-------------------------------------" + selectText + "-------");
        }
    });
}

function setupGPTScaffoldsTool() {
    setInterval(function() {
        console.log("gptScaffoldorder:", gptScaffoldOrder);
        if (gptScaffoldOrder <= gptScaffoldNeedCheckSRLProcessPrompt.length) {
            let spendTimeSeconds = parseInt((getCurrentTimestamp() - taskStartTimestamp) / 1000);
            // 获取当前的触发时间
            let currentTriggerMinute = gptScaffoldNeedCheckSRLProcessPrompt[gptScaffoldOrder - 1].triggerMinute;

            console.log(".....spendTimeSeconds:" + spendTimeSeconds + ".....currentTriggerSecond:" + currentTriggerMinute * 60);

            if (spendTimeSeconds >= (60 * currentTriggerMinute) && spendTimeSeconds < (60 * currentTriggerMinute + 5)) {
                // 在触发窗口内，触发请求
                gptScaffoldOrder = requestGPTScaffolds(gptScaffoldOrder);
            } else if (spendTimeSeconds >= (60 * currentTriggerMinute + 10)) {
                // 超过触发时间窗口 10 秒，强制触发
                gptScaffoldOrder = requestGPTScaffolds(gptScaffoldOrder);
            } else {
                console.log("gpt scaffolding error.....gptScaffoldOrder:" + gptScaffoldOrder);
                console.log("gpt scaffolding error.....spendTimeSeconds:" + spendTimeSeconds + ".....currentTriggerSecond:" + currentTriggerMinute * 60);
            }
        } else if (gptScaffoldOrder === gptScaffoldNeedCheckSRLProcessPrompt.length + 1) {
            console.log("gpt scaffolding triggering finish!!!!!");
        }


        /*// console.log("check GPT scaffolds time----------------------order:" + gptScaffoldOrder + ", triggerMinute:" + (gptScaffoldOrder <= 3 ? gptScaffoldNeedCheckSRLProcessPrompt[gptScaffoldOrder - 1].triggerMinute : "none"));
        if (gptScaffoldOrder <= gptScaffoldNeedCheckSRLProcessPrompt.length) {
            let spendTimeSeconds = parseInt((getCurrentTimestamp() - taskStartTimestamp) / 1000);
            // console.log("spendTimeSeconds:" + spendTimeSeconds);
            // console.log("gptScaffoldTriggerSecond:" + (60 * gptScaffoldNeedCheckSRLProcessPrompt[gptScaffoldOrder - 1].triggerMinute) + "------" + (60 * gptScaffoldNeedCheckSRLProcessPrompt[gptScaffoldOrder - 1].triggerMinute + 5));
            if (gptScaffoldOrder === 1) { // 30 秒误差  5 min
                if (spendTimeSeconds >= (60 * gptScaffoldNeedCheckSRLProcessPrompt[0].triggerMinute) && spendTimeSeconds < (60 * gptScaffoldNeedCheckSRLProcessPrompt[0].triggerMinute + 5)) {
                    // console.log("trigger request GPT scaffolds----------------------order:" + gptScaffoldOrder);
                    gptScaffoldOrder = requestGPTScaffolds(gptScaffoldOrder);
                } else if (spendTimeSeconds >= (60 * gptScaffoldNeedCheckSRLProcessPrompt[0].triggerMinute + 10)) { // if not triggered properly, force trigger again after 10 seconds
                    // alert("force trigger scaffold " + gptScaffoldOrder);
                    // console.log("force trigger request GPT scaffolds----------------------order:" + gptScaffoldOrder);
                    gptScaffoldOrder = requestGPTScaffolds(gptScaffoldOrder);
                }
            } else if (gptScaffoldOrder === 2) { // 20 min
                if (spendTimeSeconds >= (60 * gptScaffoldNeedCheckSRLProcessPrompt[1].triggerMinute) && spendTimeSeconds < (60 * gptScaffoldNeedCheckSRLProcessPrompt[1].triggerMinute + 5)) {
                    // console.log("trigger request GPT scaffolds----------------------order:" + gptScaffoldOrder);
                    gptScaffoldOrder = requestGPTScaffolds(gptScaffoldOrder);
                } else if (spendTimeSeconds >= (60 * gptScaffoldNeedCheckSRLProcessPrompt[1].triggerMinute + 10)) {
                    // alert("force trigger scaffold " + gptScaffoldOrder);
                    // console.log("force trigger request GPT scaffolds----------------------order:" + gptScaffoldOrder);
                    gptScaffoldOrder = requestGPTScaffolds(gptScaffoldOrder);
                }
            } else if (gptScaffoldOrder === 3) { // 35 min
                if (spendTimeSeconds >= (60 * gptScaffoldNeedCheckSRLProcessPrompt[2].triggerMinute) && spendTimeSeconds < (60 * gptScaffoldNeedCheckSRLProcessPrompt[2].triggerMinute + 5)) {
                    // console.log("trigger request GPT scaffolds----------------------order:" + gptScaffoldOrder);
                    gptScaffoldOrder = requestGPTScaffolds(gptScaffoldOrder);
                } else if (spendTimeSeconds >= (60 * gptScaffoldNeedCheckSRLProcessPrompt[2].triggerMinute + 10)) {
                    // alert("force trigger scaffold " + gptScaffoldOrder);
                    // console.log("force trigger request GPT scaffolds----------------------order:" + gptScaffoldOrder);
                    gptScaffoldOrder = requestGPTScaffolds(gptScaffoldOrder);
                }

            } else {
                // console.log("GPT scaffold not triggered, order:" + gptScaffoldOrder + "------spendTimeSeconds:" + spendTimeSeconds);
            }
        } else if (gptScaffoldOrder === 4) {
            // console.log("GPT scaffold trigger finish");
        }
*/



    }, 5 * 1000); //7 * 60 * 1000


    collapseGPTScaffolds.onclick = function(e) {
        stopEventPropagation(e);
        // console.log("collapseGPTScaffolds click");
        // sendMyTraceDataPost("/trace-chatgpt-scaffold", getCurrentTimestamp(), "CHATGPT_SCAFFOLD", "MOUSE_CLICK", null, "CLICK", "", e); //当select text时候会触发，mouse down up click 事件
        sendEventMessage("", getCurrentTimestamp(), "CHATGPT_SCAFFOLD", "MOUSE_CLICK", subActionLabelMap["CHATGPT_SCAFFOLD_CLICK"], "CHATGPT_SCAFFOLD", null, "CLICK", "", e);

    };
    //当鼠标在搜索annotation框区域移动时候，所有移动和滚动行为都标注为 SEARCH_ANNOTATION
    collapseGPTScaffolds.onmousewheel = function(e) {
        stopEventPropagation(e);
        // mousewheelData.push(generateMouseWheelData(e, "READ_GPT_SCAFFOLD"));
        sendEventMessage("", getCurrentTimestamp(), "CHATGPT_SCAFFOLD", "MOUSE_WHEEL", "READ_GPT_SCAFFOLD", "CHATGPT_SCAFFOLD",null, "NO_INSTANT_EVENT", "SCROLL_DIST:::" + e.deltaY, e);
    };
    collapseGPTScaffolds.onmousemove = function(e) {
        stopEventPropagation(e);
        mousePosition = generateMousePositionData(e, "READ_GPT_SCAFFOLD", "CHATGPT_SCAFFOLD");
    };
    collapseGPTScaffolds.onmouseup = function(e) {
        stopEventPropagation(e);
        if (window.getSelection() != null && window.getSelection().toString().replace(/\n/g, '').length > 0) {
            let selectText = window.getSelection().toString();
            // sendMyTraceDataPost("/trace-chatgpt-scaffold", getCurrentTimestamp(), "CHATGPT_SCAFFOLD", "MOUSE_SELECT_TEXT", null, "SELECT_TEXT", "MOUSE_SELECT:::" + selectText, e);
            sendEventMessage("", getCurrentTimestamp(), "CHATGPT_SCAFFOLD", "MOUSE_SELECT_TEXT", subActionLabelMap["CHATGPT_SCAFFOLD_SELECT_TEXT"], "CHATGPT_SCAFFOLD",null, "SELECT_TEXT", "MOUSE_SELECT:::" + selectText, e);
            // console.log("send post for select text-------------------------------------" + selectText + "-------");
        }
    };


    closeGPTScaffoldsBtn.onclick = function (e) {
        // console.log("----------------------------------------closeGPTScaffoldsBtn clicked");
        stopEventPropagation(e);
        collapseGPTScaffolds.classList.toggle("in-tools");
        toolsAndEssayToggle(collapseGPTScaffolds);

        gptScaffoldsClickTargetObject = "CLOSE_GPT_SCAFFOLD_BTN";
        gptScaffoldsPageEvent = "MOUSE_CLICK";
    };


    showGPTScaffoldsBtn.onclick = function(e) {
        // console.log("----------------------------------------showGPTScaffoldsBtn clicked");
        stopEventPropagation(e);
        if (useAnnotationTool) hideAnnotationToolbox(); // 隐藏annotation toolbox，当点击其他按钮时候
        collapseGPTScaffolds.classList.toggle("in-tools");
        toolsAndEssayToggle(collapseGPTScaffolds);
        // 如果alert message 包含d-none, 则不需要添加d-none， 如何不包含，则添加d-none， 关闭alert message
        if (!showGPTScaffoldsBtn.querySelector("span").classList.contains("d-none")) {
            localStorage.setItem(userId + "-" + currentCourseId + "gptscaffold-" + (gptScaffoldOrder-1) + "-view-status", "true");
            showGPTScaffoldsBtn.querySelector("span").classList.add("d-none");
        }

        gptScaffoldsClickTargetObject = "SHOW_GPT_SCAFFOLD_BTN";
        gptScaffoldsPageEvent = "MOUSE_CLICK";
        // console.log("--------------gptScaffoldsPageEvent:" + gptScaffoldsPageEvent);
        sendEventMessage("", getCurrentTimestamp(), "CHATGPT_SCAFFOLD", gptScaffoldsPageEvent, subActionLabelMap["CHATGPT_SCAFFOLD_CLICK"], "CHATGPT_SCAFFOLD", gptScaffoldsClickTargetObject, "SHOW_GPT_SCAFFOLD_BTN_CLICK", "", null);
    };
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






