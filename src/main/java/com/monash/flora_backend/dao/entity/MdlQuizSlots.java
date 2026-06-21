package com.monash.flora_backend.dao.entity;
import java.math.BigDecimal;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import com.baomidou.mybatisplus.annotation.TableId;
import java.io.Serializable;
/**
 * <p>
 * Stores the question used in a quiz, with the order, and for 
 * </p>
 *
 * @author xinyu
 * @since 2023-10-26
 */
public class MdlQuizSlots extends Model<MdlQuizSlots> {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    private Long slot;

    private Long quizid;

    private Long page;

    private Integer requireprevious;

    private BigDecimal maxmark;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getSlot() {
        return slot;
    }

    public void setSlot(Long slot) {
        this.slot = slot;
    }

    public Long getQuizid() {
        return quizid;
    }

    public void setQuizid(Long quizid) {
        this.quizid = quizid;
    }

    public Long getPage() {
        return page;
    }

    public void setPage(Long page) {
        this.page = page;
    }

    public Integer getRequireprevious() {
        return requireprevious;
    }

    public void setRequireprevious(Integer requireprevious) {
        this.requireprevious = requireprevious;
    }

    public BigDecimal getMaxmark() {
        return maxmark;
    }

    public void setMaxmark(BigDecimal maxmark) {
        this.maxmark = maxmark;
    }

    @Override
    protected Serializable pkVal() {
        return null;
    }

    @Override
    public String toString() {
        return "MdlQuizSlots{" +
        ", id=" + id +
        ", slot=" + slot +
        ", quizid=" + quizid +
        ", page=" + page +
        ", requireprevious=" + requireprevious +
        ", maxmark=" + maxmark +
        "}";
    }
}
