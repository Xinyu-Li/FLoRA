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
 * @since 2023-02-19
 */
public class Scaffold extends Model<Scaffold> {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    private Long userId;

    private String username;

    private String saveTime;

    private String url;

    private String selectedSuggestions;

    private String scaffoldInfo;

    private String scaffoldStatus;
    private String scaffoldViewedStatus;

    private String courseId;

    public String getCourseId() {
        return courseId;
    }

    public void setCourseId(String courseId) {
        this.courseId = courseId;
    }

    public String getScaffoldViewedStatus() {
        return scaffoldViewedStatus;
    }

    public void setScaffoldViewedStatus(String scaffoldViewedStatus) {
        this.scaffoldViewedStatus = scaffoldViewedStatus;
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

    public String getSaveTime() {
        return saveTime;
    }

    public void setSaveTime(String saveTime) {
        this.saveTime = saveTime;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getSelectedSuggestions() {
        return selectedSuggestions;
    }

    public void setSelectedSuggestions(String selectedSuggestions) {
        this.selectedSuggestions = selectedSuggestions;
    }

    public String getScaffoldInfo() {
        return scaffoldInfo;
    }

    public void setScaffoldInfo(String scaffoldInfo) {
        this.scaffoldInfo = scaffoldInfo;
    }

    public String getScaffoldStatus() {
        return scaffoldStatus;
    }

    public void setScaffoldStatus(String scaffoldStatus) {
        this.scaffoldStatus = scaffoldStatus;
    }

    @Override
    protected Serializable pkVal() {
        return null;
    }

    @Override
    public String toString() {
        return "Scaffold{" +
        ", id=" + id +
        ", userId=" + userId +
        ", username=" + username +
        ", saveTime=" + saveTime +
        ", url=" + url +
        ", selectedSuggestions=" + selectedSuggestions +
        ", scaffoldInfo=" + scaffoldInfo +
        ", scaffoldStatus=" + scaffoldStatus +
        "}";
    }
}
