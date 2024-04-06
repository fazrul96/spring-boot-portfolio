package com.example.demo.controllers;

import com.example.demo.entity.Skill;
import com.example.demo.services.modules.SkillService;
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
public class SkillControllerTest {
    @InjectMocks
    private SkillController skillController;
    @Mock
    private SkillService skillService;

    @Test
    public void testGetSkills() {
        List<Skill> mockSkills = new ArrayList<>();
        Skill skill = new Skill();

        skill.setId(1);
        skill.setName("Web Development");
        skill.setTitle("Laravel|CodeIgniter|React|Spring Boot");

        mockSkills.add(skill);

        when(skillService.getSkills()).thenReturn(mockSkills);
        List<Skill> actualSkills = skillController.getSkills();

        assertEquals(mockSkills.size(), actualSkills.size());
        assertEquals(mockSkills.get(0).getId(), actualSkills.get(0).getId());
        assertEquals(mockSkills.get(0).getTitle(), actualSkills.get(0).getTitle());
        assertEquals(mockSkills.get(0).getName(), actualSkills.get(0).getName());

        when(skillService.getSkillById(1)).thenReturn(skill);
        Skill actualSkill = skillController.getSkillById(1);

        assertNotNull(actualSkill);
        assertEquals(mockSkills.get(0).getId(), actualSkill.getId());
        assertEquals(mockSkills.get(0).getTitle(), actualSkill.getTitle());
        assertEquals(mockSkills.get(0).getName(), actualSkill.getName());
    }
}


