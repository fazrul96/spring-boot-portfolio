package com.example.demo.component.demo;

import com.example.demo.dto.WebtoonDetailsDto;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.batch.core.annotation.BeforeStep;
import org.springframework.batch.core.configuration.annotation.StepScope;
import org.springframework.batch.item.ExecutionContext;
import org.springframework.batch.item.support.AbstractItemCountingItemStreamItemReader;

import java.util.List;

import static com.example.demo.util.BatchUtil.getExecutionContext;
import static com.example.demo.util.BatchUtil.getWebtoonDetailList;

@Slf4j
@StepScope
public class WebtoonReader extends AbstractItemCountingItemStreamItemReader<WebtoonDetailsDto> {
    private final Object lock = new Object();
    private List<WebtoonDetailsDto> results;
    private int current;

    @BeforeStep
    public void beforeStep() {
        // Do nothing
    }

    private List<WebtoonDetailsDto> doSearch() {
        ExecutionContext executionContext = getExecutionContext();
        //executionContext.putString();

        log.info("Querying from database");
        List<WebtoonDetailsDto> webtoonDetailList = getWebtoonDetailList(executionContext);
        log.info("Total number of records: {}", webtoonDetailList.size());

        if (webtoonDetailList.isEmpty()) {
            log.info("No records");
        }
        return webtoonDetailList;
    }

    @Override
    protected WebtoonDetailsDto doRead() {
        synchronized (lock) {
            if (results == null) {
                current = 0;
                results = doSearch();
            }

            if (CollectionUtils.isNotEmpty(results) && current < results.size()) {
                WebtoonDetailsDto currentRecord = results.get(current);
                current++;
                return currentRecord;
            } else {
                return null;
            }
        }
    }

    @Override
    protected void doOpen() {
        // Do nothing
    }

    @Override
    @SuppressWarnings("PMD.NullAssigment")
    protected void doClose() {
        synchronized (lock) {
            current = 0;
            results = null;
        }
    }
}
