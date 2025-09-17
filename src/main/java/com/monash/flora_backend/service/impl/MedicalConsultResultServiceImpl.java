package com.monash.flora_backend.service.impl;

import com.monash.flora_backend.dao.entity.MedicalConsultResult;
import com.monash.flora_backend.dao.mapper.MedicalConsultResultMapper;
import com.monash.flora_backend.service.IMedicalConsultResultService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author xinyu
 * @since 2024-03-29
 */
@Service
public class MedicalConsultResultServiceImpl extends ServiceImpl<MedicalConsultResultMapper, MedicalConsultResult> implements IMedicalConsultResultService {
            @Override
            public boolean save(MedicalConsultResult medicalConsultResult) {
                return super.save(medicalConsultResult);
            }
}
