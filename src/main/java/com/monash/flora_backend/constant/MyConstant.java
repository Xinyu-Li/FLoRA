package com.monash.flora_backend.constant;

import com.monash.flora_backend.controller.vo.TraceDataVO;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
//@Data
public class MyConstant {

//    public static String CHAT_SERVICE_URL = "https://chat-service.floraproject.org/myapi";  //http://localhost:5000
//    public static String ETHERPAD_API_KEY = "49a6a6329b12c93fa4eff0cfe53257bba064637fe277c1c9a4535d24fa5ef81e";

    public static int BATCH_SIZE = 100;

    public static String ETHERPAD_API_KEY = "d4613401a7a7954334df7f10d1414f7cd6653c6487d1a9feb3c0c0f0db2e65c1";

//    public static String CHAT_SERVICE_URL = "http://localhost:5000";
    public static String CHAT_SERVICE_URL = "https://chat-service.floraproject.org/myapi/"; //中国本地测试使用
    public static String CHAT_SERVICE_CHATGPT_URI = "/chatgpt";
    public static String CHAT_SERVICE_CHATGPT_ASSISTANT_URI = "/chatgpt-assistant";
    public static String CHAT_SERVICE_CHATGPT_ASSISTANT_SCAFFOLD_URI = "/chatgpt-assistant-scaffold";
    public static String CHAT_SERVICE_CHATGPT_ASSISTANT_SCORE_URI = "/chatgpt-assistant-score";
    public static String CHAT_SERVICE_CHATGPT_CONSULT_URI = "/chatgpt-consult";
    public static String CHAT_SERVICE_CHATGPT_MEDIATOR_SCAFFOLD_URI = "/chatgpt-mediator-scaffold";
    public static String CHAT_SERVICE_GPT_SCAFFOLD_URI = "/gpt-scaffold";
//    public static String CHAT_SERVICE_URL = "https://chat-service.floraproject.org/myapi";

    //--------------------------------- used for getting simplified logs------------------------------------------
    public static final Set<String> MOUSE_EVENTS = Set.of("MOUSE_MOVE", "MOUSE_WHEEL");
    public static final Set<String> SUB_ACTION_LABELS = Set.of("TASK_REQUIREMENT", "RUBRIC", "RELEVANT_READING", "RELEVANT_REREADING");
    public static final Set<String> CLOSE_TOOL_LABELS = Set.of("CLOSE_ESSAY", "CLOSE_PLANNER", "CLOSE_ANNOTATION", "OPEN_GPT", "OPEN_GPT_SCAFFOLD", "OPEN_DICTIONARY");
    public static final Set<String> OPEN_TOOL_LABELS = Set.of("OPEN_ESSAY", "OPEN_PLANNER", "OPEN_ANNOTATION", "CREATE_NOTE", "CREATE_HIGHLIGHT", "CLOSE_GPT", "CLOSE_GPT_SCAFFOLD", "CLOSE_DICTIONARY");
    //--------------------------------- used for getting simplified logs ---- end------------------------------------------
//"https://study.floralearn.cn",

    public static final String[] myOrigins = {"http://localhost", "http://localhost:80", "http://localhost:8088", "http://localhost:8080", "http://localhost:8081", "http://localhost:4200", "http://localhost:3000",
            "http://localhost:9001", "https://lak24.floraengine.org", "http://localhost:5000", "https://yidelearn.com", "https://cella-lala.floraengine.org", "https://ar.floraengine.org",
            "https://cella-monash.floraproject.org", "https://nijmegen.floraproject.org",
            "https://www.floraengine.org", "https://test.floraengine.org", "https://oulucella.oulu.fi", "https://flora.cite.hku.hk", "https://ar.floraengine.org", "https://flora.ntcu.edu.tw"};


    public static int ITEM_NUMBER_PER_EXCEL = 100000;

