package com.monash.flora_backend.data_reprocess;

import com.monash.flora_backend.FLoRaBackendApplicationTests;
import com.monash.flora_backend.service.ITraceDataService;
import com.monash.flora_backend.service_func.ActionAndProcessService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

public class ReprocessCellaStudy3Test extends FLoRaBackendApplicationTests {

    @Autowired
    private ActionAndProcessService actionAndProcessService;
    @Autowired
    private ITraceDataService iTraceDataService;

    int[] courseIdArray = {
            // Dutch
//        99, 100, 101, 103
            // oulu new
            37, 40, 49
    };
    int[] userIdArray = {
            // Dutch
//            8087, 8089, 8091, 8093, 8095, 8098, 8099, 8105, 8109, 8117, 8119, 8123, 8124, 8126, 8133, 8139, 8140, 8141, 8143, 8145,
//            8146, 8148, 8150, 8152, 8154, 8155, 8156, 8157, 8160, 8161, 8162, 8164, 8166, 8168, 8169, 8174, 8175, 8176, 8177, 8181,
//            8182, 8183, 8184, 8186, 8190, 8191, 8193, 8196, 8197, 8198, 8200, 8206, 8207, 8213, 8214, 8216, 8217, 8219, 8221, 8224,
//            8226, 8227, 8228, 8231, 8233, 8234, 8235, 8238, 8240, 8241, 8245, 8247, 8251, 8253, 8256, 8257, 8258, 8259, 8260, 8263,
//            8265, 8266, 8267, 8269, 8275, 8282, 8283, 8286, 8287, 8288, 8289, 8290, 8291, 8292, 8295, 8296, 8297, 8298, 8299, 8300,
//            8301, 8302, 8303, 8304, 8305, 8307, 8308, 8309, 8312, 8313, 8314, 8315, 8316,
//            8317,
//            8319, 8320, 8321, 8322, 8326, 8327,
//            8328, 8330, 8331, 8332, 8333, 8334, 8339, 8340, 8347, 8354, 8361, 8365, 8368, 8372, 8376, 8382, 8383, 8385, 8386

            // oulu new
//            1964, 1965, 1966, 1968, 1969, 1970, 1971, 1972, 1974, 1975, 1977, 1979
            1972, 1975, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013

    };




    @Test
    public void testDataReProcessing() {
        for (int i = 0; i < userIdArray.length; i++) {
            for (int j = 0; j < courseIdArray.length; j++) {
                int userId = userIdArray[i];
                int courseId = courseIdArray[j];
                System.out.println("processing " + userId + "-----courseid:" + courseId);
//                actionAndProcessService.labelAllProcessLabelPatternsWithoutMouseData((long) userId, String.valueOf(courseId), "maria");

                //1. 清除所有process label 设置为null
                iTraceDataService.updateProcessLabelToNullByUserIdCourseId((long) userId, String.valueOf(courseId));

                //step1
                actionAndProcessService.labelAllProcessLabelPatterns((long) userId, String.valueOf(courseId), "maria");
                //step2
//                actionAndProcessService.labelAllProcessLabelPatterns((long) userId, String.valueOf(courseId), "copes");
                //step3 做简化版的maria
            }
        }
    }


}
