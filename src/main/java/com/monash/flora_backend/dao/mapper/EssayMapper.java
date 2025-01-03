package com.monash.flora_backend.dao.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.monash.flora_backend.dao.entity.Essay;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author xinyu
 * @since 2022-10-11
 */
public interface EssayMapper extends BaseMapper<Essay> {

    @Select("SELECT EXISTS (SELECT 1 FROM essay WHERE user_id=#{userId} AND course_id=#{courseId} AND save_time >= #{beginTimestamp} AND save_time <= #{endTimestamp}) AS data_exists;")
    boolean checkEssayHasUpdateBetweenTimeRange(Long userId, String courseId, String beginTimestamp, String endTimestamp);

    @Select({"<script>" +
            "select * from essay where course_id in " +
            "<foreach item='item' index='index' collection='courseIdList' open='(' separator=',' close=')'>" +
            "#{item}" +
            "</foreach>" +
//                    "(#{courseIdList, typeHandler=com.monash.flora_backend.controller.handler.ListLongHandler}) " +
            "and user_id in " +
            "<foreach item='item' index='index' collection='userIdList' open='(' separator=',' close=')'>" +
            "#{item}" +
            "</foreach>" +
//                    "(#{userIdList, typeHandler=com.monash.flora_backend.controller.handler.ListLongHandler}) " +
            ";" +
            "</script>"})
    List<Essay> findEssayLogByUserIdListCourseIdList(@Param("userIdList") List<Long> userIdList,  @Param("courseIdList") List<Long> courseIdList);

    //    @Select("select e1.* from essay e1 join (select user_id, course_id, max(save_time) as max_save_time from essay where course_id in ''(#{courseIdList, typeHandler=com.monash.flora_backend.controller.handler.ListLongHandler}) and user_id in (#{userIdList, typeHandler=com.monash.flora_backend.controller.handler.ListLongHandler}) group by user_id, course_id) e2 on e1.user_id = e2.user_id and e1.course_id=e2.course_id and e1.save_time = e2.max_save_time;")
    @Select({"<script>" +
            "select e1.* from essay e1 join (select user_id, course_id, max(save_time) as max_save_time from essay where course_id in " +
                    "<foreach item='item' index='index' collection='courseIdList' open='(' separator=',' close=')'>" +
                    "#{item}" +
                    "</foreach>" +
//                    "(#{courseIdList, typeHandler=com.monash.flora_backend.controller.handler.ListLongHandler}) " +
                    "and user_id in " +
                    "<foreach item='item' index='index' collection='userIdList' open='(' separator=',' close=')'>" +
                    "#{item}" +
                    "</foreach>" +
//                    "(#{userIdList, typeHandler=com.monash.flora_backend.controller.handler.ListLongHandler}) " +
                    "group by user_id, course_id) e2 on e1.user_id = e2.user_id and e1.course_id=e2.course_id and e1.save_time = e2.max_save_time;" +
            "</script>"})
    List<Essay> findLatestVersionEssayByUserIdListCourseIdList(@Param("userIdList") List<Long> userIdList,  @Param("courseIdList") List<Long> courseIdList);
}
