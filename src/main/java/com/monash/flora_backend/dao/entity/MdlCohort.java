package com.monash.flora_backend.dao.entity;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import com.baomidou.mybatisplus.annotation.TableId;
import java.io.Serializable;
/**
 * <p>
 * Each record represents one cohort (aka site-wide group).
 * </p>
 *
 * @author xinyu
 * @since 2023-04-18
 */
public class MdlCohort extends Model<MdlCohort> {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    private Long contextid;

    private String name;

    private String idnumber;

    private String description;

    private Integer descriptionformat;

    private Boolean visible;

    private String component;

    private Long timecreated;

    private Long timemodified;

    private String theme;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getContextid() {
        return contextid;
    }

    public void setContextid(Long contextid) {
        this.contextid = contextid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIdnumber() {
        return idnumber;
    }

    public void setIdnumber(String idnumber) {
        this.idnumber = idnumber;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getDescriptionformat() {
        return descriptionformat;
    }

    public void setDescriptionformat(Integer descriptionformat) {
        this.descriptionformat = descriptionformat;
    }

    public Boolean getVisible() {
        return visible;
    }

    public void setVisible(Boolean visible) {
        this.visible = visible;
    }

    public String getComponent() {
        return component;
    }

    public void setComponent(String component) {
        this.component = component;
    }

    public Long getTimecreated() {
        return timecreated;
    }

    public void setTimecreated(Long timecreated) {
        this.timecreated = timecreated;
    }

    public Long getTimemodified() {
        return timemodified;
    }

    public void setTimemodified(Long timemodified) {
        this.timemodified = timemodified;
    }

    public String getTheme() {
        return theme;
    }

    public void setTheme(String theme) {
        this.theme = theme;
    }

    @Override
    protected Serializable pkVal() {
        return null;
    }

    @Override
    public String toString() {
        return "MdlCohort{" +
        ", id=" + id +
        ", contextid=" + contextid +
        ", name=" + name +
        ", idnumber=" + idnumber +
        ", description=" + description +
        ", descriptionformat=" + descriptionformat +
        ", visible=" + visible +
        ", component=" + component +
        ", timecreated=" + timecreated +
        ", timemodified=" + timemodified +
        ", theme=" + theme +
        "}";
    }
}
