let testSendMessageBtn = document.querySelector("#test-send-message-btn");
let messageInput = document.querySelector("#message-input");
let responseMessageDiv = document.querySelector("#response-message-ul");
let chatContentDiv = document.querySelector("#chat-content");
let essayContentDiv = document.querySelector("#essay-content");
let typeStatusEl = document.querySelector("#type-status-info");
// let studentListElement = document.getElementsByClassName(".student-list-div ul li");
let studentListUl = document.querySelector("#student-list-ul");
let wsStatusDiv = document.querySelector("#wsStatusDiv");
let studentStatusDiv = document.querySelector("#studentStatusDiv");

let websocket;
let receiverId = null;
let senderId = "333";
let maxRetryTime = 5;
let retryCnt = 0;

const heartbeatIntervalMs = 50000; // 1 second
let lastHeartbeatReceivedTime = Date.now();


window.addEventListener('load', function () {
    if (!'WebSocket' in window) return;
    webSocketInit();
});

function generateStudentQuestionHtml(studentQuestion, timestamp) {
    studentQuestion = studentQuestion.replace(/\n/g, '<br>');
    let replyHtml = `
            <li class="d-flex message">
                <div class="message-body">
                    <span class="date-time text-muted">${timestamp}</span>
                    <div class="message-row d-flex align-items-center">
                        <div class="message-content border p-3">
                            ${studentQuestion}
                        </div>
                    </div>
                </div>
            </li>
        `;
    return replyHtml
}

function generateTeacherAnswerHtml(teacherAnswer, timestamp) {
    teacherAnswer = teacherAnswer.replace(/\n/g, '<br>');
    const html = `
        <li class="d-flex message right">
            <div class="message-body">
                <span class="date-time text-muted">${timestamp}</span>
                <div class="message-row d-flex align-items-center justify-content-end">
                    <div class="message-content border p-3">
                        ${teacherAnswer}
                    </div>
                </div>
            </div>
        </li>
    `;
    return html
}

function generateInfoMessageHtml(infoMessage, timestamp) {
    const html = `
        <li class="d-flex message divider mt-xl-3 mt-md-1 mb-xl-3 mb-md-1">
            <small class="text-muted">${timestamp} ${infoMessage}</small>
        </li>
    `;
    return html
}

function stopEventPropagation(e) {
    if (!e) var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
}

function answerStudent() {
    const teacherAnswer = messageInput.value;
    if (teacherAnswer.length > 0) {
        messageInput.value = "";
        const timestamp = new Date().toLocaleTimeString();
        let teacherAnswerHtml = generateTeacherAnswerHtml(teacherAnswer, timestamp);
        $(responseMessageDiv).append(teacherAnswerHtml);

        console.log("chatContentDiv", chatContentDiv);
        console.log("chatContentDiv.scrollHeight", chatContentDiv.scrollHeight);
        $(chatContentDiv).scrollTop(chatContentDiv.scrollHeight);
    }
    return teacherAnswer;
}

testSendMessageBtn.onclick = function(e) {
    stopEventPropagation(e);
    let teacherAnswer = answerStudent();
    sendMessage(senderId, teacherAnswer, receiverId, "conversation");
    // responseMessageDiv.innerHTML += "<p>Teacher:" + messageInput.value + "</p>";
    // Teacher no need to trace
};

// $("#message-input").on("keypress", function(e) {
//     if (e.which === 13) {
//         e.preventDefault();
//         let teacherAnswer = answerStudent();
//         sendMessage(senderId, teacherAnswer, receiverId, "conversation");
//         // responseMessageDiv.innerHTML += "<p>Teacher:" + messageInput.value + "</p>";
//         // Teacher no need to trace
//     }
// });

