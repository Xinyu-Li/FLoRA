/**
 * @author Xinyu Li
 * @date 7/31/2024
 */

function render() {
    let multiAgentsToolHtml = `<!-- chatgpt assistant tool  -->
        <div class="my-horizontal-collapse-tools chatgpt-assistant" id="assessment-assist-multi-agents-collapse">
            <div class="card card-body" style="height:100%;">
            <h6 class="mb-2">评估助手</h6>  
            <button type="button" class="btn btn-close" style="position:absolute; right:20px;" aria-label="Close" id="close-assessment-assist-multi-agents-btn"></button>

                <div style="height:100%;overflow-y:auto;">
                    <div class="form-control" style="height:100%; word-wrap: break-word;white-space : normal; font-size:10pt; overflow: auto;" id="assessment-assist-multi-agents-chat-content"></div>
                </div>
                
                <div class="input-group mt-2" id="assessment-assist-multi-agents-panel-box" style="min-height:40px; max-height:100px; height:20%;">
                    <div id="assessment-assist-error-message" class="text-danger" style="display: none;"></div>
                    <div contenteditable="true" id="assessment-assist-multi-agents-input" class="form-control"></div>
                    
                    <div id="assessment-assist-agents-list-panel" class="dropdown-menu"></div>
                    <button type="button" class="btn btn-outline-primary" id="assessment-assist-multi-agents-send-question-btn" style="float: right">${multiAgentsSendBtnText}</button>   
                    
                </div>
           </div>
        </div>`;

    $("body").append(multiAgentsToolHtml);
}
render();


let assessmentAssistCollapseMultiAgents = document.querySelector("#assessment-assist-multi-agents-collapse");
toolList1.push(assessmentAssistCollapseMultiAgents);
let assessmentAssistShowMultiAgentsBtn = document.querySelector("#assessment-assist-show-multi-agents-btn");
let closeAssessmentAssistMultiAgentsBtn = document.querySelector("#close-assessment-assist-multi-agents-btn");

let assessmentAssistMultiAgentsSendQuestionBtn = document.querySelector("#assessment-assist-multi-agents-send-question-btn");
let assessmentAssistMultiAgentsChatContentDiv = document.querySelector("#assessment-assist-multi-agents-chat-content");

let assessmentAssistMultiAgentsInput = document.querySelector("#assessment-assist-multi-agents-input");
let assessmentAssistAgentsListPanel = document.querySelector("#assessment-assist-agents-list-panel");
let assessmentAssistErrorMessageDiv = document.querySelector("#assessment-assist-error-message");

// let availableMultiAgents = multiAgentsSingleWindowConfig.agents.filter(agent => agent.useAgent === true);
let assessmentAssistAvailableMultiAgents = new Map(
    assessmentAssistMultiAgentsSingleWindowConfig.agents
        .filter(agent => agent.useAgent === true)
        .map(agent => [agent.agentName, agent])
);
const assessmentAssistMultiAgentsPlaceHolderText = assessmentAssistAvailableMultiAgents.size > 1 ? multiAgentsSingleWindowPlaceholderTextMulti : multiAgentsSingleWindowPlaceholderTextSingle;
let assessmentAssistAvailableScaffoldAgents = assessmentAssistMultiAgentsSingleWindowConfig.scaffoldAgents?.filter(agent => agent.useAgent === true);
// 记录每个scaffold的触发次数
let assessmentAssistAvailableMultiAgentsScaffoldsTriggerStatus = new Map();
// availableScaffoldAgents.forEach(scaffoldAgent => {
//     availableMultiAgentsScaffoldsTriggerStatus.set(scaffoldAgent.agentName + "-time", new Array(scaffoldAgent.scaffoldsBasedRounds.length).fill(0));
//     availableMultiAgentsScaffoldsTriggerStatus.set(scaffoldAgent.agentName + "-rounds", new Array(scaffoldAgent.scaffoldsBasedRounds.length).fill(0));
// });


