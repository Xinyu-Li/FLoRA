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
 * @since 2025-09-11
 */
public class EssayAtTimePoint extends Model<EssayAtTimePoint> {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    private Long userId;

    private String saveTime;

    private String username;

    private String url;

    private String essayContent;

    private String courseId;

    private String timePointDesc;

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

    public String getEssayContent() {
        return essayContent;
    }

    public void setEssayContent(String essayContent) {
        this.essayContent = essayContent;
    }

    public String getCourseId() {
        return courseId;
    }

    public void setCourseId(String courseId) {
        this.courseId = courseId;
    }

    public String getTimePointDesc() {
        return timePointDesc;
    }

    public void setTimePointDesc(String timePointDesc) {
        this.timePointDesc = timePointDesc;
    }

    @Override
    protected Serializable pkVal() {
        return null;
    }

    @Override
    public String toString() {
        return "EssayAtTimePoint{" +
        ", id=" + id +
        ", userId=" + userId +
        ", saveTime=" + saveTime +
        ", username=" + username +
        ", url=" + url +
        ", essayContent=" + essayContent +
        ", courseId=" + courseId +
        ", timePointDesc=" + timePointDesc +
        "}";
    }
}
