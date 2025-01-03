package com.monash.flora_backend.dao.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.monash.flora_backend.controller.vo.DictionaryLogVO;
import com.monash.flora_backend.dao.entity.DictionaryLog;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author xinyu
 * @since 2023-04-17
 */
public interface DictionaryLogMapper extends BaseMapper<DictionaryLog> {
    @Select({"<script>" +
            "select * from dictionary_log where course_id in " +
            "<foreach item='item' index='index' collection='courseIdList' open='(' separator=',' close=')'>" +
            "#{item}" +
            "</foreach>" +
//                    "(#{courseIdList, typeHandler=com.monash.flora_backend.controller.handler.ListLongHandler}) " +
            "and user_id in " +
            "<foreach item='item' index='index' collection='userIdList' open='(' separator=',' close=')'>" +
            "#{item}" +
            "</foreach>" +
//                    "(#{userIdList, typeHandler=com.monash.flora_backend.controller.handler.ListLongHandler}) " +
            "order by user_id and response_time" +
            "</script>"})
    List<DictionaryLogVO> findDictionaryLogByUserIdListCourseIdList(@Param("userIdList") List<Long> userIdList, @Param("courseIdList") List<Long> collect);
}
