

const lang = {
    zh: {
        'annotation-notes-title': '笔记面板',
        'annotation-write-note-placeholder': '在这里写笔记...',
        'annotation-tag-placeholder': '输入新标签并按回车...',
        'annotation-note-save-btn-text': '保存',
        'annotation-note-cancel-btn-text': '取消',
        'annotation-search-btn-text': '搜索',
        'annotation-search-panel-input-placeholder': '输入关键字搜索...',

        'scaffolding-title': '指示面板',
        'scaffolding-create-checklist-btn-text': '创建清单',
        'scaffolding-edit-checklist-btn-text': '编辑',
        'scaffolding-unread-message-text': '未读消息',
        'gpt-scaffolding-title': '指示面板',

        'planner-title': '计划工具',
        'planner-learning-strategy-select-label-text': '1. 请为你的学习策略制定计划：',
        'planner-learning-strategy-select-option1-text': '选一个策略',
        'planner-learning-strategy-select-customise-option-text': '用你自己的策略',
        'planner-add-more-customise-strategy-btn-text': '添加更多策略',
        'planner-customise-option-hint-textarea-placeholder': '请解释为什么你设计这个计划？',
        'planner-next-btn-text': '下一步',

        'planner-display-plan-title': '我的学习计划',
        'planner-display-overall-strategy-label': '整体策略：',
        'planner-display-time-allocation-label': '时间分配：',
        'planner-display-writing-strategy-label': '写作策略：',
        'planner-display-reading-strategy-label': '阅读策略：',
        'planner-customise-plan-reason-placeholder': '（可选）',

        'essay-title': '作文写作工具',
        'essay-save-btn-text': '保存作文',
        'essay-writing-placeholder': '在这里写作文...',
        'essay-show-word-count-btn-text': '显示字数',
        "essay-save-toast-text": "你的文章已保存!",

        'dictionary-title': '词典工具',
        'dictionary-send-btn-text': '发送',
        'dictionary-panel-input-placeholder': '请输入一个搜索词...',

        'checklist-title': '清单工具',
        'checklist-basic-panel-title': '基本的',
        'checklist-academic-panel-title': '学术的',
        'checklist-originality-panel-title': '原创性',
        'checklist-integration-panel-title': '整合与阐述',
        'checklist-analyse-btn-text': '分析',

        'chatgpt-title': 'ChatGPT聊天工具',
        'chatgpt-send-btn-text': '发送',
        'chatgpt-panel-input-placeholder': '问一个问题...',

        'chatteacher-title': '询问老师工具',
        'chatteacher-panel-input-placeholder': '问一个问题...',
        'chatteacher-connect-server-status-text': '连接服务器状态',
        'chatteacher-teacher-online-status-text': '教师在线状态',
        'chatteacher-send-btn-text': '发送',

        "chatgpt-role-description": "你是一个乐于助人的助手，请根据提供的文本回答问题。",
        "gpt-scaffold-need-check-srl-prompt-CMTR2": "我们有一名学生目前正在做这个学习任务。截止学习过程的第14分钟，其他在这个任务中表现良好的学生不断检查任务说明和评分标准。而该学生却不是这样。因此，请根据上面提供的所有信息(包含任务要求、打分标准和阅读材料)，以及并考虑到这位特定学生的学习情况，为学生提供段落形式(不要使用项目符号和编号列表)的反馈意见，指导其如何定期检查任务说明和打分标准直到这个写作过程的结束。",
        "gpt-scaffold-need-check-srl-prompt-OR2": "我们有一名学生目前正在做这个学习任务。截止学习过程的第21分钟，其他在这个任务中表现良好的学生已经开始在他们的作文中包含一些阅读材料中的信息。但这名学生似乎没有这样做。因此，请根据上面提供了的所有信息(包含任务要求、打分标准和阅读材料)，并考虑到这位特定学生的学习情况，为学生提供段落形式(不要使用项目符号和编号列表)的反馈意见，指导其如何根据任务要求将一些阅读材料中的信息包含到他们作文草稿中。",
        "gpt-scaffold-need-check-srl-prompt-OT2": "我们有一名学生目前正在做这个学习任务。截止学习过程的第28分钟，这个任务中表现良好的其他学生已经开始根据阅读材料添加新颖信息且用自己的语言表达。而该学生却不是这样。因此，请根据上面提供了的所有信息(包含任务要求、打分标准和阅读材料)，并考虑到这位特定学生的学习情况，为学生提供段落形式(不要使用项目符号和编号列表)的反馈意见，告诉其如何扩展他们从阅读材料中使用的信息。该学生应该用自己的语言来做到这一点。",
        "gpt-scaffold-user-take-pre-study-prompt": "该学生参与过先前的研究，所以其对任务有一定了解。",
        "gpt-scaffold-isdimu-prompt-0":"该学生对可用于促进学习的各种策略或技巧有较高的理解水平。",
        "gpt-scaffold-isdimu-prompt-16":"该学生对可用于促进学习的各种策略或技巧有较低的理解水平。",
        "gpt-scaffold-isdimu-prompt-32":"这个学生看起来对可用于促进学习的各种策略或技巧有一些了解。",
        "gpt-scaffold-pretest-grades-prompt-0": "该学生在人工智能和医疗领域人工智能方面有很高知识水平。",
        "gpt-scaffold-pretest-grades-prompt-5": "该学生在人工智能和医疗领域人工智能方面有较低知识水平。",
        "gpt-scaffold-pretest-grades-prompt-10": "该学生在人工智能和医疗领域人工智能方面有中等知识水平。",

        "gpt-scaffold-test-isdimu-name": "活动3：学习策略中的知识",
        "gpt-scaffold-pretest-name": "活动2：知识测试 - 医疗中的人工智能",
        "gpt-scaffold-check-take-previous-study-name": "活动1：关于你自己",
        "gpt-scaffold-planner-select-prompt-1": "该学生为任务制定了[先读后写]的计划。",
        "gpt-scaffold-planner-select-prompt-2": "该学生为任务制定了[边读边写]的计划。",
        "gpt-scaffold-planner-select-prompt-3": "该学生为任务制定了[集中地写作，选择性阅读]的计划。",
        "gpt-scaffold-planner-select-prompt-4": "这个学生提出了为任务设计自己的计划。",
        "gpt-scaffold-need-check-subaction-prompt-SAVE_PLANNER-not-exist": "该学生还没有为他们将如何完成任务制定明确的计划。",
        "gpt-scaffold-need-check-subaction-prompt-SAVE_PLANNER-exist": "该学生已为他们将如何完成任务制定了明确的计划。",
        "gpt-scaffold-need-check-subaction-prompt-TIMER-not-exist": "该学生未留意完成任务可用的剩余时间。",
        "gpt-scaffold-need-check-subaction-prompt-TIMER-exist": "该学生已留意了完成任务可用的剩余时间。",
        "gpt-scaffold-need-check-subaction-prompt-TRY_OUT_TOOLS-not-exist": "该学生未留意平台中可用的工具或许能帮助他们完成任务。",
        "gpt-scaffold-need-check-subaction-prompt-TRY_OUT_TOOLS-exist": "该学生已留意到平台中可用的工具或许能帮助他们完成任务。",
        "gpt-scaffold-need-check-subaction-prompt-PAGE_NAVIGATION-not-exist": "该学生没有留意平台中可用的阅读材料可能有助于他们完成任务。",
        "gpt-scaffold-need-check-subaction-prompt-PAGE_NAVIGATION-exist": "该学生已留意到平台中可用的阅读材料可能有助于他们完成任务。",
        "gpt-scaffold-need-check-subaction-prompt-RUBRIC-not-exist": "该学生未留意到打分标准。",
        "gpt-scaffold-need-check-subaction-prompt-RUBRIC-exist": "该学生已留意了打分标准。",
        "gpt-scaffold-need-check-subaction-prompt-TASK_REQUIREMENT-not-exist": "该学生未留意到任务说明。",
        "gpt-scaffold-need-check-subaction-prompt-TASK_REQUIREMENT-exist": "该学生已留意了任务说明。",
        "gpt-scaffold-role-description": "你是一个乐于助人的助手，请根据给定的文本给出建议。",

        "planner-customise-step2-instruction": "请详细描述你计划使用的学习策略以及你将如何分配时间。你还可以说明学习策略与时间分配的原因。",
        "planner-reading-strategy-1": "一页页地阅读材料",
        "planner-reading-strategy-2": "快速浏览，然后细读",
        // "planner-reading-strategy-3": "Use the highlight tool to mark key content",
        // "planner-reading-strategy-4": "Write down my understanding in notes while reading",
        // "planner-reading-strategy-5": "Question-guided reading with focus on certain content",
        "planner-reading-strategy-3": "选择性阅读，跳过不相关内容",
        "planner-reading-strategy-instruction": "你计划使用哪些阅读技巧（多选）？",

        "planner-writing-strategy-1": "先给作文结构打草稿，再填充细节",
        // "planner-writing-strategy-2": "Use my notes and highlighting when writing the essay",
        "planner-writing-strategy-2": "查看说明和打分标准以使写作符合要求",
        "planner-writing-strategy-3": "复制粘贴关键句，然后流畅地改写",
        // "planner-writing-strategy-5": "Use the writing framework and patterns I have learned to write",
        "planner-writing-strategy-instruction": "你计划使用哪些写作技巧（多选）？",

        "planner-main-strategy-1": "先读，后写",
        "planner-main-strategy-1-instruction": "你打算在阅读和写作上分别用多少时间？",
        "planner-main-strategy-1-task-1": " 阅读第一个模块。",
        "planner-main-strategy-1-task-2": "阅读第二个模块。",
        "planner-main-strategy-1-task-3": "阅读第三个模块。",
        "planner-main-strategy-1-task-4": "写作。",
        "planner-main-strategy-2": "边读边写",
        "planner-main-strategy-2-instruction": "你计划每个主题用多长时间？",
        "planner-main-strategy-2-task-1": "阅读/写作关于第一模块的内容",
        "planner-main-strategy-2-task-2": "阅读/写作关于第二模块的内容",
        "planner-main-strategy-2-task-3": "阅读/写作关于第三模块的内容",

        "planner-main-strategy-3": "集中地写作，选择性阅读",
        "planner-main-strategy-3-instruction": "你计划在写作的各个阶段花多少时间？",
        "planner-main-strategy-3-task-1": "构思论文结构。",
        "planner-main-strategy-3-task-2": "打第一份草稿",
        "planner-main-strategy-3-task-3": "补充阅读与作文有关的信息",
        "planner-main-strategy-3-task-4": "检查、完善和提高作文水平",

        "planner-select-main-strategy-hint": "请选择一个策略以继续！",
        "planner-allocate-time-hint": "请给所有任务分配时间，并且总时间相加必须在任务时间以内！",
        "planner-select-reading-writing-strategy-hint": "请选择你计划使用的技巧以继续！",
        "planner-save-plan-hint": "请填写所有策略名称及正确时间！",

        "rule-based-scaffold-title-1": "理解任务要求很重要。",
        "rule-based-scaffold-title-1-task-1": "1. 利用目录来获得整体概览和略读文本",
        "rule-based-scaffold-title-1-task-2": "2. 查看作文打分标准",
        "rule-based-scaffold-title-1-task-3": "3. 查看学习目标和说明",
        "rule-based-scaffold-title-2": "阅读与主题相关的信息很重要。",
        "rule-based-scaffold-title-2-task-1": "1. 对重要信息做笔记",
        "rule-based-scaffold-title-2-task-2": "2. 选择性阅读",
        "rule-based-scaffold-title-2-task-3": "3. 检查剩余时间",
        "rule-based-scaffold-title-3": "阅读相关信息和回顾你的阅读很重要。",
        "rule-based-scaffold-title-3-task-1": "1. 回顾注释以检查目前的学习情况",
        "rule-based-scaffold-title-3-task-2": "2. 回顾学习目标和说明",
        "rule-based-scaffold-title-3-task-3": "3. 查看作文以决定接下来读什么",
        "rule-based-scaffold-title-4": "写好作文很重要。",
        "rule-based-scaffold-title-4-task-1": "1. 查看剩余时间",
        "rule-based-scaffold-title-4-task-2": "2. 查看作文打分标准",
        "rule-based-scaffold-title-4-task-3": "3. 把所学内容转化为主要观点来起草作文",
        "rule-based-scaffold-title-5": "写下有关的信息和检查你的写作很重要。",
        "rule-based-scaffold-title-5-task-1": "1. 查看作文打分标准",
        "rule-based-scaffold-title-5-task-2": "2. 修改你的作文。",
        "rule-based-scaffold-title-5-task-3": "3. 查看学习目标和说明",

        "annotation-label-1": "记笔记",
        "annotation-label-2": "重要的",
        "annotation-label-3": "有用的",
        "annotation-label-4": "概念",
        "annotation-label-5": "令人困惑的",

    },
    en: {
        // "index-title": "This is a test page",
        // "button-title": "hello",
        "annotation-notes-title": "Notes Panel",
        "annotation-write-note-placeholder": "Write notes here...",
        "annotation-tag-placeholder": "Input new tags and press Enter...",
        'annotation-note-save-btn-text': 'Save',
        'annotation-note-cancel-btn-text': 'Cancel',
        "annotation-search-btn-text": "Search",
        "annotation-search-panel-input-placeholder": "Input keywords to search...",

        "scaffolding-title": "Instruction Panel",
        "scaffolding-create-checklist-btn-text": "Create Checklist",
        "scaffolding-edit-checklist-btn-text": "Edit",
        "scaffolding-unread-message-text": "Unread Message",

        "gpt-scaffolding-title": "Instruction Panel",

        "planner-title": "Planner Tool",
        "planner-learning-strategy-select-label-text": "1. Please make a plan for your learning strategy:",
        "planner-learning-strategy-select-option1-text": "Select a strategy",
        "planner-learning-strategy-select-customise-option-text": "Use your own strategy",
        "planner-add-more-customise-strategy-btn-text": "Add More Strategy",
        "planner-customise-option-hint-textarea-placeholder": "Please explain why you design this plan?",
        "planner-next-btn-text": "Next",

        "planner-display-plan-title": "My Learning Plan",
        "planner-display-overall-strategy-label": "Overall strategy:",
        "planner-display-time-allocation-label": "Time allocation:",
        "planner-display-writing-strategy-label": "Writing strategy:",
        "planner-display-reading-strategy-label": "Reading strategy:",
        "planner-customise-plan-reason-placeholder": "(Optional)",

        "essay-title": "Essay Writing Tool",
        "essay-save-btn-text": "Save Essay",
        "essay-writing-placeholder": "Write essay here...",
        "essay-show-word-count-btn-text": "Show Word Count",
        "essay-save-toast-text": "Your essay is saved!",

        "dictionary-title": "Dictionary Tool",
        "dictionary-send-btn-text": "Send",
        "dictionary-panel-input-placeholder": "Please input a query word...",

        "checklist-title": "Checklist Tool",
        "checklist-basic-panel-title": "Basic",
        "checklist-academic-panel-title": "Academic",
        "checklist-originality-panel-title": "Originality",
        "checklist-integration-panel-title": "Integration and Elaboration",
        "checklist-analyse-btn-text": "Analyse",

        "chatgpt-title": "Chatgpt Tool",
        "chatgpt-send-btn-text": "Send",
        "chatgpt-panel-input-placeholder": "Ask a question...",

        "chatteacher-title": "Ask Teacher Tool",
        "chatteacher-panel-input-placeholder": "Ask a question...",
        "chatteacher-connect-server-status-text": "Connect server status",
        "chatteacher-teacher-online-status-text": "Teacher online status",
        "chatteacher-send-btn-text": "Send",

        "chatgpt-role-description": "You are a helpful assistant and please answers questions based on the provided text.",
        "gpt-scaffold-need-check-srl-prompt-CMTR2": "We have one student who is currently working on this learning task. Up until the 14th minute in the learning session, other students who performed well in this task have constantly checked the task instruction and rubric. This is not the case with this student. So, considering all the information provided above (including the task requirements, rubric, and reading material), and given the learning conditions of this particular student provided above, provide the student with paragraph-style (don't use the bullet points and numbered lists) feedback on how to check task instructions and rubric regularly until the end of this writing session.",
        "gpt-scaffold-need-check-srl-prompt-OR2": "We have one student who is currently working on this learning task. Up until the 21st minute in the learning session, other students who performed well in this task have already started including some information from the reading material in their essays. This doesn’t seem to be the case with this student. So, considering all the information provided above (including the task requirements, rubric, and reading material), and given the learning conditions of this particular student provided above, provide the student with paragraph-style (don't use the bullet points and numbered lists) feedback on how to include information from the reading material to their essay draft, based on task requirements.",
        "gpt-scaffold-need-check-srl-prompt-OT2": "We have one student who is currently working on this learning task. Up until the 28th minute in the learning session, other students who performed well in this task had already started adding novel information in their own words, based on the reading material. This doesn’t seem to be the case with this student. So, considering all the information provided above (including the task requirements, rubric, and reading material), and given the learning conditions of this particular student provided above, provide the student with paragraph-style (don't use the bullet points and numbered lists) feedback on how to expand on the information they used from reading materials. The student should do this in their own words.",
        "gpt-scaffold-user-take-pre-study-prompt": "This student has participated in the prior study so he/she has a certain level of task knowledge.",
        "gpt-scaffold-isdimu-prompt-0":"This student seems to have good understanding of various strategies or techniques that can be applied to facilitate learning.",
        "gpt-scaffold-isdimu-prompt-16":"This student seems to have a low level of understanding of various strategies or techniques that can be applied to facilitate learning.",
        "gpt-scaffold-isdimu-prompt-32":"This student seems to have some understanding of various strategies or techniques that can be applied to facilitate learning.",
        "gpt-scaffold-pretest-grades-prompt-0": "This student has a high level of knowledge about AI in medicine.",
        "gpt-scaffold-pretest-grades-prompt-5": "This student has a low level of knowledge about AI in medicine.",
        "gpt-scaffold-pretest-grades-prompt-10": "This student has a medium level of knowledge about AI in medicine.",

        "gpt-scaffold-test-isdimu-name": "Activity 3: knowledge in learning tactics",
        "gpt-scaffold-pretest-name": "Activity 2: knowledge test - AI in medicine",
        "gpt-scaffold-check-take-previous-study-name": "Activity 1: about yourself",
        "gpt-scaffold-planner-select-prompt-1": "This student came up with the plan to [read first then write] for this task.",
        "gpt-scaffold-planner-select-prompt-2": "This student came up with the plan to [read and write at the same time] for this task.",
        "gpt-scaffold-planner-select-prompt-3": "This student came up with the plan to [write intensively and read selectively] for this task.",
        "gpt-scaffold-planner-select-prompt-4": "This student came up with the plan to [design his own plan] for the task",
        "gpt-scaffold-need-check-subaction-prompt-SAVE_PLANNER-not-exist": "This student has not created explicit plans for how they will go about the task.",
        "gpt-scaffold-need-check-subaction-prompt-SAVE_PLANNER-exist": "This student has created explicit plans for how they will go about the task.",
        "gpt-scaffold-need-check-subaction-prompt-TIMER-not-exist": "This student is not aware of the time left to complete the task.",
        "gpt-scaffold-need-check-subaction-prompt-TIMER-exist": "This student is aware of the time left to complete the task.",
        "gpt-scaffold-need-check-subaction-prompt-TRY_OUT_TOOLS-not-exist": "This student is not aware of the tools available in the environment that may help them complete the task.",
        "gpt-scaffold-need-check-subaction-prompt-TRY_OUT_TOOLS-exist": "This student is aware of the tools available in the environment that may help them complete the task.",
        "gpt-scaffold-need-check-subaction-prompt-PAGE_NAVIGATION-not-exist": "This student is not aware of the available reading materials in the environment that may help them with the task.",
        "gpt-scaffold-need-check-subaction-prompt-PAGE_NAVIGATION-exist": "This student is aware of the available reading materials in the environment that may help them with the task.",
        "gpt-scaffold-need-check-subaction-prompt-RUBRIC-not-exist": "This student is not aware of the rubric.",
        "gpt-scaffold-need-check-subaction-prompt-RUBRIC-exist": "This student is aware of the rubric.",
        "gpt-scaffold-need-check-subaction-prompt-TASK_REQUIREMENT-not-exist": "This student is not aware of the task instructions.",
        "gpt-scaffold-need-check-subaction-prompt-TASK_REQUIREMENT-exist": "This student is aware of the task instructions.",
        "gpt-scaffold-role-description": "You are a helpful assistant, please give suggestions based on the given text.",

        "planner-customise-step2-instruction": "Please describe in detail the learning strategy you plan to adopt and how you will allocate your time. You may also include the reasons for the strategy and time allocation.",
        "planner-reading-strategy-1": "Read the material page by page",
        "planner-reading-strategy-2": "Quick browsing and then detailed reading",
        "planner-reading-strategy-3": "Use the highlight tool to mark key content",
        "planner-reading-strategy-4": "Write down my understanding in notes while reading",
        "planner-reading-strategy-5": "Question-guided reading with focus on certain content",
        "planner-reading-strategy-6": "Read selectively and skip irrelevant content",
        "planner-reading-strategy-instruction": "What reading skills do you plan to use (multiple choice)?",

        "planner-writing-strategy-1": "First draft an essay structure and then fill in with details",
        "planner-writing-strategy-2": "Use my notes and highlighting when writing the essay",
        "planner-writing-strategy-3": "Review instructions and rubrics to get writing in line",
        "planner-writing-strategy-4": "Copy Paste key sentences and then rewrite them fluently",
        "planner-writing-strategy-5": "Use the writing framework and patterns I have learned to write",
        "planner-writing-strategy-instruction": "What writing skills do you plan to use (multiple choice)?",

        "planner-main-strategy-1": "Read First, then Write",
        "planner-main-strategy-1-instruction": "How much time do you plan to spend on reading and writing respectively?",
        "planner-main-strategy-1-task-1": "Read first module",
        "planner-main-strategy-1-task-2": "Read second module",
        "planner-main-strategy-1-task-3": "Read third module",
        "planner-main-strategy-1-task-4": "Write essay",
        "planner-main-strategy-2": "Read and Write Simultaneously",
        "planner-main-strategy-2-instruction": "How much time do you plan to spend on each topic?",
        "planner-main-strategy-2-task-1": "Read/writing about first module",
        "planner-main-strategy-2-task-2": "Read/writing about second module",
        "planner-main-strategy-2-task-3": "Read/writing about third module",

        "planner-main-strategy-3": "Write Intensively, Read Selectively",
        "planner-main-strategy-3-instruction": "How much time do you plan to spend on different stages of writing?",
        "planner-main-strategy-3-task-1": "Conceive the structure of the essay",
        "planner-main-strategy-3-task-2": "Write the first draft",
        "planner-main-strategy-3-task-3": "Read additional information in relation to the essay",
        "planner-main-strategy-3-task-4": "Review, refine and enhance the essay",

        "planner-select-main-strategy-hint": "Please select one strategy to continue!!!",
        "planner-allocate-time-hint": "Please allocate time to all tasks and total time must within required time!!!",
        "planner-select-reading-writing-strategy-hint": "Please selected skills you plan to use!!!",
        "planner-save-plan-hint": "Please fill all the strategy name and correct time!!!",

        "rule-based-scaffold-title-1": "It is important to understand what the task is about.",
        "rule-based-scaffold-title-1-task-1": "(a) Use menu to get an overview and skim text",
        "rule-based-scaffold-title-1-task-2": "(b) Check the essay rubric",
        "rule-based-scaffold-title-1-task-3": "(c) Check the learning goals and instructions",
        "rule-based-scaffold-title-2": "It is important to read information about the topics.",
        "rule-based-scaffold-title-2-task-1": "(a) Note down important information",
        "rule-based-scaffold-title-2-task-2": "(b) Select what to read",
        "rule-based-scaffold-title-2-task-3": "(c) Check the time left",
        "rule-based-scaffold-title-3": "It is important to read relevant information and review your reading.",
        "rule-based-scaffold-title-3-task-1": "(a) Review annotations to check learning so far",
        "rule-based-scaffold-title-3-task-2": "(b) Review the learning goals and instructions",
        "rule-based-scaffold-title-3-task-3": "(c) Check essay to determine what to read next",
        "rule-based-scaffold-title-4": "It is important to write a good essay.",
        "rule-based-scaffold-title-4-task-1": "(a) Check the remaining time",
        "rule-based-scaffold-title-4-task-2": "(b) Check the essay rubric",
        "rule-based-scaffold-title-4-task-3": "(c) Draft essay by transferring learning to main points",
        "rule-based-scaffold-title-5": "It is important to write relevant information and check your writing.",
        "rule-based-scaffold-title-5-task-1": "(a) Check the essay rubric",
        "rule-based-scaffold-title-5-task-2": "(b) Edit your essay",
        "rule-based-scaffold-title-5-task-3": "(c) Check the learning goals and instructions",

        "annotation-label-1": "Takenote",
        "annotation-label-2": "important",
        "annotation-label-3": "useful",
        "annotation-label-4": "concept",
        "annotation-label-5": "confusing",
    },
    de: {
        'annotation-notes-title': 'Notizenbereich',
        'annotation-write-note-placeholder': 'Schreiben Sie hier Notizen...',
        'annotation-tag-placeholder': 'Geben Sie neue Tags ein und drücken Sie die Eingabetaste...',
        'annotation-note-save-btn-text': 'Speichern',
        'annotation-note-cancel-btn-text': 'Abbrechen',
        'annotation-search-btn-text': 'Suchen',
        'annotation-search-panel-input-placeholder': 'Geben Sie die zu durchsuchenden Schlüsselwörter ein...',

        'scaffolding-title': 'Gerüstplatte',
        'scaffolding-create-checklist-btn-text': 'Checkliste erstellen',
        'scaffolding-edit-checklist-btn-text': 'Bearbeiten',
        'scaffolding-unread-message-text': 'Ungelesene Nachricht',
        'gpt-scaffolding-title': 'GPT-Gerüstplatte',

        'planner-title': 'Planer-Tool',
        'planner-learning-strategy-select-label-text': '1. Bitte erstellen Sie einen Plan für Ihre Lernstrategie:',
        'planner-learning-strategy-select-option1-text': 'Wählen Sie eine Strategie',
        'planner-learning-strategy-select-customise-option-text': 'Nutzen Sie Ihre eigene Strategie',
        'planner-add-more-customise-strategy-btn-text': 'Fügen Sie weitere Strategie hinzu',
        'planner-customise-option-hint-textarea-placeholder': 'Bitte erläutern Sie, warum Sie diesen Plan entwerfen.',
        'planner-next-btn-text': 'Nächste',

        'planner-display-plan-title': 'Mein Lernplan',
        'planner-display-overall-strategy-label': 'Gesamtstrategie:',
        'planner-display-time-allocation-label': 'Zeiteinteilung:',
        'planner-display-writing-strategy-label': 'Schreibstrategie:',
        'planner-display-reading-strategy-label': 'Lesestrategie:',
        'planner-customise-plan-reason-placeholder': '(Optional)',

        'essay-title': 'Werkzeug zum Schreiben von Essays',
        'essay-save-btn-text': 'Aufsatz speichern',
        'essay-writing-placeholder': 'Schreiben Sie hier einen Aufsatz...',
        'essay-show-word-count-btn-text': 'Wortanzahl anzeigen',
        "essay-save-toast-text": "Dein Aufsatz wurde gespeichert!",

        'dictionary-title': 'Wörterbuch-Tool',
        'dictionary-send-btn-text': 'Schicken',
        'dictionary-panel-input-placeholder': 'Bitte geben Sie ein Suchwort ein...',

        'checklist-title': 'Checklisten-Tool',
        'checklist-basic-panel-title': 'Basic',
        'checklist-academic-panel-title': 'Akademisch',
        'checklist-originality-panel-title': 'Originalität',
        'checklist-integration-panel-title': 'Integration und Ausarbeitung',
        'checklist-analyse-btn-text': 'Analysieren',

        'chatgpt-title': 'Chatgpt-Tool',
        'chatgpt-send-btn-text': 'Schicken',
        'chatgpt-panel-input-placeholder': 'Stelle eine Frage...',

        'chatteacher-title': 'Ask Teacher Tool',
        'chatteacher-panel-input-placeholder': 'Stelle eine Frage...',
        'chatteacher-connect-server-status-text': 'Verbindungsserverstatus',
        'chatteacher-teacher-online-status-text': 'Online-Status des Lehrers',
        'chatteacher-send-btn-text': 'Schicken',


        "planner-customise-step2-instruction": "Bitte beschreiben Sie detailliert die Lernstrategie, die Sie anwenden möchten, und wie Sie Ihre Zeit einteilen werden. Sie können auch die Gründe für die Strategie und die Zeiteinteilung angeben.",
        "planner-reading-strategy-1": "Lesen Sie das Material Seite für Seite",
        "planner-reading-strategy-2": "Schnelles Durchblättern und dann detailliertes Lesen",
        "planner-reading-strategy-3": "Verwenden Sie das Hervorhebungstool, um Schlüsselinhalte zu markieren",
        "planner-reading-strategy-4": "Schreiben Sie während des Lesens Ihre Verständnisse in Notizen auf",
        "planner-reading-strategy-5": "Fragengesteuertes Lesen mit Fokus auf bestimmte Inhalte",
        "planner-reading-strategy-6": "Selektives Lesen und Überspringen irrelevanter Inhalte",
        "planner-reading-strategy-instruction": "Welche Lesestrategien planen Sie zu verwenden (Mehrfachauswahl)?",

        "planner-writing-strategy-1": "Erstellen Sie zuerst eine Gliederung und fügen Sie dann Details hinzu",
        "planner-writing-strategy-2": "Verwenden Sie beim Schreiben des Aufsatzes Ihre Notizen und Markierungen",
        "planner-writing-strategy-3": "Überprüfen Sie Anweisungen und Bewertungsrichtlinien, um das Schreiben auszurichten",
        "planner-writing-strategy-4": "Kopieren Sie Schlüsselsätze und schreiben Sie sie dann flüssig um",
        "planner-writing-strategy-5": "Verwenden Sie das erlernte Schreibgerüst und Muster zum Verfassen",
        "planner-writing-strategy-instruction": "Welche Schreibstrategien planen Sie zu verwenden (Mehrfachauswahl)?",

        "planner-main-strategy-1": "Erst lesen, dann schreiben",
        "planner-main-strategy-1-instruction": "Wie viel Zeit planen Sie jeweils für das Lesen und Schreiben ein?",
        "planner-main-strategy-1-task-1": "Erstes Modul lesen",
        "planner-main-strategy-1-task-2": "Zweites Modul lesen",
        "planner-main-strategy-1-task-3": "Drittes Modul lesen",
        "planner-main-strategy-1-task-4": "Aufsatz schreiben",
        "planner-main-strategy-2": "Lesen und Schreiben gleichzeitig",
        "planner-main-strategy-2-instruction": "Wie viel Zeit planen Sie für jedes Thema ein?",
        "planner-main-strategy-2-task-1": "Lesen/Schreiben über das erste Modul",
        "planner-main-strategy-2-task-2": "Lesen/Schreiben über das zweite Modul",
        "planner-main-strategy-2-task-3": "Lesen/Schreiben über das dritte Modul",

        "planner-main-strategy-3": "Intensives Schreiben, selektives Lesen",
        "planner-main-strategy-3-instruction": "Wie viel Zeit planen Sie für die verschiedenen Phasen des Schreibens ein?",
        "planner-main-strategy-3-task-1": "Struktur des Aufsatzes entwerfen",
        "planner-main-strategy-3-task-2": "Ersten Entwurf schreiben",
        "planner-main-strategy-3-task-3": "Zusätzliche Informationen zum Aufsatz lesen",
        "planner-main-strategy-3-task-4": "Aufsatz überprüfen, verfeinern und verbessern",

        "planner-select-main-strategy-hint": "Bitte wählen Sie eine Strategie, um fortzufahren!!!",
        "planner-allocate-time-hint": "Bitte weisen Sie allen Aufgaben Zeit zu, und die Gesamtzeit muss innerhalb der erforderlichen Zeit liegen!!!",
        "planner-select-reading-writing-strategy-hint": "Bitte wählen Sie die Fähigkeiten aus, die Sie anwenden möchten!!!",
        "planner-save-plan-hint": "Bitte füllen Sie alle Strategienamen aus und korrigieren Sie die Zeit!!!",


        // "rule-based-scaffold-title-1": "It is important to understand what the task is about.",
        // "rule-based-scaffold-title-1-task-1": "(a) Use menu to get an overview and skim text",
        // "rule-based-scaffold-title-1-task-2": "(b) Check the essay rubric",
        // "rule-based-scaffold-title-1-task-3": "(c) Check the learning goals and instructions",
        // "rule-based-scaffold-title-2": "It is important to read information about the topics.",
        // "rule-based-scaffold-title-2-task-1": "(a) Note down important information",
        // "rule-based-scaffold-title-2-task-2": "(b) Select what to read",
        // "rule-based-scaffold-title-2-task-3": "(c) Check the time left",
        // "rule-based-scaffold-title-3": "It is important to read relevant information and review your reading.",
        // "rule-based-scaffold-title-3-task-1": "(a) Review annotations to check learning so far",
        // "rule-based-scaffold-title-3-task-2": "(b) Review the learning goals and instructions",
        // "rule-based-scaffold-title-3-task-3": "(c) Check essay to determine what to read next",
        // "rule-based-scaffold-title-4": "It is important to write a good essay.",
        // "rule-based-scaffold-title-4-task-1": "(a) Check the remaining time",
        // "rule-based-scaffold-title-4-task-2": "(b) Check the essay rubric",
        // "rule-based-scaffold-title-4-task-3": "(c) Draft essay by transferring learning to main points",
        // "rule-based-scaffold-title-5": "It is important to write relevant information and check your writing.",
        // "rule-based-scaffold-title-5-task-1": "(a) Check the essay rubric",
        // "rule-based-scaffold-title-5-task-2": "(b) Edit your essay",
        // "rule-based-scaffold-title-5-task-3": "(c) Check the learning goals and instructions",

        "annotation-label-1": "Notiz nehmen",
        "annotation-label-2": "wichtig",
        "annotation-label-3": "nützlich",
        "annotation-label-4": "Konzept",
        "annotation-label-5": "verwirrend"
    },
    fi: {
        'annotation-notes-title': 'Muistiinpanot-paneeli',
        'annotation-write-note-placeholder': 'Kirjoita muistiinpanoja tähän...',
        'annotation-tag-placeholder': 'Syötä uudet tunnisteet ja paina Enter...',
        'annotation-note-save-btn-text': 'Tallenna',
        'annotation-note-cancel-btn-text': 'Peruuta',
        'annotation-search-btn-text': 'Hae',
        'annotation-search-panel-input-placeholder': 'Syötä hakusanat...',

        'scaffolding-title': 'Rakennustelineiden paneeli',
        'scaffolding-create-checklist-btn-text': 'Luo tarkistuslista',
        'scaffolding-edit-checklist-btn-text': 'Muokata',
        'scaffolding-unread-message-text': 'Lukematon viesti',
        'gpt-scaffolding-title': 'Hoksautusikkuna',

        'planner-title': 'Suunnittelutyökalu',
        'planner-learning-strategy-select-label-text': '1. Suunnittele oppimisstrategiasi:',
        'planner-learning-strategy-select-option1-text': 'Valitse strategia',
        'planner-learning-strategy-select-customise-option-text': 'Käytä omaa oppimisstrategiaani',
        'planner-add-more-customise-strategy-btn-text': 'Lisää uusi strategia',
        'planner-customise-option-hint-textarea-placeholder': 'Kuvaile, miksi suunnittelit tällaisen strategian.',
        'planner-next-btn-text': 'Seuraava',

        'planner-display-plan-title': 'Minun oppimissuunnitelmani',
        'planner-display-overall-strategy-label': 'Kokonaisstrategia:',
        'planner-display-time-allocation-label': 'Aikajako:',
        'planner-display-writing-strategy-label': 'Kirjoitusstrategia:',
        'planner-display-reading-strategy-label': 'Lukustrategia:',
        'planner-customise-plan-reason-placeholder': '(Valinnainen)',

        'essay-title': 'Esseen kirjoitustyökalu',
        'essay-save-btn-text': 'Tallenna essee',
        'essay-writing-placeholder': 'Kirjoita essee tähän...',
        'essay-show-word-count-btn-text': 'Näytä sanamäärä',
        "essay-save-toast-text": "Esseesi on tallennettu!",

        'dictionary-title': 'Sanakirjatyökalu',
        'dictionary-send-btn-text': 'Lähettää',
        'dictionary-panel-input-placeholder': 'Syötä kyselysana...',

        'checklist-title': 'Tarkistuslistatyökalu',
        'checklist-basic-panel-title': 'Perus',
        'checklist-academic-panel-title': 'Akateeminen',
        'checklist-originality-panel-title': 'Omaperäisyys',
        'checklist-integration-panel-title': 'Integrointi ja kehittäminen',
        'checklist-analyse-btn-text': 'Analysoida',

        'chatgpt-title': 'Chatgpt-työkalu',
        'chatgpt-send-btn-text': 'Lähettää',
        'chatgpt-panel-input-placeholder': 'Kysy kysymys...',

        'chatteacher-title': 'Kysy opettajatyökalu',
        'chatteacher-panel-input-placeholder': 'Kysy kysymys...',
        'chatteacher-connect-server-status-text': 'Yhdistä palvelimen tila',
        'chatteacher-teacher-online-status-text': 'Opettajan online-tila',
        'chatteacher-send-btn-text': 'Lähettää',


        "planner-customise-step2-instruction": "Kuvaile yksityiskohtaisesti suunnittelemasi oppimisstrategia ja miten aiot jakaa aikasi. Voit myös sisällyttää strategian ja ajankäytön syyt.",
        "planner-reading-strategy-1": "Lue materiaali sivu kerrallaan",
        "planner-reading-strategy-2": "Pikainen selaaminen ja sitten yksityiskohtainen lukeminen",
        "planner-reading-strategy-3": "Käytä korostustyökalua merkitäksesi keskeistä sisältöä",
        "planner-reading-strategy-4": "Kirjoita ymmärryksesi muistiinpanoihin lukemisen aikana",
        "planner-reading-strategy-5": "Kysymysohjattu lukeminen keskittyen tiettyyn sisältöön",
        "planner-reading-strategy-6": "Valikoiva lukeminen ja epäolennaisen sisällön ohittaminen",
        "planner-reading-strategy-instruction": "Mitä lukustrategioita aiot käyttää (monivalinta)?",

        "planner-writing-strategy-1": "Laatikaa ensin esseen rakenne ja lisätkää sitten yksityiskohdat",
        "planner-writing-strategy-2": "Käytä muistiinpanojasi ja korostuksia kirjoittaessasi esseetä",
        "planner-writing-strategy-3": "Tarkista ohjeet ja arviointikriteerit ohjataksesi kirjoittamista",
        "planner-writing-strategy-4": "Kopioi tärkeitä lauseita ja kirjoita ne sitten sujuvasti uudelleen",
        "planner-writing-strategy-5": "Käytä oppimaasi kirjoituskehystä ja -malleja kirjoittamiseen",
        "planner-writing-strategy-instruction": "Mitä kirjoitusstrategioita aiot käyttää (monivalinta)?",

        "planner-main-strategy-1": "Ensin lukea, sitten kirjoittaa",
        "planner-main-strategy-1-instruction": "Kuinka paljon aikaa aiot käyttää lukemiseen ja kirjoittamiseen?",
        "planner-main-strategy-1-task-1": "Lue ensimmäinen moduuli",
        "planner-main-strategy-1-task-2": "Lue toinen moduuli",
        "planner-main-strategy-1-task-3": "Lue kolmas moduuli",
        "planner-main-strategy-1-task-4": "Kirjoita essee",
        "planner-main-strategy-2": "Lue ja kirjoita samanaikaisesti",
        "planner-main-strategy-2-instruction": "Kuinka paljon aikaa aiot käyttää jokaiseen aiheeseen?",
        "planner-main-strategy-2-task-1": "Lue/kirjoita ensimmäisestä moduulista",
        "planner-main-strategy-2-task-2": "Lue/kirjoita toisesta moduulista",
        "planner-main-strategy-2-task-3": "Lue/kirjoita kolmannesta moduulista",

        "planner-main-strategy-3": "Kirjoita intensiivisesti, lue valikoivasti",
        "planner-main-strategy-3-instruction": "Kuinka paljon aikaa aiot käyttää kirjoittamisen eri vaiheisiin?",
        "planner-main-strategy-3-task-1": "Suunnittele esseen rakenne",
        "planner-main-strategy-3-task-2": "Kirjoita ensimmäinen luonnos",
        "planner-main-strategy-3-task-3": "Lue lisätietoja esseeseen liittyen",
        "planner-main-strategy-3-task-4": "Tarkista, hienosäädä ja paranna esseetä",

        "planner-select-main-strategy-hint": "Valitse strategia jatkaaksesi!!!",
        "planner-allocate-time-hint": "Ole hyvä ja jaa aikaa kaikille tehtäville, ja kokonaisaika on oltava vaaditun ajan sisällä!!!",
        "planner-select-reading-writing-strategy-hint": "Valitse taidot, joita aiot käyttää!!!",
        "planner-save-plan-hint": "Täytä kaikki strategian nimet ja korjaa aika!!!",

        // "rule-based-scaffold-title-1": "It is important to understand what the task is about.",
        // "rule-based-scaffold-title-1-task-1": "(a) Use menu to get an overview and skim text",
        // "rule-based-scaffold-title-1-task-2": "(b) Check the essay rubric",
        // "rule-based-scaffold-title-1-task-3": "(c) Check the learning goals and instructions",
        // "rule-based-scaffold-title-2": "It is important to read information about the topics.",
        // "rule-based-scaffold-title-2-task-1": "(a) Note down important information",
        // "rule-based-scaffold-title-2-task-2": "(b) Select what to read",
        // "rule-based-scaffold-title-2-task-3": "(c) Check the time left",
        // "rule-based-scaffold-title-3": "It is important to read relevant information and review your reading.",
        // "rule-based-scaffold-title-3-task-1": "(a) Review annotations to check learning so far",
        // "rule-based-scaffold-title-3-task-2": "(b) Review the learning goals and instructions",
        // "rule-based-scaffold-title-3-task-3": "(c) Check essay to determine what to read next",
        // "rule-based-scaffold-title-4": "It is important to write a good essay.",
        // "rule-based-scaffold-title-4-task-1": "(a) Check the remaining time",
        // "rule-based-scaffold-title-4-task-2": "(b) Check the essay rubric",
        // "rule-based-scaffold-title-4-task-3": "(c) Draft essay by transferring learning to main points",
        // "rule-based-scaffold-title-5": "It is important to write relevant information and check your writing.",
        // "rule-based-scaffold-title-5-task-1": "(a) Check the essay rubric",
        // "rule-based-scaffold-title-5-task-2": "(b) Edit your essay",
        // "rule-based-scaffold-title-5-task-3": "(c) Check the learning goals and instructions",

        "annotation-label-1": "Huomaa",
        "annotation-label-2": "tärkeä",
        "annotation-label-3": "hyödyllinen",
        "annotation-label-4": "käsite",
        "annotation-label-5": "hämmentävä"
    },
    nl: {
        'annotation-notes-title': 'Notitiepaneel',
        'annotation-write-note-placeholder': 'Schrijf hier aantekeningen...',
        'annotation-tag-placeholder': 'Voer nieuwe tags in en druk op Enter...',
        'annotation-note-save-btn-text': 'Opslaan',
        'annotation-note-cancel-btn-text': 'Annuleren',
        'annotation-search-btn-text': 'Zoekopdracht',
        'annotation-search-panel-input-placeholder': 'Voer trefwoorden in om te zoeken...',

        'scaffolding-title': 'Steigerpaneel',
        'scaffolding-create-checklist-btn-text': 'Maak een checklist',
        'scaffolding-edit-checklist-btn-text': 'Bewerking',
        'scaffolding-unread-message-text': 'Ongelezen bericht',
        'gpt-scaffolding-title': 'GPT steigerpaneel',

        'planner-title': 'Planner-tool',
        'planner-learning-strategy-select-label-text': '1. Maak een plan voor uw leerstrategie:',
        'planner-learning-strategy-select-option1-text': 'Selecteer een strategie',
        'planner-learning-strategy-select-customise-option-text': 'Gebruik uw eigen strategie',
        'planner-add-more-customise-strategy-btn-text': 'Voeg meer strategie toe',
        'planner-customise-option-hint-textarea-placeholder': 'Leg uit waarom u dit plan ontwerpt?',
        'planner-next-btn-text': 'Volgende', 'planner-display-plan-title': 'Mijn Leerplan',

        'planner-display-overall-strategy-label': 'Algemene strategie:',
        'planner-display-time-allocation-label': 'Tijdsbesteding:',
        'planner-display-writing-strategy-label': 'Strategie schrijven:',
        'planner-display-reading-strategy-label': 'Lees strategie:',
        'planner-customise-plan-reason-placeholder': '(Optioneel)',

        'essay-title': 'Hulpmiddel voor het schrijven van essays',
        'essay-save-btn-text': 'Opstel opslaan',
        'essay-writing-placeholder': 'Schrijf hier een essay...',
        'essay-show-word-count-btn-text': 'Toon het aantal woorden',
        "essay-save-toast-text": "Je essay is opgeslagen!",

        'dictionary-title': 'Woordenboekhulpmiddel',
        'dictionary-send-btn-text': 'Versturen',
        'dictionary-panel-input-placeholder': 'Voer een zoekwoord in...',

        'checklist-title': 'Controlelijsthulpmiddel',
        'checklist-basic-panel-title': 'Basis',
        'checklist-academic-panel-title': 'Academisch',
        'checklist-originality-panel-title': 'Originaliteit',
        'checklist-integration-panel-title': 'Integratie en uitwerking',
        'checklist-analyse-btn-text': 'Analyseren',

        'chatgpt-title': 'Chatgpt-tool',
        'chatgpt-send-btn-text': 'Versturen',
        'chatgpt-panel-input-placeholder': 'Een vraag stellen...',

        'chatteacher-title': 'Vraag het aan de docententool',
        'chatteacher-panel-input-placeholder': 'Een vraag stellen...',
        'chatteacher-connect-server-status-text': 'Verbind serverstatus',
        'chatteacher-teacher-online-status-text': 'Onlinestatus van de docent',
        'chatteacher-send-btn-text': 'Versturen',


        "planner-customise-step2-instruction": "Beschrijf alstublieft in detail de leerstrategie die u van plan bent te adopteren en hoe u uw tijd zult indelen. U kunt ook de redenen voor de strategie en tijdsindeling opnemen.",
        "planner-reading-strategy-1": "Lees het materiaal pagina voor pagina",
        "planner-reading-strategy-2": "Snelle verkenning en vervolgens gedetailleerd lezen",
        "planner-reading-strategy-3": "Gebruik de markeertool om belangrijke inhoud te markeren",
        "planner-reading-strategy-4": "Noteer mijn begrip in aantekeningen tijdens het lezen",
        "planner-reading-strategy-5": "Vraaggestuurde leesmethodiek met focus op bepaalde inhoud",
        "planner-reading-strategy-6": "Selectief lezen en irrelevante inhoud overslaan",
        "planner-reading-strategy-instruction": "Welke leesstrategieën bent u van plan te gebruiken (meerdere keuzes)?",

        "planner-writing-strategy-1": "Maak eerst een essaystructuur en vul deze vervolgens aan met details",
        "planner-writing-strategy-2": "Gebruik mijn notities en markeringen bij het schrijven van het essay",
        "planner-writing-strategy-3": "Bekijk instructies en beoordelingscriteria om het schrijven af te stemmen",
        "planner-writing-strategy-4": "Kopieer en plak kernzinnen en herschrijf ze vervolgens vloeiend",
        "planner-writing-strategy-5": "Gebruik het schrijfkader en de patronen die ik heb geleerd om te schrijven",
        "planner-writing-strategy-instruction": "Welke schrijfstrategieën bent u van plan te gebruiken (meerdere keuzes)?",

        "planner-main-strategy-1": "Eerst lezen, dan schrijven",
        "planner-main-strategy-1-instruction": "Hoeveel tijd bent u van plan te besteden aan respectievelijk lezen en schrijven?",
        "planner-main-strategy-1-task-1": "Lees eerste module",
        "planner-main-strategy-1-task-2": "Lees tweede module",
        "planner-main-strategy-1-task-3": "Lees derde module",
        "planner-main-strategy-1-task-4": "Schrijf essay",
        "planner-main-strategy-2": "Lezen en schrijven tegelijkertijd",
        "planner-main-strategy-2-instruction": "Hoeveel tijd bent u van plan te besteden aan elk onderwerp?",
        "planner-main-strategy-2-task-1": "Lezen/schrijven over eerste module",
        "planner-main-strategy-2-task-2": "Lezen/schrijven over tweede module",
        "planner-main-strategy-2-task-3": "Lezen/schrijven over derde module",

        "planner-main-strategy-3": "Intensief schrijven, selectief lezen",
        "planner-main-strategy-3-instruction": "Hoeveel tijd bent u van plan te besteden aan de verschillende stadia van het schrijven?",
        "planner-main-strategy-3-task-1": "Bedenk de structuur van het essay",
        "planner-main-strategy-3-task-2": "Schrijf de eerste versie",
        "planner-main-strategy-3-task-3": "Lees aanvullende informatie met betrekking tot het essay",
        "planner-main-strategy-3-task-4": "Bekijk, verfijn en verbeter het essay",

        "planner-select-main-strategy-hint": "Selecteer alstublieft één strategie om door te gaan!!!",
        "planner-allocate-time-hint": "Wijs alstublieft tijd toe aan alle taken en de totale tijd moet binnen de vereiste tijd liggen!!!",
        "planner-select-reading-writing-strategy-hint": "Selecteer alstublieft de vaardigheden die u van plan bent te gebruiken!!!",
        "planner-save-plan-hint": "Vul alstublieft alle strategienamen in en corrigeer de tijd!!!",

        // "rule-based-scaffold-title-1": "It is important to understand what the task is about.",
        // "rule-based-scaffold-title-1-task-1": "(a) Use menu to get an overview and skim text",
        // "rule-based-scaffold-title-1-task-2": "(b) Check the essay rubric",
        // "rule-based-scaffold-title-1-task-3": "(c) Check the learning goals and instructions",
        // "rule-based-scaffold-title-2": "It is important to read information about the topics.",
        // "rule-based-scaffold-title-2-task-1": "(a) Note down important information",
        // "rule-based-scaffold-title-2-task-2": "(b) Select what to read",
        // "rule-based-scaffold-title-2-task-3": "(c) Check the time left",
        // "rule-based-scaffold-title-3": "It is important to read relevant information and review your reading.",
        // "rule-based-scaffold-title-3-task-1": "(a) Review annotations to check learning so far",
        // "rule-based-scaffold-title-3-task-2": "(b) Review the learning goals and instructions",
        // "rule-based-scaffold-title-3-task-3": "(c) Check essay to determine what to read next",
        // "rule-based-scaffold-title-4": "It is important to write a good essay.",
        // "rule-based-scaffold-title-4-task-1": "(a) Check the remaining time",
        // "rule-based-scaffold-title-4-task-2": "(b) Check the essay rubric",
        // "rule-based-scaffold-title-4-task-3": "(c) Draft essay by transferring learning to main points",
        // "rule-based-scaffold-title-5": "It is important to write relevant information and check your writing.",
        // "rule-based-scaffold-title-5-task-1": "(a) Check the essay rubric",
        // "rule-based-scaffold-title-5-task-2": "(b) Edit your essay",
        // "rule-based-scaffold-title-5-task-3": "(c) Check the learning goals and instructions",

        "annotation-label-1": "Let op",
        "annotation-label-2": "belangrijk",
        "annotation-label-3": "nuttig",
        "annotation-label-4": "concept",
        "annotation-label-5": "verwarrend"
    },
    es: { //spanish

        // "index-title": "Ésta es una página de prueba",

        // "button-title": "Hola",

        "annotation-notes-title": "Panel de notas",
        "annotation-write-note-placeholder": "Escribe notas aquí...",
        "annotation-tag-placeholder": "Ingresa nuevas etiquetas (tags) y haz clic en Enter...",
        'annotation-note-save-btn-text': 'Guardar',
        'annotation-note-cancel-btn-text': 'Cancelar',
        "annotation-search-btn-text": "Buscar",
        "annotation-search-panel-input-placeholder": "Ingresa palabras clave para buscar...",

        "scaffolding-title": "Panel de instrucciones",
        "scaffolding-create-checklist-btn-text": "Crear lista de verificación",
        "scaffolding-edit-checklist-btn-text": "Editar",
        "scaffolding-unread-message-text": "Mensajes sin leer",

        "gpt-scaffolding-title": "Panel de Instrucciones",
        "planner-title": "Herramienta de planeación",
        "planner-learning-strategy-select-label-text": "1. Por favor crea un plan para tu estrategia de aprendizaje:",
        "planner-learning-strategy-select-option1-text": "Selecciona una estrategia",
        "planner-learning-strategy-select-customise-option-text": "Usa tu propia estrategia",
        "planner-add-more-customise-strategy-btn-text": "Agrega más estrategias",
        "planner-customise-option-hint-textarea-placeholder": "¿Por favor explica por qué has diseñado este plan?",
        "planner-next-btn-text": "Siguiente",
        "planner-display-plan-title": "Mi Plan de Aprendizaje",
        "planner-display-overall-strategy-label": "Estrategia general:",
        "planner-display-time-allocation-label": "Tiempo requerido:",
        "planner-display-writing-strategy-label": "Estrategia de escritura:",
        "planner-display-reading-strategy-label": "Estrategia de lectura:",
        "planner-customise-plan-reason-placeholder": "(Opcional)",

        "essay-title": "Herramienta para escribir ensayos",
        "essay-save-btn-text": "Guardar ensayo",
        "essay-writing-placeholder": "Escribe tu ensayo aquí...",
        "essay-show-word-count-btn-text": "Mostrar número de palabras",
        "essay-save-toast-text": "¡Tu ensayo está guardado!",

        "dictionary-title": "Herramienta diccionario",
        "dictionary-send-btn-text": "Enviar",
        "dictionary-panel-input-placeholder": "Por favor ingresa una palabra para buscar...",

        "checklist-title": "Herramienta de verificación",
        "checklist-basic-panel-title": "Básico",
        "checklist-academic-panel-title": "Académico",
        "checklist-originality-panel-title": "Originalidad",
        "checklist-integration-panel-title": "Integración y elaboración",
        "checklist-analyse-btn-text": "Analizar",

        "chatgpt-title": "Herramienta Chatgpt",
        "chatgpt-send-btn-text": "Enviar",
        "chatgpt-panel-input-placeholder": "Haz una pregunta...",

        "chatteacher-title": "Herramienta preguntar al profesor",
        "chatteacher-panel-input-placeholder": "Haz una pregunta...",
        "chatteacher-connect-server-status-text": "Estado de conexión al servidor",
        "chatteacher-teacher-online-status-text": "Estado en línea del profesor",
        "chatteacher-send-btn-text": "Enviar",

        "chatgpt-role-description": "Eres un asistente muy útil, por favor responda preguntas con base en el texto suministrado.",
        "gpt-scaffold-need-check-srl-prompt-CMTR2": "Tenemos un estudiante que actualmente está trabajando en esta tarea de aprendizaje. Hasta el minuto 14 de la sesión de aprendizaje, otros estudiantes que han rendido bien en esta tarea han revisado constantemente las instrucciones de la tarea y la rúbrica. Este no es el caso de este estudiante. Por lo tanto, considerando toda la información proporcionada anteriormente (incluyendo los requisitos de la tarea, la rúbrica y el material de lectura), y dadas las condiciones de aprendizaje de este estudiante en particular, es importante proporcionarle retroalimentación sobre cómo debe revisar regularmente las instrucciones de la tarea y la rúbrica hasta el final de esta sesión de escritura.",
        "gpt-scaffold-need-check-srl-prompt-OR2": "Hasta el minuto 21 de la sesión de aprendizaje, notamos que otros estudiantes que han tenido un buen desempeño en esta tarea ya han comenzado a incluir información del material de lectura en sus ensayos, algo que aún no se observa en tu caso. Es importante integrar los contenidos de las lecturas para cumplir con los requisitos de la tarea y enriquecer tu ensayo. Te sugiero que identifiques puntos clave en el material que se relacionen con los temas de la inteligencia artificial y su impacto en la medicina. Reflexiona sobre cómo estos aspectos se vinculan con las instrucciones de la tarea y úsalos para apoyar tus argumentos o para proporcionar ejemplos específicos. Al hacerlo, asegúrate de que estas referencias al material de lectura estén bien integradas en tu análisis, contribuyendo así a desarrollar las discusiones sobre el concepto de la IA, su uso actual y futuro en la medicina, tal como se espera en la rúbrica. Esto no solo enriquecerá tu ensayo, sino que también demostrará una comprensión profunda del tema.",
        "gpt-scaffold-need-check-srl-prompt-OT2": "Hasta el minuto 28 de la sesión de aprendizaje, notamos que otros estudiantes que han tenido éxito en esta tarea ya comenzaron a incorporar información novedosa en sus propios términos, basándose en el material de lectura. Sin embargo, parece que este estudiante no ha seguido ese camino aún. Dado el contexto de la tarea, los criterios de evaluación y los materiales de lectura, es importante que este estudiante se esfuerce por interpretar y expandir la información proporcionada, utilizando su propia voz y perspectiva. Al hacerlo, puede enriquecer su ensayo con análisis personales y ejemplos que reflejen una comprensión profunda del tema. Le animo a que vincule los conceptos de inteligencia artificial con aplicaciones prácticas en la medicina, ilustrando cómo estos elementos interactúan en escenarios reales y futuros. Esta aproximación no solo demostrará una comprensión sólida del material, sino que también ayudará a desarrollar un ensayo más persuasivo y personalizado.",
        "gpt-scaffold-user-take-pre-study-prompt": "Este estudiante ha participado en un estudio previo, por lo tanto el o ella tiene cierto nivel de conocimiento de la tarea.",
        "gpt-scaffold-isdimu-prompt-0":"Este estudiante tiene un nivel alto de entendimiento de varias estrategias o técnicas que pueden ser aplicadas para facilitar aprendizaje",
        "gpt-scaffold-isdimu-prompt-16":"Este estudiante tiene un nivel bajo de entendimiento de varias estrategias o técnicas que pueden ser aplicadas para facilitar aprendizaje",
        "gpt-scaffold-isdimu-prompt-32":"Este estudiante parece tener cierto nivel de entendimiento de varias estrategias o técnicas que pueden ser aplicadas para facilitar aprendizaje",
        "gpt-scaffold-pretest-grades-prompt-0": "Este estudiante tiene un nivel alto de conocimiento sobre IA e IA en medicina.",
        "gpt-scaffold-pretest-grades-prompt-5": "Este estudiante tiene un nivel bajo de conocimiento sobre IA e IA en medicina.",
        "gpt-scaffold-pretest-grades-prompt-10": "Este estudiante tiene un nivel medio de conocimiento sobre IA e IA en medicina.",

        "gpt-scaffold-test-isdimu-name": "Actividad 3: conocimiento en tácticas de aprendizaje",
        "gpt-scaffold-pretest-name": "Actividad 2: prueba de conocimiento - AI en medicina",
        "gpt-scaffold-check-take-previous-study-name": "Actividad 1: Acerca de ti",
        "gpt-scaffold-planner-select-prompt-1": "Este estudiante generó un plan para [leer primero y luego escribir] ésta tarea.",
        "gpt-scaffold-planner-select-prompt-2": "Este estudiante generó un plan para [leer y escribir al mismo tiempo] ésta tarea.",
        "gpt-scaffold-planner-select-prompt-3": "Este estudiante generó un plan para [escribir intensivamente y leer selectivamente] ésta tarea.",
        "gpt-scaffold-planner-select-prompt-4": "Este estudiante generó un plan para [diseŋar su própio plan] ésta tarea.",
        "gpt-scaffold-need-check-subaction-prompt-SAVE_PLANNER-not-exist": "Este estudiante no ha creado planes específicos en cuanto a como va a completar la tarea.",
        "gpt-scaffold-need-check-subaction-prompt-SAVE_PLANNER-exist": "Este estudiante ha creado planes específicos en cuanto a como va a completar la tarea.",
        "gpt-scaffold-need-check-subaction-prompt-TIMER-not-exist": "Este estudiante no esta consciente del tiempo que le queda para completar la tarea.",
        "gpt-scaffold-need-check-subaction-prompt-TIMER-exist": "Este estudiante si esta consciente del tiempo que le queda para completar la tarea.",
        "gpt-scaffold-need-check-subaction-prompt-TRY_OUT_TOOLS-not-exist": "Este estudiante no esta consciente de las herramientas que tiene disponibles en el ambiente de aprendizaje para completar la tarea.",
        "gpt-scaffold-need-check-subaction-prompt-TRY_OUT_TOOLS-exist": "Este estudiante si esta consciente de las herramientas que tiene disponibles en el ambiente de aprendizaje para completar la tarea.",
        "gpt-scaffold-need-check-subaction-prompt-PAGE_NAVIGATION-not-exist": "Este estudiante no esta consciente del material de lectura en el ambiente de aprendizaje que puede ayudarle a completar la tarea.",
        "gpt-scaffold-need-check-subaction-prompt-PAGE_NAVIGATION-exist": "Este estudiante si esta consciente del material de lectura en el ambiente de aprendizaje que puede ayudarle a completar la tarea.",
        "gpt-scaffold-need-check-subaction-prompt-RUBRIC-not-exist": "Este estudiante no esta consciente de la rúbrica.",
        "gpt-scaffold-need-check-subaction-prompt-RUBRIC-exist": "Este estudiante si esta consciente de la rúbrica.",
        "gpt-scaffold-need-check-subaction-prompt-TASK_REQUIREMENT-not-exist": "Este estudiante no esta consciente de las instrucciones para completar la tarea.",
        "gpt-scaffold-need-check-subaction-prompt-TASK_REQUIREMENT-exist": "Este estudiante si esta consciente de las instrucciones para completar la tarea.",
        "gpt-scaffold-role-description": "Eres un asistente muy útil, por favor brinde sugerencias basadas en el siguiente texto.",

        "planner-customise-step2-instruction": "Por favor describa en detalle la estrategia de aprendizaje que planea adoptar y como va a distribuir su tiempo. También puedes incluir las razones por las cuales tomaste esa estrategia y la forma en que distribuiiste el tiempo.",
        "planner-reading-strategy-1": "Lea el material página por página",
        "planner-reading-strategy-2": "Navegue rápidamente y luego lea detalladamente",
        // "planner-reading-strategy-3": "Use the highlight tool to mark key content",
        // "planner-reading-strategy-4": "Write down my understanding in notes while reading",
        // "planner-reading-strategy-5": "Question-guided reading with focus on certain content",
        "planner-reading-strategy-3": "Lea selectivamente y salte la información irrelevante",
        "planner-reading-strategy-instruction": "¿Qué habilitdad de lectura planea utilizar (múltiples opciones)?",

        "planner-writing-strategy-1": "Primero defina una estuctura borrador para su ensayo y luego completelo con detalles",
        // "planner-writing-strategy-2": "Use my notes and highlighting when writing the essay",
        "planner-writing-strategy-2": "Revise las instrucciones y la rúbrica para realizar su ejercicio de escritura",
        "planner-writing-strategy-3": "Copie y pegue las oraciones claves y luego re escribalas de formal fluida",
        // "planner-writing-strategy-5": "Use the writing framework and patterns I have learned to write",
        "planner-writing-strategy-instruction": "¿Qué habilitdad de escritura planea utilizar (múltiples opciones)?",

        "planner-main-strategy-1": "Lea primero y luego escriba",
        "planner-main-strategy-1-instruction": "¿Cuánto tiempo tiene estimado para leer y para escribir respectivamente?",
        "planner-main-strategy-1-task-1": "Lea el primero módulo",
        "planner-main-strategy-1-task-2": "Lea el segundo módulo",
        "planner-main-strategy-1-task-3": "Lea el tercer módulo",
        "planner-main-strategy-1-task-4": "Escriba el ensayo",
        "planner-main-strategy-2": "Lea y escriba de forma simultánea",
        "planner-main-strategy-2-instruction": "¿Cuánto tiempo tiene estimado demorarse en cada tema?",
        "planner-main-strategy-2-task-1": "Lea/Escriba sobre el primer módulo",
        "planner-main-strategy-2-task-2": "Lea/Escriba sobre el segundo módulo",
        "planner-main-strategy-2-task-3": "Lea/Escriba sobre el tercer módulo",

        "planner-main-strategy-3": "Escriba intensívamente, lea de forma selectiva",
        "planner-main-strategy-3-instruction": "¿Cuánto tiempo tiene estimado demorarse en diferentes etapas de su escritura?",
        "planner-main-strategy-3-task-1": "Planee la estructura del ensayo",
        "planner-main-strategy-3-task-2": "Escriba el primer borrador",
        "planner-main-strategy-3-task-3": "Lea la información adicional relacionada con el ensayo",
        "planner-main-strategy-3-task-4": "Revise, refine y mejore el ensayo",

        "planner-select-main-strategy-hint": "Por favor selecciona una estrategia para continuar!!!",
        "planner-allocate-time-hint": "Por favor asigna tiempo para todas las tareas. El tiempo total debe estar dentro de los 45 minutos!!!",
        "planner-select-reading-writing-strategy-hint": "Por favor selecciona habilidades que planeas utilizar!!!",
        "planner-save-plan-hint": "Por favor complete todo el nombre de la estrategia y corrija el tiempo!!!",

        "rule-based-scaffold-title-1": "Es importante entender de que se trata la tarea.",
        "rule-based-scaffold-title-1-task-1": "(a) Usar el menu para tener una vista general y dar un vistazo al texto",
        "rule-based-scaffold-title-1-task-2": "(b) Revisa la rúbrica del ensayo",
        "rule-based-scaffold-title-1-task-3": "(c) Revisa los objetivos de aprendizaje y las instrucciones",
        "rule-based-scaffold-title-2": "Es importante leer la información sobre los temas del ensayo.",
        "rule-based-scaffold-title-2-task-1": "(a) Anote información importante",
        "rule-based-scaffold-title-2-task-2": "(b) Seleccione que leer",
        "rule-based-scaffold-title-2-task-3": "(c) Revisa el tiempo que queda",
        "rule-based-scaffold-title-3": "Es importante leer la información relevante y revisar sus lecturas.",
        "rule-based-scaffold-title-3-task-1": "(a) Revisa las anotaciones para validar el aprendizaje hasta ahora",
        "rule-based-scaffold-title-3-task-2": "(b) Revisa los objetivos de aprendizaje y las instrucciones",
        "rule-based-scaffold-title-3-task-3": "(c) Revisa el ensayo para determinar los siguiente que debes leer",
        "rule-based-scaffold-title-4": "Es importante escribir un buen ensayo.",
        "rule-based-scaffold-title-4-task-1": "(a) Verifica cuánto tiempo te queda",
        "rule-based-scaffold-title-4-task-2": "(b) Verifica la rúbrica del ensayo",
        "rule-based-scaffold-title-4-task-3": "(c) Haz un borrador del ensayo transfiriendo tus aprendizajes en puntos principales del ensayo",
        "rule-based-scaffold-title-5": "Es importante escribir información relevante y verificar tu escritura.",
        "rule-based-scaffold-title-5-task-1": "(a) Verifica la rúbrica del ensayo",
        "rule-based-scaffold-title-5-task-2": "(b) Edita tu ensayo",
        "rule-based-scaffold-title-5-task-3": "(c) Revisa los objetivos de aprendizaje y las instrucciones",

        "annotation-label-1": "Anotar",
        "annotation-label-2": "Importante",
        "annotation-label-3": "Útil",
        "annotation-label-4": "Concepto",
        "annotation-label-5": "Confuso",
    },
    pt: {
        // "index-title": "Esta é uma página de teste",
        // "button-title": "olá",
        "annotation-notes-title": "Painel de Anotações",
        "annotation-write-note-placeholder": "Escreva anotações aqui...",
        "annotation-tag-placeholder": "Escreva novos rótulos/tags aqui e pressione Enter...",
        'annotation-note-save-btn-text': 'Salvar',
        'annotation-note-cancel-btn-text': 'Cancelar',
        "annotation-search-btn-text": "Busca",
        "annotation-search-panel-input-placeholder": "Escreva as palavras-chave para pesquisa...",

        "scaffolding-title": "Painel de Instruções",
        "scaffolding-create-checklist-btn-text": "Criar Checklist",
        "scaffolding-edit-checklist-btn-text": "Editar",
        "scaffolding-unread-message-text": "Mensagem Não Lida",

        "gpt-scaffolding-title": "Painel de Instruções",

        "planner-title": "Ferramenta de Planejamento",
        "planner-learning-strategy-select-label-text": "1. Por favor, faça um plano para sua estratégia de aprendizagem:",
        "planner-learning-strategy-select-option1-text": "Selecione uma estratégia",
        "planner-learning-strategy-select-customise-option-text": "Use sua própria estratégia",
        "planner-add-more-customise-strategy-btn-text": "Adicione Mais Estratégia",
        "planner-customise-option-hint-textarea-placeholder": "Por favor, explique: por que você criou esse plano?",
        "planner-next-btn-text": "Próximo",

        "planner-display-plan-title": "Meu Plano de Aprendizagem",
        "planner-display-overall-strategy-label": "Estratégia Geral:",
        "planner-display-time-allocation-label": "Alocação de Tempo:",
        "planner-display-writing-strategy-label": "Estratégia de Escrita:",
        "planner-display-reading-strategy-label": "Estratégia de Leitura:",
        "planner-customise-plan-reason-placeholder": "(Opcional)",

        "essay-title": "Ferramenta de Escrita de Redação",
        "essay-save-btn-text": "Salvar Redação",
        "essay-writing-placeholder": "Escreva a redação aqui...",
        "essay-show-word-count-btn-text": "Mostrar Contagem de Palavras",
        "essay-save-toast-text": "Seu ensaio foi salvo!",

        "dictionary-title": "Ferramenta de Dicionário",
        "dictionary-send-btn-text": "Enviar",
        "dictionary-panel-input-placeholder": "Por favor, escreva uma palavra para consulta...",

        "checklist-title": "Ferramenta de Checklist",
        "checklist-basic-panel-title": "Básico",
        "checklist-academic-panel-title": "Acadêmico",
        "checklist-originality-panel-title": "Originalidade",
        "checklist-integration-panel-title": "Integração e Elaboração",
        "checklist-analyse-btn-text": "Analisar",

        "chatgpt-title": "Ferramenta ChatGPT",
        "chatgpt-send-btn-text": "Enviar",
        "chatgpt-panel-input-placeholder": "Faça uma pergunta...",

        "chatteacher-title": "Ferramenta de Perguntar ao Professor",
        "chatteacher-panel-input-placeholder": "Faça uma pergunta...",
        "chatteacher-connect-server-status-text": "Status de conexão ao servidor",
        "chatteacher-teacher-online-status-text": "Status de professor online",
        "chatteacher-send-btn-text": "Enviar",

        "chatgpt-role-description": "Você é um assistente prestativo e responde às perguntas com base no texto fornecido.",
        "gpt-scaffold-need-check-srl-prompt-CMTR2": "Temos um estudante que está atualmente trabalhando nesta tarefa de aprendizado. Até o 14º minuto da sessão de aprendizado, outros estudantes que se saíram bem nesta tarefa têm constantemente verificado as instruções da tarefa e a rubrica. Este não é o caso deste estudante. Portanto, considerando todas as informações fornecidas acima (incluindo os requisitos da tarefa, a rubrica e o material de leitura), e dadas as condições de aprendizado deste estudante em particular, que foram fornecidas acima, forneça feedback ao estudante em estilo de parágrafo (sem marcadores ou listas numeradas) sobre como verificar regularmente as instruções da tarefa e a rubrica até o final desta sessão de escrita.",
        "gpt-scaffold-need-check-srl-prompt-OR2": "Temos um estudante que está atualmente trabalhando nesta tarefa de aprendizado. Até o 21º minuto da sessão de aprendizado, outros estudantes que se saíram bem nesta tarefa já começaram a incluir algumas informações do material de leitura em suas redações. Isso não parece ser o caso deste estudante. Portanto, considerando todas as informações fornecidas acima (incluindo os requisitos da tarefa, a rubrica e o material de leitura), e dadas as condições de aprendizado deste estudante em particular, que foram fornecidas acima, forneça feedback ao estudante em estilo de parágrafo (sem marcadores ou listas numeradas) sobre como incluir informações do material de leitura em seu rascunho da redação, com base nos requisitos da tarefa.",
        "gpt-scaffold-need-check-srl-prompt-OT2": "Temos um estudante que está atualmente trabalhando nesta tarefa de aprendizado. Até o 28º minuto da sessão de aprendizado, outros estudantes que se saíram bem nesta tarefa já começaram a adicionar informações novas com suas próprias palavras, com base no material de leitura. Isso não parece ser o caso deste estudante. Portanto, considerando todas as informações fornecidas acima (incluindo os requisitos da tarefa, a rubrica e o material de leitura), e dadas as condições de aprendizado deste estudante em particular, que foram fornecidas acima, forneça feedback ao estudante em estilo de parágrafo (sem marcadores ou listas numeradas) sobre como expandir as informações que eles utilizaram dos materiais de leitura. O estudante deve fazer isso com suas próprias palavras.",
        "gpt-scaffold-user-take-pre-study-prompt": "Este estudante participou do estudo anterior, então ele/ela tem um certo nível de conhecimento da tarefa.",
        "gpt-scaffold-isdimu-prompt-0":"Este estudante tem um alto nível de compreensão de várias estratégias ou técnicas que podem ser aplicadas para facilitar a aprendizagem.",
        "gpt-scaffold-isdimu-prompt-16":"Este estudante tem um baixo nível de compreensão de várias estratégias ou técnicas que podem ser aplicadas para facilitar a aprendizagem.",
        "gpt-scaffold-isdimu-prompt-32":"Este estudante parece ter alguma compreensão de várias estratégias ou técnicas que podem ser aplicadas para facilitar a aprendizagem.",
        "gpt-scaffold-pretest-grades-prompt-0": "Este estudante tem um nível alto de conhecimento sobre IA e IA na medicina.",
        "gpt-scaffold-pretest-grades-prompt-5": "Este estudante tem um nível baixo de conhecimento sobre IA e IA na medicina.",
        "gpt-scaffold-pretest-grades-prompt-10": "Este estudante tem um nível médio de conhecimento sobre IA e IA na medicina.",

        "gpt-scaffold-test-isdimu-name": "Atividade 3: conhecimento em táticas de aprendizagem",
        "gpt-scaffold-pretest-name": "Atividade 2: teste de conhecimento - IA na medicina",
        "gpt-scaffold-check-take-previous-study-name": "Atividade 1: sobre você",
        "gpt-scaffold-planner-select-prompt-1": "Este estudante elaborou o plano de [ler primeiro e depois escrever] para esta tarefa.",
        "gpt-scaffold-planner-select-prompt-2": "Este estudante elaborou o plano de [ler e escrever ao mesmo tempo] para esta tarefa.",
        "gpt-scaffold-planner-select-prompt-3": "Este estudante elaborou o plano de [escrever intensivamente e ler seletivamente] para esta tarefa.",
        "gpt-scaffold-planner-select-prompt-4": "Este estudante elaborou o plano de [criar seu próprio plano] para a tarefa.",
        "gpt-scaffold-need-check-subaction-prompt-SAVE_PLANNER-not-exist": "Este estudante não criou planos explícitos sobre como ele abordará a tarefa.",
        "gpt-scaffold-need-check-subaction-prompt-SAVE_PLANNER-exist": "Este estudante criou planos explícitos sobre como ele abordará a tarefa.",
        "gpt-scaffold-need-check-subaction-prompt-TIMER-not-exist": "Este estudante não está ciente do tempo restante para completar a tarefa.",
        "gpt-scaffold-need-check-subaction-prompt-TIMER-exist": "Este estudante está ciente do tempo restante para completar a tarefa.",
        "gpt-scaffold-need-check-subaction-prompt-TRY_OUT_TOOLS-not-exist": "Este estudante não está ciente das ferramentas disponíveis no ambiente que podem ajudá-lo a completar a tarefa.",
        "gpt-scaffold-need-check-subaction-prompt-TRY_OUT_TOOLS-exist": "Este estudante está ciente das ferramentas disponíveis no ambiente que podem ajudá-lo a completar a tarefa.",
        "gpt-scaffold-need-check-subaction-prompt-PAGE_NAVIGATION-not-exist": "Este estudante não está ciente dos materiais de leitura disponíveis no ambiente que podem ajudá-lo com a tarefa.",
        "gpt-scaffold-need-check-subaction-prompt-PAGE_NAVIGATION-exist": "Este estudante está ciente dos materiais de leitura disponíveis no ambiente que podem ajudá-lo com a tarefa.",
        "gpt-scaffold-need-check-subaction-prompt-RUBRIC-not-exist": "Este estudante não está ciente da rubrica.",
        "gpt-scaffold-need-check-subaction-prompt-RUBRIC-exist": "Este estudante está ciente da rubrica.",
        "gpt-scaffold-need-check-subaction-prompt-TASK_REQUIREMENT-not-exist": "Este estudante não está ciente das instruções da tarefa.",
        "gpt-scaffold-need-check-subaction-prompt-TASK_REQUIREMENT-exist": "Este estudante está ciente das instruções da tarefa.",
        "gpt-scaffold-role-description": "Você é um assistente prestativo, por favor, dê sugestões com base no texto fornecido.",

        "planner-customise-step2-instruction": "Por favor, descreva detalhadamente a estratégia de aprendizagem que você planeja adotar e como você irá alocar seu tempo. Você também pode incluir os motivos para a estratégia e a alocação de tempo.",
        "planner-reading-strategy-1": "Ler o material página por página",
        "planner-reading-strategy-2": "Navegação rápida e depois leitura detalhada",
        // "planner-reading-strategy-3": "Use the highlight tool to mark key content",
        // "planner-reading-strategy-4": "Write down my understanding in notes while reading",
        // "planner-reading-strategy-5": "Question-guided reading with focus on certain content",
        "planner-reading-strategy-3": "Ler seletivamente e pular conteúdo irrelevante",
        "planner-reading-strategy-instruction": "Quais habilidades de leitura você planeja usar (múltipla escolha)?",

        "planner-writing-strategy-1": "Fazer um rascunho de uma estrutura de redação primeiro e depois preenchê-la com detalhes",
        // "planner-writing-strategy-2": "Use my notes and highlighting when writing the essay",
        "planner-writing-strategy-2": "Revisar as instruções e a rubrica para alinhar a escrita",
        "planner-writing-strategy-3": "Copiar e colar frases-chave e depois reescrevê-las fluentemente",
        // "planner-writing-strategy-5": "Use the writing framework and patterns I have learned to write",
        "planner-writing-strategy-instruction": "Quais habilidades de escrita você planeja usar (múltipla escolha)?",

        "planner-main-strategy-1": "Leia Primeiro, Depois Escreva",
        "planner-main-strategy-1-instruction": "Quanto tempo você planeja gastar lendo e escrevendo respectivamente?",
        "planner-main-strategy-1-task-1": "Leia o primeiro módulo",
        "planner-main-strategy-1-task-2": "Leia o segundo módulo",
        "planner-main-strategy-1-task-3": "Leia o terceiro módulo",
        "planner-main-strategy-1-task-4": "Escreva sua redação",
        "planner-main-strategy-2": "Leia e Escreva Simultaneamente",
        "planner-main-strategy-2-instruction": "Quanto tempo você planeja gastar em cada tópico?",
        "planner-main-strategy-2-task-1": "Leitura/escrita sobre o primeiro módulo",
        "planner-main-strategy-2-task-2": "Leitura/escrita sobre o segundo módulo",
        "planner-main-strategy-2-task-3": "Leitura/escrita sobre o terceiro módulo",

        "planner-main-strategy-3": "Escreva Intensivamente, Leia Seletivamente",
        "planner-main-strategy-3-instruction": "Quanto tempo você planeja gastar em diferentes estágios da escrita?",
        "planner-main-strategy-3-task-1": "Estabelecer a estrutura da redação",
        "planner-main-strategy-3-task-2": "Escrever o primeiro rascunho",
        "planner-main-strategy-3-task-3": "Ler informações adicionais relacionadas à redação",
        "planner-main-strategy-3-task-4": "Revisar, refinar e aprimorar a redação",

        "planner-select-main-strategy-hint": "Por favor, selecione uma estratégia para continuar!!!",
        "planner-allocate-time-hint": "Por favor, atribua tempo para todas as tarefas e o tempo total deve ser de no máximo 45 minutos!!!",
        "planner-select-reading-writing-strategy-hint": "Por favor, selecione as habilidades que você planeja usar!!!",
        "planner-save-plan-hint": "Por favor, preencha todos os nomes das estratégias e o tempo correto!!!",

        "rule-based-scaffold-title-1": "É importante entender do que se trata a tarefa.",
        "rule-based-scaffold-title-1-task-1": "(a) Use o menu para ter uma visão geral e passar os olhos pelo texto",
        "rule-based-scaffold-title-1-task-2": "(b) Verifique a rubrica de redação",
        "rule-based-scaffold-title-1-task-3": "(c) Verifique os objetivos de aprendizagem e as instruções",
        "rule-based-scaffold-title-2": "É importante ler informações sobre os tópicos.",
        "rule-based-scaffold-title-2-task-1": "(a) Anote informações importantes",
        "rule-based-scaffold-title-2-task-2": "(b) Selecione o que ler",
        "rule-based-scaffold-title-2-task-3": "(c) Verifique o tempo restante",
        "rule-based-scaffold-title-3": "É importante ler informações relevantes e revisar sua leitura.",
        "rule-based-scaffold-title-3-task-1": "(a) Revise anotações para verificar o aprendizado até agora",
        "rule-based-scaffold-title-3-task-2": "(b) Revise os objetivos de aprendizagem e as instruções",
        "rule-based-scaffold-title-3-task-3": "(c) Verifique a redação para determinar o que ler em seguida",
        "rule-based-scaffold-title-4": "É importante escrever uma boa redação.",
        "rule-based-scaffold-title-4-task-1": "(a) Verifique o tempo restante",
        "rule-based-scaffold-title-4-task-2": "(b) Verifique a rubrica de redação",
        "rule-based-scaffold-title-4-task-3": "(c) Faça um rascunho da redação transferindo seus aprendizados para os principais pontos do texto.",
        "rule-based-scaffold-title-5": "É importante escrever informações relevantes e verificar sua escrita.",
        "rule-based-scaffold-title-5-task-1": "(a) Verifique a rubrica de redação",
        "rule-based-scaffold-title-5-task-2": "(b) Edite sua redação",
        "rule-based-scaffold-title-5-task-3": "(c) Verifique os objetivos de aprendizagem e as instruções",

        "annotation-label-1": "Tomar nota",
        "annotation-label-2": "importante",
        "annotation-label-3": "útil",
        "annotation-label-4": "conceito",
        "annotation-label-5": "confuso",
    },
    ar: {
        // "index-title": "This is a test page",
        // "button-title": "hello",
        "annotation-notes-title": "لوحة الملاحظات",
        "annotation-write-note-placeholder": "أكتب ملاحظات هنا...",
        "annotation-tag-placeholder": "أدخل علامات (تسميات) جديدة واضغط على Enter...",
        'annotation-note-save-btn-text': 'حفظ',
        'annotation-note-cancel-btn-text': 'إلغاء',
        "annotation-search-btn-text": "بحث ",
        "annotation-search-panel-input-placeholder": "أدخل الكلمات الرئيسية للبحث...",

        "scaffolding-title": "لوحة التعليمات ",
        "scaffolding-create-checklist-btn-text": "إنشاء قائمة المهام",
        "scaffolding-edit-checklist-btn-text": "يحرر (تعديل)",
        "scaffolding-unread-message-text": " رسالة غير مقروءة ",

        "gpt-scaffolding-title": "لوحة التعليمات",

        "planner-title": "أداة التخطيط",
        "planner-learning-strategy-select-label-text": "1. يرجى وضع خطة لاستراتيجية التعلم الخاصة بك:",
        "planner-learning-strategy-select-option1-text": "اختر استراتيجية",
        "planner-learning-strategy-select-customise-option-text": "استخدم استراتيجيتك الخاصة",
        "planner-add-more-customise-strategy-btn-text": "أضف المزيد من الإستراتيجيات",
        "planner-customise-option-hint-textarea-placeholder": "يرجى توضيح سبب تصميم هذه الخطة (الاستراتيجية)؟",
        "planner-next-btn-text": "التالي",

        "planner-display-plan-title": "خطة التعلم الخاصة بي",
        "planner-display-overall-strategy-label": "الاستراتيجية الشاملة:",
        "planner-display-time-allocation-label": "تخصيص الوقت:",
        "planner-display-writing-strategy-label": "استراتيجية الكتابة:",
        "planner-display-reading-strategy-label": "استراتيجية القراءة:",
        "planner-customise-plan-reason-placeholder": "(اختياري)",

        "essay-title": "أداة كتابة المقال",
        "essay-save-btn-text": "حفظ المقال",
        "essay-writing-placeholder": "أكتب مقال هنا...",
        "essay-show-word-count-btn-text": "إظهار عدد الكلمات",
        "essay-save-toast-text": "تم حفظ مقالتك!",

        "dictionary-title": "أداة القاموس",
        "dictionary-send-btn-text": "ارسال",
        "dictionary-panel-input-placeholder": "الرجاء إدخال كلمة استعلام (البحث)...",

        "checklist-title": "أداة قائمة المهام",
        "checklist-basic-panel-title": "أساسي",
        "checklist-academic-panel-title": "أكاديمي",
        "checklist-originality-panel-title": "أصالة النص (أن تبتكر أفكار جديدة في مقالتك)",
        "checklist-integration-panel-title": "التكامل والتفصيل (التوضيح والتنظيم)",
        "checklist-analyse-btn-text": "تحليل",

        "chatgpt-title": "أداة الدردشة (تشات جي بي تي)",
        "chatgpt-send-btn-text": "ارسال",
        "chatgpt-panel-input-placeholder": "أطرح سؤال...",

        "chatteacher-title": "أداة اسأل المعلم",
        "chatteacher-panel-input-placeholder": "طرح سؤال...",
        "chatteacher-connect-server-status-text": " حالة الاتصال بالخادم",
        "chatteacher-teacher-online-status-text": "حالة المعلم على الانترنت",
        "chatteacher-send-btn-text": "ارسال",

        "chatgpt-role-description": "أنت مساعد جيد، يرجى الإجابة على الأسئلة استنادًا إلى النص المقدم.",
        "gpt-scaffold-need-check-srl-prompt-CMTR2": "لدينا طالب واحد يعمل حاليًا على هذه المهمة التعليمية. كان الطلاب الآخرون الذين أدوا جيدًا في هذه المهمة يتحققون باستمرار من تعليمات المهمة والمعايير حتى الدقيقة الرابعة عشرة من جلسة التعلم.  لم ينطبق هذا الأمر على هذا الطالب. لذلك، مع الأخذ بعين الاعتبار جميع المعلومات المقدمة أعلاه (بما في ذلك متطلبات المهمة، والمعايير، ومواد القراءة)، ونظرًا لظروف التعلم الخاصة بالطالب المذكورة أعلاه، يُرجى تقديم تعليقات للطالب بأسلوب فقرات حول كيفية التحقق من تعليمات المهمة والمعايير (آلية التقييم) بانتظام حتى نهاية جلسة الكتابة.",
        "gpt-scaffold-need-check-srl-prompt-OR2": "لدينا طالب واحد يعمل حاليًا على هذه المهمة التعليمية. بدأ الطلاب الآخرون الذين أدوا جيدًا في هذه المهمة بالفعل في تضمين بعض المعلومات من نصوص القراءة في مقالاتهم حتى الدقيقة الحادية والعشرين من جلسة التعلم. لم ينطبق هذا الأمر على هذا الطالب. لذا، مع الأخذ في الاعتبار جميع المعلومات المقدمة أعلاه (بما في ذلك متطلبات المهمة والمعايير ومحتوى القراءة)، ونظرًا لظروف التعلم الخاصة بالطالب المذكورة أعلاه، يُرجى تقديم تعليقات للطالب بأسلوب فقرات حول كيفية تضمين المعلومات من نصوص القراءة في مسودة مقاله، بالاستناد إلى متطلبات المهمة.",
        "gpt-scaffold-need-check-srl-prompt-OT2": "لدينا طالب واحد يعمل حاليًا على هذه المهمة التعليمية. كان الطلاب الآخرون الذين أدوا جيدًا في هذه المهمة قد بدأوا بالفعل في إضافة معلومات جديدة باستخدام مفرداتهم الخاصة حتى الدقيقة الثامنة والعشرين من جلسة التعلم، استنادًا إلى مواد (محتوى) القراءة. يبدو أن هذا الأمر لم ينطبق على هذا الطالب. لذلك، مع الأخذ في الاعتبار جميع المعلومات المقدمة أعلاه (بما في ذلك متطلبات المهمة، والمعايير، ومواد القراءة)، ونظرًا لظروف التعلم الخاصة بالطالب المذكورة أعلاه، يُرجى تقديم ملاحظات للطالب بأسلوب فقرات حول كيفية تزويد (اثراء) المعلومات التي استخدمها من مواد القراءة. يجب على الطالب أن يقوم بذلك باستخدام مفرداته الخاصة.",
        "gpt-scaffold-user-take-pre-study-prompt": "هذا الطالب شارك في الدراسة السابقة لذا فهو/هي يمتلك مستوى معين من المعرفة بالمهمة.",
        "gpt-scaffold-isdimu-prompt-0":"هذا الطالب يمتلك فهمًا كبيراً للعديد من الاستراتيجيات أو التقنيات التي يمكن تطبيقها لتسهيل التعلم.",
        "gpt-scaffold-isdimu-prompt-16":"هذا الطالب يمتلك فهمًا منخفضًا عن الاستراتيجيات أو التقنيات التي يمكن تطبيقها لتسهيل التعلم.",
        "gpt-scaffold-isdimu-prompt-32":"يبدو أن هذا الطالب يمتلك بعض الفهم عن الاستراتيجيات أو التقنيات التي يمكن تطبيقها لتسهيل التعلم.",
        "gpt-scaffold-pretest-grades-prompt-0": "هذا الطالب يمتلك معرفة عالية بالذكاء الاصطناعي والذكاء الاصطناعي في مجال الطب.",
        "gpt-scaffold-pretest-grades-prompt-5": "هذا الطالب يمتلك معرفة منخفضة بالذكاء الاصطناعي والذكاء الاصطناعي في مجال الطب.",
        "gpt-scaffold-pretest-grades-prompt-10": "هذا الطالب يمتلك معرفة متوسطة بالذكاء الاصطناعي والذكاء الاصطناعي في مجال الطب.",

        "gpt-scaffold-test-isdimu-name": "Activity 3: knowledge in learning tactics",
        "gpt-scaffold-pretest-name": "Activity 2: knowledge test - AI in medicine",
        "gpt-scaffold-check-take-previous-study-name": "Activity 1: about yourself",
        "gpt-scaffold-planner-select-prompt-1": "هذا الطالب وضع خطة لهذه المهمة تتضمن [القراءة أولًا ثم الكتابة].",
        "gpt-scaffold-planner-select-prompt-2": "هذا الطالب وضع خطة لهذه المهمة تتضمن [القراءة والكتابة في نفس الوقت].",
        "gpt-scaffold-planner-select-prompt-3": "هذا الطالب وضع خطة لهذه المهمة تتضمن [الكتابة المكثفة والقراءة الانتقائية].",
        "gpt-scaffold-planner-select-prompt-4": "هذا الطالب قام بتصميم خطته الخاصة لهذه المهمة.",
        "gpt-scaffold-need-check-subaction-prompt-SAVE_PLANNER-not-exist": "هذا الطالب لم يضع خطة واضحة لكيفية أدائه للمهمة.",
        "gpt-scaffold-need-check-subaction-prompt-SAVE_PLANNER-exist": "هذا الطالب قام بوضع خطة واضحة لكيفية أدائه للمهمة.",
        "gpt-scaffold-need-check-subaction-prompt-TIMER-not-exist": "هذا الطالب غير مدرك للوقت المتبقي لإتمام المهمة.",
        "gpt-scaffold-need-check-subaction-prompt-TIMER-exist": "هذا الطالب يعلم الوقت المتبقي لإتمام المهمة.",
        "gpt-scaffold-need-check-subaction-prompt-TRY_OUT_TOOLS-not-exist": "هذا الطالب لا يعلم عن الأدوات المتوفرة في النظام التي قد تساعده على إكمال المهمة.",
        "gpt-scaffold-need-check-subaction-prompt-TRY_OUT_TOOLS-exist": "هذا الطالب يعلم عن الأدوات المتوفرة في النظام التي قد تساعده على إكمال المهمة.",
        "gpt-scaffold-need-check-subaction-prompt-PAGE_NAVIGATION-not-exist": "هذا الطالب لا يعلم عن النصوص المتوفرة للقراءة في النظام والتي قد تساعده في أداء المهمة.",
        "gpt-scaffold-need-check-subaction-prompt-PAGE_NAVIGATION-exist": "هذا الطالب يعلم عن النصوص المتوفرة للقراءة في النظام والتي قد تساعده في أداء المهمة.",
        "gpt-scaffold-need-check-subaction-prompt-RUBRIC-not-exist": "هذا الطالب لا يعرف المعايير (آلية التقييم).",
        "gpt-scaffold-need-check-subaction-prompt-RUBRIC-exist": "هذا الطالب يعلم عن المعايير (آلية التقييم).",
        "gpt-scaffold-need-check-subaction-prompt-TASK_REQUIREMENT-not-exist": "هذا الطالب لا يعرف تعليمات المهمة.",
        "gpt-scaffold-need-check-subaction-prompt-TASK_REQUIREMENT-exist": "هذا الطالب يعلم عن تعليمات المهمة.",
        "gpt-scaffold-role-description": "أنت مساعد جيد، يرجى تقديم الاقتراحات استنادًا إلى النص المعطى.",

        "planner-customise-step2-instruction": "من فضلك، قم بوصف بالتفصيل الاستراتيجية التعليمية التي تخطط لأعتمادها وكيف ستخصص وقتك. يمكنك أيضًا توضيح اسباب أختيار الاستراتيجية وتخصيص وقت لها.",
        "planner-reading-strategy-1": "اقرأ مواد القراءه صفحة بصفحة.",
        "planner-reading-strategy-2": "تصفح سريع ثم قراءة مفصلة.",
        // "planner-reading-strategy-3": "Use the highlight tool to mark key content",
        // "planner-reading-strategy-4": "Write down my understanding in notes while reading",
        // "planner-reading-strategy-5": "Question-guided reading with focus on certain content",
        "planner-reading-strategy-3": "اقرأ بشكل انتقائي وتجاهل المحتوى غير ذي صلة",
        "planner-reading-strategy-instruction": "أي من مهارات القراءة تخطط لاستخدامها؟ (اختيار متعدد)",

        "planner-writing-strategy-1": "قم أولاً بصياغة اجزاء (هيكل) المقالة، ثم املأه بالتفاصيل.",
        // "planner-writing-strategy-2": "Use my notes and highlighting when writing the essay",
        "planner-writing-strategy-2": "قم بمراجعة التعليمات والمعايير لتحقيق التناسب في الكتابة",
        "planner-writing-strategy-3": "انسخ الجمل الرئيسية ومن ثم أعيد صياغتها بطريقة سلسة.",
        // "planner-writing-strategy-5": "Use the writing framework and patterns I have learned to write",
        "planner-writing-strategy-instruction": "أي مهارات قراءة تخطط لاستخدامها؟ (اختيار متعدد)",

        "planner-main-strategy-1": "اقرأ أولاً، ثم اكتب",
        "planner-main-strategy-1-instruction": "كم من الوقت تخطط لقضائه على القراءة والكتابة على التوالي؟",
        "planner-main-strategy-1-task-1": "اقرأ الوحدة الأولى أولاً",
        "planner-main-strategy-1-task-2": "اقرأ الوحدة الثانية",
        "planner-main-strategy-1-task-3": "اقرأ الوحدة الثالثة",
        "planner-main-strategy-1-task-4": "اكتب مقالًا",
        "planner-main-strategy-2": "اقرأ واكتب في نفس الوقت",
        "planner-main-strategy-2-instruction": "كم من الوقت تخطط لقضائه على كل موضوع؟",
        "planner-main-strategy-2-task-1": "اقرأ/اكتب حول الوحدة الأولى",
        "planner-main-strategy-2-task-2": "اقرأ/اكتب حول الوحدة الثانية",
        "planner-main-strategy-2-task-3": "اقرأ/اكتب حول الوحدة الثالثة",

        "planner-main-strategy-3": "اكتب بشكل مكثف، اقرأ بانتقاء",
        "planner-main-strategy-3-instruction": "كم من الوقت تخطط لقضائه على مراحل مختلفة من عملية الكتابة؟/كم من الوقت تخطط لقضائه على كل مرحلة من مراحل الكتابة؟",
        "planner-main-strategy-3-task-1": "صمم اجزاء المقالة",
        "planner-main-strategy-3-task-2": "اكتب المسودة الأولى",
        "planner-main-strategy-3-task-3": "اقرأ المعلومات الإضافية المتعلقة بالمقالة",
        "planner-main-strategy-3-task-4": "راجع ( نقَّح) وحسِّن المقالة",

        "planner-select-main-strategy-hint": "الرجاء تحديد استراتيجية واحدة للمتابعة!!!",
        "planner-allocate-time-hint": "الرجاء تخصيص وقت لجميع المهام ويجب أن يكون الوقت الإجمالي خلال (ضمن) 45 دقيقة!!!",
        "planner-select-reading-writing-strategy-hint": "الرجاء اختيار المهارات التي تنوي استخدامها!!!",
        "planner-save-plan-hint": "الرجاء ملء أسماء جميع الاستراتيجيات والوقت المناسب لها!!!",

        "rule-based-scaffold-title-1": "من المهم أن نفهم عن ماذا تتحدث / تتعلق المهمة.",
        "rule-based-scaffold-title-1-task-1": "(أ) استخدم القائمة للحصول على نظرة عامة وتصفح النص",
        "rule-based-scaffold-title-1-task-2": "(ب) تحقق من معايير تقييم المقال",
        "rule-based-scaffold-title-1-task-3": "(ج) تحقق من أهداف التعلم والتعليمات",
        "rule-based-scaffold-title-2": "من المهم قراءة المعلومات حول مواضيع المحتوى ( نصوص القراءه)",
        "rule-based-scaffold-title-2-task-1": "(أ) دوّن المعلومات المهمة",
        "rule-based-scaffold-title-2-task-2": "(ب) اختر ما ستقرأ",
        "rule-based-scaffold-title-2-task-3": "(ج) تحقق من الوقت المتبقي",
        "rule-based-scaffold-title-3": "من المهم قراءة المعلومات المتعلقه المحتوى ومراجعة قراءتك.",
        "rule-based-scaffold-title-3-task-1": "(أ) راجع التعليقات التوضيحية للتحقق من التعلم حتى الآن",
        "rule-based-scaffold-title-3-task-2": "(ب) راجع أهداف التعلم والتعليمات",
        "rule-based-scaffold-title-3-task-3": "(ج) تحقق من المقال لتحديد ما يجب قراءته بعد ذلك",
        "rule-based-scaffold-title-4": "من المهم كتابة مقال جيد.",
        "rule-based-scaffold-title-4-task-1": "(أ) تحقق من الوقت المتبقي",
        "rule-based-scaffold-title-4-task-2": "(ب) تحقق من معايير (آليه تقييم) المقال",
        "rule-based-scaffold-title-4-task-3": "(ج) صياغة المقالة من خلال نقل التعلم إلى النقاط الرئيسية",
        "rule-based-scaffold-title-5": "من المهم كتابة المعلومات المتعلقه المحتوى (نصوص القراءه) والتحقق من كتابتك.",
        "rule-based-scaffold-title-5-task-1": "(أ)تحقق من معايير تقييم المقال",
        "rule-based-scaffold-title-5-task-2": "(ب) عدَل مقالتك",
        "rule-based-scaffold-title-5-task-3": "(ج) تحقق من أهداف التعلم والتعليمات",

        "annotation-label-1": "دوّن الملاحظة",
        "annotation-label-2": "مهم",
        "annotation-label-3": "مفيد",
        "annotation-label-4": "مفهوم",
        "annotation-label-5": "مُحيِّر",
    }
}

