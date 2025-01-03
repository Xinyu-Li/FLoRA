var consultantTitle = "初稿上传";
var consultantPanelInputPlaceholder = "Type your solution here...";
var consultantSendBtnText = "提交初稿";
var consultantFinishBtnText = "结束问诊"

function render() {
    let consultSubmitToolHtml = `<!-- chatgpt assistant tool  -->
        <div class="my-horizontal-collapse-tools my-classification" id="consultation-collapse">
           <div class="card card-body" style="height:100%;">
               <h3 class="mb-2">${consultantTitle}</h3>
               <div style="height:100%;overflow-y:auto;">
                   <div class="form-control" style="height:100%; word-wrap: break-word;white-space : normal; font-size:10pt; overflow: auto;" id="consultant-textarea"></div>
               </div>
               <div class="input-group mt-2" id="chatgptPanelBox">
                   <textarea type="text" class="form-control" id="consultantPanelInput" aria-label="Input group example" aria-describedby="btnGroupAddonChatgpt"></textarea>
                   <div style="display: flex;flex-direction: column;">
                   <button type="button" class="btn btn-outline-danger" id="consultationFinishBtn" style="margin-bottom: 2px; ">${consultantSendBtnText}</button>
                   </div>
               </div>

           </div>
        </div>`;

    $("body").append(consultSubmitToolHtml);
}
render();
let showConsultationBtn = document.querySelector("#show-consultation-btn");
let consultationCollapse = document.querySelector("#consultation-collapse");

let consultantPanelInput = document.querySelector("#consultantPanelInput");
let consultantTextarea = document.querySelector("#consultant-textarea");
// let consultationSubmitBtn = document.querySelector("#consultationSubmitBtn");
let consultationFinishBtn = document.querySelector("#consultationFinishBtn");
// trace data

let consultationClickTargetObject = "NO_TARGET_OBJECT";
let consultationPageEvent = "NO_PAGE_EVENT";
let consultationInstantEvent = "CLOSE";
let consultationToolStartUseTime = 0;


toolList1.push(consultationCollapse);
showConsultationBtn.addEventListener("click", function (e) {
    // console.log("---------------------------- showConsultationBtn clicked");
    stopEventPropagation(e);
    if (useAnnotationTool){ hideAnnotationToolbox();}
    consultationCollapse.classList.toggle("in-tools");
    toolsAndEssayToggle(consultationCollapse)

    consultationClickTargetObject  = "SHOW_CHATGPT_ASSESSMENT_BTN";
    consultationPageEvent = "MOUSE_CLICK";

    sendEventMessage("", getCurrentTimestamp(), "CHATGPT_ASSESSMENT", consultationPageEvent, subActionLabelMap["CHATGPT_ASSESSMENT_CLICK"], "CHATGPT_ASSESSMENT", consultationClickTargetObject, "SHOW_CHATGPT_ASSESSMENT_BTN_CLICK", "", null);
});

function createSubmitSuccessMessage() {
    const timestamp = new Date().toLocaleTimeString();
    const successMessage = document.createElement("div");  // 此处必须要有一个dom 对象
    successMessage.innerHTML = generateAnswerHtml("提交成功！", timestamp, "");
    return successMessage;
}

function submitConsultation() {
    let consultationText = consultantPanelInput.value;
    const timestamp = new Date().toLocaleTimeString();
    let safeConsultationText = escapeHTML(consultationText);
    let html = generateConsultationHtml(safeConsultationText, timestamp);
    $(consultantTextarea).append(html);

    $.post(apiBaseUrl + "/submit-consult-result", {
            userId: userId,
            courseId: currentCourseId,
            contentResult: safeConsultationText,
            saveTime: timestamp,
            score: 0, // 暂时不用
            feedback: ""// 暂时不用
        },
        function(data, status) {
            if (status === "success") {
                // console.log(data)
                // console.log("submitConsultation success");
                // 显示提交成功
                const successMessage = createSubmitSuccessMessage();
                $(consultantTextarea).append(successMessage);
                $(consultantTextarea).scrollTop(consultantTextarea.scrollHeight);
                consultantPanelInput.value = "";

                // 保存到localstorage中
                localStorage.setItem(userId + "-" + currentCourseId + "-SustainableSolution", safeConsultationText);

            } else {
                // console.log("submitConsultation failed");
            }
        });
    return safeConsultationText;

}

