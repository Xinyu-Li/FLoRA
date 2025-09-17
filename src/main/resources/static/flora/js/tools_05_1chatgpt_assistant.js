function render() {
    let chatgptAssistantToolHtml = `<!-- chatgpt assistant tool  -->
        <div class="my-horizontal-collapse-tools chatgpt-assistant" id="assistant-collapse">
           <div class="card card-body" style="height:100%;">
               <h3 class="mb-2">${assistantTitle}</h3>
               <div style="height:100%;overflow-y:auto;">
                   <div class="form-control" style="height:100%; word-wrap: break-word;white-space : normal; font-size:10pt; overflow: auto;" id="assistant-textarea"></div>
               </div>
               <div class="input-group mt-2" id="chatgptAssistantPanelBox">
                   <div class="input-group-text" id="btnGroupAddonAssistantChatgpt">
                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-question-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/></svg>
                   </div>
                   <input type="text" class="form-control" id="assistantPanelInput" placeholder="${chatgptPanelInputPlaceholder}" aria-label="Input group example" aria-describedby="btnGroupAddonAssistantChatgpt">
                   <button type="button" class="btn btn-outline-primary" id="assistantSendQuestionBtn">${chatgptSendBtnText}</button>
               </div>
           </div>
        </div>`;

    $("body").append(chatgptAssistantToolHtml);
}
render();
let collapseChatgptAssistant = document.querySelector("#assistant-collapse");
// toolList1.push(collapseChatgptAssistant);
let showChatgptAssistantBtn = document.querySelector("#show-assistant-btn");

let assistantPanelInput = document.querySelector("#assistantPanelInput");
let assistantSendQuestionBtn = document.querySelector("#assistantSendQuestionBtn");
let assistantTextarea = document.querySelector("#assistant-textarea");

//This 4 variables are only used for tool open/close event
let assistantClickTargetObject = "NO_TARGET_OBJECT";
let assistantPageEvent = "NO_PAGE_EVENT";
let assistantInstantEvent = "CLOSE";
let assistantToolStartUseTime = 0;


var chatgptAssistantRound = 0;
// rounds of chatgpt assistant  存到Localstorage

var chatHistoryLength = 0;

if(localStorage.getItem(userId + "-" + currentCourseId + "-chatgptAssistantRound") === null){
    // localStorage.setItem("chatgptAssistantRound", "0"); // 记得改回0
    localStorage.setItem(userId + "-" + currentCourseId + "-chatgptAssistantRound", "0");
    chatgptAssistantRound = parseInt(localStorage.getItem(userId + "-" + currentCourseId + "-chatgptAssistantRound"));
}
else {
    chatgptAssistantRound = parseInt(localStorage.getItem(userId + "-" + currentCourseId + "-chatgptAssistantRound"));
}


