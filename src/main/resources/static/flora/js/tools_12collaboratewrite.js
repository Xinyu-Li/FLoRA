//-------------------------------Collaborate writing tool-----------------------------------------
// <script src="diff.js"></script>
function render() {
    let collaborateWritingToolHtml = '    <!-- 协同写作 侧边栏 -->' +
        '    <div id="collapseCollaborateWrite" class="my-horizontal-collapse-tools collaborate-write">' +
        '    </div>';
    $("body").append(collaborateWritingToolHtml);

}
render();
//startCountdown();
let chatInputText="";
let startTime2;
console.log("usercolor4pad: ", usercolor4pad)
function createIframePad(padid) {

        console.log("showing pad!")
        $('#collapseCollaborateWrite').pad({
            host: 'http://localhost/etherpad',
            getContents: false,
            useValue: false,
            baseUrl: '/p/',
            showControls: true,
            showChat: true,
            userColor:usercolor4pad,
            userName: username,
            padId: padid,
            width: '100%',
            height: '100%'
        });
    }

let ready_bar = null;
let ready_editor = null;
let ready_chat = null;

let showSelection = false;
let collapseCollaborateWrite = document.querySelector("#collapseCollaborateWrite");
toolList1.push(collapseCollaborateWrite);
let collaborateWriteJQObj = $(collapseCollaborateWrite); // 重新把DOM包装为jQuery对象
let etherpad_connection  = false;
let userEtherpadSessionID = null;
let userEtherpadPadID = null;
let userEtherpadAuthorID = null;

let showCollaborateWriteBtn = document.querySelector("#showCollaborateWriteBtn");
let collaborateInnerBody = null;

const collapseCollaborateWriteElementXPosition = 345; //collapseCollaborateWrite 元素 在x轴上的位置。
let iframeMousePosition = "";
let iframeMouseMoveData = [];
let iframeMouseWheelData = [];
let CurrentiframeMousePosition = "";
let customSelectContainer = null; // Initialize as null

const chatNameMap = new Map([
    ["zh", {"iconLabel": "聊天", "titlelabel": "聊天", "chatInputPlaceholder": "在此写下您的消息"}],
    ["en", {"iconLabel": "CHAT", "titlelabel": "CHAT", "chatInputPlaceholder": "write your message here..."}],
]);


let availableCollaborativeChatAgents = multiAgent4CollaborativeChatConfig.filter(agent => agent.useAgent === true);


function loadEtherpadScript() {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = '/flora/js/etherpad.js'; // Replace with the correct path
        script.onload = () => {
            console.log('Etherpad script loaded successfully.');
            resolve();
        };
        script.onerror = () => {
            console.error('Failed to load Etherpad script.');
            reject(new Error('Failed to load Etherpad script.'));
        };
        document.head.appendChild(script);
    });
}

// Function to retry loading the script
function retryLoadingScript(retries = 3, delay = 2000, padID, usrName) {
    if (retries > 0) {
        console.log(`Retrying script load... Attempts left: ${retries}`);
        setTimeout(() => {
            loadEtherpadScript()
                .then(() => {
                    initializePad(padID, usrName); // Re-check if the .pad() method is available
                })
                .catch(() => {
                    retryLoadingScript(retries - 1, delay); // Retry again
                });
        }, delay);
    } else {
        console.error('Max retries reached. Failed to load Etherpad script.');
    }
}

// function initializePad(padID,usrName){
//     console.log("!!!!excute initializePad with padID as ", padID, "and userName as ", usrName);
//
//     if (typeof collaborateWriteJQObj.pad === 'function') {
//         collaborateWriteJQObj.pad({'padId': padID, 'userName': usrName});
//         let iframe = document.getElementById("epframecollapseCollaborateWrite");
//         if (!iframe) {
//             console.error("Iframe is missing!");
//             return;
//         }
//         // Check if iframe is loaded
//         iframe.addEventListener("load", function() {
//             console.log("Iframe is fully loaded.");
//             // Add any additional logic you need after the iframe is loaded
//         });
//         console.log("create pad");
//     }
//     else {
//         console.error('The .pad() method is not available.');
//         //retryLoadingScript(padID, usrName);
//     }
// };
//
// let iframeEther;
//
// $('#epframecollapseCollaborateWrite').on('load', function() {
//     console.log('Etherpad iframe loaded:', this.src);
//     iframeEther = document.getElementById('epframecollapseCollaborateWrite');
//     checkIframeLoaded();
//     isIframeLoaded = true;
//     const endTime21 = performance.now();
//     const timeTaken21 = endTime21 - startTime2;
//     console.log("*******From excuting .pad function to iframe fully loaded took ", timeTaken21, " milliseconds!");
//     alert("Etherpad iframe has loaded successfully!");
//
//     clearInterval(countdownInterval);
//
//     // Display an alert indicating the iframe is loaded
//
//     if(countdownDiv){
//         countdownDiv.style.display = 'none';
//     }
//
//     // You can now safely interact with the iframe
//     // For example, fetching contents or triggering actions after the iframe is loaded
// });
// function checkIframeLoaded() {
//
//     try {
//         let collaborateWriteWindow = iframeEther.contentWindow;
//
//         // Check if iframe document is accessible and loaded
//         if (collaborateWriteWindow && collaborateWriteWindow.document.readyState === "complete") {
//             console.log("Etherpad iframe loaded successfully:", iframe.src);
//             // You can now interact with the iframe or trigger further actions
//             console.log("collaborateWriteDocument available and setEtherpadCookie!");
//             setSessionCookie(userEtherpadSessionID,"/");
//         } else {
//             console.log("Iframe not ready, reloading...");
//             iframe.contentWindow.location.reload(); // Force reload
//             setTimeout(checkIframeLoaded, 1000); // Retry after 1 second
//         }
//     } catch (e) {
//         console.log("Unable to access iframe document due to cross-origin restrictions or other issues: ", e);
//         setTimeout(checkIframeLoaded, 1000); // Retry after 1 second
//     }
// }
//
//
// function createEtherPAD(padID,usrname){
//     startTime2 = performance.now();
//     collaborateWriteJQObj.pad({'padId': padID, 'userName': usrname});
//     console.log("************* successfullly create etherpad!!")
// }
//
// function run_initializePad(padID,usrname){
//     const startTime = performance.now();
//     if (typeof collaborateWriteJQObj.pad === 'function') {
//         createEtherPAD(padID,usrname);
//         const endTime = performance.now();
//         const timeTaken = endTime - startTime;
//         console.log("*******From entering run_initializePad() to finising createEtherPAD took ", timeTaken, " milliseconds!");
//
//         const startTime1 = performance.now();
//         let iframe = document.getElementById("epframecollapseCollaborateWrite");
//         if (!iframe) {
//             console.error("Iframe is missing!");
//             return;
//         }
//         // Check if iframe is loaded
//         iframe.addEventListener("load", function() {
//             const endTime1 = performance.now();
//             const timeTaken1 = endTime1 - startTime1;
//             console.log("*******From document.getElementById to iframe fully loaded took ", timeTaken1, " milliseconds!");
//
//             console.log("Iframe is fully loaded.");
//             // Add any additional logic you need after the iframe is loaded
//         });
//         clearInterval(intervalId);
//     }
//     else{
//         console.log("************ recreating Etherpad .......");
//     }
// }





/** for collaborative writing, not used yet */
// function getEtherpadName() {
//     console.log("Ready to excute getEtherpadName");
//     username = username == null ? getUsername() : username;
//     console.log(userId);
//     console.log(username);
//     console.log("getEtherpadName:", apiBaseUrl + "/collaborate-write");
//     $.post(apiBaseUrl + "/collaborate-write", {
//         userId: userId,
//         userName: username,
//         userGroup: getLastname,
//         //userGroup: "001",  //TODO 可以更改，如果moodle 出现分组
//     }, function(data, status) {
//         if (status === "success") {
//             console.log("success connected to etherpad and get response as ", data);
//             if (data.data!=null){
//                 const padID = data.data.padID;
//                 const sessionID = data.data.sessionID;
//                 const authorID = data.data.authorID;
//                 userEtherpadSessionID = sessionID;
//                 userEtherpadPadID = padID;
//                 userEtherpadAuthorID = authorID;
//                 etherpad_connection = true;
//                 console.log("userEtherpadSessionID: ",userEtherpadSessionID);
//             }
//             else{
//                 console.log("connected to etherpad but userEtherpadSessionID is null!");
//             }
//             // console.log("-------document.cookie before setup--------: ",document.cookie)
//             //setSessionCookie(userEtherpadSessionID,"/myapi")
//             setSessionCookie(userEtherpadSessionID,"/")
//             console.log("userEtherpadSessionID: ",userEtherpadSessionID);
//
//             // console.log("-------document.cookie after setup--------: ",document.cookie)
//
//             // if (etherpad_connection&&userEtherpadSessionID!=null){
//             //     //console.log("typeof collaborateWriteJQObj.pad===> ", typeof collaborateWriteJQObj.pad)
//             //     initializePad(userEtherpadPadID,username)
//             //     // if (typeof collaborateWriteJQObj.pad === 'function') {
//             //     //     collaborateWriteJQObj.pad({'padId': userEtherpadPadID, 'userName': username,});
//             //     // }
//             //     // else {
//             //     //     console.error('The .pad() method is not available.');
//             //     // }
//             // }
//             // else{
//             //     console.log("Need to connect to etherpad service first or get padID first!");
//             // }
//         }
//         else {
//             alert("An error occurred while connecting etherpad!.");
//             // if (typeof collaborateWriteJQObj.pad === 'function') {
//             //     collaborateWriteJQObj.pad({ 'padId': padID, 'userName': username });
//             // } else {
//             //     console.error('The .pad() method is not available.');
//             // }
//         }
//     });
// }

