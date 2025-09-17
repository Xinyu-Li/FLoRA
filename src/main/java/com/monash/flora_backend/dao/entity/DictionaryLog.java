package com.monash.flora_backend.dao.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;

/**
 * ClassName: DictionaryLog
 * Description:
 *
 * @author Xinyu Li
 * @since 5/18/2023 11:48 AM
 */
public class DictionaryLog {
    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    private Long userId;

    private String queryText;

    private String translatedText;

    private String queryTime;
    private String responseTime;

    private String courseId;

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

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getQueryText() {
        return queryText;
    }

    public void setQueryText(String queryText) {
        this.queryText = queryText;
    }

    public String getTranslatedText() {
        return translatedText;
    }

    public void setTranslatedText(String translatedText) {
        this.translatedText = translatedText;
    }

    public String getQueryTime() {
        return queryTime;
    }

    public void setQueryTime(String queryTime) {
        this.queryTime = queryTime;
    }

    public String getResponseTime() {
        return responseTime;
    }

    public void setResponseTime(String responseTime) {
        this.responseTime = responseTime;
    }

    @Override
    public String toString() {
        return "DictionaryLog{" +
                "id=" + id +
                ", userId=" + userId +
                ", queryText='" + queryText + '\'' +
                ", translatedText='" + translatedText + '\'' +
                ", queryTime='" + queryTime + '\'' +
                ", responseTime='" + responseTime + '\'' +
                '}';
    }
}
