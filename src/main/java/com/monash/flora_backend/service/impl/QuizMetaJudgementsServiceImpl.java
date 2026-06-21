package com.monash.flora_backend.service.impl;

import com.monash.flora_backend.dao.entity.QuizMetaJudgements;
import com.monash.flora_backend.dao.mapper.QuizMetaJudgementsMapper;
import com.monash.flora_backend.service.IQuizMetaJudgementsService;
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
public class QuizMetaJudgementsServiceImpl extends ServiceImpl<QuizMetaJudgementsMapper, QuizMetaJudgements> implements IQuizMetaJudgementsService {

    @Override
    public Long saveMetaJudgementRating(Long userId, Long courseId, String ratingValues) {
        // Check if record already exists for this user and course
        QuizMetaJudgements existing = this.lambdaQuery()
                .eq(QuizMetaJudgements::getUserId, userId)
                .eq(QuizMetaJudgements::getCourseId, courseId)
                .one();

        if (existing != null) {
            // Update existing record
            existing.setQuizAnswer(ratingValues);
            existing.setSaveTime(System.currentTimeMillis());
            this.updateById(existing);
            return existing.getId();
        } else {
            // Create new record
            QuizMetaJudgements judgement = new QuizMetaJudgements();
            judgement.setUserId(userId);
            judgement.setCourseId(courseId);
            judgement.setQuizAnswer(ratingValues);
            judgement.setSaveTime(System.currentTimeMillis());
            this.save(judgement);
            return judgement.getId();
        }
    }

    @Override
    public String getMetaJudgementRating(Long userId, Long courseId) {
        QuizMetaJudgements judgement = this.lambdaQuery()
                .eq(QuizMetaJudgements::getUserId, userId)
                .eq(QuizMetaJudgements::getCourseId, courseId)
                .one();
        return judgement != null ? judgement.getQuizAnswer() : null;
    }
}
