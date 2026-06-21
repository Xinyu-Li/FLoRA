function render() {
    let scaffoldsToolHtml = `<!-- scaffolds Tool Html  -->
        <div class="my-horizontal-collapse-tools planner2" id="scaffolds-collapse" style="z-index: 201;">
            <div class="card card-body overflow-auto" style="height:100%;">
                <h3 class="mt-2 mb-2"><span>${scaffoldingTitle}</span> <button type="button" class="btn btn-close" style="position:absolute; right:20px;" aria-label="Close" id="close-scaffolds-btn"></button></h3>
                <ul class="nav nav-pills" id="scaffold-nav" role="tablist">`;
    for (let i = 0; i < ruleBasedScaffoldContent.length; i++) {
        scaffoldsToolHtml += `<li class="nav-item text-center" data-order="${i}" style="width: 18%;" role="presentation"><button class="nav-link w-100" id="pills-scaffold${i}-div-tab" data-bs-toggle="pill" data-bs-target="#scaffold${i}-div" type="button" role="tab" aria-controls="scaffold${i}-div" aria-selected="false">S${i+1}</button></li>`;
    }
    scaffoldsToolHtml += '</ul><div class="tab-content">';
    for (let i = 0; i < ruleBasedScaffoldContent.length; i++) {
        scaffoldsToolHtml += `<div id="scaffold${i}-div" class="tab-pane fade border border-2 mt-2 bg-white overflow-auto p-2" role="tabpanel" aria-labelledby="pills-scaffold${i}-div-tab" style="height:100%; word-wrap: break-word; white-space : normal;">
                       <h6>${ruleBasedScaffoldContent[i].title}</h6>
                       <h6 class="text-primary">Based on your learning behaviour so far, we recomment the following steps:</h6>
                       <div class="mt-4 scaffold-suggestion" id="scaffold${i}-suggestions-div">
                           <div style="visibility: hidden">${blueLog("tried to generate check boxes: "+ ruleBasedScaffoldContent[i].content[0])}</div>
                           <h2> Default suggestion placeholder S${i}</h2>
                           <h1> Default suggestion placeholder </h1>
                           <input type="checkbox" class="btn-check scaffold-suggestion-item" id="btn-check-outlined1${i}" autocomplete="off"><label class="btn btn-outline-primary w-100 mt-2" for="btn-check-outlined1${i}" style="text-align:left;">${ruleBasedScaffoldContent[i].content[0]}</label><br>
                           <input type="checkbox" class="btn-check scaffold-suggestion-item" id="btn-check-outlined2${i}" autocomplete="off"><label class="btn btn-outline-primary w-100 mt-2" for="btn-check-outlined2${i}" style="text-align:left;">${ruleBasedScaffoldContent[i].content[1]}</label><br>
                           <input type="checkbox" class="btn-check scaffold-suggestion-item" id="btn-check-outlined3${i}" autocomplete="off"><label class="btn btn-outline-primary w-100 mt-2" for="btn-check-outlined3${i}" style="text-align:left;">${ruleBasedScaffoldContent[i].content[2]}</label><br>
                       </div>
                       <div class="mt-4 scaffold-todolist d-none" id="scaffold${i}-todolist-div"></div>
                       <div class="mt-4">
                           <button class="btn btn-primary create-scaffolds-checklist-btn" data-order="${i}">${scaffoldingCreateChecklistBtnText}</button>
                           <button class="btn btn-warning d-none edit-scaffolds-todolist-btn" data-order="${i}">${scaffoldingEditChecklistBtnText}</button>
                       </div>
                    </div>`;
    }
    scaffoldsToolHtml +=
        `    </div></div>
        </div>`;
    $("body").append(scaffoldsToolHtml);
}
render();

blueLog("ruleBasedScaffoldContent")
// console.log(ruleBasedScaffoldContent)

// let scaffoldsAlertSpan = document.querySelector("#scaffolds-alert-span");
let collapseScaffolds = document.querySelector("#scaffolds-collapse");
toolList1.push(collapseScaffolds);

// This is the envelope button in index-revision page
let showScaffoldsBtn = document.querySelector("#showScaffoldsBtn");
let closeScaffoldsBtn = document.querySelector("#close-scaffolds-btn");

// This is the list of scaffoldings, S1, S2, S3 ...
let scaffoldNav = document.querySelector("#scaffold-nav");
let scaffoldInfo = [];

//This 4 variables are only used for tool open/close event
let scaffoldToolStartUseTime = 0;
let scaffoldClickTargetObject = "NO_TARGET_OBJECT";
let scaffoldPageEvent = "NO_PAGE_EVENT";
let scaffoldInstantEvent = "CLOSE";

// This variable is to record the last viewed scaffold option
let lastScaffoldOption = -1;

//TODO scaffold shadow div

// let scaffoldSuggestionsDivArr = document.querySelectorAll(".scaffold-suggestion");
// let scaffoldTodolistDivArr = document.querySelectorAll(".scaffold-todolist");


// let navItemList = scaffoldNav.querySelectorAll(".nav-item");


