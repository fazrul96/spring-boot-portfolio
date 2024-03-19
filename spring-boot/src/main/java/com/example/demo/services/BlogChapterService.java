package com.example.demo.services;

import com.example.demo.models.BlogChapter;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface BlogChapterService {
    List<BlogChapter> getBlogChapters();
    BlogChapter getBlogChapterById(String id);
    BlogChapter saveBlogChapter(BlogChapter blogChapter);
    void deleteBlogChapter(String id);
}