function setup_etherpad(){
    console.log("@Etherpad===> under setting-up... ");
    username = username == null ? getUsername() : username;
    console.log("@Etherpad===> set up with [userId: ", userId, "], [username: ", username, "], [userGroup: ", getLastname(), "]");
    console.log("@Etherpad===> requesting:", apiBaseUrl + "/collaborate-write");
    $.post(apiBaseUrl + "/collaborate-write", {
        userId: userId,
        userName: username,
        userGroup: getLastname,
        //userGroup: "001",  //TODO 可以更改，如果moodle 出现分组
    }, function(data, status) {
        if (status === "success") {
            console.log("@Etherpad===> success connected to etherpad and get response as ", data);
            if (data && data.data){
                const padID = data.data.padID;
                const sessionID = data.data.sessionID;
                const authorID = data.data.authorID;

                userEtherpadSessionID = sessionID;
                userEtherpadPadID = padID;
                userEtherpadAuthorID = authorID;
                etherpad_connection = true;
                console.log("@Etherpad===> Successfully retrieved userEtherpadSessionID: ",userEtherpadSessionID);

                collaborateWriteJQObj.pad({'padId': userEtherpadPadID, 'userName': username});
                setSessionCookie(userEtherpadSessionID,"/");
            }
            else{
                // console.warn("@Etherpad===> Connected to Etherpad but userEtherpadSessionID is missing in the response.");
                // alert("@Etherpad===> Failed to retrieve a valid pad ID. Please try again.");

                console.error("Connected to Etherpad but response data is missing or malformed.");
                alert("Unexpected response from Etherpad. Please check the connection or try again.");
            }
            // // console.log("-------document.cookie before setup--------: ",document.cookie)
            // //setSessionCookie(userEtherpadSessionID,"/myapi")
            // setSessionCookie(userEtherpadSessionID,"/")
            // console.log("userEtherpadSessionID: ",userEtherpadSessionID);

        }
        else {
            console.error("Connected to Etherpad but response data is missing or malformed.");
            alert("An error occurred while connecting etherpad!.");
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.error("Request failed:", textStatus, errorThrown);
        alert("Failed to connect to Etherpad. Please check your network connection or try again later.");
    });
}

function rgbToHex(rgb) {
    rgb = rgb.substring(4, rgb.length - 1);
    const rgbArr = rgb.split(",");
    const r = parseInt(rgbArr[0]);
    const g = parseInt(rgbArr[1]);
    const b = parseInt(rgbArr[2]);
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function collaborateWriteToolbarAddClickEvent(window, className) {
    let targetElement = window.document.querySelector(className);
    targetElement.onclick = function (e) {
        stopEventPropagation(e);
        let eventValue = $.extend(true, {}, e);
        eventValue.innerWidth = window.innerWidth;
        eventValue.innerHeight = window.innerHeight;
        eventValue.clientX = eventValue.clientX + collapseCollaborateWriteElementXPosition + 1; // 1是collapseCollaborateWrite元素的border宽度
        // console.log("collaborateWriteToolbarAddClickEvent", className);
        // sendEventMessage("", getCurrentTimestamp(), "COLLABORATE", "MOUSE_CLICK", "COLLABORATE_" + className.toLocaleUpperCase(), "CHANGE_STYLE", "",  eventValue);
    }
}
    window.addEventListener('resize', function() {
        // Your resize event handling code goes here
        console.log('Window resized');
        // Example: Update UI elements based on window size
        // updateUI();



    });
    
function reloadDocumentCookie() {
    setSessionCookie(userEtherpadSessionID,"/")
//    setSessionCookie(userEtherpadSessionID,"/myapi")
//    setSessionCookie(userEtherpadSessionID,"/etherpad")
//    setSessionCookie(userEtherpadSessionID,"/etherpad/p")

        // Set the cookie

//    if (document.cookie.includes("sessionID=")) {
//        console.log("document.cookie.includes <sessionID>: ", document.cookie);
//        const sessionIndex = document.cookie.indexOf("sessionID=");
//        const sessionEnd = document.cookie.indexOf(";", sessionIndex);
//        const oldSession = document.cookie.substring(sessionIndex + 10, sessionEnd);
//        document.cookie = document.cookie.replace(oldSession, userEtherpadSessionID);
//    }else {
//        console.log("document.cookie.includes no <sessionID>")
//        document.cookie = "sessionID=" + userEtherpadSessionID;
//    }
//    console.log("-------document.cookie--------: ", document.cookie)
//    console.log("reload collaborateWriteWindow cookies----------------");
//    let collaborateWriteWindow = window.frames["epframecollapseCollaborateWrite"];
//    let collaborateWriteDocument = collaborateWriteWindow.document;
//    console.log("collaborateWriteWindow: ",collaborateWriteWindow)

//    console.log("collaborateWriteDocument.cookie: ",collaborateWriteDocument.cookie)
//    if (collaborateWriteDocument.cookie.includes("sessionID=")) {
//        console.log("collaborateWriteDocument.cookie.includes <sessionID>:" );
//        const sessionIndex = collaborateWriteDocument.cookie.indexOf("sessionID=");
//        const sessionEnd = collaborateWriteDocument.cookie.indexOf(";", sessionIndex);
//        const oldSession = collaborateWriteDocument.cookie.substring(sessionIndex + 10, sessionEnd);
//        collaborateWriteDocument.cookie = collaborateWriteDocument.cookie.replace(oldSession, userEtherpadSessionID);
//    }else {
//        console.log("Not collaborateWriteDocument.cookie.includes <sessionID>!");
//        collaborateWriteDocument.cookie = "sessionID=" + userEtherpadSessionID;
//    }
//    collaborateWriteDocument.location.reload();
    //console.log(collaborateWriteDocument.location)
}

function showSelectionList(inputElement) {

    const inputRect = inputElement.getBoundingClientRect();
    const inputTop = inputRect.top + window.pageYOffset; // Adjust for page scroll
    const inputLeft = inputRect.left + window.pageXOffset; // Adjust for page scroll


    //console.log("Create a selection list!");

    // Example: Create a selection list near the input area
    const selectionList = document.createElement('div');
    selectionList.innerHTML = '<ul><li>Option 1</li><li>Option 2</li><li>Option 3</li></ul>';
    selectionList.style.position = 'absolute';
    selectionList.style.top = inputTop  + 'px'; // Position below the input
    selectionList.style.left = inputLeft + inputElement.offsetWidth+ 'px';
    selectionList.style.backgroundColor = '#fff';
    selectionList.style.border = '1px solid #ccc';
    selectionList.style.zIndex = '1000'; // Adjust z-index as needed to ensure it's above other elements
    console.log("selectionList: ", selectionList)

    console.log("Add click listener to selection list!");
    // Add click listener to handle item selection
    selectionList.addEventListener('click', function(event) {
        const selectedValue = event.target.textContent;
        console.log("selectedValue: ",selectedValue)
        insertIntoInput(inputElement, selectedValue);
        selectionList.remove(); // Remove the selection list after selection
    });

    // Append selection list to the document body
    document.body.appendChild(selectionList);
}
function insertIntoInput(inputElement, value) {
    // Insert the selected value into the input area
    inputElement.value += value;
}



// Function to create the custom select container
function createCustomSelectContainer() {
    const container = document.createElement("div");
    container.classList.add("collaborative-chat-select");
    return container;
}
// Check if customSelectContainer already exists, create if not
if (!customSelectContainer) {
  customSelectContainer = createCustomSelectContainer();
  document.body.appendChild(customSelectContainer);
}

// Clear previous content if any
//customSelectContainer.innerHTML = "";

// Create the select element
let selectElement = document.createElement("select");
//const placeholderOption = document.createElement('option');
//
//// Set attributes and text content
//placeholderOption.value = ""; // Placeholder value
//placeholderOption.textContent = "Who you wanna @";
//placeholderOption.selected = true; // Make it selected by default
//placeholderOption.disabled = true; // Disable it to prevent selection
//
//// Insert the placeholder option at the beginning of the select element
//selectElement.insertBefore(placeholderOption, selectElement.firstChild);
//
//// Create options for the select element
//const options = [
//  "GPT-all",
//  "GPT"
//];
//options.forEach(function(optionText) {
//  const optionElement = document.createElement("option");
//  optionElement.textContent = optionText;
//  selectElement.appendChild(optionElement);
//});
  // Function to append selected value to the input area
  function appendToInputArea(inputElement, value) {
    inputElement.value += value;
    inputElement.dispatchEvent(new Event('input'));
    inputElement.focus();
  }

  // Function to hide the custom select container
  function hideCustomSelectContainer() {
      console.log("close list: ", customSelectContainer);
      showSelection = false;
      customSelectContainer.classList.remove("open");
      //selectElement.style.display = 'none';
      // if (customSelectContainer) {
      //     console.log("close list")
      //     showSelection = false;
      //     customSelectContainer.classList.remove("open");
      //   }
  }

function showDropdownList(inputElement, option_list){
    //inputElement = collaborateWriteDocument.querySelector("#chatinput");
    const inputRect = inputElement.getBoundingClientRect();
    const half_viewportWidth = window.innerWidth/2-10;

    const inputTop = inputRect.top + window.scrollY+7; // Adjust for page scroll
    const inputLeft = inputRect.left + window.scrollX; // Adjust for page scroll

    // Clear previous content if any
    customSelectContainer.innerHTML = "";

    selectElement.innerHTML = "";

     //Create the select element
    const placeholderOption = document.createElement('option');

     //Set attributes and text content
    placeholderOption.value = ""; // Placeholder value
    placeholderOption.textContent = "Select a GPT";
    placeholderOption.selected = true; // Make it selected by default
    placeholderOption.disabled = true; // Disable it to prevent selection


    selectElement.replaceChildren();
    selectElement.insertBefore(placeholderOption, selectElement.firstChild);


    const options = option_list.map(item => item.agentDisplayName);

    options.forEach(function(optionText) {
      const optionElement = document.createElement("option");
      optionElement.textContent = optionText;
      selectElement.appendChild(optionElement);
    });

    // Style the custom select container
    customSelectContainer.style.position = "absolute";
    customSelectContainer.style.top = inputTop + "px";
    //customSelectContainer.style.left = inputLeft + inputElement.offsetWidth+ 'px';
    customSelectContainer.style.left = inputLeft + half_viewportWidth +'px';
    customSelectContainer.style.zIndex = "1000"; // Ensure it's above other content
    customSelectContainer.classList.add("open");

    customSelectContainer.appendChild(selectElement);
    showSelection = true;
}

function showDropdownDynamic(inputElement, option_list){
    const inputRect = inputElement.getBoundingClientRect();
    const half_viewportWidth = window.innerWidth / 2 - 15;

    const row = inputElement.selectionStart /40;
    let cursor_pos = inputElement.selectionStart % 40;
    if (cursor_pos > 35) {
        cursor_pos = 35;
    }

    //const inputTop = inputRect.top + window.scrollY + 7; // Adjust for page scroll
    const inputBottom = inputRect.bottom + window.scrollY;
    let inputLeft = inputRect.left + cursor_pos*10+window.scrollX; // Adjust for page scroll
    //const inputBottom = inputRect.bottom + window.scrollY;

    console.log("showDropdownDynamic inputLeft is ", inputLeft);

    // Clear previous content if any
    customSelectContainer.innerHTML = "";
    selectElement.innerHTML = "";

    // Map the option list to retrieve display names
    const options = option_list.map(item => item.agentDisplayName);
    selectElement.size = options.length;

    // Temporary div to calculate max width of options
    const tempDiv = document.createElement("div");
    tempDiv.style.position = "absolute";
    tempDiv.style.visibility = "hidden"; // Hide from view
    document.body.appendChild(tempDiv);

    // Measure the width of the longest option
    let maxOptionWidth = 0;
    options.forEach(function(optionText) {
      const optionElement = document.createElement("option");
      optionElement.textContent = optionText;
      selectElement.appendChild(optionElement);

      // Calculate the width of each option
      tempDiv.textContent = optionText;
      const optionWidth = tempDiv.getBoundingClientRect().width;
      if (optionWidth > maxOptionWidth) {
        maxOptionWidth = optionWidth;
      }
    });
    selectElement.style.width = maxOptionWidth + 20 + "px";

    document.body.removeChild(tempDiv); // Remove the temporary div after calculating

    // Determine the final width: maximum of inputElement's width or max option width
    //const inputWidth = inputRect.width;
    //const containerWidth = Math.max(inputWidth, maxOptionWidth); // Add some padding
    console.log("maxOptionWidth: ", maxOptionWidth)
    const containerWidth = maxOptionWidth+30;
    selectElement.selectedIndex = -1;

    // Style the custom select container
    customSelectContainer.style.position = "absolute";
    //customSelectContainer.style.top = inputTop + 12 + "px";
    customSelectContainer.style.bottom = (window.innerHeight - inputBottom) + "px";
    customSelectContainer.style.left = inputLeft + half_viewportWidth + 'px';
    customSelectContainer.style.zIndex = "1000"; // Ensure it's above other content
    customSelectContainer.style.width = containerWidth + "px"; // Dynamically set the width
    customSelectContainer.classList.add("open");

    // Append the select element to the custom select container
    customSelectContainer.appendChild(selectElement);
    showSelection = true;
}




//const optionListElement = document.createElement("optionList");
const optionListElement = document.createElement("ul");

// Set the ID and class for the <ul>
optionListElement.id = "optionList";
optionListElement.className = "option-list";
document.body.appendChild(optionListElement);


function showList(inputElement, option_list){
    console.log("showList Excute!")
    const inputRect = inputElement.getBoundingClientRect();
    const half_viewportWidth = window.innerWidth / 2 - 15;

    const inputTop = inputRect.top + window.scrollY + 7; // Adjust for page scroll
    const inputLeft = inputRect.left + window.scrollX; // Adjust for page scroll

    // Clear previous content if any
    optionListElement.classList.add("open");
    //optionListElement.classList.add("open");

    // Map the option list to retrieve display names
    const options = option_list.map(item => item.agentDisplayName);


    // Temporary div to calculate max width of options
    const tempDiv = document.createElement("div");
    tempDiv.style.position = "absolute";
    tempDiv.style.visibility = "hidden"; // Hide from view
    document.body.appendChild(tempDiv);

    // Measure the width of the longest option
    let maxOptionWidth = 0;
    // Create list items for each option
    option_list.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item.agentDisplayName;

        tempDiv.textContent = item.agentDisplayName;;
        const optionWidth = tempDiv.getBoundingClientRect().width;
        if (optionWidth > maxOptionWidth) {
           maxOptionWidth = optionWidth;
        }

        // Add click event to select the option
        li.addEventListener("click", function() {
            // Remove 'selected' class from all items
            const items = optionListElement.getElementsByTagName("li");
            for (let i = 0; i < items.length; i++) {
                items[i].classList.remove("selected");
            }
            // Add 'selected' class to the clicked item
            this.classList.add("selected");

            // Display selected option
            console.log("Selected option:", this.textContent);
            selected_value = this.textContent
            appendToInputArea(chatInputTextarea,selectedValue);
            optionListElement.classList.remove("open");
        });

        // Append the list item to the unordered list
        optionListElement.appendChild(li);
      });

    const containerWidth = maxOptionWidth+30;
    optionListElement.style.position = "absolute";
    //optionListElement.style.top = inputTop + 12 + "px";
    optionListElement.style.bottom = inputTop + "px";
    optionListElement.style.left = inputLeft + half_viewportWidth + 'px';
    optionListElement.style.zIndex = "1000"; // Ensure it's above other content
    optionListElement.style.width = containerWidth + "px"; // Dynamically set the width
    optionListElement.classList.add("open");

}