// let createScaffoldsChecklistBtn = document.querySelector("#create-scaffolds-checklist-btn");

// let currentNavOrder = 1; //获取第几个scaffold 正在被查看，或者需要create todolist 或者 编辑 todolist
// let scaffoldInfo = null;
// let scaffoldStatus = null; // active, _, disabled
// let scaffoldViewedStatus = null; // passed, click_viewed, force_viewed, _
// let scaffoldTodolistEditBtn = document.querySelector("#edit-scaffolds-todolist-btn");


function blueLog(log, showBlueLogs){
    showBlueLogs = true;
    if(showBlueLogs)
        console.log("%c"+ log, "color:blue");
}

function setupScaffoldsTool() {
    //当鼠标在写作框区域移动时候，所有移动和滚动行为都标注为WRITE_ESSAY
    collapseScaffolds.onmousewheel = function(e) {
        stopEventPropagation(e);
        // console.log("%c#02 onmousewheel triggered", "color:blue");

        // mousewheelData.push(generateMouseWheelData(e, "READ_SCAFFOLD"));
        sendEventMessage("", getCurrentTimestamp(), "SCAFFOLD", "MOUSE_WHEEL", "READ_SCAFFOLD", "SCAFFOLD",null, "NO_INSTANT_EVENT", "SCROLL_DIST:::" + e.deltaY, e);
    };
    collapseScaffolds.onmousemove = function(e) {
        stopEventPropagation(e);
        // console.log("%c#02 onmousemove triggered", "color:blue");

        mousePosition = generateMousePositionData(e, "READ_SCAFFOLD", "SCAFFOLD");
    };
    collapseScaffolds.onclick = function(e) {
        stopEventPropagation(e);
        // console.log("%c#02 collapseScaffolds click", "color:blue");
        // console.log(getCurrentTimestamp());

        // sendMyTraceDataPost("/trace-scaffold", getCurrentTimestamp(), "SCAFFOLD", "MOUSE_CLICK", null, "CLICK", "", e); //当select text时候会触发，mouse down up click 事件
        sendEventMessage("", getCurrentTimestamp(), "SCAFFOLD", "MOUSE_CLICK", subActionLabelMap["SCAFFOLD_CLICK"], "SCAFFOLD", null, "CLICK", "", e);
    };

    // This would be called on releasing the click of the scaffolding panel
    collapseScaffolds.onmouseup = function (e) {
        stopEventPropagation(e);
        // console.log("%ccollapseScaffolds select", "color:blue");
        if (window.getSelection() != null && window.getSelection().toString().replace(/\n/g, '').length > 0) {
            let selectText = window.getSelection().toString();
            // sendMyTraceDataPost("/trace-scaffold", getCurrentTimestamp(), "SCAFFOLD", "MOUSE_SELECT_TEXT", null, "SELECT_TEXT", "MOUSE_SELECT:::" + selectText, e); //当select text时候会触发，mouse down up click 事件
            sendEventMessage("", getCurrentTimestamp(), "SCAFFOLD", "MOUSE_SELECT_TEXT", subActionLabelMap["SCAFFOLD_SELECT_TEXT"], "SCAFFOLD", null, "SELECT_TEXT", "MOUSE_SELECT:::" + selectText, e);
        }
    }

    //判断用户是否选中了某个scaffolding suggestion item，
    //这个scaffolding suggestion item 指的是点了Sn之后出现的check box
    $(".scaffold-suggestion").on("change", ".scaffold-suggestion-item", function(e) {
        stopEventPropagation(e);
        let instantEvent = "";
        if (this.checked) {
            instantEvent = "CHECK_SUGGESTION";
        } else {
            instantEvent = "UNCHECK_SUGGESTION";
        }
        // sendMyTraceDataPost("/trace-scaffold", getCurrentTimestamp(), "SCAFFOLD", "MOUSE_CLICK", "SCAFFOLD_SUGGESTION_BTN", instantEvent,  "SUGGESTION_CONTENT:::" + $(this).next().text(), e);
        sendEventMessage("", getCurrentTimestamp(), "SCAFFOLD", "MOUSE_CLICK", subActionLabelMap["SCAFFOLD_" + instantEvent], "SCAFFOLD", "SCAFFOLD_SUGGESTION_BTN", instantEvent,  "SUGGESTION_CONTENT:::" + $(this).next().text(), e);
    });

    // This is the event listener for clicking on the S1, 2, 3...
    $(scaffoldNav).on("click", ".nav-item", function(e) {
        stopEventPropagation(e);
        // console.log("scaffold order:--------------------" + this.dataset.order);
        // console.log(this.dataset.order);

        if (this.classList.contains("disabled")) {
            blueLog("disabled scaffold btn clicked")
            return;
        }
        lastScaffoldOption = this.dataset.order;
        // sendMyTraceDataPost("/trace-scaffold", getCurrentTimestamp(), "SCAFFOLD", "MOUSE_CLICK", "SCAFFOLD_NAV_BAR", "CHANGE_SCAFFOLD_PANEL",  "CHANGE_SCAFFOLD_TO:::S" + this.dataset.order, e);
        sendEventMessage("", getCurrentTimestamp(), "SCAFFOLD", "MOUSE_CLICK", subActionLabelMap["SCAFFOLD_CHANGE_SCAFFOLD_PANEL"], "SCAFFOLD", "SCAFFOLD_NAV_BAR", "CHANGE_SCAFFOLD_PANEL",  "CHANGE_SCAFFOLD_TO:::S" + this.dataset.order, e);
    });

    // "创建清单"这个按钮的eventListener
    $(".create-scaffolds-checklist-btn").click(function(e) {
        stopEventPropagation(e);
        let currentNavOrder = this.dataset.order;
        let scaffoldSuggestionsDiv = $("#scaffold" + currentNavOrder + "-suggestions-div");

        // let todoList = [];
        scaffoldInfo[currentNavOrder]["todo_list"] = [];
        let allCheckInputList = scaffoldSuggestionsDiv.find("input");

        // 把checkbox里check的选项加入到scaffoldInfo内，
        blueLog("checked input list: ")
        // console.log(allCheckInputList)
        for (let i = 0; i < allCheckInputList.length; i++) {
            if (allCheckInputList[i].checked) {
                // changed in 2024/3/10, "order": i to current version. As show to do list use the order number in content list but here
                // records the order number of shwon list of suggestion list.
                scaffoldInfo[currentNavOrder]["todo_list"].push({"order": $(allCheckInputList[i]).attr("orderincontent"), "checked":false}); // 初始记录所有选中加入todo list 的items
            }
        }
        if (scaffoldInfo[currentNavOrder]["todo_list"].length === 0) {
            alert("please select some suggestions!!!");
            return;
        }
        sendPostToSaveScaffoldContent();
        processScaffoldTodoList(scaffoldInfo[currentNavOrder]["todo_list"], currentNavOrder);
        let saveScaffoldTime = getCurrentTimestamp();
        // console.log("create-scaffolds-checklist-btn");
        // console.log(todoList);
        // updateScaffoldTodoList(todoList, currentNavOrder);

        // scaffoldSuggestionsDiv.classList.add("d-none");             //隐藏suggestion div
        // scaffoldTodolistDiv.classList.remove("d-none");      //展示todo list div
        // this.nextElementSibling.classList.remove("d-none");  // 展示edit button
        // this.classList.add("d-none");                               // 隐藏createChecklist btn
        // showTodoListPanel(scaffoldSuggestionsDiv, scaffoldTodolistDiv);

        // sendMyTraceDataPost("/trace-scaffold", saveScaffoldTime, "SCAFFOLD", "MOUSE_CLICK", "CREATE_SCAFFOLD_TODOLIST_BTN", "CREATE_SCAFFOLD_TODOLIST",  "", e);
        sendEventMessage("", saveScaffoldTime, "SCAFFOLD", "MOUSE_CLICK", subActionLabelMap["SCAFFOLD_CREATE_SCAFFOLD_TODOLIST"], "SCAFFOLD", "CREATE_SCAFFOLD_TODOLIST_BTN", "CREATE_SCAFFOLD_TODOLIST",  "", e);
    });

    $(".scaffold-todolist").on("change", ".scaffold-todolist-check", function(e) {
        // console.log("----hellowlwwwwwwwwwww");
        $(this).parent().toggleClass("text-decoration-line-through");
        // console.log(this.checked);
        let instantEvent = "";
        if ($(this).parent().hasClass("text-decoration-line-through")) {
            $(this).attr("checked", "checked");
            instantEvent = "CHECK_TODO_ITEM";
        } else {
            $(this).removeAttr("checked");
            instantEvent = "UNCHECK_TODO_ITEM";
        }
        let currentNavOrder = parseInt($(this).closest(".scaffold-todolist").attr("id")[8]);

        // let todoList = scaffoldInfo[currentNavOrder]["todo_list"];
        // console.log("in click scaffold-todolist-check");
        // console.log(todoList);
        for (let i = 0; i < scaffoldInfo[currentNavOrder]["todo_list"].length; i++) {
            let item = scaffoldInfo[currentNavOrder]["todo_list"][i];
            if (item["order"] === this.dataset.todoorder) {
                scaffoldInfo[currentNavOrder]["todo_list"][i]["order"] = this.checked;
            }
        }
        sendPostToSaveScaffoldContent();
        // for (let item of scaffoldInfo[currentNavOrder]["todo_list"]) {
        //     if (item["order"] === this.dataset.todoorder) {
        //         item["order"] = this.checked;
        //     }
        // }
        // console.log(this.dataset.todoorder);
        // console.log(scaffoldInfo);

        let saveScaffoldTime = getCurrentTimestamp();
        // updateScaffoldTodoList(todoList, currentNavOrder);
        // console.log(scaffoldInfo);
        // sendMyTraceDataPost("/trace-scaffold", saveScaffoldTime, "SCAFFOLD", "MOUSE_CLICK", "SCAFFOLD_TODOLIST_CHECK", instantEvent,  "CHANGE_TEXT:::" + $(this).text(), e);
        sendEventMessage("", saveScaffoldTime, "SCAFFOLD", "MOUSE_CLICK", subActionLabelMap["SCAFFOLD_" + instantEvent], "SCAFFOLD", "SCAFFOLD_TODOLIST_CHECK", instantEvent,  "CHANGE_TEXT:::" + $(this).text(), e);
    });

    // 这个button 是“编辑”键
    $(".edit-scaffolds-todolist-btn").click(function(e) {
        showSuggestionPanel(this.dataset.order);
    });
}

