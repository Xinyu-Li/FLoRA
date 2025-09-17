package com.monash.flora_backend.service.impl;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch.core.CreateResponse;
import co.elastic.clients.elasticsearch.core.SearchRequest;
import co.elastic.clients.elasticsearch.core.SearchResponse;
import co.elastic.clients.elasticsearch.core.search.Hit;
import co.elastic.clients.elasticsearch.indices.CreateIndexResponse;
import co.elastic.clients.transport.endpoints.BooleanResponse;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.monash.flora_backend.config.cache.IGlobalCache;
import com.monash.flora_backend.controller.vo.BackgroundDocVO;
import com.monash.flora_backend.dao.entity.BackgroundDoc;
import com.monash.flora_backend.dao.mapper.BackgroundDocMapper;
import com.monash.flora_backend.service.IBackgroundDocService;
import com.monash.flora_backend.util.MyBeanCopyUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import opennlp.tools.sentdetect.SentenceDetectorME;
import opennlp.tools.sentdetect.SentenceModel;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
@Slf4j
@Service
@RequiredArgsConstructor
public class BackgroundDocService extends ServiceImpl<BackgroundDocMapper, BackgroundDoc> implements IBackgroundDocService {

    private final ElasticsearchClient elasticsearchClient;

    @Value("${my.elasticsearch.fulltext-index-name}")
    public String elasticsearchFulltextIndexName;
    private final IGlobalCache iGlobalCache;

    public static class KeywordSegment {
        private String sentence;
        private int startIndex;
        private int endIndex;

        public KeywordSegment(String sentence, int startIndex, int endIndex) {
            this.sentence = sentence;
            this.startIndex = startIndex;
            this.endIndex = endIndex;
        }

        public String getSentence() {
            return sentence;
        }

        public int getStartIndex() {
            return startIndex;
        }

        public int getEndIndex() {
            return endIndex;
        }
    }


    @Override
    public List<BackgroundDocVO> findByCourseId(Long courseID) {
        QueryWrapper<BackgroundDoc> wrapper = new QueryWrapper<>();
        wrapper.eq("course_id", courseID);
        List<BackgroundDoc> backgroundDocList = super.list(wrapper);
        backgroundDocList = backgroundDocList == null ? new ArrayList<>() : backgroundDocList;

        return MyBeanCopyUtils.copyBeanList(backgroundDocList, BackgroundDocVO.class);
    }

    private void checkIndexExistence() {
        try {
            // Check if the index exists
            BooleanResponse existsResponse = elasticsearchClient.indices().exists(c -> c.index(elasticsearchFulltextIndexName));

            // If the index does not exist, create it
            if (!existsResponse.value()) {
                CreateIndexResponse createIndexResponse = elasticsearchClient.indices().create(c -> c.index(elasticsearchFulltextIndexName));
                // Print result of index creation
                log.info("Index created: " + createIndexResponse.acknowledged());
            } else {
                log.info("Index already exists.");
            }
        } catch (IOException e) {
            // Handle the exception appropriately
            log.error("Error checking or creating index: " + e.getMessage(), e);
            // Optionally, rethrow or handle the error in another way
        }
    }

    @Override
    public boolean saveDocuments(List<BackgroundDocVO> backgroundDocVOList){
        checkIndexExistence();

        try (InputStream modelIn = BackgroundDocService.class.getResourceAsStream("/en-sent.bin")) {
            if (modelIn == null) {
                throw new IOException("Model file not found");
            }
            SentenceModel model = new SentenceModel(modelIn);
            SentenceDetectorME sentenceDetector = new SentenceDetectorME(model);

            // Iterate over each BackgroundDocVO in the list
            for (BackgroundDocVO backgroundDocVO : backgroundDocVOList) {
                BackgroundDoc backgroundDoc = MyBeanCopyUtils.copyBean(backgroundDocVO, BackgroundDoc.class);
                boolean result = super.save(backgroundDoc);
                String documentUrl = String.valueOf(backgroundDoc.getUrl());
                List<KeywordSegment> segments = new ArrayList<>();
                String[] sentences = sentenceDetector.sentDetect(backgroundDocVO.getDocumentContent());

                for (int sent_idx = 0; sent_idx < sentences.length; sent_idx++) {
                    String sentence = sentences[sent_idx].trim();
                    // Insert document into Elasticsearch
                    String doc2sentID = documentUrl +  "_sentence_" + sent_idx;
                    Map<String, Object> sentenceJSON = new HashMap<>();
                    sentenceJSON.put("body", sentence);
                    sentenceJSON.put("doc2sentID", doc2sentID);
                    sentenceJSON.put("courseId", String.valueOf(backgroundDoc.getCourseId()));

                    try {
                        // Index the document into Elasticsearch
                        CreateResponse createResponse = elasticsearchClient.create(e ->
                                e.index(elasticsearchFulltextIndexName)
                                        .id(doc2sentID)
                                        .document(sentenceJSON)
                        );

                        // Log the document ID that was indexed
                        System.out.println("Document with ID " + createResponse.id() + " indexed.");
                    } catch (IOException e) {
                        // Handle any exceptions that occur during indexing
                        System.err.println("Failed to index document with ID " + doc2sentID + ": " + e.getMessage());
                    }
                }
                if (!result) {
                    log.info("user_docs index exists.......");
                    return false;
                }
            }
            // Return true if all documents are successfully saved
            return true;
        }
        catch (IOException e) {
            System.err.println("sentence tokenization failed: " + e.getMessage());
            return false;
        }
    }