function getCollaborate() {
    let body = collaborateInnerBody;
    return $(collaborateInnerBody).text();
}

function getPadUsers() {
    console.log("Ready to Excute getPadUsers!");
    console.log("inside getPadUsers, userEtherpadPadID: ", userEtherpadPadID)
    $.post(apiBaseUrl + "/collaborate-get-userColor", {
        padID: userEtherpadPadID,
    }, function(data, status) {
        if (status === "success") {
            console.log("success get collaborate-getPadUsers");
            console.log("data: ", data);
            const usersColorArray = data.data;
            usersColorArray.find(element => {
                if(element.id == userEtherpadAuthorID) {
                    userColor = element.colorId;
                }
            })
            console.log("userColor:", userColor);
        } else {
            alert("An error occurred while get pad users color.");
        }
    });

}

//window.addEventListener('resize', handleResize);


function setupCollaborateWriteMain(toolbarId, editorId) {

    // initialiize pad
    setup_etherpad();



    console.log("---------setupCollaborateWriteMain-----------")

    //let collaborateWriteWindow = window.frames["epframecollapseCollaborateWrite"];
//    let collaborateWriteFrame = document.getElementById('epframecollapseCollaborateWrite');
//    let collaborateWriteWindow ;
//    let collaborateWriteDocument;
//    let collaborateWriteBody;
//    let collaborateWriteToolbarMain;
//    let collaborateWriteToolbarCountable;
//    let collaborateWriteToolbarCountableDiv;
//
//    let chatLabel;
//    let chatText;
//    let chatTitleLabel;
//    let chatInputTextarea;
//    let stickyContainer;
//    window.addEventListener('message', function(event) {
//        console.log('Message received:', event.data);
//    });
    let collaborateWriteFrame;
    let collaborateWriteWindow ;
    let collaborateWriteDocument ;
    let collaborateWriteBody;
    let collaborateWriteToolbarMain;
    let collaborateWriteToolbarCountable;
    let collaborateWriteToolbarCountableDiv;
    // let collaborateWriteToolbarUndo ;
    // let collaborateWriteToolbarRedo;

    let chatLabel ;
    let chatText;
    let chatTitleLabel;
    let chatInputTextarea ;
    let stickyContainer;

    let ace_outer_window;
    let ace_outer_document;
    let outerdocbody;
    let ace_inner_window;
    let ace_inner_document;
    let collaborateEditorMainDiv;
    let ace_inner_body;

    const checkIframe = setInterval(() => {
        collaborateWriteFrame = document.getElementById('epframecollapseCollaborateWrite');
        if (collaborateWriteFrame&&collaborateWriteFrame.contentWindow && collaborateWriteFrame.contentWindow.document) {
            console.log("Iframe is ready!", collaborateWriteFrame);
            clearInterval(checkIframe);
            collaborateWriteWindow = collaborateWriteFrame.contentWindow;
            collaborateWriteDocument = collaborateWriteWindow.document;

            const check_editor_bar = setInterval(() => {
                collaborateWriteToolbarMain = collaborateWriteDocument.querySelector("#editbar");
                collaborateWriteToolbarCountable = collaborateWriteDocument.querySelector("#ep_short_edition_countable-a");
                collaborateWriteToolbarCountableDiv = collaborateWriteDocument.querySelector("#ep_short_edition_countable-popup");

                // collaborateWriteToolbarUndo = collaborateWriteDocument.querySelector(".buttonicon.buttonicon-undo");
                // collaborateWriteToolbarRedo = collaborateWriteDocument.querySelector(".buttonicon.buttonicon-redo");

                console.log("collaborateWriteToolbarMain: ",collaborateWriteToolbarMain)
                console.log("collaborateWriteToolbarCountable: ",collaborateWriteToolbarCountable)

                if(collaborateWriteToolbarMain && collaborateWriteToolbarCountable && collaborateWriteToolbarCountableDiv){
                    clearInterval(check_editor_bar);
                    listener_editbar();
                    ready_bar = true;
                }
                else{
                    console.log("************* wait for editor_bar loaded!!!!!");
                }
            }, 2000);

           const check_main_editor = setInterval(() => {
               collaborateWriteBody = collaborateWriteDocument.querySelector("body");
               ace_outer_window = collaborateWriteWindow.frames["ace_outer"];
               if(ace_outer_window){
                   ace_outer_document = ace_outer_window.document;
                   outerdocbody = ace_outer_document.querySelector("body");
                   ace_inner_window = window.frames["epframecollapseCollaborateWrite"].frames["ace_outer"].frames["ace_inner"];
                   if(ace_inner_window){
                       ace_inner_document = ace_inner_window.document;
                       collaborateEditorMainDiv = ace_inner_document.querySelector("#innerdocbody");
                       ace_inner_body = ace_inner_document.querySelector("body");
                       collaborateInnerBody = ace_inner_window.document.querySelector("body");
                       if(outerdocbody && collaborateEditorMainDiv && ace_inner_body && collaborateInnerBody){
                           clearInterval(check_main_editor);
                           listener_main_editor();
                           ready_editor = true;
                       }
                       else{
                           console.log("************* wait for collaborateWriteToolbar fully loaded!");
                       }
                   }
               }
           }, 2000);

           const check_chatArea= setInterval(() => {
               chatLabel = collaborateWriteDocument.querySelector("#chatlabel");
               chatText = collaborateWriteDocument.querySelector("#chattext");
               chatTitleLabel = collaborateWriteDocument.querySelector("#titlelabel");
               chatInputTextarea = collaborateWriteDocument.querySelector("#chatinput");
               stickyContainer = collaborateWriteDocument.querySelector(".sticky-container");
               console.log("stickyContainer:", stickyContainer);

               if(chatLabel && chatText && chatTitleLabel && chatInputTextarea && stickyContainer){
                   clearInterval(check_chatArea);
                   listener_chatArea();
                   ready_chat = true;
               }
               else{
                   console.log("************* wait for collaborateWriteToolbar loaded!");
               }

           }, 2000);

        }
        else{
            //initializePad();
            alert("Please wait for etherpad service to be ready!");
        }
    }, 2000); // Check every 500ms


    //let collaborateWriteFrame = document.getElementById('epframecollapseCollaborateWrite');

    // if (collaborateWriteFrame==null){
    //     alert("Please wait for etherpad service to be ready!");
    // }
    //
    // let collaborateWriteWindow = collaborateWriteFrame.contentWindow;
    // let collaborateWriteDocument = collaborateWriteWindow.document;
    // let collaborateWriteBody = collaborateWriteDocument.querySelector("body");
    // let collaborateWriteToolbarMain = collaborateWriteDocument.querySelector("#editbar");
    // let collaborateWriteToolbarCountable = collaborateWriteDocument.querySelector("#ep_short_edition_countable-a");
    // let collaborateWriteToolbarCountableDiv = collaborateWriteDocument.querySelector("#ep_short_edition_countable-popup");
    // console.log("collaborateWriteToolbarMain: ",collaborateWriteToolbarMain)
    // console.log("collaborateWriteToolbarCountable: ",collaborateWriteToolbarCountable)


    //newly added by lin
//    let collaborateWriteToolbarBold = collaborateWriteDocument.querySelector(".buttonicon.buttonicon-bold");
//    let collaborateWriteToolbarItalic = collaborateWriteDocument.querySelector(".buttonicon.buttonicon-italic");
//    let collaborateWriteToolbarItalic = collaborateWriteDocument.querySelector(".buttonicon.buttonicon-underline");
//     let collaborateWriteToolbarUndo = collaborateWriteDocument.querySelector(".buttonicon.buttonicon-undo");
//     let collaborateWriteToolbarRedo = collaborateWriteDocument.querySelector(".buttonicon.buttonicon-redo");
//
//     let chatLabel = collaborateWriteDocument.querySelector("#chatlabel");
//     let chatText = collaborateWriteDocument.querySelector("#chattext");
//     let chatTitleLabel = collaborateWriteDocument.querySelector("#titlelabel");
//     let chatInputTextarea = collaborateWriteDocument.querySelector("#chatinput");
//     let stickyContainer = collaborateWriteDocument.querySelector(".sticky-container");
//     console.log("stickyContainer:", stickyContainer)



    // function get_innder_frame(){
    //     console.log("excute get_innder_frame!")
    //      ace_outer_window = collaborateWriteWindow.frames["ace_outer"];
    //      if (ace_outer_window){
    //         console.log("ace_outer_window available")
    //          ace_outer_document = ace_outer_window.document;
    //          outerdocbody = ace_outer_document.querySelector("body");
    //          ace_inner_window = window.frames["epframecollapseCollaborateWrite"].frames["ace_outer"].frames["ace_inner"];
    //          console.log("ace_inner_window: ",ace_inner_window)
    //          if (ace_inner_window && chatInputTextarea) {
    //              console.log("ace_inner_window && chatInputTextarea is loaded!");
    //              ace_inner_document = ace_inner_window.document;
    //              collaborateEditorMainDiv = ace_inner_document.querySelector("#innerdocbody");
    //              ace_inner_body = ace_inner_document.querySelector("body");
    //              collaborateInnerBody = ace_inner_window.document.querySelector("body");
    //              f()
    //              f1();
    //          }
    //      }
    //      else{
    //         console.log("wait for ace_outer_window available")
    //         setTimeout(get_innder_frame, 5000);
    //      }
    // }



//         ace_outer_document = ace_outer_window.document;
//         outerdocbody = ace_outer_document.querySelector("body");
//         ace_inner_window = window.frames["epframecollapseCollaborateWrite"].frames["ace_outer"].frames["ace_inner"];
//         console.log("ace_inner_window: ",ace_inner_window)
//         ace_inner_document = ace_inner_window.document;
//         collaborateEditorMainDiv = ace_inner_document.querySelector("#innerdocbody");
//         ace_inner_body = ace_inner_document.querySelector("body");
         //f()
         //f1()
    //}


//    let ace_outer_window = collaborateWriteWindow.frames["ace_outer"];
//    let ace_outer_document = ace_outer_window.document;
//    let outerdocbody = ace_outer_document.querySelector("body");
//    let ace_inner_window = window.frames["epframecollapseCollaborateWrite"].frames["ace_outer"].frames["ace_inner"];
//    console.log("ace_inner_window: ",ace_inner_window)
//    let ace_inner_document = ace_inner_window.document;
//    let collaborateEditorMainDiv = ace_inner_document.querySelector("#innerdocbody");
//    let ace_inner_body = ace_inner_document.querySelector("body");

    let collapseCollaborateWriteElement = document.querySelector("#collapseCollaborateWrite");

    function listener_editbar(){

        function changeWordCountIcon() {
            // debugger;
            let btn = collaborateWriteToolbarCountable.children[0]
            btn.classList.remove("buttonicon-gauge");
            btn.innerHTML = "count";
        }
        changeWordCountIcon();

        collaborateWriteToolbarCountable.onclick = function (e) {
            // debugger;
            console.log("collaborateWriteToolbarCountable click")
            setTimeout(function () {
                collaborateWriteToolbarCountable.classList.remove("selected");
                collaborateWriteToolbarCountableDiv.classList.remove("popup-show");}, 10000);

            //event.stopPropagation();
            let eventValue = $.extend(true, {}, e);
            eventValue.innerWidth = collaborateWriteWindow.innerWidth;
            eventValue.innerHeight = collaborateWriteWindow.innerHeight;
            eventValue.clientX = eventValue.clientX + collapseCollaborateWriteElementXPosition + 1; // 1是collapseCollaborateWrite元素的border宽度
            sendEventMessage("", getCurrentTimestamp(), "COLLABORATE_ESSAY", "MOUSE_CLICK", subActionLabelMap["COLLABORATIVE_ESSAY_CHECK_WORD_COUNT"], "COLLABORATE_ESSAY", "COLLABORATIVE_WORD_COUNT_BTN", "WORD_COUNT", "",eventValue);
        }
        collaborateWriteToolbarMain.onclick = function (e) {
            console.log("collaborateWriteToolbarMain click")
//        if (showSelection) {
//                    hideCustomSelectContainer();
//                }
            stopEventPropagation(e);
            let eventValue = $.extend(true, {}, e);
            eventValue.innerWidth = collaborateWriteWindow.innerWidth;
            eventValue.innerHeight = collaborateWriteWindow.innerHeight;
            eventValue.clientX = eventValue.clientX + collapseCollaborateWriteElementXPosition + 1; // 1是collapseCollaborateWrite元素的border宽度
            //console.log("collaborateWriteToolbarMain onclick eventValue", eventValue);
            //console.log("collaborateWriteToolbarMain onclick", e);
            //修改essay 样式
            sendEventMessage("", getCurrentTimestamp(), "COLLABORATE_ESSAY", "MOUSE_CLICK", subActionLabelMap["COLLABORATIVE_ESSAY_CHANGE_STYLE"], "COLLABORATE_ESSAY", "COLLABORATE_ESSAY_TOOLBAR", "CHANGE_STYLE", "", eventValue);
        }

    }

    function listener_main_editor(){
        let oldText = "";
        let bgcolor = "";

        collaborateEditorMainDiv.onkeyup = function(e) {
            console.log("collaborateEditorMainDiv.onkeyup")
            let eventValue = $.extend(true, {}, e);
            eventValue.innerWidth = collaborateWriteWindow.innerWidth;
            eventValue.innerHeight = collaborateWriteWindow.innerHeight;
            eventValue.clientX = eventValue.clientX + collapseCollaborateWriteElementXPosition + 1; // 1是collapseCollaborateWrite元素的border宽度
            if (getCollaborate().length == 1) {
                // debugger;
                console.log("getCollaborate().length == 1")
                oldText = getCollaborate();
                console.log("oldText: ", oldText)
                const spanEle = ace_inner_document.getSelection().focusNode.parentElement;
                bgcolor = getComputedStyle(spanEle).backgroundColor;
                bgcolor = rgbToHex(bgcolor);
                console.log("第一次输入:", bgcolor)
                sendEventMessage("", getCurrentTimestamp(), "COLLABORATE_ESSAY", "KEYBOARD_STROKE", subActionLabelMap["COLLABORATIVE_ESSAY_WRITE"], "WRITE", "COLLABORATE_INNER-EDITOR", "KEY", "KEY:::" + eventValue.key + "---" + eventValue.code, eventValue);
            }
            if (getCollaborate().length == 0) {
                console.log("getCollaborate().length == 0")
                if (oldText == "") {
                    // debugger;
                    eventValue.userId = "";
                    sendEventMessage("", getCurrentTimestamp(), "COLLABORATE_ESSAY", "KEYBOARD_STROKE", subActionLabelMap["COLLABORATIVE_ESSAY_DELETE"],"DELETE","COLLABORATE_INNER-EDITOR", "DELETE_TEXT","DELETE_TEXT:::",  eventValue);
                }
                if (bgcolor == userColor) {
                    // debugger;
                    eventValue.userId = "";
                    sendEventMessage("", getCurrentTimestamp(), "COLLABORATE_ESSAY", "KEYBOARD_STROKE", subActionLabelMap["COLLABORATIVE_ESSAY_DELETE"],"DELETE", "COLLABORATE_INNER-EDITOR","DELETE_TEXT","DELETE_TEXT:::" + oldText, eventValue);
                }
                if (bgcolor != userColor) {
                    // debugger;
                    eventValue.userId = userId;
                    sendEventMessage("", getCurrentTimestamp(), "COLLABORATE_ESSAY", "KEYBOARD_STROKE",subActionLabelMap["COLLABORATIVE_ESSAY_OTHER_DELETE"], "OTHER_DELETE","COLLABORATE_INNER-EDITOR", "DELETE_TEXT", "DELETE_TEXT:::" + oldText,eventValue);
                }
                oldText = "";
            }
            if (getCollaborate().length > oldText.length) {
                console.log("getCollaborate().length > oldText.length")
                console.log("getCollaborate().length: ",getCollaborate().length)
                console.log("oldText.length: ",oldText.length)
                const newText = getCollaborate();
                // const spanEle = ace_inner_document.getSelection().focusNode.parentElement;
                // bgcolor = getComputedStyle(spanEle).backgroundColor;
                // bgcolor = rgbToHex(bgcolor);
                if (bgcolor == userColor) {
                    // debugger;
                    eventValue.userId = "";
                    sendEventMessage("", getCurrentTimestamp(), "COLLABORATE_ESSAY", "KEYBOARD_STROKE", subActionLabelMap["COLLABORATIVE_ESSAY_WRITE"],"COLLABORATE_INNER-EDITOR", "WRITE", "CHANGE_INPUT", "KEY:::" + eventValue.key + "---" + eventValue.code, e);
                }
                if (bgcolor != userColor) {
                    // debugger;
                    eventValue.userId = userId;
                    const diffRes = Diff.diffChars(oldText, newText);
                    // console.log("diffRes:", diffRes);
                    diffRes.forEach((part) => {
                        if(part.added) {
                            sendEventMessage("", getCurrentTimestamp(), "COLLABORATE", "KEYBOARD_STROKE", subActionLabelMap["COLLABORATIVE_ESSAY_WRITE"], "COLLABORATE_INNER-EDITOR", "OTHER_ADD_WRITE", "CHANGE_INPUT","KEY:::" + part.value, e);
                        }
                    });
                }
                oldText = newText;
            }
            if (getCollaborate().length > 0 && getCollaborate().length < oldText.length) {
                console.log("getCollaborate().length > 0 && getCollaborate().length < oldText.length")
                const newText = getCollaborate();
                // const spanEle = ace_inner_document.getSelection().focusNode.parentElement;
                // bgcolor = getComputedStyle(spanEle).backgroundColor;
                // bgcolor = rgbToHex(bgcolor);
                if (bgcolor == userColor) {
                    // debugger;
                    eventValue.userId = "";
                    const diffRes = Diff.diffChars(oldText, newText);
                    // console.log("diffRes:", diffRes);
                    diffRes.forEach((part) => {
                        if(part.removed) {
                            sendEventMessage("", getCurrentTimestamp(), "COLLABORATE", "KEYBOARD_STROKE",null, "COLLABORATE_INNER-EDITOR", "DELETE", "CHANGE_INPUT", "DELETE_TEXT:::" + part.value, e);
                        }
                    });
                }
                if (bgcolor != userColor) {
                    // debugger;
                    eventValue.userId = userId;
                    const diffRes = Diff.diffChars(oldText, newText);
                    // console.log("diffRes:", diffRes);
                    diffRes.forEach((part) => {
                        if(part.removed) {
                            sendEventMessage("", getCurrentTimestamp(), "COLLABORATE", "KEYBOARD_STROKE", null,"COLLABORATE_INNER-EDITOR", "OTHER_DELETE", "CHANGE_INPUT", "DELETE_TEXT:::" + part.value, e);
                        }
                    });
                }
                oldText = newText;
            }

            // const diffRes1 = Diff.diffChars("aaa", "aaabbb");
            // const diffRes2 = Diff.diffChars("aaabbb", "aaacccbbb");
            // debugger;
            // console.log("diffRes1:",diffRes1);
            // console.log("diffRes2:",diffRes2);
            // // console.log("collaborateEditorMainDiv onkeyup");
            // if(e.key == "Backspace") {
            //     const newText = getCollaborate();
            //     const diffRes = Diff.diffChars(oldText, newText);
            //     console.log("diffRes:", diffRes);
            //     diffRes.forEach((part) => {
            //         if(part.added) {
            //             // part.value
            //             // sendEventMessage("", getCurrentTimestamp(), "COLLABORATE", "KEYBOARD_STROKE", "COLLABORATE_INNER-EDITOR", "DELETE", "PASTE_TEXT:::" + eventValue.key + "---" + eventValue.code, eventValue);
            //         }
            //         if(part.removed) {
            //
            //         }
            //     });
            // }
            // oldText = getCollaborate();
            //
            // //敲击键盘，正在写essay
            //sendEventMessage("", getCurrentTimestamp(), "COLLABORATE", "KEYBOARD_STROKE", "COLLABORATE_INNER-EDITOR", "WRITE", "KEY:::" + eventValue.key + "---" + eventValue.code, eventValue);
            sendEventMessage("", getCurrentTimestamp(), "COLLABORATE", "KEYBOARD_STROKE", null,"COLLABORATE_INNER-EDITOR", "WRITE", "KEY:::" + eventValue.key + "---" + eventValue.code, e);

        };

        collaborateEditorMainDiv.onpaste = function(e) {
            console.log("collaborateEditorMainDiv onpaste");
            let pasteText = e.clipboardData.getData("text");
            let eventValue = $.extend(true, {}, e);
            eventValue.innerWidth = collaborateWriteWindow.innerWidth;
            eventValue.innerHeight = collaborateWriteWindow.innerHeight;
            eventValue.clientX = eventValue.clientX + collapseCollaborateWriteElementXPosition + 1; // 1是collapseCollaborateWrite元素的border宽度
            // console.log(pasteText); //此处名称必须用text，其他会得到空值
            //手动粘贴文字到essay中

            sendEventMessage("", getCurrentTimestamp(), "COLLABORATE", "PASTE_TEXT", null,"COLLABORATE_INNER-EDITOR", "PASTE_TEXT", "CHANGE_INPUT", "PASTE_TEXT:::" + pasteText, e);

        };

        let tempEventValue = "";
        let tempInstantEvent = "";

        collaborateEditorMainDiv.onmouseup = function(e) {

            let selectedText = ace_inner_window.getSelection().toString();
            if (selectedText.length == 0) {
                // 未选中文本
                tempEventValue = "CURSOR_POSITION:::_" ; // + range.index
                tempInstantEvent = "FOCUS";
            }else {
                // 选中文本
                tempEventValue = "SELECTED_TEXT:::" + selectedText;
                tempInstantEvent = "SELECT_TEXT";
            }
            //console.log("collaborateEditorMainDiv onmouseup: ", tempEventValue)
            //console.log("collaborateEditorMainDiv onmouseup tempInstantEvent: ", tempInstantEvent)
            sendEventMessage("", getCurrentTimestamp(), "COLLABORATE_ESSAY", "MOUSE_CLICK", subActionLabelMap["COLLABORATIVE_ESSAY_SELECT_TEXT"], "COLLABORATE_INNER-EDITOR", tempInstantEvent,tempEventValue,e);
        };

        collaborateEditorMainDiv.onblur = function (e) {
            console.log('collaborateEditorMainDiv onblur');
            tempInstantEvent = "BLUR";
            sendEventMessage("", getCurrentTimestamp(), "COLLABORATE_ESSAY", "MOUSE_CLICK", null, "COLLABORATE_INNER-EDITOR", tempInstantEvent, tempEventValue,  e);
        };

        outerdocbody.onclick = function (e) {
            // stopEventPropagation(e)
            console.log("outerdocbody click");
//        if (selectElement.value=="" && showSelection) {
//                    hideCustomSelectContainer();
//                }
            let currentTimestamp = getCurrentTimestamp();
            let eventValue = $.extend(true, {}, e);
            eventValue.innerWidth = collaborateWriteWindow.innerWidth;
            eventValue.innerHeight = collaborateWriteWindow.innerHeight;
            eventValue.clientX = eventValue.clientX + collapseCollaborateWriteElementXPosition + 1; // 1是collapseCollaborateWrite元素的border宽度

            sendEventMessage("", currentTimestamp, "EXTRA", "MOUSE_CLICK", null, "BODY_CLICK", "COLLABORATE_OUTER-EDITOR", null, "", e);

        };

        collaborateWriteBody.onmousemove = function(e) {
            console.log("collaborateWriteBody onmousemove")
            let eventValue = $.extend(true, {}, e);
            eventValue.innerWidth = collaborateWriteWindow.innerWidth;
            eventValue.innerHeight = collaborateWriteWindow.innerHeight;
            eventValue.clientX = eventValue.clientX + collapseCollaborateWriteElementXPosition + 1; // 1是collapseCollaborateWrite元素的border宽度
            //console.log("collapseCollaborateWriteElementXPosition: ",collapseCollaborateWriteElementXPosition)
            iframeMousePosition = generateMousePositionData(eventValue, "COLLABORATE_TOOLBAR_BODY");
            CurrentiframeMousePosition = iframeMousePosition;

            //console.log("position: ",iframeMousePosition)
        };

        outerdocbody.onmousemove = function(e) {
            console.log("outerdocbody onmousemove")
            let eventValue = $.extend(true, {}, e);
            eventValue.innerWidth = collaborateWriteWindow.innerWidth;
            eventValue.innerHeight = collaborateWriteWindow.innerHeight;
            eventValue.clientX = eventValue.clientX + collapseCollaborateWriteElementXPosition + 1; // 1是collapseCollaborateWrite元素的border宽度
            iframeMousePosition = generateMousePositionData(eventValue, "COLLABORATE_OUTER_BODY");
            //console.log("position: ",iframeMousePosition)
            CurrentiframeMousePosition = iframeMousePosition;
        };

        ace_inner_body.onmousemove = function(e) {
            console.log("ace_inner_body onmousemove")
            let eventValue = $.extend(true, {}, e);
            eventValue.innerWidth = collaborateWriteWindow.innerWidth;
            eventValue.innerHeight = collaborateWriteWindow.innerHeight;
            //console.log("collapseCollaborateWriteElementXPosition: ",collapseCollaborateWriteElementXPosition)
            //console.log("collapseCollaborateWriteElementXPosition: ",collapseCollaborateWriteElementXPosition)
            //console.log("eventValue.clientX: ", eventValue.clientX, "eventValue.clientY: ", eventValue.clientY)
            eventValue.clientX = eventValue.clientX + collapseCollaborateWriteElementXPosition + 1; // 1是collapseCollaborateWrite元素的border宽度
            iframeMousePosition = generateMousePositionData(eventValue, "COLLABORATE_INNER_BODY");
            //console.log("position: ",iframeMousePosition)
            CurrentiframeMousePosition = iframeMousePosition;
        };

        ace_inner_body.onmousewheel = function(e) {
            console.log("ace_inner_body onmousewheel")
            let eventValue = $.extend(true, {}, e);
            eventValue.innerWidth = collaborateWriteWindow.innerWidth;
            eventValue.innerHeight = collaborateWriteWindow.innerHeight;
            eventValue.clientX = eventValue.clientX + collapseCollaborateWriteElementXPosition + 1; // 1是collapseCollaborateWrite元素的border宽度
            // iframeMouseWheelData.push(generateMouseWheelData(eventValue, "COLLABORATE_INNER_BODY")); //TODO 此处需要重写
            //console.log("position: ",iframeMousePosition)
            CurrentiframeMousePosition = iframeMousePosition;
        };

        setInterval(function () {
            if (iframeMousePosition !== "") {
                iframeMouseMoveData.push(iframeMousePosition);
                iframeMousePosition = "";
            }
        }, 100);
    };

    function listener_chatArea(){

        function changeDefaultLanguage(language) {
            const chatObj = chatNameMap.get(language);
            //chatInputTextarea.setAttribute("placeholder", chatObj.chatInputPlaceholder);
            chatInputTextarea.placeholder = chatObj.chatInputPlaceholder
            chatTitleLabel.innerHTML = chatObj.titlelabel;
            chatLabel.innerHTML = chatObj.iconLabel;
        }

        changeDefaultLanguage("en");


    // let oldText = "";
    // let bgcolor = "";

  // Add change event listener to select element
    selectElement.addEventListener("change", function() {
      const selectedValue = selectElement.value;

      console.log("selectedValue: ", selectedValue);
      if (selectedValue != "") {
        appendToInputArea(chatInputTextarea,selectedValue);
        hideCustomSelectContainer();
      }
    });

//    document.addEventListener('click', function(event) {
//        console.log("selectionList:",customSelectContainer);
//        console.log("selectElement.value: ",selectElement.value)
//        if (selectElement.value=="" && showSelection) {
//            hideCustomSelectContainer();
//        }
//     });



    // collaborateEditorMainDiv.onkeyup = function(e) {
    //     console.log("collaborateEditorMainDiv.onkeyup")
    //     let eventValue = $.extend(true, {}, e);
    //     eventValue.innerWidth = collaborateWriteWindow.innerWidth;
    //     eventValue.innerHeight = collaborateWriteWindow.innerHeight;
    //     eventValue.clientX = eventValue.clientX + collapseCollaborateWriteElementXPosition + 1; // 1是collapseCollaborateWrite元素的border宽度
    //     if (getCollaborate().length == 1) {
    //         // debugger;
    //         console.log("getCollaborate().length == 1")
    //         oldText = getCollaborate();
    //         console.log("oldText: ", oldText)
    //         const spanEle = ace_inner_document.getSelection().focusNode.parentElement;
    //         bgcolor = getComputedStyle(spanEle).backgroundColor;
    //         bgcolor = rgbToHex(bgcolor);
    //         console.log("第一次输入:", bgcolor)
    //         sendEventMessage("", getCurrentTimestamp(), "COLLABORATE_ESSAY", "KEYBOARD_STROKE", subActionLabelMap["COLLABORATIVE_ESSAY_WRITE"], "WRITE", "COLLABORATE_INNER-EDITOR", "KEY", "KEY:::" + eventValue.key + "---" + eventValue.code, eventValue);
    //     }
    //     if (getCollaborate().length == 0) {
    //         console.log("getCollaborate().length == 0")
    //         if (oldText == "") {
    //             // debugger;
    //             eventValue.userId = "";
    //             sendEventMessage("", getCurrentTimestamp(), "COLLABORATE_ESSAY", "KEYBOARD_STROKE", subActionLabelMap["COLLABORATIVE_ESSAY_DELETE"],"DELETE","COLLABORATE_INNER-EDITOR", "DELETE_TEXT","DELETE_TEXT:::",  eventValue);
    //         }
    //         if (bgcolor == userColor) {
    //             // debugger;
    //             eventValue.userId = "";
    //             sendEventMessage("", getCurrentTimestamp(), "COLLABORATE_ESSAY", "KEYBOARD_STROKE", subActionLabelMap["COLLABORATIVE_ESSAY_DELETE"],"DELETE", "COLLABORATE_INNER-EDITOR","DELETE_TEXT","DELETE_TEXT:::" + oldText, eventValue);
    //         }
    //         if (bgcolor != userColor) {
    //             // debugger;
    //             eventValue.userId = userId;
    //             sendEventMessage("", getCurrentTimestamp(), "COLLABORATE_ESSAY", "KEYBOARD_STROKE",subActionLabelMap["COLLABORATIVE_ESSAY_OTHER_DELETE"], "OTHER_DELETE","COLLABORATE_INNER-EDITOR", "DELETE_TEXT", "DELETE_TEXT:::" + oldText,eventValue);
    //         }
    //         oldText = "";
    //     }
    //     if (getCollaborate().length > oldText.length) {
    //         console.log("getCollaborate().length > oldText.length")
    //         console.log("getCollaborate().length: ",getCollaborate().length)
    //         console.log("oldText.length: ",oldText.length)
    //         const newText = getCollaborate();
    //         // const spanEle = ace_inner_document.getSelection().focusNode.parentElement;
    //         // bgcolor = getComputedStyle(spanEle).backgroundColor;
    //         // bgcolor = rgbToHex(bgcolor);
    //         if (bgcolor == userColor) {
    //             // debugger;
    //             eventValue.userId = "";
    //             sendEventMessage("", getCurrentTimestamp(), "COLLABORATE_ESSAY", "KEYBOARD_STROKE", subActionLabelMap["COLLABORATIVE_ESSAY_WRITE"],"COLLABORATE_INNER-EDITOR", "WRITE", "CHANGE_INPUT", "KEY:::" + eventValue.key + "---" + eventValue.code, e);
    //         }
    //         if (bgcolor != userColor) {
    //             // debugger;
    //             eventValue.userId = userId;
    //             const diffRes = Diff.diffChars(oldText, newText);
    //             // console.log("diffRes:", diffRes);
    //             diffRes.forEach((part) => {
    //                 if(part.added) {
    //                     sendEventMessage("", getCurrentTimestamp(), "COLLABORATE", "KEYBOARD_STROKE", subActionLabelMap["COLLABORATIVE_ESSAY_WRITE"], "COLLABORATE_INNER-EDITOR", "OTHER_ADD_WRITE", "CHANGE_INPUT","KEY:::" + part.value, e);
    //                 }
    //             });
    //         }
    //         oldText = newText;
    //     }
    //     if (getCollaborate().length > 0 && getCollaborate().length < oldText.length) {
    //         console.log("getCollaborate().length > 0 && getCollaborate().length < oldText.length")
    //         const newText = getCollaborate();
    //         // const spanEle = ace_inner_document.getSelection().focusNode.parentElement;
    //         // bgcolor = getComputedStyle(spanEle).backgroundColor;
    //         // bgcolor = rgbToHex(bgcolor);
    //         if (bgcolor == userColor) {
    //             // debugger;
    //             eventValue.userId = "";
    //             const diffRes = Diff.diffChars(oldText, newText);
    //             // console.log("diffRes:", diffRes);
    //             diffRes.forEach((part) => {
    //                 if(part.removed) {
    //                      sendEventMessage("", getCurrentTimestamp(), "COLLABORATE", "KEYBOARD_STROKE",null, "COLLABORATE_INNER-EDITOR", "DELETE", "CHANGE_INPUT", "DELETE_TEXT:::" + part.value, e);
    //                 }
    //             });
    //         }
    //         if (bgcolor != userColor) {
    //             // debugger;
    //             eventValue.userId = userId;
    //             const diffRes = Diff.diffChars(oldText, newText);
    //             // console.log("diffRes:", diffRes);
    //             diffRes.forEach((part) => {
    //                 if(part.removed) {
    //                      sendEventMessage("", getCurrentTimestamp(), "COLLABORATE", "KEYBOARD_STROKE", null,"COLLABORATE_INNER-EDITOR", "OTHER_DELETE", "CHANGE_INPUT", "DELETE_TEXT:::" + part.value, e);
    //                 }
    //             });
    //         }
    //         oldText = newText;
    //     }
    //
    //     // const diffRes1 = Diff.diffChars("aaa", "aaabbb");
    //     // const diffRes2 = Diff.diffChars("aaabbb", "aaacccbbb");
    //     // debugger;
    //     // console.log("diffRes1:",diffRes1);
    //     // console.log("diffRes2:",diffRes2);
    //     // // console.log("collaborateEditorMainDiv onkeyup");
    //     // if(e.key == "Backspace") {
    //     //     const newText = getCollaborate();
    //     //     const diffRes = Diff.diffChars(oldText, newText);
    //     //     console.log("diffRes:", diffRes);
    //     //     diffRes.forEach((part) => {
    //     //         if(part.added) {
    //     //             // part.value
    //     //             // sendEventMessage("", getCurrentTimestamp(), "COLLABORATE", "KEYBOARD_STROKE", "COLLABORATE_INNER-EDITOR", "DELETE", "PASTE_TEXT:::" + eventValue.key + "---" + eventValue.code, eventValue);
    //     //         }
    //     //         if(part.removed) {
    //     //
    //     //         }
    //     //     });
    //     // }
    //     // oldText = getCollaborate();
    //     //
    //     // //敲击键盘，正在写essay
    //     //sendEventMessage("", getCurrentTimestamp(), "COLLABORATE", "KEYBOARD_STROKE", "COLLABORATE_INNER-EDITOR", "WRITE", "KEY:::" + eventValue.key + "---" + eventValue.code, eventValue);
    //     sendEventMessage("", getCurrentTimestamp(), "COLLABORATE", "KEYBOARD_STROKE", null,"COLLABORATE_INNER-EDITOR", "WRITE", "KEY:::" + eventValue.key + "---" + eventValue.code, e);
    //
    // };
    //
    // collaborateEditorMainDiv.onpaste = function(e) {
    //     console.log("collaborateEditorMainDiv onpaste");
    //     let pasteText = e.clipboardData.getData("text");
    //     let eventValue = $.extend(true, {}, e);
    //     eventValue.innerWidth = collaborateWriteWindow.innerWidth;
    //     eventValue.innerHeight = collaborateWriteWindow.innerHeight;
    //     eventValue.clientX = eventValue.clientX + collapseCollaborateWriteElementXPosition + 1; // 1是collapseCollaborateWrite元素的border宽度
    //     // console.log(pasteText); //此处名称必须用text，其他会得到空值
    //     //手动粘贴文字到essay中
    //
    //     sendEventMessage("", getCurrentTimestamp(), "COLLABORATE", "PASTE_TEXT", null,"COLLABORATE_INNER-EDITOR", "PASTE_TEXT", "CHANGE_INPUT", "PASTE_TEXT:::" + pasteText, e);
    //
    // };
    //
    // let tempEventValue = "";
    // let tempInstantEvent = "";
    //
    // collaborateEditorMainDiv.onmouseup = function(e) {
    //
    //     let selectedText = ace_inner_window.getSelection().toString();
    //     if (selectedText.length == 0) {
    //         // 未选中文本
    //         tempEventValue = "CURSOR_POSITION:::_" ; // + range.index
    //         tempInstantEvent = "FOCUS";
    //     }else {
    //         // 选中文本
    //         tempEventValue = "SELECTED_TEXT:::" + selectedText;
    //         tempInstantEvent = "SELECT_TEXT";
    //     }
    //     //console.log("collaborateEditorMainDiv onmouseup: ", tempEventValue)
    //     //console.log("collaborateEditorMainDiv onmouseup tempInstantEvent: ", tempInstantEvent)
    //     sendEventMessage("", getCurrentTimestamp(), "COLLABORATE_ESSAY", "MOUSE_CLICK", subActionLabelMap["COLLABORATIVE_ESSAY_SELECT_TEXT"], "COLLABORATE_INNER-EDITOR", tempInstantEvent,tempEventValue,e);
    // }
    //
    // collaborateEditorMainDiv.onblur = function (e) {
    //     console.log('collaborateEditorMainDiv onblur');
    //     tempInstantEvent = "BLUR";
    //     sendEventMessage("", getCurrentTimestamp(), "COLLABORATE_ESSAY", "MOUSE_CLICK", null, "COLLABORATE_INNER-EDITOR", tempInstantEvent, tempEventValue,  e);
    // }

    chatInputTextarea.addEventListener('input', function (e) {
      var text = chatInputTextarea.value;
      console.log("text input inside chatInputTextarea: ",text)
      chatInputText = text;
      });

    // chatIcon的父元素通过捕获的方式监听click
    stickyContainer.addEventListener('click', function (e) {
        console.log("stickyContainer clicked!");
        console.log("chat click", e.target.className);
        console.log("selectElement.value", selectElement.value);
        if (selectElement.value=="" && showSelection) {
            hideCustomSelectContainer();
        }
        const CHAT_LABEL = "chatlabel"; // 聊天label的id
        const CHAT_BUTTON = "buttonicon-chat"; // 聊天icon的id
        const CHAT_COUNTER = "chatcounter";  // 聊天数量的id
        const CHAT_CLOSE = "titlecross"; // 聊天窗关闭按钮的id
        let currentTimestamp = getCurrentTimestamp();
        let eventValue = $.extend(true, {}, e);
        eventValue.innerWidth = collaborateWriteWindow.innerWidth;
        eventValue.innerHeight = collaborateWriteWindow.innerHeight;
        eventValue.clientX = eventValue.clientX + collapseCollaborateWriteElementXPosition + 1; // 1是collapseCollaborateWrite元素的border宽度
        const targetElementID = e.target;
        console.log("On click stickyContainer ==> e.target.id: ", e.target.id)
        if (e.target.id == CHAT_LABEL || e.target.id == CHAT_COUNTER || e.target.className.includes(CHAT_BUTTON)) {
            console.log("when e.target.id == CHAT_LABEL || e.target.id == CHAT_COUNTER ==> e.target.id: ", e.target.id)
            sendEventMessage("", currentTimestamp, "COLLABORATE_ESSAY", "MOUSE_CLICK", subActionLabelMap["COLLABORATIVE_ESSAY_CHAT_OPEN"], "COLLABORATIVE_CHAT", "CHAT_OPEN", "CLICK", "CLICK:::"+e.target.id, e);
        }
    //     if (e.target.id == CHAT_CLOSE) {
    //         console.log("inside CHAT_CLOSE, e.target.id: ", e.target.id)
    //         sendEventMessage("", currentTimestamp, "COLLABORATE_ESSAY", "MOUSE_CLICK", subActionLabelMap["COLLABORATIVE_ESSAY_CHAT_CLOSE"], "COLLABORATIVE_CHAT", "CHAT_CLOSE", "CLICK", "CLICK:::"+e.target.id, e);
    // }
        if (e.target.id == CHAT_CLOSE) {
            sendEventMessage("", currentTimestamp, "COLLABORATE_ESSAY", "MOUSE_CLICK", subActionLabelMap["COLLABORATIVE_ESSAY_CHAT_CLOSE"], "CHAT_CLOSE", null, null, eventValue, e);
        }

    }, true)

     chatInputTextarea.addEventListener('paste', function (e) { //stickyContainer
        console.log("chat paste");
        let pasteText = e.clipboardData.getData("text");
        let currentTimestamp = getCurrentTimestamp();
        let eventValue = $.extend(true, {}, e);
        eventValue.innerWidth = collaborateWriteWindow.innerWidth;
        eventValue.innerHeight = collaborateWriteWindow.innerHeight;
        eventValue.clientX = eventValue.clientX + collapseCollaborateWriteElementXPosition + 1; // 1是collapseCollaborateWrite元素的border宽度

//         sendEventMessage("", currentTimestamp, "COLLABORATE_ESSAY", "PASTE_TEXT", subActionLabelMap["COLLABORATIVE_ESSAY_CHAT_PASTE"], "COLLABORATIVE_CHAT","COLLABORATIVE_CHAT_EDITOR","CHAT_PASTE_TEXT", "PASTE_TEXT:::" + pasteText, e);

        sendEventMessage("", currentTimestamp, "COLLABORATE_ESSAY", "PASTE_TEXT", subActionLabelMap["COLLABORATIVE_ESSAY_CHAT_PASTE"], "CHAT_PASTE_TEXT", "COLLABORATIVE_CHAT", "PASTE_TEXT:::" + pasteText,  eventValue, e);

    }, true)

    //let chatInputText = "";
    chatInputText = chatInputTextarea.value;
    chatInputTextarea.addEventListener('keydown', function (e) { //stickyContainer
        console.log("chat keyup>>>>",e);
        console.log("chatInputTextarea.value: ",chatInputTextarea.value)
        console.log("key.value: ",e.keyCode, e.shiftKey)
        let key = e.which;
//        console.log("event.shiftKey: ",event.shiftKey)
//        console.log("event.keycode: ",e.keyCode)
//        console.log("event.key: ",e.key)
//        console.log("event.which: ",key)
        if (e.key=="@"||(e.keyCode === 50 && e.shiftKey)){
            console.log("press @!")
            console.log("e:", e);
            console.log("chatInputTextarea selectionStart: ", chatInputTextarea.selectionStart);
            showDropdownDynamic(chatInputTextarea,availableCollaborativeChatAgents);

        }
        else{
            if (selectElement.value=="" && showSelection) {
                        hideCustomSelectContainer();
            }
        }
        if(key==13){
            /*Do something. 调用一些方法*/
            // debugger;
            //chatInputText = chatInputTextarea.value;
            console.log("chatInputText: ",chatInputText)
            gpt_requested = false;
            for (const gpt of multiAgent4CollaborativeChatConfig){
                console.log("gpt: ", gpt)
                gpt_name_len = gpt.agentDisplayName.length
                role_input = "@" + gpt.agentDisplayName
                console.log("role_input: ", role_input);
                actual_input = chatInputText.substring(0, gpt_name_len+1);
                console.log("actual_input: ", actual_input);
                if(actual_input==role_input){
                    console.log(actual_input, " requested");
                    let question = chatInputText.substring(gpt_name_len+1)
                    console.log("@GPT requested");
                    let colessay = getCollaborate();
                    let Data4GPT = {
                        question: question,
                        extraPrompt: "",
                        userId: userId,
                        courseId: currentCourseId,
                        essay: colessay,
                        questionId: "",
                        includeEssay: gpt.promptIncludeEssay,
                        chatgptRoleDescription: gpt.agentDescription,
                        chatgptRole: gpt.agentRole,
                        backgroundFileNameList: gpt.backgroundFileNameList,
                        chatgptParameters: gpt.chatgptParameters,
                        agentName: gpt.agentName,
                            }
                    gpt_requested = true;
                    $.ajax({
                        url: apiBaseUrl + "/chatgpt",
                        type: 'POST',
                        data: JSON.stringify(Data4GPT),
                        contentType: "application/json; charset=utf-8",
                        success: function(data, status) {
                            if (status === "success") {
                                if(data.data!=null){
                                    let resContent = data.data.chatgptAnswer;
                                    console.log("successful GPT response: ",data);
                                    if (resContent == "gpt-error") {
                                        resContent = "There is an error from Chatgpt, Please re-send your question.";
                                    }
                                    $.post(apiBaseUrl + "/collaborate-send-message",
                                        {padID: userEtherpadPadID,message:resContent,userEtherpadAuthorID});
                                }
                                else{
                                    console.log("/chatgpt response data is mull")
                                }

                            }
                        }
                    })
                    break;
                }
            }
            if (gpt_requested==false){

                let question = chatInputText;
                let Data4GPT = {
                    question: question,
                    userId: userId,
                    courseId: currentCourseId,
                    essay: getCollaborate(),
                    promptId: "",
                    includeEssay: chatgptPromptIncludeEssay,
                    chatgptRoleDescription: CollaborateGPTRoleDescription,
                    chatgptRole: chatgptRole,
                    backgroundFileNameList: chatgptBackgroundFileNameList,
                    chatgptParameters: chatgptParameters,
                    padId: userEtherpadPadID,
                    type: -1,
                    toolsLanguage: toolsLanguage
                }
                //$.post(apiBaseUrl + "/collaborate-write-openai", {padId: userEtherpadPadID, question: question, userId: userId, courseId: currentCourseId, essay: getCollaborate(), type: -1,chatgptParameters});
                $.ajax({
                    url: apiBaseUrl + "/collaborate-write-openai",
                    type: 'POST',
                    data: JSON.stringify(Data4GPT),
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function(data, status) {
                        if (status === "success") {
                                let gptresponse = data.data;
                                console.log("gptresponse: ",gptresponse)
                            }
                        }
                    })
            }


//            if(chatInputText.substring(0, 8) == "@GPT-all") {
//                let i = 1;
//                console.log("@GPT-all", i++);
//                let question = "please summarize your previous answers";
//                let Data4GPT = {
//                    question: question,
//                    userId: userId,
//                    courseId: currentCourseId,
//                    essay: getCollaborate(),
//                    promptId: "",
//                    includeEssay: chatgptPromptIncludeEssay,
//                    chatgptRoleDescription: CollaborateGPTRoleDescription,
//                    chatgptRole: chatgptRole,
//                    backgroundFileNameList: chatgptBackgroundFileNameList,
//                    chatgptParameters: chatgptParameters,
//                    padId:userEtherpadPadID,
//                    type:1
//                }
//                $.ajax({
//                    url: apiBaseUrl + "/collaborate-write-openai",
//                    type: 'POST',
//                    data: JSON.stringify(Data4GPT),
//                    contentType: "application/json; charset=utf-8",
//                    success: function(data, status) {
//                        if (status === "success") {
//                                //let gptresponse = data.data;
//                                console.log("gptresponse: ",data);
//                                let resContent = data.data.chatgptAnswer;
//                                if (resContent === "gpt-error") {
//                                    resContent = "There is an error from Chatgpt, Please re-send your question.";
//                                }
//                                $.post(apiBaseUrl + "/collaborate-send-message",
//                                {padID: userEtherpadPadID,message:resContent,userEtherpadAuthorID});
//
//                            }
//                        }
//                    })
//                //TODO 暂时去掉 openai 访问，需要重写
////                $.post(apiBaseUrl + "/collaborate-write-openai", {
////                padId: userEtherpadPadID, question: question, userId: userId, courseId: currentCourseId, essay: getCollaborate(), type: 1},
////                success: function(data, status) {
////                    // console.log("reAskChatgpt success");
////                    // console.log(data);
////                    let answer = data.data.chatgptAnswer;
////                    if (answer === "gpt-error") {
////                        answer = "There is an error from Chatgpt, Please re-send your question.";
////                    }
////                    console.log("answer")
////                    });
//            }else if(chatInputText.substring(0, 4) == "@GPT") {
//                    console.log("@GPT requested");
//                    let question = chatInputText.substring(4)
//                    console.log("question: ",question)
//                    let colessay = getCollaborate();
//                    let Data4GPT = {
//                        question: question,
//                        userId: userId,
//                        courseId: currentCourseId,
//                        essay: getCollaborate(),
//                        promptId: "",
//                        includeEssay: chatgptPromptIncludeEssay,
//                        chatgptRoleDescription: CollaborateGPTRoleDescription,
//                        chatgptRole: chatgptRole,
//                        backgroundFileNameList: chatgptBackgroundFileNameList,
//                        chatgptParameters: chatgptParameters,
//                        padId:userEtherpadPadID,
//                        type:0
//                    }
//                    console.log("essay: ",getCollaborate());
//                    //$.post(apiBaseUrl + "/collaborate-write-openai", {padId: userEtherpadPadID, question: question, userId: userId, courseId: currentCourseId, essay: getCollaborate(), type: -1});
//                    $.ajax({
//                        url: apiBaseUrl + "/collaborate-write-openai",
//                        type: 'POST',
//                        data: JSON.stringify(Data4GPT),
//                        contentType: "application/json; charset=utf-8",
//                        //traditional: true,
//                        success: function(data, status) {
//                            if (status === "success") {
//                                let resContent = data.data.chatgptAnswer;
//                                console.log("gptresponse: ",data);
//                                if (resContent === "gpt-error") {
//                                    resContent = "There is an error from Chatgpt, Please re-send your question.";
//                                }
//                                $.post(apiBaseUrl + "/collaborate-send-message",
//                                {padID: userEtherpadPadID,message:resContent,userEtherpadAuthorID});
//
//                            }
//                            }
//                        })
//            }
//            else {
//                let question = chatInputText;
//                let Data4GPT = {
//                    question: question,
//                    userId: userId,
//                    courseId: currentCourseId,
//                    essay: getCollaborate(),
//                    promptId: "",
//                    includeEssay: chatgptPromptIncludeEssay,
//                    chatgptRoleDescription: CollaborateGPTRoleDescription,
//                    chatgptRole: chatgptRole,
//                    backgroundFileNameList: chatgptBackgroundFileNameList,
//                    chatgptParameters: chatgptParameters,
//                    padId: userEtherpadPadID,
//                    type: -1
//
//                    //type: (typeof chatgptType === 'undefined' || chatgptType === null) ? "chat" : chatgptType,
//                }
//                //$.post(apiBaseUrl + "/collaborate-write-openai", {padId: userEtherpadPadID, question: question, userId: userId, courseId: currentCourseId, essay: getCollaborate(), type: -1,chatgptParameters});
//                $.ajax({
//                    url: apiBaseUrl + "/collaborate-write-openai",
//                    type: 'POST',
//                    data: JSON.stringify(Data4GPT),
//                    contentType: "application/json; charset=utf-8",
//                    dataType: 'json',
//                    success: function(data, status) {
//                        if (status === "success") {
//                                let gptresponse = data.data;
//                                console.log("gptresponse: ",gptresponse)
//                            }
//                        }
//                    })
//            }
        }
        chatInputText = chatInputTextarea.value;
        let currentTimestamp = getCurrentTimestamp();
        let eventValue = $.extend(true, {}, e);
        eventValue.innerWidth = collaborateWriteWindow.innerWidth;
        eventValue.innerHeight = collaborateWriteWindow.innerHeight;
        eventValue.clientX = eventValue.clientX + collapseCollaborateWriteElementXPosition + 1; // 1是collapseCollaborateWrite元素的border宽度
        sendEventMessage("", currentTimestamp, "COLLABORATE_ESSAY", "KEYBOARD_STROKE", null, "CHAT_WRITE", "KEY", "CHANGE_INPUT","KEY:::" + eventValue.key + "---" + eventValue.code, e);
    }, true)

    let chatTempEventValue = "";
    let chatTempInstantEvent = "";
    chatText.onmouseup = function(e) {
        // console.log("getSelection", ace_inner_window.getSelection())

        let selectedText = collaborateWriteWindow.getSelection().toString();
        if (selectedText.length == 0) {
            // 未选中文本
            // console.log("未选中文本")
            chatTempEventValue = "CURSOR_POSITION:::_" ; // + range.index
            chatTempInstantEvent = "FOCUS";
        }else {
            // 选中文本
            chatTempEventValue = "SELECTED_TEXT:::" + selectedText;
            chatTempInstantEvent = "SELECT_TEXT";
            // console.log("selectedText");
            // console.log(selectedText);
        }
        sendEventMessage("", getCurrentTimestamp(), "COLLABORATE_ESSAY", "MOUSE_CLICK", null, "COLLABORATIVE_CHAT_CONTENT", chatTempInstantEvent, chatTempEventValue,  null);
    }
    }







    // TODO 此处需要重写
    /*setInterval(function() {
        if (iframeMouseMoveData.length !== 0 || iframeMouseWheelData.length != 0) {
            $.post(apiBaseUrl + "/trace-extra", {
                userId: userId,
                saveTime: getCurrentTimestamp(),
                url: getCurrentUrl(),
                username: username == null ? getUsername() : username,
                firstname: firstname == null ? getFirstname() : firstname,

                lastname: lastname == null ? getLastname() : lastname,
                source: "EXTRA",
                mousemoveData: iframeMouseMoveData,
                mousewheelData: iframeMouseWheelData,

                windowInnerWidth: collaborateWriteWindow.innerWidth,
                windowInnerHeight: collaborateWriteWindow.innerHeight,
                screenWidth: window.screen.width,
                screenHeight: window.screen.height,
                // eventValue: "NEXT_PAGE_URL:::" + e.target.href
            });
            iframeMouseMoveData = [];
            iframeMouseWheelData = [];
        }
    }, 5000); //离开页面时候也需要执行*/
    // offtask 应该是由主页面的事件来监听
    // 离开页面保存内容 需要考虑iframe是否加载完成 可以通过etherpad后端实现
}


