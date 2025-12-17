package com.monash.flora_backend.service;

import com.monash.flora_backend.dao.entity.AssistantRecord;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author xinyu
 * @since 2025-08-22
 */
public interface IAssistantRecordService extends IService<AssistantRecord> {
    AssistantRecord findByAssistantNameAndProjectId(String assistantName, String projectId);

    boolean checkAssistantIdExist(String assistantId);

    void createAssistantRecord(String assistantType, String assistantName, String assistantId, String projectId);
}
