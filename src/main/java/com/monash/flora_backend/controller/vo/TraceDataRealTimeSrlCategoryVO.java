package com.monash.flora_backend.controller.vo;

import lombok.Data;

import java.util.List;

@Data
public class TraceDataRealTimeSrlCategoryVO {
    private List<ProcessDurationVO> currentDurationVOList;
    private List<ProcessDurationVO> previousDurationVOList;
}
