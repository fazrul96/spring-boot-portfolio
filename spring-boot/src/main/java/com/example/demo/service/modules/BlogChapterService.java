package com.example.demo.service.modules;

import com.example.demo.data.entity.BlogChapter;
import com.example.demo.data.repository.BlogChapterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BlogChapterService {
    private final BlogChapterRepository blogChapterRepository;

    @Autowired
    public BlogChapterService(BlogChapterRepository blogChapterRepository) {
        this.blogChapterRepository = blogChapterRepository;
    }

    public List<BlogChapter> getBlogChapters() {
        return blogChapterRepository.findAll();
    }

    public BlogChapter getBlogChapterById(String id) {
        Optional<BlogChapter> optionalBlog = blogChapterRepository.findById(id);
        return optionalBlog.orElse(null);
    }

    public BlogChapter getBlogChapterByAlias(String episode) {
        return blogChapterRepository.findByEpisode(episode);
    }

    public BlogChapter saveBlogChapter(BlogChapter blogChapter) {
        return blogChapterRepository.save(blogChapter);
    }

    public void deleteBlogChapter(String id) {
        blogChapterRepository.deleteById(id);
    }
}