//This 4 variables are only used for tool open/close event
let assessmentAssistMultiAgentsClickTargetObject = "NO_TARGET_OBJECT";
let assessmentAssistMultiAgentsPageEvent = "NO_PAGE_EVENT";
let assessmentAssistMultiAgentsInstantEvent = "CLOSE";
let assessmentAssistMultiAgentsToolStartUseTime = 0;

let assessmentAssistMultiAgentsStartConversationTime = parseInt(localStorage.getItem(userId + "-" + currentCourseId + "-assessmentAssistMultiAgentsStartConversationTime"), 10) || 0;
// let availableMultiAgentsNames = availableMultiAgents.map(agent => agent.agentName);
// let startChatWithAgents = new Array(availableMultiAgents.size).fill(false); // 与agent 在 agents array里面的位置 对应
// let eachAgentChatRound = new Array(availableMultiAgents.size).fill(0);
let assessmentAssistCurrentChatAgentName = assessmentAssistAvailableMultiAgents.size === 1 ? assessmentAssistAvailableMultiAgents.keys().next().value : null; // 等于1 表示只有一个agent，此时默认当前聊天的agent 永远是固定的
console.log("initial-----currentChatAgentName:", assessmentAssistCurrentChatAgentName);
let assessmentAssistCurrentChatAgentNameKey = `${userId}-${currentCourseId}-assessmentAssistCurrentChatAgentName`;
localStorage.setItem(assessmentAssistCurrentChatAgentNameKey, assessmentAssistCurrentChatAgentName);
// let assessmentAssistAllChatRound = 0;
let assessmentAssistMultiAgentsSingleWindowReminderBgColor = "#ead1a2";

//------------------------scaffold usage demo 每个study 可能不同------------------------------
function triggerScaffold() {
    let scaffoldAgent = assessmentAssistAvailableScaffoldAgents[0];
    let scaffoldTriggerRule = scaffoldAgent.triggerConfigs.triggerRule;
    //主要触发方式
    let scaffoldTriggers = scaffoldAgent.triggerConfigs[scaffoldTriggerRule];
    //补充默认触发方式
    let defaultScaffoldTriggers = scaffoldAgent.triggerConfigs["defaultTriggers"];
    let sharedAgentThreadId = getSharedAgentThreadId(assessmentAssistAvailableMultiAgents);

    if (scaffoldTriggerRule === "chatRoundTriggers") {
        //根据具体需求再修改 TODO
        // triggerChatRoundScaffold(scaffoldAgent, assessmentAssistAllChatRound, sharedAgentThreadId, scaffoldTriggers, defaultScaffoldTriggers, assessmentAssistMultiAgentsChatContentDiv);
    } else {
        triggerTimeRangeOrFixedMessageScaffold(scaffoldAgent, sharedAgentThreadId, scaffoldTriggers, defaultScaffoldTriggers, assessmentAssistMultiAgentsChatContentDiv);
    }
}


