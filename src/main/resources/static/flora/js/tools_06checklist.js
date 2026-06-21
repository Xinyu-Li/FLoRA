function render() {
    let checklistToolHtml = '<!-- checklist tool  --> ' +
    // <script src="../static/flora/js/jquery.min.js" crossorigin></script>
    `
        <div class="my-horizontal-collapse-tools my-classification" id="checklist-collapse">
        <div class="card card-body" style="height:100%;">
            <h3 class="mb-2" >${checklistTitle}</h3>
            <div style="height:80%;">
                <div class="form-control"
                    style="height:100%; word-wrap: break-word;white-space : normal; font-size:10pt;"
                    id="checklist-textarea">
                    <ul class="nav nav-tabs" id="checkListTab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button class="nav-link active" id="basic-writing-tab" data-bs-toggle="tab"
                                data-bs-target="#basic-writing-pane" type="button" role="tab"
                                aria-controls="basic-writing-pane" aria-selected="true">${checklistBasicPanelTitle}</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="academic-writing-tab" data-bs-toggle="tab"
                                data-bs-target="#academic-writing-pane" type="button" role="tab"
                                aria-controls="academic-writing-pane" aria-selected="false">${checklistAcademicPanelTitle}</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="originality-tab" data-bs-toggle="tab"
                                data-bs-target="#originality-pane" type="button" role="tab"
                                aria-controls="originality-pane" aria-selected="false">${checklistOriginalityPanelTitle}</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="integration-tab" data-bs-toggle="tab"
                                data-bs-target="#integration-pane" type="button" role="tab"
                                aria-controls="integration-pane" aria-selected="false">${checklistIntegrationPanelTitle}</button>
                        </li>
                    </ul>
                    <div class="tab-content" id="checklistTabContent">
                        <div class="tab-pane fade show active" id="basic-writing-pane" role="tabpanel"
                            aria-labelledby="basic-writing-tab" tabindex="0">This is Basic writing.</div>
                        <div class="tab-pane fade" id="academic-writing-pane" role="tabpanel"
                            aria-labelledby="profile-tab" tabindex="1">This is academic writing.</div>
                        <div class="tab-pane fade" id="originality-pane" role="tabpanel"
                            aria-labelledby="contact-tab" tabindex="2">This is originality</div>
                        <div class="tab-pane fade" id="integration-pane" role="tabpanel"
                            aria-labelledby="contact-tab" tabindex="3">This is Integration and elaboration</div>
                    </div>
                </div>
                <div class="checklist-foot mt-2">
                    <button title="Analysis your essay. Basic writing grammar may take 3~4 min." type="button" class="btn btn-primary" id="checklist-analysis-btn">${checklistAnalyseBtnText}</button>
                </div>
            </div>
        </div>
    </div>
    `;
    $("body").append(checklistToolHtml);
}
render();

let collapseChecklist = document.querySelector("#checklist-collapse");
toolList1.push(collapseChecklist);
let showChecklistBtn = document.querySelector("#show-checklist-btn");

let basicWritingTab = document.querySelector("#basic-writing-tab");
let academicWritingTab = document.querySelector("#academic-writing-tab");
let originalityTab = document.querySelector("#originality-tab");
let integrationTab = document.querySelector("#integration-tab");

let basicWritingPane = document.querySelector("#basic-writing-pane");
let academicWritingPane = document.querySelector("#academic-writing-pane");
let originalityPane = document.querySelector("#originality-pane");
let integrationPane = document.querySelector("#integration-pane");

let analysisBtn = document.querySelector("#checklist-analysis-btn");

let backupContent = null;
let activeTabName = "basicWriting";

//This 4 variables are only used for tool open/close event
let checklistClickTargetObject = "NO_TARGET_OBJECT";
let checklistPageEvent = "NO_PAGE_EVENT";
let checklistInstantEvent = "CLOSE";
let checklistToolStartUseTime = 0;

// timeout Duration 360s, 6min
let timeoutDuration = 600000;

if (!useChecklistToolGrammar) {
    basicWritingTab.parentElement.classList.add("d-none");
    basicWritingPane.classList.add("d-none");
}
if (!useChecklistToolAcademic) {
    academicWritingTab.parentElement.classList.add("d-none");
    academicWritingPane.classList.add("d-none");
}
if (!useChecklistToolOriginality) {
    originalityTab.parentElement.classList.add("d-none");
    originalityPane.classList.add("d-none");
}
if (!useChecklistToolClassification) {
    integrationTab.parentElement.classList.add("d-none");
    integrationPane.classList.add("d-none");
}

const tabNameMap = new Map([
    ["basicWriting", basicWritingTab],
    ["academicWriting", academicWritingTab],
    ["originality", originalityTab],
    ["integration", integrationTab],
]);

