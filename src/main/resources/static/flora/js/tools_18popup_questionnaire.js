function render() {
    console.log("popup-rendering")
    let popupQuestionnaireToolHtml = `<!-- POPUP_QUESTIONNAIRE Tool Html  -->
        <div class="my-horizontal-collapse-tools planner2" id="popup-questionnaires-collapse"  style="z-index: 300;">
            <div class="card card-body overflow-auto" style="height:100%;">
                <h3 class="mt-2 mb-2" ><span>${popupQuestionnaireTitle}</span> <button type="button" class="btn btn-close" style="position:absolute; right:20px;" aria-label="Close" id="close-popup-questionnaires-btn"></button></h3>
                <button class="btn btn-primary" id="testCreate">Create question</button>                        
                <button class="btn btn-primary" id="questionnaireLocalReset">Reset local storage</button>                        
                <div class="form-control" id="display-popup-questionnaires-message-div" style="height:100%; word-wrap: break-word; white-space : normal;">
                    
                </div>
            </div>
        </div>`;
    let blocking = `
            
        <div id="forceCompletePopupQuestionnaire" class="popup-questionnaire-blocking" style="display: none">
        
          <!-- Modal content -->
          <div class="my-modal-content">
            <div class="my-modal-header">
              <!-- <span class="close">&times;</span> -->
              <h2>You have a questionnaire to complete!</h2>
            </div>
            <div class="my-modal-body">
              <p></p>
        
            </div>
            <div style="text-align: center;">
              <!--      <button type="button" class="my-modal-button" id="taskFinishSubmitEssayBtn">Submit Essay</button>-->
              <button type="button" class="my-modal-button" id="modalShowQuestionnaire">Show the questionnaire</button>
        
            </div>
          </div>
        
        </div>
    `

    $("body").append(popupQuestionnaireToolHtml);
    $("body").append(blocking);
}

render();

//7, 14, 21, 28

let collapsePopupQuestionnaires = document.querySelector("#popup-questionnaires-collapse");
toolList1.push(collapsePopupQuestionnaires);
let showPopupQuestionnairesBtn = document.querySelector("#show-popup-questionnaires-btn");
let closePopupQuestionnairesBtn = document.querySelector("#close-popup-questionnaires-btn");
let popupQuestionnairesMessageDiv = document.querySelector("#display-popup-questionnaires-message-div");
let testCreateBtn = document.querySelector("#testCreate");
let testResetBtn = document.querySelector("#questionnaireLocalReset");
let modalShowQuestionnaire = document.querySelector("#modalShowQuestionnaire")
let forceCompletePopupQuestionnaire = document.querySelector("#forceCompletePopupQuestionnaire")
let popupQuestionnaireOrder = 1;

//This 4 variables are only used for tool open/close event
let popupQuestionnairesClickTargetObject = "NO_TARGET_OBJECT";
let popupQuestionnairesPageEvent = "NO_PAGE_EVENT";
let popupQuestionnairesToolStartUseTime = 0;
let popupQuestionnairesInstantEvent = "CLOSE";

const usePopupQuestionnaireBlocking = true;
const offset = 0;
const popupQuestionTypes = ["select"]
const questions = {
    // "CMTR2": { id: "question1", label: "1. What is your name?", type: "text" },
    // "CSCAR1": { id: "question3", label: "3. Any additional comments?", type: "textarea" }

    "CSCAR2": [{
        id: "questionCSCAR2",
        label: "2. How satisfied are you with our service?",
        type: "select",
        options: ["Very Satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very Dissatisfied"]
    }],
    "CMTR2": [
        {
            id: "questionCMTR2_h",
            type: "info",
            content: "This is some content to prompt the student about why these questions are asked."
        },
        {
            id: "questionCMTR2_q1",
            label: "1. What explains your understanding of the task requirement and rubric?",
            type: "select",
            options: ["1 I did not understand the task requirement at all.",
                "2 I understood the task requirement only partially and am confused about key aspects. ",
                "3 I have a moderate understanding of the task requirement but still need clarification. ",
                "4 I mostly understand the task requirement with only minor uncertainties. ",
                "5 I completely understand the task requirement with no confusion."]
        },
        {
            id: "questionCMTR2_q2",
            label: "2. How confident are you in following the task requirement and rubric?",
            type: "select",
            options: ["1 not at all confident", "2 Slightly confident", "3 somewhat confident", "4 moderately confident", "5 extremely confident"]
        }

    ],
    "CSCAR1": [{
        id: "questionCSCAR1",
        label: "2. How satisfied are you with our service?",
        type: "select",
        options: ["option 1", "option 2", "option 3", "option 4", "option 5", "option 6", "option 7"]
    }]
};

