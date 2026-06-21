package com.monash.flora_backend.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.monash.flora_backend.controller.req.manage.AddUpdateToolsConfigVO;
import com.monash.flora_backend.controller.vo.GenericoTemplateIdAndNameVO;
import com.monash.flora_backend.dao.entity.ConfigGenericoTemplate;

import java.util.List;
import java.util.Map;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author xinyu
 * @since 2024-02-15
 */
public interface IConfigGenericoTemplateService extends IService<ConfigGenericoTemplate> {
    List<GenericoTemplateIdAndNameVO> findAllGenericoTemplateIdsAndNames();
    AddUpdateToolsConfigVO findGenericoTemplateById(Long id);
    void addNewGenericoTemplateFloraDB(AddUpdateToolsConfigVO request);

    void saveExistingConfigIntoFloraDB(Integer templateIndex, String genericoTemplateBody, String studyName);
    String generateGenericoBody(AddUpdateToolsConfigVO request);
    String generateGenericoBody(Long configGenericoTemplateId);

    void updateNewGenericoTemplateFloraDB(AddUpdateToolsConfigVO request);
    Integer deleteGenericoTemplateById(Long id);

}
