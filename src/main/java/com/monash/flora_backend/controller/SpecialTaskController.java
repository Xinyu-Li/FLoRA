package com.monash.flora_backend.controller;

import cn.hutool.core.util.StrUtil;
import com.monash.flora_backend.controller.req.SubmitDialogueLabelRequest;
import com.monash.flora_backend.controller.vo.DialogueFairnessLabelVO;
import com.monash.flora_backend.controller.vo.EssayVO;
import com.monash.flora_backend.controller.vo.MdlQuizVO;
import com.monash.flora_backend.dao.entity.DialogueFairnessLabel;
import com.monash.flora_backend.service.IDialogueFairnessLabelService;
import com.monash.flora_backend.service.IEssayService;
import com.monash.flora_backend.service.IQuizConfidenceRatingService;
import com.monash.flora_backend.service.IQuizMetaJudgementsService;
import com.monash.flora_backend.service_moodle.IMdlQuizAttemptsService;
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
    private final IMdlQuizAttemptsService iMdlQuizAttemptsService;
    private final IQuizConfidenceRatingService iQuizConfidenceRatingService;
    private final IQuizMetaJudgementsService iQuizMetaJudgementsService;
    private final IEssayService iEssayService;

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

    @GetMapping("/get-quiz-responses")
    public JSONResult getQuizResponses(
            @RequestParam String quizName,
            @RequestParam Long courseId,
            @RequestParam Long userId) {
        log.info("Getting quiz responses for quizName: {}, userId: {}", quizName, userId);
        List<MdlQuizVO> quizResponses = iMdlQuizAttemptsService.getQuizResponseByUserIdAndCourseIdAndQuizName(quizName, courseId, userId);
        log.info("Quiz responses: {}", quizResponses.size());
        return JSONResult.ok(quizResponses);
    }

    @PostMapping("/save-quiz-confidence-rating")
    public JSONResult saveQuizConfidenceRating(
            @RequestParam Long userId,
            @RequestParam Long courseId,
            @RequestParam String quizName,
            @RequestParam String ratingValues) {
        log.info("Saving quiz confidence rating for userId: {}, courseId: {}, quizName: {}, ratingValues: {}",
                userId, courseId, quizName, ratingValues);
        Long id = iQuizConfidenceRatingService.saveQuizConfidenceRating(userId, courseId, quizName, ratingValues);
        return JSONResult.ok(id);
    }

    @GetMapping("/get-quiz-confidence-rating")
    public JSONResult getQuizConfidenceRating(
            @RequestParam Long userId,
            @RequestParam Long courseId,
            @RequestParam String quizName) {
        log.info("Getting quiz confidence rating for userId: {}, courseId: {}, quizName: {}", userId, courseId, quizName);
        String ratingValues = iQuizConfidenceRatingService.getQuizConfidenceRating(userId, courseId, quizName);
        return JSONResult.ok(ratingValues);
    }

    @PostMapping("/save-meta-judgement-rating")
    public JSONResult saveMetaJudgementRating(
            @RequestParam Long userId,
            @RequestParam Long courseId,
            @RequestParam String ratingValues) {
        log.info("Saving meta judgement rating for userId: {}, courseId: {}, ratingValues: {}",
                userId, courseId, ratingValues);
        Long id = iQuizMetaJudgementsService.saveMetaJudgementRating(userId, courseId, ratingValues);
        return JSONResult.ok(id);
    }

    @GetMapping("/get-meta-judgement-rating")
    public JSONResult getMetaJudgementRating(
            @RequestParam Long userId,
            @RequestParam Long courseId) {
        log.info("Getting meta judgement rating for userId: {}, courseId: {}", userId, courseId);
        String ratingValues = iQuizMetaJudgementsService.getMetaJudgementRating(userId, courseId);
        return JSONResult.ok(ratingValues);
    }

    @GetMapping("/get-czech-slovak-essay/{userId}")
    public JSONResult getCzechSlovakEssay(@PathVariable Long userId) {
        log.info("Getting czech slovak essay for userId: {}", userId);
        EssayVO essayVO = iEssayService.findLatestVersionByUserIdAndCourseIdList(userId, List.of("83", "84", "85", "91", "92", "93"));
        return JSONResult.ok(essayVO.getEssayContent());
    }
}
