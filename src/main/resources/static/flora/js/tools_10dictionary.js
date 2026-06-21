function render() {
    // 1. Add the dictionary tool to the page
    let dictionaryToolHtml = `<!-- dictionary tool  --> 
    <!-- <script src="../static/flora/js/jquery.min.js" crossorigin></script>--> 
        <div class="my-horizontal-collapse-tools my-classification" id="dictionary-collapse">
           <div class="card card-body" style="height:100%;">
               <h3 class="mb-2">${dictionaryTitle}</h3>
               <div style="height:100%;overflow-y:auto;">
                   <div class="form-control" style="height:100%; word-wrap: break-word;white-space : normal; font-size:10pt; overflow: auto;" id="dictionary-textarea"></div>

               </div>
               <div class="input-group mt-2" id="dictionaryPanelBox">
                   <div class="input-group-text" id="btnGroupAddonDictionary">
                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-question-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/></svg>
        <!--               <div class="spinner-border spinner-border-sm d-none" id="chatgptPanelSpinner" role="status"><span class="visually-hidden">Loading...</span></div> -->
                   </div>
                   <input type="text" class="form-control" id="dictionaryPanelInput" placeholder="${dictionaryPanelInputPlaceholder}" aria-label="Input group example" aria-describedby="btnGroupAddonDictionary">
                   <button type="button" class="btn btn-outline-primary" id="dictionarySendQuestionBtn">${dictionarySendBtnText}</button>
               </div>
           </div>
        </div>`;
    $("body").append(dictionaryToolHtml);
}
render();

let collapseDictionary = document.querySelector("#dictionary-collapse");
toolList1.push(collapseDictionary);
let showDictionaryBtn = document.querySelector("#show-dictionary-btn");

let dictionaryPanelInput = document.querySelector("#dictionaryPanelInput");
let dictionarySendQuestionBtn = document.querySelector("#dictionarySendQuestionBtn");
let dictionaryTextarea = document.querySelector("#dictionary-textarea");

//This 4 variables are only used for tool open/close event
let dictionaryClickTargetObject = "NO_TARGET_OBJECT";
let dictionaryPageEvent = "NO_PAGE_EVENT";
let dictionaryInstantEvent = "CLOSE";
let dictionaryToolStartUseTime = 0;

function queryWord() {
    const inputValue = dictionaryPanelInput.value;
    const wordArray = inputValue.split(' ');

    if (wordArray.length > 4) {
        alert("The maximum number of query words is 4.");
        return ""
    }
    // console.log("--------------------查询的单词--------------------");
    // console.log(wordArray);
    if (inputValue.length > 0) {
        // Set the message panel to empty
        dictionaryPanelInput.value = "";
        const now = new Date();
        const timestamp = now.toLocaleTimeString();
        let safeQuestion = escapeHTML(inputValue);
        let replyHtml = generateQuestionHtml(safeQuestion, timestamp);
        $(dictionaryTextarea).append(replyHtml);

        // Show a processing sign
        const processingMessage = createProcessingMessage();
        $(dictionaryTextarea).append(processingMessage);
        $(dictionaryTextarea).scrollTop(dictionaryTextarea.scrollHeight);

        $.post(apiBaseUrl + "/dictionary", {
            userId: userId,
            keywords: JSON.stringify({keywords: wordArray}),
            courseId: currentCourseId
        }, function(data, status) {
            if (status === "success") {
                // Remove the processing sign
                $(processingMessage).remove();
                const timestamp = new Date().toLocaleTimeString();
                // console.log("dictionary");
                // console.log(data);
                // const resArray = data.data.result;
                // let resContent = "";
                // for(let i = 0; i < resArray.length; ++i) {
                //     resContent += resArray[i].translatedText;
                //     if(i != resArray.length - 1) {
                //         resContent += " ";
                //     }
                // }
                let replyHtml = generateAnswerHtml(data.data == null ? "dictionary error" : data.data, timestamp);
                $(dictionaryTextarea).append(replyHtml);
                $(dictionaryTextarea).scrollTop(dictionaryTextarea.scrollHeight);
            } else {
                // Remove the processing sign
                $(processingMessage).remove();
                alert("An error occurred while query your word.");
            }
        });

        return inputValue;
    }
}

// function createProcessingMessage() {
//     const timestamp = new Date().toLocaleTimeString();
//     const processingMessage = document.createElement("div");  // 此处必须要有一个dom 对象
//     processingMessage.innerHTML = generateAnswerHtml("Processing", timestamp);
//     return processingMessage;
// }

