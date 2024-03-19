package com.example.demo.repositories;

import com.example.demo.models.Blog;
import com.example.demo.models.BlogChapter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BlogChapterRepository extends JpaRepository<BlogChapter, String> {
    BlogChapter findByEpisode(String episode);
}
