package com.monash.flora_backend.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.monash.flora_backend.controller.req.ChatgptRequest;
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
//    UserChatgptLogVO createUserChatgptLog(String result, Long userId, String question, String currentTimestamp, String getGPTResponseTimestamp, String essay, String courseId, String assistantName);
    UserChatgptLogVO createUserChatgptLog(String gptResponseResult, String userQuestion, String prompt, String questionId, String userAskTime, String chatgptResponseTime, String essay, Long userId, String courseId, String chatgptRole, Integer responseGeneratedTimes, String assistantName, Long topicId);

//    String getChatgptResponseWithoutBackgroundRubric(Long userId, String courseId,String instructionForChatgpt);
//    String getChatgptResponse(String question, Long userId, String courseId, String essay, String instructionForChatgpt, String backgroundTextFileName, String rubricText);


    void rateChatgptAnswer(Long userChatgptLogId, Integer responseRatingStar, Integer responseRatingThumb, Long userId, String courseId);
    /**
     * essay can be empty or null
     * @return return prompt_id to frontend, even it is error
     *
     */
//    UserChatgptLogVO getChatgptResponse(String userQuestions, String extraPrompt, String chatgptRoleDescription, String questionId, String essay, List<String> backgroundFileNameList, Long userId, String courseId, String chatgptRole, List<Integer> chatgptParameters, String assistantName, Integer roundNumber, Long topicId, String toolsLanguage);
    UserChatgptLogVO getChatgptResponse(ChatgptRequest chatgptRequest);

    UserChatgptLogVO getScaffoldChatResponse(String userQuestions, String extraPrompt, String questionId, String essay, List<String> backgroundFileNameList, Long userId, String courseId, String chatgptRole, String assistantName, Integer roundNumber, Long topicId, String specialRequirementPrompt, String  toolsLanguage);
    UserChatgptLogVO getChatgptConsultResponse(String userQuestions, String chatgptRoleDescription, String questionId, String essay, List<String> backgroundFileNameList, Long userId, String courseId, String chatgptRole, List<Integer> chatgptParameters, String assistantName, Integer roundNumber, String toolsLanguage);

//    String getChatgptResponseNoLimit(String question, Long userId, String instructionForChatgpt);

    List<UserChatgptLogVO> findAllChatgptLogByUserIdAndCourseId(Long userId, String courseId);
    List<UserChatgptLogVO> findAllChatgptLogByUserIdAndCourseId(Long userId, String courseId, String chatgptRole, String chatgptNotRole);

    // find chatgotlog by userId and courseId and assistantName and roundNumber
    List<UserChatgptLogVO> findAllChatgptLogByUserIdAndCourseIdAndTypeAndRoundNumber(Long userId, String courseId, String assistantName, Integer roundNumber);

    @Deprecated
    Map<String, Integer> getCopesClassifySentence(String essay, List<String> backgroundTextFileNameList, Long userId, String courseId, String taskStartTime, Integer beginMinute, Integer endMinute);
//    List<String> getWritingSentenceClassification(String writeSentence);
    List<List<String>> batchWritingSentenceClassification(List<String> writeSentenceList);
    void exportChatgptLogToExcelByUserIdListAndCourseIdList(List<Long> userIdList, List<String> courseIdList, ZipOutputStream zos) throws IOException;
    void exportChatgptLogToExcelByUserIdListAndCourseIdList(List<Long> userIdList, List<String> courseIdList, ZipOutputStream zos, int cutRow) throws IOException;
    void exportChatgptLogToExcelByUserIdListAndCourseIdList(List<Long> userIdList, List<String> courseIdList, int cutRows, String token, String dateString) throws IOException;

    UserChatgptLogVO saveRuleBaseMessage(String userQuestions, String chatgptRoleDescription, String questionId, String essay, List<String> backgroundFileNameList, Long userId, String courseId, List<Integer> chatgptParameters, String agentName);
    void updateHidden(Long userId,String timestampClicked);
    String getBotTs(Long userId, String timestamp);
}
