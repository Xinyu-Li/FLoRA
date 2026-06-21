package com.monash.flora_backend.util;

import com.google.gson.Gson;
import com.monash.flora_backend.controller.vo.BasicDataVO;
import com.monash.flora_backend.controller.vo.ResultVO;
import com.monash.flora_backend.service.IRuleBaseCheckGrammarService;
import com.monash.flora_backend.service.IRuleBaseOriginalityService;
import com.monash.flora_backend.service.IRuleBaseWritingChecklistService;

import java.io.IOException;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;

public class RubricScoreUtil {
    private static BasicDataVO basicData = new BasicDataVO(
            new ArrayList<>(Arrays.asList(59, 83, 89, 90, 93, 99, 126, 129, 146, 148, 157, 161, 186, 188, 188, 197, 200,
                    205, 206, 207, 208, 209, 211, 211, 212, 212, 213, 213, 214, 215, 215, 216, 217, 217, 218, 218, 222,
                    223, 223, 223, 224, 228, 229, 230, 231, 231, 232, 232, 235, 235, 236, 237, 237, 237, 238, 238, 239,
                    239, 240, 244, 245, 246, 246, 250, 252, 252, 253, 254, 257, 262, 263, 264, 267, 270, 271, 273, 273,
                    276, 279, 284, 305, 307, 324, 339)) ,
            new ArrayList<>(Arrays.asList(1, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
                    5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,
                    8, 9, 9, 9, 9, 9, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10, 10, 11, 11, 11, 12, 12, 12, 21, 22)),
            new ArrayList<>(Arrays.asList(2, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8,
                    8, 8, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 10, 10,
                    10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 11, 11, 11, 11, 11, 12, 12, 12, 12,
                    12)),
            new ArrayList<>(Arrays.asList(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                    1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4)),
            new ArrayList<>(Arrays.asList(8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,
                    8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9,
                    9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10)),
            new HashMap<>()
    );

    public static ResultVO getCheckResult(IRuleBaseCheckGrammarService iRuleBaseCheckGrammarService,
                                          IRuleBaseOriginalityService iRuleBaseOriginalityService,
                                          IRuleBaseWritingChecklistService iRuleBaseWritingChecklistService,
                                          String essay){
        ResultVO result = new ResultVO();
        Gson gson = new Gson();
        result.setEssayContent(essay);
//        String checkTime = MyUtils.getCurrentTimestamp();

        result.setWordCount(essay.split(" ").length);

        //TODO 需要检查 - assign 鑫蓉，数错误行数能否达到同样效果
//        String grammarResponse = iRuleBaseCheckGrammarService.getCheckGrammarResponse(essay);
//        result.setGrammarErrorCount(iRuleBaseCheckGrammarService.getGrammarErrorCount(gson.fromJson(grammarResponse, Object.class).toString()));
        result.setGrammarErrorCount(iRuleBaseCheckGrammarService.getGrammarErrorCount(iRuleBaseCheckGrammarService.getCheckGrammarResponse(essay)));
        //System.out.println("grammar" + basicData.getGrammarErrorCountList());

        //TODO 需要检查 - assign 鑫蓉，
//        RuleBaseWritingChecklistVO ruleBaseWritingVO = iRuleBaseWritingChecklistService.getWritingChecklistResponse(essay, 0L, checkTime, "");
//        result.setWritingErrorCount(iRuleBaseWritingChecklistService.getWritingErrorCount(gson.fromJson(ruleBaseWritingVO.getResponse(), Object.class).toString()));
        result.setWritingErrorCount(iRuleBaseWritingChecklistService.getWritingErrorCount(iRuleBaseWritingChecklistService.getWritingChecklistResponse(essay)));
        //System.out.println("ruleBase" + basicData.getWritingErrorCountList());

        //TODO 需要检查 - assign 鑫蓉，
//        RuleBaseOriginalityVO ruleBaseOriginalityVO = iRuleBaseOriginalityService.getOriginalityResponse(essay, 0L, checkTime, "");
        result.setOriginalityCount(iRuleBaseOriginalityService.getOriginalityCount(iRuleBaseOriginalityService.getOriginalityResponse(essay)));

        //System.out.println("originality" + basicData.getOriginalityCountList());

        return result;
    }

