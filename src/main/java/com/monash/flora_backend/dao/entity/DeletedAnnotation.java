package com.monash.flora_backend.dao.entity;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import java.io.Serializable;
/**
 * <p>
 * 
 * </p>
 *
 * @author xinyu
 * @since 2022-10-20
 */
public class DeletedAnnotation extends Model<DeletedAnnotation> {

    private static final long serialVersionUID = 1L;

    private Long id;

    private String highlightText;

    private String notesTextJson;

    private String notesText;

    private String defaultTag;

    private String extraTags;

    private Long userId;

    private String saveTime;

    private String username;

    private String url;

    private String highlightTimestamp;
    private String courseId;

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

    public String getHighlightText() {
        return highlightText;
    }

    public void setHighlightText(String highlightText) {
        this.highlightText = highlightText;
    }

    public String getNotesTextJson() {
        return notesTextJson;
    }

    public void setNotesTextJson(String notesTextJson) {
        this.notesTextJson = notesTextJson;
    }

    public String getNotesText() {
        return notesText;
    }

    public void setNotesText(String notesText) {
        this.notesText = notesText;
    }

    public String getDefaultTag() {
        return defaultTag;
    }

    public void setDefaultTag(String defaultTag) {
        this.defaultTag = defaultTag;
    }

    public String getExtraTags() {
        return extraTags;
    }

    public void setExtraTags(String extraTags) {
        this.extraTags = extraTags;
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

    public String getHighlightTimestamp() {
        return highlightTimestamp;
    }

    public void setHighlightTimestamp(String highlightTimestamp) {
        this.highlightTimestamp = highlightTimestamp;
    }

    @Override
    protected Serializable pkVal() {
        return null;
    }

    @Override
    public String toString() {
        return "DeletedAnnotation{" +
        ", id=" + id +
        ", highlightText=" + highlightText +
        ", notesTextJson=" + notesTextJson +
        ", notesText=" + notesText +
        ", defaultTag=" + defaultTag +
        ", extraTags=" + extraTags +
        ", userId=" + userId +
        ", saveTime=" + saveTime +
        ", username=" + username +
        ", url=" + url +
        ", highlightTimestamp=" + highlightTimestamp +
        "}";
    }
}
