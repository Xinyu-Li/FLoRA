// const starInnerHtml = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
//   <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
// </svg>`;
//
// const starFillInnerHtml = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
//   <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
// </svg>`;


// =========评价模块需要的函数==========
/*function setupOneRegenerateAnswerBtn(textArea,logId) {
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
}*/

//================================


/*
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
*/


//--------------------------------------
//每个agent 有个chat-history-length, 进入localStorage
//所有agent 有个总的chat-history-length, 进入localStorage


/*// multiAgentsTool.js
export function createMultiAgentsTool(opts = {}) {
    /!* -----------------------------------------------------------------
       1. build unique IDs so that you can inject many copies of the tool
    ------------------------------------------------------------------*!/
    const id = opts.id || `multi-agents-${Date.now()}`;
    const rootId        = `${id}-collapse`;
    const contentId     = `${id}-chat-content`;

    const errorId       = `${id}-error-message`;
    const inputId       = `${id}-input`;
    const agentListId   = `${id}-agents-list-panel`;
    const sendBtnId     = `${id}-send-question-btn`;
    const extraBtnId    = `${id}-extra-btn`;          // <- for later


    /!* ---------------------------------------------------------------
       2. build HTML (allow caller to inject extra controls if needed)
    ----------------------------------------------------------------*!/
    const html = `
   <div class="my-horizontal-collapse-tools chatgpt-assistant" id="${rootId}">
     <div class="card card-body" style="height:100%;">
       <h6 class="mb-2">${opts.header || 'Chat Assistant'}</h6>

       <div style="height:100%;overflow-y:auto;">
         <div class="form-control" style="height:100%;word-wrap: break-word; white-space:normal;font-size:10pt;overflow:auto;" id="${contentId}">
         </div>
       </div>

       <div class="input-group mt-2" style="min-height:40px;max-height:100px;height:20%;">
         <div id="${errorId}" class="text-danger" style="display:none;"></div>

         <div contenteditable="true" class="form-control" id="${inputId}"></div>
         <div id="${agentListId}" class="dropdown-menu"></div>

         ${opts.extraButton    // caller may request an extra button
        ? `<button class="btn btn-outline-secondary"
                         id="${extraBtnId}">${opts.extraButton.text}</button>`
        : ''}

         <button type="button" class="btn btn-outline-primary"
                 id="${sendBtnId}">${opts.sendBtnText || 'Send'}</button>
       </div>
     </div>
   </div>`;

    document.body.insertAdjacentHTML('beforeend', html);

    /!* ---------------------------------------------------------------
       3. wire default listeners
    ----------------------------------------------------------------*!/
    const $root       = document.getElementById(rootId);
    const $input      = document.getElementById(inputId);
    const $sendBtn    = document.getElementById(sendBtnId);
    const $error      = document.getElementById(errorId);

    // --- default behaviour (trimmed for brevity) --------------------
    $sendBtn.addEventListener('click', () => {
        const text = $input.innerText.trim();
        if (!text) {
            $error.textContent = 'Question cannot be empty';
            $error.style.display = 'block';
            return;
        }
        opts.onSend?.(text);     // delegate to caller
        $input.innerHTML = '';
    });

    // --- placeholder handling (optional) ----------------------------
    if (opts.placeholder) {
        const showPH = () => {
            if ($input.innerText.trim() === '') {
                $input.innerHTML = `<span class="placeholder">${opts.placeholder}</span>`;
            }
        };
        const hidePH = () => {
            const ph = $input.querySelector('.placeholder');
            if (ph) ph.remove();
        };
        $input.addEventListener('focus', hidePH);
        $input.addEventListener('blur', showPH);
        showPH();
    }

    /!* ---------------------------------------------------------------
       4. mount caller-supplied listeners/behaviour
    ----------------------------------------------------------------*!/
    if (opts.extraButton) {
        document.getElementById(extraBtnId)
            .addEventListener('click', opts.extraButton.onClick);
    }

    // give caller access to the root if needed
    return { root: $root, input: $input, sendBtn: $sendBtn };
}*/


var isStage1 = typeof taskStage !== 'undefined' && taskStage === "stage1";
var isStage2 = typeof taskStage !== 'undefined' && taskStage === "stage2";
var isStage3 = typeof taskStage !== 'undefined' && taskStage === "stage3";


function getChatHistoryByCourseIdPromise(courseId) {
    return new Promise((resolve) => {
        $.get(apiBaseUrl + "/load-chatgpt-chat/" + userId + "/" + courseId, function(data, status) {
            if (status === "success") {
                resolve(data.data || []);
            } else {
                resolve([]);
            }
        });
    });
}



function scrollToChatBottom(chatContentDiv) {
    chatContentDiv.scrollTop = chatContentDiv.scrollHeight;
}
function scrollToChatTop(chatContentDiv) {
    chatContentDiv.scrollTop = 0;
}

function disableGeneralSendMessageBtn(sendBtn, toolName) {
    sendBtn.innerHTML = `
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        Processing...
    `;
    // Disable the button
    sendBtn.disabled = true;
    // generating = true; //全局变量，用来判断消息是否正在生成，可以放入localStorage
    localStorage.setItem("chat-message-generating-" + toolName + "-" + userId + "-" + currentCourseId, '1');
}

function undisableGeneralSendMessageBtn(sendBtn, toolName) {
    sendBtn.innerHTML = "Send Message";
    // Disable the button
    sendBtn.disabled = false;
    // generating = false;
    localStorage.removeItem("chat-message-generating-" + toolName + "-" + userId + "-" + currentCourseId);
}


function appendGeneralProcessingMessage(chatContentDiv, bgColor) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('d-flex', 'justify-content-start', 'mb-2');
    messageElement.innerHTML = `
                <div class="bg-secondary text-white rounded p-2 position-relative" style="max-width: 75%; background-color: ${bgColor}">
                    <div class="message-content">
                        Processing...
                        <div class="spinner-border" role="status">
                            <span class="sr-only"></span>
                        </div>
                    </div>
                </div>`;
    chatContentDiv.appendChild(messageElement);
    scrollToChatBottom(chatContentDiv);
    return messageElement;
}

function removeGeneralProcessingMessage(processingMessage) {
    // const processMessageElement = document.getElementById("processing-message");
    // chatContentDiv.removeChild(processMessageElement);
    processingMessage.remove();
    // processingMessage.parentNode.removeChild(processingMessage);
}

