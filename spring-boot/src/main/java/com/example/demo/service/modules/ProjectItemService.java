package com.example.demo.service.modules;

import com.example.demo.data.entity.ProjectItem;
import com.example.demo.data.repository.ProjectItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectItemService {
    private final ProjectItemRepository projectItemRepository;

    @Autowired
    public ProjectItemService(ProjectItemRepository projectItemRepository) {
        this.projectItemRepository = projectItemRepository;
    }

    public List<ProjectItem> getProjectItems() {
        return projectItemRepository.findAll();
    }

    public ProjectItem getProjectItemById(String id) {
        Optional<ProjectItem> optionalProjectItem = projectItemRepository.findById(id);
        return optionalProjectItem.orElse(null);
    }

    public ProjectItem getProjectItemByTitle(String title) {
        return projectItemRepository.findByTitle(title);
    }

    public ProjectItem saveProjectItem(ProjectItem project) {
        return projectItemRepository.save(project);
    }

    public void deleteProjectItem(String id) {
        projectItemRepository.deleteById(id);
    }
}