package com.monash.flora_backend.service;

import cn.hutool.json.JSONArray;
import com.monash.flora_backend.dao.entity.PopupQuestionnaire;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author xinyu
 * @since 2024-12-30
 */
public interface IPopupQuestionnaireService extends IService<PopupQuestionnaire> {

    /**
     * Updates the answer and answer time for a specific userId and qorder.
     *
     * @param userId the ID of the user
     * @param qorder the question order
     * @param answer the updated answer
     * @param answerTime the updated answer time
     * @return the number of rows affected
     */
    void updateAnswer(long userId, long courseId, int qorder, String answer, String answerTime);
    int saveNewQuestion(PopupQuestionnaire popupQuestionnaire);
    int getSRLProcessLength(long userId, long courseId);
    void setSRLProcessLength(int length, long userId, long courseId);
//    void updateCachedQuestionSetting(long userId, String setting);
    JSONArray getPopupQuestionnaireByUserId(long userId, long courseId);
}
