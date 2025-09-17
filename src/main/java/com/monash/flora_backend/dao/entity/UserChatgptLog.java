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
 * @since 2023-03-06
 */
public class UserChatgptLog extends Model<UserChatgptLog> {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;
    private Long userId;
    private String courseId;
    private String threadId; // ChatGPT Assistant Thread ID
    private String chatgptRoleDescription;
    private String questionId;
    private String userQuestions;
    private String userAskTime;
    private String chatgptAnswer;
    private String chatgptResponseTime;
    private String essay;
    private int responseRatingStar;   // 0 - no selection     1-5  - show stars
    private int responseRatingThumb;  // 0 - no selection     1 - thumb up      2 - thumb down
    private int responseGeneratedTimes;
    private String chatgptRole;
    private String chatgptWholeResponse;
    private String chatgptWholePrompt;
    private String type;

    public String getThreadId() {
        return threadId;
    }

    public void setThreadId(String threadId) {
        this.threadId = threadId;
    }

    public String getChatgptWholeResponse() {
        return chatgptWholeResponse;
    }

    public void setChatgptWholeResponse(String chatgptWholeResponse) {
        this.chatgptWholeResponse = chatgptWholeResponse;
    }


    public int getResponseRatingStar() {
        return responseRatingStar;
    }

    public void setResponseRatingStar(int responseRatingStar) {
        this.responseRatingStar = responseRatingStar;
    }

    public int getResponseRatingThumb() {
        return responseRatingThumb;
    }

    public void setResponseRatingThumb(int responseRatingThumb) {
        this.responseRatingThumb = responseRatingThumb;
    }

    public int getResponseGeneratedTimes() {
        return responseGeneratedTimes;
    }

    public void setResponseGeneratedTimes(int responseGeneratedTimes) {
        this.responseGeneratedTimes = responseGeneratedTimes;
    }

    public String getChatgptRole() {
        return chatgptRole;
    }

    public void setChatgptRole(String chatgptRole) {
        this.chatgptRole = chatgptRole;
    }

    public String getCourseId() {
        return courseId;
    }

    public void setCourseId(String courseId) {
        this.courseId = courseId;
    }

    public String getEssay() {
        return essay;
    }

    public void setEssay(String essay) {
        this.essay = essay;
    }

    public String getChatgptResponseTime() {
        return chatgptResponseTime;
    }

    public void setChatgptResponseTime(String chatgptResponseTime) {
        this.chatgptResponseTime = chatgptResponseTime;
    }

    public String getChatgptAnswer() {
        return chatgptAnswer;
    }

    public void setChatgptAnswer(String chatgptAnswer) {
        this.chatgptAnswer = chatgptAnswer;
    }

    public String getUserAskTime() {
        return userAskTime;
    }

    public void setUserAskTime(String userAskTime) {
        this.userAskTime = userAskTime;
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

    public String getUserQuestions() {
        return userQuestions;
    }

    public void setUserQuestions(String userQuestions) {
        this.userQuestions = userQuestions;
    }

    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
    }

    @Override
    protected Serializable pkVal() {
        return null;
    }

    public String getChatgptRoleDescription() {
        return chatgptRoleDescription;
    }

    public void setChatgptRoleDescription(String chatgptRoleDescription) {
        this.chatgptRoleDescription = chatgptRoleDescription;
    }

    public String getQuestionId() {
        return questionId;
    }

    public void setQuestionId(String questionId) {
        this.questionId = questionId;
    }

    public String getChatgptWholePrompt() {
        return chatgptWholePrompt;
    }

    public void setChatgptWholePrompt(String chatgptWholePrompt) {
        this.chatgptWholePrompt = chatgptWholePrompt;
    }

    @Override
    public String toString() {
        return "UserChatgptLog{" +
                "id=" + id +
                ", userId=" + userId +
                ", courseId='" + courseId + '\'' +
                ", threadId='" + threadId + '\'' +
                ", chatgptRoleDescription='" + chatgptRoleDescription + '\'' +
                ", questionId='" + questionId + '\'' +
                ", userQuestions='" + userQuestions + '\'' +
                ", userAskTime='" + userAskTime + '\'' +
                ", chatgptAnswer='" + chatgptAnswer + '\'' +
                ", chatgptResponseTime='" + chatgptResponseTime + '\'' +
                ", essay='" + essay + '\'' +
                ", responseRatingStar=" + responseRatingStar +
                ", responseRatingThumb=" + responseRatingThumb +
                ", responseGeneratedTimes=" + responseGeneratedTimes +
                ", chatgptRole='" + chatgptRole + '\'' +
                ", chatgptWholeResponse='" + chatgptWholeResponse + '\'' +
                ", chatgptWholePrompt='" + chatgptWholePrompt + '\'' +
                ", type='" + type + '\'' +
                '}';
    }
}
