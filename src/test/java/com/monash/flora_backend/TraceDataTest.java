package com.monash.flora_backend;

import cn.hutool.json.JSONUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.monash.flora_backend.controller.vo.TraceDataVO;
import com.monash.flora_backend.dao.entity.TraceData;
import com.monash.flora_backend.service.ITraceDataService;
import com.monash.flora_backend.util.MyBeanCopyUtils;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class TraceDataTest extends FLoRaBackendApplicationTests {

    @Autowired
    private ITraceDataService iTraceDataService;

    @Test
    public void testSaveBatch() throws IOException {
        String filePath = "src/test/java/com/monash/flora_backend/trace.txt";
        List<TraceData> traceDataList = new ArrayList<>();

        try (BufferedReader reader = new BufferedReader(new FileReader(filePath))) {
            String line;
            while ((line = reader.readLine()) != null) {
                // 找到 TraceData{ 的位置
                int startIndex = line.indexOf("TraceData{");
                if (startIndex == -1) {
                    continue;
                }
                // 提取 TraceData{...} 的内容
                String traceDataStr = line.substring(startIndex + "TraceData{".length(), line.length() - 1);

                TraceData traceData = parseTraceData(traceDataStr);
                // 过滤掉无效记录（关键字段为空）
                if (traceData != null && traceData.getUserId() != null && traceData.getSaveTime() != null) {
                    traceDataList.add(traceData);
                }
            }
        }

        System.out.println("Total TraceData count: " + traceDataList.size());
        iTraceDataService.saveBatch(traceDataList);
    }

    private TraceData parseTraceData(String content) {
        TraceData traceData = new TraceData();

        // 解析每个字段，格式为 key='value' 或 key=value
        String[] fields = {
                "id", "userId", "saveTime", "username", "url", "firstname", "lastname",
                "source", "pageEvent", "targetObject", "instantEvent", "actionLabel",
                "subActionLabel", "detailedActionLabel", "modelType", "processLabel",
                "screenX", "screenY", "clientX", "clientY", "windowInnerWidth",
                "windowInnerHeight", "screenWidth", "screenHeight", "eventValue", "courseId"
        };

        for (String field : fields) {
            String value = extractFieldValue(content, field);
            setFieldValue(traceData, field, value);
        }

        return traceData;
    }

    private String extractFieldValue(String content, String fieldName) {
        String pattern = fieldName + "=";
        int startIndex = content.indexOf(pattern);
        if (startIndex == -1) {
            return null;
        }

        startIndex += pattern.length();
        char firstChar = content.charAt(startIndex);

        if (firstChar == '\'') {
            // 字符串值，找到下一个单引号
            startIndex++;
            int endIndex = content.indexOf("'", startIndex);
            if (endIndex == -1) {
                return null;
            }
            return content.substring(startIndex, endIndex);
        } else {
            // 数字或null值，找到逗号或字符串结尾
            int endIndex = content.indexOf(",", startIndex);
            if (endIndex == -1) {
                endIndex = content.length();
            }
            String value = content.substring(startIndex, endIndex).trim();
            return "null".equals(value) ? null : value;
        }
    }

    private void setFieldValue(TraceData traceData, String fieldName, String value) {
        if (value == null || "null".equals(value)) {
            return;
        }

        switch (fieldName) {
            case "id":
                traceData.setId(Long.parseLong(value));
                break;
            case "userId":
                traceData.setUserId(Long.parseLong(value));
                break;
            case "saveTime":
                traceData.setSaveTime(value);
                break;
            case "username":
                traceData.setUsername(value);
                break;
            case "url":
                traceData.setUrl(value);
                break;
            case "firstname":
                traceData.setFirstname(value);
                break;
            case "lastname":
                traceData.setLastname(value);
                break;
            case "source":
                traceData.setSource(value);
                break;
            case "pageEvent":
                traceData.setPageEvent(value);
                break;
            case "targetObject":
                traceData.setTargetObject(value);
                break;
            case "instantEvent":
                traceData.setInstantEvent(value);
                break;
            case "actionLabel":
                traceData.setActionLabel(value);
                break;
            case "subActionLabel":
                traceData.setSubActionLabel(value);
                break;
            case "detailedActionLabel":
                traceData.setDetailedActionLabel(value);
                break;
            case "modelType":
                traceData.setModelType(value);
                break;
            case "processLabel":
                traceData.setProcessLabel(value);
                break;
            case "screenX":
                traceData.setScreenX(value);
                break;
            case "screenY":
                traceData.setScreenY(value);
                break;
            case "clientX":
                traceData.setClientX(value);
                break;
            case "clientY":
                traceData.setClientY(value);
                break;
            case "windowInnerWidth":
                traceData.setWindowInnerWidth(value);
                break;
            case "windowInnerHeight":
                traceData.setWindowInnerHeight(value);
                break;
            case "screenWidth":
                traceData.setScreenWidth(value);
                break;
            case "screenHeight":
                traceData.setScreenHeight(value);
                break;
            case "eventValue":
                traceData.setEventValue(value);
                break;
            case "courseId":
                traceData.setCourseId(value);
                break;
        }
    }

    @Test
    public void testFindAllStudentInfo() {
//        List<TraceDataVO> traceDataVOList = iTraceDataService.findAllStudentInfo();
//
//        traceDataVOList.forEach(System.out::println);
        String[] split = ";;;;;;;;;;;;".split(";;;");
        System.out.println(Arrays.toString(split));

        String s = "1,2,2,3,";
        System.out.println(s.substring(0, s.length()-1));
    }


    @Test
    public void testTraceDataSearch() {
        QueryWrapper<TraceData> queryWrapperFirstItem = new QueryWrapper<>();
        queryWrapperFirstItem.eq("user_id", 2).eq("course_id", "2").orderByAsc("save_time").last("limit 1");
        List<TraceData> traceDataList = iTraceDataService.list(queryWrapperFirstItem);
        TraceData first = iTraceDataService.getOne(queryWrapperFirstItem);
    }

    @Test
    public void testTraceDataSaveBatch() {
        List<TraceDataVO> traceDataVOList = new ArrayList<>();
        int count = 0;
        try (BufferedReader br = new BufferedReader(new FileReader("F:\\checklog\\new\\iii\\kafka_log_output.txt"))) {
            String line;
            while ((line = br.readLine()) != null) {
                if (line.startsWith("| offset:")) {
                    String record = line.substring(line.indexOf("{\"userId\":"));
                    TraceDataVO traceDataVO = JSONUtil.toBean(record, TraceDataVO.class);
                    traceDataVOList.add(traceDataVO);

                    if (traceDataVOList.size() > 250) {
                        iTraceDataService.saveBatch(MyBeanCopyUtils.copyBeanList(traceDataVOList, TraceData.class));
                        System.out.println("save finished-----------------" + (count++) + "--------------traceDataVOList.size():" + traceDataVOList.size());
                        traceDataVOList.clear();
                    }
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

//        System.out.println(traceDataVOList.size());

//        List<TraceDataVO> traceDataVOList2 = new ArrayList<>();
//        for (int i = 156; i < traceDataVOList.size(); i++) {
//            traceDataVOList2.add(traceDataVOList.get(i));
//        }
//        System.out.println(traceDataVOList2.size());
//        TraceDataVO traceDataVO = JSONUtil.toBean(record.value(), TraceDataVO.class);

//        iTraceDataService.saveBatch(MyBeanCopyUtils.copyBeanList(traceDataVOList, TraceData.class));
//        System.out.println("save finished");
    }
}
