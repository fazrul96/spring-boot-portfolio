package com.example.demo.controllers;

import com.example.demo.models.Project;
import com.example.demo.services.ProjectService;
import com.example.demo.services.AppConfig;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "${app.apiPath}")
@CrossOrigin(origins = "${app.basePath}")
public class ProjectController {
    private final ProjectService projectService;
    @Autowired
    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }
    @Operation(summary = "Get list of projects")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully retrieved projects"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping(path = "getProjects")
    public List<Project> getProjects() {
        return projectService.getProjects();
    }

    @Operation(summary = "Get list of projects using id")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully retrieved projects using id"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping(path = "getProjects/{id}")
    public Project getProjectById(@PathVariable String id) {
        return projectService.getProjectById(id);
    }

    @PostMapping(path = "postProjects")
    public Project saveProject(@RequestBody Project project) {
        return projectService.saveProject(project);
    }

    @DeleteMapping(path = "deleteProjects/{id}")
    public void deleteProject(@PathVariable String id) {
        projectService.deleteProject(id);
    }
}