package com.monash.flora_backend;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;

import java.util.UUID;

/**
 * ClassName: KafkaTest
 * Description:
 *
 * @author Xinyu Li
 * @since 2/23/2023 12:08 PM
 */
public class KafkaTest extends FLoRaBackendApplicationTests{
    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    /**
     * 定时任务每5秒钟生产一条消息
     */
//    @Scheduled(cron = "*/5 * * * * ?")
    @Test
    public void send() {
        String message = String.format("{id: %s, timestamp: %s, order: %d}", UUID.randomUUID().toString(), System.currentTimeMillis(), 1);
        kafkaTemplate.send("test_topic", message);
        System.out.println("send finished, message = " + message);
    }

}
