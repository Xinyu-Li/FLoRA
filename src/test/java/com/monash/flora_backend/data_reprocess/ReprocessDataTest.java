package com.monash.flora_backend.data_reprocess;

import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.util.StrUtil;

import com.monash.flora_backend.FLoRaBackendApplicationTests;
import com.monash.flora_backend.constant.MyMoodleConfigConstant;
import com.monash.flora_backend.dao.entity.TraceData;
import com.monash.flora_backend.service.ITraceDataService;
import com.monash.flora_backend.service_func.ActionAndProcessService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * @author Xinyu Li
 * @date 2/3/2024
 */
public class ReprocessDataTest extends FLoRaBackendApplicationTests {
    @Autowired
    private ActionAndProcessService actionAndProcessService;
    @Autowired
    private ITraceDataService iTraceDataService;


    //TUM

    /*public static int[] userIdArray = {

            2746, 2711, 2691, 2726, 2714, 2717, 2712, 2716, 2715, 2718,
            2719, 2713, 2748, 2749, 2754, 2753, 2752, 2747, 2750, 2757,
            2756, 2755, 2751, 2732, 2693, 2735, 2697, 2694, 2695, 2703,
            2692, 2698, 2700, 2699, 2701, 2702, 2696, 2734, 2727, 2729,
            2739, 2738, 2728, 2730, 2733,
//            2736, // this student data cannot 5be used as he may open multiple pages at the same time, which cause data from different page generate at the same time.
            2737, 2740, 2731, 2901, 2965, 2938, 2963, 2971, 2941, 2977,
            2871, 2961, 2931, 2940, 2974, 2968, 2972, 2976, 2964, 2973,
//            2945, 2946, 2984, 2986, // this student data cannot be used as too many data loss, unfixable.
            2948, 2947, 2978, 2979, 2980, 2981, 2982, 2983, 2950, 2949, 2951, 2952,
            2953, 2954, 2706, 2707, 2985, 2987, 2988, 2885, 2873, 2876, 2881,
            2877, 2878, 2882, 2883, 2911, 2912, 2872,
            2915, 2875, 2909, 2913, 2907, 2906, 2905, 2919, 2903, 2874,
            2879, 2908, 2914, 2916, 2921, 2923, 2924, 2917, 2887, 2880
    };
    //TUM
    public static int[] courseIdArray = {64, 65, 76};*/

    // Oulu
    /*public static int[] userIdArray = {
            7,   8,   9,   10,  11,  14,  15,  16,  17,  18,  23,  25,  26,  34,   35,  36, 38,
            39,  40,  42,  43,  44,  45,  46,  47,  48,  49,  51,  52,  53,  54,  55,  56,  57,
//            58, 255, 344, 375, 435,  this student open several pages at the same time, which causes the trace data mixed together.
            60,  61, 77,  78, 79,  80,  82, 84,  87,  88,  89,  90,  91,  92,  240, 241, 242, 244,
            245, 246, 247, 248, 249, 250, 251, 252, 253, 256, 257, 258, 259, 260, 261, 262, 263, 264, 265, 266, 267,
            268, 269, 270, 289, 290, 291, 292, 293, 294, 295, 296, 297, 298, 299, 300, 302, 303, 304, 305, 306, 307, 308,
            309, 310, 311, 312, 313, 314, 315, 316, 317, 318, 320, 322, 323, 324, 332, 333, 334, 335, 336, 338,
            339, 340, 341, 342, 345, 346, 348, 349, 350, 352, 353, 354, 355, 356, 357, 358, 360, 361, 362,
            363, 364, 365, 366, 367, 368, 370, 371, 372, 373, 374, 376, 377, 379, 380, 381, 382, 384, 385,
            386, 397, 398, 399, 400, 402, 403, 405, 406, 407, 408, 409, 410, 411, 413, 414, 415, 416, 417, 418,
            419, 420, 422, 423, 424, 426, 427, 429, 430, 431, 432, 434, 436, 458, 459, 460, 461, 462, 463
    };
    // Oulu
    public static int[] courseIdArray = {6, 15, 16, 17, 18};*/

    // Radboud
    // Radboud
//    public static int[] userIdArray = {
//            1732, 1733, 1734,
//            1735, 2004, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2021, 2022, 2023,
//            2024, 2030, 2061, 2105, this student open several pages at the same time, which causes the trace data mixed together.
//            2025, 2026, 2027, 2028, 2029, 2031, 2032, 2033, 2034, 2035, 2036, 2037, 2038, 2039, 2040, 2041, 2042, 2043, 2045, 2046, 2047, 2048, 2049, 2050, 2051, 2052, 2053, 2054, 2055, 2056, 2057,
//            2058, 2059, 2060, 2062, 2063, 2064, 2065, 2066, 2067, 2068, 2069, 2070, 2071, 2072, 2073, 2074, 2076,
//            2077, 2079, 2080, 2081, 2082, 2083, 2084, 2086, 2087, 2088, 2089, 2090, 2091, 2092, 2094, 2095, 2096, 2097, 2098, 2099, 2100, 2101,
//            2102, 2104, 2107, 2108, 2109, 2110, 2111, 2112, 2113,
//            2114, 2117, 2118, 2119, 2120, 2140, 2141, 2142, 2145, 2274,  test accounts, have too many issues
//            2121, 2123, 2124, 2125, 2126, 2143, 2144, 2146, 2170, 2171, 2172, 2174, 2175, 2176, 2177, 2178, 2264, 2265, 2266, 2267, 2268, 2269, 2270, 2271, 2272, 2275, 2276, 2277, 2278,
//            2280, 2281, 2282, 2283, 2284, 2287, 2288, 2289, 2290, 2291, 2292, 2293, 2294, 2303, 2304, 2305, 2306, 2309, 2310, 2311, 2312, 2494, 2495, 2496, 2497, 2498, 2499, 2500, 2501, 2502, 2503, 2504, 2505, 2506, 2507, 2508, 2509, 2510, 2511, 2512, 2514,
//            2515, 2516, 2517, 2519, 2520, 2524, 2525, 2526, 2527, 2528, 2529, 2530, 2531, 2532, 2533, 2534, 2535, 2536, 2537, 2538, 2539, 2540, 2541,
//            2542, 2543, 2544, 2545, 2546, 2554, 2555, 2556, 2557, 2558, 2559, 2560, 2561, 2562, 2563, 2564, 2565, 2566, 2567, 2568, 2569, 2570, 2571, 2572,
//            2573, 2574, 2575, 2576, 2577, 2578, 2579, 2580, 2584, 2585, 2586, 2587, 2588, 2589, 2590, 2591, 2592, 2594, 2595, 2596, 2598, 2599, 2600, 2601, 2602, 2604, 2605,
//            2606, 2607, 2608, 2609, 2610, 2611, 2612
//    };
//    public static int[] courseIdArray = {25, 40};

    //Tony Beijing data 359
    /*public static int[] userIdArray = {
            1575, 1577, 1579, 1580, 1583, 1584, 1585, 1586, 1587, 1588, 1590, 1591, 1592, 1594, 1597, 1598, 1599, 1600, 1602, 1605,
            1606, 1607, 1608, 1610, 1612, 1615, 1617, 1618, 1619, 1621, 1622, 1624, 1626, 1628, 1629, 1630, 1631, 1632, 1633, 1634,
            1640, 1642, 1643, 1644, 1645, 1646, 1648, 1652, 1655, 1656, 1659, 1660, 1661, 1664, 1665, 1666, 1667, 1669, 1671, 1672,
            1673, 1674, 1676, 1677, 1680, 1681, 1682, 1683, 1684, 1685, 1686, 1688, 1689, 1691, 1692, 1694, 1695, 1696, 1697, 1698,
            1699, 1700, 1703, 1704, 1705, 1706, 1707, 1708, 1709, 1710, 1711, 1712, 1713, 1717, 1718, 1719, 1720, 1721, 1722, 1724,
            1725, 1726, 1729, 1730, 1731, 1732, 1733, 1734, 1735, 1736, 1737, 1738, 1739, 1740, 1741, 1745, 1747, 1748, 1749, 1750,
            1751, 1752, 1753, 1754, 1756, 1759, 1760, 1761, 1762, 1763, 1764, 1765, 1766, 1768, 1769, 1770, 1775, 1779, 1780, 1781,
            1782, 1784, 1785, 1787, 1788, 1790, 1795, 1797, 1798, 1799, 1800, 1801, 1802, 1804, 1805, 1806, 1807, 1808, 1809, 1811,
            1812, 1813, 1814, 1816, 1817, 1819, 1820, 1821, 1824, 1825, 1826, 1827, 1830, 1831, 1832, 1835, 1836, 1837, 1838, 1839,
            1844, 1845, 1847, 1848, 1849, 1850, 1851, 1852, 1854, 1858, 1860, 1862, 1863, 1864, 1865, 1866, 1867, 1868, 1869, 1871,
            1873, 1876, 1877, 1878, 1882, 1883, 1884, 1885, 1887, 1888, 1889, 1891, 1892, 1894, 1896, 1897, 1899, 1902, 1903, 1904,
            1906, 1907, 1911, 1913, 1914, 1915, 1916, 1918, 1919, 1922, 1923, 1924, 1925, 1926, 1929, 1931, 1932, 1933, 1934, 1936,
            1937, 1938, 1939, 1941, 1942, 1943, 1962, 1969, 1987, 1988, 1990, 1991, 1992, 1993, 1994, 1995, 2265, 2266, 2267, 2268,
            2269, 2270, 2272, 2273, 2274, 2275, 2276, 2277, 2278, 2280, 2281, 2282, 2315, 2316, 2317, 2318, 2319, 2324, 2325, 2326,
            2329, 2330, 2331, 2332, 2333, 2334, 2335, 2336, 2338, 2340, 2341, 2342, 2343, 2382, 2413, 2414, 2415, 2416, 2444, 2445,
            2446, 2534, 2535, 2536, 2537, 2538, 2539, 2541, 2542, 2543, 2544, 2545, 2547, 2548, 2549, 2550, 2551,

            1601, 1613, 1614, 1616, 1649, 1650, 1653, 1654, 1657, 1663, 1693, 1701, 1727, 1746, 1773, 1778, 1803, 1823, 1833, 1840, 1842,1846, 1856, 1870, 1908, 1909, 1910, 1917, 1921, 1927, 1928, 1960, 1989,  //同时开多个页面，导致log错误
            2271, 2279, 2339, 2344, 2443,2448, 2533, 2546, 2552  //同时开多个页面，导致log错误
};
    public static int[] courseIdArray = {73, 74, 75};*/

    // TUM data 30 个
//    public static int[] userIdArray = {
//            3102, 3100, 3101, 3103, 3104, 3105, 3107, 3106, 3110, 3109,
//            3108, 3113, 3111, 3112, 3115, 3114, 3116, 3117, 3118, 3126,
//            3125, 3127, 3128, 3129, 3130, 3131, 3132, 3134, 3133, 3135
//    };
//    public static int[] courseIdArray = {84, 42};

    //Legacy Cella study 1 Monash Data, 可以直接执行，数据清理从step0开始

    public static int[] userIdArray = {
//            194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,
//            214,215,216,217,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,
//            250,251,252,253,254,255,
//
//            97, 98, 99, 100, 101, 102, 106,107, 109, 110, 111, 112,
//
//            134,135,136,137,138,139,140,141,142,144,145,146,147,148,149,150,151,153,154,155,
//            156,157,158,159,160,161,162,164,165,166,168,169,170,171,172,
    };
    public static int[] courseIdArray = {1003};





    /*public static int[] userIdArray = {
//            1203, 1206, 1208, 1209, 1210, 1211, 1212, 1213, 1214, 1215, 1215, 1216, 1217, 1218, 1219, 1221, 1225, 1226, 1227, 1228,
//            1229, 1230, 1231, 1232, 1233, 1234, 1235, 1236, 1237, 1238, 1239, 1240, 1241, 1243, 1244, 1245, 1246, 1247, 1248, 1249,
//            1250, 1251, 1252, 1253, 1254, 1255, 1256, 1257, 1258, 1259, 1260, 1261, 1262, 1263, 1264, 1265, 1268, 1269, 1270, 1271,
//            1272, 1274, 1275, 1277, 1278, 1279, 1280, 1281, 1282, 1283, 1285, 1286, 1287, 1288, 1289, 1290, 1291, 1293, 1294, 1295,
//            1296, 1297, 1299, 1300, 1302, 1304, 1305, 1308, 1309, 1311, 1312, 1314, 1315, 1316, 1317, 1318, 1320, 1321, 1323, 1324,
//            1326, 1327, 1327, 1328, 1329, 1330, 1331, 1332, 1333, 1334, 1335, 1336, 1337, 1339, 1340, 1341, 1342, 1343, 1344, 1345,
//            1346, 1347, 1348, 1350, 1353, 1354, 1355, 1356, 1357, 1358, 1360, 1361, 1362, 1363, 1364, 1365, 1366, 1367, 1368, 1369,
//            1370, 1371, 1372, 1373, 1375, 1377, 1378, 1379, 1380, 1381, 1382, 1383, 1384, 1386, 1387, 1388, 1389, 1390, 1391, 1393,
//            1394, 1396, 1397, 1399, 1402, 1403, 1404, 1405, 1406, 1407, 1411, 1412, 1414, 1415, 1417, 1418, 1419, 1421, 1422, 1424,
//            1425, 1426, 1427, 1429, 1432, 1433, 1434, 1435, 1436, 1437, 1438, 1439, 1440, 1441, 1442, 1443, 1444, 1446, 1447, 1448,
//            1449, 1450, 1451, 1452, 1453, 1454, 1456, 1457, 1458, 1459, 1460, 1461, 1462, 1463, 1464, 1466, 1467, 1468, 1469, 1470,
//            1471, 1472, 1473, 1474, 1477, 1478, 1479, 1480, 1481, 1482, 1483, 1484, 1485, 1486, 1487, 1491, 1494, 1495, 1496, 1497,
//            1499, 1500, 1501, 1502, 1503, 1504, 1506, 1527
            };
    public static int[] courseIdArray = {38};*/

