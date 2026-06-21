package com.monash.flora_backend.service_moodle.impl;

import com.baomidou.dynamic.datasource.annotation.DS;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.monash.flora_backend.dao.entity.MdlQuiz;
import com.monash.flora_backend.dao.mapper.MdlQuizMapper;
import com.monash.flora_backend.service_moodle.IMdlQuizService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

/**
 * <p>
 * The settings for each quiz. 服务实现类
 * </p>
 *
 * @author xinyu
 * @since 2023-09-15
 */
@Slf4j
@Service
@DS("slave_1")
public class MdlQuizServiceImpl extends ServiceImpl<MdlQuizMapper, MdlQuiz> implements IMdlQuizService {

    @Override
    public Integer countByUserIdAndCourseId(Long userId, Long courseId) {

        return getBaseMapper().countByUserIdAndCourseId(userId, courseId);
    }

//    @Override
//    public MdlQuizVO quizTest() {
////        List<MdlQuiz> test = new ArrayList<>();
////        List<MdlQuiz> newList = test.stream().filter(m->m.getTimecreated() > 123123L).collect(Collectors.toList());
//        return getBaseMapper().findMdlQuizVO();
////        return null;
//    }
}
