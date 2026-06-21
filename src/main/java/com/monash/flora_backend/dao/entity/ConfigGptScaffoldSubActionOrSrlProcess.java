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
 * @since 2024-02-17
 */
public class ConfigGptScaffoldSubActionOrSrlProcess extends Model<ConfigGptScaffoldSubActionOrSrlProcess> {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    private String subActionOrSrlProcess;

    private String notExistPrompt;

    private String existPrompt;

    private Integer threshold;

    private String appearOverThresholdPrompt;

    private String appearLessThanEqualThresholdPrompt;

//    private Long configGptScaffoldId;

    private Long configGenericoTemplateId;

    private String type;

    private Integer triggerNumber;
    private Integer triggerMinute;

    private Integer checkSrlProcessBeginMinute;

    private Integer checkSrlProcessEndMinute;

    public Integer getTriggerMinute() {
        return triggerMinute;
    }

    public void setTriggerMinute(Integer triggerMinute) {
        this.triggerMinute = triggerMinute;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSubActionOrSrlProcess() {
        return subActionOrSrlProcess;
    }

    public void setSubActionOrSrlProcess(String subActionOrSrlProcess) {
        this.subActionOrSrlProcess = subActionOrSrlProcess;
    }

    public String getNotExistPrompt() {
        return notExistPrompt;
    }

    public void setNotExistPrompt(String notExistPrompt) {
        this.notExistPrompt = notExistPrompt;
    }

    public String getExistPrompt() {
        return existPrompt;
    }

    public void setExistPrompt(String existPrompt) {
        this.existPrompt = existPrompt;
    }

    public Integer getThreshold() {
        return threshold;
    }

    public void setThreshold(Integer threshold) {
        this.threshold = threshold;
    }

    public String getAppearOverThresholdPrompt() {
        return appearOverThresholdPrompt;
    }

    public void setAppearOverThresholdPrompt(String appearOverThresholdPrompt) {
        this.appearOverThresholdPrompt = appearOverThresholdPrompt;
    }

    public String getAppearLessThanEqualThresholdPrompt() {
        return appearLessThanEqualThresholdPrompt;
    }

    public void setAppearLessThanEqualThresholdPrompt(String appearLessThanEqualThresholdPrompt) {
        this.appearLessThanEqualThresholdPrompt = appearLessThanEqualThresholdPrompt;
    }


    public Long getConfigGenericoTemplateId() {
        return configGenericoTemplateId;
    }

    public void setConfigGenericoTemplateId(Long configGenericoTemplateId) {
        this.configGenericoTemplateId = configGenericoTemplateId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Integer getTriggerNumber() {
        return triggerNumber;
    }

    public void setTriggerNumber(Integer triggerNumber) {
        this.triggerNumber = triggerNumber;
    }

    public Integer getCheckSrlProcessBeginMinute() {
        return checkSrlProcessBeginMinute;
    }

    public void setCheckSrlProcessBeginMinute(Integer checkSrlProcessBeginMinute) {
        this.checkSrlProcessBeginMinute = checkSrlProcessBeginMinute;
    }

    public Integer getCheckSrlProcessEndMinute() {
        return checkSrlProcessEndMinute;
    }

    public void setCheckSrlProcessEndMinute(Integer checkSrlProcessEndMinute) {
        this.checkSrlProcessEndMinute = checkSrlProcessEndMinute;
    }

    @Override
    protected Serializable pkVal() {
        return null;
    }

    @Override
    public String toString() {
        return "ConfigGptScaffoldSubActionOrSrlProcess{" +
                "id=" + id +
                ", subActionOrSrlProcess='" + subActionOrSrlProcess + '\'' +
                ", notExistPrompt='" + notExistPrompt + '\'' +
                ", existPrompt='" + existPrompt + '\'' +
                ", threshold=" + threshold +
                ", appearOverThresholdPrompt='" + appearOverThresholdPrompt + '\'' +
                ", appearLessThanEqualThresholdPrompt='" + appearLessThanEqualThresholdPrompt + '\'' +
                ", configGenericoTemplateId=" + configGenericoTemplateId +
                ", type='" + type + '\'' +
                ", triggerNumber=" + triggerNumber +
                ", checkSrlProcessBeginMinute=" + checkSrlProcessBeginMinute +
                ", checkSrlProcessEndMinute=" + checkSrlProcessEndMinute +
                '}';
    }
}
