package com.monash.flora_backend.service_moodle.impl;

import com.baomidou.dynamic.datasource.annotation.DS;
import com.monash.flora_backend.controller.vo.MdlQuestionnaireVO;
import com.monash.flora_backend.dao.entity.MdlQuestionnaireResponse;
import com.monash.flora_backend.dao.mapper.MdlQuestionnaireResponseMapper;
import com.monash.flora_backend.service_moodle.IMdlQuestionnaireResponseService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * <p>
 * questionnaire_response table retrofitted from MySQL 服务实现类
 * </p>
 *
 * @author xinyu
 * @since 2023-09-30
 */
@Service
@DS("slave_1")
public class MdlQuestionnaireResponseServiceImpl extends ServiceImpl<MdlQuestionnaireResponseMapper, MdlQuestionnaireResponse> implements IMdlQuestionnaireResponseService {

    @Override
    public List<MdlQuestionnaireVO> responseTest() {
        return getBaseMapper().findMdlQuestionnaireResponseVO();
    }
}
