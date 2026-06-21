package com.monash.flora_backend;

import com.monash.flora_backend.constant.MyConstantMariaModelSRLPattern;
import org.ahocorasick.trie.Emit;
import org.ahocorasick.trie.Trie;
import org.junit.jupiter.api.Test;

import java.util.Collection;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class FastStringMatchTest extends FLoRaBackendApplicationTests{

    //TODO this method could increase the pattern matching speed.


    String allActionsStr = "ESSAY===== -> READING===== -> READING===== -> READING===== -> ESSAY===== -> ESSAY===== -> ESSAY=====";
    List<String> srlProcessPatternList = List.of("MCE1", "MCE2", "MCE3", "MCE4", "MCP1",
            "MCP3", "MCO1", "MCO3", "MCO4",  "MCM2", "MCM3", "MCM1", "MCM5", "MCM8", "MCM9",
            "HCEO2", "HCEO1", "HCEO4", "LCR1", "LCF1",  "LCF3", "LCF2", "MCP4", "MCM6", "MCM7",
            "MCM4", "MCO2", "HCEO5", "HCEO6", "HCEO3",  "LCR2", "LCF4", "MCO5");
    private void method1() {
        Trie trie = Trie.builder()
                .ignoreOverlaps()
                .addKeyword("(?:\\d+--CHECK_WORD_COUNT=====)+")
                .addKeyword("hot chocolate")
                .build();
        Collection<Emit> emits = trie.parseText("hot chocolate");
        emits.forEach(System.out::println);
    }

    private void method2() {
        for (String srlProcess : srlProcessPatternList) {

            String pattern = MyConstantMariaModelSRLPattern.MARIA_MODEL_PROCESS_PATTERN_REGEX_MAP.get(srlProcess);
            Pattern regex = Pattern.compile(pattern);
            Matcher matcher = regex.matcher(allActionsStr);

            while (matcher.find()) {
                String[] strings = matcher.group().split("=====");
                System.out.println(matcher.group());
            }
        }
    }

    @Test
    public void test1() {
        long startTime1 = System.currentTimeMillis();

        method1();

        long endTime1 = System.currentTimeMillis();
        long duration1 = endTime1 - startTime1;
        System.out.println("执行时间：" + duration1 + " 毫秒");


        long startTime2 = System.currentTimeMillis();

        method2();

        long endTime2 = System.currentTimeMillis();
        long duration2 = endTime2 - startTime2;
        System.out.println("执行时间：" + duration2 + " 毫秒");



    }
}
