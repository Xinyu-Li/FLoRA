package com.monash.flora_backend.dao.mapper;

import com.monash.flora_backend.controller.vo.RuleBaseWritingChecklistVO;
import com.monash.flora_backend.dao.entity.RuleBaseWritingChecklist;
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
 * @since 2023-05-22
 */
public interface RuleBaseWritingChecklistMapper extends BaseMapper<RuleBaseWritingChecklist> {
    @Select({"<script>" +
            "select * from rule_base_writing_checklist where course_id in " +
            "<foreach item='item' index='index' collection='courseIdList' open='(' separator=',' close=')'>" +
            "#{item}" +
            "</foreach>" +
//                    "(#{courseIdList, typeHandler=com.monash.flora_backend.controller.handler.ListLongHandler}) " +
            "and user_id in " +
            "<foreach item='item' index='index' collection='userIdList' open='(' separator=',' close=')'>" +
            "#{item}" +
            "</foreach>" +
//                    "(#{userIdList, typeHandler=com.monash.flora_backend.controller.handler.ListLongHandler}) " +
            "order by user_id and check_time" +
            "</script>"})
    List<RuleBaseWritingChecklistVO> findRuleBaseWritingChecklistByUserIdListCourseIdList(@Param("userIdList") List<Long> userIdList, @Param("courseIdList") List<Long> collect);
}
