package com.example.demo.config;

import io.minio.MinioClient;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Data
@NoArgsConstructor
@Configuration
@ConfigurationProperties(prefix = "minio")
public class MinioConfiguration {

    private String bucketName;
    private String endpoint;
    private String accessKey;
    private String secretKey;
    private String username;
    private String password;

    @Bean
    public MinioClient minioClient() {
        try {
            return MinioClient.builder()
                    .endpoint(endpoint)
                    .credentials(accessKey, secretKey)
                    .build();
        } catch (Exception e) {
            throw new RuntimeException("Failed to create MinioClient: " + e.getMessage(), e);
        }
    }
}