package com.monash.flora_backend.data_reprocess;

import com.alibaba.excel.EasyExcel;
import com.monash.flora_backend.FLoRaBackendApplicationTests;
import com.monash.flora_backend.constant.MyConstantMariaModelSRLPattern;
import com.monash.flora_backend.dao.entity.TraceData;
import com.monash.flora_backend.service_func.ActionAndProcessService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import javax.xml.stream.XMLInputFactory;
import javax.xml.stream.XMLStreamConstants;
import javax.xml.stream.XMLStreamReader;
import java.io.InputStream;
import java.util.*;
import java.util.stream.Collectors;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;

public class ReprocessDataIntiTest extends FLoRaBackendApplicationTests {
    @Autowired
    private ActionAndProcessService actionAndProcessService;
    /**
     * 从Excel文件中读取trace数据，执行maria model SRL pattern matching，将结果写入新的Excel文件。
     * <p>
     * 使用自定义XML解析读取xlsx文件（支持strict OOXML格式），
     * 通过 action + sub_action + action_label 三列推导出 subActionLabel，
     * 然后复用 ActionAndProcessService.findSrlProcess() 执行pattern matching，
     * 最终将结果（含computed processLabel）写入新的Excel文件。
     * <p>
     * 注意：运行此测试建议使用 -Xmx2g 以确保足够的JVM内存。
     */
    @Test
    public void testDataReProcessing2() throws Exception {
        String inputPath = "src/main/resources/RU_patterns_complete-user_log_manual_processed.xlsx";
        String outputPath = "src/main/resources/RU_patterns_output.xlsx";

        // ========== Step 1: 从Excel文件中读取trace数据 ==========
        System.out.println("Step 1: Reading Excel file (strict OOXML via XML parsing)...");
        List<TraceData> allTraceData = readExcelToTraceData(inputPath);
        System.out.println("  Total trace data loaded: " + allTraceData.size());

        // ========== Step 2: 按userId分组，遍历每个用户执行pattern matching ==========
        System.out.println("Step 2: Running pattern matching per user...");
        Map<Long, List<TraceData>> userTraceDataMap = allTraceData.stream()
                .collect(Collectors.groupingBy(TraceData::getUserId, LinkedHashMap::new, Collectors.toList()));
        System.out.println("  Total users: " + userTraceDataMap.size());

        for (Map.Entry<Long, List<TraceData>> entry : userTraceDataMap.entrySet()) {
            Long userId = entry.getKey();
            List<TraceData> traceDataList = entry.getValue();

            // 按saveTime排序
            traceDataList.sort(Comparator.comparing(td -> Long.parseLong(td.getSaveTime())));

            // 清除所有process label
            traceDataList.forEach(td -> td.setProcessLabel(null));

            // 从数据中找到任务开始时间（ESSAY_TASK_START 或第一条记录的时间）
            long taskStartTime = -1;
            for (TraceData td : traceDataList) {
                if ("ESSAY_TASK_START".equals(td.getInstantEvent())) {
                    taskStartTime = Long.parseLong(td.getSaveTime());
                    break;
                }
            }
            if (taskStartTime == -1 && !traceDataList.isEmpty()) {
                taskStartTime = Long.parseLong(traceDataList.get(0).getSaveTime());
            }
            if (taskStartTime == -1) {
                System.out.println("  Skipping userId=" + userId + " (no data)");
                continue;
            }

            // 按15分钟分割（与 labelAllProcessLabelPatterns 逻辑一致）
            long timeBreakpoint = taskStartTime + 15 * 60 * 1000;
            List<TraceData> beforeList = new ArrayList<>();
            List<TraceData> afterList = new ArrayList<>();
            for (TraceData td : traceDataList) {
                if (Long.parseLong(td.getSaveTime()) <= timeBreakpoint) {
                    beforeList.add(td);
                } else {
                    afterList.add(td);
                }
            }

            // 调用已有的findSrlProcess方法执行regex pattern matching
            List<TraceData> needUpdateList = new ArrayList<>();
            actionAndProcessService.findSrlProcess(beforeList,
                    MyConstantMariaModelSRLPattern.BEFORE_15MIN_MARIA_MODEL_PROCESS_PATTERN_LIST,
                    "maria", needUpdateList, MyConstantMariaModelSRLPattern.MARIA_MODEL_PROCESS_PATTERN_REGEX_MAP);
            actionAndProcessService.findSrlProcess(afterList,
                    MyConstantMariaModelSRLPattern.AFTER_15MIN_MARIA_MODEL_PROCESS_PATTERN_LIST,
                    "maria", needUpdateList, MyConstantMariaModelSRLPattern.MARIA_MODEL_PROCESS_PATTERN_REGEX_MAP);

            // 将匹配到的processLabel回写到原始TraceData对象上（通过id匹配）
            Map<Long, String> processLabelMap = new HashMap<>();
            for (TraceData td : needUpdateList) {
                processLabelMap.put(td.getId(), td.getProcessLabel());
            }
            for (TraceData td : traceDataList) {
                String label = processLabelMap.get(td.getId());
                if (label != null) {
                    td.setProcessLabel(label);
                }
            }

            System.out.println("  userId=" + userId + ": " + traceDataList.size() + " records, " + needUpdateList.size() + " labeled");
        }

        // ========== Step 3: 将结果写入新的Excel文件 ==========
        System.out.println("Step 3: Writing results to Excel...");
        List<List<String>> headList = Arrays.asList(
                List.of("id"), List.of("userId"), List.of("saveTime"),
                List.of("action"), List.of("sub_action"), List.of("action_label"),
                List.of("derived_subActionLabel"), List.of("computed_processLabel"),
                List.of("original_processLabel")
        );

        List<List<Object>> dataList = new ArrayList<>();
        for (TraceData td : allTraceData) {
            List<Object> row = new ArrayList<>();
            row.add(td.getId());
            row.add(td.getUserId());
            row.add(td.getSaveTime());
            row.add(td.getActionLabel());           // action (原始Excel列)
            row.add(td.getInstantEvent());           // sub_action (原始Excel列)
            row.add(td.getDetailedActionLabel());    // action_label (原始Excel列)
            row.add(td.getSubActionLabel());         // 推导出的subActionLabel
            row.add(td.getProcessLabel());           // 计算出的processLabel
            row.add(td.getEventValue());             // 原始process_label (用于对比)
            dataList.add(row);
        }

        EasyExcel.write(outputPath)
                .head(headList)
                .sheet("result")
                .doWrite(dataList);

        System.out.println("Done! Output written to: " + outputPath);
        System.out.println("Total rows written: " + dataList.size());
    }


