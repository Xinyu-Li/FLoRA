package com.monash.flora_backend.dao.mapper;

import com.baomidou.dynamic.datasource.annotation.DS;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.monash.flora_backend.dao.customize_entity.MdlQuestionnaireAllResponse;
import com.monash.flora_backend.dao.customize_entity.MdlQuestionnaireQuestionChoice;
import com.monash.flora_backend.dao.customize_entity.MdlQuestionnaireResponseBaseResult;
import com.monash.flora_backend.dao.customize_entity.MdlQuestionnaireResponseRankResult;
import com.monash.flora_backend.dao.entity.*;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * <p>
 * Main questionnaire table. Mapper 接口
 * </p>
 *
 * @author xinyu
 * @since 2023-09-29
 */
@Mapper
@DS("slave_1")
public interface MdlQuestionnaireMapper extends BaseMapper<MdlQuestionnaire> {
    @Select("select count(*) from mdl_questionnaire a join mdl_questionnaire_response b on a.id=b.questionnaireid where a.course=#{courseId} and b.userid=#{userId}")
    Integer countByUserIdAndCourseId(Long userId, Long courseId);

    @Select("SELECT * FROM mdl_questionnaire WHERE name LIKE CONCAT('%', #{questionnaireName}, '%') LIMIT 1")
    MdlQuestionnaire findByNameFuzzy(String questionnaireName);

    @Select("SELECT " +
        "mqr.questionnaireid AS questionnaireId, " +
        "mq.name AS questionnaireName, " +
        "mqr.userid AS userId, " +
        "mqq.id AS questionId, " +
        "mqq.name AS questionName, " +
        "mqq.type_id AS questionType, " +
        "mqq.position AS questionPosition, " +
        "mqq.content AS questionContent, " +
        "mqrb.choice_id AS result " +
    "FROM " +
        "mdl_questionnaire_response mqr " +
    "JOIN " +
        "mdl_questionnaire mq ON mqr.questionnaireid = mq.id " +
    "LEFT JOIN " +
        "mdl_questionnaire_question mqq ON mqq.surveyid = mq.sid " +
    "JOIN " +
        "mdl_questionnaire_question_type mqqt ON mqq.type_id = mqqt.typeid " +
    "JOIN " +
        "mdl_questionnaire_response_bool mqrb ON mqrb.response_id = mqr.id AND mqrb.question_id = mqq.id " +
    "WHERE " +
        "mqr.complete = 'y' " +
        "AND mqqt.response_table != '' " +
        "AND mq.id = ( " +
            "SELECT id " +
            "FROM mdl_questionnaire " +
            "WHERE name LIKE CONCAT('%', #{questionnaireName}, '%') " +
            "LIMIT 1 " +
        ")"
    )
    List<MdlQuestionnaireResponseBaseResult> getBoolResponsesByQuestionnaireFuzzyName(String questionnaireName);

    @Select("SELECT " +
        "mqr.questionnaireid AS questionnaireId, " +
        "mq.name AS questionnaireName, " +
        "mqr.userid AS userId, " +
        "mqq.id AS questionId, " +
        "mqq.name AS questionName, " +
        "mqq.type_id AS questionType, " +
        "mqq.position AS questionPosition, " +
        "mqq.content AS questionContent, " +
        "mqrd.response AS result " +
    "FROM " +
        "mdl_questionnaire_response mqr " +
    "JOIN " +
        "mdl_questionnaire mq ON mqr.questionnaireid = mq.id " +
    "LEFT JOIN " +
        "mdl_questionnaire_question mqq ON mqq.surveyid = mq.sid " +
    "JOIN " +
        "mdl_questionnaire_question_type mqqt ON mqq.type_id = mqqt.typeid " +
    "JOIN " +
        "mdl_questionnaire_response_date mqrd ON mqrd.response_id = mqr.id AND mqrd.question_id = mqq.id " +
    "WHERE " +
        "mqr.complete = 'y' " +
        "AND mqqt.response_table != '' " +
        "AND mq.id = ( " +
            "SELECT id " +
            "FROM mdl_questionnaire " +
            "WHERE name LIKE CONCAT('%', #{questionnaireName}, '%') " +
            "LIMIT 1 " +
        ")"
    )
    List<MdlQuestionnaireResponseBaseResult> getDateResponsesByQuestionnaireFuzzyName(String questionnaireName);

