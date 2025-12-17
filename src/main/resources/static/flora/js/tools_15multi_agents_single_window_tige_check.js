/**
 * @author Xinyu Li
 * @date 7/31/2024
 */

function render() {
    let multiAgentsToolHtml = `<!-- chatgpt assistant tool  -->
        <div class="my-horizontal-collapse-tools chatgpt-assistant" id="tige-check-multi-agents-collapse">
            <div class="card card-body" style="height:100%;">
            <h6 class="mb-2">体格检查</h6>
            <span class="filling-instruction">(根据必要性顺序提问)</span>  
            <button type="button" class="btn btn-close" style="position:absolute; right:20px;" aria-label="Close" id="close-tige-check-multi-agents-btn"></button>

                <div style="height:100%;overflow-y:auto;">
                    <div class="form-control" style="height:100%; word-wrap: break-word;white-space : normal; font-size:10pt; overflow: auto;" id="tige-check-multi-agents-chat-content"></div>
                </div>
                
                <div class="input-group mt-2" id="tige-check-multi-agents-panel-box" style="min-height:40px; max-height:100px; height:20%;">
                    <div id="tige-check-error-message" class="text-danger" style="display: none;"></div>
                    <div contenteditable="true" id="tige-check-multi-agents-input" class="form-control"></div>
                    
                    <div id="tige-check-agents-list-panel" class="dropdown-menu"></div>
                    <button type="button" class="btn btn-outline-primary" id="tige-check-multi-agents-send-question-btn" style="float: right">${multiAgentsSendBtnText}</button>   
                    
                </div>
           </div>
        </div>`;

    $("body").append(multiAgentsToolHtml);
}
render();


let tigeCheckCollapseMultiAgents = document.querySelector("#tige-check-multi-agents-collapse");
toolList1.push(tigeCheckCollapseMultiAgents);
let tigeCheckShowMultiAgentsBtn = document.querySelector("#tige-check-show-multi-agents-btn");
let closeTigeCheckMultiAgentsBtn = document.querySelector("#close-tige-check-multi-agents-btn");

let tigeCheckMultiAgentsSendQuestionBtn = document.querySelector("#tige-check-multi-agents-send-question-btn");
let tigeCheckMultiAgentsChatContentDiv = document.querySelector("#tige-check-multi-agents-chat-content");

let tigeCheckMultiAgentsInput = document.querySelector("#tige-check-multi-agents-input");
let tigeCheckAgentsListPanel = document.querySelector("#tige-check-agents-list-panel");
let tigeCheckErrorMessageDiv = document.querySelector("#tige-check-error-message");

// let availableMultiAgents = multiAgentsSingleWindowConfig.agents.filter(agent => agent.useAgent === true);
let tigeCheckAvailableMultiAgents = new Map(
    tigeCheckMultiAgentsSingleWindowConfig.agents
        .filter(agent => agent.useAgent === true)
        .map(agent => [agent.agentName, agent])
);
const tigeCheckMultiAgentsPlaceHolderText = tigeCheckAvailableMultiAgents.size > 1 ? multiAgentsSingleWindowPlaceholderTextMulti : multiAgentsSingleWindowPlaceholderTextSingle;
let tigeCheckAvailableScaffoldAgents = tigeCheckMultiAgentsSingleWindowConfig.scaffoldAgents?.filter(agent => agent.useAgent === true);
// 记录每个scaffold的触发次数
let tigeCheckAvailableMultiAgentsScaffoldsTriggerStatus = new Map();
// availableScaffoldAgents.forEach(scaffoldAgent => {
//     availableMultiAgentsScaffoldsTriggerStatus.set(scaffoldAgent.agentName + "-time", new Array(scaffoldAgent.scaffoldsBasedRounds.length).fill(0));
//     availableMultiAgentsScaffoldsTriggerStatus.set(scaffoldAgent.agentName + "-rounds", new Array(scaffoldAgent.scaffoldsBasedRounds.length).fill(0));
// });


