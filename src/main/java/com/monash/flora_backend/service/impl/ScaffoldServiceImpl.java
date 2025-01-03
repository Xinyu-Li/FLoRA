package com.monash.flora_backend.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.monash.flora_backend.config.cache.IGlobalCache;
import com.monash.flora_backend.constant.MyConstant;
import com.monash.flora_backend.constant.MyConstantMariaModelSRLPattern;
import com.monash.flora_backend.controller.vo.ScaffoldVO;
import com.monash.flora_backend.dao.entity.Scaffold;
import com.monash.flora_backend.dao.mapper.ScaffoldMapper;
import com.monash.flora_backend.service.IScaffoldService;
import com.monash.flora_backend.service_func.ActionAndProcessService;
import com.monash.flora_backend.util.MyBeanCopyUtils;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.zip.ZipOutputStream;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author xinyu
 * @since 2023-02-19
 */
@Service
@AllArgsConstructor
@Slf4j
public class ScaffoldServiceImpl extends ServiceImpl<ScaffoldMapper, Scaffold> implements IScaffoldService {
    private final ActionAndProcessService actionAndProcessService;
    private final IGlobalCache iGlobalCache;
    @Override
    public String findByUserIdAndUrlAndLatestSaveTime(Long userId, String courseId) {

        if (iGlobalCache.hasKey(MyConstant.REDIS_SCAFFOLD_INFO + userId)) {
            return iGlobalCache.get(MyConstant.REDIS_SCAFFOLD_INFO + userId).toString();
        } else {
            QueryWrapper<Scaffold> wrapper = new QueryWrapper<>();
            wrapper.eq("user_id", userId).eq("course_id", courseId).orderByDesc("save_time").last("limit 1");

            Scaffold scaffold = super.getOne(wrapper);

            if (scaffold == null) {
                return "";
            } else {
                return scaffold.getScaffoldInfo();
            }
        }
    }

    /**
     * save user's scaffold info
     * @param scaffoldVO
     * @return
     */
    public boolean saveScaffold(ScaffoldVO scaffoldVO) {

//        log.info(scaffoldVO.toString());
//
//        Scaffold scaffold = MyBeanCopyUtils.copyBean(scaffoldVO, Scaffold.class);
//        if (scaffoldVO.getSelectedSuggestionsList() != null) {
//
//            scaffold.setSelectedSuggestions(String.join(";;;", scaffoldVO.getSelectedSuggestionsList()));
//        } else {
//            scaffold.setSelectedSuggestions("");
//        }
//        scaffold.setScaffoldInfo(String.join(";;;", scaffoldVO.getScaffoldInfoList()));
//        scaffold.setScaffoldStatus(String.join(";;;", scaffoldVO.getScaffoldStatusList()));
//        scaffold.setScaffoldViewedStatus(String.join(";;;", scaffoldVO.getScaffoldViewedStatus()));
        iGlobalCache.set(MyConstant.REDIS_SCAFFOLD_INFO + scaffoldVO.getUserId() + "-" + scaffoldVO.getCourseId(),
                scaffoldVO.getScaffoldInfo(), MyConstant.REDIS_EXPIRE_SECONDS);
        return super.save(MyBeanCopyUtils.copyBean(scaffoldVO, Scaffold.class));
    }

    @Override
    public boolean removeByUserId(Long userId) {
        QueryWrapper<Scaffold> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("user_id", userId);
        return super.remove(queryWrapper);
    }

    @Override
    public void exportRuleBasedScaffoldToExcelByUserIdListAndCourseIdList(List<Long> userIdList, List<String> courseIdList, ZipOutputStream zos) throws IOException {

    }

