let toeflTitle = "TOEFL Assistants";

function render() {
    let toeflAssistantToolHtml = `<!-- chatgpt assistant tool  -->
        <div class="my-horizontal-collapse-tools chatgpt-assistant" id="assistant-collapse">
           <div class="card card-body" style="height:100%;">
               <h3 class="mb-2">${toeflTitle}</h3>
               <div style="height:100%;overflow-y:auto;">
                   <div class="form-control" style="height:100%; word-wrap: break-word;white-space : normal; font-size:10pt; overflow: auto;" id="assistant-textarea"></div>
               </div>
               <div class="input-group mt-2" id="toeflAssistantPanelBox">
<!--                   <div class="input-group-text" id="btnGroupAddonAssistantChatgpt">-->
<!--                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-question-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/></svg>-->
<!--                   </div>-->
<!--                   <input type="text" class="form-control" id="assistantPanelInput" placeholder="${chatgptPanelInputPlaceholder}" aria-label="Input group example" aria-describedby="btnGroupAddonAssistantChatgpt">-->
                      <div contenteditable="true" id="toeflEditor" class="form-control"></div>
                    <div id="userList" class="dropdown-menu"></div>
                    <button type="button" class="btn btn-outline-primary" id="assistantSendQuestionBtn" style="float: right">${chatgptSendBtnText}</button>   
 

               </div>
           </div>
        </div>`;

    $("body").append(toeflAssistantToolHtml);
}
render();
let collapseToeflAssistant = document.querySelector("#assistant-collapse");
// toolList1.push(collapseChatgptAssistant);
let showToeflAssistantBtn = document.querySelector("#show-toefl-assistant-btn");

let assistantPanelInput = document.querySelector("#assistantPanelInput");
let assistantSendQuestionBtn = document.querySelector("#assistantSendQuestionBtn");
let assistantTextarea = document.querySelector("#assistant-textarea");

//This 4 variables are only used for tool open/close event
let assistantClickTargetObject = "NO_TARGET_OBJECT";
let assistantPageEvent = "NO_PAGE_EVENT";
let assistantInstantEvent = "CLOSE";
let assistantToolStartUseTime = 0;

var toeflAssistantRound = 0;
var toeflStructureExpertRound = 0;
var toeflGrammarExpertRound = 0;
var toeflLanguageExpertRound = 0;
var toeflMediatorRound = 0;
var toeflAssistantStartConversationTime = 0;
var chatHistoryLength = 0;

var timerNotAskAnyExpert = null;
var timerNotAskAllExpert = null;

var alreadyNotified = false;
var startMediatorNotified = false;
// logid与questionId是一一对应的，所以可以通过logid找到questionId
let toeflAssistantlogIdToQuestionIdMap = {};
var lastAskedExpert = "None";
// let toeflAssistantStartConversationTime = 0;
// get toeflAssistantStartConversationTime from local storage
if (localStorage.getItem(userId + "-" + currentCourseId +"toeflAssistantStartConversationTime") !== null) {
    toeflAssistantStartConversationTime = parseInt(localStorage.getItem(userId + "-" + currentCourseId +"toeflAssistantStartConversationTime"));
}else {
    toeflAssistantStartConversationTime = 0;
}

function getStartMediatorMessageResponse(){
    let chatgptData = {
        question: startMediatorMessage,
        userId: userId,
        courseId: currentCourseId,
        essay: "",
        questionId: "",
        includeEssay: agents.Mediator.promptIncludeEssay,
        chatgptRoleDescription: agents.Mediator.agentDescription,
        chatgptRole: "mediator_rule_based",
        backgroundFileNameList: agents.Mediator.backgroundFileNameList,
        chatgptParameters: agents.Mediator.chatgptParameters,
        agentName: "mediator_start_conversation",
    }

    $.ajax({
        url: apiBaseUrl + "/save-rule-base-message",
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(chatgptData),
        dataType: 'json',
        success: function(data, status) {
            console.log("mediator_start_conversation success");
            console.log(data);

            const timestamp = new Date(parseInt(data.data.chatgptResponseTime, 10)).toLocaleTimeString();
            let resContent = startMediatorMessage;
            let questionId = data.data.questionId;
            let replyHtml = generateMediatorAnswerHtml(resContent, timestamp, questionId, data.data.id,useToeflAssistantRating,chatHistoryLength+1);
            $(assistantTextarea).append(replyHtml);
            $(assistantTextarea).scrollTop(assistantTextarea.scrollHeight);
            chatHistoryLength+=1;
            toeflMediatorRound += 1;
            lastAskedExpert = "mediator";
            localStorage.setItem(userId + "-" + currentCourseId +"toeflMediatorRound", toeflMediatorRound);
            startMediatorNotified = true;
            localStorage.setItem(userId + "-" + currentCourseId +"startMediatorNotified", startMediatorNotified);
            console.log("startMediatorNotified: " + startMediatorNotified);
        },
        error: function() {
            console.log("mediator_start_conversation error");
        }
    });
}


function getIfNotAskAnyExpertResponse(){
    let chatgptData = {
        question: ruleBasedMessageNoTalkToExpert,
        userId: userId,
        courseId: currentCourseId,
        essay: "",
        questionId: "",
        includeEssay: chatgptPromptIncludeEssay,
        chatgptRoleDescription: expertRoleDescription,
        chatgptRole: "mediator",
        backgroundFileNameList: chatgptBackgroundFileNameList,
        chatgptParameters: chatgptParameters,
        agentName: "mediator_rule_based_not_ask_any_experts",
    }

    $.ajax({
        url: apiBaseUrl + "/save-rule-base-message",
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(chatgptData),
        dataType: 'json',
        success: function(data, status) {
            console.log("mediator_rule_based success");
            console.log(data);
            const timestamp = new Date(parseInt(data.data.chatgptResponseTime, 10)).toLocaleTimeString();
            let resContent = data.data.chatgptAnswer; //.replace("\n", "<br>"); //answer = answer.replace("\n", "<br>")
            let questionId = data.data.questionId;
            if (resContent === "gpt-error") {
                resContent = "There is an error from Chatgpt, Please re-send your question.";
            }
            let replyHtml = generateMediatorAnswerHtml(resContent, timestamp, questionId,data.data.id,useToeflAssistantRating,chatHistoryLength+1);
            $(assistantTextarea).append(replyHtml);
            $(assistantTextarea).scrollTop(assistantTextarea.scrollHeight);
            chatHistoryLength+=1;
            toeflMediatorRound += 1;
            lastAskedExpert = "mediator";
            localStorage.setItem(userId + "-" + currentCourseId +"toeflMediatorRound", toeflMediatorRound);
        }
    });
}// no longer use

