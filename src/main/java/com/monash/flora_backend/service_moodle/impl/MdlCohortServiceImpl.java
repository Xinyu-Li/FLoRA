package com.monash.flora_backend.service_moodle.impl;

import com.baomidou.dynamic.datasource.annotation.DS;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.monash.flora_backend.dao.entity.MdlCohort;
import com.monash.flora_backend.dao.mapper.MdlCohortMapper;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.monash.flora_backend.service_moodle.IMdlCohortService;
import org.springframework.stereotype.Service;

/**
 * <p>
 * Each record represents one cohort (aka site-wide group). 服务实现类
 * </p>
 *
 * @author xinyu
 * @since 2023-04-18
 */
@Service
@DS("slave_1")
public class MdlCohortServiceImpl extends ServiceImpl<MdlCohortMapper, MdlCohort> implements IMdlCohortService {
    @Override
    public MdlCohort findByCohortIdNumber(String cohortIdNumber) {
        QueryWrapper<MdlCohort> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("idnumber", cohortIdNumber).last("limit 1");
        return super.getOne(queryWrapper);
    }
}
