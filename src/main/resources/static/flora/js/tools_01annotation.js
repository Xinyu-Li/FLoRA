function render() {
    let annotationLabelIconHtmlArr = [
        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 490 490" ><g><path fill="currentColor" fill-rule="nonzero" d="M100.911,419.404l123.8-51c3.1-2.1,6.2-4.2,8.3-6.2l203.9-248.6c6.2-9.4,5.2-21.8-3.1-29.1l-96.8-80.1 c-8-5.9-20.3-6.8-28.1,3.1l-204.9,248.5c-2.1,3.1-3.1,6.2-4.2,9.4l-26,132.1C72.511,420.104,90.611,424.004,100.911,419.404z M326.611,49.004l65.5,54.1l-177.7,217.1l-64.9-53.7L326.611,49.004z M133.411,306.904l44.4,36.8l-57.2,23.6L133.411,306.904z"></path><path fill="currentColor" fill-rule="nonzero" d="M469.111,448.504h-349.5c0,0-72.5,3.4-75.2-15.2c0-1-1.8-5.6,7.6-17c7.3-9.4,6.2-21.8-2.1-29.1 c-9.4-7.3-21.8-6.2-29.1,2.1c-19.8,23.9-25,44.7-15.6,63.5c25.5,47.5,111.3,36.3,115.4,37.3h348.5c11.4,0,20.8-9.4,20.8-20.8 C490.011,457.804,480.611,448.504,469.111,448.504z"></path></g></svg>',
        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmark-plus" viewBox="0 0 16 16"><path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/><path d="M8 4a.5.5 0 0 1 .5.5V6H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V7H6a.5.5 0 0 1 0-1h1.5V4.5A.5.5 0 0 1 8 4z"/></svg>',
        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-patch-exclamation" viewBox="0 0 16 16"><path d="M7.001 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.553.553 0 0 1-1.1 0L7.1 4.995z"/><path d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911l-1.318.016z"/></svg>',
        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-patch-question" viewBox="0 0 16 16"><path d="M8.05 9.6c.336 0 .504-.24.554-.627.04-.534.198-.815.847-1.26.673-.475 1.049-1.09 1.049-1.986 0-1.325-.92-2.227-2.262-2.227-1.02 0-1.792.492-2.1 1.29A1.71 1.71 0 0 0 6 5.48c0 .393.203.64.545.64.272 0 .455-.147.564-.51.158-.592.525-.915 1.074-.915.61 0 1.03.446 1.03 1.084 0 .563-.208.885-.822 1.325-.619.433-.926.914-.926 1.64v.111c0 .428.208.745.585.745z"/><path d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911l-1.318.016z"/><path d="M7.001 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0z"/></svg>',

        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmark-heart" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 4.41c1.387-1.425 4.854 1.07 0 4.277C3.146 5.48 6.613 2.986 8 4.412z"/><path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/></svg>',
        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmark-star" viewBox="0 0 16 16"><path d="M7.84 4.1a.178.178 0 0 1 .32 0l.634 1.285a.178.178 0 0 0 .134.098l1.42.206c.145.021.204.2.098.303L9.42 6.993a.178.178 0 0 0-.051.158l.242 1.414a.178.178 0 0 1-.258.187l-1.27-.668a.178.178 0 0 0-.165 0l-1.27.668a.178.178 0 0 1-.257-.187l.242-1.414a.178.178 0 0 0-.05-.158l-1.03-1.001a.178.178 0 0 1 .098-.303l1.42-.206a.178.178 0 0 0 .134-.098L7.84 4.1z"/><path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/></svg>',
        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cloud-arrow-up" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z"/><path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"/></svg>',
        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar-check" viewBox="0 0 16 16"><path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"/><path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/></svg>',
        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-award" viewBox="0 0 16 16"><path d="M9.669.864 8 0 6.331.864l-1.858.282-.842 1.68-1.337 1.32L2.6 6l-.306 1.854 1.337 1.32.842 1.68 1.858.282L8 12l1.669-.864 1.858-.282.842-1.68 1.337-1.32L13.4 6l.306-1.854-1.337-1.32-.842-1.68L9.669.864zm1.196 1.193.684 1.365 1.086 1.072L12.387 6l.248 1.506-1.086 1.072-.684 1.365-1.51.229L8 10.874l-1.355-.702-1.51-.229-.684-1.365-1.086-1.072L3.614 6l-.25-1.506 1.087-1.072.684-1.365 1.51-.229L8 1.126l1.356.702 1.509.229z"/><path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1 4 11.794z"/></svg>'
    ];

    let annotationToolSideMenuHtml = `<!-- Annotation notes 侧边栏123 -->
        <div class="offcanvas offcanvas-end" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasRightNotesDiv" aria-labelledby="offcanvasRightNotesLabel" style="width:500px;">
            <div class="offcanvas-header">
                <h5 id="offcanvasRightNotesLabel">${annotationNotesTitle}</h5>
        <!--            <button type="button"  class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>-->
            </div>
            <div class="offcanvas-body" id="offcanvasRightNotesBody"></div>
        </div>`;

    let annotationToolStartHtml = `<!--  annotation tool  -->
        <div style="display: block; position: absolute; z-index: 10000;" id="annotation-toolbox-div">
            <div class="border rounded shadow position-absolute bg-white d-none" id="annotation-toolbox">
                <div class="d-flex flex-row" style="height:60px;min-width:600px;">
                    <button id="takenoteBtn" class="btn btn-outline-secondary btn-sm annotation-toolbox-label-btn" style="width: 80px;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-left-quote-fill" viewBox="0 0 16 16"><path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4.414a1 1 0 0 0-.707.293L.854 15.146A.5.5 0 0 1 0 14.793V2zm7.194 2.766a1.688 1.688 0 0 0-.227-.272 1.467 1.467 0 0 0-.469-.324l-.008-.004A1.785 1.785 0 0 0 5.734 4C4.776 4 4 4.746 4 5.667c0 .92.776 1.666 1.734 1.666.343 0 .662-.095.931-.26-.137.389-.39.804-.81 1.22a.405.405 0 0 0 .011.59c.173.16.447.155.614-.01 1.334-1.329 1.37-2.758.941-3.706a2.461 2.461 0 0 0-.227-.4zM11 7.073c-.136.389-.39.804-.81 1.22a.405.405 0 0 0 .012.59c.172.16.446.155.613-.01 1.334-1.329 1.37-2.758.942-3.706a2.466 2.466 0 0 0-.228-.4 1.686 1.686 0 0 0-.227-.273 1.466 1.466 0 0 0-.469-.324l-.008-.004A1.785 1.785 0 0 0 10.07 4c-.957 0-1.734.746-1.734 1.667 0 .92.777 1.666 1.734 1.666.343 0 .662-.095.931-.26z"/></svg>
                        <br/>${annotationTakeNoteLabel}
                    </button>`;

    let tagButtonLength = 520 / annotationLabelColors.length;
    for (let i = 0; i < annotationLabelColors.length; i++) {
        annotationToolStartHtml += `<button class="btn btn-outline-secondary btn-sm annotation-toolbox-label-btn" style="min-width: ${tagButtonLength}px; font-size: 8pt;">${annotationLabelIconHtmlArr[i]}<br/>${annotationLabelColors[i].annotationLabel}</button>`;
    }

    let annotationToolEndHtml = `        </div>
            </div><!-- 需要生成-->
        </div>`;
    let annotationToastHtml = `<!-- annotation toast -->
        <div class="toast align-items-center" style="width:350px; min-height:100px;z-index:101; position: fixed; background-color: white;" id="my-annotation-toast-div">
           <div class="d-flex ">
               <div class="toast-body text-dark" id="my-annotation-toast-text"></div>
               <button type="button" class="btn-close me-2 m-auto toast-close-btn" ></button>
           </div>
        </div>`;
    let annotationSearchToolHtml = `<!-- Search result panel -->
        <div class="my-horizontal-collapse-tools search-panel" id="collapseSearch">
            <div class="card card-body" style="height:100%;">
                <div class="input-group" id="searchPanelBox">
                    <div class="input-group-text" id="btnGroupAddonSearchAnnotation">
                        <svg id="searchPanelSvg" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/></svg>
                        <div class="spinner-border spinner-border-sm d-none" id="searchPanelSpinner" role="status"><span class="visually-hidden">Loading...</span></div>
                    </div>
                    <input type="text" class="form-control" id="searchPanelInput" placeholder="${annotationSearchPanelInputPlaceholder}" aria-label="Input group example" aria-describedby="btnGroupAddonSearchAnnotation">
                    <button type="button" class="btn btn-outline-primary" id="searchPanelBtn">${annotationSearchBtnText}</button>
                </div>
                <div id="searchPanelResultDiv" class="border border-2 mt-2 bg-white overflow-auto" style="height:100%;">
                </div>
            </div>
        </div>`;

    let toolsannotationTool = annotationToolSideMenuHtml + annotationToolStartHtml + annotationToolEndHtml + annotationSearchToolHtml + annotationToastHtml;
    $("body").append(toolsannotationTool);
    
}
render();
//-------------------------------annotation tool-------------------------------------------
let collapseSearch = document.querySelector("#collapseSearch");
toolList1.push(collapseSearch);
let showSearchAnnotationsBtn = document.querySelector("#showSearchAnnotationsBtn");
let showAnnotationSideBarBtn = document.querySelector("#showAnnotationSideBarBtn");

let annotationToolbox = document.querySelector("#annotation-toolbox");

let sideAnnotationToolbar = document.querySelector("#side-annotation-toolbar");
let offcanvasRightNotesDiv = document.querySelector("#offcanvasRightNotesDiv");

let annotationToolboxLabelBtns = annotationToolbox.querySelectorAll(".annotation-toolbox-label-btn");
let takenoteBtn = annotationToolboxLabelBtns[0];

