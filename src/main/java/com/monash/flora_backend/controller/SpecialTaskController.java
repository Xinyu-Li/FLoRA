package com.monash.flora_backend.controller;

import cn.hutool.core.util.StrUtil;
import com.monash.flora_backend.controller.req.SubmitDialogueLabelRequest;
import com.monash.flora_backend.controller.vo.DialogueFairnessLabelVO;
import com.monash.flora_backend.dao.entity.DialogueFairnessLabel;
import com.monash.flora_backend.service.IDialogueFairnessLabelService;
import com.monash.flora_backend.util.JSONResult;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@AllArgsConstructor
public class SpecialTaskController {
    private final IDialogueFairnessLabelService iDialogueFairnessLabelService;

    @PostMapping("/submit-dialogue-label")
    public JSONResult submitDialogueLabel(@RequestBody SubmitDialogueLabelRequest request) {
        // 打印数据或保存处理逻辑
        System.out.println("User ID: " + request.getUserId());
        System.out.println("Course ID: " + request.getCourseId());
        System.out.println("DialogueText: " + request.getDialogueText());
        System.out.println("JustificationText: " + request.getJustificationText());
        log.info("User ID: {}, courseId: {}, DialogueText: {}, JustificationText: {}", request.getUserId(), request.getCourseId(), StrUtil.sub(request.getDialogueText(), 0, 20), StrUtil.sub(request.getJustificationText(), 0, 20));

        Long id = iDialogueFairnessLabelService.saveNewDialogueFairnessLabel(request);
//        int totalRows = iDialogueFairnessLabelService.countByUserIdCourseId(request.getUserId(), request.getCourseId());

        return JSONResult.ok(id);
    }

    @PostMapping("/get-dialogue-label")
    public JSONResult getDialogueLabel(@RequestBody SubmitDialogueLabelRequest request) {
        log.info("User ID: {}, courseId: {}, DialogueText: {}, JustificationText: {}", request.getUserId(), request.getCourseId(), StrUtil.sub(request.getDialogueText(), 0, 20), StrUtil.sub(request.getJustificationText(), 0, 20));
        List<DialogueFairnessLabelVO> dialogueFairnessLabelList = iDialogueFairnessLabelService.findDialogueFairnessLabelByUserIdCourseId(request.getUserId(), request.getCourseId());

        return JSONResult.ok(dialogueFairnessLabelList);
    }

    @GetMapping("/delete-dialogue-label/{id}")
    public JSONResult deleteDialogueLabel(@PathVariable Long id) {
        DialogueFairnessLabel dl = new DialogueFairnessLabel();
        dl.setId(id);
        dl.setDeleted(1);
        iDialogueFairnessLabelService.updateById(dl);
        return JSONResult.ok();
    }
}
