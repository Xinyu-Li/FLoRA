package com.monash.flora_backend.dao.mapper;

import com.baomidou.dynamic.datasource.annotation.DS;
import com.monash.flora_backend.dao.entity.MdlCourse;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

/**
 * <p>
 * Central course table Mapper 接口
 * </p>
 *
 * @author xinyu
 * @since 2023-09-12
 */
@Mapper
@DS("slave_1")
public interface MdlCourseMapper extends BaseMapper<MdlCourse> {

}
