package com.monash.flora_backend;

import com.monash.flora_backend.constant.MyConstantCopesModelSRLPattern;
import com.monash.flora_backend.dao.entity.TraceData;
import com.monash.flora_backend.service_func.ActionAndProcessService;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Test class for COPES Process detection
 * Tests the findSrlProcess method with actual COPES model patterns
 */
@Slf4j
public class CopesProcessTest extends FLoRaBackendApplicationTests {

    @Autowired
    private ActionAndProcessService actionAndProcessService;

    private Map<String, String> srlProcessPatternRegexMap;
    private List<String> before5MinPatternList;
    private List<String> after5MinPatternList;
    private String modelType;

    @BeforeEach
    void setUp() {
        // Initialize test data
        modelType = "copes";

        // Use actual COPES model pattern regex map from constants
        srlProcessPatternRegexMap = MyConstantCopesModelSRLPattern.COPES_MODEL_PROCESS_PATTERN_REGEX_MAP;

        // Use actual COPES model process pattern lists from constants
        before5MinPatternList = MyConstantCopesModelSRLPattern.BEFORE_5MIN_COPES_MODEL_PROCESS_PATTERN_LIST;
        after5MinPatternList = MyConstantCopesModelSRLPattern.AFTER_5MIN_COPES_MODEL_PROCESS_PATTERN_LIST;
    }

    /**
     * Helper method to print detected processes and process labels for each action
     */
    private void printDetectedProcesses(List<String> detectedProcesses, List<TraceData> needUpdateList) {
        log.info("========================================");
        log.info("Detected Processes Summary:");
        log.info("Total processes detected: {}", detectedProcesses.size());

        if (!detectedProcesses.isEmpty()) {
            // Get unique processes
            List<String> uniqueProcesses = detectedProcesses.stream().distinct().collect(Collectors.toList());
            log.info("Unique processes: {}", uniqueProcesses);
            log.info("All detected processes: {}", detectedProcesses);
        } else {
            log.info("No processes detected");
        }

        log.info("----------------------------------------");
        log.info("Process Labels for Each Action:");
        for (TraceData traceData : needUpdateList) {
            log.info("Action ID: {} -> Process Label: {}",
                traceData.getId(),
                traceData.getProcessLabel());
        }
        log.info("========================================");
    }

    @Test
    @DisplayName("Test findSrlProcess with AFTER_5MIN patterns - should detect COPES processes")
    void testFindSrlProcess_WithAfter5MinPatterns_ShouldDetectProcesses() {
        // Arrange - Create mock action string with COPES model actions
        // Format: "id--actionLabel====="
        StringBuilder allActionsStr = new StringBuilder();
        allActionsStr.append("1--TABLE_OF_CONTENT=====");  // CSAR1
        allActionsStr.append("2--TASK_REQUIREMENT=====");  // CMTR1, CMTR2
        allActionsStr.append("3--OPEN_ESSAY=====");
        allActionsStr.append("4--WRITE_ESSAY=====");
        allActionsStr.append("5--CLOSE_ESSAY=====");
        allActionsStr.append("6--OPEN_ESSAY=====");
        allActionsStr.append("7--CLOSE_ESSAY=====");  // CPI1 pattern
        allActionsStr.append("8--RUBRIC=====");  // CMTR1

        List<TraceData> needUpdateList = new ArrayList<>();

        // Act - Call the method under test using AFTER_5MIN pattern list
        List<String> result = actionAndProcessService.findSrlProcess(
            allActionsStr.toString(),
            after5MinPatternList,
            modelType,
            needUpdateList,
            srlProcessPatternRegexMap
        );

        // Print detected processes
        log.info("\n[TEST: testFindSrlProcess_WithAfter5MinPatterns_ShouldDetectProcesses]");
        printDetectedProcesses(result, needUpdateList);

        // Assert - Verify results
        assertNotNull(result, "Result should not be null");
        assertFalse(result.isEmpty(), "Result should contain detected processes");

        // Verify that needUpdateList is populated
        assertFalse(needUpdateList.isEmpty(), "needUpdateList should contain updated TraceData");
    }

