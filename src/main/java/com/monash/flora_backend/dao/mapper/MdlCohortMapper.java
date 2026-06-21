package com.monash.flora_backend.dao.mapper;

import com.baomidou.dynamic.datasource.annotation.DS;
import com.monash.flora_backend.dao.entity.MdlCohort;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

/**
 * <p>
 * Each record represents one cohort (aka site-wide group). Mapper 接口
 * </p>
 *
 * @author xinyu
 * @since 2023-04-18
 */
@Mapper
@DS("slave_1")
public interface MdlCohortMapper extends BaseMapper<MdlCohort> {

}
