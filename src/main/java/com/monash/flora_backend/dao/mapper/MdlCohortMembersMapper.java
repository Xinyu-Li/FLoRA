package com.monash.flora_backend.dao.mapper;

import com.baomidou.dynamic.datasource.annotation.DS;
import com.monash.flora_backend.controller.vo.MdlCohortMemberVO;
import com.monash.flora_backend.dao.entity.MdlCohortMembers;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * <p>
 * Link a user to a cohort. Mapper 接口
 * </p>
 *
 * @author xinyu
 * @since 2023-04-18
 */
@Mapper
@DS("slave_1")
public interface MdlCohortMembersMapper extends BaseMapper<MdlCohortMembers> {
    @Select("SELECT mdl_cohort.name, mdl_cohort_members.userid, mdl_user.username FROM mdl_cohort, mdl_cohort_members, mdl_user WHERE mdl_cohort.id = mdl_cohort_members.cohortid AND mdl_user.id = mdl_cohort_members.userid AND mdl_cohort.name = \"flora_unisa_sep_study\"")
    List<MdlCohortMemberVO> findMdlCohortMemberVO();
}
