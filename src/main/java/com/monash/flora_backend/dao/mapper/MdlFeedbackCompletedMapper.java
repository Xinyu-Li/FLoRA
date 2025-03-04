package com.monash.flora_backend.dao.mapper;

import com.baomidou.dynamic.datasource.annotation.DS;
import com.monash.flora_backend.dao.entity.MdlFeedbackCompleted;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

/**
 * <p>
 * filled out feedback Mapper 接口
 * </p>
 *
 * @author xinyu
 * @since 2023-09-29
 */
@Mapper
@DS("slave_1")
public interface MdlFeedbackCompletedMapper extends BaseMapper<MdlFeedbackCompleted> {

}
