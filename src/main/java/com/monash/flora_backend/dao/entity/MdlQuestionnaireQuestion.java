package com.monash.flora_backend.dao.entity;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import com.baomidou.mybatisplus.annotation.TableId;
import java.io.Serializable;
/**
 * <p>
 * questionnaire_question table retrofitted from MySQL
 * </p>
 *
 * @author xinyu
 * @since 2023-09-29
 */
public class MdlQuestionnaireQuestion extends Model<MdlQuestionnaireQuestion> {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    private Long surveyid;

    private String name;

    private Long typeId;

    private Long resultId;

    private Long length;

    private Long precise;

    private Long position;

    private String content;

    private String required;

    private String deleted;

    private String extradata;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getSurveyid() {
        return surveyid;
    }

    public void setSurveyid(Long surveyid) {
        this.surveyid = surveyid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getTypeId() {
        return typeId;
    }

    public void setTypeId(Long typeId) {
        this.typeId = typeId;
    }

    public Long getResultId() {
        return resultId;
    }

    public void setResultId(Long resultId) {
        this.resultId = resultId;
    }

    public Long getLength() {
        return length;
    }

    public void setLength(Long length) {
        this.length = length;
    }

    public Long getPrecise() {
        return precise;
    }

    public void setPrecise(Long precise) {
        this.precise = precise;
    }

    public Long getPosition() {
        return position;
    }

    public void setPosition(Long position) {
        this.position = position;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getRequired() {
        return required;
    }

    public void setRequired(String required) {
        this.required = required;
    }

    public String getDeleted() {
        return deleted;
    }

    public void setDeleted(String deleted) {
        this.deleted = deleted;
    }

    public String getExtradata() {
        return extradata;
    }

    public void setExtradata(String extradata) {
        this.extradata = extradata;
    }

    @Override
    protected Serializable pkVal() {
        return null;
    }

    @Override
    public String toString() {
        return "MdlQuestionnaireQuestion{" +
        ", id=" + id +
        ", surveyid=" + surveyid +
        ", name=" + name +
        ", typeId=" + typeId +
        ", resultId=" + resultId +
        ", length=" + length +
        ", precise=" + precise +
        ", position=" + position +
        ", content=" + content +
        ", required=" + required +
        ", deleted=" + deleted +
        ", extradata=" + extradata +
        "}";
    }
}
