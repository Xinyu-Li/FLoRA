package com.monash.flora_backend.constant;

import java.util.Map;

public class MyConstantForSpecificTask {
    public static Map<String, String> NIJMEGEN_CELLA_STUDY_3_TASK_ID_MAP = Map.ofEntries(
            Map.entry("101", "98"), // Cell task 2 and task 1
            Map.entry("104", "105") // task2 id is key, use task2 id to find task 1 id
    );
}
