package com.monash.flora_backend.service_func;

import com.monash.flora_backend.config.cache.IGlobalCache;
import com.monash.flora_backend.constant.MyConstant;
import com.monash.flora_backend.constant.MyMoodleConfigConstant;
import com.monash.flora_backend.service.*;
import com.monash.flora_backend.util.exceptions.FileStorageException;
import com.monash.flora_backend.util.exceptions.FileStorageFileNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Date;
import java.util.List;
import java.util.stream.Stream;
import java.util.zip.ZipOutputStream;

import static com.monash.flora_backend.util.FileUtils.zipAFolder;
import static com.monash.flora_backend.util.GenerateLinkCacheHelper.initialiseCache;

@Slf4j
@Service
@RequiredArgsConstructor
public class ExportExcelFileStorageService {
    private final IEssayService iEssayService;
    private final ITraceDataService iTraceDataService;
    private final IAnnotationService iAnnotationService;
    private final IPlannerService iPlannerService;
    private final IGlobalCache iGlobalCache;
    private final IUserChatgptLogService iUserChatgptLogService;
    private final IUserTeacherLogService iUserTeacherLogService;
    private final IRuleBaseCheckGrammarService iRuleBaseCheckGrammarService;
    private final IRuleBaseIntegrationAndElaborationService iRuleBaseIntegrationAndElaborationService;
    private final IRuleBaseOriginalityService iRuleBaseOriginalityService;
    private final IRuleBaseWritingChecklistService iRuleBaseWritingChecklistService;
    private final IDictionaryLogService iDictionaryLogService;

    public String generateZipFile(List<Long> userIdList, List<String> courseIdList, List<Integer> dataItemList) {
        log.info("userIdList:" + userIdList);
        log.info("courseIdList:" + courseIdList);
        FileOutputStream fos;
        ZipOutputStream zos = null;
        File dir;
        try {
            dir = new File(MyMoodleConfigConstant.EXCEL_EXPORT_PATH + File.separator + new Date().toString()
                    .replace(" ", "_").replace("/", "_")
                    .replace(":", "_") + ".zip");
            if (!dir.exists()) {
                dir.createNewFile();
            }
            fos = new FileOutputStream(dir);
            zos = new ZipOutputStream(new BufferedOutputStream(fos));
            for (Integer integer : dataItemList) {
                switch (integer) {
                    case 0:
                        iEssayService.exportEssayToExcelByUserIdListAndCourseIdList(userIdList, courseIdList, zos);
                        break;
                    case 1:
                        iTraceDataService.exportTraceDataToExcelByUserIdListAndCourseIdList(userIdList, courseIdList, zos);
                        break;
                    case 2:
                        iAnnotationService.exportAnnotationToExcelByUserIdListAndCourseIdList(userIdList, courseIdList, zos);
                        break;
                    case 3:
                        iPlannerService.exportPlannerToExcelByUserIdListAndCourseIdList(userIdList, courseIdList, zos);
                        break;
                    case 4:
                        iUserChatgptLogService.exportChatgptLogToExcelByUserIdListAndCourseIdList(userIdList, courseIdList, zos);
                        break;
                    case 5:
                        iUserTeacherLogService.exportTeacherChatLogToExcelByUserIdListAndCourseIdList(userIdList, courseIdList, zos);
                        break;
                    case 6:
                        //TODO 所有数据格式都不全，需要补全
                        // TODO, iRuleBaseCheckGrammarService 由于其中的数据处理逻辑，暂时没有改成用sql语句一次性获取所有数据的版本，
                        iRuleBaseCheckGrammarService.exportCheckGrammarToExcelByUserIdListAndCourseIdList(userIdList, courseIdList, zos);
                        iRuleBaseIntegrationAndElaborationService.exportIntegrationAndElaborationToExcelByUserIdListAndCourseIdList(userIdList, courseIdList, zos);
                        iRuleBaseOriginalityService.exportOriginalityToExcelByUserIdListAndCourseIdList(userIdList, courseIdList, zos);
                        iRuleBaseWritingChecklistService.exportWritingCheckToExcelByUserIdListAndCourseIdList(userIdList, courseIdList, zos);
                        break;
                    case 7:
                        iDictionaryLogService.exportDictionaryToExcelByUserIdListAndCourseIdList(userIdList, courseIdList, zos);
                        break;
                    case 8:
                        iEssayService.exportEssayLogToExcelByUserIdListAndCourseIdList(userIdList, courseIdList, zos);
                        break;
                    default:
                        break;
                }
            }
            return dir.getName();
        } catch (IOException e) {
            log.info("---------------------------");
            e.printStackTrace();
        } finally {
            try {
                if (zos != null) {
                    zos.close();
                }
            } catch (IOException e) {
                log.info("====================================");
                e.printStackTrace();
            }
        }
        return "";
    }

