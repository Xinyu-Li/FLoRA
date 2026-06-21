package com.monash.flora_backend.service_moodle;

import com.monash.flora_backend.dao.entity.MdlGroups;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * <p>
 * Each record represents a group. 服务类
 * </p>
 *
 * @author xinyu
 * @since 2023-10-15
 */
public interface IMdlGroupsService extends IService<MdlGroups> {
    MdlGroups findGroupByUserIdAndCourseId(String userId, Long courseId);
}
