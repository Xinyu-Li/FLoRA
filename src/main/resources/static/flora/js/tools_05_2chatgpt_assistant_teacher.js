var teacherTitle = "带教医生";

function render() {
    let chatgptScaffoldToolHtml = `<!-- chatgpt scaffold tool  -->
        <div class="my-horizontal-collapse-tools chatgpt-assistant" id="assistant-scaffold-collapse">
           <div class="card card-body" style="height:100%;">
               <h3 class="mb-2">${teacherTitle}</h3>
               <div style="height:100%;overflow-y:auto;">
                   <div class="form-control" style="height:100%; word-wrap: break-word;white-space : normal; font-size:10pt; overflow: auto;" id="scaffold-textarea"></div>
               </div>
               <div class="input-group mt-2" id="chatgptScaffoldPanelBox">
                   <div class="input-group-text" id="btnGroupAddonscaffoldChatgpt">
                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-question-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/></svg>
                   </div>
                   <input type="text" class="form-control" id="scaffoldPanelInput" placeholder="${chatgptPanelInputPlaceholder}" aria-label="Input group example" aria-describedby="btnGroupAddonscaffoldChatgpt">
                   <button type="button" class="btn btn-outline-primary" id="scaffoldSendQuestionBtn">${chatgptSendBtnText}</button>
               </div>
           </div>
        </div>`;

    $("body").append(chatgptScaffoldToolHtml);
}
render();
let collapseChatgptAssistantTeacher = document.querySelector("#assistant-scaffold-collapse");
toolList1.push(collapseChatgptAssistantTeacher);

let showChatgptAssistantTeacherBtn = document.querySelector("#show-assistant-scaffold-btn");

let assistantTeacherPanelInput = document.querySelector("#scaffoldPanelInput");
let assistantTeacherSendQuestionBtn = document.querySelector("#scaffoldSendQuestionBtn");
let assistantTeacherTextarea = document.querySelector("#scaffold-textarea");

//This 4 variables are only used for tool open/close event
let assistantTeacherClickTargetObject = "NO_TARGET_OBJECT";
let assistantTeacherPageEvent = "NO_PAGE_EVENT";
let assistantTeacherInstantEvent = "CLOSE";
let assistantTeacherToolStartUseTime = 0;

var chatgptAssistantTeacherRound = 0;
// rounds of chatgpt scaffold  存到Localstorage

var chatAssistantTeacherHistoryLength = 0;

if(localStorage.getItem(userId + "-" + currentCourseId + "-chatgptAssistantTeacherRound") === null){
    localStorage.setItem(userId + "-" + currentCourseId + "-chatgptAssistantTeacherRound", "0");
    chatgptAssistantTeacherRound = parseInt(localStorage.getItem(userId + "-" + currentCourseId + "-chatgptAssistantTeacherRound"));
}
else {
    chatgptAssistantTeacherRound = parseInt(localStorage.getItem(userId + "-" + currentCourseId + "-chatgptAssistantTeacherRound"));
}

// if (chatgptAssistantTeacherRound >= assistantTeacherLimitRound) {
//     assistantTeacherPanelInput.disabled=true;
//     assistantTeacherSendQuestionBtn.classList.add("disabled");
//     assistantTeacherPanelInput.placeholder = "你已经达到对话上限，请继续问诊。";
// }

