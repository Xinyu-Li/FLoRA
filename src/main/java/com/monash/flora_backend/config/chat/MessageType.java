package com.monash.flora_backend.config.chat;

public enum MessageType {
    EVENT("event"),
    CONVERSATION("conversation"),
    FOCUS("focus"),
    UNFOCUS("unfocus"),
    HEARTBEAT("heartbeat"),
    REACH6SECOND("reach6second"),
    CLOSE("close");

    private final String value;

    // 构造器
    MessageType(String value) {
        this.value = value;
    }

    // 获取枚举的字符串值
    public String getValue() {
        return value;
    }
}