function updateGeneralQuestionId(messageTime, questionId, chatContentDiv) {
    console.log("messageTime:", messageTime);
    console.log("questionId:", questionId);
    let messageElement = chatContentDiv.querySelector(`div[data-message-time="${messageTime}"]`);
    let messageContentElement = messageElement.querySelector('.message-content');
    messageContentElement.setAttribute("data-questionid", questionId);
}

// 推荐定义状态常量
/*
function requestChangeGptScaffoldThumb(messageId, thumbStatus, ratingContainerType) {
    $.post(apiBaseUrl + "/update-chatgpt-message-thumb", {
        messageId: messageId,
        thumbStatus: thumbStatus,
        ratingContainerType: ratingContainerType
    }, function (data, status) {
        if (status === "success") {
            console.log("change thumb success, current thumb is:", thumbStatus);
        } else {
            console.log("change thumb failure");
        }
    });
}*/


function requestGeneralChangeThumb(messageId, thumbStatus, ratingContainerType) { //messageId 即 userChatgptLog id
    $.post(apiBaseUrl + "/update-chatgpt-message-thumb", {
        messageId: messageId,
        thumbStatus: thumbStatus,
        ratingContainerType: ratingContainerType
    }, function (data, status) {
        if (status === "success") {
            console.log("change thumb success, current thumb is:", thumbStatus);
        } else {
            console.log("change thumb failure");
        }
    });
}

function changeThumbDisplay(currentNode, sibling, isUpOrDown) {
    const THUMB_NONE = 0;
    const THUMB_UP = 1;
    const THUMB_DOWN = 2;
    let thumbStatus = THUMB_NONE;
    if (isUpOrDown) {

        if(!currentNode.classList.contains('rating-gray')) {
            // 取消点赞
            currentNode.classList.add('rating-gray');
            thumbStatus = THUMB_NONE;
        } else {
            // 点赞（并取消踩）
            currentNode.classList.remove('rating-gray');
            if(sibling) {
                sibling.classList.add('rating-gray');
            }
            thumbStatus = THUMB_UP;
        }
    } else if (isUpOrDown) {
        if(!currentNode.classList.contains('rating-gray')) {
            // 取消点踩
            currentNode.classList.add('rating-gray');
            thumbStatus = THUMB_NONE;
        } else {
            // 点踩（并取消赞）
            currentNode.classList.remove('rating-gray');
            if(sibling) {
                sibling.classList.add('rating-gray');
            }
            thumbStatus = THUMB_DOWN;
        }
    }
    return thumbStatus;
}



function askGeneralSpecifiedAgentQuestion(question, agent, threadId, allowRegenerate, allowEdit, processingMessageBgColor, questionBgColor, answerBgColor, chatContentDiv, chatSendBtn, chatInput) {

    if (question.length > 0) {
        // let safeQuestion = escapeHTML(question);

        //发送新问题时候，messageId是空, appendGeneralQuestionHtml在当前方法的父方法中调用
        // appendGeneralQuestionHtml(question, timestamp, "", allowRegenerate, allowEdit, questionBgColor, chatContentDiv);
        chatInput.innerHTML = ""; // 清空输入框
        let processingMessage = appendGeneralProcessingMessage(chatContentDiv, processingMessageBgColor);
        chatSendBtn.disabled = true;
        // chatInput.contentEditable = "false";
        chatInput.focus();

        console.log("askGeneralSpecifiedAgentQuestion--------------");
        console.log("chatContentDiv", chatContentDiv);
        console.log("chatSendBtn", chatSendBtn);
        console.log(chatSendBtn.disabled);
        console.log("agent", agent);
        let essayContent = mainEditor?.getText() ?? "";

        let chatgptData = {
            question: question,
            userId: userId,
            courseId: currentCourseId,
            essay: essayContent,
            questionId: "",
            includeEssay: agent.promptIncludeEssay,
            chatgptRoleDescription: agent.agentDescription,
            chatgptRole: agent.agentRole,       // chatgpt role 用来初步区分 访问python 端的 url
            backgroundFileNameList: agent.backgroundFileNameList,
            chatgptParameters: agent.chatgptParameters,
            agentName: agent.agentName, // assistant name/agent name， 可以找到preprompt
            threadId: threadId,
            toolsLanguage: toolsLanguage
        };
        console.log("url:", apiBaseUrl + "/chatgpt");
        $.ajax({
            url: apiBaseUrl + "/chatgpt",
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(chatgptData),
            dataType: 'json',
            success: function (data, status) {
                chatSendBtn.disabled = false;
                // chatInput.contentEditable = "true";
                // chatInput变focused
                chatInput.focus();

                if (status === "success") {
                    // logIdToQuestionIdMapMultiSeparateAgents[data.data.id] = data.data.questionId;

                    // chatInput.innerHTML = ""; // 清空输入框
                    let resContent = data.data.chatgptAnswer;
                    let questionId = data.data.questionId;
                    let resThreadId = data.data.threadId;
                    if (resContent === "error") {
                        resContent = "There is an error, please try again.";
                    }

                    let chatHistoryLengthTemp = localStorage.getItem(userId + "-" + currentCourseId + "-" + agent.agentName + "-chat-history-length");
                    let chatHistoryLength = 0;
                    if (chatHistoryLengthTemp) {
                        chatHistoryLength = parseInt(chatHistoryLengthTemp);
                    }
                    chatHistoryLength += 1;
                    appendGeneralAgentAnswerHtml(resContent, data.data.chatgptResponseTime, questionId, data.data.id, agent.agentDisplayName, agent.agentAvatarSvg, agent.useRating, 0, chatHistoryLength, answerBgColor, chatContentDiv);

                    localStorage.setItem(userId + "-" + currentCourseId + "-" + agent.agentName + "-chat-history-length", "" + chatHistoryLength);

                    if (threadId === "") {
                        localStorage.setItem(userId + "-" + currentCourseId + "-" + agent.agentName + "-agent-thread-id", resThreadId);
                    }
                } else {
                    // logIdToQuestionIdMapMultiSeparateAgents[data.data.id] = "error";
                    // console.log(logIdToQuestionIdMapMultiSeparateAgents)

                    alert("An error occurred while processing your question.");
                }
                removeGeneralProcessingMessage(processingMessage);
            }
        });
        return question;
    }

    return "";
}

