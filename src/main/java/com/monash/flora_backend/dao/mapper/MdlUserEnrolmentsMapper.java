package com.monash.flora_backend.dao.mapper;

import com.baomidou.dynamic.datasource.annotation.DS;
import com.monash.flora_backend.dao.entity.MdlUserEnrolments;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

/**
 * <p>
 * Users participating in courses (aka enrolled users) - everyb Mapper 接口
 * </p>
 *
 * @author xinyu
 * @since 2023-09-15
 */
@Mapper
@DS("slave_1")
public interface MdlUserEnrolmentsMapper extends BaseMapper<MdlUserEnrolments> {

}
