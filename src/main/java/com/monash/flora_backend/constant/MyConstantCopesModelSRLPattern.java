package com.monash.flora_backend.constant;

import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

public class MyConstantCopesModelSRLPattern {
    // regex used to check the pattern \(\?\:\\\\d\+--.*?=====
    // ?: 表示 不 捕获 group
    // (?:IR)?RELEVANT_(?:RE)?READING  表示  IRRELEVANT_READING,RELEVANT_READING,IRRELEVANT_REREADING,RELEVANT_REREADING
    // \w{4,10}_ESSAY                  表示  OPEN_ESSAY,PASTE_TEXT_ESSAY,WRITE_ESSAY,SAVE_ESSAY,CLOSE_ESSAY
    // \w{4,6}_PLANNER                 表示  OPEN_PLANNER,CREATE_PLANNER,EDIT_PLANNER,CLOSE_PLANNER,EDIT_PLANNER,CREATE_PLANNER,SAVE_PLANNER
    // READ_ANNOTATION,LABEL_ANNOTATION,EDIT_ANNOTATION,DELETE_ANNOTATION
    // OPEN_SCAFFOLD,CLOSE_SCAFFOLD,INTERACT_SCAFFOLD,INTERACT_TODOLIST,DISPLAY_SCAFFOLD
    // INSTRUCTION_READING 12,INSTRUCTION_REREADING 14
    // RUBRIC_READING 12,RUBRIC_REREADING 14

    public static String PRIORITY1_CPI1 = "\\d+--OPEN_ESSAY=====\\d+--WRITE_ESSAY(?:_[^=]+)?=====\\d+--CLOSE_ESSAY=====(?:\\d+--OPEN_ESSAY=====)+(?:\\d+--CLOSE_ESSAY=====)+";
    public static String PRIORITY1_EJL1 = "\\d+--(?:(?:IR)?RELEVANT_(?:RE)?READING|\\w{4,10}_ESSAY)=====\\d+--OPEN_PLANNER=====\\d+--EDIT_PLANNER====="; //5分钟之后detect
    // TODO: 需要把EJL1的edit_planner改成可有可无

    public static String PRIORITY2_CSTR1 = "\\d+--(?:TASK_REQUIREMENT|RUBRIC)=====\\d+--(?:CREATE_NOTE|CREATE_HIGHLIGHT)====="; //5 分钟之内detect， 超过 不detect

//    public static String PRIORITY2_CMTR1 = "\\d+--(?:WRITE_ESSAY|OPEN_ESSAY)=====\\d+--(?:TASK_REQUIREMENT|RUBRIC)=====";
//    public static String PRIORITY2_CMTR1 = "(\\d+--(?:WRITE_ESSAY|OPEN_ESSAY)=====)?(?:\\d+--(?:TASK_REQUIREMENT|RUBRIC)=====)+";
    public static String PRIORITY2_CMTR1 = "\\d+--(?:WRITE_ESSAY(?:_[^=]+)?|OPEN_ESSAY)=====(?:\\d+--(?:TASK_REQUIREMENT|RUBRIC)=====)+";

    public static String PRIORITY2_OS4 = "\\d+--(?:(?:IR)?RELEVANT_(?:RE)?READING|\\w{4,10}_ESSAY)=====(?:\\d+--(?:SEARCH_ANNOTATION|SEARCH_CONTENT|PAGE_NATIVATION)=====)+";
    public static String PRIORITY2_SASBTS1 = "\\d+--(?:TASK_REQUIREMENT|RUBRIC)=====(?:\\d+--(?:CREATE_HIGHLIGHT|CREATE_NOTE|EDIT_ANNOTATION)=====)+";//5分钟之后detect
    public static String PRIORITY2_SASBTS3 = "\\d+--(?:WRITE_ESSAY(?:_[^=]+)?|OPEN_ESSAY|READ_ANNOTATION)=====(?:\\d+--RUBRIC_(?:RE)?READING=====)+"; // TODO： 这里的rubric后面应该去掉reading
    public static String PRIORITY2_SSSRPP1 = "\\d+--(?:WRITE_ESSAY(?:_[^=]+)?|OPEN_ESSAY)=====(?:\\d+--FEEDBACK_TOOLKIT=====)+";//5分钟之后detect
    public static String PRIORITY2_SMLGP1 = "\\d+--(?:TASK_REQUIREMENT|RUBRIC)=====(?:\\d+--\\w{4,6}_PLANNER=====)+"; //5分钟之后detect

