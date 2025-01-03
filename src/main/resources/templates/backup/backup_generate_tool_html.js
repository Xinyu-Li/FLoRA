/*
 let toolsStr = '<!-- Annotation notes 侧边栏 -->' +
     '    <div class="offcanvas offcanvas-end" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasRightNotes" aria-labelledby="offcanvasRightNotesLabel" style="width:500px;">' +
     '        <div class="offcanvas-header">' +
     '            <h5 id="offcanvasRightNotesLabel">Notes Panel</h5>' +
     '<!--            <button type="button"  class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>-->' +
     '        </div>' +
     '        <div class="offcanvas-body" id="offcanvasRightNotesBody"></div>' +
     '    </div>' +
     '    <!--  annotation tool  -->' +
     '    <div style="display: block; position: absolute; z-index: 10000;" id="annotation-toolbox-div">' +
     '        <div class="border rounded shadow position-absolute bg-white d-none" id="annotation-toolbox">' +
     '            <div class="d-flex flex-row" style="height:64px;width:500px;">' +
     '                <button id="takenoteBtn" class="btn btn-outline-secondary" style="min-width: 20%;">' +
     '                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-handler-left-quote-fill" viewBox="0 0 16 16">' +
     '                        <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4.414a1 1 0 0 0-.707.293L.854 15.146A.5.5 0 0 1 0 14.793V2zm7.194 2.766a1.688 1.688 0 0 0-.227-.272 1.467 1.467 0 0 0-.469-.324l-.008-.004A1.785 1.785 0 0 0 5.734 4C4.776 4 4 4.746 4 5.667c0 .92.776 1.666 1.734 1.666.343 0 .662-.095.931-.26-.137.389-.39.804-.81 1.22a.405.405 0 0 0 .011.59c.173.16.447.155.614-.01 1.334-1.329 1.37-2.758.941-3.706a2.461 2.461 0 0 0-.227-.4zM11 7.073c-.136.389-.39.804-.81 1.22a.405.405 0 0 0 .012.59c.172.16.446.155.613-.01 1.334-1.329 1.37-2.758.942-3.706a2.466 2.466 0 0 0-.228-.4 1.686 1.686 0 0 0-.227-.273 1.466 1.466 0 0 0-.469-.324l-.008-.004A1.785 1.785 0 0 0 10.07 4c-.957 0-1.734.746-1.734 1.667 0 .92.777 1.666 1.734 1.666.343 0 .662-.095.931-.26z"/>' +
     '                    </svg>' +
     '                    TakeNote' +
     '                </button>' +
     '                <button id="importantBtn" class="btn btn-outline-secondary" style="min-width: 20%;">' +
     '                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 490 490" >' +
     '                        <g>' +
     '                            <path fill="currentColor" fill-rule="nonzero" d="M100.911,419.404l123.8-51c3.1-2.1,6.2-4.2,8.3-6.2l203.9-248.6c6.2-9.4,5.2-21.8-3.1-29.1l-96.8-80.1 c-8-5.9-20.3-6.8-28.1,3.1l-204.9,248.5c-2.1,3.1-3.1,6.2-4.2,9.4l-26,132.1C72.511,420.104,90.611,424.004,100.911,419.404z M326.611,49.004l65.5,54.1l-177.7,217.1l-64.9-53.7L326.611,49.004z M133.411,306.904l44.4,36.8l-57.2,23.6L133.411,306.904z"></path>' +
     '                            <path fill="currentColor" fill-rule="nonzero" d="M469.111,448.504h-349.5c0,0-72.5,3.4-75.2-15.2c0-1-1.8-5.6,7.6-17c7.3-9.4,6.2-21.8-2.1-29.1 c-9.4-7.3-21.8-6.2-29.1,2.1c-19.8,23.9-25,44.7-15.6,63.5c25.5,47.5,111.3,36.3,115.4,37.3h348.5c11.4,0,20.8-9.4,20.8-20.8 C490.011,457.804,480.611,448.504,469.111,448.504z"></path>' +
     '                        </g>' +
     '                    </svg>' +
     '                    Important' +
     '                </button>' +
     '                <button id="usefulBtn" class="btn btn-outline-secondary" style="min-width: 20%;">' +
     '                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmark-plus" viewBox="0 0 16 16">' +
     '                       <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>' +
     '                       <path d="M8 4a.5.5 0 0 1 .5.5V6H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V7H6a.5.5 0 0 1 0-1h1.5V4.5A.5.5 0 0 1 8 4z"/>' +
     '                    </svg>' +
     '                    &nbsp;&nbsp;Useful&nbsp;&nbsp;</button>' +
     '                <button id="conceptBtn" class="btn btn-outline-secondary" style="min-width: 20%;">' +
     '                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-patch-exclamation" viewBox="0 0 16 16">' +
     '                       <path d="M7.001 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.553.553 0 0 1-1.1 0L7.1 4.995z"/>' +
     '                       <path d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911l-1.318.016z"/>' +
     '                   </svg>' +
     '                    Concept' +
     '                </button>' +
     '                <button id="confusingBtn" class="btn btn-outline-secondary" style="min-width: 20%;">' +
     '                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-patch-question" viewBox="0 0 16 16">' +
     '                       <path d="M8.05 9.6c.336 0 .504-.24.554-.627.04-.534.198-.815.847-1.26.673-.475 1.049-1.09 1.049-1.986 0-1.325-.92-2.227-2.262-2.227-1.02 0-1.792.492-2.1 1.29A1.71 1.71 0 0 0 6 5.48c0 .393.203.64.545.64.272 0 .455-.147.564-.51.158-.592.525-.915 1.074-.915.61 0 1.03.446 1.03 1.084 0 .563-.208.885-.822 1.325-.619.433-.926.914-.926 1.64v.111c0 .428.208.745.585.745z"/>' +
     '                       <path d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911l-1.318.016z"/>' +
     '                       <path d="M7.001 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0z"/>' +
     '                   </svg>' +
     '                    Confusing' +
     '                </button>' +
     '            </div>' +
     '        </div><!-- 需要生成-->' +
     '    </div>' +
     '    <!-- 写作 侧边栏 -->' +
     '    <div id="collapseWriteEssay" class="my-horizontal-collapse-tools write-essay">' +
     '        <div class="card card-body" style="height:100%; min-height: 200px;">' +
     '            <h3 class="mb-2">Essay Writing <span class="ms-5" style="font-size: 12pt;" id="counterwriteEssayEditorMain">0 words</span></h3>' +
     '            <!-- Create the toolbar container -->' +
     '            <div id="writeEssayToolbarMain">' +
     '                <select class="ql-header"></select>' +
     '                <button class="ql-bold"></button><button class="ql-italic"></button><button class="ql-underline"></button><button class="ql-link"></button><button class="ql-script" value="sub"></button><button class="ql-script" value="super"></button>' +
     '                <select class="ql-color"></select><select class="ql-background"></select>' +
     // '                <button class="ql-image"></button>' +
     '                <button class="ql-list" value="ordered" ></button><button class="ql-list" value="bullet"></button>' +
     '                <select class="ql-align"></select><button class="ql-direction" value="rtl"></button><button class="ql-indent" value="-1"></button><button class="ql-indent" value="+1"></button>' +
     '            </div>' +
     '            <!-- Create the editor container -->' +
     '            <grammarly-editor-plugin class="h-100"><div id="writeEssayEditorMain" style="overflow: hidden"></div></grammarly-editor-plugin>' +
     '            <div class="position-fixed bottom-0 start-0 p-3" style="z-index: 11">' +
     '                <div id="writeEssayToast" class="toast hide" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="4000">' +
     '                    <div class="toast-header"><strong class="me-auto">FLoRA</strong><small>1 second ago</small><button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button></div>' +
     '                    <div class="text-success ms-3 h3">The essay is saved.</div>' +
     '                </div>' +
     '            </div>' +
     '            <div><button class="mt-2 btn btn-secondary" id="writeEssayEditorMainSaveBtn">Save Essay</button></div>' +
     '        </div>' +
     '    </div>' +
     '    <!-- Timer 侧边栏 -->' +
     '    <div class="my-horizontal-collapse-tools timer" id="collapseTimer" >' +
     '        <div class="card card-body" style="">' +
     '            <div class="clock" style="margin:2em;"></div>' +
     '            <div class="clock-message"></div>' +
     '<!--            <iframe src="/timer" title="Timer html"></iframe>-->' +
     '        </div>' +
     '    </div>' +
     '    <!-- Search result panel -->' +
     '    <div class="my-horizontal-collapse-tools search-panel" id="collapseSearch">' +
     '        <div class="card card-body" style="height:100%;">' +
     '            <div class="input-group" id="searchPanelBox">' +
     '                <div class="input-group-text" id="btnGroupAddon">' +
     '                    <svg id="searchPanelSvg" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">' +
     '                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>' +
     '                    </svg>' +
     '                   <div class="spinner-border spinner-border-sm d-none" id="searchPanelSpinner" role="status">' +
     '                       <span class="visually-hidden">Loading...</span>' +
     '                   </div>' +
     '                </div>' +
     '                <input type="text" class="form-control" id="searchPanelInput" placeholder="Input keywords to search..." aria-label="Input group example" aria-describedby="btnGroupAddon">' +
     '                <button type="button" class="btn btn-outline-primary" id="searchPanelBtn">Search</button>' +
     '            </div>' +
     '            <div id="searchPanelResultDiv" class="border border-2 mt-2 bg-white overflow-auto" style="height:100%;">' +
     '            </div>' +
     '        </div>' +
     '    </div>' +
     '    <!-- a plan tool 3 -->' +
     '    <div class="my-horizontal-collapse-tools planner2" id="collapsePlanner2">' +
     '        <div class="card card-body overflow-auto" style="height:100%;">' +
     '            <h3 class="mt-2 mb-2">Planner tool</h3>' +
     '            <div id="" class="border border-2 mt-2 bg-white overflow-auto p-2" style="height:100%;word-wrap: break-word;white-space : normal;">' +
     '               <div class="mt-2" id="create-plan-step1-div">' +
     '                   <h6 class="form-label">1. Please make a plan for your learning strategy:</h6>' +
     '                   <select class="form-select" id="learning-strategy-select">' +
     '                       <option selected value="0">Select a strategy</option>' +
     '                       <option value="1">' + plannerOverallStrategy[0] + '</option>' +
     '                       <option value="2">' + plannerOverallStrategy[1] + '</option>' +
     '                       <option value="3">' + plannerOverallStrategy[2] + '</option>' +
     '                       <option value="4">Use your own strategy</option>' +
     '                   </select>' +
     '               </div>' +
     '               <div class="mt-3" id="create-plan-step2-div"></div>' +
     '               <div class="mt-3" id="create-plan-step3-div"></div>' +
     '               <div class="mt-3" id="create-plan-step4-div"></div>' +
     '               <div class="mt-3" id="create-customise-plan-div"></div>' +
     '               <button class="mt-3 btn btn-secondary d-none" id="add-more-customise-strategy-btn" type="button">Add More Strategy</button>' +
     '               <div class="" id="display-plan-div"></div>' +
     '               <div id="display-plan-message-div"></div>' +
     '               <div class="mt-5 d-none" id="save-cancel-plan-btns-div">' +
     '                   <button class="btn btn-success">' +
     '                       <svg fill="white" height="25" width="25" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 502 502" xml:space="preserve"><g><g><g><path d="M492,0H10C4.477,0,0,4.477,0,10v424c0,2.652,1.054,5.196,2.929,7.071l58,58C62.804,500.946,65.348,502,68,502h424 c5.523,0,10-4.477,10-10V10C502,4.477,497.523,0,492,0z M86,20h330v240H86V20z M194.045,482H158.06v-67.589h35.985V482z M313.239,482h-99.194v-77.589c0-5.523-4.477-10-10-10H148.06c-5.523,0-10,4.477-10,10V482h-17.925V381h193.104V482z M381.866,482h-48.627V381h48.627V482z M482,482h-80.134V371c0-5.523-4.477-10-10-10h-68.627H110.134c-5.523,0-10,4.477-10,10 v111H72.142L20,429.858V20h46v250c0,5.523,4.477,10,10,10h350c5.523,0,10-4.477,10-10V20h46V482z"/><path d="M367.5,62H345c-5.523,0-10,4.477-10,10s4.477,10,10,10h22.5c5.523,0,10-4.477,10-10S373.023,62,367.5,62z"/><path d="M134.5,82H299c5.523,0,10-4.477,10-10s-4.477-10-10-10H134.5c-5.523,0-10,4.477-10,10S128.977,82,134.5,82z"/><path d="M367.5,129h-233c-5.523,0-10,4.477-10,10s4.477,10,10,10h233c5.523,0,10-4.477,10-10S373.023,129,367.5,129z"/><path d="M367.5,196h-233c-5.523,0-10,4.477-10,10s4.477,10,10,10h233c5.523,0,10-4.477,10-10S373.023,196,367.5,196z"/></g></g></g></svg>' +
     '                   </button>' +
     '                   <button class="btn btn-secondary">' +
     '                       <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16"><path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/></svg>' +
     '                   </button>' +
     '               </div>' +
     '               <div class="mt-5 d-none" id="edit-plan-btns-div">' +
     '                   <button class="btn btn-warning">' +
     '                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="grey" class="bi bi-pencil-square" viewBox="0 0 16 16"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"></path><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"></path></svg>' +
     '                   </button>' +
     '               </div>' +
     '            </div>' +
     '        </div>' +
     '    </div>' +
     '    <!-- Classification tool for law school --> ' +
     '    <div class="my-horizontal-collapse-tools my-classification" id="classification-collapse">' +
     '       <div class="card card-body" style="height:100%;">' +
     '           <h3 class="mb-2">Classification Tool</h3>' +
     '           <div style="height:100%;">' +
     '               <div class="form-control" style="height:100%; word-wrap: break-word;white-space : normal; font-size:10pt;" id="classification-textarea"></div>' +
     '           </div>' +
     '       </div>' +
     '    </div>' +
     '    <!-- Toast -->' +
     '    <div class="toast align-items-center" style="width:350px; min-height:100px;z-index:101; position: fixed; background-color: white;" id="my-toast-div">' +
     '       <div class="d-flex ">' +
     '           <div class="toast-body " id="my-toast-text"></div>' +
     '           <button type="button" class="btn-close me-2 m-auto toast-close-btn" ></button>' +
     '       </div>' +
     '       <div class="p-2 input-group d-none" id="change-classification-div">           ' +
     '           <button class="btn btn-success btn-sm" >agree</button>' +
     '           <span class="input-group-text">OR</span> ' +
     '           <select class="form-select form-select-sm"'+
     '               <option>change category</option>' +
     '               <option>category 1</option>' +
     '               <option>category 2</option>' +
     '               <option>category 3</option>' +
     '           </select> ' +
     '           <button class="btn btn-warning btn-sm" id="change-classification-btn">Change</button>                 ' +
     '       </div>' +
     '   </div>' +
     '    <!-- planner Toast -->' +
     '<div class="toast-container">' +
     '    <div class="toast align-items-center text-white bg-danger border-0" id="planner-toast-div0" >' +
     '       <div class="d-flex">' +
     '           <div class="toast-body" id="planner-toast-text0"></div>' +
     '           <button type="button" class="btn-close btn-close-white me-2 m-auto toast-close-btn"></button>' +
     '       </div>' +
     '    </div>' +
     '    <!-- planner Toast -->' +
     '    <div class="toast align-items-center text-white bg-danger border-0" id="planner-toast-div1" >' +
     '       <div class="d-flex">' +
     '           <div class="toast-body" id="planner-toast-text1"></div>' +
     '           <button type="button" class="btn-close btn-close-white me-2 m-auto toast-close-btn"></button>' +
     '       </div>' +
     '    </div>' +
     '    <!-- planner Toast -->' +
     '    <div class="toast align-items-center text-white bg-danger border-0" id="planner-toast-div2" >' +
     '       <div class="d-flex">' +
     '           <div class="toast-body" id="planner-toast-text2"></div>' +
     '           <button type="button" class="btn-close btn-close-white me-2 m-auto toast-close-btn"></button>' +
     '       </div>' +
     '    </div>' +
     '    <!-- planner Toast -->' +
     '    <div class="toast align-items-center text-white bg-danger border-0" id="planner-toast-div3" >' +
     '       <div class="d-flex">' +
     '           <div class="toast-body" id="planner-toast-text3"></div>' +
     '           <button type="button" class="btn-close btn-close-white me-2 m-auto toast-close-btn"></button>' +
     '       </div>' +
     '    </div>' +
     '</div>' +
     '    <!-- instrumentation tools buttons   -->' +
     '    <div style="margin: 0; padding: 0; border: 0; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; direction: ltr; background: none; font-size: 14px; line-height: 20px; height: 100%; position: fixed; top: 61px; left: 100%; z-index: 199; -webkit-tap-highlight-color: rgba(255, 255, 255, 0);" id="side-annotation-toolbar-div">' +
     '        <div id="side-annotation-toolbar" class="my-side-annotation-toolbar" style="position: absolute;  width: 37px; z-index: 2; background-color: white;">' +
     '            <button title="Annotation sidebar" type="button" id="showAnnotationSideBarBtn" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRightNotes" aria-controls="offcanvasRightNotes" class="btn btn-outline-secondary border" style="padding-left: 6px; padding-right: 6px; width: 36px; margin-bottom: 10px; height: 45px; ">' +
     // '                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" class=""><g fill-rule="evenodd"><rect fill="none" stroke="none" x="0" y="0" width="16" height="16"></rect><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 12L6 8l4-4"></path></g></svg>' +
     '               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="black" class="bi bi-caret-left-fill" viewBox="0 0 16 16"><path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/></svg>' +
     '            </button>' +
     '            <button title="Search Annotations" type="button" id="showSearchAnnotationsBtn" class="btn btn-outline-secondary border" style="height: 30px; width: 30px; padding: 1px 6px;margin-bottom: 10px;">' +
     '                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" class="bi bi-search" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/></svg>' +
     '            </button>' +
     '            <button title="Show highlights" type="button" id="showHighlightsBtn" class="btn btn-outline-secondary border d-none" style="height: 30px; width: 30px; padding: 1px 6px;margin-bottom: 10px;">' +
     '                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" class=""><g fill-rule="evenodd"><rect fill="none" stroke="none" x="0" y="0" width="16" height="16"></rect><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 13c3.866 0 7-2.239 7-5s-3.134-5-7-5-7 2.239-7 5 3.134 5 7 5zm0-4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"></path></g></svg>' +
     '                <!-- 隐藏highlight icon -->' +
     '                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" class="d-none"><g fill-rule="evenodd"><rect fill="none" stroke="none" x="0" y="0" width="16" height="16"></rect><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.73 12.973A9.89 9.89 0 0 1 8 13c-3.866 0-7-2.239-7-5 0-.753.233-1.467.65-2.107m5.62-2.866A9.89 9.89 0 0 1 8 3c3.866 0 7 2.239 7 5 0 .753-.233 1.467-.65 2.107M1 1l14 14L1 1z"></path></g></svg>' +
     '            </button>' +
     '            <button title="View Scaffolds" type="button" id="viewScaffoldsBtn" class="btn btn-outline-secondary border" style="height: 30px; width: 30px; padding: 1px 6px;margin-bottom: 10px;">' +
     // '                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512" class=""><defs><style>.cls-1{fill:#d9e4e8;}.cls-1,.cls-2{fill-rule:evenodd;}.cls-2{fill:#79d3d3;}.cls-3{opacity:0.14;}.cls-4{fill:#17292d;}.cls-5{fill:#141f38;}</style></defs><path class="cls-1" fill-rule="nonzero" d="M448,166.4H359.21a115.23,115.23,0,0,1-206.43,0H64a51.26,51.26,0,0,0-51.2,51.2V448A51.26,51.26,0,0,0,64,499.2H448A51.26,51.26,0,0,0,499.2,448V217.6A51.26,51.26,0,0,0,448,166.4Z"></path><path class="cls-2" fill-rule="nonzero" d="M256,217.6a102.4,102.4,0,1,1,102.4-102.4A102.52,102.52,0,0,1,256,217.6Z"></path><g class="cls-3"><path class="cls-4" d="M19.31,171.94A63.78,63.78,0,0,0,0,217.6v9.24L217.6,384l12.14-12.14Z"></path></g><g class="cls-3"><path class="cls-4" fill-rule="nonzero" d="M492.69,171.94,282.26,371.86,294.4,384,512,226.84V217.6A63.79,63.79,0,0,0,492.69,171.94Z"></path></g><path class="cls-5" fill-rule="nonzero" d="M263.65,129.63c0-4.05-2.28-6.12-6.84-6.12h-6.33c-3.32,0-4.36-1.15-4.36-4.36v-8.61c0-3.32,1-4.46,4.36-4.46H255c4.67,0,7.06-1.87,7.06-5.71s-2.39-5.7-7.06-5.7c-5.5,0-7.78,1.77-9.76,6.74-1.14,3.22-2.59,3.94-5.6,2.81l-10.17-3.63c-3-.93-3.94-2.6-2.8-5.6,4.57-12.14,14.74-18.16,30.62-18.16,8.19,0,14.53,2,19,5.81S283,91.74,283,98.28a17.09,17.09,0,0,1-8.09,15.15q10.27,5.44,10.27,17.43c0,14.53-9.34,22.73-28,22.73-16,0-26.16-6-30.62-18.17q-1.56-4.2,2.8-5.6l10.17-3.63c3.22-1.15,4.36-.52,5.61,2.8,1.66,4.46,5.19,6.75,10.48,6.75S263.65,133.67,263.65,129.63ZM512,217.6V448a64.19,64.19,0,0,1-64,64H64A64.19,64.19,0,0,1,0,448V217.6a64.19,64.19,0,0,1,64-64h83.36a115.2,115.2,0,1,1,217.27,0H448A64.19,64.19,0,0,1,512,217.6ZM482.64,201l-149,149L481.68,466.42A38.16,38.16,0,0,0,486.4,448V217.6A38.17,38.17,0,0,0,482.64,201ZM166.39,115.2A89.6,89.6,0,1,0,256,25.6,89.7,89.7,0,0,0,166.39,115.2ZM64,179.2A38.17,38.17,0,0,0,47.45,183L219.79,355.29a51.25,51.25,0,0,0,72.41,0L464.54,183A38.17,38.17,0,0,0,448,179.2H351.79a115.22,115.22,0,0,1-191.59,0ZM178.38,350.08l-149-149A38.17,38.17,0,0,0,25.6,217.6V448a38.16,38.16,0,0,0,4.71,18.42ZM448,486.4a38.18,38.18,0,0,0,14.2-2.73L315.38,368.31l-5.09,5.09a76.89,76.89,0,0,1-108.61,0l-5.08-5.08L49.79,483.66A38.18,38.18,0,0,0,64,486.4Z"></path></svg>' +
     '               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" class="bi bi-envelope-plus" viewBox="0 0 16 16"><path d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2H2Zm3.708 6.208L1 11.105V5.383l4.708 2.825ZM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2-7-4.2Z"/><path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-3.5-2a.5.5 0 0 0-.5.5v1h-1a.5.5 0 0 0 0 1h1v1a.5.5 0 0 0 1 0v-1h1a.5.5 0 0 0 0-1h-1v-1a.5.5 0 0 0-.5-.5Z"/></svg>' +
     '            </button>' +
     '            <button  title="Write Essay" type="button" id="showWriteEssayBtn" class="btn btn-outline-secondary border" style="height: 30px; width: 30px; padding: 1px 6px;margin-bottom: 10px;">' +
     // '                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="16" height="16" viewBox="0 0 220.001 220.001" style="enable-background:new 0 0 220.001 220.001;" xml:space="preserve"><g><polygon points="0,220 59.34,213.86 6.143,160.661 "/><path d="M132.018,34.787l53.197,53.197L69.568,203.631L16.37,150.434L132.018,34.787z M212.696,60.502 c9.738-9.738,9.742-25.527,0-35.268l-17.93-17.93c-9.738-9.74-25.529-9.738-35.268,0l-17.346,17.347l53.199,53.196L212.696,60.502z"/></g></svg>' +
     '               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" class="bi bi-pencil-fill" viewBox="0 0 16 16"><path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/></svg>' +
     '            </button>' +
     // '            <button title="Show Planner" type="button" id="showPlannerBtn" class="d-none btn btn-outline-secondary border" style="height: 30px; width: 30px; padding: 1px 6px;margin-bottom: 10px;">' +
     // '                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 439.814 439.814" style="enable-background:new 0 0 439.814 439.814;" xml:space="preserve"><path d="m88 32h-8a8.009 8.009 0 0 0 -8 8v32h16z"/><path d="m136 96a24.027 24.027 0 0 1 -24 24h-8v32h8a24 24 0 0 1 0 48h-8v32h8a24 24 0 0 1 0 48h-8v32h8a24 24 0 0 1 0 48h-8v32h8a24 24 0 0 1 0 48h-8v40h320v-448h-320v40h8a24.027 24.027 0 0 1 24 24zm24-40h224a8 8 0 0 1 0 16h-224a8 8 0 0 1 0-16zm0 32h224a8 8 0 0 1 0 16h-224a8 8 0 0 1 0-16zm0 32h224a8 8 0 0 1 0 16h-224a8 8 0 0 1 0-16zm0 32h224a8 8 0 0 1 0 16h-224a8 8 0 0 1 0-16zm0 32h224a8 8 0 0 1 0 16h-224a8 8 0 0 1 0-16zm0 32h224a8 8 0 0 1 0 16h-224a8 8 0 0 1 0-16zm0 32h224a8 8 0 0 1 0 16h-224a8 8 0 0 1 0-16zm0 32h224a8 8 0 0 1 0 16h-224a8 8 0 0 1 0-16zm0 32h224a8 8 0 0 1 0 16h-224a8 8 0 0 1 0-16zm0 32h224a8 8 0 0 1 0 16h-224a8 8 0 0 1 0-16zm0 32h224a8 8 0 0 1 0 16h-224a8 8 0 0 1 0-16zm0 32h224a8 8 0 0 1 0 16h-224a8 8 0 0 1 0-16zm0 32h224a8 8 0 0 1 0 16h-224a8 8 0 0 1 0-16z"/><path d="m72 120h16v32h-16z"/><path d="m64 104h48a8 8 0 0 0 0-16h-48a8 8 0 0 0 0 16z"/><path d="m456 164.944-16-8v86.112l16-8z"/><path d="m456 52.944-16-8v86.112l16-8z"/><path d="m456 276.944-16-8v86.112l16-8z"/><path d="m72 472a8.009 8.009 0 0 0 8 8h8v-40h-16z"/><path d="m64 184h48a8 8 0 0 0 0-16h-48a8 8 0 0 0 0 16z"/><path d="m456 388.944-16-8v86.112l16-8z"/><path d="m72 200h16v32h-16z"/><path d="m72 360h16v32h-16z"/><path d="m64 344h48a8 8 0 0 0 0-16h-48a8 8 0 0 0 0 16z"/><path d="m64 264h48a8 8 0 0 0 0-16h-48a8 8 0 0 0 0 16z"/><path d="m72 280h16v32h-16z"/><path d="m64 424h48a8 8 0 0 0 0-16h-48a8 8 0 0 0 0 16z"/></svg>' +
     // '            </button>' +
     '            <button title="Show Planner2" type="button" id="showPlanner2Btn" class="btn btn-outline-secondary border" style="height: 30px; width: 30px; padding: 1px 6px;margin-bottom: 10px;">' +
     '                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" class="bi bi-list-check" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3.854 2.146a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 3.293l1.146-1.147a.5.5 0 0 1 .708 0zm0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 7.293l1.146-1.147a.5.5 0 0 1 .708 0zm0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z"/></svg>' +
     '            </button>' +
     // '            <button title="Show Writing Suggestion" type="button" id="showWritingSuggestionBtn" class="btn btn-outline-secondary border" style="height: 30px; width: 30px; padding: 1px 6px;margin-bottom: 10px;">' +
     // '                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" class="bi bi-magic" viewBox="0 0 16 16"><path d="M9.5 2.672a.5.5 0 1 0 1 0V.843a.5.5 0 0 0-1 0v1.829Zm4.5.035A.5.5 0 0 0 13.293 2L12 3.293a.5.5 0 1 0 .707.707L14 2.707ZM7.293 4A.5.5 0 1 0 8 3.293L6.707 2A.5.5 0 0 0 6 2.707L7.293 4Zm-.621 2.5a.5.5 0 1 0 0-1H4.843a.5.5 0 1 0 0 1h1.829Zm8.485 0a.5.5 0 1 0 0-1h-1.829a.5.5 0 0 0 0 1h1.829ZM13.293 10A.5.5 0 1 0 14 9.293L12.707 8a.5.5 0 1 0-.707.707L13.293 10ZM9.5 11.157a.5.5 0 0 0 1 0V9.328a.5.5 0 0 0-1 0v1.829Zm1.854-5.097a.5.5 0 0 0 0-.706l-.708-.708a.5.5 0 0 0-.707 0L8.646 5.94a.5.5 0 0 0 0 .707l.708.708a.5.5 0 0 0 .707 0l1.293-1.293Zm-3 3a.5.5 0 0 0 0-.706l-.708-.708a.5.5 0 0 0-.707 0L.646 13.94a.5.5 0 0 0 0 .707l.708.708a.5.5 0 0 0 .707 0L8.354 9.06Z"/></svg>' +
     // '            </button>' +
     '            <button title="Show Classification" type="button" id="show-classification-btn" class="btn btn-outline-secondary border" style="height: 30px; width: 30px; padding: 1px 6px;margin-bottom: 10px;">' +
     '                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" class="bi bi-info-square-fill" viewBox="0 0 16 16"><path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm8.93 4.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/></svg>' +
     '            </button>' +
     '            <button title="Show Remaining Time" type="button" id="showTimerBtn" class="btn btn-outline-secondary border" style="height: 30px; width: 30px; padding: 1px 6px;margin-bottom: 10px;">' +
     // '                <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 128 128"><defs><style>.cls-1{fill:#2e79bd;}.cls-2{fill:#2d3e50;}</style></defs><title>n</title><path class="cls-1" d="M66.941,64.21528V53.86337a2.94219,2.94219,0,0,0-5.88437,0v10.3519a8.82656,8.82656,0,1,0,5.88437,0Z"/><path class="cls-2" d="M105.75765,39.03638l5.48809-5.48809a7.64585,7.64585,0,0,0-10.81286-10.81286l-5.86011,5.85768A53.51847,53.51847,0,0,0,74.196,19.9774l-3.31364-.47709V13.3881h6.88123V6.80594a4.87057,4.87057,0,0,0-4.8651-4.8651H55.10178a4.87057,4.87057,0,0,0-4.8651,4.8651V13.3881h6.88109v6.11221L53.804,19.9774a53.51279,53.51279,0,0,0-20.37932,8.61571l-5.85754-5.85768A7.64675,7.64675,0,0,0,16.7517,33.54829l5.48809,5.48809a53.53025,53.53025,0,1,0,83.51786,0Zm-4.61871,37.52638h1.65425A38.65143,38.65143,0,0,1,94.2617,97.1101l-1.15732-1.15461a4.02749,4.02749,0,0,0-5.69194,0,4.01578,4.01578,0,0,0,0,5.6868l1.15732,1.15717a38.6135,38.6135,0,0,1-20.54749,8.52392v-1.64668a4.02227,4.02227,0,0,0-8.04455,0v1.64668a38.63362,38.63362,0,0,1-20.54749-8.52392L40.585,101.6423a4.0237,4.0237,0,0,0-2.84483-6.8671h-.00257a3.98045,3.98045,0,0,0-2.842,1.1803l-1.15989,1.152a38.63276,38.63276,0,0,1-8.52892-20.54478h1.65425a4.02834,4.02834,0,0,0,4.02484-4.02484V72.446a4.02834,4.02834,0,0,0-4.02484-4.02484H25.20681a38.63276,38.63276,0,0,1,8.52892-20.54478l1.15732,1.152a3.99075,3.99075,0,0,0,2.84454,1.1803h.00257a4.02309,4.02309,0,0,0,2.84483-6.8671l-1.15475-1.15717A38.6135,38.6135,0,0,1,59.97773,33.6605v1.64668a4.02227,4.02227,0,0,0,8.04455,0V33.6605a38.6135,38.6135,0,0,1,20.54749,8.52392l-1.15732,1.15717a4.023,4.023,0,1,0,5.69194,5.6868l1.15732-1.15461a38.65143,38.65143,0,0,1,8.53149,20.54734h-1.65425A4.02834,4.02834,0,0,0,97.1141,72.446v.09193A4.02834,4.02834,0,0,0,101.13894,76.56275Z"/></svg>' +
     '               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" class="bi bi-clock" viewBox="0 0 16 16"><path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/><path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/></svg>' +
     '            </button>' +
     // '            <button title="Show Video" type="button" id="showVideoBtn" class="btn btn-outline-secondary border" style="height: 30px; width: 30px; padding: 1px 6px;margin-bottom: 10px;">' +
     // '                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-camera-fill" viewBox="0 0 16 16"><path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/><path d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z"/></svg>' +
     // '            </button>' +
     '        </div>' +
     '    </div>';*/



