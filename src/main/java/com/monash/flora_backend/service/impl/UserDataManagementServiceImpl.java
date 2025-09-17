package com.monash.flora_backend.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.monash.flora_backend.controller.req.SearchUserReq;
import com.monash.flora_backend.controller.resp.AllCourseAndCategoryResp;
import com.monash.flora_backend.controller.resp.OverviewDataForCourseResp;
import com.monash.flora_backend.controller.resp.OverviewDataForUserResp;
import com.monash.flora_backend.controller.vo.CourseOverviewVO;
import com.monash.flora_backend.dao.entity.UserDataManagement;
import com.monash.flora_backend.dao.mapper.UserDataManagementMapper;
import com.monash.flora_backend.service.*;
import com.monash.flora_backend.service_moodle.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author xinyu
 * @since 2023-09-29
 */
@Service
@RequiredArgsConstructor
public class UserDataManagementServiceImpl extends ServiceImpl<UserDataManagementMapper, UserDataManagement> implements IUserDataManagementService {
    private final IMdlCourseCategoriesService iMdlCourseCategoriesService;
    private final IMdlCourseService iMdlCourseService;
    private final IMdlUserService iMdlUserService;
    private final ITraceDataService iTraceDataService;
    private final IAnnotationService iAnnotationService;
    private final IPlannerService iPlannerService;
    private final IMdlEnrolService iMdlEnrolService;
    private final IMdlQuizGradesService iMdlQuizGradesService;

    private final IEssayService iEssayService;
    private final IUserChatgptLogService iUserChatgptLogService;
    private final IUserTeacherLogService iUserTeacherLogService;
    private final IRuleBaseCheckGrammarService iRuleBaseCheckGrammarService;
    private final IRuleBaseWritingChecklistService iRuleBaseWritingChecklistService;
    private final IRuleBaseOriginalityService iRuleBaseOriginalityService;
    private final IRuleBaseIntegrationAndElaborationService iRuleBaseIntegrationAndElaborationService;
    private final IDictionaryLogService iDictionaryLogService;

    private final IMdlQuizService iMdlQuizService;
    private final IMdlSurveyService iMdlSurveyService;
    private final IMdlQuestionnaireService iMdlQuestionnaireService;
    private final IMdlFeedbackService iMdlFeedbackService;






    @Override
    public void updateUserDataManagement(UserDataManagement userDataManagement) {

    }

    @Override
    public void createUserDateManagement(UserDataManagement userDataManagement) {

    }
}