// show currently or previously selected scaffold option
function showCurrentScaffold(currentNavOrder, viewStatus) {
    blueLog("showCurrentScaffold called")
    // 这个开始时间是在redis里存储的
    let currentMinute = Math.floor((getCurrentTimestamp() - taskStartTimestamp) / 1000 / 60);
    blueLog("currentNavOrder: " + currentNavOrder)
    blueLog("current minute is: " + currentMinute)
    if (currentMinute <= 0) { // 如果点击时候时间为0，不做任何修改
        return;
    }

    // This is why the scaffold came out, it would show the new scaffold, not the previous one.
    if (currentNavOrder === -1) {
        // blueLog("scaffold[0].triggerMinute: " + ruleBasedScaffoldContent[0].triggerMinute)
        // blueLog("scaffold[1].triggerMinute: " + ruleBasedScaffoldContent[1].triggerMinute)
        // blueLog("scaffold[2].triggerMinute: " + ruleBasedScaffoldContent[2].triggerMinute)
        // blueLog("scaffold[3].triggerMinute: " + ruleBasedScaffoldContent[3].triggerMinute)
        // blueLog("scaffold[4].triggerMinute: " + ruleBasedScaffoldContent[4].triggerMinute)
        if (currentMinute <= ruleBasedScaffoldContent[0].triggerMinute) {
            currentNavOrder = 0;
        } else if (currentMinute <= ruleBasedScaffoldContent[1].triggerMinute) {
            currentNavOrder = 1;
        } else if (currentMinute <= ruleBasedScaffoldContent[2].triggerMinute) {
            currentNavOrder = 2;
        } else if (currentMinute <= ruleBasedScaffoldContent[3].triggerMinute) {
            currentNavOrder = 3;
        } else if (currentMinute <= ruleBasedScaffoldContent[4].triggerMinute) {
            currentNavOrder = 4;
        }
    }
    blueLog("currentNavOrder after checking scaffold availability: " + currentNavOrder)
    // currentNavOrder = 3
    if (currentNavOrder === -1) {
        return;
    }

    // console.log("currentMinute:" + currentMinute + "-----currentNavOrder:" + currentNavOrder);
    // console.log(scaffoldInfo);
    // scaffold panel 显示时候，去掉alert message

    // 如果有选中scaffold，则直接展示todo list， todolist就是选中了suggestion之后的scaffold
    if (scaffoldInfo[currentNavOrder]["todo_list"].length !== 0) {
        showTodoListPanel(currentNavOrder); //方法中只调整了d-none，但是 tab可能还是被bootstrap js 控制的
    } else {
        showSuggestionPanel(currentNavOrder); //方法中只调整了d-none，但是 tab可能还是被bootstrap js 控制的
        $("#pills-scaffold" + currentNavOrder + "-div-tab").click();
    }
    updateScaffoldViewStatus(currentNavOrder, viewStatus);
}


