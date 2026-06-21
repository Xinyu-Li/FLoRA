package com.monash.flora_backend.service_func;

import com.monash.flora_backend.constant.MyMoodleConfigConstant;
import com.monash.flora_backend.util.exceptions.FileStorageException;
import com.monash.flora_backend.util.exceptions.FileStorageFileNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;
import java.util.stream.Stream;

/**
 * @author Xinyu Li
 * @date 3/6/2024
 */
@Slf4j
@Service
public class FileStorageService {

    public void store(MultipartFile file) {
        try {
            Path rootLocation = Paths.get(MyMoodleConfigConstant.EXCEL_EXPORT_PATH);
            if (file.isEmpty()) {
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
        }
        catch (IOException e) {
            throw new FileStorageException("Failed to store file.", e);
        }
    }


    public void store(MultipartFile file, String courseId) {
        try {
            String fileName = file.getOriginalFilename() == null ? UUID.randomUUID().toString() : file.getOriginalFilename();
            File path = new File(MyMoodleConfigConstant.EXCEL_EXPORT_PATH + "/" +  courseId, fileName);
            if (!path.exists()) {
                boolean mkdirs = path.mkdirs();
                log.info("create folder for course:" + mkdirs);
            }
            file.transferTo(path);
            log.info("## 保存文件成功，路径={}}", path.getPath());
        } catch (IOException e) {
            e.printStackTrace();
            log.info("## 保存文件失败，{}", e.getMessage());
        }
    }



    public Stream<Path> loadAll() {
        try {
            Path rootLocation = Paths.get(MyMoodleConfigConstant.EXCEL_EXPORT_PATH);
            log.info("-------------loadall rootlocation:" + rootLocation);
            return Files.walk(rootLocation, 1)
                    .filter(path -> !path.equals(rootLocation))
                    .map(rootLocation::relativize);
        }
        catch (IOException e) {
            throw new FileStorageException("Failed to read stored files", e);
        }

    }


    public Stream<Path> loadAll(String rootPath, String dirPath) {
        try {
            Path rootLocation = Paths.get(rootPath, dirPath);
            log.info("-------------loadall rootlocation:" + rootLocation);
            if (rootLocation.toFile().isDirectory()){
                return Files.walk(rootLocation, 1)
                        .filter(path -> !path.equals(rootLocation))
                        .map(rootLocation::relativize);
            }else {
                return null;
            }
        }
        catch (IOException e) {
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
            }
            else {
                throw new FileStorageFileNotFoundException(
                        "Could not read file: " + filename);
            }
        }
        catch (MalformedURLException e) {
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
        }
        catch (IOException e) {
            throw new FileStorageException("Could not initialize storage", e);
        }
    }
}
