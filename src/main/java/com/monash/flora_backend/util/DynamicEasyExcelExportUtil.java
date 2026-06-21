package com.monash.flora_backend.util;


import cn.hutool.json.JSONUtil;
import com.alibaba.excel.EasyExcel;
import com.alibaba.excel.write.builder.ExcelWriterBuilder;
import com.alibaba.excel.write.builder.ExcelWriterSheetBuilder;
import com.alibaba.excel.write.style.column.LongestMatchColumnWidthStyleStrategy;
import com.google.common.collect.Lists;
import lombok.extern.slf4j.Slf4j;

import java.io.ByteArrayOutputStream;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Slf4j
public class DynamicEasyExcelExportUtil {


    private static final String DEFAULT_SHEET_NAME = "sheet1";

    /**
     * 动态生成导出模版(单表头)
     * @param headColumns 列名称
     * @return            excel文件流
     */
    public static byte[] exportTemplateExcelFile(List<String> headColumns){
        List<List<String>> excelHead = Lists.newArrayList();
        headColumns.forEach(columnName -> { excelHead.add(Lists.newArrayList(columnName)); });
        byte[] stream = createExcelFile(excelHead, new ArrayList<>());
        return stream;
    }

    /**
     * 动态生成模版(复杂表头)
     * @param excelHead   列名称
     * @return
     */
    public static byte[] exportTemplateExcelFileCustomHead(List<List<String>> excelHead){
        byte[] stream = createExcelFile(excelHead, new ArrayList<>());
        return stream;
    }

    /**
     * 动态导出文件（通过map方式计算）
     * @param headColumnMap  有序列头部
     * @param dataList       数据体
     * @return
     */
    public static byte[] exportExcelFile(LinkedHashMap<String, String> headColumnMap, List<Map<String, Object>> dataList){
        //获取列名称
        List<List<String>> excelHead = new ArrayList<>();
        if (!(headColumnMap == null || headColumnMap.isEmpty())) {
//        if(MapUtils.isNotEmpty(headColumnMap)){
            //key为匹配符，value为列名，如果多级列名用逗号隔开
            headColumnMap.entrySet().forEach(entry -> {
                excelHead.add(Lists.newArrayList(entry.getValue().split(",")));
            });
        }
        List<List<Object>> excelRows = new ArrayList<>();
        if (!(headColumnMap == null || headColumnMap.isEmpty()) && !(dataList == null || dataList.isEmpty())) {
//        if(MapUtils.isNotEmpty(headColumnMap) && CollectionUtils.isNotEmpty(dataList)){
            for (Map<String, Object> dataMap : dataList) {
                List<Object> rows = new ArrayList<>();
                headColumnMap.entrySet().forEach(headColumnEntry -> {
                    if(dataMap.containsKey(headColumnEntry.getKey())){
                        Object data = dataMap.get(headColumnEntry.getKey());
                        rows.add(data);
                    }
                });
                excelRows.add(rows);
            }
        }
        byte[] stream = createExcelFile(excelHead, excelRows);
        return stream;
    }


    /**
     * 生成文件（自定义头部排列）
     * @param rowHeads
     * @param excelRows
     * @return
     */
    public static byte[] customerExportExcelFile(List<List<String>> rowHeads, List<List<Object>> excelRows){

        //将行头部转成easyexcel能识别的部分
        List<List<String>> excelHead = transferHead(rowHeads);
        return createExcelFile(excelHead, excelRows);
    }

    /**
     * 生成文件
     * @param excelHead
     * @param excelRows
     * @return
     */
    private static byte[] createExcelFile(List<List<String>> excelHead, List<List<Object>> excelRows){
        try {
            if (!(excelHead == null || excelHead.isEmpty())) {
//            if(CollectionUtils.isNotEmpty(excelHead)){
                ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
                log.info("after outputStream");
                ExcelWriterBuilder excelWriterBuilder = EasyExcel.write(outputStream);
                log.info("after excelWriterBuilder");
                excelWriterBuilder.registerWriteHandler(new LongestMatchColumnWidthStyleStrategy());
                log.info("after registerWriteHandler");
                excelWriterBuilder.head(excelHead);
                log.info("after head");
                ExcelWriterSheetBuilder excelWriterSheetBuilder = excelWriterBuilder.sheet(DEFAULT_SHEET_NAME);
                log.info("after excelWriterSheetBuilder");

                excelWriterSheetBuilder.doWrite(excelRows);
                log.info("after doWrite");

//                EasyExcel.write(outputStream)
//                        .registerWriteHandler(new LongestMatchColumnWidthStyleStrategy())
//                        .head(excelHead)
//                        .sheet(DEFAULT_SHEET_NAME)
//                        .doWrite(excelRows);

                log.info("in --------------createExcelFile");
                return outputStream.toByteArray();
            }
        } catch (Exception e) {
//            log.info("动态生成excel文件失败，headColumns：" + JSONArray.toJSONString(excelHead) + "，excelRows：" + JSONArray.toJSONString(excelRows), e);
            log.info("动态生成excel文件失败，headColumns：" + JSONUtil.toJsonStr(excelHead) + "，excelRows：" + JSONUtil.toJsonStr(excelRows), e);
        }
        return null;
    }

    /**
     * 将行头部转成easyexcel能识别的部分
     * @param rowHeads
     * @return
     */
    public static List<List<String>> transferHead(List<List<String>> rowHeads){
        //将头部列进行反转
        List<List<String>> realHead = new ArrayList<>();
        if (!(rowHeads == null || rowHeads.isEmpty())) {
//        if(CollectionUtils.isNotEmpty(rowHeads)){
            Map<Integer, List<String>> cellMap = new LinkedHashMap<>();
            //遍历行
            for (List<String> cells : rowHeads) {
                //遍历列
                for (int i = 0; i < cells.size(); i++) {
                    if(cellMap.containsKey(i)){
                        cellMap.get(i).add(cells.get(i));
                    } else {
                        cellMap.put(i, Lists.newArrayList(cells.get(i)));
                    }
                }
            }
            //将列一行一行加入realHead
            cellMap.entrySet().forEach(item -> realHead.add(item.getValue()));
        }
        return realHead;
    }


}