const paneNameMap = new Map([
    ["basicWriting", "basic-writing-pane"],
    ["academicWriting", "academic-writing-pane"],
    ["originality", "originality-pane"],
    ["integration", "integration-pane"]
]);

const tabPaneNameMap = new Map([
    ["basicWriting", basicWritingPane],
    ["academicWriting", academicWritingPane],
    ["originality", originalityPane],
    ["integration", integrationPane],
]);

const checklistResultMap = new Map([
    ["basicWriting", null],
    ["academicWriting", null],
    ["originality", null],
    ["integration", null],
]);

/**
high: remember and understanding
mid: apply and analyse
low: evaluate and create
*/

const levelStringMap = new Map([
    ["Low", 'Remember and understanding'],  // Light green
    ["Medium", 'Apply and analyse'],  // Orange
    ["High", 'Evaluate and create']  // Salmon
]);

const levelMap = new Map([
    ["High", '#c5e0b3'],
    ["Medium", '#fff3cd'],
    ["Low", '#f4b083']
]);

const highlightColorMap = {
    basicWriting: '#FFCECE', // Light red
    academicWriting: '#FFD700', // Gold
    originality: '#f8d7da', // Sky blue    alert danger  #f8d7da
    integration: levelMap
};

const noErrorCode = "No error";
const errorCodeMap = new Map([
    ["no error", noErrorCode],
    ["No error", noErrorCode], ["No Error", noErrorCode],
    ["N/A", noErrorCode], ["n/a", noErrorCode],
    ["n/A", noErrorCode], ["N/a", noErrorCode],
]);

function getEssay() {
    return mainEditor.getText();
}

/*function getCollaborate() {
    let body = collaborateInnerBody;
    // console.log(body);
    return $(collaborateInnerBody).text();
}*/

function searchSentence(sentence) {
    let essay = "";
    if (writeType == ESSAY_WRITING) {
        essay = getEssay();
    }
    /*else if (writeType == COLLABORATE_WRITE) {
        essay = getCollaborate();
    }*/
    let startPosition = essay.indexOf(sentence);
    let endPosition = -1;
    if (startPosition !== -1) {
        endPosition = startPosition + sentence.length - 1;
    }
    return {startPosition, endPosition};
}

function highlightSentence(sentence, color) {
    const position = searchSentence(sentence);
    const format = { background: color };
    if (position['startPosition'] !== -1) {
        mainEditor.formatText(position['startPosition'], sentence.length, format);
    }
}

function findWordInSentence(sentence, word) {
        let idx1 = sentence.indexOf(' ' + word);
        let idx2 = sentence.indexOf(word);
        if (idx1 >= 0) {
            return idx1 + 1;
        } else if (idx2 >= 0) {
            return idx2;
        } else {
            // console.log('Sentence:', sentence, 'Word:', word, 'in sentence not found...');
        }
    return -1;
}

function getHighlightElement(index) {
    let divList = collaborateInnerBody.querySelectorAll(".ace-line");
    let divResult = null;
    let spanResult = null;
    let divIndex = 0;
    let spanIndex = 0;
    for(let i = 0; i < divList.length; ++i) {
        let divTextLen = $(divList[i]).text().length;
        if (divTextLen > index) {
            divResult = divList[i];
            divIndex = i;
            break;
        }else {
            index -= divTextLen;
        }
    }
    if (divResult != null) {
        let spanList = divResult.querySelectorAll("span");
        for(let i = 0; i < spanList.length; ++i) {
            let spanTextLen = $(spanList[i]).text().length;
            if (spanTextLen > index) {
                spanResult = spanList[i];
                spanIndex = i;
                break;
            }else {
                index -= spanTextLen;
            }
        }
    }
    return {spanResult, index, divIndex, spanIndex};
}

function changeInnerHTML(spanObj, word, highLightNum) {
    let oldInnerHTML = spanObj.spanResult.innerHTML;
    const highLightElement = '<span style="background:red;">' + word + '</span>';
    let index = spanObj.index + (highLightNum-1) * (highLightElement.length - word.length);
    let newInnerHTML = oldInnerHTML.substring(0, index) + highLightElement + oldInnerHTML.substring(index + word.length);
    return newInnerHTML;
}

