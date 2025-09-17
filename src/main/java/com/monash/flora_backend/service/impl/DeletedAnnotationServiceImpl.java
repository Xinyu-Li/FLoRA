package com.monash.flora_backend.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.google.common.collect.Lists;
import com.monash.flora_backend.constant.MyConstant;
import com.monash.flora_backend.constant.MyMoodleConfigConstant;
import com.monash.flora_backend.dao.entity.DeletedAnnotation;
import com.monash.flora_backend.dao.mapper.DeletedAnnotationMapper;
import com.monash.flora_backend.service.IDeletedAnnotationService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.monash.flora_backend.util.DynamicEasyExcelExportUtil;
import com.monash.flora_backend.util.MyUtils;
import lombok.AllArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.List;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author xinyu
 * @since 2022-10-20
 */
@Service
@AllArgsConstructor
public class DeletedAnnotationServiceImpl extends ServiceImpl<DeletedAnnotationMapper, DeletedAnnotation> implements IDeletedAnnotationService {

    private final MyConstant myConstant;

    @Override
    public boolean removeByUserId(Long userId) {
        QueryWrapper<DeletedAnnotation> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("user_id", userId);
        return super.remove(queryWrapper);

    }

    @SneakyThrows
    @Override
    public void exportDeletedAnnotationToExcel() {
        int totalNumber = super.count();

        int totalPageNumber = totalNumber / MyConstant.ITEM_NUMBER_PER_EXCEL;
        if (totalNumber % MyConstant.ITEM_NUMBER_PER_EXCEL != 0) {
            totalPageNumber += 1;
        }

        for (int i = 0; i < totalPageNumber; i++) {

            String exportFilePath = MyMoodleConfigConstant.EXCEL_EXPORT_PATH + "/deleted_annotation" + i + ".xlsx";

            QueryWrapper<DeletedAnnotation> wrapper = new QueryWrapper<>();
            wrapper.last("LIMIT " + (i * MyConstant.ITEM_NUMBER_PER_EXCEL) + ", " + MyConstant.ITEM_NUMBER_PER_EXCEL);

            List<DeletedAnnotation> deletedAnnotationList = super.list(wrapper);

            //导出包含数据内容的文件（方式二）
            //头部，第一层
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

            //封装头部
            List<List<String>> allHead = new ArrayList<>();
            allHead.add(head1);


            List<List<Object>> allData = Lists.newArrayList();
            //封装数据体
            for (int k = 0; k < deletedAnnotationList.size(); k++) {
                DeletedAnnotation deletedAnnotation = deletedAnnotationList.get(k);
                String saveTime = MyUtils.convertTimestampToFormat(deletedAnnotation.getSaveTime());
                String highlightTime = MyUtils.convertTimestampToFormat(deletedAnnotation.getHighlightTimestamp());
                List<Object> data1 = Lists.newArrayList((k+1),
                        deletedAnnotation.getUserId(),
                        deletedAnnotation.getUsername(),
                        saveTime,
                        deletedAnnotation.getUrl(),
                        highlightTime,
                        deletedAnnotation.getHighlightText(),
                        deletedAnnotation.getNotesText(),
                        deletedAnnotation.getNotesTextJson(),
                        deletedAnnotation.getDefaultTag(),
                        deletedAnnotation.getExtraTags());
                allData.add(data1);
            }

            byte[] stream2 = DynamicEasyExcelExportUtil.customerExportExcelFile(allHead, allData);
            FileOutputStream outputStream2 = new FileOutputStream(new File(exportFilePath));
            outputStream2.write(stream2);
            outputStream2.close();
        }
    }
}
