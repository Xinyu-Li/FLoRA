package com.monash.flora_backend.service.impl;

import cn.hutool.json.JSON;
import cn.hutool.json.JSONArray;
import cn.hutool.json.JSONObject;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.monash.flora_backend.config.cache.IGlobalCache;
import com.monash.flora_backend.constant.MyConstant;
import com.monash.flora_backend.dao.entity.PopupQuestionnaire;
import com.monash.flora_backend.dao.mapper.PopupQuestionnaireMapper;
import com.monash.flora_backend.service.IPopupQuestionnaireService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author xinyu
 * @since 2024-12-30
 */
@Slf4j
@Service
@AllArgsConstructor
public class PopupQuestionnaireServiceImpl extends ServiceImpl<PopupQuestionnaireMapper, PopupQuestionnaire> implements IPopupQuestionnaireService {
    private PopupQuestionnaireMapper mapper;
    private final IGlobalCache iGlobalCache;

    /**
     * Updates the answer and answer time for a specific userId and qorder.
     *
     * @param userId the ID of the user
     * @param qorder the question order
     * @param answer the updated answer
     * @param answerTime the updated answer time
     */
    public void updateAnswer(long userId, long courseId, int qorder, String answer, String answerTime) {
        mapper.updateByUserIdAndQorder(userId, courseId, qorder, answer, answerTime);
    }

    @Override
    public int saveNewQuestion(PopupQuestionnaire popupQuestionnaire) {

//        List<PopupQuestionnaire> popupQuestionnaires = mapper.selectQuestionsByUserId(Math.toIntExact(popupQuestionnaire.getUserId()));
        int newQorder = mapper.getMaxOrderValueByUserId(popupQuestionnaire.getUserId(), popupQuestionnaire.getCourseId()) + 1;
        log.warn(String.valueOf(newQorder));
        popupQuestionnaire.setQorder(newQorder);
        super.save(popupQuestionnaire);
        return newQorder;
//        } else {
//            String jsonString = iGlobalCache.get("popup_questions");
//            JSONArray array = new JSONArray(jsonString);
//            JSONObject newObj = new JSONObject();
//            newObj.set("qorder", array.size());
//            newObj.set("content", popupQuestionnaire.getQuestionContent());
//            newObj.set("answered", false);
//            array.add(newObj);
//            iGlobalCache.set("popup_questions", array.toString());
//            popupQuestionnaire.setQorder(array.size() - 1);
//            super.save(popupQuestionnaire);
//            return array.size() - 1;
//        }
    }

    @Override
    public int getSRLProcessLength(long userId, long courseId) {
        if (!iGlobalCache.hasKey("SRLProcessLength_"+ userId + "_" + courseId)) {
            return 0;
        } else {
            return Integer.parseInt(iGlobalCache.get("SRLProcessLength_"+ userId + "_" + courseId));
        }
    }

    @Override
    public void setSRLProcessLength(int length, long userId, long courseId) {
        iGlobalCache.set("SRLProcessLength_"+ userId + "_" + courseId, String.valueOf(length));
    }

//    @Override
//    public void updateCachedQuestionSetting(long userId, String setting) {
//
//    }


    @Override
    public JSONArray getPopupQuestionnaireByUserId(long userId, long courseId) {
        List<PopupQuestionnaire> result = mapper.selectQuestionsByUserId(userId, courseId);
        JSONArray array = new JSONArray();
        for (PopupQuestionnaire aPopupQuestionnaire: result) {
            JSONObject innerObj = new JSONObject();
            innerObj.set("questionContent", aPopupQuestionnaire.getQuestionContent());
            innerObj.set("qorder", aPopupQuestionnaire.getQorder());
            array.add(innerObj);
        }
        return array;
    }
}
