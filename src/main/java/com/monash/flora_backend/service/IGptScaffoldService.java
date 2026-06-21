package com.monash.flora_backend.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.monash.flora_backend.controller.req.GptScaffoldRequest;
import com.monash.flora_backend.controller.vo.GptScaffoldVO;
import com.monash.flora_backend.dao.entity.GptScaffold;

import java.io.IOException;
import java.util.List;
import java.util.zip.ZipOutputStream;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author xinyu
 * @since 2024-01-15
 */
public interface IGptScaffoldService extends IService<GptScaffold> {
    List<GptScaffoldVO> findAllGptScaffoldByUserIdAndCourseId(Long userId, String courseId);
    List<GptScaffoldVO> findAllGptScaffoldAndChatByUserIdAndCourseId(Long userId, String courseId);
    void rateGptScaffold(Long gptScaffoldId, Integer responseRatingStar, Integer responseRatingThumb, Long userId, String courseId);
    GptScaffoldVO createGptScaffold(String prompt, String essay, String gptResponseResult, String promptSendTime, String gptResponseTime,
                                    String gptScaffoldRole, String gptScaffoldRoleDescription, Integer gptScaffoldNumber, Long userId, String courseId, String assistantName);
    GptScaffoldVO getGptScaffoldResponse(String prompt, String essay, List<String> backgroundFileNameList, String gptScaffoldRole, String gptScaffoldRoleDescription, Integer gptScaffoldNumber, Long userId, String courseId, List<Integer> gptScaffoldParameters);
    GptScaffoldVO getGptScaffoldResponse(String prompt, String agentName, String essay, List<String> backgroundFileNameList, String gptScaffoldRole, String gptScaffoldRoleDescription, Integer gptScaffoldNumber, Long userId, String courseId, List<Integer> gptScaffoldParameters, String specialRequirementPrompt, String toolsLanguage);

    void exportGptScaffoldToExcelByUserIdListAndCourseIdList(List<Long> userIdList, List<String> courseIdList, ZipOutputStream zos) throws IOException;

    void removeByUserId(Long userId);

    boolean isRepeatGptScaffoldRequest(String redisKey, Long userId, String courseId, Integer scaffoldNumber);
    GptScaffoldVO handleManualScaffold(GptScaffoldRequest request);
    GptScaffoldVO handleNoScaffoldCondition(GptScaffoldRequest request);
}
