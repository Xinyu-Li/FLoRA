// tools_17process_visual.js

function render() {
    let processVisualToolHtml = `
        <!-- Process Visual Tool -->
        <div id="collapseProcessVisual" class="my-horizontal-collapse-tools my-processVisual">
            <div class="card card-body" style="height:100%; min-height: 200px;">
                <div class="header-container" style="display: flex; justify-content: space-between; align-items: center;">
                    <h3 class="mt-2 mb-2" style="margin: 0;"><span>Process Visualisation</span></h3>
                    <!-- 文本展示区域 -->
                    <div id="processVisualTextArea" style="text-align: left; border: 1px solid black; padding: 5px;">
                        <p id="fixedTextLine" style="margin: 0;">Your set goals:</p>
                            <ol style="margin: 0; padding-left: 20px;" id="student-goal-list">
<!--                                <li id="textLine1" style="margin: 0;"></li>-->
<!--                                <li id="textLine2" style="margin: 0;"></li>-->
<!--                                <li id="textLine3" style="margin: 0;"></li>-->
                            </ol>
                    </div>
                    <!-- 关闭按钮 -->
                    <button type="button" class="btn btn-close" style="margin-left: 10px;" aria-label="Close" id="closeProcessVisualBtn"></button>
                </div>
                <!-- 第一个柱状图容器 -->
                <div id="process_visual_container1_previous" style="width: 100%; max-height: 20vh; margin: 0; padding: 0;"></div>
                <!-- 第二个柱状图容器 -->
                <div id="process_visual_container2_current" style="width: 100%; max-height: 20vh; margin: 0; padding: 0;"></div>
                <!-- 关闭按钮 -->
                <div style="text-align: right; margin-top: 10px;">
                    <button id="processVisualCloseBtn" class="btn btn-secondary">Close</button>
                </div>
            </div>
        </div>`;
    $("body").append(processVisualToolHtml);
}

render();

// Function to set the styles and add text to the list items
function applyStylesAndText() {
    const processVisualTextArea = document.getElementById('processVisualTextArea');

    // Set styles for the parent container
    //processVisualTextArea.style.width = "300px";  // Set the width of the container
    processVisualTextArea.style.border = "1px solid black";
    processVisualTextArea.style.padding = "5px";
    processVisualTextArea.style.boxSizing = "border-box"; // Ensures padding doesn't exceed the container's width

    // Set styles for the list
    const ul = processVisualTextArea.querySelector('ol');
    ul.style.paddingLeft = "20px";
    ul.style.margin = "0";

    // Set styles for the list items
    const listItems = ul.querySelectorAll('li');
    listItems.forEach(item => {
        item.style.margin = "0";
        item.style.whiteSpace = "normal";      // Allows text to wrap
        item.style.wordWrap = "break-word";    // Breaks long words to prevent overflow
        item.style.wordBreak = "break-word";   // Ensures words are wrapped correctly at line breaks
        item.style.overflowWrap = "break-word"; // Another way to handle long words
    });
}
applyStylesAndText()
// 添加 tooltip 容器
if (!d3.select("#tooltip").node()) {
    d3.select("body")
        .append("div")
        .attr("id", "tooltip")
        .style("position", "absolute")
        .style("pointer-events", "none")
        .style("background", "rgba(0, 0, 0, 0.7)")
        .style("color", "#fff")
        .style("padding", "5px")
        .style("border-radius", "3px")
        .style("font-size", "12px")
        .style("display", "none")
        .style("z-index", "1000");
}

let showProcessVisualToolBtn = document.querySelector("#showProcessVisualToolBtn");
let collapseProcessVisual = document.querySelector("#collapseProcessVisual");
let previousSrlProcessData = [];
let currentSrlProcessData = [];

// 手动设置总持续时间（以分钟为单位）
let totalDuration = totalMinutes; // 您可以在这里调整总持续时间


// 防抖函数
function debounce(func, wait) {
    let timeout;
    return function () {
        clearTimeout(timeout);
        timeout = setTimeout(func, wait);
    };
}

function setupProcessVisualTool() {
    // 初始化工具
    console.log("Process Visual Tool initialized");
    // loadProcessVisualTool(); // 加载柱状图
    getQuestionnaireResponse();

    // 窗口调整时重新加载柱状图
    const debouncedResize = debounce(() => {
        if (collapseProcessVisual.classList.contains("in-tools")) {
            loadProcessVisualTool();
        }
    }, 200);
    // 添加窗口调整事件监听器
    window.addEventListener('resize', debouncedResize);
}

