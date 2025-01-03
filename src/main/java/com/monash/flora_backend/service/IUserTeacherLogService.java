package com.monash.flora_backend.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.monash.flora_backend.controller.vo.UserTeacherLogVO;
import com.monash.flora_backend.dao.entity.UserTeacherLog;

import java.io.IOException;
import java.util.List;
import java.util.zip.ZipOutputStream;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author xinyu
 * @since 2023-04-17
 */
public interface IUserTeacherLogService extends IService<UserTeacherLog> {
    boolean removeByUserId(Long userId);
    boolean createUserTeacherLog(Long userId, String chatText, String chatTime, String chatRole, String courseId);
    List<UserTeacherLogVO> findAllTeacherChatLogByUserId(Long userId, String courseId);
    void exportTeacherChatLogToExcelByUserIdListAndCourseIdList(List<Long> userIdList, List<String> courseIdList, ZipOutputStream zos) throws IOException;
    void exportTeacherChatLogToExcelByUserIdListAndCourseIdList(List<Long> userIdList, List<String> courseIdList, ZipOutputStream zos, int cutRow) throws IOException;
    void exportTeacherChatLogToExcelByUserIdListAndCourseIdList(List<Long> userIdList, List<String> courseIdList, int cutRows, String token, String dateString) throws IOException;
}
