package com.example.demo.config;

import lombok.Getter;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;

import java.util.LinkedHashMap;
import java.util.Map;

@Getter
@Component
public class BatchExecutionContext implements ApplicationContextAware {

    private Map<Long, String> jobExecutionExitCodeTracker;

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) {
        synchronized (this) {
            if (null == jobExecutionExitCodeTracker) {
                jobExecutionExitCodeTracker = new LinkedHashMap<>();
            }
        }
    }
}
