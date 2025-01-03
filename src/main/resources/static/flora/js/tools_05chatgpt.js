function render() {
    let chatgptToolHtml = `<!-- chatgpt tool  -->
        <div class="my-horizontal-collapse-tools my-classification" id="chatgpt-collapse">
           <div class="card card-body" style="height:100%;">
               <h3 class="mb-2">${chatgptTitle}</h3>
               <div style="height:100%;overflow-y:auto;">
                   <div class="form-control" style="height:100%; word-wrap: break-word;white-space : normal; font-size:10pt; overflow: auto;" id="chatgpt-textarea"></div>
               </div>
               <div class="input-group mt-2" id="chatgptPanelBox">
                   <div class="input-group-text" id="btnGroupAddonChatgpt">
                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-question-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/></svg>
                   </div>
                   <input type="text" class="form-control" id="chatgptPanelInput" placeholder="${chatgptPanelInputPlaceholder}" aria-label="Input group example" aria-describedby="btnGroupAddonChatgpt">
                   <button type="button" class="btn btn-outline-primary" id="chatgptSendQuestionBtn">${chatgptSendBtnText}</button>
               </div>
           </div>
        </div>`;

    $("body").append(chatgptToolHtml);
}
render();
let collapseChatgpt = document.querySelector("#chatgpt-collapse");
toolList1.push(collapseChatgpt);
let showChatgptBtn = document.querySelector("#show-chatgpt-btn");

let chatgptPanelInput = document.querySelector("#chatgptPanelInput");
let chatgptSendQuestionBtn = document.querySelector("#chatgptSendQuestionBtn");
let chatgptTextarea = document.querySelector("#chatgpt-textarea");
let chatgptDefaultAvatar = "<svg fill=\"#000000\" width=\"35\" height=\"35\" viewBox=\"0 0 24 24\" role=\"img\" xmlns=\"http://www.w3.org/2000/svg\"><title>chatgpt icon</title><path d=\"M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z\"/></svg>";
let chatgptDefaultDisplayName = "ChatGPT";
let chatgptRoundNumber = 0;

//This 4 variables are only used for tool open/close event
let chatgptClickTargetObject = "NO_TARGET_OBJECT";
let chatgptPageEvent = "NO_PAGE_EVENT";
let chatgptInstantEvent = "CLOSE";
let chatgptToolStartUseTime = 0;

// This 2 variables are used for regenerating the chatgpt answer
let currentQuestion = "";
// logid与questionId是一一对应的，所以可以通过logid找到questionId
let logIdToQuestionIdMap = {};

