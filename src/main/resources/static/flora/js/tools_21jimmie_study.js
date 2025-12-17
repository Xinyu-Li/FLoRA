console.log("---------------------------------Jimmie study");


// `${userId}-${currentCourseId}-taskStartTimestamp`    判断timer 是否开始， 从redis 获取
// String accessTimesKey = traceDataVO.getUserId() + "-page-viewed-" + traceDataVO.getUrl(); 在后端获取
// 2-page-viewed-https://www.floraengine.org/moodle/mod/page/view.php?id=492
// 记录 writing task 开始时间 到 redis
// 每次发送时候判断是否 超过5分钟
// 每次发送时候判断是否超过 10 分钟
// click submit   后端获取

// Map<String, String> learningCheckpoint2Map = Map.of("19","157", "20", "170", "21", "183", "22", "196", "23", "209");
// Map<String, String> learningCheckpoint3Map = Map.of("19", "164", "20", "177", "21", "190", "22", "203", "23", "216");
//
// String learningCheckPoint1 = iGlobalCache.hasKey(MyConstant.REDIS_TASK_START_TIME + chatgptRequest.getUserId() + "-" + chatgptRequest.getCourseId()) ? "Learning Checkpoint 1" : "";
// String learningCheckPoint2 = iGlobalCache.hasKey(chatgptRequest.getUserId() + "-page-viewed-https://infoseeking.floraengine.org/moodle/mod/page/view.php?id=" + learningCheckpoint2Map.get(chatgptRequest.getCourseId())) ? "Learning Checkpoint 2" : "";
// String learningCheckPoint3 = iGlobalCache.hasKey(chatgptRequest.getUserId() + "-page-viewed-https://infoseeking.floraengine.org/moodle/mod/page/view.php?id=" + learningCheckpoint3Map.get(chatgptRequest.getCourseId())) ? "Learning Checkpoint 3" : "";
//
// String writingCheckPoint1 = iGlobalCache.hasKey(chatgptRequest.getUserId() + "-" + chatgptRequest.getCourseId() + "-writing-task-start") ? "Writing Checkpoint 1" : "";
// String writingCheckPoint2 = iGlobalCache.hasKey() ? "Writing Checkpoint 2" : "";
// String writingCheckPoint3 = iGlobalCache.hasKey() ? "Writing Checkpoint 3" : "";


let manualShowEssayWritingToolKey = `${userId}-${currentCourseId}-manual-show-essayWriting-tool`;
let tempPage = document.getElementById("page");
if (tempPage) {
    tempPage.style.marginLeft = "200px";
}
let tempDrawersCourseIndex = document.getElementById("theme_boost-drawers-courseindex");
if (tempDrawersCourseIndex) {
    tempDrawersCourseIndex.style.width = "200px";
    tempDrawersCourseIndex.style.maxWidth = "200px";
}
let tempTopOfScroll = document.getElementById("topofscroll");
if (tempTopOfScroll) {
    tempTopOfScroll.style.maxWidth = "100%";
    tempTopOfScroll.style.width = "60%";
    tempTopOfScroll.style.borderRadius = ".5rem";
    tempTopOfScroll.style.backgroundColor = "#fff";
    tempTopOfScroll.style.padding = "1.5rem .5rem";
    tempTopOfScroll.style.marginTop = ".5rem";
    tempTopOfScroll.style.marginBottom = "3rem";
    tempTopOfScroll.style.flex = "1 0 auto";
    tempTopOfScroll.style.marginLeft = "0";
    tempTopOfScroll.style.marginRight = "auto";
}


