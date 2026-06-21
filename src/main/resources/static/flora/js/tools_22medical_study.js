
if (localStorage.getItem(userId + "-" + currentCourseId + "-Consultation-Finish") === null) {
    localStorage.setItem(userId + "-" + currentCourseId + "-Consultation-Finish", "false");
}


if (localStorage.getItem(userId + "-" + currentCourseId + "-Consultation-Reflection-Finish") === null) {
    localStorage.setItem(userId + "-" + currentCourseId + "-Consultation-Reflection-Finish", "false");
}
// let multiAgentsSendQuestionBtn = document.querySelector("#multi-agents-send-question-btn");
const finishDiagnosisButton = document.createElement('button');
finishDiagnosisButton.textContent = '结束问诊';

// 设置 Bootstrap 样式
finishDiagnosisButton.className = 'btn btn-danger';
finishDiagnosisButton.style.cssText = 'margin-left: 10px; width:100px';

// 将结束问诊按钮插入到 send 按钮的右侧
// finishDiagnosisButton.style.display = "block";
// finishDiagnosisButton.style.display = "none";

if (taskStage === "stage3" && useMedicalScaffoldMultiAgentsSingleWindowTool){
    patientMultiAgentsSendQuestionBtn.insertAdjacentElement('afterend', finishDiagnosisButton);
    finishDiagnosisButton.onclick = function(e) {
        stopEventPropagation(e);
        patientMultiAgentsInput.value = "已结束问诊";
        patientMultiAgentsInput.placeholder = ""; // 可以清空
        patientMultiAgentsInput.contentEditable = false;
        multiAgentsSendQuestionBtn.classList.add("disabled");
        // 持久化到 localStorage
        localStorage.setItem(userId + "-" + currentCourseId + "-Consultation-Finish", "true");
        let availableScaffoldAgents = multiAgentsSingleWindowConfig.scaffoldAgents.filter(agent => agent.useAgent === true);
// 找到agentRole为medicalteacher的agent
        let agentName = availableScaffoldAgents.find(agent => agent.agentRole === "feedback").agentName;
        let question = "学生已结束问诊，请对本次问诊进行总结和反馈。";
        let sharedAgentThreadId = getSharedAgentThreadId(availableScaffoldAgents);
        askGeneralSpecifiedAgentQuestion(question, availableScaffoldAgents.find(agent => agent.agentName === agentName), sharedAgentThreadId, false, false, "", "", "", medicalScaffoldMultiAgentsChatContentDiv, medicalScaffoldMultiAgentsSendQuestionBtn, medicalScaffoldMultiAgentsInput);
        // 监测medicalScaffoldMultiAgentsChatContentDiv是否有新消息,如果有，输出，
        // 监测这个事件：chatContentDiv.insertAdjacentHTML
        // 打开带教老师窗口
        medicalScaffoldShowMultiAgentsBtn.click();
    }

}

