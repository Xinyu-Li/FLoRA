
function render() {
    let essayProductVisualToolHtml = `
        <!-- Process Visual Tool -->
        <div id="collapse-essay-product-visual" class="my-horizontal-collapse-tools my-essay-product-visual">
            <div class="card card-body" style="height:100%; min-height: 200px;">
                <div class="header-container" style="display: flex; justify-content: space-between; align-items: center;">
                    <h3 class="mt-2 mb-2" style="margin: 0;"><span>${productVisualTitle}</span></h3>
                    
                    <!-- 关闭按钮 -->
                    <button type="button" class="btn btn-close" style="margin-left: 10px;" aria-label="Close" id="process-visual-close-x-btn"></button>
                </div>
                <div id="essay-product-visual-label" style="font-size: 18px; margin-bottom: 10px;">Hoofdzaken</div>
                <div id="essay-product-visual-dots"></div>
                <!-- 关闭按钮 -->
                <div style="text-align: right; margin-bottom: 10px; position: absolute; right:10px; bottom: 0;">
                    <button id="process-visual-close-btn" class="btn btn-secondary">${productVisualCloseBtn}</button>
                </div>
            </div>
        </div>`;
    $("body").append(essayProductVisualToolHtml);
}

render();

let showEssayProductVisualToolBtn = document.querySelector("#show-essay-product-visual-tool-btn");
let collapseEssayProductVisual = document.querySelector("#collapse-essay-product-visual");
toolList1.push(collapseEssayProductVisual);

let essayProductClickTargetObject = "NO_TARGET_OBJECT";
let essayProductPageEvent = "NO_PAGE_EVENT";
let essayProductToolStartUseTime = 0;
let essayProductInstantEvent = "CLOSE";

// function getHistoryEssayAnalysisResult() {
//     // get data from backend TODO
//     const data = {
//         label: "Hoofdzaken",
//         activeCount: 2, // Index that should be active and colored
//         totalDots: 3    // Total number of dots
//     };
//
//     return data;
// }

//TODO 添加 trace data capture

function getRealTimeEssayAnalysisResult() {
    console.log("get into -----------getRealTimeEssayAnalysisResult:");
    // get data from backend TODO
    let totalDots = 0;
    let activeCount = 0;
    let label = "";
    const labelRequestNumberMap = {
        "1": "Relevantie",
        "2": "Hoofdzaken",
        "3": "Tekstopbouw"
    };
    let resultData = {
        label: label,
        activeCount: activeCount, // Index that should be active and colored
        totalDots: totalDots    // Total number of dots
    };
    $.post(apiBaseUrl + "/get-essay-product-analysis", {
        userId: userId,
        courseId: currentCourseId
    }, function (data, status) {
        if (data.data != null) {
            console.log("essay-product-analysis", data.data);

            let tempRequestNumber = localStorage.getItem(userId + '-' + currentCourseId + "-currentEssayProductGoal");
            label = labelRequestNumberMap[tempRequestNumber];

            console.log("data.data: ",data.data);

            for (let key in data.data) {
                if (data.data[key] === true) {
                    activeCount++;
                }
                totalDots++;
            }

            console.log("label:", label);
            console.log("activeCount:", activeCount);
            console.log("totalDots:", totalDots);
            resultData.label = label;
            resultData.activeCount = activeCount;
            resultData.totalDots = totalDots;

            console.log("get data from server:", resultData);
            showEssayProductStatus(resultData);
        } else {
            console.log("essay-product-analysis failed", resultData);
            showEssayProductStatus(resultData);
        }
    });
}

/*function loadEssayProductVisual() {
    const data = getRealTimeEssayAnalysisResult();
    showEssayProductStatus(data);
}*/

function showEssayProductStatus(tempData) {
    console.log("tempData", tempData);
    const labelNameMap = {
        "Hoofdzaken": "mainpoint",
        "Relevantie": "relevance",
        "Tekstopbouw": "structure"
    }

    const essayProductVisualLabel = document.getElementById("essay-product-visual-label");
    const dotsContainer = document.getElementById('essay-product-visual-dots');
    dotsContainer.innerHTML = '';
    essayProductVisualLabel.textContent = tempData.label;

    for (let i = 0; i < tempData.totalDots; i++) {
        const dot = document.createElement('span');
        dot.className = 'essay-product-visual-dot';
        if (i < tempData.activeCount) {
            dot.classList.add(`essay-product-visual-status-${labelNameMap[tempData.label]}-active`);
        }
        dotsContainer.appendChild(dot);
    }
}


