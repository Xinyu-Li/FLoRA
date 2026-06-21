package com.monash.flora_backend;

import org.apache.kafka.clients.admin.AdminClient;
import org.apache.kafka.clients.admin.AdminClientConfig;
import org.apache.kafka.clients.admin.DescribeClusterResult;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.kafka.clients.consumer.ConsumerRecords;
import org.apache.kafka.clients.consumer.KafkaConsumer;
import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.apache.kafka.clients.producer.RecordMetadata;
import org.junit.jupiter.api.Test;

import java.time.Duration;
import java.util.Collections;
import java.util.Properties;

import static org.junit.jupiter.api.Assertions.*;

/**
 * 验证 Kafka 4.1.1 broker 与当前 kafka-clients 的兼容性。
 * 不依赖 Spring 上下文，可直接在 IDEA 中用 JDK 11 运行。
 * 前提：Docker Kafka 已在 127.0.0.1:9092 运行。
 */
public class KafkaCompatibilityTest {

    private static final String BOOTSTRAP = "127.0.0.1:9092";
    private static final String TEST_TOPIC = "flora_compat_test";

    @Test
    void testBrokerConnectivity() throws Exception {
        Properties props = new Properties();
        props.put(AdminClientConfig.BOOTSTRAP_SERVERS_CONFIG, BOOTSTRAP);
        props.put(AdminClientConfig.REQUEST_TIMEOUT_MS_CONFIG, "5000");

        try (AdminClient admin = AdminClient.create(props)) {
            DescribeClusterResult cluster = admin.describeCluster();
            String clusterId = cluster.clusterId().get();
            int nodeCount = cluster.nodes().get().size();

            System.out.println("Broker version check passed");
            System.out.println("  cluster id : " + clusterId);
            System.out.println("  broker nodes: " + nodeCount);

            assertNotNull(clusterId, "cluster id should not be null");
            assertTrue(nodeCount > 0, "at least one broker should be online");
        }
    }

    @Test
    void testProduceAndConsume() throws Exception {
        String testMessage = "flora-compat-" + System.currentTimeMillis();

        Properties producerProps = new Properties();
        producerProps.put("bootstrap.servers", BOOTSTRAP);
        producerProps.put("key.serializer", "org.apache.kafka.common.serialization.StringSerializer");
        producerProps.put("value.serializer", "org.apache.kafka.common.serialization.StringSerializer");

        Properties consumerProps = new Properties();
        consumerProps.put("bootstrap.servers", BOOTSTRAP);
        consumerProps.put("group.id", "flora-compat-test-" + System.currentTimeMillis());
        consumerProps.put("key.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
        consumerProps.put("value.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
        consumerProps.put("auto.offset.reset", "latest");

        try (KafkaConsumer<String, String> consumer = new KafkaConsumer<>(consumerProps);
             KafkaProducer<String, String> producer = new KafkaProducer<>(producerProps)) {

            consumer.subscribe(Collections.singletonList(TEST_TOPIC));
            consumer.poll(Duration.ofMillis(500)); // trigger partition assignment

            RecordMetadata meta = producer.send(
                    new ProducerRecord<>(TEST_TOPIC, "test-key", testMessage)).get();
            System.out.printf("Sent  -> topic=%s partition=%d offset=%d%n",
                    meta.topic(), meta.partition(), meta.offset());

            boolean found = false;
            long deadline = System.currentTimeMillis() + 8_000;
            while (!found && System.currentTimeMillis() < deadline) {
                ConsumerRecords<String, String> records = consumer.poll(Duration.ofMillis(500));
                for (ConsumerRecord<String, String> r : records) {
                    System.out.println("Received -> " + r.value());
                    if (testMessage.equals(r.value())) {
                        found = true;
                    }
                }
            }

            assertTrue(found, "Message not received — possible Kafka 4.1.1 compatibility issue");
        }
    }
}