function getDoctorScaffold(){

    let notificationText = "带教医生有话对你说，请点击右侧红色的new message跟资深医生陈医生对话"
    const now = new Date();
    const timestamp = now.toLocaleTimeString();

    // if mainEditor not exist essay is ""
    let essayContent = "";

    if (typeof mainEditor === 'undefined' || mainEditor === null){
        essayContent = "";
    }
    else {
        essayContent = mainEditor.getText();
    }

    let chatgptData = {
        question: "",
        userId: userId,
        courseId: currentCourseId,
        essay: essayContent,
        questionId: "",
        includeEssay: chatgptPromptIncludeEssay,
        chatgptRoleDescription: scaffoldRoleDescription,
        chatgptRole: "scaffold",
        backgroundFileNameList: chatgptBackgroundFileNameList,
        chatgptParameters: chatgptParameters,
        roundNumber: chatgptAssistantRound,
        type: "teacher_"+medicalConsultAssistantTeacherType
    }

    $.ajax({
        url: apiBaseUrl + "/chatgpt",
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(chatgptData),
        dataType: 'json',
        success: function(data, status) {
            if (status === "success") {
                // console.log(data);
                const timestamp = new Date(parseInt(data.data.chatgptResponseTime, 10)).toLocaleTimeString();
                let resContent = data.data.chatgptAnswer; //.replace("\n", "<br>"); //answer = answer.replace("\n", "<br>")
                if (resContent === "gpt-error") {
                    resContent = "There is an error from Chatgpt, Please re-send your question.";
                }
                let notificationHtml = generateChatgptDoctorScaffoldHtml(notificationText, timestamp);
                $(assistantTextarea).append(notificationHtml);
                $(assistantTextarea).scrollTop(assistantTextarea.scrollHeight);
                localStorage.setItem(userId + "-" + currentCourseId + "-chatgptAssistantTeacherRound", "0");
                chatgptAssistantTeacherRound = 0;
                let questionId = data.data.questionId;
                let replyHtml = generateChatgptAssistantTeacherAnswerHtml(resContent, timestamp, questionId,data.data.id,useChatgptAssistantTeacherRating,chatgptAssistantTeacherRound+1);
                $(assistantTeacherTextarea).append(replyHtml);
                $(assistantTeacherTextarea).scrollTop(assistantTeacherTextarea.scrollHeight);
                chatgptAssistantTeacherRound += 1;
                showChatgptAssistantTeacherBtn.querySelector("span").classList.remove("d-none");
                let showChatgptScaffoldBtnTop = showChatgptAssistantTeacherBtn.getBoundingClientRect().top - 60;
                showChatgptAssistantTeacherBtn.querySelector("span").style.top = showChatgptScaffoldBtnTop + "px";
                assistantTeacherPanelInput.disabled=false;
                assistantTeacherSendQuestionBtn.classList.remove("disabled");
                assistantTeacherPanelInput.placeholder = chatgptPanelInputPlaceholder;
            } else {
                alert("An error occurred while processing your question.");
            }
        }
    });
}


function askAssistantQuestion() {
    const question = assistantPanelInput.value;
    if (question.length > 0) {
        // Set the message panel to empty
        assistantPanelInput.value = "";
        const now = new Date();
        const timestamp = now.toLocaleTimeString();
        let safeQuestion = escapeHTML(question);
        let replyHtml = generateQuestionHtml(safeQuestion, timestamp);
        $(assistantTextarea).append(replyHtml);

        // Show a processing sign
        const processingMessage = createProcessingMessage();
        $(assistantTextarea).append(processingMessage);
        $(assistantTextarea).scrollTop(assistantTextarea.scrollHeight);

        //使输入框暂时禁用
        // chatgptPanelInput.disabled=true;
        // chatgptSendQuestionBtn.classList.add("disabled");
        // chatgptPanelInput.placeholder = "Wait for response...";

        // sendMyTraceDataPost("/trace-chatgpt", getCurrentTimestamp(), "CHATGPT", "MOUSE_CLICK", "CHATGPT_PANEL_SUBMIT_BTN", "SUBMIT_QUESTION", "SUBMIT:::" + question, e);

        // let gptUrl = "/chatgpt";
        // if (window.location.href.includes("https://study.floralearn.cn")) {
        //     gptUrl = "/chatgpt-nolimit";
        // }

        // 重新发送GPT请求的时候，需要提供prompt id, 此id 可以在 generateChatgptAnswerHtml() 方法中找到
        // if mainEditor not exist essay is ""
        let essayContent = "";

        if (typeof mainEditor === 'undefined' || mainEditor === null){
            essayContent = "";
        }
        else {
            essayContent = mainEditor.getText();
        }
        let chatgptData = {
            question: question,
            userId: userId,
            courseId: currentCourseId,
            essay: essayContent,
            questionId: "",
            includeEssay: chatgptPromptIncludeEssay,
            chatgptRoleDescription: patientRoleDescription,
            chatgptRole: "patient",
            backgroundFileNameList: chatgptBackgroundFileNameList,
            chatgptParameters: chatgptParameters,
            type: "patient_"+medicalConsultAssistanceType
        }

        $.ajax({
            url: apiBaseUrl + "/chatgpt",
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(chatgptData),
            dataType: 'json',
            success: function(data, status) {
                if (status === "success") {
                    // Remove the processing sign
                    $(processingMessage).remove();
                    //使输入框取消禁用
                    // chatgptPanelInput.disabled=false;
                    // chatgptSendQuestionBtn.classList.remove("disabled");
                    // chatgptPanelInput.placeholder = "Ask a question...";
                    const timestamp = new Date(parseInt(data.data.chatgptResponseTime, 10)).toLocaleTimeString();
                    let resContent = data.data.chatgptAnswer; //.replace("\n", "<br>"); //answer = answer.replace("\n", "<br>")
                    let questionId = data.data.questionId;
                    if (resContent === "gpt-error") {
                        resContent = "There is an error from Chatgpt, Please re-send your question.";
                    }
                    let replyHtml = generateChatgptPatientAnswerHtml(resContent, timestamp, questionId,data.data.id,useChatgptAssistantRating,chatHistoryLength+1);
                    $(assistantTextarea).append(replyHtml);
                    $(assistantTextarea).scrollTop(assistantTextarea.scrollHeight);
                    // rating system
                    if(useChatgptAssistantRating) {
                        setupOneRateThumb(data.data.id);
                        setupOneStarRatingBtn(data.data.id);
                        setupOneRegenerateAnswerBtn(data.data.id);
                    }
                    // round of chatgpt assistant + 1
                    chatgptAssistantRound += 1;
                    chatHistoryLength +=1;
                    localStorage.setItem(userId + "-" + currentCourseId + "-chatgptAssistantRound", chatgptAssistantRound.toString());
                    // when chatgptAssistantRound reach 20 and 40, show the doctor scaffold
                    if (useDoctorScaffold){
                        if((chatgptAssistantRound >= 20 && chatgptAssistantRound < 40) || chatgptAssistantRound >= 40){
                            getDoctorScaffold();
                        }
                    }
                } else {
                    // Remove the processing sign
                    $(processingMessage).remove();
                    //使输入框取消禁用
                    // chatgptPanelInput.disabled=false;
                    // chatgptSendQuestionBtn.classList.remove("disabled");
                    // chatgptPanelInput.placeholder = "Ask a question...";
                    alert("An error occurred while processing your question.");
                }
            }
        });
        return question;
    }
}
// logid与questionId是一一对应的，所以可以通过logid找到questionId
let assistantlogIdToQuestionIdMap = {};

