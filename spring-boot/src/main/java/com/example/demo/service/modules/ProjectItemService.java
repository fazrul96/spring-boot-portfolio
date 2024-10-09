package com.example.demo.service.modules;

import com.example.demo.data.entity.ProjectItem;
import com.example.demo.data.repository.ProjectItemRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class ProjectItemService {
    private final ProjectItemRepository projectItemRepository;

    @Autowired
    public ProjectItemService(ProjectItemRepository projectItemRepository) {
        this.projectItemRepository = projectItemRepository;
    }

    public List<ProjectItem> getAllProjectItems() {
        log.info("Retrieving all project items");
        return projectItemRepository.findAll();
    }

    public ProjectItem getProjectItemById(String id) {
        log.info("Retrieving project item with ID: {}", id);
        return projectItemRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Project item not found with ID: " + id));
    }

    public ProjectItem getProjectItemByTitle(String title) {
        log.info("Retrieving project item with title: {}", title);
        return projectItemRepository.findByTitle(title);
    }

    public ProjectItem createProjectItem(ProjectItem projectItem) {
        log.info("Creating project item: {}", projectItem);
        return projectItemRepository.save(projectItem);
    }

    public void deleteProjectItem(String id) {
        log.info("Deleting project item with ID: {}", id);
        projectItemRepository.deleteById(id);
    }
}