package com.example.demo.data.repository;

import com.example.demo.data.entity.Webtoon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WebtoonRepository extends JpaRepository<Webtoon, String> {
    Webtoon findByTitle(String title);
}
