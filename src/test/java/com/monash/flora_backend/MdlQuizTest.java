package com.monash.flora_backend;

import com.monash.flora_backend.controller.vo.MdlQuizVO;
import com.monash.flora_backend.service_moodle.IMdlQuizAttemptsService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class MdlQuizTest extends FLoRaBackendApplicationTests{
    @Autowired
    private IMdlQuizAttemptsService iMdlQuizAttemptsService;
    @Test
    public void getQuizResponseByUserIdAndCourseIdAndQuizName() {
        String quizName = "Activity 2: How much do you know about renewable energy?";
        Long courseId = 72L;
        Long userId = 6528L; // 6811, 6528
        List<MdlQuizVO> quizVOList = iMdlQuizAttemptsService.getQuizResponseByUserIdAndCourseIdAndQuizNameSimplified(quizName, courseId, userId);
        System.out.println(
                quizVOList.size()
        );
        quizVOList.forEach(System.out::println);
    }

    @Test
    public void testGetQuizResponsesForConfidenceTool() {
        // Test for the new quiz confidence tool
        String quizName = "Activity 1: How much do you know about renewable energy?";
        Long courseId = 74L;
        Long userId = 2L;
        List<MdlQuizVO> quizVOList = iMdlQuizAttemptsService.getQuizResponseByUserIdAndCourseIdAndQuizName(quizName, courseId, userId);
        System.out.println("Total questions: " + quizVOList.size());
        quizVOList.forEach(quizVO -> {
            System.out.println("Slot: " + quizVO.getQuestionSlot());
            System.out.println("Question: " + quizVO.getQuestionSummary());
            System.out.println("Response: " + quizVO.getResponseSummary());
            System.out.println("selection: " + quizVO.getSelectedValue());
            System.out.println("---");
        });
    }
}
