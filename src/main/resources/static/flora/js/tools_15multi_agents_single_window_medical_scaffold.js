/**
 * @author Xinyu Li
 * @date 7/31/2024
 */

function render() {
    let multiAgentsToolHtml = `<!-- chatgpt assistant tool  -->
        <div class="my-horizontal-collapse-tools chatgpt-assistant" id="medical-scaffold-multi-agents-collapse">
            <div class="card card-body" style="height:100%;">
            <h6 class="mb-2">带教医生</h6>
            <span class="filling-instruction">(注：若你更新了临床推理对比分析表，请重新点击「请教老师」获取新反馈)</span>  
            <button type="button" class="btn btn-close" style="position:absolute; right:20px;" aria-label="Close" id="close-medical-scaffold-multi-agents-btn"></button>
                <div style="height:100%;overflow-y:auto;">
                    <div class="form-control" style="height:100%; word-wrap: break-word;white-space : normal; font-size:10pt; overflow: auto;" id="medical-scaffold-multi-agents-chat-content"></div>
                </div>
                
                <div class="input-group mt-2" id="medical-scaffold-multi-agents-panel-box" style="min-height:40px; max-height:100px; height:20%;">
                    <div id="medical-scaffold-error-message" class="text-danger" style="display: none;"></div>
                    <div contenteditable="true" id="medical-scaffold-multi-agents-input" class="form-control"></div>
                    
                    <div id="medical-scaffold-agents-list-panel" class="dropdown-menu"></div>
                    <button type="button" class="btn btn-outline-primary" id="medical-scaffold-multi-agents-send-question-btn" style="float: right;width: 100px">${multiAgentsSendBtnText}</button>   
                    
                </div>
           </div>
        </div>`;

    $("body").append(multiAgentsToolHtml);
}
render();


let medicalScaffoldCollapseMultiAgents = document.querySelector("#medical-scaffold-multi-agents-collapse");
toolList1.push(medicalScaffoldCollapseMultiAgents);
let medicalScaffoldShowMultiAgentsBtn = document.querySelector("#medical-scaffold-show-multi-agents-btn");
let closeMedicalScaffoldMultiAgentsBtn = document.querySelector("#close-medical-scaffold-multi-agents-btn");

let medicalScaffoldMultiAgentsSendQuestionBtn = document.querySelector("#medical-scaffold-multi-agents-send-question-btn");
let medicalScaffoldMultiAgentsChatContentDiv = document.querySelector("#medical-scaffold-multi-agents-chat-content");

let medicalScaffoldMultiAgentsInput = document.querySelector("#medical-scaffold-multi-agents-input");
let medicalScaffoldAgentsListPanel = document.querySelector("#medical-scaffold-agents-list-panel");
let medicalScaffoldErrorMessageDiv = document.querySelector("#medical-scaffold-error-message");

// let availableMultiAgents = multiAgentsSingleWindowConfig.agents.filter(agent => agent.useAgent === true);
let medicalScaffoldAvailableMultiAgents = new Map(
    medicalScaffoldMultiAgentsSingleWindowConfig.agents
        .filter(agent => agent.useAgent === true)
        .map(agent => [agent.agentName, agent])
);
// const medicalScaffoldMultiAgentsPlaceHolderText = medicalScaffoldAvailableMultiAgents.size > 1 ? multiAgentsSingleWindowPlaceholderTextMulti : multiAgentsSingleWindowPlaceholderTextSingle;
const medicalScaffoldMultiAgentsPlaceHolderText = "在此输入你的问题"
// let medicalScaffoldAvailableScaffoldAgents = medicalScaffoldMultiAgentsSingleWindowConfig.scaffoldAgents?.filter(agent => agent.useAgent === true);
let medicalScaffoldAvailableScaffoldAgents = new Map(
    medicalScaffoldMultiAgentsSingleWindowConfig.scaffoldAgents
        .filter(agent => agent.useAgent === true)
        .map(agent => [agent.agentName, agent])
);
// 记录每个scaffold的触发次数
let medicalScaffoldAvailableMultiAgentsScaffoldsTriggerStatus = new Map();
// availableScaffoldAgents.forEach(scaffoldAgent => {
//     availableMultiAgentsScaffoldsTriggerStatus.set(scaffoldAgent.agentName + "-time", new Array(scaffoldAgent.scaffoldsBasedRounds.length).fill(0));
//     availableMultiAgentsScaffoldsTriggerStatus.set(scaffoldAgent.agentName + "-rounds", new Array(scaffoldAgent.scaffoldsBasedRounds.length).fill(0));
// });


