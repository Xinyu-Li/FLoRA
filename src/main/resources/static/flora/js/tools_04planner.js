function render() {
    let plannerToolHtml = `<!-- a plan tool 3 -->
    <div class="my-horizontal-collapse-tools planner2" id="collapsePlanner2">
        <div class="card card-body overflow-auto" style="height:100%;">
            <h3 class="mt-2 mb-2" >${plannerTitle}</h3>
            <div id="" class="border border-2 mt-2 bg-white overflow-auto p-2" style="height:100%;word-wrap: break-word;white-space : normal;">
               <div class="mt-2" id="create-plan-step1-div">
                   <h6 class="form-label" >${plannerLearningStrategySelectLabelText}</h6>
                   <select class="form-select" id="learning-strategy-select">
                       <option selected value="0">${plannerLearningStrategySelectOption1Text}</option>`;

    for (let i = 0; i < plannerAllStrategy.length; i++) {
        plannerToolHtml += '                   <option value="' + (i+1) + '">' + plannerAllStrategy[i].plannerOverallStrategy + '</option>';
    }

    plannerToolHtml += `<option value="4">${plannerLearningStrategySelectCustomiseOptionText}</option>
                   </select>
               </div>
               <div class="mt-3" id="create-plan-step2-div"></div>
               <div class="mt-3" id="create-plan-step3-div"></div>
               <div class="mt-3" id="create-plan-step4-div"></div>
               <div class="mt-3" id="create-customise-plan-div"></div>
               <button class="mt-3 btn btn-secondary d-none" id="add-more-customise-strategy-btn" type="button">${plannerAddMoreCustomiseStrategyBtnText}</button>
               <div class="" id="display-plan-div"></div>
               <div id="display-plan-message-div"></div>
               <div class="mt-5 d-none" id="save-cancel-plan-btns-div">
                   <button class="btn btn-success">
                       <svg fill="white" height="25" width="25" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 502 502" xml:space="preserve"><g><g><g><path d="M492,0H10C4.477,0,0,4.477,0,10v424c0,2.652,1.054,5.196,2.929,7.071l58,58C62.804,500.946,65.348,502,68,502h424 c5.523,0,10-4.477,10-10V10C502,4.477,497.523,0,492,0z M86,20h330v240H86V20z M194.045,482H158.06v-67.589h35.985V482z M313.239,482h-99.194v-77.589c0-5.523-4.477-10-10-10H148.06c-5.523,0-10,4.477-10,10V482h-17.925V381h193.104V482z M381.866,482h-48.627V381h48.627V482z M482,482h-80.134V371c0-5.523-4.477-10-10-10h-68.627H110.134c-5.523,0-10,4.477-10,10 v111H72.142L20,429.858V20h46v250c0,5.523,4.477,10,10,10h350c5.523,0,10-4.477,10-10V20h46V482z"/><path d="M367.5,62H345c-5.523,0-10,4.477-10,10s4.477,10,10,10h22.5c5.523,0,10-4.477,10-10S373.023,62,367.5,62z"/><path d="M134.5,82H299c5.523,0,10-4.477,10-10s-4.477-10-10-10H134.5c-5.523,0-10,4.477-10,10S128.977,82,134.5,82z"/><path d="M367.5,129h-233c-5.523,0-10,4.477-10,10s4.477,10,10,10h233c5.523,0,10-4.477,10-10S373.023,129,367.5,129z"/><path d="M367.5,196h-233c-5.523,0-10,4.477-10,10s4.477,10,10,10h233c5.523,0,10-4.477,10-10S373.023,196,367.5,196z"/></g></g></g></svg>
                   </button>
                   <button class="btn btn-secondary">
                       <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16"><path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/></svg>
                   </button>
               </div>
               <div class="mt-5 d-none" id="edit-plan-btns-div">
                   <button class="btn btn-warning">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="grey" class="bi bi-pencil-square" viewBox="0 0 16 16"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"></path><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"></path></svg>
                   </button>
               </div>
            </div>
        </div>
    </div>`;

    $("body").append(plannerToolHtml);
}
render();

//--------------------------------planner tool variables---------------------------------------------
let collapsePlanner2 = document.querySelector("#collapsePlanner2");
toolList1.push(collapsePlanner2);
let showPlanner2Btn = document.querySelector("#showPlanner2Btn");

let savePlanBtn = document.querySelector("#save-cancel-plan-btns-div>button:first-child");
let cancelPlanBtn = document.querySelector("#save-cancel-plan-btns-div>button:last-child");
let editPlanBtn = document.querySelector("#edit-plan-btns-div>button:first-child");
let addMoreCustomiseStrategyBtn = document.querySelector("#add-more-customise-strategy-btn");

let saveCancelPlanBtnsDiv = document.querySelector("#save-cancel-plan-btns-div");
let editPlanBtnsDiv = document.querySelector("#edit-plan-btns-div");

let learningStrategySelect = document.querySelector("#learning-strategy-select");

let createPlanStep1Div = document.querySelector("#create-plan-step1-div");
let createPlanStep2Div = document.querySelector("#create-plan-step2-div");
let createPlanStep3Div = document.querySelector("#create-plan-step3-div");
let createPlanStep4Div = document.querySelector("#create-plan-step4-div");
let createCustomisePlanDiv = document.querySelector("#create-customise-plan-div");
let displayPlanDiv = document.querySelector("#display-plan-div");
let displayPlanMessageDiv = document.querySelector("#display-plan-message-div")

let defaultStep21Task = plannerAllStrategy.length > 0 ? plannerAllStrategy[0].plannerStep2Task.map(item => item.title) : null;
let defaultStep21TaskInstruction = plannerAllStrategy.length > 0 ? plannerAllStrategy[0].plannerStrategyInstruction : null;
let defaultStep21Time = plannerAllStrategy.length > 0 ? plannerAllStrategy[0].plannerStep2Task.map(item => item.time) : null;

