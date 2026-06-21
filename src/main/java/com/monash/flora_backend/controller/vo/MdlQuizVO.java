package com.monash.flora_backend.controller.vo;

import lombok.Data;

@Data
public class MdlQuizVO {
//    private String type;
//
//    private String question;
//    private String answer;
//    private Long quizId;
//    private String modulesName;
//    private Long modulesId;
//    private Long course;
//    private Float grade;
//    private Float total;
//    private Integer slot;

    private String quizName;
    private Long courseId;
    private Long quizId;
    private Integer attemptRound;
    private Long userId;
    private Double grade;
    private Long questionusageid;
    private String questionSummary;
    private String responseSummary;
    private Long questionattemptid;
    private String state;
    private String typeName; // 标识 是answer
    private String selectedValue;
    private Long questionattemptstepid;
    private Long questionSlot;
    private String questionName;
//    private Long answerId;
//    private String answerText;
}
