package com.example.demo.controller;

import com.example.demo.data.portfolio.entity.Certification;
import com.example.demo.service.modules.CertificationService;
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
public class CertificationController {
    private final CertificationService certificationService;

    @Autowired
    public CertificationController(CertificationService certificationService) {
        this.certificationService = certificationService;
    }

    @Operation(summary = "Retrieve a list of certifications")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully retrieved certifications"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping(path = "certifications")
    public ResponseEntity<List<Certification>> getAllCertifications() {
        List<Certification> certifications = certificationService.getAllCertifications();
        return ResponseEntity.ok(certifications);
    }

    @Operation(summary = "Retrieve a certification by ID")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully retrieved the certification"),
            @ApiResponse(responseCode = "404", description = "Certification not found"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping(path = "certifications/{id}")
    public ResponseEntity<Certification> getCertificationById(@PathVariable Integer id) {
        Certification certification = certificationService.getCertificationById(id);
        return certification != null ? ResponseEntity.ok(certification) : ResponseEntity.notFound().build();
    }

    @Operation(summary = "Create a new certification")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Successfully created certification"),
            @ApiResponse(responseCode = "400", description = "Invalid input"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @PostMapping(path = "certifications")
    public ResponseEntity<Certification> createCertification(@RequestBody Certification certification) {
        Certification createdCertification = certificationService.saveCertification(certification);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCertification);
    }

    @Operation(summary = "Delete a certification by ID")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Successfully deleted the certification"),
            @ApiResponse(responseCode = "404", description = "Certification not found"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @DeleteMapping(path = "certifications/{id}")
    public ResponseEntity<Void> deleteCertification(@PathVariable Integer id) {
        certificationService.deleteCertification(id);
        return ResponseEntity.noContent().build();
    }
}