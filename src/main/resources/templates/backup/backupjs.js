// //planner event ---------------------------------------------------
//
//
//
//
//
// '    <!-- Planner 侧边栏 -->' +
// '    <div class="my-horizontal-collapse-tools planner" id="collapsePlanner" >' +
// '        <div class="card card-body" >' +
// '            <table class="" style="margin-left:20px; margin-right: 20px; width:900px;">' +
// '                <tbody>';
// let tempTr1Str = "<tr style=\"margin-top:15px;width: 100%; z-index:99;\">";
//
// for (let i = 0; i < (totalMinutes); i++) {
//     tempTr1Str += '<td class="timecolumn"><div class="tick bottom-right"></div></td>';
// }
// tempTr1Str += '<td class="timecolumn" style=""><div class="tick bottom-right"></div></td></tr>';
//
// let tempTr2Str = '<tr style="margin-top:15px; height: 100px; width: 100%; z-index: 100;">';
// for (let i = 0; i < (totalMinutes); i++) {
//     tempTr2Str += '<td class="dropzone-column drop-destination" data-starttimer="' + i + '" style="width: 15px;"></td>';
// }
// tempTr2Str += '<td class="dropzone-column" style="" data-starttimer="' + (totalMinutes) + '"></td></tr>';
//
// let tempTr3Str = '<tr class="" style="width: 100%; z-index: 99;">';
// for (let i = 0; i < (totalMinutes); i++) {
//     tempTr3Str += '<td class="timecolumn"><div class="tick bottom-right"></div></td>';
// }
// tempTr3Str += '<td class="timecolumn" style=""><div class="tick bottom-right"></div></td></tr>';
//
// let tempTr4Str = '<tr style="width: 100%; z-index: 99;">';
// for (let i = 0; i < (totalMinutes); i++) {
//     tempTr4Str += '<td class="timecolumn">' + (i % 5 === 0 ? i : "") + '</td>';
// }
// tempTr4Str += '<td class="timecolumn" style="">' + totalMinutes + '</td></tr>';
//
// toolsStr += tempTr1Str
// toolsStr += tempTr2Str
// toolsStr += tempTr3Str
// toolsStr += tempTr4Str
//
// toolsStr += '                <tr style="width:100%; height: 100px; margin-top: 30px; margin-bottom: 15px; z-index:100;">' +
//     '                    <td class="dropzone-column drop-source" style="width: 150px;" colspan="7" data-sourceorder="1"></td>' +
//     '                    <td class="dropzone-column drop-source" style="width: 150px;" colspan="7" data-sourceorder="2"></td>' +
//     '                    <td class="dropzone-column drop-source" style="width: 150px;" colspan="7" data-sourceorder="3"></td>' +
//     '                    <td class="dropzone-column drop-source" style="width: 150px;" colspan="7" data-sourceorder="4"></td>' +
//     '                    <td class="dropzone-column drop-source" style="width: 150px;" colspan="7" data-sourceorder="5"></td>' +
//     '                    <td class="dropzone-column drop-source" style="width: 150px;" colspan="10" data-sourceorder="cus1"></td>' +
//     '                    <td class="dropzone-column" colspan="1" style=""></td>' +
//     '                </tr>' +
//     '                </tbody>' +
//     '            </table>' +
//     '        </div>' +
//     '    </div>' +
//
//
//
//
// function setupPlanner(userId) {
//     let plannerChangeStatus = false;
//     let dropzone_destination_width = $("#collapsePlanner").children().children().children().children()[1].children[0].clientWidth;  //每1分钟的宽度
//     console.log("dropzone_destination_width:" + dropzone_destination_width);
//     // $(".my-resize").width(dropzone_destination_width); // 动态可修改 - border width
//
//     if (typeof jQuery == 'undefined') {
//         // jQuery 未加载
//         console.log("jQuery 未加载 in planner");
//     } else {
//         // jQuery 已加载
//         console.log("jQuery 已加载 in planner");
//     }
//
//
//     $(".drop-destination").sortable({
//         cursor: "move",
//         connectWith: "td",
//         // connectWith: "div",
//         // appendTo: ".demo",
//         // helper:"clone",
//         placeholder: "ui-state-highlight",
//         receive: function(event, ui) {
//             let duration = ui.item[0].dataset.duration;
//             if (duration == null) {
//                 duration = 1;
//             }
//             ui.item[0].style.width=(dropzone_destination_width * parseInt(duration)) + "px";
//             console.log("dest-receive-------------");
//             plannerChangeStatus = true;
//         }
//     }).disableSelection();
//
//     $(".drop-source").sortable({
//
//         cursor: "move",
//         connectWith: "td",
//         // connectWith: "div",
//         // appendTo: ".demo",
//         // helper:"clone",
//         placeholder: "ui-state-highlight",
//         receive: function(event, ui) {
//             ui.item[0].style.width="50%";
//             ui.item[0].dataset.duration = 6; // 默认是6
//             console.log("source-receive-------------");
//             plannerChangeStatus = true;
//         }
//     }).disableSelection();
//
//     console.log("my resize");
//
//     $(".my-resize").resizable({
//         minWidth: dropzone_destination_width,
//         grid: [dropzone_destination_width + 2, 0],  // x 和 y 方向的 变化
//         handles: 'e', // e w n s 东西南北
//         create: function(event, ui) {
//             console.log("resize create");
//         },
//         resize: function (event, ui) {
//             ui.element[0].dataset.duration = Math.ceil(ui.element[0].clientWidth / dropzone_destination_width);
//             plannerChangeStatus = true;
//         }
//     });
//
//     // Save periodically
//     setInterval(function() {
//         console.log("plannerChangeStatus: " + plannerChangeStatus);
//         if (plannerChangeStatus) {
//             let allResizeElements = $("#collapsePlanner").find(".my-resize");
//
//             let plannerElements = [];
//             for (let i = 0; i < allResizeElements.length; i++) {
//                 let duration = allResizeElements[i].dataset.duration;
//                 let taskorder = allResizeElements[i].dataset.taskorder;
//                 let width = allResizeElements[i].style.width;
//                 let taskName = allResizeElements[i].innerText;
//                 let customiseTaskValue = "";
//                 if (taskorder === "cus1") {
//                     customiseTaskValue = allResizeElements.children().children("input.customiseTask")[0].value;
//                 }
//
//                 let sourceorder = allResizeElements[i].parentNode.dataset.sourceorder;
//                 let starttimer = allResizeElements[i].parentNode.dataset.starttimer;
//
//
//                 // if (taskorder === "cus1") {
//                 plannerElements.push({taskorder: taskorder, duration: duration, width: width, sourceorder: sourceorder == null?"":sourceorder, starttimer: starttimer==null?"":starttimer, customiseTaskValue: customiseTaskValue, taskName: taskName==null?"":taskName});
//                 // } else {
//                 //     plannerElements.push({taskorder: taskorder, duration: duration, width: width, sourceorder: sourceorder == null?"":sourceorder, starttimer: starttimer==null?"":starttimer, customiseTaskValue: ""});
//                 // }
//             }
//             let savePlannerTimestamp = getCurrentTimestamp();
//             console.log(plannerElements);
//             console.log(JSON.stringify(plannerElements));
//             localStorage.setItem("myPlannerElements", JSON.stringify(plannerElements));
//
//             let username = localStorage.getItem("myUsername") == null ? 0 : localStorage.getItem("myUsername");
//             $.post(apiBaseUrl + 'save-planner-content', {
//                 userId: userId,
//                 saveTime: savePlannerTimestamp,
//                 username: username,
//                 url: window.location.href.replace(/#.*/, ""),
//                 plannerElementsJson: JSON.stringify(plannerElements),
//                 courseId: currentCourseId
//             }, function(data, status) {
//                 console.log(data);
//             });
//             sendMyTraceDataPost("/trace-planner", savePlannerTimestamp, "PLANNER", "NO_PAGE_EVENT", "NO_TARGET_OBJECT", "SAVE", "", null);
//         }
//         plannerChangeStatus = false;
//     }, 2*1000);
// }
//
//
// $("#showPlannerBtn").click(function (e) {
//
//     console.log("showPlannerBtn clicked");
//     stopEventPropagation(e);
//     collapsePlanner.toggleClass("in-tools");
//
//     let instantEvent = "";
//     let saveTime = getCurrentTimestamp();
//     if (collapsePlanner.hasClass("in-tools")) {
//         instantEvent = "OPEN";
//         plannerToolUseLength = saveTime;
//     } else {
//         instantEvent = "CLOSE";
//         plannerToolUseLength = saveTime - plannerToolUseLength;
//     }
//
//     sendMyTraceDataPost("/trace-planner", saveTime, "PLANNER", "MOUSE_CLICK", null, instantEvent, "TOOL_USE_LENGTH:::" + plannerToolUseLength, e);
// });
//
//
// function restorePlannerFromJson(plannerElementsJson) {
//     let collapsePlanner = $("#collapsePlanner");
//     if (plannerElementsJson != null && plannerElementsJson !== '[]') {
//         let plannerElements = JSON.parse(plannerElementsJson);
//         console.log(plannerElements);
//
//         for (let i = 0; i < plannerElements.length; i++) {
//             let taskorder = plannerElements[i].taskorder;
//             let duration = plannerElements[i].duration;
//             let width = plannerElements[i].width;
//             let sourceorder = plannerElements[i].sourceorder;
//             let starttimer = plannerElements[i].starttimer;
//             let customiseTaskValue = plannerElements[i].customiseTaskValue;
//             let taskName = plannerElements[i].taskName;
//
//             if (starttimer !== "") {
//                 let tempDestinationTd = collapsePlanner.find('[data-starttimer="' + starttimer + '"]');
//                 if (taskorder === "cus1") {
//                     tempDestinationTd.append('<div class="my-resize bg-warning" data-duration="' + duration + '" data-taskorder="cus1"  style="width:' + width + '">' +
//                         '                            <div style="width: 97%; height: 98%; float:left;cursor:move;" class="text-wrap overflow-auto"><input type="text" value="' + customiseTaskValue + '" class="customiseTask" placeholder="Customise Task" style="width: 95%;" /></div>' +
//                         // '                            <div style="width:2%; height: 100%; float:right; border-right:#0f1011 medium solid;"> </div>' +
//                         '                        </div>');
//                 } else {
//                     tempDestinationTd.append('<div class="my-resize bg-warning" data-duration="' + duration + '" data-taskorder="' + taskorder + '" style="width:' + width + '">' +
//                         '                            <div style="width: 97%; height: 98%; float:left;cursor:move;" class="text-wrap overflow-auto"><p style="padding:5px;">' + taskName + '</p></div>' +
//                         // '                            <div style="width:2%; height: 100%; float:right; border-right:#0f1011 medium solid;"> </div>' +
//                         '                        </div>');
//                 }
//             } else if (sourceorder !== "") {
//
//                 let tempSourceTd = collapsePlanner.find('[data-sourceorder="' + sourceorder + '"]');
//                 if (taskorder === "cus1") {
//                     tempSourceTd.append('<div class="my-resize bg-warning" data-duration="' + duration + '" data-taskorder="cus1"  style="width:' + width + '">' +
//                         '                            <div style="width: 97%; height: 98%; float:left;cursor:move;" class="text-wrap overflow-auto"><input type="text" value="' + customiseTaskValue + '" class="customiseTask" placeholder="Customise Task" style="width: 95%;" /></div>' +
//                         // '                            <div style="width:2%; height: 100%; float:right; border-right:#0f1011 medium solid;"> </div>' +
//                         '                        </div>');
//                 } else {
//                     tempSourceTd.append('<div class="my-resize bg-warning" data-duration="' + duration + '" data-taskorder="' + taskorder + '" style="width:' + width + '">' +
//                         '                            <div style="width: 97%; height: 98%; float:left;cursor:move;" class="text-wrap overflow-auto"><p style="padding:5px;">' + taskName + '</p></div>' +
//                         // '                            <div style="width:2%; height: 100%; float:right; border-right:#0f1011 medium solid;"> </div>' +
//                         '                        </div>');
//                 }
//             }
//         }
//     } else {
//         let defaultDuration = 6;
//         let defaultWidth = "50%";
//         console.log(defaultWidth);
//         let taskNameArray = ["Orientation", "Review AI", "Review scaffolding", "Review differentiatio", "Write essay"];
//         let defaultCustomiseSourceOrder = "cus1";
//
//         for (let i = 0; i < taskNameArray.length; i++) {
//             let tempSourceTd = collapsePlanner.find('[data-sourceorder="' + (i + 1) + '"]');
//             tempSourceTd.append('<div class="my-resize bg-warning" data-duration="' + defaultDuration + '" data-taskorder="' + (i + 1) + '" style="width:' + defaultWidth + '">' +
//                 '                            <div style="width: 97%; height: 98%; float:left;cursor:move;" class="text-wrap overflow-auto"><p style="padding:5px;">' + taskNameArray[i] + '</p></div>' +
//                 // '                            <div style="width:2%; height: 100%; float:right; border-right:#0f1011 medium solid;"> </div>' +
//                 '                        </div>');
//         }
//
//         let tempSourceTd = collapsePlanner.find('[data-sourceorder="' + defaultCustomiseSourceOrder + '"]');
//         tempSourceTd.append('<div class="my-resize bg-warning" data-duration="' + defaultDuration + '" data-taskorder="' + defaultCustomiseSourceOrder + '"  style="width:' + defaultWidth + '">' +
//             '                            <div style="width: 97%; height: 98%; float:left;cursor:move;" class="text-wrap overflow-auto"><input type="text" value="" class="customiseTask" placeholder="Customise Task" style="width: 95%;" /></div>' +
//             // '                            <div style="width:2%; height: 100%; float:right; border-right:#0f1011 medium solid;"> </div>' +
//             '                        </div>');
//
//     }
// }
//
//
//
// let plannerElementsJson = localStorage.getItem("myPlannerElements");
// let plannerAjax = null;
// if (plannerElementsJson === null || plannerElementsJson === '[]') { //如果本地不存在，则从服务器获取
//     console.log("---------------load page: no PlannerElements in localstorage");
//     plannerAjax = $.post(apiBaseUrl + "load-planner-to-sidebar", {
//         userId: userId,
//         url: window.location.href.replace(/#.*/, ""),
//     }, function (data, status) {
//         if (data.data != null) {
//             plannerElementsJson = data.data.plannerElementsJson;
//             localStorage.setItem("myPlannerElements", plannerElementsJson);//TODO 其他地方也要设置
//         } else {
//             console.log("************************no PlannerElements in server");
//         }
//     });
//     $.when(plannerAjax).done(function() {
//         console.log("--------------------------");
//         console.log(plannerElementsJson);
//         console.log("--------------------------");
//         restorePlannerFromJson(plannerElementsJson);
//     });
// } else {
//     console.log("---------------load page: PlannerElements in localstorage is not null");
//     console.log(plannerElementsJson);
//     restorePlannerFromJson(plannerElementsJson);
// }
//
// //------------------------------setup the planner ----------------------------------
// try {
//     setupPlanner(userId);
// } catch (e) {
//     console.log(e);
//     window.location.reload();
// }
//
//
// let allResizeElements = $("#collapsePlanner").find(".my-resize");
//
// let plannerElements = [];
// for (let i = 0; i < allResizeElements.length; i++) {
//     let duration = allResizeElements[i].dataset.duration;
//     let taskorder = allResizeElements[i].dataset.taskorder;
//     let width = allResizeElements[i].style.width;
//     let taskName = allResizeElements[i].innerText;
//     let customiseTaskValue = "";
//     if (taskorder === "cus1") {
//         customiseTaskValue = allResizeElements.children().children("input.customiseTask")[0].value;
//     }
//
//     let sourceorder = allResizeElements[i].parentNode.dataset.sourceorder;
//     let starttimer = allResizeElements[i].parentNode.dataset.starttimer;
//
//
//     // if (taskorder === "cus1") {
//     plannerElements.push({taskorder: taskorder, duration: duration, width: width, sourceorder: sourceorder == null?"":sourceorder, starttimer: starttimer==null?"":starttimer, customiseTaskValue: customiseTaskValue, taskName: taskName==null?"":taskName});
//     // } else {
//     //     plannerElements.push({taskorder: taskorder, duration: duration, width: width, sourceorder: sourceorder == null?"":sourceorder, starttimer: starttimer==null?"":starttimer, customiseTaskValue: ""});
//     // }
// }
// let savePlannerTimestamp = getCurrentTimestamp();
// console.log(plannerElements);
// console.log(JSON.stringify(plannerElements));
// localStorage.setItem("myPlannerElements", JSON.stringify(plannerElements));
// $.post(apiBaseUrl + 'save-planner-content', {
//     userId: userId,
//     saveTime: savePlannerTimestamp,
//     username: username,
//     url: window.location.href.replace(/#.*/, ""),
//     plannerElementsJson: JSON.stringify(plannerElements),
//     courseId: currentCourseId
// }, function(data, status) {
//     console.log(data);
// });
// sendMyTraceDataPost("/trace-planner", savePlannerTimestamp, "PLANNER", "NO_PAGE_EVENT", "NO_TARGET_OBJECT", "SAVE", "", null);
//
//
//
// //planner event end---------------------------------------------------
//
//
// $("#nav-grammar-check-tab").click(function(e) {
//     console.log("-------------------nav-grammar-check-tab");
// });
// $("#nav-writing-checklist-tab").click(function(e) {
//     console.log("-------------------nav-writing-checklist-tab");
// });
// $("#nav-writer-diet-tab").click(function(e) {
//     console.log("-------------------nav-writer-diet-tab");
// });
//
//
// $("#showWritingSuggestionBtn").click(function(e) {
//     console.log("----------------------------------------showWritingSuggestionBtn clicked");
//     stopEventPropagation(e);
//     collapseWritingSuggestion.toggleClass("in-tools");
//
//     if (collapseWriteEssay.hasClass("in-tools")) {
//         collapseWriteEssay.removeClass("in-tools").addClass("in-tools-move-left");
//     } else if (collapseWriteEssay.hasClass("in-tools-move-left")) {
//         if (!collapseSearch.hasClass("in-tools") && !collapseClassification.hasClass("in-tools")) {
//             collapseWriteEssay.removeClass("in-tools-move-left").addClass("in-tools");
//         }
//     }
//
//     let instantEvent = "";
//
//     let saveTime = getCurrentTimestamp();
//     if (collapseWritingSuggestion.hasClass("in-tools")) {
//         instantEvent = "OPEN";
//         writingSuggestionToolUseLength = saveTime;
//     } else {
//         instantEvent = "CLOSE";
//         writingSuggestionToolUseLength = saveTime - writingSuggestionToolUseLength;
//     }
//
//     //TODO 需要买高级plan 才可以使用
//     const grammarlyConfig = {
//         documentDialect: "british",
//         documentDomain: "academic",
//         autocomplete: "off",
//         collectUserFeedback: "false",
//         introText: "Hello from Lauren",
//         onPluginDisable: handlePluginDisable,
//         onPluginError: handlePluginError,
//         showToneDetector: true,
//         suggestions: { OxfordComma: true }
//     };
//
//     document
//         .querySelectorAll("grammarly-editor-plugin")
//         .forEach((grammarlyEditor) => {
//             grammarlyEditor.config = grammarlyConfig;
//             grammarlyEditor.addEventListener(
//                 "document-stats",
//                 handleDocumentStats
//             );
//             grammarlyEditor.addEventListener("session-stats", handleSessionStats);
//         });
//
//     function handlePluginDisable(reason) {
//         console.log("The plugin was disabled: " + reason);
//     }
//
//     function handlePluginError(error) {
//         console.log("The plugin had an error: ");
//         console.log(error);
//     }
//
//     function handleDocumentStats(event) {
//         const stats = event.detail;
//         console.log("Found some stats:");
//         console.log(stats);
//
//         document.getElementById("charsCount").innerText = stats.charsCount;
//         document.getElementById("wordsCount").innerText = stats.wordsCount;
//         document.getElementById("readabilityScore").innerText =
//             stats.readabilityScore;
//
//         document.getElementById("readingTime").innerText =
//             stats.readingTime.h +
//             " hour(s), " +
//             stats.readingTime.m +
//             " minute(s),  " +
//             stats.readingTime.s +
//             " seconds(s)";
//
//         document.getElementById("speakingTime").innerText =
//             stats.speakingTime.h +
//             " hour(s), " +
//             stats.speakingTime.m +
//             " minute(s),  " +
//             stats.speakingTime.s +
//             " seconds(s)";
//     }
//     function handleSessionStats(event) {
//         const sessionStats = event.detail;
//         console.log("found some session stats", sessionStats);
//         document.getElementById("sessionDuration").innerText =
//             sessionStats.duration + " seconds";
//         document.getElementById("sessionWordsChecked").innerText =
//             sessionStats.wordsChecked;
//         document.getElementById("suggestionsSentTotal").innerText =
//             sessionStats.suggestionsSent.total;
//
//         document.getElementById("suggestionsBreakdown").innerText =
//             sessionStats.suggestionsSent.correctness +
//             " correctness, " +
//             sessionStats.suggestionsSent.engagement +
//             " engagement, " +
//             sessionStats.suggestionsSent.delivery +
//             " delivery, " +
//             sessionStats.suggestionsSent.clarity +
//             " clarity, " +
//             sessionStats.suggestionsSent.originality +
//             " originality";
//
//         document.getElementById("suggestionsAcceptedTotal").innerText =
//             sessionStats.suggestionsAccepted.total;
//
//         document.getElementById("suggestionsAcceptedBreakdown").innerText =
//             sessionStats.suggestionsAccepted.correctness +
//             " correctness, " +
//             sessionStats.suggestionsAccepted.engagement +
//             " engagement, " +
//             sessionStats.suggestionsAccepted.delivery +
//             " delivery, " +
//             sessionStats.suggestionsAccepted.clarity +
//             " clarity, " +
//             sessionStats.suggestionsAccepted.originality +
//             " originality";
//     }
//
//
//     // sendMyTraceDataPost("/trace-grammarly", saveTime, "GRAMMARLY", "MOUSE_CLICK", null, instantEvent, "TOOL_USE_LENGTH:::" + writingSuggestionToolUseLength, e);
// });
//
// let str = '    <!-- My Writting Suggestion Panel -->' +
// '    <div class="my-horizontal-collapse-tools my-writing-suggestion" id="collapseWritingSuggestion">' +
// '       <div class="card card-body" style="height:100%;">' +
// '           <nav>' +
// '               <div class="nav nav-tabs" id="nav-tab" role="tablist">' +
// '                   <button class="nav-link active" id="nav-grammar-check-tab" data-bs-toggle="tab" data-bs-target="#nav-grammar-check" type="button" role="tab" aria-controls="nav-grammar-check" aria-selected="true">Grammar</button>' +
// '                   <button class="nav-link" id="nav-writing-checklist-tab" data-bs-toggle="tab" data-bs-target="#nav-writing-checklist" type="button" role="tab" aria-controls="nav-writing-checklist" aria-selected="false">Writing Checklist</button>' +
// '                   <button class="nav-link" id="nav-writer-diet-tab" data-bs-toggle="tab" data-bs-target="#nav-writer-diet" type="button" role="tab" aria-controls="nav-writer-diet" aria-selected="false">Writer\'s Diet</button>' +
// '               </div>' +
// '           </nav>' +
// '           <div class="tab-content" id="nav-tabContent" style="height:100%;">' +
// '               <div class="tab-pane fade show active" id="nav-grammar-check" role="tabpanel" aria-labelledby="nav-grammar-check-tab" style="height:100%;">' +
// // '                   <grammarly-editor-plugin><textarea class="form-control" style="height:100%;" id="grammarly-textarea"></textarea></grammarly-editor-plugin>' +
// '               </div>' +
// '               <div class="tab-pane fade" id="nav-writing-checklist" role="tabpanel" aria-labelledby="nav-writing-checklist-tab" style="height:100%;">' +
// '                   Writing checklist...' +
// '               </div>' +
// '               <div class="tab-pane fade" id="nav-writer-diet" role="tabpanel" aria-labelledby="nav-writer-diet-tab" style="height:100%;">' +
// '                   <div><button class="btn btn-info">Get Feedback</button></div>' +
// '                   <div class="graph-container mt-2">' +
// '                       <div class="graph-part-sections">' +
// '                           <div class="graph-part-section-slice graph-part-section-slice--1"></div>' +
// '                           <div class="graph-part-section-slice graph-part-section-slice--2"></div>' +
// '                           <div class="graph-part-section-slice graph-part-section-slice--3"></div>' +
// '                           <div class="graph-part-section-slice graph-part-section-slice--4"></div>' +
// '                           <div class="graph-part-section-slice graph-part-section-slice--5"></div>' +
// '                       </div>' +
// '                       <div class="graph-part-sections graph-part-lines">' +
// '                           <div class="graph-part-section-line"></div>' +
// '                           <div class="graph-part-section-line"></div>' +
// '                           <div class="graph-part-section-line"></div>' +
// '                           <div class="graph-part-section-line"></div>' +
// '                           <div class="graph-part-section-line"></div>' +
// '                       </div>' +
// '                       <div class="graph-part graph-part-emojis">' +
// '                           <div class="graph-part-emojis-callout"></div>' +
// '                           <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="smile-beam" class="svg-inline--fa fa-smile-beam fa-w-16 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" style="flex: 1 1 0%;"><path fill="currentColor" d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm84-143.4c-20.8 25-51.5 39.4-84 39.4s-63.2-14.3-84-39.4c-8.5-10.2-23.6-11.5-33.8-3.1-10.2 8.5-11.5 23.6-3.1 33.8 30 36 74.1 56.6 120.9 56.6s90.9-20.6 120.9-56.6c8.5-10.2 7.1-25.3-3.1-33.8-10.2-8.4-25.3-7.1-33.8 3.1zM136.5 211c7.7-13.7 19.2-21.6 31.5-21.6s23.8 7.9 31.5 21.6l9.5 17c2.1 3.7 6.2 4.7 9.3 3.7 3.6-1.1 6-4.5 5.7-8.3-3.3-42.1-32.2-71.4-56-71.4s-52.7 29.3-56 71.4c-.3 3.7 2.1 7.2 5.7 8.3 3.4 1.1 7.4-.5 9.3-3.7l9.5-17zM328 152c-23.8 0-52.7 29.3-56 71.4-.3 3.7 2.1 7.2 5.7 8.3 3.5 1.1 7.4-.5 9.3-3.7l9.5-17c7.7-13.7 19.2-21.6 31.5-21.6s23.8 7.9 31.5 21.6l9.5 17c2.1 3.7 6.2 4.7 9.3 3.7 3.6-1.1 6-4.5 5.7-8.3-3.3-42.1-32.2-71.4-56-71.4z"></path></svg>' +
// '                           <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="grin-hearts" class="svg-inline--fa fa-grin-hearts fa-w-16 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" style="flex: 1 1 0%;"><path fill="currentColor" d="M353.6 304.6c-25.9 8.3-64.4 13.1-105.6 13.1s-79.6-4.8-105.6-13.1c-9.8-3.1-19.4 5.3-17.7 15.3 7.9 47.2 71.3 80 123.3 80s115.3-32.9 123.3-80c1.6-9.8-7.7-18.4-17.7-15.3zm-152.8-48.9c4.5 1.2 9.2-1.5 10.5-6l19.4-69.9c5.6-20.3-7.4-41.1-28.8-44.5-18.6-3-36.4 9.8-41.5 27.9l-2 7.1-7.1-1.9c-18.2-4.7-38.2 4.3-44.9 22-7.7 20.2 3.8 41.9 24.2 47.2l70.2 18.1zm188.8-65.3c-6.7-17.6-26.7-26.7-44.9-22l-7.1 1.9-2-7.1c-5-18.1-22.8-30.9-41.5-27.9-21.4 3.4-34.4 24.2-28.8 44.5l19.4 69.9c1.2 4.5 5.9 7.2 10.5 6l70.2-18.2c20.4-5.3 31.9-26.9 24.2-47.1zM248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200z"></path></svg>' +
// '                           <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="meh" class="svg-inline--fa fa-meh fa-w-16 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" style="flex: 1 1 0%;"><path fill="currentColor" d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm-80-216c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm160-64c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zm8 144H160c-13.2 0-24 10.8-24 24s10.8 24 24 24h176c13.2 0 24-10.8 24-24s-10.8-24-24-24z"></path></svg>' +
// '                           <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="frown" class="svg-inline--fa fa-frown fa-w-16 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" style="flex: 1 1 0%;"><path fill="currentColor" d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm-80-216c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm160-64c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zm-80 128c-40.2 0-78 17.7-103.8 48.6-8.5 10.2-7.1 25.3 3.1 33.8 10.2 8.4 25.3 7.1 33.8-3.1 16.6-19.9 41-31.4 66.9-31.4s50.3 11.4 66.9 31.4c8.1 9.7 23.1 11.9 33.8 3.1 10.2-8.5 11.5-23.6 3.1-33.8C326 321.7 288.2 304 248 304z"></path></svg>' +
// '                           <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="sad-cry" class="svg-inline--fa fa-sad-cry fa-w-16 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" style="flex: 1 1 0%;"><path fill="currentColor" d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm144 386.4V280c0-13.2-10.8-24-24-24s-24 10.8-24 24v151.4C315.5 447 282.8 456 248 456s-67.5-9-96-24.6V280c0-13.2-10.8-24-24-24s-24 10.8-24 24v114.4c-34.6-36-56-84.7-56-138.4 0-110.3 89.7-200 200-200s200 89.7 200 200c0 53.7-21.4 102.5-56 138.4zM205.8 234.5c4.4-2.4 6.9-7.4 6.1-12.4-4-25.2-34.2-42.1-59.8-42.1s-55.9 16.9-59.8 42.1c-.8 5 1.7 10 6.1 12.4 4.4 2.4 9.9 1.8 13.7-1.6l9.5-8.5c14.8-13.2 46.2-13.2 61 0l9.5 8.5c2.5 2.3 7.9 4.8 13.7 1.6zM344 180c-25.7 0-55.9 16.9-59.8 42.1-.8 5 1.7 10 6.1 12.4 4.5 2.4 9.9 1.8 13.7-1.6l9.5-8.5c14.8-13.2 46.2-13.2 61 0l9.5 8.5c2.5 2.2 8 4.7 13.7 1.6 4.4-2.4 6.9-7.4 6.1-12.4-3.9-25.2-34.1-42.1-59.8-42.1zm-96 92c-30.9 0-56 28.7-56 64s25.1 64 56 64 56-28.7 56-64-25.1-64-56-64z"></path></svg>' +
// '                       </div>' +
// '                       <div class="graph-part graph-part--active">' +
// '                           <div class="ms-Checkbox is-checked is-enabled root-67">' +
// '                               <input type="checkbox" class="input-61" id="checkbox-14" aria-checked="true">' +
// '                               <label class="ms-Checkbox-label label-62" for="checkbox-14">' +
// '                               <div class="ms-Checkbox-checkbox checkbox-68">' +
// '                                   <i data-icon-name="CheckMark" aria-hidden="true" class="ms-Checkbox-checkmark checkmark-70"></i>' +
// '                               </div>' +
// '                               </label>' +
// '                           </div>' +
// '                           <span class="graph-part-label">be-verbs</span>' +
// '                           <div class="graph-part-bar  " style="width: 0%; background-color: rgb(220, 135, 73);"></div>' +
// '                       </div>' +
// '                       <div class="graph-part graph-part--active">' +
// '                           <div class="ms-Checkbox is-enabled root-60">' +
// '                               <input type="checkbox" class="input-61" id="checkbox-15" aria-checked="false">' +
// '                               <label class="ms-Checkbox-label label-62" for="checkbox-15">' +
// '                               <div class="ms-Checkbox-checkbox checkbox-63">' +
// '                                   <i data-icon-name="CheckMark" aria-hidden="true" class="ms-Checkbox-checkmark checkmark-66"></i>' +
// '                               </div>' +
// '                               </label>' +
// '                           </div>' +
// '                           <span class="graph-part-label">zombie nouns</span>' +
// '                           <div class="graph-part-bar  " style="width: 0%; background-color: rgb(151, 198, 233);"></div>' +
// '                       </div>' +
// '                       <div class="graph-part graph-part--active">' +
// '                           <div class="ms-Checkbox is-enabled root-60">' +
// '                               <input type="checkbox" class="input-61" id="checkbox-16" aria-checked="false">' +
// '                               <label class="ms-Checkbox-label label-62" for="checkbox-16">' +
// '                               <div class="ms-Checkbox-checkbox checkbox-63">' +
// '                                   <i data-icon-name="CheckMark" aria-hidden="true" class="ms-Checkbox-checkmark checkmark-66"></i>' +
// '                               </div>' +
// '                               </label>' +
// '                           </div>' +
// '                           <span class="graph-part-label">prepositions</span>' +
// '                           <div class="graph-part-bar  " style="width: 0%; background-color: rgb(170, 192, 68);"></div>' +
// '                       </div>' +
// '                       <div class="graph-part graph-part--active">' +
// '                           <div class="ms-Checkbox is-enabled root-60">' +
// '                               <input type="checkbox" class="input-61" id="checkbox-17" aria-checked="false">' +
// '                               <label class="ms-Checkbox-label label-62" for="checkbox-17">' +
// '                               <div class="ms-Checkbox-checkbox checkbox-63">' +
// '                                   <i data-icon-name="CheckMark" aria-hidden="true" class="ms-Checkbox-checkmark checkmark-66"></i>' +
// '                               </div>' +
// '                               </label>' +
// '                           </div>' +
// '                           <span class="graph-part-label">ad-words</span>' +
// '                           <div class="graph-part-bar  " style="width: 0%; background-color: rgb(247, 231, 63);"></div>' +
// '                       </div>' +
// '                       <div class="graph-part graph-part--active">' +
// '                           <div class="ms-Checkbox is-enabled root-60">' +
// '                               <input type="checkbox" class="input-61" id="checkbox-18" aria-checked="false">' +
// '                               <label class="ms-Checkbox-label label-62" for="checkbox-18">' +
// '                               <div class="ms-Checkbox-checkbox checkbox-63">' +
// '                                   <i data-icon-name="CheckMark" aria-hidden="true" class="ms-Checkbox-checkmark checkmark-66"></i>' +
// '                               </div>' +
// '                               </label>' +
// '                           </div>' +
// '                           <span class="graph-part-label">it, this, that, there</span>' +
// '                           <div class="graph-part-bar  " style="width: 0%; background-color: rgb(230, 181, 196);"></div>' +
// '                       </div>' +
// '                   </div>' +
// '               </div>' +
// '           </div>' +
//
// '       </div>' +
// '    </div>';
//
//
//
// //-----------------------------------timer-----------------------------------------------
//
//
//
// let myTimerAjax = $.ajax({
//     // url: apiBaseUrl + "/get-task-start-time",
//     url: apiBaseUrl + "get-task-start-time",
//     data: {userId: userId},
//     type: "POST",
//     async: false,
//     success: function (result) {
//         if (result.data != null) {
//             // console.log("waiting for ajax return...");
//             // console.log(result);
//             taskStartTimestamp = result.data;
//
//
//         }
//     }
// });
// // console.log("ajax return finish...");
// //TODO 此处如果发生网络错误，该如何处理
//
// $.when(myTimerAjax).done(function() {
//     if (taskStartTimestamp === 0) { //如果task 还未开始过，则执行下面内容
//         // console.log("never started");
//         taskStartTimestamp = getCurrentTimestamp();
//
//         // localStorage.setItem("ESSAY_TASK_START", taskStartTimestamp + "");
//
//         sendMyTraceDataPost("/trace-timer", taskStartTimestamp + "", "TIMER", "NO_PAGE_EVENT", "NO_TARGET_OBJECT", "ESSAY_TASK_START", "", null);
//     } else { //如果已经开始过，但是关闭了页面，再次回来之后可以继续时间
//         // console.log("started time:" + taskStartTimestamp);
//         let usedTime = getCurrentTimestamp() - taskStartTimestamp;
//         if (usedTime > 0) {
//             totalSeconds -= Math.ceil(usedTime/1000);
//             // console.log("used time:" + Math.ceil(usedTime/1000));
//             if (totalSeconds < 1) { //剩余时间已经没有
//                 totalSeconds = 0;
//                 sendMyTraceDataPost("/trace-timer", getCurrentTimestamp(), "TIMER", "NO_PAGE_EVENT", "NO_TARGET_OBJECT", "ESSAY_TASK_END", "WHEN_ENTER_PAGE_TIME_ALREADY_0", null);
//                 let myTaskFinishModal = document.getElementById("myTaskFinishModal");
//                 if (myTaskFinishModal != null) {
//                     myTaskFinishModal.style.display = "block";
//                 } else {
//                     console.log("cannot locate myTaskFinishModal");
//                 }
//
//             }
//         }
//     }
//
//     let clock;
//     // console.log("setupTImer:");
//     clock = $('.clock').FlipClock({
//         clockFace: 'MinuteCounter', //MinuteCounter   HourCounter
//         autoStart: false,
//         // countdown: true,
//         callbacks: {
//             stop: function() {
//                 $('.clock-message').html('Time is up!');
//
//                 sendMyTraceDataPost("/trace-timer", getCurrentTimestamp(), "TIMER", "NO_PAGE_EVENT", "NO_TARGET_OBJECT", "ESSAY_TASK_END", "TIMER_COUNT_DOWN_TO_0", null);
//                 // 不需要在此记录essay 数据，因为每次按键都会记录essay 数据
//                 //控制阴影出现
//                 let myTaskFinishModal = document.getElementById("myTaskFinishModal");
//                 myTaskFinishModal.style.display = "block";
//             }
//         }
//     });
//
//     // clock.setTime((totalMinutes - 1) * 60 + 59);  //设置timer 时间
//     clock.setTime(totalSeconds - 1);
//     clock.setCountdown(true);
//     clock.start();
// });
//
//
//
//
// //----------------------------------------------------------------------------------------------------
//
//
// //------------------------------------planner 2 ------------------------------------------------------
//
// function checkPlannerTaskExpire(isFirstTimeLoad) {
//     console.log("taskStartTimestamp: " + taskStartTimestamp); //TODO 必须保证此处 task start timestamp 不是0
//     let plannerElementsJson = localStorage.getItem(userId + "myPlannerElements");
//     if (plannerElementsJson === null) {return;}
//     let plannerElements = JSON.parse(plannerElementsJson);
//
//     let sumMinutes = 0;
//     let taskExpireStatus = [];
//     plannerElements.allocatedTimeArr.forEach(function (allocatedTime) { //minutes
//         sumMinutes += allocatedTime;
//
//         if (getCurrentTimestamp() - taskStartTimestamp > sumMinutes * 60 * 1000) {
//             taskExpireStatus.push("text-danger");
//         } else {
//             taskExpireStatus.push("");
//         }
//     });
//
//     let allFormCheckArr = displayPlanDiv.querySelectorAll("div.form-check");
//     for (let i = 0; i < allFormCheckArr.length; i++) {
//         if (allFormCheckArr[i].classList.contains("text-success") || allFormCheckArr[i].classList.contains("text-danger")) {
//
//         } else {
//             if (taskExpireStatus[i] !== "") {
//                 allFormCheckArr[i].classList.add(taskExpireStatus[i]);
//                 if (!isFirstTimeLoad) {
//                     $("#planner-toast-div" + i).removeClass("d-none").addClass("show");
//                     $("#planner-toast-text" + i).text("Task " + (i+1) + " time is running out!!! Please tick the checkbox if you already finished");
//                 }
//             }
//         }
//         console.log(plannerElements);
//         if (plannerElements.taskFinishStatus[i] === 1) {
//             allFormCheckArr[i].checked = true;
//         }
//     }
// }
//
//
// function getPlanQuestionHtml(planQuestionsArr, planQuestionsTimeArr) {
//     let tempItemsStr = "<div>";
//     for (let i = 0; i < planQuestionsArr.length; i++) {
//         tempItemsStr += '       <div class="mt-2">' +
//             '                       <label for="create-plan-question' + i + '-input" class="form-label">' + planQuestionsArr[i] + '</label>' +
//             '                       <div class="input-group">' +
//             '                       <input type="number" step="1" min="0" max="60" placeholder="Input a number (e.g.' + planQuestionsTimeArr[i] + ')" class="form-control" id="create-plan-question' + i + '-input"/>' +
//             '                       <span class="input-group-text">minutes</span>' +
//             '                       </div>' +
//             '                   </div>';
//     }
//     tempItemsStr += "</div>"
//     return tempItemsStr;
// }
//
// function getPlanTaskNameHtml(defaultPlanTaskNameArr, allocatedTimeArr) {
//     let tempItemsStr = "<div>";
//     for (let i = 0; i < defaultPlanTaskNameArr.length; i++) {
//         tempItemsStr += '       <div class="form-check mt-3">' +
//             '   <input class="form-check-input" type="checkbox" data-order="' + (i+1) + '" value="" id="plan-task-check' + i + '">' +
//             '   <label class="form-check-label w-50" for="plan-task-check' + i + '">' + (i+1) + '. ' + defaultPlanTaskNameArr[i] + '</label>' +
//             '   <span class="w-25">' + allocatedTimeArr[i] + ' minutes</span>' +
//             '</div>';
//     }
//     tempItemsStr += "</div>"
//     return tempItemsStr;
// }
//
// function generatePlannerChecklist(selectedPlanOptionValue, allocatedTimeArr) {
//     let placeholder = document.createElement("div");
//
//     let planTaskNameArr = null;
//     switch (selectedPlanOptionValue) {
//         case "1":
//             planTaskNameArr = defaultPlan1TaskNameArr;break;
//         case "2":
//             planTaskNameArr = defaultPlan2TaskNameArr;break;
//         case "3":
//             planTaskNameArr = defaultPlan3TaskNameArr;break;
//     }
//
//     placeholder.innerHTML = getPlanTaskNameHtml(planTaskNameArr, allocatedTimeArr);
//     displayPlanDiv.innerHTML = "";
//     displayPlanDiv.appendChild(placeholder.firstElementChild);
//
//     savePlanBtn.classList.add("d-none");
//     cancelPlanBtn.classList.add("d-none");
//     editPlanBtn.classList.remove("d-none");
//
//     writingStrategySelectDiv.classList.add("d-none");
//     createPlanDiv.classList.add("d-none");
//     displayPlanDiv.classList.remove("d-none");
// }
//
// function setupPlanner2(userId) {
//     let writingStrategySelect = document.querySelector("#writing-strategy-select");
//
//     let placeholder = document.createElement("div");
//     let selectedPlanOptionValue = "0";
//
//     console.log("planner2----------------");
//     writingStrategySelect.onchange = function (e) {
//         console.log("select change");
//         savePlanBtn.classList.remove("d-none");
//         cancelPlanBtn.classList.remove("d-none");
//         createPlanDiv.classList.remove("d-none");
//
//         createPlanDiv.innerHTML = "";
//         selectedPlanOptionValue = writingStrategySelect.options[writingStrategySelect.selectedIndex].value;
//         switch (selectedPlanOptionValue) {
//             case "1":
//                 placeholder.innerHTML = getPlanQuestionHtml(defaultPlan1QuestionsArr, defaultPlan1QuestionsTimeArr);
//                 createPlanDiv.appendChild(placeholder.firstElementChild);
//                 break;
//             case "2":
//                 placeholder.innerHTML = getPlanQuestionHtml(defaultPlan2QuestionsArr, defaultPlan2QuestionsTimeArr);
//                 createPlanDiv.appendChild(placeholder.firstElementChild);
//                 break;
//             case "3":
//                 placeholder.innerHTML = getPlanQuestionHtml(defaultPlan3QuestionsArr, defaultPlan3QuestionsTimeArr);
//                 createPlanDiv.appendChild(placeholder.firstElementChild);
//                 break;
//             default:
//                 createPlanDiv.innerHTML = "Please select one strategy to continue!!!";
//                 break;
//         }
//     };
//
//     savePlanBtn.onclick = function(e) {
//         console.log("savePlanBtn click");
//
//         let numberOfChildNodes = createPlanDiv.children[0].children.length;
//         let sumOfMinutes = 0;
//         let allocatedTimeArr = []
//         try {
//             for (let i = 0; i < numberOfChildNodes; i++) {
//                 let createPlanQuestionInput = document.querySelector("#create-plan-question" + i + "-input");
//                 let tempValue = parseInt(createPlanQuestionInput.value);
//                 sumOfMinutes += tempValue;
//                 allocatedTimeArr.push(tempValue);
//             }
//         } catch (exception) {
//             alert("Please input correct number!!!");
//             return;
//         }
//
//         if (sumOfMinutes > totalMinutes) {
//             alert("Total time should not greater than " + totalMinutes + " minutes!");
//             return;
//         } else {
//             generatePlannerChecklist(selectedPlanOptionValue, allocatedTimeArr);
//         }
//
//         let plannerElements = {"allocatedTimeArr" : allocatedTimeArr, "selectedPlanOptionValue": selectedPlanOptionValue, "taskFinishStatus": [0, 0, 0, 0]};
//
//         let savePlannerTimestamp = getCurrentTimestamp();
//
//         localStorage.setItem(userId + "myPlannerElements", JSON.stringify(plannerElements));
//
//         $.post(apiBaseUrl + "save-planner-content", {
//             userId: userId,
//             saveTime: savePlannerTimestamp,
//             username: username == null ? getUsername() : username,
//             url: window.location.href.replace(/#.*/, ""),
//             plannerElementsJson: JSON.stringify(plannerElements),
//             courseId: currentCourseId
//         });
//         sendMyTraceDataPost("/trace-planner", savePlannerTimestamp, "PLANNER", "MOUSE_CLICK", "SAVE_PLAN_BTN", "SAVE", "", e);
//     };
//
//     editPlanBtn.onclick = function(e) {
//         writingStrategySelectDiv.classList.remove("d-none");
//
//         savePlanBtn.classList.remove("d-none");
//         cancelPlanBtn.classList.remove("d-none");
//         editPlanBtn.classList.add("d-none");
//
//         createPlanDiv.classList.remove("d-none");
//         displayPlanDiv.classList.add("d-none");
//
//         sendMyTraceDataPost("/trace-planner", savePlannerTimestamp, "PLANNER", "MOUSE_CLICK", "EDIT_PLAN_BTN", "EDIT", "", e);
//     }
//
//     cancelPlanBtn.onclick = function(e) {
//         console.log("cancelPlanBtn click");
//         // saveCancelPlanDiv.classList.add("d-none");
//         savePlanBtn.classList.add("d-none");
//         cancelPlanBtn.classList.add("d-none");
//         console.log($(displayPlanDiv));
//         console.log(displayPlanDiv.innerHTML.trim().length);
//         let instantEvent = "";
//         if (displayPlanDiv.innerHTML.trim().length !== 0) { //编辑之后的cancel
//             writingStrategySelectDiv.classList.add("d-none");
//             createPlanDiv.classList.add("d-none");
//             displayPlanDiv.classList.remove("d-none");
//             editPlanBtn.classList.remove("d-none");
//             instantEvent = "CANCEL_EDIT";
//         } else { // 创建过程中的cancel
//             displayPlanDiv.innerHTML = "";
//             createPlanDiv.innerHTML = "";
//             writingStrategySelect.selectedIndex = 0;
//             createPlanDiv.classList.add("d-none");
//             displayPlanDiv.classList.add("d-none");
//             instantEvent = "CANCEL_CREATE";
//         }
//         sendMyTraceDataPost("/trace-planner", savePlannerTimestamp, "PLANNER", "MOUSE_CLICK", "CANCEL_PLAN_BTN", instantEvent, "", e);
//     };
//
//     $(displayPlanDiv).on("change", "input", function (e) {
//         console.log("check box change");
//         $(this).parent().toggleClass("text-danger");
//         $(this).parent().toggleClass("text-success");
//         let plannerElements = JSON.parse(localStorage.getItem(userId + "myPlannerElements"));
//
//         plannerElements.taskFinishStatus[parseInt(this.dataset.order)] = 1;
//
//         localStorage.setItem(userId + "myPlannerElements", JSON.stringify(plannerElements));
//         let savePlannerTimestamp = getCurrentTimestamp();
//         $.post(apiBaseUrl + "save-planner-content", {
//             userId: userId,
//             saveTime: savePlannerTimestamp,
//             username: username == null ? getUsername() : username,
//             url: window.location.href.replace(/#.*/, ""),
//             plannerElementsJson: JSON.stringify(plannerElements),
//             courseId: currentCourseId
//         });
//         sendMyTraceDataPost("/trace-planner", savePlannerTimestamp, "PLANNER", "MOUSE_CLICK", "PLANNER_CHECKBOX", "SAVE", "", e);
//     });
//
//     checkPlannerTaskExpire(true);
//     console.log("before set interval..................................");
//     setInterval(function () {
//         checkPlannerTaskExpire(false);
//     }, 5000);
// }
// //----------------------------------------------------------------------------------------------------