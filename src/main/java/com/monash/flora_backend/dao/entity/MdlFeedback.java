package com.monash.flora_backend.dao.entity;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import com.baomidou.mybatisplus.annotation.TableId;
import java.io.Serializable;
/**
 * <p>
 * all feedbacks
 * </p>
 *
 * @author xinyu
 * @since 2023-09-29
 */
public class MdlFeedback extends Model<MdlFeedback> {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    private Long course;

    private String name;

    private String intro;

    private Integer introformat;

    private Boolean anonymous;

    private Boolean emailNotification;

    private Boolean multipleSubmit;

    private Boolean autonumbering;

    private String siteAfterSubmit;

    private String pageAfterSubmit;

    private Integer pageAfterSubmitformat;

    private Boolean publishStats;

    private Long timeopen;

    private Long timeclose;

    private Long timemodified;

    private Boolean completionsubmit;

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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIntro() {
        return intro;
    }

    public void setIntro(String intro) {
        this.intro = intro;
    }

    public Integer getIntroformat() {
        return introformat;
    }

    public void setIntroformat(Integer introformat) {
        this.introformat = introformat;
    }

    public Boolean getAnonymous() {
        return anonymous;
    }

    public void setAnonymous(Boolean anonymous) {
        this.anonymous = anonymous;
    }

    public Boolean getEmailNotification() {
        return emailNotification;
    }

    public void setEmailNotification(Boolean emailNotification) {
        this.emailNotification = emailNotification;
    }

    public Boolean getMultipleSubmit() {
        return multipleSubmit;
    }

    public void setMultipleSubmit(Boolean multipleSubmit) {
        this.multipleSubmit = multipleSubmit;
    }

    public Boolean getAutonumbering() {
        return autonumbering;
    }

    public void setAutonumbering(Boolean autonumbering) {
        this.autonumbering = autonumbering;
    }

    public String getSiteAfterSubmit() {
        return siteAfterSubmit;
    }

    public void setSiteAfterSubmit(String siteAfterSubmit) {
        this.siteAfterSubmit = siteAfterSubmit;
    }

    public String getPageAfterSubmit() {
        return pageAfterSubmit;
    }

    public void setPageAfterSubmit(String pageAfterSubmit) {
        this.pageAfterSubmit = pageAfterSubmit;
    }

    public Integer getPageAfterSubmitformat() {
        return pageAfterSubmitformat;
    }

    public void setPageAfterSubmitformat(Integer pageAfterSubmitformat) {
        this.pageAfterSubmitformat = pageAfterSubmitformat;
    }

    public Boolean getPublishStats() {
        return publishStats;
    }

    public void setPublishStats(Boolean publishStats) {
        this.publishStats = publishStats;
    }

    public Long getTimeopen() {
        return timeopen;
    }

    public void setTimeopen(Long timeopen) {
        this.timeopen = timeopen;
    }

    public Long getTimeclose() {
        return timeclose;
    }

    public void setTimeclose(Long timeclose) {
        this.timeclose = timeclose;
    }

    public Long getTimemodified() {
        return timemodified;
    }

    public void setTimemodified(Long timemodified) {
        this.timemodified = timemodified;
    }

    public Boolean getCompletionsubmit() {
        return completionsubmit;
    }

    public void setCompletionsubmit(Boolean completionsubmit) {
        this.completionsubmit = completionsubmit;
    }

    @Override
    protected Serializable pkVal() {
        return null;
    }

    @Override
    public String toString() {
        return "MdlFeedback{" +
        ", id=" + id +
        ", course=" + course +
        ", name=" + name +
        ", intro=" + intro +
        ", introformat=" + introformat +
        ", anonymous=" + anonymous +
        ", emailNotification=" + emailNotification +
        ", multipleSubmit=" + multipleSubmit +
        ", autonumbering=" + autonumbering +
        ", siteAfterSubmit=" + siteAfterSubmit +
        ", pageAfterSubmit=" + pageAfterSubmit +
        ", pageAfterSubmitformat=" + pageAfterSubmitformat +
        ", publishStats=" + publishStats +
        ", timeopen=" + timeopen +
        ", timeclose=" + timeclose +
        ", timemodified=" + timemodified +
        ", completionsubmit=" + completionsubmit +
        "}";
    }
}