// 根据d-none 这个class来展示或者隐藏todo list或者suggestion list
function showSuggestionPanel(currentNavOrder) {
    let scaffoldSuggestionsDiv = $("#scaffold" + currentNavOrder + "-suggestions-div");
    let scaffoldTodolistDiv = $("#scaffold" + currentNavOrder + "-todolist-div");
    let createCheckListBtn = document.querySelector("button[data-order='" + currentNavOrder + "'].create-scaffolds-checklist-btn");
    scaffoldSuggestionsDiv.removeClass("d-none");             //展示suggestion div
    scaffoldTodolistDiv.addClass("d-none");      //隐藏todo list div
    createCheckListBtn.nextElementSibling.classList.add("d-none");  // 隐藏edit button
    createCheckListBtn.classList.remove("d-none");                               // 展示createChecklist btn
}
function showTodoListPanel(currentNavOrder) {
    let scaffoldSuggestionsDiv = $("#scaffold" + currentNavOrder + "-suggestions-div");
    let scaffoldTodolistDiv = $("#scaffold" + currentNavOrder + "-todolist-div");
    let createCheckListBtn = document.querySelector("button[data-order='" + currentNavOrder + "'].create-scaffolds-checklist-btn");
    scaffoldSuggestionsDiv.addClass("d-none");             //隐藏suggestion div
    scaffoldTodolistDiv.removeClass("d-none");      //展示todo list div
    createCheckListBtn.nextElementSibling.classList.remove("d-none");  // 展示edit button
    createCheckListBtn.classList.add("d-none");                               // 隐藏createChecklist btn
}


