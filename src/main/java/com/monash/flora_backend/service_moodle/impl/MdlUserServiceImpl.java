package com.monash.flora_backend.service_moodle.impl;

import com.baomidou.dynamic.datasource.annotation.DS;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.monash.flora_backend.controller.vo.MdlUserEnrolCourseIdVO;
import com.monash.flora_backend.controller.vo.MdlUserVO;
import com.monash.flora_backend.dao.entity.MdlCohortMembers;
import com.monash.flora_backend.dao.entity.MdlEnrol;
import com.monash.flora_backend.dao.entity.MdlUser;
import com.monash.flora_backend.dao.entity.MdlUserEnrolments;
import com.monash.flora_backend.dao.mapper.MdlUserMapper;
import com.monash.flora_backend.service_moodle.IMdlCohortMembersService;
import com.monash.flora_backend.service_moodle.IMdlEnrolService;
import com.monash.flora_backend.service_moodle.IMdlUserEnrolmentsService;
import com.monash.flora_backend.service_moodle.IMdlUserService;
import com.monash.flora_backend.util.MyBeanCopyUtils;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * <p>
 * One record for each person 服务实现类
 * </p>
 *
 * @author xinyu
 * @since 2023-04-18
 */
@Slf4j
@Service
@AllArgsConstructor
@DS("slave_1")
public class MdlUserServiceImpl extends ServiceImpl<MdlUserMapper, MdlUser> implements IMdlUserService {
    private IMdlCohortMembersService iMdlCohortMembersService;
    private IMdlEnrolService iMdlEnrolService;
    private IMdlUserEnrolmentsService iMdlUserEnrolmentsService;




    @Override
    public List<MdlUserVO> findAllByCohortIdNumber(List<String> cohortIdNumberList) {
        List<MdlCohortMembers> mdlCohortMembersList = iMdlCohortMembersService.findMembersByCohortIdNumber(cohortIdNumberList);
        log.info("mdlCohortMembersList:" + mdlCohortMembersList.size());
        List<Long> userIdList = mdlCohortMembersList.stream().map(MdlCohortMembers::getUserid).collect(Collectors.toList());
        log.info("userIdList:" + userIdList.size());
        if (userIdList.isEmpty()) {
            return new ArrayList<>();
        } else {
            return MyBeanCopyUtils.copyBeanList(new ArrayList<>(super.listByIds(userIdList)), MdlUserVO.class);
        }
    }

    @Override
    public List<MdlUserVO> findAllUserByCourseId(String courseId) {
        QueryWrapper<MdlEnrol> mdlEnrolQueryWrapper = new QueryWrapper<>();
        mdlEnrolQueryWrapper.select("id, courseid").eq("courseid", courseId);
        List<MdlEnrol> mdlEnrolList = iMdlEnrolService.list(mdlEnrolQueryWrapper);
        if (mdlEnrolList.isEmpty()) {
            log.info("enrol list is empty");
            return new ArrayList<>();
        }
        List<Long> enrolIdList = mdlEnrolList.stream().map(MdlEnrol::getId).collect(Collectors.toList());
//        mdlEnrolList.forEach(mdlEnrol -> {
//            enrolIdList.add(mdlEnrol.getId());
//        });

        QueryWrapper<MdlUserEnrolments> mdlUserEnrolmentsQueryWrapper = new QueryWrapper<>();
        mdlUserEnrolmentsQueryWrapper.select("enrolid, userid").in("enrolid", enrolIdList);
        List<MdlUserEnrolments> mdlUserEnrolmentsList = iMdlUserEnrolmentsService.list(mdlUserEnrolmentsQueryWrapper);
        if (mdlUserEnrolmentsList.isEmpty()) {
            log.info("enrolment list is empty");
            return new ArrayList<>();
        }
//        List<Long> userIdList = new ArrayList<>();
//        mdlUserEnrolmentsList.forEach(mdlUserEnrolments -> {
//            userIdList.add(mdlUserEnrolments.getUserid());
//        });
        List<Long> userIdList = mdlUserEnrolmentsList.stream().map(MdlUserEnrolments::getUserid).collect(Collectors.toList());

        List<MdlUser> mdlUsers = new ArrayList<>(this.listByIds(userIdList));

        return MyBeanCopyUtils.copyBeanList(mdlUsers, MdlUserVO.class);
    }

    @Override
    public List<MdlUserEnrolCourseIdVO> findAllUserEnrolCourse() {
        return getBaseMapper().findAllUserEnrolCourse();
    }

    @Override
    public MdlUserVO findUserById(Long userId) {
        QueryWrapper<MdlUser> wrapper = new QueryWrapper<>();
        if(userId != 0) {
            wrapper.eq("id", userId).last("limit 1");
        }
        MdlUser user = super.getOne(wrapper);
        return user == null ? null : MyBeanCopyUtils.copyBean(user, MdlUserVO.class);
    }
}
