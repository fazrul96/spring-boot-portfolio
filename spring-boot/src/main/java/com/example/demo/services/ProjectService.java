package com.example.demo.services;

import com.example.demo.models.Project;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public interface ProjectService {
    List<Project> getProjects();
    Project getProjectById(String id);
    Project saveProject(Project project);
    void deleteProject(String id);
}