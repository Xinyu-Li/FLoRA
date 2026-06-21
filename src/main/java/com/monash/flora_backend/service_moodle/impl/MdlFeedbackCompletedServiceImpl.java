package com.monash.flora_backend.service_moodle.impl;

import com.baomidou.dynamic.datasource.annotation.DS;
import com.monash.flora_backend.dao.entity.MdlFeedbackCompleted;
import com.monash.flora_backend.dao.mapper.MdlFeedbackCompletedMapper;
import com.monash.flora_backend.service_moodle.IMdlFeedbackCompletedService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * filled out feedback 服务实现类
 * </p>
 *
 * @author xinyu
 * @since 2023-09-29
 */
@Service
@DS("slave_1")
public class MdlFeedbackCompletedServiceImpl extends ServiceImpl<MdlFeedbackCompletedMapper, MdlFeedbackCompleted> implements IMdlFeedbackCompletedService {

}
