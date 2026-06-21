package com.monash.flora_backend.service;

import com.monash.flora_backend.controller.vo.UserStartTimeVO;
import com.monash.flora_backend.dao.entity.UserStartTime;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author xinyu
 * @since 2023-02-23
 */
public interface IUserStartTimeService extends IService<UserStartTime> {
    UserStartTimeVO findByUserIdAndCourseId(Long userId, String courseId);

    boolean saveOrUpdate(UserStartTimeVO userStartTimeVO);

    boolean removeByUserId(Long userId);

    void saveStartTimeToRedis(String key, String startTime);
    String getStartTimeFromRedis(String key);

    String getTaskStartTimeByUserIdAndCourseId(Long userId, String courseId);
}
