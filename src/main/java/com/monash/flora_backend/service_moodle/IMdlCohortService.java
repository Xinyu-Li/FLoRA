package com.monash.flora_backend.service_moodle;

import com.monash.flora_backend.dao.entity.MdlCohort;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * <p>
 * Each record represents one cohort (aka site-wide group). 服务类
 * </p>
 *
 * @author xinyu
 * @since 2023-04-18
 */
public interface IMdlCohortService extends IService<MdlCohort> {
    MdlCohort findByCohortIdNumber(String cohortIdNumber);

}
