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
public class ConfigPlanner extends Model<ConfigPlanner> {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    private Long configGenericoTemplateId;

    private String plannerOverallStrategy;

    private String plannerTasks;

    private String plannerStrategyInstruction;

    private String plannerTasksAllocatedTimes;

    private Integer plannerStrategyNumber;

    public String getPlannerTasksAllocatedTimes() {
        return plannerTasksAllocatedTimes;
    }

    public void setPlannerTasksAllocatedTimes(String plannerTasksAllocatedTimes) {
        this.plannerTasksAllocatedTimes = plannerTasksAllocatedTimes;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getConfigGenericoTemplateId() {
        return configGenericoTemplateId;
    }

    public void setConfigGenericoTemplateId(Long configGenericoTemplateId) {
        this.configGenericoTemplateId = configGenericoTemplateId;
    }

    public String getPlannerOverallStrategy() {
        return plannerOverallStrategy;
    }

    public void setPlannerOverallStrategy(String plannerOverallStrategy) {
        this.plannerOverallStrategy = plannerOverallStrategy;
    }

    public String getPlannerTasks() {
        return plannerTasks;
    }

    public void setPlannerTasks(String plannerTasks) {
        this.plannerTasks = plannerTasks;
    }

    public String getPlannerStrategyInstruction() {
        return plannerStrategyInstruction;
    }

    public void setPlannerStrategyInstruction(String plannerStrategyInstruction) {
        this.plannerStrategyInstruction = plannerStrategyInstruction;
    }

    public Integer getPlannerStrategyNumber() {
        return plannerStrategyNumber;
    }

    public void setPlannerStrategyNumber(Integer plannerStrategyNumber) {
        this.plannerStrategyNumber = plannerStrategyNumber;
    }

    @Override
    protected Serializable pkVal() {
        return null;
    }

    @Override
    public String toString() {
        return "ConfigPlanner{" +
                "id=" + id +
                ", configGenericoTemplateId=" + configGenericoTemplateId +
                ", plannerOverallStrategy='" + plannerOverallStrategy + '\'' +
                ", plannerTasks='" + plannerTasks + '\'' +
                ", plannerStrategyInstruction='" + plannerStrategyInstruction + '\'' +
                ", plannerTasksAllocatedTimes='" + plannerTasksAllocatedTimes + '\'' +
                ", plannerStrategyNumber=" + plannerStrategyNumber +
                '}';
    }
}
