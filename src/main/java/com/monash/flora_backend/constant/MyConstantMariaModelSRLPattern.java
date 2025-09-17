package com.monash.flora_backend.constant;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.regex.Pattern;

/**
 * ClassName: MyConstantMariaModelSRLPattern
 * Description:
 *
 * @author Xinyu Li
 * @since 4/2/2023 2:16 PM
 */
public class MyConstantMariaModelSRLPattern {
    // INSTRUCTION, READING, ESSAY  merge 成3个
    // regex used to check the pattern \(\?\:\\\\d\+--.*?=====
    // ?: 表示 不 捕获 group
    // (?:IR)?RELEVANT_(?:RE)?READING  表示  IRRELEVANT_READING,RELEVANT_READING,IRRELEVANT_REREADING,RELEVANT_REREADING
    // \w{4,10}_ESSAY                  表示  OPEN_ESSAY,PASTE_TEXT_ESSAY,WRITE_ESSAY,SAVE_ESSAY,CLOSE_ESSAY
    // \w{4,6}_PLANNER                 表示  OPEN_PLANNER,CREATE_PLANNER,EDIT_PLANNER,CLOSE_PLANNER,EDIT_PLANNER,CREATE_PLANNER,SAVE_PLANNER
    // READ_ANNOTATION,LABEL_ANNOTATION,EDIT_ANNOTATION,DELETE_ANNOTATION
    // OPEN_SCAFFOLD,CLOSE_SCAFFOLD,INTERACT_SCAFFOLD,INTERACT_TODOLIST,DISPLAY_SCAFFOLD
    // INSTRUCTION_READING 12,INSTRUCTION_REREADING 14
    // INSTRUCTION_(?:RE)?READING -> TASK_REQUIREMENT|RUBRIC
    public static List<String> SCAFFOLD_SHOW_STATUS = new ArrayList<>(List.of("000", "000", "000", "000", "000"));  // 每行用一个字符串表示 "111", "000" ,    "0" 表示不显示， “1” 表示显示
    public static int[] SCAFFOLD_SHOWING_TIME_LIST = new int[]{1, 3, 5, 7, 9}; // time point
//    public static List<Integer> scaffoldForceDisplayTimeList = List.of(2, 4, 6, 8, 10); // time point

    public static String PRIORITY1_MCE1 = "\\d+--(?:IR)?RELEVANT_(?:RE)?READING=====(?:\\d+--(?:PAGE_NAVIGATION|TABLE_OF_CONTENT)=====)*(?:\\d+--(?:TASK_REQUIREMENT|RUBRIC|(?:READ|DELETE)_ANNOTATION)=====)+(?:\\d+--(?:PAGE_NAVIGATION|TABLE_OF_CONTENT)=====)*\\d+--(?:IR)?RELEVANT_(?:RE)?READING=====";
//    public static String PRIORITY2_MCE2 = "\\d+--\\w{4,10}_ESSAY=====(?:\\d+--(?:PAGE_NAVIGATION|TABLE_OF_CONTENT)=====)*(?:\\d+--(?:TASK_REQUIREMENT|RUBRIC|(?:READ|DELETE)_ANNOTATION)=====)+(?:\\d+--(?:PAGE_NAVIGATION|TABLE_OF_CONTENT)=====)*\\d+--(?:(?:IR)?RELEVANT_(?:RE)?READING|\\w{4,10}_ESSAY)=====";
    //after discussion with joep
    public static String PRIORITY2_MCE2 = "\\d+--\\w{4,10}_ESSAY=====(?:\\d+--(?:PAGE_NAVIGATION|TABLE_OF_CONTENT)=====)*(?:\\d+--(?:TASK_REQUIREMENT|RUBRIC|(?:READ|DELETE)_ANNOTATION)=====)+(?:\\d+--(?:PAGE_NAVIGATION|TABLE_OF_CONTENT)=====)*(?:\\d+--(?:(?:IR)?RELEVANT_(?:RE)?READING|\\w{4,10}_ESSAY)=====)+";
    // 修改过 鼠标移动的影响
//    public static String PRIORITY2_MCE2 = "\\d+--OPEN_ESSAY=====(?:\\d+--(?:TASK_REQUIREMENT|RUBRIC)=====)*(?:\\d+--WRITE_ESSAY=====)+(?:\\d+--(?:PAGE_NAVIGATION|TABLE_OF_CONTENT)=====)*(?:\\d+--(?:TASK_REQUIREMENT|RUBRIC|(?:READ|DELETE)_ANNOTATION)=====)+(?:\\d+--WRITE_ESSAY=====)*(?:\\d+--(?:TASK_REQUIREMENT|RUBRIC)=====)*(?:\\d+--(?:PAGE_NAVIGATION|TABLE_OF_CONTENT)=====)*\\d+--(?:(?:IR)?RELEVANT_(?:RE)?READING|\\w{4,10}_ESSAY)=====";
    public static String PRIORITY3_MCE3 = "(?:\\d+--(?:WRITE_ESSAY|OPEN_ESSAY)=====)?(?:\\d+--CHECKLIST=====)+";
    public static String PRIORITY4_MCE4 = "(?:\\d+--(?:(?:IR)?RELEVANT_(?:RE)?READING|\\w{4,10}_ESSAY)=====)?(?:\\d+--(?:INTERACT_SCAFFOLD|INTERACT_TODOLIST)=====)+";


