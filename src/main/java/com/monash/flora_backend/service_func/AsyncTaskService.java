package com.monash.flora_backend.service_func;

import com.monash.flora_backend.constant.MyMoodleConfigConstant;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.mail.internet.MimeMessage;
import java.io.File;
import java.io.IOException;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class AsyncTaskService {

    private final JavaMailSender mailSender;

    @Async("asyncPoolTaskExecutor")
    public void saveFile(MultipartFile uploadFile, Long userId, String courseId) {
        try {
            String fileName = UUID.randomUUID().toString() + ".mp4";
            File path = new File(MyMoodleConfigConstant.EXCEL_EXPORT_PATH + "/" + userId + "_" + courseId, fileName);
            if (!path.exists()) {
                boolean mkdirs = path.mkdirs();
                log.info("create folder for user:" + userId + "  " + mkdirs);
            }
            uploadFile.transferTo(path);
            log.info("## 保存文件成功，路径={}}", path.getPath());
        } catch (IOException e) {
            e.printStackTrace();
            log.info("## 保存文件失败，{}", e.getMessage());
        }
    }
    public void sendEmail(String to, String subject, String content) {
        log.info("sending to " + to);
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("xinyu.li1@monash.edu");
        message.setTo(to);
        message.setSubject(subject);
        message.setText(content);
        mailSender.send(message);
    }

    public void sendEmailWithFile(String to, String subject, String content, String pathToAttachment) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setFrom("xinyu.li1@monash.edu");
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(content, true);

//            File file = new File(pathToAttachment);
            FileSystemResource file = new FileSystemResource(new File(pathToAttachment));
            assert file.getFilename() != null;
            helper.addAttachment(file.getFilename(), file);

            mailSender.send(message);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    //    private final IGlobalCache globalCache;
//    private final ITraceDataService iTraceDataService;
//    private final IEssayService iEssayService;
//
//    /**
//     *
//     * @param key
//     * @param value
//     */
//    @SneakyThrows
//    @Async
//    @Override
//    public void saveKeyValueDataToRedis(String key, Object value) {
////        long result = globalCache.incr(key, 1);
////        String newKey = key;
////        log.info("key incr: " + result + "---key:" + newKey);
//        ObjectMapper objectMapper = new ObjectMapper();
//        globalCache.set(key, objectMapper.writeValueAsString(value));
//    }
//
//
//
//    @Override
//    public boolean saveTraceDataFromRedisToDb(String prefix) throws JsonProcessingException {
//
//        Set<String> keys = globalCache.getRedisTemplate().keys(prefix + "*");
//        if (keys == null) {
//            log.info(prefix + "-----keys null");
//            return false;
//        }
//        log.info(prefix + "-----keys size: " + keys.size());
//        if (keys.isEmpty()) {
//            return false;
//        }
//
//        ObjectMapper objectMapper = new ObjectMapper();
//        List<TraceDataVO> traceDataVOList = new ArrayList<>();
//        List redisResultList = globalCache.getRedisTemplate().opsForValue().multiGet(keys);
//
//        assert redisResultList != null;
//        for (Object temp : redisResultList) {
////            log.info(String.valueOf(temp));
////            log.info(objectMapper.readValue(String.valueOf(temp), TraceDataVO.class).toString());
//            //判断 trace data 是否是关于 instrumentation 工具，如果是，是否有首次使用，并且使用间隔小于3秒的
//
//            TraceDataVO traceDataVO = objectMapper.readValue(String.valueOf(temp), TraceDataVO.class);
//            log.info("----------------" + temp);
//
//            iTraceDataService.addSubActionLabelForToolEvents(traceDataVO, traceDataVOList);
//        }
//
//        boolean saveResult = iTraceDataService.saveBatch(traceDataVOList);
//
////
//        if (saveResult) {
//            globalCache.getRedisTemplate().delete(keys);
//        }
//
//        return saveResult;
////        return false;
//    }
//
//
//    @Override
//    public boolean saveTraceExtraDataFromRedisToDb(String prefix) throws JsonProcessingException {
//        Set<String> keys = globalCache.getRedisTemplate().keys(prefix + "*");
//        log.info(prefix + "------keys size: " + keys.size());
//        if (keys.isEmpty()) {
//            return false;
//        }
//        ObjectMapper objectMapper = new ObjectMapper();
//        List<TraceExtraDataVO> traceExtraDataVOList = new ArrayList<>();
//        List redisResultList = globalCache.getRedisTemplate().opsForValue().multiGet(keys);
//
//        assert redisResultList != null;
//        for (Object temp : redisResultList) {
//            traceExtraDataVOList.add(objectMapper.readValue(String.valueOf(temp), TraceExtraDataVO.class));
//        }
//        List<TraceData> traceDataList = new ArrayList<>();
//        for (TraceExtraDataVO traceExtraDataVO : traceExtraDataVOList) {
//
//            if (traceExtraDataVO.getMousemoveData() != null) {
//                traceExtraDataVO.getMousemoveData().forEach(s -> {
//                    if (!"".equals(s)) {
//                        TraceData traceData = MyBeanCopyUtils.copyBean(traceExtraDataVO, TraceData.class);
////                        log.info(s);
//                        String[] elements = s.split(":::");
//
//                        traceData.setSubActionLabel("NO_LABEL");
//                        traceData.setSaveTime(elements[6]);
//                        traceData.setPageEvent("MOUSE_MOVE");
//                        traceData.setTargetObject(elements[0]);
//                        traceData.setInstantEvent("NO_INSTANT_EVENT");
//
//                        traceData.setScreenX(elements[1]);
//                        traceData.setScreenY(elements[2]);
//                        traceData.setClientX(elements[3]);
//                        traceData.setClientY(elements[4]);
//
//                        traceData.setEventValue("");
//                        traceDataList.add(traceData);
//                    }
//                });
//            }
//
//            if (traceExtraDataVO.getMousewheelData() != null) {
//                traceExtraDataVO.getMousewheelData().forEach(s -> {
//                    TraceData traceData = MyBeanCopyUtils.copyBean(traceExtraDataVO, TraceData.class);
////                    log.info(traceData.toString());
//                    String[] elements = s.split(":::");
//                    traceData.setSubActionLabel("NO_LABEL");
//                    traceData.setSaveTime(elements[7]);
//                    traceData.setPageEvent("MOUSE_WHEEL");
//                    traceData.setTargetObject(elements[0]);
//                    traceData.setInstantEvent("NO_INSTANT_EVENT");
//
//                    traceData.setScreenX(elements[2]);
//                    traceData.setScreenY(elements[3]);
//                    traceData.setClientX(elements[4]);
//                    traceData.setClientY(elements[5]);
//
//                    traceData.setEventValue("SCROLL_DIST:::" + elements[1]);
//                    traceDataList.add(traceData);
//                });
//            }
//        }
//
//        boolean saveResult = iTraceDataService.saveBatch(traceDataList);
//        log.info("saveTraceExtraDataFromRedisToDb: " + saveResult);
//        if (saveResult) {
//            globalCache.getRedisTemplate().delete(keys);
//        }
//
//        return saveResult;
//    }
//
//
//    @Override
//    public boolean saveEssayDataFromRedisToDb(String prefix) throws JsonProcessingException {
//
//        Set<String> keys = globalCache.getRedisTemplate().keys(prefix + "*");
//        log.info(prefix + "-----keys size: " + keys.size());
//        if (keys.isEmpty()) {
//            return false;
//        }
//
//        ObjectMapper objectMapper = new ObjectMapper();
//        List<EssayVO> essayVOList = new ArrayList<>();
//        List redisResultList = globalCache.getRedisTemplate().opsForValue().multiGet(keys);
//
//        assert redisResultList != null;
//        for (Object temp : redisResultList) {
//            essayVOList.add(objectMapper.readValue(String.valueOf(temp), EssayVO.class));
//        }
//
//        boolean saveResult = iEssayService.saveBatch(essayVOList);
////
//        if (saveResult) {
//            globalCache.getRedisTemplate().delete(keys);
//        }
//
//        return saveResult;
//    }
}