function processScaffoldTodoList(todoList, currentNavOrder) {
    if (todoList.length === 0) {
        return;
    }
    let todoListHtml = "";
    for (let j = 0; j < todoList.length; j++) {
        let checkStatus = todoList[j]['checked'] ? "checked" : "";
        todoListHtml += '<label class="list-group-item" style="padding:0.5rem 1.6rem"><input class="form-check-input me-1 scaffold-todolist-check" data-todoorder="' + j + '" type="checkbox" value="" ' + checkStatus + '>' + ruleBasedScaffoldContent[currentNavOrder].content[todoList[j]['order']] + '</label>';
    }

    todoListHtml = '<div class="list-group">' + todoListHtml + '</div>';

    showTodoListPanel(currentNavOrder); //只要有todolist 肯定 优先展示todolist

    $("#scaffold" + currentNavOrder + "-todolist-div").empty();
    $("#scaffold" + currentNavOrder + "-todolist-div").append(todoListHtml);
}

function processScaffoldSuggestion(scaffoldSuggestions, currentNavOrder) {
    let scaffoldSuggestionHtml = "";

    for (let j = 0; j < scaffoldSuggestions.length; j++) {
        blueLog(scaffoldSuggestions[j])
        //这里对应的是scaffoldInfo里的suggestion list的值之前是因为suggestion list的值全是000，导致无法显示suggestion list
        if (scaffoldSuggestions[j] === "1") { // 1 表示显示，0表示不显示

            scaffoldSuggestionHtml += '<input type="checkbox" class="btn-check scaffold-suggestion-item" id="btn-check-outlined' + j + currentNavOrder + '" autocomplete="off" orderincontent="'+ j +'"><label class="btn btn-outline-primary w-100 mt-2" for="btn-check-outlined' + j + currentNavOrder + '" style="text-align:left;">' + ruleBasedScaffoldContent[currentNavOrder].content[j] + '</label><br>';
            blueLog(ruleBasedScaffoldContent[currentNavOrder].content[j])
        }
    }
    blueLog("processScaffoldSuggestion called")
    blueLog(scaffoldSuggestionHtml)

    $('#scaffold' + currentNavOrder + '-suggestions-div').empty();
    $('#scaffold' + currentNavOrder + '-suggestions-div').append(scaffoldSuggestionHtml);
}

// This function is to determine whether to disable the scaffold according to view_status in scaffoldInfo[]
// This is called when initialising (loadScaffolds), and after specfic time frame (checkProcessLabelPatterns)
function processScaffoldInfo() {
    if (scaffoldInfo === null) {
        // console.log("scaffold null");
        alert("scaffold should not be null");
    } else {
        for (let i = 0; i < scaffoldInfo.length; i++) {

            //
            if (scaffoldInfo[i]["view_status"] === "skipped") {// 禁用该scaffold, 因为条件全部触发，被跳过
                // This is the code to disable or enable the scaffold tab, such as S1, S2, S3...
                $("#pills-scaffold" + i + "-div-tab").addClass("disabled");
            } else {
                $("#pills-scaffold" + i + "-div-tab").removeClass("disabled");

                // 渲染suggestion list
                let scaffoldSuggestions = scaffoldInfo[i]["suggestion_list"];
                blueLog("scaffoldInfo: ")
                // console.log(scaffoldInfo)
                processScaffoldSuggestion(scaffoldSuggestions, i);

                //渲染 todolist
                // to-do list 和suggestion list 不统一，
                //  因为todo list在记录的时候记录的是checklist的order，而不是在scaffold content的list order。
                let todoList = scaffoldInfo[i]["todo_list"];
                processScaffoldTodoList(todoList, i);
            }
        }
    }
}

// 这里是初始化scaffold的地方
function loadScaffolds() { //skipped, click_viewed, force_viewed, not_view, if skipped, suggestion_list must be 000
    $.post(apiBaseUrl + "/load-scaffold-to-sidebar", {
        userId: userId,
        courseId: currentCourseId
    }, function (data, status) {
        // console.log("scaffolding data。。。。。。。。。。。。。。。。。。。。。。。。。。");
        // console.log(data);

        if (status === "success") {
            let result = data.data;

            // console.log(result);

            if (result === "") {
                scaffoldInfo = [{"view_status": "skipped", "suggestion_list": "000", "todo_list": []},
                    {"view_status": "skipped", "suggestion_list": "000", "todo_list": []},
                    {"view_status": "skipped", "suggestion_list": "000", "todo_list": []},
                    {"view_status": "skipped", "suggestion_list": "000", "todo_list": []},
                    {"view_status": "skipped", "suggestion_list": "000", "todo_list": []}]
            } else {
                scaffoldInfo = JSON.parse(result);
            }
            processScaffoldInfo();

        } else {
            alert("error in scaffolding");
        }
    });

    // 这里是设定每隔一分钟检测一次label pattern的地方
    setInterval(function() {
        // console.log("********************check process label patterns--------------------");
        checkProcessLabelPatterns();
    }, 20000);
}


