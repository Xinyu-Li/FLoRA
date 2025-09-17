package com.monash.flora_backend.controller.vo;

import lombok.Data;

@Data
public class MdlCohortMemberVO {
    private String cohortName;
    private Long userId;
    private String userName;
}
