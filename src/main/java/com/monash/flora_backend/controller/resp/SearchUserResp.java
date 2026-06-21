package com.monash.flora_backend.controller.resp;

import com.monash.flora_backend.controller.vo.MdlUserVO;
import lombok.Data;

import java.util.List;

@Data
public class SearchUserResp {
    private List<MdlUserVO> mdlUserVOList;
}
