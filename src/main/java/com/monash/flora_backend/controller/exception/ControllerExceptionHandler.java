package com.monash.flora_backend.controller.exception;

import com.monash.flora_backend.exception.BusinessException;
import com.monash.flora_backend.util.JSONResult;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.BindException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;


/**
 * ClassName: ControllerExceptionHandler
 * Description: 统一异常处理、数据预处理等
 *
 * @author Xinyu Li
 * @since 5/17/2023 9:23 PM
 */
@ControllerAdvice
@Slf4j
public class ControllerExceptionHandler {


    /**
     * 所有异常统一处理
     * @param e
     * @return
     */
    @ExceptionHandler(value = Exception.class)
    @ResponseBody
    public JSONResult exceptionHandler(Exception e) throws Exception {
        log.error("System exception:", e);
        return JSONResult.errorMsg("System error，Please contact admin");
    }

    /**
     * 业务异常统一处理
     * @param e
     * @return
     */
    @ExceptionHandler(value = BusinessException.class)
    @ResponseBody
    public JSONResult exceptionHandler(BusinessException e) {
        log.error("Business exception: {}", e.getE().getDesc());
        return JSONResult.errorMsg(e.getE().getDesc());
    }

    /**
     * 校验异常统一处理
     * @param e
     * @return
     */
    @ExceptionHandler(value = BindException.class)
    @ResponseBody
    public JSONResult exceptionHandler(BindException e) {
        log.error("Bing Exception: {}", e.getBindingResult().getAllErrors().get(0).getDefaultMessage());

        Map<String, String> errors = new HashMap<>();
        e.getBindingResult().getAllErrors().forEach(objectError -> {
            String fieldName = ((FieldError) objectError).getField();
            String errorMessage = objectError.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return new JSONResult(500, "Please fill all the required fields.", errors);
    }

}
