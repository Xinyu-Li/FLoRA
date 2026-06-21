package com.monash.flora_backend.service;

import com.monash.flora_backend.dao.entity.DeletedAnnotation;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author xinyu
 * @since 2022-10-20
 */
public interface IDeletedAnnotationService extends IService<DeletedAnnotation> {
    boolean removeByUserId(Long userId);

    void exportDeletedAnnotationToExcel();
}