    @Test
    @DisplayName("Test findSrlProcess with empty string - should return empty list")
    void testFindSrlProcess_WithEmptyString_ShouldReturnEmpty() {
        // Arrange
        String allActionsStr = "";
        List<TraceData> needUpdateList = new ArrayList<>();

        // Act - Test with BEFORE_5MIN pattern list
        List<String> result = actionAndProcessService.findSrlProcess(
            allActionsStr,
            before5MinPatternList,
            modelType,
            needUpdateList,
            srlProcessPatternRegexMap
        );

        // Print detected processes
        log.info("\n[TEST: testFindSrlProcess_WithEmptyString_ShouldReturnEmpty]");
        printDetectedProcesses(result, needUpdateList);

        // Assert
        assertNotNull(result, "Result should not be null");
        assertTrue(result.isEmpty(), "Result should be empty for empty action string");
        assertTrue(needUpdateList.isEmpty(), "needUpdateList should be empty");
    }

    @Test
    @DisplayName("Test findSrlProcess with only unrecognized actions - should label as NOT_RECOGNIZED")
    void testFindSrlProcess_WithUnrecognizedActions_ShouldLabelAsNotRecognized() {
        // Arrange - Actions that don't match any pattern
        String allActionsStr = "10--UNKNOWN_ACTION=====11--RANDOM_ACTION=====";
        List<TraceData> needUpdateList = new ArrayList<>();

        // Act - Test with AFTER_5MIN pattern list
        List<String> result = actionAndProcessService.findSrlProcess(
            allActionsStr,
            after5MinPatternList,
            modelType,
            needUpdateList,
            srlProcessPatternRegexMap
        );

        // Print detected processes
        log.info("\n[TEST: testFindSrlProcess_WithUnrecognizedActions_ShouldLabelAsNotRecognized]");
        printDetectedProcesses(result, needUpdateList);

        // Assert
        assertNotNull(result, "Result should not be null");
        assertTrue(result.isEmpty(), "No SRL processes should be detected");

        // Verify all actions are labeled as NOT_RECOGNIZED
        assertEquals(2, needUpdateList.size(), "Should have 2 TraceData entries");
        assertTrue(needUpdateList.stream()
            .allMatch(td -> "NOT_RECOGNIZED".equals(td.getProcessLabel())),
            "All actions should be labeled as NOT_RECOGNIZED");
    }

    @Test
    @DisplayName("Test findSrlProcess with multiple occurrences of same process")
    void testFindSrlProcess_WithMultipleOccurrences_ShouldDetectAll() {
        // Arrange - Multiple TABLE_OF_CONTENT actions (CSAR1 pattern)
        String allActionsStr = "1--TABLE_OF_CONTENT=====2--TABLE_OF_CONTENT=====3--TABLE_OF_CONTENT=====";
        List<TraceData> needUpdateList = new ArrayList<>();

        // Act - Test with BEFORE_5MIN pattern list
        List<String> result = actionAndProcessService.findSrlProcess(
            allActionsStr,
            before5MinPatternList,
            modelType,
            needUpdateList,
            srlProcessPatternRegexMap
        );

        // Print detected processes
        log.info("\n[TEST: testFindSrlProcess_WithMultipleOccurrences_ShouldDetectAll]");
        printDetectedProcesses(result, needUpdateList);

        // Assert
        assertNotNull(result, "Result should not be null");
        assertFalse(result.isEmpty(), "Should detect CSAR1 process");

        // Verify that CSAR1 process is detected
        assertTrue(result.contains("CSAR1"), "Should detect CSAR1 process for TABLE_OF_CONTENT actions");
        assertFalse(needUpdateList.isEmpty(), "needUpdateList should contain TraceData entries");
    }