    public final static String KAFKA_TOPIC_TRACE_DATA = "trace-data";
//    public final static String KAFKA_TOPIC_TRACE_EXTRA_DATA = "trace-extra-data";
    public final static String KAFKA_TOPIC_ESSAY = "essay-save-content";
    public static final int REDIS_LINK_EXPIRE_SECONDS = 86400;// 24 hours
    public static int REDIS_EXPIRE_SECONDS = 7200; // second  2 hours
    public final static String REDIS_SCAFFOLD_INFO = "redis-scaffold-info-";
    public final static String REDIS_ACTION_LABEL_LIST = "redis-action-label-list-";
    public final static String REDIS_GPT_CHAT_LOG_LIST = "redis-gpt-handler-log-list-";
    public final static String REDIS_GPT_SCAFFOLD_LIST = "redis-gpt-scaffold-list-";
    public final static String REDIS_TEACHER_CHAT_LOG_LIST = "redis-teacher-handler-log-list-";
    public final static String REDIS_TEMP_TRACE_DATA_LIST = "redis-trace-data-list-";
    public final static String REDIS_SIMPLIFIED_TEMP_TRACE_DATA_LIST = "redis-simplified-trace-data-list-";
    public final static String REDIS_SIMPLIFIED_SUB_ACTION_LIST = "redis-simplified-sub-action-list-";
    public final static String REDIS_ACTION_EXIST_SET = "redis-action-exist-set-";
    public final static String REDIS_PLANNER_SELECT_INDEX = "redis-planner-select-index-";

    public final static String REDIS_GPT_SCAFFOLD_TRIGGER = "redis-gpt-scaffold-";

    public final static String REDIS_TASK_START_TIME = "task-start-time-";

//    public static String INSTRUCTION_FOR_CHAT_GPT = "You are a helpful assistant";

//            "You are a helpful assistant that answers questions based on the provided text. " +
//            "You can only give suggestions for revision but cannot write or summarise the whole essay for students. " +
//            "You can only understand English. " +
//            "If you receive any non-English question or questions that contain non-English language, reply 'Sorry I cannot understand your question, please use English.";
//    public static String BACKGROUND_TEXT_FILE_FOR_CHAT_GPT = "";
//    public static String RUBRIC_TEXT_FOR_CHAT_GPT = "";
    public static Map<String, String> instructionForChatgptMap = new HashMap<>();
    public static Map<String, String> backgroundTextForChatgptMap = new HashMap<>();
    public static Map<String, String> rubricTextForChatgptMap = new HashMap<>();
    public static Map<String, String> COPES_CLASSIFY_BACKGROUND_FILE_MAP = new HashMap<>();


    public static List<TraceDataVO> cacheTryOutToolsOpenList = new ArrayList<>();

//    public static String PRE_DEFINED_GPT_PROMPT = "";
    public static String testAboutYourSelfName = "";
    public static String testISDIMUName = "";
    public static String preTestName = "";
    public static Long preTestCourseId = 0L;
    public static Long testISDIMUCourseId = 0L;
    public static String SRL_MODEL = "maria"; // copes


//    public static String COPES_CLASSIFY_BACKGROUND_FILE = "CELLA_main_task_reading.docx";
//    public static Set<String> INSTRUMENTATION_TOOLS = Set.of("ANNOTATION", "SEARCH_ANNOTATION", "ESSAY", "PLANNER", "GRAMMARLY");
//    public static Set<String> INSTRUMENTATION_TOOLS_OPEN_CLOSE_EVENT = Set.of("OPEN", "CLOSE");

