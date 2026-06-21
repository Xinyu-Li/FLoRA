package com.monash.flora_backend.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.monash.flora_backend.dao.entity.TraceDataRealTimeProcess;

import java.util.List;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author xinyu
 * @since 2023-09-25
 */
public interface ITraceDataRealTimeProcessService extends IService<TraceDataRealTimeProcess> {
    void myUpdateBatch(List<TraceDataRealTimeProcess> traceDataList);
    void mySaveAndUpdateBatch(List<TraceDataRealTimeProcess> saveTraceDataList, List<TraceDataRealTimeProcess> updateTraceDataList);
    void mySaveBatch(List<TraceDataRealTimeProcess> traceDataRealTimeProcessList);
    void removeByUserId(Long userId);
    TraceDataRealTimeProcess getLastItemByUserIdCourseId(Long userId, String courseId);
    List<TraceDataRealTimeProcess> getAll(Long userId, String courseId);
}
