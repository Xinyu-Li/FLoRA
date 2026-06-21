// let testSendMessageBtn = document.querySelector("#test-send-message-btn");
// let messageInput = document.querySelector("#message-input");
// let studentIdInput = document.querySelector("#student-id-input");
// let responseMessageDiv = document.querySelector("#response-message-ul");
// let connectServerBtn = document.querySelector("#connect-server-btn");
// let chatContentDiv = document.querySelector("#handler-content");
//
// let websocket;
// let senderId = "";
// let receiverId = "333";
// window.onload = function () {
//     if (!'WebSocket' in window) return;
//     //webSocketInit();
// };
//
//
// function askQuestion() {
//     const question = messageInput.value;
//     if (question.length > 0) {
//         messageInput.value = "";
//         const now = new Date();
//         const timestamp = now.toLocaleTimeString();
//         console.log(question);
//         let studentQuestionHtml = `
//         <li class="d-flex message right">
//             <div class="message-body">
//                 <span class="date-time text-muted">${timestamp}</span>
//                 <div class="message-row d-flex align-items-center justify-content-end">
//                     <div class="message-content border p-3">
//                         ${question}
//                     </div>
//                 </div>
//             </div>
//         </li>
//         `;
//         // $(responseMessageDiv).append(`<div class="teacher-answer">${question}</br><span class="timestamp">${timestamp}</span></div>`);
//         $(responseMessageDiv).append(studentQuestionHtml);
//         $(chatContentDiv).scrollTop(chatContentDiv.scrollHeight);
//     }
//     return question;
// }
//
//
// testSendMessageBtn.onclick = function(e) {
//     stopEventPropagation(e);
//     let inputQuestion = askQuestion();
//     sendMessage(senderId, inputQuestion, receiverId);
// };
//
// $("#message-input").on("keypress", function(e) {
//     if (e.which === 13) {
//         e.preventDefault();
//         let inputQuestion = askQuestion();
//         sendMessage(senderId, inputQuestion, receiverId);
//         // responseMessageDiv.innerHTML += "<p>Teacher:" + messageInput.value + "</p>";
//         // Teacher no need to trace
//     }
// });
//
// connectServerBtn.onclick = function(e) {
//     senderId = studentIdInput.value;
//     webSocketInit();
// };
//
// function sendMessage(senderId, message, receiverId) {
//     if (message.length) {
//         const senderMessage = {"senderId": senderId, "senderMessage": message, "receiverId": receiverId};
//         const msgStr = JSON.stringify(senderMessage);
//         const msg = {"senderId": senderId, "senderMessage": msgStr, "receiverId": receiverId};
//         console.log("sendMessage", msg);
//         websocket.send(JSON.stringify(msg));
//     }
// }
//
// function webSocketInit() {
//     console.log("Student Init websocket", "ws://127.0.0.1:8080/ws/teacher-chat?userId=" + senderId);
//     websocket = new WebSocket("ws://127.0.0.1:8080/ws/teacher-chat?userId=" + senderId);   // 路径定义在WebSocketConfig 中, 每个学生userId 都不同,老师的userId可以固定
//
//     //成功建立连接
//     websocket.onopen = function () {
//         console.log("Student", senderId, "connected to server success");
//         sendMessage(senderId, "student connect to server success", null);
//     };
//     //接收到消息
//     websocket.onmessage = function (event) {
//         const now = new Date();
//         const timestamp = now.toLocaleTimeString();
//         const teacherAnswer = event.data;
//         console.log(timestamp, 'Student receive message: ', teacherAnswer)
//         let replyHtml = `
//             <li class="d-flex message">
//                 <div class="message-body">
//                     <span class="date-time text-muted">${timestamp}</span>
//                     <div class="message-row d-flex align-items-center">
//                         <div class="message-content border p-3">
//                             ${teacherAnswer}
//                         </div>
//                     </div>
//                 </div>
//             </li>
//         `;
//         $(responseMessageDiv).append(replyHtml);
//         $(chatContentDiv).scrollTop(chatContentDiv.scrollHeight);
//     };
//     //连接发生错误
//     websocket.onerror = function () {
//         alert("WebSocket connection error");
//     };
//     //连接关闭
//     websocket.onclose = function () {
//         console.log("WebSocket connection close");
//     };
//     //监听窗口关闭事件，当窗口关闭时，主动关闭websocket连接
//     window.onbeforeunload = function () {
//         websocket.close()
//     };
// }