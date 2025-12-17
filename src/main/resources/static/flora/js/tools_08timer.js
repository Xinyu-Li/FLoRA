function render() {
    let timerToolHtml = `    <!-- Timer 侧边栏 -->
        <div class="my-horizontal-collapse-tools timer" id="collapseTimer" >
            <div class="card card-body" style="">
                <div id="flipdown" class="flipdown"></div>
                <div class="clock-message"></div>
            </div>
        </div>`;
    $("body").append(timerToolHtml);
}
render();

let collapseTimer = document.querySelector("#collapseTimer");
let showTimerBtn = document.querySelector("#showTimerBtn");
//-------------------------------timer tool---------------------------------------------
// let taskStartTimestamp = 0;
let myTimerAjax = null;


// 通过surname 来决定是哪个分组 

// task1 结束，调用 modal，修改task start time，
// let multipleTaskTimer = true;



// 在原本的course id 后面加上标识 比如task1， 需要删除redis 中原本的 task start time


// 第二次修改 totalMinutes

// task2 结束，调用 modal


//------------------------------- NHB study timer end---------------------------------------------

function endTask(eventValue) {

    // sendMyTraceDataPost("/trace-timer", getCurrentTimestamp(), "TIMER", "NO_PAGE_EVENT", "NO_TARGET_OBJECT", "ESSAY_TASK_END", eventValue, null);

//-------------------------------specially for NHB study
//     console.log("isDualTask:", isDualTask);
//     console.log("STORAGE_KEYS.finishFirstTask:", localStorage.getItem(STORAGE_KEYS.finishFirstTask));
    if (typeof isDualTask !== 'undefined' && localStorage.getItem(STORAGE_KEYS.finishFirstTask) === '0') {
        // 先 block 中间 modal
        let myTaskSwitchTaskModal = document.getElementById("myTaskSwitchTaskModal");
        if (myTaskSwitchTaskModal !== null) {
            myTaskSwitchTaskModal.style.display = "block";
        }
        localStorage.setItem(STORAGE_KEYS.finishFirstTask, "1");

        sendEventMessage("", getCurrentTimestamp(), "TIMER", "TASK1_END", subActionLabelMap["TIMER_ESSAY_TASK_END"], "END", "NO_TARGET_OBJECT", "ESSAY_TASK_END", eventValue, null);
    } else {
//------------------------------- NHB study timer end---------------------------------------------
        //控制阴影出现
        sendEventMessage("", getCurrentTimestamp(), "TIMER", "NO_PAGE_EVENT", subActionLabelMap["TIMER_ESSAY_TASK_END"], "END", "NO_TARGET_OBJECT", "ESSAY_TASK_END", eventValue, null);
        let myTaskFinishModal = document.getElementById("myTaskFinishModal");
        if (myTaskFinishModal !== null) {
            // if (!hideModalAfterTimeup) {
            myTaskFinishModal.style.display = "block";
            if (typeof useConsultationSubmitTool !== 'undefined' && useConsultationSubmitTool) {
                submitConsultation();
            }
        } else {
            // console.log("!!!!!!!end task----------------cannot locate myTaskFinishModal");
        }

        if (eventWebsocket !== null) {
            eventWebsocket.close();
        }
        if (teacherChatWebsocket !== null) {
            sendTeacherChatMessage(senderId, "student session end, message cannot be received", receiverId, "sessionend");
            teacherChatWebsocket.close();
        }
    }
}

