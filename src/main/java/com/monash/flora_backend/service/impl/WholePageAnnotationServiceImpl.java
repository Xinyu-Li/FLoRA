package com.monash.flora_backend.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.monash.flora_backend.controller.vo.WholePageAnnotationVO;
import com.monash.flora_backend.dao.entity.Planner;
import com.monash.flora_backend.dao.entity.WholePageAnnotation;
import com.monash.flora_backend.dao.mapper.WholePageAnnotationMapper;
import com.monash.flora_backend.service.IWholePageAnnotationService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.monash.flora_backend.util.MyBeanCopyUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author xinyu
 * @since 2022-10-05
 */
@Service
public class WholePageAnnotationServiceImpl extends ServiceImpl<WholePageAnnotationMapper, WholePageAnnotation> implements IWholePageAnnotationService {

    @Override
    public WholePageAnnotationVO findByUserIdAndUrlAndLatestSaveTime(Long userId, String url) {
        QueryWrapper<WholePageAnnotation> wrapper = new QueryWrapper<>();
        wrapper.eq("user_id", userId).eq("url", url).orderByDesc("save_time");

        List<WholePageAnnotation> wholePageAnnotationList = super.list(wrapper);
        if (wholePageAnnotationList.isEmpty()) {
            return null;
        } else {
            return MyBeanCopyUtils.copyBean(wholePageAnnotationList.get(0), WholePageAnnotationVO.class);
        }
    }

    @Override
    public boolean removeByUserId(Long userId) {
        QueryWrapper<WholePageAnnotation> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("user_id", userId);
        return super.remove(queryWrapper);
    }
}
