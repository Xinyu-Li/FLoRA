package com.monash.flora_backend.controller.vo;

import com.monash.flora_backend.service.impl.BackgroundDocService;

import java.util.List;
import java.util.Map;

public class CombinedAnnotationVO {

    private List<AnnotationVO> annotationVOList;

    private List<Map<String, Object>> backgroundSegments;

    // Getters and setters

    public List<AnnotationVO> getAnnotationVOList() {
        return annotationVOList;
    }

    public void setAnnotationVOList(List<AnnotationVO> annotationVOList) {
        this.annotationVOList = annotationVOList;
    }
    public List<Map<String, Object>> getBackgroundSegments() {
        return backgroundSegments;
    }

    public void setBackgroundSegments(List<Map<String, Object>> backgroundSegments) {

        this.backgroundSegments = backgroundSegments;
    }
}
