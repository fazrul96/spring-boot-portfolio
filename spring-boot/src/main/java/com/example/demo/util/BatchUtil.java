package com.example.demo.util;

import com.example.demo.data.portfolio.repository.WebtoonRepository;
import com.example.demo.dto.WebtoonDetailsDto;
import com.example.demo.properties.BatchProperties;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.StepExecution;
import org.springframework.batch.core.scope.context.StepContext;
import org.springframework.batch.core.scope.context.StepSynchronizationManager;
import org.springframework.batch.item.ExecutionContext;

import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

import static com.example.demo.constants.BatchConstant.*;

@Slf4j
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class BatchUtil {
    private static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();
    private static final Map<String, Object> BATCH_REPOSITORIES = new HashMap<>();

    public static Map<String, Object> getBatchRepositories() {
        return Collections.unmodifiableMap(BATCH_REPOSITORIES);
    }

    public static void setBatchRepositories(String key, Object value) {
        BATCH_REPOSITORIES.put(key, value);
    }

    public static String retrieveOutputFileFullPath(BatchProperties batchProperties,
                                                    LocalDate date, int counter, String batchName) throws IOException {
        String outputFileBaseName = switch (batchName) {
            case PORTFOLIO -> batchProperties.getOutputFileBaseName();
            default -> null;
        };

        String finalPath = batchProperties.getOutputFilePath()
                + outputFileBaseName
                + date.format(DateTimeFormatter.ofPattern("ddMMyyyy"))
                + "_"
                + String.format("%02d", counter)
                + batchProperties.getOutputFilePath();

        if (counter == 1 && new File(finalPath).getParentFile().mkdirs()) {
            log.debug("Directories created successfully");
        }
        return finalPath;
    }

    public static LocalDate retrieveDate(int subDate) {
        ZoneId gmtPlus8 = ZoneId.of("GMT-8");
        ZonedDateTime now = ZonedDateTime.now(gmtPlus8);
        LocalDateTime currentDateTime = now.toLocalDateTime();
        return currentDateTime.toLocalDate().minusDays(subDate);
    }

    public static String formatSeq(int number) {
        return String.format("%015d", number);
    }

    public static void initializeRepository(
        WebtoonRepository webtoonRepository
    ) {
        setBatchRepositories(BATCH_WEBTOON_QUERY_REPOSITORY, webtoonRepository);
    }

    public static List<WebtoonDetailsDto> getWebtoonDetailList(ExecutionContext executionContext) {
        WebtoonRepository webtoonRepository =
            (WebtoonRepository) getBatchRepositories().get(BATCH_WEBTOON_QUERY_REPOSITORY);

        //List<WebtoonDetailsDto> webtoonDetailsList = webtoonRepository.findWebtoonDetailsWithChapters();
        return new ArrayList<>();
    }

    public static ExecutionContext getExecutionContext() {
        StepContext stepContext = StepSynchronizationManager.getContext();
        assert stepContext != null;
        StepExecution stepExecution = stepContext.getStepExecution();
        JobExecution jobExecution = stepExecution.getJobExecution();

        return jobExecution.getExecutionContext();
    }
}
