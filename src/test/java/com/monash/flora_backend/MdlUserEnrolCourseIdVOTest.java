package com.monash.flora_backend;

import com.monash.flora_backend.controller.vo.MdlUserCourseDataVO;
import com.monash.flora_backend.controller.vo.MdlUserEnrolCourseIdVO;
import com.monash.flora_backend.controller.vo.MdlUserVO;
import com.monash.flora_backend.dao.mapper.MdlUserMapper;
import com.monash.flora_backend.service_moodle.IMdlFeedbackService;
import com.monash.flora_backend.service_moodle.IMdlQuestionnaireService;
import com.monash.flora_backend.service_moodle.IMdlQuizService;
import com.monash.flora_backend.service_moodle.IMdlSurveyService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class MdlUserEnrolCourseIdVOTest extends FLoRaBackendApplicationTests {

    @Autowired
    private MdlUserMapper iMdlUserMapper;
    @Autowired
    private IMdlQuizService iMdlQuizService;
    @Autowired
    private IMdlSurveyService iMdlSurveyService;
    @Autowired
    private IMdlQuestionnaireService iMdlQuestionnaireService;
    @Autowired
    private IMdlFeedbackService iMdlFeedbackService;

    @Test
    public void test1() {

//        List<MdlUserEnrolCourseIdVO> all = mapper.select123("test");
//        all.forEach(System.out::println);
        List<MdlUserEnrolCourseIdVO> all = iMdlUserMapper.findAllUserEnrolCourse();
        all.forEach(System.out::println);

    }

    @Test
    public void test2() {
        MdlUserVO mdlUserVO = new MdlUserVO();
        System.out.println(mdlUserVO.getUserCourseDataVOList().add(new MdlUserCourseDataVO()));

    }

    @Test
    public void testCount() {
        System.out.println(iMdlQuizService.countByUserIdAndCourseId(3L, 4L));
        System.out.println(iMdlSurveyService.countByUserIdAndCourseId(3L, 4L));
        System.out.println(iMdlQuestionnaireService.countByUserIdAndCourseId(3L, 4L));
        System.out.println(iMdlFeedbackService.countByUserIdAndCourseId(3L, 4L));
    }
}
