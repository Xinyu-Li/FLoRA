package com.monash.flora_backend.service_moodle;

import com.monash.flora_backend.controller.vo.MdlQuestionnaireVO;
import com.monash.flora_backend.dao.entity.MdlQuestionnaireResponse;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

/**
 * <p>
 * questionnaire_response table retrofitted from MySQL 服务类
 * </p>
 *
 * @author xinyu
 * @since 2023-09-30
 */
public interface IMdlQuestionnaireResponseService extends IService<MdlQuestionnaireResponse> {
    List<MdlQuestionnaireVO> responseTest();
}
