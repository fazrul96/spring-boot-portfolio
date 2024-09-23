package com.example.demo;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@Slf4j
@SpringBootApplication
@ComponentScan(basePackages = {
        "com.example.demo.config",
        "com.example.demo.controller",
        "com.example.demo.service",
        "com.example.demo.repository",
        "com.example.demo.listener",
        "com.example.demo.properties"
})
@SuppressWarnings({"PMD.UseUtilityClass"})
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}