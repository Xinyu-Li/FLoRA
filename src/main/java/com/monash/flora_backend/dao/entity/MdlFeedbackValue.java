package com.monash.flora_backend.dao.entity;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import com.baomidou.mybatisplus.annotation.TableId;
import java.io.Serializable;
/**
 * <p>
 * values of the completeds
 * </p>
 *
 * @author xinyu
 * @since 2023-09-29
 */
public class MdlFeedbackValue extends Model<MdlFeedbackValue> {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    private Long courseId;

    private Long item;

    private Long completed;

    private Long tmpCompleted;

    private String value;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCourseId() {
        return courseId;
    }

    public void setCourseId(Long courseId) {
        this.courseId = courseId;
    }

    public Long getItem() {
        return item;
    }

    public void setItem(Long item) {
        this.item = item;
    }

    public Long getCompleted() {
        return completed;
    }

    public void setCompleted(Long completed) {
        this.completed = completed;
    }

    public Long getTmpCompleted() {
        return tmpCompleted;
    }

    public void setTmpCompleted(Long tmpCompleted) {
        this.tmpCompleted = tmpCompleted;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    @Override
    protected Serializable pkVal() {
        return null;
    }

    @Override
    public String toString() {
        return "MdlFeedbackValue{" +
        ", id=" + id +
        ", courseId=" + courseId +
        ", item=" + item +
        ", completed=" + completed +
        ", tmpCompleted=" + tmpCompleted +
        ", value=" + value +
        "}";
    }
}
