package com.example.demo.service.modules;

import com.example.demo.data.entity.Blog;
import com.example.demo.data.repository.BlogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BlogService {
    private final BlogRepository blogRepository;

    @Autowired
    public BlogService(BlogRepository blogRepository) {
        this.blogRepository = blogRepository;
    }

    public List<Blog> getBlogs() {
        return blogRepository.findAll();
    }

    public Blog getBlogById(Integer id) {
        Optional<Blog> optionalBlog = blogRepository.findById(id);
        return optionalBlog.orElse(null);
    }

    public Blog getBlogByAlias(String alias) {
        return blogRepository.findByAlias(alias);
    }

    public Blog saveBlog(Blog blog) {
        return blogRepository.save(blog);
    }

    public void deleteBlog(Integer id) {
        blogRepository.deleteById(id);
    }
}