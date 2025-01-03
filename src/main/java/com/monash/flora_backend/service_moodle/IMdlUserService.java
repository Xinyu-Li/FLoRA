package com.monash.flora_backend.service_moodle;

import com.baomidou.mybatisplus.extension.service.IService;
import com.monash.flora_backend.controller.vo.MdlUserEnrolCourseIdVO;
import com.monash.flora_backend.controller.vo.MdlUserVO;
import com.monash.flora_backend.dao.entity.MdlUser;

import java.util.List;

/**
 * <p>
 * One record for each person 服务类
 * </p>
 *
 * @author xinyu
 * @since 2023-04-18
 */
public interface IMdlUserService extends IService<MdlUser> {
    List<MdlUserVO> findAllByCohortIdNumber(List<String> cohortIdNumber);
    List<MdlUserVO> findAllUserByCourseId(String courseId);

    List<MdlUserEnrolCourseIdVO> findAllUserEnrolCourse();

    MdlUserVO findUserById(Long userId);
}
