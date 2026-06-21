function render() {
    let essayWritingToolHtml = `    <!-- 写作 侧边栏 -->
        <div id="collapseWriteEssay" class="my-horizontal-collapse-tools write-essay">
            <div class="card card-body" style="height:100%; min-height: 200px;">
                <h6 class="mb-2"><span style="float:left;">${essayTitle}</span> <span class="ms-5" style="font-size: 12pt;" id="write-essay-main-counter-span">0 words</span> <button type="button" class="btn btn-close" style="position:absolute; right:20px;" aria-label="Close" id="close-essay-btn"></button></h6>
                <!-- Create the toolbar container -->
                <div id="writeEssayToolbarMain">
                    <select class="ql-header"></select>
                    <button class="ql-bold"></button><button class="ql-italic"></button><button class="ql-underline"></button><button class="ql-link"></button><button class="ql-script" value="sub"></button><button class="ql-script" value="super"></button>
                    <button class="ql-list" value="ordered" ></button><button class="ql-list" value="bullet"></button>
                    <select class="ql-align"></select><button class="ql-direction" value="rtl"></button><button class="ql-indent" value="-1"></button><button class="ql-indent" value="+1"></button>
                    <!-- Button to insert math field -->
<!--                    <button id="insertMathFieldBtn" class="btn btn-info">Math</button>-->
                </div>
                <!-- Create the editor container -->
                <div id="writeEssayEditorMain" style="overflow: hidden"></div>
                <div><button class="mt-2 btn btn-secondary" id="writeEssayEditorMainSaveBtn">${essaySaveBtnText}</button></div>
            </div>
        </div>`;



    $("body").append(essayWritingToolHtml);

}
render();
//-------------------------------Essay writing tool-----------------------------------------

// Import Parchment from Quill for custom attribute keys
const Parchment = Quill.import('parchment');


let collapseWriteEssay = document.querySelector("#collapseWriteEssay");
let showWriteEssayBtn = document.querySelector("#showWriteEssayBtn");


let writeEssayToolbarMain = document.querySelector("#writeEssayToolbarMain");
let writeEssayEditorMainDiv = document.querySelector("#writeEssayEditorMain");
let writeEssayEditorMainSaveBtn = document.querySelector("#writeEssayEditorMainSaveBtn");

let closeEssayBtn = document.querySelector("#close-essay-btn");
let targetObject = "WRITE_ESSAY_BTN";

// let mathBtn = document.querySelector("#insertMathFieldBtn");
let lastKeyUpTimeKey = userId + "-" + currentCourseId + "-lastKeyUpTime";
let lastKeyUpTime = localStorage.getItem(lastKeyUpTimeKey); // 需要跨页面处理，所以放入localStorage
toolList1.push(collapseWriteEssay); //将写作工具添加到工具列表中

let prevText = "";
let userHasEditedEssay = false; // 标记当前标签页用户是否编辑过essay，用于控制跨标签页同步

function saveEssayContent() {
    let essaySaveTimestamp = getCurrentTimestamp();
    // 空内容不保存，防止覆盖其他标签页的有效数据
    if (mainEditor.getText().replace(/^[\s\n]+|[\s\n]+$/g, '').length === 0) return;

    $.post(apiBaseUrl + '/save-essay-content', {
        userId: userId,
        saveTime: essaySaveTimestamp,
        username: username == null ? getUsername() : username,
        url: getCurrentUrl(),
        essayContent: mainEditor.getText(),
        essayContentJson: JSON.stringify(mainEditor.getContents()),
        courseId: currentCourseId
    });
    localStorage.setItem(userId + "-" + currentCourseId + "myCurrentEssayContent", JSON.stringify(mainEditor.getContents()));
}

/* Deprecated - not used
function saveTimePointEssayContent(essaySaveTimestamp, timePointDesc) {
    return $.post(apiBaseUrl + '/save-essay-content-time-point', {
        userId: userId,
        saveTime: essaySaveTimestamp,
        username: username == null ? getUsername() : username,
        url: getCurrentUrl(),
        essayContent: mainEditor.getText(),
        courseId: currentCourseId,
        timePointDesc: timePointDesc
    });
}*/

function insertMathField(){
    const editor = document.getElementById('writeEssayEditorMain');
    const selection = window.getSelection();

     if (selection.rangeCount === 0) {
         // If there's no selection, create a new range at the end of the editor
         const range = document.createRange();
         range.selectNodeContents(editor);
         range.collapse(false); // Move to the end of the content
         selection.removeAllRanges();
         selection.addRange(range);
     }

     // Now get the range
     const range = selection.getRangeAt(0);

    const mathFieldDiv = document.createElement('div');
    mathFieldDiv.className = 'math-field'; // Add a class for styling (optional)
    mathFieldDiv.style.border = '1px solid #ccc'; // Optional styling
    mathFieldDiv.style.padding = '10px'; // Optional padding
    mathFieldDiv.style.margin = '10px 0'; // Optional margin

    range.insertNode(mathFieldDiv);

    // Append the new div to the editor
    $('#writeEssayEditorMain').append(mathFieldDiv);

    console.log("('#writeEssayEditorMain').append(mathFieldDiv)!");

    // Initialize MathQuill for the new div
    const MQ = MathQuill.getInterface(2);
    MQ.MathField(mathFieldDiv, {
        spaceBehavesLikeTab: true,
        handlers: {
            edit: function() {
                console.log(mathFieldDiv.latex()); // Log the LaTeX content
            }
        }
    });

    const newRange = document.createRange();
        newRange.selectNodeContents(mathFieldDiv);
        newRange.collapse(false); // Move the cursor to the end of the new field
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(newRange);

}

