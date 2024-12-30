package com.example.demo.listener.metrics;

import com.example.demo.config.BatchExecutionContext;
import com.example.demo.constants.MetricsConstant;
import com.example.demo.util.MetricsUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.JobExecutionListener;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Component;

import static com.example.demo.constants.MetricsConstant.*;

@Slf4j
@Component
@RequiredArgsConstructor
public class PushJobMetricsListener implements JobExecutionListener {

    private final ApplicationContext applicationContext;

    @Override
    public void beforeJob(JobExecution jobExecution) {
    }

    @Override
    public void afterJob(JobExecution jobExecution) {
        log.debug("Pushing job level metrics");
        var jobExecutionContext = jobExecution.getExecutionContext();
        MetricsConstant.ExitCode exitCode = MetricsUtil.getExitCode(jobExecution.getExitStatus());
        jobExecutionContext.put(JOB_STATUS, exitCode.getCode());
        jobExecutionContext.put(JOB_STATUS_DESC, exitCode.getCodeDesc());
        jobExecutionContext.put(JOB_START_DATE, jobExecution.getStartTime());
        jobExecutionContext.put(BATCH_JOB_END_TIME, jobExecution.getEndTime());

        Long jobExecutionId = jobExecution.getId();
        MetricsUtil.pushMetrics(jobExecutionId, jobExecutionContext);

        var batchExecutionContext = applicationContext.getBean(BatchExecutionContext.class);
        batchExecutionContext.getJobExecutionExitCodeTracker()
                .put(jobExecutionId, jobExecution.getExitStatus().getExitCode());
    }
}