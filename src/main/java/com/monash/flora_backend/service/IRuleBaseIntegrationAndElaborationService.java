package com.monash.flora_backend.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.monash.flora_backend.controller.vo.RuleBaseIntegrationAndElaborationVO;
import com.monash.flora_backend.dao.entity.RuleBaseIntegrationAndElaboration;

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
public interface IRuleBaseIntegrationAndElaborationService extends IService<RuleBaseIntegrationAndElaboration> {
    RuleBaseIntegrationAndElaborationVO getIntegrationAndElaborationResponse(String essay, Long userId, String checkTime, String courseId);
    RuleBaseIntegrationAndElaborationVO getLatestIntegrationAndElaborationFromDB(Long userId, String courseId);
    void exportIntegrationAndElaborationToExcelByUserIdListAndCourseIdList(List<Long> userIdList, List<String> courseIdList, ZipOutputStream zos) throws IOException;
    void exportIntegrationAndElaborationToExcelByUserIdListAndCourseIdList(List<Long> userIdList, List<String> courseIdList, ZipOutputStream zos, int cutRow) throws IOException;
    void exportIntegrationAndElaborationToExcelByUserIdListAndCourseIdList(List<Long> userIdList, List<String> courseIdList, int cutRows, String token, String dateString) throws IOException;
}