    public static String PRIORITY5_MCP1 = "\\d+--\\w{4,6}_PLANNER=====(?:\\d+--(?:PAGE_NAVIGATION|TABLE_OF_CONTENT)=====)*\\d+--(?:IR)?RELEVANT_(?:RE)?READING=====";
    public static String PRIORITY6_MCP2 = "(?:\\d+--(?:TASK_REQUIREMENT|RUBRIC)=====)?(?:\\d+--\\w{4,6}_PLANNER=====){1,100}(?:\\d+--(?:TASK_REQUIREMENT|RUBRIC)=====)?"; //during first 15 mins // _PLANNER 最多出现100次，不能设置为 无限次数，会造成栈溢出错误
    // 修改过 鼠标移动的影响
//    public static String PRIORITY6_MCP2 = "(?:\\d+--(?:TASK_REQUIREMENT|RUBRIC)=====)?(?:\\d+--\\w{4,6}_PLANNER=====){1,100}(?:\\d+--(?:TASK_REQUIREMENT|RUBRIC)=====)*"; //during first 15 mins // _PLANNER 最多出现100次，不能设置为 无限次数，会造成栈溢出错误
    public static String PRIORITY7_MCP3 = "(?:\\d+--OPEN_PLANNER=====)*(?:\\d+--CREATE_PLANNER=====)+(?:\\d+--CLOSE_PLANNER=====)?";

    public static String PRIORITY8_MCO1 = "\\d+--(?:TASK_REQUIREMENT|RUBRIC)=====(?:\\d+--(?:PAGE_NAVIGATION|TABLE_OF_CONTENT)=====)*\\d+--(?:IR)?RELEVANT_(?:RE)?READING=====";
    public static String PRIORITY9_MCO3 = "\\d+--(?:TASK_REQUIREMENT|RUBRIC)=====(?:\\d+--(?:CREATE_NOTE|CREATE_HIGHLIGHT)=====)+(?:\\d+--(?:LABEL_ANNOTATION|EDIT_ANNOTATION)=====)*(?:\\d+--(?:TASK_REQUIREMENT|RUBRIC)=====)?";

//    public static String PRIORITY10_MCO4 = "\\d+--(?:TASK_REQUIREMENT|RUBRIC)=====(?:\\d+--(?:PAGE_NAVIGATION|TABLE_OF_CONTENT)=====)+(?:\\d+--(?:TASK_REQUIREMENT|RUBRIC)=====)?";
    // 修改过 鼠标移动的影响
    public static String PRIORITY10_MCO4 = "(?:\\d+--(?:PAGE_NAVIGATION|TABLE_OF_CONTENT)=====)*(?:\\d+--(?:TASK_REQUIREMENT|RUBRIC)=====)+(?:\\d+--(?:PAGE_NAVIGATION|TABLE_OF_CONTENT)=====)+";