let questionSettings = {
    "CSCAR2": {
        maxTriggerTimes: 1000
    },
    "CMTR2": {
        maxTriggerTimes: 2000
    },
    "CSCAR1": {
        maxTriggerTimes: 2000
    }
}
let fixedTimeQuestionnaireTriggerStatus;
let questionsAtFixedTime = [
    {
        triggerCondition : {
            triggerSecond: 15,
            triggerBehavior: [["CMTR2"]],   // 第一层是behavior，第二层表示transition
            performed: false,
            performedBefore: 15,
            performedStartAt: 0
        },
        triggerName: "SomeThingBefore15seconds",

        triggerMaxTimes: 2,
        questionFrom: [
            {
                id: "questionCMTR2_h",
                type: "info",
                content: "NOT performed CMTR2 before 15 seconds."
            },
            {
                id: "questionCMTR2_q1",
                label: "1. What explains your understanding of the task requirement and rubric?",
                type: "select",
                options: ["1 I did not understand the task requirement at all.",
                    "2 I understood the task requirement only partially and am confused about key aspects. ",
                    "3 I have a moderate understanding of the task requirement but still need clarification. ",
                    "4 I mostly understand the task requirement with only minor uncertainties. ",
                    "5 I completely understand the task requirement with no confusion."]
            },
            {
                id: "questionCMTR2_q2",
                label: "2. How confident are you in following the task requirement and rubric?",
                type: "select",
                options: ["1 not at all confident", "2 Slightly confident", "3 somewhat confident", "4 moderately confident", "5 extremely confident"]
            }

        ],
        description: "This is a testing behavior",
        message: "Hei! Kuten varmaan tiedät, tehtävän aluksi on hyvä tutustua sen ohjeisiin, tavoitteisiin ja annettuihin materiaaleihin. Joko sinulle on selvää, mitä sinulta odotetaan tässä tehtävässä? Entä millainen suunnitelma sinulla on tehtävän suorittamiseksi? Suunnitelma ja jotkin työkaluista voivat auttaa, jotta löydät mahdollisimman tehokkaan tavan tavoitteidesi saavuttamiseksi."
    },
    {
        triggerCondition : {
            triggerSecond: 15,
            triggerBehavior: [["CMTR2"]],   // 第一层是behavior，第二层表示transition
            performed: true,
            performedBefore: 15,
            performedStartAt: 0
        },
        triggerName: "SomeThingBefore15seconds",

        triggerMaxTimes: 2,
        questionFrom: [
            {
                id: "questionCMTR2_h",
                type: "info",
                content: "Performed CMTR2 before 15 seconds."
            },
            {
                id: "questionCMTR2_q1",
                label: "1. What explains your understanding of the task requirement and rubric?",
                type: "select",
                options: ["1 I did not understand the task requirement at all.",
                    "2 I understood the task requirement only partially and am confused about key aspects. ",
                    "3 I have a moderate understanding of the task requirement but still need clarification. ",
                    "4 I mostly understand the task requirement with only minor uncertainties. ",
                    "5 I completely understand the task requirement with no confusion."]
            },
            {
                id: "questionCMTR2_q2",
                label: "2. How confident are you in following the task requirement and rubric?",
                type: "select",
                options: ["1 not at all confident", "2 Slightly confident", "3 somewhat confident", "4 moderately confident", "5 extremely confident"]
            }

        ],
        description: "This is a testing behavior",
        message: "Hei! Kuten varmaan tiedät, tehtävän aluksi on hyvä tutustua sen ohjeisiin, tavoitteisiin ja annettuihin materiaaleihin. Joko sinulle on selvää, mitä sinulta odotetaan tässä tehtävässä? Entä millainen suunnitelma sinulla on tehtävän suorittamiseksi? Suunnitelma ja jotkin työkaluista voivat auttaa, jotta löydät mahdollisimman tehokkaan tavan tavoitteidesi saavuttamiseksi."
    }
    // {
    //     triggerSecond: 20,
    //     message: "Hei! Edistäähän tämänhetkinen työskentelytapasi tehtävässä suoriutumista? Miten voit hyödyntää aiheen sisällön tuntemustasi kirjoittamisessa? Kun luet annettuja materiaaleja, kysy itseltäsi ”Miten tämä tieto liittyy tehtävän aiheeseen? Mitä uutta näkökulmaa se tuo aiheeseen?"
    // },
    // {
    //     triggerSecond: 35,
    //     message: "Hei! Pysähdy hetkeksi miettimään, miten kirjoittamisesi edistyy. Mitä voisit vielä tehdä varmistaaksesi, että kirjoitelmasi vastaa tehtävän tavoitteita? Miten voisit vielä kehittää työskentelytapaasi esseen sisältöjä syventääksesi?"
    // }
];