function renderAssistantChatRating(logId,rating,thumb){
    // find log by data-logId from chatgptTextarea
    let log = $(assistantTextarea).find(`[data-logId='${logId}']`);
    // console.log("log",log);
    // render log rating
    if(rating){
        for (let i = 1; i <= rating; i++) {
            // console.log("log",$(log).find(`.star[data-rating='${i}']`));
            $(log).find(`.star[data-rating='${i}']`).html(starFillInnerHtml);
        }
    }
    if (thumb){
        if (thumb === 1){
            // add class active
            $(log).find(`.useful-answer`).addClass("active");
        }
        else if(thumb === 2){
            $(log).find(`.useless-answer`).addClass("active");
        }
    }
}
function loadAssistantChatHistory() {
    $.get(apiBaseUrl + "/load-chatgpt-chat/" + userId + "/" + currentCourseId, function(data, status) {
        if (status === "success") {
            const chat_history = data.data || [];
            // Clear the handler box before displaying the new handler history

            let questionIdList = [];
            let chat_history_filtered = [];
            chat_history.forEach(chat => {
                if (chat.chatgptRole === "assistant") {
                    // 如果questionid不为null
                    if (chat.questionId !== null) {
                        assistantlogIdToQuestionIdMap[chat.id] = chat.questionId;
                    }
                    if (!questionIdList.includes(chat.questionId)) {
                        questionIdList.push(chat.questionId);
                        chat_history_filtered.push(chat);
                    } else {
                        let index = questionIdList.indexOf(chat.questionId);
                        if (chat.responseGeneratedTimes > chat_history_filtered[index].responseGeneratedTimes) {
                            chat_history_filtered[index] = chat;
                        }
                    }
                }
            });
            $(assistantTextarea).empty();
            // 使用 generateQuestionHtml 和 generateAnswerHtml 进行重构，避免重复代码
            // Display the handler content as structured questions and responses
            let patient_chat_history = chat_history.filter(chat => chat.chatgptRole === "patient");

            chatHistoryLength = patient_chat_history.length;
            // console.log("chatHistoryLength: " + chatHistoryLength);
            patient_chat_history.forEach(chat => {
                // 如果chat的chatgptrole不是assistant,则显示
                let round = patient_chat_history.findIndex(value => value.id === chat.id) + 1;
                if (chat.chatgptRole === "patient") {
                    $(assistantTextarea).append(generateQuestionHtml(chat.userQuestions, new Date(parseInt(chat.userAskTime, 10)).toLocaleTimeString(), chat.id));
                    $(assistantTextarea).append(generateChatgptPatientAnswerHtml(chat.chatgptAnswer, new Date(parseInt(chat.chatgptResponseTime, 10)).toLocaleTimeString(), chat.questionId, chat.id,useChatgptAssistantRating,round));
                    if (useChatgptAssistantRating){
                        renderAssistantChatRating(chat.id,chat.responseRatingStar,chat.responseRatingThumb)
                    }
                }
                // else if (chat.chatgptRole === "scaffold"){
                //     $(assistantTextarea).append(generateChatgptDoctorScaffoldHtml(chat.chatgptAnswer, new Date(parseInt(chat.chatgptResponseTime, 10)).toLocaleTimeString()));
                // }
            });
            if(useChatgptAssistantRating){
                setupRateThumb();
                setupStarRating();
                setupRegenerateAnswer();
            }
            $(assistantTextarea).animate({ scrollTop: $(assistantTextarea).prop("scrollHeight")}, 1000);
        }
    });
}

