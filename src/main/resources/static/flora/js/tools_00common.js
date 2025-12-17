//-------------------------------- General Toast ---------------------------------------------
function renderGeneralToast() {
    let myGeneralToastHtml = '<!-- 通用 toast -->' +
        // '<script src="../static/flora/js/jquery.min.js" crossorigin></script>' +
        '<div class="position-fixed bottom-0 start-0 p-3" style="z-index: 11">' +
        '   <div id="my-general-toast" class="toast hide" role="alert" aria-live="assertive" aria-atomic="true">' +
        '       <div class="toast-header"><strong class="me-auto">FLoRA</strong><button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button></div>' +
        '       <div class="toast-body text-success ms-3 h5"></div>' +
        '   </div>' +
        '</div>' +
        '<div id="scaffold-shadow-div" class="my-modal"></div>';
        ;
    $("body").append(myGeneralToastHtml);
}
renderGeneralToast();

const subActionLabelMap = {
    "TIMER_OPEN": "TIMER",
    "TIMER_ESSAY_TASK_END": "END_TASK",
    "TIMER_ESSAY_TASK_START": "START_TASK",


    "ESSAY_OPEN": "OPEN_ESSAY",
    "ESSAY_CLOSE": "CLOSE_ESSAY",
    "ESSAY_PASTE_TEXT": "PASTE_TEXT_ESSAY",
    "ESSAY_WRITE": "WRITE_ESSAY",
    "ESSAY_SAVE": "SAVE_ESSAY",
    "ESSAY_FOCUS": "WRITE_ESSAY",
    "ESSAY_SELECT_TEXT": "WRITE_ESSAY",
    "ESSAY_BLUR": "WRITE_ESSAY",
    "ESSAY_CHANGE_STYLE": "WRITE_ESSAY",
    "ESSAY_CLICK": "WRITE_ESSAY",
    "ESSAY_CHECK_WORD_COUNT": "CHECK_WORD_COUNT",


    "OFF_TASK_OFF_TASK": "OFF_TASK",


    "SEARCH_ANNOTATION_WRITE_KEYWORD": "SEARCH_ANNOTATION",
    "SEARCH_ANNOTATION_SEARCH_KEYWORD": "SEARCH_ANNOTATION",
    "SEARCH_ANNOTATION_SEARCH_INPUT_FOCUS": "SEARCH_ANNOTATION",
    "SEARCH_ANNOTATION_SEARCH_INPUT_BLUR": "SEARCH_ANNOTATION",
    "SEARCH_ANNOTATION_OPEN": "SEARCH_ANNOTATION",
    "SEARCH_ANNOTATION_CLOSE": "SEARCH_ANNOTATION",
    "SEARCH_ANNOTATION_CLICK": "SEARCH_ANNOTATION",
    "SEARCH_ANNOTATION_SELECT_TEXT": "SEARCH_ANNOTATION",


    "ANNOTATION_CREATE_NOTE": "CREATE_NOTE",
    "ANNOTATION_CREATE_NOTE_SAVE": "CREATE_NOTE",
    "ANNOTATION_CANCEL_CREATE_NOTE_SAVE": "CREATE_NOTE",
    "ANNOTATION_CREATE_HIGHLIGHT": "CREATE_HIGHLIGHT",
    "ANNOTATION_OPEN": "READ_ANNOTATION",
    "ANNOTATION_CLOSE": "CLOSE_ANNOTATION",
    "ANNOTATION_CLICK": "READ_ANNOTATION",
    "ANNOTATION_SELECT_TEXT": "READ_ANNOTATION",

    "ANNOTATION_SAVE_LABEL": "LABEL_ANNOTATION",
    "ANNOTATION_DELETE_LABEL": "LABEL_ANNOTATION",
    "ANNOTATION_LABEL_INPUT_FOCUS": "LABEL_ANNOTATION",
    "ANNOTATION_LABEL_INPUT_BLUR": "LABEL_ANNOTATION",
    "ANNOTATION_WRITE_LABEL": "LABEL_ANNOTATION",

    "ANNOTATION_EDIT": "EDIT_ANNOTATION",
    "ANNOTATION_EDIT_NOTE_SAVE": "EDIT_ANNOTATION",
    "ANNOTATION_CANCEL_EDIT": "EDIT_ANNOTATION",
    "ANNOTATION_DELETE": "DELETE_ANNOTATION",
    "ANNOTATION_EDIT_CLICK": "EDIT_ANNOTATION",
    "ANNOTATION_EDIT_SELECT_TEXT": "EDIT_ANNOTATION",


    "PLANNER_OPEN": "OPEN_PLANNER",
    "PLANNER_CLOSE": "CLOSE_PLANNER",
    "PLANNER_READ_PLANNER_CLICK": "READ_PLANNER",
    "PLANNER_READ_PLANNER_SELECT_TEXT": "READ_PLANNER",
    "PLANNER_CREATE_PLANNER_CLICK": "CREATE_PLANNER",
    "PLANNER_CREATE_PLANNER_SELECT_TEXT": "CREATE_PLANNER",
    "PLANNER_SELECT_LEARNING_STRATEGY": "CREATE_PLANNER",
    "PLANNER_SELECT_STEP2": "CREATE_PLANNER",
    "PLANNER_CREATE_TIME_INPUT": "CREATE_PLANNER",
    "PLANNER_SELECT_STEP3": "CREATE_PLANNER",
    "PLANNER_CREATE_ADD_CUSTOMISED_ITEM": "CREATE_PLANNER",
    "PLANNER_CREATE_DELETE_CUSTOMISED_ITEM": "CREATE_PLANNER",
    "PLANNER_CANCEL_CREATE": "CREATE_PLANNER",
    "PLANNER_EDIT_PLANNER_CLICK": "EDIT_PLANNER",
    "PLANNER_EDIT_PLANNER_SELECT_TEXT": "EDIT_PLANNER",
    "PLANNER_EDIT_TIME_INPUT": "EDIT_PLANNER",
    "PLANNER_EDIT_ADD_CUSTOMISED_ITEM": "EDIT_PLANNER",
    "PLANNER_EDIT_DELETE_CUSTOMISED_ITEM": "EDIT_PLANNER",
    "PLANNER_CANCEL_EDIT": "EDIT_PLANNER",
    "PLANNER_EDIT": "EDIT_PLANNER",
    "PLANNER_SAVE": "SAVE_PLANNER",


    "SCAFFOLD_OPEN": "OPEN_SCAFFOLD",
    "SCAFFOLD_CLOSE": "CLOSE_SCAFFOLD",
    "SCAFFOLD_CHECK_SUGGESTION": "INTERACT_SCAFFOLD",
    "SCAFFOLD_UNCHECK_SUGGESTION": "INTERACT_SCAFFOLD",
    "SCAFFOLD_CHANGE_SCAFFOLD_PANEL": "INTERACT_SCAFFOLD",
    "SCAFFOLD_CREATE_SCAFFOLD_TODOLIST": "INTERACT_TODOLIST",
    "SCAFFOLD_CHECK_TODO_ITEM": "INTERACT_TODOLIST",
    "SCAFFOLD_UNCHECK_TODO_ITEM": "INTERACT_TODOLIST",
    "SCAFFOLD_FORCE_DISPLAY_SCAFFOLD": "DISPLAY_SCAFFOLD",
    "SCAFFOLD_SHOW_ALERT_MESSAGE_SCAFFOLD": "DISPLAY_SCAFFOLD",
    "SCAFFOLD_PATTERN_DETECTED_SCAFFOLD": "DISPLAY_SCAFFOLD",
    // "SCAFFOLD_CHECKING_PROCESS_LABEL": "DISPLAY_SCAFFOLD",
    "SCAFFOLD_CLICK": "READ_SCAFFOLD",
    "SCAFFOLD_SELECT_TEXT": "READ_SCAFFOLD",


    "CHATGPT_OPEN": "OPEN_GPT",
    "CHATGPT_CLOSE": "CLOSE_GPT",
    "CHATGPT_CLICK": "READ_FEEDBACK_GPT",
    "CHATGPT_SELECT_TEXT": "READ_FEEDBACK_GPT",
    "CHATGPT_SUBMIT_QUESTION": "ASK_GPT",
    "CHATGPT_WRITE_QUESTION": "ASK_GPT",
    "CHATGPT_CHANGE_INPUT_LINE": "ASK_GPT",
    "CHATGPT_RATING_STAR_FEEDBACK": "RATING_STAR_FEEDBACK_GPT",
    "CHATGPT_RATING_THUMBS_FEEDBACK": "RATING_THUMBS_FEEDBACK_GPT",
    "CHATGPT_RE_GENERATE_ANSWER": "RE_ASK_GPT",


    "DICTIONARY_OPEN": "OPEN_DICTIONARY",
    "DICTIONARY_CLOSE": "CLOSE_DICTIONARY",
    "DICTIONARY_CLICK": "DICTIONARY",
    "DICTIONARY_SELECT_TEXT": "DICTIONARY",
    "DICTIONARY_SUBMIT_WORD": "DICTIONARY",
    "DICTIONARY_WRITE_WORD": "DICTIONARY",


    "CHATTEACHER_OPEN": "OPEN_CHATTEACHER",
    "CHATTEACHER_CLOSE": "CLOSE_CHATTEACHER",
    "CHATTEACHER_CLICK": "READ_FEEDBACK_CHATTEACHER",
    "CHATTEACHER_SELECT_TEXT": "READ_FEEDBACK_CHATTEACHER",
    "CHATTEACHER_CHANGE_INPUT_LINE": "ASK_CHATTEACHER",
    "CHATTEACHER_SUBMIT_QUESTION": "ASK_CHATTEACHER",
    "CHATTEACHER_WRITE_QUESTION": "ASK_CHATTEACHER",
    "CHATTEACHER_RATING_STAR_FEEDBACK": "RATING_STAR_FEEDBACK_CHATTEACHER",
    "CHATTEACHER_RATING_THUMBS_FEEDBACK": "RATING_THUMBS_FEEDBACK_CHATTEACHER",


    "CHECKLIST_OPEN": "OPEN_CHECKLIST",
    "CHECKLIST_CLOSE": "CLOSE_CHECKLIST",
    "CHECKLIST_CLICK": "READ_CHECKLIST",
    "CHECKLIST_CLICK_BASIC": "READ_BASIC_CHECKLIST",
    "CHECKLIST_SELECT_TEXT_BASIC": "READ_BASIC_CHECKLIST",
    "CHECKLIST_CLICK_ACADEMIC": "READ_ACADEMIC_CHECKLIST",
    "CHECKLIST_SELECT_TEXT_ACADEMIC": "READ_ACADEMIC_CHECKLIST",
    "CHECKLIST_CLICK_ORIGINALITY": "READ_ORIGINALITY_CHECKLIST",
    "CHECKLIST_SELECT_TEXT_ORIGINALITY": "READ_ORIGINALITY_CHECKLIST",
    "CHECKLIST_CLICK_INTEGRATION": "READ_BLOOM_CHECKLIST",
    "CHECKLIST_SELECT_TEXT_INTEGRATION": "READ_BLOOM_CHECKLIST",
    "CHECKLIST_CHANGE_TO_BASIC_WRITING": "READ_BASIC_CHECKLIST",
    "CHECKLIST_CHANGE_TO_ACADEMIC_WRITING": "READ_ACADEMIC_CHECKLIST",
    "CHECKLIST_CHANGE_TO_ORIGINALITY": "READ_ORIGINALITY_CHECKLIST",
    "CHECKLIST_CHANGE_TO_INTEGRATION": "READ_BLOOM_CHECKLIST",
    "CHECKLIST_ANALYSE_BASIC": "ANALYSE_BASIC_CHECKLIST",
    "CHECKLIST_ANALYSE_ACADEMIC": "ANALYSE_ACADEMIC_CHECKLIST",
    "CHECKLIST_ANALYSE_ORIGINALITY": "ANALYSE_ORIGINALITY_CHECKLIST",
    "CHECKLIST_ANALYSE_INTEGRATION": "ANALYSE_BLOOM_CHECKLIST",


    "PAGE_CHANGE_PAGE_CLICK_READING": "READING",
    "PAGE_CHANGE_PAGE_CLICK_PAGE_NAVIGATION": "PAGE_NAVIGATION",

    "EXTRA_BODY_CLICK_READING": "READING",
    "EXTRA_BODY_CLICK_PAGE_NAVIGATION": "PAGE_NAVIGATION",
    "EXTRA_SELECT_TEXT_PAGE_NAVIGATION": "PAGE_NAVIGATION",
    "EXTRA_SELECT_TEXT_READING": "READING",

    "CHATGPT_SCAFFOLD_OPEN": "OPEN_GPT_SCAFFOLD",
    "CHATGPT_SCAFFOLD_CLOSE": "CLOSE_GPT_SCAFFOLD",
    "CHATGPT_SCAFFOLD_SELECT_TEXT": "READ_GPT_SCAFFOLD",
    "CHATGPT_SCAFFOLD_CLICK": "READ_GPT_SCAFFOLD",
    "CHATGPT_SCAFFOLD_CHATGPT_SCAFFOLD_TRIGGERED": "READ_GPT_SCAFFOLD",
    "CHATGPT_SCAFFOLD_CHATGPT_SCAFFOLD_RECEIVED": "READ_GPT_SCAFFOLD",
    "CHATGPT_SCAFFOLD_CHATGPT_SCAFFOLD_FORCE_VIEW": "READ_GPT_SCAFFOLD",

    "CHATGPT_MULTI_AGENTS_SINGLE_WINDOW_OPEN": "OPEN_MULTI_AGENTS",
    "CHATGPT_MULTI_AGENTS_SINGLE_WINDOW_CLOSE": "CLOSE_MULTI_AGENTS",
    "CHATGPT_MULTI_AGENTS_SINGLE_WINDOW_CLICK": "READ_FEEDBACK_MULTI_AGENTS",
    "CHATGPT_MULTI_AGENTS_SINGLE_WINDOW_SELECT_TEXT": "READ_FEEDBACK_MULTI_AGENTS",
    "CHATGPT_MULTI_AGENTS_SINGLE_WINDOW_SUBMIT_QUESTION": "ASK_MULTI_AGENTS",
    "CHATGPT_MULTI_AGENTS_SINGLE_WINDOW_WRITE_QUESTION": "ASK_MULTI_AGENTS",
    "CHATGPT_MULTI_AGENTS_SINGLE_WINDOW_SELECT_AGENT": "ASK_MULTI_AGENTS",

    "CHATGPT_MULTI_AGENTS_MULTI_WINDOWS_OPEN": "OPEN_ONE_AGENT",
    "CHATGPT_MULTI_AGENTS_MULTI_WINDOWS_CLOSE": "CLOSE_ONE_AGENT",
    "CHATGPT_MULTI_AGENTS_MULTI_WINDOWS_CLICK": "READ_FEEDBACK_ONE_AGENT",
    "CHATGPT_MULTI_AGENTS_MULTI_WINDOWS_SELECT_TEXT": "READ_FEEDBACK_ONE_AGENT",
    "CHATGPT_MULTI_AGENTS_MULTI_WINDOWS_SUBMIT_QUESTION": "ASK_ONE_AGENT",
    "CHATGPT_MULTI_AGENTS_MULTI_WINDOWS_WRITE_QUESTION": "ASK_ONE_AGENT",
    "CHATGPT_MULTI_AGENTS_MULTI_WINDOWS_SELECT_AGENT": "ASK_ONE_AGENT",
    "CHATGPT_MULTI_AGENTS_MULTI_WINDOWS_INPUT_LINE": "ASK_ONE_AGENT",




    // assistant part
    "CHATGPT_ASSISTANT_OPEN": "OPEN_GPT_ASSISTANT",
    "CHATGPT_ASSISTANT_CLOSE": "CLOSE_GPT_ASSISTANT",
    "CHATGPT_ASSISTANT_CLICK": "READ_FEEDBACK_GPT_ASSISTANT",
    "CHATGPT_ASSISTANT_SELECT_TEXT": "READ_FEEDBACK_GPT_ASSISTANT",
    "CHATGPT_ASSISTANT_SUBMIT_QUESTION": "ASK_GPT_ASSISTANT",
    "CHATGPT_ASSISTANT_WRITE_QUESTION": "ASK_GPT_ASSISTANT",
    "CHATGPT_ASSISTANT_CHANGE_INPUT_LINE": "ASK_GPT_ASSISTANT",
    "CHATGPT_ASSISTANT_RATING_STAR_FEEDBACK": "RATING_STAR_FEEDBACK_GPT_ASSISTANT",
    "CHATGPT_ASSISTANT_RATING_THUMBS_FEEDBACK": "RATING_THUMBS_FEEDBACK_GPT_ASSISTANT",
    "CHATGPT_ASSISTANT_RE_GENERATE_ANSWER": "RE_ASK_GPT_ASSISTANT",


    "CHATGPT_ASSISTANT_TEACHER_OPEN": "OPEN_GPT_ASSISTANT_TEACHER",
    "CHATGPT_ASSISTANT_TEACHER_CLOSE": "CLOSE_GPT_ASSISTANT_TEACHER",
    "CHATGPT_ASSISTANT_TEACHER_CLICK": "READ_FEEDBACK_GPT_ASSISTANT_TEACHER",
    "CHATGPT_ASSISTANT_TEACHER_SELECT_TEXT": "READ_FEEDBACK_GPT_ASSISTANT_TEACHER",
    "CHATGPT_ASSISTANT_TEACHER_SUBMIT_QUESTION": "ASK_GPT_ASSISTANT_TEACHER",
    "CHATGPT_ASSISTANT_TEACHER_WRITE_QUESTION": "ASK_GPT_ASSISTANT_TEACHER",
    "CHATGPT_ASSISTANT_TEACHER_CHANGE_INPUT_LINE": "ASK_GPT_ASSISTANT_TEACHER",
    "CHATGPT_ASSISTANT_TEACHER_RATING_STAR_FEEDBACK": "RATING_STAR_FEEDBACK_GPT_ASSISTANT_TEACHER",
    "CHATGPT_ASSISTANT_TEACHER_RATING_THUMBS_FEEDBACK": "RATING_THUMBS_FEEDBACK_GPT_ASSISTANT_TEACHER",
    "CHATGPT_ASSISTANT_TEACHER_RE_GENERATE_ANSWER": "RE_ASK_GPT_ASSISTANT_TEACHER",

    "CHATGPT_ASSESSMENT_OPEN": "OPEN_GPT_ASSESSMENT",
    "CHATGPT_ASSESSMENT_CLOSE": "CLOSE_GPT_ASSESSMENT",
    "CHATGPT_ASSESSMENT_CLICK": "READ_FEEDBACK_GPT_ASSESSMENT",
    "CHATGPT_ASSESSMENT_SELECT_TEXT": "READ_FEEDBACK_GPT_ASSESSMENT",
    "CHATGPT_ASSESSMENT_SUBMIT_QUESTION": "ASK_GPT_ASSESSMENT",
    "CHATGPT_ASSESSMENT_WRITE_QUESTION": "ASK_GPT_ASSESSMENT",
    "CHATGPT_ASSESSMENT_CHANGE_INPUT_LINE": "ASK_GPT_ASSESSMENT",
    "CHATGPT_ASSESSMENT_FINISH_CONSULTATION": "ASK_GPT_ASSESSMENT",

    "COLLABORATIVE_ESSAY_OPEN": "OPEN_WRITE_COLLABORATIVE_ESSAY",
    "COLLABORATIVE_ESSAY_WRITE": "WRITE_COLLABORATIVE_ESSAY",
    "COLLABORATIVE_ESSAY_DELETE": "WRITE_COLLABORATIVE_ESSAY",
    "COLLABORATIVE_ESSAY_OTHER_DELETE": "WRITE_COLLABORATIVE_ESSAY",
    "COLLABORATIVE_ESSAY_FOCUS": "WRITE_COLLABORATIVE_ESSAY",
    "COLLABORATIVE_ESSAY_SELECT_TEXT": "WRITE_COLLABORATIVE_ESSAY",

    "COLLABORATIVE_ESSAY_CHANGE_STYLE": "WRITE_COLLABORATIVE_ESSAY",
    "COLLABORATIVE_ESSAY_CHECK_WORD_COUNT": "CHECK_COLLABORATIVE_WORD_COUNT",

    "COLLABORATIVE_ESSAY_CHAT_OPEN": "OPEN_COLLABORATIVE_ESSAY_CHAT",
    "COLLABORATIVE_ESSAY_CHAT_CLOSE": "CLOSE_COLLABORATIVE_ESSAY_CHAT",
    "COLLABORATIVE_ESSAY_CHAT_PASTE": "WRITE_COLLABORATIVE_ESSAY_CHAT",

    "CHATGPT_ASSISTANT_MAYOR_OPEN": "OPEN_GPT_ASSISTANT_MAYOR",
    "CHATGPT_ASSISTANT_MAYOR_CLOSE": "CLOSE_GPT_ASSISTANT_MAYOR",
    "CHATGPT_ASSISTANT_MAYOR_CLICK": "READ_FEEDBACK_GPT_ASSISTANT_MAYOR",
    "CHATGPT_ASSISTANT_MAYOR_SELECT_TEXT": "READ_FEEDBACK_GPT_ASSISTANT_MAYOR",
    "CHATGPT_ASSISTANT_MAYOR_SUBMIT_QUESTION": "ASK_GPT_ASSISTANT_MAYOR",
    "CHATGPT_ASSISTANT_MAYOR_WRITE_QUESTION": "ASK_GPT_ASSISTANT_MAYOR",
    "CHATGPT_ASSISTANT_MAYOR_CHANGE_INPUT_LINE": "ASK_GPT_ASSISTANT_MAYOR",
    "CHATGPT_ASSISTANT_MAYOR_RATING_STAR_FEEDBACK": "RATING_STAR_FEEDBACK_GPT_ASSISTANT_MAYOR",
    "CHATGPT_ASSISTANT_MAYOR_RATING_THUMBS_FEEDBACK": "RATING_THUMBS_FEEDBACK_GPT_ASSISTANT_MAYOR",
    "CHATGPT_ASSISTANT_MAYOR_RE_GENERATE_ANSWER": "RE_ASK_GPT_ASSISTANT_MAYOR",

    "POPUP_QUESTIONNAIRE_CLICK": "READ_POPUP_QUESTIONNAIRE",
    "POPUP_QUESTIONNAIRE_SELECT_TEXT": "READ_POPUP_QUESTIONNAIRE",
}


