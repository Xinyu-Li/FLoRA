package com.monash.flora_backend.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.google.common.collect.Lists;
import com.monash.flora_backend.config.cache.IGlobalCache;
import com.monash.flora_backend.constant.MyConstant;
import com.monash.flora_backend.controller.vo.EssayVO;
import com.monash.flora_backend.dao.entity.Essay;
import com.monash.flora_backend.dao.mapper.EssayMapper;
import com.monash.flora_backend.service.IEssayService;
import com.monash.flora_backend.util.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
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
 * @since 2022-10-11
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class EssayServiceImpl extends ServiceImpl<EssayMapper, Essay> implements IEssayService {
    private final IGlobalCache iGlobalCache;
    @Override
    public boolean save(EssayVO essayVO) {
        return super.save(MyBeanCopyUtils.copyBean(essayVO, Essay.class));
    }
    @Override
    public EssayVO findLatestVersionByUserIdAndCourseId(Long userId, String courseId) {
        log.info("here>>>> findLatestVersionByUserIdAndCourseId" + userId + "   "+ courseId);
        QueryWrapper<Essay> wrapper = new QueryWrapper<>();
        wrapper.eq("user_id", userId).eq("course_id", courseId).orderByDesc("save_time").last("LIMIT 1");

        Essay essay = super.getOne(wrapper);
        return essay == null ? null : MyBeanCopyUtils.copyBean(essay, EssayVO.class);
    }
    public Long getCountByUserIdsAndCourseIds(List<Long> userIdList, List<String> courseIdList) {
        AtomicLong totalCount = new AtomicLong();

        userIdList.forEach(userId -> {
            courseIdList.forEach(courseId -> {
//                long startTime = System.nanoTime();
                QueryWrapper<Essay> wrapper = new QueryWrapper<>();
                wrapper.eq("user_id", userId).eq("course_id", courseId).orderByDesc("save_time").last("LIMIT 1");
//                long endTime = System.nanoTime();
//                log.info("running time for getting count: " + (endTime - startTime));

                totalCount.addAndGet(super.count(wrapper));
            });
        });
        return totalCount.get();
    }

    @Override
    public boolean saveBatch(List<EssayVO> essayVOList) {
        if (essayVOList.isEmpty()) {
            return false;
        }
        List<Essay> essayList = MyBeanCopyUtils.copyBeanList(essayVOList, Essay.class);
        return super.saveBatch(essayList);
    }

    @Override
    public boolean removeByUserId(Long userId) {
        QueryWrapper<Essay> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("user_id", userId);
        return super.remove(queryWrapper);
    }

//    @SneakyThrows
//    @Override
//    public void exportEssayToExcel() {
//        int totalNumber = super.count();
//
//        int totalPageNumber = totalNumber / MyConstant.ITEM_NUMBER_PER_EXCEL;
//        if (totalNumber % MyConstant.ITEM_NUMBER_PER_EXCEL != 0) {
//            totalPageNumber += 1;
//        }
//
//        for (int i = 0; i < totalPageNumber; i++) {
//
//            String exportFilePath = MyMoodleConfigConstant.EXCEL_EXPORT_PATH + "/essay" + i + ".xlsx";
//            log.info("----------------" + exportFilePath);
//
//            QueryWrapper<Essay> wrapper = new QueryWrapper<>();
//            wrapper.last("LIMIT " + (i * MyConstant.ITEM_NUMBER_PER_EXCEL) + ", " + MyConstant.ITEM_NUMBER_PER_EXCEL);
//
//            List<Essay> essayList = super.list(wrapper);
//
//            //导出包含数据内容的文件（方式二）
//            //头部，第一层
//            List<String> head1 = new ArrayList<>();
//            head1.add("#");
//            head1.add("user_id");
//            head1.add("username");
//            head1.add("save_time");
//            head1.add("url");
//            head1.add("essay_content");
//            head1.add("essay_content_json");
//
//            //封装头部
//            List<List<String>> allHead = new ArrayList<>();
//            allHead.add(head1);
//
//
//            List<List<Object>> allData = Lists.newArrayList();
//            //封装数据体
//            for (int k = 0; k < essayList.size(); k++) {
//                Essay essay = essayList.get(k);
//                String saveTime = MyUtils.convertTimestampToFormat(essay.getSaveTime());
//
//                List<Object> data1 = Lists.newArrayList((k+1),
//                        essay.getUserId(),
//                        essay.getUsername(),
//                        saveTime,
//                        essay.getUrl(),
//                        essay.getEssayContent(),
//                        essay.getEssayContentJson());
//                allData.add(data1);
//            }
//
//            byte[] stream2 = DynamicEasyExcelExportUtil.customerExportExcelFile(allHead, allData);
//            FileOutputStream outputStream2 = new FileOutputStream(new File(exportFilePath));
//            outputStream2.write(stream2);
//            outputStream2.close();
//        }
//    }

    @Autowired
    private SqlSessionFactory sqlSessionFactory;
    @Override
    public void exportEssayToExcelByUserIdListAndCourseIdList(List<Long> userIdList, List<String> courseIdList, ZipOutputStream zos) throws IOException {
        List<List<String>> allHead = initialiseHeader();

        List<List<Object>> allData = Lists.newArrayList();
        //封装数据体

        List<Essay> essayList = findLatestVersionEssayByUserIdListCourseIdList(userIdList, courseIdList);

        essayList.forEach(essay -> {
            String saveTime = MyUtils.convertTimestampToFormat(essay.getSaveTime());
            List<Object> data = Lists.newArrayList(allData.size()+1,
                    essay.getUserId(),
                    essay.getUsername(),
                    saveTime,
                    essay.getUrl(),
                    essay.getEssayContent(),
                    essay.getEssayContentJson(), essay.getCourseId());
            allData.add(data);
        });

        /*userIdList.forEach(userId -> {
            courseIdList.forEach(courseId -> {
                EssayVO essay = findLatestVersionByUserIdAndCourseId(userId, courseId);

                if (essay != null){
                    String saveTime = MyUtils.convertTimestampToFormat(essay.getSaveTime());
                    List<Object> data = Lists.newArrayList(allData.size()+1,
                            essay.getUserId(),
                            essay.getUsername(),
                            saveTime,
                            essay.getUrl(),
                            essay.getEssayContent(),
                            essay.getEssayContentJson(), essay.getCourseId());
                    allData.add(data);
                }
            });
        });*/
        byte[] stream = DynamicEasyExcelExportUtil.customerExportExcelFile(allHead, allData);
        // 写入zip
        FileUtils.writeToZip(zos, stream, "essay.xlsx");
    }

    public void exportEssayLogToExcelByUserIdListAndCourseIdList(List<Long> userIdList, List<String> courseIdList, ZipOutputStream zos) throws IOException {
        List<List<String>> allHead = initialiseHeader();

        List<List<Object>> allData = Lists.newArrayList();
        //封装数据体

        List<Essay> essayList = findEssayLogByUserIdListCourseIdList(userIdList, courseIdList);

        essayList.forEach(essay -> {
            String saveTime = MyUtils.convertTimestampToFormat(essay.getSaveTime());
            List<Object> data = Lists.newArrayList(allData.size()+1,
                    essay.getUserId(),
                    essay.getUsername(),
                    saveTime,
                    essay.getUrl(),
                    essay.getEssayContent(),
                    essay.getEssayContentJson(), essay.getCourseId());
            allData.add(data);
        });

        byte[] stream = DynamicEasyExcelExportUtil.customerExportExcelFile(allHead, allData);
        // 写入zip
        FileUtils.writeToZip(zos, stream, "essayLog.xlsx");
    }

    @Override
    public void exportEssayLogToExcelByUserIdListAndCourseIdList(List<Long> userIdList, List<String> courseIdList, ZipOutputStream zos, int cutRows) throws IOException {
        ExcelBreaker excelBreaker = new ExcelBreaker(cutRows, "essayLog", initialiseHeader(), zos);

        log.info("start processing --↓↓↓↓↓");
        //封装数据体
        List<Essay> essayList = findEssayLogByUserIdListCourseIdList(userIdList, courseIdList);
        essayList.forEach(essay -> {
                if (essay != null) {
                    String saveTime = MyUtils.convertTimestampToFormat(essay.getSaveTime());
                    List<Object> data = Lists.newArrayList(excelBreaker.getAllData().size() + 1,
                            essay.getUserId(),
                            essay.getUsername(),
                            saveTime,
                            essay.getUrl(),
                            essay.getEssayContent(),
                            essay.getEssayContentJson(), essay.getCourseId());
                    excelBreaker.getAllData().add(data);
                    // 2. 每次完成一次add data就increase
                    excelBreaker.increaseCount(1);
                    // 如果counter超过了cutRow，保存进zip
                    excelBreaker.tryUpdateParamsAndSave();

                }
        });
        excelBreaker.saveExcelToZip();
        log.info("end processing --↑↑↑↑↑↑↑↑↑");

//        byte[] stream = DynamicEasyExcelExportUtil.customerExportExcelFile(allHead, allData);
//        // 写入zip
//        FileUtils.writeToZip(zos, stream, "essay.xlsx");
    }

    @Override
    public void exportEssayLogToExcelByUserIdListAndCourseIdList(List<Long> userIdList, List<String> courseIdList, int cutRows, String token, String dateString) throws IOException {
        ExcelBreaker excelBreaker = new ExcelBreaker(cutRows, "essayLog", initialiseHeader(), token, dateString);
        updateTypeCache(token, "EssayLog", iGlobalCache);
        if(MyConstant.checkNumberOfInstance)
            iGlobalCache.hset(token, "num-total-rows", String.valueOf(getCountByUserIdsAndCourseIds(userIdList, courseIdList)));

        log.info("start processing --↓↓↓↓↓");
        //封装数据体
        List<Essay> essayList = findEssayLogByUserIdListCourseIdList(userIdList, courseIdList);
//        List<Essay> essayList = List.of(null);
        essayList.forEach(essay -> {
            String saveTime = MyUtils.convertTimestampToFormat(essay.getSaveTime());
            List<Object> data = Lists.newArrayList(excelBreaker.getAllData().size()+1,
                    essay.getUserId(),
                    essay.getUsername(),
                    saveTime,
                    essay.getUrl(),
                    essay.getEssayContent(),
                    essay.getEssayContentJson(), essay.getCourseId());
            excelBreaker.getAllData().add(data);
            // 2. 每次完成一次add data就increase
            excelBreaker.increaseCount(1);
            excelBreaker.tryUpdateCache(iGlobalCache);
            // 如果counter超过了cutRow，保存进zip
            excelBreaker.tryUpdateParamsAndSaveToExcel();
        });

        excelBreaker.saveExcelToFile();
        log.info("end processing --↑↑↑↑↑↑↑↑↑");
    }


    @Override
    public void exportEssayToExcelByUserIdListAndCourseIdList(List<Long> userIdList, List<String> courseIdList, ZipOutputStream zos, int cutRow) throws IOException {
//        List<List<String>> allHead = initialiseHeader();
//        List<List<Object>> allData = Lists.newArrayList();
        // 1. 初始化excelBreaker
        ExcelBreaker excelBreaker = new ExcelBreaker(cutRow, "essay", initialiseHeader(), zos);

        log.info("start processing --↓↓↓↓↓");
        //封装数据体
        userIdList.forEach(userId -> {
            courseIdList.forEach(courseId -> {
                EssayVO essay = findLatestVersionByUserIdAndCourseId(userId, courseId);

                if (essay != null) {
                    String saveTime = MyUtils.convertTimestampToFormat(essay.getSaveTime());
                    List<Object> data = Lists.newArrayList(excelBreaker.getAllData().size() + 1,
                            essay.getUserId(),
                            essay.getUsername(),
                            saveTime,
                            essay.getUrl(),
                            essay.getEssayContent(),
                            essay.getEssayContentJson(), essay.getCourseId());
                    excelBreaker.getAllData().add(data);
                    // 2. 每次完成一次add data就increase
                    excelBreaker.increaseCount(1);
                    // 如果counter超过了cutRow，保存进zip
                    excelBreaker.tryUpdateParamsAndSave();

                }
            });
        });
        excelBreaker.saveExcelToZip();
        log.info("end processing --↑↑↑↑↑↑↑↑↑");

//        byte[] stream = DynamicEasyExcelExportUtil.customerExportExcelFile(allHead, allData);
//        // 写入zip
//        FileUtils.writeToZip(zos, stream, "essay.xlsx");
    }

    @Override
    public void exportEssayToExcelByUserIdListAndCourseIdList(List<Long> userIdList, List<String> courseIdList, int cutRows, String token, String dateString) throws IOException {
        // update

        ExcelBreaker excelBreaker = new ExcelBreaker(cutRows, "essay", initialiseHeader(), token, dateString);
        updateTypeCache(token, "Essay", iGlobalCache);
        if(MyConstant.checkNumberOfInstance)
            iGlobalCache.hset(token, "num-total-rows", String.valueOf(getCountByUserIdsAndCourseIds(userIdList, courseIdList)));

        log.info("start processing --↓↓↓↓↓");
        //封装数据体
        List<Essay> essayList = findLatestVersionEssayByUserIdListCourseIdList(userIdList, courseIdList);
//        List<Essay> essayList = List.of(null);
        essayList.forEach(essay -> {
            String saveTime = MyUtils.convertTimestampToFormat(essay.getSaveTime());
            List<Object> data = Lists.newArrayList(excelBreaker.getAllData().size()+1,
                    essay.getUserId(),
                    essay.getUsername(),
                    saveTime,
                    essay.getUrl(),
                    essay.getEssayContent(),
                    essay.getEssayContentJson(), essay.getCourseId());
            excelBreaker.getAllData().add(data);
            // 2. 每次完成一次add data就increase
            excelBreaker.increaseCount(1);
            excelBreaker.tryUpdateCache(iGlobalCache);
            // 如果counter超过了cutRow，保存进zip
            excelBreaker.tryUpdateParamsAndSaveToExcel();
        });
//        userIdList.forEach(userId -> {
//            long startimeCourse = System.currentTimeMillis();
//            courseIdList.forEach(courseId -> {
//                long startTime = System.currentTimeMillis();
//                EssayVO essay = findLatestVersionByUserIdAndCourseId(userId, courseId);
//                long endTime = System.currentTimeMillis();
//
//                log.info("running time for db inference: " + (endTime - startTime));
//
//                if (essay != null) {
//                    String saveTime = MyUtils.convertTimestampToFormat(essay.getSaveTime());
//                    List<Object> data = Lists.newArrayList(excelBreaker.getAllData().size() + 1,
//                            essay.getUserId(),
//                            essay.getUsername(),
//                            saveTime,
//                            essay.getUrl(),
//                            essay.getEssayContent(),
//                            essay.getEssayContentJson(), essay.getCourseId());
//                    excelBreaker.getAllData().add(data);
//                    // 2. 每次完成一次add data就increase
//                    excelBreaker.increaseCount(1);
//                    excelBreaker.tryUpdateCache(iGlobalCache);
//                    // 如果counter超过了cutRow，保存进zip
//                    excelBreaker.tryUpdateParamsAndSaveToExcel();
//
//                }
//                long endTime3 = System.currentTimeMillis();
//
//                log.info("running time for counting inference: " + (endTime3 - endTime));
//
//                }
//            });
//            log.info("running time for a student: " + (System.currentTimeMillis() - startimeCourse));
//
//        });
        excelBreaker.saveExcelToFile();
        log.info("end processing --↑↑↑↑↑↑↑↑↑");
    }

    private List<List<String>> initialiseHeader(){
        List<String> head1 = new ArrayList<>();

        head1.add("#");
        head1.add("user_id");
        head1.add("username");
        head1.add("save_time");
        head1.add("url");
        head1.add("essay_content");
        head1.add("essay_content_json");
        head1.add("course_id");

        //封装头部
        List<List<String>> allHead = new ArrayList<>();
        allHead.add(head1);
        return allHead;
    }
//    @Override
//    public EssayVO findLastEssayByUserIdAndCourseId(Long userId, String courseId) {
//        QueryWrapper<Essay> queryWrapper = new QueryWrapper<>();
//        queryWrapper.eq("user_id", userId).eq("course_id", courseId)
//                .orderByDesc("save_time").last("limit 1");
//
//        Essay essay = super.getOne(queryWrapper);
//        return essay == null ? null : MyBeanCopyUtils.copyBean(essay, EssayVO.class);
//    }


    @Override
    public boolean checkEssayHasUpdateBetweenTimeRange(Long userId, String courseId, String beginTimestamp, String endTimestamp) {
        return getBaseMapper().checkEssayHasUpdateBetweenTimeRange(userId, courseId, beginTimestamp, endTimestamp);
    }

    @Override
    public List<Essay> findLatestVersionEssayByUserIdListCourseIdList(List<Long> userIdList, List<String> courseIdList) {

//        return getBaseMapper().findLatestVersionEssayByUserIdListCourseIdList("(" + userIdList.stream().map(String::valueOf).collect(Collectors.joining(",")) + ")", "(" + String.join(",", courseIdList) + ")");
        return getBaseMapper().findLatestVersionEssayByUserIdListCourseIdList(userIdList, courseIdList.stream().map(Long::valueOf).collect(Collectors.toList()));
    }

    @Override
    public List<Essay> findEssayLogByUserIdListCourseIdList(List<Long> userIdList, List<String> courseIdList) {
        return getBaseMapper().findEssayLogByUserIdListCourseIdList(userIdList, courseIdList.stream().map(Long::valueOf).collect(Collectors.toList()));

    }
}
