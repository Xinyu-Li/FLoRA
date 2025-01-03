package com.monash.flora_backend.dao.mapper;

import com.baomidou.dynamic.datasource.annotation.DS;
import com.monash.flora_backend.controller.vo.MdlQuizVO;
import com.monash.flora_backend.dao.entity.MdlQuizAttempts;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import java.util.List;
/**
 * <p>
 * Stores users attempts at quizzes. Mapper 接口
 * </p>
 *
 * @author xinyu
 * @since 2023-10-26
 */
@Mapper
@DS("slave_1")
public interface MdlQuizAttemptsMapper extends BaseMapper<MdlQuizAttempts> {
//    @Select("Select userid, mdl_quiz.name as type, questiontext as question, rightanswer as answer FROM mdl_quiz, mdl_quiz_attempts, mdl_question, mdl_question_attempts Where mdl_question.id = mdl_question_attempts.questionid AND mdl_quiz_attempts.uniqueid = mdl_question_attempts.questionusageid AND mdl_quiz.id = 6 AND mdl_question_attempts.questionid = 406 AND userid =2;")
//    MdlQuizVO findQuizAttemptsVO();

    @Select("SELECT qz.name as quiz_name, qz.course as course_id, qa.userid as user_id, qat.questionusageid, qat.questionsummary as question_summary, qat.responsesummary as response_summary FROM mdl_quiz qz JOIN mdl_quiz_attempts qa ON qz.id = qa.quiz JOIN mdl_question_attempts qat ON qa.uniqueid = qat.questionusageid WHERE qz.name like CONCAT('%', #{quizName}, '%') AND qz.course = #{courseId} AND qa.userid = #{userId} AND qat.questionsummary like '%Have you previously participated to this study%' AND qat.responsesummary like '%Yes%';")
    MdlQuizVO findUserTakePreviousStudy(String quizName, Long courseId, Long userId);

    @Select(
        "SELECT " +
        "mqz.name AS quiz_name, "+
        "mqz.course AS course_id, " +
        "mqza.userid AS user_id, "+
        "mqza.sumgrades AS sumgrades, " +
        "mqsa.questionusageid, " +
        "mqsa.questionsummary AS question_summary, " +
        "mqsa.responsesummary AS response_summary " +
    "FROM " +
        "mdl_quiz mqz " +
    "JOIN " +
        "mdl_quiz_attempts mqza " +
    "ON " +
        "mqz.id = mqza.quiz " +
    "JOIN " +
        "mdl_question_attempts mqsa " +
    "ON " +
        "mqza.uniqueid = mqsa.questionusageid " +
    "WHERE " +
        "mqz.name like CONCAT('%', #{quizName}, '%') AND mqz.course = #{courseId};"
    )
    List <MdlQuizVO> getQuizResponseAllUser(String quizName, Long courseId);
}