let goal_text_list = [];
showProcessVisualToolBtn.onclick = function (e) {
    stopEventPropagation(e);

    collapseProcessVisual.classList.toggle("in-tools");

    if (collapseProcessVisual.classList.contains("in-tools")) {
        setupProcessVisualTool();
    }
    // let courseId = 0;
    // let userId = 0;
    let modelType = "maria";
    console.log("request real time process data from server");
    // 请求实时流程数据
    $.ajax({
        url: apiBaseUrl + "/test-real-time-process/" + currentCourseId + "/" + userId + "/" + modelType,
        type: 'GET',
        dataType: 'json',
        success: function (data, status) {
            if (status === "success") {
                console.log("real-time-process:", data);

                currentSrlProcessData = data.data.currentDurationVOList;
                previousSrlProcessData = data.data.previousDurationVOList;
                //updateTextDisplayArea(srlProcessData1); // 更新文本展示区域
                if (data.data !== 'undefined') {
                    loadProcessVisualTool();  //data.data.currentSrlProcessData, data.data.previousSrlProcessData
                }

            }
        }
    });


    $.get(apiBaseUrl + "/get-questionnaire-all-response",
        {
            courseId: processVisualRelatedQuestionnaireCourseId,
            questionnaireName: processVisualRelatedQuestionnaireName,
            userId: userId,
        },
        function(data, status) {
            if (status === "success") {
                console.log("success getting questionnaire-response data process: ", data);
                if (data.data != null) {
                    const treedata = restructureData2(data.data);

                     console.log("restructureData: ", treedata);
                    //console.log("restructureData: ", restructureData2(data.data));
                    // console.log(Object.keys(treedata).length, " responses for ", processVisualRelatedQuestionnaireName, " are retrived for ", userId)
                    let keys = Object.keys(treedata);
                    let latest_response = treedata[keys[keys.length - 1]];
                    goal_text_list = generateTextList(latest_response);
                    console.log("goal_text_list: ", goal_text_list.join('\n'));
                    updateTextDisplayArea(goal_text_list);
                }
                else{
                    console.log("returned data is null!");
                }
            }
            else{
                console.log("fail to retrive data from database!");
            }
        });

};

function getQuestionnaireResponse(){
    console.log("REQUEST get-questionnaire-response!");
    $.get(apiBaseUrl + "/get-questionnaire-all-response",
        {
            courseId: processVisualRelatedQuestionnaireCourseId || 0,
            questionnaireName: processVisualRelatedQuestionnaireName || '',
            userId: userId,
        },
        function(data, status) {
            if (status === "success") {
                console.log("success getting questionnaire-response data: ", data);
                /*if (data.data!=null){
                    const treedata = restructureData2(data.data);
                    console.log("restructureData: ", treedata);
                    console.log(Object.keys(treedata).length, " responses for ", useQuestionnaireName, " are retrived for ", userId)
                    for (const response in treedata) {
                        console.log("Response with id ", response);
                        const forest = treedata[response];
                        let output = '';
                        forest.traverse(value => {
                            output += value + '\n'; // Append each formatted value to the output string
                        });

                        // Print the formatted output
                        console.log(output);
                        const textList = generateTextList(forest);
                        textLists.push(textList)

                        console.log("textList: ", textList.join('\n'));
                    }

                }
                else{
                    console.log("returned data is null!");
                }*/
            }
            else{
                console.log("fail to retrive data from database!");
            }
        });
}


function updateTextDisplayArea(data) {
    // 更新文本内容
    let counter = 0
    let studentGoalListOl = document.getElementById("student-goal-list");
    studentGoalListOl.innerHTML = '';
    // console.log("data: ", data.length);
    if(data.length > 1){
        data.forEach((sentence, index) => {
            if (index > 0){
                counter = counter + 1
                // Assuming textLine1, textLine2, etc., exist in the HTML
                /*const textLineId = `textLine${counter}`; // Get the id as textLine1, textLine2, ...
                const element = document.getElementById(textLineId);
                if (element) {
                    element.textContent = counter+ "."+ sentence; // Set the text content of each element
                }*/
                let tempLi = document.createElement("li");
                tempLi.textContent = sentence;
                studentGoalListOl.appendChild(tempLi);
            }

        });
    }
    else {

        let tempLi = document.createElement("li");
        tempLi.textContent = `No Goal Detected!!!`;
        studentGoalListOl.appendChild(tempLi);
        // document.getElementById('textLine1').textContent = `No Goal Detected!!!`;
        // document.getElementById('textLine2').textContent = `text text text text text text`;
        // document.getElementById('textLine3').textContent = `text text text text text text`;
    }
}

