package com.monash.flora_backend.service_moodle.impl;

import com.baomidou.dynamic.datasource.annotation.DS;
import com.monash.flora_backend.dao.entity.MdlEnrol;
import com.monash.flora_backend.dao.mapper.MdlEnrolMapper;
import com.monash.flora_backend.service_moodle.IMdlEnrolService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * Instances of enrolment plugins used in courses, fields marke 服务实现类
 * </p>
 *
 * @author xinyu
 * @since 2023-09-15
 */
@Service
@DS("slave_1")
public class MdlEnrolServiceImpl extends ServiceImpl<MdlEnrolMapper, MdlEnrol> implements IMdlEnrolService {

}
