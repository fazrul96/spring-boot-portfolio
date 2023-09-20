package com.example.demo.controller;

import com.example.demo.model.Project;
import com.example.demo.service.ProjectService;
import com.example.demo.service.AppConfig;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@RestController
@RequestMapping("/api/v1/getProjects")
public class ProjectController {
    private final ProjectService projectService;
    private final AppConfig appConfig;

    public ProjectController(ProjectService projectService, AppConfig appConfig) {
        this.projectService = projectService;
        this.appConfig = appConfig;
    }

    @CrossOrigin(origins = "${app.basePath}")
    @GetMapping
    public List<Project> getProjects() {
        return projectService.getProjects();
    }
}