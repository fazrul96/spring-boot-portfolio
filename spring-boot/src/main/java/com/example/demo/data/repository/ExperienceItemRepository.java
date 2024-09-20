package com.example.demo.data.repository;

import com.example.demo.data.entity.ExperienceItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExperienceItemRepository extends JpaRepository<ExperienceItem, String> {
    ExperienceItem findByTitle(String title);
}
