/**
 * @author Xinyu Li
 * @date 7/31/2024
 */
function render() {
    let multiAgentsToolHtml = `<!-- chatgpt assistant tool  -->
        <div class="my-horizontal-collapse-tools chatgpt-assistant" id="multi-agents-collapse">
            <div class="card card-body" style="height:100%;">
            <h6 class="mb-2">${typeof multiAgentsSingleWindowName !== 'undefined' ? multiAgentsSingleWindowName : 'Chat Assistant'}</h6><button type="button" class="btn btn-close" style="position:absolute; right:20px;" aria-label="Close" id="close-multi-agents-btn"></button>  
                <div style="height:100%;overflow-y:auto;">
                    <div class="form-control" style="height:100%; word-wrap: break-word;white-space : normal; font-size:10pt; overflow: auto;" id="multi-agents-chat-content"></div>
                </div>
                
                <div class="input-group mt-2" id="multi-agents-panel-box" style="min-height:40px; max-height:100px; height:20%;">
                    <div id="error-message" class="text-danger" style="display: none;"></div>
                    <div contenteditable="true" id="multi-agents-input" class="form-control"></div>
                    
                    <div id="agents-list-panel" class="dropdown-menu"></div>
                    <button type="button" class="btn btn-outline-primary" id="multi-agents-send-question-btn" style="float: right;width: 100px">${multiAgentsSendBtnText}</button>   
                    
                </div>
           </div>
        </div>`;

    $("body").append(multiAgentsToolHtml);
}
render();


let collapseMultiAgents = document.querySelector("#multi-agents-collapse");
toolList1.push(collapseMultiAgents);
let showMultiAgentsBtn = document.querySelector("#show-multi-agents-btn");

let multiAgentsSendQuestionBtn = document.querySelector("#multi-agents-send-question-btn");
let closeMultiAgentsBtn = document.querySelector("#close-multi-agents-btn");
let multiAgentsChatContentDiv = document.querySelector("#multi-agents-chat-content");

let multiAgentsInput = document.querySelector("#multi-agents-input");
let agentsListPanel = document.querySelector("#agents-list-panel");
let errorMessageDiv = document.querySelector("#error-message");

// let availableMultiAgents = multiAgentsSingleWindowConfig.agents.filter(agent => agent.useAgent === true);
let availableMultiAgents = new Map(
    multiAgentsSingleWindowConfig.agents
        .filter(agent => agent.useAgent === true)
        .map(agent => [agent.agentName, agent])
);
const multiAgentsPlaceHolderText = availableMultiAgents.size > 1 ? multiAgentsSingleWindowPlaceholderTextMulti : multiAgentsSingleWindowPlaceholderTextSingle;
let availableScaffoldAgents = multiAgentsSingleWindowConfig.scaffoldAgents?.filter(agent => agent.useAgent === true);
// 记录每个scaffold的触发次数
let availableMultiAgentsScaffoldsTriggerStatus = new Map();
// availableScaffoldAgents.forEach(scaffoldAgent => {
//     availableMultiAgentsScaffoldsTriggerStatus.set(scaffoldAgent.agentName + "-time", new Array(scaffoldAgent.scaffoldsBasedRounds.length).fill(0));
//     availableMultiAgentsScaffoldsTriggerStatus.set(scaffoldAgent.agentName + "-rounds", new Array(scaffoldAgent.scaffoldsBasedRounds.length).fill(0));
// });


//This 4 variables are only used for tool open/close event
let multiAgentsClickTargetObject = "NO_TARGET_OBJECT";
let multiAgentsPageEvent = "NO_PAGE_EVENT";
let multiAgentsInstantEvent = "CLOSE";
let multiAgentsToolStartUseTime = 0;

let multiAgentsStartConversationTime = parseInt(localStorage.getItem(userId + "-" + currentCourseId + "-multiAgentsStartConversationTime"), 10) || 0;
// let availableMultiAgentsNames = availableMultiAgents.map(agent => agent.agentName);
// let startChatWithAgents = new Array(availableMultiAgents.size).fill(false); // 与agent 在 agents array里面的位置 对应
// let eachAgentChatRound = new Array(availableMultiAgents.size).fill(0);
let currentChatAgentName = availableMultiAgents.size === 1 ? availableMultiAgents.keys().next().value : null; // 等于1 表示只有一个agent，此时默认当前聊天的agent 永远是固定的
console.log("initial-----currentChatAgentName:", currentChatAgentName);
let currentChatAgentNameKey = `${userId}-${currentCourseId}-currentChatAgentName`;
localStorage.setItem(currentChatAgentNameKey, "" + currentChatAgentName);
console.log("putinto localStorage-----currentChatAgentName:", localStorage.getItem(currentChatAgentNameKey));
// let allChatRound = 0;
let multiAgentsSingleWindowReminderBgColor = "#ead1a2";

