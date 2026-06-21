package com.monash.flora_backend.service.impl;

import com.monash.flora_backend.dao.entity.QuizConfidenceRating;
import com.monash.flora_backend.dao.mapper.QuizConfidenceRatingMapper;
import com.monash.flora_backend.service.IQuizConfidenceRatingService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author xinyu
 * @since 2026-01-22
 */
@Service
public class QuizConfidenceRatingServiceImpl extends ServiceImpl<QuizConfidenceRatingMapper, QuizConfidenceRating> implements IQuizConfidenceRatingService {

    @Override
    public Long saveQuizConfidenceRating(Long userId, Long courseId, String quizName, String ratingValues) {
        // Check if record already exists for this user, course, and quiz
        QuizConfidenceRating existingRating = this.lambdaQuery()
                .eq(QuizConfidenceRating::getUserId, userId)
                .eq(QuizConfidenceRating::getCourseId, courseId)
                .eq(QuizConfidenceRating::getQuizName, quizName)
                .one();

        if (existingRating != null) {
            // Update existing record
            existingRating.setRatingValues(ratingValues);
            existingRating.setRatingTime(System.currentTimeMillis());
            this.updateById(existingRating);
            return Long.valueOf(existingRating.getId());
        } else {
            // Create new record
            QuizConfidenceRating rating = new QuizConfidenceRating();
            rating.setUserId(userId);
            rating.setCourseId(courseId);
            rating.setQuizName(quizName);
            rating.setRatingValues(ratingValues);
            rating.setRatingTime(System.currentTimeMillis());
            this.save(rating);
            return Long.valueOf(rating.getId());
        }
    }

    @Override
    public String getQuizConfidenceRating(Long userId, Long courseId, String quizName) {
        QuizConfidenceRating rating = this.lambdaQuery()
                .eq(QuizConfidenceRating::getUserId, userId)
                .eq(QuizConfidenceRating::getCourseId, courseId)
                .eq(QuizConfidenceRating::getQuizName, quizName)
                .one();
        return rating != null ? rating.getRatingValues() : null;
    }
}
