package com.monash.flora_backend.dao.mapper;

import com.baomidou.dynamic.datasource.annotation.DS;
import com.monash.flora_backend.dao.entity.MdlSurveyQuestions;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

/**
 * <p>
 * the questions conforming one survey Mapper 接口
 * </p>
 *
 * @author xinyu
 * @since 2023-09-30
 */
@Mapper
@DS("slave_1")
public interface MdlSurveyQuestionsMapper extends BaseMapper<MdlSurveyQuestions> {

}
