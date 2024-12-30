package com.example.demo.controller.web;

import com.example.demo.data.portfolio.entity.WebtoonSuffix;
import com.example.demo.service.web.modules.WebtoonSuffixService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "${app.privateApiPath}")
@CrossOrigin(origins = "${app.basePath}")
public class WebtoonSuffixController {
    private final WebtoonSuffixService webtoonSuffixService;

    @Autowired
    public WebtoonSuffixController(WebtoonSuffixService webtoonSuffixService) {
        this.webtoonSuffixService = webtoonSuffixService;
    }

    @Operation(summary = "Retrieve all webtoons suffix")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully retrieved webtoons suffix"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping(path = "webtoons-suffix")
    public ResponseEntity<List<WebtoonSuffix>> getAllWebtoons() {
        List<WebtoonSuffix> webtoonsSuffix = webtoonSuffixService.getAllWebtoonsSuffix();
        return ResponseEntity.ok(webtoonsSuffix);
    }

    @Operation(summary = "Retrieve a webtoon suffix by title")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully retrieved the webtoon suffix"),
            @ApiResponse(responseCode = "404", description = "Webtoon suffix not found"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping(path = "webtoon-suffix/{title}")
    public ResponseEntity<WebtoonSuffix> getWebtoonSuffixByTitle(@PathVariable String title) {
        WebtoonSuffix webtoonsSuffix = webtoonSuffixService.getWebtoonSuffixByTitle(title);
        return ResponseEntity.ok(webtoonsSuffix);
    }
}