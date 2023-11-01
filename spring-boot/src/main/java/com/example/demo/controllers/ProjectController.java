package com.example.demo.controllers;

import com.example.demo.models.Project;
import com.example.demo.services.ProjectService;
import com.example.demo.services.AppConfig;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@RestController
@RequestMapping(path = "${app.apiPath}")
public class ProjectController {
    private final ProjectService projectService;
    private final AppConfig appConfig;

    public ProjectController(ProjectService projectService, AppConfig appConfig) {
        this.projectService = projectService;
        this.appConfig = appConfig;
    }
    @Operation(summary = "Get list of projects")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully retrieved projects"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @CrossOrigin(origins = "${app.basePath}")
    @GetMapping(path = "getProjects")
    public List<Project> getProjects() {
        return projectService.getProjects();
    }
}