function highlightSentenceWord(sentence, word, color, num) {
    const position = searchSentence(sentence);
    if (position['startPosition'] !== -1) {
        let wordStart = findWordInSentence(sentence, word);
        if (wordStart >= 0) {
            // debugger; // 看一下index是否是错误单词在字符串中的下标位置
            let index = position['startPosition'] + wordStart;

            // if(writeType == ESSAY_WRITING) {
            //     const customAttributes = { 'background': color, 'data-sentence': sentence };
            //     const ops = [
            //         { 'retain': index },
            //         { 'retain': word.length, 'attributes': customAttributes },
            //     ];
            //     mainEditor.updateContents(ops);
            // }else if(writeType == COLLABORATE_WRITE) {
            //     let spanObj = getHighlightElement(index);
            //     const divIndex = spanObj.divIndex;
            //     const spanIndex = spanObj.spanIndex;
            //     const newInnerHTML= changeInnerHTML(spanObj, word, num);
            //     collaborateInnerBody.querySelectorAll(".ace-line")[divIndex].querySelectorAll("span")[spanIndex].innerHTML = newInnerHTML;
            //     // document.querySelectorAll(".ace-line")[0].querySelectorAll("span")[0].innerHTML = newInnerHTML;
            // }

            // console.log("------------word:" + word);
            // console.log(typeof word);
            // console.log(word.length);
            const customAttributes = { 'background': color, 'data-sentence': sentence };
            const ops = [
                { 'retain': index },
                { 'retain': word.length, 'attributes': customAttributes },
            ];
            mainEditor.updateContents(ops);
            mainEditor.formatText(index, word.length, customAttributes);

        }
    }
}

function highlightSentenceWordList(sentence, wordList, color) {
    const position = searchSentence(sentence);
    if (position['startPosition'] !== -1) {
        for (const word of wordList) {
            let wordStart = findWordInSentence(sentence, word);
            if (wordStart >= 0) {
                const customAttributes = { 'background': color, 'data-sentence': sentence };
                let index = position['startPosition'] + wordStart;
                mainEditor.formatText(index, word.length, customAttributes);
            }
        }
    }
}

function highlightBasicWritingResult() {
    // debugger;
    let basicWritingResult = checklistResultMap.get("basicWriting");
    if (basicWritingResult !== null) {
        if (writeType == ESSAY_WRITING) {
            restoreEssayContent();
        }
        let errorNum = 0;
        Object.keys(basicWritingResult).forEach((key) => {

            const value = basicWritingResult[key];
            const sentence = value.sentence.slice(3).trim();
            const errorPosition = errorCodeMap.get(value.errorPosition) || value.errorPosition;
            // debugger;
            if (errorPosition !== noErrorCode) {
                errorNum++;
                let word = errorPosition;
                if (errorPosition.indexOf("\"") >= 0) {
                    word = errorPosition.replaceAll("\"", "");
                }
                const color = highlightColorMap.basicWriting;
                highlightSentenceWord(sentence, word, color, errorNum);
            }
        });
    }
}

function highlightAcademicWritingResult() {
    let academicWritingResult = checklistResultMap.get("academicWriting");
    if (academicWritingResult !== null) {
        restoreEssayContent();
        Object.keys(academicWritingResult).forEach((key) => {
            const value = academicWritingResult[key];
            const sentence = value[0];
            const incorrectWord = value[1];
            const color = highlightColorMap.academicWriting;
            highlightSentenceWord(sentence, incorrectWord, color);
        });
    }
}

function highlightAcademicWritingResult2() {
    let academicWritingResult = checklistResultMap.get("academicWriting");
    if (academicWritingResult !== null) {
        restoreEssayContent();
        Object.keys(academicWritingResult).forEach((key) => {
            const valueList = academicWritingResult[key];
            const wordList = [];
            const sentence = valueList[0][0];
            for (const value of valueList) {
                let word = value[1].text;
                if (word.indexOf("\"") >= 0) {
                    word = word.replaceAll("\"", "");
                }
                wordList.push(word);
            }
            const color = highlightColorMap.academicWriting;
            highlightSentenceWordList(sentence, wordList, color);
        });
    }
}

const highlightAcademicWritingResultFunc = highlightAcademicWritingResult2;

function highlightOriginalityResult() {
    let originalityResult = checklistResultMap.get("originality");
    console.log("highlightOriginalityResult:", originalityResult);
    // originalityResult['scaffolding'] = ['scaffolding can play a huge role in teaching with the help of AI'];
    // originalityResult['teachers'] = ['teachers can arrange those students who have the same interests'];
    // originalityResult['role'] = ['AI will play a crucial role in education too'];

    if (originalityResult !== null) {
        restoreEssayContent();
        Object.keys(originalityResult).forEach((key) => {
            const value = originalityResult[key];
            const sentence = value[0];
            const color = highlightColorMap.originality;
            highlightSentence(sentence, color);
        });
    }
}

