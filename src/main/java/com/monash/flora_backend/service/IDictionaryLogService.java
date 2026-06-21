package com.monash.flora_backend.service;


import com.baomidou.mybatisplus.extension.service.IService;
import com.monash.flora_backend.controller.vo.DictionaryLogVO;
import com.monash.flora_backend.dao.entity.DictionaryLog;

import java.io.IOException;
import java.util.List;
import java.util.zip.ZipOutputStream;


public interface IDictionaryLogService extends IService<DictionaryLog> {

//    void translateText(String projectId, String targetLanguage, String text);
    String translateText(String targetLanguage, List<String> keywords, String apiKey, Long userId, String courseId);

    List<DictionaryLogVO> findAllDictionaryLogByUserId(Long userId, String courseId);

    void exportDictionaryToExcelByUserIdListAndCourseIdList(List<Long> userIdList, List<String> courseIdList, ZipOutputStream zos) throws IOException;
    void exportDictionaryToExcelByUserIdListAndCourseIdList(List<Long> userIdList, List<String> courseIdList, ZipOutputStream zos, int cutRow) throws IOException;
    void exportDictionaryToExcelByUserIdListAndCourseIdList(List<Long> userIdList, List<String> courseIdList, int cutRows, String token, String dateString) throws IOException;
}


