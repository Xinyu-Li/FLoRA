package com.monash.flora_backend.data_reprocess;

import com.alibaba.excel.EasyExcel;
import com.alibaba.excel.ExcelWriter;
import com.alibaba.excel.write.metadata.WriteSheet;
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

public class ReprocessCella3FromExcelTest extends FLoRaBackendApplicationTests {

    @Autowired
    private ActionAndProcessService actionAndProcessService;

    private static final int BATCH_SIZE = 20;

    private static final String[] HEADER_ORDER = {
            "id", "user_id", "save_time", "username", "url", "firstname", "lastname",
            "source", "page_event", "target_object", "instant_event", "sub_action_label",
            "screen_x", "screen_y", "client_x", "client_y",
            "window_inner_width", "window_inner_height", "screen_width", "screen_height",
            "event_value", "process_label", "course_id",
            "action_label", "detailed_action_label", "model_type"
    };

    @Test
    public void processExcelSRLProcessLabel() throws Exception {
        String inputPath = "src/main/resources/flora_annotation_trace_data_netherlands.xlsx";
        String outputPath = "src/main/resources/flora_annotation_trace_data_relabelled_bannert.xlsx";

        try (ZipFile zipFile = new ZipFile(inputPath)) {
            // 1. 加载 sharedStrings（一次）
            System.out.println("Step 1: Loading shared strings...");
            List<String> sharedStrings = loadSharedStrings(zipFile);
            System.out.println("  Shared strings loaded: " + sharedStrings.size());

            // 2. 解析表头，得到 header_name -> column_letter
            System.out.println("Step 2: Parsing header...");
            Map<String, String> headerToCol = parseHeader(zipFile, sharedStrings);
            System.out.println("  Header mapping: " + headerToCol);

            // 3. 第一遍：仅扫描所有 (user_id, course_id) 唯一对
            System.out.println("Step 3: Scanning all (user_id, course_id) keys...");
            List<String> allKeys = new ArrayList<>(scanGroupKeys(zipFile, sharedStrings, headerToCol));
            System.out.println("  Total groups: " + allKeys.size());

            // 4. 创建 ExcelWriter，按批次追加写入
            List<List<String>> headList = new ArrayList<>();
            for (String h : HEADER_ORDER) headList.add(Collections.singletonList(h));

            ExcelWriter writer = EasyExcel.write(outputPath).head(headList).build();
            WriteSheet sheet = EasyExcel.writerSheet("trace").build();

            try {
                int totalBatches = (allKeys.size() + BATCH_SIZE - 1) / BATCH_SIZE;
                for (int b = 0; b < totalBatches; b++) {
                    int from = b * BATCH_SIZE;
                    int to = Math.min(from + BATCH_SIZE, allKeys.size());
                    Set<String> batchKeys = new HashSet<>(allKeys.subList(from, to));
                    System.out.println("Step 4: batch " + (b + 1) + "/" + totalBatches
                            + " (groups " + from + ".." + to + ")");

                    // 4a. 仅读取本批 keys 对应的行
                    List<TraceData> batchData = readBatchRows(zipFile, sharedStrings, headerToCol, batchKeys);
                    System.out.println("  rows loaded: " + batchData.size());

                    // 4b. 清除 process label
                    batchData.forEach(td -> td.setProcessLabel(null));

                    // 4c. 按 (userId, courseId) 分组并执行 maria SRL pattern matching（仅内存更新）
                    runMariaSrlOnBatch(batchData);

                    // 4d. 追加写入输出文件
                    writer.write(toRows(batchData), sheet);
                }
            } finally {
                writer.finish();
            }
            System.out.println("Done. Output: " + outputPath);
        }
    }