function setupDictionaryTool() {

    collapseDictionary.onclick = function(e) {
        stopEventPropagation(e);
        // console.log("collapseSearch click");
        // sendMyTraceDataPost("/trace-dictionary", getCurrentTimestamp(), "DICTIONARY", "MOUSE_CLICK", null, "CLICK", "", e); //当select text时候会触发，mouse down up click 事件
        sendEventMessage("", getCurrentTimestamp(), "DICTIONARY", "MOUSE_CLICK", subActionLabelMap["DICTIONARY_CLICK"], "DICTIONARY", null, "CLICK", "", e);
    };
    //当鼠标在搜索annotation框区域移动时候，所有移动和滚动行为都标注为 SEARCH_ANNOTATION
    collapseDictionary.onmousewheel = function(e) {
        stopEventPropagation(e);
        // mousewheelData.push(generateMouseWheelData(e, "DICTIONARY"));
        sendEventMessage("", getCurrentTimestamp(), "DICTIONARY", "MOUSE_WHEEL", "DICTIONARY", "DICTIONARY",null, "NO_INSTANT_EVENT", "SCROLL_DIST:::" + e.deltaY, e);
    };
    collapseDictionary.onmousemove = function(e) {
        stopEventPropagation(e);
        mousePosition = generateMousePositionData(e, "DICTIONARY", "DICTIONARY");
    };
    collapseDictionary.onmouseup = function(e) {
        stopEventPropagation(e);
        if (window.getSelection() != null && window.getSelection().toString().replace(/\n/g, '').length > 0) {
            let selectText = window.getSelection().toString();
            // sendMyTraceDataPost("/trace-dictionary", getCurrentTimestamp(), "DICTIONARY", "MOUSE_SELECT_TEXT", null, "SELECT_TEXT", "MOUSE_SELECT:::" + selectText, e);
            sendEventMessage("", getCurrentTimestamp(), "DICTIONARY", "MOUSE_SELECT_TEXT", subActionLabelMap["DICTIONARY_SELECT_TEXT"], "DICTIONARY", null, "SELECT_TEXT", "MOUSE_SELECT:::" + selectText, e);

            // console.log("send post for select text-------------------------------------" + selectText + "-------");
        }
    };


    let inputWord;
    dictionarySendQuestionBtn.onclick = function(e) {
        stopEventPropagation(e);
        // console.log("before query word");
        inputWord = queryWord();

        // sendMyTraceDataPost("/trace-dictionary", getCurrentTimestamp(), "DICTIONARY", "MOUSE_CLICK", "DICTIONARY_PANEL_SUBMIT_BTN", "SUBMIT_WORD", "SUBMIT:::" + inputWord, e);
        sendEventMessage("", getCurrentTimestamp(), "DICTIONARY", "MOUSE_CLICK", subActionLabelMap["DICTIONARY_SUBMIT_WORD"], "DICTIONARY", "DICTIONARY_PANEL_SUBMIT_BTN", "SUBMIT_WORD", "SUBMIT:::" + inputWord, e);
    }

    $("#dictionaryPanelInput").on("keypress", function(e) {
        if (e.which === 13) {
            e.preventDefault();
            inputWord = queryWord();
            // sendMyTraceDataPost("/trace-dictionary", getCurrentTimestamp(), "DICTIONARY", "KEY_STROKE", "DICTIONARY_PANEL_INPUT", "SUBMIT_WORD", "SUBMIT:::" + inputWord, e);
            sendEventMessage("", getCurrentTimestamp(), "DICTIONARY", "KEY_STROKE", subActionLabelMap["DICTIONARY_SUBMIT_WORD"], "DICTIONARY", "DICTIONARY_PANEL_INPUT", "SUBMIT_WORD", "SUBMIT:::" + inputWord, e);
        } else {
            // sendMyTraceDataPost("/trace-dictionary", getCurrentTimestamp(), "DICTIONARY", "KEY_STROKE", "DICTIONARY_PANEL_INPUT", "WRITE_WORD", "KEY:::" + e.key + "---" + e.code, e);
            sendEventMessage("", getCurrentTimestamp(), "DICTIONARY", "KEY_STROKE", subActionLabelMap["DICTIONARY_WRITE_WORD"], "DICTIONARY", "DICTIONARY_PANEL_INPUT", "WRITE_WORD", "KEY:::" + e.key + "---" + e.code, e);
        }
    });

    // console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
    // const es = new EventSource(apiBaseUrl + "/test-emitter");
    // es.onmessage = function(e) {
    //     console.log(e.data);
    // }
    // es.onerror = function(e) {
    //     if (e.readyState == EventSource.CLOSED) {
    //         console.log("连接关闭");
    //     } else {
    //         console.log(e);
    //         es.close();  // <--- 就是这里
    //     }
    // }
}

// let dictionaryToolUseLength = 0;

