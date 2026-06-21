package com.monash.flora_backend.dao.entity;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import com.baomidou.mybatisplus.annotation.TableId;
import java.io.Serializable;
/**
 * <p>
 * 
 * </p>
 *
 * @author xinyu
 * @since 2024-02-15
 */
public class ConfigGenericoTemplate extends Model<ConfigGenericoTemplate> {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;
    private String genericoTemplateName;
    private String genericoTemplateKey;
    private Integer genericoTemplateIndex;
    private Integer totalMinutes;

    private Boolean unlimitedTime;

    private Integer hintMinutesBeforeEnd;

    private String annotationTakeNoteLabel;

//    private String annotationDefaultLabel;
//
//    private String annotationDefaultLabelColor;

    private Boolean useAnnotationTool;

    private Boolean useScaffoldTool;

    private Boolean useGptScaffoldTool;

    private String srlModel;

    private String gptScaffoldRole;

    private String gptScaffoldRoleDescription;

    private Boolean gptScaffoldPromptIncludeEssay;

    private String gptScaffoldPromptTemplate;

    private String gptScaffoldBackgroundFilenameList;

    private String gptScaffoldParameters;

    private String gptScaffoldNeedCheckSavePlannerSelectIndexPrompt;

    private String testIsdimuName;

    private String preTestName;

    private String hasTakePreviousStudyTestName;

    private Integer testIsdimuCourseId;

    private Integer hasTakePreviousStudyTestNameCourseId;

    private Integer preTestNameCourseId;

    private Boolean useWriteEssayTool;

    private Boolean useWriteEssayWordCountButton;

    private Boolean useCollaborativeWriteEssayTool;

    private Boolean useCollaborativeWriteEssayWordCountButton;

    private Boolean includeChatgptToCollaborativeWriteEssay;

    private Boolean usePlannerTool;

    private Boolean useChatgptTool;

    private String chatgptBackgroundFileNameList;

    private String chatgptRoleDescription;

    private String chatgptRole;

    private Boolean chatgptPromptIncludeEssay;

    private String chatgptParameters;

    private Boolean useChecklistTool;

    private Boolean useChecklistToolGrammar;

    private Boolean useChecklistToolAcademic;

    private Boolean useChecklistToolOriginality;

    private Boolean useChecklistToolClassification;

    private Boolean useDictionaryTool;

    // add zoteroNotes tool
    private Boolean useZoteroNotesTool;

    // add processVisual tool
    private Boolean useProcessVisualTool;

    private String dictionarySourceLanguage;

    private String dictionaryTargetLanguage;

    private Boolean useTeacherChat;

    private Boolean useTimerTool;

    private Boolean useVideoRecordingTool;

    private String toolsLanguage;

    private String plannerSelectStrategyHint;

    private String plannerAllocateTimeHint;

    private String plannerSelectSkillsHint;

    private String plannerSavePlanHint;

    private String plannerReadingStrategy;

    private String plannerReadingInstruction;

    private String plannerWritingStrategy;

    private String plannerWritingInstruction;

    private String plannerCustomisePlanInstruction;

    private String userTakePreviousStudyPrompt;

    private String classifySentenceBackgroundFileNameList;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getGenericoTemplateName() {
        return genericoTemplateName;
    }

    public void setGenericoTemplateName(String genericoTemplateName) {
        this.genericoTemplateName = genericoTemplateName;
    }

    public String getGenericoTemplateKey() {
        return genericoTemplateKey;
    }

    public void setGenericoTemplateKey(String genericoTemplateKey) {
        this.genericoTemplateKey = genericoTemplateKey;
    }

    public Integer getGenericoTemplateIndex() {
        return genericoTemplateIndex;
    }

    public void setGenericoTemplateIndex(Integer genericoTemplateIndex) {
        this.genericoTemplateIndex = genericoTemplateIndex;
    }

    public Integer getTotalMinutes() {
        return totalMinutes;
    }

    public void setTotalMinutes(Integer totalMinutes) {
        this.totalMinutes = totalMinutes;
    }

    public Boolean getUnlimitedTime() {
        return unlimitedTime;
    }

