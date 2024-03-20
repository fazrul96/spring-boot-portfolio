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
@CrossOrigin(origins = "${app.basePath}")
public class ProjectItemController {
    private final ProjectItemService projectItemService;
    @Autowired
    public ProjectItemController(ProjectItemService projectItemService) {
        this.projectItemService = projectItemService;
    }
    @Operation(summary = "Get list of project items")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully retrieved project items"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping(path = "getProjectItems")
    public List<ProjectItem> getProjectItems() {
        return projectItemService.getProjectItems();
    }

    @Operation(summary = "Get list of projects")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully retrieved project items using id"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
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