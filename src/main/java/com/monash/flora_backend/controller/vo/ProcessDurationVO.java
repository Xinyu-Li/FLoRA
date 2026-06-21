package com.monash.flora_backend.controller.vo;

import lombok.Data;

/**
 * @author Xinyu Li
 * @date 10/21/2024
 */
@Data
public class ProcessDurationVO {
    private String category;
    private double value;
    private String id;

    public ProcessDurationVO() {}
    public ProcessDurationVO(String category, double value, String id) {
        this.category = category;
        this.value = value;
        this.id = id;
    }
}
