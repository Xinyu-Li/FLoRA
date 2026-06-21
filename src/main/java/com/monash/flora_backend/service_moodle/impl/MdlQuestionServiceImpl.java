package com.monash.flora_backend.service_moodle.impl;

import com.baomidou.dynamic.datasource.annotation.DS;
import com.monash.flora_backend.dao.entity.MdlQuestion;
import com.monash.flora_backend.dao.mapper.MdlQuestionMapper;
import com.monash.flora_backend.service_moodle.IMdlQuestionService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * This table stores the definition of one version of a questio 服务实现类
 * </p>
 *
 * @author xinyu
 * @since 2023-10-26
 */
@Service
@DS("slave_1")
public class MdlQuestionServiceImpl extends ServiceImpl<MdlQuestionMapper, MdlQuestion> implements IMdlQuestionService {

}
