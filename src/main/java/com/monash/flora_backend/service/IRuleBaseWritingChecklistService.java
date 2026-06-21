package com.monash.flora_backend.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.monash.flora_backend.controller.vo.RuleBaseWritingChecklistVO;
import com.monash.flora_backend.dao.entity.RuleBaseWritingChecklist;

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
public interface IRuleBaseWritingChecklistService extends IService<RuleBaseWritingChecklist> {
    String getWritingChecklistResponse(String essay);
    RuleBaseWritingChecklistVO getWritingChecklistResponse(String essay, Long userId, String checkTime, String courseId);
    RuleBaseWritingChecklistVO getLatestWritingChecklistFromDB(Long userId, String courseId);
    int getWritingErrorCount(String result);
    void exportWritingCheckToExcelByUserIdListAndCourseIdList(List<Long> userIdList, List<String> courseIdList, ZipOutputStream zos) throws IOException;
    void exportWritingCheckToExcelByUserIdListAndCourseIdList(List<Long> userIdList, List<String> courseIdList, ZipOutputStream zos, int cutRow) throws IOException;
    void exportWritingCheckToExcelByUserIdListAndCourseIdList(List<Long> userIdList, List<String> courseIdList, int cutRows, String token, String dateString) throws IOException;
}
