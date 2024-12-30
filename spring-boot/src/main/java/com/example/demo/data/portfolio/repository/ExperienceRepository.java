package com.example.demo.data.portfolio.repository;

import com.example.demo.data.portfolio.entity.Experience;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExperienceRepository extends JpaRepository<Experience, Integer> {
    Experience findByRole(String role);
}
