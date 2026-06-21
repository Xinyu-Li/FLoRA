package com.monash.flora_backend.util;

import com.monash.flora_backend.constant.MyConstant;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

/**
 * ClassName: MyUtils
 * Description:
 *
 * @author Xinyu Li
 * @since 4/16/2023 8:16 PM
 */
public class MyUtils {
    public static String convertTimestampToFormat(String timestamp) {
        // 将时间戳转换为 Instant
        Instant instant = Instant.ofEpochMilli(Long.parseLong(timestamp));

        // 将 Instant 转换为 ZonedDateTime，可以根据需要指定时区
        ZoneId zoneId = ZoneId.systemDefault(); // 使用系统默认时区
        ZonedDateTime zonedDateTime = ZonedDateTime.ofInstant(instant, zoneId);

        // 创建一个 DateTimeFormatter 以指定所需的时间格式
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.SSS");

        // 使用 formatter 格式化 ZonedDateTime
        return zonedDateTime.format(formatter);
    }

    public static String getCurrentTimestamp() {
        return String.valueOf(Instant.now().toEpochMilli());
    }

    /**
     *
     * @param courseId 通常设为空值
     * @param essay 文本
     * @param restTemplate 。。
     * @param uri 。。
     * @return
     */
    public static String sendHttpRequest(String courseId, String essay, RestTemplate restTemplate, String uri) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        //提交参数设置
        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();

        map.add("myusername", "testusername");
        map.add("mypassword", "testpassword");
        map.add("essay", essay);
        if ("".equals(courseId)) {
            courseId = "default";
        }
        map.add("courseId", courseId);
        // 组装请求体
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(map, headers);
        String url = MyConstant.CHAT_SERVICE_URL + uri;

        return restTemplate.postForObject(url, request, String.class);
    }




//    public static String getCourseId(String pageUrl) {
//        String pageId = "";
//
//        if (pageUrl.contains("?id=")) {
//            pageId = pageUrl.substring(pageUrl.indexOf("?id=") + 4);
//        }
//
//        //[['4', [8, 25]], ['6', [31, 48]], ['8', [68, 68]], ['9', [105, 105]], ['10', [95, 95]], ['11', [96, 96]], ['12', [97, 97]], ['13', [98, 98]], ['14', [99, 99]], ['15', [100, 100]], ['16', [101, 101]], ['17', [102, 102]], ['18', [103, 103]], ['19', [104, 104]]]
//        String resultCourseId = "";
//        Pattern pattern = Pattern.compile("\\d+', \\[\\d+, \\d+\\]");
//        Matcher matcher = pattern.matcher(MyMoodleConfigConstant.SERVER_ALL_COURSE_ID_AND_PAGE_START_END_ID);
//        while (matcher.find()) {
//            String[] temp = matcher.group().replace("'", "").replace("[","").replace("]", "").split(", ");
//            int startPageId = Integer.parseInt(temp[1]);
//            int endPageId = Integer.parseInt(temp[2]);
//            if (Integer.parseInt(pageId) >= startPageId && Integer.parseInt(pageId) < endPageId) {
//                resultCourseId = temp[0];
//                break;
//            }
//        }
//        return resultCourseId;
//    }
}