let chatgptAssistantMayorToolBtn = '<!-- chatgpt tool button-->' +
    '<button title="Show Assistant Mayor" type="button" id="show-assistant-mayor-btn" class="btn btn-outline-secondary border" style="height: 30px; width: 30px; padding: 1px 6px;margin-bottom: 10px;">' +
    `<svg t="1713954810237" class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="16" height="16"><title>assistant mayor icon</title>
            <path d="M511.83 795.59l-46.4-80.82 93.2 0.23z" fill="#2c2c2c" p-id="3341" data-spm-anchor-id="a313x.search_index.0.i1.46d93a810kQjDt" className="selected"></path>
            <path d="M511.83 556.45l-46.4 158.37 93.2-0.53z" fill="#2c2c2c" p-id="3342" data-spm-anchor-id="a313x.search_index.0.i0.46d93a810kQjDt" className="selected"></path>
            <path d="M723.88 929.64H300.17c-50.9 0-98.87-19.94-135.08-56.15-36.21-36.21-56.15-84.18-56.15-135.08 0-50.9 19.94-98.87 56.15-135.08 36.21-36.21 84.18-56.15 135.08-56.15h423.71c50.9 0 98.87 19.94 135.08 56.15 36.21 36.21 56.15 84.18 56.15 135.08 0 50.9-19.94 98.87-56.15 135.08-36.2 36.21-84.18 56.15-135.08 56.15zM300.17 607.18c-72.36 0-131.23 58.87-131.23 131.23 0 72.36 58.87 131.23 131.23 131.23h423.71c72.36 0 131.23-58.87 131.23-131.23 0-72.36-58.87-131.23-131.23-131.23H300.17zM512.03 513.91C396.77 513.91 303 420.14 303 304.88S396.77 95.85 512.03 95.85c50.32 0 177.71 0.24 178.99 0.25l29.92 0.06 0.02 29.92c0 1.31 0.1 131.34 0.1 178.81 0 115.25-93.77 209.02-209.03 209.02z m0-358.06C429.85 155.85 363 222.7 363 304.88s66.85 149.03 149.03 149.03 149.03-66.86 149.03-149.03c0-33.29-0.05-107.23-0.08-148.84-41.08-0.08-113.83-0.19-148.95-0.19z" p-id="3343"></path>
        </svg>`+
    // '   <span class="position-absolute translate-middle badge rounded-pill bg-danger d-none" style="left:-52px;width:120px;font-size: 0.85em">new message<span class="visually-hidden">' + scaffoldingUnreadMessageText +
    // '</span></span>' +
    '</button>';