    public List<Map<String, Object>> searchKEYWORD(String courseId,String keyword) {

        List<Map<String, Object>> results = new ArrayList<>();
        checkIndexExistence();

        try {
            SearchRequest searchRequest = SearchRequest.of(s -> s
                            .index(elasticsearchFulltextIndexName)
                            .query(q -> q
                                            .bool(b -> b
                                                            .must(
                                                                    // Fuzzy query for the full term
                                                                    m -> m.match(mq -> mq
                                                                            .field("body") // Field to search
                                                                            .query(keyword) // The input keyword
                                                                            .fuzziness("AUTO") // Automatically determine fuzziness level
                                                                    )
                                                            )
                                                            .should(
                                                                    // Wildcard query for partial matches
                                                                    m -> m.wildcard(wc -> wc
                                                                            .field("body") // Field to search
                                                                            .value("*" + keyword + "*") // Wildcard search for terms starting with the input
                                                                    )
                                                            )
                                                            .should(
                                                                    // Prefix query for partial matches
                                                                    m -> m.prefix(pr -> pr
                                                                            .field("body") // Field to search
                                                                            .value(keyword) // The input keyword
                                                                    )
                                                            )
                                                            //.must(m -> m
//                                            .fuzzy(f -> f
//                                                    .field("body") // Field to search
//                                                    .value(keyword) // The input keyword
//                                                    .fuzziness("AUTO") // Automatically determine fuzziness level
//                                            )
//                                            .multiMatch(mm -> mm
//                                                    .query(keyword)
//                                                    .fields("body") // Field to search
//                                            )
                                                            //)
                                                            .filter(f -> f
                                                                    .term(t -> t
                                                                            .field("courseId") // Filter field
                                                                            .value(courseId) // Value to filter
                                                                    )
                                                            )
                                            )

                            )
                            .highlight(h -> h
                                    .fields("body", hf -> hf // Specify the highlight field
                                            .preTags("<span style='background-color: yellow; font-weight: bold;'>") // Custom start tag with background color and bold
                                            .postTags("</span>") // Custom end tag
                                            .numberOfFragments(0) // Get the full sentence
                                    )
                            )
            );

            // Execute the search
            SearchResponse<Map> searchResponse = elasticsearchClient.search(searchRequest, Map.class);

            // Process the results
            for (Hit<Map> hit : searchResponse.hits().hits()) {
                Map<String, Object> result = new HashMap<>();
                String docId = hit.id(); // Get document ID
                Map<String, Object> source = hit.source(); // Get document source

                // Print the document ID
                System.out.println("Document ID: " + docId);
                result.put("DocumentId", docId);
                result.put("courseId", source.get("courseId"));


                // Highlighted fields
                Map<String, List<String>> highlights = hit.highlight();
                if (highlights.containsKey("body")) {
                    highlights.get("body").forEach(fragment -> {
                        System.out.println("Highlighted Sentence: " + fragment);
                    });
                    result.put("highlightedSentence", highlights.get("body"));
                } else {
                    // If no highlights, print the original sentence
                    System.out.println("Original Sentence: " + source.get("body"));
                    result.put("originalSentence", source.get("body"));
                }
                results.add(result);
            }

        } catch (IOException e) {
            System.err.println("Search failed: " + e.getMessage());
        }
        return results;
    }



    /*public Map<String, List<KeywordSegment>> search(Long courseId,String keyword){

        // Load sentence detector model
        try (InputStream modelIn = BackgroundDocService.class.getResourceAsStream("/en-sent.bin")) {
            if (modelIn == null) {
                throw new IOException("Model file not found");
            }
            SentenceModel model = new SentenceModel(modelIn);
            SentenceDetectorME sentenceDetector = new SentenceDetectorME(model);

            List<BackgroundDocVO> backgroundDocVOS = findByCourseId(courseId);


            Map<String, List<KeywordSegment>> result = searchKeywordInDocuments(backgroundDocVOS, keyword, sentenceDetector);
            return result;

        } catch (IOException e) {
            e.printStackTrace();
        }
        return new HashMap<>();
    }*/

    /*public static Map<String, List<KeywordSegment>> searchKeywordInDocuments(List<BackgroundDocVO> backgroundDocVOS, String keyword, SentenceDetectorME sentenceDetector) {
        Map<String, List<KeywordSegment>> segmentsMap = new HashMap<>();
        for (BackgroundDocVO doc : backgroundDocVOS) {
            List<KeywordSegment> segments = new ArrayList<>();
            String[] sentences = sentenceDetector.sentDetect(doc.getDocumentContent());

            for (String sentence : sentences) {
                int startIndex = sentence.toLowerCase().indexOf(keyword.toLowerCase());
                while (startIndex != -1) {
                    int endIndex = startIndex + keyword.length();
                    segments.add(new KeywordSegment(sentence, startIndex, endIndex));

                    // Continue searching from the next character after the current keyword match
                    startIndex = sentence.toLowerCase().indexOf(keyword.toLowerCase(), startIndex + 1);
                }
            }

            segmentsMap.put(doc.getUrl(), segments);
        }

        return segmentsMap;
    }
*/


}
