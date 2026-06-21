package com.monash.flora_backend.util;

import com.fasterxml.jackson.databind.JsonNode;
import io.netty.handler.ssl.SslContext;
import io.netty.handler.ssl.SslContextBuilder;
import io.netty.handler.ssl.util.InsecureTrustManagerFactory;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.UriComponentsBuilder;
import reactor.core.publisher.Mono;
import reactor.netty.http.client.HttpClient;

import javax.net.ssl.SSLException;
import java.util.Map;
import java.util.function.Consumer;

/**
 * ClassName: WebClientUtil
 * Description:
 *
 * @author Xinyu Li
 * @since 6/3/2023 11:39 AM
 */
public class WebClientUtil {
    /**
     * 同步get请求
     *
     * @param requestPath   请求路径
     * @param requestParams 请求参数
     * @return 默认返回jsonNode类型的数据
     */
    public static JsonNode get(String requestPath, MultiValueMap<String, String> requestParams) {
        return syncGet(requestPath, requestParams, null, JsonNode.class);
    }

    /**
     * 同步get请求
     *
     * @param requestPath   请求路径
     * @param requestParams 请求参数
     * @param headers       请求头
     * @return 默认返回jsonNode类型的数据
     */
    public static JsonNode get(String requestPath, MultiValueMap<String, String> requestParams, Map<String, String> headers) {
        return syncGet(requestPath, requestParams, headers, JsonNode.class);
    }

    /**
     * 同步get请求
     *
     * @param requestPath   请求路径
     * @param requestParams 请求参数
     * @param headers       请求头
     * @param clazz         返回体类型
     * @return 自定义返回体的类型
     */
    public static <T> T get(String requestPath, MultiValueMap<String, String> requestParams, Map<String, String> headers, Class<T> clazz) {
        return syncGet(requestPath, requestParams, headers, clazz);
    }

    /**
     * 异步get请求
     *
     * @param requestPath   请求路径
     * @param requestParams 请求参数
     * @param callBack      方法回调
     * @return
     */
    public static void get(String requestPath, MultiValueMap<String, String> requestParams, Consumer<JsonNode> callBack) {
        Mono<JsonNode> monoResponse = sendGet(requestPath, requestParams, null, JsonNode.class);
        monoResponse.subscribe(callBack);
    }

    /**
     * 异步get请求
     *
     * @param requestPath   请求路径
     * @param requestParams 请求参数
     * @param headers       请求头
     * @param callBack      方法回调
     * @return
     */
    public static void get(String requestPath, MultiValueMap<String, String> requestParams, Map<String, String> headers, Consumer<JsonNode> callBack) {
        Mono<JsonNode> monoResponse = sendGet(requestPath, requestParams, headers, JsonNode.class);
        monoResponse.subscribe(callBack);
    }

    /**
     * 同步post请求
     *
     * @param requestPath   请求路径
     * @param requestParams 请求参数
     * @return 默认返回jsonNode类型的数据
     */
    public static JsonNode post(String requestPath, LinkedMultiValueMap<String, Object> requestParams) {
        return syncPost(requestPath, requestParams, null, JsonNode.class);
    }

    /**
     * 同步post请求
     *
     * @param requestPath   请求路径
     * @param requestParams 请求参数
     * @param headers       请求头
     * @return 默认返回jsonNode类型的数据
     */
    public static JsonNode post(String requestPath, LinkedMultiValueMap<String, Object> requestParams, Map<String, String> headers) {
        return syncPost(requestPath, requestParams, headers, JsonNode.class);
    }

    /**
     * 同步post请求
     *
     * @param requestPath   请求路径
     * @param requestParams 请求参数
     * @param headers       请求头
     * @param clazz         返回体类型
     * @return 自定义返回体的类型
     */
    public static <T> T post(String requestPath, LinkedMultiValueMap<String, Object> requestParams, Map<String, String> headers, Class<T> clazz) {
        return syncPost(requestPath, requestParams, headers, clazz);
    }


    /**
     * 异步post请求
     *
     * @param requestPath   请求路径
     * @param requestParams 请求参数
     * @param callBack      方法回调
     * @return
     */
    public static void post(String requestPath, LinkedMultiValueMap<String, Object> requestParams, Consumer<JsonNode> callBack) {
        Mono<JsonNode> monoResponse = sendPost(requestPath, requestParams, null, JsonNode.class);
        monoResponse.subscribe(callBack);

    }

