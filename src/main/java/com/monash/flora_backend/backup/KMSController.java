package com.monash.flora_backend.backup;

import com.monash.flora_backend.util.JSONResult;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * ClassName: KMSController
 * Description: combine the system with KMASS system
 *
 * @author Xinyu Li
 * @since 1/9/2023 2:33 PM
 */
//@RestController("/kms")
public class KMSController {
//    @GetMapping("/index")
    public JSONResult index() {
        return JSONResult.ok();
    }

//    @GetMapping("/index2")
    public JSONResult index2() {


        return JSONResult.ok();
    }
}