    public static String PRIORITY3_CSAR1 = "(?:\\d+--TABLE_OF_CONTENT=====)+";
    public static String PRIORITY3_CSAR2 = "(?:\\d+--TRY_OUT_TOOLS=====)+";
    public static String PRIORITY3_CSTR2 = "(?:\\d+--(?:TASK_REQUIREMENT|RUBRIC)=====)+"; //TODO check first time detect or not
    public static String PRIORITY3_CMTC1 = "(?:\\d+--(?:TIMER|OPEN_TIMER)=====)+";
    public static String PRIORITY3_CMTR2 = "(?:\\d+--(?:TASK_REQUIREMENT|RUBRIC)=====)+"; //TODO check first time detect or not
    public static String PRIORITY3_OS1 = "(?:\\d+--SEARCH_ANNOTATION=====)+"; // 
    public static String PRIORITY3_OS2 = "(?:\\d+--SEARCH_CONTENT=====)+"; // 当前没有这个action，所以这个OS2不会出现在trace中
    public static String PRIORITY3_OS3 = "(?:\\d+--PAGE_NAVIGATION=====)+";
    public static String PRIORITY3_OM1 = "(?:\\d+--LABEL_ANNOTATION=====)+";
    public static String PRIORITY3_OM2 = "(?:\\d+--CREATE_HIGHLIGHT=====)+";
    public static String PRIORITY3_OM3 = "(?:\\d+--(?:READ_ANNOTATION|DELETE_ANNOTATION)=====)+";
    public static String PRIORITY3_OA1 = "(?:\\d+--WRITE_ESSAY_O.A.1=====)+";
    public static String PRIORITY3_OA2 = "(?:\\d+--WRITE_ESSAY_O.A.2=====)+";
    public static String PRIORITY3_OA3 = "(?:\\d+--WRITE_ESSAY_O.A.3=====)+";
    public static String PRIORITY3_OR1 = "(?:\\d+--WRITE_ESSAY_O.R.1=====)+";
    public static String PRIORITY3_OR2 = "(?:\\d+--WRITE_ESSAY_O.R.2=====)+";
    public static String PRIORITY3_OR3 = "(?:\\d+--WRITE_ESSAY_O.R.3=====)+";
    public static String PRIORITY3_OT1 = "(?:\\d+--WRITE_ESSAY_O.T.1=====)+";
    public static String PRIORITY3_OT2 = "(?:\\d+--WRITE_ESSAY_O.T.2=====)+";
    public static String PRIORITY3_SASBTS2 = "(?:\\d+--OPEN_PLANNER=====)+";
    public static String PRIORITY3_SASBTS4 = "(?:\\d+--RUBRIC_(?:RE)?READING=====)+"; // TODO：rubric后面去掉reading
    public static String PRIORITY3_MCM9 = "(?:\\d+--CHECK_WORD_COUNT=====)+";

//    public static boolean SAVE_PLANNER_HAPPEN = false;
//    public static int SAVE_PLANNER_SELECT_INDEX = 0;
//    public static boolean TIMER_HAPPEN = false;
//    public static boolean TRY_OUT_TOOLS_HAPPEN = false;
//    public static boolean PAGE_NAVIGATION_HAPPEN = false;
//    public static boolean RUBRIC_HAPPEN = false;
//    public static boolean TASK_REQUIREMENT_HAPPEN = false;

    public static List<String> COPES_MODEL_PROCESS_PATTERN_LIST = List.of(
            "CSAR1", "CSAR2", "CSTR1", "CSTR2", "CMTC1", "CMTR1", "CMTR2", "CPI1", "OS1", "OS2",
            "OS3", "OS4", "OM1", "OM2", "OM3",
             "EJL1", "SASBTS1", "SASBTS2", "SASBTS3", "SASBTS4", "SSSRPP1", "SMLGP1", "MCM9");

    public static List<String> BEFORE_5MIN_COPES_MODEL_PROCESS_PATTERN_LIST = List.of(
            "CSAR1", "CSAR2", "CSTR1", "CSTR2", "CMTC1", "CMTR1", "CPI1", "OS1", "OS2",
            "OS3", "OS4", "OM1", "OM2", "OM3",
             "SASBTS2", "SSSRPP1", "MCM9", "OA1", "OA2", "OA3", "OR1", "OR2", "OR3", "OT1", "OT2");
    public static List<String> AFTER_5MIN_COPES_MODEL_PROCESS_PATTERN_LIST = List.of(
            "CSAR1", "CSAR2", "CMTC1", "CMTR1", "CMTR2", "CPI1", "OS1", "OS2",
            "OS3", "OS4", "OM1", "OM2", "OM3",
             "EJL1", "SASBTS1", "SASBTS2", "SASBTS3", "SASBTS4", "SSSRPP1", "SMLGP1", "MCM9", "OA1", "OA2", "OA3", "OR1", "OR2", "OR3", "OT1", "OT2");

