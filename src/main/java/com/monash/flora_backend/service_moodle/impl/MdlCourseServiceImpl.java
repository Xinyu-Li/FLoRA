package com.monash.flora_backend.service_moodle.impl;

import com.baomidou.dynamic.datasource.annotation.DS;
import com.monash.flora_backend.controller.vo.MdlCourseVO;
import com.monash.flora_backend.dao.entity.*;
import com.monash.flora_backend.dao.mapper.MdlCourseMapper;
import com.monash.flora_backend.service_moodle.*;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.monash.flora_backend.util.MyBeanCopyUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * <p>
 * Central course table 服务实现类
 * </p>
 *
 * @author xinyu
 * @since 2023-09-12
 */
@Service
@RequiredArgsConstructor
@DS("slave_1")
public class MdlCourseServiceImpl extends ServiceImpl<MdlCourseMapper, MdlCourse> implements IMdlCourseService {
    private final IMdlQuizService iMdlQuizService;
    private final IMdlSurveyService iMdlSurveyService;
    private final IMdlQuestionnaireService iMdlQuestionnaireService;
    private final IMdlFeedbackService iMdlFeedbackService;


    @Override
    public List<MdlCourseVO> findAll() {
        List<MdlCourse> list = this.list().stream().filter(t-> !t.getCategory().equals(0L)).collect(Collectors.toList());
        if (list.isEmpty()) {
            return new ArrayList<>();
        } else {
            return MyBeanCopyUtils.copyBeanList(list, MdlCourseVO.class);
        }
    }

    @Override
    public List<MdlQuizGrades> findMdlQuizGradeByUserIdAndCourseId(Long userId, Long courseId) {
        return null;
    }

    @Override
    public List<MdlSurveyAnswers> findMdlSurveyAnswersByUserIdAndCourseId(Long userId, Long courseId) {
        return null;
    }

    @Override
    public List<MdlQuestionnaireResponse> findMdlQuestionnaireResponseByUserIdAndCourseId(Long userId, Long courseId) {
        return null;
    }

    @Override
    public List<MdlFeedbackCompleted> findMdlFeedbackCompletedByUserIdAndCourseId(Long userId, Long courseId) {
        return null;
    }
}
