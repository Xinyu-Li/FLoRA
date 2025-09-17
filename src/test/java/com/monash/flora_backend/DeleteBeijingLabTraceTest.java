package com.monash.flora_backend;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.monash.flora_backend.config.cache.IGlobalCache;
import com.monash.flora_backend.dao.entity.MdlUser;
import com.monash.flora_backend.service_moodle.IMdlUserService;
import com.monash.flora_backend.service.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Arrays;
import java.util.List;

/**
 * ClassName: DeleteBeijingLabTraceTest
 * Description:
 *
 * @author Xinyu Li
 * @since 6/6/2023 11:18 PM
 */
public class DeleteBeijingLabTraceTest extends FLoRaBackendApplicationTests{
    @Autowired
    private IAnnotationService iAnnotationService;
    @Autowired
    private IDeletedAnnotationService iDeletedAnnotationService;
    @Autowired
    private IEssayService iEssayService;
    @Autowired
    private IPlannerService iPlannerService;
    @Autowired
    private ITraceDataService iTraceDataService;
    @Autowired
    private IWholePageAnnotationService iWholePageAnnotationService;
    @Autowired
    private IGlobalCache iGlobalCache;
    @Autowired
    private IUserStartTimeService iUserStartTimeService;
    @Autowired
    private IScaffoldService iScaffoldService;
    @Autowired
    private IUserChatgptLogService iUserChatgptLogService;
    @Autowired
    private IUserTeacherLogService iUserTeacherLogService;
    @Autowired
    private IMdlUserService iMdlUserService;
    @Test
    public void delete() {
        QueryWrapper<MdlUser> queryWrapper = new QueryWrapper<>();
        queryWrapper.likeRight("username", "pku-lab1-2023");

        List<MdlUser> list = iMdlUserService.list(queryWrapper);
        list.forEach(mdlUser -> {
            System.out.println(mdlUser.toString());
        });


//        //删除数据库 //删除elasticsearch
//        iAnnotationService.removeByUserId(userId);
//        iDeletedAnnotationService.removeByUserId(userId);
//        iEssayService.removeByUserId(userId);
//        iPlannerService.removeByUserId(userId);
//
//        iScaffoldService.removeByUserId(userId);
//        iTraceDataService.removeByUserId(userId);
//        iUserChatgptLogService.removeByUserId(userId);
//        iUserTeacherLogService.removeByUserId(userId);
//        iUserStartTimeService.removeByUserId(userId);
//        iWholePageAnnotationService.removeByUserId(userId);
//
//        List<String> redisKeyList = List.of(MyConstant.REDIS_SCAFFOLD_INFO + userId,
//                MyConstant.REDIS_GPT_CHAT_LOG_LIST + userId, MyConstant.REDIS_ACTION_LABEL_LIST + userId,
//                MyConstant.REDIS_TEACHER_CHAT_LOG_LIST + userId);
//        redisKeyList.forEach(key -> {
//            if (iGlobalCache.hasKey(key)) {
//                iGlobalCache.del(key);
//            }
//        });

    }

    @Test
    public void test() {
        System.out.println(Arrays.toString("".split(";;;")));
    }
}
