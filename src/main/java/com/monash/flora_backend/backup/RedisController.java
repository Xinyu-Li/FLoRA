package com.monash.flora_backend.backup;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RestController;

/**
 * install redis image:
 * 1. docker pull redis
 * 2. docker images
 *
 * create redis container
 * 3. docker run -it --name redis-container -d redis
 *
 * Redis container is created, you can check it with the following command:
 * 4. docker ps
 * 5. docker logs redis-container
 *
 * Connect to Redis Conainer
 * 6. docker exec -it redis-container bash
 * 7. redis-cli
 *
 * Stop docker container
 * 8. docker stop redis-container
 *
 * 然后修改redis.conf
 *
 * bind 127.0.0.1 # 注释掉这部分，否则只能本地访问
 * protected-mode no # 不开启保护模式，否则只能本地访问
 * appendonly yes # 使redis持久化
 *
 *
 * -p 6379:6379：端口映射，前面是宿主机，后面是容器。
 * –name redis：指定该容器名称。
 * -v 挂载文件或目录：前面是宿主机，后面是容器。
 * -d redis redis-server /etc/redis/redis.conf：表示后台启动redis，以配置文件启动redis，加载容器内的conf文件。
 * appendonly yes：开启redis 持久化。
 * daemonize no # 默认no 为不守护进程模式，docker部署不需要改为yes，docker run -d本身就是后台启动，不然会冲突
 *
 * docker run --name redis-container -p 6379:6379 -v C:/develop/docker-data/redis/redis.conf:/usr/local/etc/redis.conf -d redis redis-server /usr/local/etc/redis.conf --appendonly yes
 */

@Slf4j
@RestController
@AllArgsConstructor
public class RedisController {

//    private final IGlobalCache globalCache;
//    private final IAsyncTaskService iAsyncTaskService;

//    @GetMapping("/redis-test")
//    public JSONResult redisTest() {
//        globalCache.set("key2", "value3");
//        globalCache.lSetAll("list", Arrays.asList("hello", "redis"));
//        List<Object> list = globalCache.lGet("list", 0, -1);
//        log.info(String.valueOf(globalCache.get("key2")));
//
//        return JSONResult.ok();
//    }
//
//    @PostMapping("/save-to-redis")
//    public JSONResult saveDataToRedis(@RequestParam("key") String key, @RequestParam("value") String value) {
//
//        iAsyncTaskService.saveKeyValueDataToRedis(key, value);
//
//        return JSONResult.ok();
//    }
}