let defaultStep22Task = plannerAllStrategy.length > 1 ? plannerAllStrategy[1].plannerStep2Task.map(item => item.title) : null;
let defaultStep22TaskInstruction = plannerAllStrategy.length > 1 ? plannerAllStrategy[1].plannerStrategyInstruction : null;
let defaultStep22Time = plannerAllStrategy.length > 1 ? plannerAllStrategy[1].plannerStep2Task.map(item => item.time) : null;

let defaultStep23Task = plannerAllStrategy.length > 2 ? plannerAllStrategy[2].plannerStep2Task.map(item => item.title) : null;
let defaultStep23TaskInstruction = plannerAllStrategy.length > 2 ? plannerAllStrategy[2].plannerStrategyInstruction : null;
let defaultStep23Time = plannerAllStrategy.length > 2 ? plannerAllStrategy[2].plannerStep2Task.map(item => item.time) : null;

let defaultStep24Task = plannerAllStrategy.length > 3 ? plannerAllStrategy[3].plannerStep2Task.map(item => item.title) : null;
let defaultStep24TaskInstruction = plannerAllStrategy.length > 3 ? plannerAllStrategy[3].plannerStrategyInstruction : null;
let defaultStep24Time = plannerAllStrategy.length > 3 ? plannerAllStrategy[3].plannerStep2Task.map(item => item.time) : null;

let defaultStep25Task = plannerAllStrategy.length > 4 ? plannerAllStrategy[4].plannerStep2Task.map(item => item.title) : null;
let defaultStep25TaskInstruction = plannerAllStrategy.length > 4 ? plannerAllStrategy[4].plannerStrategyInstruction : null;
let defaultStep25Time = plannerAllStrategy.length > 4 ? plannerAllStrategy[4].plannerStep2Task.map(item => item.time) : null;

let defaultStep3ReadingStrategySelection = [];
let defaultStep3WritingStrategySelection = [];

let customiseStep2Task = [];
let customiseStep2Time = [];
let customiseExplanation = "";

let plannerEditButtonClickStatus = false;
let plannerSaveButtonClickStatus = false;

//This 4 variables are only used for tool open/close event
let plannerClickTargetObject = "NO_TARGET_OBJECT";
let plannerPageEvent = "NO_PAGE_EVENT";
let plannerToolStartUseTime = 0;
let plannerInstantEvent = "CLOSE";

// let displayPlanDivInnerHtml = "";
// let plannerElements = {selectionIndex: 0,
//     defaultStep21Time: [],
//     defaultStep22Time: [],
//     defaultStep23Time: [],
//     defaultStep3ReadingStrategySelection: [],
//     defaultStep3WritingStrategySelection: [],
//     customiseStep2Task: [],
//     customiseStep2Time: [],
//     customiseExplanation: ""};

//--------------------------------planner end---------------------------------------------

// function checkPlannerTaskExpire(isFirstTimeLoad) {
//
// }
//
// function generatePlannerChecklist(selectedPlanOptionValue, allocatedTimeArr) {
//
// }

function generateStep2Html(step2Task, step2Time, step2Instruction, showNextBtn) {
    let tempItemStr = "<h6>2. " + step2Instruction + "</h6>";
    for (let i = 0; i < step2Task.length; i++) {
        tempItemStr += '<div class="mt-2">' +
            '               <label for="create-plan-task' + i + '-input" class="form-label">2.' + (i+1) + " " + step2Task[i] + ':</label>' +
            '               <div class="input-group">' +
            '                   <input type="number" step="1" min="0" max="' + totalMinutes + '" value="' + step2Time[i] + '" placeholder="Input a number between 1-' + totalMinutes + '" class="form-control create-plan-input" id="create-plan-task' + i + '-input"/>' +
            '                   <span class="input-group-text">' + plannerTimeUnitMinute + '</span>' +
            '               </div>' +
            '           </div>';
    }
    tempItemStr += '<button class="btn btn-secondary mt-2 ' + showNextBtn + '" id="create-plan-step2-next-btn">' + plannerNextBtnText + '</button>';
    return tempItemStr;
}

function generateStep3Html(step3Strategy, step3StrategySelection, step3Instruction, orderNumber, showNextBtn) {
    let tempItemStr = "<h6>" + orderNumber + ". " + step3Instruction + "</h6>";
    tempItemStr += '<div class="list-group">';
    for (let i = 0; i < step3Strategy.length; i++) {
        if (step3StrategySelection.includes(i)) {
            tempItemStr += '<label class="list-group-item" style="padding:0.5rem 1.6rem"><input class="form-check-input me-1" type="checkbox" checked value="">' + step3Strategy[i] + '</label>';
        } else {
            tempItemStr += '<label class="list-group-item" style="padding:0.5rem 1.6rem"><input class="form-check-input me-1" type="checkbox" value="">' + step3Strategy[i] + '</label>';
        }
    }
    tempItemStr += '</div>';

    if (orderNumber === 3) { // means step 3 or 4
        tempItemStr += '<button class="btn btn-secondary mt-2 ' + showNextBtn + '" id="create-plan-step3-next-btn">' + plannerNextBtnText + '</button>';
    }
    return tempItemStr;
}

