package com.monash.flora_backend.service;

import com.monash.flora_backend.dao.entity.QuizConfidenceRating;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author xinyu
 * @since 2026-01-22
 */
public interface IQuizConfidenceRatingService extends IService<QuizConfidenceRating> {

    /**
     * Save quiz confidence rating
     * @param userId user ID
     * @param courseId course ID
     * @param quizName quiz name
     * @param ratingValues comma-separated rating values (15 values, 0-10, 0 means unrated)
     * @return saved entity ID
     */
    Long saveQuizConfidenceRating(Long userId, Long courseId, String quizName, String ratingValues);

    /**
     * Get saved quiz confidence rating
     * @param userId user ID
     * @param courseId course ID
     * @param quizName quiz name
     * @return saved rating values string, or null if not found
     */
    String getQuizConfidenceRating(Long userId, Long courseId, String quizName);
}
