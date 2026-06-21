package com.monash.flora_backend.dao.mapper;

import com.monash.flora_backend.controller.vo.GenericoTemplateIdAndNameVO;
import com.monash.flora_backend.dao.entity.ConfigGenericoTemplate;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author xinyu
 * @since 2024-02-15
 */
public interface ConfigGenericoTemplateMapper extends BaseMapper<ConfigGenericoTemplate> {

    @Select("SELECT id, generico_template_name from config_generico_template")
    List<GenericoTemplateIdAndNameVO> findAllIdsAndNames();
}
