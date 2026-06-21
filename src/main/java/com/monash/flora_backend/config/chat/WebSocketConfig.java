package com.monash.flora_backend.config.chat;

import com.monash.flora_backend.config.cache.IGlobalCache;
import com.monash.flora_backend.controller.handler.TeacherChatHandler;
import com.monash.flora_backend.controller.handler.TeacherChatInterceptor;
import com.monash.flora_backend.controller.handler.TraceDataHandler;
import com.monash.flora_backend.controller.handler.TraceDataInterceptor;
import com.monash.flora_backend.service.IUserTeacherLogService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

/**
 * ClassName: WebSocketConfig
 * Description:
 *
 * @author Xinyu Li
 * @since 4/7/2023 10:52 AM
 */
@Configuration
@EnableWebSocket
@RequiredArgsConstructor
public class WebSocketConfig implements WebSocketConfigurer {
    private final IUserTeacherLogService iUserTeacherLogService;
    private final KafkaTemplate<String, String> kafkaTemplate;
    private final IGlobalCache iGlobalCache;
    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
//        registry.addHandler(new TraceDataHandler(iUserTeacherLogService), "/ws/teacher-chat")  //设置连接路径和处理
//                .setAllowedOrigins("*")
//                .addInterceptors(new TraceDataInterceptor());

        registry.addHandler(new TraceDataHandler(kafkaTemplate, iGlobalCache), "/ws/page-event")  //设置连接路径和处理
                .setAllowedOrigins("*").addInterceptors(new TraceDataInterceptor());

        registry.addHandler(new TeacherChatHandler(iUserTeacherLogService, iGlobalCache), "/ws/teacher-chat")
                .setAllowedOrigins("*").addInterceptors(new TeacherChatInterceptor());
    }
}