    public void setUnlimitedTime(Boolean unlimitedTime) {
        this.unlimitedTime = unlimitedTime;
    }

    public Integer getHintMinutesBeforeEnd() {
        return hintMinutesBeforeEnd;
    }

    public void setHintMinutesBeforeEnd(Integer hintMinutesBeforeEnd) {
        this.hintMinutesBeforeEnd = hintMinutesBeforeEnd;
    }

    public String getAnnotationTakeNoteLabel() {
        return annotationTakeNoteLabel;
    }

    public void setAnnotationTakeNoteLabel(String annotationTakeNoteLabel) {
        this.annotationTakeNoteLabel = annotationTakeNoteLabel;
    }

//    public String getAnnotationDefaultLabel() {
//        return annotationDefaultLabel;
//    }
//
//    public void setAnnotationDefaultLabel(String annotationDefaultLabel) {
//        this.annotationDefaultLabel = annotationDefaultLabel;
//    }
//
//    public String getAnnotationDefaultLabelColor() {
//        return annotationDefaultLabelColor;
//    }
//
//    public void setAnnotationDefaultLabelColor(String annotationDefaultLabelColor) {
//        this.annotationDefaultLabelColor = annotationDefaultLabelColor;
//    }

    public Boolean getUseAnnotationTool() {
        return useAnnotationTool;
    }

    public void setUseAnnotationTool(Boolean useAnnotationTool) {
        this.useAnnotationTool = useAnnotationTool;
    }

    public Boolean getUseScaffoldTool() {
        return useScaffoldTool;
    }

    public void setUseScaffoldTool(Boolean useScaffoldTool) {
        this.useScaffoldTool = useScaffoldTool;
    }

    public Boolean getUseGptScaffoldTool() {
        return useGptScaffoldTool;
    }

    public void setUseGptScaffoldTool(Boolean useGptScaffoldTool) {
        this.useGptScaffoldTool = useGptScaffoldTool;
    }

    public String getSrlModel() {
        return srlModel;
    }

    public void setSrlModel(String srlModel) {
        this.srlModel = srlModel;
    }

    public String getGptScaffoldRole() {
        return gptScaffoldRole;
    }

    public void setGptScaffoldRole(String gptScaffoldRole) {
        this.gptScaffoldRole = gptScaffoldRole;
    }

    public String getGptScaffoldRoleDescription() {
        return gptScaffoldRoleDescription;
    }

    public void setGptScaffoldRoleDescription(String gptScaffoldRoleDescription) {
        this.gptScaffoldRoleDescription = gptScaffoldRoleDescription;
    }

    public Boolean getGptScaffoldPromptIncludeEssay() {
        return gptScaffoldPromptIncludeEssay;
    }

    public void setGptScaffoldPromptIncludeEssay(Boolean gptScaffoldPromptIncludeEssay) {
        this.gptScaffoldPromptIncludeEssay = gptScaffoldPromptIncludeEssay;
    }

    public String getGptScaffoldPromptTemplate() {
        return gptScaffoldPromptTemplate;
    }

    public void setGptScaffoldPromptTemplate(String gptScaffoldPromptTemplate) {
        this.gptScaffoldPromptTemplate = gptScaffoldPromptTemplate;
    }

    public String getGptScaffoldBackgroundFilenameList() {
        return gptScaffoldBackgroundFilenameList;
    }

    public void setGptScaffoldBackgroundFilenameList(String gptScaffoldBackgroundFilenameList) {
        this.gptScaffoldBackgroundFilenameList = gptScaffoldBackgroundFilenameList;
    }

    public String getGptScaffoldParameters() {
        return gptScaffoldParameters;
    }

    public void setGptScaffoldParameters(String gptScaffoldParameters) {
        this.gptScaffoldParameters = gptScaffoldParameters;
    }

    public String getGptScaffoldNeedCheckSavePlannerSelectIndexPrompt() {
        return gptScaffoldNeedCheckSavePlannerSelectIndexPrompt;
    }