function generateDisplayPlanHtml(step1Strategy, step2Task, step2Time, step3Strategy, step3Selection, step4Strategy, step4Selection, readingBeforeWriting) {
    let tempItemStr = '<h4>' + plannerDisplayPlanTitle + '</h4>';
    tempItemStr += '<h5 class="mt-2">' + plannerDisplayOverallStrategyLabel + '</h5><span class="text-primary">' + step1Strategy + '</span>';
    tempItemStr += '<h6 class="mt-2" >' + plannerDisplayTimeAllocationLabel + '</h6>';
    tempItemStr += '<ol class="list-group list-group-numbered">';
    for (let i = 0; i < step2Task.length; i++) {
        tempItemStr += '  <li class="list-group-item" style="padding:0.5rem 1.6rem">' + step2Task[i] + '<span class="float-end">' + step2Time[i] + ' ' + plannerTimeUnitMinute + '</span>' + '</li>';
    }
    tempItemStr += '</ol>';
    if (readingBeforeWriting) {
        tempItemStr += '<h6 class="mt-2">' + plannerDisplayReadingStrategyLabel + '</h6>';
        tempItemStr += '<ul>';
        for (let i = 0; i < step3Selection.length; i++) {
            tempItemStr += '<li>' + step3Strategy[step3Selection[i]] + '</li>';
        }
        tempItemStr += '</ul>';

        tempItemStr += '<h6 class="mt-2">' + plannerDisplayWritingStrategyLabel + '</h6>';
        tempItemStr += '<ul>';
        for (let i = 0; i < step4Selection.length; i++) {
            tempItemStr += '<li>' + step4Strategy[step4Selection[i]] + '</li>';
        }
        tempItemStr += '</ul>';
    } else {
        tempItemStr += '<h6 class="mt-2">' + plannerDisplayWritingStrategyLabel + '</h6>';
        tempItemStr += '<ul>';
        for (let i = 0; i < step4Selection.length; i++) {
            tempItemStr += '<li>' + step4Strategy[step4Selection[i]] + '</li>';
        }
        tempItemStr += '</ul>';
        tempItemStr += '<h6 class="mt-2">' + plannerDisplayReadingStrategyLabel + '</h6>';
        tempItemStr += '<ul>';
        for (let i = 0; i < step3Selection.length; i++) {
            tempItemStr += '<li>' + step3Strategy[step3Selection[i]] + '</li>';
        }
        tempItemStr += '</ul>';
    }
    return tempItemStr;
}

function generateCustomiseStrategyItemHtml(strategyName, minute) {
    return `
        <div class="customise-strategy-item">
            <div class="input-group">
               <input type="text" class="form-control customise-strategy-name-input" placeholder="..." value="${strategyName}">
               <input type="number" step="1" min="0" value="${minute}" max="${totalMinutes}" placeholder="1-${totalMinutes}" class="form-control customise-strategy-time-input"/>
               <span class="input-group-text">${plannerTimeUnitMinute}</span>
               <button class="btn btn-danger delete-customise-strategy-btn" style="">X</button>
            </div>
        <hr/></div>`;
}

function generateCustomiseDisplayPlanHtml(customiseTask, customiseTime) {
    let tempItemStr = `<h4>${plannerDisplayPlanTitle}</h4>`;
    tempItemStr += `<h5 class="mt-2">${plannerDisplayOverallStrategyLabel} <span class="text-primary">${plannerCustomisePlanTitle}</span></h5>`;
    tempItemStr += `<h6 class="mt-2">${plannerDisplayTimeAllocationLabel}</h6>`;
    tempItemStr += `<ol class="list-group list-group-numbered">`;
    for (let i = 0; i < customiseTask.length; i++) {
        tempItemStr += '  <li class="list-group-item" style="padding:0.5rem 1.6rem">' + customiseTask[i] + '<span class="float-end">' + customiseTime[i] + ' ' + plannerTimeUnitMinute + '</span>' + '</li>';
    }
    tempItemStr += '</ol>';
    return tempItemStr;
}

function hideEditAreaShowEditBtn() {
    displayPlanDiv.classList.remove("d-none"); // 显示display plan 区域
    //隐藏 所有编辑区域
    createPlanStep1Div.classList.add("d-none");
    createPlanStep2Div.classList.add("d-none");
    createPlanStep3Div.classList.add("d-none");
    createPlanStep4Div.classList.add("d-none");
    createCustomisePlanDiv.classList.add("d-none");

    editPlanBtnsDiv.classList.remove("d-none"); // 显示edit 按钮
    saveCancelPlanBtnsDiv.classList.add("d-none"); //隐藏 save 和cancel 按钮
    addMoreCustomiseStrategyBtn.classList.add("d-none");
}

function clearPlanner() {

    createPlanStep2Div.innerHTML = "";
    createPlanStep3Div.innerHTML = "";
    createPlanStep4Div.innerHTML = "";
    createCustomisePlanDiv.innerHTML = "";

    displayPlanDiv.innerHTML = "";
    displayPlanMessageDiv.innerHTML = "";

    customiseStep2Task = [];
    customiseStep2Time = [];
    customiseExplanation = "";
    defaultStep3ReadingStrategySelection = [];
    defaultStep3WritingStrategySelection = [];
    defaultStep21Time = [0, 0, 0, 0];
    defaultStep22Time = [0, 0, 0];
    defaultStep23Time = [0, 0, 0, 0];
    defaultStep24Time = [0, 0, 0, 0];
    defaultStep25Time = [0, 0, 0, 0];

    addMoreCustomiseStrategyBtn.classList.add("d-none");
    saveCancelPlanBtnsDiv.classList.add("d-none");
}

function getStep3Or4CheckResult(createPlanStep34Div, step34) {
    let allCheckbox = createPlanStep34Div.querySelectorAll("input.form-check-input.me-1");
    let hasItemChecked = false;
    for (let i = 0; i < allCheckbox.length; i++) {
        if (allCheckbox[i].checked) {
            eval("defaultStep3" + step34 + "StrategySelection").push(i);
            hasItemChecked = true;
        }
    }
    return hasItemChecked;
}

function getStep2TimeAllocation() {
    let allTaskTimeInput = createPlanStep2Div.querySelectorAll("input.form-control.create-plan-input");
    let sumTime = 0;
    let allTasksAllocatedTime = true;
    for (let i = 0; i < allTaskTimeInput.length; i++) {
        if (allTaskTimeInput[i].value === "") {
            allTasksAllocatedTime = false;
        } else {
            sumTime += Number(allTaskTimeInput[i].value);
            eval("defaultStep2" + learningStrategySelect.selectedIndex + "Time")[i] = Number(allTaskTimeInput[i].value);
        }
    }
    return allTasksAllocatedTime && sumTime <= totalMinutes;
}

