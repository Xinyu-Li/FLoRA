package com.monash.flora_backend.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.monash.flora_backend.controller.vo.AnnotationVO;
import com.monash.flora_backend.dao.entity.Annotation;

import java.io.IOException;
import java.util.List;
import java.util.zip.ZipOutputStream;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author xinyu
 * @since 2022-09-29
 */
public interface IAnnotationService extends IService<Annotation> {
//    Long saveAndReturnId(Annotation annotation);
    List<AnnotationVO> findByUserIdAndUrlOrderBySaveTimeDesc(Long userId, String url);

//    int removeByUserIdAndSaveTime(Long userId, String saveTime);
    boolean removeByUserIdAndHighlightTimestamp(Long userId, String highlightTimestamp);

    boolean removeByUserId(Long userId);

//    boolean updateOrSaveByUserIdAndHighlightTimestamp(AnnotationVO annotationVO);

    boolean saveAnnotation(AnnotationVO annotationVO);
    boolean updateByUserIdAndHighlightTimestamp(AnnotationVO annotationVO);

//    List<AnnotationVO> searchAnnotationByKeywords(String keywords);
    List<AnnotationVO> searchAnnotationByKeywordsAndUserId(String keywords, Long userId, String courseId);
    List<AnnotationVO> searchAllAnnotation(Long userId, String courseId);

    List<Annotation> findAllByUserIdAndCourseId(Long userId, String courseId);

    void exportAnnotationToExcelByUserIdListAndCourseIdList(List<Long> userIdList, List<String> courseIdList, ZipOutputStream zos) throws IOException;
    void exportAnnotationToExcelByUserIdListAndCourseIdList(List<Long> userIdList, List<String> courseIdList, ZipOutputStream zos, int cutRow) throws IOException;
    void exportAnnotationToExcelByUserIdListAndCourseIdList(List<Long> userIdList, List<String> courseIdList, int cutRows, String token, String dateString) throws IOException;


//    void exportAnnotationToExcel();
}
