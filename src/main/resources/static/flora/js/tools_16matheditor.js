let mathLiveScript;
function render() {
    // mathLiveScript = $('<script src="/flora/js/mathlive/dist/mathlive.min.js"></script>');

    //$("head").append(mathLiveCss);
    // $("body").append(mathLiveScript);
    let collaborateMathToolHtml =`   <!-- math sidebar -->
          <div id="collapseMathEditor" class="my-horizontal-collapse-tools math-editor">
          <div class="card card-body" style="height:100%; min-height: 200px;">
          <h3 class="mb-2"><span>${mathTitle}</span></h3>
<!--              <math-field id="formula"></math-field>-->
            <div id="textEditor" contenteditable="true" 
                style="
                min-height: 150px; 
                max-height: 300px; 
                width: 100%; 
                border: 1px solid #ccc; 
                padding: 10px; 
                margin-top: 10px; 
                overflow: hidden; 
                word-wrap: break-word; 
                white-space: normal; 
                box-sizing: border-box;
                text-align: left;">
                You can type normal text here. To add math formulas, click the button below.
            </div>
    <!-- Button to insert MathLive formula -->
    <button id="insertMath" style="margin-top: 10px;">Insert Math</button>
          </div>
          </div>`;
    $("body").append(collaborateMathToolHtml);

// Include MathLive styles and scripts
    //let mathLiveCss = $('<link rel="stylesheet" href="node_modules/mathlive/dist/mathlive.min.css">');
//<h2>Rendered Output:</h2>
//<div id="output"></div>

    // Initialize MathLive and set up event listener for input changes
}
render();



let mathFieldCounter = 0;

// Function to generate a unique ID for each MathLive field
function generateMathFieldId() {
    mathFieldCounter++;
    return "mathFormula" + mathFieldCounter;
}

function handleBlur(ev) {
    console.log("blur detected!!!");
    const mathField = ev.target;
    mathField.setAttribute('contenteditable', 'false');
    mathField.setAttribute('read-only', true);
    mathField.style.border = 'none';  // Remove border
    mathField.style.outline = 'none'; // Remove outline
    mathField.style.backgroundColor = 'transparent';
    console.log("ev.target.value: ", mathField.value);

    if (mathField.value=='\\(\\)'){
        console.log("mathField.value: ", mathField.value)
        const parentElement = mathField.parentElement;

        console.log("parentElement: ", parentElement);

        // If the parent element is null, we should stop here (it shouldn't happen, but let's add a check)
        if (!parentElement) {
            console.error('Parent element is null. Cannot replace math-field.');
            return;
        }
        parentElement.remove();
        // Remove the current math-field element from the DOM
        mathField.remove();
    }
}

// Function to handle the 'Enter' key press inside the MathLive editor
function handleKeyPress(ev) {
    console.log("KeyPress detected!!!")
    console.log("ev.ev.target: ", ev.target);
    if (ev.key === 'Enter') {
        console.log("ev.key: ", ev.key);
        const mathField = ev.target;
        mathField.setAttribute('contenteditable', 'false');
        mathField.setAttribute('read-only', true);
        mathField.style.border = 'none';  // Remove border
        mathField.style.outline = 'none'; // Remove outline
        mathField.style.backgroundColor = 'transparent';

        const parentElement = mathField.parentElement;
        console.log("parentElement: ", parentElement);

        if (mathField.value=='\\(\\)'){
            console.log("mathField.value: ", mathField.value)
            const parentElement = mathField.parentElement;
            console.log("parentElement: ", parentElement);

            // If the parent element is null, we should stop here (it shouldn't happen, but let's add a check)
            if (!parentElement) {
                console.error('Parent element is null. Cannot replace math-field.');
                mathField.remove();
                return;
            }
            parentElement.remove();
            // Remove the current math-field element from the DOM
            mathField.remove();
        }
    }
    console.log("ev.target.value: ", ev.target.value)
    sendEventMessage("", getCurrentTimestamp(), "Math", "MOUSE_CLICK", subActionLabelMap["CHATGPT_CLICK"], "CHATGPT", null, "CLICK", "", ev);
}

