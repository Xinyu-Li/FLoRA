package com.monash.flora_backend.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.monash.flora_backend.dao.entity.AssistantRecord;
import com.monash.flora_backend.dao.mapper.AssistantRecordMapper;
import com.monash.flora_backend.service.IAssistantRecordService;
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
public class AssistantRecordServiceImpl extends ServiceImpl<AssistantRecordMapper, AssistantRecord> implements IAssistantRecordService {

    @Override
    public AssistantRecord findByAssistantNameAndProjectId(String assistantName, String projectId) {
        QueryWrapper<AssistantRecord> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("assistant_name", assistantName).eq("project_id", projectId);
        return this.getOne(queryWrapper);
    }

    @Override
    public boolean checkAssistantIdExist(String assistantId) {
        QueryWrapper<AssistantRecord> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("assistant_id", assistantId);
        return super.count(queryWrapper) > 0;

    }

    @Override
    public void createAssistantRecord(String assistantType, String assistantName, String assistantId, String projectId) {
        AssistantRecord record = new AssistantRecord();
        record.setAssistantType(assistantType);
        record.setAssistantName(assistantName);
        record.setAssistantId(assistantId);
        record.setProjectId(projectId);
        super.save(record);
    }
}
