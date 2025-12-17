package com.monash.flora_backend;

import com.monash.flora_backend.service_func.UserDataManagementService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

public class DeleteTestDataTest extends FLoRaBackendApplicationTests{

    @Autowired
    private UserDataManagementService userDataManagementService;

    @Test
    public void deleteAllTestDataByUserId() {
        Long userId = 2L;
        userDataManagementService.clearAllUserLog(userId);
    }
}
