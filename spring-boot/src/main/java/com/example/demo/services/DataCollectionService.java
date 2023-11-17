package com.example.demo.services;

import io.micrometer.core.instrument.MeterRegistry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DataCollectionService {
//    private final MeterRegistry meterRegistry;

//    @Autowired
//    public DataCollectionService(MeterRegistry meterRegistry) {
//        this.meterRegistry = meterRegistry;
//    }

    public void recordCustomMetric(int value) {
//        meterRegistry.counter("custom_metric", "type", "example").increment(value);
    }
}