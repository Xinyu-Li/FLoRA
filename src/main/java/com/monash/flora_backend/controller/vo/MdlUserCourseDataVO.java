package com.monash.flora_backend.controller.vo;

import lombok.Data;

@Data
public class MdlUserCourseDataVO {
    private Long courseId;
    private String courseFullname;
    private Long category;
    private String timecreated;

    private boolean hasEssayData;
    private boolean hasTraceData;
    private boolean hasAnnotationData;
    private boolean hasPlannerData;
    private boolean hasChatgptLogData;
    private boolean hasTeacherChatLogData;
    private boolean hasChecklistLogData;
    private boolean hasDictionaryLogData;
    private boolean hasGptScaffoldData;
    private boolean hasRuleBasedScaffoldData;

    private boolean hasQuizData;
    private boolean hasSurveyData;
    private boolean hasFeedbackData;
    private boolean hasQuestionnaireData;


}
