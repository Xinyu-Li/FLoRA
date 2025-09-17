package com.monash.flora_backend.service.impl;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch._types.query_dsl.BoolQuery;
import co.elastic.clients.elasticsearch._types.query_dsl.MatchQuery;
import co.elastic.clients.elasticsearch._types.query_dsl.Query;
import co.elastic.clients.elasticsearch._types.query_dsl.TermQuery;
import co.elastic.clients.elasticsearch.core.CreateResponse;
import co.elastic.clients.elasticsearch.core.DeleteResponse;
import co.elastic.clients.elasticsearch.core.SearchResponse;
import co.elastic.clients.elasticsearch.core.UpdateResponse;
import co.elastic.clients.elasticsearch.indices.CreateIndexResponse;
import co.elastic.clients.transport.endpoints.BooleanResponse;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.google.common.collect.Lists;
import com.monash.flora_backend.config.cache.IGlobalCache;
import com.monash.flora_backend.constant.MyConstant;
import com.monash.flora_backend.controller.vo.AnnotationVO;
import com.monash.flora_backend.dao.entity.Annotation;
import com.monash.flora_backend.dao.entity.DeletedAnnotation;
import com.monash.flora_backend.dao.mapper.AnnotationMapper;
import com.monash.flora_backend.service.IAnnotationService;
import com.monash.flora_backend.service.IDeletedAnnotationService;
import com.monash.flora_backend.util.*;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;
import java.util.zip.ZipOutputStream;

import static com.monash.flora_backend.util.GenerateLinkCacheHelper.updateTypeCache;

