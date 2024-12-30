package com.example.demo.controller;

import com.example.demo.data.portfolio.entity.Education;
import com.example.demo.service.modules.EducationService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class) // Use JUnit 5
class EducationControllerTest {

    @InjectMocks
    private EducationController educationController;

    @Mock
    private EducationService educationService;

    @Test
    void testGetAllEducations() {
        // Arrange
        List<Education> mockEducations = new ArrayList<>();
        Education education = new Education();
        education.setId(1);
        education.setName("National University of Malaysia (UKM)");
        education.setModule("Bachelor of Software Engineering (Information Systems)");
        education.setYear("2015 - 2019");
        mockEducations.add(education);

        when(educationService.getAllEducations()).thenReturn(mockEducations);

        // Act
        ResponseEntity<List<Education>> response = educationController.getAllEducations();

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(mockEducations.size(), response.getBody().size());
        assertEquals(mockEducations.get(0).getId(), response.getBody().get(0).getId());
    }

    @Test
    void testGetEducationById() {
        // Arrange
        Education education = new Education();
        education.setId(1);
        education.setName("National University of Malaysia (UKM)");
        education.setModule("Bachelor of Software Engineering (Information Systems)");
        education.setYear("2015 - 2019");

        when(educationService.getEducationById(1)).thenReturn(Optional.of(education));

        // Act
        ResponseEntity<Education> response = educationController.getEducationById(1);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(education.getId(), response.getBody().getId());
    }

    @Test
    void testGetEducationById_NotFound() {
        // Arrange
        when(educationService.getEducationById(1)).thenReturn(Optional.empty());

        // Act
        ResponseEntity<Education> response = educationController.getEducationById(1);

        // Assert
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    void testCreateEducation() {
        // Arrange
        Education education = new Education();
        education.setName("National University of Malaysia (UKM)");
        education.setModule("Bachelor of Software Engineering (Information Systems)");
        education.setYear("2015 - 2019");

        when(educationService.saveEducation(education)).thenReturn(education);

        // Act
        ResponseEntity<Education> response = educationController.createEducation(education);

        // Assert
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(education, response.getBody());
    }

    @Test
    void testDeleteEducation() {
        // Arrange
        Integer id = 1;
        when(educationService.deleteEducation(id)).thenReturn(true);

        // Act
        ResponseEntity<Void> response = educationController.deleteEducation(id);

        // Assert
        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
    }

    @Test
    void testDeleteEducation_NotFound() {
        // Arrange
        Integer id = 1;
        when(educationService.deleteEducation(id)).thenReturn(false);

        // Act
        ResponseEntity<Void> response = educationController.deleteEducation(id);

        // Assert
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }
}