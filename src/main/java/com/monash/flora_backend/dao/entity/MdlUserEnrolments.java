package com.monash.flora_backend.dao.entity;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import com.baomidou.mybatisplus.annotation.TableId;
import java.io.Serializable;
/**
 * <p>
 * Users participating in courses (aka enrolled users) - everyb
 * </p>
 *
 * @author xinyu
 * @since 2023-09-15
 */
public class MdlUserEnrolments extends Model<MdlUserEnrolments> {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    private Long status;

    private Long enrolid;

    private Long userid;

    private Long timestart;

    private Long timeend;

    private Long modifierid;

    private Long timecreated;

    private Long timemodified;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getStatus() {
        return status;
    }

    public void setStatus(Long status) {
        this.status = status;
    }

    public Long getEnrolid() {
        return enrolid;
    }

    public void setEnrolid(Long enrolid) {
        this.enrolid = enrolid;
    }

    public Long getUserid() {
        return userid;
    }

    public void setUserid(Long userid) {
        this.userid = userid;
    }

    public Long getTimestart() {
        return timestart;
    }

    public void setTimestart(Long timestart) {
        this.timestart = timestart;
    }

    public Long getTimeend() {
        return timeend;
    }

    public void setTimeend(Long timeend) {
        this.timeend = timeend;
    }

    public Long getModifierid() {
        return modifierid;
    }

    public void setModifierid(Long modifierid) {
        this.modifierid = modifierid;
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

    @Override
    protected Serializable pkVal() {
        return null;
    }

    @Override
    public String toString() {
        return "MdlUserEnrolments{" +
        ", id=" + id +
        ", status=" + status +
        ", enrolid=" + enrolid +
        ", userid=" + userid +
        ", timestart=" + timestart +
        ", timeend=" + timeend +
        ", modifierid=" + modifierid +
        ", timecreated=" + timecreated +
        ", timemodified=" + timemodified +
        "}";
    }
}
