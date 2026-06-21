package com.monash.flora_backend.service;

import com.monash.flora_backend.controller.vo.WholePageAnnotationVO;
import com.monash.flora_backend.dao.entity.WholePageAnnotation;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author xinyu
 * @since 2022-10-05
 */
public interface IWholePageAnnotationService extends IService<WholePageAnnotation> {

    WholePageAnnotationVO findByUserIdAndUrlAndLatestSaveTime(Long userId, String url);
    boolean removeByUserId(Long userId);
}
