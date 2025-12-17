package com.monash.flora_backend.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.monash.flora_backend.dao.entity.ThreadRecord;
import com.monash.flora_backend.dao.mapper.ThreadRecordMapper;
import com.monash.flora_backend.service.IThreadRecordService;
import org.springframework.stereotype.Service;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author xinyu
 * @since 2025-08-22
 */
@Service
public class ThreadRecordServiceImpl extends ServiceImpl<ThreadRecordMapper, ThreadRecord> implements IThreadRecordService {

    @Override
    public ThreadRecord findByUserIdAndCourseIdAndAssistantId(Long userId, String courseId, String assistantId) {
        QueryWrapper<ThreadRecord> wrapper = new QueryWrapper<>();
        wrapper.eq("user_id", userId).eq("course_id", courseId).eq("assistant_id", assistantId);
        return super.getOne(wrapper);
    }

    @Override
    public boolean checkThreadIdExist(String threadId) {
        QueryWrapper<ThreadRecord> wrapper = new QueryWrapper<>();
        wrapper.eq("thread_id", threadId);

        return super.count(wrapper) > 0;
    }


    @Override
    public void createThreadRecord(Long userId, String courseId, String chatgptRole, String assistantName, String assistantId, String threadId) {
        ThreadRecord record = new ThreadRecord();
        record.setUserId(userId);
        record.setCourseId(courseId);
        record.setAssistantType(chatgptRole);
        record.setAssistantName(assistantName);
        record.setAssistantId(assistantId);
        record.setThreadId(threadId);
        super.save(record);
    }


}
