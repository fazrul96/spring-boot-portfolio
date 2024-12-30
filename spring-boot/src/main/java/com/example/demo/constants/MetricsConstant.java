package com.example.demo.constants;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class MetricsConstant {

    public static final String BATCH_JOB_EXECUTION_ID = "BATCH_JOB_EXECUTION_ID";
    public static final String JOB_NAME = "BATCH_JOB_NAME";
    public static final String JOB_STATUS = "BATCH_JOB_STATUS";
    public static final String JOB_STATUS_DESC = "BATCH_JOB_STATUS_DESC";
    public static final String JOB_START_DATE = "BATCH_JOB_START_DATE";

    public static final String BATCH_EXECUTION_DATE = "BATCH_EXECUTION_DATE";
    public static final String STEP_READ_COUNT = "STEP_READ_COUNT";
    public static final String STEP_WRITE_COUNT = "STEP_WRITE_COUNT";
    public static final String STEP_SKIP_COUNT = "STEP_SKIP_COUNT";

    public static final String JOB_ERROR_CODE = "BATCH_JOB_ERROR_CODE";
    public static final String JOB_ERROR_CODE_DESC = "BATCH_JOB_ERROR_CODE_DESC";
    public static final String BATCH_JOB_TYPE = "BATCH_JOB_TYPE";
    public static final String BATCH_JOB_FREQUENCY = "BATCH_JOB_FREQUENCY";
    public static final String BATCH_JOB_END_TIME = "BATCH_JOB_END_TIME";
    public static final String JOB_TYPE_FREQUENCY = "DAILY";

    public static final int DB_CONNECTION_ERROR_CODE = 100;
    public static final int SERVICE_CONNECTION_ERROR_CODE = 101;
    public static final int SERVICE_ERROR_RESPONSE_CODE = 102;

    public static final String DB_CONNECTION_ERROR_DESC = "DB_CONNECTION_ERROR";
    public static final String SERVICE_CONNECTION_ERROR_DESC = "SERVICE_CONNECTION_ERROR";
    public static final String SERVICE_ERROR_RESPONSE_DESC = "SERVICE_ERROR_RESPONSE";

    public static final int EXIT_CODE_SUCCESS = 0;
    public static final int EXIT_CODE_FAILED = 1;

    public static final String EXIT_CODE_SUCCESS_DESC = "SUCCESS";
    public static final String EXIT_CODE_FAILED_DESC = "FAILED";

    @AllArgsConstructor
    @Getter
    public enum ExitCode {
        SUCCESS(EXIT_CODE_SUCCESS, EXIT_CODE_SUCCESS_DESC),
        FAILED(EXIT_CODE_FAILED, EXIT_CODE_FAILED_DESC);
        private final int code;
        private final String codeDesc;
    }

    @AllArgsConstructor
    @Getter
    public enum ErrorCode {
        DB_CONNECTION_ERROR(DB_CONNECTION_ERROR_CODE, DB_CONNECTION_ERROR_DESC),
        SERVICE_CONNECTION_ERROR(SERVICE_CONNECTION_ERROR_CODE, SERVICE_CONNECTION_ERROR_DESC),
        SERVICE_ERROR_RESPONSE(SERVICE_ERROR_RESPONSE_CODE, SERVICE_ERROR_RESPONSE_DESC);
        private final int code;
        private final String codeDesc;
    }
}