    public static Mono<String> asyncPost(String requestPath, LinkedMultiValueMap<String, Object> requestParams) {
        return sendPost(requestPath, requestParams, null, String.class);
    }

    /**
     * 异步post请求
     *
     * @param requestPath   请求路径
     * @param requestParams 请求参数
     * @param headers       请求头
     * @param callBack      方法回调
     * @return
     */
    public static void post(String requestPath, LinkedMultiValueMap<String, Object> requestParams, Map<String, String> headers, Consumer<JsonNode> callBack) {
        Mono<JsonNode> monoResponse = sendPost(requestPath, requestParams, headers, JsonNode.class);
        monoResponse.subscribe(callBack);
    }


    /**
     * 同步get请求
     *
     * @param requestPath   请求路径
     * @param requestParams 请求参数
     * @param headers       请求头
     * @param clazz         返回来类型
     * @param <T>
     * @return
     */
    private static <T> T syncGet(String requestPath, MultiValueMap<String, String> requestParams, Map<String, String> headers, Class<T> clazz) {
        Mono<T> monoResponse = sendGet(requestPath, requestParams, headers, clazz);
        //如果需要则可设置超时时间，单位是秒
        //return monoResponse.block(Duration.ofSeconds(timeout));
        return monoResponse.block();
    }

    /**
     * 同步post请求
     *
     * @param requestPath   请求路径
     * @param requestParams 请求参数
     * @param headers       请求头
     * @param clazz         返回来类型
     * @param <T>
     * @return
     */
    private static <T> T syncPost(String requestPath, LinkedMultiValueMap<String, Object> requestParams, Map<String, String> headers, Class<T> clazz) {
        Mono<T> monoResponse = sendPost(requestPath, requestParams, headers, clazz);
        //如果需要则可设置超时时间，单位是秒
        //return monoResponse.block(Duration.ofSeconds(timeout));
        return monoResponse.block();
    }

    /**
     * 发送get请求
     *
     * @param requestPath
     * @param requestParams
     * @param headers
     * @param clazz         返回体类型
     * @return
     */
    private static <T> Mono<T> sendGet(String requestPath, MultiValueMap<String, String> requestParams, Map<String, String> headers, Class<T> clazz) {
        String url = composeGetRequestPath(requestPath, requestParams);
        WebClient.RequestHeadersSpec<?> requestBodySpec = createIgnoreSslWebClient().get().uri(url);
        if (headers != null) {
            headers.forEach(requestBodySpec::header);
        }
        return requestBodySpec.retrieve().bodyToMono(clazz);
    }

    /**
     * 发送post请求
     *
     * @param requestPath   请求路径
     * @param requestParams 请求参数
     * @param headers       请求头
     * @param clazz         返回体类型
     * @return
     */
    private static <T> Mono<T> sendPost(String requestPath, LinkedMultiValueMap<String, Object> requestParams, Map<String, String> headers, Class<T> clazz) {
        WebClient.RequestBodySpec requestBodySpec = createIgnoreSslWebClient().post().uri(requestPath);
        if (headers != null) {
            headers.forEach(requestBodySpec::header);
        }
        return requestBodySpec.body(BodyInserters.fromMultipartData(requestParams)).retrieve().bodyToMono(clazz);
    }

    /**
     * 根据请求参数封装请求url
     *
     * @param requestPath
     * @param requestParams
     * @return
     */
    private static String composeGetRequestPath(String requestPath, MultiValueMap<String, String> requestParams) {
        return requestParams == null ? requestPath : UriComponentsBuilder.fromHttpUrl(requestPath).queryParams(requestParams).toUriString();
    }

    /**
     * 创建web客户端，免除ssl协议验证
     *
     * @return
     */
    public static WebClient createIgnoreSslWebClient() {
        try {
            SslContext sslContext = SslContextBuilder.forClient().trustManager(InsecureTrustManagerFactory.INSTANCE).build();
            HttpClient httpClient = HttpClient.create().secure(t -> t.sslContext(sslContext));

            return WebClient.builder().clientConnector(new ReactorClientHttpConnector(httpClient)).build();
        } catch (SSLException sslException) {
            throw new RuntimeException(sslException);
        }
    }
}
