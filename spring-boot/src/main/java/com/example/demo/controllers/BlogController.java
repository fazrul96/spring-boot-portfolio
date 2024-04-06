package com.example.demo.controllers;

import com.example.demo.entity.Blog;
import com.example.demo.services.modules.BlogService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "${app.apiPath}")
@CrossOrigin(origins = "${app.basePath}")
public class BlogController {
    private final BlogService blogService;

    @Autowired
    public BlogController(BlogService blogService) {
        this.blogService = blogService;
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
    public Blog getBlogById(@PathVariable Integer id) {
        return blogService.getBlogById(id);
    }

    @PostMapping(path = "postBlogs")
    public Blog saveBlog(@RequestBody Blog blog) {
        return blogService.saveBlog(blog);
    }

    @DeleteMapping(path = "deleteBlogs/{id}")
    public void deleteBlog(@PathVariable Integer id) {
        blogService.deleteBlog(id);
    }
}