package com.monash.flora_backend.service_moodle;

import com.baomidou.mybatisplus.extension.service.IService;
import com.monash.flora_backend.dao.entity.MdlConfigPlugins;

import java.util.List;
import java.util.Map;

/**
 * ClassName: IMdlConfigPluginsService
 * Description:
 *
 * @author Xinyu Li
 * @since 12/31/2022 1:17 PM
 */
public interface IMdlConfigPluginsService extends IService<MdlConfigPlugins> {
//    boolean updateGenericoDB(String name, String value);
//    void updateGenericoTemplate(int templateIndex, String templateBody, String studyName);
    Integer findTheLastEmptyTemplateIndex();

    void addNewGenericoTemplateMoodleDB(String genericoTemplateBody, String templateName, Integer latestIndex );
    void updateGenericoTemplateMoodleDB(Integer templateIndex, String genericoTemplateBody, String templateName);
    void deleteGenericoTemplateByIndex(Integer templateIndex);
//    String generateGenericoBody(ConfigToolsVO configToolsVO);
//    ConfigToolsVO convertTemplateStringToConfigToolVO(String templateString, Integer templateIndex);
//    List<ConfigToolsVO> findAllGenericoTemplate();

    Map<String, Map<String, String>> getAllGenericoTemplates();
}
