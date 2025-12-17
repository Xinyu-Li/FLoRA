package com.monash.flora_backend.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.monash.flora_backend.config.cache.IGlobalCache;
import com.monash.flora_backend.constant.MyConstant;
import com.monash.flora_backend.controller.vo.UserStartTimeVO;
import com.monash.flora_backend.dao.entity.UserStartTime;
import com.monash.flora_backend.dao.mapper.UserStartTimeMapper;
import com.monash.flora_backend.service.IUserStartTimeService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.monash.flora_backend.util.MyBeanCopyUtils;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author xinyu
 * @since 2023-02-23
 */
@Slf4j
@Service
@AllArgsConstructor
public class UserStartTimeServiceImpl extends ServiceImpl<UserStartTimeMapper, UserStartTime> implements IUserStartTimeService {
    private IGlobalCache iGlobalCache;

    //TODO 需要重构代码 修复冗余部分 查找所有Get essay task start time
    @Override
    public String getTaskStartTimeByUserIdAndCourseId(Long userId, String courseId) {
        String startTimeFromRedis = this.getStartTimeFromRedis(MyConstant.REDIS_TASK_START_TIME + userId + "-" + courseId);
        if (startTimeFromRedis == null) {
            QueryWrapper<UserStartTime> queryWrapper = new QueryWrapper<>();
            queryWrapper.eq("user_id", userId).eq("course_id", courseId).last("limit 1");
            UserStartTime one = super.getOne(queryWrapper);
            if (one == null) {
                return "0";
            } else {
                return one.getUserStartTime();
            }
        } else {
            return startTimeFromRedis;
        }
    }

    @Override
    public UserStartTimeVO findByUserIdAndCourseId(Long userId, String courseId) {
        QueryWrapper<UserStartTime> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("user_id", userId).eq("course_id", courseId).orderByDesc("user_start_time").last("limit 1");
        UserStartTime one = super.getOne(queryWrapper);
        if (one == null) {
            return null;
        } else {
            return MyBeanCopyUtils.copyBean(one, UserStartTimeVO.class);
        }
    }

    @Override
    public boolean saveOrUpdate(UserStartTimeVO userStartTimeVO) {
        QueryWrapper<UserStartTime> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("user_id", userStartTimeVO.getUserId()).last("limit 1");
        UserStartTime one = super.getOne(queryWrapper);
        if (one == null) {
            return super.save(MyBeanCopyUtils.copyBean(userStartTimeVO, UserStartTime.class));
        } else {
            one.setUserStartTime(userStartTimeVO.getUserStartTime());
            return super.updateById(one);
        }
    }

    @Override
    public boolean removeByUserId(Long userId) {
        QueryWrapper<UserStartTime> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("user_id", userId);
        return super.remove(queryWrapper);
    }

    @Override
    public void saveStartTimeToRedis(String key, String startTime) {
        iGlobalCache.set(key, startTime, MyConstant.REDIS_EXPIRE_SECONDS);
    }

    @Override
    public String getStartTimeFromRedis(String key) {
        if (iGlobalCache.hasKey(key)) {
            log.info("has key:" + key);
            return iGlobalCache.get(key).toString();
        } else {
            return null;
        }
    }
}
