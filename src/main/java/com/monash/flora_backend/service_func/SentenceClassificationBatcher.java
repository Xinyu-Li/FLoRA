package com.monash.flora_backend.service_func;

import com.monash.flora_backend.service.IUserChatgptLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.locks.ReentrantLock;
import java.util.stream.Collectors;

@Component
public class SentenceClassificationBatcher {
    private static final String DEFAULT_BUCKET_KEY = "__DEFAULT__";

    private final int batchSize;
    private final long maxWaitMs;
    private final ExecutorService httpPool;
    private final ScheduledExecutorService timer;
    private final IUserChatgptLogService iUserChatgptLogService;

    private static class Pending {
        final String sentence;
        final CompletableFuture<List<String>> future;

        Pending(String sentence, CompletableFuture<List<String>> future) {
            this.sentence = sentence;
            this.future = future;
        }
    }

    private final Map<String, List<Pending>> buckets = new HashMap<>();
    private final ReentrantLock lock = new ReentrantLock();
    private int totalPending = 0;

    @Autowired
    public SentenceClassificationBatcher(@Value("${batch.size:50}") int batchSize,
                                         @Value("${batch.wait:500}") long maxWaitMs,
                                         IUserChatgptLogService iUserChatgptLogService) {
        this.batchSize = batchSize;
        this.maxWaitMs = maxWaitMs;
        this.httpPool = Executors.newFixedThreadPool(Runtime.getRuntime().availableProcessors() * 2);
        this.iUserChatgptLogService = iUserChatgptLogService;
        this.timer = Executors.newSingleThreadScheduledExecutor();
    }

    public CompletableFuture<List<String>> submit(String sentence, String courseId) {
        CompletableFuture<List<String>> future = new CompletableFuture<>();
        if (sentence == null || sentence.trim().isEmpty()) {
            future.complete(Collections.emptyList());
            return future;
        }

        String bucketKey = normalizeCourseId(courseId);
        boolean scheduleFlush = false;
        boolean flushImmediately = false;

        lock.lock();
        try {
            buckets.computeIfAbsent(bucketKey, key -> new ArrayList<>()).add(new Pending(sentence, future));
            totalPending++;
            if (totalPending == 1) {
                scheduleFlush = true;
            }
            if (buckets.get(bucketKey).size() >= batchSize) {
                flushImmediately = true;
            }
        } finally {
            lock.unlock();
        }

        if (scheduleFlush) {
            timer.schedule(this::flushAllSafely, maxWaitMs, TimeUnit.MILLISECONDS);
        }
        if (flushImmediately) {
            flushSafely(bucketKey);
        }

        return future;
    }

    private String normalizeCourseId(String courseId) {
        if (courseId == null || courseId.trim().isEmpty()) {
            return DEFAULT_BUCKET_KEY;
        }
        return courseId.trim();
    }

    private void flushAllSafely() {
        Map<String, List<Pending>> snapshotByBucket;
        lock.lock();
        try {
            if (totalPending == 0) {
                return;
            }
            snapshotByBucket = new HashMap<>(buckets);
            buckets.clear();
            totalPending = 0;
        } finally {
            lock.unlock();
        }

        snapshotByBucket.forEach(this::dispatchBucket);
    }

    private void flushSafely(String bucketKey) {
        List<Pending> snapshot;
        lock.lock();
        try {
            List<Pending> bucket = buckets.remove(bucketKey);
            if (bucket == null || bucket.isEmpty()) {
                return;
            }
            snapshot = new ArrayList<>(bucket);
            totalPending -= bucket.size();
        } finally {
            lock.unlock();
        }

        dispatchBucket(bucketKey, snapshot);
    }

    private void dispatchBucket(String bucketKey, List<Pending> snapshot) {
        String courseId = DEFAULT_BUCKET_KEY.equals(bucketKey) ? "" : bucketKey;
        httpPool.submit(() -> {
            List<String> sentences = snapshot.stream()
                    .map(p -> p.sentence)
                    .collect(Collectors.toList());
            try {
                List<List<String>> classifyRes = iUserChatgptLogService.batchWritingSentenceClassification(sentences, courseId);
                if (classifyRes.size() != snapshot.size()) {
                    throw new IllegalStateException("Response size (" + classifyRes.size() + ") doesn't match request size (" + snapshot.size() + ")");
                }

                for (int i = 0; i < snapshot.size(); i++) {
                    snapshot.get(i).future.complete(classifyRes.get(i));
                }
            } catch (Exception e) {
                snapshot.forEach(p -> p.future.completeExceptionally(e));
            }
        });
    }
}
