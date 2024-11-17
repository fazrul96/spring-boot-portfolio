package com.example.demo.listener.metrics;

import com.example.demo.config.BatchExecutionContext;
import com.example.demo.constants.MetricsConstant;
import com.example.demo.util.MetricsUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationContext;
import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.JobExecutionListener;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class PushStepMetricsListener implements JobExecutionListener {

    private final ApplicationContext applicationContext;

    @Override
    public void beforeJob(JobExecution jobExecution) {
    }

    @Override
    public void afterJob(JobExecution jobExecution) {
        log.debug("Pushing job level metrics");
        var jobExecutionContext = jobExecution.getExecutionContext();
        MetricsConstant.ExitCode exitCode = MetricsUtil.getExitCode(jobExecution.getExitStatus());
        jobExecutionContext.put("", exitCode.getCode());

        Long jobExecutionId = jobExecution.getId();
        MetricsUtil.pushMetrics(jobExecutionId, jobExecutionContext);

        var batchExecutionContext = applicationContext.getBean(BatchExecutionContext.class);
        batchExecutionContext.getJobExecutionExitCodeTracker()
                .put(jobExecutionId, jobExecution.getExitStatus().getExitCode());
    }
}
