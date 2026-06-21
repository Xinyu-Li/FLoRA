package com.monash.flora_backend.controller.req;

import lombok.Data;

import java.util.List;

@Data
public class SearchUserReq {
    private List<Long> categoryIdList; //默认是空，可以是多个
    private List<Long> courseIdList;  //默认是空, 可以是多个
    private String usernamePattern; //默认是 ""，模糊匹配
    private String startTime; //默认是""
    private String endTime;   //默认是""
}
