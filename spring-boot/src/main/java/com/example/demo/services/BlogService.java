package com.example.demo.services;

import com.example.demo.models.Blog;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface BlogService {
    List<Blog> getBlogs();
    Blog getBlogById(String id);
    Blog saveBlog(Blog blog);
    void deleteBlog(String id);
}