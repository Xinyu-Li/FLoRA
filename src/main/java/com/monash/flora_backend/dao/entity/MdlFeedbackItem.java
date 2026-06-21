package com.monash.flora_backend.dao.entity;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import com.baomidou.mybatisplus.annotation.TableId;
import java.io.Serializable;
/**
 * <p>
 * feedback_items
 * </p>
 *
 * @author xinyu
 * @since 2023-09-29
 */
public class MdlFeedbackItem extends Model<MdlFeedbackItem> {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    private Long feedback;

    private Long template;

    private String name;

    private String label;

    private String presentation;

    private String typ;

    private Boolean hasvalue;

    private Integer position;

    private Boolean required;

    private Long dependitem;

    private String dependvalue;

    private String options;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getFeedback() {
        return feedback;
    }

    public void setFeedback(Long feedback) {
        this.feedback = feedback;
    }

    public Long getTemplate() {
        return template;
    }

    public void setTemplate(Long template) {
        this.template = template;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getPresentation() {
        return presentation;
    }

    public void setPresentation(String presentation) {
        this.presentation = presentation;
    }

    public String getTyp() {
        return typ;
    }

    public void setTyp(String typ) {
        this.typ = typ;
    }

    public Boolean getHasvalue() {
        return hasvalue;
    }

    public void setHasvalue(Boolean hasvalue) {
        this.hasvalue = hasvalue;
    }

    public Integer getPosition() {
        return position;
    }

    public void setPosition(Integer position) {
        this.position = position;
    }

    public Boolean getRequired() {
        return required;
    }

    public void setRequired(Boolean required) {
        this.required = required;
    }

    public Long getDependitem() {
        return dependitem;
    }

    public void setDependitem(Long dependitem) {
        this.dependitem = dependitem;
    }

    public String getDependvalue() {
        return dependvalue;
    }

    public void setDependvalue(String dependvalue) {
        this.dependvalue = dependvalue;
    }

    public String getOptions() {
        return options;
    }

    public void setOptions(String options) {
        this.options = options;
    }

    @Override
    protected Serializable pkVal() {
        return null;
    }

    @Override
    public String toString() {
        return "MdlFeedbackItem{" +
        ", id=" + id +
        ", feedback=" + feedback +
        ", template=" + template +
        ", name=" + name +
        ", label=" + label +
        ", presentation=" + presentation +
        ", typ=" + typ +
        ", hasvalue=" + hasvalue +
        ", position=" + position +
        ", required=" + required +
        ", dependitem=" + dependitem +
        ", dependvalue=" + dependvalue +
        ", options=" + options +
        "}";
    }
}
