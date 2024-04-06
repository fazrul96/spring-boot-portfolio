package com.example.demo.controllers;

import com.example.demo.entity.Education;
import com.example.demo.services.modules.EducationService;
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
public class EducationControllerTest {
    @InjectMocks
    private EducationController educationController;
    @Mock
    private EducationService educationService;

    @Test
    public void testGetEducations() {
        List<Education> mockEducations = new ArrayList<>();
        Education education = new Education();

        education.setId(1);
        education.setName("National University of Malaysia (UKM)");
        education.setModule("Bachelor of Software Engineering (Information Systems)");
        education.setYear("2015 - 2019");
        mockEducations.add(education);

        when(educationService.getEducations()).thenReturn(mockEducations);
        List<Education> actualEducations = educationController.getEducations();

        assertEquals(mockEducations.size(), actualEducations.size());
        assertEquals(mockEducations.get(0).getId(), actualEducations.get(0).getId());
        assertEquals(mockEducations.get(0).getName(), actualEducations.get(0).getName());
        assertEquals(mockEducations.get(0).getModule(), actualEducations.get(0).getModule());
        assertEquals(mockEducations.get(0).getYear(), actualEducations.get(0).getYear());

        when(educationService.getEducationById(1)).thenReturn(education);
        Education actualEducation = educationController.getEducationById(1);

        assertNotNull(actualEducation);
        assertEquals(mockEducations.get(0).getId(), actualEducation.getId());
        assertEquals(mockEducations.get(0).getName(), actualEducation.getName());
        assertEquals(mockEducations.get(0).getModule(), actualEducation.getModule());
        assertEquals(mockEducations.get(0).getYear(), actualEducation.getYear());
    }
}
