package com.monash.flora_backend.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.monash.flora_backend.controller.vo.*;
import com.monash.flora_backend.dao.entity.TraceData;

import java.io.IOException;
import java.util.List;
import java.util.zip.ZipOutputStream;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author xinyu
 * @since 2022-10-18
 */
public interface ITraceDataService extends IService<TraceData> {
//    boolean saveBatch(List<TraceDataVO> traceDataVOList);
    boolean myUpdateBatch(List<TraceData> traceDataList);

//    boolean mySaveBatch(List<TraceData> traceDataList);
//    void saveToRedisList(String key, String value);
//    List<String> getFromRedisList(String key);
//    String getLastFromRedisList(String key);
//    boolean isRedisListExist(String key);
    boolean save(TraceDataVO traceDataVO);

//    TraceDataVO findByUserIdOrderByTimeDesc(Long userId);

//    List<TraceDataVO> findAllStudentInfo();
    boolean removeByUserId(Long userId);

//    void exportTraceDataToExcel();
    CountAllTraceLogVO countByUserIdAndCourseIdForAllTraceLogs(Long userId, Long courseId);
    void exportTraceDataToExcelByUserIdListAndCourseIdList(List<Long> userIdList, List<String> courseIdList, ZipOutputStream zos) throws IOException;
    void exportTraceDataToExcelByUserIdListAndCourseIdList(List<Long> userIdList, List<String> courseIdList, ZipOutputStream zos, int cutRow) throws IOException;
    void exportTraceDataToExcelByUserIdListAndCourseIdList(List<Long> userIdList, List<String> courseIdList, int cutRows, String token, String dateString) throws IOException;

    /**
     *  TODO need to do optimization
     * @param userId
     * @param courseId
     * @return
     */
    List<TraceData> findAllByUserIdAndCourseIdOrderByTimeAsc(Long userId, String courseId);
//    boolean addSubActionLabel(TraceDataVO traceDataVO);
//
////    List<TraceData> updateMouseMoveSubActionLabel(TraceDataVO traceDataVO);
//    void updateBodyMouseMoveSubActionLabel(List<TraceDataVO> traceDataVOList);
//    void updateOpenToolsSubActionLabel(List<TraceDataVO> tryOutToolsTraceDataVOList);

    String checkUrlRelevant(String url);

    List<TraceData> findByUserIdAndCourseIdWithoutMouseData(Long userId, String courseId);

    void updateProcessLabelToNullByUserIdCourseId(Long userId, String courseId);

    void deleteReadingInstructionMoseMoveByUserIdCourseId(Long userId, String courseId);

    List<TraceData> findAllOpenCloseTraceDataByUserIdCourseId(Long userId, String courseId);

    // update all CLOSE_SEARCH_ANNOTATION to SEARCH_ANNOTATION
    void updateCloseSearchAnnotationByUserIdCourseId(Long userId, String courseId);

    List<TraceData> findAllTryOutToolsTraceByUserIdCourseId(Long userId, String courseId);

//    void addSubActionLabelForReadingNavigation(TraceDataVO traceDataVO);

//    void addSubActionLabelForTryOutToolsTimer(TraceDataVO traceDataVO);

//    void addSubActionLabelForToolEvents(TraceDataVO traceDataVO, List<TraceDataVO> traceDataVOList);
    List<TraceDataCleanTimelineVO> getTimelineSubActionData(String courseId, long timeLimit, String usernameFilter);

    List<TraceDataCleanTimelineVO> getTimelineActionData(String usernamePattern, String courseId);

    List<TraceDataCleanTimelineVO> getTimelineActionData(List<String> groups, String courseId);
    List<TraceDataCleanTimelineVO> getTimelineActionData(String courseId, long minuteLimit, String usernameFilter);

    List<TraceDataCleanPersonalVO> getPersonalLevelData(String courseId, long minuteLimit, String usernameFilter);
    List<TraceDataCleanPersonalVO> getPersonalLevelData(String usernamePattern, String courseId);

    List<TraceDataCleanGroupVO> getGroupLevelData(String courseId, long timeLimit, String usernameFilter);

    List<TraceDataCleanAllActionVO> getAllLevelAction(String courseId, long timeLimit, String usernameFilter);

    List<TraceDataCleanAllSubActionVO> getAllLevelSubAction(String courseId, long timeLimit, String usernameFilter);

}
