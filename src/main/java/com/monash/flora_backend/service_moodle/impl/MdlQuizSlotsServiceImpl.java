package com.monash.flora_backend.service_moodle.impl;

import com.baomidou.dynamic.datasource.annotation.DS;
import com.monash.flora_backend.dao.entity.MdlQuizSlots;
import com.monash.flora_backend.dao.mapper.MdlQuizSlotsMapper;
import com.monash.flora_backend.service_moodle.IMdlQuizSlotsService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * Stores the question used in a quiz, with the order, and for  服务实现类
 * </p>
 *
 * @author xinyu
 * @since 2023-10-26
 */
@Service
@DS("slave_1")
public class MdlQuizSlotsServiceImpl extends ServiceImpl<MdlQuizSlotsMapper, MdlQuizSlots> implements IMdlQuizSlotsService {

}
