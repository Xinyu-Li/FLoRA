package com.monash.flora_backend;

import com.monash.flora_backend.constant.MyConstant;
import com.monash.flora_backend.controller.vo.MdlFeedbackVO;
import com.monash.flora_backend.controller.vo.MdlQuizVO;
import com.monash.flora_backend.service.IEssayService;
import com.monash.flora_backend.service.IUserChatgptLogService;
import com.monash.flora_backend.service_func.GptScaffoldPromptService;
import com.monash.flora_backend.service_moodle.IMdlFeedbackService;
import com.monash.flora_backend.service_moodle.IMdlQuizAttemptsService;
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
    private IUserChatgptLogService iUserChatgptLogService;
    @Autowired
    private IEssayService iEssayService;
    @Test
    public void testFindMdlFeedbackVOByFeedbackNameAndCourseIdAndUserId() {
        List<MdlFeedbackVO> mdlFeedbackVOList = iMdlFeedbackService.findMdlFeedbackVOByFeedbackNameAndCourseIdAndUserId("Activity 3: Metacognitive Awareness Questionnaire", 72L, 2L);
        mdlFeedbackVOList.forEach(System.out::println);
    }

    @Test
    public void testFindUserTakeStudyOne() {
        System.out.println(iMdlQuizAttemptsService.findUserTakePreviousStudy("Activity 1: About yourself", 72L, 2L));
    }

    @Test
    public void testFindQuizGradeByUserIdAndCourseIdAndQuizName() {
        System.out.println(iMdlQuizAttemptsService.findQuizGradeByUserIdAndCourseIdAndQuizName("Activity 2: domain knowledge on renewable energy", 72L, 2L));
    }
    @Test
    public void testGenerateGptPrompt() {
        List<MdlFeedbackVO> mdlFeedbackVOList = iMdlFeedbackService.findMdlFeedbackVOByFeedbackNameAndCourseIdAndUserId("ISDIMU Questionnaire", 2L, 2L);
        MdlQuizVO userTakePreviousStudy = iMdlQuizAttemptsService.findUserTakePreviousStudy("Questionnaire 1: About yourself (study_2)", 2L, 2L);
        MdlQuizVO userGrades = iMdlQuizAttemptsService.findQuizGradeByUserIdAndCourseIdAndQuizName("Questionnaire 2: Pre-Test Activity", 2L, 1106L);
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
        MyConstant.CHAT_SERVICE_URL = "https://chat-service.floraproject.org/myapi"; // 此处的/myapi 是在chat server上面nginx 转发的路径
        System.out.println(checked);
        System.out.println(iUserChatgptLogService.getCopesClassifySentence(
                "人工智能（AI）是指计算机执行那些通常需要人类智慧才能完成的任务的能力。解决复杂问题、识别物体、做出预测，与环境互动等，都是人工智能应用的例子。比如，机器人可以和孩子交谈以帮助孩子提高沟通能力并促进他们的学习。智能机器人还可以协助医生治疗病人。此外，智能机器人还可为患有抑郁症的人提供聊天服务，来帮助他们进行心理治疗。人工智能（AI）的系统可以通过分析数据和预测未来事件来模拟人类智能。通常，人工智能由两部分组成：算法和数据。每个算法包含一组系统求解时需要执行的步骤。当你烤蛋糕时，可以把算法想象成食谱。数据则是制作蛋糕的配料。通过分析更多的数据，算法可以做出更好的推荐。就像当你有更多种类的配料时，你可以做出更精致的蛋糕。人工智能和其它技术的一个关键区别是，包含人工智能的系统可以从数据中学习。另一个例子是，在健康领域分析的数据越多，医生得到的建议就越有效。在新冠肺炎大流行期间，研究人员开发了一种人工智能工具，用于预测哪些患者可能患上新冠肺炎及其症状的严重程度。他们对53名患者进行了测试，收集了他们详细的健康信息。人工智能没有使用发烧或年龄等常见症状和信息来预测，而是成功地利用了肝酶、肌肉疼痛程度和血液血红蛋白水平等独特因素，在预测呼吸困难方面达到了80%的准确率。这显示了人工智能在医疗实践中的强大潜力。",
                List.of("cella_monash_main_task2_medicine_cn.docx"), 1L, "1",taskStartTime, 1, 1));
    }


}
