package com.monash.flora_backend.service;

import com.monash.flora_backend.dao.entity.MedicalConsultResult;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author xinyu
 * @since 2024-03-29
 */
public interface IMedicalConsultResultService extends IService<MedicalConsultResult> {
        boolean save(MedicalConsultResult medicalConsultResult);
}