function convertToFormula(mf) {
    // Get the LaTeX formula from MathLive
    const latex = mf.getValue('latex');  // Get LaTeX value
    const mathElement = document.createElement('span');  // Create a new span for the formula

    // Set the LaTeX formula inside the span element (rendering it)
    mathElement.innerHTML = `\\(${latex}\\)`;  // Use LaTeX rendering
    mathElement.innerHTML = svg;

    // Replace the MathLive field with the rendered formula
    mf.parentNode.replaceChild(mathElement, mf);
}

// Declare an array to store MathLive fields
let mathFields = [];

// Get the text editor and insert button
const textEditor = document.getElementById('textEditor');
const insertMathButton = document.getElementById('insertMath');

// Function to insert a MathLive editor into the text editor
function insertMathEditor(content) {

    const selection = window.getSelection();
    const range = selection.getRangeAt(0);

    const isEditable = textEditor.contains(range.commonAncestorContainer);
    if (!isEditable) {
        return;
    }
    console.log("range: ", range, range.startOffset);

    // Create a new container for the MathLive field
    const mathFieldContainer = document.createElement('span');
    mathFieldContainer.setAttribute('contenteditable', 'false'); // Make it uneditable initially
    mathFieldContainer.style.display = 'inline-block';

    const uniqueId = generateMathFieldId();

    const mathFieldElement = document.createElement('math-field');
    mathFieldElement.addEventListener('mount', () => {
        mathFieldElement.smartFence = true;
        mathFieldElement.virtualKeyboardPolicy = 'auto';
    });
    mathFieldElement.setAttribute('id', uniqueId);
    mathFieldElement.setAttribute('contenteditable', 'true');
    //mathFieldElement.innerHTML = `\\(${content}\\)`;  // Default formula or empty
    mathFieldElement.value = content || '\\(\\)';


    // Append the math-field element to the container
    mathFieldContainer.appendChild(mathFieldElement);

    // Insert the MathLive field into the selected area (or at the cursor if no selection)
    range.deleteContents(); // Delete the current selection (if any)
    range.insertNode(mathFieldContainer); // Insert the new math field

    // Optionally, focus on the newly inserted math field for editing
    mathFieldElement.focus();

    mathFieldElement.addEventListener('blur', handleBlur);

    // Event listener for 'Enter' key press
    mathFieldElement.addEventListener('keydown', handleKeyPress);

    mathFieldElement.addEventListener('click', toggleEditableState);

    mathFieldElement.addEventListener("input",(ev) => {
            console.log("input detected!!!==>", mathFieldElement.value);
            if (mathFieldElement.value==='\\(\\)' || mathFieldElement.value===''){
                console.log("mathField.value: ", mathFieldElement.value)
                const parentElement = mathFieldElement.parentElement;
                console.log("parentElement: ", parentElement);

                // If the parent element is null, we should stop here (it shouldn't happen, but let's add a check)
                if (!parentElement) {
                    mathFieldElement.remove();
                    console.log('Parent element is null. Cannot replace math-field.');
                    return;
                }
                parentElement.remove();
                // Remove the current math-field element from the DOM
                mathFieldElement.remove();
            }
            sendEventMessage("", getCurrentTimestamp(), "Math", "MOUSE_CLICK", subActionLabelMap["CHATGPT_CLICK"], "CHATGPT", null, "CLICK", "", ev);
        }
    );


    //
    // // Now, add event listener to handle finishing input
    // mathFieldElement.addEventListener('beforeinput', (ev) => {
    //     if (ev.inputType === 'insertLineBreak') {
    //         // After pressing "Enter", make the math field non-editable
    //         mathFieldElement.setAttribute('contenteditable', 'false');  // Disable editing
    //
    //         // Convert the math field into a rendered formula (non-editable)
    //         const formulaHtml = mathFieldInstance.getValue('latex'); // Get LaTeX formula
    //         const renderedFormula = document.createElement('span');
    //         renderedFormula.innerHTML = `\\(${formulaHtml}\\)`; // Convert LaTeX to inline math formula
    //
    //         // Replace the math field with the rendered formula
    //         mathFieldContainer.replaceChild(renderedFormula, mathFieldElement);
    //
    //         ev.preventDefault(); // Prevent the default behavior (inserting a line break)
    //     }
    // });
    //
    // // Add focus and blur listeners to track active math field
    // mathFieldElement.addEventListener('focus', handleMathFieldFocusBlur);
    // mathFieldElement.addEventListener('blur', handleMathFieldFocusBlur);

}

