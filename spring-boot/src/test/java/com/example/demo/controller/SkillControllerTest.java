package com.example.demo.controller;

import com.example.demo.data.portfolio.entity.Skill;
import com.example.demo.service.modules.SkillService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class SkillControllerTest {
    @InjectMocks
    private SkillController skillController;

    @Mock
    private SkillService skillService;

    @Test
    public void testGetSkills() {
        // Arrange
        Skill mockSkill = createMockSkill();
        List<Skill> mockSkills = Collections.singletonList(mockSkill);

        // Mocking the service call
        when(skillService.getAllSkills()).thenReturn(mockSkills);

        // Act
        ResponseEntity<List<Skill>> responseEntity = skillController.getAllSkills();

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(mockSkills.size(), responseEntity.getBody().size());
        assertSkillEquals(mockSkill, responseEntity.getBody().get(0));
    }

    @Test
    public void testGetSkillById() {
        // Arrange
        Skill mockSkill = createMockSkill();
        when(skillService.getSkillById(1)).thenReturn(mockSkill);

        // Act
        ResponseEntity<Skill> responseEntity = skillController.getSkillById(1);

        // Assert
        assertNotNull(responseEntity);
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertNotNull(responseEntity.getBody());
        assertSkillEquals(mockSkill, responseEntity.getBody());
    }

    private Skill createMockSkill() {
        Skill skill = new Skill();
        skill.setId(1);
        skill.setName("Web Development");
        skill.setTitle("Laravel|CodeIgniter|React|Spring Boot");
        return skill;
    }

    private void assertSkillEquals(Skill expected, Skill actual) {
        assertEquals(expected.getId(), actual.getId());
        assertEquals(expected.getName(), actual.getName());
        assertEquals(expected.getTitle(), actual.getTitle());
    }
}