// function getDoctorScaffold(){
//     const now = new Date();
//     const timestamp = now.toLocaleTimeString();
//     // if mainEditor not exist essay is ""
//     let essayContent = "";
//
//     if (typeof mainEditor === 'undefined' || mainEditor === null){
//         essayContent = "";
//     }
//     else {
//         essayContent = mainEditor.getText();
//     }
//
//     let chatgptData = {
//         question: "",
//         userId: userId,
//         courseId: currentCourseId,
//         essay: essayContent,
//         questionId: "",
//         includeEssay: chatgptPromptIncludeEssay,
//         chatgptRoleDescription: scaffoldRoleDescription,
//         chatgptRole: "scaffold",
//         backgroundFileNameList: chatgptBackgroundFileNameList,
//         chatgptParameters: chatgptParameters, // todo: 剩下的都改成這樣形式
//         roundNumber: chatgptscaffoldRound,
//         type: "scaffold_"+medicalConsultAssistanceType
//     }
//
//     $.ajax({
//         url: apiBaseUrl + "/chatgpt",
//         type: 'POST',
//         contentType: 'application/json',
//         data: JSON.stringify(chatgptData),
//         dataType: 'json',
//         success: function(data, status) {
//             if (status === "success") {
//                 console.log(data);
//                 const timestamp = new Date(parseInt(data.data.chatgptResponseTime, 10)).toLocaleTimeString();
//                 let resContent = data.data.chatgptAnswer; //.replace("\n", "<br>"); //answer = answer.replace("\n", "<br>")
//                 if (resContent === "gpt-error") {
//                     resContent = "There is an error from Chatgpt, Please re-send your question.";
//                 }
//                 let replyHtml = generateChatgptDoctorScaffoldHtml(resContent, timestamp);
//                 $(scaffoldTextarea).append(replyHtml);
//                 $(scaffoldTextarea).scrollTop(scaffoldTextarea.scrollHeight);
//             } else {
//                 alert("An error occurred while processing your question.");
//             }
//         }
//     });
// }

