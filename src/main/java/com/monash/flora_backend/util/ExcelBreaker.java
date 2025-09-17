package com.monash.flora_backend.util;

import com.google.common.collect.Lists;
import com.monash.flora_backend.config.cache.IGlobalCache;
import com.monash.flora_backend.constant.MyMoodleConfigConstant;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.zip.ZipOutputStream;

import static com.monash.flora_backend.constant.MyConstant.CUT_ROW;
import static com.monash.flora_backend.constant.MyConstant.UPDATE_CACHE_MILSEC;

public class ExcelBreaker {


    private final String saveName;
    private final ZipOutputStream zos;
    private int count;
    private int part;
    private final int cutRow;
    private final String token;
    private final String dateString;
    private List<List<Object>> allData;
    Long startTime = System.currentTimeMillis();
    List<List<String>> allHead;
    public ExcelBreaker(int cutRow, String saveName, List<List<String>> allHead, ZipOutputStream zos) {
        this.part = 1;
        this.count = 0;
        this.cutRow = cutRow;
        this.saveName = saveName;
        this.zos = zos;
        this.token = "";
        this.allData = Lists.newArrayList();
        this.allHead = allHead;
        this.dateString = "";
    }
    public ExcelBreaker(int cutRow, String saveName, List<List<String>> allHead, String token, String dateString) {
        this.part = 1;
        this.count = 0;
        this.cutRow = cutRow;
        this.saveName = saveName;
        this.token = token;
        this.zos = null;
        this.allData = Lists.newArrayList();
        this.allHead = allHead;
        this.dateString = dateString;
    }
    public List<List<Object>> getAllData() {
        return allData;
    }
    public void resetAllData() {
        this.allData = Lists.newArrayList();
    }
    public void increaseCount(int value){
        this.count += value;
    }

    public void increasePart(int value){
        this.part += value;
    }

    public boolean toBreak(){
        return this.count >= this.cutRow;
    }

    public void tryUpdateParamsAndSave(){
        if(toBreak()) {
            this.resetCount();
            try {
                this.saveExcelToZip();
                this.resetAllData();
                this.increasePart(1);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
    }

    public void tryUpdateParamsAndSaveToExcel(){
        if(toBreak()) {
            this.resetCount();
            try {
                this.saveExcelToFile();
                this.resetAllData();
                this.increasePart(1);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
    }

    public void resetCount() {this.count = 0;}
    public int getCount() {
        return count;
    }

    public int getPart() {
        return part;
    }

    public void tryUpdateCache(IGlobalCache iGlobalCache){
        if ((System.currentTimeMillis() - this.startTime) > UPDATE_CACHE_MILSEC){
            iGlobalCache.hset(this.token, "num-finished-rows", String.valueOf(CUT_ROW * (this.part - 1) + this.count));
        }
    }

    public void saveExcelToZip() throws IOException {
        byte[] stream = DynamicEasyExcelExportUtil.customerExportExcelFile(this.allHead, this.allData);
        // 写入zip
        FileUtils.writeToZip(this.zos, stream, this.saveName + "_p" + this.part + ".xlsx");
    }
    public void saveExcelToFile() throws IOException {
        byte[] stream = DynamicEasyExcelExportUtil.customerExportExcelFile(this.allHead, this.allData);
        Path path = Paths.get(MyMoodleConfigConstant.EXCEL_EXPORT_PATH + File.separator + this.dateString + File.separator + this.saveName + "_p" + this.part + ".xlsx");
        // 写入excel
        FileUtils.writeToExcel(stream, path);
    }
}
