package com.monash.flora_backend.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.monash.flora_backend.dao.entity.TraceDataRealTimeProcess;
import com.monash.flora_backend.dao.mapper.TraceDataRealTimeProcessMapper;
import com.monash.flora_backend.service.ITraceDataRealTimeProcessService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author xinyu
 * @since 2023-09-25
 */
@Service
@Slf4j
public class TraceDataRealTimeProcessServiceImpl extends ServiceImpl<TraceDataRealTimeProcessMapper, TraceDataRealTimeProcess> implements ITraceDataRealTimeProcessService {
    @Async("asyncPoolTaskExecutor")
    @Transactional
    @Override
    public void myUpdateBatch(List<TraceDataRealTimeProcess> traceDataList) {
        if (traceDataList.isEmpty()) {
            return;
        }
        super.updateBatchById(traceDataList);
        log.info("myUpdateBatch TraceDataRealTimeProcess finish");
    }

    @Async("asyncPoolTaskExecutor")
    @Transactional
    @Override
    public void mySaveAndUpdateBatch(List<TraceDataRealTimeProcess> saveTraceDataList, List<TraceDataRealTimeProcess> updateTraceDataList) {
        if (!saveTraceDataList.isEmpty()) {
            getBaseMapper().mySaveBatch(saveTraceDataList);
        }
        if (!updateTraceDataList.isEmpty()) {
            super.updateBatchById(updateTraceDataList);
        }

        log.info("myUpdateBatch TraceDataRealTimeProcess finish");
    }

    @Override
    public void mySaveBatch(List<TraceDataRealTimeProcess> traceDataRealTimeProcessList) {
        if (traceDataRealTimeProcessList.isEmpty()) {
            return;
        }
        getBaseMapper().mySaveBatch(traceDataRealTimeProcessList);

    }

    @Override
    public TraceDataRealTimeProcess getLastItemByUserIdCourseId(Long userId, String courseId) {
        QueryWrapper<TraceDataRealTimeProcess> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("user_id", userId).eq("course_id", courseId).orderByDesc("save_time").last("LIMIT 1");

        return super.getOne(queryWrapper);
    }

    @Override
    public List<TraceDataRealTimeProcess> getAll(Long userId, String courseId) {
        QueryWrapper<TraceDataRealTimeProcess> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("user_id", userId).eq("course_id", courseId).orderByAsc("save_time");
        return super.list(queryWrapper);
    }

    @Override
    public void removeByUserId(Long userId) {
        QueryWrapper<TraceDataRealTimeProcess> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("user_id", userId);
        super.remove(queryWrapper);
    }
}
