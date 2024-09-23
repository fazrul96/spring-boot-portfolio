package com.example.demo.controller;

import com.example.demo.util.common.OCRProcessor;
import com.example.demo.util.common.ZipHandler;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Slf4j
@RestController
@RequestMapping(path = "${app.apiPath}")
@CrossOrigin(origins = "${app.basePath}")
@SuppressWarnings({"PMD.AvoidDuplicateLiterals","PMD.SignatureDeclareThrowsException","PMD.UnusedPrivateMethod"})
public class OCRController {
    private final String baseDirectory;
    private final String outputDirectory;
    private final Path sourcePath;
    private final Path targetPath;
    private String ocrResult;

    @Autowired
    public OCRController() {
        // base directory path
        this.baseDirectory = "src/test/resources/examples/";
        this.outputDirectory = this.baseDirectory + "tif/out/";
        // zip source and target
        this.sourcePath = Paths.get(this.baseDirectory + "zip/449215.zip");
        this.targetPath = Paths.get(this.outputDirectory);
    }

    @Operation(summary = "ProcessOCR")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully retrieved ocr results"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping(path = "getOcrResult")
    private String getOcrResult() throws Exception {
        unzipFiles();
        return processOCRInDirectory();
    }

    @Operation(summary = "ProcessOCRInDirectory")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully processOCR"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping(path = "ProcessOCRInDirectory")
    private String processOCRInDirectory() {
        OCRProcessor ocrProcessor = new OCRProcessor();

        try {
            log.info("Starting OCR process. Base Directory: {}, Output Directory: {}",
                    baseDirectory, outputDirectory);
            ocrResult = ocrProcessor.processImagesInDirectory(baseDirectory, outputDirectory);
            log.info("OCR process completed successfully. Result: {}", ocrResult);
            return ocrResult;
        } catch (Exception e) {
            log.error("Error during OCR process: {}", e.getMessage(), e);
            return "OCR process failed";
        }
    }


    @Operation(summary = "processOCR")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully processOCR"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @PostMapping(path = "processOCR")
    public String processOCR(@RequestParam("file") MultipartFile file) {
        OCRProcessor ocrProcessor = new OCRProcessor();

        try {
            log.info("Received file: {}" + file.getOriginalFilename());
            log.info("Starting OCR process");

            // Save the uploaded file to a temporary location
            Path tempFilePath = Files.createTempFile("uploadedImage", file.getOriginalFilename());
            Files.write(tempFilePath, file.getBytes());

            // Process the image
            ocrResult = ocrProcessor.processImage(tempFilePath.toString());

            String finalOcrResult =
                    ocrResult.replaceAll("\\[\\s*", "").replaceAll("\\]", "");

            log.info("OCR process completed successfully. Result: {}", finalOcrResult);
            return finalOcrResult;
        } catch (Exception e) {
            log.error("Error during OCR process: " + e.getMessage(), e);
            return "OCR process failed";
        }
    }

    @Operation(summary = "UnzipFiles")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully unzipFiles"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping(path = "unzipFiles")
    private String unzipFiles() {
        ZipHandler zipHandler = new ZipHandler();

        try {
            log.info("Starting unzip file process. Source: {}, Target: {}", sourcePath, targetPath);
            zipHandler.unzipFiles(sourcePath, targetPath);
            log.info("Unzip file process completed successfully.");
            return "Unzip process completed";
        } catch (IOException e) {
            log.error("Error during unzip file process: " + e.getMessage(), e);
            return "Unzip process failed";
        }
    }
}