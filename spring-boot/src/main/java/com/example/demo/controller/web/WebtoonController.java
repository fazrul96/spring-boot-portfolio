package com.example.demo.controller.web;

import com.example.demo.data.portfolio.entity.Webtoon;
import com.example.demo.dto.WebtoonDto;
import com.example.demo.service.modules.WebtoonService;
import com.example.demo.service.storage.MinioService;
import io.minio.errors.MinioException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
@RequestMapping(path = "${app.privateApiPath}")
@CrossOrigin(origins = "${app.basePath}")
public class WebtoonController {
    private final WebtoonService webtoonService;
    private final MinioService minioService;
    private final RestTemplate restTemplate;
    private static final String PYTHON_API_URL = "http://localhost:5001/download-webtoon";

    @Autowired
    public WebtoonController(WebtoonService webtoonService, MinioService minioService) {
        this.webtoonService = webtoonService;
        this.minioService = minioService;
        this.restTemplate = new RestTemplate();
    }

    @Operation(summary = "Retrieve all webtoons")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully retrieved webtoons"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping(path = "webtoons")
    public ResponseEntity<List<Webtoon>> getAllWebtoons() {
        List<Webtoon> webtoons = webtoonService.getAllWebtoons();
        return ResponseEntity.ok(webtoons);
    }

    @Operation(summary = "Retrieve a webtoon by title")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully retrieved the webtoon"),
            @ApiResponse(responseCode = "404", description = "Webtoon not found"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping(path = "webtoons/{title}")
    public ResponseEntity<WebtoonDto> getWebtoonByTitle(@PathVariable String title) {
        return webtoonService.getWebtoonByTitle(title)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @Operation(summary = "Create a new webtoon")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Successfully created webtoon"),
            @ApiResponse(responseCode = "400", description = "Invalid input"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @PostMapping(path = "webtoons")
    public ResponseEntity<WebtoonDto> createWebtoon(@Valid @RequestBody WebtoonDto webtoonDto) {
        webtoonService.createWebtoon(webtoonDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(webtoonDto);
    }

    @PutMapping(path = "webtoons/{title}")
    public ResponseEntity<WebtoonDto> updateWebtoon(
            @PathVariable String title,
            @RequestBody WebtoonDto webtoonDto) {

        return webtoonService.updateWebtoon(title, webtoonDto)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @Operation(summary = "Delete an webtoon by ID")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Successfully deleted the webtoon"),
            @ApiResponse(responseCode = "404", description = "Webtoon not found"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @DeleteMapping(path = "webtoons/{title}")
    public ResponseEntity<Void> deleteWebtoon(@PathVariable String title) {
        webtoonService.deleteWebtoonByTitle(title);
        return ResponseEntity.noContent().build();
    }

    @PostMapping(path = "download-webtoon")
    public ResponseEntity<String> downloadWebtoon(
            @RequestParam String title,
            @RequestParam String chapter,
            @RequestParam String source,
            @RequestParam String suffix) {

        try {
            ResponseEntity<byte[]> response = initiateWebtoonDownload(title, chapter, source, suffix);
            if (response.getStatusCode() != HttpStatus.OK) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("Error: Unable to download file");
            }

            // Step 2: Convert the byte[] data to a MultipartFile
            byte[] zipData = response.getBody();
            assert zipData != null;
            MultipartFile multipartFile = new MockMultipartFile(
                    "file", // Form field name (can be anything)
                    title + "-chapter-" + chapter + ".zip", // Filename for the zip
                    "application/zip", // Content type for zip files
                    new ByteArrayInputStream(zipData) // InputStream of the zip data
            );

            // Step 3: Upload the Zip File to MinIO
            List<MultipartFile> files = new ArrayList<>();
            files.add(multipartFile); // Add the MultipartFile to the list
            List<String> uploadedFileNames = minioService.uploadFiles(files, title); // Upload using the service

            log.info("File uploaded to MinIO: {}", uploadedFileNames);

            return ResponseEntity.ok("Download completed and uploaded to MinIO successfully: " + uploadedFileNames);

        } catch (RestClientException e) {
            log.error("Error during webtoon download", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error: " + e.getMessage());
        } catch (IOException | NoSuchAlgorithmException | InvalidKeyException | MinioException e) {
            log.error("Error during file upload to MinIO", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error uploading to MinIO: " + e.getMessage());
        }
    }

    private ResponseEntity<byte[]> initiateWebtoonDownload(String title, String chapter, String source, String suffix) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        MultiValueMap<String, Object> body = createRequestBody(title, chapter, source, suffix);
        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        // Expect the response as a byte array for binary data
        return restTemplate.exchange(PYTHON_API_URL, HttpMethod.POST, requestEntity, byte[].class);
    }

    private MultiValueMap<String, Object> createRequestBody(
            String title, String chapter, String source, String suffix) {

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("title", title);
        body.add("chapter", chapter.isEmpty() ? "1" : chapter);
        body.add("source", source.isEmpty() ? "hivetoon" : source);
        body.add("suffix", suffix.isEmpty() ? " " : suffix);
        return body;
    }
}