package com.monash.flora_backend.controller.vo;

import lombok.Data;

import java.io.Serializable;

@Data
public class ResultVO implements Serializable {
    private String essayName;
    private String essayContent;
    private int wordCount;
    private double wordCountRanking;
    private int wordCountScore;
    private int grammarErrorCount;
    private double grammarErrorCountRanking;
    private int grammarErrorCountScore;
    private int writingErrorCount;
    private double writingErrorCountRanking;
    private int writingErrorCountScore;
    private int originalityCount;
    private double originalityCountRanking;
    private int originalityCountScore;
    private double totalRanking;
    private int totalScore;
    private String date;
}