let annotationEditButtonTriggerByOtherEvent = false;

//-------------------------------annotation toast------------------------------------------------
let myAnnotationToastDiv = document.querySelector("#my-annotation-toast-div");
let myAnnotationToastText = document.querySelector("#my-annotation-toast-text");
let annotationToastHoverStatus = false;

//-------------------------------annotation search tool----------------------------------

let searchPanelBtn = document.querySelector("#searchPanelBtn");
let searchPanelInput = document.querySelector("#searchPanelInput");
let searchPanelResultDiv = document.querySelector("#searchPanelResultDiv");
let searchPanelSvg = document.querySelector("#searchPanelSvg");
let searchPanelSpinner = document.querySelector("#searchPanelSpinner");

//This 4 variables are only used for tool open/close event
let searchAnnotationClickTargetObject = "NO_TARGET_OBJECT";
let searchAnnotationPageEvent = "NO_PAGE_EVENT";
let searchAnnotationInstantEvent = "CLOSE";
let searchAnnotationToolStartUseTime = 0;

let annotationInstantEvent = "CLOSE";
let annotationClickTargetObject = "NO_TARGET_OBJECT";
let annotationPageEvent = "NO_PAGE_EVENT";
let annotationToolStartUseTime = 0;

function getCurrentDateTime(tempTime) {
    let n = Number(tempTime);
    let currentTime = !isNaN(n) ? new Date(n) : new Date() ;
    return currentTime.getFullYear() + "-" + (currentTime.getMonth() + 1) + "-" + currentTime.getDate() + "_" + currentTime.toLocaleTimeString();// + "." + currentTime.getMilliseconds();
}

function highlightKeyword(sentence, start, end) {
  if (start < 0 || end < 0 || start > end || end > sentence.length) {
    return sentence; // Return original if indices are invalid
  }

  const beforeKeyword = sentence.substring(0, start);
  const keyword = sentence.substring(start, end + 1);
  const afterKeyword = sentence.substring(end + 1);

  // console.log("keyword: ", keyword);

  return `${beforeKeyword}<span class="highlight">${keyword}</span>${afterKeyword}`;
}


function addContentToSearchPanel(data, searchPanelResultDiv, firstname) {
    // console.log("-----------add Content To Search Panel-----------------")
    // console.log("search results: ", data);
    // console.log("---------------------------------------------------");
    let resultStr = "";
    if (data.data != null) {
        annotationVOList = data.data
        for (let i = 0; i < annotationVOList.length; i++) {
            let highlighttime = annotationVOList[i].highlightTimestamp;
            let extraTagNames = annotationVOList[i].extraTags;
            let saveTime = annotationVOList[i].saveTime;
            let defaultTagName = annotationVOList[i].defaultTag;
            let highlightText = annotationVOList[i].highlightText;
            let userNotesText = annotationVOList[i].notesText;
            let pageUrl = annotationVOList[i].url;

            resultStr += '<div class="card text-dark bg-light m-2 myNotesDivInSearch" data-highlighttime="' + highlighttime + '" data-allextratagstemp="' + extraTagNames + '" data-allextratags="' + extraTagNames + '" data-defaulttag="' + defaultTagName + '" style="height:auto;">' +
                '                <div class="card-body">' +
                '                    <h5 class="card-title">' + firstname + '<span style="position: absolute; font-size: 10pt; right:25px;">' + getCurrentDateTime(saveTime) + '</span></h5>' +
                '                    <!--       显示区       -->' +
                '                    <h6 class="card-subtitle mb-2 mt-2 text-muted text-ellipsis">' + highlightText + '</h6>' +
                '                    <p class="card-text text-ellipsis">' + userNotesText + '</p> <!-- 此处显示的文本保留格式 -->' +
                '                    <div class="mb-2">' +
                '                        <button type="button" class="btn btn-secondary btn-sm mt-1 me-2">#' + defaultTagName + '</button>';
            let tempArray = [];
            if (extraTagNames.length > 0) {
                tempArray = extraTagNames.split(";;;");
            }

            for (let i = 0; i < tempArray.length; i++) {
                resultStr += '<button type="button" class="btn btn-secondary btn-sm mt-1 me-2">#' + tempArray[i] + '</button>';
            }

            resultStr += '<br><a href="' + pageUrl + '" class="link-primary">' + pageUrl + '</a></div></div></div>';

        }
        $(searchPanelResultDiv).append(resultStr);

    }
}




function addContentAllToSearchPanel(data, searchPanelResultDiv, firstname) {
     // console.log("-----------add Content To Search Panel-----------------")
     // console.log("search results: ", data);
    // console.log("---------------------------------------------------");
    let resultStr = "";
    if (data.data?.annotationVOList){
        annotationVOList = data.data.annotationVOList;
        for (let i = 0; i < annotationVOList.length; i++) {
            let highlighttime = annotationVOList[i].highlightTimestamp;
            let extraTagNames = annotationVOList[i].extraTags;
            let saveTime = annotationVOList[i].saveTime;
            let defaultTagName = annotationVOList[i].defaultTag;
            let highlightText = annotationVOList[i].highlightText;
            let userNotesText = annotationVOList[i].notesText;
            let pageUrl = annotationVOList[i].url;

            resultStr += '<div class="card text-dark bg-light m-2 myNotesDivInSearch" data-highlighttime="' + highlighttime + '" data-allextratagstemp="' + extraTagNames + '" data-allextratags="' + extraTagNames + '" data-defaulttag="' + defaultTagName + '" style="height:auto;">' +
                '                <div class="card-body">' +
                '                    <h5 class="card-title">' + firstname + '<span style="position: absolute; font-size: 10pt; right:25px;">' + getCurrentDateTime(saveTime) + '</span></h5>' +
                '                    <!--       显示区       -->' +
                '                    <h6 class="card-subtitle mb-2 mt-2 text-muted text-ellipsis">' + highlightText + '</h6>' +
                '                    <p class="card-text text-ellipsis">' + userNotesText + '</p> <!-- 此处显示的文本保留格式 -->' +
                '                    <div class="mb-2">' +
                '                        <button type="button" class="btn btn-secondary btn-sm mt-1 me-2">#' + defaultTagName + '</button>';
            let tempArray = [];
            if (extraTagNames.length > 0) {
                tempArray = extraTagNames.split(";;;");
            }

            for (let i = 0; i < tempArray.length; i++) {
                resultStr += '<button type="button" class="btn btn-secondary btn-sm mt-1 me-2">#' + tempArray[i] + '</button>';
            }

            resultStr += '<br><a href="' + pageUrl + '" class="link-primary">' + pageUrl + '</a></div></div></div>';

        }


    }
    if (data.data?.backgroundSegments) {
        sentenceList = data.data.backgroundSegments;
        for (let i = 0; i < sentenceList.length; i++) {
            let extraTagNames = "";
            resultSent = sentenceList[i];
            let documentURL = resultSent.DocumentId;
            let documentCourseId = resultSent.courseId;
            let highlighSent = resultSent.highlightedSentence;

            resultStr += '<div class="card text-dark bg-light m-2 myNotesDivInSearch" data-highlighttime="' + "to be advised" + '" data-allextratagstemp="' + "" + '" data-allextratags="' + "" + '" data-defaulttag="' + "Background" + '" style="height:auto;">' +
                '                <div class="card-body">' +
                '                    <h5 class="card-title">' + firstname + '<span style="position: absolute; font-size: 10pt; right:25px;">' + "to-be-advised" + '</span></h5>' +
                '                    <!--       显示区       -->' +
                '                    <h6 class="card-subtitle mb-2 mt-2 text-muted text-ellipsis">' + "" + '</h6>' +
                '                    <p class="card-text text-ellipsis">' + highlighSent + '</p> <!-- 此处显示的文本保留格式 -->' +
                '                    <div class="mb-2">' +
                '                        <button type="button" class="btn btn-secondary btn-sm mt-1 me-2">#' + "Background" + '</button>';
            let tempArray = [];
            if (extraTagNames.length > 0) {
                tempArray = extraTagNames.split(";;;");
            }

            for (let i = 0; i < tempArray.length; i++) {
                resultStr += '<button type="button" class="btn btn-secondary btn-sm mt-1 me-2">#' + tempArray[i] + '</button>';
            }

            resultStr += '<br><a href="' + documentURL + '" class="link-primary">' + documentURL + '</a></div></div></div>';


        }
    }
    $(searchPanelResultDiv).append(resultStr);
}

function showAnnotationToolbox() { $(annotationToolbox).removeClass("d-none"); }
function hideAnnotationToolbox() {
    if (!$(annotationToolbox).hasClass("d-none")) {// true is showing, false is not showing
        $(annotationToolbox).addClass("d-none");
    }
}

function hideAnnotationToastDivWhenMouseOut() {
    setTimeout(function () {
        if (!annotationToastHoverStatus) { // 必须写在SetTimeout 内部，写在外部会导致错误
            $(myAnnotationToastDiv).removeClass("show").addClass("d-none");
            // changeClassificationDiv.classList.add("d-none");
        }
    }, 500);
}
function showAnnotationToastDivOnTargetItem(currentItem) {
    // console.log("currentItem:");
    // console.log(currentItem);
    // 检测 单个单词
    let itemTop = currentItem.getBoundingClientRect().top; //获取的是#itemID元素最底下Y轴坐标
    let itemLeft = currentItem.getBoundingClientRect().left; //获取的是#itemID元素最左侧X轴坐标

    $(myAnnotationToastDiv).removeClass("d-none").addClass("show");
    let toastHeight = $(myAnnotationToastDiv).height();
    let toastWidth = $(myAnnotationToastDiv).width();

    // 默认显示到文本下方 与左侧对齐
    let finalLeft = itemLeft;
    let finalTop = itemTop + currentItem.getBoundingClientRect().height;

    if (toastHeight + finalTop > $(window).height()) {// 显示到文本上方
        finalTop = finalTop - currentItem.getBoundingClientRect().height - toastHeight;
    }
    if (toastWidth + itemLeft > $(window).width()) { // 显示到文本 右侧
        finalLeft = finalLeft - toastWidth + currentItem.getBoundingClientRect().width;
    }
    $(myAnnotationToastDiv).css({"left": finalLeft, "top": finalTop});
}

