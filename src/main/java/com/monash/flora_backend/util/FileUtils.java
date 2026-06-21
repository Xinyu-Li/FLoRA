package com.monash.flora_backend.util;

import com.monash.flora_backend.constant.MyConstant;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;
import java.util.ArrayList;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import static com.monash.flora_backend.constant.MyConstant.MAX_ZIP_SIZE;

public class FileUtils {


    public static String getText(String filename, String path){
        StringBuilder content = new StringBuilder();
        try(
            BufferedReader reader = new BufferedReader(new InputStreamReader(new FileInputStream(path+filename), StandardCharsets.UTF_8));
                //BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(new FileOutputStream("./resource/touching.csv"), "GBK"));
        ){
            String text;
            while ((text = reader.readLine()) != null){
                content.append(text);
            }
        }catch (IOException e) {
            e.printStackTrace();
        }
        return content.toString();
    }

    public static void writeText(String content, String filename, String path){
        try (
           BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(path+filename), StandardCharsets.UTF_8));
        ){
            writer.write(content);
        }catch (IOException e){
            e.printStackTrace();
        }
    }

    public static void writeObj(Object obj, String filename, String path) throws IOException {
        ObjectOutputStream ots = new ObjectOutputStream(new FileOutputStream(path + filename));
        ots.writeObject(obj);
    }

    public static Object readObj(String filename, String path) throws IOException, ClassNotFoundException {
        FileInputStream is = new FileInputStream(path + filename);
        System.out.println(is);
        ObjectInputStream ois = new ObjectInputStream(new FileInputStream(path + filename));
        return ois.readObject();
    }

    public static void writeToZip(ZipOutputStream zos, byte[] stream, String fileName) throws IOException {
        System.out.println(fileName);
        //创建ZIP实体，并添加进压缩包
        ZipEntry zipEntry = new ZipEntry(fileName);
        zos.putNextEntry(zipEntry);
        //读取待压缩的文件并写进压缩包里
        zos.write(stream);
    }
    public static void writeToExcel(byte[] stream, Path fileName) throws IOException {
        System.out.println(fileName);
        Files.write(fileName, stream, StandardOpenOption.CREATE, StandardOpenOption.WRITE);
    }

    /**
     * This method zips all generated execl file and return the name of the zip file for download
     * @param folderToZip
     * @param saveFolderPath
     * @param zipFileName
     * @return the filename list of zipped file for downloading
     * @throws IOException
     */
    public static List<String> zipAFolder(String folderToZip, String saveFolderPath, String zipFileName) throws IOException {
        String zipFilePath = saveFolderPath + File.separator + zipFileName;
        File folderToZipFile = new File(folderToZip);
        File zipFile = new File(zipFilePath);
        FileOutputStream fos = new FileOutputStream(zipFile);
        ZipOutputStream zos = new ZipOutputStream(fos);
        List<String> downloadLinks = new ArrayList<>();

        String zipFileNameForRecording = zipFileName;
        try {
            int zipCounter = 1;
            long currentSize = 0;
            File[] files = folderToZipFile.listFiles();
            if (files != null) {
                for (File file : files) {
                    if (currentSize + file.length() > MAX_ZIP_SIZE) {
                        zos.close();
                        downloadLinks.add(zipFileNameForRecording);    // add the file to the downloadLink list
                        zipCounter++;
                        zipFileNameForRecording = zipFileName.replace(".zip", "_" + zipCounter + ".zip");
                        zipFile = new File(saveFolderPath + File.separator + zipFileNameForRecording);
                        fos = new FileOutputStream(zipFile);
                        zos = new ZipOutputStream(fos);
                        currentSize = 0;
                    }
                    addToZipFile(file, zos);
                    currentSize += file.length();
                }
            }
        } finally {
            zos.close();
            downloadLinks.add(zipFileNameForRecording);    // add the file to the downloadLink list
        }
        // clean the folder that holds the execl files
        org.apache.tomcat.util.http.fileupload.FileUtils.deleteDirectory(folderToZipFile);

        return downloadLinks;
    }

    private static void addToZipFile(File file, ZipOutputStream zos) throws IOException {
        try (FileInputStream fis = new FileInputStream(file)) {
            ZipEntry zipEntry = new ZipEntry(file.getName());
            zos.putNextEntry(zipEntry);
            byte[] bytes = new byte[1024];
            int length;
            while ((length = fis.read(bytes)) >= 0) {
                zos.write(bytes, 0, length);
            }
            zos.closeEntry();
        }
    }



}