// essay, and process result will be saved in to database
function requestProcessEssayProduct(triggerEvent) {
    let tempRequestNumber = localStorage.getItem(userId + '-' + currentCourseId + "-currentEssayProductGoal");
    console.log("!!!!tempRequestNumber: ", tempRequestNumber);
    $.post(apiBaseUrl + "/analyse-essay-product", {
        userId: userId,
        courseId: currentCourseId,
        username: getUsername(),
        essay: mainEditor.getText(),
        processTime: getCurrentTimestamp(),
        triggerEvent: triggerEvent,
        questionnaireName: typeof processVisualRelatedQuestionnaireName === 'undefined' ? '': processVisualRelatedQuestionnaireName,
        requestNumber: typeof tempRequestNumber === 'undefined' ? "1" : tempRequestNumber
    }, function (data, status) {
        if (data.data != null) {
            console.log("requestProcessEssayProduct", data.data);
        } else {
            console.log("requestProcessEssayProduct failed", data);
        }
    });
}


/* 1. 需要的正则 / 工具函数 */
const END_PUNC = /[.!?。？！]/;                         // 句尾标点
const END_PUNC_ALL = /[.!?。？！]/g;

/* 返回文本里第一个不同字符的位置（若无则返回 -1） */
function firstDiff(oldStr, newStr){
    console.log("firstDiff oldStr: ", oldStr, "newStr: ", newStr);
    const len = Math.min(oldStr.length, newStr.length);
    for (let i = 0; i < len; i++){
        if (oldStr[i] !== newStr[i]) return i;
    }
    return oldStr.length === newStr.length ? -1 : len;
}

/* 根据任意字符下标，向前向后搜索句尾标点，提取整句 */
const SENTENCE_BOUNDARY = /[.!?。？！\n]/;
function getSentenceByPos(text, pos){
    // 向前找到上一个句尾（含换行，兼容无标点语言如泰语）
    let start = pos;
    while (start > 0 && !SENTENCE_BOUNDARY.test(text[start-1])) start--;
    // 向后找到下一个句尾
    let end = pos;
    while (end < text.length && !SENTENCE_BOUNDARY.test(text[end])) end++;
    // 把句尾标点也包含进去（含\n，确保 pendingEnd 越过边界，防止 stillInOld 误判）
    if (end < text.length) end++;
    return {
        sentence: text.slice(start, end).trim(),
        start: start,
        end: end
    };
}

function getSelectionOffsets(el){
    const sel = window.getSelection();
    if (!sel.rangeCount || !el.contains(sel.anchorNode)) return {start:0,end:0};

    const range  = sel.getRangeAt(0);
    const pre    = range.cloneRange();               // 选区开头之前的文本长度
    pre.selectNodeContents(el);
    pre.setEnd(range.startContainer, range.startOffset);
    const start  = pre.toString().length;

    const preEnd = range.cloneRange();               // 选区结尾之前的文本长度
    preEnd.selectNodeContents(el);
    preEnd.setEnd(range.endContainer, range.endOffset);
    const end    = preEnd.toString().length;
    return {start, end};
}
/* 2. 绑定事件 */
// const ed = document.getElementById('editor');
// const log = document.getElementById('log');


