package com.monash.flora_backend.service_moodle;

import com.baomidou.mybatisplus.extension.service.IService;
import com.monash.flora_backend.dao.entity.MdlConfig;

import java.util.List;
import java.util.Map;

/**
 * ClassName: IMdlConfigService
 * Description:
 *
 * @author Xinyu Li
 * @since 12/31/2022 1:17 PM
 */
public interface IMdlConfigService extends IService<MdlConfig> {
    boolean updateAdditionalHtml(String name, String value);

    void setupConfigValueForOnlineEnvironment(String websiteAddress, Map<String, String[]> courseIdModalContentMap, List<Long> courseIdList, List<String> studies);
}
