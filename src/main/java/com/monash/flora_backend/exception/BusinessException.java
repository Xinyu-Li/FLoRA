package com.monash.flora_backend.exception;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * ClassName: BusinessException
 * Description:
 *
 * @author Xinyu Li
 * @since 5/17/2023 9:23 PM
 */
@Data
@AllArgsConstructor
public class BusinessException extends RuntimeException {
    private BusinessExceptionEnum e;

    @Override
    public Throwable fillInStackTrace() {
        return this;
    }
}