function setupEssayWritingMain(toolbarId, editorId) {
    let textChangeFlag = false;
    // define the custom attribute as a new instance of Parchment.Attributor.Attribute
    const DataSentenceAttr = new Parchment.Attributor.Attribute('data-sentence', 'data-sentence', {
        scope: Parchment.Scope.INLINE
    });
    
    // register in Quill
    Quill.register(
        {
            'attributors/attribute/datasetence': DataSentenceAttr,
            'formats/datasentence': DataSentenceAttr,
        },
        true
    )

    Quill.register('modules/counter', function(quill, options) {
        let container = document.querySelector(options.container);

        if (prevText.trim().length === 0) {
            prevText = quill.getText();
            console.log("setup prevText: ", prevText);
        }

        let idleTimer   = null;      // 1-秒“停顿”计时器
        let pendingSentence = '';     // “正在编辑”的句子
        let pendingStart   = 0;       // 该句子在文本中的起止下标
        let pendingEnd     = 0;
        const EDIT_IDLE_MS   = 5000;              // 超过 5 秒算编辑结束

        /* 粘贴检测：用原生 paste 事件给 text-change 打一个标记 */
        let pasteFlag  = false;
        let pasteCache = '';
        let pastePos   = 0;
        quill.root.addEventListener('paste', e => {
            pasteFlag  = true;
            pasteCache = (e.clipboardData || window.clipboardData).getData('text/plain');
            const pasteSel = quill.getSelection();
            pastePos = pasteSel ? pasteSel.index : Math.max(0, prevText.length - 1);
            // sendEventMessage("", getCurrentTimestamp(), "ESSAY", "PASTE_TEXT", subActionLabelMap["ESSAY_PASTE_TEXT"], "ESSAY", "ESSAY_EDITOR", "PASTE_TEXT", "PASTE_TEXT:::" + pasteText, e);
        });

        // 把上一句真正输出、并清理状态
        let lastFlushedContent = '';
        function flushPending(instantEvent){
            if (!pendingSentence) return;
            // 同一内容已发过，跳过（避免 OVER_SECONDS 之后 FINISHED 重复发同一句）
            if (pendingSentence === lastFlushedContent) {
                pendingSentence = '';
                pendingStart = 0;
                pendingEnd = 0;
                clearTimeout(idleTimer);
                idleTimer = null;
                return;
            }
            console.log('⌛ 超过' + EDIT_IDLE_MS + '毫秒没有修改的句子: ' + pendingSentence);
            console.log("发送服务器:", pendingSentence);
            sendEventMessage("", getCurrentTimestamp(), "ESSAY", "WRITE_SENTENCE", "WRITE_ESSAY", "ESSAY", "ESSAY_EDITOR", instantEvent, "WRITE_SENTENCE:::" + pendingSentence, null);
            lastFlushedContent = pendingSentence;
            pendingSentence = '';
            pendingStart = 0;
            pendingEnd = 0;
            clearTimeout(idleTimer);
            idleTimer = null;
        }

        quill.on('text-change', function(delta, oldDelta, source) {
            if (source !== 'user') return;  // ← 过滤掉 setContents 等 API 调用
            let text = quill.getText().trim();
            if (options.unit === 'word') {
                if (typeof toolsLanguage !== 'undefined' && (toolsLanguage === 'zh' || toolsLanguage === 'zh_tw' || toolsLanguage === 'zh_hk')) {
                    container.innerText = text.length + ' 字';
                } else if (typeof toolsLanguage !== 'undefined' && toolsLanguage === 'tha') {
                    container.innerText = text.length + '  ตัวอักษร';
                } else if (typeof toolsLanguage !== 'undefined' && toolsLanguage === 'ind') {
                    container.innerText = text.length + ' kata';
                } else {
                    container.innerText = text ? text.split(/\s+/).length + ' words' : '0 words';
                }
            } else {
                container.innerText = text.length + ' characters';
            }


            const curText = quill.getText();                       // 变更后的全文
            const diffPos = firstDiff(prevText, curText);          // 第一处不同
            const sel = quill.getSelection();                      // quill 的光标
            const caretAtEnd = !!sel && sel.index >= curText.length - 1; // quill 末尾有 '\n'
            const lastChar  = curText.trimEnd().slice(-1);


            // —— 判断这次变更是否“刚写完一句”（避免粘贴触发）
            const lastInsertedChar = (() => {
                if (!delta || !delta.ops) return null;
                for (let i = delta.ops.length - 1; i >= 0; i--) {
                    const op = delta.ops[i];
                    if (typeof op.insert === 'string' && op.insert.length) {
                        return op.insert.slice(-1);
                    }
                }
                return null;
            })();

            const justFinished = !pasteFlag &&
                caretAtEnd &&
                END_PUNC.test(lastChar) &&
                END_PUNC.test(lastInsertedChar);

            /******************** ③ “刚写完”一句话？（先判断，命中则跳过②） ********************/
            if (justFinished) {
                const result = getSentenceByPos(curText, Math.max(0, curText.length - 2));
                if (result.sentence.trim().length !== 0) {
                    console.log('✅ 刚写完的句子:', result.sentence);
                    // 可选：避免之后的 idle 定时器重复 flush
                    pendingSentence = '';
                    clearTimeout(idleTimer);
                    idleTimer = null;
                    // if (pendingSentence) flushPending("FINISH_SENTENCE");
                    sendEventMessage("", getCurrentTimestamp(), "ESSAY", "WRITE_SENTENCE", "WRITE_ESSAY", "ESSAY", "ESSAY_EDITOR", "FINISH_SENTENCE", "WRITE_SENTENCE:::" + result.sentence, null);
                } else {
                    console.log('input empty--------刚写完的句子----------');
                }
            }

            /******************** ② 句子变化检测（如果刚写完一句话或粘贴则不执行） ********************/
            if (!justFinished && !pasteFlag && diffPos !== -1) {
                const {sentence, start, end} = getSentenceByPos(curText, diffPos);

                if (sentence.trim().length !== 0) {
                    console.log('✏️ 正在编辑的句子:', sentence, start, end, diffPos);
                    if (pendingSentence) {
                        console.log("pendingSentence: ", "-------" + pendingSentence + "-------");
                        const stillInOld = diffPos >= pendingStart && diffPos < pendingEnd;
                        if (!stillInOld) flushPending("EDIT_SENTENCE_FINISHED");
                    }
                    pendingSentence = sentence;
                    pendingStart = start;
                    pendingEnd = end;

                    clearTimeout(idleTimer);
                    idleTimer = setTimeout(flushPending, EDIT_IDLE_MS, "EDIT_SENTENCE_OVER_SECONDS");
                } else {
                    console.log('input empty---------正在编辑的句子---------');
                }
            }

            /******************** ② 句子变化检测 ********************/
            /*
            if (diffPos !== -1) {                                   // 有变化
                const {sentence, start, end} = getSentenceByPos(curText, diffPos);

                if (sentence.trim().length !== 0) {
                    console.log('✏️ 正在编辑的句子:', sentence, start, end, diffPos);
                    // —— 判断是否跳出了上一句 ——
                    if (pendingSentence) {
                        console.log("pendingSentence: ", "-------" + pendingSentence + "-------");
                        const stillInOld = diffPos >= pendingStart && diffPos < pendingEnd;
                        if (!stillInOld) flushPending("EDIT_SENTENCE_FINISHED");
                    }
                    // —— 更新 pending 句 ——
                    pendingSentence = sentence;
                    pendingStart = start;
                    pendingEnd = end;

                    clearTimeout(idleTimer);
                    idleTimer = setTimeout(flushPending, EDIT_IDLE_MS, "EDIT_SENTENCE_OVER_SECONDS");
                } else {
                    console.log('input empty---------正在编辑的句子---------');
                }
            }*/

            /******************** ③ “刚写完”一句话？ ********************/
            /*
            if (sel){

                if (END_PUNC.test(lastChar) && caretAtEnd){
                    const result = getSentenceByPos(curText, curText.length - 2);

                    if (result.sentence.trim().length !== 0) {
                        console.log('✅ 刚写完的句子:', result.sentence);
                        console.log("写完句子   发送服务器", result.sentence);
                        sendEventMessage("", getCurrentTimestamp(), "ESSAY", "WRITE_SENTENCE", "WRITE_ESSAY", "ESSAY", "ESSAY_EDITOR", "FINISH_SENTENCE", "WRITE_SENTENCE:::" + result.sentence, null);
                    } else {
                        console.log('input empty--------刚写完的句子----------');
                    }
                }
            }*/

            /******************** ④ 粘贴处理 ********************/
            if (pasteFlag) {
                console.log('📋 粘贴文本:', pasteCache);
                const {sentence} = getSentenceByPos(prevText, pastePos);
                console.log('📋 粘贴影响到的句子:', sentence);
                console.log("粘贴文本   发送服务器", sentence + ' ' + pasteCache);
                sendEventMessage("", getCurrentTimestamp(), "ESSAY", "WRITE_SENTENCE", "WRITE_ESSAY", "ESSAY", "ESSAY_EDITOR", "PASTE_SENTENCE", "WRITE_SENTENCE:::" + sentence + ' ' + pasteCache, null);
                pasteFlag = false;
                pasteCache = '';
            }

            delta.ops.forEach(op => {
                if (op.insert) console.log('📋/⌨️ 插入:', op.insert);
                if (op.delete) console.log('🗑️ 删除字符数:', op.delete);
            });
            /* 更新历史文本 */
            prevText = curText;

            // change = change.compose(delta);

            textChangeFlag = true;
            userHasEditedEssay = true; // 标记当前标签页用户已编辑，停止从其他标签页同步

            // use together with teacher chat //TODO
            if (teacherChatWebsocket != null) {
                sendTeacherChatMessage(senderId, "Student editing the essay", receiverId, "editing");
            }

            saveEssayContent(); // 每次text change 都save essay
        });

        /******************** ⑦ selection-change：只移动光标也要结算 ********************/
        // 用 Quill 的 selection-change 代替原生 selectionchange：
        // Quill 保证 text-change 先于 selection-change 触发，pendingStart/pendingEnd 已是最新值；
        // range.index 与 pendingStart/pendingEnd 使用同一坐标系，不会产生偏移。
        quill.on('selection-change', function(range, oldRange, source) {
            if (!range || source !== 'user') return;
            if (!pendingSentence || pendingSentence.trim().length === 0) return;
            const pos = range.index;
            if (pos < pendingStart || pos > pendingEnd) {
                flushPending("EDIT_SENTENCE_CHANGE_SELECTION");
            }
        });
    });

    mainEditor = new Quill('#' + editorId, {
        modules: {
            toolbar: '#' + toolbarId,
            counter: {
                container: '#write-essay-main-counter-span',
                unit: 'word' //character word
            }
        },
        placeholder: essayWritingPlaceholder,
        theme: 'snow',
        bounds: document.body,
    });

    // close the spell check of the editor
    mainEditor.root.spellcheck = false;

    //TODO check 所有的弹出message
    setInterval(function() {
        if (textChangeFlag) {
            saveEssayContent();
            //TODO 弹出提示框
            textChangeFlag = false;
        }
    }, 30000); //每30秒 执行一次存储essay

    mainEditor.on("selection-change", function(range, oldRange, source) {
        let tempEventValue = "";
        let tempInstantEvent = "";
        if (range) {
            if (range.length === 0) { //FOCUS editor
                // console.log('User cursor is on', range.index);
                tempEventValue = "CURSOR_POSITION:::" + range.index;
                tempInstantEvent = "FOCUS";
            } else { // SELECT TEXT
                var text = mainEditor.getText(range.index, range.length);
                // console.log('User has highlighted', text);
                tempEventValue = "SELECTED_TEXT:::" + text;
                tempInstantEvent = "SELECT_TEXT";
            }
        } else { // BLUR
            // console.log('Cursor not in the editor');
            tempInstantEvent = "BLUR";
        }
        if (tempInstantEvent !== "BLUR") {
            // sendMyTraceDataPost("/trace-essay", getCurrentTimestamp(), "ESSAY", "MOUSE_CLICK", "ESSAY_EDITOR", tempInstantEvent, tempEventValue,  null);
            sendEventMessage("", getCurrentTimestamp(), "ESSAY", "MOUSE_CLICK", subActionLabelMap["ESSAY_" + tempInstantEvent], "ESSAY", "ESSAY_EDITOR", tempInstantEvent, tempEventValue,  null);
        }
    });


    // Store accumulated changes
    // let change = new Delta();
    // mainEditor.on('text-change', function(delta) {
    //     change = change.compose(delta);
    //
    // });

    /* Deprecated - not use
    let taskStartTimestamp = localStorage.getItem(`${userId}-${currentCourseId}-taskStartTimestamp`);
    taskStartTimestamp = Number(taskStartTimestamp);
    const SEVEN_MINUTES = 7 * 60 * 1000;
    const PREFIRE = 5 * 1000;              // 提前 5 s
    let timerId;

    function scheduleNextSave() {
        clearTimeout(timerId);               // 保险：避免重复定时器

        let now = getCurrentTimestamp();
        const elapsed = now - taskStartTimestamp;
        let minutes = Math.floor((now - taskStartTimestamp) / 60000) + 1;
        // 还剩多少毫秒到下一个 7 分钟整点
        let delay = SEVEN_MINUTES - (elapsed % SEVEN_MINUTES) - PREFIRE;

        // 如果已经进入“提前 5 秒”窗口，就跳到再下一个整点
        if (delay < 0) delay += SEVEN_MINUTES;
        console.log("init = -------scheduleNextSave delay: ", delay, minutes, "now - taskStartTimestamp:", (now - taskStartTimestamp) / 60000);
        timerId = setTimeout(() => {
            now = getCurrentTimestamp();
            minutes = Math.floor((now - taskStartTimestamp) / 60000) + 1;
            console.log("scheduleNextSave delay: ", delay, minutes);
            saveTimePointEssayContent(now, `${minutes} minutes`);
            scheduleNextSave();                // 递归排下一次
        }, delay);
    }
    scheduleNextSave(); // 启动定时器

    window.addEventListener('beforeunload', () => clearTimeout(timerId));

    // 可选：页面再次可见时重新矫正定时器，避免浏览器后台限流造成的漂移
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            scheduleNextSave();
        }
    });

     */


    writeEssayToolbarMain.onclick = function(e) {
        stopEventPropagation(e);

        // console.log("writeEssayToolbarMain");
        saveEssayContent();
        //修改essay 样式
        // sendMyTraceDataPost("/trace-essay", getCurrentTimestamp(), "ESSAY", "MOUSE_CLICK", null, "CHANGE_STYLE", "",  e);
        sendEventMessage("", getCurrentTimestamp(), "ESSAY", "MOUSE_CLICK", subActionLabelMap["ESSAY_CHANGE_STYLE"], "ESSAY", null, "CHANGE_STYLE", "",  e);
        // change = new Delta();
    };



    writeEssayEditorMainDiv.addEventListener("keydown", function(e) {

        //不需要阻止事件传播，在body level 不需捕获keyup事件
        // saveEssayContent();
        //敲击键盘，正在写essay
        // sendMyTraceDataPost("/trace-essay", getCurrentTimestamp(), "ESSAY", "KEYBOARD_STROKE", "ESSAY_EDITOR", "WRITE", "KEY:::" + e.key + "---" + e.code, e);
        sendEventMessage("", getCurrentTimestamp(), "ESSAY", "KEYBOARD_STROKE", subActionLabelMap["ESSAY_WRITE"], "ESSAY", "ESSAY_EDITOR", "WRITE", "KEY:::" + e.key + "---" + e.code, e);


        // change = new Delta();
        if (typeof allowEssayProductAnalysis != 'undefined' && allowEssayProductAnalysis) {
            if (lastKeyUpTime === null) {
                //如果localStorage 没有，就设置当前时间
                lastKeyUpTime = Date.now(); // 第一次 keyup 的时间
                localStorage.setItem(lastKeyUpTimeKey, lastKeyUpTime + "");
            } else {
                let currentKeyUpTime = Date.now();
                if (currentKeyUpTime - Number(lastKeyUpTime) > 3000) {

                    console.log("greater than 3 second----------------------------------");
                    requestProcessEssayProduct("ON_KEYSTROKE_OVER_3_SECONDS");
                } else {
                    console.log("less than 3 second----------------------------------");
                }
                lastKeyUpTime = currentKeyUpTime; //每次按键 都更新 lastKeyUpTime
                localStorage.setItem(lastKeyUpTimeKey, lastKeyUpTime + ""); //每次按键 都更新 lastKeyUpTime
            }
        }
    });

   /* writeEssayEditorMainDiv.addEventListener("paste", function(e) {

        //console.log("on paste in essay", e.clipboardData);
        let RawText = e.clipboardData.getData("text/plain");
        e.preventDefault();
        let pasteText = e.clipboardData.getData("text");

        document.execCommand('insertText', false, RawText);
        let pasteText = e.clipboardData.getData("text");
        // console.log("on paste in essay:", pasteText);
        saveEssayContent();
        // console.log(pasteText); //此处名称必须用text，其他会得到空值
        //手动粘贴文字到essay中
        // sendMyTraceDataPost("/trace-essay", getCurrentTimestamp(), "ESSAY", "PASTE_TEXT", "ESSAY_EDITOR", "PASTE_TEXT", "PASTE_TEXT:::" + pasteText, e);
        sendEventMessage("", getCurrentTimestamp(), "ESSAY", "PASTE_TEXT", subActionLabelMap["ESSAY_PASTE_TEXT"], "ESSAY", "ESSAY_EDITOR", "PASTE_TEXT", "PASTE_TEXT:::" + pasteText, e);
    });*/

    // mathBtn.onclick = function(e) {
    //     console.log("mathBtn clicked!")
    //     insertMathField();
    // }

    // //在essay 写作区域 显示highlight 文字的 解释框
    // $(writeEssayEditorMainDiv).on("mouseover", "span", function(e) {
    //     stopEventPropagation(e);
    //     console.log("mouseover span");
    //     let currentSpan = this;
    //
    //     setTimeout(function() {
    //         let backgroundColor = window.getComputedStyle(currentSpan, null).getPropertyValue("background-color");
    //
    //         if (backgroundColor.startsWith("rgb(")) {
    //             $(myToastText).html("<span style='font-size: 12pt; font-weight: bold;'>Recommend changes: In other words.</span><br/><span style='font-size: 11pt;'>Misuse example: That is the baseline, which selects one version of each file in the component.</span><br/><span style='font-size: 11pt;'>Paraphrase example: The baseline, in other words, selects one version of each file in the component.</span>");
    //             // myToastText.html("<span style='font-size: 12pt; font-weight: bold;'>Paraphrase Result:</span><br/><span style='font-size: 11pt;'>It has been established that formaldehyde is ubiquitously present within the cells of all vertebrates.</span>");
    //             showToastDivOnTargetItem(currentSpan);
    //         }
    //     }, 500);
    // }).on("mouseout", "span", function(e) {
    //     stopEventPropagation(e);
    //     hideToastDivWhenMouseOut();
    // });


    if (useWriteEssayWordCountButton) {
        //添加button
        let writeEssayWordCountButton = document.createElement('button');
        writeEssayWordCountButton.innerText = essayShowWordCountButtonText;
        writeEssayWordCountButton.id = 'write-essay-word-count-btn';

        writeEssayWordCountButton.classList.add("ms-5", "mt-2", "btn", "btn-secondary");
        writeEssayEditorMainSaveBtn.parentNode.appendChild(writeEssayWordCountButton);

        //隐藏 word count
        let writeEssayMainCounterSpan = document.querySelector("#write-essay-main-counter-span");
        writeEssayMainCounterSpan.classList.add("d-none");
        // 点击显示word count
        writeEssayWordCountButton.onclick = function(e) {
            stopEventPropagation(e);
            writeEssayMainCounterSpan.classList.remove("d-none");

            // sendMyTraceDataPost("/trace-essay", getCurrentTimestamp(), "ESSAY", "MOUSE_CLICK", "CHECK_WORD_COUNT_BTN", "CHECK_WORD_COUNT", "", e);
            sendEventMessage("", getCurrentTimestamp(), "ESSAY", "MOUSE_CLICK", subActionLabelMap["ESSAY_CHECK_WORD_COUNT"], "ESSAY", "CHECK_WORD_COUNT_BTN", "CHECK_WORD_COUNT", "", e);
            // 5秒后隐藏
            setTimeout(function () {
                writeEssayMainCounterSpan.classList.add("d-none");
            }, 2000);
        }
    }

    //手动 save essay 数据
    writeEssayEditorMainSaveBtn.onclick = function(e) {
        stopEventPropagation(e);


        updateMyGeneralToastText("Flora", essaySaveToastText);
        myGeneralToast.show();
        // Send entire document
        saveEssayContent();

        // sendMyTraceDataPost("/trace-essay", getCurrentTimestamp(), "ESSAY", "MOUSE_CLICK", "ESSAY_SAVE_BTN", "SAVE", "", e);
        sendEventMessage("", getCurrentTimestamp(), "ESSAY", "MOUSE_CLICK", subActionLabelMap["ESSAY_SAVE"], "ESSAY", "ESSAY_SAVE_BTN", "SAVE", "", e);
        // change = new Delta();
        // send essay save message to teacher //TODO
        if (teacherChatWebsocket !== null) {
            sendTeacherChatMessage(senderId, "Student saved the essay", receiverId, "essaysave");
        }
    };

    closeEssayBtn.onclick = function(e) {
        stopEventPropagation(e);
        targetObject = 'X_WRITE_ESSAY_BTN';
        showWriteEssayBtn.click();
        targetObject = "WRITE_ESSAY_BTN";
        if (teacherChatWebsocket !== null) {
            sendTeacherChatMessage(senderId, "Student close essay panel", receiverId, "unfocus");
        }
    };

    //当鼠标在写作框区域移动时候，所有移动和滚动行为都标注为WRITE_ESSAY
    collapseWriteEssay.onmousewheel = function(e) {
        stopEventPropagation(e);
        // mousewheelData.push(generateMouseWheelData(e, "WRITE_ESSAY"));
        sendEventMessage("", getCurrentTimestamp(), "ESSAY", "MOUSE_WHEEL", "READ_ESSAY", "ESSAY",null, "NO_INSTANT_EVENT", "SCROLL_DIST:::" + e.deltaY, e); //修改为READ_ESSAY
    };
    collapseWriteEssay.onmousemove = function(e) {
        stopEventPropagation(e);
        mousePosition = generateMousePositionData(e, "READ_ESSAY", "ESSAY"); //修改为READ_ESSAY
    };
    collapseWriteEssay.onclick = function(e) {
        stopEventPropagation(e);
        // console.log("collapseWriteEssay click");
        // sendMyTraceDataPost("/trace-essay", getCurrentTimestamp(), "ESSAY", "MOUSE_CLICK", null, "CLICK", "", e); //当select text时候会触发，mouse down up click 事件
        sendEventMessage("", getCurrentTimestamp(), "ESSAY", "MOUSE_CLICK", subActionLabelMap["ESSAY_CLICK"], "ESSAY", null, "CLICK", "", e);
    };
    collapseWriteEssay.onmouseup = function (e) {
        stopEventPropagation(e);
        // console.log("collapseWriteEssay select");
        if (window.getSelection() != null && window.getSelection().toString().replace(/\n/g, '').length > 0) {
            let selectText = window.getSelection().toString();
            // sendMyTraceDataPost("/trace-essay", getCurrentTimestamp(), "ESSAY", "MOUSE_SELECT_TEXT", null, "SELECT_TEXT", "MOUSE_SELECT:::" + selectText, e); //当select text时候会触发，mouse down up click 事件
            sendEventMessage("", getCurrentTimestamp(), "ESSAY", "MOUSE_SELECT_TEXT", subActionLabelMap["ESSAY_SELECT_TEXT"], "ESSAY", null, "SELECT_TEXT", "MOUSE_SELECT:::" + selectText, e);
        }
    }

    // 监听其他标签页的essay内容变化，实时同步到当前标签页
    // storage事件只在其他标签页修改localStorage时触发，不会在当前标签页触发，所以不会产生循环
    window.addEventListener('storage', function(e) {
        let essayKey = userId + "-" + currentCourseId + "myCurrentEssayContent";
        if (e.key === essayKey && e.newValue) {
            // 仅当当前标签页用户没有编辑过时，才从其他标签页同步内容
            if (!userHasEditedEssay) {
                mainEditor.setContents(JSON.parse(e.newValue));
                prevText = mainEditor.getText();
                console.log("从其他标签页同步essay内容");
            }
        }
    });
}
function loadRelatedCourseEssay(){
    console.log("loadRelatedCourseEssay");
    let essayContentJson = localStorage.getItem(userId + "-" + currentCourseId + "myCurrentEssayContent");

    if (essayContentJson === null || essayContentJson === '{"ops":[{"insert":"\\n"}]}') {
        // console.log("---------------load page: no CurrentEssayContent in localstorage");
        $.post(apiBaseUrl + "/load-essay-to-sidebar", {
            userId: userId,
            courseId: relatedCourseIdMap[currentCourseId],
            // url: getCurrentUrl(),
        }, function (data, status) {
            // console.log("---------------load-essay-to-sidebar----" + status);
            // console.log(data);
            // if (data.data != null && (typeof studyName === "undefined" || !studyName.startsWith("flora_unisa"))) {
            if (data.data != null) {
                essayContentJson = data.data.essayContentJson; //如果本地不存在，则从服务器获取
                localStorage.setItem(userId + "-" + currentCourseId + "myRelatedEssayContent", essayContentJson);
                mainEditor.setContents(JSON.parse(essayContentJson));
                prevText = mainEditor.getText();
                console.log("prevText---loadRelatedCourseEssay------------",prevText);
            }
            else {
                console.log("loadRelatedCourseEssay failed",data);
            }
        });
    }
    else if (essayContentJson.length > 0) {
        // console.log("---------------load page: CurrentEssayContent in localstorage and length > 0");
        mainEditor.setContents(JSON.parse(essayContentJson));
        prevText = mainEditor.getText();
        console.log("prevText------loadRelatedCourseEssay---------",prevText);
    }
}



