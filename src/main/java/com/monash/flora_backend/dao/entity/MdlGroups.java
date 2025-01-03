package com.monash.flora_backend.dao.entity;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import com.baomidou.mybatisplus.annotation.TableId;
import java.io.Serializable;
/**
 * <p>
 * Each record represents a group.
 * </p>
 *
 * @author xinyu
 * @since 2023-10-15
 */
public class MdlGroups extends Model<MdlGroups> {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    private Long courseid;

    private String idnumber;

    private String name;

    private String description;

    private Integer descriptionformat;

    private String enrolmentkey;

    private Long picture;

    private Long timecreated;

    private Long timemodified;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCourseid() {
        return courseid;
    }

    public void setCourseid(Long courseid) {
        this.courseid = courseid;
    }

    public String getIdnumber() {
        return idnumber;
    }

    public void setIdnumber(String idnumber) {
        this.idnumber = idnumber;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public String getEnrolmentkey() {
        return enrolmentkey;
    }

    public void setEnrolmentkey(String enrolmentkey) {
        this.enrolmentkey = enrolmentkey;
    }

    public Long getPicture() {
        return picture;
    }

    public void setPicture(Long picture) {
        this.picture = picture;
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

    @Override
    protected Serializable pkVal() {
        return null;
    }

    @Override
    public String toString() {
        return "MdlGroups{" +
        ", id=" + id +
        ", courseid=" + courseid +
        ", idnumber=" + idnumber +
        ", name=" + name +
        ", description=" + description +
        ", descriptionformat=" + descriptionformat +
        ", enrolmentkey=" + enrolmentkey +
        ", picture=" + picture +
        ", timecreated=" + timecreated +
        ", timemodified=" + timemodified +
        "}";
    }
}