// 抽离出生成聊天界面提问信息和回复信息html结构的函数，避免因为html结构修改写重复代码
function appendGeneralQuestionHtml(question, timestamp, messageId, allowRegenerate, allowEdit, bgColor, chatContentDiv) {
    // if (question === null) {
    //     question = "error";
    // }
    // question = question.replace(/\n/g, '<br>');
    const readableTime = new Date(parseInt(timestamp, 10)).toLocaleTimeString();
    let regenerateBtnHtml = `<i class="bi bi-arrow-clockwise text-white me-3 action-icon regenerate-icon" title="Regenerate Response" style="cursor: pointer;"></i>`;
    let editBtnHtml = `<i class="bi bi-arrow-clockwise text-white me-3 bi-pencil reenter-icon" title="Re-enter Question" style="cursor: pointer;"></i>`;
    const result = `
        <div class="message-content justify-content-end" data-message-time="${timestamp}">
            <div class="user-question" data-messageid="${messageId}">
                ${question}<br><span class="timestamp">${readableTime}</span>
            </div>
            <div class="mt-2 d-flex align-items-center">
                ${allowRegenerate ? regenerateBtnHtml : ''}
                ${allowEdit ? editBtnHtml : ''}
            </div>
            
        <div class="user-avatar-wrapper">
            <div class="user-avatar">
                <svg t="1702520734210" viewBox="0 0 1024 1024"  xmlns="http://www.w3.org/2000/svg" p-id="4264" width="30" height="30"><path d="M517.632 552.149333c-108.714667 0-197.162667-85.546667-197.162667-190.72 0-38.314667 11.690667-75.306667 33.877334-106.922666C391.04 202.026667 452.138667 170.666667 517.632 170.666667c65.408 0 126.464 31.274667 163.2 83.712 7.765333 11.093333 14.250667 22.869333 19.413333 35.072a21.333333 21.333333 0 1 1-39.338666 16.64 147.285333 147.285333 0 0 0-15.018667-27.221334C617.130667 237.824 569.173333 213.333333 517.632 213.333333c-51.626667 0-99.584 24.533333-128.426667 65.621334a143.445333 143.445333 0 0 0-26.069333 82.432c0 81.664 69.290667 148.096 154.453333 148.096 63.402667 0 119.722667-36.437333 143.36-92.8a21.333333 21.333333 0 0 1 39.338667 16.512c-30.378667 72.277333-102.016 118.954667-182.656 118.954666" fill="#3C405D" p-id="4265"></path><path d="M303.829333 627.456c-49.92 0-90.453333 41.088-90.453333 91.605333C213.333333 769.578667 253.866667 810.666667 303.786667 810.666667h416.341333C770.133333 810.666667 810.666667 769.578667 810.666667 719.061333c0-50.517333-40.533333-91.605333-90.453334-91.605333H303.786667zM720.213333 853.333333H303.829333C230.442667 853.333333 170.709333 793.088 170.709333 719.061333 170.666667 645.034667 230.4 584.789333 303.786667 584.789333h416.341333C793.6 584.789333 853.333333 645.034667 853.333333 719.061333 853.333333 793.088 793.6 853.333333 720.213333 853.333333z" fill="#3C405D" p-id="4266"></path></svg>
            </div>
<!--            <div class="user-name">${getUsername()}</div>-->
         </div>

        </div>
    `;
    chatContentDiv.insertAdjacentHTML('beforeend', result);
    scrollToChatBottom(chatContentDiv);
    return result;
}
/**
 * 把此方法作为通用chatgpt的answer生成方法
 */
function appendGeneralAgentAnswerHtml(answer, timestamp, questionId, messageId, agentDisplayName, agentAvatarSvg, useRating, ratingResult, roundNumber, bgColor, chatContentDiv) {
    // if (answer === null) {
    //     answer = "gpt-error";
    // }
    // answer = answer.replace(/\n/g, '<br>');

    // console.log("---------------------11111111111--------------------------111111111111----------------");
    // console.log("questionId:" + questionId + "ratingResult:", ratingResult)
    const readableTime = new Date(parseInt(timestamp, 10)).toLocaleTimeString();
    const ratingHtml = `                <!-- 一排按钮，点赞、点踩-->
        <div class="mt-2 d-flex align-items-center">
            <span>${likeResponseText}</span>
                <img src="/flora/img/thumb_up_0.png" class="thumbs-up-icon ${ratingResult === 1 ? '' : 'rating-gray'}" style="margin-left:10px; width:24px; height:24px; cursor: pointer;"  alt="thumb up"/>
                <img src="/flora/img/thumb_down_0.png" class="thumbs-down-icon ${ratingResult === 2 ? '' : 'rating-gray'}" style="margin-left:10px; width:24px; height:24px; cursor: pointer;"  alt="thumb down"/>
<!--            <img src="${ratingResult === 1 ? "/flora/img/thumb_up_1.png" : "/flora/img/thumb_up_0.png"}" class="thumbs-up-icon" style="margin-left:10px; width:24px; height:24px; cursor: pointer;"  alt="thumb up"/>-->
<!--            <img src="${ratingResult === 2 ? "/flora/img/thumb_down_1.png" : "/flora/img/thumb_down_0.png"}" class="thumbs-down-icon" style="margin-left:10px; width:24px; height:24px; cursor: pointer;"  alt="thumb down"/>-->
<!--            <i class="bi bi-hand-thumbs-up me-2 action-icon thumbs-up-icon ${ratingResult === 1 ? 'my-text-success' : 'text-white'}" title="Thumbs Up" style="cursor: pointer;"></i>-->
<!--            <i class="bi bi-hand-thumbs-down action-icon thumbs-down-icon ${ratingResult === 2 ? 'my-text-danger' : 'text-white'}" title="Thumbs Down" style="cursor: pointer;"></i>-->
        </div>
    `;
    let result = `
        <div class="message-content" data-message-time="${timestamp}">
            <div class="agent-avatar-wrapper">
                <div class="bot-avatar">
                    ${agentAvatarSvg}
                </div>
                <div class="agent-name">${agentDisplayName}</div>
            </div>
            <div class="bot-answer" data-messageid="${messageId}" data-questionid="${questionId}" style="background-color: ${bgColor}">
                <div class="bot-answer-content">${answer}<br><span class="timestamp">${readableTime}</span>&nbsp;&nbsp;&nbsp;<span class="chat-rounds">round: ${roundNumber}</span></div>
                ${useRating ? ratingHtml : ''}
            </div>
        </div>
    `;
    chatContentDiv.insertAdjacentHTML('beforeend', result);
    scrollToChatBottom(chatContentDiv);
    return result;
}

