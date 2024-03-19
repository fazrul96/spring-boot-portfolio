package com.example.demo.services;

import com.example.demo.models.Blog;
import com.example.demo.models.BlogChapter;
import com.example.demo.repositories.BlogChapterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BlogChapterServiceImpl implements BlogChapterService {
    private final BlogChapterRepository blogChapterRepository;

    @Autowired
    public BlogChapterServiceImpl(BlogChapterRepository blogChapterRepository) {
        this.blogChapterRepository = blogChapterRepository;
    }

    @Override
    public List<BlogChapter> getBlogChapters() {
        return blogChapterRepository.findAll();
    }

    @Override
    public BlogChapter getBlogChapterById(String id) {
        Optional<BlogChapter> optionalBlog = blogChapterRepository.findById(id);
        return optionalBlog.orElse(null);
    }

    public BlogChapter getBlogChapterByAlias(String episode) {
        return blogChapterRepository.findByEpisode(episode);
    }


    @Override
    public BlogChapter saveBlogChapter(BlogChapter blogChapter) {
        return blogChapterRepository.save(blogChapter);
    }

    @Override
    public void deleteBlogChapter(String id) {
        blogChapterRepository.deleteById(id);
    }
}