function loadEssay() { //每次页面加载时候执行
    // 加载essay（使用sessionStorage，每个标签页独立，避免跨标签页冲突）
    let essayContentJson = localStorage.getItem(userId + "-" + currentCourseId + "myCurrentEssayContent");

    if (essayContentJson === null || essayContentJson === '{"ops":[{"insert":"\\n"}]}') {
        // console.log("---------------load page: no CurrentEssayContent in localstorage");
        $.post(apiBaseUrl + "/load-essay-to-sidebar", {
            userId: userId,
            courseId: currentCourseId
            // url: getCurrentUrl(),
        }, function (data, status) {
            // console.log("---------------load-essay-to-sidebar----" + status);
            // console.log(data);
            // if (data.data != null && (typeof studyName === "undefined" || !studyName.startsWith("flora_unisa"))) {
            if (data.data != null) {
                essayContentJson = data.data.essayContentJson; //如果本地不存在，则从服务器获取
                localStorage.setItem(userId + "-" + currentCourseId + "myCurrentEssayContent", essayContentJson);
                mainEditor.setContents(JSON.parse(essayContentJson));
                prevText = mainEditor.getText();
                console.log("prevText---------------",prevText);
            } else {
                if (typeof studyName !== "undefined" && studyName.startsWith("flora_unisa")) {
                    let initialEssayContentJson = "";
                    // switch (currentCourseId) {
                    //
                    // }
                    if (initialEssayContentJson !== "") {
                        localStorage.setItem(userId + "-" + currentCourseId + "myCurrentEssayContent", initialEssayContentJson);
                        mainEditor.setContents(JSON.parse(initialEssayContentJson));
                    }
                }

                // console.log("************************no CurrentEssayContent in server");
            }
        });
    } else if (essayContentJson.length > 0) {
        // console.log("---------------load page: CurrentEssayContent in localstorage and length > 0");
        mainEditor.setContents(JSON.parse(essayContentJson));
        prevText = mainEditor.getText();
        console.log("prevText---------------",prevText);
    }
}

