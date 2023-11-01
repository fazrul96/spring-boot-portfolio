package com.example.demo.controllers;

import com.example.demo.OCRProcessor;
import com.example.demo.ZipHandler;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping(path = "${app.apiPath}")
public class OCRController {
    private String baseDirectory;
    private String outputDirectory;
    private String ocrResult;
    private Path sourcePath;
    private Path targetPath;
    private static final Logger logger = LoggerFactory.getLogger(OCRController.class);

    @Autowired
    public OCRController() {
        // base directory path
        this.baseDirectory = "src/test/resources/examples/";
        this.outputDirectory = this.baseDirectory + "tif/out/";
        // zip source and target
        this.sourcePath = Paths.get(this.baseDirectory + "zip/449215.zip");
        this.targetPath = Paths.get(this.outputDirectory);
    }

    @CrossOrigin(origins = "${app.basePath}")
    @Operation(summary = "ProcessOCR")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully retrieved ocr results"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping(path = "getOcrResult")
    private String getOcrResult() throws Exception {
        unzipFiles();
        return processOCR();
    }

    @Operation(summary = "ProcessOCR")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully processOCR"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping(path = "processOCR")
    private String processOCR() {
        OCRProcessor ocrProcessor = new OCRProcessor();

        try {
            logger.info("Starting OCR process. Base Directory: {}, Output Directory: {}", baseDirectory, outputDirectory);
            ocrResult = ocrProcessor.processImagesInDirectory(baseDirectory, outputDirectory);
            logger.info("OCR process completed successfully. Result: {}", ocrResult);
            return ocrResult;
        } catch (Exception e) {
            logger.error("Error during OCR process: " + e.getMessage(), e);
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
            logger.info("Starting unzip file process. Source: {}, Target: {}", sourcePath, targetPath);
            zipHandler.unzipFiles(sourcePath, targetPath);
            logger.info("Unzip file process completed successfully.");
            return "Unzip process completed";
        } catch (IOException e) {
            logger.error("Error during unzip file process: " + e.getMessage(), e);
            return "Unzip process failed";
        }
    }
}