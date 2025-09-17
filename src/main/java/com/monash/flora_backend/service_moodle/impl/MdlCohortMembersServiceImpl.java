package com.monash.flora_backend.service_moodle.impl;

import com.baomidou.dynamic.datasource.annotation.DS;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.monash.flora_backend.controller.vo.MdlCohortMemberVO;
import com.monash.flora_backend.dao.entity.MdlCohort;
import com.monash.flora_backend.dao.entity.MdlCohortMembers;
import com.monash.flora_backend.dao.mapper.MdlCohortMembersMapper;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.monash.flora_backend.service_moodle.IMdlCohortMembersService;
import com.monash.flora_backend.service_moodle.IMdlCohortService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * <p>
 * Link a user to a cohort. 服务实现类
 * </p>
 *
 * @author xinyu
 * @since 2023-04-18
 */
@Service
@Slf4j
@AllArgsConstructor
@DS("slave_1")
public class MdlCohortMembersServiceImpl extends ServiceImpl<MdlCohortMembersMapper, MdlCohortMembers> implements IMdlCohortMembersService {
    private IMdlCohortService iMdlCohortService;
    @Override
    public List<MdlCohortMembers> findMembersByCohortIdNumber(List<String> cohortIdNumberList) {
        List<MdlCohortMembers> mdlCohortMembersList = new ArrayList<>();
        for (String cohortIdNumber : cohortIdNumberList) {
            MdlCohort mdlCohort = iMdlCohortService.findByCohortIdNumber(cohortIdNumber);
            if (mdlCohort == null) {
                log.info("cohortIdNumber :" + cohortIdNumber + "__cannot found");
                continue;
            }
            QueryWrapper<MdlCohortMembers> queryWrapper = new QueryWrapper<>();
            queryWrapper.eq("cohortid", mdlCohort.getId());
            mdlCohortMembersList.addAll(super.list(queryWrapper));
        }
        return mdlCohortMembersList;
    }

    @Override
    public List<MdlCohortMemberVO> cohortMembersTest() {
        return getBaseMapper().findMdlCohortMemberVO();
    }
}
