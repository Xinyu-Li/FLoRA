package com.monash.flora_backend.dao.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.extension.activerecord.Model;

import java.io.Serializable;

public class BackgroundDoc extends Model<BackgroundDoc> {

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;
    private Long userId;
    private String courseId;
    private String url;
    private String documentContent;

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

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getDocumentContent() {
        return documentContent;
    }

    public void setDocumentContent(String docContent) {
        this.documentContent = docContent;
    }
    @Override
    protected Serializable pkVal() {
        return null;
    }

    @Override
    public String toString() {
        return "BackgroundDoc{" +
                ", id=" + id +
                ", userId=" + userId +
                ", courseId=" + courseId +
                ", url=" + url +
                ", documentContent=" + documentContent +
                "}";
    }
}