function askQuestion() {
    const question = chatgptPanelInput.value;
    currentQuestion = question;
    if (question.length > 0) {
        // Set the message panel to empty
        chatgptPanelInput.value = "";
        const now = new Date();
        const timestamp = now.toLocaleTimeString();
        let safeQuestion = escapeHTML(question);
        let replyHtml = generateQuestionHtml(safeQuestion, timestamp,-1); // -1 means the Id has not been assigned yet
        $(chatgptTextarea).append(replyHtml);

        // Show a processing sign
        const processingMessage = createProcessingMessage();
        $(chatgptTextarea).append(processingMessage);
        $(chatgptTextarea).scrollTop(chatgptTextarea.scrollHeight);

        //使输入框暂时禁用
        // chatgptPanelInput.disabled=true;
        // chatgptSendQuestionBtn.classList.add("disabled");
        // chatgptPanelInput.placeholder = "Wait for response...";

        // sendMyTraceDataPost("/trace-chatgpt", getCurrentTimestamp(), "CHATGPT", "MOUSE_CLICK", "CHATGPT_PANEL_SUBMIT_BTN", "SUBMIT_QUESTION", "SUBMIT:::" + question, e);

        // let gptUrl = "/chatgpt";
        // if (window.location.href.includes("https://study.floralearn.cn")) {
        //     gptUrl = "/chatgpt-nolimit";
        // }

        // 重新发送GPT请求的时候，需要提供prompt id, 此id 可以在 generateChatgptAnswerHtml() 方法中找到

        let chatgptData = {
            question: question,
            userId: userId,
            courseId: currentCourseId,
            essay: mainEditor.getText(),
            questionId: "",
            includeEssay: chatgptPromptIncludeEssay,
            chatgptRoleDescription: chatgptRoleDescription,
            chatgptRole: chatgptRole,
            backgroundFileNameList: chatgptBackgroundFileNameList,
            chatgptParameters: chatgptParameters,
            agentName: (typeof chatgptType === 'undefined' || chatgptType === null) ? "chat" : chatgptType,
        }
        console.log("mainEditor.getText(): ",mainEditor.getText())

        $.ajax({
                url: apiBaseUrl + "/chatgpt",
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(chatgptData),
                dataType: 'json',
                success: function(data, status) {
                    if (status === "success") {
                        // console.log("chatgpt response: " +JSON.stringify(data.data));
                        // 更新logId与questionId的映射
                        logIdToQuestionIdMap[data.data.id] = data.data.questionId;
                        // console.log("logIdToQuestionIdMap: " + JSON.stringify(logIdToQuestionIdMap));
                        // Remove the processing sign
                        $(processingMessage).remove();
                        //使输入框取消禁用
                        // chatgptPanelInput.disabled=false;
                        // chatgptSendQuestionBtn.classList.remove("disabled");
                        // chatgptPanelInput.placeholder = "Ask a question...";
                        const timestamp = new Date(parseInt(data.data.chatgptResponseTime, 10)).toLocaleTimeString();
                        let resContent = data.data.chatgptAnswer; //.replace("\n", "<br>"); //answer = answer.replace("\n", "<br>")
                        let questionId = data.data.questionId;
                        if (resContent === "gpt-error") {
                            resContent = "There is an error from Chatgpt, Please re-send your question.";
                        }
                        chatgptRoundNumber++;
                        // localStorage.setItem(userId + "-" + currentCourseId + "-chatgptRound", chatgptRoundNumber.toString());

                        let replyHtml = generateGeneralAgentAnswerHtml(resContent, timestamp, questionId, data.data.id, chatgptDefaultDisplayName, chatgptDefaultAvatar, useChatgptRating, chatgptRoundNumber);
                        $(chatgptTextarea).append(replyHtml);
                        $(chatgptTextarea).scrollTop(chatgptTextarea.scrollHeight);
                        if (useChatgptRating) {
                            setupOneRegenerateAnswerBtn(chatgptTextarea,data.data.id);
                            setupOneStarRatingBtn(chatgptTextarea,data.data.id);
                            setupOneRateThumb(chatgptTextarea,data.data.id);
                        }
                    } else {
                        // Remove the processing sign
                        $(processingMessage).remove();
                        //使输入框取消禁用
                        // chatgptPanelInput.disabled=false;
                        // chatgptSendQuestionBtn.classList.remove("disabled");
                        // chatgptPanelInput.placeholder = "Ask a question...";
                        alert("An error occurred while processing your question.");
                    }
                }
            });
        return question;
    }
}

