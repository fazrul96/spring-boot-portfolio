package com.example.demo.services;

import com.example.demo.models.ProjectItem;
import com.example.demo.repositories.ProjectItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectItemServiceImpl implements ProjectItemService {
    private final ProjectItemRepository projectItemRepository;

    @Autowired
    public ProjectItemServiceImpl(ProjectItemRepository projectItemRepository) {
        this.projectItemRepository = projectItemRepository;
    }

    @Override
    public List<ProjectItem> getProjectItems() {
        return projectItemRepository.findAll();
    }

    @Override
    public ProjectItem getProjectItemById(String id) {
        Optional<ProjectItem> optionalProjectItem = projectItemRepository.findById(id);
        return optionalProjectItem.orElse(null);
    }

    public ProjectItem getProjectItemByTitle(String title) {
        return projectItemRepository.findByTitle(title);
    }

    @Override
    public ProjectItem saveProjectItem(ProjectItem project) {
        return projectItemRepository.save(project);
    }

    @Override
    public void deleteProjectItem(String id) {
        projectItemRepository.deleteById(id);
    }
}
