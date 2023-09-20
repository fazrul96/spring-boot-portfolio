package com.example.demo.controller;

import com.example.demo.model.Experience;
import com.example.demo.service.ExperienceService;
import com.example.demo.service.AppConfig;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@RestController
@RequestMapping("/api/v1/getExperiences")
public class ExperienceController {
    private final ExperienceService experienceService;
    private final AppConfig appConfig;

    public ExperienceController(ExperienceService experienceService, AppConfig appConfig) {
        this.experienceService = experienceService;
        this.appConfig = appConfig;
    }

    @CrossOrigin(origins = "${app.basePath}")
    @GetMapping
    public List<Experience> getExperiences() {
        return experienceService.getExperiences();
    }
}