//This 4 variables are only used for tool open/close event
let medicalScaffoldMultiAgentsClickTargetObject = "NO_TARGET_OBJECT";
let medicalScaffoldMultiAgentsPageEvent = "NO_PAGE_EVENT";
let medicalScaffoldMultiAgentsInstantEvent = "CLOSE";
let medicalScaffoldMultiAgentsToolStartUseTime = 0;

let medicalScaffoldMultiAgentsStartConversationTime = parseInt(localStorage.getItem(userId + "-" + currentCourseId + "-medicalScaffoldMultiAgentsStartConversationTime"), 10) || 0;
// let availableMultiAgentsNames = availableMultiAgents.map(agent => agent.agentName);
// let startChatWithAgents = new Array(availableMultiAgents.size).fill(false); // 与agent 在 agents array里面的位置 对应
// let eachAgentChatRound = new Array(availableMultiAgents.size).fill(0);
let medicalScaffoldCurrentChatAgentName = medicalScaffoldAvailableMultiAgents.size === 1 ? medicalScaffoldAvailableMultiAgents.keys().next().value : null; // 等于1 表示只有一个agent，此时默认当前聊天的agent 永远是固定的
console.log("initial-----currentChatAgentName:", medicalScaffoldCurrentChatAgentName);
let medicalScaffoldCurrentChatAgentNameKey = `${userId}-${currentCourseId}-medicalScaffoldCurrentChatAgentName`;
localStorage.setItem(medicalScaffoldCurrentChatAgentNameKey, medicalScaffoldCurrentChatAgentName);
// let medicalScaffoldAllChatRound = 0;
let medicalScaffoldMultiAgentsSingleWindowReminderBgColor = "#ead1a2";


