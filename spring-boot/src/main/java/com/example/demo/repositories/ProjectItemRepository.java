package com.example.demo.repositories;

import com.example.demo.entity.ProjectItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectItemRepository extends JpaRepository<ProjectItem, String> {
    ProjectItem findByTitle(String title);
}