//------------------------scaffold usage demo 每个study 可能不同------------------------------
function triggerScaffold() {
    let scaffoldAgent = availableScaffoldAgents[0];
    let scaffoldTriggerRule = scaffoldAgent.triggerConfigs.triggerRule;
    //主要触发方式
    let scaffoldTriggers = scaffoldAgent.triggerConfigs[scaffoldTriggerRule];
    //补充默认触发方式
    let defaultScaffoldTriggers = scaffoldAgent.triggerConfigs["defaultTriggers"];
    let sharedAgentThreadId = getSharedAgentThreadId(availableMultiAgents);

    if (scaffoldTriggerRule === "chatRoundTriggers") {
        //根据具体需求再修改 TODO
        // triggerChatRoundScaffold(scaffoldAgent, allChatRound, sharedAgentThreadId, scaffoldTriggers, defaultScaffoldTriggers, multiAgentsChatContentDiv);
    } else {
        triggerTimeRangeOrFixedMessageScaffold(scaffoldAgent, sharedAgentThreadId, scaffoldTriggers, defaultScaffoldTriggers, multiAgentsChatContentDiv);
    }


}



function setupMultiAgentsSingleWindowTool() {
    const THUMB_NONE = 0;
    const THUMB_UP = 1;
    const THUMB_DOWN = 2;

    let tempTaskStartTimestamp = parseInt(localStorage.getItem(`${userId}-${currentCourseId}-taskStartTimestamp`)) || 0;
    let multiAgentsSingleWindowReminderInterval = setInterval(function () {
        let spendTimeSeconds = (getCurrentTimestamp() - tempTaskStartTimestamp) / 1000;
        // 获取当前的触发时间

        let multiAgentsSingleWindowChatStartTimestamp = parseInt(localStorage.getItem(`${userId}-${currentCourseId}-multi-agents-single-window-chat-start-timestamp`)) || 0;
        if (multiAgentsSingleWindowChatStartTimestamp !== 0) {
            //标识已经点开过 开始过聊天
        } else {
            if (allowMultiAgentsSingleWindowReminder && spendTimeSeconds >= (typeof multiAgentsSingleWindowReminderShowTime !== "undefined" ? multiAgentsSingleWindowReminderShowTime : 60 * 7)) {
                appendGeneralGptScaffoldsOrHint(chatReminderMessage, new Date(getCurrentTimestamp()).toLocaleTimeString(), -1, 0, false, 0, "reminder", multiAgentsSingleWindowReminderBgColor, multiAgentsChatContentDiv,0)
                showMultiAgentsBtn.querySelector("span.gpt-scaffold-flash-icon").classList.remove("d-none");
                sendEventMessage("", getCurrentTimestamp(), "CHATGPT_MULTI_AGENTS_SINGLE_WINDOW", "NO_PAGE_EVENT", "MULTI_AGENTS_SINGLE_WINDOW_START_REMINDER_TRIGGERED", "CHATGPT", "NO_TARGET_OBJECT", "START_REMINDER_TRIGGERED", "", null);
                clearInterval(multiAgentsSingleWindowReminderInterval);
            }
        }

    }, 5 * 1000); //7 * 60 * 1000

    multiAgentsInput.addEventListener('focus', () => {
        hideMultiAgentsPlaceholder(multiAgentsInput);
    });
    multiAgentsInput.addEventListener('blur', () => {
        showMultiAgentsPlaceholder(multiAgentsInput, multiAgentsPlaceHolderText);
    });
    showMultiAgentsPlaceholder(multiAgentsInput, multiAgentsPlaceHolderText);

    multiAgentsInput.addEventListener('input', (e) => {
        const content = multiAgentsInput.innerText;
        // const cursorPosition = window.getSelection().getRangeAt(0).startOffset;

        const cursorPosition = getMultiAgentsCursorPosition(multiAgentsInput);
        // console.log("cursorPosition:",cursorPosition);
        const inputChar = content[cursorPosition - 1];

        // Check if the input character is '@'
        if (availableMultiAgents.size > 1 && inputChar === '@'&& e.inputType !== 'deleteContentBackward') {
            const rect = getAgentCaretCoordinates(multiAgentsInput);
            showAgentsList(rect, agentsListPanel, availableMultiAgents);
        } else {
            hideAgentsList(agentsListPanel);
        }

        // console.log(content.trim())
        // Check if all content is deleted
        if (content.trim() === '') {
            showMultiAgentsPlaceholder(multiAgentsInput, multiAgentsPlaceHolderText);
            // Remove all highlight spans
            const spans = multiAgentsInput.querySelectorAll('span.highlight-mention');
            spans.forEach(span => {
                span.remove();
            });
            multiAgentsInput.innerHTML = content.trim();
        } else {
            // Check if a highlighted span is being deleted
            hideMultiAgentsPlaceholder(multiAgentsInput);
            const spans = multiAgentsInput.querySelectorAll('span.highlight-mention');
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

    agentsListPanel.addEventListener('click', (e) => {
        if (e.target.matches('.dropdown-item')) {
            console.log(e.target);
            console.log("e.target.dataset.agentName", e.target.dataset.agentName)
            insertAgentDisplayName(e.target.innerText, e.target.dataset.agentName, "CHATGPT_MULTI_AGENTS_SINGLE_WINDOW");
        }
    });

    const keyupListener = function(e) {
        multiAgentsKeyupHandler("CHATGPT_MULTI_AGENTS_SINGLE_WINDOW", e);
    };
    const keydownListener = function(e) {
        const key = `${userId}-${currentCourseId}-multiAgentsStartConversationTime`;
        const result = multiAgentsKeydownHandler(multiAgentsStartConversationTime, key, "CHATGPT_MULTI_AGENTS_SINGLE_WINDOW", e);
        console.log("multiAgentsKeydownHandler: result: ", result);
        if (result) {
            console.log("result is not empty");
            console.log("currentChatAgentNameKey:" + currentChatAgentNameKey);
            console.log("currentChatAgentName:" + localStorage.getItem(currentChatAgentNameKey));
            setChatStartTime(multiAgentsStartConversationTime, key);
            checkAndSendMultiAgentsUserQuestion(currentChatAgentNameKey, multiAgentsInput, errorMessageDiv, multiAgentsPlaceHolderText, multiAgentsChatContentDiv, availableMultiAgents, multiAgentsSendQuestionBtn, "CHATGPT_MULTI_AGENTS_SINGLE_WINDOW", false);
        }
    };
    multiAgentsInput.addEventListener('focus', () => {
        document.addEventListener('keydown', keydownListener);
        document.addEventListener('keyup', keyupListener);
    });

    multiAgentsInput.addEventListener('blur', () => {
        document.removeEventListener('keydown', keydownListener);
        document.removeEventListener('keyup', keyupListener);
    });


    collapseMultiAgents.addEventListener('click', function(e) {
        stopEventPropagation(e);
        let temp_instant_event = "CLICK";
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
        sendEventMessage("", getCurrentTimestamp(), "CHATGPT_MULTI_AGENTS_SINGLE_WINDOW", "MOUSE_CLICK", "MULTI_AGENTS_SINGLE_WINDOW_CLICK", "CHATGPT", null, temp_instant_event, temp_event_value, e);
    });
    //当鼠标在搜索annotation框区域移动时候，所有移动和滚动行为都标注为 SEARCH_ANNOTATION
    collapseMultiAgents.addEventListener('wheel', function(e) {
        stopEventPropagation(e);
        sendEventMessage("", getCurrentTimestamp(), "CHATGPT_MULTI_AGENTS_SINGLE_WINDOW", "MOUSE_WHEEL", "READ_FEEDBACK_MULTI_AGENTS", "CHATGPT",null, "NO_INSTANT_EVENT", "SCROLL_DIST:::" + e.deltaY, e);
    });
    collapseMultiAgents.addEventListener('mousemove', function(e) {
        stopEventPropagation(e);
        mousePosition = generateMousePositionData(e, "READ_FEEDBACK_MULTI_AGENTS", "CHATGPT");
    });
    collapseMultiAgents.addEventListener('mouseup', function(e) {
        stopEventPropagation(e);
        if (window.getSelection() != null && window.getSelection().toString().replace(/\n/g, '').length > 0) {
            let selectText = window.getSelection().toString();
            // sendMyTraceDataPost("/trace-chatgpt", getCurrentTimestamp(), "CHATGPT", "MOUSE_SELECT_TEXT", null, "SELECT_TEXT", "MOUSE_SELECT:::" + selectText, e);
            sendEventMessage("", getCurrentTimestamp(), "CHATGPT_MULTI_AGENTS_SINGLE_WINDOW", "MOUSE_SELECT_TEXT", "MULTI_AGENTS_SINGLE_WINDOW_SELECT_TEXT", "CHATGPT", null, "SELECT_TEXT", "MOUSE_SELECT:::" + selectText, e);
            // console.log("send post for select text-------------------------------------" + selectText + "-------");
        }
    });


    multiAgentsSendQuestionBtn.addEventListener('click', function(e) {
        stopEventPropagation(e);
        console.log("##################currentAgent", localStorage.getItem(currentChatAgentNameKey));
        sendEventMessage("", getCurrentTimestamp(), "CHATGPT_MULTI_AGENTS_SINGLE_WINDOW", "MOUSE_CLICK", "ASK_MULTI_AGENTS", "CHATGPT", null, "SUBMIT_QUESTION_CLICK_BTN", "", null);
        setChatStartTime(multiAgentsStartConversationTime, `${userId}-${currentCourseId}-multiAgentsStartConversationTime`);
        checkAndSendMultiAgentsUserQuestion(currentChatAgentNameKey, multiAgentsInput, errorMessageDiv, multiAgentsPlaceHolderText, multiAgentsChatContentDiv, availableMultiAgents, multiAgentsSendQuestionBtn, "CHATGPT_MULTI_AGENTS_SINGLE_WINDOW", false);
    });
    showMultiAgentsBtn.addEventListener("mousedown", function (e) {e.stopPropagation();});
    showMultiAgentsBtn.addEventListener('click', function(e) {

        stopEventPropagation(e);
        if (useAnnotationTool) hideAnnotationToolbox(); // 隐藏annotation toolbox，当点击其他按钮时候
        // collapseMultiAgents.classList.toggle("in-tools");
        // toolsAndEssayToggle(collapseMultiAgents);
        activatePanel(collapseMultiAgents)
        multiAgentsClickTargetObject = "SHOW_MULTI_AGENTS_SINGLE_WINDOW_BTN";
        multiAgentsPageEvent = "MOUSE_CLICK";
        if (!showMultiAgentsBtn.querySelector("span.gpt-scaffold-flash-icon").classList.contains("d-none")) {

            localStorage.setItem(`${userId}-${currentCourseId}-multi-agents-single-window-chat-start-timestamp`, "" + getCurrentTimestamp());
            showMultiAgentsBtn.querySelector("span.gpt-scaffold-flash-icon").classList.add("d-none");
        }

        sendEventMessage("", getCurrentTimestamp(), "CHATGPT_MULTI_AGENTS_SINGLE_WINDOW", multiAgentsPageEvent, "MULTI_AGENTS_SINGLE_WINDOW_CLICK", "CHATGPT", multiAgentsClickTargetObject, "SHOW_MULTI_AGENTS_SINGLE_WINDOW_BTN_CLICK", "", null);
    });
    /*setInterval(function() {
        checkAgentTimeScaffoldTrigger(); // 由于使按时间触发，需要设置定时器来监控, 每60秒检测一次
    }, 60 * 1000);*/

    closeMultiAgentsBtn.onclick = function (e){
        stopEventPropagation(e);
        // multiAgentsClickTargetObject = "X_MULTI_AGENTS_SINGLE_WINDOW_BTN";
        activatePanel(collapseMultiAgents)
        // collapseMultiAgents.classList.remove("in-tools", "in-tools-move-left", "in-tools-move-more-left");
        sendEventMessage("", getCurrentTimestamp(), "CHATGPT_MULTI_AGENTS_SINGLE_WINDOW", "MOUSE_CLICK", "MULTI_AGENTS_SINGLE_WINDOW_CLOSE", "CHATGPT", "X_MULTI_AGENTS_SINGLE_WINDOW_BTN", "CLOSE_MULTI_AGENTS_SINGLE_WINDOW_BTN_CLICK", "", null);

    }
}

function loadMultiAgentsSingleWindowChatHistory() {
    // 首先拉当前course的主chat
    getChatHistoryByCourseIdPromise(currentCourseId)
        .then(chat_history => {
            // ---- 这里开始所有后续操作（渲染/console/分析），保证数据已完全拼接 ----
            multiAgentsChatContentDiv.innerHTML = "";

            console.log("chat_history", chat_history);

            let normalChatHistory = chat_history.filter(chat => chat.chatgptRole !== 'scaffold')
            if (normalChatHistory.length > 0 && availableMultiAgents.size > 1) { //如果有多个agent情况下，始终让最后一次聊天的agent作为current agent
                localStorage.setItem(currentChatAgentNameKey, normalChatHistory[normalChatHistory.length - 1].assistantName);
            }
            let agentChatCounts = {};
            let chathistory_filtered = [...normalChatHistory];
            chathistory_filtered.forEach((chat, index) => {
                let tempAgentName = chat.assistantName;
                let tempAgent = availableMultiAgents.get(tempAgentName);
                if (!tempAgent) return;
                agentChatCounts[tempAgentName] = (agentChatCounts[tempAgentName] || 0) + 1;
                if (chat.userQuestions.trim() !== '') {
                    appendGeneralQuestionHtml(chat.userQuestions, chat.userAskTime, chat.id, false, false, "", multiAgentsChatContentDiv);
                }
                if (chat.chatgptAnswer.trim() !== '') {
                    let bgColor = "";
                    if (chat.assistantName.startsWith('jimmie')) bgColor = "#c1d2ed";
                    appendGeneralAgentAnswerHtml(chat.chatgptAnswer, chat.chatgptResponseTime, chat.questionId, chat.id, tempAgent.agentDisplayName, tempAgent.agentAvatarSvg, useMultiAgentsSingleWindowRating, chat.responseRatingThumb, index + 1, bgColor, multiAgentsChatContentDiv);
                }
            });
            Object.entries(agentChatCounts).forEach(([agentName, count]) => {
                localStorage.setItem(userId + "-" + currentCourseId + "-" + agentName + "-chat-history-length", "" + count);
            });
            // ---- 后续继续 ----
        });
}

function myCallbackMultiAgentsSingleWindow(contains, element) {
    let saveTime;

    let eventValue;
    if (contains) {
        // console.log('Element with id:', element.id, 'has the "in-tools" class!');
        saveTime = getCurrentTimestamp();
        multiAgentsInstantEvent = "OPEN";
        eventValue = "START_USE_TOOL:::" + saveTime;
        multiAgentsToolStartUseTime = saveTime;

        // sendMyTraceDataPost("/trace-chatgpt", saveTime, "CHATGPT", chatgptPageEvent, chatgptClickTargetObject, chatgptInstantEvent, eventValue, null);
        sendEventMessage("", saveTime, "CHATGPT_MULTI_AGENTS_SINGLE_WINDOW", multiAgentsPageEvent, "MULTI_AGENTS_SINGLE_WINDOW_" + multiAgentsInstantEvent, "CHATGPT", multiAgentsClickTargetObject, multiAgentsInstantEvent, eventValue, null);
    } else {
        if (multiAgentsInstantEvent !== "CLOSE") {
            // console.log('Element with id:', element.id, 'has not the "in-tools" class!');
            saveTime = getCurrentTimestamp();
            multiAgentsInstantEvent = "CLOSE";
            if (multiAgentsToolStartUseTime === 0) {
                eventValue = "TOOL_USE_LENGTH:::ERROR-" + (saveTime - multiAgentsToolStartUseTime);
            } else {
                eventValue = "TOOL_USE_LENGTH:::" + (saveTime - multiAgentsToolStartUseTime);
            }

            // sendMyTraceDataPost("/trace-chatgpt", saveTime, "CHATGPT", chatgptPageEvent, chatgptClickTargetObject, chatgptInstantEvent, eventValue, null);
            sendEventMessage("", saveTime, "CHATGPT_MULTI_AGENTS_SINGLE_WINDOW", multiAgentsPageEvent, "MULTI_AGENTS_SINGLE_WINDOW_" + multiAgentsInstantEvent, "CHATGPT", multiAgentsClickTargetObject, multiAgentsInstantEvent, eventValue, null);
        } else {
            // console.log('Element with id:', element.id, 'is keep closed');
        }

    }
    multiAgentsClickTargetObject = "NO_TARGET_OBJECT";
    multiAgentsPageEvent = "NO_PAGE_EVENT";
}
handleClassMutation(collapseMultiAgents, myCallbackMultiAgentsSingleWindow); //监听