let chatgptAssistantPeerToolBtn = '<!-- chatgpt tool button-->' +
    '<button title="Show Assistant Peer" type="button" id="show-assistant-peer-btn" class="btn btn-outline-secondary border" style="height: 30px; width: 30px; padding: 1px 6px;margin-bottom: 10px;">' +
    `<svg t="1721528326870" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7439" width="16" height="16">
<path d="M191.978264 413.657237a489.852064 489.852064 0 0 0 219.704269 50.204458h2.629758a152.047786 152.047786 0 0 0 97.540089 39.685428 152.047786 152.047786 0 0 0 98.018226-39.685428h1.912551A486.983238 486.983238 0 0 0 831.009289 413.657237a23.906885 23.906885 0 0 0 5.498583-37.055671c-40.163566-41.837048-116.904665-213.010341-129.336245-248.631599a21.038058 21.038058 0 0 0-1.195345-3.586033 213.488479 213.488479 0 0 0-388.008736 0v2.868826C305.057828 163.591225 227.599522 334.764518 185.523406 376.601566a23.906885 23.906885 0 0 0-6.454859 19.842714 23.906885 23.906885 0 0 0 12.909717 17.212957z m393.746389 8.845548v1.673482a110.688875 110.688875 0 0 1-71.720654 32.274294c-66.939277 0-131.248796-88.455473-155.633818-174.281189 38.968222 5.259515 152.525923 14.105062 204.882001-49.965388a157.068232 157.068232 0 0 0 111.884219 27.731986 331.827558 331.827558 0 0 1-85.825715 161.610539z m133.161347-153.24313A939.062425 939.062425 0 0 0 783.195519 384.729907a439.647607 439.647607 0 0 1-129.097176 29.883606 397.332421 397.332421 0 0 0 64.787657-145.353858z m-146.310134-89.17268a23.906885 23.906885 0 0 0-21.277127-6.693927 23.906885 23.906885 0 0 0-17.212957 13.865993c-28.688261 68.612759-173.803051 51.877939-200.339692 42.554254a25.341298 25.341298 0 0 0-9.323685-1.434413c18.408301-39.924497 32.513363-73.633204 36.577533-85.347578A167.348192 167.348192 0 0 1 663.661097 143.509442c3.586033 10.040892 13.865993 35.14312 27.971055 66.22207a111.645151 111.645151 0 0 1-119.056286-29.644537z m-203.208518 234.765607a446.819672 446.819672 0 0 1-129.575314-30.122675A880.490558 880.490558 0 0 0 305.057828 269.259655a401.63566 401.63566 0 0 0 64.30952 145.592927zM654.576481 805.012938a31.318019 31.318019 0 1 0 31.318018-31.318019 31.318019 31.318019 0 0 0-31.318018 31.318019zM761.918392 805.012938a23.906885 23.906885 0 1 0 23.906885-23.906885 23.906885 23.906885 0 0 0-23.906885 23.906885z" fill="#2c2c2c" p-id="7440"></path><path d="M132.689191 828.441684H558.470805a23.906885 23.906885 0 0 0 0-47.813769H159.70397c20.320852-126.22835 77.936444-211.814997 171.173294-254.60832a259.389697 259.389697 0 0 0 180.975116 78.65365A258.91156 258.91156 0 0 0 692.827496 526.019595c99.930777 47.813769 158.741713 141.050619 174.998395 281.6231a23.906885 23.906885 0 0 0 23.906884 20.798989h2.629758a23.906885 23.906885 0 0 0 20.798989-25.819435c-19.364576-165.67471-92.758712-275.168241-218.508925-324.894561a23.906885 23.906885 0 0 0-25.580366 5.737652 218.508925 218.508925 0 0 1-158.502645 75.545755A218.030787 218.030787 0 0 1 352.871597 483.226271a23.906885 23.906885 0 0 0-23.906884-5.020445C202.019156 527.214939 128.62502 636.70847 109.499513 802.38318a23.906885 23.906885 0 0 0 23.906884 26.058504zM902.729942 961.363962H121.213886a31.318019 31.318019 0 1 0 0 62.636038H902.729942a31.318019 31.318019 0 0 0 0-62.636038z" fill="#2c2c2c" p-id="7441">
</path></svg>`+
    // '   <span class="position-absolute translate-middle badge rounded-pill bg-danger d-none" style="left:-52px;width:120px;font-size: 0.85em">new message<span class="visually-hidden">' + scaffoldingUnreadMessageText +
    // '</span></span>' +
    '</button>';
