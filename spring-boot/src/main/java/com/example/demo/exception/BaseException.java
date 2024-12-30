package com.example.demo.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class BaseException extends RuntimeException {

    private final ErrorType errorType;
    private String fieldName;

    public BaseException(ErrorType errorType) {
        this(errorType, null, null);
    }

    public BaseException(ErrorType errorType, String message) {
        super(message);
        this.errorType = errorType;
        this.fieldName = null;
    }

    public BaseException(ErrorType errorType, String message, Throwable cause) {
        super(message, cause);
        this.errorType = errorType;
        this.fieldName = null;
    }

    public BaseException(String fieldName, ErrorType errorType) {
        this(errorType, errorType.getDesc(), null);
        this.fieldName = fieldName;
    }

    public String getErrorCode() {
        return errorType.getCode();
    }

    public HttpStatus getHttpStatusCode() {
        return errorType.getHttpStatusCode();
    }
}

