package com.monash.flora_backend.dao.entity;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import com.baomidou.mybatisplus.annotation.TableId;
import java.io.Serializable;
/**
 * <p>
 * Course categories
 * </p>
 *
 * @author xinyu
 * @since 2023-09-12
 */
public class MdlCourseCategories extends Model<MdlCourseCategories> {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    private String name;

    private String idnumber;

    private String description;

    private Integer descriptionformat;

    private Long parent;

    private Long sortorder;

    private Long coursecount;

    private Boolean visible;

    private Boolean visibleold;

    private Long timemodified;

    private Long depth;

    private String path;

    private String theme;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Long getParent() {
        return parent;
    }

    public void setParent(Long parent) {
        this.parent = parent;
    }

    public Long getSortorder() {
        return sortorder;
    }

    public void setSortorder(Long sortorder) {
        this.sortorder = sortorder;
    }

    public Long getCoursecount() {
        return coursecount;
    }

    public void setCoursecount(Long coursecount) {
        this.coursecount = coursecount;
    }

    public Boolean getVisible() {
        return visible;
    }

    public void setVisible(Boolean visible) {
        this.visible = visible;
    }

    public Boolean getVisibleold() {
        return visibleold;
    }

    public void setVisibleold(Boolean visibleold) {
        this.visibleold = visibleold;
    }

    public Long getTimemodified() {
        return timemodified;
    }

    public void setTimemodified(Long timemodified) {
        this.timemodified = timemodified;
    }

    public Long getDepth() {
        return depth;
    }

    public void setDepth(Long depth) {
        this.depth = depth;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
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
        return "MdlCourseCategories{" +
        ", id=" + id +
        ", name=" + name +
        ", idnumber=" + idnumber +
        ", description=" + description +
        ", descriptionformat=" + descriptionformat +
        ", parent=" + parent +
        ", sortorder=" + sortorder +
        ", coursecount=" + coursecount +
        ", visible=" + visible +
        ", visibleold=" + visibleold +
        ", timemodified=" + timemodified +
        ", depth=" + depth +
        ", path=" + path +
        ", theme=" + theme +
        "}";
    }
}