// let fixedTimeQuestionnaireTriggerStatus = new Array(questionsAtFixedTime.length).fill(false);

function generatePopupQuestionnaires(questions_input, order) {
    // answer = answer.replace(/\n/g, '<br>');
    console.log("questions_input: ", questions_input)
    const form = document.createElement('form');
    form.id = 'question-' + order.toString();
    form.className = 'popup-questionnaire';
    const qorderInput = document.createElement('input');

    qorderInput.type = 'hidden';
    qorderInput.name = 'qorder';
    qorderInput.value = order;

    // Dynamically add questions to the form
    questions_input.forEach((question) => {
        const div = document.createElement('div');
        div.className = 'mb-3';
        if (popupQuestionTypes.includes(question.type)) {
            const label = document.createElement('label');
            label.htmlFor = order + '-' + question.id;
            label.className = 'form-label';
            label.textContent = question.label;

            // create a hidden field to save the qorder

            let input;
            let otherInput;
            if (question.type === 'text') {
                input = document.createElement('input');
                input.type = 'text';
                input.className = 'form-control';
            } else if (question.type === 'select') {
                input = document.createElement('select');
                input.className = 'form-select';
                const defaultOption = document.createElement('option');
                defaultOption.value = '';
                defaultOption.textContent = 'Select an option';
                input.appendChild(defaultOption);
                question.options.forEach((option) => {
                    const opt = document.createElement('option');
                    opt.value = option;
                    opt.textContent = option;
                    input.appendChild(opt);
                });
                const otherOption = document.createElement('option');
                otherOption.value = 'other';
                otherOption.textContent = 'other';
                input.appendChild(otherOption)
                otherInput = document.createElement('textarea')
                otherInput.className = 'form-control';
                otherInput.rows = 4;
                otherInput.style.marginTop = '15px'
                otherInput.style.marginBottom = '15px'
                otherInput.style.display = 'none'
                otherInput.placeholder = 'Please enter your answer';
                input.addEventListener('change', () => {
                    if (input.value === 'other') {
                        otherInput.style.display = 'block';
                        otherInput.required = true; // Make it required if visible
                    } else {
                        otherInput.style.display = 'none';
                        otherInput.required = false; // Remove required if hidden
                    }
                });
                // create textarea box
                otherInput.id = order + '-' + question.id + '-other';
                otherInput.name = order + '-' + question.id + '-other';
                otherInput.required = false;

            } else if (question.type === 'textarea') {
                input = document.createElement('textarea');
                input.className = 'form-control';
                input.rows = 4;
            }

            input.id = order + '-' + question.id;
            input.name = order + '-' + question.id;
            input.required = true;

            div.appendChild(label);
            div.appendChild(input);
            if (typeof otherInput !== 'undefined')
                div.appendChild(otherInput);
        } else {
            let p = document.createElement("p")
            if (question.type === "info") {
                p.textContent = question.content
            }
            div.appendChild(p)
        }
        form.appendChild(div);
    });

    // Add submit button
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.className = 'btn btn-primary';
    submitButton.textContent = 'Submit';
    form.appendChild(qorderInput)
    form.appendChild(submitButton);
    form.addEventListener('submit', handleSubmit);
    addEventForEachQuestionnaire(form, order)
    popupQuestionnairesMessageDiv.append(form)

}

