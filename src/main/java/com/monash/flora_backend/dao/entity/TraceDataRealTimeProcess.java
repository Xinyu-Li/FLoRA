package com.monash.flora_backend.dao.entity;
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
 * @since 2023-09-25
 */
public class TraceDataRealTimeProcess extends Model<TraceDataRealTimeProcess> {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    private Long userId;

    private String saveTime;

    private String username;

    private String url;

    private String firstname;

    private String lastname;

    private String source;

    private String pageEvent;

    private String targetObject;

    private String instantEvent;

    private String actionLabel;
    private String subActionLabel;
    private String detailedActionLabel;
    private String modelType;
    private String processLabel;

    private String screenX;

    private String screenY;

    private String clientX;

    private String clientY;

    private String windowInnerWidth;

    private String windowInnerHeight;

    private String screenWidth;

    private String screenHeight;

    private String eventValue;
    private String courseId;

    public String getDetailedActionLabel() {
        return detailedActionLabel;
    }

    public void setDetailedActionLabel(String detailedActionLabel) {
        this.detailedActionLabel = detailedActionLabel;
    }

    public String getActionLabel() {
        return actionLabel;
    }

    public void setActionLabel(String actionLabel) {
        this.actionLabel = actionLabel;
    }

    public String getModelType() {
        return modelType;
    }

    public void setModelType(String modelType) {
        this.modelType = modelType;
    }

    public String getCourseId() {
        return courseId;
    }

    public void setCourseId(String courseId) {
        this.courseId = courseId;
    }

    public String getProcessLabel() {
        return processLabel;
    }

    public void setProcessLabel(String processLabel) {
        this.processLabel = processLabel;
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

    public String getSaveTime() {
        return saveTime;
    }

    public void setSaveTime(String saveTime) {
        this.saveTime = saveTime;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getPageEvent() {
        return pageEvent;
    }

    public void setPageEvent(String pageEvent) {
        this.pageEvent = pageEvent;
    }

    public String getTargetObject() {
        return targetObject;
    }

    public void setTargetObject(String targetObject) {
        this.targetObject = targetObject;
    }

    public String getInstantEvent() {
        return instantEvent;
    }

    public void setInstantEvent(String instantEvent) {
        this.instantEvent = instantEvent;
    }

    public String getSubActionLabel() {
        return subActionLabel;
    }

    public void setSubActionLabel(String subActionLabel) {
        this.subActionLabel = subActionLabel;
    }

    public String getScreenX() {
        return screenX;
    }

    public void setScreenX(String screenX) {
        this.screenX = screenX;
    }

    public String getScreenY() {
        return screenY;
    }

    public void setScreenY(String screenY) {
        this.screenY = screenY;
    }

    public String getClientX() {
        return clientX;
    }

    public void setClientX(String clientX) {
        this.clientX = clientX;
    }

    public String getClientY() {
        return clientY;
    }

    public void setClientY(String clientY) {
        this.clientY = clientY;
    }

    public String getWindowInnerWidth() {
        return windowInnerWidth;
    }

    public void setWindowInnerWidth(String windowInnerWidth) {
        this.windowInnerWidth = windowInnerWidth;
    }

    public String getWindowInnerHeight() {
        return windowInnerHeight;
    }

    public void setWindowInnerHeight(String windowInnerHeight) {
        this.windowInnerHeight = windowInnerHeight;
    }

    public String getScreenWidth() {
        return screenWidth;
    }

    public void setScreenWidth(String screenWidth) {
        this.screenWidth = screenWidth;
    }

    public String getScreenHeight() {
        return screenHeight;
    }

    public void setScreenHeight(String screenHeight) {
        this.screenHeight = screenHeight;
    }

    public String getEventValue() {
        return eventValue;
    }

    public void setEventValue(String eventValue) {
        this.eventValue = eventValue;
    }

    @Override
    protected Serializable pkVal() {
        return null;
    }

    @Override
    public String toString() {
        return "TraceDataRealTimeProcess{" +
                "id=" + id +
                ", userId=" + userId +
                ", saveTime='" + saveTime + '\'' +
                ", username='" + username + '\'' +
                ", url='" + url + '\'' +
                ", firstname='" + firstname + '\'' +
                ", lastname='" + lastname + '\'' +
                ", source='" + source + '\'' +
                ", pageEvent='" + pageEvent + '\'' +
                ", targetObject='" + targetObject + '\'' +
                ", instantEvent='" + instantEvent + '\'' +
                ", actionLabel='" + actionLabel + '\'' +
                ", subActionLabel='" + subActionLabel + '\'' +
                ", detailedActionLabel='" + detailedActionLabel + '\'' +
                ", modelType='" + modelType + '\'' +
                ", processLabel='" + processLabel + '\'' +
                ", screenX='" + screenX + '\'' +
                ", screenY='" + screenY + '\'' +
                ", clientX='" + clientX + '\'' +
                ", clientY='" + clientY + '\'' +
                ", windowInnerWidth='" + windowInnerWidth + '\'' +
                ", windowInnerHeight='" + windowInnerHeight + '\'' +
                ", screenWidth='" + screenWidth + '\'' +
                ", screenHeight='" + screenHeight + '\'' +
                ", eventValue='" + eventValue + '\'' +
                ", courseId='" + courseId + '\'' +
                '}';
    }
}
