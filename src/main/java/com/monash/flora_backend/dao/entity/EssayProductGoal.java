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
 * @since 2025-01-03
 */
public class EssayProductGoal extends Model<EssayProductGoal> {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    private Long userId;
    private String courseId;

    private String username;

    private String processTime;



    private String essay;
    private String triggerEvent;
    private String analysisType;
    private String analysisResult;

    //下面3个暂时没用
    private String structure;
    private String relevance;
    private String mainPoints;

    public String getCourseId() {
        return courseId;
    }

    public void setCourseId(String courseId) {
        this.courseId = courseId;
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

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getProcessTime() {
        return processTime;
    }

    public void setProcessTime(String processTime) {
        this.processTime = processTime;
    }

    public String getStructure() {
        return structure;
    }

    public void setStructure(String structure) {
        this.structure = structure;
    }

    public String getRelevance() {
        return relevance;
    }

    public void setRelevance(String relevance) {
        this.relevance = relevance;
    }

    public String getMainPoints() {
        return mainPoints;
    }

    public void setMainPoints(String mainPoints) {
        this.mainPoints = mainPoints;
    }

    public String getEssay() {
        return essay;
    }

    public void setEssay(String essay) {
        this.essay = essay;
    }

    public String getTriggerEvent() {
        return triggerEvent;
    }

    public void setTriggerEvent(String triggerEvent) {
        this.triggerEvent = triggerEvent;
    }

    public String getAnalysisType() {
        return analysisType;
    }

    public void setAnalysisType(String analysisType) {
        this.analysisType = analysisType;
    }

    public String getAnalysisResult() {
        return analysisResult;
    }

    public void setAnalysisResult(String analysisResult) {
        this.analysisResult = analysisResult;
    }

    @Override
    protected Serializable pkVal() {
        return null;
    }

    @Override
    public String toString() {
        return "EssayProductGoal{" +
                "id=" + id +
                ", userId=" + userId +
                ", username='" + username + '\'' +
                ", processTime='" + processTime + '\'' +
                ", structure='" + structure + '\'' +
                ", relevance='" + relevance + '\'' +
                ", mainPoints='" + mainPoints + '\'' +
                ", essay='" + essay + '\'' +
                ", triggerEvent='" + triggerEvent + '\'' +
                ", analysisType='" + analysisType + '\'' +
                ", analysisResult='" + analysisResult + '\'' +
                '}';
    }
}
