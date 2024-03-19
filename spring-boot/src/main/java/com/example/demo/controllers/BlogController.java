package com.example.demo.controllers;

import com.example.demo.models.Blog;
import com.example.demo.services.AppConfig;
import com.example.demo.services.BlogService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "${app.apiPath}")
public class BlogController {
    private final BlogService blogService;
    private final AppConfig appConfig;

    @Autowired
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

    @GetMapping(path = "getBlogs/{id}")
    public Blog getBlogById(@PathVariable String id) {
        return blogService.getBlogById(id);
    }

    @PostMapping(path = "postBlogs")
    public Blog saveBlog(@RequestBody Blog blog) {
        return blogService.saveBlog(blog);
    }

    @DeleteMapping(path = "deleteBlogs/{id}")
    public void deleteBlog(@PathVariable String id) {
        blogService.deleteBlog(id);
    }
}