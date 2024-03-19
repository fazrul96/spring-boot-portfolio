package com.example.demo.repositories;

import com.example.demo.models.Education;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EducationRepository extends JpaRepository<Education, String> {
    Education findByName(String name);
}