    public static int getRank(ArrayList<Integer> list, int num){
        int left = 0;
        int right = list.size() - 1;
        while (left < right){
            int mid = (left + right) / 2;
            if (num < list.get(mid)){
                right = mid - 1;
            }else if (num > list.get(mid)){
                left = mid + 1;
            }else {
                return list.indexOf(list.get(mid)) + 1;
            }
        }
        return list.indexOf(list.get(left)) + 1;
    }

    public static ResultVO getScore(ResultVO result) throws IOException, ClassNotFoundException {
        DecimalFormat df = new DecimalFormat("0.00");

        // wordCount
        if(result.getWordCount() >= 200 && result.getWordCount() <= 400){
            result.setWordCountScore(2);
        }
        //result.setWordCountRanking(100 - (double)getRank(basicData.getWordCountList(), result.getWordCount())/basicData.getWordCountList().size() * 100);
        result.setWordCountRanking((double)getRank(basicData.getWordCountList(), result.getWordCount())/basicData.getWordCountList().size() * 100);
        result.setWordCountRanking(Double.parseDouble(df.format(result.getWordCountRanking())));
        // writing - academic
        result.setWritingErrorCountRanking((double)getRank(basicData.getWritingErrorCountList(), result.getWritingErrorCount())/basicData.getWritingErrorCountList().size() * 100);
        result.setWritingErrorCountRanking(Double.parseDouble(df.format(result.getWritingErrorCountRanking())));
        if(result.getWritingErrorCountRanking() <= 20){
            result.setWritingErrorCountScore(4);
        }else if (result.getWritingErrorCountRanking() <= 40){
            result.setWritingErrorCountScore(3);
        }else if (result.getWritingErrorCountRanking() <= 60){
            result.setWritingErrorCountScore(2);
        }else if (result.getWritingErrorCountRanking() <= 80){
            result.setWritingErrorCountScore(1);
        }else {
            result.setWritingErrorCountScore(0);
        }

        // grammar - basic writing
        result.setGrammarErrorCountRanking((double)getRank(basicData.getGrammarErrorCountList(), result.getGrammarErrorCount()) / basicData.getGrammarErrorCountList().size() * 100);
        result.setGrammarErrorCountRanking(Double.parseDouble(df.format(result.getGrammarErrorCountRanking())));
        if (result.getGrammarErrorCountRanking() <= 25){
            result.setGrammarErrorCountScore(2);
        }else if (result.getGrammarErrorCountRanking() <= 75){
            result.setGrammarErrorCountScore(1);
        }else {
            result.setGrammarErrorCountScore(0);
        }

        // originality
        result.setOriginalityCountRanking((double)getRank(basicData.getOriginalityCountList(), result.getOriginalityCount()) / basicData.getOriginalityCountList().size() * 100);
        result.setOriginalityCountRanking(Double.parseDouble(df.format(result.getOriginalityCountRanking())));
        if (result.getOriginalityCountRanking() <= 25){
            result.setOriginalityCountScore(2);
        }else if (result.getOriginalityCountRanking() <= 75){
            result.setOriginalityCountScore(1);
        }else {
            result.setOriginalityCountScore(0);
        }

        // totalScore
        result.setTotalScore(result.getWordCountScore() + result.getGrammarErrorCountScore() + result.getWritingErrorCountScore() + result.getOriginalityCountScore());
        result.setTotalRanking((double)getRank(basicData.getTotalScoreList(), result.getTotalScore()) / basicData.getTotalScoreList().size() * 100);
        result.setTotalRanking(Double.parseDouble(df.format(result.getTotalRanking())));
        result.setDate(MyUtils.convertTimestampToFormat(MyUtils.getCurrentTimestamp()));

        return result;
    }
}