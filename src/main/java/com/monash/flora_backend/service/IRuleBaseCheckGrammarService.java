package com.monash.flora_backend.service;


import cn.hutool.json.JSONObject;
import com.baomidou.mybatisplus.extension.service.IService;
import com.monash.flora_backend.controller.vo.GrammarErrorVO;
import com.monash.flora_backend.dao.entity.RuleBaseCheckGrammar;

import java.io.IOException;
import java.util.List;
import java.util.zip.ZipOutputStream;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author xinyu
 * @since 2023-05-05
 */
public interface IRuleBaseCheckGrammarService extends IService<RuleBaseCheckGrammar> {
    String getCheckGrammarResponse(String essay);
//    String getCheckGrammarResponse(String essay);

    List<GrammarErrorVO> createCheckGrammarLog(JSONObject jsonObject, Long userId, String essay, String currentTimestamp, String courseId);

    List<GrammarErrorVO> getLatestCheckGrammarFromDB(Long userId, String courseId);

    int getGrammarErrorCount(String result);

    void exportCheckGrammarToExcelByUserIdListAndCourseIdList(List<Long> userIdList, List<String> courseIdList, ZipOutputStream zos) throws IOException;
    void exportCheckGrammarToExcelByUserIdListAndCourseIdList(List<Long> userIdList, List<String> courseIdList, ZipOutputStream zos, int cutRow) throws IOException;
    void exportCheckGrammarToExcelByUserIdListAndCourseIdList(List<Long> userIdList, List<String> courseIdList, int cutRows, String token, String dateString) throws IOException;
}
