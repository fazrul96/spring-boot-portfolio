package com.example.demo.data.repository;

import com.example.demo.data.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Integer> {
    Project findByStatus(String status);
}
