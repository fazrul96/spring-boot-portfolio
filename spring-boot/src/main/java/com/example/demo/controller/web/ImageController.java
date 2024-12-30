package com.example.demo.controller.web;

import com.example.demo.service.ImageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@Slf4j
@RestController
@RequestMapping(path = "${app.privateApiPath}")
@CrossOrigin(origins = "${app.basePath}")
public class ImageController {
    private final ImageService imageService;

    @Autowired
    public ImageController(ImageService imageService) {
        this.imageService = imageService;
    }

    @GetMapping(path = "downloadAndExtract")
    public ResponseEntity<List<String>> downloadAndExtractImages(
            @RequestParam("title") String title,
            @RequestParam("chapter") String chapter) {
        try {
            List<String> imageBase64List = imageService.downloadAndExtractImages(title, chapter);
            return ResponseEntity.ok(imageBase64List);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonList("Error occurred while processing images: " + e.getMessage()));
        }
    }
}
