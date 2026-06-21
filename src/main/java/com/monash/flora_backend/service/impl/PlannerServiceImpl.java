package com.monash.flora_backend.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.google.common.collect.Lists;
import com.monash.flora_backend.config.cache.IGlobalCache;
import com.monash.flora_backend.constant.MyConstant;
import com.monash.flora_backend.controller.vo.PlannerVO;
import com.monash.flora_backend.dao.entity.Planner;
import com.monash.flora_backend.dao.mapper.PlannerMapper;
import com.monash.flora_backend.service.IPlannerService;
import com.monash.flora_backend.util.*;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

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
 * @since 2022-10-13
 */
@Slf4j
@Service
@AllArgsConstructor
public class PlannerServiceImpl extends ServiceImpl<PlannerMapper, Planner> implements IPlannerService {
    private final MyConstant myConstant;
    private final IGlobalCache iGlobalCache;

    private Long getCountByUserIdsAndCourseIds(List<Long> userIdList, List<String> courseIdList) {
        AtomicLong totalCount = new AtomicLong();
        userIdList.forEach(userId -> {
            courseIdList.forEach(courseId -> {
                QueryWrapper<Planner> wrapper = new QueryWrapper<>();
                wrapper.eq("user_id", userId).eq("course_id", courseId).orderByDesc("save_time").last("LIMIT 1");
                totalCount.addAndGet(super.count(wrapper));
            });
        });
        return totalCount.get();
    }
    @Override
    public boolean mySave(PlannerVO plannerVO) {
        log.info("plannerVO:" + plannerVO);
        return super.save(MyBeanCopyUtils.copyBean(plannerVO, Planner.class));
    }

    @Override
    public PlannerVO findByUserIdAndCourseIdAndLatestSaveTime(Long userId, String courseId) {
        QueryWrapper<Planner> wrapper = new QueryWrapper<>();
        wrapper.eq("user_id", userId).eq("course_id", courseId).orderByDesc("save_time").last("limit 1");

        Planner planner = super.getOne(wrapper);

        if (planner == null) {
            return null;
        } else {
            return MyBeanCopyUtils.copyBean(planner, PlannerVO.class);
        }
    }

    @Override
    public boolean removeByUserId(Long userId) {
        QueryWrapper<Planner> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("user_id", userId);
        return super.remove(queryWrapper);
    }

    @Override
    public PlannerVO findLatestVersionByUserIdAndCourseId(Long userId, String courseId) {
        QueryWrapper<Planner> wrapper = new QueryWrapper<>();
        if(userId != 0) {
            wrapper.eq("user_id", userId).eq("course_id", courseId)
                    .orderByDesc("save_time").last("limit 1");
        }else {
            wrapper.eq("course_id", courseId)
                    .orderByDesc("save_time").last("limit 1");
        }
        Planner planner = super.getOne(wrapper);
        return planner == null ? null : MyBeanCopyUtils.copyBean(planner, PlannerVO.class);

    }

//    @SneakyThrows
//    @Override
//    public void exportPlannerToExcel() {
//        int totalNumber = super.count();
//
//        int totalPageNumber = totalNumber / MyConstant.ITEM_NUMBER_PER_EXCEL;
//        if (totalNumber % MyConstant.ITEM_NUMBER_PER_EXCEL != 0) {
//            totalPageNumber += 1;
//        }
//
//        for (int i = 0; i < totalPageNumber; i++) {
//
//            String exportFilePath = MyMoodleConfigConstant.EXCEL_EXPORT_PATH + "/planner" + i + ".xlsx";
//
//            QueryWrapper<Planner> wrapper = new QueryWrapper<>();
//            wrapper.last("LIMIT " + (i * MyConstant.ITEM_NUMBER_PER_EXCEL) + ", " + MyConstant.ITEM_NUMBER_PER_EXCEL);
//
//            List<Planner> plannerList = super.list(wrapper);
//
//            //导出包含数据内容的文件（方式二）
//            //头部，第一层
//            List<String> head1 = new ArrayList<>();
//            head1.add("#");
//            head1.add("user_id");
//            head1.add("username");
//            head1.add("save_time");
//            head1.add("url");
//            head1.add("planner_json");
//
//
//            //封装头部
//            List<List<String>> allHead = new ArrayList<>();
//            allHead.add(head1);
//
//
//            List<List<Object>> allData = Lists.newArrayList();
//            //封装数据体
//            for (int k = 0; k < plannerList.size(); k++) {
//                Planner planner = plannerList.get(k);
//                String saveTime = MyUtils.convertTimestampToFormat(planner.getSaveTime());
//
//                List<Object> data1 = Lists.newArrayList((k+1),
//                        planner.getUserId(),
//                        planner.getUsername(),
//                        saveTime,
//                        planner.getUrl(),
//                        planner.getPlannerElementsJson());
//                allData.add(data1);
//            }
//
//            byte[] stream2 = DynamicEasyExcelExportUtil.customerExportExcelFile(allHead, allData);
//            FileOutputStream outputStream2 = new FileOutputStream(new File(exportFilePath));
//            outputStream2.write(stream2);
//            outputStream2.close();
//        }
//    }

