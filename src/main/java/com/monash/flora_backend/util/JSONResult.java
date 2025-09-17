package com.monash.flora_backend.util;

import lombok.Data;

@Data
public class JSONResult {
    private Integer status;
    private String msg;
    private Object data;
    private String ok;

    public static JSONResult ok(Object data) {
        return new JSONResult(data);
    }

    public static JSONResult ok() {
        return new JSONResult(null);
    }

    public static JSONResult errorMsg(String msg) {
        return new JSONResult(500, msg, null);
    }

    public JSONResult() {}

//    public JSONResult(Integer status, String msg, Object data, String ok) {
//        this.status = status;
//        this.msg = msg;
//        this.data = data;
//        this.ok = ok;
//    }

    public JSONResult(Integer status, String msg, Object data) {
        this.status = status;
        this.msg = msg;
        this.data = data;
    }

    public JSONResult(Object data) {
        this.status = 200;
        this.msg = "OK";
        this.data = data;
    }

    public Boolean isOK() {
        return this.status == 200;
    }



}
