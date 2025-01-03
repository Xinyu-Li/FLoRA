package com.monash.flora_backend.service_moodle.impl;

import com.baomidou.dynamic.datasource.annotation.DS;
import com.monash.flora_backend.controller.vo.MdlQuizVO;
import com.monash.flora_backend.dao.entity.MdlQuizAttempts;
import com.monash.flora_backend.dao.mapper.MdlQuizAttemptsMapper;
import com.monash.flora_backend.service_moodle.IMdlQuizAttemptsService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;
import java.util.List;
/**
 * <p>
 * Stores users attempts at quizzes. 服务实现类
 * </p>
 *
 * @author xinyu
 * @since 2023-10-26
 */
@Service
@DS("slave_1")
public class MdlQuizAttemptsServiceImpl extends ServiceImpl<MdlQuizAttemptsMapper, MdlQuizAttempts> implements IMdlQuizAttemptsService {

//    @Override
//    public MdlQuizVO quizAttemptsTest() {
//        return getBaseMapper().findQuizAttemptsVO();
//    }

    /**
     * 如果返回null 则表示该user 没有选择yes
     * @param quizName
     * @param courseId
     * @param userId
     * @return
     */
    @Override
    public MdlQuizVO findUserTakePreviousStudy(String quizName, Long courseId, Long userId) {
        return getBaseMapper().findUserTakePreviousStudy(quizName, courseId, userId);
    }

    @Override
    public List<MdlQuizVO> getQuizResponseAllUser(String quizName, Long courseId) {
        return getBaseMapper().getQuizResponseAllUser(quizName,courseId);
    }
}