    // ==================== Excel读取 ====================

    /**
     * 读取strict OOXML格式的xlsx文件，解析为TraceData列表。
     * 使用StAX直接解析xlsx内部XML（绕过POI 4.x对strict OOXML的兼容性问题）。
     */
    private List<TraceData> readExcelToTraceData(String filePath) throws Exception {
        List<String> sharedStrings = new ArrayList<>();
        List<TraceData> result = new ArrayList<>();

        try (ZipFile zipFile = new ZipFile(filePath)) {
            // 1. 解析共享字符串表
            ZipEntry ssEntry = zipFile.getEntry("xl/sharedStrings.xml");
            if (ssEntry != null) {
                try (InputStream is = zipFile.getInputStream(ssEntry)) {
                    XMLStreamReader reader = XMLInputFactory.newInstance().createXMLStreamReader(is);
                    boolean inSi = false, inT = false;
                    StringBuilder text = new StringBuilder();
                    while (reader.hasNext()) {
                        int event = reader.next();
                        if (event == XMLStreamConstants.START_ELEMENT) {
                            String name = reader.getLocalName();
                            if ("si".equals(name)) { inSi = true; text.setLength(0); }
                            else if ("t".equals(name) && inSi) { inT = true; }
                        } else if (event == XMLStreamConstants.CHARACTERS && inT) {
                            text.append(reader.getText());
                        } else if (event == XMLStreamConstants.END_ELEMENT) {
                            String name = reader.getLocalName();
                            if ("t".equals(name)) { inT = false; }
                            else if ("si".equals(name)) { sharedStrings.add(text.toString()); inSi = false; }
                        }
                    }
                    reader.close();
                }
            }
            System.out.println("  Shared strings loaded: " + sharedStrings.size());

            // 2. 解析Sheet数据
            ZipEntry sheetEntry = zipFile.getEntry("xl/worksheets/sheet1.xml");
            if (sheetEntry == null) throw new RuntimeException("Sheet1 not found in xlsx file");

            try (InputStream is = zipFile.getInputStream(sheetEntry)) {
                XMLStreamReader reader = XMLInputFactory.newInstance().createXMLStreamReader(is);
                Map<String, String> headerNameToCol = null; // column_name -> column_letter (e.g., "id" -> "A")
                Map<String, String> currentRowCells = new LinkedHashMap<>();
                String currentRowNum = null;
                String currentCellRef = null;
                String currentCellType = null;
                boolean inV = false;
                StringBuilder cellValue = new StringBuilder();
                int rowCount = 0;

                while (reader.hasNext()) {
                    int event = reader.next();
                    if (event == XMLStreamConstants.START_ELEMENT) {
                        String name = reader.getLocalName();
                        if ("row".equals(name)) {
                            currentRowNum = reader.getAttributeValue(null, "r");
                            currentRowCells.clear();
                        } else if ("c".equals(name)) {
                            currentCellRef = reader.getAttributeValue(null, "r");
                            currentCellType = reader.getAttributeValue(null, "t");
                            cellValue.setLength(0);
                        } else if ("v".equals(name)) {
                            inV = true;
                            cellValue.setLength(0);
                        }
                    } else if (event == XMLStreamConstants.CHARACTERS && inV) {
                        cellValue.append(reader.getText());
                    } else if (event == XMLStreamConstants.END_ELEMENT) {
                        String name = reader.getLocalName();
                        if ("v".equals(name)) {
                            inV = false;
                            String col = extractColumnFromRef(currentCellRef);
                            String val = cellValue.toString();
                            // 解析共享字符串引用
                            if ("s".equals(currentCellType) && !val.isEmpty()) {
                                int idx = Integer.parseInt(val);
                                val = idx < sharedStrings.size() ? sharedStrings.get(idx) : val;
                            }
                            // 跳过日期类型
                            if (!"d".equals(currentCellType)) {
                                currentRowCells.put(col, val);
                            }
                        } else if ("row".equals(name)) {
                            if ("1".equals(currentRowNum)) {
                                // 表头行：建立列名到列字母的映射
                                headerNameToCol = new HashMap<>();
                                for (Map.Entry<String, String> e : currentRowCells.entrySet()) {
                                    headerNameToCol.put(e.getValue(), e.getKey());
                                }
                                System.out.println("  Header mapping: " + headerNameToCol);
                            } else if (headerNameToCol != null) {
                                // 数据行
                                TraceData td = buildTraceDataFromRow(currentRowCells, headerNameToCol);
                                if (td != null) {
                                    result.add(td);
                                }
                            }
                            rowCount++;
                            if (rowCount % 50000 == 0) {
                                System.out.println("  Parsed " + rowCount + " rows...");
                            }
                        }
                    }
                }
                reader.close();
            }
        }

        return result;
    }

