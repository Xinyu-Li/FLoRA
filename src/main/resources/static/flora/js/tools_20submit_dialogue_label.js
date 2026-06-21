function renderEmbeddedLabelBox() {
    const htmlCode = `
        <div class="row py-4">
            <div class="mb-3">
              <p>
                A dialogue that reveal potential biases in ChatGPT, <br>
                along with your justification for why you believe the <br>
                dialogue demonstrates potential bias.
              </p>
            </div>
        
            <div class="mb-5">
              <label class="form-label"><strong>Please copy and paste the dialogue with ChatGPT in this section.</strong></label>
              <textarea id="submit-dialogue-textarea" class="form-control" rows="8" placeholder="Paste dialogue here..."></textarea>
            </div>
        
            <div class="mb-5">
              <label class="form-label"><strong>Please provide your justification in this section.</strong></label>
              <textarea id="submit-dialogue-justification-textarea" class="form-control" rows="8" placeholder="Enter your justification..."></textarea>
            </div>
        
            <!-- Status + Submit Row -->
            <div class="d-flex justify-content-between align-items-center">
              <div class="px-3 py-2" id="submit-dialogue-count-label">
                You have submitted 0 dialogues.
              </div>
              <button class="btn btn-outline-secondary" id="submit-dialogue-btn">
                Submit
              </button>
            </div>
        
        </div>
        <div class="row py-4">
            <table class="table table-striped table-hover" id="dialogue-label-table" style="margin-left:5%;width:90%;">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Dialogue With Chatbot</th>
                        <th>Your Justification</th>
                        <th>Action</th>
                    </tr>         
                </thead>
                <tbody id="dialogue-label-table-body">
                </tbody>
            </table>
        </div>
        `;

    document.getElementById("embedded-label-box").innerHTML = htmlCode;
}

renderEmbeddedLabelBox();

const embeddedLabelBoxDiv = document.getElementById("embedded-label-box");
const submitDialogueBtn = document.getElementById("submit-dialogue-btn");
const submitDialogueCountLabel = document.getElementById("submit-dialogue-count-label");
const submitDialogueTextarea = document.getElementById("submit-dialogue-textarea");
const submitDialogueJustificationTextarea = document.getElementById("submit-dialogue-justification-textarea");
const dialogueTableBody = document.getElementById("dialogue-label-table-body");

const myMainInner = document.getElementById('topofscroll');
if (myMainInner !== null) {
    myMainInner.style.marginLeft = "90px";
    myMainInner.style.maxWidth = "1280px";
    // myPageContent.style.width = "1000px";
}

