package com.example.demo.controller;

import com.example.demo.data.entity.Education;
import com.example.demo.service.modules.EducationService;
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
public class EducationController {
    private final EducationService educationService;

    @Autowired
    public EducationController(EducationService educationService) {
        this.educationService = educationService;
    }

    @Operation(summary = "Retrieve all educations")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully retrieved educations"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping(path = "educations")
    public ResponseEntity<List<Education>> getAllEducations() {
        List<Education> educations = educationService.getAllEducations();
        return ResponseEntity.ok(educations);
    }

    @Operation(summary = "Retrieve an education by ID")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully retrieved the education"),
            @ApiResponse(responseCode = "404", description = "Education not found"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping(path = "educations/{id}")
    public ResponseEntity<Education> getEducationById(@PathVariable Integer id) {
        return educationService.getEducationById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @Operation(summary = "Create a new education")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Successfully created education"),
            @ApiResponse(responseCode = "400", description = "Invalid input"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @PostMapping(path = "educations")
    public ResponseEntity<Education> createEducation(@RequestBody Education education) {
        Education createdEducation = educationService.saveEducation(education);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdEducation);
    }

    @Operation(summary = "Delete an education by ID")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Successfully deleted the education"),
            @ApiResponse(responseCode = "404", description = "Education not found"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @DeleteMapping(path = "educations/{id}")
    public ResponseEntity<Void> deleteEducation(@PathVariable Integer id) {
        if (educationService.deleteEducation(id)) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}