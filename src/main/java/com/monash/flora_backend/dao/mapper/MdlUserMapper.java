package com.monash.flora_backend.dao.mapper;

import com.baomidou.dynamic.datasource.annotation.DS;
import com.monash.flora_backend.controller.vo.MdlUserEnrolCourseIdVO;
import com.monash.flora_backend.dao.entity.MdlUser;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * <p>
 * One record for each person Mapper 接口
 * </p>
 *
 * @author xinyu
 * @since 2023-04-18
 */
@Mapper
@DS("slave_1")
public interface MdlUserMapper extends BaseMapper<MdlUser> {
    @Select("select a.id as id, username, email, a.timecreated as timecreated, courseid from moodle.mdl_user a join moodle.mdl_user_enrolments b join moodle.mdl_enrol c on a.id=b.userid and b.enrolid=c.id")
    List<MdlUserEnrolCourseIdVO> findAllUserEnrolCourse();
}
