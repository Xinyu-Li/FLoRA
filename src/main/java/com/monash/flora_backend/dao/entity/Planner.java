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
 * @since 2022-10-13
 */
public class Planner extends Model<Planner> {

    private static final long serialVersionUID = 1L;
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    private Long userId;

    private String username;

    private String saveTime;

    private String url;

    private String plannerElementsJson;
    private String displayPlanDivInnerHtml;

    private String courseId;

    public String getCourseId() {
        return courseId;
    }

    public void setCourseId(String courseId) {
        this.courseId = courseId;
    }

    public String getDisplayPlanDivInnerHtml() {
        return displayPlanDivInnerHtml;
    }

    public void setDisplayPlanDivInnerHtml(String displayPlanDivInnerHtml) {
        this.displayPlanDivInnerHtml = displayPlanDivInnerHtml;
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

    public String getPlannerElementsJson() {
        return plannerElementsJson;
    }

    public void setPlannerElementsJson(String plannerElementsJson) {
        this.plannerElementsJson = plannerElementsJson;
    }

    @Override
    protected Serializable pkVal() {
        return null;
    }

    @Override
    public String toString() {
        return "Planner{" +
        ", id=" + id +
        ", userId=" + userId +
        ", username=" + username +
        ", saveTime=" + saveTime +
        ", url=" + url +
        ", plannerElementsJson=" + plannerElementsJson +
        "}";
    }
}
