package com.example.demo.controller;

import com.example.demo.service.ImageService;
import com.example.demo.service.storage.MinioService;
import io.minio.errors.MinioException;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping(path = "${app.privateApiPath}")
@CrossOrigin(origins = "${app.basePath}")
@SuppressWarnings({"PMD.SignatureDeclareThrowsException"})
public class MinIOController {

    @Autowired
    private MinioService minioService;

    @Autowired
    private ImageService imageService;

    @PostMapping(path = "uploadFiles")
    public ResponseEntity<String> uploadFiles(@RequestParam("files") List<MultipartFile> files) {
        try {
            if (files == null || files.isEmpty()) {
                return ResponseEntity.badRequest().body("No files uploaded");
            }
            List<String> uploadedFileNames = minioService.uploadFiles(files, null);
            return ResponseEntity.ok("Upload successful for files: " + uploadedFileNames);
        } catch (IOException | NoSuchAlgorithmException | InvalidKeyException | MinioException e) {
            log.error("File upload failed", e); // Logging the error for debugging
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Upload failed: " + e.getMessage());
        }
    }

    @DeleteMapping(path = "deleteFile")
    public ResponseEntity<String> deleteFile(@RequestParam("fileName") String fileName) {
        try {
            minioService.deleteFile(fileName);
            return ResponseEntity.ok("File deleted successfully");
        } catch (Exception e) {
            log.error("File deletion failed", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("File deletion failed: " + e.getMessage());
        }
    }

    @GetMapping(path = "getFileInfo")
    public ResponseEntity<String> getFileInfo(@RequestParam("fileName") String fileName) {
        try {
            String fileInfo = minioService.getFileInfo(fileName);
            return ResponseEntity.ok(fileInfo);
        } catch (Exception e) {
            log.error("Error retrieving file info", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error retrieving file info: " + e.getMessage());
        }
    }

    @PostMapping(path = "downloadFile")
    public ResponseEntity<Void> downloadFile(@RequestParam("fileName") String fileName, HttpServletResponse response) {
        try {
            minioService.downloadFile(fileName, response);
            return ResponseEntity.ok().build(); // No content to return for the download
        } catch (Exception e) {
            log.error("Error downloading file", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping(path = "listFiles")
    public ResponseEntity<?> listFiles(@RequestParam(required = false) String prefix) {
        try {
            List<String> fileNames = minioService.listFiles(prefix);
            List<Map<String, Object>> processedFiles = minioService.processFiles(fileNames, prefix);
            return ResponseEntity.ok(processedFiles);
        } catch (Exception e) {
            log.error("Error listing files from MinIO", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Error listing files from MinIO", "throwable", e.getMessage()));
        }
    }
}