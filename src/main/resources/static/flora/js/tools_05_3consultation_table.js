// var consultationTableTitle = "填写表格";

function renderConsultationTable() {
    let fillingInstruction = "";
    switch (taskStage){
        case "stage1":
            fillingInstruction = "(请在病史采集过程中完成该表填写)";
            break;
        case "stage2":
            fillingInstruction = "(请在体格检查结果获取过程中完成该表填写)";
            break;
        case "stage3":
            fillingInstruction = "(请在辅助检查结果获取过程中完成该表填写)";
            break;
        default:
            fillingInstruction = "(请在临床推理过程中完成该表填写)";
            break;
    }

    let consultationTableHtml = `
  <div class="my-horizontal-collapse-tools my-consultation-table" style="width:90%;height: 92%" id="consultation-table-collapse">
    <div class="card card-body">
            <h5>临床推理对比分析表</h5>
      <span class="filling-consultation-table">${fillingInstruction}</span>

      <span id="last-save-time" style="font-size: 0.8em; color: gray;"></span>
      <button type="button" class="btn btn-close" style="position:absolute; right:20px;" aria-label="Close" id="close-consultation-table-btn"></button>

      <div class="table-scroll-wrapper" style="overflow-y:auto;">
        <table class="table table-bordered table-sticky" id="consultation-table">
          <thead>
            <tr>
              <th style="width:42px;text-align:center;">↕</th>
              <th style="width:40px;">可能性排序</th>  <!-- NEW 拖拽手柄列 -->
              <th>诊断</th>
              <th>支持点</th>
              <th>不支持点</th>
              <th>可能的阳性体征或检查结果</th>
              <th>操作</th>          <!-- NEW 操作列 -->
            </tr>
          </thead>
          <tbody>
            ${Array.from({length:3}).map((_, index) => `
                <tr>
                  <td class="drag-handle" style="text-align:center;cursor:grab;font-size: 30px;align-content: center">≡</td>
                  <td style="text-align:center;font-weight:bold;align-content: center" class="possibility-rank">${index + 1}</td>
                  <td><textarea class="form-control consultation-table-row" placeholder="请输入诊断"></textarea></td>
                  <td><textarea class="form-control consultation-table-row" placeholder="请输入支持点"></textarea></td>
                  <td><textarea class="form-control consultation-table-row" placeholder="请输入不支持点"></textarea></td>
                  <td><textarea class="form-control consultation-table-row" placeholder="请输入可能的阳性体征或检查结果"></textarea></td>
                  <td class="text-center" style="align-content: center;">
                  <button type="button" class="btn btn-sm btn-outline-danger p-1 row-del-btn" style="width: 30px; line-height:1.5; padding: 1px;" title="删除" style="">
                  <!-- SVG 图标代码保持不变 -->
         <svg t="1754882135452" viewBox="0 0 1024 1024" fill="currentColor" xmlns="http://www.w3.org/2000/svg" p-id="7256" width="18" height="18"><path d="M92.748283 203.507071h838.503434v44.140606H92.748283zM644.402424 115.238788v44.127677h44.127677V115.238788c0-24.384646-19.75596-44.127677-43.998384-44.127677h-265.050505a43.97899 43.97899 0 0 0-31.172525 12.916364 43.918222 43.918222 0 0 0-12.825859 31.211313v44.127677h44.127677V115.238788h264.791919z m0 0" fill="currentColor" p-id="7257"></path><path d="M203.073939 909.614545v-661.979798H158.946263V909.575758c0 24.410505 19.639596 44.179394 44.179394 44.179394h617.761616c24.410505 0 44.179394-19.639596 44.179394-44.179394V247.634747H820.926061v661.979798H203.073939z m0 0" fill="currentColor" p-id="7258"></path><path d="M313.412525 335.90303h44.127677V733.090909h-44.127677V335.90303z m176.523637 0h44.127676V733.090909H489.936162V335.90303z m176.523636 0h44.127677V733.090909h-44.127677V335.90303z m0 0" fill="currentColor" p-id="7259"></path></svg>
                  </button>
                  </td>
                </tr>`).join("")}
            </tbody>
        </table>
      </div>

      <div class="input-group d-flex justify-content-start mt-2">
        <button type="button" class="btn btn-outline-success me-4" id="add-row-btn">新增一行</button>  <!-- NEW -->
        <button type="button" class="btn btn-outline-primary me-4" id="submit-table-btn">保存</button>
        <button type="button" class="btn btn-outline-primary me-4" id="consultationGetScaffoldBtn">请教老师</button>
        <button type="button" class="btn btn-outline-danger me-4" id="consultationWritingFinishBtn">结束思考</button>
          ${(taskStage === "stage2") ?
        '<button type="button" class="btn btn-outline-info me-4" id="loadRelatedTableData">加载任务一数据</button>' :
        ''}
           ${(taskStage === "stage3") ?
        '<button type="button" class="btn btn-outline-info me-4" id="loadRelatedTableData">加载任务二数据</button>' :
        ''}
      </div>
    </div>
  </div>`;

    $("body").append(consultationTableHtml);

    // NEW: 如果没有引入 Sortable，则动态加载
    if (!window.Sortable) {
        console.log("手动加载 Sortable.js");
        const s = document.createElement("script");
        s.src = "/flora/js/Sortable.min.js";
        document.head.appendChild(s);
    }
}

