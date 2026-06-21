package com.monash.flora_backend.service.impl;

// Imports the Google Cloud Translation library.

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.google.common.collect.Lists;
import com.monash.flora_backend.config.cache.IGlobalCache;
import com.monash.flora_backend.constant.MyConstant;
import com.monash.flora_backend.controller.vo.DictionaryLogVO;
import com.monash.flora_backend.dao.entity.DictionaryLog;
import com.monash.flora_backend.dao.entity.RuleBaseWritingChecklist;
import com.monash.flora_backend.dao.entity.TraceData;
import com.monash.flora_backend.dao.mapper.DictionaryLogMapper;
import com.monash.flora_backend.service.IDictionaryLogService;
import com.monash.flora_backend.util.*;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;
import java.util.zip.ZipOutputStream;

import static com.monash.flora_backend.util.GenerateLinkCacheHelper.updateTypeCache;


@Slf4j
@Service
@AllArgsConstructor
public class DictionaryLogServiceImpl extends ServiceImpl<DictionaryLogMapper, DictionaryLog> implements IDictionaryLogService {
    private final RestTemplate restTemplate;
    private final IGlobalCache iGlobalCache;

    private Long getCountByUserIdsAndCourseIds(List<Long> userIdList, List<String> courseIdList) {
        AtomicLong totalCount = new AtomicLong();
        userIdList.forEach(userId -> {
            courseIdList.forEach(courseId -> {
                QueryWrapper<DictionaryLog> wrapper = new QueryWrapper<>();
                wrapper.eq("user_id", userId).eq("course_id", courseId);
                totalCount.addAndGet(super.count(wrapper));
            });
        });
        return totalCount.get();
    }
//    private final WebClient webClient;

    //    @Override
//    public void translateText(String projectId, String targetLanguage, String text) {
//        try (TranslationServiceClient client = TranslationServiceClient.create()) {
//            // Supported Locations: `global`, [glossary location], or [model location]
//            // Glossaries must be hosted in `us-central1`
//            // Custom Models must use the same location as your model. (us-central1)
//            LocationName parent = LocationName.of(projectId, "global");
//
//            // Supported Mime Types: https://cloud.google.com/translate/docs/supported-formats
//            TranslateTextRequest request =
//                    TranslateTextRequest.newBuilder()
//                            .setParent(parent.toString())
//                            .setMimeType("text/plain")
//                            .setTargetLanguageCode(targetLanguage)
//                            .addContents(text)
//                            .build();
//
//            TranslateTextResponse response = client.translateText(request);
//
//            // Display the translation for each input text provided
//            for (Translation translation : response.getTranslationsList()) {
//                System.out.printf("Translated text: %s\n", translation.getTranslatedText());
//            }
//        } catch (IOException e) {
//            log.info("## 谷歌翻译调用失败，{}", e.getMessage());
//        }
//    }
    @Override
    public String translateText(String targetLanguage, List<String> keywords, String apiKey, Long userId, String courseId) {

//        String url = "https://translation.googleapis.com/language/translate/v2";
//        url = url + "?key=" + apiKey;

//        @Data
//        class Params {
//            String target;
//            List<String> q;
//
//            public Params(String targetLanguage, List<String> keywords) {
//                this.target = targetLanguage;
//                this.q = keywords;
//            }
//        }
//        Params params = new Params(targetLanguage, keywords);
        //提交参数设置
        LinkedMultiValueMap<String, Object> map = new LinkedMultiValueMap<>();
        map.add("myusername", "testusername");
        map.add("mypassword", "testpassword");
        map.add("key", apiKey);
        map.add("target", targetLanguage);
        StringBuilder sb = new StringBuilder();
        keywords.forEach(k -> {
            sb.append(k).append(" ");
        });
        map.add("keywords", sb.toString());

        String queryTime = MyUtils.getCurrentTimestamp();

//        webClient.get().uri("/myapi/dictionary").retrieve().bodyToMono(String.class);
//        Mono<String> result = webClient.post().uri("/myapi/dictionary").contentType(MediaType.APPLICATION_FORM_URLENCODED).bodyValue(map).retrieve().bodyToMono(String.class);
//        result.subscribe(r -> {
//            log.info("rrrrrrrr:" + r);
//        });

        String response = restTemplate.postForObject(MyConstant.CHAT_SERVICE_URL + "/dictionary", map, String.class);
        String responseTime = MyUtils.getCurrentTimestamp();
        log.info("dictionary response: " + response);

        DictionaryLog dictionaryLog = new DictionaryLog();
        dictionaryLog.setUserId(userId);
        dictionaryLog.setQueryText(sb.toString());
        dictionaryLog.setTranslatedText(response);
        dictionaryLog.setQueryTime(queryTime);
        dictionaryLog.setResponseTime(responseTime);
        dictionaryLog.setCourseId(courseId);
        super.save(dictionaryLog);

        return response;
    }

    @Override
    public List<DictionaryLogVO> findAllDictionaryLogByUserId(Long userId, String courseId) {
        QueryWrapper<DictionaryLog> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("user_id", userId).eq("course_id", courseId).orderByAsc("query_time");
        List<DictionaryLog> list = super.list(queryWrapper);
        return MyBeanCopyUtils.copyBeanList(list, DictionaryLogVO.class);
    }