function appendGeneralGptScaffoldsOrHint(answer, readableTime, order, messageId, useRating, ratingResult,scaffoldOrHint, bgColor, chatContentDiv) {
    // answer = answer.replace(/\n/g, '<br>');

    // console.log("---------------------12312312--------------------------123123----------------");

    const ratingHtml = `                <!-- 一排按钮，点赞、点踩-->
        <div class="mt-2 d-flex align-items-center">
            <span style="font-size:12px;">${likeResponseText}</span>
            <img src="/flora/img/thumb_up_0.png" class="thumbs-up-icon ${ratingResult === 1 ? '' : 'rating-gray'}" style="margin-left:10px; width:24px; height:24px; cursor: pointer;"  alt="thumb up"/>
            <img src="/flora/img/thumb_down_0.png" class="thumbs-down-icon ${ratingResult === 2 ? '' : 'rating-gray'}" style="margin-left:10px; width:24px; height:24px; cursor: pointer;"  alt="thumb down"/>
<!--            <i class="bi bi-hand-thumbs-up text-white me-2 action-icon thumbs-up-icon" title="Thumbs Up" style="cursor: pointer;"></i>-->
<!--            <i class="bi bi-hand-thumbs-down text-white action-icon thumbs-down-icon" title="Thumbs Down" style="cursor: pointer;"></i>-->
        </div>`;
    let result = `
        <div class="gpt-scaffold-message-content" id="${scaffoldOrHint === "scaffold" ? 'scaffold' : 'reminder'}${order}" data-messageid="${messageId}">
            <div class="gpt-scaffold-bot-answer" style="background-color: ${bgColor}">
                <h6>${scaffoldOrHint === "scaffold" ? scaffoldingMessageTitle + ':' : chatReminderMessageTitle} </h6>
                ${answer}<br>
                <span class="timestamp" style="font-size:12px;color:#b7b7b7; margin-bottom: 20px;">${readableTime}</span>
                ${useRating ? ratingHtml : ''}
            </div>
        </div>`;
    chatContentDiv.insertAdjacentHTML('beforeend', result);
    scrollToChatBottom(chatContentDiv);

    return result;
}


/*
function requestAgentScaffold(scaffoldAgent, agentScaffoldOrder, threadId, agentScaffoldTriggers, defaultScaffoldTriggers, agentScaffoldMessageContentDiv) {
    // let agentScaffoldOrder =  parseInt(localStorage.getItem(userId + "-" + currentCourseId + "-" + scaffoldAgent.agentName + "-agent-scaffold-order"), 10) || 0;

    let gptScaffoldData = {
        gptScaffoldNumber: agentScaffoldOrder,
        gptScaffoldPromptVO: agentScaffoldTriggers[agentScaffoldOrder - 1],
        testISDIMUName: testISDIMUName,
        preTestName: preTestName,
        hasTakePreviousStudyTestName: hasTakePreviousStudyTestName,

        preTestCourseId: pretestNameCourseId,
        testISDIMUCourseId: testISDIMUCourseId,
        hasTakePreviousStudyTestNameCourseId: hasTakePreviousStudyTestNameCourseId,
        essay: mainEditor.getText(),
        // subActionAndPromptList: gptScaffoldNeedCheckSubActionPrompt,

        // savePlannerSelectedIndexPromptList: gptScaffoldNeedCheckSavePlannerSelectIndexPrompt,
        userId: userId,
        courseId: currentCourseId,
        includeEssay: scaffoldAgent.agentPromptIncludeEssay,
        gptScaffoldRole: scaffoldAgent.agentRole,
        gptScaffoldPromptTemplate: scaffoldAgent.agentPromptTemplate,

        gptScaffoldRoleDescription: scaffoldAgent.agentDescription,
        userTakePreviousStudyPrompt: userTakePreviousStudyPrompt,
        srlModel: srlModel,

        pretestGradesPrompt: pretestGradesPrompt,
        isdimuScorePrompt: isdimuScorePrompt,
        srlProcessBackupPromptList: srlProcessBackupPromptList,  //存储每个SRL process 的不同条件下的 prompt
        backgroundFileNameList: scaffoldAgent.agentBackgroundFileNameList,
        gptScaffoldParameters: scaffoldAgent.agentParameters,
        // gptScaffoldReturnMessages: scaffoldAgent.triggerConfigs.fixedMessageTriggers ?? null, //此种设计是希望从GPTScaffold 窗口直接返回固定的message
        hasDefaultScaffoldsPrompt: scaffoldAgent.hasDefaultScaffoldsPrompt ?? false,
        // hasDefaultScaffolds: scaffoldAgent.hasDefaultScaffolds ?? false,
        toolsLanguage: toolsLanguage
    }
    sendEventMessage("", getCurrentTimestamp(), "AGENT_SCAFFOLD", "NO_PAGE_EVENT", "AGENT_SCAFFOLD_TRIGGERED", "AGENT_SCAFFOLD","NO_TARGET_OBJECT", "CHATGPT_SCAFFOLD_TRIGGERED", "AGENT_SCAFFOLD_ORDER:::" + agentScaffoldOrder + ":::AGENT_NAME:::" + scaffoldAgent.agentName, null);

    $.ajax({
        url: apiBaseUrl + "/chatgpt-scaffold",
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(gptScaffoldData),
        dataType: 'json',
        success: function (data, status) {
            console.log("requestAgentScaffold:", status);
            let subAction = "";
            if (status === "success") {
                const readableTime = new Date(parseInt(data.data.gptResponseTime, 10)).toLocaleTimeString();
                if (data.data === null) {
                    //表示不需要展示scaffold
                    subAction = "AGENT_SCAFFOLD_RECEIVED_NO_SCAFFOLD";
                    if (defaultScaffoldTriggers !== null && defaultScaffoldTriggers.length > 0) {
                        subAction = "AGENT_SCAFFOLD_RECEIVED_DEFAULT_MESSAGE";
                        console.log("default message:", defaultScaffoldTriggers[agentScaffoldOrder - 1].message);
                        appendGeneralGptScaffoldsOrHint(defaultScaffoldTriggers[agentScaffoldOrder - 1].message, readableTime, agentScaffoldOrder, data.data.id, true, 0, "scaffold", "#c192e8", agentScaffoldMessageContentDiv);
                    }
                } else {
                    // Remove the processing sign

                    let resContent = data.data.gptScaffoldContent; //.replace("\n", "<br>"); //answer = answer.replace("\n", "<br>")
                    if (resContent === "gpt-error") {
                        resContent = "There is an error from Chatgpt, Please re-send your question.";
                    }
                    appendGeneralGptScaffoldsOrHint(resContent, readableTime, agentScaffoldOrder, data.data.id, true, 0, "scaffold", "#c192e8", agentScaffoldMessageContentDiv);
                    // addEventForEachScaffold(order);

                    // 展示alert message
                    // showGPTScaffoldsBtn.querySelector("span").classList.remove("d-none");

                    // localStorage.setItem(userId + "-" + currentCourseId + "-agent-scaffold-" + agentScaffoldOrder + "-view-status", "false");
                    // localStorage.setItem(userId + "-" + currentCourseId + "-agent-scaffold-" + agentScaffoldOrder + "-trigger-timestamp", "" + getCurrentTimestamp());

                    subAction = "AGENT_SCAFFOLD_RECEIVED";

                }
            } else {
                // Remove the processing sign
                subAction = "AGENT_SCAFFOLD_RECEIVED_REPEAT_REQUEST";
            }

            sendEventMessage("", getCurrentTimestamp(), "AGENT_SCAFFOLD", "NO_PAGE_EVENT", subAction, "AGENT_SCAFFOLD","NO_TARGET_OBJECT", "AGENT_SCAFFOLD_RECEIVED", "AGENT_SCAFFOLD_ORDER:::" + agentScaffoldOrder + ":::AGENT_NAME:::" + scaffoldAgent.agentName, null);
        },
        error: function (xhr, status, error) {
            // console.log("exception happen" + error);

        }
    });
}
*/


