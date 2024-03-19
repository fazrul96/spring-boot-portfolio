package com.example.demo.controllers;

import com.example.demo.models.BlogChapter;
import com.example.demo.services.AppConfig;
import com.example.demo.services.BlogChapterService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "${app.apiPath}")
public class BlogChapterController {
    private final BlogChapterService blogChapterService;
    private final AppConfig appConfig;

    @Autowired
    public BlogChapterController(BlogChapterService blogChapterService, AppConfig appConfig) {
        this.blogChapterService = blogChapterService;
        this.appConfig = appConfig;
    }

    @CrossOrigin(origins = "${app.basePath}")
    @Operation(summary = "Get list of blog chapters")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully retrieved blogs"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping(path = "getBlogChapters")
    public List<BlogChapter> getBlogChapters() {
        return blogChapterService.getBlogChapters();
    }

    @GetMapping(path = "getBlogChapters/{id}")
    public BlogChapter getBlogChapterById(@PathVariable String id) {
        return blogChapterService.getBlogChapterById(id);
    }

    @PostMapping(path = "postBlogChapters")
    public BlogChapter saveBlogChapter(@RequestBody BlogChapter blogChapter) {
        return blogChapterService.saveBlogChapter(blogChapter);
    }

    @DeleteMapping(path = "deleteBlogChapters/{id}")
    public void deleteBlogChapter(@PathVariable String id) {
        blogChapterService.deleteBlogChapter(id);
    }
}