function loadProcessVisualTool() {
    // 清除现有的 SVG 元素
    d3.select("#process_visual_container1_previous").selectAll("*").remove();
    d3.select("#process_visual_container2_current").selectAll("*").remove();

    // 下方的柱状图数据（可根据需要调整）
    // const data2 = [
    //     { category: 'No_pattern', value: 10.0033833333333333332, id: 'No_pattern_1' },
    //     { category: 'Evaluation', value: 10.015516666666666666, id: 'Evaluation_1' },
    //     // ... 其他数据
    // ];


    const categoryNameMap = {
        'MCO': 'Orientation',
        'MCP': 'Planning',
        'MCE': 'Evaluation',
        'MCM': 'Monitoring',
        'HCEO': 'Elaboration',
        'LCF': 'First-reading',
        'LCR': 'Re-reading',
        'NOT_RECOGNIZED': 'No_pattern'
    }
    // 获取所有唯一的类别
    // const uniqueCategories = Array.from(new Set([...srlProcessData1, ...data2].map(d => d.category)));
    const uniqueCategories = Array.from(new Set([...currentSrlProcessData, ...previousSrlProcessData].map(d => categoryNameMap[d.category])));



    // 定义自定义颜色映射
    const categoryColorMap = {
        'Orientation': '#A6CEE3',
        'Planning': '#1F78B4',
        'Monitoring': '#B2DF8A',
        'First-reading': '#E31A1C',
        'Re-reading': '#FB9A99',
        'Evaluation': '#33A02C',
        'Elaboration': '#FDBF6F',
        'No_pattern': '#EBEBEB',
        // 新增类别的颜色
        // 'MCO': '#C2C4E2',
        // 'MCP': '#D4A190',
        // 'MCE': '#F4A8D4',
        // 'MCM': '#A1DAB4',
        // 'HCEO': '#C5F0A4',
        // 'LCF': '#E31A1C',
        // 'LCR': '#FB9A99',
        // 'NOT_RECOGNIZED': '#D9D9D9'
        // 根据需要添加其他类别和颜色
    };

    // 生成颜色比例尺
    const categoryColors = uniqueCategories.map(category => categoryColorMap[category] || '#000000'); // 未定义颜色的类别默认黑色
    const categoryColorScale = d3.scaleOrdinal()
        .domain(uniqueCategories)
        .range(categoryColors);

    // 绘制上方的柱状图（不显示图例）
    drawBarChart('#process_visual_container1_previous', previousSrlProcessData, totalDuration, categoryColorScale, uniqueCategories, false, 'Current');


    // 绘制下方的柱状图（显示图例）
    drawBarChart('#process_visual_container2_current', currentSrlProcessData, totalDuration, categoryColorScale, uniqueCategories, true, 'Previous');
}

