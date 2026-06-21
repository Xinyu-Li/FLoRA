package com.monash.flora_backend.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.google.common.collect.Lists;
import com.monash.flora_backend.config.cache.IGlobalCache;
import com.monash.flora_backend.constant.MyConstant;
import com.monash.flora_backend.controller.vo.RuleBaseIntegrationAndElaborationVO;
import com.monash.flora_backend.dao.entity.Essay;
import com.monash.flora_backend.dao.entity.RuleBaseIntegrationAndElaboration;
import com.monash.flora_backend.dao.entity.RuleBaseWritingChecklist;
import com.monash.flora_backend.dao.mapper.RuleBaseIntegrationAndElaborationMapper;
import com.monash.flora_backend.service.IRuleBaseIntegrationAndElaborationService;
import com.monash.flora_backend.util.*;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;
import java.util.zip.ZipOutputStream;

import static com.monash.flora_backend.util.GenerateLinkCacheHelper.updateTypeCache;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author xinyu
 * @since 2023-05-22
 */
@Service
@AllArgsConstructor
@Slf4j
public class RuleBaseIntegrationAndElaborationServiceImpl extends ServiceImpl<RuleBaseIntegrationAndElaborationMapper, RuleBaseIntegrationAndElaboration> implements IRuleBaseIntegrationAndElaborationService {

    private RestTemplate restTemplate;
    private final IGlobalCache iGlobalCache;

    private Long getCountByUserIdsAndCourseIds(List<Long> userIdList, List<String> courseIdList) {
        AtomicLong totalCount = new AtomicLong();
        userIdList.forEach(userId -> {
            courseIdList.forEach(courseId -> {
                QueryWrapper<RuleBaseIntegrationAndElaboration> wrapper = new QueryWrapper<>();
                wrapper.eq("user_id", userId).eq("course_id", courseId);
                totalCount.addAndGet(super.count(wrapper));
            });
        });
        return totalCount.get();
    }
    @Override
    public RuleBaseIntegrationAndElaborationVO getIntegrationAndElaborationResponse(String essay, Long userId, String checkTime, String courseId) {

        String result = MyUtils.sendHttpRequest(courseId, essay, restTemplate, "/check-classification");
        RuleBaseIntegrationAndElaboration ruleBase = new RuleBaseIntegrationAndElaboration();

        ruleBase.setUserId(userId);
        ruleBase.setEssay(essay);

        ruleBase.setResponse(result);
        ruleBase.setCheckTime(checkTime);
        ruleBase.setCourseId(courseId);

        if (super.save(ruleBase)) {
            return MyBeanCopyUtils.copyBean(ruleBase, RuleBaseIntegrationAndElaborationVO.class);
        } else {
            return null;
        }
    }

    @Override
    public RuleBaseIntegrationAndElaborationVO getLatestIntegrationAndElaborationFromDB(Long userId, String courseId) {
        QueryWrapper<RuleBaseIntegrationAndElaboration> wrapper = new QueryWrapper<>();
        wrapper.eq("user_id", userId).eq("course_id", courseId).orderByDesc("check_time").last("limit 1");
        RuleBaseIntegrationAndElaboration one = super.getOne(wrapper);

        return one != null ? MyBeanCopyUtils.copyBean(one, RuleBaseIntegrationAndElaborationVO.class) : null;
    }

    @Override
    public void exportIntegrationAndElaborationToExcelByUserIdListAndCourseIdList(List<Long> userIdList, List<String> courseIdList, ZipOutputStream zos) throws IOException {
        //头部，第一层
        List<List<String>> allHead = initialiseHeader();

        List<List<Object>> allData = Lists.newArrayList();
        //封装数据体
        List<RuleBaseIntegrationAndElaborationVO> ruleBaseIntegrationAndElaborationVOList = findRuleBaseIntegrationAndElaborationVOByUserIdListCourseIdList(userIdList, courseIdList);

        ruleBaseIntegrationAndElaborationVOList.forEach(ruleBaseIntegrationAndElaborationVO -> {
                if (ruleBaseIntegrationAndElaborationVO != null){
                    List<Object> data = Lists.newArrayList(allData.size()+1,
                            ruleBaseIntegrationAndElaborationVO.getUserId(), ruleBaseIntegrationAndElaborationVO.getEssay(), ruleBaseIntegrationAndElaborationVO.getResponse(),
                            ruleBaseIntegrationAndElaborationVO.getCheckTime()
                    );
                    allData.add(data);
                }

        });
        byte[] stream = DynamicEasyExcelExportUtil.customerExportExcelFile(allHead, allData);
        // 写入zip
        FileUtils.writeToZip(zos, stream, "integration_and_elaboration.xlsx");
    }

