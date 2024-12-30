package com.example.demo.controller.web;

import com.example.demo.service.web.ZipFileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping(path = "${app.privateApiPath}")
@CrossOrigin(origins = "${app.basePath}")
public class ZipController {

    @Autowired
    private ZipFileService zipFileService;

    // Endpoint to trigger download and extraction process
    @GetMapping(path = "process-zip")
    public ResponseEntity<Void> downloadAndExtractZip() {
        zipFileService.downloadAndExtractZip();
        return ResponseEntity.ok().build();
    }

    // Endpoint to list extracted file names
    @GetMapping(path = "files")
    public ResponseEntity<Map<String, String>> listFiles() {
        return ResponseEntity.ok(zipFileService.listExtractedFiles());
    }

    // Endpoint to retrieve specific image file content
    @GetMapping(path = "files/{fileName}", produces = "image/webp")
    public ResponseEntity<byte[]> getImage(@PathVariable String fileName) {
        try {
            byte[] fileContents = zipFileService.getFileContents(fileName);
            return ResponseEntity.ok()
                    .contentType(MediaType.valueOf("image/webp"))
                    .body(fileContents);
        } catch (IOException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
