package com.monash.flora_backend.service.impl;


import cn.hutool.json.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.google.common.collect.Lists;
import com.monash.flora_backend.config.cache.IGlobalCache;
import com.monash.flora_backend.constant.MyConstant;
import com.monash.flora_backend.controller.vo.GrammarErrorVO;
import com.monash.flora_backend.dao.entity.RuleBaseCheckGrammar;
import com.monash.flora_backend.dao.entity.RuleBaseWritingChecklist;
import com.monash.flora_backend.dao.mapper.RuleBaseCheckGrammarMapper;
import com.monash.flora_backend.service.IRuleBaseCheckGrammarService;
import com.monash.flora_backend.util.DynamicEasyExcelExportUtil;
import com.monash.flora_backend.util.ExcelBreaker;
import com.monash.flora_backend.util.FileUtils;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;
import java.util.zip.ZipOutputStream;

import static com.monash.flora_backend.util.GenerateLinkCacheHelper.updateTypeCache;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author xinyu
 * @since 2023-05-05
 */
@Service
@Slf4j
@AllArgsConstructor
public class RuleBaseCheckGrammarServiceImpl extends ServiceImpl<RuleBaseCheckGrammarMapper, RuleBaseCheckGrammar> implements IRuleBaseCheckGrammarService {
    private final RestTemplate restTemplate;
    private final IGlobalCache iGlobalCache;

    private Long getCountByUserIdsAndCourseIds(List<Long> userIdList, List<String> courseIdList) {
        AtomicLong totalCount = new AtomicLong();
        userIdList.forEach(userId -> {
            courseIdList.forEach(courseId -> {
                QueryWrapper<RuleBaseCheckGrammar> wrapper = new QueryWrapper<>();
                wrapper.eq("user_id", userId).eq("course_id", courseId);
                totalCount.addAndGet(super.count(wrapper));
            });
        });
        return totalCount.get();
    }
    @Override
    public String getCheckGrammarResponse(String essay) {
        log.warn("----------getCheckGrammarResponse started");
        String url = MyConstant.CHAT_SERVICE_URL +  "/check-grammar";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        String instructionForChatgpt = "You are an academic writing assistant and you will provide " +
                "the basic grammar error position, error correction, error explanation and error type " +
                "for each sentence of the following essay in the format " +
                "of 'Sentence 1. xxx \\nerror position: xxx \\nerror correction: xxx \\nerror explanation: xxx \\nerror type: xxx \\n\\n " +
                "Sentence 2. xxx \\nerror position: xxx \\nerror correction: xxx \\nerror explanation: xxx \\nerror type: xxx \\n\\n ...':";
        //提交参数设置
        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();

//        map.add("settings", "[{\"role\": \"system\",\"content\": \"" + instructionForChatgpt + "\"}]");
        map.add("gptinstruction", instructionForChatgpt.replace("\"", "'"));
        map.add("myusername", "testusername");
        map.add("mypassword", "testpassword");
        map.add("essay", essay);

        // 组装请求体
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(map, headers);
        log.warn("---------- before postForObject");
        log.warn(url);
        log.warn(request.toString());

        String result = restTemplate.postForObject(url, request, String.class);

        log.info("----------sendPostRequestToGetResult-----result");
        log.info(result);
        //result example:
        //{
        //    "choices": [
        //        {
        //            "finish_reason": "stop",
        //            "index": 0,
        //            "message": {
        //                "content": "Sentence 1. Nowadays, .....",
        //                "role": "assistant"
        //            }
        //        }
        //    ],
        //    "created": 1683274525,
        //    "id": "chatcmpl-7Ckt32bP0hT9HWSfYBiZXj5hRdBpX",
        //    "model": "gpt-4-0314",
        //    "object": "handler.completion",
        //    "usage": {
        //        "completion_tokens": 834,
        //        "prompt_tokens": 365,
        //        "total_tokens": 1199
        //    }
        //}

        return result;
    }
    private List<GrammarErrorVO> convertGrammarResponse(RuleBaseCheckGrammar ruleBase) {
        List<GrammarErrorVO> grammarErrorVOList = new ArrayList<>();
        if (ruleBase == null) {
            return grammarErrorVOList;
        }
        String[] lines = ruleBase.getResponseContent().split("\n");

        for (int i = 0; i < lines.length / 6 + 1; i++) {
            try {
                GrammarErrorVO grammarErrorVO = new GrammarErrorVO();
                grammarErrorVO.setSentence(lines[i * 6].replace("Sentence ", ""));
                grammarErrorVO.setErrorPosition(lines[i * 6 + 1].replace("error position: ", ""));
                grammarErrorVO.setErrorCorrection(lines[i * 6 + 2].replace("error correction: ", ""));
                grammarErrorVO.setErrorExplanation(lines[i * 6 + 3].replace("error explanation: ", ""));
                grammarErrorVO.setErrorType(lines[i * 6 + 4].replace("error type: ", ""));
                grammarErrorVOList.add(grammarErrorVO);
            } catch (Exception e) {
                log.info("Error in generate GrammarErrorVO----i=" + i);
            }
        }
        return grammarErrorVOList;
    }
    @Override
    public List<GrammarErrorVO> createCheckGrammarLog(JSONObject jsonObject, Long userId, String essay, String currentTimestamp, String courseId) {
        RuleBaseCheckGrammar ruleBase = new RuleBaseCheckGrammar();

        ruleBase.setUserId(userId);
        ruleBase.setEssay(essay);
        ruleBase.setResponse(jsonObject.toString());
        ruleBase.setCheckTime(currentTimestamp);
        ruleBase.setResponseContent(jsonObject.getJSONArray("choices").getJSONObject(0).getJSONObject("message").getStr("content"));
        ruleBase.setCourseId(courseId);

        super.save(ruleBase);
        return convertGrammarResponse(ruleBase);
    }