// function createProcessingMessage() {
//     const timestamp = new Date().toLocaleTimeString();
//     const processingMessage = document.createElement("div");  // 此处必须要有一个dom 对象
//     processingMessage.innerHTML = generateAnswerHtml("Processing", timestamp, "");
//     return processingMessage;
// }

function setupAssistantTool() {

    collapseChatgptAssistant.onclick = function(e) {
        stopEventPropagation(e);
        // console.log("collapseSearch click");
        // sendMyTraceDataPost("/trace-chatgpt", getCurrentTimestamp(), "CHATGPT", "MOUSE_CLICK", null, "CLICK", "", e); //当select text时候会触发，mouse down up click 事件
        sendEventMessage("", getCurrentTimestamp(), "CHATGPT_ASSISTANT", "MOUSE_CLICK", subActionLabelMap["CHATGPT_ASSISTANT_CLICK"], "CHATGPT", null, "CLICK", "", e);
    };
    //当鼠标在搜索annotation框区域移动时候，所有移动和滚动行为都标注为 SEARCH_ANNOTATION
    collapseChatgptAssistant.onmousewheel = function(e) {
        stopEventPropagation(e);
        // mousewheelData.push(generateMouseWheelData(e, "READ_GPT_FEEDBACK"));
        sendEventMessage("", getCurrentTimestamp(), "CHATGPT_ASSISTANT", "MOUSE_WHEEL", "READ_FEEDBACK_GPT_ASSISTANT", "CHATGPT",null, "NO_INSTANT_EVENT", "SCROLL_DIST:::" + e.deltaY, e);
    };
    collapseChatgptAssistant.onmousemove = function(e) {
        stopEventPropagation(e);
        mousePosition = generateMousePositionData(e, "READ_FEEDBACK_GPT_ASSISTANT", "CHATGPT");
    };
    collapseChatgptAssistant.onmouseup = function(e) {
        stopEventPropagation(e);
        if (window.getSelection() != null && window.getSelection().toString().replace(/\n/g, '').length > 0) {
            let selectText = window.getSelection().toString();
            // sendMyTraceDataPost("/trace-chatgpt", getCurrentTimestamp(), "CHATGPT", "MOUSE_SELECT_TEXT", null, "SELECT_TEXT", "MOUSE_SELECT:::" + selectText, e);
            sendEventMessage("", getCurrentTimestamp(), "CHATGPT_ASSISTANT", "MOUSE_SELECT_TEXT", subActionLabelMap["CHATGPT_ASSISTANT_SELECT_TEXT"], "CHATGPT", null, "SELECT_TEXT", "MOUSE_SELECT:::" + selectText, e);
            // console.log("send post for select text-------------------------------------" + selectText + "-------");
        }
    };

    let inputQuestion;
    assistantSendQuestionBtn.onclick = function(e) {
        stopEventPropagation(e);
        inputQuestion = askAssistantQuestion();
        // sendMyTraceDataPost("/trace-chatgpt", getCurrentTimestamp(), "CHATGPT", "MOUSE_CLICK", "CHATGPT_PANEL_SUBMIT_BTN", "SUBMIT_QUESTION", "SUBMIT:::" + inputQuestion, e);
        sendEventMessage("", getCurrentTimestamp(), "CHATGPT_ASSISTANT", "MOUSE_CLICK", subActionLabelMap["CHATGPT_ASSISTANT_SUBMIT_QUESTION"], "CHATGPT", "CHATGPT_PANEL_SUBMIT_BTN", "SUBMIT_QUESTION", "SUBMIT:::" + inputQuestion, e);
    }

    assistantPanelInput.addEventListener('keydown', (event) => {
        stopEventPropagation(event);
        if (event.shiftKey && event.key === 'Enter') {
            // event.preventDefault();
            // Insert a line break in the input value
            const cursorPosition = assistantPanelInput.selectionStart;
            const inputValue = assistantPanelInput.value;
            assistantPanelInput.value = inputValue.slice(0, cursorPosition) + '\n' + inputValue.slice(cursorPosition);
            assistantPanelInput.setSelectionRange(cursorPosition + 1, cursorPosition + 1);
            // sendMyTraceDataPost("/trace-chatgpt", getCurrentTimestamp(), "CHATGPT", "KEY_STROKE", "CHATGPT_PANEL_INPUT", "CHANGE_INPUT_LINE", "KEY:::" + event.key + "---" + event.code, event);
            sendEventMessage("", getCurrentTimestamp(), "CHATGPT_ASSISTANT", "KEY_STROKE", subActionLabelMap["CHATGPT_ASSISTANT_CHANGE_INPUT_LINE"], "CHATGPT", "CHATGPT_ASSISTANT_PANEL_INPUT", "CHANGE_INPUT_LINE", "KEY:::" + event.key + "---" + event.code, event);
        } else if (event.key === 'Enter') {
            // event.preventDefault();
            inputQuestion = askAssistantQuestion();
            // sendMyTraceDataPost("/trace-chatgpt", getCurrentTimestamp(), "CHATGPT", "KEY_STROKE", "CHATGPT_PANEL_INPUT", "SUBMIT_QUESTION", "SUBMIT:::" + inputQuestion, event);
            sendEventMessage("", getCurrentTimestamp(), "CHATGPT_ASSISTANT", "KEY_STROKE", subActionLabelMap["CHATGPT_ASSISTANT_SUBMIT_QUESTION"], "CHATGPT", "CHATGPT_ASSISTANT_PANEL_INPUT", "SUBMIT_QUESTION", "SUBMIT:::" + inputQuestion, event);
        } else {
            // sendMyTraceDataPost("/trace-chatgpt", getCurrentTimestamp(), "CHATGPT", "KEY_STROKE", "CHATGPT_PANEL_INPUT", "WRITE_QUESTION", "KEY:::" + event.key + "---" + event.code, event);
            sendEventMessage("", getCurrentTimestamp(), "CHATGPT_ASSISTANT", "KEY_STROKE", subActionLabelMap["CHATGPT_ASSISTANT_WRITE_QUESTION"], "CHATGPT", "CHATGPT_ASSISTANT_PANEL_INPUT", "WRITE_QUESTION", "KEY:::" + event.key + "---" + event.code, event);
        }
    });
}

