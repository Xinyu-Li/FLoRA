package com.monash.flora_backend.service_moodle.impl;

import com.baomidou.dynamic.datasource.annotation.DS;
import com.monash.flora_backend.dao.entity.MdlGroupsMembers;
import com.monash.flora_backend.dao.mapper.MdlGroupsMembersMapper;
import com.monash.flora_backend.service_moodle.IMdlGroupsMembersService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * Link a user to a group. 服务实现类
 * </p>
 *
 * @author xinyu
 * @since 2023-10-15
 */
@Service
@DS("slave_1")
public class MdlGroupsMembersServiceImpl extends ServiceImpl<MdlGroupsMembersMapper, MdlGroupsMembers> implements IMdlGroupsMembersService {

}
