package com.monash.flora_backend.controller.resp;

import com.monash.flora_backend.controller.vo.CourseOverviewVO;
import lombok.Data;

import java.util.List;

@Data
public class OverviewDataForCourseResp {
    private List<CourseOverviewVO> courseOverviewList;
}
