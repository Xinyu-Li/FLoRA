package com.monash.flora_backend.controller.req;


import com.monash.flora_backend.controller.vo.GptScaffoldReturnMessageVO;
import com.monash.flora_backend.controller.vo.manage.GptScaffoldPromptVO;
import com.monash.flora_backend.controller.vo.manage.NeedCheckSRLPromptVO;
import com.monash.flora_backend.controller.vo.manage.NeedCheckSubActionPromptVO;
import com.monash.flora_backend.controller.vo.manage.ThresholdPromptVO;
import lombok.Data;

import java.util.List;

/**
 * @author Administrator
 * @date 1/18/2024
 */
@Data
public class GptScaffoldRequest {
    private Integer gptScaffoldNumber;
//    private LinkedHashMap<String, LinkedHashMap<String, String>> srlProcessAndThresholdAndPromptMap;
//    private List<NeedCheckSRLPromptVO> srlProcessAndThresholdAndPromptList;
    private GptScaffoldPromptVO gptScaffoldPromptVO;
    private String testISDIMUName;
    private String preTestName;
    private String hasTakePreviousStudyTestName;

    private String preTestCourseId;
    private String testISDIMUCourseId;
    private String hasTakePreviousStudyTestNameCourseId;
    private String essay;
//    private LinkedHashMap<String, List<String>> subActionAndPromptMap;
    private List<NeedCheckSubActionPromptVO> subActionAndPromptList;

    private List<String> savePlannerSelectedIndexPromptList;
    private Long userId;
    private String courseId;
    private Boolean includeEssay;
    private String gptScaffoldRole;

    private String gptScaffoldPromptTemplate;

    private String gptScaffoldRoleDescription;
    private String userTakePreviousStudyPrompt;
    private String srlModel;
//    private Integer beginMinute;
//    private Integer endMinute;

    private List<String> classifySentenceBackgroundFileNameList;
//    private LinkedHashMap<String, String> pretestGradesPromptMap;
    private List<ThresholdPromptVO> pretestGradesPrompt;
    private List<String> backgroundFileNameList;
//    private LinkedHashMap<String, String> isdimuScorePromptMap;
    private List<ThresholdPromptVO> isdimuScorePrompt;
    private List<Integer> gptScaffoldParameters;

    private List<NeedCheckSRLPromptVO> srlProcessBackupPromptList;
    private List<GptScaffoldReturnMessageVO> gptScaffoldReturnMessages;
}
