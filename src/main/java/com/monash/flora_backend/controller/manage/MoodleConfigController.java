package com.monash.flora_backend.controller.manage;

import com.monash.flora_backend.controller.req.manage.AddUpdateTraceCourseConfigRequest;
import com.monash.flora_backend.util.JSONResult;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

/**
 * @author Xinyu Li
 * @date 2/11/2024
 */
@RestController("/moodle-config")
@RequiredArgsConstructor
public class MoodleConfigController {


    @GetMapping("/get-all-trace-courses-config")
    public JSONResult getAllTraceCourses() {
        return JSONResult.ok();
    }

    @PostMapping("/add-new-trace-course-config")
    public JSONResult addNewTraceCourseConfig(@RequestBody AddUpdateTraceCourseConfigRequest addUpdateTraceCourseConfigRequest) {
        return JSONResult.ok();
    }

    @PostMapping("/update-trace-course-config")
    public JSONResult updateTraceCourseConfig(@RequestBody AddUpdateTraceCourseConfigRequest addUpdateTraceCourseConfigRequest) {
        return JSONResult.ok();
    }

    @GetMapping("/delete-trace-course-config/{id}")
    public JSONResult deleteTraceCourseConfig(@PathVariable("id") Long id) {
        return JSONResult.ok();
    }
}