function updateScaffoldSuggestionStatus(index, scaffoldsShowStatus) {
    let result = {
        instantEvent: "",
        eventValue: index + 1
    }

    if (scaffoldsShowStatus[index] === "000") {
        scaffoldInfo[index]["view_status"] = "skipped";
        scaffoldInfo[index]["suggestion_list"] = "000";
        result.instantEvent = "PATTERN_DETECTED_SCAFFOLD";
    } else {
        // scaffold panel 显示时候，去掉alert message
        showScaffoldsBtn.querySelector("span").classList.remove("d-none");
        result.instantEvent = "SHOW_ALERT_MESSAGE_SCAFFOLD";
        scaffoldInfo[index]["view_status"] = "not_view";
        scaffoldInfo[index]["suggestion_list"] = scaffoldsShowStatus[index];
    }
    sendPostToSaveScaffoldContent();
    return result;
}

function updateScaffoldViewStatus(index, viewStatus) {
    scaffoldInfo[index]["view_status"] = viewStatus;
    sendPostToSaveScaffoldContent();
}

// function updateScaffoldTodoList(todoList, currentNavOrder) {
//     console.log(todoList);
//     scaffoldInfo[currentNavOrder]["todo_list"] = todoList;
//     //TODO send back to server
//     console.log(scaffoldInfo[currentNavOrder]["todo_list"]);
//     console.log(scaffoldInfo);
//     console.log(scaffoldInfo[currentNavOrder]["todo_list"]);
//     sendPostToSaveScaffoldContent();
// }

function sendPostToSaveScaffoldContent() {
    $.post(apiBaseUrl + "/save-scaffold-content", {
        userId: userId,
        saveTime: getCurrentTimestamp(),
        username: username == null ? getUsername() : username,
        url: getCurrentUrl(),
        scaffoldInfo: JSON.stringify(scaffoldInfo),
        courseId: currentCourseId
    }); //存储scaffold 数据
}

