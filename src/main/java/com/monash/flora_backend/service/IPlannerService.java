package com.monash.flora_backend.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.monash.flora_backend.controller.vo.PlannerVO;
import com.monash.flora_backend.dao.entity.Planner;

import java.io.IOException;
import java.util.List;
import java.util.zip.ZipOutputStream;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author xinyu
 * @since 2022-10-13
 */
public interface IPlannerService extends IService<Planner> {
    boolean mySave(PlannerVO plannerVO);
    PlannerVO findByUserIdAndCourseIdAndLatestSaveTime(Long userId, String courseId);
    boolean removeByUserId(Long userId);
    PlannerVO findLatestVersionByUserIdAndCourseId(Long userId, String courseId);
    void exportPlannerToExcelByUserIdListAndCourseIdList(List<Long> userIdList, List<String> courseIdList, ZipOutputStream zos) throws IOException;
    void exportPlannerToExcelByUserIdListAndCourseIdList(List<Long> userIdList, List<String> courseIdList, ZipOutputStream zos, int cutRow) throws IOException;
    void exportPlannerToExcelByUserIdListAndCourseIdList(List<Long> userIdList, List<String> courseIdList, int cutRows, String token, String dateString) throws IOException;


//    void exportPlannerToExcel();
}
