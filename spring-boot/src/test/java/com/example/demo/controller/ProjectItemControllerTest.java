package com.example.demo.controller;

import com.example.demo.data.entity.Certification;
import com.example.demo.data.entity.ProjectItem;
import com.example.demo.service.modules.ProjectItemService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class ProjectItemControllerTest {
    @InjectMocks
    private ProjectItemController projectItemController;

    @Mock
    private ProjectItemService projectItemService;

    @Test
    public void testGetProjectItems() {
        // Arrange
        List<ProjectItem> mockProjectItems = new ArrayList<>();
        ProjectItem projectItem = new ProjectItem();

        projectItem.setId(1);
        projectItem.setTitle("Project Item 1");
        projectItem.setDescription("Description for project item 1");
        projectItem.setReference("http://example.com/project-item-1");

        mockProjectItems.add(projectItem);

        when(projectItemService.getAllProjectItems()).thenReturn(mockProjectItems);

        // Act
        ResponseEntity<List<ProjectItem>> responseEntity = projectItemController.getProjectItems();

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(mockProjectItems.size(), responseEntity.getBody().size());
    }

    @Test
    public void testGetProjectItemById() {
        // Arrange
        ProjectItem mockProjectItem = new ProjectItem();
        mockProjectItem.setId(1);
        mockProjectItem.setTitle("Project Item 1");
        mockProjectItem.setDescription("Description for project item 1");
        mockProjectItem.setReference("http://example.com/project-item-1");

        when(projectItemService.getProjectItemById("1")).thenReturn(mockProjectItem);

        // Act
        ResponseEntity<ProjectItem> responseEntity = projectItemController.getProjectItemById(String.valueOf(1));

        // Assert
        assertNotNull(responseEntity);
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertNotNull(responseEntity.getBody());
    }

    @Test
    public void testSaveProjectItem() {
        // Arrange
        ProjectItem mockProjectItem = new ProjectItem();
        mockProjectItem.setId(1);
        mockProjectItem.setTitle("Project Item 1");
        mockProjectItem.setDescription("Description for project item 1");
        mockProjectItem.setReference("http://example.com/project-item-1");

        when(projectItemService.createProjectItem(mockProjectItem)).thenReturn(mockProjectItem);

        // Act
        ResponseEntity<ProjectItem> responseEntity = projectItemController.saveProjectItem(mockProjectItem);

        // Assert
        assertNotNull(responseEntity);
        assertEquals(HttpStatus.CREATED, responseEntity.getStatusCode());
        assertNotNull(responseEntity.getBody());
    }

    @Test
    public void testDeleteProjectItem() {
        // Arrange
        String id = "1";

        // Act
        projectItemController.deleteProjectItem(id);

        // Assert
        assertDoesNotThrow(() -> projectItemService.deleteProjectItem(id));
    }
}