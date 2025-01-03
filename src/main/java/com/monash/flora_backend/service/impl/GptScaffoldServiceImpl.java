package com.monash.flora_backend.service.impl;

import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.json.JSONArray;
import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.monash.flora_backend.config.cache.IGlobalCache;
import com.monash.flora_backend.constant.MyConstant;
import com.monash.flora_backend.controller.vo.GptScaffoldVO;
import com.monash.flora_backend.dao.entity.GptScaffold;
import com.monash.flora_backend.dao.mapper.GptScaffoldMapper;
import com.monash.flora_backend.service.IGptScaffoldService;
import com.monash.flora_backend.util.MyBeanCopyUtils;
import com.monash.flora_backend.util.MyUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import java.util.zip.ZipOutputStream;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author xinyu
 * @since 2024-01-15
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class GptScaffoldServiceImpl extends ServiceImpl<GptScaffoldMapper, GptScaffold> implements IGptScaffoldService {
    private final IGlobalCache iGlobalCache;
    private final RestTemplate restTemplate;

    @Override
    public List<GptScaffoldVO> findAllGptScaffoldByUserIdAndCourseId(Long userId, String courseId) {
//        log.info("into findAllChatgptLogByUserId**********");

        String key = MyConstant.REDIS_GPT_SCAFFOLD_LIST + userId + "-" + courseId;
        if (iGlobalCache.hasKey(key)) {
            List<String> objList = iGlobalCache.lGet(key, 0, -1);
            List<GptScaffoldVO> reverseList = new ArrayList<>();
//            objList.stream().map(obj -> JSON.parseObject(String.valueOf(obj), UserChatgptLogVO.class)).collect(Collectors.toList()).forEach(userChatgptLogVO -> reverseList.add(0, userChatgptLogVO));
            objList.stream().map(obj -> JSONUtil.toBean(obj, GptScaffoldVO.class)).collect(Collectors.toList()).forEach(userChatgptLogVO -> reverseList.add(0, userChatgptLogVO));
//            log.info(reverseList.size() + "============");
            return reverseList;
        } else {
            QueryWrapper<GptScaffold> queryWrapper = new QueryWrapper<>();
            queryWrapper.eq("user_id", userId).eq("course_id", courseId).orderByAsc("prompt_send_time");
            List<GptScaffoldVO> gptScaffoldVOList = MyBeanCopyUtils.copyBeanList(super.list(queryWrapper), GptScaffoldVO.class);
            if (CollUtil.isEmpty(gptScaffoldVOList)) {
                return new ArrayList<>();
            } else {
                // 放入redis
                iGlobalCache.lSetAll(key, gptScaffoldVOList.stream().map(JSONUtil::toJsonStr).collect(Collectors.toList()), MyConstant.REDIS_EXPIRE_SECONDS);
                return gptScaffoldVOList;
            }
        }
    }

    @Override
    public void rateGptScaffold(Long gptScaffoldId, Integer responseRatingStar, Integer responseRatingThumb, Long userId, String courseId) {
        GptScaffold gptScaffold = super.getById(gptScaffoldId);
        gptScaffold.setResponseRatingStar(responseRatingStar);
        gptScaffold.setResponseRatingThumb(responseRatingThumb);
        // update database
        super.updateById(gptScaffold);

        GptScaffoldVO gptScaffoldVO = MyBeanCopyUtils.copyBean(gptScaffold, GptScaffoldVO.class);
        // update redis
        String key = MyConstant.REDIS_GPT_SCAFFOLD_LIST + userId + "-" + courseId;
        if (iGlobalCache.hasKey(key)) {
            List<String> objects = iGlobalCache.lGet(key, 0, -1);
            int index = 0;
            boolean found = false;
            for (String object : objects) {

                GptScaffoldVO tempGptScaffoldVO = JSONUtil.toBean(object, GptScaffoldVO.class);
                if (Objects.equals(tempGptScaffoldVO.getId(), gptScaffoldId)) {
                    iGlobalCache.lUpdateIndex(key, index, JSONUtil.toJsonStr(gptScaffoldVO));
                    found = true;
                    break;
                }
                index++;
            }
            if (!found) {
                log.info("rateGptScaffold - -------------------Element not found in the list:" + key);
            }
        } else {
            log.info("rateGptScaffold - no records in redis, only update database");

        }
    }

    @Override
    public GptScaffoldVO createGptScaffold(String prompt, String essay, String gptResponseResult,  String promptSendTime, String gptResponseTime,
                                           String gptScaffoldRole, String gptScaffoldRoleDescription, Integer gptScaffoldNumber, Long userId, String courseId) {
        GptScaffold gptScaffold = new GptScaffold();

        if (Objects.equals("gpt-error", gptResponseResult) ||
                StrUtil.isEmpty(gptResponseResult) ||
                prompt.startsWith("no scaffold generated-----") ||
                prompt.startsWith("manually generated-----")) {
            gptScaffold.setGptScaffoldContent(gptResponseResult);

        } else {
            JSONObject jsonObject = JSONUtil.parseObj(gptResponseResult);
            JSONArray wholePrompt = jsonObject.getJSONArray("wholeprompt");
            JSONObject response = jsonObject.getJSONObject("response");
            gptScaffold.setGptScaffoldContent(response.getJSONArray("choices").getJSONObject(0).getJSONObject("message").getStr("content"));
            gptScaffold.setGptWholePrompt(wholePrompt.toString());
        }


        gptScaffold.setUserId(userId);
        gptScaffold.setCourseId(courseId);
        gptScaffold.setGptRoleDescription(gptScaffoldRoleDescription);
        gptScaffold.setPromptSendTime(promptSendTime);

        gptScaffold.setGptResponseTime(gptResponseTime);
        gptScaffold.setEssay(essay);
        gptScaffold.setResponseRatingStar(0); // 0 - no selection     1-5  - show stars
        gptScaffold.setResponseRatingThumb(0); // 0 - no selection     1 - thumb up      2 - thumb down
        gptScaffold.setGptRole(gptScaffoldRole);
        gptScaffold.setGptWholeResponse(gptResponseResult);
        gptScaffold.setGptScaffoldNumber(gptScaffoldNumber);
        gptScaffold.setPrompt(prompt);

        if (super.save(gptScaffold)) { //存储gpt scaffold to database
            GptScaffoldVO gptScaffoldVO = MyBeanCopyUtils.copyBean(gptScaffold, GptScaffoldVO.class);

            iGlobalCache.lSet(MyConstant.REDIS_GPT_SCAFFOLD_LIST + userId + "-" + courseId, JSONUtil.toJsonStr(gptScaffoldVO), MyConstant.REDIS_EXPIRE_SECONDS);

            return gptScaffoldVO;
        } else {
            return null;
        }
    }

    @Override
    public void removeByUserId(Long userId) {
        QueryWrapper<GptScaffold> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("user_id", userId);
        super.remove(queryWrapper);
    }

    @Override
    public GptScaffoldVO getGptScaffoldResponse(String prompt, String essay, List<String> backgroundFileNameList, String gptScaffoldRole, String gptScaffoldRoleDescription, Integer gptScaffoldNumber, Long userId, String courseId, List<Integer> gptScaffoldParameters) {

        String promptSendTime = MyUtils.getCurrentTimestamp();


        String url = MyConstant.CHAT_SERVICE_URL + MyConstant.CHAT_SERVICE_GPT_SCAFFOLD_URI;
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        //提交参数设置
        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.add("myusername", "testusername");
        map.add("mypassword", "testpassword");

        map.add("userId", String.valueOf(userId));
        map.add("courseId", courseId);

        map.add("gptScaffoldRole", gptScaffoldRole);
        map.add("gptScaffoldRoleDescription", gptScaffoldRoleDescription);
        map.add("prompt", prompt);
        map.add("gptScaffoldParameters", gptScaffoldParameters.stream().map(String::valueOf).collect(Collectors.joining(";;;")));

        if (!StrUtil.isEmpty(essay)) {
            map.add("essay", essay);
        }

        if (!CollUtil.isEmpty(backgroundFileNameList)) {
            map.add("backgroundFileNameList", String.join(";;;", backgroundFileNameList));  // 在 python 端进行拆分
        }


//        log.info("----------getChatgptResponse-----before send");
//        log.info(map.toString());
        // 组装请求体
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(map, headers);
        String result;
        try {
            result = restTemplate.postForObject(url, request, String.class);
        } catch (Exception e) {
            result = "gpt-error";
        }
//        log.info("----------getChatgptResponse-----result");
//        log.info("response result:" + result);

        String gptResponseTime = MyUtils.getCurrentTimestamp();

        return createGptScaffold(prompt, essay, result, promptSendTime, gptResponseTime,
                gptScaffoldRole, gptScaffoldRoleDescription, gptScaffoldNumber, userId, courseId);
    }

    @Override
    public void exportGptScaffoldToExcelByUserIdListAndCourseIdList(List<Long> userIdList, List<String> courseIdList, ZipOutputStream zos) throws IOException {

    }
}
