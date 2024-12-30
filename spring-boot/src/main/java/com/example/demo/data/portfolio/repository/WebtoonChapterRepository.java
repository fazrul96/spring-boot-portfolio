package com.example.demo.data.portfolio.repository;

import com.example.demo.data.portfolio.entity.WebtoonChapter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WebtoonChapterRepository extends JpaRepository<WebtoonChapter, String> {
    List<WebtoonChapter> findByTitle(String title);
}