let chatgptAssistantProfessorToolBtn = '<!-- chatgpt tool button-->' +
    '<button title="Show Assistant Professor" type="button" id="show-assistant-professor-btn" class="btn btn-outline-secondary border" style="height: 30px; width: 30px; padding: 1px 6px;margin-bottom: 10px;">' +
    `<svg t="1721528798770" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10865" width="16" height="16">
        <path d="M631.432533 819.899733c100.727467-0.546133 182.3232 7.0656 242.090667 21.742934a17.066667 17.066667 0 1 1-8.1408 33.143466c-55.057067-13.5168-130.184533-20.497067-223.470933-20.753066l-12.305067 24.132266a17.066667 17.066667 0 0 1-30.4128-15.530666l17.066667-33.416534c2.9184-5.700267 8.772267-9.284267 15.172266-9.3184zM101.8368 891.477333a16.896 16.896 0 0 0 6.8096-1.4336c54.442667-23.7056 146.3808-36.0448 273.3568-36.693333l12.322133 24.6784a17.066667 17.066667 0 1 0 30.549334-15.2576l-17.066667-34.133333A17.083733 17.083733 0 0 0 392.533333 819.2c-139.076267 0-236.407467 12.936533-297.5232 39.543467a17.083733 17.083733 0 0 0 6.826667 32.733866zM494.933333 836.266667v34.133333a17.066667 17.066667 0 0 0 34.133334 0v-34.133333a17.066667 17.066667 0 0 0-34.133334 0zM204.8 460.8v-68.266667c0-28.228267 22.971733-51.2 51.2-51.2a17.066667 17.066667 0 0 1 17.066667 17.066667c0.136533 5.290667 1.672533 11.400533 7.1168 14.677333C294.109867 339.029333 307.2 283.6992 307.2 256a17.066667 17.066667 0 0 1 17.066667-17.066667c106.530133 0 267.7248-18.602667 292.573866-59.989333A17.066667 17.066667 0 0 1 648.533333 187.733333c0 60.501333 62.634667 123.835733 63.266134 124.4672a17.0496 17.0496 0 1 1-24.132267 24.132267c-2.525867-2.525867-52.9408-53.538133-68.642133-114.158933-69.239467 43.2128-224.8704 49.783467-278.664534 50.7392-3.447467 33.706667-15.616 81.7152-29.047466 114.176l32.5632 24.4224A51.114667 51.114667 0 0 1 392.533333 375.466667h68.266667c28.228267 0 51.2 22.971733 51.2 51.2 0-28.228267 22.971733-51.2 51.2-51.2h68.266667c22.920533 0 42.154667 15.240533 48.657066 36.0448L723.626667 378.88a17.066667 17.066667 0 1 1 20.48 27.306667l-62.378667 46.779733C677.1712 486.212267 648.891733 512 614.4 512h-34.133333c-37.649067 0-68.266667-30.6176-68.266667-68.266667 0 37.649067-30.6176 68.266667-68.266667 68.266667h-34.133333c-34.491733 0-62.7712-25.787733-67.328-59.0336l-58.402133-43.793067c-21.248-2.116267-33.911467-14.626133-40.0896-28.535466A16.964267 16.964267 0 0 0 238.933333 392.533333v68.266667c0 9.403733 7.662933 17.066667 17.066667 17.066667a17.066667 17.066667 0 0 1 15.9744 11.076266c0.512 1.348267 50.909867 135.287467 83.5584 184.251734l2.798933 4.232533C378.7776 708.4544 406.784 750.933333 512 750.933333c105.216 0 133.2224-42.478933 153.668267-73.506133l2.798933-4.232533c32.648533-48.964267 83.0464-182.903467 83.541333-184.251734 2.5088-6.656 8.874667-11.076267 15.991467-11.076266 9.403733 0 17.066667-7.662933 17.066667-17.066667v-68.266667c0-9.403733-7.662933-17.066667-17.066667-17.066666a17.066667 17.066667 0 0 1-17.066667-17.066667v-102.4c-0.017067-6.946133-2.286933-170.666667-153.6-170.666667-5.922133 0-11.400533-3.072-14.523733-8.0896a17.117867 17.117867 0 0 1-0.750933-16.605866c3.345067-6.673067 1.8944-9.0112 1.348266-9.8816C579.601067 44.578133 560.264533 34.133333 512 34.133333 242.807467 34.133333 238.967467 279.7056 238.933333 290.1504a17.066667 17.066667 0 0 1-17.066666 17.032533h-0.017067A17.0496 17.0496 0 0 1 204.8 290.133333c0-2.901333 3.515733-290.133333 307.2-290.133333 36.573867 0 83.694933 5.6832 100.4544 32.802133 2.952533 4.795733 5.614933 11.281067 5.888 19.336534C749.585067 64.1536 785.066667 188.6208 785.066667 256v88.251733c19.8656 7.048533 34.133333 26.026667 34.133333 48.2816v68.266667a51.3024 51.3024 0 0 1-38.8608 49.698133c-12.4416 32.392533-53.6064 136.840533-83.473067 181.640534l-2.696533 4.078933C672.256 729.4464 635.5968 785.066667 512 785.066667c-123.5968 0-160.256-55.620267-182.1696-88.849067l-2.696533-4.078933c-29.866667-44.8-71.031467-149.248-83.473067-181.640534A51.3024 51.3024 0 0 1 204.8 460.8z m341.333333-17.066667c0 18.824533 15.3088 34.133333 34.133334 34.133334h34.133333c18.824533 0 34.133333-15.3088 34.133333-34.133334v-17.066666c0-9.403733-7.662933-17.066667-17.066666-17.066667h-68.266667c-9.403733 0-17.066667 7.662933-17.066667 17.066667v17.066666z m-170.666666 0c0 18.824533 15.3088 34.133333 34.133333 34.133334h34.133333c18.824533 0 34.133333-15.3088 34.133334-34.133334v-17.066666c0-9.403733-7.662933-17.066667-17.066667-17.066667h-68.266667c-9.403733 0-17.066667 7.662933-17.066666 17.066667v17.066666z m119.466666 204.8a17.066667 17.066667 0 0 0 0 34.133334h34.133334a17.066667 17.066667 0 0 0 0-34.133334h-34.133334z m102.382934-34.082133c0.017067-9.403733-7.594667-17.066667-17.015467-17.117867-0.290133 0-30.8224-0.341333-60.672-15.274666a17.134933 17.134933 0 0 0-15.2576 0A154.5216 154.5216 0 0 1 443.733333 597.333333a17.066667 17.066667 0 0 0 0 34.133334c1.450667 0 33.6896-0.187733 68.266667-15.3088 34.577067 15.121067 66.816 15.3088 68.266667 15.3088a17.066667 17.066667 0 0 0 17.0496-17.015467zM1024 955.733333v51.2a17.066667 17.066667 0 0 1-34.133333 0v-51.2H34.133333v51.2a17.066667 17.066667 0 0 1-34.133333 0v-51.2c0-18.824533 15.3088-34.133333 34.133333-34.133333h887.466667v-78.267733L824.064 745.813333c-6.673067 3.191467-14.062933 5.12-21.930667 5.12-28.228267 0-51.2-22.971733-51.2-51.2s22.971733-51.2 51.2-51.2 51.2 22.971733 51.2 51.2c0 7.8848-1.9456 15.274667-5.137066 21.947734l102.536533 102.519466A17.015467 17.015467 0 0 1 955.733333 836.266667v85.333333h34.133334c18.824533 0 34.133333 15.3088 34.133333 34.133333zM802.133333 716.8c9.403733 0 17.066667-7.662933 17.066667-17.066667 0-9.403733-7.662933-17.066667-17.066667-17.066666-9.403733 0-17.066667 7.662933-17.066666 17.066666 0 9.403733 7.662933 17.066667 17.066666 17.066667z" fill="#231F1F" p-id="10866"></path></svg>`+
    // '   <span class="position-absolute translate-middle badge rounded-pill bg-danger d-none" style="left:-52px;width:120px;font-size: 0.85em">new message<span class="visually-hidden">' + scaffoldingUnreadMessageText +
    // '</span></span>' +
    '</button>';
