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
 * @since 2025-01-23
 */
public class UserChatgptTopic extends Model<UserChatgptTopic> {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    private String topicName;

    private String topicCreateTime;

    private String topicUpdateTime;
    private Long userId;
    private String courseId;
    private String threadShowing;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getCourseId() {
        return courseId;
    }

    public void setCourseId(String courseId) {
        this.courseId = courseId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTopicName() {
        return topicName;
    }

    public void setTopicName(String topicName) {
        this.topicName = topicName;
    }

    public String getTopicCreateTime() {
        return topicCreateTime;
    }

    public void setTopicCreateTime(String topicCreateTime) {
        this.topicCreateTime = topicCreateTime;
    }

    public String getTopicUpdateTime() {
        return topicUpdateTime;
    }

    public void setTopicUpdateTime(String topicUpdateTime) {
        this.topicUpdateTime = topicUpdateTime;
    }

    public String getThreadShowing() {
        return threadShowing;
    }

    public void setThreadShowing(String threadShowing) {
        this.threadShowing = threadShowing;
    }
    @Override
    protected Serializable pkVal() {
        return null;
    }

    @Override
    public String toString() {
        return "UserChatgptTopic{" +
        ", id=" + id +
        ", topicName=" + topicName +
        ", topicCreateTime=" + topicCreateTime +
        ", topicUpdateTime=" + topicUpdateTime +
                "threadShowing="+ threadShowing +
        "}";
    }
}
