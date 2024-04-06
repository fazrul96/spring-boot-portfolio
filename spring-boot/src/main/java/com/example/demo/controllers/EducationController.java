package com.example.demo.controllers;

import com.example.demo.entity.Education;
import com.example.demo.services.modules.EducationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "${app.apiPath}")
@CrossOrigin(origins = "${app.basePath}")
public class EducationController {
    private final EducationService educationService;
    @Autowired
    public EducationController(EducationService educationService) {
        this.educationService = educationService;
    }

    @Operation(summary = "Get list of educations")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully retrieved educations"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping(path = "getEducations")
    public List<Education> getEducations() {
        return educationService.getEducations();
    }

    @Operation(summary = "Get list of educations using id")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully retrieved educations using id"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping(path = "getEducations/{id}")
    public Education getEducationById(@PathVariable Integer id) {
        return educationService.getEducationById(id);
    }

    @PostMapping(path = "postEducations")
    public Education saveEducation(@RequestBody Education education) {
        return educationService.saveEducation(education);
    }

    @DeleteMapping(path = "deleteEducations/{id}")
    public void deleteEducation(@PathVariable Integer id) {
        educationService.deleteEducation(id);
    }
}