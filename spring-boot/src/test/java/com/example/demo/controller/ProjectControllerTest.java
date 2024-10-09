package com.example.demo.controller;

import com.example.demo.data.entity.Certification;
import com.example.demo.data.entity.Project;
import com.example.demo.service.modules.ProjectService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class ProjectControllerTest {
    @InjectMocks
    private ProjectController projectController;

    @Mock
    private ProjectService projectService;

    @Test
    public void testGetProjects() {
        // Arrange
        List<Project> mockProjects = new ArrayList<>();
        Project mockProject = createMockProject();

        mockProjects.add(mockProject);

        when(projectService.getAllProjects()).thenReturn(mockProjects);

        // Act
        ResponseEntity<List<Project>> responseEntity = projectController.getProjects();

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(mockProjects.size(), responseEntity.getBody().size());
        assertProjectEquals(mockProject, responseEntity.getBody().get(0));
    }

    @Test
    public void testGetProjectById() {
        // Arrange
        Project mockProject = createMockProject();
        when(projectService.getProjectById(1)).thenReturn(mockProject);

        // Act
        ResponseEntity<Project> responseEntity = projectController.getProjectById(1);

        assertNotNull(responseEntity);
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertNotNull(responseEntity.getBody());
        assertProjectEquals(mockProject, responseEntity.getBody());
    }

    private Project createMockProject() {
        Project project = new Project();
        project.setId(1);
        project.setTitle("LaravelCraft");
        project.setDescription("A project using Laravel for backend development");
        project.setStatus("Still in development");
        project.setReference("./pages/web-development-page.html");
        project.setImg("https://wallpapercave.com/wp/wp6878772.png");
        project.setTag("Web Development|PHP|Laravel");
        project.setList("Intelligentfood");
        return project;
    }

    private void assertProjectEquals(Project expected, Project actual) {
        assertEquals(expected.getId(), actual.getId());
        assertEquals(expected.getTitle(), actual.getTitle());
        assertEquals(expected.getDescription(), actual.getDescription());
        assertEquals(expected.getStatus(), actual.getStatus());
        assertEquals(expected.getReference(), actual.getReference());
        assertEquals(expected.getImg(), actual.getImg());
        assertEquals(expected.getTag(), actual.getTag());
        assertEquals(expected.getList(), actual.getList());
    }
}