// function checkIfAskedAllExperts(){
//     if (useToeflMediator){
//         if(toeflStructureExpertRound >= 1 && toeflGrammarExpertRound >= 1 && toeflLanguageExpertRound >= 1){
//             let chatgptData = {
//                 question: ruleBasedMessageAskAllExpert,
//                 userId: userId,
//                 courseId: currentCourseId,
//                 essay: "",
//                 questionId: "",
//                 includeEssay: chatgptPromptIncludeEssay,
//                 chatgptRoleDescription: expertRoleDescription,
//                 chatgptRole: "mediator",
//                 backgroundFileNameList: chatgptBackgroundFileNameList,
//                 chatgptParameters: chatgptParameters,
//                 type: "mediator_rule_based_ask_all_experts",
//             }
//
//             $.ajax({
//                 url: apiBaseUrl + "/save-rule-base-message",
//                 type: 'POST',
//                 contentType: 'application/json',
//                 data: JSON.stringify(chatgptData),
//                 dataType: 'json',
//                 success: function(data, status) {
//                     console.log("mediator_rule_based success");
//                     console.log(data);
//
//                     const timestamp = new Date(parseInt(data.data.chatgptResponseTime, 10)).toLocaleTimeString();
//                     let resContent = data.data.chatgptAnswer; //.replace("\n", "<br>"); //answer = answer.replace("\n", "<br>")
//                     let questionId = data.data.questionId;
//                     if (resContent === "gpt-error") {
//                         resContent = "There is an error from Chatgpt, Please re-send your question.";
//                     }
//                     let replyHtml = generateMediatorAnswerHtml(resContent, timestamp, questionId,data.data.id,useToeflAssistantRating,chatHistoryLength+1);
//                     $(assistantTextarea).append(replyHtml);
//                     $(assistantTextarea).scrollTop(assistantTextarea.scrollHeight);
//                     chatHistoryLength+=1;
//                 }
//             });
//             console.log("You have asked all experts");
//             alreadyNotified = true;
//         }
//         else {
//             console.log("You have not asked all experts");
//             console.log("toeflStructureExpertRound: " + toeflStructureExpertRound);
//             console.log("toeflGrammarExpertRound: " + toeflGrammarExpertRound);
//             console.log("toeflLanguageExpertRound: " + toeflLanguageExpertRound);
//         }
//     }
// }



function setTimerForAskingExperts(){
    // 这部分要等timer.js写入数据库后再执行。
    $.ajax({
        url: apiBaseUrl + "/get-task-start-time",
        data: { userId: userId, courseId: currentCourseId },
        type: "POST",
        success: function (result) {
            if (result.data !== null && result.data !== 0 && result.data !== "") {
                taskStartTimestamp = Number(result.data);
                console.log("taskStartTimestamp: " + taskStartTimestamp);
                // 检查是否已经使用过专家
                const usedExpert = toeflStructureExpertRound > 0 || toeflGrammarExpertRound > 0 || toeflLanguageExpertRound > 0 || toeflMediatorRound>0;
                // 检查是否已经问过所有专家
                const askedAllExperts = toeflStructureExpertRound >= 1 && toeflGrammarExpertRound >= 1 && toeflLanguageExpertRound >= 1;
                // if (usedExpert || alreadyNotifiedNotAskAnyExperts) {
                //     console.log("You have used expert or already notified not ask any expert");
                //     if (timerNotAskAnyExpert !== null) {
                //         clearInterval(timerNotAskAnyExpert);
                //         timerNotAskAnyExpert = null;
                //     }
                // } else {
                //     if (timerNotAskAnyExpert !== null) {
                //         clearInterval(timerNotAskAnyExpert);
                //     }
                //
                //     timerNotAskAnyExpert = setInterval(function () {
                //         const currentTime = getCurrentTimestamp();
                //         const timeElapsed = currentTime - taskStartTimestamp;
                //
                //         if (timeElapsed > notAskAnyOneTime*60000) { // 超过2分钟
                //             if (toeflStructureExpertRound === 0 && toeflGrammarExpertRound === 0 && toeflLanguageExpertRound === 0 && toeflMediatorRound===0) {
                //                 getIfNotAskAnyExpertResponse();
                //                 console.log("You have not asked any expert");
                //                 clearInterval(timerNotAskAnyExpert);
                //                 timerNotAskAnyExpert = null;
                //             } else {
                //                 console.log("You have used one of experts");
                //             }
                //         }
                //     }, 30000); // 30s检查一次
                //     console.log("set timer for not ask any expert", timerNotAskAnyExpert);
                // }

                if (alreadyNotified) {
                    console.log("already notified");
                    if (timerNotAskAllExpert !== null) {
                        clearInterval(timerNotAskAllExpert);
                        timerNotAskAllExpert = null;
                    }
                }
                else {
                    if (timerNotAskAllExpert !== null) {
                        clearInterval(timerNotAskAllExpert);
                    }

                    timerNotAskAllExpert = setInterval(function () {
                        const currentTime = getCurrentTimestamp();
                        const timeElapsed = currentTime - taskStartTimestamp;

                        if (timeElapsed > agents.Mediator.scaffold[0].triggerMinute*60000) { // 超过15or30分钟
                            if (toeflStructureExpertRound < 1 || toeflGrammarExpertRound < 1 || toeflLanguageExpertRound < 1) {
                                getIfNotAskAllExpertResponse();
                                console.log("You have not asked all experts");
                                clearInterval(timerNotAskAllExpert);
                                timerNotAskAllExpert = null;
                            } else {
                                console.log("You have asked all experts");
                            }
                        }
                    }, 60000); // 30s检查一次
                    console.log("set timer for not ask all expert", timerNotAskAllExpert);
                }

            }
            else {
                console.log("taskStartTimestamp is null");
                console.log(result);
            }
        }
    });
}

// 开始对话了但是没有跟所有专家对话
// function setTimerForNoTalkToAllExperts() {
//     if (timerNotAskAllExpert) {
//         clearInterval(timerNotAskAllExpert);
//         timerNotAskAllExpert = null;
//     }
//     let ten_min_notified = localStorage.getItem(userId + "-" + currentCourseId +"ten_min_notified") === "true";
//     let twenty_min_notified = localStorage.getItem(userId + "-" + currentCourseId +"twenty_min_notified") === "true";
//
//     timerNotAskAllExpert = setInterval(function () {
//         let startConversationTime = parseInt(localStorage.getItem(userId + "-" + currentCourseId +"toeflAssistantStartConversationTime"));
//         if (isNaN(startConversationTime)) {
//             console.log("Conversation has not started yet.");
//             return;  // 对话尚未开始，不做任何操作
//         }
//         console.log("in setTimerForNoTalkToAllExperts: startConversationTime: " + startConversationTime)
//         let currentTime = getCurrentTimestamp();
//         const askedAllExperts = toeflStructureExpertRound>0 && toeflGrammarExpertRound>0 && toeflLanguageExpertRound>0
//         // 对话开始超过10min，但是没有跟所有专家对话
//         if (currentTime - startConversationTime > 600000 && !askedAllExperts && !ten_min_notified) {
//             getIfNotAskAllExpertResponse();
//             ten_min_notified = true;
//             localStorage.setItem(userId + "-" + currentCourseId +"ten_min_notified", "true");
//             console.log("You have not asked all experts for 10 minutes.");
//         }
//         // 对话开始超过20分钟，但没有跟所有专家对话
//         else if(currentTime - startConversationTime > 1200000 && !askedAllExperts && !twenty_min_notified){
//             getIfNotAskAllExpertResponse();
//             clearInterval(timerNotAskAllExpert);
//             timerNotAskAllExpert = null;
//             twenty_min_notified = true;
//             localStorage.setItem(userId + "-" + currentCourseId +"twenty_min_notified", "true");
//             console.log("You have not asked all experts for 20 minutes.");
//         }
//         // 已跟所有专家对话
//         else if (askedAllExperts){
//             clearInterval(timerNotAskAllExpert);
//             timerNotAskAllExpert = null;
//         }
//
//     },60000) //
//     console.log("setTimerForNoTalkToAllExperts",timerNotAskAllExpert);
// }

if (agents.Mediator.useToeflMediator){
    // if (localStorage.getItem(userId + "-" + currentCourseId +"not_ask_all_experts_notified") === null){
    //     localStorage.setItem(userId + "-" + currentCourseId + "not_ask_all_experts_notified", "false");
    // }
    // if (localStorage.getItem(userId + "-" + currentCourseId +"twenty_min_notified") === null){
    //     localStorage.setItem(userId + "-" + currentCourseId + "twenty_min_notified", "false")
    // }
    setTimeout(function(){
        setTimerForAskingExperts();
    },2000);

}





