package com.example.demo.data.repository;

import com.example.demo.data.entity.Education;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EducationRepository extends JpaRepository<Education, Integer> {
    Education findByName(String name);
}
