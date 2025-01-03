package com.monash.flora_backend.service_moodle.impl;

import com.baomidou.dynamic.datasource.annotation.DS;
import com.monash.flora_backend.dao.entity.MdlSurveyQuestions;
import com.monash.flora_backend.dao.mapper.MdlSurveyQuestionsMapper;
import com.monash.flora_backend.service_moodle.IMdlSurveyQuestionsService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * the questions conforming one survey 服务实现类
 * </p>
 *
 * @author xinyu
 * @since 2023-09-30
 */
@Service
@DS("slave_1")
public class MdlSurveyQuestionsServiceImpl extends ServiceImpl<MdlSurveyQuestionsMapper, MdlSurveyQuestions> implements IMdlSurveyQuestionsService {

}