    public static String PRIORITY11_MCM2 = "(?:\\d+--(?:TASK_REQUIREMENT|RUBRIC)=====)?(?:\\d+--\\w{4,6}_PLANNER=====)+(?:\\d+--(?:TASK_REQUIREMENT|RUBRIC)=====)*"; //(after the first 15mins)
    public static String PRIORITY12_MCM3 = "\\d+--\\w{4,10}_ESSAY=====(?:\\d+--(?:\\w{4,6}_PLANNER|TASK_REQUIREMENT|RUBRIC)=====)+(?:\\d+--\\w{4,10}_ESSAY=====)?";  //(after the first 15mins)
    public static String PRIORITY13_MCM1 = "(?:\\d+--(?:PAGE_NAVIGATION|TABLE_OF_CONTENT)=====)+(?:\\d+--READ_ANNOTATION=====)+(?:\\d+--(?:PAGE_NAVIGATION|TABLE_OF_CONTENT)=====)*";
    public static String PRIORITY14_MCM5 = "(?:\\d+--OPEN_PLANNER=====)*(?:\\d+--EDIT_PLANNER=====)+(?:\\d+--CLOSE_PLANNER=====)?";
    public static String PRIORITY15_MCM8 = "\\d+--OPEN_ESSAY=====\\d+--(?:IR)?RELEVANT_(?:RE)?READING=====";

    public static String PRIORITY16_HCEO2 = "\\d+--(?:TASK_REQUIREMENT|RUBRIC)=====(?:\\d+--(?:PAGE_NAVIGATION|TABLE_OF_CONTENT)=====)*(?:\\d+--OPEN_ESSAY=====)?(?:\\d+--WRITE_ESSAY=====)+(?:\\d+--CLOSE_ESSAY=====)?";
    public static String PRIORITY17_HCEO1 = "\\d+--\\w{8,10}_REREADING=====(?:\\d+--(?:PAGE_NAVIGATION|TABLE_OF_CONTENT)=====)*(?:\\d+--OPEN_ESSAY=====)?(?:\\d+--(?:IR)?RELEVANT_(?:RE)?READING=====)*(?:\\d+--WRITE_ESSAY=====)+(?:\\d+--CLOSE_ESSAY=====)?";
    public static String PRIORITY18_HCEO4 = "\\d+--\\w{4,10}_ESSAY=====(?:\\d+--PAGE_NAVIGATION=====)*(?:\\d+--(?:READ_ANNOTATION|SEARCH_ANNOTATION)=====)+";

    public static String PRIORITY19_LCR1 = "(?:\\d+--(?:PAGE_NAVIGATION|TABLE_OF_CONTENT)=====)*\\d+--\\w{8,10}_REREADING=====(?:\\d+--(?:\\w{4,6}_ANNOTATION|CREATE_NOTE|CREATE_HIGHLIGHT)=====)+(?:\\d+--\\w{8,10}_REREADING=====)?";
    public static String PRIORITY20_LCF1 = "(?:\\d+--(?:PAGE_NAVIGATION|TABLE_OF_CONTENT)=====)*\\d+--\\w{8,10}_READING=====(?:\\d+--(?:\\w{4,6}_ANNOTATION|CREATE_NOTE|CREATE_HIGHLIGHT)=====)+\\d+--\\w{8,10}_READING=====";
    public static String PRIORITY21_LCF3 = "(?:\\d+--(?:PAGE_NAVIGATION|TABLE_OF_CONTENT)=====)*\\d+--\\w{8,10}_READING=====(?:\\d+--(?:\\w{4,6}_ANNOTATION|CREATE_NOTE|CREATE_HIGHLIGHT)=====)+(?:\\d+--\\w{8,10}_READING=====)?";
//    public static String PRIORITY22_LCF2 = "\\d+--\\w{8,10}_READING=====(?:\\d+--PAGE_NAVIGATION=====)*\\d+--\\w{8,10}_READING=====";
    // 修改过 鼠标移动的影响
    public static String PRIORITY22_LCF2 = "\\d+--\\w{8,10}_READING=====(?:\\d+--(?:PAGE_NAVIGATION|TABLE_OF_CONTENT|\\w{8,10}_READING)=====)*\\d+--\\w{8,10}_READING=====";