async function getTimestampWithRetry(userId, currentCourseId, retryInterval = 3000, maxRetries = Infinity) {
    let retries = 0;
    let tempTaskStartTimestamp = parseInt(localStorage.getItem(`${userId}-${currentCourseId}-taskStartTimestamp`)) || 0;

    while (tempTaskStartTimestamp === 0 && retries < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, retryInterval));
        tempTaskStartTimestamp = parseInt(localStorage.getItem(`${userId}-${currentCourseId}-taskStartTimestamp`)) || 0;
        retries++;
    }

    if(tempTaskStartTimestamp === 0) {
        throw new Error("无法获取有效tempTaskStartTimestamp，已达最大重试次数");
    }

    return tempTaskStartTimestamp; // 异步函数返回有效值
}

function triggerTimeRangeOrFixedMessageScaffold(scaffoldAgent, threadId, agentScaffoldTriggers, defaultScaffoldTriggers, agentScaffoldMessageContentDiv) {

    getTimestampWithRetry(userId, currentCourseId).then(tempTaskStartTimestamp => {
        console.log("agent Scaffold start task timestamp：", tempTaskStartTimestamp);

        // 每5秒检测一次scaffold 触发
        let intervalId = setInterval(function() {

            let agentScaffoldOrder = parseInt(localStorage.getItem(userId + "-" + currentCourseId + "-" + scaffoldAgent.agentName + "-agent-scaffold-order"), 10) || 1;  // order最小值为1
            console.log("agent Scaffoldorder:", agentScaffoldOrder);
            if (agentScaffoldOrder <= agentScaffoldTriggers.length) {
                let spendTimeSeconds = (getCurrentTimestamp() -  tempTaskStartTimestamp) / 1000;
                // 获取当前的触发时间
                let currentTriggerMinute = agentScaffoldTriggers[agentScaffoldOrder - 1].triggerMinute;

                console.log("agentscaffolding.....spendTimeSeconds:" + spendTimeSeconds + ".....currentTriggerSecond:" + currentTriggerMinute * 60);

                if (spendTimeSeconds >= (60 * currentTriggerMinute)) {
                    if (scaffoldAgent.triggerConfigs.triggerRule === "timeRangeTriggers") {
                        requestAgentScaffold(scaffoldAgent, agentScaffoldOrder, threadId, agentScaffoldTriggers, defaultScaffoldTriggers, agentScaffoldMessageContentDiv);
                    } else {
                        // fixedMessageTriggers
                        // appendGeneralGptScaffoldsOrHint(agentScaffoldTriggers[agentScaffoldOrder - 1].message, new Date().toLocaleTimeString(), agentScaffoldOrder, true, "#c192e8", agentScaffoldMessageContentDiv);
                    }

                    // agent Scaffold trigger order finish, order + 1
                    localStorage.setItem(userId + "-" + currentCourseId + "-" + scaffoldAgent.agentName + "-agent-scaffold-order", "" + (agentScaffoldOrder + 1));
                } else {
                    console.log("agent scaffolding not trigger.....gptScaffoldOrder:" + agentScaffoldOrder);
                    console.log("agent scaffolding not trigger.....spendTimeSeconds:" + spendTimeSeconds + ".....currentTriggerSecond:" + currentTriggerMinute * 60);
                }
            } else if (agentScaffoldOrder === agentScaffoldTriggers.length + 1) {
                console.log("agent scaffolding triggering finish!!!!!");
                clearInterval(intervalId);
            }
        }, 5 * 1000); //7 * 60 * 1000
    }).catch(error => {
        console.error("出错了：", error);
    });
}

/**
 * 此方法未完成
 * @param scaffoldAgent
 * @param chatRound
 * @param threadId
 * @param agentScaffoldTriggers
 * @param defaultScaffoldTriggers
 * @param agentScaffoldMessageContentDiv
 */
function triggerChatRoundScaffold(scaffoldAgent, chatRound, threadId, agentScaffoldTriggers, defaultScaffoldTriggers, agentScaffoldMessageContentDiv) {
    // localStorage.setItem(userId + "-" + currentCourseId + "-" + agentName + "-chat-history-length", "" + count);
}

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

// multiAgentsPlaceHolderText
function showMultiAgentsPlaceholder(multiAgentsInput, placeholderText) {
    if (multiAgentsInput.innerText.trim() === '') {
        multiAgentsInput.innerHTML = `<span class="placeholder">${placeholderText}</span>`;
    }
}

function hideMultiAgentsPlaceholder(multiAgentsInput) {
    const placeholder = multiAgentsInput.querySelector('.placeholder');
    if (placeholder) {
        multiAgentsInput.removeChild(placeholder);
    }
}

function multiAgentsKeyupHandler(source, e) { //"CHATGPT_MULTI_AGENTS_SINGLE_WINDOW"
    sendEventMessage("", getCurrentTimestamp(), source, "KEYBOARD_STROKE", "ASK_MULTI_AGENTS", "CHATGPT", "QUESTION_INPUT", "WRITE_QUESTION", "KEY:::" + e.key + "---" + e.code, e);
}

