package com.monash.flora_backend.service;

import com.monash.flora_backend.dao.entity.QuizMetaJudgements;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author xinyu
 * @since 2026-01-22
 */
public interface IQuizMetaJudgementsService extends IService<QuizMetaJudgements> {

    /**
     * Save meta judgement rating
     * @param userId user ID
     * @param courseId course ID
     * @param ratingValues comma-separated rating values (5 values, 1-3)
     * @return saved entity ID
     */
    Long saveMetaJudgementRating(Long userId, Long courseId, String ratingValues);

    /**
     * Get saved meta judgement rating
     * @param userId user ID
     * @param courseId course ID
     * @return saved rating values string, or null if not found
     */
    String getMetaJudgementRating(Long userId, Long courseId);
}