// scaffold 触发规则
if (useMedicalScaffoldMultiAgentsSingleWindowTool){
    consultationGetScaffoldBtn.onclick = function(e) {

        // 先save
        submitConsultTable();

        stopEventPropagation(e);
        // let consultationText = localStorage.getItem(userId + "-" + currentCourseId + "-Consultation-Report");
        let tableData = getTableData();
        let consultationText = tableDataToText(tableData);
        let availableScaffoldMedicalAgents = medicalScaffoldMultiAgentsSingleWindowConfig.scaffoldAgents.filter(agent => agent.useAgent === true);
        // 找到agentRole为medicalteacher的agent
        let tempScaffoldAgents = availableScaffoldMedicalAgents.filter(agent => agent.agentRole === "scaffold");
        const stageMapping = {
            stage1: "1",
            stage2: "2",
            stage3: "3"
        };
        let agentName = tempScaffoldAgents.find(agent => agent.agentName.endsWith(stageMapping[taskStage])).agentName;
        console.log("safeConsultationText:" + consultationText);
        console.log("agentName:" + agentName);
        let roundCount=0;
        if (localStorage.getItem(userId + "-" + currentCourseId + "-" + agentName + "-chat-history-length") !== null){
            roundCount = localStorage.getItem(userId + "-" + currentCourseId + "-" + agentName + "-chat-history-length");
        }

        let question = "";
        if (roundCount===null || roundCount===0){
            question = "学生想请教你，这是学生临床推理对比分析表的填写结果：\n" + consultationText;
        }
        else{
            question = "继续展开对话，这是学生修改后临床推理对比分析表的填写结果：\n" + consultationText;
        }
        let sharedAgentThreadId = getSharedAgentThreadId(availableScaffoldMedicalAgents);

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
                let patientChathistory = chat_history.filter(chat => chat.chatgptRole === 'patient');
                let feedbackChathistory = chat_history.filter(chat => chat.chatgptRole === 'reporter');
                let finalChatHistory = patientChathistory.concat(feedbackChathistory);
                finalChatHistory.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)); // 按时间排序
                console.log("finalChatHistory:", finalChatHistory);
                let HistoryText = "";
                finalChatHistory.forEach(chat => {
                    let tmpQuestion = "学生：" + chat.userQuestions;
                    let tmpAnswer = ""
                    if (chat.chatgptRole === 'patient') {
                        tmpAnswer = "病人：" + chat.chatgptAnswer
                    }else if (chat.assistantName.startsWith("fz_reporter")){
                        tmpAnswer = "辅助检查汇报员：" + chat.chatgptAnswer
                    }else if (chat.assistantName.startsWith("tg_reporter")){
                        tmpAnswer = "体格检查汇报员：" + chat.chatgptAnswer
                    }
                    // let tmpAnswer = "病人：" + chat.chatgptAnswer if chat.chatgptRole === 'patient' else "带教老师：" + chat.chatgptAnswer;
                    HistoryText = HistoryText + tmpQuestion + "\n" + tmpAnswer + "\n";
                });
                console.log("HistoryText:", HistoryText);
                question = question + "\n" + "这是学生与病人的问诊对话记录：\n" + HistoryText;
                console.log("Final Question:", question);
                askGeneralSpecifiedAgentQuestion(question, availableScaffoldMedicalAgents.find(agent => agent.agentName === agentName), sharedAgentThreadId, false, false, "", "", "", medicalScaffoldMultiAgentsChatContentDiv, medicalScaffoldMultiAgentsSendQuestionBtn, medicalScaffoldMultiAgentsInput);
                // 监测medicalScaffoldMultiAgentsChatContentDiv是否有新消息,如果有，输出，
                // 监测这个事件：chatContentDiv.insertAdjacentHTML
                // const chatDiv = medicalScaffoldMultiAgentsChatContentDiv;
                // 打开带教老师窗口
            });
        medicalScaffoldShowMultiAgentsBtn.click();
    }
// consultationWritingFinishBtn

    consultationWritingFinishBtn.onclick = function(e) {
        stopEventPropagation(e);
        // 无法再save表格结果。
        /* 1. 锁定表格 */
        document
            .querySelectorAll("#consultation-table .consultation-table-row")
            .forEach(el => (el.disabled = true));

        /* 2. 禁用保存按钮 & 定时器 & 请教老师 & 结束思考 */
        submitConsultationTableBtn.disabled = true;
        submitConsultationTableBtn.classList.add("disabled");
        consultationGetScaffoldBtn.disabled = true;
        consultationGetScaffoldBtn.classList.add("disabled");
        consultationWritingFinishBtn.disabled = true;
        consultationWritingFinishBtn.classList.add("disabled");

        if (loadRelatedTableDataBtn && typeof(loadRelatedTableDataBtn) !== 'undefined')
        {
            loadRelatedTableDataBtn.disabled = true;
            loadRelatedTableDataBtn.classList.add("disabled");
        }
        let addRowBtnTemp = document.querySelector("#add-row-btn");
        addRowBtnTemp.classList.add("disabled");
        clearInterval(autoSaveTimerId);          // 结束自动保存

        // 先save
        submitConsultTable();

        /* 3. 面板醒目标记 */
        const lastSaveTimeSpan = document.querySelector("#last-save-time");
        if (lastSaveTimeSpan) lastSaveTimeSpan.textContent = "(已结束思考)";
        lastSaveTimeSpan.style.color = "red";
        localStorage.setItem(userId + "-" + currentCourseId + "-Consultation-Reflection-Finish-" + taskStage, "true");

        let tableData = getTableData();
        let consultationText = tableDataToText(tableData);
        let availableScaffoldMedicalAgents = medicalScaffoldMultiAgentsSingleWindowConfig.scaffoldAgents.filter(agent => agent.useAgent === true);
        // 找到agentRole为medicalteacher的agent
        let assessmentAgents = availableScaffoldMedicalAgents.filter(agent => agent.agentRole === "assessment");
        const stageMapping = {
            stage1: "1",
            stage2: "2",
            stage3: "3"
        };

        let agentName = assessmentAgents.find(agent => agent.agentName.endsWith(stageMapping[taskStage])).agentName;

        console.log("safeConsultationText:" + consultationText);
        console.log("agentName:" + agentName);
        let question = "学生已结束本阶段的临床推理对比分析表的填写，这是学生的填写结果：\n" + consultationText;
        let sharedAgentThreadId = getSharedAgentThreadId(availableScaffoldMedicalAgents);
        askGeneralSpecifiedAgentQuestion(question, availableScaffoldMedicalAgents.find(agent => agent.agentName === agentName), sharedAgentThreadId, false, false, "", "", "", medicalScaffoldMultiAgentsChatContentDiv, medicalScaffoldMultiAgentsSendQuestionBtn, medicalScaffoldMultiAgentsInput);
        // 打开带教老师窗口
        medicalScaffoldShowMultiAgentsBtn.click();
        sendEventMessage("", getCurrentTimestamp(), "CONSULTATION_TABLE", "MOUSE_CLICK", "CONSULTATION_TABLE_WRITING_FINISH_CLICK", "CONSULTATION_TABLE", stageMapping[taskStage], "CLICK", "", e);
    }

}

