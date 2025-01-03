package com.monash.flora_backend.service_moodle.impl;

import com.baomidou.dynamic.datasource.annotation.DS;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.monash.flora_backend.dao.entity.MdlFeedbackValue;
import com.monash.flora_backend.dao.mapper.MdlFeedbackValueMapper;
import com.monash.flora_backend.service_moodle.IMdlFeedbackValueService;
import org.springframework.stereotype.Service;

/**
 * <p>
 * values of the completeds 服务实现类
 * </p>
 *
 * @author xinyu
 * @since 2023-09-29
 */
@Service
@DS("slave_1")
public class MdlFeedbackValueServiceImpl extends ServiceImpl<MdlFeedbackValueMapper, MdlFeedbackValue> implements IMdlFeedbackValueService {

//    @Override
//    public List<MdlFeedbackValueVO> feedbackValueTest() {
//        return getBaseMapper().findMdlFeedbackValueVO();
//    }
}
