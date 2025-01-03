package com.monash.flora_backend.service.impl;


import cn.hutool.json.JSONArray;
import cn.hutool.json.JSONUtil;
import com.monash.flora_backend.controller.vo.CollaborativePadVO;
import com.monash.flora_backend.service.ICollaborateService;
import com.monash.flora_backend.util.CaffeineCacheService;
import lombok.extern.slf4j.Slf4j;
import net.gjerull.etherpad.client.EPLiteClient;
import org.json.simple.parser.JSONParser;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.*;

@Slf4j
@Service
public class CollaborateServiceImpl implements ICollaborateService {

    private EPLiteClient client;

    public String collaborativeInit(String url, String apiKey) {
        client = new EPLiteClient(url, apiKey);
        return client.createAuthor("chatgpt").get("authorID").toString();
    }

    public CollaborativePadVO createCollaborativePad(String userID, String userName, String userGroup){
            //Long userID, String userName, String userGroup) {
        //EPLiteClient client = new EPLiteClient(url, apiKey);
        log.info("userName createAuthorIfNotExistsFor: "+userName);
        String authorID = client.createAuthorIfNotExistsFor(userID.toString(), userName).get("authorID").toString();
        String groupID = client.createGroupIfNotExistsFor(userGroup).get("groupID").toString(); // 如何对用户进行分组，获取分组id
        String padName = userGroup + "_group_pad"; // 分组名如何构建
        String padID; // 找一下padName的存储逻辑
//        Map result = client.listAllPads();
//        client.deletePad("PUiAHT9LPP5SuV1nbZFh");
//        client.deletePad("undefined");
//        Map result1 = client.listAllPads();
//        g.EZBcVO6kyCIrTC8A$Admin_dev_pad

        Map result = client.listAllPads();
        List<String> padIds = (List) result.get("padIDs");
        String searchPadId = groupID + "$" + padName;
        if (padIds.contains(searchPadId)){
            padID = searchPadId;
            CaffeineCacheService.put(groupID, padID);
        }
        else{
            if (CaffeineCacheService.containsKey(groupID)) {
                padID = CaffeineCacheService.get(groupID);
            }else {
                padID = client.createGroupPad(groupID, padName).get("padID").toString();
                //client_respose = client.createGroupPad(groupID, padName);
                //System.out.println("===============client_respose: ",client_respose);
                //padID = client_respose.get("padID").toString();
                CaffeineCacheService.put(groupID, padID);
            }
        }

//        if (CaffeineCacheService.containsKey(groupID)) {
//            padID = CaffeineCacheService.get(groupID);
//        }else {
//
//            padID = client.createGroupPad(groupID, padName).get("padID").toString();
//            CaffeineCacheService.put(groupID, padID);
//        }
        log.info("padID:" + padID);
//        ConcurrentMap<String, String> map = CaffeineCacheService.getAll();
        String sessionID;
        if (CaffeineCacheService.containsAuthor(authorID)) {
            sessionID = CaffeineCacheService.getAuthor(authorID);
            log.info("CaffeineCacheService.containsAuthor is true, sessionID is" + sessionID);
            long currentUnixtimestamp = System.currentTimeMillis()/1000;
            Map sessionInfo_response = client.getSessionInfo(sessionID);
            if (sessionInfo_response!=null){
                long validUntil = ((Number) sessionInfo_response.get("validUntil")).longValue();
                if (validUntil < currentUnixtimestamp){
                    client.deleteSession(sessionID);
                    sessionID = client.createSession(groupID, authorID, 2).get("sessionID").toString();
                    CaffeineCacheService.putAuthor(authorID, sessionID);
                    log.info("sessionID in cookies is invalid, create a new one: " + sessionID);
                }
                else{
                    log.info("sessionID in cookies is valid: " + sessionID);
                }
            }
            else{
                sessionID = client.createSession(groupID, authorID, 2).get("sessionID").toString();
                CaffeineCacheService.putAuthor(authorID, sessionID);
                log.info("sessionID in cookies is invalid, create a new one: " + sessionID);
            }

        }
        else {
            sessionID = client.createSession(groupID, authorID, 2).get("sessionID").toString();
            CaffeineCacheService.putAuthor(authorID, sessionID);
            log.info("CaffeineCacheService.containsAuthor is false, get a new sessionID" + sessionID);
        }
        CollaborativePadVO collaborativePadVO = new CollaborativePadVO();
        collaborativePadVO.setAuthorID(authorID);
        collaborativePadVO.setGroupID(groupID);
        collaborativePadVO.setPadName(padName);
        collaborativePadVO.setPadID(padID);
        collaborativePadVO.setSessionID(sessionID);
// Create pad and set text
//        client.createPad("my_pad");
//        client.setText("my_pad", "foo!!");

// Get pad text
//        String text = client.getText("my_pad").get("text").toString();

// Get list of all pad ids
//        Map result = client.listAllPads();
//        List padIds = (List) result.get("padIDs");
        return collaborativePadVO;
    }

    public void appendCollaborativeChatMessage(String padId, String message, String authorId) {
        log.info("ready to appendChatMessage!");
        Map sendMsgResponse= client.appendChatMessage(padId, message, authorId);
        if (!sendMsgResponse.isEmpty()){
            if (sendMsgResponse.get("code") != null) {
                int code = ((Long)sendMsgResponse.get("code")).intValue();
                if (code==0){
                    log.info("Message from " + authorId + " sent successfully: "+message);
                }
                else{
                    log.info("Message from " + authorId + " not sent : "+message);
                }
            }
            else{
                log.info("code returned by Etherppad appendChatMessage is null");
            }
        }
        else{
            log.info("Response for Etherpad appendChatMessage is null");
        }

    }
//    public void appendCollaborativeChatMessage(String padId, String author_name, String message, String authorId) {
//        client.appendChatMessage(padId, message, authorId);
//    }

    public void deleteCollaborativePadInfo() {
        Map<String, String> padInfoMap = CaffeineCacheService.getAllPadName();
        padInfoMap.forEach((key, value) -> {
            client.deleteGroup(key);
            client.deletePad(value);
        });
    }

    public JSONArray getCollaborativeUsersColor(String padID) {
        String res = client.padUsers(padID).get("padUsers").toString();
        return JSONUtil.parseArray(res);
    }
}