var annotationNotesTitle = "Notes Panel";
var annotationWriteNotePlaceholder = 'Write notes here...';
var annotationTagPlaceholder = "Input new tags and press Enter...";
var annotationNoteSaveBtnText = "Save";
var annotationNoteCancelBtnText = "Cancel";
var annotationSearchBtnText = "Search";
var annotationSearchPanelInputPlaceholder = "Input keywords to search...";

var scaffoldingTitle = "Instruction Panel";
var scaffoldingCreateChecklistBtnText = "Create Checklist";
var scaffoldingEditChecklistBtnText = "Edit";
var scaffoldingUnreadMessageText = "Unread Message";

var gptScaffoldingTitle = "Instruction Panel";


var plannerTitle = "Planner Tool";
var plannerLearningStrategySelectLabelText = "1. Please make a plan for your learning strategy:";
var plannerLearningStrategySelectOption1Text = "Select a strategy";
var plannerLearningStrategySelectCustomiseOptionText = "Use your own strategy";
var plannerAddMoreCustomiseStrategyBtnText = "Add More Strategy";
var plannerCustomiseOptionHintTextareaPlaceholder = "Please explain why you design this plan?";
var plannerCustomisePlanReasonPlaceholder = "(Optional)";
var plannerNextBtnText = "Next";

