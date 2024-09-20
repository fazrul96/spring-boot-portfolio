package com.example.demo.controller;

import com.example.demo.data.entity.Experience;
import com.example.demo.service.modules.ExperienceService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path = "${app.apiPath}")
@CrossOrigin(origins = "${app.basePath}")
public class ExperienceController {
    private final ExperienceService experienceService;

    @Autowired
    public ExperienceController(ExperienceService experienceService) {
        this.experienceService = experienceService;
    }

    @Operation(summary = "Get list of all experiences")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully retrieved experiences"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping(path = "getExperiences")
    public List<Experience> getExperiences() {
        return experienceService.getExperiences();
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

    @Operation(summary = "Get list of experience using id")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully retrieved experience using id"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping(path = "getExperiences/{id}")
    public Experience getExperienceById(@PathVariable Integer id) {
        return experienceService.getExperienceById(id);
    }

    @PostMapping(path = "postExperiences")
    public Experience saveExperience(@RequestBody Experience experience) {
        return experienceService.saveExperience(experience);
    }

    @DeleteMapping(path = "deleteExperiences/{id}")
    public void deleteExperience(@PathVariable Integer id) {
        experienceService.deleteExperience(id);
    }
}