messageInput.addEventListener('keydown', (event) => {
    if (event.shiftKey && event.key === 'Enter') {
        event.preventDefault();
        // Insert a line break in the input value
        const cursorPosition = messageInput.selectionStart;
        console.log(cursorPosition);
        const inputValue = messageInput.value;
        messageInput.value = inputValue.slice(0, cursorPosition) + '\n' + inputValue.slice(cursorPosition);
        console.log(inputValue.slice(0, cursorPosition));
        console.log(inputValue.slice(cursorPosition));
        messageInput.setSelectionRange(cursorPosition + 1, cursorPosition + 1);
    } else if (event.key === 'Enter') {
        event.preventDefault();
        let teacherAnswer = answerStudent();
        sendMessage(senderId, teacherAnswer, receiverId, "conversation");
        // responseMessageDiv.innerHTML += "<p>Teacher:" + messageInput.value + "</p>";
    }
});

// Add a custom placeholder to the message input
// messageInput.addEventListener('focus', () => {
//     if (messageInput.value === 'Type your message here...') {
//         messageInput.value = '';
//     }
// });

// messageInput.addEventListener('blur', () => {
//     if (messageInput.value === '') {
//     messageInput.value = 'Type your message here...';
//     }
// });

//展示student message 在 student 列表中
function reflushStuList(stuID, timestamp, message) {
    console.log("in reflushStuList", stuID, timestamp, message);
    // const matchingElement = $(".student-list-div ul li").filter(function() {
    //     // let studentName = $(this).find('h6').text();
    //     // let studentID = studentName.slice(8, studentName.length);
    //     let studentId = $(this).data("userid");
    //     console.log("studentId:" + studentId);
    //
    //     return studentId === (stuID + "");
    // });
    const matchingElement = $('.student-list-div ul li[data-userid="' + stuID + '"]')
    matchingElement.find('p').text(timestamp);
    if (message.length > 45) {
        matchingElement.find('div.text-truncate').text(message.slice(0, 45) + '...');
    } else {
        matchingElement.find('div.text-truncate').text(message);
    }
}


// status: init, conversation, focus, unfocus, heartbeat, editing, essaysave, sessionend, close
const infoMessageTypeList = ["init", "essaysave", "sessionend", "close"];
function sendMessage(senderId, message, receiverId, status) {
    const messageObj = {
        "senderMessage": message,
        "status": status,
        "senderId": senderId,
        "receiverId": receiverId
    };
    if (message.length) {
        if (websocket.readyState === WebSocket.OPEN) {
            websocket.send(JSON.stringify(messageObj));
        } else if (websocket.readyState === WebSocket.CONNECTING) {
            setTimeout(sendMessage, 1000, senderId, message, receiverId, status);
        } else if (websocket.readyState === WebSocket.CLOSED) {
            if (retryCnt < maxRetryTime) {
                retryCnt ++;
                webSocketInit();
                websocket.addEventListener('open', () => {
                    sendMessage(senderId, message, receiverId, status);
                });
            } else {
                console.error('Message could not be sent. Please check your network status and reload the page.');
            }
        }
    }
}

