package com.monash.flora_backend.dao.entity;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import com.baomidou.mybatisplus.annotation.TableId;
import java.io.Serializable;
/**
 * <p>
 * the answers to each questions filled by the users
 * </p>
 *
 * @author xinyu
 * @since 2023-09-30
 */
public class MdlSurveyAnswers extends Model<MdlSurveyAnswers> {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    private Long userid;

    private Long survey;

    private Long question;

    private Long time;

    private String answer1;

    private String answer2;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserid() {
        return userid;
    }

    public void setUserid(Long userid) {
        this.userid = userid;
    }

    public Long getSurvey() {
        return survey;
    }

    public void setSurvey(Long survey) {
        this.survey = survey;
    }

    public Long getQuestion() {
        return question;
    }

    public void setQuestion(Long question) {
        this.question = question;
    }

    public Long getTime() {
        return time;
    }

    public void setTime(Long time) {
        this.time = time;
    }

    public String getAnswer1() {
        return answer1;
    }

    public void setAnswer1(String answer1) {
        this.answer1 = answer1;
    }

    public String getAnswer2() {
        return answer2;
    }

    public void setAnswer2(String answer2) {
        this.answer2 = answer2;
    }

    @Override
    protected Serializable pkVal() {
        return null;
    }

    @Override
    public String toString() {
        return "MdlSurveyAnswers{" +
        ", id=" + id +
        ", userid=" + userid +
        ", survey=" + survey +
        ", question=" + question +
        ", time=" + time +
        ", answer1=" + answer1 +
        ", answer2=" + answer2 +
        "}";
    }
}
