package com.monash.flora_backend.dao.entity;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import com.baomidou.mybatisplus.annotation.TableId;
import java.io.Serializable;
/**
 * <p>
 * questionnaire_response table retrofitted from MySQL
 * </p>
 *
 * @author xinyu
 * @since 2023-09-30
 */
public class MdlQuestionnaireResponse extends Model<MdlQuestionnaireResponse> {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    private Long questionnaireid;

    private Long submitted;

    private String complete;

    private Long grade;

    private Long userid;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getQuestionnaireid() {
        return questionnaireid;
    }

    public void setQuestionnaireid(Long questionnaireid) {
        this.questionnaireid = questionnaireid;
    }

    public Long getSubmitted() {
        return submitted;
    }

    public void setSubmitted(Long submitted) {
        this.submitted = submitted;
    }

    public String getComplete() {
        return complete;
    }

    public void setComplete(String complete) {
        this.complete = complete;
    }

    public Long getGrade() {
        return grade;
    }

    public void setGrade(Long grade) {
        this.grade = grade;
    }

    public Long getUserid() {
        return userid;
    }

    public void setUserid(Long userid) {
        this.userid = userid;
    }

    @Override
    protected Serializable pkVal() {
        return null;
    }

    @Override
    public String toString() {
        return "MdlQuestionnaireResponse{" +
        ", id=" + id +
        ", questionnaireid=" + questionnaireid +
        ", submitted=" + submitted +
        ", complete=" + complete +
        ", grade=" + grade +
        ", userid=" + userid +
        "}";
    }
}
