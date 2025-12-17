// var nhbTaskConfig = 'gpt-search'; // 可取 "gpt-only"、"search-only"、"gpt-search"、"search-gpt"
// 10 分钟切换一次，单位毫秒
// const SWITCH_INTERVAL = 10 * 60 * 1000;
var nhbTaskConfig = getLastname();
console.log("nhbTaskConfig", nhbTaskConfig);
// 获取两个区域的 DOM 节点
const chatgptDiv = document.getElementById('embedded-chatgpt');
const searchDiv = document.getElementById('embedded-search');

//--------------------以下代码是为了调整阅读区域
const myMainInner = document.getElementById('topofscroll');
const myPageContent = document.getElementById('page-content');
if (myMainInner !== null) {
    myMainInner.style.marginLeft = "90px";
    myMainInner.style.maxWidth = "1280px";
    // myPageContent.style.width = "1000px";
}


console.log("chatgptDiv:", chatgptDiv);
console.log("searchDiv:", searchDiv);

// 将加载内容抽象为一个函数（这里使用 innerHTML 模拟加载内容，你可以替换为实际加载逻辑）
function loadContent(task) {
    console.log("into load Content..........." + task);
    if (task === 'chatgpt') {
        searchDiv.style.display = "none";

        // let chatgpt_script = document.createElement('script');
        // chatgpt_script.type = 'text/javascript';
        // chatgpt_script.src = '/flora/js/tools_19integrated_chat.js';
        //
        // chatgpt_script.onload = function() {
        //     console.log('脚本加载并执行完成');
        // };
        loadScript('/flora/js/tools_19integrated_chat.js');
    } else if(task === 'search'){
        chatgptDiv.innerHTML = "";
        searchDiv.style.display = "block";

        searchDiv.addEventListener("keyup", function(e) {
            stopEventPropagation(e);
            if (e.which === 13) {
                console.log("search - keyup", "KEY:::" + e.key + "---" + e.code);

                let inputEl = document.querySelector('.gsc-input input.gsc-input');
                if (inputEl) {
                    console.log('最终搜索关键词（DOM）:', inputEl.value);
                }

                //执行搜索
                sendEventMessage("", getCurrentTimestamp(), "SEARCH_GOOGLE", "PRESS_ENTER", "SEARCH_GOOGLE_SUBMIT", "SEARCH_GOOGLE", "SEARCH_GOOGLE_SUBMIT", "SEARCH", "KEYWORD:::" + inputEl.value, e);
            } else {
                sendEventMessage("", getCurrentTimestamp(), "SEARCH_GOOGLE", "KEYBOARD_STROKE", "SEARCH_GOOGLE_INPUT", "SEARCH_GOOGLE", "SEARCH_GOOGLE_INPUT", "WRITE_KEYWORD", "KEY:::" + e.key + "---" + e.code, e);
            }
        });
        searchDiv.addEventListener("paste", function(e) {
            stopEventPropagation(e);
            let pasteText = e.clipboardData.getData("text");
            sendEventMessage("", getCurrentTimestamp(), "SEARCH_GOOGLE", "PASTE_TEXT", "SEARCH_GOOGLE_PASTE_TEXT", "SEARCH_GOOGLE", "SEARCH_GOOGLE_INPUT", "PASTE_TEXT", "PASTE_TEXT:::" + pasteText, e);
        });

        /*searchDiv.addEventListener("input", function (event) { // 根据 Google 搜索框的 DOM 结构确定判断条件（例如 class 名称可能为 "gsc-input"）
            if (event.target && event.target.classList.contains("gsc-input")) {
                console.log("当前输入的搜索关键词：", event.target.value);
            }
            // console.log("12312312312", google.search.cse.element.getElement("mySearch"));
            // var searchElement = google.search.cse.element.getElement('mySearch');
            // console.log("search keywords:", searchElement.getInputQuery());
        });*/
        searchDiv.addEventListener("click", function(e) {

            if (e.target && e.target.tagName === "SPAN" && e.target.classList.contains("gscb_a")) {
                console.log("click clear btn");
                //清除keywords
                sendEventMessage("", getCurrentTimestamp(), "SEARCH_GOOGLE", "MOUSE_CLICK", "SEARCH_GOOGLE_CLEAR_KEYWORD", "SEARCH_GOOGLE", "CLEAR_KEYWORD_BTN", "CLEAR", "", e);
            }
            if (e.target && e.target.tagName === "BUTTON" && e.target.classList.contains("gsc-search-button")) {
                console.log("click search btn");
                // 执行搜索
                let inputEl = document.querySelector('.gsc-input input.gsc-input');
                if (inputEl) {
                    console.log('最终搜索关键词（DOM）:', inputEl.value);
                }
                sendEventMessage("", getCurrentTimestamp(), "SEARCH_GOOGLE", "MOUSE_CLICK", "SEARCH_GOOGLE_SUBMIT", "SEARCH_GOOGLE", "SEARCH_BTN", "SEARCH", "KEYWORD:::" + inputEl.value, e);
            }
        });

        document.addEventListener("click", function(e) {
            if (e.target.closest('div.gsq_a')) {
                const clickedText = e.target.closest('div.gsq_a').innerText;
                console.log('用户点击了自动补全建议: ', clickedText);

                sendEventMessage("", getCurrentTimestamp(), "SEARCH_GOOGLE", "SELECT_AUTO_COMPLETION", "SEARCH_GOOGLE_SUBMIT", "SEARCH_GOOGLE", "SEARCH_COMPLETION", "SEARCH", "KEYWORD:::" + clickedText, e);
            }
        });

    }
}
// 判断是否为双任务（需要切换）
var isDualTask = (nhbTaskConfig === 'gpt-search' || nhbTaskConfig === 'search-gpt');
// 定义在 localStorage 中使用的 key 名
var STORAGE_KEYS = {
    currentTask: 'currentTask-' + userId + "-" + currentCourseId, // 当前任务的标识："chatgpt" 或 "search"
    // taskSwitchDeadline: 'taskSwitchDeadline', // 下次切换的时间戳
    currentTaskMinutes: 'currentTaskMinutes-' + userId + "-" + currentCourseId,
    finishFirstTask: "finishFirstTask-" + userId + "-" + currentCourseId
};
// 初始化 currentTask：若 localStorage 中已有，则优先使用，否则根据 nhbTaskConfig 初始决定
var currentTask = localStorage.getItem(STORAGE_KEYS.currentTask);
var currentTaskMinutes = parseInt(localStorage.getItem(STORAGE_KEYS.currentTaskMinutes));
if (!currentTask) {
    if(nhbTaskConfig === 'gpt-only' || nhbTaskConfig === 'gpt-search'){
        currentTask = 'chatgpt';
        currentTaskMinutes = task1Minutes;
    } else if(nhbTaskConfig === 'search-only' || nhbTaskConfig === 'search-gpt'){
        currentTask = 'search';
        currentTaskMinutes = task1Minutes;
    }
    localStorage.setItem(STORAGE_KEYS.currentTask, currentTask);
    localStorage.setItem(STORAGE_KEYS.currentTaskMinutes, task1Minutes + "");
    if (nhbTaskConfig === 'gpt-search' || nhbTaskConfig === 'search-gpt') {
        localStorage.setItem(STORAGE_KEYS.finishFirstTask, "0");
    }
}

// 第一次修改 totalMinutes
totalMinutes = currentTaskMinutes;
// 首次加载页面，根据 currentTask 显示对应内容
loadContent(currentTask);