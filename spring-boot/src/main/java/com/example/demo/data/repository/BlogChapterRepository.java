package com.example.demo.data.repository;

import com.example.demo.data.entity.BlogChapter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BlogChapterRepository extends JpaRepository<BlogChapter, String> {
    BlogChapter findByEpisode(String episode);
}
