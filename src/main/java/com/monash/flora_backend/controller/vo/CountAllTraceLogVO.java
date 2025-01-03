package com.monash.flora_backend.controller.vo;

import lombok.Data;

/**
 * @author Xinyu Li
 * @date 3/11/2024
 */
@Data
public class CountAllTraceLogVO {
    private boolean hasEssayData;
    private boolean hasTraceData;
    private boolean hasAnnotationData;
    private boolean hasPlannerData;
    private boolean hasChatgptLogData;
    private boolean hasTeacherChatLogData;

    private boolean hasGrammarData;
    private boolean hasIntegrationElaborationData;
    private boolean hasOriginalityData;
    private boolean hasAcademicData;

    private boolean hasDictionaryLogData;
    private boolean hasGptScaffoldData;
    private boolean hasRuleBasedScaffoldData;

}