    //User id, Source, access_times
//    public static Map<Long, Map<String, TraceDataVO>> USER_INSTRUMENTATION_TOOLS_USAGE_MAP = new HashMap<>();
    public static final String cachedLinkKeyListName = "-cached-download-links";
    public static final int CUT_ROW = 190000;
    public static final int UPDATE_CACHE_MILSEC = 2000;    // 每2秒向cache里更新当前处理进度
    public static final long MAX_ZIP_SIZE = 3L * 1024L * 1024L * 1024L; // 每3G给zip分个卷
    //map 所有页面事件到action in library
    public static Map<String, String> SUB_ACTION_LABEL_MAP = Map.<String, String>ofEntries(
            Map.entry("TIMER_OPEN", "TIMER"),
            Map.entry("TIMER_ESSAY_TASK_END", "END_TASK"),
            Map.entry("TIMER_ESSAY_TASK_START", "START_TASK"),

            Map.entry("ESSAY_OPEN", "OPEN_ESSAY"),
            Map.entry("ESSAY_CLOSE", "CLOSE_ESSAY"),

            Map.entry("ESSAY_PASTE_TEXT", "PASTE_TEXT_ESSAY"),
            Map.entry("ESSAY_WRITE", "WRITE_ESSAY"),
            Map.entry("ESSAY_SAVE", "SAVE_ESSAY"),

            Map.entry("ESSAY_FOCUS", "WRITE_ESSAY"),
            Map.entry("ESSAY_SELECT_TEXT", "WRITE_ESSAY"),
            Map.entry("ESSAY_BLUR", "WRITE_ESSAY"),
            Map.entry("ESSAY_CHANGE_STYLE", "WRITE_ESSAY"),
            Map.entry("ESSAY_CLICK", "WRITE_ESSAY"),


            //当鼠标在写作框区域移动时候，所有移动和滚动行为都标注为WRITE_ESSAY

//            Map.entry("ESSAY_SAVE_WHEN_LEAVE_PAGE", "SAVE_ESSAY"),
            Map.entry("ESSAY_CHECK_WORD_COUNT", "CHECK_WORD_COUNT"),


            Map.entry("SEARCH_ANNOTATION_WRITE_KEYWORD", "SEARCH_ANNOTATION"),
            Map.entry("SEARCH_ANNOTATION_SEARCH_KEYWORD", "SEARCH_ANNOTATION"),
            Map.entry("SEARCH_ANNOTATION_SEARCH_INPUT_FOCUS", "SEARCH_ANNOTATION"),
            Map.entry("SEARCH_ANNOTATION_SEARCH_INPUT_BLUR", "SEARCH_ANNOTATION"),
            Map.entry("SEARCH_ANNOTATION_OPEN", "SEARCH_ANNOTATION"),
            Map.entry("SEARCH_ANNOTATION_CLOSE", "SEARCH_ANNOTATION"),
            Map.entry("SEARCH_ANNOTATION_CLICK", "SEARCH_ANNOTATION"),
            Map.entry("SEARCH_ANNOTATION_SELECT_TEXT", "SEARCH_ANNOTATION"),


            Map.entry("ANNOTATION_CREATE_NOTE", "CREATE_NOTE"),
            Map.entry("ANNOTATION_CREATE_NOTE_SAVE", "CREATE_NOTE"), //点击create note label之后，再点击save note button
            Map.entry("ANNOTATION_CANCEL_CREATE_NOTE_SAVE", "CREATE_NOTE"), //点击create note label之后，再点击cancel note button 此处自动save

            Map.entry("ANNOTATION_CREATE_HIGHLIGHT", "CREATE_HIGHLIGHT"),
            Map.entry("ANNOTATION_OPEN", "READ_ANNOTATION"),
            Map.entry("ANNOTATION_CLOSE", "CLOSE_ANNOTATION"),

            Map.entry("ANNOTATION_CLICK", "READ_ANNOTATION"),
            Map.entry("ANNOTATION_SELECT_TEXT", "READ_ANNOTATION"),


            Map.entry("ANNOTATION_SAVE_LABEL", "LABEL_ANNOTATION"),
            Map.entry("ANNOTATION_DELETE_LABEL", "LABEL_ANNOTATION"),
            Map.entry("ANNOTATION_LABEL_INPUT_FOCUS", "LABEL_ANNOTATION"),
            Map.entry("ANNOTATION_LABEL_INPUT_BLUR", "LABEL_ANNOTATION"),
            Map.entry("ANNOTATION_WRITE_LABEL", "LABEL_ANNOTATION"),

            Map.entry("ANNOTATION_EDIT", "EDIT_ANNOTATION"), //点击edit note button
            Map.entry("ANNOTATION_EDIT_NOTE_SAVE", "EDIT_ANNOTATION"), // 点击save note button
            Map.entry("ANNOTATION_CANCEL_EDIT", "EDIT_ANNOTATION"),
            Map.entry("ANNOTATION_DELETE", "DELETE_ANNOTATION"),
            Map.entry("ANNOTATION_EDIT_CLICK", "EDIT_ANNOTATION"), // 在编辑note 区域移动鼠标
            Map.entry("ANNOTATION_EDIT_SELECT_TEXT", "EDIT_ANNOTATION"),


            //TODO 待检查，还未确认
            Map.entry("COLLABORATE_OPEN", "COLLABORATE_OPEN_COLLABORATE"),
            Map.entry("COLLABORATE_CHAT_OPEN", "COLLABORATE_OPEN_CHAT"),
            Map.entry("COLLABORATE_CHAT_CLOSE", "COLLABORATE_CLOSE_CHAT"),
            Map.entry("COLLABORATE_PASTE_TEXT", "COLLABORATE_PASTE_TEXT_ESSAY"),
            Map.entry("COLLABORATE_CHAT_PASTE_TEXT", "COLLABORATE_PASTE_TEXT_CHAT"),
            Map.entry("COLLABORATE_WRITE", "COLLABORATE_WRITE_ESSAY"),
            Map.entry("COLLABORATE_OTHER_ADD_WRITE", "COLLABORATE_WRITE_ESSAY"),
            Map.entry("COLLABORATE_DELETE", "COLLABORATE_DELETE_ESSAY"),
            Map.entry("COLLABORATE_OTHER_DELETE", "COLLABORATE_DELETE_ESSAY"),
            Map.entry("COLLABORATE_CHAT_WRITE", "COLLABORATE_WRITE_CHAT"),
//            Map.entry("COLLABORATE_SAVE", "SAVE_ESSAY"),
//            Map.entry("COLLABORATE_CLOSE", "CLOSE_ESSAY"),
            Map.entry("COLLABORATE_FOCUS", "COLLABORATE_WRITE_ESSAY"),
            Map.entry("COLLABORATE_SELECT_TEXT", "COLLABORATE_WRITE_ESSAY"),
            Map.entry("COLLABORATE_BLUR", "COLLABORATE_WRITE_ESSAY"),
            Map.entry("COLLABORATE_CHANGE_STYLE", "COLLABORATE_WRITE_ESSAY"),
//            Map.entry("COLLABORATE_SAVE_WHEN_LEAVE_PAGE", "SAVE_ESSAY"),


            Map.entry("PLANNER_OPEN", "OPEN_PLANNER"),
            Map.entry("PLANNER_CLOSE", "CLOSE_PLANNER"),

            Map.entry("PLANNER_READ_PLANNER_CLICK", "READ_PLANNER"),
            Map.entry("PLANNER_READ_PLANNER_SELECT_TEXT", "READ_PLANNER"),

            Map.entry("PLANNER_CREATE_PLANNER_CLICK", "CREATE_PLANNER"),
            Map.entry("PLANNER_CREATE_PLANNER_SELECT_TEXT", "CREATE_PLANNER"),
            Map.entry("PLANNER_SELECT_LEARNING_STRATEGY", "CREATE_PLANNER"),
            Map.entry("PLANNER_SELECT_STEP2", "CREATE_PLANNER"),
            Map.entry("PLANNER_CREATE_TIME_INPUT", "CREATE_PLANNER"),
            Map.entry("PLANNER_SELECT_STEP3", "CREATE_PLANNER"),
            Map.entry("PLANNER_CREATE_ADD_CUSTOMISED_ITEM", "CREATE_PLANNER"),
            Map.entry("PLANNER_CREATE_DELETE_CUSTOMISED_ITEM", "CREATE_PLANNER"),
            Map.entry("PLANNER_CANCEL_CREATE", "CREATE_PLANNER"),


            Map.entry("PLANNER_EDIT_PLANNER_CLICK", "EDIT_PLANNER"),
            Map.entry("PLANNER_EDIT_PLANNER_SELECT_TEXT", "EDIT_PLANNER"),
            Map.entry("PLANNER_EDIT_TIME_INPUT", "EDIT_PLANNER"),
            Map.entry("PLANNER_EDIT_ADD_CUSTOMISED_ITEM", "EDIT_PLANNER"),
            Map.entry("PLANNER_EDIT_DELETE_CUSTOMISED_ITEM", "EDIT_PLANNER"),

            Map.entry("PLANNER_CANCEL_EDIT", "EDIT_PLANNER"),
            Map.entry("PLANNER_EDIT", "EDIT_PLANNER"),
            Map.entry("PLANNER_SAVE", "SAVE_PLANNER"),


            Map.entry("SCAFFOLD_OPEN", "OPEN_SCAFFOLD"),
            Map.entry("SCAFFOLD_CLOSE", "CLOSE_SCAFFOLD"),
            Map.entry("SCAFFOLD_CHECK_SUGGESTION", "INTERACT_SCAFFOLD"),
            Map.entry("SCAFFOLD_UNCHECK_SUGGESTION", "INTERACT_SCAFFOLD"),
            Map.entry("SCAFFOLD_CHANGE_SCAFFOLD_PANEL", "INTERACT_SCAFFOLD"),
            Map.entry("SCAFFOLD_CREATE_SCAFFOLD_TODOLIST", "INTERACT_TODOLIST"),
            Map.entry("SCAFFOLD_CHECK_TODO_ITEM", "INTERACT_TODOLIST"),
            Map.entry("SCAFFOLD_UNCHECK_TODO_ITEM", "INTERACT_TODOLIST"),
            Map.entry("SCAFFOLD_FORCE_DISPLAY_SCAFFOLD", "DISPLAY_SCAFFOLD"),
            Map.entry("SCAFFOLD_SHOW_ALERT_MESSAGE_SCAFFOLD", "DISPLAY_SCAFFOLD"),
            Map.entry("SCAFFOLD_PATTERN_DETECTED_SCAFFOLD", "DISPLAY_SCAFFOLD"),
//            Map.entry("SCAFFOLD_CHECKING_PROCESS_LABEL", "DISPLAY_SCAFFOLD"),


            Map.entry("CHATGPT_OPEN", "OPEN_GPT"),
            Map.entry("CHATGPT_CLOSE", "CLOSE_GPT"),
            Map.entry("CHATGPT_CLICK", "READ_FEEDBACK_GPT"),
            Map.entry("CHATGPT_SELECT_TEXT", "READ_FEEDBACK_GPT"),
            Map.entry("CHATGPT_SUBMIT_QUESTION", "ASK_GPT"),
            Map.entry("CHATGPT_WRITE_QUESTION", "ASK_GPT"),
            Map.entry("CHATGPT_CHANGE_INPUT_LINE", "ASK_GPT"),
            Map.entry("CHATGPT_RATING_STAR_FEEDBACK", "RATING_STAR_FEEDBACK_GPT"),
            Map.entry("CHATGPT_RATING_THUMBS_FEEDBACK", "RATING_THUMBS_FEEDBACK_GPT"),
            Map.entry("CHATGPT_RE_GENERATE_ANSWER", "RE_ASK_GPT"),



            Map.entry("DICTIONARY_OPEN", "DICTIONARY"),
            Map.entry("DICTIONARY_CLOSE", "DICTIONARY"),
            Map.entry("DICTIONARY_CLICK", "DICTIONARY"),
            Map.entry("DICTIONARY_SELECT_TEXT", "DICTIONARY"),
            Map.entry("DICTIONARY_SUBMIT_WORD", "DICTIONARY"),
            Map.entry("DICTIONARY_WRITE_WORD", "DICTIONARY"),


            Map.entry("CHATTEACHER_OPEN", "OPEN_CHATTEACHER"),
            Map.entry("CHATTEACHER_CLOSE", "CLOSE_CHATTEACHER"),
            Map.entry("CHATTEACHER_CLICK", "READ_FEEDBACK_CHATTEACHER"),
            Map.entry("CHATTEACHER_SELECT_TEXT", "READ_FEEDBACK_CHATTEACHER"),

            Map.entry("CHATTEACHER_CHANGE_INPUT_LINE", "ASK_CHATTEACHER"),
            Map.entry("CHATTEACHER_SUBMIT_QUESTION", "ASK_CHATTEACHER"),
            Map.entry("CHATTEACHER_WRITE_QUESTION", "ASK_CHATTEACHER"),
            Map.entry("CHATTEACHER_RATING_STAR_FEEDBACK", "RATING_STAR_FEEDBACK_CHATTEACHER"),
            Map.entry("CHATTEACHER_RATING_THUMBS_FEEDBACK", "RATING_THUMBS_FEEDBACK_CHATTEACHER"),


            Map.entry("CHECKLIST_OPEN", "OPEN_CHECKLIST"),
            Map.entry("CHECKLIST_CLOSE", "CLOSE_CHECKLIST"),
            Map.entry("CHECKLIST_CLICK_BASIC", "READ_BASIC_CHECKLIST"),
            Map.entry("CHECKLIST_SELECT_TEXT_BASIC", "READ_BASIC_CHECKLIST"),
            Map.entry("CHECKLIST_CLICK_ACADEMIC", "READ_ACADEMIC_CHECKLIST"),
            Map.entry("CHECKLIST_SELECT_TEXT_ACADEMIC", "READ_ACADEMIC_CHECKLIST"),
            Map.entry("CHECKLIST_CLICK_ORIGINALITY", "READ_ORIGINALITY_CHECKLIST"),
            Map.entry("CHECKLIST_SELECT_TEXT_ORIGINALITY", "READ_ORIGINALITY_CHECKLIST"),
            Map.entry("CHECKLIST_CLICK_INTEGRATION", "READ_BLOOM_CHECKLIST"),
            Map.entry("CHECKLIST_SELECT_TEXT_INTEGRATION", "READ_BLOOM_CHECKLIST"),

            Map.entry("CHECKLIST_CHANGE_TO_BASIC_WRITING", "READ_BASIC_CHECKLIST"),
            Map.entry("CHECKLIST_CHANGE_TO_ACADEMIC_WRITING", "READ_ACADEMIC_CHECKLIST"),
            Map.entry("CHECKLIST_CHANGE_TO_ORIGINALITY", "READ_ORIGINALITY_CHECKLIST"),
            Map.entry("CHECKLIST_CHANGE_TO_INTEGRATION", "READ_BLOOM_CHECKLIST"),

            Map.entry("CHECKLIST_ANALYSE_BASIC", "ANALYSE_BASIC_CHECKLIST"),
            Map.entry("CHECKLIST_ANALYSE_ACADEMIC", "ANALYSE_ACADEMIC_CHECKLIST"),
            Map.entry("CHECKLIST_ANALYSE_ORIGINALITY", "ANALYSE_ORIGINALITY_CHECKLIST"),
            Map.entry("CHECKLIST_ANALYSE_INTEGRATION", "ANALYSE_BLOOM_CHECKLIST"),



            Map.entry("OFF_TASK_OFF_TASK", "OFF_TASK"),

            Map.entry("PAGE_CHANGE_PAGE_CLICK_READING", "READING"),    // NOT_USE
            Map.entry("PAGE_CHANGE_PAGE_CLICK_PAGE_NAVIGATION", "PAGE_NAVIGATION"),    // NOT_USE

//            Map.entry("PAGE_LEAVE_PAGE", "NOT_USE"), // PAGE_NAVIGATION | (IR)RELEVANT_(RE)READING | INSTRUCTION_(RE)READING | RUBRIC_(RE)READING

            Map.entry("EXTRA_BODY_CLICK_READING", "READING"),      // NOT_USE
            Map.entry("EXTRA_BODY_CLICK_PAGE_NAVIGATION", "PAGE_NAVIGATION"),      // NOT_USE
//            Map.entry("EXTRA_SELECT_TEXT", "NO_LABEL")      // NOT_USE  // reading
            Map.entry("EXTRA_SELECT_TEXT_PAGE_NAVIGATION", "PAGE_NAVIGATION"),
            Map.entry("EXTRA_SELECT_TEXT_READING", "READING"),
//            Map.entry("EXTRA_NO_INSTANT_EVENT", "EXTRA") // 暂时没有用到

            Map.entry("CHATGPT_SCAFFOLD_OPEN", "OPEN_GPT_SCAFFOLD"),
            Map.entry("CHATGPT_SCAFFOLD_CLOSE", "CLOSE_GPT_SCAFFOLD"),
            Map.entry("CHATGPT_SCAFFOLD_SELECT_TEXT", "READ_GPT_SCAFFOLD"),
            Map.entry("CHATGPT_SCAFFOLD_CLICK", "READ_GPT_SCAFFOLD"),
            Map.entry("CHATGPT_SCAFFOLD_CHATGPT_SCAFFOLD_RECEIVED", "READ_GPT_SCAFFOLD"),
            Map.entry("CHATGPT_SCAFFOLD_CHATGPT_SCAFFOLD_FORCE_VIEW", "READ_GPT_SCAFFOLD")

//            Map.entry("10", "INSTRUCTION"),
//            Map.entry("TRY_OUT_TOOLS", "TRY_OUT_TOOLS"),
//            Map.entry("PAGE_NAVIGATION", "PAGE_NAVIGATION")
//            Map.entry("13", "TABLE_OF_CONTENT") //在别处已经map 过
//            Map.entry("", "RELEVANT_READING"),  //在别处已经map 过
//            Map.entry("", "IRRELEVANT_READING"),//在别处已经map 过
//            Map.entry("", "RELEVANT_REREADING"),//在别处已经map 过
//            Map.entry("", "IRRELEVANT_REREADING")//在别处已经map 过
    );
    public static final String[] availableLabelModels = new String[] {"Copes", "Maria"};
//    public static Map<String, String> URL_COURSE_ID_MAP = new HashMap<>();
    public static final boolean checkNumberOfInstance = false;    // This constant is to configure whether to calculate the number of instance in database
}