    /**
     * 目前只支持Maria 模型
     * @param batchData
     */
    private void runMariaSrlOnBatch(List<TraceData> batchData) {
        Map<String, List<TraceData>> groupMap = batchData.stream()
                .filter(td -> td.getUserId() != null && td.getSaveTime() != null && td.getCourseId() != null)
                .collect(Collectors.groupingBy(
                        td -> td.getUserId() + "::" + td.getCourseId(),
                        LinkedHashMap::new,
                        Collectors.toList()));

        for (Map.Entry<String, List<TraceData>> entry : groupMap.entrySet()) {
            List<TraceData> traceDataList = entry.getValue();
            traceDataList.sort(Comparator.comparingLong(td -> Long.parseLong(td.getSaveTime())));

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
            if (taskStartTime == -1) continue;

            long timeBreakpoint = taskStartTime + 15L * 60 * 1000;
            List<TraceData> beforeList = new ArrayList<>();
            List<TraceData> afterList = new ArrayList<>();
            for (TraceData td : traceDataList) {
                if (Long.parseLong(td.getSaveTime()) <= timeBreakpoint) beforeList.add(td);
                else afterList.add(td);
            }

            List<TraceData> needUpdateList = new ArrayList<>();
            actionAndProcessService.findSrlProcess(beforeList,
                    MyConstantMariaModelSRLPattern.BEFORE_15MIN_MARIA_MODEL_PROCESS_PATTERN_LIST,
                    "maria", needUpdateList,
                    MyConstantMariaModelSRLPattern.MARIA_MODEL_PROCESS_PATTERN_REGEX_MAP);
            actionAndProcessService.findSrlProcess(afterList,
                    MyConstantMariaModelSRLPattern.AFTER_15MIN_MARIA_MODEL_PROCESS_PATTERN_LIST,
                    "maria", needUpdateList,
                    MyConstantMariaModelSRLPattern.MARIA_MODEL_PROCESS_PATTERN_REGEX_MAP);

            Map<Long, String> processLabelMap = new HashMap<>(needUpdateList.size() * 2);
            for (TraceData td : needUpdateList) {
                processLabelMap.put(td.getId(), td.getProcessLabel());
            }
            int labelled = 0;
            for (TraceData td : traceDataList) {
                String label = processLabelMap.get(td.getId());
                if (label != null) {
                    td.setProcessLabel(label);
                    labelled++;
                }
            }
            System.out.println("    " + entry.getKey() + ": " + traceDataList.size()
                    + " rows, " + labelled + " labelled");
        }
    }


    // ==================== Excel 读取工具 ====================

    private List<String> loadSharedStrings(ZipFile zipFile) throws Exception {
        List<String> sharedStrings = new ArrayList<>();
        ZipEntry ssEntry = zipFile.getEntry("xl/sharedStrings.xml");
        if (ssEntry == null) return sharedStrings;

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
        return sharedStrings;
    }

