var consultantTitle = "病例汇报";

var consultantSendBtnText = "提交汇报结果";
// var consultantWritingFinishBtnText = "结束思考";
function render() {
    let consultSubmitToolHtml = `
  <div class="my-horizontal-collapse-tools my-consultation-submit"
       id="consultation-collapse">
    <div class="card card-body position-relative"
         style="max-width:600px;height:100%;min-height:260px;">
      <h5 class="card-title mb-3">${consultantTitle}</h5>

      <button type="button"
              class="btn-close position-absolute top-0 end-0 me-3 mt-3"
              aria-label="Close" id="close-consultation-submit-btn"></button>

      <!-- ====== 表单开始 ====== -->
      <form id="consultationForm" class="mb-3">

        <!-- 患者信息 -->
        <div class="mb-2">
          <label class="form-label fw-bold">患者信息</label>
          <textarea type="text" class="form-control"
                 name="patientInfo"
                 placeholder="一句话概括姓名、年龄、性别、现存主要医疗问题及入院原因……"></textarea>
        </div>

        <!-- 主要诊断 -->
        <div class="mb-2">
          <label class="form-label fw-bold">主要诊断</label>
          <textarea class="form-control" rows="2"
                    name="mainDx"
                    placeholder="若有多个诊断并列，用 a)、b)、c) 分列"></textarea>
        </div>

        <!-- 诊断依据：一个大 textarea -->
        <div class="mb-2">
          <label class="form-label fw-bold">诊断依据(主诉、病史、体格检查、辅助检查)</label>
           <small class="form-text text-muted">若有多个诊断分点作答</small>
          <textarea class="form-control" rows="6"
                    name="dxBasis"
                    placeholder="主诉：\n病史：\n体格检查：\n辅助检查："></textarea>
        </div>

        <!-- 治疗计划 -->
        <div class="mb-2">
          <label class="form-label fw-bold">治疗计划</label>
          <textarea class="form-control" rows="2"
                    name="plan"
                    placeholder="治疗原则即可，无需具体药物及剂量"></textarea>
        </div>

        <!-- 提交按钮 -->
        <button type="submit" class="btn btn-success w-100"
                id="consultationSaveBtn">${consultantSendBtnText}</button>
      </form>
      <!-- ====== 表单结束 ====== -->

    </div>
  </div>`;
    $("body").append(consultSubmitToolHtml);
}
render();
let showConsultationBtn = document.querySelector("#show-consultation-btn");
let closeConsultationSubmitBtn = document.querySelector("#close-consultation-submit-btn");
let consultationCollapse = document.querySelector("#consultation-collapse");
let consultationForm = document.querySelector("#consultationForm");
// let consultantPanelInput = document.querySelector("#consultantPanelInput");
// let consultantTextarea = document.querySelector("#consultant-textarea");
// let consultationSubmitBtn = document.querySelector("#consultationSubmitBtn");
let consultationSaveBtn = document.querySelector("#consultationSaveBtn");


let consultationClickTargetObject = "NO_TARGET_OBJECT";
let consultationPageEvent = "NO_PAGE_EVENT";
let consultationInstantEvent = "CLOSE";
let consultationToolStartUseTime = 0;


toolList1.push(consultationCollapse);


showConsultationBtn.addEventListener("click", function (e) {
    // console.log("---------------------------- showConsultationBtn clicked");
    stopEventPropagation(e);
    if (useAnnotationTool){ hideAnnotationToolbox();}
    activatePanel(consultationCollapse);
    // consultationCollapse.classList.toggle("in-tools");
    // toolsAndEssayToggle(consultationCollapse)
    consultationClickTargetObject  = "SHOW_CONSULTATION_WRITING_BTN";
    consultationPageEvent = "MOUSE_CLICK";

    // sendEventMessage("", getCurrentTimestamp(), "CONSULTATION_WRITING", consultationPageEvent, subActionLabelMap["CHATGPT_ASSESSMENT_CLICK"], "CHATGPT_ASSESSMENT", consultationClickTargetObject, "SHOW_CHATGPT_ASSESSMENT_BTN_CLICK", "", null);
    sendEventMessage("", getCurrentTimestamp(), "CONSULTATION_WRITING", consultationPageEvent, subActionLabelMap["CHATGPT_ASSESSMENT_CLICK"], "CONSULTATION_WRITING", consultationClickTargetObject, "SHOW_CONSULTATION_WRITING_BTN_CLICK", "", null);

});

closeConsultationSubmitBtn.addEventListener("click", function (e) {
    stopEventPropagation(e);
    if (useAnnotationTool){ hideAnnotationToolbox();}
    // consultationCollapse.classList.toggle("in-tools");
    // toolsAndEssayToggle(consultationCollapse)
    activatePanel(consultationCollapse);
    consultationClickTargetObject  = "X_CONSULTATION_WRITING_BTN";
    consultationPageEvent = "MOUSE_CLICK";

    // sendEventMessage("", getCurrentTimestamp(), "CONSULTATION_WRITING", consultationPageEvent, subActionLabelMap["CHATGPT_ASSESSMENT_CLICK"], "CHATGPT_ASSESSMENT", consultationClickTargetObject, "SHOW_CHATGPT_ASSESSMENT_BTN_CLICK", "", null);
    sendEventMessage("", getCurrentTimestamp(), "CONSULTATION_WRITING", consultationPageEvent, subActionLabelMap["CHATGPT_ASSESSMENT_CLICK"], "CONSULTATION_WRITING", consultationClickTargetObject, "SHOW_CONSULTATION_WRITING_BTN_CLICK", "", null);
    consultationClickTargetObject = "NO_TARGET_OBJECT";
});