/*function CountUp(startTime,totalSeconds){
    function formatTime(hours, minutes, seconds) {
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    const flipdown = new FlipDown(startTime, /!* 容器ID *!/ 'flipdown', {
            // 配置选项（可选）
            theme: 'dark' // 主题：'light' 或 'dark'，默认为 'light'
        });
    setInterval(() => {
        const now = new Date();
        const elapsedTime = now.getTime() - startTime;
        const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
        const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
        // Update Flipdown text with formatted time
        flipdown.setFace(formatTime(hours, minutes, seconds));
        if (!unlimitedTime) {
            endTask("WHEN_READING_PAGE_TIME_REACH_LIMIT");
            if (elapsedTime >= totalSeconds-hintMinutesBeforeEnd * 60* 1000) {
                                // alert('剩余时间少于10分钟!');
                                updateMyGeneralToastText("Flora", "The task will end in " + hintMinutesBeforeEnd + " minutes!!!");
                                myGeneralToast.show();
                            }
        }
    }, 1000);
//        if (!unlimitedTime) {
//            if (elapsedTime == totalSeconds){
//                endTask("WHEN_READING_PAGE_TIME_REACH_LIMIT");
//            }
//        }
//        if (!unlimitedTime) {
//            setInterval(function () {
//                // console.log("total seconds:" + totalSeconds + "-----hint minutes:" + hintMinutesBeforeEnd);
//                if (elapsedTime >= totalSeconds-hintMinutesBeforeEnd * 60* 1000) {
//                    // alert('剩余时间少于10分钟!');
//                    updateMyGeneralToastText("Flora", "The task will end in " + hintMinutesBeforeEnd + " minutes!!!");
//                    myGeneralToast.show();
//                }
//            }, 60000);
//            }

      flipdown.start();
}*/



function startClock(totalSeconds) {
    // console.log("isCountdown: ", isCountdown);
    let flipclock;
    if (typeof isCountdown === 'undefined' || isCountdown) {
        flipclock = new FlipDown(/* 结束时间戳 */Math.floor(Date.now() / 1000) + totalSeconds, /* 容器ID */ 'flipdown', {
            // 配置选项（可选）
            theme: 'dark' // 主题：'light' 或 'dark'，默认为 'light'
        });
    } else {
        unlimitedTime = true; // 时间是增长模式，所以设置为无上限
        flipclock = new FlipDown(/* 起始时间戳 */Math.floor(Date.now()/1000), 0, /* 容器ID */ 'flipdown', {
            // 配置选项（可选）
            theme: 'dark' // 主题：'light' 或 'dark'，默认为 'light'
        });
    }
    // const flipdown = new FlipDown(/* 结束时间戳 */Math.floor(Date.now() / 1000) + totalSeconds, /* 容器ID */ 'flipdown', {
    //     // 配置选项（可选）
    //     theme: 'dark' // 主题：'light' 或 'dark'，默认为 'light'
    // });
    // const flipdown = new FlipDown(/* 结束时间戳 */Math.floor(Date.now()/1000), 0, /* 容器ID */ 'flipdown', {
    //         // 配置选项（可选）
    //         theme: 'dark' // 主题：'light' 或 'dark'，默认为 'light'
    //     });


    flipclock.ifEnded(function() {
       if (!unlimitedTime) {
           endTask("WHEN_READING_PAGE_TIME_REACH_0");
       }
       // console.log("task end");
   });

    // console.log("start clock " + totalSeconds);
    if (!unlimitedTime) {
        setInterval(function () {
            // console.log("total seconds:" + totalSeconds + "-----hint minutes:" + hintMinutesBeforeEnd);
            if (totalSeconds <= hintMinutesBeforeEnd * 60) {
                // alert('剩余时间少于10分钟!');
                updateMyGeneralToastText("Flora", "The task will end in " + hintMinutesBeforeEnd + " minutes!!!");
                myGeneralToast.show();
            }
        }, 60000);
    }

    flipclock.start();

}

// function startClock(totalSeconds) {
//     let clock = $('.clock').FlipClock({
//         clockFace: 'MinuteCounter', //MinuteCounter   HourCounter
//         autoStart: false,
//         // countdown: true,
//         callbacks: {
//             stop: function() {
//                 $('.clock-message').html('Time is up!');
//                 endTask("TIMER_COUNT_DOWN_TO_0");
//             }
//         }
//     });
//     console.log("----------------------total seconds:" + totalSeconds);
//     // clock.setTime((totalMinutes - 1) * 60 + 59);  //设置timer 时间
//     clock.setTime(totalSeconds - 1);
//     clock.setCountdown(true);
//     clock.start();
// }