function handleSubmit(e) {
    e.preventDefault(); // Prevent form submission

    const formData = new FormData(e.target);

    let qorder;
    let answerObj = {};
    for (let [key, value] of formData.entries()) {
        if (key === "qorder")
            qorder = value;
        else {
            answerObj[key] = value
        }
        console.log(`${key}: ${value}`);
    }
    $.post(apiBaseUrl + "/questionnaire-answer", {
            userId: userId,
            courseId: currentCourseId,
            qorder: qorder,
            answerJson: JSON.stringify(answerObj),
            answerTime: getCurrentTimestamp()
        },
        function (data, status) {
            console.log(data)
            console.log("saved qorder: ", qorder);
            if (status === "success") {
                e.target.remove();
                hideModalAfterNoQuestions();
            } else {
                throw Error("generate new questionnaire failed");
            }

        });
}

function forceViewNewestPopupQuestionnaire() {
    gptScaffoldsMessageDiv.scrollTop = gptScaffoldsMessageDiv.scrollHeight;
}

function loadPopupQuestionnaires() {

    console.log("loadPopupQuestionnaires-----------");
    $.get(apiBaseUrl + `/load-popup-questionnaire/${userId}/${currentCourseId}`, function (data, status) {
        if (status === "success") {
            console.log(data)
            data.data.forEach((question) => {
                generatePopupQuestionnaires(JSON.parse(question["questionContent"]), question["qorder"])
                forceViewNewestPopupQuestionnaire();
                showNewQuestionnaireHint();
                // todo 加上缓存setting, question setting 在每次产生question的时候update (interval 里)
            })
            // if (containsForm(popupQuestionnairesMessageDiv.childNodes)) {
            //     showNewQuestionnaireHint();
            // }
        } else {
        }
    });
}

function addEventForEachQuestionnaire(questionForm, order) {
    questionForm.addEventListener("click", function (e) {
        // console.log("%c q form click", "color: green");
        stopEventPropagation(e);
        sendEventMessage("", getCurrentTimestamp(), "POPUP_QUESTIONNAIRE", "MOUSE_CLICK_POPUP_QUESTIONNAIRE" + order, subActionLabelMap["CHATGPT_SCAFFOLD_CLICK"], "POPUP_QUESTIONNAIRE", null, "CLICK", "", e);
    });
    questionForm.addEventListener("mousemove", function (e) {
        // console.log("%c q form mousemove", "color: green");
        stopEventPropagation(e);
        // 为了保留 order，所以直接将此处所有的鼠标移动都发走
        sendEventMessage("", getCurrentTimestamp(), "POPUP_QUESTIONNAIRE", "MOUSE_MOVE_POPUP_QUESTIONNAIRE" + order, "READ_GPT_SCAFFOLD", "POPUP_QUESTIONNAIRE", null, "NO_INSTANT_EVENT", "", e);
    });
    questionForm.addEventListener("wheel", function (e) {
        // console.log("%c q form mousewheel", "color: green");
        stopEventPropagation(e);
        sendEventMessage("", getCurrentTimestamp(), "POPUP_QUESTIONNAIRE", "MOUSE_WHEEL_POPUP_QUESTIONNAIRE" + order, "READ_GPT_POPUP_QUESTIONNAIRE", "POPUP_QUESTIONNAIRE", null, "NO_INSTANT_EVENT", "SCROLL_DIST:::" + e.deltaY, e);
    });
    questionForm.addEventListener("mouseup", function (e) {
        // console.log("%c q form mouseup", "color: green");
        stopEventPropagation(e);
        if (window.getSelection() != null && window.getSelection().toString().replace(/\n/g, '').length > 0) {
            let selectText = window.getSelection().toString();
            sendEventMessage("", getCurrentTimestamp(), "POPUP_QUESTIONNAIRE", "MOUSE_SELECT_TEXT_POPUP_QUESTIONNAIRE" + order, "MOUSE_SELECT_TEXT_POPUP_QUESTIONNAIRE" + order, "POPUP_QUESTIONNAIRE", null, "SELECT_TEXT", "MOUSE_SELECT:::" + selectText, e);
        }
    });
}

