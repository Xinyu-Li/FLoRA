package com.monash.flora_backend.dao.mapper;

import com.baomidou.dynamic.datasource.annotation.DS;
import com.monash.flora_backend.controller.vo.MdlQuestionnaireVO;
import com.monash.flora_backend.dao.entity.MdlQuestionnaireQuestion;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * <p>
 * questionnaire_question table retrofitted from MySQL Mapper 接口
 * </p>
 *
 * @author xinyu
 * @since 2023-09-29
 */
@Mapper
@DS("slave_1")
public interface MdlQuestionnaireQuestionMapper extends BaseMapper<MdlQuestionnaireQuestion> {
    @Select("SELECT mdl_modules.name as type, mdl_course_modules.id, mdl_questionnaire.course,mdl_questionnaire_question.id, mdl_questionnaire_question.content FROM mdl_questionnaire, mdl_course_modules, mdl_modules, mdl_questionnaire_question WHERE mdl_modules.id = mdl_course_modules.module AND mdl_questionnaire.id = mdl_course_modules.instance AND mdl_course_modules.course = mdl_questionnaire.course AND mdl_questionnaire_question.surveyid = mdl_course_modules.instance AND mdl_course_modules.id = 50 AND mdl_questionnaire.course = 7;")
    List<MdlQuestionnaireVO> findMdlQuestionnaireQuestionVO();
}