function webSocketInit() {
    console.log("Teacher Init websocket", websocketWebsiteUrl + "/teacher-chat?userId=" + senderId);
    websocket = new WebSocket(websocketWebsiteUrl + "/teacher-chat?userId=" + senderId);   // 路径定义在WebSocketConfig 中, 每个学生userId 都不同,老师的userId可以固定

    //成功建立连接
    websocket.onopen = function () {
        wsStatusDiv.classList.add('online');
        console.log("Teacher connect to client success...");
        sendMessage(senderId, "teacher connect to server success", null, "init");
    };
    //接收到消息
    websocket.onmessage = function (event) {
        const jsonObj = JSON.parse(event.data);
        let messageType = jsonObj['status'];
        // if (messageType === "init" && STUDENTID === "") {
        //     location.reload();
        // }
        if (messageType === "conversation" || infoMessageTypeList.includes(messageType)) {
            // STUDENTID = parseInt(jsonObj['senderId']);
            const timestamp = new Date().toLocaleTimeString();
            let stuID = jsonObj['senderId'];
            let studentMessage = jsonObj['senderMessage'];
            let replyHtml = "";
            if (messageType === "conversation") {
                replyHtml = generateStudentQuestionHtml(studentMessage, timestamp);
                reflushStuList(stuID, timestamp, studentMessage);
            } else if (infoMessageTypeList.includes(messageType)) {
                replyHtml = generateInfoMessageHtml(studentMessage, timestamp);
                if (messageType === "close") {
                    studentStatusDiv.classList.remove("online");
                } else if (messageType === "sessionend") {
                    studentStatusDiv.classList.remove("online");
                    typeStatusEl.textContent = "";
                    // important, release this variable to make next student handler normally
                    // STUDENTID = "";
                }
            }
            typeStatusEl.textContent = "";
            $(responseMessageDiv).append(replyHtml);
            $(chatContentDiv).scrollTop(chatContentDiv.scrollHeight);
            let urlParts = window.location.href.split("/");
            let courseId = urlParts[urlParts.length - 1];
            loadStudentEssayById(stuID, courseId);
        } else if (messageType === "focus") {
            // do focus things
            typeStatusEl.textContent = "Student is typing..."
        } else if (messageType === "editing") {
            typeStatusEl.textContent = "Student is editing the essay..."
        } else if (messageType === "unfocus") {
            typeStatusEl.textContent = "";
        } else if (messageType === "heartbeat") {
            // Update the last heartbeat received time
            lastHeartbeatReceivedTime = Date.now();
            studentStatusDiv.classList.add("online");
        }
    };
    //连接发生错误
    websocket.onerror = function () {
        console.error("WebSocket connection error");
    };
    //连接关闭
    websocket.onclose = function () {
        console.log("WebSocket connection close");
        wsStatusDiv.classList.remove('online');
        studentStatusDiv.classList.remove('online');
        clearInterval(heartbeatInterval);
        clearInterval(checkConnectionInterval);
        retryCnt = 0;
    };
    //监听窗口关闭事件，当窗口关闭时，主动关闭websocket连接
    window.onbeforeunload = function () {
        sendMessage(senderId, "Teacher closed webpage", receiverId, "close");
        websocket.close();
    };

    // Send a heartbeat message every 1 second
    const heartbeatInterval = setInterval(() => {
        if (websocket.readyState === WebSocket.OPEN) {
            // websocket.send('heartbeat');
            sendMessage(senderId, "heartbeat", receiverId, "heartbeat");
        }
    }, heartbeatIntervalMs);

    // Check if the connection is still alive at regular intervals
    const checkConnectionInterval = setInterval(() => {
        const currentTime = Date.now();
        if (currentTime - lastHeartbeatReceivedTime > 5 * heartbeatIntervalMs) {
            // Update the status <div> to indicate that the connection is offline
            studentStatusDiv.classList.remove('online');
        }
    }, 1000);
}

function loadStudentTeacherChatHistoryById(studentId, courseId) {
    $.get(myUrl + "/manage/load-student-chat-history/" + studentId + "/" + courseId, function(data, status) {
        console.log("/manage/load-student-chat-history/", data);
        console.log("/manage/load-student-chat-history/", status);
        if (status === "success") {
            const chat_history = data.data;
            // Clear the handler box before displaying the new handler history
            $(responseMessageDiv).empty();
            // Display the handler content as structured questions and responses
            chat_history.forEach(chat => {
                if (chat.chatRole === "FROM_TEACHER") {
                    $(responseMessageDiv).append(generateTeacherAnswerHtml(chat.chatText, new Date(parseInt(chat.chatTime, 10)).toLocaleTimeString()));
                } else {
                    $(responseMessageDiv).append(generateStudentQuestionHtml(chat.chatText, new Date(parseInt(chat.chatTime, 10)).toLocaleTimeString()));
                }
            });
            $(chatContentDiv).animate({ scrollTop: $(chatContentDiv).prop("scrollHeight")}, 1000);
        } else {
            console.log("load Student Chat History By Id error", studentId, courseId);
        }
    });
}