let collaborateToolUseLength = 0;

showCollaborateWriteBtn.onclick = function (e) {
    console.log("showCollaborateWriteBtn clicked");
    stopEventPropagation(e);
    if (useAnnotationTool) hideAnnotationToolbox(); // 隐藏annotation toolbox，当点击其他按钮时候
    collapseCollaborateWrite.classList.toggle("in-tools");
    toolsAndEssayToggle(collapseCollaborateWrite);
    //TODO 此处event 需要重新洗

//     if ((useAnnotationTool && collapseSearch.classList.contains("in-tools")) ||
//         (useScaffoldTool && collapseScaffolds.classList.contains("in-tools")) ||
//         (usePlannerTool && collapsePlanner2.classList.contains("in-tools")) ||
//         (useChecklistTool && collapseChecklist.classList.contains("in-tools")) ||
//         (useOpenaiTool && collapseOpenai.classList.contains("in-tools")) ||
//         (useDictionaryTool && collapseDictionary.classList.contains("in-tools")) ||
//         (useTeacherChat && collapseTeacherchat.classList.contains("in-tools"))
//     ) {
//         if (collapseCollaborateWrite.classList.contains("in-tools")) {
//             collapseCollaborateWrite.classList.remove("in-tools");
//         }
//         collapseCollaborateWrite.classList.toggle('in-tools-move-left');
//     } else {
//         if (collapseCollaborateWrite.classList.contains('in-tools-move-left')) {
//             collapseCollaborateWrite.classList.toggle('in-tools-move-left');
//         } else {
//             collapseCollaborateWrite.classList.toggle('in-tools');
//         }
//     }


    let instantEvent = "";
    let eventValue = "";
    let saveTime = getCurrentTimestamp();
    if (collapseCollaborateWrite.classList.contains("in-tools")) {
        instantEvent = "OPEN";
        eventValue = "START_USE_TOOL:::" + saveTime;
        collaborateToolUseLength = saveTime;

        // if (window.frames["epframecollapseCollaborateWrite"]==null){
        //     initializePad(user)
        // }

    } else {
        instantEvent = "CLOSE";
        collaborateToolUseLength = saveTime - collaborateToolUseLength;
        eventValue = "TOOL_USE_LENGTH:::" + collaborateToolUseLength;
    }
    //打开或关闭Essay 工具
    sendEventMessage("", saveTime, "COLLABORATE_ESSAY", "MOUSE_CLICK",subActionLabelMap["COLLABORATIVE_ESSAY_"+instantEvent], "COLLABORATIVE_ESSAY", "COLLABORATE_WRITE_BTN", instantEvent, eventValue, e);

    // prevent the elements being repeatedly attached with listerner
    // const marker = document.querySelector("#etherpadCreated");
    // if (!marker) {
    //     const div = document.createElement("div");
    //     div.id = "etherpadCreated"; // Acts as a flag
    //     div.setAttribute("data-script-executed", "true");
    //     document.body.appendChild(div);
    //     // Your script logic here
    //     console.log("Script executed only once");
    //     setupCollaborateWriteMain("collaborateWriteToolbarMain", "collaborateWriteEditorMain");
    // }

    // if(isIframeLoaded){
    //     setupCollaborateWriteMain("collaborateWriteToolbarMain", "collaborateWriteEditorMain");
    // }
    // else{
    //     alert("please wait for etherpad ready and try again");
    // }

    // if (!ready_bar || !ready_editor || !ready_chat){
    //     setupCollaborateWriteMain("collaborateWriteToolbarMain", "collaborateWriteEditorMain");
    // }



    // if (window.frames["epframecollapseCollaborateWrite"]==null){
    //     setupCollaborateWriteMain("collaborateWriteToolbarMain", "collaborateWriteEditorMain");
    //     // if (window.frames["epframecollapseCollaborateWrite"].frames["ace_outer"].frames["ace_inner"]){
    //     //     collaborateInnerBody = window.frames["epframecollapseCollaborateWrite"].frames["ace_outer"].frames["ace_inner"].document.querySelector("body");
    //     // }
    // }
    // else{
    //     alert("Need to start etherpad service first!");
    // }

};