    @Override
    public void exportDictionaryToExcelByUserIdListAndCourseIdList(List<Long> userIdList, List<String> courseIdList,
                                                                   ZipOutputStream zos) throws IOException {
        //头部，第一层
        List<List<String>> allHead = initialiseHeader();

        List<List<Object>> allData = Lists.newArrayList();

        List<DictionaryLogVO> dictionaryLogVOList = findDictionaryLogByUserIdListCourseIdList(userIdList, courseIdList);

        dictionaryLogVOList.forEach(dictionaryLogVO -> {

                    List<Object> data = Lists.newArrayList(allData.size()+1,
                            dictionaryLogVO.getUserId(), dictionaryLogVO.getQueryText(), dictionaryLogVO.getTranslatedText(),
                            dictionaryLogVO.getQueryTime(), dictionaryLogVO.getResponseTime()
                    );
                    allData.add(data);
        });

        byte[] stream = DynamicEasyExcelExportUtil.customerExportExcelFile(allHead, allData);
        // 写入zip
        FileUtils.writeToZip(zos, stream, "dictionary_log.xlsx");

    }

    private List<DictionaryLogVO> findDictionaryLogByUserIdListCourseIdList(List<Long> userIdList, List<String> courseIdList) {
        return getBaseMapper().findDictionaryLogByUserIdListCourseIdList(userIdList, courseIdList.stream().map(Long::valueOf).collect(Collectors.toList()));
    }

    private static List<List<String>> initialiseHeader() {
        List<String> head1 = new ArrayList<>();
        head1.add("#");
        head1.add("user_id");
        head1.add("query_text");
        head1.add("translated_text");
        head1.add("query_time");
        head1.add("response_time");

        //封装头部
        List<List<String>> allHead = new ArrayList<>();
        allHead.add(head1);
        return allHead;
    }

    @Override
    public void exportDictionaryToExcelByUserIdListAndCourseIdList(List<Long> userIdList, List<String> courseIdList, ZipOutputStream zos, int cutRow) throws IOException {
        ExcelBreaker excelBreaker = new ExcelBreaker(cutRow, "dictionary_log", initialiseHeader(), zos);

        userIdList.forEach(userId -> {
            courseIdList.forEach(courseId -> {
                List<DictionaryLogVO> dictionaryLogVOList = findAllDictionaryLogByUserId(userId, courseId);
                //封装数据体
                for (int k = 0; k < dictionaryLogVOList.size(); k++) {
                    DictionaryLogVO dictionaryLogVO= dictionaryLogVOList.get(k);

                    List<Object> data = Lists.newArrayList((k+1),
                            dictionaryLogVO.getUserId(), dictionaryLogVO.getQueryText(), dictionaryLogVO.getTranslatedText(),
                            dictionaryLogVO.getQueryTime(), dictionaryLogVO.getResponseTime()
                    );
                    excelBreaker.getAllData().add(data);
                    // 2. 每次完成一次add data就increase
                    excelBreaker.increaseCount(1);
                    // 如果counter超过了cutRow，保存进zip
                    excelBreaker.tryUpdateParamsAndSave();                }
            });
        });
        excelBreaker.saveExcelToZip();
    }

    @Override
    public void exportDictionaryToExcelByUserIdListAndCourseIdList(List<Long> userIdList, List<String> courseIdList, int cutRows, String token, String dateString) throws IOException {
        ExcelBreaker excelBreaker = new ExcelBreaker(cutRows, "dictionary_log", initialiseHeader(), token, dateString);
        updateTypeCache(token, "dictionary_log", iGlobalCache);
        if(MyConstant.checkNumberOfInstance)
            iGlobalCache.hset(token, "num-total-rows", String.valueOf(getCountByUserIdsAndCourseIds(userIdList, courseIdList)));
        List<DictionaryLogVO> dictionaryLogVOList = findDictionaryLogByUserIdListCourseIdList(userIdList, courseIdList);

        dictionaryLogVOList.forEach(dictionaryLogVO -> {

            List<Object> data = Lists.newArrayList(excelBreaker.getAllData().size()+1,
                    dictionaryLogVO.getUserId(), dictionaryLogVO.getQueryText(), dictionaryLogVO.getTranslatedText(),
                    dictionaryLogVO.getQueryTime(), dictionaryLogVO.getResponseTime()
            );
            excelBreaker.getAllData().add(data);
            // 2. 每次完成一次add data就increase
            excelBreaker.increaseCount(1);
            excelBreaker.tryUpdateCache(iGlobalCache);
            // 如果counter超过了cutRow，保存进zip
            excelBreaker.tryUpdateParamsAndSaveToExcel();
        });
        excelBreaker.saveExcelToFile();

//        userIdList.forEach(userId -> {
//            courseIdList.forEach(courseId -> {
//                List<DictionaryLogVO> dictionaryLogVOList = findAllDictionaryLogByUserId(userId, courseId);
//                //封装数据体
//                for (int k = 0; k < dictionaryLogVOList.size(); k++) {
//                    DictionaryLogVO dictionaryLogVO= dictionaryLogVOList.get(k);
//
//                    List<Object> data = Lists.newArrayList((k+1),
//                            dictionaryLogVO.getUserId(), dictionaryLogVO.getQueryText(), dictionaryLogVO.getTranslatedText(),
//                            dictionaryLogVO.getQueryTime(), dictionaryLogVO.getResponseTime()
//                    );
//                    excelBreaker.getAllData().add(data);
//                    // 2. 每次完成一次add data就increase
//                    excelBreaker.increaseCount(1);
//                    excelBreaker.tryUpdateCache(iGlobalCache);
//                    // 如果counter超过了cutRow，保存进zip
//                    excelBreaker.tryUpdateParamsAndSaveToExcel();
//                }
//            });
//        });
    }
}
