package com.monash.flora_backend;
// docker run -d --log-driver json-file --log-opt max-size=100m --log-opt max-file=2 --name kafkaC -p 9092:9092 -e KAFKA_BROKER_ID=0 -e KAFKA_ZOOKEEPER_CONNECT=130.194.73.242:2181/kafka -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://130.194.73.242:9092 -e ALLOW_PLAINTEXT_LISTENER=yes -e KAFKA_LISTENERS=PLAINTEXT://0.0.0.0:9092 -v /etc/localtime:/etc/localtime bitnami/kafka
//docker run -d --log-driver json-file --log-opt max-size=100m --log-opt max-file=2 --name kafkavpn -p 9092:9092 -e KAFKA_BROKER_ID=0 -e KAFKA_ZOOKEEPER_CONNECT=192.168.43.234:2181/kafka -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://192.168.43.234:9092 -e ALLOW_PLAINTEXT_LISTENER=yes -e KAFKA_LISTENERS=PLAINTEXT://0.0.0.0:9092 -v /etc/localtime:/etc/localtime bitnami/kafka

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
                        "cella2/flora_cella_monash_education_groupA", "cella2/flora_cella_monash_education_groupB", "cella2/flora_cella_monash_education_groupC",
                        "cella2/flora_cella_monash_medicine_groupA", "cella2/flora_cella_monash_medicine_groupB", "cella2/flora_cella_monash_medicine_groupC",
                        "real_course/flora_monash_fit5145_training", "real_course/flora_monash_fit5145", "real_course/flora_monash_fit5145_dialogue_label",
                        "real_course/flora_monash_fit5086_training", "real_course/flora_monash_fit5086",
                        //Mladen courses
                        "real_course/flora_cella_monash_FIT5125_training", "real_course/flora_cella_monash_FIT5125_groupA", "real_course/flora_cella_monash_FIT5125_groupB",
                        "cella3/cella3_monash_2025_Bio_groupA", "cella3/cella3_monash_2025_Bio_groupB", "cella3/cella3_monash_2025_Bio_groupC",
                        "cella3/cella3_monash_2025_Energy_groupA", "cella3/cella3_monash_2025_Energy_groupB", "cella3/cella3_monash_2025_Energy_groupC",
                        "cella3/training/cella3_monash_2025_Energy_groupA_training", "cella3/training/cella3_monash_2025_Energy_groupB_training", "cella3/training/cella3_monash_2025_Energy_groupC_training"
                )),
                Map.entry("flora.foi.hr", List.of(
                        "cella3/cella3_Croatia_2025_Energy_groupA", "cella3/cella3_Croatia_2025_Energy_groupB", "cella3/cella3_Croatia_2025_Energy_groupC",
                        "cella3/training/cella3_Croatia_2025_Energy_groupA_training", "cella3/training/cella3_Croatia_2025_Energy_groupB_training", "cella3/training/cella3_Croatia_2025_Energy_groupC_training",

                        "cella3/cella3_monash_2025_Energy_groupA", "cella3/cella3_monash_2025_Energy_groupB", "cella3/cella3_monash_2025_Energy_groupC"
                )),
                Map.entry("ar.floraengine.org", List.of(
                        "cella2/flora_cella_uae_medicine_groupA", "cella2/flora_cella_uae_medicine_groupB", "cella2/flora_cella_uae_medicine_groupC",
                        "cella2/flora_cella_uae_training", "flora_arabic_2024_A", "flora_arabic_2024_B", "flora_arabic_2024_C", "flora_arabic_2024_training", "flora_arabic_norah_2025_GE", "flora_arabic_norah_2025_CN", "flora_lak25_tools_demo", "flora_lak25_demo_cella",
                        //Cella3 UAE
                        "cella3/cella3_SEA-UAE_2025_Energy_groupA", "cella3/cella3_SEA-UAE_2025_Energy_groupB", "cella3/cella3_SEA-UAE_2025_Energy_groupC",
                        "cella3/training/cella3_SEA-UAE_2025_Energy_groupA_training", "cella3/training/cella3_SEA-UAE_2025_Energy_groupB_training", "cella3/training/cella3_SEA-UAE_2025_Energy_groupC_training",
                        //Cella3 Denmark
                        "cella3/cella3_UCPH-Denmark_2025_Energy_groupA", "cella3/cella3_UCPH-Denmark_2025_Energy_groupB", "cella3/cella3_UCPH-Denmark_2025_Energy_groupC",
                        "cella3/training/cella3_UCPH-Denmark_2025_Energy_groupA_training", "cella3/training/cella3_UCPH-Denmark_2025_Energy_groupB_training", "cella3/training/cella3_UCPH-Denmark_2025_Energy_groupC_training",
                        //cella3 Austria Germany
                        "cella3/cella3_German_2025_Energy_groupA", "cella3/cella3_German_2025_Energy_groupB", "cella3/cella3_German_2025_Energy_groupC",
                        "cella3/training/cella3_German_2025_Energy_groupA_training", "cella3/training/cella3_German_2025_Energy_groupB_training", "cella3/training/cella3_German_2025_Energy_groupC_training",
                        //cella3 Arabic
                        "cella3/cella3_Arabic_2025_Energy_groupA", "cella3/cella3_Arabic_2025_Energy_groupB", "cella3/cella3_Arabic_2025_Energy_groupC",
                        "cella3/training/cella3_Arabic_2025_Energy_groupA_training", "cella3/training/cella3_Arabic_2025_Energy_groupB_training", "cella3/training/cella3_Arabic_2025_Energy_groupC_training",
                        //cella3 Czech
                        "cella3/cella3_Czech_2025_Energy_groupA", "cella3/cella3_Czech_2025_Energy_groupB", "cella3/cella3_Czech_2025_Energy_groupC",
                        "cella3/training/cella3_Czech_2025_Energy_groupA_training", "cella3/training/cella3_Czech_2025_Energy_groupB_training", "cella3/training/cella3_Czech_2025_Energy_groupC_training",
                        "cella3/cella3_Czech_2025_Energy_extra",
                        //cella3 Slovak
                        "cella3/cella3_Slovak_2025_Energy_groupA", "cella3/cella3_Slovak_2025_Energy_groupB", "cella3/cella3_Slovak_2025_Energy_groupC",
                        "cella3/training/cella3_Slovak_2025_Energy_groupA_training", "cella3/training/cella3_Slovak_2025_Energy_groupB_training", "cella3/training/cella3_Slovak_2025_Energy_groupC_training",
                        "cella3/cella3_Slovak_2025_Energy_extra",
                        //cella3 Netherlands
                        "cella3/cella3_Netherlands_2025_Energy_groupA", "cella3/cella3_Netherlands_2025_Energy_groupB", "cella3/cella3_Netherlands_2025_Energy_groupC", "cella3/cella3_Netherlands_2025_Energy_groupD",
                        "cella3/training/cella3_Netherlands_2025_Energy_groupA_training", "cella3/training/cella3_Netherlands_2025_Energy_groupB_training", "cella3/training/cella3_Netherlands_2025_Energy_groupC_training",
                        //cella3 UK
                        "cella3/cella3_UK_2025_Energy_groupA", "cella3/cella3_UK_2025_Energy_groupB", "cella3/cella3_UK_2025_Energy_groupC",
                        "cella3/training/cella3_UK_2025_Energy_groupA_training", "cella3/training/cella3_UK_2025_Energy_groupB_training", "cella3/training/cella3_UK_2025_Energy_groupC_training"
                        )),
                Map.entry("yidelearn.com", List.of("flora_beijing_online", "flora_beijing_lab", "flora_beijing_lab_revision", "flora_beijing_23aut_la", "flora_huadong_course1",
                        "flora_huadong_course2", "flora_beijing_ucas_23aut_task_lab",
                        "beijing/medical/flora_beijing_medical_consultation_groupA", "beijing/medical/flora_beijing_medical_consultation2_groupA", "beijing/medical/flora_beijing_medical_consultation3_groupA", "beijing/medical/flora_beijing_medical_consultation4_groupA", "beijing/medical/flora_beijing_medical_consultation5_groupA", // 无scaffold  组
                        "beijing/medical/flora_beijing_medical_consultation_groupB", "beijing/medical/flora_beijing_medical_consultation2_groupB", "beijing/medical/flora_beijing_medical_consultation3_groupB", "beijing/medical/flora_beijing_medical_consultation4_groupB", "beijing/medical/flora_beijing_medical_consultation5_groupB",
                        "beijing/medical/flora_beijing_medical_consultation4_groupA_3.5", "beijing/medical/flora_beijing_medical_consultation4_groupA_4", "beijing/medical/flora_beijing_medical_consultation4_groupB_3.5", "beijing/medical/flora_beijing_medical_consultation4_groupB_4",
                        "beijing/ucas/flora_beijing_apr_2024_A", "beijing/ucas/flora_beijing_apr_2024_B", "beijing/ucas/flora_beijing_apr_2024_C",// 有scaffold 组
                        "cella2/flora_cella_beijing_medicine_groupA", "cella2/flora_cella_beijing_medicine_groupB", "cella2/flora_cella_beijing_medicine_groupC", "cella2/flora_cella_beijing_medicine_training",

                        "beijing/toefl/flora_beijing_toefl_discuss_GA", "beijing/toefl/flora_beijing_toefl_discuss_HE", "beijing/toefl/flora_beijing_toefl_discuss_SA", "beijing/toefl/flora_beijing_toefl_general_setting_discuss",
                        "beijing/toefl/flora_beijing_toefl_general_setting_writing", "beijing/toefl/flora_beijing_toefl_writing_GA", "beijing/toefl/flora_beijing_toefl_writing_HE", "beijing/toefl/flora_beijing_toefl_writing_SA",

                        "beijing/sustainable/flora_beijing_sustainable_education_stage1", "beijing/sustainable/flora_beijing_sustainable_education_stage2", "beijing/sustainable/flora_beijing_sustainable_education_stage3",
                        "beijing/sustainable/flora_beijing_sustainable_education_stage4", "beijing/sustainable/flora_beijing_sustainable_education_stage5", "beijing/sustainable/flora_beijing_sustainable_education_stage6",
                        "beijing/sustainable/flora_beijing_sustainable_education_test", "beijing/sustainable/flora_beijing_sustainable_education_CG1", "beijing/sustainable/flora_beijing_sustainable_education_CG2", "beijing/sustainable/flora_beijing_sustainable_education_solution",
                        "flora_beijing_academic_writing_and_expression_test",

                        // beijing 2025 spring medical vsp research
                        "beijing/medical/flora_beijing_2025spring_medical_phase1_test","beijing/medical/flora_beijing_2025spring_medical_phase2_test","beijing/medical/flora_beijing_2025spring_medical_phase3_test",
                        "beijing/medical/flora_beijing_2025spring_medical_test_case1",
                        "beijing/medical/flora_beijing_2025spring_medical_test_case4",
                        "beijing/medical/flora_beijing_2025spring_medical_test_case5",
                        "beijing/medical/flora_beijing_2025spring_medical_test_case6",
                        "beijing/medical/flora_beijing_2025spring_medical_test_case7",
                        "beijing/medical/flora_beijing_2025spring_medical_test_case8",
                        "beijing/medical/flora_beijing_2025spring_medical_test_case10",
                        "beijing/medical/flora_beijing_2025spring_medical_test_case11",
                        "beijing/medical/flora_beijing_2025spring_medical_test_case12",
                        "beijing/medical/flora_beijing_2025spring_medical_test_case13",
                        "beijing/medical/flora_beijing_2025spring_medical_test_case14",
                        "beijing/medical/flora_beijing_2025spring_medical_test_case15",
                        // summer test
                        "beijing/medical/flora_beijing_2025_july_medical_case4_stage1_test",
                        "beijing/medical/flora_beijing_2025_july_medical_case4_stage2_test",
                        "beijing/medical/flora_beijing_2025_july_medical_case4_stage3_test",
                        // summer test
                        "beijing/medical/flora_beijing_2025_july_medical_case5_stage1_test",
                        "beijing/medical/flora_beijing_2025_july_medical_case5_stage2_test",
                        "beijing/medical/flora_beijing_2025_july_medical_case5_stage3_test",
                        // summer test
                        "beijing/medical/flora_beijing_2025_july_medical_case10_stage1_test",
                        "beijing/medical/flora_beijing_2025_july_medical_case10_stage2_test",
                        "beijing/medical/flora_beijing_2025_july_medical_case10_stage3_test",
                        // summer test
                        "beijing/medical/flora_beijing_2025_july_medical_case1_stage1_test",
                        "beijing/medical/flora_beijing_2025_july_medical_case1_stage2_test",
                        "beijing/medical/flora_beijing_2025_july_medical_case1_stage3_test",
                        // summer test
                        "beijing/medical/flora_beijing_2025_july_medical_case14_stage1_test",
                        "beijing/medical/flora_beijing_2025_july_medical_case14_stage2_test",
                        "beijing/medical/flora_beijing_2025_july_medical_case14_stage3_test",
                        // summer test
                        "beijing/medical/flora_beijing_2025_july_medical_case6_stage1_test",
                        "beijing/medical/flora_beijing_2025_july_medical_case6_stage2_test",
                        "beijing/medical/flora_beijing_2025_july_medical_case6_stage3_test",
                        // summer test
                        "beijing/medical/flora_beijing_2025_july_medical_case8_stage1_test",
                        "beijing/medical/flora_beijing_2025_july_medical_case8_stage2_test",
                        "beijing/medical/flora_beijing_2025_july_medical_case8_stage3_test",
                        // summer test
                        "beijing/medical/flora_beijing_2025_july_medical_case11_stage1_test",
                        "beijing/medical/flora_beijing_2025_july_medical_case11_stage2_test",
                        "beijing/medical/flora_beijing_2025_july_medical_case11_stage3_test",
                        // summer test
                        "beijing/medical/flora_beijing_2025_july_medical_case12_stage1_test",
                        "beijing/medical/flora_beijing_2025_july_medical_case12_stage2_test",
                        "beijing/medical/flora_beijing_2025_july_medical_case12_stage3_test",
                        // summer test
                        "beijing/medical/flora_beijing_2025_july_medical_case2_stage1_test",
                        "beijing/medical/flora_beijing_2025_july_medical_case2_stage2_test",
                        "beijing/medical/flora_beijing_2025_july_medical_case2_stage3_test",
                        // summer test
                        "beijing/medical/flora_beijing_2025_july_medical_case13_stage1_test",
                        "beijing/medical/flora_beijing_2025_july_medical_case13_stage2_test",
                        "beijing/medical/flora_beijing_2025_july_medical_case13_stage3_test",
                        // summer test
                        "beijing/medical/flora_beijing_2025_july_medical_case15_stage1_test",
                        "beijing/medical/flora_beijing_2025_july_medical_case15_stage2_test",
                        "beijing/medical/flora_beijing_2025_july_medical_case15_stage3_test",

                        // beijing 2025 region and country
                        "beijing/region/flora_beijing_2025_region_and_country_title_assist","beijing/region/flora_beijing_2025_region_and_country_writing_assist","beijing/region/flora_beijing_2025_region_and_country_assessment_assist","beijing/region/flora_beijing_2025_bnu_math_test",
                        // beijing 2025 UCAS High edu, cella 3
//                        "beijing/ucas/cella3_beijing_highedu_2025_AI_edu_groupA", "beijing/ucas/cella3_beijing_highedu_2025_AI_edu_groupB", "beijing/ucas/cella3_beijing_highedu_2025_AI_edu_groupC", "beijing/ucas/cella3_beijing_highedu_2025_AI_edu_groupD",
                        // beijing 2025 UCAS no support

                        // beijing cella 3
                        "cella3/cella3_beijing_2025_Energy_groupA", "cella3/cella3_beijing_2025_Energy_groupB", "cella3/cella3_beijing_2025_Energy_groupC",
                        "cella3/training/cella3_beijing_2025_Energy_groupA_training", "cella3/training/cella3_beijing_2025_Energy_groupB_training", "cella3/training/cella3_beijing_2025_Energy_groupC_training",
                        // beijing cella 3 high edu
                        "cella3/cella3_beijing_high_edu_2025_Energy_groupA", "cella3/cella3_beijing_high_edu_2025_Energy_groupB", "cella3/cella3_beijing_high_edu_2025_Energy_groupC", "cella3/cella3_beijing_high_edu_2025_Energy_groupD", "cella3/cella3_beijing_high_edu_2025_Energy_groupE",
                        "cella3/training/cella3_beijing_high_edu_2025_Energy_groupA_training", "cella3/training/cella3_beijing_high_edu_2025_Energy_groupB_training", "cella3/training/cella3_beijing_high_edu_2025_Energy_groupC_training", "cella3/training/cella3_beijing_high_edu_2025_Energy_groupD_training", "cella3/training/cella3_beijing_high_edu_2025_Energy_groupE_training"
                        )),
                Map.entry("sz.floraengine.org", List.of(

                        // beijing cella 3
                        "cella3/cella3_beijing_2025_Energy_groupA", "cella3/cella3_beijing_2025_Energy_groupB", "cella3/cella3_beijing_2025_Energy_groupC",
                        "cella3/training/cella3_beijing_2025_Energy_groupA_training", "cella3/training/cella3_beijing_2025_Energy_groupB_training", "cella3/training/cella3_beijing_2025_Energy_groupC_training"
                )),
                Map.entry("flora.pku.edu.cn", List.of("flora_beijing_online", "flora_beijing_lab", "flora_beijing_lab_revision", "flora_beijing_23aut_la", "flora_huadong_course1",
                        // beijing 2025 spring medical vsp research
                        "pku/medical/flora_beijing_2025spring_medical_phase1_test","pku/medical/flora_beijing_2025spring_medical_phase2_test","pku/medical/flora_beijing_2025spring_medical_phase3_test"
                        // beijing 2025 UCAS High edu, cella 3

                )),
                Map.entry("nijmegen.floraproject.org", List.of("cella_demo_monash",
                        "cella_tum", "cella_tum_training1", "cella_tum_training2", "flora_tum_apr_2024", "flora_tum_training1_apr_2024",
                        "cella_lighthouse_1", "cella_lighthouse_2", "cella_lighthouse_3",
                        "cella_training",
                        "cella_ru_s2_training", "cella_ru_s2_essay1", "cella_ru_s2_essay2",
                        "cella_cursus_task1", "cella_cursus_task2", "cella_cursus_training",
                        "cella_cursus_schrij_task1", "cella_cursus_schrij_task2",
                        "cella3/cella_tum_eg1", "cella3/cella_tum_eg2", "cella3/cella_tum_cn"
                        )), //cella monash 1, cella TUM 1, lighthouse 3
                Map.entry("oulucella.oulu.fi", List.of("cella2/cella_oulu_task2_ai_in_edu_groupA", "cella2/cella_oulu_task1_biology_groupA",
                        "cella2/cella_oulu_task2_ai_in_edu_groupB", "cella2/cella_oulu_task1_biology_groupB",
                        "cella2/cella_oulu_task2_ai_in_edu_groupC", "cella2/cella_oulu_task1_biology_groupC", "cella2/cella_oulu_training",
                        "cella3/cella_oulu_study3_test", "cella3/cella_oulu_study3_test_training", "cella3/cella_oulu_study3_Bio_groupA", "cella3/cella_oulu_study3_Bio_groupB", "cella3/cella_oulu_study3_Bio_groupC", "cella3/cella_oulu_study3_AI_groupA", "cella3/cella_oulu_study3_AI_groupB", "cella3/cella_oulu_study3_AI_groupC",
                        //Oulu
                        "cella3/cella3_Oulu_finland_2025_Energy_groupA", "cella3/cella3_Oulu_finland_2025_Energy_groupB", "cella3/cella3_Oulu_finland_2025_Energy_groupC",
                        "cella3/training/cella3_Oulu_finland_2025_Energy_groupA_training", "cella3/training/cella3_Oulu_finland_2025_Energy_groupB_training", "cella3/training/cella3_Oulu_finland_2025_Energy_groupC_training",
                        //Oulu EN
                        "cella3/cella3_Oulu_finland_en_2025_Energy_groupA", "cella3/cella3_Oulu_finland_en_2025_Energy_groupB", "cella3/cella3_Oulu_finland_en_2025_Energy_groupC",
                        "cella3/training/cella3_monash_2025_Energy_groupA_training", "cella3/training/cella3_monash_2025_Energy_groupB_training", "cella3/training/cella3_monash_2025_Energy_groupC_training"

                )),
                Map.entry("flora.cite.hku.hk", List.of("flora_hku_202402_demo")),
