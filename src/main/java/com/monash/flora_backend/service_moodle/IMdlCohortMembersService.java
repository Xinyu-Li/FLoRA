package com.monash.flora_backend.service_moodle;

import com.monash.flora_backend.controller.vo.MdlCohortMemberVO;
import com.monash.flora_backend.dao.entity.MdlCohortMembers;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

/**
 * <p>
 * Link a user to a cohort. 服务类
 * </p>
 *
 * @author xinyu
 * @since 2023-04-18
 */
public interface IMdlCohortMembersService extends IService<MdlCohortMembers> {
    List<MdlCohortMembers> findMembersByCohortIdNumber(List<String> cohortIdNumberList);
    List<MdlCohortMemberVO> cohortMembersTest();
}
