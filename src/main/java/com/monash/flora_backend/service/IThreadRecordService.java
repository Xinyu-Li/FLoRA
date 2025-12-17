package com.monash.flora_backend.service;

import com.monash.flora_backend.dao.entity.ThreadRecord;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author xinyu
 * @since 2025-08-22
 */
public interface IThreadRecordService extends IService<ThreadRecord> {
    ThreadRecord findByUserIdAndCourseIdAndAssistantId(Long userId, String courseId, String assistantId);

    boolean checkThreadIdExist(String threadId);

    void createThreadRecord(Long userId, String courseId, String chatgptRole, String assistantName, String assistantId, String threadId);
}