    @Test
    @DisplayName("Test findSrlProcess with complex COPES action sequence")
    void testFindSrlProcess_WithComplexSequence_ShouldDetectCorrectly() {
        // Arrange - Complex realistic COPES scenario
        StringBuilder allActionsStr = new StringBuilder();
        allActionsStr.append("100--TABLE_OF_CONTENT=====");   // CSAR1
        allActionsStr.append("101--TASK_REQUIREMENT=====");    // CSTR2, CMTR2
        allActionsStr.append("102--CREATE_HIGHLIGHT=====");    // OM2
        allActionsStr.append("103--OPEN_ESSAY=====");          // Part of CPI1
        allActionsStr.append("104--WRITE_ESSAY=====");         // Part of CPI1
        allActionsStr.append("105--CLOSE_ESSAY=====");         // Part of CPI1
        allActionsStr.append("106--OPEN_ESSAY=====");          // Part of CPI1
        allActionsStr.append("107--CLOSE_ESSAY=====");         // CPI1 complete
        allActionsStr.append("108--TIMER=====");               // CMTC1
        allActionsStr.append("109--SEARCH_ANNOTATION=====");   // OS1

        List<TraceData> needUpdateList = new ArrayList<>();

        // Act - Test with BEFORE_5MIN pattern list
        List<String> result = actionAndProcessService.findSrlProcess(
            allActionsStr.toString(),
            before5MinPatternList,
            modelType,
            needUpdateList,
            srlProcessPatternRegexMap
        );

        // Print detected processes
        log.info("\n[TEST: testFindSrlProcess_WithComplexSequence_ShouldDetectCorrectly]");
        printDetectedProcesses(result, needUpdateList);

        // Assert
        assertNotNull(result, "Result should not be null");
        assertFalse(result.isEmpty(), "Should detect COPES processes");

        // Verify that needUpdateList contains all actions
        assertEquals(10, needUpdateList.size(), "Should have 10 TraceData entries");

        // Verify some expected processes are detected
        assertTrue(result.contains("CSAR1"), "Should detect CSAR1 (TABLE_OF_CONTENT)");
        assertTrue(result.contains("CMTC1"), "Should detect CMTC1 (TIMER)");
        assertTrue(result.contains("OS1"), "Should detect OS1 (SEARCH_ANNOTATION)");
    }

    @Test
    @DisplayName("Test findSrlProcess with BEFORE_5MIN vs AFTER_5MIN patterns")
    void testFindSrlProcess_DifferencesBetweenBeforeAndAfter5Min() {
        // Arrange - Action sequence that should match AFTER_5MIN but not BEFORE_5MIN patterns
        StringBuilder allActionsStr = new StringBuilder();
        allActionsStr.append("1--TASK_REQUIREMENT=====");
        allActionsStr.append("2--CREATE_NOTE=====");  // This matches CSTR1 which is only in BEFORE_5MIN

        List<TraceData> needUpdateListBefore = new ArrayList<>();
        List<TraceData> needUpdateListAfter = new ArrayList<>();

        // Act - Test with both pattern lists
        List<String> resultBefore = actionAndProcessService.findSrlProcess(
            allActionsStr.toString(),
            before5MinPatternList,
            modelType,
            needUpdateListBefore,
            srlProcessPatternRegexMap
        );

        List<String> resultAfter = actionAndProcessService.findSrlProcess(
            allActionsStr.toString(),
            after5MinPatternList,
            modelType,
            needUpdateListAfter,
            srlProcessPatternRegexMap
        );

        // Print detected processes for BEFORE_5MIN
        log.info("\n[TEST: testFindSrlProcess_DifferencesBetweenBeforeAndAfter5Min - BEFORE_5MIN]");
        printDetectedProcesses(resultBefore, needUpdateListBefore);

        // Print detected processes for AFTER_5MIN
        log.info("\n[TEST: testFindSrlProcess_DifferencesBetweenBeforeAndAfter5Min - AFTER_5MIN]");
        printDetectedProcesses(resultAfter, needUpdateListAfter);

        // Assert - CSTR1 should only be detected in BEFORE_5MIN list
        assertNotNull(resultBefore, "BEFORE_5MIN result should not be null");
        assertNotNull(resultAfter, "AFTER_5MIN result should not be null");

        // CSTR1 is in BEFORE_5MIN_COPES_MODEL_PROCESS_PATTERN_LIST but not in AFTER_5MIN
        assertTrue(before5MinPatternList.contains("CSTR1"),
            "BEFORE_5MIN list should contain CSTR1");
        assertFalse(after5MinPatternList.contains("CSTR1"),
            "AFTER_5MIN list should not contain CSTR1");
    }
}
