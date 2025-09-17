package com.monash.flora_backend.dao.mapper;

import com.baomidou.dynamic.datasource.annotation.DS;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.monash.flora_backend.dao.entity.MdlQuiz;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

/**
 * <p>
 * The settings for each quiz. Mapper 接口
 * </p>
 *
 * @author xinyu
 * @since 2023-09-29
 */
@Mapper
@DS("slave_1")
public interface MdlQuizMapper extends BaseMapper<MdlQuiz> {

    @Select("select count(*) from mdl_quiz a join mdl_quiz_grades b on a.id=b.quiz where a.course=#{courseId} and b.userid=#{userId}")
    Integer countByUserIdAndCourseId(Long userId, Long courseId);


//    @Select("Select mdl_quiz.name as type, mdl_quiz.id as quizid, questiontext as question, rightanswer as answer FROM mdl_quiz, mdl_quiz_attempts, mdl_question, mdl_question_attempts Where mdl_question.id = mdl_question_attempts.questionid AND mdl_quiz_attempts.uniqueid = mdl_question_attempts.questionusageid AND mdl_quiz.id = 6 AND mdl_question_attempts.questionid = 406 AND userid =2;")
//    MdlQuizVO findMdlQuizVO();
}
