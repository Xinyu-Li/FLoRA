//package com.monash.flora_backend.service;
//
//import com.baomidou.mybatisplus.extension.service.IService;
//import com.monash.flora_backend.controller.vo.TraceDataCleanAllActionVO;
//import com.monash.flora_backend.controller.vo.TraceDataCleanAllSubActionVO;
//import com.monash.flora_backend.controller.vo.TraceDataCleanGroupVO;
//import com.monash.flora_backend.controller.vo.TraceDataCleanPersonalVO;
//import com.monash.flora_backend.controller.vo.TraceDataCleanTimelineVO;
//import com.monash.flora_backend.controller.vo.TraceDataCleanVO;
//import com.monash.flora_backend.dao.entity.TraceDataClean;
//
//import java.util.List;
//
///**
// * <p>
// *  服务类
// * </p>
// *
// * @author xinyu
// * @since 2022-10-18
// */
//public interface ITraceDataCleanService extends IService<TraceDataClean> {
//
//
//    List<TraceDataCleanTimelineVO> getTimelineSubActionData(String courseId);
//
//    List<TraceDataCleanTimelineVO> getTimelineActionData(List<String> groups, String courseId);
//
//    List<TraceDataCleanPersonalVO> getPersonalLevelData(List<String> groups, String courseId);
//
//    List<TraceDataCleanGroupVO> getGroupLevelData(String courseId);
//
//    List<TraceDataCleanAllActionVO> getAllLevelAction(String courseId);
//
//    List<TraceDataCleanAllSubActionVO> getAllLevelSubAction(String courseId);
//
//}
