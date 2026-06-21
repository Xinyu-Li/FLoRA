package com.monash.flora_backend.controller.resp;

import com.monash.flora_backend.controller.vo.FileVO;
import lombok.Data;

import java.util.List;

/**
 * @author Xinyu Li
 * @date 3/6/2024
 */
@Data
public class AllStoredFileResp {
    private List<FileVO> fileVOList;
}