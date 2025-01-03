
function render() {
    let essayProductVisualToolHtml = `
        <!-- Process Visual Tool -->
        <div id="collapse-essay-product-visual" class="my-horizontal-collapse-tools my-essay-product-visual">
            <div class="card card-body" style="height:100%; min-height: 200px;">
                <div class="header-container" style="display: flex; justify-content: space-between; align-items: center;">
                    <h3 class="mt-2 mb-2" style="margin: 0;"><span>Product Visualisation</span></h3>
                    
                    <!-- 关闭按钮 -->
                    <button type="button" class="btn btn-close" style="margin-left: 10px;" aria-label="Close" id="process-visual-close-x-btn"></button>
                </div>
                <div id="essay-product-visual-label" style="font-size: 18px; margin-bottom: 10px;">Hoofdzaken</div>
                <div id="essay-product-visual-dots"></div>
                <!-- 关闭按钮 -->
                <div style="text-align: right; margin-top: 10px;">
                    <button id="process-visual-close-btn" class="btn btn-secondary">Close</button>
                </div>
            </div>
        </div>`;
    $("body").append(processVisualToolHtml);
}

render();

let showEssayProductVisualToolBtn = document.querySelector("#show-essay-product-visual-tool-btn");
let collapseEssayProductVisual = document.querySelector("#collapse-essay-product-visual");


function getHistoryEssayAnalysisResult() {
    // get data from backend TODO
    const data = {
        label: "Hoofdzaken",
        activeCount: 2, // Index that should be active and colored
        totalDots: 3    // Total number of dots
    };

    return data;
}

function getRealTimeEssayAnalysisResult() {
    // get data from backend TODO
    const data = {
        label: "Hoofdzaken",
        activeCount: 2, // Index that should be active and colored
        totalDots: 3    // Total number of dots
    };

    return data;
}

function loadEssayProductVisual() {
    const data = getHistoryEssayAnalysisResult();
    showEssayProductStatus(data);
}

function showEssayProductStatus(data) {

    const labelNameMap = {
        "Hoofdzaken": "mainpoint",
        "Relevantie": "relevance",
        "Tekstopbouw": "structure"
    }

    const essayProductVisualLabel = document.getElementById("essay-product-visual-label");
    const dotsContainer = document.getElementById('essay-product-visual-dots');
    essayProductVisualLabel.textContent = data.label;

    for (let i = 0; i < data.totalDots; i++) {
        const dot = document.createElement('span');
        dot.className = 'essay-product-visual-dot';
        if (i < data.activeCount) {
            dot.classList.add(`essay-product-visual-status-${labelNameMap[data.label]}-active`);
        }
        dotsContainer.appendChild(dot);
    }
}


showEssayProductVisualToolBtn.onclick = function (e) {
    stopEventPropagation(e);

    collapseEssayProductVisual.classList.toggle("in-tools");

    if (collapseEssayProductVisual.classList.contains("in-tools")) {
        const data = getRealTimeEssayAnalysisResult();
        showEssayProductStatus(data);
    }
}

// 关闭按钮事件处理（右上角 'X' 按钮）
document.getElementById("process-visual-close-x-btn").onclick = function () {
    collapseProcessVisual.classList.remove("in-tools");
};

// 关闭按钮事件处理（右下角 'Close' 按钮）
document.getElementById("process-visual-close-btn").onclick = function () {
    collapseProcessVisual.classList.remove("in-tools");
};