function loadLabelResult() {
    const data = {
        userId: userId,
        courseId: currentCourseId,
    };
    fetch(apiBaseUrl + "/get-dialogue-label", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json(); // 如果返回 JSON 数据
        })
        .then(result => {
            console.log("Success:", result);
            let count = 0;
            if (result.data) {
                result.data.forEach((item, index) => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${index + 1}</td>
                        <td>${item.dialogueText} &hellip; &hellip;</td>
                        <td>${item.justificationText}</td>
                        <td><button class="btn btn-danger delete-dialogue-label-btn" data-id="${item.id}">Delete</button></td>
                    `;
                    dialogueTableBody.appendChild(row);
                    count = index + 1;
                })
            }

            submitDialogueCountLabel.innerText = `You have submitted ${count} dialogues.`;

        })
        .catch(error => {
            console.error("Error:", error);
            alert("Submission failed.");
        });


}

function setupEmbeddedLabelBox() {
    submitDialogueBtn.addEventListener("click", function(e) {

        if (!submitDialogueTextarea.value || !submitDialogueJustificationTextarea.value) {
            alert("Dialogue or justification cannot be empty");
            sendEventMessage("", getCurrentTimestamp(), "SUBMIT_DIALOGUE_LABEL", "MOUSE_CLICK", "SUBMIT_LABEL_RESULT_FAIL", "SUBMIT_DIALOGUE_LABEL", "SUBMIT_BTN", "CLICK", "Dialogue or justification empty", e);
            return;
        }
        sendEventMessage("", getCurrentTimestamp(), "SUBMIT_DIALOGUE_LABEL", "MOUSE_CLICK", "SUBMIT_LABEL_RESULT", "SUBMIT_DIALOGUE_LABEL", "SUBMIT_BTN", "CLICK", "", e);
        // 要发送的数据对象
        const data = {
            userId: userId,
            courseId: currentCourseId,
            dialogueText: submitDialogueTextarea.value,
            justificationText: submitDialogueJustificationTextarea.value
        };
        submitDialogueBtn.disabled = true;
        // 发送 POST 请求
        fetch(apiBaseUrl + "/submit-dialogue-label", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json(); // 如果返回 JSON 数据
            })
            .then(result => {
                console.log("Success:", result);
                let newId = result.data;
                const totalRows = dialogueTableBody.querySelectorAll('tr').length;  // 当前总行数
                submitDialogueCountLabel.innerText = `You have submitted ${totalRows + 1} dialogues.`;
                submitDialogueBtn.disabled = false;
                const row = document.createElement('tr');
                row.innerHTML = `
                        <td>${totalRows + 1}</td>
                        <td>${submitDialogueTextarea.value} &hellip; &hellip;</td>
                        <td>${submitDialogueJustificationTextarea.value}</td>
                        <td><button class="btn btn-danger delete-dialogue-label-btn" data-id="${newId}">Delete</button></td>
                    `;
                dialogueTableBody.appendChild(row);
                submitDialogueTextarea.value = "";
                submitDialogueJustificationTextarea.value = "";
            })
            .catch(error => {
                console.error("Error:", error);
                alert("Submission failed.");
            });

    });

    submitDialogueTextarea.addEventListener('copy', function(event) {
        stopEventPropagation(e);
        const { selectionStart, selectionEnd, value } = event.target;
        const copiedText = value.substring(selectionStart, selectionEnd);
        sendEventMessage("", getCurrentTimestamp(), "SUBMIT_DIALOGUE_LABEL", "COPY", "SUBMIT_DIALOGUE_LABEL_DIALOGUE_INPUT", "SUBMIT_DIALOGUE_LABEL", "DIALOGUE_INPUT", "COPY", "COPY_TEXT:::" + copiedText, e);
    });

    submitDialogueTextarea.addEventListener('paste', function(event) {
        stopEventPropagation(e);
        const pastedText = event.clipboardData.getData('text');
        sendEventMessage("", getCurrentTimestamp(), "SUBMIT_DIALOGUE_LABEL", "PASTE", "SUBMIT_DIALOGUE_LABEL_DIALOGUE_INPUT", "SUBMIT_DIALOGUE_LABEL", "DIALOGUE_INPUT", "PASTE", "PASTE_TEXT:::" + pastedText, e);
    });
    submitDialogueTextarea.addEventListener("keydown", function(e) {
        stopEventPropagation(e);
        sendEventMessage("", getCurrentTimestamp(), "SUBMIT_DIALOGUE_LABEL", "KEYBOARD_STROKE", "SUBMIT_DIALOGUE_LABEL_DIALOGUE_INPUT", "SUBMIT_DIALOGUE_LABEL", "DIALOGUE_INPUT", "WRITE", "KEY:::" + e.key + "---" + e.code, e);
    });

    submitDialogueJustificationTextarea.addEventListener('copy', function(event) {
        stopEventPropagation(e);
        const { selectionStart, selectionEnd, value } = event.target;
        const copiedText = value.substring(selectionStart, selectionEnd);
        sendEventMessage("", getCurrentTimestamp(), "SUBMIT_DIALOGUE_LABEL", "COPY", "SUBMIT_DIALOGUE_LABEL_JUSTIFICATION_INPUT", "SUBMIT_DIALOGUE_LABEL", "JUSTIFICATION_INPUT", "COPY", "COPY_TEXT:::" + copiedText, e);
    });

    submitDialogueJustificationTextarea.addEventListener('paste', function(event) {
        stopEventPropagation(e);
        const pastedText = event.clipboardData.getData('text');
        sendEventMessage("", getCurrentTimestamp(), "SUBMIT_DIALOGUE_LABEL", "PASTE", "SUBMIT_DIALOGUE_LABEL_JUSTIFICATION_INPUT", "SUBMIT_DIALOGUE_LABEL", "JUSTIFICATION_INPUT", "PASTE", "PASTE_TEXT:::" + pastedText, e);
    });
    submitDialogueJustificationTextarea.addEventListener("keydown", function(e) {
        stopEventPropagation(e);
        sendEventMessage("", getCurrentTimestamp(), "SUBMIT_DIALOGUE_LABEL", "KEYBOARD_STROKE", "SUBMIT_DIALOGUE_LABEL_JUSTIFICATION_INPUT", "SUBMIT_DIALOGUE_LABEL", "JUSTIFICATION_INPUT", "WRITE", "KEY:::" + e.key + "---" + e.code, e);
    });

    embeddedLabelBoxDiv.addEventListener("click", function (e) {
        stopEventPropagation(e);
        if (e.target && e.target.matches(".delete-dialogue-label-btn")) {
            let id = e.target.getAttribute('data-id');
            if (id) {
                fetch(apiBaseUrl + "/delete-dialogue-label/" + id).then(response => {
                    if (response.ok) {
                        // 删除按钮的父元素
                        let tr = e.target.parentElement.parentElement;
                        tr.parentNode.removeChild(tr);
                    } else {
                        // 可选：处理错误情况
                        alert("删除失败！");
                    }
                })
                    .catch(err => {
                        // 可选：处理 fetch 异常
                        alert("网络错误！");
                    });

            }
        }
        sendEventMessage("", getCurrentTimestamp(), "SUBMIT_DIALOGUE_LABEL", "MOUSE_CLICK", "SUBMIT_DIALOGUE_LABEL_CLICK", "SUBMIT_DIALOGUE_LABEL", e.target, "NO_INSTANT_EVENT", "", e);
    });
    embeddedLabelBoxDiv.addEventListener("wheel", function (e) {
        stopEventPropagation(e);
        sendEventMessage("", getCurrentTimestamp(), "SUBMIT_DIALOGUE_LABEL", "MOUSE_WHEEL", "READ_SUBMIT_DIALOGUE_LABEL", "SUBMIT_DIALOGUE_LABEL", e.target, "NO_INSTANT_EVENT", "SCROLL_DIST:::" + e.deltaY, e);
    });
    embeddedLabelBoxDiv.addEventListener("mousemove", function (e) {
        stopEventPropagation(e);
        mousePosition = generateMousePositionData(e, "READ_SUBMIT_DIALOGUE_LABEL", "SUBMIT_DIALOGUE_LABEL");
    });
    embeddedLabelBoxDiv.addEventListener("mouseup", function (e) {
        stopEventPropagation(e);
        if (window.getSelection() != null && window.getSelection().toString().replace(/\n/g, '').length > 0) {
            let selectText = window.getSelection().toString();
            sendEventMessage("", getCurrentTimestamp(), "SUBMIT_DIALOGUE_LABEL", "MOUSE_SELECT_TEXT", "SUBMIT_DIALOGUE_LABEL_SELECT_TEXT", "SUBMIT_DIALOGUE_LABEL", e.target, "SELECT_TEXT", "MOUSE_SELECT:::" + selectText, e);
        }
    });
}


setupEmbeddedLabelBox();
loadLabelResult();