function checkSRLProcessList(processList) {
    // todo: 这里放check的logic

    // todo: return的值是question的key的list
    return ["CMTR2"]
}

function initialiseQuestionConfig() {
    console.log("initialiseQuestionConfig")
    if (!("popupQuestionnaireSetting" in localStorage)) {
        console.log("\"popupQuestionnaireSetting\" not in localStorage")
        localStorage.setItem("popupQuestionnaireSetting", JSON.stringify(questionSettings));
    } else {
        questionSettings = JSON.parse(localStorage.getItem("popupQuestionnaireSetting"));
        console.log(localStorage.getItem("popupQuestionnaireSetting"))
        console.log(questionSettings)
    }

    if (!("fixedTimeQuestionnaireTriggerStatus" in localStorage)) {
        console.log("\"fixedTimeQuestionnaireTriggerStatus\" not in localStorage")
        let recording = {};
        for (let i in questionsAtFixedTime) {
            const aQuestion = questionsAtFixedTime[i];
            // aQuestion.triggerName
            recording[aQuestion["triggerName"]]= false

        }
        fixedTimeQuestionnaireTriggerStatus = recording;
        localStorage.setItem("fixedTimeQuestionnaireTriggerStatus", JSON.stringify(recording));
    } else {
        fixedTimeQuestionnaireTriggerStatus = JSON.parse(localStorage.getItem("fixedTimeQuestionnaireTriggerStatus"));
        console.log(localStorage.getItem("fixedTimeQuestionnaireTriggerStatus"))
    }
}

function updatefixedTimeQuestionnaireTriggerStatus() {
    localStorage.setItem("fixedTimeQuestionnaireTriggerStatus", JSON.stringify(fixedTimeQuestionnaireTriggerStatus))
}

function updateQuestionConfig() {
    localStorage.setItem("popupQuestionnaireSetting", JSON.stringify(questionSettings));
}

function checkQuestionSetting(process) {
    const setting = questionSettings[process]
    let toGenerateQuestionnaire = true;
    if ("maxTriggerTimes" in setting) {
        if (setting["maxTriggerTimes"] <= 0)
            toGenerateQuestionnaire = false;
    }
    // todo: 可能会有更多的setting

    // 这部分是确定了要生成question后，进行的对setting的一些后处理
    if (toGenerateQuestionnaire) {
        if ("maxTriggerTimes" in setting) {
            questionSettings[process]["maxTriggerTimes"] -= 1;
        }
    }
    return toGenerateQuestionnaire
}

function containsForm(containerNodeList) {
    for (let i = 0; i < containerNodeList.length; i++) {
        const child = containerNodeList[i];
        // Check if the child is an element node (Node.ELEMENT_NODE === 1)
        if (child.nodeType === Node.ELEMENT_NODE) {
            // Check if the child is a form-related element
            const tagName = child.tagName.toLowerCase();
            if (['form'].includes(tagName)) {
                return true;
            }
        }
    }
    return false;
}

function isSubarray(smallList, bigList) {
    const smallLength = smallList.length;
    for (let i = 0; i <= bigList.length - smallLength; i++) {
        let match = true;
        for (let j = 0; j < smallLength; j++) {
            if (bigList[i + j] !== smallList[j]) {
                match = false;
                break;
            }
        }
        if (match) return true;
    }
    return false;
}
function checkSRLprocessPerformed(triggerBehavior, SRLProcessList) {
    // todo: 还没弄完
    console.log("triggerBehavior:", triggerBehavior)
    console.log("SRLProcessList:", SRLProcessList)
    for (let i in triggerBehavior){
        const aBehavior = triggerBehavior[i];
        console.log("aBehavior:", aBehavior)
        if (isSubarray(aBehavior, SRLProcessList)) {
            return true;
        }
    }
    return false;
}

