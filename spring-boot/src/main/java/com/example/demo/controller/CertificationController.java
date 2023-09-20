package com.example.demo.controller;

import com.example.demo.model.Certification;
import com.example.demo.service.CertificationService;
import com.example.demo.service.AppConfig;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@RestController
@RequestMapping("/api/v1/getCertifications")
public class CertificationController {
    private final CertificationService certificationService;
    private final AppConfig appConfig;

    public CertificationController(CertificationService certificationService, AppConfig appConfig) {
        this.certificationService = certificationService;
        this.appConfig = appConfig;
    }

    @CrossOrigin(origins = "${app.basePath}")
    @GetMapping
    public List<Certification> getCertifications() {
        return certificationService.getCertifications();
    }
}