    /**
     * step 0
     * removeTryOutToolsAndFixSubActionLabelAndNoActionLabelIssue
     * 可以自动执行
     * 使用sql script 执行
     */
    @Test
    public void removeTryOutToolsAndFixSubActionLabelAndNoActionLabelIssue() {
//        Nijmenge server
//        MyMoodleConfigConstant.TASK_REQUIREMENT_READING_PAGE_ID_SET.addAll(Set.of("247", "225", "471", "284", "303", "322", "182", "402", "647"));
//        MyMoodleConfigConstant.RUBRIC_READING_PAGE_ID_SET.addAll(Set.of(          "248", "226", "470", "285", "304", "323", "183", "403", "648"));
        //Oulu server
//        MyMoodleConfigConstant.TASK_REQUIREMENT_READING_PAGE_ID_SET.addAll(Set.of("28",         "49", "89", "77",      "119", "101"));
//        MyMoodleConfigConstant.RUBRIC_READING_PAGE_ID_SET.addAll(Set.of(          "29",         "50", "90", "78",      "120", "102"));
        //Tony data
//        MyMoodleConfigConstant.TASK_REQUIREMENT_READING_PAGE_ID_SET.addAll(Set.of("895", "914", "933"));
//        MyMoodleConfigConstant.RUBRIC_READING_PAGE_ID_SET.addAll(Set.of("896", "915", "934"));
//        MyMoodleConfigConstant.WELCOME_READING_PAGE_ID_SET.addAll(Set.of("1113", "1114", "1115"));

        //Beijing server
//        MyMoodleConfigConstant.IRRELEVANT_READING_PAGE_ID_SET.addAll(Set.of("10", "12", "19", "21", "24", "38", "40", "47", "49", "52", "64", "66", "73", "75", "78", "355", "357", "364", "366", "369"));
//        MyMoodleConfigConstant.TASK_REQUIREMENT_READING_PAGE_ID_SET.addAll(Set.of("7", "35", "61", "351", "491", "576", "933", "914", "895", "952", "1010", "1027", "775", "655", "1053", "1083", "805", "685", "835", "715"));
//        MyMoodleConfigConstant.RUBRIC_READING_PAGE_ID_SET.addAll(Set.of("8", "36", "62", "352", "573", "577", "934", "915", "896", "953", "1011", "1028", "776", "656", "1054", "1084", "806", "685", "836", "716"));
//        MyMoodleConfigConstant.WELCOME_READING_PAGE_ID_SET.addAll(Set.of("1046", "1047", "1048", "869", "870", "1113", "1114", "1115"));


        //Legacy Cella study 1 Monash Data
        MyMoodleConfigConstant.TASK_REQUIREMENT_READING_PAGE_ID_SET.addAll(Set.of("5"));
        MyMoodleConfigConstant.RUBRIC_READING_PAGE_ID_SET.addAll(Set.of(          "6"));

        //Legacy Cella study 1 Oulu Data  course id: 1002
        //Legacy Cella study 1 TUM Data   course id: 1001
//        MyMoodleConfigConstant.TASK_REQUIREMENT_READING_PAGE_ID_SET.addAll(Set.of("15"));
//        MyMoodleConfigConstant.RUBRIC_READING_PAGE_ID_SET.addAll(Set.of(          "12"));



        String currentUrl = "";
        for (int i = 0; i < userIdArray.length; i++) {
            for (int j = 0; j < courseIdArray.length; j++) {

                // 将所有try_out_tools 都改成 原本的label
                List<TraceData> traceDataList = iTraceDataService.findAllByUserIdAndCourseIdOrderByTimeAsc((long) userIdArray[i], String.valueOf(courseIdArray[j]));
                System.out.println("processing " + userIdArray[i] + "-----courseid:" + courseIdArray[j] + "----------trace size:" + traceDataList.size());
                Map<String, String> pageReadingReReadingMap = new HashMap<>();
                List<TraceData> needUpdateTraceList = new ArrayList<>();
                for (int k = 0; k < traceDataList.size(); k++) {
                    TraceData t = traceDataList.get(k);
                    if (k == 0) {
                        currentUrl = t.getUrl();

                    }
                    if (t.getId() == 27495l) {
                        System.out.println("hhhhhhhhhhhhhhhhh");
                    }
                    // 1. fix TRY_OUT_TOOLS
                    if ("TRY_OUT_TOOLS".equals(t.getSubActionLabel())) {
                        String tempSubActionLabel = "";
                        String tempActionLabel = "";
                        switch (t.getSource()) {
                            case "ANNOTATION":
                                if ("OPEN".equals(t.getInstantEvent())) {
                                    tempSubActionLabel = "READ_ANNOTATION";
                                } else if ("CLOSE".equals(t.getInstantEvent())) {
                                    tempSubActionLabel = "CLOSE_ANNOTATION";
                                }
                                tempActionLabel = "ANNOTATION";
                                break;
                            case "SEARCH_ANNOTATION":
                                tempSubActionLabel = "SEARCH_ANNOTATION";
                                tempActionLabel = "SEARCH_ANNOTATION";
                                break;
                            case "ESSAY":
                                if ("OPEN".equals(t.getInstantEvent())) {
                                    tempSubActionLabel = "OPEN_ESSAY";
                                } else if ("CLOSE".equals(t.getInstantEvent())) {
                                    tempSubActionLabel = "CLOSE_ESSAY";
                                }
                                tempActionLabel = "ESSAY";
                                break;
                            case "PLANNER":
                                if ("OPEN".equals(t.getInstantEvent())) {
                                    tempSubActionLabel = "OPEN_PLANNER";
                                } else if ("CLOSE".equals(t.getInstantEvent())) {
                                    tempSubActionLabel = "CLOSE_PLANNER";
                                }
                                tempActionLabel = "PLANNER";
                                break;
                            case "TIMER":
                                tempSubActionLabel = "TIMER";
                                tempActionLabel = "TIMER";
                                break;
                            case "CHATGPT":
                                if ("OPEN".equals(t.getInstantEvent())) {
                                    tempSubActionLabel = "OPEN_GPT";
                                } else if ("CLOSE".equals(t.getInstantEvent())) {
                                    tempSubActionLabel = "CLOSE_GPT";
                                }
                                tempActionLabel = "CHATGPT";
                                break;
                            case "CHATGPT_SCAFFOLD":
                                if ("OPEN".equals(t.getInstantEvent())) {
                                    tempSubActionLabel = "OPEN_GPT_SCAFFOLD";
                                } else if ("CLOSE".equals(t.getInstantEvent())) {
                                    tempSubActionLabel = "CLOSE_GPT_SCAFFOLD";
                                }
                                tempActionLabel = "CHATGPT_SCAFFOLD";
                                break;
                            case "DICTIONARY":
                                if ("OPEN".equals(t.getInstantEvent())) {
                                    tempSubActionLabel = "OPEN_DICTIONARY";
                                } else if ("CLOSE".equals(t.getInstantEvent())) {
                                    tempSubActionLabel = "CLOSE_DICTIONARY";
                                }
                                tempActionLabel = "DICTIONARY";
                                break;
                            default:
                                throw new RuntimeException("Exception in switch: subactionlabel:" + t.getSubActionLabel());
                        }
                        if (StrUtil.isEmpty(tempSubActionLabel) || StrUtil.isEmpty(tempActionLabel)) {
                            System.out.println(t);
                            throw new RuntimeException("Exception fix TRY_OUT_TOOLS exception");
                        }
                        t.setSubActionLabel(tempSubActionLabel);
                        t.setActionLabel(tempActionLabel);
                        needUpdateTraceList.add(t);
                    }

                    // end--------------------------------------- fix TRY_OUT_TOOLS
                    // 2. fix NOT_USE
                    // 3. fix BODY
                    // 4. fix xxxxxxxxxxx
                    // 5. fix INSTRUCTION_READING/INSTRUCTION_REREADING
                    // 6. fix REREADING/READING
//                    MyMoodleConfigConstant.IRRELEVANT_READING_PAGE_ID_SET.addAll(Set.of(
//                            "288", "290", "297", "299", "302", "307", "309", "316", "318", "321",
//                            "326", "328", "335", "337", "340", "185", "187", "194", "196", "199",
//                            "405", "407", "414", "416", "419", "250", "252", "259", "261", "264"));

                    if (Set.of("NOT_USE", "BODY", "xxxxxxxxxxx", "INSTRUCTION_READING", "INSTRUCTION_REREADING", "REREADING", "READING", "RELEVANT_READING", "RELEVANT_REREADING").contains(t.getSubActionLabel())) {
                        String urlRelevantOrNot = iTraceDataService.checkUrlRelevant(t.getUrl());
                        String actionLabel = urlRelevantOrNot.split(":::")[0];
                        String subActionLabel = urlRelevantOrNot.split(":::")[1];


                        if ("INSTRUCTION".equals(actionLabel)) {
                            t.setSubActionLabel(subActionLabel);
                        } else { // 此处可以解决页面是否是re reading or first time reading
                            if (pageReadingReReadingMap.containsKey(t.getUrl())) { // re-reading
                                t.setSubActionLabel(subActionLabel + "_REREADING");
                            } else { // first time reading
                                t.setSubActionLabel(subActionLabel + "_READING");
                            }
                        }

                        t.setActionLabel(actionLabel);

                        needUpdateTraceList.add(t);
                    }

                    if (t.getSource().equals("PAGE") && t.getInstantEvent().startsWith("CHANGE_PAGE_CLICK")) {

                        pageReadingReReadingMap.put(t.getUrl(), "1");
                    }
                    if (t.getSource().equals("PAGE") && t.getInstantEvent().equals("LEAVE_PAGE")) {

                        TraceData preTrace = traceDataList.get(k-1);
                        if (preTrace.getInstantEvent().startsWith("CHANGE_PAGE_CLICK")) {
                            t.setSubActionLabel(preTrace.getSubActionLabel());
                            t.setActionLabel(preTrace.getActionLabel());
                        } else {
//                            throw new RuntimeException("no CHANGE_PAGE_CLICK before LEAVE_PAGE");
                            pageReadingReReadingMap.put(t.getUrl(), "1");
                        }
                        needUpdateTraceList.add(t);
                    }
                }

                System.out.println("needUpdateTraceList:" + needUpdateTraceList.size());
                if (!needUpdateTraceList.isEmpty()) {
                    iTraceDataService.updateBatchById(needUpdateTraceList);
                }
            }
        }
    }

    @Autowired
    private ThreadPoolTaskExecutor asyncPoolTaskExecutor;