var plannerDisplayPlanTitle = "My Learning Plan";
var plannerDisplayOverallStrategyLabel = "Overall strategy:";
var plannerDisplayTimeAllocationLabel = "Time allocation:";
var plannerDisplayWritingStrategyLabel = "Writing strategy:";
var plannerDisplayReadingStrategyLabel = "Reading strategy:";


var essayTitle = "Essay Writing Tool";
var essaySaveBtnText = "Save Essay";
var essayWritingPlaceholder = "Write essay here...";
var essayShowWordCountButtonText = "Show Word Count";
var essaySaveToastText = "Your essay is saved!";

var dictionaryTitle = "Dictionary Tool";
var dictionarySendBtnText = "Send";
var dictionaryPanelInputPlaceholder = "Please input a query word...";

var checklistTitle = "Checklist Tool";
var checklistBasicPanelTitle = "Basic";
var checklistAcademicPanelTitle = "Academic";
var checklistOriginalityPanelTitle = "Originality";
var checklistIntegrationPanelTitle = "Integration and Elaboration";
var checklistAnalyseBtnText = "Analyse";

var chatgptTitle = "Chatgpt Tool";
var assistantTitle = "patient"
var chatgptSendBtnText = "Send";
var chatgptPanelInputPlaceholder = "Ask a question...";

