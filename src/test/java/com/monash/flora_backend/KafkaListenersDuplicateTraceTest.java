package com.monash.flora_backend;

import cn.hutool.json.JSONUtil;
import com.monash.flora_backend.config.KafkaListeners;
import com.monash.flora_backend.config.cache.IGlobalCache;
import com.monash.flora_backend.constant.MyConstant;
import com.monash.flora_backend.controller.vo.TraceDataVO;
import com.monash.flora_backend.dao.entity.TraceData;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.*;

/**
 * 测试 KafkaListeners 中 checkNonCloseToolsEvent 方法的重复添加bug
 *
 * 问题描述：
 * 当收到连续4个ESSAY相关的trace数据，有相同的save_time时，sub_action_label分别被标记为：
 * 1. OPEN_ESSAY
 * 2. TRY_OUT_TOOLS
 * 3. OPEN_ESSAY
 * 4. OPEN_ESSAY
 *
 * 原因：checkNonCloseToolsEvent 方法在处理完OPEN事件后没有删除Redis中的key，
 * 导致同一个OPEN事件被多次添加到traceDataBuffer中。
 */
@Slf4j
public class KafkaListenersDuplicateTraceTest extends FLoRaBackendApplicationTests {

    @Autowired
    private KafkaListeners kafkaListeners;

    @Autowired
    private IGlobalCache iGlobalCache;

    private static final Long TEST_USER_ID = 99999L;
    private static final String TEST_COURSE_ID = "test_course_999";
    private static final String OPEN_KEY = "tool-used-" + TEST_USER_ID + "_" + TEST_COURSE_ID + "_ESSAY_OPEN";
    private static final String CLOSE_KEY = "tool-used-" + TEST_USER_ID + "_" + TEST_COURSE_ID + "_ESSAY_CLOSE";

    @BeforeEach
    void setUp() throws Exception {
        // 清理测试数据
        iGlobalCache.del(OPEN_KEY);
        iGlobalCache.del(CLOSE_KEY);

        // 清空 traceDataBuffer
        clearTraceDataBuffer();
    }

    /**
     * 🔴 这个测试展示bug：多次调用 checkNonCloseToolsEvent 会导致重复添加
     *
     * 预期：同一个OPEN事件只应该被添加1次
     * 实际：由于没有删除Redis key，同一个OPEN事件被添加了多次
     */
    @Test
    void testBug_checkNonCloseToolsEvent_duplicateAddition() throws Exception {
        log.info("========== 开始测试：展示重复添加bug ==========");

        // 1. 模拟ESSAY OPEN事件存入Redis（模拟用户打开ESSAY工具）
        TraceDataVO essayOpenTrace = createEssayOpenTrace(TEST_USER_ID, TEST_COURSE_ID, "1000000000000");
        iGlobalCache.set(OPEN_KEY, JSONUtil.toJsonStr(essayOpenTrace), MyConstant.REDIS_EXPIRE_SECONDS);
        log.info("步骤1: 模拟ESSAY OPEN事件存入Redis, key={}", OPEN_KEY);

        // 2. 模拟3次CHANGE_PAGE事件（用户在页面间切换）
        // 每次CHANGE_PAGE都会调用 checkNonCloseToolsEvent
        TraceDataVO changePage1 = createChangePageTrace(TEST_USER_ID, TEST_COURSE_ID, "1000000005000"); // +5秒
        TraceDataVO changePage2 = createChangePageTrace(TEST_USER_ID, TEST_COURSE_ID, "1000000010000"); // +10秒
        TraceDataVO changePage3 = createChangePageTrace(TEST_USER_ID, TEST_COURSE_ID, "1000000015000"); // +15秒

        log.info("步骤2: 模拟3次CHANGE_PAGE事件");

        // 通过反射调用 private 方法 checkNonCloseToolsEvent
        Method checkMethod = KafkaListeners.class.getDeclaredMethod("checkNonCloseToolsEvent", TraceDataVO.class);
        checkMethod.setAccessible(true);

        checkMethod.invoke(kafkaListeners, changePage1);
        log.info("  - 第1次 CHANGE_PAGE 后, buffer size={}", getTraceDataBufferSize());

        checkMethod.invoke(kafkaListeners, changePage2);
        log.info("  - 第2次 CHANGE_PAGE 后, buffer size={}", getTraceDataBufferSize());

        checkMethod.invoke(kafkaListeners, changePage3);
        log.info("  - 第3次 CHANGE_PAGE 后, buffer size={}", getTraceDataBufferSize());

        // 3. 检查 traceDataBuffer 中有多少个 ESSAY 相关的 trace
        List<TraceData> buffer = getTraceDataBuffer();
        List<TraceData> essayTraces = buffer.stream()
                .filter(t -> "ESSAY".equals(t.getSource()))
                .collect(Collectors.toList());

        log.info("========== 测试结果 ==========");
        log.info("traceDataBuffer 总大小: {}", buffer.size());
        log.info("ESSAY相关trace数量: {}", essayTraces.size());

        // 打印每个ESSAY trace的详情
        for (int i = 0; i < essayTraces.size(); i++) {
            TraceData trace = essayTraces.get(i);
            log.info("  ESSAY trace[{}]: subActionLabel={}, instantEvent={}, saveTime={}",
                    i, trace.getSubActionLabel(), trace.getInstantEvent(), trace.getSaveTime());
        }

        // 按 subActionLabel 分组统计
        Map<String, Long> labelCounts = essayTraces.stream()
                .collect(Collectors.groupingBy(TraceData::getSubActionLabel, Collectors.counting()));
        log.info("按subActionLabel统计: {}", labelCounts);

        // 🔴 这个断言会失败，因为有bug导致重复添加
        // 预期: 只有1个ESSAY trace
        // 实际: 有3个ESSAY trace（每次CHANGE_PAGE都添加了一次）
        log.info("========== 断言检查 ==========");
        log.info("预期ESSAY trace数量: 1");
        log.info("实际ESSAY trace数量: {}", essayTraces.size());

        if (essayTraces.size() > 1) {
            log.error("❌ BUG确认: 同一个ESSAY OPEN事件被重复添加了 {} 次!", essayTraces.size());
            log.error("   原因: checkNonCloseToolsEvent 方法处理完OPEN事件后没有删除Redis中的key");
            log.error("   修复: 在 traceDataBuffer.add() 之后添加 iGlobalCache.del(ty);");
        }

        // 断言失败，展示bug
        assertEquals(1, essayTraces.size(),
                "BUG: 同一个ESSAY OPEN事件被重复添加! 预期1个，实际" + essayTraces.size() + "个。" +
                "原因: checkNonCloseToolsEvent处理完后没有删除Redis的OPEN key");
    }