// Event listener for the insert MathLive button
insertMathButton.addEventListener('click', (event) => {
    insertMathEditor("");
    sendEventMessage("", getCurrentTimestamp(), "MATH", "MOUSE_CLICK", subActionLabelMap["CHATGPT_CLICK"], "CHATGPT", null, "CLICK", "", event);

});


function toggleEditableState(event) {
    console.log("toggleEditableState!!!!!");
    const mathFieldElement = event.target;

    // Check if the math-field is read-only
    if (mathFieldElement.hasAttribute('read-only')) {
        // If it has the "read-only" attribute, make it editable by replacing it
        //const formulaText = mathFieldElement.innerHTML;  // Save the current LaTeX formula (as innerHTML or LaTeX)

        const formulaText_latex = mathFieldElement.getValue("latex");
        // // Get the parent container before removing the math-field
        const parentElement = mathFieldElement.parentElement;

        console.log("formulaText: ", formulaText_latex);

        // If the parent element is null, we should stop here (it shouldn't happen, but let's add a check)
        if (!parentElement) {
            console.error('Parent element is null. Cannot replace math-field.');
            return;
        }
        parentElement.remove();
        // Remove the current math-field element from the DOM
        mathFieldElement.remove();

        insertMathEditor(formulaText_latex);

        // // Create a new math-field and restore the formula
        // const newMathFieldElement = document.createElement('math-field');
        // newMathFieldElement.setAttribute('contenteditable', 'true');
        // newMathFieldElement.setAttribute('id', generateMathFieldId()); // Give it a new unique ID
        // newMathFieldElement.innerHTML = `\\(${formulaText_latex}\\)`; ; // Optionally, set the formula to the previous LaTeX
        //
        // // Insert the new math-field into the DOM at the same place
        // parentElement.appendChild(newMathFieldElement);
        //
        // // Focus on the new math-field to allow editing
        // newMathFieldElement.focus();

        //console.log(`Formula with ID ${newMathFieldElement.id} is now editable.`);
    } else {
        console.log("!!!!");
        // If it's already editable, do nothing (just leave it as is)
        //console.log(`Formula with ID ${mathFieldElement.id} is already editable.`);
    }
}


// Handle clicks on MathLive formulas to make them editable again
textEditor.addEventListener('click', (event) => {
    console.log("textEditor clicked!!!!")
    console.log("textEditor clicked on ",event.target);
    // Check if the clicked element is a MathLive formula (contenteditable span)
    if (event.target && event.target.getAttribute('contenteditable') === 'false') {

        const clickedFormula = event.target;
        console.log("textEditor clicked on ",clickedFormula);
        clickedFormula.setAttribute('contenteditable', 'true'); // Make the formula editable
        const mathField = mathFields.find(item => item.container === clickedFormula).field;
        mathField.focus(); // Focus on the MathLive editor
        sendEventMessage("", getCurrentTimestamp(), "MATH", "MOUSE_CLICK", subActionLabelMap["CHATGPT_CLICK"], "CHATGPT", null, "CLICK", "", event);

    }
});


textEditor.addEventListener('input', (event) => {
    console.log("textEditor input!!!!")
    console.log("textEditor input on ",event.target);
    // Check if the clicked element is a MathLive formula (contenteditable span)
    if (event.target && event.target.getAttribute('contenteditable') === 'false') {

        const clickedFormula = event.target;
        console.log("textEditor input on ",clickedFormula);
        clickedFormula.setAttribute('contenteditable', 'true'); // Make the formula editable
        const mathField = mathFields.find(item => item.container === clickedFormula).field;
        mathField.focus(); // Focus on the MathLive editor
        sendEventMessage("", getCurrentTimestamp(), "MATH", "MOUSE_CLICK", subActionLabelMap["CHATGPT_CLICK"], "CHATGPT", null, "CLICK", "", event);
    }
    extractContent();
});

function setupMathEditor(){

    mathLiveScript.on("load", function() {
            const mathField = document.querySelector('math-field');

            // Update output on change
            mathField.addEventListener('input', () => {
                const outputDiv = document.getElementById('output');
                outputDiv.innerHTML = mathField.getValue();
            });
        });


    document.getElementById('formula').addEventListener('input',(ev) => {
      // `ev.target` is an instance of `MathfieldElement`
      console.log(ev.target.value);
    });
}

