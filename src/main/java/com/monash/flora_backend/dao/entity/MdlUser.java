package com.monash.flora_backend.dao.entity;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import com.baomidou.mybatisplus.annotation.TableId;
import java.io.Serializable;
/**
 * <p>
 * One record for each person
 * </p>
 *
 * @author xinyu
 * @since 2023-04-18
 */
public class MdlUser extends Model<MdlUser> {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    private String auth;

    private Boolean confirmed;

    private Boolean policyagreed;

    private Boolean deleted;

    private Boolean suspended;

    private Long mnethostid;

    private String username;

    private String password;

    private String idnumber;

    private String firstname;

    private String lastname;

    private String email;

    private Boolean emailstop;

    private String phone1;

    private String phone2;

    private String institution;

    private String department;

    private String address;

    private String city;

    private String country;

    private String lang;

    private String calendartype;

    private String theme;

    private String timezone;

    private Long firstaccess;

    private Long lastaccess;

    private Long lastlogin;

    private Long currentlogin;

    private String lastip;

    private String secret;

    private Long picture;

    private String description;

    private Integer descriptionformat;

    private Boolean mailformat;

    private Boolean maildigest;

    private Integer maildisplay;

    private Boolean autosubscribe;

    private Boolean trackforums;

    private Long timecreated;

    private Long timemodified;

    private Long trustbitmask;

    private String imagealt;

    private String lastnamephonetic;

    private String firstnamephonetic;

    private String middlename;

    private String alternatename;

    private String moodlenetprofile;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAuth() {
        return auth;
    }

    public void setAuth(String auth) {
        this.auth = auth;
    }

    public Boolean getConfirmed() {
        return confirmed;
    }

    public void setConfirmed(Boolean confirmed) {
        this.confirmed = confirmed;
    }

    public Boolean getPolicyagreed() {
        return policyagreed;
    }

    public void setPolicyagreed(Boolean policyagreed) {
        this.policyagreed = policyagreed;
    }

    public Boolean getDeleted() {
        return deleted;
    }

    public void setDeleted(Boolean deleted) {
        this.deleted = deleted;
    }

    public Boolean getSuspended() {
        return suspended;
    }

    public void setSuspended(Boolean suspended) {
        this.suspended = suspended;
    }

    public Long getMnethostid() {
        return mnethostid;
    }

