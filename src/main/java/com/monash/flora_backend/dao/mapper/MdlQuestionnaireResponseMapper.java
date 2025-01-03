package com.monash.flora_backend.dao.mapper;

import com.baomidou.dynamic.datasource.annotation.DS;
import com.monash.flora_backend.controller.vo.MdlQuestionnaireVO;
import com.monash.flora_backend.dao.entity.MdlQuestionnaireResponse;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * <p>
 * questionnaire_response table retrofitted from MySQL Mapper 接口
 * </p>
 *
 * @author xinyu
 * @since 2023-09-30
 */
@Mapper
@DS("slave_1")
public interface MdlQuestionnaireResponseMapper extends BaseMapper<MdlQuestionnaireResponse> {
    @Select("SELECT mdl_modules.name as type, mdl_course_modules.id, mdl_questionnaire.course, mdl_questionnaire_response.userid , mdl_questionnaire_question.id, mdl_questionnaire_question.content as question, mdl_questionnaire_quest_choice.content as response FROM mdl_questionnaire, mdl_course_modules, mdl_modules, mdl_questionnaire_question, mdl_questionnaire_resp_single, mdl_questionnaire_quest_choice, mdl_questionnaire_response WHERE mdl_questionnaire_question.id = mdl_questionnaire_resp_single.question_id AND mdl_questionnaire_quest_choice.id = mdl_questionnaire_resp_single.choice_id AND mdl_modules.id = mdl_course_modules.module AND mdl_questionnaire.id = mdl_course_modules.instance AND mdl_course_modules.course = mdl_questionnaire.course AND mdl_questionnaire_question.surveyid = mdl_course_modules.instance AND mdl_questionnaire.id = mdl_questionnaire_response.questionnaireid AND mdl_course_modules.id = 50 AND mdl_questionnaire.course = 7 AND mdl_questionnaire_response.userid = 25 AND mdl_questionnaire_question.id = 30;")
    List<MdlQuestionnaireVO> findMdlQuestionnaireResponseVO();
}