// if (localStorage.getItem(userId + "-" + currentCourseId + "myRelatedEssayContent") === null) {
//     console.log("loadRelatedCourseEssay");
//     loadRelatedCourseEssay();
// }

function askMediatorForScaffold(expert_type){
    console.log("askMediatorForScaffold",expert_type);
    let essayContent = mainEditor?.getText() ?? "";
        let chatgptData = {
            question: expert_type,
            userId: userId,
            courseId: currentCourseId,
            essay: essayContent,
            questionId: "",
            includeEssay: agents.Mediator.promptIncludeEssay,
            chatgptRoleDescription: agents.Mediator.scaffold[1].scaffoldDescription,
            chatgptRole: agents.Mediator.scaffold[1].scaffoldRole,
            backgroundFileNameList: agents.Mediator.backgroundFileNameList,
            chatgptParameters: agents.Mediator.chatgptParameters,
            agentName: agents.Mediator.scaffold[1].scaffoldType,
        }
        console.log("askMediatorForScaffold",chatgptData);
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
                    let questionId = data.data.questionId;
                    if (resContent === "gpt-error") {
                        resContent = "There is an error from Chatgpt, Please re-send your question.";
                    }
                    console.log(resContent)
                    if (resContent !== "no response") {
                        resContent = removeMarkdown(resContent);
                        let replyHtml = generateMediatorAnswerHtml(resContent, timestamp, questionId,data.data.id,useToeflAssistantRating,chatHistoryLength+1);
                        $(assistantTextarea).append(replyHtml);
                        $(assistantTextarea).scrollTop(assistantTextarea.scrollHeight);
                        // rating system
                        if(useToeflAssistantRating) {
                            setupOneRateThumb(data.data.id);
                            setupOneStarRatingBtn(data.data.id);
                            setupOneRegenerateAnswerBtn(data.data.id);
                        }
                        // round of chatgpt assistant + 1
                        chatHistoryLength +=1;
                        toeflMediatorRound += 1;
                        localStorage.setItem(userId + "-" + currentCourseId + "-toeflMediatorRound", toeflMediatorRound.toString());
                        lastAskedExpert = "mediator";
                        localStorage.setItem(userId + "-" + currentCourseId + "-lastAskedExpert", lastAskedExpert);
                        sendEventMessage("", getCurrentTimestamp(), "CHATGPT_TOEFL_MEDIATOR", "MEDIATOR", "GET_MEDIATOR_SCAFFOLD", "CHATGPT", null, "MEDIATOR_SCAFFOLD", "GET:::MEDIATOR_SCAFFOLD" + resContent, null);
                    }
                    else {
                        console.log("No response from mediator scaffold");
                    }
                } else {
                    // Remove the processing sign
                    alert("An error occurred while processing your question.");
                }
            }
        });
}
function getIfNotAskAllExpertResponse(){
    let extraInfo = "";
    if (toeflStructureExpertRound > 0){
        extraInfo +="该学生已经与结构专家进行了对话。\n"
    }
    if (toeflGrammarExpertRound > 0){
        extraInfo +="该学生已经与语法专家进行了对话。\n"
    }
    if (toeflLanguageExpertRound > 0){
        extraInfo +="该学生已经与语言专家进行了对话。\n"
    }
    let question = extraInfo
    console.log("calling askMediatorForInstruction",question);
    let essayContent = mainEditor?.getText() ?? "";
        let chatgptData = {
            question: question,
            userId: userId,
            courseId: currentCourseId,
            essay: essayContent,
            questionId: "",
            includeEssay: agents.Mediator.promptIncludeEssay,
            chatgptRoleDescription: agents.Mediator.scaffold[0].scaffoldDescription,
            chatgptRole: agents.Mediator.scaffold[0].scaffoldRole,
            backgroundFileNameList: agents.Mediator.backgroundFileNameList,
            chatgptParameters: agents.Mediator.chatgptParameters,
            agentName: agents.Mediator.scaffold[0].scaffoldType,
        }
        console.log("askMediatorForInstruction",chatgptData);
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
                    resContent = removeMarkdown(resContent);
                    let questionId = data.data.questionId;
                    if (resContent === "gpt-error") {
                        resContent = "There is an error from Chatgpt, Please re-send your question.";
                    }
                    let replyHtml = generateMediatorAnswerHtml(resContent, timestamp, questionId,data.data.id,useToeflAssistantRating,chatHistoryLength+1);
                    $(assistantTextarea).append(replyHtml);
                    $(assistantTextarea).scrollTop(assistantTextarea.scrollHeight);
                    // rating system
                    if(useToeflAssistantRating) {
                        setupOneRateThumb(data.data.id);
                        setupOneStarRatingBtn(data.data.id);
                        setupOneRegenerateAnswerBtn(data.data.id);
                    }
                    // round of chatgpt assistant + 1
                    chatHistoryLength +=1;
                    toeflMediatorRound += 1;
                    lastAskedExpert = "mediator";
                    localStorage.setItem(userId + "-" + currentCourseId + "-toeflMediatorRound", toeflMediatorRound.toString());
                    sendEventMessage("", getCurrentTimestamp(), "CHATGPT_TOEFL_MEDIATOR", "MEDIATOR", "GET_MEDIATOR_INSTRUCTION", "CHATGPT", null, "MEDIATOR_INSTRUCTION", "GET:::MEDIATOR_INSTRUCTION"+resContent, null);
                } else {
                    // Remove the processing sign
                    alert("An error occurred while processing your question.");
                }
            }
        });
}

function setConversationRound(chat_history){
    console.log("setConversationRound----------------------------")
    let expert_chat_history = chat_history.filter(chat => chat.chatgptRole && chat.chatgptRole.includes("expert"));
    // 通过expert_chat_history 计算学生与每个expert的对话轮数
    let expert_structure_round = expert_chat_history.filter(chat => chat.assistantName === "expert_structure").length
    let expert_grammar_round = expert_chat_history.filter(chat => chat.assistantName === "expert_grammar").length
    let expert_language_round = expert_chat_history.filter(chat => chat.assistantName === "expert_language").length
    toeflAssistantRound = expert_language_round + expert_grammar_round + expert_structure_round;


    toeflStructureExpertRound = expert_structure_round;
    toeflGrammarExpertRound = expert_grammar_round;
    toeflLanguageExpertRound = expert_language_round;

    localStorage.setItem(userId + "-" + currentCourseId + "toeflStructureExpertRound", expert_structure_round);
    localStorage.setItem(userId + "-" + currentCourseId + "toeflGrammarExpertRound", expert_grammar_round);
    localStorage.setItem(userId + "-" + currentCourseId + "toeflLanguageExpertRound", expert_language_round)
    localStorage.setItem(userId + "-" + currentCourseId + "toeflAssistantRound", toeflAssistantRound);

    console.log("expert_structure_round: " + expert_structure_round);
    console.log("expert_grammar_round: " + expert_grammar_round);
    console.log("expert_language_round: " + expert_language_round);
    console.log("toeflAssistantRound: " + toeflAssistantRound);
}

