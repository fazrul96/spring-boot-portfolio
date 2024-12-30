package com.example.demo.data.portfolio.repository;

import com.example.demo.data.portfolio.entity.ExperienceItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExperienceItemRepository extends JpaRepository<ExperienceItem, String> {
    ExperienceItem findByTitle(String title);
}
