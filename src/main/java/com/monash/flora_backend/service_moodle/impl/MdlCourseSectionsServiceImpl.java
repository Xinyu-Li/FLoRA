package com.monash.flora_backend.service_moodle.impl;

import cn.hutool.core.util.StrUtil;
import com.baomidou.dynamic.datasource.annotation.DS;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.monash.flora_backend.dao.entity.MdlCourseModules;
import com.monash.flora_backend.dao.entity.MdlCourseSections;
import com.monash.flora_backend.dao.mapper.MdlCourseSectionsMapper;
import com.monash.flora_backend.service_moodle.IMdlCourseModulesService;
import com.monash.flora_backend.service_moodle.IMdlCourseSectionsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

/**
 * <p>
 * to define the sections for each course 服务实现类
 * </p>
 *
 * @author xinyu
 * @since 2023-09-20
 */
@Slf4j
@Service
@RequiredArgsConstructor
@DS("slave_1")
public class MdlCourseSectionsServiceImpl extends ServiceImpl<MdlCourseSectionsMapper, MdlCourseSections> implements IMdlCourseSectionsService {
    private final IMdlCourseModulesService iMdlCourseModulesService;
    @Override
    public String findAllPageIdByCourseId(Long courseId) {
        QueryWrapper<MdlCourseSections> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("course", courseId).orderByAsc("section");
        List<MdlCourseSections> mdlCourseSectionsList = this.list(queryWrapper);
        StringBuilder result = new StringBuilder();

        if (!mdlCourseSectionsList.isEmpty()) {
            //之前 没考虑visible的情况下
//            result.append(mdlCourseSectionsList.stream().map(MdlCourseSections::getSequence).filter(sequence -> !StrUtil.isEmpty(sequence)).collect(Collectors.joining(",")));

            // 以下版本考虑了visible
            List<Long> moduleIdList = new ArrayList<>();
            mdlCourseSectionsList.forEach(mdlCourseSections -> {
                if (!StrUtil.isEmpty(mdlCourseSections.getSequence())) {
                    String[] moduleIdArr = mdlCourseSections.getSequence().split(",");
                    log.info(Arrays.toString(moduleIdArr));
                    moduleIdList.addAll(Arrays.stream(moduleIdArr).map(Long::valueOf).collect(Collectors.toList()));
                }
            });

            Collection<MdlCourseModules> mdlCourseModulesList = iMdlCourseModulesService.listByIds(moduleIdList);
            Set<Long> collect = mdlCourseModulesList.stream().filter(m -> m.getVisible() && m.getModule() == 17).map(MdlCourseModules::getId).collect(Collectors.toSet());

            moduleIdList.forEach(id -> {
                if (collect.contains(id)) {
                    result.append(id).append(",");
                }
            });

//            result.append(mdlCourseModulesList.stream().filter(m -> m.getVisible() && m.getModule()==17).map(m-> m.getId().toString()).collect(Collectors.joining(",")));

            //根据找到section中的sequence，查找ID对应的module，如果类型不是17，则ignore
        }

            if (result.length() > 0) {
                // 只有当result有内容时，才去除最后一个逗号
                return result.substring(0, result.length() - 1);
            } else {
                // 如果result为空，直接返回空字符串或适当的默认值
                return "";
            }
        // return result.toString().substring(0, result.length() - 1);
    }
}
