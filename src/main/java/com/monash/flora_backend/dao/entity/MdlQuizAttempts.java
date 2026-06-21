package com.monash.flora_backend.dao.entity;
import java.math.BigDecimal;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import com.baomidou.mybatisplus.annotation.TableId;
import java.io.Serializable;
/**
 * <p>
 * Stores users attempts at quizzes.
 * </p>
 *
 * @author xinyu
 * @since 2023-10-26
 */
public class MdlQuizAttempts extends Model<MdlQuizAttempts> {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    private Long quiz;

    private Long userid;

    private Integer attempt;

    private Long uniqueid;

    private String layout;

    private Long currentpage;

    private Integer preview;

    private String state;

    private Long timestart;

    private Long timefinish;

    private Long timemodified;

    private Long timemodifiedoffline;

    private Long timecheckstate;

    private BigDecimal sumgrades;

    private Long gradednotificationsenttime;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getQuiz() {
        return quiz;
    }

    public void setQuiz(Long quiz) {
        this.quiz = quiz;
    }

    public Long getUserid() {
        return userid;
    }

    public void setUserid(Long userid) {
        this.userid = userid;
    }

    public Integer getAttempt() {
        return attempt;
    }

    public void setAttempt(Integer attempt) {
        this.attempt = attempt;
    }

    public Long getUniqueid() {
        return uniqueid;
    }

    public void setUniqueid(Long uniqueid) {
        this.uniqueid = uniqueid;
    }

    public String getLayout() {
        return layout;
    }

    public void setLayout(String layout) {
        this.layout = layout;
    }

    public Long getCurrentpage() {
        return currentpage;
    }

    public void setCurrentpage(Long currentpage) {
        this.currentpage = currentpage;
    }

    public Integer getPreview() {
        return preview;
    }

    public void setPreview(Integer preview) {
        this.preview = preview;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public Long getTimestart() {
        return timestart;
    }

    public void setTimestart(Long timestart) {
        this.timestart = timestart;
    }

    public Long getTimefinish() {
        return timefinish;
    }

    public void setTimefinish(Long timefinish) {
        this.timefinish = timefinish;
    }

    public Long getTimemodified() {
        return timemodified;
    }

    public void setTimemodified(Long timemodified) {
        this.timemodified = timemodified;
    }

    public Long getTimemodifiedoffline() {
        return timemodifiedoffline;
    }

    public void setTimemodifiedoffline(Long timemodifiedoffline) {
        this.timemodifiedoffline = timemodifiedoffline;
    }

    public Long getTimecheckstate() {
        return timecheckstate;
    }

    public void setTimecheckstate(Long timecheckstate) {
        this.timecheckstate = timecheckstate;
    }

    public BigDecimal getSumgrades() {
        return sumgrades;
    }

    public void setSumgrades(BigDecimal sumgrades) {
        this.sumgrades = sumgrades;
    }

    public Long getGradednotificationsenttime() {
        return gradednotificationsenttime;
    }

    public void setGradednotificationsenttime(Long gradednotificationsenttime) {
        this.gradednotificationsenttime = gradednotificationsenttime;
    }

    @Override
    protected Serializable pkVal() {
        return null;
    }

    @Override
    public String toString() {
        return "MdlQuizAttempts{" +
        ", id=" + id +
        ", quiz=" + quiz +
        ", userid=" + userid +
        ", attempt=" + attempt +
        ", uniqueid=" + uniqueid +
        ", layout=" + layout +
        ", currentpage=" + currentpage +
        ", preview=" + preview +
        ", state=" + state +
        ", timestart=" + timestart +
        ", timefinish=" + timefinish +
        ", timemodified=" + timemodified +
        ", timemodifiedoffline=" + timemodifiedoffline +
        ", timecheckstate=" + timecheckstate +
        ", sumgrades=" + sumgrades +
        ", gradednotificationsenttime=" + gradednotificationsenttime +
        "}";
    }
}
