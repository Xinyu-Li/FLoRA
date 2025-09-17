package com.monash.flora_backend.constant;

import java.util.*;

/**
 * ClassName: MyMoodleConfigConstant
 * Description:
 *
 * @author Xinyu Li
 * @since 3/7/2023 10:30 AM
 */
public class MyMoodleConfigConstant {

    public static String MDL_CONFIG_PLUGINS_GENERICO_ATTR_PLUGIN = "filter_generico";
    public static String MDL_CONFIG_ADDITIONAL_HTML_HEAD_ATTR_NAME = "additionalhtmlhead";
    public static String MDL_CONFIG_ADDITIONAL_HTML_TOP_OF_BODY_ATTR_NAME = "additionalhtmltopofbody";
    public static String MDL_CONFIG_ADDITIONAL_HTML_FOOTER_ATTR_NAME = "additionalhtmlfooter";

    public static final String GENERICO_TEMPLATE_PREFIX = "";

//    public static String MDL_CONFIG_ADDITIONAL_HTML_HEAD = "";  //从文件读取
//    public static String MDL_CONFIG_ADDITIONAL_HTML_TOP_OF_BODY = "";  //从文件读取
//    public static String MDL_CONFIG_ADDITIONAL_HTML_FOOTER = "";  //从文件读取
//    public static String SERVER_ALL_COURSE_ID_AND_PAGE_START_END_ID = "";

//    public static String MOODLE_WEBSITE_URL = "http://localhost:8088";
//    public static String FLORA_BACKEND_URL = "http://localhost:8080";    // online, change to /myapi/
//    public static String FLORA_BACKEND_WEBSOCKET_URL = "ws://localhost:8080";
    public static String MOODLE_WEBSITE_URL = "http://localhost:8088";
    public static String FLORA_BACKEND_URL = "http://localhost/myapi/";    // online, change to /myapi/
    public static String FLORA_BACKEND_WEBSOCKET_URL = "ws://localhost/ws/";
    public static String EXCEL_EXPORT_PATH = "C:\\develop\\flora_project";
    public static String FILE_UPLOAD_PATH = "C:\\develop\\flora_project";

//    public static String MOODLE_WEBSITE_URL = "http://localhost:8088";
//    public static String FLORA_BACKEND_URL = "http://localhost:8080";    // online, change to /myapi/
//    public static String FLORA_BACKEND_WEBSOCKET_URL = "ws://localhost:8080";
    // online path
//    public static String EXCEL_EXPORT_PATH = "/root/export_excel/";
////    // online path
//    public static String FILE_UPLOAD_PATH = "/root/export_excel/";
    public static String BACKGROUND_FILE_PATH = "/root/background/";

    // local path
//    public static String EXCEL_EXPORT_PATH = "C:\\develop\\flora_project";
    // local path
//    public static String FILE_UPLOAD_PATH = "C:\\develop\\flora_project";

    // todo: 上传之前改一下
//    #  excel-export: /root/export_excel/ # cloud


//    public static Map<String, String> websiteUrlCourseIdPageIdMap = Map.ofEntries(
//            Map.entry("www.floraengine.org", "[['4', [8, 25]], ['6', [31, 48]], ['8', [68, 68]], ['9', [105, 105]], ['10', [95, 95]], ['11', [96, 96]], ['12', [97, 97]], ['13', [98, 98]], ['14', [99, 99]], ['15', [100, 100]], ['16', [101, 101]], ['17', [102, 102]], ['18', [103, 103]], ['19', [104, 104]]]"),
//            Map.entry("study.floralearn.cn", "[['4', [7, 24]], ['10', [35, 52]], ['12', [61, 78]]]"),
//            Map.entry("nijmegen.floraproject.org", "[['36', [182, 199]], ['65', [402, 419]], ['49', [284, 302]], ['50', [303, 321]], ['51', [322, 340]]]"), //cella monash 1, cella TUM 1, lighthouse 3
//            Map.entry("oulucella.oulu.fi", "[['4', [7, 24]]]")
//    );


    //如果某个课程需要消除页面上的link，可以加入这个list，如果不需要则可以不加入这个link
    public static List<Long> NEED_TRACE_COURSE_ID_LIST = new ArrayList<>();
    public static Set<String> RELEVANT_READING_PAGE_ID_SET = new HashSet<>();
    public static Set<String> IRRELEVANT_READING_PAGE_ID_SET = new HashSet<>();
    public static Set<String> TASK_OVERVIEW_READING_PAGE_ID_SET = new HashSet<>();
    public static Set<String> TASK_REQUIREMENT_READING_PAGE_ID_SET = new HashSet<>();
    public static Set<String> LEARNING_GOAL_READING_PAGE_ID_SET = new HashSet<>();
    public static Set<String> RUBRIC_READING_PAGE_ID_SET = new HashSet<>();
    public static Set<String> WELCOME_READING_PAGE_ID_SET = new HashSet<>();

}
