package com.example.demo.config;

import com.example.demo.config.utilities.BatchConfigurationUtility;
import com.example.demo.config.utilities.ChunkConfiguration;
import com.example.demo.dto.WebtoonDetailsDto;
import com.example.demo.properties.BatchProperties;
import com.example.demo.tasklet.DownloadWebtoonTasklet;
import com.example.demo.tasklet.LoggingTasklet;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobExecutionListener;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.StepExecutionListener;
import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.batch.core.configuration.support.DefaultBatchConfiguration;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.launch.support.RunIdIncrementer;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.batch.item.ItemReader;
import org.springframework.batch.item.ItemWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.web.reactive.function.client.WebClientException;

import static com.example.demo.constants.BatchConstant.PORTFOLIO_BATCH;
import static com.example.demo.constants.BatchConstant.WEBTOON_SYNC_BATCH;

@Configuration
@Slf4j
@EnableBatchProcessing
public class BatchConfiguration extends DefaultBatchConfiguration {
    private final BatchConfigurationUtility batchConfigurationUtility;
    private final ChunkConfiguration chunkConfiguration;
    private final BatchProperties batchProperties;

    @Autowired
    public BatchConfiguration(
        BatchConfigurationUtility batchConfigurationUtility,
        ChunkConfiguration chunkConfiguration,
        BatchProperties batchProperties) {
        this.batchConfigurationUtility = batchConfigurationUtility;
        this.chunkConfiguration = chunkConfiguration;
        this.batchProperties = batchProperties;
    }

    @Bean
    public Job portfolioBatch(
        JobRepository jobRepository,
        Step initLoggingStep,
        JobExecutionListener pushJobMetricsListener) {
        return new JobBuilder(PORTFOLIO_BATCH, jobRepository)
            .start(initLoggingStep)
            .listener(pushJobMetricsListener)
            .build();
    }

    // todo main batch
//    @Bean
//    public Job webtoonSyncBatchOriginal(
//        JobRepository jobRepository,
//        Step initLoggingStep,
//        Step webtoonSyncStep,
//        Step readFromDbStep,
//        JobExecutionListener pushJobMetricsListener) {
//        return new JobBuilder(WEBTOON_SYNC_BATCH, jobRepository)
//            .incrementer(new RunIdIncrementer())
//            .start(initLoggingStep)
//            .next(webtoonSyncStep)
//            .next(readFromDbStep)
//            .listener(pushJobMetricsListener)
//            .build();
//    }

    // todo testing batch
    @Bean
    public Job webtoonSyncBatch(
        JobRepository jobRepository,
        Step initLoggingStep,
        Step sampleStep,
        JobExecutionListener pushJobMetricsListener) {
        return new JobBuilder(WEBTOON_SYNC_BATCH, jobRepository)
            .incrementer(new RunIdIncrementer())
            .start(initLoggingStep)
            .next(sampleStep)
            .listener(pushJobMetricsListener)
            .build();
    }

    @Bean
    public Step sampleStep(
        JobRepository jobRepository,
        PlatformTransactionManager platformTransactionManager) {
        log.info("In sampleStep");
        return batchConfigurationUtility.createChunkStep(
            "sampleStep",
            chunkConfiguration.sampleReader(),
            chunkConfiguration.sampleProcessor(),
            chunkConfiguration.sampleWriter(),
            batchProperties.getChunkSize(),
            jobRepository,
            platformTransactionManager
        );
    }

    @Bean
    public Step initLoggingStep(
        JobRepository jobRepository,
        PlatformTransactionManager transactionManager,
        LoggingTasklet loggingTasklet,
        StepExecutionListener pushStepMetricsListener) {
        log.info("In initLoggingStep");
        return batchConfigurationUtility.createTaskletStep(
            "initLoggingStep",
            loggingTasklet,
            jobRepository,
            transactionManager,
            pushStepMetricsListener
        );
    }

    @Bean
    public Step webtoonSyncStep(
        JobRepository jobRepository,
        PlatformTransactionManager transactionManager,
        DownloadWebtoonTasklet downloadWebtoonTasklet,
        StepExecutionListener pushStepMetricsListener) {
        log.info("In webtoonSyncStep");
        return batchConfigurationUtility.createTaskletStep(
            "webtoonSyncStep",
            downloadWebtoonTasklet,
            jobRepository,
            transactionManager,
            pushStepMetricsListener
        );
    }

    @Bean
    public Step readFromDbStep(
        JobRepository jobRepository,
        PlatformTransactionManager platformTransactionManager,
        ItemReader<WebtoonDetailsDto> webtoonReader,
        ItemWriter<WebtoonDetailsDto> webtoonWriter,
        StepExecutionListener pushStepMetricsListener
    ) {
        log.debug("In stepReadFromDb");
        return new StepBuilder("stepReadFromDb", jobRepository)
            .<WebtoonDetailsDto, WebtoonDetailsDto>chunk(batchProperties.getChunkSize(), platformTransactionManager)
            .reader(webtoonReader)
            .writer(webtoonWriter)
            .faultTolerant()
            .skipPolicy(batchConfigurationUtility.webtoonSkipPolicy())
            .skip(WebClientException.class)
            .listener(pushStepMetricsListener)
            .build();
    }
}