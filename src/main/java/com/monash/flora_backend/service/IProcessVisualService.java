// IProcessVisualService.java
package com.monash.flora_backend.service;

public interface IProcessVisualService {
    // 定义获取实时数据的方法
    String getRealTimeData(Long userId, String courseId);
}
