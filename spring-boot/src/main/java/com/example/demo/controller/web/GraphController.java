package com.example.demo.controller.web;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api")
public class GraphController {

    @PostMapping("/upload-csv")
    public ResponseEntity<byte[]> uploadCsvFile(
            @RequestParam("file") MultipartFile file) {
        try {
            RestTemplate restTemplate = new RestTemplate(); // todo change to env
            // String pythonApiUrl = "http://localhost:5001/generate-graph";
            String pythonApiUrl = "https://flask-app.mfzrl.cyou/generate-graph";

            // Set up headers for the request
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.MULTIPART_FORM_DATA);

            // Create the body containing the file
            MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
            body.add("file", file.getResource());

            // Create an HttpEntity object with headers and the body
            HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

            // Send the request to the Python API
            ResponseEntity<byte[]> response = restTemplate.postForEntity(
                    pythonApiUrl, requestEntity, byte[].class);

            // Return the image from the Flask API response
            return ResponseEntity.ok().contentType(MediaType.IMAGE_PNG).body(response.getBody());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}