function finishConsultation() {
    const timestamp = new Date().toLocaleTimeString();
    const finishMessage = document.createElement("div");  // 此处必须要有一个dom 对象
    // finishMessage.innerHTML = generateAnswerHtml("初稿上传完成！正在生成评分信息……", timestamp, "");
    finishMessage.innerHTML = generateAnswerHtml("初稿上传完成！", timestamp, "");
    $(consultantTextarea).append(finishMessage);
    $(consultantTextarea).scrollTop(consultantTextarea.scrollHeight);
    // 显示评分结果
    getConsultAssessment();
    //  移除localstorage中的chatgptAssistantRound
    // if(localStorage.getItem(userId + "-" + currentCourseId + "-chatgptAssistantRound") !== null){
    //     localStorage.removeItem(userId + "-" + currentCourseId + "-chatgptAssistantRound");
    //     chatgptAssistantRound = 0;
    // }
}

// consultationSubmitBtn.addEventListener("click", function (e) {
//     console.log("---------------------------- consultationSubmitBtn clicked");
//     stopEventPropagation(e);
//     submitConsultation();
// });

function getConsultAssessment() {

    // if mainEditor not exist essay is ""
    let essayContent = "";
    if (mainEditor === null || mainEditor === 'undefined'){
        essayContent = "";
    }
    else {
        essayContent = mainEditor.getText();
        // console.log(essayContent)
    }
    // 从localstorage中获取对话轮数
    let rounds = parseInt(localStorage.getItem(userId + "-" + currentCourseId + "-chatgptAssistantRound"));
    let chatgptData = {
        question: "",
        userId: userId,
        courseId: currentCourseId,
        essay: essayContent,
        questionId: "",
        includeEssay: chatgptPromptIncludeEssay,
        chatgptRoleDescription: assessmentRoleDescription,
        chatgptRole: "assessment",
        backgroundFileNameList: chatgptBackgroundFileNameList,
        chatgptParameters: chatgptParameters,
        roundNumber: rounds,
        type: "assessment_"+medicalConsultAssistanceType
    }

    $.ajax({
        url: apiBaseUrl + "/chatgpt",
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(chatgptData),
        dataType: 'json',
        success: function(data, status) {
            if (status === "success") {
                const timestamp = new Date(parseInt(data.data.chatgptResponseTime, 10)).toLocaleTimeString();
                let resContent = data.data.chatgptAnswer; //.replace("\n", "<br>"); //answer = answer.replace("\n", "<br>")
                if (resContent === "gpt-error") {
                    resContent = "There is an error from Chatgpt, Please re-send your consultation.";
                }
                let replyHtml = generateChatgptDoctorScaffoldHtml(resContent, timestamp);
                $(consultantTextarea).append(replyHtml);
                $(consultantTextarea).scrollTop(consultantTextarea.scrollHeight);
            } else {
                alert("An error occurred while processing your consultation.");
            }
        }
    });
}


function generateConsultationHtml(consultationText, timestamp) {
    if (consultationText === null) {
        consultationText = "error";
    }
    consultationText = consultationText.replace(/\n/g, '<br>');
    const html = `
        <div class="message-content justify-content-end">
            <div class="user-consultation">
                ${consultationText}<br><span class="timestamp">${timestamp}</span>
            </div>
         <div class="user-avatar-wrapper">
             <div class="user-avatar">
            <svg t="1702520734210" class="icon" viewBox="0 0 1024 1024"  xmlns="http://www.w3.org/2000/svg" width="30" height="30"><path d="M517.632 552.149333c-108.714667 0-197.162667-85.546667-197.162667-190.72 0-38.314667 11.690667-75.306667 33.877334-106.922666C391.04 202.026667 452.138667 170.666667 517.632 170.666667c65.408 0 126.464 31.274667 163.2 83.712 7.765333 11.093333 14.250667 22.869333 19.413333 35.072a21.333333 21.333333 0 1 1-39.338666 16.64 147.285333 147.285333 0 0 0-15.018667-27.221334C617.130667 237.824 569.173333 213.333333 517.632 213.333333c-51.626667 0-99.584 24.533333-128.426667 65.621334a143.445333 143.445333 0 0 0-26.069333 82.432c0 81.664 69.290667 148.096 154.453333 148.096 63.402667 0 119.722667-36.437333 143.36-92.8a21.333333 21.333333 0 0 1 39.338667 16.512c-30.378667 72.277333-102.016 118.954667-182.656 118.954666" fill="#3C405D" p-id="4265"></path><path d="M303.829333 627.456c-49.92 0-90.453333 41.088-90.453333 91.605333C213.333333 769.578667 253.866667 810.666667 303.786667 810.666667h416.341333C770.133333 810.666667 810.666667 769.578667 810.666667 719.061333c0-50.517333-40.533333-91.605333-90.453334-91.605333H303.786667zM720.213333 853.333333H303.829333C230.442667 853.333333 170.709333 793.088 170.709333 719.061333 170.666667 645.034667 230.4 584.789333 303.786667 584.789333h416.341333C793.6 584.789333 853.333333 645.034667 853.333333 719.061333 853.333333 793.088 793.6 853.333333 720.213333 853.333333z" fill="#3C405D" p-id="4266"></path></svg>
            </div>
         </div>

        </div>
    `;
    return html
}

