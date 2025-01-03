let mathLiveScript;
function render() {
    mathLiveScript = $('<script src="/flora/js/mathlive/dist/mathlive.min.js"></script>');

    //$("head").append(mathLiveCss);
    $("body").append(mathLiveScript);
    let collaborateMathToolHtml =`   <!-- math sidebar -->
          <div id="collapseMathEditor" class="my-horizontal-collapse-tools math-editor">
          <div class="card card-body" style="height:100%; min-height: 200px;">
          <h3 class="mb-2"><span>${mathTitle}</span></h3>
<!--              <math-field id="formula"></math-field>-->
            <div id="textEditor" contenteditable="true" style="min-height: 150px; border: 1px solid #ccc; padding: 10px; margin-top: 10px;">
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
    const mathField = ev.target;
    mathField.setAttribute('contenteditable', 'false');
    mathField.setAttribute('read-only', true);
    mathField.style.border = 'none';  // Remove border
    mathField.style.outline = 'none'; // Remove outline
    mathField.style.backgroundColor = 'transparent';
}

// Function to handle the 'Enter' key press inside the MathLive editor
function handleKeyPress(ev) {
    if (ev.key === 'Enter') {
        const mathField = ev.target;
        mathField.setAttribute('contenteditable', 'false');
        mathField.setAttribute('read-only', true);
        mathField.style.border = 'none';  // Remove border
        mathField.style.outline = 'none'; // Remove outline
        mathField.style.backgroundColor = 'transparent';
    }
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

    // Create a new container for the MathLive field
    const mathFieldContainer = document.createElement('span');
    mathFieldContainer.setAttribute('contenteditable', 'false'); // Make it uneditable initially
    mathFieldContainer.style.display = 'inline-block';

    const uniqueId = generateMathFieldId();

    const mathFieldElement = document.createElement('math-field');
    mathFieldElement.setAttribute('id', uniqueId);
    mathFieldElement.setAttribute('contenteditable', 'true');
    mathFieldElement.innerHTML = `\\(${content}\\)`;  // Default formula or empty

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
insertMathButton.addEventListener('click', () => {
    insertMathEditor("");
});


function toggleEditableState(event) {
    const mathFieldElement = event.target;

    // Check if the math-field is read-only
    if (mathFieldElement.hasAttribute('read-only')) {
        // If it has the "read-only" attribute, make it editable by replacing it
        //const formulaText = mathFieldElement.innerHTML;  // Save the current LaTeX formula (as innerHTML or LaTeX)
        const formulaText_latex = mathFieldElement.getValue("latex");
        // Get the parent container before removing the math-field
        const parentElement = mathFieldElement.parentElement;

        console.log("formulaText: ", formulaText_latex);

        // If the parent element is null, we should stop here (it shouldn't happen, but let's add a check)
        if (!parentElement) {
            console.error('Parent element is null. Cannot replace math-field.');
            return;
        }
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
        // If it's already editable, do nothing (just leave it as is)
        //console.log(`Formula with ID ${mathFieldElement.id} is already editable.`);
    }
}


// Handle clicks on MathLive formulas to make them editable again
textEditor.addEventListener('click', (event) => {
    // Check if the clicked element is a MathLive formula (contenteditable span)
    if (event.target && event.target.getAttribute('contenteditable') === 'false') {
        const clickedFormula = event.target;
        clickedFormula.setAttribute('contenteditable', 'true'); // Make the formula editable
        const mathField = mathFields.find(item => item.container === clickedFormula).field;
        mathField.focus(); // Focus on the MathLive editor
    }
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