    @Override
    public List<GrammarErrorVO> getLatestCheckGrammarFromDB(Long userId, String courseId) {
        QueryWrapper<RuleBaseCheckGrammar> wrapper = new QueryWrapper<>();
        wrapper.eq("user_id", userId).eq("course_id", courseId).orderByDesc("check_time").last("limit 1");
        RuleBaseCheckGrammar ruleBase = super.getOne(wrapper);

        return convertGrammarResponse(ruleBase);
    }

    @Override
    public int getGrammarErrorCount(String result){
        String[] strings = result.substring(result.indexOf("message={content=")+17).split("error position: ");
        ArrayList<String> list = new ArrayList<>();
        int errorCount = 0;
        for(int i = 1; i < strings.length; i++){
            list.add(strings[i].split("\nerror correction: ")[0]);
        }
        for (String s: list){
            // n/a, N/A, none, NONE, no error, NO ERROR, or missing this line
            if(!s.equals("N/A") && !s.equals("n/a") && !s.equals("none") && !s.equals("NONE") && !s.equals("No error") && !s.equals("missing this line")
                    && !s.equals("no error")  && !s.equals("NO ERROR")  && !s.equals("None")){
                errorCount++;
            }
        }
        return errorCount;
    }

    @Override
    public void exportCheckGrammarToExcelByUserIdListAndCourseIdList(List<Long> userIdList, List<String> courseIdList, ZipOutputStream zos) throws IOException {
        //头部，第一层
        List<List<String>> allHead = initialiseHeader();

        List<List<Object>> allData = Lists.newArrayList();
        //封装数据体
//        List<RuleBaseCheckGrammar> ruleBaseCheckGrammarList = findGrammarErrorVOByUserIdListCourseIdList(userIdList, courseIdList);
//
//        ruleBaseCheckGrammarList.forEach(RuleBaseCheckGrammar -> {
//            List<GrammarErrorVO> grammarErrorVOList = convertGrammarResponse(RuleBaseCheckGrammar);
//
//            if (grammarErrorVO != null) {
//                List<Object> data = Lists.newArrayList(allData.size() + 1,
//                        grammarErrorVO.get grammarErrorVO.getSentence(), grammarErrorVO.getErrorPosition(),
//                        grammarErrorVO.getErrorCorrection(), grammarErrorVO.getErrorExplanation(), grammarErrorVO.getErrorType()
//                );
//                allData.add(data);
//            }
//
//
//        });
        userIdList.forEach(userId -> {
            courseIdList.forEach(courseId -> {
                List<GrammarErrorVO> grammarErrorVOList = getLatestCheckGrammarFromDB(userId, courseId);
                if(grammarErrorVOList.size() != 0){
                    GrammarErrorVO grammarErrorVO = grammarErrorVOList.get(0);
                    if (grammarErrorVO != null) {
                        List<Object> data = Lists.newArrayList(allData.size() + 1,
                                userId, grammarErrorVO.getSentence(), grammarErrorVO.getErrorPosition(),
                                grammarErrorVO.getErrorCorrection(), grammarErrorVO.getErrorExplanation(), grammarErrorVO.getErrorType()
                        );
                        allData.add(data);
                    }
                }
            });
        });
        byte[] stream = DynamicEasyExcelExportUtil.customerExportExcelFile(allHead, allData);
        // 写入zip
        FileUtils.writeToZip(zos, stream, "grammar_check.xlsx");
    }

