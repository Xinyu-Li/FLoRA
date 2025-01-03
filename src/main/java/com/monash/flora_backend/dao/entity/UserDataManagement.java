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
 * @since 2023-09-29
 */
public class UserDataManagement extends Model<UserDataManagement> {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    private Boolean hasInterviewData;

    private String interviewDataPath;

    private Boolean hasEyeTrackingData;

    private String eyeTrackingDataPath;

    private Boolean hasVideoData;

    private String videoDataPath;

    private Integer essayMarkByGpt;

    private String essayCommentByGpt;

    private Integer essayMarkByHuman;

    private String essayCommentByHuman;

    private Boolean hasUserFeedbackForEssayMarkComment;

    private String userFeedbackForEssayMarkCommentPath;

    private Long userId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean getHasInterviewData() {
        return hasInterviewData;
    }

    public void setHasInterviewData(Boolean hasInterviewData) {
        this.hasInterviewData = hasInterviewData;
    }

    public String getInterviewDataPath() {
        return interviewDataPath;
    }

    public void setInterviewDataPath(String interviewDataPath) {
        this.interviewDataPath = interviewDataPath;
    }

    public Boolean getHasEyeTrackingData() {
        return hasEyeTrackingData;
    }

    public void setHasEyeTrackingData(Boolean hasEyeTrackingData) {
        this.hasEyeTrackingData = hasEyeTrackingData;
    }

    public String getEyeTrackingDataPath() {
        return eyeTrackingDataPath;
    }

    public void setEyeTrackingDataPath(String eyeTrackingDataPath) {
        this.eyeTrackingDataPath = eyeTrackingDataPath;
    }

    public Boolean getHasVideoData() {
        return hasVideoData;
    }

    public void setHasVideoData(Boolean hasVideoData) {
        this.hasVideoData = hasVideoData;
    }

    public String getVideoDataPath() {
        return videoDataPath;
    }

    public void setVideoDataPath(String videoDataPath) {
        this.videoDataPath = videoDataPath;
    }

    public Integer getEssayMarkByGpt() {
        return essayMarkByGpt;
    }

    public void setEssayMarkByGpt(Integer essayMarkByGpt) {
        this.essayMarkByGpt = essayMarkByGpt;
    }

    public String getEssayCommentByGpt() {
        return essayCommentByGpt;
    }

    public void setEssayCommentByGpt(String essayCommentByGpt) {
        this.essayCommentByGpt = essayCommentByGpt;
    }

    public Integer getEssayMarkByHuman() {
        return essayMarkByHuman;
    }

    public void setEssayMarkByHuman(Integer essayMarkByHuman) {
        this.essayMarkByHuman = essayMarkByHuman;
    }

    public String getEssayCommentByHuman() {
        return essayCommentByHuman;
    }

    public void setEssayCommentByHuman(String essayCommentByHuman) {
        this.essayCommentByHuman = essayCommentByHuman;
    }

    public Boolean getHasUserFeedbackForEssayMarkComment() {
        return hasUserFeedbackForEssayMarkComment;
    }

    public void setHasUserFeedbackForEssayMarkComment(Boolean hasUserFeedbackForEssayMarkComment) {
        this.hasUserFeedbackForEssayMarkComment = hasUserFeedbackForEssayMarkComment;
    }

    public String getUserFeedbackForEssayMarkCommentPath() {
        return userFeedbackForEssayMarkCommentPath;
    }

    public void setUserFeedbackForEssayMarkCommentPath(String userFeedbackForEssayMarkCommentPath) {
        this.userFeedbackForEssayMarkCommentPath = userFeedbackForEssayMarkCommentPath;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    @Override
    protected Serializable pkVal() {
        return null;
    }

    @Override
    public String toString() {
        return "UserDataManagement{" +
        ", id=" + id +
        ", hasInterviewData=" + hasInterviewData +
        ", interviewDataPath=" + interviewDataPath +
        ", hasEyeTrackingData=" + hasEyeTrackingData +
        ", eyeTrackingDataPath=" + eyeTrackingDataPath +
        ", hasVideoData=" + hasVideoData +
        ", videoDataPath=" + videoDataPath +
        ", essayMarkByGpt=" + essayMarkByGpt +
        ", essayCommentByGpt=" + essayCommentByGpt +
        ", essayMarkByHuman=" + essayMarkByHuman +
        ", essayCommentByHuman=" + essayCommentByHuman +
        ", hasUserFeedbackForEssayMarkComment=" + hasUserFeedbackForEssayMarkComment +
        ", userFeedbackForEssayMarkCommentPath=" + userFeedbackForEssayMarkCommentPath +
        ", userId=" + userId +
        "}";
    }
}
