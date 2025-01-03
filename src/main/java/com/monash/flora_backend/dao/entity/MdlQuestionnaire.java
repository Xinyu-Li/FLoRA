package com.monash.flora_backend.dao.entity;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import com.baomidou.mybatisplus.annotation.TableId;
import java.io.Serializable;
/**
 * <p>
 * Main questionnaire table.
 * </p>
 *
 * @author xinyu
 * @since 2023-09-29
 */
public class MdlQuestionnaire extends Model<MdlQuestionnaire> {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    private Long course;

    private String name;

    private String intro;

    private Integer introformat;

    private Long qtype;

    private String respondenttype;

    private String respEligible;

    private Integer respView;

    private Boolean notifications;

    private Long opendate;

    private Long closedate;

    private Integer resume;

    private Integer navigate;

    private Long grade;

    private Long sid;

    private Long timemodified;

    private Boolean completionsubmit;

    private Boolean autonum;

    private Boolean progressbar;

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

    public Long getQtype() {
        return qtype;
    }

    public void setQtype(Long qtype) {
        this.qtype = qtype;
    }

    public String getRespondenttype() {
        return respondenttype;
    }

    public void setRespondenttype(String respondenttype) {
        this.respondenttype = respondenttype;
    }

    public String getRespEligible() {
        return respEligible;
    }

    public void setRespEligible(String respEligible) {
        this.respEligible = respEligible;
    }

    public Integer getRespView() {
        return respView;
    }

    public void setRespView(Integer respView) {
        this.respView = respView;
    }

    public Boolean getNotifications() {
        return notifications;
    }

    public void setNotifications(Boolean notifications) {
        this.notifications = notifications;
    }

    public Long getOpendate() {
        return opendate;
    }

    public void setOpendate(Long opendate) {
        this.opendate = opendate;
    }

    public Long getClosedate() {
        return closedate;
    }

    public void setClosedate(Long closedate) {
        this.closedate = closedate;
    }

    public Integer getResume() {
        return resume;
    }

    public void setResume(Integer resume) {
        this.resume = resume;
    }

    public Integer getNavigate() {
        return navigate;
    }

    public void setNavigate(Integer navigate) {
        this.navigate = navigate;
    }

    public Long getGrade() {
        return grade;
    }

    public void setGrade(Long grade) {
        this.grade = grade;
    }

    public Long getSid() {
        return sid;
    }

    public void setSid(Long sid) {
        this.sid = sid;
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

    public Boolean getAutonum() {
        return autonum;
    }

    public void setAutonum(Boolean autonum) {
        this.autonum = autonum;
    }

    public Boolean getProgressbar() {
        return progressbar;
    }

    public void setProgressbar(Boolean progressbar) {
        this.progressbar = progressbar;
    }

    @Override
    protected Serializable pkVal() {
        return null;
    }

    @Override
    public String toString() {
        return "MdlQuestionnaire{" +
        ", id=" + id +
        ", course=" + course +
        ", name=" + name +
        ", intro=" + intro +
        ", introformat=" + introformat +
        ", qtype=" + qtype +
        ", respondenttype=" + respondenttype +
        ", respEligible=" + respEligible +
        ", respView=" + respView +
        ", notifications=" + notifications +
        ", opendate=" + opendate +
        ", closedate=" + closedate +
        ", resume=" + resume +
        ", navigate=" + navigate +
        ", grade=" + grade +
        ", sid=" + sid +
        ", timemodified=" + timemodified +
        ", completionsubmit=" + completionsubmit +
        ", autonum=" + autonum +
        ", progressbar=" + progressbar +
        "}";
    }
}