// 以下三个函数只对askQuestion()函数有用
// function setupOneRegenerateAnswerBtn(logId) {
//     let log = $(chatgptTextarea).find(`[data-logId='${logId}']`);
//     let btn = $(log).find(".regenerate-btn")[0];
//     btn.addEventListener("click", function(e) {
//         // log click event
//         // console.log("regenerate click");
//         let userChatgptLogId = logId
//         // find log的answer和question by logId
//         let question = $(chatgptTextarea).find(".user-question[data-logId='" + userChatgptLogId + "']").text();
//         // 如果不能根据logId找到question，说明是第一次提问，此时question应该是currentQuestion —— 拿不到currentQuestion
//         // 判断question是undefined还是空字符串
//         // console.log("currentQuestion: " + currentQuestion);
//         if (question === undefined || question === "") {
//             question = currentQuestion;
//         }
//         let answer = $(chatgptTextarea).find(".bot-answer[data-logId='" + userChatgptLogId + "']").text();
//         // console.log("currentQuestion: " + currentQuestion);
//         // 以正则表达式去除掉timestamp内容,timestamp e.g: 5:25:46 PM, 一般情况下，用户问题的最后不会是数字，因此不会被正则匹配到。
//         question = question.replace(/(\d+:\d+:\d+\s+[AP]M)/g, "");
//         answer = answer.replace(/(\d+:\d+:\d+\s+[AP]M)/g, "");
//         // 删除空白的字符
//         question = question.trim();
//         answer = answer.trim();
//         // 显示processing过渡
//         let timestamp = new Date().toLocaleTimeString();
//         let processInnerHtml = `Processing……<br><span class="timestamp">${timestamp}</span>`
//         $(chatgptTextarea).find(".bot-answer[data-logId='" + userChatgptLogId + "']").find(".bot-answer-content").html(processInnerHtml);
//         // 调用api，重新生成answer并修改当前content
//         reAskChatgpt(question, userChatgptLogId);
//     });
// }
// function setupOneStarRatingBtn(logId) {
//     let starInnerHtml = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
//   <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
// </svg>`;
//     let starFillInnerHtml = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
//   <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
// </svg>`;
//
//     let log = $(chatgptTextarea).find(`[data-logId='${logId}']`);
//     stars = $(log).find(".star");
//     // console.log(stars);
//     stars = Array.from(stars);
//     stars.forEach((star, index) => {
//         star.addEventListener("click", function(e) {
//             // log click event
//             // console.log("star click");
//             // update rating
//             updateRating(stars, index);
//             rateChatgptAnswer(logId, index + 1,0)
//         });
//     });
//
//     function updateRating(stars, index) {
//         stars.forEach((star, i) => {
//             if (i <= index) {
//                 star.innerHTML = starFillInnerHtml;
//             } else {
//                 star.innerHTML = starInnerHtml;
//             }
//         });
//     }
// }
//
// function setupOneRateThumb(logId) {
//     let log = $(chatgptTextarea).find(`[data-logId='${logId}']`);
//     let usefulBtn = $(log).find(".useful-answer");
//     let uselessBtn = $(log).find(".useless-answer");
//     usefulBtn.on("click", function(e) {
//         // console.log("useful click");
//         rateChatgptAnswer(logId, 0,1)
//     });
//     uselessBtn.on("click", function(e) {
//         // console.log("useless click");
//         rateChatgptAnswer(logId, 0,2)
//     });
//     // 以下写法有问题
//     // usefulBtn.addEventListener("click", function(e) {
//     //     console.log("useful click");
//     //     rateChatgptAnswer(logId, 0,1)
//     // });
//     // uselessBtn.addEventListener("click", function(e) {
//     //     console.log("useless click");
//     //     rateChatgptAnswer(logId, 0,2)
//     // });
// }


