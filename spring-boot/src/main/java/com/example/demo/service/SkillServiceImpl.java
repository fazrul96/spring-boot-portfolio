package com.example.demo.services;

import com.example.demo.models.Skill;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SkillServiceImpl implements SkillService {

    @Override
    public List<Skill> getSkills() {
        return createListOfSkills();
    }

    private List<Skill> createListOfSkills() {
        List<Skill> skills = new ArrayList<>();

        String[][] skillData = {
            {
                "Web Development",
                "HTML",
            },
            {
                "Programming Languages",
                "PHP",
            }
        };

        // Loop through the skill data and create Skill instances
        for (int id = 1; id <= skillData.length; id++) {
            String[] data = skillData[id - 1]; // Get skill data for the current ID
            skills.add(new Skill(id, data[0], data[1], data[2]));
        }

        return skills;
    }
}