let chatgptAssistantWhalerToolBtn = '<!-- chatgpt tool button-->' +
    '<button title="Show Assistant Whaler" type="button" id="show-assistant-whaler-btn" class="btn btn-outline-secondary border" style="height: 30px; width: 30px; padding: 1px 6px;margin-bottom: 10px;">' +
    `<svg t="1721528462788" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9484" width="16" height="16">
        <path d="M589.692115 249.741113c0 148.728564-65.481526 265.868307-148.677366 265.868307-84.014999 0-148.626169-117.19094-148.626168-265.868307m148.574971 265.868307" p-id="9485"></path>
        <path d="M626.707865 174.276086c2.20149-8.857157 3.225439-18.123894 3.225438-27.339433 0-81.096745-84.782961-146.936653-188.969751-146.936653C336.0088 0.051197 251.174641 65.839908 251.174641 146.987851c0 9.317934 1.075146 18.379881 3.276636 27.288235-52.323784 17.304735-88.161992 43.722614-88.161991 79.970402 0 24.318784 16.79276 57.648318 94.100894 82.018299l11.724214-43.261837c-47.818409-15.359232-63.843208-32.459177-63.843208-38.756462 0-18.021499 78.99765-61.283336 231.873207-61.283336s231.770811 42.39148 231.770811 60.412979c0 4.505375-9.215539 19.813409-52.886955 35.172642l13.413729 43.261836c68.092595-23.448428 82.376681-54.986051 82.376681-77.512924 0.051197-36.247788-35.735813-62.665667-88.110794-80.021599zM932.40778 986.165092c-1.689516-2.764662-27.749013-72.137193-74.748263-157.739313l-36.145393 22.475676c26.827459 48.688766 51.709415 99.220639 63.433629 127.123244H246.874056c-7.065247-97.531123-52.221389-290.545473-58.825858-317.936103 8.293985-7.986801 17.048748-15.512824 26.161891-22.526874 24.677166 55.242038 55.293235 125.536123 58.774662 142.124094l4.19819 18.072696 345.275536-5.426929 79.765612-175.760812-1.894305-1.023948c-63.433628-59.747413-127.788811-90.926654-192.143993-92.718564h-10.085896L433.437528 602.133093 368.775161 511.104045l-13.516124 4.505375c-6.706865 1.79191-154.565072 47.818409-227.572621 146.885455C55.446828 759.872406 7.526024 986.113894 5.887706 996.046198L0 1024h944.131993l-11.724213-37.834908z" p-id="9486"></path><path d="M1023.948803 450.742263l-39.473227-14.437678-42.033098 131.628618-80.584771-37.066946 50.890256-127.328034-38.60287-17.765512-50.890256 127.328034-68.962952-31.742413 47.050448-108.128993-38.654067-18.943053-65.532724 150.520474 109.40893 49.968701-144.735163 361.914704 38.654067 17.81671 144.786361-362.068297 122.361881 55.856407z" p-id="9487">
        </path></svg>`+
    // '   <span class="position-absolute translate-middle badge rounded-pill bg-danger d-none" style="left:-52px;width:120px;font-size: 0.85em">new message<span class="visually-hidden">' + scaffoldingUnreadMessageText +
    // '</span></span>' +
    '</button>';