    private Map<String, String> parseHeader(ZipFile zipFile, List<String> sharedStrings) throws Exception {
        ZipEntry sheetEntry = zipFile.getEntry("xl/worksheets/sheet1.xml");
        if (sheetEntry == null) throw new RuntimeException("Sheet1 not found");

        Map<String, String> firstRow = new LinkedHashMap<>();
        try (InputStream is = zipFile.getInputStream(sheetEntry)) {
            XMLStreamReader reader = XMLInputFactory.newInstance().createXMLStreamReader(is);
            String currentCellRef = null;
            String currentCellCol = null;
            String currentCellType = null;
            boolean inV = false;
            StringBuilder cellValue = new StringBuilder();
            boolean firstRowDone = false;
            int cellIndex = 0;

            while (reader.hasNext() && !firstRowDone) {
                int event = reader.next();
                if (event == XMLStreamConstants.START_ELEMENT) {
                    String name = reader.getLocalName();
                    if ("row".equals(name)) {
                        cellIndex = 0;
                    } else if ("c".equals(name)) {
                        currentCellRef = reader.getAttributeValue(null, "r");
                        currentCellCol = currentCellRef != null
                                ? extractColumnFromRef(currentCellRef)
                                : columnNameFromIndex(cellIndex);
                        currentCellType = reader.getAttributeValue(null, "t");
                        cellValue.setLength(0);
                        cellIndex++;
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
                        String col = currentCellCol;
                        String val = cellValue.toString();
                        if ("s".equals(currentCellType) && !val.isEmpty()) {
                            int idx = Integer.parseInt(val);
                            val = idx < sharedStrings.size() ? sharedStrings.get(idx) : val;
                        }
                        firstRow.put(col, val);
                    } else if ("row".equals(name)) {
                        firstRowDone = true;
                    }
                }
            }
            reader.close();
        }

        Map<String, String> headerToCol = new HashMap<>();
        boolean looksLikeHeader = firstRow.values().stream()
                .anyMatch(v -> v != null && v.matches("[a-z_]+"));
        if (looksLikeHeader) {
            for (Map.Entry<String, String> e : firstRow.entrySet()) {
                headerToCol.put(e.getValue(), e.getKey());
            }
        } else {
            int idx = 0;
            for (String col : firstRow.keySet()) {
                if (idx < HEADER_ORDER.length) headerToCol.put(HEADER_ORDER[idx++], col);
            }
        }
        return headerToCol;
    }

    /**
     * 第一遍扫描：只取 user_id 和 course_id 两列，收集所有唯一组合。
     */
    private LinkedHashSet<String> scanGroupKeys(ZipFile zipFile, List<String> sharedStrings,
                                                Map<String, String> headerToCol) throws Exception {
        String userIdCol = headerToCol.get("user_id");
        String courseIdCol = headerToCol.get("course_id");
        if (userIdCol == null || courseIdCol == null) {
            throw new RuntimeException("user_id or course_id column not found in header");
        }

        LinkedHashSet<String> keys = new LinkedHashSet<>();
        ZipEntry sheetEntry = zipFile.getEntry("xl/worksheets/sheet1.xml");

        try (InputStream is = zipFile.getInputStream(sheetEntry)) {
            XMLStreamReader reader = XMLInputFactory.newInstance().createXMLStreamReader(is);
            String currentCellRef = null;
            String currentCellCol = null;
            String currentCellType = null;
            boolean inV = false;
            StringBuilder cellValue = new StringBuilder();
            int rowCount = 0;
            String userIdVal = null;
            String courseIdVal = null;
            int cellIndex = 0;

            while (reader.hasNext()) {
                int event = reader.next();
                if (event == XMLStreamConstants.START_ELEMENT) {
                    String name = reader.getLocalName();
                    if ("row".equals(name)) {
                        userIdVal = null;
                        courseIdVal = null;
                        cellIndex = 0;
                    } else if ("c".equals(name)) {
                        currentCellRef = reader.getAttributeValue(null, "r");
                        currentCellCol = currentCellRef != null
                                ? extractColumnFromRef(currentCellRef)
                                : columnNameFromIndex(cellIndex);
                        currentCellType = reader.getAttributeValue(null, "t");
                        cellValue.setLength(0);
                        cellIndex++;
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
                        String col = currentCellCol;
                        if (col.equals(userIdCol) || col.equals(courseIdCol)) {
                            String val = cellValue.toString();
                            if ("s".equals(currentCellType) && !val.isEmpty()) {
                                int idx = Integer.parseInt(val);
                                val = idx < sharedStrings.size() ? sharedStrings.get(idx) : val;
                            }
                            if (col.equals(userIdCol)) userIdVal = val;
                            else courseIdVal = val;
                        }
                    } else if ("row".equals(name)) {
                        rowCount++;
                        if (rowCount > 1 && userIdVal != null && courseIdVal != null
                                && !userIdVal.isEmpty() && !courseIdVal.isEmpty()) {
                            keys.add(userIdVal + "::" + courseIdVal);
                        }
                        if (rowCount % 200000 == 0) {
                            System.out.println("    scanned " + rowCount + " rows, found " + keys.size() + " keys");
                        }
                    }
                }
            }
            reader.close();
        }
        return keys;
    }

