package com.monash.flora_backend.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.monash.flora_backend.controller.vo.ScaffoldVO;
import com.monash.flora_backend.dao.entity.Scaffold;

import java.io.IOException;
import java.util.List;
import java.util.zip.ZipOutputStream;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author xinyu
 * @since 2023-02-19
 */
public interface IScaffoldService extends IService<Scaffold> {
    boolean saveScaffold(ScaffoldVO scaffoldVO);
    String findByUserIdAndUrlAndLatestSaveTime(Long userId, String courseId);

    void checkProcessLabelPatterns(Long userId, Integer currentMinute, String courseId, String modelType);
    boolean removeByUserId(Long userId);

//    Set<String> manuallyLabelProcessLabelPatterns(Long userId, String courseId, String modelType);
    void exportRuleBasedScaffoldToExcelByUserIdListAndCourseIdList(List<Long> userIdList, List<String> courseIdList, ZipOutputStream zos) throws IOException;
}