renderConsultationTable();

let collapseConsultationTable = document.querySelector("#consultation-table-collapse");
toolList1.push(collapseConsultationTable);
let showConsultationTableBtn = document.querySelector("#show-consultation-table-btn");
let closeConsultationTableBtn = document.querySelector("#close-consultation-table-btn");
let submitConsultationTableBtn = document.querySelector("#submit-table-btn");
let consultationWritingFinishBtn = document.querySelector("#consultationWritingFinishBtn");
let consultationGetScaffoldBtn = document.querySelector("#consultationGetScaffoldBtn");
const loadRelatedTableDataBtn = document.querySelector("#loadRelatedTableData");


let consultationTableClickTargetObject = "NO_TARGET_OBJECT";
let consultationTablePageEvent = "NO_PAGE_EVENT";
let consultationTableInstantEvent = "CLOSE";
let consultationTableToolStartUseTime = 0;


if (loadRelatedTableDataBtn) {
    console.log("绑定加载相关任务数据按钮事件");
    loadRelatedTableDataBtn.onclick = function(e) {
        stopEventPropagation(e);
        // localStorage.setItem(`${userId}-${currentCourseId}-Consultation-Reflection-Data`, JSON.stringify(tableData));
        console.log("加载上次数据",relatedCourseIdMap[currentCourseId]);
        let tempTableData = localStorage.getItem(`${userId}-${relatedCourseIdMap[currentCourseId]}-Consultation-Reflection-Data`);
        tempTableData = JSON.parse(tempTableData);
        fillTable(tempTableData);
        // sendEventMessage("", getCurrentTimestamp(), "CONSULTATION_TABLE", "MOUSE_CLICK", "LOAD_RELATED_TABLE_DATA", "CONSULTATION_TABLE", null, "LOAD_RELATED", "", e);
    };
}

function getTableData() {
    const table = document.querySelector("#consultation-table");
    const headerEls = Array.from(table.querySelectorAll("thead th"));
    const headers = headerEls.map(th => th.textContent.trim());

    // NEW: 找到需要忽略的列索引（第1列“↕”、最后1列“操作”）
    const ignoreIdx = new Set();
    headerEls.forEach((th, i) => {
        const t = th.textContent.trim();
        if (t === "↕" || t === "操作") ignoreIdx.add(i);
    });

    const rows = table.querySelectorAll("tbody tr");
    const data = [];

    rows.forEach((row,rowIndex) => {
        const cells = row.querySelectorAll("td");
        const rowData = {};
        cells.forEach((cell, index) => {
            if (ignoreIdx.has(index)) return; // NEW: 跳过
            const header = headers[index];
            if (!header) return;
            if (header === "可能性排序") {
                rowData[header] = rowIndex + 1; // 直接用行号
            }
            else if (cell.querySelector("input")) {
                rowData[header] = cell.querySelector("input").value.trim();
            } else if (cell.querySelector("textarea")) {
                rowData[header] = cell.querySelector("textarea").value.trim();
            } else {
                rowData[header] = "";
            }
        });
        data.push(rowData);
    });

    return data;
}

