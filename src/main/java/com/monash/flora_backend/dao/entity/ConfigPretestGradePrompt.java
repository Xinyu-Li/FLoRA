package com.monash.flora_backend.dao.entity;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import com.baomidou.mybatisplus.annotation.TableId;
import java.io.Serializable;
/**
 * <p>
 * 
 * </p>
 *
 * @author xinyu
 * @since 2024-02-15
 */
public class ConfigPretestGradePrompt extends Model<ConfigPretestGradePrompt> {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    private Integer threshold;

    private String prompt;

    private Long configGenericoTemplateId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getThreshold() {
        return threshold;
    }

    public void setThreshold(Integer threshold) {
        this.threshold = threshold;
    }

    public String getPrompt() {
        return prompt;
    }

    public void setPrompt(String prompt) {
        this.prompt = prompt;
    }

    public Long getConfigGenericoTemplateId() {
        return configGenericoTemplateId;
    }

    public void setConfigGenericoTemplateId(Long configGenericoTemplateId) {
        this.configGenericoTemplateId = configGenericoTemplateId;
    }

    @Override
    protected Serializable pkVal() {
        return null;
    }

    @Override
    public String toString() {
        return "ConfigPretestGradePrompt{" +
        ", id=" + id +
        ", threshold=" + threshold +
        ", prompt=" + prompt +
        ", configGenericoTemplateId=" + configGenericoTemplateId +
        "}";
    }
}