    /**
     * 分批读取：流式扫描 sheet1.xml，仅保留 (user_id, course_id) 命中本批 keys 的行。
     */
    private List<TraceData> readBatchRows(ZipFile zipFile, List<String> sharedStrings,
                                          Map<String, String> headerToCol, Set<String> batchKeys) throws Exception {
        String userIdCol = headerToCol.get("user_id");
        String courseIdCol = headerToCol.get("course_id");

        List<TraceData> result = new ArrayList<>();
        ZipEntry sheetEntry = zipFile.getEntry("xl/worksheets/sheet1.xml");

        try (InputStream is = zipFile.getInputStream(sheetEntry)) {
            XMLStreamReader reader = XMLInputFactory.newInstance().createXMLStreamReader(is);
            Map<String, String> currentRowCells = new LinkedHashMap<>();
            String currentCellRef = null;
            String currentCellCol = null;
            String currentCellType = null;
            boolean inV = false;
            StringBuilder cellValue = new StringBuilder();
            int rowCount = 0;
            int cellIndex = 0;

            while (reader.hasNext()) {
                int event = reader.next();
                if (event == XMLStreamConstants.START_ELEMENT) {
                    String name = reader.getLocalName();
                    if ("row".equals(name)) {
                        currentRowCells.clear();
                        cellIndex = 0;
                    } else if ("c".equals(name)) {
                        currentCellRef = reader.getAttributeValue(null, "r");
                        currentCellCol = currentCellRef != null
                                ? extractColumnFromRef(currentCellRef)
                                : columnNameFromIndex(cellIndex);
                        currentCellType = reader.getAttributeValue(null, "t");
                        cellValue.setLength(0);
                        cellIndex++;
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
                        String col = currentCellCol;
                        String val = cellValue.toString();
                        if ("s".equals(currentCellType) && !val.isEmpty()) {
                            int idx = Integer.parseInt(val);
                            val = idx < sharedStrings.size() ? sharedStrings.get(idx) : val;
                        }
                        if (!"d".equals(currentCellType)) {
                            currentRowCells.put(col, val);
                        }
                    } else if ("row".equals(name)) {
                        rowCount++;
                        if (rowCount > 1) {
                            String userIdVal = currentRowCells.get(userIdCol);
                            String courseIdVal = currentRowCells.get(courseIdCol);
                            if (userIdVal != null && courseIdVal != null
                                    && batchKeys.contains(userIdVal + "::" + courseIdVal)) {
                                TraceData td = buildTraceDataFromRow(currentRowCells, headerToCol);
                                if (td != null) result.add(td);
                            }
                        }
                    }
                }
            }
            reader.close();
        }
        return result;
    }

    private String columnNameFromIndex(int zeroBasedIndex) {
        StringBuilder col = new StringBuilder();
        int index = zeroBasedIndex;
        do {
            col.insert(0, (char) ('A' + (index % 26)));
            index = index / 26 - 1;
        } while (index >= 0);
        return col.toString();
    }


    private String extractColumnFromRef(String ref) {
        if (ref == null) return "";
        StringBuilder col = new StringBuilder();
        for (char c : ref.toCharArray()) {
            if (Character.isLetter(c)) col.append(c);
            else break;
        }
        return col.toString();
    }

