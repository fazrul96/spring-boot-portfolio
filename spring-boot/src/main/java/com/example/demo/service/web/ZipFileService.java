package com.example.demo.service.web;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import lombok.extern.slf4j.Slf4j;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

@Slf4j
@Service
public class ZipFileService {

    // private final String flaskZipUrl = "http://localhost:5001/download-zip";
    private final String flaskZipUrl = "https://flask-app.mfzrl.cyou/download-zip";
    private Map<String, byte[]> extractedFiles = new HashMap<>();

    // Method to download, extract, and store files in memory
    public void downloadAndExtractZip() {
        RestTemplate restTemplate = new RestTemplate();
        log.info("Starting process: download and extract zip");

        try {
            // Make the request and get the zip file as a byte array
            ResponseEntity<byte[]> response = restTemplate.getForEntity(flaskZipUrl, byte[].class);
            byte[] zipBytes = response.getBody();

            if (zipBytes != null) {
                try (InputStream inputStream = new ByteArrayInputStream(zipBytes);
                     ZipInputStream zipInputStream = new ZipInputStream(inputStream)) {

                    ZipEntry entry;
                    extractedFiles.clear();  // Clear previous contents

                    // Read each entry in the zip file and store in memory
                    while ((entry = zipInputStream.getNextEntry()) != null) {
                        if (!entry.isDirectory()) {
                            byte[] fileData = zipInputStream.readAllBytes();
                            extractedFiles.put(entry.getName(), fileData);  // Store file in memory
                        }
                    }
                    log.info("Completed process: download and extract zip");
                }
            } else {
                log.error("Failed to download zip file - response body is null");
            }
        } catch (Exception e) {
            log.error("An error occurred during download and extraction", e);
        }
    }

    // Method to list extracted file names
    public Map<String, String> listExtractedFiles() {
        log.info("Retrieve list of extracted file names");
        Map<String, String> filesInfo = new HashMap<>();
        extractedFiles.forEach((fileName, fileData) -> filesInfo.put(fileName, fileName));  // Return file names
        return filesInfo;
    }

    // Method to get the file contents as byte array by file name
    public byte[] getFileContents(String fileName) throws IOException {
        log.info("Retrieve file contents for: {}", fileName);
        byte[] fileData = extractedFiles.get(fileName);
        if (fileData != null) {
            return fileData;
        } else {
            throw new IOException("File not found");
        }
    }
}