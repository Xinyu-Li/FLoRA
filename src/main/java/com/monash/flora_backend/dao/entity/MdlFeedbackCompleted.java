package com.monash.flora_backend.dao.entity;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import com.baomidou.mybatisplus.annotation.TableId;
import java.io.Serializable;
/**
 * <p>
 * filled out feedback
 * </p>
 *
 * @author xinyu
 * @since 2023-09-29
 */
public class MdlFeedbackCompleted extends Model<MdlFeedbackCompleted> {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    private Long feedback;

    private Long userid;

    private Long timemodified;

    private Long randomResponse;

    private Boolean anonymousResponse;

    private Long courseid;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getFeedback() {
        return feedback;
    }

    public void setFeedback(Long feedback) {
        this.feedback = feedback;
    }

    public Long getUserid() {
        return userid;
    }

    public void setUserid(Long userid) {
        this.userid = userid;
    }

    public Long getTimemodified() {
        return timemodified;
    }

    public void setTimemodified(Long timemodified) {
        this.timemodified = timemodified;
    }

    public Long getRandomResponse() {
        return randomResponse;
    }

    public void setRandomResponse(Long randomResponse) {
        this.randomResponse = randomResponse;
    }

    public Boolean getAnonymousResponse() {
        return anonymousResponse;
    }

    public void setAnonymousResponse(Boolean anonymousResponse) {
        this.anonymousResponse = anonymousResponse;
    }

    public Long getCourseid() {
        return courseid;
    }

    public void setCourseid(Long courseid) {
        this.courseid = courseid;
    }

    @Override
    protected Serializable pkVal() {
        return null;
    }

    @Override
    public String toString() {
        return "MdlFeedbackCompleted{" +
        ", id=" + id +
        ", feedback=" + feedback +
        ", userid=" + userid +
        ", timemodified=" + timemodified +
        ", randomResponse=" + randomResponse +
        ", anonymousResponse=" + anonymousResponse +
        ", courseid=" + courseid +
        "}";
    }
}