function askAssistantTeacherQuestion() {
    const question = assistantTeacherPanelInput.value;
    if (question.length > 0) {
        // Set the message panel to empty
        assistantTeacherPanelInput.value = "";
        const now = new Date();
        const timestamp = now.toLocaleTimeString();
        let safeQuestion = escapeHTML(question);
        let replyHtml = generateQuestionHtml(safeQuestion, timestamp);
        $(assistantTeacherTextarea).append(replyHtml);

        // Show a processing sign
        const processingMessage = createProcessingMessage();
        $(assistantTeacherTextarea).append(processingMessage);
        $(assistantTeacherTextarea).scrollTop(assistantTeacherTextarea.scrollHeight);

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
        // let essayContent = mainEditor?.getText() ?? "";
        let essayContent = "";
        if (localStorage.getItem(userId + "-" + currentCourseId + "-Consultation-" + taskStage) !== null) {
            essayContent = localStorage.getItem(userId + "-" + currentCourseId + "-Consultation-"+taskStage);
            console.log("essayContent from localStorage: " + essayContent);
        }
        let chatgptData = {
            question: question,
            userId: userId,
            courseId: currentCourseId,
            essay: essayContent,
            questionId: "",
            includeEssay: true,
            chatgptRoleDescription: patientRoleDescription,
            chatgptRole: "medicalteacher",
            backgroundFileNameList: chatgptBackgroundFileNameList,
            chatgptParameters: chatgptParameters,
            agentName: "teacher_"+medicalConsultAssistantTeacherType
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
                    let replyHtml = generateChatgptAssistantTeacherAnswerHtml(resContent, timestamp, questionId,data.data.id,useChatgptAssistantTeacherRating, chatgptAssistantTeacherRound+1);
                    $(assistantTeacherTextarea).append(replyHtml);
                    $(assistantTeacherTextarea).scrollTop(assistantTeacherTextarea.scrollHeight);
                    // rating system
                    if(useChatgptAssistantTeacherRating) {
                        setupOneRateThumb(data.data.id);
                        setupOneStarRatingBtn(data.data.id);
                        setupOneRegenerateAnswerBtn(data.data.id);
                    }
                    // round of chatgpt scaffold + 1
                    chatgptAssistantTeacherRound += 1;
                    chatAssistantTeacherHistoryLength +=1;
                    localStorage.setItem(userId + "-" + currentCourseId + "-chatgptAssistantTeacherRound", chatgptAssistantTeacherRound.toString());

                    // 如果对话轮数超过10轮，禁止继续发送问题
                    // if (chatgptAssistantTeacherRound >= assistantTeacherLimitRound) {
                    //     assistantTeacherPanelInput.disabled=true;
                    //     assistantTeacherSendQuestionBtn.classList.add("disabled");
                    //     assistantTeacherPanelInput.placeholder = "你已经达到对话上限，请继续问诊。";
                    // }
                    // else {
                    //     assistantTeacherPanelInput.disabled=false;
                    //     assistantTeacherSendQuestionBtn.classList.remove("disabled");
                    //     assistantTeacherPanelInput.placeholder = chatgptPanelInputPlaceholder;
                    // }

                    // when chatgptscaffoldRound reach 20 and 40, show the doctor scaffold
                    // if (useDoctorScaffold){
                    //     if((chatgptscaffoldRound >= 20 && chatgptscaffoldRound < 40) || chatgptscaffoldRound >= 40){
                    //         getDoctorScaffold();
                    //     }
                    // }
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
function renderAssistantTeacherChatRating(logId,rating,thumb){
    // find log by data-logId from chatgptTextarea
    let log = $(assistantTeacherTextarea).find(`[data-logId='${logId}']`);
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



function loadAssistantTeacherChatHistory() {
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
            $(assistantTeacherTextarea).empty();
            // 统计chat_history中所有的chatgptRole为scaffold和medicalTeacher的chat的数量
            let teacher_chat_history = chat_history.filter(chat => chat.chatgptRole === "medicalteacher");
            let scaffold_chat_history = chat_history.filter(chat => chat.chatgptRole === "scaffold");
            // 拼起来
            let new_chat_history = scaffold_chat_history.concat(teacher_chat_history);

            chatAssistantTeacherHistoryLength = new_chat_history.length;
            console.log("chatHistoryLength: " + chatAssistantTeacherHistoryLength);
            localStorage.setItem(userId + "-" + currentCourseId + "-chatgptAssistantTeacherRound", chatAssistantTeacherHistoryLength.toString());
            chatgptAssistantTeacherRound = chatAssistantTeacherHistoryLength;
            new_chat_history.forEach(chat => {
                // 如果chat的chatgptrole不是scaffold,则显示
                let round = new_chat_history.findIndex(value => value.id === chat.id) + 1;
                if (chat.chatgptRole === "scaffold") {
                    $(assistantTeacherTextarea).append(generateChatgptAssistantTeacherAnswerHtml(chat.chatgptAnswer, new Date(parseInt(chat.chatgptResponseTime, 10)).toLocaleTimeString(), chat.questionId, chat.id,useChatgptAssistantTeacherRating,round));
                }
                if (chat.chatgptRole === "medicalteacher") {
                    // 如果userQuestion中含有这是学生的思考结果，则不显示
                    if (!chat.userQuestions.includes("这是学生的思考结果")) {
                        $(assistantTeacherTextarea).append(generateQuestionHtml(chat.userQuestions, new Date(parseInt(chat.userAskTime, 10)).toLocaleTimeString(), chat.id));
                    }
                    $(assistantTeacherTextarea).append(generateChatgptAssistantTeacherAnswerHtml(chat.chatgptAnswer, new Date(parseInt(chat.chatgptResponseTime, 10)).toLocaleTimeString(), chat.questionId, chat.id,useChatgptAssistantTeacherRating,round));
                    if (useChatgptAssistantTeacherRating){
                        renderAssistantTeacherChatRating(chat.id,chat.responseRatingStar,chat.responseRatingThumb)
                    }
                }
            });
            if(useChatgptAssistantTeacherRating){
                setupRateThumb();
                setupStarRating();
                setupRegenerateAnswer();
            }
            $(assistantTeacherTextarea).animate({ scrollTop: $(assistantTeacherTextarea).prop("scrollHeight")}, 1000);
        }
    });
}

// function createProcessingMessage() {
//     const timestamp = new Date().toLocaleTimeString();
//     const processingMessage = document.createElement("div");  // 此处必须要有一个dom 对象
//     processingMessage.innerHTML = generateAnswerHtml("Processing", timestamp, "");
//     return processingMessage;
// }

function setupAssistantTeacherTool() {

    collapseChatgptAssistantTeacher.onclick = function(e) {
        stopEventPropagation(e);
        console.log("collapseSearch click");
        // sendMyTraceDataPost("/trace-chatgpt", getCurrentTimestamp(), "CHATGPT", "MOUSE_CLICK", null, "CLICK", "", e); //当select text时候会触发，mouse down up click 事件
        sendEventMessage("", getCurrentTimestamp(), "CHATGPT_ASSISTANT_TEACHER", "MOUSE_CLICK", subActionLabelMap["CHATGPT_ASSISTANT_TEACHER_CLICK"], "CHATGPT_ASSISTANT_TEACHER", null, "CLICK", "", e);
    };
    //当鼠标在搜索annotation框区域移动时候，所有移动和滚动行为都标注为 SEARCH_ANNOTATION
    collapseChatgptAssistantTeacher.onmousewheel = function(e) {
        stopEventPropagation(e);
        // mousewheelData.push(generateMouseWheelData(e, "READ_GPT_FEEDBACK"));
        sendEventMessage("", getCurrentTimestamp(), "CHATGPT_ASSISTANT_TEACHER", "MOUSE_WHEEL", "READ_FEEDBACK_GPT_ASSISTANT_TEACHER", "CHATGPT_ASSISTANT_TEACHER",null, "NO_INSTANT_EVENT", "SCROLL_DIST:::" + e.deltaY, e);
    };
    collapseChatgptAssistantTeacher.onmousemove = function(e) {
        stopEventPropagation(e);
        mousePosition = generateMousePositionData(e, "READ_FEEDBACK_GPT_ASSISTANT_TEACHER", "CHATGPT_ASSISTANT_TEACHER");
    };
    collapseChatgptAssistantTeacher.onmouseup = function(e) {
        stopEventPropagation(e);
        if (window.getSelection() != null && window.getSelection().toString().replace(/\n/g, '').length > 0) {
            let selectText = window.getSelection().toString();
            // sendMyTraceDataPost("/trace-chatgpt", getCurrentTimestamp(), "CHATGPT", "MOUSE_SELECT_TEXT", null, "SELECT_TEXT", "MOUSE_SELECT:::" + selectText, e);
            sendEventMessage("", getCurrentTimestamp(), "CHATGPT_ASSISTANT_TEACHER", "MOUSE_SELECT_TEXT", subActionLabelMap["CHATGPT_ASSISTANT_TEACHER_SELECT_TEXT"], "CHATGPT_ASSISTANT_TEACHER", null, "SELECT_TEXT", "MOUSE_SELECT:::" + selectText, e);
            console.log("send post for select text-------------------------------------" + selectText + "-------");
        }
    };

    let inputQuestion;
    assistantTeacherSendQuestionBtn.onclick = function(e) {
        stopEventPropagation(e);
        inputQuestion = askAssistantTeacherQuestion();
        // sendMyTraceDataPost("/trace-chatgpt", getCurrentTimestamp(), "CHATGPT", "MOUSE_CLICK", "CHATGPT_PANEL_SUBMIT_BTN", "SUBMIT_QUESTION", "SUBMIT:::" + inputQuestion, e);
        sendEventMessage("", getCurrentTimestamp(), "CHATGPT_ASSISTANT_TEACHER", "MOUSE_CLICK", subActionLabelMap["CHATGPT_ASSISTANT_TEACHER_SUBMIT_QUESTION"], "CHATGPT", "CHATGPT_ASSISTANT_TEACHER_PANEL_SUBMIT_BTN", "SUBMIT_QUESTION", "SUBMIT:::" + inputQuestion, e);
    }

    assistantTeacherPanelInput.addEventListener('keydown', (event) => {
        stopEventPropagation(event);
        if (event.shiftKey && event.key === 'Enter') {
            // event.preventDefault();
            // Insert a line break in the input value
            const cursorPosition = assistantTeacherPanelInput.selectionStart;
            const inputValue = assistantTeacherPanelInput.value;
            assistantTeacherPanelInput.value = inputValue.slice(0, cursorPosition) + '\n' + inputValue.slice(cursorPosition);
            assistantTeacherPanelInput.setSelectionRange(cursorPosition + 1, cursorPosition + 1);
            // sendMyTraceDataPost("/trace-chatgpt", getCurrentTimestamp(), "CHATGPT", "KEY_STROKE", "CHATGPT_PANEL_INPUT", "CHANGE_INPUT_LINE", "KEY:::" + event.key + "---" + event.code, event);
            sendEventMessage("", getCurrentTimestamp(), "CHATGPT_ASSISTANT_TEACHER", "KEY_STROKE", subActionLabelMap["CHATGPT_ASSISTANT_TEACHER_CHANGE_INPUT_LINE"], "CHATGPT_ASSISTANT_TEACHER", "CHATGPT_ASSISTANT_TEACHER_PANEL_INPUT", "CHANGE_INPUT_LINE", "KEY:::" + event.key + "---" + event.code, event);
        } else if (event.key === 'Enter') {
            // event.preventDefault();
            inputQuestion = askAssistantTeacherQuestion();
            // sendMyTraceDataPost("/trace-chatgpt", getCurrentTimestamp(), "CHATGPT", "KEY_STROKE", "CHATGPT_PANEL_INPUT", "SUBMIT_QUESTION", "SUBMIT:::" + inputQuestion, event);
            sendEventMessage("", getCurrentTimestamp(), "CHATGPT_ASSISTANT_TEACHER", "KEY_STROKE", subActionLabelMap["CHATGPT_ASSISTANT_TEACHER_SUBMIT_QUESTION"], "CHATGPT_ASSISTANT_TEACHER", "CHATGP_ASSISTANT_TEACHERT_PANEL_INPUT", "SUBMIT_QUESTION", "SUBMIT:::" + inputQuestion, event);
        } else {
            // sendMyTraceDataPost("/trace-chatgpt", getCurrentTimestamp(), "CHATGPT", "KEY_STROKE", "CHATGPT_PANEL_INPUT", "WRITE_QUESTION", "KEY:::" + event.key + "---" + event.code, event);
            sendEventMessage("", getCurrentTimestamp(), "CHATGPT_ASSISTANT_TEACHER", "KEY_STROKE", subActionLabelMap["CHATGPT_ASSISTANT_TEACHER_WRITE_QUESTION"], "CHATGPT_ASSISTANT_TEACHER", "CHATGPT_ASSISTANT_TEACHER_PANEL_INPUT", "WRITE_QUESTION", "KEY:::" + event.key + "---" + event.code, event);
        }
    });
}

// let chatgptToolUseLength = 0;

showChatgptAssistantTeacherBtn.onclick = function(e) {
    console.log("----------------------------------------show teacher Btn clicked");
    stopEventPropagation(e);
    if (useAnnotationTool) hideAnnotationToolbox(); // 隐藏annotation toolbox，当点击其他按钮时候

    if(useConsultationSubmitTool && consultationCollapse.classList.contains("in-tools") || useChatgptAssistantTool && collapseChatgptAssistant.classList.contains("in-tools")){
        if (collapseChatgptAssistantTeacher.classList.contains("in-tools-move-left")) {
            collapseChatgptAssistantTeacher.classList.remove("in-tools-move-left");
        }
        else{
            collapseChatgptAssistantTeacher.classList.add("in-tools-move-left");
            assistantTeacherClickTargetObject = "SHOW_CHATGPT_ASSISTANT_TEACHER_BTN";
            assistantTeacherPageEvent = "MOUSE_CLICK";
        }
    }
    else {
        collapseChatgptAssistantTeacher.classList.toggle("in-tools");
        // toolsAndEssayToggle(collapseChatgptAssistantTeacher);
        assistantTeacherClickTargetObject = "SHOW_CHATGPT_ASSISTANT_TEACHER_BTN";
        assistantTeacherPageEvent = "MOUSE_CLICK";
    }
    showChatgptAssistantTeacherBtn.querySelector("span").classList.add("d-none");
    // toolsAndEssayToggle(collapseChatgptAssistantTeacher);
    // toolsAndAssistantToggle(collapseChatgptScaffold);
    assistantTeacherClickTargetObject = "SHOW_CHATGPT_ASSISTANT_TEACHER_BTN";
    assistantTeacherPageEvent = "MOUSE_CLICK";

    sendEventMessage("", getCurrentTimestamp(), "CHATGPT_ASSISTANT_TEACHER", assistantTeacherPageEvent, subActionLabelMap["CHATGPT_ASSISTANT_TEACHER_CLICK"], "CHATGPT_ASSISTANT_TEACHER", assistantTeacherClickTargetObject, "SHOW_CHATGPT_ASSISTANT_TEACHER_BTN_CLICK", "", null);
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

function myCallbackChatgptAssistantTeacher(contains, element) {
    let saveTime;

    let eventValue;
    if (contains) {
        console.log('Element with id:', element.id, 'has the "in-tools" class!');
        saveTime = getCurrentTimestamp();
        assistantTeacherInstantEvent = "OPEN";
        eventValue = "START_USE_TOOL:::" + saveTime;
        assistantTeacherToolStartUseTime = saveTime;
        console.log('chatgptAssistantTeacherToolStartUseTime:' + assistantTeacherToolStartUseTime);
        // sendMyTraceDataPost("/trace-chatgpt", saveTime, "CHATGPT", chatgptPageEvent, chatgptClickTargetObject, chatgptInstantEvent, eventValue, null);
        sendEventMessage("", saveTime, "CHATGPT_ASSISTANT_TEACHER", assistantTeacherPageEvent, subActionLabelMap["CHATGPT_ASSISTANT_TEACHER_" + assistantTeacherInstantEvent], "CHATGPT_ASSISTANT_TEACHER", assistantTeacherClickTargetObject, assistantTeacherInstantEvent, eventValue, null);
    } else {
        if (assistantTeacherInstantEvent !== "CLOSE") {
            console.log('Element with id:', element.id, 'has not the "in-tools" class!');
            saveTime = getCurrentTimestamp();
            assistantTeacherInstantEvent = "CLOSE";
            if (assistantTeacherToolStartUseTime === 0) {
                eventValue = "TOOL_USE_LENGTH:::ERROR-" + (saveTime - assistantTeacherToolStartUseTime);
            } else {
                eventValue = "TOOL_USE_LENGTH:::" + (saveTime - assistantTeacherToolStartUseTime);
            }
            console.log('chatgpt assistant teacher tool use length:' + (saveTime - assistantTeacherToolStartUseTime));
            // sendMyTraceDataPost("/trace-chatgpt", saveTime, "CHATGPT", chatgptPageEvent, chatgptClickTargetObject, chatgptInstantEvent, eventValue, null);
            sendEventMessage("", saveTime, "CHATGPT_ASSISTANT_TEACHER", assistantTeacherPageEvent, subActionLabelMap["CHATGPT_ASSISTANT_TEACHER_" + assistantTeacherInstantEvent], "CHATGPT_ASSISTANT_TEACHER", assistantTeacherClickTargetObject, assistantTeacherInstantEvent, eventValue, null);
        } else {
            console.log('Element with id:', element.id, 'is keep closed');
        }

    }
    assistantTeacherClickTargetObject = "NO_TARGET_OBJECT";
    assistantTeacherPageEvent = "NO_PAGE_EVENT";
}
handleClassMutation(collapseChatgptAssistantTeacher, myCallbackChatgptAssistantTeacher); //监听