    public static String PRIORITY23_MCP4 = "(?:\\d+--SEARCH_CONTENT=====)+";
    public static String PRIORITY24_MCM6 = "(?:\\d+--SEARCH_ANNOTATION=====)+";
    public static String PRIORITY25_MCM7 = "(?:\\d+--(?:READ_ANNOTATION|DELETE_ANNOTATION)=====)+";
    public static String PRIORITY26_MCM4 = "(?:\\d+--(?:TIMER|OPEN_TIMER)=====)+";
    public static String PRIORITY27_MCO2 = "(?:\\d+--(?:PAGE_NAVIGATION|TABLE_OF_CONTENT)=====)*(?:\\d+--(?:TASK_REQUIREMENT|RUBRIC)=====)+";

    public static String PRIORITY28_HCEO5 = "(?:\\d+--LABEL_ANNOTATION=====)+";
    public static String PRIORITY29_HCEO6 = "(?:\\d+--(?:EDIT_ANNOTATION|DELETE_ANNOTATION)=====)+";
//    public static String PRIORITY30_HCEO3 = "(?:\\d+--WRITE_ESSAY=====)+(?:\\d+--CLOSE_ESSAY=====)?";

    //after discussion with joep
    public static String PRIORITY30_HCEO3 = "(?:\\d+--WRITE_ESSAY=====)+(?:\\d+--CLOSE_ESSAY=====)?(?:\\d+--(?:IR)?RELEVANT_(?:RE)?READING=====)*";

//    public static String PRIORITY31_LCR2 = "(?:\\d+--\\w{8,10}_REREADING=====)+";
//    public static String PRIORITY31_LCR2 = "(?:\\d+--(?:PAGE_NAVIGATION|TABLE_OF_CONTENT)=====)*(?:\\d+--\\w{8,10}_REREADING=====)+";
    // 修改过 鼠标移动的影响
//    public static String PRIORITY31_LCR2 = "(?:\\d+--\\w{8,10}_REREADING=====)?(?:\\d+--(?:PAGE_NAVIGATION|TABLE_OF_CONTENT|\\w{8,10}_REREADING)=====)*\\d+--\\w{8,10}_REREADING=====";
    //after discussion with joep
    public static String PRIORITY31_LCR2 = "(?:\\d+--\\w{8,10}_REREADING=====)?(?:\\d+--(?:PAGE_NAVIGATION|TABLE_OF_CONTENT|\\w{8,10}_REREADING)=====)*\\d+--\\w{8,10}_REREADING=====(?:\\d+--(?:PAGE_NAVIGATION|TABLE_OF_CONTENT)=====)*";
    public static String PRIORITY32_LCF4 = "(?:\\d+--\\w{8,10}_READING=====)+";
    public static String PRIORITY33_MCO5 = "(?:\\d+--TRY_OUT_TOOLS=====)+";
    public static String PRIORITY34_MCM9 = "(?:\\d+--CHECK_WORD_COUNT=====)+";

