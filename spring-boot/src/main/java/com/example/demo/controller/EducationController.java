package com.example.demo.controller;

import com.example.demo.model.Education;
import com.example.demo.service.EducationService;
import com.example.demo.service.AppConfig;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@RestController
@RequestMapping("/api/v1/getEducations")
public class EducationController {
    private final EducationService educationService;
    private final AppConfig appConfig;

    public EducationController(EducationService educationService, AppConfig appConfig) {
        this.educationService = educationService;
        this.appConfig = appConfig;
    }

    @CrossOrigin(origins = "${app.basePath}")
    @GetMapping
    public List<Education> getEducations() {
        return educationService.getEducations();
    }
}