    public void setGptScaffoldNeedCheckSavePlannerSelectIndexPrompt(String gptScaffoldNeedCheckSavePlannerSelectIndexPrompt) {
        this.gptScaffoldNeedCheckSavePlannerSelectIndexPrompt = gptScaffoldNeedCheckSavePlannerSelectIndexPrompt;
    }

    public String getTestIsdimuName() {
        return testIsdimuName;
    }

    public void setTestIsdimuName(String testIsdimuName) {
        this.testIsdimuName = testIsdimuName;
    }

    public String getPreTestName() {
        return preTestName;
    }

    public void setPreTestName(String preTestName) {
        this.preTestName = preTestName;
    }

    public String getHasTakePreviousStudyTestName() {
        return hasTakePreviousStudyTestName;
    }

    public void setHasTakePreviousStudyTestName(String hasTakePreviousStudyTestName) {
        this.hasTakePreviousStudyTestName = hasTakePreviousStudyTestName;
    }

    public Integer getTestIsdimuCourseId() {
        return testIsdimuCourseId;
    }

    public void setTestIsdimuCourseId(Integer testIsdimuCourseId) {
        this.testIsdimuCourseId = testIsdimuCourseId;
    }

    public Integer getHasTakePreviousStudyTestNameCourseId() {
        return hasTakePreviousStudyTestNameCourseId;
    }

    public void setHasTakePreviousStudyTestNameCourseId(Integer hasTakePreviousStudyTestNameCourseId) {
        this.hasTakePreviousStudyTestNameCourseId = hasTakePreviousStudyTestNameCourseId;
    }

    public Integer getPreTestNameCourseId() {
        return preTestNameCourseId;
    }

    public void setPreTestNameCourseId(Integer preTestNameCourseId) {
        this.preTestNameCourseId = preTestNameCourseId;
    }

    public Boolean getUseWriteEssayTool() {
        return useWriteEssayTool;
    }

    public void setUseWriteEssayTool(Boolean useWriteEssayTool) {
        this.useWriteEssayTool = useWriteEssayTool;
    }

    public Boolean getUseWriteEssayWordCountButton() {
        return useWriteEssayWordCountButton;
    }

    public void setUseWriteEssayWordCountButton(Boolean useWriteEssayWordCountButton) {
        this.useWriteEssayWordCountButton = useWriteEssayWordCountButton;
    }

    public Boolean getUseCollaborativeWriteEssayTool() {
        return useCollaborativeWriteEssayTool;
    }
    public void setUseCollaborativeWriteEssayTool(Boolean useCollaborativeWriteEssayTool) {
        this.useCollaborativeWriteEssayTool = useCollaborativeWriteEssayTool;
    }

    // zoteroNotes
    public Boolean getUseZoteroNotesTool() {
        return useZoteroNotesTool;
    }
    public void setUseZoteroNotesTool(Boolean useZoteroNotesTool) {
        this.useZoteroNotesTool = useZoteroNotesTool;
    }

    // processVisualTool
    public Boolean getProcessVisualTool() {
        return useProcessVisualTool;
    }
    public void setProcessVisualTool(Boolean useProcessVisualTool) {
        this.useProcessVisualTool = useProcessVisualTool;
    }

    public Boolean getUseCollaborativeWriteEssayWordCountButton() {
        return useCollaborativeWriteEssayWordCountButton;
    }

    public void setUseCollaborativeWriteEssayWordCountButton(Boolean useCollaborativeWriteEssayWordCountButton) {
        this.useCollaborativeWriteEssayWordCountButton = useCollaborativeWriteEssayWordCountButton;
    }

    public Boolean getIncludeChatgptToCollaborativeWriteEssay() {
        return includeChatgptToCollaborativeWriteEssay;
    }

    public void setIncludeChatgptToCollaborativeWriteEssay(Boolean includeChatgptToCollaborativeWriteEssay) {
        this.includeChatgptToCollaborativeWriteEssay = includeChatgptToCollaborativeWriteEssay;
    }

    public Boolean getUsePlannerTool() {
        return usePlannerTool;
    }

    public void setUsePlannerTool(Boolean usePlannerTool) {
        this.usePlannerTool = usePlannerTool;
    }

