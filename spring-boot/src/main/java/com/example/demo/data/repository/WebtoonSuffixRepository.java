package com.example.demo.data.repository;

import com.example.demo.data.entity.WebtoonSuffix;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WebtoonSuffixRepository extends JpaRepository<WebtoonSuffix, String> {
    Optional<WebtoonSuffix> findByTitle(String title);
}
