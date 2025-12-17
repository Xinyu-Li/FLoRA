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
 * @since 2024-01-15
 */
public class GptScaffold extends Model<GptScaffold> {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    private Long userId;

    private String courseId;

    private String gptRoleDescription;

    private String promptSendTime;

    private String gptScaffoldContent;

    private String gptResponseTime;

    private String essay;

    private Integer responseRatingStar;

    private Integer responseRatingThumb;

    private String gptRole;

    private String gptWholeResponse;

    private Integer gptScaffoldNumber;

    private String gptWholePrompt;
    private String prompt;

    private String threadId;
    private String assistantName;
    private String assistantId;

    public String getThreadId() {
        return threadId;
    }

    public void setThreadId(String threadId) {
        this.threadId = threadId;
    }

    public String getAssistantName() {
        return assistantName;
    }

    public void setAssistantName(String assistantName) {
        this.assistantName = assistantName;
    }

    public String getAssistantId() {
        return assistantId;
    }

    public void setAssistantId(String assistantId) {
        this.assistantId = assistantId;
    }

    public String getGptWholePrompt() {
        return gptWholePrompt;
    }

    public void setGptWholePrompt(String gptWholePrompt) {
        this.gptWholePrompt = gptWholePrompt;
    }

    public Integer getGptScaffoldNumber() {
        return gptScaffoldNumber;
    }

    public void setGptScaffoldNumber(Integer gptScaffoldNumber) {
        this.gptScaffoldNumber = gptScaffoldNumber;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getCourseId() {
        return courseId;
    }

    public void setCourseId(String courseId) {
        this.courseId = courseId;
    }

    public String getGptRoleDescription() {
        return gptRoleDescription;
    }

    public void setGptRoleDescription(String gptRoleDescription) {
        this.gptRoleDescription = gptRoleDescription;
    }

    public String getPromptSendTime() {
        return promptSendTime;
    }

    public void setPromptSendTime(String promptSendTime) {
        this.promptSendTime = promptSendTime;
    }

    public String getGptScaffoldContent() {
        return gptScaffoldContent;
    }

    public void setGptScaffoldContent(String gptScaffoldContent) {
        this.gptScaffoldContent = gptScaffoldContent;
    }

    public String getGptResponseTime() {
        return gptResponseTime;
    }

    public void setGptResponseTime(String gptResponseTime) {
        this.gptResponseTime = gptResponseTime;
    }

    public String getEssay() {
        return essay;
    }

    public void setEssay(String essay) {
        this.essay = essay;
    }

    public Integer getResponseRatingStar() {
        return responseRatingStar;
    }

    public void setResponseRatingStar(Integer responseRatingStar) {
        this.responseRatingStar = responseRatingStar;
    }

    public Integer getResponseRatingThumb() {
        return responseRatingThumb;
    }

    public void setResponseRatingThumb(Integer responseRatingThumb) {
        this.responseRatingThumb = responseRatingThumb;
    }

    public String getGptRole() {
        return gptRole;
    }

    public void setGptRole(String gptRole) {
        this.gptRole = gptRole;
    }

    public String getGptWholeResponse() {
        return gptWholeResponse;
    }

    public void setGptWholeResponse(String gptWholeResponse) {
        this.gptWholeResponse = gptWholeResponse;
    }

    @Override
    protected Serializable pkVal() {
        return null;
    }


    public String getPrompt() {
        return prompt;
    }

    public void setPrompt(String prompt) {
        this.prompt = prompt;
    }

    @Override
    public String toString() {
        return "GptScaffold{" +
                "id=" + id +
                ", userId=" + userId +
                ", courseId='" + courseId + '\'' +
                ", gptRoleDescription='" + gptRoleDescription + '\'' +
                ", promptSendTime='" + promptSendTime + '\'' +
                ", gptScaffoldContent='" + gptScaffoldContent + '\'' +
                ", gptResponseTime='" + gptResponseTime + '\'' +
                ", essay='" + essay + '\'' +
                ", responseRatingStar=" + responseRatingStar +
                ", responseRatingThumb=" + responseRatingThumb +
                ", gptRole='" + gptRole + '\'' +
                ", gptWholeResponse='" + gptWholeResponse + '\'' +
                ", gptScaffoldNumber=" + gptScaffoldNumber +
                ", gptWholePrompt='" + gptWholePrompt + '\'' +
                ", prompt='" + prompt + '\'' +
                '}';
    }
}
