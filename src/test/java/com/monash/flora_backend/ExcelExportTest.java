package com.monash.flora_backend;

import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.monash.flora_backend.dao.entity.Essay;
import com.monash.flora_backend.service.IEssayService;
import com.monash.flora_backend.service.ITraceDataService;
import com.monash.flora_backend.util.DynamicEasyExcelExportUtil;
import com.monash.flora_backend.util.MyUtils;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class ExcelExportTest extends FLoRaBackendApplicationTests{

//    @Autowired
//    private DynamicEasyExcelExportUtil

    @Autowired
    private IEssayService iEssayService;

    @Autowired
    private ITraceDataService iTraceDataService;

//    @Test
//    public void testExport3() {
//        iTraceDataService.exportTraceDataToExcel();
//    }

    @Test
    public void testExport2() throws IOException {
        List<Essay> essayList = iEssayService.list();
        System.out.println(essayList.size());
        //导出包含数据内容的文件（方式二）
        //头部，第一层
        List<String> head1 = new ArrayList<>();
        head1.add("#");
        head1.add("user_id");
        head1.add("username");
        head1.add("save_time");
        head1.add("essay_content");

        //封装头部
        List<List<String>> allHead = new ArrayList<>();
        allHead.add(head1);


        List<List<Object>> allData = Lists.newArrayList();
        //封装数据体
        for (int i = 0; i < essayList.size(); i++) {
            Essay essay = essayList.get(i);
            String dateFormat = MyUtils.convertTimestampToFormat(essay.getSaveTime());
            List<Object> data1 = Lists.newArrayList((i+1),essay.getUserId(),essay.getUsername(), dateFormat,essay.getEssayContent());
            allData.add(data1);
        }

        byte[] stream2 = DynamicEasyExcelExportUtil.customerExportExcelFile(allHead, allData);
        FileOutputStream outputStream2 = new FileOutputStream(new File("C:\\develop\\flora_project\\testessay.xlsx"));
        outputStream2.write(stream2);
        outputStream2.close();


    }

    /**
     * 导出文件测试
     * @param
     * @throws IOException
     */
    @Test
    public void testExport() throws IOException {
        //导出包含数据内容的文件（方式一）
        LinkedHashMap<String, String> headColumnMap = Maps.newLinkedHashMap();
        headColumnMap.put("className","班级");
        headColumnMap.put("name","学生信息,姓名");
        headColumnMap.put("sex","学生信息,性别");



        List<Map<String, Object>> dataList = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            Map<String, Object> dataMap = Maps.newHashMap();
            dataMap.put("className", "一年级");
            dataMap.put("name", "张三" + i);
            dataMap.put("sex", "男");
            dataList.add(dataMap);
        }


        byte[] stream1 = DynamicEasyExcelExportUtil.exportExcelFile(headColumnMap, dataList);
        FileOutputStream outputStream1 = new FileOutputStream(new File("C:\\develop\\flora_project\\test1.xlsx"));
        outputStream1.write(stream1);
        outputStream1.close();


        //导出包含数据内容的文件（方式二）
        //头部，第一层
        List<String> head1 = new ArrayList<>();
        head1.add("第一行头部列1");
        head1.add("第一行头部列1");
        head1.add("第一行头部列1");
        head1.add("第一行头部列1");
        //头部，第二层
        List<String> head2 = new ArrayList<>();
        head2.add("第二行头部列1");
        head2.add("第二行头部列1");
        head2.add("第二行头部列2");
        head2.add("第二行头部列2");
        //头部，第三层
        List<String> head3 = new ArrayList<>();
        head3.add("第三行头部列1");
        head3.add("第三行头部列2");
        head3.add("第三行头部列3");
        head3.add("第三行头部列4");

        //封装头部
        List<List<String>> allHead = new ArrayList<>();
        allHead.add(head1);
        allHead.add(head2);
        allHead.add(head3);

        //封装数据体
        //第一行数据
        List<Object> data1 = Lists.newArrayList(1,1,1,1);
        //第二行数据
        List<Object> data2 = Lists.newArrayList(2,2,2,2);
        List<List<Object>> allData = Lists.newArrayList(data1, data2);

        byte[] stream2 = DynamicEasyExcelExportUtil.customerExportExcelFile(allHead, allData);
        FileOutputStream outputStream2 = new FileOutputStream(new File("C:\\develop\\flora_project\\test2.xlsx"));
        outputStream2.write(stream2);
        outputStream2.close();


    }
}
