function render() {
    let zoteroNotesToolHtml = `<!-- ZoteroNotes 侧边栏 -->
        <div id="collapseZoteroNotes" class="my-horizontal-collapse-tools my-zoteronotes">
        <div class="card card-body">
        <h3 class="mt-2 mb-2" ><span>${gptScaffoldingTitle}</span> <button type="button" class="btn btn-close" style="position:absolute; right:20px;" aria-label="Close" id="closeZoteroNotesBtn"></button></h3>
        <div id="jsmind_container" class="my-jsmind-style" style="width: 100%; max-height: 45vh"></div>
        <button id="saveZoteroNoteBtn" class="btn btn-primary" style="margin-top: 10px;">Save</button>
<!--        <div id="zoteroNotesModal" class="modal" style="display:none;"></div>-->
        </div>
        </div>`;
    $("body").append(zoteroNotesToolHtml);
}

render();

let showZoteroNotesBtn = document.querySelector("#showZoteroNotesBtn");
let collapseZoteroNotes = document.querySelector("#collapseZoteroNotes");


function setupZoteroNotesTool() {
    const mind = {
        "meta": {
            "name": "jsMind-demo",
            "author": "hizzgdev@163.com",
            "version": "0.2"
        },
        "format": "node_tree",
        "data": {
            "id": "root",
            "topic": "jsMind",
            "children": [
                {
                    "id": "easy",
                    "topic": "Easy",
                    "direction": "left",
                    "children": [
                        {"id": "easy1", "topic": "Easy to show"},
                        {"id": "easy2", "topic": "Easy to edit"}
                    ]
                },
                {
                    "id": "open",
                    "topic": "Open Source",
                    "direction": "right",
                    "children": [
                        {"id": "open1", "topic": "on GitHub"},
                        {"id": "open2", "topic": "BSD License"}
                    ]
                }
            ]
        }
    };
    const options = {
        container: 'jsmind_container',
        editable: true,
        theme: 'orange'
    };

    const jm = new jsMind(options);
    console.log("ZoteroNotes tool loaded");

    let selected_node_id = null;
    let element_want_to_remove = null;
    let savedMindData = null; // 用于保存思维导图状态

    // Function to handle node removal
    const handleNodeRemoval = () => {
        if (element_want_to_remove) {
            const node = jm.get_node(element_want_to_remove);
            if (node.children && node.children.length > 0) {
                alert('Cannot remove a node that has sub-nodes');
            } else {
                jm.remove_node(element_want_to_remove);
                element_want_to_remove = null;
                selected_node_id = null; // Reset selected_node_id after removal
            }
        }
    };
    // Add click event listener to jsmind nodes to set element_want_to_remove and selected_node_id
    document.getElementById('jsmind_container').addEventListener('click', (event) => {
        const targetNodeId = event.target.getAttribute('nodeid');
        if (targetNodeId) {
            element_want_to_remove = targetNodeId;
            selected_node_id = targetNodeId;
            console.log("Element to remove set to:", element_want_to_remove);
            console.log("Selected node set to:", selected_node_id);
        }
    });

    // Function to add a new child node
    const add_node = () => {
        if (selected_node_id) {
            const new_node_id = jsMind.util.uuid.newid(); // 生成一个唯一ID
            jm.add_node(selected_node_id, new_node_id, 'New Node');
            console.log("New node added under:", selected_node_id);
        } else {
            console.log("No node selected to add a child to.");
        }
    };

    // Add keyboard event listener to jsmind container for adding and removing nodes
    document.getElementById('jsmind_container').addEventListener('keydown', (event) => {
        if (event.key === 'Tab') {
            add_node();
            event.preventDefault(); // 阻止默认行为
        } else if (event.key === 'Delete' || event.key === 'Backspace') {
            handleNodeRemoval();
            event.preventDefault(); // 阻止默认行为
        }
    });

    // Ensure the jsmind container is focusable
    const jsmindContainer = document.getElementById('jsmind_container');
    jsmindContainer.tabIndex = 0; // Make the container focusable
    jsmindContainer.focus(); // Set focus to the container

    // 显示/隐藏弹出窗口并初始化 jsMind
    $("#showZoteroNotesBtn").on("click", function () {
        const zoteroNotesModal = $("#zoteroNotesModal");

        if (zoteroNotesModal.is(":visible")) {
            zoteroNotesModal.hide();
        } else {
            zoteroNotesModal.show();
            if (savedMindData) {
                jm.show(savedMindData); // 加载保存的思维导图状态
            } else {
                jm.show(mind); // 初始化新的思维导图
            }
            console.log("jsMind initialized:", jm);
        }
    });

    // 保存笔记按钮事件监听
    $("#saveZoteroNoteBtn").on("click", function () {
        savedMindData = jm.get_data(); // 保存当前的思维导图状态
        console.log("Mind data saved:", savedMindData);
    });

    // 关闭弹出窗口
    $("#closeZoteroNotesBtn").on("click", function () {
        $("#collapseZoteroNotes").removeClass("in-tools");
    });
}

showZoteroNotesBtn.onclick = function (e) {
    stopEventPropagation(e);
    if (useAnnotationTool) hideAnnotationToolbox(); // 隐藏annotation toolbox，当点击其他按钮时候

    collapseZoteroNotes.classList.toggle("in-tools");
    // toolsAndEssayToggle(collapseZoteroNotes);
};

function loadZoteroNotes() {
    // 假设从服务器或本地存储加载笔记
    let savedNotes = ["Sample note 1", "Sample note 2"];

    savedNotes.forEach(note => {
        $("#notesContainer").append(`<p>${note}</p>`);
    });
}