    public Boolean getUseChatgptTool() {
        return useChatgptTool;
    }

    public void setUseChatgptTool(Boolean useChatgptTool) {
        this.useChatgptTool = useChatgptTool;
    }

    public String getChatgptBackgroundFileNameList() {
        return chatgptBackgroundFileNameList;
    }

    public void setChatgptBackgroundFileNameList(String chatgptBackgroundFileNameList) {
        this.chatgptBackgroundFileNameList = chatgptBackgroundFileNameList;
    }

    public String getChatgptRoleDescription() {
        return chatgptRoleDescription;
    }

    public void setChatgptRoleDescription(String chatgptRoleDescription) {
        this.chatgptRoleDescription = chatgptRoleDescription;
    }

    public String getChatgptRole() {
        return chatgptRole;
    }

    public void setChatgptRole(String chatgptRole) {
        this.chatgptRole = chatgptRole;
    }

    public Boolean getChatgptPromptIncludeEssay() {
        return chatgptPromptIncludeEssay;
    }

    public void setChatgptPromptIncludeEssay(Boolean chatgptPromptIncludeEssay) {
        this.chatgptPromptIncludeEssay = chatgptPromptIncludeEssay;
    }

    public String getChatgptParameters() {
        return chatgptParameters;
    }

    public void setChatgptParameters(String chatgptParameters) {
        this.chatgptParameters = chatgptParameters;
    }

    public Boolean getUseChecklistTool() {
        return useChecklistTool;
    }

    public void setUseChecklistTool(Boolean useChecklistTool) {
        this.useChecklistTool = useChecklistTool;
    }

    public Boolean getUseChecklistToolGrammar() {
        return useChecklistToolGrammar;
    }

    public void setUseChecklistToolGrammar(Boolean useChecklistToolGrammar) {
        this.useChecklistToolGrammar = useChecklistToolGrammar;
    }

    public Boolean getUseChecklistToolAcademic() {
        return useChecklistToolAcademic;
    }

    public void setUseChecklistToolAcademic(Boolean useChecklistToolAcademic) {
        this.useChecklistToolAcademic = useChecklistToolAcademic;
    }

    public Boolean getUseChecklistToolOriginality() {
        return useChecklistToolOriginality;
    }

    public void setUseChecklistToolOriginality(Boolean useChecklistToolOriginality) {
        this.useChecklistToolOriginality = useChecklistToolOriginality;
    }

    public Boolean getUseChecklistToolClassification() {
        return useChecklistToolClassification;
    }

    public void setUseChecklistToolClassification(Boolean useChecklistToolClassification) {
        this.useChecklistToolClassification = useChecklistToolClassification;
    }

    public Boolean getUseDictionaryTool() {
        return useDictionaryTool;
    }

    public void setUseDictionaryTool(Boolean useDictionaryTool) {
        this.useDictionaryTool = useDictionaryTool;
    }

    public String getDictionarySourceLanguage() {
        return dictionarySourceLanguage;
    }

    public void setDictionarySourceLanguage(String dictionarySourceLanguage) {
        this.dictionarySourceLanguage = dictionarySourceLanguage;
    }

    public String getDictionaryTargetLanguage() {
        return dictionaryTargetLanguage;
    }

    public void setDictionaryTargetLanguage(String dictionaryTargetLanguage) {
        this.dictionaryTargetLanguage = dictionaryTargetLanguage;
    }

    public Boolean getUseTeacherChat() {
        return useTeacherChat;
    }

    public void setUseTeacherChat(Boolean useTeacherChat) {
        this.useTeacherChat = useTeacherChat;
    }

    public Boolean getUseTimerTool() {
        return useTimerTool;
    }

    public void setUseTimerTool(Boolean useTimerTool) {
        this.useTimerTool = useTimerTool;
    }

    public Boolean getUseVideoRecordingTool() {
        return useVideoRecordingTool;
    }

    public void setUseVideoRecordingTool(Boolean useVideoRecordingTool) {
        this.useVideoRecordingTool = useVideoRecordingTool;
    }

    public String getToolsLanguage() {
        return toolsLanguage;
    }

