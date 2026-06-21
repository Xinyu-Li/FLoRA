//package com.monash.flora_backend.service.impl;
//
//import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
//import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
//import com.monash.flora_backend.controller.vo.TraceDataCleanAllActionVO;
//import com.monash.flora_backend.controller.vo.TraceDataCleanAllSubActionVO;
//import com.monash.flora_backend.controller.vo.TraceDataCleanGroupVO;
//import com.monash.flora_backend.controller.vo.TraceDataCleanPersonalVO;
//import com.monash.flora_backend.controller.vo.TraceDataCleanTimelineVO;
//import com.monash.flora_backend.controller.vo.TraceDataCleanVO;
//import com.monash.flora_backend.dao.entity.TraceDataClean;
//import com.monash.flora_backend.dao.mapper.TraceDataCleanMapper;
//import com.monash.flora_backend.service.ITraceDataCleanService;
//import com.monash.flora_backend.util.MyBeanCopyUtils;
//import lombok.AllArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.stereotype.Service;
//
//import java.util.*;
//
///**
// * <p>
// *  服务实现类
// * </p>
// *
// * @author xinyu
// * @since 2022-10-18
// */
//@Slf4j
//@Service
//@AllArgsConstructor
//public class TraceDataCleanServiceImpl extends ServiceImpl<TraceDataCleanMapper, TraceDataClean> implements ITraceDataCleanService {
//
//    @Override
//    public List<TraceDataCleanTimelineVO> getTimelineSubActionData(String courseId) {
//        QueryWrapper<TraceDataClean> queryWrapper = new QueryWrapper<>();
//
//        List<String> groups = new ArrayList<String>();
//        groups.add("ai");
//        groups.add("cl");
//        groups.add("he");
//        groups.add("cn");
//
//        log.info("Fetching timeline subaction data with courseId: {}", courseId);
//        queryWrapper.eq("course_id", courseId)
//                .in("RIGHT(username, 2)", groups);
//
//       List<TraceDataClean> data = super.list(queryWrapper); // 假设super.list() 返回TraceDataClean的列表
//
//        Map<String, List<TraceDataClean>> groupedData = new HashMap<>();
//        // 按用户名分组数据
//        for (TraceDataClean item : data) {
//            groupedData.computeIfAbsent(item.getUsername(), k -> new ArrayList<>()).add(item);
//        }
//
//        List<TraceDataCleanTimelineVO> result = new ArrayList<>();
//        // 对每个用户名进行相同的合并逻辑
//        for (Map.Entry<String, List<TraceDataClean>> entry : groupedData.entrySet()) {
//            List<TraceDataClean> userData = entry.getValue();
//            TraceDataClean firstItem = userData.get(0);
//            String currentEvent = firstItem.getActionLabel();
//            String startTime = firstItem.getTime();
//            String currentSubAction = firstItem.getSubActionLabel();
//
//            for (int i = 1; i < userData.size(); i++) {
//                TraceDataClean currentItem = userData.get(i);
//                TraceDataClean previousItem = userData.get(i - 1);
//                if (!currentItem.getSubActionLabel().equals(currentSubAction) && !currentItem.getSubActionLabel().isEmpty()) {
//                    if ("12".equals(currentItem.getCourseId()) && "10".equals(previousItem.getCourseId())) {
//                        result.add(createVO(currentEvent, startTime, String.valueOf(Long.parseLong(startTime) + 10), currentSubAction, entry.getKey(), previousItem.getCourseId()));
//                    } else {
//                        result.add(createVO(currentEvent, startTime, currentItem.getTime(), currentSubAction, entry.getKey(), previousItem.getCourseId()));
//                    }
//                    currentEvent = currentItem.getActionLabel();
//                    startTime = currentItem.getTime();
//                    currentSubAction = currentItem.getSubActionLabel();
//                }
//            }
//
//            // 添加最后一个事件
//            TraceDataClean lastItem = userData.get(userData.size() - 1);
//            result.add(createVO(currentEvent, startTime, String.valueOf(Long.parseLong(startTime) + 10), currentSubAction, entry.getKey(), lastItem.getCourseId()));
//        }
//
//        return result;
//    }
//
//    @Override
//    public List<TraceDataCleanTimelineVO> getTimelineActionData(List<String> groups, String courseId) {
//        QueryWrapper<TraceDataClean> queryWrapper = new QueryWrapper<>();
//
//        log.info("Fetching timeline data with group: {} and courseId: {}", groups, courseId);
//        queryWrapper.eq("course_id", courseId)
//                .in("RIGHT(username, 2)", groups);
//
//        List<TraceDataClean> data = super.list(queryWrapper); // 假设super.list() 返回TraceDataClean的列表
//
//        Map<String, List<TraceDataClean>> groupedData = new HashMap<>();
//        // 按用户名分组数据
//        for (TraceDataClean item : data) {
//            groupedData.computeIfAbsent(item.getUsername(), k -> new ArrayList<>()).add(item);
//        }
//
//        List<TraceDataCleanTimelineVO> result = new ArrayList<>();
//        // 对每个用户名进行相同的合并逻辑
//        for (Map.Entry<String, List<TraceDataClean>> entry : groupedData.entrySet()) {
//            List<TraceDataClean> userData = entry.getValue();
//            TraceDataClean firstItem = userData.get(0);
//            String currentEvent = firstItem.getActionLabel();
//            String startTime = firstItem.getTime();
//            String currentSubAction = firstItem.getSubActionLabel();
//
//            for (int i = 1; i < userData.size(); i++) {
//                TraceDataClean currentItem = userData.get(i);
//                TraceDataClean previousItem = userData.get(i - 1);
//                if (!currentItem.getActionLabel().equals(currentEvent) && !currentItem.getActionLabel().isEmpty()) {
//                    if ("12".equals(currentItem.getCourseId()) && "10".equals(previousItem.getCourseId())) {
//                        result.add(createVO(currentEvent, startTime, String.valueOf(Long.parseLong(startTime) + 10), currentSubAction, entry.getKey(), previousItem.getCourseId()));
//                    } else {
//                        result.add(createVO(currentEvent, startTime, currentItem.getTime(), currentSubAction, entry.getKey(), previousItem.getCourseId()));
//                    }
//                    currentEvent = currentItem.getActionLabel();
//                    startTime = currentItem.getTime();
//                    currentSubAction = currentItem.getSubActionLabel();
//                }
//            }
//
//            // 添加最后一个事件
//            TraceDataClean lastItem = userData.get(userData.size() - 1);
//            result.add(createVO(currentEvent, startTime, String.valueOf(Long.parseLong(startTime) + 10), currentSubAction, entry.getKey(), lastItem.getCourseId()));
//        }
//
//        return result;
//    }
//
//    private TraceDataCleanTimelineVO createVO(String action, String start, String end, String subAction, String username, String courseId) {
//        TraceDataCleanTimelineVO vo = new TraceDataCleanTimelineVO();
//        vo.setAction(action);
//        vo.setStart(Long.parseLong(start));
//        vo.setEnd(Long.parseLong(end));
//        vo.setSubAction(subAction);
//        vo.setUsername(username);
//        vo.setGroup(username.substring(username.length() - 2));
//        vo.setCourseId(courseId);
//        return vo;
//    }
//
//    @Override
//    public List<TraceDataCleanPersonalVO> getPersonalLevelData(List<String> groups, String courseId) {
//
//        List<TraceDataCleanTimelineVO> timelineData = getTimelineActionData(groups, courseId);
//
//        List<TraceDataCleanPersonalVO> result = new ArrayList<>();
//
//        for (TraceDataCleanTimelineVO item : timelineData) {
//            int duration = item.getEnd().intValue() - item.getStart().intValue() + 1;
//
//            TraceDataCleanPersonalVO existingEntry = result.stream()
//                .filter(entry -> entry.getUsername().equals(item.getUsername())
//                        && entry.getCourseId().equals(item.getCourseId())
//                        && entry.getAction().equals(item.getAction()))
//                .findFirst()
//                .orElse(null);
//
//            if (existingEntry != null) {
//                existingEntry.setDuration(existingEntry.getDuration().intValue() + duration);
//            } else {
//                TraceDataCleanPersonalVO newItem = new TraceDataCleanPersonalVO();
//                newItem.setAction(item.getAction());
//                newItem.setDuration(duration);
//                newItem.setUsername(item.getUsername());
//                newItem.setGroup(item.getGroup());
//                newItem.setCourseId(item.getCourseId());
//                result.add(newItem);
//            }
//        }
//
//        return result;
//    }
//
//    @Override
//    public List<TraceDataCleanGroupVO> getGroupLevelData(String courseId) {
//        List<String> groups = new ArrayList<String>();
//        groups.add("ai");
//        groups.add("cl");
//        groups.add("he");
//        groups.add("cn");
//        List<TraceDataCleanTimelineVO> timelineData = getTimelineActionData(groups, courseId);
//
//        List<TraceDataCleanGroupVO> result = new ArrayList<>();
//
//        for (TraceDataCleanTimelineVO item : timelineData) {
//            int duration = item.getEnd().intValue() - item.getStart().intValue() + 1;
//
//            TraceDataCleanGroupVO existingEntry = result.stream()
//                    .filter(entry -> entry.getGroup().equals(item.getGroup())
//                            && entry.getCourseId().equals(item.getCourseId())
//                            && entry.getAction().equals(item.getAction()))
//                    .findFirst()
//                    .orElse(null);
//
//
//
//            if (existingEntry != null) {
//                existingEntry.setDuration(existingEntry.getDuration().intValue() + duration);
//            } else {
//                TraceDataCleanGroupVO newItem = new TraceDataCleanGroupVO();
//                newItem.setAction(item.getAction());
//                newItem.setDuration(duration);
//                newItem.setGroup(item.getGroup());
//                newItem.setCourseId(item.getCourseId());
//
//                result.add(newItem);
//            }
//        }
//
//        return result;
//    }
//
//    @Override
//    public List<TraceDataCleanAllActionVO> getAllLevelAction(String courseId) {
//        List<String> groups = new ArrayList<String>();
//        groups.add("ai");
//        groups.add("cl");
//        groups.add("he");
//        groups.add("cn");
//        List<TraceDataCleanTimelineVO> timelineData = getTimelineActionData(groups, courseId);
//
//        List<TraceDataCleanAllActionVO> result = new ArrayList<>();
//
//        for (TraceDataCleanTimelineVO item : timelineData) {
//            int duration = item.getEnd().intValue() - item.getStart().intValue() + 1;
//
//            TraceDataCleanAllActionVO existingEntry = result.stream()
//                    .filter(entry -> entry.getCourseId().equals(item.getCourseId())
//                            && entry.getAction().equals(item.getAction()))
//                    .findFirst()
//                    .orElse(null);
//
//            if (existingEntry != null) {
//                existingEntry.setDuration(existingEntry.getDuration().intValue() + duration);
//            } else {
//                TraceDataCleanAllActionVO newItem = new TraceDataCleanAllActionVO();
//                newItem.setAction(item.getAction());
//                newItem.setDuration(duration);
//                newItem.setCourseId(item.getCourseId());
//                result.add(newItem);
//            }
//        }
//
//        return result;
//    }
//
//    @Override
//    public List<TraceDataCleanAllSubActionVO> getAllLevelSubAction(String courseId) {
//        List<TraceDataCleanTimelineVO> timelineData = getTimelineSubActionData(courseId);
//
//        List<TraceDataCleanAllSubActionVO> result = new ArrayList<>();
//
//        for (TraceDataCleanTimelineVO item : timelineData) {
//            int duration = item.getEnd().intValue() - item.getStart().intValue() + 1;
//
//            TraceDataCleanAllSubActionVO existingEntry = result.stream()
//                    .filter(entry -> entry.getCourseId().equals(item.getCourseId())
//                            && entry.getSubAction().equals(item.getSubAction()))
//                    .findFirst()
//                    .orElse(null);
//
//            if (existingEntry != null) {
//                existingEntry.setDuration(existingEntry.getDuration().intValue() + duration);
//            } else {
//                TraceDataCleanAllSubActionVO newItem = new TraceDataCleanAllSubActionVO();
//                newItem.setAction(item.getAction());
//                newItem.setSubAction(item.getSubAction());
//                newItem.setDuration(duration);
//                newItem.setCourseId(item.getCourseId());
//                result.add(newItem);
//            }
//        }
//
//        return result;
//
//    }
//
//}