function setupAnnotationSearchPanel() {

    collapseSearch.onclick = function(e) {
        stopEventPropagation(e);
        // console.log("collapseSearch click");
        // sendMyTraceDataPost("/trace-search-annotation", getCurrentTimestamp(), "SEARCH_ANNOTATION", "MOUSE_CLICK", null, "CLICK", "", e); //当select text时候会触发，mouse down up click 事件
        sendEventMessage("", getCurrentTimestamp(), "SEARCH_ANNOTATION", "MOUSE_CLICK", subActionLabelMap["SEARCH_ANNOTATION_CLICK"], "SEARCH_ANNOTATION", null, "CLICK", "", e);
    };
    //当鼠标在搜索annotation框区域移动时候，所有移动和滚动行为都标注为 SEARCH_ANNOTATION
    collapseSearch.onmousewheel = function(e) {
        stopEventPropagation(e);
        // mousewheelData.push(generateMouseWheelData(e, "SEARCH_ANNOTATION"));
        sendEventMessage("", getCurrentTimestamp(), "SEARCH_ANNOTATION", "MOUSE_WHEEL", "SEARCH_ANNOTATION", "SEARCH_ANNOTATION",null, "NO_INSTANT_EVENT", "SCROLL_DIST:::" + e.deltaY, e);
    };
    collapseSearch.onmousemove = function(e) {
        stopEventPropagation(e);
        mousePosition = generateMousePositionData(e, "SEARCH_ANNOTATION", "SEARCH_ANNOTATION");
    };
    collapseSearch.onmouseup = function(e) {
        stopEventPropagation(e);
        if (window.getSelection() != null && window.getSelection().toString().replace(/\n/g, '').length > 0) {
            let selectText = window.getSelection().toString();
            // sendMyTraceDataPost("/trace-search-annotation", getCurrentTimestamp(), "SEARCH_ANNOTATION", "MOUSE_SELECT_TEXT", null, "SELECT_TEXT", "MOUSE_SELECT:::" + selectText, e);
            sendEventMessage("", getCurrentTimestamp(), "SEARCH_ANNOTATION", "MOUSE_SELECT_TEXT", subActionLabelMap["SEARCH_ANNOTATION_SELECT_TEXT"], "SEARCH_ANNOTATION", null, "SELECT_TEXT", "MOUSE_SELECT:::" + selectText, e);
            // console.log("send post for select text-------------------------------------" + selectText + "-------");
        }
    };

    searchPanelBtn.onclick = function (e) {
        stopEventPropagation(e);

        // console.log("searchPanelBtn clicked");
        let keywords = searchPanelInput.value;

        // sendMyTraceDataPost("/trace-search-annotation", getCurrentTimestamp(), "SEARCH_ANNOTATION", "MOUSE_CLICK", "SEARCH_PANEL_SEARCH_KEYWORD_BTN", "SEARCH_KEYWORD", "SEARCH:::" + keywords, e);
        sendEventMessage("", getCurrentTimestamp(), "SEARCH_ANNOTATION", "MOUSE_CLICK", subActionLabelMap["SEARCH_ANNOTATION_SEARCH_KEYWORD"], "SEARCH_ANNOTATION", "SEARCH_PANEL_SEARCH_KEYWORD_BTN", "SEARCH_KEYWORD", "SEARCH:::" + keywords, e);

        searchPanelSvg.classList.add("d-none");
        searchPanelSpinner.classList.remove("d-none");

        $.post(apiBaseUrl + "/search-by-keywords", {
            keywords:keywords,
            userId: userId,
            courseId: currentCourseId
        }, function (data, status) {
            $(searchPanelResultDiv).children(".myNotesDivInSearch").remove();
            // console.log("search results: ", data.data);
            if (data.data!=null){
                addContentAllToSearchPanel(data, searchPanelResultDiv, firstname == null ? getFirstname() : firstname);
                searchPanelSpinner.classList.add("d-none");
                searchPanelSvg.classList.remove("d-none");
            }

        });

    };
    searchPanelInput.onkeyup = function(e) {
        stopEventPropagation(e);

        if (e.which === 13) { //输入了回车键
            let keywords = searchPanelInput.value;

            searchPanelSvg.classList.add("d-none");
            searchPanelSpinner.classList.remove("d-none");
            $.post(apiBaseUrl + "/search-by-keywords", {
                keywords:keywords,
                userId: userId,
                courseId: currentCourseId
            }, function (data, status) {
                $(searchPanelResultDiv).children(".myNotesDivInSearch").remove();
                if (data.data!=null){
                    addContentAllToSearchPanel(data, $(searchPanelResultDiv), firstname == null ? getFirstname() : firstname);
                    searchPanelSpinner.classList.add("d-none");
                    searchPanelSvg.classList.remove("d-none");
                }
            });

            // sendMyTraceDataPost("/trace-search-annotation", getCurrentTimestamp(), "SEARCH_ANNOTATION", "KEYBOARD_STROKE", "SEARCH_PANEL_INPUT", "SEARCH_KEYWORD", "SEARCH:::" + keywords, e);
            sendEventMessage("", getCurrentTimestamp(), "SEARCH_ANNOTATION", "KEYBOARD_STROKE", subActionLabelMap["SEARCH_ANNOTATION_SEARCH_KEYWORD"], "SEARCH_ANNOTATION", "SEARCH_PANEL_INPUT", "SEARCH_KEYWORD", "SEARCH:::" + keywords, e);
        } else {
            // sendMyTraceDataPost("/trace-search-annotation", getCurrentTimestamp(), "SEARCH_ANNOTATION", "KEYBOARD_STROKE", "SEARCH_PANEL_INPUT", "WRITE_KEYWORD", "KEY:::" + e.key + "---" + e.code, e);
            sendEventMessage("", getCurrentTimestamp(), "SEARCH_ANNOTATION", "KEYBOARD_STROKE", subActionLabelMap["SEARCH_ANNOTATION_WRITE_KEYWORD"], "SEARCH_ANNOTATION", "SEARCH_PANEL_INPUT", "WRITE_KEYWORD", "KEY:::" + e.key + "---" + e.code, e);
        }
    };
    searchPanelInput.onfocus = function (e) {
        stopEventPropagation(e);
        // sendMyTraceDataPost("/trace-search-annotation", getCurrentTimestamp(), "SEARCH_ANNOTATION", "MOUSE_CLICK", "SEARCH_PANEL_INPUT", "SEARCH_INPUT_FOCUS", "", e);
        sendEventMessage("", getCurrentTimestamp(), "SEARCH_ANNOTATION", "MOUSE_CLICK", subActionLabelMap["SEARCH_ANNOTATION_SEARCH_INPUT_FOCUS"], "SEARCH_ANNOTATION", "SEARCH_PANEL_INPUT", "SEARCH_INPUT_FOCUS", "", e);
    };
    searchPanelInput.onblur = function(e) {
        stopEventPropagation(e);
        // sendMyTraceDataPost("/trace-search-annotation", getCurrentTimestamp(), "SEARCH_ANNOTATION", "MOUSE_CLICK", "SEARCH_PANEL_INPUT", "SEARCH_INPUT_BLUR", "", e);
        sendEventMessage("", getCurrentTimestamp(), "SEARCH_ANNOTATION", "MOUSE_CLICK", subActionLabelMap["SEARCH_ANNOTATION_SEARCH_INPUT_BLUR"], "SEARCH_ANNOTATION", "SEARCH_PANEL_INPUT", "SEARCH_INPUT_BLUR", "", e);
    };
}

// function moveTogetherWithSidebarOpen() { //侧边栏 button 移动后修改背景颜色
//     sideAnnotationToolbar.classList.add("clicked");
// }
// function moveTogetherWithSidebarClose() {
//     sideAnnotationToolbar.classList.remove("clicked");
// }

function showAnnotationNormalViewArea(myWholeNotesDiv, allExtraTags) {
    myWholeNotesDiv.height(220);
    myWholeNotesDiv.find('div.notesEditOperationArea').addClass("d-none")
    // myWholeNotesDiv.children().children(".notesEditOperationArea").addClass("d-none");
    // 隐藏 tags，edit 和 delete button
    myWholeNotesDiv.find('div.editAndDeleteBtns').removeClass("d-none");
    // myWholeNotesDiv.children().children(".editAndDeleteBtns").removeClass("d-none");

    // let showTagsArea = myWholeNotesDiv.children().children(".showTagsArea");
    let showTagsArea = myWholeNotesDiv.find('div.showTagsArea');
    showTagsArea.removeClass("d-none");

    if (allExtraTags.length > 0) {
        const tempArray = allExtraTags.split(";;;");
        tempArray.forEach(function(item, index, arr) {
            showTagsArea.append('<button type="button" class="btn btn-secondary btn-sm me-2 extraTagBtn">#' + item + '</button>');
        });
    }
}

