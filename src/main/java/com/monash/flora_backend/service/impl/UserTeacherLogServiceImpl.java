package com.monash.flora_backend.service.impl;

import cn.hutool.json.JSONUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.google.common.collect.Lists;
import com.monash.flora_backend.config.cache.IGlobalCache;
import com.monash.flora_backend.constant.MyConstant;
import com.monash.flora_backend.controller.vo.UserTeacherLogVO;
import com.monash.flora_backend.dao.entity.RuleBaseWritingChecklist;
import com.monash.flora_backend.dao.entity.TraceData;
import com.monash.flora_backend.dao.entity.UserTeacherLog;
import com.monash.flora_backend.dao.mapper.UserTeacherLogMapper;
import com.monash.flora_backend.service.IUserTeacherLogService;
import com.monash.flora_backend.util.DynamicEasyExcelExportUtil;
import com.monash.flora_backend.util.ExcelBreaker;
import com.monash.flora_backend.util.FileUtils;
import com.monash.flora_backend.util.MyBeanCopyUtils;
import lombok.RequiredArgsConstructor;
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
 * @since 2023-04-17
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class UserTeacherLogServiceImpl extends ServiceImpl<UserTeacherLogMapper, UserTeacherLog> implements IUserTeacherLogService {
    private final IGlobalCache iGlobalCache;
    private static boolean userTeacherChatLogHistoryAllInRedis = false;

    private Long getCountByUserIdsAndCourseIds(List<Long> userIdList, List<String> courseIdList) {
        AtomicLong totalCount = new AtomicLong();
        userIdList.forEach(userId -> {
            courseIdList.forEach(courseId -> {
                QueryWrapper<UserTeacherLog> wrapper = new QueryWrapper<>();
                wrapper.eq("user_id", userId).eq("course_id", courseId).orderByDesc("chat_time").last("LIMIT 1");
                totalCount.addAndGet(super.count(wrapper));
            });
        });
        return totalCount.get();
    }
    @Override
    public boolean removeByUserId(Long userId) {
        QueryWrapper<UserTeacherLog> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("user_id", userId);
        return super.remove(queryWrapper);
    }

    @Override
    public boolean createUserTeacherLog(Long userId, String chatText, String chatTime, String chatRole, String courseId) {
        UserTeacherLog userTeacherLog = new UserTeacherLog();
        userTeacherLog.setUserId(userId);
        userTeacherLog.setChatText(chatText);
        userTeacherLog.setChatTime(chatTime);
        userTeacherLog.setChatRole(chatRole);
        userTeacherLog.setCourseId(courseId);

        UserTeacherLogVO userTeacherLogVO = MyBeanCopyUtils.copyBean(userTeacherLog, UserTeacherLogVO.class);
        iGlobalCache.lSet(MyConstant.REDIS_TEACHER_CHAT_LOG_LIST + userId + "-" + courseId, JSONUtil.toJsonStr(userTeacherLogVO), MyConstant.REDIS_EXPIRE_SECONDS);

        return super.save(userTeacherLog);
    }

    //TODO check userTeacherChatLogHistoryAllInRedis why use this
    @Override
    public List<UserTeacherLogVO> findAllTeacherChatLogByUserId(Long userId, String courseId) {
//        log.info("into findAllTeacherChatLogByUserId**********");
        String key = MyConstant.REDIS_TEACHER_CHAT_LOG_LIST + userId;
        if (iGlobalCache.hasKey(key) && !userTeacherChatLogHistoryAllInRedis) {
            QueryWrapper<UserTeacherLog> queryWrapperCount = new QueryWrapper<>();
            queryWrapperCount.eq("user_id", userId).eq("course_id", courseId);
            int countUserTeacherLog = super.count(queryWrapperCount);
            if (iGlobalCache.lGetListSize(key) == countUserTeacherLog) {
                log.info(iGlobalCache.lGetListSize(key) + "--------------");
                List<String> objList = iGlobalCache.lGet(key, 0, -1);
                List<UserTeacherLogVO> reverseList = new ArrayList<>();
//                objList.stream().map(obj -> JSON.parseObject(String.valueOf(obj), UserTeacherLogVO.class)).collect(Collectors.toList()).forEach(userTeacherLogVO -> reverseList.add(0, userTeacherLogVO));
                objList.stream().map(obj -> JSONUtil.toBean(obj, UserTeacherLogVO.class)).collect(Collectors.toList()).forEach(userTeacherLogVO -> reverseList.add(0, userTeacherLogVO));
                log.info(reverseList.size() + "============");
                return reverseList;
            } else {
                return getUserTeacherLogVOFromDB(userId, courseId);
            }
        } else {
            return getUserTeacherLogVOFromDB(userId, courseId);
        }
    }

    //TODO check getUserTeacherLogVOFromDB is redis has issue
    private List<UserTeacherLogVO> getUserTeacherLogVOFromDB(Long userId, String courseId) {
        QueryWrapper<UserTeacherLog> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("user_id", userId).orderByAsc("chat_time");
        List<UserTeacherLogVO> userTeacherLogVOList = MyBeanCopyUtils.copyBeanList(super.list(queryWrapper), UserTeacherLogVO.class);
        String key = MyConstant.REDIS_TEACHER_CHAT_LOG_LIST + userId + "-" + courseId;
        if (iGlobalCache.hasKey(key)) {
            iGlobalCache.del(key);
        }
        userTeacherLogVOList.forEach(userTeacherLogVO -> iGlobalCache.lSet(key, JSONUtil.toJsonStr(userTeacherLogVO), MyConstant.REDIS_EXPIRE_SECONDS));
        userTeacherChatLogHistoryAllInRedis = true;
        return userTeacherLogVOList;
    }

    @Override
    public void exportTeacherChatLogToExcelByUserIdListAndCourseIdList(List<Long> userIdList, List<String> courseIdList, ZipOutputStream zos) throws IOException {
        //头部，第一层
        List<List<String>> allHead = initialiseHeader();

        List<List<Object>> allData = Lists.newArrayList();
        List<UserTeacherLog> userTeacherLogs = findUserTeacherLogByUserIdListCourseIdList(userIdList, courseIdList);

        userTeacherLogs.forEach(userTeacherLog -> {

                    List<Object> data = Lists.newArrayList(allData.size()+1,
                            userTeacherLog.getUserId(), userTeacherLog.getChatText(), userTeacherLog.getChatTime(),
                            userTeacherLog.getChatRole(), userTeacherLog.getCourseId()
                    );
                    allData.add(data);
        });

        byte[] stream = DynamicEasyExcelExportUtil.customerExportExcelFile(allHead, allData);
        // 写入zip
        FileUtils.writeToZip(zos, stream, "teacher_chat_log.xlsx");
    }

    private List<UserTeacherLog> findUserTeacherLogByUserIdListCourseIdList(List<Long> userIdList, List<String> courseIdList) {
        return getBaseMapper().findUserTeacherLogByUserIdListCourseIdList(userIdList, courseIdList.stream().map(Long::valueOf).collect(Collectors.toList()));
    }

    private static List<List<String>> initialiseHeader() {
        List<String> head1 = new ArrayList<>();
        head1.add("#");
        head1.add("user_id");
        head1.add("chat_text");
        head1.add("chat_time");
        head1.add("chat_role");
        head1.add("course_id");


        //封装头部
        List<List<String>> allHead = new ArrayList<>();
        allHead.add(head1);
        return allHead;
    }

    @Override
    public void exportTeacherChatLogToExcelByUserIdListAndCourseIdList(List<Long> userIdList, List<String> courseIdList, ZipOutputStream zos, int cutRow) throws IOException {
        ExcelBreaker excelBreaker = new ExcelBreaker(cutRow, "teacher_chat_log", initialiseHeader(), zos);

        userIdList.forEach(userId -> {
            courseIdList.forEach(courseId -> {
                List<UserTeacherLogVO> userTeacherLogVOList = findAllTeacherChatLogByUserId(userId, courseId);
                //封装数据体
                for (int k = 0; k < userTeacherLogVOList.size(); k++) {
                    UserTeacherLogVO userTeacherLog = userTeacherLogVOList.get(k);

                    List<Object> data = Lists.newArrayList((k+1),
                            userTeacherLog.getUserId(), userTeacherLog.getChatText(), userTeacherLog.getChatTime(),
                            userTeacherLog.getChatRole(), userTeacherLog.getCourseId()
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
    public void exportTeacherChatLogToExcelByUserIdListAndCourseIdList(List<Long> userIdList, List<String> courseIdList, int cutRows, String token, String dateString) throws IOException {
        ExcelBreaker excelBreaker = new ExcelBreaker(cutRows, "teacher_chat_log", initialiseHeader(), token, dateString);
        updateTypeCache(token, "teacher_chat_log", iGlobalCache);
        if(MyConstant.checkNumberOfInstance)
            iGlobalCache.hset(token, "num-total-rows", String.valueOf(getCountByUserIdsAndCourseIds(userIdList, courseIdList)));
        List<UserTeacherLog> userTeacherLogs = findUserTeacherLogByUserIdListCourseIdList(userIdList, courseIdList);

        userTeacherLogs.forEach(userTeacherLog -> {

            List<Object> data = Lists.newArrayList(excelBreaker.getAllData().size()+1,
                    userTeacherLog.getUserId(), userTeacherLog.getChatText(), userTeacherLog.getChatTime(),
                    userTeacherLog.getChatRole(), userTeacherLog.getCourseId()
            );
            excelBreaker.getAllData().add(data);
            // 2. 每次完成一次add data就increase
            excelBreaker.increaseCount(1);
            excelBreaker.tryUpdateCache(iGlobalCache);
            // 如果counter超过了cutRow，保存进zip
            excelBreaker.tryUpdateParamsAndSaveToExcel();
        });
        excelBreaker.saveExcelToFile();

//        userIdList.forEach(userId -> {
//            courseIdList.forEach(courseId -> {
//                List<UserTeacherLogVO> userTeacherLogVOList = findAllTeacherChatLogByUserId(userId, courseId);
//                //封装数据体
//                for (int k = 0; k < userTeacherLogVOList.size(); k++) {
//                    UserTeacherLogVO userTeacherLog = userTeacherLogVOList.get(k);
//
//                    List<Object> data = Lists.newArrayList((k+1),
//                            userTeacherLog.getUserId(), userTeacherLog.getChatText(), userTeacherLog.getChatTime(),
//                            userTeacherLog.getChatRole(), userTeacherLog.getCourseId()
//                    );
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