let myGeneralToastDiv = document.querySelector("#my-general-toast");
let toastOptions = {delay: 2000};
let myGeneralToast = new bootstrap.Toast(myGeneralToastDiv, toastOptions);


function updateMyGeneralToastText(titleText, bodyText) {
    const toastTitle = myGeneralToastDiv.querySelector('.toast-header strong');
    const toastBody = myGeneralToastDiv.querySelector('.toast-body');
    toastTitle.textContent = titleText;
    toastBody.textContent = bodyText;
}
//------------------------------------------------------------------------------------

let pageContent = document.querySelector("#page-content");
let leftSideNavigationDiv = document.querySelector("#theme_boost-drawers-courseindex");
let pageEventWebSocketMaxRetryTime = 5;
let pageEventWebSocketRetryCnt = 0;


const IDLE_THRESHOLD = 300_000;     // 判定空闲的时间（60 秒）
let idleTimerId = null;       // setTimeout 句柄
let isIdle = false;      // 当前是否处于空闲状态
let idleStart = 0;           // 本段空闲开始的时间戳
let totalIdleTime = 0;           // 累计空闲时长（毫秒）

let mousemoveData = [];
let mousewheelData = [];
let mousePosition = "";

function handleClassMutation(target, callback) {
    // 创建一个观察器实例
    const observer = new MutationObserver(mutations =>  {
        mutations.forEach(mutation => {
            // console.log("=---------------------------------------------------handleClassMutation");
            // console.log(target.id);
            if (target.id === 'offcanvasRightNotesDiv') {
                if (mutation.attributeName === 'class') {
                    if (target.classList.contains('show')) {
                        callback(true, target);
                    } else {
                        callback(false, target);
                    }
                }
            } else {
                if (mutation.attributeName === 'class') {
                    if (target.classList.contains('in-tools')) {
                        callback(true, target);
                    } else {
                        callback(false, target);
                    }
                }
            }
        });
    });

    // 配置观察器
    const config = {
        attributes: true,
        attributeFilter: ['class']
    };

    // 开始观察目标元素
    observer.observe(target, config);
}

function hideOtherTools(element) {
    toolList1.forEach((c) => {
            if (c !== element) {
                c.classList.remove("in-tools");
                c.classList.remove("in-tools-move-left")
                c.classList.remove("in-tools-move-more-left")
            }
        }
    );
}

// used for essay writing and other tools
// collapseChatgpt, collapseTeacherChat, collapseDicionary, collapseChecklist
function toolsAndEssayToggle(tool) {
    if (tool.classList.contains("in-tools")) {
        hideOtherTools(tool);
        if (typeof collapseWriteEssay !== 'undefined' && collapseWriteEssay.classList.contains("in-tools")) {
            collapseWriteEssay.classList.replace("in-tools", "in-tools-move-left");
        }
        if (typeof collapseToeflAssistant !== 'undefined' && collapseToeflAssistant.classList.contains("in-tools") && tool !== collapseToeflAssistant) {
            collapseToeflAssistant.classList.replace("in-tools", "in-tools-move-left");
        }

    } else {
        if (typeof collapseWriteEssay !== 'undefined' && collapseWriteEssay.classList.contains("in-tools-move-left")) {
            collapseWriteEssay.classList.replace("in-tools-move-left", "in-tools");
        }
        if (typeof collapseToeflAssistant !== 'undefined' && collapseToeflAssistant.classList.contains("in-tools-move-left") && tool !== collapseToeflAssistant) {
            collapseToeflAssistant.classList.replace("in-tools-move-left", "in-tools");
        }

    }
}

let username = null;
let firstname = null;
let lastname = null;

let userColor = null;
let writeType = "essay-writing";
const ESSAY_WRITING = "essay-writing";
const COLLABORATE_WRITE = "collaborate-write";
let userIdContainer = document.querySelector("#nav-notification-popover-container");
let userId = (userIdContainer === null || userIdContainer.dataset.userid === null) ? 0 : userIdContainer.dataset.userid;

let offTaskStartTime = 0;

let myUserEnterPageTimestamp = new Date().getTime();
let pageStayTimeGreaterThan6Second = false;
let allEventsDataBefore6Second = [];

