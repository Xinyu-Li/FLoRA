package com.monash.flora_backend.controller.req.manage;

import com.monash.flora_backend.controller.vo.manage.*;
import lombok.Data;

import java.util.List;

/**
 * @author Xinyu Li
 * @date 2/11/2024
 */
@Data
public class AddUpdateToolsConfigVO {

    private Long id;
    private String genericoTemplateName;
    private Integer genericoTemplateIndex;

    private Boolean useTimerTool;
    private Integer totalMinutes;
    private Boolean unlimitedTime;
    private Integer hintMinutesBeforeEnd;


    private Boolean useAnnotationTool;
    private Boolean usePlannerTool;
    private Boolean useWriteEssayTool;
    private Boolean useScaffoldTool;

    private Boolean useGPTScaffoldTool;
    private Boolean useCollaborativeWriteEssayTool;
    private Boolean useChatgptTool;
    private Boolean useChecklistToolGrammar;
    private Boolean useChecklistToolAcademic;
    private Boolean useChecklistToolOriginality;
    private Boolean useChecklistToolClassification;
    private Boolean useDictionaryTool;
    private Boolean useTeacherChat;
    private Boolean useVideoRecordingTool;

    private String annotationTakeNoteLabel;

    private List<ConfigAnnotationLabelColorVO> annotationLabelColors;

    private String plannerSelectStrategyHint;
    private String plannerAllocateTimeHint;
    private String plannerSelectSkillsHint;
    private String plannerSavePlanHint;

    private List<ConfigPlannerVO> plannerAllStrategy;

    private List<String> defaultStep3ReadingStrategy;
    private String plannerReadingInstruction;
    private List<String> defaultStep3WritingStrategy;
    private String plannerWritingInstruction;
    private String plannerCustomisePlanInstruction;

    private List<ConfigRuleBasedScaffoldingVO> scaffoldingContent;

    private String srlModel;
    private String gptScaffoldRole;
    private String gptScaffoldRoleDescription;
    private Boolean gptScaffoldPromptIncludeEssay;
    private String gptScaffoldPromptTemplate;

    private List<String> gptScaffoldBackgroundFileNameList;

    private Integer gptScaffoldParametersMaxResponseToken;
    private Integer gptScaffoldParametersN;
    private Integer gptScaffoldParametersTemperature;

    private String testIsdimuName;
    private String preTestName;
    private String hasTakePreviousStudyTestName;

    private Integer testIsdimuCourseId;
    private Integer hasTakePreviousStudyTestNameCourseId;
    private Integer preTestNameCourseId;
    private List<ThresholdPromptVO> isdimuScorePrompt;
    private List<ThresholdPromptVO> preTestGradesPrompt;

    private String userTakePreviousStudyPrompt;
    private List<String> classifySentenceBackgroundFileNameList;

    private List<NeedCheckSubActionPromptVO> gptScaffoldNeedCheckSubActionPrompt;
    private List<String> gptScaffoldNeedCheckSavePlannerSelectIndexPrompt;
    private List<GptScaffoldPromptVO> gptScaffoldNeedCheckSRLProcessPrompt;

    private String toolsLanguage;

    private Boolean useWriteEssayWordCountButton;

    private Boolean useCollaborativeWriteEssayWordCountButton;
    private Boolean includeChatgptToCollaborativeWriteEssay;
    private String dictionarySourceLanguage;
    private String dictionaryTargetLanguage;

    // ChatGPT
    private List<String> chatgptBackgroundFileNameList;
    private String chatgptRoleDescription;
    private String chatgptRole;
    private Boolean chatgptPromptIncludeEssay;
    private Integer chatgptParametersMaxResponseToken;
    private Integer chatgptParametersN;
    private Integer chatgptParametersTemperature;

    private List<AgentsConfig> agentsConfig;










//    private List<String> annotationDefaultLabel;
//    private String[] annotationDefaultLabelColor;
//
//
//    private int[] scaffoldShowingTime;
//    private String[] scaffoldPromptMessage;
//    private String[][] scaffoldContent;
//
//
//    private boolean useWriteEssayWordCountButton;
//    private boolean useCollaborativeWriteEssayTool;
//    private boolean useCollaborativeWriteEssayWordCountButton;
//    private boolean includeChatgptToCollaborativeWriteEssay;
//
//
//    private String[] plannerOverallStrategy;
//    private String[][] plannerStep2Task;
//    private String[] plannerStep2Instruction;
//
//    private String[] defaultStep3ReadingStrategy;
//    private String defaultStep3ReadingInstruction;
//    private String[] defaultStep3WritingStrategy;
//    private String defaultStep3WritingInstruction;
//    private String customiseStep2Instruction;
//
//    private boolean useChatgptTool;
//    private String chatgptPrompt;
//    private int[] includeSurveyToChatgptPrompt;
//
//    private boolean useChecklistTool;
//    private boolean useChecklistToolGrammar;
//    private boolean useChecklistToolAcademic;
//    private boolean useChecklistToolOriginality;
//    private boolean useChecklistToolClassification;
//
//    private boolean useDictionaryTool;
//    private String dictionarySourceLanguage;
//    private String dictionaryTargetLanguage;
//
//    private boolean useTeacherChat;
//
//
//
//    private boolean useVideoRecordingTool;
//
//    private String toolsLanguage;
}
