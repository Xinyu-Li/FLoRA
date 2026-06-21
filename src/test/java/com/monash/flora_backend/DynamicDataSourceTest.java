package com.monash.flora_backend;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.monash.flora_backend.dao.entity.MdlConfig;
import com.monash.flora_backend.dao.entity.MdlConfigPlugins;
import com.monash.flora_backend.dao.entity.Planner;
import com.monash.flora_backend.service_moodle.IMdlConfigPluginsService;
import com.monash.flora_backend.service_moodle.IMdlConfigService;
import com.monash.flora_backend.service.IPlannerService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

/**
 * ClassName: DynamicDataSourceTest
 * Description:
 *
 * @author Xinyu Li
 * @since 12/31/2022 1:16 PM
 */
public class DynamicDataSourceTest extends FLoRaBackendApplicationTests{

    @Autowired
    private IMdlConfigService iMdlConfigService;
    @Autowired
    private IMdlConfigPluginsService iMdlConfigPluginsService;

    @Autowired
    private IPlannerService iPlannerService;

    @Test
    public void testGetData() {
        QueryWrapper<MdlConfig> queryWrapper1 = new QueryWrapper<>();
        queryWrapper1.like("name", "%additionalhtml%");
        List<MdlConfig> mdlConfigList = iMdlConfigService.list(queryWrapper1);

        QueryWrapper<MdlConfigPlugins> queryWrapper2 = new QueryWrapper<>();
        queryWrapper2.eq("plugin", "filter_generico");
        List<MdlConfigPlugins> mdlConfigPluginsList = iMdlConfigPluginsService.list(queryWrapper2);

        System.out.println(mdlConfigList);
        System.out.println("-----------------------");
        System.out.println(mdlConfigPluginsList);

        List<Planner> plannerList = iPlannerService.list();
        System.out.println(plannerList);
    }

    @Test
    public void testUpdateMoodleConfig() {
//        iMdlConfigService.updateAdditionalHtml(MyMoodleConfigConstant.MDL_CONFIG_ADDITIONAL_HTML_FOOTER_ATTR_NAME, MyMoodleConfigConstant.MDL_CONFIG_ADDITIONAL_HTML_FOOTER);
//        iMdlConfigPluginsService.updateGenericoTemplate(MyMoodleConfigConstant.MDL_CONFIG_PLUGINS_GENERICO_ATTR_PLUGIN, MyMoodleConfigConstant.MDL_CONFIG_PLUGINS_GENERICO_TEMPLATE_2_ATTR_NAME, MyMoodleConfigConstant.MDL_CONFIG_PLUGINS_GENERICO_TEMPLATE_2_BODY);
    }
}
