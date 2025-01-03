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
