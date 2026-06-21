package com.monash.flora_backend.controller.vo;

import lombok.Data;

import java.util.List;
import java.util.Set;

@Data
public class InitializeServerVO {
    private String modalContent;
    private boolean useExternalChatService;
    private Set<Long> irrelevantReadingPageIdSet;
    private Set<Long> taskOverviewReadingPageIdSet;
    private Set<Long> taskRequirementReadingPageIdSet;
    private Set<Long> learningGoalReadingPageIdSet;
    private Set<Long> rubricReadingPageIdSet;

    private List<Long> courseIdList;
    private String websiteAddress;
    private List<String> studyNameList;
}
