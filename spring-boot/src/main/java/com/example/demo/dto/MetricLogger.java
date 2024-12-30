package com.example.demo.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

import static com.example.demo.constants.MetricsConstant.*;

@Builder
@Data
public class MetricLogger {
    @JsonProperty(BATCH_JOB_EXECUTION_ID)
    Long batchJobExecutionId;

    @JsonProperty(JOB_NAME)
    String batchJobName;

    @JsonProperty(JOB_STATUS)
    Integer batchJobStatus;

    @JsonProperty(JOB_STATUS_DESC)
    String batchJobStatusDesc;

    @JsonProperty(JOB_START_DATE)
    String batchJobStartDateTime;

    @JsonProperty(BATCH_EXECUTION_DATE)
    String batchExecutionDate;

    @JsonProperty(STEP_READ_COUNT)
    Long readCount;

    @JsonProperty(STEP_WRITE_COUNT)
    Long writeCount;

    @JsonProperty(STEP_SKIP_COUNT)
    Long skipCount;

    @JsonProperty(JOB_ERROR_CODE)
    String jobErrorCode;

    @JsonProperty(JOB_ERROR_CODE_DESC)
    String jobErrorCodeDesc;

    @JsonProperty(BATCH_JOB_TYPE)
    String batchJobType;

    @JsonProperty(BATCH_JOB_FREQUENCY)
    String batchJobFrequency;

    @JsonProperty(BATCH_JOB_END_TIME)
    String batchJobEndTime;
}