package com.example.demo.services;

import com.example.demo.models.ProjectItem;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ProjectItemService {
    List<ProjectItem> getProjectItems();
    ProjectItem getProjectItemById(String id);
    ProjectItem saveProjectItem(ProjectItem projectItem);
    void deleteProjectItem(String id);
}