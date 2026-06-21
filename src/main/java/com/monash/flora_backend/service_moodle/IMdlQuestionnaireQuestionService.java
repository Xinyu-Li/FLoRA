package com.monash.flora_backend.service_moodle;

import com.monash.flora_backend.controller.vo.MdlQuestionnaireVO;
import com.monash.flora_backend.dao.entity.MdlQuestionnaireQuestion;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

/**
 * <p>
 * questionnaire_question table retrofitted from MySQL 服务类
 * </p>
 *
 * @author xinyu
 * @since 2023-09-29
 */
public interface IMdlQuestionnaireQuestionService extends IService<MdlQuestionnaireQuestion> {
    List<MdlQuestionnaireVO> questionTest();
}
