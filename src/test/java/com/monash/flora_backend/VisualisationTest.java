package com.monash.flora_backend;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.monash.flora_backend.controller.vo.TraceDataCleanPersonalVO;
import com.monash.flora_backend.dao.entity.UserChatgptLog;
import com.monash.flora_backend.service.ITraceDataService;
import com.monash.flora_backend.service.IUserChatgptLogService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

/**
 * @author Administrator
 * @date 1/15/2024
 */
public class VisualisationTest extends FLoRaBackendApplicationTests{

    @Autowired
    private ITraceDataService iTraceDataService;
    @Test
    public void testGetListReturnNull() {
        List<TraceDataCleanPersonalVO> outputData = iTraceDataService.getPersonalLevelData("%india%", "4");
        String i = "0";
    }
}
