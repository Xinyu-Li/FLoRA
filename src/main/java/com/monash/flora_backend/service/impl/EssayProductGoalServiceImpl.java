package com.monash.flora_backend.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.monash.flora_backend.constant.MyConstant;
import com.monash.flora_backend.dao.entity.EssayProductGoal;
import com.monash.flora_backend.dao.mapper.EssayProductGoalMapper;
import com.monash.flora_backend.service.IEssayProductGoalService;
import com.monash.flora_backend.util.MyUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author xinyu
 * @since 2025-01-03
 */
@Service
@Slf4j
@RequiredArgsConstructor
public class EssayProductGoalServiceImpl extends ServiceImpl<EssayProductGoalMapper, EssayProductGoal> implements IEssayProductGoalService {
    private final RestTemplate restTemplate;

    @Override
    public String sendEssayProductAnalysisRequest(
            String requestNumber, String essay, Long userId, String courseId,
            String username, String processTime, String triggerEvent, String taskName) {

        String url = MyConstant.CHAT_SERVICE_URL + MyConstant.CHAT_SERVICE_ESSAY_PRODUCT_ANALYSIS;
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        //提交参数设置
        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.add("myusername", "testusername");
        map.add("mypassword", "testpassword");


        map.add("essay", essay);
        map.add("requestNumber", requestNumber);
        map.add("taskName", taskName);

        // 组装请求体
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(map, headers);
        String result;


        try {
            result = restTemplate.postForObject(url, request, String.class);
        } catch (Exception e) {
            result = "essay-analysis-error";
            e.printStackTrace();
        }
        log.info(result);
        String gptResponseTime = MyUtils.getCurrentTimestamp();
        log.info("essay-analysis-finish-time: {}", gptResponseTime);
        //存入Database
        saveEssayProductGoal(requestNumber, essay, userId, courseId, username,
                processTime, triggerEvent, result);

        //返回结果
        return result;
    }

    /*private int[] convertStringToIntArray(String result) {
        // 去掉方括號並拆分數字部分
        String[] stringNumbers = result.replaceAll("\\[|\\]", "").split(",");

        // 創建一個整數數組來存放結果
        int[] numbers = new int[stringNumbers.length];

        // 轉換每個字符串為整數並存入數組
        for (int i = 0; i < stringNumbers.length; i++) {
            numbers[i] = Integer.parseInt(stringNumbers[i].trim());
        }
        return numbers;
    }*/

    private void saveEssayProductGoal(String requestNumber, String essay, Long userId, String courseId,
                                      String username, String processTime, String triggerEvent, String analysisResult) {

        log.info("excute saveEssayProductGoal function with setAnalysisType as "+requestNumber);
        EssayProductGoal essayProductGoal = new EssayProductGoal();
        essayProductGoal.setEssay(essay);
        essayProductGoal.setUserId(userId);
        essayProductGoal.setCourseId(courseId);
        essayProductGoal.setAnalysisType(requestNumber);
        essayProductGoal.setUsername(username);
        essayProductGoal.setProcessTime(processTime);
        essayProductGoal.setTriggerEvent(triggerEvent);
        essayProductGoal.setAnalysisResult(analysisResult);

        super.save(essayProductGoal);
    }

}
