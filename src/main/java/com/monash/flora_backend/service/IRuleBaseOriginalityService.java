package com.monash.flora_backend.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.monash.flora_backend.controller.vo.RuleBaseOriginalityVO;
import com.monash.flora_backend.dao.entity.RuleBaseOriginality;

import java.io.IOException;
import java.util.List;
import java.util.zip.ZipOutputStream;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author xinyu
 * @since 2023-05-22
 */
public interface IRuleBaseOriginalityService extends IService<RuleBaseOriginality> {
    String getOriginalityResponse(String essay);
    RuleBaseOriginalityVO getOriginalityResponse(String essay, Long userId, String checkTime, String courseId);
    RuleBaseOriginalityVO getLatestOriginalityFromDB(Long userId, String courseId);
    int getOriginalityCount(String result);
    void exportOriginalityToExcelByUserIdListAndCourseIdList(List<Long> userIdList, List<String> courseIdList, ZipOutputStream zos) throws IOException;
    void exportOriginalityToExcelByUserIdListAndCourseIdList(List<Long> userIdList, List<String> courseIdList, ZipOutputStream zos, int cutRow) throws IOException;
    void exportOriginalityToExcelByUserIdListAndCourseIdList(List<Long> userIdList, List<String> courseIdList, int cutRows, String token, String dateString) throws IOException;
}