function highlightIntegrationResult() {
    let integrationResult = checklistResultMap.get("integration");
    if (integrationResult !== null) {
        restoreEssayContent();
        let writingInfo = eval(integrationResult);
        for (const value of writingInfo) {
            const sentence = value[0];
            let level = value[1];

            if (level.toLowerCase() === 'remember' || level.toLowerCase() === 'understanding') {
                level = 'Low';
            } else if (level.toLowerCase() === 'apply' || level.toLowerCase() === 'analyse') {
                level = 'Medium';
            } else if (level.toLowerCase() === 'evaluate' || level.toLowerCase() === 'create') {
                level = 'High';
            }

            const color = highlightColorMap.integration.get(level);
            highlightSentence(sentence, color);
        }
    }
}

// restore the essay content when checklist was closed
function restoreEssayContent() {
    mainEditor.formatText(0, getEssay().length, 'background', false);
    mainEditor.formatText(0, getEssay().length, 'data-sentence', false);
    mainEditor.formatText(0, getEssay().length, 'custom-attribute', false);
}

function showProcessingMessage(tabPane) {
    tabPane.innerHTML = `<div class="text-center mt-4">Processing...</div>`;
}

function showTimeoutMessage(tabPane) {
    tabPane.innerHTML = `<div class="alert alert-warning mt-4">Process timeout. Please try again.</div>`;
}

function showFailureMessage(tabPane, failureInfo) {
    tabPane.innerHTML = `<div class="alert alert-danger mt-4">Failure: ${failureInfo}</div>`;
}

function generateBasicSentenceResult(sentenceResult) {
    const sentenceText = sentenceResult.sentence.slice(3).trim();
    const errorPosition = errorCodeMap.get(sentenceResult.errorPosition) || sentenceResult.errorPosition;
    if (errorPosition !== noErrorCode) {
        const errorCorrection = errorCodeMap.get(sentenceResult.errorCorrection) || sentenceResult.errorCorrection;
        const errorExplanation = errorCodeMap.get(sentenceResult.errorExplanation) || sentenceResult.errorExplanation;
        const errorType = errorCodeMap.get(sentenceResult.errorType) || sentenceResult.errorType;
        let sentenceHTML = `
        <div class="card card-body alert alert-success mt-2">
            <div class="source-sentence">Sentence Text: ${sentenceText}</div>
            <div>Error Position: ${errorPosition}</div>
            <div>Error Correction: ${errorCorrection}</div>
            <div>Error Explanation: ${errorExplanation}</div>
            <div>Error Type: ${errorType}</div>
        </div>
        `;
        return sentenceHTML;
    } else {
        return ``;
    }
}

function generateAcademicSentenceResult(sentenceResult) {
    const sentenceText = sentenceResult[0];
    const incorrectWord = sentenceResult[1];
    const recommendChange = sentenceResult[2];
    const badExample = sentenceResult[3];
    const goodExample = sentenceResult[4];
    let sentenceHTML = `
    <div class="card card-body alert alert-success mt-2">
        <div class="source-sentence">Sentence: ${sentenceText}</div>
        <div>Incorrect Word: ${incorrectWord}</div>
        <div>Recommend Change: ${recommendChange}</div>
        <div>Bad Example: ${badExample}</div>
        <div>Good Example: ${goodExample}</div>
    </div>
    `;
    return sentenceHTML;
}

function generateAcademicSentenceResult2(valueList) {
    const sentenceText = valueList[0][0];
    let htmls = [];
    for (const value of valueList) {
        const incorrectWord = value[1].text;
        const recommendChange = value[2];
        const badExample = value[3];
        const goodExample = value[4];
        let infoHTML = `
            <div>Incorrect Word: ${incorrectWord}</div>
            <div>Recommend Change: ${recommendChange}</div>
            <div>Bad Example: ${badExample}</div>
            <div>Good Example: ${goodExample}</div>
        `;
        htmls.push(infoHTML);
    }
    let info = htmls.join('<br>');
    let sentenceHTML = `
    <div class="card card-body alert alert-success mt-2">
        <div class="source-sentence">Sentence: ${sentenceText}</div>
        ${info}
    </div>
    `;
    return sentenceHTML;
}

function generateOriginalitySentenceResult(sentenceResult) {
    const essaySentence = sentenceResult[0];
    const similarPart = sentenceResult[1];
    let sentenceHTML = `
    <div class="card card-body alert alert-danger mt-2">
        <div class="source-sentence">Essay Sentence: ${essaySentence}</div>
        <div>Similar Part: ${similarPart}</div>
    </div>
    `;
    return sentenceHTML;
}