function sidebarEvents() {

    offcanvasRightNotesDiv.onclick = function(e) {
        stopEventPropagation(e);
        // console.log("offcanvasRightNotesDiv click");
        // sendMyTraceDataPost("/trace-annotation", getCurrentTimestamp(), "ANNOTATION", "MOUSE_CLICK", null, "CLICK", "", e); //当select text时候会触发，mouse down up click 事件
        sendEventMessage("", getCurrentTimestamp(), "ANNOTATION", "MOUSE_CLICK", subActionLabelMap["ANNOTATION_CLICK"], "ANNOTATION", null, "CLICK", "", e);
    };
    //当鼠标在写作框区域移动时候，所有移动和滚动行为都标注为WRITE_ESSAY
    offcanvasRightNotesDiv.onmousewheel = function(e) {
        stopEventPropagation(e);
        // mousewheelData.push(generateMouseWheelData(e, "READ_ANNOTATION"));
        sendEventMessage("", getCurrentTimestamp(), "ANNOTATION", "MOUSE_WHEEL", "READ_ANNOTATION", "ANNOTATION",null, "NO_INSTANT_EVENT", "SCROLL_DIST:::" + e.deltaY, e);
    };
    offcanvasRightNotesDiv.onmousemove = function(e) {
        stopEventPropagation(e);
        mousePosition = generateMousePositionData(e, "READ_ANNOTATION", "ANNOTATION");
    };
    offcanvasRightNotesDiv.onmouseup = function(e) {
        stopEventPropagation(e);
        if (window.getSelection() != null && window.getSelection().toString().replace(/\n/g, '').length > 0) {
            let selectText = window.getSelection().toString();
            // sendMyTraceDataPost("/trace-annotation", getCurrentTimestamp(), "ANNOTATION", "MOUSE_SELECT_TEXT", null, "SELECT_TEXT", "MOUSE_SELECT:::" + selectText, e);
            sendEventMessage("", getCurrentTimestamp(), "ANNOTATION", "MOUSE_SELECT_TEXT", subActionLabelMap["ANNOTATION_SELECT_TEXT"], "ANNOTATION", null, "SELECT_TEXT", "MOUSE_SELECT:::" + selectText, e);
            // console.log("send post for select text-------------------------------------" + selectText + "-------");
        }
    };

    $("#offcanvasRightNotesBody")
        .on("click", ".editNoteBtn", function (e) {
            stopEventPropagation(e);

            // $(this).parent().parent().parent().height(380);
            // 展示 display none 的部分， 修改整体height
            let myWholeNotesDiv = $(this).closest(".myWholeNotesDiv");
            myWholeNotesDiv.height(380);
            // myWholeNotesDiv.children().children(".notesEditOperationArea").removeClass("d-none");
            myWholeNotesDiv.find('div.notesEditOperationArea').removeClass("d-none");
            // $(this).parent().next().removeClass("d-none"); // 显示编辑区域
            let highlightTimestamp = myWholeNotesDiv[0].dataset.highlighttime;

            // 隐藏 tags，edit 和 delete button

            // $(this).prev().prev().addClass("d-none"); // 隐藏 user notes
            // myWholeNotesDiv.children().children(".userNotesArea").addClass("d-none");
            myWholeNotesDiv.find('p.userNotesArea').addClass("d-none");
            // myWholeNotesDiv.children().children(".editAndDeleteBtns").addClass("d-none");
            myWholeNotesDiv.find('div.editAndDeleteBtns').addClass("d-none");
            // $(this).addClass("d-none");  // 隐藏当前edit button
            // $(this).next().addClass("d-none"); // 隐藏删除button
            // let showTagsArea = myWholeNotesDiv.children().children(".showTagsArea");
            let showTagsArea = myWholeNotesDiv.find('div.showTagsArea');
            showTagsArea.children(".extraTagBtn").remove();
            showTagsArea.addClass("d-none");
            // $(this).parent().prev().addClass("d-none").remove(".extraTagBtn"); // 隐藏并 删除showTagsArea 里面的所有extra tag button
            // $("#showTagsArea" + myId);

            // 构建 notesTagsEditArea 里面的Extra tag button group
            let allExtraTags = myWholeNotesDiv[0].dataset.allextratags;
            // let notesTagsEditArea = myWholeNotesDiv.children().children(".notesEditOperationArea").children(".notesTagsEditArea");
            let notesTagsEditArea = myWholeNotesDiv.find('div.notesTagsEditArea');
            let tempArray = [];
            if (allExtraTags.length > 0) {
                tempArray = allExtraTags.split(";;;");
            }
            for (let i = 0; i < tempArray.length; i++) {
                notesTagsEditArea.append('<div class="btn-group me-2 extraTagEditGroup" role="group">' +
                    '    <button type="button" class="btn btn-sm btn-secondary">#' + tempArray[i] + '</button>' +
                    '    <button type="button" data-extratagname="' + tempArray[i] + '" class="btn btn-sm btn-secondary extraTagDeleteBtn">X</button>' +
                    '</div>');
            }

            let tempEditor = editors["notesEditor" + userId + "---" + myWholeNotesDiv[0].dataset.highlighttime];
            let tempNotesJsonText = myWholeNotesDiv.find('p.userNotesJsonArea')[0].innerText;

            if (tempNotesJsonText.length > 0) {
                tempEditor.setContents(JSON.parse(tempNotesJsonText));
            }
            let instantEvent = "EDIT";
            if (annotationEditButtonTriggerByOtherEvent) {
                instantEvent = "CREATE_NOTE";
            }

            // sendMyTraceDataPost("/trace-annotation", getCurrentTimestamp(), "ANNOTATION", "MOUSE_CLICK", "EDIT_NOTE_BTN", instantEvent, "EDIT_ANNOTATION:::" + highlightTimestamp, e);
            sendEventMessage("", getCurrentTimestamp(), "ANNOTATION", "MOUSE_CLICK", subActionLabelMap["ANNOTATION_" + instantEvent], "ANNOTATION", "EDIT_NOTE_BTN", instantEvent, "EDIT_ANNOTATION:::" + highlightTimestamp, e);
        })
        .on("click", ".deleteNoteBtn", function (e) {  // finish
            if (!confirm("Do you want to delete this note?")) {
                return;
            }
            stopEventPropagation(e);


            let divForDelete = $(this).closest(".myWholeNotesDiv");
            // console.log(divForDelete[0].dataset.highlighttime);
            let highlightTimestamp = divForDelete[0].dataset.highlighttime;

            let deleteHighlights = $(pageContent).find('span.highlighted[data-timestamp="' + highlightTimestamp + '"]'); // page-content 是公用编辑框，所有页面都一样
            for (let i = 0; i < deleteHighlights.length; i++) { // 删除高亮
                hltr1.removeHighlights(deleteHighlights[i]);
            }
            let deleteAnnotationTimestamp = getCurrentTimestamp();
            $.post(apiBaseUrl + "/delete-annotation", { // 删除后台数据，并更新全局whole page highlights
                userId: userId,
                saveTime: deleteAnnotationTimestamp,
                url: getCurrentUrl(),
                highlightTimestamp: highlightTimestamp,
                serializeHighlightsJson: hltr1.serializeHighlights(),
                courseId: currentCourseId
            });
            // localStorage.setItem("mySerializeHighlightsJson", hltr1.serializeHighlights());

            // sendMyTraceDataPost("/trace-annotation", deleteAnnotationTimestamp, "ANNOTATION", "MOUSE_CLICK", "DELETE_NOTE_BTN", "DELETE", "DELETE_ANNOTATION:::" + highlightTimestamp, e);
            sendEventMessage("", deleteAnnotationTimestamp, "ANNOTATION", "MOUSE_CLICK", subActionLabelMap["ANNOTATION_DELETE"], "ANNOTATION", "DELETE_NOTE_BTN", "DELETE", "DELETE_ANNOTATION:::" + highlightTimestamp, e);

            divForDelete.remove(); //方法有效  删除侧边栏编辑框
        })
        .on("click", ".extraTagDeleteBtn", function (e) {
            stopEventPropagation(e);

            let myWholeNotesDiv = $(this).closest(".myWholeNotesDiv");
            // console.log($(this)[0].dataset.extratagname);
            // let allExtraTags = myWholeNotesDiv[0].dataset.allextratags;
            let allExtraTagsTemp = myWholeNotesDiv[0].dataset.allextratagstemp;
            let extraTagName = $(this)[0].dataset.extratagname;

            if (allExtraTagsTemp.startsWith(extraTagName)) {
                allExtraTagsTemp = allExtraTagsTemp.replace(extraTagName + ";;;", "").replace(extraTagName, "");
            } else {
                allExtraTagsTemp = allExtraTagsTemp.replace(";;;" + extraTagName, "");
            }
            // console.log(allExtraTagsTemp);
            myWholeNotesDiv[0].dataset.allextratagstemp = allExtraTagsTemp;
            // console.log(myWholeNotesDiv[0].dataset.allextratagstemp);
            $(this).parent().remove();

            // sendMyTraceDataPost("/trace-annotation-label", getCurrentTimestamp(), "ANNOTATION", "MOUSE_CLICK", "EXTRA_TAG_DELETE_BTN", "DELETE_LABEL", "DELETE_LABEL:::" + extraTagName, e);
            sendEventMessage("", getCurrentTimestamp(), "ANNOTATION", "MOUSE_CLICK", subActionLabelMap["ANNOTATION_DELETE_LABEL"], "ANNOTATION", "EXTRA_TAG_DELETE_BTN", "DELETE_LABEL", "DELETE_LABEL:::" + extraTagName, e);
        })
        .on("focus", ".notesTagsInput", function(e) {
            stopEventPropagation(e);

            // sendMyTraceDataPost("/trace-annotation-label", getCurrentTimestamp(), "ANNOTATION", "MOUSE_CLICK", "NOTES_TAGS_INPUT", "LABEL_INPUT_FOCUS", "", e);
            sendEventMessage("", getCurrentTimestamp(), "ANNOTATION", "MOUSE_CLICK", subActionLabelMap["ANNOTATION_LABEL_INPUT_FOCUS"], "ANNOTATION", "NOTES_TAGS_INPUT", "LABEL_INPUT_FOCUS", "", e);
        })
        .on("blur", ".notesTagsInput", function(e) {
            stopEventPropagation(e);

            // sendMyTraceDataPost("/trace-annotation-label", getCurrentTimestamp(), "ANNOTATION", "MOUSE_CLICK", "NOTES_TAGS_INPUT", "LABEL_INPUT_BLUR", "", e);
            sendEventMessage("", getCurrentTimestamp(), "ANNOTATION", "MOUSE_CLICK", subActionLabelMap["ANNOTATION_LABEL_INPUT_BLUR"], "ANNOTATION", "NOTES_TAGS_INPUT", "LABEL_INPUT_BLUR", "", e);
        })
        .on("keyup", ".notesTagsInput", function (e) {
            stopEventPropagation(e);
            // console.log($(this).prev());

            if (e.which === 13) {
                let myWholeNotesDiv = $(this).closest(".myWholeNotesDiv");
                // let allextratags = myWholeNotesDiv[0].dataset.allextratags;
                let allExtraTagsTemp = myWholeNotesDiv[0].dataset.allextratagstemp;
                let defaultTagName = myWholeNotesDiv[0].dataset.defaulttag;
                // console.log(defaultTagName);

                const notesTagsInputValue = $(this).val().trim();
                // console.log(notesTagsInputValue);
                if (notesTagsInputValue === defaultTagName || allExtraTagsTemp.includes(notesTagsInputValue)) {
                    alert("Cannot create existing tags");
                } else if (notesTagsInputValue.length > 0) {
                    if (allExtraTagsTemp.length === 0) {
                        myWholeNotesDiv[0].dataset.allextratagstemp += notesTagsInputValue;
                    } else {
                        myWholeNotesDiv[0].dataset.allextratagstemp += ";;;" + notesTagsInputValue;
                    }
                    $(this).prev().append(
                        '<div class="btn-group me-2" role="group">' +
                        '    <button type="button" class="btn btn-sm btn-secondary">#' + notesTagsInputValue + '</button>' +
                        '    <button type="button" data-extratagname="' + notesTagsInputValue + '" class="btn btn-sm btn-secondary extraTagDeleteBtn">X</button>' +
                        '</div>');
                    $(this).val("");
                    //给annotation添加label，并按回车键保存
                    // sendMyTraceDataPost("/trace-annotation-label", getCurrentTimestamp(), "ANNOTATION", "KEYBOARD_STROKE", "NOTES_TAGS_INPUT", "SAVE_LABEL", "SAVE_LABEL:::" + notesTagsInputValue, e);
                    sendEventMessage("", getCurrentTimestamp(), "ANNOTATION", "KEYBOARD_STROKE", subActionLabelMap["ANNOTATION_SAVE_LABEL"], "ANNOTATION", "NOTES_TAGS_INPUT", "SAVE_LABEL", "SAVE_LABEL:::" + notesTagsInputValue, e);
                } else {
                    alert("Cannot create empty tags");
                }
            } else {
                // sendMyTraceDataPost("/trace-annotation-label", getCurrentTimestamp(), "ANNOTATION", "KEYBOARD_STROKE", "NOTES_TAGS_INPUT", "WRITE_LABEL", "KEY:::" + e.key + "---" + e.code, e);
                sendEventMessage("", getCurrentTimestamp(), "ANNOTATION", "KEYBOARD_STROKE", subActionLabelMap["ANNOTATION_WRITE_LABEL"], "ANNOTATION", "NOTES_TAGS_INPUT", "WRITE_LABEL", "KEY:::" + e.key + "---" + e.code, e);
            }
        })
        .on("click", ".saveNotesBtn", function (e) {
            stopEventPropagation(e);

            let myWholeNotesDiv = $(this).closest(".myWholeNotesDiv");
            let tempEditor = editors["notesEditor" + userId + "---" + myWholeNotesDiv[0].dataset.highlighttime];
            let notesTextJson = JSON.stringify(tempEditor.getContents());
            let notesText = tempEditor.getText();

            // let allExtraTags = myWholeNotesDiv[0].dataset.allextratags;
            let notesTagsInput = myWholeNotesDiv.find("input.notesTagsInput");
            let unsavedExtraTag = notesTagsInput.val().trim();

            let allExtraTagsTemp = myWholeNotesDiv[0].dataset.allextratagstemp
            // console.log(unsavedExtraTag);
            // console.log(unsavedExtraTag.length);
            if (unsavedExtraTag.length !== 0) {
                if (allExtraTagsTemp.length === 0) {
                    allExtraTagsTemp = unsavedExtraTag;
                } else {
                    allExtraTagsTemp = allExtraTagsTemp + ";;;" + unsavedExtraTag;
                }
            }
            myWholeNotesDiv[0].dataset.allextratags = allExtraTagsTemp; //将临时变化 复制到 实际变量上

            let defaultTag = myWholeNotesDiv[0].dataset.defaulttag;
            let highlightTimestamp = myWholeNotesDiv[0].dataset.highlighttime;

            let editAnnotationTimestamp = getCurrentTimestamp();
            $.post(apiBaseUrl + "/update-annotation", //此处是做update，不需要修改 整页的 serializationJson
                {
                    highlightText: myWholeNotesDiv.find('h6.card-subtitle')[0].innerText,
                    notesTextJson: notesTextJson,
                    notesText: notesText,
                    defaultTag: defaultTag,
                    extraTags: allExtraTagsTemp,
                    userId: userId,

                    saveTime: editAnnotationTimestamp,
                    username: username == null ? getUsername() : username,
                    url: getCurrentUrl(),
                    highlightTimestamp: highlightTimestamp,
                    courseId: currentCourseId
                });
            notesTagsInput.val("");

            let instantEvent = "";
            if (annotationEditButtonTriggerByOtherEvent) { // create note 时候进行的点击
                instantEvent = "CREATE_NOTE_SAVE";
                annotationEditButtonTriggerByOtherEvent = false;
            } else { // edit note 时候进行的点击
                instantEvent = "EDIT_NOTE_SAVE";
            }

            // Save 被编辑过的annotation
            // sendMyTraceDataPost("/trace-annotation", editAnnotationTimestamp, "ANNOTATION", "MOUSE_CLICK", "SAVE_NOTES_BTN", instantEvent, "SAVE_EDIT_ANNOTATION:::" + highlightTimestamp, e);
            sendEventMessage("", getCurrentTimestamp(), "ANNOTATION", "MOUSE_CLICK", subActionLabelMap["ANNOTATION_" + instantEvent], "ANNOTATION", "SAVE_NOTES_BTN", instantEvent, "SAVE_EDIT_ANNOTATION:::" + highlightTimestamp, e);

            //修改用户notes 区域内容
            // let userNotesArea = myWholeNotesDiv.children().children(".userNotesArea");
            let userNotesArea = myWholeNotesDiv.find('p.userNotesArea');
            userNotesArea.removeClass("d-none");
            userNotesArea.text(notesText);
            myWholeNotesDiv.find('p.userNotesJsonArea').text(notesTextJson);
            // myWholeNotesDiv.children().children(".userNotesJsonArea")[0].innerText = notesTextJson;

            showAnnotationNormalViewArea(myWholeNotesDiv, allExtraTagsTemp);
            // console.log("post finish");
        })
        .on("click", ".cancelNotesBtn", function (e) {
            stopEventPropagation(e);

            // 展示 display none的部分， 修改整体height
            // $("#myWholeNotesDiv" + myId).height(180); //原始默认是180，显示之后是350
            let myWholeNotesDiv = $(this).closest(".myWholeNotesDiv");
            let allExtraTags = myWholeNotesDiv[0].dataset.allextratags;
            myWholeNotesDiv[0].dataset.allextratagstemp = allExtraTags;

            // myWholeNotesDiv.children().children(".userNotesArea").removeClass("d-none");
            myWholeNotesDiv.find('p.userNotesArea').removeClass("d-none");

            // notesTagsEditArea 删除extra button group
            // let notesTagsEditArea = myWholeNotesDiv.children().children(".notesEditOperationArea").children(".notesTagsEditArea");
            let notesTagsEditArea = myWholeNotesDiv.find('div.notesTagsEditArea');
            notesTagsEditArea.children(".extraTagEditGroup").remove();


            showAnnotationNormalViewArea(myWholeNotesDiv, allExtraTags);


            let instantEvent = "CANCEL_EDIT";
            if (annotationEditButtonTriggerByOtherEvent) { // create note 时候进行的点击
                instantEvent = "CANCEL_CREATE_NOTE_SAVE";
                annotationEditButtonTriggerByOtherEvent = false;
            }

            let highlightTimestamp = myWholeNotesDiv[0].dataset.highlighttime;

            // sendMyTraceDataPost("/trace-annotation", getCurrentTimestamp(), "ANNOTATION", "MOUSE_CLICK", "CANCEL_NOTES_BTN", instantEvent, "CANCEL_EDIT_ANNOTATION:::" + highlightTimestamp, e);
            sendEventMessage("", getCurrentTimestamp(), "ANNOTATION", "MOUSE_CLICK", subActionLabelMap["ANNOTATION_" + instantEvent], "ANNOTATION", "CANCEL_NOTES_BTN", instantEvent, "CANCEL_EDIT_ANNOTATION:::" + highlightTimestamp, e);
        })
        .on("mouseover mouseout", ".myWholeNotesDiv", function(e) {
            stopEventPropagation(e);
            // let myWholeNotesDiv = $(this).closest(".myWholeNotesDiv");
            let highlighttime = this.dataset.highlighttime;
            let highlightsInMainContent = $(pageContent).find('span.highlighted[data-timestamp="' + highlighttime + '"]');
            if (e.type === "mouseover") {
                highlightsInMainContent.addClass("my-notes-hover");
            } else if (e.type === "mouseout") {
                highlightsInMainContent.removeClass("my-notes-hover");
            }
        })
        .on("click", ".userNotesArea", function(e) {
            this.classList.toggle("text-ellipsis");
        })
        // .on("mouseover", ".userNotesArea", function(e) {
        //
        // })
        .on("mousemove", ".notesEditOperationArea", function(e) {
            stopEventPropagation(e);
            mousePosition = generateMousePositionData(e, "EDIT_ANNOTATION", "ANNOTATION");
        })
        .on("wheel", ".notesEditOperationArea", function(e) {
            stopEventPropagation(e);
            // mousewheelData.push(generateMouseWheelData(e, "EDIT_ANNOTATION"));
            sendEventMessage("", getCurrentTimestamp(), "ANNOTATION", "MOUSE_WHEEL", "EDIT_ANNOTATION", "ANNOTATION",null, "NO_INSTANT_EVENT", "SCROLL_DIST:::" + e.deltaY, e);
        })
        .on("click", ".notesEditOperationArea", function(e) {
            stopEventPropagation(e);
            // sendMyTraceDataPost("/trace-annotation", getCurrentTimestamp(), "ANNOTATION", "MOUSE_CLICK", null, "EDIT_CLICK", "", e);
            sendEventMessage("", getCurrentTimestamp(), "ANNOTATION", "MOUSE_CLICK", subActionLabelMap["ANNOTATION_EDIT_CLICK"], "ANNOTATION", null, "EDIT_CLICK", "", e);
        })
        .on("mouseup", ".notesEditOperationArea", function(e) {
            stopEventPropagation(e);
            if (window.getSelection() != null && window.getSelection().toString().replace(/\n/g, '').length > 0) {
                let selectText = window.getSelection().toString();
                // sendMyTraceDataPost("/trace-annotation", getCurrentTimestamp(), "ANNOTATION", "MOUSE_SELECT_TEXT", null, "EDIT_SELECT_TEXT", "MOUSE_SELECT:::" + selectText, e);
                sendEventMessage("", getCurrentTimestamp(), "ANNOTATION", "MOUSE_SELECT_TEXT", subActionLabelMap["ANNOTATION_EDIT_SELECT_TEXT"], "ANNOTATION", null, "EDIT_SELECT_TEXT", "MOUSE_SELECT:::" + selectText, e);
            }
        });


    $(pageContent)
        .on("mouseover mouseout", "span.highlighted", function(e) {
            stopEventPropagation(e);
            let currentSpan = this;
            let sidebarAnnotations = $("#offcanvasRightNotesBody").find('div[data-highlighttime="' + this.dataset.timestamp + '"]');
            if (e.type === "mouseover") {
                sidebarAnnotations.addClass("my-notes-hover");
                setTimeout(function (e) {
                    if (sidebarAnnotations.length > 0) {
                        let userNotes = sidebarAnnotations.find('p.userNotesArea')[0].innerHTML;
                        if (userNotes.trim().length === 0) {
                            return;
                        }
                        $(myAnnotationToastText).text(userNotes);
                        showAnnotationToastDivOnTargetItem(currentSpan);
                    }
                }, 500);
            } else if (e.type === "mouseout") {
                stopEventPropagation(e);
                // 侧边栏annotation的阴影
                sidebarAnnotations.removeClass("my-notes-hover");
                hideAnnotationToastDivWhenMouseOut();
            }
        })
        .on("click", "span.highlighted", function (e) {
            stopEventPropagation(e);
            // console.log("span.highlighted click");
            // 侧边栏annotation的阴影
            let sidebarAnnotations = $("#offcanvasRightNotesBody").find('div[data-highlighttime="' + this.dataset.timestamp + '"]');
            sidebarAnnotations.addClass("my-notes-hover");
            // console.log("------------click");
            if (!offcanvasRightNotesDiv.classList.contains("show")) {
                annotationClickTargetObject = "HIGHLIGHT_CLICKED";
                annotationPageEvent = "HIGHLIGHT_TIME:::" + this.dataset.timestamp;

                $(showAnnotationSideBarBtn).click();

                // moveTogetherWithSidebarOpen();
            }
            sidebarAnnotations[0].scrollIntoView();

        });

    $(myAnnotationToastDiv).on("mouseover mouseout", function(e) {
        stopEventPropagation(e);

        if (e.type === "mouseover") {
            annotationToastHoverStatus = true;
        } else if (e.type === "mouseout") {
            // console.log("mouserout");
            // console.log($(myAnnotationToastDiv).is(e.relatedTarget));
            // console.log("---------------------------------");
            if ($(myAnnotationToastDiv).has(e.relatedTarget).length || $(myAnnotationToastDiv).is(e.relatedTarget)) {
                console.log("has relatedTarget :");
            } else {
                annotationToastHoverStatus = false;
                setTimeout(function () {
                    $(myAnnotationToastDiv).removeClass("show").addClass("d-none");
                }, 500);

            }
        }
    });

    // $(".toast-close-btn").on("click", function (e) {
    //     $(this).parent().parent().removeClass("show").addClass("d-none");
    // });
}

