package com.monash.flora_backend.dao.entity;
import java.math.BigDecimal;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import com.baomidou.mybatisplus.annotation.TableId;
import java.io.Serializable;
/**
 * <p>
 * Instances of enrolment plugins used in courses, fields marke
 * </p>
 *
 * @author xinyu
 * @since 2023-09-15
 */
public class MdlEnrol extends Model<MdlEnrol> {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    private String enrol;

    private Long status;

    private Long courseid;

    private Long sortorder;

    private String name;

    private Long enrolperiod;

    private Long enrolstartdate;

    private Long enrolenddate;

    private Boolean expirynotify;

    private Long expirythreshold;

    private Boolean notifyall;

    private String password;

    private String cost;

    private String currency;

    private Long roleid;

    private Long customint1;

    private Long customint2;

    private Long customint3;

    private Long customint4;

    private Long customint5;

    private Long customint6;

    private Long customint7;

    private Long customint8;

    private String customchar1;

    private String customchar2;

    private String customchar3;

    private BigDecimal customdec1;

    private BigDecimal customdec2;

    private String customtext1;

    private String customtext2;

    private String customtext3;

    private String customtext4;

    private Long timecreated;

    private Long timemodified;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEnrol() {
        return enrol;
    }

    public void setEnrol(String enrol) {
        this.enrol = enrol;
    }

    public Long getStatus() {
        return status;
    }

    public void setStatus(Long status) {
        this.status = status;
    }

    public Long getCourseid() {
        return courseid;
    }

    public void setCourseid(Long courseid) {
        this.courseid = courseid;
    }

    public Long getSortorder() {
        return sortorder;
    }

    public void setSortorder(Long sortorder) {
        this.sortorder = sortorder;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getEnrolperiod() {
        return enrolperiod;
    }

    public void setEnrolperiod(Long enrolperiod) {
        this.enrolperiod = enrolperiod;
    }

    public Long getEnrolstartdate() {
        return enrolstartdate;
    }

    public void setEnrolstartdate(Long enrolstartdate) {
        this.enrolstartdate = enrolstartdate;
    }

    public Long getEnrolenddate() {
        return enrolenddate;
    }

    public void setEnrolenddate(Long enrolenddate) {
        this.enrolenddate = enrolenddate;
    }

    public Boolean getExpirynotify() {
        return expirynotify;
    }

    public void setExpirynotify(Boolean expirynotify) {
        this.expirynotify = expirynotify;
    }

    public Long getExpirythreshold() {
        return expirythreshold;
    }

    public void setExpirythreshold(Long expirythreshold) {
        this.expirythreshold = expirythreshold;
    }

    public Boolean getNotifyall() {
        return notifyall;
    }

    public void setNotifyall(Boolean notifyall) {
        this.notifyall = notifyall;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getCost() {
        return cost;
    }

    public void setCost(String cost) {
        this.cost = cost;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public Long getRoleid() {
        return roleid;
    }

    public void setRoleid(Long roleid) {
        this.roleid = roleid;
    }

    public Long getCustomint1() {
        return customint1;
    }

    public void setCustomint1(Long customint1) {
        this.customint1 = customint1;
    }

    public Long getCustomint2() {
        return customint2;
    }

    public void setCustomint2(Long customint2) {
        this.customint2 = customint2;
    }

    public Long getCustomint3() {
        return customint3;
    }

    public void setCustomint3(Long customint3) {
        this.customint3 = customint3;
    }

    public Long getCustomint4() {
        return customint4;
    }

    public void setCustomint4(Long customint4) {
        this.customint4 = customint4;
    }

    public Long getCustomint5() {
        return customint5;
    }

    public void setCustomint5(Long customint5) {
        this.customint5 = customint5;
    }

    public Long getCustomint6() {
        return customint6;
    }

    public void setCustomint6(Long customint6) {
        this.customint6 = customint6;
    }

    public Long getCustomint7() {
        return customint7;
    }

    public void setCustomint7(Long customint7) {
        this.customint7 = customint7;
    }

    public Long getCustomint8() {
        return customint8;
    }

    public void setCustomint8(Long customint8) {
        this.customint8 = customint8;
    }

    public String getCustomchar1() {
        return customchar1;
    }

    public void setCustomchar1(String customchar1) {
        this.customchar1 = customchar1;
    }

    public String getCustomchar2() {
        return customchar2;
    }

    public void setCustomchar2(String customchar2) {
        this.customchar2 = customchar2;
    }

    public String getCustomchar3() {
        return customchar3;
    }

    public void setCustomchar3(String customchar3) {
        this.customchar3 = customchar3;
    }

    public BigDecimal getCustomdec1() {
        return customdec1;
    }

    public void setCustomdec1(BigDecimal customdec1) {
        this.customdec1 = customdec1;
    }

    public BigDecimal getCustomdec2() {
        return customdec2;
    }

    public void setCustomdec2(BigDecimal customdec2) {
        this.customdec2 = customdec2;
    }

    public String getCustomtext1() {
        return customtext1;
    }

    public void setCustomtext1(String customtext1) {
        this.customtext1 = customtext1;
    }

    public String getCustomtext2() {
        return customtext2;
    }

    public void setCustomtext2(String customtext2) {
        this.customtext2 = customtext2;
    }

    public String getCustomtext3() {
        return customtext3;
    }

    public void setCustomtext3(String customtext3) {
        this.customtext3 = customtext3;
    }

    public String getCustomtext4() {
        return customtext4;
    }

    public void setCustomtext4(String customtext4) {
        this.customtext4 = customtext4;
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
        return "MdlEnrol{" +
        ", id=" + id +
        ", enrol=" + enrol +
        ", status=" + status +
        ", courseid=" + courseid +
        ", sortorder=" + sortorder +
        ", name=" + name +
        ", enrolperiod=" + enrolperiod +
        ", enrolstartdate=" + enrolstartdate +
        ", enrolenddate=" + enrolenddate +
        ", expirynotify=" + expirynotify +
        ", expirythreshold=" + expirythreshold +
        ", notifyall=" + notifyall +
        ", password=" + password +
        ", cost=" + cost +
        ", currency=" + currency +
        ", roleid=" + roleid +
        ", customint1=" + customint1 +
        ", customint2=" + customint2 +
        ", customint3=" + customint3 +
        ", customint4=" + customint4 +
        ", customint5=" + customint5 +
        ", customint6=" + customint6 +
        ", customint7=" + customint7 +
        ", customint8=" + customint8 +
        ", customchar1=" + customchar1 +
        ", customchar2=" + customchar2 +
        ", customchar3=" + customchar3 +
        ", customdec1=" + customdec1 +
        ", customdec2=" + customdec2 +
        ", customtext1=" + customtext1 +
        ", customtext2=" + customtext2 +
        ", customtext3=" + customtext3 +
        ", customtext4=" + customtext4 +
        ", timecreated=" + timecreated +
        ", timemodified=" + timemodified +
        "}";
    }
}
