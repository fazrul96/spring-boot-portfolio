package com.example.demo.controllers;

import com.example.demo.models.Education;
import com.example.demo.services.EducationService;
import com.example.demo.services.AppConfig;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@RestController
@RequestMapping(path = "${app.apiPath}")
public class EducationController {
    private final EducationService educationService;
    private final AppConfig appConfig;

    public EducationController(EducationService educationService, AppConfig appConfig) {
        this.educationService = educationService;
        this.appConfig = appConfig;
    }

    @CrossOrigin(origins = "${app.basePath}")
    @GetMapping(path = "getEducations")
    public List<Education> getEducations() {
        return educationService.getEducations();
    }
}