//This 4 variables are only used for tool open/close event
let tigeCheckMultiAgentsClickTargetObject = "NO_TARGET_OBJECT";
let tigeCheckMultiAgentsPageEvent = "NO_PAGE_EVENT";
let tigeCheckMultiAgentsInstantEvent = "CLOSE";
let tigeCheckMultiAgentsToolStartUseTime = 0;

let tigeCheckMultiAgentsStartConversationTime = parseInt(localStorage.getItem(userId + "-" + currentCourseId + "-tigeCheckMultiAgentsStartConversationTime"), 10) || 0;
// let availableMultiAgentsNames = availableMultiAgents.map(agent => agent.agentName);
// let startChatWithAgents = new Array(availableMultiAgents.size).fill(false); // 与agent 在 agents array里面的位置 对应
// let eachAgentChatRound = new Array(availableMultiAgents.size).fill(0);
let tigeCheckCurrentChatAgentName = tigeCheckAvailableMultiAgents.size === 1 ? tigeCheckAvailableMultiAgents.keys().next().value : null; // 等于1 表示只有一个agent，此时默认当前聊天的agent 永远是固定的
console.log("initial-----currentChatAgentName:", tigeCheckCurrentChatAgentName);
let tigeCheckCurrentChatAgentNameKey = `${userId}-${currentCourseId}-tigeCheckCurrentChatAgentName`;
localStorage.setItem(tigeCheckCurrentChatAgentNameKey, tigeCheckCurrentChatAgentName);
// let tigeCheckAllChatRound = 0;
let tigeCheckMultiAgentsSingleWindowReminderBgColor = "#ead1a2";

//------------------------scaffold usage demo 每个study 可能不同------------------------------
function triggerScaffold() {
    let scaffoldAgent = tigeCheckAvailableScaffoldAgents[0];
    let scaffoldTriggerRule = scaffoldAgent.triggerConfigs.triggerRule;
    //主要触发方式
    let scaffoldTriggers = scaffoldAgent.triggerConfigs[scaffoldTriggerRule];
    //补充默认触发方式
    let defaultScaffoldTriggers = scaffoldAgent.triggerConfigs["defaultTriggers"];
    let sharedAgentThreadId = getSharedAgentThreadId(tigeCheckAvailableMultiAgents);

    if (scaffoldTriggerRule === "chatRoundTriggers") {
        //根据具体需求再修改 TODO
        // triggerChatRoundScaffold(scaffoldAgent, tigeCheckAllChatRound, sharedAgentThreadId, scaffoldTriggers, defaultScaffoldTriggers, tigeCheckMultiAgentsChatContentDiv);
    } else {
        triggerTimeRangeOrFixedMessageScaffold(scaffoldAgent, sharedAgentThreadId, scaffoldTriggers, defaultScaffoldTriggers, tigeCheckMultiAgentsChatContentDiv);
    }
}