    @Select("SELECT " +
        "mqr.questionnaireid AS questionnaireId, " +
        "mq.name AS questionnaireName, " +
        "mqr.userid AS userId, " +
        "mqq.id AS questionId, " +
        "mqq.name AS questionName, " +
        "mqq.type_id AS questionType, " +
        "mqq.position AS questionPosition, " +
        "mqq.content AS questionContent, " +
        "mqrt.response AS result " +
    "FROM " +
        "mdl_questionnaire_response mqr " +
    "JOIN " +
        "mdl_questionnaire mq ON mqr.questionnaireid = mq.id " +
    "LEFT JOIN " +
        "mdl_questionnaire_question mqq ON mqq.surveyid = mq.sid " +
    "JOIN " +
        "mdl_questionnaire_question_type mqqt ON mqq.type_id = mqqt.typeid " +
    "JOIN " +
        "mdl_questionnaire_response_text mqrt ON mqrt.response_id = mqr.id AND mqrt.question_id = mqq.id " +
    "WHERE " +
        "mqr.complete = 'y' " +
        "AND mqqt.response_table != '' " +
        "AND mq.id = ( " +
            "SELECT id " +
            "FROM mdl_questionnaire " +
            "WHERE name LIKE CONCAT('%', #{questionnaireName}, '%') " +
            "LIMIT 1 " +
        ")"
    )
    List<MdlQuestionnaireResponseBaseResult> getTextResponsesByQuestionnaireFuzzyName(String questionnaireName);

    @Select("SELECT " +
        "mqr.questionnaireid AS questionnaireId, " +
        "mq.name AS questionnaireName, " +
        "mqr.userid AS userId, " +
        "mqq.id AS questionId, " +
        "mqq.name AS questionName, " +
        "mqq.type_id AS questionType, " +
        "mqq.position AS questionPosition, " +
        "mqq.content AS questionContent, " +
        "mqro.response AS result " +
    "FROM " +
        "mdl_questionnaire_response mqr " +
    "JOIN " +
        "mdl_questionnaire mq ON mqr.questionnaireid = mq.id " +
    "LEFT JOIN " +
        "mdl_questionnaire_question mqq ON mqq.surveyid = mq.sid " +
    "JOIN " +
        "mdl_questionnaire_question_type mqqt ON mqq.type_id = mqqt.typeid " +
    "JOIN " +
        "mdl_questionnaire_response_other mqro ON mqro.response_id = mqr.id AND mqro.question_id = mqq.id " +
    "WHERE " +
        "mqr.complete = 'y' " +
        "AND mqqt.response_table != '' " +
        "AND mq.id = ( " +
            "SELECT id " +
            "FROM mdl_questionnaire " +
            "WHERE name LIKE CONCAT('%', #{questionnaireName}, '%') " +
            "LIMIT 1 " +
        ")"
    )
    List<MdlQuestionnaireResponseBaseResult> getOtherResponsesByQuestionnaireFuzzyName(String questionnaireName);

    @Select("SELECT " +
        "mqr.questionnaireid AS questionnaireId, " +
        "mq.name AS questionnaireName, " +
        "mqr.userid AS userId, " +
        "mqq.id AS questionId, " +
        "mqq.name AS questionName, " +
        "mqq.type_id AS questionType, " +
        "mqq.position AS questionPosition, " +
        "mqq.content AS questionContent, " +
        "mqqc.content AS result " +
    "FROM " +
        "mdl_questionnaire_response mqr " +
    "JOIN " +
        "mdl_questionnaire mq ON mqr.questionnaireid = mq.id " +
    "LEFT JOIN " +
        "mdl_questionnaire_question mqq ON mqq.surveyid = mq.sid " +
    "JOIN " +
        "mdl_questionnaire_question_type mqqt ON mqq.type_id = mqqt.typeid " +
    "JOIN " +
        "mdl_questionnaire_resp_single mqrs ON mqrs.response_id = mqr.id AND mqrs.question_id = mqq.id " +
    "JOIN " +
        "mdl_questionnaire_quest_choice mqqc ON mqrs.choice_id = mqqc.id " +
    "WHERE " +
        "mqr.complete = 'y' " +
        "AND mqqt.response_table != '' " +
        "AND mq.id = ( " +
            "SELECT id " +
            "FROM mdl_questionnaire " +
            "WHERE name LIKE CONCAT('%', #{questionnaireName}, '%') " +
            "LIMIT 1 " +
        ")"
    )
    List<MdlQuestionnaireResponseBaseResult> getSingleResponsesByQuestionnaireFuzzyName(String questionnaireName);

