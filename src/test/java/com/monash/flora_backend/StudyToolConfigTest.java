package com.monash.flora_backend;


import com.monash.flora_backend.dao.entity.StudyToolConfig;
import com.monash.flora_backend.service.IStudyToolConfigService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class StudyToolConfigTest extends FLoRaBackendApplicationTests {
    @Autowired
    private IStudyToolConfigService studyToolConfigService;

    @Test
    public void test() {
        System.out.println(studyToolConfigService.count());
    }
//"{\"uid\": 123, \"name\": \"jack\", \"age\": 18}"




    // add test case of CRUD for studyToolConfig, write separate method and code for each operation
    @Test
    public void testInsert() {
        StudyToolConfig studyToolConfig = new StudyToolConfig();
        studyToolConfig.setStudyName("test");
        studyToolConfig.setConfigJson("{\"uid\": 123, \"name\": \"jack\", \"age\": 18}");
        studyToolConfigService.save(studyToolConfig);
    }

    @Test
    public void testSelect() {
        List<StudyToolConfig> list = studyToolConfigService.list();
        for (StudyToolConfig studyToolConfig : list) {
            System.out.println(studyToolConfig);
        }
    }

    @Test
    public void testUpdate() {
        StudyToolConfig studyToolConfig = studyToolConfigService.getById(1);
        studyToolConfig.setStudyName("test2");
        //update the content of json string without change the whole value use mybatis plus, for example, change name to "tom"


        studyToolConfigService.updateById(studyToolConfig);
    }

    @Test
    public void testDelete() {
        studyToolConfigService.removeById(1);
    }
}
