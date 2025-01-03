package com.monash.flora_backend.util;

import com.monash.flora_backend.config.cache.IGlobalCache;
import com.monash.flora_backend.constant.MyConstant;

public class GenerateLinkCacheHelper {
    public static void initialiseCache(String token, int type, IGlobalCache iGlobalCache){
        iGlobalCache.hset(token, "is-finished", "false", MyConstant.REDIS_LINK_EXPIRE_SECONDS);
        iGlobalCache.hset(token, "num-finished-type", "0", MyConstant.REDIS_LINK_EXPIRE_SECONDS);
        iGlobalCache.hset(token, "num-total-type", String.valueOf(type), MyConstant.REDIS_LINK_EXPIRE_SECONDS);
        iGlobalCache.hset(token, "num-finished-rows", "0", MyConstant.REDIS_LINK_EXPIRE_SECONDS);
        iGlobalCache.hset(token, "num-total-rows", "0", MyConstant.REDIS_LINK_EXPIRE_SECONDS);
        iGlobalCache.hset(token, "processingType", "", MyConstant.REDIS_LINK_EXPIRE_SECONDS);
    }

    public static void updateTypeCache(String token, String processingType, IGlobalCache iGlobalCache){
        iGlobalCache.hset(token, "num-finished-rows", "0", MyConstant.REDIS_LINK_EXPIRE_SECONDS);
        iGlobalCache.hset(token, "num-total-rows", "0", MyConstant.REDIS_LINK_EXPIRE_SECONDS);
        iGlobalCache.hset(token, "processingType", processingType, MyConstant.REDIS_LINK_EXPIRE_SECONDS);
    }
}