let chatgptAssistantEnvironmentalistToolBtn = '<!-- chatgpt tool button-->' +
    '<button title="Show Assistant Environmentalist" type="button" id="show-assistant-environmentalist-btn" class="btn btn-outline-secondary border" style="height: 30px; width: 30px; padding: 1px 6px;margin-bottom: 10px;">' +
    `<svg t="1721528911584" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="15325" width="18" height="18"><path d="M525.5 943.58c-81.04 0-159.21-23.92-226.06-69.17C188.14 799.1 121.69 674 121.69 539.77c0-57.18 11.71-112.44 34.81-164.26 22.31-50.05 54.07-94.4 94.41-131.82 8.1-7.51 20.75-7.04 28.26 1.06 7.51 8.1 7.04 20.75-1.06 28.26-36.35 33.73-64.98 73.69-85.08 118.78-20.8 46.66-31.35 96.45-31.35 147.97 0 120.93 59.88 233.65 160.17 301.52 60.21 40.75 130.62 62.29 203.64 62.29 73.02 0 143.43-21.54 203.64-62.29C829.42 773.41 889.3 660.69 889.3 539.76c0-97.18-37.84-188.54-106.56-257.25-68.72-68.72-160.08-106.56-257.25-106.56-43.36 0-85.77 7.55-126.06 22.43-10.36 3.83-21.86-1.47-25.69-11.83s1.47-21.86 11.83-25.69c44.74-16.53 91.81-24.91 139.92-24.91 54.5 0 107.39 10.68 157.19 31.74 48.09 20.34 91.27 49.45 128.35 86.53s66.19 80.26 86.53 128.35c21.06 49.8 31.74 102.68 31.74 157.19 0 134.22-66.45 259.33-177.75 334.64-66.84 45.26-145.01 69.18-226.05 69.18z" fill="#004039" p-id="15326"></path>
        <path d="M318.52 236.52c-6.58 0-13.03-3.25-16.85-9.2-5.97-9.3-3.27-21.67 6.03-27.63 2.4-1.54 4.86-3.08 7.32-4.59 9.42-5.77 21.73-2.8 27.5 6.62s2.8 21.73-6.62 27.5c-2.22 1.36-4.44 2.75-6.6 4.13a19.931 19.931 0 0 1-10.78 3.17zM525.5 518.66c-58.94 0-106.9-47.96-106.9-106.9s47.96-106.9 106.9-106.9 106.9 47.96 106.9 106.9-47.95 106.9-106.9 106.9z m0-173.8c-36.89 0-66.9 30.01-66.9 66.9s30.01 66.9 66.9 66.9 66.9-30.01 66.9-66.9-30.01-66.9-66.9-66.9zM525.5 943.58c-81.04 0-159.21-23.92-226.06-69.17a20.01 20.01 0 0 1-8.54-19.73c13.25-82.48 42.56-157.16 82.53-210.28 20.65-27.45 43.75-48.91 68.67-63.81 26.61-15.91 54.67-23.97 83.4-23.97 28.73 0 56.8 8.06 83.4 23.97 24.91 14.89 48.02 36.36 68.67 63.81 39.97 53.13 69.28 127.81 82.53 210.28 1.23 7.68-2.1 15.38-8.54 19.73-66.85 45.25-145.02 69.17-226.06 69.17z m-192.91-95.3c57.77 36.22 124.19 55.3 192.91 55.3s135.14-19.08 192.91-55.3c-13.06-71.03-38.7-134.51-72.8-179.83-44.66-59.37-89.97-71.83-120.1-71.83-30.14 0-75.44 12.46-120.1 71.83-34.12 45.32-59.76 108.8-72.82 179.83z" fill="#004039" p-id="15327"></path><path d="M393.86 835.87c29.88 17.88 81 27.72 131.64 27.72 42.91 0 84.8-8.35 123.73-24.46 14.25-5.9 21.64-21.63 17.24-36.41-12.86-43.19-30.93-81.11-52.82-110.21l-0.08-0.11c-6.16-8.18-18.03-9.12-25.49-2.11-35.14 33.03-64.58 56.9-106.6 80.19-24.94 13.83-60.91 31.61-87.02 43.06-11.53 5.04-8.12 17.82-0.6 22.33z" fill="#B4E7B4" p-id="15328"></path>
        <path d="M857.38 742.88c-8.5 0-16.38-5.46-19.07-13.99-17.92-56.86-44.13-104.43-75.8-137.58-30.89-32.33-65.87-49.42-101.16-49.42-11.05 0-20-8.95-20-20s8.95-20 20-20c36.89 0 66.9-30.01 66.9-66.9s-30.01-66.9-66.9-66.9c-11.05 0-20-8.95-20-20s8.95-20 20-20c58.94 0 106.9 47.96 106.9 106.9 0 33.21-15.23 62.94-39.06 82.56 21.94 10.39 42.89 25.87 62.25 46.12 35.88 37.55 65.28 90.52 85.03 153.19 3.32 10.53-2.53 21.77-13.06 25.09-2.02 0.63-4.04 0.93-6.03 0.93zM190.29 742.88c-1.99 0-4.02-0.3-6.02-0.93-10.53-3.32-16.38-14.55-13.06-25.09 19.75-62.67 49.15-115.64 85.03-153.19 19.35-20.26 40.31-35.73 62.25-46.12-23.84-19.62-39.06-49.35-39.06-82.56 0-58.94 47.96-106.9 106.9-106.9 11.05 0 20 8.95 20 20s-8.95 20-20 20c-36.89 0-66.9 30.01-66.9 66.9s30.01 66.9 66.9 66.9c11.05 0 20 8.95 20 20s-8.95 20-20 20c-35.29 0-70.27 17.09-101.16 49.42-31.67 33.15-57.88 80.72-75.8 137.58-2.7 8.53-10.58 13.99-19.08 13.99z" fill="#004039" p-id="15329"></path></svg>`+
    // '   <span class="position-absolute translate-middle badge rounded-pill bg-danger d-none" style="left:-52px;width:120px;font-size: 0.85em">new message<span class="visually-hidden">' + scaffoldingUnreadMessageText +
    // '</span></span>' +
    '</button>';