    public String generateZipFile(List<Long> userIdList, List<String> courseIdList, List<Integer> dataItemList, int cutRows, String extraName) {
        log.info("userIdList:" + userIdList);
        log.info("courseIdList:" + courseIdList);
        FileOutputStream fos;
        ZipOutputStream zos = null;
        File dir;
        try {
            dir = new File(MyMoodleConfigConstant.EXCEL_EXPORT_PATH + File.separator + extraName + new Date().toString()
                    .replace(" ", "_").replace("/", "_")
                    .replace(":", "_") + ".zip");
            if (!dir.exists()) {
                dir.createNewFile();
            }
            fos = new FileOutputStream(dir);
            zos = new ZipOutputStream(new BufferedOutputStream(fos));
            for (Integer integer : dataItemList) {
                switch (integer) {
                    case 0:
                        iEssayService.exportEssayToExcelByUserIdListAndCourseIdList(userIdList, courseIdList, zos, cutRows);
                        break;
                    case 1:
                        iTraceDataService.exportTraceDataToExcelByUserIdListAndCourseIdList(userIdList, courseIdList, zos, cutRows);
                        break;
                    case 2:
                        iAnnotationService.exportAnnotationToExcelByUserIdListAndCourseIdList(userIdList, courseIdList, zos, cutRows);
                        break;
                    case 3:
                        iPlannerService.exportPlannerToExcelByUserIdListAndCourseIdList(userIdList, courseIdList, zos, cutRows);
                        break;
                    case 4:
                        iUserChatgptLogService.exportChatgptLogToExcelByUserIdListAndCourseIdList(userIdList, courseIdList, zos, cutRows);
                        break;
                    case 5:
                        iUserTeacherLogService.exportTeacherChatLogToExcelByUserIdListAndCourseIdList(userIdList, courseIdList, zos, cutRows);
                        break;
                    case 6:
                        //TODO 所有数据格式都不全，需要补全
                        iRuleBaseCheckGrammarService.exportCheckGrammarToExcelByUserIdListAndCourseIdList(userIdList, courseIdList, zos, cutRows);
                        iRuleBaseIntegrationAndElaborationService.exportIntegrationAndElaborationToExcelByUserIdListAndCourseIdList(userIdList, courseIdList, zos, cutRows);
                        iRuleBaseOriginalityService.exportOriginalityToExcelByUserIdListAndCourseIdList(userIdList, courseIdList, zos, cutRows);
                        iRuleBaseWritingChecklistService.exportWritingCheckToExcelByUserIdListAndCourseIdList(userIdList, courseIdList, zos, cutRows);
                        break;
                    case 7:
                        iDictionaryLogService.exportDictionaryToExcelByUserIdListAndCourseIdList(userIdList, courseIdList, zos, cutRows);
                        break;
                    case 8:
                        iEssayService.exportEssayLogToExcelByUserIdListAndCourseIdList(userIdList, courseIdList, zos, cutRows);
                        break;
                    default:
                        break;

                }
            }
            return dir.getName();
        } catch (IOException e) {
            log.info("---------------------------");
            e.printStackTrace();
        } finally {
            try {
                if (zos != null) {
                    zos.close();
                }
            } catch (IOException e) {
                log.info("====================================");
                e.printStackTrace();
            }
        }
        return "";
    }

