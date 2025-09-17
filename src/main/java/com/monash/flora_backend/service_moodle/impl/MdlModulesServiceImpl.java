package com.monash.flora_backend.service_moodle.impl;

import com.baomidou.dynamic.datasource.annotation.DS;
import com.monash.flora_backend.dao.entity.MdlModules;
import com.monash.flora_backend.dao.mapper.MdlModulesMapper;
import com.monash.flora_backend.service_moodle.IMdlModulesService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * modules available in the site 服务实现类
 * </p>
 *
 * @author xinyu
 * @since 2023-09-15
 */
@Service
@DS("slave_1")
public class MdlModulesServiceImpl extends ServiceImpl<MdlModulesMapper, MdlModules> implements IMdlModulesService {

}
