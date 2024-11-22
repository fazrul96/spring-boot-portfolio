package com.example.demo.tasklet;

import com.example.demo.service.modules.WebtoonService;
import lombok.RequiredArgsConstructor;
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
@RequiredArgsConstructor
public class DownloadWebtoonTasklet implements Tasklet {
    private final WebtoonService webtoonService;

    private String title = "the-world-after-the-end";
    private String source = "asura";
    private String suffix = "-6aa122d8";
    private int currentChapter = 1;
    private int maxChapters = 5;

    @Override
    public RepeatStatus execute(StepContribution contribution, ChunkContext chunkContext) {
        log.info("Processing webtoon chapters...");

        try {
            webtoonService.downloadWebtoon(title, String.valueOf(currentChapter), source, suffix);
            log.info("Successfully processed chapter {}", currentChapter);

        } catch (Exception e) {
            log.error("Failed to process chapter {}: {}", currentChapter, e.getMessage());
        }

        currentChapter++;
        if (currentChapter > maxChapters) {
            log.info("All chapters processed. Exiting.");
            return RepeatStatus.FINISHED;
        }

        return RepeatStatus.CONTINUABLE;
    }
}