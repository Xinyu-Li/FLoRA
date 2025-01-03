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
let etherpad_connection  = false;
let userEtherpadSessionID = null;
let userEtherpadPadID = null;
let userEtherpadAuthorID = null;
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

//<<<<<<< HEAD
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
function generateMousePositionData(e, subAction, action)
{
    return e.target.nodeName + "#" +
    (e.target.id === null || e.target.id === "" ? "NO_ID" : e.target.id) +
    ":::" + e.screenX + ":::" + e.screenY + ":::" + e.clientX + ":::" + e.clientY + ":::" +
    subAction + ":::" + action + ":::" + getCurrentTimestamp(); }
//>>>>>>> 6ef24bed (a lot)

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


const starInnerHtml = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
  <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
</svg>`;

const starFillInnerHtml = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
</svg>`;


// =========评价模块需要的函数==========
function setupOneRegenerateAnswerBtn(textArea,logId) {
    let log = $(textArea).find(`[data-logId='${logId}']`);
    let btn = $(log).find(".regenerate-btn")[0];
    btn.addEventListener("click", function(e) {
        // log click event
        // console.log("regenerate click");
        let userChatgptLogId = logId
        // find log的answer和question by logId
        let question = $(textArea).find(".user-question[data-logId='" + userChatgptLogId + "']").text();
        // 如果不能根据logId找到question，说明是第一次提问，此时question应该是currentQuestion —— 拿不到currentQuestion
        // 判断question是undefined还是空字符串
        // console.log("currentQuestion: " + currentQuestion);
        if (question === undefined || question === "") {
            question = currentQuestion;
        }
        let answer = $(textArea).find(".bot-answer[data-logId='" + userChatgptLogId + "']").text();
        // console.log("currentQuestion: " + currentQuestion);
        // 以正则表达式去除掉timestamp内容,timestamp e.g: 5:25:46 PM, 一般情况下，用户问题的最后不会是数字，因此不会被正则匹配到。
        question = question.replace(/(\d+:\d+:\d+\s+[AP]M)/g, "");
        answer = answer.replace(/(\d+:\d+:\d+\s+[AP]M)/g, "");
        // 删除空白的字符
        question = question.trim();
        answer = answer.trim();
        // 显示processing过渡
        let timestamp = new Date().toLocaleTimeString();
        let processInnerHtml = `Processing……<br><span class="timestamp">${timestamp}</span>`
        $(textArea).find(".bot-answer[data-logId='" + userChatgptLogId + "']").find(".bot-answer-content").html(processInnerHtml);
        // 调用api，重新生成answer并修改当前content
        reAskChatgpt(question, userChatgptLogId,textArea,logIdToQuestionIdMapMultiSeparateAgents);
    });
}
function setupOneStarRatingBtn(textArea,logId) {
//     let starInnerHtml = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
//   <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
// </svg>`;
//     let starFillInnerHtml = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
//   <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
// </svg>`;

    let log = $(textArea).find(`[data-logId='${logId}']`);
    stars = $(log).find(".star");
    // console.log(stars);
    stars = Array.from(stars);
    stars.forEach((star, index) => {
        star.addEventListener("click", function(e) {
            // log click event
            // console.log("star click");
            // update rating
            updateRating(stars, index);
            rateChatgptAnswer(logId, index + 1,0)
        });
    });

    function updateRating(stars, index) {
        stars.forEach((star, i) => {
            if (i <= index) {
                star.innerHTML = starFillInnerHtml;
            } else {
                star.innerHTML = starInnerHtml;
            }
        });
    }
}
function setupOneRateThumb(textArea,logId) {
    let log = $(textArea).find(`[data-logId='${logId}']`);
    let usefulBtn = $(log).find(".useful-answer");
    let uselessBtn = $(log).find(".useless-answer");
    usefulBtn.on("click", function(e) {
        // console.log("useful click");
        rateChatgptAnswer(logId, 0,1)
    });
    uselessBtn.on("click", function(e) {
        // console.log("useless click");
        rateChatgptAnswer(logId, 0,2)
    });
    // 以下写法有问题
    // usefulBtn.addEventListener("click", function(e) {
    //     console.log("useful click");
    //     rateChatgptAnswer(logId, 0,1)
    // });
    // uselessBtn.addEventListener("click", function(e) {
    //     console.log("useless click");
    //     rateChatgptAnswer(logId, 0,2)
    // });
}
function setupStarRating() {
//     let starInnerHtml = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
//   <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
// </svg>`;
//     let starFillInnerHtml = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
//   <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
// </svg>`;

    document.querySelectorAll('.bot-answer-rating').forEach((rating) => {
        const stars = rating.querySelectorAll('.star');
        let currentRating = -1;

        stars.forEach((star, idx) => {
            star.addEventListener('click', function(e) {
                // log click event
                // console.log("star click");
                currentRating = idx;
                let userChatgptLogId = $(this).parent().parent().attr("data-logId");
                rateChatgptAnswer( userChatgptLogId, idx + 1,0);
                updateRating(stars,idx);
            });
        });
    });

    function updateRating(stars, index) {
        stars.forEach((star, i) => {
            if (i <= index) {
                star.innerHTML = starFillInnerHtml;
            } else {
                star.innerHTML = starInnerHtml;
            }
        });
    }
}
function rateChatgptAnswer(userChatgptLogId, rating,thumb) {
    $.post(apiBaseUrl + "/rate-chatgpt-answer", {
            userChatgptLogId: userChatgptLogId,
            responseRatingThumb: thumb,
            responseRatingStar: rating,
            userId: userId,
            courseId: currentCourseId
        },
        function(data, status) {
            if (status === "success") {
                // console.log(data)
                console.log("rateChatgptAnswer success");
            } else {
                console.log("rateChatgptAnswer error");
            }
        });
}
function setupRateThumb(){
    document.querySelectorAll('.bot-answer-buttons').forEach((btns) => {
        let usefulBtns = btns.querySelectorAll('.useful-answer');
        let uselessBtns = btns.querySelectorAll('.useless-answer');
        usefulBtns.forEach((btn) => {
            btn.addEventListener('click', function(e) {
                // log click event
                // console.log("useful click");
                let userChatgptLogId = $(this).parent().parent().attr("data-logId");
                rateChatgptAnswer( userChatgptLogId, 0,1);
                // todo: update thumb
            });
        });
        uselessBtns.forEach((btn) => {
            btn.addEventListener('click', function(e) {
                // log click event
                // console.log("useless click");
                let userChatgptLogId = $(this).parent().parent().attr("data-logId");
                rateChatgptAnswer( userChatgptLogId, 0,2);
                //todo: update thumb
            });
        });
    });

    // 设置当按钮点击，class 设为active
    $(".useful-answer").click(function() {
        $(this).addClass("active");
        $(this).siblings().removeClass("active");
    });
    $(".useless-answer").click(function() {
        $(this).addClass("active");
        $(this).siblings().removeClass("active");
    });
}
function setupRegenerateAnswer(textArea,logIdToQuestionIdMap) {
    // console.log("setupRegenerateAnswer================");
    let regenerateBtns = document.querySelectorAll('.regenerate-btn');
    // 先remove之前的click listener
    regenerateBtns.forEach((btn) => {
        btn.addEventListener('click', function(e) {
            // log click event
            // console.log("regenerate click");
            let userChatgptLogId = $(this).parent().parent().attr("data-logId");
            // find log的answer和question by logId
            let question = $(textArea).find(".user-question[data-logId='" + userChatgptLogId + "']").text();
            // 如果不能根据logId找到question，说明是第一次提问，此时question应该是currentQuestion —— 拿不到currentQuestion
            // 判断question是undefined还是空字符串
            // console.log("currentQuestion: " + currentQuestion);
            if (question === undefined || question === "") {
                question = currentQuestion;
            }
            let answer = $(textArea).find(".bot-answer[data-logId='" + userChatgptLogId + "']").text();
            // console.log("currentQuestion: " + currentQuestion);
            // 以正则表达式去除掉timestamp内容,timestamp e.g: 5:25:46 PM, 一般情况下，用户问题的最后不会是数字，因此不会被正则匹配到。
            question = question.replace(/(\d+:\d+:\d+\s+[AP]M)/g, "");
            answer = answer.replace(/(\d+:\d+:\d+\s+[AP]M)/g, "");
            // 删除空白的字符
            question = question.trim();
            answer = answer.trim();
            // 显示processing过渡
            let timestamp = new Date().toLocaleTimeString();
            let processInnerHtml = `Processing……<br><span class="timestamp">${timestamp}</span>`
            $(textArea).find(".bot-answer[data-logId='" + userChatgptLogId + "']").find(".bot-answer-content").html(processInnerHtml);
            // 调用api，重新生成answer并修改当前content
            reAskChatgpt(question, userChatgptLogId,textArea,logIdToQuestionIdMap);
        });
    });
}