// let chatgptToolUseLength = 0;

showChatgptAssistantBtn.onclick = function(e) {
    // showChatgptScaffoldBtn的坐标，用于显示badge未读消息提醒
    // showChatgptScaffoldBtn的top值

    // console.log("----------------------------------------show assistant Btn clicked");
    stopEventPropagation(e);
    if (useAnnotationTool) hideAnnotationToolbox(); // 隐藏annotation toolbox，当点击其他按钮时候

    if(useChatgptAssistantTeacherTool && collapseChatgptAssistantTeacher.classList.contains("in-tools") ||
       useConsultationSubmitTool && consultationCollapse.classList.contains("in-tools")){
        if (collapseChatgptAssistant.classList.contains("in-tools-move-left")) {
            collapseChatgptAssistant.classList.remove("in-tools-move-left");
        }
        else{
            collapseChatgptAssistant.classList.add("in-tools-move-left");
            assistantClickTargetObject = "SHOW_CHATGPT_ASSISTANT_BTN";
            assistantPageEvent = "MOUSE_CLICK";
        }
    }
    else {
        collapseChatgptAssistant.classList.toggle("in-tools");
        toolsAndEssayToggle(collapseChatgptAssistant);
        assistantClickTargetObject = "SHOW_CHATGPT_ASSISTANT_BTN";
        assistantPageEvent = "MOUSE_CLICK";
    }
    sendEventMessage("", getCurrentTimestamp(), "CHATGPT_ASSISTANT", assistantPageEvent, subActionLabelMap["CHATGPT_ASSISTANT_CLICK"], "CHATGPT_ASSISTANT", assistantClickTargetObject, "SHOW_CHATGPT_ASSISTANT_BTN_CLICK", "", null);

    // todo trace data?
    // let instantEvent = "";
    // let eventValue = "";
    // let saveTime = getCurrentTimestamp();
    // if (collapseChatgpt.classList.contains("in-tools")) {
    //     instantEvent = "OPEN";
    //     chatgptToolUseLength = saveTime;
    //     eventValue = "START_USE_TOOL:::" + saveTime;
    // } else {
    //     instantEvent = "CLOSE";
    //     chatgptToolUseLength = saveTime - chatgptToolUseLength;
    //     eventValue = "TOOL_USE_LENGTH:::" + chatgptToolUseLength;
    // }
    //
    // sendMyTraceDataPost("/trace-chatgpt", saveTime, "CHATGPT", "MOUSE_CLICK", "SHOW_CHATGPT_BTN", instantEvent, eventValue, e);
};