function setupPlanner2() {

    collapsePlanner2.onclick = function(e) {
        stopEventPropagation(e);
        let instant_event = "";
        if (plannerEditButtonClickStatus) {
            instant_event = "EDIT_PLANNER_CLICK";
        } else if (plannerSaveButtonClickStatus) {
            instant_event = "READ_PLANNER_CLICK";
        } else {
            instant_event = "CREATE_PLANNER_CLICK";
        }
        // console.log("collapseSearch click");
        // sendMyTraceDataPost("/trace-planner", getCurrentTimestamp(), "PLANNER", "MOUSE_CLICK", null, instant_event, "", e); //当select text时候会触发，mouse down up click 事件
        sendEventMessage("", getCurrentTimestamp(), "PLANNER", "MOUSE_CLICK", subActionLabelMap["PLANNER_" + instant_event], "PLANNER", null, instant_event, "", e);
    };
    //当鼠标在搜索annotation框区域移动时候，所有移动和滚动行为都标注为 SEARCH_ANNOTATION
    collapsePlanner2.onmousewheel = function(e) {
        stopEventPropagation(e);
        let subActionLabel = "";
        if (plannerEditButtonClickStatus) {
            subActionLabel = "EDIT_PLANNER";
        } else if (plannerSaveButtonClickStatus) {
            subActionLabel = "READ_PLANNER";
        } else {
            subActionLabel = "CREATE_PLANNER";
        }
        // mousewheelData.push(generateMouseWheelData(e, instant_event));
        sendEventMessage("", getCurrentTimestamp(), "PLANNER", "MOUSE_WHEEL", subActionLabel, "PLANNER",null, "NO_INSTANT_EVENT", "SCROLL_DIST:::" + e.deltaY, e);
    };
    collapsePlanner2.onmousemove = function(e) {
        stopEventPropagation(e);
        let subActionLabel = "";
        if (plannerEditButtonClickStatus) {
            subActionLabel = "EDIT_PLANNER";
        } else if (plannerSaveButtonClickStatus) {
            subActionLabel = "READ_PLANNER";
        } else {
            subActionLabel = "CREATE_PLANNER";
        }
        mousePosition = generateMousePositionData(e, subActionLabel, "PLANNER");
    };
    collapsePlanner2.onmouseup = function(e) {
        stopEventPropagation(e);
        if (window.getSelection() != null && window.getSelection().toString().replace(/\n/g, '').length > 0) {
            let selectText = window.getSelection().toString();
            let instant_event = "";
            if (plannerEditButtonClickStatus) {
                instant_event = "EDIT_PLANNER_SELECT_TEXT";
            } else if (plannerSaveButtonClickStatus) {
                instant_event = "READ_PLANNER_SELECT_TEXT";
            } else {
                instant_event = "CREATE_PLANNER_SELECT_TEXT";
            }
            // sendMyTraceDataPost("/trace-planner", getCurrentTimestamp(), "PLANNER", "MOUSE_SELECT_TEXT", null, instant_event, "MOUSE_SELECT:::" + selectText, e);
            sendEventMessage("", getCurrentTimestamp(), "PLANNER", "MOUSE_SELECT_TEXT", subActionLabelMap["PLANNER_" + instant_event], "PLANNER", null, instant_event, "MOUSE_SELECT:::" + selectText, e);
            // console.log("send post for select text-------------------------------------" + selectText + "-------");
        }
    };

    //阻止事件记录
    learningStrategySelect.onclick = function (e) {
        stopEventPropagation(e);
    };
    learningStrategySelect.onchange = function (e) {
        stopEventPropagation(e);
        clearPlanner();
        plannerSaveButtonClickStatus = false; //当用户选择开始修改planner之后，之前的planner就删掉了，所以save 和edit状态就变成false
        plannerEditButtonClickStatus = false;

        if (learningStrategySelect.selectedIndex === learningStrategySelect.options.length-1) {
            createCustomisePlanDiv.innerHTML = '<h6>2. ' + customiseStep2Instruction + '</h6>' + generateCustomiseStrategyItemHtml("", "") + '<div id="customise-plan-reason-div"><label for="customise-plan-reason-textarea" >' + plannerCustomiseOptionHintTextareaPlaceholder + '</label><textarea class="form-control" id="customise-plan-reason-textarea" placeholder="' + plannerCustomisePlanReasonPlaceholder + '"></textarea></div>';
            addMoreCustomiseStrategyBtn.classList.remove("d-none");
            saveCancelPlanBtnsDiv.classList.remove("d-none"); // 选择自定义计划时候，直接显示保存按钮
        } else if (learningStrategySelect.selectedIndex !== 0) {
            createPlanStep2Div.innerHTML = generateStep2Html(
                eval("defaultStep2" + learningStrategySelect.selectedIndex + "Task"),
                eval("defaultStep2" + learningStrategySelect.selectedIndex + "Time"),
                eval("defaultStep2" + learningStrategySelect.selectedIndex + "TaskInstruction"), "");
        } else {
            displayPlanMessageDiv.innerHTML = plannerSelectStrategyHint;
        }
        // sendMyTraceDataPost("/trace-planner", getCurrentTimestamp(), "PLANNER", "MOUSE_CLICK", "LEARNING_STRATEGY_SELECT", "SELECT_LEARNING_STRATEGY", "SELECT_INDEX:::" + learningStrategySelect.selectedIndex, e);
        sendEventMessage("", getCurrentTimestamp(), "PLANNER", "MOUSE_CLICK", subActionLabelMap["PLANNER_SELECT_LEARNING_STRATEGY"], "PLANNER", "LEARNING_STRATEGY_SELECT", "SELECT_LEARNING_STRATEGY", "SELECT_INDEX:::" + learningStrategySelect.selectedIndex, e);
    };

    $(createPlanStep2Div)
        .on("click", "#create-plan-step2-next-btn", function (e) {
            stopEventPropagation(e);
            displayPlanMessageDiv.innerHTML = "";
            if (getStep2TimeAllocation()) { // 弹出第三步 或者 第四步
                createPlanStep3Div.innerHTML = "";

                if (learningStrategySelect.selectedIndex === 1 || learningStrategySelect.selectedIndex === 2) {
                    createPlanStep3Div.innerHTML = generateStep3Html(defaultStep3ReadingStrategy, defaultStep3ReadingStrategySelection, defaultStep3ReadingInstruction, 3, "");
                } else if (learningStrategySelect.selectedIndex === 3 || learningStrategySelect.selectedIndex === 4) {
                    createPlanStep3Div.innerHTML = generateStep3Html(defaultStep3WritingStrategy, defaultStep3WritingStrategySelection, defaultStep3WritingInstruction, 3, "");
                }
                this.classList.add("d-none");
            } else {
                displayPlanMessageDiv.innerHTML = plannerAllocateTimeHint;
            }
            // sendMyTraceDataPost("/trace-planner", getCurrentTimestamp(), "PLANNER", "MOUSE_CLICK", "CREATE_PLAN_STEP2_NEXT_BTN", "SELECT_STEP2", "", e);
            sendEventMessage("", getCurrentTimestamp(), "PLANNER", "MOUSE_CLICK", subActionLabelMap["PLANNER_SELECT_STEP2"], "PLANNER", "CREATE_PLAN_STEP2_NEXT_BTN", "SELECT_STEP2", "", e);
        })
        .on("input", ".create-plan-input", function (e) {
            stopEventPropagation(e);
            this.value = this.value.replace(/[^0-9]/g, ''); //保证输入只能是整数\
            let instant_event = "";
            if (plannerEditButtonClickStatus) {
                instant_event = "EDIT_TIME_INPUT";
            } else {
                instant_event = "CREATE_TIME_INPUT";
            }
            // sendMyTraceDataPost("/trace-planner", getCurrentTimestamp(), "PLANNER", "INPUT", "PLAN_TIME_INPUT", instant_event, "", e);
            sendEventMessage("", getCurrentTimestamp(), "PLANNER", "INPUT", subActionLabelMap["PLANNER_" + instant_event], "PLANNER", "PLAN_TIME_INPUT", instant_event, "", e);
        });

    $(createPlanStep3Div).on("click", "#create-plan-step3-next-btn", function (e) {
        stopEventPropagation(e);
        // let allCheckbox = createPlanStep3Div.querySelectorAll("input.form-check-input.me-1");
        let hasItemChecked = false;
        let step3 = "";
        let step4 = "";
        if (learningStrategySelect.selectedIndex === 1 || learningStrategySelect.selectedIndex === 2) {
            step3 = "Reading";
            step4 = "Writing";
        } else if (learningStrategySelect.selectedIndex === 3 || learningStrategySelect.selectedIndex === 4) {
            step3 = "Writing";
            step4 = "Reading";
        }

        hasItemChecked = getStep3Or4CheckResult(createPlanStep3Div, step3);

        // for (let i = 0; i < allCheckbox.length; i++) {
        //     if (allCheckbox[i].checked) {
        //         eval("defaultStep3" + step3 + "StrategySelection").push(i);
        //         hasItemChecked = true;
        //     }
        // }
        if (hasItemChecked) {
            createPlanStep4Div.innerHTML = "";
            createPlanStep4Div.innerHTML = generateStep3Html(eval("defaultStep3" + step4 + "Strategy"), eval("defaultStep3" + step4 + "StrategySelection"), eval("defaultStep3" + step4 + "Instruction"), 4, "");
            this.classList.add("d-none");
            saveCancelPlanBtnsDiv.classList.remove("d-none");
        } else {
            createPlanStep4Div.innerHTML = plannerSelectSkillsHint;
        }
        // sendMyTraceDataPost("/trace-planner", getCurrentTimestamp(), "PLANNER", "MOUSE_CLICK", "CREATE_PLAN_STEP3_NEXT_BTN", "SELECT_STEP3", step3 + "-" + step4, e);
        sendEventMessage("", getCurrentTimestamp(), "PLANNER", "MOUSE_CLICK", subActionLabelMap["PLANNER_SELECT_STEP3"], "PLANNER", "CREATE_PLAN_STEP3_NEXT_BTN", "SELECT_STEP3", step3 + "-" + step4, e);
    });

    cancelPlanBtn.onclick = function (e) {
        stopEventPropagation(e);
        let instantEvent = "";
        if (displayPlanDiv.innerHTML.trim().length !== 0) { //编辑之后的cancel
            hideEditAreaShowEditBtn();
            instantEvent = "CANCEL_EDIT";
            plannerEditButtonClickStatus = false;
        } else { // 创建过程中的cancel
            clearPlanner();
            learningStrategySelect.selectedIndex = 0;
            instantEvent = "CANCEL_CREATE";
            plannerSaveButtonClickStatus = false;
        }

        // sendMyTraceDataPost("/trace-planner", getCurrentTimestamp(), "PLANNER", "MOUSE_CLICK", "CANCEL_PLAN_BTN", instantEvent, "", e);
        sendEventMessage("", getCurrentTimestamp(), "PLANNER", "MOUSE_CLICK", subActionLabelMap["PLANNER_" + instantEvent], "PLANNER", "CANCEL_PLAN_BTN", instantEvent, "", e);
    };
    savePlanBtn.onclick = function (e) {
        stopEventPropagation(e);
        displayPlanMessageDiv.innerHTML = "";
        if (learningStrategySelect.selectedIndex === learningStrategySelect.options.length-1) { // 自定义plan 保存
            customiseStep2Task = [];
            customiseStep2Time = [];
            customiseExplanation = "";
            let allCustomiseStrategyNameInput = createCustomisePlanDiv.querySelectorAll("input.customise-strategy-name-input");
            let allCustomiseStrategyTimeInput = createCustomisePlanDiv.querySelectorAll("input.customise-strategy-time-input");
            let customisePlanReasonTextarea = document.querySelector("#customise-plan-reason-textarea");
            let sumTime = 0;
            for (let i = 0; i < allCustomiseStrategyNameInput.length; i++) {
                customiseStep2Task.push(allCustomiseStrategyNameInput[i].value.trim());
                customiseStep2Time.push(allCustomiseStrategyTimeInput[i].value);

                sumTime += Number(allCustomiseStrategyTimeInput[i].value);
            }
            customiseExplanation = customisePlanReasonTextarea.value;

            if (sumTime > totalMinutes || customiseStep2Task.includes("") || customiseStep2Time.includes("")) {
                displayPlanMessageDiv.innerHTML = plannerSavePlanHint;
                return;
            }
            displayPlanDiv.innerHTML = generateCustomiseDisplayPlanHtml(customiseStep2Task, customiseStep2Time);
            hideEditAreaShowEditBtn();

        } else {
            let hasItemStep3Checked = false;
            let hasItemStep4Checked = false;
            let step3 = "";
            let step4 = "";
            if (learningStrategySelect.selectedIndex === 1 || learningStrategySelect.selectedIndex === 2) {
                step3 = "Reading";
                step4 = "Writing";
            } else {
                step3 = "Writing";
                step4 = "Reading";
            }
            defaultStep3ReadingStrategySelection = [];
            defaultStep3WritingStrategySelection = [];
            defaultStep21Time = [0, 0, 0, 0];
            defaultStep22Time = [0, 0, 0];
            defaultStep23Time = [0, 0, 0, 0];
            defaultStep24Time = [0, 0, 0, 0];
            defaultStep25Time = [0, 0, 0, 0];

            hasItemStep3Checked = getStep3Or4CheckResult(createPlanStep3Div, step3);
            hasItemStep4Checked = getStep3Or4CheckResult(createPlanStep4Div, step4);

            if (hasItemStep3Checked && hasItemStep4Checked && getStep2TimeAllocation()) {
                displayPlanDiv.innerHTML = generateDisplayPlanHtml(learningStrategySelect.options[learningStrategySelect.selectedIndex].innerText,
                    eval("defaultStep2" + learningStrategySelect.selectedIndex + "Task"), eval("defaultStep2" + learningStrategySelect.selectedIndex + "Time"),
                    eval("defaultStep3" + step3 + "Strategy"), eval("defaultStep3" + step3 + "StrategySelection"),
                    eval("defaultStep3" + step4 + "Strategy"), eval("defaultStep3" + step4 + "StrategySelection"), (learningStrategySelect.selectedIndex === 1 || learningStrategySelect.selectedIndex === 2));

                hideEditAreaShowEditBtn();
            } else {

                displayPlanMessageDiv.innerHTML = plannerSelectSkillsHint;
            }
        }

        let savePlannerTimestamp = getCurrentTimestamp();
        let plannerElements = {
            selectionIndex : learningStrategySelect.selectedIndex,
            defaultStep21Time : defaultStep21Time, //用户选择第1个 option
            defaultStep22Time : defaultStep22Time, //用户选择第2个 option
            defaultStep23Time : defaultStep23Time, //用户选择第3个 option
            defaultStep24Time : defaultStep24Time, //用户选择第3个 option
            defaultStep25Time : defaultStep25Time, //用户选择第3个 option
            defaultStep3ReadingStrategySelection : defaultStep3ReadingStrategySelection,
            defaultStep3WritingStrategySelection : defaultStep3WritingStrategySelection,
            customiseStep2Task : customiseStep2Task,
            customiseStep2Time : customiseStep2Time,
            customiseExplanation : customiseExplanation};


        localStorage.setItem(userId + "-" + currentCourseId + "myDisplayPlanDivInnerHtml", displayPlanDiv.innerHTML);
        localStorage.setItem(userId + "-" + currentCourseId + "myPlannerElementsJson", JSON.stringify(plannerElements));
        $.post(apiBaseUrl + "/save-planner-content", {
            userId: userId,
            saveTime: savePlannerTimestamp,
            username: username == null ? getUsername() : username,
            url: getCurrentUrl(),
            plannerElementsJson: JSON.stringify(plannerElements),

            displayPlanDivInnerHtml: displayPlanDiv.innerHTML,
            courseId: currentCourseId
        });
        // sendMyTraceDataPost("/trace-planner", savePlannerTimestamp, "PLANNER", "MOUSE_CLICK", "SAVE_PLANNER_BTN", "SAVE", "SELECT_INDEX:::" + learningStrategySelect.selectedIndex, e);
        sendEventMessage("", savePlannerTimestamp, "PLANNER", "MOUSE_CLICK", subActionLabelMap["PLANNER_SAVE"], "PLANNER", "SAVE_PLANNER_BTN", "SAVE", "SELECT_INDEX:::" + learningStrategySelect.selectedIndex, e);

        plannerEditButtonClickStatus = false;
        plannerSaveButtonClickStatus = true;
    };

    editPlanBtn.onclick = function (e) {
        stopEventPropagation(e);
        saveCancelPlanBtnsDiv.classList.remove("d-none"); //显示 save 和cancel 按钮
        editPlanBtnsDiv.classList.add("d-none"); //隐藏 edit 按钮

        displayPlanDiv.classList.add("d-none"); // 隐藏display plan 区域
        //展示 所有编辑区域
        createPlanStep1Div.classList.remove("d-none");
        createPlanStep2Div.classList.remove("d-none");
        createPlanStep3Div.classList.remove("d-none");
        createPlanStep4Div.classList.remove("d-none");
        createCustomisePlanDiv.classList.remove("d-none");
        if (learningStrategySelect.selectedIndex === learningStrategySelect.options.length-1) {
            addMoreCustomiseStrategyBtn.classList.remove("d-none");
        }
        displayPlanMessageDiv.innerHTML = "";
        // sendMyTraceDataPost("/trace-planner", getCurrentTimestamp(), "PLANNER", "MOUSE_CLICK", "EDIT_PLAN_BTN", "EDIT", "", e);
        sendEventMessage("", getCurrentTimestamp(), "PLANNER", "MOUSE_CLICK", subActionLabelMap["PLANNER_EDIT"], "PLANNER", "EDIT_PLAN_BTN", "EDIT", "", e);
        plannerEditButtonClickStatus = true;
    };

    addMoreCustomiseStrategyBtn.onclick = function (e) {
        stopEventPropagation(e);
        let placeholder = document.createElement("div");
        placeholder.innerHTML = generateCustomiseStrategyItemHtml("", "");
        createCustomisePlanDiv.insertBefore(placeholder.firstElementChild, document.querySelector("#customise-plan-reason-div"));
        let instant_event = "";
        if (plannerEditButtonClickStatus) {
            instant_event = "EDIT_ADD_CUSTOMISED_ITEM";
        } else {
            instant_event = "CREATE_ADD_CUSTOMISED_ITEM";
        }
        // sendMyTraceDataPost("/trace-planner", getCurrentTimestamp(), "PLANNER", "MOUSE_CLICK", "ADD_MORE_CUSTOM_BTN", instant_event, "", e);
        sendEventMessage("", getCurrentTimestamp(), "PLANNER", "MOUSE_CLICK", subActionLabelMap["PLANNER_" + instant_event], "PLANNER", "ADD_MORE_CUSTOM_BTN", instant_event, "", e);
    };

    $(createCustomisePlanDiv).on("click", ".delete-customise-strategy-btn", function (e) {
        stopEventPropagation(e);
        let customiseStrategyItem = $(this).closest(".customise-strategy-item");
        customiseStrategyItem.remove();
        let instant_event = "";
        if (plannerEditButtonClickStatus) {
            instant_event = "EDIT_DELETE_CUSTOMISED_ITEM";
        } else {
            instant_event = "CREATE_DELETE_CUSTOMISED_ITEM";
        }
        // sendMyTraceDataPost("/trace-planner", getCurrentTimestamp(), "PLANNER", "MOUSE_CLICK", "DELETE_MORE_CUSTOM_BTN", instant_event, "", e);
        sendEventMessage("", getCurrentTimestamp(), "PLANNER", "MOUSE_CLICK", subActionLabelMap["PLANNER_" + instant_event], "PLANNER", "DELETE_MORE_CUSTOM_BTN", instant_event, "", e);
    });
}

