package com.monash.flora_backend.util;

import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;

import java.util.concurrent.ConcurrentMap;
import java.util.concurrent.TimeUnit;

public class CaffeineCacheService {
    static Cache<String, String> padNameCache = Caffeine.newBuilder()
            .initialCapacity(100)//初始大小
            .maximumSize(300)//最大数量
            .expireAfterWrite(1, TimeUnit.DAYS)//数据过期时间
            .build();

    static Cache<String, String> authorNameCache = Caffeine.newBuilder()
            .initialCapacity(100)//初始大小
            .maximumSize(300)//最大数量
            .expireAfterWrite(1, TimeUnit.DAYS)//数据过期时间
            .build();

    public static void putAuthor(String key, String value) {
        authorNameCache.put(key, value);
    }

    public static String getAuthor(String key) {
        return authorNameCache.getIfPresent(key);
    }

    public static Boolean containsAuthor(String key) {
        return authorNameCache.getIfPresent(key) == null ? false : true;
    }

    public static void put(String key, String value) {
        padNameCache.put(key, value);
    }

    public static String get(String key) {
        return padNameCache.getIfPresent(key);
    }

    public static Boolean containsKey(String key) {
        return padNameCache.getIfPresent(key) == null ? false : true;
    }

    public static ConcurrentMap<String, String> getAllPadName() {
        return padNameCache.asMap();
    }

    public static ConcurrentMap<String, String> getAllAuthor() {
        return authorNameCache.asMap();
    }
}