let tempCollapseMultiAgents = document.getElementById("multi-agents-collapse");
if (tempCollapseMultiAgents) {
    tempCollapseMultiAgents.style.height = "90vh";
    tempCollapseMultiAgents.style.width = "30%";
}
let tempCollapseEssay = document.getElementById("collapseWriteEssay");
if (tempCollapseEssay) {
    tempCollapseEssay.style.height = "90vh";
    tempCollapseEssay.style.width = "33%";
}
let tempWritingInstructionCard = document.createElement("div");
if (tempWritingInstructionCard) {
    tempWritingInstructionCard.classList.add("card");
    tempWritingInstructionCard.classList.add("card-body");
    tempWritingInstructionCard.style.height = "40%";
    tempWritingInstructionCard.style.overflow = "auto";
    tempWritingInstructionCard.style.whiteSpace = "normal";
    tempWritingInstructionCard.style.wordBreak = "break-word";
    tempWritingInstructionCard.innerHTML = `
    <p style="font-weight: bold;">Scenario: Renewable Energy Strategy for a Northern Coastal Community</p>
    <p>You have been hired as an energy expert to advise a northern coastal community situated near mountains and facing harsh, snowy winters. This community currently relies heavily on imported fossil fuels, which are expensive, environmentally damaging, and unreliable during severe winter storms. The town seeks a solution that guarantees stable, year-round energy supplies, reduces costs over time, and ideally creates local employment. The area experiences steady marine winds offshore and is located near significant forest resources managed sustainably. However, preservation of local marine biodiversity and forest ecosystems is a community priority.</p>
    <p style="font-weight: bold;">Your Task:</p>
    <p>Write a short proposal (150-200 words) recommending a balanced renewable energy strategy combining two renewable energy types. Clearly justify your recommendation by discussing:</p>
    <ul style="list-style-type: '- ';">
        <li>How each renewable energy source suits local geography, climate challenges, and energy demands.</li>
        <li>Financial feasibility and expected economic benefits, including job creation.</li>
        <li>Potential environmental impacts and how your strategy mitigates risks to forests and marine life.</li>
    </ul>`;
}

let tempWritingCard = tempCollapseEssay.lastElementChild;
tempWritingCard.style.height = "60%";
tempCollapseEssay.insertBefore(tempWritingInstructionCard, tempWritingCard);

const learningCheckpoint2Map = new Map();
const learningCheckpoint3Map = new Map();
learningCheckpoint2Map.set("19","158");
learningCheckpoint2Map.set("20", "171");
learningCheckpoint2Map.set("21", "184");
learningCheckpoint2Map.set("22", "197");
learningCheckpoint2Map.set("23", "210");
learningCheckpoint2Map.set("28", "236");
learningCheckpoint2Map.set("30", "270");

learningCheckpoint3Map.set("19", "164");
learningCheckpoint3Map.set("20", "177");
learningCheckpoint3Map.set("21", "190");
learningCheckpoint3Map.set("22", "203");
learningCheckpoint3Map.set("23", "216");
learningCheckpoint3Map.set("28", "242");
learningCheckpoint3Map.set("30", "276");


const startWritingButton = document.createElement('button');
startWritingButton.textContent = 'Start Writing';

// 设置 Bootstrap 样式
startWritingButton.className = 'btn btn-secondary';
startWritingButton.style.cssText = 'position: absolute; bottom: 10px; left: 30%; width: 200px; z-index: 1;';



window.addEventListener('load', function() {
    // 获取当前页面的URL
    var currentURL = window.location.href;
    console.log('当前URL为：', currentURL);
    let lc2Key = `${userId}-${currentCourseId}-send-learning-checkpoint-2`;
    let lc3Key = `${userId}-${currentCourseId}-send-learning-checkpoint-3`;

    if (localStorage.getItem(lc2Key) === null && currentURL === 'https://infoseeking.floraengine.org/moodle/mod/page/view.php?id=' + learningCheckpoint2Map.get(currentCourseId)) {
        localStorage.setItem(lc2Key, 'true');
        sendScaffoldRequest("Learning Checkpoint 2");

    }

    if (localStorage.getItem(lc3Key) === null && currentURL === 'https://infoseeking.floraengine.org/moodle/mod/page/view.php?id=' + learningCheckpoint3Map.get(currentCourseId)) {
        localStorage.setItem(lc3Key, 'true');
        // sendScaffoldRequest("Learning Checkpoint 3");
        startWritingButton.style.display = "block";
    } else if (localStorage.getItem(lc3Key) && currentURL === 'https://infoseeking.floraengine.org/moodle/mod/page/view.php?id=' + learningCheckpoint3Map.get(currentCourseId)) {
        startWritingButton.style.display = "block";
    }
    console.log("showMultiAgentsBtn click");
    showMultiAgentsBtn.click();
});

