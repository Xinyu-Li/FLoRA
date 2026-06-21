package com.monash.flora_backend.service_func;

import com.monash.flora_backend.dao.entity.TraceData;

import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ConcurrentSkipListMap;
import java.util.concurrent.atomic.AtomicLong;

public class OrderedFutures {
    // 按监听到的先后顺序递增
    private final AtomicLong seq = new AtomicLong();
    // key = 顺序号，value = 结果 Future
    //ConcurrentSkipListMap 是 JDK-Concurrent 包里提供的一种并发、排序（有序）、可导航的 Map 实现
    private final ConcurrentSkipListMap<Long, CompletableFuture<List<TraceData>>> map = new ConcurrentSkipListMap<>();

    public long put(CompletableFuture<List<TraceData>> f){
        long no = seq.getAndIncrement();
        map.put(no, f);
        return no;
    }
    // 依次把已经完成的 Future 输出到最终 buffer
    public void flushTo(Collection<TraceData> buffer){
        Iterator<Map.Entry<Long, CompletableFuture<List<TraceData>>>> it = map.entrySet().iterator();
        while (it.hasNext()){
            Map.Entry<Long, CompletableFuture<List<TraceData>>> e = it.next();
            if (!e.getValue().isDone()) break;          // 碰到未完成的就停，保证顺序
            try{
                buffer.addAll(e.getValue().join());     // join 不会阻塞，因为 isDone 已经 true
            }finally {
                it.remove();
            }
        }
    }
}
//private final OrderedFutures orderedFutures = new OrderedFutures();