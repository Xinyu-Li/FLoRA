package com.monash.flora_backend.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.monash.flora_backend.controller.req.SubmitDialogueLabelRequest;
import com.monash.flora_backend.controller.vo.DialogueFairnessLabelVO;
import com.monash.flora_backend.dao.entity.DialogueFairnessLabel;
import com.monash.flora_backend.dao.mapper.DialogueFairnessLabelMapper;
import com.monash.flora_backend.service.IDialogueFairnessLabelService;
import com.monash.flora_backend.util.MyBeanCopyUtils;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author xinyu
 * @since 2025-04-23
 */
@Service
public class DialogueFairnessLabelServiceImpl extends ServiceImpl<DialogueFairnessLabelMapper, DialogueFairnessLabel> implements IDialogueFairnessLabelService {

    @Override
    public Long saveNewDialogueFairnessLabel(SubmitDialogueLabelRequest request) {
        DialogueFairnessLabel dialogueFairnessLabel = new DialogueFairnessLabel();
        dialogueFairnessLabel.setDialogueText(request.getDialogueText());
        dialogueFairnessLabel.setJustificationText(request.getJustificationText());
        dialogueFairnessLabel.setCourseId(request.getCourseId());
        dialogueFairnessLabel.setUserId(request.getUserId());

        this.save(dialogueFairnessLabel);
        return dialogueFairnessLabel.getId();
    }
    @Override
    public int countByUserIdCourseId(Long userId, String courseId) {
        // 使用 QueryWrapper 设置条件，统计当前 userId 和 courseId 的记录数
        QueryWrapper<DialogueFairnessLabel> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("user_id", userId);
        queryWrapper.eq("course_id", courseId);
        return this.count(queryWrapper);
    }

    @Override
    public List<DialogueFairnessLabelVO> findDialogueFairnessLabelByUserIdCourseId(Long userId, String courseId) {
        QueryWrapper<DialogueFairnessLabel> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("user_id", userId);
        queryWrapper.eq("course_id", courseId);
        queryWrapper.eq("deleted", 0);
        List<DialogueFairnessLabel> dialogueFairnessLabelList = this.list(queryWrapper);
        List<DialogueFairnessLabelVO> dialogueFairnessLabelVOList = new ArrayList<>();
        dialogueFairnessLabelList.forEach(dialogueFairnessLabel -> {

            DialogueFairnessLabelVO dialogueFairnessLabelVO = MyBeanCopyUtils.copyBean(dialogueFairnessLabel, DialogueFairnessLabelVO.class);
            String text = dialogueFairnessLabel.getDialogueText();
            if (text != null) {
                int maxLen = Math.min(text.length(), 200);
                dialogueFairnessLabelVO.setDialogueText(text.substring(0, maxLen));
            } else {
                dialogueFairnessLabelVO.setDialogueText("");
            }

            dialogueFairnessLabelVOList.add(dialogueFairnessLabelVO);
        });
        return dialogueFairnessLabelVOList;
    }
}