function reAskChatgpt(question, userChatgptLogId,textArea,logIdToQuestionIdMap) {

    // console.log("logIdToQuestionIdMap: " + JSON.stringify(logIdToQuestionIdMap));
    let chatgptData = {
        question: question,
        userId: userId,
        courseId: currentCourseId,
        essay: mainEditor.getText(),
        questionId: logIdToQuestionIdMap[userChatgptLogId],
        includeEssay: chatgptPromptIncludeEssay,
        chatgptRoleDescription: chatgptRoleDescription,
        chatgptRole: chatgptRole,
        backgroundFileNameList: chatgptBackgroundFileNameList,
        chatgptParameters: chatgptParameters
    }

    $.ajax({
        url: apiBaseUrl + "/chatgpt",
        type: "POST",
        data: JSON.stringify(chatgptData),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data, status) {
            // console.log("reAskChatgpt success");
            // console.log(data);
            let answer = data.data.chatgptAnswer;
            if (answer === "gpt-error") {
                answer = "There is an error from Chatgpt, Please re-send your question.";
            }
            let timestamp = new Date().toLocaleTimeString();
            let answerInnerHtml = `${answer}<br><span class="timestamp">${timestamp}</span>`
            // console.log(answerInnerHtml);
            $(textArea).find(".bot-answer[data-logId='" + userChatgptLogId + "']").find(".bot-answer-content").html(answerInnerHtml);
        }
    });
}
function renderChatRating(testArea,logId,rating,thumb){
    // find log by data-logId from chatgptTextarea
    let log = $(testArea).find(`[data-logId='${logId}']`);
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

//================================


// 抽离出生成聊天界面提问信息和回复信息html结构的函数，避免因为html结构修改写重复代码
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
            <div class="bot-answer-content">${answer}<br><span class="timestamp">${timestamp}</span></div><span class="rounds">第${round_num}轮</span>
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
                    <span class="timestamp">${timestamp}</span><span class="rounds">第${round_num}轮</span>
                </div>
            </div>
        </div>
    `;
        return html;
    }

}

function generateStructureExpertAnswerHtml(answer, timestamp, questionId, logId, ratingVisible=true, round_num){
    if (answer === null) {
        answer = "gpt-error";
    }
    answer = answer.replace(/\n/g, '<br>');
    if (ratingVisible) {
        const html = `
        <div class="message-content">
          <div class="agent-avatar-wrapper">
            <div class="bot-avatar">
<svg t="1717136978189" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6006" width="30" height="30"><path d="M903.616 0C969.984 0 1024 54.016 1024 120.384V903.68A120.576 120.576 0 0 1 903.552 1024H120.384A120.512 120.512 0 0 1 0 903.616V120.32C0 54.016 54.016 0 120.384 0H903.68z m0 69.12H120.32a51.328 51.328 0 0 0-51.264 51.264V903.68c0 28.288 23.04 51.264 51.264 51.264H903.68c28.288 0 51.264-23.04 51.264-51.264V120.32a51.392 51.392 0 0 0-51.264-51.264zM501.952 288v58.56H268.928v115.904h218.944v58.56H268.928v126.528h242.944v58.496H200.384V288h301.568z m224.832 107.136c75.52 0 113.6 40.96 113.6 124.16v186.752h-66.752V525.12c0-49.728-22.848-74.368-68.48-74.368a61.12 61.12 0 0 0-43.328 17.6c-14.08 12.864-22.272 31.616-24.64 55.68v182.016H570.432v-302.72h66.752v35.2c9.408-11.264 19.84-20.672 31.232-27.52l8.64-4.736c15.424-7.616 32.512-11.392 49.728-11.136z" fill="#efb336" p-id="6007"></path></svg>      
           </div>
                <div class="agent-name">${agents.StructureExpert.agentDisplayName}</div>
           </div>
            <div class="structure-expert-bg bot-answer" data-logId ="${logId}">
            <div class="bot-answer-content">${answer}<br><span class="timestamp">${timestamp}</span></div><span class="rounds">第${round_num}轮</span>
            
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
<svg t="1717136978189" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6006" width="35" height="35"><path d="M903.616 0C969.984 0 1024 54.016 1024 120.384V903.68A120.576 120.576 0 0 1 903.552 1024H120.384A120.512 120.512 0 0 1 0 903.616V120.32C0 54.016 54.016 0 120.384 0H903.68z m0 69.12H120.32a51.328 51.328 0 0 0-51.264 51.264V903.68c0 28.288 23.04 51.264 51.264 51.264H903.68c28.288 0 51.264-23.04 51.264-51.264V120.32a51.392 51.392 0 0 0-51.264-51.264zM501.952 288v58.56H268.928v115.904h218.944v58.56H268.928v126.528h242.944v58.496H200.384V288h301.568z m224.832 107.136c75.52 0 113.6 40.96 113.6 124.16v186.752h-66.752V525.12c0-49.728-22.848-74.368-68.48-74.368a61.12 61.12 0 0 0-43.328 17.6c-14.08 12.864-22.272 31.616-24.64 55.68v182.016H570.432v-302.72h66.752v35.2c9.408-11.264 19.84-20.672 31.232-27.52l8.64-4.736c15.424-7.616 32.512-11.392 49.728-11.136z" fill="#efb336" p-id="6007"></path></svg>    
           </div>
               <div class="agent-name">${agents.StructureExpert.agentDisplayName}</div>
           </div>
            <div class="structure-expert-bg bot-answer" data-logId ="${logId}">
            <div class="bot-answer-content">${answer}<br><span class="timestamp">${timestamp}</span>
<!--            <span class="rounds">第${round_num}轮</span></div></div>-->
           
            </div>
        </div>
    `;
        return html;
    }
}
function generateGrammarExpertAnswerHtml(answer, timestamp, questionId, logId, ratingVisible=true, round_num){
    if (answer === null) {
        answer = "gpt-error";
    }
    answer = answer.replace(/\n/g, '<br>');
    if (ratingVisible) {
        const html = `
        <div class="message-content">
          <div class="agent-avatar-wrapper">
            <div class="bot-avatar">
            <svg t="1717136978189" viewBox="0 0 1024 1024"  xmlns="http://www.w3.org/2000/svg" p-id="6006" width="35" height="35"><path d="M903.616 0C969.984 0 1024 54.016 1024 120.384V903.68A120.576 120.576 0 0 1 903.552 1024H120.384A120.512 120.512 0 0 1 0 903.616V120.32C0 54.016 54.016 0 120.384 0H903.68z m0 69.12H120.32a51.328 51.328 0 0 0-51.264 51.264V903.68c0 28.288 23.04 51.264 51.264 51.264H903.68c28.288 0 51.264-23.04 51.264-51.264V120.32a51.392 51.392 0 0 0-51.264-51.264zM501.952 288v58.56H268.928v115.904h218.944v58.56H268.928v126.528h242.944v58.496H200.384V288h301.568z m224.832 107.136c75.52 0 113.6 40.96 113.6 124.16v186.752h-66.752V525.12c0-49.728-22.848-74.368-68.48-74.368a61.12 61.12 0 0 0-43.328 17.6c-14.08 12.864-22.272 31.616-24.64 55.68v182.016H570.432v-302.72h66.752v35.2c9.408-11.264 19.84-20.672 31.232-27.52l8.64-4.736c15.424-7.616 32.512-11.392 49.728-11.136z" fill="#1296db" p-id="6007"></path></svg>
          </div>
                <div class="agent-name">${agents.GrammarExpert.agentDisplayName}</div>
           </div>
            <div class="bot-answer grammar-expert-bg" data-logId ="${logId}">
            <div class="bot-answer-content">${answer}<br><span class="timestamp">${timestamp}</span></div><span class="rounds">第${round_num}轮</span>
            
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
            <svg t="1717136978189" viewBox="0 0 1024 1024"  xmlns="http://www.w3.org/2000/svg" p-id="6006" width="35" height="35"><path d="M903.616 0C969.984 0 1024 54.016 1024 120.384V903.68A120.576 120.576 0 0 1 903.552 1024H120.384A120.512 120.512 0 0 1 0 903.616V120.32C0 54.016 54.016 0 120.384 0H903.68z m0 69.12H120.32a51.328 51.328 0 0 0-51.264 51.264V903.68c0 28.288 23.04 51.264 51.264 51.264H903.68c28.288 0 51.264-23.04 51.264-51.264V120.32a51.392 51.392 0 0 0-51.264-51.264zM501.952 288v58.56H268.928v115.904h218.944v58.56H268.928v126.528h242.944v58.496H200.384V288h301.568z m224.832 107.136c75.52 0 113.6 40.96 113.6 124.16v186.752h-66.752V525.12c0-49.728-22.848-74.368-68.48-74.368a61.12 61.12 0 0 0-43.328 17.6c-14.08 12.864-22.272 31.616-24.64 55.68v182.016H570.432v-302.72h66.752v35.2c9.408-11.264 19.84-20.672 31.232-27.52l8.64-4.736c15.424-7.616 32.512-11.392 49.728-11.136z" fill="#1296db" p-id="6007"></path></svg>
          </div>
               <div class="agent-name">${agents.GrammarExpert.agentDisplayName}</div>
           </div>
            <div class="bot-answer grammar-expert-bg" data-logId ="${logId}">
            <div class="bot-answer-content">${answer}<br><span class="timestamp">${timestamp}</span>
<!--            <span class="rounds">第${round_num}轮</span></div></div>-->
           
            </div>
        </div>
    `;
        return html;
    }
}
function generateLanguageExpertAnswerHtml(answer, timestamp, questionId, logId, ratingVisible=true, round_num){
    if (answer === null) {
        answer = "gpt-error";
    }
    answer = answer.replace(/\n/g, '<br>');
    if (ratingVisible) {
        const html = `
        <div class="message-content">
          <div class="agent-avatar-wrapper">
            <div class="bot-avatar">
<svg t="1717136978189" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6006" width="35" height="35"><path d="M903.616 0C969.984 0 1024 54.016 1024 120.384V903.68A120.576 120.576 0 0 1 903.552 1024H120.384A120.512 120.512 0 0 1 0 903.616V120.32C0 54.016 54.016 0 120.384 0H903.68z m0 69.12H120.32a51.328 51.328 0 0 0-51.264 51.264V903.68c0 28.288 23.04 51.264 51.264 51.264H903.68c28.288 0 51.264-23.04 51.264-51.264V120.32a51.392 51.392 0 0 0-51.264-51.264zM501.952 288v58.56H268.928v115.904h218.944v58.56H268.928v126.528h242.944v58.496H200.384V288h301.568z m224.832 107.136c75.52 0 113.6 40.96 113.6 124.16v186.752h-66.752V525.12c0-49.728-22.848-74.368-68.48-74.368a61.12 61.12 0 0 0-43.328 17.6c-14.08 12.864-22.272 31.616-24.64 55.68v182.016H570.432v-302.72h66.752v35.2c9.408-11.264 19.84-20.672 31.232-27.52l8.64-4.736c15.424-7.616 32.512-11.392 49.728-11.136z" fill="#ed0671" p-id="6007"></path></svg>        
           </div>
                <div class="agent-name">${agents.LanguageExpert.agentDisplayName}</div>
           </div>
            <div class="language-expert-bg bot-answer" data-logId ="${logId}">
            <div class="bot-answer-content">${answer}<br><span class="timestamp">${timestamp}</span></div><span class="rounds">第${round_num}轮</span>
            
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
<svg t="1717136978189" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6006" width="35" height="35"><path d="M903.616 0C969.984 0 1024 54.016 1024 120.384V903.68A120.576 120.576 0 0 1 903.552 1024H120.384A120.512 120.512 0 0 1 0 903.616V120.32C0 54.016 54.016 0 120.384 0H903.68z m0 69.12H120.32a51.328 51.328 0 0 0-51.264 51.264V903.68c0 28.288 23.04 51.264 51.264 51.264H903.68c28.288 0 51.264-23.04 51.264-51.264V120.32a51.392 51.392 0 0 0-51.264-51.264zM501.952 288v58.56H268.928v115.904h218.944v58.56H268.928v126.528h242.944v58.496H200.384V288h301.568z m224.832 107.136c75.52 0 113.6 40.96 113.6 124.16v186.752h-66.752V525.12c0-49.728-22.848-74.368-68.48-74.368a61.12 61.12 0 0 0-43.328 17.6c-14.08 12.864-22.272 31.616-24.64 55.68v182.016H570.432v-302.72h66.752v35.2c9.408-11.264 19.84-20.672 31.232-27.52l8.64-4.736c15.424-7.616 32.512-11.392 49.728-11.136z" fill="#ed0671" p-id="6007"></path></svg>  
           </div>
               <div class="agent-name">${agents.LanguageExpert.agentDisplayName}</div>
           </div>
            <div class="language-expert-bg bot-answer" data-logId ="${logId}">
            <div class="bot-answer-content">${answer}<br><span class="timestamp">${timestamp}</span>
<!--            <span class="rounds">第${round_num}轮</span></div></div>-->
           
            </div>
        </div>
    `;
        return html;
    }
}
function generateMediatorAnswerHtml(answer, timestamp, questionId, logId, ratingVisible=true, round_num){
    if (answer === null) {
        answer = "gpt-error";
    }
    answer = answer.replace(/\n/g, '<br>');
    if (ratingVisible) {
        const html = `
        <div class="message-content">
          <div class="agent-avatar-wrapper">
            <div class="bot-avatar">
<svg t="1721961683121" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5712" width="35" height="35"><path d="M903.616 0C969.984 0 1024 54.016 1024 120.384V903.68A120.576 120.576 0 0 1 903.552 1024H120.384A120.512 120.512 0 0 1 0 903.616V120.32C0 54.016 54.016 0 120.384 0H903.68z m0 69.12H120.32a51.328 51.328 0 0 0-51.264 51.264V903.68c0 28.288 23.04 51.264 51.264 51.264H903.68c28.288 0 51.264-23.04 51.264-51.264V120.32a51.392 51.392 0 0 0-51.264-51.264zM501.952 288v58.56H268.928v115.904h218.944v58.56H268.928v126.528h242.944v58.496H200.384V288h301.568z m224.832 107.136c75.52 0 113.6 40.96 113.6 124.16v186.752h-66.752V525.12c0-49.728-22.848-74.368-68.48-74.368a61.12 61.12 0 0 0-43.328 17.6c-14.08 12.864-22.272 31.616-24.64 55.68v182.016H570.432v-302.72h66.752v35.2c9.408-11.264 19.84-20.672 31.232-27.52l8.64-4.736c15.424-7.616 32.512-11.392 49.728-11.136z" fill="#f9d6ff" p-id="5713"></path></svg>
</div>
                <div class="agent-name">${agents.Mediator.agentDisplayName}</div>
           </div>
            <div class="mediator-bg bot-answer" data-logId ="${logId}">
            <div class="bot-answer-content">${answer}<br><span class="timestamp">${timestamp}</span></div><span class="rounds">第${round_num}轮</span>
            
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
            <svg t="1721961683121" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5712" width="35" height="35"><path d="M903.616 0C969.984 0 1024 54.016 1024 120.384V903.68A120.576 120.576 0 0 1 903.552 1024H120.384A120.512 120.512 0 0 1 0 903.616V120.32C0 54.016 54.016 0 120.384 0H903.68z m0 69.12H120.32a51.328 51.328 0 0 0-51.264 51.264V903.68c0 28.288 23.04 51.264 51.264 51.264H903.68c28.288 0 51.264-23.04 51.264-51.264V120.32a51.392 51.392 0 0 0-51.264-51.264zM501.952 288v58.56H268.928v115.904h218.944v58.56H268.928v126.528h242.944v58.496H200.384V288h301.568z m224.832 107.136c75.52 0 113.6 40.96 113.6 124.16v186.752h-66.752V525.12c0-49.728-22.848-74.368-68.48-74.368a61.12 61.12 0 0 0-43.328 17.6c-14.08 12.864-22.272 31.616-24.64 55.68v182.016H570.432v-302.72h66.752v35.2c9.408-11.264 19.84-20.672 31.232-27.52l8.64-4.736c15.424-7.616 32.512-11.392 49.728-11.136z" fill="#f9d6ff" p-id="5713"></path></svg>
</div>
               <div class="agent-name">${agents.Mediator.agentDisplayName}</div>
           </div>
            <div class="mediator-bg bot-answer" data-logId ="${logId}">
            <div class="bot-answer-content">${answer}<br><span class="timestamp">${timestamp}</span>
<!--            <span class="rounds">第${round_num}轮</span></div></div>-->
           
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
            <div class="bot-answer-content">${answer}<br><span class="timestamp">${timestamp}</span></div><span class="rounds">第${round_num}轮</span>
            
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
            <span class="rounds">第${round_num}轮</span></div></div>
           
            </div>
        </div>
    `;
        return html;
    }

}




/**
 * 把此方法作为通用chatgpt的answer生成方法
 */
function generateGeneralAgentAnswerHtml(answer, timestamp, questionId, logId, agentDisplayName, agentAvatarSvg, useRating, roundNumber) {
    if (answer === null) {
        answer = "gpt-error";
    }
    answer = answer.replace(/\n/g, '<br>');

    const ratingHtml = `                <!--            一排按钮，点赞、点踩、重新生成答案-->
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
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-arrow-repeat" viewBox="0 0 16 16" style="vertical-align:top"><path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
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
        </div>`;

    return `
        <div class="message-content">
            <div class="agent-avatar-wrapper">
                <div class="bot-avatar">
                    ${agentAvatarSvg}
                </div>
                <div class="agent-name">${agentDisplayName}</div>
            </div>
            <!--      TODO data-logId 命名需要全部改成小写       -->
            <div class="bot-answer" data-logId ="${logId}">
                <div class="bot-answer-content">${answer}<br><span class="timestamp">${timestamp}</span><span class="rounds">round: ${roundNumber}</span></div>
                ${useRating ? ratingHtml : ''}
            </div>
        </div>
    `;
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

function createProcessingMessage() {
    const timestamp = new Date().toLocaleTimeString();
    const processingMessage = document.createElement("div");  // 此处必须要有一个dom 对象
    processingMessage.innerHTML = generateAnswerHtml("Processing", timestamp, "");
    return processingMessage;
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
    if (messageObj.actionLabel === "START" || messageObj.actionLabel === "END") {
        //直接发送给服务器
        console.log("messageObj.actionLabel: ",messageObj.actionLabel)
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

goal_set = {};
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

class TreeNode {
    constructor(value) {
        this.value = value; // The value of the node
        this.children = []; // An array to hold child nodes
    }

    // Method to add a child node
    addChild(childNode) {
        this.children.push(childNode);
    }

    // Method to find a node by value (depth-first search)
    findNode(value) {
        if (this.value === value) {
            return this; // Return the current node if it matches
        }

        for (const child of this.children) {
            const result = child.findNode(value); // Recur on child nodes
            if (result) {
                return result; // Return the found node
            }
        }

        return null; // Return null if not found
    }

//    // Method to traverse the tree (for demonstration)
//    traverse(callback) {
//        callback(this.value); // Process the current node
//        this.children.forEach(child => child.traverse(callback)); // Recur for children
//    }
        traverse(callback, level = 0) {
        // Create an indented string based on the level
            const indent = ' '.repeat(level * 4); // 4 spaces per level
            const formattedValue = `${indent}${this.value}`; // Indent and format the value
            callback(formattedValue); // Call the callback with the formatted value
            this.children.forEach(child => child.traverse(callback, level + 1)); // Recur for children
            }
}

// Tree class to manage the overall tree structure
class Forest {
    constructor() {
        this.roots = []; // Initialize with an empty array of root nodes
    }

    // Method to add a new root node
    addRoot(value) {
        const newRoot = new TreeNode(value);
        this.roots.push(newRoot);
    }

    // Method to find a parent node for a new child
    findParentNode(parentValue) {
        for (const root of this.roots) {
            const parentNode = root.findNode(parentValue);
            if (parentNode) {
                return parentNode; // Return the first found parent node
            }
        }
        return null; // Return null if not found
    }

    // Method to add a new child node
    addChild(parentValue, childValue) {
        const parentNode = this.findParentNode(parentValue); // Find the parent node
        if (parentNode) {
            const newNode = new TreeNode(childValue); // Create a new child node
            parentNode.addChild(newNode); // Add the child node to the parent
        } else {
            console.log(`Parent node with value "${parentValue}" not found.`);
        }
    }

//    // Method to traverse the forest
//    traverse(callback) {
//        this.roots.forEach(root => root.traverse(callback)); // Traverse each root
    //    }
    // Method to traverse the forest and format output
    traverse(callback) {
        this.roots.forEach(root => root.traverse(callback)); // Traverse each root
    }
}



function restructureData2(data) {
    const structured = {};
    for (const key in data) {
        if (Array.isArray(data[key])) {
            structured[key] = new Forest();
            const allItems = {};
            data[key].forEach(item => {
                if (item.dependency === "none") {
                    // This is a top-level parent; initialize in the structured object
                    //console.log("@@@@@item.choiceContent: ", item.choicecontent)
                    structured[key].addRoot(item.questionName+" -> "+ item.choiceContent)
                }
                else{
                    structured[key].addChild(item.dependency,item.questionName+" -> "+ item.choiceContent)
                }
              });
        }
    }
    return structured;
}

function generateTextList(forest) {
    console.log("forest: ", forest);
    const output = [];
    //let counter = 1;

    // Helper function to generate a sentence for the second-level nodes
    function processSecondLevel(node, parentGoalName, parentGoal) {
        // Check if the node has children and if it's an array
        if (node.children && Array.isArray(node.children)) {
            // Collect all the third-level items (e.g., "amount", "time") for this second-level item
            const groupedItems = node.children.map(child => {
                return cleanText(child.value.split(" -> ")[1]).toLowerCase();; // Get the child value which will contain the third-level details
            });

            // Format and push the grouped sentence for the second-level items
            if (groupedItems.length > 0) {
                output.push(`${parentGoal} ${groupedItems.join(" ")}`);
            }
        } else {
            console.log("No children found for node:", parentGoal);
        }
    }
    function cleanText(text) {
        // Regular expression to remove "a)", "b)", etc. from the text
        return text.replace(/^\s*[a-zA-Z]\)\s*/g, '').trim(); // Removes leading "a)", "b)", etc.
    }

    // Traverse the roots of the forest (top-level nodes)
    forest.roots.forEach(root => {
        // Check if root has children and if it's an array
        if (root.children && Array.isArray(root.children)) {
            // Process the root node (level 1)
            output.push(`Your ${cleanText(root.value.split(" -> ")[0])} goal is ${cleanText(root.value.split(" -> ")[1])}`);

            // Now, process the second-level nodes (children of the root)
            root.children.forEach(secondLevelNode => {
                // Extract the second-level goal (e.g., "Cognition", "MC", etc.)
                const secondLevelGoalName = secondLevelNode.value.split(" -> ")[0];
                const secondLevelGoal = cleanText(secondLevelNode.value.split(" -> ")[1]);

                // Format the third-level details (amount, time)
                processSecondLevel(secondLevelNode, secondLevelGoalName, secondLevelGoal);
            });
        } else {
            console.log("No children found for root node:", root.value);
        }
    });

    return output;
}


//const result = restructureData(data);
//console.log(JSON.stringify(result, null, 2));



/** for collaborative writing, not used yet */
function getEtherpadName() {
    console.log("Ready to excute getEtherpadName");
    username = username == null ? getUsername() : username;
    console.log(userId);
    console.log(username);
    console.log("getEtherpadName:", apiBaseUrl + "/collaborate-write");
    $.post(apiBaseUrl + "/collaborate-write", {
        userId: userId,
        userName: username,
        userGroup: getLastname,
        //userGroup: "001",  //TODO 可以更改，如果moodle 出现分组
    }, function(data, status) {
        if (status === "success") {
            console.log("success connected to etherpad and get response as ", data);
            if (data.data!=null){
                const padID = data.data.padID;
                const sessionID = data.data.sessionID;
                const authorID = data.data.authorID;
                userEtherpadSessionID = sessionID;
                userEtherpadPadID = padID;
                userEtherpadAuthorID = authorID;
                etherpad_connection = true;
                console.log("userEtherpadSessionID: ",userEtherpadSessionID);
            }
            else{
                console.log("connected to etherpad but userEtherpadSessionID is null!");
            }

            // console.log("-------document.cookie before setup--------: ",document.cookie)
            //setSessionCookie(userEtherpadSessionID,"/myapi")
            setSessionCookie(userEtherpadSessionID,"/")
            console.log("userEtherpadSessionID: ",userEtherpadSessionID);

            // console.log("-------document.cookie after setup--------: ",document.cookie)

            if (etherpad_connection&&userEtherpadSessionID!=null){
                collaborateWriteJQObj.pad({'padId': userEtherpadPadID, 'userName': username,});
            }
            else{
                console.log("Need to connect to etherpad service first or get padID first!");
            }
        }
        else {
            alert("An error occurred while connecting etherpad!.");
             collaborateWriteJQObj.pad({'padId': padID, 'userName': username,});
            // console.log("---------create collaborate-pad-----------")
        }
    });
}



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


    mybody.oncopy = function(e) {
        // console.log("on copy");
        let msg = window.getSelection().toString();
        e.clipboardData.setData("text", msg); //此处名称必须用text，其他会得到空值
        hideAnnotationToolbox(); // 隐藏annotation toolbox，当点击其他按钮时候
    };

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

        // console.log(mousemoveData);
        // let tempMouseMoveData = mousemoveData.map(mv => mv.replace(/PAGE_NAVIGATION/g, "READING"));
        // let tempMouseWheelData = mousewheelData.map(mv => mv.replace(/PAGE_NAVIGATION/g, "READING"));
        // console.log(tempMouseMoveData);
        // mousemoveData = tempMouseMoveData;
        // mousewheelData = tempMouseWheelData;
        //过了5秒才触发的
        setInterval(function() {
            if (allEventsDataBefore6Second.length !== 0) {
                offTaskStartTime = 0; //只要鼠标在移动，就标识学生还在使用系统，
            } else {
                if (offTaskStartTime === 0) {
                    offTaskStartTime = getCurrentTimestamp(); //如果鼠标不移动，则开始记录offtask
                }
            }
            /*// console.log("triggered every 5 second................................" + new Date().getTime());
            if (mousemoveData.length !== 0 || mousewheelData.length !== 0) {
                // let lastPageTimestamp = localStorage.getItem("myLastPageTimestamp") == null ? getCurrentTimestamp() : localStorage.getItem("myLastPageTimestamp");

                // console.log(mousemoveData);
                $.post(apiBaseUrl + "/trace-extra", {
                    userId: userId,
                    saveTime: getCurrentTimestamp(),
                    url: getCurrentUrl(),
                    username: username == null ? getUsername() : username,
                    firstname: firstname == null ? getFirstname() : firstname,

                    lastname: lastname == null ? getLastname() : lastname,
                    source: "EXTRA",
                    mousemoveData: mousemoveData,
                    mousewheelData: mousewheelData,

                    windowInnerWidth: window.innerWidth,
                    windowInnerHeight: window.innerHeight,
                    screenWidth: window.screen.width,
                    screenHeight: window.screen.height,
                    courseId: currentCourseId
                    // eventValue: "NEXT_PAGE_URL:::" + e.target.href
                });
                mousemoveData = [];
                mousewheelData = [];
                offTaskStartTime = 0; //只要鼠标在移动，就标识学生还在使用系统，
            } else {
                if (offTaskStartTime === 0) {
                    offTaskStartTime = getCurrentTimestamp(); //如果鼠标不移动，则开始记录offtask
                }
            }*/
        }, 5000); //离开页面时候也需要执行
    }, 6001);

    setInterval(function () {
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
    }, 60000); //每1分钟检查一次 来判断用户是否off task

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


// API call to the backend transcription service
async function fetchTranscription(formData){
    try {
        const response = await fetch('/voice/transcription', {
            method: 'POST',
            body: formData
        });
        const result = await response.json();
        console.log('Success:', result);
        return result
    } catch (error) {
        console.error('Error:', error);
    }
}

// API call to the backend text to voice service
async function fetchTextToSpeechURI(jsonData){
    try {
        const response = await fetch('/voice/text-to-speech', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: jsonData
        });

        return response
    } catch (error) {
        console.error('Error:', error);
    }
}

 function createAudioTag(audioSource, timestamp, promptId, logId, ratingVisible=true) {
    if (audioSource === null) {
        return generateChatgptAnswerHtml("text-to-voice-error", timestamp, promptId, logId, ratingVisible);
    }
    if (ratingVisible) {
        const html = `
        <div class="message-content">
            <div class="bot-avatar">
                <svg id="chatGptPanelSvg" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-search" viewBox="0 0 41 41"><path d="M37.5324 16.8707C37.9808 15.5241 38.1363 14.0974 37.9886 12.6859C37.8409 11.2744 37.3934 9.91076 36.676 8.68622C35.6126 6.83404 33.9882 5.3676 32.0373 4.4985C30.0864 3.62941 27.9098 3.40259 25.8215 3.85078C24.8796 2.7893 23.7219 1.94125 22.4257 1.36341C21.1295 0.785575 19.7249 0.491269 18.3058 0.500197C16.1708 0.495044 14.0893 1.16803 12.3614 2.42214C10.6335 3.67624 9.34853 5.44666 8.6917 7.47815C7.30085 7.76286 5.98686 8.3414 4.8377 9.17505C3.68854 10.0087 2.73073 11.0782 2.02839 12.312C0.956464 14.1591 0.498905 16.2988 0.721698 18.4228C0.944492 20.5467 1.83612 22.5449 3.268 24.1293C2.81966 25.4759 2.66413 26.9026 2.81182 28.3141C2.95951 29.7256 3.40701 31.0892 4.12437 32.3138C5.18791 34.1659 6.8123 35.6322 8.76321 36.5013C10.7141 37.3704 12.8907 37.5973 14.9789 37.1492C15.9208 38.2107 17.0786 39.0587 18.3747 39.6366C19.6709 40.2144 21.0755 40.5087 22.4946 40.4998C24.6307 40.5054 26.7133 39.8321 28.4418 38.5772C30.1704 37.3223 31.4556 35.5506 32.1119 33.5179C33.5027 33.2332 34.8167 32.6547 35.9659 31.821C37.115 30.9874 38.0728 29.9178 38.7752 28.684C39.8458 26.8371 40.3023 24.6979 40.0789 22.5748C39.8556 20.4517 38.9639 18.4544 37.5324 16.8707ZM22.4978 37.8849C20.7443 37.8874 19.0459 37.2733 17.6994 36.1501C17.7601 36.117 17.8666 36.0586 17.936 36.0161L25.9004 31.4156C26.1003 31.3019 26.2663 31.137 26.3813 30.9378C26.4964 30.7386 26.5563 30.5124 26.5549 30.2825V19.0542L29.9213 20.998C29.9389 21.0068 29.9541 21.0198 29.9656 21.0359C29.977 21.052 29.9842 21.0707 29.9867 21.0902V30.3889C29.9842 32.375 29.1946 34.2791 27.7909 35.6841C26.3872 37.0892 24.4838 37.8806 22.4978 37.8849ZM6.39227 31.0064C5.51397 29.4888 5.19742 27.7107 5.49804 25.9832C5.55718 26.0187 5.66048 26.0818 5.73461 26.1244L13.699 30.7248C13.8975 30.8408 14.1233 30.902 14.3532 30.902C14.583 30.902 14.8088 30.8408 15.0073 30.7248L24.731 25.1103V28.9979C24.7321 29.0177 24.7283 29.0376 24.7199 29.0556C24.7115 29.0736 24.6988 29.0893 24.6829 29.1012L16.6317 33.7497C14.9096 34.7416 12.8643 35.0097 10.9447 34.4954C9.02506 33.9811 7.38785 32.7263 6.39227 31.0064ZM4.29707 13.6194C5.17156 12.0998 6.55279 10.9364 8.19885 10.3327C8.19885 10.4013 8.19491 10.5228 8.19491 10.6071V19.808C8.19351 20.0378 8.25334 20.2638 8.36823 20.4629C8.48312 20.6619 8.64893 20.8267 8.84863 20.9404L18.5723 26.5542L15.206 28.4979C15.1894 28.5089 15.1703 28.5155 15.1505 28.5173C15.1307 28.5191 15.1107 28.516 15.0924 28.5082L7.04046 23.8557C5.32135 22.8601 4.06716 21.2235 3.55289 19.3046C3.03862 17.3858 3.30624 15.3413 4.29707 13.6194ZM31.955 20.0556L22.2312 14.4411L25.5976 12.4981C25.6142 12.4872 25.6333 12.4805 25.6531 12.4787C25.6729 12.4769 25.6928 12.4801 25.7111 12.4879L33.7631 17.1364C34.9967 17.849 36.0017 18.8982 36.6606 20.1613C37.3194 21.4244 37.6047 22.849 37.4832 24.2684C37.3617 25.6878 36.8382 27.0432 35.9743 28.1759C35.1103 29.3086 33.9415 30.1717 32.6047 30.6641C32.6047 30.5947 32.6047 30.4733 32.6047 30.3889V21.188C32.6066 20.9586 32.5474 20.7328 32.4332 20.5338C32.319 20.3348 32.154 20.1698 31.955 20.0556ZM35.3055 15.0128C35.2464 14.9765 35.1431 14.9142 35.069 14.8717L27.1045 10.2712C26.906 10.1554 26.6803 10.0943 26.4504 10.0943C26.2206 10.0943 25.9948 10.1554 25.7963 10.2712L16.0726 15.8858V11.9982C16.0715 11.9783 16.0753 11.9585 16.0837 11.9405C16.0921 11.9225 16.1048 11.9068 16.1207 11.8949L24.1719 7.25025C25.4053 6.53903 26.8158 6.19376 28.2383 6.25482C29.6608 6.31589 31.0364 6.78077 32.2044 7.59508C33.3723 8.40939 34.2842 9.53945 34.8334 10.8531C35.3826 12.1667 35.5464 13.6095 35.3055 15.0128ZM14.2424 21.9419L10.8752 19.9981C10.8576 19.9893 10.8423 19.9763 10.8309 19.9602C10.8195 19.9441 10.8122 19.9254 10.8098 19.9058V10.6071C10.8107 9.18295 11.2173 7.78848 11.9819 6.58696C12.7466 5.38544 13.8377 4.42659 15.1275 3.82264C16.4173 3.21869 17.8524 2.99464 19.2649 3.1767C20.6775 3.35876 22.0089 3.93941 23.1034 4.85067C23.0427 4.88379 22.937 4.94215 22.8668 4.98473L14.9024 9.58517C14.7025 9.69878 14.5366 9.86356 14.4215 10.0626C14.3065 10.2616 14.2466 10.4877 14.2479 10.7175L14.2424 21.9419ZM16.071 17.9991L20.4018 15.4978L24.7325 17.9975V22.9985L20.4018 25.4983L16.071 22.9985V17.9991Z"/></svg>
            </div>
            <div class="bot-answer" data-logId ="${logId}">

            <div class="bot-answer-content">
                <audio controls autoplay>
                    <source src="${audioSource}" type="audio/mp3" />
                    Error, audio not found.
                </audio>
            <br><span class="timestamp">${timestamp}</span></div>
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

        </div>`;
        return html;
    }
    else {
        const html = `<div class="message-content">
            <div class="bot-avatar">
                <svg id="chatGptPanelSvg" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-search" viewBox="0 0 41 41"><path d="M37.5324 16.8707C37.9808 15.5241 38.1363 14.0974 37.9886 12.6859C37.8409 11.2744 37.3934 9.91076 36.676 8.68622C35.6126 6.83404 33.9882 5.3676 32.0373 4.4985C30.0864 3.62941 27.9098 3.40259 25.8215 3.85078C24.8796 2.7893 23.7219 1.94125 22.4257 1.36341C21.1295 0.785575 19.7249 0.491269 18.3058 0.500197C16.1708 0.495044 14.0893 1.16803 12.3614 2.42214C10.6335 3.67624 9.34853 5.44666 8.6917 7.47815C7.30085 7.76286 5.98686 8.3414 4.8377 9.17505C3.68854 10.0087 2.73073 11.0782 2.02839 12.312C0.956464 14.1591 0.498905 16.2988 0.721698 18.4228C0.944492 20.5467 1.83612 22.5449 3.268 24.1293C2.81966 25.4759 2.66413 26.9026 2.81182 28.3141C2.95951 29.7256 3.40701 31.0892 4.12437 32.3138C5.18791 34.1659 6.8123 35.6322 8.76321 36.5013C10.7141 37.3704 12.8907 37.5973 14.9789 37.1492C15.9208 38.2107 17.0786 39.0587 18.3747 39.6366C19.6709 40.2144 21.0755 40.5087 22.4946 40.4998C24.6307 40.5054 26.7133 39.8321 28.4418 38.5772C30.1704 37.3223 31.4556 35.5506 32.1119 33.5179C33.5027 33.2332 34.8167 32.6547 35.9659 31.821C37.115 30.9874 38.0728 29.9178 38.7752 28.684C39.8458 26.8371 40.3023 24.6979 40.0789 22.5748C39.8556 20.4517 38.9639 18.4544 37.5324 16.8707ZM22.4978 37.8849C20.7443 37.8874 19.0459 37.2733 17.6994 36.1501C17.7601 36.117 17.8666 36.0586 17.936 36.0161L25.9004 31.4156C26.1003 31.3019 26.2663 31.137 26.3813 30.9378C26.4964 30.7386 26.5563 30.5124 26.5549 30.2825V19.0542L29.9213 20.998C29.9389 21.0068 29.9541 21.0198 29.9656 21.0359C29.977 21.052 29.9842 21.0707 29.9867 21.0902V30.3889C29.9842 32.375 29.1946 34.2791 27.7909 35.6841C26.3872 37.0892 24.4838 37.8806 22.4978 37.8849ZM6.39227 31.0064C5.51397 29.4888 5.19742 27.7107 5.49804 25.9832C5.55718 26.0187 5.66048 26.0818 5.73461 26.1244L13.699 30.7248C13.8975 30.8408 14.1233 30.902 14.3532 30.902C14.583 30.902 14.8088 30.8408 15.0073 30.7248L24.731 25.1103V28.9979C24.7321 29.0177 24.7283 29.0376 24.7199 29.0556C24.7115 29.0736 24.6988 29.0893 24.6829 29.1012L16.6317 33.7497C14.9096 34.7416 12.8643 35.0097 10.9447 34.4954C9.02506 33.9811 7.38785 32.7263 6.39227 31.0064ZM4.29707 13.6194C5.17156 12.0998 6.55279 10.9364 8.19885 10.3327C8.19885 10.4013 8.19491 10.5228 8.19491 10.6071V19.808C8.19351 20.0378 8.25334 20.2638 8.36823 20.4629C8.48312 20.6619 8.64893 20.8267 8.84863 20.9404L18.5723 26.5542L15.206 28.4979C15.1894 28.5089 15.1703 28.5155 15.1505 28.5173C15.1307 28.5191 15.1107 28.516 15.0924 28.5082L7.04046 23.8557C5.32135 22.8601 4.06716 21.2235 3.55289 19.3046C3.03862 17.3858 3.30624 15.3413 4.29707 13.6194ZM31.955 20.0556L22.2312 14.4411L25.5976 12.4981C25.6142 12.4872 25.6333 12.4805 25.6531 12.4787C25.6729 12.4769 25.6928 12.4801 25.7111 12.4879L33.7631 17.1364C34.9967 17.849 36.0017 18.8982 36.6606 20.1613C37.3194 21.4244 37.6047 22.849 37.4832 24.2684C37.3617 25.6878 36.8382 27.0432 35.9743 28.1759C35.1103 29.3086 33.9415 30.1717 32.6047 30.6641C32.6047 30.5947 32.6047 30.4733 32.6047 30.3889V21.188C32.6066 20.9586 32.5474 20.7328 32.4332 20.5338C32.319 20.3348 32.154 20.1698 31.955 20.0556ZM35.3055 15.0128C35.2464 14.9765 35.1431 14.9142 35.069 14.8717L27.1045 10.2712C26.906 10.1554 26.6803 10.0943 26.4504 10.0943C26.2206 10.0943 25.9948 10.1554 25.7963 10.2712L16.0726 15.8858V11.9982C16.0715 11.9783 16.0753 11.9585 16.0837 11.9405C16.0921 11.9225 16.1048 11.9068 16.1207 11.8949L24.1719 7.25025C25.4053 6.53903 26.8158 6.19376 28.2383 6.25482C29.6608 6.31589 31.0364 6.78077 32.2044 7.59508C33.3723 8.40939 34.2842 9.53945 34.8334 10.8531C35.3826 12.1667 35.5464 13.6095 35.3055 15.0128ZM14.2424 21.9419L10.8752 19.9981C10.8576 19.9893 10.8423 19.9763 10.8309 19.9602C10.8195 19.9441 10.8122 19.9254 10.8098 19.9058V10.6071C10.8107 9.18295 11.2173 7.78848 11.9819 6.58696C12.7466 5.38544 13.8377 4.42659 15.1275 3.82264C16.4173 3.21869 17.8524 2.99464 19.2649 3.1767C20.6775 3.35876 22.0089 3.93941 23.1034 4.85067C23.0427 4.88379 22.937 4.94215 22.8668 4.98473L14.9024 9.58517C14.7025 9.69878 14.5366 9.86356 14.4215 10.0626C14.3065 10.2616 14.2466 10.4877 14.2479 10.7175L14.2424 21.9419ZM16.071 17.9991L20.4018 15.4978L24.7325 17.9975V22.9985L20.4018 25.4983L16.071 22.9985V17.9991Z"/></svg>
            </div>
            <div class="bot-answer" data-logId ="${logId}">
            <div class="bot-answer-content">
                <audio controls autoplay>
                    <source src="${audioSource}" type="audio/mp3" />
                    Error, audio not found.
                </audio>
            <br><span class="timestamp">${timestamp}</span></div>
            </div>
        </div>`;
        return html;
    }
}