function loadStudentEssayById(studentId, courseId) {
    $.get(myUrl + "/manage/get-student-essay/" + studentId + "/" + courseId, function(data, status) {
        console.log("/manage/get-student-essay/", data);
        if (status === "success") {
            const essayContentJson = data;
            if (essayContentJson !== '') {
                const essayContentObj = JSON.parse(essayContentJson);
                const paragraphText = essayContentObj.ops.reduce((text, op) => {
                    if (op.insert) {
                        t = op.insert;
                        text += t.replace(/\n/g, '<br>');
                    }
                    return text;
                }, '');
                console.log(paragraphText);
                essayContentDiv.innerHTML = paragraphText;
            }
        } else {
            console.log("load Student Essay By Id error", studentId);
        }
    });
}

function enableInput() {
    messageInput.disabled = false;
    messageInput.setAttribute("placeholder", "Type your message here...");
    messageInput.focus();
}

$(document).ready(function () {
    "use strict";
    let listItems = $('.student-list-div ul li');
    let timestamp = new Date().toLocaleTimeString();
    listItems.each(function() {
        // if ($(this).data("userid") === lastEssayUserId) {
        //     timestamp = new Date(lastEssaySaveTime).toLocaleTimeString();
        // }
        const p = $(this).find('p');
        p.text(`${timestamp}`);
    });
    console.log("lastEssayUserId", lastEssayUserId);
    if (lastEssayUserId != null) {
        // 将最后写essay的student 放到第一位，并highlight
        let lastEssayUserLi = studentListUl.querySelector('li[data-userid="' + lastEssayUserId + '"]');
        console.log("lastEssayUserLi", lastEssayUserLi);
        lastEssayUserLi.classList.add("active");

        lastEssayUserLi.querySelector("p").innerText = new Date(parseInt(lastEssaySaveTime)).toLocaleTimeString();
        $(studentListUl).prepend(lastEssayUserLi);
    }
    messageInput.disabled = true;
    messageInput.setAttribute("placeholder", "Current disabled, please select a logined student.");

    messageInput.addEventListener("input", function() {
        sendMessage(senderId, "Teacher is typing", receiverId, "focus");
    });

    messageInput.addEventListener("blur", function() {
        sendMessage(senderId, "teacher unfocus", receiverId, "unfocus");
    });

    let urlParts = window.location.href.split("/");
    let courseId = urlParts[urlParts.length - 1];

    $(".student-list-div ul li").on("click", function () {
        $(".student-list-div ul li.active").removeClass("active");
        $(this).addClass("active");
        // let studentName = $(this).data("firstname");
        let studentId = $(this).data("userid");
        receiverId = studentId;

        loadStudentTeacherChatHistoryById(studentId, courseId);
        loadStudentEssayById(studentId, courseId);
        enableInput();
        // if (studentId === parseInt(STUDENTID)) {
        //     enableInput();
        // } else {
        //     messageInput.disabled = true;
        //     messageInput.setAttribute("placeholder", "Current disabled, please select a logined student.");
        // }
    });


    // if (STUDENTID !== "") {
    //     console.log("In document ready init..." + STUDENTID);
    //     const matchingElement = $('.student-list-div ul li[data-userid="' + STUDENTID + '"]');
    //     // listItems.parentNode.insertBefore(matchingElement, matchingElement.parentNode.firstChild);
    //     if (matchingElement.length === 0) {
    //         console.error(`Cannot find ${STUDENTID} in the student list.`);
    //     } else {
    //         matchingElement.prependTo(matchingElement.parent());
    //         matchingElement.addClass("active");
    //         matchingElement.click();
    //     }
    // }
});
