/**
 * @author Xinyu Li
 * @date 7/31/2024
 */

function render() {
    let multiAgentsToolHtml = `<!-- chatgpt assistant tool  -->
        <div class="my-horizontal-collapse-tools chatgpt-assistant" id="multi-agents-collapse">
            <div class="card card-body" style="height:100%;">
            <h3 class="mb-2">Chat Assistant</h3>
                <div style="height:100%;overflow-y:auto;">
                    <div class="form-control" style="height:100%; word-wrap: break-word;white-space : normal; font-size:10pt; overflow: auto;" id="multi-agents-textarea"></div>
                </div>
                <div class="input-group mt-2" id="multi-agents-panel-box">
                    <div contenteditable="true" id="multi-agents-input" class="form-control"></div>
                    
                    <div id="agents-list-panel" class="dropdown-menu"></div>
                    <button type="button" class="btn btn-outline-primary" id="multi-agents-send-question-btn" style="float: right">${chatgptSendBtnText}</button>   
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
let multiAgentsTextarea = document.querySelector("#multi-agents-textarea");

let multiAgentsInput = document.querySelector("#multi-agents-input");
let agentsListPanel = document.querySelector("#agents-list-panel");

let availableMultiAgents = multiAgentsSingleWindowConfig.agents.filter(agent => agent.useAgent === true);
const multiAgentsPlaceHolderText = availableMultiAgents.length > 1 ? 'Input @ to select different Chatbots to chat' : 'Input text to start chat';
let availableScaffoldAgents = multiAgentsSingleWindowConfig.scaffoldAgents.filter(agent => agent.useAgent === true);
// 记录每个scaffold的触发次数
let availableMultiAgentsScaffoldsTriggerStatus = new Map();
availableScaffoldAgents.forEach(scaffoldAgent => {
    availableMultiAgentsScaffoldsTriggerStatus.set(scaffoldAgent.agentName + "-time", new Array(scaffoldAgent.scaffoldsBasedRounds.length).fill(0));
    availableMultiAgentsScaffoldsTriggerStatus.set(scaffoldAgent.agentName + "-rounds", new Array(scaffoldAgent.scaffoldsBasedRounds.length).fill(0));
});




//This 4 variables are only used for tool open/close event
let multiAgentsClickTargetObject = "NO_TARGET_OBJECT";
let multiAgentsPageEvent = "NO_PAGE_EVENT";
let multiAgentsInstantEvent = "CLOSE";
let multiAgentsToolStartUseTime = 0;

let multiAgentsStartConversationTime = 0;
let availableMultiAgentsNames = availableMultiAgents.map(agent => agent.agentName);
// let startChatWithAgents = new Array(availableMultiAgents.length).fill(false); // 与agent 在 agents array里面的位置 对应
let eachAgentChatRound = new Array(availableMultiAgents.length).fill(0);
let currentChatAgent = availableMultiAgents.length === 1 ? availableMultiAgents[0] : null; // 等于1 表示只有一个agent，此时默认当前聊天的agent 永远是固定的
let allChatRound = 0;

let multiAgentsLogIdToQuestionIdMap = {};

function getMultiAgentsCursorPosition(element) {
    // 获取当前的选区（Selection）对象，它代表用户当前的文本选区
    const selection = window.getSelection();

    // 如果没有任何选区（即光标不在任何位置），则返回 0
    if (selection.rangeCount === 0) return 0;

    // 获取选区中的第一个范围（Range）对象
    const range = selection.getRangeAt(0);

    // 克隆这个范围对象，创建一个新的范围对象 preCaretRange
    const preCaretRange = range.cloneRange();

    // 设置这个新范围对象从元素的开始到光标所在位置
    preCaretRange.selectNodeContents(element);
    preCaretRange.setEnd(range.endContainer, range.endOffset);

    // 计算这个新范围对象的字符串表示的长度，这个长度即为光标在整个元素中的绝对位置
    const absolutePosition = preCaretRange.toString().length;

    // 返回光标的绝对位置
    return absolutePosition;
}

function showMultiAgentsPlaceholder() {
    if (multiAgentsInput.innerText.trim() === '') {
        multiAgentsInput.innerHTML = `<span class="placeholder">${multiAgentsPlaceHolderText}</span>`;
    }
}

function hideMultiAgentsPlaceholder() {
    const placeholder = multiAgentsInput.querySelector('.placeholder');
    if (placeholder) {
        multiAgentsInput.removeChild(placeholder);
    }
}

function multiAgentsKeyupHandler(e) {
    sendEventMessage("", getCurrentTimestamp(), "CHATGPT_MULTI_AGENTS_SINGLE_WINDOW", "KEYBOARD_STROKE", "ASK_MULTI_AGENTS", "CHATGPT", "QUESTION_INPUT", "WRITE_QUESTION", "KEY:::" + e.key + "---" + e.code, e);
}

function multiAgentsKeydownHandler(e) {
    // Check if Backspace is pressed
    if (e.key === 'Backspace') {
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        const startOffset = range.startOffset;

        if (startOffset === 0) {
            const previousNode = range.startContainer.previousSibling;
            if (previousNode && previousNode.nodeType === Node.ELEMENT_NODE && previousNode.classList.contains('highlight')) {
                previousNode.remove();
                e.preventDefault(); // Prevent the default Backspace behavior
            }
        } else {
            // Check if the previous character is part of a highlight span
            const textNode = range.startContainer;
            const offset = startOffset - 1;
            if (textNode.nodeType === Node.TEXT_NODE && textNode.parentNode.classList.contains('highlight')) {
                const span = textNode.parentNode;
                span.remove();
                e.preventDefault(); // Prevent the default Backspace behavior
            }
        }
    } else if (e.shiftKey && e.key === 'Enter') {
        e.preventDefault();
        sendEventMessage("", getCurrentTimestamp(), "CHATGPT_MULTI_AGENTS_SINGLE_WINDOW", "KEYBOARD_STROKE", "ASK_MULTI_AGENTS", "CHATGPT", null, "SUBMIT_QUESTION_PRESS_ENTER", "", null);
        checkMultiAgentsUserQuestion();
    }
}
function showAgentsList(rect) {
    agentsListPanel.innerHTML = availableMultiAgents.map(agent => `<a class="dropdown-item" href="#">${agent.agentDisplayName}</a>`).join('');

    console.log("agentsListPanel.innerHTML:--------------------------" + agentsListPanel.innerHTML);
    agentsListPanel.style.left = `${rect.x}px`;
    // agentsListPanel.style.top = `${rect.y}px`;
    agentsListPanel.style.display = 'block';
    agentsListPanel.classList.add('show');

    // 使用 requestAnimationFrame 确保 agentsListPanel 已被渲染，然后设置 top 值
    requestAnimationFrame(() => {
        const agentsListPanelHeight = agentsListPanel.offsetHeight;
        const dropdownItemHeight = agentsListPanel.querySelector('.dropdown-item').offsetHeight;
        agentsListPanel.style.top = `-${agentsListPanelHeight - rect.y - dropdownItemHeight/2}px`;  // 该值刚好在每一行@时显示的位置都合适
    });
}
function hideAgentsList() {
    agentsListPanel.style.display = 'none';
    agentsListPanel.classList.remove('show');
}


function insertAgentDisplayName(agentDisplayName) {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    // Move the range back to include the @ character
    range.setStart(range.startContainer, range.startOffset - 1);

    // Create a span for the highlighted username
    const span = document.createElement('span');
    span.className = 'highlight';
    span.textContent = `@${agentDisplayName} `;

    // Insert the span and collapse the range after the span
    range.deleteContents(); // Delete the @ character
    range.insertNode(span);
    sendEventMessage("", getCurrentTimestamp(), "CHATGPT_MULTI_AGENTS_SINGLE_WINDOW", "CLICK", "ASK_MULTI_AGENTS", "CHATGPT", "QUESTION_INPUT", "SELECT_AGENT", "AGENT_NAME::" + agentDisplayName, null);
    // Move the cursor after the inserted span
    const textNode = document.createTextNode('\u200B'); // Insert a zero-width space after the span
    range.setStartAfter(span);
    range.insertNode(textNode);
    range.setStartAfter(textNode); // Set the cursor after the zero-width space
    selection.removeAllRanges();
    selection.addRange(range);
    hideAgentsList();
}
function getAgentCaretCoordinates() {
    const sel = document.getSelection();
    if (sel.rangeCount === 0) {
        return null;
    }

    const range = sel.getRangeAt(0).cloneRange();
    const rect = range.getClientRects()[0];

    if (!rect) {
        return null;
    }

    const editorRect = multiAgentsInput.getBoundingClientRect();
    //
    // console.log("x",rect.left - editorRect.left)
    console.log("y",rect.top- editorRect.top)

    return {
        x: rect.left - editorRect.left,
        y: rect.top- editorRect.top,
    };
}


/**
 * 按时间触发 scaffold
 */
/*function checkAgentTimeScaffoldTrigger() {
    for (let i = 0; i < availableScaffoldAgents.length; i++) {
        let scaffoldAgent = availableScaffoldAgents[i];

        let currentMinute = Math.floor((getCurrentTimestamp() - taskStartTimestamp) / 1000 / 60);
        scaffoldAgent.scaffoldsBasedTime.forEach((scaffoldTriggerRule, scaffoldIndex) => {
            // 如果等于0次，表示没触发过，则可以触发，
            // 如果大于0次，且可以repeat，则可以触发
            let triggerTimes = availableMultiAgentsScaffoldsTriggerStatus.get(scaffoldAgent.agentName + "-time")[scaffoldIndex];
            if (triggerTimes === 0 && scaffoldTriggerRule.triggerMinute >= currentMinute) {
                // 触发 TODO

                askMultiAgentsQuestion("", scaffoldAgent, "The student has");
                availableMultiAgentsScaffoldsTriggerStatus.get(scaffoldAgent.agentName + "-time")[scaffoldIndex]++;
            } else if (triggerTimes > 0 && scaffoldTriggerRule.triggerRepeat && scaffoldTriggerRule.triggerMinute * triggerTimes >= currentMinute) {

            }
        });
    }
}*/

/**
 * 按轮数触发 scaffold
 * 使用 scaffoldAgent.agentName + "-rounds" 来作为key
 */
function checkAgentRoundScaffoldTrigger() {
    for (let i = 0; i < availableScaffoldAgents.length; i++) {
        let scaffoldAgent = availableScaffoldAgents[i];

        scaffoldAgent.scaffoldsBasedRounds.forEach((scaffoldTriggerRule, scaffoldIndex) => {
            // 如果等于0次，表示没触发过，则可以触发，
            // 如果大于0次，且可以repeat，则可以触发
            let triggerTimes = availableMultiAgentsScaffoldsTriggerStatus.get(scaffoldAgent.agentName + "-rounds")[scaffoldIndex];
            if (triggerTimes === 0 || (triggerTimes > 0 && scaffoldTriggerRule.triggerRepeat)) { // 表示如果现在该scaffold 还没有触发过
                if (scaffoldTriggerRule.triggerAllChatRound !== -1) { // 存在 按全局轮数触发的条件
                    if (scaffoldTriggerRule.triggerAllChatRound === allChatRound) { // 到达指定轮数，
                        // 触发 TODO

                        askMultiAgentsQuestion("", scaffoldAgent, scaffoldTriggerRule.extraPrompt);
                        availableMultiAgentsScaffoldsTriggerStatus.get(scaffoldAgent.agentName + "-rounds")[scaffoldIndex]++;
                    }
                }
                /*else if (scaffoldTriggerRule.triggerAgentChatRound.length > 0) { //存在某个组合触发条件

                    for (let j = 0; j < scaffoldTriggerRule.triggerAgentChatRound.length; j++) {
                        let temp = scaffoldTriggerRule.triggerAgentChatRound[j];
                        let tempAgentIndex = availableMultiAgents.indexOf(temp.agentName);
                        if (eachAgentChatRound[tempAgentIndex] === temp.round) { // 检测每个 agent 的 round 是否达到，按顺序，优先级高的顺序排在前面
                            // 触发  TODO

                            availableMultiAgentsScaffoldsTriggerStatus.get(scaffoldAgent.agentName + "-rounds")[scaffoldIndex]++;
                        }
                    }
                }*/
            }
        });
    }
}

function askMultiAgentsQuestion(question, agent, extraPrompt){
    console.log("calling askMultiAgentsQuestion for agent:" + agent.agentDisplayName);

    if (question.length > 0 || extraPrompt.length > 0) {
        // Show a processing sign
        const processingMessage = createProcessingMessage();
        $(multiAgentsTextarea).append(processingMessage);
        $(multiAgentsTextarea).scrollTop(multiAgentsTextarea.scrollHeight);

        let essayContent = "";
        if (typeof mainEditor === 'undefined' || mainEditor === null){
            essayContent = "";
        } else {
            essayContent = mainEditor.getText();
        }
        let chatgptData = {
            question: question,
            extraPrompt: extraPrompt,
            userId: userId,
            courseId: currentCourseId,
            essay: essayContent,
            questionId: "",
            includeEssay: agent.promptIncludeEssay,
            chatgptRoleDescription: agent.agentDescription,
            chatgptRole: agent.agentRole,
            backgroundFileNameList: agent.backgroundFileNameList,
            chatgptParameters: agent.chatgptParameters,
            agentName: agent.agentName,
        }

        $.ajax({
            url: apiBaseUrl + "/chatgpt",
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(chatgptData),
            dataType: 'json',
            success: function(data, status) {
                if (status === "success") {
                    $(processingMessage).remove();
                    const timestamp = new Date(parseInt(data.data.chatgptResponseTime, 10)).toLocaleTimeString();
                    let resContent = data.data.chatgptAnswer; //.replace("\n", "<br>"); //answer = answer.replace("\n", "<br>")
                    let questionId = data.data.questionId;
                    if (resContent === "gpt-error") {
                        resContent = "There is an error from Chatgpt, Please re-send your question.";
                    }
                    resContent = removeMarkdown(resContent);

                    allChatRound +=1;
                    let agentIndex = availableMultiAgentsNames.indexOf(agent.agentName);
                    // startChatWithAgents[agentIndex] = true;
                    eachAgentChatRound[agentIndex]++; // 更新对应的agent chat round

                    let replyHtml = generateGeneralAgentAnswerHtml(resContent, timestamp, questionId, data.data.id, agent.agentDisplayName, agent.agentAvatarSvg, false, allChatRound);
                    $(multiAgentsTextarea).append(replyHtml);
                    $(multiAgentsTextarea).scrollTop(multiAgentsTextarea.scrollHeight);
                    // rating system
                    // if(useToeflAssistantRating) {
                    //     setupOneRateThumb(data.data.id);
                    //     setupOneStarRatingBtn(data.data.id);
                    //     setupOneRegenerateAnswerBtn(data.data.id);
                    // }



                    // 轮数检测 发生在每次问完问题，并成功获取到答案
                    if (extraPrompt.length === 0) { // 等于0 表示 不是发送scaffold而是在问问题，发送scaffold时候不需要验证轮数。
                        checkAgentRoundScaffoldTrigger();
                    }
                } else {
                    // Remove the processing sign
                    $(processingMessage).remove();
                    alert("An error occurred while processing your question.");
                }
            }
        });
        return question;
    }
}

function checkMultiAgentsUserQuestion() {
    // 发送问题时候会调用此函数获取用户问题内容
    console.log("checkUserQuestion", multiAgentsInput.innerText);
    console.log("calling checkUserQuestion");

    // 记录对话开始时间
    if (multiAgentsStartConversationTime === 0){
        const startConversationTime = getCurrentTimestamp();
        localStorage.setItem(userId + "-" + currentCourseId +"multiAgentsStartConversationTime", startConversationTime.toString());
    }
    // const question = assistantPanelInput.value;
    const question = multiAgentsInput.innerText;
    // console.log(question);
    if (question.length > 0 && question !== multiAgentsPlaceHolderText) {
        multiAgentsInput.innerText = "";

        const timestamp = new Date().toLocaleTimeString();
        let safeQuestion = escapeHTML(question);
        let replyHtml = generateQuestionHtml(safeQuestion, timestamp);
        $(multiAgentsTextarea).append(replyHtml);
        multiAgentsTextarea.scrollTop = multiAgentsTextarea.scrollHeight;
        showMultiAgentsPlaceholder();

        // 取@开头的名字
        let name = question.match(/@.*?\s/); // 匹配@开头后面跟着一个空格的名字, 例如@structure
        console.log("@name:", name);
        console.log("@name === null", name === null);
        let cleanQuestion = ""
        if (name !== null) {
            cleanQuestion = question.replace(name[0], "");
            // remove textNode '\u200B'
            cleanQuestion = cleanQuestion.replace(/\u200B/g, "");
        } else {
            cleanQuestion = question;
        }
        // 判断cleanQuestion是否为空
        console.log("cleanQuestion", cleanQuestion.length);
        if(cleanQuestion.trim() === ""){
            let timestamp = new Date().toLocaleTimeString();
            const tmp = generateAnswerHtml("Input question cannot be empty!", timestamp, "");
            $(multiAgentsTextarea).append(tmp);
            $(multiAgentsTextarea).scrollTop(multiAgentsTextarea.scrollHeight);
            return null;
        }

        if (name !== null) {
            let nameStr = name[0].replace("@", "").replace(" ", "");
            console.log(nameStr);

            let nameStrMatchAgentDisplayName = false;
            availableMultiAgents.forEach(agent => {
               if (nameStr === agent.agentDisplayName) {
                   currentChatAgent = agent;
                   askMultiAgentsQuestion(cleanQuestion, agent, "");
                   sendEventMessage("", getCurrentTimestamp(), "CHATGPT_MULTI_AGENTS_SINGLE_WINDOW", "MOUSE_CLICK", "ASK_MULTI_AGENTS", "CHATGPT", null, "SUBMIT_QUESTION", "AGENT_NAME:::" + agent.agentName, null);
                   nameStrMatchAgentDisplayName = true;
               }
            });
             if (!nameStrMatchAgentDisplayName) {
                let timestamp = new Date().toLocaleTimeString();
                const tmp = generateAnswerHtml("Please @ correct chatbot to continue~", timestamp, "");
                $(multiAgentsTextarea).append(tmp);
                $(multiAgentsTextarea).scrollTop(multiAgentsTextarea.scrollHeight);
            }
        } else {
            // 根据 currentChatAgent 来决定向哪个专家提问
            console.log("currentChatAgent:",currentChatAgent);
            console.log("available multi agents:", availableMultiAgents);
            if (currentChatAgent !== null) {
                askMultiAgentsQuestion(cleanQuestion, currentChatAgent, "");
                sendEventMessage("", getCurrentTimestamp(), "CHATGPT_MULTI_AGENTS_SINGLE_WINDOW", "MOUSE_CLICK", "ASK_MULTI_AGENTS", "CHATGPT", null, "SUBMIT_QUESTION", "AGENT_NAME:::" + currentChatAgent.agentName, null);
            } else {
                let timestamp = new Date().toLocaleTimeString();
                const tmp = generateAnswerHtml("please @ a chatbot to continue~", timestamp, "");
                $(multiAgentsTextarea).append(tmp);
                $(multiAgentsTextarea).scrollTop(multiAgentsTextarea.scrollHeight);
            }
        }
        console.log("currentChatAgent",currentChatAgent);
        return question;
    } else {
        let timestamp = new Date().toLocaleTimeString();
        const tmp = generateAnswerHtml("Question cannot be empty!", timestamp, "");
        $(multiAgentsTextarea).append(tmp);
        $(multiAgentsTextarea).scrollTop(multiAgentsTextarea.scrollHeight);
        return null;
    }
}


function setupMultiAgentsSingleWindowTool() {
    multiAgentsInput.addEventListener('focus', hideMultiAgentsPlaceholder);
    multiAgentsInput.addEventListener('blur', showMultiAgentsPlaceholder);
    showMultiAgentsPlaceholder();

    multiAgentsInput.addEventListener('input', (e) => {
        const content = multiAgentsInput.innerText;
        // const cursorPosition = window.getSelection().getRangeAt(0).startOffset;

        const cursorPosition = getMultiAgentsCursorPosition(multiAgentsInput);
        // console.log("cursorPosition:",cursorPosition);
        const inputChar = content[cursorPosition - 1];

        // Check if the input character is '@'
        if (availableMultiAgents.length > 1 && inputChar === '@'&& e.inputType !== 'deleteContentBackward') {
            const rect = getAgentCaretCoordinates();
            showAgentsList(rect);
        } else {
            hideAgentsList();
        }

        // console.log(content.trim())
        // Check if all content is deleted
        if (content.trim() === '') {
            showMultiAgentsPlaceholder();
            // Remove all highlight spans
            const spans = multiAgentsInput.querySelectorAll('span.highlight');
            spans.forEach(span => {
                span.remove();
            });
            multiAgentsInput.innerHTML = content.trim();
        } else {
            // Check if a highlighted span is being deleted
            hideMultiAgentsPlaceholder();
            const spans = multiAgentsInput.querySelectorAll('span.highlight');
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
            insertAgentDisplayName(e.target.innerText);
        }
    });

    multiAgentsInput.addEventListener('focus', () => {
        document.addEventListener('keydown', multiAgentsKeydownHandler);
        document.addEventListener('keyup', multiAgentsKeyupHandler);
    });

    multiAgentsInput.addEventListener('blur', () => {
        document.removeEventListener('keydown', multiAgentsKeydownHandler);

    });


    collapseMultiAgents.onclick = function(e) {
        stopEventPropagation(e);
        // console.log("collapseSearch click");
        // sendMyTraceDataPost("/trace-chatgpt", getCurrentTimestamp(), "CHATGPT", "MOUSE_CLICK", null, "CLICK", "", e); //当select text时候会触发，mouse down up click 事件
        sendEventMessage("", getCurrentTimestamp(), "CHATGPT_MULTI_AGENTS_SINGLE_WINDOW", "MOUSE_CLICK", subActionLabelMap["CHATGPT_MULTI_AGENTS_SINGLE_WINDOW_CLICK"], "CHATGPT", null, "CLICK", "", e);
    };
    //当鼠标在搜索annotation框区域移动时候，所有移动和滚动行为都标注为 SEARCH_ANNOTATION
    collapseMultiAgents.onmousewheel = function(e) {
        stopEventPropagation(e);
        // mousewheelData.push(generateMouseWheelData(e, "READ_GPT_FEEDBACK"));
        sendEventMessage("", getCurrentTimestamp(), "CHATGPT_MULTI_AGENTS_SINGLE_WINDOW", "MOUSE_WHEEL", "READ_FEEDBACK_MULTI_AGENTS", "CHATGPT",null, "NO_INSTANT_EVENT", "SCROLL_DIST:::" + e.deltaY, e);
    };
    collapseMultiAgents.onmousemove = function(e) {
        stopEventPropagation(e);
        mousePosition = generateMousePositionData(e, "READ_FEEDBACK_MULTI_AGENTS", "CHATGPT");
    };
    collapseMultiAgents.onmouseup = function(e) {
        stopEventPropagation(e);
        if (window.getSelection() != null && window.getSelection().toString().replace(/\n/g, '').length > 0) {
            let selectText = window.getSelection().toString();
            // sendMyTraceDataPost("/trace-chatgpt", getCurrentTimestamp(), "CHATGPT", "MOUSE_SELECT_TEXT", null, "SELECT_TEXT", "MOUSE_SELECT:::" + selectText, e);
            sendEventMessage("", getCurrentTimestamp(), "CHATGPT_MULTI_AGENTS_SINGLE_WINDOW", "MOUSE_SELECT_TEXT", subActionLabelMap["CHATGPT_MULTI_AGENTS_SINGLE_WINDOW_SELECT_TEXT"], "CHATGPT", null, "SELECT_TEXT", "MOUSE_SELECT:::" + selectText, e);
            // console.log("send post for select text-------------------------------------" + selectText + "-------");
        }
    };


    multiAgentsSendQuestionBtn.onclick = function(e) {
        stopEventPropagation(e);
        console.log("##################currentAgent", currentChatAgent);
        sendEventMessage("", getCurrentTimestamp(), "CHATGPT_MULTI_AGENTS_SINGLE_WINDOW", "MOUSE_CLICK", "ASK_MULTI_AGENTS", "CHATGPT", null, "SUBMIT_QUESTION_CLICK_BTN", "", null);
        checkMultiAgentsUserQuestion();
        // inputQuestion = askAssistantQuestion();
        // sendMyTraceDataPost("/trace-chatgpt", getCurrentTimestamp(), "CHATGPT", "MOUSE_CLICK", "CHATGPT_PANEL_SUBMIT_BTN", "SUBMIT_QUESTION", "SUBMIT:::" + inputQuestion, e);
        // sendEventMessage("", getCurrentTimestamp(), "CHATGPT_ASSISTANT", "MOUSE_CLICK", subActionLabelMap["CHATGPT_ASSISTANT_SUBMIT_QUESTION"], "CHATGPT", "CHATGPT_PANEL_SUBMIT_BTN", "SUBMIT_QUESTION", "SUBMIT:::" + inputQuestion, e);
    }
    showMultiAgentsBtn.onclick = function(e) {

        stopEventPropagation(e);
        if (useAnnotationTool) hideAnnotationToolbox(); // 隐藏annotation toolbox，当点击其他按钮时候
        collapseMultiAgents.classList.toggle("in-tools");
        toolsAndEssayToggle(collapseMultiAgents);
        multiAgentsClickTargetObject = "SHOW_MULTI_AGENTS_SINGLE_WINDOW_BTN";
        multiAgentsPageEvent = "MOUSE_CLICK";

        // if (startMediatorNotified===false){ //TODO--------------------------------------------------------------变成通用的
        //     startMediatorNotified = true;
        //     getStartMediatorMessageResponse();
        //     sendEventMessage("", getCurrentTimestamp(), "CHATGPT_TOEFL_ASSISTANT", "MOUSE_CLICK", subActionLabelMap["CHATGPT_ASSISTANT_CLICK"], "CHATGPT_ASSISTANT", multiAgentsClickTargetObject, "START_FIRST_CONVERSATION", "", null);
        // }
        sendEventMessage("", getCurrentTimestamp(), "CHATGPT_MULTI_AGENTS_SINGLE_WINDOW", multiAgentsPageEvent, subActionLabelMap["CHATGPT_MULTI_AGENTS_SINGLE_WINDOW_CLICK"], "CHATGPT", multiAgentsClickTargetObject, "SHOW_MULTI_AGENTS_SINGLE_WINDOW_BTN_CLICK", "", null);
    };
    /*setInterval(function() {
        checkAgentTimeScaffoldTrigger(); // 由于使按时间触发，需要设置定时器来监控, 每60秒检测一次
    }, 60 * 1000);*/
}


// mediator rule based 的消息 作为gpt的 log
function loadMultiAgentsSingleWindowChatHistory() {
    $.get(apiBaseUrl + "/load-chatgpt-chat/" + userId + "/" + currentCourseId, function(data, status) {
        if (status === "success") {
            const chat_history = data.data || [];
            // Clear the handler box before displaying the new handler history

            let questionIdList = [];
            let chat_history_filtered = [];
            chat_history.forEach(chat => {
                // if (chat.chatgptRole === "expert") { // 如果要用评价的话需要修改的
                    // 如果 questionid 不为 null
                if (chat.questionId !== null) {
                    multiAgentsLogIdToQuestionIdMap[chat.id] = chat.questionId;
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
                // }
            });
            $(multiAgentsTextarea).empty();
            console.log("chat_history",chat_history);

            if (chat_history.length > 0) {
                let tempAgentName = chat_history[chat_history.length - 1].type;
                let tempAgentIndex = availableMultiAgentsNames.indexOf(tempAgentName);
                if (tempAgentIndex !== -1) {
                    currentChatAgent = availableMultiAgents[tempAgentIndex];
                }
            }
            allChatRound = chat_history.length;
            chat_history.forEach((chat, index) => {

                let tempAgentIndex = availableMultiAgentsNames.indexOf(chat.type);
                if (tempAgentIndex === -1) {
                    return;
                }
                let tempAgent = availableMultiAgents[tempAgentIndex];
                console.log("tempAgentIndex:", tempAgentIndex);
                console.log("tempAgent:", tempAgent);
                eachAgentChatRound[tempAgentIndex]++; //设置每个agent 的 对话轮数
                let atAgentName = availableMultiAgentsNames.length > 1 ? "@" + tempAgent.agentDisplayName + " " : "";
                $(multiAgentsTextarea).append(generateQuestionHtml(atAgentName + chat.userQuestions, new Date(parseInt(chat.userAskTime, 10)).toLocaleTimeString(), chat.id));
                $(multiAgentsTextarea).append(generateGeneralAgentAnswerHtml(chat.chatgptAnswer, new Date(parseInt(chat.chatgptResponseTime, 10)).toLocaleTimeString(), chat.questionId, chat.id, tempAgent.agentDisplayName, tempAgent.agentAvatarSvg, useMultiAgentsSingleWindowRating, index + 1));
                if (useMultiAgentsSingleWindowRating) {
                    // renderMultiAgentsSingleWindowRating(chat.id,chat.responseRatingStar,chat.responseRatingThumb)
                }
            });

            // if (useMultiAgentsSingleWindowRating) {
            //     setupRateThumb();
            //     setupStarRating();
            //     setupRegenerateAnswer();
            // }
            $(multiAgentsTextarea).animate({ scrollTop: $(multiAgentsTextarea).prop("scrollHeight")}, 1000);
        }
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
        sendEventMessage("", saveTime, "CHATGPT_MULTI_AGENTS_SINGLE_WINDOW", multiAgentsPageEvent, subActionLabelMap["CHATGPT_MULTI_AGENTS_SINGLE_WINDOW_" + multiAgentsInstantEvent], "CHATGPT", multiAgentsClickTargetObject, multiAgentsInstantEvent, eventValue, null);
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
            sendEventMessage("", saveTime, "CHATGPT_MULTI_AGENTS_SINGLE_WINDOW", multiAgentsPageEvent, subActionLabelMap["CHATGPT_MULTI_AGENTS_SINGLE_WINDOW_" + multiAgentsInstantEvent], "CHATGPT", multiAgentsClickTargetObject, multiAgentsInstantEvent, eventValue, null);
        } else {
            // console.log('Element with id:', element.id, 'is keep closed');
        }

    }
    multiAgentsClickTargetObject = "NO_TARGET_OBJECT";
    multiAgentsPageEvent = "NO_PAGE_EVENT";
}
handleClassMutation(collapseMultiAgents, myCallbackMultiAgentsSingleWindow); //监听
