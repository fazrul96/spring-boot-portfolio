package com.example.demo.controllers;

import com.example.demo.models.Blog;
import com.example.demo.models.Experience;
import com.example.demo.services.AppConfig;
import com.example.demo.services.BlogService;
import com.example.demo.services.ExperienceService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "${app.apiPath}")
public class BlogController {
    private final BlogService blogService;
    private final AppConfig appConfig;

    public BlogController(BlogService blogService, AppConfig appConfig) {
        this.blogService = blogService;
        this.appConfig = appConfig;
    }

    @CrossOrigin(origins = "${app.basePath}")
    @Operation(summary = "Get list of blogs")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully retrieved blogs"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping(path = "getBlogs")
    public List<Blog> getBlogs() {
        return blogService.getBlogs();
    }
}