package com.example.demo.data.repository;

import com.example.demo.data.entity.ProjectItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectItemRepository extends JpaRepository<ProjectItem, String> {
    ProjectItem findByTitle(String title);
}