    //TODO 获取最后一个  responseId
    @Select("SELECT " +
        "mqr.questionnaireid AS questionnaireId, " +
        "mq.name AS questionnaireName, " +
        "mqr.userid AS userId, " +
//        "mqr.id AS responseId, " +
        "mqq.id AS questionId, " +
        "mqq.name AS questionName, " +
        "mqq.type_id AS questionType, " +
        "mqq.position AS questionPosition, " +
        "mqq.content AS questionContent, " +
        "mqqc.content AS result " +
    "FROM " +
        "mdl_questionnaire_response mqr " +
    "JOIN " +
        "mdl_questionnaire mq ON mqr.questionnaireid = mq.id " +
    "LEFT JOIN " +
        "mdl_questionnaire_question mqq ON mqq.surveyid = mq.sid " +
    "JOIN " +
        "mdl_questionnaire_question_type mqqt ON mqq.type_id = mqqt.typeid " +
    "JOIN " +
        "mdl_questionnaire_resp_multiple mqrm ON mqrm.response_id = mqr.id AND mqrm.question_id = mqq.id " +
    "JOIN " +
        "mdl_questionnaire_quest_choice mqqc ON mqrm.choice_id = mqqc.id " +
    "WHERE " +
        "mqr.complete = 'y' " +
        "AND mqqt.response_table != '' " +
        "AND mq.id = ( " +
            "SELECT id " +
            "FROM mdl_questionnaire " +
            "WHERE name LIKE CONCAT('%', #{questionnaireName}, '%') " +
            "LIMIT 1 " +
        ")"
    )
    List<MdlQuestionnaireResponseBaseResult> getMultipleResponsesByQuestionnaireFuzzyName(String questionnaireName);

    
    @Select("SELECT " +
        "mqr.questionnaireid AS questionnaireId, " +
        "mq.name AS questionnaireName, " +
        "mqr.userid AS userId, " +
        "mqq.id AS questionId, " +
        "mqq.name AS questionName, " +
        "mqq.type_id AS questionType, " +
        "mqq.position AS questionPosition, " +
        "mqq.content AS questionContent, " +
        "mqqc.content AS result, " +
        "mqrk.rankvalue AS rankValue " +
    "FROM " +
        "mdl_questionnaire_response mqr " +
    "JOIN " +
        "mdl_questionnaire mq ON mqr.questionnaireid = mq.id " +
    "LEFT JOIN " +
        "mdl_questionnaire_question mqq ON mqq.surveyid = mq.sid " +
    "JOIN " +
        "mdl_questionnaire_question_type mqqt ON mqq.type_id = mqqt.typeid " +
    "JOIN " +
        "mdl_questionnaire_response_rank mqrk ON mqrk.response_id = mqr.id AND mqrk.question_id = mqq.id " +
    "JOIN " +
        "mdl_questionnaire_quest_choice mqqc ON mqrk.choice_id = mqqc.id " +
    "WHERE " +
        "mqr.complete = 'y' " +
        "AND mqqt.response_table != '' " +
        "AND mq.id = ( " +
            "SELECT id " +
            "FROM mdl_questionnaire " +
            "WHERE name LIKE CONCAT('%', #{questionnaireName}, '%') " +
            "LIMIT 1 " +
        ")"
    )
    List<MdlQuestionnaireResponseRankResult> getRankResponsesByQuestionnaireFuzzyName(String questionnaireName);

    @Select("SELECT " +
                "mq.name AS questionnaireName, "+
                "mqq.id AS questionId, "+
                "mqq.name AS questionName, "+
                "mqq.position AS questionPosition, "+
                "mqq.content AS questionContent, "+
                "mqqc.id AS choiceId, "+
                "mqqc.content AS choice "+
            "FROM "+
                "mdl_questionnaire mq "+
            "LEFT JOIN "+
                "mdl_questionnaire_question mqq ON mqq.surveyid = mq.sid "+
            "JOIN "+
                "mdl_questionnaire_quest_choice mqqc ON mqq.id = mqqc.question_id "+
            "WHERE "+
                "mq.id = ( "+
                    "SELECT id "+
                    "FROM mdl_questionnaire "+
                    "WHERE name LIKE CONCAT('%', #{questionnaireName}, '%') "+
                    "LIMIT 1 "+
            ")"
    )
    List<MdlQuestionnaireQuestionChoice> getQuestionnaireQuestionChoice(String questionnaireName);

