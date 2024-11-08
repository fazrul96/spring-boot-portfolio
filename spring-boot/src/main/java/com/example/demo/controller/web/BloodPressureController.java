package com.example.demo.controller.web;

import com.example.demo.service.web.BloodPressureService;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/blood-pressure")
public class BloodPressureController {

    private final BloodPressureService bloodPressureService;

    public BloodPressureController(BloodPressureService bloodPressureService) {
        this.bloodPressureService = bloodPressureService;
    }

    @PostMapping("/upload")
    public ResponseEntity<?> uploadBloodPressureData(@RequestParam("file") MultipartFile file) {
        try {
            // Call the service to process the uploaded file
            var result = bloodPressureService.processBloodPressureData(file);
            return ResponseEntity.ok(result);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error processing the file: " + e.getMessage());
        }
    }
}
