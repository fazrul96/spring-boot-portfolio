package com.example.demo.config;

import com.example.demo.properties.BatchProperties;
import com.example.demo.tasklet.LoggingTasklet;
import com.example.demo.tasklet.WebtoonSyncTasklet;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobExecutionListener;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.batch.core.configuration.support.DefaultBatchConfiguration;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.PlatformTransactionManager;

import static com.example.demo.constants.BatchConstant.PORTFOLIO_BATCH;
import static com.example.demo.constants.BatchConstant.WEBTOON_SYNC_BATCH;

@Configuration
@Slf4j
@EnableBatchProcessing
public class BatchConfiguration extends DefaultBatchConfiguration {
    private final BatchProperties batchProperties;

    @Autowired
    public BatchConfiguration(BatchProperties batchProperties) {
        this.batchProperties = batchProperties;
    }

    @Bean
    public Job portfolioBatch(
            JobRepository jobRepository,
            Step stepInitializeLogging,
            JobExecutionListener pushJobMetricsListener
    ) {
        return new JobBuilder(PORTFOLIO_BATCH, jobRepository)
                .start(stepInitializeLogging)
                .listener(pushJobMetricsListener)
                .build();
    }

    @Bean
    public Step stepInitializeLogging(
            JobRepository jobRepository,
            PlatformTransactionManager platformTransactionManager,
            LoggingTasklet loggingTasklet) {
        log.debug("In stepInitializeLogging");
        return new StepBuilder("stepInitializeLogging", jobRepository)
                .tasklet(loggingTasklet, platformTransactionManager)
                .build();
    }

    @Bean
    public Job webtoonSyncBatch(
            JobRepository jobRepository,
            Step stepSyncWebtoons,
            JobExecutionListener pushJobMetricsListener
    ) {
        return new JobBuilder(WEBTOON_SYNC_BATCH, jobRepository)
                .start(stepSyncWebtoons)
                .listener(pushJobMetricsListener)
                .build();
    }

    @Bean
    public Step stepSyncWebtoons(
            JobRepository jobRepository,
            PlatformTransactionManager platformTransactionManager,
            WebtoonSyncTasklet webtoonSyncTasklet) {
        log.debug("In stepSyncWebtoons");
        return new StepBuilder("stepSyncWebtoons", jobRepository)
                .tasklet(webtoonSyncTasklet, platformTransactionManager)
                .build();
    }
}