    @Override
    public void checkProcessLabelPatterns(Long userId, Integer currentMinute, String courseId, String modelType) {
        // 尝试用存储redis list 来存储一个用户的所有actions
//        List<String> fromRedisList = iTraceDataService.getFromRedisList(MyConstant.REDIS_ACTION_LABEL_LIST + userId + "-" + courseId);
//        log.info("checkProcessLabelPatterns------redistlist size:{}, modeltype:{}", fromRedisList.size(), modelType);
        Set<String> srlProcessAppearSet = actionAndProcessService.labelAllProcessLabelPatterns(userId, courseId, modelType);

        if (modelType.equals("maria")) {
            showMariaModelScaffold(currentMinute, srlProcessAppearSet);
        } else if (modelType.equals("copes")) {

        }



        /*
        if (fromRedisList.isEmpty()) {
            srlProcessAppearSet = manuallyLabelProcessLabelPatterns(userId, courseId, modelType);
        } else {
            // 在此方法中获取所有action
            String allActionsStr = String.join("=====", fromRedisList) + "=====";
            log.info("checkProcessLabelPatterns:" + allActionsStr);
//            List<TraceData> traceDataList = new ArrayList<>();
//
//            srlProcessAppearSet = new HashSet<>(); //记录detect到的 SRL process
////        Set<String> keyActionSet = new HashSet<>();    // 记录detect到的单个action的SRL process
//            // update process label to database
//            for (String srlProcess : MyConstantMariaModelSRLPattern.MARIA_MODEL_PROCESS_PATTERN_LIST) {
//                String pattern = MyConstantMariaModelSRLPattern.MARIA_MODEL_PROCESS_PATTERN_REGEX_MAP.get(srlProcess);
//                boolean findPattern = match(pattern, allActionsStr, srlProcess, traceDataList);
//                if (findPattern) {
//                    srlProcessAppearSet.add(srlProcess);
//                    allActionsStr = allActionsStr.replaceAll(pattern, "*");  //每次检测到，都替换为*
//                }
//
//            }
            log.info("-----------------------------------------------scaffoldsShowStatus:" + MyConstantMariaModelSRLPattern.SCAFFOLD_SHOW_STATUS);

            List<TraceData> matchTraceDataList = new ArrayList<>();

            srlProcessAppearSet = matchModel(allActionsStr, matchTraceDataList, modelType);
            log.info("SRL process for user:{}-------- {}",userId, srlProcessAppearSet);

            if (!matchTraceDataList.isEmpty()) {
                iTraceDataService.myUpdateBatch(matchTraceDataList); // 这个update 可以 在最后一个scaffold 判定完成后再进行
            }
        }*/





    }
    private void showMariaModelScaffold(Integer currentMinute, Set<String> srlProcessAppearSet) {
        //如果某些条件触发，则不用显示第 i 个scaffold 的 第 j 个item
        if (currentMinute <= MyConstantMariaModelSRLPattern.SCAFFOLD_SHOWING_TIME_LIST[0]) { //第1个scaffold 触发之前
            boolean option1Result = Collections.disjoint(srlProcessAppearSet, MyConstantMariaModelSRLPattern.SCAFFOLD1_OPTION1);
            boolean option2Result = Collections.disjoint(srlProcessAppearSet, MyConstantMariaModelSRLPattern.SCAFFOLD1_OPTION2) && srlProcessAppearSet.contains("RUBRIC");
            boolean option3Result = Collections.disjoint(srlProcessAppearSet, MyConstantMariaModelSRLPattern.SCAFFOLD1_OPTION3) && srlProcessAppearSet.contains("TASK_REQUIREMENT");
            // true 表示出现了，出现了，则不需要展示
            MyConstantMariaModelSRLPattern.SCAFFOLD_SHOW_STATUS.set(0, (option1Result ? "0" : "1") + (option2Result ? "0" : "1") + (option3Result ? "0" : "1"));
        } else if (currentMinute <= MyConstantMariaModelSRLPattern.SCAFFOLD_SHOWING_TIME_LIST[1]) { //第2个scaffold
            boolean option1Result = Collections.disjoint(srlProcessAppearSet, MyConstantMariaModelSRLPattern.SCAFFOLD2_OPTION1) && srlProcessAppearSet.contains("EDIT_ANNOTATION");
            boolean option2Result = Collections.disjoint(srlProcessAppearSet, MyConstantMariaModelSRLPattern.SCAFFOLD2_OPTION2);
            boolean option3Result = Collections.disjoint(srlProcessAppearSet, MyConstantMariaModelSRLPattern.SCAFFOLD2_OPTION3);
            MyConstantMariaModelSRLPattern.SCAFFOLD_SHOW_STATUS.set(1, (option1Result ? "0" : "1") + (option2Result ? "0" : "1") + (option3Result ? "0" : "1"));
        } else if (currentMinute <= MyConstantMariaModelSRLPattern.SCAFFOLD_SHOWING_TIME_LIST[2]) { //第3个scaffold
            boolean option1Result = Collections.disjoint(srlProcessAppearSet, MyConstantMariaModelSRLPattern.SCAFFOLD3_OPTION1) && srlProcessAppearSet.contains("READ_ANNOTATION");
            boolean option2Result = Collections.disjoint(srlProcessAppearSet, MyConstantMariaModelSRLPattern.SCAFFOLD3_OPTION2) && srlProcessAppearSet.contains("TASK_REQUIREMENT");
            boolean option3Result = Collections.disjoint(srlProcessAppearSet, MyConstantMariaModelSRLPattern.SCAFFOLD3_OPTION3) && srlProcessAppearSet.contains("WRITE_ESSAY");
            MyConstantMariaModelSRLPattern.SCAFFOLD_SHOW_STATUS.set(2, (option1Result ? "0" : "1") + (option2Result ? "0" : "1") + (option3Result ? "0" : "1"));
        } else if (currentMinute <= MyConstantMariaModelSRLPattern.SCAFFOLD_SHOWING_TIME_LIST[3]) { //第4个scaffold
            boolean option1Result = Collections.disjoint(srlProcessAppearSet, MyConstantMariaModelSRLPattern.SCAFFOLD4_OPTION1);
            boolean option2Result = Collections.disjoint(srlProcessAppearSet, MyConstantMariaModelSRLPattern.SCAFFOLD4_OPTION2) && srlProcessAppearSet.contains("RUBRIC");
            boolean option3Result = Collections.disjoint(srlProcessAppearSet, MyConstantMariaModelSRLPattern.SCAFFOLD4_OPTION3);
            MyConstantMariaModelSRLPattern.SCAFFOLD_SHOW_STATUS.set(3, (option1Result ? "0" : "1") + (option2Result ? "0" : "1") + (option3Result ? "0" : "1"));
        } else if (currentMinute <= MyConstantMariaModelSRLPattern.SCAFFOLD_SHOWING_TIME_LIST[4]) { //第5个scaffold
            boolean option1Result = Collections.disjoint(srlProcessAppearSet, MyConstantMariaModelSRLPattern.SCAFFOLD5_OPTION1) && srlProcessAppearSet.contains("RUBRIC");
            boolean option2Result = Collections.disjoint(srlProcessAppearSet, MyConstantMariaModelSRLPattern.SCAFFOLD5_OPTION2);
            boolean option3Result = Collections.disjoint(srlProcessAppearSet, MyConstantMariaModelSRLPattern.SCAFFOLD5_OPTION3) && srlProcessAppearSet.contains("TASK_REQUIREMENT");
            MyConstantMariaModelSRLPattern.SCAFFOLD_SHOW_STATUS.set(4, (option1Result ? "0" : "1") + (option2Result ? "0" : "1") + (option3Result ? "0" : "1"));
        }
    }








}