    public void setToolsLanguage(String toolsLanguage) {
        this.toolsLanguage = toolsLanguage;
    }

    public String getPlannerSelectStrategyHint() {
        return plannerSelectStrategyHint;
    }

    public void setPlannerSelectStrategyHint(String plannerSelectStrategyHint) {
        this.plannerSelectStrategyHint = plannerSelectStrategyHint;
    }

    public String getPlannerAllocateTimeHint() {
        return plannerAllocateTimeHint;
    }

    public void setPlannerAllocateTimeHint(String plannerAllocateTimeHint) {
        this.plannerAllocateTimeHint = plannerAllocateTimeHint;
    }

    public String getPlannerSelectSkillsHint() {
        return plannerSelectSkillsHint;
    }

    public void setPlannerSelectSkillsHint(String plannerSelectSkillsHint) {
        this.plannerSelectSkillsHint = plannerSelectSkillsHint;
    }

    public String getPlannerSavePlanHint() {
        return plannerSavePlanHint;
    }

    public void setPlannerSavePlanHint(String plannerSavePlanHint) {
        this.plannerSavePlanHint = plannerSavePlanHint;
    }

    public String getPlannerReadingStrategy() {
        return plannerReadingStrategy;
    }

    public void setPlannerReadingStrategy(String plannerReadingStrategy) {
        this.plannerReadingStrategy = plannerReadingStrategy;
    }

    public String getPlannerReadingInstruction() {
        return plannerReadingInstruction;
    }

    public void setPlannerReadingInstruction(String plannerReadingInstruction) {
        this.plannerReadingInstruction = plannerReadingInstruction;
    }

    public String getPlannerWritingStrategy() {
        return plannerWritingStrategy;
    }

    public void setPlannerWritingStrategy(String plannerWritingStrategy) {
        this.plannerWritingStrategy = plannerWritingStrategy;
    }

    public String getPlannerWritingInstruction() {
        return plannerWritingInstruction;
    }

    public void setPlannerWritingInstruction(String plannerWritingInstruction) {
        this.plannerWritingInstruction = plannerWritingInstruction;
    }

    public String getPlannerCustomisePlanInstruction() {
        return plannerCustomisePlanInstruction;
    }

    public void setPlannerCustomisePlanInstruction(String plannerCustomisePlanInstruction) {
        this.plannerCustomisePlanInstruction = plannerCustomisePlanInstruction;
    }

    public String getUserTakePreviousStudyPrompt() {
        return userTakePreviousStudyPrompt;
    }

    public void setUserTakePreviousStudyPrompt(String userTakePreviousStudyPrompt) {
        this.userTakePreviousStudyPrompt = userTakePreviousStudyPrompt;
    }

    public String getClassifySentenceBackgroundFileNameList() {
        return classifySentenceBackgroundFileNameList;
    }

    public void setClassifySentenceBackgroundFileNameList(String classifySentenceBackgroundFileNameList) {
        this.classifySentenceBackgroundFileNameList = classifySentenceBackgroundFileNameList;
    }

    @Override
    protected Serializable pkVal() {
        return null;
    }

