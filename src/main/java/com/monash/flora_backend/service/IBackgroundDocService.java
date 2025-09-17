package com.monash.flora_backend.service;

import com.monash.flora_backend.controller.vo.BackgroundDocVO;
import lombok.SneakyThrows;

import java.util.List;
import java.util.Map;

public interface IBackgroundDocService {

    List<BackgroundDocVO> findByCourseId(Long userId);

    @SneakyThrows
    //boolean save(BackgroundDocVO backgroundDocVO);
    boolean saveDocuments(List<BackgroundDocVO> backgroundDocVOList);
    List<Map<String, Object>> searchKEYWORD(String courseId,String keyword);

//    Map<String, List<BackgroundDocService.KeywordSegment>> search(Long userId, String keyword);

}