function loadGPTChatHistory() {
    $.get(apiBaseUrl + "/load-chatgpt-chat/" + userId + "/" + currentCourseId, function(data, status) {
        if (status === "success") {
            const chat_history = data.data;
            // 判断是否有重复questionId，如果有，只保留responseGeneratedTimes最大的那个
            let questionIdList = [];
            let chat_history_filtered = [];
            if (chat_history) {
                // 只filter 当前配置文件中指定的 agent 部分的 chat logs
                chat_history.forEach(chat => {
                    if (chat.chatgptRole === "assistant") {
                        // 如果questionid不为null
                        if (chat.questionId !== null) {
                            logIdToQuestionIdMap[chat.id] = chat.questionId;
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
            } else {
                console.log("errors happened in the load-chatgpt-chat method");
            }
            // console.log("questionIdList",questionIdList);
            // console.log("logIdToQuestionIdMap",logIdToQuestionIdMap);
            // Clear the handler box before displaying the new handler history
            $(chatgptTextarea).empty();
            // 使用 generateQuestionHtml 和 generateAnswerHtml 进行重构，避免重复代码
            // Display the handler content as structured questions and responses
            chatgptRoundNumber = chat_history_filtered.length;
            chat_history_filtered.forEach((chat, index) => {
                let round = chat_history_filtered.findIndex(value => value.id === chat.id) + 1;
                $(chatgptTextarea).append(generateQuestionHtml(chat.userQuestions, new Date(parseInt(chat.userAskTime, 10)).toLocaleTimeString(), chat.id));
                $(chatgptTextarea).append(generateGeneralAgentAnswerHtml(chat.chatgptAnswer, new Date(parseInt(chat.chatgptResponseTime, 10)).toLocaleTimeString(), chat.questionId, chat.id, chatgptDefaultDisplayName, chatgptDefaultAvatar, useChatgptRating, index + 1));
                renderChatRating(chatgptTextarea,chat.id,chat.responseRatingStar,chat.responseRatingThumb);
            });
            // console.log("chat_history",chat_history);
            if(useChatgptRating) {
                setupRateThumb(chatgptTextarea);
                setupStarRating(chatgptTextarea);
                setupRegenerateAnswer(chatgptTextarea);
            }
            $(chatgptTextarea).animate({ scrollTop: $(chatgptTextarea).prop("scrollHeight")}, 1000);
        }
    });
}

// function renderChatRating(logId,rating,thumb){
//     // find log by data-logId from chatgptTextarea
//     let log = $(chatgptTextarea).find(`[data-logId='${logId}']`);
//     // console.log("log",log);
//     // render log rating
//     if(rating){
//         for (let i = 1; i <= rating; i++) {
//             // console.log("log",$(log).find(`.star[data-rating='${i}']`));
//             $(log).find(`.star[data-rating='${i}']`).html(starFillInnerHtml);
//         }
//     }
//     if (thumb){
//         if (thumb === 1){
//             // add class active
//             $(log).find(`.useful-answer`).addClass("active");
//         }
//         else if(thumb === 2){
//             $(log).find(`.useless-answer`).addClass("active");
//         }
//     }
// }

// function createProcessingMessage() {
//     const timestamp = new Date().toLocaleTimeString();
//     const processingMessage = document.createElement("div");  // 此处必须要有一个dom 对象
//     processingMessage.innerHTML = generateAnswerHtml("Processing", timestamp, "");
//     return processingMessage;
// }


// function setupStarRating() {
//     let starInnerHtml = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
//   <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
// </svg>`;
//     let starFillInnerHtml = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
//   <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
// </svg>`;
//
//     document.querySelectorAll('.bot-answer-rating').forEach((rating) => {
//         const stars = rating.querySelectorAll('.star');
//         let currentRating = -1;
//
//         stars.forEach((star, idx) => {
//             star.addEventListener('click', function(e) {
//                 // log click event
//                 // console.log("star click");
//                 currentRating = idx;
//                 let userChatgptLogId = $(this).parent().parent().attr("data-logId");
//                 rateChatgptAnswer( userChatgptLogId, idx + 1,0);
//                 updateRating(stars,idx);
//             });
//         });
//     });
//
//     function updateRating(stars, index) {
//         stars.forEach((star, i) => {
//             if (i <= index) {
//                 star.innerHTML = starFillInnerHtml;
//             } else {
//                 star.innerHTML = starInnerHtml;
//             }
//         });
//     }
// }
//
// function rateChatgptAnswer(userChatgptLogId, rating,thumb) {
//     $.post(apiBaseUrl + "/rate-chatgpt-answer", {
//             userChatgptLogId: userChatgptLogId,
//             responseRatingThumb: thumb,
//             responseRatingStar: rating,
//             userId: userId,
//             courseId: currentCourseId
//         },
//         function(data, status) {
//             if (status === "success") {
//                 // console.log(data)
//                 console.log("rateChatgptAnswer success");
//             } else {
//                 console.log("rateChatgptAnswer error");
//             }
//         });
// }
//
// function setupRateThumb(){
//     document.querySelectorAll('.bot-answer-buttons').forEach((btns) => {
//         let usefulBtns = btns.querySelectorAll('.useful-answer');
//         let uselessBtns = btns.querySelectorAll('.useless-answer');
//         usefulBtns.forEach((btn) => {
//             btn.addEventListener('click', function(e) {
//                 // log click event
//                 // console.log("useful click");
//                 let userChatgptLogId = $(this).parent().parent().attr("data-logId");
//                 rateChatgptAnswer( userChatgptLogId, 0,1);
//                 // todo: update thumb
//             });
//         });
//         uselessBtns.forEach((btn) => {
//             btn.addEventListener('click', function(e) {
//                 // log click event
//                 // console.log("useless click");
//                 let userChatgptLogId = $(this).parent().parent().attr("data-logId");
//                 rateChatgptAnswer( userChatgptLogId, 0,2);
//                 //todo: update thumb
//         });
//     });
//     });
//
//     // 设置当按钮点击，class 设为active
//     $(".useful-answer").click(function() {
//         $(this).addClass("active");
//         $(this).siblings().removeClass("active");
//     });
//     $(".useless-answer").click(function() {
//         $(this).addClass("active");
//         $(this).siblings().removeClass("active");
//     });
// }
//
// function setupRegenerateAnswer(){
//     // console.log("setupRegenerateAnswer================");
//     let regenerateBtns = document.querySelectorAll('.regenerate-btn');
//     // 先remove之前的click listener
//     regenerateBtns.forEach((btn) => {
//         btn.addEventListener('click', function(e) {
//             // log click event
//             // console.log("regenerate click");
//             let userChatgptLogId = $(this).parent().parent().attr("data-logId");
//             // find log的answer和question by logId
//             let question = $(chatgptTextarea).find(".user-question[data-logId='" + userChatgptLogId + "']").text();
//             // 如果不能根据logId找到question，说明是第一次提问，此时question应该是currentQuestion —— 拿不到currentQuestion
//             // 判断question是undefined还是空字符串
//             // console.log("currentQuestion: " + currentQuestion);
//             if (question === undefined || question === "") {
//                 question = currentQuestion;
//             }
//             let answer = $(chatgptTextarea).find(".bot-answer[data-logId='" + userChatgptLogId + "']").text();
//             // console.log("currentQuestion: " + currentQuestion);
//             // 以正则表达式去除掉timestamp内容,timestamp e.g: 5:25:46 PM, 一般情况下，用户问题的最后不会是数字，因此不会被正则匹配到。
//             question = question.replace(/(\d+:\d+:\d+\s+[AP]M)/g, "");
//             answer = answer.replace(/(\d+:\d+:\d+\s+[AP]M)/g, "");
//             // 删除空白的字符
//             question = question.trim();
//             answer = answer.trim();
//             // 显示processing过渡
//             let timestamp = new Date().toLocaleTimeString();
//             let processInnerHtml = `Processing……<br><span class="timestamp">${timestamp}</span>`
//             $(chatgptTextarea).find(".bot-answer[data-logId='" + userChatgptLogId + "']").find(".bot-answer-content").html(processInnerHtml);
//             // 调用api，重新生成answer并修改当前content
//             reAskChatgpt(question, userChatgptLogId);
//         });
//     });
// }

//
//
// function reAskChatgpt(question, userChatgptLogId) {
//     // console.log("logIdToQuestionIdMap: " + JSON.stringify(logIdToQuestionIdMap));
//     let chatgptData = {
//         question: question,
//         userId: userId,
//         courseId: currentCourseId,
//         essay: mainEditor.getText(),
//         questionId: logIdToQuestionIdMap[userChatgptLogId],
//         includeEssay: chatgptPromptIncludeEssay,
//         chatgptRoleDescription: chatgptRoleDescription,
//         chatgptRole: chatgptRole,
//         backgroundFileNameList: chatgptBackgroundFileNameList,
//         chatgptParameters: chatgptParameters
//     }
//
//     $.ajax({
//         url: apiBaseUrl + "/chatgpt",
//         type: "POST",
//         data: JSON.stringify(chatgptData),
//         contentType: "application/json; charset=utf-8",
//         dataType: "json",
//         success: function(data, status) {
//             // console.log("reAskChatgpt success");
//             // console.log(data);
//             let answer = data.data.chatgptAnswer;
//             if (answer === "gpt-error") {
//                 answer = "There is an error from Chatgpt, Please re-send your question.";
//             }
//             let timestamp = new Date().toLocaleTimeString();
//             let answerInnerHtml = `${answer}<br><span class="timestamp">${timestamp}</span>`
//             // console.log(answerInnerHtml);
//             $(chatgptTextarea).find(".bot-answer[data-logId='" + userChatgptLogId + "']").find(".bot-answer-content").html(answerInnerHtml);
//         }
//     });
// }



function setupChatgptTool() {

    collapseChatgpt.onclick = function(e) {
        stopEventPropagation(e);
        // console.log("collapseSearch click");
        // sendMyTraceDataPost("/trace-chatgpt", getCurrentTimestamp(), "CHATGPT", "MOUSE_CLICK", null, "CLICK", "", e); //当select text时候会触发，mouse down up click 事件
        sendEventMessage("", getCurrentTimestamp(), "CHATGPT", "MOUSE_CLICK", subActionLabelMap["CHATGPT_CLICK"], "CHATGPT", null, "CLICK", "", e);
    };
    //当鼠标在搜索annotation框区域移动时候，所有移动和滚动行为都标注为 SEARCH_ANNOTATION
    collapseChatgpt.onmousewheel = function(e) {
        stopEventPropagation(e);
        // mousewheelData.push(generateMouseWheelData(e, "READ_GPT_FEEDBACK"));
        sendEventMessage("", getCurrentTimestamp(), "CHATGPT", "MOUSE_WHEEL", "READ_FEEDBACK_GPT", "CHATGPT",null, "NO_INSTANT_EVENT", "SCROLL_DIST:::" + e.deltaY, e);
    };
    collapseChatgpt.onmousemove = function(e) {
        stopEventPropagation(e);
        mousePosition = generateMousePositionData(e, "READ_FEEDBACK_GPT", "CHATGPT");
    };
    collapseChatgpt.onmouseup = function(e) {
        stopEventPropagation(e);
        if (window.getSelection() != null && window.getSelection().toString().replace(/\n/g, '').length > 0) {
            let selectText = window.getSelection().toString();
            // sendMyTraceDataPost("/trace-chatgpt", getCurrentTimestamp(), "CHATGPT", "MOUSE_SELECT_TEXT", null, "SELECT_TEXT", "MOUSE_SELECT:::" + selectText, e);
            sendEventMessage("", getCurrentTimestamp(), "CHATGPT", "MOUSE_SELECT_TEXT", subActionLabelMap["CHATGPT_SELECT_TEXT"], "CHATGPT", null, "SELECT_TEXT", "MOUSE_SELECT:::" + selectText, e);
            // console.log("send post for select text-------------------------------------" + selectText + "-------");
        }
    };

    let inputQuestion;
    chatgptSendQuestionBtn.onclick = function(e) {
        stopEventPropagation(e);
        inputQuestion = askQuestion();
        currentQuestion = inputQuestion;
        // sendMyTraceDataPost("/trace-chatgpt", getCurrentTimestamp(), "CHATGPT", "MOUSE_CLICK", "CHATGPT_PANEL_SUBMIT_BTN", "SUBMIT_QUESTION", "SUBMIT:::" + inputQuestion, e);
        sendEventMessage("", getCurrentTimestamp(), "CHATGPT", "MOUSE_CLICK", subActionLabelMap["CHATGPT_SUBMIT_QUESTION"], "CHATGPT", "CHATGPT_PANEL_SUBMIT_BTN", "SUBMIT_QUESTION", "SUBMIT:::" + inputQuestion, e);
    }

    chatgptPanelInput.addEventListener('keydown', (event) => {
        stopEventPropagation(event);
        if (event.shiftKey && event.key === 'Enter') {
            // event.preventDefault();
            // Insert a line break in the input value
            const cursorPosition = chatgptPanelInput.selectionStart;
            const inputValue = chatgptPanelInput.value;
            chatgptPanelInput.value = inputValue.slice(0, cursorPosition) + '\n' + inputValue.slice(cursorPosition);
            chatgptPanelInput.setSelectionRange(cursorPosition + 1, cursorPosition + 1);
            // sendMyTraceDataPost("/trace-chatgpt", getCurrentTimestamp(), "CHATGPT", "KEY_STROKE", "CHATGPT_PANEL_INPUT", "CHANGE_INPUT_LINE", "KEY:::" + event.key + "---" + event.code, event);
            sendEventMessage("", getCurrentTimestamp(), "CHATGPT", "KEY_STROKE", subActionLabelMap["CHATGPT_CHANGE_INPUT_LINE"], "CHATGPT", "CHATGPT_PANEL_INPUT", "CHANGE_INPUT_LINE", "KEY:::" + event.key + "---" + event.code, event);
        } else if (event.key === 'Enter') {
            // event.preventDefault();
            inputQuestion = askQuestion();
            // sendMyTraceDataPost("/trace-chatgpt", getCurrentTimestamp(), "CHATGPT", "KEY_STROKE", "CHATGPT_PANEL_INPUT", "SUBMIT_QUESTION", "SUBMIT:::" + inputQuestion, event);
            sendEventMessage("", getCurrentTimestamp(), "CHATGPT", "KEY_STROKE", subActionLabelMap["CHATGPT_SUBMIT_QUESTION"], "CHATGPT", "CHATGPT_PANEL_INPUT", "SUBMIT_QUESTION", "SUBMIT:::" + inputQuestion, event);
        } else {
            // sendMyTraceDataPost("/trace-chatgpt", getCurrentTimestamp(), "CHATGPT", "KEY_STROKE", "CHATGPT_PANEL_INPUT", "WRITE_QUESTION", "KEY:::" + event.key + "---" + event.code, event);
            sendEventMessage("", getCurrentTimestamp(), "CHATGPT", "KEY_STROKE", subActionLabelMap["CHATGPT_WRITE_QUESTION"], "CHATGPT", "CHATGPT_PANEL_INPUT", "WRITE_QUESTION", "KEY:::" + event.key + "---" + event.code, event);
        }
    });
}

// let chatgptToolUseLength = 0;

showChatgptBtn.onclick = function(e) {
    // console.log("----------------------------------------show chatgpt Btn clicked");
    stopEventPropagation(e);
    if (useAnnotationTool) hideAnnotationToolbox(); // 隐藏annotation toolbox，当点击其他按钮时候

    collapseChatgpt.classList.toggle("in-tools");
    toolsAndEssayToggle(collapseChatgpt);
    chatgptClickTargetObject = "SHOW_CHATGPT_BTN";
    chatgptPageEvent = "MOUSE_CLICK";

    sendEventMessage("", getCurrentTimestamp(), "CHATGPT", chatgptPageEvent, subActionLabelMap["CHATGPT_CLICK"], "CHATGPT", chatgptClickTargetObject, "SHOW_CHATGPT_BTN_CLICK", "", null);
    // let instantEvent = "";
    // let eventValue = "";
    // let saveTime = getCurrentTimestamp();
    // if (collapseChatgpt.classList.contains("in-tools")) {
    //     instantEvent = "OPEN";
    //     chatgptToolUseLength = saveTime;
    //     eventValue = "START_USE_TOOL:::" + saveTime;
    // } else {
    //     instantEvent = "CLOSE";
    //     chatgptToolUseLength = saveTime - chatgptToolUseLength;
    //     eventValue = "TOOL_USE_LENGTH:::" + chatgptToolUseLength;
    // }
    //
    // sendMyTraceDataPost("/trace-chatgpt", saveTime, "CHATGPT", "MOUSE_CLICK", "SHOW_CHATGPT_BTN", instantEvent, eventValue, e);
};

function myCallbackChatgpt(contains, element) {
    let saveTime;

    let eventValue;
    if (contains) {
        // console.log('Element with id:', element.id, 'has the "in-tools" class!');
        saveTime = getCurrentTimestamp();
        chatgptInstantEvent = "OPEN";
        eventValue = "START_USE_TOOL:::" + saveTime;
        chatgptToolStartUseTime = saveTime;
        // console.log('chatgptToolStartUseTime:' + chatgptToolStartUseTime);
        // sendMyTraceDataPost("/trace-chatgpt", saveTime, "CHATGPT", chatgptPageEvent, chatgptClickTargetObject, chatgptInstantEvent, eventValue, null);
        sendEventMessage("", saveTime, "CHATGPT", chatgptPageEvent, subActionLabelMap["CHATGPT_" + chatgptInstantEvent], "CHATGPT", chatgptClickTargetObject, chatgptInstantEvent, eventValue, null);
    } else {
        if (chatgptInstantEvent !== "CLOSE") {
            // console.log('Element with id:', element.id, 'has not the "in-tools" class!');
            saveTime = getCurrentTimestamp();
            chatgptInstantEvent = "CLOSE";
            if (chatgptToolStartUseTime === 0) {
                eventValue = "TOOL_USE_LENGTH:::ERROR-" + (saveTime - chatgptToolStartUseTime);
            } else {
                eventValue = "TOOL_USE_LENGTH:::" + (saveTime - chatgptToolStartUseTime);
            }
            // console.log('chatgpt tool use length:' + (saveTime - chatgptToolStartUseTime));
            // sendMyTraceDataPost("/trace-chatgpt", saveTime, "CHATGPT", chatgptPageEvent, chatgptClickTargetObject, chatgptInstantEvent, eventValue, null);
            sendEventMessage("", saveTime, "CHATGPT", chatgptPageEvent, subActionLabelMap["CHATGPT_" + chatgptInstantEvent], "CHATGPT", chatgptClickTargetObject, chatgptInstantEvent, eventValue, null);
        } else {
            // console.log('Element with id:', element.id, 'is keep closed');
        }

    }
    chatgptClickTargetObject = "NO_TARGET_OBJECT";
    chatgptPageEvent = "NO_PAGE_EVENT";
}
handleClassMutation(collapseChatgpt, myCallbackChatgpt); //监听