function setupMedicalScaffoldMultiAgentsSingleWindowTool() {
    const THUMB_NONE = 0;
    const THUMB_UP = 1;
    const THUMB_DOWN = 2;

    let tempTaskStartTimestamp = parseInt(localStorage.getItem(`${userId}-${currentCourseId}-taskStartTimestamp`)) || 0;
    let multiAgentsSingleWindowReminderInterval = setInterval(function () {
        let spendTimeSeconds = (getCurrentTimestamp() - tempTaskStartTimestamp) / 1000;
        // 获取当前的触发时间

        let multiAgentsSingleWindowChatStartTimestamp = parseInt(localStorage.getItem(`${userId}-${currentCourseId}-medical-scaffold-multi-agents-single-window-chat-start-timestamp`)) || 0;
        if (multiAgentsSingleWindowChatStartTimestamp !== 0) {
            //标识已经点开过 开始过聊天
        } else {
            if (allowMedicalScaffoldMultiAgentsSingleWindowReminder && spendTimeSeconds >= (60 * 7)) {
                appendGeneralGptScaffoldsOrHint(chatReminderMessage, new Date(getCurrentTimestamp()).toLocaleTimeString(), -1, 0, false, 0, "reminder", medicalScaffoldMultiAgentsSingleWindowReminderBgColor, medicalScaffoldMultiAgentsChatContentDiv,0)
                medicalScaffoldShowMultiAgentsBtn.querySelector("span.gpt-scaffold-flash-icon").classList.remove("d-none");
                sendEventMessage("", getCurrentTimestamp(), "CHATGPT_MEDICAL_SCAFFOLD_MULTI_AGENTS_SINGLE_WINDOW", "NO_PAGE_EVENT", "MULTI_AGENTS_SINGLE_WINDOW_START_REMINDER_TRIGGERED", "CHATGPT", "NO_TARGET_OBJECT", "START_REMINDER_TRIGGERED", "", null);
                clearInterval(multiAgentsSingleWindowReminderInterval);
            }
        }



    }, 5 * 1000); //7 * 60 * 1000

    medicalScaffoldMultiAgentsInput.addEventListener('focus', () => {
        hideMultiAgentsPlaceholder(medicalScaffoldMultiAgentsInput);
    });
    medicalScaffoldMultiAgentsInput.addEventListener('blur', () => {
        showMultiAgentsPlaceholder(medicalScaffoldMultiAgentsInput, medicalScaffoldMultiAgentsPlaceHolderText);
    });
    showMultiAgentsPlaceholder(medicalScaffoldMultiAgentsInput, medicalScaffoldMultiAgentsPlaceHolderText);

    medicalScaffoldMultiAgentsInput.addEventListener('input', (e) => {
        const content = medicalScaffoldMultiAgentsInput.innerText;
        // const cursorPosition = window.getSelection().getRangeAt(0).startOffset;

        const cursorPosition = getMultiAgentsCursorPosition(medicalScaffoldMultiAgentsInput);
        // console.log("cursorPosition:",cursorPosition);
        const inputChar = content[cursorPosition - 1];

        // Check if the input character is '@'
        if (medicalScaffoldAvailableMultiAgents.size > 1 && inputChar === '@'&& e.inputType !== 'deleteContentBackward') {
            const rect = getAgentCaretCoordinates(medicalScaffoldMultiAgentsInput);
            showAgentsList(rect, medicalScaffoldAgentsListPanel, medicalScaffoldAvailableMultiAgents);
        } else {
            hideAgentsList(medicalScaffoldAgentsListPanel);
        }

        // console.log(content.trim())
        // Check if all content is deleted
        if (content.trim() === '') {
            showMultiAgentsPlaceholder(medicalScaffoldMultiAgentsInput, medicalScaffoldMultiAgentsPlaceHolderText);
            // Remove all highlight spans
            const spans = medicalScaffoldMultiAgentsInput.querySelectorAll('span.highlight-mention');
            spans.forEach(span => {
                span.remove();
            });
            medicalScaffoldMultiAgentsInput.innerHTML = content.trim();
        } else {
            // Check if a highlighted span is being deleted
            hideMultiAgentsPlaceholder(medicalScaffoldMultiAgentsInput);
            const spans = medicalScaffoldMultiAgentsInput.querySelectorAll('span.highlight-mention');
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

    medicalScaffoldAgentsListPanel.addEventListener('click', (e) => {
        if (e.target.matches('.dropdown-item')) {
            console.log(e.target);
            console.log("e.target.dataset.agentName", e.target.dataset.agentName)
            insertAgentDisplayName(e.target.innerText, e.target.dataset.agentName, "CHATGPT_MEDICAL_SCAFFOLD_MULTI_AGENTS_SINGLE_WINDOW");
        }
    });

    const keyupListener = function(e) {
        multiAgentsKeyupHandler("CHATGPT_MEDICAL_SCAFFOLD_MULTI_AGENTS_SINGLE_WINDOW", e);
    };
    const keydownListener = function(e) {
        const key = `${userId}-${currentCourseId}-medicalScaffoldMultiAgentsStartConversationTime`;
        const result = multiAgentsKeydownHandler(medicalScaffoldMultiAgentsStartConversationTime, key, "CHATGPT_MEDICAL_SCAFFOLD_MULTI_AGENTS_SINGLE_WINDOW", e);
        console.log("multiAgentsKeydownHandler: result: ", result);
        if (result) {
            console.log("result is not empty");
            setChatStartTime(medicalScaffoldMultiAgentsStartConversationTime, key);
            checkAndSendMultiAgentsUserQuestion(medicalScaffoldCurrentChatAgentNameKey, medicalScaffoldMultiAgentsInput, medicalScaffoldErrorMessageDiv, medicalScaffoldMultiAgentsPlaceHolderText, medicalScaffoldMultiAgentsChatContentDiv, medicalScaffoldAvailableMultiAgents, medicalScaffoldMultiAgentsSendQuestionBtn, "CHATGPT_MEDICAL_SCAFFOLD_MULTI_AGENTS_SINGLE_WINDOW", false);
        }
    };
    medicalScaffoldMultiAgentsInput.addEventListener('focus', () => {
        document.addEventListener('keydown', keydownListener);
        document.addEventListener('keyup', keyupListener);
    });

    medicalScaffoldMultiAgentsInput.addEventListener('blur', () => {
        document.removeEventListener('keydown', keydownListener);
        document.removeEventListener('keyup', keyupListener);
    });


    medicalScaffoldCollapseMultiAgents.addEventListener('click', function(e) {
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
        sendEventMessage("", getCurrentTimestamp(), "CHATGPT_MEDICAL_SCAFFOLD_MULTI_AGENTS_SINGLE_WINDOW", "MOUSE_CLICK", "MULTI_AGENTS_SINGLE_WINDOW_CLICK", "CHATGPT", null, temp_instant_event, temp_event_value, e);
    });
    //当鼠标在搜索annotation框区域移动时候，所有移动和滚动行为都标注为 SEARCH_ANNOTATION
    medicalScaffoldCollapseMultiAgents.addEventListener('wheel', function(e) {
        stopEventPropagation(e);
        // mousewheelData.push(generateMouseWheelData(e, "READ_GPT_FEEDBACK"));
        sendEventMessage("", getCurrentTimestamp(), "CHATGPT_MEDICAL_SCAFFOLD_MULTI_AGENTS_SINGLE_WINDOW", "MOUSE_WHEEL", "READ_FEEDBACK_MULTI_AGENTS", "CHATGPT",null, "NO_INSTANT_EVENT", "SCROLL_DIST:::" + e.deltaY, e);
    });
    medicalScaffoldCollapseMultiAgents.addEventListener('mousemove', function(e) {
        stopEventPropagation(e);
        mousePosition = generateMousePositionData(e, "READ_MEDICAL_SCAFFOLD_FEEDBACK_MULTI_AGENTS", "CHATGPT");
    });
    medicalScaffoldCollapseMultiAgents.addEventListener('mouseup', function(e) {
        stopEventPropagation(e);
        if (window.getSelection() != null && window.getSelection().toString().replace(/\n/g, '').length > 0) {
            let selectText = window.getSelection().toString();
            // sendMyTraceDataPost("/trace-chatgpt", getCurrentTimestamp(), "CHATGPT", "MOUSE_SELECT_TEXT", null, "SELECT_TEXT", "MOUSE_SELECT:::" + selectText, e);
            sendEventMessage("", getCurrentTimestamp(), "CHATGPT_MEDICAL_SCAFFOLD_MULTI_AGENTS_SINGLE_WINDOW", "MOUSE_SELECT_TEXT", "MULTI_AGENTS_SINGLE_WINDOW_SELECT_TEXT", "CHATGPT", null, "SELECT_TEXT", "MOUSE_SELECT:::" + selectText, e);
            // console.log("send post for select text-------------------------------------" + selectText + "-------");
        }
    });


    medicalScaffoldMultiAgentsSendQuestionBtn.addEventListener('click', function(e) {
        stopEventPropagation(e);
        console.log("##################currentAgent", localStorage.getItem(medicalScaffoldCurrentChatAgentNameKey));
        sendEventMessage("", getCurrentTimestamp(), "CHATGPT_MEDICAL_SCAFFOLD_MULTI_AGENTS_SINGLE_WINDOW", "MOUSE_CLICK", "ASK_MULTI_AGENTS", "CHATGPT", null, "SUBMIT_QUESTION_CLICK_BTN", "", null);
        setChatStartTime(medicalScaffoldMultiAgentsStartConversationTime, `${userId}-${currentCourseId}-medicalScaffoldMultiAgentsStartConversationTime`);
        checkAndSendMultiAgentsUserQuestion(medicalScaffoldCurrentChatAgentNameKey, medicalScaffoldMultiAgentsInput, medicalScaffoldErrorMessageDiv, medicalScaffoldMultiAgentsPlaceHolderText, medicalScaffoldMultiAgentsChatContentDiv, medicalScaffoldAvailableMultiAgents, medicalScaffoldMultiAgentsSendQuestionBtn, "CHATGPT_MEDICAL_SCAFFOLD_MULTI_AGENTS_SINGLE_WINDOW", false);
    });
    medicalScaffoldShowMultiAgentsBtn.addEventListener('click', function(e) {

        stopEventPropagation(e);
        if (useAnnotationTool) hideAnnotationToolbox(); // 隐藏annotation toolbox，当点击其他按钮时候
        activatePanel(medicalScaffoldCollapseMultiAgents);
        // const toolPanels = [
        //     collapseSearch,          // annotation
        //     collapseChatgpt,         // chatgpt
        //     collapseMultiAgents,     // multi-agents
        //     assistCheckCollapseMultiAgents, // assist-check
        //     tigeCheckCollapseMultiAgents    // tige-check
        //     // ... 可继续加其它面板
        // ];
        // handleMedicalScaffoldClick(medicalScaffoldCollapseMultiAgents,toolPanels);

        // medicalScaffoldCollapseMultiAgents.classList.toggle("in-tools");
        // toolsAndEssayToggle(medicalScaffoldCollapseMultiAgents);
        medicalScaffoldMultiAgentsClickTargetObject = "SHOW_MULTI_AGENTS_SINGLE_WINDOW_BTN";
        medicalScaffoldMultiAgentsPageEvent = "MOUSE_CLICK";
        if (!medicalScaffoldShowMultiAgentsBtn.querySelector("span.gpt-scaffold-flash-icon").classList.contains("d-none")) {

            localStorage.setItem(`${userId}-${currentCourseId}-medical-scaffold-multi-agents-single-window-chat-start-timestamp`, "" + getCurrentTimestamp());
            medicalScaffoldShowMultiAgentsBtn.querySelector("span.gpt-scaffold-flash-icon").classList.add("d-none");
        }

        sendEventMessage("", getCurrentTimestamp(), "CHATGPT_MEDICAL_SCAFFOLD_MULTI_AGENTS_SINGLE_WINDOW", medicalScaffoldMultiAgentsPageEvent, "MULTI_AGENTS_SINGLE_WINDOW_CLICK", "CHATGPT", medicalScaffoldMultiAgentsClickTargetObject, "SHOW_MULTI_AGENTS_SINGLE_WINDOW_BTN_CLICK", "", null);
    });
    /*setInterval(function() {
        checkAgentTimeScaffoldTrigger(); // 由于使按时间触发，需要设置定时器来监控, 每60秒检测一次
    }, 60 * 1000);*/
    closeMedicalScaffoldMultiAgentsBtn.onclick = function (e){
        stopEventPropagation(e);
        activatePanel(medicalScaffoldCollapseMultiAgents);
        // medicalScaffoldCollapseMultiAgents.classList.remove("in-tools", "in-tools-move-left", "in-tools-move-more-left");
        sendEventMessage("", getCurrentTimestamp(), "CHATGPT_MEDICAL_SCAFFOLD_MULTI_AGENTS_SINGLE_WINDOW", "MOUSE_CLICK", "MULTI_AGENTS_SINGLE_WINDOW_CLOSE", "CHATGPT", "X_MEDICAL_SCAFFOLD_MULTI_AGENTS_SINGLE_WINDOW_BTN", "CLOSE_MULTI_AGENTS_SINGLE_WINDOW_BTN_CLICK", "", null);

    }
}

// function handleMedicalScaffoldClick(medicalScaffold,toolPanels) {
//     // 判断其它面板是否有激活的
//     const otherActivePanels = toolPanels.filter(panel => panel.classList.contains("in-tools"));
//
//     if (otherActivePanels.length > 0) {
//         // 1. 其它面板全部加move-more-left（且有in-tools）
//         otherActivePanels.forEach(panel => {
//             panel.classList.add("in-tools-move-more-left");
//         });
//         // 2. 自己在最右（加in-tools，去掉move-more-left）
//         if(! medicalScaffold.classList.toggle("in-tools")){
//             otherActivePanels.forEach(panel => {
//                 panel.classList.remove("in-tools-move-more-left");
//                 panel.classList.add("in-tools");
//             });
//         }
//
//     } else {
//         // 没有其它面板激活，普通toggle
//         medicalScaffold.classList.toggle("in-tools");
//         // 保险起见，去掉左移class
//         medicalScaffold.classList.remove("in-tools-move-more-left");
//     }
//
// }



// mediator rule based 的消息 作为gpt的 log
function loadMedicalScaffoldMultiAgentsSingleWindowChatHistory() {

    getChatHistoryByCourseIdPromise(currentCourseId)
        .then(mainHistory => {
            // Stage2异步拼接
            if (isStage2) {
                let relatedId = relatedCourseIdMap[currentCourseId];
                return getChatHistoryByCourseIdPromise(relatedId)
                    .then(prevHistory => prevHistory.concat(mainHistory));
            }
            if (isStage3){
                let relatedId1 = relatedCourseIdMap[currentCourseId];
                let relatedId2 = relatedCourseIdMap[relatedId1];
                return getChatHistoryByCourseIdPromise(relatedId1)
                    .then(prevHistory1 => {
                        return getChatHistoryByCourseIdPromise(relatedId2)
                            .then(prevHistory2 => prevHistory2.concat(prevHistory1).concat(mainHistory));
                    });
            }
            // 非Stage2直接用
            return mainHistory;
        })
        .then(chat_history => {
            let scaffoldChatHistory = chat_history.filter(chat => chat.chatgptRole === 'scaffold');
            let medicalteacherChatHistory = chat_history.filter(chat => chat.chatgptRole === 'medicalteacher');
            let assessmentChatHistory = chat_history.filter(chat => chat.chatgptRole === 'assessment');

            medicalScaffoldMultiAgentsChatContentDiv.innerHTML = ""; //清空消息区域

            const stageSuffixMapping = {
                stage1: "1",
                stage2: "2",
                stage3: "3"
            };

            if (typeof taskStage !== "undefined" && stageSuffixMapping[taskStage]) {
                // 根据 taskStage 获取对应的后缀
                const suffix = stageSuffixMapping[taskStage];
                medicalScaffoldCurrentChatAgentName = Array.from(medicalScaffoldAvailableMultiAgents.keys()).find(key => key.endsWith(suffix));
                localStorage.setItem(medicalScaffoldCurrentChatAgentNameKey, medicalScaffoldCurrentChatAgentName);
            } else {
                // 默认情况下，取聊天记录中的
                console.log("taskStage is undefined, using last chat agent name from medicalteacherChatHistory", taskStage);
                medicalScaffoldCurrentChatAgentName = medicalteacherChatHistory[medicalteacherChatHistory.length - 1].assistantName;
                localStorage.setItem(medicalScaffoldCurrentChatAgentNameKey, medicalScaffoldCurrentChatAgentName);
            }

            // allChatRound = chat_history.length;

            let agentChatCounts = {};
            // chat_history 为以上三个history的合并
            let chat_history_filtered = [...scaffoldChatHistory, ...medicalteacherChatHistory, ...assessmentChatHistory];
            // console.log("chat_history filtered of medical scaffold",chat_history_filtered );
            chat_history_filtered.forEach((chat, index) => {
                let tempAgentName = chat.assistantName;

                let tempAgent = medicalScaffoldAvailableMultiAgents.get(tempAgentName);

                if (!tempAgent) {
                    tempAgent = medicalScaffoldAvailableScaffoldAgents.get(tempAgentName); //如果没有找到对应的agent，可能是scaffold agent
                    if (!tempAgent) {
                        console.warn("No agent found for type:", tempAgentName);
                        return; // 如果没有找到对应的agent，跳过这个chat
                    }
                }
                // console.log("tempAgentIndex:", tempAgentIndex);
                // console.log("tempAgent:", tempAgentName);
                agentChatCounts[tempAgentName] = (agentChatCounts[tempAgentName] || 0) + 1; //累加计数
                if (chat.userQuestions.trim() !== '' && !['scaffold', 'feedback', 'assessment'].includes(chat.chatgptRole)) { // 只显示非scaffold的用户问题
                    appendGeneralQuestionHtml(chat.userQuestions, chat.userAskTime, chat.id, false, false, "", medicalScaffoldMultiAgentsChatContentDiv);
                }
                if (chat.chatgptAnswer.trim() !== '') {
                    let bgColor = "";
                    // if (chat.chatgptRole === 'scaffold') { //medical scaffold
                    //     bgColor = "#c1d2ed";
                    // }
                    appendGeneralAgentAnswerHtml(chat.chatgptAnswer, chat.chatgptResponseTime, chat.questionId, chat.id, tempAgent.agentDisplayName, tempAgent.agentAvatarSvg, useMedicalScaffoldMultiAgentsSingleWindowRating, chat.responseRatingThumb, index + 1, bgColor, medicalScaffoldMultiAgentsChatContentDiv);
                }
            });
            Object.entries(agentChatCounts).forEach(([agentName, count]) => {
                localStorage.setItem(userId + "-" + currentCourseId + "-" + agentName + "-chat-history-length", "" + count);
            });
        });
}

function myCallbackMedicalScaffoldMultiAgentsSingleWindow(contains, element) {
    let saveTime;

    let eventValue;
    if (contains) {
        // console.log('Element with id:', element.id, 'has the "in-tools" class!');
        saveTime = getCurrentTimestamp();
        medicalScaffoldMultiAgentsInstantEvent = "OPEN";
        eventValue = "START_USE_TOOL:::" + saveTime;
        medicalScaffoldMultiAgentsToolStartUseTime = saveTime;

        // sendMyTraceDataPost("/trace-chatgpt", saveTime, "CHATGPT", chatgptPageEvent, chatgptClickTargetObject, chatgptInstantEvent, eventValue, null);
        sendEventMessage("", saveTime, "CHATGPT_MEDICAL_SCAFFOLD_MULTI_AGENTS_SINGLE_WINDOW", medicalScaffoldMultiAgentsPageEvent, "MULTI_AGENTS_SINGLE_WINDOW_" + medicalScaffoldMultiAgentsInstantEvent, "CHATGPT", medicalScaffoldMultiAgentsClickTargetObject, medicalScaffoldMultiAgentsInstantEvent, eventValue, null);
    } else {
        if (medicalScaffoldMultiAgentsInstantEvent !== "CLOSE") {
            // console.log('Element with id:', element.id, 'has not the "in-tools" class!');
            saveTime = getCurrentTimestamp();
            medicalScaffoldMultiAgentsInstantEvent = "CLOSE";
            if (medicalScaffoldMultiAgentsToolStartUseTime === 0) {
                eventValue = "TOOL_USE_LENGTH:::ERROR-" + (saveTime - medicalScaffoldMultiAgentsToolStartUseTime);
            } else {
                eventValue = "TOOL_USE_LENGTH:::" + (saveTime - medicalScaffoldMultiAgentsToolStartUseTime);
            }

            // sendMyTraceDataPost("/trace-chatgpt", saveTime, "CHATGPT", chatgptPageEvent, chatgptClickTargetObject, chatgptInstantEvent, eventValue, null);
            sendEventMessage("", saveTime, "CHATGPT_MEDICAL_SCAFFOLD_MULTI_AGENTS_SINGLE_WINDOW", medicalScaffoldMultiAgentsPageEvent, "MULTI_AGENTS_SINGLE_WINDOW_" + medicalScaffoldMultiAgentsInstantEvent, "CHATGPT", medicalScaffoldMultiAgentsClickTargetObject, medicalScaffoldMultiAgentsInstantEvent, eventValue, null);
        } else {
            // console.log('Element with id:', element.id, 'is keep closed');
        }

    }
    medicalScaffoldMultiAgentsClickTargetObject = "NO_TARGET_OBJECT";
    medicalScaffoldMultiAgentsPageEvent = "NO_PAGE_EVENT";
}
handleClassMutation(medicalScaffoldCollapseMultiAgents, myCallbackMedicalScaffoldMultiAgentsSingleWindow); //监听