    /**
     * 从cell reference (如 "A1", "B2", "AA100") 中提取列字母部分
     */
    private String extractColumnFromRef(String ref) {
        if (ref == null) return "";
        StringBuilder col = new StringBuilder();
        for (char c : ref.toCharArray()) {
            if (Character.isLetter(c)) col.append(c);
            else break;
        }
        return col.toString();
    }

    /**
     * 从一行Excel数据构建TraceData对象
     */
    private TraceData buildTraceDataFromRow(Map<String, String> rowCells, Map<String, String> headerNameToCol) {
        Long id = parseLong(getValueByHeader(rowCells, headerNameToCol, "id"));
        Long userId = parseLong(getValueByHeader(rowCells, headerNameToCol, "uid"));
        Long sessionStart = parseLong(getValueByHeader(rowCells, headerNameToCol, "session_start"));
        Long timeLapsed = parseLong(getValueByHeader(rowCells, headerNameToCol, "time_lapsed"));

        if (id == null || userId == null || sessionStart == null || timeLapsed == null) return null;

        String action = getValueByHeader(rowCells, headerNameToCol, "action");
        String subAction = getValueByHeader(rowCells, headerNameToCol, "sub_action");
        String actionLabel = getValueByHeader(rowCells, headerNameToCol, "action_label");
        String originalProcessLabel = getValueByHeader(rowCells, headerNameToCol, "process_label");

        TraceData td = new TraceData();
        td.setId(id);
        td.setUserId(userId);
        td.setSaveTime(String.valueOf(sessionStart + timeLapsed));
        td.setUrl(getValueByHeader(rowCells, headerNameToCol, "url"));
        td.setSource(getValueByHeader(rowCells, headerNameToCol, "source"));
        td.setInstantEvent(subAction);              // 用于 mergeSubActions 中检测 ESSAY_TASK_END
        td.setActionLabel(action);                   // 保存原始 action 列
        td.setDetailedActionLabel(actionLabel);      // 保存原始 action_label 列
        td.setEventValue(originalProcessLabel);      // 保存原始 process_label 用于对比

        // 根据 action + sub_action + action_label 推导 subActionLabel
        td.setSubActionLabel(deriveSubActionLabel(action, subAction, actionLabel));

        return td;
    }

    /**
     * 通过列名从行数据中获取值
     */
    private String getValueByHeader(Map<String, String> rowCells, Map<String, String> headerNameToCol, String headerName) {
        String col = headerNameToCol.get(headerName);
        return col != null ? rowCells.get(col) : null;
    }

