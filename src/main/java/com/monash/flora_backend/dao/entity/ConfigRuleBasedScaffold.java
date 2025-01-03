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
public class ConfigRuleBasedScaffold extends Model<ConfigRuleBasedScaffold> {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    private Integer triggerNumber;

    private Integer triggerMinute;

    private String mainMessage;

    private String optionsContent;

    private Long configGenericoTemplateId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getTriggerNumber() {
        return triggerNumber;
    }

    public void setTriggerNumber(Integer triggerNumber) {
        this.triggerNumber = triggerNumber;
    }

    public Integer getTriggerMinute() {
        return triggerMinute;
    }

    public void setTriggerMinute(Integer triggerMinute) {
        this.triggerMinute = triggerMinute;
    }

    public String getMainMessage() {
        return mainMessage;
    }

    public void setMainMessage(String mainMessage) {
        this.mainMessage = mainMessage;
    }

    public String getOptionsContent() {
        return optionsContent;
    }

    public void setOptionsContent(String optionsContent) {
        this.optionsContent = optionsContent;
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
        return "ConfigRuleBasedScaffold{" +
        ", id=" + id +
        ", triggerNumber=" + triggerNumber +
        ", triggerMinute=" + triggerMinute +
        ", mainMessage=" + mainMessage +
        ", optionsContent=" + optionsContent +
        ", configGenericoTemplateId=" + configGenericoTemplateId +
        "}";
    }
}
