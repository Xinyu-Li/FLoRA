package com.monash.flora_backend.service_moodle.impl;

import com.baomidou.dynamic.datasource.annotation.DS;
import com.monash.flora_backend.controller.vo.MdlQuestionnaireVO;
import com.monash.flora_backend.dao.entity.MdlQuestionnaireQuestion;
import com.monash.flora_backend.dao.mapper.MdlQuestionnaireQuestionMapper;
import com.monash.flora_backend.service_moodle.IMdlQuestionnaireQuestionService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * <p>
 * questionnaire_question table retrofitted from MySQL 服务实现类
 * </p>
 *
 * @author xinyu
 * @since 2023-09-29
 */
@Service
@DS("slave_1")
public class MdlQuestionnaireQuestionServiceImpl extends ServiceImpl<MdlQuestionnaireQuestionMapper, MdlQuestionnaireQuestion> implements IMdlQuestionnaireQuestionService {

    @Override
    public List<MdlQuestionnaireVO> questionTest() {
        return getBaseMapper().findMdlQuestionnaireQuestionVO();
    }
}
