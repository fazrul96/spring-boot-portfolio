package com.example.demo.controller;

import com.example.demo.service.storage.MinioService;
import io.minio.errors.*;
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

@Slf4j
@RestController
@RequestMapping(path = "${app.apiPath}")
@CrossOrigin(origins = "${app.basePath}")
@SuppressWarnings({"PMD.SignatureDeclareThrowsException"})
public class MinIOController {
    @Autowired
    private MinioService minioService;

    @PostMapping(path = "uploadFiles")
    public ResponseEntity<String> uploadFiles(@RequestParam("files") List<MultipartFile> files) {
        try {
            List<String> uploadedFileNames = minioService.uploadFiles(files);
            return ResponseEntity.ok("Upload successful for files: " + uploadedFileNames);
        } catch (IOException | NoSuchAlgorithmException | InvalidKeyException | MinioException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Upload failed");
        }
    }

    @DeleteMapping(path = "deleteFile")
    public void delete(@RequestParam("fileName") String fileName) throws
            ServerException, InsufficientDataException, ErrorResponseException, IOException, NoSuchAlgorithmException,
            InvalidKeyException, InvalidResponseException, XmlParserException, InternalException {
        minioService.deleteFile(fileName);
    }

    @GetMapping(path = "getFileInfo")
    public String getFileInfo(@RequestParam("fileName") String fileName) throws
            ServerException, InsufficientDataException, ErrorResponseException, IOException, NoSuchAlgorithmException,
            InvalidKeyException, InvalidResponseException, XmlParserException, InternalException {
        return minioService.getFileInfo(fileName);
    }

    @GetMapping(path = "downloadFile")
    public void downloadFile(@RequestParam("fileName") String fileName, HttpServletResponse response) throws
            Exception {
        minioService.downloadFile(fileName, response);
    }
}