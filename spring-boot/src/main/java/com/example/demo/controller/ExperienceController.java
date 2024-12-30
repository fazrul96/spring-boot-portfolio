package com.example.demo.controller;

import com.example.demo.data.portfolio.entity.Experience;
import com.example.demo.service.web.modules.ExperienceService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path = "${app.publicApiPath}")
@CrossOrigin(origins = "${app.basePath}")
public class ExperienceController {
    private final ExperienceService experienceService;

    @Autowired
    public ExperienceController(ExperienceService experienceService) {
        this.experienceService = experienceService;
    }

    @Operation(summary = "Retrieve all experiences")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully retrieved experiences"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping(path = "experiences")
    public ResponseEntity<List<Experience>> getAllExperiences() {
        List<Experience> experiences = experienceService.getAllExperiences();
        return ResponseEntity.ok(experiences);
    }

    @Operation(summary = "Get list of all experiences with experiences items")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully retrieved experiences with items"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping(path = "getExperiencesWithItems")
    public List<Map<String, Object>> getExperiencesWithItems() {
        return experienceService.getExperiencesWithItems();
    }

    @Operation(summary = "Retrieve an experience by ID")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully retrieved the experience"),
            @ApiResponse(responseCode = "404", description = "Education not found"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping(path = "experiences/{id}")
    public ResponseEntity<Experience> getExperienceById(@PathVariable Integer id) {
        return experienceService.getExperienceById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @Operation(summary = "Create a new experience")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Successfully created experience"),
            @ApiResponse(responseCode = "400", description = "Invalid input"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @PostMapping(path = "experiences")
    public ResponseEntity<Experience> createEducation(@RequestBody Experience experience) {
        Experience createdExperience = experienceService.saveExperience(experience);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdExperience);
    }

    @Operation(summary = "Delete an experience by ID")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Successfully deleted the experience"),
            @ApiResponse(responseCode = "404", description = "Education not found"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @DeleteMapping(path = "experiences/{id}")
    public ResponseEntity<Void> deleteExperience(@PathVariable Integer id) {
        if (experienceService.deleteExperience(id)) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}