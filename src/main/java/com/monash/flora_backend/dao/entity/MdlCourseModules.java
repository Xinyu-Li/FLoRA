package com.monash.flora_backend.dao.entity;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import com.baomidou.mybatisplus.annotation.TableId;
import java.io.Serializable;
/**
 * <p>
 * course_modules table retrofitted from MySQL
 * </p>
 *
 * @author xinyu
 * @since 2023-09-29
 */
public class MdlCourseModules extends Model<MdlCourseModules> {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    private Long course;

    private Long module;

    private Long instance;

    private Long section;

    private String idnumber;

    private Long added;

    private Integer score;

    private Integer indent;

    private Boolean visible;

    private Boolean visibleoncoursepage;

    private Boolean visibleold;

    private Integer groupmode;

    private Long groupingid;

    private Boolean completion;

    private Long completiongradeitemnumber;

    private Boolean completionview;

    private Long completionexpected;

    private Boolean completionpassgrade;

    private Boolean showdescription;

    private String availability;

    private Boolean deletioninprogress;

    private Boolean downloadcontent;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCourse() {
        return course;
    }

    public void setCourse(Long course) {
        this.course = course;
    }

    public Long getModule() {
        return module;
    }

    public void setModule(Long module) {
        this.module = module;
    }

    public Long getInstance() {
        return instance;
    }

    public void setInstance(Long instance) {
        this.instance = instance;
    }

    public Long getSection() {
        return section;
    }

    public void setSection(Long section) {
        this.section = section;
    }

    public String getIdnumber() {
        return idnumber;
    }

    public void setIdnumber(String idnumber) {
        this.idnumber = idnumber;
    }

    public Long getAdded() {
        return added;
    }

    public void setAdded(Long added) {
        this.added = added;
    }

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public Integer getIndent() {
        return indent;
    }

    public void setIndent(Integer indent) {
        this.indent = indent;
    }

    public Boolean getVisible() {
        return visible;
    }

    public void setVisible(Boolean visible) {
        this.visible = visible;
    }

    public Boolean getVisibleoncoursepage() {
        return visibleoncoursepage;
    }

    public void setVisibleoncoursepage(Boolean visibleoncoursepage) {
        this.visibleoncoursepage = visibleoncoursepage;
    }

    public Boolean getVisibleold() {
        return visibleold;
    }

    public void setVisibleold(Boolean visibleold) {
        this.visibleold = visibleold;
    }

    public Integer getGroupmode() {
        return groupmode;
    }

    public void setGroupmode(Integer groupmode) {
        this.groupmode = groupmode;
    }

    public Long getGroupingid() {
        return groupingid;
    }

    public void setGroupingid(Long groupingid) {
        this.groupingid = groupingid;
    }

    public Boolean getCompletion() {
        return completion;
    }

    public void setCompletion(Boolean completion) {
        this.completion = completion;
    }

    public Long getCompletiongradeitemnumber() {
        return completiongradeitemnumber;
    }

    public void setCompletiongradeitemnumber(Long completiongradeitemnumber) {
        this.completiongradeitemnumber = completiongradeitemnumber;
    }

    public Boolean getCompletionview() {
        return completionview;
    }

    public void setCompletionview(Boolean completionview) {
        this.completionview = completionview;
    }

    public Long getCompletionexpected() {
        return completionexpected;
    }

    public void setCompletionexpected(Long completionexpected) {
        this.completionexpected = completionexpected;
    }

    public Boolean getCompletionpassgrade() {
        return completionpassgrade;
    }

    public void setCompletionpassgrade(Boolean completionpassgrade) {
        this.completionpassgrade = completionpassgrade;
    }

    public Boolean getShowdescription() {
        return showdescription;
    }

    public void setShowdescription(Boolean showdescription) {
        this.showdescription = showdescription;
    }

    public String getAvailability() {
        return availability;
    }

    public void setAvailability(String availability) {
        this.availability = availability;
    }

    public Boolean getDeletioninprogress() {
        return deletioninprogress;
    }

    public void setDeletioninprogress(Boolean deletioninprogress) {
        this.deletioninprogress = deletioninprogress;
    }

    public Boolean getDownloadcontent() {
        return downloadcontent;
    }

    public void setDownloadcontent(Boolean downloadcontent) {
        this.downloadcontent = downloadcontent;
    }

    @Override
    protected Serializable pkVal() {
        return null;
    }

    @Override
    public String toString() {
        return "MdlCourseModules{" +
        ", id=" + id +
        ", course=" + course +
        ", module=" + module +
        ", instance=" + instance +
        ", section=" + section +
        ", idnumber=" + idnumber +
        ", added=" + added +
        ", score=" + score +
        ", indent=" + indent +
        ", visible=" + visible +
        ", visibleoncoursepage=" + visibleoncoursepage +
        ", visibleold=" + visibleold +
        ", groupmode=" + groupmode +
        ", groupingid=" + groupingid +
        ", completion=" + completion +
        ", completiongradeitemnumber=" + completiongradeitemnumber +
        ", completionview=" + completionview +
        ", completionexpected=" + completionexpected +
        ", completionpassgrade=" + completionpassgrade +
        ", showdescription=" + showdescription +
        ", availability=" + availability +
        ", deletioninprogress=" + deletioninprogress +
        ", downloadcontent=" + downloadcontent +
        "}";
    }
}