showEssayProductVisualToolBtn.onclick = function (e) {
    stopEventPropagation(e);
    if (useAnnotationTool) hideAnnotationToolbox(); // 隐藏annotation toolbox，当点击其他按钮时候
    collapseEssayProductVisual.classList.toggle("in-tools");
    toolsAndEssayToggle(collapseEssayProductVisual);

    essayProductClickTargetObject = "SHOW_ESSAY_PRODUCT_BTN";
    essayProductPageEvent = "MOUSE_CLICK";
    sendEventMessage("", getCurrentTimestamp(), "ESSAY_PRODUCT", essayProductPageEvent, "ESSAY_PRODUCT_CLICK", "ESSAY_PRODUCT", essayProductClickTargetObject, "SHOW_ESSAY_PRODUCT_BTN_CLICK", "", null);

    if (collapseEssayProductVisual.classList.contains("in-tools")) {
        if (typeof allowEssayProductAnalysis !== 'undefined' && allowEssayProductAnalysis) {
            requestProcessEssayProduct("ON_SHOW_ESSAY_PRODUCT_TOOL");
        }
        getRealTimeEssayAnalysisResult();

    }
}

//关闭事件直接用 Callback function 捕获
// 关闭按钮事件处理（右上角 'X' 按钮）
document.getElementById("process-visual-close-x-btn").onclick = function () {
    collapseEssayProductVisual.classList.remove("in-tools");
    toolsAndEssayToggle(collapseEssayProductVisual);
};

// 关闭按钮事件处理（右下角 'Close' 按钮）
document.getElementById("process-visual-close-btn").onclick = function () {
    collapseEssayProductVisual.classList.remove("in-tools");
    toolsAndEssayToggle(collapseEssayProductVisual);
};

collapseEssayProductVisual.onclick = function(e) {
    stopEventPropagation(e);
    sendEventMessage("", getCurrentTimestamp(), "ESSAY_PRODUCT", "MOUSE_CLICK", "READ_ESSAY_PRODUCT", "ESSAY_PRODUCT", null, "CLICK", "", e);
};
collapseEssayProductVisual.onmousewheel = function(e) {
    stopEventPropagation(e);
    sendEventMessage("", getCurrentTimestamp(), "ESSAY_PRODUCT", "MOUSE_WHEEL", "READ_ESSAY_PRODUCT", "ESSAY_PRODUCT", null, "NO_INSTANT_EVENT", "SCROLL_DIST:::" + e.deltaY, e);
};
collapseEssayProductVisual.onmousemove = function(e) {
    stopEventPropagation(e);
    mousePosition = generateMousePositionData(e, "READ_ESSAY_PRODUCT", "ESSAY_PRODUCT");
};
collapseEssayProductVisual.onmouseup = function(e) {
    stopEventPropagation(e);
    if (window.getSelection() != null && window.getSelection().toString().replace(/\n/g, '').length > 0) {
        let selectText = window.getSelection().toString();
        sendEventMessage("", getCurrentTimestamp(), "ESSAY_PRODUCT", "MOUSE_SELECT_TEXT", "READ_ESSAY_PRODUCT", "ESSAY_PRODUCT", null, "SELECT_TEXT", "MOUSE_SELECT:::" + selectText, e);
    }
};



function myCallbackEssayProduct(contains, element) {
    let saveTime;
    let eventValue;

    if (contains) {
        saveTime = getCurrentTimestamp();
        essayProductInstantEvent = "OPEN";
        eventValue = "START_USE_TOOL:::" + saveTime;
        essayProductToolStartUseTime = saveTime;

        sendEventMessage("", saveTime, "ESSAY_PRODUCT", essayProductPageEvent, "OPEN_ESSAY_PRODUCT", "ESSAY_PRODUCT", essayProductClickTargetObject, essayProductInstantEvent, eventValue, null);
    } else {
        if (essayProductInstantEvent !== "CLOSE") {
            saveTime = getCurrentTimestamp();
            essayProductInstantEvent = "CLOSE";
            if (essayProductToolStartUseTime === 0) {
                eventValue = "TOOL_USE_LENGTH:::ERROR-" + (saveTime - essayProductToolStartUseTime);
            } else {
                eventValue = "TOOL_USE_LENGTH:::" + (saveTime - essayProductToolStartUseTime);
            }
            sendEventMessage("", saveTime, "ESSAY_PRODUCT", essayProductPageEvent, "CLOSE_ESSAY_PRODUCT", "ESSAY_PRODUCT", essayProductClickTargetObject, essayProductInstantEvent, eventValue, null);
        } else {
            // keep closed
        }
    }
    essayProductClickTargetObject = "NO_TARGET_OBJECT";
    essayProductPageEvent = "NO_PAGE_EVENT";
}

handleClassMutation(collapseEssayProductVisual, myCallbackEssayProduct);