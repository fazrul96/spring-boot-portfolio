package com.example.demo.data.portfolio.repository;

import com.example.demo.data.portfolio.entity.WebtoonSuffix;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WebtoonSuffixRepository extends JpaRepository<WebtoonSuffix, String> {
    WebtoonSuffix findByTitle(String title);
}