function setupTimer() { // 需要设置本地 timer 来避免因网络引起的timer 问题
    //每次页面打开都要检查时间是否正确
    // console.log("setupTimer........" + localStorage.getItem(userId + "ESSAY_TASK_START") + ".......");
    // console.log("setupTimer........" + window.location.href);
    // let currentUrl = getCurrentUrl();
    // console.log("setupTimer........" + currentUrl);
    try {
        myTimerAjax = $.ajax({
            url: apiBaseUrl + "/get-task-start-time",
            data: {userId: userId, courseId: currentCourseId},
            type: "POST",
            async: false,
            success: function (result) { //1673591891100
                console.log("get-task-start-time---------------==================", result);

                let totalSeconds = totalMinutes * 60;
                let tempTaskStartTimestamp;

                if (result.data !== null && result.data !== 0 && result.data !== "") {
                    tempTaskStartTimestamp = Number(result.data); // original code commented for testing
                    localStorage.setItem(`${userId}-${currentCourseId}-taskStartTimestamp`, "" + tempTaskStartTimestamp);
                    let usedTime = getCurrentTimestamp() - tempTaskStartTimestamp;
                    totalSeconds -= Math.ceil(usedTime / 1000);

                    console.log("!!!!!!!!!!totalSeconds Left:" + totalSeconds);
                    // console.log("userdTime:" + usedTime);
                    // console.log("totalSeconds:" + totalSeconds);
                    if (totalSeconds < 1) { //剩余时间已经没有
                        totalSeconds = 0;
                        if (!unlimitedTime) {
                            endTask("WHEN_ENTER_PAGE_TIME_ALREADY_0");
                        }
                    }
                } else {
                    tempTaskStartTimestamp = getCurrentTimestamp(); // 页面时间
                    localStorage.setItem(`${userId}-${currentCourseId}-taskStartTimestamp`, "" + tempTaskStartTimestamp);
                    console.log("no result from get-task-start-time, taskStartTimestamp: ",tempTaskStartTimestamp)

                    sendEventMessage("", tempTaskStartTimestamp + "", "TIMER", "NO_PAGE_EVENT", subActionLabelMap["TIMER_ESSAY_TASK_START"], "START", "NO_TARGET_OBJECT", "ESSAY_TASK_START", "", null);
                }

                scheduleToolsDisplay();

                startClock(totalSeconds);
            }
        });
    } catch (exception) { //如果网络异常，并且localStorage 里面找不到ESSAY_TASK_START, 则reload
        window.location.reload();
    }
}





/**
 * @param toolName ""
 * @param hideOrShow false-"hide" true-"show"
 * @param showAnimation
 */
function hideOrShowToolBtn(toolName, hideOrShow, showAnimation) {
    const btnMap = {
        annotation: "showAnnotationSideBarBtn",
        annotationSearch: "showSearchAnnotationsBtn",
        scaffolds: "showScaffoldsBtn",
        gptScaffolds: "show-gpt-scaffolds-btn",
        essayWriting: "showWriteEssayBtn",
        essayProductVisual: "show-essay-product-visual-tool-btn",
        zoteroNotes: "showZoteroNotesBtn",
        processVisual: "showProcessVisualToolBtn",
        consultationSubmit: "show-consultation-btn",
        collaborateWriting: "showCollaborateWriteBtn",
        mathEditor: "showMathEditorBtn",
        planner: "showPlanner2Btn",
        checklist: "show-checklist-btn",
        chatgpt: "show-chatgpt-btn",
        multiAgentsSingleWindow: "show-multi-agents-btn",
        medicalScaffoldMultiAgentsSingleWindowToolBtn: "medical-scaffold-show-multi-agents-btn",
        dictionary: "show-dictionary-btn",
        teacherChat: "show-teacherchat-btn",
        timer: "showTimerBtn",
        popupQuestionnaire: "show-popup-questionnaires-btn",
        chatWithScaffold: "show-gpt-chat-with-scaffolds-btn"
    };
    const btnId = btnMap[toolName];
    if (!btnId) {
        console.error(`未定义名称为“${toolName}”的按钮`);
        return;
    }
    const btn = document.getElementById(btnId);
    if (!btn) {
        console.error(`无法找到id为“${btnId}”的按钮`);
        return;
    }


    btn.style.display = hideOrShow ? "inline-block" : "none";
    if (showAnimation && hideOrShow) {
        btn.classList.add("animate-instrumentation-tools-btn");
        btn.classList.add("shrinking");
    }
}

