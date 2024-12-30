package com.example.demo.tasklet;

import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.StepContribution;
import org.springframework.batch.core.configuration.annotation.StepScope;
import org.springframework.batch.core.scope.context.ChunkContext;
import org.springframework.batch.core.step.tasklet.Tasklet;
import org.springframework.batch.repeat.RepeatStatus;
import org.springframework.stereotype.Component;

@StepScope
@Component
@Slf4j
public class WebtoonSyncTasklet implements Tasklet {

    @Override
    public RepeatStatus execute(StepContribution contribution, ChunkContext chunkContext) {
        log.info("Processing webtoon chapters...");

        try {
            for (int chapter = 1; chapter <= 3; chapter++) { // Example loop
                log.info("Processing chapter {}", chapter);
                Thread.sleep(500); // Simulate delay
            }
        } catch (InterruptedException e) {
            log.error("Error while processing webtoon chapters", e);
            return RepeatStatus.FINISHED;
        }

        log.info("Webtoon sync batch completed.");
        return RepeatStatus.FINISHED;
    }
}