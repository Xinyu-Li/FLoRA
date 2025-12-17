package com.monash.flora_backend;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.monash.flora_backend.controller.vo.TraceDataCleanGroupVO;
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
        List<TraceDataCleanPersonalVO> outputData = iTraceDataService.getPersonalLevelData("17", 45 *60*1000, "%oulu%");
        String i = "0";
    }
    @Test
    public void testGetGroupData() {
        List<TraceDataCleanGroupVO> outputData = iTraceDataService.getGroupLevelData("4", 30 *60*1000, "%oulu%");
        String i = "0";
    }
}