    public void setMnethostid(Long mnethostid) {
        this.mnethostid = mnethostid;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getIdnumber() {
        return idnumber;
    }

    public void setIdnumber(String idnumber) {
        this.idnumber = idnumber;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Boolean getEmailstop() {
        return emailstop;
    }

    public void setEmailstop(Boolean emailstop) {
        this.emailstop = emailstop;
    }

    public String getPhone1() {
        return phone1;
    }

    public void setPhone1(String phone1) {
        this.phone1 = phone1;
    }

    public String getPhone2() {
        return phone2;
    }

    public void setPhone2(String phone2) {
        this.phone2 = phone2;
    }

    public String getInstitution() {
        return institution;
    }

    public void setInstitution(String institution) {
        this.institution = institution;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getLang() {
        return lang;
    }

    public void setLang(String lang) {
        this.lang = lang;
    }

    public String getCalendartype() {
        return calendartype;
    }

    public void setCalendartype(String calendartype) {
        this.calendartype = calendartype;
    }

    public String getTheme() {
        return theme;
    }

    public void setTheme(String theme) {
        this.theme = theme;
    }

    public String getTimezone() {
        return timezone;
    }

    public void setTimezone(String timezone) {
        this.timezone = timezone;
    }

    public Long getFirstaccess() {
        return firstaccess;
    }

    public void setFirstaccess(Long firstaccess) {
        this.firstaccess = firstaccess;
    }

    public Long getLastaccess() {
        return lastaccess;
    }

    public void setLastaccess(Long lastaccess) {
        this.lastaccess = lastaccess;
    }

    public Long getLastlogin() {
        return lastlogin;
    }

    public void setLastlogin(Long lastlogin) {
        this.lastlogin = lastlogin;
    }

    public Long getCurrentlogin() {
        return currentlogin;
    }

    public void setCurrentlogin(Long currentlogin) {
        this.currentlogin = currentlogin;
    }

    public String getLastip() {
        return lastip;
    }

    public void setLastip(String lastip) {
        this.lastip = lastip;
    }

    public String getSecret() {
        return secret;
    }

    public void setSecret(String secret) {
        this.secret = secret;
    }

    public Long getPicture() {
        return picture;
    }

    public void setPicture(Long picture) {
        this.picture = picture;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getDescriptionformat() {
        return descriptionformat;
    }

    public void setDescriptionformat(Integer descriptionformat) {
        this.descriptionformat = descriptionformat;
    }

    public Boolean getMailformat() {
        return mailformat;
    }

    public void setMailformat(Boolean mailformat) {
        this.mailformat = mailformat;
    }

    public Boolean getMaildigest() {
        return maildigest;
    }

    public void setMaildigest(Boolean maildigest) {
        this.maildigest = maildigest;
    }

    public Integer getMaildisplay() {
        return maildisplay;
    }

    public void setMaildisplay(Integer maildisplay) {
        this.maildisplay = maildisplay;
    }

    public Boolean getAutosubscribe() {
        return autosubscribe;
    }

    public void setAutosubscribe(Boolean autosubscribe) {
        this.autosubscribe = autosubscribe;
    }

    public Boolean getTrackforums() {
        return trackforums;
    }

    public void setTrackforums(Boolean trackforums) {
        this.trackforums = trackforums;
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

    public Long getTrustbitmask() {
        return trustbitmask;
    }

    public void setTrustbitmask(Long trustbitmask) {
        this.trustbitmask = trustbitmask;
    }

    public String getImagealt() {
        return imagealt;
    }

    public void setImagealt(String imagealt) {
        this.imagealt = imagealt;
    }

    public String getLastnamephonetic() {
        return lastnamephonetic;
    }

    public void setLastnamephonetic(String lastnamephonetic) {
        this.lastnamephonetic = lastnamephonetic;
    }

    public String getFirstnamephonetic() {
        return firstnamephonetic;
    }

    public void setFirstnamephonetic(String firstnamephonetic) {
        this.firstnamephonetic = firstnamephonetic;
    }

    public String getMiddlename() {
        return middlename;
    }

    public void setMiddlename(String middlename) {
        this.middlename = middlename;
    }

    public String getAlternatename() {
        return alternatename;
    }

    public void setAlternatename(String alternatename) {
        this.alternatename = alternatename;
    }

    public String getMoodlenetprofile() {
        return moodlenetprofile;
    }

    public void setMoodlenetprofile(String moodlenetprofile) {
        this.moodlenetprofile = moodlenetprofile;
    }

    @Override
    protected Serializable pkVal() {
        return null;
    }

    @Override
    public String toString() {
        return "MdlUser{" +
        ", id=" + id +
        ", auth=" + auth +
        ", confirmed=" + confirmed +
        ", policyagreed=" + policyagreed +
        ", deleted=" + deleted +
        ", suspended=" + suspended +
        ", mnethostid=" + mnethostid +
        ", username=" + username +
        ", password=" + password +
        ", idnumber=" + idnumber +
        ", firstname=" + firstname +
        ", lastname=" + lastname +
        ", email=" + email +
        ", emailstop=" + emailstop +
        ", phone1=" + phone1 +
        ", phone2=" + phone2 +
        ", institution=" + institution +
        ", department=" + department +
        ", address=" + address +
        ", city=" + city +
        ", country=" + country +
        ", lang=" + lang +
        ", calendartype=" + calendartype +
        ", theme=" + theme +
        ", timezone=" + timezone +
        ", firstaccess=" + firstaccess +
        ", lastaccess=" + lastaccess +
        ", lastlogin=" + lastlogin +
        ", currentlogin=" + currentlogin +
        ", lastip=" + lastip +
        ", secret=" + secret +
        ", picture=" + picture +
        ", description=" + description +
        ", descriptionformat=" + descriptionformat +
        ", mailformat=" + mailformat +
        ", maildigest=" + maildigest +
        ", maildisplay=" + maildisplay +
        ", autosubscribe=" + autosubscribe +
        ", trackforums=" + trackforums +
        ", timecreated=" + timecreated +
        ", timemodified=" + timemodified +
        ", trustbitmask=" + trustbitmask +
        ", imagealt=" + imagealt +
        ", lastnamephonetic=" + lastnamephonetic +
        ", firstnamephonetic=" + firstnamephonetic +
        ", middlename=" + middlename +
        ", alternatename=" + alternatename +
        ", moodlenetprofile=" + moodlenetprofile +
        "}";
    }
}
