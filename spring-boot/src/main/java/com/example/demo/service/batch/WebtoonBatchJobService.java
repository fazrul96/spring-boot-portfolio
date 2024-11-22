package com.example.demo.service.batch;

import com.example.demo.data.portfolio.repository.WebtoonRepository;
import com.example.demo.properties.BatchProperties;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.Job;
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

    public void runWebtoonBatchJob() throws Exception {
        log.info("*** Started Processing for {} ***", WEBTOON_SYNC_BATCH);

        initializeRepository(
            webtoonRepository
        );

        JobParametersBuilder jobParametersBuilder = new JobParametersBuilder()
                .addString(WEBTOON_SYNC_BATCH, String.valueOf(System.currentTimeMillis()));
        jobParametersBuilder = retrieveParams(jobParametersBuilder);

        try {
            jobLauncher.run(webtoonSyncJob, jobParametersBuilder.toJobParameters());
        } catch (EmptyResultDataAccessException e) {
            log.warn("Expected data not found for job parameters. Skipping or handling accordingly.");
            // Additional handling logic if required
        }

        log.info("*** Processing Completed for {} ***", WEBTOON_SYNC_BATCH);
    }

    public JobParametersBuilder retrieveParams(JobParametersBuilder jobParametersBuilder) {
        String fromDate = batchProperties.getFromDate();
        String toDate = batchProperties.getToDate();
        jobParametersBuilder.addString(FROM_DATE, fromDate);
        jobParametersBuilder.addString(TO_DATE, toDate);
        return jobParametersBuilder;
    }
}