    @Override
    public String toString() {
        return "ConfigGenericoTemplate{" +
                "id=" + id +
                ", genericoTemplateName='" + genericoTemplateName + '\'' +
                ", genericoTemplateKey='" + genericoTemplateKey + '\'' +
                ", genericoTemplateIndex='" + genericoTemplateIndex + '\'' +
                ", totalMinutes=" + totalMinutes +
                ", unlimitedTime=" + unlimitedTime +
                ", hintMinutesBeforeEnd=" + hintMinutesBeforeEnd +
                ", annotationTakeNoteLabel='" + annotationTakeNoteLabel + '\'' +
//                ", annotationDefaultLabel='" + annotationDefaultLabel + '\'' +
//                ", annotationDefaultLabelColor='" + annotationDefaultLabelColor + '\'' +
                ", useAnnotationTool=" + useAnnotationTool +
                ", useScaffoldTool=" + useScaffoldTool +
                ", useGptScaffoldTool=" + useGptScaffoldTool +
                ", srlModel='" + srlModel + '\'' +
                ", gptScaffoldRole='" + gptScaffoldRole + '\'' +
                ", gptScaffoldRoleDescription='" + gptScaffoldRoleDescription + '\'' +
                ", gptScaffoldPromptIncludeEssay=" + gptScaffoldPromptIncludeEssay +
                ", gptScaffoldPromptTemplate='" + gptScaffoldPromptTemplate + '\'' +
                ", gptScaffoldBackgroundFilenameList='" + gptScaffoldBackgroundFilenameList + '\'' +
                ", gptScaffoldParameters='" + gptScaffoldParameters + '\'' +
                ", gptScaffoldNeedCheckSavePlannerSelectIndexPrompt='" + gptScaffoldNeedCheckSavePlannerSelectIndexPrompt + '\'' +
                ", testIsdimuName='" + testIsdimuName + '\'' +
                ", preTestName='" + preTestName + '\'' +
                ", hasTakePreviousStudyTestName='" + hasTakePreviousStudyTestName + '\'' +
                ", testIsdimuCourseId=" + testIsdimuCourseId +
                ", hasTakePreviousStudyTestNameCourseId=" + hasTakePreviousStudyTestNameCourseId +
                ", preTestNameCourseId=" + preTestNameCourseId +
                ", useWriteEssayTool=" + useWriteEssayTool +
                ", useWriteEssayWordCountButton=" + useWriteEssayWordCountButton +
                ", useCollaborativeWriteEssayTool=" + useCollaborativeWriteEssayTool +
                ", useCollaborativeWriteEssayWordCountButton=" + useCollaborativeWriteEssayWordCountButton +
                ", includeChatgptToCollaborativeWriteEssay=" + includeChatgptToCollaborativeWriteEssay +
                ", usePlannerTool=" + usePlannerTool +
                ", useChatgptTool=" + useChatgptTool +
                ", chatgptBackgroundFileNameList='" + chatgptBackgroundFileNameList + '\'' +
                ", chatgptRoleDescription='" + chatgptRoleDescription + '\'' +
                ", chatgptRole='" + chatgptRole + '\'' +
                ", chatgptPromptIncludeEssay=" + chatgptPromptIncludeEssay +
                ", chatgptParameters='" + chatgptParameters + '\'' +
                ", useChecklistTool=" + useChecklistTool +
                ", useChecklistToolGrammar=" + useChecklistToolGrammar +
                ", useChecklistToolAcademic=" + useChecklistToolAcademic +
                ", useChecklistToolOriginality=" + useChecklistToolOriginality +
                ", useChecklistToolClassification=" + useChecklistToolClassification +
                ", useDictionaryTool=" + useDictionaryTool +
                ", dictionarySourceLanguage='" + dictionarySourceLanguage + '\'' +
                ", dictionaryTargetLanguage='" + dictionaryTargetLanguage + '\'' +
                ", useTeacherChat=" + useTeacherChat +
                ", useTimerTool=" + useTimerTool +
                ", useVideoRecordingTool=" + useVideoRecordingTool +
                ", toolsLanguage='" + toolsLanguage + '\'' +
                ", plannerSelectStrategyHint='" + plannerSelectStrategyHint + '\'' +
                ", plannerAllocateTimeHint='" + plannerAllocateTimeHint + '\'' +
                ", plannerSelectSkillsHint='" + plannerSelectSkillsHint + '\'' +
                ", plannerSavePlanHint='" + plannerSavePlanHint + '\'' +
                ", plannerReadingStrategy='" + plannerReadingStrategy + '\'' +
                ", plannerReadingInstruction='" + plannerReadingInstruction + '\'' +
                ", plannerWritingStrategy='" + plannerWritingStrategy + '\'' +
                ", plannerWritingInstruction='" + plannerWritingInstruction + '\'' +
                ", plannerCustomisePlanInstruction='" + plannerCustomisePlanInstruction + '\'' +
                ", userTakePreviousStudyPrompt='" + userTakePreviousStudyPrompt + '\'' +
                ", classifySentenceBackgroundFileNameList='" + classifySentenceBackgroundFileNameList + '\'' +
                '}';
    }
}
