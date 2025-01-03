package com.monash.flora_backend.service_moodle;

import com.baomidou.mybatisplus.extension.service.IService;
import com.monash.flora_backend.dao.customize_entity.MdlQuestionnaireAllResponse;
import com.monash.flora_backend.dao.customize_entity.MdlQuestionnaireQuestionChoice;
import com.monash.flora_backend.dao.customize_entity.MdlQuestionnaireResponseBaseResult;
import com.monash.flora_backend.dao.customize_entity.MdlQuestionnaireResponseRankResult;
import com.monash.flora_backend.dao.entity.*;

import java.util.List;

/**
 * <p>
 * Main questionnaire table. 服务类
 * </p>
 *
 * @author xinyu
 * @since 2023-09-29
 */
public interface IMdlQuestionnaireService extends IService<MdlQuestionnaire> {
    Integer countByUserIdAndCourseId(Long userId, Long courseId);

    /**
     * 找到questionnaire
     * @param questionnaireName 部分 questionnaire name
     * @return
     */
    MdlQuestionnaire findByNameFuzzy(String questionnaireName);

    /**
     * get answer for yes/no, return string "Y/N"
     * @param questionnaireName 部分 questionnaire name
     * @return
     */
    List<MdlQuestionnaireResponseBaseResult> getBoolResponsesByQuestionnaireFuzzyName(String questionnaireName);

    /**
     * get answer for date question, return string, readable date, e.g. 2024-11-31
     * @param questionnaireName 部分 questionnaire name
     * @return
     */
    List<MdlQuestionnaireResponseBaseResult> getDateResponsesByQuestionnaireFuzzyName(String questionnaireName);

    /**
     * text
     * @param questionnaireName 部分 questionnaire name
     * @return
     */
    List<MdlQuestionnaireResponseBaseResult> getTextResponsesByQuestionnaireFuzzyName(String questionnaireName);

    /**
     * user select other and fill text, return string
     * @param questionnaireName 部分 questionnaire name
     * @return
     */
    List<MdlQuestionnaireResponseBaseResult> getOtherResponsesByQuestionnaireFuzzyName(String questionnaireName);

    /**
     * get answer for radio/dropdown - single choice question, return choice text and choice position
     * @param questionnaireName 部分 questionnaire name
     * @return
     */
    List<MdlQuestionnaireResponseBaseResult> getSingleResponsesByQuestionnaireFuzzyName(String questionnaireName);

    /**
     * checkbox multiple selection, 没加parent dependency
     * @param questionnaireName 部分 questionnaire name
     * @return
     */
    List<MdlQuestionnaireResponseBaseResult> getMultipleResponsesByQuestionnaireFuzzyName(String questionnaireName);

    /**
     * select rate type, 1-5.
     * @param questionnaireName 部分 questionnaire name
     * @return
     */
    List<MdlQuestionnaireResponseRankResult> getRankResponsesByQuestionnaireFuzzyName(String questionnaireName);

    /**
     * get questions' all selection content
     * @param questionnaireName 部分 questionnaire name
     * @return
     */
    List<MdlQuestionnaireQuestionChoice> getQuestionnaireQuestionChoice(String questionnaireName);

    /**
     * get answer for checkbox question, single selection
     * @param questionnaireName 部分 questionnaire name
     * @param courseId course id
     * @return
     */
    List<MdlQuestionnaireAllResponse> getQuestionnaireAllResponse(String questionnaireName, Long courseId);

    List<MdlQuestionnaireAllResponse> getQuestionnaireUserResponse(String questionnaireName, Long courseId, Long userId);

}
