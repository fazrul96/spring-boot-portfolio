package com.example.demo.data.portfolio.repository;

import com.example.demo.data.portfolio.entity.Webtoon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WebtoonRepository extends JpaRepository<Webtoon, String> {
    Webtoon findByTitle(String title);
}
