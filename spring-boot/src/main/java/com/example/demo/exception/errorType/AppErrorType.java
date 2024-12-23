package com.example.demo.exception.errorType;

import com.example.demo.exception.ErrorType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum AppErrorType implements ErrorType {
    VALIDATION_ERROR(
            "APP-VALIDATION-ERR-001",
            "Validation failed for input data",
            HttpStatus.BAD_REQUEST
    ),

    UNAUTHORIZED_ERROR(
            "APP-UNAUTHORIZED-ERR-002",
            "Unauthorized access",
            HttpStatus.UNAUTHORIZED
    ),

    RESOURCE_NOT_FOUND(
            "APP-RESOURCE-NOT-FOUND-ERR-003",
            "Requested resource not found",
            HttpStatus.NOT_FOUND
    ),

    DATABASE_ERROR(
            "APP-DB-ERR-004",
            "Database error during user operation",
            HttpStatus.INTERNAL_SERVER_ERROR
    ),

    DUPLICATE_ENTRY_ERROR(
            "APP-DUPLICATE-ERR-005",
            "Duplicate entry encountered",
            HttpStatus.BAD_REQUEST
    ),

    FORBIDDEN_ERROR(
            "APP-FORBIDDEN-ERR-006",
            "Access forbidden",
            HttpStatus.FORBIDDEN
    ),

    UNEXPECTED_ERROR(
            "APP-UNEXPECTED-ERR-007",
            "Unexpected error in application",
            HttpStatus.INTERNAL_SERVER_ERROR
    );

    private final String code;
    private final String desc;
    private final HttpStatus httpStatusCode;
}