function setupTigeCheckMultiAgentsSingleWindowTool() {
    const THUMB_NONE = 0;
    const THUMB_UP = 1;
    const THUMB_DOWN = 2;

    let tempTaskStartTimestamp = parseInt(localStorage.getItem(`${userId}-${currentCourseId}-taskStartTimestamp`)) || 0;
    let multiAgentsSingleWindowReminderInterval = setInterval(function () {
        let spendTimeSeconds = (getCurrentTimestamp() - tempTaskStartTimestamp) / 1000;
        // 获取当前的触发时间

        let multiAgentsSingleWindowChatStartTimestamp = parseInt(localStorage.getItem(`${userId}-${currentCourseId}-tige-check-multi-agents-single-window-chat-start-timestamp`)) || 0;
        if (multiAgentsSingleWindowChatStartTimestamp !== 0) {
            //标识已经点开过 开始过聊天
        } else {
            if (allowTigeCheckMultiAgentsSingleWindowReminder && spendTimeSeconds >= (60 * 7)) {
                appendGeneralGptScaffoldsOrHint(chatReminderMessage, new Date(getCurrentTimestamp()).toLocaleTimeString(), -1, 0, false, 0, "reminder", tigeCheckMultiAgentsSingleWindowReminderBgColor, tigeCheckMultiAgentsChatContentDiv,0)
                tigeCheckShowMultiAgentsBtn.querySelector("span.gpt-scaffold-flash-icon").classList.remove("d-none");
                sendEventMessage("", getCurrentTimestamp(), "CHATGPT_TIGE_CHECK_MULTI_AGENTS_SINGLE_WINDOW", "NO_PAGE_EVENT", "MULTI_AGENTS_SINGLE_WINDOW_START_REMINDER_TRIGGERED", "CHATGPT", "NO_TARGET_OBJECT", "START_REMINDER_TRIGGERED", "", null);
                clearInterval(multiAgentsSingleWindowReminderInterval);
            }
        }



    }, 5 * 1000); //7 * 60 * 1000

    tigeCheckMultiAgentsInput.addEventListener('focus', () => {
        hideMultiAgentsPlaceholder(tigeCheckMultiAgentsInput);
    });
    tigeCheckMultiAgentsInput.addEventListener('blur', () => {
        showMultiAgentsPlaceholder(tigeCheckMultiAgentsInput, tigeCheckMultiAgentsPlaceHolderText);
    });
    showMultiAgentsPlaceholder(tigeCheckMultiAgentsInput, tigeCheckMultiAgentsPlaceHolderText);

    tigeCheckMultiAgentsInput.addEventListener('input', (e) => {
        const content = tigeCheckMultiAgentsInput.innerText;
        // const cursorPosition = window.getSelection().getRangeAt(0).startOffset;

        const cursorPosition = getMultiAgentsCursorPosition(tigeCheckMultiAgentsInput);
        // console.log("cursorPosition:",cursorPosition);
        const inputChar = content[cursorPosition - 1];

        // Check if the input character is '@'
        if (tigeCheckAvailableMultiAgents.size > 1 && inputChar === '@'&& e.inputType !== 'deleteContentBackward') {
            const rect = getAgentCaretCoordinates(tigeCheckMultiAgentsInput);
            showAgentsList(rect, tigeCheckAgentsListPanel, tigeCheckAvailableMultiAgents);
        } else {
            hideAgentsList(tigeCheckAgentsListPanel);
        }

        // console.log(content.trim())
        // Check if all content is deleted
        if (content.trim() === '') {
            showMultiAgentsPlaceholder(tigeCheckMultiAgentsInput, tigeCheckMultiAgentsPlaceHolderText);
            // Remove all highlight spans
            const spans = tigeCheckMultiAgentsInput.querySelectorAll('span.highlight-mention');
            spans.forEach(span => {
                span.remove();
            });
            tigeCheckMultiAgentsInput.innerHTML = content.trim();
        } else {
            // Check if a highlighted span is being deleted
            hideMultiAgentsPlaceholder(tigeCheckMultiAgentsInput);
            const spans = tigeCheckMultiAgentsInput.querySelectorAll('span.highlight-mention');
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

    tigeCheckAgentsListPanel.addEventListener('click', (e) => {
        if (e.target.matches('.dropdown-item')) {
            console.log(e.target);
            console.log("e.target.dataset.agentName", e.target.dataset.agentName)
            insertAgentDisplayName(e.target.innerText, e.target.dataset.agentName, "CHATGPT_TIGE_CHECK_MULTI_AGENTS_SINGLE_WINDOW");
        }
    });

    const keyupListener = function(e) {
        multiAgentsKeyupHandler("CHATGPT_TIGE_CHECK_MULTI_AGENTS_SINGLE_WINDOW", e);
    };
    const keydownListener = function(e) {
        const key = `${userId}-${currentCourseId}-tigeCheckMultiAgentsStartConversationTime`;
        const result = multiAgentsKeydownHandler(tigeCheckMultiAgentsStartConversationTime, key, "CHATGPT_TIGE_CHECK_MULTI_AGENTS_SINGLE_WINDOW", e);
        console.log("multiAgentsKeydownHandler: result: ", result);
        if (result) {
            console.log("result is not empty");
            setChatStartTime(tigeCheckMultiAgentsStartConversationTime, key);
            checkAndSendMultiAgentsUserQuestion(tigeCheckCurrentChatAgentNameKey, tigeCheckMultiAgentsInput, tigeCheckErrorMessageDiv, tigeCheckMultiAgentsPlaceHolderText, tigeCheckMultiAgentsChatContentDiv, tigeCheckAvailableMultiAgents, tigeCheckMultiAgentsSendQuestionBtn, "CHATGPT_TIGE_CHECK_MULTI_AGENTS_SINGLE_WINDOW", false);
        }
    };
    tigeCheckMultiAgentsInput.addEventListener('focus', () => {
        document.addEventListener('keydown', keydownListener);
        document.addEventListener('keyup', keyupListener);
    });

    tigeCheckMultiAgentsInput.addEventListener('blur', () => {
        document.removeEventListener('keydown', keydownListener);
        document.removeEventListener('keyup', keyupListener);
    });


    tigeCheckCollapseMultiAgents.addEventListener('click', function(e) {
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
        sendEventMessage("", getCurrentTimestamp(), "CHATGPT_TIGE_CHECK_MULTI_AGENTS_SINGLE_WINDOW", "MOUSE_CLICK", "MULTI_AGENTS_SINGLE_WINDOW_CLICK", "CHATGPT", null, temp_instant_event, temp_event_value, e);
    });
    //当鼠标在搜索annotation框区域移动时候，所有移动和滚动行为都标注为 SEARCH_ANNOTATION
    tigeCheckCollapseMultiAgents.addEventListener('wheel', function(e) {
        stopEventPropagation(e);
        // mousewheelData.push(generateMouseWheelData(e, "READ_GPT_FEEDBACK"));
        sendEventMessage("", getCurrentTimestamp(), "CHATGPT_TIGE_CHECK_MULTI_AGENTS_SINGLE_WINDOW", "MOUSE_WHEEL", "READ_FEEDBACK_MULTI_AGENTS", "CHATGPT",null, "NO_INSTANT_EVENT", "SCROLL_DIST:::" + e.deltaY, e);
    });
    tigeCheckCollapseMultiAgents.addEventListener('mousemove', function(e) {
        stopEventPropagation(e);
        mousePosition = generateMousePositionData(e, "READ_TIGE_FEEDBACK_MULTI_AGENTS", "CHATGPT");
    });
    tigeCheckCollapseMultiAgents.addEventListener('mouseup', function(e) {
        stopEventPropagation(e);
        if (window.getSelection() != null && window.getSelection().toString().replace(/\n/g, '').length > 0) {
            let selectText = window.getSelection().toString();
            // sendMyTraceDataPost("/trace-chatgpt", getCurrentTimestamp(), "CHATGPT", "MOUSE_SELECT_TEXT", null, "SELECT_TEXT", "MOUSE_SELECT:::" + selectText, e);
            sendEventMessage("", getCurrentTimestamp(), "CHATGPT_TIGE_CHECK_MULTI_AGENTS_SINGLE_WINDOW", "MOUSE_SELECT_TEXT", "MULTI_AGENTS_SINGLE_WINDOW_SELECT_TEXT", "CHATGPT", null, "SELECT_TEXT", "MOUSE_SELECT:::" + selectText, e);
            // console.log("send post for select text-------------------------------------" + selectText + "-------");
        }
    });


    tigeCheckMultiAgentsSendQuestionBtn.addEventListener('click', function(e) {
        stopEventPropagation(e);
        console.log("##################currentAgent", localStorage.getItem(tigeCheckCurrentChatAgentNameKey));
        sendEventMessage("", getCurrentTimestamp(), "CHATGPT_TIGE_CHECK_MULTI_AGENTS_SINGLE_WINDOW", "MOUSE_CLICK", "ASK_MULTI_AGENTS", "CHATGPT", null, "SUBMIT_QUESTION_CLICK_BTN", "", null);
        setChatStartTime(tigeCheckMultiAgentsStartConversationTime, `${userId}-${currentCourseId}-tigeCheckMultiAgentsStartConversationTime`);
        checkAndSendMultiAgentsUserQuestion(tigeCheckCurrentChatAgentNameKey, tigeCheckMultiAgentsInput, tigeCheckErrorMessageDiv, tigeCheckMultiAgentsPlaceHolderText, tigeCheckMultiAgentsChatContentDiv, tigeCheckAvailableMultiAgents, tigeCheckMultiAgentsSendQuestionBtn, "CHATGPT_TIGE_CHECK_MULTI_AGENTS_SINGLE_WINDOW", false);
    });
    tigeCheckShowMultiAgentsBtn.addEventListener('click', function(e) {

        stopEventPropagation(e);
        if (useAnnotationTool) hideAnnotationToolbox(); // 隐藏annotation toolbox，当点击其他按钮时候
        activatePanel(tigeCheckCollapseMultiAgents)
        // tigeCheckCollapseMultiAgents.classList.toggle("in-tools");
        // toolsAndEssayToggle(tigeCheckCollapseMultiAgents);
        tigeCheckMultiAgentsClickTargetObject = "SHOW_MULTI_AGENTS_SINGLE_WINDOW_BTN";
        tigeCheckMultiAgentsPageEvent = "MOUSE_CLICK";
        if (!tigeCheckShowMultiAgentsBtn.querySelector("span.gpt-scaffold-flash-icon").classList.contains("d-none")) {

            localStorage.setItem(`${userId}-${currentCourseId}-tige-check-multi-agents-single-window-chat-start-timestamp`, "" + getCurrentTimestamp());
            tigeCheckShowMultiAgentsBtn.querySelector("span.gpt-scaffold-flash-icon").classList.add("d-none");
        }

        sendEventMessage("", getCurrentTimestamp(), "CHATGPT_TIGE_CHECK_MULTI_AGENTS_SINGLE_WINDOW", tigeCheckMultiAgentsPageEvent, "MULTI_AGENTS_SINGLE_WINDOW_CLICK", "CHATGPT", tigeCheckMultiAgentsClickTargetObject, "SHOW_MULTI_AGENTS_SINGLE_WINDOW_BTN_CLICK", "", null);
    });
    /*setInterval(function() {
        checkAgentTimeScaffoldTrigger(); // 由于使按时间触发，需要设置定时器来监控, 每60秒检测一次
    }, 60 * 1000);*/
    closeTigeCheckMultiAgentsBtn.onclick = function (e){
        stopEventPropagation(e);
        // if (tigeCheckCollapseMultiAgents.classList)
        // tigeCheckCollapseMultiAgents.classList.remove("in-tools", "in-tools-move-left", "in-tools-move-more-left");
        //
        activatePanel(tigeCheckCollapseMultiAgents)
        sendEventMessage("", getCurrentTimestamp(), "CHATGPT_TIGE_CHECK_MULTI_AGENTS_SINGLE_WINDOW", "MOUSE_CLICK", "MULTI_AGENTS_SINGLE_WINDOW_CLOSE", "CHATGPT", "X_TIGE_CHECK_MULTI_AGENTS_SINGLE_WINDOW", "CLOSE_TIGE_CHECK_MULTI_AGENTS_SINGLE_WINDOW_BTN_CLICK", "", null);


    }
}


// mediator rule based 的消息 作为gpt的 log
function loadTigeCheckMultiAgentsSingleWindowChatHistory() {
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
            tigeCheckMultiAgentsChatContentDiv.innerHTML = ""; //清空消息区域
            console.log("chat_history",chat_history);
            let tgChatHistory = chat_history.filter(chat => chat.chatgptRole === 'reporter'&& chat.assistantName.startsWith('tg'));

            if (tgChatHistory.length > 0) { //将currentChatAgent 设置为最后聊天的 agent
                // currentChatAgentName = chat_history[chat_history.length - 1].assistantName;
                localStorage.setItem(tigeCheckCurrentChatAgentNameKey, tgChatHistory[tgChatHistory.length - 1].assistantName);
            }
            // allChatRound = chat_history.length;

            let agentChatCounts = {};
            tgChatHistory.forEach((chat, index) => {
                let tempAgentName = chat.assistantName;

                let tempAgent = tigeCheckAvailableMultiAgents.get(tempAgentName); //保证只load 到 chat 而不是scaffold chat 的内容

                if (!tempAgent) {
                    return;
                }
                // console.log("tempAgentIndex:", tempAgentIndex);
                console.log("tempAgent:", tempAgentName);
                agentChatCounts[tempAgentName] = (agentChatCounts[tempAgentName] || 0) + 1; //累加计数
                if (chat.userQuestions.trim() !== '') {
                    appendGeneralQuestionHtml(chat.userQuestions, chat.userAskTime, chat.id, false, false, "", tigeCheckMultiAgentsChatContentDiv);
                }
                if (chat.chatgptAnswer.trim() !== '') {
                    let bgColor = "";
                    if (chat.chatgptRole === 'scaffold') { //medical scaffold
                        bgColor = "#c1d2ed";
                    }
                    appendGeneralAgentAnswerHtml(chat.chatgptAnswer, chat.chatgptResponseTime, chat.questionId, chat.id, tempAgent.agentDisplayName, tempAgent.agentAvatarSvg, useTigeCheckMultiAgentsSingleWindowRating, chat.responseRatingThumb, index + 1, bgColor, tigeCheckMultiAgentsChatContentDiv);
                }
            });
            Object.entries(agentChatCounts).forEach(([agentName, count]) => {
                localStorage.setItem(userId + "-" + currentCourseId + "-" + agentName + "-chat-history-length", "" + count);
            });
    });
}

function myCallbackTigeCheckMultiAgentsSingleWindow(contains, element) {
    let saveTime;

    let eventValue;
    if (contains) {
        // console.log('Element with id:', element.id, 'has the "in-tools" class!');
        saveTime = getCurrentTimestamp();
        tigeCheckMultiAgentsInstantEvent = "OPEN";
        eventValue = "START_USE_TOOL:::" + saveTime;
        tigeCheckMultiAgentsToolStartUseTime = saveTime;

        // sendMyTraceDataPost("/trace-chatgpt", saveTime, "CHATGPT", chatgptPageEvent, chatgptClickTargetObject, chatgptInstantEvent, eventValue, null);
        sendEventMessage("", saveTime, "CHATGPT_TIGE_CHECK_MULTI_AGENTS_SINGLE_WINDOW", tigeCheckMultiAgentsPageEvent, "MULTI_AGENTS_SINGLE_WINDOW_" + tigeCheckMultiAgentsInstantEvent, "CHATGPT", tigeCheckMultiAgentsClickTargetObject, tigeCheckMultiAgentsInstantEvent, eventValue, null);
    } else {
        if (tigeCheckMultiAgentsInstantEvent !== "CLOSE") {
            // console.log('Element with id:', element.id, 'has not the "in-tools" class!');
            saveTime = getCurrentTimestamp();
            tigeCheckMultiAgentsInstantEvent = "CLOSE";
            if (tigeCheckMultiAgentsToolStartUseTime === 0) {
                eventValue = "TOOL_USE_LENGTH:::ERROR-" + (saveTime - tigeCheckMultiAgentsToolStartUseTime);
            } else {
                eventValue = "TOOL_USE_LENGTH:::" + (saveTime - tigeCheckMultiAgentsToolStartUseTime);
            }

            // sendMyTraceDataPost("/trace-chatgpt", saveTime, "CHATGPT", chatgptPageEvent, chatgptClickTargetObject, chatgptInstantEvent, eventValue, null);
            sendEventMessage("", saveTime, "CHATGPT_TIGE_CHECK_MULTI_AGENTS_SINGLE_WINDOW", tigeCheckMultiAgentsPageEvent, "MULTI_AGENTS_SINGLE_WINDOW_" + tigeCheckMultiAgentsInstantEvent, "CHATGPT", tigeCheckMultiAgentsClickTargetObject, tigeCheckMultiAgentsInstantEvent, eventValue, null);
        } else {
            // console.log('Element with id:', element.id, 'is keep closed');
        }

    }
    tigeCheckMultiAgentsClickTargetObject = "NO_TARGET_OBJECT";
    tigeCheckMultiAgentsPageEvent = "NO_PAGE_EVENT";
}
handleClassMutation(tigeCheckCollapseMultiAgents, myCallbackTigeCheckMultiAgentsSingleWindow); //监听
