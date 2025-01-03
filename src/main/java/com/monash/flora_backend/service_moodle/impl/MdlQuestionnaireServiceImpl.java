package com.monash.flora_backend.service_moodle.impl;

import com.baomidou.dynamic.datasource.annotation.DS;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.monash.flora_backend.dao.customize_entity.MdlQuestionnaireAllResponse;
import com.monash.flora_backend.dao.customize_entity.MdlQuestionnaireQuestionChoice;
import com.monash.flora_backend.dao.customize_entity.MdlQuestionnaireResponseBaseResult;
import com.monash.flora_backend.dao.customize_entity.MdlQuestionnaireResponseRankResult;
import com.monash.flora_backend.dao.entity.*;
import com.monash.flora_backend.dao.mapper.MdlQuestionnaireMapper;
import com.monash.flora_backend.service_moodle.IMdlQuestionnaireService;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * <p>
 * Main questionnaire table. 服务实现类
 * </p>
 *
 * @author xinyu
 * @since 2023-09-29
 */
@Service
@DS("slave_1")
public class MdlQuestionnaireServiceImpl extends ServiceImpl<MdlQuestionnaireMapper, MdlQuestionnaire> implements IMdlQuestionnaireService {
    @Override
    public Integer countByUserIdAndCourseId(Long userId, Long courseId) {
        return getBaseMapper().countByUserIdAndCourseId(userId, courseId);
    }

    @Override
    public MdlQuestionnaire findByNameFuzzy(String searchString) {
        return getBaseMapper().findByNameFuzzy(searchString);
    }

    @Override
    public List<MdlQuestionnaireResponseBaseResult> getBoolResponsesByQuestionnaireFuzzyName(String searchString) {
        return getBaseMapper().getBoolResponsesByQuestionnaireFuzzyName(searchString);
    }

    @Override
    public List<MdlQuestionnaireResponseBaseResult> getDateResponsesByQuestionnaireFuzzyName(String searchString) {
        return getBaseMapper().getDateResponsesByQuestionnaireFuzzyName(searchString);
    }

    @Override
    public List<MdlQuestionnaireResponseBaseResult> getTextResponsesByQuestionnaireFuzzyName(String searchString) {
        return getBaseMapper().getTextResponsesByQuestionnaireFuzzyName(searchString);
    }

    @Override
    public List<MdlQuestionnaireResponseBaseResult> getSingleResponsesByQuestionnaireFuzzyName(String searchString) {
        return getBaseMapper().getSingleResponsesByQuestionnaireFuzzyName(searchString);
    }

    @Override
    public List<MdlQuestionnaireResponseBaseResult> getOtherResponsesByQuestionnaireFuzzyName(String searchString) {
        return getBaseMapper().getOtherResponsesByQuestionnaireFuzzyName(searchString);
    }

    @Override
    public List<MdlQuestionnaireResponseBaseResult> getMultipleResponsesByQuestionnaireFuzzyName(String searchString) {
        return getBaseMapper().getMultipleResponsesByQuestionnaireFuzzyName(searchString);
    };

    @Override
    public List<MdlQuestionnaireResponseRankResult> getRankResponsesByQuestionnaireFuzzyName(String searchString) {
        return getBaseMapper().getRankResponsesByQuestionnaireFuzzyName(searchString);
    };

    @Override
    public List<MdlQuestionnaireQuestionChoice> getQuestionnaireQuestionChoice(String searchString){
        return getBaseMapper().getQuestionnaireQuestionChoice(searchString);
    }

    @Override
    public List<MdlQuestionnaireAllResponse> getQuestionnaireAllResponse(String searchString, Long courseId){
        return getBaseMapper().getQuestionnaireAllResponse(searchString, courseId);
    }

    @Override
    public List<MdlQuestionnaireAllResponse> getQuestionnaireUserResponse(String searchString, Long courseId, Long userId){
        return getBaseMapper().getQuestionnaireUserResponse(searchString, courseId, userId);
    }



}
