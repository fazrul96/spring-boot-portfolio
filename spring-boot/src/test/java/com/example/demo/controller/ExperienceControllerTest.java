package com.example.demo.controller;

import com.example.demo.data.entity.Experience;
import com.example.demo.service.modules.ExperienceService;
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
public class ExperienceControllerTest {
    @InjectMocks
    private ExperienceController experienceController;

    @Mock
    private ExperienceService experienceService;

    @Test
    public void testGetExperiences() {
        List<Experience> mockExperiences = new ArrayList<>();
        Experience experience = new Experience();

        experience.setId(1);
        experience.setCompanyName("Accenture Solutions");
        experience.setCompanyType("Sdn. Bhd.");
        experience.setRole("Business & Integration Arch Analyst");
        experience.setTag("Web Development|Laravel|Java|PHP|JavaScript|Cypress|MySQL|Unit Testing|Data Manipulation");
        experience.setYear(null);
        experience.setStartdate("2024-03-18 10:22:38");
        experience.setEnddate("2024-03-18 10:22:38");
        experience.setDuration("1 yrs 4 mo");
        experience.setImage("https://cdnv2.dropr.io/image/7m-VCLUpSjG3z_tAei75rg/Iagvf8Qx/1200x630/sf/"
                + "f78e1fde-bff5-4287-9476-9db5f6b6a1ef.jpg?cache_buster=39dfa55283318d31afe5a3ff4a0e3253e2045e43");
        experience.setAlias("acn");
        mockExperiences.add(experience);

        when(experienceService.getExperiences()).thenReturn(mockExperiences);
        List<Experience> actualExperiences = experienceController.getExperiences();

        assertEquals(mockExperiences.size(), actualExperiences.size());
        assertEquals(mockExperiences.get(0).getId(), actualExperiences.get(0).getId());
        assertEquals(mockExperiences.get(0).getCompanyName(), actualExperiences.get(0).getCompanyName());
        assertEquals(mockExperiences.get(0).getCompanyType(), actualExperiences.get(0).getCompanyType());
        assertEquals(mockExperiences.get(0).getRole(), actualExperiences.get(0).getRole());
        assertEquals(mockExperiences.get(0).getTag(), actualExperiences.get(0).getTag());
        assertEquals(mockExperiences.get(0).getYear(), actualExperiences.get(0).getYear());
        assertEquals(mockExperiences.get(0).getStartdate(), actualExperiences.get(0).getStartdate());
        assertEquals(mockExperiences.get(0).getEnddate(), actualExperiences.get(0).getEnddate());
        assertEquals(mockExperiences.get(0).getDuration(), actualExperiences.get(0).getDuration());
        assertEquals(mockExperiences.get(0).getImage(), actualExperiences.get(0).getImage());
        assertEquals(mockExperiences.get(0).getAlias(), actualExperiences.get(0).getAlias());

        when(experienceService.getExperienceById(1)).thenReturn(experience);
        Experience actualExperience = experienceController.getExperienceById(1);

        assertNotNull(actualExperience);
        assertEquals(mockExperiences.get(0).getId(), actualExperience.getId());
        assertEquals(mockExperiences.get(0).getCompanyName(), actualExperience.getCompanyName());
        assertEquals(mockExperiences.get(0).getCompanyType(), actualExperience.getCompanyType());
        assertEquals(mockExperiences.get(0).getRole(), actualExperience.getRole());
        assertEquals(mockExperiences.get(0).getTag(), actualExperience.getTag());
        assertEquals(mockExperiences.get(0).getYear(), actualExperience.getYear());
        assertEquals(mockExperiences.get(0).getStartdate(), actualExperience.getStartdate());
        assertEquals(mockExperiences.get(0).getEnddate(), actualExperience.getEnddate());
        assertEquals(mockExperiences.get(0).getDuration(), actualExperience.getDuration());
        assertEquals(mockExperiences.get(0).getImage(), actualExperience.getImage());
        assertEquals(mockExperiences.get(0).getAlias(), actualExperience.getAlias());
    }
}