function checkQuestionnaireAtFixTime(aQuestion, spendTimeSeconds) {

}
function requestQuestionnaireCreation(process, questionContent, SRLProcessListLength) {
    console.log(`
        userId: ${userId},
        savetime: ${getCurrentTimestamp()},
        questionnaireContent: ${questionContent},
        username: ${username},
        triggerProcess: ${process},
        SRLProcessLength: ${SRLProcessListLength}
    `)
    $.post(apiBaseUrl + "/questionnaire-create", {
            userId: userId,
            courseId: currentCourseId,
            savetime: getCurrentTimestamp(),
            questionnaireContent: JSON.stringify(questionContent),
            username: username,
            triggerProcess: process,
            SRLProcessLength: SRLProcessListLength
        },
        function (data, status) {
            console.log(data)
            if (status === "success") {
                if ("qorder" in data.data) {
                    generatePopupQuestionnaires(questionContent, data.data["qorder"]);
                    showNewQuestionnaireHint();
                    updateQuestionConfig()

                } else {
                    console.log("no new question needed");
                }
            } else {
                throw Error("generate new questionnaire failed");
            }
        });
}

function tryGenerateQuestion() {
    $.get(apiBaseUrl + `/srlprocesslist/${userId}/${currentCourseId}` , function (data, status) {
        if (status === "success") {
            console.log(data)
            const previoustLength = data.data["previousSRLProcessLength"];
            const SRLProcessList = data.data["SRLProcessList"];
            if (previoustLength !== SRLProcessList.length) {
            // if (true) {
                // todo: 检查SRLProcessList，返回需要生成的list, 这个offset是用来处理存在transition的情况的
                const uncheckedSRLProcessList = SRLProcessList.slice(previoustLength - offset)
                const questionKeys = checkSRLProcessList(uncheckedSRLProcessList)    // 返回的是questions的keys
                console.log("---- questionKeys ----");
                console.log(questionKeys);
                if (questionKeys.length !== 0) {
                    questionKeys.forEach((process) => {
                        console.log(process)
                        if (checkQuestionSetting(process)) {
                            requestQuestionnaireCreation(process, questions[process], SRLProcessList.length);
                        }
                    })
                }
            } else {
                console.log("already up to date")
            }
        } else {
        }
    });
    // 如果questionanire div内存在html element，说明没答完，再次展示hint
    // console.log("popupQuestionnairesMessageDiv.childNodes.length")
    // console.log(popupQuestionnairesMessageDiv.childNodes)
    // console.log(popupQuestionnairesMessageDiv.innerHTML)
    // console.log(popupQuestionnairesMessageDiv.childNodes.length)
    // console.log(popupQuestionnairesMessageDiv.innerHTML)
    // if (containsForm(popupQuestionnairesMessageDiv.childNodes)) {
    //     showNewQuestionnaireHint();
    //
    // }
}

