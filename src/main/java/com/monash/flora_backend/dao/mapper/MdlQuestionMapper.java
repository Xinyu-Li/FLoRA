package com.monash.flora_backend.dao.mapper;

import com.baomidou.dynamic.datasource.annotation.DS;
import com.monash.flora_backend.dao.entity.MdlQuestion;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

/**
 * <p>
 * This table stores the definition of one version of a questio Mapper 接口
 * </p>
 *
 * @author xinyu
 * @since 2023-10-26
 */
@Mapper
@DS("slave_1")
public interface MdlQuestionMapper extends BaseMapper<MdlQuestion> {

}