    private Long parseLong(String value) {
        if (value == null || value.isEmpty()) return null;
        try {
            // 处理可能的小数（如 "1670000000000.0"）
            if (value.contains(".")) {
                return (long) Double.parseDouble(value);
            }
            return Long.parseLong(value);
        } catch (NumberFormatException e) {
            return null;
        }
    }


    // ==================== subActionLabel 推导逻辑 ====================

    /**
     * 根据Excel中的 action, sub_action, action_label 三列推导出 subActionLabel。
     * subActionLabel 需要和 MyConstantMariaModelSRLPattern 中regex pattern使用的label一致。
     * <p>
     * regex pattern中使用的label包括：
     * - Reading: RELEVANT_READING, IRRELEVANT_READING, RELEVANT_REREADING, IRRELEVANT_REREADING
     * - Essay:   OPEN_ESSAY, WRITE_ESSAY, READ_ESSAY, SAVE_ESSAY, CLOSE_ESSAY, PASTE_TEXT_ESSAY
     * - Planner: OPEN_PLANNER, CREATE_PLANNER, EDIT_PLANNER, SAVE_PLANNER, CLOSE_PLANNER
     * - Instruction: TASK_REQUIREMENT, RUBRIC
     * - Navigation:  PAGE_NAVIGATION, TABLE_OF_CONTENT
     * - Annotation:  READ_ANNOTATION, EDIT_ANNOTATION, LABEL_ANNOTATION, DELETE_ANNOTATION,
     *                CREATE_NOTE, CREATE_HIGHLIGHT, SEARCH_ANNOTATION
     * - Scaffold:    INTERACT_SCAFFOLD, INTERACT_TODOLIST
     * - Others:      TIMER, OPEN_TIMER, CHECKLIST, TRY_OUT_TOOLS, CHECK_WORD_COUNT,
     *                SEARCH_CONTENT, ESSAY_PRODUCT, PROCESS_VISUAL
     */
    private String deriveSubActionLabel(String action, String subAction, String actionLabel) {
        if (action == null || subAction == null) return actionLabel;

        switch (action) {
            case "ESSAY":
                switch (subAction) {
                    case "OPEN":       return "OPEN_ESSAY";
                    case "CLOSE":      return "CLOSE_ESSAY";
                    case "TYPE":       return "WRITE_ESSAY";
                    case "SAVE":       return "SAVE_ESSAY";
                    case "FOCUS":      return "READ_ESSAY";
                    case "PASTETEXT":  return "PASTE_TEXT_ESSAY";
                    case "AFTER PASTE": return "WRITE_ESSAY";
                    default:           return actionLabel;
                }
            case "PLANNER":
                switch (subAction) {
                    case "OPEN":  return "OPEN_PLANNER";
                    case "CLOSE": return "CLOSE_PLANNER";
                    case "SAVE":  return "SAVE_PLANNER";
                    case "FOCUS": return "EDIT_PLANNER";
                    case "BLUR":  return "EDIT_PLANNER";
                    default:      return actionLabel;
                }
            case "TIMER":
                switch (subAction) {
                    case "OPEN":  return "TIMER";
                    case "CLOSE": return "TIMER";
                    default:      return subAction; // ESSAY_TASK_START, ESSAY_TASK_END 保持原值
                }
            case "PAGE":
                // PAGE|LOAD 使用 action_label 并做必要映射
                return mapPageActionLabel(actionLabel);
            case "TABLE OF CONTENTS":
                return "TABLE_OF_CONTENT";
            default:
                // Annotation / Annotation-SideBar
                if (action.startsWith("Annotation")) {
                    if ("Closed".equals(subAction)) {
                        // 关闭侧边栏后，action_label代表回到的页面上下文
                        return mapPageActionLabel(actionLabel);
                    }
                    // Opened / TextSelected / Created 等直接使用action_label
                    return actionLabel;
                }
                // SCAFFOLD_LOG
                if (action.startsWith("SCAFFOLD")) {
                    return "INTERACT_SCAFFOLD";
                }
                return actionLabel;
        }
    }

    /**
     * 将页面上下文label映射到regex pattern中使用的label
     */
    private String mapPageActionLabel(String actionLabel) {
        if (actionLabel == null) return null;
        switch (actionLabel) {
            case "GENERAL_INSTRUCTION": return "TASK_REQUIREMENT";
            case "NAVIGATION":          return "PAGE_NAVIGATION";
            case "_READING":            return "RELEVANT_READING";   // 缺少前缀，默认为RELEVANT
            case "_REREADING":          return "RELEVANT_REREADING"; // 缺少前缀，默认为RELEVANT
            default:                    return actionLabel; // RELEVANT_READING, RUBRIC 等直接使用
        }
    }
}