    public static List<String> BEFORE_15MIN_MARIA_MODEL_PROCESS_PATTERN_LIST = List.of("MCE1", "MCE2", "MCE3", "MCE4", "MCP1",
            "MCP2", "MCP3", "MCO1", "MCO3", "MCO4",   "MCM1", "MCM8", "MCM9",
            "HCEO2", "HCEO1", "HCEO4", "LCR1", "LCF1",  "LCF3", "LCF2", "MCP4", "MCM6", "MCM7",
            "MCM4", "MCO2", "HCEO5", "HCEO6", "HCEO3",  "LCR2", "LCF4", "MCO5");
    public static List<String> AFTER_15MIN_MARIA_MODEL_PROCESS_PATTERN_LIST = List.of("MCE1", "MCE2", "MCE3", "MCE4", "MCP1",
            "MCP3", "MCO1", "MCO3", "MCO4",  "MCM2", "MCM3", "MCM1", "MCM5", "MCM8", "MCM9",
            "HCEO2", "HCEO1", "HCEO4", "LCR1", "LCF1",  "LCF3", "LCF2", "MCP4", "MCM6", "MCM7",
            "MCM4", "MCO2", "HCEO5", "HCEO6", "HCEO3",  "LCR2", "LCF4", "MCO5");
//    public static List<String> KEY_ACTION_LIST = List.of("EDIT_ANNOTATION", "TABLE_OF_CONTENT", "PAGE_NAVIGATION", "TRY_OUT_TOOLS", "INSTRUCTION",
//            "RUBRIC", "READ_ANNOTATION", "WRITE_ESSAY", "");
    public static Map<String, String> MARIA_MODEL_PROCESS_PATTERN_REGEX_MAP = Map.ofEntries(
            Map.entry("MCE1", PRIORITY1_MCE1),
            Map.entry("MCE2", PRIORITY2_MCE2),
            Map.entry("MCE3", PRIORITY3_MCE3),
            Map.entry("MCE4", PRIORITY4_MCE4),
            Map.entry("MCP1", PRIORITY5_MCP1),

            Map.entry("MCP2", PRIORITY6_MCP2),
            Map.entry("MCP3", PRIORITY7_MCP3),
            Map.entry("MCO1", PRIORITY8_MCO1),
            Map.entry("MCO3", PRIORITY9_MCO3),
            Map.entry("MCO4", PRIORITY10_MCO4),

            Map.entry("MCM2", PRIORITY11_MCM2),
            Map.entry("MCM3", PRIORITY12_MCM3),
            Map.entry("MCM1", PRIORITY13_MCM1),
            Map.entry("MCM5", PRIORITY14_MCM5),
            Map.entry("MCM8", PRIORITY15_MCM8),

            Map.entry("HCEO2", PRIORITY16_HCEO2),
            Map.entry("HCEO1", PRIORITY17_HCEO1),
            Map.entry("HCEO4", PRIORITY18_HCEO4),
            Map.entry("LCR1", PRIORITY19_LCR1),
            Map.entry("LCF1", PRIORITY20_LCF1),

            Map.entry("LCF3", PRIORITY21_LCF3),
            Map.entry("LCF2", PRIORITY22_LCF2),

            Map.entry("MCP4", PRIORITY23_MCP4),
            Map.entry("MCM6", PRIORITY24_MCM6),
            Map.entry("MCM7", PRIORITY25_MCM7),

            Map.entry("MCM4", PRIORITY26_MCM4),
            Map.entry("MCO2", PRIORITY27_MCO2),
            Map.entry("HCEO5", PRIORITY28_HCEO5),
            Map.entry("HCEO6", PRIORITY29_HCEO6),
            Map.entry("HCEO3", PRIORITY30_HCEO3),

            Map.entry("LCR2", PRIORITY31_LCR2),
            Map.entry("LCF4", PRIORITY32_LCF4),
            Map.entry("MCO5", PRIORITY33_MCO5),
            Map.entry("MCM9", PRIORITY34_MCM9)
    );

    public static Map<String, Pattern> MARIA_MODEL_PROCESS_PATTERN_MAP = Map.ofEntries(
            Map.entry("MCE1", Pattern.compile(PRIORITY1_MCE1)),
            Map.entry("MCE2", Pattern.compile(PRIORITY2_MCE2)),
            Map.entry("MCE3", Pattern.compile(PRIORITY3_MCE3)),
            Map.entry("MCE4", Pattern.compile(PRIORITY4_MCE4)),
            Map.entry("MCP1", Pattern.compile(PRIORITY5_MCP1)),

            Map.entry("MCP2", Pattern.compile(PRIORITY6_MCP2)),
            Map.entry("MCP3", Pattern.compile(PRIORITY7_MCP3)),
            Map.entry("MCO1", Pattern.compile(PRIORITY8_MCO1)),
            Map.entry("MCO3", Pattern.compile(PRIORITY9_MCO3)),
            Map.entry("MCO4", Pattern.compile(PRIORITY10_MCO4)),

            Map.entry("MCM2", Pattern.compile(PRIORITY11_MCM2)),
            Map.entry("MCM3", Pattern.compile(PRIORITY12_MCM3)),
            Map.entry("MCM1", Pattern.compile(PRIORITY13_MCM1)),
            Map.entry("MCM5", Pattern.compile(PRIORITY14_MCM5)),
            Map.entry("MCM8", Pattern.compile(PRIORITY15_MCM8)),

            Map.entry("HCEO2", Pattern.compile(PRIORITY16_HCEO2)),
            Map.entry("HCEO1", Pattern.compile(PRIORITY17_HCEO1)),
            Map.entry("HCEO4", Pattern.compile(PRIORITY18_HCEO4)),
            Map.entry("LCR1", Pattern.compile(PRIORITY19_LCR1)),
            Map.entry("LCF1", Pattern.compile(PRIORITY20_LCF1)),

            Map.entry("LCF3", Pattern.compile(PRIORITY21_LCF3)),
            Map.entry("LCF2", Pattern.compile(PRIORITY22_LCF2)),

            Map.entry("MCP4", Pattern.compile(PRIORITY23_MCP4)),
            Map.entry("MCM6", Pattern.compile(PRIORITY24_MCM6)),
            Map.entry("MCM7", Pattern.compile(PRIORITY25_MCM7)),

            Map.entry("MCM4", Pattern.compile(PRIORITY26_MCM4)),
            Map.entry("MCO2", Pattern.compile(PRIORITY27_MCO2)),
            Map.entry("HCEO5", Pattern.compile(PRIORITY28_HCEO5)),
            Map.entry("HCEO6", Pattern.compile(PRIORITY29_HCEO6)),
            Map.entry("HCEO3", Pattern.compile(PRIORITY30_HCEO3)),

            Map.entry("LCR2", Pattern.compile(PRIORITY31_LCR2)),
            Map.entry("LCF4", Pattern.compile(PRIORITY32_LCF4)),
            Map.entry("MCO5", Pattern.compile(PRIORITY33_MCO5)),
            Map.entry("MCM9", Pattern.compile(PRIORITY34_MCM9))
    );