function setupEssayWriting(toolbarId, editorId) {
    editors[editorId] = new Quill('#' + editorId, {
        modules: { toolbar: '#' + toolbarId },
        placeholder: annotationWriteNotePlaceholder,
        theme: 'snow',
    });
    // console.log("notes editorId:" + editorId);
}
// 添加div 到右侧边栏
function appendNotesDiv(myId, defaultTagName, extraTagNames, userNotesText, userNotesJson, saveTime, highlightText, highlighttime, username, firstname) {
    let element = '<div class="card text-dark bg-light mb-3 myWholeNotesDiv" data-highlighttime="' + highlighttime + '" data-allextratagstemp="' + extraTagNames + '" data-allextratags="' + extraTagNames + '" data-defaulttag="' + defaultTagName + '" style="min-height:220px;">' +
        '                <div class="card-body">' +
        '                    <h5 class="card-title">' + firstname + '<span style="position: absolute; font-size: 10pt; right:25px;">' + getCurrentDateTime(saveTime) + '</span></h5>' +
        '                    <!--       显示区    有hover 效果   -->' +
        '                    <h6 class="card-subtitle mb-2 mt-2 text-muted text-ellipsis" style="border-left: 3px solid #dbdbdb;color: #737373;font-style: italic;padding: 0 1em;">' + highlightText + '</h6>' +
        '                    <p class="card-text userNotesArea text-ellipsis" style="min-height: 1.3em;cursor: pointer;">' + userNotesText + '</p> <!-- 此处显示的文本保留格式 -->' +
        // '                    <button class="btn btn-sm btn-outline-dark user-notes-details-btn">Details</button>' +
        '                    <p class="d-none userNotesJsonArea">' + userNotesJson + '</p>' +
        '                    <div class="mb-2 showTagsArea" style="overflow:auto;">' +
        '                        <button type="button" class="btn btn-secondary btn-sm me-2 defaultTagBtn">#' + defaultTagName + '</button>';
    let tempArray = [];
    if (extraTagNames.length > 0) {
        tempArray = extraTagNames.split(";;;");
    }

    for (let i = 0; i < tempArray.length; i++) {
        element += '<button type="button" class="btn btn-secondary btn-sm me-2 extraTagBtn">#' + tempArray[i] + '</button>';
    }

    element += '                    </div>' +
        '                    <div class="editAndDeleteBtns" >' +
        '                        <!-- Edit button 点击之后进入编辑模式，显示  tag 编辑button，tag添加框，富文本编辑框，填入已有notes          -->' +
        '                        <button type="button" class="btn btn-danger deleteNoteBtn float-end">' +
        '                           <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16"><path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/></svg>' +
        '                        </button>' +
        '                        <button type="button" class="btn btn-warning editNoteBtn float-end">' +
        '                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="grey" class="bi bi-pencil-square" viewBox="0 0 16 16"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"></path><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"></path></svg>' +
        '                        </button>' +
        '                    </div>' +
        '                    <div class="d-none notesEditOperationArea mt-3">' +
        '                        <!--         编辑时展示         -->' +
        '                        <div id="notesEditorToolbar' + myId + '">' +
        '                            <button class="ql-bold"></button><button class="ql-italic"></button><button class="ql-underline"></button><button class="ql-link"></button><select class="ql-color"></select><select class="ql-background"></select><button class="ql-list" value="ordered" ></button><button class="ql-list" value="bullet"></button>' +
        '                        </div>' +
        '                        <div id="notesEditor' + myId + '" class="myNotesEditor" style="height:100px; overflow:auto;"></div>' +
        '                        <div class="mt-2 mb-2 notesTagsEditArea">' +
        '                            <div class="btn-group me-2" role="group">' +
        '                                <button type="button" class="btn btn-sm btn-secondary">#' + defaultTagName + '</button>' +
        '                                <button type="button" class="btn btn-sm btn-secondary">X</button>' +
        '                            </div>';

    element += '                        </div>' +
        '                        <input class="form-control notesTagsInput" type="text" placeholder="' + annotationTagPlaceholder + '" />' +
        // '                        <br/>' +
        '                        <div class="mt-2">' +
        '                            <button type="button" class="btn btn-primary saveNotesBtn" >&nbsp;&nbsp;&nbsp;' + annotationNoteSaveBtnText + '&nbsp;&nbsp;&nbsp;</button>' +
        '                            <button type="button" class="btn btn-dark cancelNotesBtn">' + annotationNoteCancelBtnText + '</button>' +
        '                        </div>' +
        '                    </div>' +
        '                </div>' +
        '            </div>';
    $("#offcanvasRightNotesBody").append(element);

    setupEssayWriting("notesEditorToolbar" + myId, "notesEditor" + myId);
}