/**
 * <p>
 *  服务实现类
 * </p>
 * 该类如果想被找到必须在application 里面指定mapper 文件夹
 * @author xinyu
 * @since 2022-09-29
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class AnnotationServiceImpl extends ServiceImpl<AnnotationMapper, Annotation> implements IAnnotationService {

    private final ElasticsearchClient elasticsearchClient;
    private final IDeletedAnnotationService iDeletedAnnotationService;
    @Value("${my.elasticsearch.index-name}")
    public String elasticsearchIndexName;
    private final IGlobalCache iGlobalCache;
    @Override
    public List<AnnotationVO> findByUserIdAndUrlOrderBySaveTimeDesc(Long userId, String url) {
        QueryWrapper<Annotation> wrapper = new QueryWrapper<>();
        wrapper.eq("user_id", userId).eq("url", url).orderByDesc("save_time");
        List<Annotation> annotationList = super.list(wrapper);
        annotationList = annotationList == null ? new ArrayList<>() : annotationList;

        return MyBeanCopyUtils.copyBeanList(annotationList, AnnotationVO.class);
    }

    @SneakyThrows
    @Override
    public boolean removeByUserIdAndHighlightTimestamp(Long userId, String highlightTimestamp) {
        QueryWrapper<Annotation> wrapper = new QueryWrapper<>();
        wrapper.eq("user_id", userId).eq("highlight_timestamp", highlightTimestamp).last("LIMIT 1");
        Annotation annotation = super.getOne(wrapper);
        boolean deletedSaveResult = false;
        boolean result = false;
        if (annotation != null) {
            //从当前表删除，然后存入deleted 表，所有字段数据保持一致
            deletedSaveResult = iDeletedAnnotationService.save(MyBeanCopyUtils.copyBean(annotation, DeletedAnnotation.class));
            result = super.removeById(annotation.getId()); //删除数据库
            // 删除elasticsearch

            DeleteResponse deleteResponse = elasticsearchClient.delete(e->e.index(elasticsearchIndexName).id(String.valueOf(annotation.getId())));
//            log.info(String.valueOf(deleteResponse.result()));
        }
        return result && deletedSaveResult;
    }

    @SneakyThrows
    @Override
    public boolean removeByUserId(Long userId) {
        QueryWrapper<Annotation> wrapper = new QueryWrapper<>();
        wrapper.eq("user_id", userId);
        List<Annotation> annotationList = super.list(wrapper);

        for (Annotation temp : annotationList) {
            BooleanResponse exists = elasticsearchClient.indices().exists(c -> c.index(elasticsearchIndexName));
            if (exists.value()) {
                DeleteResponse deleteResponse = elasticsearchClient.delete(e -> e.index(elasticsearchIndexName).id(String.valueOf(temp.getId())));
//            log.info(String.valueOf(deleteResponse.result()));
            } else {
                log.info("----------index not exist----" + elasticsearchIndexName);
                // 创建索引
                CreateIndexResponse createIndexResponse = elasticsearchClient.indices().create(c -> c.index(elasticsearchIndexName));
            }

        }
        return super.remove(wrapper);
    }

    @SneakyThrows
    @Override
    public boolean saveAnnotation(AnnotationVO annotationVO) {
        Annotation annotation = MyBeanCopyUtils.copyBean(annotationVO, Annotation.class);
        // 插入数据库
        boolean result = super.save(annotation);

        //判断 index 存在与否，如果不存在则创建index
        BooleanResponse existsResponse = elasticsearchClient.indices().exists(c -> c.index(elasticsearchIndexName));

        if (!existsResponse.value()) {
            // 创建索引
            CreateIndexResponse createIndexResponse = elasticsearchClient.indices().create(c -> c.index(elasticsearchIndexName));
            // 打印结果
            log.info(String.valueOf(createIndexResponse.acknowledged()));
        }

        log.info("user_annotation index exist.......");
        // 插入elasticsearch
        CreateResponse createResponse = elasticsearchClient.create(e -> e.index(elasticsearchIndexName).id(String.valueOf(annotation.getId())).document(annotation));
        // 打印请求结果

        return result;
    }

    @SneakyThrows
    @Override
    public boolean updateByUserIdAndHighlightTimestamp(AnnotationVO annotationVO) {
        QueryWrapper<Annotation> wrapper = new QueryWrapper<>();
        wrapper.eq("user_id", annotationVO.getUserId()).eq("highlight_timestamp", annotationVO.getHighlightTimestamp()).last("LIMIT 1");
        Annotation annotation = super.getOne(wrapper);

        if (annotation != null) {

            annotation.setNotesText(annotationVO.getNotesText());
            annotation.setNotesTextJson(annotationVO.getNotesTextJson());
            annotation.setExtraTags(annotationVO.getExtraTags());

            // 更新数据库
            boolean result = super.updateById(annotation); //返回值是match 的条数，不是受影响的条数
            // 更新elasticsearch
            // 构建修改文档的请求
            UpdateResponse<Annotation> updateResponse = elasticsearchClient.update(e -> e.index(elasticsearchIndexName).id(String.valueOf(annotation.getId())).doc(annotation), Annotation.class);
            return result;
        } else {
            return false;
        }
    }

    @SneakyThrows
    @Override
    public List<AnnotationVO> searchAnnotationByKeywordsAndUserId(String keywords, Long userId, String courseId) {
        SearchResponse<Annotation> search = null;
        Query byHighlightText = MatchQuery.of(m -> m.field("highlightText").query(keywords))._toQuery();
        Query byNotesText = MatchQuery.of(m -> m.field("notesText").query(keywords))._toQuery();
        Query byDefaultTag = MatchQuery.of(m -> m.field("defaultTag").query(keywords))._toQuery();
        Query byExtraTags = MatchQuery.of(m -> m.field("extraTags").query(keywords))._toQuery();

        Query byUserId = TermQuery.of(m->m.field("userId").value(userId))._toQuery();
        Query byCourseId = TermQuery.of(m->m.field("courseId").value(courseId))._toQuery();

        Query boolQuery = BoolQuery.of(m-> m.should(byHighlightText, byNotesText, byDefaultTag, byExtraTags))._toQuery();


        //TODO search 存在过滤问题
        search = elasticsearchClient.search(s->
                        s.index(elasticsearchIndexName)
                                .query(q -> q.bool(b->b.must(byUserId, byCourseId, boolQuery))
                                ),
                Annotation.class);
        log.info("search keywords hit size:" + search.hits().hits().size());

        List<AnnotationVO> annotationVOList = new ArrayList<>();
        search.hits().hits().forEach(hit -> {
            if (hit.source() != null) {
                AnnotationVO annotationVO = MyBeanCopyUtils.copyBean(hit.source(), AnnotationVO.class);
                log.info("annotationVO userid: " + annotationVO.getUserId() + "-------pass userid:" + userId);
                if (Objects.equals(annotationVO.getUserId(), userId)) { //TODO需要尝试从elasticsearch 内部解决
                    annotationVOList.add(annotationVO);
                }
            }
        });

        return annotationVOList;
    }

    //TODO 模糊查询 未实现


    /**
     * 查找某个user所有的annotation
     * @param userId
     * @return
     */
    @Override
    public List<AnnotationVO> searchAllAnnotation(Long userId, String courseId) {
        Query byUserId = MatchQuery.of(m -> m.field("userId").query(userId))._toQuery();
        Query byCourseIdId = MatchQuery.of(m -> m.field("courseId").query(courseId))._toQuery();
        SearchResponse<Annotation> search;
        try {
            search = elasticsearchClient.search(s->
                    s.index(elasticsearchIndexName)
                            .query(q->q.bool(b->b.must(byUserId, byCourseIdId))), Annotation.class
            );
        } catch (IOException e) {
            log.info("searchAllAnnotation exception" + userId + "-----" + courseId);
            throw new RuntimeException(e);
        }
        List<AnnotationVO> annotationVOList = new ArrayList<>();
        search.hits().hits().forEach(hit -> {
            if (hit.source() != null) {
                annotationVOList.add(MyBeanCopyUtils.copyBean(hit.source(), AnnotationVO.class));
            }
        });
        return annotationVOList;
    }


    @Override
    public List<Annotation> findAllByUserIdAndCourseId(Long userId, String courseId){
        QueryWrapper<Annotation> wrapper = new QueryWrapper<>();
        if(userId != 0) {
            wrapper.eq("user_id", userId).eq("course_id", courseId);
        }else {
            wrapper.eq("course_id", courseId);
        }
        return super.list(wrapper);
    }

    @Override
    public void exportAnnotationToExcelByUserIdListAndCourseIdList(List<Long> userIdList, List<String> courseIdList,
                                                                   ZipOutputStream zos) throws IOException{
        //头部，第一层
        List<List<String>> allHead = initialiseHeader();

        List<List<Object>> allData = Lists.newArrayList();
        //封装数据体
        List<Annotation> annotationList = findAnnotationByUserIdListCourseIdList(userIdList, courseIdList);


        annotationList.forEach(annotation -> {
            String saveTime = MyUtils.convertTimestampToFormat(annotation.getSaveTime());
            String highlightTime = MyUtils.convertTimestampToFormat(annotation.getHighlightTimestamp());
            List<Object> data1 = Lists.newArrayList((allData.size() + 1),
                    annotation.getUserId(),
                    annotation.getUsername(),
                    saveTime,
                    annotation.getUrl(),
                    highlightTime,
                    annotation.getHighlightText(),
                    annotation.getNotesText(),
                    annotation.getNotesTextJson(),
                    annotation.getDefaultTag(),
                    annotation.getExtraTags(),
                    annotation.getCourseId());
            allData.add(data1);
        });
//        userIdList.forEach(userId -> {
//            courseIdList.forEach(courseId -> {
//                List<Annotation> annotationList = findAllByUserIdAndCourseId(userId, courseId);
//                //封装数据体
//                for (int k = 0; k < annotationList.size(); k++) {
//                    Annotation annotation = annotationList.get(k);
//                    String saveTime = MyUtils.convertTimestampToFormat(annotation.getSaveTime());
//                    String highlightTime = MyUtils.convertTimestampToFormat(annotation.getHighlightTimestamp());
//                    List<Object> data1 = Lists.newArrayList((k+1),
//                            annotation.getUserId(),
//                            annotation.getUsername(),
//                            saveTime,
//                            annotation.getUrl(),
//                            highlightTime,
//                            annotation.getHighlightText(),
//                            annotation.getNotesText(),
//                            annotation.getNotesTextJson(),
//                            annotation.getDefaultTag(),
//                            annotation.getExtraTags(),
//                            annotation.getCourseId());
//                    allData.add(data1);
//                }
//            });
//        });

        byte[] stream = DynamicEasyExcelExportUtil.customerExportExcelFile(allHead, allData);
        // 写入zip
        FileUtils.writeToZip(zos, stream, "annotation.xlsx");
    }

    private List<Annotation> findAnnotationByUserIdListCourseIdList(List<Long> userIdList, List<String> courseIdList) {
        return getBaseMapper().findAnnotationByUserIdListCourseIdList(userIdList, courseIdList.stream().map(Long::valueOf).collect(Collectors.toList()));

    }

    private static List<List<String>> initialiseHeader() {
        List<String> head1 = new ArrayList<>();
        head1.add("#");
        head1.add("user_id");
        head1.add("username");
        head1.add("save_time");
        head1.add("url");
        head1.add("highlight_time");
        head1.add("highlight_text");
        head1.add("notes_text");
        head1.add("notes_text_json");
        head1.add("default_tag");
        head1.add("extra_tag");
        head1.add("course_id");

        //封装头部
        List<List<String>> allHead = new ArrayList<>();
        allHead.add(head1);
        return allHead;
    }

    @Override
    public void exportAnnotationToExcelByUserIdListAndCourseIdList(List<Long> userIdList, List<String> courseIdList, ZipOutputStream zos, int cutRow) throws IOException {
        //头部，第一层
        ExcelBreaker excelBreaker = new ExcelBreaker(cutRow, "annotation", initialiseHeader(), zos);

        //封装数据体
        userIdList.forEach(userId -> {
            courseIdList.forEach(courseId -> {
                List<Annotation> annotationList = findAllByUserIdAndCourseId(userId, courseId);
                //封装数据体
                for (int k = 0; k < annotationList.size(); k++) {
                    Annotation annotation = annotationList.get(k);
                    String saveTime = MyUtils.convertTimestampToFormat(annotation.getSaveTime());
                    String highlightTime = MyUtils.convertTimestampToFormat(annotation.getHighlightTimestamp());
                    List<Object> data1 = Lists.newArrayList((k+1),
                            annotation.getUserId(),
                            annotation.getUsername(),
                            saveTime,
                            annotation.getUrl(),
                            highlightTime,
                            annotation.getHighlightText(),
                            annotation.getNotesText(),
                            annotation.getNotesTextJson(),
                            annotation.getDefaultTag(),
                            annotation.getExtraTags(),
                            annotation.getCourseId());
                    excelBreaker.getAllData().add(data1);
                    // 2. 每次完成一次add data就increase
                    excelBreaker.increaseCount(1);
                    // 如果counter超过了cutRow，保存进zip
                    excelBreaker.tryUpdateParamsAndSave();
                }
            });
        });
        excelBreaker.saveExcelToZip();
    }

    @Override
    public void exportAnnotationToExcelByUserIdListAndCourseIdList(List<Long> userIdList, List<String> courseIdList, int cutRows, String token, String dateString) throws IOException {
        ExcelBreaker excelBreaker = new ExcelBreaker(cutRows, "annotation", initialiseHeader(), token, dateString);
        updateTypeCache(token, "Annotation", iGlobalCache);
        if(MyConstant.checkNumberOfInstance)
            iGlobalCache.hset(token, "num-total-rows", String.valueOf(getCountByUserIdsAndCourseIds(userIdList, courseIdList)));

        List<Annotation> annotationList = findAnnotationByUserIdListCourseIdList(userIdList, courseIdList);


        annotationList.forEach(annotation -> {
            String saveTime = MyUtils.convertTimestampToFormat(annotation.getSaveTime());
            String highlightTime = MyUtils.convertTimestampToFormat(annotation.getHighlightTimestamp());
            List<Object> data1 = Lists.newArrayList((excelBreaker.getAllData().size() + 1),
                    annotation.getUserId(),
                    annotation.getUsername(),
                    saveTime,
                    annotation.getUrl(),
                    highlightTime,
                    annotation.getHighlightText(),
                    annotation.getNotesText(),
                    annotation.getNotesTextJson(),
                    annotation.getDefaultTag(),
                    annotation.getExtraTags(),
                    annotation.getCourseId());
            excelBreaker.getAllData().add(data1);
            // 2. 每次完成一次add data就increase
            excelBreaker.increaseCount(1);
            excelBreaker.tryUpdateCache(iGlobalCache);
            // 如果counter超过了cutRow，保存进zip
            excelBreaker.tryUpdateParamsAndSaveToExcel();
        });
        excelBreaker.saveExcelToFile();

//        userIdList.forEach(userId -> {
//            courseIdList.forEach(courseId -> {
//                List<Annotation> annotationList = findAllByUserIdAndCourseId(userId, courseId);
//                //封装数据体
//                for (int k = 0; k < annotationList.size(); k++) {
//                    Annotation annotation = annotationList.get(k);
//                    String saveTime = MyUtils.convertTimestampToFormat(annotation.getSaveTime());
//                    String highlightTime = MyUtils.convertTimestampToFormat(annotation.getHighlightTimestamp());
//                    List<Object> data1 = Lists.newArrayList((k+1),
//                            annotation.getUserId(),
//                            annotation.getUsername(),
//                            saveTime,
//                            annotation.getUrl(),
//                            highlightTime,
//                            annotation.getHighlightText(),
//                            annotation.getNotesText(),
//                            annotation.getNotesTextJson(),
//                            annotation.getDefaultTag(),
//                            annotation.getExtraTags(),
//                            annotation.getCourseId());
//                    excelBreaker.getAllData().add(data1);
//                    // 2. 每次完成一次add data就increase
//                    excelBreaker.increaseCount(1);
//                    excelBreaker.tryUpdateCache(iGlobalCache);
//                    // 如果counter超过了cutRow，保存进zip
//                    excelBreaker.tryUpdateParamsAndSaveToExcel();
//                }
//            });
//        });
    }

    private Long getCountByUserIdsAndCourseIds(List<Long> userIdList, List<String> courseIdList) {
        AtomicLong totalCount = new AtomicLong();
        userIdList.forEach(userId -> {
            courseIdList.forEach(courseId -> {
                QueryWrapper<Annotation> wrapper = new QueryWrapper<>();
                wrapper.eq("user_id", userId).eq("course_id", courseId).orderByDesc("save_time").last("LIMIT 1");
                totalCount.addAndGet(super.count(wrapper));
            });
        });
        return totalCount.get();
    }
