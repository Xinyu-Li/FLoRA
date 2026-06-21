package com.monash.flora_backend.dao.entity;
import java.math.BigDecimal;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import com.baomidou.mybatisplus.annotation.TableId;
import java.io.Serializable;
/**
 * <p>
 * Each row here corresponds to an attempt at one question, as 
 * </p>
 *
 * @author xinyu
 * @since 2023-10-26
 */
public class MdlQuestionAttempts extends Model<MdlQuestionAttempts> {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    private Long questionusageid;

    private Long slot;

    private String behaviour;

    private Long questionid;

    private Long variant;

    private BigDecimal maxmark;

    private BigDecimal minfraction;

    private BigDecimal maxfraction;

    private Boolean flagged;

    private String questionsummary;

    private String rightanswer;

    private String responsesummary;

    private Long timemodified;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getQuestionusageid() {
        return questionusageid;
    }

    public void setQuestionusageid(Long questionusageid) {
        this.questionusageid = questionusageid;
    }

    public Long getSlot() {
        return slot;
    }

    public void setSlot(Long slot) {
        this.slot = slot;
    }

    public String getBehaviour() {
        return behaviour;
    }

    public void setBehaviour(String behaviour) {
        this.behaviour = behaviour;
    }

    public Long getQuestionid() {
        return questionid;
    }

    public void setQuestionid(Long questionid) {
        this.questionid = questionid;
    }

    public Long getVariant() {
        return variant;
    }

    public void setVariant(Long variant) {
        this.variant = variant;
    }

    public BigDecimal getMaxmark() {
        return maxmark;
    }

    public void setMaxmark(BigDecimal maxmark) {
        this.maxmark = maxmark;
    }

    public BigDecimal getMinfraction() {
        return minfraction;
    }

    public void setMinfraction(BigDecimal minfraction) {
        this.minfraction = minfraction;
    }

    public BigDecimal getMaxfraction() {
        return maxfraction;
    }

    public void setMaxfraction(BigDecimal maxfraction) {
        this.maxfraction = maxfraction;
    }

    public Boolean getFlagged() {
        return flagged;
    }

    public void setFlagged(Boolean flagged) {
        this.flagged = flagged;
    }

    public String getQuestionsummary() {
        return questionsummary;
    }

    public void setQuestionsummary(String questionsummary) {
        this.questionsummary = questionsummary;
    }

    public String getRightanswer() {
        return rightanswer;
    }

    public void setRightanswer(String rightanswer) {
        this.rightanswer = rightanswer;
    }

    public String getResponsesummary() {
        return responsesummary;
    }

    public void setResponsesummary(String responsesummary) {
        this.responsesummary = responsesummary;
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
        return "MdlQuestionAttempts{" +
        ", id=" + id +
        ", questionusageid=" + questionusageid +
        ", slot=" + slot +
        ", behaviour=" + behaviour +
        ", questionid=" + questionid +
        ", variant=" + variant +
        ", maxmark=" + maxmark +
        ", minfraction=" + minfraction +
        ", maxfraction=" + maxfraction +
        ", flagged=" + flagged +
        ", questionsummary=" + questionsummary +
        ", rightanswer=" + rightanswer +
        ", responsesummary=" + responsesummary +
        ", timemodified=" + timemodified +
        "}";
    }
}
