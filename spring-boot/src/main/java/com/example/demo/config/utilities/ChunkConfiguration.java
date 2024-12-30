package com.example.demo.config.utilities;

import com.example.demo.component.demo.WebtoonReader;
import com.example.demo.component.demo.WebtoonWriter;
import com.example.demo.dto.WebtoonDetailsDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.configuration.annotation.StepScope;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.batch.item.ItemReader;
import org.springframework.batch.item.ItemWriter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@Slf4j
public class ChunkConfiguration {
    @Bean
    public ItemReader<String> sampleReader() {
        return new ItemReader<>() {
            private int count = 0;

            @Override
            public String read() {
                return count < 5 ? "Item " + ++count : null;
            }
        };
    }

    @Bean
    public ItemProcessor<String, String> sampleProcessor() {
        return item -> "Processed: " + item;
    }

    @Bean
    public ItemWriter<String> sampleWriter() {
        return items -> items.forEach(System.out::println);
    }

    @Bean
    @StepScope
    public ItemReader<WebtoonDetailsDto> webtoonReader() {
        return new WebtoonReader();
    }

    @Bean
    @StepScope
    public WebtoonWriter webtoonWriter() {
        return new WebtoonWriter();
    }
}