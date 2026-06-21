package com.monash.flora_backend.controller.resp;

import com.monash.flora_backend.controller.vo.MdlCourseCategoriesVO;
import com.monash.flora_backend.controller.vo.MdlCourseVO;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class AllCourseAndCategoryResp {

    private List<MdlCourseCategoriesVO> mdlCourseCategoriesVOList;
    private List<MdlCourseVO> mdlCourseVOList;
    private Map<Long, List<MdlCourseVO>> mdlCourseVOMap;

}