    public static Map<String, String> COPES_MODEL_PROCESS_PATTERN_REGEX_MAP = Map.ofEntries(
            Map.entry("CSAR1", PRIORITY3_CSAR1),
            Map.entry("CSAR2", PRIORITY3_CSAR2),
            Map.entry("CSTR1", PRIORITY2_CSTR1),
            Map.entry("CSTR2", PRIORITY3_CSTR2),
            Map.entry("CMTC1", PRIORITY3_CMTC1),
            Map.entry("CMTR1", PRIORITY2_CMTR1),
            Map.entry("CMTR2", PRIORITY3_CMTR2),
            Map.entry("CPI1", PRIORITY1_CPI1),
            Map.entry("OS1", PRIORITY3_OS1),
            Map.entry("OS2", PRIORITY3_OS2),
            Map.entry("OS3", PRIORITY3_OS3),
            Map.entry("OS4", PRIORITY2_OS4),
            Map.entry("OM1", PRIORITY3_OM1),
            Map.entry("OM2", PRIORITY3_OM2),
            Map.entry("OM3", PRIORITY3_OM3),
            Map.entry("OA1", PRIORITY3_OA1),
            Map.entry("OA2", PRIORITY3_OA2),
            Map.entry("OA3", PRIORITY3_OA3),
            Map.entry("OR1", PRIORITY3_OR1),
            Map.entry("OR2", PRIORITY3_OR2),
            Map.entry("OR3", PRIORITY3_OR3),
            Map.entry("OT1", PRIORITY3_OT1),
            Map.entry("OT2", PRIORITY3_OT2),
            Map.entry("EJL1", PRIORITY1_EJL1),
            Map.entry("SASBTS1", PRIORITY2_SASBTS1),
            Map.entry("SASBTS2", PRIORITY3_SASBTS2),
            Map.entry("SASBTS3", PRIORITY2_SASBTS3),
            Map.entry("SASBTS4", PRIORITY3_SASBTS4),
            Map.entry("SSSRPP1", PRIORITY2_SSSRPP1),
            Map.entry("SMLGP1", PRIORITY2_SMLGP1),
            Map.entry("MCM9", PRIORITY3_MCM9)
    );

    public static Map<String, Pattern> COPES_MODEL_PROCESS_PATTERN_MAP = Map.ofEntries(
            Map.entry("CSAR1", Pattern.compile(PRIORITY3_CSAR1)),
            Map.entry("CSAR2", Pattern.compile(PRIORITY3_CSAR2)),
            Map.entry("CSTR1", Pattern.compile(PRIORITY2_CSTR1)),
            Map.entry("CSTR2", Pattern.compile(PRIORITY3_CSTR2)),
            Map.entry("CMTC1", Pattern.compile(PRIORITY3_CMTC1)),
            Map.entry("CMTR1", Pattern.compile(PRIORITY2_CMTR1)),
            Map.entry("CMTR2", Pattern.compile(PRIORITY3_CMTR2)),
            Map.entry("CPI1", Pattern.compile(PRIORITY1_CPI1)),
            Map.entry("OS1", Pattern.compile(PRIORITY3_OS1)),
            Map.entry("OS2", Pattern.compile(PRIORITY3_OS2)),
            Map.entry("OS3", Pattern.compile(PRIORITY3_OS3)),
            Map.entry("OS4", Pattern.compile(PRIORITY2_OS4)),
            Map.entry("OM1", Pattern.compile(PRIORITY3_OM1)),
            Map.entry("OM2", Pattern.compile(PRIORITY3_OM2)),
            Map.entry("OM3", Pattern.compile(PRIORITY3_OM3)),
//            Map.entry("OA1", Pattern.compile(PRIORITY3_OA1)),
//            Map.entry("OA2", Pattern.compile(PRIORITY3_OA2)),
//            Map.entry("OA3", Pattern.compile(PRIORITY3_OA3)),
//            Map.entry("OR1", Pattern.compile(PRIORITY3_OR1)),
//            Map.entry("OR2", Pattern.compile(PRIORITY3_OR2)),
//            Map.entry("OR3", Pattern.compile(PRIORITY3_OR3)),
//            Map.entry("OT1", Pattern.compile(PRIORITY3_OT1)),
//            Map.entry("OT2", Pattern.compile(PRIORITY3_OT2)),
            Map.entry("EJL1", Pattern.compile(PRIORITY1_EJL1)),
            Map.entry("SASBTS1", Pattern.compile(PRIORITY2_SASBTS1)),
            Map.entry("SASBTS2", Pattern.compile(PRIORITY3_SASBTS2)),
            Map.entry("SASBTS3", Pattern.compile(PRIORITY2_SASBTS3)),
            Map.entry("SASBTS4", Pattern.compile(PRIORITY3_SASBTS4)),
            Map.entry("SSSRPP1", Pattern.compile(PRIORITY2_SSSRPP1)),
            Map.entry("SMLGP1", Pattern.compile(PRIORITY2_SMLGP1)),
            Map.entry("MCM9", Pattern.compile(PRIORITY3_MCM9))
    );

}
