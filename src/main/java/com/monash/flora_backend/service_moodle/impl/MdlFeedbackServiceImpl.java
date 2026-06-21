package com.monash.flora_backend.service_moodle.impl;

import com.baomidou.dynamic.datasource.annotation.DS;
import com.monash.flora_backend.controller.vo.MdlFeedbackVO;
import com.monash.flora_backend.dao.entity.MdlFeedback;
import com.monash.flora_backend.dao.mapper.MdlFeedbackMapper;
import com.monash.flora_backend.service_moodle.IMdlFeedbackService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * <p>
 * all feedbacks 服务实现类
 * </p>
 *
 * @author xinyu
 * @since 2023-09-29
 */
@Service
@DS("slave_1")
public class MdlFeedbackServiceImpl extends ServiceImpl<MdlFeedbackMapper, MdlFeedback> implements IMdlFeedbackService {
    @Override
    public Integer countByUserIdAndCourseId(Long userId, Long courseId) {
        return getBaseMapper().countByUserIdAndCourseId(userId, courseId);
    }

    @Override
    public List<MdlFeedbackVO> findMdlFeedbackVOByFeedbackNameAndCourseIdAndUserId(String feedbackName, Long courseId, Long userId) {
        return getBaseMapper().findMdlFeedbackVOByFeedbackNameAndCourseIdAndUserId(feedbackName, courseId, userId);
    }
}
