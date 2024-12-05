package com.example.demo.config.utilities;

import com.example.demo.service.modules.WebtoonService;
import com.example.demo.tasklet.DownloadWebtoonTasklet;
import com.example.demo.tasklet.LoggingTasklet;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;

@Configuration
@Slf4j
public class TaskletConfiguration {
    public LoggingTasklet loggingTasklet() {
        return new LoggingTasklet();
    }

    public DownloadWebtoonTasklet downloadWebtoonTasklet(WebtoonService webtoonService) {
        return new DownloadWebtoonTasklet(webtoonService);
    }
}
