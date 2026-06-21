package com.monash.flora_backend.service_moodle.impl;

import com.baomidou.dynamic.datasource.annotation.DS;
import com.monash.flora_backend.controller.vo.MdlSurveyAnswersVO;
import com.monash.flora_backend.dao.entity.MdlSurveyAnswers;
import com.monash.flora_backend.dao.mapper.MdlSurveyAnswersMapper;
import com.monash.flora_backend.service_moodle.IMdlSurveyAnswersService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * <p>
 * the answers to each questions filled by the users 服务实现类
 * </p>
 *
 * @author xinyu
 * @since 2023-09-30
 */
@Service
@DS("slave_1")
public class MdlSurveyAnswersServiceImpl extends ServiceImpl<MdlSurveyAnswersMapper, MdlSurveyAnswers> implements IMdlSurveyAnswersService {

    @Override
    public List<MdlSurveyAnswersVO> surveyTest() {
        return getBaseMapper().findMdlSurveyAnswersVO();
    }
}