    @Select("SELECT " +
                "mqr.id AS responseId, " +
                "mqr.submitted as submittedTime, "+
                "mqr.questionnaireid AS questionnaireId, "+
                "mq.name as questionnaireName," +
                "mqr.userid AS userId, "+
                
                "mu.firstname as userFirstname, "+
                "mu.lastname as userLastname, " + 
                "mqq.id AS questionId, " +
                "mqq.name AS questionName, " +
                "mqq.position AS questionPosition, "+
            
                "mqq.content AS questionContent, "+
                "mqqc.id AS choiceId, "+
                "mqqc.content AS choiceContent, "+
                "CASE "+
                    "WHEN mqrm.choice_id IS NOT NULL THEN TRUE " +
                "ELSE FALSE " +
                "END AS selected, " +
                "COALESCE(CONCAT(dependentQuestion.name, ' -> ', dependentChoice.content), 'none') AS dependency " +
            "FROM " +
                "mdl_questionnaire_response mqr " +
            "JOIN " +
                "mdl_questionnaire mq ON mqr.questionnaireid = mq.id " +
            "JOIN " +
                "mdl_questionnaire_question mqq ON mqq.surveyid = mq.id " +
            "LEFT JOIN " +
                "mdl_questionnaire_quest_choice mqqc ON mqq.id = mqqc.question_id " +
            "LEFT JOIN " +
                "mdl_questionnaire_resp_multiple mqrm ON mqr.id = mqrm.response_id AND mqqc.id = mqrm.choice_id AND mqq.id = mqrm.question_id " +
            "LEFT JOIN " +
                "mdl_questionnaire_dependency mqd ON mqd.questionid = mqq.id " +
            "LEFT JOIN " +
                "mdl_questionnaire_question dependentQuestion ON mqd.dependquestionid = dependentQuestion.id " +
            "LEFT JOIN " +
                "mdl_questionnaire_quest_choice dependentChoice ON mqd.dependchoiceid = dependentChoice.id " +
            "LEFT JOIN " +
                "mdl_user mu ON mqr.userid = mu.id " +
            "WHERE " +
                "mqr.complete = 'y' " +
                "AND " +
                "mq.id = ( " +
                    "SELECT id " +
                    "FROM mdl_questionnaire " +
                    "WHERE name LIKE CONCAT('%', #{questionnaireName}, '%') "+
                    "AND course = #{courseId} " +
                    "LIMIT 1 " +
                " ) " +
                "AND mqq.name IS NOT NULL " +
            "ORDER BY " +
            "responseId,questionnaireId,questionPosition; "
    )
    List<MdlQuestionnaireAllResponse> getQuestionnaireAllResponse(String questionnaireName, Long courseId);

