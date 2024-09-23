package com.example.demo.controller;

import com.example.demo.data.entity.Project;
import com.example.demo.service.modules.ProjectService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class ProjectControllerTest {
    @InjectMocks
    private ProjectController projectController;

    @Mock
    private ProjectService projectService;

    @Test
    public void testGetSkills() {
        List<Project> mockProjects = new ArrayList<>();
        Project project = new Project();

        project.setId(1);
        project.setTitle("LaravelCraft");
        project.setDescription(null);
        project.setStatus("Still in development");
        project.setReference("./pages/web-development-page.html");
        project.setImg("https://wallpapercave.com/wp/wp6878772.png");
        project.setTag("Web Development|PHP|Laravel");
        project.setList("Intelligentfood");
        mockProjects.add(project);

        when(projectService.getProjects()).thenReturn(mockProjects);
        List<Project> actualProjects = projectController.getProjects();

        assertEquals(mockProjects.size(), actualProjects.size());
        assertEquals(mockProjects.get(0).getId(), actualProjects.get(0).getId());
        assertEquals(mockProjects.get(0).getTitle(), actualProjects.get(0).getTitle());
        assertEquals(mockProjects.get(0).getDescription(), actualProjects.get(0).getDescription());
        assertEquals(mockProjects.get(0).getStatus(), actualProjects.get(0).getStatus());
        assertEquals(mockProjects.get(0).getReference(), actualProjects.get(0).getReference());
        assertEquals(mockProjects.get(0).getImg(), actualProjects.get(0).getImg());
        assertEquals(mockProjects.get(0).getTag(), actualProjects.get(0).getTag());
        assertEquals(mockProjects.get(0).getList(), actualProjects.get(0).getList());

        when(projectService.getProjectById(1)).thenReturn(project);
        Project actualProject = projectController.getProjectById(1);

        assertNotNull(actualProject);
        assertEquals(mockProjects.get(0).getId(), actualProject.getId());
        assertEquals(mockProjects.get(0).getTitle(), actualProject.getTitle());
        assertEquals(mockProjects.get(0).getDescription(), actualProject.getDescription());
        assertEquals(mockProjects.get(0).getStatus(), actualProject.getStatus());
        assertEquals(mockProjects.get(0).getReference(), actualProject.getReference());
        assertEquals(mockProjects.get(0).getImg(), actualProject.getImg());
        assertEquals(mockProjects.get(0).getTag(), actualProject.getTag());
        assertEquals(mockProjects.get(0).getList(), actualProject.getList());
    }
}