function scheduleToolsDisplay() {

    let tempTaskStartTimestamp = parseInt(localStorage.getItem(`${userId}-${currentCourseId}-taskStartTimestamp`)) || 0;

    if (typeof toolsDisplayTime === 'undefined') {
        return;
    }
    // console.log("tempTaskStartTimestamp:", tempTaskStartTimestamp);
    //----------------set up tools display based on time
    Object.entries(toolsDisplayTime).forEach(([toolName, [startSec, endSec]]) => {

        if (localStorage.getItem(`${userId}-${currentCourseId}-manual-show-${toolName}-tool`) !== null) {
            //标识该工具已经被手动打开过了
            return;
        }

        let showTimestamp = tempTaskStartTimestamp + (startSec * 1000);
        let hideTimestamp = tempTaskStartTimestamp + (endSec * 1000);

        // 设置显示按钮的定时器
        let showDelay = showTimestamp - getCurrentTimestamp();
        console.log(`showTimestamp: ${showTimestamp} -----hideTimestamp: ${hideTimestamp}------"showDelay:" ${showDelay}`);
        if(showDelay >= 1000) { //大于1秒
            hideOrShowToolBtn(toolName, false, false); //// 工具默认是加载展示， 所以先保持隐藏
            setTimeout(() => {
                hideOrShowToolBtn(toolName, true, true);
                console.log(`已显示 "${toolName}" 按钮（${startSec}秒）`);
            }, showDelay);
        } else {
            // 如果当前已经超过了显示时间，则立刻显示
            hideOrShowToolBtn(toolName, true, false);
            console.log(`立即显示 "${toolName}" 按钮（已过显示时间）`);
        }

        if (endSec !== -1) {
            // 工具默认是加载展示，所以不用保持展示
            // 设置隐藏按钮的定时器
            let hideDelay = hideTimestamp - getCurrentTimestamp();
            if(hideDelay >= 0){
                setTimeout(() => {
                    hideOrShowToolBtn(toolName, false, true);
                    console.log(`已隐藏 "${toolName}" 按钮（${endSec}秒）`);
                }, hideDelay);
            } else {
                // 若当前已经超过了隐藏时间，则立刻隐藏
                hideOrShowToolBtn(toolName, false, false);
                console.log(`立即隐藏 "${toolName}" 按钮（已过隐藏时间）`);
            }
        } else {
            // 若endSec是-1，则永远不进行隐藏操作
            console.log(`"${toolName}" 按钮设定为永久显示（不自动隐藏）`);
        }
    });
}

showTimerBtn.addEventListener("mousedown", function (e) {e.stopPropagation();});
showTimerBtn.onclick = function (e) {
    // console.log("showTimerBtn clicked");
    stopEventPropagation(e);
    if (useAnnotationTool) hideAnnotationToolbox(); // 隐藏annotation toolbox，当点击其他按钮时候
    
    collapseTimer.classList.add("in-tools");

    // sendMyTraceDataPost("/trace-timer", getCurrentTimestamp(), "TIMER", "MOUSE_CLICK", "SHOW_TIMER_BTN", "OPEN", "", e);
    sendEventMessage("", getCurrentTimestamp(), "TIMER", "MOUSE_CLICK", subActionLabelMap["TIMER_OPEN"], "TIMER", "SHOW_TIMER_BTN", "OPEN", "", e);

    setTimeout(function () {
        collapseTimer.classList.remove("in-tools");

        // sendMyTraceDataPost("/trace-timer", getCurrentTimestamp(), "TIMER", "NO_PAGE_EVENT", "NO_TARGET_OBJECT", "CLOSE", "", null);
    }, 2000);
};
