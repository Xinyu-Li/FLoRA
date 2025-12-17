// tools_17process_visual.js
//TODO 添加 trace data capture


function render() {
    let processVisualToolHtml = `
        <!-- Process Visual Tool -->
        <div id="collapseProcessVisual" class="my-horizontal-collapse-tools my-processVisual">
            <div class="card card-body" style="height:100%; min-height: 200px; overflow:auto;">
                <div class="header-container" style="display: flex; justify-content: space-between; align-items: center;">
                    <h3 class="mt-2 mb-2" style="margin: 0;"><span>${processVisualTitle}</span></h3>
                    <!-- 文本展示区域 -->
                    <div id="processVisualTextArea" style="text-align: left; border: 1px solid black; padding: 5px;">
                        <p id="fixedTextLine" style="margin: 0;">${processVisualSetGoalLabel} :</p>
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
                    <button id="processVisualCloseBtn" class="btn btn-secondary">${processVisualCloseBtn}</button>
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
toolList1.push(collapseProcessVisual);

// 手动设置总持续时间（以分钟为单位）
let totalDuration = totalMinutes; // 您可以在这里调整总持续时间

let processVisualClickTargetObject = "NO_TARGET_OBJECT";
let processVisualPageEvent = "NO_PAGE_EVENT";
let processVisualToolStartUseTime = 0;
let processVisualInstantEvent = "CLOSE";


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

function extractAnswerByLang(answer){
    let pattern = new RegExp(`\\{mlang\\s${toolsLanguage}\\}(.*?)\\{mlang\\}`, 's')
    // Find the first match for the targeted language
    let match = pattern.exec(answer);
    // If a match is found, extract the content; otherwise, handle no match
    let result = match ? match[1] : answer;
    // console.log("Result of specific language = ", result);
    return result
}
function cleanText(text) {
    // Regular expression to remove "a)", "b)", etc. from the text
    let text_specific_language = extractAnswerByLang(text);
    //console.log("text_specific_language: ", text_specific_language);
    return text_specific_language.replace(/^\s*[a-zA-Z]\)\s*/g, '').trim(); // Removes leading "a)", "b)", etc.
}

function generateTextList(forest) {
    console.log("forest: ", forest);
    const output = [];
    //let counter = 1;

    // Helper function to generate a sentence for the second-level nodes
    function processSecondLevel(node, parentGoalName, parentGoal) {
        // Check if the node has children and if it's an array
        if (node.children && Array.isArray(node.children)) {
            // Collect all the third-level items (e.g., "amount", "time") for this second-level item
            // const groupedItems = node.children.map(child => {
            //     return cleanText(child.value.split(" -> ")[1]).toLowerCase();; // Get the child value which will contain the third-level details
            // });
            //
            // // Format and push the grouped sentence for the second-level items
            // if (groupedItems.length > 0) {
            //     console.log("$$$$$groupedItems: ", groupedItems);
            //     output.push(`${parentGoal} ${groupedItems.join(" ")}`);
            // }

            let amount_value = '';
            let time_value = '';

            // Iterate through children to categorize items into "amount" and "time"
            node.children.forEach(child => {

                const childName = cleanText(child.value.split(" -> ")[0]).toLowerCase();
                const childValue = cleanText(child.value.split(" -> ")[1]).toLowerCase();  // Clean the child value

                if (childName.includes("amount")) {
                    amount_value = childValue;  // If it's amount-related, push to amountItems
                } else if (childName.includes("time")) {
                    time_value = childValue;  // If it's time-related, push to timeItems
                }
                else{
                    console.log("Not time or amount either!")
                }
            });
            output.push(`${amount_value} ${parentGoal} ${time_value}`);

            // // Format and push the grouped sentence for the second-level items
            // if (amountItems.length > 0 || timeItems.length > 0) {
            //     console.log("$$$$$amountItems:", amountItems);
            //     console.log("$$$$$timeItems:", timeItems);
            //
            //     // Concatenate amountItems, parentGoal, and timeItems in the desired order
            //     const result = `${amountItems.join(", ")} ${parentGoal} ${timeItems.join(", ")}`;
            //     output.push(result);
            // }

        } else {
            console.log("No children found for node:", parentGoal);
        }
    }

    // Traverse the roots of the forest (top-level nodes)
    forest.roots.forEach(root => {
        // Check if root has children and if it's an array
        if (root.children && Array.isArray(root.children)) {
            // Process the root node (level 1)
            output.push(`Your ${cleanText(root.value.split(" -> ")[0])} goal is ${cleanText(root.value.split(" -> ")[1])}`);

            // Now, process the second-level nodes (children of the root)
            root.children.forEach(secondLevelNode => {
                // Extract the second-level goal (e.g., "Cognition", "MC", etc.)
                const secondLevelGoalName = secondLevelNode.value.split(" -> ")[0];
                const secondLevelGoal = cleanText(secondLevelNode.value.split(" -> ")[1]);

                // console.log("secondLevelGoalName: ", secondLevelGoalName);
                // console.log("secondLevelGoal: ", secondLevelGoal);
                // Format the third-level details (amount, time)
                processSecondLevel(secondLevelNode, secondLevelGoalName, secondLevelGoal);
            });
        } else {
            console.log("No children found for root node:", root.value);
        }
    });
    return output;
}

class TreeNode {
    constructor(value) {
        this.value = value; // The value of the node
        this.children = []; // An array to hold child nodes
    }

    // Method to add a child node
    addChild(childNode) {
        this.children.push(childNode);
    }

    // Method to find a node by value (depth-first search)
    findNode(value) {
        if (this.value === value) {
            return this; // Return the current node if it matches
        }

        for (const child of this.children) {
            const result = child.findNode(value); // Recur on child nodes
            if (result) {
                return result; // Return the found node
            }
        }

        return null; // Return null if not found
    }

//    // Method to traverse the tree (for demonstration)
//    traverse(callback) {
//        callback(this.value); // Process the current node
//        this.children.forEach(child => child.traverse(callback)); // Recur for children
//    }
    traverse(callback, level = 0) {
        // Create an indented string based on the level
        const indent = ' '.repeat(level * 4); // 4 spaces per level
        const formattedValue = `${indent}${this.value}`; // Indent and format the value
        callback(formattedValue); // Call the callback with the formatted value
        this.children.forEach(child => child.traverse(callback, level + 1)); // Recur for children
    }
}

// Tree class to manage the overall tree structure
class Forest {
    constructor() {
        this.roots = []; // Initialize with an empty array of root nodes
    }

    // Method to add a new root node
    addRoot(value) {
        const newRoot = new TreeNode(value);
        this.roots.push(newRoot);
    }

    // Method to find a parent node for a new child
    findParentNode(parentValue) {
        for (const root of this.roots) {
            const parentNode = root.findNode(parentValue);
            if (parentNode) {
                return parentNode; // Return the first found parent node
            }
        }
        return null; // Return null if not found
    }

    // Method to add a new child node
    addChild(parentValue, childValue) {
        const parentNode = this.findParentNode(parentValue); // Find the parent node
        if (parentNode) {
            const newNode = new TreeNode(childValue); // Create a new child node
            parentNode.addChild(newNode); // Add the child node to the parent
        } else {
            console.log(`Parent node with value "${parentValue}" not found.`);
        }
    }

//    // Method to traverse the forest
//    traverse(callback) {
//        this.roots.forEach(root => root.traverse(callback)); // Traverse each root
    //    }
    // Method to traverse the forest and format output
    traverse(callback) {
        this.roots.forEach(root => root.traverse(callback)); // Traverse each root
    }
}



function restructureData2(data) {
    const structured = {};
    for (const key in data) {
        if (Array.isArray(data[key])) {
            structured[key] = new Forest();
            const allItems = {};
            data[key].forEach(item => {
                if (item.dependency === "none") {
                    // This is a top-level parent; initialize in the structured object
                    //console.log("@@@@@item.choiceContent: ", item.choicecontent)
                    structured[key].addRoot(item.questionName+" -> "+ item.choiceContent)
                } else {
                    structured[key].addChild(item.dependency,item.questionName+" -> "+ item.choiceContent)
                }
            });
        }
    }
    return structured;
}

let goal_text_list = [];
showProcessVisualToolBtn.onclick = function (e) {
    stopEventPropagation(e);
    if (useAnnotationTool) hideAnnotationToolbox(); // 隐藏annotation toolbox，当点击其他按钮时候
    collapseProcessVisual.classList.toggle("in-tools");
    toolsAndEssayToggle(collapseProcessVisual);

    processVisualClickTargetObject = "SHOW_PROCESS_VISUAL_BTN";
    processVisualPageEvent = "MOUSE_CLICK";
    sendEventMessage("", getCurrentTimestamp(), "PROCESS_VISUAL", processVisualPageEvent, "PROCESS_VISUAL_CLICK", "PROCESS_VISUAL", processVisualClickTargetObject, "SHOW_PROCESS_VISUAL_BTN_CLICK", "", null);

    if (collapseProcessVisual.classList.contains("in-tools")) {
        setupProcessVisualTool();
    }
    // let courseId = 0;
    // let userId = 0;
    // let modelType = "maria";
    console.log("request real time process data from server");
    // 请求实时流程数据
    $.ajax({
        url: apiBaseUrl + "/real-time-srl-process/" + currentCourseId + "/" + userId + "/" + srlModel,
        type: 'GET',
        dataType: 'json',
        success: function (data, status) {
            if (status === "success") {
                console.log("real-time-process:", data);

                currentSrlProcessData = data.data.currentDurationVOList;
                previousSrlProcessData = data.data.previousDurationVOList;

                // 继续其他处理，如加载图表等
                // if (data.data !== 'undefined') {
                    loadProcessVisualTool();
                // }
            }
        }
    });


    $.get(apiBaseUrl + "/get-questionnaire-all-response",
        {
            courseId: typeof processVisualRelatedQuestionnaireCourseId === 'undefined' ? 0 : processVisualRelatedQuestionnaireCourseId,
            questionnaireName: typeof processVisualRelatedQuestionnaireName === 'undefined' ? '': processVisualRelatedQuestionnaireName,
            userId: userId,
        },
        function(data, status) {
            if (status === "success") {
                console.log("success getting questionnaire-response data process: ", data);
                if (data.data != null) {
                    processQuestionResponse(data.data);
                } else {
                    console.log("returned data is null!");
                }
            } else {
                console.log("fail to retrive data from database!");
            }
        });

};


collapseProcessVisual.onclick = function(e) {
    stopEventPropagation(e);
    sendEventMessage("", getCurrentTimestamp(), "PROCESS_VISUAL", "MOUSE_CLICK", "READ_PROCESS_VISUAL", "PROCESS_VISUAL", null, "CLICK", "", e);
};
collapseProcessVisual.onmousewheel = function(e) {
    stopEventPropagation(e);
    sendEventMessage("", getCurrentTimestamp(), "PROCESS_VISUAL", "MOUSE_WHEEL", "READ_PROCESS_VISUAL", "PROCESS_VISUAL", null, "NO_INSTANT_EVENT", "SCROLL_DIST:::" + e.deltaY, e);
};
collapseProcessVisual.onmousemove = function(e) {
    stopEventPropagation(e);
    mousePosition = generateMousePositionData(e, "READ_PROCESS_VISUAL", "PROCESS_VISUAL");
};
collapseProcessVisual.onmouseup = function(e) {
    stopEventPropagation(e);
    if (window.getSelection() != null && window.getSelection().toString().replace(/\n/g, '').length > 0) {
        let selectText = window.getSelection().toString();
        sendEventMessage("", getCurrentTimestamp(), "PROCESS_VISUAL", "MOUSE_SELECT_TEXT", "READ_PROCESS_VISUAL", "PROCESS_VISUAL", null, "SELECT_TEXT", "MOUSE_SELECT:::" + selectText, e);
    }
};

document.getElementById("process_visual_container1_previous").addEventListener("mousemove", function (e) {
    stopEventPropagation(e);
    mousePosition = generateMousePositionData(e, "READ_PROCESS_VISUAL_PREVIOUS", "PROCESS_VISUAL");
});

document.getElementById("process_visual_container2_current").addEventListener("mousemove", function (e) {
    stopEventPropagation(e);
    mousePosition = generateMousePositionData(e, "READ_PROCESS_VISUAL_CURRENT", "PROCESS_VISUAL");
});


function processQuestionResponse(data) {
    const treedata = restructureData2(data);

    console.log("restructureData: ", treedata);
    //console.log("restructureData: ", restructureData2(data.data));
    // console.log(Object.keys(treedata).length, " responses for ", processVisualRelatedQuestionnaireName, " are retrived for ", userId)
    let keys = Object.keys(treedata);
    if (keys.length === 0) {
        return;
    }
    let latest_response = treedata[keys[keys.length - 1]];
    console.log("latest_response:", latest_response);
    goal_text_list = generateTextList(latest_response);
    console.log("goal_text_list: ", goal_text_list.join('\n'));
    let converted_goal_text_list = goal_text_list.map(function(text) {
        // Convert the first letter to uppercase and the rest to lowercase
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    });

    console.log("converted_goal_text_list: ", converted_goal_text_list.join('\n'));
    updateTextDisplayArea(converted_goal_text_list);

    // currentEssayProductGoal_raw is the raw string of product goal like "{mlangen}xxxx{mlang} {mlang nl}xxxx{mlang}
    currentEssayProductGoal_raw = latest_response.roots[0].value.split(" -> ")[1];
    let tempRequestNumber = "1";
    if (currentEssayProductGoal_raw.toLowerCase().includes("relevance")) {
        tempRequestNumber = "1";
    } else if (currentEssayProductGoal_raw.toLowerCase().includes("main points")) {
        tempRequestNumber = "2";
    } else if (currentEssayProductGoal_raw.toLowerCase().includes("structure")) {
        tempRequestNumber = "3";
    }
    localStorage.setItem(userId + '-' + currentCourseId + "-currentEssayProductGoal", tempRequestNumber);
    currentEssayProductGoal = extractAnswerByLang(latest_response.roots[0].value.split(" -> ")[1]);

    console.log("currentEssayProductGoal: ", currentEssayProductGoal);
}

function getQuestionnaireResponse(){
    console.log("REQUEST get-questionnaire-response!");
    $.get(apiBaseUrl + "/get-questionnaire-all-response",
        {
            courseId: typeof processVisualRelatedQuestionnaireCourseId === 'undefined' ? 0 : processVisualRelatedQuestionnaireCourseId,
            questionnaireName: typeof processVisualRelatedQuestionnaireName === 'undefined' ? '': processVisualRelatedQuestionnaireName,
            userId: userId,
        },
        function(data, status) {
            if (status === "success") {
                console.log("success getting questionnaire-response data: ", data);
                if (data.data!=null){
                    processQuestionResponse(data.data);
                } else{
                    console.log("returned data is null!");
                }
            } else {
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

const categoryNameMap = {
    'MCO': 'Oriëntatie',
    'MCP': 'Plannen',
    'MCE': 'Evaluatie',
    'MCM': 'Monitoren',
    'HCEO': 'Schrijven',
    'LCF': 'Lezen',
    'LCR': 'Herlezen',
    // 'NOT_RECOGNIZED': 'Geen patroon',
    'NOT_RECOGNIZED': '-'
}

// 定义自定义颜色映射
const categoryColorMapPre = {
    'Oriëntatie': '#A6CEE3',
    'Plannen': '#1F78B4',
    'Monitoren': '#B2DF8A',
    'Lezen': '#E31A1C',
    'Herlezen': '#FB9A99',
    'Evaluatie': '#33A02C',
    'Schrijven': '#FF7F00',
    '-': '#e0e0e0',
};

const categoryColorMapCur = {
    'Oriëntatie': '#A6CEE3',
    'Plannen': '#1F78B4',
    'Monitoren': '#B2DF8A',
    'Lezen': '#E31A1C',
    'Herlezen': '#FB9A99',
    'Evaluatie': '#33A02C',
    'Schrijven': '#FF7F00',
    '-': '#e0e0e0',
};

function loadProcessVisualTool() {
    // 清除现有的 SVG 元素
    d3.select("#process_visual_container1_previous").selectAll("*").remove();
    d3.select("#process_visual_container2_current").selectAll("*").remove();



    // 获取所有唯一的类别
    // const uniqueCategories = Array.from(new Set([...srlProcessData1, ...data2].map(d => d.category)));
    const uniqueCategoriesPre = Array.from(new Set([...previousSrlProcessData].map(d => categoryNameMap[d.category])));
    const uniqueCategoriesCur = Array.from(new Set([...currentSrlProcessData].map(d => categoryNameMap[d.category])));

    // const uniqueCategoriesPre = ['Oriëntatie', 'Plannen', 'Monitoren', 'Lezen', 'Herlezen', 'Evaluatie', 'Schrijven', '-'];
    // const uniqueCategoriesCur = ['Oriëntatie', 'Plannen', 'Monitoren', 'Lezen', 'Herlezen', 'Evaluatie', 'Schrijven', '-'];
    // const categoryColorsPre = ['#A6CEE3', '#1F78B4', '#B2DF8A', '#E31A1C', '#FB9A99', '#33A02C', '#FF7F00', '#e0e0e0'];
    // const categoryColorsCur = ['#A6CEE3', '#1F78B4', '#B2DF8A', '#E31A1C', '#FB9A99', '#33A02C', '#FF7F00', '#e0e0e0'];
    //
    //
    // const categoryColorScalePre = d3.scaleOrdinal().domain(uniqueCategoriesPre).range(categoryColorsPre);
    // const categoryColorScaleCur = d3.scaleOrdinal().domain(uniqueCategoriesCur).range(categoryColorsCur);


    // 生成颜色比例尺
    const categoryColorsPre = uniqueCategoriesPre.map(category => categoryColorMapPre[category] || '#000000'); // 未定义颜色的类别默认黑色
    console.log("categoryColorsPre", categoryColorsPre);
    const categoryColorScalePre = d3.scaleOrdinal().domain(uniqueCategoriesPre).range(categoryColorsPre);
    //
    // // 生成颜色比例尺
    const categoryColorsCur = uniqueCategoriesCur.map(category => categoryColorMapCur[category] || '#000000'); // 未定义颜色的类别默认黑色
    const categoryColorScaleCur = d3.scaleOrdinal().domain(uniqueCategoriesCur).range(categoryColorsCur);

    // 绘制上方的柱状图（不显示图例）
    drawBarChart('#process_visual_container1_previous', previousSrlProcessData, totalDuration, categoryColorScalePre, uniqueCategoriesPre, false, 'Vorig'); //Previous

    // 绘制下方的柱状图（显示图例）
    drawBarChart('#process_visual_container2_current', currentSrlProcessData, totalDuration, categoryColorScaleCur, uniqueCategoriesCur, true, 'Huidig'); //Current
}

function drawBarChart(containerSelector, srlProcessData, totalDuration, categoryColorScale, uniqueCategories, showLegend, yAxisLabel) {

    console.log("categoryColorScale", categoryColorScale);
    console.log("uniqueCategories", uniqueCategories);

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
            if (d.category !== 'No_pattern' && d.category !== 'NOT_RECOGNIZED') {
                const currentColor = d3.select(this).attr("fill");
                const brighterColor = d3.color(currentColor).brighter(0.5);
                d3.select(this).attr("fill", brighterColor);
                d3.select(this).attr("original-fill", currentColor);
            }
        })


        .on("mousemove", function (event, d) {
            if (d.category !== 'No_pattern' && d.category !== 'NOT_RECOGNIZED') {
                const friendlyName = categoryNameMap[d.category] || d.category;  // 使用映射的值或默认到原始值
                d3.select("#tooltip")
                    .style("display", "block")
                    .style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY - 20) + "px")
                    .html(friendlyName);
            }
        })
        .on("mouseout", function (event, d) {
            if (d.category !== 'No_pattern' && d.category !== 'NOT_RECOGNIZED') {
                const originalColor = d3.select(this).attr("original-fill");
                d3.select(this)
                    .attr("fill", originalColor);
                d3.select("#tooltip").style("display", "none");
            }
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

        const uniqueCategoriesLegend = ['Oriëntatie', 'Plannen', 'Monitoren', 'Lezen', 'Herlezen', 'Evaluatie', 'Schrijven', '-'];

        const categoryColorsLegend = ['#A6CEE3', '#1F78B4', '#B2DF8A', '#E31A1C', '#FB9A99', '#33A02C', '#FF7F00', '#e0e0e0'];

        // 添加图例容器
        const legend = svg.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 12)
            .attr("text-anchor", "start")
            .attr("transform", `translate(0, ${height + 40})`) // 图例位置

            // 绑定数据并创建图例项
            .selectAll("g")
            .data(uniqueCategoriesLegend)
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
            .attr("fill", (d, i) => categoryColorsLegend[i]);

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


function myCallbackProcessVisual(contains, element) {
    let saveTime;
    let eventValue;

    if (contains) {
        saveTime = getCurrentTimestamp();
        processVisualInstantEvent = "OPEN";
        eventValue = "START_USE_TOOL:::" + saveTime;
        processVisualToolStartUseTime = saveTime;

        sendEventMessage("", saveTime, "PROCESS_VISUAL", processVisualPageEvent, "OPEN_PROCESS_VISUAL", "PROCESS_VISUAL", processVisualClickTargetObject, processVisualInstantEvent, eventValue, null);
    } else {
        if (processVisualInstantEvent !== "CLOSE") {
            saveTime = getCurrentTimestamp();
            processVisualInstantEvent = "CLOSE";
            if (processVisualToolStartUseTime === 0) {
                eventValue = "TOOL_USE_LENGTH:::ERROR-" + (saveTime - processVisualToolStartUseTime);
            } else {
                eventValue = "TOOL_USE_LENGTH:::" + (saveTime - processVisualToolStartUseTime);
            }
            sendEventMessage("", saveTime, "PROCESS_VISUAL", processVisualPageEvent, "CLOSE_PROCESS_VISUAL", "PROCESS_VISUAL", processVisualClickTargetObject, processVisualInstantEvent, eventValue, null);
        }
    }
    processVisualClickTargetObject = "NO_TARGET_OBJECT";
    processVisualPageEvent = "NO_PAGE_EVENT";
}

handleClassMutation(collapseProcessVisual, myCallbackProcessVisual);
