package com.monash.flora_backend.dao.mapper;

import com.baomidou.dynamic.datasource.annotation.DS;
import com.monash.flora_backend.dao.entity.MdlModules;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

/**
 * <p>
 * modules available in the site Mapper 接口
 * </p>
 *
 * @author xinyu
 * @since 2023-09-15
 */
@Mapper
@DS("slave_1")
public interface MdlModulesMapper extends BaseMapper<MdlModules> {

}
