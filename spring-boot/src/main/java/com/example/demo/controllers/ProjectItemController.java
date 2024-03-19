package com.example.demo.controllers;

import com.example.demo.models.ProjectItem;
import com.example.demo.services.AppConfig;
import com.example.demo.services.ProjectItemService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "${app.apiPath}")
public class ProjectItemController {
    private final ProjectItemService projectItemService;
    private final AppConfig appConfig;
    @Autowired
    public ProjectItemController(ProjectItemService projectItemService, AppConfig appConfig) {
        this.projectItemService = projectItemService;
        this.appConfig = appConfig;
    }
    @Operation(summary = "Get list of projects")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully retrieved projects"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @CrossOrigin(origins = "${app.basePath}")
    @GetMapping(path = "getProjectItems")
    public List<ProjectItem> getProjectItems() {
        return projectItemService.getProjectItems();
    }

    @GetMapping(path = "getProjectItems/{id}")
    public ProjectItem getProjectItemById(@PathVariable String id) {
        return projectItemService.getProjectItemById(id);
    }

    @PostMapping(path = "postProjectItems")
    public ProjectItem saveProjectItem(@RequestBody ProjectItem projectItem) {
        return projectItemService.saveProjectItem(projectItem);
    }

    @DeleteMapping(path = "deleteProjectItems/{id}")
    public void deleteProjectItem(@PathVariable String id) {
        projectItemService.deleteProjectItem(id);
    }
}