function submitConsultTable() {
    console.log("submitConsultTable");
    // 1. 读取表格数据
    const tableData = getTableData(); // 你前面定义的读取方法
    const contentJson = JSON.stringify(tableData);
    console.log("提交的表格数据：", contentJson);

    // 2. 其他参数
    const timestamp = String(getCurrentTimestamp()); // 获取当前时间戳

    // 3. 发起POST请求
    $.post(apiBaseUrl + "/submit-consult-table", {
            userId: userId,
            courseId: currentCourseId,
            contentJson: contentJson,
            createdAt: timestamp
        },
        function(data, status) {
            if (status === "success") {
                // 你可以在这里做一些提示
                // alert("表格已成功保存！");
                updateMyGeneralToastText("Flora", "对比表格已成功保存！");
                myGeneralToast.show();
                // 更新最后保存时间显示
                const lastSaveTimeSpan = document.querySelector("#last-save-time");
                if (lastSaveTimeSpan) {
                    const formattedTime = new Date(parseInt(timestamp)).toLocaleString();
                    lastSaveTimeSpan.textContent = `(上次保存时间: ${formattedTime})`;
                }
                // 将数据存入 localStorage
                localStorage.setItem(`${userId}-${currentCourseId}-Consultation-Reflection-Data`, contentJson);
            } else {
                alert("保存失败，请重试！");
            }
        }
    );
}

function loadAndFillConsultTable() {
    $.get(apiBaseUrl + "/latest-consult-table", {
            userId: userId,
            courseId: currentCourseId
        },
        function(res, status) {
        console.log(res)
            if (status === "success" && res.status === 200 && res.data && res.data.contentJson) {
                const tableData = JSON.parse(res.data.contentJson);
                fillTable(tableData);

                // Update last save time
                if (res.data.createdAt) {
                    const lastSaveTimeSpan = document.querySelector("#last-save-time");
                    if (lastSaveTimeSpan) {
                        const formattedTime = new Date(parseInt(res.data.createdAt)).toLocaleString();
                        lastSaveTimeSpan.textContent = `(上次保存时间: ${formattedTime})`;
                    }
                }
                if (localStorage.getItem(`${userId}-${currentCourseId}-Consultation-Reflection-Finish-`+taskStage) === "true") {
                    lockConsultationReflectionUI();
                }

            } else {
                // 这里可以初始化空表或提示无历史数据
                console.log(res)
            }
        }
    );
}

function loadAndFillRelatedConsultTable() {


    let tableData = localStorage.getItem(`${userId}-${currentCourseId}-Consultation-Reflection-Data`);
    if (tableData=== null){
        $.get(apiBaseUrl + "/latest-consult-table", {
                userId: userId,
                courseId: relatedCourseIdMap[currentCourseId]
            },
            function(res, status) {
                console.log(res)
                if (status === "success" && res.status === 200 && res.data && res.data.contentJson) {
                    const tableData = JSON.parse(res.data.contentJson);
                    localStorage.setItem(`${userId}-${currentCourseId}-Consultation-Reflection-Data`, JSON.stringify(tableData));
                    fillTable(tableData);
                    console.log("从相关课程加载对比表格数据：", tableData);
                    // Update last save time
                    if (res.data.createdAt) {
                        const lastSaveTimeSpan = document.querySelector("#last-save-time");
                        if (lastSaveTimeSpan) {
                            const formattedTime = new Date(parseInt(res.data.createdAt)).toLocaleString();
                            lastSaveTimeSpan.textContent = `(上次保存时间: ${formattedTime})`;
                        }
                    }

                } else {
                    // 这里可以初始化空表或提示无历史数据
                    console.log(res)
                }
            }
        );
    }
}