function submitConsultation() {
    const fd = new FormData(consultationForm);
    const obj = {
        patientInfo : fd.get("patientInfo").trim(),
        mainDx      : fd.get("mainDx").trim(),
        dxBasis     : fd.get("dxBasis").trim(),
        plan        : fd.get("plan").trim()
    };
    const jsonStr   = JSON.stringify(obj);
    const timestamp = new Date().toLocaleTimeString();

    $.post(apiBaseUrl + "/submit-consult-result", {
        userId:        userId,
        courseId:      currentCourseId,
        contentResult: jsonStr,
        saveTime:      timestamp,
        score:         0,
        feedback:      ""
    }, function(data, status){
        if (status === "success") {
            alert("提交成功");
            localStorage.setItem(
                `${userId}-${currentCourseId}-Consultation-${taskStage}`, jsonStr);
        } else {
            alert("提交失败！请稍后再试。");
        }
    });

    return jsonStr; // 作为埋点附带内容
}

function restoreConsultationFromLocal(){
    const key  = `${userId}-${currentCourseId}-Consultation-${taskStage}`;
    const save = localStorage.getItem(key);
    if(!save) return;

    try {             // 新格式：JSON
        const obj = JSON.parse(save);
        consultationForm.patientInfo.value = obj.patientInfo || "";
        consultationForm.mainDx.value      = obj.mainDx      || "";
        consultationForm.dxBasis.value     = obj.dxBasis     || "";
        consultationForm.plan.value        = obj.plan        || "";
    } catch(e) {      // 旧格式：纯文本 → 填到 dxBasis
        consultationForm.dxBasis.value = save;
    }
}


// nothing to setup here
function setupConsultationSubmitTool() {
    if (localStorage.getItem(userId + "-" + currentCourseId + "-Consultation-" + taskStage) !== null) {
        // consultantPanelInput.value = localStorage.getItem(userId + "-" + currentCourseId + "-Consultation-" + taskStage);
    }

    /* --- 表单提交 --- */
    consultationForm.addEventListener("submit", function(e){
        e.preventDefault();                  // 阻止原生提交
        stopEventPropagation(e);
        const payload = submitConsultation();   // 返回 JSON 字符串
        sendEventMessage("", getCurrentTimestamp(), "CHATGPT_ASSESSMENT",
            "MOUSE_CLICK", subActionLabelMap["CHATGPT_ASSESSMENT_SUBMIT_QUESTION"],
            "CHATGPT_ASSESSMENT", "CHATGPT_ASSESSMENT_PANEL_INPUT",
            "SAVE_CONSULTATION", "SUBMIT:::" + payload, e);
    });

    /* --- 输入过程埋点：监听所有 input/textarea keydown --- */
    consultationForm.addEventListener("keydown", function(event){
        stopEventPropagation(event);
        sendEventMessage("", getCurrentTimestamp(), "CHATGPT_ASSESSMENT",
            "KEY_STROKE", "CHATGPT_ASSESSMENT_WRITING",
            "CHATGPT_ASSESSMENT", "CHATGPT_ASSESSMENT_PANEL_INPUT",
            "WRITE_REPORT", `KEY:::${event.key}---${event.code}`, event);
    });

    /* --- 初次加载回填本地缓存 --- */
    restoreConsultationFromLocal();
}


function myCallbackConsultation(contains, element) {
    let saveTime;

    let eventValue;
    if (contains) {
        // console.log('Element with id:', element.id, 'has the "in-tools" class!');
        saveTime = getCurrentTimestamp();
        consultationInstantEvent = "OPEN";
        eventValue = "START_USE_TOOL:::" + saveTime;
        consultationToolStartUseTime = saveTime;
        // console.log('chatgptToolStartUseTime:' + consultationToolStartUseTime);
        // sendMyTraceDataPost("/trace-chatgpt", saveTime, "CHATGPT", chatgptPageEvent, chatgptClickTargetObject, chatgptInstantEvent, eventValue, null);
        sendEventMessage("", saveTime, "CHATGPT_ASSESSMENT", consultationPageEvent, subActionLabelMap["CHATGPT_ASSESSMENT_" + consultationInstantEvent], "CHATGPT_ASSESSMENT", consultationClickTargetObject, consultationInstantEvent, eventValue, null);
    } else {
        if (consultationInstantEvent !== "CLOSE") {
            // console.log('Element with id:', element.id, 'has not the "in-tools" class!');
            saveTime = getCurrentTimestamp();
            consultationInstantEvent = "CLOSE";
            if (consultationToolStartUseTime === 0) {
                eventValue = "TOOL_USE_LENGTH:::ERROR-" + (saveTime - consultationToolStartUseTime);
            } else {
                eventValue = "TOOL_USE_LENGTH:::" + (saveTime - consultationToolStartUseTime);
            }
            // console.log('chatgpt tool use length:' + (saveTime - consultationToolStartUseTime));
            // sendMyTraceDataPost("/trace-chatgpt", saveTime, "CHATGPT", chatgptPageEvent, chatgptClickTargetObject, chatgptInstantEvent, eventValue, null);
            sendEventMessage("", saveTime, "CHATGPT_ASSESSMENT", consultationPageEvent, subActionLabelMap["CHATGPT_ASSESSMENT_" + consultationInstantEvent], "CHATGPT_ASSESSMENT", consultationClickTargetObject, consultationInstantEvent, eventValue, null);
        } else {
            // console.log('Element with id:', element.id, 'is keep closed');
        }

    }
    consultationClickTargetObject = "NO_TARGET_OBJECT";
    consultationPageEvent = "NO_PAGE_EVENT";
}
handleClassMutation(consultationCollapse, myCallbackConsultation); //监听