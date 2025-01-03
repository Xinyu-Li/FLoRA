package com.monash.flora_backend.service_moodle.impl;

import com.baomidou.dynamic.datasource.annotation.DS;
import com.monash.flora_backend.dao.entity.MdlCourseModules;
import com.monash.flora_backend.dao.mapper.MdlCourseModulesMapper;
import com.monash.flora_backend.service_moodle.IMdlCourseModulesService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * course_modules table retrofitted from MySQL 服务实现类
 * </p>
 *
 * @author xinyu
 * @since 2023-09-29
 */
@Service
@DS("slave_1")
public class MdlCourseModulesServiceImpl extends ServiceImpl<MdlCourseModulesMapper, MdlCourseModules> implements IMdlCourseModulesService {

}