function fillTable(tableData) {
    const table  = document.querySelector("#consultation-table");
    const tbody  = table.querySelector("tbody");
    const headers = Array.from(table.querySelectorAll("thead th")).map(th => th.textContent.trim());

    tbody.innerHTML = "";   // 清空原内容

    const makeCell = (header, value="") => {
        const td = document.createElement("td");

        if (header === "↕") {  // NEW: 拖拽手柄列
            td.className = "drag-handle";
            td.style.textAlign = "center";
            td.style.cursor = "grab";
            td.textContent = "≡";
            td.style.fontSize = "30px"; // 确保手柄大小一致
            td.style.alignContent = "center"; // 确保手柄垂直
            // font-size: 30px;align-content: center
            return td;
        }

        if (header === "操作") { // NEW: 操作列
            td.className = "text-center";
            td.style.alignContent = "center";
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "btn btn-sm btn-outline-danger row-del-btn"
            btn.style.lineHeight = "1.5";
            btn.style.width = "30px"; // 确保按钮宽度一致
            btn.style.padding = "1px"; // 去除内边距
            btn.title = "删除";
            btn.innerHTML = `
                     <svg t="1754882135452" viewBox="0 0 1024 1024" fill="currentColor" xmlns="http://www.w3.org/2000/svg" p-id="7256" width="18" height="18"><path d="M92.748283 203.507071h838.503434v44.140606H92.748283zM644.402424 115.238788v44.127677h44.127677V115.238788c0-24.384646-19.75596-44.127677-43.998384-44.127677h-265.050505a43.97899 43.97899 0 0 0-31.172525 12.916364 43.918222 43.918222 0 0 0-12.825859 31.211313v44.127677h44.127677V115.238788h264.791919z m0 0" fill="currentColor" p-id="7257"></path><path d="M203.073939 909.614545v-661.979798H158.946263V909.575758c0 24.410505 19.639596 44.179394 44.179394 44.179394h617.761616c24.410505 0 44.179394-19.639596 44.179394-44.179394V247.634747H820.926061v661.979798H203.073939z m0 0" fill="currentColor" p-id="7258"></path><path d="M313.412525 335.90303h44.127677V733.090909h-44.127677V335.90303z m176.523637 0h44.127676V733.090909H489.936162V335.90303z m176.523636 0h44.127677V733.090909h-44.127677V335.90303z m0 0" fill="currentColor" p-id="7259"></path></svg>
             `;

            td.appendChild(btn);
            return td;
        }

        if (header === "可能性排序") {
            td.style.textAlign = "center";
            td.style.fontWeight = "bold";
            td.style.alignContent = "center"; // 确保垂直居中
            td.className = "possibility-rank";
            td.textContent = "1"; // 默认值，会被updateRanks更新
            return td;
        } else {
            const ta = document.createElement("textarea");
            ta.className = "form-control consultation-table-row";
            ta.value = value;
            td.appendChild(ta);
        }
        return td;
    };

    const buildRow = (rowData = {}) => {
        const tr = document.createElement("tr");
        headers.forEach(h => tr.appendChild(makeCell(h, rowData[h] || "")));
        attachRowEvents(tr); // NEW: 绑定删除事件
        return tr;
    };

    // 填已有数据
    tableData.forEach(rowData => tbody.appendChild(buildRow(rowData)));

    // 不足 3 行时补空行
    for (let i = tableData.length; i < 3; i++) {
        tbody.appendChild(buildRow());
    }

    initSortableOnce(); // NEW: 初始化拖拽
}
// NEW: 只初始化一次拖拽
// 更新可能性排序列的排序号
function updateRanks() {
    const tbody = document.querySelector("#consultation-table tbody");
    const rows = tbody.querySelectorAll("tr");
    rows.forEach((row, index) => {
        const rankCell = row.querySelector(".possibility-rank");
        if (rankCell) {
            rankCell.textContent = index + 1;
        }
    });
}

// 修改拖拽初始化函数
let sortableInited = false;
function initSortableOnce() {
    if (sortableInited || !window.Sortable) return;
    const tbody = document.querySelector("#consultation-table tbody");
    Sortable.create(tbody, {
        handle: ".drag-handle",
        animation: 150,
        onEnd: function() {
            updateRanks(); //
            sendEventMessage("", getCurrentTimestamp(), "CONSULTATION_TABLE", "MOUSE_CLICK", "CONSULTATION_TABLE_DRAG_ROW", "CONSULTATION_TABLE", null, "DRAG_ROW_RANK", "", null);
        }
    });
    sortableInited = true;
    updateRanks(); // 初始化时也要更新排序号
}

// NEW: 绑定每行的删除按钮
function attachRowEvents(tr) {
    const delBtn = tr.querySelector(".row-del-btn");
    if (delBtn) {
        delBtn.onclick = function(e) {
            e.stopPropagation();
            tr.remove();
            sendEventMessage("", getCurrentTimestamp(), "CONSULTATION_TABLE", "MOUSE_CLICK", "CONSULTATION_TABLE_DELETE_ROW", "CONSULTATION_TABLE", tr, "DELETE_ROW", "", e);
            updateRanks(); // 删除行后更新排序号
        };
    }
}

