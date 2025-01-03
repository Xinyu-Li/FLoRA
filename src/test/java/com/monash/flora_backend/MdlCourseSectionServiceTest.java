package com.monash.flora_backend;

import com.monash.flora_backend.service_moodle.IMdlCourseSectionsService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

public class MdlCourseSectionServiceTest extends FLoRaBackendApplicationTests{
    @Autowired
    private IMdlCourseSectionsService iMdlCourseSectionsService;
    @Test
    public void test1() {
        iMdlCourseSectionsService.findAllPageIdByCourseId(2L);
    }
}