    private static List<List<String>> initialiseHeader() {
        List<String> head1 = new ArrayList<>();
        head1.add("#");
        head1.add("user_id");
        head1.add("sentence");
        head1.add("error_position");
        head1.add("error_correction");
        head1.add("error_explanation");
        head1.add("error_type");


        //封装头部
        List<List<String>> allHead = new ArrayList<>();
        allHead.add(head1);
        return allHead;
    }

    @Override
    public void exportCheckGrammarToExcelByUserIdListAndCourseIdList(List<Long> userIdList, List<String> courseIdList, ZipOutputStream zos, int cutRow) throws IOException {
        ExcelBreaker excelBreaker = new ExcelBreaker(cutRow, "grammar_check", initialiseHeader(), zos);
        //封装数据体

        userIdList.forEach(userId -> {
            courseIdList.forEach(courseId -> {
                List<GrammarErrorVO> grammarErrorVOList = getLatestCheckGrammarFromDB(userId, courseId);
                if(grammarErrorVOList.size() != 0){
                    GrammarErrorVO grammarErrorVO = grammarErrorVOList.get(0);
                    if (grammarErrorVO != null) {
                        List<Object> data = Lists.newArrayList(excelBreaker.getAllData().size() + 1,
                                userId, grammarErrorVO.getSentence(), grammarErrorVO.getErrorPosition(),
                                grammarErrorVO.getErrorCorrection(), grammarErrorVO.getErrorExplanation(), grammarErrorVO.getErrorType()
                        );
                        excelBreaker.getAllData().add(data);
                        excelBreaker.increaseCount(1);
                        // 如果counter超过了cutRow，保存进zip
                        excelBreaker.tryUpdateParamsAndSave();
                    }
                }
            });
        });
        excelBreaker.saveExcelToZip();
    }

    @Override
    public void exportCheckGrammarToExcelByUserIdListAndCourseIdList(List<Long> userIdList, List<String> courseIdList, int cutRows, String token, String dateString) throws IOException {
        ExcelBreaker excelBreaker = new ExcelBreaker(cutRows, "grammar_check", initialiseHeader(), token, dateString);
        updateTypeCache(token, "grammar_check", iGlobalCache);
        if(MyConstant.checkNumberOfInstance)
            iGlobalCache.hset(token, "num-total-rows", String.valueOf(getCountByUserIdsAndCourseIds(userIdList, courseIdList)));        //封装数据体

        userIdList.forEach(userId -> {
            courseIdList.forEach(courseId -> {
                List<GrammarErrorVO> grammarErrorVOList = getLatestCheckGrammarFromDB(userId, courseId);
                if(grammarErrorVOList.size() != 0){
                    GrammarErrorVO grammarErrorVO = grammarErrorVOList.get(0);
                    if (grammarErrorVO != null) {
                        List<Object> data = Lists.newArrayList(excelBreaker.getAllData().size() + 1,
                                userId, grammarErrorVO.getSentence(), grammarErrorVO.getErrorPosition(),
                                grammarErrorVO.getErrorCorrection(), grammarErrorVO.getErrorExplanation(), grammarErrorVO.getErrorType()
                        );
                        excelBreaker.getAllData().add(data);
                        // 2. 每次完成一次add data就increase
                        excelBreaker.increaseCount(1);
                        excelBreaker.tryUpdateCache(iGlobalCache);
                        // 如果counter超过了cutRow，保存进zip
                        excelBreaker.tryUpdateParamsAndSaveToExcel();
                    }
                }
            });
        });
        excelBreaker.saveExcelToFile();
    }
}
