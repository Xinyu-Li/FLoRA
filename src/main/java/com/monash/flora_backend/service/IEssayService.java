package com.monash.flora_backend.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.monash.flora_backend.controller.vo.EssayVO;
import com.monash.flora_backend.dao.entity.Essay;

import java.io.IOException;
import java.util.List;
import java.util.zip.ZipOutputStream;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author xinyu
 * @since 2022-10-11
 */
public interface IEssayService extends IService<Essay> {
    boolean save(EssayVO essayVO);
//    EssayVO findByUserIdAndUrlAndLatestSaveTime(Long userId, String url);

    boolean saveBatch(List<EssayVO> essayVOList);
    boolean removeByUserId(Long userId);

    EssayVO findLatestVersionByUserIdAndCourseId(Long userId, String courseId);


    void exportEssayToExcelByUserIdListAndCourseIdList(List<Long> userIdList, List<String> courseIdList, ZipOutputStream zos) throws IOException;

    void exportEssayToExcelByUserIdListAndCourseIdList(List<Long> userIdList, List<String> courseIdList, ZipOutputStream zos, int cutRows) throws IOException;
    void exportEssayToExcelByUserIdListAndCourseIdList(List<Long> userIdList, List<String> courseIdList, int cutRows, String token, String dateString) throws IOException;
//    void exportEssayToExcel();

    void exportEssayLogToExcelByUserIdListAndCourseIdList(List<Long> userIdList, List<String> courseIdList, ZipOutputStream zos) throws IOException;
    void exportEssayLogToExcelByUserIdListAndCourseIdList(List<Long> userIdList, List<String> courseIdList, ZipOutputStream zos, int cutRows) throws IOException;
    void exportEssayLogToExcelByUserIdListAndCourseIdList(List<Long> userIdList, List<String> courseIdList, int cutRows, String token, String dateString) throws IOException;

    //    EssayVO findLastEssayByUserIdAndCourseId(Long userId, String courseId);
    boolean checkEssayHasUpdateBetweenTimeRange(Long userId, String courseId, String beginTimestamp, String endTimestamp);

    List<Essay> findLatestVersionEssayByUserIdListCourseIdList(List<Long> userIdList, List<String> courseIdList);

    List<Essay> findEssayLogByUserIdListCourseIdList(List<Long> userIdList, List<String> courseIdList);
}
