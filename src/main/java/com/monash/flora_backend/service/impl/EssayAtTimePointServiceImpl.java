package com.monash.flora_backend.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.monash.flora_backend.config.cache.IGlobalCache;
import com.monash.flora_backend.constant.MyConstant;
import com.monash.flora_backend.controller.vo.EssayVO;
import com.monash.flora_backend.dao.entity.EssayAtTimePoint;
import com.monash.flora_backend.dao.mapper.EssayAtTimePointMapper;
import com.monash.flora_backend.service.IEssayAtTimePointService;
import com.monash.flora_backend.util.MyBeanCopyUtils;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author xinyu
 * @since 2025-09-11
 */
@Service
@AllArgsConstructor
public class EssayAtTimePointServiceImpl extends ServiceImpl<EssayAtTimePointMapper, EssayAtTimePoint> implements IEssayAtTimePointService {
    private final IGlobalCache iGlobalCache;
    @Override
    public void saveEssayAtTimePoint(EssayVO essayVO) {
        EssayAtTimePoint essayAtTimePoint = MyBeanCopyUtils.copyBean(essayVO, EssayAtTimePoint.class);
        iGlobalCache.set(essayVO.getUserId() + "-" + essayVO.getCourseId() + "-essayAtTimePoint-" + essayVO.getTimePointDesc(), essayAtTimePoint.getEssayContent(), MyConstant.REDIS_EXPIRE_SECONDS);
        super.save(essayAtTimePoint);
    }

    @Override
    public List<EssayAtTimePoint> getEssayAtTimePointByUserIdAndCourseId(Long userId, String courseId) {
        QueryWrapper<EssayAtTimePoint> wrapper = new QueryWrapper<>();
        wrapper.eq("user_id", userId).eq("course_id", courseId);

        return super.list(wrapper);
    }
}