// NEW: 新增一行
function addEmptyRow() {
    const table = document.querySelector("#consultation-table");
    const tbody = table.querySelector("tbody");
    const headers = Array.from(table.querySelectorAll("thead th")).map(th => th.textContent.trim());

    const tr = document.createElement("tr");
    headers.forEach(h => {
        const td = document.createElement("td");
        if (h === "↕") {
            td.className = "drag-handle";
            td.style.textAlign = "center";
            td.style.cursor = "grab";
            td.textContent = "≡";
            td.style.fontSize = "30px"; // 确保手柄大小一致
            td.style.alignContent = "center"; // 确保手柄垂直
        } else if (h === "操作") {
            td.className = "text-center";
            td.style.alignContent = "center";
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "btn btn-sm btn-outline-danger row-del-btn";
            btn.style.lineHeight = "1.5";
            btn.style.width = "30px"; // 确保按钮宽度一致
            btn.style.padding = "1px"; // 去除内边距
            btn.title = "删除";
            btn.innerHTML = `<svg t="1754882135452" viewBox="0 0 1024 1024" fill="currentColor" xmlns="http://www.w3.org/2000/svg" p-id="7256" width="18" height="18"><path d="M92.748283 203.507071h838.503434v44.140606H92.748283zM644.402424 115.238788v44.127677h44.127677V115.238788c0-24.384646-19.75596-44.127677-43.998384-44.127677h-265.050505a43.97899 43.97899 0 0 0-31.172525 12.916364 43.918222 43.918222 0 0 0-12.825859 31.211313v44.127677h44.127677V115.238788h264.791919z m0 0" fill="currentColor" p-id="7257"></path><path d="M203.073939 909.614545v-661.979798H158.946263V909.575758c0 24.410505 19.639596 44.179394 44.179394 44.179394h617.761616c24.410505 0 44.179394-19.639596 44.179394-44.179394V247.634747H820.926061v661.979798H203.073939z m0 0" fill="currentColor" p-id="7258"></path><path d="M313.412525 335.90303h44.127677V733.090909h-44.127677V335.90303z m176.523637 0h44.127676V733.090909H489.936162V335.90303z m176.523636 0h44.127677V733.090909h-44.127677V335.90303z m0 0" fill="currentColor" p-id="7259"></path></svg>
                 `;
            td.appendChild(btn);
        } else if (h === "可能性排序") {
            td.style.textAlign = "center";
            td.style.fontWeight = "bold";
            td.className = "possibility-rank";
            td.style.alignContent = "center"; // 确保垂直居中
            td.textContent = "1"; // 默认值，会被updateRanks更新
        } else {
            const ta = document.createElement("textarea");
            ta.className = "form-control consultation-table-row";
            td.appendChild(ta);
        }
        tr.appendChild(td);
    });

    attachRowEvents(tr);
    tbody.appendChild(tr);
    updateRanks(); // 添加行后更新排序号
}



function tableDataToText(data) {
    // 根据表头和data中的文字，拼出一个文本，优先级1，诊断为：，支持点为：，……,
    let text = "";
    data.forEach((row, index) => {
        // text += `可能性排序：${row["可能性排序"]}\n`;
        // text += `诊断为：${row["诊断"]}\n`;
        // text += `支持点为：${row["支持点"]}\n`;
        // text += `不支持点为：${row["不支持点"]}\n`;
        // text += `需补充的诊断依据（信息）：${row["需补充的诊断依据（信息）"]}\n\n`;
        // 内容不为空再加
        if (row['可能性排序']) {
            text += `可能性排序：${row["可能性排序"]}\n`;
        }
        if (row['诊断']) {
            text += `诊断为：${row["诊断"]}\n`;
        }
        if (row['支持点']) {
            text += `支持点为：${row["支持点"]}\n`;
        }
        if (row['不支持点']) {
            text += `不支持点为：${row["不支持点"]}\n`;
        }
        if (row['需补充的诊断依据（信息）']) {
            text += `需补充的诊断依据（信息）：${row["需补充的诊断依据（信息）"]}\n`;
        }

    });
    return text.trim();
}


