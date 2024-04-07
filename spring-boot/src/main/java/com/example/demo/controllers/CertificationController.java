package com.example.demo.controllers;

import com.example.demo.entity.Certification;
import com.example.demo.services.modules.CertificationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "${app.apiPath}")
@CrossOrigin(origins = "${app.basePath}")
public class CertificationController {
    private final CertificationService certificationService;

    @Autowired
    public CertificationController(CertificationService certificationService) {
        this.certificationService = certificationService;
    }

    @Operation(summary = "Get list of certifications")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully retrieved certifications"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping(path = "getCertifications")
    public List<Certification> getCertifications() {
        return certificationService.getCertifications();
    }

    @Operation(summary = "Get list of certifications using id")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully retrieved certifications using id"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping(path = "getCertifications/{id}")
    public Certification getCertificationById(@PathVariable Integer id) {
        return certificationService.getCertificationById(id);
    }

    @PostMapping(path = "postCertifications")
    public Certification saveCertification(@RequestBody Certification certification) {
        return certificationService.saveCertification(certification);
    }

    @DeleteMapping(path = "deleteCertifications/{id}")
    public void deleteCertification(@PathVariable Integer id) {
        certificationService.deleteCertification(id);
    }
}