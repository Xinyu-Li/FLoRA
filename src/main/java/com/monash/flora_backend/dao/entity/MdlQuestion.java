package com.monash.flora_backend.dao.entity;
import java.math.BigDecimal;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import com.baomidou.mybatisplus.annotation.TableId;
import java.io.Serializable;
/**
 * <p>
 * This table stores the definition of one version of a questio
 * </p>
 *
 * @author xinyu
 * @since 2023-10-26
 */
public class MdlQuestion extends Model<MdlQuestion> {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    private Long parent;

    private String name;

    private String questiontext;

    private Integer questiontextformat;

    private String generalfeedback;

    private Integer generalfeedbackformat;

    private BigDecimal defaultmark;

    private BigDecimal penalty;

    private String qtype;

    private Long length;

    private String stamp;

    private Long timecreated;

    private Long timemodified;

    private Long createdby;

    private Long modifiedby;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getParent() {
        return parent;
    }

    public void setParent(Long parent) {
        this.parent = parent;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getQuestiontext() {
        return questiontext;
    }

    public void setQuestiontext(String questiontext) {
        this.questiontext = questiontext;
    }

    public Integer getQuestiontextformat() {
        return questiontextformat;
    }

    public void setQuestiontextformat(Integer questiontextformat) {
        this.questiontextformat = questiontextformat;
    }

    public String getGeneralfeedback() {
        return generalfeedback;
    }

    public void setGeneralfeedback(String generalfeedback) {
        this.generalfeedback = generalfeedback;
    }

    public Integer getGeneralfeedbackformat() {
        return generalfeedbackformat;
    }

    public void setGeneralfeedbackformat(Integer generalfeedbackformat) {
        this.generalfeedbackformat = generalfeedbackformat;
    }

    public BigDecimal getDefaultmark() {
        return defaultmark;
    }

    public void setDefaultmark(BigDecimal defaultmark) {
        this.defaultmark = defaultmark;
    }

    public BigDecimal getPenalty() {
        return penalty;
    }

    public void setPenalty(BigDecimal penalty) {
        this.penalty = penalty;
    }

    public String getQtype() {
        return qtype;
    }

    public void setQtype(String qtype) {
        this.qtype = qtype;
    }

    public Long getLength() {
        return length;
    }

    public void setLength(Long length) {
        this.length = length;
    }

    public String getStamp() {
        return stamp;
    }

    public void setStamp(String stamp) {
        this.stamp = stamp;
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

    public Long getCreatedby() {
        return createdby;
    }

    public void setCreatedby(Long createdby) {
        this.createdby = createdby;
    }

    public Long getModifiedby() {
        return modifiedby;
    }

    public void setModifiedby(Long modifiedby) {
        this.modifiedby = modifiedby;
    }

    @Override
    protected Serializable pkVal() {
        return null;
    }

    @Override
    public String toString() {
        return "MdlQuestion{" +
        ", id=" + id +
        ", parent=" + parent +
        ", name=" + name +
        ", questiontext=" + questiontext +
        ", questiontextformat=" + questiontextformat +
        ", generalfeedback=" + generalfeedback +
        ", generalfeedbackformat=" + generalfeedbackformat +
        ", defaultmark=" + defaultmark +
        ", penalty=" + penalty +
        ", qtype=" + qtype +
        ", length=" + length +
        ", stamp=" + stamp +
        ", timecreated=" + timecreated +
        ", timemodified=" + timemodified +
        ", createdby=" + createdby +
        ", modifiedby=" + modifiedby +
        "}";
    }
}
