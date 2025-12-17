/**
 * @author Xinyu Li
 * @date 7/31/2024
 */

function render() {
    let multiAgentsToolHtml = `<!-- chatgpt assistant tool  -->
        <div class="my-horizontal-collapse-tools chatgpt-assistant" id="assist-check-multi-agents-collapse">
            <div class="card card-body" style="height:100%;">
             <h6 class="mb-2">辅助检查</h6>
             <span class="filling-instruction">(根据必要性顺序提问)</span>

            <button type="button" class="btn btn-close" style="position:absolute; right:20px;" aria-label="Close" id="close-assist-check-multi-agents-btn"></button>
                <div style="height:100%;overflow-y:auto;">
                    <div class="form-control" style="height:100%; word-wrap: break-word;white-space : normal; font-size:10pt; overflow: auto;" id="assist-check-multi-agents-chat-content"></div>
                </div>
                
                <div class="input-group mt-2" id="assist-check-multi-agents-panel-box" style="min-height:40px; max-height:100px; height:20%;">
                    <div id="assist-check-error-message" class="text-danger" style="display: none;"></div>
                    <div contenteditable="true" id="assist-check-multi-agents-input" class="form-control"></div>
                    
                    <div id="assist-check-agents-list-panel" class="dropdown-menu"></div>
                    <button type="button" class="btn btn-outline-primary" id="assist-check-multi-agents-send-question-btn" style="float: right;width: 100px">${multiAgentsSendBtnText}</button>   
                    
                </div>
           </div>
        </div>`;

    $("body").append(multiAgentsToolHtml);
}
render();


let assistCheckCollapseMultiAgents = document.querySelector("#assist-check-multi-agents-collapse");
toolList1.push(assistCheckCollapseMultiAgents);
let assistCheckShowMultiAgentsBtn = document.querySelector("#assist-check-show-multi-agents-btn");
let closeAssistCheckMultiAgentsBtn = document.querySelector("#close-assist-check-multi-agents-btn");

let assistCheckMultiAgentsSendQuestionBtn = document.querySelector("#assist-check-multi-agents-send-question-btn");
let assistCheckMultiAgentsChatContentDiv = document.querySelector("#assist-check-multi-agents-chat-content");

let assistCheckMultiAgentsInput = document.querySelector("#assist-check-multi-agents-input");
let assistCheckAgentsListPanel = document.querySelector("#assist-check-agents-list-panel");
let assistCheckErrorMessageDiv = document.querySelector("#assist-check-error-message");

// let availableMultiAgents = multiAgentsSingleWindowConfig.agents.filter(agent => agent.useAgent === true);
let assistCheckAvailableMultiAgents = new Map(
    assistCheckMultiAgentsSingleWindowConfig.agents
        .filter(agent => agent.useAgent === true)
        .map(agent => [agent.agentName, agent])
);
const assistCheckMultiAgentsPlaceHolderText = assistCheckAvailableMultiAgents.size > 1 ? multiAgentsSingleWindowPlaceholderTextMulti : multiAgentsSingleWindowPlaceholderTextSingle;
// 记录每个scaffold的触发次数
let assistCheckAvailableScaffoldAgents = assistCheckMultiAgentsSingleWindowConfig.scaffoldAgents?.filter(agent => agent.useAgent === true);
let assistCheckAvailableMultiAgentsScaffoldsTriggerStatus = new Map();
// availableScaffoldAgents.forEach(scaffoldAgent => {
//     availableMultiAgentsScaffoldsTriggerStatus.set(scaffoldAgent.agentName + "-time", new Array(scaffoldAgent.scaffoldsBasedRounds.length).fill(0));
//     availableMultiAgentsScaffoldsTriggerStatus.set(scaffoldAgent.agentName + "-rounds", new Array(scaffoldAgent.scaffoldsBasedRounds.length).fill(0));
// });


//This 4 variables are only used for tool open/close event
let assistCheckMultiAgentsClickTargetObject = "NO_TARGET_OBJECT";
let assistCheckMultiAgentsPageEvent = "NO_PAGE_EVENT";
let assistCheckMultiAgentsInstantEvent = "CLOSE";
let assistCheckMultiAgentsToolStartUseTime = 0;