// function generateMouseWheelData(e) { return e.target.nodeName + "#" + (e.target.id === null || e.target.id === "" ? "NO_ID" : e.target.id) + ":::" + e.deltaY + ":::" + e.screenX + ":::" + e.screenY + ":::" + e.clientX + ":::" + e.clientY + ":::" + target + ":::" + getCurrentTimestamp(); }

function removeMarkdown(text) {
    // Remove Markdown headers
    text = text.replace(/^\s*#{1,6}\s+/gm, '');

    // Remove bold and italic
    text = text.replace(/\*\*(.*?)\*\*/g, '$1');
    text = text.replace(/\*(.*?)\*/g, '$1');
    text = text.replace(/__(.*?)__/g, '$1');
    text = text.replace(/_(.*?)_/g, '$1');

    // Remove inline code
    text = text.replace(/`(.*?)`/g, '$1');

    // Remove links
    text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

    return text;
}

//function generateMousePositionData(e, subAction, action) { return e.target.nodeName + "#" + (e.target.id === null || e.target.id === "" ? "NO_ID" : e.target.id) + ":::" + e.screenX + ":::" + e.screenY + ":::" + e.clientX + ":::" + e.clientY + ":::" + subAction + ":::" + action + ":::" + getCurrentTimestamp(); }
function generateMultiAgentMousePositionData(e, subAction, action, targetObject) { return targetObject + ":::" + e.screenX + ":::" + e.screenY + ":::" + e.clientX + ":::" + e.clientY + ":::" + subAction + ":::" + action + ":::" + getCurrentTimestamp(); }
//=======
function generateMousePositionData(e, subAction, action) {
    return e.target.nodeName + "#" +
    (e.target.id === null || e.target.id === "" ? "NO_ID" : e.target.id) +
    ":::" + e.screenX + ":::" + e.screenY + ":::" + e.clientX + ":::" + e.clientY + ":::" +
    subAction + ":::" + action + ":::" + getCurrentTimestamp();
}


function getCurrentTimestamp() {
    return new Date().getTime();
}
// console.log("Outside stopEventPropagation")
function stopEventPropagation(e) {
// console.log("Inside stopEventPropagation")
    if (!e) var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
}

function getUsername() {
    // return document.querySelector("#page-footer a[title='View profile']").innerHTML.trim();
    return document.querySelector("#page-footer div.logininfo>div.logininfo a").innerHTML.trim();
}

function getFirstname() {
    return getUsername().split(" ")[0];
}

function getLastname() {
    return getUsername().split(" ")[1];
}

function getCurrentUrl() {
    return window.location.href.replace(/#.*/, "").replace(/&.*/, "");
}

// 转义 html 字符工具函数
function escapeHTML(unsafeText) {
    const div = document.createElement('div');
    div.textContent = unsafeText;
    return div.innerHTML;
}

// 限制输入框字数工具
function limitInputWordCount(input, maxLength) {
    input.addEventListener("input", function() {
        if (input.value.length > maxLength) {
            alert("The maximum length is " + maxLength + " characters.");
            input.value = input.value.slice(0, maxLength);
        }
    });
}


function pageEventWebSocketInit() {
    //console.log("All Event Init websocket", websocketApiBaseUrl + "/ws/page-event?userId=" + userId + "&courseId=" + currentCourseId + "&isEvent=true");
    // 路径定义在WebSocketConfig 中, 每个学生userId 都不同,老师的userId可以固定
    eventWebsocket = new WebSocket(websocketApiBaseUrl + "/ws/page-event?userId=" + userId + "&courseId=" + currentCourseId + "&isEvent=true");

    //成功建立连接
    eventWebsocket.onopen = function () {
        console.log("User ", userId, "connected to server success");
    };
    //接收到消息
    eventWebsocket.onmessage = function (event) {

    };
    //连接发生错误
    eventWebsocket.onerror = function () {
        // alert("WebSocket connection error");
        console.log("WebSocket connection error");
    };
    //连接关闭
    eventWebsocket.onclose = function () {
        console.log("WebSocket connection close");
        pageEventWebSocketRetryCnt = 0;
    };
}


function teacherChatWebSocketInit() {
    console.log("Student Init websocket", websocketApiBaseUrl + "/ws/teacher-chat?userId=" + senderId);
    // 路径定义在WebSocketConfig 中, 每个学生userId 都不同,老师的userId可以固定
    teacherChatWebsocket = new WebSocket(websocketApiBaseUrl + "/ws/teacher-chat?userId=" + senderId);

    //成功建立连接
    teacherChatWebsocket.onopen = function () {
        console.log("Student", senderId, "connected to server success");
        wsStatusDiv.classList.add('online');
        sendTeacherChatMessage(senderId, `student ${senderId} connect to server success`, receiverId, "init");
    };
    //接收到消息
    teacherChatWebsocket.onmessage = function (event) {
        const jsonObj = JSON.parse(event.data);
        let messageType = jsonObj['status'];
        if (messageType === "conversation") {
            let teacherAnswer = jsonObj['senderMessage'];
            const timestamp = new Date().toLocaleTimeString();
            let replyHtml = generateAnswerHtml(teacherAnswer, timestamp);
            typeStatusEl.textContent = "";
            $(chatTeacherTextarea).append(replyHtml);
            $(chatTeacherTextarea).scrollTop(chatTeacherTextarea.scrollHeight);
        } else if (messageType === "focus") {
            // do focus things
            typeStatusEl.textContent = "Teacher is typing..."
        } else if (messageType === "unfocus") {
            typeStatusEl.textContent = "";
        } else if (messageType === "heartbeat") {
            lastHeartbeatReceivedTime = Date.now();
            teacherStatusDiv.classList.add("online");
        } else if (messageType === "close") {
            teacherStatusDiv.classList.remove("online");
        }
    };
    //连接发生错误
    teacherChatWebsocket.onerror = function () {
        console.error("WebSocket connection error");
    };
    //连接关闭
    teacherChatWebsocket.onclose = function () {
        console.log("WebSocket connection close");
        wsStatusDiv.classList.remove('online');
        teacherStatusDiv.classList.remove('online');
        clearInterval(heartbeatInterval);
        clearInterval(checkConnectionInterval);
        retryCnt = 0;
    };
    //监听窗口关闭事件，当窗口关闭时，主动关闭websocket连接
    // window.onbeforeunload = function () {
    //     sendMessage(senderId, "Student closed webpage", receiverId, "close");
    //     websocket.close();
    // };

    // Send a heartbeat message every 1 second
    const heartbeatInterval = setInterval(() => {
        if (teacherChatWebsocket.readyState === WebSocket.OPEN) {

            sendTeacherChatMessage(senderId, "heartbeat", receiverId, "heartbeat");
        }
    }, heartbeatIntervalMs);

    // Check if the connection is still alive at regular intervals
    const checkConnectionInterval = setInterval(() => {
        const currentTime = Date.now();
        if (currentTime - lastHeartbeatReceivedTime > 5 * heartbeatIntervalMs) {
            // Update the status <div> to indicate that the connection is offline
            teacherStatusDiv.classList.remove('online');
        }
    }, 1000);
}

function sendTeacherChatMessage(senderId, message, receiverId, status) {
    const messageObj = {
        "senderMessage": message,
        "status": status,
        "senderId": senderId,
        "receiverId": receiverId,
        "courseId": currentCourseId
    };
    if (message.length) {
        if (teacherChatWebsocket.readyState === WebSocket.OPEN) {
            teacherChatWebsocket.send(JSON.stringify(messageObj));
        } else if (teacherChatWebsocket.readyState === WebSocket.CONNECTING) {
            setTimeout(sendTeacherChatMessage, 1000, senderId, message, receiverId, status);
        } else if (teacherChatWebsocket.readyState === WebSocket.CLOSED) {
            if (retryCnt < maxRetryTime) {
                retryCnt ++;
                teacherChatWebSocketInit();
                teacherChatWebsocket.addEventListener("open", () => {
                    sendTeacherChatMessage(senderId, message, receiverId, status);
                });
            } else {
                alert('Message could not be sent. Please check your network status and reload the page.');
            }
        }
    }
}

function sendMyMessage(messageObj) {
    if (eventWebsocket.readyState === WebSocket.OPEN) {
        eventWebsocket.send(JSON.stringify(messageObj));
    } else if (eventWebsocket.readyState === WebSocket.CONNECTING) {
        setTimeout(sendMyMessage, 1000, messageObj);
    } else if (eventWebsocket.readyState === WebSocket.CLOSED) {
        if (pageEventWebSocketRetryCnt < pageEventWebSocketMaxRetryTime) {
            pageEventWebSocketRetryCnt++;
            pageEventWebSocketInit();
            eventWebsocket.addEventListener("openPageEvent", () => {
                sendMyMessage(messageObj);
            });
        } else {
            alert('Message could not be sent. Please check your network status and reload the page.');
        }
    }
}

function sendEventMessage(targetUrl, saveTime, source, pageEvent, subAction, action, targetObject, instantEvent, eventValue, e) {
    let receiverId = "000"; //this is not used, just a placeholder

    if (apiBaseUrl !== "http://localhost:8080") {
        userId = userIdContainer.dataset.userid;
    }
    username = username == null ? getUsername() : username;
    firstname = firstname == null ? getFirstname() : firstname;
    lastname = lastname == null ? getLastname() : lastname;

    let screenX = "NO_SCREEN_X";
    let screenY = "NO_SCREEN_Y";
    let clientX = "NO_CLIENT_X";
    let clientY = "NO_CLIENT_Y";
    if (e != null) {
        //console.log("event e: ", e)
        if (targetObject == null) {
            targetObject = e.target.nodeName + "#" + (e.target.id === null || e.target.id === "" ? "NO_ID" : e.target.id);
        }
        screenX = e.screenX;
        screenY = e.screenY;
        clientX = e.clientX;
        clientY = e.clientY;
    }

    if (instantEvent === 'undefined' || instantEvent === null) {
        instantEvent = "NULL_INSTANT_EVENT";
    }

    let messageObj = {

        "userId": userId,
        "saveTime": saveTime,
        "url": getCurrentUrl(),
        "username": username,
        "firstname": firstname,

        "lastname": lastname,
        "source": source,
        "pageEvent": pageEvent,
        "targetObject": targetObject,
        "instantEvent": instantEvent,
        "screenX": screenX,
        "screenY": screenY,
        "clientX": clientX,
        "clientY": clientY,


        "windowInnerWidth": window.innerWidth,
        "windowInnerHeight": window.innerHeight,
        "screenWidth": window.screen.width,
        "screenHeight": window.screen.height,
        "eventValue": eventValue,

        "modelType": srlModel,

        "subActionLabel": subAction,
        "actionLabel": action,
        "courseId": currentCourseId
    };

    // TODO 需要测试 (bugs come out when no instantEvant)
    // console.log("messageObj.instantEvent: ", messageObj.instantEvent)
    //console.log("@@@@messageObj sent inside sendMyMessage: ", messageObj);
    if (messageObj.actionLabel === "START" || messageObj.actionLabel === "END") {
        //直接发送给服务器
        // console.log("messageObj.actionLabel: ",messageObj.actionLabel)
        sendMyMessage(messageObj);
    }
    else if (messageObj.instantEvent!=null && messageObj.instantEvent === "LEAVE_PAGE") {
        //直接发送给服务器
        sendMyMessage(messageObj);
    }
    else if (messageObj.instantEvent!=null && messageObj.instantEvent.startsWith("CHANGE_PAGE_CLICK_")) {
        sendMyMessage(messageObj);
        //不在window.beforeunload 中执行，因为可能出现不执行的现象
        if (allEventsDataBefore6Second.length !== 0) {
            allEventsDataBefore6Second.forEach(tmpMessageObj => {
                if (tmpMessageObj.subActionLabel === "PAGE_NAVIGATION") {
                    tmpMessageObj.subActionLabel = "PAGE_NAVIGATION";
                    tmpMessageObj.actionLabel = "NAVIGATION";
                }
                sendMyMessage(tmpMessageObj);
            });
            // allEventsDataBefore6Second = [];
        }
    }
    // else if (!pageStayTimeGreaterThan6Second) {
    //     //存入缓存
    //     allEventsDataBefore6Second.push(messageObj);
    // }
    else {
        //直接发送给服务器
        sendMyMessage(messageObj);
    }
}
// /* check if a sessionID under a path*/
// function getCookieValue(name, path) {
//     // Split cookies into an array
//     const cookies = document.cookie.split(';');
//
//     // Iterate through each cookie
//     for (let cookie of cookies) {
//         cookie = cookie.trim(); // Remove any leading/trailing spaces
//
//     }
//

/* check if a sessionID under a path*/
// function getCookieValue(name, path) {
//     // Split cookies into an array
//     const cookies = document.cookie.split(';');
//
//     // Iterate through each cookie
//     for (let cookie of cookies) {
//         cookie = cookie.trim(); // Remove any leading/trailing spaces
//         // Check if this cookie starts with the name we are looking for
//         if (cookie.startsWith(name)) {
//             // Split the cookie into name and value parts
//             const cookieParts = cookie.split('=');
//             const cookieName = cookieParts[0];
//             const cookieValue = cookieParts.slice(1).join('=');
//
//             // Check if the cookie matches the name and path
//             if (cookieName === name) {
//                 // Additional check for path if specified
//                 if (!path || cookieValue.indexOf(`path=${path}`) !== -1) {
//                     // Extract the value of the cookie
//                     return cookieValue.split(';')[0];
//                 }
//             }
//         }
//     }
//
//     return null; // Return null if cookie is not found
// }

function setSessionCookie(sessionID, path) {
        // Construct cookie string without expiration date (session cookie)
        var cookieString = "sessionID=" + sessionID +
                           "; path=" + path;

        // Set the cookie
        document.cookie = cookieString;
}


//function getQuestionnaireResponse(userId, courseId){
//    console.log("REQUEST get-questionnaire-response!");
//    $.get(apiBaseUrl + "/get-questionnaire-response", {
//            courseId: courseId,
//            questionnaireName: "Goal Setting Questionnaire",
//            userId: 2,
//        }, function(data, status) {
//            if (status === "success") {
//                console.log("success getting questionnaire-response data: ", data);
//
//               }
//            })
//
//}

//const result = restructureData(data);
//console.log(JSON.stringify(result, null, 2));







// Function to add userId and courseId to each document
const addUserInfoToDocs = (docs, userId, courseId) => {
    return docs.map(doc => ({
        ...doc,
        userId: userId,
        courseId: courseId
    }));
};

// Add userId and courseId to the documents
//const updatedDocVOList = addUserInfoToDocs(backgroundDocVOList, userId, currentCourseId);

var updatedDocVOList = {
    userId: userId,
    courseId: currentCourseId,
    url: typeof backgroundDocVOList === 'undefined' ? '' : backgroundDocVOList.map(doc => doc.url),
    content: typeof backgroundDocVOList === 'undefined' ? '' : backgroundDocVOList.map(doc => doc.documentContent)
};


function createBackgroundDoc(){
    console.log("Ready to excute createBackgroundDoc");
    console.log("updatedDocVOList: ", backgroundDocVOList);
    console.log("createBackgroundDoc:", apiBaseUrl + "/save-backgroundDoc");
    $.ajax({
        url: apiBaseUrl + "/save-backgroundDoc",
        type: "POST",
        contentType: "application/x-www-form-urlencoded", // Change to URL-encoded
            //data: $.param(updatedDocVOList), // Serialize the data
        //contentType: "application/json",  // Set content type to JSON
        data: {
                  // Add your JSON data here
                  userId: userId,
                  courseId: currentCourseId,
                  url: backgroundDocVOList.map(doc => doc.url),
                  content: backgroundDocVOList.map(doc => doc.documentContent)
              },
        traditional: true,
        success: function(response) {
            console.log("Success:", response);
        },
        error: function(error) {
            console.error("Error:", error);
        }
    });
}
//createBackgroundDoc();


/* 入口函数 */
function initIdleTracker() {
    resetIdleTimer();                 // 启动首个计时器

    const EVENTS = [
        'mousemove','mousedown','mouseup',
        'wheel','scroll',
        'keydown','keyup',
        'touchstart','touchmove','pointermove',
        'visibilitychange','focus','blur'
    ];
    EVENTS.forEach(evt =>
        window.addEventListener(evt, resetIdleTimer, {passive:true})
    );

    /* 关闭 / 切换页面时，若仍处于空闲需补算时长 */
    // window.addEventListener('pagehide', settleIdleIfNeeded);
    // window.addEventListener('beforeunload', settleIdleIfNeeded);
}

/* ============ 计时逻辑 ============ */
function resetIdleTimer() {
    // 如果页面不可见，可按需忽略这次“活动”
    if (document.hidden) return;

    // 若当前是 idle → active，需要结算本段空闲时长
    if (isIdle) endIdlePeriod();

    clearTimeout(idleTimerId);
    idleTimerId = setTimeout(beginIdlePeriod, IDLE_THRESHOLD);
}

function beginIdlePeriod() {
    isIdle = true;
    idleStart = Date.now();
    console.log('[Idle] Start @', new Date(idleStart).toLocaleTimeString());
    // 这里可暂停轮询、停止动画等
    sendEventMessage("", getCurrentTimestamp(), "OFF_TASK", "NO_PAGE_EVENT", subActionLabelMap["OFF_TASK_OFF_TASK"], "OFF_TASK", "NO_TARGET_OBJECT", "OFF_TASK", "OFF_TASK_OVER_300_SECONDS", null);
}

function endIdlePeriod() {
    isIdle = false;
    const duration = Date.now() - idleStart;
    totalIdleTime += duration;
    console.log(`[Idle] End   (+${ms2str(duration)})   Σ=${ms2str(totalIdleTime)}`);
    idleStart = 0;
    // 这里可恢复轮询、重新校时等
    sendEventMessage("", getCurrentTimestamp(), "OFF_TASK", "NO_PAGE_EVENT", subActionLabelMap["OFF_TASK_OFF_TASK"], "OFF_TASK", "NO_TARGET_OBJECT", "OFF_TASK", `OFF_TASK_LENGTH:::${duration}`, null);
}

/* 如果用户在空闲中直接离开页面，需要把这段算进去 */
function settleIdleIfNeeded() {
    if (isIdle) endIdlePeriod();
}
/* ============ 工具函数 ============ */
function ms2str(ms) {
    const sec = Math.floor(ms / 1000) % 60;
    const min = Math.floor(ms / 60000) % 60;
    const hr  = Math.floor(ms / 3600000);
    return `${hr}h ${min}m ${sec}s`;
}

/* ============ 对外 API ============ */
window.getTotalIdleTime = () => totalIdleTime;          // 返回毫秒
window.getTotalIdleTimeText = () => ms2str(totalIdleTime);

function setupExtraBodyEvent() {
    // setTimeout(function() {
    //
    //
    // }, 3001);

    let mybody = document.querySelector("body");

    mybody.onmousewheel = function(e) {
        // mousewheelData.push(generateMouseWheelData(e, "BODY")); //
        if (pageStayTimeGreaterThan6Second) {
            // mousewheelData.push(generateMouseWheelData(e, "READING")); //
            sendEventMessage("", getCurrentTimestamp(), "EXTRA", "MOUSE_WHEEL", "READING", "READING",null, "NO_INSTANT_EVENT", "SCROLL_DIST:::" + e.deltaY, e);
        } else {
            // mousewheelData.push(generateMouseWheelData(e, "PAGE_NAVIGATION")); //
            sendEventMessage("", getCurrentTimestamp(), "EXTRA", "MOUSE_WHEEL", "PAGE_NAVIGATION", "NAVIGATION",null, "NO_INSTANT_EVENT", "SCROLL_DIST:::" + e.deltaY, e);
        }

    };
    mybody.onmousemove = function(e) {
        // mousePosition = generateMousePositionData(e, "BODY");
        if (pageStayTimeGreaterThan6Second) {
            mousePosition = generateMousePositionData(e, "READING", "READING"); //需要在后台验证是否是 relevant reading / instruction
            // sendEventMessage("", getCurrentTimestamp(), "EXTRA", "MOUSE_MOVE", "", "READING",null, "NO_INSTANT_EVENT", "", e);
        } else {
            mousePosition = generateMousePositionData(e, "PAGE_NAVIGATION", "NAVIGATION");
            // sendEventMessage("", getCurrentTimestamp(), "EXTRA", "MOUSE_MOVE", "PAGE_NAVIGATION", "NAVIGATION",null, "NO_INSTANT_EVENT", "", e);
        }
    };
    mybody.onclick = function(e) {
        // console.log("body click");
        let currentTimestamp = getCurrentTimestamp();
        let suffix = "";
        let tempAction = "";
        if (pageStayTimeGreaterThan6Second) {
            suffix = "READING";
            tempAction = "READING";
        } else {
            suffix = "PAGE_NAVIGATION";
            tempAction = "NAVIGATION";
        }


        if (e.target.nodeName === "A") { //点击链接


            // console.log("click A----------------------------------");
            // console.log(e.target);

            if (e.target.dataset.for === 'section_title') { //表示点击的按钮是标题，不需要跳转
                sendEventMessage("", currentTimestamp, "EXTRA", "MOUSE_CLICK", "TABLE_OF_CONTENT", "NAVIGATION", null, "CLICK_SECTION_TITLE", "SECTION_TITLE:::" + e.target.innerText, e);
            } else {

                // sendMyTraceDataPost("/trace-page-click", currentTimestamp, "PAGE", "MOUSE_CLICK", null, "CHANGE_PAGE_CLICK" + suffix, "NEXT_PAGE_URL:::" + e.target.href, e);
                sendEventMessage("", currentTimestamp, "PAGE", "MOUSE_CLICK", subActionLabelMap["PAGE_" + "CHANGE_PAGE_CLICK_" + suffix], tempAction, null, "CHANGE_PAGE_CLICK_" + suffix, "NEXT_PAGE_URL:::" + e.target.href, e);


            }

        } else {
            // sendMyTraceDataPost("/trace-body-click", currentTimestamp, "EXTRA", "MOUSE_CLICK", null, "BODY_CLICK" + suffix, "", e); //当select text时候会触发，mouse down up click 事件
            sendEventMessage("", currentTimestamp, "EXTRA", "MOUSE_CLICK", subActionLabelMap["EXTRA_" + "BODY_CLICK_" + suffix], tempAction, null, "BODY_CLICK_" + suffix, "", e);
        }
    };
    mybody.onmouseup = function(e) {
        if (window.getSelection() != null && window.getSelection().toString().replace(/\n/g, '').length > 0) {
            // console.log("body mouseup:" + window.getSelection().toString());
            let selectText = window.getSelection().toString();

            let suffix;
            let tempAction = "";
            if (pageStayTimeGreaterThan6Second) {
                suffix = "READING";
                tempAction = "READING";
            } else {
                suffix = "PAGE_NAVIGATION";
                tempAction = "NAVIGATION";
            }
            // sendMyTraceDataPost("/trace-select-click", getCurrentTimestamp(), "EXTRA", "MOUSE_SELECT_TEXT", null, "SELECT_TEXT_" + suffix, "MOUSE_SELECT:::" + selectText, e);
            sendEventMessage("", getCurrentTimestamp(), "EXTRA", "MOUSE_SELECT_TEXT", subActionLabelMap["EXTRA_" + "SELECT_TEXT_" + suffix], tempAction, null, "SELECT_TEXT_" + suffix, "MOUSE_SELECT:::" + selectText, e);

            // console.log("send post for select text-------------------------------------" + selectText + "-------");
        }

    };


    mybody.addEventListener('copy',function(e) {
        console.log("on copy");
        let msg = window.getSelection().toString();
        e.clipboardData.setData("text", msg); //此处名称必须用text，其他会得到空值
        if (typeof hideAnnotationToolbox === "function") {
            hideAnnotationToolbox(); // 隐藏annotation toolbox，当点击其他按钮时候
        }
        // if (pageStayTimeGreaterThan6Second) {
            sendEventMessage("", getCurrentTimestamp(), "EXTRA", "COPY_TEXT", "READING", "READING",null, "NO_INSTANT_EVENT", "COPY_TEXT:::" + msg, e);
        // } else {
        //     sendEventMessage("", getCurrentTimestamp(), "EXTRA", "COPY_TEXT", "PAGE_NAVIGATION", "NAVIGATION",null, "NO_INSTANT_EVENT", "COPY_TEXT:::" + msg, e);
        // }
    });

    //记录所有滚轮事件
    // window.onmousewheel = function(e) {
    //     // console.log(e.deltaY); //deltaY大于0为下滚,deltaY小于0为上滚
    //     // console.log(getCurrentTimestamp());
    //     mousewheelData.push(e.target.nodeName + "#" + (e.target.id == null || e.target.id == "" ? "NO_ID" : e.target.id) + ":::" + e.deltaY + ":::" + e.screenX + ":::" + e.screenY + ":::" + e.clientX + ":::" + e.clientY + ":::" + getCurrentTimestamp());
    // };

    leftSideNavigationDiv.onmousewheel = function(e) {
        stopEventPropagation(e);
        // mousewheelData.push(generateMouseWheelData(e, "TABLE_OF_CONTENT", "NAVIGATION"));
        sendEventMessage("", getCurrentTimestamp(), "EXTRA", "MOUSE_WHEEL", "TABLE_OF_CONTENT", "NAVIGATION",null, "NO_INSTANT_EVENT", "SCROLL_DIST:::" + e.deltaY, e);
    };
    leftSideNavigationDiv.onmousemove = function(e) {
        stopEventPropagation(e);
        mousePosition = generateMousePositionData(e, "TABLE_OF_CONTENT", "NAVIGATION");
        // sendEventMessage("", getCurrentTimestamp(), "EXTRA", "MOUSE_MOVE", "TABLE_OF_CONTENT", "NAVIGATION",null, "NO_INSTANT_EVENT", "", e);
    };

    document.addEventListener("visibilitychange", function (e) {
        let tempSubAction = "";
        let tempAction = "";
        if (pageStayTimeGreaterThan6Second) {
            tempSubAction = "READING";
            tempAction = "READING";
        } else {
            tempSubAction = "PAGE_NAVIGATION";
            tempAction = "NAVIGATION";
        }
        if (document.hidden) {
            sendEventMessage("", getCurrentTimestamp(), "EXTRA", "VISIBILITY_HIDDEN", tempSubAction, tempAction,null, "NO_INSTANT_EVENT", "", e);
        } else {
            sendEventMessage("", getCurrentTimestamp(), "EXTRA", "VISIBILITY_SHOW", tempSubAction, tempAction,null, "NO_INSTANT_EVENT", "", e);
        }
    });

    //每隔100 毫秒发送一次 鼠标位置
    setInterval(function () {
        if (mousePosition !== "") {
            // mousemoveData.push(mousePosition);
            let parts = mousePosition.split(":::");
            let targetObject = parts[0];
            let myE = {
                screenX: parts[1],
                screenY: parts[2],
                clientX: parts[3],
                clientY: parts[4]
            };
            let subAction = parts[5];
            let action = parts[6];
            let currentTimestamp = parts[7];

            sendEventMessage("", currentTimestamp, "EXTRA", "MOUSE_MOVE", subAction, action, targetObject, "NO_INSTANT_EVENT", "", myE);
            mousePosition = "";
        }
    }, 100);


    setTimeout(function() {
        // console.log("triggered after 6 second................................" + new Date().getTime());

        // console.log("pageStayTime over 6 second" + new Date().getTime());
        // 超过6秒，将移动数据都改为reading
        allEventsDataBefore6Second.forEach(messageObj => {
           if (messageObj.subActionLabel === "PAGE_NAVIGATION") {
               messageObj.subActionLabel = "READING";
               messageObj.actionLabel = "READING";
           }
           sendMyMessage(messageObj);
        });
        allEventsDataBefore6Second = [];
        pageStayTimeGreaterThan6Second = true;

        /*//过了5秒才触发的
        setInterval(function() {
            if (allEventsDataBefore6Second.length !== 0) {
                offTaskStartTime = 0; //只要鼠标在移动，就标识学生还在使用系统，
            } else {
                if (offTaskStartTime === 0) {
                    offTaskStartTime = getCurrentTimestamp(); //如果鼠标不移动，则开始记录offtask
                }
            }

        }, 5000); //离开页面时候也需要执行*/
    }, 6001);

    initIdleTracker();

    /*setInterval(function () {
        if (offTaskStartTime !== 0) {
            let offTaskLength = getCurrentTimestamp() - offTaskStartTime;
            // console.log("off-task-length:" + offTaskLength);
            if (offTaskLength > 300000) { // 用户已经off task 300 秒

                // sendMyTraceDataPost("/trace-off-task", getCurrentTimestamp(), "OFF_TASK", "NO_PAGE_EVENT", "NO_TARGET_OBJECT", "OFF_TASK", "OFF_TASK_LENGTH:::" + offTaskLength, null);
                sendEventMessage("", getCurrentTimestamp(), "OFF_TASK", "NO_PAGE_EVENT", subActionLabelMap["OFF_TASK_OFF_TASK"], "OFF_TASK", "NO_TARGET_OBJECT", "OFF_TASK", "OFF_TASK_LENGTH:::" + offTaskLength, null);
                offTaskStartTime = 0; // 发送之后重置为0
            } else {
                // console.log("off-task not send to server");
            }
        }
    }, 60000); //每1分钟检查一次 来判断用户是否off task*/

    // console.log("setup onbeforeunload........................");
    //离开页面之前进行操作
    window.onbeforeunload = function() {
        //离开page之前可以知道page一共停留多长时间
        // let myUserEnterPageTimestamp = localStorage.getItem("myUserEnterPageTimestamp");
        let leavePageTimestamp = getCurrentTimestamp();
        // console.log("myUserEnterPageTimestamp:" + myUserEnterPageTimestamp);
        if (myUserEnterPageTimestamp != null) {
            // let pageStayTime = leavePageTimestamp - Number(myUserEnterPageTimestamp);
            let pageStayTime = leavePageTimestamp - myUserEnterPageTimestamp;
            // sendMyTraceDataPost("/trace-page-reading", leavePageTimestamp, "PAGE", "NO_PAGE_EVENT", "NO_TARGET_OBJECT", "LEAVE_PAGE", "PAGE_STAY_TIME_LENGTH:::" + pageStayTime, null);
            let tempSubAction = "";
            let tempAction = "";

            if (pageStayTimeGreaterThan6Second) {
                tempSubAction = "READING";
                tempAction = "READING";
            } else {
                tempSubAction = "PAGE_NAVIGATION";
                tempAction = "NAVIGATION";
            }

            sendEventMessage("", leavePageTimestamp, "PAGE", "NO_PAGE_EVENT", tempSubAction, tempAction, "NO_TARGET_OBJECT", "LEAVE_PAGE", "PAGE_STAY_TIME_LENGTH:::" + pageStayTime, null);
        } else {
            let tempSubAction = "";
            let tempAction = "";

            if (pageStayTimeGreaterThan6Second) {
                tempSubAction = "READING";
                tempAction = "READING";
            } else {
                tempSubAction = "PAGE_NAVIGATION";
                tempAction = "NAVIGATION";
            }

            sendEventMessage("", leavePageTimestamp, "PAGE", "NO_PAGE_EVENT", tempSubAction, tempAction, "NO_TARGET_OBJECT", "LEAVE_PAGE", "PAGE_STAY_TIME_LENGTH:::PAGE_CHANGE_BEFORE_SCRIPT_FINISH_LOADING", null);
        }

        //不需要时刻计算，只在processVisual tool 使用时候打开
        if (typeof useProcessVisualTool !== 'undefined' && useProcessVisualTool) {
            $.ajax({
                url: apiBaseUrl + "/label-current-real-time-srl-process/" + currentCourseId + "/" + userId + "/" + srlModel,
                type: 'GET'
            });
        }

        /*if (allEventsDataBefore6Second.length !== 0) {
            allEventsDataBefore6Second.forEach(messageObj => {
                if (messageObj.subActionLabel === "PAGE_NAVIGATION") {
                    messageObj.subActionLabel = "PAGE_NAVIGATION";
                    messageObj.actionLabel = "NAVIGATION";
                }
                sendMyMessage(messageObj);
            });
        }*/
        // if (mousemoveData.length !== 0 || mousewheelData.length !== 0) {
        //
        //     $.post(apiBaseUrl + "/trace-extra", {
        //         userId: userId,
        //         saveTime: leavePageTimestamp,
        //         url: getCurrentUrl(),
        //         username: username == null ? getUsername() : username,
        //         firstname: firstname == null ? getFirstname() : firstname,
        //
        //         lastname: lastname == null ? getLastname() : lastname,
        //         source: "EXTRA",
        //         mousemoveData: mousemoveData,
        //         mousewheelData: mousewheelData,
        //
        //         windowInnerWidth: window.innerWidth,
        //         windowInnerHeight: window.innerHeight,
        //         screenWidth: window.screen.width,
        //         screenHeight: window.screen.height,
        //         courseId: currentCourseId
        //         // eventValue: "NEXT_PAGE_URL:::" + e.target.href
        //     });
        //     mousemoveData = [];
        //     mousewheelData = [];
        // }

        if (mainEditor.getText().replace(/^[\s\n]+|[\s\n]+$/g, '').length !== 0) {
            //每次离开页面自动保存当前的essay
            $.post(apiBaseUrl + '/save-essay-content', {
                userId: userId,
                saveTime: leavePageTimestamp,
                username: username,
                url: getCurrentUrl(),
                essayContent: mainEditor.getText(),
                essayContentJson: JSON.stringify(mainEditor.getContents()),
                courseId: currentCourseId
            });
            localStorage.setItem(userId + "-" + currentCourseId + "myCurrentEssayContent", JSON.stringify(mainEditor.getContents()));

            //这个不需要记录
            // sendMyTraceDataPost("/trace-essay", leavePageTimestamp, "ESSAY", "NO_PAGE_EVENT", "NO_TARGET_OBJECT", "SAVE_WHEN_LEAVE_PAGE", "", null);
        }
        if (eventWebsocket != null) {
            eventWebsocket.close();
        }
        if (teacherChatWebsocket != null) {
            sendTeacherChatMessage(senderId, "Student closed webpage", receiverId, "close");
            teacherChatWebsocket.close();
        }
    };


}


// 2025 beijing medical study

function generateChatgptAssistantTeacherAnswerHtml(answer, timestamp, questionId, logId, ratingVisible=true, round_num) {
    if (answer === null) {
        answer = "gpt-error";
    }
    answer = answer.replace(/\n/g, '<br>');
    if (ratingVisible) {
        const html = `
    <div class="message-content">
        <div class="agent-avatar-wrapper">
            <div class="bot-avatar">
                <svg t="1714450472298" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6234" width="30" height="30">
                <path d="M378.253061 617.012245m-42.840816 0a42.840816 42.840816 0 1 0 85.681633 0 42.840816 42.840816 0 1 0-85.681633 0Z" fill="#333333" p-id="6235"></path>
                <path d="M645.746939 617.012245m-42.840817 0a42.840816 42.840816 0 1 0 85.681633 0 42.840816 42.840816 0 1 0-85.681633 0Z" fill="#333333" p-id="6236"></path>
                <path d="M509.910204 532.897959c-121.208163 0-216.293878-13.583673-261.746939-21.420408-21.420408-3.657143-40.75102-15.673469-53.289796-33.959184-12.538776-17.763265-17.240816-39.706122-13.583673-61.12653l42.318367-237.714286c6.269388-35.526531 35.526531-63.216327 71.57551-67.395918 8.881633-1.044898 16.718367-2.089796 24.555103-3.657143l3.134693-0.522449c31.869388-5.22449 67.395918-11.493878 189.126531-11.493878 121.730612 0 157.779592 6.269388 189.126531 11.493878 8.359184 1.567347 17.240816 3.134694 28.212245 4.179592 35.526531 4.179592 65.306122 31.869388 71.57551 67.395918l41.795918 237.191837c3.657143 21.420408-1.044898 43.363265-13.583673 61.648979-12.538776 17.763265-31.346939 29.779592-53.289796 33.436735-47.020408 8.359184-144.195918 21.942857-265.926531 21.942857z m2.089796-395.493877c-118.073469 0-152.032653 5.746939-182.334694 10.971428l-3.134694 0.522449c-8.359184 1.567347-16.718367 3.134694-27.167347 4.179592-17.240816 2.089796-31.869388 15.673469-35.004081 32.914286l-42.318368 237.714285c-2.089796 10.44898 0.522449 21.420408 6.791837 30.302041 6.269388 8.881633 15.15102 14.628571 26.122449 16.718368 44.408163 7.836735 136.881633 20.897959 254.955102 20.897959 118.595918 0 213.159184-13.061224 259.134694-20.897959 10.44898-2.089796 19.853061-7.836735 26.122449-16.718368 6.269388-8.881633 8.881633-19.330612 6.791837-30.302041l-41.795919-237.714285c-3.134694-17.240816-17.763265-30.82449-35.004081-32.914286-12.016327-1.567347-21.420408-3.134694-30.302041-4.702041-30.302041-5.22449-64.261224-10.971429-182.857143-10.971428z" fill="#333333" p-id="6237"></path><path d="M512 928.391837c-62.693878 0-133.746939-27.689796-195.395918-75.755102-55.379592-43.363265-97.697959-99.265306-120.163266-159.346939-58.514286-10.971429-102.4-65.306122-102.4-129.567347 0-66.35102 46.497959-122.253061 108.669388-130.612245 9.404082-1.044898 18.285714 4.179592 21.942857 12.538776 1.044898 2.612245 2.612245 5.22449 4.179592 7.836734 6.269388 8.881633 15.15102 14.628571 26.122449 16.718368 44.408163 7.836735 136.881633 20.897959 254.955102 20.897959 118.595918 0 213.159184-13.061224 259.134694-20.897959 10.44898-2.089796 19.853061-7.836735 26.122449-16.718368 1.567347-2.089796 3.134694-4.702041 4.179592-7.836734 3.657143-8.881633 12.538776-14.106122 21.942857-12.538776 62.171429 8.359184 108.669388 64.261224 108.669388 130.612245 0 64.261224-43.885714 118.595918-102.4 129.567347-22.465306 59.559184-64.783673 115.983673-120.163266 159.346939-61.64898 48.065306-132.702041 75.755102-195.395918 75.755102zM194.873469 477.518367c-34.481633 10.971429-59.036735 45.97551-59.036734 86.204082 0 47.542857 33.959184 86.726531 77.322449 89.861224 8.359184 0.522449 15.673469 6.269388 18.285714 14.106123 18.808163 56.946939 57.991837 110.759184 110.759184 152.032653 54.334694 42.318367 115.983673 66.873469 169.795918 66.873469 53.289796 0 115.461224-24.555102 169.273469-66.873469 52.767347-41.273469 91.95102-95.085714 110.759184-152.032653 2.612245-7.836735 9.926531-13.583673 18.285714-14.106123 43.363265-3.134694 77.322449-42.318367 77.322449-89.861224 0-40.228571-24.555102-75.232653-59.036734-86.204082-12.538776 17.763265-31.346939 29.779592-53.289796 33.436735-47.020408 8.359184-144.195918 21.942857-265.926531 21.942857-121.208163 0-216.293878-13.583673-261.746939-21.420408-21.420408-3.657143-40.228571-15.673469-52.767347-33.959184zM603.428571 334.889796h-182.857142c-11.493878 0-20.897959-9.404082-20.89796-20.897959s9.404082-20.897959 20.89796-20.897959h182.857142c11.493878 0 20.897959 9.404082 20.89796 20.897959s-9.404082 20.897959-20.89796 20.897959z" fill="#333333" p-id="6238"></path><path d="M512 426.318367c-11.493878 0-20.897959-9.404082-20.897959-20.897959v-182.857143c0-11.493878 9.404082-20.897959 20.897959-20.897959s20.897959 9.404082 20.897959 20.897959v182.857143c0 11.493878-9.404082 20.897959-20.897959 20.897959z" fill="#333333" p-id="6239"></path></svg>
            </div>
            <div class="agent-name">${assistantTeacherName}</div>
        </div>

        <div class="bot-answer" data-logId ="${logId}">
            <div class="bot-answer-content">${answer}<br><span class="timestamp">${timestamp}</span></div><span class="chat-rounds">第${round_num}轮</span>
            <!--            一排按钮，点赞、点踩、重新生成答案-->
            <div class="bot-answer-buttons">
                <button title="Useful Answer" style="width: 25px;height: 25px;padding: 1px 3px" class="btn btn-outline-secondary border useful-answer ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
                        <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>
                    </svg>
                </button>
                <button title="Useless Answer" style="width: 25px;height: 25px;padding: 1px 3px" class="btn btn-outline-secondary border useless-answer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-hand-thumbs-down" viewBox="0 0 16 16">
                        <path d="M8.864 15.674c-.956.24-1.843-.484-1.908-1.42-.072-1.05-.23-2.015-.428-2.59-.125-.36-.479-1.012-1.04-1.638-.557-.624-1.282-1.179-2.131-1.41C2.685 8.432 2 7.85 2 7V3c0-.845.682-1.464 1.448-1.546 1.07-.113 1.564-.415 2.068-.723l.048-.029c.272-.166.578-.349.97-.484C6.931.08 7.395 0 8 0h3.5c.937 0 1.599.478 1.934 1.064.164.287.254.607.254.913 0 .152-.023.312-.077.464.201.262.38.577.488.9.11.33.172.762.004 1.15.069.13.12.268.159.403.077.27.113.567.113.856 0 .289-.036.586-.113.856-.035.12-.08.244-.138.363.394.571.418 1.2.234 1.733-.206.592-.682 1.1-1.2 1.272-.847.283-1.803.276-2.516.211a9.877 9.877 0 0 1-.443-.05 9.364 9.364 0 0 1-.062 4.51c-.138.508-.55.848-1.012.964l-.261.065zM11.5 1H8c-.51 0-.863.068-1.14.163-.281.097-.506.229-.776.393l-.04.025c-.555.338-1.198.73-2.49.868-.333.035-.554.29-.554.55V7c0 .255.226.543.62.65 1.095.3 1.977.997 2.614 1.709.635.71 1.064 1.475 1.238 1.977.243.7.407 1.768.482 2.85.025.362.36.595.667.518l.262-.065c.16-.04.258-.144.288-.255a8.34 8.34 0 0 0-.145-4.726.5.5 0 0 1 .595-.643h.003l.014.004.058.013a8.912 8.912 0 0 0 1.036.157c.663.06 1.457.054 2.11-.163.175-.059.45-.301.57-.651.107-.308.087-.67-.266-1.021L12.793 7l.353-.354c.043-.042.105-.14.154-.315.048-.167.075-.37.075-.581 0-.211-.027-.414-.075-.581-.05-.174-.111-.273-.154-.315l-.353-.354.353-.354c.047-.047.109-.176.005-.488a2.224 2.224 0 0 0-.505-.804l-.353-.354.353-.354c.006-.005.041-.05.041-.17a.866.866 0 0 0-.121-.415C12.4 1.272 12.063 1 11.5 1z"/>
                    </svg>
                </button>
                <button title="Regenerate Answer" style="width: 25px;height: 25px;padding: 3px 3px" class="btn btn-outline-secondary border regenerate-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-arrow-repeat" viewBox="0 0 16 16" style="vertical-align:top">
                        <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
                        <path fill-rule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/>
                    </svg>
                </button>
            </div>


            <div class="bot-answer-rating">
                <!--            实现星级评价-->
                <span class="star" data-rating="1">${starInnerHtml}</span>
                <span class="star" data-rating="2">${starInnerHtml}</span>
                <span class="star" data-rating="3">${starInnerHtml}</span>
                <span class="star" data-rating="4">${starInnerHtml}</span>
                <span class="star" data-rating="5">${starInnerHtml}</span>
            </div>
        </div>
    </div>

    `;
        return html
    }
    else {
        const html = `
        <div class="message-content">
            <div class="agent-avatar-wrapper">
                <div class="bot-avatar">
                    <svg t="1714450472298" viewBox="0 0 1024 1024"  xmlns="http://www.w3.org/2000/svg" p-id="6234" width="30" height="30">
                    <path d="M378.253061 617.012245m-42.840816 0a42.840816 42.840816 0 1 0 85.681633 0 42.840816 42.840816 0 1 0-85.681633 0Z" fill="#333333" p-id="6235"></path>
                    <path d="M645.746939 617.012245m-42.840817 0a42.840816 42.840816 0 1 0 85.681633 0 42.840816 42.840816 0 1 0-85.681633 0Z" fill="#333333" p-id="6236"></path>
                    <path d="M509.910204 532.897959c-121.208163 0-216.293878-13.583673-261.746939-21.420408-21.420408-3.657143-40.75102-15.673469-53.289796-33.959184-12.538776-17.763265-17.240816-39.706122-13.583673-61.12653l42.318367-237.714286c6.269388-35.526531 35.526531-63.216327 71.57551-67.395918 8.881633-1.044898 16.718367-2.089796 24.555103-3.657143l3.134693-0.522449c31.869388-5.22449 67.395918-11.493878 189.126531-11.493878 121.730612 0 157.779592 6.269388 189.126531 11.493878 8.359184 1.567347 17.240816 3.134694 28.212245 4.179592 35.526531 4.179592 65.306122 31.869388 71.57551 67.395918l41.795918 237.191837c3.657143 21.420408-1.044898 43.363265-13.583673 61.648979-12.538776 17.763265-31.346939 29.779592-53.289796 33.436735-47.020408 8.359184-144.195918 21.942857-265.926531 21.942857z m2.089796-395.493877c-118.073469 0-152.032653 5.746939-182.334694 10.971428l-3.134694 0.522449c-8.359184 1.567347-16.718367 3.134694-27.167347 4.179592-17.240816 2.089796-31.869388 15.673469-35.004081 32.914286l-42.318368 237.714285c-2.089796 10.44898 0.522449 21.420408 6.791837 30.302041 6.269388 8.881633 15.15102 14.628571 26.122449 16.718368 44.408163 7.836735 136.881633 20.897959 254.955102 20.897959 118.595918 0 213.159184-13.061224 259.134694-20.897959 10.44898-2.089796 19.853061-7.836735 26.122449-16.718368 6.269388-8.881633 8.881633-19.330612 6.791837-30.302041l-41.795919-237.714285c-3.134694-17.240816-17.763265-30.82449-35.004081-32.914286-12.016327-1.567347-21.420408-3.134694-30.302041-4.702041-30.302041-5.22449-64.261224-10.971429-182.857143-10.971428z" fill="#333333" p-id="6237"></path><path d="M512 928.391837c-62.693878 0-133.746939-27.689796-195.395918-75.755102-55.379592-43.363265-97.697959-99.265306-120.163266-159.346939-58.514286-10.971429-102.4-65.306122-102.4-129.567347 0-66.35102 46.497959-122.253061 108.669388-130.612245 9.404082-1.044898 18.285714 4.179592 21.942857 12.538776 1.044898 2.612245 2.612245 5.22449 4.179592 7.836734 6.269388 8.881633 15.15102 14.628571 26.122449 16.718368 44.408163 7.836735 136.881633 20.897959 254.955102 20.897959 118.595918 0 213.159184-13.061224 259.134694-20.897959 10.44898-2.089796 19.853061-7.836735 26.122449-16.718368 1.567347-2.089796 3.134694-4.702041 4.179592-7.836734 3.657143-8.881633 12.538776-14.106122 21.942857-12.538776 62.171429 8.359184 108.669388 64.261224 108.669388 130.612245 0 64.261224-43.885714 118.595918-102.4 129.567347-22.465306 59.559184-64.783673 115.983673-120.163266 159.346939-61.64898 48.065306-132.702041 75.755102-195.395918 75.755102zM194.873469 477.518367c-34.481633 10.971429-59.036735 45.97551-59.036734 86.204082 0 47.542857 33.959184 86.726531 77.322449 89.861224 8.359184 0.522449 15.673469 6.269388 18.285714 14.106123 18.808163 56.946939 57.991837 110.759184 110.759184 152.032653 54.334694 42.318367 115.983673 66.873469 169.795918 66.873469 53.289796 0 115.461224-24.555102 169.273469-66.873469 52.767347-41.273469 91.95102-95.085714 110.759184-152.032653 2.612245-7.836735 9.926531-13.583673 18.285714-14.106123 43.363265-3.134694 77.322449-42.318367 77.322449-89.861224 0-40.228571-24.555102-75.232653-59.036734-86.204082-12.538776 17.763265-31.346939 29.779592-53.289796 33.436735-47.020408 8.359184-144.195918 21.942857-265.926531 21.942857-121.208163 0-216.293878-13.583673-261.746939-21.420408-21.420408-3.657143-40.228571-15.673469-52.767347-33.959184zM603.428571 334.889796h-182.857142c-11.493878 0-20.897959-9.404082-20.89796-20.897959s9.404082-20.897959 20.89796-20.897959h182.857142c11.493878 0 20.897959 9.404082 20.89796 20.897959s-9.404082 20.897959-20.89796 20.897959z" fill="#333333" p-id="6238"></path><path d="M512 426.318367c-11.493878 0-20.897959-9.404082-20.897959-20.897959v-182.857143c0-11.493878 9.404082-20.897959 20.897959-20.897959s20.897959 9.404082 20.897959 20.897959v182.857143c0 11.493878-9.404082 20.897959-20.897959 20.897959z" fill="#333333" p-id="6239"></path></svg>
                </div>
                <div class="agent-name">${assistantTeacherName}</div>
            </div>
            <div class="bot-answer" data-logId ="${logId}">
                <div class="bot-answer-content">
                    ${answer}<br>
                    <span class="timestamp">${timestamp}</span><span class="chat-rounds">第${round_num}轮</span>
                </div>
            </div>
        </div>
    `;
        return html;
    }
}

function generateChatgptPatientAnswerHtml(answer, timestamp, questionId, logId, ratingVisible=false, round_num) {
    if (answer === null) {
        answer = "gpt-error";
    }
    answer = answer.replace(/\n/g, '<br>');
    if (ratingVisible) {
        const html = `
        <div class="message-content">
          <div class="agent-avatar-wrapper">
            <div class="bot-avatar">
<svg t="1711278978396" viewBox="0 0 1024 1024"  xmlns="http://www.w3.org/2000/svg" p-id="4674" width="30" height="30"><path d="M1024 512c0-70.4-12.8-134.4-38.4-198.4-25.6-64-64-115.2-108.8-160S774.4 70.4 716.8 44.8C646.4 12.8 582.4 0 512 0S377.6 12.8 313.6 38.4c-64 25.6-115.2 64-160 108.8C102.4 198.4 64 249.6 38.4 313.6 12.8 377.6 0 441.6 0 512s12.8 134.4 38.4 198.4c25.6 64 64 115.2 108.8 160s102.4 83.2 160 108.8c64 25.6 128 38.4 198.4 38.4s134.4-12.8 198.4-38.4c64-25.6 115.2-64 160-108.8s83.2-102.4 108.8-160c38.4-64 51.2-128 51.2-198.4z" fill="#336FA4" p-id="4675"></path><path d="M601.6 723.2V640H441.6v76.8l89.6 38.4 70.4-32z m0 0" fill="#F7D8B5" p-id="4676"></path><path d="M441.6 652.8c0 12.8 12.8 25.6 38.4 32 25.6 6.4 51.2 6.4 76.8 0 25.6-6.4 38.4-19.2 38.4-32s-12.8-25.6-38.4-32c-25.6-6.4-51.2-6.4-76.8 0-19.2 0-38.4 12.8-38.4 32z m0 0" fill="#E9C8AF" p-id="4677"></path><path d="M755.2 345.6c0 128-102.4 256-230.4 256s-230.4-128-230.4-256S396.8 128 524.8 128s230.4 89.6 230.4 217.6z m0 0" fill="#3E3121" p-id="4678"></path><path d="M352 460.8c6.4 32 6.4 64-12.8 70.4-25.6 6.4-57.6-19.2-64-51.2-6.4-32 0-64 25.6-70.4 19.2-6.4 38.4 19.2 51.2 51.2z m0 0M780.8 480c6.4-32 0-64-25.6-70.4-19.2-6.4-44.8 19.2-51.2 51.2-6.4 32-12.8 64 12.8 70.4 19.2 6.4 57.6-19.2 64-51.2z m0 0" fill="#F7D8B5" p-id="4679"></path><path d="M742.4 422.4c0 134.4-96 243.2-217.6 243.2S307.2 556.8 307.2 422.4c0-134.4 96-204.8 217.6-204.8s217.6 70.4 217.6 204.8z m0 0" fill="#F7D8B5" p-id="4680"></path><path d="M473.6 211.2s25.6 89.6 243.2 147.2l25.6 25.6-12.8-96-268.8-128 12.8 51.2z m0 0" fill="#3E3121" p-id="4681"></path><path d="M672 736H384s-134.4 25.6-179.2 185.6c32 25.6 70.4 44.8 108.8 64 64 25.6 128 38.4 198.4 38.4s134.4-12.8 198.4-38.4c38.4-19.2 76.8-38.4 115.2-70.4-12.8-76.8-51.2-166.4-153.6-179.2zM825.6 915.2z" fill="#FFFFFF" p-id="4682"></path><path d="M518.4 857.6s0 6.4 6.4 6.4h6.4l6.4-6.4s0-6.4-6.4-6.4h-6.4c-6.4 0-6.4 0-6.4 6.4z m0 0M518.4 902.4c0 6.4 6.4 6.4 6.4 6.4l6.4-6.4c0-6.4-6.4-6.4-6.4-6.4l-6.4 6.4z m0 0M518.4 947.2s0 6.4 6.4 6.4h6.4l6.4-6.4s0-6.4-6.4-6.4h-6.4c-6.4 0-6.4 6.4-6.4 6.4z m0 0M518.4 998.4s0 6.4 6.4 6.4h6.4l6.4-6.4s0-6.4-6.4-6.4h-6.4l-6.4 6.4z m0 0" fill="#FFFFFF" p-id="4683"></path><path d="M275.2 966.4v-172.8l-25.6 25.6v128c6.4 6.4 19.2 12.8 25.6 19.2zM313.6 985.6l6.4-224c-6.4 6.4-19.2 12.8-25.6 19.2v192c6.4 6.4 12.8 6.4 19.2 12.8zM364.8 1004.8v-262.4s-6.4 0-25.6 6.4v243.2c6.4 6.4 19.2 6.4 25.6 12.8zM448 1017.6v-307.2h-25.6v307.2H448zM409.6 1011.2v-281.6h-12.8l-12.8 12.8v268.8h25.6zM492.8 1024v-262.4l-25.6-12.8V1024h25.6zM812.8 928v-64c-6.4-19.2-12.8-32-25.6-51.2v128c6.4-6.4 19.2-12.8 25.6-12.8zM537.6 1024v-256l-25.6-12.8V1024h25.6zM710.4 985.6c6.4 0 6.4-6.4 12.8-6.4v-224c-6.4-6.4-12.8-6.4-25.6-12.8v243.2h12.8zM761.6 953.6v-172.8c-6.4-6.4-12.8-12.8-25.6-19.2v204.8c12.8 0 19.2-6.4 25.6-12.8zM678.4 998.4v-262.4l-25.6-12.8v275.2c6.4 6.4 12.8 0 25.6 0zM627.2 1011.2v-262.4h-19.2v268.8c6.4-6.4 12.8-6.4 19.2-6.4zM582.4 1017.6v-300.8l-25.6 19.2V1024c12.8 0 19.2-6.4 25.6-6.4z" fill="#CECECE" p-id="4684"></path><path d="M518.4 800c0 6.4 6.4 6.4 6.4 6.4l6.4-6.4c0-6.4-6.4-6.4-6.4-6.4s-6.4 0-6.4 6.4z m0 0M518.4 857.6s0 6.4 6.4 6.4h6.4l6.4-6.4s0-6.4-6.4-6.4h-6.4c-6.4 0-6.4 0-6.4 6.4z m0 0M518.4 902.4c0 6.4 6.4 6.4 6.4 6.4l6.4-6.4c0-6.4-6.4-6.4-6.4-6.4l-6.4 6.4z m0 0M518.4 947.2s0 6.4 6.4 6.4h6.4l6.4-6.4s0-6.4-6.4-6.4h-6.4c-6.4 0-6.4 6.4-6.4 6.4z m0 0M518.4 998.4s0 6.4 6.4 6.4h6.4l6.4-6.4s0-6.4-6.4-6.4h-6.4l-6.4 6.4z m0 0" fill="#FFFFFF" p-id="4685"></path><path d="M230.4 934.4v-83.2l-19.2 38.4v25.6c0 12.8 6.4 19.2 19.2 19.2z" fill="#CECECE" p-id="4686"></path><path d="M480 819.2l38.4-51.2 51.2 51.2 102.4-83.2-51.2-25.6-19.2-12.8-70.4 57.6h-12.8l-51.2-38.4-25.6-19.2-19.2 12.8-51.2 25.6z" fill="#4B4C4B" p-id="4687"></path><path d="M518.4 800c0 6.4 6.4 6.4 6.4 6.4l6.4-6.4c0-6.4-6.4-6.4-6.4-6.4s-6.4 0-6.4 6.4z m0 0" fill="#FFFFFF" p-id="4688"></path><path d="M601.6 723.2V640H441.6v76.8l89.6 38.4 70.4-32z m0 0" fill="#F7D8B5" p-id="4689"></path><path d="M441.6 652.8c0 12.8 12.8 25.6 38.4 32 25.6 6.4 51.2 6.4 76.8 0 25.6-6.4 38.4-19.2 38.4-32s-12.8-25.6-38.4-32c-25.6-6.4-51.2-6.4-76.8 0-19.2 0-38.4 12.8-38.4 32z m0 0" fill="#E9C8AF" p-id="4690"></path><path d="M755.2 345.6c0 128-102.4 256-230.4 256s-230.4-128-230.4-256S396.8 128 524.8 128s230.4 89.6 230.4 217.6z m0 0" fill="#3E3121" p-id="4691"></path><path d="M352 460.8c6.4 32 6.4 64-12.8 70.4-25.6 6.4-57.6-19.2-64-51.2-6.4-32 0-64 25.6-70.4 19.2-6.4 38.4 19.2 51.2 51.2z m0 0M780.8 480c6.4-32 0-64-25.6-70.4-19.2-6.4-44.8 19.2-51.2 51.2-6.4 32-12.8 64 12.8 70.4 19.2 6.4 57.6-19.2 64-51.2z m0 0" fill="#F7D8B5" p-id="4692"></path><path d="M742.4 422.4c0 134.4-96 243.2-217.6 243.2S307.2 556.8 307.2 422.4c0-134.4 96-204.8 217.6-204.8s217.6 70.4 217.6 204.8z m0 0" fill="#F7D8B5" p-id="4693"></path><path d="M473.6 211.2s25.6 89.6 243.2 147.2l25.6 25.6-12.8-96-268.8-128 12.8 51.2z m0 0" fill="#3E3121" p-id="4694"></path><path d="M480 819.2l38.4-51.2 51.2 51.2 102.4-83.2-51.2-25.6-19.2-12.8-70.4 57.6h-12.8l-51.2-38.4-25.6-19.2-19.2 12.8-51.2 25.6z" fill="#4B4C4B" p-id="4695"></path></svg>
           </div>
                <div class="agent-name">${assistantPatientName}</div>
           </div>
            <div class="bot-answer" data-logId ="${logId}">
            <div class="bot-answer-content">${answer}<br><span class="timestamp">${timestamp}</span></div><span class="chat-rounds">第${round_num}轮</span>

                            <!--            一排按钮，点赞、点踩、重新生成答案-->
            <div class="bot-answer-buttons">
           <button title="Useful Answer" style="width: 25px;height: 25px;padding: 1px 3px" class="btn btn-outline-secondary border useful-answer ">
           <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
    <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>
</svg>
    </button>
           <button title="Useless Answer" style="width: 25px;height: 25px;padding: 1px 3px" class="btn btn-outline-secondary border useless-answer">
           <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-hand-thumbs-down" viewBox="0 0 16 16">
    <path d="M8.864 15.674c-.956.24-1.843-.484-1.908-1.42-.072-1.05-.23-2.015-.428-2.59-.125-.36-.479-1.012-1.04-1.638-.557-.624-1.282-1.179-2.131-1.41C2.685 8.432 2 7.85 2 7V3c0-.845.682-1.464 1.448-1.546 1.07-.113 1.564-.415 2.068-.723l.048-.029c.272-.166.578-.349.97-.484C6.931.08 7.395 0 8 0h3.5c.937 0 1.599.478 1.934 1.064.164.287.254.607.254.913 0 .152-.023.312-.077.464.201.262.38.577.488.9.11.33.172.762.004 1.15.069.13.12.268.159.403.077.27.113.567.113.856 0 .289-.036.586-.113.856-.035.12-.08.244-.138.363.394.571.418 1.2.234 1.733-.206.592-.682 1.1-1.2 1.272-.847.283-1.803.276-2.516.211a9.877 9.877 0 0 1-.443-.05 9.364 9.364 0 0 1-.062 4.51c-.138.508-.55.848-1.012.964l-.261.065zM11.5 1H8c-.51 0-.863.068-1.14.163-.281.097-.506.229-.776.393l-.04.025c-.555.338-1.198.73-2.49.868-.333.035-.554.29-.554.55V7c0 .255.226.543.62.65 1.095.3 1.977.997 2.614 1.709.635.71 1.064 1.475 1.238 1.977.243.7.407 1.768.482 2.85.025.362.36.595.667.518l.262-.065c.16-.04.258-.144.288-.255a8.34 8.34 0 0 0-.145-4.726.5.5 0 0 1 .595-.643h.003l.014.004.058.013a8.912 8.912 0 0 0 1.036.157c.663.06 1.457.054 2.11-.163.175-.059.45-.301.57-.651.107-.308.087-.67-.266-1.021L12.793 7l.353-.354c.043-.042.105-.14.154-.315.048-.167.075-.37.075-.581 0-.211-.027-.414-.075-.581-.05-.174-.111-.273-.154-.315l-.353-.354.353-.354c.047-.047.109-.176.005-.488a2.224 2.224 0 0 0-.505-.804l-.353-.354.353-.354c.006-.005.041-.05.041-.17a.866.866 0 0 0-.121-.415C12.4 1.272 12.063 1 11.5 1z"/>
</svg>
</button>
           <button title="Regenerate Answer" style="width: 25px;height: 25px;padding: 3px 3px" class="btn btn-outline-secondary border regenerate-btn"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-arrow-repeat" viewBox="0 0 16 16" style="vertical-align:top">
    <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
    <path fill-rule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/>
</svg></button>
            </div>
                 <div class="bot-answer-rating">
<!--            实现星级评价-->
            <span class="star" data-rating="1">${starInnerHtml}</span>
            <span class="star" data-rating="2">${starInnerHtml}</span>
            <span class="star" data-rating="3">${starInnerHtml}</span>
            <span class="star" data-rating="4">${starInnerHtml}</span>
            <span class="star" data-rating="5">${starInnerHtml}</span>
</div>
            </div>


            </div>
    `;
        return html
    }
    else {
        const html = `
        <div class="message-content">
          <div class="agent-avatar-wrapper">
            <div class="bot-avatar">
<svg t="1711278978396" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4674" width="30" height="30"><path d="M1024 512c0-70.4-12.8-134.4-38.4-198.4-25.6-64-64-115.2-108.8-160S774.4 70.4 716.8 44.8C646.4 12.8 582.4 0 512 0S377.6 12.8 313.6 38.4c-64 25.6-115.2 64-160 108.8C102.4 198.4 64 249.6 38.4 313.6 12.8 377.6 0 441.6 0 512s12.8 134.4 38.4 198.4c25.6 64 64 115.2 108.8 160s102.4 83.2 160 108.8c64 25.6 128 38.4 198.4 38.4s134.4-12.8 198.4-38.4c64-25.6 115.2-64 160-108.8s83.2-102.4 108.8-160c38.4-64 51.2-128 51.2-198.4z" fill="#336FA4" p-id="4675"></path><path d="M601.6 723.2V640H441.6v76.8l89.6 38.4 70.4-32z m0 0" fill="#F7D8B5" p-id="4676"></path><path d="M441.6 652.8c0 12.8 12.8 25.6 38.4 32 25.6 6.4 51.2 6.4 76.8 0 25.6-6.4 38.4-19.2 38.4-32s-12.8-25.6-38.4-32c-25.6-6.4-51.2-6.4-76.8 0-19.2 0-38.4 12.8-38.4 32z m0 0" fill="#E9C8AF" p-id="4677"></path><path d="M755.2 345.6c0 128-102.4 256-230.4 256s-230.4-128-230.4-256S396.8 128 524.8 128s230.4 89.6 230.4 217.6z m0 0" fill="#3E3121" p-id="4678"></path><path d="M352 460.8c6.4 32 6.4 64-12.8 70.4-25.6 6.4-57.6-19.2-64-51.2-6.4-32 0-64 25.6-70.4 19.2-6.4 38.4 19.2 51.2 51.2z m0 0M780.8 480c6.4-32 0-64-25.6-70.4-19.2-6.4-44.8 19.2-51.2 51.2-6.4 32-12.8 64 12.8 70.4 19.2 6.4 57.6-19.2 64-51.2z m0 0" fill="#F7D8B5" p-id="4679"></path><path d="M742.4 422.4c0 134.4-96 243.2-217.6 243.2S307.2 556.8 307.2 422.4c0-134.4 96-204.8 217.6-204.8s217.6 70.4 217.6 204.8z m0 0" fill="#F7D8B5" p-id="4680"></path><path d="M473.6 211.2s25.6 89.6 243.2 147.2l25.6 25.6-12.8-96-268.8-128 12.8 51.2z m0 0" fill="#3E3121" p-id="4681"></path><path d="M672 736H384s-134.4 25.6-179.2 185.6c32 25.6 70.4 44.8 108.8 64 64 25.6 128 38.4 198.4 38.4s134.4-12.8 198.4-38.4c38.4-19.2 76.8-38.4 115.2-70.4-12.8-76.8-51.2-166.4-153.6-179.2zM825.6 915.2z" fill="#FFFFFF" p-id="4682"></path><path d="M518.4 857.6s0 6.4 6.4 6.4h6.4l6.4-6.4s0-6.4-6.4-6.4h-6.4c-6.4 0-6.4 0-6.4 6.4z m0 0M518.4 902.4c0 6.4 6.4 6.4 6.4 6.4l6.4-6.4c0-6.4-6.4-6.4-6.4-6.4l-6.4 6.4z m0 0M518.4 947.2s0 6.4 6.4 6.4h6.4l6.4-6.4s0-6.4-6.4-6.4h-6.4c-6.4 0-6.4 6.4-6.4 6.4z m0 0M518.4 998.4s0 6.4 6.4 6.4h6.4l6.4-6.4s0-6.4-6.4-6.4h-6.4l-6.4 6.4z m0 0" fill="#FFFFFF" p-id="4683"></path><path d="M275.2 966.4v-172.8l-25.6 25.6v128c6.4 6.4 19.2 12.8 25.6 19.2zM313.6 985.6l6.4-224c-6.4 6.4-19.2 12.8-25.6 19.2v192c6.4 6.4 12.8 6.4 19.2 12.8zM364.8 1004.8v-262.4s-6.4 0-25.6 6.4v243.2c6.4 6.4 19.2 6.4 25.6 12.8zM448 1017.6v-307.2h-25.6v307.2H448zM409.6 1011.2v-281.6h-12.8l-12.8 12.8v268.8h25.6zM492.8 1024v-262.4l-25.6-12.8V1024h25.6zM812.8 928v-64c-6.4-19.2-12.8-32-25.6-51.2v128c6.4-6.4 19.2-12.8 25.6-12.8zM537.6 1024v-256l-25.6-12.8V1024h25.6zM710.4 985.6c6.4 0 6.4-6.4 12.8-6.4v-224c-6.4-6.4-12.8-6.4-25.6-12.8v243.2h12.8zM761.6 953.6v-172.8c-6.4-6.4-12.8-12.8-25.6-19.2v204.8c12.8 0 19.2-6.4 25.6-12.8zM678.4 998.4v-262.4l-25.6-12.8v275.2c6.4 6.4 12.8 0 25.6 0zM627.2 1011.2v-262.4h-19.2v268.8c6.4-6.4 12.8-6.4 19.2-6.4zM582.4 1017.6v-300.8l-25.6 19.2V1024c12.8 0 19.2-6.4 25.6-6.4z" fill="#CECECE" p-id="4684"></path><path d="M518.4 800c0 6.4 6.4 6.4 6.4 6.4l6.4-6.4c0-6.4-6.4-6.4-6.4-6.4s-6.4 0-6.4 6.4z m0 0M518.4 857.6s0 6.4 6.4 6.4h6.4l6.4-6.4s0-6.4-6.4-6.4h-6.4c-6.4 0-6.4 0-6.4 6.4z m0 0M518.4 902.4c0 6.4 6.4 6.4 6.4 6.4l6.4-6.4c0-6.4-6.4-6.4-6.4-6.4l-6.4 6.4z m0 0M518.4 947.2s0 6.4 6.4 6.4h6.4l6.4-6.4s0-6.4-6.4-6.4h-6.4c-6.4 0-6.4 6.4-6.4 6.4z m0 0M518.4 998.4s0 6.4 6.4 6.4h6.4l6.4-6.4s0-6.4-6.4-6.4h-6.4l-6.4 6.4z m0 0" fill="#FFFFFF" p-id="4685"></path><path d="M230.4 934.4v-83.2l-19.2 38.4v25.6c0 12.8 6.4 19.2 19.2 19.2z" fill="#CECECE" p-id="4686"></path><path d="M480 819.2l38.4-51.2 51.2 51.2 102.4-83.2-51.2-25.6-19.2-12.8-70.4 57.6h-12.8l-51.2-38.4-25.6-19.2-19.2 12.8-51.2 25.6z" fill="#4B4C4B" p-id="4687"></path><path d="M518.4 800c0 6.4 6.4 6.4 6.4 6.4l6.4-6.4c0-6.4-6.4-6.4-6.4-6.4s-6.4 0-6.4 6.4z m0 0" fill="#FFFFFF" p-id="4688"></path><path d="M601.6 723.2V640H441.6v76.8l89.6 38.4 70.4-32z m0 0" fill="#F7D8B5" p-id="4689"></path><path d="M441.6 652.8c0 12.8 12.8 25.6 38.4 32 25.6 6.4 51.2 6.4 76.8 0 25.6-6.4 38.4-19.2 38.4-32s-12.8-25.6-38.4-32c-25.6-6.4-51.2-6.4-76.8 0-19.2 0-38.4 12.8-38.4 32z m0 0" fill="#E9C8AF" p-id="4690"></path><path d="M755.2 345.6c0 128-102.4 256-230.4 256s-230.4-128-230.4-256S396.8 128 524.8 128s230.4 89.6 230.4 217.6z m0 0" fill="#3E3121" p-id="4691"></path><path d="M352 460.8c6.4 32 6.4 64-12.8 70.4-25.6 6.4-57.6-19.2-64-51.2-6.4-32 0-64 25.6-70.4 19.2-6.4 38.4 19.2 51.2 51.2z m0 0M780.8 480c6.4-32 0-64-25.6-70.4-19.2-6.4-44.8 19.2-51.2 51.2-6.4 32-12.8 64 12.8 70.4 19.2 6.4 57.6-19.2 64-51.2z m0 0" fill="#F7D8B5" p-id="4692"></path><path d="M742.4 422.4c0 134.4-96 243.2-217.6 243.2S307.2 556.8 307.2 422.4c0-134.4 96-204.8 217.6-204.8s217.6 70.4 217.6 204.8z m0 0" fill="#F7D8B5" p-id="4693"></path><path d="M473.6 211.2s25.6 89.6 243.2 147.2l25.6 25.6-12.8-96-268.8-128 12.8 51.2z m0 0" fill="#3E3121" p-id="4694"></path><path d="M480 819.2l38.4-51.2 51.2 51.2 102.4-83.2-51.2-25.6-19.2-12.8-70.4 57.6h-12.8l-51.2-38.4-25.6-19.2-19.2 12.8-51.2 25.6z" fill="#4B4C4B" p-id="4695"></path></svg>
           </div>
               <div class="agent-name">${assistantPatientName}</div>
           </div>
            <div class="bot-answer" data-logId ="${logId}">
            <div class="bot-answer-content">${answer}<br><span class="timestamp">${timestamp}</span>
            <span class="chat-rounds">第${round_num}轮</span></div></div>

            </div>
        </div>
    `;
        return html;
    }

}
function generateAnswerHtml(answer, timestamp) {
    if (answer === null) {
        answer = "gpt-error";
    }
    answer = answer.replace(/\n/g, '<br>');
    const html = `
        <div class="message-content">
            <div class="bot-answer">
                ${answer}<br><span class="timestamp">${timestamp}</span>
            </div>
        </div>
    `;
    return html
}
function generateQuestionHtml(question, timestamp,logId) {
    if (question === null) {
        question = "error";
    }
    question = question.replace(/\n/g, '<br>');
    const html = `
        <div class="message-content justify-content-end">
            <div class="user-question" data-logId="${logId}">
                ${question}<br><span class="timestamp">${timestamp}</span>
            </div>
        <div class="user-avatar-wrapper">
            <div class="user-avatar">
                <svg t="1702520734210" viewBox="0 0 1024 1024"  xmlns="http://www.w3.org/2000/svg" p-id="4264" width="30" height="30"><path d="M517.632 552.149333c-108.714667 0-197.162667-85.546667-197.162667-190.72 0-38.314667 11.690667-75.306667 33.877334-106.922666C391.04 202.026667 452.138667 170.666667 517.632 170.666667c65.408 0 126.464 31.274667 163.2 83.712 7.765333 11.093333 14.250667 22.869333 19.413333 35.072a21.333333 21.333333 0 1 1-39.338666 16.64 147.285333 147.285333 0 0 0-15.018667-27.221334C617.130667 237.824 569.173333 213.333333 517.632 213.333333c-51.626667 0-99.584 24.533333-128.426667 65.621334a143.445333 143.445333 0 0 0-26.069333 82.432c0 81.664 69.290667 148.096 154.453333 148.096 63.402667 0 119.722667-36.437333 143.36-92.8a21.333333 21.333333 0 0 1 39.338667 16.512c-30.378667 72.277333-102.016 118.954667-182.656 118.954666" fill="#3C405D" p-id="4265"></path><path d="M303.829333 627.456c-49.92 0-90.453333 41.088-90.453333 91.605333C213.333333 769.578667 253.866667 810.666667 303.786667 810.666667h416.341333C770.133333 810.666667 810.666667 769.578667 810.666667 719.061333c0-50.517333-40.533333-91.605333-90.453334-91.605333H303.786667zM720.213333 853.333333H303.829333C230.442667 853.333333 170.709333 793.088 170.709333 719.061333 170.666667 645.034667 230.4 584.789333 303.786667 584.789333h416.341333C793.6 584.789333 853.333333 645.034667 853.333333 719.061333 853.333333 793.088 793.6 853.333333 720.213333 853.333333z" fill="#3C405D" p-id="4266"></path></svg>
            </div>
<!--            <div class="user-name">${getUsername()}</div>-->
         </div>

        </div>
    `;
    return html
}

function generateChatgptDoctorScaffoldHtml(answer,timestamp){
    if (answer === null) {
        answer = "gpt-error";
    }
    answer = answer.replace(/\n/g, '<br>');
    const html = `
        <div class="doc-scaffold-content">
            <div class="doc-scaffold-answer">
                ${answer}<br><span class="timestamp">${timestamp}</span>
            </div>
        </div>
    `;
    return html
}


// only for bnu
if (typeof isBNU !== 'undefined' && isBNU) {
    showChatgptBtn = document.getElementById("show-chatgpt-btn");
    if (useChatgptTool) showChatgptBtn.style.backgroundColor = "#FFF2CC"; // 浅黄色



    const INTERNAL_NAV_KEY = '__internalNavFlag__';

    function isSameOrigin(href) {
        const u = new URL(href, location.href);
        return u.origin === location.origin;
    }

    function markInternalNav() {
        // 标记“即将进行站内跳转”（同一 tab 的 sessionStorage 会跨 URL 保留）
        sessionStorage.setItem(INTERNAL_NAV_KEY, '1');
        // 留一点点时间让下一页读取后清除
        setTimeout(() => {
            // 若真的没跳走（如取消了导航），别一直占着标记
            sessionStorage.removeItem(INTERNAL_NAV_KEY);
        }, 5000);
    }

    // 捕获阶段监听站内 <a> 点击（左键、非新标签打开）
    document.addEventListener('click', function (e) {
        const a = e.target.closest('a[href]');
        if (!a) return;
        // 新窗口/新标签（Ctrl/Cmd/中键）不视为“当前页离开”
        const openInNewTab = e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1;
        if (!openInNewTab && isSameOrigin(a.href)) {
            markInternalNav();
        }
    }, true);

    // 监听提交到同域的表单
    document.addEventListener('submit', function (e) {
        const form = e.target;
        const action = form.getAttribute('action') || location.href;
        if (isSameOrigin(action)) {
            markInternalNav();
        }
    }, true);

    // 供你在代码里主动跳转时使用：go('/path')
    window.go = function (href) {
        if (isSameOrigin(href)) markInternalNav();
        location.href = href;
    };

    // 新页面一加载，如果发现“站内跳转”标记，说明是同域切换过来的——清除并视为“未离开”
    if (sessionStorage.getItem(INTERNAL_NAV_KEY) === '1') {
        sessionStorage.removeItem(INTERNAL_NAV_KEY);
    }

    // 去抖，避免瞬时隐藏误判
    let hiddenTimer = null;
    function handleHiddenMaybeLeave() {
        if (sessionStorage.getItem(INTERNAL_NAV_KEY) === '1') return; // 站内跳转，忽略
        clearTimeout(hiddenTimer);
        hiddenTimer = setTimeout(() => {
            if (document.visibilityState === 'hidden') handleLeave();
        }, 300);
    }

    // 从 BFCache 回来或重新可见
    function handleVisible() {
        clearTimeout(hiddenTimer);
        handleReturn();
    }

    // 标签可见性变化
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
            handleHiddenMaybeLeave();
        } else {
            handleVisible();
        }
    });

    // 页面即将被卸载（包含导航、关闭、刷新、跨域去往别处）
    window.addEventListener('pagehide', () => {
        if (sessionStorage.getItem(INTERNAL_NAV_KEY) === '1') return; // 站内跳转，不算离开
        handleLeave();
    });

    // 从 bfcache 恢复
    window.addEventListener('pageshow', handleVisible);

    function handleLeave() {
        console.log("检测到用户离开页面");
        // 弹框提示
        alert("检测到你离开过页面。");
        sendEventMessage("", getCurrentTimestamp(), "PAGE", "LEAVE_PAGE","leave","","page","","","")
    }

    function handleReturn() {
        console.log("检测到用户回到页面");
        sendEventMessage("", getCurrentTimestamp(), "PAGE", "RETURN_PAGE","return","","page","","","")
    }

    // 使用 Page Visibility API
    // document.addEventListener("visibilitychange", function () {
    //     if (document.hidden) {
    //         handleLeave();
    //     } else {
    //         handleReturn();
    //     }
    // });




}