// 根据 localStorage.setItem(userId + "-" + currentCourseId + "-Consultation-Finish", "true"); 渲染输入框
if (localStorage.getItem(userId + "-" + currentCourseId + "-Consultation-Finish") === "true") {
    document
        .querySelectorAll("#consultation-table .consultation-table-row")
        .forEach(el => (el.disabled = true));
    patientMultiAgentsInput.value = "已结束问诊";
    patientMultiAgentsInput.placeholder = ""; // 可以清空
    patientMultiAgentsInput.contentEditable = false;
    multiAgentsSendQuestionBtn.classList.add("disabled");
}

patientShowMultiAgentsBtn.style.backgroundColor = "#FFF2CC"; // 浅黄色
if (useMedicalScaffoldMultiAgentsSingleWindowTool){
    medicalScaffoldShowMultiAgentsBtn.style.backgroundColor = "#FFF2CC"; // 浅黄色
}
if (useChatgptTool) showChatgptBtn.style.backgroundColor = "#FFF2CC"; // 浅黄色

if(useTigeCheckMultiAgentsSingleWindowTool) tigeCheckShowMultiAgentsBtn.style.backgroundColor = "#DEEBF7" // 浅蓝色
if(useAssistCheckMultiAgentsSingleWindowTool) assistCheckShowMultiAgentsBtn.style.backgroundColor = "#DEEBF7" // 浅蓝色

if(useConsultationSubmitTool) showConsultationBtn.style.backgroundColor = "#E2F0D9"

// if (taskStage === "stage1") {
//     showMultiAgentsBtn.style.backgroundColor = "rgb(248 201 136)"; // 橙色
//     medicalScaffoldShowMultiAgentsBtn.style.backgroundColor = "rgb(248 201 136)"; // 橙色
//     showWriteEssayBtn.style.backgroundColor = "#cfdcf0"; // 浅蓝色
//     showConsultationTableBtn.style.backgroundColor = "#cfdcf0"; // 浅蓝色
// }else if (taskStage === "stage2") {
//     tigeCheckShowMultiAgentsBtn.style.backgroundColor = "rgb(248 201 136)"; // 橙色
//     medicalScaffoldShowMultiAgentsBtn.style.backgroundColor = "rgb(248 201 136)"; // 橙色
//     showWriteEssayBtn.style.backgroundColor = "#cfdcf0"; // 浅蓝色
//     showConsultationTableBtn.style.backgroundColor = "#cfdcf0"; // 浅蓝色
// }else if (taskStage === "stage3") {
//     assistCheckShowMultiAgentsBtn.style.backgroundColor = "rgb(248 201 136)"; // 橙色
//     showConsultationTableBtn.style.backgroundColor = "#cfdcf0"; // 浅蓝色
//     showConsultationBtn.style.backgroundColor = "#f2cece"; // 红色
// }
//
// showChatgptBtn.style.backgroundColor = "rgb(248 201 136)"; // 浅蓝色


// 在任务一的时候，如果essay没有值，自动填充：
// 请在这里撰写三个可能诊断(按可能性排序)：
//===================================
// 请在这里撰写诊断过程的笔记:
mainEditorForMedical = document.querySelector("#writeEssayEditorMain");
const autoFillEssay = "请在这里撰写三个可能诊断(按可能性排序)：\n \n \n请在这里撰写你的思考过程笔记:";
if (mainEditorForMedical && taskStage === "stage1" && (mainEditorForMedical.innerText.trim() === "" || mainEditorForMedical.innerText.trim() === "请在这里撰写诊断思考文本")) {
    console.log("自动填充诊断思考文本");
    mainEditorForMedical.innerText = autoFillEssay;
    mainEditorForMedical.focus();
}