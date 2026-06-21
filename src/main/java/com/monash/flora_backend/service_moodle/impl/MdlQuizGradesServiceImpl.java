package com.monash.flora_backend.service_moodle.impl;

import com.baomidou.dynamic.datasource.annotation.DS;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.monash.flora_backend.dao.entity.MdlQuizGrades;
import com.monash.flora_backend.dao.mapper.MdlQuizGradesMapper;
import com.monash.flora_backend.service_moodle.IMdlQuizGradesService;
import org.springframework.stereotype.Service;

/**
 * <p>
 * Stores the overall grade for each user on the quiz, based on 服务实现类
 * </p>
 *
 * @author xinyu
 * @since 2023-09-29
 */
@Service
@DS("slave_1")
public class MdlQuizGradesServiceImpl extends ServiceImpl<MdlQuizGradesMapper, MdlQuizGrades> implements IMdlQuizGradesService {
//    @Override
//    public MdlQuizVO quizGradeTest() {
//        return getBaseMapper().findQuizGradesVO();
//    }



}
