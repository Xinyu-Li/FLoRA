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
let taskStartTimestamp = 0;
let myTimerAjax = null;


//-------------------------------timer end---------------------------------------------

function endTask(eventValue) {

    // sendMyTraceDataPost("/trace-timer", getCurrentTimestamp(), "TIMER", "NO_PAGE_EVENT", "NO_TARGET_OBJECT", "ESSAY_TASK_END", eventValue, null);
    sendEventMessage("", getCurrentTimestamp(), "TIMER", "NO_PAGE_EVENT", subActionLabelMap["TIMER_ESSAY_TASK_END"], "END", "NO_TARGET_OBJECT", "ESSAY_TASK_END", eventValue, null);

    //控制阴影出现
    let myTaskFinishModal = document.getElementById("myTaskFinishModal");
    if (myTaskFinishModal !== null) {
        // if (!hideModalAfterTimeup) {
        myTaskFinishModal.style.display = "block";
        // 当cl组 在 main task 时候， useChecklistTool 是 false, 此处执行
        // 当cl组 在 revision task 时候， useChecklistTool 是 true, 此处不执行
        /*if (getLastname().toLowerCase() === 'cl' && !useChecklistTool) {
            //当任务结束时候，立刻请求后端处理学生文章，并将结果记录到数据库
            $.post(apiBaseUrl + "/rule-base-check-grammar", {
                essay: "",
                userId: userId,
                courseId: currentCourseId
            });
            $.post(apiBaseUrl + "/rule-base-writing-checklist", {
                essay: "",
                userId: userId,
                courseId: currentCourseId
            });
            $.post(apiBaseUrl + "/rule-base-originality", {
                essay: "",
                userId: userId,
                courseId: currentCourseId
            });
            $.post(apiBaseUrl + "/rule-base-integration-and-elaboration", {
                essay: "",
                userId: userId,
                courseId: currentCourseId
            });
        }*/
        // }
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
                if (result.data !== null && result.data !== 0 && result.data !== "") {
                   taskStartTimestamp = Number(result.data); // original code commented for testing

                    let usedTime = getCurrentTimestamp() - taskStartTimestamp;
                    totalSeconds -= Math.ceil(usedTime / 1000);

                    // console.log("!!!!!!!!!!totalSeconds Left:" + totalSeconds);
                    // console.log("userdTime:" + usedTime);
                    // console.log("totalSeconds:" + totalSeconds);
                    if (totalSeconds < 1) { //剩余时间已经没有
                        totalSeconds = 0;
                        if (!unlimitedTime) {
                            endTask("WHEN_ENTER_PAGE_TIME_ALREADY_0");
                        }
                    }
                } else {
                    taskStartTimestamp = getCurrentTimestamp(); // 页面时间
                    console.log("no result from get-task-start-time, taskStartTimestamp: ",taskStartTimestamp)
                    // localStorage.setItem(userId + "ESSAY_TASK_START", taskStartTimestamp);
                    // sendMyTraceDataPost("/trace-timer", taskStartTimestamp + "", "TIMER", "NO_PAGE_EVENT", "NO_TARGET_OBJECT", "ESSAY_TASK_START", "", null);
                    sendEventMessage("", taskStartTimestamp + "", "TIMER", "NO_PAGE_EVENT", subActionLabelMap["TIMER_ESSAY_TASK_START"], "START", "NO_TARGET_OBJECT", "ESSAY_TASK_START", "", null);
                }
                startClock(totalSeconds);
                //CountUp(totalSeconds,taskStartTimestamp)
            }
        });
    } catch (exception) { //如果网络异常，并且localStorage 里面找不到ESSAY_TASK_START, 则reload
        window.location.reload();
    }

    // if (localStorage.getItem(userId + "ESSAY_TASK_START") == null) { //还未开始过, 设置task 开始时间  //TODO 重新想一个timer 逻辑， 在setup timer 时候直接准备找到截至时间
    //     try {
    //
    //         myTimerAjax = $.ajax({
    //             url: apiBaseUrl + "/get-task-start-time",
    //             data: {userId: userId, pageUrl: window.location.href.replace(/#.*/, "")},
    //             type: "POST",
    //             async: false,
    //             success: function (result) { //1673591891100
    //                 console.log(result);
    //
    //                 let totalSeconds = totalMinutes * 60;
    //                 if (result.data !== null && result.data !== 0 && result.data !== "") {
    //                     taskStartTimestamp = Number(result.data);
    //                     localStorage.setItem(userId + "ESSAY_TASK_START", taskStartTimestamp);
    //                     let usedTime = getCurrentTimestamp() - taskStartTimestamp;
    //                     totalSeconds -= Math.ceil(usedTime/1000);
    //                     if (totalSeconds < 1) { //剩余时间已经没有
    //                         totalSeconds = 0;
    //                         endTask("WHEN_ENTER_PAGE_TIME_ALREADY_0");
    //                     }
    //                 } else {
    //                     taskStartTimestamp = getCurrentTimestamp();
    //                     localStorage.setItem(userId + "ESSAY_TASK_START", taskStartTimestamp);
    //                     sendMyTraceDataPost("/trace-timer", taskStartTimestamp + "", "TIMER", "NO_PAGE_EVENT", "NO_TARGET_OBJECT", "ESSAY_TASK_START", "", null);
    //                 }
    //                 startClock(totalSeconds);
    //             }
    //         });
    //     } catch (exception) { //如果网络异常，并且localStorage 里面找不到ESSAY_TASK_START, 则reload
    //         window.location.reload();
    //     }
    // } else { //如果已经开始过，但是关闭了页面，再次回来之后可以继续时间
    //     taskStartTimestamp = localStorage.getItem(userId + "ESSAY_TASK_START");
    //     let usedTime = getCurrentTimestamp() - taskStartTimestamp;
    //     let totalSeconds = totalMinutes * 60;
    //
    //     console.log("current time:" + getCurrentTimestamp());
    //     console.log("taskStartTimestamp:" + taskStartTimestamp);
    //     if (usedTime > 0) {
    //         totalSeconds -= Math.ceil(usedTime/1000);
    //         console.log("used time:" + Math.ceil(usedTime/1000));
    //         if (totalSeconds < 1) { //剩余时间已经没有
    //             totalSeconds = 0;
    //             endTask("WHEN_ENTER_PAGE_TIME_ALREADY_0");
    //         }
    //         startClock(totalSeconds);
    //     }
    // }
}

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