function generateIntegrationSentenceResult(sentenceResult) {
    const sentenceText = sentenceResult[0];
    let level = sentenceResult[1];
    if (level.toLowerCase() === 'remember' || level.toLowerCase() === 'understanding') {
        level = 'Low';
    } else if (level.toLowerCase() === 'apply' || level.toLowerCase() === 'analyse') {
        level = 'Medium';
    } else if (level.toLowerCase() === 'evaluate' || level.toLowerCase() === 'create') {
        level = 'High';
    }

    const levelString = levelStringMap.get(level);
    const levelColor = levelMap.get(level);
    let sentenceHTML = `
    <div class="card card-body mt-2" style="background-color: ${levelColor};">
        <div class="source-sentence">Essay Sentence: ${sentenceText}</div>
        <div>Integration Level: ${levelString}</div>
    </div>
    `;
    return sentenceHTML;
}

function showBasicWritingResult(result) {
    console.log("showBasicWritingResult:", result);
    basicWritingPane.innerHTML = "";
    if (result) {
        Object.keys(result).forEach((key) => {
            const value = result[key];
            console.log("value-----" + value + "---key---" + key);
            const html = generateBasicSentenceResult(value);
            if (html !== ``) {
                $(basicWritingPane).append(html);
            }
        });
    }
}

function showAcademicWritingResult(result) {
    academicWritingPane.innerHTML = "";
    if (result) {
        Object.keys(result).forEach((key) => {
            const value = result[key];
            const html = generateAcademicSentenceResult(value);
            $(academicWritingPane).append(html);
        });
    }
}

function showAcademicWritingResult2(result) {
    console.log("showAcademicWritingResult2:", result);
    academicWritingPane.innerHTML = "";
    if (result) {
        Object.keys(result).forEach((key) => {
            const valueList = result[key];
            const html = generateAcademicSentenceResult2(valueList);
            $(academicWritingPane).append(html);
        });
    }
}

const showAcademicWritingResultFunc = showAcademicWritingResult2;

function showOriginalityResult(result) {
    console.log("showOriginalityResult:", result);
    // console.log(Object.entries(result).length === 0);
    console.log(typeof result);
    let tempResult;
    if (typeof result === "string") {
        tempResult = eval(result);
    } else {
        tempResult = result;
    }
    console.log("showOriginalityResult:", result);
    console.log(typeof result);
    if (tempResult) {
        if (Object.entries(tempResult).length === 0) {
            originalityPane.innerHTML = `
            <div class="card card-body alert alert-success mt-2">
                There is no originality error.
            </div>
            `;
        } else {
            originalityPane.innerHTML = "";
            Object.keys(tempResult).forEach((key) => {
                const value = tempResult[key];
                const html = generateOriginalitySentenceResult(value);
                $(originalityPane).append(html);
            });
        }
    }
}

function showIntegrationResult(result) {
    console.log("showIntegrationResult:", result);
    let writingInfo = eval(result);
    if (writingInfo) {
        integrationPane.innerHTML = "";
        for (const info of writingInfo) {
            const html = generateIntegrationSentenceResult(info);
            $(integrationPane).append(html);
        }
    }
}


const showResultFunctionMap = new Map([
    [basicWritingPane, showBasicWritingResult],
    [academicWritingPane, showAcademicWritingResultFunc],
    [originalityPane, showOriginalityResult],
    [integrationPane, showIntegrationResult],
]);

const highlightFunctionMap = new Map([
    [basicWritingPane, highlightBasicWritingResult],
    [academicWritingPane, highlightAcademicWritingResultFunc],
    [originalityPane, highlightOriginalityResult],
    [integrationPane, highlightIntegrationResult],
]);

const tabPaneUrlMap = new Map([
    [basicWritingPane, "/rule-base-check-grammar"],
    [academicWritingPane, "/rule-base-writing-checklist"],
    [originalityPane, "/rule-base-originality"],
    [integrationPane, "/rule-base-integration-and-elaboration"],
]);

const activeTabNameMap = new Map([
    ["basicWriting", "BASIC"],
    ["academicWriting", "ACADEMIC"],
    ["originality", "ORIGINALITY"],
    ["integration", "INTEGRATION"]
]);

