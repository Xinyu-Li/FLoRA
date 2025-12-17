package com.monash.flora_backend.data_reprocess;

import com.monash.flora_backend.FLoRaBackendApplicationTests;
import com.monash.flora_backend.controller.req.GptScaffoldRequest;
import com.monash.flora_backend.controller.vo.manage.GptScaffoldPromptVO;
import com.monash.flora_backend.controller.vo.manage.NeedCheckSRLPromptVO;
import com.monash.flora_backend.service_func.GptScaffoldPromptService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Xinyu Li
 * @date 10/27/2024
 */
public class ReprocessCellaStudy2Test extends FLoRaBackendApplicationTests {
    @Autowired
    private GptScaffoldPromptService gptScaffoldPromptService;
    @Test
    public void regenerateProcess() {
        GptScaffoldRequest gptScaffoldRequest = new GptScaffoldRequest();
        gptScaffoldRequest.setGptScaffoldNumber(3);

        GptScaffoldPromptVO gptScaffoldPromptVO1 = new GptScaffoldPromptVO();
        gptScaffoldPromptVO1.setTriggerMinute(2);
        gptScaffoldPromptVO1.setBeginMinute(0);
        gptScaffoldPromptVO1.setEndMinute(2);
        gptScaffoldPromptVO1.setCheckSrlProcess("MCO1");
        GptScaffoldPromptVO gptScaffoldPromptVO2 = new GptScaffoldPromptVO();
        gptScaffoldPromptVO2.setTriggerMinute(21);
        gptScaffoldPromptVO2.setBeginMinute(2);
        gptScaffoldPromptVO2.setEndMinute(21);
        gptScaffoldPromptVO2.setCheckSrlProcess("HCEO1");
        GptScaffoldPromptVO gptScaffoldPromptVO3 = new GptScaffoldPromptVO();
        gptScaffoldPromptVO3.setTriggerMinute(35);
        gptScaffoldPromptVO3.setBeginMinute(21);
        gptScaffoldPromptVO3.setEndMinute(35);
        gptScaffoldPromptVO3.setCheckSrlProcess("MCE2");

        gptScaffoldRequest.setGptScaffoldPromptVO(gptScaffoldPromptVO3);
        gptScaffoldRequest.setTestISDIMUName("testISDIMUName");
        gptScaffoldRequest.setPreTestName("preTestName");
        gptScaffoldRequest.setHasTakePreviousStudyTestName("hasTakePreviousStudyTestName");
        gptScaffoldRequest.setPreTestCourseId("4");
        gptScaffoldRequest.setTestISDIMUCourseId("4");
        gptScaffoldRequest.setHasTakePreviousStudyTestNameCourseId("4");
        gptScaffoldRequest.setEssay("essay");
        gptScaffoldRequest.setSubActionAndPromptList(new ArrayList<>());
        gptScaffoldRequest.setSavePlannerSelectedIndexPromptList(new ArrayList<>());
        gptScaffoldRequest.setUserId(1496L);
        gptScaffoldRequest.setCourseId("28");
        gptScaffoldRequest.setIncludeEssay(false);
        gptScaffoldRequest.setGptScaffoldRole("gptScaffoldRole");
        gptScaffoldRequest.setGptScaffoldPromptTemplate("gptScaffoldPromptTemplate");
        gptScaffoldRequest.setGptScaffoldRoleDescription("gptScaffoldRoleDescription");
        gptScaffoldRequest.setUserTakePreviousStudyPrompt("this student take pre study");

        gptScaffoldRequest.setSrlModel("maria");
//        gptScaffoldRequest.setClassifySentenceBackgroundFileNameList(new ArrayList<>());
        gptScaffoldRequest.setPretestGradesPrompt(new ArrayList<>());
        gptScaffoldRequest.setBackgroundFileNameList(new ArrayList<>());
        gptScaffoldRequest.setIsdimuScorePrompt(new ArrayList<>());
        gptScaffoldRequest.setGptScaffoldParameters(List.of(200, 1, 2));

        NeedCheckSRLPromptVO needCheckSRLPromptVO1 = new NeedCheckSRLPromptVO();
        needCheckSRLPromptVO1.setScaffoldNumber(0);
        needCheckSRLPromptVO1.setSrlProcess("MCO1");
        needCheckSRLPromptVO1.setNotExistPrompt("not exist prompt MCO1");
        needCheckSRLPromptVO1.setExistPrompt("");
        needCheckSRLPromptVO1.setThreshold(0);

        NeedCheckSRLPromptVO needCheckSRLPromptVO2 = new NeedCheckSRLPromptVO();
        needCheckSRLPromptVO2.setScaffoldNumber(0);
        needCheckSRLPromptVO2.setSrlProcess("HCEO1");
        needCheckSRLPromptVO2.setNotExistPrompt("not exist prompt HCEO1");
        needCheckSRLPromptVO2.setExistPrompt("");
        needCheckSRLPromptVO2.setThreshold(0);

        NeedCheckSRLPromptVO needCheckSRLPromptVO3 = new NeedCheckSRLPromptVO();
        needCheckSRLPromptVO3.setScaffoldNumber(0);
        needCheckSRLPromptVO3.setSrlProcess("MCE2");
        needCheckSRLPromptVO3.setNotExistPrompt("not exist prompt MCE2");
        needCheckSRLPromptVO3.setExistPrompt("");
        needCheckSRLPromptVO3.setThreshold(0);

        gptScaffoldRequest.setSrlProcessBackupPromptList(List.of(needCheckSRLPromptVO1, needCheckSRLPromptVO2, needCheckSRLPromptVO3));
        gptScaffoldRequest.setGptScaffoldReturnMessages(null);

//        gptScaffoldPromptService.generatePromptBasedOnLearningConditionAndSRLProcess(gptScaffoldRequest);
    }
}