//按预设时间点，处理所有action label，找出pattern 并提示scaffolds
function checkProcessLabelPatterns() {
    if (scaffoldInfo === null) {
        return;
    }
    // console.log("%ccheckProcessLabelPatterns called", "color:blue")
    // let taskStartTimestamp = localStorage.getItem(userId + "ESSAY_TASK_START");
    let currentMinute = Math.floor((getCurrentTimestamp() - taskStartTimestamp) / 1000 / 60);
    // console.log("getCurrentTimestamp() - taskStartTimestamp = " + (getCurrentTimestamp() - taskStartTimestamp));
    // console.log("----------------start time:" + taskStartTimestamp +"----------------currentMinute:" + currentMinute);

    //提前2分钟 开始处理 process label TODO 需要检查测试
    /*if (!scaffoldShowingTime.includes(currentMinute) && !scaffoldShowingTime.includes(currentMinute + 1) && !scaffoldShowingTime.includes(currentMinute + 2)) {
        console.log("not send to server");
        return;
    }*/

    let instantEvent = "";
    let eventValue = 0;

    $.get(apiBaseUrl + "/rule-base-check-process-label-patterns/" + userId + "/" + currentMinute + "/" + currentCourseId + "/" + srlModel, function(data, status) {
        if (status !== "success") {
            alert("error in check process-label pattern, please refresh");
            return;
        }
        blueLog("recorded data: ↓")
        // console.log(data);
        blueLog("recorded data: ↑")

        let scaffoldsShowStatus = data.data["scaffold-show-status"] // 从server 返回的结果，表示 pattern 已经被detect 或者没有
        const scaffoldShowRecord = data.data["showed-record"]
        // console.log(data.data)
        // console.log(scaffoldsShowStatus)
        // blueLog(scaffoldShowRecord)
        // This is for testing. Show all suggestions.
        // 1 means show the suggestion, 0 means hide.
        if (getLastname() === "ge") {
            scaffoldsShowStatus = ["111", "111", "111", "111", "111"];  // GE group will show all the scaffolds
        }
        // This is for testing
        // todo: update this when usage
        scaffoldsShowStatus = ["101", "111", "101", "111", "111"]

        blueLog("ruleBasedScaffoldContent ↓")
        // console.log(ruleBasedScaffoldContent)

        let result = null;
        for (let i = 0; i < ruleBasedScaffoldContent.length; i++) {
            // 2024/3/9 changed from === to >= for testing
            // 原先只有在current Minute 等于设定的minute才会更新新的scaffold，改成>=后只要当前时间超过设定的时间就会更新
            // blueLog(parseInt(scaffoldShowRecord))
            // blueLog(i)
            // blueLog(i >= parseInt(scaffoldShowRecord))

            if (currentMinute >= ruleBasedScaffoldContent[i].triggerMinute && i >= parseInt(scaffoldShowRecord)) { //显示alert 提示message
                // console.log("updateScaffoldSuggestionStatus:" + currentMinute + "------------" + scaffoldsShowStatus);

                result = updateScaffoldSuggestionStatus(i, scaffoldsShowStatus); // 只有在需要显示alert message 时候，再更新scaffold show status

                // todo: 把scaffold S1，S2 S3的更新弄好，2024/3/10,break暂时去掉，测试展示S1,2，3,4的效果
                // This break is to make sure there is only one scaffold enabled for each time.
                $.get(apiBaseUrl + "/rule-base-update-show-record-cache/" + userId + "/" + currentMinute + "/" + currentCourseId + "/" + srlModel)
                break;
            }
        }
        // console.log(result);
        if (result !== null) {
            instantEvent = result.instantEvent;
            eventValue = result.eventValue; // 已经 + 过 1
            setTimeout(function () {
                // console.log("into settimeout 1 min");

                if (scaffoldInfo[eventValue - 1]["view_status"] === "not_view") {//表示该scaffold 还没有看 强制显示scaffold
                    scaffoldInfo[eventValue - 1]["view_status"] = "force_viewed";
                    if (!collapseScaffolds.classList.contains("in-tools")) {
                        //如果没打开，则强制点击打开
                        collapseScaffolds.classList.toggle("in-tools");
                        $("#scaffold-shadow-div").css("display", "block");
                    }

                    instantEvent = "FORCE_DISPLAY_SCAFFOLD";// + currentNavOrder;
                    showScaffoldsBtn.querySelector("span").classList.add("d-none");

                    // todo: 这里是强制显示新scaffold的位置，如果只是想展示新的scaffold，可以把这currentNavOrder改成-1
                    showCurrentScaffold( lastScaffoldOption, "force_viewed");

                    if (offcanvasRightNotesDiv.classList.contains("show")) {//如果annotation 侧边栏是打开的
                        $(showAnnotationSideBarBtn).click();
                        annotationClickTargetObject = "SCAFFOLD_FORCE_VIEW";
                        annotationPageEvent = "AUTO_CLOSE";
                        // moveTogetherWithSidebarClose();
                    }
                    // sendMyTraceDataPost("/trace-scaffold", getCurrentTimestamp(), "SCAFFOLD", "NO_PAGE_EVENT", "NO_TARGET_OBJECT", instantEvent, "SCAFFOLD_NUM:::" + eventValue, null);
                    sendEventMessage("", getCurrentTimestamp(), "SCAFFOLD", "NO_PAGE_EVENT", subActionLabelMap["SCAFFOLD_" + instantEvent], "SCAFFOLD", "NO_TARGET_OBJECT", instantEvent, "SCAFFOLD_NUM:::" + eventValue, null);
                }
            }, 60000);

            // console.log("write after setTimeout 1 min after scaffold triggered");
            // sendMyTraceDataPost("/trace-scaffold", getCurrentTimestamp(), "SCAFFOLD", "NO_PAGE_EVENT", "NO_TARGET_OBJECT", instantEvent, "SCAFFOLD_NUM:::" + eventValue, null);
            sendEventMessage("", getCurrentTimestamp(), "SCAFFOLD", "NO_PAGE_EVENT", subActionLabelMap["SCAFFOLD_" + instantEvent], "SCAFFOLD", "NO_TARGET_OBJECT", instantEvent, "SCAFFOLD_NUM:::" + eventValue, null);
            processScaffoldInfo();
        }
    });
}

