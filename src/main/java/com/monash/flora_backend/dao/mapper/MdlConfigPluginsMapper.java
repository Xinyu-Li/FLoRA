package com.monash.flora_backend.dao.mapper;

import com.baomidou.dynamic.datasource.annotation.DS;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.monash.flora_backend.dao.entity.MdlConfigPlugins;
import org.apache.ibatis.annotations.Mapper;

/**
 * ClassName: MdlConfigPluginsMapper
 * Description:
 *
 * @author Xinyu Li
 * @since 12/31/2022 12:55 PM
 */
@Mapper
@DS("slave_1")
public interface MdlConfigPluginsMapper extends BaseMapper<MdlConfigPlugins> {
}