function setupAssessmentAssistMultiAgentsSingleWindowTool() {
    const THUMB_NONE = 0;
    const THUMB_UP = 1;
    const THUMB_DOWN = 2;

    let tempTaskStartTimestamp = parseInt(localStorage.getItem(`${userId}-${currentCourseId}-taskStartTimestamp`)) || 0;
    let multiAgentsSingleWindowReminderInterval = setInterval(function () {
        let spendTimeSeconds = (getCurrentTimestamp() - tempTaskStartTimestamp) / 1000;
        // 获取当前的触发时间

        let multiAgentsSingleWindowChatStartTimestamp = parseInt(localStorage.getItem(`${userId}-${currentCourseId}-assessment-assist-multi-agents-single-window-chat-start-timestamp`)) || 0;
        if (multiAgentsSingleWindowChatStartTimestamp !== 0) {
            //标识已经点开过 开始过聊天
        } else {
            if (allowAssessmentAssistMultiAgentsSingleWindowReminder && spendTimeSeconds >= (60 * 7)) {
                appendGeneralGptScaffoldsOrHint(chatReminderMessage, new Date(getCurrentTimestamp()).toLocaleTimeString(), -1, 0, false, 0, "reminder", assessmentAssistMultiAgentsSingleWindowReminderBgColor, assessmentAssistMultiAgentsChatContentDiv,0)
                assessmentAssistShowMultiAgentsBtn.querySelector("span.gpt-scaffold-flash-icon").classList.remove("d-none");
                sendEventMessage("", getCurrentTimestamp(), "CHATGPT_ASSESSMENT_ASSIST_MULTI_AGENTS_SINGLE_WINDOW", "NO_PAGE_EVENT", "MULTI_AGENTS_SINGLE_WINDOW_START_REMINDER_TRIGGERED", "CHATGPT", "NO_TARGET_OBJECT", "START_REMINDER_TRIGGERED", "", null);
                clearInterval(multiAgentsSingleWindowReminderInterval);
            }
        }



    }, 5 * 1000); //7 * 60 * 1000

    assessmentAssistMultiAgentsInput.addEventListener('focus', () => {
        hideMultiAgentsPlaceholder(assessmentAssistMultiAgentsInput);
    });
    assessmentAssistMultiAgentsInput.addEventListener('blur', () => {
        showMultiAgentsPlaceholder(assessmentAssistMultiAgentsInput, assessmentAssistMultiAgentsPlaceHolderText);
    });
    showMultiAgentsPlaceholder(assessmentAssistMultiAgentsInput, assessmentAssistMultiAgentsPlaceHolderText);

    assessmentAssistMultiAgentsInput.addEventListener('input', (e) => {
        const content = assessmentAssistMultiAgentsInput.innerText;
        // const cursorPosition = window.getSelection().getRangeAt(0).startOffset;

        const cursorPosition = getMultiAgentsCursorPosition(assessmentAssistMultiAgentsInput);
        // console.log("cursorPosition:",cursorPosition);
        const inputChar = content[cursorPosition - 1];

        // Check if the input character is '@'
        if (assessmentAssistAvailableMultiAgents.size > 1 && inputChar === '@'&& e.inputType !== 'deleteContentBackward') {
            const rect = getAgentCaretCoordinates(assessmentAssistMultiAgentsInput);
            showAgentsList(rect, assessmentAssistAgentsListPanel, assessmentAssistAvailableMultiAgents);
        } else {
            hideAgentsList(assessmentAssistAgentsListPanel);
        }

        // console.log(content.trim())
        // Check if all content is deleted
        if (content.trim() === '') {
            showMultiAgentsPlaceholder(assessmentAssistMultiAgentsInput, assessmentAssistMultiAgentsPlaceHolderText);
            // Remove all highlight spans
            const spans = assessmentAssistMultiAgentsInput.querySelectorAll('span.highlight-mention');
            spans.forEach(span => {
                span.remove();
            });
            assessmentAssistMultiAgentsInput.innerHTML = content.trim();
        } else {
            // Check if a highlighted span is being deleted
            hideMultiAgentsPlaceholder(assessmentAssistMultiAgentsInput);
            const spans = assessmentAssistMultiAgentsInput.querySelectorAll('span.highlight-mention');
            spans.forEach(span => {
                const range = document.createRange();
                range.selectNodeContents(span);
                const spanText = range.toString();
                if (!content.includes(spanText)) {
                    span.remove();
                }
            });
        }

    });

    assessmentAssistAgentsListPanel.addEventListener('click', (e) => {
        if (e.target.matches('.dropdown-item')) {
            console.log(e.target);
            console.log("e.target.dataset.agentName", e.target.dataset.agentName)
            insertAgentDisplayName(e.target.innerText, e.target.dataset.agentName, "CHATGPT_ASSESSMENT_ASSIST_MULTI_AGENTS_SINGLE_WINDOW");
        }
    });

    const keyupListener = function(e) {
        multiAgentsKeyupHandler("CHATGPT_ASSESSMENT_ASSIST_MULTI_AGENTS_SINGLE_WINDOW", e);
    };
    const keydownListener = function(e) {
        const key = `${userId}-${currentCourseId}-assessmentAssistMultiAgentsStartConversationTime`;
        const result = multiAgentsKeydownHandler(assessmentAssistMultiAgentsStartConversationTime, key, "CHATGPT_ASSESSMENT_ASSIST_MULTI_AGENTS_SINGLE_WINDOW", e);
        console.log("multiAgentsKeydownHandler: result: ", result);
        if (result) {
            console.log("result is not empty");
            setChatStartTime(assessmentAssistMultiAgentsStartConversationTime, key);
            checkAndSendMultiAgentsUserQuestion(assessmentAssistCurrentChatAgentNameKey, assessmentAssistMultiAgentsInput, assessmentAssistErrorMessageDiv, assessmentAssistMultiAgentsPlaceHolderText, assessmentAssistMultiAgentsChatContentDiv, assessmentAssistAvailableMultiAgents, assessmentAssistMultiAgentsSendQuestionBtn, "CHATGPT_ASSESSMENT_ASSIST_MULTI_AGENTS_SINGLE_WINDOW", false);
        }
    };
    assessmentAssistMultiAgentsInput.addEventListener('focus', () => {
        document.addEventListener('keydown', keydownListener);
        document.addEventListener('keyup', keyupListener);
    });

    assessmentAssistMultiAgentsInput.addEventListener('blur', () => {
        document.removeEventListener('keydown', keydownListener);
        document.removeEventListener('keyup', keyupListener);
    });


    assessmentAssistCollapseMultiAgents.addEventListener('click', function(e) {
        stopEventPropagation(e);
        let temp_instant_event = "";
        let temp_event_value = "";
        if (e.target.classList.contains('thumbs-up-icon') || e.target.classList.contains('thumbs-down-icon')) {
            let isUp = e.target.classList.contains('thumbs-up-icon');
            let isDown = e.target.classList.contains('thumbs-down-icon');
            let sibling; // 另一个图标
            if (isUp) sibling = e.target.parentNode.querySelector('.thumbs-down-icon');
            if (isDown) sibling = e.target.parentNode.querySelector('.thumbs-up-icon');

            let thumbStatus = changeThumbDisplay(e.target, sibling, isUp ? isUp : isDown);

            // 查找最近的 message-content 或 gpt-scaffold-message-content 以获得 messageId
            let container = e.target.closest('.bot-answer');
            if (!container) return;
            let messageId = container.dataset.messageid;

            requestGeneralChangeThumb(messageId, thumbStatus, "chat");
            temp_instant_event = isUp ? "RATING_THUMB_UP" : "RATING_THUMB_DOWN";
            temp_event_value = "MESSAGE_ID:::" + messageId;
        }

        // console.log("collapseSearch click");
        // sendMyTraceDataPost("/trace-chatgpt", getCurrentTimestamp(), "CHATGPT", "MOUSE_CLICK", null, "CLICK", "", e); //当select text时候会触发，mouse down up click 事件
        sendEventMessage("", getCurrentTimestamp(), "CHATGPT_ASSESSMENT_ASSIST_MULTI_AGENTS_SINGLE_WINDOW", "MOUSE_CLICK", "MULTI_AGENTS_SINGLE_WINDOW_CLICK", "CHATGPT", null, temp_instant_event, temp_event_value, e);
    });
    //当鼠标在搜索annotation框区域移动时候，所有移动和滚动行为都标注为 SEARCH_ANNOTATION
    assessmentAssistCollapseMultiAgents.addEventListener('wheel', function(e) {
        stopEventPropagation(e);
        // mousewheelData.push(generateMouseWheelData(e, "READ_GPT_FEEDBACK"));
        sendEventMessage("", getCurrentTimestamp(), "CHATGPT_ASSESSMENT_ASSIST_MULTI_AGENTS_SINGLE_WINDOW", "MOUSE_WHEEL", "READ_FEEDBACK_MULTI_AGENTS", "CHATGPT",null, "NO_INSTANT_EVENT", "SCROLL_DIST:::" + e.deltaY, e);
    });
    assessmentAssistCollapseMultiAgents.addEventListener('mousemove', function(e) {
        stopEventPropagation(e);
        mousePosition = generateMousePositionData(e, "READ_FEEDBACK_MULTI_AGENTS", "CHATGPT");
    });
    assessmentAssistCollapseMultiAgents.addEventListener('mouseup', function(e) {
        stopEventPropagation(e);
        if (window.getSelection() != null && window.getSelection().toString().replace(/\n/g, '').length > 0) {
            let selectText = window.getSelection().toString();
            // sendMyTraceDataPost("/trace-chatgpt", getCurrentTimestamp(), "CHATGPT", "MOUSE_SELECT_TEXT", null, "SELECT_TEXT", "MOUSE_SELECT:::" + selectText, e);
            sendEventMessage("", getCurrentTimestamp(), "CHATGPT_ASSESSMENT_ASSIST_MULTI_AGENTS_SINGLE_WINDOW", "MOUSE_SELECT_TEXT", "MULTI_AGENTS_SINGLE_WINDOW_SELECT_TEXT", "CHATGPT", null, "SELECT_TEXT", "MOUSE_SELECT:::" + selectText, e);
            // console.log("send post for select text-------------------------------------" + selectText + "-------");
        }
    });


    assessmentAssistMultiAgentsSendQuestionBtn.addEventListener('click', function(e) {
        stopEventPropagation(e);
        console.log("##################currentAgent", localStorage.getItem(assessmentAssistCurrentChatAgentNameKey));
        sendEventMessage("", getCurrentTimestamp(), "CHATGPT_ASSESSMENT_ASSIST_MULTI_AGENTS_SINGLE_WINDOW", "MOUSE_CLICK", "ASK_MULTI_AGENTS", "CHATGPT", null, "SUBMIT_QUESTION_CLICK_BTN", "", null);
        setChatStartTime(assessmentAssistMultiAgentsStartConversationTime, `${userId}-${currentCourseId}-assessmentAssistMultiAgentsStartConversationTime`);
        checkAndSendMultiAgentsUserQuestion(assessmentAssistCurrentChatAgentNameKey, assessmentAssistMultiAgentsInput, assessmentAssistErrorMessageDiv, assessmentAssistMultiAgentsPlaceHolderText, assessmentAssistMultiAgentsChatContentDiv, assessmentAssistAvailableMultiAgents, assessmentAssistMultiAgentsSendQuestionBtn, "CHATGPT_ASSESSMENT_ASSIST_MULTI_AGENTS_SINGLE_WINDOW", false);
    });
    assessmentAssistShowMultiAgentsBtn.addEventListener('click', function(e) {

        stopEventPropagation(e);
        if (useAnnotationTool) hideAnnotationToolbox(); // 隐藏annotation toolbox，当点击其他按钮时候
        activatePanel(assessmentAssistCollapseMultiAgents)
        // assessmentAssistCollapseMultiAgents.classList.toggle("in-tools");
        // toolsAndEssayToggle(assessmentAssistCollapseMultiAgents);
        assessmentAssistMultiAgentsClickTargetObject = "SHOW_MULTI_AGENTS_SINGLE_WINDOW_BTN";
        assessmentAssistMultiAgentsPageEvent = "MOUSE_CLICK";
        if (!assessmentAssistShowMultiAgentsBtn.querySelector("span.gpt-scaffold-flash-icon").classList.contains("d-none")) {

            localStorage.setItem(`${userId}-${currentCourseId}-assessment-assist-multi-agents-single-window-chat-start-timestamp`, "" + getCurrentTimestamp());
            assessmentAssistShowMultiAgentsBtn.querySelector("span.gpt-scaffold-flash-icon").classList.add("d-none");
        }

        sendEventMessage("", getCurrentTimestamp(), "CHATGPT_ASSESSMENT_ASSIST_MULTI_AGENTS_SINGLE_WINDOW", assessmentAssistMultiAgentsPageEvent, "MULTI_AGENTS_SINGLE_WINDOW_CLICK", "CHATGPT", assessmentAssistMultiAgentsClickTargetObject, "SHOW_MULTI_AGENTS_SINGLE_WINDOW_BTN_CLICK", "", null);
    });
    /*setInterval(function() {
        checkAgentTimeScaffoldTrigger(); // 由于使按时间触发，需要设置定时器来监控, 每60秒检测一次
    }, 60 * 1000);*/
    closeAssessmentAssistMultiAgentsBtn.onclick = function (e){
        stopEventPropagation(e);
        // if (assessmentAssistCollapseMultiAgents.classList)
        // assessmentAssistCollapseMultiAgents.classList.remove("in-tools", "in-tools-move-left", "in-tools-move-more-left");
        //
        activatePanel(assessmentAssistCollapseMultiAgents)
        sendEventMessage("", getCurrentTimestamp(), "CHATGPT_ASSESSMENT_ASSIST_MULTI_AGENTS_SINGLE_WINDOW", "MOUSE_CLICK", "MULTI_AGENTS_SINGLE_WINDOW_CLOSE", "CHATGPT", "X_ASSESSMENT_ASSIST_MULTI_AGENTS_SINGLE_WINDOW", "CLOSE_ASSESSMENT_ASSIST_MULTI_AGENTS_SINGLE_WINDOW_BTN_CLICK", "", null);


    }
}


