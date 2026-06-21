package com.monash.flora_backend.dao.mapper;

import com.baomidou.dynamic.datasource.annotation.DS;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.monash.flora_backend.dao.entity.MdlQuizGrades;
import org.apache.ibatis.annotations.Mapper;

/**
 * <p>
 * Stores the overall grade for each user on the quiz, based on Mapper 接口
 * </p>
 *
 * @author xinyu
 * @since 2023-09-29
 */
@Mapper
@DS("slave_1")
public interface MdlQuizGradesMapper extends BaseMapper<MdlQuizGrades> {
//    @Select({"SELECT mdl_modules.name as type, mdl_course_modules.id, mdl_quiz.course, userid, mdl_quiz_grades.grade, mdl_quiz.grade as total FROM mdl_quiz, mdl_quiz_grades, mdl_course_modules, mdl_modules WHERE mdl_course_modules.module = mdl_modules.id AND mdl_quiz.id = quiz AND mdl_course_modules.course = mdl_quiz.course AND quiz = mdl_course_modules.instance AND mdl_quiz.course=\"2\" AND userid=\"36\" AND mdl_course_modules.id = \"2\";"})
//    MdlQuizVO findQuizGradesVO();

//    @Select("SELECT q.name as quiz_name, qg.userid as user_id, qg.grade, q.course as course_id FROM mdl_quiz q JOIN mdl_quiz_grades qg ON q.id = qg.quiz WHERE q.name LIKE CONCAT('%', #{quizName}, '%') AND q.course = #{courseId} AND qg.userid = #{userId};")

}
