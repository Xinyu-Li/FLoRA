package com.monash.flora_backend.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.monash.flora_backend.dao.entity.ConfigAnnotationLabelColor;
import com.monash.flora_backend.dao.mapper.ConfigAnnotationLabelColorMapper;
import com.monash.flora_backend.service.IConfigAnnotationLabelColorService;
import org.springframework.stereotype.Service;

/**
 * @author Xinyu Li
 * @date 2/19/2024
 */
@Service
public class ConfigAnnotationLabelColorServiceImpl extends ServiceImpl<ConfigAnnotationLabelColorMapper, ConfigAnnotationLabelColor> implements IConfigAnnotationLabelColorService {
}
