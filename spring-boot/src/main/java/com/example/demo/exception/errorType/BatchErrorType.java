package com.example.demo.exception.errorType;

import com.example.demo.exception.ErrorType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum BatchErrorType implements ErrorType {
    GENERIC_ERROR(
            "BATCH-GENERIC-ERR-001",
            "Error during batch job execution",
            HttpStatus.INTERNAL_SERVER_ERROR
    ),

    FILE_NOT_FOUND(
            "BATCH-FILE-ERR-002",
            "File not found during batch processing",
            HttpStatus.NOT_FOUND
    ),

    FILE_READ_ERROR(
            "BATCH-FILE-ERR-003",
            "Error reading file during batch execution",
            HttpStatus.INTERNAL_SERVER_ERROR
    ),

    DATABASE_CONNECTION_ERROR(
            "BATCH-DB-ERR-004",
            "Database connection failure during batch processing",
            HttpStatus.INTERNAL_SERVER_ERROR
    ),

    DATA_INTEGRITY_ERROR(
            "BATCH-DB-ERR-005",
            "Data integrity violation during batch processing",
            HttpStatus.CONFLICT
    ),

    TIMEOUT_ERROR(
            "BATCH-TIMEOUT-ERR-006",
            "Batch job execution timed out",
            HttpStatus.REQUEST_TIMEOUT
    ),

    UNEXPECTED_ERROR(
            "BATCH-UNEXPECTED-ERR-007",
            "Unexpected error during batch processing",
            HttpStatus.INTERNAL_SERVER_ERROR
    );

    private final String code;
    private final String desc;
    private final HttpStatus httpStatusCode;
}