function restorePlannerView(plannerElementsJson, displayPlanDivInnerHtml) {
    let plannerElements = JSON.parse(plannerElementsJson);
    displayPlanDiv.innerHTML = displayPlanDivInnerHtml;

    hideEditAreaShowEditBtn();
    // selectionIndex : learningStrategySelect.selectedIndex,
    //     defaultStep21Time : defaultStep21Time, //用户选择第1个 option
    //     defaultStep22Time : defaultStep22Time, //用户选择第2个 option
    //     defaultStep23Time : defaultStep23Time, //用户选择第3个 option
    //     defaultStep3ReadingStrategySelection : defaultStep3ReadingStrategySelection,
    //     defaultStep3WritingStrategySelection : defaultStep3WritingStrategySelection,
    //     customiseStep2Task : customiseStep2Task,
    //     customiseStep2Time : customiseStep2Time,
    //     customiseExplanation : customiseExplanation
    // console.log(plannerElements);
    learningStrategySelect.selectedIndex = plannerElements.selectionIndex;
    if (plannerElements.selectionIndex === learningStrategySelect.options.length-1) {

        createCustomisePlanDiv.innerHTML = '<h6>2. ' + customiseStep2Instruction + '</h6>';
        for (let i =0; i < plannerElements.customiseStep2Task.length; i++) {
            createCustomisePlanDiv.innerHTML += generateCustomiseStrategyItemHtml(plannerElements.customiseStep2Task[i], plannerElements.customiseStep2Time[i]);
        }

        createCustomisePlanDiv.innerHTML += '<div id="customise-plan-reason-div"><label for="customise-plan-reason-textarea">' + plannerCustomiseOptionHintTextareaPlaceholder + '</label><textarea class="form-control" id="customise-plan-reason-textarea" placeholder="' + plannerCustomisePlanReasonPlaceholder + '">' + plannerElements.customiseExplanation + '</textarea></div>';
    } else if (plannerElements.selectionIndex !== 0) {
        createPlanStep2Div.innerHTML = generateStep2Html(
            eval("defaultStep2" + plannerElements.selectionIndex + "Task"), //这些字段都定义在index html 里面
            eval("plannerElements.defaultStep2" + plannerElements.selectionIndex + "Time"),
            eval("defaultStep2" + plannerElements.selectionIndex + "TaskInstruction"), "d-none");

        createPlanStep3Div.innerHTML = "";

        if (plannerElements.selectionIndex === 1 || plannerElements.selectionIndex === 2) {
            createPlanStep3Div.innerHTML = generateStep3Html(defaultStep3ReadingStrategy, plannerElements.defaultStep3ReadingStrategySelection, defaultStep3ReadingInstruction, 3, "d-none");
        } else if (plannerElements.selectionIndex === 3 || plannerElements.selectionIndex === 4) {
            createPlanStep3Div.innerHTML = generateStep3Html(defaultStep3WritingStrategy, plannerElements.defaultStep3WritingStrategySelection, defaultStep3WritingInstruction, 3, "d-none");
        }

        let step3 = "";
        let step4 = "";
        if (plannerElements.selectionIndex === 1 || plannerElements.selectionIndex === 2) {
            step3 = "Reading";
            step4 = "Writing";
        } else if (plannerElements.selectionIndex === 3 || plannerElements.selectionIndex === 4) {
            step3 = "Writing";
            step4 = "Reading";
        }
        createPlanStep4Div.innerHTML = "";
        createPlanStep4Div.innerHTML = generateStep3Html(eval("defaultStep3" + step4 + "Strategy"), eval("plannerElements.defaultStep3" + step4 + "StrategySelection"), eval("defaultStep3" + step4 + "Instruction"), 4, "");
    } else {
        // console.log("restorePlannerView: not select any option");
    }

}

