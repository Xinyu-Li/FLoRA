package com.monash.flora_backend.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.monash.flora_backend.controller.vo.UserChatgptLogVO;
import com.monash.flora_backend.dao.entity.UserChatgptLog;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.zip.ZipOutputStream;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author xinyu
 * @since 2023-03-06
 */
public interface IUserChatgptLogService extends IService<UserChatgptLog> {
    boolean removeByUserId(Long userId);
//    UserChatgptLogVO createUserChatgptLog(String result, Long userId, String question, String currentTimestamp, String getGPTResponseTimestamp, String essay, String courseId, String type);
    UserChatgptLogVO createUserChatgptLog(String gptResponseResult, String userQuestion, String prompt, String questionId, String userAskTime, String chatgptResponseTime, String essay, Long userId, String courseId, String chatgptRole, Integer responseGeneratedTimes, String type);

//    String getChatgptResponseWithoutBackgroundRubric(Long userId, String courseId,String instructionForChatgpt);
//    String getChatgptResponse(String question, Long userId, String courseId, String essay, String instructionForChatgpt, String backgroundTextFileName, String rubricText);


    void rateChatgptAnswer(Long userChatgptLogId, Integer responseRatingStar, Integer responseRatingThumb, Long userId, String courseId);
    /**
     * essay can be empty or null
     * @return return prompt_id to frontend, even it is error
     *
     */
    UserChatgptLogVO getChatgptResponse(String userQuestions, String extraPrompt, String chatgptRoleDescription, String questionId, String essay, List<String> backgroundFileNameList, Long userId, String courseId, String chatgptRole, List<Integer> chatgptParameters, String type, Integer roundNumber);
    UserChatgptLogVO getChatgptConsultResponse(String userQuestions, String chatgptRoleDescription, String questionId, String essay, List<String> backgroundFileNameList, Long userId, String courseId, String chatgptRole, List<Integer> chatgptParameters, String type, Integer roundNumber);

//    String getChatgptResponseNoLimit(String question, Long userId, String instructionForChatgpt);

    List<UserChatgptLogVO> findAllChatgptLogByUserIdAndCourseId(Long userId, String courseId);

    // find chatgotlog by userId and courseId and type and roundNumber
    List<UserChatgptLogVO> findAllChatgptLogByUserIdAndCourseIdAndTypeAndRoundNumber(Long userId, String courseId, String type, Integer roundNumber);

    Map<String, Integer> getCopesClassifySentence(String essay, List<String> backgroundTextFileNameList, Long userId, String courseId, String taskStartTime, Integer beginMinute, Integer endMinute);

    void exportChatgptLogToExcelByUserIdListAndCourseIdList(List<Long> userIdList, List<String> courseIdList, ZipOutputStream zos) throws IOException;
    void exportChatgptLogToExcelByUserIdListAndCourseIdList(List<Long> userIdList, List<String> courseIdList, ZipOutputStream zos, int cutRow) throws IOException;
    void exportChatgptLogToExcelByUserIdListAndCourseIdList(List<Long> userIdList, List<String> courseIdList, int cutRows, String token, String dateString) throws IOException;

    UserChatgptLogVO saveRuleBaseMessage(String userQuestions, String chatgptRoleDescription, String questionId, String essay, List<String> backgroundFileNameList, Long userId, String courseId, List<Integer> chatgptParameters, String agentName);
}
