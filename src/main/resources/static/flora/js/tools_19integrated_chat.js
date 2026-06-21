function renderEmbeddedChatBox() {
    const htmlCode = `
                <div class="row" style="height: 830px; width: 80%;">
                                    <!-- Sidebar for Topics -->
                                    <div class="col-md-3 col-lg-2 bg-light border-end" id="integrated-chatbot-topic-area">
                                        <div class="d-flex flex-column h-100 p-3">
                                            <h5 class="mb-4">Topics</h5>
                                            <ul id="integrated-chatbot-topic-list" class="nav nav-pills flex-column">

                                                <!-- Topic 添加区域 Additional topics will be added here -->
                                            </ul>
                                            <div class="mt-auto">
                                                <button id="integrated-chatbot-new-topic-btn" class="btn btn-primary w-100">New Topic</button>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Chat Window -->
                                    <div class="col-md-9 col-lg-10 d-flex flex-column p-0">
                                        <!-- Chat Messages -->
                                        <div id="integrated-chatbot-chat-window" class="flex-grow-1 p-3 overflow-auto" style="background-color: #f8f9fa; height: 500px">
                                            <!-- Chat messages will appear here -->
                                        </div>
                                        <!-- Input Area -->
                                        <div class="border-top p-3">
                                            <form id="integrated-chatbot-chat-form">

                                                <div class="input-group">
                                                    <!-- Textarea for multiple lines -->
                                                    <textarea id="integrated-chatbot-user-input" class="form-control" placeholder="Type your message..." rows="3"></textarea>
                                                    <button id="integrated-chatbot-send-message-btn" type="submit" class="btn btn-primary"> Send Message </button>
                                                </div>
                                                <div class="mt-2">
                                                    <small class="text-muted">Press <strong>Ctrl + Enter</strong> to send message</small>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
    `
    document.getElementById("embedded-chatgpt").innerHTML = htmlCode;
}

// [
//     "INTEGRATED_CHAT_RENAME_TOPIC", "INTEGRATED_CHAT_DELETE_TOPIC",
//     "INTEGRATED_CHAT_EDIT_QUESTION", "INTEGRATED_CHAT_INTERACTION", "INTEGRATED_CHAT_READ_CHAT", "INTEGRATED_CHAT_READ_TOPIC", "INTEGRATED_CHAT_SWITCH_TOPIC", "INTEGRATED_CHAT_CREATE_TOPIC",
//
//     "INTEGRATED_CHAT_READ_INPUT", "INTEGRATED_CHAT_INPUT_PASTE_TEXT", "INTEGRATED_CHAT_SUBMIT_QUESTION", "INTEGRATED_CHAT_INPUT"
// ]


renderEmbeddedChatBox();


const chatWindow = document.getElementById('integrated-chatbot-chat-window');
const chatForm = document.getElementById('integrated-chatbot-chat-form');

const userInput = document.getElementById('integrated-chatbot-user-input');
const topicList = document.getElementById('integrated-chatbot-topic-list');
const topicArea = document.getElementById('integrated-chatbot-topic-area');
const newTopicBtn = document.getElementById('integrated-chatbot-new-topic-btn');
const sendMessageBtn = document.getElementById('integrated-chatbot-send-message-btn');

let chatgptAgentName = 'nhb-info-seeking';

// some state variable/////////////////////////////
let currentTopicId = 1; // 当前正在使用的 topic， default 0
let currentThreadId = 'thread_1';
// let lastMessageIndex = 0; // 最后一个message在allTopics里的id
let generating = false; // 是否在生成message
let questionIdToThread = {1: {"qweqwe-1": ["thread_1", "thread_2"]}} // 在regenerate 完成之后更新这个dict
let topicShowingThreadId = {1: "thread_1"} // 在regenerate 完成之后更新这个dict
/////////////////////////////////////////////
// 所有的topics, TODO 需要从服务器获取， 需要做user_id course_id 索引优化
let allTopics = {
    1: {
        topicName: 'Topic 1', messages: {
            "thread_1": [
                {
                    'id': 1,
                    'sender': 'user',
                    'text': '0',
                    'sendTime': '12312312312',
                    'questionId': 'qweqwe-0',
                    'thumb': 0,
                },
                {
                    'id': 1,
                    'sender': 'bot',
                    'text': '1',
                    'sendTime': '123123123',
                    'questionId': 'qweqwe-0',
                    'thumb': 1,
                },
                {
                    'id': 1,
                    'sender': 'user',
                    'text': 'q2',
                    'sendTime': '123123123',
                    'questionId': 'qweqwe-1',
                    'thumb': 1,
                },

                {
                    'id': 1,
                    'sender': 'bot',
                    'text': 'a4',
                    'sendTime': 'qweqwe-1',
                    'questionId': 'qweqwe-123123-qweqwe-123',
                    'thumb': 1,
                },
                {
                    'id': 1,
                    'sender': 'user',
                    'text': '5',
                    'sendTime': '123123123',
                    'questionId': 'qweqwe-2',
                    'thumb': 1,
                },
                {
                    'id': 1,
                    'sender': 'user',
                    'text': '5',
                    'sendTime': '123123123',
                    'questionId': 'qweqwe-2',
                    'thumb': 1,
                }
            ],
            "thread_2": [
                {
                    'id': 1,
                    'sender': 'user',
                    'text': '0',
                    'sendTime': '12312312312',
                    'questionId': 'qweqwe2-0',
                    'thumb': 0,
                },
                {
                    'id': 1,
                    'sender': 'bot',
                    'text': '1',
                    'sendTime': '123123123',
                    'questionId': 'qweqwe2-0',
                    'thumb': 1,
                },
                {
                    'id': 1,
                    'sender': 'user',
                    'text': 'q2',
                    'sendTime': '123123123',
                    'questionId': 'qweqwe2-1',
                    'thumb': 1,
                },

                {
                    'id': 1,
                    'sender': 'bot',
                    'text': 'a4',
                    'sendTime': 'qweqwe2-1',
                    'questionId': 'qweqwe-123123-qweqwe-123',
                    'thumb': 1,
                },
                {
                    'id': 1,
                    'sender': 'user',
                    'text': '5',
                    'sendTime': '123123123',
                    'questionId': 'qweqwe-2',
                    'thumb': 1,
                },
                {
                    'id': 1,
                    'sender': 'bot',
                    'text': 'thread 2',
                    'sendTime': '123123123',
                    'questionId': 'qweqwe-2',
                    'thumb': 1,
                }
            ]
        }
    },

};

function disableSendMessageBtn() {
    sendMessageBtn.innerHTML = `
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        Processing...
    `;
    // Disable the button
    sendMessageBtn.disabled = true;
    generating = true;
}

function undisableSendMessageBtn() {
    sendMessageBtn.innerHTML = "Send Message";
    // Disable the button
    sendMessageBtn.disabled = false;
    generating = false;
}

