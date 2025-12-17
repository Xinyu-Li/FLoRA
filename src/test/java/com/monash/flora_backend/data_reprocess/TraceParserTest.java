package com.monash.flora_backend.data_reprocess;

import com.monash.flora_backend.FLoRaBackendApplicationTests;
import com.monash.flora_backend.service_func.ActionAndProcessService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

public class TraceParserTest extends FLoRaBackendApplicationTests {

    @Autowired
    private ActionAndProcessService actionAndProcessService;
    @Test
    public void testParseTrace() {
        actionAndProcessService.labelTimeRangeProcessLabelPatterns(719L, "33", "maria", 0, 5);
    }

    @Test
    public void testCountMap() {
        List<String> srlProcessAppearList = List.of(
                "MCP1", "MCP1", "MCP1", "MCP1", "MCP1", "MCP3", "MCP3", "MCP3", "MCM2", "MCM2",
                "MCM2", "MCM2", "MCM2", "MCM9", "LCF2", "LCF2", "LCF2", "LCF2", "LCF2", "LCF2",
                "LCF2", "LCF2", "LCF2", "LCF2", "LCF2", "MCM4", "MCM4", "HCEO3", "HCEO3", "HCEO3",
                "HCEO3", "HCEO3", "HCEO3", "MCO5"
        );
        Map<String, Integer> srlProcessAppearMap = srlProcessAppearList.stream().collect(Collectors.toMap(Function.identity(), value -> 1, Integer::sum));
        System.out.println(srlProcessAppearMap);
    }
}