function extractContent() {
    // Get the parent div containing all content
    var editor = document.getElementById('textEditor');

    // Initialize an array to store each line's content
    var lines = [];
    var line_number = 0;
    var number_character = 0;
    var lines_text = {};
    var lines_math = {};

    // Temporary variable to hold the current line's content
    var currentLine = { text: [], math: [] };

    // Iterate over all child nodes inside the editor (including text nodes, divs, and spans)
    editor.childNodes.forEach(function (node) {

        // Check if the node is a <div>, which indicates a new line
        if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'DIV') {
            line_number = line_number + 1;
            number_character = 0;
            // If there's any existing content in currentLine, push it to lines
            if (currentLine.text.length || currentLine.math.length) {
                console.log("currentLine inside DIV not empty: ", currentLine);
            }
            node.childNodes.forEach(function (child) {
                // Check if the child is a text node
                if (child.nodeType === Node.TEXT_NODE) {
                    var textContent = child.textContent.trim();
                    number_character += textContent.length;
                    console.log("textContent inside DIV not empty: ", textContent);
                    currentLine.text.push(textContent);
                    lines_text[line_number] ||= "";  // If lines_text[line_number] is undefined, initialize it as an empty string
                    lines_text[line_number] += textContent;  // Append textContent to the existing line

                    // if (textContent) {
                    //     currentLine.text.push(textContent); // Add normal text to current line
                    //     console.log("child.textContent.trim(): ", child.textContent.trim());
                    // }
                }
                // Check if the child is a <span> (could contain a math field)
                else if (child.nodeType === Node.ELEMENT_NODE && child.tagName === 'SPAN') {
                    var mathField = child.querySelector('math-field');
                    console.log("mathField inside DIV not empty: ", mathField);
                    currentLine.math.push(mathField.getValue("latex"));
                    lines_math[line_number] ||= {};
                    lines_math[line_number][number_character] = mathField.value;
                    // if (mathField) {
                    //     currentLine.math.push(mathField.textContent.trim()); // Add math formula content
                    //     console.log("child.textContent.trim(): ", mathField.textContent.trim());
                    // }
                }
                lines.push(currentLine);
            });
        }
        // Check if the node is a text node
        else if (node.nodeType === Node.TEXT_NODE) {
            var textContent = node.textContent.trim();
            console.log("textContent not empty: ", textContent);
            if (textContent) {
                number_character += textContent.length;
                currentLine.text.push(textContent); // Add normal text to current line
                // Initialize the line if it doesn't exist, then append the content
                lines_text[line_number] ||= "";  // If lines_text[line_number] is undefined, initialize it as an empty string
                lines_text[line_number] += textContent;  // Append textContent to the existing line

            }
        }
        // Check if the node is a <span> (could contain a math field)
        else if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'SPAN') {
            var mathField = node.querySelector('math-field');
            console.log("mathField not empty: ", mathField);
            currentLine.math.push(mathField.value);
            lines_math[line_number] ||= {};
            lines_math[line_number][number_character] = mathField.getValue("latex");

            // if (mathField) {
            //     currentLine.math.push(mathField.textContent.trim()); // Add math formula content
            // }
        }
    });

    // After the loop, push the last line content if any
    if (currentLine.text.length || currentLine.math.length) {
        lines.push(currentLine);
    }

    // Display extracted content for each line in the console
    console.log('Lines Content:', lines);
    console.log("lines_text: ", lines_text);
    console.log("lines_math: ", lines_math);
}




let collapseMathEditor = document.querySelector("#collapseMathEditor");
let showMathEditorBtn = document.querySelector("#showMathEditorBtn");

showMathEditorBtn.onclick = function (e){
    e.stopPropagation();
    console.log("showMathEditorBtn.onclick!")
    if (useAnnotationTool) hideAnnotationToolbox(); // 隐藏annotation toolbox，当点击其他按钮时候
    collapseMathEditor.classList.toggle("in-tools");
    console.log("collapseMathEditor: ", collapseMathEditor)
    //collapseMathEditor.style.display = collapseMathEditor.style.display === 'none' ? 'block' : 'none';

    //setupMathEditor();

    console.log("collapseMathEditor: ", collapseMathEditor)
}