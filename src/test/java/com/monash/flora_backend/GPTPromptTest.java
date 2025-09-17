package com.monash.flora_backend;

import com.monash.flora_backend.controller.vo.MdlFeedbackVO;
import com.monash.flora_backend.controller.vo.MdlQuizVO;
import com.monash.flora_backend.service.IEssayService;
import com.monash.flora_backend.service.IUserChatgptLogService;
import com.monash.flora_backend.service_func.GptScaffoldPromptService;
import com.monash.flora_backend.service_moodle.IMdlFeedbackService;
import com.monash.flora_backend.service_moodle.IMdlQuizAttemptsService;
import com.monash.flora_backend.service_moodle.IMdlQuizGradesService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class GPTPromptTest extends FLoRaBackendApplicationTests {
    @Autowired
    private IMdlFeedbackService iMdlFeedbackService;
    @Autowired
    private GptScaffoldPromptService gptScaffoldPromptService;
    @Autowired
    private IMdlQuizAttemptsService iMdlQuizAttemptsService;
    @Autowired
    private IMdlQuizGradesService iMdlQuizGradesService;
    @Autowired
    private IUserChatgptLogService iUserChatgptLogService;
    @Autowired
    private IEssayService iEssayService;
    @Test
    public void testFindMdlFeedbackVOByFeedbackNameAndCourseIdAndUserId() {
        List<MdlFeedbackVO> mdlFeedbackVOList = iMdlFeedbackService.findMdlFeedbackVOByFeedbackNameAndCourseIdAndUserId("ISDIMU Questionnaire", 2L, 2L);
        mdlFeedbackVOList.forEach(System.out::println);
    }

    @Test
    public void testFindUserTakeStudyOne() {
        System.out.println(iMdlQuizAttemptsService.findUserTakePreviousStudy("Questionnaire 1: About yourself (study_2)", 2L, 2L));
    }

    @Test
    public void testFindQuizGradeByUserIdAndCourseIdAndQuizName() {
        System.out.println(iMdlQuizGradesService.findQuizGradeByUserIdAndCourseIdAndQuizName("Questionnaire 2: Pre-Test Activity", 2L, 1106L));
    }
    @Test
    public void testGenerateGptPrompt() {
        List<MdlFeedbackVO> mdlFeedbackVOList = iMdlFeedbackService.findMdlFeedbackVOByFeedbackNameAndCourseIdAndUserId("ISDIMU Questionnaire", 2L, 2L);
        MdlQuizVO userTakePreviousStudy = iMdlQuizAttemptsService.findUserTakePreviousStudy("Questionnaire 1: About yourself (study_2)", 2L, 2L);
        MdlQuizVO userGrades = iMdlQuizGradesService.findQuizGradeByUserIdAndCourseIdAndQuizName("Questionnaire 2: Pre-Test Activity", 2L, 1106L);
        mdlFeedbackVOList.forEach(System.out::println);
        System.out.println(userTakePreviousStudy);
        System.out.println(userGrades);
//        System.out.println(gptScaffoldPromptService.promptTest("ISDIMU Questionnaire", "Questionnaire 1: About yourself (study_2)", "Questionnaire 2: Pre-Test Activity", 2L, 2L));
    }


    @Test
    public void testGetCopesClassifySentence() {
        Integer beginMinute = 0;
        Integer endMinute = 1;
        String taskStartTime = "1716104314995";  //1716104314995
        String beginTimestamp = String.valueOf(Long.parseLong(taskStartTime) + beginMinute * 60 * 1000);
        String endTimestamp = String.valueOf(Long.parseLong(taskStartTime) + endMinute * 60 * 1000);
        boolean checked = iEssayService.checkEssayHasUpdateBetweenTimeRange(221L, "0", beginTimestamp, endTimestamp);

        System.out.println(checked);
//        System.out.println(iUserChatgptLogService.getCopesClassifySentence("This is a test sentence. This sentence is different. Another sample sentence.", List.of("CELLA_main_task_reading.docx"), 1L, "1", 1, 1));
    }
}
