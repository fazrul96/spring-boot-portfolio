package com.example.demo.properties;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@NoArgsConstructor
@Data
@ConfigurationProperties("batch.portfolio")
public class BatchProperties {
    private Integer chunkSize;
    private String outputFilePath;
    private String outputFileBaseName;
    private String fromDate;
    private String toDate;
    private String portfolioOutputFileBaseName;
}
