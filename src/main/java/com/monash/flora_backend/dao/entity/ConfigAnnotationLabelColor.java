package com.monash.flora_backend.dao.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.extension.activerecord.Model;

import java.io.Serializable;

/**
 * @author Xinyu Li
 * @date 2/19/2024
 */
public class ConfigAnnotationLabelColor extends Model<ConfigAnnotationLabelColor> {
    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    private String annotationLabel;
    private String annotationLabelColor;

    private Long configGenericoTemplateId;

    public Long getConfigGenericoTemplateId() {
        return configGenericoTemplateId;
    }

    public void setConfigGenericoTemplateId(Long configGenericoTemplateId) {
        this.configGenericoTemplateId = configGenericoTemplateId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAnnotationLabel() {
        return annotationLabel;
    }

    public void setAnnotationLabel(String annotationLabel) {
        this.annotationLabel = annotationLabel;
    }

    public String getAnnotationLabelColor() {
        return annotationLabelColor;
    }

    public void setAnnotationLabelColor(String annotationLabelColor) {
        this.annotationLabelColor = annotationLabelColor;
    }

    @Override
    protected Serializable pkVal() {
        return null;
    }

    @Override
    public String toString() {
        return "ConfigAnnotationLabelColor{" +
                "id=" + id +
                ", annotationLabel='" + annotationLabel + '\'' +
                ", annotationLabelColor='" + annotationLabelColor + '\'' +
                ", configGenericoTemplateId=" + configGenericoTemplateId +
                '}';
    }
}