var chatteacherTitle = "Ask Teacher Tool";
var chatTeacherPanelInputPlaceholder = "Ask a question...";
var chatteacherConnectServerStatusText = "Connect server status";
var chatteacherTeacherOnlineStatusText = "Teacher online status";
var chatteacherSendBtnText = "Send";


var mathTitle = "Math Editor";
// var annotationTakeNoteLabel = "Takenote";


// var annotationLabelColors = [];

//
// var ruleBasedScaffoldContent = [];
//
//
// var plannerSelectStrategyHint = "Please select one strategy to continue!!!";
// var plannerAllocateTimeHint = "Please allocate time to all tasks and total time must within required time!!!";
// var plannerSelectSkillsHint = "Please selected skills you plan to use!!!";
// var plannerSavePlanHint = "Please fill all the strategy name and correct time!!!";
//
// var plannerAllStrategy = [];
//
// var defaultStep3ReadingStrategy = [];
// var defaultStep3ReadingInstruction = "What reading skills do you plan to use (multiple choice)?";
// var defaultStep3WritingStrategy = [];
// var defaultStep3WritingInstruction = "What writing skills do you plan to use (multiple choice)?";
// var customiseStep2Instruction = "Please describe in detail the learning strategy you plan to adopt and how you will allocate your time. You may also include the reasons for the strategy and time allocation.";
//
// var gptScaffoldRoleDescription = "You are a helpful assistant, please give suggestions based on the given text.";
// var gptScaffoldPromptTemplate = "";
//
// var gptScaffoldNeedCheckSubActionPrompt = [];
// var gptScaffoldNeedCheckSavePlannerSelectIndexPrompt = [];
//
// var testISDIMUName = "Activity 3: knowledge in learning tactics";
// var preTestName = "Activity 2: knowledge test - AI in medicine";
// var hasTakePreviousStudyTestName = "Activity 1: about yourself";
// var pretestGradesPrompt = [];
// var isdimuScorePrompt = [];
// var userTakePreviousStudyPrompt = "This student has participated in the prior study so he/she has a certain level of task knowledge.";
// var gptScaffoldNeedCheckSRLProcessPrompt = [];
// var chatgptRoleDescription = "You are a helpful assistant and please answers questions based on the provided text.";


