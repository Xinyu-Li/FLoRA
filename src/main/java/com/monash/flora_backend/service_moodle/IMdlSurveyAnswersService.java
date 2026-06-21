package com.monash.flora_backend.service_moodle;

import com.monash.flora_backend.controller.vo.MdlSurveyAnswersVO;
import com.monash.flora_backend.dao.entity.MdlSurveyAnswers;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

/**
 * <p>
 * the answers to each questions filled by the users 服务类
 * </p>
 *
 * @author xinyu
 * @since 2023-09-30
 */
public interface IMdlSurveyAnswersService extends IService<MdlSurveyAnswers> {
    List<MdlSurveyAnswersVO> surveyTest();
}
