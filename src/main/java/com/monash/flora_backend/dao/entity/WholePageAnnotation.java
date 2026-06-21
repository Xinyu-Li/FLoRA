package com.monash.flora_backend.dao.entity;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import com.baomidou.mybatisplus.annotation.TableId;
import org.apache.kafka.common.protocol.types.Field;

import java.io.Serializable;
/**
 * <p>
 * 
 * </p>
 *
 * @author xinyu
 * @since 2022-10-05
 */
public class WholePageAnnotation extends Model<WholePageAnnotation> {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    private String url;

    private Long userId;

    private String serializeHighlightsJson;

    private String saveTime;
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

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getSerializeHighlightsJson() {
        return serializeHighlightsJson;
    }

    public void setSerializeHighlightsJson(String serializeHighlightsJson) {
        this.serializeHighlightsJson = serializeHighlightsJson;
    }

    public String getSaveTime() {
        return saveTime;
    }

    public void setSaveTime(String saveTime) {
        this.saveTime = saveTime;
    }

    @Override
    protected Serializable pkVal() {
        return null;
    }

    @Override
    public String toString() {
        return "WholePageAnnotation{" +
        ", id=" + id +
        ", url=" + url +
        ", userId=" + userId +
        ", serializeHighlightsJson=" + serializeHighlightsJson +
        ", saveTime=" + saveTime +
        "}";
    }
}