function loadPlanner() {
    let plannerElementsJson = localStorage.getItem(userId + "myPlannerElementsJson");
    let displayPlanDivInnerHtml = localStorage.getItem(userId + "myDisplayPlanDivInnerHtml");

    if (plannerElementsJson === null || plannerElementsJson === "") { //如果本地不存在，则从服务器获取 // TODO 尝试放入缓存
        // console.log("---------------load page: no PlannerElements in localstorage", apiBaseUrl + "/load-planner-to-sidebar");

        $.post(apiBaseUrl + "/load-planner-to-sidebar", {
            userId: userId,
            courseId: currentCourseId,
        }, function (data, status) {
            if (data.data != null) {
                plannerElementsJson = data.data.plannerElementsJson;
                if (plannerElementsJson !== null && plannerElementsJson !== "") {
                    localStorage.setItem(userId + "-" + currentCourseId + "myPlannerElementsJson", plannerElementsJson);

                    // 恢复planner 视图
                    restorePlannerView(plannerElementsJson, data.data.displayPlanDivInnerHtml);
                    plannerSaveButtonClickStatus = true;
                }
            } else {
                // console.log("************************no PlannerElements in server");
            }
        });
    } else {
        // console.log("---------------load page: PlannerElements in localstorage is not null");
        // 恢复planner 视图
        restorePlannerView(plannerElementsJson, displayPlanDivInnerHtml);
        plannerSaveButtonClickStatus = true;
    }
}