// mediator rule based 的消息 作为gpt的 log
function loadAssessmentAssistMultiAgentsSingleWindowChatHistory() {
    getChatHistoryByCourseIdPromise(currentCourseId)
        .then(mainHistory => {
            // Stage2异步拼接
            if (isStage3) {
                let relatedId = relatedCourseIdMap[currentCourseId];
                return getChatHistoryByCourseIdPromise(relatedId)
                    .then(prevHistory => prevHistory.concat(mainHistory));
            }
            return mainHistory;
        })
        .then(chat_history => {
            // $(multiAgentsTextarea).empty();
            assessmentAssistMultiAgentsChatContentDiv.innerHTML = ""; //清空消息区域
            console.log("chat_history",chat_history);
            let aaChatHistory = chat_history.filter(chat => chat.chatgptRole === 'reporter'&& chat.assistantName.startsWith('aa'));

            if (aaChatHistory.length > 0) { //将currentChatAgent 设置为最后聊天的 agent
                // currentChatAgentName = chat_history[chat_history.length - 1].assistantName;
                localStorage.setItem(assessmentAssistCurrentChatAgentNameKey, aaChatHistory[aaChatHistory.length - 1].assistantName);
            }
            // allChatRound = chat_history.length;

            let agentChatCounts = {};
            aaChatHistory.forEach((chat, index) => {
                let tempAgentName = chat.assistantName;

                let tempAgent = assessmentAssistAvailableMultiAgents.get(tempAgentName); //保证只load 到 chat 而不是scaffold chat 的内容

                if (!tempAgent) {
                    return;
                }
                // console.log("tempAgentIndex:", tempAgentIndex);
                console.log("tempAgent:", tempAgentName);
                agentChatCounts[tempAgentName] = (agentChatCounts[tempAgentName] || 0) + 1; //累加计数
                if (chat.userQuestions.trim() !== '') {
                    appendGeneralQuestionHtml(chat.userQuestions, chat.userAskTime, chat.id, false, false, "", assessmentAssistMultiAgentsChatContentDiv);
                }
                if (chat.chatgptAnswer.trim() !== '') {
                    let bgColor = "";
                    if (chat.chatgptRole === 'scaffold') { //medical scaffold
                        bgColor = "#c1d2ed";
                    }
                    appendGeneralAgentAnswerHtml(chat.chatgptAnswer, chat.chatgptResponseTime, chat.questionId, chat.id, tempAgent.agentDisplayName, tempAgent.agentAvatarSvg, useAssessmentAssistMultiAgentsSingleWindowRating, chat.responseRatingThumb, index + 1, bgColor, assessmentAssistMultiAgentsChatContentDiv);
                }
            });
            Object.entries(agentChatCounts).forEach(([agentName, count]) => {
                localStorage.setItem(userId + "-" + currentCourseId + "-" + agentName + "-chat-history-length", "" + count);
            });
    });
}

