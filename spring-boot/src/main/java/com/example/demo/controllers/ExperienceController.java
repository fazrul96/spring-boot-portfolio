package com.example.demo.controllers;

import com.example.demo.models.Experience;
import com.example.demo.services.ExperienceService;
import com.example.demo.services.AppConfig;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "${app.apiPath}")
public class ExperienceController {
    private final ExperienceService experienceService;
    private final AppConfig appConfig;

    @Autowired
    public ExperienceController(ExperienceService experienceService, AppConfig appConfig) {
        this.experienceService = experienceService;
        this.appConfig = appConfig;
    }

    @CrossOrigin(origins = "${app.basePath}")
    @Operation(summary = "Get list of experiences")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully retrieved experiences"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping(path = "getExperiences")
    public List<Experience> getExperiences() {
        return experienceService.getExperiences();
    }

    @GetMapping(path = "getExperiences/{id}")
    public Experience getExperienceById(@PathVariable String id) {
        return experienceService.getExperienceById(id);
    }

    @PostMapping(path = "postExperiences")
    public Experience saveExperience(@RequestBody Experience experience) {
        return experienceService.saveExperience(experience);
    }

    @DeleteMapping(path = "deleteExperiences/{id}")
    public void deleteExperience(@PathVariable String id) {
        experienceService.deleteExperience(id);
    }
}