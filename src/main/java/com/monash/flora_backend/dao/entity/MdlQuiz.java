package com.monash.flora_backend.dao.entity;
import java.math.BigDecimal;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import com.baomidou.mybatisplus.annotation.TableId;
import java.io.Serializable;
/**
 * <p>
 * The settings for each quiz.
 * </p>
 *
 * @author xinyu
 * @since 2023-09-29
 */
public class MdlQuiz extends Model<MdlQuiz> {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    private Long course;

    private String name;

    private String intro;

    private Integer introformat;

    private Long timeopen;

    private Long timeclose;

    private Long timelimit;

    private String overduehandling;

    private Long graceperiod;

    private String preferredbehaviour;

    private Integer canredoquestions;

    private Integer attempts;

    private Integer attemptonlast;

    private Integer grademethod;

    private Integer decimalpoints;

    private Integer questiondecimalpoints;

    private Integer reviewattempt;

    private Integer reviewcorrectness;

    private Integer reviewmarks;

    private Integer reviewspecificfeedback;

    private Integer reviewgeneralfeedback;

    private Integer reviewrightanswer;

    private Integer reviewoverallfeedback;

    private Long questionsperpage;

    private String navmethod;

    private Integer shuffleanswers;

    private BigDecimal sumgrades;

    private BigDecimal grade;

    private Long timecreated;

    private Long timemodified;

    private String password;

    private String subnet;

    private String browsersecurity;

    private Long delay1;

    private Long delay2;

    private Integer showuserpicture;

    private Integer showblocks;

    private Boolean completionattemptsexhausted;

    private Long completionminattempts;

    private Boolean allowofflineattempts;

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

    public Long getTimelimit() {
        return timelimit;
    }

    public void setTimelimit(Long timelimit) {
        this.timelimit = timelimit;
    }

    public String getOverduehandling() {
        return overduehandling;
    }

    public void setOverduehandling(String overduehandling) {
        this.overduehandling = overduehandling;
    }

    public Long getGraceperiod() {
        return graceperiod;
    }

    public void setGraceperiod(Long graceperiod) {
        this.graceperiod = graceperiod;
    }

    public String getPreferredbehaviour() {
        return preferredbehaviour;
    }

    public void setPreferredbehaviour(String preferredbehaviour) {
        this.preferredbehaviour = preferredbehaviour;
    }

    public Integer getCanredoquestions() {
        return canredoquestions;
    }

    public void setCanredoquestions(Integer canredoquestions) {
        this.canredoquestions = canredoquestions;
    }

    public Integer getAttempts() {
        return attempts;
    }

    public void setAttempts(Integer attempts) {
        this.attempts = attempts;
    }

    public Integer getAttemptonlast() {
        return attemptonlast;
    }

    public void setAttemptonlast(Integer attemptonlast) {
        this.attemptonlast = attemptonlast;
    }

    public Integer getGrademethod() {
        return grademethod;
    }

    public void setGrademethod(Integer grademethod) {
        this.grademethod = grademethod;
    }

    public Integer getDecimalpoints() {
        return decimalpoints;
    }

    public void setDecimalpoints(Integer decimalpoints) {
        this.decimalpoints = decimalpoints;
    }

    public Integer getQuestiondecimalpoints() {
        return questiondecimalpoints;
    }

    public void setQuestiondecimalpoints(Integer questiondecimalpoints) {
        this.questiondecimalpoints = questiondecimalpoints;
    }

    public Integer getReviewattempt() {
        return reviewattempt;
    }

    public void setReviewattempt(Integer reviewattempt) {
        this.reviewattempt = reviewattempt;
    }

    public Integer getReviewcorrectness() {
        return reviewcorrectness;
    }

    public void setReviewcorrectness(Integer reviewcorrectness) {
        this.reviewcorrectness = reviewcorrectness;
    }

    public Integer getReviewmarks() {
        return reviewmarks;
    }

    public void setReviewmarks(Integer reviewmarks) {
        this.reviewmarks = reviewmarks;
    }

    public Integer getReviewspecificfeedback() {
        return reviewspecificfeedback;
    }

    public void setReviewspecificfeedback(Integer reviewspecificfeedback) {
        this.reviewspecificfeedback = reviewspecificfeedback;
    }

    public Integer getReviewgeneralfeedback() {
        return reviewgeneralfeedback;
    }

    public void setReviewgeneralfeedback(Integer reviewgeneralfeedback) {
        this.reviewgeneralfeedback = reviewgeneralfeedback;
    }

    public Integer getReviewrightanswer() {
        return reviewrightanswer;
    }

    public void setReviewrightanswer(Integer reviewrightanswer) {
        this.reviewrightanswer = reviewrightanswer;
    }