function addHighlightsToSidebarAfterHighlight(userId, defaultTagName, e) {
    // 使用userid 和currentTime 来作为每个highlight的唯一标识
    let saveTime = getCurrentTimestamp();

    let highlightTimestamp = saveHighlight[0].dataset.timestamp;
    let myId = userId + "---" + highlightTimestamp; //TODO 唯一标识可能需要更改为uuid
    let highlightText = saveHighlightText;

    $.post(apiBaseUrl + "/save-annotation", {
        highlightText: highlightText,
        notesTextJson: "",
        notesText: "",
        defaultTag: defaultTagName,
        extraTags: "",
        userId: userId,

        saveTime: saveTime,
        username: username == null ? getUsername() : username,
        url: getCurrentUrl(),
        highlightTimestamp: highlightTimestamp,
        serializeHighlightsJson: hltr1.serializeHighlights(),
        courseId: currentCourseId
    });
    // localStorage.setItem("mySerializeHighlightsJson", hltr1.serializeHighlights());
    let instantEvent = "";
    if (defaultTagName === "note") {
        instantEvent = "CREATE_NOTE";
    } else {
        instantEvent = "CREATE_HIGHLIGHT";
    }
    // sendMyTraceDataPost("/trace-annotation", highlightTimestamp, "ANNOTATION", "MOUSE_CLICK", null, instantEvent, "HIGHLIGHT:::" + highlightText, e);
    sendEventMessage("", highlightTimestamp, "ANNOTATION", "MOUSE_CLICK", subActionLabelMap["ANNOTATION_" + instantEvent], "ANNOTATION", null, instantEvent, "HIGHLIGHT:::" + highlightText, e);

    // console.log("post finish");
    //默认高度是180px, 编辑时候高度改为350px
    appendNotesDiv(myId, defaultTagName, "", "", "", saveTime, highlightText, highlightTimestamp, username == null ? getUsername() : username, firstname == null ? getFirstname() : firstname);
}

