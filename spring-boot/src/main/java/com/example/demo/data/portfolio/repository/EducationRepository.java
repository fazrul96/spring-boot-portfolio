package com.example.demo.data.portfolio.repository;

import com.example.demo.data.portfolio.entity.Education;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EducationRepository extends JpaRepository<Education, Integer> {
    Education findByName(String name);
}
