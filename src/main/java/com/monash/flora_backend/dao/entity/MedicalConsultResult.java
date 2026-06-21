package com.monash.flora_backend.dao.entity;
import java.math.BigDecimal;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import java.io.Serializable;
/**
 * <p>
 * 
 * </p>
 *
 * @author xinyu
 * @since 2024-03-29
 */
public class MedicalConsultResult extends Model<MedicalConsultResult> {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    private String contentResult;

    private String saveTime;

    private Long userId;

    private String courseId;

    private BigDecimal score;

    private String feedback;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContentResult() {
        return contentResult;
    }

    public void setContentResult(String contentResult) {
        this.contentResult = contentResult;
    }

    public String getSaveTime() {
        return saveTime;
    }

    public void setSaveTime(String saveTime) {
        this.saveTime = saveTime;
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

    public BigDecimal getScore() {
        return score;
    }

    public void setScore(BigDecimal score) {
        this.score = score;
    }

    public String getFeedback() {
        return feedback;
    }

    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }

    @Override
    protected Serializable pkVal() {
        return null;
    }

    @Override
    public String toString() {
        return "MedicalConsultResult{" +
        ", id=" + id +
        ", contentResult=" + contentResult +
        ", saveTime=" + saveTime +
        ", userId=" + userId +
        ", courseId=" + courseId +
        ", score=" + score +
        ", feedback=" + feedback +
        "}";
    }
}
