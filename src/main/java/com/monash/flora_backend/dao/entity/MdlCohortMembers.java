package com.monash.flora_backend.dao.entity;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import com.baomidou.mybatisplus.annotation.TableId;
import java.io.Serializable;
/**
 * <p>
 * Link a user to a cohort.
 * </p>
 *
 * @author xinyu
 * @since 2023-04-18
 */
public class MdlCohortMembers extends Model<MdlCohortMembers> {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    private Long cohortid;

    private Long userid;

    private Long timeadded;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCohortid() {
        return cohortid;
    }

    public void setCohortid(Long cohortid) {
        this.cohortid = cohortid;
    }

    public Long getUserid() {
        return userid;
    }

    public void setUserid(Long userid) {
        this.userid = userid;
    }

    public Long getTimeadded() {
        return timeadded;
    }

    public void setTimeadded(Long timeadded) {
        this.timeadded = timeadded;
    }

    @Override
    protected Serializable pkVal() {
        return null;
    }

    @Override
    public String toString() {
        return "MdlCohortMembers{" +
        ", id=" + id +
        ", cohortid=" + cohortid +
        ", userid=" + userid +
        ", timeadded=" + timeadded +
        "}";
    }
}
