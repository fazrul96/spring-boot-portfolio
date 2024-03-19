package com.example.demo.repositories;

import com.example.demo.models.ExperienceItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExperienceItemRepository extends JpaRepository<ExperienceItem, String> {
    ExperienceItem findByTitle(String title);
}
