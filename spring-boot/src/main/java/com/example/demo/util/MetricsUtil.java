package com.example.demo.util;

import com.example.demo.constants.MetricsConstant;
import com.example.demo.dto.MetricLogger;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import net.logstash.logback.marker.Markers;
import org.springframework.batch.core.ExitStatus;
import org.springframework.batch.item.ExecutionContext;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Objects;

import static com.example.demo.constants.BatchConstant.PORTFOLIO_BATCH;
import static com.example.demo.constants.MetricsConstant.*;

@Slf4j
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class MetricsUtil {

    private static final String MESSAGE = "BATCH_JOB_METRICS";

    @SneakyThrows
    public static void pushMetrics(Long batchJobExecutionId, ExecutionContext jobExecutionContext) {
        String errorCode = LoggingUtil.getBatchParams().get(JOB_ERROR_CODE);
        String errorCodeDesc = LoggingUtil.getBatchParams().get(JOB_ERROR_CODE_DESC);

        log.info(Markers.appendFields(MetricLogger.builder()
            .batchJobExecutionId(batchJobExecutionId)
            .batchJobName(PORTFOLIO_BATCH)
            .batchJobStatus((Integer) jobExecutionContext.get(JOB_STATUS))
            .batchJobStatusDesc((String) jobExecutionContext.get(JOB_STATUS_DESC))
            .batchJobStartDateTime(((LocalDateTime) Objects.requireNonNullElse(jobExecutionContext.get(
                JOB_START_DATE), LocalDateTime.MIN
            )).format(DateTimeFormatter.ISO_DATE_TIME))
            .readCount((Long) jobExecutionContext.get(STEP_READ_COUNT))
            .writeCount((Long) jobExecutionContext.get(STEP_WRITE_COUNT))
            .skipCount((Long) jobExecutionContext.get(STEP_SKIP_COUNT))
            .jobErrorCode(String.valueOf(jobExecutionContext.get(JOB_ERROR_CODE)))
            .jobErrorCodeDesc((String) jobExecutionContext.get(JOB_ERROR_CODE_DESC))
            .batchJobFrequency(JOB_TYPE_FREQUENCY)
            .batchJobEndTime(((LocalDateTime) Objects.requireNonNullElse(jobExecutionContext.get(
                BATCH_JOB_END_TIME), LocalDateTime.MIN)).format(DateTimeFormatter.ISO_DATE_TIME))
            .build()), MESSAGE);
    }

    public static MetricsConstant.ExitCode getExitCode(ExitStatus exitStatus) {
        return ExitStatus.COMPLETED.equals(exitStatus)
                ? MetricsConstant.ExitCode.SUCCESS : MetricsConstant.ExitCode.FAILED;
    }
}