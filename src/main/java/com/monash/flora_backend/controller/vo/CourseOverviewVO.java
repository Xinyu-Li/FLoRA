package com.monash.flora_backend.controller.vo;

import lombok.Data;

import java.util.ArrayList;

/**
 * @author Xinyu Li
 * @date 3/6/2024
 */
@Data
public class CourseOverviewVO {
    private Long courseId;
    private Long categoryId;
    private String categoryName;
    private String courseName;
    private Integer numOfMdlUser;
    private Integer numOfTraceData;
    private Double avgNumOfTraceData;
    private Integer numOfAnnotationData;
    private Double avgNumOfAnnotationData;
    private Integer numOfPlannerData;
    private Double avgNumOfPlannerData;
    private ArrayList<FileVO> fileList;
}