//                Map.entry("lak24.floraengine.org", List.of("flora_demo_training", "flora_cella_monash_medicine_groupA", "flora_cella_monash_medicine_groupB", "flora_cella_monash_medicine_groupC")),
                Map.entry("cella-lala.floraengine.org", List.of("flora_demo_training", "cella2/flora_cella_brazil_demo_training", "cella2/flora_cella_colombia_demo_training",
                        "cella2/flora_cella_colombia_education_groupA", "cella2/flora_cella_colombia_education_groupB", "cella2/flora_cella_colombia_education_groupC",
                        "cella2/flora_cella_colombia_medicine_groupA", "cella2/flora_cella_colombia_medicine_groupB", "cella2/flora_cella_colombia_medicine_groupC",
                        "cella2/flora_cella_brazil_medicine_groupA", "cella2/flora_cella_brazil_medicine_groupB", "cella2/flora_cella_brazil_medicine_groupC",
                        //cella 3 Colombia
                        //cella 3 Peru
                        "cella3/cella3_Spanish_2025_Energy_groupA", "cella3/cella3_Spanish_2025_Energy_groupB", "cella3/cella3_Spanish_2025_Energy_groupC",
                        "cella3/training/cella3_Spanish_2025_Energy_groupA_training", "cella3/training/cella3_Spanish_2025_Energy_groupB_training", "cella3/training/cella3_Spanish_2025_Energy_groupC_training",

                        "cella3/cella3_Florida_2025_Energy_groupA", "cella3/cella3_Florida_2025_Energy_groupB", "cella3/cella3_Florida_2025_Energy_groupC",
                        "cella3/training/cella3_monash_2025_Energy_groupA_training", "cella3/training/cella3_monash_2025_Energy_groupB_training", "cella3/training/cella3_monash_2025_Energy_groupC_training",

                        //cella 3 brazil
                        "cella3/cella3_Portuguese_2025_Energy_groupA", "cella3/cella3_Portuguese_2025_Energy_groupB", "cella3/cella3_Portuguese_2025_Energy_groupC",
                        "cella3/training/cella3_Portuguese_2025_Energy_groupA_training", "cella3/training/cella3_Portuguese_2025_Energy_groupB_training", "cella3/training/cella3_Portuguese_2025_Energy_groupC_training"
                        )),
                Map.entry("flora.ntcu.edu.tw", List.of("flora_ntcu_dec_2024_A", "flora_ntcu_dec_2024_B", "flora_ntcu_dec_2024_C", "flora_ntcu_dec_2024_training")),
                Map.entry("gaila.hku.hk", List.of("flora_hkuhu_jan_2025_A", "flora_hkuhu_jan_2025_B", "flora_hkuhu_jan_2025_C", "flora_hkuhu_jan_2025_training")),
                Map.entry("infoseeking.floraengine.org", List.of("info-seeking/flora_infosk_jan_2025_A", "info-seeking/flora_infosk_jan_2025_B", "info-seeking/flora_infosk_jan_2025_C",
                        //Jimmie's Studies
                        "info-seeking/flora_jimmie_2025_A", "info-seeking/flora_jimmie_2025_B", "info-seeking/flora_jimmie_2025_C", "info-seeking/flora_jimmie_2025_D", "info-seeking/flora_jimmie_2025_E", "info-seeking/flora_jimmie_2025_F", "info-seeking/flora_jimmie_2025_G"
                        )),
                Map.entry("asia.floraengine.org", List.of(
                        //Cella 3 Indonesia
                        "cella3/cella3_Monash-Indonesia_2025_Energy_groupA", "cella3/cella3_Monash-Indonesia_2025_Energy_groupB", "cella3/cella3_Monash-Indonesia_2025_Energy_groupC",
                        "cella3/training/cella3_Monash-Indonesia_2025_Energy_groupA_training", "cella3/training/cella3_Monash-Indonesia_2025_Energy_groupB_training", "cella3/training/cella3_Monash-Indonesia_2025_Energy_groupC_training",
                        //Cella 3 Malaysia
                        "cella3/cella3_UiTM-Malaysia_2025_Energy_groupA", "cella3/cella3_UiTM-Malaysia_2025_Energy_groupB", "cella3/cella3_UiTM-Malaysia_2025_Energy_groupC",
                        "cella3/training/cella3_UiTM-Malaysia_2025_Energy_groupA_training", "cella3/training/cella3_UiTM-Malaysia_2025_Energy_groupB_training", "cella3/training/cella3_UiTM-Malaysia_2025_Energy_groupC_training",
                        //Cella 3 Macao
                        "cella3/cella3_UM-Macao-China_2025_Energy_groupA", "cella3/cella3_UM-Macao-China_2025_Energy_groupB", "cella3/cella3_UM-Macao-China_2025_Energy_groupC",
                        "cella3/training/cella3_UM-Macao-China_2025_Energy_groupA_training", "cella3/training/cella3_UM-Macao-China_2025_Energy_groupB_training", "cella3/training/cella3_UM-Macao-China_2025_Energy_groupC_training",
                        //Cella 3 HongKong
                        "cella3/cella3_HK-China_2025_Energy_groupA", "cella3/cella3_HK-China_2025_Energy_groupB", "cella3/cella3_HK-China_2025_Energy_groupC",
                        "cella3/training/cella3_HK-China_2025_Energy_groupA_training", "cella3/training/cella3_HK-China_2025_Energy_groupB_training", "cella3/training/cella3_HK-China_2025_Energy_groupC_training",
                        //Cella 3 Taiwan
                        "cella3/cella3_NTCU_taiwan_2025_Energy_groupA", "cella3/cella3_NTCU_taiwan_2025_Energy_groupB", "cella3/cella3_NTCU_taiwan_2025_Energy_groupC",
                        "cella3/training/cella3_NTCU_taiwan_2025_Energy_groupA_training", "cella3/training/cella3_NTCU_taiwan_2025_Energy_groupB_training", "cella3/training/cella3_NTCU_taiwan_2025_Energy_groupC_training",
                        //Cella 3 Thailand
                        "cella3/cella3_Thai_2025_Energy_groupA", "cella3/cella3_Thai_2025_Energy_groupB", "cella3/cella3_Thai_2025_Energy_groupC",
                        "cella3/training/cella3_Thai_2025_Energy_groupA_training", "cella3/training/cella3_Thai_2025_Energy_groupB_training", "cella3/training/cella3_Thai_2025_Energy_groupC_training",
                        //Cella 3 Vietnam
                        "cella3/cella3_vietnam_2025_Energy_groupA", "cella3/cella3_vietnam_2025_Energy_groupB", "cella3/cella3_vietnam_2025_Energy_groupC",
                        "cella3/training/cella3_vietnam_2025_Energy_groupA_training", "cella3/training/cella3_vietnam_2025_Energy_groupB_training", "cella3/training/cella3_vietnam_2025_Energy_groupC_training",
                        //Cella3 English

                        "cella3/cella3_Singapore_EN_2025_Energy_groupA", "cella3/cella3_Singapore_EN_2025_Energy_groupB", "cella3/cella3_Singapore_EN_2025_Energy_groupC",
                        "cella3/training/cella3_Singapore_EN_2025_Energy_groupA_training", "cella3/training/cella3_Singapore_EN_2025_Energy_groupB_training", "cella3/training/cella3_Singapore_EN_2025_Energy_groupC_training"
                        ))


        );


        Properties properties = System.getProperties();

        String osName = properties.getProperty("os.name");
        log.info("------------------os name:" + osName);
        String serverName = environment.getProperty("server.name", "floraengine");
        log.info("serverName environment:" + serverName);
        if (osName.equals("Linux")) { // means server environment
//        if (osName.equals("Windows 10")) { // means server environment

            MyConstant.BATCH_SIZE = 100;
            MyConstant.LANGUAGE = "en";
            MyConstant.clearCourseLanguageMap();
            MyMoodleConfigConstant.EXCEL_EXPORT_PATH = "/root/export_excel";
            MyMoodleConfigConstant.FILE_UPLOAD_PATH = "/root/upload";
            String[] modalContentArray;
            String[] finishModalContentArray;
            Map<String, String[]> courseIdModalContentMap = new HashMap<>();
            switch (serverName) {
                case "infoseeking": {
                    MyConstant.PROJECT_ID = "infoseeking";
                    String[] infoseekingCourseIds = {"4", "6", "5", "19", "20", "21", "22", "23", "28", "30"};
                    MyConstant.registerCourseLanguages("en", infoseekingCourseIds);
                    MyMoodleConfigConstant.IRRELEVANT_READING_PAGE_ID_SET.addAll(Set.of());
                    MyMoodleConfigConstant.WELCOME_READING_PAGE_ID_SET.addAll(Set.of("34", "52", "16"));
                    MyMoodleConfigConstant.TASK_REQUIREMENT_READING_PAGE_ID_SET.addAll(Set.of("35", "53", "17"));
                    MyMoodleConfigConstant.RUBRIC_READING_PAGE_ID_SET.addAll(Set.of("36", "54", "18"));
                    MyMoodleConfigConstant.setNeedTraceCourseIds(infoseekingCourseIds);
                    modalContentArray = new String[]{"Start Main Essay Activity", "This task has a time limit of 30 minutes. Note that only <strong>1 attempt</strong> is allowed. Are you sure you want enter the task?",
                            "Yes - Continue", "No - Go to Homepage", "Time is up", "", "Back to Homepage", "false", "Download Essay"};
                    finishModalContentArray = new String[]{"Time is up", "Back to Homepage", "Download Essay"};
                    MyMoodleConfigConstant.NEED_TRACE_COURSE_ID_LIST.forEach(courseId -> {
                        courseIdModalContentMap.put(String.valueOf(courseId), modalContentArray);
                    });
                    courseIdModalContentMap.put("4", modalContentArray);
                    courseIdModalContentMap.put("5", modalContentArray);
                    courseIdModalContentMap.put("6", modalContentArray);
                    String[] modalContentArrayA = new String[]{"Task Instruction", "You will first study the provided materials, then independently complete a short writing task. <br/>" +
                            "<strong style=\"color:red;\">Warning</strong>: No AI or external help is permitted. Copying from external sources may risk non-payment.",
                            "Confirm", "Back to Homepage", "Time is up", "", "Back to Homepage", "false", "Download Essay"};
                    String[] modalContentArrayB = new String[]{"Task Instruction", "You will first study the materials, then complete a short writing task. You have continuous access to the built-in ChatGPT on this platform throughout both phases. <br/>" +
                            "<strong style=\"color:red;\">Warning</strong>: Use only the provided ChatGPT; copying from external sources may risk non-payment.",
                            "Confirm", "Back to Homepage", "Time is up", "", "Back to Homepage", "false", "Download Essay"};
                    String[] modalContentArrayC = new String[]{"Task Instruction", "You will first study the materials, then complete a short writing task. The built-in ChatGPT on this platform will help you reflect on your learning throughout both phases. <br/>" +
                            "<strong style=\"color:red;\">Warning</strong>: Use only the provided ChatGPT; copying from external sources may risk non-payment.",
                            "Confirm", "Back to Homepage", "Time is up", "", "Back to Homepage", "false", "Download Essay"};
                    String[] modalContentArrayD = new String[]{"Task Instruction", "You will first study the materials, then complete a short writing task. The built-in ChatGPT on this platform will provide step-by-step hints and structured support throughout. <br/>" +
                            "<strong style=\"color:red;\">Warning</strong>: Use only the provided ChatGPT; copying from external sources may risk non-payment.",
                            "Confirm", "Back to Homepage", "Time is up", "", "Back to Homepage", "false", "Download Essay"};
                    String[] modalContentArrayE = new String[]{"Task Instruction", "You will first study the materials, then complete a short writing task. The built-in ChatGPT on this platform will occasionally present plausible yet incorrect statements to prompt critical reflection. <br/>" +
                            "<strong style=\"color:red;\">Warning</strong>: Use only the provided ChatGPT; copying from external sources may risk non-payment.",
                            "Confirm", "Back to Homepage", "Time is up", "", "Back to Homepage", "false", "Download Essay"};
                    String[] modalContentArrayF = new String[]{"Task Instruction", "You will first study the materials with access to the built-in ChatGPT on this platform. You will then complete the writing task independently, without AI. <br/>" +
                            "<strong style=\"color:red;\">Warning</strong>: Use only the provided ChatGPT during learning; copying from external sources may risk non-payment.",
                            "Confirm", "Back to Homepage", "Time is up", "", "Back to Homepage", "false", "Download Essay"};
                    String[] modalContentArrayG = new String[]{"Task Instruction", "You will first study the materials, then complete a short writing task. The built-in ChatGPT on this platform will support your thinking by agreeing with your ideas and building on them positively. <br/>" +
                            "<strong style=\"color:red;\">Warning</strong>: Use only the provided ChatGPT; copying from external sources may risk non-payment.",
                            "Confirm", "Back to Homepage", "Time is up", "", "Back to Homepage", "false", "Download Essay"};

                    courseIdModalContentMap.put("19", modalContentArrayA);
                    courseIdModalContentMap.put("20", modalContentArrayB);
                    courseIdModalContentMap.put("21", modalContentArrayC);
                    courseIdModalContentMap.put("22", modalContentArrayD);
                    courseIdModalContentMap.put("23", modalContentArrayE);
                    courseIdModalContentMap.put("28", modalContentArrayF);
                    courseIdModalContentMap.put("30", modalContentArrayG);


                    iMdlConfigService.setupConfigValueForOnlineEnvironment("infoseeking.floraengine.org", courseIdModalContentMap, finishModalContentArray, MyMoodleConfigConstant.NEED_TRACE_COURSE_ID_LIST, websiteUrlStudyNameMap.get("infoseeking.floraengine.org"));

                    break;
                }
                case "ntcu": {
                    //flora engine server
                    MyConstant.PROJECT_ID = "ntcu";
                    MyConstant.SRL_MODEL = "copes";
                    MyConstant.LANGUAGE = "zh_tw";
                    String[] ntcuCourseIds = {"2", "3", "4"};
                    MyConstant.registerCourseLanguages("zh_tw", ntcuCourseIds);
                    MyMoodleConfigConstant.IRRELEVANT_READING_PAGE_ID_SET.addAll(Set.of());
                    MyMoodleConfigConstant.WELCOME_READING_PAGE_ID_SET.addAll(Set.of("1", "37", "19"));
                    MyMoodleConfigConstant.TASK_REQUIREMENT_READING_PAGE_ID_SET.addAll(Set.of("2", "38", "20"));
                    MyMoodleConfigConstant.RUBRIC_READING_PAGE_ID_SET.addAll(Set.of("3", "39", "21"));

                    MyMoodleConfigConstant.setNeedTraceCourseIds(ntcuCourseIds);
                    modalContentArray = new String[]{"開始主要論文活動", "此任務有45分鐘的時間限制。請注意，只允許<strong>1次嘗試</strong>。你確定要進入此任務嗎？",
                            "是 - 繼續", "否 - 返回首頁", "時間到", "", "返回首頁", "true", "下載論文"};
                    finishModalContentArray = new String[]{"時間到", "返回首頁", "下載論文"};
                    MyMoodleConfigConstant.NEED_TRACE_COURSE_ID_LIST.forEach(courseId -> {
                        courseIdModalContentMap.put(String.valueOf(courseId), modalContentArray);
                    });

                    iMdlConfigService.setupConfigValueForOnlineEnvironment("flora.ntcu.edu.tw", courseIdModalContentMap, finishModalContentArray, MyMoodleConfigConstant.NEED_TRACE_COURSE_ID_LIST, websiteUrlStudyNameMap.get("flora.ntcu.edu.tw"));
                    break;
                }
                case "ar": {
                    //flora engine server
                    MyConstant.PROJECT_ID = "ar";
                    MyConstant.SRL_MODEL = "copes";
                    MyConstant.LANGUAGE = "de";
                    String[] arDefaultCourseIds = {"10", "11", "12", "23", "28", "31", "38", "46", "40"};
                    String[] arDanishCourseIds = {"54", "55", "56"};
                    String[] arGermanCourseIds = {"66", "67", "68"};
                    String[] arArabicCourseIds = {"74", "75", "76"};
                    String[] arCzechCourseIds = {"83", "84", "85"};
                    String[] arSlovakCourseIds = {"91", "92", "93"};
                    String[] arNetherlandsCourseIds = {"99", "100", "101", "103"};
                    String[] arUKCourseIds = {"108", "109", "110"};
                    MyConstant.registerCourseLanguages("de", arDefaultCourseIds);
                    MyConstant.registerCourseLanguages("dan", arDanishCourseIds);
                    MyConstant.registerCourseLanguages("de", arGermanCourseIds);
                    MyConstant.registerCourseLanguages("ar", arArabicCourseIds);
                    MyConstant.registerCourseLanguages("ces", arCzechCourseIds);
                    MyConstant.registerCourseLanguages("sk", arSlovakCourseIds);
                    MyConstant.registerCourseLanguages("nl", arNetherlandsCourseIds);
                    MyConstant.registerCourseLanguages("en", arUKCourseIds);
                    MyConstant.ETHERPAD_API_KEY = "32639c711ef2819879628f93f4dc6812a6815ca625949ec698120d3a7bdb1b0e";
                    MyConstant.ETHERPAD_API_URL = "https://ar.floraengine.org/myapi/etherpad";

//                    MyConstant.CHAT_SERVICE_URL = "http://ar-chat-elb.floraengine.org";

                    MyMoodleConfigConstant.IRRELEVANT_READING_PAGE_ID_SET.addAll(Set.of());
                    MyMoodleConfigConstant.WELCOME_READING_PAGE_ID_SET.addAll(Set.of("90", "108", "126", "349", "350", "749", "698", "937", "953", "969", "1016", "1032", "1048", "1085", "1101", "1117",           "1162", "1178", "1194", "1225", "1241", "1257", "1301", "1317", "1333", "1371", "1403", "1419", "1435"));
                    MyMoodleConfigConstant.TASK_REQUIREMENT_READING_PAGE_ID_SET.addAll(Set.of("91", "109", "127", "311", "333", "750", "699", "938", "954", "970", "1017", "1033", "1049", "1086", "1102", "1118",  "1163", "1179", "1195", "1226", "1242", "1258", "1302", "1318", "1334", "1372", "1404", "1420", "1436"));
                    MyMoodleConfigConstant.RUBRIC_READING_PAGE_ID_SET.addAll(Set.of("92", "110", "128", "312", "334", "751", "700", "939", "955", "971", "1018", "1034", "1050", "1087", "1103", "1119",            "1164", "1180", "1196", "1227", "1243", "1259", "1303", "1319", "1335", "1373", "1405", "1421", "1437"));

                    finishModalContentArray = new String[]{"END", "BACK", "Download"};

                    MyMoodleConfigConstant.setNeedTraceCourseIdGroups(arDefaultCourseIds, arDanishCourseIds, arGermanCourseIds,
                            arArabicCourseIds, arCzechCourseIds, arSlovakCourseIds, arNetherlandsCourseIds, arUKCourseIds);
                    //English
                    String[] modalContentArrayEnglish = new String[]{"Start Main Essay Activity", "This task has a time limit of 45 minutes. Note that only <strong>1 attempt</strong> is allowed. Are you sure you want enter the task?",
                            "Yes - Continue", "No - Go to Homepage", "Time is up", "", "Back to Homepage", "false", "Download Essay"};
                    String[] finishModalContentArrayEnglish = new String[]{"Time is up", "Back to Homepage", "Download Essay"};

                    //Arabia
                    String[] modalContentArrayArabic = new String[]{"أبدأ مهمة كتابة المقال", "هل أنت متأكد من بدء هذه المهمة التعليمية لديك فقط ٤٥ دقيقة لكتابة المقال",
                            "نعم - استمر.", "لا - الرجوع للصفحة الرئيسية.", "انتهى الوقت", "", "العودة إلى الصفحة الرئيسية", "false", "Download Essay"};
                    String[] finishModalContentArrayArabic = new String[]{"انتهى الوقت", "العودة إلى الصفحة الرئيسية", "Download Essay"};


//                    German (DE)
                    String[] modalContentArrayGerman = new String[]{"Beginne mit dem Schreiben des Aufsatzes", "Diese Aufgabe hat ein Zeitlimit von 45 Minuten. Beachte, dass du nur einen Versuch hast. Bist du dir sicher, dass du mit der Aufgabe beginnen möchtest?",
                            "Ja - Fortfahren", "Nein - Zur Startseite", "Die Zeit ist abgelaufen", "", "Zurück zur Startseite", "false", "Aufsatz herunterladen"};
                    String[] finishModalContentArrayGerman = new String[]{"Die Zeit ist abgelaufen", "Zurück zur Startseite", "Aufsatz herunterladen"};

//                    Dutch (NL)
                    String[] modalContentArrayNetherlands = new String[]{
                            "Hoofdessay-activiteit starten", "Deze taak heeft een tijdslimiet van 45 minuten. Let op: er is slechts 1 poging toegestaan. Weet u zeker dat u de taak wilt starten?",
                            "Ja - Doorgaan", "Nee - Ga naar de startpagina", "De tijd is om", "", "Terug naar de startpagina", "false", "Essay downloaden"};
                    String[] finishModalContentArrayNetherlands = new String[]{"De tijd is om", "Terug naar de startpagina", "Essay downloaden"};

//                    Danish (DA)
//                    String[] modalContentArrayDanish = new String[]{
//                            "Start hovedessay-aktivitet", "Denne opgave har en tidsbegrænsning på 45 minutter. Bemærk, at der kun er tilladt 1 forsøg. Er du sikker på, at du vil starte opgaven?",
//                            "Ja - Fortsæt", "Nej - Gå til forsiden", "Tiden er gået", "", "Tilbage til forsiden", "false", "Hent essay"};
//                    String[] finishModalContentArrayDanish = new String[]{"Tiden er gået", "Tilbage til forsiden", "Hent essay"};

//                    Czech (CS)
                    String[] modalContentArrayCzech = new String[]{
                            "Spustit hlavní esejovou aktivitu", "Tento úkol má časový limit 45 minut. Všimněte si, že je povolen pouze 1 pokus. Opravdu chcete úkol spustit?",
                            "Ano - Pokračovat", "Ne - Přejít na domovskou stránku", "Čas vypršel", "", "Zpět na domovskou stránku", "false", "Stáhnout esej"};
                    String[] finishModalContentArrayCzech = new String[]{"Čas vypršel", "Zpět na domovskou stránku", "Stáhnout esej"};

//                    Slovak (SK)
                    String[] modalContentArraySlovak = new String[]{
                            "Spustiť hlavnú esejovú aktivitu", "Táto úloha má časový limit 45 minút. Upozorňujeme, že je povolený iba 1 pokus. Naozaj chcete úlohu spustiť?",
                            "Áno - Pokračovať", "Nie - Prejsť na domovskú stránku", "Čas vypršal", "", "Späť na domovskú stránku", "false", "Stiahnuť esej"};
                    String[] finishModalContentArraySlovak = new String[]{"Čas vypršal", "Späť na domovskú stránku", "Stiahnuť esej"};


//                    MyMoodleConfigConstant.NEED_TRACE_COURSE_ID_LIST.forEach(courseId -> {
//                        courseIdModalContentMap.put(String.valueOf(courseId), modalContentArray);
//                    });

//                    courseIdModalContentMap.put("54", modalContentArrayDanish);
//                    courseIdModalContentMap.put("55", modalContentArrayDanish);
//                    courseIdModalContentMap.put("56", modalContentArrayDanish);
//                    courseIdModalContentMap.put("66", modalContentArrayGerman);
//                    courseIdModalContentMap.put("67", modalContentArrayGerman);
//                    courseIdModalContentMap.put("68", modalContentArrayGerman);
                    courseIdModalContentMap.put("74", modalContentArrayArabic);
                    courseIdModalContentMap.put("75", modalContentArrayArabic);
                    courseIdModalContentMap.put("76", modalContentArrayArabic);
                    courseIdModalContentMap.put("66", modalContentArrayGerman);
                    courseIdModalContentMap.put("67", modalContentArrayGerman);
                    courseIdModalContentMap.put("68", modalContentArrayGerman);

                    courseIdModalContentMap.put("83", modalContentArrayCzech);
                    courseIdModalContentMap.put("84", modalContentArrayCzech);
                    courseIdModalContentMap.put("85", modalContentArrayCzech);
                    courseIdModalContentMap.put("91", modalContentArraySlovak);
                    courseIdModalContentMap.put("92", modalContentArraySlovak);
                    courseIdModalContentMap.put("93", modalContentArraySlovak);
                    courseIdModalContentMap.put("99", modalContentArrayNetherlands);
                    courseIdModalContentMap.put("100", modalContentArrayNetherlands);
                    courseIdModalContentMap.put("101", modalContentArrayNetherlands);
                    courseIdModalContentMap.put("103", modalContentArrayNetherlands);
                    courseIdModalContentMap.put("108", modalContentArrayEnglish);
                    courseIdModalContentMap.put("109", modalContentArrayEnglish);
                    courseIdModalContentMap.put("110", modalContentArrayEnglish);




                    iMdlConfigService.setupConfigValueForOnlineEnvironment("ar.floraengine.org", courseIdModalContentMap, finishModalContentArray, MyMoodleConfigConstant.NEED_TRACE_COURSE_ID_LIST, websiteUrlStudyNameMap.get("ar.floraengine.org"));
                    break;
                }
                case "floraengine": {
                    //flora engine server
                    MyConstant.PROJECT_ID = "floraengine";
                    MyConstant.SRL_MODEL = "copes";
                    MyConstant.LANGUAGE = "en";
                    String[] floraengineCourseIds = {"4", "6", "20", "21", "22", "23", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "37", "38", "39", "69", "70", "71", "75", "76", "77"};
                    MyConstant.registerCourseLanguages("en", floraengineCourseIds);
//                    MyMoodleConfigConstant.IRRELEVANT_READING_PAGE_ID_SET.addAll(Set.of("11", "13", "20", "22", "25", "34", "36", "43", "45", "48"));
                    MyMoodleConfigConstant.TASK_REQUIREMENT_READING_PAGE_ID_SET.addAll(Set.of("8", "31", "118", "136", "154", "172", "294", "301", "307", "449", "481", "492", "512", "540", "541"));
                    MyMoodleConfigConstant.RUBRIC_READING_PAGE_ID_SET.addAll(Set.of("9", "32", "119", "137", "155", "173", "295", "302", "308", "470", "450", "493", "513", "525", "526"));
                    MyMoodleConfigConstant.WELCOME_READING_PAGE_ID_SET.addAll(Set.of("196", "197", "198", "469", "480", "451", "509", "527", "528"));

                    //            String modalContent = "This task is a critical thinking task, do you want to continue?"; // unisa
                    MyMoodleConfigConstant.setNeedTraceCourseIds(floraengineCourseIds);
                    modalContentArray = new String[]{"Start Main Essay Activity", "This task has a time limit of 45 minutes. Note that only <strong>1 attempt</strong> is allowed. Are you sure you want enter the task?",
                            "Yes - Continue", "No - Go to Homepage", "Time is up", "", "Back to Homepage", "true", "Download Essay"};
                    finishModalContentArray = new String[]{"Time is up", "Back to Homepage", "Download Essay"};
                    MyMoodleConfigConstant.NEED_TRACE_COURSE_ID_LIST.forEach(courseId -> {
                        courseIdModalContentMap.put(String.valueOf(courseId), modalContentArray);
                    });

                    iMdlConfigService.setupConfigValueForOnlineEnvironment("www.floraengine.org", courseIdModalContentMap, finishModalContentArray, MyMoodleConfigConstant.NEED_TRACE_COURSE_ID_LIST, websiteUrlStudyNameMap.get("www.floraengine.org"));
                    break;
                }
                case "nijmegen": {
                    //nijmegen server
//                    MyConstant.CHAT_SERVICE_URL = "https://chat-service.floraproject.org/myapi";
                    MyConstant.PROJECT_ID = "nijmegen";
                    MyConstant.LANGUAGE = "nl";
                    String[] nijmegenGermanCourseIds = {"65"};
                    String[] nijmegenDutchCourseIds = {"40", "25", "49", "50", "51", "36", "42", "98", "101", "104", "105"};
                    MyConstant.registerCourseLanguages("de", nijmegenGermanCourseIds);
                    MyConstant.registerCourseLanguages("nl", nijmegenDutchCourseIds);
                    MyMoodleConfigConstant.IRRELEVANT_READING_PAGE_ID_SET.addAll(Set.of("288", "290", "297", "299", "302", "307", "309", "316", "318",
                            "321", "326", "328", "335", "337", "340", "185", "187", "194", "196", "199", "405", "407", "414", "416", "419", "250", "252", "259", "261", "264"));
                    MyMoodleConfigConstant.TASK_REQUIREMENT_READING_PAGE_ID_SET.addAll(Set.of("247", "225", "471", "284", "303", "322", "182", "402", "647", "705", "726", "768", "754"));
                    MyMoodleConfigConstant.RUBRIC_READING_PAGE_ID_SET.addAll(Set.of("248", "226", "470", "285", "304", "323", "183", "403", "648", "706", "727", "769", "755"));
                    MyMoodleConfigConstant.setNeedTraceCourseIdGroups(nijmegenGermanCourseIds, nijmegenDutchCourseIds);
                    modalContentArray = new String[]{"Start hoofdessayactiviteit",
                            "Deze taak heeft een tijdslimiet van 45 minuten. Let op dat er slechts <strong>1 poging</strong> is toegestaan. Weet je zeker dat je de taak wilt starten?",
                            "Ja - Doorgaan", "Nee - Ga naar de homepage", "De tijd is om",
                            "", "Terug naar de homepage", "false", "Download essay"};
//                            {"Start Main Essay Activity", "This task has a time limit of 45 minutes. Note that only <strong>1 attempt</strong> is allowed. Are you sure you want enter the task?",
//                            "Yes - Continue", "No - Go to Homepage", "Time is up", "", "Back to Homepage", "true", "Download Essay"};  // true or false for download essay link
                    String[] modalContentArrayTum = new String[]{"Hauptaufsatzaktivität starten", "„Sobald du auf \"Ja–Weiter\" klickst, beginnt direkt deine Bearbeitungszeit von 45 Minuten. Bist du bereit für die Aufgabe?\"",
                            "Ja – weiter", "Zurück zur Homepage", "Die Zeit ist um", "", "Zurück zur Homepage", "false", "Download Essay"};
                    finishModalContentArray = new String[]{"De tijd is om", "Terug naar de homepage", "Download Essay"};
                    MyMoodleConfigConstant.NEED_TRACE_COURSE_ID_LIST.forEach(courseId -> {
                        courseIdModalContentMap.put(String.valueOf(courseId), modalContentArray);
                    });
                    courseIdModalContentMap.put("65", modalContentArrayTum);

                    iMdlConfigService.setupConfigValueForOnlineEnvironment("nijmegen.floraproject.org", courseIdModalContentMap, finishModalContentArray, MyMoodleConfigConstant.NEED_TRACE_COURSE_ID_LIST, websiteUrlStudyNameMap.get("nijmegen.floraproject.org"));
                    break;
                }
                case "oulu": {
                    //oulu server
                    MyConstant.PROJECT_ID = "oulu";
                    MyConstant.SRL_MODEL = "copes";
                    MyConstant.LANGUAGE = "fi";
                    String[] ouluCourseIds = {"15", "16", "17", "18", "19", "20", "27", "38", "39", "40", "47", "48", "49"};
                    MyConstant.registerCourseLanguages("fi", ouluCourseIds);
                    MyMoodleConfigConstant.IRRELEVANT_READING_PAGE_ID_SET.addAll(Set.of("31", "33", "40", "42", "45"));
                    MyMoodleConfigConstant.WELCOME_READING_PAGE_ID_SET.addAll(Set.of("220", "236", "252", "296", "312", "328"));
                    MyMoodleConfigConstant.TASK_REQUIREMENT_READING_PAGE_ID_SET.addAll(Set.of("28", "49", "89", "77", "119", "101", "150", "221", "237", "253", "297", "313", "329"));
                    MyMoodleConfigConstant.RUBRIC_READING_PAGE_ID_SET.addAll(Set.of("29", "50", "90", "78", "120", "102", "151", "222", "238", "254", "298", "314", "330"));
                    MyMoodleConfigConstant.setNeedTraceCourseIds(ouluCourseIds); //为了消除界面上的link
                    modalContentArray = new String[]{"Aloita kirjoitelmatehtävä", "Tämän tehtävän aikaraja on 45 minuuttia. Huomaa, että vain yksi yritys on sallittu. Haluatko varmasti osallistua tehtävään?",
                            "Kyllä, jatkan", "Ei, palaa kotisivulle", "Tehtäväaika on loppunut", "", "Takaisin kotisivulle", "false", "Download Essay"};  // true or false for download essay link

//                    modalContentArray = new String[]{"Start Main Essay Activity", "This task has a time limit of 45 minutes. Note that only <strong>1 attempt</strong> is allowed. Are you sure you want enter the task?",
//                            "Yes - Continue", "No - Go to Homepage", "Time is up", "", "Back to Homepage", "false", "Download Essay"};  // true or false for download essay link
                    finishModalContentArray = new String[]{"Tehtäväaika on loppunut", "Takaisin kotisivulle", "Download Essay"};
                    MyMoodleConfigConstant.NEED_TRACE_COURSE_ID_LIST.forEach(courseId -> {
                        courseIdModalContentMap.put(String.valueOf(courseId), modalContentArray);
                    });

                    iMdlConfigService.setupConfigValueForOnlineEnvironment("oulucella.oulu.fi", courseIdModalContentMap, finishModalContentArray, MyMoodleConfigConstant.NEED_TRACE_COURSE_ID_LIST, websiteUrlStudyNameMap.get("oulucella.oulu.fi"));
                    break;
                }
                case "beijing": {
                    //beijing server
                    MyConstant.PROJECT_ID = "beijing";
                    MyConstant.SRL_MODEL = "copes";
                    MyConstant.LANGUAGE = "zh";
                    String[] beijingCourseIds = {
                            "4", "10", "12", "30", "31", "38", "56", "58", "73", "74", "75", "76", "81", "82", "60", "64", "61", "65", "85", "86", "66", "62",
                            "237", "238", "239", "240", "241", "242", "247", "253", "244", "250",
                            "248", "254", "245", "251", "249", "255", "246", "252", "259", "265",
                            "256", "262", "260", "266", "257", "263", "261", "267", "258", "264",
                            "271", "277", "268", "274", "272", "278", "269", "275", "273", "279",
                            "270", "276", "283", "289", "280", "286", "284", "290", "281", "287",
                            "285", "291", "282", "288", "292", "293", "294", "295", "296", "297", "317", "318", "319", "333", "344", "325", "326", "327"
                    };
                    MyConstant.registerCourseLanguages("zh", beijingCourseIds);
                    String modalContent = "Would you like to start or continue the reading and writing task?"; // general
//                    MyConstant.CHAT_SERVICE_URL = "https://chat-service.floraproject.org/myapi"; // 此处的/myapi 是在chat server上面nginx 转发的路径
                    MyConstant.CHAT_SERVICE_URL = "http://beijing-chat-elb.floraengine.org"; // 此处的/myapi 是在chat server上面nginx 转发的路径
                    MyMoodleConfigConstant.IRRELEVANT_READING_PAGE_ID_SET.addAll(Set.of("10", "12", "19", "21", "24", "38", "40", "47", "49", "52", "64", "66", "73", "75", "78", "355", "357", "364", "366", "369"));
                    MyMoodleConfigConstant.WELCOME_READING_PAGE_ID_SET.addAll(Set.of("1046", "1047", "1048", "869", "870", "1113", "1114", "1115", "12050", "12066", "12082", "12184", "12241", "12109", "12125", "12141"));
                    MyMoodleConfigConstant.TASK_REQUIREMENT_READING_PAGE_ID_SET.addAll(Set.of("7", "35", "61", "351", "491", "576", "933", "914", "895", "952", "1010", "1027", "775", "655", "1053", "1083", "805", "685", "835", "715",
                            "6297", "6374", "6452", "6531", "6608", "6686", "7001", "7469", "6767", "7235",
                            "7078", "7546", "6844", "7312", "7156", "7624", "6922", "7390", "7937", "8405",
                            "7703", "8171", "8014", "8482", "7780", "8248", "8092", "8560", "7858", "8326",
                            "8873", "9341", "8639", "9107", "8950", "9418", "8716", "9184", "9028", "9496",
                            "8794", "9262", "9809", "10277", "9575", "10043", "9886", "10354", "9652", "10120",
                            "9964", "10432", "9730", "10198", "10511", "10588", "10666", "10745", "10822", "10900", "12051", "12067", "12083", "12185", "12242", "12110", "12126", "12142"));
                    MyMoodleConfigConstant.RUBRIC_READING_PAGE_ID_SET.addAll(Set.of("8", "36", "62", "352", "573", "577", "934", "915", "896", "953",
                            "1011", "1028", "776", "656", "1054", "1084", "806", "685", "836", "716", "12052", "12068", "12084", "12186", "12243", "12111", "12127", "12143"));

                    MyMoodleConfigConstant.setNeedTraceCourseIds(beijingCourseIds); //为了消除界面上的link,
                    modalContentArray = new String[]{"开始读写任务", "此任务有时间限制. 请注意，本学习任务只允许完成 <strong>1次</strong>。 你准备好开始任务了吗？",
                            "是 - 开始", "否 - 返回主页", "时间到", "", "回到课程首页", "false", "下载作文"};  // true or false for download essay link
                    finishModalContentArray = new String[]{"时间到", "回到课程首页", "下载作文"};
                    MyMoodleConfigConstant.NEED_TRACE_COURSE_ID_LIST.forEach(courseId -> {
                        courseIdModalContentMap.put(String.valueOf(courseId), modalContentArray);
                    });

                    iMdlConfigService.setupConfigValueForOnlineEnvironment("yidelearn.com", courseIdModalContentMap, finishModalContentArray, MyMoodleConfigConstant.NEED_TRACE_COURSE_ID_LIST, websiteUrlStudyNameMap.get("yidelearn.com"));
                    break;
                }
                case "shenzhen": {
                    //beijing server
                    MyConstant.PROJECT_ID = "shenzhen";
                    MyConstant.SRL_MODEL = "copes";
                    MyConstant.LANGUAGE = "zh";
                    String[] shenzhenCourseIds = {"14", "15", "16"};
                    MyConstant.registerCourseLanguages("zh", shenzhenCourseIds);
                    String modalContent = "Would you like to start or continue the reading and writing task?"; // general
//                    MyConstant.CHAT_SERVICE_URL = "https://chat-service.floraproject.org/myapi"; // 此处的/myapi 是在chat server上面nginx 转发的路径
                    MyConstant.CHAT_SERVICE_URL = "http://beijing-chat-elb.floraengine.org"; // 此处的/myapi 是在chat server上面nginx 转发的路径
//                    MyMoodleConfigConstant.IRRELEVANT_READING_PAGE_ID_SET.addAll(Set.of("", "", ""));
                    MyMoodleConfigConstant.WELCOME_READING_PAGE_ID_SET.addAll(Set.of(           "73", "89", "105"));
                    MyMoodleConfigConstant.TASK_REQUIREMENT_READING_PAGE_ID_SET.addAll(Set.of(  "74", "90", "106"));
                    MyMoodleConfigConstant.RUBRIC_READING_PAGE_ID_SET.addAll(Set.of(            "75", "91", "107"));

                    MyMoodleConfigConstant.setNeedTraceCourseIds(shenzhenCourseIds); //为了消除界面上的link,
                    modalContentArray = new String[]{"开始读写任务", "此任务有时间限制. 请注意，本学习任务只允许完成 <strong>1次</strong>。 你准备好开始任务了吗？",
                            "是 - 开始", "否 - 返回主页", "时间到", "", "回到课程首页", "false", "下载作文"};  // true or false for download essay link
                    finishModalContentArray = new String[]{"时间到", "回到课程首页", "下载作文"};
                    MyMoodleConfigConstant.NEED_TRACE_COURSE_ID_LIST.forEach(courseId -> {
                        courseIdModalContentMap.put(String.valueOf(courseId), modalContentArray);
                    });

                    iMdlConfigService.setupConfigValueForOnlineEnvironment("sz.floraengine.org", courseIdModalContentMap, finishModalContentArray, MyMoodleConfigConstant.NEED_TRACE_COURSE_ID_LIST, websiteUrlStudyNameMap.get("sz.floraengine.org"));
                    break;
                }
                case "pku": {
                    //beijing server
                    MyConstant.LANGUAGE = "zh";
                    String[] pkuCourseIds = {"4", "10", "12", "30", "31", "38", "56", "58", "73", "74", "75", "76", "81", "82", "60", "64", "61", "65", "85", "86", "66", "62"};
                    MyConstant.registerCourseLanguages("zh", pkuCourseIds);
                    String modalContent = "Would you like to start or continue the reading and writing task?"; // general
//                    MyConstant.CHAT_SERVICE_URL = "https://chat-service.floraproject.org/myapi"; // 此处的/myapi 是在chat server上面nginx 转发的路径
                    MyConstant.CHAT_SERVICE_URL = "https://beijing-chat.floraengine.org/myapi"; // 此处的/myapi 是在chat server上面nginx 转发的路径
                    MyMoodleConfigConstant.IRRELEVANT_READING_PAGE_ID_SET.addAll(Set.of("10", "12", "19", "21", "24", "38", "40", "47", "49", "52", "64", "66", "73", "75", "78", "355", "357", "364", "366", "369"));
                    MyMoodleConfigConstant.TASK_REQUIREMENT_READING_PAGE_ID_SET.addAll(Set.of("7", "35", "61", "351", "491", "576", "933", "914", "895", "952", "1010", "1027", "775", "655", "1053", "1083", "805", "685", "835", "715"));
                    MyMoodleConfigConstant.RUBRIC_READING_PAGE_ID_SET.addAll(Set.of("8", "36", "62", "352", "573", "577", "934", "915", "896", "953", "1011", "1028", "776", "656", "1054", "1084", "806", "685", "836", "716"));
                    MyMoodleConfigConstant.WELCOME_READING_PAGE_ID_SET.addAll(Set.of("1046", "1047", "1048", "869", "870", "1113", "1114", "1115"));
                    MyMoodleConfigConstant.setNeedTraceCourseIds(pkuCourseIds); //为了消除界面上的link,
                    modalContentArray = new String[]{"开始读写任务", "此任务有时间限制. 请注意，本学习任务只允许完成 <strong>1次</strong>。 你准备好开始任务了吗？",
                            "是 - 开始", "否 - 返回主页", "时间到", "", "回到课程首页", "false", "下载作文"};  // true or false for download essay link
                    finishModalContentArray = new String[]{"时间到", "回到课程首页", "下载作文"};
                    MyMoodleConfigConstant.NEED_TRACE_COURSE_ID_LIST.forEach(courseId -> {
                        courseIdModalContentMap.put(String.valueOf(courseId), modalContentArray);
                    });

                    iMdlConfigService.setupConfigValueForOnlineEnvironment("flora.pku.edu.cn", courseIdModalContentMap, finishModalContentArray, MyMoodleConfigConstant.NEED_TRACE_COURSE_ID_LIST, websiteUrlStudyNameMap.get("flora.pku.edu.cn"));
                    break;
                }
                case "cella-lala": {
                    MyConstant.PROJECT_ID = "cella-lala";
                    MyConstant.SRL_MODEL = "copes";
                    MyConstant.LANGUAGE = "en";
                    String[] cellaLalaSpanishCourseIds = {"5", "6", "7", "8", "9", "10", "24", "25", "26"};
                    String[] cellaLalaPortugueseCourseIds = {"15", "16", "17", "41", "42", "43"};
                    String[] cellaLalaEnglishCourseIds = {"32", "33", "34"};
                    MyConstant.registerCourseLanguages("es", cellaLalaSpanishCourseIds);
                    MyConstant.registerCourseLanguages("pt", cellaLalaPortugueseCourseIds);
                    MyConstant.registerCourseLanguages("en", cellaLalaEnglishCourseIds);
                    MyMoodleConfigConstant.IRRELEVANT_READING_PAGE_ID_SET.addAll(Set.of());
                    MyMoodleConfigConstant.WELCOME_READING_PAGE_ID_SET.addAll(Set.of(                     "32", "70", "88", "106", "157", "175", "193", "252", "268", "284", "319", "335", "351", "389", "405", "421"));
                    MyMoodleConfigConstant.TASK_REQUIREMENT_READING_PAGE_ID_SET.addAll(Set.of("14", "32", "50", "68", "86", "104", "158", "176", "194", "253", "269", "285", "320", "336", "352", "390", "406", "422"));
                    MyMoodleConfigConstant.RUBRIC_READING_PAGE_ID_SET.addAll(Set.of(          "15", "33", "51", "69", "87", "105", "159", "177", "195", "254", "270", "286", "321", "337", "353", "391", "407", "423"));


                    //            String modalContent = "This task is a critical thinking task, do you want to continue?";
                    MyMoodleConfigConstant.setNeedTraceCourseIdGroups(cellaLalaSpanishCourseIds, cellaLalaPortugueseCourseIds, cellaLalaEnglishCourseIds);
                    modalContentArray = new String[]{"Start Main Essay Activity", "This task has a time limit of 45 minutes. Note that only <strong>1 attempt</strong> is allowed. Are you sure you want enter the task?",
                            "Yes - Continue", "No - Go to Homepage", "Time is up", "", "Back to Homepage", "false", "Download Essay"};
                    finishModalContentArray = new String[]{"END", "Back Home", "Download Essay"};

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
                    //Spanish
                    courseIdModalContentMap.put("24", new String[]{"Iniciar Actividad Principal de Ensayo", "Esta tarea tiene un límite de tiempo de 45 minutos. Ten en cuenta que solo se permite 1 intento. ¿Estás seguro de que quieres comenzar la tarea?",
                            "Sí - Continuar", "No - página principal", "Se acabó el tiempo", "", "página principal", "false", "Download Essay"});
                    courseIdModalContentMap.put("25", new String[]{"Iniciar Actividad Principal de Ensayo", "Esta tarea tiene un límite de tiempo de 45 minutos. Ten en cuenta que solo se permite 1 intento. ¿Estás seguro de que quieres comenzar la tarea?",
                            "Sí - Continuar", "No - página principal", "Se acabó el tiempo", "", "página principal", "false", "Download Essay"});
                    courseIdModalContentMap.put("26", new String[]{"Iniciar Actividad Principal de Ensayo", "Esta tarea tiene un límite de tiempo de 45 minutos. Ten en cuenta que solo se permite 1 intento. ¿Estás seguro de que quieres comenzar la tarea?",
                            "Sí - Continuar", "No - página principal", "Se acabó el tiempo", "", "página principal", "false", "Download Essay"});

                    // English
                    courseIdModalContentMap.put("32", new String[]{"Start Main Essay Activity", "This task has a time limit of 45 minutes. Note that only <strong>1 attempt</strong> is allowed. Are you sure you want enter the task?",
                            "Yes - Continue", "No - Go to Homepage", "Time is up", "", "Back to Homepage", "false", "Download Essay"});
                    courseIdModalContentMap.put("33", new String[]{"Start Main Essay Activity", "This task has a time limit of 45 minutes. Note that only <strong>1 attempt</strong> is allowed. Are you sure you want enter the task?",
                            "Yes - Continue", "No - Go to Homepage", "Time is up", "", "Back to Homepage", "false", "Download Essay"});
                    courseIdModalContentMap.put("34", new String[]{"Start Main Essay Activity", "This task has a time limit of 45 minutes. Note that only <strong>1 attempt</strong> is allowed. Are you sure you want enter the task?",
                            "Yes - Continue", "No - Go to Homepage", "Time is up", "", "Back to Homepage", "false", "Download Essay"});

                    //Portuguese
                    courseIdModalContentMap.put("41", new String[]{"Iniciar a atividade principal de redação", "Esta tarefa tem um limite de tempo de 45 minutos. Observe que apenas 1 tentativa é permitida. Tem certeza de que deseja iniciar a tarefa?",
                            "Sim - Continuar", "Não - Voltar para a página inicial", "Tempo esgotado", "", "Voltar para a página inicial", "false", "Download Essay"});
                    courseIdModalContentMap.put("42", new String[]{"Iniciar a atividade principal de redação", "Esta tarefa tem um limite de tempo de 45 minutos. Observe que apenas 1 tentativa é permitida. Tem certeza de que deseja iniciar a tarefa?",
                            "Sim - Continuar", "Não - Voltar para a página inicial", "Tempo esgotado", "", "Voltar para a página inicial", "false", "Download Essay"});
                    courseIdModalContentMap.put("43", new String[]{"Iniciar a atividade principal de redação", "Esta tarefa tem um limite de tempo de 45 minutos. Observe que apenas 1 tentativa é permitida. Tem certeza de que deseja iniciar a tarefa?",
                            "Sim - Continuar", "Não - Voltar para a página inicial", "Tempo esgotado", "", "Voltar para a página inicial", "false", "Download Essay"});

                    iMdlConfigService.setupConfigValueForOnlineEnvironment("cella-lala.floraengine.org", courseIdModalContentMap, finishModalContentArray, MyMoodleConfigConstant.NEED_TRACE_COURSE_ID_LIST, websiteUrlStudyNameMap.get("cella-lala.floraengine.org"));
                    break;
                }
                case "asia": {
                    //flora engine server
                    MyConstant.PROJECT_ID = "asia";
                    MyConstant.SRL_MODEL = "copes";
                    MyConstant.LANGUAGE = "vi"; //tha zh_hk
                    String[] asiaZhTwCourseIds = {"6", "7", "8"};
                    String[] asiaZhHkCourseIds = {"14", "15", "16", "22", "23", "24"};
                    String[] asiaMsaCourseIds = {"30", "31", "32"};
                    String[] asiaIndCourseIds = {"38", "39", "40"};
                    String[] asiaThaCourseIds = {"46", "47", "48"};
                    String[] asiaViCourseIds = {"54", "55", "56"};
                    String[] asiaEnCourseIds = {"62", "63", "64"};
                    MyConstant.registerCourseLanguages("zh_tw", asiaZhTwCourseIds);
                    MyConstant.registerCourseLanguages("zh_hk", asiaZhHkCourseIds);
                    MyConstant.registerCourseLanguages("msa", asiaMsaCourseIds);
                    MyConstant.registerCourseLanguages("ind", asiaIndCourseIds);
                    MyConstant.registerCourseLanguages("tha", asiaThaCourseIds);
                    MyConstant.registerCourseLanguages("vi", asiaViCourseIds);
                    MyConstant.registerCourseLanguages("en", asiaEnCourseIds);
//                    MyConstant.CHAT_SERVICE_URL = "http://asia-chat-elb.floraengine.org";
//                    MyMoodleConfigConstant.IRRELEVANT_READING_PAGE_ID_SET.addAll(Set.of("11", "13", "20", "22", "25", "34", "36", "43", "45", "48"));
                    MyMoodleConfigConstant.WELCOME_READING_PAGE_ID_SET.addAll(Set.of(           "24", "8", "40", "67", "83", "99", "126", "142", "158", "185", "201", "217", "244", "260", "276", "303", "319", "335", "431", "447", "463", "502", "518", "534"));
                    MyMoodleConfigConstant.TASK_REQUIREMENT_READING_PAGE_ID_SET.addAll(Set.of(  "25", "9", "41", "68", "84", "100", "127", "143", "159", "186", "202", "218", "245", "261", "277", "304", "320", "336", "432", "448", "464", "503", "519", "535"));
                    MyMoodleConfigConstant.RUBRIC_READING_PAGE_ID_SET.addAll(Set.of(            "26", "10", "42", "69", "85", "101", "128", "144", "160", "187", "203", "219", "246", "262", "278", "305", "321", "337", "433", "449", "465", "504", "520", "536"));


                    MyMoodleConfigConstant.setNeedTraceCourseIdGroups(asiaZhTwCourseIds, asiaZhHkCourseIds, asiaMsaCourseIds, asiaIndCourseIds, asiaThaCourseIds, asiaViCourseIds, asiaEnCourseIds);
                    modalContentArray = new String[]{"Start Main Essay Activity", "This task has a time limit of 45 minutes. Note that only <strong>1 attempt</strong> is allowed. Are you sure you want enter the task?",
                            "Yes - Continue", "No - Go to Homepage", "Time is up", "", "Back to Homepage", "false", "Download Essay"};
                    finishModalContentArray = new String[]{"Time is up", "END", "Download Essay"};

                    //EN 新加坡课程
                    courseIdModalContentMap.put("62", new String[]{"Start Main Essay Activity", "This task has a time limit of 45 minutes. Note that only <strong>1 attempt</strong> is allowed. Are you sure you want enter the task?",
                            "Yes - Continue", "No - Go to Homepage", "Time is up", "", "Back to Homepage", "false", "Download Essay"});
                    courseIdModalContentMap.put("63", new String[]{"Start Main Essay Activity", "This task has a time limit of 45 minutes. Note that only <strong>1 attempt</strong> is allowed. Are you sure you want enter the task?",
                            "Yes - Continue", "No - Go to Homepage", "Time is up", "", "Back to Homepage", "false", "Download Essay"});
                    courseIdModalContentMap.put("64", new String[]{"Start Main Essay Activity", "This task has a time limit of 45 minutes. Note that only <strong>1 attempt</strong> is allowed. Are you sure you want enter the task?",
                            "Yes - Continue", "No - Go to Homepage", "Time is up", "", "Back to Homepage", "false", "Download Essay"});

                    // 台湾课程
                    courseIdModalContentMap.put("6", new String[]{"開始主要作文活動", "此任務有 45 分鐘的時間限制。請注意只有<strong>1 次</strong>作答機會。你確定要進入任務嗎？",
                            "是－繼續", "否－回到首頁", "時間到", "", "回到首頁", "false", "下載作文"});
                    courseIdModalContentMap.put("7", new String[]{"開始主要作文活動", "此任務有 45 分鐘的時間限制。請注意只有<strong>1 次</strong>作答機會。你確定要進入任務嗎？",
                            "是－繼續", "否－回到首頁", "時間到", "", "回到首頁", "false", "下載作文"});
                    courseIdModalContentMap.put("8", new String[]{"開始主要作文活動", "此任務有 45 分鐘的時間限制。請注意只有<strong>1 次</strong>作答機會。你確定要進入任務嗎？",
                            "是－繼續", "否－回到首頁", "時間到", "", "回到首頁", "false", "下載作文"});
                    String[] finishModalContentArrayTW = new String[]{"時間到", "回到首頁", "下載作文"};

                    // 香港课程和澳门课程
                    courseIdModalContentMap.put("14", new String[]{"開始主要作文活動", "此項任務的限時為 45 分鐘。請注意只允許<strong>1 次</strong>作答。你確定要進入此任務嗎？",
                            "是－繼續", "否－返回主頁", "時間到", "", "返回主頁", "false", "下載作文"});
                    courseIdModalContentMap.put("15", new String[]{"開始主要作文活動", "此項任務的限時為 45 分鐘。請注意只允許<strong>1 次</strong>作答。你確定要進入此任務嗎？",
                            "是－繼續", "否－返回主頁", "時間到", "", "返回主頁", "false", "下載作文"});
                    courseIdModalContentMap.put("16", new String[]{"開始主要作文活動", "此項任務的限時為 45 分鐘。請注意只允許<strong>1 次</strong>作答。你確定要進入此任務嗎？",
                            "是－繼續", "否－返回主頁", "時間到", "", "返回主頁", "false", "下載作文"});
                    courseIdModalContentMap.put("22", new String[]{"開始主要作文活動", "此項任務的限時為 45 分鐘。請注意只允許<strong>1 次</strong>作答。你確定要進入此任務嗎？",
                            "是－繼續", "否－返回主頁", "時間到", "", "返回主頁", "false", "下載作文"});
                    courseIdModalContentMap.put("23", new String[]{"開始主要作文活動", "此項任務的限時為 45 分鐘。請注意只允許<strong>1 次</strong>作答。你確定要進入此任務嗎？",
                            "是－繼續", "否－返回主頁", "時間到", "", "返回主頁", "false", "下載作文"});
                    courseIdModalContentMap.put("24", new String[]{"開始主要作文活動", "此項任務的限時為 45 分鐘。請注意只允許<strong>1 次</strong>作答。你確定要進入此任務嗎？",
                            "是－繼續", "否－返回主頁", "時間到", "", "返回主頁", "false", "下載作文"});
                    String[] finishModalContentArrayHK = new String[]{"時間到", "返回主頁", "下載作文"};

                    // Bahasa Indonesia
                    courseIdModalContentMap.put("38", new String[]{"Mulai Aktivitas Esai Utama", "Tugas ini memiliki batas waktu 45 menit. Perhatikan bahwa hanya <strong>1 percobaan</strong> yang diperbolehkan. Apakah Anda yakin ingin memasuki tugas ini?",
                            "Ya - Lanjutkan", "Tidak - Kembali ke Beranda", "Waktu Habis", "", "Kembali ke Beranda", "false", "Unduh Esai"});
                    courseIdModalContentMap.put("39", new String[]{"Mulai Aktivitas Esai Utama", "Tugas ini memiliki batas waktu 45 menit. Perhatikan bahwa hanya <strong>1 percobaan</strong> yang diperbolehkan. Apakah Anda yakin ingin memasuki tugas ini?",
                            "Ya - Lanjutkan", "Tidak - Kembali ke Beranda", "Waktu Habis", "", "Kembali ke Beranda", "false", "Unduh Esai"});
                    courseIdModalContentMap.put("40", new String[]{"Mulai Aktivitas Esai Utama", "Tugas ini memiliki batas waktu 45 menit. Perhatikan bahwa hanya <strong>1 percobaan</strong> yang diperbolehkan. Apakah Anda yakin ingin memasuki tugas ini?",
                            "Ya - Lanjutkan", "Tidak - Kembali ke Beranda", "Waktu Habis", "", "Kembali ke Beranda", "false", "Unduh Esai"});
                    String[] finishModalContentArrayIndonesia = new String[]{"Waktu Habis", "Kembali ke Beranda", "Unduh Esai"};


                    // Thai
                    courseIdModalContentMap.put("46", new String[]{"เริ่มทำกิจกรรมเรียงความหลัก", "การทำแบบทดสอบครั้งนี้มีเวลาจำกัด 5 นาที เมื่อคุณเริ่มทำ ตัวจับเวลาจะเริ่มนับถอยหลังทันทีและไม่สามารถหยุดชั่วคราวได้ นักเรียนต้องทำให้เสร็จก่อนหมดเวลา นักเรียนแน่ใจหรือไม่ว่าต้องการเริ่มตอนนี้?",
                            "ใช่ - ดำเนินการต่อ", "ไม่ใช่ - กลับไปหน้าหลัก", "หมดเวลา", "", "กลับไปหน้าหลัก", "false", "ดาวน์โหลดเรียงความ"});
                    courseIdModalContentMap.put("47", new String[]{"เริ่มทำกิจกรรมเรียงความหลัก", "การทำแบบทดสอบครั้งนี้มีเวลาจำกัด 5 นาที เมื่อคุณเริ่มทำ ตัวจับเวลาจะเริ่มนับถอยหลังทันทีและไม่สามารถหยุดชั่วคราวได้ นักเรียนต้องทำให้เสร็จก่อนหมดเวลา นักเรียนแน่ใจหรือไม่ว่าต้องการเริ่มตอนนี้?",
                            "ใช่ - ดำเนินการต่อ", "ไม่ใช่ - กลับไปหน้าหลัก", "หมดเวลา", "", "กลับไปหน้าหลัก", "false", "ดาวน์โหลดเรียงความ"});
                    courseIdModalContentMap.put("48", new String[]{"เริ่มทำกิจกรรมเรียงความหลัก", "การทำแบบทดสอบครั้งนี้มีเวลาจำกัด 5 นาที เมื่อคุณเริ่มทำ ตัวจับเวลาจะเริ่มนับถอยหลังทันทีและไม่สามารถหยุดชั่วคราวได้ นักเรียนต้องทำให้เสร็จก่อนหมดเวลา นักเรียนแน่ใจหรือไม่ว่าต้องการเริ่มตอนนี้?",
                            "ใช่ - ดำเนินการต่อ", "ไม่ใช่ - กลับไปหน้าหลัก", "หมดเวลา", "", "กลับไปหน้าหลัก", "false", "ดาวน์โหลดเรียงความ"});
                    String[] finishModalContentArrayThai = new String[]{"หมดเวลา", "กลับไปหน้าหลัก", "ดาวน์โหลดเรียงความ"};

                    // Bahasa Malaysia
                    courseIdModalContentMap.put("30", new String[]{"Mulakan Aktiviti Esei Utama", "Tugasan ini mempunyai had masa selama 45 minit. Sila ambil perhatian bahawa hanya <strong>1 percubaan</strong> dibenarkan. Adakah anda pasti mahu memasuki tugasan ini?",
                            "Ya - Teruskan", "Tidak - Pergi ke Laman Utama", "Masa Tamat", "", "Kembali ke Laman Utama", "false", "Muat Turun Esei"});
                    courseIdModalContentMap.put("31", new String[]{"Mulakan Aktiviti Esei Utama", "Tugasan ini mempunyai had masa selama 45 minit. Sila ambil perhatian bahawa hanya <strong>1 percubaan</strong> dibenarkan. Adakah anda pasti mahu memasuki tugasan ini?",
                            "Ya - Teruskan", "Tidak - Pergi ke Laman Utama", "Masa Tamat", "", "Kembali ke Laman Utama", "false", "Muat Turun Esei"});
                    courseIdModalContentMap.put("32", new String[]{"Mulakan Aktiviti Esei Utama", "Tugasan ini mempunyai had masa selama 45 minit. Sila ambil perhatian bahawa hanya <strong>1 percubaan</strong> dibenarkan. Adakah anda pasti mahu memasuki tugasan ini?",
                            "Ya - Teruskan", "Tidak - Pergi ke Laman Utama", "Masa Tamat", "", "Kembali ke Laman Utama", "false", "Muat Turun Esei"});
                    String[] finishModalContentArrayMalaysia = new String[]{"Masa Tamat", "Kembali ke Laman Utama", "Muat Turun Esei"};


                    // Vietnam
                    courseIdModalContentMap.put("54", new String[]{"Bắt đầu hoạt động viết bài luận chính", "Nhiệm vụ này có thời gian giới hạn là 45 phút. Lưu ý rằng bạn chỉ có 1 lần thực hiện. Bạn có chắc chắn muốn bắt đầu không?",
                            "Có - Tiếp tục", "Không - Quay về trang chủ", "Hết thời gian", "", "Quay về trang chủ", "false", "Download"});
                    courseIdModalContentMap.put("55", new String[]{"Bắt đầu hoạt động viết bài luận chính", "Nhiệm vụ này có thời gian giới hạn là 45 phút. Lưu ý rằng bạn chỉ có 1 lần thực hiện. Bạn có chắc chắn muốn bắt đầu không?",
                            "Có - Tiếp tục", "Không - Quay về trang chủ", "Hết thời gian", "", "Quay về trang chủ", "false", "Download"});
                    courseIdModalContentMap.put("56", new String[]{"Bắt đầu hoạt động viết bài luận chính", "Nhiệm vụ này có thời gian giới hạn là 45 phút. Lưu ý rằng bạn chỉ có 1 lần thực hiện. Bạn có chắc chắn muốn bắt đầu không?",
                            "Có - Tiếp tục", "Không - Quay về trang chủ", "Hết thời gian", "", "Quay về trang chủ", "false", "Download"});
                    String[] finishModalContentArrayVietnam = new String[]{"Hết thời gian", "Kembali ke Laman Utama", "Muat Turun Esei"};


                    iMdlConfigService.setupConfigValueForOnlineEnvironment("asia.floraengine.org", courseIdModalContentMap, finishModalContentArray, MyMoodleConfigConstant.NEED_TRACE_COURSE_ID_LIST, websiteUrlStudyNameMap.get("asia.floraengine.org"));
                    break;
                }
                case "croatia": {
                    //flora engine server
                    MyConstant.PROJECT_ID = "croatia";
                    MyConstant.SRL_MODEL = "copes";
                    MyConstant.LANGUAGE = "en";
                    String[] croatiaCourseIds = {"6", "7", "8"};
                    MyConstant.registerCourseLanguages("en", croatiaCourseIds);
                    MyMoodleConfigConstant.WELCOME_READING_PAGE_ID_SET.addAll(Set.of("10", "26", "42"));
                    MyMoodleConfigConstant.TASK_REQUIREMENT_READING_PAGE_ID_SET.addAll(Set.of("11", "27", "43"));
                    MyMoodleConfigConstant.RUBRIC_READING_PAGE_ID_SET.addAll(Set.of("12", "28", "44"));


                    //            String modalContent = "This task is a critical thinking task, do you want to continue?"; // unisa
                    MyMoodleConfigConstant.setNeedTraceCourseIds(croatiaCourseIds);
                    modalContentArray = new String[]{"Start Main Essay Activity", "This task has a time limit of 45 minutes. Note that only <strong>1 attempt</strong> is allowed. Are you sure you want enter the task?",
                            "Yes - Continue", "No - Go to Homepage", "Time is up", "", "Back to Homepage", "true", "Download Essay"};
                    finishModalContentArray = new String[]{"Time is up", "Back to Homepage", "Download Essay"};
                    MyMoodleConfigConstant.NEED_TRACE_COURSE_ID_LIST.forEach(courseId -> {
                        courseIdModalContentMap.put(String.valueOf(courseId), modalContentArray);
                    });

                    iMdlConfigService.setupConfigValueForOnlineEnvironment("flora.foi.hr", courseIdModalContentMap, finishModalContentArray, MyMoodleConfigConstant.NEED_TRACE_COURSE_ID_LIST, websiteUrlStudyNameMap.get("flora.foi.hr"));
                    break;
                }
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
