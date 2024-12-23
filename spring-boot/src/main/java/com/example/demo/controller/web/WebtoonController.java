package com.example.demo.controller.web;

import com.example.demo.data.portfolio.entity.Webtoon;
import com.example.demo.dto.WebtoonDto;
import com.example.demo.service.web.modules.WebtoonService;
import com.example.demo.service.storage.MinioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.example.demo.constants.ApiConstant.*;

@Slf4j
@RestController
@RequestMapping(path = "${app.privateApiPath}")
@CrossOrigin(origins = "${app.basePath}")
public class WebtoonController {
    private final WebtoonService webtoonService;

    @Autowired
    public WebtoonController(WebtoonService webtoonService, MinioService minioService) {
        this.webtoonService = webtoonService;
    }

    @Operation(summary = "Retrieve all webtoons")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully retrieved webtoons"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping(path = WEBTOONS)
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
    @GetMapping(path = WEBTOONS_TITLE)
    public ResponseEntity<Webtoon> getWebtoonByTitle(@PathVariable String title) {
        Webtoon webtoon = webtoonService.getWebtoonByTitle(title);
        return ResponseEntity.status(HttpStatus.CREATED).body(webtoon);
    }

    @Operation(summary = "Create a new webtoon")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Successfully created webtoon"),
            @ApiResponse(responseCode = "400", description = "Invalid input"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @PostMapping(path = WEBTOONS)
    public ResponseEntity<WebtoonDto> createWebtoon(@Valid @RequestBody WebtoonDto webtoonDto) {
        webtoonService.createWebtoon(webtoonDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(webtoonDto);
    }

    @PutMapping(path = WEBTOONS_TITLE)
    public ResponseEntity<String> updateWebtoon(
            @PathVariable String title,
            @RequestBody WebtoonDto webtoonDto) {

        return webtoonService.updateWebtoon(title, webtoonDto);
    }

    @Operation(summary = "Delete an webtoon by ID")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Successfully deleted the webtoon"),
            @ApiResponse(responseCode = "404", description = "Webtoon not found"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @DeleteMapping(path = WEBTOONS_TITLE)
    public ResponseEntity<Void> deleteWebtoon(@PathVariable String title) {
        webtoonService.deleteWebtoonByTitle(title);
        return ResponseEntity.noContent().build();
    }

    @PostMapping(path = DOWNLOAD_WEBTOON)
    public ResponseEntity<String> downloadWebtoon(
            @RequestParam String title,
            @RequestParam Integer chapter,
            @RequestParam String source,
            @RequestParam String suffix) {
        return webtoonService.downloadWebtoon(title, chapter, source, suffix);
    }

    @PatchMapping(path = LATEST_CHAPTER_WEBTOON)
    public ResponseEntity<String> fetchLatestChapterWebtoon(
            @RequestParam String title
    ) {
        return webtoonService.fetchLatestChapter(title);
    }
}