
let logIdToQuestionIdMapMultiSeparateAgents = {};

//TODO 有问题，不应该每个agent 都执行一次获取全部chat history的操作，应该执行一次就可以
function loadMultiSeparateAgentsChatHistory(agentName, agentDisplayName, agentAvatar,useRating){
    $.get(apiBaseUrl + "/load-chatgpt-chat/" + userId + "/" + currentCourseId, function(data, status) {
        if (status === "success") {
            const chat_history = data.data || [];
            // Clear the handler box before displaying the new handler history

            let questionIdList = [];
            let chat_history_filtered = [];
            chat_history.forEach(chat => {
                if (chat.agentName === agentName) {
                    if (chat.questionId !== null) {
                        logIdToQuestionIdMapMultiSeparateAgents[chat.id] = chat.questionId;
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
            let multiSeparateAgentsTextarea = document.querySelector("#multi-separate-agents-textarea-" + agentName);
            $(multiSeparateAgentsTextarea).empty();

            console.log("chat_history", chat_history);

            let agent_chat_history = chat_history.filter(chat => chat.type === agentName); // TODO 和前面重复 等数据库表结构改之后同步改


            // mayorChatHistoryLength = agent_chat_history.length;
            localStorage.setItem(userId + "-" + currentCourseId + "-" + agentName + "-chathistorylength", "" + agent_chat_history.length);

            console.log("chatHistoryLength", agent_chat_history.length);

            agent_chat_history.forEach(chat => {

                let round = agent_chat_history.findIndex(value => value.id === chat.id) + 1;
                chat.chatgptAnswer = removeMarkdown(chat.chatgptAnswer);
                $(multiSeparateAgentsTextarea).append(generateQuestionHtml(chat.userQuestions,  new Date(parseInt(chat.userAskTime, 10)).toLocaleTimeString(), chat.id))
                $(multiSeparateAgentsTextarea).append(generateGeneralAgentAnswerHtml(chat.chatgptAnswer, new Date(parseInt(chat.chatgptResponseTime, 10)).toLocaleTimeString(), chat.questionId, chat.id, agentDisplayName, agentAvatar, useRating, round))
                if (useRating){
                    renderChatRating(multiSeparateAgentsTextarea,chat.id, chat.responseRatingStar, chat.responseRatingThumb);
                }
                // if (agents.Mayor.useSustainableEducationMayorRating) {
                //     renderMultiSeparateAgentsRating(chat.id, chat.responseRatingStar, chat.responseRatingThumb);
                // }
            })
            if (useRating){
                setupRateThumb();
                setupStarRating();
                setupRegenerateAnswer(multiSeparateAgentsTextarea,logIdToQuestionIdMapMultiSeparateAgents);
            }
            $(multiSeparateAgentsTextarea).animate({ scrollTop: $(multiSeparateAgentsTextarea).prop("scrollHeight")}, 1000);
        }
    });

}


function askMultiSeparateAgentsQuestion(agent) {
    let multiSeparateAgentsTextarea = document.querySelector("#multi-separate-agents-textarea-" + agent.agentName);
    let multiSeparateAgentsPanelInput = document.querySelector("#multi-separate-agents-panel-input-" + agent.agentName);
    const question = multiSeparateAgentsPanelInput.value;
    currentQuestion = question;
    if (question.length > 0) {
        multiSeparateAgentsPanelInput.value = "";
        const now = new Date();
        const timestamp = now.toLocaleTimeString();
        let safeQuestion = escapeHTML(question);
        let replyHtml = generateQuestionHtml(safeQuestion, timestamp,"-1");
        $(multiSeparateAgentsTextarea).append(replyHtml);

        const processingMessage = createProcessingMessage();
        $(multiSeparateAgentsTextarea).append(processingMessage);
        $(multiSeparateAgentsTextarea).scrollTop(multiSeparateAgentsTextarea.scrollHeight);
        let essayContent = "";

        if (typeof mainEditor === 'undefined' || mainEditor === null){
            essayContent = "";
        }
        else {
            essayContent = mainEditor.getText();
        }

        let solution = ""
        if (localStorage.getItem(userId+ "-" + currentCourseId + "-" + "SustainableSolution") !== ""){
            solution = localStorage.getItem(userId+ "-" + currentCourseId + "-" + "SustainableSolution")
        }
        else{
            solution = essayContent;
        }
        console.log("solution",solution)

        let chatgptData = {
            question: question,
            userId: userId,
            courseId: currentCourseId,
            essay: solution, // TODO use only for sustainable education
            questionId: "",
            includeEssay: agent.promptIncludeEssay,
            chatgptRoleDescription: agent.agentDescription,
            chatgptRole: agent.agentRole,
            backgroundFileNameList: agent.backgroundFileNameList,
            chatgptParameters: agent.chatgptParameters,
            agentName:agent.agentName,
        };
        $.ajax({
            url: apiBaseUrl + "/chatgpt",
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(chatgptData),
            dataType: 'json',
            success: function (data, status) {
                if (status === "success") {
                    logIdToQuestionIdMapMultiSeparateAgents[data.data.id] = data.data.questionId;
                    $(processingMessage).remove();
                    const timestamp = new Date(parseInt(data.data.chatgptResponseTime, 10)).toLocaleTimeString();
                    let resContent = data.data.chatgptAnswer;
                    let questionId = data.data.questionId;
                    if (resContent === "error") {
                        resContent = "There is an error, please try again.";
                    }
                    let chatHistoryLength = parseInt(localStorage.getItem(userId + "-" + currentCourseId + "-" + agent.agentName + "-chathistorylength"));

                    let replyHtml = generateGeneralAgentAnswerHtml(resContent, timestamp, questionId, data.data.id, agent.agentDisplayName, agent.agentAvatarSvg, agent.useRating,chatHistoryLength+1);
                    $(multiSeparateAgentsTextarea).append(replyHtml);
                    $(multiSeparateAgentsTextarea).scrollTop(multiSeparateAgentsTextarea.scrollHeight);
                    if (agent.useRating){
                        console.log(data.data.id);
                        setupOneRateThumb(multiSeparateAgentsTextarea,data.data.id);
                        setupOneStarRatingBtn(multiSeparateAgentsTextarea,data.data.id);
                        setupOneRegenerateAnswerBtn(multiSeparateAgentsTextarea,data.data.id);
                    }
                    // if(agents.Mayor.useSustainableEducationMayorRating){
                    //     setupOneRateThumb(data.data.id);
                    //     setupOneStarRatingBtn(data.data.id);
                    //     setupOneRegenerateAnswerBtn(data.data.id);
                    // }
                    chatHistoryLength += 1;
                    localStorage.setItem(userId + "-" + currentCourseId + "-" + agent.agentName + "-chathistorylength", "" + chatHistoryLength);
                } else {
                    logIdToQuestionIdMapMultiSeparateAgents[data.data.id] = "error";
                    console.log(logIdToQuestionIdMapMultiSeparateAgents)
                    $(processingMessage).remove();
                    alert("An error occurred while processing your question.");
                }
            }
        });
        return question;
    }
}


let multiSeparateAgentsClickTargetObject = "NO_TARGET_OBJECT";
let multiSeparateAgentsPageEvent = "NO_PAGE_EVENT";
let multiSeparateAgentsInstantEvent = "CLOSE";
let multiSeparateAgentsToolStartUseTime = 0;

function myCallbackMultiAgentsMultiWindows(contains, element) {
    let saveTime;

    let eventValue;
    if (contains) {
        console.log('Element with id:', element.id, 'has the "in-tools" class!');
        saveTime = getCurrentTimestamp();
        multiSeparateAgentsInstantEvent = "OPEN";
        eventValue = "START_USE_TOOL:::" + saveTime;
        multiSeparateAgentsToolStartUseTime = saveTime;

        // sendMyTraceDataPost("/trace-chatgpt", saveTime, "CHATGPT", chatgptPageEvent, chatgptClickTargetObject, chatgptInstantEvent, eventValue, null);
        sendEventMessage("", saveTime, "CHATGPT_MULTI_AGENTS_MULTI_WINDOWS", multiSeparateAgentsPageEvent, subActionLabelMap["CHATGPT_MULTI_AGENTS_MULTI_WINDOWS_" + multiSeparateAgentsInstantEvent], "CHATGPT", element.id, multiSeparateAgentsInstantEvent, eventValue, null);
    } else {
        if (multiSeparateAgentsInstantEvent !== "CLOSE") {
            console.log('Element with id:', element.id, 'has not the "in-tools" class!');
            saveTime = getCurrentTimestamp();
            multiSeparateAgentsInstantEvent = "CLOSE";
            if (multiSeparateAgentsToolStartUseTime === 0) {
                eventValue = "TOOL_USE_LENGTH:::ERROR-" + (saveTime - multiSeparateAgentsToolStartUseTime);
            } else {
                eventValue = "TOOL_USE_LENGTH:::" + (saveTime - multiSeparateAgentsToolStartUseTime);
            }
            console.log('chatgpt multiSeparateAgents tool use length:' + (saveTime - multiSeparateAgentsToolStartUseTime));
            // sendMyTraceDataPost("/trace-chatgpt", saveTime, "CHATGPT", chatgptPageEvent, chatgptClickTargetObject, chatgptInstantEvent, eventValue, null);
            sendEventMessage("", saveTime, "CHATGPT_MULTI_AGENTS_MULTI_WINDOWS", multiSeparateAgentsPageEvent, subActionLabelMap["CHATGPT_MULTI_AGENTS_MULTI_WINDOWS_" + multiSeparateAgentsInstantEvent], "CHATGPT", element.id, multiSeparateAgentsInstantEvent, eventValue, null);
        } else {
            console.log('Element with id:', element.id, 'is keep closed');
        }

    }
    multiSeparateAgentsClickTargetObject = "NO_TARGET_OBJECT";
    multiSeparateAgentsPageEvent = "NO_PAGE_EVENT";
}

function renderMultiAgentsMultiWindowTool(agent) {
    let multiSeparateAgentsGeneralHtml = `<!-- Tool Template -->
        <div class="my-horizontal-collapse-tools chatgpt-multi-separate-agents" id="multi-separate-agents-collapse-${agent.agentName}">
           <div class="card card-body" style="height:100%;">
               <h3 class="mb-2">${agent.agentDisplayName}</h3>
               <div style="height:100%;overflow-y:auto;">
                   <div class="form-control" style="height:100%; word-wrap: break-word;white-space : normal; font-size:10pt; overflow: auto;" id="multi-separate-agents-textarea-${agent.agentName}"></div>
               </div>
               <div class="input-group mt-2" id="multi-separate-agents-general-panel-box">
                   <div class="input-group-text" id="btn-group-addon-multi-separate-agents-general">
                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-question-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/></svg>
                   </div>
<!--                   <input type="text" class="form-control" id="multi-separate-agents-panel-input-${agent.agentName}" placeholder="${chatgptPanelInputPlaceholder}" aria-label="Input group example" aria-describedby="btn-group-addon-multi-separate-agents-general">-->
                   <textarea type="text" rows="5" class="form-control" id="multi-separate-agents-panel-input-${agent.agentName}" placeholder="${chatgptPanelInputPlaceholder}" aria-label="Input group example" aria-describedby="btn-group-addon-multi-separate-agents-general"></textarea>
                   <button type="button" class="btn btn-outline-primary" id="multi-separate-agents-send-question-btn-${agent.agentName}">${chatgptSendBtnText}</button>
               </div>
           </div>
        </div>`;

    $("body").append(multiSeparateAgentsGeneralHtml);

    let collapseMultiSeparateAgents = document.querySelector("#multi-separate-agents-collapse-" + agent.agentName);
    toolList1.push(collapseMultiSeparateAgents);

    let showMultiSeparateAgentsBtn = document.querySelector("#show-multi-separate-agents-btn-" + agent.agentName);
    let multiSeparateAgentsPanelInput = document.querySelector("#multi-separate-agents-panel-input-" + agent.agentName);
    let multiSeparateAgentsSendQuestionBtn = document.querySelector("#multi-separate-agents-send-question-btn-" + agent.agentName);
    let multiSeparateAgentsTextarea = document.querySelector("#multi-separate-agents-textarea-" + agent.agentName);

    if (typeof wordCountLimit !== "undefined" && wordCountLimit > 0){
        limitInputWordCount(multiSeparateAgentsTextarea, wordCountLimit);
        limitInputWordCount(multiSeparateAgentsPanelInput, wordCountLimit);
    }

    if(typeof allowCopy !== "undefined" && !allowCopy){
        preventCopy(multiSeparateAgentsPanelInput)
        preventCopy(multiSeparateAgentsTextarea)
    }
    if (typeof allowPaste !== "undefined" && !allowPaste){
        preventPaste(multiSeparateAgentsPanelInput)
        preventPaste(multiSeparateAgentsTextarea)
    }


    function preventPaste(input){
        input.addEventListener('paste', function(event) {
            event.preventDefault(); // 禁止粘贴行为
            alert('粘贴功能已被禁用');
        });
    }

    function preventCopy(input){
        input.addEventListener('copy', function(event) {
            event.preventDefault();
            alert("复制功能已被禁用")
        });
    }

// let chatHistoryLength = 0;
//     let chatHistoryLength = 0;




    collapseMultiSeparateAgents.onclick = function(e) {
        stopEventPropagation(e);
        console.log("collapse" + agent.agentName + " click");
        // sendMyTraceDataPost("/trace-chatgpt", getCurrentTimestamp(), "CHATGPT", "MOUSE_CLICK", null, "CLICK", "", e); //当select text时候会触发，mouse down up click 事件
        sendEventMessage("", getCurrentTimestamp(), "CHATGPT_MULTI_AGENTS_MULTI_WINDOWS", "MOUSE_CLICK", subActionLabelMap["CHATGPT_MULTI_AGENTS_MULTI_WINDOWS_CLICK"], "CHATGPT", "collapse_" + agent.agentName, "CLICK", "", e);
    };
    //当鼠标在搜索annotation框区域移动时候，所有移动和滚动行为都标注为 SEARCH_ANNOTATION
    collapseMultiSeparateAgents.onmousewheel = function(e) {
        stopEventPropagation(e);
        // mousewheelData.push(generateMouseWheelData(e, "READ_GPT_FEEDBACK"));
        sendEventMessage("", getCurrentTimestamp(), "CHATGPT_MULTI_AGENTS_MULTI_WINDOWS", "MOUSE_WHEEL", "READ_FEEDBACK_ONE_AGENT", "CHATGPT","collapse_" + agent.agentName, "NO_INSTANT_EVENT", "SCROLL_DIST:::" + e.deltaY, e);
    };
    collapseMultiSeparateAgents.onmousemove = function(e) {
        stopEventPropagation(e);
        mousePosition = generateMultiAgentMousePositionData(e, "READ_FEEDBACK_ONE_AGENT", "CHATGPT", "collapse_" + agent.agentName);
    };
    collapseMultiSeparateAgents.onmouseup = function(e) {
        stopEventPropagation(e);
        if (window.getSelection() != null && window.getSelection().toString().replace(/\n/g, '').length > 0) {
            let selectText = window.getSelection().toString();
            // sendMyTraceDataPost("/trace-chatgpt", getCurrentTimestamp(), "CHATGPT", "MOUSE_SELECT_TEXT", null, "SELECT_TEXT", "MOUSE_SELECT:::" + selectText, e);
            sendEventMessage("", getCurrentTimestamp(), "CHATGPT_MULTI_AGENTS_MULTI_WINDOWS", "MOUSE_SELECT_TEXT", subActionLabelMap["CHATGPT_MULTI_AGENTS_MULTI_WINDOWS_SELECT_TEXT"], "CHATGPT", "collapse_" + agent.agentName, "SELECT_TEXT", "MOUSE_SELECT:::" + selectText, e);
            console.log("send post for select text-------------------------------------" + selectText + "-------");
        }
    };

    let inputQuestion;
    multiSeparateAgentsSendQuestionBtn.onclick = function(e) {
        stopEventPropagation(e);
        inputQuestion = askMultiSeparateAgentsQuestion(agent);
        // sendMyTraceDataPost("/trace-chatgpt", getCurrentTimestamp(), "CHATGPT", "MOUSE_CLICK", "CHATGPT_PANEL_SUBMIT_BTN", "SUBMIT_QUESTION", "SUBMIT:::" + inputQuestion, e);
        sendEventMessage("", getCurrentTimestamp(), "CHATGPT_MULTI_AGENTS_MULTI_WINDOWS", "MOUSE_CLICK", subActionLabelMap["CHATGPT_MULTI_AGENTS_MULTI_WINDOWS_SUBMIT_QUESTION"], "CHATGPT", "ONE_AGENT_PANEL_SUBMIT_BTN_" + agent.agentName, "SUBMIT_QUESTION", "SUBMIT:::" + inputQuestion, e);
    }

    multiSeparateAgentsPanelInput.addEventListener('keydown', (event) => {
        stopEventPropagation(event);
        if (event.shiftKey && event.key === 'Enter') {
            // event.preventDefault();
            // Insert a line break in the input value
            const cursorPosition = multiSeparateAgentsPanelInput.selectionStart;
            const inputValue = multiSeparateAgentsPanelInput.value;
            multiSeparateAgentsPanelInput.value = inputValue.slice(0, cursorPosition) + '\n' + inputValue.slice(cursorPosition);
            multiSeparateAgentsPanelInput.setSelectionRange(cursorPosition + 1, cursorPosition + 1);
            // sendMyTraceDataPost("/trace-chatgpt", getCurrentTimestamp(), "CHATGPT", "KEY_STROKE", "CHATGPT_PANEL_INPUT", "CHANGE_INPUT_LINE", "KEY:::" + event.key + "---" + event.code, event);
            sendEventMessage("", getCurrentTimestamp(), "CHATGPT_MULTI_AGENTS_MULTI_WINDOWS", "KEY_STROKE", subActionLabelMap["CHATGPT_MULTI_AGENTS_MULTI_WINDOWS_INPUT_LINE"], "CHATGPT", "ONE_AGENT_PANEL_INPUT_" + agent.agentName, "CHANGE_INPUT_LINE", "KEY:::" + event.key + "---" + event.code, event);
        } else if (event.key === 'Enter') {
            // event.preventDefault();
            inputQuestion = askMultiSeparateAgentsQuestion(agent);
            // sendMyTraceDataPost("/trace-chatgpt", getCurrentTimestamp(), "CHATGPT", "KEY_STROKE", "CHATGPT_PANEL_INPUT", "SUBMIT_QUESTION", "SUBMIT:::" + inputQuestion, event);
            sendEventMessage("", getCurrentTimestamp(), "CHATGPT_MULTI_AGENTS_MULTI_WINDOWS", "KEY_STROKE", subActionLabelMap["CHATGPT_MULTI_AGENTS_MULTI_WINDOWS_SUBMIT_QUESTION"], "CHATGPT", "ONE_AGENT_PANEL_INPUT_" + agent.agentName, "SUBMIT_QUESTION", "SUBMIT:::" + inputQuestion, event);
        } else {
            // sendMyTraceDataPost("/trace-chatgpt", getCurrentTimestamp(), "CHATGPT", "KEY_STROKE", "CHATGPT_PANEL_INPUT", "WRITE_QUESTION", "KEY:::" + event.key + "---" + event.code, event);
            sendEventMessage("", getCurrentTimestamp(), "CHATGPT_MULTI_AGENTS_MULTI_WINDOWS", "KEY_STROKE", subActionLabelMap["CHATGPT_MULTI_AGENTS_MULTI_WINDOWS_WRITE_QUESTION"], "CHATGPT", "ONE_AGENT_PANEL_INPUT_" + agent.agentName, "WRITE_QUESTION", "KEY:::" + event.key + "---" + event.code, event);
        }
    });

    showMultiSeparateAgentsBtn.onclick = function (e) {
        console.log("----------------------------------------show " + agent.agentName + " Btn clicked");
        stopEventPropagation(e);
        if (useAnnotationTool) hideAnnotationToolbox(); // 隐藏annotation toolbox，当点击其他按钮时候

        collapseMultiSeparateAgents.classList.toggle("in-tools");
        toolsAndEssayToggle(collapseMultiSeparateAgents);
        multiSeparateAgentsClickTargetObject = "SHOW_MULTI_SEPARATE_AGENTS_BTN_" + agent.agentName;
        multiSeparateAgentsPageEvent = "MOUSE_CLICK";

        sendEventMessage("", getCurrentTimestamp(), "CHATGPT_MULTI_AGENTS_MULTI_WINDOWS", multiSeparateAgentsPageEvent, subActionLabelMap["CHATGPT_MULTI_AGENTS_MULTI_WINDOWS_CLICK"], "CHATGPT", multiSeparateAgentsClickTargetObject, "SHOW_ONE_AGENT_BTN_CLICK", "", null);

    };

    handleClassMutation(collapseMultiSeparateAgents, myCallbackMultiAgentsMultiWindows); //监听
}











/*function renderMultiSeparateAgentsMayorChatRating(logId, rating, thumb) {
    // find log by data-logId from chatgptTextarea
    let log = $(multiSeparateAgentsTextarea).find(`[data-logId='${logId}']`);
    // console.log("log",log);
    // render log rating
    if (rating) {
        for (let i = 1; i <= rating; i++) {
            // console.log("log",$(log).find(`.star[data-rating='${i}']`));
            $(log).find(`.star[data-rating='${i}']`).html(starFillInnerHtml);
        }
    }
    if (thumb) {
        if (thumb === 1) {
            // add class active
            $(log).find(`.useful-answer`).addClass("active");
        } else if (thumb === 2) {
            $(log).find(`.useless-answer`).addClass("active");
        }
    }
}*/
// Additional setup functions and event listeners can be added here

