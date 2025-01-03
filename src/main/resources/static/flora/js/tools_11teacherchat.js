function render() {
    let teacherChatHtml = '<!-- teacher handler tool  --> ' +
        // '<script src="../static/flora/js/jquery.min.js" crossorigin></script>' +
        `<div class="my-horizontal-collapse-tools my-classification" id="teacherchat-collapse">
            <div class="card card-body" style="height:100%;">
                <div class="mb-2 toolheader">
                    <h3 class="tooltitle">${chatteacherTitle}</h3>
                    <div class="type-status">
                        <div class="online-status">
                            <div>${chatteacherConnectServerStatusText}</div>
                            <div class="status rounded-circle" id="wsStatusDiv"></div>
                        </div>
                        <div class="online-status">
                            <div>${chatteacherTeacherOnlineStatusText}</div>
                            <div class="status rounded-circle" id="teacherStatusDiv"></div>
                        </div>
                    </div>
                    <h6 class="toolstatus" id="type-status-info"></h6>
                </div>
                <div style="height:100%;overflow-y:auto;">
                    <div class="form-control" style="height:100%; word-wrap: break-word;white-space : normal; font-size:10pt; overflow: auto;" id="chatteacher-textarea"></div>
                </div>
                <div class="input-group mt-2" id="teacherChatPanelBox">
                    <div class="input-group-text" id="btnGroupAddonChatTeacher">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-question-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/></svg>
                    </div>
                    <textarea class="form-control" id="chatTeacherPanelInput" placeholder="${chatTeacherPanelInputPlaceholder}" aria-label="Input group example" aria-describedby="btnGroupAddonChatgpt"></textarea>

                    <button type="button" class="btn btn-outline-primary" id="chatTeacherSendQuestionBtn">${chatteacherSendBtnText}</button>
                </div>
            </div>
        </div>
        `;
    $("body").append(teacherChatHtml);
}
render();
let collapseTeacherchat = document.querySelector("#teacherchat-collapse");
toolList1.push(collapseTeacherchat);
let showTeacherchatBtn = document.querySelector("#show-teacherchat-btn");

let chatTeacherPanelInput = document.querySelector("#chatTeacherPanelInput");
let chatTeacherSendQuestionBtn = document.querySelector("#chatTeacherSendQuestionBtn");
let chatTeacherTextarea = document.querySelector("#chatteacher-textarea");
let typeStatusEl = document.querySelector("#type-status-info");
let wsStatusDiv = document.querySelector("#wsStatusDiv");
let teacherStatusDiv = document.querySelector("#teacherStatusDiv");

// TODO 在全局使用，可能有问题
let senderId = userId + "";
let receiverId = "333";

let maxRetryTime = 5;
let retryCnt = 0;

const heartbeatIntervalMs = 50000; // 1 second
let lastHeartbeatReceivedTime = Date.now();

//This 4 variables are only used for tool open/close event
let chatTeacherClickTargetObject = "NO_TARGET_OBJECT";
let chatTeacherPageEvent = "NO_PAGE_EVENT";
let chatTeacherInstantEvent = "CLOSE";
let chatTeacherToolStartUseTime = 0;

// status: init, conversation, focus, unfocus, heartbeat, editing, sessionend


function askTeacherQuestion() {
    const question = chatTeacherPanelInput.value;

    if (question.length > 0) {
        // Set the message panel to empty
        chatTeacherPanelInput.value = "";
        let safeQuestion = escapeHTML(question);
        let replyHtml = generateQuestionHtml(safeQuestion, new Date().toLocaleTimeString());
        $(chatTeacherTextarea).append(replyHtml);
        $(chatTeacherTextarea).scrollTop(chatTeacherTextarea.scrollHeight);
        sendTeacherChatMessage(senderId, question, receiverId, "conversation");
        return question;
    }
}