    private List<RuleBaseIntegrationAndElaborationVO> findRuleBaseIntegrationAndElaborationVOByUserIdListCourseIdList(List<Long> userIdList, List<String> courseIdList) {
        return getBaseMapper().findRuleBaseIntegrationAndElaborationVOByUserIdListCourseIdList(userIdList, courseIdList.stream().map(Long::valueOf).collect(Collectors.toList()));
    }

    private static List<List<String>> initialiseHeader() {
        List<String> head1 = new ArrayList<>();
        head1.add("#");
        head1.add("user_id");
        head1.add("essay");
        head1.add("response");
        head1.add("check_time");

        //封装头部
        List<List<String>> allHead = new ArrayList<>();
        allHead.add(head1);
        return allHead;
    }

    @Override
    public void exportIntegrationAndElaborationToExcelByUserIdListAndCourseIdList(List<Long> userIdList, List<String> courseIdList, ZipOutputStream zos, int cutRow) throws IOException {
        ExcelBreaker excelBreaker = new ExcelBreaker(cutRow, "integration_and_elaboration", initialiseHeader(), zos);
        //封装数据体
        userIdList.forEach(userId -> {
            courseIdList.forEach(courseId -> {
                RuleBaseIntegrationAndElaborationVO ruleBaseIntegrationAndElaborationVO = getLatestIntegrationAndElaborationFromDB(userId, courseId);
                if (ruleBaseIntegrationAndElaborationVO != null){
                    List<Object> data = Lists.newArrayList(excelBreaker.getAllData().size()+1,
                            userId, ruleBaseIntegrationAndElaborationVO.getEssay(), ruleBaseIntegrationAndElaborationVO.getResponse(),
                            ruleBaseIntegrationAndElaborationVO.getCheckTime()
                    );
                    excelBreaker.getAllData().add(data);
                    // 2. 每次完成一次add data就increase
                    excelBreaker.increaseCount(1);
                    // 如果counter超过了cutRow，保存进zip
                    excelBreaker.tryUpdateParamsAndSave();
                }
            });
        });
        excelBreaker.saveExcelToZip();
    }

    @Override
    public void exportIntegrationAndElaborationToExcelByUserIdListAndCourseIdList(List<Long> userIdList, List<String> courseIdList, int cutRows, String token, String dateString) throws IOException {
        ExcelBreaker excelBreaker = new ExcelBreaker(cutRows, "integration_and_elaboration", initialiseHeader(), token, dateString);
        updateTypeCache(token, "integration_and_elaboration", iGlobalCache);
        if(MyConstant.checkNumberOfInstance)
            iGlobalCache.hset(token, "num-total-rows", String.valueOf(getCountByUserIdsAndCourseIds(userIdList, courseIdList)));
        //封装数据体

        List<RuleBaseIntegrationAndElaborationVO> ruleBaseIntegrationAndElaborationVOList = findRuleBaseIntegrationAndElaborationVOByUserIdListCourseIdList(userIdList, courseIdList);

        ruleBaseIntegrationAndElaborationVOList.forEach(ruleBaseIntegrationAndElaborationVO -> {
            if (ruleBaseIntegrationAndElaborationVO != null){
                List<Object> data = Lists.newArrayList(excelBreaker.getAllData().size()+1,
                        ruleBaseIntegrationAndElaborationVO.getUserId(), ruleBaseIntegrationAndElaborationVO.getEssay(), ruleBaseIntegrationAndElaborationVO.getResponse(),
                        ruleBaseIntegrationAndElaborationVO.getCheckTime()
                );
                excelBreaker.getAllData().add(data);
                // 2. 每次完成一次add data就increase
                excelBreaker.increaseCount(1);
                excelBreaker.tryUpdateCache(iGlobalCache);
                // 如果counter超过了cutRow，保存进zip
                excelBreaker.tryUpdateParamsAndSaveToExcel();
            }

        });
        excelBreaker.saveExcelToFile();

//        userIdList.forEach(userId -> {
//            courseIdList.forEach(courseId -> {
//                RuleBaseIntegrationAndElaborationVO ruleBaseIntegrationAndElaborationVO = getLatestIntegrationAndElaborationFromDB(userId, courseId);
//                if (ruleBaseIntegrationAndElaborationVO != null){
//                    List<Object> data = Lists.newArrayList(excelBreaker.getAllData().size()+1,
//                            userId, ruleBaseIntegrationAndElaborationVO.getEssay(), ruleBaseIntegrationAndElaborationVO.getResponse(),
//                            ruleBaseIntegrationAndElaborationVO.getCheckTime()
//                    );
//
//                    excelBreaker.getAllData().add(data);
//                    // 2. 每次完成一次add data就increase
//                    excelBreaker.increaseCount(1);
//                    excelBreaker.tryUpdateCache(iGlobalCache);
//                    // 如果counter超过了cutRow，保存进zip
//                    excelBreaker.tryUpdateParamsAndSaveToExcel();
//                }
//            });
//        });
    }
}