let chatgptAssistantTutorToolBtn = '<!-- chatgpt tool button-->' +
    '<button title="Show Assistant Tutor" type="button" id="show-assistant-tutor-btn" class="btn btn-outline-secondary border" style="height: 30px; width: 30px; padding: 1px 6px;margin-bottom: 10px;">' +
    `<svg t="1721962459834" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4284" width="16" height="16"><path d="M962.323289 340.849992l-3.152806-3.152806L547.367509 48.91199c-10.026354-7.964392-22.358217-12.286838-35.354206-12.286838s-25.327852 4.323469-35.353183 12.286838L64.8551 337.697185l-3.152806 3.152806c-10.760065 10.760065-16.685008 25.065885-16.685008 40.281425 0 15.21861 5.92699 29.525454 16.689101 40.285518l4.500501 4.499477 134.707005 80.345909L200.913892 714.055902c0 73.006757 28.430516 141.641951 80.053244 193.264679 51.623751 51.623751 120.259968 80.053244 193.265702 80.053244l75.532277 0c73.006757 0 141.641951-28.429493 193.264679-80.053244 51.623751-51.622728 80.053244-120.258944 80.053244-193.264679l0-57.759495-102.33062 0 0 57.759495c0 94.28334-76.704986 170.988326-170.988326 170.988326l-75.532277 0c-94.28334 0-170.988326-76.704986-170.988326-170.988326L303.243489 567.29742 478.921627 672.079882c9.591449 6.873548 21.056572 10.579963 33.090653 10.579963s23.500227-3.706415 33.091676-10.579963l412.716786-246.164492 4.501524-4.501524C984.535173 399.201981 984.535173 363.060853 962.323289 340.849992zM512.013303 572.666708 185.623651 377.991913l326.389652-228.886991L838.402955 377.991913 512.013303 572.666708z" p-id="4285" fill="#2c2c2c"></path></svg>`+
    // '   <span class="position-absolute translate-middle badge rounded-pill bg-danger d-none" style="left:-52px;width:120px;font-size: 0.85em">new message<span class="visually-hidden">' + scaffoldingUnreadMessageText +
    // '</span></span>' +
    '</button>';