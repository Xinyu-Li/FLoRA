package com.monash.flora_backend;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.monash.flora_backend.dao.entity.UserChatgptLog;
import com.monash.flora_backend.service.IUserChatgptLogService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Arrays;
import java.util.List;

/**
 * @author Administrator
 * @date 1/15/2024
 */
public class UserChatgptLogServiceTest extends FLoRaBackendApplicationTests{

    @Autowired
    private IUserChatgptLogService iUserChatgptLogService;
    @Test
    public void testGetListReturnNull() {
        QueryWrapper<UserChatgptLog> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("prompt_id", "123123");
        List<UserChatgptLog> userChatgptLogList = iUserChatgptLogService.list(queryWrapper);  //如果找不到的话 返回空list

        System.out.println(userChatgptLogList == null);
        System.out.println(userChatgptLogList.size());
    }

    @Test
    public void testGetCopesDirectResult() {
        List<List<String>> writingSentenceClassification = iUserChatgptLogService.batchWritingSentenceClassification(List.of("Artificial intelligence helps with predictions. It can identify objects. Robots can support learning."));
        writingSentenceClassification.forEach(System.out::println);
    }

    @Test
    public void testGet() {
        System.out.println(Arrays.toString("testGet:::".split(":::")));
    }
}