function setupAnnotationToolboxBtns() {
    takenoteBtn.onclick = function (e) {
        // 获取文本
        // console.log("noteBtn click");
        stopEventPropagation(e);

        whetherDoHighlight = true;
        hltr1.setColor("#ffff7b");
        hltr1.doHighlight(); //手动控制do highlight
        hideAnnotationToolbox();
        // 打开右侧边栏
        if (!offcanvasRightNotesDiv.classList.contains("show")) {
            annotationClickTargetObject = "CREATE_NOTE_BTN";
            annotationPageEvent = "AUTO_OPEN";
            $(showAnnotationSideBarBtn).click();
            // moveTogetherWithSidebarOpen();
        }
        // 展示到右侧边栏 // 此函数中会发送trace log
        addHighlightsToSidebarAfterHighlight(userId, "note", e); //传入userid and username

        let newAddedNotesDiv = $("#offcanvasRightNotesBody>div:last-child");
        annotationEditButtonTriggerByOtherEvent = true;
        newAddedNotesDiv.find("button.editNoteBtn").click();
        newAddedNotesDiv[0].scrollIntoView();

    };

    for (let i = 1; i < annotationToolboxLabelBtns.length; i++) {
        annotationToolboxLabelBtns[i].onclick = function(e) {
            // console.log(annotationLabelColors[i-1].annotationLabel + "Btn click");
            stopEventPropagation(e);
            whetherDoHighlight = true;
            hltr1.setColor(annotationLabelColors[i-1].annotationLabelColor);
            hltr1.doHighlight(); //手动控制do highlight

            hideAnnotationToolbox();
            // 展示到右侧边栏 // 此函数中会发送trace log
            addHighlightsToSidebarAfterHighlight(userId, annotationLabelColors[i-1].annotationLabel, e); //传入userid and username
        };
    }
}

function setupMainHighlightAreaEvent() {
    //无法阻止事件冒泡
    $(pageContent).on("mouseup", function(e) {
        // console.log(e); //查看事件propagation
        // console.log("page content mouseup");

        // console.log(currentRange);
        if (currentRange != null && !currentRange.collapsed) { //选中了text，正在highlight  //TODO 如果currentRange 没有更新，会导致toolbox 一直跟随出现
//            let width = $(annotationToolbox).children().width();
//            let height = $(annotationToolbox).children().height();
//            let yOffset = height / 4;
//            let xOffset = width / 2;
//            console.log("e.pageX: ", e.pageX);
//            console.log("e.pageY: ", e.pageY);
//            $("#annotation-toolbox-div").css({"top": (e.pageY + yOffset) + "px", "left": (e.pageX - xOffset) + "px"});

                let viewportWidth = window.innerWidth;
                let viewportHeight = window.innerHeight;
//                let annotationBarWidth = $(annotationToolbox).children().width();
                let annotationBarHeight = 62
                //let annotationBarWidth = 0;

                let annotationBarWidth = 602
                let yOffset = annotationBarHeight / 4;
                let xOffset = annotationBarWidth / 2;
                // console.log("annotationBarWidth: ", annotationBarWidth);
                // console.log("annotationBarHeight: ", annotationBarHeight);
                let top = e.pageY + yOffset
                let left = e.pageX - xOffset

                if (top + annotationBarHeight > viewportHeight){
                    top = viewportHeight - annotationBarHeight-1
                }
                if (left + annotationBarWidth > viewportWidth){
                    left =  viewportWidth - annotationBarWidth-1
                }
                if (left < 0 ){
                    left =  1
                }
                // console.log("e.pageX: ", e.pageX);
                // console.log("e.pageY: ", e.pageY);

                // console.log("top: ", top);
                // console.log("left: ", left);

                $("#annotation-toolbox-div").css({"top": top + "px", "left": left + "px"});


//              let rect = currentRange.getBoundingClientRect();
//              //let topPosition = rect.bottom + window.scrollY; // Adjust for scroll position
//              //let leftPosition = rect.left + window.scrollX; // Adjust for scroll position
//
//              let annotationBar = $(annotationToolbox);
//              let annotationBarWidth = $(annotationToolbox).children().width();
//              let annotationBarHeight = $(annotationToolbox).children().width();
//
//              console.log("annotation bar: " + annotationBarWidth + " h: "+annotationBarHeight)
//              let viewportWidth = window.innerWidth;
//              let viewportHeight = window.innerHeight;
//
//
//              let scrollLeft = window.scrollX || window.pageXOffset;
//              let scrollTop = window.scrollY || window.pageYOffset;
//
//              let topPosition = rect.bottom + scrollTop + 10; // Adjust for scroll position and offset
//              let leftPosition = rect.left + scrollLeft; // Adjust for scroll position
//
//              // Adjust top position to keep annotation bar within viewport vertically
//              if (topPosition + annotationBarHeight > scrollTop + viewportHeight) {
//                  topPosition = rect.top - annotationBarHeight - 10; // Adjust as needed
//              }
//
//              // Adjust left position to keep annotation bar within viewport horizontally
//              if (leftPosition + annotationBarWidth > scrollLeft + viewportWidth) {
//                  leftPosition = scrollLeft + viewportWidth - annotationBarWidth - 10; // Adjust as needed
//              }

              // Ensure annotation bar fits within the viewport

                // Set annotation bar position
              //$(annotationToolbox).css({"top": top + "px", "left": left + "px"});
            showAnnotationToolbox();
            currentRange = null; //点击button之后会给currentRange 重复赋值，text.js 里面置成null
        } else {
            hideAnnotationToolbox();
        }
        //------------------关闭侧边栏，并修改按钮样式颜色------------------------------
        // if (!offcanvasRightNotesDiv.classList.contains("show")) {
        //     moveTogetherWithSidebarClose();
        // }
    });
    //无法阻止事件冒泡
    $(pageContent).on("click", function(e) {
        // console.log("page content click");

        if (offcanvasRightNotesDiv.classList.contains("show")) {
            annotationClickTargetObject = "PAGE_CONTENT_CLICK";
            annotationPageEvent = "AUTO_CLOSE";
            $(showAnnotationSideBarBtn).click();
            // moveTogetherWithSidebarClose();
        }
    });
}

function loadAnnotation() {
    $.post(apiBaseUrl + "/load-highlights-to-sidebar", {// TODO 尝试放入缓存
            userId: userId,
            url: getCurrentUrl(),
        },
        function(data, status) {
            // console.log("loadHighlightsToSidebarAfterLoading"); //按时间从最新到最旧排序

            // 加载 侧边栏notes
            if (data.data != null) {
                let annotationVOList = data.data;
                for (let i = 0; i < annotationVOList.length; i++) {
                    let highlighttime = annotationVOList[i].highlightTimestamp;
                    let saveTime = annotationVOList[i].saveTime;
                    let myId = userId + "---" + highlighttime;
                    let defaultTagName = annotationVOList[i].defaultTag;
                    let highlightText = annotationVOList[i].highlightText;
                    let extraTagNames = annotationVOList[i].extraTags;
                    let userNotesText = annotationVOList[i].notesText;
                    let userNotesJson = annotationVOList[i].notesTextJson;
                    appendNotesDiv(myId, defaultTagName, extraTagNames, userNotesText, userNotesJson, saveTime, highlightText, highlighttime, username == null ? getUsername() : username, firstname == null ? getFirstname() : firstname);
                }
            } else {
                // console.log("************************no Highlights in server");
            }
        });

    // 加载页面highlight
    // let serializeHighlightsJson = localStorage.getItem("mySerializeHighlightsJson");
    // if (serializeHighlightsJson === null) {
    // console.log("---------------load page: no highlightsjson in localstorage");
    $.post(apiBaseUrl + "/load-whole-page-highlights", { // TODO 尝试放入缓存
        userId: userId,
        url: getCurrentUrl(),
    }, function (data, status) {
        if (data.data != null) {
            hltr1.deserializeHighlights(data.data.serializeHighlightsJson);
            // localStorage.setItem("mySerializeHighlightsJson", data.data.serializeHighlightsJson);
        } else {
            // console.log("************************no mySerializeHighlightsJson in server");
        }
    });
    // } else {
    //     hltr1.deserializeHighlights(serializeHighlightsJson);
    // }

}