    @Override
    public void exportPlannerToExcelByUserIdListAndCourseIdList(List<Long> userIdList, List<String> courseIdList, ZipOutputStream zos) throws IOException {
        //头部，第一层
        List<List<String>> allHead = initialiseHeader();
        List<List<Object>> allData = Lists.newArrayList();

        List<Planner> plannerList = findPlannerByUserIdListCourseIdList(userIdList, courseIdList);

        plannerList.forEach(planner -> {
                if (planner != null){
                    String saveTime = MyUtils.convertTimestampToFormat(planner.getSaveTime());
                    List<Object> data1 = Lists.newArrayList((allData.size()+1),
                            planner.getUserId(),
                            planner.getUsername(),
                            saveTime,
                            planner.getUrl(),
                            planner.getPlannerElementsJson(), planner.getCourseId());
                    allData.add(data1);
                }
            });
//        userIdList.forEach(userId -> {
//            courseIdList.forEach(courseId -> {
//                PlannerVO planner = findLatestVersionByUserIdAndCourseId(userId, courseId);
//                if (planner != null){
//                    String saveTime = MyUtils.convertTimestampToFormat(planner.getSaveTime());
//                    List<Object> data1 = Lists.newArrayList((allData.size()+1),
//                            planner.getUserId(),
//                            planner.getUsername(),
//                            saveTime,
//                            planner.getUrl(),
//                            planner.getPlannerElementsJson(), planner.getCourseId());
//                    allData.add(data1);
//                }
//            });
//        });
        byte[] stream = DynamicEasyExcelExportUtil.customerExportExcelFile(allHead, allData);
        // 写入zip
        FileUtils.writeToZip(zos, stream, "planner.xlsx");
    }

    private List<Planner> findPlannerByUserIdListCourseIdList(List<Long> userIdList, List<String> courseIdList) {
        return getBaseMapper().findPlannerByUserIdListCourseIdList(userIdList, courseIdList.stream().map(Long::valueOf).collect(Collectors.toList()));

    }

    private static List<List<String>> initialiseHeader() {
        List<String> head1 = new ArrayList<>();
        head1.add("#");
        head1.add("user_id");
        head1.add("username");
        head1.add("save_time");
        head1.add("url");
        head1.add("planner_json");
        head1.add("course_id");


        //封装头部
        List<List<String>> allHead = new ArrayList<>();
        allHead.add(head1);
        return allHead;
    }

    @Override
    public void exportPlannerToExcelByUserIdListAndCourseIdList(List<Long> userIdList, List<String> courseIdList, ZipOutputStream zos, int cutRow) throws IOException {
        ExcelBreaker excelBreaker = new ExcelBreaker(cutRow, "planner", initialiseHeader(), zos);
        userIdList.forEach(userId -> {
            courseIdList.forEach(courseId -> {
                PlannerVO planner = findLatestVersionByUserIdAndCourseId(userId, courseId);
                if (planner != null){
                    String saveTime = MyUtils.convertTimestampToFormat(planner.getSaveTime());
                    List<Object> data1 = Lists.newArrayList((excelBreaker.getAllData().size()+1),
                            planner.getUserId(),
                            planner.getUsername(),
                            saveTime,
                            planner.getUrl(),
                            planner.getPlannerElementsJson(), planner.getCourseId());
                    excelBreaker.getAllData().add(data1);
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
    public void exportPlannerToExcelByUserIdListAndCourseIdList(List<Long> userIdList, List<String> courseIdList, int cutRows, String token, String dateString) throws IOException {
        ExcelBreaker excelBreaker = new ExcelBreaker(cutRows, "planner", initialiseHeader(), token, dateString);
        updateTypeCache(token, "Planner", iGlobalCache);
        if(MyConstant.checkNumberOfInstance)
            iGlobalCache.hset(token, "num-total-rows", String.valueOf(getCountByUserIdsAndCourseIds(userIdList, courseIdList)));

        List<Planner> plannerList = findPlannerByUserIdListCourseIdList(userIdList, courseIdList);

        plannerList.forEach(planner -> {
            if (planner != null){
                String saveTime = MyUtils.convertTimestampToFormat(planner.getSaveTime());
                List<Object> data1 = Lists.newArrayList((excelBreaker.getAllData().size()+1),
                        planner.getUserId(),
                        planner.getUsername(),
                        saveTime,
                        planner.getUrl(),
                        planner.getPlannerElementsJson(), planner.getCourseId());
                excelBreaker.getAllData().add(data1);
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
//                PlannerVO planner = findLatestVersionByUserIdAndCourseId(userId, courseId);
//                if (planner != null){
//                    String saveTime = MyUtils.convertTimestampToFormat(planner.getSaveTime());
//                    List<Object> data1 = Lists.newArrayList((excelBreaker.getAllData().size()+1),
//                            planner.getUserId(),
//                            planner.getUsername(),
//                            saveTime,
//                            planner.getUrl(),
//                            planner.getPlannerElementsJson(), planner.getCourseId());
//                    excelBreaker.getAllData().add(data1);
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
