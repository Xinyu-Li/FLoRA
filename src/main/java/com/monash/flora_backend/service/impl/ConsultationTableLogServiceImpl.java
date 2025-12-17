package com.monash.flora_backend.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.monash.flora_backend.dao.entity.ConsultationTableLog;
import com.monash.flora_backend.dao.mapper.ConsultationTableLogMapper;
import com.monash.flora_backend.service.IConsultationTableLogService;
import org.springframework.stereotype.Service;

@Service
public class ConsultationTableLogServiceImpl
        extends ServiceImpl<ConsultationTableLogMapper, ConsultationTableLog>
        implements IConsultationTableLogService {

    @Override
    public boolean saveLog(ConsultationTableLog log) {
        return super.save(log);
    }

    @Override
    public ConsultationTableLog getLatestLog(Long userId, String courseId) {
        QueryWrapper<ConsultationTableLog> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("user_id", userId)
                .eq("course_id", courseId)
                .orderByDesc("created_at")
                .last("limit 1");
        return this.getOne(queryWrapper, false);
    }
}