showPlanner2Btn.addEventListener("mousedown", function (e) {e.stopPropagation();});
showPlanner2Btn.onclick = function (e) {
    // console.log("----------------------------------------showPlanner2Btn clicked");
    stopEventPropagation(e);
    if (useAnnotationTool) hideAnnotationToolbox(); // 隐藏annotation toolbox，当点击其他按钮时候
    collapsePlanner2.classList.toggle("in-tools");
    toolsAndEssayToggle(collapsePlanner2);

    plannerClickTargetObject = "SHOW_PLANNER_BTN";
    plannerPageEvent = "MOUSE_CLICK";
    sendEventMessage("", getCurrentTimestamp(), "PLANNER", plannerPageEvent, subActionLabelMap["PLANNER_READ_PLANNER_CLICK"], "PLANNER", plannerClickTargetObject, "SHOW_PLANNER_BTN_CLICK", "", null);
    // if (collapsePlanner2.classList.contains("in-tools")) {
    //     hideOtherTools(collapsePlanner2);
    // }

    // let instantEvent = "";
    // let eventValue = "";
    // let saveTime = getCurrentTimestamp();
    // if (collapsePlanner2.classList.contains("in-tools")) {
    //     instantEvent = "OPEN";
    //     eventValue = "START_USE_TOOL:::" + saveTime;
    //     planner2ToolUseLength = saveTime;
    // } else {
    //     instantEvent = "CLOSE";
    //
    //     planner2ToolUseLength = saveTime - planner2ToolUseLength;
    //     eventValue = "TOOL_USE_LENGTH:::" + planner2ToolUseLength;
    // }
    //
    // sendMyTraceDataPost("/trace-planner", saveTime, "PLANNER", "MOUSE_CLICK", "SHOW_PLANNER_BTN", instantEvent, eventValue, e);
};


