package com.monash.flora_backend.controller;

import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import com.monash.flora_backend.constant.MyConstant;
import com.monash.flora_backend.constant.MyMoodleConfigConstant;
import com.monash.flora_backend.service_func.FileStorageService;
import com.monash.flora_backend.util.JSONResult;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@Slf4j
@Controller
@AllArgsConstructor
public class VoiceRequestController {

    private final FileStorageService iFileStorageService;
    private final RestTemplate restTemplate;

    @PostMapping("/voice/transcription")
    @ResponseBody
    public JSONResult transcription(
            @RequestParam("voice") MultipartFile voice,
            @RequestParam("saveFolder") String saveFolder
    ) {

        // 使用gpt role 来区分
        log.info("transcription request received:" + voice.getOriginalFilename());

        // save to audio file
        String actualSaveFolder = MyMoodleConfigConstant.FILE_UPLOAD_PATH + File.separator + saveFolder;
        if (voice.isEmpty()) {
            return JSONResult.errorMsg("voice file is empty");
        }

        String completeSavePath;
        try {
            // Create the upload directory if it doesn't exist
            File directory = new File(actualSaveFolder);
            if (!directory.exists()) {
                directory.mkdir();
            }
            completeSavePath = actualSaveFolder + File.separator + voice.getOriginalFilename();
            // Save the file
            File destinationFile = new File(completeSavePath);
//            Files.write(Paths.get(completeSavePath), voice.getBytes());
            voice.transferTo(destinationFile);
            // Log the received IDs
            log.info("Received saveFolder: " + saveFolder);
            log.info("actual saveFolder: " + actualSaveFolder);

        } catch (IOException e) {
            e.printStackTrace();
            return JSONResult.errorMsg("Failed to save the upload file");
        }

        // Todo move to service implementation after creating the table
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        //提交参数设置
        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();

        map.add("myusername", "testusername");
        map.add("mypassword", "testpassword");
        map.add("savePath", completeSavePath);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(map, headers);
        String url = MyConstant.CHAT_SERVICE_URL + "/transcription";
        String result;
        try {
            result = restTemplate.postForObject(url, request, String.class);
            log.warn("speech to text result " + result);
        } catch (Exception e) {
            result = "gpt-error";
        }
//        String chatgptResponseTime = MyUtils.getCurrentTimestamp();

        createTranscriptionLog(result, completeSavePath, voice.getOriginalFilename());
        return JSONResult.ok(result);
    }

    private void createTranscriptionLog(String result, String saveFolder, String saveName) {
        return;
    }

    /**
//     * @param text: The text to verbalise
     * @return The path to access the verbalised mp3 file. It is a uri link, to be used in the audio player.
     */
    @PostMapping("/voice/text-to-speech")
    @ResponseBody
//    public ResponseEntity<byte[]> textToSpeech(
    public ResponseEntity<Resource> textToSpeech(
            @RequestBody Object body
    ) {
        JSONObject jsonObject = JSONUtil.parseObj(body);
        String text = jsonObject.getStr("text");
        String saveFolder = jsonObject.getStr("saveFolder");
        String saveName = jsonObject.getStr("saveName");
        // 使用gpt role 来区分
        log.info("text to speech request received:" + text);

        // save to audio file
        String actualSaveFolder = "F:\\code folder\\Flora\\src\\main\\resources\\static\\flora\\audio_test" + File.separator + saveFolder;
        if (text.isEmpty()) {
            log.error("input text is empty");
//            return ResponseEntity.badRequest().body("".getBytes());
            return ResponseEntity.badRequest().build();
        }

        String completeSavePath;
        // Create the upload directory if it doesn't exist
        File directory = new File(actualSaveFolder);
        if (!directory.exists()) {
            directory.mkdir();
        }
        completeSavePath = actualSaveFolder + File.separator + saveName;

        // Todo move to service implementation after creating the table
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        //提交参数设置
        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();

        map.add("myusername", "testusername");
        map.add("mypassword", "testpassword");
        map.add("savePath", completeSavePath);
        map.add("text", text);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(map, headers);
        String url = MyConstant.CHAT_SERVICE_URL + "/text-to-speech";
        try {
            String result = restTemplate.postForObject(url, request, String.class);
            log.warn(completeSavePath);
            Resource resource = iFileStorageService.loadAsResource(completeSavePath);
            if (resource.exists() || resource.isReadable()) {
                return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + resource.getFilename() + "\"").body(resource);

            } else {
                return ResponseEntity.notFound().build();
            }
//            byte[] transferBack = result.getBytes();
//            log.warn("result of text to speech " + result);
//            HttpHeaders returnHeaders = new HttpHeaders();
//            returnHeaders.setContentType(MediaType.APPLICATION_OCTET_STREAM);
//            returnHeaders.setContentDispositionFormData("attachment", "textToSpeechResult.mp3");
//            createTextToSpeechLog(completeSavePath, text);
//            return JSONResult.ok(transferBack);

//            return new ResponseEntity<>(transferBack, returnHeaders, HttpStatus.OK);
//            return ResponseEntity.ok()
//                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=textToSpeechResult.mp3")
//                    .contentLength(transferBack.length)
//                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
//                    .body(transferBack);
        } catch (Exception e) {
            log.error("text-to-speech error");
//            return ResponseEntity.badRequest().body("".getBytes());
            return ResponseEntity.badRequest().build();
        }
//        String chatgptResponseTime = MyUtils.getCurrentTimestamp();


    }

    private void createTextToSpeechLog(String completeSavePath, String text) {
    }

    @GetMapping("/voice/testingGetAFile")
    public ResponseEntity<Resource> getStaticFile(){
        Resource file = iFileStorageService.loadAsResource("F:\\code folder\\Flora\\src\\main\\resources\\static\\flora\\audio_test\\0_220\\0_22.mp3");
        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
                "attachment; filename=\"" + file.getFilename() + "\"").body(file);

    }

}