// 语言切换函数
function change_lang(lang_key){
    // var a = document.querySelectorAll('[language]');
    // console.log(a)
    // a.forEach(function (item) {
    //     var key = item.getAttribute("language");
    //     item.innerHTML = lang[lang_key][key];
    // });
    if (lang[lang_key] === null) {
        return;
    }

    annotationNotesTitle = lang[lang_key]["annotation-notes-title"] || lang["en"]["annotation-notes-title"];
    annotationWriteNotePlaceholder = lang[lang_key]["annotation-write-note-placeholder"] || lang["en"]["annotation-write-note-placeholder"];
    annotationTagPlaceholder = lang[lang_key]["annotation-tag-placeholder"] || lang["en"]["annotation-tag-placeholder"];
    annotationNoteSaveBtnText = lang[lang_key]["annotation-note-save-btn-text"] || lang["en"]["annotation-note-save-btn-text"];
    annotationNoteCancelBtnText = lang[lang_key]["annotation-note-cancel-btn-text"] || lang["en"]["annotation-note-cancel-btn-text"];

    annotationSearchBtnText = lang[lang_key]["annotation-search-btn-text"] || lang["en"]["annotation-search-btn-text"];
    annotationSearchPanelInputPlaceholder = lang[lang_key]["annotation-search-panel-input-placeholder"] || lang["en"]["annotation-search-panel-input-placeholder"];

    scaffoldingTitle = lang[lang_key]["scaffolding-title"] || lang["en"]["scaffolding-title"];
    scaffoldingCreateChecklistBtnText = lang[lang_key]["scaffolding-create-checklist-btn-text"] || lang["en"]["scaffolding-create-checklist-btn-text"];
    scaffoldingEditChecklistBtnText = lang[lang_key]["scaffolding-edit-checklist-btn-text"] || lang["en"]["scaffolding-edit-checklist-btn-text"];
    scaffoldingUnreadMessageText = lang[lang_key]["scaffolding-unread-message-text"] || lang["en"]["scaffolding-unread-message-text"];

    gptScaffoldingTitle = lang[lang_key]["gpt-scaffolding-title"] || lang["en"]["gpt-scaffolding-title"];

    plannerTitle = lang[lang_key]["planner-title"] || lang["en"]["planner-title"];
    plannerLearningStrategySelectLabelText = lang[lang_key]["planner-learning-strategy-select-label-text"] || lang["en"]["planner-learning-strategy-select-label-text"];
    plannerLearningStrategySelectOption1Text = lang[lang_key]["planner-learning-strategy-select-option1-text"] || lang["en"]["planner-learning-strategy-select-option1-text"];
    plannerLearningStrategySelectCustomiseOptionText = lang[lang_key]["planner-learning-strategy-select-customise-option-text"] || lang["en"]["planner-learning-strategy-select-customise-option-text"];
    plannerAddMoreCustomiseStrategyBtnText = lang[lang_key]["planner-add-more-customise-strategy-btn-text"] || lang["en"]["planner-add-more-customise-strategy-btn-text"];
    plannerCustomiseOptionHintTextareaPlaceholder = lang[lang_key]["planner-customise-option-hint-textarea-placeholder"] || lang["en"]["planner-customise-option-hint-textarea-placeholder"];
    plannerNextBtnText = lang[lang_key]["planner-next-btn-text"] || lang["en"]["planner-next-btn-text"];

    plannerDisplayPlanTitle = lang[lang_key]["planner-display-plan-title"] || lang["en"]["planner-display-plan-title"];
    plannerDisplayOverallStrategyLabel = lang[lang_key]["planner-display-overall-strategy-label"] || lang["en"]["planner-display-overall-strategy-label"];
    plannerDisplayTimeAllocationLabel = lang[lang_key]["planner-display-time-allocation-label"] || lang["en"]["planner-display-time-allocation-label"];
    plannerDisplayWritingStrategyLabel = lang[lang_key]["planner-display-writing-strategy-label"] || lang["en"]["planner-display-writing-strategy-label"];
    plannerDisplayReadingStrategyLabel = lang[lang_key]["planner-display-reading-strategy-label"] || lang["en"]["planner-display-reading-strategy-label"];
    plannerCustomisePlanReasonPlaceholder = lang[lang_key]["planner-customise-plan-reason-placeholder"] || lang["en"]["planner-customise-plan-reason-placeholder"];

    essayTitle = lang[lang_key]["essay-title"] || lang["en"]["essay-title"];
    essaySaveBtnText = lang[lang_key]["essay-save-btn-text"] || lang["en"]["essay-save-btn-text"];
    essayWritingPlaceholder = lang[lang_key]["essay-writing-placeholder"] || lang["en"]["essay-writing-placeholder"];
    essayShowWordCountButtonText = lang[lang_key]["essay-show-word-count-btn-text"] || lang["en"]["essay-show-word-count-btn-text"];
    essaySaveToastText = lang[lang_key]["essay-save-toast-text"] || lang["en"]["essay-save-toast-text"];

    dictionaryTitle = lang[lang_key]["dictionary-title"] || lang["en"]["dictionary-title"];
    dictionarySendBtnText = lang[lang_key]["dictionary-send-btn-text"] || lang["en"]["dictionary-send-btn-text"];
    dictionaryPanelInputPlaceholder = lang[lang_key]["dictionary-panel-input-placeholder"] || lang["en"]["dictionary-panel-input-placeholder"];

    checklistTitle = lang[lang_key]["checklist-title"] || lang["en"]["checklist-title"];
    checklistBasicPanelTitle = lang[lang_key]["checklist-basic-panel-title"] || lang["en"]["checklist-basic-panel-title"];
    checklistAcademicPanelTitle = lang[lang_key]["checklist-academic-panel-title"] || lang["en"]["checklist-academic-panel-title"];
    checklistOriginalityPanelTitle = lang[lang_key]["checklist-originality-panel-title"] || lang["en"]["checklist-originality-panel-title"];
    checklistIntegrationPanelTitle = lang[lang_key]["checklist-integration-panel-title"] || lang["en"]["checklist-integration-panel-title"];
    checklistAnalyseBtnText = lang[lang_key]["checklist-analyse-btn-text"] || lang["en"]["checklist-analyse-btn-text"];

    chatgptTitle = lang[lang_key]["chatgpt-title"] || lang["en"]["chatgpt-title"];
    chatgptSendBtnText = lang[lang_key]["chatgpt-send-btn-text"] || lang["en"]["chatgpt-send-btn-text"];
    chatgptPanelInputPlaceholder = lang[lang_key]["chatgpt-panel-input-placeholder"] || lang["en"]["chatgpt-panel-input-placeholder"];

    chatteacherTitle = lang[lang_key]["chatteacher-title"] || lang["en"]["chatteacher-title"];
    chatTeacherPanelInputPlaceholder = lang[lang_key]["chatteacher-panel-input-placeholder"] || lang["en"]["chatteacher-panel-input-placeholder"];
    chatteacherConnectServerStatusText = lang[lang_key]["chatteacher-connect-server-status-text"] || lang["en"]["chatteacher-connect-server-status-text"];
    chatteacherTeacherOnlineStatusText = lang[lang_key]["chatteacher-teacher-online-status-text"] || lang["en"]["chatteacher-teacher-online-status-text"];
    chatteacherSendBtnText = lang[lang_key]["chatteacher-send-btn-text"] || lang["en"]["chatteacher-send-btn-text"];

    if (typeof annotationTakeNoteLabel === 'undefined') {
        window.annotationTakeNoteLabel = lang[lang_key]["annotation-label-1"] || lang["en"]["annotation-label-1"];
    }
    if (typeof annotationLabelColors === 'undefined') {
        window.annotationLabelColors = [];
        annotationLabelColors.push({annotationLabel: lang[lang_key]["annotation-label-2"] || lang["en"]["annotation-label-2"], annotationLabelColor: '#99CCFF'});
        annotationLabelColors.push({annotationLabel: lang[lang_key]["annotation-label-3"] || lang["en"]["annotation-label-2"], annotationLabelColor: '#CCFFCC'});
        annotationLabelColors.push({annotationLabel: lang[lang_key]["annotation-label-4"] || lang["en"]["annotation-label-3"], annotationLabelColor: '#FFCCE5'});
        annotationLabelColors.push({annotationLabel: lang[lang_key]["annotation-label-5"] || lang["en"]["annotation-label-4"], annotationLabelColor: '#75ff66'});
    }
    if (typeof ruleBasedScaffoldContent === 'undefined') {
        window.ruleBasedScaffoldContent = [];
        ruleBasedScaffoldContent.push({
            triggerMinute: 2,
            title: lang[lang_key]["rule-based-scaffold-title-1"] || lang["en"]["rule-based-scaffold-title-1"],
            content: [lang[lang_key]["rule-based-scaffold-title-1-task-1"] || lang["en"]["rule-based-scaffold-title-1-task-1"], lang[lang_key]["rule-based-scaffold-title-1-task-2"] || lang["en"]["rule-based-scaffold-title-1-task-2"], lang[lang_key]["rule-based-scaffold-title-1-task-3"] || lang["en"]["rule-based-scaffold-title-1-task-3"]],
        });
        ruleBasedScaffoldContent.push({
            triggerMinute: 7,
            title: lang[lang_key]["rule-based-scaffold-title-2"] || lang["en"]["rule-based-scaffold-title-2"],
            content: [lang[lang_key]["rule-based-scaffold-title-2-task-1"] || lang["en"]["rule-based-scaffold-title-2-task-1"], lang[lang_key]["rule-based-scaffold-title-2-task-2"] || lang["en"]["rule-based-scaffold-title-2-task-2"], lang[lang_key]["rule-based-scaffold-title-2-task-3"] || lang["en"]["rule-based-scaffold-title-2-task-3"]],
        });
        ruleBasedScaffoldContent.push({
            triggerMinute: 16,
            title: lang[lang_key]["rule-based-scaffold-title-3"] || lang["en"]["rule-based-scaffold-title-3"],
            content: [lang[lang_key]["rule-based-scaffold-title-3-task-1"] || lang["en"]["rule-based-scaffold-title-3-task-1"], lang[lang_key]["rule-based-scaffold-title-3-task-2"] || lang["en"]["rule-based-scaffold-title-3-task-2"], lang[lang_key]["rule-based-scaffold-title-3-task-3"] || lang["en"]["rule-based-scaffold-title-3-task-3"]],
        });
        ruleBasedScaffoldContent.push({
            triggerMinute: 21,
            title: lang[lang_key]["rule-based-scaffold-title-4"] || lang["en"]["rule-based-scaffold-title-4"],
            content: [lang[lang_key]["rule-based-scaffold-title-4-task-1"] || lang["en"]["rule-based-scaffold-title-4-task-1"], lang[lang_key]["rule-based-scaffold-title-4-task-2"] || lang["en"]["rule-based-scaffold-title-4-task-2"], lang[lang_key]["rule-based-scaffold-title-4-task-3"] || lang["en"]["rule-based-scaffold-title-4-task-3"]],
        });
        ruleBasedScaffoldContent.push({
            triggerMinute: 35,
            title: lang[lang_key]["rule-based-scaffold-title-5"] || lang["en"]["rule-based-scaffold-title-5"],
            content: [lang[lang_key]["rule-based-scaffold-title-5-task-1"] || lang["en"]["rule-based-scaffold-title-5-task-1"], lang[lang_key]["rule-based-scaffold-title-5-task-2"] || lang["en"]["rule-based-scaffold-title-5-task-2"], lang[lang_key]["rule-based-scaffold-title-5-task-3"] || lang["en"]["rule-based-scaffold-title-5-task-3"]],
        });
    }
    if (typeof plannerSelectStrategyHint === 'undefined') {
        window.plannerSelectStrategyHint = lang[lang_key]["planner-select-main-strategy-hint"] || lang["en"]["planner-select-main-strategy-hint"];
    }
    if (typeof plannerAllocateTimeHint === 'undefined') {
        window.plannerAllocateTimeHint = lang[lang_key]["planner-allocate-time-hint"] || lang["en"]["planner-allocate-time-hint"];
    }

    if (typeof plannerSelectSkillsHint === 'undefined') {
        window.plannerSelectSkillsHint = lang[lang_key]["planner-select-reading-writing-strategy-hint"] || lang["en"]["planner-select-reading-writing-strategy-hint"];
    }

    if (typeof plannerSavePlanHint === 'undefined') {
        window.plannerSavePlanHint = lang[lang_key]["planner-save-plan-hint"] || lang["en"]["planner-save-plan-hint"];
    }

    if (typeof plannerAllStrategy === 'undefined') {
        window.plannerAllStrategy = [];
        plannerAllStrategy.push({
            "plannerOverallStrategy": lang[lang_key]["planner-main-strategy-1"] || lang["en"]["planner-main-strategy-1"],
            "plannerStrategyInstruction": lang[lang_key]["planner-main-strategy-1-instruction"] || lang["en"]["planner-main-strategy-1-instruction"],
            "plannerStep2Task": [
                {"title": lang[lang_key]["planner-main-strategy-1-task-1"] || lang["en"]["planner-main-strategy-1-task-1"], "time": 5},
                {"title": lang[lang_key]["planner-main-strategy-1-task-2"] || lang["en"]["planner-main-strategy-1-task-2"], "time": 5},
                {"title": lang[lang_key]["planner-main-strategy-1-task-3"] || lang["en"]["planner-main-strategy-1-task-3"], "time": 5},
                {"title": lang[lang_key]["planner-main-strategy-1-task-4"] || lang["en"]["planner-main-strategy-1-task-4"], "time": 5},
            ],
        });
        plannerAllStrategy.push({
            "plannerOverallStrategy": lang[lang_key]["planner-main-strategy-2"] || lang["en"]["planner-main-strategy-2"],
            "plannerStrategyInstruction": lang[lang_key]["planner-main-strategy-2-instruction"] || lang["en"]["planner-main-strategy-2-instruction"],
            "plannerStep2Task": [
                {"title": lang[lang_key]["planner-main-strategy-2-task-1"] || lang["en"]["planner-main-strategy-2-task-1"], "time": 5},
                {"title": lang[lang_key]["planner-main-strategy-2-task-2"] || lang["en"]["planner-main-strategy-2-task-2"], "time": 5},
                {"title": lang[lang_key]["planner-main-strategy-2-task-3"] || lang["en"]["planner-main-strategy-2-task-3"], "time": 5},
            ],
        });
        plannerAllStrategy.push({
            "plannerOverallStrategy": lang[lang_key]["planner-main-strategy-3"] || lang["en"]["planner-main-strategy-3"],
            "plannerStrategyInstruction": lang[lang_key]["planner-main-strategy-3-instruction"] || lang["en"]["planner-main-strategy-3-instruction"],
            "plannerStep2Task": [
                {"title": lang[lang_key]["planner-main-strategy-3-task-1"] || lang["en"]["planner-main-strategy-3-task-1"], "time": 5},
                {"title": lang[lang_key]["planner-main-strategy-3-task-2"] || lang["en"]["planner-main-strategy-3-task-2"], "time": 5},
                {"title": lang[lang_key]["planner-main-strategy-3-task-3"] || lang["en"]["planner-main-strategy-3-task-3"], "time": 5},
                {"title": lang[lang_key]["planner-main-strategy-3-task-4"] || lang["en"]["planner-main-strategy-3-task-4"], "time": 5},
            ],
        });
    }
    if (typeof defaultStep3ReadingStrategy === 'undefined') {
        window.defaultStep3ReadingStrategy = [];
        defaultStep3ReadingStrategy.push(lang[lang_key]["planner-reading-strategy-1"] || lang["en"]["planner-reading-strategy-1"]);
        defaultStep3ReadingStrategy.push(lang[lang_key]["planner-reading-strategy-2"] || lang["en"]["planner-reading-strategy-2"]);
        defaultStep3ReadingStrategy.push(lang[lang_key]["planner-reading-strategy-3"] || lang["en"]["planner-reading-strategy-3"]);
        if (lang[lang_key]["planner-reading-strategy-4"]) {
            defaultStep3ReadingStrategy.push(lang[lang_key]["planner-reading-strategy-4"]);
        }
        if (lang[lang_key]["planner-reading-strategy-5"]) {
            defaultStep3ReadingStrategy.push(lang[lang_key]["planner-reading-strategy-5"]);
        }
        if (lang[lang_key]["planner-reading-strategy-6"]) {
            defaultStep3ReadingStrategy.push(lang[lang_key]["planner-reading-strategy-6"]);
        }

        // defaultStep3ReadingStrategy.push(lang[lang_key]["planner-reading-strategy-4"] || lang["en"]["planner-reading-strategy-4"]);
        // defaultStep3ReadingStrategy.push(lang[lang_key]["planner-reading-strategy-5"] || lang["en"]["planner-reading-strategy-5"]);
        // defaultStep3ReadingStrategy.push(lang[lang_key]["planner-reading-strategy-6"] || lang["en"]["planner-reading-strategy-6"]);

    }
    if (typeof defaultStep3ReadingInstruction === 'undefined') {
        window.defaultStep3ReadingInstruction = lang[lang_key]["planner-reading-strategy-instruction"] || lang["en"]["planner-reading-strategy-instruction"];
    }

    if (typeof defaultStep3WritingStrategy === 'undefined') {
        window.defaultStep3WritingStrategy = [];
        defaultStep3WritingStrategy.push(lang[lang_key]["planner-writing-strategy-1"] || lang["en"]["planner-writing-strategy-1"]);
        defaultStep3WritingStrategy.push(lang[lang_key]["planner-writing-strategy-2"] || lang["en"]["planner-writing-strategy-2"]);
        defaultStep3WritingStrategy.push(lang[lang_key]["planner-writing-strategy-3"] || lang["en"]["planner-writing-strategy-3"]);

        if (lang[lang_key]["planner-writing-strategy-4"]) {
            defaultStep3WritingStrategy.push(lang[lang_key]["planner-writing-strategy-4"]);
        }
        if (lang[lang_key]["planner-writing-strategy-5"]) {
            defaultStep3WritingStrategy.push(lang[lang_key]["planner-writing-strategy-5"]);
        }
        // defaultStep3WritingStrategy.push(lang[lang_key]["planner-writing-strategy-4"] || lang["en"]["planner-writing-strategy-4"]);
        // defaultStep3WritingStrategy.push(lang[lang_key]["planner-writing-strategy-5"] || lang["en"]["planner-writing-strategy-5"]);

    }
    if (typeof defaultStep3WritingInstruction === 'undefined') {
        window.defaultStep3WritingInstruction = lang[lang_key]["planner-writing-strategy-instruction"] || lang["en"]["planner-writing-strategy-instruction"];
    }
    if (typeof customiseStep2Instruction === 'undefined') {
        window.customiseStep2Instruction = lang[lang_key]["planner-customise-step2-instruction"] || lang["en"]["planner-customise-step2-instruction"];
    }

    if (typeof gptScaffoldRoleDescription === 'undefined') {
        window.gptScaffoldRoleDescription = lang[lang_key]["gpt-scaffold-role-description"] || lang["en"]["gpt-scaffold-role-description"];
    }


    if (typeof gptScaffoldNeedCheckSubActionPrompt === 'undefined') {
        window.gptScaffoldNeedCheckSubActionPrompt = [];

        gptScaffoldNeedCheckSubActionPrompt.push({
            "subAction": "SAVE_PLANNER",
            "notExistPrompt": lang[lang_key]["gpt-scaffold-need-check-subaction-prompt-SAVE_PLANNER-not-exist"] || lang["en"]["gpt-scaffold-need-check-subaction-prompt-SAVE_PLANNER-not-exist"],
            "existPrompt": lang[lang_key]["gpt-scaffold-need-check-subaction-prompt-SAVE_PLANNER-exist"] || lang["en"]["gpt-scaffold-need-check-subaction-prompt-SAVE_PLANNER-exist"],
            "threshold": 0,
            "appearOverThresholdPrompt": "",
            "appearLessThanEqualThresholdPrompt": ""
        });
        gptScaffoldNeedCheckSubActionPrompt.push({
            "subAction": "TIMER",
            "notExistPrompt": lang[lang_key]["gpt-scaffold-need-check-subaction-prompt-TIMER-not-exist"] || lang["en"]["gpt-scaffold-need-check-subaction-prompt-TIMER-not-exist"],
            "existPrompt": lang[lang_key]["gpt-scaffold-need-check-subaction-prompt-TIMER-exist"] || lang["en"]["gpt-scaffold-need-check-subaction-prompt-TIMER-exist"],
            "threshold": 0,
            "appearOverThresholdPrompt": "",
            "appearLessThanEqualThresholdPrompt": ""
        });
        gptScaffoldNeedCheckSubActionPrompt.push({
            "subAction": "TRY_OUT_TOOLS",
            "notExistPrompt": lang[lang_key]["gpt-scaffold-need-check-subaction-prompt-TRY_OUT_TOOLS-not-exist"] || lang["en"]["gpt-scaffold-need-check-subaction-prompt-TRY_OUT_TOOLS-not-exist"],
            "existPrompt": lang[lang_key]["gpt-scaffold-need-check-subaction-prompt-TRY_OUT_TOOLS-exist"] || lang["en"]["gpt-scaffold-need-check-subaction-prompt-TRY_OUT_TOOLS-exist"],
            "threshold": 0,
            "appearOverThresholdPrompt": "",
            "appearLessThanEqualThresholdPrompt": ""
        });
        gptScaffoldNeedCheckSubActionPrompt.push({
            "subAction": "PAGE_NAVIGATION",
            "notExistPrompt": lang[lang_key]["gpt-scaffold-need-check-subaction-prompt-PAGE_NAVIGATION-not-exist"] || lang["en"]["gpt-scaffold-need-check-subaction-prompt-PAGE_NAVIGATION-not-exist"],
            "existPrompt": lang[lang_key]["gpt-scaffold-need-check-subaction-prompt-PAGE_NAVIGATION-exist"] || lang["en"]["gpt-scaffold-need-check-subaction-prompt-PAGE_NAVIGATION-exist"],
            "threshold": 0,
            "appearOverThresholdPrompt": "",
            "appearLessThanEqualThresholdPrompt": ""
        });
        gptScaffoldNeedCheckSubActionPrompt.push({
            "subAction": "RUBRIC",
            "notExistPrompt": lang[lang_key]["gpt-scaffold-need-check-subaction-prompt-RUBRIC-not-exist"] || lang["en"]["gpt-scaffold-need-check-subaction-prompt-RUBRIC-not-exist"],
            "existPrompt": lang[lang_key]["gpt-scaffold-need-check-subaction-prompt-RUBRIC-exist"] || lang["en"]["gpt-scaffold-need-check-subaction-prompt-RUBRIC-exist"],
            "threshold": 0,
            "appearOverThresholdPrompt": "",
            "appearLessThanEqualThresholdPrompt": ""
        });
        gptScaffoldNeedCheckSubActionPrompt.push({
            "subAction": "TASK_REQUIREMENT",
            "notExistPrompt": lang[lang_key]["gpt-scaffold-need-check-subaction-prompt-TASK_REQUIREMENT-not-exist"] || lang["en"]["gpt-scaffold-need-check-subaction-prompt-TASK_REQUIREMENT-not-exist"],
            "existPrompt": lang[lang_key]["gpt-scaffold-need-check-subaction-prompt-TASK_REQUIREMENT-exist"] || lang["en"]["gpt-scaffold-need-check-subaction-prompt-TASK_REQUIREMENT-exist"],
            "threshold": 0,
            "appearOverThresholdPrompt": "",
            "appearLessThanEqualThresholdPrompt": ""
        });
    }

    if (typeof srlProcessBackupPromptList === 'undefined' || srlProcessBackupPromptList.length === 0) {
        window.srlProcessBackupPromptList = [
            {
                "scaffoldNumber": 0,
                "srlProcess": "CMTR2",
                "srlProcessFreqComparison": "",
                "notExistPrompt": lang[lang_key]["gpt-scaffold-need-check-srl-prompt-CMTR2"] || lang["en"]["gpt-scaffold-need-check-srl-prompt-CMTR2"],
                "existPrompt": "",
                "threshold": 0,
                "appearOverThresholdPrompt": "",
                "appearLessThanEqualThresholdPrompt": "",
                "appearOverOther": "",
                "appearLessThanOther": "",
            },
            {
                "scaffoldNumber": 0,
                "srlProcess": "OR2",
                "srlProcessFreqComparison": "",
                "notExistPrompt": lang[lang_key]["gpt-scaffold-need-check-srl-prompt-OR2"] || lang["en"]["gpt-scaffold-need-check-srl-prompt-OR2"],
                "existPrompt": "",
                "threshold": 0,
                "appearOverThresholdPrompt": "",
                "appearLessThanEqualThresholdPrompt": "",
                "appearOverOther": "",
                "appearLessThanOther": "",
            },
            {
                "scaffoldNumber": 0,
                "srlProcess": "OT2",
                "srlProcessFreqComparison": "",
                "notExistPrompt": lang[lang_key]["gpt-scaffold-need-check-srl-prompt-OT2"] || lang["en"]["gpt-scaffold-need-check-srl-prompt-OT2"],
                "existPrompt": "",
                "threshold": 0,
                "appearOverThresholdPrompt": "",
                "appearLessThanEqualThresholdPrompt": "",
                "appearOverOther": "",
                "appearLessThanOther": "",
            },
        ];
    }

   /* if (typeof srlProcessBackupPromptList === 'undefined') {
        window.srlProcessBackupPromptList = [];
        srlProcessBackupPromptList.push({
            "srlProcess": "CMTR2",
            "notExistPrompt": lang[lang_key]["gpt-scaffold-need-check-srl-prompt-CMTR2"] || lang["en"]["gpt-scaffold-need-check-srl-prompt-CMTR2"],
            "existPrompt": "",
            "threshold": 0,
            "appearOverThresholdPrompt": "",
            "appearLessThanEqualThresholdPrompt": ""
        });
        srlProcessBackupPromptList.push({
            "srlProcess": "OR2",
            "notExistPrompt": lang[lang_key]["gpt-scaffold-need-check-srl-prompt-OR2"] || lang["en"]["gpt-scaffold-need-check-srl-prompt-OR2"],
            "existPrompt": "",
            "threshold": 0,
            "appearOverThresholdPrompt": "",
            "appearLessThanEqualThresholdPrompt": ""
        });
        srlProcessBackupPromptList.push({
            "srlProcess": "OT2",
            "notExistPrompt": lang[lang_key]["gpt-scaffold-need-check-srl-prompt-OT2"] || lang["en"]["gpt-scaffold-need-check-srl-prompt-OT2"],
            "existPrompt": "",
            "threshold": 0,
            "appearOverThresholdPrompt": "",
            "appearLessThanEqualThresholdPrompt": ""
        });
    }*/

    if (typeof gptScaffoldNeedCheckSavePlannerSelectIndexPrompt === 'undefined') {
        window.gptScaffoldNeedCheckSavePlannerSelectIndexPrompt = [];
        gptScaffoldNeedCheckSavePlannerSelectIndexPrompt.push("");
        gptScaffoldNeedCheckSavePlannerSelectIndexPrompt.push(lang[lang_key]["gpt-scaffold-planner-select-prompt-1"] || lang["en"]["gpt-scaffold-planner-select-prompt-1"]);
        gptScaffoldNeedCheckSavePlannerSelectIndexPrompt.push(lang[lang_key]["gpt-scaffold-planner-select-prompt-2"] || lang["en"]["gpt-scaffold-planner-select-prompt-2"]);
        gptScaffoldNeedCheckSavePlannerSelectIndexPrompt.push(lang[lang_key]["gpt-scaffold-planner-select-prompt-3"] || lang["en"]["gpt-scaffold-planner-select-prompt-3"]);
        gptScaffoldNeedCheckSavePlannerSelectIndexPrompt.push(lang[lang_key]["gpt-scaffold-planner-select-prompt-4"] || lang["en"]["gpt-scaffold-planner-select-prompt-4"]);
    }

    if (typeof testISDIMUName === 'undefined') {
        window.testISDIMUName = lang[lang_key]["gpt-scaffold-test-isdimu-name"] || lang["en"]["gpt-scaffold-test-isdimu-name"];
    }
    if (typeof preTestName === 'undefined') {
        window.preTestName = lang[lang_key]["gpt-scaffold-pretest-name"] || lang["en"]["gpt-scaffold-pretest-name"];
    }
    if (typeof hasTakePreviousStudyTestName === 'undefined') {
        window.hasTakePreviousStudyTestName = lang[lang_key]["gpt-scaffold-check-take-previous-study-name"] || lang["en"]["gpt-scaffold-check-take-previous-study-name"];
    }


    if (typeof pretestGradesPrompt === 'undefined') {
        window.pretestGradesPrompt = [{"threshold": 0, "prompt": "", "scaffoldSrlProcess": []},
            {"threshold": 5, "prompt": "", "scaffoldSrlProcess": []},
            {"threshold": 10, "prompt": "", "scaffoldSrlProcess": []}];
        pretestGradesPrompt[0].prompt = (lang[lang_key]["gpt-scaffold-pretest-grades-prompt-0"] || lang["en"]["gpt-scaffold-pretest-grades-prompt-0"]);
        pretestGradesPrompt[1].prompt = (lang[lang_key]["gpt-scaffold-pretest-grades-prompt-5"] || lang["en"]["gpt-scaffold-pretest-grades-prompt-5"]);
        pretestGradesPrompt[2].prompt = (lang[lang_key]["gpt-scaffold-pretest-grades-prompt-10"] || lang["en"]["gpt-scaffold-pretest-grades-prompt-10"]);
    }
    if (typeof isdimuScorePrompt === 'undefined') {
        window.isdimuScorePrompt = [{"threshold": 0, "prompt": "", "scaffoldSrlProcess": []},
            {"threshold": 16, "prompt": "", "scaffoldSrlProcess": []},
            {"threshold": 32, "prompt": "", "scaffoldSrlProcess": []}]
        isdimuScorePrompt[0].prompt = (lang[lang_key]["gpt-scaffold-isdimu-prompt-0"] || lang["en"]["gpt-scaffold-isdimu-prompt-0"]);
        isdimuScorePrompt[1].prompt = (lang[lang_key]["gpt-scaffold-isdimu-prompt-16"] || lang["en"]["gpt-scaffold-isdimu-prompt-16"]);
        isdimuScorePrompt[2].prompt = (lang[lang_key]["gpt-scaffold-isdimu-prompt-32"] || lang["en"]["gpt-scaffold-isdimu-prompt-32"]);
    }


    if (typeof userTakePreviousStudyPrompt === 'undefined') {
        window.userTakePreviousStudyPrompt = lang[lang_key]["gpt-scaffold-user-take-pre-study-prompt"] || lang["en"]["gpt-scaffold-user-take-pre-study-prompt"];
    }

    //apply default SRL rules
    // if (typeof gptScaffoldNeedCheckSRLProcessPrompt !== 'undefined' && gptScaffoldNeedCheckSRLProcessPrompt[0].rules.length === 0) {
    //     gptScaffoldNeedCheckSRLProcessPrompt[0].rules.push(
    //         {
    //             "srlProcess": "CMTR2",
    //             "notExistPrompt": lang[lang_key]["gpt-scaffold-need-check-srl-prompt-CMTR2"] || lang["en"]["gpt-scaffold-need-check-srl-prompt-CMTR2"],
    //             "existPrompt": "",
    //             "threshold": 0,
    //             "appearOverThresholdPrompt": "",
    //             "appearLessThanEqualThresholdPrompt": ""
    //         });
    //     gptScaffoldNeedCheckSRLProcessPrompt[1].rules.push(
    //         {
    //             "srlProcess": "OR2",
    //             "notExistPrompt": lang[lang_key]["gpt-scaffold-need-check-srl-prompt-OR2"] || lang["en"]["gpt-scaffold-need-check-srl-prompt-OR2"],
    //             "existPrompt": "",
    //             "threshold": 0,
    //             "appearOverThresholdPrompt": "",
    //             "appearLessThanEqualThresholdPrompt": ""
    //         });
    //     gptScaffoldNeedCheckSRLProcessPrompt[2].rules.push(
    //         {
    //             "srlProcess": "OT2",
    //             "notExistPrompt": "",
    //             "existPrompt": "",
    //             "threshold": 3,
    //             "appearOverThresholdPrompt": "",
    //             "appearLessThanEqualThresholdPrompt": lang[lang_key]["gpt-scaffold-need-check-srl-prompt-OT2"] || lang["en"]["gpt-scaffold-need-check-srl-prompt-OT2"]
    //         });
    // }

    if (typeof chatgptRoleDescription === 'undefined') {
        window.chatgptRoleDescription = lang[lang_key]["chatgpt-role-description"] || lang["en"]["chatgpt-role-description"];
    }

}

if (toolsLanguage == null) {
    toolsLanguage = "en";
}
// console.log("----------tools language----------" + toolsLanguage);
change_lang(toolsLanguage);

// jQuery(function($) {
//     console.log('------done!------')
//     $('.switch-locale').on('click', 'a', function(e) {
//         e.preventDefault();
//         let lang_key = $(this).data('locale');
//         console.log('------don!!!!!!!!!------', lang_key)
//         change_lang(lang_key);
//     });
// });
