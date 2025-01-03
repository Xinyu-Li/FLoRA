package com.monash.flora_backend.dao.mapper;

import com.baomidou.dynamic.datasource.annotation.DS;
import com.monash.flora_backend.dao.entity.MdlCourseSections;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

/**
 * <p>
 * to define the sections for each course Mapper 接口
 * </p>
 *
 * @author xinyu
 * @since 2023-09-20
 */
@Mapper
@DS("slave_1")
public interface MdlCourseSectionsMapper extends BaseMapper<MdlCourseSections> {

}
