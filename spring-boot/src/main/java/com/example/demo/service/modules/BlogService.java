package com.example.demo.service.modules;

import com.example.demo.data.portfolio.entity.Blog;
import com.example.demo.data.portfolio.repository.BlogRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class BlogService {
    private final BlogRepository blogRepository;

    @Autowired
    public BlogService(BlogRepository blogRepository) {
        this.blogRepository = blogRepository;
    }

    public List<Blog> getBlogs() {
        log.info("Retrieving all blogs");
        return blogRepository.findAll();
    }

    public Blog getBlogById(Integer id) {
        log.info("Retrieving blog with ID: {}", id);
        return blogRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Blog not found with ID: " + id));
    }

    public Blog getBlogByAlias(String alias) {
        log.info("Retrieving blog with alias: {}", alias);
        return blogRepository.findByAlias(alias);
    }

    public Blog saveBlog(Blog blog) {
        log.info("Saving blog: {}", blog);
        return blogRepository.save(blog);
    }

    public void deleteBlog(Integer id) {
        log.info("Deleting blog with ID: {}", id);
        blogRepository.deleteById(id);
    }
}