    public List<String> generateZipFile(List<Long> userIdList, List<String> courseIdList, List<Integer> dataItemList, int cutRows, String extraName, String token) {
        log.info("userIdList:" + userIdList);
        log.info("courseIdList:" + courseIdList);

        try {
            int finishedService = 0;
            String dateString = new Date().toString()
                    .replace(" ", "_").replace("/", "_")
                    .replace(":", "_");
            String folderPath = MyMoodleConfigConstant.EXCEL_EXPORT_PATH + File.separator + dateString;
            // create the folder for holding the excel files
            Path path = Paths.get(folderPath);
            if (!Files.exists(path)) {
                Files.createDirectories(path);
            }

            for (Integer integer : dataItemList) {
                switch (integer) {
                    case 0:
                        iEssayService.exportEssayToExcelByUserIdListAndCourseIdList(userIdList, courseIdList, cutRows, token, dateString);
                        break;
                    case 1:
                        iTraceDataService.exportTraceDataToExcelByUserIdListAndCourseIdList(userIdList, courseIdList, cutRows, token, dateString);
                        break;
                    case 2:
                        iAnnotationService.exportAnnotationToExcelByUserIdListAndCourseIdList(userIdList, courseIdList, cutRows, token, dateString);
                        break;
                    case 3:
                        iPlannerService.exportPlannerToExcelByUserIdListAndCourseIdList(userIdList, courseIdList, cutRows, token, dateString);
                        break;
                    case 4:
                        iUserChatgptLogService.exportChatgptLogToExcelByUserIdListAndCourseIdList(userIdList, courseIdList, cutRows, token, dateString);
                        break;
                    case 5:
                        iUserTeacherLogService.exportTeacherChatLogToExcelByUserIdListAndCourseIdList(userIdList, courseIdList, cutRows, token, dateString);
                        break;
                    case 6:
                        //TODO 所有数据格式都不全，需要补全
                        iRuleBaseCheckGrammarService.exportCheckGrammarToExcelByUserIdListAndCourseIdList(userIdList, courseIdList, cutRows, token, dateString);
                        iRuleBaseIntegrationAndElaborationService.exportIntegrationAndElaborationToExcelByUserIdListAndCourseIdList(userIdList, courseIdList, cutRows, token, dateString);
                        iRuleBaseOriginalityService.exportOriginalityToExcelByUserIdListAndCourseIdList(userIdList, courseIdList, cutRows, token, dateString);
                        iRuleBaseWritingChecklistService.exportWritingCheckToExcelByUserIdListAndCourseIdList(userIdList, courseIdList, cutRows, token, dateString);
                        break;
                    case 7:
                        iDictionaryLogService.exportDictionaryToExcelByUserIdListAndCourseIdList(userIdList, courseIdList, cutRows, token, dateString);
                        break;
                    case 8:
                        iEssayService.exportEssayLogToExcelByUserIdListAndCourseIdList(userIdList, courseIdList, cutRows, token, dateString);
                        break;
                    default:
                        break;
                }
                finishedService += 1;
                iGlobalCache.hset(token, "num-finished-type", String.valueOf(finishedService), MyConstant.REDIS_LINK_EXPIRE_SECONDS);
            }
            return zipAFolder(folderPath, MyMoodleConfigConstant.EXCEL_EXPORT_PATH, dateString + ".zip");
        } catch (IOException e) {
            log.info("---------------------------");
            e.printStackTrace();
        }
        return null;
    }

    public String generateZipFile(List<Long> userIdList, List<String> courseIdList, List<Integer> dataItemList, int cutRows) {
        // 稍微重构了一下generateZipFile，现在能够添加额外的文字在文件名上
        return generateZipFile(userIdList, courseIdList, dataItemList, cutRows, "");
    }

