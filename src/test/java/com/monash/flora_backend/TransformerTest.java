package com.monash.flora_backend;

public class TransformerTest extends FLoRaBackendApplicationTests{
    /**
     * spring AI 需要升级到 springboot 3 以上才能使用
     */
//    @Test
//    public void test1() throws Exception {
//        TransformersEmbeddingModel embeddingModel = new TransformersEmbeddingModel();
//
//        // (optional) defaults to classpath:/onnx/all-MiniLM-L6-v2/tokenizer.json
//        embeddingModel.setTokenizerResource("classpath:/onnx/all-MiniLM-L6-v2/tokenizer.json");
//
//        // (optional) defaults to classpath:/onnx/all-MiniLM-L6-v2/model.onnx
//        embeddingModel.setModelResource("classpath:/onnx/all-MiniLM-L6-v2/model.onnx");
//
//        // (optional) defaults to ${java.io.tmpdir}/spring-ai-onnx-model
//        // Only the http/https resources are cached by default.
//        embeddingModel.setResourceCacheDirectory("/tmp/onnx-zoo");
//
//        // (optional) Set the tokenizer padding if you see an errors like:
//        // "ai.onnxruntime.OrtException: Supplied array is ragged, ..."
//        embeddingModel.setTokenizerOptions(Map.of("padding", "true"));
//
//        embeddingModel.afterPropertiesSet();
//
//        List<float[]> embeddings = embeddingModel.embed(List.of("Hello world", "World is big"));
//    }
}
