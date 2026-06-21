package com.monash.flora_backend.service_moodle.impl;

import com.baomidou.dynamic.datasource.annotation.DS;
import com.monash.flora_backend.dao.entity.MdlQuestionAttempts;
import com.monash.flora_backend.dao.mapper.MdlQuestionAttemptsMapper;
import com.monash.flora_backend.service_moodle.IMdlQuestionAttemptsService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * Each row here corresponds to an attempt at one question, as  服务实现类
 * </p>
 *
 * @author xinyu
 * @since 2023-10-26
 */
@Service
@DS("slave_1")
public class MdlQuestionAttemptsServiceImpl extends ServiceImpl<MdlQuestionAttemptsMapper, MdlQuestionAttempts> implements IMdlQuestionAttemptsService {

}
