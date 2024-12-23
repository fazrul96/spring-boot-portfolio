package com.example.demo.controller.web;

import com.example.demo.data.portfolio.entity.WebtoonChapter;
import com.example.demo.service.web.modules.WebtoonChapterService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.example.demo.constants.ApiConstant.WEBTOONS_TITLE_CHAPTERS;

@Slf4j
@RestController
@RequestMapping(path = "${app.privateApiPath}")
@CrossOrigin(origins = "${app.basePath}")
public class WebtoonChapterController {
    private final WebtoonChapterService webtoonChapterService;

    @Autowired
    public WebtoonChapterController(WebtoonChapterService webtoonChapterService) {
        this.webtoonChapterService = webtoonChapterService;
    }

    @Operation(summary = "Retrieve all webtoon chapters")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully retrieved webtoon chapters"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping(path = WEBTOONS_TITLE_CHAPTERS)
    public ResponseEntity<List<WebtoonChapter>> getAllWebtoonChapters(@PathVariable String title) {
        List<WebtoonChapter> webtoonChapters = webtoonChapterService.getWebtoonChaptersByTitle(title);
        if (webtoonChapters.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(webtoonChapters);
    }
}