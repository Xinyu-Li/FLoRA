package com.monash.flora_backend.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.monash.flora_backend.dao.entity.EssayProductGoal;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author xinyu
 * @since 2025-01-03
 */
public interface IEssayProductGoalService extends IService<EssayProductGoal> {
    String sendEssayProductAnalysisRequest(String requestNumber, String essay, Long userId, String courseId, String username, String processTime, String triggerEvent, String taskName);
}