showAnnotationSideBarBtn.onclick = function (e) {
    // console.log("------------ show Annotation SideBar Btn click");
    stopEventPropagation(e);
    hideAnnotationToolbox(); // 隐藏annotation toolbox，当点击其他按钮时候
    // let instantEvent = "";
    let eventValue = "";
    let saveTime = getCurrentTimestamp();

    //点击先发生，然后bootstrap 会对点击做出响应, 然后才会进入这个函数
    sideAnnotationToolbar.classList.toggle("clicked");
    if (annotationClickTargetObject === 'NO_TARGET_OBJECT') {
        annotationClickTargetObject = "ANNOTATION_SIDE_BAR_BTN";
        annotationPageEvent = "MOUSE_CLICK";
    }
    sendEventMessage("", saveTime, "ANNOTATION", annotationPageEvent, subActionLabelMap["ANNOTATION_CLICK"], "ANNOTATION", annotationClickTargetObject, "ANNOTATION_SIDE_BAR_BTN_CLICK", eventValue, null);
    //此处的class：show 是bootstrap 给加的，直接检测即可判断是否打开
    // if (offcanvasRightNotesDiv.classList.contains("show")) {
    //     annotationInstantEvent = "OPEN";
    //     annotationToolStartUseTime = saveTime;
    //     eventValue = "START_USE_TOOL:::" + saveTime;
    //     // moveTogetherWithSidebarOpen();
    // } else {
    //     annotationInstantEvent = "CLOSE";
    //     eventValue = "TOOL_USE_LENGTH:::" + (saveTime - annotationToolStartUseTime);
    //     // moveTogetherWithSidebarClose();
    // }
    // console.log(annotationInstantEvent);
    // console.log(eventValue);
    //
    // //Annotation reading 区域 打开/关闭
    // sendMyTraceDataPost("/trace-annotation", saveTime, "ANNOTATION", "MOUSE_CLICK", "ANNOTATION_SIDE_BAR_BTN", annotationInstantEvent, eventValue, e);

};
showSearchAnnotationsBtn.onclick = function(e) {
    // console.log("showSearchAnnotationsBtn clicked");
    stopEventPropagation(e);
    hideAnnotationToolbox(); // 隐藏annotation toolbox，当点击其他按钮时候
    collapseSearch.classList.toggle("in-tools");
    toolsAndEssayToggle(collapseSearch);

    searchAnnotationClickTargetObject = "SHOW_SEARCH_ANNOTATION_BTN";
    searchAnnotationPageEvent = "MOUSE_CLICK";

    sendEventMessage("", getCurrentTimestamp(), "SEARCH_ANNOTATION", searchAnnotationPageEvent, subActionLabelMap["SEARCH_ANNOTATION_CLICK"], "SEARCH_ANNOTATION", searchAnnotationClickTargetObject, "SHOW_SEARCH_ANNOTATION_BTN_CLICK", "", null);

    // let instantEvent = "";
    // let eventValue = "";
    // let saveTime = getCurrentTimestamp();
    // if (collapseSearch.classList.contains("in-tools")) {
    //     searchPanelInput.value = "";
    //
    //     searchPanelSvg.classList.add("d-none");
    //     searchPanelSpinner.classList.remove("d-none");
    //
    //     $.get(apiBaseUrl + "/search-all/" + userId + "/" + currentCourseId, function (data, status) {
    //
    //         $(searchPanelResultDiv).children(".myNotesDivInSearch").remove();
    //
    //         addContentToSearchPanel(data, $(searchPanelResultDiv), firstname == null ? getFirstname() : firstname);
    //         searchPanelSpinner.classList.add("d-none");
    //         searchPanelSvg.classList.remove("d-none");
    //     });
    //     searchAnnotationToolUseLength  = saveTime;
    //     instantEvent = "OPEN";
    //     eventValue = "START_USE_TOOL:::" + saveTime;
    // } else {
    //     instantEvent = "CLOSE";
    //     searchAnnotationToolUseLength = saveTime - searchAnnotationToolUseLength;
    //     eventValue = "TOOL_USE_LENGTH:::" + searchAnnotationToolUseLength;
    // }
    //
    // sendMyTraceDataPost("/trace-search-annotation", saveTime, "SEARCH_ANNOTATION", "MOUSE_CLICK", "SHOW_SEARCH_ANNOTATION_BTN", instantEvent, eventValue, e);
};

function myCallbackAnnotation(contains, element) {
    let saveTime;
    let eventValue;
    if (contains) {
        // console.log('Element with id:', element.id, 'has the "show" class!');
        saveTime = getCurrentTimestamp();
        annotationInstantEvent = "OPEN";
        eventValue = "START_USE_TOOL:::" + saveTime;
        annotationToolStartUseTime = saveTime;
        // console.log('AnnotationToolStartUseTime:' + annotationToolStartUseTime);
        // sendMyTraceDataPost("/trace-annotation", saveTime, "ANNOTATION", annotationPageEvent, annotationClickTargetObject, annotationInstantEvent, eventValue, null);
        sendEventMessage("", saveTime, "ANNOTATION", annotationPageEvent, subActionLabelMap["ANNOTATION_" + annotationInstantEvent], "ANNOTATION", annotationClickTargetObject, annotationInstantEvent, eventValue, null);
    } else {
        if (annotationInstantEvent !== "CLOSE") {
            // console.log('Element with id:', element.id, 'has not the "show" class!');
            saveTime = getCurrentTimestamp();
            annotationInstantEvent = "CLOSE";
            if (annotationToolStartUseTime === 0) {
                eventValue = "TOOL_USE_LENGTH:::ERROR-" + (saveTime - annotationToolStartUseTime);
            } else {
                eventValue = "TOOL_USE_LENGTH:::" + (saveTime - annotationToolStartUseTime);
            }

            // console.log('Annotation tool use length:' + (saveTime - annotationToolStartUseTime));
            // sendMyTraceDataPost("/trace-annotation", saveTime, "ANNOTATION", annotationPageEvent, annotationClickTargetObject, annotationInstantEvent, eventValue, null);
            sendEventMessage("", saveTime, "ANNOTATION", annotationPageEvent, subActionLabelMap["ANNOTATION_" + annotationInstantEvent], "ANNOTATION", annotationClickTargetObject, annotationInstantEvent, eventValue, null);
        } else {
            // console.log('Element with id:', element.id, 'is keep closed');
        }
    }
    annotationClickTargetObject = "NO_TARGET_OBJECT";
    annotationPageEvent = "NO_PAGE_EVENT";
}
handleClassMutation(offcanvasRightNotesDiv, myCallbackAnnotation);

function myCallbackSearchAnnotation(contains, element) {
    let saveTime;

    let eventValue;
    if (contains) {
        // console.log('Element with id:', element.id, 'has the "in-tools" class!');

        searchPanelInput.value = "";

        searchPanelSvg.classList.add("d-none");
        searchPanelSpinner.classList.remove("d-none");

        $.get(apiBaseUrl + "/search-all/" + userId + "/" + currentCourseId, function (data, status) {

            // console.log("$$$$$$$$$$$ SEARCH ALL $$$$$$$$$!")

            $(searchPanelResultDiv).children(".myNotesDivInSearch").remove();

            addContentToSearchPanel(data, $(searchPanelResultDiv), firstname == null ? getFirstname() : firstname);
            searchPanelSpinner.classList.add("d-none");
            searchPanelSvg.classList.remove("d-none");
        });

        saveTime = getCurrentTimestamp();
        searchAnnotationInstantEvent = "OPEN";
        eventValue = "START_USE_TOOL:::" + saveTime;
        searchAnnotationToolStartUseTime = saveTime;
        // console.log('searchAnnotationToolStartUseTime:' + searchAnnotationToolStartUseTime);
        // sendMyTraceDataPost("/trace-search-annotation", saveTime, "SEARCH_ANNOTATION", searchAnnotationPageEvent, searchAnnotationClickTargetObject, searchAnnotationInstantEvent, eventValue, null);
        sendEventMessage("", saveTime, "SEARCH_ANNOTATION", searchAnnotationPageEvent, subActionLabelMap["SEARCH_ANNOTATION_" + annotationInstantEvent], "SEARCH_ANNOTATION", searchAnnotationClickTargetObject, searchAnnotationInstantEvent, eventValue, null);

    } else {
        if (searchAnnotationInstantEvent !== "CLOSE") {
            // console.log('Element with id:', element.id, 'has not the "in-tools" class!');
            saveTime = getCurrentTimestamp();
            searchAnnotationInstantEvent = "CLOSE";
            if (searchAnnotationToolStartUseTime === 0) {
                eventValue = "TOOL_USE_LENGTH:::ERROR-" + (saveTime - searchAnnotationToolStartUseTime);
            } else {
                eventValue = "TOOL_USE_LENGTH:::" + (saveTime - searchAnnotationToolStartUseTime);
            }
            // console.log('searchAnnotation tool use length:' + (saveTime - searchAnnotationToolStartUseTime));
            // sendMyTraceDataPost("/trace-search-annotation", saveTime, "SEARCH_ANNOTATION", searchAnnotationPageEvent, searchAnnotationClickTargetObject, searchAnnotationInstantEvent, eventValue, null);
            sendEventMessage("", saveTime, "SEARCH_ANNOTATION", searchAnnotationPageEvent, subActionLabelMap["SEARCH_ANNOTATION_" + annotationInstantEvent], "SEARCH_ANNOTATION", searchAnnotationClickTargetObject, searchAnnotationInstantEvent, eventValue, null);

        } else {
            // console.log('Element with id:', element.id, 'is keep closed');
        }

    }
    searchAnnotationClickTargetObject = "NO_TARGET_OBJECT";
    searchAnnotationPageEvent = "NO_PAGE_EVENT";
}
handleClassMutation(collapseSearch, myCallbackSearchAnnotation); //监听