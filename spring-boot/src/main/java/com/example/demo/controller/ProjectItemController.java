package com.example.demo.controller;

import com.example.demo.data.portfolio.entity.ProjectItem;
import com.example.demo.service.modules.ProjectItemService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "${app.publicApiPath}")
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
    @GetMapping(path = "projectItems")
    public ResponseEntity<List<ProjectItem>> getProjectItems() {
        List<ProjectItem> projectItems = projectItemService.getAllProjectItems();
        return ResponseEntity.ok(projectItems);
    }

    @Operation(summary = "Get a project item by ID")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully retrieved the project item"),
            @ApiResponse(responseCode = "404", description = "Project item not found"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping(path = "projectItems/{id}")
    public ResponseEntity<ProjectItem> getProjectItemById(@PathVariable String id) {
        ProjectItem projectItem = projectItemService.getProjectItemById(id);
        return projectItem != null ? ResponseEntity.ok(projectItem) : ResponseEntity.notFound().build();
    }

    @Operation(summary = "Create a new project item")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Successfully created project item"),
            @ApiResponse(responseCode = "400", description = "Invalid input"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @PostMapping(path = "projectItems")
    public ResponseEntity<ProjectItem> saveProjectItem(@RequestBody ProjectItem projectItem) {
        ProjectItem createdProjectItem = projectItemService.createProjectItem(projectItem);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdProjectItem);
    }

    @Operation(summary = "Delete a project item by ID")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Successfully deleted the project item"),
            @ApiResponse(responseCode = "404", description = "Project item not found"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @DeleteMapping(path = "projectItems/{id}")
    public ResponseEntity<Void> deleteProjectItem(@PathVariable String id) {
        projectItemService.deleteProjectItem(id);
        return ResponseEntity.noContent().build();
    }
}