    /**
     * step 1 可以自动执行修复
     * 多线程执行
     */
    @Test
    public void fixHasCloseButNoOpenLogIssue() {
        for (int i = 0; i < userIdArray.length; i++){
            for(int j=0;j<courseIdArray.length;j++){
                actionAndProcessService.fixHasCloseButNoOpenLogIssue(userIdArray[i], courseIdArray[j]);
            }
        }
        try {
            Thread.sleep(120000L);
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    /**
     * step 2.1 需要手动修复, 手动找到位置，并添加相应的log, 因为没有close，但是有操作过tool
     * 手动找到开始使用的时间，手动创建这个log
     * OPEN planner
     * OPEN essay
     * OPEN search annotation
     */
    @Test
    public void findMissingOpenPlanner() {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < userIdArray.length; i++) {
            for (int j = 0; j < courseIdArray.length; j++) {
                sb.append("processing " + userIdArray[i] + "-----courseid:" + courseIdArray[j] + "\n");
                List<TraceData> traceDataList = iTraceDataService.findAllByUserIdAndCourseIdOrderByTimeAsc((long) userIdArray[i], String.valueOf(courseIdArray[j]));
                TraceData tempMoveOnShowPlannerBtnTraceData = null;
                AtomicInteger countMissingOpen = new AtomicInteger();
                Map<TraceData, List<TraceData>> checkOpenMap = new HashMap<>();
                for (TraceData traceData: traceDataList) {

                    if ("BUTTON#showPlanner2Btn".equals(traceData.getTargetObject())) {
                        tempMoveOnShowPlannerBtnTraceData = traceData;
                        checkOpenMap.put(traceData, new ArrayList<>());
                    } else if (tempMoveOnShowPlannerBtnTraceData != null && Long.parseLong(traceData.getSaveTime()) - Long.parseLong(tempMoveOnShowPlannerBtnTraceData.getSaveTime()) < 2000) {
                        checkOpenMap.get(tempMoveOnShowPlannerBtnTraceData).add(traceData);
                    }
                }

                checkOpenMap.forEach((traceData, traceDataList1) -> {
                    if (CollUtil.isEmpty(traceDataList1)) {
                        return;
                    }
                    boolean noOpen = true;
                    for (TraceData t : traceDataList1) {
                        if ("OPEN".equals(t.getInstantEvent())) {
                            noOpen = false;
                        }
                    }
                    if (noOpen) {
                        countMissingOpen.getAndIncrement();
                        sb.append("no open near this trace-------------------" + traceData + "\n");
                    }
                });
                sb.append("userid:" + userIdArray[i] + " has countMissingOpen:" + countMissingOpen + "\n");

            }
        }

        try (BufferedWriter writer = new BufferedWriter(new FileWriter("F:\\JavaProjects\\FLoRA_backend\\logs\\missing_open_output.txt"))) {
            writer.write(sb.toString());
            System.out.println("Data successfully written to the file.");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    /**
     * step 2.2 需要手动修复, 手动找到位置，并添加相应的log, 因为没有close，但是有操作过tool
     * 手动找到开始使用的时间，手动创建这个log
     * OPEN planner
     * OPEN essay
     * OPEN search annotation
     */
    @Test
    public void manuallyCreateMissingOpenPlanner() {

//String actionLabel, String courseId, long userId, String saveTime, String username, String url, String firstname, String lastname, String source, String pageEvent, String targetObject, String instantEvent, String subActionLabel, String screenX, String screenY, String clientX, String clientY, String windowInnerWidth, String windowInnerHeight, String screenWidth, String screenHeight, String eventValue
        List<TraceData> traceDataList = new ArrayList<>();
        traceDataList.add(manuallyCreateOneTraceData("PLANNER", "76", 2746L, "1706199215210", "CELLA i8e01", "https://nijmegen.floraproject.org/moodle/mod/page/view.php?id=523", "CELLA", "i8e01", "PLANNER", "MANUALLY_ADDED_DATA", "NO_TARGET_OBJECT", "OPEN", "OPEN_PLANNER", "0", "0", "0", "0", "1920", "839", "1280", "720", "START_USE_TOOL:::1706199215210"));
        traceDataList.add(manuallyCreateOneTraceData("PLANNER", "65", 2691L, "1706204826700", "CELLA i7c01", "https://nijmegen.floraproject.org/moodle/mod/page/view.php?id=404", "CELLA", "i7c01", "PLANNER", "MANUALLY_ADDED_DATA", "NO_TARGET_OBJECT", "OPEN", "OPEN_PLANNER", "0", "0", "0", "0", "1536", "695", "1536", "864", "START_USE_TOOL:::1706204826700"));

//        traceDataList.add(manuallyCreateOneTraceData("PLANNER", "65", 2691L, "1706204826700", "CELLA i7c01", "https://nijmegen.floraproject.org/moodle/mod/page/view.php?id=404", "CELLA", "i7c01", "PLANNER", "MANUALLY_ADDED_DATA", "NO_TARGET_OBJECT", "OPEN", "OPEN_PLANNER", "0", "0", "0", "0", "1536", "695", "1536", "864", "START_USE_TOOL:::1706204826700"));




        iTraceDataService.saveBatch(traceDataList);
    }
    private TraceData manuallyCreateOneTraceData(String actionLabel, String courseId, long userId, String saveTime, String username, String url, String firstname, String lastname,
                                                 String source, String pageEvent, String targetObject, String instantEvent, String subActionLabel, String screenX, String screenY,
                                                 String clientX, String clientY, String windowInnerWidth, String windowInnerHeight, String screenWidth, String screenHeight, String eventValue) {
        TraceData manuallyCreatedTraceData = new TraceData();


        manuallyCreatedTraceData.setDetailedActionLabel(null);
        manuallyCreatedTraceData.setActionLabel(actionLabel);
        manuallyCreatedTraceData.setModelType(null);
        manuallyCreatedTraceData.setCourseId(courseId);
        manuallyCreatedTraceData.setProcessLabel(null);

        manuallyCreatedTraceData.setUserId(userId);
        manuallyCreatedTraceData.setSaveTime(saveTime);
        manuallyCreatedTraceData.setUsername(username);
        manuallyCreatedTraceData.setUrl(url);
        manuallyCreatedTraceData.setFirstname(firstname);
        manuallyCreatedTraceData.setLastname(lastname);
        manuallyCreatedTraceData.setSource(source);
        manuallyCreatedTraceData.setPageEvent(pageEvent);
        manuallyCreatedTraceData.setTargetObject(targetObject);
        manuallyCreatedTraceData.setInstantEvent(instantEvent);
        manuallyCreatedTraceData.setSubActionLabel(subActionLabel);
        manuallyCreatedTraceData.setScreenX(screenX);
        manuallyCreatedTraceData.setScreenY(screenY);
        manuallyCreatedTraceData.setClientX(clientX);
        manuallyCreatedTraceData.setClientY(clientY);
        manuallyCreatedTraceData.setWindowInnerWidth(windowInnerWidth);
        manuallyCreatedTraceData.setWindowInnerHeight(windowInnerHeight);
        manuallyCreatedTraceData.setScreenWidth(screenWidth);
        manuallyCreatedTraceData.setScreenHeight(screenHeight);
        manuallyCreatedTraceData.setEventValue(eventValue);
        return manuallyCreatedTraceData;
    }

    /**
     * step 3 自动执行
     */
    @Test
    public void fixEditNoteIssue() {

        for (int i = 0; i < userIdArray.length; i++) {
            for (int j = 0; j < courseIdArray.length; j++) {
                System.out.println("processing " + userIdArray[i] + "-----courseid:" + courseIdArray[j]);

                List<TraceData> traceDataList = iTraceDataService.findAllByUserIdAndCourseIdOrderByTimeAsc((long) userIdArray[i], String.valueOf(courseIdArray[j]));

                List<TraceData> needUpdateTraceDataList = new ArrayList<>();

                for (TraceData traceData : traceDataList) {
                    if ("EDIT_NOTE_BTN".equals(traceData.getTargetObject())) {
                        traceData.setSubActionLabel("EDIT_ANNOTATION");

                    }
                    if ("SAVE_NOTES_BTN".equals(traceData.getTargetObject())) {
                        traceData.setSubActionLabel("EDIT_ANNOTATION");
                    }
                    needUpdateTraceDataList.add(traceData);
                }

                if (!needUpdateTraceDataList.isEmpty()) {
                    iTraceDataService.updateBatchById(needUpdateTraceDataList);
                }
            }
        }
    }

    /**
     * step 4 自动执行
     */
    @Test
    public void fixMouseMoveOnToolsIssue() {
        for (int i = 0; i < userIdArray.length; i++) {
            for (int j = 0; j < courseIdArray.length; j++) {
                System.out.println("processing " + userIdArray[i] + "-----courseid:" + courseIdArray[j]);

                List<TraceData> traceDataList = iTraceDataService.findAllByUserIdAndCourseIdOrderByTimeAsc((long) userIdArray[i], String.valueOf(courseIdArray[j]));
                boolean plannerEditButtonClickStatus = false;
                boolean plannerSaveButtonClickStatus = false;
                boolean plannerOpenStatus = false;

                boolean searchAnnotationOpenStatus = false;

                boolean annotationOpenStatus = false;
                boolean annotationEditStatus = false;

                boolean essayOpenStatus = false;

                String currentUrl = "";
//                boolean urlChanged = false;
                List<TraceData> needUpdatePlannerTraceList = new ArrayList<>();
                List<TraceData> needUpdateEssayTraceList = new ArrayList<>();
                List<TraceData> needUpdateAnnotationTraceList = new ArrayList<>();
                List<TraceData> needUpdateSearchAnnotationTraceList = new ArrayList<>();


                for (TraceData traceData : traceDataList) {
                    if (StrUtil.isEmpty(currentUrl)) {
                        currentUrl = traceData.getUrl();
                    }
                    if (!currentUrl.equals(traceData.getUrl())) {
//                        urlChanged = true;
                        currentUrl = traceData.getUrl();
                        plannerOpenStatus = false;
                        plannerSaveButtonClickStatus = false;
                        plannerEditButtonClickStatus = false;

                        searchAnnotationOpenStatus = false;

                        annotationOpenStatus = false;
                        annotationEditStatus = false;

                        essayOpenStatus = false;
                    }
                    // 如果切换页面，open status 就要变成false， 等待下一次open


                    if ("OPEN_PLANNER".equals(traceData.getSubActionLabel())) {
                        plannerOpenStatus = true;
                    }
                    // 如果出现close event， open status 也变成 false
                    if ("CLOSE_PLANNER".equals(traceData.getSubActionLabel())) {
                        plannerOpenStatus = false;
                    }

                    if ("EDIT_PLANNER".equals(traceData.getSubActionLabel())) {
                        plannerEditButtonClickStatus = true;
                        plannerSaveButtonClickStatus = false;
                    }
                    if ("SAVE_PLANNER".equals(traceData.getSubActionLabel())) {
                        plannerSaveButtonClickStatus = true;
                        plannerEditButtonClickStatus = false;
                    }

                    if ("SEARCH_ANNOTATION".equals(traceData.getSubActionLabel()) && "OPEN".equals(traceData.getInstantEvent())) {
                        searchAnnotationOpenStatus = true;
                    }
                    if (("SEARCH_ANNOTATION".equals(traceData.getSubActionLabel()) || "CLOSE_SEARCH_ANNOTATION".equals(traceData.getSubActionLabel())) && "CLOSE".equals(traceData.getInstantEvent())) {
                        searchAnnotationOpenStatus = false;
                    }
                    if ("READ_ANNOTATION".equals(traceData.getSubActionLabel()) || "CREATE_NOTE".equals(traceData.getSubActionLabel())) {
                        annotationOpenStatus = true;
                    }
                    if ("CLOSE_ANNOTATION".equals(traceData.getSubActionLabel())) {
                        annotationOpenStatus = false;
                    }
                    if ("EDIT_NOTE_BTN".equals(traceData.getTargetObject())) {
                        annotationEditStatus = true;
                    }
                    if ("SAVE_NOTES_BTN".equals(traceData.getTargetObject())) {
                        annotationEditStatus = false;
                    }
                    if ("OPEN_ESSAY".equals(traceData.getSubActionLabel())) {
                        essayOpenStatus = true;
                    }
                    if ("CLOSE_ESSAY".equals(traceData.getSubActionLabel())) {
                        essayOpenStatus = false;
                    }

                    if (("MOUSE_MOVE".equals(traceData.getPageEvent()) || "MOUSE_WHEEL".equals(traceData.getPageEvent())) && (!traceData.getSubActionLabel().equals("TABLE_OF_CONTENT"))) {
                        try {
                            Integer clientX = Integer.parseInt(traceData.getClientX());
                            Integer clientY = Integer.parseInt(traceData.getClientY());
                            Integer windowInnerWidth = Integer.parseInt(traceData.getWindowInnerWidth());
                            Integer windowInnerHeight = Integer.parseInt(traceData.getWindowInnerHeight());


                            // 判定 在 planner上面移动
                            // 识别区域 height 90%    width = 28%   margin right 50px
                            // 起始标志
                            // Save 之前都是 create planner
                            // 点edit 之后 都是 edit planner


                            // 找到 SELECT#learning-strategy-select 之前的 最后一个 BUTTON#showPlanner2Btn
                            if (plannerOpenStatus) {
                                // 区域在planner 上， planner 也是打开状态
                                if (clientX > windowInnerWidth - windowInnerWidth * 0.28 - 50 && clientX < windowInnerWidth - 50 && clientY > windowInnerHeight - windowInnerHeight * 0.9) {
                                    String subActionLabel = "";
                                    if (plannerEditButtonClickStatus) {
                                        subActionLabel = "EDIT_PLANNER";
                                    } else if (plannerSaveButtonClickStatus) {
                                        subActionLabel = "READ_PLANNER";
                                    } else {
                                        subActionLabel = "CREATE_PLANNER";
                                    }
                                    traceData.setSubActionLabel(subActionLabel);
                                    traceData.setActionLabel("PLANNER");

                                    needUpdatePlannerTraceList.add(traceData);
                                }
                            }

                            // 判定在 annotation 上面移动
                            // 识别区域  height 100%  width  500px

                            // 起始标志

                            // 终止标志
                            if (annotationOpenStatus) {
                                if (clientX > windowInnerWidth - 500 - 50) {
                                    String subActionLabel = "READ_ANNOTATION";
                                    if (annotationEditStatus) {
                                        subActionLabel = "EDIT_ANNOTATION";
                                    }
                                    traceData.setSubActionLabel(subActionLabel);
                                    traceData.setActionLabel("ANNOTATION");
                                    needUpdateAnnotationTraceList.add(traceData);
                                }
                            }

                            // 判定在 search annotation 上面移动
                            // 识别区域   height 90%    width = 28%  margin right 50px

                            // 起始标志

                            // 终止标志
                            if (searchAnnotationOpenStatus) {
                                if (clientX > windowInnerWidth - windowInnerWidth * 0.28 - 50 && clientX < windowInnerWidth - 50 && clientY > windowInnerHeight - windowInnerHeight * 0.9) {
                                    traceData.setSubActionLabel("SEARCH_ANNOTATION");
                                    traceData.setActionLabel("SEARCH_ANNOTATION");

                                    needUpdateSearchAnnotationTraceList.add(traceData);
                                }
                            }


                            // 判定在 essay 上面移动
                            // 识别区域 判断essay 是否和 别东工具一起打开   height 60%    width = 50%   margin right 50px
                            // 其他工具打开时，essay  margin-right: 31%


                            // 起始标志

                            // 终止标志
                            if (essayOpenStatus) {
                                if (searchAnnotationOpenStatus || plannerOpenStatus) {
                                    if (clientX > windowInnerWidth - windowInnerWidth * 0.5 - windowInnerWidth * 0.31 && clientX < windowInnerWidth - windowInnerWidth * 0.31 && clientY > windowInnerHeight - windowInnerHeight * 0.6) {
                                        traceData.setSubActionLabel("WRITE_ESSAY");
                                        traceData.setActionLabel("ESSAY");
                                        needUpdateEssayTraceList.add(traceData);
                                    }
                                } else if (clientX > windowInnerWidth - windowInnerWidth * 0.5 - 50 && clientX < windowInnerWidth - 50 && clientY > windowInnerHeight - windowInnerHeight * 0.6) {
                                    traceData.setSubActionLabel("WRITE_ESSAY");
                                    traceData.setActionLabel("ESSAY");
                                    needUpdateEssayTraceList.add(traceData);
                                }
                            }

                        } catch (NumberFormatException numberFormatException) {
                            System.out.println("NumberFormatException:---------------" + traceData.toString());
                        }
                    }
                }

//                needUpdatePlannerTraceList.forEach(t -> {
//                    System.out.println("planner data:" + t.getId() + "-----" + t.getSubActionLabel() + "-----" + t.getActionLabel());
//                });
//                needUpdateEssayTraceList.forEach(t -> {
//                    System.out.println("essay data:" + t.getId() + "-----" + t.getSubActionLabel() + "-----" + t.getActionLabel());
//                });
//                needUpdateAnnotationTraceList.forEach(t -> {
//                    System.out.println("annotation data:" + t.getId() + "-----" + t.getSubActionLabel() + "-----" + t.getActionLabel());
//                });
//                needUpdateSearchAnnotationTraceList.forEach(t -> {
//                    System.out.println("search annotation data:" + t.getId() + "-----" + t.getSubActionLabel() + "-----" + t.getActionLabel());
//                });

                if (!needUpdatePlannerTraceList.isEmpty()) {
                    iTraceDataService.updateBatchById(needUpdatePlannerTraceList);
                }
                if (!needUpdateEssayTraceList.isEmpty()) {
                    iTraceDataService.updateBatchById(needUpdateEssayTraceList);
                }
                if (!needUpdateAnnotationTraceList.isEmpty()) {
                    iTraceDataService.updateBatchById(needUpdateAnnotationTraceList);
                }
                if (!needUpdateSearchAnnotationTraceList.isEmpty()) {
                    iTraceDataService.updateBatchById(needUpdateSearchAnnotationTraceList);
                }
            }
        }

    }

    /**
     * Step 5 option 1: generate process label 自动执行
     */
    @Test
    public void testOuluReProcessing() {
        for (int i = 0; i < userIdArray.length; i++) {
            for (int j = 0; j < courseIdArray.length; j++) {
                System.out.println("processing " + userIdArray[i] + "-----courseid:" + courseIdArray[j]);
//                actionAndProcessService.labelAllProcessLabelPatternsWithoutMouseData((long) userIdArray[i], String.valueOf(courseIdArray[j]), "maria");
                actionAndProcessService.labelAllProcessLabelPatterns((long) userIdArray[i], String.valueOf(courseIdArray[j]), "maria");
            }
        }
    }

    /**
     * Step 5 option 2: remove all mouse move(Reading part) and generate process label 自动执行
     */
    @Test
    public void testRemoveMouseMoveOulu() {
        for (int i = 0; i < userIdArray.length; i++) {
            for (int j = 0; j < courseIdArray.length; j++) {
                removeMouseMove(userIdArray[i], courseIdArray[j]);
            }
        }
    }

    private void removeMouseMove(int userId, int courseId) {
        System.out.println("processing " + userId + "-----courseid:" + courseId);

        //1. 清除所有process label 设置为null
        iTraceDataService.updateProcessLabelToNullByUserIdCourseId((long) userId, String.valueOf(courseId));

        //2. update all CLOSE_SEARCH_ANNOTATION to SEARCH_ANNOTATION
        iTraceDataService.updateCloseSearchAnnotationByUserIdCourseId((long) userId, String.valueOf(courseId));

        //3. delete  leave page 之后有多条 从前一个页面带过来的 trace
        List<Long> needDeleteTraceAfterLeavePageIdList = new ArrayList<>();
        List<TraceData> traceDataForLeavePageList = iTraceDataService.findAllByUserIdAndCourseIdOrderByTimeAsc((long) userId, String.valueOf(courseId));
        boolean monitorStatus = false;
        TraceData leavePageTrace = null;
        for (int k = 0; k < traceDataForLeavePageList.size(); k++) {
            TraceData traceData = traceDataForLeavePageList.get(k);

            if ("LEAVE_PAGE".equals(traceData.getInstantEvent())) {
                monitorStatus = true;
                leavePageTrace = traceData;
            } else {
                if (Set.of("MOUSE_MOVE", "MOUSE_WHEEL").contains(traceData.getPageEvent())) {
                    if (leavePageTrace != null) {
                        if (traceData.getUrl().equals(leavePageTrace.getUrl())) {
                            needDeleteTraceAfterLeavePageIdList.add(traceData.getId());
                        } else {
                            leavePageTrace = null;
                        }
                    }
                }
            }
        }
        System.out.println("needDeleteTraceAfterLeavePageIdList size:" + needDeleteTraceAfterLeavePageIdList.size());
        if (!needDeleteTraceAfterLeavePageIdList.isEmpty()) {
            iTraceDataService.removeByIds(needDeleteTraceAfterLeavePageIdList);
        }

        // find all trace data
        List<TraceData> traceDataList = iTraceDataService.findAllByUserIdAndCourseIdOrderByTimeAsc((long) userId, String.valueOf(courseId));

        String tempCurrentPageUrl = "";

        //fix BODY_CLICK_READING issue
        List<TraceData> needUpdateBodyClickReadingList = new ArrayList<>();


        // fix leave page
        List<TraceData> needUpdateLeavePageList = new ArrayList<>();
        int countNeedFix = 0;
        for (int k = 0; k < traceDataList.size(); k++) {
            TraceData traceData = traceDataList.get(k);

            if (k == 0) {
                tempCurrentPageUrl = traceData.getUrl();
            }

            // change page url, change to other pages
            if (!tempCurrentPageUrl.equals(traceData.getUrl())) {
                System.out.println("k=" + k);
                TraceData lastPageLeavePageLog = traceDataList.get(k - 1);
                if (lastPageLeavePageLog == null) {
                    throw new RuntimeException("lastPageLeavePageLog null, k = " + k + ", userId: " + traceData.getUserId() + ",courseId:" + traceData.getCourseId() + ", itemId:" + traceData.getId());
                }

                if (!"LEAVE_PAGE".equals(lastPageLeavePageLog.getInstantEvent())) {
                    //需要手动创建 Leave page log
                    if ("CHANGE_PAGE_CLICK_READING".equals(lastPageLeavePageLog.getInstantEvent()) || "CHANGE_PAGE_CLICK_PAGE_NAVIGATION".equals(lastPageLeavePageLog.getInstantEvent())) {
                        TraceData manuallyCreatedLeavePageTraceData = createLeavePageTraceData(lastPageLeavePageLog);
                        needUpdateLeavePageList.add(manuallyCreatedLeavePageTraceData);
                    } else {
                        // 需要手动修复
                        countNeedFix++;
                        System.out.println("cannot find CHANGE_PAGE_CLICK_READING and LEAVE_PAGE, k = " + k + ", userId: " + traceData.getUserId() + ",courseId:" + traceData.getCourseId() + ", itemId:" + traceData.getId());
//                                throw new RuntimeException("cannot find CHANGE_PAGE_CLICK_READING and LEAVE_PAGE, k = " + k + ", userId: " + traceData.getUserId() + ",courseId:" + traceData.getCourseId() + ", itemId:" + traceData.getId());
                    }
                }
                tempCurrentPageUrl = traceData.getUrl(); // 更新当前页面url
            }

            // 修复单独的BODY_CLICK_READING 错误
            if (traceData.getInstantEvent().equals("BODY_CLICK_READING")) {
                if (traceDataList.get(k - 1).getSubActionLabel().equals("TABLE_OF_CONTENT") && traceDataList.get(k + 1).getSubActionLabel().equals("TABLE_OF_CONTENT")) {
                    traceData.setSubActionLabel("TABLE_OF_CONTENT");
                    traceData.setActionLabel("NAVIGATION");
                    needUpdateBodyClickReadingList.add(traceData);
                }
            }
        }
        if (countNeedFix != 0) {
            System.out.println("countNeedFix = " + countNeedFix);
//                    throw new RuntimeException("cannot find CHANGE_PAGE_CLICK_READING and LEAVE_PAGE");
        }

        System.out.println("needUpdateLeavePageList size:" + needUpdateLeavePageList.size());
        System.out.println("needUpdateBodyClickReadingList size:" + needUpdateBodyClickReadingList.size());

        if (!needUpdateLeavePageList.isEmpty()) {
            iTraceDataService.saveBatch(needUpdateLeavePageList);
        }
        if (!needUpdateBodyClickReadingList.isEmpty()) {
            iTraceDataService.updateBatchById(needUpdateBodyClickReadingList);
        }
        // delete mouse move (action label: reading / instruction)
        List<TraceData> traceDataList2 = iTraceDataService.findAllByUserIdAndCourseIdOrderByTimeAsc((long) userId, String.valueOf(courseId));
        List<Long> needDeleteTraceDataIdList = new ArrayList<>();
        for (int k = 0; k < traceDataList2.size(); k++) {
            TraceData traceData = traceDataList2.get(k);

            // 删除 mouse move 的 TABLE_OF_CONTENT
            if (traceData.getPageEvent().equals("MOUSE_MOVE") && traceData.getSubActionLabel().equals("TABLE_OF_CONTENT")) {
                needDeleteTraceDataIdList.add(traceData.getId());
            }

            if (Set.of("MOUSE_MOVE", "MOUSE_WHEEL").contains(traceData.getPageEvent()) &&
                    Set.of("TASK_REQUIREMENT", "RUBRIC", "RELEVANT_READING", "RELEVANT_REREADING").contains(traceData.getSubActionLabel())) {

                // mouse 之前是 START_TASK
                if (k > 1 && traceDataList2.get(k - 1).getSubActionLabel().equals("START_TASK")) {
                    continue;
                }

                if (k == traceDataList2.size() - 1) {
                    continue;
                }

                if (k > 1 && ("TIMER".equals(traceDataList2.get(k - 1).getSource()) || "TIMER".equals(traceDataList2.get(k + 1).getSource())) &&
                        ("OPEN".equals(traceDataList2.get(k - 1).getInstantEvent()) || "OPEN".equals(traceDataList2.get(k + 1).getInstantEvent()))) {
                    continue;
                }

                // mouse 之前是close tool
                if (k > 1 && (
                        Set.of("CLOSE_ESSAY", "CLOSE_PLANNER", "CLOSE_ANNOTATION").contains(traceDataList2.get(k - 1).getSubActionLabel()) ||
                        (traceDataList2.get(k - 1).getInstantEvent().equals("CLOSE") && (traceDataList2.get(k - 1).getSubActionLabel().equals("SEARCH_ANNOTATION") || traceDataList2.get(k - 1).getSubActionLabel().equals("TRY_OUT_TOOLS"))))) {
                    continue;
                }

                // mouse 之后是open tool
                if (Set.of("OPEN_ESSAY", "OPEN_PLANNER", "OPEN_ANNOTATION", "CREATE_NOTE", "CREATE_HIGHLIGHT")
                        .contains(traceDataList2.get(k + 1).getSubActionLabel()) ||
                        (traceDataList2.get(k + 1).getInstantEvent().equals("OPEN") && (traceDataList2.get(k + 1).getSubActionLabel().equals("SEARCH_ANNOTATION") || traceDataList2.get(k + 1).getSubActionLabel().equals("TRY_OUT_TOOLS")))) {
                    continue;
                }

                // mouse 之前是leave page
                if (k > 1 && traceDataList2.get(k - 1).getInstantEvent().equals("LEAVE_PAGE")) {
                    continue;
                }

                // mouse 之后是leave page
                if (traceDataList2.get(k + 1).getInstantEvent().equals("LEAVE_PAGE")) {
                    continue;
                }

                needDeleteTraceDataIdList.add(traceData.getId());
            }
        }

        System.out.println("needDeleteTraceDataIdList size:" + needDeleteTraceDataIdList.size());
        if (!needDeleteTraceDataIdList.isEmpty()) {
            iTraceDataService.removeByIds(needDeleteTraceDataIdList);
        }

        // 查询所有open close event,
//                addTryOutTools(userId, courseId);

        //label process
        actionAndProcessService.labelAllProcessLabelPatterns((long) userId, String.valueOf(courseId), "maria");

    }

    private void addTryOutTools(int userId, int courseId) {
        List<TraceData> allOpenCloseTraceDataList = iTraceDataService.findAllOpenCloseTraceDataByUserIdCourseId((long) userId, String.valueOf(courseId));
        Map<String, String> toolUsedMap = new HashMap<>();

        TraceData currentOpenEssayTool = null;
        TraceData currentOpenPlannerTool = null;
        TraceData currentOpenAnnotationTool = null;
        TraceData currentOpenSearchAnnotationTool = null;

        List<TraceData> needUpdateOpenCloseToolsList = new ArrayList<>();
        for (int k = 0; k < allOpenCloseTraceDataList.size(); k++) {
            TraceData openCloseTrace = allOpenCloseTraceDataList.get(k);
            // 第一次打开并小于3秒 就是 try out tools
            if (openCloseTrace.getInstantEvent().equals("OPEN") && openCloseTrace.getSource().equals("TIMER")) {
                if (toolUsedMap.containsKey("TIMER")) {
                    continue;
                } else {
                    openCloseTrace.setSubActionLabel("TRY_OUT_TOOLS");
                    needUpdateOpenCloseToolsList.add(openCloseTrace);
                    toolUsedMap.put("TIMER", "used");
                }
            } else if (openCloseTrace.getInstantEvent().equals("OPEN") && openCloseTrace.getSource().equals("ESSAY")) {

                if (toolUsedMap.containsKey("CLOSE_ESSAY")) {
                    continue;
                }

                if (currentOpenEssayTool != null) { // 存在 只有OPEN essay，但是没有CLOSE essay 情况
                    toolUsedMap.put("CLOSE_ESSAY", "used"); // 表示已经使用过该工具
                    currentOpenEssayTool = null;
                } else {
                    currentOpenEssayTool = openCloseTrace; // 待查
                }
            } else if (openCloseTrace.getInstantEvent().equals("CLOSE") && openCloseTrace.getSource().equals("ESSAY")) {
                if (toolUsedMap.containsKey("CLOSE_ESSAY")) {
                    continue;
                } else {
                    int toolUseLength = Integer.parseInt(openCloseTrace.getEventValue().split(":::")[1]);
                    if (toolUseLength < 3000) {
                        currentOpenEssayTool.setSubActionLabel("TRY_OUT_TOOLS");
                        openCloseTrace.setSubActionLabel("TRY_OUT_TOOLS");
                        needUpdateOpenCloseToolsList.add(openCloseTrace);
                        needUpdateOpenCloseToolsList.add(currentOpenEssayTool);

                        System.out.println("-----------------------------");
                        System.out.println(currentOpenEssayTool);
                        System.out.println(openCloseTrace);
                        System.out.println("-----------------------------");
                        toolUsedMap.put("CLOSE_ESSAY", "used");
                    }
                    currentOpenEssayTool = null;
                }
            } else if (openCloseTrace.getInstantEvent().equals("OPEN") && openCloseTrace.getSource().equals("PLANNER")) {
                if (toolUsedMap.containsKey("CLOSE_PLANNER")) {
                    continue;
                }

                if (currentOpenPlannerTool != null) { // 存在 只有OPEN planner，但是没有CLOSE planner 情况
                    toolUsedMap.put("CLOSE_PLANNER", "used"); // 表示已经使用过该工具
                    currentOpenPlannerTool = null;
                } else {
                    currentOpenPlannerTool = openCloseTrace; // 待查
                }
            } else if (openCloseTrace.getInstantEvent().equals("CLOSE") && openCloseTrace.getSource().equals("PLANNER")) {
                if (toolUsedMap.containsKey("CLOSE_PLANNER")) {
                    continue;
                } else {
                    int toolUseLength = Integer.parseInt(openCloseTrace.getEventValue().split(":::")[1]);
                    if (toolUseLength < 3000) {
                        currentOpenPlannerTool.setSubActionLabel("TRY_OUT_TOOLS");
                        openCloseTrace.setSubActionLabel("TRY_OUT_TOOLS");
                        needUpdateOpenCloseToolsList.add(openCloseTrace);
                        needUpdateOpenCloseToolsList.add(currentOpenPlannerTool);

                        System.out.println("-----------------------------");
                        System.out.println(currentOpenPlannerTool);
                        System.out.println(openCloseTrace);
                        System.out.println("-----------------------------");
                        toolUsedMap.put("CLOSE_PLANNER", "used");
                    }
                    currentOpenPlannerTool = null;
                }
            } else if (openCloseTrace.getInstantEvent().equals("OPEN") && openCloseTrace.getSource().equals("ANNOTATION")) {
                if (toolUsedMap.containsKey("CLOSE_ANNOTATION")) {
                    continue;
                }
                if (currentOpenAnnotationTool != null) {
                    toolUsedMap.put("CLOSE_ANNOTATION", "used");
                    currentOpenAnnotationTool = null;
                } else {
                    currentOpenAnnotationTool = openCloseTrace;
                }
            } else if (openCloseTrace.getInstantEvent().equals("CLOSE") && openCloseTrace.getSource().equals("ANNOTATION")) {
                if (toolUsedMap.containsKey("CLOSE_ANNOTATION")) {
                    continue;
                } else {
                    int toolUseLength = Integer.parseInt(openCloseTrace.getEventValue().split(":::")[1]);
                    if (toolUseLength < 3000) {
                        currentOpenAnnotationTool.setSubActionLabel("TRY_OUT_TOOLS");
                        openCloseTrace.setSubActionLabel("TRY_OUT_TOOLS");
                        needUpdateOpenCloseToolsList.add(openCloseTrace);
                        needUpdateOpenCloseToolsList.add(currentOpenAnnotationTool);

                        System.out.println("-----------------------------");
                        System.out.println(currentOpenAnnotationTool);
                        System.out.println(openCloseTrace);
                        System.out.println("-----------------------------");
                        toolUsedMap.put("CLOSE_ANNOTATION", "used");
                    }
                    currentOpenAnnotationTool = null;
                }
            } else if (openCloseTrace.getInstantEvent().equals("OPEN") && openCloseTrace.getSource().equals("SEARCH_ANNOTATION")) {
                if (toolUsedMap.containsKey("CLOSE_SEARCH_ANNOTATION")) {
                    continue;
                }
                if (currentOpenSearchAnnotationTool != null) {
                    toolUsedMap.put("CLOSE_SEARCH_ANNOTATION", "used");
                    currentOpenSearchAnnotationTool = null;
                } else {
                    currentOpenSearchAnnotationTool = openCloseTrace;
                }
            } else if (openCloseTrace.getInstantEvent().equals("CLOSE") && openCloseTrace.getSource().equals("SEARCH_ANNOTATION")) {
                if (toolUsedMap.containsKey("CLOSE_SEARCH_ANNOTATION")) {
                    continue;
                } else {
                    int toolUseLength = Integer.parseInt(openCloseTrace.getEventValue().split(":::")[1]);
                    if (toolUseLength < 3000) {
                        currentOpenSearchAnnotationTool.setSubActionLabel("TRY_OUT_TOOLS");
                        openCloseTrace.setSubActionLabel("TRY_OUT_TOOLS");
                        needUpdateOpenCloseToolsList.add(openCloseTrace);
                        needUpdateOpenCloseToolsList.add(currentOpenSearchAnnotationTool);

                        System.out.println("-----------------------------");
                        System.out.println(currentOpenSearchAnnotationTool);
                        System.out.println(openCloseTrace);
                        System.out.println("-----------------------------");
                        toolUsedMap.put("CLOSE_SEARCH_ANNOTATION", "used");
                    }
                    currentOpenSearchAnnotationTool = null;
                }
            }
        }

        iTraceDataService.updateBatchById(needUpdateOpenCloseToolsList);
    }

    private TraceData createLeavePageTraceData(TraceData lastPageLeavePageLog) {


        long saveTime = Long.parseLong(lastPageLeavePageLog.getSaveTime()) + 1;

        TraceData manuallyCreatedTraceData = new TraceData();

        manuallyCreatedTraceData.setDetailedActionLabel(null);
        manuallyCreatedTraceData.setActionLabel(lastPageLeavePageLog.getActionLabel());
        manuallyCreatedTraceData.setModelType(null);
        manuallyCreatedTraceData.setCourseId(lastPageLeavePageLog.getCourseId());
        manuallyCreatedTraceData.setProcessLabel(null);

        manuallyCreatedTraceData.setUserId(lastPageLeavePageLog.getUserId());
        manuallyCreatedTraceData.setSaveTime(String.valueOf(saveTime));
        manuallyCreatedTraceData.setUsername(lastPageLeavePageLog.getUsername());
        manuallyCreatedTraceData.setUrl(lastPageLeavePageLog.getUrl());
        manuallyCreatedTraceData.setFirstname(lastPageLeavePageLog.getFirstname());
        manuallyCreatedTraceData.setLastname(lastPageLeavePageLog.getLastname());
        manuallyCreatedTraceData.setSource(lastPageLeavePageLog.getSource());
        manuallyCreatedTraceData.setPageEvent("MANUALLY_ADDED_DATA");
        manuallyCreatedTraceData.setTargetObject("NO_TARGET_OBJECT");
        manuallyCreatedTraceData.setInstantEvent("LEAVE_PAGE");
        manuallyCreatedTraceData.setSubActionLabel(lastPageLeavePageLog.getSubActionLabel());
        manuallyCreatedTraceData.setScreenX("0");
        manuallyCreatedTraceData.setScreenY("0");
        manuallyCreatedTraceData.setClientX("0");
        manuallyCreatedTraceData.setClientY("0");
        manuallyCreatedTraceData.setWindowInnerWidth(lastPageLeavePageLog.getWindowInnerWidth());
        manuallyCreatedTraceData.setWindowInnerHeight(lastPageLeavePageLog.getWindowInnerHeight());
        manuallyCreatedTraceData.setScreenWidth(lastPageLeavePageLog.getScreenWidth());
        manuallyCreatedTraceData.setScreenHeight(lastPageLeavePageLog.getScreenHeight());
        manuallyCreatedTraceData.setEventValue("");
        return manuallyCreatedTraceData;
    }



    /**
     *
     *
     *SELECT count(*)
     * FROM trace_data
     * WHERE save_time > '1704027600000' and
     *       NOT (
     *     (page_event = 'MOUSE_MOVE' OR page_event = 'MOUSE_WHEEL' or page_event = 'MOUSE_CLICK')
     *     AND (sub_action_label LIKE '%READING' OR sub_action_label = 'PAGE_NAVIGATION' OR  instant_event='BODY_CLICK_READING')
     * );  # number of item: 11311604
     *
     * select count(*) from trace_data WHERE save_time > '1704027600000'; # number of item: 25308384
     *
     *
     *
     */
//    @Test
//    public void testNijmegenRemoveMouseData() {
//        int[][] userIdCourseIdArray = {
//                {2312 , 40}, {2270 , 40}, {2271 , 40}, {2274 , 40}, {2280 , 40}, {2287 , 40}, {2275 , 40}, {2276 , 40}, {2268 , 40}, {2277 , 40}, {2293 , 40}, {2269 , 40}, {2288 , 40}, {2272 , 40}, {2281 , 40},
//                {2290 , 40}, {2289 , 40}, {2284 , 40}, {2265 , 40}, {2264 , 40}, {2266 , 40}, {2283 , 40}, {2278 , 40}, {2267 , 40}, {2294 , 40}, {2291 , 40}, {2292 , 40}, {2282 , 40}, {2002 , 65}, {1711 , 76},
//                {1711 , 64}, {1994 , 65}, {2000 , 65}, {2000 , 76}, {2000 , 64}, {2680 , 64}, {2682 , 64}, {2676 , 76}, {2001 , 76}, {2681 , 64}, {2680 , 65}, {2681 , 65}, {2682 , 65}, {2676 , 65}, {2001 , 65},
//                {1725 , 40}, {2003 , 76}, {2003 , 65}, {2311 , 40}, {2689 , 49}, {2002 , 76}, {2674 , 65}, {2675 , 65}, {2677 , 76}, {2677 , 65}, {2683 , 64}, {2683 , 65}, {2689 , 50}, {1999 , 76}, {1725 , 25},
//                {2678 , 76}, {2678 , 65}, {2679 , 76}, {2679 , 65}, {2685 , 64}, {2686 , 64}, {1711 , 65}, {2684 , 64}, {2685 , 65}, {2686 , 65}, {2674 , 76}, {2684 , 65}, {2746 , 76}, {2711 , 64}, {2746 , 65},
//                {2711 , 65}, {2691 , 64}, {2726 , 76}, {2691 , 65}, {2726 , 65}, {2303 , 40}, {2304 , 40}, {2714 , 64}, {2717 , 64}, {2712 , 64}, {2716 , 64}, {2715 , 64}, {2718 , 64}, {2719 , 64}, {2713 , 64},
//                {2748 , 76}, {2749 , 76}, {2754 , 76}, {2753 , 76}, {2752 , 76}, {2747 , 76}, {2750 , 76}, {2757 , 76}, {2756 , 76}, {2755 , 76}, {2751 , 76}, {2715 , 65}, {2716 , 65}, {2712 , 65}, {2718 , 65},
//                {2719 , 65}, {2714 , 65}, {2717 , 65}, {2713 , 65}, {2754 , 65}, {2752 , 65}, {2748 , 65}, {2753 , 65}, {2750 , 65}, {2747 , 65}, {2757 , 65}, {2755 , 65}, {2756 , 65}, {2749 , 65}, {2751 , 65},
//                {2502 , 25}, {2512 , 25}, {2504 , 25}, {2498 , 25}, {2506 , 25}, {2519 , 25}, {2511 , 25}, {2500 , 25}, {2499 , 25}, {2495 , 25}, {2503 , 25}, {2508 , 25}, {2516 , 25}, {2496 , 25}, {2501 , 25},
//                {2509 , 25}, {2520 , 25}, {2510 , 25}, {2507 , 25}, {2497 , 25}, {2494 , 25}, {2732 , 76}, {2693 , 64}, {2735 , 76}, {2697 , 64}, {2694 , 64}, {2695 , 64}, {2703 , 64}, {2692 , 64}, {2698 , 64},
//                {2700 , 64}, {2699 , 64}, {2701 , 64}, {2702 , 64}, {2696 , 64}, {2734 , 76}, {2727 , 76}, {2729 , 76}, {2739 , 76}, {2738 , 76}, {2728 , 76}, {2730 , 76}, {2733 , 76}, {2736 , 76}, {2737 , 76},
//                {2740 , 76}, {2731 , 76}, {2734 , 65}, {2740 , 65}, {2735 , 65}, {2738 , 65}, {2739 , 65}, {2733 , 65}, {2729 , 65}, {2730 , 65}, {2732 , 65}, {2736 , 65}, {2737 , 65}, {2727 , 65}, {2728 , 65},
//                {2731 , 65}, {2700 , 65}, {2693 , 65}, {2694 , 65}, {2696 , 65}, {2703 , 65}, {2695 , 65}, {2698 , 65}, {2692 , 65}, {2697 , 65}, {2699 , 65}, {2702 , 65}, {2701 , 65}, {2901 , 76}, {2871 , 64},
//                {2871 , 65}, {2901 , 65}, {2961 , 76}, {2931 , 64}, {2961 , 65}, {2931 , 65}, {2940 , 64}, {2967 , 76}, {2974 , 76}, {2968 , 76}, {2972 , 76}, {2976 , 76}, {2939 , 64}, {2964 , 76}, {2962 , 76},
//                {2970 , 76}, {2937 , 64}, {2934 , 64}, {2973 , 76}, {2975 , 76}, {2965 , 76}, {2938 , 64}, {2932 , 64}, {2933 , 64}, {2944 , 64}, {2963 , 76}, {2971 , 76}, {2936 , 64}, {2943 , 64}, {2969 , 76},
//                {2942 , 64}, {2941 , 64}, {2977 , 76}, {2945 , 64}, {2948 , 64}, {2946 , 64}, {2947 , 64}, {2964 , 65}, {2963 , 65}, {2934 , 65}, {2938 , 65}, {2948 , 65}, {2944 , 65}, {2942 , 65}, {2937 , 65},
//                {2933 , 65}, {2943 , 65}, {2932 , 65}, {2945 , 65}, {2940 , 65}, {2941 , 65}, {2939 , 65}, {2946 , 65}, {2936 , 65}, {2962 , 65}, {2974 , 65}, {2975 , 65}, {2977 , 65}, {2967 , 65}, {2969 , 65},
//                {2976 , 65}, {2965 , 65}, {2971 , 65}, {2972 , 65}, {2968 , 65}, {2973 , 65}, {2970 , 65}, {2947 , 65}, {2978 , 65}, {2979 , 65}, {2980 , 65}, {2981 , 65}, {2982 , 65}, {2983 , 65}, {2950 , 65},
//                {2949 , 65}, {2951 , 65}, {2952 , 65}, {2984 , 65}, {2953 , 65}, {2954 , 65}, {2986 , 65}, {2706 , 65}, {2707 , 65}, {2985 , 65}, {2987 , 65}, {2310 , 25}, {2310 , 40}, {2309 , 25}, {2988 , 76},
//                {2988 , 65}, {2885 , 64}, {2873 , 64}, {2876 , 64}, {2881 , 64}, {2877 , 64}, {2878 , 64}, {2882 , 64}, {2883 , 64}, {2911 , 76}, {2912 , 76}, {2872 , 64}, {2915 , 76}, {2875 , 64}, {2909 , 76},
//                {2913 , 76}, {2907 , 76}, {2906 , 76}, {2905 , 76}, {2919 , 76}, {2903 , 76}, {2874 , 64}, {2879 , 64}, {2908 , 76}, {2914 , 76}, {2916 , 76}, {2921 , 76}, {2923 , 76}, {2924 , 76}, {2917 , 76},
//                {2887 , 64}, {2876 , 65}, {2879 , 65}, {2877 , 65}, {2882 , 65}, {2883 , 65}, {2878 , 65}, {2881 , 65}, {2885 , 65}, {2873 , 65}, {2875 , 65}, {2872 , 65}, {2874 , 65}, {2880 , 65}, {2912 , 65},
//                {2915 , 65}, {2913 , 65}, {2906 , 65}, {2905 , 65}, {2921 , 65}, {2923 , 65}, {2903 , 65}, {2914 , 65}, {2911 , 65}, {2916 , 65}, {2909 , 65}, {2908 , 65}, {2907 , 65}, {2919 , 65}, {2924 , 65},
//                {2917 , 65}, {2887 , 65}, {13 , 49},   {1725 , 36}, {13 , 40},   {805 , 49},  {805 , 50},  {2309 , 40}, {2268 , 25}, {2508 , 40}, {2514 , 40}, {2499 , 40}, {2504 , 40}, {2505 , 40}, {2498 , 40},
//                {2502 , 40}, {2517 , 40}, {2506 , 40}, {2512 , 40}, {2511 , 40}, {2495 , 40}, {2510 , 40}, {2503 , 40}, {2516 , 40}, {2507 , 40}, {2515 , 40}, {2497 , 40}, {2509 , 40}, {2269 , 25}, {2578 , 25},
//                {2559 , 25}, {2570 , 25}, {2576 , 25}, {2571 , 25}, {2575 , 25}, {2561 , 25}, {2569 , 25}, {2567 , 25}, {2563 , 25}, {2577 , 25}, {2579 , 25}, {2573 , 25}, {2556 , 25}, {2554 , 25}, {2555 , 25},
//                {2557 , 25}, {2568 , 25}, {2558 , 25}, {2562 , 25}, {2565 , 25}, {2580 , 25}, {2564 , 25}, {809 , 49}, {2542 , 25}, {2538 , 25}, {2541 , 25}, {2537 , 25}, {2539 , 25}, {2533 , 25}, {2536 , 25},
//                {2532 , 25}, {2525 , 25}, {2545 , 25}, {2526 , 25}, {2540 , 25}, {2546 , 25}, {2534 , 25}, {2529 , 25}, {2528 , 25}, {2527 , 25}, {2530 , 25}, {2535 , 25}, {2524 , 25}, {2543 , 25}, {2531 , 25},
//                {2544 , 25}, {809 , 50}, {809 , 51}, {2306 , 25}, {2271 , 25}, {2305 , 25}, {2584 , 25}, {2606 , 25}, {2600 , 25}, {2599 , 25}, {2590 , 25}, {2608 , 25}, {2585 , 25}, {2592 , 25}, {2601 , 25},
//                {2591 , 25}, {2604 , 25}, {2594 , 25}, {2605 , 25}, {2610 , 25}, {2588 , 25}, {2598 , 25}, {2602 , 25}, {2607 , 25}, {2586 , 25}, {2587 , 25}, {2596 , 25}, {2611 , 25}, {2589 , 25}, {2612 , 25},
//                {2609 , 25}, {2572 , 25}, {2574 , 25}, {2566 , 25}, {2560 , 25}, {2595 , 25}, {2606 , 40}, {2612 , 40}, {2584 , 40}, {2607 , 40}, {2600 , 40}, {2608 , 40}, {2592 , 40}, {2585 , 40}, {2602 , 40},
//                {2591 , 40}, {2599 , 40}, {2590 , 40}, {2605 , 40}, {2595 , 40}, {2596 , 40}, {2601 , 40}, {2594 , 40}, {2587 , 40}, {2598 , 40}, {2589 , 40}, {2586 , 40}, {2611 , 40}, {2610 , 40}, {2609 , 40},
//                {2559 , 40}, {2568 , 40}, {2554 , 40}, {2570 , 40}, {2567 , 40}, {2578 , 40}, {2561 , 40}, {2572 , 40}, {2571 , 40}, {2563 , 40}, {2580 , 40}, {2562 , 40}, {2573 , 40}, {2574 , 40}, {2575 , 40},
//                {2557 , 40}, {2576 , 40}, {2577 , 40}, {2565 , 40}, {2569 , 40}, {2560 , 40}, {2556 , 40}, {2566 , 40}, {2558 , 40}, {2539 , 40}, {2541 , 40}, {2546 , 40}, {2537 , 40}, {2526 , 40}, {2529 , 40},
//                {2543 , 40}, {2542 , 40}, {2531 , 40}, {2540 , 40}, {2536 , 40}, {2524 , 40}, {2538 , 40}, {2528 , 40}, {2534 , 40}, {2533 , 40}, {2525 , 40}, {2530 , 40}, {2527 , 40}, {2535 , 40}, {2544 , 40},
//                {2604 , 40}, {2588 , 40}, {2545 , 40}, {2532 , 40}, {1711 , 84}};
//
//        for (int i = 0; i < userIdCourseIdArray.length; i++) {
//            int userId = userIdCourseIdArray[i][0];
//            int courseId = userIdCourseIdArray[i][1];
//            System.out.println("processing " + userId + "-----courseid:" + courseId);
//            actionAndProcessService.labelAllProcessLabelPatternsWithoutMouseData((long) userId, String.valueOf(courseId), "maria");
//        }
//    }

    @Test
    public void manuallyAddData() {
        List<TraceData> traceDataList = new ArrayList<>();
//        traceDataList.add(manuallyCreateOneTraceData("INSTRUCTION", "40", 2059L, "1699952747905", "student56 rus2", "https://nijmegen.floraproject.org/moodle/mod/page/view.php?id=226", "student56", "rus2", "PAGE", "MANUALLY_ADDED_DATA", "NO_TARGET_OBJECT", "CHANGE_PAGE_CLICK_READING", "TASK_REQUIREMENT", "0", "0", "0", "0", "1366", "950", "1024", "1366", "NEXT_PAGE_URL:::https://nijmegen.floraproject.org/moodle/mod/page/view.php?id=227"));
//        traceDataList.add(manuallyCreateOneTraceData("INSTRUCTION", "40", 2059L, "1699952747906", "student56 rus2", "https://nijmegen.floraproject.org/moodle/mod/page/view.php?id=226", "student56", "rus2", "PAGE", "MANUALLY_ADDED_DATA", "NO_TARGET_OBJECT", "LEAVE_PAGE", "TASK_REQUIREMENT", "0", "0", "0", "0", "1366", "950", "1024", "1366", "PAGE_STAY_TIME_LENGTH:::17997"));
//
//        traceDataList.add(manuallyCreateOneTraceData("READING", "40", 2059L, "1699952998532", "student56 rus2", "https://nijmegen.floraproject.org/moodle/mod/page/view.php?id=228", "student56", "rus2", "PAGE", "MANUALLY_ADDED_DATA", "NO_TARGET_OBJECT", "CHANGE_PAGE_CLICK_READING", "RELEVANT_READING", "0", "0", "0", "0", "1366", "950", "1024", "1366", "NEXT_PAGE_URL:::https://nijmegen.floraproject.org/moodle/mod/page/view.php?id=229"));
//        traceDataList.add(manuallyCreateOneTraceData("READING", "40", 2059L, "1699952998533", "student56 rus2", "https://nijmegen.floraproject.org/moodle/mod/page/view.php?id=228", "student56", "rus2", "PAGE", "MANUALLY_ADDED_DATA", "NO_TARGET_OBJECT", "LEAVE_PAGE", "RELEVANT_READING", "0", "0", "0", "0", "1366", "950", "1024", "1366", "PAGE_STAY_TIME_LENGTH:::142408"));
//
//        traceDataList.add(manuallyCreateOneTraceData("READING", "40", 2059L, "1699953059298", "student56 rus2", "https://nijmegen.floraproject.org/moodle/mod/page/view.php?id=229", "student56", "rus2", "PAGE", "MANUALLY_ADDED_DATA", "NO_TARGET_OBJECT", "CHANGE_PAGE_CLICK_READING", "RELEVANT_READING", "0", "0", "0", "0", "1366", "950", "1024", "1366", "NEXT_PAGE_URL:::https://nijmegen.floraproject.org/moodle/mod/page/view.php?id=230"));
//        traceDataList.add(manuallyCreateOneTraceData("READING", "40", 2059L, "1699953059299", "student56 rus2", "https://nijmegen.floraproject.org/moodle/mod/page/view.php?id=229", "student56", "rus2", "PAGE", "MANUALLY_ADDED_DATA", "NO_TARGET_OBJECT", "LEAVE_PAGE", "RELEVANT_READING", "0", "0", "0", "0", "1366", "950", "1024", "1366", "PAGE_STAY_TIME_LENGTH:::55897"));
//
//        traceDataList.add(manuallyCreateOneTraceData("READING", "40", 2059L, "1699953550573", "student56 rus2", "https://nijmegen.floraproject.org/moodle/mod/page/view.php?id=230", "student56", "rus2", "PAGE", "MANUALLY_ADDED_DATA", "NO_TARGET_OBJECT", "CHANGE_PAGE_CLICK_READING", "RELEVANT_READING", "0", "0", "0", "0", "1366", "950", "1024", "1366", "NEXT_PAGE_URL:::https://nijmegen.floraproject.org/moodle/mod/page/view.php?id=231"));
//        traceDataList.add(manuallyCreateOneTraceData("READING", "40", 2059L, "1699953550575", "student56 rus2", "https://nijmegen.floraproject.org/moodle/mod/page/view.php?id=230", "student56", "rus2", "PAGE", "MANUALLY_ADDED_DATA", "NO_TARGET_OBJECT", "LEAVE_PAGE", "RELEVANT_READING", "0", "0", "0", "0", "1366", "950", "1024", "1366", "PAGE_STAY_TIME_LENGTH:::124146"));
//
//        traceDataList.add(manuallyCreateOneTraceData("READING", "40", 2059L, "1699953687874", "student56 rus2", "https://nijmegen.floraproject.org/moodle/mod/page/view.php?id=231", "student56", "rus2", "PAGE", "MANUALLY_ADDED_DATA", "NO_TARGET_OBJECT", "CHANGE_PAGE_CLICK_READING", "RELEVANT_READING", "0", "0", "0", "0", "1366", "950", "1024", "1366", "NEXT_PAGE_URL:::https://nijmegen.floraproject.org/moodle/mod/page/view.php?id=232"));
//        traceDataList.add(manuallyCreateOneTraceData("READING", "40", 2059L, "1699953687875", "student56 rus2", "https://nijmegen.floraproject.org/moodle/mod/page/view.php?id=231", "student56", "rus2", "PAGE", "MANUALLY_ADDED_DATA", "NO_TARGET_OBJECT", "LEAVE_PAGE", "RELEVANT_READING", "0", "0", "0", "0", "1366", "950", "1024", "1366", "PAGE_STAY_TIME_LENGTH:::115267"));
//
//
//
//        traceDataList.add(manuallyCreateOneTraceData("READING", "40", 2059L, "1699953926013", "student56 rus2", "https://nijmegen.floraproject.org/moodle/mod/page/view.php?id=232", "student56", "rus2", "PAGE", "MANUALLY_ADDED_DATA", "NO_TARGET_OBJECT", "CHANGE_PAGE_CLICK_READING", "RELEVANT_READING", "0", "0", "0", "0", "1366", "950", "1024", "1366", "NEXT_PAGE_URL:::https://nijmegen.floraproject.org/moodle/mod/page/view.php?id=233"));
//        traceDataList.add(manuallyCreateOneTraceData("READING", "40", 2059L, "1699953926015", "student56 rus2", "https://nijmegen.floraproject.org/moodle/mod/page/view.php?id=232", "student56", "rus2", "PAGE", "MANUALLY_ADDED_DATA", "NO_TARGET_OBJECT", "LEAVE_PAGE", "RELEVANT_READING", "0", "0", "0", "0", "1366", "950", "1024", "1366", "PAGE_STAY_TIME_LENGTH:::189579"));
//
//        traceDataList.add(manuallyCreateOneTraceData("READING", "40", 2059L, "1699954040343", "student56 rus2", "https://nijmegen.floraproject.org/moodle/mod/page/view.php?id=233", "student56", "rus2", "PAGE", "MANUALLY_ADDED_DATA", "NO_TARGET_OBJECT", "CHANGE_PAGE_CLICK_READING", "RELEVANT_READING", "0", "0", "0", "0", "1366", "950", "1024", "1366", "NEXT_PAGE_URL:::https://nijmegen.floraproject.org/moodle/mod/page/view.php?id=225"));
//        traceDataList.add(manuallyCreateOneTraceData("READING", "40", 2059L, "1699954040345", "student56 rus2", "https://nijmegen.floraproject.org/moodle/mod/page/view.php?id=233", "student56", "rus2", "PAGE", "MANUALLY_ADDED_DATA", "NO_TARGET_OBJECT", "LEAVE_PAGE", "RELEVANT_READING", "0", "0", "0", "0", "1366", "950", "1024", "1366", "PAGE_STAY_TIME_LENGTH:::66587"));
//

//        traceDataList.add(manuallyCreateOneTraceData("READING", "40", 2062L, "1699954391469", "student59 rus2", "https://nijmegen.floraproject.org/moodle/mod/page/view.php?id=242", "student59", "rus2", "PAGE", "MANUALLY_ADDED_DATA", "NO_TARGET_OBJECT", "CHANGE_PAGE_CLICK_READING", "RELEVANT_READING", "0", "0", "0", "0", "1366", "768", "1366", "768", "NEXT_PAGE_URL:::https://nijmegen.floraproject.org/moodle/mod/page/view.php?id=240"));
//        traceDataList.add(manuallyCreateOneTraceData("READING", "40", 2062L, "1699954391470", "student59 rus2", "https://nijmegen.floraproject.org/moodle/mod/page/view.php?id=242", "student59", "rus2", "PAGE", "MANUALLY_ADDED_DATA", "NO_TARGET_OBJECT", "LEAVE_PAGE", "RELEVANT_READING", "0", "0", "0", "0", "1366", "768", "1366", "768", "PAGE_STAY_TIME_LENGTH:::285820"));
//
//        traceDataList.add(manuallyCreateOneTraceData("READING", "40", 2062L, "1699954470374", "student59 rus2", "https://nijmegen.floraproject.org/moodle/mod/page/view.php?id=240", "student59", "rus2", "PAGE", "MANUALLY_ADDED_DATA", "NO_TARGET_OBJECT", "CHANGE_PAGE_CLICK_READING", "RELEVANT_READING", "0", "0", "0", "0", "1366", "768", "1366", "768", "NEXT_PAGE_URL:::https://nijmegen.floraproject.org/moodle/mod/page/view.php?id=232"));
//        traceDataList.add(manuallyCreateOneTraceData("READING", "40", 2062L, "1699954470376", "student59 rus2", "https://nijmegen.floraproject.org/moodle/mod/page/view.php?id=240", "student59", "rus2", "PAGE", "MANUALLY_ADDED_DATA", "NO_TARGET_OBJECT", "LEAVE_PAGE", "RELEVANT_READING", "0", "0", "0", "0", "1366", "768", "1366", "768", "PAGE_STAY_TIME_LENGTH:::75551"));

//        traceDataList.add(manuallyCreateOneTraceData("READING", "40", 2063L, "1699954514246", "student60 rus2", "https://nijmegen.floraproject.org/moodle/mod/page/view.php?id=235", "student60", "rus2", "PAGE", "MANUALLY_ADDED_DATA", "NO_TARGET_OBJECT", "CHANGE_PAGE_CLICK_READING", "RELEVANT_READING", "0", "0", "0", "0", "1600", "775", "1600", "900", "NEXT_PAGE_URL:::https://nijmegen.floraproject.org/moodle/mod/page/view.php?id=242"));
//        traceDataList.add(manuallyCreateOneTraceData("READING", "40", 2063L, "1699954514247", "student60 rus2", "https://nijmegen.floraproject.org/moodle/mod/page/view.php?id=235", "student60", "rus2", "PAGE", "MANUALLY_ADDED_DATA", "NO_TARGET_OBJECT", "LEAVE_PAGE", "RELEVANT_READING", "0", "0", "0", "0", "1600", "775", "1600", "900", "PAGE_STAY_TIME_LENGTH:::433666"));

//        traceDataList.add(manuallyCreateOneTraceData("READING", "25", 2081L, "1699348566164", "student78 rus2", "https://nijmegen.floraproject.org/moodle/mod/page/view.php?id=150", "student78", "rus2", "PAGE", "MANUALLY_ADDED_DATA", "NO_TARGET_OBJECT", "CHANGE_PAGE_CLICK_READING", "RELEVANT_READING", "0", "0", "0", "0", "1366", "649", "1366", "768", "NEXT_PAGE_URL:::https://nijmegen.floraproject.org/moodle/mod/page/view.php?id=471"));
//        traceDataList.add(manuallyCreateOneTraceData("READING", "25", 2081L, "1699348566165", "student78 rus2", "https://nijmegen.floraproject.org/moodle/mod/page/view.php?id=150", "student78", "rus2", "PAGE", "MANUALLY_ADDED_DATA", "NO_TARGET_OBJECT", "LEAVE_PAGE", "RELEVANT_READING", "0", "0", "0", "0", "1366", "649", "1366", "768", "PAGE_STAY_TIME_LENGTH:::291336"));


//        traceDataList.add(manuallyCreateOneTraceData("READING", "40", 2269L, "1704706542355", "test 6", "https://nijmegen.floraproject.org/moodle/mod/page/view.php?id=237", "test", "6", "PAGE", "MANUALLY_ADDED_DATA", "NO_TARGET_OBJECT", "CHANGE_PAGE_CLICK_READING", "RELEVANT_REREADING", "0", "0", "0", "0", "2560", "1315", "2560", "1440", "NEXT_PAGE_URL:::https://nijmegen.floraproject.org/moodle/mod/page/view.php?id=225"));
//        traceDataList.add(manuallyCreateOneTraceData("READING", "40", 2269L, "1704706542356", "test 6", "https://nijmegen.floraproject.org/moodle/mod/page/view.php?id=237", "test", "6", "PAGE", "MANUALLY_ADDED_DATA", "NO_TARGET_OBJECT", "LEAVE_PAGE", "RELEVANT_REREADING", "0", "0", "0", "0", "2560", "1315", "2560", "1440", "PAGE_STAY_TIME_LENGTH:::235451"));

//        traceDataList.add(manuallyCreateOneTraceData("READING", "40", 2515L, "1709019908715", "student 22 q1", "https://nijmegen.floraproject.org/moodle/mod/page/view.php?id=228", "student", "22", "PAGE", "MANUALLY_ADDED_DATA", "NO_TARGET_OBJECT", "CHANGE_PAGE_CLICK_READING", "RELEVANT_REREADING", "0", "0", "0", "0", "1536", "736", "1536", "864", "NEXT_PAGE_URL:::https://nijmegen.floraproject.org/moodle/mod/page/view.php?id=225"));
//        traceDataList.add(manuallyCreateOneTraceData("READING", "40", 2515L, "1709019908716", "student 22 q1", "https://nijmegen.floraproject.org/moodle/mod/page/view.php?id=228", "student", "22", "PAGE", "MANUALLY_ADDED_DATA", "NO_TARGET_OBJECT", "LEAVE_PAGE", "RELEVANT_REREADING", "0", "0", "0", "0", "1536", "736", "1536", "864", "PAGE_STAY_TIME_LENGTH:::378267"));

//        traceDataList.add(manuallyCreateOneTraceData("INSTRUCTION", "25", 2542L, "1709125025565", "student 49 q1", "https://nijmegen.floraproject.org/moodle/mod/page/view.php?id=471", "student", "49", "PAGE", "MANUALLY_ADDED_DATA", "NO_TARGET_OBJECT", "CHANGE_PAGE_CLICK_READING", "TASK_REQUIREMENT", "0", "0", "0", "0", "1536", "730", "1536", "864", "NEXT_PAGE_URL:::https://nijmegen.floraproject.org/moodle/mod/page/view.php?id=150"));
//        traceDataList.add(manuallyCreateOneTraceData("INSTRUCTION", "25", 2542L, "1709125025566", "student 49 q1", "https://nijmegen.floraproject.org/moodle/mod/page/view.php?id=471", "student", "49", "PAGE", "MANUALLY_ADDED_DATA", "NO_TARGET_OBJECT", "LEAVE_PAGE", "TASK_REQUIREMENT", "0", "0", "0", "0", "1536", "730", "1536", "864", "PAGE_STAY_TIME_LENGTH:::108320"));

//        traceDataList.add(manuallyCreateOneTraceData("READING", "25", 2558L, "1709032146896", "student 65 q1", "https://nijmegen.floraproject.org/moodle/mod/page/view.php?id=153", "student", "65", "PAGE", "MANUALLY_ADDED_DATA", "NO_TARGET_OBJECT", "CHANGE_PAGE_CLICK_READING", "RELEVANT_REREADING", "0", "0", "0", "0", "1280", "585", "1280", "720", "NEXT_PAGE_URL:::https://nijmegen.floraproject.org/moodle/mod/page/view.php?id=154"));
//        traceDataList.add(manuallyCreateOneTraceData("READING", "25", 2558L, "1709032146897", "student 65 q1", "https://nijmegen.floraproject.org/moodle/mod/page/view.php?id=153", "student", "65", "PAGE", "MANUALLY_ADDED_DATA", "NO_TARGET_OBJECT", "LEAVE_PAGE", "RELEVANT_REREADING", "0", "0", "0", "0", "1280", "585", "1280", "720", "PAGE_STAY_TIME_LENGTH:::9116"));

//        traceDataList.add(manuallyCreateOneTraceData("READING", "25", 2559L, "1709033171597", "student 66 q1", "https://nijmegen.floraproject.org/moodle/mod/page/view.php?id=159", "student", "66", "PAGE", "MANUALLY_ADDED_DATA", "NO_TARGET_OBJECT", "CHANGE_PAGE_CLICK_READING", "RELEVANT_REREADING", "0", "0", "0", "0", "1318", "646", "1318", "768", "NEXT_PAGE_URL:::https://nijmegen.floraproject.org/moodle/mod/page/view.php?id=471"));
//        traceDataList.add(manuallyCreateOneTraceData("READING", "25", 2559L, "1709033171598", "student 66 q1", "https://nijmegen.floraproject.org/moodle/mod/page/view.php?id=159", "student", "66", "PAGE", "MANUALLY_ADDED_DATA", "NO_TARGET_OBJECT", "LEAVE_PAGE", "RELEVANT_REREADING", "0", "0", "0", "0", "1318", "646", "1318", "768", "PAGE_STAY_TIME_LENGTH:::222255"));

//        traceDataList.add(manuallyCreateOneTraceData("READING", "25", 2573L, "1709032001897", "student 80 q1", "https://nijmegen.floraproject.org/moodle/mod/page/view.php?id=154", "student", "80", "PAGE", "MANUALLY_ADDED_DATA", "NO_TARGET_OBJECT", "CHANGE_PAGE_CLICK_READING", "RELEVANT_REREADING", "0", "0", "0", "0", "1366", "641", "1366", "768", "NEXT_PAGE_URL:::https://nijmegen.floraproject.org/moodle/mod/page/view.php?id=471"));
//        traceDataList.add(manuallyCreateOneTraceData("READING", "25", 2573L, "1709032001898", "student 80 q1", "https://nijmegen.floraproject.org/moodle/mod/page/view.php?id=154", "student", "80", "PAGE", "MANUALLY_ADDED_DATA", "NO_TARGET_OBJECT", "LEAVE_PAGE", "RELEVANT_REREADING", "0", "0", "0", "0", "1366", "641", "1366", "768", "PAGE_STAY_TIME_LENGTH:::12135"));

//        traceDataList.add(manuallyCreateOneTraceData("READING", "25", 2598L, "1709292481563", "student 105 q1", "https://nijmegen.floraproject.org/moodle/mod/page/view.php?id=158", "student", "105", "PAGE", "MANUALLY_ADDED_DATA", "NO_TARGET_OBJECT", "CHANGE_PAGE_CLICK_READING", "RELEVANT_REREADING", "0", "0", "0", "0", "1396", "639", "1536", "864", "NEXT_PAGE_URL:::https://nijmegen.floraproject.org/moodle/mod/page/view.php?id=471"));
//        traceDataList.add(manuallyCreateOneTraceData("READING", "25", 2598L, "1709292481565", "student 105 q1", "https://nijmegen.floraproject.org/moodle/mod/page/view.php?id=158", "student", "105", "PAGE", "MANUALLY_ADDED_DATA", "NO_TARGET_OBJECT", "LEAVE_PAGE", "RELEVANT_REREADING", "0", "0", "0", "0", "1396", "639", "1536", "864", "PAGE_STAY_TIME_LENGTH:::68282"));

//        traceDataList.add(manuallyCreateOneTraceData("READING", "40", 2600L, "1709896318391", "student 107 q1", "https://nijmegen.floraproject.org/moodle/mod/page/view.php?id=228", "student", "107", "PAGE", "MANUALLY_ADDED_DATA", "NO_TARGET_OBJECT", "CHANGE_PAGE_CLICK_READING", "RELEVANT_READING", "0", "0", "0", "0", "1280", "632", "1280", "720", "NEXT_PAGE_URL:::https://nijmegen.floraproject.org/moodle/mod/page/view.php?id=225"));
//        traceDataList.add(manuallyCreateOneTraceData("READING", "40", 2600L, "1709896318392", "student 107 q1", "https://nijmegen.floraproject.org/moodle/mod/page/view.php?id=228", "student", "107", "PAGE", "MANUALLY_ADDED_DATA", "NO_TARGET_OBJECT", "LEAVE_PAGE", "RELEVANT_READING", "0", "0", "0", "0", "1280", "632", "1280", "720", "PAGE_STAY_TIME_LENGTH:::873301"));

//        traceDataList.add(manuallyCreateOneTraceData("READING", "25", 2604L, "1709291648929", "student 111 q1", "https://nijmegen.floraproject.org/moodle/mod/page/view.php?id=158", "student", "111", "PAGE", "MANUALLY_ADDED_DATA", "NO_TARGET_OBJECT", "CHANGE_PAGE_CLICK_READING", "RELEVANT_READING", "0", "0", "0", "0", "1536", "730", "1536", "864", "NEXT_PAGE_URL:::https://nijmegen.floraproject.org/moodle/mod/page/view.php?id=156"));
//        traceDataList.add(manuallyCreateOneTraceData("READING", "25", 2604L, "1709291648930", "student 111 q1", "https://nijmegen.floraproject.org/moodle/mod/page/view.php?id=158", "student", "111", "PAGE", "MANUALLY_ADDED_DATA", "NO_TARGET_OBJECT", "LEAVE_PAGE", "RELEVANT_READING", "0", "0", "0", "0", "1536", "730", "1536", "864", "PAGE_STAY_TIME_LENGTH:::14936"));
//
//        traceDataList.add(manuallyCreateOneTraceData("INSTRUCTION", "25", 2604L, "1709291689124", "student 111 q1", "https://nijmegen.floraproject.org/moodle/mod/page/view.php?id=471", "student", "111", "PAGE", "MANUALLY_ADDED_DATA", "NO_TARGET_OBJECT", "CHANGE_PAGE_CLICK_READING", "TASK_REQUIREMENT", "0", "0", "0", "0", "1536", "730", "1536", "864", "NEXT_PAGE_URL:::https://nijmegen.floraproject.org/moodle/mod/page/view.php?id=158"));
//        traceDataList.add(manuallyCreateOneTraceData("INSTRUCTION", "25", 2604L, "1709291689125", "student 111 q1", "https://nijmegen.floraproject.org/moodle/mod/page/view.php?id=471", "student", "111", "PAGE", "MANUALLY_ADDED_DATA", "NO_TARGET_OBJECT", "LEAVE_PAGE", "TASK_REQUIREMENT", "0", "0", "0", "0", "1536", "730", "1536", "864", "PAGE_STAY_TIME_LENGTH:::31140"));
//
//        traceDataList.add(manuallyCreateOneTraceData("READING", "25", 2604L, "1709291810338", "student 111 q1", "https://nijmegen.floraproject.org/moodle/mod/page/view.php?id=158", "student", "111", "PAGE", "MANUALLY_ADDED_DATA", "NO_TARGET_OBJECT", "CHANGE_PAGE_CLICK_READING", "RELEVANT_REREADING", "0", "0", "0", "0", "1536", "730", "1536", "864", "NEXT_PAGE_URL:::https://nijmegen.floraproject.org/moodle/mod/page/view.php?id=471"));
//        traceDataList.add(manuallyCreateOneTraceData("READING", "25", 2604L, "1709291810339", "student 111 q1", "https://nijmegen.floraproject.org/moodle/mod/page/view.php?id=158", "student", "111", "PAGE", "MANUALLY_ADDED_DATA", "NO_TARGET_OBJECT", "LEAVE_PAGE", "RELEVANT_REREADING", "0", "0", "0", "0", "1536", "730", "1536", "864", "PAGE_STAY_TIME_LENGTH:::119899"));


//        traceDataList.add(manuallyCreateOneTraceData("READING", "40", 2604L, "1710491765932", "student 111 q1", "https://nijmegen.floraproject.org/moodle/mod/page/view.php?id=230", "student", "111", "PAGE", "MANUALLY_ADDED_DATA", "NO_TARGET_OBJECT", "CHANGE_PAGE_CLICK_READING", "RELEVANT_REREADING", "0", "0", "0", "0", "1536", "730", "1536", "864", "NEXT_PAGE_URL:::https://nijmegen.floraproject.org/moodle/mod/page/view.php?id=225"));
//        traceDataList.add(manuallyCreateOneTraceData("READING", "40", 2604L, "1710491765933", "student 111 q1", "https://nijmegen.floraproject.org/moodle/mod/page/view.php?id=230", "student", "111", "PAGE", "MANUALLY_ADDED_DATA", "NO_TARGET_OBJECT", "LEAVE_PAGE", "RELEVANT_REREADING", "0", "0", "0", "0", "1536", "730", "1536", "864", "PAGE_STAY_TIME_LENGTH:::48521"));
//
//        traceDataList.add(manuallyCreateOneTraceData("INSTRUCTION", "40", 2604L, "1710491777431", "student 111 q1", "https://nijmegen.floraproject.org/moodle/mod/page/view.php?id=225", "student", "111", "PAGE", "MANUALLY_ADDED_DATA", "NO_TARGET_OBJECT", "CHANGE_PAGE_CLICK_READING", "TASK_REQUIREMENT", "0", "0", "0", "0", "1536", "730", "1536", "864", "NEXT_PAGE_URL:::https://nijmegen.floraproject.org/moodle/mod/page/view.php?id=230"));
//        traceDataList.add(manuallyCreateOneTraceData("INSTRUCTION", "40", 2604L, "1710491777432", "student 111 q1", "https://nijmegen.floraproject.org/moodle/mod/page/view.php?id=225", "student", "111", "PAGE", "MANUALLY_ADDED_DATA", "NO_TARGET_OBJECT", "LEAVE_PAGE", "TASK_REQUIREMENT", "0", "0", "0", "0", "1536", "730", "1536", "864", "PAGE_STAY_TIME_LENGTH:::8779"));

        traceDataList.add(manuallyCreateOneTraceData("READING", "40", 2606L, "1709896335743", "student 113 q1", "https://nijmegen.floraproject.org/moodle/mod/page/view.php?id=234", "student", "113", "PAGE", "MANUALLY_ADDED_DATA", "NO_TARGET_OBJECT", "CHANGE_PAGE_CLICK_READING", "RELEVANT_REREADING", "0", "0", "0", "0", "1536", "695", "1536", "864", "NEXT_PAGE_URL:::https://nijmegen.floraproject.org/moodle/mod/page/view.php?id=225"));
        traceDataList.add(manuallyCreateOneTraceData("READING", "40", 2606L, "1709896335745", "student 113 q1", "https://nijmegen.floraproject.org/moodle/mod/page/view.php?id=234", "student", "113", "PAGE", "MANUALLY_ADDED_DATA", "NO_TARGET_OBJECT", "LEAVE_PAGE", "RELEVANT_REREADING", "0", "0", "0", "0", "1536", "695", "1536", "864", "PAGE_STAY_TIME_LENGTH:::15185"));


        iTraceDataService.saveBatch(traceDataList);
    }

    @Test
    public void labelCellaStudy1OldData() {
        //Legacy Cella study 1 Oulu Data  course id: 1002   直接跑 labelling 部分
        //Legacy Cella study 1 TUM Data   course id: 1001
        int[] userIdArray1 = {
            1966, 1967, 1968, 1970, 1972, 1973, 1974, 1975, 1977, 1978,
            1986, 1987, 1989, 1992, 1993, 1994, 1995, 1996, 1997, 2005,
            2007, 2010, 2011, 2012, 2014, 2015, 2016, 2098, 2099, 2100,
            2101, 2102, 2103, 2104, 2105, 2106, 2107, 2108, 2109, 2110,
            2111, 2112, 2113, 2115, 2116, 2117, 2118, 2119, 2120, 2121,
            2122, 2123, 2124, 2125, 2126, 2127, 2128, 2129, 2130, 2131,
            2132, 2133, 2134, 2135, 2136, 2137, 2138, 2139, 2140, 2141,
            2143, 2144, 2145, 2146, 2148, 2149, 2150, 2156, 2160, 2161,
            2163, 2165, 2169, 2170, 2191, 2193, 2194, 2199, 2200, 2207,
            2217
        };

        int[] courseIdArray1 = {1001, 1002};
        for (int i = 0; i < userIdArray1.length; i++) {
            for (int j = 0; j < courseIdArray1.length; j++) {
                System.out.println("processing " + userIdArray1[i] + "-----courseid:" + courseIdArray1[j]);
                actionAndProcessService.labelAllProcessLabelPatterns((long) userIdArray1[i], String.valueOf(courseIdArray1[j]), "maria");
            }
        }
    }


}