function sendScaffoldRequest(specialRequirementPrompt) {
    // "/chatgpt"  question 设置为空

    let essayContent = mainEditor?.getText() ?? "";
    const agent = multiAgentsSingleWindowConfig.agents[0];

    let threadId = localStorage.getItem(userId + "-" + currentCourseId + "-" + agent.agentName + "-agent-thread-id") || "";

    let chatgptData = {
        question: "",
        userId: userId,
        courseId: currentCourseId,
        essay: essayContent,
        questionId: "",
        includeEssay: agent.promptIncludeEssay,
        chatgptRoleDescription: agent.agentDescription,
        chatgptRole: "tutor",
        backgroundFileNameList: agent.backgroundFileNameList,
        chatgptParameters: agent.chatgptParameters,
        agentName: agent.agentName,
        specialRequirementPrompt: specialRequirementPrompt,
        threadId: threadId
    };

    $.ajax({
        url: apiBaseUrl + "/chatgpt",
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(chatgptData),
        dataType: 'json',
        success: function (data, status) {
            // chatSendBtn.disabled = false;
            // chatInput.contentEditable = "true";
            console.log("data:", data);
            if (status === "success" && data.status === 200) {
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
                let multiAgentsChatContentDiv = document.querySelector("#multi-agents-chat-content");
                appendGeneralAgentAnswerHtml(resContent, data.data.chatgptResponseTime, questionId, data.data.id, agent.agentDisplayName, agent.agentAvatarSvg, agent.useRating, 0, chatHistoryLength, "#c1d2ed", multiAgentsChatContentDiv);

                localStorage.setItem(userId + "-" + currentCourseId + "-" + agent.agentName + "-chat-history-length", "" + chatHistoryLength);

                if (threadId === "") {
                    localStorage.setItem(userId + "-" + currentCourseId + "-" + agent.agentName + "-agent-thread-id", resThreadId);
                }
            } else {
                // logIdToQuestionIdMapMultiSeparateAgents[data.data.id] = "error";
                // console.log(logIdToQuestionIdMapMultiSeparateAgents)

                alert("An error occurred while processing your question.");
            }
        }
    });
}

const submitTaskButton = document.createElement("button");
submitTaskButton.textContent = 'Submit & Finish';
submitTaskButton.className = 'btn btn-danger';
submitTaskButton.style.position = '';
submitTaskButton.style.top = '150px';
submitTaskButton.style.right = '80px';
submitTaskButton.style.width = '200px';
submitTaskButton.style.zIndex = '1';

submitTaskButton.addEventListener("click", function (e) {
    let tempInstantEvent = "";
    if (window.confirm('Please confirm you\'ve fully completed the writing task and ensured your response is at least 100 words (below this limit may risk non-payment). After confirming, close this tab and return to Qualtrics to finish the survey.')) {
        // 用户确认后要做的事情
        tempInstantEvent = "CLICK_SUBMIT_TASK_CONFIRM";

        sendEventMessage("", getCurrentTimestamp(), "EXTRA", "MOUSE_CLICK", "CLICK_SUBMIT_TASK", "NAVIGATION", null, tempInstantEvent, "", e);
        alert("Please close tab and return to continue finish the survey in Qualtric");

        // localStorage.clear();
        window.location.href = "https://infoseeking.floraengine.org/moodle/my/courses.php";
    } else {
        tempInstantEvent = "CLICK_SUBMIT_TASK_CANCEL";
        sendEventMessage("", getCurrentTimestamp(), "EXTRA", "MOUSE_CLICK", "CLICK_SUBMIT_TASK", "NAVIGATION", null, tempInstantEvent, "", e);
    }
});

// document.getElementById("side-annotation-toolbar").appendChild(submitTaskButton);
let mainEssaySaveBtn = document.getElementById("writeEssayEditorMainSaveBtn");
let mainEssaySaveDiv = mainEssaySaveBtn.parentElement;
mainEssaySaveDiv.style.display = "flex";
mainEssaySaveDiv.style.justifyContent = "flex-end";
mainEssaySaveDiv.appendChild(submitTaskButton)
mainEssaySaveBtn.style.display = "none";




let manualShowWritingTool = localStorage.getItem(manualShowEssayWritingToolKey);
if (manualShowWritingTool === null) {
// special config for Jimmie study

    startWritingButton.addEventListener("click", function (e) {
        let tempInstantEvent = "";
        if (window.confirm('Please confirm you\'ve finished studying the material. After confirming, you\'ll have 20 minutes to complete the writing task.')) {
            // 用户确认后要做的事情
            tempInstantEvent = "CLICK_START_WRITING_CONFIRM";
            sendEventMessage("", getCurrentTimestamp(), "EXTRA", "MOUSE_CLICK", "MANUAL_CLICK_START_WRITING", "NAVIGATION", null, tempInstantEvent, "", e);
            // 展示 writing 工具
            hideOrShowToolBtn("essayWriting", true, true);
            // showWriteEssayBtn.click();
            // 设置聊天为 禁用，只能查看聊天历史
            // multiAgentsSendQuestionBtn.disabled = true;
            // multiAgentsInput.contentEditable = "false";
            localStorage.setItem(manualShowEssayWritingToolKey, "" + getCurrentTimestamp());
            sendScaffoldRequest("Writing Checkpoint 1");
        } else {
            tempInstantEvent = "CLICK_START_WRITING_CANCEL";
            sendEventMessage("", getCurrentTimestamp(), "EXTRA", "MOUSE_CLICK", "MANUAL_CLICK_START_WRITING", "NAVIGATION", null, tempInstantEvent, "", e);
        }
    });
    startWritingButton.style.display = "none";
    document.body.appendChild(startWritingButton);
} else {
    //点击过之后，不需要再展示 button
    // showWriteEssayBtn.click();
}



