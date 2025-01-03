package com.monash.flora_backend.service_moodle.impl;

import com.baomidou.dynamic.datasource.annotation.DS;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.monash.flora_backend.dao.entity.MdlGroups;
import com.monash.flora_backend.dao.mapper.MdlGroupsMapper;
import com.monash.flora_backend.service_moodle.IMdlGroupsService;
import org.springframework.stereotype.Service;

/**
 * <p>
 * Each record represents a group. 服务实现类
 * </p>
 *
 * demo 数据
 * insert into moodle.mdl_groups (id, courseid, idnumber, name, description, descriptionformat, enrolmentkey, picture, timecreated, timemodified)
 * values  (3, 2, 'test-group1', 'test-group1', '', 1, '', 0, 1697357331, 1697357331),
 *         (4, 2, 'test-group2', 'test-group2', '', 1, '', 0, 1697357342, 1697357381);
 *
 * insert into moodle.mdl_groups_members (id, groupid, userid, timeadded, component, itemid)
 * values  (1, 4, 2, 1697357350, '', 0),
 *         (2, 4, 111, 1697357381, '', 0);
 *
 * @author xinyu
 * @since 2023-10-15
 */
@Service
@DS("slave_1")
public class MdlGroupsServiceImpl extends ServiceImpl<MdlGroupsMapper, MdlGroups> implements IMdlGroupsService {

    @Override
    public MdlGroups findGroupByUserIdAndCourseId(String userId, Long courseId) {
        return getBaseMapper().findByUserIdAndCourseId(userId, courseId);
    }
}


