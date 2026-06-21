package com.monash.flora_backend.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.monash.flora_backend.dao.entity.ConsultationTableLog;

public interface IConsultationTableLogService extends IService<ConsultationTableLog> {
        /**
         * 保存一条日志
         */
        boolean saveLog(ConsultationTableLog log);

        /**
         * 获取指定用户、课程的最新一条日志
         */
        ConsultationTableLog getLatestLog(Long userId, String courseId);
}
