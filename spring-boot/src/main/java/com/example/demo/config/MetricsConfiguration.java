//package com.example.demo.config;
//
//import io.micrometer.core.instrument.MeterRegistry;
//import org.springframework.boot.actuate.autoconfigure.metrics.MeterRegistryCustomizer;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
////@Configuration
//public class MetricsConfiguration {
//    @Bean
//    public MeterRegistryCustomizer<MeterRegistry> metricsCommonTags() {
//        return registry -> registry.config().commonTags("application", "Portfolio");
//    }
//}
