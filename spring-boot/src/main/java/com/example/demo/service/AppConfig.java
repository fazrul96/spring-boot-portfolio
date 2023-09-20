package com.example.demo.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {
    @Value("${app.basePath}")
    private String basePath;

    @Value("${app.apiPath}")
    private String apiPath;

    public String getBasePath() {
        return basePath;
    }

    public String getApiPath() {
        return apiPath;
    }
}
