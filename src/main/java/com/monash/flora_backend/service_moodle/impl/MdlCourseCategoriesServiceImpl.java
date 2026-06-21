package com.monash.flora_backend.service_moodle.impl;

import com.baomidou.dynamic.datasource.annotation.DS;
import com.monash.flora_backend.dao.entity.MdlCourseCategories;
import com.monash.flora_backend.dao.mapper.MdlCourseCategoriesMapper;
import com.monash.flora_backend.service_moodle.IMdlCourseCategoriesService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * Course categories 服务实现类
 * </p>
 *
 * @author xinyu
 * @since 2023-09-12
 */
@Service
@DS("slave_1")
public class MdlCourseCategoriesServiceImpl extends ServiceImpl<MdlCourseCategoriesMapper, MdlCourseCategories> implements IMdlCourseCategoriesService {

}