//    @SneakyThrows
//    @Override
//    public void exportAnnotationToExcel() {
//
//        int totalNumber = super.count();
//
//        int totalPageNumber = totalNumber / MyConstant.ITEM_NUMBER_PER_EXCEL;
//        if (totalNumber % MyConstant.ITEM_NUMBER_PER_EXCEL != 0) {
//            totalPageNumber += 1;
//        }
//
//        for (int i = 0; i < totalPageNumber; i++) {
//
//            String exportFilePath = MyMoodleConfigConstant.EXCEL_EXPORT_PATH  + "/annotation" + i + ".xlsx";
//
//            QueryWrapper<Annotation> wrapper = new QueryWrapper<>();
//            wrapper.last("LIMIT " + (i * MyConstant.ITEM_NUMBER_PER_EXCEL) + ", " + MyConstant.ITEM_NUMBER_PER_EXCEL);
//
//            List<Annotation> annotationList = super.list(wrapper);
//
//            //导出包含数据内容的文件（方式二）
//            //头部，第一层
//            List<String> head1 = new ArrayList<>();
//            head1.add("#");
//            head1.add("user_id");
//            head1.add("username");
//            head1.add("save_time");
//            head1.add("url");
//            head1.add("highlight_time");
//            head1.add("highlight_text");
//            head1.add("notes_text");
//            head1.add("notes_text_json");
//            head1.add("default_tag");
//            head1.add("extra_tag");
//
//            //封装头部
//            List<List<String>> allHead = new ArrayList<>();
//            allHead.add(head1);
//
//
//            List<List<Object>> allData = Lists.newArrayList();
//            //封装数据体
//            for (int k = 0; k < annotationList.size(); k++) {
//                Annotation annotation = annotationList.get(k);
//                String saveTime = MyUtils.convertTimestampToFormat(annotation.getSaveTime());
//                String highlightTime = MyUtils.convertTimestampToFormat(annotation.getHighlightTimestamp());
//                List<Object> data1 = Lists.newArrayList((k+1),
//                        annotation.getUserId(),
//                        annotation.getUsername(),
//                        saveTime,
//                        annotation.getUrl(),
//                        highlightTime,
//                        annotation.getHighlightText(),
//                        annotation.getNotesText(),
//                        annotation.getNotesTextJson(),
//                        annotation.getDefaultTag(),
//                        annotation.getExtraTags());
//                allData.add(data1);
//            }
//
//            byte[] stream2 = DynamicEasyExcelExportUtil.customerExportExcelFile(allHead, allData);
//            FileOutputStream outputStream2 = new FileOutputStream(new File(exportFilePath));
//            outputStream2.write(stream2);
//            outputStream2.close();
//        }
//    }
}
