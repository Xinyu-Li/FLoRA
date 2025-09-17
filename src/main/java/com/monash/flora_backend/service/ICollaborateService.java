package com.monash.flora_backend.service;


import cn.hutool.json.JSONArray;
import com.monash.flora_backend.controller.vo.CollaborativePadVO;


public interface ICollaborateService{

    String collaborativeInit(String url, String apiKey);
    //CollaborativePadVO createCollaborativePad(Long userID, String userName, String userGroup);
    CollaborativePadVO createCollaborativePad(String userID, String userName, String userGroup);
    void appendCollaborativeChatMessage(String padId, String message, String authorId);
    void deleteCollaborativePadInfo();

    JSONArray getCollaborativeUsersColor(String padID);
}