function setupChatTeacherTool() {
    if (!'WebSocket' in window) return;
    teacherChatWebSocketInit();


    collapseTeacherchat.onclick = function(e) {
        stopEventPropagation(e);
        console.log("collapseSearch click");
        // sendMyTraceDataPost("/trace-teacherchat", getCurrentTimestamp(), "CHATTEACHER", "MOUSE_CLICK", null, "CLICK", "", e); //当select text时候会触发，mouse down up click 事件
        sendEventMessage("", getCurrentTimestamp(), "CHATTEACHER", "MOUSE_CLICK", subActionLabelMap["CHATTEACHER_CLICK"], "CHATTEACHER", null, "CLICK", "", e);
    };
    //当鼠标在搜索annotation框区域移动时候，所有移动和滚动行为都标注为 SEARCH_ANNOTATION
    collapseTeacherchat.onmousewheel = function(e) {
        stopEventPropagation(e);
        // mousewheelData.push(generateMouseWheelData(e, "READ_TEACHER_FEEDBACK"));
        sendEventMessage("", getCurrentTimestamp(), "CHATTEACHER", "MOUSE_WHEEL", "READ_FEEDBACK_CHATTEACHER", "CHATTEACHER",null, "NO_INSTANT_EVENT", "SCROLL_DIST:::" + e.deltaY, e);
    };
    collapseTeacherchat.onmousemove = function(e) {
        stopEventPropagation(e);
        mousePosition = generateMousePositionData(e, "READ_FEEDBACK_CHATTEACHER", "CHATTEACHER");
    };
    collapseTeacherchat.onmouseup = function(e) {
        stopEventPropagation(e);
        if (window.getSelection() != null && window.getSelection().toString().replace(/\n/g, '').length > 0) {
            let selectText = window.getSelection().toString();
            // sendMyTraceDataPost("/trace-teacherchat", getCurrentTimestamp(), "CHATTEACHER", "MOUSE_SELECT_TEXT", null, "SELECT_TEXT", "MOUSE_SELECT:::" + selectText, e);
            sendEventMessage("", getCurrentTimestamp(), "CHATTEACHER", "MOUSE_SELECT_TEXT", subActionLabelMap["CHATTEACHER_SELECT_TEXT"], "CHATTEACHER", null, "SELECT_TEXT", "MOUSE_SELECT:::" + selectText, e);
            console.log("send post for select text-------------------------------------" + selectText + "-------");
        }
    };


    let inputQuestion;
    chatTeacherSendQuestionBtn.onclick = function(e) {
        stopEventPropagation(e);
        inputQuestion = askTeacherQuestion();
        // sendMyTraceDataPost("/trace-teacherchat", getCurrentTimestamp(), "CHATTEACHER", "MOUSE_CLICK", "CHATTEACHER_PANEL_SUBMIT_BTN", "SUBMIT_QUESTION", "SUBMIT:::" + inputQuestion, e);
        sendEventMessage("", getCurrentTimestamp(), "CHATTEACHER", "MOUSE_CLICK", subActionLabelMap["CHATTEACHER_SUBMIT_QUESTION"], "CHATTEACHER", "CHATTEACHER_PANEL_SUBMIT_BTN", "SUBMIT_QUESTION", "SUBMIT:::" + inputQuestion, e);

    }

    chatTeacherPanelInput.addEventListener("input", function() {
        sendTeacherChatMessage(senderId, "Student is typing", receiverId, "focus");
    });

    chatTeacherPanelInput.addEventListener('keydown', (event) => {
        if (event.shiftKey && event.key === 'Enter') {
            event.preventDefault();
            // Insert a line break in the input value
            const cursorPosition = chatTeacherPanelInput.selectionStart;
            const inputValue = chatTeacherPanelInput.value;
            chatTeacherPanelInput.value = inputValue.slice(0, cursorPosition) + '\n' + inputValue.slice(cursorPosition);
            chatTeacherPanelInput.setSelectionRange(cursorPosition + 1, cursorPosition + 1);
            // sendMyTraceDataPost("/trace-teacherchat", getCurrentTimestamp(), "CHATTEACHER", "KEY_STROKE", "CHATTEACHER_PANEL_INPUT", "CHANGE_INPUT_LINE", "SUBMIT:::" + inputQuestion, event);
            sendEventMessage("", getCurrentTimestamp(), "CHATTEACHER", "KEY_STROKE", subActionLabelMap["CHATTEACHER_CHANGE_INPUT_LINE"], "CHATTEACHER", "CHATTEACHER_PANEL_INPUT", "CHANGE_INPUT_LINE", "SUBMIT:::" + inputQuestion, event);

        } else if (event.key === 'Enter') {
            event.preventDefault();
            inputQuestion = askTeacherQuestion();
            // sendMyTraceDataPost("/trace-teacherchat", getCurrentTimestamp(), "CHATTEACHER", "KEY_STROKE", "CHATTEACHER_PANEL_INPUT", "SUBMIT_QUESTION", "SUBMIT:::" + inputQuestion, event);
            sendEventMessage("", getCurrentTimestamp(), "CHATTEACHER", "KEY_STROKE", subActionLabelMap["CHATTEACHER_SUBMIT_QUESTION"], "CHATTEACHER", "CHATTEACHER_PANEL_INPUT", "SUBMIT_QUESTION", "SUBMIT:::" + inputQuestion, event);
        } else {
            // sendMyTraceDataPost("/trace-teacherchat", getCurrentTimestamp(), "CHATTEACHER", "KEY_STROKE", "CHATTEACHER_PANEL_INPUT", "WRITE_QUESTION", "SUBMIT:::" + inputQuestion, event);
            sendEventMessage("", getCurrentTimestamp(), "CHATTEACHER", "KEY_STROKE", subActionLabelMap["CHATTEACHER_WRITE_QUESTION"], "CHATTEACHER", "CHATTEACHER_PANEL_INPUT", "WRITE_QUESTION", "SUBMIT:::" + inputQuestion, event);
        }
    });
}