// let scaffoldToolUseLength = 0;
if (useScaffoldTool && (getLastname() === "dev" || getLastname() === "ge" || getLastname() === "pl")) {
    // 这个是S1,2,3...被点击的时候的eventListener
    showScaffoldsBtn.onclick = function (e) {
        blueLog("----------------------------------------show scaffold Btn clicked");
        stopEventPropagation(e);
        if (useAnnotationTool) hideAnnotationToolbox(); // 隐藏annotation toolbox，当点击其他按钮时候

        if (!showScaffoldsBtn.querySelector("span").classList.contains("d-none")) { //表示alert message 已经展示出去了
            // console.log("-----------------------alert message 已经展示, 点击alert message");
            showScaffoldsBtn.querySelector("span").classList.add("d-none"); //按钮点击后，隐藏alert 信息部分
            // let tempViewedStatus = localStorage.getItem(userId + "myScaffoldViewedStatus");
            // console.log(tempViewedStatus);
            // if (tempViewedStatus != null) {
            //     let scaffoldViewedStatus = tempViewedStatus.split(";;;");
            //     for (let i = 0; i < scaffoldViewedStatus.length; i++) {
            //         if (scaffoldViewedStatus[i] === "_") {
            //             scaffoldViewedStatus[i] = "click_viewed";
            //             localStorage.setItem(userId + "myScaffoldViewedStatus", scaffoldViewedStatus.join(";;;"));
            //             console.log(scaffoldViewedStatus);
            //             showSuggestionPanel(i);
            //             break;
            //         }
            //     }
            // }
        }
        //超过最后一个scaffolding 触发时间之后，此方法便无法再更改显示顺序
        // showCurrentScaffold( -1, "click_viewed");
        showCurrentScaffold( -1, "click_viewed");

        collapseScaffolds.classList.toggle("in-tools");
        toolsAndEssayToggle(collapseScaffolds);

        scaffoldClickTargetObject = "SHOW_SCAFFOLD_BTN";
        scaffoldPageEvent = "MOUSE_CLICK";

        sendEventMessage("", getCurrentTimestamp(), "SCAFFOLD", scaffoldPageEvent, subActionLabelMap["SCAFFOLD_CLICK"], "SCAFFOLD", scaffoldClickTargetObject, "SHOW_SCAFFOLD_BTN_CLICK", "", null);
        // if (collapseScaffolds.classList.contains("in-tools")) {
        //     hideOtherTools(collapseScaffolds);
        // }

        // let instantEvent = "";
        // let eventValue = "";
        // let saveTime = getCurrentTimestamp();
        // if (collapseScaffolds.classList.contains("in-tools")) {
        //     instantEvent = "OPEN";
        //     eventValue = "START_USE_TOOL:::" + saveTime;
        //
        // } else {
        //     instantEvent = "CLOSE";
        //     scaffoldToolUseLength = saveTime - scaffoldToolUseLength;
        //     eventValue = "TOOL_USE_LENGTH:::" + scaffoldToolUseLength;
        //     $("#scaffold-shadow-div").css("display", "none");
        // }
        //
        // sendMyTraceDataPost("/trace-scaffold", saveTime, "SCAFFOLD", "MOUSE_CLICK", "SHOW_SCAFFOLD_BTN", instantEvent, eventValue, e);
    };

    closeScaffoldsBtn.onclick = function (e) {
        // console.log("close scaffold btn clicked");
        stopEventPropagation(e);
        collapseScaffolds.classList.toggle("in-tools");
        toolsAndEssayToggle(collapseScaffolds);
        scaffoldClickTargetObject = "CLOSE_SCAFFOLD_BTN";
        scaffoldPageEvent = "MOUSE_CLICK";

        // let instantEvent = "CLOSE";
        // let eventValue = "";
        // let saveTime = getCurrentTimestamp();
        // scaffoldToolUseLength = saveTime - scaffoldToolUseLength;
        // eventValue = "TOOL_USE_LENGTH:::" + scaffoldToolUseLength;
        // $("#scaffold-shadow-div").css("display", "none");
        // sendMyTraceDataPost("/trace-scaffold", saveTime, "SCAFFOLD", "MOUSE_CLICK", "CLOSE_SCAFFOLD_BTN", instantEvent, eventValue, e);
    };

// 创建一个回调函数来处理观察到的变化

    function myCallbackScaffold(contains, element) {
        let saveTime;

        let eventValue;
        if (contains) {
            // console.log('Element with id:', element.id, 'has the "in-tools" class!');
            saveTime = getCurrentTimestamp();
            scaffoldInstantEvent = "OPEN";
            eventValue = "START_USE_TOOL:::" + saveTime;
            scaffoldToolStartUseTime = saveTime;
            // console.log('scaffoldToolStartUseTime:' + scaffoldToolStartUseTime);
            // sendMyTraceDataPost("/trace-scaffold", saveTime, "SCAFFOLD", scaffoldPageEvent, scaffoldClickTargetObject, scaffoldInstantEvent, eventValue, null);
            sendEventMessage("", saveTime, "SCAFFOLD", scaffoldPageEvent, subActionLabelMap["SCAFFOLD_" + scaffoldInstantEvent], "SCAFFOLD", scaffoldClickTargetObject, scaffoldInstantEvent, eventValue, null);

        } else {
            if (scaffoldInstantEvent !== "CLOSE") {
                // console.log('Element with id:', element.id, 'has not the "in-tools" class!');
                saveTime = getCurrentTimestamp();
                scaffoldInstantEvent = "CLOSE";
                if (scaffoldToolStartUseTime === 0) {
                    eventValue = "TOOL_USE_LENGTH:::ERROR-" + (saveTime - scaffoldToolStartUseTime);
                } else {
                    eventValue = "TOOL_USE_LENGTH:::" + (saveTime - scaffoldToolStartUseTime);
                }
                // console.log('tool use length:' + (saveTime - scaffoldToolStartUseTime));

                $("#scaffold-shadow-div").css("display", "none");
                // sendMyTraceDataPost("/trace-scaffold", saveTime, "SCAFFOLD", scaffoldPageEvent, scaffoldClickTargetObject, scaffoldInstantEvent, eventValue, null);
                sendEventMessage("", saveTime, "SCAFFOLD", scaffoldPageEvent, subActionLabelMap["SCAFFOLD_" + scaffoldInstantEvent], "SCAFFOLD", scaffoldClickTargetObject, scaffoldInstantEvent, eventValue, null);
            } else {
                // console.log('Element with id:', element.id, 'is keep closed');
            }
        }
        scaffoldClickTargetObject = "NO_TARGET_OBJECT";
        scaffoldPageEvent = "NO_PAGE_EVENT";
    }
    handleClassMutation(collapseScaffolds, myCallbackScaffold); //监听


}
// else {
//     showScaffoldsBtn.classList.add("d-none");
// }
