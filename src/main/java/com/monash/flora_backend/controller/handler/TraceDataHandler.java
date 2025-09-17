package com.monash.flora_backend.controller.handler;

import com.monash.flora_backend.config.cache.IGlobalCache;
import com.monash.flora_backend.constant.MyConstant;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.socket.*;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * ClassName: TraceDataHandler
 * Description:
 *
 * @author Xinyu Li
 * @since 4/7/2023 11:02 AM
 */
@Slf4j
@AllArgsConstructor
public class TraceDataHandler implements WebSocketHandler {
    private static final Map<String, WebSocketSession> SESSIONS = new ConcurrentHashMap<>();
    private final KafkaTemplate<String, String> kafkaTemplate;
    private final IGlobalCache iGlobalCache;

//    private static int count = 0;

    private Map<String, String> extractParameters(String url) {
        Map<String, String> params = new HashMap<>();
        Pattern pattern = Pattern.compile("[\\?&]([^&#]*)=([^&#]*)");
        Matcher matcher = pattern.matcher(url);

        while (matcher.find()) {
            String key = matcher.group(1);
            String value = matcher.group(2);
            params.put(key, value);
        }

        return params;
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
//        String userName = session.getAttributes().get("userName").toString();
//        SESSIONS.put(userName, session);

//        String urlParameters = Objects.requireNonNull(session.getUri()).getQuery();

        Map<String, String> params = extractParameters(String.valueOf(session.getUri()));
        String userId = params.get("userId");
        String courseId = params.get("courseId");
        String isEvent = params.get("isEvent");

        session.getAttributes().put("userId", userId);
        session.getAttributes().put("courseId", courseId);
        session.getAttributes().put("isEvent", isEvent);
        SESSIONS.put("session-" + userId + "-" + courseId, session);
//        count++;

        log.info(String.format("Connect to server~ userId: %s, courseId: %s, isEvent: %s", userId, courseId, isEvent));
//        log.info("session size:" + count);
//        iGlobalCache.set("reach6Second-" + userId + "-" + courseId, "false");//每次进入新页面就会连接 websocket，此时重置 reach6second变量
    }


    @Override
    public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws Exception {
//        log.info("server receive message:" + message.getPayload().toString());
//        JSONObject jsonObject = JSON.parseObject(message.getPayload().toString());
        /*
        JSONObject jsonObject = JSONUtil.parseObj(message.getPayload().toString());

        String senderId = jsonObject.getStr("senderId");
        String senderMessage = jsonObject.getStr("senderMessage");
        String receiverId = jsonObject.getStr("receiverId");
        String messageType = jsonObject.getStr("status");
        String courseId = jsonObject.getStr("courseId");
//        log.info("receiverId:" + receiverId);
//        log.info("messageType: " + messageType);
//        log.info("messageContent: " + senderMessage);

        //If receiverId is null, means the message is connect to server message
//        if (senderId == null || receiverId == null) {
        if (senderId == null) {
            return;
        }
        if (TEACHER_USER_ID.equals(senderId)) { // the message is from teacher
            // save to database
            if (receiverId != null) {
                if (Objects.equals(messageType, "conversation")) {
                    iUserTeacherLogService.createUserTeacherLog(Long.parseLong(receiverId), senderMessage, MyUtils.getCurrentTimestamp(), CHAT_ROLE_TEACHER, courseId);
                }
                sendMessage(receiverId, message.getPayload().toString());
            }
        } else { // if the message is from student, send the message to teacher
            CURRENT_CONNECTED_STUDENT_ID = senderId;
            // save to database
            if (Objects.equals(messageType, "conversation")) {
                iUserTeacherLogService.createUserTeacherLog(Long.parseLong(senderId), senderMessage, MyUtils.getCurrentTimestamp(), CHAT_ROLE_STUDENT, courseId);
            }
            sendMessage(TEACHER_USER_ID, message.getPayload().toString());  //因为teacher 端需要知道是谁发的消息，所有需要完整的消息json
        }*/


        String userId = session.getAttributes().get("userId").toString();
        String courseId = session.getAttributes().get("courseId").toString();
        String isEvent = session.getAttributes().get("isEvent").toString();
//        log.info(message.getPayload().toString());
        kafkaTemplate.send(MyConstant.KAFKA_TOPIC_TRACE_DATA, message.getPayload().toString());

    }

    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
        log.info("connection error");
        if (session.isOpen()) {
            log.info("session is open");
            session.close();
        }

        log.info("WebSocket Transport Error: " + exception);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus closeStatus) throws Exception {
        log.info("connection close, status:" + closeStatus);
        String userId = session.getAttributes().get("userId").toString();

        SESSIONS.remove(userId);
    }

    @Override
    public boolean supportsPartialMessages() {
        return false;
    }

    public static void sendMessage(String receiverUserId, String message) {
        WebSocketSession webSocketSession = SESSIONS.get(receiverUserId);
        if (webSocketSession == null || !webSocketSession.isOpen()) {
            return;
        }
        try {
            webSocketSession.sendMessage(new TextMessage(message));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void fanoutMessage(String message) {
        SESSIONS.keySet().forEach(receiverUserId -> sendMessage(receiverUserId, message));
    }
}