function drawBarChart(containerSelector, srlProcessData, totalDuration, categoryColorScale, uniqueCategories, showLegend, yAxisLabel) {
    // 获取容器的宽度
    const containerWidth = d3.select(containerSelector).node().getBoundingClientRect().width;

    // 设置图表的尺寸和边距
    const margin = { top: 5, right: 20, bottom: showLegend ? 60 : 25, left: 50 },
        width = containerWidth - margin.left - margin.right,
        height = 75;

    // 设置固定的柱子高度
    const barHeight = 70; // 您可以根据需要调整此值

    // 创建 SVG 元素
    const svg = d3.select(containerSelector)
        .append("svg")
        .attr("width", containerWidth)
        .attr("height", height + margin.top + margin.bottom + (showLegend ? 50 : 20))
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // x 轴比例尺
    const x = d3.scaleLinear()
        .domain([0, totalDuration])
        .range([0, width]);

    // y 轴比例尺
    const y = d3.scaleBand()
        .range([0, height])
        .domain([yAxisLabel])
        .padding(0);


    // 添加 y 轴
    svg.append("g")
        .call(d3.axisLeft(y).tickSize(0).tickPadding(10))
        .select(".domain").remove();

    // 堆叠数据
    const keys = srlProcessData.map(d => d.id);
    const stackedData = d3.stack()
        .keys(keys)
        .value((d, key) => {
            const item = srlProcessData.find(c => c.id === key);
            return item ? item.value : 0;
        })([srlProcessData]);

    // console.log("y('yAxisLabel')", y('yAxisLabel'));
    // console.log("y.bandwidth()", y.bandwidth());
    // console.log("barHeight", barHeight);
    // 添加背景矩形，表示总时长
    svg.append("rect")
        .attr("x", x(0))
        .attr("y", ((y.bandwidth() - barHeight) / 2)) // TODO
        .attr("width", x(totalDuration))
        .attr("height", barHeight)
        .attr("fill", "#e0e0e0");
    // 创建层
    const layers = svg.selectAll("g.layer")
        .data(stackedData)
        .enter()
        .append("g")
        .attr("class", "layer");
    // 添加柱状图并添加事件监听器

    // console.log("y('Process')", y('Process'))
    layers.selectAll("rect")
        .data(d => d.map(point => {
            // console.log("rect", d);
            // console.log("rect", point);
            const key = d.key;
            const category = srlProcessData.find(item => item.id === key).category;
            return {
                key: key,
                category: category,
                x0: point[0],
                x1: point[1]
            };
        }))
        .enter()
        .append("rect")
        .attr("fill", d => categoryColorScale(d.category))
        .attr("y", ((y.bandwidth() - barHeight) / 2))
        .attr("x", d => x(d.x0))
        .attr("height", barHeight)
        .attr("width", d => x(d.x1) - x(d.x0))
        .on("mouseover", function (event, d) {
            if (d.category !== 'No_pattern') {
                // 获取当前填充颜色
                const currentColor = d3.select(this).attr("fill");
                // 计算变亮后的颜色
                const brighterColor = d3.color(currentColor).brighter(0.5);

                // 设置变亮后的颜色
                d3.select(this)
                    .attr("fill", brighterColor);

                // 存储原始颜色以便恢复
                d3.select(this).attr("original-fill", currentColor);

                // 显示 tooltip
                d3.select("#tooltip")
                    .style("display", "block")
                    .html(d.category);
            }
        })
        .on("mousemove", function (event, d) {
            if (d.category !== 'No_pattern') {
                // 更新 tooltip 位置
                d3.select("#tooltip")
                    .style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY - 20) + "px");
            }
        })
        .on("mouseout", function (event, d) {
            if (d.category !== 'No_pattern') {
                // 恢复原始填充颜色
                const originalColor = d3.select(this).attr("original-fill");
                d3.select(this)
                    .attr("fill", originalColor);
            }
            // 隐藏 tooltip
            d3.select("#tooltip")
                .style("display", "none");
        });

    // 添加 x 轴（时间刻度尺）
    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x)
            .ticks(10)
            .tickFormat(d => `${d} min`));

    // **添加图例的部分**
    if (showLegend) {
        // 计算每行的图例项数
        const legendItemWidth = 120;
        const itemsPerRow = Math.floor((width + margin.left + margin.right) / legendItemWidth);

        // 添加图例容器
        const legend = svg.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 12)
            .attr("text-anchor", "start")
            .attr("transform", `translate(0, ${height + 40})`) // 图例位置

            // 绑定数据并创建图例项
            .selectAll("g")
            .data(uniqueCategories)
            .enter().append("g")
            .attr("transform", (d, i) => {
                const xPosition = (i % itemsPerRow) * legendItemWidth;
                const yPosition = Math.floor(i / itemsPerRow) * 20;
                return `translate(${xPosition}, ${yPosition})`;
            });

        // 添加图例颜色矩形
        legend.append("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", 18)
            .attr("height", 18)
            .attr("fill", d => categoryColorScale(d));

        // 添加图例文本
        legend.append("text")
            .attr("x", 24)
            .attr("y", 14) // 调整文本垂直居中
            .text(d => d);
    }
}

// 工具函数
// function stopEventPropagation(event) {
//     if (event.stopPropagation) {
//         event.stopPropagation();
//     } else if (window.event) {
//         // 兼容旧版 IE
//         window.event.cancelBubble = true;
//     }
// }

// 关闭按钮事件处理（右上角 'X' 按钮）
document.getElementById("closeProcessVisualBtn").onclick = function () {
    collapseProcessVisual.classList.remove("in-tools");
};

// 关闭按钮事件处理（右下角 'Close' 按钮）
document.getElementById("processVisualCloseBtn").onclick = function () {
    collapseProcessVisual.classList.remove("in-tools");
};
