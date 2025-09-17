package com.monash.flora_backend;

import com.monash.flora_backend.constant.MyConstant;
import com.monash.flora_backend.constant.MyMoodleConfigConstant;
import com.monash.flora_backend.dao.entity.FloraUser;
import com.monash.flora_backend.service.IFloraUserService;
import com.monash.flora_backend.service_moodle.IMdlQuestionnaireService;
import com.monash.flora_backend.service_moodle.IMdlConfigService;
import lombok.extern.slf4j.Slf4j;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.env.Environment;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.*;

/**
 * @author Xinyu Li
 * @date 2/8/2024
 */
@Slf4j
@SpringBootApplication
@MapperScan(basePackages = {"com.monash.flora_backend.dao.mapper"})
public class FLoRABackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(FLoRABackendApplication.class, args);
    }


    //    @Autowired
//    private ResourceLoader resourceLoader;
    @Autowired
    private IFloraUserService iFloraUserService;
    @Autowired
    private IMdlQuestionnaireService iMdlQuestionnaireService;

    @Autowired
    private PasswordEncoder passwordEncoder;
    /**
     * 修改完之后需要 development -> purge caches
     */
    @Bean
    CommandLineRunner run(IMdlConfigService iMdlConfigService, Environment environment) {
        // 此map是为了生成对应的generico plugin
        Map<String, List<String>> websiteUrlStudyNameMap = Map.ofEntries(
                Map.entry("www.floraengine.org", List.of("flora_demo_training",
                        "flora_cella_monash_education_groupA", "flora_cella_monash_education_groupB", "flora_cella_monash_education_groupC",
                        "flora_cella_monash_medicine_groupA", "flora_cella_monash_medicine_groupB", "flora_cella_monash_medicine_groupC",
                        "flora_monash_fit5145_training", "flora_monash_fit5145",
                        "flora_monash_fit5086_training", "flora_monash_fit5086",
                        "flora_cella_monash_FIT5125_training", "flora_cella_monash_FIT5125_groupA", "flora_cella_monash_FIT5125_groupB")),
                Map.entry("ar.floraengine.org", List.of( //TODO need update when restart, change to ar.floraengine.org
                        "flora_cella_uae_medicine_groupA", "flora_cella_uae_medicine_groupB", "flora_cella_uae_medicine_groupC",
                        "flora_cella_uae_training", "flora_arabic_2024_A", "flora_arabic_2024_B", "flora_arabic_2024_C", "flora_arabic_2024_training")),
                Map.entry("yidelearn.com", List.of("flora_beijing_online", "flora_beijing_lab", "flora_beijing_lab_revision", "flora_beijing_23aut_la", "flora_huadong_course1",
                        "flora_huadong_course2", "flora_beijing_ucas_23aut_task_lab",
                        "flora_beijing_medical_consultation_groupA", "flora_beijing_medical_consultation2_groupA", "flora_beijing_medical_consultation3_groupA", "flora_beijing_medical_consultation4_groupA", "flora_beijing_medical_consultation5_groupA", // 无scaffold  组
                        "flora_beijing_medical_consultation_groupB", "flora_beijing_medical_consultation2_groupB", "flora_beijing_medical_consultation3_groupB", "flora_beijing_medical_consultation4_groupB", "flora_beijing_medical_consultation5_groupB",
                        "flora_beijing_medical_consultation4_groupA_3.5", "flora_beijing_medical_consultation4_groupA_4", "flora_beijing_medical_consultation4_groupB_3.5", "flora_beijing_medical_consultation4_groupB_4",
                        "flora_beijing_apr_2024_A", "flora_beijing_apr_2024_B", "flora_beijing_apr_2024_C",// 有scaffold 组
                        "flora_cella_beijing_medicine_groupA", "flora_cella_beijing_medicine_groupB", "flora_cella_beijing_medicine_groupC",

                        "flora_beijing_toefl_discuss_GA", "flora_beijing_toefl_discuss_HE", "flora_beijing_toefl_discuss_SA", "flora_beijing_toefl_general_setting_discuss",
                        "flora_beijing_toefl_general_setting_writing", "flora_beijing_toefl_writing_GA", "flora_beijing_toefl_writing_HE", "flora_beijing_toefl_writing_SA",

                        "flora_beijing_sustainable_education_stage1", "flora_beijing_sustainable_education_stage2", "flora_beijing_sustainable_education_stage3",
                        "flora_beijing_sustainable_education_stage4", "flora_beijing_sustainable_education_stage5", "flora_beijing_sustainable_education_stage6",
                        "flora_beijing_sustainable_education_test", "flora_beijing_sustainable_education_CG1", "flora_beijing_sustainable_education_CG2", "flora_beijing_sustainable_education_solution",
                        "flora_beijing_academic_writing_and_expression_test"

                        )),
                Map.entry("nijmegen.floraproject.org", List.of("cella_demo_monash",
                        "cella_tum", "cella_tum_training1", "cella_tum_training2", "flora_tum_apr_2024", "flora_tum_training1_apr_2024",
                        "cella_lighthouse_1", "cella_lighthouse_2", "cella_lighthouse_3",
                        "cella_training",
                        "cella_ru_s2_training", "cella_ru_s2_essay1", "cella_ru_s2_essay2",
                        "cella_cursus_task1", "cella_cursus_task2"
                        )), //cella monash 1, cella TUM 1, lighthouse 3
                Map.entry("oulucella.oulu.fi", List.of("cella_oulu_task2_ai_in_edu_groupA", "cella_oulu_task1_biology_groupA",
                        "cella_oulu_task2_ai_in_edu_groupB", "cella_oulu_task1_biology_groupB",
                        "cella_oulu_task2_ai_in_edu_groupC", "cella_oulu_task1_biology_groupC", "cella_oulu_training",
                        "cella_oulu_study3_test", "cella_oulu_study3_groupA", "cella_oulu_study3_groupB", "cella_oulu_study3_AI_groupC", "cella_oulu_study3_Bio_groupC")),
                Map.entry("flora.cite.hku.hk", List.of("flora_hku_202402_demo")),
//                Map.entry("lak24.floraengine.org", List.of("flora_demo_training", "flora_cella_monash_medicine_groupA", "flora_cella_monash_medicine_groupB", "flora_cella_monash_medicine_groupC")),
                Map.entry("cella-lala.floraengine.org", List.of("flora_demo_training", "flora_cella_brazil_demo_training", "flora_cella_colombia_demo_training",
                        "flora_cella_colombia_education_groupA", "flora_cella_colombia_education_groupB", "flora_cella_colombia_education_groupC",
                        "flora_cella_colombia_medicine_groupA", "flora_cella_colombia_medicine_groupB", "flora_cella_colombia_medicine_groupC",
                        "flora_cella_brazil_medicine_groupA", "flora_cella_brazil_medicine_groupB", "flora_cella_brazil_medicine_groupC"
                        )),
                Map.entry("flora.ntcu.edu.tw", List.of("flora_ntcu_dec_2024_A", "flora_ntcu_dec_2024_B", "flora_ntcu_dec_2024_C", "flora_ntcu_dec_2024_training"))


        );


        Properties properties = System.getProperties();

        String osName = properties.getProperty("os.name");
        log.info("------------------os name:" + osName);
        String serverName = environment.getProperty("server.name", "floraengine");
        log.info("serverName environment:" + serverName);
        if (osName.equals("Linux")) { // means server environment
//        if (osName.equals("Windows 10")) { // means server environment
            MyConstant.BATCH_SIZE = 100;
            MyMoodleConfigConstant.EXCEL_EXPORT_PATH = "/root/export_excel";
            MyMoodleConfigConstant.FILE_UPLOAD_PATH = "/root/upload";
            String[] modalContentArray;
            Map<String, String[]> courseIdModalContentMap = new HashMap<>();
            switch (serverName) {
                case "hku":
                    // hku server
                    // MyConstant.CHAT_SERVICE_CHATGPT_URI = "/chatgpt-azure";
                    MyMoodleConfigConstant.IRRELEVANT_READING_PAGE_ID_SET.addAll(Set.of("11", "13", "20", "22", "25"));
                    MyMoodleConfigConstant.TASK_REQUIREMENT_READING_PAGE_ID_SET.addAll(Set.of("8"));
                    MyMoodleConfigConstant.RUBRIC_READING_PAGE_ID_SET.addAll(Set.of("9"));
                    MyMoodleConfigConstant.NEED_TRACE_COURSE_ID_LIST = List.of(4L);
                    modalContentArray = new String[]{"Start Main Essay Activity", "This task has a time limit of 45 minutes. Note that only <strong>1 attempt</strong> is allowed. Are you sure you want enter the task?",
                            "Yes - Continue", "No - Go to Homepage", "Time is up", "", "Back to Homepage", "true", "Download Essay"};

                    MyMoodleConfigConstant.NEED_TRACE_COURSE_ID_LIST.forEach(courseId -> {
                        courseIdModalContentMap.put(String.valueOf(courseId), modalContentArray);
                    });

                    iMdlConfigService.setupConfigValueForOnlineEnvironment("flora.cite.hku.hk", courseIdModalContentMap, MyMoodleConfigConstant.NEED_TRACE_COURSE_ID_LIST, websiteUrlStudyNameMap.get("flora.cite.hku.hk"));

                    break;
                case "ntcu":
                    //flora engine server

                    MyMoodleConfigConstant.IRRELEVANT_READING_PAGE_ID_SET.addAll(Set.of());
                    MyMoodleConfigConstant.WELCOME_READING_PAGE_ID_SET.addAll(Set.of("1", "37", "19"));
                    MyMoodleConfigConstant.TASK_REQUIREMENT_READING_PAGE_ID_SET.addAll(Set.of("2", "38", "20"));
                    MyMoodleConfigConstant.RUBRIC_READING_PAGE_ID_SET.addAll(Set.of("3", "39", "21"));



                    MyMoodleConfigConstant.NEED_TRACE_COURSE_ID_LIST = List.of(2L, 3L, 4L);
                    modalContentArray = new String[]{"Start Main Essay Activity", "This task has a time limit of 45 minutes. Note that only <strong>1 attempt</strong> is allowed. Are you sure you want enter the task?",
                            "Yes - Continue", "No - Go to Homepage", "Time is up", "", "Back to Homepage", "true", "Download Essay"};

                    MyMoodleConfigConstant.NEED_TRACE_COURSE_ID_LIST.forEach(courseId -> {
                        courseIdModalContentMap.put(String.valueOf(courseId), modalContentArray);
                    });

                    iMdlConfigService.setupConfigValueForOnlineEnvironment("flora.ntcu.edu.tw", courseIdModalContentMap, MyMoodleConfigConstant.NEED_TRACE_COURSE_ID_LIST, websiteUrlStudyNameMap.get("flora.ntcu.edu.tw"));
                    break;
                case "ar":
                    //flora engine server

                    MyMoodleConfigConstant.IRRELEVANT_READING_PAGE_ID_SET.addAll(Set.of());
                    MyMoodleConfigConstant.TASK_REQUIREMENT_READING_PAGE_ID_SET.addAll(Set.of("91", "109", "127", "311", "333"));
                    MyMoodleConfigConstant.RUBRIC_READING_PAGE_ID_SET.addAll(Set.of("92", "110", "128",           "312", "334"));
                    MyMoodleConfigConstant.WELCOME_READING_PAGE_ID_SET.addAll(Set.of("90", "108", "126",          "349", "350"));


                    MyMoodleConfigConstant.NEED_TRACE_COURSE_ID_LIST = List.of(10L, 11L, 12L, 23L, 28L);
                    modalContentArray = new String[]{"Start Main Essay Activity", "This task has a time limit of 45 minutes. Note that only <strong>1 attempt</strong> is allowed. Are you sure you want enter the task?",
                            "Yes - Continue", "No - Go to Homepage", "Time is up", "", "Back to Homepage", "true", "Download Essay"};

                    MyMoodleConfigConstant.NEED_TRACE_COURSE_ID_LIST.forEach(courseId -> {
                        courseIdModalContentMap.put(String.valueOf(courseId), modalContentArray);
                    });

                    iMdlConfigService.setupConfigValueForOnlineEnvironment("ar.floraengine.org", courseIdModalContentMap, MyMoodleConfigConstant.NEED_TRACE_COURSE_ID_LIST, websiteUrlStudyNameMap.get("ar.floraengine.org"));
                    break;
                case "floraengine":
                    //flora engine server

//                    MyMoodleConfigConstant.IRRELEVANT_READING_PAGE_ID_SET.addAll(Set.of("11", "13", "20", "22", "25", "34", "36", "43", "45", "48"));
                    MyMoodleConfigConstant.TASK_REQUIREMENT_READING_PAGE_ID_SET.addAll(Set.of("8", "31", "118", "136", "154", "172", "294", "301", "307"));
                    MyMoodleConfigConstant.RUBRIC_READING_PAGE_ID_SET.addAll(Set.of("9", "32", "119", "137", "155", "173", "295", "302", "308"));
                    MyMoodleConfigConstant.WELCOME_READING_PAGE_ID_SET.addAll(Set.of("196", "197", "198"));

        //            String modalContent = "This task is a critical thinking task, do you want to continue?"; // unisa
                    MyMoodleConfigConstant.NEED_TRACE_COURSE_ID_LIST = List.of(4L, 6L, 20L, 21L, 22L, 23L, 8L, 9L, 10L, 11L, 12L, 13L, 14L, 15L, 16L, 17L, 18L, 19L, 37L, 38L, 39L);
                    modalContentArray = new String[]{"Start Main Essay Activity", "This task has a time limit of 45 minutes. Note that only <strong>1 attempt</strong> is allowed. Are you sure you want enter the task?",
                            "Yes - Continue", "No - Go to Homepage", "Time is up", "", "Back to Homepage", "true", "Download Essay"};

                    MyMoodleConfigConstant.NEED_TRACE_COURSE_ID_LIST.forEach(courseId -> {
                        courseIdModalContentMap.put(String.valueOf(courseId), modalContentArray);
                    });

                    iMdlConfigService.setupConfigValueForOnlineEnvironment("www.floraengine.org", courseIdModalContentMap, MyMoodleConfigConstant.NEED_TRACE_COURSE_ID_LIST, websiteUrlStudyNameMap.get("www.floraengine.org"));
                    break;
                case "nijmegen":
                    //nijmegen server
//                    MyConstant.CHAT_SERVICE_URL = "https://chat-service.floraproject.org/myapi";

                    MyMoodleConfigConstant.IRRELEVANT_READING_PAGE_ID_SET.addAll(Set.of("288", "290", "297", "299", "302", "307", "309", "316", "318",
                            "321", "326", "328", "335", "337", "340", "185", "187", "194", "196", "199", "405", "407", "414", "416", "419", "250", "252", "259", "261", "264"));
                    MyMoodleConfigConstant.TASK_REQUIREMENT_READING_PAGE_ID_SET.addAll(Set.of("247", "225", "471", "284", "303", "322", "182", "402", "647", "705", "726"));
                    MyMoodleConfigConstant.RUBRIC_READING_PAGE_ID_SET.addAll(Set.of(          "248", "226", "470", "285", "304", "323", "183", "403", "648", "706", "727"));
                    MyMoodleConfigConstant.NEED_TRACE_COURSE_ID_LIST = List.of(                40L,   25L,   49L,   50L,   51L,   36L,   65L,  42L, 98L, 101L);
                    modalContentArray = new String[]{"Start Main Essay Activity", "This task has a time limit of 45 minutes. Note that only <strong>1 attempt</strong> is allowed. Are you sure you want enter the task?",
                            "Yes - Continue", "No - Go to Homepage", "Time is up", "", "Back to Homepage", "true", "Download Essay"};  // true or false for download essay link

                    MyMoodleConfigConstant.NEED_TRACE_COURSE_ID_LIST.forEach(courseId -> {
                        courseIdModalContentMap.put(String.valueOf(courseId), modalContentArray);
                    });

                    iMdlConfigService.setupConfigValueForOnlineEnvironment("nijmegen.floraproject.org", courseIdModalContentMap, MyMoodleConfigConstant.NEED_TRACE_COURSE_ID_LIST, websiteUrlStudyNameMap.get("nijmegen.floraproject.org"));
                    break;
                case "oulu":
                    //oulu server
                    MyMoodleConfigConstant.IRRELEVANT_READING_PAGE_ID_SET.addAll(Set.of("31", "33", "40", "42", "45"));
                    MyMoodleConfigConstant.TASK_REQUIREMENT_READING_PAGE_ID_SET.addAll(Set.of("28",         "49", "89", "77",      "119", "101", "150"));
                    MyMoodleConfigConstant.RUBRIC_READING_PAGE_ID_SET.addAll(Set.of(          "29",         "50", "90", "78",      "120", "102", "151"));
                    MyMoodleConfigConstant.NEED_TRACE_COURSE_ID_LIST = List.of(15L, 16L, 17L, 18L, 19L, 20L, 27L); //为了消除界面上的link
                    modalContentArray = new String[]{"Aloita kirjoitelmatehtävä", "Tämän tehtävän aikaraja on 45 minuuttia. Huomaa, että vain yksi yritys on sallittu. Haluatko varmasti osallistua tehtävään?",
                            "Kyllä, jatkan", "Ei, palaa kotisivulle", "Tehtäväaika on loppunut", "", "Takaisin kotisivulle", "false", "Download Essay"};  // true or false for download essay link
//                    modalContentArray = new String[]{"Start Main Essay Activity", "This task has a time limit of 45 minutes. Note that only <strong>1 attempt</strong> is allowed. Are you sure you want enter the task?",
//                            "Yes - Continue", "No - Go to Homepage", "Time is up", "", "Back to Homepage", "false", "Download Essay"};  // true or false for download essay link

                    MyMoodleConfigConstant.NEED_TRACE_COURSE_ID_LIST.forEach(courseId -> {
                        courseIdModalContentMap.put(String.valueOf(courseId), modalContentArray);
                    });

                    iMdlConfigService.setupConfigValueForOnlineEnvironment("oulucella.oulu.fi", courseIdModalContentMap, MyMoodleConfigConstant.NEED_TRACE_COURSE_ID_LIST, websiteUrlStudyNameMap.get("oulucella.oulu.fi"));
                    break;
                case "beijing":
                    //beijing server
                    String modalContent = "Would you like to start or continue the reading and writing task?"; // general
                    MyConstant.CHAT_SERVICE_URL = "https://chat-service.floraproject.org/myapi"; // 此处的/myapi 是在chat server上面nginx 转发的路径
                    MyMoodleConfigConstant.IRRELEVANT_READING_PAGE_ID_SET.addAll(Set.of("10", "12", "19", "21", "24", "38", "40", "47", "49", "52", "64", "66", "73", "75", "78", "355", "357", "364", "366", "369"));
                    MyMoodleConfigConstant.TASK_REQUIREMENT_READING_PAGE_ID_SET.addAll(Set.of("7", "35", "61", "351", "491", "576", "933", "914", "895", "952", "1010", "1027", "775", "655", "1053", "1083", "805", "685", "835", "715"));
                    MyMoodleConfigConstant.RUBRIC_READING_PAGE_ID_SET.addAll(Set.of("8", "36", "62", "352", "573", "577", "934", "915", "896", "953", "1011", "1028", "776", "656", "1054", "1084", "806", "685", "836", "716"));
                    MyMoodleConfigConstant.WELCOME_READING_PAGE_ID_SET.addAll(Set.of("1046", "1047", "1048", "869", "870", "1113", "1114", "1115"));
                    MyMoodleConfigConstant.NEED_TRACE_COURSE_ID_LIST = List.of(4L, 10L, 12L, 30L, 31L, 38L, 56L, 58L, 73L, 74L, 75L, 76L, 81L, 82L, 60L, 64L, 61L, 65L, 85L, 86L, 66L, 62L); //为了消除界面上的link,
                    modalContentArray = new String[]{"开始读写任务", "此任务有时间限制. 请注意，本学习任务只允许完成 <strong>1次</strong>。 你准备好开始任务了吗？",
                            "是 - 开始", "否 - 返回主页", "时间到", "", "回到课程首页", "是的", "下载作文"};  // true or false for download essay link

                    MyMoodleConfigConstant.NEED_TRACE_COURSE_ID_LIST.forEach(courseId -> {
                        courseIdModalContentMap.put(String.valueOf(courseId), modalContentArray);
                    });

                    iMdlConfigService.setupConfigValueForOnlineEnvironment("yidelearn.com", courseIdModalContentMap, MyMoodleConfigConstant.NEED_TRACE_COURSE_ID_LIST, websiteUrlStudyNameMap.get("yidelearn.com"));
                    break;

                case "cella-lala":
                    MyMoodleConfigConstant.IRRELEVANT_READING_PAGE_ID_SET.addAll(Set.of());
                    MyMoodleConfigConstant.WELCOME_READING_PAGE_ID_SET.addAll(Set.of(                     "32", "70", "88", "106", "157", "175", "193"));
                    MyMoodleConfigConstant.TASK_REQUIREMENT_READING_PAGE_ID_SET.addAll(Set.of("14", "32", "50", "68", "86", "104", "158", "176", "194"));
                    MyMoodleConfigConstant.RUBRIC_READING_PAGE_ID_SET.addAll(Set.of(          "15", "33", "51", "69", "87", "105", "159", "177", "195"));


                    //            String modalContent = "This task is a critical thinking task, do you want to continue?"; // unisa
                    MyMoodleConfigConstant.NEED_TRACE_COURSE_ID_LIST = List.of(5L, 6L, 7L, 8L, 9L, 10L, 15L, 16L, 17L);
                    modalContentArray = new String[]{"Start Main Essay Activity", "This task has a time limit of 45 minutes. Note that only <strong>1 attempt</strong> is allowed. Are you sure you want enter the task?",
                            "Yes - Continue", "No - Go to Homepage", "Time is up", "", "Back to Homepage", "false", "Download Essay"};

                    courseIdModalContentMap.put("5", new String[]{"Iniciar Actividad Principal de Ensayo", "Esta tarea tiene un límite de tiempo de 45 minutos. Ten en cuenta que solo se permite 1 intento. ¿Estás seguro de que quieres comenzar la tarea?",
                            "Sí - Continuar", "No - página principal", "Se acabó el tiempo", "", "página principal", "false", "Download Essay"});
                    courseIdModalContentMap.put("6", new String[]{"Iniciar Actividad Principal de Ensayo", "Esta tarea tiene un límite de tiempo de 45 minutos. Ten en cuenta que solo se permite 1 intento. ¿Estás seguro de que quieres comenzar la tarea?",
                            "Sí - Continuar", "No - página principal", "Se acabó el tiempo", "", "página principal", "false", "Download Essay"});
                    courseIdModalContentMap.put("7", new String[]{"Iniciar Actividad Principal de Ensayo", "Esta tarea tiene un límite de tiempo de 45 minutos. Ten en cuenta que solo se permite 1 intento. ¿Estás seguro de que quieres comenzar la tarea?",
                            "Sí - Continuar", "No - página principal", "Se acabó el tiempo", "", "página principal", "false", "Download Essay"});
                    courseIdModalContentMap.put("8", new String[]{"Iniciar Actividad Principal de Ensayo", "Esta tarea tiene un límite de tiempo de 45 minutos. Ten en cuenta que solo se permite 1 intento. ¿Estás seguro de que quieres comenzar la tarea?",
                            "Sí - Continuar", "No - página principal", "Se acabó el tiempo", "", "página principal", "false", "Download Essay"});
                    courseIdModalContentMap.put("9", new String[]{"Iniciar Actividad Principal de Ensayo", "Esta tarea tiene un límite de tiempo de 45 minutos. Ten en cuenta que solo se permite 1 intento. ¿Estás seguro de que quieres comenzar la tarea?",
                            "Sí - Continuar", "No - página principal", "Se acabó el tiempo", "", "página principal", "false", "Download Essay"});
                    courseIdModalContentMap.put("10", new String[]{"Iniciar Actividad Principal de Ensayo", "Esta tarea tiene un límite de tiempo de 45 minutos. Ten en cuenta que solo se permite 1 intento. ¿Estás seguro de que quieres comenzar la tarea?",
                            "Sí - Continuar", "No - página principal", "Se acabó el tiempo", "", "página principal", "false", "Download Essay"});
                    courseIdModalContentMap.put("15", new String[]{"Iniciar Atividade Principal de Redação", "Esta tarefa tem um limite de tempo de 45 minutos. Observe que apenas 1 tentativa é permitida. Você tem certeza de que quer iniciar a tarefa?",
                            "Sim - Continuar", "Não - Página Inicial", "O tempo acabou", "", "Página Inicial", "false", "Download Essay"});
                    courseIdModalContentMap.put("16", new String[]{"Iniciar Atividade Principal de Redação", "Esta tarefa tem um limite de tempo de 45 minutos. Observe que apenas 1 tentativa é permitida. Você tem certeza de que quer iniciar a tarefa?",
                            "Sim - Continuar", "Não - Página Inicial", "O tempo acabou", "", "Página Inicial", "false", "Download Essay"});
                    courseIdModalContentMap.put("17", new String[]{"Iniciar Atividade Principal de Redação", "Esta tarefa tem um limite de tempo de 45 minutos. Observe que apenas 1 tentativa é permitida. Você tem certeza de que quer iniciar a tarefa?",
                            "Sim - Continuar", "Não - Página Inicial", "O tempo acabou", "", "Página Inicial", "false", "Download Essay"});

                    iMdlConfigService.setupConfigValueForOnlineEnvironment("cella-lala.floraengine.org", courseIdModalContentMap, MyMoodleConfigConstant.NEED_TRACE_COURSE_ID_LIST, websiteUrlStudyNameMap.get("cella-lala.floraengine.org"));
                    break;
            }
        }

        return args -> {
            log.info("run after start<<<<<<<<<<<<<<<<<<<<<<<");

        //     log.info("" + iMdlQuestionnaireService.countByUserIdAndCourseId(Long.valueOf(2), Long.valueOf(7)));
            log.info("getOtherResponsesByQuestionnaireFuzzyName >> " + iMdlQuestionnaireService.getDateResponsesByQuestionnaireFuzzyName("understand"));


            List<FloraUser> floraUserList = new ArrayList<>();
            if (iFloraUserService.findByUsername("flora_user").isEmpty()) {
                floraUserList.add(new FloraUser("flora_user", passwordEncoder.encode("flora_user"), "USER"));
            }
            if (iFloraUserService.findByUsername("flora_teacher").isEmpty()) {
                floraUserList.add(new FloraUser("flora_teacher", passwordEncoder.encode("flora_teacher"), "MANAGER"));
            }
            if (iFloraUserService.findByUsername("flora_admin").isEmpty()) {
                floraUserList.add(new FloraUser("flora_admin", passwordEncoder.encode("flora_admin"), "ADMIN"));
            }
            log.info("floraUserList isempty:" + floraUserList.isEmpty());
            // 添加后台用户到数据库中
            // USER ADMIN MANAGER
            if (!floraUserList.isEmpty()) {
                iFloraUserService.saveBatch(floraUserList);
            }
        };
    }
}