let assistCheckMultiAgentsStartConversationTime = parseInt(localStorage.getItem(userId + "-" + currentCourseId + "-assistCheckMultiAgentsStartConversationTime"), 10) || 0;
// let availableMultiAgentsNames = availableMultiAgents.map(agent => agent.agentName);
// let startChatWithAgents = new Array(availableMultiAgents.size).fill(false); // 与agent 在 agents array里面的位置 对应
// let eachAgentChatRound = new Array(availableMultiAgents.size).fill(0);
let assistCheckCurrentChatAgentName = assistCheckAvailableMultiAgents.size === 1 ? assistCheckAvailableMultiAgents.keys().next().value : null; // 等于1 表示只有一个agent，此时默认当前聊天的agent 永远是固定的
console.log("initial-----currentChatAgentName:", assistCheckCurrentChatAgentName);
let assistCheckCurrentChatAgentNameKey = `${userId}-${currentCourseId}-assistCheckCurrentChatAgentName`;
localStorage.setItem(assistCheckCurrentChatAgentNameKey, assistCheckCurrentChatAgentName);
// let assistCheckAllChatRound = 0;
let assistCheckMultiAgentsSingleWindowReminderBgColor = "#ead1a2";

//------------------------scaffold usage demo 每个study 可能不同------------------------------
function triggerScaffold() {
    let scaffoldAgent = assistCheckAvailableScaffoldAgents[0];
    let scaffoldTriggerRule = scaffoldAgent.triggerConfigs.triggerRule;
    //主要触发方式
    let scaffoldTriggers = scaffoldAgent.triggerConfigs[scaffoldTriggerRule];
    //补充默认触发方式
    let defaultScaffoldTriggers = scaffoldAgent.triggerConfigs["defaultTriggers"];
    let sharedAgentThreadId = getSharedAgentThreadId(assistCheckAvailableMultiAgents);

    if (scaffoldTriggerRule === "chatRoundTriggers") {
        //根据具体需求再修改 TODO
        // triggerChatRoundScaffold(scaffoldAgent, assistCheckAllChatRound, sharedAgentThreadId, scaffoldTriggers, defaultScaffoldTriggers, assistCheckMultiAgentsChatContentDiv);
    } else {
        triggerTimeRangeOrFixedMessageScaffold(scaffoldAgent, sharedAgentThreadId, scaffoldTriggers, defaultScaffoldTriggers, assistCheckMultiAgentsChatContentDiv);
    }
}