let essayToolStartUseTime = 0;

showWriteEssayBtn.addEventListener("mousedown", function (e) {e.stopPropagation();});
showWriteEssayBtn.onclick = function (e) {
    // console.log("showWriteEssayBtn clicked");
    stopEventPropagation(e);
    // console.log("useAnnotationTool", useAnnotationTool,
    // "useScaffoldTool", useScaffoldTool,
    // "useWriteEssayTool", useWriteEssayTool,
    // "usePlannerTool", usePlannerTool,
    // "useChecklistTool", useChecklistTool,
    // "useChatgptTool", useChatgptTool,
    // "useDictionaryTool", useDictionaryTool,
    // "useTeacherChat", useTeacherChat,
    // "useTimerTool", useTimerTool);
    if (useAnnotationTool) hideAnnotationToolbox(); // 隐藏annotation toolbox，当点击其他按钮时候
    /*if ((typeof useAnnotationTool !== 'undefined' && useAnnotationTool && collapseSearch.classList.contains("in-tools")) ||
        (typeof useScaffoldTool !== 'undefined' && useScaffoldTool && collapseScaffolds.classList.contains("in-tools")) ||
        (typeof usePlannerTool !== 'undefined' && usePlannerTool && collapsePlanner2.classList.contains("in-tools")) ||
        (typeof useChecklistTool !== 'undefined' && useChecklistTool && collapseChecklist.classList.contains("in-tools")) ||
        (typeof useChatgptTool !== 'undefined' && useChatgptTool && collapseChatgpt.classList.contains("in-tools")) ||
        (typeof useDictionaryTool !== 'undefined' && useDictionaryTool && collapseDictionary.classList.contains("in-tools")) ||
        (typeof useTeacherChat !== 'undefined' && useTeacherChat && collapseTeacherchat.classList.contains("in-tools")) ||
        (typeof useChatgptAssistantTool !== 'undefined' && useChatgptAssistantTool && collapseChatgptAssistant.classList.contains("in-tools")) ||
        (typeof useChatgptAssistantTeacherTool !== 'undefined' && useChatgptAssistantTeacherTool && collapseChatgptAssistantTeacher.classList.contains("in-tools"))||
        (typeof useToeflAssistantTool !== 'undefined' && useToeflAssistantTool && collapseToeflAssistant.classList.contains("in-tools")) ||
        // (typeof agents !== 'undefined' && "Mayor" in agents && agents.Mayor.useSustainableEducationMayorTool && collapseAssistantMayor.classList.contains("in-tools")) ||
        // (typeof agents !== 'undefined' && "Peer" in agents && agents.Peer.useSustainableEducationPeerTool && collapseAssistantPeer.classList.contains("in-tools")) ||
        // (typeof agents !== 'undefined' && "Professor" in agents && agents.Professor.useSustainableEducationProfessorTool && collapseAssistantProfessor.classList.contains("in-tools")) ||
        // (typeof agents !== 'undefined' && "Whaler" in agents && agents.Whaler.useSustainableEducationWhalerTool && collapseAssistantWhaler.classList.contains("in-tools")) ||
        // (typeof agents !== 'undefined' && "Environmentalist" in agents && agents.Environmentalist.useSustainableEducationEnvironmentalistTool && collapseAssistantEnvironmentalist.classList.contains("in-tools")) ||
        // (typeof agents !== 'undefined' && "Tutor" in agents && agents.Tutor.useSustainableEducationTutorTool && collapseAssistantTutor.classList.contains("in-tools")) ||
        // multi agents multi window 和 essay 窗口联动有问题
        // (typeof useMultiAgentsMultiWindowsTool !== 'undefined' && useMultiAgentsMultiWindowsTool && collapseAgen.classList.contains("in-tools")) ||
        (typeof useMultiAgentsSingleWindowTool !== 'undefined' && useMultiAgentsSingleWindowTool && collapseMultiAgents.classList.contains("in-tools")) ||
        (typeof useGPTScaffoldTool !== 'undefined' && useGPTScaffoldTool && collapseGPTScaffolds.classList.contains("in-tools")) ||
        (typeof useMedicalScaffoldMultiAgentsSingleWindowTool !== 'undefined' && useMedicalScaffoldMultiAgentsSingleWindowTool && medicalScaffoldCollapseMultiAgents.classList.contains("in-tools")) ||
        (typeof useAssistCheckMultiAgentsSingleWindowTool !== 'undefined' && useAssistCheckMultiAgentsSingleWindowTool && assistCheckCollapseMultiAgents.classList.contains("in-tools")) ||
        (typeof useTigeCheckMultiAgentsSingleWindowTool !== 'undefined' && useTigeCheckMultiAgentsSingleWindowTool && tigeCheckCollapseMultiAgents.classList.contains("in-tools"))

    ) {
        if (collapseWriteEssay.classList.contains("in-tools")) {
            collapseWriteEssay.classList.remove("in-tools");
        }
        collapseWriteEssay.classList.toggle('in-tools-move-left');
    } else {
        if (collapseWriteEssay.classList.contains('in-tools-move-left')) {
            collapseWriteEssay.classList.toggle('in-tools-move-left');
        } else {
            collapseWriteEssay.classList.toggle('in-tools');
        }
    }*/
    activatePanelGeneral(collapseWriteEssay);


    let instantEvent = "";
    let eventValue = "";
    let saveTime = getCurrentTimestamp();
    if (collapseWriteEssay.classList.contains("in-tools") || collapseWriteEssay.classList.contains("in-tools-move-left")) {
        instantEvent = "OPEN";
        eventValue = "START_USE_TOOL:::" + saveTime;
        essayToolStartUseTime = saveTime;
    } else {
        instantEvent = "CLOSE";
        if (essayToolStartUseTime === 0) {
            eventValue = "TOOL_USE_LENGTH:::ERROR" + (saveTime - essayToolStartUseTime);
        } else {
            eventValue = "TOOL_USE_LENGTH:::" + (saveTime - essayToolStartUseTime);
        }
        if (typeof allowEssayProductAnalysis !== 'undefined' && allowEssayProductAnalysis) {
            requestProcessEssayProduct("ON_CLOSE_ESSAY_TOOL");
        }
    }
    //打开或关闭Essay 工具
    // sendMyTraceDataPost("/trace-essay", saveTime, "ESSAY", "MOUSE_CLICK", targetObject, instantEvent, eventValue, e);
    sendEventMessage("", saveTime, "ESSAY", "MOUSE_CLICK", subActionLabelMap["ESSAY_" + instantEvent], "ESSAY", targetObject, instantEvent, eventValue, e);


};
