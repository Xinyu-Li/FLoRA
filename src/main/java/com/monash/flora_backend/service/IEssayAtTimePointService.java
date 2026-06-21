package com.monash.flora_backend.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.monash.flora_backend.controller.vo.EssayVO;
import com.monash.flora_backend.dao.entity.EssayAtTimePoint;

import java.util.List;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author xinyu
 * @since 2025-09-11
 */
public interface IEssayAtTimePointService extends IService<EssayAtTimePoint> {
    void saveEssayAtTimePoint(EssayVO essayVO);
    List<EssayAtTimePoint> getEssayAtTimePointByUserIdAndCourseId(Long userId, String courseId);
}
