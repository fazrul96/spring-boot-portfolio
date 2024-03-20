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
@CrossOrigin(origins = "${app.basePath}")
public class BlogChapterController {
    private final BlogChapterService blogChapterService;
    @Autowired
    public BlogChapterController(BlogChapterService blogChapterService) {
        this.blogChapterService = blogChapterService;
    }

    @Operation(summary = "Get list of blog chapters")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully retrieved blog chapters"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping(path = "getBlogChapters")
    public List<BlogChapter> getBlogChapters() {
        return blogChapterService.getBlogChapters();
    }

    @Operation(summary = "Get list of blog chapters using Id")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully retrieved blog chapters using id"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
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