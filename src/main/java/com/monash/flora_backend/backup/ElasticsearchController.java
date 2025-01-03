package com.monash.flora_backend.backup;

/**
 * 启动 Elasticsearch：bin\elasticsearch.bat
 */
//@Slf4j
//@RestController
//@AllArgsConstructor
public class ElasticsearchController {

//    private final ElasticsearchClient elasticsearchClient;
//    private final IAnnotationService iAnnotationService;



//    @GetMapping("/elastic-save")
//    public JSONResult elasticSave(@RequestParam("t") String t) {
//
//        AnnotationVO annotationVO = new AnnotationVO();
//        annotationVO.setHighlightText("high numberq qweqwe hello");
//        annotationVO.setDefaultTag("note hello high");
//        annotationVO.setExtraTags("test test1 test2");
//        annotationVO.setUserId(111L);
//        annotationVO.setSaveTime("1665221548987");
//        annotationVO.setUsername("aaa");
//
//        annotationVO.setUrl("http://localhost:8080/");
//        annotationVO.setHighlightTimestamp(t);
//        annotationVO.setNotesText("this is notes text note");
//        annotationVO.setNotesTextJson("");
//
//        boolean result = iAnnotationService.saveAnnotation(annotationVO);
//        log.info("updateOrSaveByUserIdAndHighlightTimestamp result:" + result);
//        return JSONResult.ok();
//    }
//
//    @GetMapping("/elastic-delete/{id}")
//    public String elasticDeleteById(@PathVariable("id") String id) {
//        DeleteResponse deleteResponse = null;
//        try {
//            deleteResponse = elasticsearchClient.delete(e -> e.index(elasticsearchIndexName).id(id));
//        } catch (IOException e) {
//            throw new RuntimeException(e);
//        }
//        log.info(String.valueOf(deleteResponse.result()));
//        return "success";
//    }
//
//    @GetMapping("/elastic-create-delete-index")
//    public String testElasticCreateDeleteIndex() throws IOException {
//
//        BooleanResponse existsResponse = elasticsearchClient.indices().exists(c -> c.index(elasticsearchIndexName));
//        if (!existsResponse.value()) {
//            // 创建索引
//            CreateIndexResponse createIndexResponse = elasticsearchClient.indices().create(c -> c.index(elasticsearchIndexName));
//            // 打印结果
//            log.info(String.valueOf(createIndexResponse.acknowledged()));
//        } else {
//            log.info("user_annotation index exist.......");
//        }
//        // 删除索引
////        DeleteIndexResponse deleteIndexResponse = client.indices().delete(e -> e.index("newapi"));
//        // 打印结果
////        log.info(String.valueOf(deleteIndexResponse.acknowledged()));
//        return "success";
//    }
//
//    @GetMapping("/elastic-crud")
//    public String testElasticCRUDDoc() throws IOException {
//        TestVO testVO = new TestVO();
//        testVO.setName("test test2");
//        testVO.setSex("Male");
//        testVO.setAge(30);
//
//        // 构建一个创建Doc的请求
////        CreateResponse createResponse = client.create(e -> e.index("newapi").id("1003").document(testVO));
//        CreateResponse createResponse = elasticsearchClient.create(e -> e.index(elasticsearchIndexName).id("1005").document(testVO));
//        // 打印请求结果
//        log.info(String.valueOf(createResponse.result()));
//
//
//        // 查询
//        GetResponse<TestVO> getResponse = elasticsearchClient.get(e -> e.index(elasticsearchIndexName).id("1003"), TestVO.class);
//        log.info(String.valueOf(getResponse.source()));
//
//        // 修改
//        // 构建需要修改的内容
////        Map<String, Object> map = new HashMap<>();
////        map.put("age", 35);
//
//        // 构建修改文档的请求
////        UpdateResponse<TestVO> updateResponse = client.update(e -> e.index("newapi").id("1003").doc(map), TestVO.class);
////        log.info(String.valueOf(updateResponse.result()));
//
//        // 删除
////        DeleteResponse deleteResponse = client.delete(e -> e.index("newapi").id("1001"));
////        log.info(String.valueOf(deleteResponse.result()));
//
//        return "success";
//    }

//    @GetMapping("/elastic-search/{keyword}")
//    public String testElasticSearch(@PathVariable("keyword") String keyword) throws IOException {
//        SearchResponse<TestVO> search = elasticsearchClient.search(s -> s
//                        .index("newapi")
//                        .query(q -> q
//                                .term(t -> t
//                                        .field("name")
//                                        .value(v -> v.stringValue(keyword))
//                                )
//                        ),
//                TestVO.class);
//
//        for (Hit<TestVO> hit : search.hits().hits()) {
//            log.info(String.valueOf(hit.source()));
//        }
//
//        return "success";
//    }
}
