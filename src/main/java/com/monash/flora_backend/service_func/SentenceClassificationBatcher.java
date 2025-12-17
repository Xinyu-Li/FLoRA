package com.monash.flora_backend.service_func;

import com.monash.flora_backend.service.IUserChatgptLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.*;
import java.util.concurrent.locks.ReentrantLock;
import java.util.stream.Collectors;

@Component
public class SentenceClassificationBatcher {
    private final int batchSize;      // 例如 50 句
    private final long maxWaitMs;      // 例如 200 ms
    private final ExecutorService httpPool;         // 发 HTTP 的线程池
    private final ScheduledExecutorService timer;   // 定时触发
    private final IUserChatgptLogService iUserChatgptLogService;   // 调用后端的接口

    private static class Pending {
        final String sentence;
        final CompletableFuture<List<String>> future;
        Pending(String s, CompletableFuture<List<String>> f){ sentence=s; future=f; }
    }
    private final List<Pending> bucket   = new ArrayList<>();
    private final ReentrantLock lock     = new ReentrantLock();

    @Autowired
    public SentenceClassificationBatcher(@Value("${batch.size:50}") int batchSize, @Value("${batch.wait:500}") long maxWaitMs, IUserChatgptLogService iUserChatgptLogService){

        this.batchSize = batchSize;
        this.maxWaitMs = maxWaitMs;
        this.httpPool  = Executors.newFixedThreadPool(Runtime.getRuntime().availableProcessors() * 2);
        this.iUserChatgptLogService = iUserChatgptLogService;
        this.timer     = Executors.newSingleThreadScheduledExecutor();
    }

    public CompletableFuture<List<String>> submit(String sentence) {
        CompletableFuture<List<String>> fut = new CompletableFuture<>();
        lock.lock();
        try {
            bucket.add(new Pending(sentence,fut));
            // 第一次进入时启动定时器
            if (bucket.size() == 1) {
                timer.schedule(this::flushSafely, maxWaitMs, TimeUnit.MILLISECONDS);
            }
            if (bucket.size() >= batchSize) {
                flushSafely();   // 到阈值立刻冲
            }
        } finally {
            lock.unlock();
        }
        return fut;
    }

    /* 防止并发冲突的外壳 */
    private void flushSafely(){
        List<Pending> snapshot;
        lock.lock();
        try {
            if (bucket.isEmpty()) return;
            snapshot = new ArrayList<>(bucket);
            bucket.clear();
        } finally {
            lock.unlock();
        }

        // 真正的 HTTP 调用在 httpPool 内并发执行
        httpPool.submit( () -> {
            List<String> sentences = snapshot.stream()
                    .map(p -> p.sentence)
                    .collect(Collectors.toList());
            try {
                // === 一次打包调用后端 ===
                // 假设返回 List<List<String>> ，顺序与请求列表一致
                List<List<String>> classifyRes = iUserChatgptLogService.batchWritingSentenceClassification(sentences);
                for(int i = 0; i < snapshot.size(); i++){
                    snapshot.get(i).future.complete(classifyRes.get(i));
                }
            } catch(Exception e) {
                snapshot.forEach(p -> p.future.completeExceptionally(e));
            }
        });
    }
}
