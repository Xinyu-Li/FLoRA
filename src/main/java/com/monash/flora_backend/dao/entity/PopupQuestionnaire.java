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
 * @since 2024-12-30
 */
public class PopupQuestionnaire extends Model<PopupQuestionnaire> {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    private Long userId;

    private String username;

    private String questionContent;

    private String answer;

    private String triggerProcess;

    private String saveTime;

    private String answerTime;

    private Integer qorder;
    private Long courseId;

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

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getQuestionContent() {
        return questionContent;
    }

    public void setQuestionContent(String questionContent) {
        this.questionContent = questionContent;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public String getTriggerProcess() {
        return triggerProcess;
    }

    public void setTriggerProcess(String triggerProcess) {
        this.triggerProcess = triggerProcess;
    }

    public String getSaveTime() {
        return saveTime;
    }

    public void setSaveTime(String saveTime) {
        this.saveTime = saveTime;
    }

    public String getAnswerTime() {
        return answerTime;
    }

    public void setAnswerTime(String answerTime) {
        this.answerTime = answerTime;
    }

    public Integer getQorder() {
        return qorder;
    }

    public void setQorder(Integer qorder) {
        this.qorder = qorder;
    }
    public Long getCourseId() {
        return courseId;
    }

    public void setCourseId(Long courseId) {
        this.courseId = courseId;
    }
    @Override
    protected Serializable pkVal() {
        return null;
    }

    @Override
    public String toString() {
        return "PopupQuestionnaire{" +
        ", id=" + id +
        ", userId=" + userId +
        ", username=" + username +
        ", questionContent=" + questionContent +
        ", answer=" + answer +
        ", triggerProcess=" + triggerProcess +
        ", saveTime=" + saveTime +
        ", answerTime=" + answerTime +
        ", qorder=" + qorder +
        ", courseId=" + courseId +
        "}";
    }
}
