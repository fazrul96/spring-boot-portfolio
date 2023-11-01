package com.example.demo.controllers;

import com.example.demo.models.Certification;
import com.example.demo.services.CertificationService;
import com.example.demo.services.AppConfig;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@RestController
@RequestMapping(path = "${app.apiPath}")
public class CertificationController {
    private final CertificationService certificationService;
    private final AppConfig appConfig;

    public CertificationController(CertificationService certificationService, AppConfig appConfig) {
        this.certificationService = certificationService;
        this.appConfig = appConfig;
    }

    @CrossOrigin(origins = "${app.basePath}")
    @Operation(summary = "Get list of certifications")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully retrieved certifications"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping(path = "getCertifications")
    public List<Certification> getCertifications() {
        return certificationService.getCertifications();
    }
}