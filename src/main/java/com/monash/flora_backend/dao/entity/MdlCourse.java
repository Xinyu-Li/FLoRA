package com.monash.flora_backend.dao.entity;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import com.baomidou.mybatisplus.annotation.TableId;
import java.io.Serializable;
/**
 * <p>
 * Central course table
 * </p>
 *
 * @author xinyu
 * @since 2023-09-12
 */
public class MdlCourse extends Model<MdlCourse> {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    private Long category;

    private Long sortorder;

    private String fullname;

    private String shortname;

    private String idnumber;

    private String summary;

    private Integer summaryformat;

    private String format;

    private Integer showgrades;

    private Integer newsitems;

    private Long startdate;

    private Long enddate;

    private Boolean relativedatesmode;

    private Long marker;

    private Long maxbytes;

    private Integer legacyfiles;

    private Integer showreports;

    private Boolean visible;

    private Boolean visibleold;

    private Boolean downloadcontent;

    private Integer groupmode;

    private Integer groupmodeforce;

    private Long defaultgroupingid;

    private String lang;

    private String calendartype;

    private String theme;

    private Long timecreated;

    private Long timemodified;

    private Boolean requested;

    private Boolean enablecompletion;

    private Boolean completionnotify;

    private Long cacherev;

    private Long originalcourseid;

    private Boolean showactivitydates;

    private Boolean showcompletionconditions;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCategory() {
        return category;
    }

    public void setCategory(Long category) {
        this.category = category;
    }

    public Long getSortorder() {
        return sortorder;
    }

    public void setSortorder(Long sortorder) {
        this.sortorder = sortorder;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public String getShortname() {
        return shortname;
    }

    public void setShortname(String shortname) {
        this.shortname = shortname;
    }

    public String getIdnumber() {
        return idnumber;
    }

    public void setIdnumber(String idnumber) {
        this.idnumber = idnumber;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public Integer getSummaryformat() {
        return summaryformat;
    }

    public void setSummaryformat(Integer summaryformat) {
        this.summaryformat = summaryformat;
    }

    public String getFormat() {
        return format;
    }

    public void setFormat(String format) {
        this.format = format;
    }

    public Integer getShowgrades() {
        return showgrades;
    }

    public void setShowgrades(Integer showgrades) {
        this.showgrades = showgrades;
    }

    public Integer getNewsitems() {
        return newsitems;
    }

    public void setNewsitems(Integer newsitems) {
        this.newsitems = newsitems;
    }

    public Long getStartdate() {
        return startdate;
    }

    public void setStartdate(Long startdate) {
        this.startdate = startdate;
    }

    public Long getEnddate() {
        return enddate;
    }

    public void setEnddate(Long enddate) {
        this.enddate = enddate;
    }

    public Boolean getRelativedatesmode() {
        return relativedatesmode;
    }

    public void setRelativedatesmode(Boolean relativedatesmode) {
        this.relativedatesmode = relativedatesmode;
    }

    public Long getMarker() {
        return marker;
    }

    public void setMarker(Long marker) {
        this.marker = marker;
    }

    public Long getMaxbytes() {
        return maxbytes;
    }

    public void setMaxbytes(Long maxbytes) {
        this.maxbytes = maxbytes;
    }

    public Integer getLegacyfiles() {
        return legacyfiles;
    }

    public void setLegacyfiles(Integer legacyfiles) {
        this.legacyfiles = legacyfiles;
    }

    public Integer getShowreports() {
        return showreports;
    }

    public void setShowreports(Integer showreports) {
        this.showreports = showreports;
    }

    public Boolean getVisible() {
        return visible;
    }

    public void setVisible(Boolean visible) {
        this.visible = visible;
    }

    public Boolean getVisibleold() {
        return visibleold;
    }

    public void setVisibleold(Boolean visibleold) {
        this.visibleold = visibleold;
    }

    public Boolean getDownloadcontent() {
        return downloadcontent;
    }

    public void setDownloadcontent(Boolean downloadcontent) {
        this.downloadcontent = downloadcontent;
    }

    public Integer getGroupmode() {
        return groupmode;
    }

    public void setGroupmode(Integer groupmode) {
        this.groupmode = groupmode;
    }

    public Integer getGroupmodeforce() {
        return groupmodeforce;
    }

    public void setGroupmodeforce(Integer groupmodeforce) {
        this.groupmodeforce = groupmodeforce;
    }

    public Long getDefaultgroupingid() {
        return defaultgroupingid;
    }

    public void setDefaultgroupingid(Long defaultgroupingid) {
        this.defaultgroupingid = defaultgroupingid;
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

    public Boolean getRequested() {
        return requested;
    }

    public void setRequested(Boolean requested) {
        this.requested = requested;
    }

    public Boolean getEnablecompletion() {
        return enablecompletion;
    }

    public void setEnablecompletion(Boolean enablecompletion) {
        this.enablecompletion = enablecompletion;
    }

    public Boolean getCompletionnotify() {
        return completionnotify;
    }

    public void setCompletionnotify(Boolean completionnotify) {
        this.completionnotify = completionnotify;
    }

    public Long getCacherev() {
        return cacherev;
    }

    public void setCacherev(Long cacherev) {
        this.cacherev = cacherev;
    }

    public Long getOriginalcourseid() {
        return originalcourseid;
    }

    public void setOriginalcourseid(Long originalcourseid) {
        this.originalcourseid = originalcourseid;
    }

    public Boolean getShowactivitydates() {
        return showactivitydates;
    }

    public void setShowactivitydates(Boolean showactivitydates) {
        this.showactivitydates = showactivitydates;
    }

    public Boolean getShowcompletionconditions() {
        return showcompletionconditions;
    }

    public void setShowcompletionconditions(Boolean showcompletionconditions) {
        this.showcompletionconditions = showcompletionconditions;
    }

    @Override
    protected Serializable pkVal() {
        return null;
    }

    @Override
    public String toString() {
        return "MdlCourse{" +
        ", id=" + id +
        ", category=" + category +
        ", sortorder=" + sortorder +
        ", fullname=" + fullname +
        ", shortname=" + shortname +
        ", idnumber=" + idnumber +
        ", summary=" + summary +
        ", summaryformat=" + summaryformat +
        ", format=" + format +
        ", showgrades=" + showgrades +
        ", newsitems=" + newsitems +
        ", startdate=" + startdate +
        ", enddate=" + enddate +
        ", relativedatesmode=" + relativedatesmode +
        ", marker=" + marker +
        ", maxbytes=" + maxbytes +
        ", legacyfiles=" + legacyfiles +
        ", showreports=" + showreports +
        ", visible=" + visible +
        ", visibleold=" + visibleold +
        ", downloadcontent=" + downloadcontent +
        ", groupmode=" + groupmode +
        ", groupmodeforce=" + groupmodeforce +
        ", defaultgroupingid=" + defaultgroupingid +
        ", lang=" + lang +
        ", calendartype=" + calendartype +
        ", theme=" + theme +
        ", timecreated=" + timecreated +
        ", timemodified=" + timemodified +
        ", requested=" + requested +
        ", enablecompletion=" + enablecompletion +
        ", completionnotify=" + completionnotify +
        ", cacherev=" + cacherev +
        ", originalcourseid=" + originalcourseid +
        ", showactivitydates=" + showactivitydates +
        ", showcompletionconditions=" + showcompletionconditions +
        "}";
    }
}