function myCallbackAssessmentAssistMultiAgentsSingleWindow(contains, element) {
    let saveTime;

    let eventValue;
    if (contains) {
        // console.log('Element with id:', element.id, 'has the "in-tools" class!');
        saveTime = getCurrentTimestamp();
        assessmentAssistMultiAgentsInstantEvent = "OPEN";
        eventValue = "START_USE_TOOL:::" + saveTime;
        assessmentAssistMultiAgentsToolStartUseTime = saveTime;

        // sendMyTraceDataPost("/trace-chatgpt", saveTime, "CHATGPT", chatgptPageEvent, chatgptClickTargetObject, chatgptInstantEvent, eventValue, null);
        sendEventMessage("", saveTime, "CHATGPT_ASSESSMENT_ASSIST_MULTI_AGENTS_SINGLE_WINDOW", assessmentAssistMultiAgentsPageEvent, "MULTI_AGENTS_SINGLE_WINDOW_" + assessmentAssistMultiAgentsInstantEvent, "CHATGPT", assessmentAssistMultiAgentsClickTargetObject, assessmentAssistMultiAgentsInstantEvent, eventValue, null);
    } else {
        if (assessmentAssistMultiAgentsInstantEvent !== "CLOSE") {
            // console.log('Element with id:', element.id, 'has not the "in-tools" class!');
            saveTime = getCurrentTimestamp();
            assessmentAssistMultiAgentsInstantEvent = "CLOSE";
            if (assessmentAssistMultiAgentsToolStartUseTime === 0) {
                eventValue = "TOOL_USE_LENGTH:::ERROR-" + (saveTime - assessmentAssistMultiAgentsToolStartUseTime);
            } else {
                eventValue = "TOOL_USE_LENGTH:::" + (saveTime - assessmentAssistMultiAgentsToolStartUseTime);
            }

            // sendMyTraceDataPost("/trace-chatgpt", saveTime, "CHATGPT", chatgptPageEvent, chatgptClickTargetObject, chatgptInstantEvent, eventValue, null);
            sendEventMessage("", saveTime, "CHATGPT_ASSESSMENT_ASSIST_MULTI_AGENTS_SINGLE_WINDOW", assessmentAssistMultiAgentsPageEvent, "MULTI_AGENTS_SINGLE_WINDOW_" + assessmentAssistMultiAgentsInstantEvent, "CHATGPT", assessmentAssistMultiAgentsClickTargetObject, assessmentAssistMultiAgentsInstantEvent, eventValue, null);
        } else {
            // console.log('Element with id:', element.id, 'is keep closed');
        }

    }
    assessmentAssistMultiAgentsClickTargetObject = "NO_TARGET_OBJECT";
    assessmentAssistMultiAgentsPageEvent = "NO_PAGE_EVENT";
}
handleClassMutation(assessmentAssistCollapseMultiAgents, myCallbackAssessmentAssistMultiAgentsSingleWindow); //监听