function getCursorPosition(element) {
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

function showPlaceholder() {
    if (editor.innerText.trim() === '') {
        editor.innerHTML = `<span class="placeholder">${placeholderText}</span>`;
    }
}

function hidePlaceholder() {
    const placeholder = editor.querySelector('.placeholder');
    if (placeholder) {
        editor.removeChild(placeholder);
    }
}

    const editor = document.getElementById('toeflEditor');
    const userList = document.getElementById('userList');

    const experts = ['Mediator','StructureExpert', 'GrammarExpert', 'LanguageExpert']; // 可@的用户列表

    const expertsToChinese = {
        'Mediator': '协调员',
        'StructureExpert': '结构专家',
        'GrammarExpert': '语法专家',
        'LanguageExpert': '语言专家'
    }

    const placeholderText = '请先输入@，然后选择专家进行提问';


    editor.addEventListener('focus', hidePlaceholder);
    editor.addEventListener('blur', showPlaceholder);

    showPlaceholder();

    editor.addEventListener('input', (e) => {
        const content = editor.innerText;
        // const cursorPosition = window.getSelection().getRangeAt(0).startOffset;

        const cursorPosition = getCursorPosition(editor);
        // console.log("cursorPosition:",cursorPosition);
        const inputChar = content[cursorPosition - 1];

        // Check if the input character is '@'
        if (inputChar === '@'&& e.inputType !== 'deleteContentBackward') {
            const rect = getCaretCoordinates();
            showUserList(rect);
        } else {
            hideUserList();
        }

        // console.log(content.trim())
        // Check if all content is deleted
        if (content.trim() === '') {
            showPlaceholder();
            // Remove all highlight spans
            const spans = editor.querySelectorAll('span.highlight');
            spans.forEach(span => {
                span.remove();
            });
            editor.innerHTML = content.trim();
        } else {
            // Check if a highlighted span is being deleted
            hidePlaceholder();
            const spans = editor.querySelectorAll('span.highlight');
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

    userList.addEventListener('click', (e) => {
        if (e.target.matches('.dropdown-item')) {
            insertUser(e.target.innerText);
        }
    });

    editor.addEventListener('focus', () => {
        document.addEventListener('keydown', keydownHandler);
        document.addEventListener('keyup', keyupHandler);
    });

    editor.addEventListener('blur', () => {
        document.removeEventListener('keydown', keydownHandler);
    });

function keyupHandler(e) {
    sendEventMessage("", getCurrentTimestamp(), "CHATGPT_TOEFL_ASSISTANT", "KEYBOARD_STROKE", "WRITE_QUESTION", "CHATGPT", "TOEFL_EDITOR", "WRITE", "KEY:::" + e.key + "---" + e.code, e);
}


function keydownHandler(e) {
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
    }
}
function showUserList(rect) {
    userList.innerHTML = experts.map(user => `<a class="dropdown-item" href="#">${expertsToChinese[user]}</a>`).join('');
    userList.style.left = `${rect.x}px`;
    // userList.style.top = `${rect.y}px`;
    userList.style.display = 'block';
    userList.classList.add('show');

    // 使用 requestAnimationFrame 确保 userList 已被渲染，然后设置 top 值
    requestAnimationFrame(() => {
        const userListHeight = userList.offsetHeight;
        const dropdownItemHeight = userList.querySelector('.dropdown-item').offsetHeight;
        userList.style.top = `-${userListHeight - rect.y - dropdownItemHeight/2}px`;  // 该值刚好在每一行@时显示的位置都合适
    });
}
function hideUserList() {
    userList.style.display = 'none';
    userList.classList.remove('show');
}
function insertUser(username) {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    // Move the range back to include the @ character
    range.setStart(range.startContainer, range.startOffset - 1);

    // Create a span for the highlighted username
    const span = document.createElement('span');
    span.className = 'highlight';
    span.textContent = `@${username} `;

    // Insert the span and collapse the range after the span
    range.deleteContents(); // Delete the @ character
    range.insertNode(span);
    sendEventMessage("", getCurrentTimestamp(), "CHATGPT_TOEFL_ASSISTANT", "CLICK", "SELECT_AT_EXPERT", "CHATGPT", "TOEFL_EDITOR", "CLICK", "AT_EXPERT::"+username, null);
    // Move the cursor after the inserted span
    const textNode = document.createTextNode('\u200B'); // Insert a zero-width space after the span
    range.setStartAfter(span);
    range.insertNode(textNode);
    range.setStartAfter(textNode); // Set the cursor after the zero-width space
    selection.removeAllRanges();
    selection.addRange(range);
    hideUserList();
}
function getCaretCoordinates() {
    const sel = document.getSelection();
    if (sel.rangeCount === 0) {
        return null;
    }

    const range = sel.getRangeAt(0).cloneRange();
    const rect = range.getClientRects()[0];

    if (!rect) {
        return null;
    }

    const editorRect = editor.getBoundingClientRect();
    //
    // console.log("x",rect.left - editorRect.left)
    console.log("y",rect.top- editorRect.top)

    return {
        x: rect.left - editorRect.left,
        y: rect.top- editorRect.top,
    };
}


function checkUserQuestion() {

    console.log("checkUserQuestion",editor.innerText)
    console.log("calling checkUserQuestion")

    // 记录对话开始时间
    if (toeflAssistantStartConversationTime === 0){
        const startConversationTime = getCurrentTimestamp();
        localStorage.setItem(userId + "-" + currentCourseId +"toeflAssistantStartConversationTime", startConversationTime.toString());
    }
    // const question = assistantPanelInput.value;
    const question = editor.innerText;
    // console.log(question);
    if (question.length > 0 && question !== placeholderText) {
        editor.innerText = "";
        const now = new Date();
        const timestamp = now.toLocaleTimeString();
        let safeQuestion = escapeHTML(question);
        let replyHtml = generateQuestionHtml(safeQuestion, timestamp);
        $(assistantTextarea).append(replyHtml);
        assistantTextarea.scrollTop = assistantTextarea.scrollHeight;
        showPlaceholder();

        // 取@开头的名字
        let name = question.match(/@.*?\s/); // 匹配@开头后面跟着一个空格的名字, 例如@structure
        console.log(name);
        let cleanQuestion = ""
        if (name !== null) {
            cleanQuestion = question.replace(name[0], "");
            // remove textNode '\u200B'
            cleanQuestion = cleanQuestion.replace(/\u200B/g, "");
        }
        else {
            cleanQuestion = question;
        }
        // 判断cleanQuestion是否为空
        console.log("cleanQuestion",cleanQuestion.length);
        if(cleanQuestion.trim() === ""){
            let timestamp = new Date().toLocaleTimeString();
            const tmp = generateAnswerHtml("输入的问题不能为空", timestamp, "");
            $(assistantTextarea).append(tmp);
            $(assistantTextarea).scrollTop(assistantTextarea.scrollHeight);
            return null
        }

        if (name !== null) {
            let nameStr = name[0].replace("@", "").replace(" ", "");
            console.log(nameStr);
            if (nameStr === "结构专家" && agents.StructureExpert.useToeflStructureExpert) {
                // testAskStructure()
                askStructureExpertQuestion(cleanQuestion)
                sendEventMessage("", getCurrentTimestamp(), "CHATGPT_TOEFL_ASSISTANT", "MOUSE_CLICK", "AT_STRUCTURE_EXPERT", "CHATGPT", null, "AT_EXPERT", "AT:::STRUCTURE_EXPERT", null);
                // if (!alreadyNotified && useToeflMediator){
                //     checkIfAskedAllExperts();
                // }
            }
            else if (nameStr === "语法专家" && agents.GrammarExpert.useToeflGrammarExpert) {
                // testAskGrammar()
                askGrammarExpertQuestion(cleanQuestion)
                sendEventMessage("", getCurrentTimestamp(), "CHATGPT_TOEFL_ASSISTANT", "MOUSE_CLICK", "AT_GRAMMAR_EXPERT", "CHATGPT", null, "AT_EXPERT", "AT:::GRAMMAR_EXPERT", null);
                // if (!alreadyNotified && useToeflMediator){
                //     checkIfAskedAllExperts();
                // }
            }
            else if (nameStr === "语言专家" && agents.LanguageExpert.useToeflLanguageExpert) {
                // testAskLanguage()
                askLanguageExpertQuestion(cleanQuestion)
                sendEventMessage("", getCurrentTimestamp(), "CHATGPT_TOEFL_ASSISTANT", "MOUSE_CLICK", "AT_LANGUAGE_EXPERT", "CHATGPT", null, "AT_EXPERT", "AT:::LANGUAGE_EXPERT", null);
                // if (!alreadyNotified && useToeflMediator){
                //     checkIfAskedAllExperts();
                // }
            }
            else if (nameStr === "协调员" && agents.Mediator.useToeflMediator) {
                // testAskMediator()
                askMediatorQuestion(cleanQuestion)
                sendEventMessage("", getCurrentTimestamp(), "CHATGPT_TOEFL_ASSISTANT", "MOUSE_CLICK", "AT_MEDIATOR", "CHATGPT", null, "AT_EXPERT", "AT:::MEDIATOR", null);
            }
            else {
                let timestamp = new Date().toLocaleTimeString();
                const tmp = generateAnswerHtml("请你检查你@的老师名字是否正确~", timestamp, "");
                $(assistantTextarea).append(tmp);
                $(assistantTextarea).scrollTop(assistantTextarea.scrollHeight);
            }
        }
        else {
            // let timestamp = new Date().toLocaleTimeString();
            // const tmp = generateAnswerHtml("请你先@一个老师~", timestamp, "");
            // $(assistantTextarea).append(tmp);
            // $(assistantTextarea).scrollTop(assistantTextarea.scrollHeight);
            // 根据lastAskedExpert来决定向哪个专家提问
            console.log("lastAskedExpert",lastAskedExpert);
            if (lastAskedExpert === "structure" && agents.StructureExpert.useToeflStructureExpert){
                askStructureExpertQuestion(cleanQuestion);
                sendEventMessage("", getCurrentTimestamp(), "CHATGPT_TOEFL_ASSISTANT", "MOUSE_CLICK", "AT_STRUCTURE_EXPERT", "CHATGPT", null, "AT_EXPERT", "AT:::STRUCTURE_EXPERT", null);
            }
            else if (lastAskedExpert === "grammar" && agents.GrammarExpert.useToeflGrammarExpert){
                askGrammarExpertQuestion(cleanQuestion);
                sendEventMessage("", getCurrentTimestamp(), "CHATGPT_TOEFL_ASSISTANT", "MOUSE_CLICK", "AT_GRAMMAR_EXPERT", "CHATGPT", null, "AT_EXPERT", "AT:::GRAMMAR_EXPERT", null);
            }
            else if (lastAskedExpert === "language" && agents.LanguageExpert.useToeflLanguageExpert){
                askLanguageExpertQuestion(cleanQuestion);
                sendEventMessage("", getCurrentTimestamp(), "CHATGPT_TOEFL_ASSISTANT", "MOUSE_CLICK", "AT_LANGUAGE_EXPERT", "CHATGPT", null, "AT_EXPERT", "AT:::LANGUAGE_EXPERT", null);
            }
            else if (lastAskedExpert === "mediator" && agents.Mediator.useToeflMediator){
                askMediatorQuestion(cleanQuestion);
                sendEventMessage("", getCurrentTimestamp(), "CHATGPT_TOEFL_ASSISTANT", "MOUSE_CLICK", "AT_MEDIATOR", "CHATGPT", null, "AT_EXPERT", "AT:::MEDIATOR", null);
            }
            else {
                let timestamp = new Date().toLocaleTimeString();
                const tmp = generateAnswerHtml("请你先@一个老师~", timestamp, "");
                $(assistantTextarea).append(tmp);
                $(assistantTextarea).scrollTop(assistantTextarea.scrollHeight);
            }
        }
        console.log("lastAskedExpert",lastAskedExpert);
        return question
    }
    else {
        let timestamp = new Date().toLocaleTimeString();
        const tmp = generateAnswerHtml("输入的问题不能为空", timestamp, "");
        $(assistantTextarea).append(tmp);
        $(assistantTextarea).scrollTop(assistantTextarea.scrollHeight);
        return null
    }
}
function askMediatorQuestion(question){
    console.log("calling askMediatorQuestion")
    if (question.length > 0) {
        // Show a processing sign
        const processingMessage = createProcessingMessage();
        $(assistantTextarea).append(processingMessage);
        $(assistantTextarea).scrollTop(assistantTextarea.scrollHeight);

        // 进一步处理question，在前面加上信息，学生已经与哪些专家有过交谈。
        let extraInfo = "";
        if (toeflStructureExpertRound > 0){
            extraInfo +="该学生已经与结构专家进行了对话。\n"
        }
        if (toeflGrammarExpertRound > 0){
            extraInfo +="该学生已经与语法专家进行了对话。\n"
        }
        if (toeflLanguageExpertRound > 0){
            extraInfo +="该学生已经与语言专家进行了对话。\n"
        }
        let cleanQuestion = extraInfo + "这是学生的问题："+question;

        console.log("cleanQuestion",cleanQuestion)

        let essayContent = mainEditor?.getText() ?? "";
        let chatgptData = {
            question: cleanQuestion,
            userId: userId,
            courseId: currentCourseId,
            essay: essayContent,
            questionId: "",
            includeEssay: agents.Mediator.promptIncludeEssay,
            chatgptRoleDescription: agents.Mediator.agentDescription,
            chatgptRole: agents.Mediator.agentRole,
            backgroundFileNameList: agents.Mediator.backgroundFileNameList,
            chatgptParameters: agents.Mediator.chatgptParameters,
            agentName: agents.Mediator.agentName,
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
                    let replyHtml = generateMediatorAnswerHtml(resContent, timestamp, questionId,data.data.id,useToeflAssistantRating,chatHistoryLength+1);
                    $(assistantTextarea).append(replyHtml);
                    $(assistantTextarea).scrollTop(assistantTextarea.scrollHeight);
                    // rating system
                    if(useToeflAssistantRating) {
                        setupOneRateThumb(data.data.id);
                        setupOneStarRatingBtn(data.data.id);
                        setupOneRegenerateAnswerBtn(data.data.id);
                    }
                    // round of chatgpt assistant + 1
                    chatHistoryLength +=1;
                    toeflMediatorRound += 1;
                    localStorage.setItem(userId + "-" + currentCourseId + "-toeflMediatorRound", toeflMediatorRound.toString());
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

function askStructureExpertQuestion(question){
    console.log("calling askStructureExpertQuestion")
    if (question.length > 0) {
        // Show a processing sign
        const processingMessage = createProcessingMessage();
        $(assistantTextarea).append(processingMessage);
        $(assistantTextarea).scrollTop(assistantTextarea.scrollHeight);

        let essayContent = mainEditor?.getText() ?? "";
        let chatgptData = {
            question: question,
            userId: userId,
            courseId: currentCourseId,
            essay: essayContent,
            questionId: "",
            includeEssay: agents.StructureExpert.promptIncludeEssay,
            chatgptRoleDescription: agents.StructureExpert.agentDescription,
            chatgptRole: agents.StructureExpert.agentRole,
            backgroundFileNameList: agents.StructureExpert.backgroundFileNameList,
            chatgptParameters: agents.StructureExpert.chatgptParameters,
            agentName: agents.StructureExpert.agentName,
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
                    let replyHtml = generateStructureExpertAnswerHtml(resContent, timestamp, questionId,data.data.id,useToeflAssistantRating,chatHistoryLength+1);
                    $(assistantTextarea).append(replyHtml);
                    $(assistantTextarea).scrollTop(assistantTextarea.scrollHeight);
                    // rating system
                    if(useToeflAssistantRating) {
                        setupOneRateThumb(data.data.id);
                        setupOneStarRatingBtn(data.data.id);
                        setupOneRegenerateAnswerBtn(data.data.id);
                    }
                    // round of chatgpt assistant + 1
                    toeflAssistantRound += 1;
                    chatHistoryLength +=1;
                    localStorage.setItem(userId + "-" + currentCourseId + "-toeflAssistantRound", toeflAssistantRound.toString());
                    toeflStructureExpertRound += 1;
                    localStorage.setItem(userId + "-" + currentCourseId + "-toeflStructureExpertRound", toeflStructureExpertRound.toString());
                    lastAskedExpert = "structure";
                    localStorage.setItem(userId + "-" + currentCourseId + "-lastAskedExpert", lastAskedExpert);
                    const isFirstReachEightRound = toeflStructureExpertRound>=agents.Mediator.scaffold[1].triggerRound && toeflGrammarExpertRound<agents.Mediator.scaffold[1].triggerRound && toeflLanguageExpertRound<agents.Mediator.scaffold[1].triggerRound;
                    if (agents.Mediator.useToeflMediator && isFirstReachEightRound){
                        // askMediatorForInstruction();
                        console.log("askMediatorForScaffold and Structure reached 8 rounds")
                        askMediatorForScaffold("expert_structure");
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

function askGrammarExpertQuestion(question){
    // Show a processing sign
    const processingMessage = createProcessingMessage();
    $(assistantTextarea).append(processingMessage);
    $(assistantTextarea).scrollTop(assistantTextarea.scrollHeight);

    if (question.length > 0) {
        let essayContent = mainEditor?.getText() ?? "";
        let chatgptData = {
            question: question,
            userId: userId,
            courseId: currentCourseId,
            essay: essayContent,
            questionId: "",
            includeEssay: agents.GrammarExpert.promptIncludeEssay,
            chatgptRoleDescription: agents.GrammarExpert.agentDescription,
            chatgptRole: agents.GrammarExpert.agentRole,
            backgroundFileNameList: agents.GrammarExpert.backgroundFileNameList,
            chatgptParameters: agents.GrammarExpert.chatgptParameters,
            agentName: agents.GrammarExpert.agentName,
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
                    let replyHtml = generateGrammarExpertAnswerHtml(resContent, timestamp, questionId,data.data.id,useToeflAssistantRating,chatHistoryLength+1);
                    $(assistantTextarea).append(replyHtml);
                    $(assistantTextarea).scrollTop(assistantTextarea.scrollHeight);
                    // rating system
                    if(useToeflAssistantRating) {
                        setupOneRateThumb(data.data.id);
                        setupOneStarRatingBtn(data.data.id);
                        setupOneRegenerateAnswerBtn(data.data.id);
                    }
                    // round of chatgpt assistant + 1
                    toeflAssistantRound += 1;
                    chatHistoryLength +=1;
                    localStorage.setItem(userId + "-" + currentCourseId + "-toeflAssistantRound", toeflAssistantRound.toString());
                    toeflGrammarExpertRound += 1;
                    localStorage.setItem(userId + "-" + currentCourseId + "-toeflGrammarExpertRound", toeflGrammarExpertRound.toString());
                    lastAskedExpert = "grammar";
                    localStorage.setItem(userId + "-" + currentCourseId + "-lastAskedExpert", lastAskedExpert);
                    const isFirstReachEightRound = toeflGrammarExpertRound>=agents.Mediator.scaffold[1].triggerRound && toeflStructureExpertRound<agents.Mediator.scaffold[1].triggerRound && toeflLanguageExpertRound<agents.Mediator.scaffold[1].triggerRound;
                    if (agents.Mediator.useToeflMediator && isFirstReachEightRound){
                        // askMediatorForInstruction();
                        console.log("askMediatorForScaffold and Grammar reached 8 rounds");
                        askMediatorForScaffold("expert_grammar");
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

function askLanguageExpertQuestion(question){
    if (question.length > 0) {
        // Show a processing sign
        const processingMessage = createProcessingMessage();
        $(assistantTextarea).append(processingMessage);
        $(assistantTextarea).scrollTop(assistantTextarea.scrollHeight);

        let essayContent = mainEditor?.getText() ?? "";
        let chatgptData = {
            question: question,
            userId: userId,
            courseId: currentCourseId,
            essay: essayContent,
            questionId: "",
            includeEssay: agents.LanguageExpert.promptIncludeEssay,
            chatgptRoleDescription: agents.LanguageExpert.agentDescription,
            chatgptRole: agents.LanguageExpert.agentRole,
            backgroundFileNameList: agents.LanguageExpert.backgroundFileNameList,
            chatgptParameters: agents.LanguageExpert.chatgptParameters,
            agentName: agents.LanguageExpert.agentName,
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
                    let replyHtml = generateLanguageExpertAnswerHtml(resContent, timestamp, questionId,data.data.id,useToeflAssistantRating,chatHistoryLength+1);
                    $(assistantTextarea).append(replyHtml);
                    $(assistantTextarea).scrollTop(assistantTextarea.scrollHeight);
                    // rating system
                    if(useToeflAssistantRating) {
                        setupOneRateThumb(data.data.id);
                        setupOneStarRatingBtn(data.data.id);
                        setupOneRegenerateAnswerBtn(data.data.id);
                    }
                    // round of chatgpt assistant + 1
                    toeflAssistantRound += 1;
                    chatHistoryLength +=1;
                    localStorage.setItem(userId + "-" + currentCourseId + "-toeflAssistantRound", toeflAssistantRound.toString());
                    toeflLanguageExpertRound += 1;
                    localStorage.setItem(userId + "-" + currentCourseId + "-toeflLanguageExpertRound", toeflLanguageExpertRound.toString());
                    lastAskedExpert = "language";
                    localStorage.setItem(userId + "-" + currentCourseId + "-lastAskedExpert", lastAskedExpert);
                    const isFirstReachEightRound = toeflGrammarExpertRound<agents.Mediator.scaffold[1].triggerRound && toeflStructureExpertRound<agents.Mediator.scaffold[1].triggerRound && toeflLanguageExpertRound>=agents.Mediator.scaffold[1].triggerRound;
                    if (agents.Mediator.useToeflMediator && isFirstReachEightRound){
                        // askMediatorForInstruction();
                        console.log("askMediatorForScaffold and Language reached 8 rounds");
                        askMediatorForScaffold("expert_language");
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




function renderToeflAssistantChatRating(logId,rating,thumb){
    // find log by data-logId from chatgptTextarea
    let log = $(assistantTextarea).find(`[data-logId='${logId}']`);
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

function loadToeflAssistantChatHistory() {
    $.get(apiBaseUrl + "/load-chatgpt-chat/" + userId + "/" + currentCourseId, function(data, status) {
        if (status === "success") {
            const chat_history = data.data || [];
            // Clear the handler box before displaying the new handler history

            let questionIdList = [];
            let chat_history_filtered = [];
            chat_history.forEach(chat => {
                if (chat.chatgptRole === "expert") { // 如果要用评价的话需要修改的
                    // 如果questionid不为null
                    if (chat.questionId !== null) {
                        toeflAssistantlogIdToQuestionIdMap[chat.id] = chat.questionId;
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
            $(assistantTextarea).empty();
            console.log("chat_history",chat_history);
            setConversationRound(chat_history);
            let expert_chat_history = chat_history.filter(chat => chat.chatgptRole && (chat.chatgptRole.includes("expert") || chat.chatgptRole.includes("mediator") || (chat.assistantName !== null && chat.assistantName.includes("mediator"))));
            // 最后一个chat的expert的type
            if (chat_history.length > 0) {
                let lastAskedExpertType = chat_history[chat_history.length - 1].assistantName;
                if (lastAskedExpertType === "expert_language") {
                    lastAskedExpert = "language";
                }
                else if (lastAskedExpertType === "expert_structure") {
                    lastAskedExpert = "structure";
                }
                else if (lastAskedExpertType === "expert_grammar") {
                    lastAskedExpert = "grammar";
                }
                else{
                    lastAskedExpert = "mediator";
                }
            }
            else {
                lastAskedExpert = "mediator";
            }
            console.log("lastAskedExpert: ",lastAskedExpert);
            let ask_all_expert = chat_history.filter(chat => chat.chatgptRole === "mediator_instruction").length;
            if(ask_all_expert > 0){
                alreadyNotified = true;
                console.log("alreadyNotified",alreadyNotified);
            } else{
                alreadyNotified = false;
                console.log("alreadyNotified",alreadyNotified);
                console.log("ask_all_expert",ask_all_expert);
            }
            let startMediatorConversation = chat_history.filter(chat => chat.assistantName === "mediator_start_conversation").length;
            if(startMediatorConversation > 0){
                startMediatorNotified = true;
                console.log("startMediatorNotified",startMediatorNotified);
            }else {
                startMediatorNotified = false;
                console.log("startMediatorNotified",startMediatorNotified);
            }

            console.log("expert_chat_history",expert_chat_history);
            chatHistoryLength = expert_chat_history.length;
            // console.log("chatHistoryLength: " + chatHistoryLength);
            expert_chat_history.forEach(chat => {
                chat.chatgptAnswer = removeMarkdown(chat.chatgptAnswer);
                // 如果chat的chatgptrole不是assistant,则显示
                let round = expert_chat_history.findIndex(value => value.id === chat.id) + 1;
                // 此处要根据不同的role进行不同的处理
                if (chat.assistantName === "expert_structure") {
                    $(assistantTextarea).append(generateQuestionHtml("@结构专家 "+chat.userQuestions, new Date(parseInt(chat.userAskTime, 10)).toLocaleTimeString(), chat.id));
                    $(assistantTextarea).append(generateStructureExpertAnswerHtml(chat.chatgptAnswer, new Date(parseInt(chat.chatgptResponseTime, 10)).toLocaleTimeString(), chat.questionId, chat.id,useToeflAssistantRating,round));
                    if (useToeflAssistantRating){
                        renderToeflAssistantChatRating(chat.id,chat.responseRatingStar,chat.responseRatingThumb)
                    }
                }
                else if (chat.assistantName === "expert_grammar") {
                    $(assistantTextarea).append(generateQuestionHtml("@语法专家 " + chat.userQuestions, new Date(parseInt(chat.userAskTime, 10)).toLocaleTimeString(), chat.id));
                    $(assistantTextarea).append(generateGrammarExpertAnswerHtml(chat.chatgptAnswer, new Date(parseInt(chat.chatgptResponseTime, 10)).toLocaleTimeString(), chat.questionId, chat.id,useToeflAssistantRating,round));
                    if (useToeflAssistantRating){
                        renderToeflAssistantChatRating(chat.id,chat.responseRatingStar,chat.responseRatingThumb)
                    }
                }
                else if (chat.assistantName === "expert_language") {
                    $(assistantTextarea).append(generateQuestionHtml("@语言专家 "+chat.userQuestions, new Date(parseInt(chat.userAskTime, 10)).toLocaleTimeString(), chat.id));
                    $(assistantTextarea).append(generateLanguageExpertAnswerHtml(chat.chatgptAnswer, new Date(parseInt(chat.chatgptResponseTime, 10)).toLocaleTimeString(), chat.questionId, chat.id,useToeflAssistantRating,round));
                    if (useToeflAssistantRating){
                        renderToeflAssistantChatRating(chat.id,chat.responseRatingStar,chat.responseRatingThumb)
                    }
                }
                else if (chat.chatgptRole === "mediator_instruction"){
                    let flag_text = "这是学生的问题"
                    let flag_end = "这是学生的文章"
                    //如果userQuestions里匹配到了flag_text，则显示从flag_text到flag_end的内容
                    let userQuestions = chat.userQuestions;
                    if (userQuestions.includes(flag_text)){
                        let userQuestionsArray = userQuestions.split("\n");
                        let flag_text_index = userQuestionsArray.findIndex(value => value.includes(flag_text));
                        let flag_end_index = userQuestionsArray.findIndex(value => value.includes(flag_end));
                        let userQuestionsArrayFiltered = userQuestionsArray.slice(flag_text_index,flag_end_index+1);
                        let userQuestionsFiltered = userQuestionsArrayFiltered.join("\n");
                        $(assistantTextarea).append(generateQuestionHtml("@协调员(Lily) "+userQuestionsFiltered, new Date(parseInt(chat.userAskTime, 10)).toLocaleTimeString(), chat.id));
                        $(assistantTextarea).append(generateMediatorAnswerHtml(chat.chatgptAnswer, new Date(parseInt(chat.chatgptResponseTime, 10)).toLocaleTimeString(), chat.questionId, chat.id,useToeflAssistantRating,round));
                        if (useToeflAssistantRating){
                            renderToeflAssistantChatRating(chat.id,chat.responseRatingStar,chat.responseRatingThumb)
                        }
                    }
                    else{
                        $(assistantTextarea).append(generateMediatorAnswerHtml(chat.chatgptAnswer, new Date(parseInt(chat.chatgptResponseTime, 10)).toLocaleTimeString(), chat.questionId, chat.id,useToeflAssistantRating,round));
                        if (useToeflAssistantRating){
                            renderToeflAssistantChatRating(chat.id,chat.responseRatingStar,chat.responseRatingThumb)
                        }
                    }

                }
                else if (chat.chatgptRole === "mediator_scaffold"){
                    tempAnswer = chat.chatgptAnswer;
                    // 去除两边的空格
                    tempAnswer = tempAnswer.trim();
                    // tempAnswer全转为小写
                    tempAnswer = tempAnswer.toLowerCase();
                    let regexTestNoResponse = new RegExp("no response",'i');
                    if (!regexTestNoResponse.test(tempAnswer)){
                        $(assistantTextarea).append(generateMediatorAnswerHtml(chat.chatgptAnswer, new Date(parseInt(chat.chatgptResponseTime, 10)).toLocaleTimeString(), chat.questionId, chat.id,useToeflAssistantRating,round));
                        if (useToeflAssistantRating){
                            renderToeflAssistantChatRating(chat.id,chat.responseRatingStar,chat.responseRatingThumb)
                        }
                    }
                }
                else if (chat.chatgptRole === "mediator"){
                    let flag_text = "这是学生的问题："
                    //如果userQuestions里匹配到了flag_text，则显示从flag_text后面的内容
                    if (chat.userQuestions.includes(flag_text)){
                        chat.userQuestions = chat.userQuestions.replace(flag_text,"");
                    }
                    $(assistantTextarea).append(generateQuestionHtml("@协调员(Lily) "+chat.userQuestions, new Date(parseInt(chat.userAskTime, 10)).toLocaleTimeString(), chat.id));
                    $(assistantTextarea).append(generateMediatorAnswerHtml(chat.chatgptAnswer, new Date(parseInt(chat.chatgptResponseTime, 10)).toLocaleTimeString(), chat.questionId, chat.id,useToeflAssistantRating,round));
                    if (useToeflAssistantRating){
                        renderToeflAssistantChatRating(chat.id,chat.responseRatingStar,chat.responseRatingThumb)
                    }
                }
                else if (chat.chatgptRole === "mediator_rule_based"){
                    $(assistantTextarea).append(generateMediatorAnswerHtml(chat.chatgptAnswer, new Date(parseInt(chat.userAskTime, 10)).toLocaleTimeString(), chat.questionId, chat.id,useToeflAssistantRating,round));
                    if (useToeflAssistantRating){
                        renderToeflAssistantChatRating(chat.id,chat.responseRatingStar,chat.responseRatingThumb)
                    }
                }
            });
            if(useToeflAssistantRating){
                setupRateThumb();
                setupStarRating();
                setupRegenerateAnswer();
            }
            $(assistantTextarea).animate({ scrollTop: $(assistantTextarea).prop("scrollHeight")}, 1000);
        }
    });
}

// function createProcessingMessage() {
//     const timestamp = new Date().toLocaleTimeString();
//     const processingMessage = document.createElement("div");  // 此处必须要有一个dom 对象
//     processingMessage.innerHTML = generateAnswerHtml("Processing", timestamp, "");
//     return processingMessage;
// }

function setupToeflAssistantTool() {

    collapseToeflAssistant.onclick = function(e) {
        stopEventPropagation(e);
        // console.log("collapseSearch click");
        // sendMyTraceDataPost("/trace-chatgpt", getCurrentTimestamp(), "CHATGPT", "MOUSE_CLICK", null, "CLICK", "", e); //当select text时候会触发，mouse down up click 事件
        sendEventMessage("", getCurrentTimestamp(), "CHATGPT_ASSISTANT", "MOUSE_CLICK", subActionLabelMap["CHATGPT_ASSISTANT_CLICK"], "CHATGPT", null, "CLICK", "", e);
    };
    //当鼠标在搜索annotation框区域移动时候，所有移动和滚动行为都标注为 SEARCH_ANNOTATION
    collapseToeflAssistant.onmousewheel = function(e) {
        stopEventPropagation(e);
        // mousewheelData.push(generateMouseWheelData(e, "READ_GPT_FEEDBACK"));
        sendEventMessage("", getCurrentTimestamp(), "CHATGPT_ASSISTANT", "MOUSE_WHEEL", "READ_FEEDBACK_GPT_ASSISTANT", "CHATGPT",null, "NO_INSTANT_EVENT", "SCROLL_DIST:::" + e.deltaY, e);
    };
    collapseToeflAssistant.onmousemove = function(e) {
        stopEventPropagation(e);
        mousePosition = generateMousePositionData(e, "READ_FEEDBACK_GPT_ASSISTANT", "CHATGPT");
    };
    collapseToeflAssistant.onmouseup = function(e) {
        stopEventPropagation(e);
        if (window.getSelection() != null && window.getSelection().toString().replace(/\n/g, '').length > 0) {
            let selectText = window.getSelection().toString();
            // sendMyTraceDataPost("/trace-chatgpt", getCurrentTimestamp(), "CHATGPT", "MOUSE_SELECT_TEXT", null, "SELECT_TEXT", "MOUSE_SELECT:::" + selectText, e);
            sendEventMessage("", getCurrentTimestamp(), "CHATGPT_ASSISTANT", "MOUSE_SELECT_TEXT", subActionLabelMap["CHATGPT_ASSISTANT_SELECT_TEXT"], "CHATGPT", null, "SELECT_TEXT", "MOUSE_SELECT:::" + selectText, e);
            // console.log("send post for select text-------------------------------------" + selectText + "-------");
        }
    };

    let inputQuestion;
    assistantSendQuestionBtn.onclick = function(e) {
        stopEventPropagation(e);
        inputQuestion = checkUserQuestion();
        // inputQuestion = askAssistantQuestion();
        // sendMyTraceDataPost("/trace-chatgpt", getCurrentTimestamp(), "CHATGPT", "MOUSE_CLICK", "CHATGPT_PANEL_SUBMIT_BTN", "SUBMIT_QUESTION", "SUBMIT:::" + inputQuestion, e);
        sendEventMessage("", getCurrentTimestamp(), "CHATGPT_ASSISTANT", "MOUSE_CLICK", subActionLabelMap["CHATGPT_ASSISTANT_SUBMIT_QUESTION"], "CHATGPT", "CHATGPT_PANEL_SUBMIT_BTN", "SUBMIT_QUESTION", "SUBMIT:::" + inputQuestion, e);
    }
}

// let chatgptToolUseLength = 0;

showToeflAssistantBtn.onclick = function(e) {

    stopEventPropagation(e);
    if (useAnnotationTool) hideAnnotationToolbox(); // 隐藏annotation toolbox，当点击其他按钮时候
        collapseToeflAssistant.classList.toggle("in-tools");
        toolsAndEssayToggle(collapseToeflAssistant);
        assistantClickTargetObject = "SHOW_TOEFL_ASSISTANT_BTN";
        assistantPageEvent = "MOUSE_CLICK";
    if (startMediatorNotified===false){
        startMediatorNotified = true;
        getStartMediatorMessageResponse();
        sendEventMessage("", getCurrentTimestamp(), "CHATGPT_TOEFL_ASSISTANT", "MOUSE_CLICK", subActionLabelMap["CHATGPT_ASSISTANT_CLICK"], "CHATGPT_ASSISTANT", assistantClickTargetObject, "START_FIRST_CONVERSATION", "", null);
    }

    sendEventMessage("", getCurrentTimestamp(), "CHATGPT_TOEFL_ASSISTANT", assistantPageEvent, subActionLabelMap["CHATGPT_ASSISTANT_CLICK"], "CHATGPT_ASSISTANT", assistantClickTargetObject, "SHOW_CHATGPT_ASSISTANT_BTN_CLICK", "", null);
};

function myCallbackChatgptAssistant(contains, element) {
    let saveTime;

    let eventValue;
    if (contains) {
        // console.log('Element with id:', element.id, 'has the "in-tools" class!');
        saveTime = getCurrentTimestamp();
        assistantInstantEvent = "OPEN";
        eventValue = "START_USE_TOOL:::" + saveTime;
        assistantToolStartUseTime = saveTime;
        // console.log('chatgptAssistantToolStartUseTime:' + assistantToolStartUseTime);
        // sendMyTraceDataPost("/trace-chatgpt", saveTime, "CHATGPT", chatgptPageEvent, chatgptClickTargetObject, chatgptInstantEvent, eventValue, null);
        sendEventMessage("", saveTime, "CHATGPT_TOEFL_ASSISTANT", assistantPageEvent, subActionLabelMap["CHATGPT_ASSISTANT_" + assistantInstantEvent], "CHATGPT_ASSISTANT", assistantClickTargetObject, assistantInstantEvent, eventValue, null);
    } else {
        if (assistantInstantEvent !== "CLOSE") {
            // console.log('Element with id:', element.id, 'has not the "in-tools" class!');
            saveTime = getCurrentTimestamp();
            assistantInstantEvent = "CLOSE";
            if (assistantToolStartUseTime === 0) {
                eventValue = "TOOL_USE_LENGTH:::ERROR-" + (saveTime - assistantToolStartUseTime);
            } else {
                eventValue = "TOOL_USE_LENGTH:::" + (saveTime - assistantToolStartUseTime);
            }
            // console.log('chatgpt Assistant tool use length:' + (saveTime - assistantToolStartUseTime));
            // sendMyTraceDataPost("/trace-chatgpt", saveTime, "CHATGPT", chatgptPageEvent, chatgptClickTargetObject, chatgptInstantEvent, eventValue, null);
            sendEventMessage("", saveTime, "CHATGPT_TOEFL_ASSISTANT", assistantPageEvent, subActionLabelMap["CHATGPT_ASSISTANT_" + assistantInstantEvent], "CHATGPT_ASSISTANT", assistantClickTargetObject, assistantInstantEvent, eventValue, null);
        } else {
            // console.log('Element with id:', element.id, 'is keep closed');
        }

    }
    assistantClickTargetObject = "NO_TARGET_OBJECT";
    assistantPageEvent = "NO_PAGE_EVENT";
}
handleClassMutation(collapseToeflAssistant, myCallbackChatgptAssistant); //监听