showDictionaryBtn.onclick = function(e) {
    // console.log("----------------------------------------show dictionary Btn clicked");
    stopEventPropagation(e);
    collapseDictionary.classList.toggle("in-tools");
    toolsAndEssayToggle(collapseDictionary);

    dictionaryClickTargetObject = "SHOW_DICTIONARY_BTN";
    dictionaryPageEvent = "MOUSE_CLICK";

    sendEventMessage("", getCurrentTimestamp(), "DICTIONARY", dictionaryPageEvent, subActionLabelMap["DICTIONARY_CLICK"], "DICTIONARY", dictionaryClickTargetObject, "SHOW_DICTIONARY_BTN_CLICK", "", null);
    // let instantEvent = "";
    // let eventValue = "";
    // let saveTime = getCurrentTimestamp();
    // if (collapseDictionary.classList.contains("in-tools")) {
    //     instantEvent = "OPEN";
    //     dictionaryToolUseLength = saveTime;
    //     eventValue = "START_USE_TOOL:::" + saveTime;
    // } else {
    //     instantEvent = "CLOSE";
    //     dictionaryToolUseLength = saveTime - dictionaryToolUseLength;
    //     eventValue = "TOOL_USE_LENGTH:::" + dictionaryToolUseLength;
    // }
    //
    // sendMyTraceDataPost("/trace-dictionary", saveTime, "DICTIONARY", "MOUSE_CLICK", "SHOW_DICTIONARY_BTN", instantEvent, eventValue, e);
};

function myCallbackDictionary(contains, element) {
    let saveTime;

    let eventValue;
    if (contains) {
        // console.log('Element with id:', element.id, 'has the "in-tools" class!');
        saveTime = getCurrentTimestamp();
        dictionaryInstantEvent = "OPEN";
        eventValue = "START_USE_TOOL:::" + saveTime;
        dictionaryToolStartUseTime = saveTime;
        // console.log('dictionaryToolStartUseTime:' + dictionaryToolStartUseTime);
        // sendMyTraceDataPost("/trace-dictionary", saveTime, "DICTIONARY", dictionaryPageEvent, dictionaryClickTargetObject, dictionaryInstantEvent, eventValue, null);
        sendEventMessage("", saveTime, "DICTIONARY", dictionaryPageEvent, subActionLabelMap["DICTIONARY_" + dictionaryInstantEvent], "DICTIONARY", dictionaryClickTargetObject, dictionaryInstantEvent, eventValue, null);

    } else {
        if (dictionaryInstantEvent !== "CLOSE") {
            // console.log('Element with id:', element.id, 'has not the "in-tools" class!');
            saveTime = getCurrentTimestamp();
            dictionaryInstantEvent = "CLOSE";
            if (dictionaryToolStartUseTime === 0) {
                eventValue = "TOOL_USE_LENGTH:::ERROR-" + (saveTime - dictionaryToolStartUseTime);
            } else {
                eventValue = "TOOL_USE_LENGTH:::" + (saveTime - dictionaryToolStartUseTime);
            }

            // console.log('dictionary tool use length:' + (saveTime - dictionaryToolStartUseTime));
            // sendMyTraceDataPost("/trace-dictionary", saveTime, "DICTIONARY", dictionaryPageEvent, dictionaryClickTargetObject, dictionaryInstantEvent, eventValue, null);
            sendEventMessage("", saveTime, "DICTIONARY", dictionaryPageEvent, subActionLabelMap["DICTIONARY_" + dictionaryInstantEvent], "DICTIONARY", dictionaryClickTargetObject, dictionaryInstantEvent, eventValue, null);

        } else {
            // console.log('Element with id:', element.id, 'is keep closed');
        }
    }
    dictionaryClickTargetObject = "NO_TARGET_OBJECT";
    dictionaryPageEvent = "NO_PAGE_EVENT";
}
handleClassMutation(collapseDictionary, myCallbackDictionary); //监听

function loadDictionaryHistory() {
    $.get(apiBaseUrl + "/load-dictionary-history/" + userId + "/" + currentCourseId, function(data, status) {
        if (status === "success") {
            const dict_history = data.data;
            // console.log(data);
            // console.log(dict_history);
            // Clear the handler box before displaying the new handler history
            $(dictionaryTextarea).empty();
            // 使用 generateQuestionHtml 和 generateAnswerHtml 进行重构，避免重复代码
            // Display the handler content as structured questions and responses
            dict_history.forEach(dict => {
                $(dictionaryTextarea).append(generateQuestionHtml(dict.queryText, new Date(parseInt(dict.queryTime, 10)).toLocaleTimeString()));
                $(dictionaryTextarea).append(generateAnswerHtml(dict.translatedText, new Date(parseInt(dict.responseTime, 10)).toLocaleTimeString()));

            });

            $(dictionaryTextarea).animate({ scrollTop: $(dictionaryTextarea).prop("scrollHeight")}, 1000);
        }
    });
}