function requestChatResponse(question, messageTime, questionId, oldThreadId, isRegenerate) {
    console.log("requestChatResponse   code execute........")
    appendProcessingMessage();

    disableSendMessageBtn();

    $.post(apiBaseUrl + "/request-chatgpt-response", {
        question: question,
        extraPrompt: "",
        userId: userId,
        courseId: currentCourseId,
        essay: "",
        questionId: questionId,
        includeEssay: false,
        chatgptRoleDescription: "",
        chatgptRole: "embededGPT",
        backgroundFileNameList: "",
        chatgptParameters: [1000, 1, 2], // max character 1000, temperature 0.1  0.2
        agentName: chatgptAgentName,
        topicId: currentTopicId,
        threadId: currentThreadId,
        oldThreadId: oldThreadId
        // TODO 判定是否需要发送  isRegenerate 信号
    }, function (data, status) {
        if (status === "success") {
            //向allTopics 里面添加信息
            let responseMessage = data.data;
            console.log("requestChatResponse:", responseMessage);
            // if (responseMessage.chatgptAnswer === "gpt-error") {
            //     // 给提示信息， TODO
            //     alert("The server has some issues, please try again latter...");
            // }

            // if (!isRegenerate) {
            //     // 更新 question 的 questionId
            //
            // }

            // allTopics[currentTopicId].messages.push({
            //     id: responseMessage.id,
            //     sender: 'bot',
            //     text: responseMessage.chatgptAnswer,
            //     sendTime: responseMessage.chatgptResponseTime,
            //     questionId: responseMessage.questionId,
            //     thumb: 0
            // });
            // let oldThreadId = currentThreadId;
            updateQuestionId(messageTime, responseMessage.questionId);
            if (currentThreadId === "newTopic") {
                console.log(responseMessage.threadId)
                console.log(currentThreadId)
                currentThreadId = responseMessage.threadId;
                topicShowingThreadId[currentTopicId] = responseMessage.threadId;
            } else if (currentThreadId === "regenerate") {
                // todo 改questionIdToThread
                currentThreadId = responseMessage.threadId
                questionIdToThread[currentTopicId][responseMessage.questionId][questionIdToThread[currentTopicId][responseMessage.questionId].indexOf("regenerate")] = responseMessage.threadId
            }
            removeProcessingMessage();
            recordQuestion(responseMessage.id, question, responseMessage.chatgptResponseTime, responseMessage.questionId, oldThreadId, responseMessage.threadId)
            recordResponse(responseMessage.id, responseMessage.chatgptAnswer, responseMessage.chatgptResponseTime, responseMessage.questionId, responseMessage.threadId);
            appendBotMessage(responseMessage.chatgptAnswer, responseMessage.chatgptResponseTime, responseMessage.id);
            //将Send message btn 变成 可点击
            undisableSendMessageBtn();
        } else {
            // 给提示信息，TODO
        }
    });
}

function updateQuestionId(messageTime, questionId) {
    console.log("messageTime:", messageTime)
    console.log("questionId:", questionId)
    let messageElement = chatWindow.querySelector(`div[data-message-time="${messageTime}"]`);
    let messageContentElement = messageElement.querySelector('.message-content');
    messageContentElement.setAttribute("data-questionid", questionId);
    // console.log("allTopics", allTopics);
    // console.log("currentTopicId", currentTopicId);
    // allTopics[currentTopicId].messages.push({
    //     id: responseMessage.id,
    //     sender: 'user',
    //     text: question,
    //     sendTime: new Date().getTime().toString(),
    //     questionId: responseMessage.questionId,
    //     thumb: 0
    // });
}

function requestAllChatMessages() {
    $.get(apiBaseUrl + "/load-chatgpt-chat-and-topics/" + userId + "/" + currentCourseId, function (data, status) {
        if (status === "success") {
            //获取 所有topic 信息，存入 allTopics
            // todo: 暂时取消了获取新信息的功能，测试切换功能
            // allTopics = data.data;

            // Todo：改一下那个API，返回下列数据
            allTopics = data.data["allTopics"]; // todo: Topics的结构，现在message里是个dict，跟threadId：history
            questionIdToThread = data.data["questionIdToThread"]; // todo: 这个通过扫chatGPTlog看，根据user选所有的chathistory，然后根据unique topicId分组，然后sort，在每个有多个order的questionId
            // 上，提取这个变量，根据不同组合的threadId 建立相应的history返回
            topicShowingThreadId = data.data["topicShowingThreadId"]    // todo: 这些是实时记录，在topic的表里

            console.log("allTopics", allTopics);
            console.log("allTopics keys length:", Object.keys(allTopics).length);
            if (Object.keys(allTopics).length === 0) {
                console.log("create new topics-----");
                //自动创建default topic
                // 将topic 信息发送 服务端存储，并更新 topicId
                createNewTopic("Default");
            } else {
                console.log("use old topics-----");
                currentTopicId = Object.keys(allTopics)[0];
                currentThreadId = topicShowingThreadId[currentTopicId]

                //展示所有topics
                Object.entries(allTopics).forEach(([key, value]) => {
                    let tempTopicId = key;
                    let tempTopicName = value.topicName;
                    console.log(value);

                    // Create new topic element
                    const newTopicElement = document.createElement('li');
                    newTopicElement.classList.add('nav-item', 'mb-2');
                    newTopicElement.innerHTML = `
                        <div class="d-flex align-items-center">
                            <a href="#" class="nav-link flex-grow-1" data-topic-id="${tempTopicId}">${tempTopicName}</a>
                            <i class="bi bi-pencil-square text-secondary ms-2 action-icon rename-topic" title="Rename" data-topic-id="${tempTopicId}" style="cursor: pointer;"></i>
                            <i class="bi bi-trash text-danger ms-2 action-icon delete-topic" title="Delete" data-topic-id="${tempTopicId}" style="cursor: pointer;"></i>
                        </div>`;
                    // Append to topic list
                    topicList.appendChild(newTopicElement);

                });

                // 展示topic 的信息
                switchTopic(Object.keys(allTopics)[0], currentThreadId);
            }
        }
    });
}

function requestChangeThumb(messageId, thumbStatus) {
    $.post(apiBaseUrl + "/update-chatgpt-message-thumb", {
        messageId: messageId,
        thumbStatus: thumbStatus
    }, function (data, status) {
        if (status === "success") {
            console.log("change thumb success, current thumb is:", thumbStatus);
        } else {
            console.log("change thumb failure");
        }
    });
}

function init() {
    // Initial load of all messages
    requestAllChatMessages();
    setupEventListenerForAllMessages();
}



// Load messages for the current topic
function loadMessages(topicId, threadId) {
    clearConversation();
    // const messages = (allTopics && allTopics[topicId] && allTopics[topicId].messages) || [];
    // console.log("messages:", messages);

    showConversation(topicId, threadId);
}

