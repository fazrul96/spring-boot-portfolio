package com.example.demo.controller;

import com.example.demo.data.portfolio.entity.Experience;
import com.example.demo.service.modules.ExperienceService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "${app.privateApiPath}")
@CrossOrigin(origins = "${app.basePath}")
public class ItemController {
    private final ExperienceService experienceService;

    @Autowired
    public ItemController(ExperienceService experienceService) {
        this.experienceService = experienceService;
    }

    @Operation(summary = "Retrieve all experiences")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully retrieved experiences"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping(path = "items")
    public ResponseEntity<List<Experience>> getAllExperiences() {
        List<Experience> experiences = experienceService.getAllExperiences();
        return ResponseEntity.ok(experiences);
    }
}