// nothing to setup here
function setupConsultationSubmitTool() {

    // consultationCollapse.onclick = function(e) {
    //         stopEventPropagation(e);
    //         // console.log("collapseSearch click");
    //         // sendMyTraceDataPost("/trace-chatgpt", getCurrentTimestamp(), "CHATGPT", "MOUSE_CLICK", null, "CLICK", "", e); //当select text时候会触发，mouse down up click 事件
    //         sendEventMessage("", getCurrentTimestamp(), "CHATGPT_ASSESSMENT", "MOUSE_CLICK", subActionLabelMap["CHATGPT_ASSESSMENT_CLICK"], "CHATGPT_ASSESSMENT", null, "CLICK", "", e);
    //     };
    //     //当鼠标在搜索annotation框区域移动时候，所有移动和滚动行为都标注为 SEARCH_ANNOTATION
    // consultationCollapse.onmousewheel = function(e) {
    //         stopEventPropagation(e);
    //         // mousewheelData.push(generateMouseWheelData(e, "READ_GPT_FEEDBACK"));
    //         sendEventMessage("", getCurrentTimestamp(), "CHATGPT_ASSESSMENT", "MOUSE_WHEEL", "READ_FEEDBACK_GPT_ASSESSMENT", "CHATGPT_ASSESSMENT",null, "NO_INSTANT_EVENT", "SCROLL_DIST:::" + e.deltaY, e);
    //     };
    // consultationCollapse.onmousemove = function(e) {
    //         stopEventPropagation(e);
    //         mousePosition = generateMousePositionData(e, "READ_FEEDBACK_GPT_ASSESSMENT", "CHATGPT_ASSESSMENT");
    //     };
    // consultationCollapse.onmouseup = function(e) {
    //         stopEventPropagation(e);
    //         if (window.getSelection() != null && window.getSelection().toString().replace(/\n/g, '').length > 0) {
    //             let selectText = window.getSelection().toString();
    //             // sendMyTraceDataPost("/trace-chatgpt", getCurrentTimestamp(), "CHATGPT", "MOUSE_SELECT_TEXT", null, "SELECT_TEXT", "MOUSE_SELECT:::" + selectText, e);
    //             sendEventMessage("", getCurrentTimestamp(), "CHATGPT_ASSESSMENT", "MOUSE_SELECT_TEXT", subActionLabelMap["CHATGPT_ASSESSMENT_SELECT_TEXT"], "CHATGPT_ASSESSMENT", null, "SELECT_TEXT", "MOUSE_SELECT:::" + selectText, e);
    //             // console.log("send post for select text-------------------------------------" + selectText + "-------");
    //         }
    //     };

        let inputConsultation;
        // consultationSubmitBtn.onclick = function(e) {
        //     stopEventPropagation(e);
        //     inputConsultation = submitConsultation();
        //     // sendMyTraceDataPost("/trace-chatgpt", getCurrentTimestamp(), "CHATGPT", "MOUSE_CLICK", "CHATGPT_PANEL_SUBMIT_BTN", "SUBMIT_QUESTION", "SUBMIT:::" + inputQuestion, e);
        //     sendEventMessage("", getCurrentTimestamp(), "CHATGPT", "MOUSE_CLICK", subActionLabelMap["CHATGPT_SUBMIT_QUESTION"], "CHATGPT", "CHATGPT_PANEL_SUBMIT_BTN", "SUBMIT_QUESTION", "SUBMIT:::" + inputConsultation, e);
        // }

    consultationFinishBtn.onclick = function(e) {
        stopEventPropagation(e);
        // sendMyTraceDataPost("/trace-chatgpt", getCurrentTimestamp(), "CHATGPT", "MOUSE_CLICK", "CHATGPT_PANEL_FINISH_BTN", "FINISH_CONSULTATION", "FINISH_CONSULTATION", "", e);
        // sendEventMessage("", getCurrentTimestamp(), "CHATGPT_ASSESSMENT", "MOUSE_CLICK", subActionLabelMap["CHATGPT_ASSESSMENT_FINISH_CONSULTATION"], "CHATGPT_ASSESSMENT", "CHATGPT_ASSESSMENT_PANEL_FINISH_BTN", "FINISH_CONSULTATION", "", e);
        // finishConsultation();
        submitConsultation();
    }

    consultantPanelInput.addEventListener('keydown', (event) => {
            stopEventPropagation(event);
            if (event.shiftKey && event.key === 'Enter') {
                // event.preventDefault();
                // Insert a line break in the input value
                const cursorPosition = consultantPanelInput.selectionStart;
                const inputValue = consultantPanelInput.value;
                consultantPanelInput.value = inputValue.slice(0, cursorPosition) + '\n' + inputValue.slice(cursorPosition);
                consultantPanelInput.setSelectionRange(cursorPosition + 1, cursorPosition + 1);
                // sendMyTraceDataPost("/trace-chatgpt", getCurrentTimestamp(), "CHATGPT", "KEY_STROKE", "CHATGPT_PANEL_INPUT", "CHANGE_INPUT_LINE", "KEY:::" + event.key + "---" + event.code, event);
                sendEventMessage("", getCurrentTimestamp(), "CHATGPT_ASSESSMENT", "KEY_STROKE", subActionLabelMap["CHATGPT_ASSESSMENT_CHANGE_INPUT_LINE"], "CHATGPT_ASSESSMENT", "CHATGPT_ASSESSMENT_PANEL_INPUT", "CHANGE_INPUT_LINE", "KEY:::" + event.key + "---" + event.code, event);
            } else if (event.key === 'Enter') {
                // event.preventDefault();
                inputConsultation = submitConsultation();
                // sendMyTraceDataPost("/trace-chatgpt", getCurrentTimestamp(), "CHATGPT", "KEY_STROKE", "CHATGPT_PANEL_INPUT", "SUBMIT_QUESTION", "SUBMIT:::" + inputQuestion, event);
                sendEventMessage("", getCurrentTimestamp(), "CHATGPT_ASSESSMENT", "KEY_STROKE", subActionLabelMap["CHATGPT_ASSESSMENT_SUBMIT_QUESTION"], "CHATGPT_ASSESSMENT", "CHATGPT_ASSESSMENT_PANEL_INPUT", "SUBMIT_QUESTION", "SUBMIT:::" + inputConsultation, event);
            } else {
                // sendMyTraceDataPost("/trace-chatgpt", getCurrentTimestamp(), "CHATGPT", "KEY_STROKE", "CHATGPT_PANEL_INPUT", "WRITE_QUESTION", "KEY:::" + event.key + "---" + event.code, event);
                sendEventMessage("", getCurrentTimestamp(), "CHATGPT_ASSESSMENT", "KEY_STROKE", subActionLabelMap["CHATGPT_ASSESSMENT_WRITE_QUESTION"], "CHATGPT_ASSESSMENT", "CHATGPT_ASSESSMENT_PANEL_INPUT", "WRITE_QUESTION", "KEY:::" + event.key + "---" + event.code, event);
            }
        });

}


