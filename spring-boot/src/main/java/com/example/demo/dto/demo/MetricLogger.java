package com.example.demo.dto.demo;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

import static com.example.demo.constants.MetricsConstant.*;

@Builder
@Data
public class MetricLogger {
    @JsonProperty(JOB_NAME)
    String batchJobName;

    @JsonProperty(JOB_ERROR_CODE)
    String jobErrorCode;

    @JsonProperty(JOB_ERROR_CODE_DESC)
    String jobErrorCodeDesc;
}
