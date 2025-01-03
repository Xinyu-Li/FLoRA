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
    private Long userId;
    private Double grade;
    private Long questionusageid;
    private String questionSummary;
    private String responseSummary;
}
