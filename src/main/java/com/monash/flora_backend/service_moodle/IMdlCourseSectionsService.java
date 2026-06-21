package com.monash.flora_backend.service_moodle;

import com.baomidou.mybatisplus.extension.service.IService;
import com.monash.flora_backend.dao.entity.MdlCourseSections;

/**
 * <p>
 * to define the sections for each course 服务类
 * </p>
 *
 * @author xinyu
 * @since 2023-09-20
 */
public interface IMdlCourseSectionsService extends IService<MdlCourseSections> {
    String findAllPageIdByCourseId(Long courseId);
}