function myCallbackPlanner(contains, element) {
    let saveTime;

    let eventValue;
    if (contains) {
        // console.log('Element with id:', element.id, 'has the "in-tools" class!');
        saveTime = getCurrentTimestamp();
        plannerInstantEvent = "OPEN";
        eventValue = "START_USE_TOOL:::" + saveTime;
        plannerToolStartUseTime = saveTime;
        // console.log('plannerToolStartUseTime:' + plannerToolStartUseTime);
        // sendMyTraceDataPost("/trace-planner", saveTime, "PLANNER", plannerPageEvent, plannerClickTargetObject, plannerInstantEvent, eventValue, null);
        sendEventMessage("", saveTime, "PLANNER", plannerPageEvent, subActionLabelMap["PLANNER_" + plannerInstantEvent], "PLANNER", plannerClickTargetObject, plannerInstantEvent, eventValue, null);

    } else {
        if (plannerInstantEvent !== "CLOSE") {
            // console.log('Element with id:', element.id, 'has not the "in-tools" class!');
            saveTime = getCurrentTimestamp();
            plannerInstantEvent = "CLOSE";
            if (plannerToolStartUseTime === 0) {
                eventValue = "TOOL_USE_LENGTH:::ERROR-" + (saveTime - plannerToolStartUseTime);
            } else {
                eventValue = "TOOL_USE_LENGTH:::" + (saveTime - plannerToolStartUseTime);
            }

            // console.log('planner tool use length:' + (saveTime - plannerToolStartUseTime));
            // sendMyTraceDataPost("/trace-planner", saveTime, "PLANNER", plannerPageEvent, plannerClickTargetObject, plannerInstantEvent, eventValue, null);
            sendEventMessage("", saveTime, "PLANNER", plannerPageEvent, subActionLabelMap["PLANNER_" + plannerInstantEvent], "PLANNER", plannerClickTargetObject, plannerInstantEvent, eventValue, null);
        } else {
            // console.log('Element with id:', element.id, 'is keep closed');
        }

    }
    plannerClickTargetObject = "NO_TARGET_OBJECT";
    plannerPageEvent = "NO_PAGE_EVENT";
}
handleClassMutation(collapsePlanner2, myCallbackPlanner); //监听

