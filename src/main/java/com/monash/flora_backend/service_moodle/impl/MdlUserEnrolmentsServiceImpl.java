package com.monash.flora_backend.service_moodle.impl;

import com.baomidou.dynamic.datasource.annotation.DS;
import com.monash.flora_backend.dao.entity.MdlUserEnrolments;
import com.monash.flora_backend.dao.mapper.MdlUserEnrolmentsMapper;
import com.monash.flora_backend.service_moodle.IMdlUserEnrolmentsService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * Users participating in courses (aka enrolled users) - everyb 服务实现类
 * </p>
 *
 * @author xinyu
 * @since 2023-09-15
 */
@Service
@DS("slave_1")
public class MdlUserEnrolmentsServiceImpl extends ServiceImpl<MdlUserEnrolmentsMapper, MdlUserEnrolments> implements IMdlUserEnrolmentsService {

}
