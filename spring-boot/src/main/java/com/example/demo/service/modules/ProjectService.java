package com.example.demo.service.modules;

import com.example.demo.data.entity.Project;
import com.example.demo.data.repository.ProjectRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class ProjectService {
    private final ProjectRepository projectRepository;

    @Autowired
    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public List<Project> getAllProjects() {
        log.info("Retrieving all projects");
        return projectRepository.findAll();
    }

    public Project getProjectById(Integer id) {
        log.info("Retrieving project with ID: {}", id);
        return projectRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Project not found with ID: " + id));
    }

    public Project getProjectByStatus(String status) {
        log.info("Retrieving project with status: {}", status);
        return projectRepository.findByStatus(status);
    }

    public Project createProject(Project project) {
        log.info("Creating project: {}", project);
        return projectRepository.save(project);
    }

    public Project updateProject(Integer id, Project projectDetails) {
        log.info("Updating project with ID: {}", id);
        return projectRepository.findById(id).map(project -> {
            project.setTitle(projectDetails.getTitle());
            project.setDescription(projectDetails.getDescription());
            project.setStatus(projectDetails.getStatus());
            project.setReference(projectDetails.getReference());
            project.setImg(projectDetails.getImg());
            project.setTag(projectDetails.getTag());
            project.setList(projectDetails.getList());
            return projectRepository.save(project);
        }).orElseThrow(() -> new IllegalArgumentException("Project not found with ID: " + id));
    }

    public void deleteProject(Integer id) {
        log.info("Deleting project with ID: {}", id);
        projectRepository.deleteById(id);
    }
}