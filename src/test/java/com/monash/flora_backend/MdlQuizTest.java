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
}