    private TraceData buildTraceDataFromRow(Map<String, String> rowCells, Map<String, String> headerToCol) {
        TraceData td = new TraceData();
        Long id = parseLong(getValueByHeader(rowCells, headerToCol, "id"));
        if (id == null) return null;
        td.setId(id);
        td.setUserId(parseLong(getValueByHeader(rowCells, headerToCol, "user_id")));
        td.setSaveTime(getValueByHeader(rowCells, headerToCol, "save_time"));
        td.setUsername(getValueByHeader(rowCells, headerToCol, "username"));
        td.setUrl(getValueByHeader(rowCells, headerToCol, "url"));
        td.setFirstname(getValueByHeader(rowCells, headerToCol, "firstname"));
        td.setLastname(getValueByHeader(rowCells, headerToCol, "lastname"));
        td.setSource(getValueByHeader(rowCells, headerToCol, "source"));
        td.setPageEvent(getValueByHeader(rowCells, headerToCol, "page_event"));
        td.setTargetObject(getValueByHeader(rowCells, headerToCol, "target_object"));
        td.setInstantEvent(getValueByHeader(rowCells, headerToCol, "instant_event"));
        td.setSubActionLabel(getValueByHeader(rowCells, headerToCol, "sub_action_label"));
        td.setScreenX(getValueByHeader(rowCells, headerToCol, "screen_x"));
        td.setScreenY(getValueByHeader(rowCells, headerToCol, "screen_y"));
        td.setClientX(getValueByHeader(rowCells, headerToCol, "client_x"));
        td.setClientY(getValueByHeader(rowCells, headerToCol, "client_y"));
        td.setWindowInnerWidth(getValueByHeader(rowCells, headerToCol, "window_inner_width"));
        td.setWindowInnerHeight(getValueByHeader(rowCells, headerToCol, "window_inner_height"));
        td.setScreenWidth(getValueByHeader(rowCells, headerToCol, "screen_width"));
        td.setScreenHeight(getValueByHeader(rowCells, headerToCol, "screen_height"));
        td.setEventValue(getValueByHeader(rowCells, headerToCol, "event_value"));
        td.setProcessLabel(getValueByHeader(rowCells, headerToCol, "process_label"));
        td.setCourseId(getValueByHeader(rowCells, headerToCol, "course_id"));
        td.setActionLabel(getValueByHeader(rowCells, headerToCol, "action_label"));
        td.setDetailedActionLabel(getValueByHeader(rowCells, headerToCol, "detailed_action_label"));
        td.setModelType(getValueByHeader(rowCells, headerToCol, "model_type"));
        return td;
    }

    private String getValueByHeader(Map<String, String> rowCells, Map<String, String> headerToCol, String headerName) {
        String col = headerToCol.get(headerName);
        return col != null ? rowCells.get(col) : null;
    }

    private Long parseLong(String value) {
        if (value == null || value.isEmpty()) return null;
        try {
            if (value.contains(".")) return (long) Double.parseDouble(value);
            return Long.parseLong(value);
        } catch (NumberFormatException e) {
            return null;
        }
    }


    // ==================== Excel 写入工具 ====================

    private List<List<Object>> toRows(List<TraceData> dataList) {
        List<List<Object>> rows = new ArrayList<>(dataList.size());
        for (TraceData td : dataList) {
            List<Object> row = new ArrayList<>(HEADER_ORDER.length);
            row.add(td.getId());
            row.add(td.getUserId());
            row.add(td.getSaveTime());
            row.add(td.getUsername());
            row.add(td.getUrl());
            row.add(td.getFirstname());
            row.add(td.getLastname());
            row.add(td.getSource());
            row.add(td.getPageEvent());
            row.add(td.getTargetObject());
            row.add(td.getInstantEvent());
            row.add(td.getSubActionLabel());
            row.add(td.getScreenX());
            row.add(td.getScreenY());
            row.add(td.getClientX());
            row.add(td.getClientY());
            row.add(td.getWindowInnerWidth());
            row.add(td.getWindowInnerHeight());
            row.add(td.getScreenWidth());
            row.add(td.getScreenHeight());
            row.add(td.getEventValue());
            row.add(td.getProcessLabel());
            row.add(td.getCourseId());
            row.add(td.getActionLabel());
            row.add(td.getDetailedActionLabel());
            row.add(td.getModelType());
            rows.add(row);
        }
        return rows;
    }
}