function performRuleBasedCheck(tabName) {
    if(writeType == ESSAY_WRITING) {
        restoreEssayContent();
    }
    let tabPane = tabPaneNameMap.get(tabName);
    let essay = "";
    if(writeType == ESSAY_WRITING) {
        essay = getEssay();
    }
    /*else if(writeType == COLLABORATE_WRITE) {
        essay = getCollaborate();
    }*/
    showProcessingMessage(tabPane);
    let url = tabPaneUrlMap.get(tabPane);
    // Start the timer
    let timer = setTimeout(function() {
        // Handle the timeout scenario
        showTimeoutMessage(tabPane);
    }, timeoutDuration);

    const startTime = performance.now();
    // Send the AJAX request to the server
    $.ajax({
        url: apiBaseUrl + url,
        method: "POST",
        data: {
            essay: essay,
            userId: userId,
            courseId: currentCourseId
        },
        success: function(response) {
            // Clear the timer as the response is received
            clearTimeout(timer);

            const endTime = performance.now();
            const elapsedTime = (endTime - startTime).toFixed(2);
            // console.log(`${tabName} ajax request took ${elapsedTime}ms success.`);
            // Handle the successful response
            let results = response.data;

            // 调用各自的展示结果函数
            checklistResultMap.set(tabName, results);
            showResultFunctionMap.get(tabPane)(results);
            if (collapseChecklist.classList.contains("in-tools")) {
                highlightFunctionMap.get(tabPane)(results);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Clear the timer as the response is received
            clearTimeout(timer);

            const endTime = performance.now();
            const elapsedTime = (endTime - startTime).toFixed(2);
            // console.log(`${tabName} ajax request took ${elapsedTime}ms failed.`);

            // Handle any errors
            let failureInfo = "Failed to perform rulebase check, please try again.";
            showFailureMessage(tabPane, failureInfo);
        }
    });
}

function loadRuleBaseResultFromDB(tabName) {
    let tabPane = tabPaneNameMap.get(tabName);

    showProcessingMessage(tabPane);
    let url = tabPaneUrlMap.get(tabPane);

    // Start the timer
    let timer = setTimeout(function() {
        // Handle the timeout scenario
        showTimeoutMessage(tabPane);
    }, timeoutDuration);

    const startTime = performance.now();
    $.get(apiBaseUrl + url +"-db/" + userId + "/" + currentCourseId, function(response, status) {
        // Clear the timer as the response is received
        clearTimeout(timer);

        const endTime = performance.now();
        const elapsedTime = (endTime - startTime).toFixed(2);
        // console.log(`${tabName} ajax request took ${elapsedTime}ms success.`);
        // Handle the successful response
        // console.log(url + "-----------results", response.data);
        let results = response.data;
        // console.log(url + "----------parsed-results", response.data);
        // 调用各自的展示结果函数
        checklistResultMap.set(tabName, results);
        console.log(tabName + "result:", results);
        showResultFunctionMap.get(tabPane)(results);
    });
}  

function setupChecklistTool() {

    // backup the essay content
    backupContent = mainEditor.getContents();

    //页面加载时候发送请求获取rulebase结果
    for (const tabName of tabPaneNameMap.keys()) {

        loadRuleBaseResultFromDB(tabName)
        // performRuleBasedCheck(tabName);
    }



    collapseChecklist.onclick = function(e) {
        stopEventPropagation(e);
        // console.log("collapseSearch click");
        // sendMyTraceDataPost("/trace-checklist", getCurrentTimestamp(), "CHECKLIST", "MOUSE_CLICK", activeTabName, "CLICK_" + activeTabNameMap.get(activeTabName), "", e); //当select text时候会触发，mouse down up click 事件
        sendEventMessage("", getCurrentTimestamp(), "CHECKLIST", "MOUSE_CLICK", subActionLabelMap["CHECKLIST_CLICK_" + activeTabNameMap.get(activeTabName)], "CHECKLIST", activeTabName, "CLICK_" + activeTabNameMap.get(activeTabName), "", e);
    };
    //当鼠标在搜索annotation框区域移动时候，所有移动和滚动行为都标注为 SEARCH_ANNOTATION
    collapseChecklist.onmousewheel = function(e) {
        stopEventPropagation(e);
        // mousewheelData.push(generateMouseWheelData(e, "READ_" + activeTabNameMap.get(activeTabName) + "_CHECKLIST"));
        sendEventMessage("", getCurrentTimestamp(), "CHECKLIST", "MOUSE_WHEEL", "READ_" + activeTabNameMap.get(activeTabName) + "_CHECKLIST", "CHECKLIST",null, "NO_INSTANT_EVENT", "SCROLL_DIST:::" + e.deltaY, e);
    };
    collapseChecklist.onmousemove = function(e) {
        stopEventPropagation(e);
        mousePosition = generateMousePositionData(e, "READ_" +  + activeTabNameMap.get(activeTabName) +  + "_CHECKLIST", "CHECKLIST");
    };
    collapseChecklist.onmouseup = function(e) {
        stopEventPropagation(e);
        if (window.getSelection() != null && window.getSelection().toString().replace(/\n/g, '').length > 0) {
            let selectText = window.getSelection().toString();
            // sendMyTraceDataPost("/trace-checklist", getCurrentTimestamp(), "CHECKLIST", "MOUSE_SELECT_TEXT", activeTabName, "SELECT_TEXT_" + activeTabNameMap.get(activeTabName), "MOUSE_SELECT:::" + selectText, e);
            sendEventMessage("", getCurrentTimestamp(), "CHECKLIST", "MOUSE_SELECT_TEXT", subActionLabelMap["CHECKLIST_SELECT_TEXT_" + activeTabNameMap.get(activeTabName)], "CHECKLIST", activeTabName, "SELECT_TEXT_" + activeTabNameMap.get(activeTabName), "MOUSE_SELECT:::" + selectText, e);

            console.log("send post for select text-------------------------------------" + selectText + "-------");
        }
    };

    // when clicked, do highlight on essay writing tools
    basicWritingTab.onclick = function(e) {
        stopEventPropagation(e);
        // sendMyTraceDataPost("/trace-checklist", getCurrentTimestamp(), "CHECKLIST", "MOUSE_CLICK", "CHECKLIST_BASICWRITING_TAB", "CHANGE_TO_BASIC_WRITING", "", e);
        sendEventMessage("", getCurrentTimestamp(), "CHECKLIST", "MOUSE_CLICK", subActionLabelMap["CHECKLIST_CHANGE_TO_BASIC_WRITING"], "CHECKLIST", "CHECKLIST_BASICWRITING_TAB", "CHANGE_TO_BASIC_WRITING", "", e);

        // process basicWritingInfo
        // basicWritingPane.innerHTML = "";
        activeTabName = "basicWriting";
        highlightBasicWritingResult();
    }

    academicWritingTab.onclick = function(e) {
        stopEventPropagation(e);
        // sendMyTraceDataPost("/trace-checklist", getCurrentTimestamp(), "CHECKLIST", "MOUSE_CLICK", "CHECKLIST_ACADEMIC_WRITING_TAB", "CHANGE_TO_ACADEMIC_WRITING", "", e);
        sendEventMessage("", getCurrentTimestamp(), "CHECKLIST", "MOUSE_CLICK", subActionLabelMap["CHECKLIST_CHANGE_TO_ACADEMIC_WRITING"], "CHECKLIST", "CHECKLIST_ACADEMIC_WRITING_TAB", "CHANGE_TO_ACADEMIC_WRITING", "", e);

        highlightAcademicWritingResultFunc();
        activeTabName = "academicWriting";
    }

    originalityTab.onclick = function(e) {
        stopEventPropagation(e);
        // sendMyTraceDataPost("/trace-checklist", getCurrentTimestamp(), "CHECKLIST", "MOUSE_CLICK", "CHECKLIST_ORIGINALITY_TAB", "CHANGE_TO_ORIGINALITY", "", e);
        sendEventMessage("", getCurrentTimestamp(), "CHECKLIST", "MOUSE_CLICK", subActionLabelMap["CHECKLIST_CHANGE_TO_ORIGINALITY"], "CHECKLIST", "CHECKLIST_ORIGINALITY_TAB", "CHANGE_TO_ORIGINALITY", "", e);

        highlightOriginalityResult();
        activeTabName = "originality";
    }

    integrationTab.onclick = function(e) {
        stopEventPropagation(e);
        // sendMyTraceDataPost("/trace-checklist", getCurrentTimestamp(), "CHECKLIST", "MOUSE_CLICK", "CHECKLIST_INTEGRATION_TAB", "CHANGE_TO_INTEGRATION", "", e);
        sendEventMessage("", getCurrentTimestamp(), "CHECKLIST", "MOUSE_CLICK", subActionLabelMap["CHECKLIST_CHANGE_TO_INTEGRATION"], "CHECKLIST", "CHECKLIST_INTEGRATION_TAB", "CHANGE_TO_INTEGRATION", "", e);

        highlightIntegrationResult();
        activeTabName = "integration";
    }

    analysisBtn.onclick = function(e) {
        stopEventPropagation(e);
        // sendMyTraceDataPost("/trace-checklist", getCurrentTimestamp(), "CHECKLIST", "MOUSE_CLICK", "CHECKLIST_ANALYSIS_BTN", "ANALYSE_" + activeTabNameMap.get(activeTabName), "", e);
        sendEventMessage("", getCurrentTimestamp(), "CHECKLIST", "MOUSE_CLICK", subActionLabelMap["CHECKLIST_ANALYSE_" + activeTabNameMap.get(activeTabName)], "CHECKLIST", "CHECKLIST_ANALYSIS_BTN", "ANALYSE_" + activeTabNameMap.get(activeTabName), "", e);

        // perform rule based checklist only on the activate tab
        // performRuleBasedCheck(activeTabName, ESSAY_WRITING);
        performRuleBasedCheck(activeTabName, COLLABORATE_WRITE);
    }

    $("#writeEssayEditorMain .ql-editor").on("mouseover mouseout", "span", function(e) {
        const wordText = $(this).text();
        const sentenceText = $(this).attr('data-sentence');
        const activePaneName = paneNameMap.get(activeTabName);
        if ($("#" + activePaneName).hasClass("active")) {
            $("#" + activePaneName + " .source-sentence").each(function() {
                if ($(this).text().includes(sentenceText)) {
                    if (e.type === "mouseover") {
                        $(this).parent().addClass("my-notes-hover");
                        $(this).parent()[0].scrollIntoView();
                    } else if (e.type === "mouseout") {
                        $(this).parent().removeClass("my-notes-hover");
                    }
                    return false;
                }
            });
            return false;
        }
    });
}

// let checklistToolUseLength = 0;
showChecklistBtn.addEventListener("mousedown", function (e) {e.stopPropagation();});
showChecklistBtn.onclick = function(e) {
    console.log("----------------------------------------show checklist Btn clicked");
    stopEventPropagation(e);
    if (useAnnotationTool) hideAnnotationToolbox(); // 隐藏annotation toolbox，当点击其他按钮时候

    collapseChecklist.classList.toggle("in-tools");
    toolsAndEssayToggle(collapseChecklist);

    checklistClickTargetObject = "CHECKLIST_SHOW_BTN";
    checklistPageEvent = "MOUSE_CLICK";
    sendEventMessage("", getCurrentTimestamp(), "CHECKLIST", checklistPageEvent, subActionLabelMap["CHECKLIST_CLICK"], "CHECKLIST", checklistClickTargetObject, "CHECKLIST_SHOW_BTN_CLICK", "", null);
    // let instantEvent = "";
    // let eventValue = "";
    // let saveTime = getCurrentTimestamp();
    // if (collapseChecklist.classList.contains("in-tools")) {
    //     instantEvent = "OPEN";
    //     checklistToolUseLength = saveTime;
    //     eventValue = "START_USE_TOOL:::" + saveTime;
    //
    //     //TODO 用checklist 逻辑检测所有文本
    //     if (tabNameMap) {
    //         tabNameMap.get(activeTabName).click();
    //     }
    // } else {
    //     instantEvent = "CLOSE";
    //     checklistToolUseLength = saveTime - checklistToolUseLength;
    //     eventValue = "TOOL_USE_LENGTH:::" + checklistToolUseLength;
    //
    //
    //     sendMyTraceDataPost("/trace-checklist", saveTime, "CHECKLIST", "MOUSE_CLICK", "CHECKLIST_SHOW_BTN", instantEvent, eventValue, e);
    //     // restore the essay content
    //     restoreEssayContent();
    // }
};

function myCallbackChecklist(contains, element) {
    let saveTime;

    let eventValue;
    if (contains) {
        console.log('Element with id:', element.id, 'has the "in-tools" class!');
        if (tabNameMap) {
            tabNameMap.get(activeTabName).click();
        }

        saveTime = getCurrentTimestamp();
        checklistInstantEvent = "OPEN";
        eventValue = "START_USE_TOOL:::" + saveTime;
        checklistToolStartUseTime = saveTime;
        console.log('checklistToolStartUseTime:' + checklistToolStartUseTime);
        // sendMyTraceDataPost("/trace-checklist", saveTime, "CHECKLIST", checklistPageEvent, checklistClickTargetObject, checklistInstantEvent, eventValue, null);
        sendEventMessage("", saveTime, "CHECKLIST", checklistPageEvent, subActionLabelMap["CHECKLIST_" + checklistInstantEvent], "CHECKLIST", checklistClickTargetObject, checklistInstantEvent, eventValue, null);

    } else {
        if (checklistInstantEvent !== "CLOSE") {
            console.log('Element with id:', element.id, 'has not the "in-tools" class!');
            saveTime = getCurrentTimestamp();
            checklistInstantEvent = "CLOSE";
            if (checklistToolStartUseTime === 0) {
                eventValue = "TOOL_USE_LENGTH:::ERROR-" + (saveTime - checklistToolStartUseTime);
            } else {
                eventValue = "TOOL_USE_LENGTH:::" + (saveTime - checklistToolStartUseTime);
            }

            console.log('checklist tool use length:' + (saveTime - checklistToolStartUseTime));
            // sendMyTraceDataPost("/trace-checklist", saveTime, "CHECKLIST", checklistPageEvent, checklistClickTargetObject, checklistInstantEvent, eventValue, null);
            sendEventMessage("", saveTime, "CHECKLIST", checklistPageEvent, subActionLabelMap["CHECKLIST_" + checklistInstantEvent], "CHECKLIST", checklistClickTargetObject, checklistInstantEvent, eventValue, null);

            // restore the essay content
            restoreEssayContent();
        } else {
            console.log('Element with id:', element.id, 'is keep closed');
        }

    }
    checklistClickTargetObject = "NO_TARGET_OBJECT";
    checklistPageEvent = "NO_PAGE_EVENT";
}
handleClassMutation(collapseChecklist, myCallbackChecklist); //监听