    @Select("SELECT " +
            "mqr.id AS responseid, " +
            "mqr.questionnaireid AS questionnaire_id, "+
            "mq.name AS questionnaire_name, "+
            "mqr.userid AS user_id, "+
            "mqr.submitted as submitted_time, "+
            "mu.firstname as user_firstname, "+
            "mu.lastname as user_lastname, " + "mqq.id AS question_id, " +
            "mqq.name AS question_name, " +
            "mqq.position AS question_position, "+
            "mqq.content AS question_content, "+
            "mqqc.id AS choice_id, "+
            "mqqc.content AS choice_content, "+
            "CASE "+
            "WHEN mqrm.choice_id IS NOT NULL THEN TRUE " +
            "ELSE FALSE " +
            "END AS selected, " +
            "COALESCE(CONCAT(dependentQuestion.name, ' -> ', dependentChoice.content), 'none') AS dependency " + //CONCAT 函数中遇到NULL时候，结果直接是NULL
            "FROM " +
            "mdl_questionnaire_response mqr " +
            "JOIN " +
            "mdl_questionnaire mq ON mqr.questionnaireid = mq.id " +
            "JOIN " +
            "mdl_questionnaire_question mqq ON mqq.surveyid = mq.id " +
            "LEFT JOIN " +
            "mdl_questionnaire_quest_choice mqqc ON mqq.id = mqqc.question_id " +
            "LEFT JOIN " +
            "mdl_questionnaire_resp_multiple mqrm ON mqr.id = mqrm.response_id AND mqqc.id = mqrm.choice_id AND mqq.id = mqrm.question_id " +
            "LEFT JOIN " +
            "mdl_questionnaire_dependency mqd ON mqd.questionid = mqq.id " +
            "LEFT JOIN " +
            "mdl_questionnaire_question dependentQuestion ON mqd.dependquestionid = dependentQuestion.id " +
            "LEFT JOIN " +
            "mdl_questionnaire_quest_choice dependentChoice ON mqd.dependchoiceid = dependentChoice.id " +
            "LEFT JOIN " +
            "mdl_user mu ON mqr.userid = mu.id " +
            "WHERE " +
            "mqr.complete = 'y' " +
            "AND " +
            "mq.id = ( " +
            "SELECT MAX(id) " +
            "FROM mdl_questionnaire " +
            "WHERE name LIKE CONCAT('%', #{questionnaireName}, '%') "+
            "AND course = #{courseId} " +
            "LIMIT 1 " +
            " ) " +
            "AND mqr.userid = #{userId} " +
            "AND mqq.name IS NOT NULL " +
            "ORDER BY " +
            "responseid,questionnaire_id,question_position; "
    )
    List<MdlQuestionnaireAllResponse> getQuestionnaireUserResponse(String questionnaireName, Long courseId, Long userId);



//    @Select("SELECT " +
//                "mq.name AS questionnaireName, "+
//                "mqq.id AS questionid, "+
//                "mqq.name AS questionName, "+
//                "mqq.position AS questionPosition, "+
//                "mqq.content AS questionContent, "+
//                "mqqc.id AS choiceid, "+
//                "mqqc.content AS choice "+
//            "FROM "+
//                "mdl_questionnaire mq "+
//            "LEFT JOIN "+
//                "mdl_questionnaire_question mqq ON mqq.surveyid = mq.sid "+
//            "JOIN "+
//                "mdl_questionnaire_quest_choice mqqc ON mqq.id = mqqc.question_id "+
//            "WHERE "+
//                "mq.id = ( "+
//                    "SELECT id "+
//                    "FROM mdl_questionnaire "+
//                    "WHERE name LIKE CONCAT('%', #{questionnaireName}, '%') "+
//                    "LIMIT 1 "+
//            ")"
//    )
//    List<MdlQuestionnaireQuestionChoice> getQuestionnaireQuestionChoice(String questionnaireName);
//
//    @Select("SELECT " +
//                "mqr.id AS responseid, " +
//                "mqr.questionnaireid AS questionnaire_id, "+
//                "mqr.userid AS user_id, "+
//                "mqr.submitted as submitted_time, "+
//                "mu.firstname as user_firstname, "+
//                "mu.lastname as user_lastname, " + "mqq.id AS question_id, " +
//                "mqq.name AS question_name, " +
//                "mqq.position AS question_position, "+
//                "mqq.content AS question_content, "+
//                "mqqc.id AS choice_id, "+
//                "mqqc.content AS choice_content, "+
//                "CASE "+
//                    "WHEN mqrm.choice_id IS NOT NULL THEN TRUE " +
//                "ELSE FALSE " +
//                "END AS selected, " +
//                "COALESCE(CONCAT(dependentQuestion.name, ' -> ', dependentChoice.content), 'none') AS dependency " +
//            "FROM " +
//                "mdl_questionnaire_response mqr " +
//            "JOIN " +
//                "mdl_questionnaire mq ON mqr.questionnaireid = mq.id " +
//            "JOIN " +
//                "mdl_questionnaire_question mqq ON mqq.surveyid = mq.id " +
//            "LEFT JOIN " +
//                "mdl_questionnaire_quest_choice mqqc ON mqq.id = mqqc.question_id " +
//            "LEFT JOIN " +
//                "mdl_questionnaire_resp_multiple mqrm ON mqr.id = mqrm.response_id AND mqqc.id = mqrm.choice_id AND mqq.id = mqrm.question_id " +
//            "LEFT JOIN " +
//                "mdl_questionnaire_dependency mqd ON mqd.questionid = mqq.id " +
//            "LEFT JOIN " +
//                "mdl_questionnaire_question dependentQuestion ON mqd.dependquestionid = dependentQuestion.id " +
//            "LEFT JOIN " +
//                "mdl_questionnaire_quest_choice dependentChoice ON mqd.dependchoiceid = dependentChoice.id " +
//            "LEFT JOIN " +
//                "mdl_user mu ON mqr.userid = mu.id " +
//            "WHERE " +
//                "mqr.complete = 'y' " +
//                "AND " +
//                "mq.id = ( " +
//                    "SELECT id " +
//                    "FROM mdl_questionnaire " +
//                    "WHERE name LIKE CONCAT('%', #{questionnaireName}, '%') "+
//                    "AND course = #{courseId} " +
//                    "LIMIT 1 " +
//                " ) " +
//                "AND mqq.name IS NOT NULL " +
//            "ORDER BY " +
//            "responseid,questionnaire_id,question_position; "
//    )
//    List<MdlQuestionnaireAllResponse> getQuestionnaireAllResponse(String questionnaireName, Long courseId);
//

//    @Select("SELECT " +
//                "mq.name AS questionnaireName, "+
//                "mqq.id AS questionid, "+
//                "mqq.name AS questionName, "+
//                "mqq.position AS questionPosition, "+
//                "mqq.content AS questionContent, "+
//                "mqqc.id AS choiceid, "+
//                "mqqc.content AS choice "+
//            "FROM "+
//                "mdl_questionnaire mq "+
//            "LEFT JOIN "+
//                "mdl_questionnaire_question mqq ON mqq.surveyid = mq.sid "+
//            "JOIN "+
//                "mdl_questionnaire_quest_choice mqqc ON mqq.id = mqqc.question_id "+
//            "WHERE "+
//                "mq.id = ( "+
//                    "SELECT id "+
//                    "FROM mdl_questionnaire "+
//                    "WHERE name LIKE CONCAT('%', #{questionnaireName}, '%') "+
//                    "LIMIT 1 "+
//            ")"
//    )
//    List<MdlQuestionnaireQuestionChoice> getQuestionnaireQuestionChoice(String questionnaireName);
//
//    @Select("SELECT " +
//                "mqr.id AS responseid, " +
//                "mqr.questionnaireid AS questionnaire_id, "+
//                "mqr.userid AS user_id, "+
//                "mqr.submitted as submitted_time, "+
//                "mu.firstname as user_firstname, "+
//                "mu.lastname as user_lastname, " + "mqq.id AS question_id, " +
//                "mqq.name AS question_name, " +
//                "mqq.position AS question_position, "+
//                "mqq.content AS question_content, "+
//                "mqqc.id AS choice_id, "+
//                "mqqc.content AS choice_content, "+
//                "CASE "+
//                    "WHEN mqrm.choice_id IS NOT NULL THEN TRUE " +
//                "ELSE FALSE " +
//                "END AS selected, " +
//                "COALESCE(CONCAT(dependentQuestion.name, ' -> ', dependentChoice.content), 'none') AS dependency " +
//            "FROM " +
//                "mdl_questionnaire_response mqr " +
//            "JOIN " +
//                "mdl_questionnaire mq ON mqr.questionnaireid = mq.id " +
//            "JOIN " +
//                "mdl_questionnaire_question mqq ON mqq.surveyid = mq.id " +
//            "LEFT JOIN " +
//                "mdl_questionnaire_quest_choice mqqc ON mqq.id = mqqc.question_id " +
//            "LEFT JOIN " +
//                "mdl_questionnaire_resp_multiple mqrm ON mqr.id = mqrm.response_id AND mqqc.id = mqrm.choice_id AND mqq.id = mqrm.question_id " +
//            "LEFT JOIN " +
//                "mdl_questionnaire_dependency mqd ON mqd.questionid = mqq.id " +
//            "LEFT JOIN " +
//                "mdl_questionnaire_question dependentQuestion ON mqd.dependquestionid = dependentQuestion.id " +
//            "LEFT JOIN " +
//                "mdl_questionnaire_quest_choice dependentChoice ON mqd.dependchoiceid = dependentChoice.id " +
//            "LEFT JOIN " +
//                "mdl_user mu ON mqr.userid = mu.id " +
//            "WHERE " +
//                "mqr.complete = 'y' " +
//                "AND " +
//                "mq.id = ( " +
//                    "SELECT id " +
//                    "FROM mdl_questionnaire " +
//                    "WHERE name LIKE CONCAT('%', #{questionnaireName}, '%') "+
//                    "AND course = #{courseId} " +
//                    "LIMIT 1 " +
//                " ) " +
//                "AND mqq.name IS NOT NULL " +
//            "ORDER BY " +
//            "responseid,questionnaire_id,question_position; "
//    )
//    List<MdlQuestionnaireAllResponse> getQuestionnaireAllResponse(String questionnaireName, Long courseId);


}