function checkFixedTimeQuestion() {
    let tempTaskStartTimestamp = parseInt(localStorage.getItem(`${userId}-${currentCourseId}-taskStartTimestamp`)) || 0;


    let spendTimeSeconds = (getCurrentTimestamp() -  parseInt(tempTaskStartTimestamp)) / 1000;
    // 获取当前的触发时间
    console.log("checkFixedTimeQuestion spendTimeSeconds:", spendTimeSeconds)
    for (let i in questionsAtFixedTime) {
        const aQuestion = questionsAtFixedTime[i];
        // if (checkQuestionnaireAtFixTime(aQuestion, spendTimeSeconds)) {
        //     requestQuestionnaireCreation(aQuestion["triggerBehavior"], JSON.stringify(aQuestion["questionFrom"]), -1)    // -1的意思是不更新SRLProcessList的length
        // }
        // 如果已经trigger了，则直接跳过
        if (fixedTimeQuestionnaireTriggerStatus[aQuestion["triggerName"]])
            continue;

        const triggerCondition = aQuestion.triggerCondition;
        if (triggerCondition.triggerSecond < spendTimeSeconds) {
            // triggerCondition.performedBefore;
            $.get(apiBaseUrl + `/srlprocesslist/${userId}/${currentCourseId}/${triggerCondition.performedStartAt}/${triggerCondition.performedBefore}`,
                function (data, status) {
                    if (status === "success") {
                        const SRLProcessList = data.data["SRLProcessList"];
                        const checkResult = checkSRLprocessPerformed(triggerCondition.triggerBehavior, SRLProcessList);
                        console.log("checkResult: ", checkResult)
                        if (checkResult === triggerCondition.performed) {
                            requestQuestionnaireCreation(aQuestion["triggerName"], aQuestion["questionFrom"], -1)
                            fixedTimeQuestionnaireTriggerStatus[aQuestion["triggerName"]] = true;
                            updatefixedTimeQuestionnaireTriggerStatus();
                        }

                    } else {
                        throw Error("checkQuestionnaireAtFixTime failed");
                    }

                })

        }
    }
    // let currentTriggerMinute = questionsAtFixedTime[gptScaffoldOrder - 1].triggerSecond;

    // console.log(".....spendTimeSeconds:" + spendTimeSeconds + ".....currentTriggerSecond:" + currentTriggerMinute * 60);
    //
    // if (spendTimeSeconds >= (60 * currentTriggerMinute) && spendTimeSeconds < (60 * currentTriggerMinute + 5)) {
    //     // 在触发窗口内，触发请求
    //     gptScaffoldOrder = requestGPTScaffolds(gptScaffoldOrder);
    // } else if (spendTimeSeconds >= (60 * currentTriggerMinute + 10)) {
    //     // 超过触发时间窗口 10 秒，强制触发
    //     gptScaffoldOrder = requestGPTScaffolds(gptScaffoldOrder);
    // } else {
    //     console.log("gpt scaffolding error.....gptScaffoldOrder:" + gptScaffoldOrder);
    //     console.log("gpt scaffolding error.....spendTimeSeconds:" + spendTimeSeconds + ".....currentTriggerSecond:" + currentTriggerMinute * 60);
    // }
}