    @Async("asyncPoolTaskExecutor")
    public void asyncGenerateZipFile(String adminId, List<Long> userIdList, List<String> courseIdList, List<Integer> dataItemList, int cutRows, String token) {
        initialiseCache(token, dataItemList.size(), iGlobalCache);
        List<String> zipNameList = generateZipFile(userIdList, courseIdList, dataItemList, cutRows, "", token);
        iGlobalCache.hset(token, "is-finished", "true", MyConstant.REDIS_LINK_EXPIRE_SECONDS);
        iGlobalCache.hset(token, "num-finished-type", iGlobalCache.hget(token, "num-total-type").toString(), MyConstant.REDIS_LINK_EXPIRE_SECONDS);
        iGlobalCache.hset(token, "num-finished-rows", iGlobalCache.hget(token, "num-total-rows").toString(), MyConstant.REDIS_LINK_EXPIRE_SECONDS);
        iGlobalCache.hset(token, "download-links", String.join("|!|", zipNameList), MyConstant.REDIS_LINK_EXPIRE_SECONDS);

        for (String zipName : zipNameList) {
            // 将生成的文件名放进redis的缓存
            iGlobalCache.rSet(adminId + MyConstant.cachedLinkKeyListName, zipName, MyConstant.REDIS_LINK_EXPIRE_SECONDS);
            // 这个是用来让缓存超时的
            iGlobalCache.set(zipName, zipName, MyConstant.REDIS_LINK_EXPIRE_SECONDS);
            log.info("caching finished");
        }
    }

    public void store(MultipartFile file) {
        try {
            Path rootLocation = Paths.get(MyMoodleConfigConstant.EXCEL_EXPORT_PATH);
            if (file.isEmpty()) {
                log.info("file is empty:" + file.getOriginalFilename());
                throw new FileStorageException("Failed to store empty file.");
            }
            Path destinationFile = rootLocation.resolve(
                            Paths.get(file.getOriginalFilename()))
                    .normalize().toAbsolutePath();
            if (!destinationFile.getParent().equals(rootLocation.toAbsolutePath())) {
                // This is a security check
                throw new FileStorageException(
                        "Cannot store file outside current directory.");
            }
            try (InputStream inputStream = file.getInputStream()) {
                Files.copy(inputStream, destinationFile,
                        StandardCopyOption.REPLACE_EXISTING);
            }
        } catch (IOException e) {
            throw new FileStorageException("Failed to store file.", e);
        }
    }

    public Stream<Path> loadAll() {
        try {
            Path rootLocation = Paths.get(MyMoodleConfigConstant.EXCEL_EXPORT_PATH);
            log.info("-------------loadall rootlocation:" + rootLocation);
            return Files.walk(rootLocation, 1)
                    .filter(path -> !path.equals(rootLocation))
                    .map(rootLocation::relativize);
        } catch (IOException e) {
            throw new FileStorageException("Failed to read stored files", e);
        }

    }

    public Path load(String filename) {
        Path rootLocation = Paths.get(MyMoodleConfigConstant.EXCEL_EXPORT_PATH);
        return rootLocation.resolve(filename);
    }

    public Resource loadAsResource(String filename) {
        try {
            Path file = load(filename);
            Resource resource = new UrlResource(file.toUri());
            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new FileStorageFileNotFoundException(
                        "Could not read file: " + filename);

            }
        } catch (MalformedURLException e) {
            throw new FileStorageFileNotFoundException("Could not read file: " + filename, e);
        }
    }

    public void deleteAll() {
        Path rootLocation = Paths.get(MyMoodleConfigConstant.EXCEL_EXPORT_PATH);
        FileSystemUtils.deleteRecursively(rootLocation.toFile());
    }

    public void init() {
        try {
            Path rootLocation = Paths.get(MyMoodleConfigConstant.EXCEL_EXPORT_PATH);
            Files.createDirectories(rootLocation);
        } catch (IOException e) {
            throw new FileStorageException("Could not initialize storage", e);
        }
    }
}