    /**
     * 测试：验证Redis key在处理后仍然存在（这是bug的根本原因）
     */
    @Test
    void testBug_redisKeyNotDeleted() throws Exception {
        log.info("========== 测试：验证Redis key未被删除 ==========");

        // 1. 存入ESSAY OPEN事件
        TraceDataVO essayOpenTrace = createEssayOpenTrace(TEST_USER_ID, TEST_COURSE_ID, "1000000000000");
        iGlobalCache.set(OPEN_KEY, JSONUtil.toJsonStr(essayOpenTrace), MyConstant.REDIS_EXPIRE_SECONDS);

        assertTrue(iGlobalCache.hasKey(OPEN_KEY), "OPEN key应该存在");
        log.info("处理前: OPEN key存在={}", iGlobalCache.hasKey(OPEN_KEY));

        // 2. 调用 checkNonCloseToolsEvent
        TraceDataVO changePage = createChangePageTrace(TEST_USER_ID, TEST_COURSE_ID, "1000000005000");
        Method checkMethod = KafkaListeners.class.getDeclaredMethod("checkNonCloseToolsEvent", TraceDataVO.class);
        checkMethod.setAccessible(true);
        checkMethod.invoke(kafkaListeners, changePage);

        // 3. 检查Redis key是否还存在
        boolean keyStillExists = iGlobalCache.hasKey(OPEN_KEY);
        log.info("处理后: OPEN key存在={}", keyStillExists);

        if (keyStillExists) {
            log.error("❌ BUG确认: 处理完OPEN事件后，Redis key没有被删除!");
            log.error("   这会导致下次CHANGE_PAGE时，同一个OPEN事件被再次添加到buffer");
        }

        // 这个断言会失败，展示bug
        assertFalse(keyStillExists,
                "BUG: 处理完OPEN事件后，Redis的OPEN key应该被删除，但实际上还存在！");
    }