function setupPopupQuestionnaireTool() {
    setInterval(function () {
        tryGenerateQuestion();
    }, 5 * 1000); //7 * 60 * 1000
    setInterval(function () {
        checkFixedTimeQuestion();
    }, 5 * 1000); //7 * 60 * 1000
    initialiseQuestionConfig();
    loadPopupQuestionnaires();
    // todo: 这个放到setInteval里，每隔几秒check一次， check需要checkSRl process list，然后如果其中包括了某些proces，则触发这个generatequestion
    testCreateBtn.onclick = function (e) {
        console.log("test button clicked");
        tryGenerateQuestion();
    }
    testResetBtn.onclick = function (e) {
        localStorage.removeItem("popupQuestionnaireSetting");
        localStorage.removeItem("fixedTimeQuestionnaireTriggerStatus");
    }
    collapsePopupQuestionnaires.onclick = function (e) {
        stopEventPropagation(e);
        sendEventMessage("", getCurrentTimestamp(), "POPUP_QUESTIONNAIRE", "MOUSE_CLICK", subActionLabelMap["POPUP_QUESTIONNAIRE_CLICK"], "POPUP_QUESTIONNAIRE", null, "CLICK", "", e);

    };
    //当鼠标在搜索annotation框区域移动时候，所有移动和滚动行为都标注为 SEARCH_ANNOTATION
    collapsePopupQuestionnaires.onmousewheel = function (e) {
        stopEventPropagation(e);
        sendEventMessage("", getCurrentTimestamp(), "POPUP_QUESTIONNAIRE", "MOUSE_WHEEL", "READ_POPUP_QUESTIONNAIRE", "POPUP_QUESTIONNAIRE", null, "NO_INSTANT_EVENT", "SCROLL_DIST:::" + e.deltaY, e);
    };
    collapsePopupQuestionnaires.onmousemove = function (e) {
        stopEventPropagation(e);
        mousePosition = generateMousePositionData(e, "READ_POPUP_QUESTIONNAIRE", "POPUP_QUESTIONNAIRE");
    };
    collapsePopupQuestionnaires.onmouseup = function (e) {
        stopEventPropagation(e);
        if (window.getSelection() != null && window.getSelection().toString().replace(/\n/g, '').length > 0) {
            let selectText = window.getSelection().toString();
            sendEventMessage("", getCurrentTimestamp(), "POPUP_QUESTIONNAIRE", "MOUSE_SELECT_TEXT", subActionLabelMap["POPUP_QUESTIONNAIRE_SELECT_TEXT"], "POPUP_QUESTIONNAIRE", null, "SELECT_TEXT", "MOUSE_SELECT:::" + selectText, e);
        }
    };


    closePopupQuestionnairesBtn.onclick = function (e) {
        // console.log("----------------------------------------closePopupQuestionnairesBtn clicked");
        stopEventPropagation(e);
        collapsePopupQuestionnaires.classList.toggle("in-tools");
        toolsAndEssayToggle(collapsePopupQuestionnaires);

        popupQuestionnairesClickTargetObject = "CLOSE_POPUP_QUESTIONNAIRE_BTN";
        popupQuestionnairesPageEvent = "MOUSE_CLICK";
    };


    showPopupQuestionnairesBtn.onclick = function (e) {
        // console.log("----------------------------------------showPopupQuestionnairesBtn clicked");
        stopEventPropagation(e);
        if (useAnnotationTool) hideAnnotationToolbox(); // 隐藏annotation toolbox，当点击其他按钮时候
        collapsePopupQuestionnaires.classList.toggle("in-tools");
        toolsAndEssayToggle(collapsePopupQuestionnaires);
        // 如果alert message 包含d-none, 则不需要添加d-none， 如何不包含，则添加d-none， 关闭alert message
        if (!showPopupQuestionnairesBtn.querySelector("span").classList.contains("d-none")) {
            localStorage.setItem(userId + "-" + currentCourseId + "popupquestionnaire-" + (popupQuestionnaireOrder - 1) + "-view-status", "true");
            showPopupQuestionnairesBtn.querySelector("span").classList.add("d-none");
        }

        popupQuestionnairesClickTargetObject = "SHOW_POPUP_QUESTIONNAIRE_BTN";
        popupQuestionnairesPageEvent = "MOUSE_CLICK";
        // console.log("--------------popupQuestionnairesPageEvent:" + popupQuestionnairesPageEvent);
        sendEventMessage("", getCurrentTimestamp(), "POPUP_QUESTIONNAIRE", popupQuestionnairesPageEvent, subActionLabelMap["POPUP_QUESTIONNAIRE_CLICK"], "POPUP_QUESTIONNAIRE", popupQuestionnairesClickTargetObject, "SHOW_POPUP_QUESTIONNAIRE_BTN_CLICK", "", null);
        // 停止展示span
        hideNewQuestionnaireHint()
    };
    modalShowQuestionnaire.onclick = function (e) {
        showPopupQuestionnairesBtn.click();
    }
}

function showNewQuestionnaireHint() {
    if (typeof usePopupQuestionnaireBlocking !== 'undefined' && usePopupQuestionnaireBlocking){
        showPopupQuestionnaireBlockModal();
    } else {
        if (showPopupQuestionnairesBtn.querySelector("span").classList.contains("d-none"))
            showPopupQuestionnairesBtn.querySelector("span").classList.remove("d-none");
    }
}

function hideNewQuestionnaireHint() {
    if (!showPopupQuestionnairesBtn.querySelector("span").classList.contains("d-none"))
        showPopupQuestionnairesBtn.querySelector("span").classList.add("d-none");
}

function showPopupQuestionnaireBlockModal() {
    console.log("%c showPopupQuestionnaireBlockModal", "color: red")
    console.log(forceCompletePopupQuestionnaire.style.display)
    if (forceCompletePopupQuestionnaire.style.display === 'none') {
        forceCompletePopupQuestionnaire.style.display = 'block';
        console.log("%c call block", "color: red")
    }
}
function hidePopupQuestionnaireBlockModal() {
    console.log("%c hidePopupQuestionnaireBlockModal", "color: red")

    if (forceCompletePopupQuestionnaire.style.display === 'block') {
        forceCompletePopupQuestionnaire.style.display = 'none';
        console.log("%c call none", "color: red")

    }
}
function hideModalAfterNoQuestions() {
    if (!containsForm(popupQuestionnairesMessageDiv.childNodes)) {
        hidePopupQuestionnaireBlockModal();
    }
}
// function hintUnFinishedQuestion() {
//    
// }
