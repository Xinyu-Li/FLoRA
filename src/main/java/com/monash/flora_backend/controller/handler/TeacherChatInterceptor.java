package com.monash.flora_backend.controller.handler;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

import java.util.Map;
/**
 * ClassName: TraceDataInterceptor
 * Description: 自定义拦截器拦截WebSocket请求
 * 因为用户验证放在moodle 端使用，此拦截器暂时不用
 *
 * @author Xinyu Li
 * @since 4/7/2023 11:09 AM
 */
@Slf4j
public class TeacherChatInterceptor implements HandshakeInterceptor {
    //前置拦截一般用来注册用户信息，绑定 WebSocketSession
    @Override
    public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response,
                                   WebSocketHandler wsHandler, Map<String, Object> attributes) throws Exception {
//        System.out.println("前置拦截~~");

        if (!(request instanceof ServletServerHttpRequest)) return true;

//        HttpServletRequest servletRequest = ((ServletServerHttpRequest) request).getServletRequest();
//        String userName = (String) servletRequest.getSession().getAttribute("userName");
//        String userName = "Koishipyb";
//        attributes.put("userName", userName);
        return true;
    }
    @Override
    public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response,
                               WebSocketHandler wsHandler, Exception exception) {
//        System.out.println("后置拦截~~");
    }
}
