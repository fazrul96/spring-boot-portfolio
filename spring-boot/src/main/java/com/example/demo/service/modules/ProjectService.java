package com.example.demo.service.modules;

import com.example.demo.data.entity.Project;
import com.example.demo.data.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {
    private final ProjectRepository projectRepository;

    @Autowired
    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public List<Project> getProjects() {
        return projectRepository.findAll();
    }

    public Project getProjectById(Integer id) {
        Optional<Project> optionalProject = projectRepository.findById(id);
        return optionalProject.orElse(null);
    }

    public Project getProjectByStatus(String status) {
        return projectRepository.findByStatus(status);
    }

    public Project saveProject(Project project) {
        return projectRepository.save(project);
    }

    public void deleteProject(Integer id) {
        projectRepository.deleteById(id);
    }
}
