package com.monash.flora_backend.dao.mapper;

import com.baomidou.dynamic.datasource.annotation.DS;
import com.monash.flora_backend.dao.entity.MdlQuestionAttempts;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

/**
 * <p>
 * Each row here corresponds to an attempt at one question, as  Mapper 接口
 * </p>
 *
 * @author xinyu
 * @since 2023-10-26
 */
@Mapper
@DS("slave_1")
public interface MdlQuestionAttemptsMapper extends BaseMapper<MdlQuestionAttempts> {

}
