package com.example.demo.listener.metrics;

import com.example.demo.config.BatchExecutionContext;
import com.example.demo.constants.MetricsConstant;
import com.example.demo.util.MetricsUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.batch.core.*;
import org.springframework.context.ApplicationContext;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Component;

import java.util.List;

import static com.example.demo.constants.MetricsConstant.*;
import static com.example.demo.constants.MetricsConstant.ErrorCode.SERVICE_CONNECTION_ERROR;

@Slf4j
@Component("pushStepExecutionListener")
public class PushStepMetricsListener implements StepExecutionListener {

    @Override
    public void beforeStep(StepExecution stepExecution) {
    }

    @Override
    public ExitStatus afterStep(StepExecution stepExecution) {
        log.debug("Pushing job level metrics");
        log.debug("Read Count : {}", stepExecution.getReadCount());
        log.debug("Write Count : {}", stepExecution.getWriteCount());
        log.debug("Skip Count : {}", stepExecution.getSkipCount());

        var jobExecutionContext = stepExecution.getJobExecution().getExecutionContext();
        jobExecutionContext.put(STEP_READ_COUNT, stepExecution.getReadCount());
        jobExecutionContext.put(STEP_WRITE_COUNT, stepExecution.getWriteCount());
        jobExecutionContext.put(STEP_SKIP_COUNT, stepExecution.getReadSkipCount());

        if (CollectionUtils.isNotEmpty(stepExecution.getFailureExceptions())) {
            List<Throwable> throwables = stepExecution.getFailureExceptions();
            for (Throwable t : throwables) {
                if (t instanceof DataAccessException
                    || t.getCause() instanceof DataAccessException) {
                    jobExecutionContext.put(
                            JOB_ERROR_CODE,
                            SERVICE_CONNECTION_ERROR.getCode()
                    );
                    jobExecutionContext.put(
                            JOB_ERROR_CODE_DESC,
                            SERVICE_CONNECTION_ERROR.getCodeDesc()
                    );
                }
            }
        }
        return stepExecution.getExitStatus();
    }
}
