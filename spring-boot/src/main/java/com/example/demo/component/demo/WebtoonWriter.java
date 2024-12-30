package com.example.demo.component.demo;

import com.example.demo.dto.WebtoonDetailsDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.configuration.annotation.StepScope;
import org.springframework.batch.item.Chunk;
import org.springframework.batch.item.ItemWriter;

@Slf4j
@StepScope
@SuppressWarnings("PMD.AvoidFileStream")
public class WebtoonWriter implements ItemWriter<WebtoonDetailsDto> {
    @Override
    public void write(Chunk<? extends WebtoonDetailsDto> chunk) {
        for (WebtoonDetailsDto webtoonDetailsDto : chunk) {
            log.info("Inside loop");
        }
    log.info("Outside loop");
    }
}
