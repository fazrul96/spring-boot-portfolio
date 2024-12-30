package com.example.demo.service.batch;

import com.example.demo.data.portfolio.repository.WebtoonRepository;
import com.example.demo.properties.BatchProperties;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.JobParameters;
import org.springframework.batch.core.JobParametersBuilder;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import static com.example.demo.constants.BatchConstant.*;
import static com.example.demo.util.BatchUtil.initializeRepository;

@Slf4j
@Service
public class WebtoonBatchJobService {

    private final JobLauncher jobLauncher;
    private final Job webtoonSyncJob;
    private final BatchProperties batchProperties;
    private final WebtoonRepository webtoonRepository;

    @Autowired
    public WebtoonBatchJobService(JobLauncher jobLauncher,
                                  @Qualifier("webtoonSyncBatch") Job webtoonSyncJob,
                                  BatchProperties batchProperties,
                                  WebtoonRepository webtoonRepository
    ) {
        this.jobLauncher = jobLauncher;
        this.webtoonSyncJob = webtoonSyncJob;
        this.batchProperties = batchProperties;
        this.webtoonRepository = webtoonRepository;
    }

    public void runWebtoonBatchJob(
        String title
    ) {
        log.info("*** Started Processing for {} ***", WEBTOON_SYNC_BATCH);
        initializeRepository(webtoonRepository);
        JobParameters jobParameters = createJobParameters(title);
        launchJob(jobParameters);
        log.info("*** Processing Completed for {} ***", WEBTOON_SYNC_BATCH);
    }

    private JobParameters createJobParameters(
        String title
    ) {
        JobParametersBuilder jobParametersBuilder = new JobParametersBuilder();
        jobParametersBuilder.addString("title", title);

        return addDefaultJobParameters(jobParametersBuilder);
    }

    private JobParameters addDefaultJobParameters(JobParametersBuilder jobParametersBuilder) {
        String fromDate = batchProperties.getFromDate();
        String toDate = batchProperties.getToDate();

        jobParametersBuilder.addString(FROM_DATE, fromDate);
        jobParametersBuilder.addString(TO_DATE, toDate);
        jobParametersBuilder.addLong("timestamp", System.currentTimeMillis());
        return jobParametersBuilder.toJobParameters();
    }

    private void launchJob(JobParameters jobParameters) {
        try {
            log.info("Launching job with parameters: {}", jobParameters);
            JobExecution jobExecution = jobLauncher.run(webtoonSyncJob, jobParameters);
            log.info("Job executed with status: {}", jobExecution.getStatus());
        } catch (EmptyResultDataAccessException e) {
            log.warn("No data found for job execution: {}", e.getMessage());
        } catch (Exception e) {
            log.error("Error executing job: ", e);
        }
    }
}