showConsultationTableBtn.addEventListener("click", function (e) {
    // console.log("---------------------------- showConsultationBtn clicked");
    stopEventPropagation(e);
    if (useAnnotationTool){ hideAnnotationToolbox();}
    hideOtherTools(collapseConsultationTable);
    collapseConsultationTable.classList.toggle("in-tools");
    // consultationClickTargetObject  = "SHOW_CHATGPT_ASSESSMENT_BTN";
    consultationClickTargetObject  = "SHOW_CONSULTATION_WRITING_BTN";
    consultationPageEvent = "MOUSE_CLICK";

    // sendEventMessage("", getCurrentTimestamp(), "CONSULTATION_WRITING", consultationPageEvent, subActionLabelMap["CHATGPT_ASSESSMENT_CLICK"], "CHATGPT_ASSESSMENT", consultationClickTargetObject, "SHOW_CHATGPT_ASSESSMENT_BTN_CLICK", "", null);
    sendEventMessage("", getCurrentTimestamp(), "CONSULTATION_WRITING", consultationPageEvent, "CHATGPT_ASSESSMENT_CLICK", "CONSULTATION_WRITING", consultationClickTargetObject, "SHOW_CONSULTATION_WRITING_BTN_CLICK", "", null);

});



function setupConsultationTableTool() {
    collapseConsultationTable.onclick = function (e) {
        stopEventPropagation(e);
        sendEventMessage("", getCurrentTimestamp(), "CONSULTATION_TABLE", "MOUSE_CLICK", "CONSULTATION_TABLE_CLICK", "CONSULTATION_TABLE", null, "CLICK", "", e);
    };

    submitConsultationTableBtn.onclick = function (e) {
        stopEventPropagation(e);
        const tableData = getTableData();
        console.log("用户填写的数据：", tableData);
        console.log("转换后的文本：", tableDataToText(tableData));
        submitConsultTable();
        sendEventMessage("", getCurrentTimestamp(), "CONSULTATION_TABLE", "MOUSE_CLICK", "CONSULTATION_TABLE_SUBMIT", "CONSULTATION_TABLE", null, "SUBMIT", JSON.stringify(tableData), e);
    };

    // NEW: 新增一行
    const addRowBtn = document.querySelector("#add-row-btn");
    if (addRowBtn) {
        addRowBtn.onclick = function(e) {
            stopEventPropagation(e);
            addEmptyRow();
            initSortableOnce();
            sendEventMessage("", getCurrentTimestamp(), "CONSULTATION_TABLE", "MOUSE_CLICK", "CONSULTATION_TABLE_ADD_ROW", "CONSULTATION_TABLE", null, "ADD_ROW", "", e);
        };
    }

    closeConsultationTableBtn.onclick = function (e) {
        stopEventPropagation(e);
        collapseConsultationTable.classList.remove("in-tools");
        sendEventMessage("", getCurrentTimestamp(), "CONSULTATION_TABLE", "MOUSE_CLICK", "CONSULTATION_TABLE_CLOSE", "CONSULTATION_TABLE", null, "CLOSE", "", e);
    };

    loadAndFillConsultTable(); // 内含 fillTable -> initSortableOnce()
}

function myCallbackConsultationTable(contains,element) {
    let saveTime;

    let eventValue;
    if (contains) {
        // console.log('Element with id:', element.id, 'has the "in-tools" class!');
        saveTime = getCurrentTimestamp();
        consultationTableInstantEvent = "OPEN";
        eventValue = "START_USE_TOOL:::" + saveTime;
        consultationTableToolStartUseTime = saveTime;
        // console.log('consultationTableToolStartUseTime:' + consultationTableToolStartUseTime);
        // sendMyTraceDataPost("/trace-consultation-table", saveTime, "CONSULTATION_TABLE", consultationTablePageEvent, consultationTableClickTargetObject, consultationTableInstantEvent, eventValue, null);
        sendEventMessage("", saveTime, "CONSULTATION_TABLE", consultationTablePageEvent, "CONSULTATION_TABLE_" + consultationTableInstantEvent, "CONSULTATION_TABLE", consultationTableClickTargetObject, consultationTableInstantEvent, eventValue, null);
    } else {
        if (consultationTableInstantEvent !== "CLOSE") {
            // console.log('Element with id:', element.id, 'has not the "in-tools" class!');
            saveTime = getCurrentTimestamp();
            consultationTableInstantEvent = "CLOSE";
            if (consultationTableToolStartUseTime === 0) {
                eventValue = "TOOL_USE_LENGTH:::ERROR-" + (saveTime - consultationTableToolStartUseTime);
            } else {
                eventValue = "TOOL_USE_LENGTH:::" + (saveTime - consultationTableToolStartUseTime);
            }
            // console.log('consultation table tool use length:' + (saveTime - consultationTableToolStartUseTime));
            // sendMyTraceDataPost("/trace-consultation-table", saveTime, "CONSULTATION_TABLE", consultationTablePageEvent, consultationTableClickTargetObject, consultationTableInstantEvent, eventValue, null);
            sendEventMessage("", saveTime, "CONSULTATION_TABLE", consultationTablePageEvent, "CONSULTATION_TABLE_" + consultationTableInstantEvent, "CONSULTATION_TABLE", consultationTableClickTargetObject, consultationTableInstantEvent, eventValue, null);
        } else {
            // console.log('Element with id:', element.id, 'is keep closed');
        }

    }
    consultationTableClickTargetObject = "NO_TARGET_OBJECT";
    consultationTablePageEvent = "NO_PAGE_EVENT";

}

