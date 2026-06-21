package com.monash.flora_backend.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.monash.flora_backend.controller.req.SubmitDialogueLabelRequest;
import com.monash.flora_backend.controller.vo.DialogueFairnessLabelVO;
import com.monash.flora_backend.dao.entity.DialogueFairnessLabel;

import java.util.List;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author xinyu
 * @since 2025-04-23
 */
public interface IDialogueFairnessLabelService extends IService<DialogueFairnessLabel> {
    Long saveNewDialogueFairnessLabel(SubmitDialogueLabelRequest request);
    int countByUserIdCourseId(Long userId, String courseId);
    List<DialogueFairnessLabelVO> findDialogueFairnessLabelByUserIdCourseId(Long userId, String courseId);
}