function myCallbackChatgptAssistant(contains, element) {
    let saveTime;

    let eventValue;
    if (contains) {
        // console.log('Element with id:', element.id, 'has the "in-tools" class!');
        saveTime = getCurrentTimestamp();
        assistantInstantEvent = "OPEN";
        eventValue = "START_USE_TOOL:::" + saveTime;
        assistantToolStartUseTime = saveTime;
        // console.log('chatgptAssistantToolStartUseTime:' + assistantToolStartUseTime);
        // sendMyTraceDataPost("/trace-chatgpt", saveTime, "CHATGPT", chatgptPageEvent, chatgptClickTargetObject, chatgptInstantEvent, eventValue, null);
        sendEventMessage("", saveTime, "CHATGPT_ASSISTANT", assistantPageEvent, subActionLabelMap["CHATGPT_ASSISTANT_" + assistantInstantEvent], "CHATGPT_ASSISTANT", assistantClickTargetObject, assistantInstantEvent, eventValue, null);
    } else {
        if (assistantInstantEvent !== "CLOSE") {
            // console.log('Element with id:', element.id, 'has not the "in-tools" class!');
            saveTime = getCurrentTimestamp();
            assistantInstantEvent = "CLOSE";
            if (assistantToolStartUseTime === 0) {
                eventValue = "TOOL_USE_LENGTH:::ERROR-" + (saveTime - assistantToolStartUseTime);
            } else {
                eventValue = "TOOL_USE_LENGTH:::" + (saveTime - assistantToolStartUseTime);
            }
            // console.log('chatgpt Assistant tool use length:' + (saveTime - assistantToolStartUseTime));
            // sendMyTraceDataPost("/trace-chatgpt", saveTime, "CHATGPT", chatgptPageEvent, chatgptClickTargetObject, chatgptInstantEvent, eventValue, null);
            sendEventMessage("", saveTime, "CHATGPT_ASSISTANT", assistantPageEvent, subActionLabelMap["CHATGPT_ASSISTANT_" + assistantInstantEvent], "CHATGPT_ASSISTANT", assistantClickTargetObject, assistantInstantEvent, eventValue, null);
        } else {
            // console.log('Element with id:', element.id, 'is keep closed');
        }

    }
    assistantClickTargetObject = "NO_TARGET_OBJECT";
    assistantPageEvent = "NO_PAGE_EVENT";
}
handleClassMutation(collapseChatgptAssistant, myCallbackChatgptAssistant); //监听