function myCallbackChatgpt(contains, element) {
    let saveTime;

    let eventValue;
    if (contains) {
        // console.log('Element with id:', element.id, 'has the "in-tools" class!');
        saveTime = getCurrentTimestamp();
        consultationInstantEvent = "OPEN";
        eventValue = "START_USE_TOOL:::" + saveTime;
        consultationToolStartUseTime = saveTime;
        // console.log('chatgptToolStartUseTime:' + consultationToolStartUseTime);
        // sendMyTraceDataPost("/trace-chatgpt", saveTime, "CHATGPT", chatgptPageEvent, chatgptClickTargetObject, chatgptInstantEvent, eventValue, null);
        sendEventMessage("", saveTime, "CHATGPT_ASSESSMENT", consultationPageEvent, subActionLabelMap["CHATGPT_ASSESSMENT_" + consultationInstantEvent], "CHATGPT_ASSESSMENT", consultationClickTargetObject, consultationInstantEvent, eventValue, null);
    } else {
        if (consultationInstantEvent !== "CLOSE") {
            // console.log('Element with id:', element.id, 'has not the "in-tools" class!');
            saveTime = getCurrentTimestamp();
            consultationInstantEvent = "CLOSE";
            if (consultationToolStartUseTime === 0) {
                eventValue = "TOOL_USE_LENGTH:::ERROR-" + (saveTime - consultationToolStartUseTime);
            } else {
                eventValue = "TOOL_USE_LENGTH:::" + (saveTime - consultationToolStartUseTime);
            }
            // console.log('chatgpt tool use length:' + (saveTime - consultationToolStartUseTime));
            // sendMyTraceDataPost("/trace-chatgpt", saveTime, "CHATGPT", chatgptPageEvent, chatgptClickTargetObject, chatgptInstantEvent, eventValue, null);
            sendEventMessage("", saveTime, "CHATGPT_ASSESSMENT", consultationPageEvent, subActionLabelMap["CHATGPT_ASSESSMENT_" + consultationInstantEvent], "CHATGPT_ASSESSMENT", consultationClickTargetObject, consultationInstantEvent, eventValue, null);
        } else {
            // console.log('Element with id:', element.id, 'is keep closed');
        }

    }
    consultationClickTargetObject = "NO_TARGET_OBJECT";
    consultationPageEvent = "NO_PAGE_EVENT";
}
handleClassMutation(consultationCollapse, myCallbackChatgpt); //监听