handleClassMutation(collapseConsultationTable, myCallbackConsultationTable); //监听
// handleClassMutation(collapseConsultationTable, myCallbackChatgpt); //监听

function autoSaveTableData() {
    // 替换为自动保存中……
    const lastSaveTimeSpan = document.querySelector("#last-save-time");
    if (lastSaveTimeSpan) {
        lastSaveTimeSpan.textContent = "(自动保存中……)";
    }
    const tableData = getTableData(); // Fetch table data
    const contentJson = JSON.stringify(tableData); // Convert data to JSON
    const timestamp = String(getCurrentTimestamp()); // Get current timestamp
    $.post(apiBaseUrl + "/submit-consult-table", {
            userId: userId,
            courseId: currentCourseId,
            contentJson: contentJson,
            createdAt: timestamp
        },
        function(data, status) {
            if (status === "success") {
                console.log("表格数据已自动保存！");
                const lastSaveTimeSpan = document.querySelector("#last-save-time");
                if (lastSaveTimeSpan) {
                    const formattedTime = new Date(parseInt(timestamp)).toLocaleString();
                    lastSaveTimeSpan.textContent = `(上次保存时间: ${formattedTime})`;
                }
            } else {
                console.error("自动保存失败，请检查网络连接！");
                const lastSaveTimeSpan = document.querySelector("#last-save-time");
                if (lastSaveTimeSpan) {
                    lastSaveTimeSpan.textContent = "(自动保存失败，请稍后手动保存)";
                    lastSaveTimeSpan.style.color = "red"; // Change color to red for error
                }
            }
        }
    );
}

// Start auto-save every 20 seconds
const autoSaveTimerId = setInterval(autoSaveTableData, 20000);

function lockConsultationReflectionUI () {
    /* 锁行 */
    document
        .querySelectorAll("#consultation-table .consultation-table-row")
        .forEach(el => {
            el.setAttribute("disabled", "disabled");
            el.classList.add("disabled");
        });

    /* 锁按钮 */
    [submitConsultationTableBtn,
        consultationGetScaffoldBtn,
        consultationWritingFinishBtn,
        document.querySelector("#add-row-btn")  // NEW: 禁用新增
    ].forEach(btn => {
        if (!btn) return;
        btn.disabled = true;
        btn.classList.add("disabled");
    });

    /* 停自动保存 */
    if (autoSaveTimerId) clearInterval(autoSaveTimerId);

    /* 停止拖拽（可选） */
    const tbody = document.querySelector("#consultation-table tbody");
    if (tbody && tbody._sortable) {              // 如果你想强行销毁，可改造 init 存引用
        try { tbody._sortable.option("disabled", true); } catch(e){}
    }

    /* 面板提示 */
    const span = document.querySelector("#last-save-time");
    if (span) {
        span.textContent = "(已结束思考)";
        span.style.color = "red";
    }
}

/* === 调用时机：数据填好之后再执行 === */
if (localStorage.getItem(
    `${userId}-${currentCourseId}-Consultation-Reflection-Finish`
) === "true") {
    // 1) 如果表格已经在 DOM，直接锁
    if (document.querySelector("#consultation-table")) {
        console.log("表格已存在，直接锁定 UI");
        lockConsultationReflectionUI();
    } else {
        // 2) 否则等表格渲染完成再锁
        console.log("等待表格渲染完成后锁定 UI");
        document.addEventListener("DOMContentLoaded", lockConsultationReflectionUI);
        // 或者把 lockConsultationReflectionUI() 放进 loadAndFillConsultTable() 的 success 回调里
    }
}
