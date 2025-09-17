package com.monash.flora_backend.config;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.json.jackson.JacksonJsonpMapper;
import co.elastic.clients.transport.ElasticsearchTransport;
import co.elastic.clients.transport.rest_client.RestClientTransport;
import org.apache.http.HttpHost;
import org.elasticsearch.client.RestClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;


@Configuration
//@AllArgsConstructor
public class ElasticsearchConfig {
//    private final MyConstant myConstant;
    //不能是静态变量，静态变量无法使用annotation加载
    @Value("${my.elasticsearch.http-host}")
    public String elasticsearchHttpHost;
    /**
     * elasticsearch 客户端
     * @return
     * @throws IOException
     */
    @Bean
    public ElasticsearchClient elasticsearchClient() throws IOException {
        //创建低级客户端
        RestClient restClient = RestClient.builder(new HttpHost(elasticsearchHttpHost, 9200)).build();


        // 使用jackson映射器创建传输层
        ElasticsearchTransport transport = new RestClientTransport(restClient, new JacksonJsonpMapper());

        // 创建API客户端
        ElasticsearchClient client = new ElasticsearchClient(transport); //注意是不同的ElasticsearchClient

//        // 关闭链接
//        transport.close();
//        restClient.close();
        return client;
    }
}