let fiveMinuteTimerId;
let tenMinuteTimerId;
let fifteenMinuteTimerId;
function onTaskStart() {
    // task start
    const lc1Key = `${userId}-${currentCourseId}-send-learning-checkpoint-1`;
    if (localStorage.getItem(lc1Key) === null) {
        sendScaffoldRequest("Learning Checkpoint 1");
        localStorage.setItem(lc1Key, "true");
    }

    const fifteenMinuteTimerKey = `${userId}-${currentCourseId}-reach-20-minutes-after-task-start`;
    let manualShowWritingTool = localStorage.getItem(manualShowEssayWritingToolKey);
    if (localStorage.getItem(fifteenMinuteTimerKey) === null && manualShowWritingTool === null) {
        fifteenMinuteTimerId = setInterval(() => {
            const startTimestamp = localStorage.getItem(`${userId}-${currentCourseId}-taskStartTimestamp`) || 0;
            if (startTimestamp === 0) return;
            const now = Date.now();
            if (now - startTimestamp >= 20 * 60 * 1000) {
                clearInterval(fifteenMinuteTimerId);
                console.log('已到达task开始后20分钟时间点，写作强制开始，执行操作');
                localStorage.setItem(fifteenMinuteTimerKey, 'true');
                startWritingButton.style.display = 'none';
                // 你的任意操作
                if (localStorage.getItem(manualShowEssayWritingToolKey) === null) { // 标识用户没有手动点击开始写作
                    sendScaffoldRequest("Writing Checkpoint 1");
                }
                //禁用 聊天输入框和发送按钮
                // multiAgentsSendQuestionBtn.disabled = true;
                // multiAgentsInput.contentEditable = "false";
                // showWriteEssayBtn.click();
            }

        }, 5000);
    } else {
        //禁用 聊天输入框和发送按钮
        // multiAgentsSendQuestionBtn.disabled = true;
        // multiAgentsInput.contentEditable = "false";
        startWritingButton.style.display = 'none';
    }

    /*const fiveMinuteTimerKey = `${userId}-${currentCourseId}-reach-5-minutes-after-writing-start`;
    if (!localStorage.getItem(fiveMinuteTimerKey)) {
        fiveMinuteTimerId = setInterval(() => {
            const startTimestamp = localStorage.getItem(`${userId}-${currentCourseId}-taskStartTimestamp`) || 0;
            if (startTimestamp === 0) return;
            const startWritingTimestamp = localStorage.getItem(manualShowEssayWritingToolKey) || parseInt(startTimestamp) + 900000; // 15 分钟
            const now = Date.now();
            if (now - startWritingTimestamp >= 1 * 60 * 1000) {
                clearInterval(fiveMinuteTimerId);
                console.log('已到达开始写作后5分钟时间点，执行操作');
                localStorage.setItem(fiveMinuteTimerKey, 'true');
                // 你的任意操作
                sendScaffoldRequest("Writing Checkpoint 2");
            }
        }, 5000); // 每秒检测一次
    }*/

    /*const tenMinuteTimerKey = `${userId}-${currentCourseId}-reach-10-minutes-after-writing-start`;
    if (!localStorage.getItem(tenMinuteTimerKey)) {
        // const startTimestamp = localStorage.getItem();
        tenMinuteTimerId = setInterval(() => {
            const startTimestamp = localStorage.getItem(`${userId}-${currentCourseId}-taskStartTimestamp`) || 0;
            if (startTimestamp === 0) return;
            const startWritingTimestamp = localStorage.getItem(manualShowEssayWritingToolKey) || parseInt(startTimestamp) + 900000; // 15 分钟
            const now = Date.now();
            if (now - startWritingTimestamp >= 2 * 60 * 1000) {
                clearInterval(tenMinuteTimerId);
                console.log('已到达开始写作后10分钟时间点，执行操作');
                localStorage.setItem(tenMinuteTimerKey, 'true');
                // 你的任意操作
                sendScaffoldRequest("Writing Checkpoint 3");
            }
        }, 5000); // 每秒检测一次
    }*/
}

// 触发
onTaskStart();