function switchTopic(topicId, threadId) {
    // 在生成的时候禁用换topic
    if (generating)
        return;

    console.log("switch topic:", threadId);
    currentTopicId = topicId;
    currentThreadId = threadId;
    topicShowingThreadId[topicId] = threadId;
    // Remove 'active' class from all topics
    topicList.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    // Add 'active' class to the selected topic
    const activeLink = topicList.querySelector(`a[data-topic-id="${topicId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
    // Load messages for the selected topic
    if (threadId === "newTopic") {
        clearConversation()
    } else {
        loadMessages(topicId, threadId);
    }
}

// Handle topic renaming
function renameTopic(topicId) {
    const currentName = allTopics[topicId].topicName;
    const newName = prompt("Enter new topic name:", currentName);
    let temp_instant_event = "";

    if (newName && newName.trim() !== '') {
        allTopics[topicId].topicName = newName.trim();
        // Update the topic name in the sidebar
        const topicLink = topicList.querySelector(`a[data-topic-id="${topicId}"]`);
        if (topicLink) {
            topicLink.textContent = newName.trim();
        }

        //step 2 TODO 从数据库 rename topic
        $.post(apiBaseUrl + "/update-chatgpt-topic", {
            userId: userId,
            courseId: currentCourseId,
            topicId: currentTopicId,
            topicName: newName.trim(),
            threadShowing: currentThreadId
        }, function (data, status) {
            if (status === "success") {
                console.log("rename successes")
            } else {

            }
        })
        // 确认修改
        temp_instant_event = "CONFIRM_RENAME";
    } else {
        //取消修改
        temp_instant_event = "CANCEL_RENAME";
    }
    sendEventMessage('', getCurrentTimestamp(), "INTEGRATED_CHAT", "MOUSE_CLICK", "INTEGRATED_CHAT_RENAME_TOPIC", "INTEGRATED_CHAT", "TOPIC_AREA", temp_instant_event, "TOPIC_ID:::" + topicId, null);
}

// Handle topic deletion
function deleteTopic(topicId) {
    let temp_instant_event = "";
    if (confirm("Are you sure you want to delete this topic?")) {
        // Remove topic from data
        delete allTopics[topicId];
        // Remove topic from sidebar
        const topicItem = topicList.querySelector(`a[data-topic-id="${topicId}"]`).closest('li');
        if (topicItem) {
            topicList.removeChild(topicItem);
        }
        // If the deleted topic was active, switch to another topic or clear chat
        if (currentTopicId === topicId) {
            const remainingTopicIds = Object.keys(allTopics);
            if (remainingTopicIds.length > 0) {
                switchTopic(remainingTopicIds[0], topicShowingThreadId[remainingTopicIds[0]]); // 当删除时候，将active topic 切换成第一个
            } else { // 当删除时候，如果没有topic，则不显示active topic
                currentTopicId = null;
                chatWindow.innerHTML = '';
            }
        }

        //step3 TODO 从数据库删除Topic
        $.post(apiBaseUrl + "/delete-chatgpt-topic", {

            topicId: currentTopicId,
        }, function (data, status) {
            if (status === "success") {

            } else {

            }
        });
        temp_instant_event = "CONFIRM_DELETE";
    } else {
        temp_instant_event = "CANCEL_DELETE";
    }
    sendEventMessage('', getCurrentTimestamp(), "INTEGRATED_CHAT", "MOUSE_CLICK", "INTEGRATED_CHAT_DELETE_TOPIC", "INTEGRATED_CHAT", "TOPIC_AREA", temp_instant_event, "TOPIC_ID:::" + topicId, null);
}



function createNewTopic(topicName) {
    console.log("Create New Topic");
    //step 4 发送 创建到数据库
    $.post(apiBaseUrl + "/add-chatgpt-topic", {
        userId: userId,
        courseId: currentCourseId,
        topicName: topicName,
    }, function (data, status) {
        if (status === "success") {
            const newTopicId = data.data; // Use timestamp as unique ID
            allTopics[newTopicId] = {topicName: topicName, messages: []};
            questionIdToThread[newTopicId] = {};

            // Create new topic element
            const newTopicElement = document.createElement('li');
            newTopicElement.classList.add('nav-item', 'mb-2');
            newTopicElement.innerHTML = `
                        <div class="d-flex align-items-center">
                            <a href="#" class="nav-link flex-grow-1" data-topic-id="${newTopicId}">${topicName}</a>
                            <i class="bi bi-pencil-square text-secondary ms-2 action-icon rename-topic" title="Rename" data-topic-id="${newTopicId}" style="cursor: pointer;"></i>
                            <i class="bi bi-trash text-danger ms-2 action-icon delete-topic" title="Delete" data-topic-id="${newTopicId}" style="cursor: pointer;"></i>
                        </div>`;
            // Append to topic list
            topicList.appendChild(newTopicElement);
            // Switch to the new topic
            switchTopic(newTopicId, "newTopic");
        } else {
            //给提示信息
        }
    })

}

function generateConversation(message, questionId) {
    let messageTime = Date.now().toString();
    appendUserMessage(message, messageTime, questionId);
    // Save message to current topic, 因为需要从服务器返回 questionId 和 message Id， 所以需要在 server response 里面添加

    userInput.value = '';
    // Simulate chatbot response
    const oldThreadId = currentThreadId;
    requestChatResponse(message, messageTime, questionId, oldThreadId); // 发送新消息时候 questionId 保持为空

}

function regenerateConversation(message, questionId) {
    generating = true;
    let messageTime = Date.now().toString();
    updateQuestionIdToThread(currentTopicId, questionId, "regenerate")
    const oldThreadId = currentThreadId
    currentThreadId = "regenerate"
    appendUserMutiQuestion(message, messageTime, questionId, questionIdToThread[currentTopicId][questionId].length,
        questionIdToThread[currentTopicId][questionId].indexOf("regenerate"));
    // appendUserMutiQuestion(value.text, value.sendTime, value.questionId,
    //     questionIdToThread[currentTopicId][value.questionId].length,
    //     questionIdToThread[currentTopicId][value.questionId].indexOf(threadId))
    userInput.value = '';
    // Simulate chatbot response
    requestChatResponse(message, messageTime, questionId, oldThreadId);
}




function appendProcessingMessage() {
    const messageElement = document.createElement('div');
    messageElement.classList.add('d-flex', 'justify-content-start', 'mb-2');
    messageElement.id = "processing-message";
    messageElement.innerHTML = `
                <div class="bg-secondary text-white rounded p-2 position-relative" style="max-width: 75%;">
                    <div class="message-content">
                        Processing...
                        <div class="spinner-border" role="status">
                            <span class="sr-only"></span>
                        </div>
                    </div>
                </div>`;
    chatWindow.appendChild(messageElement);
    scrollToBottom();
}

function removeProcessingMessage() {
    const processMessageElement = document.getElementById("processing-message");
    chatWindow.removeChild(processMessageElement);
}

function appendUserMessage(message, messageTime, questionId) {
    const messageElement = document.createElement('div');
    // const messageTime = new Date().toLocaleTimeString();
    messageElement.classList.add('d-flex', 'justify-content-end', 'mb-2');
    messageElement.setAttribute('data-message-time', messageTime);
    messageElement.innerHTML = `
                <div class="bg-primary text-white rounded p-2" style="max-width: 75%;">
                    <div class="message-content" data-questionid="${questionId}">
                        ${message.replace(/\n/g, '<br>')}
                    </div>
                    <div class="mt-2 d-flex align-items-center justify-content-between">
                        <div class="mt-2 d-flex align-items-center">
                            <i class="bi bi-arrow-clockwise text-white me-3 action-icon regenerate-icon" title="Regenerate Response" style="cursor: pointer;"></i>
                            <i class="bi bi-arrow-clockwise text-white me-3 bi-pencil reenter-icon" title="Re-enter Question" style="cursor: pointer;"></i>
                        
                        </div>
                        <div class="text-end mt-2 ms-3" style="font-size: 0.8em; opacity: 0.8;">
                            ${new Date(Number(messageTime)).toTimeString().split(' ')[0]}
                        </div>
                    </div>
                    
                </div>`;
    chatWindow.appendChild(messageElement);
    scrollToBottom();

}

function appendBotMessage(message, messageTime, messageId) {
    const messageElement = document.createElement('div');

    messageElement.classList.add('d-flex', 'justify-content-start', 'mb-2');
    messageElement.setAttribute('data-message-time', messageTime);
    // message = marked.parse(message);
    messageElement.innerHTML = `
                <div class="bg-secondary text-white rounded p-2 position-relative" style="max-width: 75%;">
                    <div class="message-content" data-messageid="${messageId}">
                        ${message}
                    </div>
                    <div class="mt-2 d-flex align-items-center justify-content-between">
                        <div class="mt-2 d-flex align-items-center">
<!--                                <i class="bi bi-arrow-clockwise text-white me-3 action-icon regenerate-icon" title="Regenerate Response" style="cursor: pointer;"></i>-->
                            <i class="bi bi-hand-thumbs-up text-white me-2 action-icon thumbs-up-icon" title="Thumbs Up" style="cursor: pointer;"></i>
                            <i class="bi bi-hand-thumbs-down text-white action-icon thumbs-down-icon" title="Thumbs Down" style="cursor: pointer;"></i>
                        </div>
                        <div class="text-end mt-2 ms-3" style="font-size: 0.8em; opacity: 0.8;">
                            ${new Date(Number(messageTime)).toTimeString().split(' ')[0]}
                        </div>
                    </div>
                </div>`;
    chatWindow.appendChild(messageElement);
    scrollToBottom();
}

function scrollToBottom() {
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

function removeConversationBoxUsingTimestamp(clickedTimestamp) {
    const messageDivs = chatWindow.querySelectorAll('[data-message-time]');
    // const timestampToUpdate = []
    // Loop through each message div
    messageDivs.forEach((messageDiv) => {
        // Find the button inside the current message div
        const divTimestamp = parseInt(messageDiv.getAttribute('data-message-time'), 10);

        if (divTimestamp >= clickedTimestamp) {
            messageDiv.remove();
            // timestampToUpdate.push(divTimestamp)
        }

    });
    // updateHiddenState(clickedTimestamp)
}

function updateHiddenState(clickedTimestamp) {
    $.post(apiBaseUrl + "/update-chatgpt-message-hidden", {
        userId: userId,
        clickedTimestamp: clickedTimestamp,
    }, function (data, status) {
        if (status === "success") {
            console.log("hide columns finished");
        } else {
            console.log("%c hide columns failed", "color: red");
        }
    });
}

function clearConversation() {
    chatWindow.innerHTML = '';
}

function showConversation(topicId, threadId) {
    const conversationToShow = allTopics[topicId]["messages"][threadId];
    console.log("topicId:", topicId);
    console.log("threadId:", threadId);
    console.log("conversationToShow:", conversationToShow);
    console.log("questionIdToThread:", questionIdToThread);
    if (conversationToShow === undefined) {
        console.log("%c conversationToShow is undefined. It is likely because no chatbot logs are available for current user", "color: red")
        return;
    }
    for (const [key, value] of Object.entries(conversationToShow)) {
        // Stop processing if we hit the specified questionId
        // It will be used for regenerating from selected box.
        // console.log("value.questionId in questionIdToThread[topicId]:", value.questionId in questionIdToThread[topicId])
        // console.log("value.questionId in questionIdToThread[topicId]:", value.questionId in questionIdToThread[topicId])
        // console.log("threadId in questionIdToThread[topicId][value.questionId] :", threadId in questionIdToThread[topicId][value.questionId] )
        if ((value.questionId in questionIdToThread[topicId]) && (value.sender === 'user')) {
            console.log("%c inner entered: " + threadId.toString(), "color:red");
            console.log("%c value.questionId: " + value.questionId.toString(), "color:red");
            if (questionIdToThread[topicId][value.questionId].includes(threadId)) {
                appendUserMutiQuestion(value.text, value.sendTime, value.questionId,
                    questionIdToThread[topicId][value.questionId].length,
                    questionIdToThread[topicId][value.questionId].indexOf(threadId));

            } else {
                appendUserMutiQuestion(value.text, value.sendTime, value.questionId,
                    questionIdToThread[topicId][value.questionId].length,
                    findBranchIndex(threadId, questionIdToThread[topicId][value.questionId], topicId));
            }
            continue
        }
        if (value.sender === 'user') {
            appendUserMessage(value.text, value.sendTime, value.questionId);
        } else {
            appendBotMessage(value.text, value.sendTime, value.id);
        }
    }
}

function findBranchIndex(threadToShow, threadList, topicId) {
    for (let i in threadList) {
        const potentialThread = threadList[i];
        console.log("%c ======", 'color: green')
        console.log(threadList[i])
        console.log(topicId)
        console.log(potentialThread)
        for (let j in allTopics[topicId]["messages"][potentialThread]) {
            const aMessage = allTopics[topicId]["messages"][potentialThread][j];
            console.log(aMessage)
            if ((aMessage["questionId"] in questionIdToThread[topicId])) {
                if (questionIdToThread[topicId][aMessage["questionId"]].includes(threadToShow)) {
                    return threadList.indexOf(potentialThread);
                }
            }
        }
    }
    throw Error(`${threadToShow} not found in the history`)
}

// function insertQuestion(questionId, newQuestion) {
//     // todo更新
//     const current_messages = (allTopics && allTopics[currentTopicId] && allTopics[currentTopicId].messages) || [];
//     console.log("messagessss:", current_messages)
//     let nextMessage = Object.keys(current_messages)[0];
//     // 在根据用户更新的box的id，更新sender 是user的conversation的question，append 新的question，然后更新lastResponseId，在response生成后，用append Response添加response
//     while (nextMessage !== "") {
//         const a_message = current_messages[nextMessage]
//         // console.log("a_message:", nextMessage)
//         // console.log("a_message:", a_message)
//         // 如果questionId 跟给的question
//         if (a_message["questionId"] === questionId) {
//             lastMessageIndex = nextMessage;
//             let messageTime = Date.now().toString();
//             // clear all
//             clearConversation();
//             // add other conversations until this
//             showConversation(questionId)
//             // add
//             // appendUserMessage(message, messageTime, "");
//             // recordResponse(question, (allTopics[currentTopicId].length + 1).toString(), responseMessage.chatgptResponseTime, questionId);
//             updateQuestionRecord(newQuestion, lastMessageIndex)
//             appendUserMutiQuestion(newQuestion, messageTime, questionId, a_message['text'].length + 1, a_message['text'].length + 1)
//             requestChatResponse(newQuestion, messageTime, questionId);
//
//         }
//         nextMessage = a_message["next_iter"];
//
//     }
//     saveTopics();
//
// }

function updateThreadShowing(newThreadId) {
    $.post(apiBaseUrl + "/update-chatgpt-topic", {
        userId: userId,
        courseId: currentCourseId,
        topicId: currentTopicId,
        topicName: allTopics[currentTopicId]["topicName"],
        threadShowing: newThreadId
    })
}

function switchConversation(questionId, offset) {
    let currentTextIndex;
    if (questionIdToThread[currentTopicId][questionId].includes(currentThreadId)) {
        currentTextIndex = questionIdToThread[currentTopicId][questionId].indexOf(currentThreadId);
    } else {
        currentTextIndex = findBranchIndex(currentThreadId, questionIdToThread[currentTopicId][questionId], currentTopicId);
    }

    console.log(currentTextIndex);
    const newIndex = currentTextIndex + offset;

    // if ((newIndex >= questionIdToThread[currentTopicId][questionId].length) || (newIndex < 0)) {
    //     console.log(`%c newIndex: ${newIndex}, questionIdToThread[currentTopicId][questionId].length: ${questionIdToThread[currentTopicId][questionId].length}`, "color: red")
    //     return
    // }
    const newThreadId = questionIdToThread[currentTopicId][questionId][newIndex];
    currentThreadId = questionIdToThread[currentTopicId][questionId][newIndex];

    console.log("/update-chatgpt-topic called")
    updateThreadShowing(newThreadId);
    clearConversation();
    showConversation(currentTopicId, newThreadId);
    console.log("switch finished")
}



function appendUserMutiQuestion(message, messageTime, questionId, numQuestions, showingQuestionIndex) {
    const messageElement = document.createElement('div');
    // const messageTime = new Date().toLocaleTimeString();
    messageElement.classList.add('d-flex', 'justify-content-end', 'mb-2');
    messageElement.setAttribute('data-message-time', messageTime);
    messageElement.innerHTML = `
                <div class="bg-primary text-white rounded p-2" style="max-width: 75%;">
                    <div class="message-content" data-questionid="${questionId}">
                        ${message.replace(/\n/g, '<br>')}
                    </div>
                    <div class="mt-2 d-flex align-items-center justify-content-between">
                        <div class="mt-2 d-flex align-items-center">
                            <i class="bi bi-arrow-clockwise text-white me-3 action-icon regenerate-icon" title="Regenerate Response" style="cursor: pointer;"></i>
                            <i class="bi bi-arrow-clockwise text-white me-3 bi-pencil reenter-icon" title="Re-enter Question" style="cursor: pointer;"></i>
                            <button type="button" class="btn btn-outline-secondary border-0 bi bi-chevron-left previous-question" ${(showingQuestionIndex === 0) ? "disabled" : ""} style="width: 35px;color: ghostwhite">
<!--                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16" style="pointer-events: none;">-->
<!--                                  <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"></path>-->
<!--                                </svg>-->
                            </button>
                            ${showingQuestionIndex + 1}/${numQuestions}
                            <button type="button" class="btn btn-outline-secondary border-0 bi bi-chevron-right next-question" ${((showingQuestionIndex + 1) === numQuestions) ? "disabled" : ""} style="width: 35px;color: ghostwhite">
<!--                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16" style="pointer-events: none;">-->
<!--                                  <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"></path>-->
<!--                                </svg>-->
                            </button>
                        </div>
                        <div class="text-end mt-2 ms-3" style="font-size: 0.8em; opacity: 0.8;">
                            ${new Date(Number(messageTime)).toTimeString().split(' ')[0]}
                        </div>
                    </div>
                    
                </div>`;
    chatWindow.appendChild(messageElement);
    scrollToBottom();

}

function recordQuestion(responseId, question, sendTime, questionId, oldThreadId, firstCreatedInThreadId) {
    console.log("oldThreadId:", oldThreadId);
    if (currentThreadId in allTopics[currentTopicId]["messages"]) {
        allTopics[currentTopicId]["messages"][currentThreadId].push({
            'id': responseId,
            'sender': 'user',
            'text': question,
            'sendTime': sendTime,
            'questionId': questionId,
            'thumb': 0,
            'firstCreatedInThreadId':firstCreatedInThreadId
        });
    }
    else if (oldThreadId === "newTopic") {
        allTopics[currentTopicId]["messages"][currentThreadId] = [{
            'id': responseId,
            'sender': 'user',
            'text': question,
            'sendTime': sendTime,
            'questionId': questionId,
            'thumb': 0,
            'firstCreatedInThreadId': firstCreatedInThreadId
        }];
        updateThreadShowing(currentThreadId)
    }
    else {
        allTopics[currentTopicId]["messages"][currentThreadId] = []
        const copyFromList = allTopics[currentTopicId]["messages"][oldThreadId]
        console.log(oldThreadId)
        console.log(copyFromList)
        for (let i = 0; i < copyFromList.length; i++) {
            if (copyFromList[i].questionId === questionId) {
                break; // stop copying when the target questionId is found
            }
            allTopics[currentTopicId]["messages"][currentThreadId].push(
                {
                    'id': copyFromList[i]['id'],
                    'sender': copyFromList[i]['sender'],
                    'text': copyFromList[i]['text'],
                    'sendTime': copyFromList[i]['sendTime'],
                    'questionId': copyFromList[i]['questionId'],
                    'thumb': copyFromList[i]['thumb'],
                    'firstCreatedInThreadId': copyFromList[i]['firstCreatedInThreadId']
                });
        }
        allTopics[currentTopicId]["messages"][currentThreadId].push({
            'id': responseId,
            'sender': 'user',
            'text': question,
            'sendTime': sendTime,
            'questionId': questionId,
            'thumb': 0,
            'firstCreatedInThreadId': firstCreatedInThreadId
        });
    }

    // appendBotMessage(response, sendTime, key);
    saveTopics();
}


function recordResponse(responseId, response, sendTime, questionId, firstCreatedInThreadId,key) {
    allTopics[currentTopicId]["messages"][currentThreadId].push({
        'id': responseId,
        'sender': 'bot',
        'text': response,
        'sendTime': sendTime,
        'questionId': questionId,
        'thumb': 0,
        "firstCreatedInThreadId": firstCreatedInThreadId
    });
    // appendBotMessage(response, sendTime, key);
    saveTopics();
}

function updateQuestionIdToThread(topicId, questionId, newThread) {
    if (questionId in questionIdToThread[topicId]) {
        questionIdToThread[topicId][questionId].push(newThread);
    } else {
        questionIdToThread[topicId][questionId] = [findCreatedByThreadId(currentTopicId, currentThreadId, questionId)];
        questionIdToThread[topicId][questionId].push(newThread);
    }
}

function findCreatedByThreadId(topicId, threadId, questionId) {
    //保证questionIdToThread里的数据是consistent的,因为这个function只在第一次从某个节点上创建regeneration时才会调用，所以现在的程度就够用了
    const the_messages = allTopics[topicId]["messages"][threadId];
    console.log("questionId: ", questionId)

    for (let i in the_messages) {

        const a_message = the_messages[i];
        console.log(a_message)
        // if (a_message["firstCreatedInThreadId"])
        if (a_message["questionId"] === questionId) {
            return a_message["firstCreatedInThreadId"]
        }
    }
}

function saveTopics() {

}

function updateShowingThread(topicId, newThreadId) {

}

function setupEventListenerForAllMessages() {


    chatWindow.addEventListener('click', function (event) {
        stopEventPropagation(event);
        console.log("clicked chatWindow", event)
        let temp_instant_event = "";
        let temp_event_value = "";
        if (event.target.matches('div[data-message-time] .regenerate-icon')) {
            console.log("clicked regenerate", event)
            // handle when click the regeneration button
            const specificMessageElement = event.target.closest('div[data-message-time]');
            const regenerateIcon = event.target;


            // todo: click 热generate的listener是在这里加上的，之后确认一下为什么要这么写
            // regenerateIcon.addEventListener('click', () => {
                // 显示加载图标
                const messageContentElement = specificMessageElement.querySelector('.message-content');
                const clickedTimestamp = parseInt(specificMessageElement.getAttribute('data-message-time'), 10);
                const questionText = messageContentElement.textContent.trim();
                // messageContentElement.innerHTML = '<div class="text-center"><span class="spinner-border spinner-border-sm text-light" role="status" aria-hidden="true"></span> regenerating...</div>';
                // 禁用图标，防止重复点击
                regenerateIcon.style.pointerEvents = 'none';
                console.log("data-questionid:", messageContentElement.getAttribute("data-questionid"))
                removeConversationBoxUsingTimestamp(clickedTimestamp)
                regenerateConversation(questionText, messageContentElement.getAttribute("data-questionid"));

                // requestChatResponse(questionText, messageContentElement.dataset.questionid);
                temp_instant_event = "REGENERATE";
                temp_event_value = "QUESTION_ID:::" + messageContentElement.getAttribute("data-questionid");
            // });

        } else if (event.target.matches('div[data-message-time] .reenter-icon')) {
            console.log("Edit question");
            console.log(event.target.parentNode.parentNode.parentNode);
            const messageBox = event.target.parentNode.parentNode.parentNode;
            const messageContentDiv = messageBox.querySelector(".message-content");
            const originalMessage = messageContentDiv.textContent.trim();
            const regenerateIcon = messageBox.querySelector(".regenerate-icon");
            const reenterIcon = messageBox.querySelector(".reenter-icon");
            const specificMessageElement = event.target.closest('div[data-message-time]');
            const clickedTimestamp = parseInt(specificMessageElement.getAttribute('data-message-time'), 10);

            temp_instant_event = "EDIT_QUESTION";
            temp_event_value = "QUESTION_ID:::" + messageContentDiv.getAttribute("data-questionid");

            const textarea = document.createElement('textarea');
            textarea.value = originalMessage; // Set the textarea value to the current message
            textarea.style.width = '100%'; // Make the textarea fill the width
            textarea.style.height = '100px'; // Set a fixed height for the textarea

            // Create a confirmation button
            const confirmButton = document.createElement('button');
            confirmButton.innerHTML = `Submit`;
            confirmButton.classList.add('btn', 'btn-sm', 'btn-success'); // Add Bootstrap classes for styling

            // Replace the message-content div with the textarea and confirmation button
            messageContentDiv.replaceWith(textarea);
            const cancelButton = document.createElement('button');
            cancelButton.innerHTML = ``;
            cancelButton.classList.add('btn', 'btn-sm', 'btn-close');

            textarea.insertAdjacentElement('afterend', cancelButton);
            textarea.insertAdjacentElement('afterend', confirmButton);
            regenerateIcon.classList.toggle('d-none');
            reenterIcon.classList.toggle('d-none');
            // Add an event listener to the confirmation button
            // todo tick和cross的event listener
            cancelButton.addEventListener('click', function (e) {
                stopEventPropagation(e);
                console.log("EDIT_QUESTION_CANCEL");

                regenerateIcon.classList.toggle('d-none');
                reenterIcon.classList.toggle('d-none');
                confirmButton.remove();
                cancelButton.remove();
                textarea.replaceWith(messageContentDiv);

                temp_instant_event = "CANCEL_EDIT";
                sendEventMessage('', getCurrentTimestamp(), "INTEGRATED_CHAT", "MOUSE_CLICK", "INTEGRATED_CHAT_EDIT_QUESTION", "INTEGRATED_CHAT", "CHAT_WINDOW", temp_instant_event, temp_event_value, event);
            });

            confirmButton.addEventListener('click', function (e) {
                stopEventPropagation(e);
                console.log("EDIT_QUESTION_CONFIRM");
                // messageContentDiv.innerHTML = textarea.value.replace(/\n/g, '<br>');
                // textarea.messageContentDiv();
                // confirmButton.remove();
                // cancelButton.remove();
                // regenerateIcon.classList.toggle('d-none');
                // reenterIcon.classList.toggle('d-none');
                removeConversationBoxUsingTimestamp(clickedTimestamp)
                regenerateConversation(textarea.value, messageContentDiv.getAttribute("data-questionid"));

                temp_instant_event = "CONFIRM_EDIT";
                sendEventMessage('', getCurrentTimestamp(), "INTEGRATED_CHAT", "MOUSE_CLICK", "INTEGRATED_CHAT_EDIT_QUESTION", "INTEGRATED_CHAT", "CHAT_WINDOW", temp_instant_event, temp_event_value, event);
            });

        } else if (event.target.matches('div[data-message-time] .thumbs-up-icon')) {
            console.log("thumb up");
            let thumbStatus = 0;
            // 获取当前的status
            if (event.target.classList.contains('my-text-success')) {
                event.target.classList.remove('my-text-success'); //有赞的情况下，再点击则 取消 点赞
                event.target.classList.add('text-white');
                thumbStatus = 0;
            } else { //无赞的情况下，
                event.target.classList.add('my-text-success');
                event.target.classList.remove('text-white');
                event.target.nextElementSibling.classList.remove('my-text-danger');
                event.target.nextElementSibling.classList.add('text-white');
                thumbStatus = 1;
            }
            // 根据原本status，修改为 up 1 或者 0

            // let messageContentElement = event.target.closest('div.message-content');
            let messageContentElement = event.target.parentElement.parentElement.previousElementSibling;
            console.log("event.target", event.target);
            console.log("messageContentElement:", messageContentElement);
            requestChangeThumb(messageContentElement.dataset.messageid, thumbStatus);

            temp_instant_event = "RATING_THUMB_UP";
            temp_event_value = "MESSAGE_ID:::" + messageContentElement.dataset.messageid;
        } else if (event.target.matches('div[data-message-time] .thumbs-down-icon')) {
            console.log("thumb down");
            // 获取当前的status
            let thumbStatus = 0;
            // 获取当前的status
            if (event.target.classList.contains('my-text-danger')) {
                event.target.classList.remove('my-text-danger'); //有踩的情况下，再点击则 取消 点踩
                event.target.classList.add('text-white');
                thumbStatus = 0;
            } else { //无踩的情况下，
                event.target.classList.add('my-text-danger');
                event.target.classList.remove('text-white');
                event.target.previousElementSibling.classList.remove('my-text-success');
                event.target.previousElementSibling.classList.add('text-white');
                thumbStatus = 2;
            }
            // 根据原本status，修改为down 2 或者 0

            let messageContentElement = event.target.parentElement.parentElement.previousElementSibling;
            console.log("messageContentElement:", messageContentElement);
            requestChangeThumb(messageContentElement.dataset.messageid, thumbStatus);

            temp_instant_event = "RATING_THUMB_DOWN";
            temp_event_value = "MESSAGE_ID:::" + messageContentElement.dataset.messageid;
        } else if (event.target.matches('div[data-message-time] .next-question')) {
            console.log("same question -> click next -> show next thread");
            if (generating) {
                console.log("%c generating stop", "color: red")
                return;
            }
            console.log(".previous-question clicked")
            const messageBox = event.target.parentNode.parentNode.parentNode;
            const offsetTop = messageBox.offsetTop - messageBox.offsetHeight - 30;
            const messageContentDiv = messageBox.querySelector(".message-content");
            const questionId = messageContentDiv.getAttribute("data-questionid")
            switchConversation(questionId, 1);

            temp_instant_event = "NEXT_QUESTION_THREAD";
            temp_event_value = "QUESTION_ID:::" + questionId;
            // chatWindow.scrollTo({
            //     top: offsetTop,
            //     behavior: 'smooth'
            // })
            // messageBox.scrollIntoView({
            //     behavior: 'smooth', // Smooth scrolling
            //     block: 'center'     // Scroll so that the element is centered in the container
            // });
        } else if (event.target.matches('div[data-message-time] .previous-question')) {
            console.log("same question -> click previous -> show previous thread");
            if (generating) {
                console.log("%c generating stop", "color: red")
                return;
            }
            const messageBox = event.target.parentNode.parentNode.parentNode;
            const offsetTop = messageBox.offsetTop - messageBox.offsetHeight - 30;
            const messageContentDiv = messageBox.querySelector(".message-content");
            const questionId = messageContentDiv.getAttribute("data-questionid")
            switchConversation(questionId, -1)
            console.log(".next-question clicked");
            temp_instant_event = "PREVIOUS_QUESTION_THREAD";
            temp_event_value = "QUESTION_ID:::" + questionId;
            // chatWindow.scrollTo({
            //     top: offsetTop,
            //     behavior: 'smooth'
            // })
        }
        //记录点击事件
        sendEventMessage('', getCurrentTimestamp(), "INTEGRATED_CHAT", "MOUSE_CLICK", "INTEGRATED_CHAT_INTERACTION", "INTEGRATED_CHAT", "CHAT_WINDOW", temp_instant_event, temp_event_value, event);
    });
    // 记录鼠标移动
    chatWindow.addEventListener('mousemove', function (e) {
        stopEventPropagation(e);
        mousePosition = generateMousePositionData(e, "INTEGRATED_CHAT_READ_CHAT", "INTEGRATED_CHAT");
    });
    // 记录鼠标滚动
    chatWindow.addEventListener('wheel', function (e) {
        stopEventPropagation(e);
        sendEventMessage('', getCurrentTimestamp(), "INTEGRATED_CHAT", "MOUSE_WHEEL", "INTEGRATED_CHAT_READ_CHAT", "INTEGRATED_CHAT", "CHAT_WINDOW", "NO_INSTANT_EVENT", "SCROLL_DIST:::" + e.deltaY, e);
    });
    // 记录select 文本
    chatWindow.addEventListener('mouseup', function (e) {
        stopEventPropagation(e);
        if (window.getSelection() != null && window.getSelection().toString().replace(/\n/g, '').length > 0) {
            let selectText = window.getSelection().toString();
            sendEventMessage('', getCurrentTimestamp(), "INTEGRATED_CHAT", "MOUSE_SELECT_TEXT", "INTEGRATED_CHAT_READ_CHAT", "INTEGRATED_CHAT", "CHAT_WINDOW", "NO_INSTANT_EVENT", "MOUSE_SELECT:::" + selectText, e);
        }
    });

    //添加鼠标移动，滚动，点击，select text topic
    topicArea.addEventListener('click', function (e) {
        stopEventPropagation(e);
        sendEventMessage('', getCurrentTimestamp(), "INTEGRATED_CHAT", "MOUSE_CLICK", "INTEGRATED_CHAT_READ_TOPIC", "INTEGRATED_CHAT", "TOPIC_AREA", "NO_INSTANT_EVENT", "", e);
    });
    topicArea.addEventListener('mousemove', function (e) {
        stopEventPropagation(e);
        mousePosition = generateMousePositionData(e, "INTEGRATED_CHAT_READ_TOPIC", "INTEGRATED_CHAT");
    });
    topicArea.addEventListener('wheel', function (e) {
        stopEventPropagation(e);
        sendEventMessage('', getCurrentTimestamp(), "INTEGRATED_CHAT", "MOUSE_WHEEL", "INTEGRATED_CHAT_READ_TOPIC", "INTEGRATED_CHAT", "TOPIC_AREA", "NO_INSTANT_EVENT", "SCROLL_DIST:::" + e.deltaY, e);
    });
    topicArea.addEventListener('mouseup', function (e) {
        stopEventPropagation(e);
        if (window.getSelection() != null && window.getSelection().toString().replace(/\n/g, '').length > 0) {
            let selectText = window.getSelection().toString();
            sendEventMessage('', getCurrentTimestamp(), "INTEGRATED_CHAT", "MOUSE_SELECT_TEXT", "INTEGRATED_CHAT_READ_TOPIC", "INTEGRATED_CHAT", "TOPIC_AREA", "NO_INSTANT_EVENT", "MOUSE_SELECT:::" + selectText, e);
        }
    });

    // 记录点击事件
    chatForm.addEventListener('click', function(e) {
        stopEventPropagation(e);
        sendEventMessage('', getCurrentTimestamp(), "INTEGRATED_CHAT", "MOUSE_CLICK", "INTEGRATED_CHAT_READ_INPUT", "INTEGRATED_CHAT", "CHAT_FORM", "NO_INSTANT_EVENT", "", e);
    });
    // 记录鼠标移动
    chatForm.addEventListener('mousemove', function(e) {
        stopEventPropagation(e);
        mousePosition = generateMousePositionData(e, "INTEGRATED_CHAT_READ_INPUT", "INTEGRATED_CHAT");
    });
    // 记录鼠标滚动
    chatForm.addEventListener('wheel', function(e) {
        stopEventPropagation(e);
        sendEventMessage('', getCurrentTimestamp(), "INTEGRATED_CHAT", "MOUSE_WHEEL", "INTEGRATED_CHAT_READ_INPUT", "INTEGRATED_CHAT", "CHAT_FORM", "NO_INSTANT_EVENT", "SCROLL_DIST:::" + e.deltaY, e);
    });
    // 记录select 文本
    chatForm.addEventListener('mouseup', function(e) {
        stopEventPropagation(e);
        if (window.getSelection() != null && window.getSelection().toString().replace(/\n/g, '').length > 0) {
            let selectText = window.getSelection().toString();
            sendEventMessage('', getCurrentTimestamp(), "INTEGRATED_CHAT", "MOUSE_SELECT_TEXT", "INTEGRATED_CHAT_READ_INPUT", "INTEGRATED_CHAT", "CHAT_FORM", "NO_INSTANT_EVENT", "MOUSE_SELECT:::" + selectText, e);
        }
    });
    // 记录paste 文本
    chatForm.addEventListener('paste', function(e) {
        stopEventPropagation(e);
        let pasteText = e.clipboardData.getData("text");
        sendEventMessage('', getCurrentTimestamp(), "INTEGRATED_CHAT", "PASTE_TEXT", "INTEGRATED_CHAT_INPUT_PASTE_TEXT", "INTEGRATED_CHAT", "CHAT_FORM", "NO_INSTANT_EVENT", "PASTE_TEXT:::" + pasteText, e);
    });

    // Handle topic switching
    topicList.addEventListener('click', (e) => {
        stopEventPropagation(e);
        e.preventDefault();
        const target = e.target;
        // Handle topic link click
        if (target.tagName === 'A') {
            const topicId = target.getAttribute('data-topic-id');
            if (topicId) {
                switchTopic(topicId, topicShowingThreadId[topicId]);
                sendEventMessage('', getCurrentTimestamp(), "INTEGRATED_CHAT", "MOUSE_CLICK", "INTEGRATED_CHAT_SWITCH_TOPIC", "INTEGRATED_CHAT", "TOPIC_AREA", "NO_INSTANT_EVENT", "SWITCH_TO_TOPIC:::" + topicId, e);
            }
        }

        // Handle rename icon click
        if (target.classList.contains('rename-topic')) {
            const topicId = target.getAttribute('data-topic-id');
            renameTopic(topicId);
        }

        // Handle delete icon click
        if (target.classList.contains('delete-topic')) {
            const topicId = target.getAttribute('data-topic-id');
            deleteTopic(topicId);
        }
    });

    // Handle new topic creation
    newTopicBtn.addEventListener('click', (e) => {
        stopEventPropagation(e);
        // Prompt user for topic name
        const topicName = prompt("Enter new topic name:");
        let temp_instant_event = "";
        if (topicName && topicName.trim() !== '') {
            createNewTopic(topicName.trim());
            temp_instant_event = "CONFIRM_CREATE";
        } else {
            temp_instant_event = "CANCEL_CREATE";
        }
        sendEventMessage('', getCurrentTimestamp(), "INTEGRATED_CHAT", "MOUSE_CLICK", "INTEGRATED_CHAT_CREATE_TOPIC", "INTEGRATED_CHAT", "TOPIC_AREA", temp_instant_event, "CREATE_TOPIC_NAME:::" + topicName.trim(), e);
    });

    // Handle form submission
    chatForm.addEventListener('submit', (e) => {
        stopEventPropagation(e);
        console.log("into submit");
        e.preventDefault();
        const message = userInput.value.trim();
        let temp_instant_event = "";
        if (message !== '') {
            generateConversation(message, "");
            temp_instant_event = "SUBMIT_CHAT";
        } else {
            alert("Please enter a message before sending.");
            temp_instant_event = "CANCEL_SUBMIT";
        }

        sendEventMessage('', getCurrentTimestamp(), "INTEGRATED_CHAT", "MOUSE_CLICK", "INTEGRATED_CHAT_SUBMIT_QUESTION", "INTEGRATED_CHAT", "CHAT_FORM", temp_instant_event, "QUESTION:::" + message, e);
    });

// Handle textarea keydown events for Enter and Ctrl + Enter
    userInput.addEventListener('keydown', (e) => {
        stopEventPropagation(e);
        if (e.key === 'Enter') {
            if (e.ctrlKey) {
                // Ctrl + Enter to submit the form
                e.preventDefault();
                chatForm.dispatchEvent(new Event('submit'));
                const message = userInput.value.trim();
                sendEventMessage('', getCurrentTimestamp(), "INTEGRATED_CHAT", "KEYBOARD_STROKE", "INTEGRATED_CHAT_SUBMIT_QUESTION", "INTEGRATED_CHAT", "CHAT_FORM_INPUT", "PRESS_ENTER", "QUESTION:::" + message, e);
            } else {
                // Enter key adds a new line
                // Do nothing special, allow default behavior
            }
        }

        sendEventMessage("", getCurrentTimestamp(), "INTEGRATED_CHAT", "KEYBOARD_STROKE", "INTEGRATED_CHAT_INPUT", "INTEGRATED_CHAT", "CHAT_FORM_INPUT", "WRITE", "KEY:::" + e.key + "---" + e.code, e);
    });
}

// function getCurrentConversation(topicId) {
//     const messages = (allTopics && allTopics[topicId] && allTopics[topicId].messages) || [];
//     console.log("messagessss:", messages)
//
//     // 假定第一个element是最早的那个
//
//     const resultConversationBranch = [];
//     let resultLastMessageId;
//     let nextMessage = Object.keys(messages)[0];
//
//     while (nextMessage !== "") {
//         const a_message = messages[nextMessage]
//         // console.log("a_message:", nextMessage)
//         // console.log("a_message:", a_message)
//         // 如果不存在下一个message的id，则说明到最后了，更新一下lastMessageId，方便之后更新Conversation
//         if (nextMessage === "")
//             resultLastMessageId = nextMessage
//         nextMessage = a_message["next_iter"]
//
//         const qindex = a_message['next_iter_list'].indexOf(nextMessage);
//
//         resultConversationBranch.push({
//             'id': a_message['id'],
//             'sender': a_message['sender'],
//             'text': qindex !== -1 ? a_message['text'][qindex] : a_message['text'][0],
//             'sendTime': a_message['sendTime'],
//             'questionId': a_message['questionId'],
//             'thumb': a_message['thumb']
//         })
//     }
//     console.log("resultConversationBranch:", resultConversationBranch)
//     return {resultConversationBranch: resultConversationBranch, resultLastMessageId: resultLastMessageId}
// }
//
// function getRecordIndexByQuestionId(questionId) {
//     const messages = (allTopics && allTopics[currentTopicId] && allTopics[currentTopicId].messages) || [];
//     console.log("messagessss:", messages)
//     let nextMessage = Object.keys(messages)[0];
//
//     while (nextMessage !== "") {
//         const a_message = messages[nextMessage]
//         // console.log("a_message:", nextMessage)
//         // console.log("a_message:", a_message)
//         // 如果不存在下一个message的id，则说明到最后了，更新一下lastMessageId，方便之后更新Conversation
//         if (a_message["questionId"] === questionId && a_message["sender"] === 'user')
//             return nextMessage;
//     }
//     throw Error("getRecordIndexByQuestionId() error. Question Id not found.")
// }

// function to manage the allTopics variable
// function switchConversation(questionId, offset) {
//     const recordIndex = getRecordIndexByQuestionId(questionId);
//     const oldNextIter = allTopics[currentTopicId][recordIndex]['next_iter'];
//     const currentTextIndex = allTopics[currentTopicId][recordIndex]['next_iter_list'].indexOf(oldNextIter);
//     const newIndex = currentTextIndex + offset;
//
//     if (newIndex >= allTopics[currentTopicId][recordIndex]['next_iter_list'].length || newIndex < 0)
//         return
//
//     allTopics[currentTopicId][recordIndex]['next_iter'] = allTopics[currentTopicId][recordIndex]['next_iter_list'][currentTextIndex + offset]
//     clearConversation();
//     showConversation();
// }

// function clearConversation() {
//     chatWindow.innerHTML = '';
// }
//
// function showConversation(untilQuestionId) {
//     const res = getCurrentConversation(currentTopicId);
//     const conversationToShow = res["resultConversationBranch"];
//
//     if (untilQuestionId === undefined)
//         lastMessageIndex = res["resultLastMessageId"];
//
//     for (const [key, value] of Object.entries(conversationToShow)) {
//         // Stop processing if we hit the specified questionId
//         // It will be used for regenerating from selected box.
//         if (untilQuestionId !== undefined && value.questionId === untilQuestionId) {
//             break;
//         }
//
//         if (value.sender === 'user') {
//             appendUserMessage(value.text, value.sendTime, value.questionId);
//         } else {
//             appendBotMessage(value.text, value.sendTime, key);
//         }
//     }
// }

// function insertQuestion(questionId, newQuestion) {
//     const current_messages = (allTopics && allTopics[currentTopicId] && allTopics[currentTopicId].messages) || [];
//     console.log("messagessss:", current_messages)
//     let nextMessage = Object.keys(current_messages)[0];
//     // 在根据用户更新的box的id，更新sender 是user的conversation的question，append 新的question，然后更新lastResponseId，在response生成后，用append Response添加response
//     while (nextMessage !== "") {
//         const a_message = current_messages[nextMessage]
//         // console.log("a_message:", nextMessage)
//         // console.log("a_message:", a_message)
//         // 如果questionId 跟给的question
//         if (a_message["questionId"] === questionId) {
//             lastMessageIndex = nextMessage;
//             let messageTime = Date.now().toString();
//             // clear all
//             clearConversation();
//             // add other conversations until this
//             showConversation(questionId)
//             // add
//             // appendUserMessage(message, messageTime, "");
//             // recordResponse(question, (allTopics[currentTopicId].length + 1).toString(), responseMessage.chatgptResponseTime, questionId);
//             updateQuestionRecord(newQuestion, lastMessageIndex)
//             appendUserMutiQuestion(newQuestion, messageTime, questionId, a_message['text'].length + 1, a_message['text'].length + 1)
//             requestChatResponse(newQuestion, messageTime, questionId);
//
//         }
//         nextMessage = a_message["next_iter"];
//
//     }
//     saveTopics();
//
// }

// function appendUserMutiQuestion(message, messageTime, questionId, numQuestions, showingQuestionIndex) {
//     const messageElement = document.createElement('div');
//     // const messageTime = new Date().toLocaleTimeString();
//     messageElement.classList.add('d-flex', 'justify-content-end', 'mb-2');
//     messageElement.setAttribute('data-message-time', messageTime);
//     messageElement.innerHTML = `
//                 <div class="bg-primary text-white rounded p-2" style="max-width: 75%;">
//                     <div class="message-content" data-questionid="${questionId}">
//                         ${message.replace(/\n/g, '<br>')}
//                     </div>
//                     <div class="mt-2 d-flex align-items-center justify-content-between">
//                         <div class="mt-2 d-flex align-items-center">
//                             <i class="bi bi-arrow-clockwise text-white me-3 action-icon regenerate-icon" title="Regenerate Response" style="cursor: pointer;"></i>
//                             <i class="bi bi-arrow-clockwise text-white me-3 bi-pencil reenter-icon" title="Re-enter Question" style="cursor: pointer;"></i>
//                             <button type="button" class="btn btn-outline-secondary border-0 next-question">
//                                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
//                                   <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"></path>
//                                 </svg>
//                             </button>
//                             ${showingQuestionIndex + 1}/${numQuestions}
//                             <button type="button" class="btn btn-outline-secondary border-0 previous-question">
//                                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
//                                   <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"></path>
//                                 </svg>
//                             </button>
//                         </div>
//                         <div class="text-end mt-2 ms-3" style="font-size: 0.8em; opacity: 0.8;">
//                             ${new Date(Number(messageTime)).toTimeString().split(' ')[0]}
//                         </div>
//                     </div>
//
//                 </div>`;
//     chatWindow.appendChild(messageElement);
//     scrollToBottom();
//
// }
//
// function recordQuestion(question, next_iter, sendTime, questionId) {
//     allTopics[currentTopicId][lastMessageIndex]["next_iter"] = next_iter
//     allTopics[currentTopicId][lastMessageIndex]["next_iter_list"].push(next_iter)
//     allTopics[currentTopicId][next_iter] = {
//         'id': currentTopicId,
//         'sender': 'user',
//         'text': [question],
//         'sendTime': sendTime,
//         'questionId': questionId,
//         'thumb': 0,
//         'next_iter': "",
//         'next_iter_list': []
//     };
//     lastMessageIndex = next_iter;
//     // appendUserMessage(question, sendTime, questionId);
//     saveTopics();
// }
//
// function updateQuestionRecord(newQuestion, index) {
//     allTopics[currentTopicId][index]["text"].append(newQuestion)
// }
//
// function recordResponse(response, next_iter, sendTime, questionId, key) {
//     allTopics[currentTopicId][lastMessageIndex]["next_iter"] = next_iter
//     allTopics[currentTopicId][lastMessageIndex]["next_iter_list"].push(next_iter)
//     allTopics[currentTopicId][next_iter] = {
//         'id': currentTopicId,
//         'sender': 'bot',
//         'text': [response],
//         'sendTime': sendTime,
//         'questionId': questionId,
//         'thumb': 0,
//         'next_iter': "",
//         'next_iter_list': []
//     };
//     lastMessageIndex = next_iter;
//     // appendBotMessage(response, sendTime, key);
//     saveTopics();
// }
//
// function saveTopics() {
//
// }

init();

