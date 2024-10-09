package com.example.demo.controller;

import com.example.demo.data.entity.Blog;
import com.example.demo.service.modules.BlogService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "${app.privateApiPath}")
@CrossOrigin(origins = "${app.basePath}")
public class BlogController {
    private final BlogService blogService;

    @Autowired
    public BlogController(BlogService blogService) {
        this.blogService = blogService;
    }

    @Operation(summary = "Get list of blogs")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully retrieved blogs"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping(path = "blogs")
    public ResponseEntity<List<Blog>> getBlogs() {
        List<Blog> blogs = blogService.getBlogs();
        return ResponseEntity.ok(blogs);
    }

    @Operation(summary = "Get a blog by ID")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully retrieved the blog"),
            @ApiResponse(responseCode = "404", description = "Blog not found"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping(path = "blogs/{id}")
    public ResponseEntity<Blog> getBlogById(@PathVariable Integer id) {
        Blog blog = blogService.getBlogById(id);
        return blog != null ? ResponseEntity.ok(blog) : ResponseEntity.notFound().build();
    }

    @Operation(summary = "Create a new blog")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Successfully created the blog"),
            @ApiResponse(responseCode = "400", description = "Invalid input"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @PostMapping(path = "blogs")
    public ResponseEntity<Blog> saveBlog(@RequestBody Blog blog) {
        Blog createdBlog = blogService.saveBlog(blog);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdBlog);
    }

    @Operation(summary = "Delete a blog by ID")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Successfully deleted the blog"),
            @ApiResponse(responseCode = "404", description = "Blog not found"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @DeleteMapping(path = "blogs/{id}")
    public ResponseEntity<Void> deleteBlog(@PathVariable Integer id) {
        blogService.deleteBlog(id);
        return ResponseEntity.noContent().build();
    }
}