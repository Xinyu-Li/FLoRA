package com.monash.flora_backend.dao.mapper;

import com.monash.flora_backend.dao.entity.Annotation;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author xinyu
 * @since 2022-10-06
 */
public interface AnnotationMapper extends BaseMapper<Annotation> {
    @Select({"<script>" +
            "select * from annotation where course_id in " +
            "<foreach item='item' index='index' collection='courseIdList' open='(' separator=',' close=')'>" +
            "#{item}" +
            "</foreach>" +
//                    "(#{courseIdList, typeHandler=com.monash.flora_backend.controller.handler.ListLongHandler}) " +
            "and user_id in " +
            "<foreach item='item' index='index' collection='userIdList' open='(' separator=',' close=')'>" +
            "#{item}" +
            "</foreach>" +
//                    "(#{userIdList, typeHandler=com.monash.flora_backend.controller.handler.ListLongHandler}) " +
            "order by user_id and save_time" +
            "</script>"})
    List<Annotation> findAnnotationByUserIdListCourseIdList(@Param("userIdList") List<Long> userIdList, @Param("courseIdList") List<Long> courseIdList);
}
