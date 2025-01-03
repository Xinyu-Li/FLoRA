package com.monash.flora_backend.dao.entity;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import com.baomidou.mybatisplus.annotation.TableId;
import java.io.Serializable;
/**
 * <p>
 * Each record is one SURVEY module with its configuration
 * </p>
 *
 * @author xinyu
 * @since 2023-09-15
 */
public class MdlSurvey extends Model<MdlSurvey> {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    private Long course;

    private Long template;

    private Integer days;

    private Long timecreated;

    private Long timemodified;

    private String name;

    private String intro;

    private Integer introformat;

    private String questions;

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

    public Long getTemplate() {
        return template;
    }

    public void setTemplate(Long template) {
        this.template = template;
    }

    public Integer getDays() {
        return days;
    }

    public void setDays(Integer days) {
        this.days = days;
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

    public String getQuestions() {
        return questions;
    }

    public void setQuestions(String questions) {
        this.questions = questions;
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
        return "MdlSurvey{" +
        ", id=" + id +
        ", course=" + course +
        ", template=" + template +
        ", days=" + days +
        ", timecreated=" + timecreated +
        ", timemodified=" + timemodified +
        ", name=" + name +
        ", intro=" + intro +
        ", introformat=" + introformat +
        ", questions=" + questions +
        ", completionsubmit=" + completionsubmit +
        "}";
    }
}
