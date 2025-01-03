package com.monash.flora_backend.dao.mapper;

import com.baomidou.dynamic.datasource.annotation.DS;
import com.monash.flora_backend.controller.vo.MdlSurveyAnswersVO;
import com.monash.flora_backend.dao.entity.MdlSurveyAnswers;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * <p>
 * the answers to each questions filled by the users Mapper 接口
 * </p>
 *
 * @author xinyu
 * @since 2023-09-30
 */
@Mapper
@DS("slave_1")
public interface MdlSurveyAnswersMapper extends BaseMapper<MdlSurveyAnswers> {
    @Select("SELECT mdl_course_modules.course , mdl_course_modules.id as survey_id, mdl_survey_answers.userid, mdl_survey_questions.id as qid, mdl_survey_questions.text as qtn_text , mdl_survey_answers.answer1 FROM mdl_course_modules, mdl_survey_answers, mdl_survey_questions WHERE mdl_survey_questions.id = mdl_survey_answers.question AND mdl_survey_answers.userid = \"2\" AND mdl_survey_answers.survey = mdl_course_modules.instance AND mdl_course_modules.course = \"4\" AND mdl_course_modules.id = \"48\";")
    List<MdlSurveyAnswersVO> findMdlSurveyAnswersVO();
}