    public static Set<String> SCAFFOLD1_OPTION1 = Set.of("TABLE_OF_CONTENT", "PAGE_NAVIGATION", "TRY_OUT_TOOLS");
    public static Set<String> SCAFFOLD1_OPTION2 = Set.of("MCO1", "MCO2", "MCO4"); // + RUBRIC
    public static Set<String> SCAFFOLD1_OPTION3 = Set.of("MCO1", "MCO2", "MCO4"); // + INSTRUCTION

    public static Set<String> SCAFFOLD2_OPTION1 = Set.of("LCF1", "LCF4", "HCEO6"); // + EDIT_ANNOTATION
    public static Set<String> SCAFFOLD2_OPTION2 = Set.of("TABLE_OF_CONTENT", "PAGE_NAVIGATION", "TRY_OUT_TOOLS");
    public static Set<String> SCAFFOLD2_OPTION3 = Set.of("MCM4");

    public static Set<String> SCAFFOLD3_OPTION1 = Set.of("MCM1", "MCM7", "MCE1"); // + READ_ANNOTATION
    public static Set<String> SCAFFOLD3_OPTION2 = Set.of("MCE1"); // + INSTRUCTION
    public static Set<String> SCAFFOLD3_OPTION3 = Set.of("MCE2"); // + WRITE_ESSAY

    public static Set<String> SCAFFOLD4_OPTION1 = Set.of("MCM4");
    public static Set<String> SCAFFOLD4_OPTION2 = Set.of("MCM3", "HCEO2"); // + RUBRIC
    public static Set<String> SCAFFOLD4_OPTION3 = Set.of("HCEO3", "HCEO1");

    public static Set<String> SCAFFOLD5_OPTION1 = Set.of("MCM3", "HCEO2", "MCE2"); // + RUBRIC
    public static Set<String> SCAFFOLD5_OPTION2 = Set.of("HCEO3");
    public static Set<String> SCAFFOLD5_OPTION3 = Set.of("MCM3", "HCEO2", "MCE2"); // + INSTRUCTION



//    public static void main(String[] args) {
//        String testStr = "3123--TRY_OUT_TOOLS=====12312--WRITE_ESSAY=====3123123--TRY_OUT_TOOLS=====3122323--TRY_OUT_TOOLS=====";
//
//        Matcher matcher = match(PRIORITY33_MCO5, testStr);
//
//        List<String> matches = new ArrayList<>();
//
//        while (matcher.find()) {
//            matches.add(matcher.group());
//        }
//        System.out.println(matches);
//        System.out.println("----------------");
//        for (String s : matches) {
//            System.out.println(Arrays.toString(s.split("=====")));
//        }
//    }
}
