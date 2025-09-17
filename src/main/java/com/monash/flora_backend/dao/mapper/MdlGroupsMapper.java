package com.monash.flora_backend.dao.mapper;

import com.baomidou.dynamic.datasource.annotation.DS;
import com.monash.flora_backend.dao.entity.MdlGroups;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

/**
 * <p>
 * Each record represents a group. Mapper 接口
 * </p>
 *
 * @author xinyu
 * @since 2023-10-15
 */
@Mapper
@DS("slave_1")
public interface MdlGroupsMapper extends BaseMapper<MdlGroups> {
    @Select("select a.id, courseid, idnumber, name, description, descriptionformat, enrolmentkey, picture, timecreated, timemodified from moodle.mdl_groups a join moodle.mdl_groups_members b on a.id=b.groupid where b.userid=#{userId} and a.courseid=#{courseId}")
    MdlGroups findByUserIdAndCourseId(String userId, Long courseId);
}
