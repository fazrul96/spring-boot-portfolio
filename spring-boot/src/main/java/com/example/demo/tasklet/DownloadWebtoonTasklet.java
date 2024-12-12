package com.example.demo.tasklet;

import com.example.demo.data.portfolio.repository.WebtoonRepository;
import com.example.demo.dto.WebtoonDto;
import com.example.demo.exception.BaseException;
import com.example.demo.service.modules.WebtoonService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.StepContribution;
import org.springframework.batch.core.configuration.annotation.StepScope;
import org.springframework.batch.core.scope.context.ChunkContext;
import org.springframework.batch.core.step.tasklet.Tasklet;
import org.springframework.batch.repeat.RepeatStatus;
import org.springframework.stereotype.Component;

import static com.example.demo.exception.BatchErrorType.GENERIC_ERROR;

@StepScope
@Component
@Slf4j
@RequiredArgsConstructor
public class DownloadWebtoonTasklet implements Tasklet {

    private final WebtoonService webtoonService;
    private final WebtoonRepository webtoonRepository;

    @Override
    public RepeatStatus execute(StepContribution contribution, ChunkContext chunkContext) throws BaseException {
        log.info("Starting to process webtoon chapters...");

        String parameter = getJobParameter(chunkContext);
        log.info("Webtoon title: {}", parameter);

        WebtoonDto webtoonDto = getWebtoonDetails(parameter);
        log.info("Processing webtoonDto: {}", webtoonDto);

        processWebtoonChapters(webtoonDto);

        log.info("Completed processing for webtoonDto: {}", parameter);
        return RepeatStatus.FINISHED;
    }

    private String getJobParameter(ChunkContext chunkContext) throws BaseException {
        String parameter = (String) chunkContext.getStepContext().getJobParameters().get("title");
        if (parameter == null) {
            log.error("Missing job parameter: {}", "title");
            throw new BaseException(GENERIC_ERROR);
        }
        return parameter;
    }

    private WebtoonDto getWebtoonDetails(String title) throws BaseException {
        WebtoonDto webtoon = webtoonRepository.findWebtoonWithMinChapter(title);
        if (webtoon == null) {
            log.error("Webtoon not found for title: {}", title);
            throw new BaseException(GENERIC_ERROR);
        }
        return webtoon;
    }

    private void processWebtoonChapters(WebtoonDto webtoonDto) {
        Integer currentChapter = webtoonDto.getMinChapter();
        Integer maxChapters =  webtoonDto.getMaxChapter();
        String source = webtoonDto.getSource();
        String suffix = webtoonDto.getSuffix();

        while (currentChapter <= maxChapters) {
            try {
                webtoonService.downloadWebtoon(
                    webtoonDto.getTitle(),
                    currentChapter,
                    source,
                    suffix
                );
                log.info("Successfully processed chapter {} of webtoon: {}", currentChapter, webtoonDto.getTitle());
            } catch (Exception e) {
                log.error("Failed to process chapter {}: {}", currentChapter, e.getMessage());
            }
            currentChapter++;
        }
    }
}