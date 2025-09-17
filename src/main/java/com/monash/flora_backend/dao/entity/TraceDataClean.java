//package com.monash.flora_backend.dao.entity;
//import com.baomidou.mybatisplus.annotation.IdType;
//import com.baomidou.mybatisplus.extension.activerecord.Model;
//import com.baomidou.mybatisplus.annotation.TableId;
//import java.io.Serializable;
///**
// *
// *
// *
// *
// * @author xinyu
// * @since 2022-10-18
// */
//public class TraceDataClean extends Model<TraceDataClean> {
//
//    private static final long serialVersionUID = 1L;
//
//    @TableId(value = "id", type = IdType.AUTO)
//    private Long id;
//
//    private Long userId;
//
//    private String saveTime;
//
//    private String username;
//
//    private String url;
//
//    private String actionLabel;
//    private String subActionLabel;
//    // private String detailedActionLabel;
//    // private String modelType;
//    private String processLabel;
//
//    private String courseId;
//    private String time;
//
//    public String getTime() {
//        return time;
//    }
//
//    public void setTime(String time) {
//        this.time = time;
//    }
//
//    // public String getDetailedActionLabel() {
//    //     return detailedActionLabel;
//    // }
//
//    // public void setDetailedActionLabel(String detailedActionLabel) {
//    //     this.detailedActionLabel = detailedActionLabel;
//    // }
//
//    public String getActionLabel() {
//        return actionLabel;
//    }
//
//    public void setActionLabel(String actionLabel) {
//        this.actionLabel = actionLabel;
//    }
//
//    // public String getModelType() {
//    //     return modelType;
//    // }
//
//    // public void setModelType(String modelType) {
//    //     this.modelType = modelType;
//    // }
//
//    public String getCourseId() {
//        return courseId;
//    }
//
//    public void setCourseId(String courseId) {
//        this.courseId = courseId;
//    }
//
//    public String getProcessLabel() {
//        return processLabel;
//    }
//
//    public void setProcessLabel(String processLabel) {
//        this.processLabel = processLabel;
//    }
//
//    public Long getId() {
//        return id;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }
//
//    public Long getUserId() {
//        return userId;
//    }
//
//    public void setUserId(Long userId) {
//        this.userId = userId;
//    }
//
//    public String getSaveTime() {
//        return saveTime;
//    }
//
//    public void setSaveTime(String saveTime) {
//        this.saveTime = saveTime;
//    }
//
//    public String getUsername() {
//        return username;
//    }
//
//    public void setUsername(String username) {
//        this.username = username;
//    }
//
//    public String getUrl() {
//        return url;
//    }
//
//    public void setUrl(String url) {
//        this.url = url;
//    }
//
//    public String getSubActionLabel() {
//        return subActionLabel;
//    }
//
//    public void setSubActionLabel(String subActionLabel) {
//        this.subActionLabel = subActionLabel;
//    }
//
//    @Override
//    protected Serializable pkVal() {
//        return null;
//    }
//
//    @Override
//    public String toString() {
//        return "TraceData{" +
//                "id=" + id +
//                ", userId=" + userId +
//                ", saveTime='" + saveTime + '\'' +
//                ", username='" + username + '\'' +
//                ", url='" + url + '\'' +
//                // ", actionLabel='" + actionLabel + '\'' +
//                ", subActionLabel='" + subActionLabel + '\'' +
//                // ", detailedActionLabel='" + detailedActionLabel + '\'' +
//                // ", modelType='" + modelType + '\'' +
//                ", processLabel='" + processLabel + '\'' +
//                ", courseId='" + courseId + '\'' +
//                '}';
//    }
//}