    /**
     * 测试：模拟完整场景 - 与用户描述的问题一致
     * 4个trace有相同save_time，label分别是：OPEN_ESSAY, TRY_OUT_TOOLS, OPEN_ESSAY, OPEN_ESSAY
     */
    @Test
    void testBug_fullScenario_sameSaveTime() throws Exception {
        log.info("========== 测试：完整场景复现 ==========");

        String sameTime = "1000000000000";

        // 1. ESSAY OPEN事件（会被缓存到Redis，不直接添加buffer）
        TraceDataVO essayOpenTrace = createEssayOpenTrace(TEST_USER_ID, TEST_COURSE_ID, sameTime);
        iGlobalCache.set(OPEN_KEY, JSONUtil.toJsonStr(essayOpenTrace), MyConstant.REDIS_EXPIRE_SECONDS);
        log.info("事件1: ESSAY OPEN (存入Redis)");

        Method checkMethod = KafkaListeners.class.getDeclaredMethod("checkNonCloseToolsEvent", TraceDataVO.class);
        checkMethod.setAccessible(true);

        // 2. 第一次CHANGE_PAGE - 时间差<3秒，会被标记为TRY_OUT_TOOLS
        TraceDataVO changePage1 = createChangePageTrace(TEST_USER_ID, TEST_COURSE_ID, "1000000002000"); // +2秒
        checkMethod.invoke(kafkaListeners, changePage1);
        log.info("事件2: CHANGE_PAGE (+2秒) -> 时间差<3秒，应标记TRY_OUT_TOOLS");

        // 3. 第二次CHANGE_PAGE - 时间差>3秒，会被标记为OPEN_ESSAY
        TraceDataVO changePage2 = createChangePageTrace(TEST_USER_ID, TEST_COURSE_ID, "1000000005000"); // +5秒
        checkMethod.invoke(kafkaListeners, changePage2);
        log.info("事件3: CHANGE_PAGE (+5秒) -> 时间差>3秒，应标记OPEN_ESSAY");

        // 4. 第三次CHANGE_PAGE - 时间差>3秒，会被标记为OPEN_ESSAY
        TraceDataVO changePage3 = createChangePageTrace(TEST_USER_ID, TEST_COURSE_ID, "1000000008000"); // +8秒
        checkMethod.invoke(kafkaListeners, changePage3);
        log.info("事件4: CHANGE_PAGE (+8秒) -> 时间差>3秒，应标记OPEN_ESSAY");

        // 检查结果
        List<TraceData> buffer = getTraceDataBuffer();
        log.info("========== 结果分析 ==========");
        log.info("Buffer中trace数量: {}", buffer.size());

        Map<String, Long> labelCounts = buffer.stream()
                .filter(t -> "ESSAY".equals(t.getSource()))
                .collect(Collectors.groupingBy(TraceData::getSubActionLabel, Collectors.counting()));

        log.info("各label数量统计: {}", labelCounts);

        long tryOutToolsCount = labelCounts.getOrDefault("TRY_OUT_TOOLS", 0L);
        long openEssayCount = labelCounts.getOrDefault("OPEN_ESSAY", 0L);

        log.info("  - TRY_OUT_TOOLS: {} 个", tryOutToolsCount);
        log.info("  - OPEN_ESSAY: {} 个", openEssayCount);

        if (tryOutToolsCount + openEssayCount > 1) {
            log.error("❌ BUG复现成功!");
            log.error("   用户描述的问题: 4个trace有相同save_time，label为 OPEN_ESSAY, TRY_OUT_TOOLS, OPEN_ESSAY, OPEN_ESSAY");
            log.error("   实际情况: TRY_OUT_TOOLS={}, OPEN_ESSAY={}", tryOutToolsCount, openEssayCount);
        }

        // 断言：总共只应该有1个ESSAY trace
        long totalEssayTraces = tryOutToolsCount + openEssayCount;
        assertEquals(1, totalEssayTraces,
                "BUG复现: 预期1个ESSAY trace，实际有" + totalEssayTraces + "个 " +
                "(TRY_OUT_TOOLS=" + tryOutToolsCount + ", OPEN_ESSAY=" + openEssayCount + ")");
    }

    // ========== 辅助方法 ==========

    private TraceDataVO createEssayOpenTrace(Long userId, String courseId, String saveTime) {
        TraceDataVO trace = new TraceDataVO();
        trace.setUserId(userId);
        trace.setCourseId(courseId);
        trace.setSaveTime(saveTime);
        trace.setSource("ESSAY");
        trace.setInstantEvent("OPEN");
        trace.setPageEvent("TOOL_OPEN");
        trace.setSubActionLabel("OPEN_ESSAY");
        trace.setActionLabel("ESSAY");
        trace.setUrl("http://test.com/essay");
        trace.setUsername("test_user");
        trace.setEventValue("START_USE_TOOL:::" + saveTime);
        return trace;
    }

    private TraceDataVO createChangePageTrace(Long userId, String courseId, String saveTime) {
        TraceDataVO trace = new TraceDataVO();
        trace.setUserId(userId);
        trace.setCourseId(courseId);
        trace.setSaveTime(saveTime);
        trace.setSource("PAGE");
        trace.setInstantEvent("CHANGE_PAGE_CLICK_READING");
        trace.setPageEvent("CLICK");
        trace.setSubActionLabel("READING");
        trace.setActionLabel("READING");
        trace.setUrl("http://test.com/page");
        trace.setUsername("test_user");
        return trace;
    }

    @SuppressWarnings("unchecked")
    private List<TraceData> getTraceDataBuffer() throws Exception {
        Field bufferField = KafkaListeners.class.getDeclaredField("traceDataBuffer");
        bufferField.setAccessible(true);
        return (List<TraceData>) bufferField.get(kafkaListeners);
    }

    private int getTraceDataBufferSize() throws Exception {
        return getTraceDataBuffer().size();
    }

    private void clearTraceDataBuffer() throws Exception {
        List<TraceData> buffer = getTraceDataBuffer();
        buffer.clear();
    }
}
