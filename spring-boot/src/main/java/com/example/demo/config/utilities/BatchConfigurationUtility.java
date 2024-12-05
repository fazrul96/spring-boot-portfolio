package com.example.demo.config.utilities;

import com.example.demo.component.demo.WebtoonSkipPolicy;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.StepExecutionListener;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.batch.core.step.tasklet.Tasklet;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.batch.item.ItemReader;
import org.springframework.batch.item.ItemWriter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
@Slf4j
public class BatchConfigurationUtility {
    @Bean
    public WebClient webClient() {
        return WebClient.builder()
                .codecs(clientCodecConfigurer -> clientCodecConfigurer.defaultCodecs()
                        .maxInMemorySize(10 * 1024 * 1024))
                .build();
    }

    @Bean
    public WebtoonSkipPolicy webtoonSkipPolicy() {
        return new WebtoonSkipPolicy();
    }

    public Step createTaskletStep(
            String stepName,
            Tasklet tasklet,
            JobRepository jobRepository,
            PlatformTransactionManager transactionManager,
            StepExecutionListener pushStepMetricsListener) {
        return new StepBuilder(stepName, jobRepository)
                .tasklet(tasklet, transactionManager)
                .listener(pushStepMetricsListener)
                .build();
    }

    public <I, O> Step createChunkStep(
            String stepName,
            ItemReader<I> reader,
            ItemProcessor<I, O> processor,
            ItemWriter<O> writer,
            int chunkSize,
            JobRepository jobRepository,
            PlatformTransactionManager transactionManager) {
        return new StepBuilder(stepName, jobRepository)
                .<I, O>chunk(chunkSize, transactionManager)
                .reader(reader)
                .processor(processor)
                .writer(writer)
                .build();
    }
}