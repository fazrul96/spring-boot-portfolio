package com.example.demo.repositories;

import com.example.demo.models.Experience;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ExperienceRepository extends JpaRepository<Experience, String> {
    Experience findByRole(String role);
}