function loadTeacherChatHistory() {
    $.get(apiBaseUrl + "/load-teacher-chat/" + userId + "/" + currentCourseId, function(data, status) {
        if (status === "success") {
            // console.log(data.data);
            const chat_history = data.data;
            // Clear the handler box before displaying the new handler history
            $(chatTeacherTextarea).empty();
            // 使用 generateQuestionHtml 和 generateAnswerHtml 进行重构，避免重复代码
            // Display the handler content as structured questions and responses
            chat_history.forEach(chat => {
                if (chat.chatRole === "FROM_TEACHER") {
                    $(chatTeacherTextarea).append(generateAnswerHtml(chat.chatText, new Date(parseInt(chat.chatTime, 10)).toLocaleTimeString()));
                } else {
                    $(chatTeacherTextarea).append(generateQuestionHtml(chat.chatText, new Date(parseInt(chat.chatTime, 10)).toLocaleTimeString()));
                }
            });

            $(chatTeacherTextarea).animate({ scrollTop: $(chatTeacherTextarea).prop("scrollHeight")}, 1000);
        }
    });
}

// let teacherChatUseLength = 0;

showTeacherchatBtn.onclick = function(e) {
    console.log("----------------------------------------show teacher handler Btn clicked");
    stopEventPropagation(e);
    if (useAnnotationTool) hideAnnotationToolbox(); // 隐藏annotation toolbox，当点击其他按钮时候

    collapseTeacherchat.classList.toggle("in-tools");
    toolsAndEssayToggle(collapseTeacherchat);

    chatTeacherClickTargetObject = "SHOW_TEACHERCAT_BTN";
    chatTeacherPageEvent = "MOUSE_CLICK";
    sendEventMessage("", getCurrentTimestamp(), "CHATTEACHER", chatTeacherPageEvent, subActionLabelMap["CHATTEACHER_CLICK"], "CHATTEACHER", chatTeacherClickTargetObject, "SHOW_TEACHERCAT_BTN_CLICK", "", null);
    // let instantEvent = "";
    // let eventValue = "";
    // let saveTime = getCurrentTimestamp();
    // if (collapseTeacherchat.classList.contains("in-tools")) {
    //     instantEvent = "OPEN";
    //     teacherChatUseLength = saveTime;
    //     eventValue = "START_USE_TOOL:::" + saveTime;
    //
    //
    // } else {
    //     instantEvent = "CLOSE";
    //     teacherChatUseLength = saveTime - teacherChatUseLength;
    //     eventValue = "TOOL_USE_LENGTH:::" + teacherChatUseLength;
    // }
    //
    // sendMyTraceDataPost("/trace-teacherchat", saveTime, "CHATTEACHER", "MOUSE_CLICK", "SHOW_TEACHERCAT_BTN", instantEvent, eventValue, e);
};

function myCallbackTeacherChat(contains, element) {
    let saveTime;

    let eventValue;
    if (contains) {
        console.log('Element with id:', element.id, 'has the "in-tools" class!');
        saveTime = getCurrentTimestamp();
        chatTeacherInstantEvent = "OPEN";
        eventValue = "START_USE_TOOL:::" + saveTime;
        chatTeacherToolStartUseTime = saveTime;
        console.log('chatTeacherToolStartUseTime:' + chatTeacherToolStartUseTime);
        // sendMyTraceDataPost("/trace-teacherchat", saveTime, "CHATTEACHER", chatTeacherPageEvent, chatTeacherClickTargetObject, chatTeacherInstantEvent, eventValue, null);
        sendEventMessage("", saveTime, "CHATTEACHER", chatTeacherPageEvent, subActionLabelMap["CHATTEACHER_" + chatTeacherInstantEvent], "CHATTEACHER", chatTeacherClickTargetObject, chatTeacherInstantEvent, eventValue, null);
    } else {
        if (chatTeacherInstantEvent !== "CLOSE") {
            console.log('Element with id:', element.id, 'has not the "in-tools" class!');
            saveTime = getCurrentTimestamp();
            chatTeacherInstantEvent = "CLOSE";
            if (chatTeacherToolStartUseTime === 0) {
                eventValue = "TOOL_USE_LENGTH:::ERROR-" + (saveTime - chatTeacherToolStartUseTime);
            } else {
                eventValue = "TOOL_USE_LENGTH:::" + (saveTime - chatTeacherToolStartUseTime);
            }
            console.log('teacherchat tool use length:' + (saveTime - chatTeacherToolStartUseTime));
            // sendMyTraceDataPost("/trace-teacherchat", saveTime, "CHATTEACHER", chatTeacherPageEvent, chatTeacherClickTargetObject, chatTeacherInstantEvent, eventValue, null);
            sendEventMessage("", saveTime, "CHATTEACHER", chatTeacherPageEvent, subActionLabelMap["CHATTEACHER_" + chatTeacherInstantEvent], "CHATTEACHER", chatTeacherClickTargetObject, chatTeacherInstantEvent, eventValue, null);
        } else {
            console.log('Element with id:', element.id, 'is keep closed');
        }
    }
    chatTeacherClickTargetObject = "NO_TARGET_OBJECT";
    chatTeacherPageEvent = "NO_PAGE_EVENT";
}
handleClassMutation(collapseTeacherchat, myCallbackTeacherChat); //监听
