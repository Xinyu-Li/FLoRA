package com.monash.flora_backend.dao.mapper;

import com.baomidou.dynamic.datasource.annotation.DS;
import com.monash.flora_backend.dao.entity.MdlGroupsMembers;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

/**
 * <p>
 * Link a user to a group. Mapper 接口
 * </p>
 *
 * @author xinyu
 * @since 2023-10-15
 */
@Mapper
@DS("slave_1")
public interface MdlGroupsMembersMapper extends BaseMapper<MdlGroupsMembers> {

}