function multiAgentsKeydownHandler(multiAgentsStartConversationTime, key, source, e) {
    // Check if Backspace is pressed
    if (e.key === 'Backspace') {
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        const startOffset = range.startOffset;
        console.log("startOffset:", startOffset);
        if (startOffset === 0) {
            const previousNode = range.startContainer.previousSibling;
            if (previousNode && previousNode.nodeType === Node.ELEMENT_NODE && previousNode.classList.contains('highlight-mention')) {
                previousNode.remove();
                e.preventDefault(); // Prevent the default Backspace behavior
            }
        } else {
            // Check if the previous character is part of a highlight span
            const textNode = range.startContainer;
            const offset = startOffset - 1;
            if (textNode.nodeType === Node.TEXT_NODE && textNode.parentNode.classList.contains('highlight-mention')) {
                const span = textNode.parentNode;
                span.remove();
                e.preventDefault(); // Prevent the default Backspace behavior
            }
        }
    } else if (e.ctrlKey && e.key === 'Enter') {
        e.preventDefault();
        sendEventMessage("", getCurrentTimestamp(), source, "KEYBOARD_STROKE", "ASK_MULTI_AGENTS", "CHATGPT", null, "SUBMIT_QUESTION_PRESS_ENTER", "", null);
        return "send";
    }
    return "";
}