function setupAssistCheckMultiAgentsSingleWindowTool() {
    const THUMB_NONE = 0;
    const THUMB_UP = 1;
    const THUMB_DOWN = 2;

    let tempTaskStartTimestamp = parseInt(localStorage.getItem(`${userId}-${currentCourseId}-taskStartTimestamp`)) || 0;
    let multiAgentsSingleWindowReminderInterval = setInterval(function () {
        let spendTimeSeconds = (getCurrentTimestamp() - tempTaskStartTimestamp) / 1000;
        // 获取当前的触发时间

        let multiAgentsSingleWindowChatStartTimestamp = parseInt(localStorage.getItem(`${userId}-${currentCourseId}-assist-check-multi-agents-single-window-chat-start-timestamp`)) || 0;
        if (multiAgentsSingleWindowChatStartTimestamp !== 0) {
            //标识已经点开过 开始过聊天
        } else {
            if (allowAssistCheckMultiAgentsSingleWindowReminder && spendTimeSeconds >= (60 * 7)) {
                appendGeneralGptScaffoldsOrHint(chatReminderMessage, new Date(getCurrentTimestamp()).toLocaleTimeString(), -1, 0, false, 0, "reminder", assistCheckMultiAgentsSingleWindowReminderBgColor, assistCheckMultiAgentsChatContentDiv,0)
                assistCheckShowMultiAgentsBtn.querySelector("span.gpt-scaffold-flash-icon").classList.remove("d-none");
                sendEventMessage("", getCurrentTimestamp(), "CHATGPT_ASSIST_CHECK_MULTI_AGENTS_SINGLE_WINDOW", "NO_PAGE_EVENT", "MULTI_AGENTS_SINGLE_WINDOW_START_REMINDER_TRIGGERED", "CHATGPT", "NO_TARGET_OBJECT", "START_REMINDER_TRIGGERED", "", null);
                clearInterval(multiAgentsSingleWindowReminderInterval);
            }
        }



    }, 5 * 1000); //7 * 60 * 1000

    assistCheckMultiAgentsInput.addEventListener('focus', () => {
        hideMultiAgentsPlaceholder(assistCheckMultiAgentsInput);
    });
    assistCheckMultiAgentsInput.addEventListener('blur', () => {
        showMultiAgentsPlaceholder(assistCheckMultiAgentsInput, assistCheckMultiAgentsPlaceHolderText);
    });
    showMultiAgentsPlaceholder(assistCheckMultiAgentsInput, assistCheckMultiAgentsPlaceHolderText);

    assistCheckMultiAgentsInput.addEventListener('input', (e) => {
        const content = assistCheckMultiAgentsInput.innerText;
        // const cursorPosition = window.getSelection().getRangeAt(0).startOffset;

        const cursorPosition = getMultiAgentsCursorPosition(assistCheckMultiAgentsInput);
        // console.log("cursorPosition:",cursorPosition);
        const inputChar = content[cursorPosition - 1];

        // Check if the input character is '@'
        if (assistCheckAvailableMultiAgents.size > 1 && inputChar === '@'&& e.inputType !== 'deleteContentBackward') {
            const rect = getAgentCaretCoordinates(assistCheckMultiAgentsInput);
            showAgentsList(rect, assistCheckAgentsListPanel, assistCheckAvailableMultiAgents);
        } else {
            hideAgentsList(assistCheckAgentsListPanel);
        }

        // console.log(content.trim())
        // Check if all content is deleted
        if (content.trim() === '') {
            showMultiAgentsPlaceholder(assistCheckMultiAgentsInput, assistCheckMultiAgentsPlaceHolderText);
            // Remove all highlight spans
            const spans = assistCheckMultiAgentsInput.querySelectorAll('span.highlight-mention');
            spans.forEach(span => {
                span.remove();
            });
            assistCheckMultiAgentsInput.innerHTML = content.trim();
        } else {
            // Check if a highlighted span is being deleted
            hideMultiAgentsPlaceholder(assistCheckMultiAgentsInput);
            const spans = assistCheckMultiAgentsInput.querySelectorAll('span.highlight-mention');
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

    assistCheckAgentsListPanel.addEventListener('click', (e) => {
        if (e.target.matches('.dropdown-item')) {
            console.log(e.target);
            console.log("e.target.dataset.agentName", e.target.dataset.agentName)
            insertAgentDisplayName(e.target.innerText, e.target.dataset.agentName, "CHATGPT_ASSIST_CHECK_MULTI_AGENTS_SINGLE_WINDOW");
        }
    });

    const keyupListener = function(e) {
        multiAgentsKeyupHandler("CHATGPT_ASSIST_CHECK_MULTI_AGENTS_SINGLE_WINDOW", e);
    };
    const keydownListener = function(e) {
        const key = `${userId}-${currentCourseId}-assistCheckMultiAgentsStartConversationTime`;
        const result = multiAgentsKeydownHandler(assistCheckMultiAgentsStartConversationTime, key, "CHATGPT_ASSIST_CHECK_MULTI_AGENTS_SINGLE_WINDOW", e);
        console.log("multiAgentsKeydownHandler: result: ", result);
        if (result) {
            console.log("result is not empty");
            setChatStartTime(assistCheckMultiAgentsStartConversationTime, key);
            checkAndSendMultiAgentsUserQuestion(assistCheckCurrentChatAgentNameKey, assistCheckMultiAgentsInput, assistCheckErrorMessageDiv, assistCheckMultiAgentsPlaceHolderText, assistCheckMultiAgentsChatContentDiv, assistCheckAvailableMultiAgents, assistCheckMultiAgentsSendQuestionBtn, "CHATGPT_ASSIST_CHECK_MULTI_AGENTS_SINGLE_WINDOW", false);
        }
    };
    assistCheckMultiAgentsInput.addEventListener('focus', () => {
        document.addEventListener('keydown', keydownListener);
        document.addEventListener('keyup', keyupListener);
    });

    assistCheckMultiAgentsInput.addEventListener('blur', () => {
        document.removeEventListener('keydown', keydownListener);
        document.removeEventListener('keyup', keyupListener);
    });


    assistCheckCollapseMultiAgents.addEventListener('click', function(e) {
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
        sendEventMessage("", getCurrentTimestamp(), "CHATGPT_ASSIST_CHECK_MULTI_AGENTS_SINGLE_WINDOW", "MOUSE_CLICK", "MULTI_AGENTS_SINGLE_WINDOW_CLICK", "CHATGPT", null, temp_instant_event, temp_event_value, e);
    });
    //当鼠标在搜索annotation框区域移动时候，所有移动和滚动行为都标注为 SEARCH_ANNOTATION
    assistCheckCollapseMultiAgents.addEventListener('wheel', function(e) {
        stopEventPropagation(e);
        // mousewheelData.push(generateMouseWheelData(e, "READ_GPT_FEEDBACK"));
        sendEventMessage("", getCurrentTimestamp(), "CHATGPT_ASSIST_CHECK_MULTI_AGENTS_SINGLE_WINDOW", "MOUSE_WHEEL", "READ_FEEDBACK_MULTI_AGENTS", "CHATGPT",null, "NO_INSTANT_EVENT", "SCROLL_DIST:::" + e.deltaY, e);
    });
    assistCheckCollapseMultiAgents.addEventListener('mousemove', function(e) {
        stopEventPropagation(e);
        mousePosition = generateMousePositionData(e, "READ_ASSIST_CHECK_FEEDBACK_MULTI_AGENTS", "CHATGPT");
    });
    assistCheckCollapseMultiAgents.addEventListener('mouseup', function(e) {
        stopEventPropagation(e);
        if (window.getSelection() != null && window.getSelection().toString().replace(/\n/g, '').length > 0) {
            let selectText = window.getSelection().toString();
            // sendMyTraceDataPost("/trace-chatgpt", getCurrentTimestamp(), "CHATGPT", "MOUSE_SELECT_TEXT", null, "SELECT_TEXT", "MOUSE_SELECT:::" + selectText, e);
            sendEventMessage("", getCurrentTimestamp(), "CHATGPT_ASSIST_CHECK_MULTI_AGENTS_SINGLE_WINDOW", "MOUSE_SELECT_TEXT", "MULTI_AGENTS_SINGLE_WINDOW_SELECT_TEXT", "CHATGPT", null, "SELECT_TEXT", "MOUSE_SELECT:::" + selectText, e);
            // console.log("send post for select text-------------------------------------" + selectText + "-------");
        }
    });


    assistCheckMultiAgentsSendQuestionBtn.addEventListener('click', function(e) {
        stopEventPropagation(e);
        console.log("##################currentAgent", localStorage.getItem(assistCheckCurrentChatAgentNameKey));
        sendEventMessage("", getCurrentTimestamp(), "CHATGPT_ASSIST_CHECK_MULTI_AGENTS_SINGLE_WINDOW", "MOUSE_CLICK", "ASK_MULTI_AGENTS", "CHATGPT", null, "SUBMIT_QUESTION_CLICK_BTN", "", null);
        setChatStartTime(assistCheckMultiAgentsStartConversationTime, `${userId}-${currentCourseId}-assistCheckMultiAgentsStartConversationTime`);
        checkAndSendMultiAgentsUserQuestion(assistCheckCurrentChatAgentNameKey, assistCheckMultiAgentsInput, assistCheckErrorMessageDiv, assistCheckMultiAgentsPlaceHolderText, assistCheckMultiAgentsChatContentDiv, assistCheckAvailableMultiAgents, assistCheckMultiAgentsSendQuestionBtn, "CHATGPT_ASSIST_CHECK_MULTI_AGENTS_SINGLE_WINDOW", false);
    });
    assistCheckShowMultiAgentsBtn.addEventListener('click', function(e) {

        stopEventPropagation(e);
        if (useAnnotationTool) hideAnnotationToolbox(); // 隐藏annotation toolbox，当点击其他按钮时候

        activatePanel(assistCheckCollapseMultiAgents);
        // assistCheckCollapseMultiAgents.classList.toggle("in-tools");
        // toolsAndEssayToggle(assistCheckCollapseMultiAgents);
        assistCheckMultiAgentsClickTargetObject = "SHOW_MULTI_AGENTS_SINGLE_WINDOW_BTN";
        assistCheckMultiAgentsPageEvent = "MOUSE_CLICK";
        if (!assistCheckShowMultiAgentsBtn.querySelector("span.gpt-scaffold-flash-icon").classList.contains("d-none")) {

            localStorage.setItem(`${userId}-${currentCourseId}-assist-check-multi-agents-single-window-chat-start-timestamp`, "" + getCurrentTimestamp());
            assistCheckShowMultiAgentsBtn.querySelector("span.gpt-scaffold-flash-icon").classList.add("d-none");
        }

        sendEventMessage("", getCurrentTimestamp(), "CHATGPT_ASSIST_CHECK_MULTI_AGENTS_SINGLE_WINDOW", assistCheckMultiAgentsPageEvent, "MULTI_AGENTS_SINGLE_WINDOW_CLICK", "CHATGPT", assistCheckMultiAgentsClickTargetObject, "SHOW_MULTI_AGENTS_SINGLE_WINDOW_BTN_CLICK", "", null);
    });
    /*setInterval(function() {
        checkAgentTimeScaffoldTrigger(); // 由于使按时间触发，需要设置定时器来监控, 每60秒检测一次
    }, 60 * 1000);*/
    closeAssistCheckMultiAgentsBtn.onclick = function(e) {
        stopEventPropagation(e);
        // assistCheckMultiAgentsClickTargetObject = "X_MULTI_AGENTS_SINGLE_WINDOW_BTN"
        // assistCheckShowMultiAgentsBtn.click();
        // assistCheckCollapseMultiAgents.classList.remove("in-tools", "in-tools-move-left", "in-tools-move-more-left");
        activatePanel(assistCheckCollapseMultiAgents);
        sendEventMessage("", getCurrentTimestamp(), "CHATGPT_ASSIST_CHECK_MULTI_AGENTS_SINGLE_WINDOW", "MOUSE_CLICK", "MULTI_AGENTS_SINGLE_WINDOW_CLOSE", "CHATGPT", "X_ASSIST_CHECK_MULTI_AGENTS_SINGLE_WINDOW", "CLOSE_MULTI_AGENTS_SINGLE_WINDOW_BTN_CLICK", "", null);
    }
}


// mediator rule based 的消息 作为gpt的 log
function loadAssistCheckMultiAgentsSingleWindowChatHistory() {
    $.get(apiBaseUrl + "/load-chatgpt-chat/" + userId + "/" + currentCourseId, function(data, status) {
        if (status === "success") {
            const chat_history = data.data || [];
            // Clear the handler box before displaying the new handler history

            // $(multiAgentsTextarea).empty();
            assistCheckMultiAgentsChatContentDiv.innerHTML = ""; //清空消息区域
            console.log("chat_history",chat_history);
            let fzChatHistory = chat_history.filter(chat => chat.chatgptRole === 'reporter'&& chat.assistantName.startsWith('fz'));

            if (fzChatHistory.length > 0) { //将currentChatAgent 设置为最后聊天的 agent
                // currentChatAgentName = chat_history[chat_history.length - 1].assistantName;
                localStorage.setItem(assistCheckCurrentChatAgentNameKey, fzChatHistory[fzChatHistory.length - 1].assistantName);
            }
            // allChatRound = chat_history.length;

            let agentChatCounts = {};
            fzChatHistory.forEach((chat, index) => {
                let tempAgentName = chat.assistantName;

                let tempAgent = assistCheckAvailableMultiAgents.get(tempAgentName); //保证只load 到 chat 而不是scaffold chat 的内容

                if (!tempAgent) {
                    return;
                }
                // console.log("tempAgentIndex:", tempAgentIndex);
                console.log("tempAgent:", tempAgentName);
                agentChatCounts[tempAgentName] = (agentChatCounts[tempAgentName] || 0) + 1; //累加计数
                if (chat.userQuestions.trim() !== '') {
                    appendGeneralQuestionHtml(chat.userQuestions, chat.userAskTime, chat.id, false, false, "", assistCheckMultiAgentsChatContentDiv);
                }
                if (chat.chatgptAnswer.trim() !== '') {
                    let bgColor = "";
                    if (chat.chatgptRole === 'scaffold') { // scaffold
                        bgColor = "#c1d2ed";
                    }
                    appendGeneralAgentAnswerHtml(chat.chatgptAnswer, chat.chatgptResponseTime, chat.questionId, chat.id, tempAgent.agentDisplayName, tempAgent.agentAvatarSvg, useAssistCheckMultiAgentsSingleWindowRating, chat.responseRatingThumb, index + 1, bgColor, assistCheckMultiAgentsChatContentDiv);
                }
            });
            Object.entries(agentChatCounts).forEach(([agentName, count]) => {
                localStorage.setItem(userId + "-" + currentCourseId + "-" + agentName + "-chat-history-length", "" + count);
            });
        }
    });
}

function myCallbackAssistCheckMultiAgentsSingleWindow(contains, element) {
    let saveTime;

    let eventValue;
    if (contains) {
        // console.log('Element with id:', element.id, 'has the "in-tools" class!');
        saveTime = getCurrentTimestamp();
        assistCheckMultiAgentsInstantEvent = "OPEN";
        eventValue = "START_USE_TOOL:::" + saveTime;
        assistCheckMultiAgentsToolStartUseTime = saveTime;

        // sendMyTraceDataPost("/trace-chatgpt", saveTime, "CHATGPT", chatgptPageEvent, chatgptClickTargetObject, chatgptInstantEvent, eventValue, null);
        sendEventMessage("", saveTime, "CHATGPT_ASSIST_CHECK_MULTI_AGENTS_SINGLE_WINDOW", assistCheckMultiAgentsPageEvent, "MULTI_AGENTS_SINGLE_WINDOW_" + assistCheckMultiAgentsInstantEvent, "CHATGPT", assistCheckMultiAgentsClickTargetObject, assistCheckMultiAgentsInstantEvent, eventValue, null);
    } else {
        if (assistCheckMultiAgentsInstantEvent !== "CLOSE") {
            // console.log('Element with id:', element.id, 'has not the "in-tools" class!');
            saveTime = getCurrentTimestamp();
            assistCheckMultiAgentsInstantEvent = "CLOSE";
            if (assistCheckMultiAgentsToolStartUseTime === 0) {
                eventValue = "TOOL_USE_LENGTH:::ERROR-" + (saveTime - assistCheckMultiAgentsToolStartUseTime);
            } else {
                eventValue = "TOOL_USE_LENGTH:::" + (saveTime - assistCheckMultiAgentsToolStartUseTime);
            }

            // sendMyTraceDataPost("/trace-chatgpt", saveTime, "CHATGPT", chatgptPageEvent, chatgptClickTargetObject, chatgptInstantEvent, eventValue, null);
            sendEventMessage("", saveTime, "CHATGPT_ASSIST_CHECK_MULTI_AGENTS_SINGLE_WINDOW", assistCheckMultiAgentsPageEvent, "MULTI_AGENTS_SINGLE_WINDOW_" + assistCheckMultiAgentsInstantEvent, "CHATGPT", assistCheckMultiAgentsClickTargetObject, assistCheckMultiAgentsInstantEvent, eventValue, null);
        } else {
            // console.log('Element with id:', element.id, 'is keep closed');
        }

    }
    assistCheckMultiAgentsClickTargetObject = "NO_TARGET_OBJECT";
    assistCheckMultiAgentsPageEvent = "NO_PAGE_EVENT";
}
handleClassMutation(assistCheckCollapseMultiAgents, myCallbackAssistCheckMultiAgentsSingleWindow); //监听
