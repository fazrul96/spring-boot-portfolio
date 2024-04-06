package com.example.demo.repositories;

import com.example.demo.entity.BlogChapter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BlogChapterRepository extends JpaRepository<BlogChapter, String> {
    BlogChapter findByEpisode(String episode);
}