function getAgentCaretCoordinates(multiAgentsInput) {
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

function showAgentsList(rect, agentsListPanel, availableMultiAgents) {
    agentsListPanel.innerHTML = [...availableMultiAgents.values()].map(agent => `<a class="dropdown-item" data-agent-name="${agent.agentName}" href="#">${agent.agentDisplayName}</a>`).join('');

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
function hideAgentsList(agentsListPanel) {
    agentsListPanel.style.display = 'none';
    agentsListPanel.classList.remove('show');
}


function insertAgentDisplayName(agentDisplayName, agentName, source) {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    // Move the range back to include the @ character
    range.setStart(range.startContainer, range.startOffset - 1);

    // Create a span for the highlighted username
    const span = document.createElement('span');
    span.className = 'highlight-mention';
    span.dataset.name = agentName;
    span.textContent = `@${agentDisplayName} `;

    // Insert the span and collapse the range after the span
    range.deleteContents(); // Delete the @ character
    range.insertNode(span);
    sendEventMessage("", getCurrentTimestamp(), source, "CLICK", "ASK_MULTI_AGENTS", "CHATGPT", "QUESTION_INPUT", "SELECT_AGENT", "AGENT_NAME::" + agentDisplayName, null);
    // Move the cursor after the inserted span
    const textNode = document.createTextNode('\u200B'); // Insert a zero-width space after the span
    range.setStartAfter(span);
    range.insertNode(textNode);
    range.setStartAfter(textNode); // Set the cursor after the zero-width space
    selection.removeAllRanges();
    selection.addRange(range);
    hideAgentsList();
}


function setChatStartTime(multiAgentsStartConversationTime, key) {
    // 记录对话开始时间 -
    if (multiAgentsStartConversationTime === 0) {
        const startConversationTime = getCurrentTimestamp();
        localStorage.setItem(key, startConversationTime.toString());
    }
}

function getSharedAgentThreadId(availableMultiAgents) {
    let availableAgentNames = Array.from(availableMultiAgents.keys());
    let availableAgentThreadIds = availableAgentNames.map(agentName => {
        return localStorage.getItem(`${userId}-${currentCourseId}-${agentName}-agent-thread-id`) || "";
    });

    return availableAgentThreadIds.find(threadId => threadId !== "") || "";
}

/**
 *
 * @returns {null|string}
 */
function checkAndSendMultiAgentsUserQuestion(agentNameKey, multiAgentsInput, errorMessageDiv, multiAgentsPlaceHolderText, multiAgentsChatContentDiv, availableMultiAgents, multiAgentsSendQuestionBtn, source, isScaffold) {
    // 发送问题时候会调用此函数获取用户问题内容

    console.log(`checkAndSendMultiAgentsUserQuestion: agentNameKey:${agentNameKey}, multiAgentsInput:${multiAgentsInput}, errorMessageDiv:${errorMessageDiv}, multiAgentsPlaceHolderText:${multiAgentsPlaceHolderText}, multiAgentsChatContentDiv:${multiAgentsChatContentDiv}, availableMultiAgents:${availableMultiAgents}, multiAgentsSendQuestionBtn:${multiAgentsSendQuestionBtn}, source:${source}`);
    console.log("availableMultiAgents:",availableMultiAgents);

    // const question = assistantPanelInput.value;
    const mentions = multiAgentsInput.querySelectorAll("span.highlight-mention");
    console.log("----------------mentions:", mentions);

    let agentName = null;
    let currentChatAgentName = localStorage.getItem(agentNameKey);
    console.log("currentChatAgentName:--------------", currentChatAgentName);
    if (mentions.length > 0) {
        agentName = mentions[0].dataset.name;
        localStorage.setItem(agentNameKey, agentName);
        currentChatAgentName = agentName;
    } else if (currentChatAgentName === null) {
        errorMessageDiv.innerHTML = "please @ a chatbot to continue~";
        errorMessageDiv.style.display = "block";
        setTimeout(() => {
            errorMessageDiv.style.display = "none";
        }, 5000);
        return null;
    }
    mentions.forEach(span => span.remove());
    console.log("checkAndSendMultiAgentsUserQuestion-----currentChatAgentName:", currentChatAgentName);

    const question = multiAgentsInput.textContent.trim();
    // console.log(question);
    if (question.length > 0 && question !== multiAgentsPlaceHolderText) {
        multiAgentsInput.innerText = "";
        if (!isScaffold) {
            appendGeneralQuestionHtml(question, getCurrentTimestamp(), "", false, false, "", multiAgentsChatContentDiv);
        }

        // let sharedAgentThreadId = availableAgentThreadIds.find(threadId => threadId !== "") || "";
        let sharedAgentThreadId = getSharedAgentThreadId(availableMultiAgents);
        console.log("availableMultiAgents:",availableMultiAgents.get(currentChatAgentName));
        askGeneralSpecifiedAgentQuestion(question, availableMultiAgents.get(currentChatAgentName), sharedAgentThreadId, false, false, "", "", "", multiAgentsChatContentDiv, multiAgentsSendQuestionBtn, multiAgentsInput);
        // allChatRound += 1;
        sendEventMessage("", getCurrentTimestamp(), source, "MOUSE_CLICK", "ASK_MULTI_AGENTS", "CHATGPT", null, "SUBMIT_QUESTION", "AGENT_NAME:::" + currentChatAgentName + ":::QUESTION:::" + question, null);

        console.log("currentChatAgentName",currentChatAgentName);
        return question;
    } else {
        let timestamp = new Date().toLocaleTimeString();
        errorMessageDiv.innerHTML = "Question cannot be empty!";
        errorMessageDiv.style.display = "block";
        setTimeout(() => {
            errorMessageDiv.style.display = "none";
        }, 3000);    // 5000毫秒 = 5秒
        return null;
    }
}

/*function generateAnswerHtml(answer, timestamp) {
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
}*/

//暂时弃用 deprecated
/*function createProcessingMessage() {
    const timestamp = new Date().toLocaleTimeString();
    const processingMessage = document.createElement("div");  // 此处必须要有一个dom 对象
    processingMessage.innerHTML = generateAnswerHtml("Processing", timestamp, "");
    return processingMessage;
}*/

//准备弃用，使用其他方法替代
/*function generateChatgptDoctorScaffoldHtml(answer,timestamp){
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
}*/




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



// ----------------------------------------------
// 工具：判断是否还有除作文面板外的已展开面板
function hasOtherOpenPanels() {
    return [...document.querySelectorAll('.in-tools, .in-tools-move-more-left')]
        .some(p => p !== collapseWriteEssay);
}

// 工具：确保作文面板位置符合规则
function adjustEssayPosition() {
    if (!collapseWriteEssay) return;

    const essayOpen  = collapseWriteEssay.classList.contains('in-tools') ||
        collapseWriteEssay.classList.contains('in-tools-move-more-left');
    if (!essayOpen) return;           // 折叠状态不用管

    if (hasOtherOpenPanels()) {
        // 应固定最左
        collapseWriteEssay.classList.add('in-tools-move-more-left');
        collapseWriteEssay.classList.remove('in-tools');
    } else {
        // 仅剩作文面板 ⇒ 放最右
        collapseWriteEssay.classList.add('in-tools');
        collapseWriteEssay.classList.remove('in-tools-move-more-left');
    }
}

// ----------------------------------------------
function activatePanel(panel) {
    /* ========= 0. 面板集合 ========= */
    const toolPanels = [
        typeof collapseChatgpt                     !== 'undefined' ? collapseChatgpt                     : null,
        typeof collapseMultiAgents                !== 'undefined' ? collapseMultiAgents                : null,
        typeof patientCollapseMultiAgents         !== 'undefined' ? patientCollapseMultiAgents        : null,
        typeof assistCheckCollapseMultiAgents     !== 'undefined' ? assistCheckCollapseMultiAgents     : null,
        typeof tigeCheckCollapseMultiAgents       !== 'undefined' ? tigeCheckCollapseMultiAgents       : null,
        typeof medicalScaffoldCollapseMultiAgents !== 'undefined' ? medicalScaffoldCollapseMultiAgents : null,
        typeof collapseWriteEssay                 !== 'undefined' ? collapseWriteEssay                 : null,
        typeof consultationCollapse               !== 'undefined' ? consultationCollapse               : null,
        typeof titleAssistCollapseMultiAgents     !== 'undefined' ? titleAssistCollapseMultiAgents     : null,
        typeof writingAssistCollapseMultiAgents     !== 'undefined' ? writingAssistCollapseMultiAgents     : null,
        typeof assessmentAssistCollapseMultiAgents     !== 'undefined' ? assessmentAssistCollapseMultiAgents     : null,
    ].filter(Boolean);

    const isEssay     = panel === collapseWriteEssay;
    const isRightMost = panel.classList.contains('in-tools');
    const isLeftOpen  = panel.classList.contains('in-tools-move-more-left');

    /* ========= 1. 点击最右面板 → 折叠 ========= */
    if (isRightMost) {
        panel.classList.remove('in-tools');
        // 把位于“更左”位置的面板整体右移
        toolPanels.forEach(p => {
            if (p.classList.contains('in-tools-move-more-left')) {
                p.classList.remove('in-tools-move-more-left');
                p.classList.add('in-tools');
            }
        });
        return;
    }

    /* ========= 2. 点击左移展开面板 → 折叠 ========= */
    if (isLeftOpen) {
        panel.classList.remove('in-tools-move-more-left');
        return;
    }

    /* ========= 3. 准备展开一个当前处于折叠状态的面板 ========= */
    // 3-A：统计已展开的面板
    const openPanels = toolPanels.filter(p =>
        p.classList.contains('in-tools') || p.classList.contains('in-tools-move-more-left')
    );

    /* 3-B：若已展开 ≥2 个，需先执行“只留(最多)1 个”规则 */
    if (openPanels.length >= 2) {
        if (openPanels.includes(collapseWriteEssay)) {
            // 留作文面板，收回另一个
            openPanels.forEach(p => {
                if (p !== collapseWriteEssay) {
                    p.classList.remove('in-tools', 'in-tools-move-more-left');
                }
            });
        } else {
            // 没有作文面板 → 全部收回
            openPanels.forEach(p => p.classList.remove('in-tools', 'in-tools-move-more-left'));
        }
    }

    /* ========= 4. 重新计算“是否还有其它面板打开” ========= */
    const othersOpen = toolPanels.some(p =>
        p !== panel &&
        (p.classList.contains('in-tools') || p.classList.contains('in-tools-move-more-left'))
    );

    /* 4-A：决定新面板应放置的位置 */
    const willBeRightMost = !(isEssay && othersOpen); // 作文面板且已有其它面板 → 固定最左

    toolPanels.forEach(p => {
        if (p === panel) {
            // 放置新面板
            if (willBeRightMost) {
                p.classList.add('in-tools');
                p.classList.remove('in-tools-move-more-left');
            } else { // 作文面板固定最左
                p.classList.add('in-tools-move-more-left');
                p.classList.remove('in-tools');
            }
        } else if (willBeRightMost && p.classList.contains('in-tools')) {
            // 新面板成为最右 → 原最右左移
            p.classList.add('in-tools-move-more-left');
            p.classList.remove('in-tools');
        }
        /* 其余保持原状态 */
    });
}


// ----------------------------------------------------
// 只允许 essay 与 1 个其他工具共现；非-essay 工具互斥
function activatePanelGeneral(panel) {
    /* ========= 0. 准备面板集合 ========= */
    const toolPanels = [  // 根据study的需要增加别的
        typeof collapseChatgpt                     !== 'undefined' ? collapseChatgpt                     : null,
        typeof collapseMultiAgents                !== 'undefined' ? collapseMultiAgents                : null,
        typeof assistCheckCollapseMultiAgents     !== 'undefined' ? assistCheckCollapseMultiAgents     : null,
        typeof tigeCheckCollapseMultiAgents       !== 'undefined' ? tigeCheckCollapseMultiAgents       : null,
        typeof medicalScaffoldCollapseMultiAgents !== 'undefined' ? medicalScaffoldCollapseMultiAgents : null,
        typeof collapseWriteEssay                 !== 'undefined' ? collapseWriteEssay                 : null,
    ].filter(Boolean);

    const essayPanel    = collapseWriteEssay;            // 便于引用
    const isEssayClick  = panel === essayPanel;
    const isOpen        = p => p.classList.contains('in-tools') ||
        p.classList.contains('in-tools-move-more-left');

    /* ========= 1. 当前展开状态 ========== */
    const essayOpen = essayPanel && isOpen(essayPanel);
    const openTool  = toolPanels.find(p => p !== essayPanel && isOpen(p)); // 可能为 undefined

    /* ========= 2. handle “点击的是 essay” ========= */
    if (isEssayClick) {
        if (essayOpen) {                   // 2-A 折叠 essay
            essayPanel.classList.remove('in-tools', 'in-tools-move-more-left');
        } else {                           // 2-B 展开 essay（固定左侧）
            essayPanel.classList.add('in-tools-move-more-left');
            essayPanel.classList.remove('in-tools');
            if (openTool) {                  // 确保另一工具待在右侧
                openTool.classList.add('in-tools');
                openTool.classList.remove('in-tools-move-more-left');
            }
        }
        return;
    }

    /* ========= 3. handle “点击的是非 essay 工具” ========= */
    const panelWasOpen = isOpen(panel);

    // 3-A 折叠自身（若已开）——简单移除即可
    if (panelWasOpen) {
        panel.classList.remove('in-tools', 'in-tools-move-more-left');
        return;
    }

    // 3-B 打开新的非-essay 面板：互斥逻辑
    if (openTool && openTool !== panel) {
        // 关闭原来的非-essay 面板
        openTool.classList.remove('in-tools', 'in-tools-move-more-left');
    }

    // 开启当前面板并放至右侧
    panel.classList.add('in-tools');
    panel.classList.remove('in-tools-move-more-left');

    // 如果此时 essay 也打开 → 保证它在左侧
    if (essayOpen) {
        essayPanel.classList.add('in-tools-move-more-left');
        essayPanel.classList.remove('in-tools');
    }
}

/*********************************************************************
 * 通用面板激活函数：行为全由 PANEL_RULES 决定
 *
 * 依赖：
 *   1. 你自己维护的 PANEL_RULES: Map<DOMElement, RuleObject>
 *      RuleObject 可包含：
 *        - allowCoexist : boolean (默认 false)
 *        - fixedLeft    : boolean (默认 false)
 *        - groupId      : string  (默认 'default')
 *        - maxOpen      : number  (默认 1)  // 本组允许同时打开的数量
 *
 *   2. CSS 类:
 *      - 'in-tools'              : 右侧展开
 *      - 'in-tools-move-more-left': 左侧（更靠左）展开
 *********************************************************************/
function activatePanelCustom(panel) {

    // 每个面板一条配置；未写的面板采用默认 { allowCoexist:false, groupId:'default', maxOpen:1 }
    const PANEL_RULES = new Map([
        [collapseWriteEssay, {
            allowCoexist : true,   // 允许与其他面板同时打开
            fixedLeft    : true,   // 共现时永远在左
            groupId      : 'essay',// 独立分组
            maxOpen      : 2       // 本组最多 2 个 (它自己 + 1 个别组面板)
        }],
        [collapseChatgpt, {
            allowCoexist : false,  // 互斥
            groupId      : 'singleTools', // 跟下面几个在同一组
            maxOpen      : 1,
            fixedLeft    : false    // 不固定左侧
        }],
        [collapseMultiAgents,      { allowCoexist:false, groupId:'singleTools', maxOpen:1, fixedLeft:false }],
        [assistCheckCollapseMultiAgents,  { allowCoexist:false, groupId:'singleTools', maxOpen:1, fixedLeft:false }],
        [tigeCheckCollapseMultiAgents,    { allowCoexist:false, groupId:'singleTools', maxOpen:1, fixedLeft:false }],
        [medicalScaffoldCollapseMultiAgents,{allowCoexist:false, groupId:'singleTools', maxOpen:1, fixedLeft:false}],
    ]);


    /* ---------- 工具函数 ---------- */
    const isOpen  = p => p.classList.contains('in-tools') ||
        p.classList.contains('in-tools-move-more-left');
    const openR   = p => { p.classList.add   ('in-tools');
        p.classList.remove('in-tools-move-more-left'); };
    const openL   = p => { p.classList.add   ('in-tools-move-more-left');
        p.classList.remove('in-tools'); };
    const closeP  = p => p.classList.remove('in-tools', 'in-tools-move-more-left');

    /* ---------- 0. 当前面板的规则 ---------- */
    const defRule = { allowCoexist:false, fixedLeft:false, groupId:'default', maxOpen:1 };
    const rule    = PANEL_RULES.get(panel) ?? defRule;

    /* ---------- 1. 如果已展开 -> 折叠后返回 ---------- */
    if (isOpen(panel)) {
        closeP(panel);
        return;
    }

    /* ---------- 2. 统计当前展开面板 ---------- */
    const allPanels      = [ ...PANEL_RULES.keys() ];        // 参与规则控制的全部面板
    const opened         = allPanels.filter(isOpen);         // 已展开（含左/右）
    const openedSameGp   = opened.filter(p =>
        (PANEL_RULES.get(p) ?? defRule).groupId === rule.groupId);
    const openedOtherGp  = opened.filter(p => !openedSameGp.includes(p));

    /* ---------- 3. 处理组内上限 (maxOpen) ---------- */
    if (openedSameGp.length >= rule.maxOpen) {
        // 关闭同组面板——可以按需更细粒度策略，这里直接全关
        openedSameGp.forEach(closeP);
    }

    /* ---------- 4. 处理互斥 / 共现 ---------- */
    // 若该面板本身不允许共现，则应关闭所有“不允许共现”的其他面板
    if (!rule.allowCoexist) {
        openedOtherGp.forEach(p => {
            const r = PANEL_RULES.get(p) ?? defRule;
            if (!r.allowCoexist) closeP(p);
        });
    }

    /* ---------- 5. 打开当前面板并摆放 ---------- */
    console.log(openedSameGp.length, openedOtherGp.length, rule.fixedLeft);
    if (rule.fixedLeft) {  // 就算单独打开也是在左面。
        if (openedOtherGp.length > 0 || openedSameGp.length > 0) {
            openL(panel)
        }
        else {
            openR(panel);
        }
    } else {
        openR(panel);
    }
}

