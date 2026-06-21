package com.monash.flora_backend.service_moodle.impl;

import com.baomidou.dynamic.datasource.annotation.DS;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.monash.flora_backend.dao.entity.MdlFeedbackItem;
import com.monash.flora_backend.dao.mapper.MdlFeedbackItemMapper;
import com.monash.flora_backend.service_moodle.IMdlFeedbackItemService;
import org.springframework.stereotype.Service;

/**
 * <p>
 * feedback_items 服务实现类
 * </p>
 *
 * @author xinyu
 * @since 2023-09-29
 */
@Service
@DS("slave_1")
public class MdlFeedbackItemServiceImpl extends ServiceImpl<MdlFeedbackItemMapper, MdlFeedbackItem> implements IMdlFeedbackItemService {

}
