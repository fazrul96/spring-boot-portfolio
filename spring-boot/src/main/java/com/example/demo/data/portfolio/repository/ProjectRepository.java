package com.example.demo.data.portfolio.repository;

import com.example.demo.data.portfolio.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Integer> {
    Project findByStatus(String status);
}
