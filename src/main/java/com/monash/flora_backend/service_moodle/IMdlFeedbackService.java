package com.monash.flora_backend.service_moodle;

import com.monash.flora_backend.controller.vo.MdlFeedbackVO;
import com.monash.flora_backend.dao.entity.MdlFeedback;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

/**
 * <p>
 * all feedbacks 服务类
 * </p>
 *
 * @author xinyu
 * @since 2023-09-29
 */
public interface IMdlFeedbackService extends IService<MdlFeedback> {
    Integer countByUserIdAndCourseId(Long userId, Long courseId);
    List<MdlFeedbackVO> findMdlFeedbackVOByFeedbackNameAndCourseIdAndUserId(String feedbackName, Long courseId, Long userId);
}