    public Integer getReviewoverallfeedback() {
        return reviewoverallfeedback;
    }

    public void setReviewoverallfeedback(Integer reviewoverallfeedback) {
        this.reviewoverallfeedback = reviewoverallfeedback;
    }

    public Long getQuestionsperpage() {
        return questionsperpage;
    }

    public void setQuestionsperpage(Long questionsperpage) {
        this.questionsperpage = questionsperpage;
    }

    public String getNavmethod() {
        return navmethod;
    }

    public void setNavmethod(String navmethod) {
        this.navmethod = navmethod;
    }

    public Integer getShuffleanswers() {
        return shuffleanswers;
    }

    public void setShuffleanswers(Integer shuffleanswers) {
        this.shuffleanswers = shuffleanswers;
    }

    public BigDecimal getSumgrades() {
        return sumgrades;
    }

    public void setSumgrades(BigDecimal sumgrades) {
        this.sumgrades = sumgrades;
    }

    public BigDecimal getGrade() {
        return grade;
    }

    public void setGrade(BigDecimal grade) {
        this.grade = grade;
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getSubnet() {
        return subnet;
    }

    public void setSubnet(String subnet) {
        this.subnet = subnet;
    }

    public String getBrowsersecurity() {
        return browsersecurity;
    }

    public void setBrowsersecurity(String browsersecurity) {
        this.browsersecurity = browsersecurity;
    }

    public Long getDelay1() {
        return delay1;
    }

    public void setDelay1(Long delay1) {
        this.delay1 = delay1;
    }

    public Long getDelay2() {
        return delay2;
    }

    public void setDelay2(Long delay2) {
        this.delay2 = delay2;
    }

    public Integer getShowuserpicture() {
        return showuserpicture;
    }

    public void setShowuserpicture(Integer showuserpicture) {
        this.showuserpicture = showuserpicture;
    }

    public Integer getShowblocks() {
        return showblocks;
    }

    public void setShowblocks(Integer showblocks) {
        this.showblocks = showblocks;
    }

    public Boolean getCompletionattemptsexhausted() {
        return completionattemptsexhausted;
    }

    public void setCompletionattemptsexhausted(Boolean completionattemptsexhausted) {
        this.completionattemptsexhausted = completionattemptsexhausted;
    }

    public Long getCompletionminattempts() {
        return completionminattempts;
    }

    public void setCompletionminattempts(Long completionminattempts) {
        this.completionminattempts = completionminattempts;
    }

    public Boolean getAllowofflineattempts() {
        return allowofflineattempts;
    }

    public void setAllowofflineattempts(Boolean allowofflineattempts) {
        this.allowofflineattempts = allowofflineattempts;
    }

    @Override
    protected Serializable pkVal() {
        return null;
    }

    @Override
    public String toString() {
        return "MdlQuiz{" +
        ", id=" + id +
        ", course=" + course +
        ", name=" + name +
        ", intro=" + intro +
        ", introformat=" + introformat +
        ", timeopen=" + timeopen +
        ", timeclose=" + timeclose +
        ", timelimit=" + timelimit +
        ", overduehandling=" + overduehandling +
        ", graceperiod=" + graceperiod +
        ", preferredbehaviour=" + preferredbehaviour +
        ", canredoquestions=" + canredoquestions +
        ", attempts=" + attempts +
        ", attemptonlast=" + attemptonlast +
        ", grademethod=" + grademethod +
        ", decimalpoints=" + decimalpoints +
        ", questiondecimalpoints=" + questiondecimalpoints +
        ", reviewattempt=" + reviewattempt +
        ", reviewcorrectness=" + reviewcorrectness +
        ", reviewmarks=" + reviewmarks +
        ", reviewspecificfeedback=" + reviewspecificfeedback +
        ", reviewgeneralfeedback=" + reviewgeneralfeedback +
        ", reviewrightanswer=" + reviewrightanswer +
        ", reviewoverallfeedback=" + reviewoverallfeedback +
        ", questionsperpage=" + questionsperpage +
        ", navmethod=" + navmethod +
        ", shuffleanswers=" + shuffleanswers +
        ", sumgrades=" + sumgrades +
        ", grade=" + grade +
        ", timecreated=" + timecreated +
        ", timemodified=" + timemodified +
        ", password=" + password +
        ", subnet=" + subnet +
        ", browsersecurity=" + browsersecurity +
        ", delay1=" + delay1 +
        ", delay2=" + delay2 +
        ", showuserpicture=" + showuserpicture +
        ", showblocks=" + showblocks +
        ", completionattemptsexhausted=" + completionattemptsexhausted +
        ", completionminattempts=" + completionminattempts +
        ", allowofflineattempts=" + allowofflineattempts +
        "}";
    }
}
